import connectToDb from "@/database";
import Platforms from "@/models/Platforms";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDb();
        const extractData = await Platforms.find({}).sort({ order: 1 });

        if (extractData) {
            return NextResponse.json({
                success: true,
                data: extractData,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No platforms found",
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
