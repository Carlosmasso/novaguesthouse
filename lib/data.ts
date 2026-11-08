/** Fotos de cada sección. Provisionales: el cliente enviará las definitivas cuando terminen las obras. */
export const PHOTO = {
  hero: "1000252616",
  location: "1000252618",
  roomsHero: "1000252616",
  roomsCta: "1000252626",
  locationHero: "1000252618",
  resWhatsapp: "1000252614",
  resBooking: "1000252620",
  resAirbnb: "1000252626",
};
export const CAROUSEL = ["1000252620", "1000252616", "1000252623", "1000252626", "1000252612", "1000252615"];
export const ROOM_PHOTOS = ["1000252617", "1000252620", "1000252616", "1000252615", "1000252612", "1000252623", "1000252626"];

export const src = (f: string) => `/img/${f}.jpg`;

/** Iconos de línea (paths SVG 24x24). */
export const IC: Record<string, string> = {
  bed: '<path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 15h18M3 18v2M21 18v2M6 10V7a1 1 0 011-1h4a1 1 0 011 1v3M12 10V7a1 1 0 011-1h4a1 1 0 011 1v3"/>',
  shower: '<path d="M4 21V7a4 4 0 018 0v1M7 8h10M9 12v1M12 12v1M15 12v1M9 16v1M12 16v1M15 16v1"/>',
  pin: '<path d="M12 21s7-6.3 7-11.5a7 7 0 10-14 0C5 14.7 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  key: '<circle cx="8" cy="15" r="4.5"/><path d="M11.2 11.8 20 3M16 7l3 3M13.5 9.5l2 2"/>',
  ac: '<rect x="3" y="5" width="18" height="7" rx="1"/><path d="M7 9h10M7 16c0 2-1 3-1 3M12 15v4M17 16c0 2 1 3 1 3"/>',
  wifi: '<path d="M3 9.5a13 13 0 0118 0M6 13a8 8 0 0112 0M9 16.5a3.5 3.5 0 016 0"/><circle cx="12" cy="19.5" r=".6"/>',
  tv: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M9 20h6M12 16v4"/>',
  fridge: '<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M6 9h12M9 5.5v1.5M9 11.5v2.5"/>',
  kettle: '<path d="M7 8h9l1 3v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8zM7 11h10M17 12h2a2 2 0 010 4h-2M9 8l1-3h4l1 3"/>',
  dryer: '<path d="M4 6h11a4 4 0 010 8H4a1 1 0 01-1-1V7a1 1 0 011-1zM8 14l-1 7h3l1-7M20 8h1M20 12h1"/>',
  towel: '<path d="M5 4h14v4H5zM7 8v12h10V8M10 12h4"/>',
  metro: '<rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)"/><path d="M8 12h8"/>',
  train: '<rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 11h12M9 21l1.5-4M15 21l-1.5-4"/><path d="M9.5 14h.01M14.5 14h.01"/>',
  bus: '<rect x="4" y="4" width="16" height="14" rx="2"/><path d="M4 11h16M7 18v2M17 18v2M8 15h.01M16 15h.01"/>',
  car: '<path d="M4 16v-3l2-5a2 2 0 012-1h8a2 2 0 012 1l2 5v3a1 1 0 01-1 1H5a1 1 0 01-1-1zM5 12h14M7 17v2M17 17v2"/>',
  city: '<path d="M3 21h18M5 21V10h5v11M10 21V5h6v16M16 21v-8h4v8M13 8v.01M13 12v.01M7.5 14v.01"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  phone: '<path d="M6 3h3l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v3a3 3 0 01-3 3A15 15 0 013 6a3 3 0 013-3z"/>',
  whatsapp: '<path d="M4 20l1.4-4.2A8 8 0 118.3 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
};
