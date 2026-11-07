import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { Arrow } from "@/components/ui";

export const metadata: Metadata = { title: "Página no encontrada · Nova Guest House Central", robots: { index: false } };

// Netlify sirve este archivo como 404.html para cualquier dirección que no exista
export default function NotFound() {
  return (
    <Shell lang="es">
      <main className="nf">
        <h1>Esta página no existe</h1>
        <p lang="en">This page doesn’t exist</p>
        <Link className="btn" href="/"><span>Volver al inicio</span><Arrow /></Link>
      </main>
    </Shell>
  );
}
