import { defineHandler } from "nitro";
import { getSpanishBibleChapter } from "../../utils/spanish-bible";

export default defineHandler(async () => {
  try {
    // Test a simple chapter retrieval
    const chapterData = getSpanishBibleChapter("genesis", 1);
    
    if (!chapterData) {
      return {
        success: false,
        error: "Could not retrieve Genesis 1 from local database"
      };
    }

    return {
      success: true,
      data: chapterData,
      debug: {
        book: chapterData.book,
        chapterNumber: chapterData.chapterNumber,
        versesCount: chapterData.verses.length,
        firstVerse: chapterData.verses[0]?.text
      }
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    };
  }
});