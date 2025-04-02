"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/products/ProductsColumns";

const ProductsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductType[]>([]);

    const getProducts = async () => {
        try {
            const res = await fetch("/api/products", {
                method: "GET",
            });
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.log("[getProducts]", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (loading ? <Loader /> :
        <div className="p-10">
            <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">Products</p>
                <Button onClick={() => router.push("/products/new")} className="bg-[var(--color-muted-green)] text-white cursor-pointer hover:bg-[var(--color-olive-gray)]">
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </div>
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <DataTable columns={columns} data={products} searchKey="name" />
        </div>
    )
}

export default ProductsPage;