import { useState, useEffect } from "react";
import { RefreshCw, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";
import { es } from "date-fns/locale";

const ICAL_URL = "https://calendar.google.com/calendar/ical/4b2018e6833d4b5f48ae76f9d9ee25a5a93683edfee99137257620f2772a2398%40group.calendar.google.com/public/basic.ics";

interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  isAllDay: boolean;
}

interface EventCardProps {
  event: CalendarEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const startDate = parseISO(event.start);
  const endDate = parseISO(event.end);
  
  const formatDateRange = () => {
    if (event.isAllDay) {
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

// Simple iCal parser for basic events
const parseICalEvents = (icalData: string): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const lines = icalData.split('\n');
  
  let currentEvent: Partial<CalendarEvent> = {};
  let inEvent = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = {};
      continue;
    }
    
    if (line === 'END:VEVENT') {
      if (inEvent && currentEvent.summary && currentEvent.start && currentEvent.end) {
        events.push({
          id: currentEvent.id || Math.random().toString(),
          summary: currentEvent.summary,
          start: currentEvent.start,
          end: currentEvent.end,
          location: currentEvent.location,
          description: currentEvent.description,
          isAllDay: currentEvent.isAllDay || false
        });
      }
      inEvent = false;
      continue;
    }
    
    if (inEvent) {
      if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8).trim();
      } else if (line.startsWith('DTSTART;VALUE=DATE:')) {
        const dateStr = line.substring(19).trim();
        currentEvent.start = `${dateStr}T00:00:00`;
        currentEvent.isAllDay = true;
      } else if (line.startsWith('DTSTART:')) {
        const dateStr = line.substring(8).trim();
        currentEvent.start = dateStr.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
      } else if (line.startsWith('DTEND;VALUE=DATE:')) {
        const dateStr = line.substring(17).trim();
        currentEvent.end = `${dateStr}T00:00:00`;
      } else if (line.startsWith('DTEND:')) {
        const dateStr = line.substring(6).trim();
        currentEvent.end = dateStr.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
      } else if (line.startsWith('LOCATION:')) {
        currentEvent.location = line.substring(9).trim();
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12).trim();
      } else if (line.startsWith('UID:')) {
        currentEvent.id = line.substring(4).trim();
      }
    }
  }
  
  return events.filter(event => {
    const eventDate = parseISO(event.start);
    return eventDate >= new Date();
  }).sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching iCal data from:", ICAL_URL);
      
      const response = await fetch(ICAL_URL);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const icalData = await response.text();
      console.log("iCal data received");
      
      const parsedEvents = parseICalEvents(icalData);
      console.log("Parsed events:", parsedEvents);
      
      setEvents(parsedEvents);
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

  if (events.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-primary/40 bg-secondary/40 px-6 py-12 text-center">
        <Calendar className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-3 text-sm text-muted-foreground">
          No hay eventos programados en este momento. ¡Vuelve pronto!
        </p>
        <Button onClick={fetchEvents} variant="outline" size="sm" className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
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
      
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEvents;