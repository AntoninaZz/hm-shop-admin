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
        const { data, signature } = await req.json();
        if (!data || !signature) {
            return NextResponse.json({ error: "Missing LiqPay data" }, { status: 400 });
        }
        // Перевірка підпису
        const privateKey = process.env.LIQPAY_PRIVATE_KEY!;
        const expectedSignature = crypto.createHash("sha1").update(privateKey + data + privateKey).digest("base64");
        if (signature !== expectedSignature) {
            console.error("Invalid signature from LiqPay");
            return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
        }
        // Декодуємо дані LiqPay
        const decoded = Buffer.from(data, "base64").toString("utf-8");
        const paymentInfo = JSON.parse(decoded);
        console.log("LiqPay callback received:", paymentInfo);
        // Оновлення статусу замовлення у БД
        await connectToDB();
        const order = await Order.findById(paymentInfo.order_id);
        if (order.paymentStatus === 'success') {
            return NextResponse.json({ received: true }, { status: 200, headers: corsHeaders });
        }
        await Order.findByIdAndUpdate(paymentInfo.order_id, { paymentStatus: paymentInfo.status });
        // Якщо статус успішний — можна виконати логіку відправлення замовлення
        if (paymentInfo.status === "success" || paymentInfo.status === "sandbox") {
            console.log(`Order ${paymentInfo.order_id} paid successfully!`);
            // В перспективі - автоматичне формування накладної тощо
        } else {
            console.log(`Order ${paymentInfo.order_id} has status: ${paymentInfo.status}`);
        }
        return NextResponse.json({ received: true }, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error("[LiqPay_callback_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}