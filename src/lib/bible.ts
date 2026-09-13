import { BIBLE_BOOKS, type BibleBook } from "@/data/books";

export type BibleVerse = {
  number: number;
  text: string;
};

export type BibleChapter = {
  book: string;
  chapterNumber: number;
  verses: BibleVerse[];
};

const CACHE_KEY_PREFIX = "inv:bible";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

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
    // Storage full — ignore
  }
}

async function fetchChapter(bookCode: string, chapter: number): Promise<BibleChapter> {
  const response = await fetch(`/api/bible/${bookCode}/${chapter}`);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || result.details || "Error al cargar el capítulo");
  }

  return result.data;
}

/**
 * Loads a chapter, using localStorage cache when available.
 * On failure the cache entry (if any) is removed so the next
 * attempt hits the network again.
 */
export async function getChapter(
  _translation: string,
  book: string,
  chapter: number,
): Promise<BibleChapter> {
  const key = cacheKey(book, chapter);
  const cached = readCache<BibleChapter>(key);
  if (cached) return cached;

  const fresh = await fetchChapter(book, chapter);
  writeCache(key, fresh);
  return fresh;
}

/** Clears the entire Bible cache so every chapter is re-fetched. */
export function clearBibleCache() {
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(CACHE_KEY_PREFIX)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // noop
  }
}

export { BIBLE_BOOKS };