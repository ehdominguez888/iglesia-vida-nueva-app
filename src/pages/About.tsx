import { Compass, Heart, Lightbulb, Mail, Phone, HandHeart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/layout/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import HistoryContent from "@/components/about/HistoryContent";
import MissionContent from "@/components/about/MissionContent";

const VALUES = [
  {
    label: "Jesús primero",
    description: "Todo lo que hacemos nace de nuestra relación con Jesús.",
  },
  {
    label: "Amistad",
    description: "Creemos que las personas necesitan relaciones auténticas para caminar en la fe.",
  },
  {
    label: "Comunidad",
    description: "Nadie debería caminar solo; SOMOS UNA FAMILIA.",
  },
];

const About = () => {
  usePageTitle("Acerca de nosotros");

  return (
    <div>
      <PageHeader
        eyebrow="Acerca de"
        title="Quiénes somos"
        description="Somos una familia que sigue a Cristo, buscando llevar esperanza y un nuevo comienzo a cada persona."
      />

      <div className="space-y-5">
        {/* Nuestra misión — with rich formatting */}
        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Compass className="h-5 w-5" />
            </span>
            <h2 className="font-display text-xl font-semibold text-foreground">Nuestra misión</h2>
          </div>
          <MissionContent />
        </section>

        {/* Nuestra visión */}
        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lightbulb className="h-5 w-5" />
            </span>
            <h2 className="font-display text-xl font-semibold text-foreground">Nuestra visión</h2>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            {CHURCH_CONFIG.about.vision}
          </p>
        </section>

        {/* Nuestra historia — with rich formatting */}
        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="h-5 w-5" />
            </span>
            <h2 className="font-display text-xl font-semibold text-foreground">Nuestra historia</h2>
          </div>
          <HistoryContent />
        </section>
      </div>

      {/* Nuestros valores */}
      <section className="mt-10">
        <SectionHeading title="Nuestros valores" />
        <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/30 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
              <Sparkles className="h-8 w-8" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Lo que nos define
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Los principios que guían todo lo que hacemos como iglesia
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-4">
            {VALUES.map((value) => (
              <li key={value.label} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{value.label}</strong>
                  {" — "}
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contáctanos */}
      <section className="mt-10">
        <SectionHeading title="Contáctanos" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href={`mailto:${CHURCH_CONFIG.contact.email}`}
            className="flex items-center gap-3 rounded-3xl bg-secondary/70 p-5 transition-colors hover:bg-secondary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-foreground">Correo</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{CHURCH_CONFIG.contact.email}</p>
            </div>
          </a>

          <a
            href={`tel:${CHURCH_CONFIG.contact.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-3 rounded-3xl bg-secondary/70 p-5 transition-colors hover:bg-secondary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-foreground">Teléfono</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{CHURCH_CONFIG.contact.phone}</p>
            </div>
          </a>

          <Link
            to="/conectar"
            className="flex items-center gap-3 rounded-3xl bg-secondary/70 p-5 transition-colors hover:bg-secondary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HandHeart className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-foreground">Conectar</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">Ponte en contacto</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;