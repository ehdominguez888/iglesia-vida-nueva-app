import CHURCH_CONFIG from "@/data/church-config";
import PageHeader from "@/components/layout/PageHeader";
import FormEmbedCard from "@/components/connect/FormEmbedCard";
import { usePageTitle } from "@/hooks/use-page-title";

const Prayer = () => {
  usePageTitle("Solicitud de oración");
  const src = CHURCH_CONFIG.connect.prayerFormEmbed;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Estamos contigo"
        title="Solicitud de oración"
        description="Comparte tu pedido con nosotros. Tu comunidad orará por ti y por lo que llevas en tu corazón."
      />
      <FormEmbedCard
        src={src}
        title="Formulario de solicitud de oración"
        placeholder="Este formulario aún no está configurado. Vuelve pronto o contáctanos directamente."
        hint="Si prefieres, puedes abrir el formulario en una pestaña nueva."
      />
    </div>
  );
};

export default Prayer;