import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import Customer from "@/lib/models/Customer";

function getOrderIdFromReq(req: NextRequest) {
    const segments = req.nextUrl.pathname.split('/');
    return segments[segments.length - 1]; // останній сегмент — orderId
}

export const GET = async (req: NextRequest) => {
    try {
        const orderId = getOrderIdFromReq(req);
        if (!orderId || orderId === "undefined") {
            return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
        }
        await connectToDB();
        const orderDetails = await Order.findById(orderId).populate({
            path: 'products.product',
            model: Product,
        });
        if (!orderDetails) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId });
        return NextResponse.json({ orderDetails, customer }, { status: 200 });
    } catch (error) {
        console.log("[orderId_GET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const orderId = getOrderIdFromReq(req);
        if (!orderId || orderId === "undefined") {
            return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
        }
        await connectToDB();
        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        const { isSent } = await req.json();
        if (isSent == undefined) {
            return NextResponse.json({ message: "Not enough data to update the order" }, { status: 400 });
        }
        if (isSent == order.isSent) {
            return NextResponse.json({ message: "Order is already up to date" }, { status: 200 });
        }
        order.isSent = isSent;
        await order.save();
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.log("[orderId_POST]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";