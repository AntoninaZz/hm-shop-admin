"use client";
import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "@/components/categories/CategoryColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const CategoriesPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log("[getCategories]", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Categories</p>
        <Button onClick={() => router.push("/categories/new")} className="bg-[var(--color-muted-green)] text-white cursor-pointer hover:bg-[var(--color-olive-gray)]">
          <CirclePlus className="h-4 w-4 mr-2"/>
          Add Category
        </Button>
      </div>
      <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
      <DataTable columns={columns} data={categories} searchKey="name" />
    </div>
  )
}

export default CategoriesPage;