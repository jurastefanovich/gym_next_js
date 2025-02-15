import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // ✅ Use Next.js built-in cookies utility

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Dummy authentication (Replace with actual logic)
        if (email !== "test@example.com" || password !== "password123") {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Generate a fake token (Replace with JWT or session ID)
        const token = "fake-jwt-token";

        // Set the token as an HTTP-only cookie
        (await cookies()).set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
