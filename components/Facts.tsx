"use client";
import { useI18n } from "@/lib/i18n";
import { Icon } from "./ui";
import BookBar from "./BookBar";

export default function Facts() {
  const { t } = useI18n();
  const items: [string, string][] = [["shower", "fa1"], ["lock", "fa2"], ["ac", "fa3"], ["wifi", "fa4"]];
  return (
    <div className="wrap bkbar">
      <BookBar />
      <div className="facts">
        {items.map(([ic, k]) => (
          <div key={k}><Icon k={ic} /><p><b>{t(k)}</b><span>{t(k + "s")}</span></p></div>
        ))}
      </div>
    </div>
  );
}
