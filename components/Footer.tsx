"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { telHref, waLink } from "@/lib/utils";
import { Todo } from "./ui";

export default function Footer() {
  const { t, href } = useI18n();
  const [l1, l2] = CONFIG.address.split(" · ");
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <span className="logo">Nova Guest House</span>
          <div>
            <h2>{t("f_contact")}</h2>
            <ul>
              <li><a href={telHref()}>{CONFIG.phone}</a> · {t("f_24")}</li>
              <li><a href={waLink()} target="_blank" rel="noopener">WhatsApp</a></li>
              <li>{CONFIG.email ? <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> : <Todo label={t("f_email")} />}</li>
              <li>{l1}{l2 && <><br />{l2}</>}</li>
            </ul>
          </div>
          <div>
            <h2>{t("f_links")}</h2>
            <ul>
              <li><Link href={href("/habitaciones/")}>{t("nav_rooms")}</Link></li>
              <li><Link href={href("/ubicacion/")}>{t("nav_loc")}</Link></li>
              <li><Link href={href("/reservar/")}>{t("nav_book")}</Link></li>
              {CONFIG.instagram && <li><a href={CONFIG.instagram} target="_blank" rel="noopener">Instagram</a></li>}
            </ul>
          </div>
        </div>
        <div className="fine">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Nova Guest House Central</span>
          <span>{t("reg")}: <Todo v={CONFIG.registry} label="—" /></span>
          {/* Los textos legales solo existen en español (versión legalmente válida) */}
          <nav className="legal-links" aria-label={t("legal_nav")}>
            <Link href="/aviso-legal/">{t("legal_notice")}</Link><Link href="/privacidad/">{t("privacy")}</Link><Link href="/cookies/">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
