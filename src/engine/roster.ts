import { players } from '../data/players'
import type { Player } from '../types'

export function rosterOf(mine: Set<string>): Player[] {
  return players.filter((p) => mine.has(p.id))
}

export function clockStateFromMine(mine: Set<string>, round: number) {
  const roster = rosterOf(mine)
  return {
    round,
    rbCount: roster.filter((p) => p.pos === 'RB').length,
    hasTe: roster.some((p) => p.pos === 'TE'),
    hasQb: roster.some((p) => p.pos === 'QB'),
    hasDst: roster.some((p) => p.pos === 'DST'),
    hasK: roster.some((p) => p.pos === 'K'),
  }
}
