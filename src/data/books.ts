/**
 * Catálogo de los 66 libros de la Biblia.
 * Updated to use Spanish slugs that match our local Bible database
 */

export type Testament = "ot" | "nt";

export type BibleBook = {
  code: string; // Spanish slug that matches our local database
  name: string; // Nombre en español
  nameEn: string; // Nombre en inglés (para traducciones en inglés)
  chapters: number;
  testament: Testament;
};

export const BIBLE_BOOKS: BibleBook[] = [
  // ---- Antiguo Testamento ----
  { code: "genesis", name: "Génesis", nameEn: "Genesis", chapters: 50, testament: "ot" },
  { code: "exodo", name: "Éxodo", nameEn: "Exodus", chapters: 40, testament: "ot" },
  { code: "levitico", name: "Levítico", nameEn: "Leviticus", chapters: 27, testament: "ot" },
  { code: "numeros", name: "Números", nameEn: "Numbers", chapters: 36, testament: "ot" },
  { code: "deuteronomio", name: "Deuteronomio", nameEn: "Deuteronomy", chapters: 34, testament: "ot" },
  { code: "josue", name: "Josué", nameEn: "Joshua", chapters: 24, testament: "ot" },
  { code: "jueces", name: "Jueces", nameEn: "Judges", chapters: 21, testament: "ot" },
  { code: "rut", name: "Rut", nameEn: "Ruth", chapters: 4, testament: "ot" },
  { code: "1samuel", name: "1 Samuel", nameEn: "1 Samuel", chapters: 31, testament: "ot" },
  { code: "2samuel", name: "2 Samuel", nameEn: "2 Samuel", chapters: 24, testament: "ot" },
  { code: "1reyes", name: "1 Reyes", nameEn: "1 Kings", chapters: 22, testament: "ot" },
  { code: "2reyes", name: "2 Reyes", nameEn: "2 Kings", chapters: 25, testament: "ot" },
  { code: "1cronicas", name: "1 Crónicas", nameEn: "1 Chronicles", chapters: 29, testament: "ot" },
  { code: "2cronicas", name: "2 Crónicas", nameEn: "2 Chronicles", chapters: 36, testament: "ot" },
  { code: "esdras", name: "Esdras", nameEn: "Ezra", chapters: 10, testament: "ot" },
  { code: "nehemias", name: "Nehemías", nameEn: "Nehemiah", chapters: 13, testament: "ot" },
  { code: "ester", name: "Ester", nameEn: "Esther", chapters: 10, testament: "ot" },
  { code: "job", name: "Job", nameEn: "Job", chapters: 42, testament: "ot" },
  { code: "salmos", name: "Salmos", nameEn: "Psalms", chapters: 150, testament: "ot" },
  { code: "proverbios", name: "Proverbios", nameEn: "Proverbs", chapters: 31, testament: "ot" },
  { code: "eclesiastes", name: "Eclesiastés", nameEn: "Ecclesiastes", chapters: 12, testament: "ot" },
  { code: "cantares", name: "Cantares", nameEn: "Song of Solomon", chapters: 8, testament: "ot" },
  { code: "isaias", name: "Isaías", nameEn: "Isaiah", chapters: 66, testament: "ot" },
  { code: "jeremias", name: "Jeremías", nameEn: "Jeremiah", chapters: 52, testament: "ot" },
  { code: "lamentaciones", name: "Lamentaciones", nameEn: "Lamentations", chapters: 5, testament: "ot" },
  { code: "ezequiel", name: "Ezequiel", nameEn: "Ezekiel", chapters: 48, testament: "ot" },
  { code: "daniel", name: "Daniel", nameEn: "Daniel", chapters: 12, testament: "ot" },
  { code: "oseas", name: "Oseas", nameEn: "Hosea", chapters: 14, testament: "ot" },
  { code: "joel", name: "Joel", nameEn: "Joel", chapters: 3, testament: "ot" },
  { code: "amos", name: "Amós", nameEn: "Amos", chapters: 9, testament: "ot" },
  { code: "abdias", name: "Abdías", nameEn: "Obadiah", chapters: 1, testament: "ot" },
  { code: "jonas", name: "Jonás", nameEn: "Jonah", chapters: 4, testament: "ot" },
  { code: "miqueas", name: "Miqueas", nameEn: "Micah", chapters: 7, testament: "ot" },
  { code: "nahum", name: "Nahúm", nameEn: "Nahum", chapters: 3, testament: "ot" },
  { code: "habacuc", name: "Habacuc", nameEn: "Habakkuk", chapters: 3, testament: "ot" },
  { code: "sofonias", name: "Sofonías", nameEn: "Zephaniah", chapters: 3, testament: "ot" },
  { code: "hageo", name: "Hageo", nameEn: "Haggai", chapters: 2, testament: "ot" },
  { code: "zacarias", name: "Zacarías", nameEn: "Zechariah", chapters: 14, testament: "ot" },
  { code: "malaquias", name: "Malaquías", nameEn: "Malachi", chapters: 4, testament: "ot" },
  // ---- Nuevo Testamento ----
  { code: "mateo", name: "Mateo", nameEn: "Matthew", chapters: 28, testament: "nt" },
  { code: "marcos", name: "Marcos", nameEn: "Mark", chapters: 16, testament: "nt" },
  { code: "lucas", name: "Lucas", nameEn: "Luke", chapters: 24, testament: "nt" },
  { code: "juan", name: "Juan", nameEn: "John", chapters: 21, testament: "nt" },
  { code: "hechos", name: "Hechos", nameEn: "Acts", chapters: 28, testament: "nt" },
  { code: "romanos", name: "Romanos", nameEn: "Romans", chapters: 16, testament: "nt" },
  { code: "1corintios", name: "1 Corintios", nameEn: "1 Corinthians", chapters: 16, testament: "nt" },
  { code: "2corintios", name: "2 Corintios", nameEn: "2 Corinthians", chapters: 13, testament: "nt" },
  { code: "galatas", name: "Gálatas", nameEn: "Galatians", chapters: 6, testament: "nt" },
  { code: "efesios", name: "Efesios", nameEn: "Ephesians", chapters: 6, testament: "nt" },
  { code: "filipenses", name: "Filipenses", nameEn: "Philippians", chapters: 4, testament: "nt" },
  { code: "colosenses", name: "Colosenses", nameEn: "Colossians", chapters: 4, testament: "nt" },
  { code: "1tesalonicenses", name: "1 Tesalonicenses", nameEn: "1 Thessalonians", chapters: 5, testament: "nt" },
  { code: "2tesalonicenses", name: "2 Tesalonicenses", nameEn: "2 Thessalonians", chapters: 3, testament: "nt" },
  { code: "1timoteo", name: "1 Timoteo", nameEn: "1 Timothy", chapters: 6, testament: "nt" },
  { code: "2timoteo", name: "2 Timoteo", nameEn: "2 Timothy", chapters: 4, testament: "nt" },
  { code: "tito", name: "Tito", nameEn: "Titus", chapters: 3, testament: "nt" },
  { code: "filemon", name: "Filemón", nameEn: "Philemon", chapters: 1, testament: "nt" },
  { code: "hebreos", name: "Hebreos", nameEn: "Hebrews", chapters: 13, testament: "nt" },
  { code: "santiago", name: "Santiago", nameEn: "James", chapters: 5, testament: "nt" },
  { code: "1pedro", name: "1 Pedro", nameEn: "1 Peter", chapters: 5, testament: "nt" },
  { code: "2pedro", name: "2 Pedro", nameEn: "2 Peter", chapters: 3, testament: "nt" },
  { code: "1juan", name: "1 Juan", nameEn: "1 John", chapters: 5, testament: "nt" },
  { code: "2juan", name: "2 Juan", nameEn: "2 John", chapters: 1, testament: "nt" },
  { code: "3juan", name: "3 Juan", nameEn: "3 John", chapters: 1, testament: "nt" },
  { code: "judas", name: "Judas", nameEn: "Jude", chapters: 1, testament: "nt" },
  { code: "apocalipsis", name: "Apocalipsis", nameEn: "Revelation", chapters: 22, testament: "nt" },
];

export const OLD_TESTAMENT = BIBLE_BOOKS.filter((b) => b.testament === "ot");
export const NEW_TESTAMENT = BIBLE_BOOKS.filter((b) => b.testament === "nt");