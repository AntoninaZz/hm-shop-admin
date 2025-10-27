import { NextResponse } from "next/server";
import crypto from "crypto";

const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}


export async function POST(req: Request) {
    try {
        const { orderId, amount, description } = await req.json();
        const data = {
            public_key: process.env.LIQPAY_PUBLIC_KEY,
            version: 3,
            action: "pay",
            amount,
            currency: "UAH",
            description,
            order_id: orderId,
            result_url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/successful_payment`,
            server_url: `${process.env.ADMIN_BASE_URL}/api/liqpay/callback`,
        };
        const jsonString = JSON.stringify(data);
        const dataBase64 = Buffer.from(jsonString).toString("base64");
        const signString = process.env.LIQPAY_PRIVATE_KEY + dataBase64 + process.env.LIQPAY_PRIVATE_KEY;
        const signature = crypto.createHash("sha1").update(signString).digest("base64");
        return NextResponse.json({ data: dataBase64, signature }, { status: 200, headers: corsHeaders, });
    } catch (error) {
        console.error("LiqPay route error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}