"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { PHOTO, src } from "@/lib/data";
import { telHref, waLink } from "@/lib/utils";
import { Arrow, Icon, Reveal, Rise, Todo } from "./ui";

const WA = "M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z";
const BOOKING = "M24 0H0v24h24ZM8.575 6.563h2.658c2.108 0 3.473 1.15 3.473 2.898c0 1.15-.575 1.82-.91 2.108l-.287.263l.335.192c.815.479 1.318 1.389 1.318 2.395c0 1.988-1.51 3.257-3.857 3.257H7.449V7.713c0-.623.503-1.126 1.126-1.15m1.7 1.868c-.479.024-.694.264-.694.79v1.893h1.676c.958 0 1.294-.743 1.294-1.365c0-.815-.503-1.318-1.318-1.318zm-.096 4.36c-.407.071-.598.31-.598.79v2.251h1.868c.934 0 1.509-.55 1.509-1.533c0-.934-.599-1.509-1.51-1.509zm7.737 2.394c.743 0 1.341.599 1.341 1.342a1.34 1.34 0 0 1-1.341 1.341a1.355 1.355 0 0 1-1.341-1.341c0-.743.598-1.342 1.34-1.342z";
const AIRBNB = "M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z";

/** Página de reserva: cada vía es un gran panel de foto; WhatsApp, la directa, ocupa más. */
export default function Reserve() {
  const { t } = useI18n();
  const list = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(-1);

  // Sin ratón no hay hover: en móvil, el panel que cruza el centro de la pantalla adopta ese mismo estado
  useEffect(() => {
    const mq = matchMedia("(hover:none) and (max-width:860px)");
    let io: IntersectionObserver | undefined;
    const sync = () => {
      io?.disconnect();
      setOn(-1);
      if (!mq.matches || !list.current) return;
      const items = [...list.current.children];
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const k = items.indexOf(e.target);
          setOn((prev) => (e.isIntersecting ? k : prev === k ? -1 : prev));
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      items.forEach((el) => io?.observe(el));
    };
    sync();
    mq.addEventListener("change", sync);
    return () => { mq.removeEventListener("change", sync); io?.disconnect(); };
  }, []);

  const ways: { key: string; photo: string; logo: ReactNode; url: string; label: string }[] = [
    { key: "wa", photo: PHOTO.resWhatsapp, url: waLink(t("wa_msg")), label: t("res_wa"),
      logo: <span className="lg"><svg viewBox="0 0 24 24"><path d={WA} /></svg>WhatsApp</span> },
    { key: "bk", photo: PHOTO.resBooking, url: CONFIG.bookingUrl, label: t("res_booking"),
      logo: <span className="lg"><svg className="sq" viewBox="0 0 24 24"><path d={BOOKING} /></svg>Booking.com</span> },
    { key: "ab", photo: PHOTO.resAirbnb, url: CONFIG.airbnbUrl, label: t("res_airbnb"),
      logo: <span className="lg"><svg viewBox="0 0 24 24"><path d={AIRBNB} /></svg>airbnb</span> },
  ];
  return (
    <main>
      <section className="rs">
        <div className="wrap rs-head">
          <h1><Rise text={t("res_h")} /></h1>
          <h2 className="mini-h">{t("res_choose")}</h2>
        </div>
        <ul className="rps" ref={list}>
          {ways.map((w, k) => {
            const inner = (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(w.photo)} alt="" fetchPriority={k === 0 ? "high" : undefined} />
                <span className="rp-logo" aria-hidden="true">{w.logo}</span>
                {w.url
                  ? <span className="btn ghost"><span>{w.label}</span><Arrow /></span>
                  : <span className="rp-todo"><Todo label={t("res_todo")} /></span>}
              </>
            );
            return (
              <li key={w.key}>
                {w.url
                  ? <a className={`rp${on === k ? " on" : ""}`} href={w.url} target="_blank" rel="noopener">{inner}</a>
                  : <div className="rp off">{inner}</div>}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="sec wrap conn res-help">
        <Reveal><h2>{t("help_h")}</h2></Reveal>
        <Reveal as="ul" className="modes stag">
          <li><Icon k="phone" /><div><h3><a href={telHref()}>{CONFIG.phone}</a></h3><p>{t("f_24")}</p></div></li>
          <li><Icon k="whatsapp" /><div><h3><a href={waLink()} target="_blank" rel="noopener">WhatsApp</a></h3><p>{CONFIG.phone}</p></div></li>
          <li><Icon k="mail" /><div><h3>{CONFIG.email ? <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> : <Todo label={t("f_email")} />}</h3><p>{t("f_email")}</p></div></li>
        </Reveal>
      </section>
    </main>
  );
}
