"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500).trim(),
    media: z.array(z.string()),
    category: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
    internalMaterial: z.array(z.string()),
    externalMaterial: z.array(z.string()),
    variants: z.array(z.object({
        color: z.string().optional(),
        size: z.string().optional(),
        numberInStock: z.coerce.number().min(0),
    })),
    // numberInStock: z.coerce.number().min(0),
    discount: z.coerce.number().min(0).max(100),
});

interface ProductFormProps {
    initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const getCategories = async () => {
        try {
            const res = await fetch("/api/categories", {
                method: "GET",
            });
            const data = await res.json();
            setCategories(await data);
            setLoading(false);
        } catch (error) {
            console.log("[categories_GET]", error);
            toast.error("Oops! Something went wrong :(");
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? { ...initialData, category: initialData.category.map((category) => category._id) } : {
            name: "",
            description: "",
            media: [],
            category: [],
            tags: [],
            sizes: [],
            colors: [],
            price: 0.1,
            expense: 0.1,
            internalMaterial: [],
            externalMaterial: [],
            variants: [],
            // numberInStock: 1,
            discount: 0,
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
            const url = initialData ? `/api/products/${initialData._id}` : "/api/products";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Product ${initialData ? "updated" : "created"} successfully`);
                window.location.href = "/products";
                router.push("/products");
            }
        } catch (error) {
            console.log("ProductForm", error);
            toast.error("Oops! Something went wrong :(");
        }
    }

    useEffect(() => {
        const colors = form.getValues("colors");
        const sizes = form.getValues("sizes");
        const variants = form.getValues("variants");
        const newVariants: [{ color?: string, size?: string, numberInStock: number }] = [{ color: undefined, size: undefined, numberInStock: 0 }];
        const colorOptions = colors.length ? colors : [null];
        const sizeOptions = sizes.length ? sizes : [null];
        for (const colorOption of colorOptions) {
            for (const sizeOption of sizeOptions) {
                const existing = variants.find(
                    (variant) => variant.color === colorOption && variant.size === sizeOption
                );
                const color = colorOption || undefined;
                const size = sizeOption || undefined;
                newVariants.push({
                    color,
                    size,
                    numberInStock: existing?.numberInStock ?? 0,
                });
            }
        }
        if (newVariants.length !== variants.length) {
            form.setValue("variants", newVariants);
        }
    }, [form.watch("colors"), form.watch("sizes")]); // eslint-disable-line react-hooks/exhaustive-deps

    return (loading ? <Loader /> :
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Product</h1>
                    <Delete item="product" id={initialData._id} />
                </div>
            ) : (<h1 className="text-2xl font-semibold">Add Product</h1>)}
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Product Name" {...field} onKeyDown={handleKeyPress} />
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
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) => {
                                            const currentImages = form.getValues("media");
                                            form.setValue("media", [...currentImages, url], { shouldValidate: true });
                                        }}
                                        onRemove={(url) => field.onChange([...field.value.filter((image) => image !== url),])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (₴)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Price" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expense (₴)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Expense" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="m-0">Discount (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Discount" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {categories.length > 0 && (
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                placeholder="Category"
                                                categories={categories}
                                                value={field.value}
                                                onChange={(_id) => field.onChange([...field.value, _id])}
                                                onRemove={(idToRemove) => field.onChange([...field.value.filter((categoryId) => categoryId !== idToRemove)])}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="externalMaterial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>External Material</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="External Material"
                                            value={field.value}
                                            onChange={(material) => field.onChange([...field.value, material])}
                                            onRemove={(materialToRemove) => field.onChange([...field.value.filter((material) => material !== materialToRemove)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="internalMaterial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Internal Material</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Internal Material"
                                            value={field.value}
                                            onChange={(material) => field.onChange([...field.value, material])}
                                            onRemove={(materialToRemove) => field.onChange([...field.value.filter((material) => material !== materialToRemove)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Colors (hex)</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Colors"
                                            value={field.value}
                                            onChange={(color) => field.onChange([...field.value, color])}
                                            onRemove={(colorToRemove) => field.onChange([...field.value.filter((color) => color !== colorToRemove)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Sizes"
                                            value={field.value}
                                            onChange={(size) => field.onChange([...field.value, size])}
                                            onRemove={(sizeToRemove) => field.onChange([...field.value.filter((size) => size !== sizeToRemove)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Tags"
                                            value={field.value}
                                            onChange={(tag) => field.onChange([...field.value, tag])}
                                            onRemove={(tagToRemove) => field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="variants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>In Stock</FormLabel>
                                    {field.value.map((variant, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <div className="flex gap-2 items-center w-3/8">
                                                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: variant.color || "#ffffff", }}></div>
                                                <span className="text-xs w-3/4 text-[var(--color-olive-gray)]">{variant.size || "—"}</span>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Number in stock"
                                                    value={variant.numberInStock}
                                                    min={0}
                                                    onChange={(e) => {
                                                        const updated = [...field.value];
                                                        updated[i].numberInStock = Math.max(0, parseInt(e.target.value) || 0);
                                                        field.onChange(updated);
                                                    }}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </FormControl>
                                        </div>
                                    ))}
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="numberInStock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="m-0">In Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Number in stock" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>
                    <div className="flex gap-10">
                        <Button type="submit" className="cursor-pointer bg-[var(--color-muted-green)] text-white hover:bg-[var(--color-olive-gray)]">Submit</Button>
                        <Button type="button" onClick={() => router.push('/products')} className="cursor-pointer bg-[var(--color-powder-pink)] text-white hover:saturate-200">Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ProductForm;