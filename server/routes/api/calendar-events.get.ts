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
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&maxResults=10`;
    
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
    return {
      events: data.items || [],
      success: true
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