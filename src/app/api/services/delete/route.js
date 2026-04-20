import connectToDb from "@/database";
import Services from "@/models/Services";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function DELETE(req) {
    try {
        console.log('Delete request recieved')
        await connectToDb()

        const { id } = await req.json();
        if(!ObjectId.isValid(id)){
            return NextResponse.json({
                success: false,
                message: "Invalid Id Provided"
            })
        }
        const result = await Services.deleteOne({ _id: new ObjectId(id)});
        if( result.deletedCount === 1) {
            return NextResponse.json({
                success:true,
                message: " Deleted Successfully"
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Not found or already deleted"
            })
        }
    } catch (error) {
        
    }
}