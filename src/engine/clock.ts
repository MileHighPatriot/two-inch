import type { Advice } from '../types'

export type ClockState = {
  round: number
  rbCount: number
  hasTe: boolean
  hasQb: boolean
  hasDst: boolean
  hasK: boolean
}

export function onTheClock(state: ClockState): Advice {
  const { round, rbCount, hasTe, hasQb, hasDst, hasK } = state

  if (rbCount < 2 && round >= 1 && round <= 5) {
    return {
      step: 1,
      headline: 'Take the RB',
      names: [],
      why: `You have ${rbCount} RB and it is R${round}. Robust-RB: two in the first five.`,
    }
  }

  if (round <= 6 || (round < 7 && !hasTe)) {
    return {
      step: 2,
      headline: 'Healthy WR',
      names: [],
      why: 'RB pair is on track (or it is still early). Take a healthy WR. Not a Nabers/Egbuka reach.',
    }
  }

  if (round >= 7 && !hasTe) {
    return {
      step: 3,
      headline: 'TE 7+',
      names: ['Tucker Kraft', 'Harold Fannin', 'Sam LaPorta', 'Kyle Pitts', 'George Kittle'],
      why: 'No TE premium. Wait is over. Kraft first.',
    }
  }

  if (round === 7 && !hasQb) {
    return {
      step: 4,
      headline: 'Allen/Lamar only if they fell',
      names: ['Josh Allen', 'Lamar Jackson'],
      why: 'R7 exception: Allen/Lamar still there = Allen. Otherwise keep waiting for Maye+.',
    }
  }

  if (round >= 8 && round <= 12 && !hasQb) {
    return {
      step: 4,
      headline: 'QB 8+',
      names: ['Drake Maye', 'Jayden Daniels', 'Jalen Hurts', 'Joe Burrow', 'Dak Prescott', 'Justin Herbert'],
      why: 'One QB. Nix is R11–R13. Never Allen R2.',
    }
  }

  if (round >= 13 && !hasDst) {
    return {
      step: 5,
      headline: 'DST 13',
      names: ['Houston', 'Denver', 'LAR', 'SEA'],
      why: 'Only if HOU/DEN/LAR/SEA. Let rooms take DST in R8.',
    }
  }

  if (round >= 15 && !hasK) {
    return {
      step: 6,
      headline: 'K 15',
      names: ['Ka\'imi Fairbairn', 'Jason Myers', 'Cam Little', 'Jake Bates', 'Spencer Shrader'],
      why: 'Not Aubrey. Not Dicker.',
    }
  }

  return {
    step: 2,
    headline: 'Best available on HIS board',
    names: [],
    why: 'Need is covered. Smash if it is there (Lloyd R9–R10, Godwin, Watson). Do not chase mid.',
  }
}
