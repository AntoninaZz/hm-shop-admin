import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Banner from "@/lib/models/Banner";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        await connectToDB();

        const { title, description, image, url } = await req.json();
        const existingBanner = await Banner.findOne({ title });
        if (existingBanner) {
            return new NextResponse("Banner already exists", { status: 400 });
        }
        if (!title || !image || !url) {
            return new NextResponse("Name, image and url are required", { status: 400 });
        }
        const newBanner = await Banner.create({
            title,
            description,
            image,
            url,
        });
        await newBanner.save();
        return NextResponse.json(newBanner, { status: 200 });
    } catch (error) {
        console.log("[banner_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const GET = async () => {
    try {
        await connectToDB();
        const banners = await Banner.find().sort({createdAt: "desc"});
        return NextResponse.json(banners, {status: 200});
    } catch (error) {
        console.log("[Banner_GET]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

export const dynamic = "force-dynamic";