"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { FEAT, PH } from "@/lib/dict";
import { rooms, src, type Room } from "@/lib/data";
import { CONFIG } from "@/lib/config";
import { Arrow, ArrowL, Chev, Icon } from "./ui";
import { useLightbox } from "./Lightbox";

export default function RoomDetail({ id }: { id: Room["id"] }) {
  const { lang, t } = useI18n();
  const openLb = useLightbox();
  const r = rooms.find((x) => x.id === id)!;
  const other = rooms.find((x) => x !== r)!;
  const c = CONFIG.rooms[r.id];
  const [k, setK] = useState(0);
  const go = (n: number) => setK((n + r.imgs.length) % r.imgs.length);
  const pad = (n: number) => String(n).padStart(2, "0");
  const [sx, setSx] = useState<number | null>(null);

  useEffect(() => { document.title = `${r.name[lang]} · Nova Guest House Central`; }, [lang, r]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (document.querySelector(".lb")) return; if (e.key === "ArrowLeft") go(k - 1); if (e.key === "ArrowRight") go(k + 1); };
    addEventListener("keydown", key); return () => removeEventListener("keydown", key);
  });

  const stats: [string, React.ReactNode][] = [
    [t("st_bed"), t("double")], [t("st_guests"), "2"], [t("st_bath"), t("private")],
    [t("st_size"), <>{c.size || <span className="todo">[—]</span>} {t("m2")}</>],
  ];

  return (
    <div id="detail">
      <div className="wrap">
        <Link className="back" href="/#habitaciones"><ArrowL />{t("back")}</Link>
        <div className="dtop"><div><span className="rnum">{t("room")} {r.n}</span><h1>{r.name[lang]}</h1></div><p>{r.lead[lang]}</p></div>
        <div className="dgal">
          <div className="stage" onClick={() => openLb(r.imgs, k)}
            onTouchStart={(e) => setSx(e.touches[0].clientX)}
            onTouchEnd={(e) => { if (sx === null) return; const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 40) go(k + (d < 0 ? 1 : -1)); setSx(null); }}>
            {r.imgs.map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={f} src={src(f)} alt={PH[lang][f]} className={i === k ? "on" : ""} />
            ))}
            <span className="idx">{pad(k + 1)} / {pad(r.imgs.length)}</span>
            <div className="nav2">
              <button aria-label="‹" onClick={(e) => { e.stopPropagation(); go(k - 1); }}><Chev dir="l" /></button>
              <button aria-label="›" onClick={(e) => { e.stopPropagation(); go(k + 1); }}><Chev dir="r" /></button>
            </div>
          </div>
          <div className="thumbs">
            {r.imgs.map((f, i) => (
              <button key={f} aria-label={PH[lang][f]} className={i === k ? "on" : ""} onClick={() => go(i)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(f)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="dbody">
          <div className="dmain">
            <div className="blk"><span className="sub">{t("the_room")}</span>
              <dl className="stats">{stats.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></div>
            <div className="blk"><span className="sub">{t("equip")}</span>
              <ul className="feat">{r.feat.map((f) => <li key={f}><Icon k={f} /><span>{FEAT[lang][f]}</span></li>)}</ul></div>
            <div className="blk"><span className="sub">{t("stay")}</span>
              <div className="rules">
                <div><b>{CONFIG.checkin}</b><span>{t("in_from")}</span></div>
                <div><b>{CONFIG.checkout}</b><span>{t("out_until")}</span></div>
                <div><b>24 h</b><span>{t("h24")}</span></div>
              </div></div>
          </div>
          <aside className="aside">
            <div className="pr"><small>{t("from")}</small><b>{c.price || <span className="todo">[{t("price_todo")}]</span>}</b><small>{t("per_night")}</small></div>
            <ul>{(t("aside") as string[]).map((x) => <li key={x}>{x}</li>)}</ul>
            <Link className="btn" href={`/?habitacion=${r.id}#reservar`}><span>{t("book_this")}</span><span className="ar">→</span></Link>
          </aside>
        </div>
      </div>
      <div className="wrap next">
        <span className="sub" style={{ display: "block", marginBottom: 18 }}>{t("other")}</span>
        <Link href={`/habitaciones/${other.id}/`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="ph"><img src={src(other.imgs[0])} alt={PH[lang][other.imgs[0]]} /></div>
          <div><span className="rnum" style={{ marginBottom: 6 }}>{t("room")} {other.n}</span><h3>{other.name[lang]}</h3></div>
          <span className="rcard"><span className="go"><Arrow /></span></span>
        </Link>
      </div>
    </div>
  );
}
