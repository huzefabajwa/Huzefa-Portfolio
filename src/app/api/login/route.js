import connectToDb from "@/database";
import { compare, hash } from "bcryptjs";
import User from "@/models/User";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function POST(req) {
    try{
        await connectToDb();
        const { username,password } = await req.json();
        const checkUser = await User.findOne({username})
        if (!checkUser) {
            return NextResponse.json({
                success : false,
                message: "Username Not found, Please try again",
            });
        }
        const hashPassword = await hash(checkUser.password, 12);
        const checkPassword = await compare(password,hashPassword);
        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: "Wrong Password, Please Try Again"
            });
        }
        return NextResponse.json({
            success:true,
            message:"Login Successfull"
        });
    }
    catch (e){
        console.log(e);
    }
}