import connectToDb from "@/database";
import Platforms from "@/models/Platforms";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDb();
        const extractData = await req.json();
        const saveData = await Platforms.create(extractData);
        if (saveData) {
            return NextResponse.json({
                success: true,
                message: "Platform saved successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Please try again",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Please try again",
        });
    }
}
