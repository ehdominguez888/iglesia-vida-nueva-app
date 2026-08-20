import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BibleVerse } from "@/lib/bible";

type ChapterViewProps = {
  bookName: string;
  chapter: number;
  verses: BibleVerse[];
  translationLabel: string;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const ChapterView = ({
  bookName,
  chapter,
  verses,
  translationLabel,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ChapterViewProps) => {
  return (
    <div className="space-y-5">
      {/* Contenido */}
      <article className="rounded-3xl border border-border bg-card px-5 py-6 sm:px-8 sm:py-8">
        <header className="mb-6 border-b border-border pb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {translationLabel}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            {bookName} {chapter}
          </h1>
        </header>
        <div className="space-y-5">
          {verses.map((verse) => (
            <p
              key={verse.number}
              className="flex gap-3 font-display text-[17px] leading-relaxed text-foreground sm:text-lg"
            >
              <sup className="mt-0.5 font-sans text-xs font-semibold text-primary">
                {verse.number}
              </sup>
              <span>{verse.text}</span>
            </p>
          ))}
        </div>
      </article>

      {/* Navegación de capítulos */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-semibold text-foreground transition-colors hover:border-primary/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="h-5 w-5" />
          Anterior
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          Siguiente
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChapterView;