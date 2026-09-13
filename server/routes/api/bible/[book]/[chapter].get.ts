import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

// Map our book codes to API book names
const bookNameMap: Record<string, string> = {
  "gen": "genesis",
  "exo": "exodo",
  "lev": "levitico",
  "num": "numeros",
  "deu": "deuteronomio",
  "jos": "josue",
  "jdg": "jueces",
  "rut": "rut",
  "1sa": "1-samuel",
  "2sa": "2-samuel",
  "1ki": "1-reyes",
  "2ki": "2-reyes",
  "1ch": "1-cronicas",
  "2ch": "2-cronicas",
  "ezr": "esdras",
  "neh": "nehemias",
  "est": "ester",
  "job": "job",
  "psa": "salmos",
  "pro": "proverbios",
  "ecc": "eclesiastes",
  "sng": "cantares",
  "isa": "isaias",
  "jer": "jeremias",
  "lam": "lamentaciones",
  "ezk": "ezequiel",
  "dan": "daniel",
  "hos": "oseas",
  "jol": "joel",
  "amo": "amos",
  "oba": "abdias",
  "jon": "jonas",
  "mic": "miqueas",
  "nam": "nahum",
  "hab": "habacuc",
  "zep": "sofonias",
  "hag": "hageo",
  "zec": "zacarias",
  "mal": "malaquias",
  "mat": "mateo",
  "mrk": "marcos",
  "luk": "lucas",
  "jhn": "juan",
  "act": "hechos",
  "rom": "romanos",
  "1co": "1-corintios",
  "2co": "2-corintios",
  "gal": "galatas",
  "eph": "efesios",
  "php": "filipenses",
  "col": "colosenses",
  "1th": "1-tesalonicenses",
  "2th": "2-tesalonicenses",
  "1ti": "1-timoteo",
  "2ti": "2-timoteo",
  "tit": "tito",
  "phm": "filemon",
  "heb": "hebreos",
  "jas": "santiago",
  "1pe": "1-pedro",
  "2pe": "2-pedro",
  "1jn": "1-juan",
  "2jn": "2-juan",
  "3jn": "3-juan",
  "jud": "judas",
  "rev": "apocalipsis"
};

export default defineHandler(async (event) => {
  const { book, chapter } = event.context.params;
  const query = getQuery(event);
  
  try {
    const apiBookName = bookNameMap[book];
    if (!apiBookName) {
      throw new Error(`Libro no encontrado: ${book}`);
    }

    // Using a reliable Bible API with proper CORS support
    // This API provides Reina Valera 1960 translation
    const API_URL = `https://bible-api.com/${apiBookName}+${chapter}?translation=rv1960`;
    
    console.log("Fetching from Bible API:", API_URL);
    
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'IglesiaVidaNuevaApp/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.verses || data.verses.length === 0) {
      throw new Error("No se encontraron versículos");
    }
    
    // Transform the API response to our format
    const verses = data.verses.map((verse: any) => ({
      number: verse.verse,
      text: verse.text
    }));
    
    return {
      success: true,
      data: {
        reference: data.reference,
        chapterNumber: parseInt(chapter),
        verses: verses
      }
    };
  } catch (error) {
    console.error("Bible API error:", error);
    return {
      success: false,
      error: "No se pudo cargar el capítulo",
      details: error instanceof Error ? error.message : "Error desconocido"
    };
  }
});