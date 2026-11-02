import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomDetail from "@/components/RoomDetail";
import { rooms, type Room } from "@/lib/data";

export function generateStaticParams() {
  return rooms.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = rooms.find((x) => x.id === id);
  return r ? { title: `${r.name.es} · Nova Guest House Central`, description: r.lead.es } : {};
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!rooms.some((r) => r.id === id)) notFound();
  return (
    <>
      <Header forceSolid />
      <main><RoomDetail id={id as Room["id"]} /></main>
      <Footer />
    </>
  );
}
