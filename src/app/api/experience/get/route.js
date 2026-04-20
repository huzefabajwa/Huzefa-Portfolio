import connectToDb from "@/database";
import Experience from "@/models/Experience";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(req) {
    try{
        await connectToDb();
        const extractData = await Experience.find({});

        if (extractData) {
            return NextResponse.json({
                success : true,
                data: extractData,
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