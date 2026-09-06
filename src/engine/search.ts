import type { Player, Pos } from '../types'

function norm(s: string): string {
  return s.toLowerCase().replace(/['.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
}

export function searchPlayers(
  players: Player[],
  query: string,
  opts: { pos?: Pos | 'ALL'; hideTaken?: boolean; taken?: Set<string> } = {},
): Player[] {
  const q = norm(query)
  const taken = opts.taken ?? new Set<string>()
  let out = players

  if (opts.pos && opts.pos !== 'ALL') {
    out = out.filter((p) => p.pos === opts.pos)
  }
  if (opts.hideTaken) {
    out = out.filter((p) => !taken.has(p.id))
  }
  if (q) {
    out = out.filter((p) => {
      const hay = norm(
        `${p.name} ${p.team} ${p.pos} ${p.window} ${p.note} ${p.tags.join(' ')} ${p.espnAdp ?? ''}`,
      )
      return q.split(' ').every((part) => hay.includes(part))
    })
  }

  return [...out].sort((a, b) => {
    const aa = a.espnAdp ?? 999
    const bb = b.espnAdp ?? 999
    return aa - bb
  })
}
