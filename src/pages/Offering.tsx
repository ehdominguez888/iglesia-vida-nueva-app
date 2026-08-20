import { ExternalLink, HeartHandshake, QrCode } from "lucide-react";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";

const Offering = () => {
  usePageTitle("Ofrenda");
  const offeringUrl = CHURCH_CONFIG.offering.url;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Con generosidad"
        title="Ofrenda"
        description="Gracias por bendecir la obra de Dios con tu ofrenda. Cada aporte ayuda a nuestra comunidad a crecer."
      />

      <section className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="bg-primary/5 p-6 sm:p-8">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
            <HeartHandshake className="h-8 w-8" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
            Cómo dar tu ofrenda
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
            {CHURCH_CONFIG.offering.note}
          </p>
        </div>

        {/* Área del código QR en pantalla */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-secondary/40 px-6 py-8 text-center">
            <QrCode className="h-12 w-12 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Escanea el código QR que aparece en la pantalla durante el servicio para dar tu
              ofrenda.
            </p>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Dar en línea</p>
            {offeringUrl ? (
              <a
                href={offeringUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.99]"
              >
                <ExternalLink className="h-5 w-5" />
                Dar ahora
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex h-14 w-full cursor-not-allowed items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground"
              >
                Próximamente
              </button>
            )}
            {!offeringUrl ? (
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {CHURCH_CONFIG.offering.comingSoon}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offering;