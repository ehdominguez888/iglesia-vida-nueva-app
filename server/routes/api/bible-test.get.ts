import { defineHandler } from "nitro";

export default defineHandler(async () => {
  const tests = [
    { label: "Génesis 1", book: "genesis", chapter: 1 },
    { label: "Salmos 23", book: "salmos", chapter: 23 },
    { label: "Juan 3", book: "juan", chapter: 3 },
  ];

  const results = [];

  for (const test of tests) {
    try {
      const url = `/api/bible/${test.book}/${test.chapter}`;
      console.log(`[Bible Test] Fetching: ${url}`);
      
      const response = await fetch(`http://localhost:8080${url}`);
      
      if (!response.ok) {
        const body = await response.text();
        results.push({
          label: test.label,
          url: url,
          status: response.status,
          ok: false,
          error: body.substring(0, 200),
        });
        continue;
      }

      const data = await response.json();
      results.push({
        label: test.label,
        url: url,
        status: response.status,
        ok: true,
        versesCount: data.data?.verses?.length ?? 0,
        firstVerse: data.data?.verses?.[0]?.text?.substring(0, 80) ?? "—",
        book: data.data?.book,
      });
    } catch (err) {
      results.push({
        label: test.label,
        url: `/api/bible/${test.book}/${test.chapter}`,
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return {
    timestamp: new Date().toISOString(),
    allPassed: results.every((r) => r.ok),
    results,
  };
});