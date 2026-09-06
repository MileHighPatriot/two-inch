import { players } from '../data/players'
import type { Player } from '../types'

function norm(s: string): string {
  return s.toLowerCase().replace(/['.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
}

/** Players whose names appear in a script line or sleeper title. */
export function playersMentioned(text: string): Player[] {
  const hay = norm(text)
  if (!hay) return []
  return players.filter((p) => {
    const n = norm(p.name)
    if (n.length < 4) {
      return hay === n || hay.startsWith(`${n} `) || hay.includes(` ${n} `)
    }
    return hay.includes(n)
  })
}

export function anyMentionGone(text: string, taken: Set<string>): boolean {
  const hits = playersMentioned(text)
  if (hits.length === 0) return false
  return hits.every((p) => taken.has(p.id))
}

export function primaryGone(take: string, taken: Set<string>): boolean {
  const hits = playersMentioned(take.split('/')[0] ?? take)
  if (hits.length === 0) return false
  return hits.some((p) => taken.has(p.id))
}
