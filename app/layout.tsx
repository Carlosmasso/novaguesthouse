import type { Metadata, Viewport } from "next";
import { Jost, Figtree } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

// Fuentes servidas desde nuestro dominio (next/font las descarga al compilar): sin llamadas a Google desde el navegador
const jost = Jost({ subsets: ["latin"], weight: ["200", "300", "400", "500"], variable: "--font-jost", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Nova Guest House Central · Alcorcón, Madrid",
  description: "Guest house boutique en Alcorcón, Madrid. Habitaciones privadas con baño, llegada autónoma 24 h y atención los 365 días.",
  openGraph: { siteName: "Nova Guest House Central", images: ["/img/1000252614.jpg"], type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

// Un solo layout raíz: <html lang> se corrige a "en" en cliente desde LangProvider en las páginas /en
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jost.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
