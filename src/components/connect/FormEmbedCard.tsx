import { ExternalLink, FileQuestion } from "lucide-react";

type FormEmbedCardProps = {
  /** `src` del iframe de Google Forms, o cadena vacía mientras no se configura. */
  src: string;
  title: string;
  /** Mensaje de aviso cuando aún no hay un formulario configurado. */
  placeholder: string;
  /** Pista que aparece bajo el formulario. */
  hint: string;
};

/**
 * Tarjeta reutilizable que envuelve un formulario de Google Forms para que
 * se sienta parte de la app. Envuelve el iframe (cuyo estilo es fijo de Google)
 * y muestra un aviso elegante si el `src` todavía no está configurado.
 */
const FormEmbedCard = ({ src, title, placeholder, hint }: FormEmbedCardProps) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card">
      {src ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="min-h-[520px] w-full border-0"
        />
      ) : (
        <div className="mx-5 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary/40 bg-secondary/40 px-5 py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileQuestion className="h-7 w-7" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">{placeholder}</p>
        </div>
      )}

      <div className="border-t border-border p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{hint}</p>
        {src ? (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir en pestaña nueva
          </a>
        ) : null}
      </div>
    </section>
  );
};

export default FormEmbedCard;