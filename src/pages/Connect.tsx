import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, HandHeart, Heart, UsersRound, UserRound } from "lucide-react";
import CHURCH_CONFIG, { ConnectKind } from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";

const KIND_ICONS: Record<ConnectKind, typeof Heart> = {
  visitor: UserRound,
  prayer: Heart,
  events: CalendarDays,
  volunteer: UsersRound,
};

const Connect = () => {
  usePageTitle("Conectar");

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Conéctate con nosotros"
        title="Conectar"
        description="Queremos acompañar tu paso por nuestra comunidad. Elige cómo quieres comenzar."
      />

      <section>
        <div className="grid grid-cols-1 gap-3">
          {CHURCH_CONFIG.connect.entries.map((entry) => {
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

      <section className="rounded-3xl border border-border bg-card/60 p-6 sm:p-7 mt-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HandHeart className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
          Estamos aquí para ti
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {CHURCH_CONFIG.connect.entries.length > 0
            ? "Elige la opción que mejor se adapte a lo que necesitas. Nuestro equipo te responderá lo antes posible."
            : "Pronto encontrarás aquí todas las formas de conectarte con nosotros."}
        </p>
      </section>
    </div>
  );
};

export default Connect;