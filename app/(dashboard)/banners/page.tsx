"use client";
import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "@/components/banners/BannerColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const BannersPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState([]);

    const getBanners = async () => {
        try {
            const res = await fetch("/api/banners", {
                method: "GET",
            });
            const data = await res.json();
            setBanners(data);
            setLoading(false);
        } catch (error) {
            console.log("[getBanners]", error);
        }
    }

    useEffect(() => {
        getBanners();
    }, []);

    return (
        <div className="p-10">
            <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">Banners</p>
                <Button onClick={() => router.push("/banners/new")} className="bg-[var(--color-muted-green)] text-white cursor-pointer hover:bg-[var(--color-olive-gray)]">
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Add Banner
                </Button>
            </div>
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <DataTable columns={columns} data={banners} searchKey="title" />
        </div>
    )
}

export default BannersPage;