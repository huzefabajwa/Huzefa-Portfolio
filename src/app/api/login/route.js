import connectToDb from "@/database";
import { compare } from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDb();
        const { username, password } = await req.json();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Username not found. Please try again.",
            });
        }

        // Correctly compare plaintext password against stored bcrypt hash
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Incorrect password. Please try again.",
            });
        }

        return NextResponse.json({
            success: true,
            message: "Login successful",
        });
    } catch (e) {
        console.error("Login error:", e);
        return NextResponse.json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
}