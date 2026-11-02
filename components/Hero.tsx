"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PH } from "@/lib/dict";
import { src } from "@/lib/data";
import { prefersReduced } from "@/lib/utils";

const SLIDES = ["1000252614", "1000252617", "1000252618", "1000252616"];
const MS = 7000;

export default function Hero() {
  const { lang, t, href } = useI18n();
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0); // reinicia la animación de la barra activa
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || prefersReduced()) return;
    const id = setTimeout(() => { setI((k) => (k + 1) % SLIDES.length); setTick((x) => x + 1); }, MS);
    return () => clearTimeout(id);
  }, [i, tick, paused]);
  const go = (k: number) => { setI(k); setTick((x) => x + 1); };

  return (
    <section className="hero" aria-label="Nova Guest House Central">
      <div className="frame">
        <div className="par">
          {SLIDES.map((f, k) => (
            <div key={f} className={`slide${k === i ? " on" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(f)} alt={PH[lang][f]} fetchPriority={k === 0 ? "high" : "auto"} />
            </div>
          ))}
        </div>
        <div className="hero-in">
          <div className="hero-row">
            <div className="hero-text">
              <span className="eyebrow">{t("hero_eyebrow")}</span>
              <h1>
                <span className="ln"><span><span className="rot">{t("rot")[0]}</span>{t("h1a")}</span></span>
                <span className="ln"><span>{t("h1b")}</span></span>
              </h1>
              <div className="hero-actions">
                <Link className="btn light" href={href("/#habitaciones")}><span>{t("see_rooms")}</span><span className="ar">→</span></Link>
                <div className={`hero-ctrl${paused ? " paused" : ""}`}>
                  <span className="hero-count">{String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
                  <div className="bars">
                    {SLIDES.map((f, k) => (
                      <button key={f + (k === i ? tick : "")} aria-label={t("slide")(k + 1, SLIDES.length)} aria-current={k === i ? "true" : undefined}
                        onClick={() => go(k)} className={k === i ? "on" : k < i ? "done" : ""}><i /></button>
                    ))}
                  </div>
                  {/* <button type="button" className="hero-pp" aria-label={paused ? t("play") : t("pause")} onClick={() => { setPaused(!paused); if (paused) go(i); }}>
                    <svg viewBox="0 0 14 14" aria-hidden="true">{paused ? <path d="M4 2.5v9l7-4.5z" /> : <path d="M4.5 2.5v9M9.5 2.5v9" />}</svg>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
