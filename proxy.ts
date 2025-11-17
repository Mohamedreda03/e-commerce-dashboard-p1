import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    try {
      // Get session from the request
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      // If no session, redirect to sign-in
      if (!session) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
      }

      // Check if user has admin or manager role
      const userRole = session.user.role;

      if (userRole !== "admin" && userRole !== "manager") {
        // Redirect non-admin users to unauthorized page
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
