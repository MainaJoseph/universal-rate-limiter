// src/core/storage/memory.ts
import type { StorageAdapter } from "../limiter";

export class MemoryStorage implements StorageAdapter {
  private store: Map<string, number[]> = new Map();

  async get(key: string): Promise<number[]> {
    return this.store.get(key) || [];
  }

  async set(key: string, timestamps: number[]): Promise<void> {
    this.store.set(key, timestamps);
  }
}
