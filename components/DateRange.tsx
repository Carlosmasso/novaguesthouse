"use client";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { addDays, cap, fmtS, iso, loc, nightsBetween, pd, today } from "@/lib/utils";
import { Chev } from "./ui";

const CT = {
  es: { wd: ["L", "M", "X", "J", "V", "S", "D"], pin: <>Elige el día de <b>llegada</b></>, pout: <>Ahora el día de <b>salida</b></>, clear: "Borrar", done: "Listo", busy: "ocupado", legend: "Ocupado" },
  en: { wd: ["M", "T", "W", "T", "F", "S", "S"], pin: <>Choose your <b>check-in</b> date</>, pout: <>Now your <b>check-out</b> date</>, clear: "Clear", done: "Done", busy: "booked", legend: "Booked" },
};

const NONE = new Set<string>();

/** Selector de rango de fechas a medida (llegada → salida). `booked` = noches ocupadas (no se pueden cruzar). */
export default function DateRange({ value, onChange, booked = NONE }: { value: [string, string]; onChange: (v: [string, string]) => void; booked?: Set<string> }) {
  const { lang, t } = useI18n();
  const L = CT[lang];
  const [inV, outV] = value;
  const [mode, setMode] = useState<"in" | "out" | null>(null);
  const [draft, setDraft] = useState<[string, string]>(value);
  const [view, setView] = useState(() => { const b = inV ? pd(inV) : today(); return new Date(b.getFullYear(), b.getMonth(), 1, 12); });
  const [hover, setHover] = useState<string | null>(null);
  const [two, setTwo] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const T0 = today();

  // Dos meses solo si caben en el ancho real del selector (el popup ocupa lo mismo que los dos campos)
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setTwo(e.contentRect.width >= 480));
    ro.observe(el); return () => ro.disconnect();
  }, []);

  const close = (d = draft) => {
    let [a, b] = d;
    if (!a) a = value[0];
    if (!b || b <= a) b = iso(addDays(pd(a), 1));
    setMode(null); setHover(null); onChange([a, b]);
  };
  useEffect(() => {
    if (!mode) return;
    const out = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) close(); };
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", out); document.addEventListener("keydown", key);
    requestAnimationFrame(() => {
      const p = box.current?.querySelector(".pop"); if (!p) return;
      const r = p.getBoundingClientRect(); if (r.bottom > innerHeight) scrollBy({ top: r.bottom - innerHeight + 16, behavior: "smooth" });
    });
    return () => { document.removeEventListener("click", out); document.removeEventListener("keydown", key); };
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const open = (m: "in" | "out") => {
    if (!inV) return; // aún cargando las fechas por defecto
    if (mode === m) { close(); return; }
    setDraft(value); setMode(m); setHover(null);
    const b = pd(m === "out" ? outV : inV); setView(new Date(b.getFullYear(), b.getMonth(), 1, 12));
    if (m === "out" && two) { const a = pd(inV); setView(new Date(a.getFullYear(), a.getMonth(), 1, 12)); }
  };
  const pick = (v: string) => {
    const [a, b] = draft;
    if (mode === "in" || !a || b || v <= a) { setDraft([v, ""]); setMode("out"); }
    else { const d: [string, string] = [a, v]; setDraft(d); setTimeout(() => close(d), 320); }
  };

  const show = (v: string) => { if (!v) return <span className="dv"><b>—</b><span><em>&nbsp;</em><small>&nbsp;</small></span></span>; const d = pd(v); return (
    <span className="dv"><b>{d.getDate()}</b><span><em>{d.toLocaleDateString(loc(lang), { month: "short" }).replace(".", "")}</em><small>{d.toLocaleDateString(loc(lang), { weekday: "long" })}</small></span></span>); };
  const [da, db] = mode ? draft : value;
  const end = db || (mode === "out" ? hover : null);
  const months = Array.from({ length: two ? 2 : 1 }, (_, k) => new Date(view.getFullYear(), view.getMonth() + k, 1, 12));
  const canPrev = view.getFullYear() * 12 + view.getMonth() > T0.getFullYear() * 12 + T0.getMonth();
  const n = nightsBetween(da, db);
  // Eligiendo salida: no se puede pasar de la primera noche ocupada (ese mismo día sí vale como salida)
  const limit = mode === "out" && da && !db ? [...booked].filter((x) => x >= da).sort()[0] : undefined;
  const blocked = (v: string) => (limit && v > da ? v > limit : booked.has(v));

  return (
    <div className="rp" ref={box}>
      {(["in", "out"] as const).map((m) => (
        <div className="fwrap" key={m}>
          <button type="button" className="fbtn" aria-haspopup="dialog" aria-expanded={mode === m} onClick={() => open(m)}>
            <span className="lab">{t(m === "in" ? "f_in" : "f_out")}</span>
            {show(m === "in" ? da || inV : db || da || outV)}
          </button>
        </div>
      ))}
      {mode && (
        <div className="pop" role="dialog">
          <div className="cal-top">
            <span className="hint">{mode === "in" ? L.pin : L.pout}</span>
            <div className="cal-nav">
              <button type="button" aria-label="‹" disabled={!canPrev} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1, 12))}><Chev dir="l" /></button>
              <button type="button" aria-label="›" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1, 12))}><Chev dir="r" /></button>
            </div>
          </div>
          <div className={two ? "cal-months" : "cal-months one"}>
            {months.map((m) => {
              const first = (m.getDay() + 6) % 7, days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
              return (
                <div className="cal-m" key={m.getMonth()}>
                  <h4>{cap(m.toLocaleDateString(loc(lang), { month: "long" }))} {m.getFullYear()}</h4>
                  <div className="cal-g" onMouseLeave={() => setHover(null)}>
                    {L.wd.map((w, i) => <span className="wd" key={i}>{w}</span>)}
                    {Array.from({ length: first }, (_, i) => <span key={"e" + i} />)}
                    {Array.from({ length: days }, (_, i) => {
                      const d = new Date(m.getFullYear(), m.getMonth(), i + 1, 12), v = iso(d);
                      const busy = d >= T0 && blocked(v);
                      const cls = [v === iso(T0) && "today", busy && booked.has(v) && "busy", da && v === da && "st", end && v === end && end > da && "en", da && end && v > da && v < end && "rng"].filter(Boolean).join(" ");
                      return (
                        <button type="button" key={v} className={cls} disabled={d < T0 || busy}
                          aria-label={d.toLocaleDateString(loc(lang), { weekday: "long", day: "numeric", month: "long" }) + (booked.has(v) ? ` (${L.busy})` : "")}
                          onMouseEnter={() => mode === "out" && !db && setHover(v)} onClick={() => pick(v)}>
                          <span>{i + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {booked.size > 0 && <p className="cal-leg"><i aria-hidden="true" />{L.legend}</p>}
          <div className="cal-foot">
            <span className="sum">{n > 0 ? `${n} ${n === 1 ? t("night") : t("nights")}` : "—"}<small>{da ? fmtS(da, lang) : ""}{db ? " → " + fmtS(db, lang) : ""}</small></span>
            <span className="acts">
              <button type="button" className="lnk" onClick={() => { setDraft(["", ""]); setMode("in"); }}>{L.clear}</button>
              <button type="button" className="btn sm" disabled={!db} onClick={() => close()}><span>{L.done}</span></button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
