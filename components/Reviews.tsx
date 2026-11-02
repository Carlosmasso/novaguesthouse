"use client";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { Head, Reveal, Todo } from "./ui";

export default function Reviews() {
  const { t } = useI18n();
  return (
    <section className="plain" id="opiniones">
      <div className="wrap">
        <Head eyebrow={t("rev_eyebrow")} title={t("rev_h")}>
          <div className="revtop">
            <span className="score">{CONFIG.rating || <span className="todo">[—]</span>}<small>/10</small></span>
            <span style={{ color: "var(--muted)", fontSize: 14, paddingBottom: 10 }}><Todo v={CONFIG.ratingSource} label={t("score_src")} /></span>
          </div>
        </Head>
        <Reveal className="hl">
          <span className="lab">{t("rev_hl_t")}</span>
          <ul>{(t("rev_hl") as string[]).map((x) => <li key={x}>{x}</li>)}</ul>
        </Reveal>
        <Reveal className="reviews">
          {CONFIG.reviews.map((r, k) => (
            <article className="rev" key={k}>
              <q><Todo v={r.text} label={t("rev_text")} /></q>
              <div className="who">
                <span><b><Todo v={r.name} label={t("rev_name")} /></b> · <Todo v={r.origin} label={t("rev_origin")} /></span>
                <span><Todo v={r.date} label={t("rev_date")} /></span>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
