// src/core/limiter.ts
import { parseWindow } from "./time";
import { MemoryStorage } from "./storage/memory";

export interface RateLimitOptions {
  key: string | (() => string);
  max: number;
  window: string | number;
  storage?: any;
}

export function createRateLimiter(options: RateLimitOptions) {
  const { key, max } = options;
  const windowMs = parseWindow(options.window);
  const storage = options.storage || new MemoryStorage();

  return {
    async check() {
      const id = typeof key === "function" ? key() : key;
      const now = Date.now();

      let timestamps = await storage.get(id);

      // Filter out timestamps outside the window
      timestamps = timestamps.filter((t: number) => now - t < windowMs);

      if (timestamps.length >= max) {
        return {
          allowed: false,
          remaining: 0,
          retryAfter: windowMs - (now - timestamps[0]),
        };
      }

      // Add new timestamp
      timestamps.push(now);
      await storage.set(id, timestamps);

      return {
        allowed: true,
        remaining: max - timestamps.length,
        retryAfter: 0,
      };
    },
  };
}
