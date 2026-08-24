import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import FormEmbedCard from "@/components/connect/FormEmbedCard";
import { usePageTitle } from "@/hooks/use-page-title";

const ServeForm = () => {
  usePageTitle("Sírvete");
  const src = CHURCH_CONFIG.connect.volunteerFormEmbed;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Pon tus dones al servicio"
        title="Sírvete"
        description="Queremos ayudarte a encontrar el ministerio donde mejor puedes servir. Cuéntanos cómo te gustaría participar."
      />
      <FormEmbedCard
        src={src}
        title="Formulario de voluntarios"
        placeholder="Este formulario aún no está configurado. Vuelve pronto o contáctanos directamente."
        hint="Si prefieres, puedes abrir el formulario en una pestaña nueva."
      />
    </div>
  );
};

export default ServeForm;