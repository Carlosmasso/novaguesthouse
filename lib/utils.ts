import { CONFIG } from "./config";

export const waLink = (txt = "") =>
  `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}${txt ? "?text=" + encodeURIComponent(txt) : ""}`;
export const telHref = () => "tel:+34" + CONFIG.phone.replace(/\s/g, "");
export const mapsQ = () => encodeURIComponent(CONFIG.mapsQuery || CONFIG.address);
export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
