import type { ReactNode } from "react";
import { CONFIG } from "@/lib/config";
import Shell from "./Shell";
import { Todo } from "./ui";

/** Plantilla de los textos legales (solo en español). Revísalos con tu gestoría antes de publicar. */
export default function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Shell lang="es" solid>
      <main className="legal wrap">
        <span className="eyebrow">Información legal</span>
        <h1>{title}</h1>
        <p className="upd">Última actualización: {updated}</p>
        {children}
      </main>
    </Shell>
  );
}

/** Datos del titular, con los huecos pendientes resaltados. */
export const Owner = () => <Todo v={CONFIG.owner} label="Nombre o razón social del titular" />;
export const Nif = () => <Todo v={CONFIG.nif} label="NIF / CIF" />;
export const Email = () => (CONFIG.email ? <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> : <Todo label="Email de contacto" />);
export const Address = () => <>{CONFIG.address.replace(" · ", ", ")}</>;
