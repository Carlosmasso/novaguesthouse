import { CONFIG } from "./config";
import type { Lang } from "./dict";

export const esc = (v: string) => v;
export const waLink = (txt = "") =>
  CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}${txt ? "?text=" + encodeURIComponent(txt) : ""}` : "#reservar";
export const telHref = () => "tel:+34" + CONFIG.phone.replace(/\s/g, "");
export const mapsQ = () => encodeURIComponent(CONFIG.mapsQuery || CONFIG.address);

/* fechas (siempre a mediodía local para evitar saltos de zona horaria) */
export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const pd = (v: string) => new Date(v + "T12:00");
export const loc = (l: Lang) => (l === "es" ? "es-ES" : "en-GB");
export const fmt = (v: string, l: Lang) =>
  pd(v).toLocaleDateString(loc(l), { weekday: "short", day: "numeric", month: "long" });
export const fmtS = (v: string, l: Lang) =>
  pd(v).toLocaleDateString(loc(l), { weekday: "short", day: "numeric", month: "short" });
export const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
export const today = () => { const d = new Date(); d.setHours(12, 0, 0, 0); return d; };
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const nightsBetween = (a: string, b: string) => (a && b ? Math.round((pd(b).getTime() - pd(a).getTime()) / 864e5) : 0);
export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
