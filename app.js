/**
 * Rosa Martín - Art Portfolio Web Application
 * Interactivity, Dynamic rendering, Navigation, Multi-language Support & Lightbox controller.
 */

// --- ESTADO GLOBAL DE IDIOMA CON CONTROL DE ERRORES (CORS/LOCAL) ---
let currentLang = 'es';
try {
  currentLang = localStorage.getItem('selectedLang') || 'es';
} catch (e) {
  console.warn("localStorage is not accessible in this environment. Defaulting to 'es'.");
}

// --- BASE DE DATOS TRADUCIDA ---
const photographs = [
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

const paintings = [
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

// --- DICCIONARIO DE TRADUCCIONES DE LA INTERFAZ (UI) ---
const uiTranslations = {
  es: {
    'head.title': 'Rosa Martín | Galería de Arte y Fotografía',
    'sidebar.subtitle': 'Arte & Fotografía',
    'nav.inicio': 'Inicio',
    'nav.sobreMi': 'Sobre mí',
    'nav.fotografias': 'Fotografías',
    'nav.cuadros': 'Cuadros',
    'hero.pretitle': 'Bienvenidos',
    'hero.title': 'Explorando el mundo a través del lienzo y el visor',
    'hero.lead': 'Una muestra personal donde el arte clásico del acrílico se funde con la espontaneidad y la belleza de la fotografía artística.',
    'hero.btnPrimary': 'Ver Óleos y Acrílicos',
    'hero.btnSecondary': 'Explorar Galería de Fotos',
    'features.paint.title': 'Pinturas y Cuadros',
    'features.paint.desc': 'Creaciones en acrílico que reflejan la pasión por el color, la textura y las formas inspiradas en la naturaleza. Cada obra cuenta una historia íntima plasmada en lienzo.',
    'features.photo.title': 'Fotografía de Concurso',
    'features.photo.desc': 'Instantes congelados en el tiempo. Fotografías cuidadosamente seleccionadas y presentadas a certámenes locales y nacionales, buscando siempre la luz perfecta y la emoción oculta.',
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
    'card.photo': 'Fotografía',
    'card.paint': 'Pintura',
    'lightbox.close': 'Cerrar',
    'lightbox.prev': 'Imagen anterior',
    'lightbox.next': 'Siguiente imagen',
    'lightbox.meta.contest': 'Detalle de Concurso',
    'lightbox.meta.technique': 'Técnica',
    'lightbox.meta.size': 'Medidas',
    'lightbox.meta.secondPlace': 'Segunda posición',
    'lightbox.photoTag': 'Fotografía',
    'lightbox.paintTag': 'Pintura Acrílica'
  },
  en: {
    'head.title': 'Rosa Martín | Art & Photography Gallery',
    'sidebar.subtitle': 'Art & Photography',
    'nav.inicio': 'Home',
    'nav.sobreMi': 'About me',
    'nav.fotografias': 'Photographs',
    'nav.cuadros': 'Paintings',
    'hero.pretitle': 'Welcome',
    'hero.title': 'Exploring the world through canvas and viewfinder',
    'hero.lead': 'A personal showcase where the classic art of acrylic blends with the spontaneity and beauty of artistic photography.',
    'hero.btnPrimary': 'View Oils & Acrylics',
    'hero.btnSecondary': 'Explore Photo Gallery',
    'features.paint.title': 'Paintings & Canvases',
    'features.paint.desc': 'Acrylic creations reflecting a passion for color, texture, and shapes inspired by nature. Each piece tells an intimate story captured on canvas.',
    'features.photo.title': 'Contest Photography',
    'features.photo.desc': 'Instants frozen in time. Carefully selected photographs submitted to local and national exhibitions, always seeking the perfect light and hidden emotion.',
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
    'card.photo': 'Photograph',
    'card.paint': 'Painting',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous image',
    'lightbox.next': 'Next image',
    'lightbox.meta.contest': 'Contest Detail',
    'lightbox.meta.technique': 'Technique',
    'lightbox.meta.size': 'Dimensions',
    'lightbox.meta.secondPlace': 'Second place',
    'lightbox.photoTag': 'Photograph',
    'lightbox.paintTag': 'Acrylic Painting'
  },
  fr: {
    'head.title': "Rosa Martín | Galerie d'Art & Photographie",
    'sidebar.subtitle': 'Art & Photographie',
    'nav.inicio': 'Accueil',
    'nav.sobreMi': 'À propos',
    'nav.fotografias': 'Photographies',
    'nav.cuadros': 'Tableaux',
    'hero.pretitle': 'Bienvenue',
    'hero.title': 'Explorer le monde à travers la toile et le viseur',
    'hero.lead': "Une exposition personnelle où l'art classique de l'acrylique se mêle à la spontanéité et la beauté de la photographie artistique.",
    'hero.btnPrimary': 'Voir les Huiles & Acryliques',
    'hero.btnSecondary': 'Explorer la Galerie Photo',
    'features.paint.title': 'Peintures & Tableaux',
    'features.paint.desc': "Des créations à l'acrylique qui reflètent la passion pour la couleur, la texture et les formes inspirées de la nature. Chaque œuvre raconte une histoire intime sur toile.",
    'features.photo.title': 'Photographie de Concours',
    'features.photo.desc': "Des instants figés dans le temps. Photographies soigneusement sélectionnées et présentées à des concours locaux et nationaux, recherchant toujours la lumière idéale et l'émotion cachée.",
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
    'card.photo': 'Photographie',
    'card.paint': 'Peinture',
    'lightbox.close': 'Fermer',
    'lightbox.prev': 'Image précédente',
    'lightbox.next': 'Image suivante',
    'lightbox.meta.contest': 'Détail du Concours',
    'lightbox.meta.technique': 'Technique',
    'lightbox.meta.size': 'Dimensions',
    'lightbox.meta.secondPlace': 'Deuxième place',
    'lightbox.photoTag': 'Photographie',
    'lightbox.paintTag': 'Peinture Acrylique'
  },
  eu: {
    'head.title': 'Rosa Martín | Arte eta Argazkilaritza Galeria',
    'sidebar.subtitle': 'Artea & Argazkilaritza',
    'nav.inicio': 'Hasiera',
    'nav.sobreMi': 'Niri buruz',
    'nav.fotografias': 'Argazkiak',
    'nav.cuadros': 'Margolanak',
    'hero.pretitle': 'Ongi etorri',
    'hero.title': 'Mundua mihisearen eta bisorearen bitartez arakatzen',
    'hero.lead': 'Erakusketa pertsonala, non akrilikoaren arte klasikoa argazkilaritza artistikoaren bat-batekotasunarekin eta edertasunarekin batzen den.',
    'hero.btnPrimary': 'Margolanak eta Akrilikoak Ikusi',
    'hero.btnSecondary': 'Argazki Galeria Arakatu',
    'features.paint.title': 'Margolanak eta Koadroak',
    'features.paint.desc': 'Naturan inspiratutako kolore, testura eta formekiko pasioa islatzen duten sorkuntza akrilikoak. Lan bakoitzak mihisean adierazitako istorio intimo bat kontatzen du.',
    'features.photo.title': 'Lehiaketa Argazkilaritza',
    'features.photo.desc': 'Denboran izoztutako uneak. Arretaz hautatutako argazkiak, tokiko eta nazioko lehiaketetara aurkeztuak, argi perfektua eta ezkutuko emozioa bilatuz.',
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
    'card.photo': 'Argazkia',
    'card.paint': 'Margolana',
    'lightbox.close': 'Itxi',
    'lightbox.prev': 'Aurreko irudia',
    'lightbox.next': 'Hurrengo irudia',
    'lightbox.meta.contest': 'Lehiaketaren Xehetasunak',
    'lightbox.meta.technique': 'Teknika',
    'lightbox.meta.size': 'Neurriak',
    'lightbox.meta.secondPlace': 'Bigarren postua',
    'lightbox.photoTag': 'Argazkia',
    'lightbox.paintTag': 'Margolan Akrilikoa'
  }
};

// --- RENDERIZADO DE LAS GALERÍAS ---
function renderGalleries() {
  const photosContainer = document.getElementById('photosGallery');
  const paintingsContainer = document.getElementById('paintingsGallery');
  
  if (photosContainer) {
    photosContainer.innerHTML = photographs.map((photo, index) => `
      <article class="art-card" data-type="photo" data-index="${index}">
        <div class="card-image-wrapper">
          <img src="${photo.image}" alt="${photo.title[currentLang]}" loading="lazy">
          <div class="card-overlay">
            <div class="overlay-details">
              <span class="overlay-title">${photo.title[currentLang]}</span>
              <div class="overlay-meta">
                <span>${uiTranslations[currentLang]['card.photo']}</span>
                <span>${photo.size}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${photo.title[currentLang]}</h3>
            <span class="card-tag">${uiTranslations[currentLang]['card.photo']}</span>
          </div>
          <p class="card-desc">${photo.description[currentLang]}</p>
          <div class="card-footer">
            <div class="meta-item">
              <span>${photo.size}</span>
            </div>
            <span style="max-width: 70%; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${uiTranslations[currentLang]['lightbox.meta.secondPlace']}
            </span>
          </div>
        </div>
      </article>
    `).join('');
  }
  
  if (paintingsContainer) {
    paintingsContainer.innerHTML = paintings.map((paint, index) => `
      <article class="art-card" data-type="paint" data-index="${index}">
        <div class="card-image-wrapper">
          <img src="${paint.image}" alt="${paint.title[currentLang]}" loading="lazy">
          <div class="card-overlay">
            <div class="overlay-details">
              <span class="overlay-title">${paint.title[currentLang]}</span>
              <div class="overlay-meta">
                <span>${uiTranslations[currentLang]['card.paint']}</span>
                <span>${paint.size}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${paint.title[currentLang]}</h3>
            <span class="card-tag">${uiTranslations[currentLang]['card.paint']}</span>
          </div>
          <p class="card-desc">${paint.description[currentLang]}</p>
          <div class="card-footer">
            <div class="meta-item">
              <span>${paint.technique[currentLang]}</span>
            </div>
            <span>${paint.size}</span>
          </div>
        </div>
      </article>
    `).join('');
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

  // Traducir atributos especiales (por ejemplo: aria-label)
  const i18nAttrs = document.querySelectorAll('[data-i18n-attr]');
  i18nAttrs.forEach(el => {
    const attrConfig = el.getAttribute('data-i18n-attr');
    const [attrName, key] = attrConfig.split(':');
    if (uiTranslations[lang] && uiTranslations[lang][key]) {
      el.setAttribute(attrName, uiTranslations[lang][key]);
    }
  });

  // Re-renderizar galerías con los datos del nuevo idioma
  renderGalleries();

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

  const data = currentGalleryType === 'photo' ? photographs : paintings;
  const item = data[currentGalleryIndex];
  if (!item) return;
  
  lightboxImg.src = item.image;
  lightboxImg.alt = item.title[currentLang];
  lightboxTitle.textContent = item.title[currentLang];
  
  if (currentGalleryType === 'photo') {
    lightboxTag.textContent = uiTranslations[currentLang]['lightbox.photoTag'];
    lightboxDesc.textContent = item.description[currentLang];
    
    metaLabel1.textContent = uiTranslations[currentLang]['lightbox.meta.contest'];
    metaVal1.textContent = item.other[currentLang];
    metaLabel2.textContent = uiTranslations[currentLang]['lightbox.meta.size'];
    metaVal2.textContent = item.size;
  } else {
    lightboxTag.textContent = uiTranslations[currentLang]['lightbox.paintTag'];
    lightboxDesc.textContent = item.description[currentLang];
    
    metaLabel1.textContent = uiTranslations[currentLang]['lightbox.meta.technique'];
    metaVal1.textContent = item.technique[currentLang];
    metaLabel2.textContent = uiTranslations[currentLang]['lightbox.meta.size'];
    metaVal2.textContent = item.size;
  }
}

// --- CONTROLADOR DE LA NAVEGACIÓN ---
function navigateToSection(sectionId) {
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
    const hash = window.location.hash.substring(1) || 'inicio';
    navigateToSection(hash);
  });
  
  // Navegar inicialmente según hash actual al cargar la página
  const initialHash = window.location.hash.substring(1) || 'inicio';
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
    const data = currentGalleryType === 'photo' ? photographs : paintings;
    currentGalleryIndex = (currentGalleryIndex + 1) % data.length;
    updateLightboxContent();
  }

  function showPrev() {
    const data = currentGalleryType === 'photo' ? photographs : paintings;
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
  setupLanguageSwitcher();
  applyLanguage(currentLang); // Renderiza galerías y aplica idioma
  setupMobileMenu();
  setupNavigation();
  setupLightbox();
});
