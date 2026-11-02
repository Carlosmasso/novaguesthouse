"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n, withLang } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { telHref } from "@/lib/utils";
import { Arrow } from "./ui";

const MENU: [string, string][] = [
  ["/#galeria", "gal_eyebrow"], ["/#habitaciones", "nav_rooms"], ["/#ubicacion", "nav_loc"],
  ["/#llegada", "arr_eyebrow"], ["/#opiniones", "nav_rev"], ["/#faq", "nav_faq"],
];
// Páginas que solo existen en español: el botón EN lleva a la portada en inglés
const ES_ONLY = ["/aviso-legal", "/privacidad", "/cookies"];

export default function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const { lang, t, href } = useI18n();
  const path = usePathname() || "/";
  const esPath = path.replace(/^\/en(?=\/|$)/, "") || "/";
  const langHref = (l: "es" | "en") => (l === "en" && ES_ONLY.some((p) => esPath.startsWith(p)) ? "/en/" : withLang(l, esPath));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
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

  return (
    <>
      <header className={forceSolid || scrolled || open ? "solid" : ""}>
        <div className="wrap nav">
          <Link className="plate" href={href("/")} aria-label="Nova Guest House Central">NOVAGUESTHOUSE</Link>
          <nav className="links" aria-label="Principal">
            <Link href={href("/#habitaciones")}>{t("nav_rooms")}</Link>
            <Link href={href("/#ubicacion")}>{t("nav_loc")}</Link>
            <Link href={href("/#opiniones")}>{t("nav_rev")}</Link>
            <Link href={href("/#faq")}>{t("nav_faq")}</Link>
            <div className="lang" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as const).map((l) => (
                <Link key={l} href={langHref(l)} hrefLang={l} lang={l} aria-current={lang === l ? "true" : undefined}>{l.toUpperCase()}</Link>
              ))}
            </div>
            <Link className="cta" href={href("/#reservar")}>{t("nav_book")}</Link>
            <button className="burger" type="button" aria-expanded={open} aria-controls="mnav"
              aria-label={open ? (lang === "es" ? "Cerrar menú" : "Close menu") : lang === "es" ? "Menú" : "Menu"}
              onClick={() => setOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>
      <div className={`mnav${open ? " open" : ""}`} id="mnav" aria-hidden={!open}>
        <ol>
          {MENU.map(([h, k]) => (
            <li key={h}><Link href={href(h)} onClick={() => setOpen(false)}><span>{t(k)}</span><Arrow /></Link></li>
          ))}
        </ol>
        <div className="mfoot">
          <Link className="btn" href={href("/#reservar")} onClick={() => setOpen(false)}><span>{t("nav_book")}</span><span className="ar">→</span></Link>
          <p><span>{t("f_24")}</span> · <a href={telHref()}>{CONFIG.phone}</a></p>
        </div>
      </div>
    </>
  );
}
