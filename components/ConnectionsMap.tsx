"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { prefersReduced } from "@/lib/utils";
import { Icon, Reveal, useInView } from "./ui";

// Situación real proyectada sobre el mapa (longitud y latitud a escala). Las líneas indican dónde queda
// cada sitio, no el trazado de una línea de transporte. Mismo orden que CONFIG.times.
const O = { x: 115, y: 573 };
const PTS = [
  { x: 418, y: 337, name: "Sol", tx: -18, ty: -6, end: true },
  { x: 450, y: 370, name: "Atocha", tx: 20, ty: 22, end: false },
  { x: 470, y: 157, name: "Chamartín", tx: 20, ty: 6, end: false },
  { x: 692, y: 95, name: "Barajas", tx: 0, ty: -22, end: false, mid: true },
];
const path = (p: { x: number; y: number }, k: number) => {
  const bend = 46 + k * 22; // curva distinta en cada línea para que no se confundan
  const mx = (O.x + p.x) / 2 - bend * 0.6, my = (O.y + p.y) / 2 - bend;
  return `M${O.x} ${O.y}Q${mx} ${my} ${p.x} ${p.y}`;
};
const CYCLE = 3600;

/** Mapa de conexiones: las líneas se dibujan al llegar y resaltan el destino elegido en la lista. */
export default function ConnectionsMap() {
  const { lang, t } = useI18n();
  const l = lang === "es" ? 0 : 1;
  const [on, setOn] = useState(0);
  const [hold, setHold] = useState(false);
  const [motion, setMotion] = useState(false);
  const box = useRef<HTMLElement>(null);
  const seen = useInView(box);

  useEffect(() => { setMotion(!prefersReduced()); }, []);
  useEffect(() => {
    if (!seen || hold || !motion) return;
    const id = setInterval(() => { if (!document.hidden) setOn((k) => (k + 1) % PTS.length); }, CYCLE);
    return () => clearInterval(id);
  }, [seen, hold, motion]);

  return (
    <section className="map-band" ref={box}>
      <div className="wrap map-in">
        <Reveal className="map-w">
          <svg className="map" viewBox="0 0 800 660" aria-hidden="true">
            <ellipse className="ring" cx="445" cy="265" rx="130" ry="200" />
            <text className="t-city" x="330" y="82">Madrid</text>
            {PTS.map((p, k) => (
              <path key={p.name} className={`ln${on === k ? " on" : ""}`} d={path(p, k)} pathLength={1} style={{ "--k": k } as CSSProperties} />
            ))}
            {motion && seen && <circle className="trav" r="6"><animateMotion key={on} dur="2.8s" repeatCount="indefinite" path={path(PTS[on], on)} /></circle>}
            {PTS.map((p, k) => (
              <g key={p.name} className={on === k ? "on" : ""}>
                <circle className="pt" cx={p.x} cy={p.y} r={on === k ? 9 : 6} />
                <text x={p.x + p.tx} y={p.y + p.ty} textAnchor={p.end ? "end" : p.mid ? "middle" : "start"}>{p.name}</text>
              </g>
            ))}
            <circle className="pin-ring" cx={O.x} cy={O.y} r="18" />
            <circle className="pin" cx={O.x} cy={O.y} r="9" />
            <text className="t-home" x={O.x + 30} y={O.y + 4}>Nova Guest House</text>
            <text x={O.x + 30} y={O.y + 34}>Alcorcón</text>
          </svg>
        </Reveal>
        <ul className="tr-list" onMouseLeave={() => setHold(false)}>
          {CONFIG.times.map((r, k) => (
            <li key={r.place[1]}>
              <button type="button" className={`tr${on === k ? " on" : ""}`} aria-pressed={on === k}
                onMouseEnter={() => { setHold(true); setOn(k); }} onFocus={() => { setHold(true); setOn(k); }} onBlur={() => setHold(false)} onClick={() => { setHold(true); setOn(k); }}>
                <b>{r.min ? r.min : <span className="todo">[—]</span>}<em>{t("min")}</em></b>
                <span><strong>{r.place[l]}</strong><small>{r.how[l]}</small></span>
                <Icon k={r.icon} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
