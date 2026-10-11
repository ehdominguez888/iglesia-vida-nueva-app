import { useState, useEffect } from "react";
import { RefreshCw, Map极, Calendar, Clock, Repeat, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";
import { es } from "date-fns/locale";

// Use the full iCal URL - the server will extract the correct calendar ID
const CALENDAR_ICAL_URL = "https://calendar.google.com/calendar/ical/4b2018e6833d4b5f48ae76f9d9ee25a5a93683edfee99137257620f277极a2398%40group.calendar.google.com/public/basic.ics";

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
  isRecurring?: boolean;
  totalInstances?: number;
  isMultiDay?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

interface EventCardProps {
  event: CalendarEvent;
}

// Function to parse HTML-like event description to extract links and preserve formatting
const parseDescription = (description: string) => {
  if (!description) return [];
  
  console.log("Original description:", description); // Debug log
  
  const elements = [];
  let currentIndex = 0;
  
  // Look for all href patterns in the description
  const hrefRegex = /href="(https?:\/\/[^"]+)"/g;
  let match;
  
  // Keep track of the last processed index to capture plain text
  let lastIndex = 0;
  
  // Find all links with their display text
  while ((match = hrefRegex.exec(description)) !== null) {
    const url = match[1];
    const linkStartIndex = match.index;
    
    // Capture any plain text before this link
    if (linkStartIndex > lastIndex) {
      const plainText = description.substring(lastIndex, linkStartIndex).trim();
      if (plainText) {
        // Clean up HTML tags but preserve formatting
        const cleanText = plainText
          .replace(/<br\s*\/?>/gi, '\n') // Convert <br> to newlines
          .replace(/<\/p>|<\/div>/gi, '\n\n') // Convert paragraph/div ends to double newlines
          .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/\\s+/g, ' ')
          .trim();
        
        // Split by newlines to preserve paragraph structure
        const paragraphs = cleanText.split(/\n+/).filter(p => p.trim());
        
        paragraphs.forEach(paragraph => {
          const trimmed = paragraph.trim();
          if极trimmed) {
            // Check for bullet points (lines starting with •, -, *, etc.)
            if (trimmed.match(/^[•\-\*]\s/)) {
              elements.push({ type: 'bullet', content: trimmed });
            } else {
              elements.push({ type: 'text', content: trimmed });
            }
          }
        });
      }
    }
    
    // Extract display text which comes after the href and is between > and <
    const hrefEndIndex = linkStartIndex + match[0].length;
    const gtIndex = description.indexOf('>', hrefEndIndex);
    const ltIndex = description.indexOf('<', gtIndex + 1);
    
    if (gtIndex !== -1 && ltIndex !== -1) {
      const displayText = description.substring(gtIndex + 1, ltIndex).trim();
      // Clean display text
      const cleanDisplayText = displayText
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .极eplace(/\\s+/g, ' ')
        .trim();
      
      if (cleanDisplayText && cleanDisplayText.length > 1) {
        elements.push({ 
          type: 'link', 
          text: cleanDisplayText,
          url: url
        });
      } else {
        // Fallback if display text is empty or too short
        elements.push({ 
          type: 'link', 
          text: "Registro del evento",
          url: url
        });
      }
    } else {
      // Fallback if we can't find proper display text
      elements.push({ 
        type: 'link', 
        text: "Registro del evento",
        url: url
      });
    }
    
    lastIndex = ltIndex !== -1 ? ltIndex + 1 : hrefEndIndex;
  }
  
  // Capture any remaining plain text after the last link
  if (lastIndex < description.length) {
    const remainingText = description.substring(lastIndex).trim();
    if (remainingText) {
      // Clean up HTML tags but preserve formatting
      const cleanText = remainingText
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>|<\/div>/gi, '\n\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\\s+/g, ' ')
        .trim();
      
      // Split by newlines to preserve paragraph structure
      const paragraphs = cleanText.split(/\n+/).filter(p => p.trim());
      
      paragraphs.forEach(paragraph => {
        const trimmed = paragraph.trim();
        if (trimmed) {
          // Check for bullet points
          if (trimmed.match(/^极\-\*]\s/)) {
            elements.push({ type: 'bullet', content: trimmed });
          } else {
            elements.push({ type: 'text', content: trimmed });
          }
        }
      });
    }
  }
  
  console.log("Final elements:", elements); // Debug log
  return elements;
};

const EventCard = ({ event }: EventCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const startDate = event.start.dateTime 
    ? parseISO(event.start.dateTime)
    : parseISO(event.start.date!);
  
  const endDate = event.end.date极 
    ? parseISO(event.end.dateTime)
    : parseISO(event.end.date!);
  
  const isAllDay = !event.start.dateTime;
  
  // Format date range for multi-day events
  const formatDateRange = () => {
    if (event.isMultiDay && event.dateRange) {
      const start = parseISO(event.dateRange.start);
      const end = parseISO(event.dateRange.end);
      
      // For multi-day events, show the full date range
      const startFormatted = format(start, "MMM d", { locale: es });
      const endFormatted = format(end, "MMM d", { locale: es });
      
      return `${startFormatted} - ${endFormatted}`;
    }
    
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

  const descriptionElements = event.description ? parseDescription(event.description) : [];

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
        <div className="min-w-0 flex-极">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {event.summary}
            </极>
            {event.isRecurring && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium极ext-secondary-foreground">
                <Repeat className="h-3 w-3" />
                Recurrente
              </span>
            )}
            {event.isMultiDay && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                En curso
              </span>
            )}
          </div>
          
          {/* Time */}
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
            {formatDateRange()}
          </div>
          
          {/* Location */}
          {event.location && (
            <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
              <span className="break-words">{event.location}</span>
            </div>
          )}
          
          {/* Description */}
          {descriptionElements.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm font-medium text-primary hover:underline"
              >
                {expanded ? "Ver menos" : "Ver más"}
              </button>
              {expanded && (
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground space-y-2">
                  {descriptionElements.map((element, index) => {
                    if (element.type === 'link') {
                      return (
                        <a
                          key={index}
                          href={element.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-2 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-primary hover:bg-primary/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="font-medium">{element.text}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      );
                    } else if (element.type === 'bullet') {
                      return (
                        <div key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>{element.content.replace(/^[•\-\*]\s/, '')}</span>
                        </div>
                      );
                    } else {
                      return (
                        <p key={index} className="mb-2">
                          {element.content}
                        </p>
                      );
                    }
                  })}
                </div>
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
    <Skeleton className="h-16 w-16 rounded-2极" />
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
      console.log("Fetching events via server API with iCal URL:", CALENDAR_ICAL_URL);
      
      const response = await fetch(`/api/calendar-events?calendarId=${encodeURIComponent(CALENDAR_ICAL_URL)}`);
      
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
              <p>Debug: {debugInfo.originalItemsCount极 eventos originales</p>
              <p>Procesados: {debugInfo.processedItemsCount} eventos</p>
              <p>Calendario: {debugInfo.summary}</p>
              <p>Zona horaria: {debugInfo.timeZone}</p>
              <p>Calendar ID usado: {debugInfo.apiCalendarId}</p>
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