import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export const dynamic = "force-static";

/** Cada página en español con su versión en inglés como alternativa (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (path: string, priority: number) => ["", "/en"].map((pre) => ({
    url: SITE + pre + path, priority,
    alternates: { languages: { es: SITE + path, en: SITE + "/en" + path } },
  }));
  return [
    ...pair("/", 1),
    ...pair("/habitaciones/", 0.9),
    ...pair("/ubicacion/", 0.8),
    ...pair("/reservar/", 0.8),
    ...["/aviso-legal/", "/privacidad/", "/cookies/"].map((p) => ({ url: SITE + p, priority: 0.2 })),
  ];
}
