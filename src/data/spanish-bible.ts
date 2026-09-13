// Spanish Bible database - Reina Valera 1960
// This provides offline access to the most commonly read chapters

export type BibleVerse = {
  number: number;
  text: string;
};

export type BibleChapter = {
  reference: string;
  chapterNumber: number;
  verses: BibleVerse[];
};

// Database of commonly read chapters
const BIBLE_DATABASE: Record<string, Record<number, BibleChapter>> = {
  "gen": {
    1: {
      reference: "Génesis 1",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el principio creó Dios los cielos y la tierra." },
        { number: 2, text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas." },
        { number: 3, text: "Y dijo Dios: Sea la luz; y fue la luz." }
      ]
    }
  },
  "exo": {
    20: {
      reference: "Éxodo 20",
      chapterNumber: 20,
      verses: [
        { number: 1, text: "Y habló Dios todas estas palabras, diciendo:" },
        { number: 2, text: "Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre." },
        { number: 3, text: "No tendrás dioses ajenos delante de mí." }
      ]
    }
  },
  "psa": {
    1: {
      reference: "Salmos 1",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "Bienaventurado el varón que no anduvo en consejo de malos, Ni estuvo en camino de pecadores, Ni en silla de escarnecedores se ha sentado;" },
        { number: 2, text: "Sino que en la ley de Jehová está su delicia, Y en su ley medita de día y de noche." },
        { number: 3, text: "Será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará." },
        { number: 4, text: "No así los malos, Que son como el tamo que arrebata el viento." },
        { number: 5, text: "Por tanto, no se levantarán los malos en el juicio, Ni los pecadores en la congregación de los justos." },
        { number: 6, text: "Porque Jehová conoce el camino de los justos; Mas la senda de los malos perecerá." }
      ]
    },
    23: {
      reference: "Salmos 23",
      chapterNumber: 23,
      verses: [
        { number: 1, text: "Jehová es mi pastor; nada me faltará." },
        { number: 2, text: "En lugares de delicados pastos me hará descansar; Junto a aguas de reposo me pastoreará." },
        { number: 3, text: "Confortará mi alma; Me guiará por sendas de justicia por amor de su nombre." },
        { number: 4, text: "Aunque ande en valle de sombra de muerte, No temeré mal alguno, porque tú estarás conmigo; Tu vara y tu cayado me infundirán aliento." },
        { number: 5, text: "Aderezas mesa delante de mí en presencia de mis angustiadores; Unges mi cabeza con aceite; mi copa está rebosando." },
        { number: 6, text: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, Y en la casa de Jehová moraré por largos días." }
      ]
    },
    91: {
      reference: "Salmos 91",
      chapterNumber: 91,
      verses: [
        { number: 1, text: "El que habita al abrigo del Altísimo Morará bajo la sombra del Omnipotente." },
        { number: 2, text: "Diré yo a Jehová: Esperanza mía, y castillo mío; Mi Dios, en quien confiaré." }
      ]
    },
    100: {
      reference: "Salmos 100",
      chapterNumber: 100,
      verses: [
        { number: 1, text: "Cantad alegres a Dios, habitantes de toda la tierra." },
        { number: 2, text: "Servid a Jehová con alegría; Venid ante su presencia con regocijo." },
        { number: 3, text: "Reconoced que Jehová es Dios; El nos hizo, y no nosotros a nosotros mismos; Pueblo suyo somos, y ovejas de su prado." },
        { number: 4, text: "Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza; Alabadle, bendecid su nombre." },
        { number: 5, text: "Porque Jehová es bueno; para siempre es su misericordia, Y su verdad por todas las generaciones." }
      ]
    },
    121: {
      reference: "Salmos 121",
      chapterNumber: 121,
      verses: [
        { number: 1, text: "Alzaré mis ojos a los montes; ¿De dónde vendrá mi socorro?" },
        { number: 2, text: "Mi socorro viene de Jehová, Que hizo los cielos y la tierra." }
      ]
    }
  },
  "pro": {
    3: {
      reference: "Proverbios 3",
      chapterNumber: 3,
      verses: [
        { number: 5, text: "Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia." },
        { number: 6, text: "Reconócelo en todos tus caminos, Y él enderezará tus veredas." }
      ]
    }
  },
  "isa": {
    40: {
      reference: "Isaías 40",
      chapterNumber: 40,
      verses: [
        { number: 31, text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán." }
      ]
    }
  },
  "jer": {
    29: {
      reference: "Jeremías 29",
      chapterNumber: 29,
      verses: [
        { number: 11, text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis." }
      ]
    }
  },
  "mat": {
    5: {
      reference: "Mateo 5",
      chapterNumber: 5,
      verses: [
        { number: 3, text: "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos." },
        { number: 4, text: "Bienaventurados los que lloran, porque ellos recibirán consolación." },
        { number: 5, text: "Bienaventurados los mansos, porque ellos recibirán la tierra por heredad." },
        { number: 6, text: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados." },
        { number: 7, text: "Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia." },
        { number: 8, text: "Bienaventurados los de limpio corazón, porque ellos verán a Dios." },
        { number: 9, text: "Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios." },
        { number: 10, text: "Bienaventurados los que padecen persecución por causa de la justicia, porque de ellos es el reino de los cielos." }
      ]
    },
    6: {
      reference: "Mateo 6",
      chapterNumber: 6,
      verses: [
        { number: 9, text: "Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos, santificado sea tu nombre." },
        { number: 10, text: "Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra." },
        { number: 11, text: "El pan nuestro de cada día, dánoslo hoy." },
        { number: 12, text: "Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores." },
        { number: 13, text: "Y no nos metas en tentación, mas líbranos del mal; porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén." }
      ]
    },
    28: {
      reference: "Mateo 28",
      chapterNumber: 28,
      verses: [
        { number: 19, text: "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;" },
        { number: 20, text: "enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén." }
      ]
    }
  },
  "mrk": {
    16: {
      reference: "Marcos 16",
      chapterNumber: 16,
      verses: [
        { number: 15, text: "Y les dijo: Id por todo el mundo y predicad el evangelio a toda criatura." }
      ]
    }
  },
  "luk": {
    2: {
      reference: "Lucas 2",
      chapterNumber: 2,
      verses: [
        { number: 10, text: "Pero el ángel les dijo: No temáis; porque he aquí os doy nuevas de gran gozo, que será para todo el pueblo:" },
        { number: 11, text: "que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor." }
      ]
    }
  },
  "jhn": {
    1: {
      reference: "Juan 1",
      chapterNumber: 1,
      verses: [
        { number: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." },
        { number: 2, text: "Este era en el principio con Dios." },
        { number: 3, text: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho." },
        { number: 4, text: "En él estaba la vida, y la vida era la luz de los hombres." },
        { number: 5, text: "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella." }
      ]
    },
    3: {
      reference: "Juan 3",
      chapterNumber: 3,
      verses: [
        { number: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
        { number: 17, text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él." }
      ]
    },
    14: {
      reference: "Juan 14",
      chapterNumber: 14,
      verses: [
        { number: 6, text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí." }
      ]
    }
  },
  "rom": {
    8: {
      reference: "Romanos 8",
      chapterNumber: 8,
      verses: [
        { number: 28, text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados." }
      ]
    }
  },
  "1co": {
    13: {
      reference: "1 Corintios 13",
      chapterNumber: 13,
      verses: [
        { number: 4, text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece;" },
        { number: 5, text: "no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor;" },
        { number: 6, text: "no se goza de la injusticia, mas se goza de la verdad." },
        { number: 7, text: "Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta." },
        { number: 8, text: "El amor nunca deja de ser; pero las profecías se acabarán, y cesarán las lenguas, y la ciencia acabará." }
      ]
    }
  },
  "gal": {
    5: {
      reference: "Gálatas 5",
      chapterNumber: 5,
      verses: [
        { number: 22, text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe," },
        { number: 23, text: "mansedumbre, templanza; contra tales cosas no hay ley." }
      ]
    }
  },
  "eph": {
    2: {
      reference: "Efesios 2",
      chapterNumber: 2,
      verses: [
        { number: 8, text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios;" },
        { number: 9, text: "no por obras, para que nadie se gloríe." }
      ]
    }
  },
  "php": {
    4: {
      reference: "Filipenses 4",
      chapterNumber: 4,
      verses: [
        { number: 13, text: "Todo lo puedo en Cristo que me fortalece." }
      ]
    }
  },
  "heb": {
    11: {
      reference: "Hebreos 11",
      chapterNumber: 11,
      verses: [
        { number: 1, text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve." }
      ]
    }
  },
  "1jn": {
    1: {
      reference: "1 Juan 1",
      chapterNumber: 1,
      verses: [
        { number: 9, text: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad." }
      ]
    }
  },
  "rev": {
    21: {
      reference: "Apocalipsis 21",
      chapterNumber: 21,
      verses: [
        { number: 4, text: "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron." }
      ]
    }
  }
};

export function getSpanishBibleChapter(bookCode: string, chapter: number): BibleChapter | null {
  return BIBLE_DATABASE[bookCode]?.[chapter] || null;
}

export function getAllAvailableChapters(): Array<{book: string, chapter: number}> {
  const result: Array<{book: string, chapter: number}> = [];
  
  for (const book in BIBLE_DATABASE) {
    for (const chapter in BIBLE_DATABASE[book]) {
      result.push({ book, chapter: parseInt(chapter) });
    }
  }
  
  return result;
}