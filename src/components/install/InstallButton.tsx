import { useState } from "react";
import { Download, X, Smartphone, Apple, Monitor } from "lucide-react";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { toast } from "sonner";
import CHURCH_CONFIG, { CHURCH_LOGO_URL } from "@/data/church-config";

const InstallButton = () => {
  const { canPrompt, isInstalled, platform, promptInstall } = useInstallPrompt();
  const [showInstructions, setShowInstructions] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-green-500/20 bg-green-500/5 text-base font-semibold text-green-700">
        <Download className="h-5 w-5" />
        App ya instalada ✓
      </div>
    );
  }

  const handleClick = async () => {
    if (canPrompt) {
      const accepted = await promptInstall();
      if (accepted) {
        toast.success("¡App instalada correctamente!");
      }
    } else {
      setShowInstructions(true);
    }
  };

  const getInstructions = () => {
    if (platform === "ios") {
      const isChrome = /CriOS/i.test(navigator.userAgent);
      const isFirefox = /FxiOS/i.test(navigator.userAgent);
      const isEdge = /EdgiOS/i.test(navigator.userAgent);

      if (isChrome) {
        return {
          icon: Apple,
          title: "Instalar en iPhone (Chrome)",
          steps: [
            "Toca el ícono de compartir (⋯) en la esquina superior derecha.",
            "Desplázate y elige «Abrir en Safari».",
            "En Safari, toca el botón Compartir (□↑) en la barra inferior.",
            "Elige «Añadir a pantalla de inicio».",
            "Toca «Añadir» para confirmar.",
          ],
        };
      }
      if (isFirefox) {
        return {
          icon: Apple,
          title: "Instalar en iPhone (Firefox)",
          steps: [
            "Toca el menú (☰) en la esquina inferior derecha.",
            "Elige «Compartir» y luego «Abrir en Safari».",
            "En Safari, toca el botón Compartir (□↑) en la barra inferior.",
            "Elige «Añadir a pantalla de inicio».",
            "Toca «Añadir» para confirmar.",
          ],
        };
      }
      if (isEdge) {
        return {
          icon: Apple,
          title: "Instalar en iPhone (Edge)",
          steps: [
            "Toca el menú (⋯) en la barra inferior.",
            "Elige «Compartir» y luego «Abrir en Safari».",
            "En Safari, toca el botón Compartir (□↑) en la barra inferior.",
            "Elige «Añadir a pantalla de inicio».",
            "Toca «Añadir» para confirmar.",
          ],
        };
      }

      // Default: Safari
      return {
        icon: Apple,
        title: "Instalar en iPhone",
        steps: [
          "Toca el botón Compartir (□↑) en la barra inferior de Safari.",
          "Desplázate hacia abajo en el menú.",
          "Elige «Añadir a pantalla de inicio».",
          "Toca «Añadir» para confirmar.",
        ],
      };
    }

    if (platform === "android") {
      const isSamsung = /SamsungBrowser/i.test(navigator.userAgent);
      const isFirefox = /Firefox/i.test(navigator.userAgent) && !/Seamonkey/i.test(navigator.userAgent);
      const isOpera = /OPR|Opera/i.test(navigator.userAgent);

      if (isSamsung) {
        return {
          icon: Smartphone,
          title: "Instalar en Android (Samsung Internet)",
          steps: [
            "Toca el menú (☰) en la barra inferior.",
            "Elige «Añadir página a» → «Pantalla de inicio».",
            "Toca «Añadir» para confirmar.",
          ],
        };
      }
      if (isFirefox) {
        return {
          icon: Smartphone,
          title: "Instalar en Android (Firefox)",
          steps: [
            "Toca el menú (⋮) en la esquina superior derecha.",
            "Elige «Instalar» o «Añadir a pantalla de inicio».",
            "Toca «Añadir» para confirmar.",
          ],
        };
      }
      if (isOpera) {
        return {
          icon: Smartphone,
          title: "Instalar en Android (Opera)",
          steps: [
            "Toca el menú (⋮) en la esquina inferior derecha.",
            "Elige «Pantalla de inicio» o «Añadir a…».",
            "Toca «Añadir» para confirmar.",
          ],
        };
      }

      // Default: Chrome
      return {
        icon: Smartphone,
        title: "Instalar en Android",
        steps: [
          "Toca el menú (⋮) en la esquina superior derecha de Chrome.",
          "Elige «Agregar a pantalla de inicio» o «Instalar app».",
          "Toca «Instalar» o «Añadir» para confirmar.",
        ],
      };
    }

    // Desktop
    return {
      icon: Monitor,
      title: "Instalar como app",
      steps: [
        "Busca el ícono de instalar (⊕) en la barra de direcciones de tu navegador.",
        "O abre el menú (⋮) y elige «Instalar app» o «Crear acceso directo».",
        "Confirma la instalación.",
      ],
    };
  };

  const instructions = getInstructions();
  const InstructionIcon = instructions.icon;

  return (
    <>
      <button
        onClick={handleClick}
        className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-primary/20 bg-background text-base font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <Download className="h-5 w-5" />
        Agregar a pantalla de inicio
      </button>

      {/* Instructions Modal */}
      {showInstructions && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="relative w-full max-w-md rounded-t-3xl bg-background p-6 pt-8 shadow-2xl sm:rounded-3xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInstructions(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            {/* App icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/10">
              <img
                src={CHURCH_LOGO_URL}
                alt={CHURCH_CONFIG.name}
                className="h-12 w-12 rounded-xl object-cover"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <InstructionIcon className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                {instructions.title}
              </h2>
            </div>

            <p className="mb-4 text-center text-sm text-muted-foreground">
              Sigue estos pasos para agregar {CHURCH_CONFIG.name} a tu pantalla de inicio:
            </p>

            <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/50 p-4">
              {instructions.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="flex-1 text-sm text-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            {platform === "ios" && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-center">
                Apple requiere usar Safari para añadir apps a la pantalla de inicio. 
                Si estás en otro navegador, primero abre esta página en Safari.
              </p>
            )}

            <button
              onClick={() => setShowInstructions(false)}
              className="mt-5 flex h-11 w-full items-center justify-center rounded-2xl bg-primary font-medium text-primary-foreground active:scale-[0.98]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;