/**
 * ⚙️ CONFIGURACIÓN DE LA IGLESIA NUEVA VIDA
 * ---------------------------------------
 * Edita este archivo para actualizar toda la información de la app
 * (horarios, textos, enlaces a redes, etc.) sin tocar el código de la interfaz.
 */

export type ServiceTime = {
  day: string;
  name: string;
  time: string;
};

const CHURCH_CONFIG = {
  name: "Iglesia Nueva Vida",

  /** Mensaje de bienvenida que aparece en la portada. */
  welcomeEyebrow: "Bienvenido a",
  welcomeTitle: "Iglesia Nueva Vida",
  welcomeMessage:
    "Un lugar donde puedes encontrar esperanza, comunidad y un nuevo comienzo. Te esperamos con los brazos abiertos.",

  /** Horarios de los servicios. Agrega o quita tantos como necesites. */
  serviceTimes: [
    { day: "Domingo", name: "Culto de adoración", time: "10:00 a. m." },
    { day: "Miércoles", name: "Estudio bíblico", time: "7:00 p. m." },
  ],

  /** Enlaces a las transmisiones en vivo de cada servicio. */
  liveStreams: {
    youtube: "https://www.youtube.com/@iglesianuevavida",
    facebook: "https://www.facebook.com/",
  },

  /** Sección "Acerca de nosotros". */
  about: {
    mission:
      "Compartir el amor de Dios y guiar a cada persona a una nueva vida en Cristo a través de la adoración, la Palabra y el servicio a la comunidad.",
    history:
      "Aquí va la historia de la iglesia: cómo comenzó, dónde se reúne y cómo ha crecido. Edita este texto cuando esté listo.",
    vision:
      "Ser una iglesia que transforma vidas y familias, siendo luz y esperanza en nuestra comunidad.",
    values: [
      { title: "Fe", description: "Caminar confiando en Dios cada día." },
      { title: "Comunidad", description: "Vivir la vida en familia, no en soledad." },
      { title: "Servicio", description: "Amar y servir como Jesús nos enseñó." },
      { title: "Esperanza", description: "Compartir la nueva vida que encontramos en Él." },
    ],
  },

  /** Sección "Nuestro pastor". */
  pastor: {
    name: "Pastor(a) [Nombre de su pastor]",
    role: "Pastor titular",
    initials: "PN",
    bio: "Escribe aquí una breve biografía del pastor: su historia, su familia y su llamado al ministerio.",
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
    /** Pon aquí el enlace real de su página de ofrendas/giving cuando esté listo. */
    url: "",
    note: "Para dar tu ofrenda, escanea el código QR que aparece en pantalla durante el servicio.",
    comingSoon: "La opción de donar en línea estará disponible pronto.",
  },

  /** Información de contacto que aparece en la portada. */
  contact: {
    address: "Av. Principal 123, Ciudad",
    phone: "(555) 123-4567",
  },
};

export type ChurchConfig = typeof CHURCH_CONFIG;
export type ChurchValues = (typeof CHURCH_CONFIG.about.values)[number];

export default CHURCH_CONFIG;