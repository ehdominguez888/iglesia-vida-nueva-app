import { useState } from "react";
import { BookOpenText, ExternalLink } from "lucide-react";
import BookSelect from "@/components/bible/BookSelect";
import ChapterSelect from "@/components/bible/ChapterSelect";
import VerseSelect from "@/components/bible/VerseSelect";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { BIBLE_BOOKS, type BibleBook } from "@/data/books";
import {
  BIBLE_VERSIONS,
  buildBibleUrl,
  formatReference,
  type BibleVersion,
} from "@/lib/bible-link";

const DEFAULT_BOOK_INDEX = Math.max(0, BIBLE_BOOKS.findIndex((book) => book.code === "psa"));

const Bible = () => {
  usePageTitle("Biblia");

  const [bookIndex, setBookIndex] = useState(DEFAULT_BOOK_INDEX);
  const [chapter, setChapter] = useState(1);
  const [startVerse, setStartVerse] = useState<number | null>(null);
  const [endVerse, setEndVerse] = useState<number | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<"rvr1960" | "more">("rvr1960");

  const book = BIBLE_BOOKS[bookIndex];
  const rangeInvalid = startVerse !== null && endVerse !== null && endVerse < startVerse;

  const reference = formatReference({
    version: BIBLE_VERSIONS.find(v => v.id === "rvr1960")!,
    book,
    chapter,
    verseStart: startVerse,
    verseEnd: endVerse,
  });

  const url = buildBibleUrl({
    versionCode: "rvr1960",
    bookCode: book.code,
    chapter,
    verseStart: startVerse,
    verseEnd: endVerse,
  });

  const handleBookChange = (nextBook: BibleBook) => {
    const nextIndex = BIBLE_BOOKS.findIndex((candidate) => candidate.code === nextBook.code);
    if (nextIndex >= 0) setBookIndex(nextIndex);
    setChapter(1);
  };

  const handleTranslationChange = (translation: "rvr1960" | "more") => {
    setSelectedTranslation(translation);
    if (translation === "more") {
      window.open("https://www.blueletterbible.org", "_blank", "noopener,noreferrer");
      // Reset to RVR1960 after opening Blue Letter Bible
      setTimeout(() => setSelectedTranslation("rvr1960"), 100);
    }
  };

  return (
    <div className="animate-rise space-y-5">
      <PageHeader
        eyebrow="La Palabra"
        title="Biblia"
        description="Lee la Biblia directamente en la app usando la Reina-Valera 1960, o abre más traducciones en Blue Letter Bible."
      />

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

      {/* Traducción */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Traducción
        </p>
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-border bg-card p-1.5">
          <button
            type="button"
            onClick={() => handleTranslationChange("rvr1960")}
            className={`rounded-xl px-1 py-2.5 text-center text-xs font-semibold transition-colors sm:text-sm ${
              selectedTranslation === "rvr1960"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            RVR1960
          </button>
          <button
            type="button"
            onClick={() => handleTranslationChange("more")}
            className={`rounded-xl px-1 py-2.5 text-center text-xs font-semibold transition-colors sm:text-sm ${
              selectedTranslation === "more"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Más traducciones
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {selectedTranslation === "rvr1960" 
            ? "Leyendo Reina-Valera 1960 (dominio público)"
            : "Abriendo Blue Letter Bible para más traducciones..."}
        </p>
      </section>

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

      {/* Acción principal */}
      <div className="space-y-3 pt-1">
        {rangeInvalid ? (
          <button
            type="button"
            disabled
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-muted text-base font-semibold text-muted-foreground"
          >
            Abrir pasaje
            <ExternalLink className="h-5 w-5" />
          </button>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.99]"
          >
            Abrir pasaje
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Se abrirá el pasaje en Blue Letter Bible en una pestaña nueva.
        </p>
      </div>
    </div>
  );
};

export default Bible;