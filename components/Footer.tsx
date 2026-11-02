"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { telHref, waLink } from "@/lib/utils";
import { Todo } from "./ui";

export default function Footer() {
  const { t } = useI18n();
  const [l1, l2] = CONFIG.address.split(" · ");
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="foot">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span className="plate">NOVAGUESTHOUSE</span>
              <p>{t("foot_p")}</p>
            </div>
            <dl>
              <dt>{t("f_addr")}</dt><dd>{l1}{l2 && <><br />{l2}</>}</dd>
              <dt>{t("f_phone")}</dt><dd><a href={telHref()}>{CONFIG.phone}</a> <span style={{ color: "var(--muted)" }}>· {t("f_24")}</span></dd>
              {CONFIG.instagram && <><dt>Instagram</dt><dd><a href={CONFIG.instagram} target="_blank" rel="noopener">@nova.guesthouse</a></dd></>}
              <dt>{t("f_email")}</dt><dd>{CONFIG.email ? <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> : <Todo label={t("f_email")} />}</dd>
              <dt>Check-in</dt><dd>{CONFIG.checkin}</dd><dt>Check-out</dt><dd>{CONFIG.checkout}</dd>
            </dl>
          </div>
          <div className="fine"><span suppressHydrationWarning>© {new Date().getFullYear()} Nova Guest House Central · Alcorcón, Madrid</span><span>{t("reg")}: <Todo v={CONFIG.registry} label="—" /></span>
            {/* Los textos legales solo existen en español (versión legalmente válida) */}
            <nav className="legal-links" aria-label={t("legal_nav")}>
              <Link href="/aviso-legal/">{t("legal_notice")}</Link><Link href="/privacidad/">{t("privacy")}</Link><Link href="/cookies/">Cookies</Link>
            </nav>
          </div>
        </div>
      </footer>
      <a className="fab" href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z" /></svg>
      </a>
    </>
  );
}
