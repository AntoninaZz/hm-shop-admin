import BannerDetailsPage from "@/components/banners/BannerDetailsPage";

export default async function Page({ params }: { params: Promise<{ bannerId: string }> }) {
  const { bannerId } = await params;
  return <BannerDetailsPage params={{ bannerId }} />;
}