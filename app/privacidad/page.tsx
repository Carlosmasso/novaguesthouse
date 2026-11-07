import type { Metadata } from "next";
import Legal, { Address, Email, Nif, Owner } from "@/components/Legal";

export const metadata: Metadata = { title: "Política de privacidad · Nova Guest House Central", alternates: { canonical: "/privacidad/" } };

export default function Page() {
  return (
    <Legal title="Política de privacidad" updated="noviembre de 2026">
      <h2>Responsable del tratamiento</h2>
      <p><Owner /> (NIF <Nif />), con domicilio en <Address />. Contacto: <Email />.</p>

      <h2>Qué datos tratamos y para qué</h2>
      <ul>
        <li><b>Solicitudes de reserva y consultas.</b> La web no tiene formularios ni guarda datos en nuestros servidores: el botón de WhatsApp abre un mensaje que tú decides enviar. Al recibirlo tratamos tu nombre, teléfono, fechas y número de huéspedes para gestionar tu solicitud y, en su caso, tu estancia.</li>
        <li><b>Registro de viajeros.</b> Si te alojas, la normativa nos obliga a recoger los datos de tu documento de identidad y comunicarlos a las autoridades (Real Decreto 933/2021).</li>
        <li><b>Contacto por teléfono, WhatsApp o email.</b> Usamos los datos que nos facilites solo para responderte.</li>
      </ul>

      <h2>Base legal</h2>
      <p>La gestión de solicitudes y estancias se basa en la ejecución de un contrato o de medidas precontractuales a petición tuya (art. 6.1.b RGPD). El registro de viajeros, en el cumplimiento de una obligación legal (art. 6.1.c RGPD).</p>

      <h2>Cuánto tiempo los conservamos</h2>
      <p>Las consultas que no terminan en reserva se eliminan en un plazo máximo de un año. Los datos de estancias se conservan el tiempo exigido por la normativa fiscal y de registro de viajeros (hasta tres años para este último).</p>

      <h2>Con quién se comparten</h2>
      <p>No vendemos ni cedemos tus datos. Intervienen como proveedores: WhatsApp (Meta Platforms Ireland) para la mensajería; Netlify, Inc. como alojamiento de la web (con garantías para transferencias internacionales mediante cláusulas contractuales tipo); y, si reservas a través de ellas, Booking.com o Airbnb, con sus propias políticas. Comunicamos los datos de registro a las Fuerzas y Cuerpos de Seguridad cuando la ley lo exige.</p>

      <h2>Tus derechos</h2>
      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <Email />. Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>).</p>
    </Legal>
  );
}
