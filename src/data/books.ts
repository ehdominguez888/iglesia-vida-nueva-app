/**
 * Catálogo de los 66 libros de la Biblia.
 * `code` es el identificador usado por la API getbible.net
 * (abreviaturas en inglés, iguales para todas las traducciones).
 */

export type Testament = "ot" | "nt";

export type BibleBook = {
  code: string;
  name: string; // Nombre en español
  nameEn: string; // Nombre en inglés (para traducciones en inglés)
  chapters: number;
  testament: Testament;
};

export const BIBLE_BOOKS: BibleBook[] = [
  // ---- Antiguo Testamento ----
  { code: "gen", name: "Génesis", nameEn: "Genesis", chapters: 50, testament: "ot" },
  { code: "exo", name: "Éxodo", nameEn: "Exodus", chapters: 40, testament: "ot" },
  { code: "lev", name: "Levítico", nameEn: "Leviticus", chapters: 27, testament: "ot" },
  { code: "num", name: "Números", nameEn: "Numbers", chapters: 36, testament: "ot" },
  { code: "deu", name: "Deuteronomio", nameEn: "Deuteronomy", chapters: 34, testament: "ot" },
  { code: "jos", name: "Josué", nameEn: "Joshua", chapters: 24, testament: "ot" },
  { code: "jdg", name: "Jueces", nameEn: "Judges", chapters: 21, testament: "ot" },
  { code: "rut", name: "Rut", nameEn: "Ruth", chapters: 4, testament: "ot" },
  { code: "1sa", name: "1 Samuel", nameEn: "1 Samuel", chapters: 31, testament: "ot" },
  { code: "2sa", name: "2 Samuel", nameEn: "2 Samuel", chapters: 24, testament: "ot" },
  { code: "1ki", name: "1 Reyes", nameEn: "1 Kings", chapters: 22, testament: "ot" },
  { code: "2ki", name: "2 Reyes", nameEn: "2 Kings", chapters: 25, testament: "ot" },
  { code: "1ch", name: "1 Crónicas", nameEn: "1 Chronicles", chapters: 29, testament: "ot" },
  { code: "2ch", name: "2 Crónicas", nameEn: "2 Chronicles", chapters: 36, testament: "ot" },
  { code: "ezr", name: "Esdras", nameEn: "Ezra", chapters: 10, testament: "ot" },
  { code: "neh", name: "Nehemías", nameEn: "Nehemiah", chapters: 13, testament: "ot" },
  { code: "est", name: "Ester", nameEn: "Esther", chapters: 10, testament: "ot" },
  { code: "job", name: "Job", nameEn: "Job", chapters: 42, testament: "ot" },
  { code: "psa", name: "Salmos", nameEn: "Psalms", chapters: 150, testament: "ot" },
  { code: "pro", name: "Proverbios", nameEn: "Proverbs", chapters: 31, testament: "ot" },
  { code: "ecc", name: "Eclesiastés", nameEn: "Ecclesiastes", chapters: 12, testament: "ot" },
  { code: "sng", name: "Cantares", nameEn: "Song of Solomon", chapters: 8, testament: "ot" },
  { code: "isa", name: "Isaías", nameEn: "Isaiah", chapters: 66, testament: "ot" },
  { code: "jer", name: "Jeremías", nameEn: "Jeremiah", chapters: 52, testament: "ot" },
  { code: "lam", name: "Lamentaciones", nameEn: "Lamentations", chapters: 5, testament: "ot" },
  { code: "ezk", name: "Ezequiel", nameEn: "Ezekiel", chapters: 48, testament: "ot" },
  { code: "dan", name: "Daniel", nameEn: "Daniel", chapters: 12, testament: "ot" },
  { code: "hos", name: "Oseas", nameEn: "Hosea", chapters: 14, testament: "ot" },
  { code: "jol", name: "Joel", nameEn: "Joel", chapters: 3, testament: "ot" },
  { code: "amo", name: "Amós", nameEn: "Amos", chapters: 9, testament: "ot" },
  { code: "oba", name: "Abdías", nameEn: "Obadiah", chapters: 1, testament: "ot" },
  { code: "jon", name: "Jonás", nameEn: "Jonah", chapters: 4, testament: "ot" },
  { code: "mic", name: "Miqueas", nameEn: "Micah", chapters: 7, testament: "ot" },
  { code: "nam", name: "Nahúm", nameEn: "Nahum", chapters: 3, testament: "ot" },
  { code: "hab", name: "Habacuc", nameEn: "Habakkuk", chapters: 3, testament: "ot" },
  { code: "zep", name: "Sofonías", nameEn: "Zephaniah", chapters: 3, testament: "ot" },
  { code: "hag", name: "Hageo", nameEn: "Haggai", chapters: 2, testament: "ot" },
  { code: "zec", name: "Zacarías", nameEn: "Zechariah", chapters: 14, testament: "ot" },
  { code: "mal", name: "Malaquías", nameEn: "Malachi", chapters: 4, testament: "ot" },
  // ---- Nuevo Testamento ----
  { code: "mat", name: "Mateo", nameEn: "Matthew", chapters: 28, testament: "nt" },
  { code: "mrk", name: "Marcos", nameEn: "Mark", chapters: 16, testament: "nt" },
  { code: "luk", name: "Lucas", nameEn: "Luke", chapters: 24, testament: "nt" },
  { code: "jhn", name: "Juan", nameEn: "John", chapters: 21, testament: "nt" },
  { code: "act", name: "Hechos", nameEn: "Acts", chapters: 28, testament: "nt" },
  { code: "rom", name: "Romanos", nameEn: "Romans", chapters: 16, testament: "nt" },
  { code: "1co", name: "1 Corintios", nameEn: "1 Corinthians", chapters: 16, testament: "nt" },
  { code: "2co", name: "2 Corintios", nameEn: "2 Corinthians", chapters: 13, testament: "nt" },
  { code: "gal", name: "Gálatas", nameEn: "Galatians", chapters: 6, testament: "nt" },
  { code: "eph", name: "Efesios", nameEn: "Ephesians", chapters: 6, testament: "nt" },
  { code: "php", name: "Filipenses", nameEn: "Philippians", chapters: 4, testament: "nt" },
  { code: "col", name: "Colosenses", nameEn: "Colossians", chapters: 4, testament: "nt" },
  { code: "1th", name: "1 Tesalonicenses", nameEn: "1 Thessalonians", chapters: 5, testament: "nt" },
  { code: "2th", name: "2 Tesalonicenses", nameEn: "2 Thessalonians", chapters: 3, testament: "nt" },
  { code: "1ti", name: "1 Timoteo", nameEn: "1 Timothy", chapters: 6, testament: "nt" },
  { code: "2ti", name: "2 Timoteo", nameEn: "2 Timothy", chapters: 4, testament: "nt" },
  { code: "tit", name: "Tito", nameEn: "Titus", chapters: 3, testament: "nt" },
  { code: "phm", name: "Filemón", nameEn: "Philemon", chapters: 1, testament: "nt" },
  { code: "heb", name: "Hebreos", nameEn: "Hebrews", chapters: 13, testament: "nt" },
  { code: "jas", name: "Santiago", nameEn: "James", chapters: 5, testament: "nt" },
  { code: "1pe", name: "1 Pedro", nameEn: "1 Peter", chapters: 5, testament: "nt" },
  { code: "2pe", name: "2 Pedro", nameEn: "2 Peter", chapters: 3, testament: "nt" },
  { code: "1jn", name: "1 Juan", nameEn: "1 John", chapters: 5, testament: "nt" },
  { code: "2jn", name: "2 Juan", nameEn: "2 John", chapters: 1, testament: "nt" },
  { code: "3jn", name: "3 Juan", nameEn: "3 John", chapters: 1, testament: "nt" },
  { code: "jud", name: "Judas", nameEn: "Jude", chapters: 1, testament: "nt" },
  { code: "rev", name: "Apocalipsis", nameEn: "Revelation", chapters: 22, testament: "nt" },
];

export const OLD_TESTAMENT = BIBLE_BOOKS.filter((b) => b.testament === "ot");
export const NEW_TESTAMENT = BIBLE_BOOKS.filter((b) => b.testament === "nt");