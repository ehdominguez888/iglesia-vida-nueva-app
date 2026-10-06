import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { SermonNote } from "@/hooks/use-sermon-notes";
import { Input } from "@/components/ui/input";

type NoteSearchProps = {
  notes: SermonNote[];
  onSearch: (filtered: SermonNote[], term: string) => void;
};

const NoteSearch = ({ notes, onSearch }: NoteSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = useMemo(() => {
    if (!searchTerm.trim()) return notes;
    
    const term = searchTerm.toLowerCase().trim();
    
    return notes.filter((note) => {
      // Search in title, content, and date only
      return (
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.date.includes(term)
      );
    });
  }, [notes, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(filteredNotes, term);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch(notes, "");
  };

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar por título, contenido o fecha..."
        className="h-14 rounded-full pl-12 pr-12"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default NoteSearch;