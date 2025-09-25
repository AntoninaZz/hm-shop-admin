import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        await connectToDB();
        const product = await Product.findById(params.productId).populate({ path: "category", model: Category });
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }
        return NextResponse.json(product, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (error) {
        console.log("[productId_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectToDB();
        const product = await Product.findById(params.productId);
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }
        const { name, description, media, category, tags, sizes, colors, price, expense, numberInStock, internalMaterial, externalMaterial, discount } = await req.json();
        if (!name || !description || !media || !category || !price || !expense || !numberInStock) {
            return new NextResponse("Not enough data to create a product", { status: 400 });
        }
        const addedCategories = category.filter((categoryId: string) => !product.category.includes(categoryId));
        const removedCategories = product.category.filter((categoryId: string) => !category.includes(categoryId.toString()));
        if (addedCategories || removedCategories) {
            await Promise.all([
                ...addedCategories.map((categoryId: string) => Category.findByIdAndUpdate(categoryId, {
                    $push: { products: product._id },
                })),
                ...removedCategories.map((categoryId: string) => Category.findByIdAndUpdate(categoryId, {
                    $pull: { products: product._id },
                }))
            ]);
        }
        const updatedProduct = await Product.findByIdAndUpdate(product._id, {
            name,
            description,
            media,
            category,
            tags,
            sizes,
            colors,
            price,
            expense,
            numberInStock,
            internalMaterial,
            externalMaterial,
            discount,
        }, { new: true }).populate({ path: 'category', model: Category });
        await updatedProduct.save();
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.log("[productId_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectToDB();
        const product = await Product.findById(params.productId);
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }
        await Product.findByIdAndDelete(product._id);
        await Promise.all(
            product.category.map((categoryId: string) =>
                Category.findByIdAndUpdate(categoryId, {
                    $pull: { products: product._id },
                }))
        );
        return new NextResponse("Product is deleted", { status: 200 });
    } catch (error) {
        console.log("[productId_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}