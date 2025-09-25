import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";

export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
    try {
        await connectToDB();
        const orders = await Order.find({ customerClerkId: params.customerId }).populate({ path: "products.product", model: Product });
        return NextResponse.json(orders, { status: 200 })
    } catch (error) {
        console.log("[customerId_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}