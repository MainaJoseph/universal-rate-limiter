// src/next/edge.ts
import { createRateLimiter } from "../core/limiter";
import type { StorageAdapter } from "../core/limiter";

// Minimal Next.js type definitions to avoid external dependencies
interface NextRequest extends Request {
  ip?: string;
  geo?: {
    city?: string;
    country?: string;
    region?: string;
  };
  nextUrl?: {
    pathname: string;
    searchParams: URLSearchParams;
  };
}

export interface EdgeRateLimitOptions {
  key: string | ((req: NextRequest) => string);
  max: number;
  window: string | number;
  storage?: StorageAdapter;
}

export function rateLimitEdge(options: EdgeRateLimitOptions) {
  const { key, max, window, storage } = options;

  return async (req: NextRequest) => {
    // Evaluate the key based on the request
    const evaluatedKey = typeof key === "function" ? key(req) : key;

    const limiter = createRateLimiter({
      key: evaluatedKey,
      max,
      window,
      storage,
    });

    const result = await limiter.check();

    if (!result.allowed) {
      return new Response(
        JSON.stringify({
          error: "Too Many Requests",
          retryAfter: result.retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil(result.retryAfter / 1000)),
          },
        }
      );
    }

    // Continue to the next middleware/handler by returning undefined
    // In Next.js middleware, returning undefined means "continue"
    return undefined as any;
  };
}
