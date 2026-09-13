import { useState, useEffect } from "react";
import { Loader2, BookOpenText, RefreshCw } from "lucide-react";
import { getChapter, clearBibleCache, type BibleChapter } from "@/lib/bible";
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

  const loadChapter = async (bustCache = false) => {
    setLoading(true);
    setError(null);

    if (bustCache) {
      clearBibleCache();
    }

    try {
      const data = await getChapter("RVR1960", book.code, chapter);
      setChapterData(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al cargar el capítulo";
      setError(msg);
      showError(msg);
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
          <p className="text-sm text-muted-foreground">
            Cargando {book.name} {chapter}…
          </p>
        </div>
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <BookOpenText className="mx-auto h-12 w-12 text-destructive/70" />
        <h3 className="mt-3 font-display text-lg font-semibold text-destructive">
          Error al cargar el capítulo
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>

        <Button
          onClick={() => loadChapter(true)}
          variant="outline"
          className="mt-4"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      </div>
    );
  }

  // Filter verses when a range is selected
  const filteredVerses = chapterData.verses.filter((v) => {
    if (!verseStart) return true;
    if (verseEnd && verseEnd >= verseStart) {
      return v.number >= verseStart && v.number <= verseEnd;
    }
    return v.number === verseStart;
  });

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {book.name} {chapter}
        </h2>
        <p className="text-sm text-muted-foreground">Reina-Valera 1960</p>
      </div>

      {/* Verses */}
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

      {/* Range info */}
      {verseStart && verseEnd && verseEnd > verseStart && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Versículos {verseStart}–{verseEnd} de {chapterData.verses.length}
        </p>
      )}
      {verseStart && !verseEnd && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Versículo {verseStart} de {chapterData.verses.length}
        </p>
      )}
    </div>
  );
};

export default BibleReader;