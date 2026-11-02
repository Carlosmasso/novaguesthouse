import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/lib/i18n";
import { LightboxProvider } from "@/components/Lightbox";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Guest House Central · Alcorcón, Madrid",
  description: "Guest house boutique en Alcorcón, Madrid. Habitaciones privadas con baño, llegada autónoma 24 h y atención los 365 días.",
  openGraph: { title: "Nova Guest House Central", description: "Guest house boutique en Alcorcón, Madrid.", images: ["/img/1000252614.jpg"], locale: "es_ES", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Figtree:wght@400;500;600&display=swap" />
      </head>
      <body>
        <LangProvider>
          <LightboxProvider>{children}</LightboxProvider>
        </LangProvider>
      </body>
    </html>
  );
}
