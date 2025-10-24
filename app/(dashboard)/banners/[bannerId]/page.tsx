"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/custom ui/Loader";
import BannerForm from "@/components/banners/BannerForm";

const BannerDetailsPage = () => {
  const params = useParams();
  const bannerId = params?.productId as string;
  const [loading, setLoading] = useState(true);
  const [bannerDetails, setBannerDetails] = useState<BannerType | null>(null);

  const getBannerDetails = async () => {
    try {
      const res = await fetch(`/api/banners/${bannerId}`, {
        method: "GET",
      });
      const data = await res.json();
      setBannerDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[bannerId_GET]", error);
    }
  }

  useEffect(() => {
    getBannerDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (loading ? <Loader /> :
    <BannerForm initialData={bannerDetails} />
  )
}

export default BannerDetailsPage;