import { Share2 } from "lucide-react";
import type { SermonNote } from "@/hooks/use-sermon-notes";
import { formatShortDate } from "@/utils/dates";

type NoteCardProps = {
  note: SermonNote;
  onOpen: () => void;
  onShare: () => void;
};

const NoteCard = ({ note, onOpen, onShare }: NoteCardProps) => {
  return (
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
      {note.content ? (
        <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {note.content}
        </p>
      ) : null}
    </article>
  );
};

export default NoteCard;