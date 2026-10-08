import { Compass, Heart, Lightbulb, Mail, Phone, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/layout/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import HistoryContent from "@/components/about/HistoryContent";

const About = () => {
  usePageTitle("Acerca de nosotros");

  const textSnippets = [
    { icon: Compass, title: "Nuestra misión", text: CHURCH_CONFIG.about.mission },
    { icon: Lightbulb, title: "Nuestra visión", text: CHURCH_CONFIG.about.vision },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Acerca de"
        title="Quiénes somos"
        description="Somos una familia que sigue a Cristo, buscando llevar esperanza y un nuevo comienzo a cada persona."
      />

      <div className="space-y-5">
        {textSnippets.map(({ icon: Icon, title, text }) => (
          <section
            key={title}
            className="rounded-3xl border border-border bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
            </div>
            <div className="space-y-3">
              {text.split("\n\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

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