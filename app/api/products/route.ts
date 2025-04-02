import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectToDB();
        const { name, description, media, category, tags, sizes, colors, price, expense, numberInStock, internalMaterial, externalMaterial } = await req.json();
        if (!name || !description || !media || !category || !price || !expense || !numberInStock) {
            return new NextResponse("Not enough data to create a product", { status: 400 });
        }
        const newProduct = await Product.create({
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
        });
        await newProduct.save();
        if (category) {
            for (const categoryId of category) {
                const cat = await Category.findById(categoryId);
                if (cat) {
                    cat.products.push(newProduct._id);
                    await cat.save();
                }
            }
        }
        return NextResponse.json(newProduct, { status: 200 });
    } catch (error) {
        console.log("[product_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();
        const products = await Product.find().sort({ createdAt: "desc" }).populate({ path: "category", model: Category });
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log("[Products_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}