"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { IC, src } from "@/lib/data";
import { prefersReduced } from "@/lib/utils";

/** Aparición suave al hacer scroll (solo para elementos que empiezan fuera de pantalla). */
export function Reveal({ as = "div", className = "", children, ...rest }: { as?: string; className?: string; children?: ReactNode; [k: string]: any }) {
  const ref = useRef<HTMLElement>(null);
  const [pre, setPre] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || el.getBoundingClientRect().top <= window.innerHeight) return;
    setPre(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPre(false); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, { ref, className: `${className} rv${pre ? " pre" : ""}`, ...rest }, children);
}

/** Indica si el elemento está en pantalla: los bucles (autoplay, mapa) se paran cuando no se ve. */
export function useInView(ref: RefObject<Element | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

/**
 * Gesto de arrastre con ratón o dedo. Solo captura el puntero al moverse en horizontal, así que
 * el scroll vertical (touch-action: pan-y) y los clics siguen funcionando. `flick` indica un gesto
 * corto y rápido, que cuenta aunque recorra poca distancia.
 * Con `target`, además impide que Safari en iPhone se quede el gesto horizontal para desplazar la página.
 */
export function useSwipe({ onMove, onEnd, vertical = false, target }: { onMove?: (dx: number, dy: number) => void; onEnd: (dx: number, dy: number, flick: boolean) => void; vertical?: boolean; target?: RefObject<Element | null> }) {
  const st = useRef<{ x: number; y: number; id: number; drag: boolean; t: number } | null>(null);
  const moved = useRef(false);
  useEffect(() => {
    const el = target?.current;
    if (!el) return;
    let x = 0, y = 0, axis = "";
    const start = (e: Event) => { const p = (e as TouchEvent).touches[0]; x = p.clientX; y = p.clientY; axis = ""; };
    const move = (e: Event) => {
      const ev = e as TouchEvent;
      if (ev.touches.length > 1) return; // el pellizco para ampliar sigue funcionando
      const dx = Math.abs(ev.touches[0].clientX - x), dy = Math.abs(ev.touches[0].clientY - y);
      if (!axis && dx + dy > 6) axis = dx > dy ? "x" : "y";
      if (axis === "x" && ev.cancelable) ev.preventDefault();
    };
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchmove", move, { passive: false });
    return () => { el.removeEventListener("touchstart", start); el.removeEventListener("touchmove", move); };
  }, [target]);
  return {
    onPointerDown(e: React.PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      st.current = { x: e.clientX, y: e.clientY, id: e.pointerId, drag: false, t: performance.now() };
      moved.current = false;
    },
    onPointerMove(e: React.PointerEvent) {
      const s = st.current;
      if (!s || e.pointerId !== s.id) return;
      const dx = e.clientX - s.x, dy = e.clientY - s.y;
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (!s.drag && ((ax > 6 && ax > ay) || (vertical && ay > 6))) {
        s.drag = true; moved.current = true;
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
      }
      if (s.drag) onMove?.(dx, dy);
    },
    onPointerUp(e: React.PointerEvent) {
      const s = st.current;
      st.current = null;
      if (s?.drag) {
        const dx = e.clientX - s.x, dy = e.clientY - s.y;
        onEnd(dx, dy, performance.now() - s.t < 280 && Math.hypot(dx, dy) > 24);
      }
      setTimeout(() => { moved.current = false; }, 60); // si no llega clic, el siguiente (p. ej. con teclado) no se pierde
    },
    onPointerCancel() {
      const s = st.current;
      st.current = null;
      if (s?.drag) onEnd(0, 0, false);
    },
    // Tras arrastrar, el clic que dispara el navegador al soltar no debe abrir ni cambiar nada
    onClickCapture(e: React.MouseEvent) {
      if (moved.current) { e.stopPropagation(); e.preventDefault(); moved.current = false; }
    },
  };
}

/** Título que entra palabra a palabra, enmascarado. Solo CSS: sin JS el texto se ve igual. */
export const Rise = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((w, k) => (
      <Fragment key={k}>
        <span className="w"><span style={{ "--k": k } as CSSProperties}>{w}</span></span>{" "}
      </Fragment>
    ))}
  </>
);

export const Icon = ({ k, className }: { k: string; className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`ic ${className || ""}`} dangerouslySetInnerHTML={{ __html: IC[k] }} />
);
export const Arrow = () => <svg className="ar" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5" /></svg>;
export const ArrowL = () => <svg className="ar" viewBox="0 0 18 18" aria-hidden="true"><path d="M15 9H3M8 4 3 9l5 5" /></svg>;

/** Cabecera de página interior: foto ancha, velo ligero y título. */
export function PageHero({ photo, alt, eyebrow, title, text }: { photo: string; alt: string; eyebrow: string; title: string; text: string }) {
  return (
    <section className="phero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src(photo)} alt={alt} fetchPriority="high" />
      <div className="wrap phero-in">
        <span className="eyebrow">{eyebrow}</span>
        <h1><Rise text={title} /></h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

/** Valor pendiente: se muestra resaltado hasta que se rellena en lib/config.ts */
export const Todo = ({ v, label }: { v?: string; label: string }) => (v ? <>{v}</> : <span className="todo">[{label}]</span>);
