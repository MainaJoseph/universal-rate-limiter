// src/core/storage/local.ts
import type { StorageAdapter } from "../limiter";

export class LocalStorageAdapter implements StorageAdapter {
  constructor(private prefix: string = "rlx") {}

  async get(key: string): Promise<number[]> {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(`${this.prefix}:${key}`);
    return raw ? JSON.parse(raw) : [];
  }

  async set(key: string, timestamps: number[]): Promise<void> {
    if (typeof window === "undefined") return;
    localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(timestamps));
  }
}
