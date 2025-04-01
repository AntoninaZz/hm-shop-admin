import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

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
        return NextResponse.json(newProduct, { status: 200 });
    } catch (error) {
        console.log("[product_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}