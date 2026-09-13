import { useState } from "react";
import { BookOpenText } from "lucide-react";
import BookSelect from "@/components/bible/BookSelect";
import ChapterSelect from "@/components/bible/ChapterSelect";
import VerseSelect from "@/components/bible/VerseSelect";
import BibleReader from "@/components/bible/BibleReader";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { BIBLE_BOOKS, type BibleBook } from "@/data/books";
import { formatReference } from "@/lib/bible-link";

const DEFAULT_BOOK_INDEX = Math.max(
  0,
  BIBLE_BOOKS.findIndex((b) => b.code === "psa"),
);

const Bible = () => {
  usePageTitle("Biblia");

  const [bookIndex, setBookIndex] = useState(DEFAULT_BOOK_INDEX);
  const [chapter, setChapter] = useState(1);
  const [startVerse, setStartVerse] = useState<number | null>(null);
  const [endVerse, setEndVerse] = useState<number | null>(null);

  const book = BIBLE_BOOKS[bookIndex];
  const rangeInvalid =
    startVerse !== null && endVerse !== null && endVerse < startVerse;

  const reference = formatReference({
    version: null,
    book,
    chapter,
    verseStart: startVerse,
    verseEnd: endVerse,
  });

  const handleBookChange = (nextBook: BibleBook) => {
    const idx = BIBLE_BOOKS.findIndex((b) => b.code === nextBook.code);
    if (idx >= 0) setBookIndex(idx);
    setChapter(1);
    setStartVerse(null);
    setEndVerse(null);
  };

  return (
    <div className="animate-rise space-y-5">
      <PageHeader
        eyebrow="La Palabra"
        title="Biblia"
        description="Lee la Biblia Reina-Valera 1960 directamente en la app."
      />

      {/* Live reference */}
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-primary/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Tu pasaje
          </p>
          <p className="mt-0.5 truncate font-display text-xl font-semibold text-foreground sm:text-2xl">
            {reference}
          </p>
        </div>
        <BookOpenText className="h-9 w-9 shrink-0 text-primary" />
      </div>

      {/* Book selector */}
      <BookSelect value={book} onChange={handleBookChange} />

      {/* Chapter selector */}
      <ChapterSelect
        bookName={book.name}
        totalChapters={book.chapters}
        value={chapter}
        onChange={setChapter}
      />

      {/* Verse range */}
      <VerseSelect
        startVerse={startVerse}
        endVerse={endVerse}
        onStartVerseChange={setStartVerse}
        onEndVerseChange={setEndVerse}
        rangeInvalid={rangeInvalid}
      />

      {/* Reader */}
      <BibleReader
        book={book}
        chapter={chapter}
        verseStart={startVerse}
        verseEnd={endVerse}
      />

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