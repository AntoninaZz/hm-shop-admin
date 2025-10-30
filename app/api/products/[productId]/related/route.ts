import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const segments = req.nextUrl.pathname.split('/');
        const productId = segments[segments.length - 2];
        if (!productId || productId === "undefined") {
            return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
        }
        await connectToDB();
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        const relatedProducts = await Product.find({
            $or: [
                { tags: { $in: product.tags } },
            ],
            _id: { $ne: product._id }
        }).populate({ path: "category", model: Category });
        if (!relatedProducts) {
            return NextResponse.json({ message: "No related products found" }, { status: 404 });
        }
        return NextResponse.json(relatedProducts, { status: 200 });
    } catch (error) {
        console.log("[related_GET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";