import { useState } from "react";
import { Share2, X } from "lucide-react";
import type { SermonNote } from "@/hooks/use-sermon-notes";
import { formatShortDate } from "@/utils/dates";

type NoteCardProps = {
  note: SermonNote;
  onOpen: () => void;
  onShare: () => void;
};

const NoteCard = ({ note, onOpen, onShare }: NoteCardProps) => {
  const [viewIndex, setViewIndex] = useState<number | null>(null);
  const photos = note.photos ?? [];

  return (
    <>
      <article
        onClick={onOpen}
        className="group cursor-pointer rounded-3xl border border-border bg-card p-5 transition-all hover:border-primary/40 active:scale-[0.99]"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {formatShortDate(note.date)}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onShare();
            }}
            aria-label="Compartir nota"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary active:scale-95"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-3 truncate font-display text-lg font-semibold text-foreground">
          {note.title.trim() || "Nota sin título"}
        </h3>

        {photos.length > 0 ? (
          <div className="mt-3 flex gap-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setViewIndex(index);
                }}
                aria-label={`Ver foto ${index + 1}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted"
              >
                <img
                  src={photo}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {index === 0 && photos.length > 1 ? (
                  <span className="absolute bottom-1 right-1 rounded-full bg-foreground/85 px-1.5 text-[10px] font-semibold text-white">
                    +{photos.length - 1}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

        {note.content ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {note.content}
          </p>
        ) : null}
      </article>

      {/* Visor de fotos a pantalla completa */}
      {viewIndex !== null && photos[viewIndex] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${viewIndex + 1} de ${photos.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          onClick={() => setViewIndex(null)}
        >
          <button
            type="button"
            aria-label="Cerrar visor"
            onClick={() => setViewIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={photos[viewIndex]}
            alt={`Foto ${viewIndex + 1} de la nota`}
            className="max-h-[90dvh] max-w-full rounded-2xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
};

export default NoteCard;