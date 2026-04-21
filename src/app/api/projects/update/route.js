import connectToDB from "@/database";
import Projects from "@/models/Projects";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDB();
        const extractData = await req.json();
        const { _id, ...updateData } = extractData;

        const updateItem = await Projects.findOneAndUpdate(
            { _id: _id },
            updateData,
            { new: true }
        );

        if (updateItem) {
            return NextResponse.json({
                success: true,
                message: "Data updated successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong !Please try again",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something goes wrong !Please try again",
        });
    }
}
