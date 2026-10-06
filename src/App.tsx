import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Index from "./pages/Index";
import About from "./pages/About";
import Pastor from "./pages/Pastor";
import Notes from "./pages/Notes";
import Offering from "./pages/Offering";
import Connect from "./pages/Connect";
import VisitorForm from "./pages/VisitorForm";
import Prayer from "./pages/Prayer";
import Events from "./pages/Events";
import ServeForm from "./pages/ServeForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Index />} />
            <Route path="/acerca-de" element={<About />} />
            <Route path="/pastor" element={<Pastor />} />
            <Route path="/notas" element={<Notes />} />
            <Route path="/ofrenda" element={<Offering />} />
            <Route path="/conectar" element={<Connect />} />
            <Route path="/conectar/visita" element={<VisitorForm />} />
            <Route path="/conectar/oracion" element={<Prayer />} />
            <Route path="/conectar/eventos" element={<Events />} />
            <Route path="/conectar/servir" element={<ServeForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;