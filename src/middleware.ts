import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard", "/services/[id]/book"];
const publicRoutes = ["/login", "/signup", "/", "/contact", "/services"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Convert protected routes into regex patterns to match dynamic segments
  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[id\]/g, "[^/]+")}$`);
    return regex.test(path);
  });

  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

//Simple method for checking if a user has a session for rendering components

export async function hasSession(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace("[serviceId]", "[^/]+")}$`);
    return regex.test(path);
  });

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return false;
  } else {
    return true;
  }
}
