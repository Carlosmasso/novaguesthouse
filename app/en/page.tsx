import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Nova Guest House Central · Alcorcón, Madrid",
  description: "Boutique guesthouse in Alcorcón, Madrid. Private rooms with en-suite bathroom, 24 h self check-in and support every day of the year.",
  alternates: { canonical: "/en/", languages: { es: "/", en: "/en/", "x-default": "/" } },
  openGraph: { title: "Nova Guest House Central", description: "Boutique guesthouse in Alcorcón, Madrid.", locale: "en_GB", url: "/en/" },
};

export default function Page() {
  return <Home lang="en" />;
}
