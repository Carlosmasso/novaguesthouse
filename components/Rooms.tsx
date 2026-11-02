"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PH } from "@/lib/dict";
import { rooms, src } from "@/lib/data";
import { CONFIG } from "@/lib/config";
import { Head, Reveal, Arrow } from "./ui";

export default function Rooms() {
  const { lang, t } = useI18n();
  return (
    <section className="band" id="habitaciones">
      <div className="wrap">
        <Head eyebrow={t("rooms_eyebrow")} title={t("rooms_h")} />
        <div className="rcards">
          {rooms.map((r) => {
            const price = CONFIG.rooms[r.id].price;
            return (
              <Reveal as="div" key={r.id}>
                <Link className="rcard" href={`/habitaciones/${r.id}/`}>
                  <div className="ph">
                    <span className="tag">{t("room")} {r.n}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src(r.imgs[0])} alt={PH[lang][r.imgs[0]]} loading="lazy" />
                  </div>
                  <div className="row">
                    <div>
                      <h3>{r.name[lang]}</h3>
                      <p className="meta">{t("card_meta")}</p>
                      <span className="price">{t("from")} {price || <span className="todo">[—] €</span>} <small>/ {t("per_night")}</small></span>
                    </div>
                    <span className="go" aria-hidden="true"><Arrow /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
