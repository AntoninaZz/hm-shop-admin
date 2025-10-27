"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/custom ui/Loader";
import CategoryForm from "@/components/categories/CategoryForm";

const CategoryDetailsPage = () => {
  const params = useParams();
  const categoryId = params?.categoryId as string;
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(null);

  const getCategoryDetails = async () => {
    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCategoryDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[categoryId_GET]", error);
    }
  }

  useEffect(() => {
    getCategoryDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (loading ? <Loader /> :
    <CategoryForm initialData={categoryDetails} />
  )
}

export default CategoryDetailsPage;