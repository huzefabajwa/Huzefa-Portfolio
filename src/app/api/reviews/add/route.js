import connectToDb from "@/database";
import Reviews from "@/models/Reviews";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function POST(req) {
    try{
        await connectToDb();
        const extractData = await req.json();
        const savaData = await Reviews.create(extractData);
        if (savaData) {
            return NextResponse.json({
                success : true,
                message: "Data Saved Succesfully",
            });
        }
        else{
            return NextResponse.json({
                success: false,
                message:"Please try again"
            });
        }
    }
    catch (e){
        console.log(e);
        return NextResponse.json({
            success: false,
            message:"Please try again"
        });
    }
}