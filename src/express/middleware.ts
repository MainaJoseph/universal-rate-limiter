// src/express/middleware.ts
import { createRateLimiter } from "../core/limiter";
import type { StorageAdapter } from "../core/limiter";

// Minimal Express type definitions to avoid external dependencies
interface Request {
  ip?: string;
  [key: string]: any;
}

interface Response {
  status(code: number): Response;
  json(data: any): void;
  [key: string]: any;
}

type NextFunction = () => void;

export interface ExpressRateLimitOptions {
  key?: string | ((req: Request) => string);
  max: number;
  window: string | number;
  storage?: StorageAdapter;
}

export function rateLimitExpress(options: ExpressRateLimitOptions) {
  const { key, max, window, storage } = options;

  // Store current request in a way the key function can access it
  let currentRequest: Request;

  // Create key function that uses current request
  const keyFn = typeof key === "function"
    ? () => key(currentRequest)
    : key
    ? () => key
    : () => currentRequest.ip || "unknown";

  // Create limiter ONCE with the key function
  const limiter = createRateLimiter({
    key: keyFn,
    max,
    window,
    storage,
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    // Set current request so key function can access it
    currentRequest = req;

    const result = await limiter.check();

    if (!result.allowed) {
      res.status(429).json({
        error: "Too many requests",
        retryAfter: result.retryAfter,
      });
      return;
    }

    next();
  };
}
