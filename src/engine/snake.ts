import type { Slot } from '../types'

export const TEAMS = 10
export const ROUNDS = 16

export function slotBand(pick: number): Slot {
  if (pick <= 3) return 'early'
  if (pick <= 7) return 'mid'
  return 'late'
}

/** Overall pick number (1-based) for a 10-team snake. */
export function overallPick(slot: number, round: number, teams = TEAMS): number {
  if (round % 2 === 1) return (round - 1) * teams + slot
  return round * teams - slot + 1
}

export function picksForSlot(slot: number, rounds = ROUNDS, teams = TEAMS): number[] {
  return Array.from({ length: rounds }, (_, i) => overallPick(slot, i + 1, teams))
}

/** Picks the rest of the room makes before your next one. */
export function waitAfter(slot: number, round: number, teams = TEAMS): number {
  if (round % 2 === 1) return 2 * (teams - slot)
  return 2 * (slot - 1)
}
