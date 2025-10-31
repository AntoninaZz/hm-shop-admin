import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import Category from "@/lib/models/Category";

export const GET = async (req: NextRequest) => {
    try {
        const segments = req.nextUrl.pathname.split('/');
        const query = segments[segments.length - 1];
        await connectToDB();
        const searchedProducts = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { tags: { $in: [new RegExp(query, "i")] } },
            ],
        }).populate({ path: "category", model: Category });
        return NextResponse.json(searchedProducts, { status: 200 });
    } catch (error) {
        console.log("[search_GET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";