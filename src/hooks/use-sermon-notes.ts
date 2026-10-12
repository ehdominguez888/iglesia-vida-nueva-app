import { useCallback, useEffect, useMemo, useState } from "react";

export type SermonNote = {
  id: string;
  title: string;
  /** Fecha del sermón en formato ISO (yyyy-mm-dd). */
  date: string;
  content: string;
  /** Fotografías de la nota como data URL reducidos y comprimidos. */
  photos: string[];
  createdAt: number;
  updatedAt: number;
  /** Icon identifier for the note */
  icon?: string;
  /** Color identifier for the note icon */
  color?: string;
};

/** Aproximadamente 80% de la capacidad típica de localStorage (5 MB). */
const STORAGE_BUDGET_BYTES = 4 * 1024 * 1024;

const STORAGE_KEY = "inv:sermon-notes";
const DRAFT_KEY = "inv:sermon-notes-draft";

/** Fecha de hoy en formato yyyy-mm-dd (hora local). */
export function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function loadNotes(): SermonNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Normalizamos notas antiguas sin el campo `photos`.
    return (parsed as SermonNote[]).map((note) => ({ ...note, photos: note.photos ?? [] }));
  } catch {
    return [];
  }
}

/** Load draft note from localStorage */
function loadDraft(): Partial<SermonNote> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Save draft note to localStorage */
function saveDraft(draft: Partial<SermonNote> | null) {
  try {
    if (draft) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } else {
      localStorage.removeItem(DRAFT_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

/** Estimación ligera del peso en bytes de una cadena de 16 bits de ancho. */
function byteLength(text: string): number {
  let bytes = 0;
  for (let i = 0; i < text.length; i += 1) {
    bytes += text.charCodeAt(i) > 0x7f ? 2 : 1;
  }
  return bytes;
}

export function useSermonNotes() {
  const [notes, setNotes] = useState<SermonNote[]>(loadNotes);
  const [draft, setDraft] = useState<Partial<SermonNote> | null>(loadDraft);
  const [isSaving, setIsSaving] = useState(false);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Si el almacenamiento está lleno o no disponible, ignoramos.
    }
  }, [notes]);

  // Save draft to localStorage whenever it changes
  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  // Setup visibility change listener for immediate save on app switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && draft) {
        // Force immediate save of draft when app loses visibility
        if (draft.id) {
          // Update existing note
          setNotes(prev => prev.map(note => 
            note.id === draft.id 
              ? { ...note, ...draft, updatedAt: Date.now() }
              : note
          ));
        }
        // Clear draft after saving
        setDraft(null);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [draft]);

  const addNote = useCallback(
    (title: string, date: string, content: string, photos: string[] = [], icon?: string, color?: string): SermonNote => {
      const now = Date.now();
      const note: SermonNote = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `note-${now}-${Math.floor(Math.random() * 1e6)}`,
        title: title.trim(),
        date,
        content: content.trim(),
        photos,
        icon,
        color,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [note, ...prev]);
      setDraft(null); // Clear draft after saving
      return note;
    },
    []
  );

  const updateNote = useCallback((id: string, patch: Partial<Omit<SermonNote, "id">>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note))
    );
    // Also update draft if it's for the same note
    if (draft && draft.id === id) {
      setDraft({ ...draft, ...patch });
    }
  }, [draft]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    // Also clear draft if it's for the same note
    if (draft && draft.id === id) {
      setDraft(null);
    }
  }, [draft]);

  const saveDraftNote = useCallback((draftData: Partial<SermonNote>) => {
    setDraft(draftData);
  }, []);

  const clearDraft = useCallback(() => {
    setDraft(null);
  }, []);

  const getDraft = useCallback(() => {
    return draft;
  }, [draft]);

  /**
   * Limita la cantidad de fotografías según el peso aproximado del conjunto,
   * para no llenar el almacenamiento del dispositivo.
   */
  const photosWithinBudget = useCallback(
    (photos: string[]): string[] => {
      const serialized = JSON.stringify(photos);
      if (byteLength(serialized) <= STORAGE_BUDGET_BYTES) return photos;
      // Vamos quitando fotos desde el final hasta cumplir el presupuesto.
      const kept = [...photos];
      while (kept.length > 0 && byteLength(JSON.stringify(kept)) > STORAGE_BUDGET_BYTES) {
        kept.pop();
      }
      return kept;
    },
    []
  );

  /** Notas ordenadas de la más reciente a la más antigua. */
  const sortedNotes = useMemo(
    () =>
      [...notes].sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return b.updatedAt - a.updatedAt;
      }),
    [notes]
  );

  return { 
    notes: sortedNotes, 
    addNote, 
    updateNote, 
    deleteNote, 
    photosWithinBudget,
    saveDraftNote,
    clearDraft,
    getDraft,
    isSaving,
    setIsSaving
  };
}