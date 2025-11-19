# Testing Examples

This directory contains working examples to test the Universal Rate Limiter locally.

## Quick Start

### 1. Build the library first
```bash
npm run build
```

### 2. Test Express Middleware (Easiest!)

```bash
npm run test:express
```

This will start an Express server on `http://localhost:3000` with three test endpoints:

**Test endpoints:**
- `http://localhost:3000/api/public/data` - 5 requests per minute
- `http://localhost:3000/api/protected/data` - 3 requests per 30 seconds
- `http://localhost:3000/api/user/profile?userId=123` - 10 requests per minute

**Test it with curl:**
```bash
# Make multiple requests to see rate limiting in action
curl http://localhost:3000/api/public/data
curl http://localhost:3000/api/public/data
curl http://localhost:3000/api/public/data
# ... keep going until you hit the limit!
```

**Or test in your browser:**
Just open `http://localhost:3000/api/public/data` and refresh multiple times.

---

### 3. Test Vanilla JavaScript (Browser)

```bash
npm run build
# Then open examples/vanilla/index.html in your browser
```

**What it tests:**
- ✅ Memory storage (in-memory, resets on page reload)
- ✅ LocalStorage adapter (persists across page reloads)
- ✅ Interactive UI showing remaining attempts
- ✅ Visual feedback for rate limiting

**How to test:**
1. Open `examples/vanilla/index.html` in your browser
2. Click the buttons multiple times
3. Watch the rate limiting in action
4. Try reloading the page to see LocalStorage persistence

---

### 4. Test React Hook

**Option A: Quick test with Vite**
```bash
# Create a new React app
npm create vite@latest test-react -- --template react
cd test-react
npm install

# Link your library
cd ../
npm link
cd test-react
npm link universal-rate-limiter

# Copy the example
cp ../examples/react/App.jsx src/App.jsx

# Update the import in App.jsx to:
# import { useRateLimit } from "universal-rate-limiter";

# Run it
npm run dev
```

**Option B: Use the example directly**
1. Copy `examples/react/App.jsx` to your existing React project
2. Update the import path to point to the built library
3. Run your React dev server

**What it tests:**
- ✅ `useRateLimit` hook
- ✅ Multiple independent rate limiters in one component
- ✅ Form submission rate limiting
- ✅ Download button rate limiting
- ✅ Reactive UI updates

---

### 5. Test Next.js Edge Middleware

**Setup:**
```bash
# Create a Next.js app
npx create-next-app@latest test-nextjs
cd test-nextjs

# Link your library
cd ../
npm link
cd test-nextjs
npm link universal-rate-limiter

# Copy the middleware
cp ../examples/nextjs/middleware.ts ./middleware.ts

# Update the import in middleware.ts to:
# import { rateLimitEdge } from "universal-rate-limiter";
```

**Create a test API route** (`app/api/test/route.ts`):
```typescript
export async function GET() {
  return Response.json({
    message: "Success!",
    timestamp: new Date().toISOString()
  });
}
```

**Run and test:**
```bash
npm run dev

# In another terminal, test the rate limiting:
curl http://localhost:3000/api/test
# Repeat 6+ times to trigger rate limit
```

---

## Testing Checklist

### Express Middleware ✅
- [ ] Static key rate limiting works
- [ ] IP-based rate limiting works (default)
- [ ] Custom key function works
- [ ] Returns 429 status when rate limited
- [ ] Returns correct `retryAfter` value

### Vanilla JS / Browser ✅
- [ ] Memory storage works
- [ ] LocalStorage adapter works
- [ ] LocalStorage persists across page reloads
- [ ] Rate limit resets after window expires
- [ ] UI updates correctly

### React Hook ✅
- [ ] Hook properly tracks remaining attempts
- [ ] Multiple hooks work independently
- [ ] `attempt()` function works correctly
- [ ] UI updates reactively
- [ ] No re-render issues

### Next.js Edge Middleware ✅
- [ ] Middleware runs on edge runtime
- [ ] Static key works
- [ ] Dynamic key (function) works
- [ ] Returns proper 429 response
- [ ] `Retry-After` header is set

---

## Quick Testing Commands

```bash
# Build the library
npm run build

# Test Express
npm run test:express

# Test in browser (vanilla JS)
# Open examples/vanilla/index.html

# Watch mode (auto-rebuild on changes)
npm run dev
```

---

## Troubleshooting

### "Cannot find module" errors
Make sure you've built the library first:
```bash
npm run build
```

### Express server won't start
Check if port 3000 is already in use:
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

### React/Next.js import errors
Use `npm link` to create a symlink to your local library:
```bash
# In universal-rate-limiter directory
npm link

# In your test project
npm link universal-rate-limiter
```

---

## Need Help?

Check the individual README files in each example directory for more detailed instructions:
- `express/` - Express middleware examples
- `nextjs/` - Next.js Edge middleware examples
- `react/` - React hook examples
- `vanilla/` - Browser JavaScript examples
