import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import FormEmbedCard from "@/components/connect/FormEmbedCard";
import { usePageTitle } from "@/hooks/use-page-title";

const VisitorForm = () => {
  usePageTitle("Nuevo visitante");
  const src = CHURCH_CONFIG.connect.visitorFormEmbed;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Conócenos"
        title="Nuevo visitante"
        description="Gracias por venir. Cuéntanos un poco sobre ti para darte una cálida bienvenida."
      />
      <FormEmbedCard
        src={src}
        title="Formulario de nuevo visitante"
        placeholder="Este formulario aún no está configurado. Vuelve pronto o contáctanos directamente."
        hint="Si prefieres, puedes abrir el formulario en una pestaña nueva."
      />
    </div>
  );
};

export default VisitorForm;