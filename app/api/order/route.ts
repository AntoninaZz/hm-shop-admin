import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { ProductType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        const { cartItems, customerInfo, orderDetails, totalAmount } = await req.json();
        if (!cartItems || !customerInfo || !orderDetails || !totalAmount) {
            return new NextResponse("Not enough data to create order", { status: 400 });
        }
        const orderItems = cartItems.map((cartItem: { item: ProductType, color: string, size: string, quantity: number }) => {
            return {
                product: cartItem.item._id,
                color: cartItem.color,
                size: cartItem.size,
                quantity: cartItem.quantity,
            }
        });

        await connectToDB();
        const newOrder = new Order({
            customerClerkId: customerInfo.clerkId,
            products: orderItems,
            shippingAddress: orderDetails.shippingAddress,
            totalAmount,
            comment: orderDetails.comment,
        });
        await newOrder.save();

        let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

        if (customer) {
            if (customer.name != customerInfo.name) customer.name = customerInfo.name;
            if (customer.phone != customerInfo.phone) customer.phone = customerInfo.phone;
            customer.orders.push(newOrder._id);
        } else {
            customer = new Customer({
                ...customerInfo,
                orders: [newOrder._id],
            });
        }
        await customer.save();
        return NextResponse.json(newOrder, { status: 200, headers: corsHeaders });
    } catch (err) {
        console.log("[order_POST]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}