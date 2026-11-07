/* eslint-disable @typescript-eslint/no-explicit-any */
export type Lang = "es" | "en";

export const T: Record<Lang, any> = {
 es:{
  nav_rooms:"Habitaciones",nav_loc:"Ubicación",nav_home:"Inicio",nav_book:"Reservar",book_now:"Reservar ahora",menu:"Menú",menu_close:"Cerrar menú",
  hero_eyebrow:"A las puertas de Madrid",hero_h:"Diseño, confort y privacidad",hero_p:"Una guest house boutique de solo cuatro habitaciones.",
  rooms_eyebrow:"Descubre",rooms_h:"Nuestras habitaciones",rooms_p:"Pensadas para descansar de verdad.",rooms_btn:"Ver las habitaciones",
  perks:[["bed","4 habitaciones boutique"],["shower","Baño privado"],["pin","A pocos minutos de Madrid"],["key","Self check-in"]],
  close:"Cerrar",prev:"Foto anterior",next:"Foto siguiente",open_photo:(p:string)=>`Ampliar foto: ${p}`,photo:(i:number,n:number)=>`Foto ${i} de ${n}`,
  loc_eyebrow:"Ubicación",loc_h:"A las puertas de Madrid",loc_p:"Una zona tranquila de Alcorcón, muy bien conectada con el centro en Metro, Cercanías y autobús.",loc_btn:"Ver ubicación",
  rp_eyebrow:"Habitaciones",rp_h:"Nuestras habitaciones",rp_p:"Cuatro habitaciones boutique para una estancia tranquila y privada.",
  room_name:"Habitación Doble",room_p:"Luminosa y acogedora, con todo lo que necesitas para sentirte como en casa.",
  amen:[["bed","Cama doble"],["shower","Baño privado"],["ac","Aire acondicionado"],["wifi","Wi-Fi"],["tv","Smart TV"],["fridge","Nevera"],["kettle","Hervidor de agua"],["dryer","Secador de pelo"],["towel","Artículos de aseo"],["key","Self check-in"]],
  rules_h:"Normas de la casa",r_in:"Check-in",r_out:"Check-out",r_smoke:"Tabaco y mascotas",r_smoke_v:"No se permite fumar ni traer mascotas",r_quiet:"Horario de silencio",r_vis:"Visitantes",r_self:"Self check-in",r_self_v:"Recibes tus códigos antes de llegar",r_todo:"Pendiente",
  cta_h:"¿Listo para tu estancia?",
  up_eyebrow:"Ubicación",up_h:"A las puertas de Madrid",up_p:"Una zona tranquila, muy bien conectada con el centro.",
  conn_h:"Excelente conexión",conn_p:"Llega a cualquier punto de Madrid de forma rápida y sencilla.",maps:"Ver en Google Maps",
  m_metro:"Metro",m_metro_p:"Alcorcón Central · Línea 12 (MetroSur)",m_walk:(m:string)=>`A ${m} min a pie`,
  m_train:"Cercanías Renfe",m_train_p:"Línea C-5, directa a Atocha",m_bus:"Autobuses",m_bus_p:"Líneas a Madrid y municipios cercanos",m_car:"En coche",m_car_p:"Acceso a la A-5, M-40 y M-50",
  min:"min",near_h:"Todo lo que necesitas, cerca de ti",near_p:"Restaurantes, supermercados, farmacias y zonas verdes a pocos minutos.",
  res_h:"Reserva tu estancia",res_choose:"Elige cómo reservar",
  res_wa:"Reservar en WhatsApp",res_booking:"Reservar en Booking.com",res_airbnb:"Reservar en Airbnb",res_todo:"Enlace pendiente",
  wa_msg:"Hola, me gustaría reservar en Nova Guest House. Mis fechas son: ",
  help_h:"¿Necesitas ayuda?",
  f_contact:"Contacto",f_links:"Enlaces",f_24:"24 h · 365 días",f_email:"Email",reg:"Nº de registro turístico",
  legal_nav:"Textos legales",legal_notice:"Aviso legal",privacy:"Privacidad"},
 en:{
  nav_rooms:"Rooms",nav_loc:"Location",nav_home:"Home",nav_book:"Book",book_now:"Book now",menu:"Menu",menu_close:"Close menu",
  hero_eyebrow:"At the gates of Madrid",hero_h:"Design, comfort and privacy",hero_p:"A boutique guesthouse with just four rooms.",
  rooms_eyebrow:"Discover",rooms_h:"Our rooms",rooms_p:"Designed for truly restful stays.",rooms_btn:"See the rooms",
  perks:[["bed","4 boutique rooms"],["shower","Private bathroom"],["pin","Minutes from Madrid"],["key","Self check-in"]],
  close:"Close",prev:"Previous photo",next:"Next photo",open_photo:(p:string)=>`Enlarge photo: ${p}`,photo:(i:number,n:number)=>`Photo ${i} of ${n}`,
  loc_eyebrow:"Location",loc_h:"At the gates of Madrid",loc_p:"A quiet part of Alcorcón, with excellent metro, train and bus links to the city centre.",loc_btn:"See location",
  rp_eyebrow:"Rooms",rp_h:"Our rooms",rp_p:"Four boutique rooms for a quiet, private stay.",
  room_name:"Double Room",room_p:"Bright and welcoming, with everything you need to feel at home.",
  amen:[["bed","Double bed"],["shower","Private bathroom"],["ac","Air conditioning"],["wifi","Wi-Fi"],["tv","Smart TV"],["fridge","Fridge"],["kettle","Kettle"],["dryer","Hairdryer"],["towel","Toiletries"],["key","Self check-in"]],
  rules_h:"House rules",r_in:"Check-in",r_out:"Check-out",r_smoke:"Smoking and pets",r_smoke_v:"No smoking and no pets",r_quiet:"Quiet hours",r_vis:"Visitors",r_self:"Self check-in",r_self_v:"You receive your codes before you arrive",r_todo:"Pending",
  cta_h:"Ready for your stay?",
  up_eyebrow:"Location",up_h:"At the gates of Madrid",up_p:"A quiet area with excellent links to the city centre.",
  conn_h:"Excellent connections",conn_p:"Reach anywhere in Madrid quickly and easily.",maps:"View on Google Maps",
  m_metro:"Metro",m_metro_p:"Alcorcón Central · Line 12 (MetroSur)",m_walk:(m:string)=>`${m} min walk`,
  m_train:"Renfe commuter train",m_train_p:"Line C-5, direct to Atocha",m_bus:"Buses",m_bus_p:"Routes to Madrid and nearby towns",m_car:"By car",m_car_p:"Access to the A-5, M-40 and M-50",
  min:"min",near_h:"Everything you need, close by",near_p:"Restaurants, supermarkets, pharmacies and green spaces just minutes away.",
  res_h:"Book your stay",res_choose:"Choose how to book",
  res_wa:"Book on WhatsApp",res_booking:"Book on Booking.com",res_airbnb:"Book on Airbnb",res_todo:"Link pending",
  wa_msg:"Hi, I'd like to book at Nova Guest House. My dates are: ",
  help_h:"Need help?",
  f_contact:"Contact",f_links:"Links",f_24:"24 h · 365 days",f_email:"Email",reg:"Tourist registration no.",
  legal_nav:"Legal",legal_notice:"Legal notice (ES)",privacy:"Privacy (ES)"}
};

/** Descripción de cada foto (texto alternativo). */
export const PH: Record<Lang, Record<string,string>> ={
 es:{"1000252614":"Cama doble con cabecero de madera","1000252616":"Cabecero iluminado","1000252615":"Detalle del cabecero","1000252612":"Cama y armario","1000252620":"Habitación con luz natural","1000252623":"Baño privado","1000252617":"Habitación doble","1000252626":"Pasillo","1000252618":"Entrada de la casa"},
 en:{"1000252614":"Double bed with wooden headboard","1000252616":"Lit headboard","1000252615":"Headboard detail","1000252612":"Bed and wardrobe","1000252620":"Room with daylight","1000252623":"Private bathroom","1000252617":"Double room","1000252626":"Hallway","1000252618":"Entrance to the house"}};
