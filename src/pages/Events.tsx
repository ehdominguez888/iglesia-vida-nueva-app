import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";

const Events = () => {
  usePageTitle("Próximos eventos");
  const events = CHURCH_CONFIG.connect.events;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="No te lo pierdas"
        title="Próximos eventos"
        description="Mantente al tanto de lo que viene en nuestra comunidad. Anímate a participar."
      />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <article
              key={`${event.date}-${event.title}`}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex min-h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                  <CalendarDays className="h-4 w-4" />
                                  <span className="mt-1 text-center font-display text-[13px] leading-tight">
                                    {event.date}
                                  </span>
                                </div>
                
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-display text-lg font-semibold text-foreground">
                                    {event.title}
                                  </h3>
                  <div className="mt-1.5 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {event.time ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" />
                        {event.time}
                      </span>
                    ) : null}
                    {event.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.location}
                      </span>
                    ) : null}
                  </div>
                  {event.description ? (
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>
                  ) : null}
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Registrarme
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-primary/40 bg-secondary/40 px-6 py-12 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            Aún no hay eventos planeados. ¡Vuelve pronto!
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;