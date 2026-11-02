"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { src } from "@/lib/data";
import { waLink } from "@/lib/utils";

export default function Closer() {
  const { t, href } = useI18n();
  return (
    <section className="closer" aria-label="Contacto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src("1000252616")} alt="" loading="lazy" />
      <div className="wrap">
        <span className="eyebrow" style={{ color: "var(--night-muted)" }}>{t("cl_eyebrow")}</span>
        <h2>{t("cl_h")}</h2>
        <p>{t("cl_p")}</p>
        <div className="acts">
          <a className="btn light" href={waLink()} target="_blank" rel="noopener"><span>{t("cl_wa")}</span><span className="ar">→</span></a>
          <Link className="btn light" href={href("/#habitaciones")} style={{ borderColor: "transparent" }}><span>{t("see_rooms")}</span><span className="ar">→</span></Link>
        </div>
      </div>
    </section>
  );
}
