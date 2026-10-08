import { ExternalLink, HeartHandshake, QrCode, Scan } from "lucide-react";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { useState } from "react";

const Offering = () => {
  usePageTitle("Ofrenda");
  const offeringUrl = CHURCH_CONFIG.offering.url;
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleDonateClick = () => {
    if (offeringUrl) {
      window.open(offeringUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleScanQRClick = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      setShowQRScanner(false);
      if (offeringUrl) {
        window.open(offeringUrl, "_blank", "noopener,noreferrer");
      }
    }, 2000);
  };

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Con generosidad"
        title="Ofrenda"
        description="«Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, porque Dios ama al que da con alegría. Y Dios puede hacer que toda gracia abunde para ustedes, de manera que siempre, en toda circunstancia, tengan todo lo necesario y toda buena obra abunde en ustedes.» — 2 Corintios 9:7-8 NVI"
      />

      {/* Primary Donation Card */}
      <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
              <HeartHandshake className="h-8 w-8" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Dar tu ofrenda
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Apoya nuestra misión con tu generosidad
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Primary Donation Button */}
            {offeringUrl ? (
              <button
                onClick={handleDonateClick}
                className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <ExternalLink className="h-6 w-6" />
                Dar ahora en línea
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="flex h-16 w-full cursor-not-allowed items-center justify-center rounded-2xl bg-muted text-lg font-semibold text-muted-foreground"
              >
                Próximamente
              </button>
            )}

            {/* QR Scan Alternative */}
            <button
              onClick={handleScanQRClick}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-primary/20 bg-background text-base font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <Scan className="h-5 w-5" />
              Escanear código QR
            </button>
          </div>

          {showQRScanner && (
            <div className="mt-4 rounded-2xl bg-primary/10 p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-primary"></div>
                <p className="text-sm text-primary">Activando cámara para escanear QR...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Instructions Section */}
      <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">
            Cómo dar tu ofrenda
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">En línea</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Haz clic en "Dar ahora en línea" para donar mediante nuestro sitio seguro.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Durante el servicio</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Escanea el código QR que aparece en pantalla durante el servicio usando el botón "Escanear código QR".
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Presencial</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  También puedes dar tu ofrenda en persona durante nuestros servicios.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              {CHURCH_CONFIG.offering.note}
            </p>
            {!offeringUrl && (
              <p className="mt-2 text-sm text-muted-foreground">
                {CHURCH_CONFIG.offering.comingSoon}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick Info Card */}
      <section className="mt-6 rounded-3xl border border-border bg-gradient-to-br from-secondary/20 to-secondary/40 p-6">
        <div className="flex items-center gap-3">
          <QrCode className="h-6 w-6 text-primary" />
          <h3 className="font-semibold text-foreground">¿Necesitas ayuda?</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Si tienes problemas para dar tu ofrenda en línea o escanear el código QR, 
          contáctanos después del servicio y te ayudaremos personalmente.
        </p>
      </section>
    </div>
  );
};

export default Offering;