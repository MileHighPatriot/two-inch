import { searchPlayers } from './search'
import type { Player, Pos } from '../types'

const SKIP = new Set(['cross-off', 'ir-dead'])

export function remaining(players: Player[], taken: Set<string>): Player[] {
  return players.filter((p) => !taken.has(p.id) && !p.tags.some((t) => SKIP.has(t)))
}

export function bestAvailable(
  players: Player[],
  taken: Set<string>,
  pos: Pos,
  n = 3,
): Player[] {
  return searchPlayers(remaining(players, taken), '', { pos }).slice(0, n)
}

export function bestByNeed(
  players: Player[],
  taken: Set<string>,
): { pos: Pos; names: Player[] }[] {
  const order: Pos[] = ['RB', 'WR', 'TE', 'QB', 'DST', 'K']
  return order.map((pos) => ({ pos, names: bestAvailable(players, taken, pos, 3) }))
}
