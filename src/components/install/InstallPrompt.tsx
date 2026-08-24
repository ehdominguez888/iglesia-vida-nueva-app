import { useEffect, useState } from "react";
import { Apple, Smartphone, Monitor, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CHURCH_CONFIG, { CHURCH_LOGO_URL } from "@/data/church-config";
import { cn } from "@/lib/utils";

type Platform = "ios" | "android" | "desktop";

const IGNORE_KEY = "pidn-install-prompt-dismissed";

const detectPlatform = (): Platform => {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
};

const isStandalone = (): boolean => {
  try {
    return window.matchMedia("(display-mode: standalone)").matches;
  } catch {
    return false;
  }
};

type Flow = {
  icon: typeof Download;
  label: string;
  step1: string;
  step2: string;
};

const FLOWS: Record<Platform, Flow> = {
  ios: {
    icon: Apple,
    label: "Abrir como app",
    step1: "En Safari, toca el botón Compartir (un cuadrado con una flecha hacia arriba).",
    step2: "Desplázate y elige «Añadir a pantalla de inicio».",
  },
  android: {
    icon: Smartphone,
    label: "Instalar como app",
    step1: "Abre el menú «⋮» en tu navegador (Chrome o Edge).",
    step2: "Elige «Agregar a pantalla de inicio» o «Instalar app».",
  },
  desktop: {
    icon: Monitor,
    label: "Agregar acceso directo",
    step1: "Abre el menú «⋮» o el ícono de instalar en tu navegador.",
    step2: "Elige «Agregar a pantalla de inicio» o «Crear acceso directo».",
  },
};

const InstallPrompt = () => {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    if (isStandalone()) return;
    try {
      if (window.localStorage.getItem(IGNORE_KEY)) return;
    } catch {
      /* sin almacenamiento: igual se muestra una sola vez en la sesión */
    }

    const timer = setTimeout(() => {
      setPlatform(detectPlatform());
      setOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(IGNORE_KEY, "1");
    } catch {
      /* ignorar */
    }
    setOpen(false);
  };

  /**
   * Escritorio: se puede iniciar la descarga de un acceso directo (.url).
   * En móvil (iOS/Android) el sistema operativo no permite que una web lo haga
   * automáticamente, por eso ahí guiamos con los pasos del navegador.
   */
  const downloadShortcut = () => {
    const url = window.location.origin + window.location.pathname;
    const content = ["[InternetShortcut]", `URL=${url}`, "IconFile=/logo.png", ""].join(
      "\r\n",
    );
    const blob = new Blob([content], { type: "text/uri-list" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${CHURCH_CONFIG.name}.url`;
    anchor.click();
    URL.revokeObjectURL(href);
    dismiss();
  };

  if (!open) return null;

  const flow = FLOWS[platform];
    const isDesktop = platform === "desktop";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Agrega la app a tu pantalla"
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-md sm:items-center"
    >
      <div className="relative w-full max-w-md rounded-t-3xl bg-background p-6 pt-8 shadow-2xl sm:rounded-3xl sm:p-7">
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className={cn(
            "absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted",
          )}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/10">
          <img
            src={CHURCH_LOGO_URL}
            alt={CHURCH_CONFIG.name}
            className="h-12 w-12 rounded-xl object-cover"
          />
        </div>

        <h2 className="text-2xl font-display font-semibold tracking-tight text-foreground">
          {CHURCH_CONFIG.name} en tu pantalla
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {isDesktop
            ? "Guarda la app en tu computadora para abrirla como si fuera una app completa."
            : "Añade la app a tu pantalla de inicio y ábrela como una app completa, sin el navegador."}
        </p>

        <div className="mt-5 space-y-3 rounded-2xl border border-border/60 bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              1
            </span>
            <p className="flex-1 text-sm text-foreground">{flow.step1}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              2
            </span>
            <p className="flex-1 text-sm text-foreground">{flow.step2}</p>
          </div>
        </div>

        {isDesktop && (
          <Button onClick={downloadShortcut} className="mt-6 h-11 w-full rounded-2xl">
            <Download className="h-4 w-4" />
            Descargar acceso directo
          </Button>
        )}

        {!isDesktop && (
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Por seguridad, Apple y Google no permiten que una web se instale sola: basta con
            seguir los dos pasos de arriba una sola vez para que aparezca en tu pantalla de
            inicio con el ícono de {CHURCH_CONFIG.name}.
          </p>
        )}

        <Button
          onClick={dismiss}
          variant="ghost"
          className="mt-3 h-11 w-full rounded-2xl text-muted-foreground"
        >
          {isDesktop ? "Ahora no, gracias" : "Entendido"}
        </Button>
      </div>
    </div>
  );
};

export default InstallPrompt;