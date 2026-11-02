/* =====================================================================
   DATOS DEL ALOJAMIENTO — rellena aquí y toda la web se actualiza.
   Lo que se deje vacío ("") se muestra resaltado como pendiente.
   ===================================================================== */
export const CONFIG = {
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

export type RoomId = keyof typeof CONFIG.rooms;
