import type { BibleBook } from "@/data/books";

/**
 * CONFIGURACIÓN DE LA BIBLIA (BLUE LETTER BIBLE)
 * ----------------------------------------------
 * La app no descarga textos bíblicos en segundo plano: construye enlaces
 * directos a Blue Letter Bible y los abre en una pestaña nueva del navegador.
 */

export type BibleVersion = {
  /** Slug de la versión usado por Blue Letter Bible en la URL. */
  id: string;
  /** Código corto mostrado en la interfaz (p. ej. «NVI»). */
  short: string;
  /** Nombre completo de la traducción. */
  label: string;
  language: "es" | "en";
};

/** Traducciones disponibles en Blue Letter Bible para esta app. */
export const BIBLE_VERSIONS: BibleVersion[] = [
  { id: "nvi", short: "NVI", label: "Nueva Versión Internacional", language: "es" },
  { id: "rvr60", short: "RVR60", label: "Reina-Valera 1960", language: "es" },
  { id: "esv", short: "ESV", label: "English Standard Version", language: "en" },
  { id: "kjv", short: "KJV", label: "King James Version", language: "en" },
];

export type BibleUrlParams = {
  versionCode: string;
  bookCode: string;
  chapter: number;
  /** Versículo de inicio; si se omite, se abre el capítulo completo. */
  verseStart?: number | null;
  /** Versículo final (opcional). BLB abre en el versículo de inicio. */
  verseEnd?: number | null;
};

/**
 * Construye el enlace a Blue Letter Bible para un pasaje dado.
 * Sin versículo inicial se abre el capítulo completo; con versículo
 * inicial se abre en ese versículo (los rangos se representan así).
 */
export function buildBibleUrl({
  versionCode,
  bookCode,
  chapter,
  verseStart,
}: BibleUrlParams): string {
  const safeChapter = Number.isFinite(chapter) && chapter >= 1 ? Math.floor(chapter) : 1;
  const base = `https://www.blueletterbible.org/${versionCode}/${bookCode}/${safeChapter}`;
  if (verseStart && verseStart >= 1) {
    return `${base}/${Math.floor(verseStart)}`;
  }
  return base;
}

/** Texto corto de la referencia, p. ej. «NVI · Juan 3:16» o «RVR60 · Salmo 1». */
export function formatReference({
  version,
  book,
  chapter,
  verseStart = null,
  verseEnd = null,
}: {
  version: BibleVersion;
  book: BibleBook;
  chapter: number;
  verseStart?: number | null;
  verseEnd?: number | null;
}): string {
  const bookName = version.language === "es" ? book.name : book.nameEn;
  const base = `${version.short} · ${bookName} ${chapter}`;
  if (verseStart && verseStart >= 1) {
    if (verseEnd && verseEnd >= 1 && verseEnd > verseStart) {
      return `${base}:${verseStart}–${verseEnd}`;
    }
    return `${base}:${verseStart}`;
  }
  return base;
}