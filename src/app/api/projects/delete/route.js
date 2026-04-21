import connectToDb from "@/database";
import Projects from "@/models/Projects";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectToDb();
        const { id } = await req.json();
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID" });
        }
        const result = await Projects.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true, message: "Deleted successfully" });
        }
        return NextResponse.json({ success: false, message: "Project not found" });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, message: "Server error" });
    }
}
