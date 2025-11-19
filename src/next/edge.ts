// src/next/edge.ts
import { createRateLimiter } from "../core/limiter";

export function rateLimitEdge(options: any) {
  const limiter = createRateLimiter({
    ...options,
    key: (req: any) => req.ip || "edge",
  });

  return async (req: Request) => {
    const result = await limiter.check();

    if (!result.allowed) {
      return new Response("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfter),
        },
      });
    }

    return Response.next();
  };
}
