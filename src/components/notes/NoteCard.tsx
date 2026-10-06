import { useState } from "react";
import { Share2, X } from "lucide-react";
import type { SermonNote } from "@/hooks/use-sermon-notes";
import { formatShortDate } from "@/utils/dates";
import NoteIconSelector from "./NoteIconSelector";
import { 
  Heart, 
  Home, 
  BookOpen, 
  Crosshair, 
  User, 
  Star, 
  Sun, 
  Moon, 
  Cloud, 
  TreePine,
  Mountain,
  Waves,
  Zap,
  Shield
} from "lucide-react";

const ICON_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  home: Home,
  book: BookOpen,
  cross: Crosshair,
  user: User,
  star: Star,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  tree: TreePine,
  mountain: Mountain,
  waves: Waves,
  zap: Zap,
  shield: Shield
};

type NoteCardProps = {
  note: SermonNote;
  onOpen: () => void;
  onShare: () => void;
  onUpdateIcon: (id: string, icon: string, color: string) => void;
};

const NoteCard = ({ note, onOpen, onShare, onUpdateIcon }: NoteCardProps) => {
  const [viewIndex, setViewIndex] = useState<number | null>(null);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const photos = note.photos ?? [];

  const handleIconDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowIconSelector(true);
  };

  const handleIconSelect = (icon: string, color: string) => {
    onUpdateIcon(note.id, icon, color);
  };

  const IconComponent = note.icon && ICON_COMPONENTS[note.icon] 
    ? ICON_COMPONENTS[note.icon] 
    : Heart;

  const iconColor = note.color || "blue";

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
          <div className="flex items-center gap-2">
            <div 
              onDoubleClick={handleIconDoubleClick}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${iconColor === "red" ? "bg-red-500" : 
                iconColor === "orange" ? "bg-orange-500" : 
                iconColor === "amber" ? "bg-amber-500" : 
                iconColor === "yellow" ? "bg-yellow-500" : 
                iconColor === "lime" ? "bg-lime-500" : 
                iconColor === "green" ? "bg-green-500" : 
                iconColor === "emerald" ? "bg-emerald-500" : 
                iconColor === "teal" ? "bg-teal-500" : 
                iconColor === "cyan" ? "bg-cyan-500" : 
                iconColor === "sky" ? "bg-sky-500" : 
                iconColor === "blue" ? "bg-blue-500" : 
                iconColor === "indigo" ? "bg-indigo-500" : 
                iconColor === "violet" ? "bg-violet-500" : 
                iconColor === "purple" ? "bg-purple-500" : 
                iconColor === "fuchsia" ? "bg-fuchsia-500" : 
                iconColor === "pink" ? "bg-pink-500" : 
                iconColor === "rose" ? "bg-rose-500" : "bg-blue-500"} text-white`}
            >
              <IconComponent className="h-4 w-4" />
            </div>
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

      {/* Selector de ícono */}
      {showIconSelector && (
        <NoteIconSelector
          icon={note.icon}
          color={note.color}
          onSelect={handleIconSelect}
          onClose={() => setShowIconSelector(false)}
        />
      )}
    </>
  );
};

export default NoteCard;