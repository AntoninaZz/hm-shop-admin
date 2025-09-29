import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";

export const GET = async (req: NextRequest, { params }: { params: { query: string } }) => {
    try {
        await connectToDB();
        const searchedProducts = await Product.find({
            $or: [
                { name: { $regex: params.query, $options: "i" } },
                { tags: { $in: [new RegExp(params.query, "i")] } },
            ],
        });
        console.log(searchedProducts)
        return NextResponse.json(searchedProducts, { status: 200 });
    } catch (error) {
        console.log("[search_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";