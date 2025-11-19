# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Universal Rate Limiter is a TypeScript library that provides rate limiting functionality across frontend and backend environments (Browser, Node.js, Express, Next.js Middleware, React). It's designed to be lightweight (0 dependencies) and universally compatible.

## Build Commands

```bash
# Build the library (outputs to dist/)
npm run build

# Development mode with file watching
npm run dev
```

Build tool: `tsup` - handles ESM/CJS dual-format output with type declarations.

## Architecture

### Core Design Pattern

The library uses a **sliding window algorithm** with pluggable storage adapters. All rate limiting implementations share the same core logic via `createRateLimiter()`.

**Key architectural principle**: One core limiter (`src/core/limiter.ts`) with environment-specific wrappers.

### Core Components

**`src/core/limiter.ts`** - Central rate limiting logic
- Implements sliding window algorithm using timestamps
- `check()` method filters timestamps within window, enforces max limit
- Returns `{ allowed, remaining, retryAfter }` on each check
- Accepts any storage adapter implementing `get(key)` and `set(key, timestamps[])`

**`src/core/time.ts`** - Window parser
- Converts human-readable strings ("10s", "5m", "1h") to milliseconds
- Format: `\d+(s|m|h|d)` where s=seconds, m=minutes, h=hours, d=days

**Storage Adapters** (`src/core/storage/`)
- `MemoryStorage` - In-memory Map, default storage
- `LocalStorageAdapter` - Browser localStorage with prefix support
- Both implement async `get(key)` and `set(key, timestamps[])` interface

### Environment-Specific Wrappers

**Express** (`src/express/middleware.ts`)
- Wraps core limiter with Express middleware signature
- Extracts client IP from `req.ip` as rate limit key
- Returns 429 status with retry info when limit exceeded

**Next.js Edge** (`src/next/edge.ts`)
- Middleware for Next.js Edge Runtime
- Returns `Response` objects (429 with Retry-After header)
- Compatible with Edge-compatible storage only (MemoryStorage)

**React Hook** (`src/react/useRateLimit.ts`)
- React hook wrapping core limiter
- Maintains state for `allowed`, `remaining`, `retryAfter`
- `attempt()` method checks limit and updates state
- Uses default MemoryStorage or optional LocalStorageAdapter

### Important Implementation Details

**Timestamp Management**: The limiter stores an array of request timestamps per key. On each check:
1. Filter out timestamps older than the window
2. If remaining timestamps >= max, deny request
3. Otherwise, append current timestamp and allow

**Storage Interface**: Any custom storage adapter must implement:
```typescript
async get(key: string): Promise<number[]>
async set(key: string, timestamps: number[]): Promise<void>
```

**Key Generation**: The `key` option accepts either:
- Static string: Same limit shared across all requests
- Function: Dynamic key per request (e.g., `(req) => req.ip`)

## Common Development Tasks

### Adding a New Environment Wrapper

1. Create file in appropriate directory (e.g., `src/fastify/`)
2. Import and call `createRateLimiter(options)`
3. Override `key` option with environment-specific identifier extraction
4. Handle response format for the environment's conventions
5. Export from `src/index.ts`

### Adding a New Storage Adapter

1. Create class in `src/core/storage/`
2. Implement `async get(key: string): Promise<number[]>`
3. Implement `async set(key: string, timestamps: number[]): Promise<void>`
4. Export from `src/index.ts`
5. Ensure compatibility with target runtime (e.g., Edge runtime restrictions)

## TypeScript Configuration

Target: ES2020, outputs both ESM and CJS formats via tsup. Type declarations generated automatically.
