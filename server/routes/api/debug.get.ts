import { defineHandler } from "nitro";

export default defineHandler(async () => {
  // Test the Biblia API connectivity
  try {
    const testUrl = "https://api.biblia.com/v1/bible/content/RVR1960.txt.json?passage=juan3&key=fd37d8f28b95ae3b38a40a2b9ef6c5e4";
    const response = await fetch(testUrl);
    
    return {
      apiStatus: response.status,
      apiStatusText: response.statusText,
      apiWorking: response.ok,
      testUrl: testUrl,
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