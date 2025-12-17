import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  getCorsHeaders,
  isOriginAllowed,
  isProtectedApiPath,
} from "@/lib/cors";
import { isDevelopmentEnvironment } from "./lib/constants";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  // CORS handling for API routes
  if (isProtectedApiPath(pathname)) {
    // Handle preflight OPTIONS requests
    if (request.method === "OPTIONS") {
      if (origin && isOriginAllowed(origin)) {
        return new NextResponse(null, {
          status: 204,
          headers: getCorsHeaders(origin),
        });
      }
      return new NextResponse(null, { status: 403 });
    }

    // Block cross-origin requests from disallowed origins
    if (origin && !isOriginAllowed(origin)) {
      return new NextResponse(
        JSON.stringify({
          code: "forbidden:cors",
          message: "Cross-origin request from disallowed origin",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // Skip auth check for auth routes
  if (pathname.startsWith("/api/auth")) {
    return addCorsHeaders(NextResponse.next(), origin);
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    const redirectUrl = encodeURIComponent(request.url);

    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isGuest = token?.type === "guest";

  if (token && !isGuest && ["/sign-in", "/sign-up"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return addCorsHeaders(NextResponse.next(), origin);
}

/**
 * Add CORS headers to response if origin is allowed
 */
function addCorsHeaders(
  response: NextResponse,
  origin: string | null
): NextResponse {
  if (origin && isOriginAllowed(origin)) {
    const corsHeaders = getCorsHeaders(origin);
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value);
    }
  }
  return response;
}

export const config = {
  matcher: [
    "/",
    "/chat/:id",
    "/api/:path*",
    "/sign-in",
    "/sign-up",

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
