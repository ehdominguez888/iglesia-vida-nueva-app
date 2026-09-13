import { useState, useEffect } from "react";
import { Loader2, BookOpenText, Download } from "lucide-react";
import { getChapter, type BibleChapter } from "@/lib/bible";
import { type BibleBook } from "@/data/books";
import { showError } from "@/utils/toast";
import { buildBibleUrl } from "@/lib/bible-link";

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

  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getChapter("RVR1960", book.code, chapter);
        setChapterData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error al cargar el capítulo";
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [book.code, chapter]);

  const blueLetterUrl = buildBibleUrl({
    versionCode: "rvr1960",
    bookCode: book.code,
    chapter,
    verseStart: verseStart || undefined
  });

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-border bg-card">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Cargando capítulo...</p>
        </div>
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-center">
        <BookOpenText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
          No se pudo cargar el capítulo
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {error || "Error al conectar con la fuente de la Biblia"}
        </p>
        <a
          href={blueLetterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Download className="h-4 w-4" />
          Abrir en Blue Letter Bible
        </a>
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
    </div>
  );
};

export default BibleReader;