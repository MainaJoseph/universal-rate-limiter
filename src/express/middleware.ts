// src/express/middleware.ts
import { createRateLimiter, RateLimitOptions } from "../core/limiter";

export function rateLimitExpress(options: RateLimitOptions) {
  const limiter = createRateLimiter({
    ...options,
    key: (req: any) => req.ip || "unknown",
  });

  return async (req: any, res: any, next: any) => {
    const result = await limiter.check();

    if (!result.allowed) {
      res.status(429).json({
        success: false,
        message: "Too many requests",
        retryAfter: result.retryAfter,
      });
      return;
    }

    next();
  };
}
