"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { T, type Lang } from "./dict";

type Ctx = { lang: Lang; t: (k: string) => any; href: (path: string) => string };
const I18n = createContext<Ctx>({ lang: "es", t: (k) => T.es[k], href: (p) => p });

/** Prefijo de idioma para enlaces internos: español en la raíz, inglés bajo /en. */
export const withLang = (lang: Lang, path: string) => (lang === "en" ? "/en" + path : path);

/** El idioma lo decide la URL (/ = español, /en/ = inglés), así cada versión es indexable. */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <I18n.Provider value={{ lang, t: (k) => T[lang][k], href: (p) => withLang(lang, p) }}>{children}</I18n.Provider>;
}

export const useI18n = () => useContext(I18n);
