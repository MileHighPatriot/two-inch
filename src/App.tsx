import { useMemo, useState } from 'react'
import {
  BYE_NOTES,
  broncoRule,
  clockCard,
  clockExplained,
  doNotExplained,
  expertSplits,
  fades,
  handcuffs,
  injuryDesk,
  irDead,
  irReal,
  landscape,
  league,
  leagueExplained,
  planNotes,
  playerById,
  players,
  positionPrimers,
  r1Explained,
  researchStamp,
  sleeperCards,
  sleeperHowTo,
  sleepers,
  tooEarly,
  tooLate,
  whyRobustRb,
} from './data'
import {
  HOT_BYES,
  anyMentionGone,
  bestByNeed,
  byesFromRoster,
  clockStateFromMine,
  draftMine,
  loadMine,
  loadPick,
  loadQueue,
  loadSlot,
  loadTaken,
  onTheClock,
  picksForSlot,
  primaryGone,
  rosterOf,
  savePick,
  saveSlot,
  scriptFor,
  searchPlayers,
  slotFromPick,
  toggleQueue,
  toggleTaken,
  waitAfter,
  warningsFor,
} from './engine'
import type { Player, Pos, Slot } from './types'

type Page = 'overview' | 'now' | 'plan' | 'players' | 'sleepers' | 'edges' | 'late' | 'card'

const PAGES: { id: Page; label: string }[] = [
  { id: 'overview', label: 'How this league works' },
  { id: 'now', label: 'On the clock' },
  { id: 'plan', label: 'Round plan' },
  { id: 'players', label: 'Player board' },
  { id: 'sleepers', label: 'Sleepers' },
  { id: 'edges', label: 'Take / avoid' },
  { id: 'late', label: 'Handcuffs and IR' },
  { id: 'card', label: 'Printable clock card' },
]

const POS: (Pos | 'ALL')[] = ['ALL', 'QB', 'RB', 'WR', 'TE', 'DST', 'K']

function BrandMark() {
  return (
    <svg className="brand-svg" viewBox="0 0 80 80" aria-hidden="true">
      <polygon
        points="40,4 74,16 74,50 40,76 6,50 6,16"
        fill="#0a2340"
        stroke="#fb4f14"
        strokeWidth="3"
      />
      <path d="M18 52 L40 20 L62 52 H51 L40 36 L29 52 Z" fill="#fb4f14" />
      <text
        x="40"
        y="66"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="9"
        fontFamily="Orbitron, sans-serif"
        letterSpacing="1.2"
      >
        AGNS
      </text>
    </svg>
  )
}

const TICKER =
  'ALL GUT NO SHAFT · BRONCOS COUNTRY · THE TWO-INCH INVITATIONAL · DRAFT DAY · ALL GUT NO SHAFT · '

function callFor(p: Player): { label: string; cls: string } {
  if (p.tags.includes('cross-off') || p.tags.includes('ir-dead')) {
    return { label: 'Do not draft', cls: 'call-avoid' }
  }
  if (p.tags.includes('red')) return { label: 'Do not take at ADP', cls: 'call-avoid' }
  if (p.tags.includes('smash') || p.tags.includes('buy')) {
    return { label: 'Take him if he is there', cls: 'call-take' }
  }
  if (p.tags.includes('handcuff')) return { label: 'Handcuff only', cls: 'call-cuff' }
  if (p.pos === 'QB' || p.pos === 'TE' || p.pos === 'DST' || p.pos === 'K') {
    return { label: 'Wait for the window', cls: 'call-wait' }
  }
  if (p.tags.includes('soften')) return { label: 'Be careful', cls: 'call-wait' }
  return { label: 'On the board', cls: 'call-wait' }
}

export default function App() {
  const [page, setPage] = useState<Page>('overview')
  const [pick, setPick] = useState<number | null>(() => loadPick())
  const [slot, setSlot] = useState<Slot | null>(() => loadSlot())
  const [taken, setTaken] = useState<Set<string>>(() => loadTaken())
  const [mine, setMine] = useState<Set<string>>(() => loadMine())
  const [queue, setQueue] = useState<string[]>(() => loadQueue())
  const [query, setQuery] = useState('')
  const [pos, setPos] = useState<Pos | 'ALL'>('ALL')
  const [hideTaken, setHideTaken] = useState(true)
  const [round, setRound] = useState(1)

  const advice = onTheClock(clockStateFromMine(mine, round))
  const warns = warningsFor(mine)
  const roster = rosterOf(mine)
  const script = slot ? scriptFor(slot) : null
  const board = useMemo(
    () => searchPlayers(players, query, { pos, hideTaken, taken }),
    [query, pos, hideTaken, taken],
  )
  const best = useMemo(() => bestByNeed(players, taken), [taken])
  const myByes = byesFromRoster(roster)
  const myPicks = pick ? picksForSlot(pick) : []
  const nextOverall = pick ? myPicks[round - 1] : null
  const wait = pick ? waitAfter(pick, round) : null
  const queued = queue.map((id) => playerById(id)).filter((p): p is Player => Boolean(p))

  function lockBand(next: Slot) {
    saveSlot(next)
    setSlot(next)
    setPage('plan')
  }

  function lockPick(n: number) {
    savePick(n)
    const band = slotFromPick(n)
    saveSlot(band)
    setPick(n)
    setSlot(band)
    setPage('plan')
  }

  function gone(id: string) {
    setTaken(toggleTaken(taken, id))
  }

  function minePick(id: string) {
    const next = draftMine(taken, mine, id)
    setTaken(next.taken)
    setMine(next.mine)
  }

  function star(id: string) {
    setQueue(toggleQueue(queue, id))
  }

  const pageLabel = PAGES.find((p) => p.id === page)?.label ?? ''

  return (
    <div className="app">
      <div className="atmosphere" aria-hidden="true">
        <div className="grid-floor" />
        <div className="scan" />
        <div className="vignette" />
      </div>
      <aside className="side">
        <div className="brand-lockup">
          <BrandMark />
          <div>
            <div className="brand">Draft day · Sep 6</div>
            <h1>{league.team}</h1>
          </div>
        </div>
        <div className="sub">
          {league.name}<br />
          {league.strategy} · 10-team PPR
          {pick ? <><br />You are pick {pick} ({slot})</> : null}
        </div>
        <nav>
          {PAGES.map((p) => (
            <button key={p.id} className={page === p.id ? 'on' : ''} onClick={() => setPage(p.id)}>
              {p.label}
            </button>
          ))}
        </nav>
        <div className="side-stamp">
          All Gut No Shaft
          <span>Broncos country</span>
        </div>
      </aside>

      <main className="main">
        <div className="hud-rail">
          <span>All Gut No Shaft</span>
          <span className="hud-dot" />
          <span className="dim">Broncos country</span>
          <span className="hud-dot" />
          <span>{league.name}</span>
        </div>
        <div className="page-eye">
          <span>All Gut No Shaft</span>
          <span className="eye-rule" />
          <span>{pageLabel}</span>
        </div>
        {page === 'overview' && (
          <>
            <h2>How this league works</h2>
            <p className="lead">
              Maren’s board is for this room, not a national article. Read this once before 2:30.
              When the slot drops at 1:30, lock your exact pick on Round plan.
            </p>
            <div className="card prose">
              <div className="kicker">The settings</div>
              {leagueExplained.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="card prose">
              <div className="kicker">Why Robust-RB — two running backs in the first five</div>
              {whyRobustRb.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="card">
              <div className="kicker">What changed this morning</div>
              <h3>{landscape.stamp}</h3>
              {landscape.movers.map((m) => <p key={m}>{m}</p>)}
            </div>
            <div className="grid-2">
              {r1Explained.map((r) => (
                <div className="card" key={r.slot}>
                  <div className="kicker">Round 1</div>
                  <h3>{r.slot}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
            {doNotExplained.map((d) => (
              <div className="card" key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
            <div className="card">
              <div className="kicker">Where experts disagree with each other</div>
              {expertSplits.map((s) => (
                <div className="edge" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
            <p className="kicker">{researchStamp}</p>
          </>
        )}

        {page === 'now' && (
          <>
            <div className="toolbar">
              <label>
                You are in round{' '}
                <input
                  type="number"
                  min={1}
                  max={16}
                  value={round}
                  onChange={(e) => setRound(Number(e.target.value) || 1)}
                />
              </label>
              {nextOverall != null && (
                <span>Overall pick {nextOverall}{wait != null ? ` · ${wait} picks until you are back` : ''}</span>
              )}
            </div>
            <div className="advice-box">
              <div className="kicker">What to do with this pick</div>
              <h2>{advice.headline}</h2>
              <p>{advice.why}</p>
              {advice.names.length > 0 && <p>Order: {advice.names.join(', then ')}.</p>}
              {warns.map((w) => <p key={w} className="warn">{w}</p>)}
            </div>
            <div className="grid-3">
              <div>
                <div className="card">
                  <div className="kicker">Best available (Gone already stripped)</div>
                  {best.map((row) => (
                    <div className="best-row" key={row.pos}>
                      <strong>{row.pos}</strong>
                      <span>{row.names.map((p) => p.name).join(' · ') || '—'}</span>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="kicker">Queue · max 5 · star them on the player board</div>
                  {queued.length === 0 ? (
                    <p>Nobody queued. Star names you will take if they are there.</p>
                  ) : (
                    queued.map((p) => (
                      <div className={`queue-item${taken.has(p.id) ? ' gone-line' : ''}`} key={p.id}>
                        <span>{p.name} · {p.pos}{taken.has(p.id) ? ' · GONE' : ''}</span>
                        <button className="ghost" onClick={() => star(p.id)}>Remove</button>
                      </div>
                    ))
                  )}
                </div>
                <div className="card">
                  <div className="kicker">Your bye weeks</div>
                  {myByes.length === 0 ? (
                    <p>Mark Mine as you draft. Hot weeks (6, 10, 11, 14) will light up here.</p>
                  ) : (
                    myByes.map((b) => (
                      <p key={b.week} className={HOT_BYES.has(b.week) ? 'hot' : undefined}>
                        <strong>Week {b.week}</strong> — {b.names.join(', ')}
                        {HOT_BYES.has(b.week) ? ' · nuke week' : ''}
                      </p>
                    ))
                  )}
                </div>
                <div className="card">
                  <div className="kicker">Your roster · {roster.filter((p) => p.pos === 'RB').length} RB</div>
                  {roster.length === 0 ? (
                    <p>Nobody yet. Mine is what the clock uses.</p>
                  ) : (
                    <ul className="roster">
                      {roster.map((p) => (
                        <li key={p.id}>{p.name} · {p.pos} {p.team}{p.bye ? ` · bye ${p.bye}` : ''}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                {clockExplained.map((s) => (
                  <div className="card" key={s.step}>
                    <div className="kicker">Step {s.step}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
                {positionPrimers.map((p) => (
                  <div className="card" key={p.pos}>
                    <h3>{p.pos}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <h3>Injury desk for tonight</h3>
            {injuryDesk.map((i) => (
              <div className="card" key={i.name}>
                <div className="kicker">{i.status}</div>
                <h3>{i.name}</h3>
                <p>{i.body}</p>
              </div>
            ))}
          </>
        )}

        {page === 'plan' && (
          <>
            <h2>Round-by-round plan</h2>
            <p className="lead">
              At 1:30 lock the exact pick, 1 through 10. That also locks Early / Mid / Late.
              Names already marked Gone grey out on the script.
            </p>
            {planNotes.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="kicker">Exact pick</div>
            <div className="slot-row">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button key={n} className={pick === n ? 'on' : ''} onClick={() => lockPick(n)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="slot-row">
              {(['early', 'mid', 'late'] as Slot[]).map((s) => (
                <button key={s} className={slot === s && pick == null ? 'on' : slot === s ? 'on' : ''} onClick={() => lockBand(s)}>
                  {s === 'early' ? 'Early · 1–3' : s === 'mid' ? 'Mid · 4–7' : 'Late · 8–10'}
                </button>
              ))}
            </div>
            {pick && (
              <div className="card">
                <div className="kicker">Your snake · pick {pick} · {slot}</div>
                <div className="snake">
                  <span>Rd</span>
                  {myPicks.map((_, i) => <span key={i}>R{i + 1}</span>)}
                  <span>You</span>
                  {myPicks.map((n, i) => (
                    <span key={n} className={i + 1 === round ? 'now' : undefined}>{n}</span>
                  ))}
                </div>
                <p>Round {round} is overall pick {myPicks[round - 1]}. Then {waitAfter(pick, round)} picks until you are back.</p>
              </div>
            )}
            {script && (
              <div className="card">
                <h3>{script.label}</h3>
                <p>{script.picks}</p>
                <p><strong>If the board forks:</strong> {script.fork}</p>
                {script.rounds.map((r) => {
                  const takeGone = primaryGone(r.take, taken)
                  const backupGone = r.backup ? anyMentionGone(r.backup, taken) : false
                  return (
                    <div className={`round-card${takeGone && backupGone ? ' gone-line' : ''}`} key={r.round}>
                      <div className="round-n">R{r.round}</div>
                      <div>
                        <p className="take">
                          Take {r.take}{takeGone ? ' — GONE' : ''}
                        </p>
                        {r.backup && (
                          <p className="backup">
                            If they are gone: {r.backup}{backupGone ? ' — also gone' : ''}
                          </p>
                        )}
                        {r.note && <p className="why">{r.note}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {page === 'players' && (
          <>
            <h2>Player board</h2>
            <p className="lead">
              <strong>Gone</strong> = the room took them (script and sleepers follow this).
              <strong> Mine</strong> = you did. <strong>Queue</strong> = take him if he is there (max 5).
            </p>
            <input
              className="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a name, team, or position…"
            />
            <div className="pos">
              {POS.map((p) => (
                <button key={p} className={pos === p ? 'on' : ''} onClick={() => setPos(p)}>{p}</button>
              ))}
              <button className={`ghost${hideTaken ? ' on' : ''}`} onClick={() => setHideTaken(!hideTaken)}>
                {hideTaken ? 'Hiding taken' : 'Showing taken'}
              </button>
            </div>
            {board.map((p) => {
              const call = callFor(p)
              return (
                <div key={p.id} className={`player${taken.has(p.id) ? ' gone' : ''}${mine.has(p.id) ? ' mine-row' : ''}`}>
                  <div>
                    <div className="who">{p.name}</div>
                    <div className="meta">
                      {p.pos} · {p.team}
                      {p.bye ? ` · bye week ${p.bye}` : ''}
                      {p.espnAdp != null ? ` · ESPN ADP ${p.espnAdp}` : ''}
                      {p.window ? ` · ${p.window}` : ''}
                    </div>
                    <span className={`call ${call.cls}`}>{call.label}</span>
                  </div>
                  <div className="note">{p.note}</div>
                  <div className="acts">
                    <button className={taken.has(p.id) ? 'gone-on' : ''} onClick={() => gone(p.id)}>
                      {taken.has(p.id) ? 'Undo gone' : 'Gone'}
                    </button>
                    <button className={mine.has(p.id) ? 'mine-on' : ''} onClick={() => minePick(p.id)}>
                      {mine.has(p.id) ? 'Drop from mine' : 'Mine'}
                    </button>
                    <button className={queue.includes(p.id) ? 'on' : ''} onClick={() => star(p.id)}>
                      {queue.includes(p.id) ? 'In queue' : 'Queue'}
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        )}

        {page === 'sleepers' && (
          <>
            <h2>Sleepers for this 10-team PPR draft</h2>
            <p className="lead">
              Names marked Gone on the player board grey out here so you do not hunt a player who already went.
            </p>
            {sleeperHowTo.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {(['board', 'middle', 'dart'] as const).map((tier) => (
              <div key={tier}>
                <h3>
                  {tier === 'board' ? 'Take these in their window' : tier === 'middle' ? 'Middle rounds — FLEX and the tight-end wait' : 'Last-round darts'}
                </h3>
                {sleeperCards.filter((s) => s.tier === tier).map((s) => (
                  <div className={`card${anyMentionGone(s.name, taken) ? ' gone-line' : ''}`} key={s.name}>
                    <div className="kicker">
                      {s.pos} {s.team} · ESPN {s.espnAdp ?? '—'} · {s.window}
                      {anyMentionGone(s.name, taken) ? ' · GONE' : ''}
                    </div>
                    <h3>{s.name}</h3>
                    <p>{s.why}</p>
                    <p><strong>How to draft:</strong> {s.howToDraft}</p>
                    <p className="kicker">{s.source}</p>
                  </div>
                ))}
              </div>
            ))}
            <p className="kicker">{researchStamp}</p>
          </>
        )}

        {page === 'edges' && (
          <>
            <h2>Where this board disagrees with ESPN</h2>
            <p className="lead">These are the edges. Grey means you already marked them Gone.</p>
            <div className="grid-2">
              <div>
                <h3>Take them if they fall</h3>
                {sleepers.map((x) => (
                  <div className={`card edge${anyMentionGone(x.name, taken) ? ' gone-line' : ''}`} key={x.name}>
                    <h3>{x.name}{anyMentionGone(x.name, taken) ? ' · GONE' : ''}</h3>
                    <p>{x.why}</p>
                  </div>
                ))}
                <h3>ESPN is too late on these</h3>
                {tooLate.map((x) => (
                  <div className={`card edge${anyMentionGone(x.name, taken) ? ' gone-line' : ''}`} key={x.name}>
                    <h3>{x.name} · ESPN {x.espn}</h3>
                    <p>{x.why}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3>Do not draft at their ADP</h3>
                {fades.map((x) => (
                  <div className="card edge" key={x.name}>
                    <h3>{x.name}</h3>
                    <p>{x.why}</p>
                  </div>
                ))}
                <h3>The room will reach here</h3>
                {tooEarly.map((x) => (
                  <div className="card edge" key={x.name}>
                    <h3>{x.name} · ESPN {x.espn}</h3>
                    <p>{x.why}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3>Bye weeks that can wreck a lineup</h3>
              {BYE_NOTES.map((b) => (
                <p key={b.week}><strong>Week {b.week} · {b.teams}.</strong> {b.note}</p>
              ))}
            </div>
          </>
        )}

        {page === 'late' && (
          <>
            <h2>Handcuffs, IR, and the Bronco rule</h2>
            <div className="card prose">
              <h3>One Bronco skill player</h3>
              <p>{broncoRule}</p>
            </div>
            <div className="card">
              <h3>Draft the starter. Handcuff him late if you own him.</h3>
              {handcuffs.map((h) => (
                <p key={h.starterId + h.cuff}>
                  <strong>{h.starter}</strong> — {h.cuff}. {h.when}.
                  {mine.has(h.starterId) ? ' You own this starter.' : ''}
                </p>
              ))}
            </div>
            <div className="grid-2">
              <div className="card">
                <h3>Real IR stashes (you have 3 spots)</h3>
                {irReal.map((x) => (
                  <p key={x.name}><strong>{x.name}.</strong> {x.when}</p>
                ))}
              </div>
              <div className="card">
                <h3>Dead — do not draft, do not IR</h3>
                {irDead.map((x) => <p key={x}>{x}</p>)}
              </div>
            </div>
          </>
        )}

        {page === 'card' && (
          <>
            <h2>Printable clock card</h2>
            <p className="lead">Put this on a second monitor or print it. Pre-rank the next two rounds before your pick.</p>
            <button className="ghost" onClick={() => window.print()}>Print</button>
            <div className="print-card">
              <h3>{clockCard.title}</h3>
              <p>{clockCard.league}</p>
              <p><strong>RED</strong> — {clockCard.red}</p>
              <p><strong>SMASH</strong> — {clockCard.smash}</p>
              <ol>
                {clockCard.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
              {clockCard.r1.map((s) => <p key={s}>{s}</p>)}
              <p><strong>Bye nuke</strong> — {clockCard.byes}</p>
              <p><strong>Do not</strong> — {clockCard.doNot}</p>
              <p>{clockCard.footer}</p>
            </div>
          </>
        )}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>{TICKER}{TICKER}</span>
            <span>{TICKER}{TICKER}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
