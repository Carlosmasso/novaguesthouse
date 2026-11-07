"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PH } from "@/lib/dict";
import { PHOTO, src } from "@/lib/data";
import { Arrow, Reveal } from "./ui";

/** Bloque de ubicación: dos fotos solapadas que se mueven a distinta velocidad al hacer scroll. */
export default function LocationTeaser() {
  const { lang, t, href } = useI18n();
  return (
    <section className="loc" id="ubicacion">
      <div className="wrap loc-in">
        <Reveal className="loc-tx">
          <span className="eyebrow">{t("loc_eyebrow")}</span>
          <h2>{t("loc_h")}</h2>
          <p>{t("loc_p")}</p>
          <Link className="btn" href={href("/ubicacion/")}><span>{t("loc_btn")}</span><Arrow /></Link>
        </Reveal>
        <div className="loc-ph">
          <Reveal className="loc-main ph-rv">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(PHOTO.location)} alt={PH[lang][PHOTO.location]} loading="lazy" />
          </Reveal>
          <div className="loc-small">
            <Reveal className="ph-rv">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(PHOTO.roomsCta)} alt={PH[lang][PHOTO.roomsCta]} loading="lazy" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
