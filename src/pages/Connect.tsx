import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, HandHeart, Heart, UsersRound, UserRound, Share2, QrCode, Copy } from "lucide-react";
import CHURCH_CONFIG, { ConnectKind } from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { useState } from "react";
import { toast } from "sonner";

const KIND_ICONS: Record<ConnectKind, typeof Heart> = {
  visitor: UserRound,
  prayer: Heart,
  events: CalendarDays,
  volunteer: UsersRound,
};

const Connect = () => {
  usePageTitle("Conectar");
  const [showQRCode, setShowQRCode] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      toast.success("Enlace copiado al portapapeles");
    } catch (error) {
      toast.error("No se pudo copiar el enlace");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: CHURCH_CONFIG.name,
          text: '¡Descarga la app de nuestra iglesia!',
          url: window.location.origin,
        });
      } catch (error) {
        // User canceled the share
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Conéctate con nosotros"
        title="Conectar"
        description="Queremos acompañar tu paso por nuestra comunidad. Elige cómo quieres comenzar."
      />

      {/* Upcoming Events Section */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
          Calendario
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <Link
            to="/conectar/eventos"
            className="group flex items-center gap-3 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <CalendarDays className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1 font-semibold text-foreground">Próximos eventos</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="my-8">
        <div className="border-t border-border"></div>
      </div>

      {/* Contact Forms Section */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
          Ponte en contacto
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {CHURCH_CONFIG.connect.entries
            .filter(entry => entry.kind !== "events")
            .map((entry) => {
              const Icon = KIND_ICONS[entry.kind];
              return (
                <Link
                  key={entry.to}
                  to={entry.to}
                  className="group flex items-center gap-3 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-foreground">{entry.title}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              );
            })}
        </div>
      </section>

      {/* Share App Section */}
      <section className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-secondary/30 p-6 sm:p-8 mt-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
            <Share2 className="h-8 w-8" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Comparte nuestra app
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Invita a amigos y familiares a unirse a nuestra comunidad
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/* Share via Link */}
          <button
            onClick={handleShare}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <Share2 className="h-5 w-5" />
            Compartir enlace
          </button>

          {/* Show QR Code */}
          <button
            onClick={() => setShowQRCode(true)}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-primary/20 bg-background text-base font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <QrCode className="h-5 w-5" />
            Mostrar código QR
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-background/50 p-4">
          <p className="text-xs text-muted-foreground">
            Comparte el enlace de nuestra app para que otros puedan descargarla y mantenerse 
            conectados con nuestra comunidad desde cualquier lugar.
          </p>
        </div>
      </section>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-card p-6">
            <div className="text-center">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Escanea para descargar
              </h3>
              
              {/* QR Code Image */}
              <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-2xl bg-white p-4">
                <img 
                  src="/qr-code.png" 
                  alt="Código QR de la aplicación Iglesia Vida Nueva"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    // Fallback to show error message if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                    // Create fallback element
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'flex flex-col items-center justify-center h-full w-full text-muted-foreground';
                      fallback.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code mb-2">
                          <rect width="5" height="5" x="3" y="3" rx="1"/>
                          <rect width="5" height="5" x="16" y="3" rx="1"/>
                          <rect width="5" height="5" x="3" y="16" rx="1"/>
                          <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                          <path d="M21 21v.01"/>
                          <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                          <path d="M3 12h.01"/>
                          <path d="M12 3h.01"/>
                          <path d="M12 16v.01"/>
                          <path d="M16 12h1"/>
                          <path d="M21 12v.01"/>
                          <path d="M12 21v-1"/>
                        </svg>
                        <p className="text-sm">Imagen QR no disponible</p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Escanea este código con la cámara de tu teléfono para abrir nuestra app
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 rounded-2xl border border-border bg-muted py-3 font-medium text-foreground flex items-center justify-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar enlace
                </button>
                <button
                  onClick={() => setShowQRCode(false)}
                  className="flex-1 rounded-2xl bg-primary py-3 font-medium text-primary-foreground"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;