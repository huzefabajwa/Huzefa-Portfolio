import connectToDb from "@/database"; 
import Projects from "@/models/Projects";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, context) {  
    try {
        await connectToDb();

        // ✅ Extract `params` correctly
        const params = await context.params;  // Awaiting params as required by Next.js

        if (!params || !params.id) {
            return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 });
        }

        const project = await Projects.findById(params.id);

        if (!project) {
            return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project }, { status: 200 });
    } catch (e) {
        console.error("Error fetching project:", e);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    try {
        await connectToDb();

        if (!params || !params.id) {
            return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 });
        }

        const deletedProject = await Projects.findByIdAndDelete(params.id);

        if (!deletedProject) {
            return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
    } catch (e) {
        console.error("Error deleting project:", e);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}