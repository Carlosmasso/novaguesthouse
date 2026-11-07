"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { PH } from "@/lib/dict";
import { PHOTO, ROOM_PHOTOS, src } from "@/lib/data";
import { prefersReduced } from "@/lib/utils";
import { Arrow, ArrowL, Icon, PageHero, Reveal, Todo, useSwipe } from "./ui";
import { useLightbox } from "./Lightbox";

/** Página de habitaciones: las mejores fotos, equipamiento y normas de la casa. */
export default function RoomsPage() {
  const { lang, t, href } = useI18n();
  const openLb = useLightbox();
  const [i, setI] = useState(0);
  const n = ROOM_PHOTOS.length;
  const l = lang === "es" ? 0 : 1;
  const [jump, setJump] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const at = (d: number) => ROOM_PHOTOS[(i + d + n) % n];
  // La tira lleva la foto actual y sus dos vecinas: se mueve con el dedo y, al terminar, cambia el índice sin salto
  const setTrack = (transform: string, animate: boolean) => {
    if (!track.current) return;
    track.current.style.transition = animate ? "transform .5s cubic-bezier(.16,1,.3,1)" : "none";
    track.current.style.transform = transform;
  };
  const slide = (d: number) => {
    if (busy.current) return;
    if (prefersReduced()) { setI((k) => (k + d + n) % n); return; }
    busy.current = true;
    setTrack(`translate3d(${-d * 100}%,0,0)`, true);
    setTimeout(() => {
      setTrack("", false);
      setI((k) => (k + d + n) % n);
      busy.current = false;
    }, 480);
  };
  const swipe = useSwipe({
    target: stage,
    onMove: (dx) => { if (!busy.current) setTrack(`translate3d(${dx}px,0,0)`, false); },
    onEnd: (dx, _, flick) => {
      if (Math.abs(dx) > 50 || flick) slide(dx < 0 ? 1 : -1);
      else setTrack("", true);
    },
  });
  const rules: [string, React.ReactNode][] = [
    [t("r_in"), CONFIG.checkin],
    [t("r_out"), CONFIG.checkout],
    [t("r_smoke"), t("r_smoke_v")],
    [t("r_quiet"), <Todo key="q" v={CONFIG.quietHours[l]} label={t("r_todo")} />],
    [t("r_vis"), <Todo key="v" v={CONFIG.visitors[l]} label={t("r_todo")} />],
    [t("r_self"), t("r_self_v")],
  ];
  return (
    <main>
      <PageHero photo={PHOTO.roomsHero} alt={PH[lang][PHOTO.roomsHero]} eyebrow={t("rp_eyebrow")} title={t("rp_h")} text={t("rp_p")} />

      <section className="sec wrap room">
        <div className="room-gal">
          <div className="stage" ref={stage} {...swipe}>
            <button type="button" className="stage-img" aria-label={t("open_photo")(PH[lang][ROOM_PHOTOS[i]])} onClick={() => openLb(ROOM_PHOTOS, i)}>
              <div className="stage-track" key={jump} ref={track}>
                {[-1, 0, 1].map((d) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={at(d)} src={src(at(d))} alt="" draggable={false} style={{ left: `${d * 100}%` }} />
                ))}
              </div>
            </button>
            <button type="button" className="cr-arrow l" aria-label={t("prev")} onClick={() => slide(-1)}><ArrowL /></button>
            <button type="button" className="cr-arrow r" aria-label={t("next")} onClick={() => slide(1)}><Arrow /></button>
          </div>
          <div className="thumbs">
            {ROOM_PHOTOS.map((f, k) => (
              <button key={f} type="button" aria-label={t("photo")(k + 1, n)} aria-current={k === i ? "true" : undefined} onClick={() => { if (k !== i) { setI(k); setJump((x) => x + 1); } }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(f)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <Reveal className="room-tx">
          <h2>{t("room_name")}</h2>
          <p>{t("room_p")}</p>
          <ul className="amen">
            {(t("amen") as [string, string][]).map(([k, label]) => <li key={k}><Icon k={k} /><span>{label}</span></li>)}
          </ul>
          <Link className="btn" href={href("/reservar/")}><span>{t("book_now")}</span><Arrow /></Link>
        </Reveal>
      </section>

      <section className="rules-sec">
        <Reveal className="wrap">
          <h2>{t("rules_h")}</h2>
          <dl className="rules">
            {rules.map(([k, v], x) => <div key={x}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </Reveal>
      </section>

      <section className="split rev">
        <Reveal className="split-ph ph-rv">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(PHOTO.roomsCta)} alt={PH[lang][PHOTO.roomsCta]} loading="lazy" />
        </Reveal>
        <Reveal className="split-tx">
          <h2>{t("cta_h")}</h2>
          <Link className="btn" href={href("/reservar/")}><span>{t("book_now")}</span><Arrow /></Link>
        </Reveal>
      </section>
    </main>
  );
}
