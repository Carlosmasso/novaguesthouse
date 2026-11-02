import type { Metadata } from "next";
import Legal, { Address, Email, Nif, Owner } from "@/components/Legal";
import { Todo } from "@/components/ui";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = { title: "Aviso legal · Nova Guest House Central", alternates: { canonical: "/aviso-legal/" } };

export default function Page() {
  return (
    <Legal title="Aviso legal" updated="noviembre de 2026">
      <h2>Titular de la web</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
      <ul>
        <li>Titular: <Owner /></li>
        <li>NIF/CIF: <Nif /></li>
        <li>Domicilio: <Address /></li>
        <li>Teléfono: {CONFIG.phone}</li>
        <li>Email: <Email /></li>
        <li>Nº de registro turístico (Comunidad de Madrid): <Todo v={CONFIG.registry} label="pendiente" /></li>
      </ul>

      <h2>Objeto</h2>
      <p>Esta web informa sobre el alojamiento Nova Guest House Central y permite enviar solicitudes de reserva por WhatsApp o acceder a sus fichas en plataformas de reserva. Las solicitudes enviadas no constituyen una reserva confirmada hasta que el titular la confirme expresamente.</p>

      <h2>Condiciones de uso</h2>
      <p>El acceso a la web es gratuito y supone la aceptación de este aviso legal. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.</p>

      <h2>Propiedad intelectual</h2>
      <p>Los textos, fotografías, diseño y demás contenidos de esta web pertenecen al titular o se usan con autorización. Queda prohibida su reproducción, distribución o transformación sin permiso expreso.</p>

      <h2>Enlaces a terceros</h2>
      <p>La web contiene enlaces a servicios de terceros (WhatsApp, Booking.com, Airbnb, Google Maps, Instagram). El titular no se responsabiliza de sus contenidos ni de sus políticas, que conviene consultar en cada caso.</p>

      <h2>Precios y disponibilidad</h2>
      <p>Los precios mostrados son orientativos («desde») y pueden variar según fechas y canal de reserva. La disponibilidad se sincroniza periódicamente con las plataformas de reserva y puede no reflejar cambios de los últimos minutos.</p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa de consumidores y usuarios.</p>
    </Legal>
  );
}
