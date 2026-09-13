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
    // The iCal URL format: https://calendar.google.com/calendar/ical/4b2018e6833d4b5f48ae76f9d9ee25a5a93683edfee99137257620f2772a2398%40group.calendar.google.com/public/basic.ics
    // The Google Calendar API needs: 4b2018e6833d4b5f48ae76f9d9ee25a5a93683edfee99137257620f2772a2398@group.calendar.google.com
    
    // Decode the URL-encoded calendar ID
    const decodedCalendarId = decodeURIComponent(calendarId);
    
    // Extract just the calendar ID part (remove the iCal path)
    let apiCalendarId = decodedCalendarId;
    if (decodedCalendarId.includes('/ical/')) {
      apiCalendarId = decodedCalendarId.split('/ical/')[1].split('/')[0];
    }
    
    // Remove any URL encoding from the @ symbol
    apiCalendarId = apiCalendarId.replace('%40', '@');
    
    console.log("Original calendar ID:", calendarId);
    console.log("Decoded calendar ID:", decodedCalendarId);
    console.log("API calendar ID:", apiCalendarId);
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(apiCalendarId)}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&maxResults=20`;
    
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
    
    // Debug logging
    console.log("API Response:", {
      itemsCount: data.items?.length || 0,
      items: data.items?.map((item: any) => ({
        summary: item.summary,
        start: item.start,
        end: item.end,
        status: item.status
      })),
      timeZone: data.timeZone,
      summary: data.summary
    });
    
    return {
      events: data.items || [],
      success: true,
      debug: {
        itemsCount: data.items?.length || 0,
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