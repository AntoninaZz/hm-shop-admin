import { NextRequest, NextResponse } from "next/server";
import { sha3_256 } from 'js-sha3';

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
        const { cartItems, customer } = await req.json();
        if (!cartItems || !customer) {
            return new NextResponse("Not enough data to checkout", { status: 400 });
        }
        const subtotal = cartItems.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity * (100 - cartItem.item.discount) / 100, 0);
        const subtotalRounded = parseFloat(subtotal.toFixed(2));
        const json_string = JSON.stringify({ public_key: process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY, version: 7, private_key: process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY, action: "pay", amount: subtotalRounded, currency: "UAH", description: "test", order_id: "000001", paytypes: "card", result_url: process.env.ECOMMERCE_STORE_URL });
        const data = btoa(json_string);
        const sign_string = "" + process.env.private_key + data + process.env.private_key;
        const signature = btoa(sha3_256(sign_string));
        return NextResponse.json({ data, signature }, { headers: corsHeaders });
    } catch (err) {
        console.log("[checkout_POST]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}