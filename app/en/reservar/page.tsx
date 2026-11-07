import Shell from "@/components/Shell";
import Reserve from "@/components/Reserve";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/reservar/", "en", "Book", "Book your stay at Nova Guest House Central on WhatsApp, Booking.com or Airbnb.");

export default function Page() {
  return <Shell lang="en"><Reserve /></Shell>;
}
