import Shell from "@/components/Shell";
import RoomsPage from "@/components/RoomsPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/habitaciones/", "en", "Rooms", "Four boutique rooms with private bathroom in Alcorcón, at the gates of Madrid.");

export default function Page() {
  return <Shell lang="en"><RoomsPage /></Shell>;
}
