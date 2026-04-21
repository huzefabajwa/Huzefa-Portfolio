import connectToDb from "@/database";
import Platforms from "@/models/Platforms";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectToDb();
        const { id } = await req.json();
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                message: "Invalid ID provided",
            });
        }
        const result = await Platforms.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return NextResponse.json({
                success: true,
                message: "Deleted successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Not found or already deleted",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Please try again",
        });
    }
}
