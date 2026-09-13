import { defineHandler } from "nitro";
import { getSpanishBibleChapter } from "../../../utils/spanish-bible";

export default defineHandler(async (event) => {
  const { book, chapter } = event.context.params;

  const chapterNum = parseInt(chapter, 10);
  if (!Number.isFinite(chapterNum) || chapterNum < 1) {
    return {
      success: false,
      error: `Capítulo inválido: ${chapter}`,
    };
  }

  console.log(`[Local Bible API] Requesting: ${book} ${chapterNum}`);

  try {
    const chapterData = getSpanishBibleChapter(book, chapterNum);

    if (!chapterData) {
      return {
        success: false,
        error: `No se encontró el capítulo ${chapterNum} del libro ${book}`,
      };
    }

    console.log(`[Local Bible API] Loaded ${chapterData.verses.length} verses for ${chapterData.book} ${chapterNum}`);

    return {
      success: true,
      data: chapterData,
    };
  } catch (error) {
    console极速赛车开奖结果历史记录
    return {
      success: false,
      error: "Error interno al cargar el capítulo",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
});