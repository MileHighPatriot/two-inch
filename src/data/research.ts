/** Expert notes stamped Sep 6, 2026. Maren still owns the call for this 10-team PPR room. */

export const researchStamp =
  'Researched Sunday Sep 6, 2026. Sources: Maren board (DraftBuddy ESPN ADP Sep 6), NFL.com, CBS (Eisenberg Sep 4; Cummings Sep 1), FantasyPros sleeper consensus, 4for4 ESPN-sleeper piece (Aug 27), NBC/Rapoport Egbuka notes, RotoWire Hall (Sep 3), For The Win injury roundup (Sep 5).'

export const injuryDesk = [
  {
    name: 'Josh Jacobs, GB',
    status: 'Cross off',
    body: 'The NFL put him on the Commissioner’s Exempt List on Aug 30. He cannot practice or play until Roger Goodell removes him. Court was moved up to Sep 10; that date is not a lift. CBS and DraftSharks both say draft him as if he may miss a long stretch or the year. Exempt is not IR. MarShawn Lloyd is the back. Kaleb Johnson was traded in the same day for a reason.',
  },
  {
    name: 'Jeremiyah Love, ARI',
    status: 'Fade at ESPN 25',
    body: 'High-ankle sprain from the Aug 7 preseason game. Garafolo had him ~50/50 for Week 1. CBS still had “progressing” with no weekend practice. Pro Football Doc (Aug 31) was more worried about Love than Jeanty and voted no on Week 1. Allgeier is the late contingency if someone else takes Love.',
  },
  {
    name: 'Ashton Jeanty, LV',
    status: 'Soften — still no Round 2',
    body: 'Low-ankle sprain (Rapoport: more low than high). Kubiak has been optimistic for Week 1. For The Win (Sep 5) and Fantasy Points still give him a Week 1 chance. Maren’s Sep 6 lock stands: no verified team practice after the Wednesday DNP, so ESPN 20 is too rich. Washington Jr. is the dart if someone else takes him.',
  },
  {
    name: 'Emeka Egbuka, TB',
    status: 'Soften the fade, do not lock WR2',
    body: 'Toe sprain. NBC: DNP Tuesday Sep 1, side field Wednesday. Todd Bowles’s word was “hopefully” for Week 1. Rapoport via DraftSharks (Sep 5): expected back at practice next week, Week 1 still reachable. Godwin stays a smash until Egbuka is actually with the full team.',
  },
  {
    name: 'Breece Hall, NYJ',
    status: 'RB2, not a fake RB1',
    body: 'Groin strain from Aug 17. RotoWire Sep 3: expected ready Week 1 vs Tennessee, originally a 2–3 week timetable. Braelon Allen looked good in his absence. Take Hall as a round 3–4 RB2. Draft Allen only if you have Hall.',
  },
  {
    name: 'Alvin Kamara, NO',
    status: 'Out',
    body: 'MCL, still sidelined, roughly a month. Etienne is the three-down Saints back. Kamara is an IR stash only if he goes undrafted.',
  },
  {
    name: 'George Kittle, SF',
    status: 'Wait at TE, arrow up for Week 1',
    body: 'Coming back from Achilles. For The Win (Sep 5): he made the Australia trip for Week 1 vs the Rams. Maren: trending Week 1 does not change the TE wait. Fine in rounds 9–11. Real IR stash if he sits Week 1.',
  },
  {
    name: 'TreVeyon Henderson, NE',
    status: 'Questionable Week 1',
    body: 'CBS Eisenberg (Sep 4): ankle, questionable for Week 1. That is why Rhamondre (ADP ~72 in some rooms) moved ahead of him. Do not spend an early pick on Henderson hoping the ankle is fine.',
  },
  {
    name: 'Zach Charbonnet, SEA',
    status: 'PUP / ACL',
    body: 'Tore the ACL in the playoffs. PUP, misses at least the first four games. IR stash only if you drafted Jadarian Price.',
  },
  {
    name: 'Malik Nabers, NYG',
    status: 'Do not lock as WR2',
    body: 'Still noncommittal for Week 1 on Maren’s Sep 6 board. Prefer a healthy receiver in the same range. Take only on a slide after two running backs.',
  },
]

export const positionPrimers = [
  {
    pos: 'Running back',
    body: 'You start two and a FLEX. In a 10-team PPR room the FLEX is often a third running back you drafted tonight. The three-down list is short: Gibbs, Bijan, Taylor, CMC, Cook, Achane, Chase Brown. After about twelve names you are in committees. Reverse-standings waivers mean first place picks last — you cannot buy a back in October if you are winning. That is why two in the first five is locked.',
  },
  {
    pos: 'Wide receiver',
    body: 'Full PPR, and depth lasts. Nico, Waddle, Watson, Evans, and Godwin are all startable. You do not need rounds 2 and 3 on receivers to have a WR2. After the running-back pair, load healthy PPR receivers. Skip Nabers/Egbuka reaches. One Bronco skill max (Waddle is the PPR Bronco WR).',
  },
  {
    pos: 'Quarterback',
    body: 'One QB, 4-point passing touchdowns, ten teams. Josh Allen at ESPN 17 is a wasted second round in this scoring. CBS Eisenberg (Sep 4) said the earliest he would take Allen in 1QB is the end of round 3 — and even that is early for this room. Wait until round 8+: Maye, Daniels, Hurts, Burrow, then Dak, then Herbert. Allen/Lamar in round 7 = Allen. Nix is rounds 11–13.',
  },
  {
    pos: 'Tight end',
    body: 'No premium. Bowers and McBride are going in round 2 in ESPN rooms. Let them. Kraft is the wait target with Jacobs out and Green Bay throwing a bit more. Then Fannin, LaPorta, Pitts, Kittle. Stream Kelce/Goedert/Engram only if you still have no TE in the teens.',
  },
  {
    pos: 'Defense and kicker',
    body: 'Houston, Denver, Rams, Seattle — and only in round 13+. Kickers in round 15: Fairbairn, Myers, Little, Bates, Shrader. Aubrey at ESPN 75 and Dicker in the 100s are the room lighting picks on fire.',
  },
]

export type SleeperTier = 'board' | 'middle' | 'dart'

export type SleeperCard = {
  name: string
  pos: string
  team: string
  espnAdp: number | null
  window: string
  tier: SleeperTier
  why: string
  source: string
  howToDraft: string
}

export const sleeperCards: SleeperCard[] = [
  {
    name: 'Chase Brown',
    pos: 'RB',
    team: 'CIN',
    espnAdp: 15,
    window: 'Round 2',
    tier: 'board',
    why: 'Undisputed Bengals lead back. If Henry or London go in front of him, he slides into your Robust-RB pick. Sleeper ADP has been later than ESPN in some rooms (gap of ~16 picks on DraftWaiver’s Sep board), which is why he can fall in mixed-platform drafts. In this ESPN room he is a smash if he makes it to you in round 2.',
    source: 'Maren Sep 6 board; DraftWaiver Sleeper-vs-ESPN gap',
    howToDraft: 'Take him as RB2. That is the pick, not a “sleeper stash.”',
  },
  {
    name: 'Travis Etienne',
    pos: 'RB',
    team: 'NO',
    espnAdp: 36,
    window: 'Rounds 3–4',
    tier: 'board',
    why: 'Kamara is still out with an MCL. Fantasy Points bumped Etienne for early-season work. In 10-team PPR he is a three-down back you can start, not a handcuff. ESPN 36 is a gift if the room is still treating him as Kamara’s backup.',
    source: 'Maren Sep 6; Fantasy Points injury tracker Sep 1',
    howToDraft: 'Take at ADP. He is your Saints back until Kamara is actually back.',
  },
  {
    name: 'Christian Watson',
    pos: 'WR',
    team: 'GB',
    espnAdp: 81,
    window: 'Rounds 6–8',
    tier: 'board',
    why: 'Green Bay’s WR1 at a WR3 price. Jacobs is out, which tilts the offense a touch toward the pass (DraftSharks made the same point). People still fade Watson on injury history. In PPR that is how WR1s fall into the 70s and 80s.',
    source: 'Maren Sep 6; DraftSharks Jacobs fallout',
    howToDraft: 'Smash in the wait window. Do not also stack Lloyd and Kraft as a Packers core.',
  },
  {
    name: 'MarShawn Lloyd',
    pos: 'RB',
    team: 'GB',
    espnAdp: 104,
    window: 'Rounds 9–10',
    tier: 'board',
    why: 'Jacobs cannot play. Lloyd is the expected lead in a committee with Johnson/Brooks. FantasyPros consensus had him as a massive rank-vs-ADP outlier. CBS Eisenberg (Sep 4) said no running back’s ADP has risen like Lloyd’s, and he loves him as a high-end FLEX. ESPN climbed 112→104. Rooms are waking up.',
    source: 'Maren Sep 6; CBS Eisenberg Sep 4; FantasyPros sleepers',
    howToDraft: 'Take if he falls to 9–10. Do not chase in round 6. If you own him, Kaleb Johnson is a late dart, not a mid-round pick.',
  },
  {
    name: 'Chris Godwin',
    pos: 'WR',
    team: 'TB',
    espnAdp: 115,
    window: 'Rounds 8–12',
    tier: 'board',
    why: 'Egbuka is not with the full team today. Godwin is still the PPR machine on that offense. ESPN 115 is starter price for a veteran who catches everything. Hold the smash until Egbuka is actually practicing.',
    source: 'Maren Sep 6; Rapoport/DraftSharks Egbuka note',
    howToDraft: 'Take in the late-middle. He can be your WR3/FLEX immediately.',
  },
  {
    name: 'RJ Harvey',
    pos: 'RB',
    team: 'DEN',
    espnAdp: 121,
    window: 'Rounds 8–10',
    tier: 'board',
    why: 'Ember: clean, back since Aug 31. Maren wants him over Dobbins in PPR as the passing-down Bronco. CBS Eisenberg (Sep 4) disagrees on price: he prefers Dobbins at ~87 and sees Harvey as a PPR FLEX around 97. In this league Maren’s call wins: one Bronco skill. If you already have Waddle, skip Harvey.',
    source: 'Maren/Ember Sep 6; CBS Eisenberg Sep 4 (disagrees on Dobbins vs Harvey)',
    howToDraft: 'Harvey only if no Waddle and no Dobbins. Jonah Coleman is the R16 cuff.',
  },
  {
    name: 'Mike Evans',
    pos: 'WR',
    team: 'SF',
    espnAdp: 74,
    window: 'Rounds 8–9',
    tier: 'middle',
    why: 'San Francisco red-zone work next to CMC. Early script takes him around 74–79, Watson if Evans is gone. He is not a secret; he is a PPR/TD scorer going cheaper than a WR2 should in some rooms because of age and the 49ers committee at WR.',
    source: 'Maren Sep 6 board',
    howToDraft: 'Take in the dead zone instead of Aubrey or Houston DST.',
  },
  {
    name: 'Quentin Johnston',
    pos: 'WR',
    team: 'LAC',
    espnAdp: 126,
    window: 'Rounds 10–14',
    tier: 'middle',
    why: 'When healthy he is the Chargers’ WR1 and ESPN still has him in the 120s. Maren listed him as going too late. That is a late FLEX, not a WR2 you reach for in round 6.',
    source: 'Maren Sep 6 ADP-vs-settings',
    howToDraft: 'Fine as a dart after the RB room is built.',
  },
  {
    name: 'Josh Downs',
    pos: 'WR',
    team: 'IND',
    espnAdp: 131,
    window: 'Rounds 10–14',
    tier: 'middle',
    why: 'Heath Cummings (CBS, Sep 1) has been on Downs all summer and still had him around the round 10–11 turn. Slot PPR target. In 10-team he is a bench lottery, not a starter you count on Week 1. Take him if the board is dry of Godwin/Johnston/Lloyd.',
    source: 'Heath Cummings sleepers 3.0, Sep 1',
    howToDraft: 'Only after your starters. Do not take him over Godwin.',
  },
  {
    name: 'Tucker Kraft',
    pos: 'TE',
    team: 'GB',
    espnAdp: 84,
    window: 'Rounds 8–11',
    tier: 'middle',
    why: 'No TE premium, so you wait. Kraft is the first name in Maren’s wait order because Jacobs is out and Green Bay should throw a bit more. That is how you get a TE1 without spending round 2 on McBride.',
    source: 'Maren Sep 6 TE wait; DraftSharks pass-tilt note',
    howToDraft: 'TE 7+. Kraft over Fannin/LaPorta/Pitts/Kittle.',
  },
  {
    name: 'Jonathon Brooks',
    pos: 'RB',
    team: 'CAR',
    espnAdp: 97,
    window: 'Rounds 11–14',
    tier: 'dart',
    why: '4for4 (Aug 27) had him as an ESPN sleeper outside the top 100: healthy after two ACL years, Hubbard’s hamstring opened early work, internally they preferred Brooks in PPR. FantasyPros consensus also flags him vs ADP. Risk is real after the knees. In 10-team he is a bench stash, not a Robust-RB brick.',
    source: '4for4 ESPN sleepers Aug 27; FantasyPros consensus',
    howToDraft: 'Late only. Hubbard/Brooks is a committee. Do not spend mid-round capital.',
  },
  {
    name: 'Jonah Coleman',
    pos: 'RB',
    team: 'DEN',
    espnAdp: null,
    window: 'Round 16',
    tier: 'dart',
    why: 'CBS Eisenberg (Sep 4) listed him as a Week 1 waiver/dart at ~44% rostered. Ember: on the 53. He is the cuff if you drafted Harvey or Dobbins, not a third Bronco skill player on the active roster.',
    source: 'CBS Eisenberg Sep 4; Ember Sep 2–3',
    howToDraft: 'R16 only if you own a Bronco RB.',
  },
  {
    name: 'Kaleb Johnson',
    pos: 'RB',
    team: 'GB',
    espnAdp: null,
    window: 'Rounds 14–16',
    tier: 'dart',
    why: 'Packers traded for him the same day Jacobs went Exempt (NFL.com / Athletic, Aug 30). He is in the Lloyd committee, not the lead. Maren: dart, not mid. If you own Lloyd, one of Johnson or Chris Brooks is enough.',
    source: 'NFL.com / Athletic Jacobs exempt, Aug 30; Maren handcuff map',
    howToDraft: 'Only behind Lloyd. Do not draft Jacobs and Johnson as a “stack.”',
  },
  {
    name: 'Mike Washington Jr.',
    pos: 'RB',
    team: 'LV',
    espnAdp: 165,
    window: 'Rounds 14–16',
    tier: 'dart',
    why: 'Jeanty’s top fill-in if the ankle sits Week 1. Roto Street and Maren both treat him as a contingency dart, not a lead you draft at Jeanty’s price.',
    source: 'Maren Sep 6; Roto Street deep sleepers Sep 1',
    howToDraft: 'Only if someone else took Jeanty, or as a last-round lottery.',
  },
  {
    name: 'Tyler Allgeier',
    pos: 'RB',
    team: 'ATL',
    espnAdp: 164,
    window: 'Rounds 14–16',
    tier: 'dart',
    why: 'Love is a maybe. If the room takes Love in round 2–3, Allgeier is the Cardinals/Falcons-style committee bet — and a Week 14 bye landmine if you also have a Cowboy.',
    source: 'Maren Sep 6 Love contingency',
    howToDraft: 'Late only, and only if Love went early to someone else.',
  },
]

export const sleeperHowTo = [
  'In a 10-team league a “sleeper” is not a seventh-round dart you will never start. It is a player ESPN is late on, who can be in your lineup in September.',
  'Board sleepers (Brown, Etienne, Watson, Lloyd, Godwin, Harvey) are the ones that win this draft. Take them in the window on the card. Do not wait so long they are gone, and do not chase them two rounds early.',
  'Middle sleepers (Evans, Johnston, Downs, Kraft) fill FLEX/TE after the running-back pair. Last-round darts (Coleman, Johnson, Washington, Allgeier, Brooks) are only for the bench after starters are done.',
  'Experts in 12-team articles will push names like Makai Lemon, Carson Beck, or Ja’Kobi Lane. Those are not 10-team draft picks. Let them go to waivers.',
]

export const expertSplits = [
  {
    title: 'Harvey vs Dobbins',
    body: 'Maren + Ember: Harvey is the PPR Bronco, Dobbins is early-down, take one. CBS Eisenberg Sep 4: he prefers Dobbins at the cheaper listed-lead price and has Harvey lower. For this full-PPR room, stay on Harvey unless Waddle is already yours — then take neither Bronco RB.',
  },
  {
    title: 'Josh Allen in 1QB',
    body: 'ESPN ADP 17 will get him taken in round 2 here. Eisenberg said end of round 3 is the earliest in 1QB, and superflex is a different game. Maren is stricter because passing TDs are 4 points. Let the room take him. Steal Maye/Daniels/Hurts/Burrow in 8–10.',
  },
  {
    title: 'Jeanty’s ankle',
    body: 'Medical writers (FantasyPros Aug 26; Pro Football Doc Aug 31; Fantasy Points Sep 1) are more optimistic than a round-2 price. Maren’s rule is simpler and better for tonight: no verified team practice, no round 2. If he practices this week after you draft, you did not miss him at 20. You missed a coin flip.',
  },
]

export const planNotes = [
  'Skeleton for every slot: two running backs by the end of round 5. If rounds 1 and 2 are both RB, rounds 3–5 are receivers. If round 1 is a receiver, round 2 is a running back and round 4 is the second back.',
  'Then take PPR receivers. Tight end at 7 or later. Quarterback at 8 or later. Defense at 13. Kicker at 15.',
  'Cross off before the clock starts: Jacobs, Love in rounds 2–3, Jeanty in round 2, Kamara, Conner, Hunter, Aubrey, Dell, Jayden Higgins, Tyson, Hyatt, Mims.',
  'The late-slot dead zone around ESPN 75–89 is where Kraft, Evans, Watson, Aubrey, and Houston DST all die. Take Kraft or the receiver. Not the kicker. Not the defense.',
]
