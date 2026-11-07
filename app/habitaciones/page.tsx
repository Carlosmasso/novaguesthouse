import Shell from "@/components/Shell";
import RoomsPage from "@/components/RoomsPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/habitaciones/", "es", "Habitaciones", "Cuatro habitaciones boutique con baño privado en Alcorcón, a las puertas de Madrid.");

export default function Page() {
  return <Shell lang="es"><RoomsPage /></Shell>;
}
