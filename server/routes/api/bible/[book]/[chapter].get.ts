import { defineHandler } from "nitro";

/**
 * bible-api.com expects English book names or specific abbreviations.
 * We map our internal book codes to the exact format bible-api.com accepts.
 * Tested format: https://bible-api.com/John+3?translation=rvr
 *
 * NOTE: The translation parameter is "rvr" (not "rv1960").
 */
const bookApiNameMap: Record<string, string> = {
  gen: "Genesis",
  exo: "Exodus",
  lev: "Leviticus",
  num: "Numbers",
  deu: "Deuteronomy",
  jos: "Joshua",
  jdg: "Judges",
  rut: "Ruth",
  "1sa": "1Samuel",
  "2sa": "2Samuel",
  "1ki": "1Kings",
  "2ki": "2Kings",
  "1ch": "1Chronicles",
  "2ch": "2Chronicles",
  ezr: "Ezra",
  neh: "Nehemiah",
  est: "Esther",
  job: "Job",
  psa: "Psalms",
  pro: "Proverbs",
  ecc: "Ecclesiastes",
  sng: "SongOfSolomon",
  isa: "Isaiah",
  jer: "Jeremiah",
  lam: "Lamentations",
  ezk: "Ezekiel",
  dan: "Daniel",
  hos: "Hosea",
  jol: "Joel",
  amo: "Amos",
  oba: "Obadiah",
  jon: "Jonah",
  mic: "Micah",
  nam: "Nahum",
  hab: "Habakkuk",
  zep: "Zephaniah",
  hag: "Haggai",
  zec: "Zechariah",
  mal: "Malachi",
  mat: "Matthew",
  mrk: "Mark",
  luk: "Luke",
  jhn: "John",
  act: "Acts",
  rom: "Romans",
  "1co": "1Corinthians",
  "2co": "2Corinthians",
  gal: "Galatians",
  eph: "Ephesians",
  php: "Philippians",
  col: "Colossians",
  "1th": "1Thessalonians",
  "2th": "2Thessalonians",
  "1ti": "1Timothy",
  "2ti": "2Timothy",
  tit: "Titus",
  phm: "Philemon",
  heb: "Hebrews",
  jas: "James",
  "1pe": "1Peter",
  "2pe": "2Peter",
  "1jn": "1John",
  "2jn": "2John",
  "3jn": "3John",
  jud: "Jude",
  rev: "Revelation",
};

/** Spanish display names so we can build a nice reference string. */
const bookSpanishName: Record<string, string> = {
  gen: "Génesis", exo: "Éxodo", lev: "Levítico", num: "Números",
  deu: "Deuteronomio", jos: "Josué", jdg: "Jueces", rut: "Rut",
  "1sa": "1 Samuel", "2sa": "2 Samuel", "1ki": "1 Reyes", "2ki": "2 Reyes",
  "1ch": "1 Crónicas", "2ch": "2 Crónicas", ezr: "Esdras", neh: "Nehemías",
  est: "Ester", job: "Job", psa: "Salmos", pro: "Proverbios",
  ecc: "Eclesiastés", sng: "Cantares", isa: "Isaías", jer: "Jeremías",
  lam: "Lamentaciones", ezk: "Ezequiel", dan: "Daniel", hos: "Oseas",
  jol: "Joel", amo: "Amós", oba: "Abdías", jon: "Jonás",
  mic: "Miqueas", nam: "Nahúm", hab: "Habacuc", zep: "Sofonías",
  hag: "Hageo", zec: "Zacarías", mal: "Malaquías", mat: "Mateo",
  mrk: "Marcos", luk: "Lucas", jhn: "Juan", act: "Hechos",
  rom: "Romanos", "1co": "1 Corintios", "2co": "2 Corintios", gal: "Gálatas",
  eph: "Efesios", php: "Filipenses", col: "Colosenses",
  "1th": "1 Tesalonicenses", "2th": "2 Tesalonicenses",
  "1ti": "1 Timoteo", "2ti": "2 Timoteo", tit: "Tito", phm: "Filemón",
  heb: "Hebreos", jas: "Santiago", "1pe": "1 Pedro", "2pe": "2 Pedro",
  "1jn": "1 Juan", "2jn": "2 Juan", "3jn": "3 Juan", jud: "Judas",
  rev: "Apocalipsis",
};

export default defineHandler(async (event) => {
  const { book, chapter } = event.context.params;

  const apiBookName = bookApiNameMap[book];
  if (!apiBookName) {
    return {
      success: false,
      error: `Libro no reconocido: ${book}`,
    };
  }

  const chapterNum = parseInt(chapter, 10);
  if (!Number.isFinite(chapterNum) || chapterNum < 1) {
    return {
      success: false,
      error: `Capítulo inválido: ${chapter}`,
    };
  }

  // bible-api.com uses English book names and "rvr" as the translation code
  const apiUrl = `https://bible-api.com/${encodeURIComponent(apiBookName)}+${chapterNum}?translation=rvr`;

  console.log(`[Bible API] Requesting: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "IglesiaVidaNuevaApp/1.0",
      },
    });

    console.log(`[Bible API] Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[Bible API] Error body: ${errorBody.substring(0, 300)}`);
      throw new Error(`API respondió con ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.verses || data.verses.length === 0) {
      console.error("[Bible API] Response had no verses:", JSON.stringify(data).substring(0, 300));
      throw new Error("La API no devolvió versículos para este capítulo.");
    }

    console.log(`[Bible API] Loaded ${data.verses.length} verses for ${apiBookName} ${chapterNum}`);

    const spanishName = bookSpanishName[book] || apiBookName;

    const verses = data.verses.map((v: any) => ({
      number: v.verse,
      text: typeof v.text === "string" ? v.text.trim() : String(v.text).trim(),
    }));

    return {
      success: true,
      data: {
        reference: `${spanishName} ${chapterNum}`,
        chapterNumber: chapterNum,
        verses,
      },
    };
  } catch (error) {
    console.error("[Bible API] Fetch error:", error);
    return {
      success: false,
      error: "No se pudo cargar el capítulo. Verifica tu conexión a internet.",
      details: error instanceof Error ? error.message : "Error desconocido",
      requestedUrl: apiUrl,
    };
  }
});