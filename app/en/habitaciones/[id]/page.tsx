import RoomPage, { roomMetadata, roomParams } from "@/components/RoomPage";

type P = { params: Promise<{ id: string }> };

export const generateStaticParams = roomParams;
export const generateMetadata = async ({ params }: P) => roomMetadata((await params).id, "en");

export default async function Page({ params }: P) {
  return <RoomPage id={(await params).id} lang="en" />;
}
