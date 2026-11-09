import type { IconName } from "@/components/Icon";
import { PLANS, canonical } from "@/lib/site";

/**
 * Spanish pages (phase 1): the /es hub, /es/precios and /es/diseno-de-paginas-web.
 * Each has an English twin; ES_ALTERNATES feeds hreflang on both sides.
 * Prices are never typed here: they come from PLANS in lib/site.ts by exact name.
 */

export const ES_PATHS = {
  hub: "/es",
  precios: "/es/precios",
  diseno: "/es/diseno-de-paginas-web",
} as const;

/** English twin of each Spanish page. */
const EN_TWIN: Record<string, string> = {
  [ES_PATHS.hub]: "/",
  [ES_PATHS.precios]: "/pricing",
  [ES_PATHS.diseno]: "/services/website-design",
};

/**
 * hreflang set for one page pair. Pass either the Spanish or the English path;
 * both pages emit the same set, which is what Google expects.
 */
export function esAlternates(path: string) {
  const esPath = EN_TWIN[path] ? path : Object.keys(EN_TWIN).find((k) => EN_TWIN[k] === path);
  if (!esPath) throw new Error(`No Spanish twin for ${path}`);
  const en = canonical(EN_TWIN[esPath]);
  return { en, es: canonical(esPath), "x-default": en };
}

/** Plan price from lib/site.ts, so the Spanish pages can't drift from /pricing. */
function price(name: (typeof PLANS)[number]["name"]) {
  const plan = PLANS.find((p) => p.name === name);
  if (!plan) throw new Error(`Plan not found: ${name}`);
  return plan.price;
}

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export const ES_ENTITY =
  "RGV Performance Marketing es una agencia de IA y marketing con sede en Harlingen, Texas, que atiende a negocios en todo Estados Unidos.";

/** Spanish plan cards, in the same order as /pricing. */
export const ES_PLANS = [
  {
    tier: "Base",
    name: "Plant the Flag (sitio web)",
    price: price("Plant the Flag (website)"),
    text: "Un sitio web a la medida que diseñamos, alojamos y mantenemos por usted. Incluye una bandeja para todos sus prospectos y seguimiento automático por mensaje de texto y correo electrónico.",
    bullets: [
      "Sitio web a la medida, en inglés, español o ambos",
      "Hosting y mantenimiento incluidos",
      "Mensaje de texto automático cuando pierde una llamada",
      "Recordatorios de citas y campañas por texto y correo",
    ],
  },
  {
    tier: "Complemento",
    name: "Local SEO y Perfil de Google",
    price: price("Local SEO & Google Profile add-on"),
    text: "Su Perfil de Negocio de Google completo, páginas por ciudad y por servicio, mejoras en su sitio, contenido mensual y un reporte cada mes.",
    bullets: [],
  },
  {
    tier: "Complemento",
    name: "Content Crew",
    price: price("Content Crew add-on"),
    text: "Usted graba, nosotros editamos: 1 reel y 1 diseño de marca por semana, más historias. Usted publica. También se vende por separado.",
    bullets: [],
  },
  {
    tier: "Complemento",
    name: "Full Service Social",
    price: price("Full Service Social add-on"),
    text: "2 reels y 1 publicación por semana, historias ilimitadas y una sesión de fotos y video al mes. Nosotros publicamos y contestamos los mensajes. También se vende por separado.",
    bullets: [],
  },
  {
    tier: "Complemento",
    name: "Manejo de Anuncios",
    price: price("Ads Management add-on"),
    text: "Anuncios en Google o Meta creados y manejados por nosotros. Google y Meta le cobran la inversión en anuncios directamente.",
    bullets: [],
  },
];

export const ES_BASE_PRICE = ES_PLANS[0].price;
export const ES_ADDON_FROM = Math.min(...ES_PLANS.slice(1).map((p) => p.price));

/* --------------------------------- hub --------------------------------- */

export const ES_HUB = {
  metaTitle: "Agencia de Marketing Digital en el Valle | RGV Performance Marketing",
  metaDescription: `Agencia de marketing digital e IA en Harlingen, TX: sitios web, Google, SEO local, anuncios y seguimiento automático, en español e inglés. Desde ${money(ES_BASE_PRICE)} al mes.`,
  eyebrow: "En español · Harlingen, TX",
  h1: "Agencia de Marketing Digital en el Valle del Río Grande",
  heroSub:
    "Su sitio web, su Perfil de Google, SEO, anuncios y seguimiento a cada cliente, manejados por un solo equipo con sede en Harlingen. Mes a mes, sin contratos largos.",
};

export const ES_HUB_INTRO = {
  heading: "¿Qué hace una agencia de marketing digital por su negocio?",
  answer:
    "Una agencia de marketing digital hace que su negocio aparezca cuando la gente busca lo que usted vende, en Google, en Google Maps y en las respuestas de IA, y que cada llamada o mensaje reciba respuesta rápida. En el Valle eso significa hacerlo en inglés y en español.",
  body: [
    "La mayoría de los dueños tienen algunas de esas piezas, hechas por distintas personas en distintos momentos, sin nadie que vea cómo funcionan juntas. Nosotros las manejamos como un solo programa y le reportamos cada mes lo que importa: llamadas, prospectos y citas.",
    ES_ENTITY,
  ],
};

export const ES_HUB_SERVICES: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "globe", title: "Diseño de páginas web", text: "Un sitio rápido y hecho para el celular, en inglés, español o ambos. Listo en 8 a 10 días.", href: ES_PATHS.diseno },
  { icon: "search", title: "SEO local", text: "Páginas por ciudad y por servicio, y contenido mensual para las búsquedas que hacen sus clientes.", href: "/services/local-seo" },
  { icon: "target", title: "Perfil de Negocio de Google", text: "Categorías, fotos, publicaciones y reseñas, para competir por los primeros lugares del mapa.", href: "/services/google-business-profile" },
  { icon: "megaphone", title: "Anuncios en Google y Meta", text: "Llamadas desde ya mientras el SEO crece. Google o Meta le cobran la inversión directamente.", href: "/services/paid-advertising" },
  { icon: "chat", title: "Seguimiento a prospectos", text: "Cada llamada, formulario y mensaje en una sola bandeja, con respuestas y recordatorios automáticos.", href: "/services/lead-management" },
  { icon: "cpu", title: "Automatización con IA", text: "IA que contesta fuera de horario y mantiene el seguimiento mientras usted trabaja.", href: "/services/ai-implementation" },
];

export const ES_HUB_WHY = {
  heading: "Por qué el español importa en el Valle",
  intro: "Muchos de sus clientes buscan en español, sobre todo desde el celular. Un plan hecho solo en inglés deja esas búsquedas a la competencia.",
  points: [
    { title: "Las búsquedas en español son otras búsquedas", text: "\"Diseño de páginas web en McAllen\" y \"web design McAllen\" son dos búsquedas distintas para Google. Si su sitio solo está en inglés, no compite por la segunda." },
    { title: "Clientes de los dos lados de la frontera", text: "McAllen y Brownsville reciben clientes de Reynosa, Matamoros y Monterrey que buscan en español. Páginas en español les dicen que usted los atiende." },
    { title: "El mapa también cuenta", text: "Su Perfil de Negocio de Google puede tener publicaciones y respuestas a reseñas en español, para que el cliente que busca en español vea que usted le habla en su idioma." },
    { title: "Una sola marca en los dos idiomas", text: "Hacemos su sitio, su contenido de Google y sus anuncios en inglés y en español con el mismo mensaje, para que su negocio se vea igual de profesional en los dos." },
  ],
};

export const ES_HUB_STEPS = [
  { title: "Llamada de estrategia gratis", text: "Revisamos su sitio, su Perfil de Google y lo que buscan sus clientes, y le decimos qué arreglaríamos primero." },
  { title: "Construimos la base", text: "Primero quedan listos su sitio web, su Perfil de Google, la medición y la bandeja de prospectos, para que cada cliente llegue a un solo lugar." },
  { title: "Crecemos y reportamos", text: "Agregamos los complementos que usted elija, como SEO o anuncios, y le mandamos un reporte claro cada mes." },
];

export const ES_HUB_FAQS = [
  { q: "¿Cuánto cuesta el marketing digital en el Valle?", a: `Todo plan empieza con un sitio web a la medida por ${money(ES_BASE_PRICE)} al mes. Los complementos empiezan en ${money(ES_ADDON_FROM)} al mes, así que solo paga por lo que quiere delegar. Todo es mes a mes y Google o Meta le cobran la inversión en anuncios directamente. Todos los precios están en nuestra página de precios.` },
  { q: "¿Pueden hacer mi sitio web y mis anuncios en español?", a: "Sí. Hacemos su sitio web, su contenido de Google y sus anuncios en inglés y en español." },
  { q: "¿Están en el Valle de verdad?", a: "Sí. Nuestro equipo está en Harlingen, Texas. Podemos vernos en persona o hablar por teléfono o video, lo que le quede mejor." },
  { q: "¿Garantizan el primer lugar en Google?", a: "No. Nadie controla Google, y una agencia que garantiza un lugar o un número de clientes está adivinando. Nos comprometemos con el trabajo y cada mes le mostramos lo que trajo." },
  { q: "¿Cuánto tarda en verse resultados?", a: "Los anuncios pueden traer prospectos desde la primera semana. El SEO local normalmente toma de 60 a 90 días en mostrar avance real y después sigue creciendo." },
  { q: "¿Trabajan solo con negocios del Valle?", a: "No. Estamos en Harlingen y atendemos a todo el Valle del Río Grande, y también trabajamos con negocios en todo Estados Unidos." },
];

/* ------------------------------- precios ------------------------------- */

export const ES_PRECIOS = {
  metaTitle: "Precios de Marketing Digital | RGV Performance Marketing",
  metaDescription: `Precios claros de marketing digital: sitio web a la medida desde ${money(ES_BASE_PRICE)} al mes y complementos desde ${money(ES_ADDON_FROM)}. Mes a mes, sin contratos largos ni cargos ocultos.`,
  eyebrow: "Precios y planes",
  h1: "Precios de Marketing Digital, Claros y Mes a Mes",
  heroSub: "Empiece con un sitio web y agregue solo los trabajos que quiere delegar. Mes a mes, sin contratos largos y sin cargos ocultos.",
  proof: [`Desde ${money(ES_BASE_PRICE)} al mes`, "Sin contratos", "Sin cargo de construcción con cualquier complemento", "Google y Meta cobran sus anuncios"],
};

export const ES_PRECIOS_INTRO = {
  heading: "¿Cuánto cuesta una agencia de marketing digital?",
  answer: `Con nosotros, todo empieza con un sitio web a la medida por ${money(ES_BASE_PRICE)} al mes, que ya incluye su bandeja de prospectos y seguimiento automático por texto y correo. Después agrega solo lo que necesita: SEO local, contenido, redes sociales o anuncios, desde ${money(ES_ADDON_FROM)} al mes cada uno.`,
};

export const ES_PRECIOS_FAQS = [
  { q: "¿Cómo funcionan sus precios?", a: `Todo plan empieza con un sitio web: Plant the Flag, ${money(ES_BASE_PRICE)} al mes, con su bandeja de prospectos y seguimiento automático por texto y correo. De ahí agrega solo los trabajos que quiere delegar: Local SEO y Perfil de Google (${money(price("Local SEO & Google Profile add-on"))} al mes), Content Crew (${money(price("Content Crew add-on"))} al mes) o Full Service Social (${money(price("Full Service Social add-on"))} al mes), y Manejo de Anuncios (${money(price("Ads Management add-on"))} al mes).` },
  { q: "¿Hay un cargo de construcción?", a: "Solo si contrata el sitio web solo: un cargo único de $399 que cubre el diseño y la construcción de su sitio. Si agrega cualquier complemento, ese cargo no se cobra. No hay cargos de instalación ni de activación." },
  { q: "¿Tengo que firmar un contrato largo?", a: "No. Todos los planes y complementos son mes a mes. Preferimos ganarnos su confianza cada mes en vez de amarrarlo con un contrato." },
  { q: "¿La inversión en anuncios sale de la mensualidad?", a: "No. El complemento de Manejo de Anuncios cubre el manejo de sus campañas. La inversión en anuncios la paga usted: Google y Meta le cobran directamente, y nosotros la manejamos." },
  { q: "¿El seguimiento por texto y correo está incluido?", a: "Sí, con cada sitio web. Las llamadas, formularios y mensajes llegan a una sola bandeja y el seguimiento corre solo: mensaje de texto cuando pierde una llamada, campañas por texto y correo, y recordatorios de citas." },
  { q: "¿Puedo contratar redes sociales sin un sitio web de ustedes?", a: "Sí. Content Crew y Full Service Social también se venden por separado, así que puede quedarse con su sitio actual y solo delegarnos sus redes." },
];

/* ------------------------------- diseño -------------------------------- */

export const ES_DISENO = {
  metaTitle: "Diseño de Páginas Web en el Valle | RGV Performance Marketing",
  metaDescription: `Diseño de páginas web en el Valle: sitios rápidos para el celular, en español e inglés, con SEO y formularios. Listos en 8 a 10 días, desde ${money(ES_BASE_PRICE)} al mes.`,
  eyebrow: "Diseño de páginas web",
  h1: "Diseño de Páginas Web en el Valle del Río Grande",
  heroSub: "Sitios web rápidos, hechos para el celular y en español o inglés, pensados para traerle clientes y no solo para verse bonitos.",
  primaryKeyword: "diseño de páginas web",
};

export const ES_DISENO_INTRO = {
  heading: "¿Qué incluye un sitio web para un negocio local?",
  answer: `Un buen sitio web para un negocio local carga rápido en el celular, explica en segundos qué hace usted y dónde, y facilita llamar, escribir o agendar. Nuestros sitios incluyen diseño a la medida, SEO básico, formularios conectados a su bandeja de prospectos y seguimiento automático, desde ${money(ES_BASE_PRICE)} al mes.`,
};

export const ES_DISENO_INCLUDED: { icon: IconName; title: string; text: string }[] = [
  { icon: "target", title: "Diseño a la medida", text: "Un sitio hecho para su marca y sus clientes, no una plantilla que usan todos." },
  { icon: "phone", title: "Hecho para el celular", text: "La mayoría de las búsquedas locales se hacen desde el teléfono. Su sitio se ve y funciona bien en cualquier pantalla." },
  { icon: "search", title: "SEO desde el primer día", text: "Títulos, encabezados, estructura y datos estructurados correctos para que Google entienda su sitio." },
  { icon: "bolt", title: "Carga rápida", text: "Páginas ligeras que no hacen esperar a sus visitantes." },
  { icon: "mail", title: "Formularios que convierten", text: "Formularios bien ubicados para que la visita se convierta en prospecto." },
  { icon: "settings", title: "Conectado a su bandeja de prospectos", text: "Cada formulario llega a su bandeja, con respuesta y seguimiento automático." },
  { icon: "globe", title: "En español, inglés o ambos", text: "Llegue a todo el mercado del Valle con un sitio en el idioma de sus clientes." },
];

export const ES_DISENO_STEPS = [
  { title: "Conocemos su negocio", text: "Platicamos de sus metas, sus clientes y su competencia, y planeamos las páginas y el contenido que necesita su sitio." },
  { title: "Diseñamos y construimos", text: "Hacemos un sitio rápido y para el celular, con su marca, SEO y formularios, y lo revisamos con usted en el camino." },
  { title: "Lanzamos y cuidamos", text: "Publicamos su sitio, conectamos los formularios a su bandeja, dejamos lista la medición y seguimos aquí para cualquier cambio." },
];

export const ES_DISENO_FAQS = [
  { q: "¿Cuánto cuesta una página web para mi negocio?", a: `Nuestro plan de sitio web, Plant the Flag, cuesta ${money(ES_BASE_PRICE)} al mes e incluye diseño, hosting y mantenimiento, su bandeja de prospectos y seguimiento automático. Si contrata el sitio solo hay un cargo único de construcción de $399, que no se cobra si agrega cualquier complemento.` },
  { q: "¿Cuánto tarda en estar listo mi sitio?", a: "La mayoría de los sitios quedan listos en 8 a 10 días. Depende del número de páginas y de qué tan rápido juntamos su contenido y sus comentarios. Le damos un calendario claro antes de empezar." },
  { q: "¿Pueden hacer mi sitio en español y en inglés?", a: "Sí. Hacemos sitios en español, en inglés o en los dos idiomas. En el Valle eso le ayuda a llegar a clientes que su competencia está ignorando." },
  { q: "¿El SEO está incluido?", a: "Sí, el SEO básico viene en cada sitio: títulos, encabezados, estructura, velocidad y datos estructurados. El SEO local continuo para subir en Google es el complemento de Local SEO y Perfil de Google." },
  { q: "¿Tengo que firmar un contrato?", a: "No. El plan es mes a mes, sin contratos largos." },
];
