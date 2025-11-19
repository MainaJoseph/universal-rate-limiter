// src/index.ts
// Core rate limiter
export { createRateLimiter } from "./core/limiter";
export type {
  StorageAdapter,
  RateLimitResult,
  RateLimitOptions,
} from "./core/limiter";

// Express middleware
export { rateLimitExpress } from "./express/middleware";
export type { ExpressRateLimitOptions } from "./express/middleware";

// Next.js Edge middleware
export { rateLimitEdge } from "./next/edge";
export type { EdgeRateLimitOptions } from "./next/edge";

// React hook
export { useRateLimit } from "./react/useRateLimit";
export type { UseRateLimitOptions } from "./react/useRateLimit";

// Time utilities
export { parseWindow } from "./core/time";

// Storage adapters
export { MemoryStorage } from "./core/storage/memory";
export { LocalStorageAdapter } from "./core/storage/local";
