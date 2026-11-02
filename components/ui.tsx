"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { IC } from "@/lib/data";
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

/** Título de sección con aparición palabra a palabra (desenfoque → nítido). */
export function SplitH2({ text }: { text: string }) {
  return (
    <h2>
      {String(text).split(" ").map((w, i) => (
        <span className="w" key={i + w}><span style={{ transitionDelay: `${i * 60}ms` }}>{w}</span>{" "}</span>
      ))}
    </h2>
  );
}

export function Head({ eyebrow, title, children, className = "head" }: { eyebrow: string; title: string; children?: ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <div><span className="eyebrow">{eyebrow}</span><SplitH2 text={title} /></div>
      {children}
    </Reveal>
  );
}

export const Icon = ({ k, className }: { k: string; className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} dangerouslySetInnerHTML={{ __html: IC[k] }} />
);
export const Arrow = () => <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5" /></svg>;
export const ArrowL = () => <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M15 9H3M8 4 3 9l5 5" /></svg>;
export const Chev = ({ dir }: { dir: "l" | "r" }) => (
  <svg viewBox="0 0 18 18" aria-hidden="true"><path d={dir === "r" ? "m7 3 6 6-6 6" : "M11 3 5 9l6 6"} /></svg>
);
/** Valor pendiente: se muestra resaltado hasta que se rellena en lib/config.ts */
export const Todo = ({ v, label }: { v?: string; label: string }) => (v ? <>{v}</> : <span className="todo">[{label}]</span>);
