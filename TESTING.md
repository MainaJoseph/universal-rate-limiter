# 🧪 Local Testing Guide

Complete guide to testing your Universal Rate Limiter library locally.

## Prerequisites

1. Build the library first:
```bash
npm run build
```

This creates the `dist/` folder with compiled code that the examples will use.

---

## 🚀 Quick Test: Express Server

The easiest way to test is with the Express example:

### Step 1: Run the Express test server

```bash
npm run test:express
```

This starts a server at `http://localhost:4001` with three test endpoints.

**Note:** The server uses port 4001 to avoid conflicts with other applications that might be using port 3000.

### Step 2: Test with your browser or curl

**In your browser:**
- Open `http://localhost:4001/api/public/data`
- Refresh the page 6+ times to trigger the rate limit

**With curl (Windows PowerShell):**
```powershell
# Make 7 requests (limit is 5 per minute)
for ($i=1; $i -le 7; $i++) {
    Write-Host "Request $i" -ForegroundColor Green
    curl http://localhost:4001/api/public/data
    Start-Sleep -Milliseconds 500
}
```

**Expected result:**
- First 5 requests: `{"message":"Success! You accessed the public API.","timestamp":"..."}`
- Request 6+: `{"error":"Too many requests","retryAfter":...}`

---

## 🌐 Test: Vanilla JavaScript (Browser)

This tests both MemoryStorage and LocalStorage adapters.

### Step 1: Build the library
```bash
npm run build
```

### Step 2: Open the HTML file
```bash
# Open in your default browser
start examples/vanilla/index.html

# Or navigate to the file manually
```

### Step 3: Test the features
1. Click "Click Me (Memory Storage)" 5+ times
   - Watch the counter decrease
   - After 5 clicks, you'll see a rate limit error

2. Click "Click Me (LocalStorage)" 3+ times
   - After 3 clicks, you'll see a rate limit error
   - **Close and reopen the page** - the limit persists!

3. Click "Clear LocalStorage" to reset

---

## ⚛️ Test: React Hook

### Option A: Create a quick Vite test app

```bash
# Create a new React app with Vite
npm create vite@latest test-rate-limiter -- --template react
cd test-rate-limiter
npm install
```

### Option B: Link your library

From the `universal-rate-limiter` directory:
```bash
npm link
```

From your test React app:
```bash
npm link universal-rate-limiter
```

### Option C: Copy the example

```bash
# Copy the example component
cp ../examples/react/App.jsx src/App.jsx
```

### Option D: Update the import

Edit `src/App.jsx` and change the import:
```javascript
// Change from:
import { useRateLimit } from "../../dist/index.mjs";

// To:
import { useRateLimit } from "universal-rate-limiter";
```

### Option E: Run the app

```bash
npm run dev
```

Visit `http://localhost:5173` and test the rate limiting by clicking the buttons.

---

## 🔥 Test: Next.js Edge Middleware

### Step 1: Create a Next.js app

```bash
npx create-next-app@latest test-nextjs-limiter
cd test-nextjs-limiter
```

### Step 2: Link your library

```bash
cd ../universal-rate-limiter
npm link

cd ../test-nextjs-limiter
npm link universal-rate-limiter
```

### Step 3: Copy the middleware

```bash
cp ../universal-rate-limiter/examples/nextjs/middleware.ts ./
```

### Step 4: Update the import in middleware.ts

```typescript
// Change from:
import { rateLimitEdge } from "../../dist/index.mjs";

// To:
import { rateLimitEdge } from "universal-rate-limiter";
```

### Step 5: Create a test API route

Create `app/api/test/route.ts`:
```typescript
export async function GET() {
  return Response.json({
    message: "Success!",
    timestamp: new Date().toISOString()
  });
}
```

### Step 6: Run and test

```bash
npm run dev
```

Test with curl:
```bash
# Make 7 requests (limit is 5 per 10 seconds)
curl http://localhost:3000/api/test
# Repeat 6 more times...
```

---

## 📝 Manual Testing Checklist

### ✅ Core Functionality
- [ ] Rate limiting enforces max requests within time window
- [ ] `remaining` count decreases correctly
- [ ] `retryAfter` returns correct milliseconds
- [ ] Time windows work: `10s`, `1m`, `1h`, `1d`

### ✅ Storage Adapters
- [ ] `MemoryStorage` works (data lost on restart)
- [ ] `LocalStorageAdapter` works (persists in browser)
- [ ] Custom key strings work
- [ ] Dynamic key functions work

### ✅ Express Middleware
- [ ] Static key rate limiting works
- [ ] IP-based rate limiting works (no key specified)
- [ ] Returns 429 status when rate limited
- [ ] `retryAfter` value is correct

### ✅ Next.js Edge Middleware
- [ ] Static key works
- [ ] Middleware intercepts requests
- [ ] Returns 429 with `Retry-After` header
- [ ] Allows requests after window expires

### ✅ React Hook
- [ ] `useRateLimit` tracks state correctly
- [ ] `attempt()` function works
- [ ] UI updates reactively
- [ ] Multiple hooks work independently

---

## 🐛 Troubleshooting

### "Cannot find module" errors
**Solution:** Build the library first:
```bash
npm run build
```

### Port 3000 already in use
**Solution:** Kill the process or change the port in `examples/express/server.js`:
```javascript
const PORT = 4000; // Changed from 3000
```

### npm link not working
**Solution:** Use relative imports in examples:
```javascript
import { rateLimitExpress } from "../../dist/index.mjs";
```

### LocalStorage not persisting
**Solution:** Make sure you're using the same browser and not in incognito mode.

---

## 🎯 Quick Commands Reference

```bash
# Build the library
npm run build

# Run Express test server
npm run test:express

# Watch mode (auto-rebuild on code changes)
npm run dev

# Open vanilla JS example
start examples/vanilla/index.html
```

---

## 📚 Example Files Location

- **Express:** `examples/express/server.js`
- **Next.js:** `examples/nextjs/middleware.ts`
- **React:** `examples/react/App.jsx`
- **Vanilla JS:** `examples/vanilla/index.html`

Each directory has its own README with detailed instructions!

---

Happy testing! 🎉
