import { BIBLE_BOOKS, type BibleBook } from "@/data/books";

/** Traducciones disponibles. getbible.net incluye Español e Inglés. */
export type BibleTranslation = {
  id: string;
  short: string;
  label: string;
  language: "es" | "en";
  origin: string;
};

export const BIBLE_TRANSLATIONS: BibleTranslation[] = [
  { id: "RVR1960", short: "RVR60", label: "Reina-Valera 1960", language: "es", origin: "Español" },
  { id: "LBLA", short: "LBLA", label: "La Biblia de las Américas", language: "es", origin: "Español" },
  { id: "NTV", short: "NTV", label: "Nueva Traducción Viviente", language: "es", origin: "Español" },
  { id: "KJV", short: "KJV", label: "King James Version", language: "en", origin: "Inglés" },
  { id: "WEB", short: "WEB", label: "World English Bible", language: "en", origin: "Inglés" },
];

export type BibleVerse = {
  number: number;
  text: string;
};

export type BibleChapter = {
  reference: string;
  chapterNumber: number;
  verses: BibleVerse[];
};

const API_BASE = "https://api.getbible.net/v2";
const CACHE_KEY_PREFIX = "inv:bible";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 días

const cacheKey = (translation: string, book: string, chapter: number) =>
  `${CACHE_KEY_PREFIX}:${translation}:${book}:${chapter}`;

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

async function fetchChapter(translation: string, book: string, chapter: number): Promise<BibleChapter> {
  const url = `${API_BASE}/${translation.toLowerCase()}/${book}/${chapter}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo cargar el capítulo (${response.status}).`);
  }
  const data = await response.json();
  const rawVerses = data?.chapter?.verses ?? [];
  const verses = rawVerses.map((verse: { number?: unknown; text?: unknown }) => ({
    number: Number(verse?.number ?? 0),
    text: String(verse?.text ?? ""),
  }));
  return {
    reference: String(data?.reference ?? ""),
    chapterNumber: Number(data?.chapter?.number ?? chapter),
    verses,
  };
}

/**
 * Carga un capítulo usando el cache primero y la API como origen.
 * Lanza un error con un mensaje apto para mostrar si no se puede obtener.
 */
export async function getChapter(
  translation: string,
  book: string,
  chapter: number
): Promise<BibleChapter> {
  const key = cacheKey(translation, book, chapter);
  const cached = readCache<BibleChapter>(key);
  if (cached) return cached;
  const fresh = await fetchChapter(translation, book, chapter);
  writeCache(key, fresh);
  return fresh;
}

/** Borra todo el cache de la Biblia (útil en caso de datos corruptos). */
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

/** Nombre del libro según el idioma de la traducción. */
export function bookDisplayName(book: BibleBook, translation: BibleTranslation): string {
  return translation.language === "es" ? book.name : book.nameEn;
}

export { BIBLE_BOOKS };