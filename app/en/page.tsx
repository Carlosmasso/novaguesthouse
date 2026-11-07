import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Nova Guest House Central · Alcorcón, Madrid",
  description: "Boutique guesthouse with four private-bathroom rooms in Alcorcón, at the gates of Madrid.",
  alternates: { canonical: "/en/", languages: { es: "/", en: "/en/", "x-default": "/" } },
  openGraph: { title: "Nova Guest House Central", description: "Boutique guesthouse in Alcorcón, Madrid.", locale: "en_GB", url: "/en/" },
};

export default function Page() {
  return <Home lang="en" />;
}
