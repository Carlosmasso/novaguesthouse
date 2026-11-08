/* =====================================================================
   DATOS DEL ALOJAMIENTO — rellena aquí y toda la web se actualiza.
   Lo que se deje vacío ("") se muestra resaltado como pendiente.
   ===================================================================== */
import { DEMO } from "./demo";

const BASE = {
  siteUrl:"",            // dominio definitivo, p. ej. "https://novaguesthouse.com" (si se deja vacío se usa la URL de Netlify)
  owner:"", nif:"",      // titular de la web (persona o empresa) y su NIF/CIF — obligatorio en el aviso legal
  postal:{street:"Paseo de Castilla, 41", cp:"28921", city:"Alcorcón", region:"Madrid"}, // para Google (datos estructurados)
  address:"P.º de Castilla, 41 (posterior), frente a P.º de Extremadura, 3 · 28921 Alcorcón, Madrid",
  mapsQuery:"Nova Guest House Central, Paseo de Castilla 41, 28921 Alcorcón, Madrid",
  phone:"624 86 75 40",  // atención 24 h, 365 días
  whatsapp:"34624867540", // confirmar que este número tiene WhatsApp
  instagram:"https://www.instagram.com/nova.guesthouse/",
  email:"",              // "novaguesthouse@outlook.com"
  registry:"",           // nº de registro turístico
  checkin:"15:00", checkout:"11:00",
  bookingUrl:"",         // enlace a la ficha de Booking.com
  airbnbUrl:"https://www.airbnb.es/rooms/1810141125220115961", // enlace a la ficha de Airbnb
  metroWalk:"5",        // minutos reales a pie hasta Alcorcón Central
  times:[                // tiempos reales desde la casa: {icon, place [ES, EN], min, how [ES, EN]}
    {icon:"city",place:["Centro de Madrid (Sol)","Central Madrid (Sol)"],min:"35",how:["en transporte público","by public transport"]},
    {icon:"train",place:["Estación de Atocha","Atocha Station"],min:"30",how:["en Cercanías","by commuter train"]},
    {icon:"train",place:["Estación de Chamartín","Chamartín Station"],min:"45",how:["en Cercanías","by commuter train"]},
    {icon:"plane",place:["Aeropuerto Madrid-Barajas","Madrid-Barajas Airport"],min:"30",how:["en coche","by car"]}
  ],
  quietHours:["",""],    // horario de silencio [ES, EN], p. ej. ["De 22:00 a 8:00","10 pm to 8 am"]
  visitors:["",""]       // política de visitantes [ES, EN]
};

// En desarrollo (o con NEXT_PUBLIC_DEMO=1) se rellenan SOLO los huecos con datos ficticios de lib/demo.ts:
// un dato real nunca se sustituye. La build de producción usa solo BASE: lo pendiente sigue resaltado.
export const SHOW_DEMO = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEMO === "1";
const filled = (v: unknown) => (Array.isArray(v) ? v.every((x) => x.min) : !!v);
const gaps = Object.fromEntries(Object.entries(DEMO).filter(([k]) => !filled(BASE[k as keyof typeof BASE])));
export const CONFIG: typeof BASE = SHOW_DEMO ? { ...BASE, ...gaps } : BASE;

/** URL pública sin barra final (solo en servidor/build: process.env.URL lo pone Netlify al compilar). */
export const SITE = (CONFIG.siteUrl || process.env.URL || "http://localhost:3000").replace(/\/$/, "");
