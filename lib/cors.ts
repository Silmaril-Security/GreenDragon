/**
 * CORS configuration and utilities for API routes
 */

/**
 * Get the list of allowed origins based on environment configuration
 */
export function getAllowedOrigins(): string[] {
  const origins: string[] = [];

  // Add origins from environment variable
  const envOrigins = process.env.ALLOWED_ORIGINS;
  if (envOrigins) {
    const parsed = envOrigins
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    origins.push(...parsed);
  }

  // Add Vercel preview deployment URL if available
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    origins.push(`https://${vercelUrl}`);
  }

  // Add Vercel production URL if set
  const vercelProjectUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProjectUrl) {
    origins.push(`https://${vercelProjectUrl}`);
  }

  return [...new Set(origins)]; // Deduplicate
}

/**
 * Check if an origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) {
    return false;
  }

  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin);
}

/**
 * CORS headers to apply to responses
 */
export function getCorsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400", // 24 hours preflight cache
  };
}

/**
 * API route paths that require CORS protection
 */
export const PROTECTED_API_PATHS = [
  "/api/chat",
  "/api/document",
  "/api/challenges",
  "/api/vote",
  "/api/history",
  "/api/files",
  "/api/suggestions",
  "/api/auth",
];

/**
 * Check if a pathname matches protected API routes
 */
export function isProtectedApiPath(pathname: string): boolean {
  return PROTECTED_API_PATHS.some((path) => pathname.startsWith(path));
}
