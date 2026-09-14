import { defineHandler } from "nitro";

// Comprehensive mapping from Spanish book names to CDN book folder names
const BOOK_NAME_MAPPING: Record<string, string> = {
  "genesis": "genesis", "génesis": "genesis",
  "exodo": "exodus", "éxodo": "exodus",
  "levitico": "leviticus", "levítico": "leviticus",
  "numeros": "numbers", "números": "numbers",
  "deuteronomio": "deuteronomy",
  "josue": "joshua", "josué": "joshua",
  "jueces": "judges",
  "rut": "ruth",
  "1 samuel": "1-samuel", "1samuel": "1-samuel",
  "2 samuel": "2-samuel", "2samuel": "2-samuel",
  "1 reyes": "1-kings", "1reyes": "1-kings",
  "2 reyes": "2-kings", "2reyes": "2-kings",
  "1 cronicas": "1-chronicles", "1 crónicas": "1-chronicles",
  "2 cronicas": "2-chronicles", "2 crónicas": "2-chronicles",
  "esdras": "ezra",
  "nehemias": "nehemiah", "nehemías": "nehemiah",
  "ester": "esther",
  "job": "job",
  "salmos": "psalms", "salmo": "psalms",
  "proverbios": "proverbs",
  "eclesiastes": "ecclesiastes", "eclesiastés": "ecclesiastes",
  "cantares": "song-of-solomon", "cantar de los cantares": "song-of-solomon",
  "isaias": "isaiah", "isaías": "isaiah",
  "jeremias": "jeremiah", "jeremías": "jeremiah",
  "lamentaciones": "lamentations",
  "ezequiel": "ezekiel",
  "daniel": "daniel",
  "oseas": "hosea",
  "joel": "joel",
  "amos": "amos", "amós": "amos",
  "abdias": "obadiah", "abdías": "obadiah",
  "jonas": "jonah", "jonás": "jonah",
  "miqueas": "micah",
  "nahum": "nahum", "nahúm": "nahum",
  "habacuc": "habakkuk",
  "sofonias": "zephaniah", "sofonías": "zephaniah",
  "hageo": "haggai",
  "zacarias": "zechariah", "zacarías": "zechariah",
  "malaquias": "malachi", "malaquías": "malachi",
  "mateo": "matthew",
  "marcos": "mark",
  "lucas": "luke",
  "juan": "john", "san juan": "john",
  "hechos": "acts",
  "romanos": "romans",
  "1 corintios": "1-corinthians",
  "2 corintios": "2-corinthians",
  "galatas": "galatians", "gálatas": "galatians",
  "efesios": "ephesians",
  "filipenses": "philippians",
  "colosenses": "colossians",
  "1 tesalonicenses": "1-thessalonians",
  "2 tesalonicenses": "2-thessalonians",
  "1 timoteo": "1-timothy",
  "2 timoteo": "2-timothy",
  "tito": "titus",
  "filemon": "philemon", "filemón": "philemon",
  "hebreos": "hebrews",
  "santiago": "james",
  "1 pedro": "1-peter",
  "2 pedro": "2-peter",
  "1 juan": "1-john",
  "2 juan": "2-john",
  "3 juan": "3-john",
  "judas": "jude",
  "apocalipsis": "revelation"
};

export default defineHandler(async (event) => {
  const { book, chapter } = event.context.params;

  const chapterNum = parseInt(chapter, 10);
  if (!Number.isFinite(chapterNum) || chapterNum < 1) {
    return {
      success: false,
      error: `Capítulo inválido: ${chapter}`,
    };
  }

  // Normalize the book name
  const normalizedBookName = book.toLowerCase().trim();
  
  // Get the mapped English book slug
  const englishBookSlug = BOOK_NAME_MAPPING[normalizedBookName];
  
  if (!englishBookSlug) {
    return {
      success: false,
      error: `Libro no encontrado: ${book}`,
      availableBooks: Object.keys(BOOK_NAME_MAPPING).sort()
    };
  }

  console.log(`[Bible API] Requesting: ${book} -> ${englishBookSlug} ${chapterNum}`);

  try {
    const cdnUrl = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/es-rvr1960/books/${englishBookSlug}/chapters/${chapterNum}.json`;
    console.log(`[Bible API] Fetching from: ${cdnUrl}`);
    
    const response = await fetch(cdnUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: `Capítulo ${chapterNum} no encontrado para ${book}`,
        };
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our expected format
    const chapterData = {
      book: book,
      chapterNumber: chapterNum,
      verses: data.data.map((verse: any) => ({
        number: Number(verse.verse),
        text: verse.text
      }))
    };
    
    console.log(`[Bible API] Loaded ${chapterData.verses.length} verses for ${book} ${chapterNum}`);
    
    return {
      success: true,
      data: chapterData,
    };
  } catch (error) {
    console.error("[Bible API] Error:", error);
    return {
      success: false,
      error: "Error interno al cargar el capítulo",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
});