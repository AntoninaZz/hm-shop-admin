import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/lib/models/Category";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectToDB();

        const { name, description, image } = await req.json();
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return NextResponse.json({ message: "Category already exists" }, { status: 400 });
        }
        if (!name || !image) {
            return NextResponse.json({ message: "Name and image are required" }, { status: 400 });
        }
        const newCategory = await Category.create({
            name,
            description,
            image,
        });
        await newCategory.save();
        return NextResponse.json(newCategory, { status: 200 });
    } catch (error) {
        console.log("[category_POST]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const GET = async () => {
    try {
        await connectToDB();
        const categories = await Category.find().sort({ createdAt: "desc" });
        return NextResponse.json(categories, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.log("[Category_GET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500, headers: corsHeaders });
    }
}

export const dynamic = "force-dynamic";