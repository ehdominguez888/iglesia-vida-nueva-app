import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

// Comprehensive dictionary mapping Spanish book variations to canonical English names for bible-api.com
const BOOK_NAME_MAPPING: Record<string, string> = {
  // Pentateuco
  "genesis": "Genesis", "génesis": "Genesis", "gen": "Genesis",
  "exodo": "Exodus", "éxodo": "Exodus", "exo": "Exodus",
  "levitico": "Leviticus", "levítico": "Leviticus", "lev": "Leviticus",
  "numeros": "Numbers", "números": "Numbers", "num": "Numbers",
  "deuteronomio": "Deuteronomy", "deu": "Deuteronomy",
  
  // Históricos
  "josue": "Joshua", "josué": "Joshua", "jos": "Joshua",
  "jueces": "Judges", "jue": "Judges", "jdg": "Judges",
  "rut": "Ruth", "ruth": "Ruth",
  "1 samuel": "1 Samuel", "1samuel": "1 Samuel", "1 sam": "1 Samuel", "1sam": "1 Samuel",
  "2 samuel": "2 Samuel", "2samuel": "2 Samuel", "2 sam": "2 Samuel", "2sam": "2 Samuel",
  "1 reyes": "1 Kings", "1reyes": "1 Kings", "1 rey": "1 Kings", "1rey": "1 Kings",
  "2 reyes": "2 Kings", "2reyes": "2 Kings", "2 rey": "2 Kings", "2rey": "2 Kings",
  "1 cronicas": "1 Chronicles", "1 crónicas": "1 Chronicles", "1 cron": "1 Chronicles", "1cr": "1 Chronicles",
  "2 cronicas": "2 Chronicles", "2 crónicas": "2 Chronicles", "2 cron": "2 Chronicles", "2cr": "2 Chronicles",
  "esdras": "Ezra", "ezra": "Ezra", "ezr": "Ezra",
  "nehemias": "Nehemiah", "nehemías": "Nehemiah", "neh": "Nehemiah",
  "ester": "Esther", "esther": "Esther", "est": "Esther",
  
  // Poéticos
  "job": "Job",
  "salmos": "Psalms", "salmo": "Psalms", "sal": "Psalms", "psa": "Psalms",
  "proverbios": "Proverbs", "pro": "Proverbs", "prv": "Proverbs",
  "eclesiastes": "Ecclesiastes", "eclesiastés": "Ecclesiastes", "ecl": "Ecclesiastes", "ecc": "Ecclesiastes",
  "cantares": "Song of Solomon", "cantar de los cantares": "Song of Solomon", "cant": "Song of Solomon", "sng": "Song of Solomon",
  
  // Profetas Mayores
  "isaias": "Isaiah", "isaías": "Isaiah", "isa": "Isaiah",
  "jeremias": "Jeremiah", "jeremías": "Jeremiah", "jer": "Jeremiah",
  "lamentaciones": "Lamentations", "lam": "Lamentations",
  "ezequiel": "Ezekiel", "ezk": "Ezekiel",
  "daniel": "Daniel", "dan": "Daniel",
  
  // Profetas Menores
  "oseas": "Hosea", "hos": "Hosea",
  "joel": "Joel", "jol": "Joel",
  "amos": "Amos", "amós": "Amos", "amo": "Amos",
  "abdias": "Obadiah", "abdías": "Obadiah", "oba": "Obadiah",
  "jonas": "Jonah", "jonás": "Jonah", "jon": "Jonah",
  "miqueas": "Micah", "mic": "Micah",
  "nahum": "Nahum", "nahúm": "Nahum", "nam": "Nahum",
  "habacuc": "Habakkuk", "hab": "Habakkuk",
  "sofonias": "Zephaniah", "sofonías": "Zephaniah", "zep": "Zephaniah",
  "hageo": "Haggai", "hag": "Haggai",
  "zacarias": "Zechariah", "zacarías": "Zechariah", "zec": "Zechariah",
  "malaquias": "Malachi", "malaquías": "Malachi", "mal": "Malachi",
  
  // Evangelios y Hechos
  "mateo": "Matthew", "mat": "Matthew", "matt": "Matthew",
  "marcos": "Mark", "mar": "Mark", "mrk": "Mark",
  "lucas": "Luke", "luc": "Luke", "luk": "Luke",
  "juan": "John", "san juan": "John", "jhn": "John",
  "hechos": "Acts", "act": "Acts",
  
  // Epístolas Paulinas
  "romanos": "Romans", "rom": "Romans",
  "1 corintios": "1 Corinthians", "1corintios": "1 Corinthians", "1 cor": "1 Corinthians", "1cor": "1 Corinthians",
  "2 corintios": "2 Corinthians", "2corintios": "2 Corinthians", "2 cor": "2 Corinthians", "2cor": "2 Corinthians",
  "galatas": "Galatians", "gálatas": "Galatians", "gal": "Galatians",
  "efesios": "Ephesians", "eph": "Ephesians",
  "filipenses": "Philippians", "php": "Philippians",
  "colosenses": "Colossians", "col": "Colossians",
  "1 tesalonicenses": "1 Thessalonians", "1tesalonicenses": "1 Thessalonians", "1 tes": "1 Thessalonians", "1tes": "1 Thessalonians",
  "2 tesalonicenses": "2 Thessalonians", "2tesalonicenses": "2 Thessalonians", "2 tes": "2 Thessalonians", "2tes": "2 Thessalonians",
  "1 timoteo": "1 Timothy", "1timoteo": "1 Timothy", "1 tim": "1 Timothy", "1tim": "1 Timothy",
  "2 timoteo": "2 Timothy", "2timoteo": "2 Timothy", "2 tim": "2 Timothy", "2tim": "2 Timothy",
  "tito": "Titus", "tit": "Titus",
  "filemon": "Philemon", "filemón": "Philemon", "phm": "Philemon",
  
  // Epístolas Generales y Profecía
  "hebreos": "Hebrews", "heb": "Hebrews",
  "santiago": "James", "sant": "James", "jas": "James",
  "1 pedro": "1 Peter", "1pedro": "1 Peter", "1 pe": "1 Peter", "1pe": "1 Peter",
  "2 pedro": "2 Peter", "2pedro": "2 Peter", "2 pe": "2 Peter", "2pe": "2 Peter",
  "1 juan": "1 John", "1juan": "1 John", "1 jn": "1 John", "1jn": "1 John",
  "2 juan": "2 John", "2juan": "2 John", "2 jn": "2 John", "2jn": "2 John",
  "3 juan": "3 John", "3juan": "3 John", "3 jn": "3 John", "3jn": "3 John",
  "judas": "Jude", "jud": "Jude",
  "apocalipsis": "Revelation", "apo": "Revelation", "rev": "Revelation"
};

export default defineHandler(async (event) => {
  try {
    const { book, chapter } = event.context.params;
    const query = getQuery(event);
    const startVerse = query.startVerse ? parseInt(query.startVerse as string) : null;
    const endVerse = query.endVerse ? parseInt(query.endVerse as string) : null;

    // Validate chapter
    const chapterNum = parseInt(chapter, 10);
    if (!Number.isFinite(chapterNum) || chapterNum < 1) {
      return {
        success: false,
        error: `Capítulo inválido: ${chapter}`,
        status: 400
      };
    }

    // Validate verse range
    if (startVerse !== null && (!Number.isFinite(startVerse) || startVerse < 1)) {
      return {
        success: false,
        error: `Versículo inicial inválido: ${startVerse}`,
        status: 400
      };
    }
    if (endVerse !== null && (!Number.isFinite(endVerse) || endVerse < 1)) {
      return {
        success: false,
        error: `Versículo final inválido: ${endVerse}`,
        status: 400
      };
    }
    if (startVerse !== null && endVerse !== null && endVerse < startVerse) {
      return {
        success: false,
        error: `El versículo final (${endVerse}) no puede ser menor que el inicial (${startVerse})`,
        status: 400
      };
    }

    // Normalize and resolve book name
    const normalizedBookName = book.toLowerCase().trim();
    const resolvedBook = BOOK_NAME_MAPPING[normalizedBookName] || normalizedBookName;

    // Construct passage string for bible-api.com
    let passageString = `${resolvedBook}+${chapterNum}`;
    if (startVerse !== null) {
      if (endVerse !== null && endVerse > startVerse) {
        passageString = `${resolvedBook}+${chapterNum}:${startVerse}-${endVerse}`;
      } else {
        passageString = `${resolvedBook}+${chapterNum}:${startVerse}`;
      }
    }

    console.log(`[Bible API] Requesting: ${book} -> ${resolvedBook} ${passageString}`);

    // Fetch from bible-api.com
    const apiUrl = `https://bible-api.com/${passageString}?translation=rvr`;
    console.log(`[Bible API] Fetching from: ${apiUrl}`);

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Bible API] HTTP Error ${response.status}:`, errorText);
      
      return {
        success: false,
        error: `Error al cargar el pasaje: ${response.status} ${response.statusText}`,
        status: response.status,
        details: errorText
      };
    }

    const data = await response.json();
    
    // Check for API error response
    if (data.error) {
      console.error(`[Bible API] API Error:`, data.error);
      return {
        success: false,
        error: `Pasaje no encontrado: ${data.error}`,
        status: 404,
        details: data.error
      };
    }

    // Transform data to our format
    const chapterData = {
      reference: data.reference,
      book: book,
      chapter: chapterNum,
      translation_name: "Reina-Valera 1960",
      verses: data.verses.map((v: any) => ({
        number: v.verse,
        text: v.text.trim()
      }))
    };

    console.log(`[Bible API] Loaded ${chapterData.verses.length} verses for ${passageString}`);

    return {
      success: true,
      data: chapterData,
    };

  } catch (error) {
    console.error("[Bible API] Error:", error);
    return {
      success: false,
      error: "Error interno al cargar el capítulo",
      status: 500,
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
});