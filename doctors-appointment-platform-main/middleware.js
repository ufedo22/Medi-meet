// middleware.js
import { withClerkMiddleware, getAuth } from "@clerk/nextjs/edge";
import { NextResponse } from "next/server";

// List of protected routes
const protectedRoutes = [
  "/doctors",
  "/onboarding",
  "/doctor",
  "/admin",
  "/video-call",
  "/appointments",
];

// Helper to check if route is protected
const isProtectedRoute = (pathname) => {
  return protectedRoutes.some((path) => pathname.startsWith(path));
};

// Edge-safe Clerk middleware
export default withClerkMiddleware((req) => {
  const { userId } = getAuth(req); // Edge-compatible auth

  const url = req.nextUrl.clone();

  if (!userId && isProtectedRoute(url.pathname)) {
    url.pathname = "/sign-in"; // redirect unauthenticated users
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// Apply middleware to all routes except static files and _next internals
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
