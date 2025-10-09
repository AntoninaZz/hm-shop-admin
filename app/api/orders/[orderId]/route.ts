import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import Customer from "@/lib/models/Customer";

export const GET = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
    try {
        await connectToDB();
        const orderDetails = await Order.findById(params.orderId).populate({
            path: 'products.product',
            model: Product,
        });
        if (!orderDetails) {
            return new NextResponse(JSON.stringify({ message: "Not Found" }), { status: 404 });
        }
        const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId });
        return NextResponse.json({ orderDetails, customer }, { status: 200 });
    } catch (error) {
        console.log("[orderId_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const POST = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
    try {
        await connectToDB();
        const order = await Order.findById(params.orderId);
        if (!order) {
            return new NextResponse(JSON.stringify({ message: "Order not found" }), { status: 404 });
        }
        const { isSent } = await req.json();
        if (isSent == undefined) {
            return new NextResponse("Not enough data to update the order", { status: 400 });
        }
        if (isSent == order.isSent) {
            return new NextResponse("Order is already up to date", { status: 200 });
        }
        order.isSent = isSent;
        await order.save();
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.log("[orderId_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";