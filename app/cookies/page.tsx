import type { Metadata } from "next";
import Legal from "@/components/Legal";

export const metadata: Metadata = { title: "Política de cookies · Nova Guest House Central", alternates: { canonical: "/cookies/" } };

export default function Page() {
  return (
    <Legal title="Política de cookies" updated="noviembre de 2026">
      <h2>Esta web no usa cookies propias</h2>
      <p>No instalamos cookies de análisis, publicidad ni seguimiento. Por eso no te mostramos un aviso de cookies al entrar. Las fuentes tipográficas y las imágenes se sirven desde nuestro propio dominio.</p>

      <h2>Contenido de terceros bajo demanda</h2>
      <p>El mapa de la sección «Ubicación» no se carga hasta que pulsas «Ver mapa interactivo». En ese momento tu navegador se conecta a Google Maps, que puede instalar sus propias cookies según la <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener">política de Google</a>.</p>
      <p>Los enlaces a WhatsApp, Booking.com, Airbnb, Google Maps e Instagram te llevan a esos servicios, que aplican sus propias políticas de cookies.</p>

      <h2>Cómo gestionar las cookies</h2>
      <p>Puedes ver y borrar las cookies desde la configuración de tu navegador. Si cambiamos el uso de cookies de esta web, actualizaremos esta política y, si hace falta, te pediremos tu consentimiento.</p>
    </Legal>
  );
}
