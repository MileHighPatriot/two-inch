export const CLOCK_STEPS = [
  {
    step: 1,
    headline: 'Need RBs',
    test: '<2 RBs and R1–R5? Take the RB.',
    names: [],
  },
  {
    step: 2,
    headline: 'Healthy WR',
    test: 'Else healthy WR (not Nabers/Egbuka reach).',
    names: [],
  },
  {
    step: 3,
    headline: 'TE 7+',
    test: 'TE 7+: Kraft > Fannin > LaPorta > Pitts > Kittle.',
    names: ['Tucker Kraft', 'Harold Fannin', 'Sam LaPorta', 'Kyle Pitts', 'George Kittle'],
  },
  {
    step: 4,
    headline: 'QB 8+',
    test: 'QB 8+: Maye > Daniels > Hurts > Burrow > Dak > Herbert. Allen/Lamar in R7 = Allen. Nix = R11–R13.',
    names: ['Drake Maye', 'Jayden Daniels', 'Jalen Hurts', 'Joe Burrow', 'Dak Prescott', 'Justin Herbert'],
  },
  {
    step: 5,
    headline: 'DST 13',
    test: 'DST 13: HOU > DEN > LAR > SEA.',
    names: ['Houston', 'Denver', 'LAR', 'SEA'],
  },
  {
    step: 6,
    headline: 'K 15',
    test: 'K 15: Fairbairn / Myers / Little / Bates / Shrader. Not Aubrey.',
    names: ['Ka\'imi Fairbairn', 'Jason Myers', 'Cam Little', 'Jake Bates', 'Spencer Shrader'],
  },
] as const

export const R1_BY_SLOT = {
  early: '1–3  Gibbs (Bijan) (Chase at 3)',
  mid: '4–5  Puka then Brown in R2 · 6–7  CMC (Taylor ESPN 5)',
  late: '8  Cook then Barkley at 13 · 9–10  Cook/Achane on the turn. Not Lamb then a prayer.',
} as const

export const DO_NOT = [
  'Two Broncos skill',
  'Gibbs + ARSB',
  'Bijan + London',
  'Puka + Kyren',
  'Lloyd + Watson + Kraft GB core',
  'Lamb + Pickens as WR1 + WR2',
] as const

export const STACK_TRAPS: { ids: string[]; label: string }[] = [
  { ids: ['jahmyr-gibbs', 'amon-ra-st-brown'], label: 'Gibbs + ARSB' },
  { ids: ['bijan-robinson', 'drake-london'], label: 'Bijan + London' },
  { ids: ['puka-nacua', 'kyren-williams'], label: 'Puka + Kyren' },
  { ids: ['ceedee-lamb', 'george-pickens'], label: 'Lamb + Pickens as WR1+WR2' },
]

export const GB_CORE = ['marshawn-lloyd', 'christian-watson', 'tucker-kraft']
export const BRONCO_SKILL = ['jaylen-waddle', 'rj-harvey', 'jk-dobbins']
