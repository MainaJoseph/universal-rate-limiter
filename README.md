

````markdown
# 🌐 Universal Rate Limiter  
### A lightweight, zero-dependency rate limiter that works **everywhere** — frontend, backend, serverless, and edge.

`universal-rate-limiter` is a flexible, modern, and fully TypeScript rate-limiting utility designed to run **in any JavaScript environment**. Whether you're building a backend API, a frontend app, a serverless function, or a browser extension — this library gives you a fast, predictable, and dependency-free way to prevent excessive requests or actions.

Most rate limiters only work on backend frameworks or require Redis, databases, or specific runtimes.  
**This one works in every environment — with zero dependencies.**

---

# Universal Rate Limiter

### A lightweight, TypeScript-first rate limiter for Frontend + Backend

`universal-rate-limiter` is a flexible, zero-dependency rate limiter that works **everywhere**:

- **Browser** (localStorage or memory)  
- **Node.js**  
- **Express**  
- **Next.js API Routes**  
- **Next.js Edge Middleware**  
- **React (via hook)**  
- **Serverless environments** (Vercel, AWS Lambda, Cloudflare)

This library was created to solve a huge gap:

> Most rate limiters only work on the backend — this one works in _every environment_.

---

## 🚀 Features

✔ Works in **frontend + backend**  
✔ Built-in storage adapters: memory & localStorage  
✔ Extendable (custom storage adapters supported)  
✔ Next.js Middleware support (Edge-compatible)  
✔ Express middleware included  
✔ React hook for UI components  
✔ 0 dependencies  
✔ TypeScript-first  
✔ Fully tree-shakeable  

---

## 📦 Installation

```bash
npm install universal-rate-limiter

# or

yarn add universal-rate-limiter

# or

pnpm add universal-rate-limiter
````

---

## Usage Examples

### Express Middleware

```typescript
import express from "express";
import { rateLimitExpress } from "universal-rate-limiter";

const app = express();
app.use(
  rateLimitExpress({
    key: "api-limit",
    max: 10,
    window: "1m",
  })
);

app.get("/api/data", (req, res) => {
  res.json({ message: "Success" });
});
```

### Next.js Edge Middleware

```typescript
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

```tsx
import { useRateLimit } from "universal-rate-limiter";

export function MyComponent() {
  const { allowed, remaining, attempt } = useRateLimit("button-click", {
    max: 3,
    window: "1m",
  });

  const handleClick = async () => {
    const isAllowed = await attempt();
    if (isAllowed) {
      console.log("Action allowed!");
    } else {
      console.log("Rate limit exceeded");
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={!allowed}>
        Click me ({remaining} remaining)
      </button>
    </div>
  );
}
```

### Custom Storage

```typescript
import {
  createRateLimiter,
  LocalStorageAdapter,
} from "universal-rate-limiter";

const limiter = createRateLimiter({
  key: "custom-limit",
  max: 5,
  window: "1h",
  storage: new LocalStorageAdapter("my-app"),
});

const result = await limiter.check();
console.log(result); // { allowed: true, remaining: 4, retryAfter: 0 }
```

---

## API Reference

### `createRateLimiter(options: RateLimitOptions)`

Creates a rate limiter instance.

**Options:**

* `key` (string | function): Unique identifier for the limit. Can be a function for dynamic keys.
* `max` (number): Maximum requests allowed in the window.
* `window` (string | number): Time window (e.g., `"1m"`, `"10s"`, or milliseconds).
* `storage` (optional): Storage adapter. Defaults to MemoryStorage.

**Returns:**
A rate limiter instance with an async `check()` method.

### `check() -> Promise<RateLimitResult>`

Returns:

```ts
{
  allowed: boolean;
  remaining: number;
  retryAfter: number; // milliseconds
}
```

---

## Window Format

Use human-readable window strings:

* `"10s"` – 10 seconds
* `"5m"` – 5 minutes
* `"1h"` – 1 hour
* `"1d"` – 1 day
* `5000` – milliseconds

---

## License

MIT

```

---

If you want, I can also generate:

🔥 **Badges section** (npm version, downloads, TypeScript, bundle size)  
🔥 **Changelog**  
🔥 **Contributing guide**  
🔥 **More advanced examples**  
🔥 **Full API table**

Just tell me **"add badges"** or **"add changelog"** etc.
```
