import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const params = new URLSearchParams(body);
        const data = params.get("data");
        const signature = params.get("signature");
        if (!data || !signature) {
            return NextResponse.json({ error: "Missing LiqPay data" }, { status: 400, headers: corsHeaders });
        }
        // Перевірка підпису
        const privateKey = process.env.LIQPAY_PRIVATE_KEY!;
        const expectedSignature = crypto.createHash("sha1").update(privateKey + data + privateKey).digest("base64");
        if (signature !== expectedSignature) {
            console.error("Invalid signature from LiqPay");
            return NextResponse.json({ error: "Invalid signature" }, { status: 403, headers: corsHeaders });
        }
        // Декодуємо дані LiqPay
        const decoded = Buffer.from(data, "base64").toString("utf-8");
        const paymentInfo = JSON.parse(decoded);
        console.log("LiqPay callback received:", paymentInfo);
        // Оновлення статусу замовлення у БД
        await connectToDB();
        const order = await Order.findById(paymentInfo.order_id);
        if (!order) {
            console.error("Order not found:", paymentInfo.order_id);
            return NextResponse.json({ error: "Order not found" }, { status: 404, headers: corsHeaders });
        }
        if (order.paymentStatus !== paymentInfo.status) {
            order.paymentStatus = paymentInfo.status;
            await order.save();
        }
        if (["success", "sandbox"].includes(paymentInfo.status)) {
            console.log(`✅ Order ${paymentInfo.order_id} paid successfully!`);
            // в перспективі тут формування накладної
        } else {
            console.log(`ℹ️ Order ${paymentInfo.order_id} has status: ${paymentInfo.status}`);
        }
        return NextResponse.json({ received: true }, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error("[LiqPay_callback_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
    }
}