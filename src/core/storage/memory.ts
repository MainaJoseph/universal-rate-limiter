// src/core/storage/memory.ts
export class MemoryStorage {
  private store: Map<string, number[]> = new Map();

  async get(key: string) {
    return this.store.get(key) || [];
  }

  async set(key: string, timestamps: number[]) {
    this.store.set(key, timestamps);
  }
}
