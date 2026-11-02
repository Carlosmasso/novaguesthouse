"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { PH } from "@/lib/dict";
import { src } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const Ctx = createContext<(set: string[], i: number) => void>(() => {});
export const useLightbox = () => useContext(Ctx);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const [set, setSet] = useState<string[]>([]);
  const [i, setI] = useState(-1);
  const last = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = useCallback((s: string[], k: number) => { last.current = document.activeElement as HTMLElement; setSet(s); setI(k); }, []);
  const close = useCallback(() => { setI(-1); last.current?.focus(); }, []);
  const go = useCallback((d: number) => setI((k) => (k + d + set.length) % set.length), [set.length]);
  useEffect(() => { if (i >= 0) closeBtn.current?.focus(); }, [i >= 0]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (i < 0) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [i, close, go]);
  const f = set[i];
  return (
    <Ctx.Provider value={open}>
      {children}
      {i >= 0 && f && (
        <div className="lb" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && close()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(f)} alt={PH[lang][f]} />
          <button ref={closeBtn} className="x" aria-label="✕" onClick={close}>✕</button>
          <button className="pv" aria-label="‹" onClick={() => go(-1)}>‹</button>
          <button className="nx" aria-label="›" onClick={() => go(1)}>›</button>
          <div className="cap">{PH[lang][f]} · {i + 1}/{set.length}</div>
        </div>
      )}
    </Ctx.Provider>
  );
}
