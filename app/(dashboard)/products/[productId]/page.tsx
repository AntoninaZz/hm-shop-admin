"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";

const ProductDetailsPage = () => {
    const params = useParams();
    const productId = params?.productId as string;
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState<ProductType | null>(null);

    const getProductDetails = async () => {
        try {
            const res = await fetch(`/api/products/${productId}`, { method: "GET", });
            const data = await res.json();
            setProductDetails(data);
        } catch (error) {
            console.log("[productId_GET]", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (loading ? <Loader /> : (
        <ProductForm initialData={productDetails} />
    )
    )
}

export default ProductDetailsPage;