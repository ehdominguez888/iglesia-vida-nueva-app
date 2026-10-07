import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Church,
  Facebook,
  Globe,
  Heart,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Plus,
  UserRound,
  Youtube,
  NotebookPen,
  Calendar,
  Clock
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
              <Mail className="h-4 w-4 text-primary" />
              {CHURCH_CONFIG.contact.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {CHURCH_CONFIG.contact.phone}
            </span>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="animate-rise" style={{ animationDelay: "110ms" }}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/notas"
            className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <Plus className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Nueva nota</span>
          </Link>
          <Link
            to="/conectar/eventos"
            className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Eventos</span>
          </Link>
          <a
            href={CHURCH_CONFIG.offering.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <HeartHandshake className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Ofrenda</span>
          </a>
        </div>
      </section>

      {/* Transmisión en vivo */}
      <section className="animate-rise" style={{ animationDelay: "140ms" }}>
        <div className="rounded-3xl bg-secondary/70 p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Vive el servicio en línea
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sigue nuestras transmisiones en vivo desde donde estés.
          </p>
          <div className="mt-5 flex items-center justify-center gap-4">
            <a
              href={CHURCH_CONFIG.liveStreams.youtube}
              onClick={(e) => {
                e.preventDefault();
                window.open(CHURCH_CONFIG.liveStreams.youtube, "_blank", "noopener,noreferrer");
              }}
              aria-label="YouTube"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform active:scale-95 cursor-pointer shadow-sm"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={CHURCH_CONFIG.liveStreams.facebook}
              onClick={(e) => {
                e.preventDefault();
                window.open(CHURCH_CONFIG.liveStreams.facebook, "_blank", "noopener,nereferrer");
              }}
              aria-label="Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#04608e] text-white transition-transform active:scale-95 cursor-pointer shadow-sm"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={CHURCH_CONFIG.liveStreams.instagram}
              onClick={(e) => {
                e.preventDefault();
                window.open(CHURCH_CONFIG.liveStreams.instagram, "_blank", "noopener,noreferrer");
              }}
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-transform active:scale-95 cursor-pointer shadow-sm"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Enlaces rápidos */}
      <section className="animate-rise" style={{ animationDelay: "200ms" }}>
        <SectionHeading eyebrow="Conócenos" title="Más sobre nosotros" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/acerca-de"
            className="group flex items-center gap-3 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <BookOpenText className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">Acerca de nosotros</span>
              <span className="block text-sm text-muted-foreground">Nuestra misión y visión</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
          <Link
            to="/pastor"
            className="group flex items-center gap-3 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <UserRound className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">Nuestro pastor</span>
              <span className="block text-sm text-muted-foreground">Conoce a nuestro equipo</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        </div>
      </section>

      {/* Welcome Section for New Visitors */}
      <section className="animate-rise" style={{ animationDelay: "260ms" }}>
        <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/30 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
              <Heart className="h-8 w-8" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                ¡Nos alegra que estés aquí!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Si es tu primera vez, queremos conocerte mejor
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Nos emociona que hayas decidido visitarnos. Ya sea que estés buscando una comunidad 
              espiritual, respuestas a tus preguntas, o simplemente quieras conocer más sobre 
              nuestra fe, estamos aquí para acompañarte en tu camino.
            </p>
            
            <Link
              to="/conectar/visita"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
            >
              <UserRound className="h-5 w-5" />
              Soy nuevo visitante
            </Link>
            
            <div className="rounded-2xl bg-background/50 p-4">
              <p className="text-xs text-muted-foreground">
                Al completar nuestro formulario de nuevo visitante, podremos darte una 
                bienvenida más personalizada y mantenerte informado sobre nuestras actividades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;