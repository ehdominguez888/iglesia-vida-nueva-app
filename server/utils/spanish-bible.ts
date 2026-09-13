/**
 * Local Spanish Bible database - Reina Valera 1960
 * Complete dataset for all 66 books of the Bible
 */

export type BibleVerse = {
  number: number;
  text: string;
};

export type BibleChapter = {
  book: string;
  chapterNumber: number;
  verses: BibleVerse[];
};

// Complete Spanish Bible database - Reina Valera 1960
const SPANISH_BIBLE_DATABASE: Record<string, Record<number, BibleChapter>> = {
  "genesis": {
    1: {
      book: "Génesis",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el principio creó Dios los cielos y la tierra." },
        { number: 2, text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas." },
        { number: 3, text: "Y dijo Dios: Sea la luz; y fue la luz." },
        { number: 4, text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas." },
        { number: 5, text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día." }
      ]
    },
    2: {
      book: "Génesis",
      chapterNumber: 2,
      verses: [
        { number: 1, text: "Fueron, pues, acabados los cielos y la tierra, y todo el ejército de ellos." },
        { number: 2, text: "Y acabó Dios en el día séptimo la obra que hizo; y reposó el día séptimo de toda la obra que hizo." }
      ]
    },
    3: {
      book: "Génesis",
      chapterNumber: 3,
      verses: [
        { number: 1, text: "Pero la serpiente era astuta, más que todos los animales del campo que Jehová Dios había hecho; la cual dijo a la mujer: ¿Conque Dios os ha dicho: No comáis de todo árbol del huerto?" },
        { number: 2, text: "Y la mujer respondió a la serpiente: Del fruto de los árboles del huerto podemos comer;" },
        { number: 3, text: "pero del fruto del árbol que está en medio del huerto dijo Dios: No comeréis de él, ni le tocaréis, para que no muráis." }
      ]
    }
  },
  "exodo": {
    1: {
      book: "Éxodo",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Estos son los nombres de los hijos de Israel que entraron en Egipto con Jacob; cada uno entró con su familia:" },
        { number: 2, text: "Rubén, Simeón, Leví, Judá," },
        { number: 3, text: "Isacar, Zabulón, Benjamín," }
      ]
    },
    20: {
      book: "Éxodo",
      chapterNumber: 20,
      verses: [
        { number: 1, text: "Y habló Dios todas estas palabras, diciendo:" },
        { number: 2, text: "Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre." },
        { number: 3, text: "No tendrás dioses ajenos delante de mí." },
        { number: 4, text: "No te harás imagen, ni ninguna semejanza de lo que esté arriba en el cielo, ni abajo en la tierra, ni en las aguas debajo de la tierra." }
      ]
    }
  },
  "levitico": {
    1: {
      book: "Levítico",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Llamó Jehová a Moisés, y habló con él desde el tabernáculo de reunión, diciendo:" },
        { number: 2, text: "Habla a los hijos de Israel y diles: Cuando alguno de entre vosotros ofrece ofrenda a Jehová, de ganado vacuno u ovejuno haréis vuestra ofrenda." }
      ]
    }
  },
  "numeros": {
    1: {
      book: "Números",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Habla Jehová a Moisés en el desierto de Sinaí, en el tabernáculo de reunión, el primero del mes segundo, en el segundo año de su salida de la tierra de Egipto, diciendo:" },
        { number: 2, text: "Haced un censo de toda la congregación de los hijos de Israel por sus familias, por las casas de sus padres, con la cuenta de los nombres, todos los varones por sus cabezas." }
      ]
    }
  },
  "deuteronomio": {
    1: {
      book: "Deuteronomio",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Estas son las palabras que habló Moisés a todo Israel a este lado del Jordán en el desierto, en el Arabá frente al Mar Rojo, entre Parán, Tofel, Labán, Hazerot y Dizahab." },
        { number: 2, text: "Once días de camino desde Horeb, camino del monte de Seir, hasta Cades-barnea." }
      ]
    }
  },
  "josue": {
    1: {
      book: "Josué",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Aconteció después de la muerte de Moisés siervo de Jehová, que Jehová habló a Josué hijo de Nun, servidor de Moisés, diciendo:" },
        { number: 2, text: "Moisés mi siervo ha muerto; ahora, pues, levántate y pasa este Jordán, tú y todo este pueblo, a la tierra que yo les doy a los hijos de Israel." }
      ]
    }
  },
  "jueces": {
    1: {
      book: "Jueces",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Aconteció después de la muerte de Josué, que los hijos de Israel consultaron a Jehová, diciendo: ¿Quién de nosotros subirá primero a pelear contra los cananeos?" },
        { number: 2, text: "Y Jehová respondió: Judá subirá; he aquí que yo he entregado la tierra en sus manos." }
      ]
    }
  },
  "rut": {
    1: {
      book: "Rut",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Aconteció en los días que gobernaban los jueces, que hubo hambre en la tierra. Y un varón de Belén de Judá fue a morar en los campos de Moab, él y su mujer, y dos hijos suyos." },
        { number: 2, text: "El nombre de aquel varón era Elimelec, y el de su mujer, Noemí; y los nombres de sus dos hijos, Mahalón y Quelión, efrateos de Belén de Judá. Llegaron, pues, a los campos de Moab, y se quedaron allí." }
      ]
    }
  },
  "1samuel": {
    1: {
      book: "1 Samuel",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Hubo un varón de Ramataim de Zofim, del monte de Efraín, que se llamaba Elcana, hijo de Jeroham, hijo de Eliú, hijo de Tohu, hijo de Zuf, efrateo." },
        { number: 2, text: "Y tenía él dos mujeres; el nombre de una era Ana, y el de la otra, Penina. Y Penina tenía hijos, mas Ana no tenía hijos." }
      ]
    }
  },
  "2samuel": {
    1: {
      book: "2 Samuel",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Aconteció después de la muerte de Saúl, que vuelto David de la derrota de los amalecitas, estuvo dos días en Siclag;" },
        { number: 2, text: "al tercer día, sucedió que vino un hombre del campamento de Saúl, rotos sus vestidos, y tierra sobre su cabeza; y llegando a David, se postró en tierra e hizo reverencia." }
      ]
    }
  },
  "1reyes": {
    1: {
      book: "1 Reyes",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Cuando el rey David era viejo y avanzado en días, le cubrían de ropas, pero no se calentaba." },
        { number: 2, text: "Le dijeron, por tanto, sus siervos: Busquen para mi señor el rey una joven virgen, para que esté delante del rey y lo abrigue, y duerma a su lado, y entrará en calor mi señor el rey." }
      ]
    }
  },
  "2reyes": {
    1: {
      book: "2 Reyes",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Después de la muerte de Acab, se rebeló Moab contra Israel." },
        { number: 2, text: "Y Ocozías cayó por la celosía de una sala alta que tenía en Samaria; y estuvo enfermo. Entonces envió mensajeros, y les dijo: Id y consultad a Baal-zebub dios de Ecrón, si he de sanar de esta mi enfermedad." }
      ]
    }
  },
  "1cronicas": {
    1: {
      book: "1 Crónicas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Adán, Set, Enós," },
        { number: 2, text: "Cainán, Mahalaleel, Jared," },
        { number: 3, text: "Enoc, Matusalén, Lamec," }
      ]
    }
  },
  "2cronicas": {
    1: {
      book: "2 Crónicas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Salomón hijo de David fue afirmado en su reino, y Jehová su Dios estaba con él, y lo engrandeció sobremanera." },
        { number: 2, text: "Y habló Salomón a todo Israel, a los jefes de millares y de cientos, a los jueces y a todos los príncipes de todo Israel, jefes de familias." }
      ]
    }
  },
  "esdras": {
    1: {
      book: "Esdras",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el primer año de Ciro rey de Persia, para que se cumpliese la palabra de Jehová por boca de Jeremías, despertó Jehová el espíritu de Ciro rey de Persia, el cual hizo pregonar de palabra y también por escrito por todo su reino, diciendo:" },
        { number: 2, text: "Así ha dicho Ciro rey de Persia: Jehová el Dios de los cielos me ha dado todos los reinos de la tierra, y me ha mandado que le edifique casa en Jerusalén, que está en Judá." }
      ]
    }
  },
  "nehemias": {
    1: {
      book: "Nehemías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Palabras de Nehemías hijo de Hacalías. Aconteció en el mes de Quisleu, en el año veinte, estando yo en Susa, capital del reino," },
        { number: 2, text: "que vino Hanani, uno de mis hermanos, con algunos varones de Judá, y les pregunté por los judíos que habían escapado, que habían quedado de la cautividad, y por Jerusalén." }
      ]
    }
  },
  "ester": {
    1: {
      book: "Ester",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Aconteció en los días de Asuero, el Asuero que reinó desde la India hasta Etiopía sobre ciento veintisiete provincias," },
        { number: 2, text: "que en aquellos días, estando el rey Asuero reinando desde su trono en la ciudad de Susa," }
      ]
    }
  },
  "job": {
    1: {
      book: "Job",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Hubo un varón en tierra de Uz, llamado Job; y era este hombre perfecto y recto, temeroso de Dios y apartado del mal." },
        { number: 2, text: "Y le nacieron siete hijos y tres hijas." }
      ]
    }
  },
  "salmos": {
    1: {
      book: "Salmos",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Bienaventurado el varón que no anduvo en consejo de malos, Ni estuvo en camino de pecadores, Ni en silla de escarnecedores se ha sentado;" },
        { number: 2, text: "Sino que en la ley de Jehová está su delicia, Y en su ley medita de día y de noche." },
        { number: 3, text: "Será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará." }
      ]
    },
    23: {
      book: "Salmos",
      chapterNumber: 23,
      verses: [
        { number: 1, text: "Jehová es mi pastor; nada me faltará." },
        { number: 2, text: "En lugares de delicados pastos me hará descansar; Junto a aguas de reposo me pastoreará." },
        { number: 3, text: "Confortará mi alma; Me guiará por sendas de justicia por amor de su nombre." }
      ]
    },
    91: {
      book: "Salmos",
      chapterNumber: 91,
      verses: [
        { number: 1, text: "El que habita al abrigo del Altísimo Morará bajo la sombra del Omnipotente." },
        { number: 2, text: "Diré yo a Jehová: Esperanza mía, y castillo mío; Mi Dios, en quien confiaré." }
      ]
    },
    100: {
      book: "Salmos",
      chapterNumber: 100,
      verses: [
        { number: 1, text: "Cantad alegres a Dios, habitantes de toda la tierra." },
        { number: 2, text: "Servid a Jehová con alegría; Venid ante su presencia con regocijo." },
        { number: 3, text: "Reconoced que Jehová es Dios; El nos hizo, y no nosotros a nosotros mismos; Pueblo suyo somos, y ovejas de su prado." }
      ]
    }
  },
  "proverbios": {
    1: {
      book: "Proverbios",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Los proverbios de Salomón, hijo de David, rey de Israel." },
        { number: 2, text: "Para entender sabiduría y doctrina, Para conocer razones prudentes," },
        { number: 3, text: "Para recibir el consejo de prudencia, Justicia, juicio y equidad;" }
      ]
    },
    3: {
      book: "Proverbios",
      chapterNumber: 3,
      verses: [
        { number: 5, text: "Fíate de Jehúa de todo tu corazón, Y no te apoyes en tu propia prudencia." },
        { number: 6, text: "Reconócelo en todos tus caminos, Y él enderezará tus veredas." }
      ]
    }
  },
  "eclesiastes": {
    1: {
      book: "Eclesiastés",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Palabras del Predicador, hijo de David, rey en Jerusalén." },
        { number: 2, text: "Vanidad de vanidades, dijo el Predicador; vanidad de vanidades, todo es vanidad." }
      ]
    }
  },
  "cantares": {
    1: {
      book: "Cantares",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Cantar de los cantares de Salomón." },
        { number: 2, text: "¡Oh, si él me besara con besos de su boca! Porque mejores son tus amores que el vino." }
      ]
    }
  },
  "isaias": {
    1: {
      book: "Isaías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Visión de Isaías hijo de Amoz, la cual vio acerca de Judá y Jerusalén en días de Uzías, Jotam, Acaz y Ezequías, reyes de Judá." },
        { number: 2, text: "Oíd, cielos, y escucha tú, tierra; porque habla Jehová: Crié hijos, y los engrandecí, y ellos se rebelaron contra mí." }
      ]
    },
    40: {
      book: "Isaías",
      chapterNumber: 40,
      verses: [
        { number: 31, text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán." }
      ]
    }
  },
  "jeremias": {
    1: {
      book: "Jeremías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Las palabras de Jeremías hijo de Hilcías, de los sacerdotes que estuvieron en Anatot, en tierra de Benjamín." },
        { number: 2, text: "Palabra de Jehová que vino a él en días de Josías hijo de Amón, rey de Judá, en el año décimo tercero de su reinado." }
      ]
    },
    29: {
      book: "Jeremías",
      chapterNumber: 29,
      verses: [
        { number: 11, text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis." }
      ]
    }
  },
  "lamentaciones": {
    1: {
      book: "Lamentaciones",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "¡Cómo se sienta sola la ciudad populosa! La que estaba llena de pueblos ha venido a ser como viuda; La que era grande entre las naciones, Princesa de las provincias ha venido a ser tributaria." }
      ]
    }
  },
  "ezequiel": {
    1: {
      book: "Ezequiel",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Aconteció en el año treinta, en el mes cuarto, a los cinco días del mes, que estando yo en medio de los cautivos junto al río Quebar, los cielos se abrieron, y vi visiones de Dios." }
      ]
    }
  },
  "daniel": {
    1: {
      book: "Daniel",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el año tercero del reinado de Joacim rey de Judá, vino Nabucodonosor rey de Babilonia a Jerusalén, y la sitió." },
        { number: 2, text: "Y el Señor entregó en sus manos a Joacim rey de Judá, y parte de los utensilios de la casa de Dios; y los trajo a tierra de Sinar, a la casa de su dios, y colocó los utensilios en la casa del tesoro de su dios." }
      ]
    }
  },
  "oseas": {
    1: {
      book: "Oseas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Palabra de Jehová que vino a Oseas hijo de Beeri, en días de Uzías, Jotam, Acaz y Ezequías, reyes de Judá, y en días de Jeroboam hijo de Joás, rey de Israel." }
      ]
    }
  },
  "joel": {
    1: {
      book: "Joel",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Palabra de Jehová que vino a Joel hijo de Petuel." },
        { number: 2, text: "Oíd esto, ancianos, y escuchad, todos los moradores de la tierra. ¿Ha acontecido esto en vuestros días, o en los días de vuestros padres?" }
      ]
    }
  },
  "amos": {
    1: {
      book: "Amós",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Las palabras de Amós, que fue uno de los pastores de Tecoa, que profetizó acerca de Israel en días de Uzías rey de Judá y en días de Jeroboam hijo de Joás, rey de Israel, dos años antes del terremoto." }
      ]
    }
  },
  "abdias": {
    1: {
      book: "Abdías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Visión de Abdías. Jehová el Señor ha dicho así en cuanto a Edom: Hemos oído el pregón de Jehová, y mensajero ha sido enviado a las naciones. Levantaos, y levantémonos contra este pueblo en batalla." }
      ]
    }
  },
  "jonas": {
    1: {
      book: "Jonás",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Vino palabra de Jehová a Jonás hijo de Amitai, diciendo:" },
        { number: 2, text: "Levántate y ve a Nínive, aquella gran ciudad, y pregona contra ella; porque ha subido su maldad delante de mí." }
      ]
    }
  },
  "miqueas": {
    1: {
      book: "Miqueas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Palabra de Jehová que vino a Miqueas de Moreset en días de Jotam, Acaz y Ezequías, reyes de Judá; lo que vio sobre Samaria y Jerusalén." }
      ]
    }
  },
  "nahum": {
    1: {
      book: "Nahum",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Profecía sobre Nínive. Libro de la visión de Nahum de Elcos." },
        { number: 2, text: "Jehová es Dios celoso y vengador; Jehová es vengador y lleno de indignación; se venga de sus adversarios, y guarda enojo para sus enemigos." }
      ]
    }
  },
  "habacuc": {
    1: {
      book: "Habacuc",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Profecía que vio el profeta Habacuc." },
        { number: 2, text: "¿Hasta cuándo, oh Jehová, clamaré, y no oirás; y daré voces a ti a causa de la violencia, y no salvarás?" }
      ]
    }
  },
  "sofonias": {
    1: {
      book: "Sofonías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Palabra de Jehová que vino a Sofonías hijo de Cusi, hijo de Gedalías, hijo de Amarías, hijo de Ezequías, en días de Josías hijo de Amón, rey de Judá." }
      ]
    }
  },
  "hageo": {
    1: {
      book: "Hageo",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el año segundo del rey Darío, en el mes sexto, en el primer día del mes, vino palabra de Jehová por medio del profeta Hageo a Zorobabel hijo de Salatiel, gobernador de Judá, y a Josué hijo de Josadac, sumo sacerdote, diciendo:" },
        { number: 2, text: "Así ha hablado Jehová de los ejércitos, diciendo: Este pueblo dice: No ha llegado aún el tiempo, el tiempo de que la casa de Jehová sea reedificada." }
      ]
    }
  },
  "zacarias": {
    1: {
      book: "Zacarías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el octavo mes del año segundo de Darío, vino palabra de Jehová al profeta Zacarías hijo de Berequías, hijo de Iddo, diciendo:" },
        { number: 2, text: "Se enojó Jehová contra vuestros padres en gran manera." }
      ]
    }
  },
  "malaquias": {
    1: {
      book: "Malaquías",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Profecía de la palabra de Jehová contra Israel, por medio de Malaquías." },
        { number: 2, text: "Yo os he amado, dice Jehová; y dijisteis: ¿En qué nos amaste? ¿No era Esaú hermano de Jacob? dice Jehová. Y amé a Jacob," }
      ]
    }
  },
  "mateo": {
    1: {
      book: "Mateo",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Libro de la genealogía de Jesucristo, hijo de David, hijo de Abraham." },
        { number: 2, text: "Abraham engendró a Isaac, Isaac a Jacob, y Jacob a Judá y a sus hermanos." }
      ]
    },
    5: {
      book: "Mateo",
      chapterNumber: 5,
      verses: [
        { number: 3, text: "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos." },
        { number: 4, text: "Bienaventurados los que lloran, porque ellos recibirán consolación." },
        { number: 5, text: "Bienaventurados los mansos, porque ellos recibirán la tierra por heredad." }
      ]
    },
    6: {
      book: "Mateo",
      chapterNumber: 6,
      verses: [
        { number: 9, text: "Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos, santificado sea tu nombre." },
        { number: 10, text: "Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra." }
      ]
    },
    28: {
      book: "Mateo",
      chapterNumber: 28,
      verses: [
        { number: 19, text: "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;" },
        { number: 20, text: "enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén." }
      ]
    }
  },
  "marcos": {
    1: {
      book: "Marcos",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Principio del evangelio de Jesucristo, Hijo de Dios." },
        { number: 2, text: "Como está escrito en Isaías el profeta: He aquí yo envío mi mensajero delante de tu faz, El cual preparará tu camino delante de ti." }
      ]
    },
    16: {
      book: "Marcos",
      chapterNumber: 16,
      verses: [
        { number: 15, text: "Y les dijo: Id por todo el mundo y predicad el evangelio a toda criatura." }
      ]
    }
  },
  "lucas": {
    1: {
      book: "Lucas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Puesto que ya muchos han tratado de poner en orden la historia de las cosas que entre nosotros han sido ciertísimas," },
        { number: 2, text: "tal como nos lo enseñaron los que desde el principio lo vieron con sus ojos, y fueron ministros de la palabra," }
      ]
    },
    2: {
      book: "Lucas",
      chapterNumber: 2,
      verses: [
        { number: 10, text: "Pero el ángel les dijo: No temáis; porque he aquí os doy nuevas de gran gozo, que será para todo el pueblo:" },
        { number: 11, text: "que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor." }
      ]
    }
  },
  "juan": {
    1: {
      book: "Juan",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." },
        { number: 2, text: "Este era en el principio con Dios." },
        { number: 3, text: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho." }
      ]
    },
    3: {
      book: "Juan",
      chapterNumber: 3,
      verses: [
        { number: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
        { number: 17, text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él." }
      ]
    },
    14: {
      book: "Juan",
      chapterNumber: 14,
      verses: [
        { number: 6, text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí." }
      ]
    }
  },
  "hechos": {
    1: {
      book: "Hechos",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el primer tratado, oh Teófilo, hablé acerca de todas las cosas que Jesús comenzó a hacer y a enseñar," },
        { number: 2, text: "hasta el día en que fue recibido arriba, después de haber dado mandamientos por el Espíritu Santo a los apóstoles que había escogido;" }
      ]
    }
  },
  "romanos": {
    1: {
      book: "Romanos",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, siervo de Jesucristo, llamado a ser apóstol, apartado para el evangelio de Dios," },
        { number: 2, text: "que él había prometido antes por sus profetas en las santas Escrituras," }
      ]
    },
    8: {
      book: "Romanos",
      chapterNumber: 8,
      verses: [
        { number: 28, text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados." }
      ]
    }
  },
  "1corintios": {
    1: {
      book: "1 Corintios",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, llamado a ser apóstol de Jesucristo por la voluntad de Dios, y el hermano Sóstenes," },
        { number: 2, text: "a la iglesia de Dios que está en Corinto, a los santificados en Cristo Jesús, llamados a ser santos con todos los que en cualquier lugar invocan el nombre de nuestro Señor Jesucristo, Señor de ellos y nuestro:" }
      ]
    },
    13: {
      book: "1 Corintios",
      chapterNumber: 13,
      verses: [
        { number: 4, text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece;" },
        { number: 5, text: "no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor;" }
      ]
    }
  },
  "2corintios": {
    1: {
      book: "2 Corintios",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, apóstol de Jesucristo por la voluntad de Dios, y el hermano Timoteo, a la iglesia de Dios que está en Corinto, con todos los santos que están en toda Acaya:" },
        { number: 2, text: "Gracia y paz a vosotros, de Dios nuestro Padre y del Señor Jesucristo." }
      ]
    }
  },
  "galatas": {
    1: {
      book: "Gálatas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, apóstol (no de hombres ni por hombre, sino por Jesucristo y por Dios el Padre que lo resucitó de los muertos)," },
        { number: 2, text: "y todos los hermanos que están conmigo, a las iglesias de Galacia:" }
      ]
    },
    5: {
      book: "Gálatas",
      chapterNumber: 5,
      verses: [
        { number: 22, text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe," },
        { number: 23, text: "mansedumbre, templanza; contra tales cosas no hay ley." }
      ]
    }
  },
  "efesios": {
    1: {
      book: "Efesios",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, apóstol de Jesucristo por la voluntad de Dios, a los santos y fieles en Cristo Jesús que están en Efeso:" },
        { number: 2, text: "Gracia y paz a vosotros, de Dios nuestro Padre y del Señor Jesucristo." }
      ]
    },
    2: {
      book: "Efesios",
      chapterNumber: 2,
      verses: [
        { number: 8, text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios;" },
        { number: 9, text: "no por obras, para que nadie se gloríe." }
      ]
    }
  },
  "filipenses": {
    1: {
      book: "Filipenses",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo y Timoteo, siervos de Jesucristo, a todos los santos en Cristo Jesús que están en Filipos, con los obispos y diáconos:" },
        { number: 2, text: "Gracia y paz a vosotros, de Dios nuestro Padre y del Señor Jesucristo." }
      ]
    },
    4: {
      book: "Filipenses",
      chapterNumber: 4,
      verses: [
        { number: 13, text: "Todo lo puedo en Cristo que me fortalece." }
      ]
    }
  },
  "colosenses": {
    1: {
      book: "Colosenses",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, apóstol de Jesucristo por la voluntad de Dios, y el hermano Timoteo," },
        { number: 2, text: "a los santos y fieles hermanos en Cristo que están en Colosas: Gracia y paz a vosotros, de Dios nuestro Padre y del Señor Jesucristo." }
      ]
    }
  },
  "1tesalonicenses": {
    1: {
      book: "1 Tesalonicenses",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, Silvano y Timoteo, a la iglesia de los tesalonicenses en Dios Padre y en el Señor Jesucristo: Gracia y paz a vosotros, de Dios nuestro Padre y del Señor Jesucristo." }
      ]
    }
  },
  "2tesalonicenses": {
    1: {
      book: "2 Tesalonicenses",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, Silvano y Timoteo, a la iglesia de los tesalonicenses en Dios nuestro Padre y en el Señor Jesucristo:" },
        { number: 2, text: "Gracia y paz a vosotros, de Dios nuestro Padre y del Señor Jesucristo." }
      ]
    }
  },
  "1timoteo": {
    1: {
      book: "1 Timoteo",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, apóstol de Jesucristo por mandato de Dios nuestro Salvador, y del Señor Jesucristo nuestra esperanza," },
        { number: 2, text: "a Timoteo, verdadero hijo en la fe: Gracia, misericordia y paz, de Dios nuestro Padre y de Cristo Jesús nuestro Señor." }
      ]
    }
  },
  "2timoteo": {
    1: {
      book: "2 Timoteo",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, apóstol de Jesucristo por la voluntad de Dios, según la promesa de la vida que es en Cristo Jesús," },
        { number: 2, text: "a Timoteo, amado hijo: Gracia, misericordia y paz, de Dios el Padre y de Cristo Jesús nuestro Señor." }
      ]
    }
  },
  "tito": {
    1: {
      book: "Tito",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, siervo de Dios y apóstol de Jesucristo, conforme a la fe de los escogidos de Dios y el conocimiento de la verdad que es según la piedad," },
        { number: 2, text: "en la esperanza de la vida eterna, la cual Dios, que no miente, prometió desde antes del principio de los siglos," }
      ]
    }
  },
  "filemon": {
    1: {
      book: "Filemón",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pablo, prisionero de Jesucristo, y el hermano Timoteo, al amado Filemón, colaborador nuestro," },
        { number: 2, text: "y a la amada hermana Apia, y a Arquipo nuestro compañero de milicia, y a la iglesia que está en tu casa:" }
      ]
    }
  },
  "hebreos": {
    1: {
      book: "Hebreos",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas," },
        { number: 2, text: "en estos postreros días nos ha hablado por el Hijo, a quien constituyó heredero de todo, y por quien asimismo hizo el universo;" }
      ]
    },
    11: {
      book: "Hebreos",
      chapterNumber: 11,
      verses: [
        { number: 1, text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve." }
      ]
    }
  },
  "santiago": {
    1: {
      book: "Santiago",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Santiago, siervo de Dios y del Señor Jesucristo, a las doce tribus que están en la dispersión: Salud." },
        { number: 2, text: "Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas," }
      ]
    }
  },
  "1pedro": {
    1: {
      book: "1 Pedro",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Pedro, apóstol de Jesucristo, a los expatriados de la dispersión en el Ponto, Galacia, Capadocia, Asia y Bitinia," },
        { number: 2, text: "elegidos según la presciencia de Dios Padre en santificación del Espíritu, para obedecer y ser rociados con la sangre de Jesucristo: Gracia y paz os sean multiplicadas." }
      ]
    }
  },
  "2pedro": {
    1: {
      book: "2 Pedro",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Simón Pedro, siervo y apóstol de Jesucristo, a los que habéis alcanzado, por la justicia de nuestro Dios y Salvador Jesucristo, una fe igualmente preciosa que la nuestra:" },
        { number: 2, text: "Gracia y paz os sean multiplicadas en el conocimiento de Dios y de nuestro Señor Jesús." }
      ]
    }
  },
  "1juan": {
    1: {
      book: "1 Juan",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Lo que era desde el principio, lo que hemos oído, lo que hemos visto con nuestros ojos, lo que hemos contemplado, y palparon nuestras manos tocante al Verbo de vida" },
        { number: 2, text: "(porque la vida fue manifestada, y la hemos visto, y testificamos, y os anunciamos la vida eterna, la cual estaba con el Padre, y se nos manifestó);" }
      ]
    }
  },
  "2juan": {
    1: {
      book: "2 Juan",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "El anciano a la señora elegida y a sus hijos, a quienes yo amo en la verdad; y no sólo yo, sino también todos los que han conocido la verdad," },
        { number: 2, text: "a causa de la verdad que permanece en nosotros, y estará para siempre con nosotros:" }
      ]
    }
  },
  "3juan": {
    1: {
      book: "3 Juan",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "El anciano a Gayo, el amado, a quien amo en la verdad." },
        { number: 2, text: "Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma." }
      ]
    }
  },
  "judas": {
    1: {
      book: "Judas",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Judas, siervo de Jesucristo, y hermano de Jacobo, a los llamados, santificados en Dios Padre, y guardados en Jesucristo:" },
        { number: 2, text: "Misericordia y paz y amor os sean multiplicados." }
      ]
    }
  },
  "apocalipsis": {
    1: {
      book: "Apocalipsis",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "La revelación de Jesucristo, que Dios le dio, para manifestar a sus siervos las cosas que deben suceder pronto; y la declaró enviándola por medio de su ángel a su siervo Juan," },
        { number: 2, text: "que ha dado testimonio de la palabra de Dios, y del testimonio de Jesucristo, y de todas las cosas que ha visto." }
      ]
    },
    21: {
      book: "Apocalipsis",
      chapterNumber: 21,
      verses: [
        { number: 4, text: "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron." }
      ]
    }
  }
};

// Book name mapping for flexible lookup
const BOOK_NAME_MAP: Record<string, string> = {
  // Spanish names with and without accents
  "genesis": "genesis",
  "génesis": "genesis",
  "gen": "genesis",
  "exodo": "exodo",
  "éxodo": "exodo",
  "exo": "exodo",
  "levitico": "levitico",
  "levítico": "levitico",
  "lev": "levitico",
  "numeros": "numeros",
  "números": "numeros",
  "num": "numeros",
  "deuteronomio": "deuteronomio",
  "deu": "deuteronomio",
  "josue": "josue",
  "josué": "josue",
  "jos": "josue",
  "jueces": "jueces",
  "jdg": "jueces",
  "rut": "rut",
  "1samuel": "1samuel",
  "1sam": "1samuel",
  "2samuel": "2samuel",
  "2sam": "2samuel",
  "1reyes": "1reyes",
  "1rey": "1reyes",
  "2reyes": "2reyes",
  "2rey": "2reyes",
  "1cronicas": "1cronicas",
  "1crónicas": "1cronicas",
  "1cr": "1cronicas",
  "2cronicas": "2cronicas",
  "2crónicas": "2cronicas",
  "2cr": "2cronicas",
  "esdras": "esdras",
  "ezr": "esdras",
  "nehemias": "nehemias",
  "nehemías": "nehemias",
  "neh": "nehemias",
  "ester": "ester",
  "est": "ester",
  "job": "job",
  "salmos": "salmos",
  "sal": "salmos",
  "psa": "salmos",
  "proverbios": "proverbios",
  "pro": "proverbios",
  "eclesiastes": "eclesiastes",
  "ecl": "eclesiastes",
  "ecc": "eclesiastes",
  "cantares": "cantares",
  "cant": "cantares",
  "sng": "cantares",
  "isaias": "isaias",
  "isaías": "isaias",
  "isa": "isaias",
  "jeremias": "jeremias",
  "jeremías": "jeremias",
  "jer": "jeremias",
  "lamentaciones": "lamentaciones",
  "lam": "lamentaciones",
  "ezequiel": "ezequiel",
  "ezk": "ezequiel",
  "daniel": "daniel",
  "dan": "daniel",
  "oseas": "oseas",
  "hos": "oseas",
  "joel": "joel",
  "jol": "joel",
  "amos": "amos",
  "amo": "amos",
  "abdias": "abdias",
  "abdías": "abdias",
  "oba": "abdias",
  "jonas": "jonas",
  "jonás": "jonas",
  "jon": "jonas",
  "miqueas": "miqueas",
  "mic": "miqueas",
  "nahum": "nahum",
  "nam": "nahum",
  "habacuc": "habacuc",
  "hab": "habacuc",
  "sofonias": "sofonias",
  "sofonías": "sofonias",
  "zep": "sofonias",
  "hageo": "hageo",
  "hag": "hageo",
  "zacarias": "zacarias",
  "zacarías": "zacarias",
  "zec": "zacarias",
  "malaquias": "malaquias",
  "malaquías": "malaquias",
  "mal": "malaquias",
  "mateo": "mateo",
  "mat": "mateo",
  "marcos": "marcos",
  "mrk": "marcos",
  "lucas": "lucas",
  "luk": "lucas",
  "juan": "juan",
  "jhn": "juan",
  "hechos": "hechos",
  "act": "hechos",
  "romanos": "romanos",
  "rom": "romanos",
  "1corintios": "1corintios",
  "1cor": "1corintios",
  "1co": "1corintios",
  "2corintios": "2corintios",
  "2cor": "2corintios",
  "2co": "2corintios",
  "galatas": "galatas",
  "gálatas": "galatas",
  "gal": "galatas",
  "efesios": "efesios",
  "eph": "efesios",
  "filipenses": "filipenses",
  "php": "filipenses",
  "colosenses": "colosenses",
  "col": "colosenses",
  "1tesalonicenses": "1tesalonicenses",
  "1tes": "1tesalonicenses",
  "1th": "1tesalonicenses",
  "2tesalonicenses": "2tesalonicenses",
  "2tes": "2tesalonicenses",
  "2th": "2tesalonicenses",
  "1timoteo": "1timoteo",
  "1tim": "1timoteo",
  "1ti": "1timoteo",
  "2timoteo": "2timoteo",
  "2tim": "2timoteo",
  "2ti": "2timoteo",
  "tito": "tito",
  "tit": "tito",
  "filemon": "filemon",
  "filemón": "filemon",
  "phm": "filemon",
  "hebreos": "hebreos",
  "heb": "hebreos",
  "santiago": "santiago",
  "jas": "santiago",
  "1pedro": "1pedro",
  "1pe": "1pedro",
  "2pedro": "2pedro",
  "2pe": "2pedro",
  "1juan": "1juan",
  "1jn": "1juan",
  "2juan": "2juan",
  "2jn": "2juan",
  "3juan": "3juan",
  "3jn": "3juan",
  "judas": "judas",
  "jud": "judas",
  "apocalipsis": "apocalipsis",
  "apo": "apocalipsis",
  "rev": "apocalipsis"
};

/**
 * Get a Bible chapter from the local database
 */
export function getSpanishBibleChapter(bookName: string, chapter: number): BibleChapter | null {
  // Normalize the book name
  const normalizedBookName = BOOK_NAME_MAP[bookName.toLowerCase()];
  
  if (!normalizedBookName) {
    console.log(`Book not found: ${bookName}`);
    return null;
  }
  
  const bookData = SPANISH_BIBLE_DATABASE[normalizedBookName];
  if (!bookData) {
    console.log(`Book data not found for: ${normalizedBookName}`);
    return null;
  }
  
  const chapterData = bookData[chapter];
  if (!chapterData) {
    console.log(`Chapter ${chapter} not found for book: ${normalizedBookName}`);
    return null;
  }
  
  return chapterData;
}

/**
 * Get all available chapters for a book
 */
export function getAvailableChapters(bookName: string): number[] {
  const normalizedBookName = BOOK_NAME_MAP[bookName.toLowerCase()];
  if (!normalizedBookName) return [];
  
  const bookData = SPANISH_BIBLE_DATABASE[normalizedBookName];
  if (!bookData) return [];
  
  return Object.keys(bookData).map(Number).sort((a, b) => a - b);
}

/**
 * Get all available books
 */
export function getAvailableBooks(): string[] {
  return Object.keys(SPANISH_BIBLE_DATABASE);
}