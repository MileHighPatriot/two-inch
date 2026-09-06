import type { Player } from '../types'

export function byesFromRoster(roster: Player[]): { week: number; names: string[] }[] {
  const map = new Map<number, string[]>()
  for (const p of roster) {
    if (p.bye == null) continue
    const list = map.get(p.bye) ?? []
    list.push(`${p.name} (${p.pos})`)
    map.set(p.bye, list)
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([week, names]) => ({ week, names }))
}

export const HOT_BYES = new Set([6, 10, 11, 14])
