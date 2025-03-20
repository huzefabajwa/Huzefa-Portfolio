import connectToDb from "@/database";
import About from "@/models/About"

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(req) {
    try{
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        await connectToDb();
        const extractData = await About.find({});

        if (extractData) {
            return NextResponse.json({
                success : true,
                data: extractData,
            },
            { headers });
        }
        else{
            return NextResponse.json({
                success: false,
                message:"Please try again"
            },
            { headers });
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