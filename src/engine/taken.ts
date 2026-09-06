const TAKEN_KEY = 'two-inch-taken-2026-09-06'
const MINE_KEY = 'two-inch-mine-2026-09-06'

function readSet(key: string): Set<string> {
  if (typeof localStorage === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    const ids = JSON.parse(raw) as unknown
    if (!Array.isArray(ids)) return new Set()
    return new Set(ids.filter((x): x is string => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

function writeSet(key: string, ids: Set<string>): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, JSON.stringify([...ids]))
}

export function loadTaken(): Set<string> {
  return readSet(TAKEN_KEY)
}

export function loadMine(): Set<string> {
  return readSet(MINE_KEY)
}

export function saveTaken(taken: Set<string>): void {
  writeSet(TAKEN_KEY, taken)
}

export function saveMine(mine: Set<string>): void {
  writeSet(MINE_KEY, mine)
}

/** Someone in the room drafted them. Off the board. */
export function toggleTaken(taken: Set<string>, id: string): Set<string> {
  const next = new Set(taken)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  saveTaken(next)
  return next
}

/** You drafted them. Also marks them taken. */
export function draftMine(
  taken: Set<string>,
  mine: Set<string>,
  id: string,
): { taken: Set<string>; mine: Set<string> } {
  const nextTaken = new Set(taken)
  const nextMine = new Set(mine)
  if (nextMine.has(id)) {
    nextMine.delete(id)
  } else {
    nextMine.add(id)
    nextTaken.add(id)
  }
  saveTaken(nextTaken)
  saveMine(nextMine)
  return { taken: nextTaken, mine: nextMine }
}
