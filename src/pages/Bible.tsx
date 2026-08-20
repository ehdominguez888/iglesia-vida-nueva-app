import { useEffect, useState } from "react";
import { RotateCcw, WifiOff } from "lucide-react";
import {
  BIBLE_TRANSLATIONS,
  bookDisplayName,
  getChapter,
  type BibleChapter,
  type BibleTranslation,
} from "@/lib/bible";
import { BIBLE_BOOKS } from "@/data/books";
import TranslationSelect from "@/components/bible/TranslationSelect";
import BookSelect from "@/components/bible/BookSelect";
import ChapterSelect from "@/components/bible/ChapterSelect";
import ChapterView from "@/components/bible/ChapterView";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";

type Status = "loading" | "ready" | "error";

const DEFAULT_TRANSLATION = "RVR1960";
const DEFAULT_BOOK_INDEX = Math.max(
  0,
  BIBLE_BOOKS.findIndex((book) => book.code === "psa")
);

const Bible = () => {
  usePageTitle("Biblia");
  // Lectura de la Palabra

  const [translation, setTranslation] = useState<BibleTranslation>(
    BIBLE_TRANSLATIONS.find((item) => item.id === DEFAULT_TRANSLATION) ??
      BIBLE_TRANSLATIONS[0]
  );
  const [bookIndex, setBookIndex] = useState(DEFAULT_BOOK_INDEX);
  const [chapter, setChapter] = useState(1);

  const [data, setData] = useState<BibleChapter | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const book = BIBLE_BOOKS[bookIndex];

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError("");
    getChapter(translation.id, book.code, chapter)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setStatus("ready");
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "No se pudo cargar el capítulo.");
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [translation.id, bookIndex, chapter, attempt]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bookIndex, chapter]);

  const goToPrev = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else if (bookIndex > 0) {
      setBookIndex(bookIndex - 1);
      setChapter(BIBLE_BOOKS[bookIndex - 1].chapters);
    }
  };

  const goToNext = () => {
    if (chapter < book.chapters) {
      setChapter(chapter + 1);
    } else if (bookIndex < BIBLE_BOOKS.length - 1) {
      setBookIndex(bookIndex + 1);
      setChapter(1);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="La Palabra"
        title="Biblia"
        description="Lee la Palabra de Dios en varias versiones, dondequiera que estés."
      />

      <div className="mb-6 flex items-center gap-2">
        <TranslationSelect value={translation} onChange={setTranslation} />
        <BookSelect
          value={book}
          onChange={(nextBook) => {
            const nextIndex = BIBLE_BOOKS.findIndex(
              (candidate) => candidate.code === nextBook.code
            );
            if (nextIndex >= 0) setBookIndex(nextIndex);
            setChapter(1);
          }}
        />
      </div>
      <div className="mb-6">
        <ChapterSelect
          bookName={book.name}
          totalChapters={book.chapters}
          value={chapter}
          onChange={setChapter}
        />
      </div>

      {status === "loading" ? (
        <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
          <div className="h-5 w-40 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-full bg-muted/70" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-muted/70" />
          <div className="h-4 w-4/6 animate-pulse rounded-full bg-muted/70" />
        </div>
      ) : null}

      {status === "error" ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card px-6 py-14 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary">
            <WifiOff className="h-8 w-8" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              No se pudo cargar el pasaje
            </h2>
            <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">
              {error} Revisa tu conexión a internet y vuelve a intentarlo.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Reintentar
          </button>
        </div>
      ) : null}

      {status === "ready" && data ? (
        <ChapterView
          key={`${translation.id}-${book.code}-${chapter}`}
          bookName={bookDisplayName(book, translation)}
          chapter={data.chapterNumber || chapter}
          verses={data.verses}
          translationLabel={translation.label}
          hasPrev={bookIndex > 0 || chapter > 1}
          hasNext={bookIndex < BIBLE_BOOKS.length - 1 || chapter < book.chapters}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      ) : null}
    </div>
  );
};

export default Bible;