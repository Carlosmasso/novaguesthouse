"use client";
import { useEffect, useState } from "react";
import { bookedOf, isFree, useBooking } from "@/lib/booking";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { rooms, src } from "@/lib/data";
import { fmt, nightsBetween, waLink } from "@/lib/utils";
import { Reveal, SplitH2, Arrow } from "./ui";
import DateRange from "./DateRange";
import Select from "./Select";

const ETA_IC = [
  '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  '<path d="M3 17h18M7 17a5 5 0 0110 0M12 7v2M5.6 10.6l1.4 1.4M18.4 10.6 17 12"/>',
  '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
];
const Minus = () => <svg viewBox="0 0 14 14"><path d="M2 7h10" /></svg>;
const Plus = () => <svg viewBox="0 0 14 14"><path d="M2 7h10M7 2v10" /></svg>;

export default function Booking() {
  const { lang, t } = useI18n();
  const { room, setRoom, dates, setDates, guests, setGuests, booked } = useBooking();
  const [eta, setEta] = useState("1");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState("");

  const n = nightsBetween(...dates);
  const taken = bookedOf(booked, room);
  const free = isFree(taken, ...dates);
  const alt = free ? undefined : rooms.find((r) => r.id !== room && isFree(bookedOf(booked, r.id), ...dates));
  const nl = (k: number) => `${k} ${k === 1 ? t("night") : t("nights")}`;
  const build = () => {
    const r = rooms.find((x) => x.id === room)!;
    return t("msg")(name.trim(), r.name[lang], fmt(dates[0], lang), fmt(dates[1], lang), nl(n), guests === 1 ? t("g1") : t("g2"), t("eta")[+eta]);
  };
  useEffect(() => { if (msg) setMsg(build()); }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(n > 0)) return setErr(t("err_dates"));
    if (!free) return setErr(t("err_busy"));
    if (!name.trim()) { setErr(t("err_name")); document.getElementById("name")?.focus(); return; }
    const m = build();
    setErr(""); setCopied(""); setMsg(m);
    window.open(waLink(m), "_blank", "noopener"); // directo a WhatsApp; el mensaje queda abajo por si no se abre
  };
  const copy = () => navigator.clipboard.writeText(msg).then(() => setCopied(t("copied"))).catch(() => setCopied(t("selected")));

  const roomOpts = rooms.map((r) => {
    const p = CONFIG.rooms[r.id].price;
    return { value: r.id, node: (<>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cs-th" src={src(r.imgs[0])} alt="" />
      <span className="cs-tx"><b>{r.name[lang]}</b><small>{t("card_meta")}{p ? ` · ${p} / ${t("per_night")}` : ""}</small></span></>) };
  });
  const etaOpts = (t("eta") as string[]).map((label, i) => ({ value: String(i), node: (<>
    <svg className="cs-ic" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ETA_IC[i] }} />
    <span className="cs-tx"><b>{label}</b><small>{t("eta_h")[i]}</small></span></>) }));

  const channels: [string, string][] = [[CONFIG.bookingUrl, "ch_booking"], [CONFIG.airbnbUrl, "ch_airbnb"]];

  return (
    <section className="plain" id="reservar">
      <div className="wrap book">
        <Reveal className="txt head" style={{ display: "flex", marginBottom: 0 }}>
          <span className="eyebrow">{t("book_eyebrow")}</span>
          <SplitH2 text={t("book_h")} />
          <p>{t("book_p")}</p>
          <div className="channels">
            {channels.map(([url, k]) => (
              <a key={k} href={url || "#reservar"} {...(url ? { target: "_blank", rel: "noopener" } : {})}>
                <span><b style={{ fontWeight: 500 }}>{t(k)}</b><small>{url ? t("ch_sub") : <span className="todo">[{t("ch_todo")}]</span>}</small></span><Arrow />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal as="form" id="bk" noValidate onSubmit={submit}>
          <div className="f full"><Select id="room" label={t("f_room")} options={roomOpts} value={room} onChange={setRoom} /></div>
          <DateRange value={dates} onChange={setDates} booked={taken} />
          {!free && n > 0 && (
            <p className="warn">{t("busy_room")(rooms.find((r) => r.id === room)!.name[lang])}
              {alt && <> <button type="button" className="lnk" onClick={() => setRoom(alt.id)}>{t("busy_alt")(alt.name[lang])}</button></>}
            </p>
          )}
          <div className="f">
            <div className="gf" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="lab">{t("f_guests")}</span>
              <div className="step2">
                <button type="button" aria-label="−" disabled={guests <= 1} onClick={() => setGuests(1)}><Minus /></button>
                <output aria-live="polite"><b>{guests}</b>{guests === 1 ? (lang === "es" ? "huésped" : "guest") : lang === "es" ? "huéspedes" : "guests"}</output>
                <button type="button" aria-label="+" disabled={guests >= 2} onClick={() => setGuests(2)}><Plus /></button>
              </div>
            </div>
          </div>
          <div className="f"><Select id="eta" label={t("f_eta")} options={etaOpts} value={eta} onChange={setEta} /></div>
          <div className="f full"><label htmlFor="name">{t("f_name")}</label><input id="name" type="text" autoComplete="name" placeholder={t("f_name_ph")} value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="summary">
            <div className="nights">{n > 0 ? nl(n) : `— ${t("nights")}`}<small>{n > 0 ? `${fmt(dates[0], lang)} → ${fmt(dates[1], lang)}` : t("pick")}</small></div>
            <button className="btn" type="submit"><span>{t("f_submit")}</span><span className="ar">→</span></button>
          </div>
          {err && <p className="err">{err}</p>}
          {msg && (
            <div className="out">
              <small className="mut">{t("wa_note")}</small>
              <span>{msg}</span>
              <div className="acts">
                <a className="btn wa" href={waLink(msg)} target="_blank" rel="noopener"><span>{t("send_wa")}</span><span className="ar">→</span></a>
                <button className="btn" type="button" onClick={copy}><span>{copied || t("copy")}</span></button>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
