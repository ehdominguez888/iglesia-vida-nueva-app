import { Compass, Heart, Lightbulb } from "lucide-react";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/layout/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";

const About = () => {
  usePageTitle("Acerca de nosotros");

  const snippets = [
    { icon: Compass, title: "Nuestra misión", text: CHURCH_CONFIG.about.mission },
    { icon: Lightbulb, title: "Nuestra visión", text: CHURCH_CONFIG.about.vision },
    { icon: Heart, title: "Nuestra historia", text: CHURCH_CONFIG.about.history },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Acerca de"
        title="Quiénes somos"
        description="Somos una familia que sigue a Cristo, buscando llevar esperanza y un nuevo comienzo a cada persona."
      />

      <div className="space-y-5">
        {snippets.map(({ icon: Icon, title, text }) => (
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
      </div>

      <section className="mt-10">
        <SectionHeading eyebrow="Lo que valoramos" title="Nuestros valores" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CHURCH_CONFIG.about.values.map((value) => (
            <div key={value.title} className="rounded-3xl bg-secondary/70 p-5">
              <h3 className="font-semibold text-foreground">{value.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;