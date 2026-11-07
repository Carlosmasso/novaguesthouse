import Shell from "@/components/Shell";
import Reserve from "@/components/Reserve";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/reservar/", "es", "Reservar", "Reserva tu estancia en Nova Guest House Central por WhatsApp, Booking.com o Airbnb.");

export default function Page() {
  return <Shell lang="es"><Reserve /></Shell>;
}
