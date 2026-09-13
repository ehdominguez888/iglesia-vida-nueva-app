import { BIBLE_BOOKS, type BibleBook } from "@/data/books";
import { getSpanishBibleChapter, type BibleChapter as SpanishBibleChapter } from "@/data/spanish-bible";

export type BibleVerse = {
  number: number;
  text: string;
};

export type BibleChapter = {
  reference: string;
  chapterNumber: number;
  verses: BibleVerse[];
};

const CACHE_KEY_PREFIX = "inv:bible";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 días

const cacheKey = (book: string, chapter: number) =>
  `${CACHE_KEY_PREFIX}:${book}:${chapter}`;

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt: number; data: T };
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Si el almacenamiento está lleno, simplemente ignoramos el cache.
  }
}

// Use local Spanish Bible database
async function fetchChapter(bookCode: string, chapter: number): Promise<BibleChapter> {
  // First try local database
  const localChapter = getSpanishBibleChapter(bookCode, chapter);
  if (localChapter) {
    return localChapter;
  }

  // If not in local database, try server API
  try {
    const response = await fetch(`/api/bible/${bookCode}/${chapter}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error || "Error al cargar el capítulo");
    }
    
    return result.data;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    
    // Create a placeholder chapter for unavailable chapters
    const book = BIBLE_BOOKS.find(b => b.code === bookCode);
    const bookName = book?.name || bookCode;
    
    return {
      reference: `${bookName} ${chapter}`,
      chapterNumber: chapter,
      verses: [
        {
          number: 1,
          text: `Este capítulo no está disponible en la base de datos local. Para leer ${bookName} ${chapter}, por favor visita Blue Letter Bible o Bible Gateway.`
        }
      ]
    };
  }
}

/**
 * Carga un capítulo usando el cache primero.
 */
export async function getChapter(translation: string, book: string, chapter: number): Promise<BibleChapter> {
  const key = cacheKey(book, chapter);
  const cached = readCache<BibleChapter>(key);
  if (cached) return cached;
  
  const fresh = await fetchChapter(book, chapter);
  writeCache(key, fresh);
  return fresh;
}

/** Borra todo el cache de la Biblia. */
export function clearBibleCache() {
  try {
    const keys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)).filter(
      (k) => k?.startsWith(CACHE_KEY_PREFIX)
    );
    keys.forEach((k) => k && localStorage.removeItem(k));
  } catch {
    // noop
  }
}

export { BIBLE_BOOKS };