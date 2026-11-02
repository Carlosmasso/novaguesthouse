"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PH } from "@/lib/dict";
import { gallery, rooms, src } from "@/lib/data";
import { prefersReduced } from "@/lib/utils";
import { Head, ArrowL, Arrow } from "./ui";
import { useLightbox } from "./Lightbox";

type F = "all" | "roble" | "lino" | "common";
const FILTERS: F[] = ["all", "roble", "lino", "common"];

export default function Gallery() {
  const { lang, t } = useI18n();
  const openLb = useLightbox();
  const [filter, setFilter] = useState<F>("all");
  const [act, setAct] = useState(0);
  const [prog, setProg] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(0);
  const drag = useRef({ down: false, x: 0, sl: 0, moved: false });

  const list = gallery.filter(([, r]) => filter === "all" || (filter === "common" ? !r : r === filter)).map(([f]) => f);
  const count = (k: F) => gallery.filter(([, r]) => k === "all" || (k === "common" ? !r : r === k)).length;
  const label = (k: F) => k === "all" ? (lang === "es" ? "Todas" : "All") : k === "common" ? (lang === "es" ? "Zonas comunes" : "Common areas") : rooms.find((r) => r.id === k)!.name[lang];

  const measure = useCallback(() => {
    const el = track.current; if (!el) return;
    const m = el.scrollWidth - el.clientWidth;
    setProg(m > 0 ? el.scrollLeft / m : 1);
    const x0 = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
    let best = 0, bd = 1e9;
    [...el.children].forEach((c, k) => { const d = Math.abs(c.getBoundingClientRect().left - x0); if (d < bd) { bd = d; best = k; } });
    if (m > 0 && el.scrollLeft >= m - 4) best = el.children.length - 1;
    setAct(best);
  }, []);
  const step = () => { const c = track.current?.querySelector(".card"); return c ? c.getBoundingClientRect().width + 20 : 300; };
  const pause = () => { paused.current = Date.now(); };
  const by = (d: number) => { track.current?.scrollBy({ left: d * step(), behavior: "smooth" }); pause(); };

  useEffect(() => { track.current?.scrollTo({ left: 0 }); measure(); }, [filter, measure]);
  useEffect(() => {
    if (prefersReduced()) return;
    const id = setInterval(() => {
      const el = track.current;
      if (!el || Date.now() - paused.current < 8000 || drag.current.down || document.hidden) return;
      const m = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: el.scrollLeft >= m - 4 ? 0 : el.scrollLeft + step(), behavior: "smooth" });
    }, 4500);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current; if (!d.down || !track.current) return;
      const dx = e.clientX - d.x; if (Math.abs(dx) > 5) d.moved = true;
      track.current.scrollLeft = d.sl - dx;
    };
    const up = () => { if (!drag.current.down) return; drag.current.down = false; track.current?.classList.remove("drag"); setTimeout(() => (drag.current.moved = false), 0); };
    addEventListener("pointermove", move); addEventListener("pointerup", up);
    return () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
  }, []);

  return (
    <section className="show" id="galeria">
      <div className="wrap show-head">
        <div><span className="eyebrow">{t("gal_eyebrow")}</span><h2>{t("gal_h")}</h2></div>
        <div className="filters" role="group">
          {FILTERS.map((k) => (
            <button key={k} type="button" aria-pressed={k === filter} onClick={() => { setFilter(k); pause(); }}>
              {label(k)}<span className="n">{count(k)}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="car">
        <div className="track" ref={track} onScroll={measure}
          onMouseEnter={pause} onTouchStart={pause}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || !track.current) return;
            drag.current = { down: true, moved: false, x: e.clientX, sl: track.current.scrollLeft };
            track.current.classList.add("drag"); pause();
          }}>
          {list.map((f, k) => (
            <figure key={filter + f} className={`card${k === act ? " act" : ""}`}>
              <div className="ph" onClick={() => !drag.current.moved && openLb(list, k)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(f)} alt={PH[lang][f]} loading="lazy" draggable={false} />
              </div>
              <figcaption><b>{PH[lang][f]}</b></figcaption>
            </figure>
          ))}
        </div>
        <div className="wrap car-bar">
          <span className="count">{String(act + 1).padStart(2, "0")}<small>/ {String(list.length).padStart(2, "0")}</small></span>
          <div className="prog"><i style={{ transform: `scaleX(${0.08 + 0.92 * prog})` }} /></div>
          <div className="arrows">
            <button className="arrow" id="cprev" aria-label="‹" onClick={() => by(-1)}><ArrowL /></button>
            <button className="arrow" id="cnext" aria-label="›" onClick={() => by(1)}><Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
