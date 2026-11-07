"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n, withLang } from "@/lib/i18n";

// Páginas que solo existen en español: el botón EN lleva a la portada en inglés
const ES_ONLY = ["/aviso-legal", "/privacidad", "/cookies"];
const MENU: [string, string][] = [["/", "nav_home"], ["/habitaciones/", "nav_rooms"], ["/ubicacion/", "nav_loc"], ["/reservar/", "nav_book"]];

export default function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const { lang, t, href } = useI18n();
  const path = usePathname() || "/";
  const esPath = path.replace(/^\/en(?=\/|$)/, "") || "/";
  const langHref = (l: "es" | "en") => (l === "en" && ES_ONLY.some((p) => esPath.startsWith(p)) ? "/en/" : withLang(l, esPath));
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // La cabecera se aparta al bajar, para dejar sitio a las fotos, y vuelve en cuanto se sube
  useEffect(() => {
    let prev = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - prev) > 6) { setHidden(y > prev && y > 320); prev = y; }
    };
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const r = () => innerWidth > 760 && setOpen(false);
    addEventListener("keydown", k); addEventListener("resize", r);
    return () => { removeEventListener("keydown", k); removeEventListener("resize", r); };
  }, [open]);

  const lang_ = (
    <div className="lang" role="group" aria-label="Idioma / Language">
      {(["es", "en"] as const).map((l) => (
        <Link key={l} href={langHref(l)} hrefLang={l} lang={l} aria-current={lang === l ? "true" : undefined}>{l.toUpperCase()}</Link>
      ))}
    </div>
  );
  return (
    <>
      <header className={`${forceSolid || scrolled || open ? "solid" : ""}${hidden && !open ? " away" : ""}`}>
        <div className="wrap nav">
          <Link className="logo" href={href("/")} aria-label="Nova Guest House Central">Nova Guest House</Link>
          <nav className="links" aria-label="Principal">
            <Link href={href("/habitaciones/")}>{t("nav_rooms")}</Link>
            <Link href={href("/ubicacion/")}>{t("nav_loc")}</Link>
            {lang_}
            <button className="burger" type="button" aria-expanded={open} aria-controls="mnav" aria-label={open ? t("menu_close") : t("menu")} onClick={() => setOpen((o) => !o)}>
              <span /><span />
            </button>
          </nav>
        </div>
      </header>
      <div className={`mnav${open ? " open" : ""}`} id="mnav" aria-hidden={!open}>
        <ol>
          {MENU.map(([h, k], x) => <li key={h} style={{ "--k": x } as React.CSSProperties}><Link href={href(h)} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t(k)}</Link></li>)}
        </ol>
      </div>
    </>
  );
}
