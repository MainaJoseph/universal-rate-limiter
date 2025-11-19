// Next.js 16+ Proxy (new routing system)
// Place this file at the root of your Next.js project as: proxy.ts

import { rateLimitEdge } from "universal-rate-limiter";

// Example 1: Static key for all API routes
export const proxy = rateLimitEdge({
  key: "edge-limit",
  max: 5,
  window: "10s",
});

export const config = {
  matcher: ["/api/:path*"],
};

// Example 2: Dynamic key based on IP (uncomment to use)
/*
export const proxy = rateLimitEdge({
  key: (req) => req.ip || "unknown",
  max: 10,
  window: "1m",
});
*/

// Example 3: Dynamic key based on path (uncomment to use)
/*
export const proxy = rateLimitEdge({
  key: (req) => {
    const path = req.nextUrl?.pathname || "/";
    return `route:${path}`;
  },
  max: 20,
  window: "1m",
});
*/

// Example 4: Different limits for different routes (uncomment to use)
/*
export const proxy = rateLimitEdge({
  key: (req) => {
    const path = req.nextUrl?.pathname || "/";
    const ip = req.ip || "unknown";

    // Different limits for different endpoints
    if (path.startsWith("/api/auth")) {
      return `auth:${ip}`;
    } else if (path.startsWith("/api/data")) {
      return `data:${ip}`;
    }

    return `general:${ip}`;
  },
  max: 10,
  window: "1m",
});
*/
