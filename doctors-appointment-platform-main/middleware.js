import { withClerkMiddleware, getAuth } from "@clerk/nextjs/dist/edge";
import { NextResponse } from "next/server";

const isProtectedRoute = (pathname: string) => {
  const protectedPaths = [
    "/doctors",
    "/onboarding",
    "/doctor",
    "/admin",
    "/video-call",
    "/appointments",
  ];
  return protectedPaths.some((path) => pathname.startsWith(path));
};

export default withClerkMiddleware((req) => {
  const { userId } = getAuth(req); // Edge-safe auth

  const url = req.nextUrl.clone();

  if (!userId && isProtectedRoute(url.pathname)) {
    url.pathname = "/sign-in"; // redirect to Clerk sign-in page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
