import { Check, Quote } from "lucide-react";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/layout/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";

const Pastor = () => {
  usePageTitle("Nuestro pastor");
  const { pastor } = CHURCH_CONFIG;

  return (
    <div>
      <PageHeader
        eyebrow="Nuestro pastor"
        title={pastor.name}
        description={pastor.role}
      />

      {/* Tarjeta del pastor */}
      <section className="animate-rise overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-secondary font-display text-2xl font-semibold text-primary">
            {pastor.initials}
          </span>
          <div>
            <p className="text-lg font-semibold text-foreground">{pastor.name}</p>
            <p className="text-sm text-muted-foreground">{pastor.role}</p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">{pastor.bio}</p>
      </section>

      {/* Filosofía de ministerio */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Un mensaje de fe"
          title={pastor.philosophyTitle}
        />
        <div className="relative rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
          <Quote className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 rotate-180 text-primary-foreground/10" />
          <ul className="relative space-y-4">
            {pastor.philosophy.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Check className="h-4 w-4" />
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Pastor;