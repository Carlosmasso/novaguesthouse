"use client";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { prefersReduced, waLink } from "@/lib/utils";
import { Reveal, SplitH2, Todo } from "./ui";

function Item({ n, q, a }: { n: number; q: string; a: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const det = useRef<HTMLDetailsElement>(null);
  const ans = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const d = det.current!, el = ans.current!;
    anim.current?.cancel();
    const opening = !on;
    if (prefersReduced()) { d.open = opening; setOn(opening); return; }
    if (opening) {
      d.open = true;
      const h = el.scrollHeight;
      requestAnimationFrame(() => setOn(true));
      anim.current = el.animate([{ height: "0px" }, { height: h + "px" }], { duration: 420, easing: "cubic-bezier(.22,.7,.2,1)" });
    } else {
      const h = el.offsetHeight;
      setOn(false);
      anim.current = el.animate([{ height: h + "px" }, { height: "0px" }], { duration: 320, easing: "cubic-bezier(.4,0,.2,1)" });
      anim.current.onfinish = () => { d.open = false; };
    }
  };
  return (
    <details ref={det} className={on ? "on" : ""}>
      <summary onClick={toggle}>
        <span className="qn">{String(n).padStart(2, "0")}</span><span className="qt">{q}</span><i aria-hidden="true" />
      </summary>
      <div className="ans" ref={ans}><p>{a}</p></div>
    </details>
  );
}

export default function Faq() {
  const { lang, t } = useI18n();
  const answer = (k: string) => {
    if (k === "checkin") return t("ans_checkin")(CONFIG.checkin, CONFIG.checkout);
    if (["codes", "wifi", "transport", "phone"].includes(k)) return t("ans_" + k);
    const v = (CONFIG.faq as Record<string, string[]>)[k] || ["", ""];
    return <Todo v={v[lang === "es" ? 0 : 1] || v[0]} label={t("ans_todo")} />;
  };
  return (
    <section className="band" id="faq">
      <div className="wrap">
        <Reveal className="faqhead head">
          <div><span className="eyebrow">{t("faq_eyebrow")}</span><SplitH2 text={t("faq_h")} /></div>
          <p>{t("faq_help")} <a href={waLink()} target="_blank" rel="noopener">{CONFIG.phone} →</a></p>
        </Reveal>
        <Reveal className="qgrid">
          {(t("faq") as [string, string][]).map(([k, q], i) => <Item key={lang + k} n={i + 1} q={q} a={answer(k)} />)}
        </Reveal>
      </div>
    </section>
  );
}
