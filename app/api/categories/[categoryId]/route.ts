import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/lib/models/Category";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

function getCategoryIdFromReq(req: NextRequest) {
    const segments = req.nextUrl.pathname.split('/');
    return segments[segments.length - 1]; // останній сегмент — categoryId
}

export const GET = async (req: NextRequest) => {
    try {
        const categoryId = getCategoryIdFromReq(req);
        if (!categoryId || categoryId === "undefined") {
            return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
        }
        await connectToDB();
        const category = await Category.findById(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[categoryId_GET]", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const categoryId = getCategoryIdFromReq(req);
        if (!categoryId || categoryId === "undefined") {
            return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
        }
        await connectToDB();
        let category = await Category.findById(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        const { name, description, image } = await req.json();
        if (!name || !image) {
            return NextResponse.json({ message: "Category name and image are required" }, { status: 400 });
        }
        category = await Category.findByIdAndUpdate(categoryId, { name, description, image }, { new: true });
        await category.save();
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[collectionId_POST]", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const categoryId = getCategoryIdFromReq(req);
        if (!categoryId || categoryId === "undefined") {
            return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
        }
        await connectToDB();
        await Category.findByIdAndDelete(categoryId);
        await Product.updateMany(
            { category: categoryId },
            { $pull: { category: categoryId } }
        );
        return NextResponse.json({ message: "Category deleted" }, { status: 200 });
    } catch (error) {
        console.log("[collectionId_DELETE]", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";