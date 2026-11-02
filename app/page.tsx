import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { es: "/", en: "/en/", "x-default": "/" } },
  openGraph: { title: "Nova Guest House Central", description: "Guest house boutique en Alcorcón, Madrid.", locale: "es_ES", url: "/" },
};

export default function Page() {
  return <Home lang="es" />;
}
