/* =====================================================================
   DATOS DE DEMOSTRACIÓN — inventados, solo para ver la web "llena".
   Se usan en `npm run dev` o si se compila con NEXT_PUBLIC_DEMO=1.
   NO publicar: las reseñas y la puntuación son ficticias.
   ===================================================================== */
export const DEMO = {
  owner:"Titular de ejemplo (demo)", nif:"B00000000 (demo)",
  email:"hola@novaguesthouse.com",
  registry:"VT-0000 (demo)",
  bookingUrl:"https://www.booking.com/",
  airbnbUrl:"https://www.airbnb.es/",
  rating:"9,2", ratingSource:"Booking.com · 87 opiniones",
  rooms:{
    roble:{price:"62 €", size:"14"},
    lino:{price:"58 €", size:"12"}
  },
  nearby:[
    ["Metro · Línea 12 (MetroSur)","Metro · Line 12 (MetroSur)","5","a pie"],
    ["Cercanías Renfe · C-5","Renfe commuter train · C-5","6","a pie"],
    ["Comercios, cafeterías y restaurantes","Shops, cafés and restaurants","2","a pie"],
    ["Centro de Madrid","Central Madrid","25","en coche"]
  ],
  reviews:[
    {text:"La habitación está impecable, se nota que es todo nuevo. Llegamos tarde y los códigos funcionaron sin problema. Volveremos.",name:"Laura",origin:"España",date:"Septiembre 2026"},
    {text:"Very clean and quiet room, close to the metro. Check-in by code was easy and they answered on WhatsApp in minutes.",name:"Tom",origin:"Reino Unido",date:"Agosto 2026"},
    {text:"Relación calidad-precio muy buena. Cama cómoda, buena ducha y el rincón de café es un detalle. Ideal para trabajar en Madrid.",name:"Javier",origin:"España",date:"Octubre 2026"}
  ],
  faq:{
    parking:["Hay aparcamiento gratuito en la calle en los alrededores y un parking público a 3 minutos a pie.","Free street parking is available nearby, plus a public car park 3 minutes' walk away."],
    pets:["Lo sentimos, no se admiten mascotas.","Sorry, pets are not allowed."],
    cancel:["Cancelación gratuita hasta 48 h antes de la llegada en reservas directas. En plataformas se aplica su política.","Free cancellation up to 48 h before arrival for direct bookings. Platform bookings follow that platform's policy."],
    luggage:["Sí, escríbenos por WhatsApp y te indicamos dónde dejarlo antes del check-in o después del check-out.","Yes — message us on WhatsApp and we'll tell you where to leave it before check-in or after check-out."],
    cleaning:["En estancias de 4 noches o más hacemos limpieza y cambio de toallas a mitad de la estancia.","For stays of 4 nights or more we clean and change towels midway through."]
  }
};
