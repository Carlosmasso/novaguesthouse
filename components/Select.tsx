"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

const CHEV = <svg className="chev" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4" /></svg>;
const OK = <svg className="ok" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" /></svg>;

/** Desplegable a medida con lista accesible (teclado: flechas, Enter, Escape). */
export default function Select({ id, label, options, value, onChange }: {
  id: string; label: string; options: { value: string; node: ReactNode }[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  useEffect(() => {
    if (!open) return;
    const out = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", out);
    return () => document.removeEventListener("click", out);
  }, [open]);
  const pick = (i: number) => { onChange(options[i].value); setOpen(false); btn.current?.focus(); };
  const key = (e: React.KeyboardEvent) => {
    const n = options.length;
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); setHi(idx); setOpen(true); return; }
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => (h + 1) % n); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => (h - 1 + n) % n); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(hi); }
    else if (e.key === "Escape" || e.key === "Tab") setOpen(false);
  };
  return (
    <>
      <span className="lab" id={id + "-l"}>{label}</span>
      <div className="csel" ref={box}>
        <button ref={btn} type="button" className="cs-btn" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={`${id}-l ${id}-v`}
          onClick={() => { setHi(idx); setOpen((o) => !o); }} onKeyDown={key}>
          <span className="cv" id={id + "-v"}>{options[idx]?.node}</span>{CHEV}
        </button>
        {open && (
          <ul className="cs-list" role="listbox" aria-labelledby={id + "-l"} aria-activedescendant={`${id}-o${hi}`}>
            {options.map((o, i) => (
              <li key={o.value} id={`${id}-o${i}`} role="option" aria-selected={i === idx} className={i === hi ? "hi" : ""}
                onMouseEnter={() => setHi(i)} onClick={() => pick(i)}>{o.node}{OK}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
