import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Figtree } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

// Fuentes servidas desde nuestro dominio (next/font las descarga al compilar): sin llamadas a Google desde el navegador
const display = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Nova Guest House Central · Alcorcón, Madrid",
  description: "Guest house boutique de cuatro habitaciones con baño privado en Alcorcón, a las puertas de Madrid.",
  openGraph: { siteName: "Nova Guest House Central", images: ["/img/1000252617.jpg"], type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#14110E" };

// Un solo layout raíz: <html lang> se corrige a "en" en cliente desde LangProvider en las páginas /en
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${display.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
