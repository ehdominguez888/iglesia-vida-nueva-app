const MAX_EDGE = 1280; // Píxeles máximos en el lado más largo (para que las fotos no llenen el almacenamiento).
const JPEG_QUALITY = 0.72;

/**
 * Convierte un archivo de imagen (de la cámara o de la galería) en un
 * data URL comprimido y reducido, listo para guardarse en localStorage.
 * Devuelve `null` si el archivo no se puede procesar.
 */
export async function fileToNotePhoto(file: File): Promise<string | null> {
  try {
    const raw = await readImageAsDataUrl(file);
    // Intentamos reducir y comprimir; si falla, usamos la imagen original.
    try {
      return await compressImageDataUrl(raw);
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Reduce y comprime la imagen a JPEG para minimizar su tamaño en localStorage. */
async function compressImageDataUrl(dataUrl: string): Promise<string> {
  const blob = dataUrlToBlob(dataUrl);
  if (!blob) throw new Error("No se pudo leer la imagen.");

  const bitmap = await createImageBitmap(blob);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("No se pudo crear el lienzo.");
  }
  // Fondo blanco antes de pintar (evita bordes transparentes en JPEG).
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}

function dataUrlToBlob(dataUrl: string): Blob | null {
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return null;
  const meta = dataUrl.slice(0, comma);
  const match = /^data:([^;]+);base64,/.exec(meta);
  if (!match) return null;
  const b64 = dataUrl.slice(comma + 1);
  // Decodificación compatible con navegadores (atob) en bloques.
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: match[1] });
}