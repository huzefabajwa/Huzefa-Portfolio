import connectToDb from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDb();
        const body = await req.json();
        const { _id, heading, summary, roleTitle, hireme, upwork, slack, github, linkedin, stack, imageUrl } = body;

        const updatePayload = { heading, summary, roleTitle, hireme, upwork, slack, github, linkedin, stack, imageUrl };

        // Remove undefined keys so we don't accidentally null out fields not sent
        Object.keys(updatePayload).forEach(k => updatePayload[k] === undefined && delete updatePayload[k]);

        let result;
        if (_id) {
            result = await Home.findByIdAndUpdate(_id, { $set: updatePayload }, { new: true });
        } else {
            // Upsert singleton — create if doesn't exist
            result = await Home.findOneAndUpdate({}, { $set: updatePayload }, { new: true, upsert: true });
        }

        if (result) {
            return NextResponse.json({ success: true, message: "Saved successfully" });
        }
        return NextResponse.json({ success: false, message: "Update failed" }, { status: 400 });
    } catch (e) {
        console.error("[home/update]", e);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}