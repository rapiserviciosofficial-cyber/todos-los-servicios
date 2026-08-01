export const WA_LINK =
  "https://wa.me/529632252742?text=Hola%2C%20vengo%20del%20directorio%20Todos%20los%20Servicios%20de%20Las%20Margaritas%20%F0%9F%99%8C";

/* Número de la central telefónica (mostrado en pantalla) */
export const CENTRAL_PHONE = "963 225 2742";

/* Dígitos de la central para armar enlaces wa.me con mensajes personalizados */
export const CENTRAL_WA = "529632252742";

export const tradesMarquee = [
  "Plomería",
  "Electricidad",
  "Carpintería",
  "Herrería",
  "Costura",
  "Albañilería",
  "Mecánica",
  "Belleza",
  "Jardinería",
  "Café de altura",
  "Bordados",
  "Panadería",
  "Pintura",
  "Transporte",
  "Fotografía",
  "Masajes",
];

export const searchChips = [
  "Plomero",
  "Electricista",
  "Carpintero",
  "Bordados",
  "Mecánico",
  "Jardinero",
  "Estilista",
  "Café",
  "Albañil",
  "Panadería",
];

export type DeckCard = {
  name: string;
  oficio: string;
  colonia: string;
  rating: number;
  reviews: number;
  desde: string;
  img: string;
  alt: string;
  disp: string;
  cat: string;
};

export const deckCards: DeckCard[] = [
  {
    name: "Rosa Hernández Luna",
    oficio: "Bordados y textiles",
    colonia: "Col. Centro",
    rating: 4.9,
    reviews: 212,
    desde: "$150",
    img: "/images/bordadora.jpg",
    alt: "Rosa Hernández, bordadora de Las Margaritas, con textiles tejidos a mano",
    disp: "Disponible hoy",
    cat: "Creativo",
  },
  {
    name: "Kevin Ramírez Gtz.",
    oficio: "Electricidad certificada",
    colonia: "Col. El Carmen",
    rating: 5.0,
    reviews: 98,
    desde: "$180",
    img: "/images/electricista.jpg",
    alt: "Kevin Ramírez, electricista certificado trabajando en un panel",
    disp: "Urgencias 24 h",
    cat: "Hogar",
  },
  {
    name: "Miguel Pérez Solís",
    oficio: "Carpintería fina",
    colonia: "Barrio San José",
    rating: 4.8,
    reviews: 164,
    desde: "$250",
    img: "/images/carpintero.jpg",
    alt: "Miguel Pérez, carpintero en su taller con cepillo de mano",
    disp: "Agenda esta semana",
    cat: "Hogar",
  },
  {
    name: "Familia Gómez Díaz",
    oficio: "Café de altura",
    colonia: "Ejido Veracruz",
    rating: 4.9,
    reviews: 301,
    desde: "$120/kg",
    img: "/images/cafetalera.jpg",
    alt: "Familia cafetalera del ejido Veracruz con cerezas de café recién cortadas",
    disp: "Cosecha nueva",
    cat: "Campo",
  },
];

export const stats = [
  { to: 348, suffix: "+", label: "oficios publicados" },
  { to: 5214, suffix: "", label: "servicios completados" },
  { to: 42, suffix: "", label: "categorías de oficio" },
  { to: 98, suffix: "%", label: "vuelve a recomendar" },
];

export const partners = [
  "Mercado Central",
  "Cooperativa Sierra Madre",
  "Ejido Santa Elena",
  "Cámara de Comercio",
  "Radio Margaritas 91.5",
  "Ferretería El Trébol",
];

export type Service = {
  id: string;
  provider: string;
  oficio: string;
  colonia: string;
  rating: number;
  reviews: number;
  desde: number;
  img: string;
  alt: string;
  cat: string;
  tag: string;
};

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "hogar", label: "Hogar y oficios" },
  { id: "campo", label: "Campo" },
  { id: "creativo", label: "Creativo" },
  { id: "bienestar", label: "Bienestar" },
];

export const services: Service[] = [
  {
    id: "elec",
    provider: "Servicios Eléctricos Ramírez",
    oficio: "Instalaciones y urgencias eléctricas",
    colonia: "Col. El Carmen",
    rating: 5.0,
    reviews: 98,
    desde: 180,
    img: "https://images.pexels.com/photos/7647233/pexels-photo-7647233.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Electricista ajustando un contacto con herramientas",
    cat: "hogar",
    tag: "Urgencias 24 h",
  },
  {
    id: "plom",
    provider: "Hnos. López",
    oficio: "Plomería, fugas y destapes",
    colonia: "Col. 20 de Noviembre",
    rating: 4.8,
    reviews: 143,
    desde: 150,
    img: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Manos de plomero instalando tubería de acero",
    cat: "hogar",
    tag: "Destape el mismo día",
  },
  {
    id: "carp",
    provider: "Carpintería San José",
    oficio: "Muebles a medida y restauración",
    colonia: "Barrio San José",
    rating: 4.9,
    reviews: 164,
    desde: 250,
    img: "https://images.pexels.com/photos/5974239/pexels-photo-5974239.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Carpintero cepillando una tabla de madera en su taller",
    cat: "hogar",
    tag: "Muebles a medida",
  },
  {
    id: "herr",
    provider: "Herrería El Volcán",
    oficio: "Portones, rejas y estructuras",
    colonia: "Col. Bella Vista",
    rating: 4.7,
    reviews: 86,
    desde: 400,
    img: "https://images.pexels.com/photos/5846247/pexels-photo-5846247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Herrero soldando metal con chispas en el taller",
    cat: "hogar",
    tag: "Trabajo en sitio",
  },
  {
    id: "cafe1",
    provider: "Café Sierra Verde",
    oficio: "Café de altura, tueste artesanal",
    colonia: "Ejido Veracruz",
    rating: 4.9,
    reviews: 301,
    desde: 120,
    img: "https://images.pexels.com/photos/30717830/pexels-photo-30717830.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Manos recolectando cerezas de café maduras en la planta",
    cat: "campo",
    tag: "Cosecha 2025",
  },
  {
    id: "cafe2",
    provider: "Doña Marta Cortés",
    oficio: "Corte y beneficio de café",
    colonia: "Ejido La Esperanza",
    rating: 5.0,
    reviews: 74,
    desde: 100,
    img: "https://images.pexels.com/photos/10615659/pexels-photo-10615659.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Mujer con vestimenta tradicional recolectando café en el cafetal",
    cat: "campo",
    tag: "Comercio justo",
  },
  {
    id: "viv",
    provider: "Vivero Las Flores",
    oficio: "Plantas, hortalizas y jardines",
    colonia: "Col. Las Flores",
    rating: 4.8,
    reviews: 112,
    desde: 90,
    img: "https://images.pexels.com/photos/7728921/pexels-photo-7728921.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Manos plantando una plántula en tierra fértil",
    cat: "campo",
    tag: "Entrega a domicilio",
  },
  {
    id: "tex1",
    provider: "Telar de Rosa",
    oficio: "Bordados y textiles tradicionales",
    colonia: "Col. Centro",
    rating: 4.9,
    reviews: 212,
    desde: 150,
    img: "https://images.pexels.com/photos/24738158/pexels-photo-24738158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Textil colorido tejido a mano en telar tradicional",
    cat: "creativo",
    tag: "Hecho a mano",
  },
  {
    id: "tex2",
    provider: "Colectivo Telar Vivo",
    oficio: "Rebozos y tapices en telar de cintura",
    colonia: "Ejido Santa Elena",
    rating: 5.0,
    reviews: 59,
    desde: 350,
    img: "https://images.pexels.com/photos/33703935/pexels-photo-33703935.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Telares de madera en un taller artesanal",
    cat: "creativo",
    tag: "Piezas únicas",
  },
  {
    id: "barb",
    provider: "Barbería Don Fede",
    oficio: "Cortes clásicos y afeitado a navaja",
    colonia: "Col. Centro",
    rating: 4.8,
    reviews: 176,
    desde: 80,
    img: "https://images.pexels.com/photos/36043163/pexels-photo-36043163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Máquina de cortar cabello en pleno trabajo de barbería",
    cat: "bienestar",
    tag: "Sin cita",
  },
  {
    id: "est",
    provider: "Estudio Andrea",
    oficio: "Estilismo, color y peinado",
    colonia: "Col. El Carmen",
    rating: 4.9,
    reviews: 138,
    desde: 200,
    img: "/images/estilista.jpg",
    alt: "Andrea Peña, estilista de Las Margaritas, en su salón",
    cat: "bienestar",
    tag: "También a domicilio",
  },
];

export const steps = [
  {
    n: "01",
    title: "Crea tu ficha en 5 minutos",
    desc: "Foto, oficio, precios y colonia. Si no tienes tiempo, te la hacemos gratis en el módulo del mercado, los martes y viernes por la mañana.",
  },
  {
    n: "02",
    title: "Recibe solicitudes directas",
    desc: "Cada pedido llega a tu WhatsApp con la dirección y lo que se necesita. Sin intermediarios: tú decides si lo tomas o lo pasas a un colega.",
  },
  {
    n: "03",
    title: "Cotiza y agenda a tu manera",
    desc: "Tú pones el precio y el horario. Nosotros solo acercamos al cliente y dejamos que el oficio hable por ti.",
  },
  {
    n: "04",
    title: "Cobra, recibe reseñas y crece",
    desc: "El pago es tuyo al 100 %. Cada buena reseña te sube en el directorio y te trae el siguiente trabajo antes de que lo busques.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  img?: string;
  rotate?: string;
};

export const featuredQuote = {
  quote:
    "Toda la vida vendí en el mercado, esperando a que alguien pasara. Hoy me llegan pedidos de Comitán y de Tuxtla. Mi hija ya borda conmigo: el telar tiene futuro.",
  name: "Rosa Hernández Luna",
  role: "Bordadora · Col. Centro",
  img: "/images/bordadora.jpg",
  alt: "Retrato de Rosa Hernández Luna, bordadora",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Publiqué mi ficha un martes; el sábado ya tenía seis pedidos de pan para eventos. El horno ya no descansa.",
    name: "Marisol Gutiérrez",
    role: "Panadería La Espiga · Barrio La Pileta",
    img: "/images/panadera.jpg",
    rotate: "-rotate-2",
  },
  {
    quote:
      "Antes esperaba a que llegaran los clientes. Ahora lleno la agenda con dos días de anticipación y hasta doy mantenimiento por iguala.",
    name: "Chema Robles",
    role: "Mecánico · Col. Bella Vista",
    img: "/images/mecanico.jpg",
    rotate: "rotate-1",
  },
  {
    quote:
      "Las reseñas me dieron la confianza que no me daba un letrero en la puerta. Ya voy para dos años en el directorio.",
    name: "Andrea Peña",
    role: "Estilista · Col. El Carmen",
    img: "/images/estilista.jpg",
    rotate: "-rotate-1",
  },
  {
    quote:
      "A mis 58 años aprendí a cobrar lo justo. La ficha dice mi precio y el cliente llega sabiendo. Así se trabaja a gusto.",
    name: "Don Aurelio Díaz",
    role: "Albañil · Ejido Santa Elena",
    img: "/images/albanil.jpg",
    rotate: "rotate-2",
  },
];

export const clientQuote = {
  quote:
    "Se me fue la luz un domingo a las 9 de la noche. Kevin llegó en 25 minutos y no cobró de más por ser fin de semana.",
  name: "Mariana Solano",
  role: "Vecina · Col. El Carmen",
};

export type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    name: "Semilla",
    tagline: "Para empezar",
    monthly: 0,
    yearly: 0,
    features: [
      "Ficha pública en el directorio",
      "Hasta 3 fotos de tu trabajo",
      "Mensajes de clientes por WhatsApp",
      "Reseñas de la comunidad",
      "Apareces en las búsquedas del municipio",
    ],
    cta: "Empezar gratis",
  },
  {
    name: "Taller",
    tagline: "Para vivir de tu oficio",
    monthly: 99,
    yearly: 82,
    features: [
      "Todo lo del plan Semilla",
      "Posición destacada en tu categoría",
      "Fotos ilimitadas + video corto",
      "Estadísticas: quién te ve y desde dónde",
      "Botón de agenda con tus horarios",
      "Soporte por WhatsApp en horario hábil",
    ],
    cta: "Probar 30 días gratis",
    featured: true,
    badge: "El favorito del gremio",
  },
  {
    name: "Maestro",
    tagline: "Para talleres y negocios",
    monthly: 199,
    yearly: 165,
    features: [
      "Todo lo del plan Taller",
      "Portada rotativa del directorio",
      "Sello «Verificado por la comunidad»",
      "Sesión de fotos profesional al año",
      "Prioridad en solicitudes de empresas",
      "Gestor de cuenta asignado",
    ],
    cta: "Hablar con el equipo",
  },
];

export const faqs = [
  {
    q: "¿Cuánto cuesta contratar un servicio?",
    a: "Nada. Buscar, comparar y contactar profesionales es gratuito para siempre. Tú le pagas directamente al profesional el precio acordado; nosotros no cobramos comisión ni recargos de ningún tipo.",
  },
  {
    q: "¿Cómo verifican a los profesionales?",
    a: "Con tres filtros: identificación oficial, al menos dos referencias de vecinos o clientes anteriores, y reseñas públicas después de cada trabajo. Las fichas con reporte se revisan el mismo día y, si hay reincidencia, se suspenden del directorio.",
  },
  {
    q: "¿Cubren comunidades y ejidos?",
    a: "Sí. Además del centro y los barrios, el directorio llega a más de 80 ejidos y rancherías del municipio. Puedes filtrar por colonia, por distancia o por disponibilidad para salir a comunidades.",
  },
  {
    q: "¿Cómo se paga el servicio?",
    a: "Directamente al profesional, al terminar el trabajo: efectivo, transferencia o depósito. Recomendamos pedir siempre la cotización por escrito en el chat antes de iniciar, para que no haya sorpresas.",
  },
  {
    q: "¿Qué pasa si el trabajo no queda bien?",
    a: "Primero, el profesional tiene oportunidad de corregirlo sin costo: es parte del pacto del directorio. Si no responde, la comunidad lo reporta, baja su posición y te ayudamos a encontrar otra ficha con disponibilidad inmediata.",
  },
  {
    q: "¿Necesito descargar una app?",
    a: "No de la tienda. El directorio se instala directo desde el navegador —Chrome en Android y Safari en iPhone— en tres toques: ocupa poquísimo espacio, abre al instante y funciona aunque la señal esté floja. Más abajo, en «Llévalo contigo», están los pasos.",
  },
  {
    q: "¿Mi oficio no está en la lista?",
    a: "Seguro sí cabe: hemos publicado desde reparadores de molinos hasta guías a Lagos de Montebello. Cuéntanos qué haces por WhatsApp y te creamos la categoría el mismo día.",
  },
];
