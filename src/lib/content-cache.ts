// A small per-process cache: dynamic pages still render per request, while
// navigation can reuse successful CMS responses for at most 15 seconds.
export function createContentCache(ttlMs = 15_000, maxEntries = 200) {
  const values = new Map<string, { data: unknown; expiresAt: number }>();
  const pending = new Map<string, Promise<unknown>>();

  return async function read<T>(key: string, load: () => Promise<T>): Promise<T> {
    const cached = values.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      // Pages resolve relative media URLs in place. Never share those mutations.
      return structuredClone(cached.data) as T;
    }
    values.delete(key);

    let request = pending.get(key);
    if (!request) {
      request = load().then((data) => {
        if (values.size >= maxEntries) {
          const oldest = values.keys().next().value;
          if (oldest !== undefined) values.delete(oldest);
        }
        values.set(key, { data, expiresAt: Date.now() + ttlMs });
        return data;
      }).finally(() => {
        pending.delete(key);
      });
      pending.set(key, request);
    }
    // Failures are never cached; later requests can recover immediately.
    return structuredClone(await request) as T;
  };
}
