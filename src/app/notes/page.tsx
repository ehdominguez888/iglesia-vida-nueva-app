import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoteCard from "@/components/notes/NoteCard";
import NoteSearch from "@/components/notes/NoteSearch";
import NoteFilters from "@/components/notes/NoteFilters";
import NoteEditorDialog from "@/components/notes/NoteEditorDialog";
import { useSermonNotes } from "@/hooks/use-sermon-notes";
import type { NoteDraft } from "@/components/notes/NoteEditorDialog";

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote } = useSermonNotes();
  const [editor, setEditor] = useState<{ open: boolean; noteId: string | null }>({
    open: false,
    noteId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ icon?: string; color?: string }>({});
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = (filtered: typeof notes, term: string) => {
    setSearchTerm(term);
    applyFilters(filtered, filters);
  };

  const handleFilter = (newFilters: { icon?: string; color?: string }) => {
    setFilters(newFilters);
    applyFilters(notes, newFilters);
  };

  const applyFilters = (notesToFilter: typeof notes, currentFilters: { icon?: string; color?: string }) => {
    let result = notesToFilter;
    
    // Apply text search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(note => 
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.date.includes(term)
      );
    }
    
    // Apply icon filter
    if (currentFilters.icon) {
      result = result.filter(note => note.icon === currentFilters.icon);
    }
    
    // Apply color filter
    if (currentFilters.color) {
      result = result.filter(note => note.color === currentFilters.color);
    }
    
    setFilteredNotes(result);
  };

  const handleSaveNote = (draft: NoteDraft) => {
    if (editor.noteId) {
      updateNote(editor.noteId, draft);
    } else {
      addNote(draft.title, draft.date, draft.content, draft.photos, draft.icon, draft.color);
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  const handleOpenNote = (id: string) => {
    setEditor({ open: true, noteId: id });
  };

  const handleCloseEditor = () => {
    setEditor({ open: false, noteId: null });
  };

  const noteToEdit = editor.noteId ? notes.find((note) => note.id === editor.noteId) : null;

  // Handle icon updates through the updateNote function
  const handleUpdateIcon = (id: string, icon: string, color: string) => {
    updateNote(id, { icon, color });
  };

  return (
    <div className="container max-w-2xl py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">Mis Notas</h1>
        <Button
          onClick={() => setEditor({ open: true, noteId: null })}
          className="h-12 rounded-full px-6"
        >
          <Plus className="mr-2 h-5 w-5" />
          Nueva nota
        </Button>
      </header>

      <NoteSearch notes={notes} onSearch={handleSearch} />
      <NoteFilters onFilter={handleFilter} activeFilters={filters} />

      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => handleOpenNote(note.id)}
              onShare={() => {
                // TODO: Implement sharing functionality
                console.log("Sharing note", note.id);
              }}
              onUpdateIcon={handleUpdateIcon}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
              <path d="M12 2v20"></path>
              <path d="M8 10h8"></path>
              <path d="M8 14h8"></path>
              <path d="M8 18h8"></path>
            </svg>
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Aún no tienes notas
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Presiona «Nueva nota» para empezar a tomar apuntes.
          </p>
        </div>
      )}

      <NoteEditorDialog
        open={editor.open}
        onOpenChange={(open) => {
          if (!open) handleCloseEditor();
        }}
        note={noteToEdit ?? null}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}