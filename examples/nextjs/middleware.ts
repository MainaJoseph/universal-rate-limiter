// Next.js Edge Middleware Example
import { rateLimitEdge } from "../../dist/index.mjs";

// Example 1: Static key for all API routes
export const middleware = rateLimitEdge({
  key: "edge-limit",
  max: 5,
  window: "10s",
});

export const config = {
  matcher: ["/api/:path*"],
};

// Example 2: Dynamic key based on IP (uncomment to use)
/*
export const middleware = rateLimitEdge({
  key: (req) => req.ip || "unknown",
  max: 10,
  window: "1m",
});
*/

// Example 3: Dynamic key based on path (uncomment to use)
/*
export const middleware = rateLimitEdge({
  key: (req) => {
    const path = req.nextUrl?.pathname || "/";
    return `route:${path}`;
  },
  max: 20,
  window: "1m",
});
*/
