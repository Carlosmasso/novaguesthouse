"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SHOW_DEMO } from "./config";
import { rooms } from "./data";
import { addDays, iso, pd, today } from "./utils";

type Booked = Record<string, Set<string>>;
type Ctx = {
  room: string; setRoom: (r: string) => void;
  dates: [string, string]; setDates: (d: [string, string]) => void;
  guests: number; setGuests: (n: number) => void;
  booked: Booked;
  /** Noches ocupadas en TODAS las habitaciones (para la barra general, sin habitación elegida). */
  bookedAll: Set<string>;
};
const EMPTY = new Set<string>();
const BookingCtx = createContext<Ctx | null>(null);

/** Noches de una estancia: llegada incluida, salida excluida. */
export const nightsOf = (a: string, b: string) => {
  const out: string[] = [];
  for (let d = pd(a); a && b && iso(d) < b; d = addDays(d, 1)) out.push(iso(d));
  return out;
};
export const isFree = (set: Set<string>, a: string, b: string) => nightsOf(a, b).every((n) => !set.has(n));

/** Ocupación inventada para la demo, relativa a hoy (no choca con las fechas por defecto: +7 → +10). */
const demoBooked = (): Booked => {
  const T0 = today(), at = (ns: number[]) => new Set(ns.map((n) => iso(addDays(T0, n))));
  return { roble: at([2, 3, 11, 12, 13, 19, 20, 26, 27]), lino: at([4, 5, 6, 15, 16, 19, 20, 22]) };
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<string>(rooms[0].id);
  // Las fechas por defecto dependen de "hoy": se fijan al montar para no chocar con el HTML estático
  const [dates, setDates] = useState<[string, string]>(["", ""]);
  const [guests, setGuests] = useState(2);
  const [booked, setBooked] = useState<Booked>({});

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const h = q.get("habitacion");
    if (h && rooms.some((r) => r.id === h)) setRoom(h); // /?habitacion=lino#reservar (enlace desde la ficha)
    const a = addDays(today(), 7);
    setDates([iso(a), iso(addDays(a, 3))]);

    let on = true;
    fetch("/api/availability")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { configured: boolean; rooms: Record<string, string[]> }) => {
        if (!on) return;
        if (!d.configured && SHOW_DEMO) return setBooked(demoBooked());
        setBooked(Object.fromEntries(Object.entries(d.rooms).map(([k, v]) => [k, new Set(v)])));
      })
      .catch(() => on && SHOW_DEMO && setBooked(demoBooked())); // en `npm run dev` no hay función de Netlify
    return () => { on = false; };
  }, []);

  const bookedAll = useMemo(() => {
    const sets = rooms.map((r) => booked[r.id] || EMPTY);
    return new Set([...sets[0]].filter((d) => sets.every((s) => s.has(d))));
  }, [booked]);

  return <BookingCtx.Provider value={{ room, setRoom, dates, setDates, guests, setGuests, booked, bookedAll }}>{children}</BookingCtx.Provider>;
}

export const useBooking = () => {
  const c = useContext(BookingCtx);
  if (!c) throw new Error("useBooking fuera de BookingProvider");
  return c;
};
export const bookedOf = (b: Booked, room: string) => b[room] || EMPTY;
