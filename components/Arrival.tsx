"use client";
import { useI18n } from "@/lib/i18n";
import { Head, Reveal } from "./ui";

const ICONS = [
  '<path d="M4 21V5l8-2 8 2v16M4 21h16M9 21v-6h6v6M8 9h1M15 9h1"/>',
  '<path d="M3 21h18M6 21V4h12v17M10 12h.01M14 8h-4"/>',
  '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10 7h1M13 7h1M10 10h1M13 10h1M10 13h1M13 13h1M11 17h2"/>',
];

export default function Arrival() {
  const { t } = useI18n();
  return (
    <section className="band" id="llegada">
      <div className="wrap">
        <Head eyebrow={t("arr_eyebrow")} title={t("arr_h")} />
        <div className="lines">
          {[1, 2, 3].map((n) => (
            <Reveal className="line" key={n}>
              <span className="n">0{n}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[n - 1] }} />
              <h3>{t(`step${n}h`)}</h3>
              <p>{t(`step${n}p`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
