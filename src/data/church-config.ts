/**
 * ⚙️ CONFIGURACIÓN DE LA IGLESIA VIDA NUEVA
 * ---------------------------------------
 * Edita este archivo para actualizar toda la información de la app
 * (horarios, textos, enlaces a redes, etc.) sin tocar el código de la interfaz.
 */

export type ServiceTime = {
  day: string;
  name: string;
  time: string;
};

/**
 * Ruta del logo cuadrado de la iglesia usado en el encabezado, el favicon y la app.
 * Coloca tu archivo de logo en `public/logo.png` y se mostrará automáticamente en todas partes.
 */
export const CHURCH_LOGO_URL = "/logo.png";

const CHURCH_CONFIG = {
  name: "Iglesia Vida Nueva",

  /** Mensaje de bienvenida que aparece en la portada. */
  welcomeEyebrow: "Bienvenido a",
  welcomeTitle: "Iglesia Vida Nueva",
  welcomeMessage: "Ven y conoce lo que Dios ya tiene planeado para tu vida.",

  /** Sitio web oficial de la iglesia. */
  website: "https://www.vidanuevaso.com/",

  /** Horarios de los servicios. Agrega o quita tantos como necesites. */
  serviceTimes: [{ day: "Domingo", name: "Servicio de Adoración", time: "1:00 p. m." }],

  /** Enlaces a las transmisiones en vivo y a las redes sociales. */
  liveStreams: {
    youtube: "https://www.youtube.com/@iglesianuevavida",
    facebook: "https://www.facebook.com/VidaNuevaSO",
    instagram: "https://www.instagram.com/vidanuevaso",
  },

  /** Sección "Acerca de nosotros". */
  about: {
      mission:
        "Conectando amigos a tener una vida con Jesús. Mateo 28:19",
      history:
        "Aquí va la historia de la iglesia: cómo comenzó, dónde se reúne y cómo ha crecido. Edita este texto cuando esté listo.",
      vision:
        "Todo el que pertenece a Cristo se ha convertido en una persona nueva. La vida antigua ha pasado; una vida nueva ha comenzado! 2 Corintios 5:17",
    values: [
      { title: "Fe", description: "Caminar confiando en Dios cada día." },
      { title: "Comunidad", description: "Vivir la vida en familia, no en soledad." },
      { title: "Servicio", description: "Amar y servir como Jesús nos enseñó." },
      { title: "Esperanza", description: "Compartir la nueva vida que encontramos en Él." },
    ],
  },

  /** Sección "Nuestro pastor". */
  pastor: {
    name: "Carlos y Paty Castañedo",
    role: "Pastores titulares",
    initials: "CC",
    bio: "Escribe aquí una breve biografía de los pastores: su historia, su familia y su llamado al ministerio.",
    philosophyTitle: "Filosofía de ministerio",
    philosophy: [
      "Predicar la Palabra con fidelidad y claridad.",
      "Pastorear a las personas con amor y cercanía.",
      "Formar discípulos que sirvan a la comunidad.",
      "Buscar siempre la dirección de Dios en todo lo que hacemos.",
    ],
  },

  /** Página de ofrenda. */
    offering: {
      /** Enlace real de su página de ofrendas/giving. */
      url: "https://form.jotform.com/90324013191141",
      note: "Para dar tu ofrenda, escanea el código QR que aparece en pantalla durante el servicio.",
      comingSoon: "La opción de donar en línea estará disponible pronto.",
    },
  
    /** Pestaña "Conectar": formularios y próximos eventos. */
    connect: {
      /** Tarjetas de acceso de la página de conexión. */
      entries: [
            {
              to: "/conectar/eventos",
              title: "Próximos eventos",
              description: "Mantente al tanto de lo que viene",
              kind: "events",
            },
            {
              to: "/conectar/visita",
              title: "Nuevo visitante",
              description: "Cuéntanos que nos visitaste",
              kind: "visitor",
            },
            {
              to: "/conectar/oracion",
              title: "Solicitud de oración",
              description: "Comparte tu pedido con nosotros",
              kind: "prayer",
            },
            {
              to: "/conectar/servir",
              title: "Sírvete",
              description: "Regístrate para servir en un ministerio",
              kind: "volunteer",
            },
          ],
  
      /**
       * Código de inserción de los formularios de Google.
       * Pega aquí el `src` del iframe que Google Forms te genera al compartir el formulario
       * (por ejemplo, `https://docs.google.com/forms/d/e/.../viewform?embedded=true`).
       * Deja vacío si aún no has creado el formulario.
       */
      visitorFormEmbed:
            "https://docs.google.com/forms/d/e/1FAIpQLSe3CrdjKNLHVke_J5onshTganWTLZeDxKzlBbFSV_531FxblQ/viewform?embedded=true",
          prayerFormEmbed: "",
          volunteerFormEmbed: "",
  
      /** Próximos eventos. Agrega o quita tantos como necesites. */
      events: [
        {
          date: "15 de mayo",
          title: "Servicio de acción de gracias",
          time: "7:00 p. m.",
          location: "Templo principal",
          description:
            "Únete a nosotros para un servicio especial de acción de gracias por la vida de nuestra iglesia.",
          link: "",
        },
        {
          date: "22 de mayo",
          title: "Escuela de líderes",
          time: "5:00 p. m.",
          location: "Salón de jóvenes",
          description:
            "Un espacio de formación para quienes quieren servir en los ministerios de la iglesia.",
        },
      ],
    },
  
    /** Información de contacto que aparece en la portada. */
    contact: {
      address: "20024 Crescent Oaks, San Antonio, TX 78258",
      phone: "(210) 294-9427",
      email: "iglesia@vidanuevaso.com",
    },
  };

export type ChurchConfig = typeof CHURCH_CONFIG;
export type ChurchValues = (typeof CHURCH_CONFIG.about.values)[number];

/** Qué clase de tarjeta de conexión representa cada entrada de acceso. */
export type ConnectKind = "visitor" | "prayer" | "events" | "volunteer";

/** Tarjeta de acceso de la página "Conectar". */
export type ConnectEntry = {
  to: string;
  title: string;
  description: string;
  kind: ConnectKind;
};

/** Próximo evento gestionado desde la configuración. */
export type EventItem = {
  date: string;
  title: string;
  time?: string;
  location?: string;
  description?: string;
  /** Enlace opcional de registro o información externa. */
  link?: string;
};

export default CHURCH_CONFIG;