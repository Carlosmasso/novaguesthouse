import Shell from "@/components/Shell";
import LocationPage from "@/components/LocationPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/ubicacion/", "en", "Location", "In Alcorcón, at the gates of Madrid, with excellent metro, train and bus links.");

export default function Page() {
  return <Shell lang="en"><LocationPage /></Shell>;
}
