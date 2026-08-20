import { useMemo, useState } from "react";
import { NotebookPen, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import NoteCard from "@/components/notes/NoteCard";
import NoteEditorDialog, { type NoteDraft } from "@/components/notes/NoteEditorDialog";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSermonNotes, type SermonNote } from "@/hooks/use-sermon-notes";
import { formatLongDate } from "@/utils/dates";

const Notes = () => {
  usePageTitle("Notas del sermón");
  const { notes, addNote, updateNote, deleteNote, photosWithinBudget } = useSermonNotes();
    const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<SermonNote | null>(null);

  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, SermonNote[]>();
    for (const note of notes) {
      const label = formatLongDate(note.date);
      if (!map.has(label)) {
        map.set(label, []);
        order.push(label);
      }
      map.get(label)!.push(note);
    }
    return order.map((label) => ({ label, items: map.get(label)! }));
  }, [notes]);

  const openNew = () => {
    setEditingNote(null);
    setDialogOpen(true);
  };

  const openEdit = (note: SermonNote) => {
    setEditingNote(note);
    setDialogOpen(true);
  };

  const handleSave = (draft: NoteDraft) => {
      const photos = photosWithinBudget(draft.photos);
      const limited = photos.length < draft.photos.length;
      if (editingNote) {
        updateNote(editingNote.id, { ...draft, photos });
        toast(limited ? "Guardada (fotos limitadas)" : "Nota actualizada");
      } else {
        addNote(draft.title, draft.date, draft.content, photos);
        toast(limited ? "Guardada (fotos limitadas)" : "Nota guardada");
      }
    };

  const handleDelete = (id: string) => {
    deleteNote(id);
    toast("Nota eliminada");
  };

  const handleShare = async (note: SermonNote) => {
      const title = note.title.trim() || "Nota del sermón";
      const photoCount = note.photos?.length ?? 0;
      const photoNote = photoCount > 0 ? `\n📷 ${photoCount} foto${photoCount > 1 ? "s" : ""} adjunta${photoCount > 1 ? "s" : ""}` : "";
      const text = `${title} · ${formatLongDate(note.date)}\n\n${note.content}${photoNote}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch {
        // El usuario canceló la compartición.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast("Nota copiada al portapapeles");
    } catch {
      toast("No se pudo compartir la nota");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Escucha y escribe"
        title="Notas del sermón"
        description="Guarda tus apuntes de cada sermón y consulta todo lo que has aprendido."
      />

      <Button
        onClick={openNew}
        className="mb-8 h-14 w-full rounded-full text-base font-semibold shadow-sm active:scale-[0.99]"
      >
        <Plus className="mr-1 h-5 w-5" />
        Nueva nota
      </Button>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary">
            <NotebookPen className="h-8 w-8" />
          </span>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Aún no tienes notas
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Presiona «Nueva nota» para empezar a tomar apuntes durante el sermón.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="mb-3 px-1 font-display text-sm font-semibold uppercase tracking-wide text-primary">
                {group.label}
              </h2>
              <div className="space-y-3">
                {group.items.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onOpen={() => openEdit(note)}
                    onShare={() => handleShare(note)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <NoteEditorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        note={editingNote}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Notes;