import type { Player, Pos, Tag } from '../types'
import { BYE_BY_TEAM } from './byes'

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function p(
  name: string,
  pos: Pos,
  team: string,
  espnAdp: number | null,
  tier: number | null,
  window: string,
  tags: Tag[],
  note: string,
): Player {
  return {
    id: slug(name),
    name,
    pos,
    team,
    espnAdp,
    tier,
    window,
    tags,
    bye: BYE_BY_TEAM[team] ?? null,
    note,
  }
}

export const players: Player[] = [
  // QB
  p('Josh Allen', 'QB', 'BUF', 17, 1, 'R7–R9, not R2', ['red'], 'Too early in 4-pt 1QB 10-team. Let them. Exception: still there in R7 — take Allen.'),
  p('Lamar Jackson', 'QB', 'BAL', 30, 1, 'R7–R9, not R2', ['red'], 'Still early. Allen/Lamar in R7 = Allen.'),
  p('Drake Maye', 'QB', 'NE', 44, 2, 'R8–R10', ['smash'], 'First QB off the wait window. Target R8+.'),
  p('Jayden Daniels', 'QB', 'WAS', 50, 2, 'R8–R10', [], 'Wait 8+. After Maye.'),
  p('Joe Burrow', 'QB', 'CIN', 51, 2, 'R8–R10', [], 'Wait 8+. Week 6 cluster with Chase/Brown/Higgins.'),
  p('Jalen Hurts', 'QB', 'PHI', 52, 2, 'R8–R10', [], 'Wait 8+.'),
  p('Dak Prescott', 'QB', 'DAL', 63, 3, 'R10–R12', [], 'Week 14 bye — one Cowboy starter max.'),
  p('Jaxson Dart', 'QB', 'NYG', 73, 3, 'R10–R12', [], 'Streamer-tier price if the wait group is gone.'),
  p('Justin Herbert', 'QB', 'LAC', 77, 3, 'R10–R12', [], 'Backup to Dak in the wait window.'),
  p('Bo Nix', 'QB', 'DEN', 96, 3, 'R11–R13', ['bronco'], 'Ember: on 53, starter, clean. R11–R13. Not a third Bronco skill with Waddle+Harvey.'),
  p('Trevor Lawrence', 'QB', 'JAX', 92, 3, 'R10–R12', [], ''),
  p('Caleb Williams', 'QB', 'CHI', 80, 4, 'Streamer', [], ''),
  p('Matthew Stafford', 'QB', 'LAR', 86, 4, 'Streamer', [], ''),
  p('Patrick Mahomes', 'QB', 'KC', 100, 4, 'Streamer', [], ''),
  p('Brock Purdy', 'QB', 'SF', 101, 4, 'Streamer', [], ''),

  // RB Tier 1–2
  p('Jahmyr Gibbs', 'RB', 'DET', 1, 1, 'R1', ['smash'], 'TAKE at 1.01. Bell-cow. PPR one over Bijan. Do not stack ARSB as core.'),
  p('Bijan Robinson', 'RB', 'ATL', 2, 1, 'R1', [], 'TAKE if Gibbs gone. Do not stack London as core. B-Rob handcuff late only.'),
  p('Jonathan Taylor', 'RB', 'IND', 5, 2, 'R1', [], 'Workhorse. CMC edges him in PPR if both sit mid.'),
  p('Christian McCaffrey', 'RB', 'SF', 7, 2, 'R1', ['smash'], 'TAKE in PPR R1. Guerendo still PUP. W1 Australia Thu Sep 10. No trustworthy handcuff.'),
  p('James Cook', 'RB', 'BUF', 9, 2, 'R1', ['smash'], 'Late-slot R1 Robust-RB brick. Cook over Lamb at 8.'),
  p('De\'Von Achane', 'RB', 'MIA', 11, 2, 'R1–R2', ['smash'], 'PPR pitch. Cook/Achane on the late turn. Week 6 cluster.'),
  p('Chase Brown', 'RB', 'CIN', 15, 2, 'R1–R2', ['smash'], 'Indisputable lead. TAKE R2. ESPN steal if he slides.'),

  // RB Tier 3
  p('Saquon Barkley', 'RB', 'PHI', 13, 3, 'R2–R3', [], 'TAKE leftover R2. Volume. Late slot: Barkley at 13 after Cook.'),
  p('Derrick Henry', 'RB', 'BAL', 14, 3, 'R2–R3', [], 'Behind Brown in full PPR. R2–R3 if Brown gone. Hill is 3D.'),
  p('Omarion Hampton', 'RB', 'LAC', 16, 3, 'R2–R3', [], 'Undisputed RB1 under McDaniel. Climbed ADP; still a lead back.'),
  p('Ashton Jeanty', 'RB', 'LV', 20, 3, 'R3+ not R2', ['red', 'soften'], 'Kubiak optimistic W1. Did not practice Wed. No weekend team practice. Still no R2. Washington Jr. dart if someone else takes him.'),
  p('Kenneth Walker III', 'RB', 'KC', 23, 3, 'R2–R3', [], 'Reid Aug 26 “fine.” No new Sep note. Ankle noise until new designation.'),
  p('Jeremiyah Love', 'RB', 'ARI', 25, 3, 'Do not R2–R3', ['red', 'cross-off'], 'FADE HARDER. ~50/50 W1. Still only progressing, no weekend practice. ESPN 25 is R2–R3 for a maybe. Allgeier = late contingency.'),

  // RB Tier 4
  p('Javonte Williams', 'RB', 'DAL', 29, 4, 'R3–R4', [], 'TAKE RB2 R3–R4. Week 14 bye = one Cowboy starter max.'),
  p('Kyren Williams', 'RB', 'LAR', 31, 4, 'R3–R4', [], 'TAKE RB2. Draft Corum (120) if you have Kyren. Week 11 with Puka — don\'t stack both as core.'),
  p('Breece Hall', 'RB', 'NYJ', 33, 4, 'R3–R4', ['soften'], 'Expected W1. Soften. TAKE RB2 R3–R4, not quasi-RB1. Allen only if you have Hall.'),
  p('Travis Etienne', 'RB', 'NO', 36, 4, 'R3–R4', ['smash', 'buy'], 'Kamara still sidelined. TAKE at ESPN 36. Three-down Saints back.'),

  // RB Tier 5
  p('Cam Skattebo', 'RB', 'NYG', 41, 5, 'R5–R7', [], ''),
  p('Quinshon Judkins', 'RB', 'CLE', 45, 5, 'R5–R7', [], 'Week 11 nuke group.'),
  p('D\'Andre Swift', 'RB', 'CHI', 47, 5, 'R5–R7', [], ''),
  p('Bucky Irving', 'RB', 'TB', 53, 5, 'R5–R7', [], 'Late script: Irving is RB2 if the turn failed and you have one RB.'),
  p('Bhayshul Tuten', 'RB', 'JAX', 56, 5, 'R5–R7', [], ''),
  p('Jadarian Price', 'RB', 'SEA', 60, 5, 'R5–R7', [], 'Week 11. Charbonnet IR stash only if you own Price.'),
  p('TreVeyon Henderson', 'RB', 'NE', 67, 5, 'R5–R7', [], ''),

  // RB Tier 6–7
  p('Rhamondre Stevenson', 'RB', 'NE', 68, 6, 'R8–R10', [], ''),
  p('Josh Jacobs', 'RB', 'GB', 72, 7, 'CROSS OFF', ['red', 'cross-off', 'ir-dead'], 'Still Commissioner\'s Exempt. Court Thu Sep 10 ≠ lift. ADP 64→72. Dead seat. Lloyd is the name. Exempt is NOT IR.'),
  p('Jaylen Warren', 'RB', 'PIT', 78, 6, 'R8–R10', [], 'Over Rico Dowdle. One only from each committee.'),
  p('Tony Pollard', 'RB', 'TEN', 79, 6, 'R8–R10', [], ''),
  p('Rico Dowdle', 'RB', 'CAR', 88, 6, 'R8–R10', [], 'Warren over Dowdle.'),
  p('Jonathon Brooks', 'RB', 'GB', 97, 7, 'R9–R12', ['handcuff'], 'Lloyd committee. Early script backup at R11.'),
  p('Chuba Hubbard', 'RB', 'CAR', 99, 7, 'R9–R12', [], ''),
  p('J.K. Dobbins', 'RB', 'DEN', 102, 6, 'R8–R10', ['bronco'], 'Listed lead. Ember: clean. Early-down. Prefer Harvey in PPR. Do not draft both. One Bronco skill.'),
  p('MarShawn Lloyd', 'RB', 'GB', 104, 7, 'R9–R10 smash', ['smash'], 'Expected lead while Jacobs Exempt. ADP 112→104. Smash if R9–R10. Do not chase mid. Do not pair with Watson+Kraft as GB core.'),
  p('Blake Corum', 'RB', 'LAR', 120, 7, 'R9–R12', ['handcuff'], 'Draft if you have Kyren. R12–R14.'),
  p('RJ Harvey', 'RB', 'DEN', 121, 6, 'R8–R10', ['smash', 'bronco'], 'Ember: clean. PPR Bronco RB. Prefer over Dobbins. Skip if you took Waddle. One DEN RB.'),
  p('Tyler Allgeier', 'RB', 'ATL', 164, 7, 'R9–R12', ['handcuff'], 'Love contingency. Late only. Week 14 Cardinal/Falcon note is Love/Allgeier.'),
  p('Mike Washington Jr.', 'RB', 'LV', 165, 7, 'R9–R12', ['handcuff'], 'Jeanty contingency dart if Jeanty sits W1.'),
  p('Alvin Kamara', 'RB', 'NO', 162, 7, 'FADE', ['red', 'cross-off'], 'MCL ≥1 month. Still sidelined. IR only if free. Etienne is the back.'),
  p('James Conner', 'RB', 'ARI', null, null, 'IR', ['red', 'cross-off', 'ir-dead'], 'IR. Do not draft.'),
  p('Braelon Allen', 'RB', 'NYJ', null, null, 'Handcuff', ['handcuff'], 'Only if you have Hall.'),
  p('Brian Robinson Jr.', 'RB', 'ATL', null, null, 'Handcuff', ['handcuff'], 'Bijan cuff. Late only.'),
  p('Jonah Coleman', 'RB', 'DEN', null, null, 'R16', ['handcuff', 'bronco'], 'R16 only if you own Harvey or Dobbins. Ember: on 53. Not a third Bronco skill on the active.'),
  p('Kaleb Johnson', 'RB', 'GB', null, null, 'R14–R16', ['handcuff'], 'Lloyd dart, not mid.'),
  p('Zach Charbonnet', 'RB', 'SEA', null, null, 'IR stash', ['handcuff'], 'PUP/ACL. IR stash only if you own Price.'),
  p('Isaac Guerendo', 'RB', 'SF', null, null, 'PUP', ['ir-dead'], 'Still PUP. No CMC handcuff.'),

  // WR Tier 1–2
  p('Ja\'Marr Chase', 'WR', 'CIN', 3, 1, 'R1', ['smash'], 'TAKE at 3 over Puka if early. Week 6 cluster.'),
  p('Puka Nacua', 'WR', 'LAR', 4, 1, 'R1', [], 'Mid 4–5 if CMC/Taylor gone. Then R2 mandatory RB. Do not stack Kyren as core. Week 11.'),
  p('Jaxon Smith-Njigba', 'WR', 'SEA', 6, 1, 'R1', [], 'ESPN 6 behind Taylor (5). Week 11.'),
  p('Amon-Ra St. Brown', 'WR', 'DET', 8, 2, 'R1–R2', [], 'Do not stack Gibbs as core. Week 6 cluster. Pick 6–7 only if both backs gone.'),
  p('CeeDee Lamb', 'WR', 'DAL', 10, 2, 'R1–R2', ['red'], 'Do not take Lamb at 8 and hope. That is Hero-RB. Do not pair Pickens as WR1+WR2. Week 14 one Cowboy max.'),
  p('Justin Jefferson', 'WR', 'MIN', 12, 2, 'R1–R2', [], 'DraftBuddy CLE/LB is a data error — MIN. Late R2 Jefferson is the Hero-RB trap. Week 6 cluster.'),
  p('Drake London', 'WR', 'ATL', 18, 2, 'R1–R2', [], 'Do not stack Bijan as core. Week 11 nuke.'),

  // WR Tier 3–4
  p('A.J. Brown', 'WR', 'NE', 19, 3, 'R2–R3', [], 'NE. Early R3 backup to Nico.'),
  p('Nico Collins', 'WR', 'HOU', 24, 3, 'R2–R3', ['smash'], 'Early/mid R3 take. WR depth lasts here.'),
  p('George Pickens', 'WR', 'DAL', 26, 3, 'R2–R3', [], 'Do not pair Lamb as WR1+WR2. Week 14 one Cowboy max.'),
  p('Rashee Rice', 'WR', 'KC', 27, 3, 'R2–R3', [], ''),
  p('Chris Olave', 'WR', 'NO', 28, 3, 'R2–R3', [], 'Late R3 take.'),
  p('Malik Nabers', 'WR', 'NYG', 32, 3, 'R2–R3 slide only', ['red', 'soften'], 'Noncommittal W1. Prefer healthy. Take only on slide after two RBs.'),
  p('DeVonta Smith', 'WR', 'PHI', 34, 4, 'R3–R5', [], ''),
  p('Garrett Wilson', 'WR', 'NYJ', 35, 4, 'R3–R5', [], 'Late R4 take.'),
  p('Tetairoa McMillan', 'WR', 'CAR', 37, 4, 'R3–R5', [], ''),
  p('Zay Flowers', 'WR', 'BAL', 39, 4, 'R3–R5', [], ''),
  p('Ladd McConkey', 'WR', 'LAC', 42, 4, 'R3–R5', [], 'Prefer over Egbuka today.'),
  p('Tee Higgins', 'WR', 'CIN', 46, 4, 'R3–R5', ['smash'], 'Chase\'s mate in full PPR. Week 6 cluster.'),
  p('Jaylen Waddle', 'WR', 'DEN', 49, 4, 'R3–R5', ['bronco'], 'Ember: clean. The PPR Bronco WR. One Bronco skill. If Waddle, skip Harvey later.'),

  // WR Tier 5–7
  p('Emeka Egbuka', 'WR', 'TB', 40, 5, 'R5–R7', ['soften', 'red'], 'Rapoport: practice next week; W1 reachable. Still not full team today. Soften fade. Do not lock as WR2. Godwin path still open.'),
  p('Davante Adams', 'WR', 'LAR', 43, 5, 'R5–R7', [], 'Early R5 take.'),
  p('DJ Moore', 'WR', 'CHI', 54, 5, 'R5–R7', [], 'Waddle backup in mid script.'),
  p('Terry McLaurin', 'WR', 'WAS', 55, 5, 'R5–R7', [], ''),
  p('Jameson Williams', 'WR', 'DET', 58, 5, 'R5–R7', [], 'Week 6 cluster. Early R6 take.'),
  p('Rome Odunze', 'WR', 'CHI', 59, 5, 'R5–R7', [], ''),
  p('Luther Burden', 'WR', 'CHI', 66, 5, 'R5–R7', [], ''),
  p('Marvin Harrison Jr.', 'WR', 'ARI', 70, 6, 'R7–R10', [], 'Week 14.'),
  p('Courtland Sutton', 'WR', 'DEN', 71, 6, 'R7–R10', ['bronco'], 'Ember: clean. Third WR; FLEX only. Still a Bronco skill — one max as core.'),
  p('Mike Evans', 'WR', 'SF', 74, 6, 'R7–R10', ['smash'], 'SF red-zone next to CMC. Early R9. Week 11 with Puka/Kyren group.'),
  p('DK Metcalf', 'WR', 'PIT', 76, 6, 'R7–R10', [], ''),
  p('Christian Watson', 'WR', 'GB', 81, 5, 'R6–R8', ['smash'], 'GB WR1 at WR3 price. Jacobs out tilts pass. Smash R6–R8. Do not pair Lloyd+Kraft as GB core.'),
  p('Stefon Diggs', 'WR', 'NE', 93, 7, 'R10–R13', [], 'Lloyd backup in late R11.'),
  p('Alec Pierce', 'WR', 'IND', 98, 6, 'R10–R12', [], 'Mid R10 backup.'),
  p('Brian Thomas Jr.', 'WR', 'JAX', 109, 6, 'R7–R10', [], ''),
  p('Travis Hunter', 'WR', 'JAX', 112, 7, 'CROSS OFF', ['red', 'cross-off'], 'Two-way lottery. Skip.'),
  p('Chris Godwin', 'WR', 'TB', 115, 6, 'R8–R10', ['smash'], 'HOLD smash. Egbuka not full team yet. PPR machine. ESPN 115.'),
  p('Quentin Johnston', 'WR', 'LAC', 126, 7, 'R10–R13', ['smash'], 'LAC WR1 when healthy. Going too late.'),
  p('Josh Downs', 'WR', 'IND', 131, 7, 'R10–R13', [], ''),
  p('Jayden Reed', 'WR', 'GB', 137, 7, 'R10–R13', [], ''),
  p('Marvin Mims Jr.', 'WR', 'DEN', null, 7, 'CROSS OFF', ['red', 'cross-off', 'bronco'], 'Side field Wed after DNP Mon+Tue. No official tag. Not a 10-team draft.'),
  p('Jordyn Tyson', 'WR', 'ARI', null, null, 'IR', ['cross-off', 'ir-dead'], 'IR ~2 months. Do not draft.'),
  p('Tank Dell', 'WR', 'HOU', null, null, 'IR', ['cross-off', 'ir-dead'], 'IR. Cross off.'),
  p('Jayden Higgins', 'WR', 'HOU', null, null, 'ACL', ['cross-off', 'ir-dead'], 'ACL. Cross off.'),
  p('Ricky Pearsall', 'WR', 'SF', null, null, 'CROSS OFF', ['cross-off', 'ir-dead'], 'Do not draft.'),
  p('Calvin Austin', 'WR', 'PIT', null, null, 'IR', ['cross-off', 'ir-dead'], 'IR. Do not draft.'),
  p('Jalin Hyatt', 'WR', 'NYG', null, null, 'Cut', ['cross-off'], 'Cut. Cross off.'),

  // TE
  p('Trey McBride', 'TE', 'ARI', 21, 1, 'R3 only if dead; else wait', ['red'], 'Still too early for no-premium. Skip in R2.'),
  p('Brock Bowers', 'TE', 'LV', 22, 1, 'R3 only if WR dead', ['red'], 'Prefer Bowers if forced. Else wait. Week 13.'),
  p('Colston Loveland', 'TE', 'CHI', 38, 2, 'R5–R7', [], ''),
  p('Tyler Warren', 'TE', 'IND', 48, 2, 'R5–R7', [], 'Mid R5: not Warren TE.'),
  p('Kyle Pitts', 'TE', 'ATL', 61, 3, 'R8–R11', [], 'TE wait order after Kraft/Fannin/LaPorta. Week 11.'),
  p('Harold Fannin', 'TE', 'CLE', 62, 3, 'R8–R11', ['smash'], 'TE 7+: Kraft > Fannin > LaPorta > Pitts > Kittle. Week 11.'),
  p('George Kittle', 'TE', 'SF', 64, 3, 'R9–R11', ['soften'], 'Australia trip / trending W1. Arrow up. Does not change TE wait (still 7+). IR real if drafted and sits W1.'),
  p('Sam LaPorta', 'TE', 'DET', 65, 3, 'R8–R11', [], 'Week 6 cluster.'),
  p('Tucker Kraft', 'TE', 'GB', 84, 3, 'R8–R11', ['smash'], 'Smash TE wait target with Jacobs out / more pass. First name in the 7+ order. Do not pair Lloyd+Watson as GB core.'),
  p('Travis Kelce', 'TE', 'KC', 87, 4, 'R11–R14', [], 'Streamer price in late dead zone.'),
  p('Dallas Goedert', 'TE', 'PHI', 94, 4, 'R11–R14', [], ''),
  p('Jake Ferguson', 'TE', 'DAL', 103, 4, 'R11–R14', [], 'Week 14 one Cowboy max.'),
  p('Evan Engram', 'TE', 'DEN', null, 4, 'R13+', ['bronco'], 'Stream R13+. Only if no TE. Bronco — do not add if you already have skill.'),

  // DST
  p('Houston', 'DST', 'HOU', 85, 1, 'R12–R14', ['red'], 'First DST R12+ and only if HOU/DEN/LAR/SEA. Let rooms take DST in R8. ESPN 85 is too early.'),
  p('Denver', 'DST', 'DEN', 89, 1, 'R12–R14', ['bronco'], 'Backup to HOU. Late R9 DEN DST is a trap. Week 10.'),
  p('LAR', 'DST', 'LAR', 91, 1, 'R12–R14', [], 'Week 11.'),
  p('SEA', 'DST', 'SEA', 108, 1, 'R12–R14', [], 'Week 11.'),

  // K
  p('Brandon Aubrey', 'K', 'DAL', 75, 1, 'Do not R8', ['red', 'cross-off'], 'Wasted in R8. Never Aubrey at 75. Week 14.'),
  p('Cameron Dicker', 'K', 'LAC', 105, 1, 'Do not early', ['red'], 'Same as Aubrey. Take K in R15–R16.'),
  p('Ka\'imi Fairbairn', 'K', 'HOU', null, 1, 'R15–R16', ['smash'], 'First kicker. Not Aubrey.'),
  p('Jason Myers', 'K', 'SEA', null, 1, 'R15–R16', [], ''),
  p('Cam Little', 'K', 'JAX', null, 1, 'R15–R16', [], ''),
  p('Jake Bates', 'K', 'DET', null, 1, 'R15–R16', [], ''),
  p('Spencer Shrader', 'K', 'IND', null, 1, 'R15–R16', [], 'If IND.'),
]

export const RED_NAMES = players.filter((x) => x.tags.includes('red') || x.tags.includes('cross-off'))
export const SMASH_NAMES = players.filter((x) => x.tags.includes('smash'))

export function playerById(id: string): Player | undefined {
  return players.find((x) => x.id === id)
}

export function playerByName(name: string): Player | undefined {
  const s = slug(name)
  return players.find((x) => x.id === s || x.name.toLowerCase() === name.toLowerCase())
}
