import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Category from "@/lib/models/Category";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        await connectToDB();

        const { name, description, image } = await req.json();
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return new NextResponse("Category already exists", { status: 400 });
        }
        if (!name || !image) {
            return new NextResponse("Name and image are required", { status: 400 });
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
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const GET = async () => {
    try {
        await connectToDB();
        const categories = await Category.find().sort({createdAt: "desc"});
        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        console.log("[Category_GET]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

export const dynamic = "force-dynamic";