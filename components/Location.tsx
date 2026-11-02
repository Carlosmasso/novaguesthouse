"use client";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { mapsQ, telHref } from "@/lib/utils";
import { Reveal, Todo } from "./ui";

export default function Location() {
  const { lang, t } = useI18n();
  const [map, setMap] = useState(false); // Google Maps solo bajo demanda: sin cookies de terceros hasta que se pide
  const [l1, l2] = CONFIG.address.split(" · ");
  const how = (h: string) => t(h === "en coche" ? "car" : h === "en bus" ? "bus" : "walk");
  return (
    <section className="plain" id="ubicacion">
      <div className="wrap loc2">
        <Reveal className="mapbox">
          <div className="mapph"><div className="pinmark"><span className="dot" aria-hidden="true" /><span className="pinlab">Nova Guest House Central</span></div></div>
          {map ? (
            <iframe title="Google Maps" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapsQ()}&z=16&hl=${lang}&output=embed`} />
          ) : (
            <div className="mapgate">
              <button type="button" className="btn" onClick={() => setMap(true)}><span>{t("map_load")}</span></button>
              <small>{t("map_note")}</small>
            </div>
          )}
        </Reveal>
        <Reveal className="locinfo">
          <span className="eyebrow">{t("loc_eyebrow")}</span>
          <h2>{t("loc_h")}</h2>
          <p className="lp">{t("loc_p")}</p>
          <dl className="ld">
            <div><dt>{t("loc_pin")}</dt><dd>{l1}{l2 && <><br />{l2}</>}</dd></div>
            <div><dt>{t("f_phone")}</dt><dd><a href={telHref()}>{CONFIG.phone}</a> <span className="mut">· {t("f_24")}</span></dd></div>
          </dl>
          <ul className="near">
            {CONFIG.nearby.map(([es, en, m, h], k) => (
              <li key={k}>
                <span><Todo v={lang === "es" ? es : en || es} label={t("place_todo")} /></span>
                <span className="min">{m || <span className="todo">[—]</span>}<small>{t("min")} {how(h)}</small></span>
              </li>
            ))}
          </ul>
          <div className="acts">
            <a className="btn" href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQ()}`} target="_blank" rel="noopener"><span>{t("directions")}</span><span className="ar">→</span></a>
            <a className="btn ghost" href={`https://www.google.com/maps/search/?api=1&query=${mapsQ()}`} target="_blank" rel="noopener"><span>{t("open_maps")}</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
