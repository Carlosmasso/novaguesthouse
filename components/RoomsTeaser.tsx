"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { PH } from "@/lib/dict";
import { CAROUSEL, src } from "@/lib/data";
import { prefersReduced } from "@/lib/utils";
import { Arrow, ArrowL, Icon, Reveal, useInView, useSwipe } from "./ui";
import { useLightbox } from "./Lightbox";

const MS = 5500;
const N = CAROUSEL.length;
const STEP = 76; // separación entre fotos, en % del ancho de la foto central

/** Colocación de cada foto según su distancia a la central (e): las vecinas se alejan, encogen y oscurecen. */
function place(e: number): CSSProperties {
  const a = Math.min(1, Math.abs(e));
  return {
    transform: `translate3d(${e * STEP}%,0,0) scale(${1 - 0.24 * a})`,
    filter: `brightness(${1 - 0.5 * a})`,
    opacity: 1 - Math.min(1, Math.max(0, Math.abs(e) - 1)),
    zIndex: 10 - Math.round(Math.abs(e) * 2),
  };
}

/** Portada: carrusel con profundidad que sigue al dedo, iconos y enlace a la página. */
export default function RoomsTeaser() {
  const { lang, t, href } = useI18n();
  const openLb = useLightbox();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [drag, setDrag] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const seen = useInView(box);
  const run = seen && !hold && !drag;
  const go = (d: number) => setI((k) => (k + d + N) % N);
  const offset = (k: number) => { const o = (k - i + N) % N; return o > N / 2 ? o - N : o; };

  // Durante el arrastre se escribe en el DOM para no renderizar en cada movimiento
  const paint = (p: number) => {
    stage.current?.querySelectorAll<HTMLElement>(".cr-slide").forEach((el, k) => Object.assign(el.style, place(offset(k) + p)));
  };
  const stepPx = () => (stage.current?.querySelector<HTMLElement>(".cr-slide")?.offsetWidth || 1) * (STEP / 100);
  const swipe = useSwipe({
    target: box,
    onMove: (dx) => {
      setDrag(true);
      paint(dx / stepPx());
    },
    onEnd: (dx, _, flick) => {
      setDrag(false);
      if (Math.abs(dx) > 50 || flick) go((dx < 0 ? 1 : -1) * Math.max(1, Math.round(Math.abs(dx) / stepPx())));
      else paint(0);
    },
  });

  useEffect(() => { CAROUSEL.forEach((f) => { new Image().src = src(f); }); }, []);
  useEffect(() => {
    if (!run || prefersReduced()) return;
    const id = setInterval(() => {
      if (!document.hidden && !document.body.classList.contains("lb-open")) go(1);
    }, MS);
    return () => clearInterval(id);
  }, [i, run]);

  return (
    <section className="sec rooms" id="habitaciones">
      <Reveal className="wrap sec-head">
        <span className="eyebrow">{t("rooms_eyebrow")}</span>
        <h2>{t("rooms_h")}</h2>
        <p>{t("rooms_p")}</p>
      </Reveal>
      <div ref={box} className={`cr${drag ? " drag" : ""}`} {...swipe}
        onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
        <div className="cr-stage" ref={stage}>
          {CAROUSEL.map((f, k) => {
            const o = offset(k);
            const near = Math.abs(o) <= 1;
            return (
              <button key={f} type="button" className={`cr-slide${o === 0 ? " on" : ""}`} style={{ ...place(o), pointerEvents: near ? undefined : "none" }}
                tabIndex={o === 0 ? 0 : -1} aria-hidden={o !== 0} aria-label={o === 0 ? t("open_photo")(PH[lang][f]) : undefined}
                onClick={() => (o === 0 ? openLb(CAROUSEL, i) : near && go(o))}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(f)} alt="" draggable={false} />
              </button>
            );
          })}
          <button type="button" className="cr-arrow l" aria-label={t("prev")} onClick={() => go(-1)}><ArrowL /></button>
          <button type="button" className="cr-arrow r" aria-label={t("next")} onClick={() => go(1)}><Arrow /></button>
        </div>
        <div className="segs" style={{ "--ms": `${MS}ms` } as CSSProperties}>
          {CAROUSEL.map((f, k) => (
            <button key={k === i ? `${f}-${run}` : f} type="button" className={`${k === i ? "on" : ""}${k === i && run ? " run" : ""}`}
              aria-label={t("photo")(k + 1, N)} aria-current={k === i ? "true" : undefined} onClick={() => setI(k)}><i /></button>
          ))}
        </div>
      </div>
      <div className="center rooms-cta"><Link className="btn line" href={href("/habitaciones/")}><span>{t("rooms_btn")}</span><Arrow /></Link></div>
      <div className="wrap perks-w">
        <Reveal as="ul" className="perks stag">
          {(t("perks") as [string, string][]).map(([k, label]) => <li key={k}><Icon k={k} /><span>{label}</span></li>)}
        </Reveal>
      </div>
    </section>
  );
}
