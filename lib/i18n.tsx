"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { T, type Lang } from "./dict";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => any };
const I18n = createContext<Ctx>({ lang: "es", setLang: () => {}, t: (k) => T.es[k] });

/** Idioma por defecto: español. La elección EN se recuerda solo en la pestaña actual. */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    try { if (sessionStorage.getItem("nova-lang") === "en") setLangState("en"); } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { sessionStorage.setItem("nova-lang", l); } catch {}
  };
  return <I18n.Provider value={{ lang, setLang, t: (k) => T[lang][k] }}>{children}</I18n.Provider>;
}

export const useI18n = () => useContext(I18n);
