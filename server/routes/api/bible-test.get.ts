import { defineHandler } from "nitro";

export default defineHandler(async () => {
  const tests = [
    { label: "Juan 3:16", url: "https://bible-api.com/John+3:16?translation=rvr" },
    { label: "Levítico 1 (Leviticus)", url: "https://bible-api.com/Leviticus+1?translation=rvr" },
    { label: "Salmos 23 (Psalms)", url: "https://bible-api.com/Psalms+23?translation=rvr" },
  ];

  const results = [];

  for (const test of tests) {
    try {
      console.log(`[Bible Test] Fetching: ${test.url}`);
      const response = await fetch(test.url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const body = await response.text();
        results.push({
          label: test.label,
          url: test.url,
          status: response.status,
          ok: false,
          error: body.substring(0, 200),
        });
        continue;
      }

      const data = await response.json();
      results.push({
        label: test.label,
        url: test.url,
        status: response.status,
        ok: true,
        versesCount: data.verses?.length ?? 0,
        firstVerse: data.verses?.[0]?.text?.substring(0, 80) ?? "—",
        reference: data.reference,
      });
    } catch (err) {
      results.push({
        label: test.label,
        url: test.url,
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