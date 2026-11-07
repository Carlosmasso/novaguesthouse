"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { PH } from "@/lib/dict";
import { src } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { prefersReduced } from "@/lib/utils";
import { Arrow, ArrowL, useSwipe } from "./ui";

const Ctx = createContext<(set: string[], i: number) => void>(() => {});
export const useLightbox = () => useContext(Ctx);
const EASE = "cubic-bezier(.16,1,.3,1)";

/** Visor de fotos: se abre desde la propia foto, se desliza con el dedo y se cierra arrastrando hacia abajo. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const { lang, t } = useI18n();
  const [set, setSet] = useState<string[]>([]);
  const [i, setI] = useState(-1);
  const [dir, setDir] = useState(0);
  const [closing, setClosing] = useState(false);
  const last = useRef<HTMLElement | null>(null);
  const from = useRef<DOMRect | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const isOpen = i >= 0;

  const open = useCallback((s: string[], k: number) => {
    last.current = document.activeElement as HTMLElement;
    from.current = last.current?.getBoundingClientRect() ?? null;
    setSet(s); setDir(0); setClosing(false); setI(k);
  }, []);
  const close = useCallback(() => {
    if (prefersReduced()) { setI(-1); last.current?.focus(); return; }
    setClosing(true);
    setTimeout(() => { setI(-1); setClosing(false); last.current?.focus(); }, 200);
  }, []);
  const go = useCallback((d: number) => { setDir(d); setI((k) => (k + d + set.length) % set.length); }, [set.length]);

  useEffect(() => {
    document.body.classList.toggle("lb-open", isOpen);
    if (isOpen) closeBtn.current?.focus();
    return () => document.body.classList.remove("lb-open");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Tab") { // el foco no se escapa del visor
        const b = box.current?.querySelectorAll("button");
        if (!b?.length) return;
        const first = b[0], end = b[b.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); end.focus(); }
        else if (!e.shiftKey && document.activeElement === end) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, go]);

  // Las fotos vecinas ya cargadas: pasar de una a otra es instantáneo
  useEffect(() => {
    if (!isOpen || !set.length) return;
    [1, -1].forEach((d) => { new Image().src = src(set[(i + d + set.length) % set.length]); });
  }, [i, isOpen, set]);

  // Al abrir, la foto crece desde donde estaba en la página
  const onImg = () => {
    const el = img.current, r = from.current;
    from.current = null;
    if (!el || !r || !r.width || prefersReduced()) return;
    const b = el.getBoundingClientRect();
    if (!b.width) return;
    el.animate(
      [{ transform: `translate(${r.left + r.width / 2 - b.left - b.width / 2}px,${r.top + r.height / 2 - b.top - b.height / 2}px) scale(${Math.max(r.width / b.width, r.height / b.height)})`, opacity: 0.4 }, { transform: "none", opacity: 1 }],
      { duration: 480, easing: EASE },
    );
  };

  const swipe = useSwipe({
    vertical: true,
    onMove: (dx, dy) => {
      const el = img.current;
      if (!el) return;
      const down = dy > 0 && Math.abs(dy) > Math.abs(dx);
      el.style.transition = "none";
      el.style.transform = down ? `translateY(${dy}px) scale(${Math.max(0.85, 1 - dy / 1200)})` : `translateX(${dx}px)`;
      if (box.current) box.current.style.backgroundColor = down ? `rgba(14,12,10,${Math.max(0.4, 0.96 - dy / 600)})` : "";
    },
    onEnd: (dx, dy, flick) => {
      const el = img.current;
      if (box.current) box.current.style.backgroundColor = "";
      if (el) { el.style.transition = ""; el.style.transform = ""; }
      if (dy > 110 && dy > Math.abs(dx)) close();
      else if ((Math.abs(dx) > 60 || (flick && Math.abs(dx) > Math.abs(dy))) && set.length > 1) go(dx < 0 ? 1 : -1);
    },
  });

  const f = set[i];
  return (
    <Ctx.Provider value={open}>
      {children}
      {isOpen && f && (
        <div ref={box} className={`lb${closing ? " out" : ""}`} role="dialog" aria-modal="true" aria-label={PH[lang][f]} {...swipe}
          onClick={(e) => e.target === e.currentTarget && close()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={f} ref={img} className={dir ? "slide" : ""} style={{ "--dir": dir } as React.CSSProperties} src={src(f)} alt={PH[lang][f]} draggable={false} onLoad={onImg} />
          <button ref={closeBtn} type="button" className="x" aria-label={t("close")} onClick={close}>
            <svg viewBox="0 0 18 18" aria-hidden="true"><path d="m4 4 10 10M14 4 4 14" /></svg>
          </button>
          <button type="button" className="pv" aria-label={t("prev")} onClick={() => go(-1)}><ArrowL /></button>
          <button type="button" className="nx" aria-label={t("next")} onClick={() => go(1)}><Arrow /></button>
          <div className="cap" aria-live="polite">{i + 1} / {set.length}</div>
        </div>
      )}
    </Ctx.Provider>
  );
}
