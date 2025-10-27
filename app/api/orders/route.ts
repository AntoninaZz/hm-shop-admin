import { NextResponse } from "next/server";
import { format } from "date-fns";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";

export const GET = async () => {
    try {
        await connectToDB();
        const orders = await Order.find().sort({ createdAt: "desc" });
        const orderDetails = await Promise.all(orders.map(async (order) => {
            const customer = await Customer.findOne({ clerkId: order.customerClerkId });
            return {
                _id: order._id,
                customer: customer.name,
                products: order.products.length,
                totalAmount: order.totalAmount,
                paymentStatus: order.paymentStatus,
                isSent: order.isSent,
                createdAt: format(order.createdAt, "eee dd.MM.yyy HH:mm"),
            };
        }));
        return NextResponse.json(orderDetails, { status: 200 });
    } catch (error) {
        console.log("[orders_GET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";