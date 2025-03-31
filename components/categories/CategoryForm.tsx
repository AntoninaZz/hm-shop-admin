"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
    categoryName: z.string().min(2).max(50),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
});

interface CategoryFormProps {
    initialData?: CategoryType | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            categoryName: "",
            description: "",
            image: "",
        },
    });

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initialData ? `/api/categories/${params.categoryId}` : "/api/categories";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Category ${initialData ? "updated" : "created"} successfully`);
                window.location.href = "/categories";
                router.push("/categories");
            }
        } catch (error) {
            console.log("CategoryForm", error);
            toast.error("Oops! Something went wrong :(");
        }
    }

    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Category</h1>
                    <Delete id={initialData._id} />
                </div>
            ) : (<h1 className="text-2xl font-semibold">Add Category</h1>)}
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="categoryName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Category Name" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-10">
                        <Button type="submit" className="cursor-pointer bg-[var(--color-muted-green)] text-white hover:bg-[var(--color-olive-gray)]">Submit</Button>
                        <Button type="button" onClick={() => router.push('/categories')} className="cursor-pointer bg-[var(--color-powder-pink)] text-white hover:saturate-200">Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CategoryForm;