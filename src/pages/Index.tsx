import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Church,
  Facebook,
  MapPin,
  NotebookPen,
  Phone,
  UserRound,
  Youtube,
} from "lucide-react";
import CHURCH_CONFIG from "@/data/church-config";
import SectionHeading from "@/components/layout/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";

const Index = () => {
  usePageTitle("Inicio");

  return (
    <div className="space-y-10">
      {/* Portada */}
      <section className="animate-rise">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-9">
          <Church className="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 text-primary-foreground/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
            {CHURCH_CONFIG.welcomeEyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {CHURCH_CONFIG.welcomeTitle}
          </h1>
          <p className="mt-3 max-w-md leading-relaxed text-primary-foreground/90">
            {CHURCH_CONFIG.welcomeMessage}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              to="/notas"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition-transform active:scale-95"
            >
              <NotebookPen className="h-4 w-4" />
              Tomar notas
            </Link>
            <Link
              to="/ofrenda"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 active:scale-95"
            >
              Ofrenda
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="animate-rise" style={{ animationDelay: "80ms" }}>
        <SectionHeading eyebrow="Te esperamos" title="Nuestros servicios" />
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-5">
          <ul className="divide-y divide-border">
            {CHURCH_CONFIG.serviceTimes.map((service) => (
              <li
                key={service.day}
                className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{service.day}</p>
                    <p className="text-sm text-muted-foreground">{service.name}</p>
                  </div>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                  {service.time}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {CHURCH_CONFIG.contact.address}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {CHURCH_CONFIG.contact.phone}
            </span>
          </div>
        </div>
      </section>

      {/* Enlaces rápidos */}
      <section className="animate-rise" style={{ animationDelay: "140ms" }}>
        <SectionHeading eyebrow="Conócenos" title="Más sobre nosotros" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/acerca-de"
            className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <BookOpenText className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">Acerca de nosotros</span>
              <span className="block text-sm text-muted-foreground">Nuestra misión y visión</span>
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
          <Link
            to="/pastor"
            className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <UserRound className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">Nuestro pastor</span>
              <span className="block text-sm text-muted-foreground">Conoce a nuestro equipo</span>
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        </div>
      </section>

      {/* Transmisión en vivo */}
      <section className="animate-rise" style={{ animationDelay: "200ms" }}>
        <div className="rounded-3xl bg-secondary/70 p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Vive el servicio en línea
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sigue nuestras transmisiones en vivo desde donde estés.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={CHURCH_CONFIG.liveStreams.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#e5383b] px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-95"
            >
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
            <a
              href={CHURCH_CONFIG.liveStreams.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#1877f2] px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-95"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;