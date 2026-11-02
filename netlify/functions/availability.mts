/* Disponibilidad: lee los calendarios iCal de Booking/Airbnb y devuelve las noches ocupadas.
   Los enlaces van en variables de entorno de Netlify (no en el código: llevan un token privado):
     ICAL_ROBLE = "https://admin.booking.com/...ics, https://www.airbnb.es/calendar/ical/...ics"
     ICAL_LINO  = "..."
   Respuesta: { configured: boolean, rooms: { roble: ["2026-11-09", ...], lino: [...] } } */

const FEEDS: Record<string, string | undefined> = { roble: process.env.ICAL_ROBLE, lino: process.env.ICAL_LINO };
const DAY = 864e5;

const ymd = (s: string) => new Date(Date.UTC(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8)));

/** Añade a `out` cada noche ocupada (DTSTART incluida, DTEND excluida) desde `from`. */
function parse(ics: string, out: Set<string>, from: string) {
  const text = ics.replace(/\r?\n[ \t]/g, ""); // líneas plegadas (RFC 5545)
  for (const ev of text.split("BEGIN:VEVENT").slice(1)) {
    const s = ev.match(/^DTSTART[^:\n]*:(\d{8})/m)?.[1];
    if (!s) continue;
    const e = ev.match(/^DTEND[^:\n]*:(\d{8})/m)?.[1];
    const start = ymd(s), end = e ? ymd(e) : new Date(start.getTime() + DAY);
    for (let d = start, n = 0; d < end && n < 400; d = new Date(d.getTime() + DAY), n++) {
      const k = d.toISOString().slice(0, 10);
      if (k >= from) out.add(k);
    }
  }
}

export default async () => {
  const from = new Date().toISOString().slice(0, 10);
  const configured = Object.values(FEEDS).some(Boolean);
  const rooms: Record<string, string[]> = {};
  await Promise.all(Object.entries(FEEDS).map(async ([room, list]) => {
    const booked = new Set<string>();
    const urls = (list || "").split(",").map((u) => u.trim()).filter(Boolean);
    await Promise.all(urls.map(async (u) => {
      try {
        const r = await fetch(u, { signal: AbortSignal.timeout(8000) });
        if (r.ok) parse(await r.text(), booked, from);
      } catch { /* si una plataforma falla, se usa lo que llegue del resto */ }
    }));
    rooms[room] = [...booked].sort();
  }));
  return Response.json({ configured, rooms }, {
    headers: {
      "cache-control": "public, max-age=300",
      "netlify-cdn-cache-control": "public, durable, s-maxage=900, stale-while-revalidate=3600",
    },
  });
};

export const config = { path: "/api/availability" };
