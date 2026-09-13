import { BIBLE_BOOKS, type BibleBook } from "@/data/books";

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
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days cache

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
    // Ignore cache write errors
  }
}

async function fetchChapter(bookCode: string, chapter: number): Promise<BibleChapter> {
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
    throw new Error("No se pudo cargar el capítulo. Verifica tu conexión a internet.");
  }
}

export async function getChapter(translation: string, book: string, chapter: number): Promise<BibleChapter> {
  const key = cacheKey(book, chapter);
  const cached = readCache<BibleChapter>(key);
  if (cached) return cached;
  
  const fresh = await fetchChapter(book, chapter);
  writeCache(key, fresh);
  return fresh;
}

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