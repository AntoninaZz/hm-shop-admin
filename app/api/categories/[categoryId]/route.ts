import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/lib/models/Category";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

export const GET = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
    try {
        await connectToDB();
        const category = await Category.findById(params.categoryId);
        if (!category) {
            return new NextResponse(JSON.stringify({ message: "Category not found" }), { status: 404 });
        }
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[categoryId_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const POST = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectToDB();
        let category = await Category.findById(params.categoryId);
        if (!category) {
            return new NextResponse("Category not found", { status: 404 });
        }
        const { name, description, image } = await req.json();
        if (!name || !image) {
            return new NextResponse("Category name and image are required", { status: 400 });
        }
        category = await Category.findByIdAndUpdate(params.categoryId, { name, description, image }, { new: true });
        await category.save();
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[collectionId_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectToDB();
        await Category.findByIdAndDelete(params.categoryId);
        await Product.updateMany(
            { category: params.categoryId },
            { $pull: { category: params.categoryId } }
        );
        return new NextResponse("Category is deleted", { status: 200 });
    } catch (error) {
        console.log("[collectionId_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}