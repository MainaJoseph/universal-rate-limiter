# Next.js Edge Middleware/Proxy Example

This example supports both Next.js routing systems:
- **Next.js 12-15**: Uses `middleware.ts`
- **Next.js 16+**: Uses `proxy.ts`

## Which File to Use?

Check your Next.js version:
```bash
npm list next
```

- **Next.js 16+**: Use `proxy.ts` ⭐ (new routing system)
- **Next.js 12-15**: Use `middleware.ts` (legacy)

---

## Setup for Next.js 16+ (proxy.ts)

1. Create a new Next.js project (or use an existing one):
```bash
npx create-next-app@latest test-nextjs-app
cd test-nextjs-app
```

2. Copy `proxy.ts` to your Next.js project root (same level as `app/` or `pages/`)

3. Update the import path in `proxy.ts`:
```typescript
// Option A: Use npm link
import { rateLimitEdge } from "universal-rate-limiter";

// Option B: Use relative path to your built library
import { rateLimitEdge } from "../../path/to/universal-rate-limiter/dist/index.mjs";
```

---

## Setup for Next.js 12-15 (middleware.ts)

1. Create a new Next.js project (or use an existing one):
```bash
npx create-next-app@latest test-nextjs-app
cd test-nextjs-app
```

2. Copy `middleware.ts` to your Next.js project root (same level as `app/` or `pages/`)

3. Update the import path in `middleware.ts`:
```typescript
// Option A: Use npm link
import { rateLimitEdge } from "universal-rate-limiter";

// Option B: Use relative path to your built library
import { rateLimitEdge } from "../../path/to/universal-rate-limiter/dist/index.mjs";
```

---

## Common Steps (Both Versions)

4. Create a test API route:

**For App Router** (`app/api/test/route.ts`):
```typescript
export async function GET() {
  return Response.json({
    message: "Success!",
    timestamp: new Date().toISOString()
  });
}
```

**For Pages Router** (`pages/api/test.ts`):
```typescript
export default function handler(req, res) {
  res.status(200).json({
    message: "Success!",
    timestamp: new Date().toISOString()
  });
}
```

5. Run the Next.js development server:
```bash
npm run dev
```

6. Test the rate limiting:
```bash
# Make multiple requests to trigger rate limit
curl http://localhost:3000/api/test
curl http://localhost:3000/api/test
curl http://localhost:3000/api/test
# ... repeat until rate limited (6th request will be blocked)
```

---

## How It Works

The middleware/proxy will:
- Apply rate limiting to all routes matching `/api/:path*`
- Allow 5 requests per 10 seconds (default)
- Return a 429 status when rate limit is exceeded
- Include `Retry-After` header with seconds to wait

---

## Customization Examples

Both `middleware.ts` and `proxy.ts` include commented examples for:
- ✅ IP-based rate limiting
- ✅ Path-based rate limiting
- ✅ Custom key generation logic
- ✅ Different limits for different routes

Simply uncomment the example you want to use!

---

## Key Differences: middleware.ts vs proxy.ts

| Feature | middleware.ts (12-15) | proxy.ts (16+) |
|---------|----------------------|----------------|
| File name | `middleware.ts` | `proxy.ts` |
| Export | `export const middleware` | `export const proxy` |
| Config | `export const config` | `export const config` |
| Functionality | Same | Same |

**The rate limiting logic is identical** - only the file name and export name differ!
