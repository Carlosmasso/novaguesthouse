"use client";
import { useI18n } from "@/lib/i18n";
import { PH } from "@/lib/dict";
import { PHOTO, src } from "@/lib/data";
import { Rise } from "./ui";

export default function Hero() {
  const { lang, t } = useI18n();
  return (
    <section className="hero" aria-label="Nova Guest House Central">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src(PHOTO.hero)} alt={PH[lang][PHOTO.hero]} fetchPriority="high" />
      </div>
      <div className="wrap hero-in">
        <span className="eyebrow">{t("hero_eyebrow")}</span>
        <h1><Rise text={t("hero_h")} /></h1>
        <span className="hero-rule" aria-hidden="true" />
        <p>{t("hero_p")}</p>
      </div>
    </section>
  );
}
