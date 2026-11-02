import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "@/lib/dict";
import { rooms, type Room } from "@/lib/data";
import Shell from "./Shell";
import RoomDetail from "./RoomDetail";

/** Ficha de habitación, compartida por /habitaciones/[id] y /en/habitaciones/[id]. */
export const roomParams = () => rooms.map((r) => ({ id: r.id }));

export function roomMetadata(id: string, lang: Lang): Metadata {
  const r = rooms.find((x) => x.id === id);
  if (!r) return {};
  const path = `/habitaciones/${r.id}/`;
  const title = `${r.name[lang]} · Nova Guest House Central`;
  return {
    title, description: r.lead[lang],
    alternates: { canonical: (lang === "en" ? "/en" : "") + path, languages: { es: path, en: "/en" + path, "x-default": path } },
    openGraph: { title, description: r.lead[lang], images: [`/img/${r.imgs[0]}.jpg`], locale: lang === "en" ? "en_GB" : "es_ES" },
  };
}

export default function RoomPage({ id, lang }: { id: string; lang: Lang }) {
  if (!rooms.some((r) => r.id === id)) notFound();
  return (
    <Shell lang={lang} solid>
      <main><RoomDetail id={id as Room["id"]} /></main>
    </Shell>
  );
}
