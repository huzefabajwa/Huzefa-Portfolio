import connectToDb from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDb();
        const body = await req.json();
        const { _id, aboutme, noofprojects, yearsofexperience, noofclients, noofplatforms, skills } = body;

        let result;
        if (_id) {
            // Update existing document by ID
            result = await About.findByIdAndUpdate(
                _id,
                { aboutme, noofprojects, yearsofexperience, noofclients, noofplatforms, skills },
                { new: true }
            );
        } else {
            // Upsert: update the first document or create one if none exists
            result = await About.findOneAndUpdate(
                {},
                { aboutme, noofprojects, yearsofexperience, noofclients, noofplatforms, skills },
                { new: true, upsert: true }
            );
        }

        if (result) {
            return NextResponse.json({ success: true, message: "Updated successfully" });
        }
        return NextResponse.json({ success: false, message: "Update failed" }, { status: 400 });
    } catch (e) {
        console.error("[about/update]", e);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}