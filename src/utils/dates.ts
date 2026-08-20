/** Convierte una fecha ISO (yyyy-mm-dd) a un texto largo en español. */
export function formatLongDate(iso: string): string {
  if (!iso) return "Sin fecha";
  const date = parseISODate(iso);
  if (!date) return "Sin fecha";
  return date.toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Convierte una fecha ISO (yyyy-mm-dd) a un texto corto en español. */
export function formatShortDate(iso: string): string {
  if (!iso) return "";
  const date = parseISODate(iso);
  if (!date) return "";
  return date.toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
}

function parseISODate(iso: string): Date | null {
  const date = new Date(`${iso}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}