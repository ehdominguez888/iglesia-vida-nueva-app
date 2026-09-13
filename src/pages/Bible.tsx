import { useState } from "react";
import { BookOpenText, Wifi, WifiOff } from "lucide-react";
import BookSelect from "@/components/bible/BookSelect";
import ChapterSelect from "@/components/bible/ChapterSelect";
import VerseSelect from "@/components/bible/VerseSelect";
import BibleReader from "@/components/bible/BibleReader";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { BIBLE_BOOKS, type BibleBook } from "@/data/books";
import { formatReference } from "@/lib/bible-link";
import { Button } from "@/components/ui/button";
import { showLoading, dismissToast, showError, showSuccess } from "@/utils/toast";

const DEFAULT_BOOK_INDEX = Math.max(0, BIBLE_BOOKS.findIndex((book) => book.code === "psa"));

const Bible = () => {
  usePageTitle("Biblia");

  const [bookIndex, setBookIndex] = useState(DEFAULT_BOOK_INDEX);
  const [chapter, setChapter] = useState(1);
  const [startVerse, setStartVerse] = useState<number | null>(null);
  const [endVerse, setEndVerse] = useState<number | null>(null);
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);

  const book = BIBLE_BOOKS[bookIndex];
  const rangeInvalid = startVerse !== null && endVerse !== null && endVerse < startVerse;

  const reference = formatReference({
    version: null,
    book,
    chapter,
    verseStart: startVerse,
    verseEnd: endVerse,
  });

  const handleBookChange = (nextBook: BibleBook) => {
    const nextIndex = BIBLE_BOOKS.findIndex((candidate) => candidate.code === nextBook.code);
    if (nextIndex >= 0) setBookIndex(nextIndex);
    setChapter(1);
    setStartVerse(null);
    setEndVerse(null);
  };

  const testApiConnection = async () => {
    const toastId = showLoading("Probando conexión con la API de la Biblia...");
    try {
      const response = await fetch('/api/bible-test');
      const data = await response.json();
      
      setApiStatus(data.apiWorking);
      
      if (data.apiWorking) {
        showSuccess("Conexión exitosa con la API de la Biblia");
      } else {
        showError("Error de conexión con la API de la Biblia");
      }
    } catch (error) {
      setApiStatus(false);
      showError("Error al probar la conexión con la API");
    } finally {
      dismissToast(toastId);
    }
  };

  return (
    <div className="animate-rise space-y-5">
      <PageHeader
        eyebrow="La Palabra"
        title="Biblia"
        description="Lee la Biblia Reina-Valera 1960 directamente en la app."
      />

      {/* API Status Indicator */}
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-muted/50 px-5 py-3">
        <div className="flex items-center gap-2">
          {apiStatus === true ? (
            <Wifi className="h-5 w-5 text-green-600" />
          ) : apiStatus === false ? (
            <WifiOff className="h-5 w-5 text-red-600" />
          ) : (
            <Wifi className="h-5 w-5 text-gray-400" />
          )}
          <span className="text-sm text-muted-foreground">
            {apiStatus === true ? "Conectado" : apiStatus === false ? "Sin conexión" : "Estado desconocido"}
          </span>
        </div>
        <Button onClick={testApiConnection} variant="outline" size="sm">
          Probar conexión
        </Button>
      </div>

      {/* Referencia en vivo */}
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-primary/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Tu pasaje</p>
          <p className="mt-0.5 truncate font-display text-xl font-semibold text-foreground sm:text-2xl">
            {reference}
          </p>
        </div>
        <BookOpenText className="h-9 w-9 shrink-0 text-primary" />
      </div>

      {/* Libro */}
      <BookSelect value={book} onChange={handleBookChange} />

      {/* Capítulo */}
      <ChapterSelect
        bookName={book.name}
        totalChapters={book.chapters}
        value={chapter}
        onChange={setChapter}
      />

      {/* Versículos */}
      <VerseSelect
        startVerse={startVerse}
        endVerse={endVerse}
        onStartVerseChange={setStartVerse}
        onEndVerseChange={setEndVerse}
        rangeInvalid={rangeInvalid}
      />

      {/* Mostrar el lector de Biblia */}
      <BibleReader
        book={book}
        chapter={chapter}
        verseStart={startVerse}
        verseEnd={endVerse}
      />

      {/* Mensaje de error para rango inválido */}
      {rangeInvalid && (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-center">
          <p className="text-sm font-medium text-destructive">
            El versículo final no puede ser menor que el inicial.
          </p>
        </div>
      )}
    </div>
  );
};

export default Bible;