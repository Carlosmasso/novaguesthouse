import type { Metadata } from "next";
import type { Lang } from "./dict";

/** Metadatos de una página con versión en español y en inglés. */
export function pageMeta(path: string, lang: Lang, title: string, description: string): Metadata {
  const full = `${title} · Nova Guest House Central`;
  const url = (lang === "en" ? "/en" : "") + path;
  return {
    title: full, description,
    alternates: { canonical: url, languages: { es: path, en: "/en" + path, "x-default": path } },
    openGraph: { title: full, description, locale: lang === "en" ? "en_GB" : "es_ES", url },
  };
}
