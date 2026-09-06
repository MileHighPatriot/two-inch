import type { Slot } from '../types'
import { scripts } from '../data/scripts'

const KEY = 'two-inch-slot-2026-09-06'

export function loadSlot(): Slot | null {
  if (typeof localStorage === 'undefined') return null
  const raw = localStorage.getItem(KEY)
  if (raw === 'early' || raw === 'mid' || raw === 'late') return raw
  return null
}

export function saveSlot(slot: Slot): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, slot)
}

export function scriptFor(slot: Slot) {
  const found = scripts.find((s) => s.slot === slot)
  if (!found) throw new Error(`Missing script for ${slot}`)
  return found
}
