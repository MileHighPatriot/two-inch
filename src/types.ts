export type Pos = 'QB' | 'RB' | 'WR' | 'TE' | 'DST' | 'K'

export type Tag =
  | 'red'
  | 'smash'
  | 'cross-off'
  | 'soften'
  | 'buy'
  | 'bronco'
  | 'ir-dead'
  | 'handcuff'

export type Slot = 'early' | 'mid' | 'late'

export type Player = {
  id: string
  name: string
  pos: Pos
  team: string
  espnAdp: number | null
  tier: number | null
  window: string
  tags: Tag[]
  bye: number | null
  note: string
}

export type RoundLine = {
  round: number
  take: string
  backup: string
  note: string
}

export type Script = {
  slot: Slot
  label: string
  picks: string
  fork: string
  rounds: RoundLine[]
}

export type Handcuff = {
  starterId: string
  starter: string
  cuff: string
  when: string
}

export type Advice = {
  step: number
  headline: string
  names: string[]
  why: string
}
