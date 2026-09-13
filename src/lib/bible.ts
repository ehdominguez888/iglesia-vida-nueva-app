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

// Map book codes to proper names for the API
const bookNameMap: Record<string, string> = {
  "gen": "Genesis",
  "exo": "Exodus",
  "lev": "Leviticus",
  "num": "Numbers",
  "deu": "Deuteronomy",
  "jos": "Joshua",
  "jdg": "Judges",
  "rut": "Ruth",
  "1sa": "1 Samuel",
  "2sa": "2 Samuel",
  "1ki": "1 Kings",
  "2ki": "2 Kings",
  "1ch": "1 Chronicles",
  "2ch": "2 Chronicles",
  "ezr": "Ezra",
  "neh": "Nehemiah",
  "est": "Esther",
  "job": "Job",
  "psa": "Psalms",
  "pro": "Proverbs",
  "ecc": "Ecclesiastes",
  "sng": "Song of Solomon",
  "isa": "Isaiah",
  "jer": "Jeremiah",
  "lam": "Lamentations",
  "ezk": "Ezekiel",
  "dan": "Daniel",
  "hos": "Hosea",
  "jol": "Joel",
  "amo": "Amos",
  "oba": "Obadiah",
  "jon": "Jonah",
  "mic": "Micah",
  "nam": "Nahum",
  "hab": "Habakkuk",
  "zep": "Zephaniah",
  "hag": "Haggai",
  "zec": "Zechariah",
  "mal": "Malachi",
  "mat": "Matthew",
  "mrk": "Mark",
  "luk": "Luke",
  "jhn": "John",
  "act": "Acts",
  "rom": "Romans",
  "1co": "1 Corinthians",
  "2co": "2 Corinthians",
  "gal": "Galatians",
  "eph": "Ephesians",
  "php": "Philippians",
  "col": "Colossians",
  "1th": "1 Thessalonians",
  "2th": "2 Thessalonians",
  "1ti": "1 Timothy",
  "2ti": "2 Timothy",
  "tit": "Titus",
  "phm": "Philemon",
  "heb": "Hebrews",
  "jas": "James",
  "1pe": "1 Peter",
  "2pe": "2 Peter",
  "1jn": "1 John",
  "2jn": "2 John",
  "3jn": "3 John",
  "jud": "Jude",
  "rev": "Revelation"
};

// Use a reliable public domain Bible API
async function fetchChapter(bookCode: string, chapter: number): Promise<BibleChapter> {
  const bookName = bookNameMap[bookCode];
  if (!bookName) {
    throw new Error(`Libro no encontrado: ${bookCode}`);
  }

  try {
    // Try bible-api.com first (free and reliable)
    const response = await fetch(`https://bible-api.com/${bookName}+${chapter}?translation=rv1960`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      reference: data.reference,
      chapterNumber: chapter,
      verses: data.verses.map((verse: any) => ({
        number: verse.verse,
        text: verse.text
      }))
    };
  } catch (error) {
    // Fallback: Use a simple local data structure for common chapters
    const fallback = getFallbackChapter(bookCode, chapter);
    if (fallback) {
      return fallback;
    }
    
    throw new Error("No se pudo cargar el capítulo. Verifica tu conexión o intenta más tarde.");
  }
}

// Simple fallback for some common chapters
function getFallbackChapter(bookCode: string, chapter: number): BibleChapter | null {
  const fallbacks: Record<string, Record<number, BibleChapter>> = {
    "psa": {
      1: {
        reference: "Salmos 1",
        chapterNumber: 1,
        verses: [
          { number: 1, text: "Bienaventurado el varón que no anduvo en consejo de malos, Ni estuvo en camino de pecadores, Ni en silla de escarnecedores se ha sentado;" },
          { number: 2, text: "Sino que en la ley de Jehová está su delicia, Y en su ley medita de día y de noche." },
          { number: 3, text: "Será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará." }
        ]
      },
      23: {
        reference: "Salmos 23",
        chapterNumber: 23,
        verses: [
          { number: 1, text: "Jehová es mi pastor; nada me faltará." },
          { number: 2, text: "En lugares de delicados pastos me hará descansar; Junto a aguas de reposo me pastoreará." },
          { number: 3, text: "Confortará mi alma; Me guiará por sendas de justicia por amor de su nombre." }
        ]
      }
    },
    "jhn": {
      3: {
        reference: "Juan 3",
        chapterNumber: 3,
        verses: [
          { number: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." }
        ]
      }
    }
  };

  return fallbacks[bookCode]?.[chapter] || null;
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