// src/react/useRateLimit.ts
import { useState, useMemo, useCallback } from "react";
import { createRateLimiter } from "../core/limiter";
import type { StorageAdapter, RateLimitResult } from "../core/limiter";

export interface UseRateLimitOptions {
  max: number;
  window: string | number;
  storage?: StorageAdapter;
}

export function useRateLimit(key: string, options: UseRateLimitOptions) {
  const limiter = useMemo(
    () => createRateLimiter({ key, ...options }),
    [key, options.max, options.window, options.storage]
  );

  const [state, setState] = useState<RateLimitResult>({
    allowed: true,
    remaining: options.max,
    retryAfter: 0,
  });

  const attempt = useCallback(async () => {
    const result = await limiter.check();
    setState(result);
    return result.allowed;
  }, [limiter]);

  return {
    ...state,
    attempt,
  };
}
