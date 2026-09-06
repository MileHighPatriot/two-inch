const KEY = 'two-inch-queue-2026-09-06'
const MAX = 5

export function loadQueue(): string[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const ids = JSON.parse(raw) as unknown
    if (!Array.isArray(ids)) return []
    return ids.filter((x): x is string => typeof x === 'string').slice(0, MAX)
  } catch {
    return []
  }
}

export function saveQueue(ids: string[]): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(ids.slice(0, MAX)))
}

export function toggleQueue(ids: string[], id: string): string[] {
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id].slice(0, MAX)
  saveQueue(next)
  return next
}
