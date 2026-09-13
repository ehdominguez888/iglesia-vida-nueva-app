import { defineHandler } from "nitro";

export default defineHandler(async () => {
  try {
    // Test the Bible API with a known passage
    const testUrl = "https://bible-api.com/juan+3:16?translation=rv1960";
    const response = await fetch(testUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      apiStatus: response.status,
      apiWorking: response.ok,
      testVerse: data.verses?.[0]?.text || "No verse found",
      reference: data.reference,
      translation: data.translation_name,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      apiWorking: false,
      timestamp: new Date().toISOString()
    };
  }
});