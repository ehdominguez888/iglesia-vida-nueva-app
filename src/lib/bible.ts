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
  "gen": "genesis",
  "exo": "exodus",
  "lev": "leviticus",
  "num": "numbers",
  "deu": "deuteronomy",
  "jos": "joshua",
  "jdg": "judges",
  "rut": "ruth",
  "1sa": "1 samuel",
  "2sa": "2 samuel",
  "1ki": "1 kings",
  "2ki": "2 kings",
  "1ch": "1 chronicles",
  "2ch": "2 chronicles",
  "ezr": "ezra",
  "neh": "nehemiah",
  "est": "esther",
  "job": "job",
  "psa": "psalms",
  "pro": "proverbs",
  "ecc": "ecclesiastes",
  "sng": "song of solomon",
  "isa": "isaiah",
  "jer": "jeremiah",
  "lam": "lamentations",
  "ezk": "ezekiel",
  "dan": "daniel",
  "hos": "hosea",
  "jol": "joel",
  "amo": "amos",
  "oba": "obadiah",
  "jon": "jonah",
  "mic": "micah",
  "nam": "nahum",
  "hab": "habakkuk",
  "zep": "zephaniah",
  "hag": "haggai",
  "zec": "zechariah",
  "mal": "malachi",
  "mat": "matthew",
  "mrk": "mark",
  "luk": "luke",
  "jhn": "john",
  "act": "acts",
  "rom": "romans",
  "1co": "1 corinthians",
  "2co": "2 corinthians",
  "gal": "galatians",
  "eph": "ephesians",
  "php": "philippians",
  "col": "colossians",
  "1th": "1 thessalonians",
  "2th": "2 thessalonians",
  "1ti": "1 timothy",
  "2ti": "2 timothy",
  "tit": "titus",
  "phm": "philemon",
  "heb": "hebrews",
  "jas": "james",
  "1pe": "1 peter",
  "2pe": "2 peter",
  "1jn": "1 john",
  "2jn": "2 john",
  "3jn": "3 john",
  "jud": "jude",
  "rev": "revelation"
};

// Use a reliable public domain Bible API
async function fetchChapter(bookCode: string, chapter: number): Promise<BibleChapter> {
  const bookName = bookNameMap[bookCode];
  if (!bookName) {
    throw new Error(`Libro no encontrado: ${bookCode}`);
  }

  try {
    // Try bible-api.com with proper URL encoding
    const url = `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=rv1960`;
    console.log("Fetching from:", url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.verses || !Array.isArray(data.verses)) {
      throw new Error("Formato de respuesta inválido");
    }
    
    return {
      reference: data.reference,
      chapterNumber: chapter,
      verses: data.verses.map((verse: any) => ({
        number: verse.verse,
        text: verse.text
      }))
    };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    // Fallback: Use a simple local data structure for common chapters
    const fallback = getFallbackChapter(bookCode, chapter);
    if (fallback) {
      return fallback;
    }
    
    throw new Error("No se pudo cargar el capítulo. Verifica tu conexión a internet e intenta de nuevo.");
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