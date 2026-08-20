import { useEffect } from "react";
import CHURCH_CONFIG from "@/data/church-config";

/** Establece el título del navegador para cada página. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · ${CHURCH_CONFIG.name}`;
  }, [title]);
}
