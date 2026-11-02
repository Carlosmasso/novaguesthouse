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
  email:"",              // "hola@novaguesthouse.com"
  registry:"",           // nº de registro turístico
  checkin:"15:00", checkout:"11:00",
  bookingUrl:"",         // enlace a la ficha de Booking.com
  airbnbUrl:"",          // enlace a la ficha de Airbnb
  rating:"", ratingSource:"", // "9,4" , "Booking.com · 120 opiniones"
  rooms:{                // precio por noche (texto) y m²
    roble:{price:"", size:""},
    lino:{price:"", size:""}
  },
  nearby:[               // [nombre ES, nombre EN, minutos, "a pie"|"en coche"|"en bus"]
    ["Metro · Línea 12 (MetroSur)","Metro · Line 12 (MetroSur)","",""],
    ["Cercanías Renfe · C-5","Renfe commuter train · C-5","",""],
    ["Comercios, cafeterías y restaurantes","Shops, cafés and restaurants","",""],
    ["Centro de Madrid","Central Madrid","","en coche"]
  ],
  reviews:[              // solo reseñas reales: {text, name, origin, date}
    {text:"",name:"",origin:"",date:""},{text:"",name:"",origin:"",date:""},{text:"",name:"",origin:"",date:""}
  ],
  faq:{                  // respuestas pendientes (ES / EN)
    parking:["",""], pets:["",""], cancel:["",""], luggage:["",""], cleaning:["",""]
  }
};

// En desarrollo (o con NEXT_PUBLIC_DEMO=1) se rellenan los huecos con datos ficticios de lib/demo.ts.
// La build de producción usa solo BASE: lo pendiente sigue resaltado.
export const SHOW_DEMO = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEMO === "1";
export const CONFIG: typeof BASE = SHOW_DEMO ? { ...BASE, ...DEMO } : BASE;

/** URL pública sin barra final (solo en servidor/build: process.env.URL lo pone Netlify al compilar). */
export const SITE = (CONFIG.siteUrl || process.env.URL || "http://localhost:3000").replace(/\/$/, "");

/** Precio más bajo configurado, para mostrar "desde X €". */
export const minPrice = () => {
  const ps = Object.values(CONFIG.rooms).map((r) => r.price).filter(Boolean);
  return ps.sort((a, b) => parseFloat(a) - parseFloat(b))[0] || "";
};

export type RoomId = keyof typeof CONFIG.rooms;
