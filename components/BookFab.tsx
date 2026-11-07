"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { Arrow } from "./ui";

/** Botón flotante "Reservar ahora": lleva a la página con las opciones de reserva. */
export default function BookFab() {
  const { t, href } = useI18n();
  const path = usePathname() || "/";
  if (path.replace(/\/$/, "").endsWith("/reservar")) return null;
  return <Link className="fab" href={href("/reservar/")}><span>{t("book_now")}</span><Arrow /></Link>;
}
