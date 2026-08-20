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
import Bible from "./pages/Bible";
import Offering from "./pages/Offering";
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
            <Route path="/biblia" element={<Bible />} />
            <Route path="/ofrenda" element={<Offering />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;