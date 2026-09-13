import { useState, useEffect } from "react";
import { RefreshCw, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";
import { es } from "date-fns/locale";

const CALENDAR_ID = "4b2018e6833d4b5f48ae76f9d9ee25a5a93683edfee99137257620f2772a2398@group.calendar.google.com";

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  description?: string;
}

interface EventCardProps {
  event: CalendarEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const startDate = event.start.dateTime 
    ? parseISO(event.start.dateTime)
    : parseISO(event.start.date!);
  
  const endDate = event.end.dateTime 
    ? parseISO(event.end.dateTime)
    : parseISO(event.end.date!);
  
  const isAllDay = !event.start.dateTime;
  
  const formatDateRange = () => {
    if (isAllDay) {
      return format(startDate, "EEE, MMM d", { locale: es });
    }
    
    const startFormatted = format(startDate, "h:mm a", { locale: es });
    const endFormatted = format(endDate, "h:mm a", { locale: es });
    
    return `${format(startDate, "EEE", { locale: es })} ${startFormatted} - ${endFormatted}`;
  };
  
  const getDateBadge = () => {
    if (isToday(startDate)) return "HOY";
    if (isTomorrow(startDate)) return "MAÑANA";
    if (isThisWeek(startDate)) return format(startDate, "EEE", { locale: es }).toUpperCase();
    return format(startDate, "MMM d", { locale: es }).toUpperCase();
  };

  return (
    <article className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start gap-4">
        {/* Date Badge */}
        <div className="flex min-h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Calendar className="h-4 w-4 mb-1" />
          <span className="text-center font-display text-[13px] font-semibold leading-tight">
            {getDateBadge()}
          </span>
        </div>
        
        {/* Event Details */}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {event.summary}
          </h3>
          
          {/* Time */}
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {formatDateRange()}
          </div>
          
          {/* Location */}
          {event.location && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {event.location}
            </div>
          )}
          
          {/* Description */}
          {event.description && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm font-medium text-primary hover:underline"
              >
                {expanded ? "Ver menos" : "Ver más"}
              </button>
              {expanded && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const EventSkeleton = () => (
  <div className="rounded-3xl border border-border bg-card p-5">
    <div className="flex items-start gap-4">
      <Skeleton className="h-16 w-16 rounded-2xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      console.log("Fetching events via server API");
      
      const response = await fetch(`/api/calendar-events?calendarId=${encodeURIComponent(CALENDAR_ID)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server API Error:", response.status, errorData);
        throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Events data:", data);
      
      setEvents(data.events || []);
      setDebugInfo(data.debug);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err instanceof Error ? err.message : "Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-6 text-center">
        <p className="text-sm font-medium text-destructive mb-3">
          Error al cargar eventos: {error}
        </p>
        <Button onClick={fetchEvents} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Próximos eventos ({events.length})
        </h3>
        <Button
          onClick={fetchEvents}
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>
      
      {events.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-primary/40 bg-secondary/40 px-6 py-12 text-center">
          <Calendar className="mx-auto h-10 w-10 text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            No hay eventos programados en este momento. ¡Vuelve pronto!
          </p>
          {debugInfo && (
            <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
              <p>Debug: {debugInfo.itemsCount} eventos encontrados</p>
              <p>Calendario: {debugInfo.summary}</p>
              <p>Zona horaria: {debugInfo.timeZone}</p>
            </div>
          )}
          <Button onClick={fetchEvents} variant="outline" size="sm" className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
};

export default UpcomingEvents;