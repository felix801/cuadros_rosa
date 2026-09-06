/**
 * Rosa Martín - Art Portfolio Web Application
 * Interactivity, Dynamic rendering, Navigation, Multi-language Support,
 * Artwork Management (CRUD with Dual Create/Edit Mode & DeepSeek Multimodal AI) & Lightbox controller.
 */

// --- ESTADO GLOBAL DE IDIOMA CON CONTROL DE ERRORES (CORS/LOCAL) ---
let currentLang = 'es';
try {
  currentLang = localStorage.getItem('selectedLang') || 'es';
} catch (e) {
  console.warn("localStorage is not accessible in this environment. Defaulting to 'es'.");
}

// --- DATOS SEMILLA POR DEFECTO (DEFAULT SEEDS) ---
const DEFAULT_PHOTOS = [
  {
    id: 'photo-1',
    image: './fotos/atardecer.jpg',
    size: '60x60 cm',
    title: {
      es: 'Atardecer',
      en: 'Sunset',
      fr: 'Coucher de soleil',
      eu: 'Ilunabarra'
    },
    description: {
      es: 'Una evocadora instantánea capturada en las orillas del pantano de Garaio durante el cénit de una tarde estival. El agua actúa como espejo perfecto para la degradación de tonos cálidos y fríos en el cielo.',
      en: 'An evocative snapshot captured on the shores of the Garaio reservoir during the peak of a summer afternoon. The water acts as a perfect mirror for the warm and cool tones of the sky.',
      fr: "Un cliché évocateur capturé sur les rives du réservoir de Garaio au plus fort d'un après-midi d'été. L'eau sert de miroir parfait aux tons chauds et froids du ciel.",
      eu: 'Uda arratsalde bateko une oroigarria, Garaioko urtegiaren ertzean aterata. Urak ispilu ezin hobe gisa balio du zeruko tonu bero eta hotzen trantsiziorako.'
    },
    other: {
      es: 'Presentada al concurso de fotografía local, obteniendo la segunda posición.',
      en: 'Presented at the local photography contest, obtaining second place.',
      fr: 'Présenté au concours de photographie local, obtenant la deuxième place.',
      eu: 'Tokiko argazki lehiaketan aurkeztua, bigarren postua lortuz.'
    }
  },
  {
    id: 'photo-2',
    image: './fotos/paisaje.jpg',
    size: '60x60 cm',
    title: {
      es: 'Paisaje',
      en: 'Landscape',
      fr: 'Paysage',
      eu: 'Paisaia'
    },
    description: {
      es: 'Fotografía de gran formato capturada en la cima del monte de Mondragón. La composición destaca las texturas agrestes del terreno en primer plano que contrastan con la majestuosidad de la cordillera lejana envuelta en bruma.',
      en: 'Large-format photograph captured at the summit of Mount Mondragón. The composition highlights the rugged textures of the foreground contrasting with the majesty of the distant mountain range shrouded in mist.',
      fr: 'Photographie grand format capturée au sommet du mont Mondragón. La composition met en valeur les textures sauvages du premier plan, contrastant avec la majesté de la chaîne de montagnes lointaine enveloppée de brume.',
      eu: 'Formatu handiko argazkia, Arrasateko mendi gailurrean ateratakoa. Konposizioak lehen planoko lur malkartsuaren testurak nabarmentzen ditu, lanbrotutako urrutiko mendilerro bikainarekin kontrastean.'
    },
    other: {
      es: 'Presentada al concurso nacional de fotografía de montaña, obteniendo la segunda posición.',
      en: 'Presented at the national mountain photography contest, obtaining second place.',
      fr: 'Présenté au concours national de photographie de montagne, obtenant la deuxième place.',
      eu: 'Mendi argazkilaritzako lehiaketa nazionalean aurkeztua, bigarren postua lortuz.'
    }
  },
  {
    id: 'photo-3',
    image: './fotos/rocio.jpg',
    size: '60x60 cm',
    title: {
      es: 'Rocío',
      en: 'Dew',
      fr: 'Rosée',
      eu: 'Ihintza'
    },
    description: {
      es: 'Una toma macro de una fría mañana donde la condensación del rocío se posa meticulosamente sobre los nervios de las hojas más pequeñas, capturando la fragilidad del ecosistema matinal.',
      en: 'A macro shot from a cold morning where dew condensation meticulously rests on the veins of the smallest leaves, capturing the fragility of the morning ecosystem.',
      fr: "Un plan macro d'une matinée fraîche où la condensation de la rosée repose méticuleusement sur les nervures des plus petites feuilles, capturant la fragilité de l'écosystème matinal.",
      eu: 'Makro argazkia goiz hotz batean, non ihintza hosto txikienen nerbioetan metatzen den arreta handiz, goizeko ekosistemaren hauskortasuna harrapatuz.'
    },
    other: {
      es: 'Presentada al certamen de macrofotografía de naturaleza, obteniendo la segunda posición.',
      en: 'Presented at the nature macro photography contest, obtaining second place.',
      fr: 'Présenté au concours de macro-photographie de nature, obtenant la deuxième place.',
      eu: 'Naturako makro-argazkilaritza lehiaketan aurkeztua, bigarren postua lortuz.'
    }
  }
];

const DEFAULT_PAINTINGS = [
  {
    id: 'paint-1',
    image: './cuadros/anochecer.jpg',
    size: '60x60 cm',
    title: {
      es: 'Anochecer',
      en: 'Dusk',
      fr: 'Crépuscule',
      eu: 'Iluntzea'
    },
    description: {
      es: 'Una expresiva obra pictórica en acrílico que explora el paso de la luz diurna a la noche profunda. Inspirado y reinterpretado a partir de un estudio clásico de contrastes de color en el firmamento.',
      en: 'An expressive acrylic painting exploring the transition from daylight to deep night. Inspired and reinterpreted from a classic color contrast study of the sky.',
      fr: 'Une peinture acrylique expressive explorant le passage de la lumière du jour à la nuit profonde. Inspiré et réinterprété d\'après une étude classique des contrastes de couleurs dans le ciel.',
      eu: 'Akriliko bidezko margolan adierazgarria, eguneko argitik gau ilunerako igarobidea arakatzen duena. Zeruko kolore-kontrasteei buruzko azterketa klasiko batean inspiratua.'
    },
    technique: {
      es: 'Acrílico sobre lienzo',
      en: 'Acrylic on canvas',
      fr: 'Acrylique sur toile',
      eu: 'Akrilikoa mihise gainean'
    }
  },
  {
    id: 'paint-2',
    image: './cuadros/jilguero.jpg',
    size: '60x60 cm',
    title: {
      es: 'Jilguero',
      en: 'Goldfinch',
      fr: 'Chardonneret',
      eu: 'Karnaba'
    },
    description: {
      es: 'Representación naturalista de un colorido jilguero posado pacíficamente sobre una rama. El cuadro combina pinceladas sueltas para el follaje de fondo y un trabajo minucioso de detalle en el plumaje de la pequeña ave.',
      en: 'Naturalistic depiction of a colorful goldfinch peacefully perched on a branch. The painting combines loose brushstrokes for the background foliage and meticulous detail work on the small bird\'s plumage.',
      fr: 'Représentation naturaliste d\'un chardonneret coloré paisiblement perché sur une branche. La peinture combine des coups de pinceau amples pour le feuillage d\'arrière-plan et un travail méticuleux sur le plumage du petit oiseau.',
      eu: 'Adar batean bakean pausatutako karnaba koloretsu baten irudikapen naturalista. Margolanak pintzelada askeak uztartzen ditu atzeko hostoetarako eta xehetasun-lan zorrotza txori txikiaren lumajean.'
    },
    technique: {
      es: 'Acrílico sobre lienzo',
      en: 'Acrylic on canvas',
      fr: 'Acrylique sur toile',
      eu: 'Akrilikoa mihise gainean'
    }
  },
  {
    id: 'paint-3',
    image: './cuadros/lirio_azul.jpg',
    size: '60x60 cm',
    title: {
      es: 'Lirio azul',
      en: 'Blue Lily',
      fr: 'Iris bleu',
      eu: 'Lirio urdina'
    },
    description: {
      es: 'Estudio de detalle y composición botánica centrado en las geometrías y los intensos pigmentos de un lirio azul silvestre. Las transiciones de color azul cobalto y violeta dan vida a los pétalos.',
      en: 'Botanical detail and composition study focused on the geometries and intense pigments of a wild blue lily. Transitions of cobalt blue and violet bring the petals to life.',
      fr: 'Étude botanique de détail et de composition axée sur les géométries et les pigments intenses d\'un iris bleu sauvage. Les transitions de bleu cobalt et de violet donnent vie aux pétales.',
      eu: 'Lirio urdin basati baten geometria eta pigmentu bizietan zentratutako xehetasun eta konposizio botanikoaren azterketa. Kobalto urdina eta bioleta trantsizioek hostoak biziarazten dituzte.'
    },
    technique: {
      es: 'Acrílico sobre lienzo',
      en: 'Acrylic on canvas',
      fr: 'Acrylique sur toile',
      eu: 'Akrilikoa mihise gainean'
    }
  },
  {
    id: 'paint-4',
    image: './cuadros/nenufar.jpg',
    size: '60x60 cm',
    title: {
      es: 'Nenúfar',
      en: 'Water Lily',
      fr: 'Nénuphar',
      eu: 'Nenufarra'
    },
    description: {
      es: 'Composición impresionista que retrata un nenúfar en flor flotando sobre la superficie quieta de un estanque. La atención se centra en los reflejos del cielo y la vegetación acuática circundante.',
      en: 'Impressionistic composition depicting a blooming water lily floating on the still surface of a pond. The focus is on the reflections of the sky and the surrounding aquatic vegetation.',
      fr: 'Composition impressionniste dépeignant un nénuphar en fleurs flottant sur la surface calme d\'un étang. L\'accent est mis sur les reflets du ciel et la végétation aquatique environnante.',
      eu: 'Urmael bateko ur geldien gainean flotatzen ari den loredun nenufar bat irudikatzen duen konposizio inpresionista. Zeruko hausnarketan eta inguruko landaredi uretarrean jartzen da arreta.'
    },
    technique: {
      es: 'Acrílico sobre lienzo',
      en: 'Acrylic on canvas',
      fr: 'Acrylique sur toile',
      eu: 'Akrilikoa mihise gainean'
    }
  },
  {
    id: 'paint-5',
    image: './cuadros/rosa.jpg',
    size: '60x60 cm',
    title: {
      es: 'Rosa',
      en: 'Rose',
      fr: 'Rose',
      eu: 'Arrosa'
    },
    description: {
      es: 'Una pintura íntima centradada en el corazón de una rosa roja en plena apertura. Mediante capas sutiles de acrílico se consigue una profundidad de volumen que evoca el tacto sedoso y aterciopelado de sus pétalos.',
      en: 'An intimate painting focused on the heart of a blooming red rose. Through subtle layers of acrylic, a depth of volume is achieved that evokes the silky and velvety touch of its petals.',
      fr: 'Une peinture intime centrée sur le cœur d\'une rose rouge en pleine floraison. Grâce à de subtiles couches d\'acrylique, on obtient une profondeur de volume qui évoque le toucher soyeux et velouté de ses pétales.',
      eu: 'Lore gorri baten bihotzean zentratutako margolan intimoa. Akriliko geruza sotilen bidez, bere petaloen ukitu zetazko eta belusezkoa gogorarazten duen bolumen sakonera lortzen da.'
    },
    technique: {
      es: 'Acrílico sobre lienzo',
      en: 'Acrylic on canvas',
      fr: 'Acrylique sur toile',
      eu: 'Akrilikoa mihise gainean'
    }
  }
];

const DEFAULT_DRAWINGS = [
  {
    id: 'drawing-1',
    image: './dibujos/estudio_carboncillo.svg',
    size: '40x50 cm',
    title: {
      es: 'Estudio Botánico',
      en: 'Botanical Study',
      fr: 'Étude Botanique',
      eu: 'Ikerketa Botanikoa'
    },
    description: {
      es: 'Estudio minucioso a carboncillo sobre papel verjurado que explora los contrastes de luz y sombra en la estructura orgánica de las hojas y tallos.',
      en: 'Meticulous charcoal study on laid paper exploring light and shadow contrasts in the organic structure of leaves and stems.',
      fr: "Étude minutieuse au fusain sur papier vergé explorant les contrastes d'ombre et de lumière dans la structure organique des feuilles et des tiges.",
      eu: 'Karbonzilloz egindako ikerketa zorrotza paper marradun gainean, hosto eta zurtoinen egitura organikoan argi-itzalen kontrasteak arakatuz.'
    },
    technique: {
      es: 'Carboncillo sobre papel verjurado',
      en: 'Charcoal on laid paper',
      fr: 'Fusain sur papier vergé',
      eu: 'Karbonzilloa paper marradun gainean'
    }
  },
  {
    id: 'drawing-2',
    image: './dibujos/manos_grafito.svg',
    size: '30x42 cm',
    title: {
      es: 'Estudio de Manos',
      en: 'Study of Hands',
      fr: 'Étude de Mains',
      eu: 'Eskuen Ikerketa'
    },
    description: {
      es: 'Boceto anatómico elaborado con lápices de grafito de distintas durezas y difumino, buscando la delicadeza del gesto y la tridimensionalidad.',
      en: 'Anatomical sketch created with graphite pencils of varied hardness and blending stumps, seeking the subtlety of gesture and three-dimensionality.',
      fr: "Croquis anatomique réalisé aux crayons graphite de différentes duretés et à l'estompe, recherchant la délicatesse du geste et la tridimensionnalité.",
      eu: 'Marrazki anatomikoa gogortasun desberdineko grafito-lapitzekin eta difuminoarekin egina, keinuaren fintasuna eta hiru dimentsiotasuna bilatuz.'
    },
    technique: {
      es: 'Grafito y difumino sobre lámina',
      en: 'Graphite and stump on archival sheet',
      fr: "Graphite et estompe sur papier d'art",
      eu: 'Grafitoa eta difuminoa orri gainean'
    }
  },
  {
    id: 'drawing-3',
    image: './dibujos/fauna_sanguina.svg',
    size: '50x70 cm',
    title: {
      es: 'Fauna Ibérica',
      en: 'Iberian Wildlife',
      fr: 'Faune Ibérique',
      eu: 'Iberiar Fauna'
    },
    description: {
      es: 'Captura expresiva de la mirada y el porte de la fauna autóctona combinando la calidez terrosa de la sanguina con la firmeza del trazo a tinta.',
      en: 'Expressive capture of the gaze and posture of native wildlife, combining the earthy warmth of sanguine chalk with decisive ink strokes.',
      fr: 'Capture expressive du regard et de la posture de la faune indigène, combinant la chaleur terreuse de la sanguine avec la fermeté du trait à l\'encre.',
      eu: 'Bertako faunaren begiradaren eta dotoreziaren harrapaketa adierazkorra, sanguina lur-koloreko berotasuna eta tintazko trazu sendoa uztartuz.'
    },
    technique: {
      es: 'Tinta china y sanguina sobre papel artesanal',
      en: 'India ink and sanguine on handmade paper',
      fr: 'Encre de Chine et sanguine sur papier artisanal',
      eu: 'Txinatar tinta eta sanguina eskuz egindako paper gainean'
    }
  }
];

// --- PERFIL DE LA ARTISTA POR DEFECTO ---
const DEFAULT_PROFILE = {
  name: 'Rosa Martín',
  subtitle: {
    es: 'Arte & Fotografía',
    en: 'Art & Photography',
    fr: 'Art & Photographie',
    eu: 'Artea eta Argazkilaritza'
  },
  photo: '',
  bioLead: {
    es: 'Mi viaje artístico es una búsqueda constante de la belleza en las pequeñas cosas. Entiendo el arte como una ventana abierta a la contemplación y a la emoción más sincera.',
    en: 'My artistic journey is a constant search for beauty in the small things. I understand art as an open window to contemplation and the most sincere emotion.',
    fr: "Mon voyage artistique est une quête constante de beauté dans les petites choses. Je conçois l'art comme une fenêtre ouverte sur la contemplation et l'émotion la plus sincère.",
    eu: 'Nire bidaia artistikoa gauza txikietan edertasunaren etengabeko bilaketa da. Artea hausnarketarako eta emoziorik zintzoenerako leiho ireki gisa ulertzen dut.'
  },
  bio2: {
    es: 'Desde muy joven me sentí atraída tanto por el lenguaje plástico del pincel como por la inmediatez del objetivo fotográfico. En la pintura encuentro un espacio de meditación donde puedo jugar con las texturas del acrílico, creando volúmenes y matices que van desde paisajes oníricos hasta detalladas flores y aves.',
    en: 'From an early age, I was drawn to both the plastic language of the brush and the immediacy of the camera lens. In painting, I find a meditative space where I can play with acrylic textures, creating volumes and nuances ranging from dreamlike landscapes to detailed flowers and birds.',
    fr: "Dès mon plus jeune âge, j'ai été attirée à la fois par le langage plastique du pinceau et par l'immédiateté de l'objectif photographique. Dans la peinture, je trouve un espace de méditation où je peux jouer avec les textures de l'acrylique, créant des volumes et des nuances allant de paysages oniriques à des fleurs et des oiseaux détaillés.",
    eu: 'Txikitatik erakarri ninduten bai pintzelaren lengoaia plastikoak, bai argazki-objektiboaren berehalakotasunak. Pinturan meditazio-espazio bat aurkitzen dut, non akrilikoaren ehundurekin jolastu ahal dudan, paisaia onirikoetatik hasi eta lore eta hegazti zehatzetaraino doazen bolumenak eta ñabardurak sortuz.'
  },
  bio3: {
    es: 'Paralelamente, la fotografía me permite conectar con el mundo exterior en tiempo real. Capturar el rocío matinal, el atardecer dorado de un pantano o la inmensidad de las cordilleras es mi manera de documentar y honrar los silencios de la naturaleza.',
    en: 'In parallel, photography allows me to connect with the outside world in real time. Capturing morning dew, the golden sunset of a reservoir, or the immensity of mountain ranges is my way of documenting and honoring the silences of nature.',
    fr: "Parallèlement, la photographie me permet de me connecter avec le monde extérieur en temps réel. Capturer la rosée matinale, le coucher de soleil doré sur un marais ou l'immensité des chaînes de montagnes est ma manière de documenter et d'honorer les silences de la nature.",
    eu: 'Paraleloki, argazkilaritzak kanpoko munduarekin denbora errealean konektatzea ahalbidetzen dit. Goizeko ihintza, urtegi baten urrezko ilunabarra edo mendikateen handitasuna harrapatzea da naturaren isiltasunak dokumentatzeko eta ohoratzeko nire modua.'
  },
  technique: {
    es: 'Acrílico sobre lienzo',
    en: 'Acrylic on canvas',
    fr: 'Acrylique sur toile',
    eu: 'Akrilikoa mihise gainean'
  },
  focus: {
    es: 'Naturaleza, luz natural y macro',
    en: 'Nature, natural light and macro',
    fr: 'Nature, lumière naturelle et macro',
    eu: 'Natura, argi naturala eta makroa'
  },
  location: {
    es: 'País Vasco, España',
    en: 'Basque Country, Spain',
    fr: 'Pays Basque, Espagne',
    eu: 'Euskal Herria, Espainia'
  }
};

// --- ARRAYS Y MODELOS DINÁMICOS DE LA APLICACIÓN ---
let photographs = [];
let paintings = [];
let drawings = [];
let artistProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));

// --- GESTIÓN DE PERSISTENCIA (LOCALSTORAGE) ---
function loadArtworkData() {
  try {
    const storedPhotos = localStorage.getItem('custom_photos');
    if (storedPhotos) {
      photographs = JSON.parse(storedPhotos);
    } else {
      photographs = [...DEFAULT_PHOTOS];
      localStorage.setItem('custom_photos', JSON.stringify(photographs));
    }
  } catch (e) {
    console.warn('No se pudo acceder a custom_photos en localStorage, usando valores por defecto:', e);
    photographs = [...DEFAULT_PHOTOS];
  }

  try {
    const storedPaintings = localStorage.getItem('custom_paintings');
    if (storedPaintings) {
      paintings = JSON.parse(storedPaintings);
    } else {
      paintings = [...DEFAULT_PAINTINGS];
      localStorage.setItem('custom_paintings', JSON.stringify(paintings));
    }
  } catch (e) {
    console.warn('No se pudo acceder a custom_paintings en localStorage, usando valores por defecto:', e);
    paintings = [...DEFAULT_PAINTINGS];
  }

  try {
    const storedDrawings = localStorage.getItem('custom_drawings');
    if (storedDrawings) {
      drawings = JSON.parse(storedDrawings);
    } else {
      drawings = [...DEFAULT_DRAWINGS];
      localStorage.setItem('custom_drawings', JSON.stringify(drawings));
    }
  } catch (e) {
    console.warn('No se pudo acceder a custom_drawings en localStorage, usando valores por defecto:', e);
    drawings = [...DEFAULT_DRAWINGS];
  }

  try {
    const storedProfile = localStorage.getItem('artist_profile');
    if (storedProfile) {
      artistProfile = { ...DEFAULT_PROFILE, ...JSON.parse(storedProfile) };
    } else {
      artistProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem('artist_profile', JSON.stringify(artistProfile));
    }
  } catch (e) {
    console.warn('No se pudo acceder a artist_profile en localStorage, usando valores por defecto:', e);
    artistProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
  }
}

function saveArtistProfile() {
  try {
    localStorage.setItem('artist_profile', JSON.stringify(artistProfile));
  } catch (e) {
    console.error('Error al guardar artist_profile en localStorage:', e);
  }
}

function saveArtworkData(type) {
  try {
    if (type === 'photo' || type === 'all') {
      localStorage.setItem('custom_photos', JSON.stringify(photographs));
    }
    if (type === 'paint' || type === 'all') {
      localStorage.setItem('custom_paintings', JSON.stringify(paintings));
    }
    if (type === 'drawing' || type === 'all') {
      localStorage.setItem('custom_drawings', JSON.stringify(drawings));
    }
  } catch (e) {
    console.error('Error guardando en localStorage (¿cuota excedida?):', e);
    showFormFeedback(
      uiTranslations[currentLang]['gestion.errorStorage'] || 'Error al guardar en el almacenamiento local.',
      'error'
    );
  }
}

// --- DICCIONARIO DE TRADUCCIONES DE LA INTERFAZ (UI) ---
const uiTranslations = {
  es: {
    'head.title': 'Rosa Martín | Galería de Arte y Fotografía',
    'sidebar.subtitle': 'Arte & Fotografía',
    'nav.inicio': 'Inicio',
    'nav.sobreMi': 'Sobre mí',
    'nav.fotografias': 'Fotografías',
    'nav.cuadros': 'Cuadros',
    'nav.dibujos': 'Dibujos',
    'nav.gestion': 'Gestión',
    'hero.pretitle': 'Bienvenidos',
    'hero.title': 'Explorando el mundo a través del lienzo y el visor',
    'hero.lead': 'Una muestra personal donde el arte clásico del acrílico se funde con la espontaneidad y la belleza de la fotografía artística.',
    'hero.btnPrimary': 'Ver Óleos y Acrílicos',
    'hero.btnSecondary': 'Explorar Galería de Fotos',
    'hero.btnDrawings': 'Ver Dibujos y Bocetos',
    'features.paint.title': 'Pinturas y Cuadros',
    'features.paint.desc': 'Creaciones en acrílico que reflejan la pasión por el color, la textura y las formas inspiradas en la naturaleza. Cada obra cuenta una historia íntima plasmada en lienzo.',
    'features.photo.title': 'Fotografía de Concurso',
    'features.photo.desc': 'Instantes congelados en el tiempo. Fotografías cuidadosamente seleccionadas y presentadas a certámenes locales y nacionales, buscando siempre la luz perfecta y la emoción oculta.',
    'features.drawing.title': 'Dibujos y Bocetos',
    'features.drawing.desc': 'Estudios meticulosos a carboncillo, grafito y tinta. Trazos que exploran la luz, la sombra y la expresividad del gesto a través de la sencillez del papel.',
    'about.badge': 'Trayectoria',
    'about.title': 'Sobre Rosa Martín',
    'about.p1': 'Mi viaje artístico es una búsqueda constante de la belleza en las pequeñas cosas. Entiendo el arte como una ventana abierta a la contemplación y a la emoción más sincera.',
    'about.p2': 'Desde muy joven me sentí atraída tanto por el lenguaje plástico del pincel como por la inmediatez del objetivo fotográfico. En la pintura encuentro un espacio de meditación donde puedo jugar con las texturas del acrílico, creando volúmenes y matices que van desde paisajes oníricos hasta detalladas flores y aves.',
    'about.p3': 'Paralelamente, la fotografía me permite conectar con el mundo exterior en tiempo real. Capturar el rocío matinal, el atardecer dorado de un pantano o la inmensidad de las cordilleras es mi manera de documentar y honrar los silencios de la naturaleza.',
    'about.detail1.label': 'Técnica predilecta',
    'about.detail1.val': 'Acrílico sobre lienzo',
    'about.detail2.label': 'Enfoque fotográfico',
    'about.detail2.val': 'Naturaleza, luz natural y macro',
    'about.detail3.label': 'Ubicación',
    'about.detail3.val': 'País Vasco, España',
    'photos.badge': 'Concursos y Selección',
    'photos.title': 'Fotografías Destacadas',
    'photos.subtitle': 'Instantes capturados en entornos naturales, presentados y reconocidos en certámenes fotográficos.',
    'paintings.badge': 'Galería de Óleos & Acrílicos',
    'paintings.title': 'Obra Pictórica',
    'paintings.subtitle': 'Una selección de obras pintadas a mano, explorando la riqueza del acrílico y la expresividad del pincel.',
    'drawings.badge': 'Carboncillo, Grafito & Tinta',
    'drawings.title': 'Dibujos y Bocetos',
    'drawings.subtitle': 'Exploración de la forma, el claroscuro y la pureza del trazo en papel.',
    // Gestión & Modo Dual
    'gestion.badge': 'Administración',
    'gestion.title': 'Gestión de Obras',
    'gestion.subtitle': 'Añade nuevas obras (fotografías, cuadros o dibujos) al portafolio y administra el catálogo existente.',
    'gestion.formTitle': 'Añadir Nueva Obra',
    'gestion.formEditTitle': 'Editar Obra',
    'gestion.modeCreate': 'Añadiendo nueva obra',
    'gestion.modeEdit': 'Editando obra',
    'gestion.typeLabel': 'Tipo de Obra',
    'gestion.typePaint': 'Cuadro / Pintura',
    'gestion.typeDrawing': 'Dibujo',
    'gestion.typePhoto': 'Fotografía',
    'gestion.inputTitle': 'Título de la obra *',
    'gestion.inputSize': 'Medidas / Formato *',
    'gestion.inputTechnique': 'Técnica *',
    'gestion.inputOther': 'Concurso / Notas *',
    'gestion.inputDesc': 'Descripción de la obra *',
    'gestion.imageLabel': 'Fotografía o Imagen de la Obra *',
    'gestion.dropzoneTitle': 'Haz clic o arrastra una imagen aquí',
    'gestion.dropzoneHint': 'PNG, JPG, WEBP recomendados',
    'gestion.removeImage': 'Eliminar imagen seleccionada',
    'gestion.btnSave': 'Guardar Obra',
    'gestion.btnCancel': 'Cancelar edición',
    'gestion.listTitle': 'Obras en el Catálogo',
    'gestion.thImage': 'Imagen',
    'gestion.thTitle': 'Título',
    'gestion.thType': 'Tipo',
    'gestion.thDetail': 'Técnica / Detalle',
    'gestion.thSize': 'Medidas',
    'gestion.thActions': 'Acción',
    'gestion.edit': 'Editar',
    'gestion.delete': 'Eliminar',
    'gestion.confirmDelete': '¿Estás seguro de que deseas eliminar esta obra del catálogo?',
    'gestion.successAdd': '¡Obra añadida con éxito al catálogo!',
    'gestion.successUpdate': '¡Obra actualizada con éxito en el catálogo!',
    'gestion.errorImage': 'Por favor, selecciona una imagen para la obra.',
    'gestion.errorRequired': 'Por favor, completa todos los campos obligatorios.',
    'gestion.emptyCatalog': 'No hay obras registradas en el catálogo.',
    'gestion.counterText': 'obras',
    'gestion.errorStorage': 'Error al guardar en el almacenamiento local.',
    // Asistente IA DeepSeek
    'gestion.btnAiDesc': 'Redactar descripción con DeepSeek',
    'gestion.aiBtnLoading': 'Analizando imagen y redactando con DeepSeek...',
    'gestion.apiKeyTooltip': 'Configurar API de DeepSeek',
    'gestion.apiKeyTitle': 'Configuración de DeepSeek API',
    'gestion.apiKeyHelp': 'Introduce tu clave de DeepSeek para redactar descripciones automáticas. Se guardará localmente en tu navegador.',
    'gestion.apiKeyLabel': 'API Key (sk-...):',
    'gestion.apiEndpointLabel': 'Endpoint / Proxy (opcional):',
    'gestion.btnSaveKey': 'Guardar',
    'gestion.apiKeySaved': 'Configuración de DeepSeek guardada correctamente.',
    'gestion.aiErrorNoImage': 'Primero debes seleccionar o cargar una imagen para que la IA pueda analizarla.',
    'gestion.aiErrorNoKey': 'Por favor, introduce tu DeepSeek API Key para poder generar la descripción.',
    'gestion.aiSuccess': '¡Descripción redactada con éxito con DeepSeek AI!',
    // Etiquetas de tarjetas/visor
    'card.photo': 'Fotografía',
    'card.paint': 'Pintura',
    'card.drawing': 'Dibujo',
    'lightbox.close': 'Cerrar',
    'lightbox.prev': 'Imagen anterior',
    'lightbox.next': 'Siguiente imagen',
    'lightbox.meta.contest': 'Detalle de Concurso',
    'lightbox.meta.technique': 'Técnica',
    'lightbox.meta.size': 'Medidas',
    'lightbox.meta.secondPlace': 'Segunda posición',
    'lightbox.photoTag': 'Fotografía',
    'lightbox.paintTag': 'Pintura Acrílica',
    'lightbox.drawingTag': 'Dibujo / Boceto',
    // Perfil y Sub-pestañas
    'about.titlePrefix': 'Sobre',
    'head.titleSuffix': 'Galería de Arte y Fotografía',
    'gestion.tabs.artworks': 'Gestión de Obras',
    'gestion.tabs.profile': 'Datos Personales / Perfil',
    'gestion.profile.title': 'Datos Personales y Biografía',
    'gestion.profile.badge': 'Perfil de la Artista',
    'gestion.profile.nameLabel': 'Nombre del artista *',
    'gestion.profile.subtitleLabel': 'Subtítulo / Oficio *',
    'gestion.profile.photoLabel': 'Fotografía de perfil / Retrato',
    'gestion.profile.photoHint': 'Sustituye el monograma de la sección "Sobre mí" por tu fotografía real.',
    'gestion.profile.dropzoneTitle': 'Haz clic o arrastra un retrato aquí',
    'gestion.profile.dropzoneHint': 'PNG, JPG, WEBP recomendados (orientación vertical)',
    'gestion.profile.bioLeadLabel': 'Biografía: Párrafo destacado (Lead) *',
    'gestion.profile.bio2Label': 'Biografía: Segundo párrafo (Pintura / Técnica) *',
    'gestion.profile.bio3Label': 'Biografía: Tercer párrafo (Fotografía / Inspiración) *',
    'gestion.profile.techniqueLabel': 'Técnica predilecta *',
    'gestion.profile.focusLabel': 'Enfoque fotográfico *',
    'gestion.profile.locationLabel': 'Ubicación *',
    'gestion.profile.btnSave': 'Guardar Datos Personales',
    'gestion.profile.btnReset': 'Restablecer valores por defecto',
    'gestion.profile.successSave': '¡Datos personales y biografía actualizados con éxito!',
    'gestion.profile.successReset': 'Se han restablecido los datos por defecto del perfil.',
    'gestion.profile.confirmReset': '¿Seguro que deseas restablecer los datos personales a los valores iniciales de Rosa Martín?',
    // Autenticación y Seguridad
    'auth.lockTooltip': 'Acceso de administración',
    'auth.modalTitle': 'Acceso de Administración',
    'auth.modalSubtitle': 'Introduce la contraseña de seguridad para gestionar el catálogo y tu perfil.',
    'auth.passwordLabel': 'Contraseña de administrador',
    'auth.passwordPlaceholder': 'Introduce la contraseña',
    'auth.togglePassword': 'Mostrar / Ocultar contraseña',
    'auth.btnLogin': 'Iniciar Sesión',
    'auth.btnCancel': 'Cancelar',
    'auth.btnLogout': 'Cerrar Sesión',
    'auth.errorIncorrectPassword': 'Contraseña incorrecta. Por favor, inténtalo de nuevo.',
    'auth.shortcutHint': 'Atajo rápido: Ctrl + Shift + A',
    'auth.close': 'Cerrar',
    // Filtros de Catálogo
    'gestion.filterAll': 'Todos',
    'gestion.filterPhotos': 'Fotografías',
    'gestion.filterPaintings': 'Cuadros',
    'gestion.filterDrawings': 'Dibujos',
    'gestion.emptyFilteredCatalog': 'No hay obras registradas en esta categoría.'
  },
  en: {
    'head.title': 'Rosa Martín | Art & Photography Gallery',
    'sidebar.subtitle': 'Art & Photography',
    'nav.inicio': 'Home',
    'nav.sobreMi': 'About me',
    'nav.fotografias': 'Photographs',
    'nav.cuadros': 'Paintings',
    'nav.dibujos': 'Drawings',
    'nav.gestion': 'Management',
    'hero.pretitle': 'Welcome',
    'hero.title': 'Exploring the world through canvas and viewfinder',
    'hero.lead': 'A personal showcase where the classic art of acrylic blends with the spontaneity and beauty of artistic photography.',
    'hero.btnPrimary': 'View Oils & Acrylics',
    'hero.btnSecondary': 'Explore Photo Gallery',
    'hero.btnDrawings': 'Explore Drawings & Sketches',
    'features.paint.title': 'Paintings & Canvases',
    'features.paint.desc': 'Acrylic creations reflecting a passion for color, texture, and shapes inspired by nature. Each piece tells an intimate story captured on canvas.',
    'features.photo.title': 'Contest Photography',
    'features.photo.desc': 'Instants frozen in time. Carefully selected photographs submitted to local and national exhibitions, always seeking the perfect light and hidden emotion.',
    'features.drawing.title': 'Drawings & Sketches',
    'features.drawing.desc': 'Meticulous charcoal, graphite, and ink studies. Lines exploring light, shadow, and expressiveness through the simplicity of paper.',
    'about.badge': 'Journey',
    'about.title': 'About Rosa Martín',
    'about.p1': 'My artistic journey is a constant search for beauty in the little things. I view art as an open window to contemplation and sincere emotion.',
    'about.p2': 'From a very young age, I was drawn to both the visual language of the brush and the immediacy of the lens. In painting, I find a space for meditation where I can play with acrylic textures, creating volumes and tones that range from dreamlike landscapes to detailed flowers and birds.',
    'about.p3': 'At the same time, photography allows me to connect with the external world in real time. Capturing the morning dew, the golden sunset of a lake, or the vastness of mountain ranges is my way of documenting and honoring nature\'s silence.',
    'about.detail1.label': 'Favored Technique',
    'about.detail1.val': 'Acrylic on canvas',
    'about.detail2.label': 'Photographic Focus',
    'about.detail2.val': 'Nature, natural light & macro',
    'about.detail3.label': 'Location',
    'about.detail3.val': 'Basque Country, Spain',
    'photos.badge': 'Contests & Selection',
    'photos.title': 'Featured Photographs',
    'photos.subtitle': 'Moments captured in natural environments, presented and recognized in photographic contests.',
    'paintings.badge': 'Oils & Acrylics Gallery',
    'paintings.title': 'Pictorial Work',
    'paintings.subtitle': 'A handpicked selection of hand-painted pieces, exploring the richness of acrylic and brush expressiveness.',
    'drawings.badge': 'Charcoal, Graphite & Ink',
    'drawings.title': 'Drawings & Sketches',
    'drawings.subtitle': 'Exploration of form, chiaroscuro, and the purity of line on paper.',
    // Gestión & Dual Mode
    'gestion.badge': 'Administration',
    'gestion.title': 'Artwork Management',
    'gestion.subtitle': 'Add new artworks (photographs, paintings, or drawings) to the portfolio and manage existing works.',
    'gestion.formTitle': 'Add New Artwork',
    'gestion.formEditTitle': 'Edit Artwork',
    'gestion.modeCreate': 'Adding new artwork',
    'gestion.modeEdit': 'Editing artwork',
    'gestion.typeLabel': 'Artwork Type',
    'gestion.typePaint': 'Painting / Canvas',
    'gestion.typeDrawing': 'Drawing',
    'gestion.typePhoto': 'Photograph',
    'gestion.inputTitle': 'Artwork Title *',
    'gestion.inputSize': 'Dimensions / Format *',
    'gestion.inputTechnique': 'Technique *',
    'gestion.inputOther': 'Contest / Notes *',
    'gestion.inputDesc': 'Artwork Description *',
    'gestion.imageLabel': 'Photograph or Artwork Image *',
    'gestion.dropzoneTitle': 'Click or drag an image here',
    'gestion.dropzoneHint': 'PNG, JPG, WEBP recommended',
    'gestion.removeImage': 'Remove selected image',
    'gestion.btnSave': 'Save Artwork',
    'gestion.btnCancel': 'Cancel edit',
    'gestion.listTitle': 'Artworks in Catalog',
    'gestion.thImage': 'Image',
    'gestion.thTitle': 'Title',
    'gestion.thType': 'Type',
    'gestion.thDetail': 'Technique / Detail',
    'gestion.thSize': 'Dimensions',
    'gestion.thActions': 'Action',
    'gestion.edit': 'Edit',
    'gestion.delete': 'Delete',
    'gestion.confirmDelete': 'Are you sure you want to remove this artwork from the catalog?',
    'gestion.successAdd': 'Artwork successfully added to the catalog!',
    'gestion.successUpdate': 'Artwork updated successfully in the catalog!',
    'gestion.errorImage': 'Please select an image for the artwork.',
    'gestion.errorRequired': 'Please fill in all required fields.',
    'gestion.emptyCatalog': 'No artworks currently registered in the catalog.',
    'gestion.counterText': 'artworks',
    'gestion.errorStorage': 'Error saving to local storage.',
    // DeepSeek AI Assistant
    'gestion.btnAiDesc': 'Write description with DeepSeek',
    'gestion.aiBtnLoading': 'Analyzing image and writing with DeepSeek...',
    'gestion.apiKeyTooltip': 'Configure DeepSeek API',
    'gestion.apiKeyTitle': 'DeepSeek API Setup',
    'gestion.apiKeyHelp': 'Enter your DeepSeek key for automatic descriptions. It will be stored locally in your browser.',
    'gestion.apiKeyLabel': 'API Key (sk-...):',
    'gestion.apiEndpointLabel': 'Endpoint / Proxy (optional):',
    'gestion.btnSaveKey': 'Save',
    'gestion.apiKeySaved': 'DeepSeek settings saved successfully.',
    'gestion.aiErrorNoImage': 'You must first select or load an image so the AI can analyze it.',
    'gestion.aiErrorNoKey': 'Please enter your DeepSeek API Key to generate the description.',
    'gestion.aiSuccess': 'Description generated successfully with DeepSeek AI!',
    // Cards / Lightbox
    'card.photo': 'Photograph',
    'card.paint': 'Painting',
    'card.drawing': 'Drawing',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous image',
    'lightbox.next': 'Next image',
    'lightbox.meta.contest': 'Contest Detail',
    'lightbox.meta.technique': 'Technique',
    'lightbox.meta.size': 'Dimensions',
    'lightbox.meta.secondPlace': 'Second place',
    'lightbox.photoTag': 'Photograph',
    'lightbox.paintTag': 'Acrylic Painting',
    'lightbox.drawingTag': 'Drawing / Sketch',
    // Profile and Sub-tabs
    'about.titlePrefix': 'About',
    'head.titleSuffix': 'Art & Photography Gallery',
    'gestion.tabs.artworks': 'Artwork Management',
    'gestion.tabs.profile': 'Personal Details / Profile',
    'gestion.profile.title': 'Personal Details & Biography',
    'gestion.profile.badge': 'Artist Profile',
    'gestion.profile.nameLabel': 'Artist Name *',
    'gestion.profile.subtitleLabel': 'Subtitle / Profession *',
    'gestion.profile.photoLabel': 'Profile Photo / Portrait',
    'gestion.profile.photoHint': 'Replaces the monogram in "About Me" with your real photo.',
    'gestion.profile.dropzoneTitle': 'Click or drag a portrait here',
    'gestion.profile.dropzoneHint': 'PNG, JPG, WEBP recommended (portrait orientation)',
    'gestion.profile.bioLeadLabel': 'Biography: Lead Paragraph *',
    'gestion.profile.bio2Label': 'Biography: Second Paragraph (Painting / Technique) *',
    'gestion.profile.bio3Label': 'Biography: Third Paragraph (Photography / Inspiration) *',
    'gestion.profile.techniqueLabel': 'Preferred Technique *',
    'gestion.profile.focusLabel': 'Photographic Focus *',
    'gestion.profile.locationLabel': 'Location *',
    'gestion.profile.btnSave': 'Save Personal Details',
    'gestion.profile.btnReset': 'Reset to Defaults',
    'gestion.profile.successSave': 'Personal details and biography updated successfully!',
    'gestion.profile.successReset': 'Default profile details have been restored.',
    'gestion.profile.confirmReset': 'Are you sure you want to reset personal details to default values?',
    // Authentication and Security
    'auth.lockTooltip': 'Administrator access',
    'auth.modalTitle': 'Administrator Access',
    'auth.modalSubtitle': 'Enter the security password to manage the catalog and your profile.',
    'auth.passwordLabel': 'Administrator password',
    'auth.passwordPlaceholder': 'Enter password',
    'auth.togglePassword': 'Show / Hide password',
    'auth.btnLogin': 'Log In',
    'auth.btnCancel': 'Cancel',
    'auth.btnLogout': 'Log Out',
    'auth.errorIncorrectPassword': 'Incorrect password. Please try again.',
    'auth.shortcutHint': 'Quick shortcut: Ctrl + Shift + A',
    'auth.close': 'Close',
    // Catalog Filters
    'gestion.filterAll': 'All',
    'gestion.filterPhotos': 'Photographs',
    'gestion.filterPaintings': 'Paintings',
    'gestion.filterDrawings': 'Drawings',
    'gestion.emptyFilteredCatalog': 'No artworks registered in this category.'
  },
  fr: {
    'head.title': "Rosa Martín | Galerie d'Art & Photographie",
    'sidebar.subtitle': 'Art & Photographie',
    'nav.inicio': 'Accueil',
    'nav.sobreMi': 'À propos',
    'nav.fotografias': 'Photographies',
    'nav.cuadros': 'Tableaux',
    'nav.dibujos': 'Dessins',
    'nav.gestion': 'Gestion',
    'hero.pretitle': 'Bienvenue',
    'hero.title': 'Explorer le monde à travers la toile et le viseur',
    'hero.lead': "Une exposition personnelle où l'art classique de l'acrylique se mêle à la spontanéité et la beauté de la photographie artistique.",
    'hero.btnPrimary': 'Voir les Huiles & Acryliques',
    'hero.btnSecondary': 'Explorer la Galerie Photo',
    'hero.btnDrawings': 'Voir Dessins et Croquis',
    'features.paint.title': 'Peintures & Tableaux',
    'features.paint.desc': "Des créations à l'acrylique qui reflètent la passion pour la couleur, la texture et les formes inspirées de la nature. Chaque œuvre raconte une histoire intime sur toile.",
    'features.photo.title': 'Photographie de Concours',
    'features.photo.desc': "Des instants figés dans le temps. Photographies soigneusement sélectionnées et présentées à des concours locaux et nationaux, recherchant toujours la lumière idéale et l'émotion cachée.",
    'features.drawing.title': 'Dessins & Croquis',
    'features.drawing.desc': "Études minutieuses au fusain, graphite et encre. Des traits explorant la lumière, l'ombre et l'expressivité du geste à travers la simplicité du papier.",
    'about.badge': 'Parcours',
    'about.title': 'À propos de Rosa Martín',
    'about.p1': "Mon voyage artistique est une recherche constante de beauté dans les petites choses. Je conçois l'art comme une fenêtre ouverte sur la contemplation et l'émotion sincère.",
    'about.p2': "Dès mon plus jeune âge, j'ai été attirée par le langage plastique du pinceau et par l'instantanéité de l'appareil photo. Dans la peinture, je trouve un espace de méditation où je peux jouer avec les textures de l'acrylique, créant des volumes allant de paysages oniriques à des fleurs et des oiseaux détaillés.",
    'about.p3': "En parallèle, la photographie me permet de me connecter au monde extérieur en temps réel. Saisir la rosée du matin, le coucher de soleil doré d'un étang ou l'immensité des montagnes est ma façon de documenter et d'honorer les silences de la nature.",
    'about.detail1.label': 'Technique de prédilection',
    'about.detail1.val': 'Acrylique sur toile',
    'about.detail2.label': 'Approche photographique',
    'about.detail2.val': 'Nature, lumière naturelle & macro',
    'about.detail3.label': 'Localisation',
    'about.detail3.val': 'Pays Basque, Espagne',
    'photos.badge': 'Concours & Sélection',
    'photos.title': 'Photographies Vedettes',
    'photos.subtitle': 'Des instants capturés dans des environnements naturels, présentés et récompensés dans des concours de photographie.',
    'paintings.badge': "Galerie d'Huiles & Acryliques",
    'paintings.title': 'Œuvre Picturale',
    'paintings.subtitle': "Une sélection d'œuvres peintes à la main, explorant la richesse de l'acrylique et la force expressive du pinceau.",
    'drawings.badge': 'Fusain, Graphite & Encre',
    'drawings.title': 'Dessins et Croquis',
    'drawings.subtitle': 'Exploration de la forme, du clair-obscur et de la pureté du trait sur papier.',
    // Gestión & Dual Mode
    'gestion.badge': 'Administration',
    'gestion.title': 'Gestion des Œuvres',
    'gestion.subtitle': 'Ajoutez de nouvelles œuvres (photographies, peintures ou dessins) au portfolio et gérez les œuvres existantes.',
    'gestion.formTitle': 'Ajouter une Nouvelle Œuvre',
    'gestion.formEditTitle': 'Modifier l\'Œuvre',
    'gestion.modeCreate': 'Ajout d\'une nouvelle œuvre',
    'gestion.modeEdit': 'Modification de l\'œuvre',
    'gestion.typeLabel': "Type d'Œuvre",
    'gestion.typePaint': 'Tableau / Peinture',
    'gestion.typeDrawing': 'Dessin',
    'gestion.typePhoto': 'Photographie',
    'gestion.inputTitle': "Titre de l'œuvre *",
    'gestion.inputSize': 'Dimensions / Format *',
    'gestion.inputTechnique': 'Technique *',
    'gestion.inputOther': 'Concours / Notes *',
    'gestion.inputDesc': "Description de l'œuvre *",
    'gestion.imageLabel': "Photographie ou Image de l'Œuvre *",
    'gestion.dropzoneTitle': 'Cliquez ou glissez une image ici',
    'gestion.dropzoneHint': 'PNG, JPG, WEBP recommandés',
    'gestion.removeImage': "Supprimer l'image sélectionnée",
    'gestion.btnSave': 'Enregistrer l\'Œuvre',
    'gestion.btnCancel': 'Annuler la modification',
    'gestion.listTitle': 'Œuvres au Catalogue',
    'gestion.thImage': 'Image',
    'gestion.thTitle': 'Titre',
    'gestion.thType': 'Type',
    'gestion.thDetail': 'Technique / Détail',
    'gestion.thSize': 'Dimensions',
    'gestion.thActions': 'Action',
    'gestion.edit': 'Modifier',
    'gestion.delete': 'Supprimer',
    'gestion.confirmDelete': 'Êtes-vous sûr de vouloir supprimer cette œuvre du catalogue ?',
    'gestion.successAdd': 'Œuvre ajoutée avec succès au catalogue !',
    'gestion.successUpdate': 'Œuvre mise à jour avec succès dans le catalogue !',
    'gestion.errorImage': "Veuillez sélectionner une image pour l'œuvre.",
    'gestion.errorRequired': 'Veuillez remplir tous les champs obligatoires.',
    'gestion.emptyCatalog': "Aucune œuvre n'est actuellement enregistrée dans le catalogue.",
    'gestion.counterText': 'œuvres',
    'gestion.errorStorage': "Erreur lors de l'enregistrement dans le stockage local.",
    // Assistant IA DeepSeek
    'gestion.btnAiDesc': 'Rédiger la description avec DeepSeek',
    'gestion.aiBtnLoading': 'Analyse de l\'image et rédaction avec DeepSeek...',
    'gestion.apiKeyTooltip': 'Configurer l\'API DeepSeek',
    'gestion.apiKeyTitle': 'Configuration de l\'API DeepSeek',
    'gestion.apiKeyHelp': 'Entrez votre clé DeepSeek pour les descriptions automatiques. Elle sera enregistrée localement dans votre navigateur.',
    'gestion.apiKeyLabel': 'Clé API (sk-...) :',
    'gestion.apiEndpointLabel': 'Point de terminaison / Proxy (optionnel) :',
    'gestion.btnSaveKey': 'Enregistrer',
    'gestion.apiKeySaved': 'Configuration DeepSeek enregistrée avec succès.',
    'gestion.aiErrorNoImage': 'Vous devez d\'abord sélectionner ou charger une image pour que l\'IA puisse l\'analyser.',
    'gestion.aiErrorNoKey': 'Veuillez saisir votre clé API DeepSeek pour générer la description.',
    'gestion.aiSuccess': 'Description rédigée avec succès avec DeepSeek AI !',
    // Cards / Lightbox
    'card.photo': 'Photographie',
    'card.paint': 'Peinture',
    'card.drawing': 'Dessin',
    'lightbox.close': 'Fermer',
    'lightbox.prev': 'Image précédente',
    'lightbox.next': 'Image suivante',
    'lightbox.meta.contest': 'Détail du Concours',
    'lightbox.meta.technique': 'Technique',
    'lightbox.meta.size': 'Dimensions',
    'lightbox.meta.secondPlace': 'Deuxième place',
    'lightbox.photoTag': 'Photographie',
    'lightbox.paintTag': 'Peinture Acrylique',
    'lightbox.drawingTag': 'Dessin / Croquis',
    // Profil et Sous-onglets
    'about.titlePrefix': 'À propos de',
    'head.titleSuffix': "Galerie d'Art et Photographie",
    'gestion.tabs.artworks': 'Gestion des Œuvres',
    'gestion.tabs.profile': 'Données Personnelles / Profil',
    'gestion.profile.title': 'Données Personnelles & Biographie',
    'gestion.profile.badge': "Profil de l'Artiste",
    'gestion.profile.nameLabel': "Nom de l'artiste *",
    'gestion.profile.subtitleLabel': 'Sous-titre / Profession *',
    'gestion.profile.photoLabel': 'Photo de profil / Portrait',
    'gestion.profile.photoHint': "Remplace le monogramme de la section « À propos de moi » par votre vraie photo.",
    'gestion.profile.dropzoneTitle': 'Cliquez ou glissez un portrait ici',
    'gestion.profile.dropzoneHint': 'PNG, JPG, WEBP recommandés (orientation portrait)',
    'gestion.profile.bioLeadLabel': "Biographie : Paragraphe d'accroche (Lead) *",
    'gestion.profile.bio2Label': 'Biographie : Deuxième paragraphe (Peinture / Technique) *',
    'gestion.profile.bio3Label': 'Biographie : Troisième paragraphe (Photographie / Inspiration) *',
    'gestion.profile.techniqueLabel': 'Technique préférée *',
    'gestion.profile.focusLabel': 'Approche photographique *',
    'gestion.profile.locationLabel': 'Emplacement *',
    'gestion.profile.btnSave': 'Enregistrer les Données Personnelles',
    'gestion.profile.btnReset': 'Rétablir les valeurs par défaut',
    'gestion.profile.successSave': 'Données personnelles et biographie mises à jour avec succès !',
    'gestion.profile.successReset': 'Les données par défaut du profil ont été rétablies.',
    'gestion.profile.confirmReset': 'Êtes-vous sûr de vouloir réinitialiser les données personnelles aux valeurs par défaut ?',
    // Authentification et Sécurité
    'auth.lockTooltip': 'Accès administrateur',
    'auth.modalTitle': 'Accès Administrateur',
    'auth.modalSubtitle': 'Entrez le mot de passe de sécurité pour gérer le catalogue et votre profil.',
    'auth.passwordLabel': 'Mot de passe administrateur',
    'auth.passwordPlaceholder': 'Entrez le mot de passe',
    'auth.togglePassword': 'Afficher / Masquer le mot de passe',
    'auth.btnLogin': 'Connexion',
    'auth.btnCancel': 'Annuler',
    'auth.btnLogout': 'Déconnexion',
    'auth.errorIncorrectPassword': 'Mot de passe incorrect. Veuillez réessayer.',
    'auth.shortcutHint': 'Raccourci clavier : Ctrl + Shift + A',
    'auth.close': 'Fermer',
    // Filtres du Catalogue
    'gestion.filterAll': 'Tous',
    'gestion.filterPhotos': 'Photographies',
    'gestion.filterPaintings': 'Tableaux',
    'gestion.filterDrawings': 'Dessins',
    'gestion.emptyFilteredCatalog': 'Aucune œuvre enregistrée dans cette catégorie.'
  },
  eu: {
    'head.title': 'Rosa Martín | Arte eta Argazkilaritza Galeria',
    'sidebar.subtitle': 'Artea & Argazkilaritza',
    'nav.inicio': 'Hasiera',
    'nav.sobreMi': 'Niri buruz',
    'nav.fotografias': 'Argazkiak',
    'nav.cuadros': 'Margolanak',
    'nav.dibujos': 'Marrazkiak',
    'nav.gestion': 'Kudeaketa',
    'hero.pretitle': 'Ongi etorri',
    'hero.title': 'Mundua mihisearen eta bisorearen bitartez arakatzen',
    'hero.lead': 'Erakusketa pertsonala, non akrilikoaren arte klasikoa argazkilaritza artistikoaren bat-batekotasunarekin eta edertasunarekin batzen den.',
    'hero.btnPrimary': 'Margolanak eta Akrilikoak Ikusi',
    'hero.btnSecondary': 'Argazki Galeria Arakatu',
    'hero.btnDrawings': 'Marrazkiak eta Zirriborroak Ikusi',
    'features.paint.title': 'Margolanak eta Koadroak',
    'features.paint.desc': 'Naturan inspiratutako kolore, testura eta formekiko pasioa islatzen duten sorkuntza akrilikoak. Lan bakoitzak mihisean adierazitako istorio intimo bat kontatzen du.',
    'features.photo.title': 'Lehiaketa Argazkilaritza',
    'features.photo.desc': 'Denboran izoztutako uneak. Arretaz hautatutako argazkiak, tokiko eta nazioko lehiaketetara aurkeztuak, argi perfektua eta ezkutuko emozioa bilatuz.',
    'features.drawing.title': 'Marrazkiak eta Zirriborroak',
    'features.drawing.desc': 'Ikerketa zainduak karbonzilloz, grafitoz eta tintaz. Argi-itzalak eta keinuaren adierazkortasuna aztertzen dituzten trazuak paperaren sinpletasunaren bidez.',
    'about.badge': 'Ibilbidea',
    'about.title': 'Rosa Martíni buruz',
    'about.p1': 'Nire ibilbide artistikoa gauza txikietan edertasuna bilatzea da. Artea kontenplaziorako eta emoziorik zintzoenerako leiho ireki gisa ulertzen dut.',
    'about.p2': 'Oso gaztetatik erakarri ninduten pintzelaren hizkuntza plastikoak zein argazki-objektiboaren berehalakotasunak. Margolaritzan meditazio gune bat aurkitzen dut, non akrilikoaren testurekin jolastu dezakedan, bolumenak eta ñabardurak sortuz, paisaia onirikoetatik hasi eta lore eta hegazti xehetasunetaraino.',
    'about.p3': 'Aldi berean, argazkilaritzak kanpoko munduarekin denbora errealean konektatzeko aukera ematen dit. Goizeko ihintza, urtegi bateko ilunabar urreztatua edo mendilerroen zabaltasuna harrapatzea naturaren isiltasunak dokumentatu eta ohoratzeko nire modua da.',
    'about.detail1.label': 'Teknika gogokoena',
    'about.detail1.val': 'Akrilikoa mihise gainean',
    'about.detail2.label': 'Argazki-ikuspegia',
    'about.detail2.val': 'Natura, argi naturala eta makro',
    'about.detail3.label': 'Kokalekua',
    'about.detail3.val': 'Euskal Herria, Espainia',
    'photos.badge': 'Lehiaketak eta Hautaketa',
    'photos.title': 'Argazki Nabarmentzekoak',
    'photos.subtitle': 'Ingurune naturaletan harrapatutako uneak, argazki lehiaketetan aurkeztu eta sarituak.',
    'paintings.badge': 'Olio eta Akrilikoen Galeria',
    'paintings.title': 'Margolanak',
    'paintings.subtitle': 'Eskuz margotutako obren hautaketa, akrilikoaren aberastasuna eta pintzelaren adierazkortasuna arakatuz.',
    'drawings.badge': 'Karbonzilloa, Grafitoa eta Tinta',
    'drawings.title': 'Marrazkiak eta Zirriborroak',
    'drawings.subtitle': 'Formaren, argi-itzalaren eta paper gaineko trazuaren garbitasunaren esplorazioa.',
    // Gestión & Dual Mode
    'gestion.badge': 'Administrazioa',
    'gestion.title': 'Lanak Kudeatu',
    'gestion.subtitle': 'Gehitu lan berriak (argazkiak, margolanak edo marrazkiak) zorroari eta kudeatu lehendik dauden lanak.',
    'gestion.formTitle': 'Lan Berria Gehitu',
    'gestion.formEditTitle': 'Lana Editatu',
    'gestion.modeCreate': 'Lan berria gehitzen',
    'gestion.modeEdit': 'Lana editatzen',
    'gestion.typeLabel': 'Lan Mota',
    'gestion.typePaint': 'Margolana / Koadroa',
    'gestion.typeDrawing': 'Marrazkia',
    'gestion.typePhoto': 'Argazkia',
    'gestion.inputTitle': 'Lanaren izenburua *',
    'gestion.inputSize': 'Neurriak / Formatua *',
    'gestion.inputTechnique': 'Teknika *',
    'gestion.inputOther': 'Lehiaketa / Oharrak *',
    'gestion.inputDesc': 'Lanaren deskribapena *',
    'gestion.imageLabel': 'Lanaren Argazkia edo Irudia *',
    'gestion.dropzoneTitle': 'Egin klik edo arrastatu irudi bat hona',
    'gestion.dropzoneHint': 'PNG, JPG, WEBP gomendatuak',
    'gestion.removeImage': 'Kendu hautatutako irudia',
    'gestion.btnSave': 'Lana Gorde',
    'gestion.btnCancel': 'Utzi edizioa',
    'gestion.listTitle': 'Katalogoko Lanak',
    'gestion.thImage': 'Irudia',
    'gestion.thTitle': 'Izenburua',
    'gestion.thType': 'Mota',
    'gestion.thDetail': 'Teknika / Xehetasuna',
    'gestion.thSize': 'Neurriak',
    'gestion.thActions': 'Ekintza',
    'gestion.edit': 'Editatu',
    'gestion.delete': 'Ezabatu',
    'gestion.confirmDelete': 'Ziur al zaude lan hau katalogotik ezabatu nahi duzula?',
    'gestion.successAdd': 'Lana arrakastaz gehitu da katalogora!',
    'gestion.successUpdate': 'Lana arrakastaz eguneratu da katalogoan!',
    'gestion.errorImage': 'Mesedez, hautatu irudi bat lanerako.',
    'gestion.errorRequired': 'Mesedez, bete derrigorrezko eremu guztiak.',
    'gestion.emptyCatalog': 'Ez dago lanik erregistratuta katalogoan.',
    'gestion.counterText': 'lan',
    'gestion.errorStorage': 'Errorea tokiko biltegian gordetzean.',
    // DeepSeek AI Laguntzailea
    'gestion.btnAiDesc': 'Idatzi deskribapena DeepSeekekin',
    'gestion.aiBtnLoading': 'Irudia aztertzen eta DeepSeekekin idazten...',
    'gestion.apiKeyTooltip': 'DeepSeek APIa konfiguratu',
    'gestion.apiKeyTitle': 'DeepSeek APIaren Konfigurazioa',
    'gestion.apiKeyHelp': 'Sartu zure DeepSeek gakoa deskribapen automatikoetarako. Zure arakatzailean lokalki gordeko da.',
    'gestion.apiKeyLabel': 'API Gakoa (sk-...):',
    'gestion.apiEndpointLabel': 'Endpoint / Proxy (aukerakoa):',
    'gestion.btnSaveKey': 'Gorde',
    'gestion.apiKeySaved': 'DeepSeek konfigurazioa behar bezala gorde da.',
    'gestion.aiErrorNoImage': 'Lehenik eta behin irudi bat hautatu edo kargatu behar duzu AIak aztertu ahal izateko.',
    'gestion.aiErrorNoKey': 'Mesedez, sartu zure DeepSeek API Gakoa deskribapena sortu ahal izateko.',
    'gestion.aiSuccess': 'Deskribapena arrakastaz sortu da DeepSeek AIrekin!',
    // Cards / Lightbox
    'card.photo': 'Argazkia',
    'card.paint': 'Margolana',
    'card.drawing': 'Marrazkia',
    'lightbox.close': 'Itxi',
    'lightbox.prev': 'Aurreko irudia',
    'lightbox.next': 'Hurrengo irudia',
    'lightbox.meta.contest': 'Lehiaketaren Xehetasunak',
    'lightbox.meta.technique': 'Teknika',
    'lightbox.meta.size': 'Neurriak',
    'lightbox.meta.secondPlace': 'Bigarren postua',
    'lightbox.photoTag': 'Argazkia',
    'lightbox.paintTag': 'Margolan Akrilikoa',
    'lightbox.drawingTag': 'Marrazkia / Zirriborroa',
    // Profila eta Azpi-fitxak
    'about.titlePrefix': 'Niri buruz:',
    'head.titleSuffix': 'Arte eta Argazki Galeria',
    'gestion.tabs.artworks': 'Lanen Kudeaketa',
    'gestion.tabs.profile': 'Datu Pertsonalak / Profila',
    'gestion.profile.title': 'Datu Pertsonalak eta Biografia',
    'gestion.profile.badge': 'Artistaren Profila',
    'gestion.profile.nameLabel': 'Artistaren izena *',
    'gestion.profile.subtitleLabel': 'Azpititulua / Lanbidea *',
    'gestion.profile.photoLabel': 'Profileko argazkia / Erretratua',
    'gestion.profile.photoHint': 'Ordeztu "Niri buruz" ataleko monograma zure benetako argazkiarekin.',
    'gestion.profile.dropzoneTitle': 'Egin klik edo arrastatu erretratu bat hona',
    'gestion.profile.dropzoneHint': 'PNG, JPG, WEBP gomendatuak (orientazio bertikala)',
    'gestion.profile.bioLeadLabel': 'Biografia: Paragrafo nabarmendua (Lead) *',
    'gestion.profile.bio2Label': 'Biografia: Bigarren paragrafoa (Margolaritza / Teknika) *',
    'gestion.profile.bio3Label': 'Biografia: Hirugarren paragrafoa (Argazkilaritza / Inspirazioa) *',
    'gestion.profile.techniqueLabel': 'Teknika gogokoena *',
    'gestion.profile.focusLabel': 'Argazki-ikuspegia *',
    'gestion.profile.locationLabel': 'Kokapena *',
    'gestion.profile.btnSave': 'Gorde Datu Pertsonalak',
    'gestion.profile.btnReset': 'Berrezarri balio lehenetsiak',
    'gestion.profile.successSave': 'Datu pertsonalak eta biografia behar bezala eguneratu dira!',
    'gestion.profile.successReset': 'Profileko balio lehenetsiak berrezarri dira.',
    'gestion.profile.confirmReset': 'Ziur zaude datu pertsonalak Rosa Martínen hasierako balioetara berrezarri nahi dituzula?',
    // Autentifikazioa eta Segurtasuna
    'auth.lockTooltip': 'Kudeatzailearen sarbidea',
    'auth.modalTitle': 'Administrazio Sarbidea',
    'auth.modalSubtitle': 'Sartu segurtasun-pasahitza katalogoa eta zure profila kudeatzeko.',
    'auth.passwordLabel': 'Kudeatzailearen pasahitza',
    'auth.passwordPlaceholder': 'Sartu pasahitza',
    'auth.togglePassword': 'Erakutsi / Ezkutatu pasahitza',
    'auth.btnLogin': 'Hasi Saioa',
    'auth.btnCancel': 'Utzi',
    'auth.btnLogout': 'Itxi Saioa',
    'auth.errorIncorrectPassword': 'Pasahitz okerra. Mesedez, saiatu berriro.',
    'auth.shortcutHint': 'Lasterbidea: Ktrl + Shift + A',
    'auth.close': 'Itxi',
    // Katalogoaren Iragazkiak
    'gestion.filterAll': 'Guztiak',
    'gestion.filterPhotos': 'Argazkiak',
    'gestion.filterPaintings': 'Margolanak',
    'gestion.filterDrawings': 'Marrazkiak',
    'gestion.emptyFilteredCatalog': 'Kategoria honetan ez dago lanik erregistratuta.'
  }
};

// --- RENDERIZADO DE LAS GALERÍAS ---
function renderGalleries() {
  const photosContainer = document.getElementById('photosGallery');
  const paintingsContainer = document.getElementById('paintingsGallery');
  const drawingsContainer = document.getElementById('drawingsGallery');
  
  if (photosContainer) {
    photosContainer.innerHTML = photographs.map((photo, index) => {
      const title = photo.title[currentLang] || photo.title['es'] || '';
      const desc = photo.description[currentLang] || photo.description['es'] || '';
      const other = photo.other[currentLang] || photo.other['es'] || '';
      
      return `
        <article class="art-card" data-type="photo" data-index="${index}">
          <div class="card-image-wrapper">
            <img src="${photo.image}" alt="${title}" loading="lazy">
            <div class="card-overlay">
              <div class="overlay-details">
                <span class="overlay-title">${title}</span>
                <div class="overlay-meta">
                  <span>${uiTranslations[currentLang]['card.photo']}</span>
                  <span>${photo.size}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${title}</h3>
              <span class="card-tag">${uiTranslations[currentLang]['card.photo']}</span>
            </div>
            <p class="card-desc">${desc}</p>
            <div class="card-footer">
              <div class="meta-item">
                <span>${photo.size}</span>
              </div>
              <span style="max-width: 70%; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${other}
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
  
  if (paintingsContainer) {
    paintingsContainer.innerHTML = paintings.map((paint, index) => {
      const title = paint.title[currentLang] || paint.title['es'] || '';
      const desc = paint.description[currentLang] || paint.description['es'] || '';
      const technique = paint.technique[currentLang] || paint.technique['es'] || '';

      return `
        <article class="art-card" data-type="paint" data-index="${index}">
          <div class="card-image-wrapper">
            <img src="${paint.image}" alt="${title}" loading="lazy">
            <div class="card-overlay">
              <div class="overlay-details">
                <span class="overlay-title">${title}</span>
                <div class="overlay-meta">
                  <span>${uiTranslations[currentLang]['card.paint']}</span>
                  <span>${paint.size}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${title}</h3>
              <span class="card-tag">${uiTranslations[currentLang]['card.paint']}</span>
            </div>
            <p class="card-desc">${desc}</p>
            <div class="card-footer">
              <div class="meta-item">
                <span>${technique}</span>
              </div>
              <span>${paint.size}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  if (drawingsContainer) {
    drawingsContainer.innerHTML = drawings.map((drawing, index) => {
      const title = drawing.title[currentLang] || drawing.title['es'] || '';
      const desc = drawing.description[currentLang] || drawing.description['es'] || '';
      const technique = drawing.technique[currentLang] || drawing.technique['es'] || '';

      return `
        <article class="art-card" data-type="drawing" data-index="${index}">
          <div class="card-image-wrapper">
            <img src="${drawing.image}" alt="${title}" loading="lazy">
            <div class="card-overlay">
              <div class="overlay-details">
                <span class="overlay-title">${title}</span>
                <div class="overlay-meta">
                  <span>${uiTranslations[currentLang]['card.drawing']}</span>
                  <span>${drawing.size}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${title}</h3>
              <span class="card-tag" style="border-color: rgba(224, 130, 80, 0.4); color: #e08250;">${uiTranslations[currentLang]['card.drawing']}</span>
            </div>
            <p class="card-desc">${desc}</p>
            <div class="card-footer">
              <div class="meta-item">
                <span>${technique}</span>
              </div>
              <span>${drawing.size}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}

// Variable de estado para el filtro del catálogo de obras
let currentCatalogFilter = 'all'; // 'all' | 'photo' | 'paint' | 'drawing'

// --- RENDERIZADO DE LA TABLA DE GESTIÓN (MANTENIMIENTO) ---
function renderManagementList() {
  const tbody = document.getElementById('managementTableBody');
  const counter = document.getElementById('catalogCounter');
  if (!tbody) return;

  const totalCount = photographs.length + paintings.length + drawings.length;
  if (counter) {
    counter.textContent = `${totalCount} ${uiTranslations[currentLang]['gestion.counterText']}`;
  }

  // Actualizar contadores numéricos en las subpestañas de filtro
  const countFilterAll = document.getElementById('countFilterAll');
  const countFilterPhotos = document.getElementById('countFilterPhotos');
  const countFilterPaintings = document.getElementById('countFilterPaintings');
  const countFilterDrawings = document.getElementById('countFilterDrawings');

  if (countFilterAll) countFilterAll.textContent = `(${totalCount})`;
  if (countFilterPhotos) countFilterPhotos.textContent = `(${photographs.length})`;
  if (countFilterPaintings) countFilterPaintings.textContent = `(${paintings.length})`;
  if (countFilterDrawings) countFilterDrawings.textContent = `(${drawings.length})`;

  // Actualizar estado activo en los botones de filtro
  const filterBtns = document.querySelectorAll('.catalog-filter-btn');
  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    btn.classList.toggle('active', filter === currentCatalogFilter);
  });

  // Unificamos cuadros, dibujos y fotos con metadata para la tabla
  const allItems = [
    ...paintings.map(item => ({ ...item, itemType: 'paint' })),
    ...drawings.map(item => ({ ...item, itemType: 'drawing' })),
    ...photographs.map(item => ({ ...item, itemType: 'photo' }))
  ];

  // Aplicamos el filtro por disciplina seleccionado
  let displayItems = allItems;
  if (currentCatalogFilter === 'photo') {
    displayItems = allItems.filter(item => item.itemType === 'photo');
  } else if (currentCatalogFilter === 'paint') {
    displayItems = allItems.filter(item => item.itemType === 'paint');
  } else if (currentCatalogFilter === 'drawing') {
    displayItems = allItems.filter(item => item.itemType === 'drawing');
  }

  if (displayItems.length === 0) {
    const emptyMsg = (allItems.length === 0)
      ? uiTranslations[currentLang]['gestion.emptyCatalog']
      : uiTranslations[currentLang]['gestion.emptyFilteredCatalog'];

    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-catalog-msg">
          ${emptyMsg}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = displayItems.map(item => {
    let typeLabel = uiTranslations[currentLang]['gestion.typePaint'];
    let badgeClass = 'paint';

    if (item.itemType === 'photo') {
      typeLabel = uiTranslations[currentLang]['gestion.typePhoto'];
      badgeClass = 'photo';
    } else if (item.itemType === 'drawing') {
      typeLabel = uiTranslations[currentLang]['gestion.typeDrawing'];
      badgeClass = 'drawing';
    }
    
    const title = item.title[currentLang] || item.title['es'] || '';
    const detail = item.technique 
      ? (item.technique[currentLang] || item.technique['es'] || '')
      : (item.other ? (item.other[currentLang] || item.other['es'] || '') : '');

    return `
      <tr class="clickable-row" data-id="${item.id}" data-type="${item.itemType}">
        <td class="thumb-cell">
          <img src="${item.image}" alt="${title}" loading="lazy">
        </td>
        <td class="title-cell" title="${title}">${title}</td>
        <td>
          <span class="badge-type ${badgeClass}">${typeLabel}</span>
        </td>
        <td class="detail-cell" title="${detail}">${detail}</td>
        <td class="size-cell">${item.size}</td>
        <td>
          <div class="table-actions-cell">
            <button type="button" class="btn-edit" data-id="${item.id}" data-type="${item.itemType}" aria-label="${uiTranslations[currentLang]['gestion.edit']}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="action-btn-icon" style="width: 15px; height: 15px;"><path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>${uiTranslations[currentLang]['gestion.edit']}</span>
            </button>
            <button type="button" class="btn-delete" data-id="${item.id}" data-type="${item.itemType}" aria-label="${uiTranslations[currentLang]['gestion.delete']}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="action-btn-icon" style="width: 15px; height: 15px;"><path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>${uiTranslations[currentLang]['gestion.delete']}</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// --- RENDERIZADO DEL PERFIL DE LA ARTISTA ---
function renderArtistProfile() {
  const name = artistProfile.name || 'Rosa Martín';
  const subtitle = (artistProfile.subtitle && (artistProfile.subtitle[currentLang] || artistProfile.subtitle['es'])) || 'Arte & Fotografía';

  // 1. Nombre en cabecera móvil, sidebar, copyright, título de sección y documento
  const mobileName = document.getElementById('mobileArtistName');
  if (mobileName) mobileName.textContent = name;

  const sidebarName = document.getElementById('sidebarArtistName');
  if (sidebarName) sidebarName.textContent = name;

  const sidebarSubtitle = document.getElementById('sidebarArtistSubtitle');
  if (sidebarSubtitle) sidebarSubtitle.textContent = subtitle;

  const copyright = document.getElementById('footerArtistCopyright');
  if (copyright) copyright.innerHTML = `&copy; 2026 ${name}`;

  const aboutTitle = document.getElementById('aboutArtistTitle');
  if (aboutTitle) {
    const prefix = uiTranslations[currentLang]['about.titlePrefix'] || 'Sobre';
    aboutTitle.textContent = `${prefix} ${name}`;
  }

  const titleSuffix = uiTranslations[currentLang]['head.titleSuffix'] || 'Galería de Arte y Fotografía';
  document.title = `${name} | ${titleSuffix}`;

  // 2. Monograma (iniciales) o Foto real en Sobre Mí
  const portraitPlaceholder = document.getElementById('aboutPortraitPlaceholder');
  const portraitImg = document.getElementById('aboutPortraitImg');
  const portraitInitials = document.getElementById('aboutPortraitInitials');

  if (portraitInitials) {
    const words = name.trim().split(/\s+/);
    let initials = 'RM';
    if (words.length >= 2) {
      initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      initials = words[0].substring(0, 2).toUpperCase();
    }
    portraitInitials.textContent = initials;
  }

  if (artistProfile.photo && portraitImg && portraitPlaceholder) {
    portraitImg.src = artistProfile.photo;
    portraitImg.style.display = 'block';
    portraitPlaceholder.style.display = 'none';
  } else if (portraitImg && portraitPlaceholder) {
    portraitImg.src = '';
    portraitImg.style.display = 'none';
    portraitPlaceholder.style.display = 'flex';
  }

  // 3. Párrafos de biografía en Sobre Mí
  const bioP1 = document.getElementById('aboutBioLead');
  if (bioP1) bioP1.textContent = (artistProfile.bioLead && (artistProfile.bioLead[currentLang] || artistProfile.bioLead['es'])) || '';

  const bioP2 = document.getElementById('aboutBio2');
  if (bioP2) bioP2.textContent = (artistProfile.bio2 && (artistProfile.bio2[currentLang] || artistProfile.bio2['es'])) || '';

  const bioP3 = document.getElementById('aboutBio3');
  if (bioP3) bioP3.textContent = (artistProfile.bio3 && (artistProfile.bio3[currentLang] || artistProfile.bio3['es'])) || '';

  // 4. Detalles técnicos en Sobre Mí
  const techDetail = document.getElementById('aboutDetailTechnique');
  if (techDetail) techDetail.textContent = (artistProfile.technique && (artistProfile.technique[currentLang] || artistProfile.technique['es'])) || '';

  const focusDetail = document.getElementById('aboutDetailFocus');
  if (focusDetail) focusDetail.textContent = (artistProfile.focus && (artistProfile.focus[currentLang] || artistProfile.focus['es'])) || '';

  const locDetail = document.getElementById('aboutDetailLocation');
  if (locDetail) locDetail.textContent = (artistProfile.location && (artistProfile.location[currentLang] || artistProfile.location['es'])) || '';
}

// --- VARIABLES GLOBALES DEL FORMULARIO DE OBRAS ---
let currentUploadedImageBase64 = '';
let editingItemId = null;

// Helper para convertir cualquier imagen (incluso paths relativos './fotos/..') a Base64 y Data URL completa
async function ensureBase64ForAi(imageSrc) {
  if (imageSrc.startsWith('data:')) {
    const parts = imageSrc.split(';base64,');
    const mimeType = parts[0].replace('data:', '') || 'image/jpeg';
    return {
      mimeType: mimeType,
      data: parts[1],
      fullDataUrl: imageSrc
    };
  }

  // Convertir URL relativa/remota mediante fetch y FileReader
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const parts = result.split(';base64,');
      resolve({
        mimeType: blob.type || 'image/jpeg',
        data: parts[1],
        fullDataUrl: result
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
const ensureBase64ForGemini = ensureBase64ForAi;

function showFormFeedback(message, type = 'success') {
  const feedback = document.getElementById('formFeedback');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.className = `form-feedback ${type}`;
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setTimeout(() => {
    if (feedback.classList.contains('success')) {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    }
  }, 6000);
}

// Iniciar edición de una obra
function startEditArtwork(id, type) {
  let item;
  if (type === 'paint') {
    item = paintings.find(p => p.id === id);
  } else if (type === 'drawing') {
    item = drawings.find(p => p.id === id);
  } else {
    item = photographs.find(p => p.id === id);
  }

  if (!item) return;

  editingItemId = item.id;
  const formCard = document.getElementById('formCard');
  const formModeBadge = document.getElementById('formModeBadge');
  const formMainTitle = document.getElementById('formMainTitle');
  const btnSubmitText = document.getElementById('btnSubmitText');
  const btnCancelEdit = document.getElementById('btnCancelEdit');

  const itemIdInput = document.getElementById('itemId');
  const itemOriginalTypeInput = document.getElementById('itemOriginalType');
  const titleInput = document.getElementById('artworkTitle');
  const sizeInput = document.getElementById('artworkSize');
  const descInput = document.getElementById('artworkDescription');
  const techniqueInput = document.getElementById('artworkTechnique');
  const contestInput = document.getElementById('artworkOther');
  const previewImage = document.getElementById('imagePreview');
  const previewContainer = document.getElementById('imagePreviewContainer');
  const dropzonePrompt = document.getElementById('dropzonePrompt');

  // Asignar campos ocultos
  itemIdInput.value = item.id;
  itemOriginalTypeInput.value = type;

  // Seleccionar radio de tipo
  const radio = document.querySelector(`input[name="artworkType"][value="${type}"]`);
  if (radio) radio.checked = true;

  // Alternar campos condicionales
  const techniqueGroup = document.getElementById('techniqueFieldGroup');
  const contestGroup = document.getElementById('contestFieldGroup');
  if (type === 'paint' || type === 'drawing') {
    techniqueGroup.style.display = 'flex';
    contestGroup.style.display = 'none';
    techniqueInput.value = item.technique[currentLang] || item.technique.es || '';
    contestInput.value = '';
    techniqueInput.required = true;
    contestInput.required = false;
  } else {
    techniqueGroup.style.display = 'none';
    contestGroup.style.display = 'flex';
    contestInput.value = item.other[currentLang] || item.other.es || '';
    techniqueInput.value = '';
    techniqueInput.required = false;
    contestInput.required = true;
  }

  // Rellenar valores
  const itemTitle = item.title[currentLang] || item.title.es || '';
  titleInput.value = itemTitle;
  sizeInput.value = item.size || '';
  descInput.value = item.description[currentLang] || item.description.es || '';

  // Configurar imagen actual
  currentUploadedImageBase64 = item.image;
  previewImage.src = item.image;
  previewContainer.style.display = 'inline-block';
  dropzonePrompt.style.display = 'none';

  // Actualizar indicadores visuales de modo edición
  formModeBadge.className = 'form-mode-badge edit-mode';
  formModeBadge.textContent = `${uiTranslations[currentLang]['gestion.modeEdit']}: ${itemTitle}`;
  formMainTitle.textContent = uiTranslations[currentLang]['gestion.formEditTitle'];
  btnSubmitText.textContent = uiTranslations[currentLang]['gestion.btnSave'];
  btnCancelEdit.style.display = 'inline-block';

  // Scroll suave al formulario
  if (formCard) {
    formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Normalizar tipo de obra entre valores internos ('paint', 'drawing', 'photo') y términos en español
function normalizeArtworkType(type) {
  if (!type) return 'paint';
  const t = String(type).toLowerCase().trim();
  if (t === 'fotografia' || t === 'photo' || t === 'foto') return 'photo';
  if (t === 'dibujo' || t === 'drawing') return 'drawing';
  if (t === 'cuadro' || t === 'paint' || t === 'pintura' || t === 'painting') return 'paint';
  return t;
}

// Cancelar edición y volver a modo creación (preservando opcionalmente el tipo de obra y foco)
function cancelEdit(preserveType = null, focusTitle = false) {
  editingItemId = null;
  const form = document.getElementById('artworkForm');
  const formModeBadge = document.getElementById('formModeBadge');
  const formMainTitle = document.getElementById('formMainTitle');
  const btnSubmitText = document.getElementById('btnSubmitText');
  const btnCancelEdit = document.getElementById('btnCancelEdit');
  const previewImage = document.getElementById('imagePreview');
  const previewContainer = document.getElementById('imagePreviewContainer');
  const dropzonePrompt = document.getElementById('dropzonePrompt');
  const fileInput = document.getElementById('artworkImage');

  if (form) form.reset();
  document.getElementById('itemId').value = '';
  document.getElementById('itemOriginalType').value = '';
  currentUploadedImageBase64 = '';
  if (fileInput) fileInput.value = '';
  if (previewImage) previewImage.src = '';
  if (previewContainer) previewContainer.style.display = 'none';
  if (dropzonePrompt) dropzonePrompt.style.display = 'flex';

  // 1. Asignar y persistir el tipo de obra (el seleccionado previamente o 'paint' por defecto)
  const targetType = normalizeArtworkType(preserveType || 'paint');
  const targetRadio = document.querySelector(`input[name="artworkType"][value="${targetType}"]`) || document.getElementById('typePaint');
  if (targetRadio) {
    document.querySelectorAll('input[name="artworkType"]').forEach(r => {
      r.checked = (r === targetRadio);
    });
    // Disparar evento change para sincronizar listeners y estilos
    targetRadio.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Soporte adicional para selectores <select> si existieran
  const typeSelect = document.getElementById('artworkTypeSelect') || document.querySelector('select[name="artworkType"]');
  if (typeSelect) {
    typeSelect.value = targetType;
    typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 2. Sincronizar campos contextuales (Técnica vs. Concurso) de forma garantizada
  const techniqueGroup = document.getElementById('techniqueFieldGroup');
  const contestGroup = document.getElementById('contestFieldGroup');
  const techniqueInput = document.getElementById('artworkTechnique');
  const contestInput = document.getElementById('artworkOther');
  if (techniqueGroup && contestGroup && techniqueInput && contestInput) {
    if (targetType === 'paint' || targetType === 'drawing') {
      techniqueGroup.style.display = 'flex';
      contestGroup.style.display = 'none';
      techniqueInput.required = true;
      contestInput.required = false;
    } else {
      techniqueGroup.style.display = 'none';
      contestGroup.style.display = 'flex';
      techniqueInput.required = false;
      contestInput.required = true;
    }
  }

  // 3. Restaurar badges e indicador de modo creación
  if (formModeBadge) {
    formModeBadge.className = 'form-mode-badge create-mode';
    formModeBadge.textContent = uiTranslations[currentLang]['gestion.modeCreate'];
  }
  if (formMainTitle) {
    formMainTitle.textContent = uiTranslations[currentLang]['gestion.formTitle'];
  }
  if (btnSubmitText) {
    btnSubmitText.textContent = uiTranslations[currentLang]['gestion.btnSave'];
  }
  if (btnCancelEdit) {
    btnCancelEdit.style.display = 'none';
  }

  // 4. Posicionar foco directamente en el campo Título si se solicita
  if (focusTitle) {
    const titleInput = document.getElementById('artworkTitle');
    if (titleInput) {
      setTimeout(() => {
        titleInput.focus();
      }, 60);
    }
  }
}

// --- CONFIGURACIÓN DE TABLA DE MANTENIMIENTO ---
function setupManagementTable() {
  const tbody = document.getElementById('managementTableBody');
  if (!tbody) return;

  tbody.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.btn-delete');
    const editBtn = e.target.closest('.btn-edit');
    const row = e.target.closest('tr.clickable-row');

    if (deleteBtn) {
      e.stopPropagation();
      const id = deleteBtn.getAttribute('data-id');
      const type = deleteBtn.getAttribute('data-type');
      const confirmMsg = uiTranslations[currentLang]['gestion.confirmDelete'];

      if (window.confirm(confirmMsg)) {
        if (editingItemId === id) {
          cancelEdit();
        }
        if (type === 'paint') {
          paintings = paintings.filter(item => item.id !== id);
          saveArtworkData('paint');
        } else if (type === 'drawing') {
          drawings = drawings.filter(item => item.id !== id);
          saveArtworkData('drawing');
        } else if (type === 'photo') {
          photographs = photographs.filter(item => item.id !== id);
          saveArtworkData('photo');
        }

        renderGalleries();
        renderManagementList();
      }
      return;
    }

    if (editBtn) {
      e.stopPropagation();
      const id = editBtn.getAttribute('data-id');
      const type = editBtn.getAttribute('data-type');
      startEditArtwork(id, type);
      return;
    }

    if (row) {
      const id = row.getAttribute('data-id');
      const type = row.getAttribute('data-type');
      startEditArtwork(id, type);
    }
  });

  // Delegación de clics en las subpestañas de filtro por disciplina
  const filterTabs = document.querySelector('.catalog-filter-tabs');
  if (filterTabs) {
    filterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.catalog-filter-btn');
      if (!btn) return;
      const filter = btn.getAttribute('data-filter') || 'all';
      currentCatalogFilter = filter;
      renderManagementList();
    });
  }
}

// --- ASISTENTE DE DESCRIPCIÓN CON DEEPSEEK AI MULTIMODAL ---
function setupDeepSeekAiAssistant() {
  const btnAi = document.getElementById('btnGenerateAiDesc');
  const btnConfig = document.getElementById('btnConfigApiKey');
  const apiKeyPanel = document.getElementById('apiKeyPanel');
  const btnClosePanel = document.getElementById('btnCloseApiKeyPanel');
  const btnSaveKey = document.getElementById('btnSaveApiKey');
  const keyInput = document.getElementById('deepseekApiKeyInput');
  const endpointInput = document.getElementById('deepseekApiEndpointInput');
  const aiBtnText = document.getElementById('aiBtnText');

  if (!btnAi) return;

  // Cargar clave y endpoint existentes en inputs
  let savedKey = '';
  let savedEndpoint = '';
  try {
    savedKey = localStorage.getItem('deepseek_api_key') || localStorage.getItem('gemini_api_key') || '';
    savedEndpoint = localStorage.getItem('deepseek_api_endpoint') || '';
  } catch (e) {}

  if (keyInput) keyInput.value = savedKey;
  if (endpointInput) endpointInput.value = savedEndpoint;

  // Alternar panel de API Key
  if (btnConfig) {
    btnConfig.addEventListener('click', () => {
      apiKeyPanel.style.display = (apiKeyPanel.style.display === 'none') ? 'block' : 'none';
      if (apiKeyPanel.style.display === 'block' && keyInput) keyInput.focus();
    });
  }

  if (btnClosePanel) {
    btnClosePanel.addEventListener('click', () => {
      apiKeyPanel.style.display = 'none';
    });
  }

  if (btnSaveKey) {
    btnSaveKey.addEventListener('click', () => {
      const val = keyInput ? keyInput.value.trim() : '';
      const endpointVal = endpointInput ? endpointInput.value.trim() : '';
      try {
        if (val) {
          localStorage.setItem('deepseek_api_key', val);
        } else {
          localStorage.removeItem('deepseek_api_key');
        }

        if (endpointVal) {
          localStorage.setItem('deepseek_api_endpoint', endpointVal);
        } else {
          localStorage.removeItem('deepseek_api_endpoint');
        }
        showFormFeedback(uiTranslations[currentLang]['gestion.apiKeySaved'], 'success');
      } catch (e) {
        showFormFeedback('Error al guardar en el almacenamiento local.', 'error');
      }
      apiKeyPanel.style.display = 'none';
    });
  }

  // Generar descripción con DeepSeek AI
  btnAi.addEventListener('click', async () => {
    // 1. Validar que exista imagen cargada
    if (!currentUploadedImageBase64) {
      showFormFeedback(uiTranslations[currentLang]['gestion.aiErrorNoImage'], 'error');
      return;
    }

    // 2. Validar API Key
    let apiKey = '';
    let endpoint = 'https://api.deepseek.com/chat/completions';
    try {
      apiKey = localStorage.getItem('deepseek_api_key') || localStorage.getItem('gemini_api_key');
      const customEndpoint = localStorage.getItem('deepseek_api_endpoint');
      if (customEndpoint) endpoint = customEndpoint;
    } catch (e) {}

    if (!apiKey) {
      apiKeyPanel.style.display = 'block';
      if (keyInput) keyInput.focus();
      showFormFeedback(uiTranslations[currentLang]['gestion.aiErrorNoKey'], 'error');
      return;
    }

    const title = document.getElementById('artworkTitle').value.trim() || 'Sin título';

    // 3. Estado visual de carga
    btnAi.disabled = true;
    btnAi.classList.add('loading');
    aiBtnText.textContent = uiTranslations[currentLang]['gestion.aiBtnLoading'];

    try {
      const imgInfo = await ensureBase64ForAi(currentUploadedImageBase64);

      const selectedType = document.querySelector('input[name="artworkType"]:checked')?.value || 'paint';
      let disciplineText = 'una pintura o cuadro al óleo o acrílico';
      if (selectedType === 'drawing') {
        disciplineText = 'un dibujo o boceto a carboncillo, grafito o tinta';
      } else if (selectedType === 'photo') {
        disciplineText = 'una fotografía artística de concurso';
      }

      const promptText = `Actúa como un crítico y comisario de arte profesional. Observa esta imagen de ${disciplineText} y redacta un texto descriptivo breve (2 o 3 frases evocadoras, elegantes y poéticas en español) apto para el catálogo de la artista Rosa Martín, teniendo en cuenta que la obra se titula "${title}". Devuelve solo el texto de la descripción.`;

      const payload = {
        model: 'deepseek-v4-flash-vision-exp',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: promptText
              },
              {
                type: 'image_url',
                image_url: {
                  url: imgInfo.fullDataUrl
                }
              }
            ]
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || `Error HTTP ${response.status}`);
      }

      const resData = await response.json();
      const generatedDesc = resData.choices?.[0]?.message?.content?.trim();

      if (!generatedDesc) {
        throw new Error('No se recibió texto en la respuesta de la IA.');
      }

      const descTextarea = document.getElementById('artworkDescription');
      descTextarea.value = generatedDesc;
      showFormFeedback(uiTranslations[currentLang]['gestion.aiSuccess'], 'success');

    } catch (err) {
      console.error('Error al generar descripción con DeepSeek:', err);
      let errorMsg = err.message || 'Error desconocido';
      if (err.name === 'TypeError' || errorMsg.includes('Failed to fetch')) {
        errorMsg = 'Error de conexión / CORS con DeepSeek. Si tu navegador bloquea la llamada directa, usa un endpoint proxy en la configuración de la clave.';
      }
      showFormFeedback(`Error DeepSeek AI: ${errorMsg}`, 'error');
    } finally {
      btnAi.disabled = false;
      btnAi.classList.remove('loading');
      aiBtnText.textContent = uiTranslations[currentLang]['gestion.btnAiDesc'];
    }
  });
}
const setupGeminiAiAssistant = setupDeepSeekAiAssistant;

// --- CONFIGURACIÓN DEL FORMULARIO Y FILEREADER ---
function setupArtworkForm() {
  const form = document.getElementById('artworkForm');
  const typeRadios = document.querySelectorAll('input[name="artworkType"]');
  const techniqueGroup = document.getElementById('techniqueFieldGroup');
  const contestGroup = document.getElementById('contestFieldGroup');
  const techniqueInput = document.getElementById('artworkTechnique');
  const contestInput = document.getElementById('artworkOther');
  
  const fileInput = document.getElementById('artworkImage');
  const fileDropzone = document.getElementById('fileDropzone');
  const dropzonePrompt = document.getElementById('dropzonePrompt');
  const previewContainer = document.getElementById('imagePreviewContainer');
  const previewImage = document.getElementById('imagePreview');
  const removeImageBtn = document.getElementById('btnRemoveImage');
  const btnCancelEdit = document.getElementById('btnCancelEdit');

  if (!form) return;

  // Botón cancelar edición
  if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', cancelEdit);
  }

  // Alternar campos dinámicos según tipo seleccionado
  function updateTypeFields() {
    const selectedType = document.querySelector('input[name="artworkType"]:checked')?.value;
    if (selectedType === 'paint' || selectedType === 'drawing') {
      techniqueGroup.style.display = 'flex';
      contestGroup.style.display = 'none';
      techniqueInput.required = true;
      contestInput.required = false;
    } else {
      techniqueGroup.style.display = 'none';
      contestGroup.style.display = 'flex';
      techniqueInput.required = false;
      contestInput.required = true;
    }
  }

  typeRadios.forEach(radio => {
    radio.addEventListener('change', updateTypeFields);
  });
  updateTypeFields();

  // Procesamiento de Imagen con FileReader
  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showFormFeedback(uiTranslations[currentLang]['gestion.errorImage'], 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentUploadedImageBase64 = e.target.result;
      previewImage.src = currentUploadedImageBase64;
      previewContainer.style.display = 'inline-block';
      dropzonePrompt.style.display = 'none';
      fileDropzone.classList.remove('dragover');
    };
    reader.onerror = () => {
      showFormFeedback('Error al leer el archivo de imagen.', 'error');
    };
    reader.readAsDataURL(file);
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleFile(file);
    });
  }

  // Drag & Drop
  if (fileDropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      fileDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileDropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileDropzone.classList.remove('dragover');
      });
    });

    fileDropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      if (file) {
        fileInput.files = dt.files;
        handleFile(file);
      }
    });
  }

  // Quitar imagen
  if (removeImageBtn) {
    removeImageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentUploadedImageBase64 = '';
      if (fileInput) fileInput.value = '';
      previewImage.src = '';
      previewContainer.style.display = 'none';
      dropzonePrompt.style.display = 'flex';
    });
  }

  // Envío del Formulario (Creación o Edición)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemId = document.getElementById('itemId').value;
    const originalType = document.getElementById('itemOriginalType').value;
    const selectedType = document.querySelector('input[name="artworkType"]:checked')?.value || 'paint';
    const typeToPreserve = selectedType;
    const title = document.getElementById('artworkTitle').value.trim();
    const size = document.getElementById('artworkSize').value.trim();
    const description = document.getElementById('artworkDescription').value.trim();
    const technique = techniqueInput.value.trim();
    const other = contestInput.value.trim();

    // Validar campos requeridos
    if (!title || !size || !description || ((selectedType === 'paint' || selectedType === 'drawing') && !technique) || (selectedType === 'photo' && !other)) {
      showFormFeedback(uiTranslations[currentLang]['gestion.errorRequired'], 'error');
      return;
    }

    if (!currentUploadedImageBase64) {
      showFormFeedback(uiTranslations[currentLang]['gestion.errorImage'], 'error');
      return;
    }

    if (itemId) {
      // MODO EDICIÓN: Actualizar obra existente
      if (originalType === selectedType) {
        let targetList = paintings;
        if (selectedType === 'drawing') targetList = drawings;
        else if (selectedType === 'photo') targetList = photographs;

        const item = targetList.find(p => p.id === itemId);
        if (item) {
          item.image = currentUploadedImageBase64;
          item.size = size;

          if (!item.title || typeof item.title !== 'object') {
            item.title = { es: title, en: title, fr: title, eu: title };
          } else {
            item.title[currentLang] = title;
            ['es', 'en', 'fr', 'eu'].forEach(lang => {
              if (!item.title[lang]) item.title[lang] = title;
            });
          }

          if (!item.description || typeof item.description !== 'object') {
            item.description = { es: description, en: description, fr: description, eu: description };
          } else {
            item.description[currentLang] = description;
            ['es', 'en', 'fr', 'eu'].forEach(lang => {
              if (!item.description[lang]) item.description[lang] = description;
            });
          }

          if (selectedType === 'paint' || selectedType === 'drawing') {
            if (!item.technique || typeof item.technique !== 'object') {
              item.technique = { es: technique, en: technique, fr: technique, eu: technique };
            } else {
              item.technique[currentLang] = technique;
              ['es', 'en', 'fr', 'eu'].forEach(lang => {
                if (!item.technique[lang]) item.technique[lang] = technique;
              });
            }
          } else {
            if (!item.other || typeof item.other !== 'object') {
              item.other = { es: other, en: other, fr: other, eu: other };
            } else {
              item.other[currentLang] = other;
              ['es', 'en', 'fr', 'eu'].forEach(lang => {
                if (!item.other[lang]) item.other[lang] = other;
              });
            }
          }
        }
        saveArtworkData(selectedType);
      } else {
        // Se cambió de categoría entre Cuadro, Dibujo o Foto
        if (originalType === 'paint') {
          paintings = paintings.filter(p => p.id !== itemId);
        } else if (originalType === 'drawing') {
          drawings = drawings.filter(p => p.id !== itemId);
        } else if (originalType === 'photo') {
          photographs = photographs.filter(p => p.id !== itemId);
        }

        if (selectedType === 'paint') {
          paintings.unshift({
            id: itemId,
            image: currentUploadedImageBase64,
            size: size,
            title: { es: title, en: title, fr: title, eu: title },
            description: { es: description, en: description, fr: description, eu: description },
            technique: { es: technique, en: technique, fr: technique, eu: technique }
          });
        } else if (selectedType === 'drawing') {
          drawings.unshift({
            id: itemId,
            image: currentUploadedImageBase64,
            size: size,
            title: { es: title, en: title, fr: title, eu: title },
            description: { es: description, en: description, fr: description, eu: description },
            technique: { es: technique, en: technique, fr: technique, eu: technique }
          });
        } else if (selectedType === 'photo') {
          photographs.unshift({
            id: itemId,
            image: currentUploadedImageBase64,
            size: size,
            title: { es: title, en: title, fr: title, eu: title },
            description: { es: description, en: description, fr: description, eu: description },
            other: { es: other, en: other, fr: other, eu: other }
          });
        }
        saveArtworkData('all');
      }

      showFormFeedback(uiTranslations[currentLang]['gestion.successUpdate'], 'success');
      cancelEdit(typeToPreserve, true);

    } else {
      // MODO CREACIÓN: Nueva obra
      if (selectedType === 'paint') {
        const newPainting = {
          id: `paint-${Date.now()}`,
          image: currentUploadedImageBase64,
          size: size,
          title: { es: title, en: title, fr: title, eu: title },
          description: { es: description, en: description, fr: description, eu: description },
          technique: { es: technique, en: technique, fr: technique, eu: technique }
        };
        paintings.unshift(newPainting);
        saveArtworkData('paint');
      } else if (selectedType === 'drawing') {
        const newDrawing = {
          id: `drawing-${Date.now()}`,
          image: currentUploadedImageBase64,
          size: size,
          title: { es: title, en: title, fr: title, eu: title },
          description: { es: description, en: description, fr: description, eu: description },
          technique: { es: technique, en: technique, fr: technique, eu: technique }
        };
        drawings.unshift(newDrawing);
        saveArtworkData('drawing');
      } else {
        const newPhoto = {
          id: `photo-${Date.now()}`,
          image: currentUploadedImageBase64,
          size: size,
          title: { es: title, en: title, fr: title, eu: title },
          description: { es: description, en: description, fr: description, eu: description },
          other: { es: other, en: other, fr: other, eu: other }
        };
        photographs.unshift(newPhoto);
        saveArtworkData('photo');
      }

      showFormFeedback(uiTranslations[currentLang]['gestion.successAdd'], 'success');
      cancelEdit(typeToPreserve, true);
    }

    // Refrescar vistas
    renderGalleries();
    renderManagementList();
  });
}

// --- SUB-PESTAÑAS EN LA SECCIÓN GESTIÓN ---
function setupGestionTabs() {
  const tabBtnArtworks = document.getElementById('tabBtnArtworks');
  const tabBtnProfile = document.getElementById('tabBtnProfile');
  const panelArtworks = document.getElementById('gestionObrasPanel');
  const panelProfile = document.getElementById('gestionPerfilPanel');
  const tabsNav = document.querySelector('.gestion-tabs-nav');

  if (!tabBtnArtworks || !tabBtnProfile || !panelArtworks || !panelProfile) return;

  function switchTab(tab) {
    if (tab === 'obras') {
      tabBtnArtworks.classList.add('active');
      tabBtnArtworks.setAttribute('aria-selected', 'true');
      tabBtnProfile.classList.remove('active');
      tabBtnProfile.setAttribute('aria-selected', 'false');
      panelArtworks.style.display = 'block';
      panelProfile.style.display = 'none';
    } else {
      tabBtnProfile.classList.add('active');
      tabBtnProfile.setAttribute('aria-selected', 'true');
      tabBtnArtworks.classList.remove('active');
      tabBtnArtworks.setAttribute('aria-selected', 'false');
      panelProfile.style.display = 'block';
      panelArtworks.style.display = 'none';
      populateProfileForm();
    }
  }

  // Delegación en el contenedor padre para evitar fallos si se pulsa sobre iconos o texto
  if (tabsNav) {
    tabsNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.gestion-tab-btn');
      if (!btn) return;
      const tab = btn.getAttribute('data-tab') || (btn.id === 'tabBtnProfile' ? 'perfil' : 'obras');
      switchTab(tab);
    });
  } else {
    tabBtnArtworks.addEventListener('click', () => switchTab('obras'));
    tabBtnProfile.addEventListener('click', () => switchTab('perfil'));
  }
}

// Variable para la imagen temporal del perfil cargada
let currentProfilePhotoBase64 = '';

function populateProfileForm() {
  const nameInput = document.getElementById('profileNameInput');
  const subtitleInput = document.getElementById('profileSubtitleInput');
  const bioLeadInput = document.getElementById('profileBioLeadInput');
  const bio2Input = document.getElementById('profileBio2Input');
  const bio3Input = document.getElementById('profileBio3Input');
  const techInput = document.getElementById('profileTechniqueInput');
  const focusInput = document.getElementById('profileFocusInput');
  const locInput = document.getElementById('profileLocationInput');
  const previewImg = document.getElementById('profilePhotoPreview');
  const previewContainer = document.getElementById('profilePhotoPreviewContainer');
  const promptContainer = document.getElementById('profileDropzonePrompt');
  const fileInput = document.getElementById('profilePhotoInput');

  if (nameInput) nameInput.value = artistProfile.name || '';
  if (subtitleInput) subtitleInput.value = (artistProfile.subtitle && (artistProfile.subtitle[currentLang] || artistProfile.subtitle['es'])) || '';
  if (bioLeadInput) bioLeadInput.value = (artistProfile.bioLead && (artistProfile.bioLead[currentLang] || artistProfile.bioLead['es'])) || '';
  if (bio2Input) bio2Input.value = (artistProfile.bio2 && (artistProfile.bio2[currentLang] || artistProfile.bio2['es'])) || '';
  if (bio3Input) bio3Input.value = (artistProfile.bio3 && (artistProfile.bio3[currentLang] || artistProfile.bio3['es'])) || '';
  if (techInput) techInput.value = (artistProfile.technique && (artistProfile.technique[currentLang] || artistProfile.technique['es'])) || '';
  if (focusInput) focusInput.value = (artistProfile.focus && (artistProfile.focus[currentLang] || artistProfile.focus['es'])) || '';
  if (locInput) locInput.value = (artistProfile.location && (artistProfile.location[currentLang] || artistProfile.location['es'])) || '';

  currentProfilePhotoBase64 = artistProfile.photo || '';
  if (currentProfilePhotoBase64 && previewImg && previewContainer && promptContainer) {
    previewImg.src = currentProfilePhotoBase64;
    previewContainer.style.display = 'inline-block';
    promptContainer.style.display = 'none';
  } else if (previewImg && previewContainer && promptContainer) {
    previewImg.src = '';
    previewContainer.style.display = 'none';
    promptContainer.style.display = 'flex';
  }
  if (fileInput) fileInput.value = '';
}

function showProfileFeedback(message, type = 'success') {
  const feedback = document.getElementById('profileFormFeedback');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.className = `form-feedback ${type}`;
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setTimeout(() => {
    if (feedback.classList.contains('success')) {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    }
  }, 6000);
}

// --- CONFIGURACIÓN DEL FORMULARIO DE PERFIL ---
function setupProfileForm() {
  const form = document.getElementById('profileForm');
  const fileInput = document.getElementById('profilePhotoInput');
  const dropzone = document.getElementById('profilePhotoDropzone');
  const promptContainer = document.getElementById('profileDropzonePrompt');
  const previewContainer = document.getElementById('profilePhotoPreviewContainer');
  const previewImg = document.getElementById('profilePhotoPreview');
  const removePhotoBtn = document.getElementById('btnRemoveProfilePhoto');
  const resetBtn = document.getElementById('btnResetProfile');

  if (!form) return;

  // Carga inicial de datos en el formulario
  populateProfileForm();

  // Procesar archivo con FileReader
  function handleProfilePhoto(file) {
    if (!file || !file.type.startsWith('image/')) {
      showProfileFeedback(uiTranslations[currentLang]['gestion.errorImage'], 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentProfilePhotoBase64 = e.target.result;
      if (previewImg) previewImg.src = currentProfilePhotoBase64;
      if (previewContainer) previewContainer.style.display = 'inline-block';
      if (promptContainer) promptContainer.style.display = 'none';
      if (dropzone) dropzone.classList.remove('dragover');
    };
    reader.onerror = () => {
      showProfileFeedback('Error al leer el archivo de imagen.', 'error');
    };
    reader.readAsDataURL(file);
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleProfilePhoto(file);
    });
  }

  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      if (file) {
        fileInput.files = dt.files;
        handleProfilePhoto(file);
      }
    });
  }

  // Quitar foto de perfil
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentProfilePhotoBase64 = '';
      if (fileInput) fileInput.value = '';
      if (previewImg) previewImg.src = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (promptContainer) promptContainer.style.display = 'flex';
    });
  }

  // Guardar perfil
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('profileNameInput').value.trim();
    const subtitle = document.getElementById('profileSubtitleInput').value.trim();
    const bioLead = document.getElementById('profileBioLeadInput').value.trim();
    const bio2 = document.getElementById('profileBio2Input').value.trim();
    const bio3 = document.getElementById('profileBio3Input').value.trim();
    const technique = document.getElementById('profileTechniqueInput').value.trim();
    const focus = document.getElementById('profileFocusInput').value.trim();
    const location = document.getElementById('profileLocationInput').value.trim();

    if (!name || !subtitle || !bioLead || !bio2 || !bio3 || !technique || !focus || !location) {
      showProfileFeedback(uiTranslations[currentLang]['gestion.errorRequired'], 'error');
      return;
    }

    artistProfile.name = name;
    artistProfile.photo = currentProfilePhotoBase64;

    // Actualizar campos multiidioma
    const textFields = [
      { key: 'subtitle', val: subtitle },
      { key: 'bioLead', val: bioLead },
      { key: 'bio2', val: bio2 },
      { key: 'bio3', val: bio3 },
      { key: 'technique', val: technique },
      { key: 'focus', val: focus },
      { key: 'location', val: location }
    ];

    textFields.forEach(({ key, val }) => {
      if (!artistProfile[key] || typeof artistProfile[key] !== 'object') {
        artistProfile[key] = { es: val, en: val, fr: val, eu: val };
      } else {
        artistProfile[key][currentLang] = val;
        // Si las otras traducciones están vacías o no existen, asignarles este valor para evitar textos rotos
        ['es', 'en', 'fr', 'eu'].forEach(lang => {
          if (!artistProfile[key][lang]) {
            artistProfile[key][lang] = val;
          }
        });
      }
    });

    saveArtistProfile();
    renderArtistProfile();
    showProfileFeedback(uiTranslations[currentLang]['gestion.profile.successSave'], 'success');
  });

  // Restablecer valores por defecto
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const confirmMsg = uiTranslations[currentLang]['gestion.profile.confirmReset'];
      if (window.confirm(confirmMsg)) {
        artistProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
        saveArtistProfile();
        renderArtistProfile();
        populateProfileForm();
        showProfileFeedback(uiTranslations[currentLang]['gestion.profile.successReset'], 'success');
      }
    });
  }
}

// --- FUNCIÓN DE TRADUCCIÓN ---
function applyLanguage(lang) {
  currentLang = lang;
  
  try {
    localStorage.setItem('selectedLang', lang);
  } catch (e) {
    // Silencia errores de escritura de localStorage en entornos locales estrictos
  }
  
  // Traducir títulos y textos estáticos de la interfaz
  const i18nElements = document.querySelectorAll('[data-i18n]');
  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (uiTranslations[lang] && uiTranslations[lang][key]) {
      if (el.tagName === 'TITLE') {
        document.title = uiTranslations[lang][key];
      } else {
        el.textContent = uiTranslations[lang][key];
      }
    }
  });

  // Traducir atributos especiales (por ejemplo: aria-label, title)
  const i18nAttrs = document.querySelectorAll('[data-i18n-attr]');
  i18nAttrs.forEach(el => {
    const attrConfig = el.getAttribute('data-i18n-attr');
    const [attrName, key] = attrConfig.split(':');
    if (uiTranslations[lang] && uiTranslations[lang][key]) {
      el.setAttribute(attrName, uiTranslations[lang][key]);
    }
  });

  // Re-renderizar galerías, tabla de gestión y perfil de la artista con el nuevo idioma
  renderGalleries();
  renderManagementList();
  renderArtistProfile();
  populateProfileForm();

  // Actualizar botones de cambio de idioma
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Si el lightbox está abierto, actualizar su contenido al vuelo
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox && lightbox.classList.contains('active')) {
    updateLightboxContent();
  }
}

// --- CONFIGURACIÓN DE SELECTORES DE IDIOMA ---
function setupLanguageSwitcher() {
  const switcher = document.querySelector('.lang-switcher');
  if (switcher) {
    switcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (btn) {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
      }
    });
  }
}

// --- ACTUALIZADOR DE CONTENIDO DE LIGHTBOX ---
function updateLightboxContent() {
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxDesc = document.getElementById('lightboxDesc');
  
  const metaLabel1 = document.getElementById('lightboxMetaLabel1');
  const metaVal1 = document.getElementById('lightboxMetaVal1');
  const metaLabel2 = document.getElementById('lightboxMetaLabel2');
  const metaVal2 = document.getElementById('lightboxMetaVal2');

  // Si no se han cargado todavía o no existen, cancelar para evitar cuelgues
  if (!lightboxImg || !lightboxTitle) return;

  let data;
  if (currentGalleryType === 'photo') {
    data = photographs;
  } else if (currentGalleryType === 'drawing') {
    data = drawings;
  } else {
    data = paintings;
  }
  const item = data[currentGalleryIndex];
  if (!item) return;
  
  const title = item.title[currentLang] || item.title['es'] || '';
  const desc = item.description[currentLang] || item.description['es'] || '';

  lightboxImg.src = item.image;
  lightboxImg.alt = title;
  lightboxTitle.textContent = title;
  
  if (currentGalleryType === 'photo') {
    const other = item.other[currentLang] || item.other['es'] || '';
    lightboxTag.textContent = uiTranslations[currentLang]['lightbox.photoTag'];
    lightboxDesc.textContent = desc;
    
    metaLabel1.textContent = uiTranslations[currentLang]['lightbox.meta.contest'];
    metaVal1.textContent = other;
    metaLabel2.textContent = uiTranslations[currentLang]['lightbox.meta.size'];
    metaVal2.textContent = item.size;
  } else if (currentGalleryType === 'drawing') {
    const technique = item.technique[currentLang] || item.technique['es'] || '';
    lightboxTag.textContent = uiTranslations[currentLang]['lightbox.drawingTag'];
    lightboxDesc.textContent = desc;
    
    metaLabel1.textContent = uiTranslations[currentLang]['lightbox.meta.technique'];
    metaVal1.textContent = technique;
    metaLabel2.textContent = uiTranslations[currentLang]['lightbox.meta.size'];
    metaVal2.textContent = item.size;
  } else {
    const technique = item.technique[currentLang] || item.technique['es'] || '';
    lightboxTag.textContent = uiTranslations[currentLang]['lightbox.paintTag'];
    lightboxDesc.textContent = desc;
    
    metaLabel1.textContent = uiTranslations[currentLang]['lightbox.meta.technique'];
    metaVal1.textContent = technique;
    metaLabel2.textContent = uiTranslations[currentLang]['lightbox.meta.size'];
    metaVal2.textContent = item.size;
  }
}

// ============================================================================
// SEGURIDAD Y CONTROL DE ACCESO (ADMINISTRADOR)
// ============================================================================
// Hash SHA-256 de la contraseña predeterminada ('admin1234').
// Para cambiar la contraseña por tu propia clave personal:
// 1. Abre la consola de desarrollador del navegador (F12 -> Console).
// 2. Ejecuta el siguiente comando sustituyendo 'TuNuevaClave' por la contraseña que desees:
//    crypto.subtle.digest('SHA-256', new TextEncoder().encode('TuNuevaClave'))
//      .then(buf => console.log(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')));
// 3. Copia la cadena hexadecimal resultante (64 caracteres) y pégala como valor de ADMIN_PASSWORD_HASH.
const ADMIN_PASSWORD_HASH = 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270';

async function computeSha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
  } catch (e) {
    return false;
  }
}

function updateAdminUI() {
  const isAuth = isAdminAuthenticated();
  const navItem = document.getElementById('navItemGestion');
  if (navItem) {
    navItem.style.display = isAuth ? 'block' : 'none';
  }
  const btnLock = document.getElementById('btnAdminLock');
  if (btnLock) {
    btnLock.classList.toggle('logged-in', isAuth);
  }
}

function openAuthModal() {
  const modal = document.getElementById('authModal');
  const input = document.getElementById('adminPasswordInput');
  const errorMsg = document.getElementById('authErrorMsg');
  if (!modal) return;

  if (errorMsg) {
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';
  }
  if (input) {
    input.value = '';
    input.type = 'password';
  }
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    if (input) input.focus();
  }, 100);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  const input = document.getElementById('adminPasswordInput');
  const errorMsg = document.getElementById('authErrorMsg');
  if (!modal) return;

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (input) input.value = '';
  if (errorMsg) {
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';
  }
}

function showAuthError(msg) {
  const errorMsg = document.getElementById('authErrorMsg');
  if (!errorMsg) return;
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
  errorMsg.classList.remove('shake');
  void errorMsg.offsetWidth; // Forzar reflow para reiniciar la animación shake
  errorMsg.classList.add('shake');
}

async function handleAdminLogin(password) {
  if (!password) {
    showAuthError(uiTranslations[currentLang]['auth.errorIncorrectPassword']);
    return;
  }

  try {
    const hash = await computeSha256(password);
    if (hash === ADMIN_PASSWORD_HASH) {
      try {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
      } catch (e) {
        console.warn('sessionStorage not available.');
      }
      updateAdminUI();
      closeAuthModal();
      window.location.hash = 'gestion';
    } else {
      showAuthError(uiTranslations[currentLang]['auth.errorIncorrectPassword']);
    }
  } catch (err) {
    console.error('Error in crypto validation:', err);
    showAuthError('Error criptográfico al validar la clave.');
  }
}

function handleAdminLogout() {
  try {
    sessionStorage.removeItem('isAdminLoggedIn');
  } catch (e) {}
  updateAdminUI();
  window.location.hash = 'inicio';
}

function setupAdminAuth() {
  const modal = document.getElementById('authModal');
  const form = document.getElementById('adminLoginForm');
  const passwordInput = document.getElementById('adminPasswordInput');
  const btnClose = document.getElementById('btnCloseAuthModal');
  const btnCancel = document.getElementById('btnCancelAuth');
  const btnLock = document.getElementById('btnAdminLock');
  const btnLogout = document.getElementById('btnAdminLogout');
  const btnTogglePassword = document.getElementById('btnTogglePassword');

  // 1. Candado en el footer del sidebar
  if (btnLock) {
    btnLock.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAdminAuthenticated()) {
        window.location.hash = 'gestion';
      } else {
        openAuthModal();
      }
    });
  }

  // 2. Botón de Cerrar Sesión en la cabecera de Gestión
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      handleAdminLogout();
    });
  }

  // 3. Envío del formulario de autenticación
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = passwordInput ? passwordInput.value : '';
      handleAdminLogin(pass);
    });
  }

  // 4. Botones de cerrar / cancelar
  if (btnClose) btnClose.addEventListener('click', closeAuthModal);
  if (btnCancel) btnCancel.addEventListener('click', closeAuthModal);

  // 5. Cierre al hacer clic sobre el fondo del modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAuthModal();
      }
    });
  }

  // 6. Alternar visibilidad de la contraseña
  if (btnTogglePassword && passwordInput) {
    btnTogglePassword.addEventListener('click', () => {
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
    });
  }

  // 7. Atajos globales: Ctrl + Shift + A (abrir/acceder) y Escape (cerrar modal)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      if (isAdminAuthenticated()) {
        window.location.hash = 'gestion';
      } else {
        openAuthModal();
      }
    } else if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeAuthModal();
    }
  });

  // Estado inicial de la interfaz según la sesión activa
  updateAdminUI();
}

// --- CONTROLADOR DE LA NAVEGACIÓN ---
function navigateToSection(sectionId) {
  // Protección de acceso: si se intenta acceder a 'gestion' sin estar autenticado, redirigir a 'inicio'
  if (sectionId === 'gestion' && !isAdminAuthenticated()) {
    window.location.hash = 'inicio';
    navigateToSection('inicio');
    return;
  }

  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const targetSection = document.getElementById(sectionId);
  const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  
  if (targetSection) {
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    targetSection.classList.add('active');
    if (targetLink) {
      targetLink.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const heroButtons = document.querySelectorAll('.hero-actions a');

  // Interceptar clicks de menú y delegar al hash
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      window.location.hash = sectionId;
      
      // Cerrar menú móvil si está activo
      if (typeof window.closeMobileSidebar === 'function') {
        window.closeMobileSidebar();
      }
    });
  });
  
  // Interceptar clicks en botones de llamada a la acción en inicio
  heroButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = btn.getAttribute('href').substring(1);
      window.location.hash = sectionId;
    });
  });

  // Reaccionar ante el cambio de hash (Routing nativo que sincroniza historial y links)
  window.addEventListener('hashchange', () => {
    let hash = window.location.hash.substring(1) || 'inicio';
    if (hash === 'gestion' && !isAdminAuthenticated()) {
      hash = 'inicio';
      window.location.hash = 'inicio';
    }
    navigateToSection(hash);
  });
  
  // Navegar inicialmente según hash actual al cargar la página
  let initialHash = window.location.hash.substring(1) || 'inicio';
  if (initialHash === 'gestion' && !isAdminAuthenticated()) {
    initialHash = 'inicio';
    window.location.hash = 'inicio';
  }
  navigateToSection(initialHash);
}

// --- MENÚ MÓVIL ---
function setupMobileMenu() {
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const sidebar = document.getElementById('sidebar-navigation');
  const overlay = document.getElementById('sidebarOverlay');

  if (!mobileNavToggle || !sidebar || !overlay) return;

  function toggleSidebar() {
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  function closeMobileSidebar() {
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileNavToggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeMobileSidebar);

  // Compartir función globalmente para navegación
  window.closeMobileSidebar = closeMobileSidebar;
}

// --- CONTROLADOR DE LIGHTBOX ---
let currentGalleryType = '';
let currentGalleryIndex = 0;

function setupLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!lightbox || !lightboxClose || !lightboxPrev || !lightboxNext) return;

  function openLightbox(type, index) {
    currentGalleryType = type;
    currentGalleryIndex = parseInt(index);
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    let data;
    if (currentGalleryType === 'photo') data = photographs;
    else if (currentGalleryType === 'drawing') data = drawings;
    else data = paintings;
    currentGalleryIndex = (currentGalleryIndex + 1) % data.length;
    updateLightboxContent();
  }

  function showPrev() {
    let data;
    if (currentGalleryType === 'photo') data = photographs;
    else if (currentGalleryType === 'drawing') data = drawings;
    else data = paintings;
    currentGalleryIndex = (currentGalleryIndex - 1 + data.length) % data.length;
    updateLightboxContent();
  }

  // Delegar clics en tarjetas de la galería
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.art-card');
    if (card) {
      const type = card.getAttribute('data-type');
      const index = card.getAttribute('data-index');
      openLightbox(type, index);
    }
  });

  // Controles del Lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  // Cerrar al pulsar fuera de la caja de contenido
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Controles de teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadArtworkData();
  setupLanguageSwitcher();
  setupArtworkForm();
  setupManagementTable();
  setupDeepSeekAiAssistant();
  setupGestionTabs();
  setupProfileForm();
  applyLanguage(currentLang); // Renderiza galerías, tabla, perfil y aplica idioma
  setupAdminAuth();
  setupMobileMenu();
  setupNavigation();
  setupLightbox();
});
