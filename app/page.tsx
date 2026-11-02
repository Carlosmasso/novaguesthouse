import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Facts from "@/components/Facts";
import Gallery from "@/components/Gallery";
import Rooms from "@/components/Rooms";
import Location from "@/components/Location";
import Arrival from "@/components/Arrival";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Booking from "@/components/Booking";
import Closer from "@/components/Closer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
