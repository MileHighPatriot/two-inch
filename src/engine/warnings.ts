import { BRONCO_SKILL, GB_CORE, STACK_TRAPS } from '../data/clock'
import { players } from '../data/players'

const W6 = new Set(['CIN', 'DET', 'MIA', 'MIN'])
const W11 = new Set(['ATL', 'CLE', 'GB', 'LAR', 'NE', 'SEA'])

export function warningsFor(takenIds: Iterable<string>, addingId?: string): string[] {
  const ids = new Set(takenIds)
  if (addingId) ids.add(addingId)

  const warnings: string[] = []
  const roster = players.filter((p) => ids.has(p.id))

  const broncoSkill = roster.filter((p) => BRONCO_SKILL.includes(p.id) || (p.tags.includes('bronco') && (p.pos === 'RB' || p.pos === 'WR')))
  if (broncoSkill.length > 1) {
    warnings.push(`One Bronco skill: already ${broncoSkill.map((p) => p.name).join(' + ')}.`)
  }

  const gb = roster.filter((p) => GB_CORE.includes(p.id))
  if (gb.length >= 2) {
    warnings.push(`GB core: ${gb.map((p) => p.name).join(' + ')}. Do not take Lloyd+Watson+Kraft.`)
  }

  for (const trap of STACK_TRAPS) {
    if (trap.ids.every((id) => ids.has(id))) {
      warnings.push(`Do not: ${trap.label}.`)
    }
  }

  const w6 = roster.filter((p) => p.team && W6.has(p.team) && (p.pos === 'RB' || p.pos === 'WR' || p.pos === 'QB'))
  if (w6.length >= 3) {
    warnings.push(`Week 6 nuke: ${w6.length} from CIN/DET/MIA/MIN. Two max.`)
  }

  const w11 = roster.filter((p) => p.team && W11.has(p.team) && p.pos !== 'K' && p.pos !== 'DST')
  if (w11.length >= 3) {
    warnings.push(`Week 11 nuke: ${w11.length} from ATL/CLE/GB/LAR/NE/SEA. Two max.`)
  }

  const cowboys = roster.filter((p) => p.team === 'DAL' && p.pos !== 'K' && p.pos !== 'DST')
  if (cowboys.length > 1) {
    warnings.push(`Week 14: one Cowboy starter max (${cowboys.map((p) => p.name).join(', ')}).`)
  }

  const broncos = roster.filter((p) => p.team === 'DEN' && p.pos !== 'K' && p.pos !== 'DST')
  if (broncos.length > 1) {
    warnings.push(`Week 10: one Bronco skill max as core.`)
  }

  return warnings
}
