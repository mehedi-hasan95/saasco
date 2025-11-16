import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/site(.*)", "/api/uploadthing(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect private routes
  if (!isPublicRoute(req)) await auth.protect();

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
