import { CalendarDays } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import { usePageTitle } from "@/hooks/use-page-title";

const Events = () => {
  usePageTitle("Próximos eventos");

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="No te lo pierdas"
        title="Próximos eventos"
        description="Mantente al tanto de lo que viene en nuestra comunidad. Anímate a participar."
      />

      <UpcomingEvents />
    </div>
  );
};

export default Events;