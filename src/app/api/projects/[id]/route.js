import connectToDb from "@/database";
import Projects from "@/models/Projects";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
    try {
        await connectToDb();
        const { id } = await params;
        const project = await Projects.findById(id);
        if (!project) {
            return NextResponse.json({ success: false, message: "Project not found" });
        }
        return NextResponse.json({ success: true, data: project });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, message: "Server error" });
    }
}
