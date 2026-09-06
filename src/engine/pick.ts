import { slotBand } from './snake'
import type { Slot } from '../types'

const KEY = 'two-inch-pick-2026-09-06'

export function loadPick(): number | null {
  if (typeof localStorage === 'undefined') return null
  const n = Number(localStorage.getItem(KEY))
  if (n >= 1 && n <= 10) return n
  return null
}

export function savePick(slot: number): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, String(slot))
}

export function slotFromPick(slot: number): Slot {
  return slotBand(slot)
}
