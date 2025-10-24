"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import BannerForm from "@/components/banners/BannerForm";

interface BannerDetailsPageProps {
    params: { bannerId: string };
}

const BannerDetailsPage: React.FC<BannerDetailsPageProps> = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [bannerDetails, setBannerDetails] = useState<BannerType | null>(null);

    const getBannerDetails = async () => {
        try {
            const res = await fetch(`/api/banners/${params.bannerId}`, {
                method: "GET",
            });
            const data = await res.json();
            setBannerDetails(data);
            setLoading(false);
        } catch (error) {
            console.log("[bannerId_GET]", error);
        }
    };

    useEffect(() => {
        getBannerDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return loading ? <Loader /> : <BannerForm initialData={bannerDetails} />;
};

export default BannerDetailsPage;
