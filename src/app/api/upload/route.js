import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    // Validate type
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ success: false, message: "File type not allowed. Use JPG, PNG, WebP, GIF or SVG." }, { status: 400 });
    }

    // Max 10 MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "File too large (max 10 MB)" }, { status: 400 });
    }

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitise filename
    const ext      = file.name.split(".").pop().toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Save to public/uploads/
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(join(uploadsDir, safeName), buffer);

    const url = `/uploads/${safeName}`;
    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
