// src/core/time.ts
export function parseWindow(window: string | number): number {
  if (typeof window === "number") return window;

  const match = window.match(/^(\d+)(s|m|h|d)$/);
  if (!match) throw new Error("Invalid window format. Use format like '10s', '5m', '1h', '1d'");

  const value = parseInt(match[1], 10);
  const unit = match[2] as "s" | "m" | "h" | "d";

  const units: Record<"s" | "m" | "h" | "d", number> = {
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  return value * units[unit];
}
