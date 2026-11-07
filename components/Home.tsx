import type { Lang } from "@/lib/dict";
import { CONFIG, SITE } from "@/lib/config";
import Shell from "./Shell";
import Hero from "./Hero";
import RoomsTeaser from "./RoomsTeaser";
import LocationTeaser from "./LocationTeaser";

/** Datos estructurados para Google (schema.org/LodgingBusiness). */
function jsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Nova Guest House Central",
    url: `${SITE}${lang === "en" ? "/en/" : "/"}`,
    image: [`${SITE}/img/1000252617.jpg`, `${SITE}/img/1000252614.jpg`],
    telephone: "+34 " + CONFIG.phone,
    ...(CONFIG.email && { email: CONFIG.email }),
    address: { "@type": "PostalAddress", streetAddress: CONFIG.postal.street, postalCode: CONFIG.postal.cp, addressLocality: CONFIG.postal.city, addressRegion: CONFIG.postal.region, addressCountry: "ES" },
    checkinTime: CONFIG.checkin, checkoutTime: CONFIG.checkout,
    ...(CONFIG.instagram && { sameAs: [CONFIG.instagram] }),
    amenityFeature: ["Wi-Fi", "Aire acondicionado", "Baño privado", "Self check-in"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  };
}

export default function Home({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      <main id="inicio">
        <Hero />
        <RoomsTeaser />
        <LocationTeaser />
      </main>
    </Shell>
  );
}
