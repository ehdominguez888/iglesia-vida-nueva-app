import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

export default defineHandler(async (event) => {
  const { book, chapter } = event.context.params;
  const query = getQuery(event);
  const version = query.version || "rv1960";

  try {
    // Use bible-api.com with proper URL construction
    const url = `https://bible-api.com/${book}+${chapter}?translation=${version}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: {
        reference: data.reference,
        chapterNumber: parseInt(chapter),
        verses: data.verses.map((verse: any) => ({
          number: verse.verse,
          text: verse.text
        }))
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