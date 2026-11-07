"use client";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { PH } from "@/lib/dict";
import { PHOTO, src } from "@/lib/data";
import { mapsQ } from "@/lib/utils";
import { Icon, Reveal, Rise } from "./ui";
import ConnectionsMap from "./ConnectionsMap";

/** Página de ubicación: la conexión con Madrid es el mensaje principal. */
export default function LocationPage() {
  const { lang, t } = useI18n();
  const [a1, a2] = CONFIG.address.split(" · ");
  const modes: [string, string, string, React.ReactNode?][] = [
    ["metro", t("m_metro"), t("m_metro_p"), CONFIG.metroWalk ? t("m_walk")(CONFIG.metroWalk) : <span key="w" className="todo">[{t("m_walk")("—")}]</span>],
    ["train", t("m_train"), t("m_train_p")],
    ["bus", t("m_bus"), t("m_bus_p")],
    ["car", t("m_car"), t("m_car_p")],
  ];
  return (
    <main>
      <section className="shero">
        <div className="shero-tx">
          <span className="eyebrow">{t("up_eyebrow")}</span>
          <h1><Rise text={t("up_h")} /></h1>
          <p>{t("up_p")}</p>
        </div>
        <div className="shero-ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(PHOTO.locationHero)} alt={PH[lang][PHOTO.locationHero]} fetchPriority="high" />
        </div>
      </section>

      <section className="sec wrap conn">
        <Reveal className="conn-tx">
          <h2>{t("conn_h")}</h2>
          <p>{t("conn_p")}</p>
          <address>{a1}{a2 && <><br />{a2}</>}</address>
          <a className="btn line" href={`https://www.google.com/maps/search/?api=1&query=${mapsQ()}`} target="_blank" rel="noopener"><Icon k="pin" /><span>{t("maps")}</span></a>
        </Reveal>
        <Reveal as="ul" className="modes stag">
          {modes.map(([k, h, p, x]) => (
            <li key={k}><Icon k={k} /><div><h3>{h}</h3><p>{p}</p>{x && <p>{x}</p>}</div></li>
          ))}
        </Reveal>
      </section>

      <ConnectionsMap />

      <section className="near-band">
        <Reveal className="wrap near-in">
          <Icon k="pin" />
          <h2>{t("near_h")}</h2>
          <p>{t("near_p")}</p>
        </Reveal>
      </section>
    </main>
  );
}
