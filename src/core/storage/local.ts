// src/core/storage/local.ts
export class LocalStorageAdapter {
  constructor(private prefix: string = "rlx") {}

  async get(key: string) {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(`${this.prefix}:${key}`);
    return raw ? JSON.parse(raw) : [];
  }

  async set(key: string, timestamps: number[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(timestamps));
  }
}
