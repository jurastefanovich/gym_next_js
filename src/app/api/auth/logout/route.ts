import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // ✅ Use Next.js built-in cookies utility

export async function POST() {
    // Remove authToken cookie
    (await cookies()).set("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Remove immediately
        path: "/",
    });

    return NextResponse.json({ success: true });
}
