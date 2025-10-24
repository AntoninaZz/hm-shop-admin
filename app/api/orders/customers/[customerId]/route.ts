import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";

export const GET = async (req: NextRequest) => {
    try {
        const segments = req.nextUrl.pathname.split('/');
        const customerId = segments[segments.length - 1];
        await connectToDB();
        const orders = await Order.find({ customerClerkId: customerId }).populate({ path: "products.product", model: Product });
        return NextResponse.json(orders, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        })
    } catch (error) {
        console.log("[customerId_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";