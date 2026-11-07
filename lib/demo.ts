/* =====================================================================
   DATOS DE DEMOSTRACIÓN — solo para ver la web "llena".
   Se usan en `npm run dev` o si se compila con NEXT_PUBLIC_DEMO=1.
   NO publicar. Los minutos salen de la maqueta del cliente y están sin verificar.
   ===================================================================== */
export const DEMO = {
  owner:"Titular de ejemplo (demo)", nif:"B00000000 (demo)",
  email:"novaguesthouse@outlook.com",
  registry:"VT-0000 (demo)",
  bookingUrl:"https://www.booking.com/",
  airbnbUrl:"https://www.airbnb.es/",
  metroWalk:"3",
  times:[
    {icon:"city",place:["Centro de Madrid (Sol)","Central Madrid (Sol)"],min:"20",how:["en transporte público","by public transport"]},
    {icon:"train",place:["Estación de Atocha","Atocha Station"],min:"25",how:["en Cercanías","by commuter train"]},
    {icon:"train",place:["Estación de Chamartín","Chamartín Station"],min:"30",how:["en Cercanías","by commuter train"]},
    {icon:"plane",place:["Aeropuerto Madrid-Barajas","Madrid-Barajas Airport"],min:"40",how:["en coche","by car"]}
  ]
};
