"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500).trim(),
    image: z.string(),
    url: z.string(),
});

interface BannerFormProps {
    initialData?: BannerType | null;
}

const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            image: "",
            url: "",
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
            const url = initialData ? `/api/banners/${initialData._id}` : "/api/banners";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Banner ${initialData ? "updated" : "created"} successfully`);
                window.location.href = "/banners";
                router.push("/banners");
            }
        } catch (error) {
            console.log("BannerForm", error);
            toast.error("Oops! Something went wrong :(");
        }
    }

    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Banner</h1>
                    <Delete item="banner" id={initialData._id} />
                </div>
            ) : (<h1 className="text-2xl font-semibold">Add Banner</h1>)}
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Banner Title" {...field} onKeyDown={handleKeyPress} />
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
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="URL" {...field} onKeyDown={handleKeyPress} />
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
                        <Button type="button" onClick={() => router.push('/banners')} className="cursor-pointer bg-[var(--color-powder-pink)] text-white hover:saturate-200">Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default BannerForm;