import { useState, useEffect } from "react";
import { Loader2, BookOpenText, RefreshCw, AlertCircle } from "lucide-react";
import { type BibleBook } from "@/data/books";
import { showError } from "@/utils/toast";
import { Button } from "@/components/ui/button";

type BibleVerse = {
  number: number;
  text: string;
};

type BibleChapter = {
  reference: string;
  book: string;
  chapter: number;
  translation_name: string;
  verses: BibleVerse[];
};

type BibleReaderProps = {
  book: BibleBook;
  chapter: number;
  verseStart?: number | null;
  verseEnd?: number | null;
};

const CACHE_KEY_PREFIX = "inv:bible";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const cacheKey = (book: string, chapter: number, verseStart?: number | null, verseEnd?: number | null) => {
  let key = `${CACHE_KEY_PREFIX}:${book}:${chapter}`;
  if (verseStart !== null && verseStart !== undefined) {
    key += `:${verseStart}`;
    if (verseEnd !== null && verseEnd !== undefined && verseEnd > verseStart) {
      key += `-${verseEnd}`;
    }
  }
  return key;
};

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt: number; data: T };
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Storage full — ignore
  }
}

async function fetchChapter(
  book: string, 
  chapter: number, 
  verseStart?: number | null, 
  verseEnd?: number | null
): Promise<BibleChapter> {
  const params = new URLSearchParams();
  if (verseStart !== null && verseStart !== undefined) {
    params.append("startVerse", verseStart.toString());
  }
  if (verseEnd !== null && verseEnd !== undefined) {
    params.append("endVerse", verseEnd.toString());
  }

  const queryString = params.toString();
  const url = `/api/bible/${book}/${chapter}${queryString ? `?${queryString}` : ''}`;

  console.log(`Fetching Bible chapter: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Error HTTP ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || result.details || "Error al cargar el capítulo");
  }

  return result.data;
}

/** Clears the entire Bible cache so every chapter is re-fetched. */
export function clearBibleCache() {
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(CACHE_KEY_PREFIX)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // noop
  }
}

const BibleReader = ({ book, chapter, verseStart, verseEnd }: BibleReaderProps) => {
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChapter = async (bustCache = false) => {
    setLoading(true);
    setError(null);

    const key = cacheKey(book.code, chapter, verseStart, verseEnd);
    
    if (!bustCache) {
      const cached = readCache<BibleChapter>(key);
      if (cached) {
        setChapterData(cached);
        setLoading(false);
        return;
      }
    } else {
      clearBibleCache();
    }

    try {
      console.log(`Loading chapter: ${book.code} ${chapter} ${verseStart ? `verses ${verseStart}${verseEnd && verseEnd > verseStart ? `-${verseEnd}` : ''}` : ''}`);
      const data = await fetchChapter(book.code, chapter, verseStart, verseEnd);
      console.log(`Chapter loaded:`, data);
      setChapterData(data);
      writeCache(key, data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al cargar el capítulo";
      console.error(`Error loading chapter:`, err);
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChapter();
  }, [book.code, chapter, verseStart, verseEnd]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-border bg-card">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Cargando {book.name} {chapter}
            {verseStart ? `:${verseStart}` : ''}
            {verseEnd && verseEnd > verseStart ? `-${verseEnd}` : ''}
            …
          </p>
        </div>
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive/70" />
        <h3 className="mt-3 font-display text-lg font-semibold text-destructive">
          Error al cargar el capítulo
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {error || "No se pudo cargar el capítulo solicitado."}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Libro: {book.code}, Capítulo: {chapter}
          {verseStart ? `, Versículos: ${verseStart}` : ''}
          {verseEnd && verseEnd > verseStart ? `-${verseEnd}` : ''}
        </p>

        <Button
          onClick={() => loadChapter(true)}
          variant="outline"
          className="mt-4"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Si el problema persiste, prueba con un libro o capítulo diferente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {chapterData.reference}
        </h2>
        <p className="text-sm text-muted-foreground">{chapterData.translation_name}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {chapterData.verses.length} versículo{chapterData.verses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Verses */}
      <div className="space-y-4">
        {chapterData.verses.map((verse) => (
          <div key={verse.number} className="leading-relaxed">
            <span className="mr-2 align-super text-xs font-semibold text-primary">
              {verse.number}
            </span>
            <span className="text-foreground">{verse.text}</span>
          </div>
        ))}
      </div>

      {/* Range info */}
      {verseStart && verseEnd && verseEnd > verseStart && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Versículos {verseStart}–{verseEnd} de {chapterData.verses.length}
        </p>
      )}
      {verseStart && !verseEnd && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Versículo {verseStart} de {chapterData.verses.length}
        </p>
      )}
    </div>
  );
};

export default BibleReader;