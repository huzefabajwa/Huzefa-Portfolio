import connectToDb from "@/database";
import About from "@/models/About";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"
export async function PUT(req) {
    try {
        await connectToDb();
        const extractData = await req.json();
        const{_id,aboutme,noofprojects,yearsofexperience,noofclients,skills,progress} = extractData;
        const updateData = await About.findByIdAndUpdate(
            {
                _id: _id
            },
            {_id,aboutme,noofprojects,yearsofexperience,noofclients,skills,progress},
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