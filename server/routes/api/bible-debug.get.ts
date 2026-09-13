import { defineHandler } from "nitro";
import { getSpanishBibleChapter, getAvailableBooks } from "../../utils/spanish-bible";

export default defineHandler(async () => {
  const testCases = [
    { input: "genesis", expected: "genesis" },
    { input: "génesis", expected: "genesis" },
    { input: "gen", expected: "genesis" },
    { input: "salmos", expected: "salmos" },
    { input: "sal", expected: "salmos" },
    { input: "psa", expected: "salmos" },
    { input: "juan", expected: "juan" },
    { input: "jhn", expected: "juan" },
  ];

  const results = testCases.map(test => {
    const chapterData = getSpanishBibleChapter(test.input, 1);
    return {
      input: test.input,
      expected: test.expected,
      found: !!chapterData,
      bookName: chapterData?.book || "Not found"
    };
  });

  return {
    availableBooks: getAvailableBooks(),
    mappingTests: results,
    timestamp: new Date().toISOString()
  };
});