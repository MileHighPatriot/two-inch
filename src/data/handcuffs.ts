import type { Handcuff } from '../types'

export const handcuffs: Handcuff[] = [
  { starterId: 'kyren-williams', starter: 'Kyren Williams', cuff: 'Blake Corum', when: 'R12–R14' },
  { starterId: 'breece-hall', starter: 'Breece Hall', cuff: 'Braelon Allen', when: 'Only if you have Hall' },
  { starterId: 'bijan-robinson', starter: 'Bijan Robinson', cuff: 'Brian Robinson Jr.', when: 'Late only' },
  { starterId: 'christian-mccaffrey', starter: 'CMC', cuff: 'Nobody trustworthy (Guerendo PUP)', when: 'Skip' },
  { starterId: 'marshawn-lloyd', starter: 'MarShawn Lloyd (Jacobs Exempt)', cuff: 'Kaleb Johnson / Brooks', when: 'R14–R16 dart, not mid' },
  { starterId: 'rj-harvey', starter: 'Harvey or Dobbins', cuff: 'Jonah Coleman', when: 'R16 only · Ember: on 53' },
  { starterId: 'jk-dobbins', starter: 'Harvey or Dobbins', cuff: 'Jonah Coleman', when: 'R16 only · Ember: on 53' },
  { starterId: 'jeremiyah-love', starter: 'Love (if someone else takes him)', cuff: 'Tyler Allgeier', when: 'Late contingency' },
  { starterId: 'ashton-jeanty', starter: 'Jeanty (if someone else takes him)', cuff: 'Mike Washington Jr.', when: 'Late dart if Jeanty sits W1' },
  { starterId: 'jadarian-price', starter: 'Jadarian Price', cuff: 'Charbonnet (PUP/ACL)', when: 'IR stash only if you own Price' },
]

export const irReal = [
  { name: 'George Kittle', when: 'If drafted R9–R11 and sits W1 (Australia trip; trending)' },
  { name: 'Alvin Kamara', when: 'Only if undrafted; MCL; still out; Etienne is the back' },
  { name: 'Charbonnet', when: 'Only if you drafted Price' },
]

export const irDead = [
  'Josh Jacobs — Exempt is NOT IR. Dead roster spot. Court Sep 10 ≠ lift.',
  'James Conner IR',
  'Tank Dell IR',
  'Jayden Higgins ACL',
  'Ricky Pearsall',
  'Calvin Austin',
  'Guerendo PUP',
  'Jordyn Tyson (~2 mo / IR)',
]

export const broncoRule =
  'Pick one: Waddle OR Harvey (PPR) OR Dobbins — not two. Not Waddle+Harvey+Nix. Ember Sep 2–3 + PUBLIC Wed. Team off until next week. Cooper Exempt = OLB, ignore for skill. Mims side field — not a 10-team draft.'
