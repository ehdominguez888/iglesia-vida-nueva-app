import { useState, useEffect } from "react";
import { RefreshCw, MapPin, Calendar, Clock, Repeat, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";
import { es } from "date-fns/locale";

// Use the full iCal URL - the server will extract the correct calendar ID
const CALENDAR_ICAL_URL = "https://calendar.google.com/calendar/ical/4b2018e6833d4b5f48ae76f9d9ee25a5a93683edfee99137257620f2772a2398%40group.calendar.google.com/public/basic.ics";

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
}

interface EventCardProps {
  event: CalendarEvent;
}

// Function to parse HTML-like event description to extract links and plain text
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
        // Clean up HTML tags from plain text and filter out unwanted text
        const cleanText = plainText
          .replace(/<[^>]*>/g, '') // Remove all HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Filter out HTML tag fragments and other unwanted text
        const filteredText = cleanText
          .replace(/<\/?a\b[^>]*>/gi, '') // Remove <a> and </a> tags specifically
          .replace(/<\/?\w+\b[^>]*>/g, '') // Remove any remaining HTML tags
          .replace(/^[<>\/\\]+/, '') // Remove leading HTML punctuation
          .replace(/[<>\/\\]+$/, '') // Remove trailing HTML punctuation
          .replace(/[<>]/g, '') // Remove any remaining angle brackets
          .replace(/a\b/gi, '') // Remove any remaining 'a' characters that might be tag fragments
          .trim();
        
        // Only add if it's meaningful text (not just HTML structure)
        if (filteredText && 
            !filteredText.match(/^(div|span|p|br|style|script|meta|link|a)$/i) &&
            filteredText.length > 1 &&
            !filteredText.match(/^[<>\/\\]+$/) && // Not just HTML punctuation
            !filteredText.match(/^&[a-z]+;$/) // Not HTML entities
        ) {
          console.log("Adding text element:", filteredText); // Debug log
          elements.push({ type: 'text', content: filteredText });
        }
      }
    }
    
    // Extract display text which comes after the href and is between > and <
    const hrefEndIndex = linkStartIndex + match[0].length;
    const gtIndex = description.indexOf('>', hrefEndIndex);
    const ltIndex = description.indexOf('<', gtIndex + 1);
    
    if (gtIndex !== -1 && ltIndex !== -1) {
      const displayText = description.substring(gtIndex + 1, ltIndex).trim();
      // Filter out any HTML tags or unwanted text from display text
      const cleanDisplayText = displayText
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/<\/?a\b[^>]*>/gi, '') // Remove <a> and </a> tags
        .trim();
      
      if (cleanDisplayText && cleanDisplayText.length > 1) {
        console.log("Adding link element:", cleanDisplayText, url); // Debug log
        elements.push({ 
          type: 'link', 
          text: cleanDisplayText,
          url: url
        });
      } else {
        // Fallback if display text is empty or too short
        console.log("Adding fallback link element"); // Debug log
        elements.push({ 
          type: 'link', 
          text: "Registro del evento",
          url: url
        });
      }
    } else {
      // Fallback if we can't find proper display text
      console.log("Adding fallback link element (no proper display text)"); // Debug log
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
      // Clean up HTML tags from plain text and filter out unwanted text
      const cleanText = remainingText
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/<\/?a\b[^>]*>/gi, '') // Remove <a> and </a> tags
        .replace(/<\/?\w+\b[^>]*>/g, '') // Remove any remaining HTML tags
        .replace(/^[<>\/\\]+/, '') // Remove leading HTML punctuation
        .replace(/[<>\/\\]+$/, '') // Remove trailing HTML punctuation
        .replace(/[<>]/g, '') // Remove any remaining angle brackets
        .replace(/a\b/gi, '') // Remove any remaining 'a' characters that might be tag fragments
        .trim();
      
      // Only add if it's meaningful text
      if (cleanText && 
          !cleanText.match(/^(div|span|p|br|style|script|meta|link|a)$/i) &&
          cleanText.length > 1 &&
          !cleanText.match(/^[<>\/\\]+$/) && // Not just HTML punctuation
          !cleanText.match(/^&[a-z]+;$/) // Not HTML entities
      ) {
        console.log("Adding remaining text element:", cleanText); // Debug log
        elements.push({ type: 'text', content: cleanText });
      }
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
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {event.summary}
            </h3>
            {event.isRecurring && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                <Repeat className="h-3 w-3" />
                Recurrente
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
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
              <p>Debug: {debugInfo.originalItemsCount} eventos originales</p>
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