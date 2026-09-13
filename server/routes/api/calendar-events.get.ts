import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

export default defineHandler(async (event) => {
  try {
    const { calendarId } = getQuery(event);
    
    if (!calendarId) {
      return {
        error: "Calendar ID is required",
        status: 400
      };
    }

    const API_KEY = "AIzaSyDeiji5_OBa_J2xzAfZhXyulI94U-y73KI";
    const timeMin = new Date().toISOString();
    
    // Extract the actual calendar ID from the iCal URL
    const decodedCalendarId = decodeURIComponent(calendarId);
    let apiCalendarId = decodedCalendarId;
    if (decodedCalendarId.includes('/ical/')) {
      apiCalendarId = decodedCalendarId.split('/ical/')[1].split('/')[0];
    }
    apiCalendarId = apiCalendarId.replace('%40', '@');
    
    console.log("Original calendar ID:", calendarId);
    console.log("Decoded calendar ID:", decodedCalendarId);
    console.log("API calendar ID:", apiCalendarId);
    
    // For recurring events, we need to expand them
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(apiCalendarId)}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&maxResults=50`;
    
    console.log("Fetching from Google Calendar API:", url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Calendar API error:", response.status, response.statusText, errorText);
      
      return {
        error: `Google Calendar API error: ${response.status} ${response.statusText}`,
        status: response.status,
        details: errorText
      };
    }
    
    const data = await response.json();
    
    // Process events to handle recurring events
    const processedEvents = processRecurringEvents(data.items || []);
    
    // Debug logging
    console.log("API Response:", {
      originalItemsCount: data.items?.length || 0,
      processedItemsCount: processedEvents.length,
      items: processedEvents.map((item: any) => ({
        summary: item.summary,
        start: item.start,
        end: item.end,
        status: item.status
      })),
      timeZone: data.timeZone,
      summary: data.summary
    });
    
    return {
      events: processedEvents,
      success: true,
      debug: {
        originalItemsCount: data.items?.length || 0,
        processedItemsCount: processedEvents.length,
        timeZone: data.timeZone,
        summary: data.summary,
        apiCalendarId: apiCalendarId
      }
    };
    
  } catch (error) {
    console.error("Server error fetching calendar events:", error);
    return {
      error: "Internal server error",
      status: 500,
      details: error instanceof Error ? error.message : "Unknown error"
    };
  }
});

// Helper function to process recurring events
function processRecurringEvents(events: any[]): any[] {
  if (!events || events.length === 0) return [];
  
  // Group events by their original recurring event ID
  const recurringEventsMap = new Map();
  const nonRecurringEvents = [];
  
  for (const event of events) {
    // Check if this is an instance of a recurring event
    if (event.recurringEventId) {
      // Group by the original recurring event ID
      if (!recurringEventsMap.has(event.recurringEventId)) {
        recurringEventsMap.set(event.recurringEventId, []);
      }
      recurringEventsMap.get(event.recurringEventId).push(event);
    } else {
      // Non-recurring event
      nonRecurringEvents.push(event);
    }
  }
  
  // For each recurring event group, take only the next upcoming instance
  const recurringEvents = [];
  for (const [recurringEventId, instances] of recurringEventsMap.entries()) {
    if (instances.length > 0) {
      // Sort instances by start time (ascending)
      instances.sort((a: any, b: any) => {
        const aTime = a.start.dateTime || a.start.date;
        const bTime = b.start.dateTime || b.start.date;
        return new Date(aTime).getTime() - new Date(bTime).getTime();
      });
      
      // Take only the first (next upcoming) instance
      const nextInstance = instances[0];
      
      // Add a note that this is a recurring event
      const processedEvent = {
        ...nextInstance,
        summary: `${nextInstance.summary} (Próxima)`,
        isRecurring: true,
        totalInstances: instances.length
      };
      
      recurringEvents.push(processedEvent);
    }
  }
  
  // Combine non-recurring and processed recurring events
  const allEvents = [...nonRecurringEvents, ...recurringEvents];
  
  // Sort all events by start time
  allEvents.sort((a: any, b: any) => {
    const aTime = a.start.dateTime || a.start.date;
    const bTime = b.start.dateTime || b.start.date;
    return new Date(aTime).getTime() - new Date(bTime).getTime();
  });
  
  return allEvents;
}