<div align="center">

# 🌐 Universal Rate Limiter

### A lightweight, zero-dependency rate limiter that works everywhere

[![npm version](https://img.shields.io/npm/v/universal-rate-limiter.svg)](https://www.npmjs.com/package/universal-rate-limiter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

**Frontend • Backend • Serverless • Edge**

**[📖 Documentation Website](https://universal-rate-limiter.azuritek.com)**

[Installation](#installation) • [Quick Start](#quick-start) • [API Reference](#api-reference) • [Examples](#examples)

</div>

---

## Overview

`universal-rate-limiter` is a modern, TypeScript-first rate limiting library designed to run in **any JavaScript environment**. Unlike traditional rate limiters that require Redis, databases, or specific runtimes, this library works seamlessly across all platforms with zero dependencies.

### Why Universal Rate Limiter?

- 🌍 **Truly Universal** — Works in Browser, Node.js, Bun, Express, Next.js, Edge, and Serverless
- 🪶 **Zero Dependencies** — No external packages required
- 🔌 **Pluggable Storage** — Built-in memory and localStorage adapters, easily extensible
- ⚡ **Edge Compatible** — Optimized for Next.js Edge Middleware and serverless environments
- 🎣 **React Hook** — First-class React support for client-side rate limiting
- 📦 **Tree-Shakeable** — Only import what you need
- 🔒 **TypeScript-First** — Fully typed for excellent DX

---

## Installation

```bash
npm install universal-rate-limiter
```

```bash
yarn add universal-rate-limiter
```

```bash
pnpm add universal-rate-limiter
```

```bash
bun add universal-rate-limiter
```

---

## Quick Start

### Express Middleware

Protect your API endpoints with automatic rate limiting:

```typescript
import express from "express";
import { rateLimitExpress } from "universal-rate-limiter";

const app = express();

// Apply rate limiting to all routes
app.use(
  rateLimitExpress({
    key: "api-limit",
    max: 10,              // 10 requests
    window: "1m",         // per minute
  })
);

app.get("/api/data", (req, res) => {
  res.json({ message: "Success" });
});

app.listen(3000);
```

### Next.js Edge Middleware

Protect your Next.js app at the edge:

**For Next.js 16+ (proxy.ts):**
```typescript
// proxy.ts
import { rateLimitEdge } from "universal-rate-limiter";

export const proxy = rateLimitEdge({
  key: "edge-limit",
  max: 5,
  window: "10s",
});

export const config = {
  matcher: ["/api/:path*"],
};
```

**For Next.js 12-15 (middleware.ts):**
```typescript
// middleware.ts
import { rateLimitEdge } from "universal-rate-limiter";

export const middleware = rateLimitEdge({
  key: "edge-limit",
  max: 5,
  window: "10s",
});

export const config = {
  matcher: ["/api/:path*"],
};
```

### React Hook

Rate limit user actions in your React components:

```tsx
import { useRateLimit } from "universal-rate-limiter";

export function SubmitButton() {
  const { allowed, remaining, attempt } = useRateLimit("submit-form", {
    max: 3,
    window: "1m",
  });

  const handleSubmit = async () => {
    const isAllowed = await attempt();

    if (isAllowed) {
      // Proceed with form submission
      console.log("Form submitted!");
    } else {
      // Show error message
      console.log("Too many submissions. Please wait.");
    }
  };

  return (
    <button onClick={handleSubmit} disabled={!allowed}>
      Submit ({remaining} remaining)
    </button>
  );
}
```

---

## Examples

### Custom Storage Adapter

Use localStorage for persistent client-side rate limiting:

```typescript
import { createRateLimiter, LocalStorageAdapter } from "universal-rate-limiter";

const limiter = createRateLimiter({
  key: "download-limit",
  max: 5,
  window: "1h",
  storage: new LocalStorageAdapter("my-app"),
});

const result = await limiter.check();

if (result.allowed) {
  console.log(`Download started. ${result.remaining} downloads remaining.`);
} else {
  console.log(`Rate limit exceeded. Retry in ${result.retryAfter}ms`);
}
```

### Dynamic Keys (Per-User Limiting)

Rate limit based on user ID or IP address:

```typescript
import express from "express";
import { createRateLimiter } from "universal-rate-limiter";

const app = express();

app.use(async (req, res, next) => {
  const limiter = createRateLimiter({
    key: () => req.ip || "unknown",  // Dynamic key based on IP
    max: 100,
    window: "15m",
  });

  const result = await limiter.check();

  if (!result.allowed) {
    return res.status(429).json({
      error: "Too many requests",
      retryAfter: result.retryAfter,
    });
  }

  next();
});
```

### Browser-Only Rate Limiting

Prevent spam clicks in vanilla JavaScript:

```typescript
import { createRateLimiter, LocalStorageAdapter } from "universal-rate-limiter";

const limiter = createRateLimiter({
  key: "button-click",
  max: 10,
  window: "30s",
  storage: new LocalStorageAdapter(),
});

document.querySelector("#submit-btn").addEventListener("click", async () => {
  const result = await limiter.check();

  if (result.allowed) {
    // Process the click
    console.log("Action performed");
  } else {
    alert(`Please wait ${Math.ceil(result.retryAfter / 1000)} seconds`);
  }
});
```

---

## API Reference

### `createRateLimiter(options)`

Creates a rate limiter instance.

#### Options

| Option    | Type                      | Required | Description                                                  |
|-----------|---------------------------|----------|--------------------------------------------------------------|
| `key`     | `string \| () => string`  | Yes      | Unique identifier for the rate limit. Can be a function for dynamic keys. |
| `max`     | `number`                  | Yes      | Maximum number of requests allowed within the time window.   |
| `window`  | `string \| number`        | Yes      | Time window (e.g., `"1m"`, `"10s"`, `3600000`).             |
| `storage` | `StorageAdapter`          | No       | Storage adapter. Defaults to `MemoryStorage`.                |

#### Returns

Returns an object with a `check()` method:

```typescript
{
  check(): Promise<RateLimitResult>
}
```

### `check()`

Checks if a request is allowed and updates the rate limit state.

#### Returns

```typescript
{
  allowed: boolean;      // Whether the request is allowed
  remaining: number;     // Number of requests remaining in the window
  retryAfter: number;    // Milliseconds until the limit resets (0 if allowed)
}
```

### Window Format

Supports human-readable time formats:

| Format  | Duration      |
|---------|---------------|
| `"10s"` | 10 seconds    |
| `"5m"`  | 5 minutes     |
| `"1h"`  | 1 hour        |
| `"1d"`  | 1 day         |
| `5000`  | 5000ms (raw)  |

### Built-in Storage Adapters

#### `MemoryStorage`

In-memory storage (default). Data is lost on server restart.

```typescript
import { createRateLimiter, MemoryStorage } from "universal-rate-limiter";

const limiter = createRateLimiter({
  key: "api-limit",
  max: 10,
  window: "1m",
  storage: new MemoryStorage(),  // Default, can be omitted
});
```

#### `LocalStorageAdapter`

Browser localStorage storage. Persists across page reloads.

```typescript
import { createRateLimiter, LocalStorageAdapter } from "universal-rate-limiter";

const limiter = createRateLimiter({
  key: "user-action",
  max: 5,
  window: "1h",
  storage: new LocalStorageAdapter("my-app-prefix"),  // Optional prefix
});
```

---

## Environment Compatibility

| Environment           | Memory Storage | LocalStorage | Custom Storage |
|-----------------------|:--------------:|:------------:|:--------------:|
| Browser               | ✅             | ✅           | ✅             |
| Node.js               | ✅             | ❌           | ✅             |
| Bun                   | ✅             | ❌           | ✅             |
| Express               | ✅             | ❌           | ✅             |
| Next.js API Routes    | ✅             | ❌           | ✅             |
| Next.js Edge Middleware | ✅           | ❌           | ✅             |
| Serverless (Vercel, Lambda) | ✅      | ❌           | ✅             |
| React Client          | ✅             | ✅           | ✅             |

---

## Custom Storage Adapters

Implement your own storage adapter for Redis, databases, or any other backend:

```typescript
class RedisAdapter {
  constructor(private redisClient: Redis) {}

  async get(key: string): Promise<number[]> {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : [];
  }

  async set(key: string, timestamps: number[]): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(timestamps), "EX", 3600);
  }
}

const limiter = createRateLimiter({
  key: "api-limit",
  max: 100,
  window: "1h",
  storage: new RedisAdapter(redisClient),
});
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT © [Joseph Maina](https://github.com/MainaJoseph)

---

## Support

- 📫 [Report a bug](https://github.com/MainaJoseph/universal-rate-limiter/issues)
- 💡 [Request a feature](https://github.com/MainaJoseph/universal-rate-limiter/issues)
- ⭐ Star this repo if you find it useful!
- 🔗 [View on GitHub](https://github.com/MainaJoseph/universal-rate-limiter)

---

<div align="center">

**Made with ❤️ for the JavaScript community**

</div>
