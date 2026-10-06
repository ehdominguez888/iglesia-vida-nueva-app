import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import type { SermonNote } from "@/hooks/use-sermon-notes";

type NoteSearchProps = {
  notes: SermonNote[];
  onSearch: (filteredNotes: SermonNote[], searchTerm: string) => void;
};

const NoteSearch = ({ notes, onSearch }: NoteSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Group notes by date for efficient searching
  const notesByDate = useMemo(() => {
    const map = new Map<string, SermonNote[]>();
    notes.forEach(note => {
      if (!map.has(note.date)) {
        map.set(note.date, []);
      }
      map.get(note.date)?.push(note);
    });
    return map;
  }, [notes]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search is empty, return all notes
      onSearch(notes, term);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    
    // Filter notes based on search term
    const filteredNotes = notes.filter(note => {
      // Search in title
      if (note.title.toLowerCase().includes(lowerTerm)) return true;
      
      // Search in content
      if (note.content.toLowerCase().includes(lowerTerm)) return true;
      
      // Search in date (exact match)
      if (note.date.includes(term)) return true;
      
      // Search in formatted date
      const dateObj = new Date(note.date);
      if (!isNaN(dateObj.getTime())) {
        const formattedDate = dateObj.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).toLowerCase();
        
        if (formattedDate.includes(lowerTerm)) return true;
      }
      
      return false;
    });
    
    onSearch(filteredNotes, term);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch(notes, "");
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por título, contenido o fecha..."
          className="h-12 rounded-2xl pl-10 pr-10"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <p className="mt-2 text-sm text-muted-foreground">
          {notes.length > 0 
            ? `${notes.length} nota${notes.length !== 1 ? 's' : ''} encontrada${notes.length !== 1 ? 's' : ''}` 
            : "No se encontraron notas"}
        </p>
      )}
    </div>
  );
};

export default NoteSearch;