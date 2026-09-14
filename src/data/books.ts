// Spanish Bible books with codes that match the API expectations
export type BibleBook = {
  name: string;
  code: string;
  chapters: number;
};

export const BIBLE_BOOKS: BibleBook[] = [
  // Pentateuco
  { name: "Génesis", code: "genesis", chapters: 50 },
  { name: "Éxodo", code: "exodo", chapters: 40 },
  { name: "Levítico", code: "levitico", chapters: 27 },
  { name: "Números", code: "numeros", chapters: 36 },
  { name: "Deuteronomio", code: "deuteronomio", chapters: 34 },
  
  // Históricos
  { name: "Josué", code: "josue", chapters: 24 },
  { name: "Jueces", code: "jueces", chapters: 21 },
  { name: "Rut", code: "rut", chapters: 4 },
  { name: "1 Samuel", code: "1 samuel", chapters: 31 },
  { name: "2 Samuel", code: "2 samuel", chapters: 24 },
  { name: "1 Reyes", code: "1 reyes", chapters: 22 },
  { name: "2 Reyes", code: "2 reyes", chapters: 25 },
  { name: "1 Crónicas", code: "1 cronicas", chapters: 29 },
  { name: "2 Crónicas", code: "2 cronicas", chapters: 36 },
  { name: "Esdras", code: "esdras", chapters: 10 },
  { name: "Nehemías", code: "nehemias", chapters: 13 },
  { name: "Ester", code: "ester", chapters: 10 },
  
  // Poéticos
  { name: "Job", code: "job", chapters: 42 },
  { name: "Salmos", code: "salmos", chapters: 150 },
  { name: "Proverbios", code: "proverbios", chapters: 31 },
  { name: "Eclesiastés", code: "eclesiastes", chapters: 12 },
  { name: "Cantares", code: "cantares", chapters: 8 },
  
  // Profetas Mayores
  { name: "Isaías", code: "isaias", chapters: 66 },
  { name: "Jeremías", code: "jeremias", chapters: 52 },
  { name: "Lamentaciones", code: "lamentaciones", chapters: 5 },
  { name: "Ezequiel", code: "ezequiel", chapters: 48 },
  { name: "Daniel", code: "daniel", chapters: 12 },
  
  // Profetas Menores
  { name: "Oseas", code: "oseas", chapters: 14 },
  { name: "Joel", code: "joel", chapters: 3 },
  { name: "Amós", code: "amos", chapters: 9 },
  { name: "Abdías", code: "abdias", chapters: 1 },
  { name: "Jonás", code: "jonas", chapters: 4 },
  { name: "Miqueas", code: "miqueas", chapters: 7 },
  { name: "Nahúm", code: "nahum", chapters: 3 },
  { name: "Habacuc", code: "habacuc", chapters: 3 },
  { name: "Sofonías", code: "sofonias", chapters: 3 },
  { name: "Hageo", code: "hageo", chapters: 2 },
  { name: "Zacarías", code: "zacarias", chapters: 14 },
  { name: "Malaquías", code: "malaquias", chapters: 4 },
  
  // Evangelios y Hechos
  { name: "Mateo", code: "mateo", chapters: 28 },
  { name: "Marcos", code: "marcos", chapters: 16 },
  { name: "Lucas", code: "lucas", chapters: 24 },
  { name: "Juan", code: "juan", chapters: 21 },
  { name: "Hechos", code: "hechos", chapters: 28 },
  
  // Epístolas Paulinas
  { name: "Romanos", code: "romanos", chapters: 16 },
  { name: "1 Corintios", code: "1 corintios", chapters: 16 },
  { name: "2 Corintios", code: "2 corintios", chapters: 13 },
  { name: "Gálatas", code: "galatas", chapters: 6 },
  { name: "Efesios", code: "efesios", chapters: 6 },
  { name: "Filipenses", code: "filipenses", chapters: 4 },
  { name: "Colosenses", code: "colosenses", chapters: 4 },
  { name: "1 Tesalonicenses", code: "1 tesalonicenses", chapters: 5 },
  { name: "2 Tesalonicenses", code: "2 tesalonicenses", chapters: 3 },
  { name: "1 Timoteo", code: "1 timoteo", chapters: 6 },
  { name: "2 Timoteo", code: "2 timoteo", chapters: 4 },
  { name: "Tito", code: "tito", chapters: 3 },
  { name: "Filemón", code: "filemon", chapters: 1 },
  
  // Epístolas Generales y Profecía
  { name: "Hebreos", code: "hebreos", chapters: 13 },
  { name: "Santiago", code: "santiago", chapters: 5 },
  { name: "1 Pedro", code: "1 pedro", chapters: 5 },
  { name: "2 Pedro", code: "2 pedro", chapters: 3 },
  { name: "1 Juan", code: "1 juan", chapters: 5 },
  { name: "2 Juan", code: "2 juan", chapters: 1 },
  { name: "3 Juan", code: "3 juan", chapters: 1 },
  { name: "Judas", code: "judas", chapters: 1 },
  { name: "Apocalipsis", code: "apocalipsis", chapters: 22 }
];

// Split books into Old and New Testaments
export const OLD_TESTAMENT = BIBLE_BOOKS.slice(0, 39);
export const NEW_TESTAMENT = BIBLE_BOOKS.slice(39);