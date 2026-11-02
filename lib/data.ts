import type { Lang } from "./dict";

export type Room = {
  id: "roble" | "lino";
  n: string;
  name: Record<Lang, string>;
  lead: Record<Lang, string>;
  imgs: string[];
  feat: string[];
};

export const rooms: Room[] = [
 {id:'roble',n:'01',name:{es:'Doble Roble',en:'Oak Double'},lead:{es:'Cabecero de roble con luz cálida y armario abierto.',en:'Oak headboard with warm light and an open wardrobe.'},
  imgs:["1000252614","1000252616","1000252615","1000252612","1000252613","1000252610","1000252620","1000252623"],
  feat:["shower","ac","tv","wifi","fridge","kettle","desk","hanger","window","lamp","towel","lock"]},
 {id:'lino',n:'02',name:{es:'Doble Lino',en:'Linen Double'},lead:{es:'Luminosa, con estor de lino y rincón de café.',en:'Bright, with a linen blind and a coffee corner.'},
  imgs:["1000252617","1000252619","1000252621","1000252623","1000252611"],
  feat:["shower","ac","tv","wifi","kettle","desk","blind","mirror","lamp","towel","lock","bed"]}
];

export const gallery: [string, string | null, number][] =[["1000252616",'roble',1],["1000252617",'lino',1],["1000252623",null,0],["1000252613",'roble',0],["1000252621",'lino',1],["1000252615",'roble',0],["1000252626",null,1],["1000252619",'lino',0],["1000252620",'roble',0],["1000252612",'roble',0],["1000252618",null,1],["1000252610",'roble',0],["1000252614",'roble',1]];

export const src = (f: string) => `/img/${f}.jpg`;

/* Iconos de equipamiento (paths SVG 24x24) */
export const IC: Record<string,string> = {
 bed:'<path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 15h18M3 18v2M21 18v2M6 10V7a1 1 0 011-1h4a1 1 0 011 1v3M12 10V7a1 1 0 011-1h4a1 1 0 011 1v3"/>',
 shower:'<path d="M5 21V8a4 4 0 018 0M13 8h-5M10 12v1M7 13v1M13 12v1M10 16v1M7 17v1M13 16v1"/>',
 ac:'<rect x="3" y="5" width="18" height="7" rx="1"/><path d="M7 9h10M7 16c0 2-1 3-1 3M12 15v4M17 16c0 2 1 3 1 3"/>',
 tv:'<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M9 20h6M12 16v4"/>',
 wifi:'<path d="M3 9.5a13 13 0 0118 0M6 13a8 8 0 0112 0M9 16.5a3.5 3.5 0 016 0"/><circle cx="12" cy="19.5" r=".6"/>',
 lock:'<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10 7h1M13 7h1M10 10h1M13 10h1M10 13h1M13 13h1M11 17h2"/>',
 fridge:'<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M6 9h12M9 5.5v1.5M9 11.5v2.5"/>',
 kettle:'<path d="M7 8h9l1 3v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8zM7 11h10M17 12h2a2 2 0 010 4h-2M9 8l1-3h4l1 3"/>',
 desk:'<path d="M3 9h18M5 9v11M19 9v11M14 9v6h5"/>',
 hanger:'<path d="M12 7a2 2 0 112 2c-1 .4-2 1-2 2l9 6H3l9-6"/>',
 window:'<rect x="5" y="4" width="14" height="16"/><path d="M12 4v16M5 12h14"/>',
 blind:'<path d="M4 4h16M5 4v8h14V4M5 9h14M8 12v8h8v-8"/>',
 mirror:'<rect x="7" y="2" width="10" height="20" rx="1"/><path d="M10 6l3-2M10 10l5-4"/>',
 lamp:'<path d="M12 2v10M10 12h4v7h-4zM8 22h8"/>',
 towel:'<path d="M5 4h14v4H5zM7 8v12h10V8M10 12h4"/>'
};
