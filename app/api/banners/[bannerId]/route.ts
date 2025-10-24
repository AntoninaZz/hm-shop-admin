import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Banner from "@/lib/models/Banner";
import { connectToDB } from "@/lib/mongoDB";

export async function GET(req: NextRequest, context: { params: { bannerId: string } }) {
    try {
        const { bannerId } = context.params;
        await connectToDB();

        const banner = await Banner.findById(bannerId);
        if (!banner) {
            return NextResponse.json({ message: "Banner not found" }, { status: 404 });
        }

        return NextResponse.json(banner, { status: 200 });
    } catch (error) {
        console.error("[bannerId_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest, context: { params: { bannerId: string } }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { bannerId } = context.params;
        await connectToDB();

        let banner = await Banner.findById(bannerId);
        if (!banner) {
            return new NextResponse("Banner not found", { status: 404 });
        }

        const { title, description, image, url } = await req.json();
        if (!title || !image || !url) {
            return new NextResponse("Banner name, image and url are required", { status: 400 });
        }

        banner = await Banner.findByIdAndUpdate(bannerId, { title, description, image, url }, { new: true });
        await banner.save();

        return NextResponse.json(banner, { status: 200 });
    } catch (error) {
        console.error("[bannerId_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: { bannerId: string } }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { bannerId } = context.params;
        await connectToDB();

        await Banner.findByIdAndDelete(bannerId);
        return new NextResponse("Banner is deleted", { status: 200 });
    } catch (error) {
        console.error("[bannerId_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";