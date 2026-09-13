import { useState, useEffect } from "react";
import { Loader2, BookOpenText, RefreshCw } from "lucide-react";
import { getChapter, type BibleChapter } from "@/lib/bible";
import { type BibleBook } from "@/data/books";
import { showError, showSuccess } from "@/utils/toast";
import { Button } from "@/components/ui/button";

type BibleReaderProps = {
  book: BibleBook;
  chapter: number;
  verseStart?: number | null;
  verseEnd?: number | null;
};

const BibleReader = ({ book, chapter, verseStart, verseEnd }: BibleReaderProps) => {
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChapter = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChapter("RVR1960", book.code, chapter);
      setChapterData(data);
      showSuccess(`Capítulo ${chapter} cargado`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar el capítulo";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChapter();
  }, [book.code, chapter]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-border bg-card">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Cargando {book.name} {chapter}...</p>
        </div>
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-6 text-center">
        <BookOpenText className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="mt-3 font-display text-lg font-semibold text-destructive">
          Error al cargar el capítulo
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {error || "No se pudo conectar con la fuente de la Biblia"}
        </p>
        
        <div className="mt-4">
          <Button
            onClick={loadChapter}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Filter verses if a range is selected
  const filteredVerses = chapterData.verses.filter((verse) => {
    if (!verseStart) return true;
    if (verseEnd) {
      return verse.number >= verseStart && verse.number <= verseEnd;
    }
    return verse.number === verseStart;
  });

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-6 text-center">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {chapterData.reference}
        </h2>
        <p className="text-sm text-muted-foreground">Reina-Valera 1960</p>
      </div>

      <div className="space-y-4">
        {filteredVerses.map((verse) => (
          <div key={verse.number} className="leading-relaxed">
            <span className="mr-2 align-super text-xs font-semibold text-primary">
              {verse.number}
            </span>
            <span className="text-foreground">{verse.text}</span>
          </div>
        ))}
      </div>

      {verseStart && verseEnd && verseEnd > verseStart && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Mostrando versículos {verseStart}–{verseEnd} de {chapterData.verses.length}
        </p>
      )}
      {verseStart && !verseEnd && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Mostrando versículo {verseStart} de {chapterData.verses.length}
        </p>
      )}

      <div className="mt-6 flex justify-center">
        <Button
          onClick={loadChapter}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Actualizar
        </Button>
      </div>
    </div>
  );
};

export default BibleReader;