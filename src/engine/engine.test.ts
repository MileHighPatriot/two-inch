import { describe, expect, it } from 'vitest'
import { players } from '../data/players'
import { scripts } from '../data/scripts'
import { searchPlayers } from './search'
import { onTheClock } from './clock'
import { warningsFor } from './warnings'

describe('board data', () => {
  it('has unique player ids', () => {
    const ids = players.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has all three slot scripts through R16', () => {
    expect(scripts.map((s) => s.slot)).toEqual(['early', 'mid', 'late'])
    for (const s of scripts) {
      expect(s.rounds.map((r) => r.round)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    }
  })
})

describe('search', () => {
  it('finds Lloyd by partial name', () => {
    const hits = searchPlayers(players, 'lloyd')
    expect(hits.some((p) => p.id === 'marshawn-lloyd')).toBe(true)
  })

  it('filters RBs', () => {
    const hits = searchPlayers(players, 'rb', { pos: 'RB' })
    expect(hits.every((p) => p.pos === 'RB')).toBe(true)
    expect(hits.some((p) => p.id === 'chase-brown')).toBe(true)
  })

  it('hides taken names', () => {
    const hits = searchPlayers(players, 'gibbs', { hideTaken: true, taken: new Set(['jahmyr-gibbs']) })
    expect(hits.some((p) => p.id === 'jahmyr-gibbs')).toBe(false)
  })
})

describe('on the clock', () => {
  it('forces RB when short in R1–R5', () => {
    const a = onTheClock({ round: 3, rbCount: 1, hasTe: false, hasQb: false, hasDst: false, hasK: false })
    expect(a.step).toBe(1)
    expect(a.headline).toMatch(/RB/)
  })

  it('asks for TE at 7+ without one', () => {
    const a = onTheClock({ round: 7, rbCount: 2, hasTe: false, hasQb: false, hasDst: false, hasK: false })
    expect(a.step).toBe(3)
    expect(a.names[0]).toBe('Tucker Kraft')
  })

  it('asks for QB at 8+ without one', () => {
    const a = onTheClock({ round: 8, rbCount: 2, hasTe: true, hasQb: false, hasDst: false, hasK: false })
    expect(a.step).toBe(4)
    expect(a.names[0]).toBe('Drake Maye')
  })
})

describe('warnings', () => {
  it('flags two Bronco skill players', () => {
    const w = warningsFor(['jaylen-waddle'], 'rj-harvey')
    expect(w.some((x) => x.includes('Bronco'))).toBe(true)
  })

  it('flags Gibbs + ARSB', () => {
    const w = warningsFor(['jahmyr-gibbs'], 'amon-ra-st-brown')
    expect(w.some((x) => x.includes('Gibbs'))).toBe(true)
  })

  it('flags Lamb + Pickens', () => {
    const w = warningsFor(['ceedee-lamb'], 'george-pickens')
    expect(w.some((x) => x.includes('Lamb'))).toBe(true)
  })
})
