import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Banner from "@/lib/models/Banner";
import { connectToDB } from "@/lib/mongoDB";

function getBannerIdFromReq(req: NextRequest) {
    const segments = req.nextUrl.pathname.split('/');
    return segments[segments.length - 1]; // останній сегмент — bannerId
}

export const GET = async (req: NextRequest) => {
    try {
        const bannerId = getBannerIdFromReq(req);
        if (!bannerId || bannerId === "undefined") {
            return NextResponse.json({ message: "Invalid banner ID" }, { status: 400 });
        }
        await connectToDB();
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            return NextResponse.json({ message: "Banner not found" }, { status: 404 });
        }
        return NextResponse.json(banner, { status: 200 });
    } catch (error) {
        console.log("[bannerId_GET]", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const bannerId = getBannerIdFromReq(req);
        if (!bannerId || bannerId === "undefined") {
            return NextResponse.json({ message: "Invalid banner ID" }, { status: 400 });
        }
        await connectToDB();
        let banner = await Banner.findById(bannerId);
        if (!banner) {
            return NextResponse.json({ message: "Banner not found" }, { status: 404 });
        }
        const { title, description, image, url } = await req.json();
        if (!title || !image || !url) {
            return NextResponse.json({ message: "Banner name, image and url are required" }, { status: 400 });
        }
        banner = await Banner.findByIdAndUpdate(bannerId, { title, description, image, url }, { new: true });
        await banner.save();
        return NextResponse.json(banner, { status: 200 });
    } catch (error) {
        console.log("[bannerId_POST]", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const bannerId = getBannerIdFromReq(req);
        if (!bannerId || bannerId === "undefined") {
            return NextResponse.json({ message: "Invalid banner ID" }, { status: 400 });
        }
        await connectToDB();
        await Banner.findByIdAndDelete(bannerId);
        return NextResponse.json({ message: "Banner deleted" }, { status: 200 });
    } catch (error) {
        console.log("[bannerId_DELETE]", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";