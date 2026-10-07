import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// Request persistent storage to protect user notes
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist();
}

createRoot(document.getElementById("root")!).render(<App />);