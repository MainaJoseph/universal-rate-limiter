# Which File Should I Use? 🤔

Quick guide to choosing the right file for your Next.js version.

## TL;DR

```bash
# Check your Next.js version
npm list next
```

| Next.js Version | File to Use | Export Name |
|----------------|-------------|-------------|
| **16.0.0+** | `proxy.ts` ⭐ | `export const proxy` |
| **12.x - 15.x** | `middleware.ts` | `export const middleware` |
| **< 12.0** | Not supported | - |

---

## Detailed Guide

### Next.js 16+ (Current)

**Use:** `proxy.ts`

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

**Why?** Next.js 16 introduced a new routing system and renamed middleware files to `proxy.ts`.

---

### Next.js 12-15 (Legacy)

**Use:** `middleware.ts`

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

**Why?** Older Next.js versions use the `middleware.ts` convention.

---

## Key Differences

The **only difference** between the two files is:
1. **File name**: `proxy.ts` vs `middleware.ts`
2. **Export name**: `export const proxy` vs `export const middleware`

**Everything else is identical!** The rate limiting logic, configuration, and functionality are exactly the same.

---

## How to Check Your Version

### Method 1: Check package.json
```bash
cat package.json | grep "next"
```

### Method 2: Use npm
```bash
npm list next
```

### Method 3: Check node_modules
```bash
# The version is in node_modules/next/package.json
cat node_modules/next/package.json | grep version
```

---

## Migration Guide

### Upgrading from Next.js 15 → 16

If you're upgrading from Next.js 15 to 16:

1. Rename your file:
   ```bash
   mv middleware.ts proxy.ts
   ```

2. Update the export:
   ```typescript
   // Change from:
   export const middleware = rateLimitEdge({...});

   // To:
   export const proxy = rateLimitEdge({...});
   ```

3. Keep the same config:
   ```typescript
   export const config = {
     matcher: ["/api/:path*"],
   };
   ```

That's it! No other changes needed.

---

## Still Confused?

Both files are provided in this directory:
- `proxy.ts` - For Next.js 16+
- `middleware.ts` - For Next.js 12-15

Just copy the one that matches your Next.js version to your project root!
