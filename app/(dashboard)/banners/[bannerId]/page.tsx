import BannerDetailsPage from "@/components/banners/BannerDetailsPage";

interface BannerPageProps {
    params: { bannerId: string };
}

export default function Page({ params }: BannerPageProps) {
    return <BannerDetailsPage params={params} />;
}