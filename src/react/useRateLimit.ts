// src/react/useRateLimit.ts
import { useState } from "react";
import { createRateLimiter } from "../core/limiter";

export function useRateLimit(key: string, options: any) {
  const limiter = createRateLimiter({ key, ...options });
  const [state, setState] = useState({
    allowed: true,
    remaining: options.max,
    retryAfter: 0,
  });

  async function attempt() {
    const result = await limiter.check();
    setState(result);
    return result.allowed;
  }

  return {
    ...state,
    attempt,
  };
}
