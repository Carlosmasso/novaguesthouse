import type { Lang } from "@/lib/dict";
import { CONFIG, SHOW_DEMO, SITE } from "@/lib/config";
import { BookingProvider } from "@/lib/booking";
import Shell from "./Shell";
import Hero from "./Hero";
import Facts from "./Facts";
import Gallery from "./Gallery";
import Rooms from "./Rooms";
import Location from "./Location";
import Arrival from "./Arrival";
import Reviews from "./Reviews";
import Faq from "./Faq";
import Booking from "./Booking";
import Closer from "./Closer";

/** Datos estructurados para Google (schema.org/LodgingBusiness). */
function jsonLd(lang: Lang) {
  const prices = Object.values(CONFIG.rooms).map((r) => parseFloat(r.price)).filter((n) => n > 0);
  const votes = parseInt(CONFIG.ratingSource.replace(/\D+/g, " ").trim().split(" ").pop() || "", 10);
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Nova Guest House Central",
    url: `${SITE}${lang === "en" ? "/en/" : "/"}`,
    image: [`${SITE}/img/1000252614.jpg`, `${SITE}/img/1000252617.jpg`],
    telephone: "+34 " + CONFIG.phone,
    ...(CONFIG.email && { email: CONFIG.email }),
    address: { "@type": "PostalAddress", streetAddress: CONFIG.postal.street, postalCode: CONFIG.postal.cp, addressLocality: CONFIG.postal.city, addressRegion: CONFIG.postal.region, addressCountry: "ES" },
    checkinTime: CONFIG.checkin, checkoutTime: CONFIG.checkout,
    ...(prices.length && { priceRange: `${Math.min(...prices)}–${Math.max(...prices)} €` }),
    ...(CONFIG.instagram && { sameAs: [CONFIG.instagram] }),
    amenityFeature: ["Wi-Fi", "Aire acondicionado", "Baño privado", "Llegada autónoma 24 h"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    // Solo puntuación real: nunca la de los datos de demostración
    ...(!SHOW_DEMO && CONFIG.rating && votes > 0 && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: CONFIG.rating.replace(",", "."), bestRating: "10", ratingCount: votes },
    }),
  };
}

export default function Home({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      <BookingProvider>
        <main id="inicio">
          <Hero />
          <Facts />
          <Gallery />
          <Rooms />
          <Location />
          <Arrival />
          <Reviews />
          <Faq />
          <Booking />
          <Closer />
        </main>
      </BookingProvider>
    </Shell>
  );
}
