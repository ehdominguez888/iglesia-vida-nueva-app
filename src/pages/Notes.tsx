import { useMemo, useState, useCallback } from "react";
import { NotebookPen, Plus, ChevronUp, ChevronDown, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import NoteCard from "@/components/notes/NoteCard";
import NoteEditorDialog, { type NoteDraft } from "@/components/notes/NoteEditorDialog";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSermonNotes, type SermonNote } from "@/hooks/use-sermon-notes";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import NoteSearch from "@/components/notes/NoteSearch";
import NoteFilters from "@/components/notes/NoteFilters";

const Notes = () => {
  usePageTitle("Notas del sermón");
  const { notes, addNote, updateNote, deleteNote, photosWithinBudget } = useSermonNotes();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<SermonNote | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [filters, setFilters] = useState({ icons: [] as string[], colors: [] as string[] });

  // Filter and search notes
  const filteredNotes = useMemo(() => {
    let result = notes;

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter((note) => {
        return (
          note.title.toLowerCase().includes(term) ||
          note.content.toLowerCase().includes(term) ||
          note.date.includes(term)
        );
      });
    }

    // Apply icon and color filters
    if (filters.icons.length > 0 || filters.colors.length > 0) {
      result = result.filter((note) => {
        const matchesIcon = filters.icons.length === 0 || (note.icon && filters.icons.includes(note.icon));
        const matchesColor = filters.colors.length === 0 || (note.color && filters.colors.includes(note.color));
        return matchesIcon && matchesColor;
      });
    }

    return result;
  }, [notes, searchTerm, filters]);

  // Group notes by month
  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, SermonNote[]>();
    
    for (const note of filteredNotes) {
      const date = parseISO(note.date);
      const monthKey = format(date, "MMMM yyyy", { locale: es });
      const monthLabel = format(date, "MMMM yyyy", { locale: es });
      
      if (!map.has(monthKey)) {
        map.set(monthKey, []);
        order.push(monthKey);
      }
      map.get(monthKey)!.push(note);
    }
    
    return order.map((monthKey) => ({ 
      label: monthKey.charAt(0).toUpperCase() + monthKey.slice(1), 
      items: map.get(monthKey)! 
    }));
  }, [filteredNotes]);

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
      addNote(draft.title, draft.date, draft.content, photos, draft.icon, draft.color);
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
    const text = `${title} · ${format(parseISO(note.date), "d 'de' MMMM yyyy", { locale: es })}\n\n${note.content}${photoNote}`;
    
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

  const handleShareAllNotes = useCallback(async () => {
    if (notes.length === 0) {
      toast("No hay notas para compartir");
      return;
    }

    // Format all notes
    const formattedNotes = notes
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(note => {
        const title = note.title.trim() || "Nota sin título";
        const date = format(parseISO(note.date), "d 'de' MMMM yyyy", { locale: es });
        const photoCount = note.photos?.length ?? 0;
        const photoNote = photoCount > 0 ? `\n📷 ${photoCount} foto${photoCount > 1 ? "s" : ""} adjunta${photoCount > 1 ? "s" : ""}` : "";
        return `---\n${title} - ${date}\n\n${note.content}${photoNote}`;
      })
      .join('\n\n');

    const shareData = {
      title: "Mis Notas - Iglesia Vida Nueva",
      text: formattedNotes
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled the share
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedNotes);
      toast("Todas las notas copiadas al portapapeles");
    } catch {
      toast("No se pudieron compartir las notas");
    }
  }, [notes]);

  const handleSearch = (filtered: SermonNote[], term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters: { icons: string[]; colors: string[] }) => {
    setFilters(newFilters);
  };

  const handleUpdateIcon = (id: string, icon: string, color: string) => {
    updateNote(id, { icon, color });
    toast("Ícono actualizado");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Escucha y escribe"
        title="Notas del sermón"
        description="Guarda tus apuntes de cada sermón y consulta todo lo que has aprendido."
      />

      {/* Collapsible Header Section */}
      <div className={`transition-all duration-300 ${isHeaderCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-96'}`}>
        <div className="flex gap-2 mb-4">
          <Button
            onClick={openNew}
            className="flex-1 h-14 rounded-full text-base font-semibold shadow-sm active:scale-[0.99]"
          >
            <Plus className="mr-1 h-5 w-5" />
            Nueva nota
          </Button>
        </div>

        {notes.length > 0 && (
          <>
            <NoteSearch notes={notes} onSearch={handleSearch} />
            <div className="mt-4">
              <NoteFilters onFilter={handleFilter} activeFilters={filters} />
            </div>
          </>
        )}

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
        ) : filteredNotes.length === 0 && (searchTerm || filters.icons.length > 0 || filters.colors.length > 0) ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary">
              <NotebookPen className="h-8 w-8" />
            </span>
            <h2 className="font-display text-xl font-semibold text-foreground">
              No se encontraron notas
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {searchTerm 
                ? `No hay notas que coincidan con "${searchTerm}"`
                : "No hay notas que coincidan con los filtros seleccionados"
              }
            </p>
          </div>
        ) : null}
      </div>

      {/* Collapse Toggle Button - Simplified with arrow only */}
      {notes.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            aria-label={isHeaderCollapsed ? "Mostrar controles" : "Ocultar controles"}
          >
            {isHeaderCollapsed ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </button>
        </div>
      )}

      {/* Notes List Section */}
      {notes.length > 0 && filteredNotes.length > 0 && (
        <div className="space-y-8">
          {/* Section Title with Background */}
          <div className="rounded-3xl bg-secondary/30 p-6 flex justify-between items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Tus notas
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredNotes.length} nota{filteredNotes.length !== 1 ? 's' : ''} encontrada{filteredNotes.length !== 1 ? 's' : ''}
                {searchTerm && ` para "${searchTerm}"`}
                {(filters.icons.length > 0 || filters.colors.length > 0) && ' (filtradas)'}
              </p>
            </div>
            <Button
              onClick={handleShareAllNotes}
              variant="outline"
              className="h-10 w-10 p-0 rounded-full"
              aria-label="Compartir todas las notas"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Monthly Groups */}
          {groups.map((group) => (
            <section key={group.label}>
              <h3 className="mb-4 px-1 font-display text-lg font-semibold text-foreground border-l-4 border-primary pl-3">
                {group.label}
              </h3>
              <div className="space-y-3">
                {group.items.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onOpen={() => openEdit(note)}
                    onShare={() => handleShare(note)}
                    onUpdateIcon={handleUpdateIcon}
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