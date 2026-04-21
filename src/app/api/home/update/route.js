import connectToDb from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDb();
        const body = await req.json();
        const { _id, heading, summary, hireme, upwork, slack, github, linkedin, stack, imageUrl } = body;

        const update = { heading, summary, hireme, upwork, slack, github, linkedin, stack, imageUrl };

        let result;
        if (_id) {
            result = await Home.findByIdAndUpdate(_id, update, { new: true });
        } else {
            // Upsert singleton
            result = await Home.findOneAndUpdate({}, update, { new: true, upsert: true });
        }

        if (result) {
            return NextResponse.json({ success: true, message: "Updated successfully" });
        }
        return NextResponse.json({ success: false, message: "Update failed" }, { status: 400 });
    } catch (e) {
        console.error("[home/update]", e);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}