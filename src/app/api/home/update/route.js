import connectToDb from "@/database";
import Home from "@/models/Home";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"
export async function PUT(req) {
    try {
        await connectToDb();
        const extractData = await req.json();
        const{_id,heading,summary,hireme,upwork,slack,github,linkedin,stack} = extractData;
        const updateData = await Home.findByIdAndUpdate(
            {
                _id: _id
            },
            {heading,summary,hireme,upwork,slack,github,linkedin,stack },
            {new: true}
        );
        if (updateData) {
            return NextResponse.json({
                success : true,
                message: "Updated Succesfully",
            });
        }
        else{
            return NextResponse.json({
                success: false,
                message:"Please try again"
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message:"Please try again"
        });
    }
}