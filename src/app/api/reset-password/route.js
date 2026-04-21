import connectToDb from "@/database";
import User from "@/models/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SECURITY_QUESTION = "What is your House#?";
const SECURITY_ANSWER   = "house#62"; // stored lowercase for case-insensitive compare

export async function POST(req) {
    try {
        const { step, answer, newUsername, newPassword } = await req.json();

        // STEP 1 — verify security answer
        if (step === "verify") {
            if (!answer) {
                return NextResponse.json({ success: false, message: "Please enter an answer." });
            }
            const isCorrect = answer.trim().toLowerCase() === SECURITY_ANSWER;
            if (!isCorrect) {
                return NextResponse.json({ success: false, message: "Incorrect answer. Please try again." });
            }
            return NextResponse.json({ success: true, message: "Identity verified. Set your new credentials." });
        }

        // STEP 2 — update credentials
        if (step === "reset") {
            if (!newUsername || !newPassword) {
                return NextResponse.json({ success: false, message: "Username and password are required." });
            }
            if (newPassword.length < 6) {
                return NextResponse.json({ success: false, message: "Password must be at least 6 characters." });
            }

            await connectToDb();
            const hashedPassword = await hash(newPassword, 10);

            // Update the first (only) admin user
            const result = await User.findOneAndUpdate(
                {},
                { username: newUsername.trim(), password: hashedPassword },
                { new: true }
            );

            if (!result) {
                return NextResponse.json({ success: false, message: "No admin user found to update." });
            }

            return NextResponse.json({ success: true, message: "Credentials updated successfully. Please log in with your new details." });
        }

        return NextResponse.json({ success: false, message: "Invalid step." });

    } catch (e) {
        console.error("Reset password error:", e);
        return NextResponse.json({ success: false, message: "Server error. Please try again." });
    }
}

// GET — return the security question text
export async function GET() {
    return NextResponse.json({ success: true, question: SECURITY_QUESTION });
}
