import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDB();
        const items = await req.json();

        // bulk update
        const bulkOps = items.map((item) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { order: item.order } }
            }
        }));

        await Education.bulkWrite(bulkOps);

        return NextResponse.json({
            success: true,
            message: "Reordered successfully"
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        });
    }
}
