# Next.js Edge Middleware Example

To test the Next.js Edge middleware example:

## Setup

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
# ... repeat until rate limited
```

## How It Works

The middleware will:
- Apply rate limiting to all routes matching `/api/:path*`
- Allow 5 requests per 10 seconds
- Return a 429 status when rate limit is exceeded
- Include `Retry-After` header with seconds to wait

## Customization

See the commented examples in `middleware.ts` for:
- IP-based rate limiting
- Path-based rate limiting
- Custom key generation logic
