import Shell from "@/components/Shell";
import LocationPage from "@/components/LocationPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/ubicacion/", "es", "Ubicación", "En Alcorcón, a las puertas de Madrid y muy bien conectados en Metro, Cercanías y autobús.");

export default function Page() {
  return <Shell lang="es"><LocationPage /></Shell>;
}
