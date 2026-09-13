import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

export default defineHandler(async (event) => {
  const { book, chapter } = event.context.params;
  const query = getQuery(event);
  
  try {
    // Import the local database
    const { getSpanishBibleChapter } = await import("@/data/spanish-bible");
    
    // First try local database
    const localChapter = getSpanishBibleChapter(book, parseInt(chapter));
    if (localChapter) {
      return {
        success: true,
        data: localChapter,
        source: "local_database"
      };
    }
    
    // If not in local database, provide a helpful message
    const bookNames: Record<string, string> = {
      "gen": "Génesis", "exo": "Éxodo", "lev": "Levítico", "num": "Números", "deu": "Deuteronomio",
      "jos": "Josué", "jdg": "Jueces", "rut": "Rut", "1sa": "1 Samuel", "2sa": "2 Samuel",
      "1ki": "1 Reyes", "2ki": "2 Reyes", "1ch": "1 Crónicas", "2ch": "2 Crónicas",
      "ezr": "Esdras", "neh": "Nehemías", "est": "Ester", "job": "Job", "psa": "Salmos",
      "pro": "Proverbios", "ecc": "Eclesiastés", "sng": "Cantares", "isa": "Isaías",
      "jer": "Jeremías", "lam": "Lamentaciones", "ezk": "Ezequiel", "dan": "Daniel",
      "hos": "Oseas", "jol": "Joel", "amo": "Amós", "oba": "Abdías", "jon": "Jonás",
      "mic": "Miqueas", "nam": "Nahúm", "hab": "Habacuc", "zep": "Sofonías", "hag": "Hageo",
      "zec": "Zacarías", "mal": "Malaquías", "mat": "Mateo", "mrk": "Marcos", "luk": "Lucas",
      "jhn": "Juan", "act": "Hechos", "rom": "Romanos", "1co": "1 Corintios", "2co": "2 Corintios",
      "gal": "Gálatas", "eph": "Efesios", "php": "Filipenses", "col": "Colosenses",
      "1th": "1 Tesalonicenses", "2th": "2 Tesalonicenses", "1ti": "1 Timoteo", "2ti": "2 Timoteo",
      "tit": "Tito", "phm": "Filemón", "heb": "Hebreos", "jas": "Santiago", "1pe": "1 Pedro",
      "2pe": "2 Pedro", "1jn": "1 Juan", "2jn": "2 Juan", "3jn": "3 Juan", "jud": "Judas",
      "rev": "Apocalipsis"
    };
    
    const bookName = bookNames[book] || book;
    
    return {
      success: true,
      data: {
        reference: `${bookName} ${chapter}`,
        chapterNumber: parseInt(chapter),
        verses: [
          {
            number: 1,
            text: `Este capítulo no está disponible en la base de datos local. Para leer ${bookName} ${chapter}, por favor visita Blue Letter Bible o Bible Gateway.`
          }
        ]
      },
      source: "placeholder",
      note: "Capítulo no disponible localmente"
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