import { useMemo, useState } from 'react'
import {
  BYE_NOTES,
  broncoRule,
  clockExplained,
  doNotExplained,
  fades,
  handcuffs,
  irDead,
  irReal,
  landscape,
  league,
  expertSplits,
  injuryDesk,
  leagueExplained,
  planNotes,
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
  clockStateFromMine,
  draftMine,
  loadMine,
  loadSlot,
  loadTaken,
  onTheClock,
  rosterOf,
  saveSlot,
  scriptFor,
  searchPlayers,
  toggleTaken,
  warningsFor,
} from './engine'
import type { Player, Pos, Slot } from './types'

type Page = 'overview' | 'now' | 'plan' | 'players' | 'sleepers' | 'edges' | 'late'

const PAGES: { id: Page; label: string }[] = [
  { id: 'overview', label: 'How this league works' },
  { id: 'now', label: 'On the clock' },
  { id: 'plan', label: 'Round plan' },
  { id: 'players', label: 'Player board' },
  { id: 'sleepers', label: 'Sleepers' },
  { id: 'edges', label: 'Take / avoid' },
  { id: 'late', label: 'Handcuffs and IR' },
]

const POS: (Pos | 'ALL')[] = ['ALL', 'QB', 'RB', 'WR', 'TE', 'DST', 'K']

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
  const [slot, setSlot] = useState<Slot | null>(() => loadSlot())
  const [taken, setTaken] = useState<Set<string>>(() => loadTaken())
  const [mine, setMine] = useState<Set<string>>(() => loadMine())
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

  function lockSlot(next: Slot) {
    saveSlot(next)
    setSlot(next)
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

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">Draft day · Sep 6</div>
        <h1>{league.team}</h1>
        <div className="sub">{league.name}<br />{league.strategy} · 10-team PPR</div>
        <nav>
          {PAGES.map((p) => (
            <button key={p.id} className={page === p.id ? 'on' : ''} onClick={() => setPage(p.id)}>
              {p.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        {page === 'overview' && (
          <>
            <h2>How this league works</h2>
            <p className="lead">
              Maren’s board is for this room, not a national article. Read this once before 2:30.
              When the slot drops at 1:30, lock Early, Mid, or Late on Round plan.
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
              <span className="kicker" style={{ color: 'inherit' }}>
                {roster.filter((p) => p.pos === 'RB').length} RB on your roster
              </span>
            </div>
            <div className="advice-box">
              <div className="kicker" style={{ color: '#cbbfaa' }}>What to do with this pick</div>
              <h2>{advice.headline}</h2>
              <p>{advice.why}</p>
              {advice.names.length > 0 && <p>Order: {advice.names.join(', then ')}.</p>}
              {warns.map((w) => <p key={w} className="warn">{w}</p>)}
            </div>
            <div className="grid-3">
              <div>
                {clockExplained.map((s) => (
                  <div className="card" key={s.step}>
                    <div className="kicker">Step {s.step}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="card">
                  <div className="kicker">Your roster</div>
                  {roster.length === 0 ? (
                    <p>Nobody yet. Mark picks as Mine on the player board so this advice stays honest.</p>
                  ) : (
                    <ul className="roster">
                      {roster.map((p) => (
                        <li key={p.id}>{p.name} · {p.pos} {p.team}</li>
                      ))}
                    </ul>
                  )}
                </div>
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
              Slot is unknown until 1:30 p.m. Denver. Click the range you landed in.
              Hide the other two so you cannot follow the wrong script on a two-minute clock.
            </p>
            {planNotes.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="slot-row">
              {(['early', 'mid', 'late'] as Slot[]).map((s) => (
                <button key={s} className={slot === s ? 'on' : ''} onClick={() => lockSlot(s)}>
                  {s === 'early' ? 'Early · picks 1–3' : s === 'mid' ? 'Mid · picks 4–7' : 'Late · picks 8–10'}
                </button>
              ))}
            </div>
            {script && (
              <div className="card">
                <h3>{script.label}</h3>
                <p>{script.picks}</p>
                <p><strong>If the board forks:</strong> {script.fork}</p>
                {script.rounds.map((r) => (
                  <div className="round-card" key={r.round}>
                    <div className="round-n">R{r.round}</div>
                    <div>
                      <p className="take">Take {r.take}</p>
                      {r.backup && <p className="backup">If they are gone: {r.backup}</p>}
                      {r.note && <p className="why">{r.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {page === 'players' && (
          <>
            <h2>Player board</h2>
            <p className="lead">
              His ranks, not a national list. Type a name. <strong>Gone</strong> means someone in the room took them.
              <strong> Mine</strong> means you did — that is what the clock uses.
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
                  <div className="note">{p.note || 'No extra note — use the call and the ADP window.'}</div>
                  <div className="acts">
                    <button className={taken.has(p.id) ? 'gone-on' : ''} onClick={() => gone(p.id)}>
                      {taken.has(p.id) ? 'Undo gone' : 'Gone'}
                    </button>
                    <button className={mine.has(p.id) ? 'mine-on' : ''} onClick={() => minePick(p.id)}>
                      {mine.has(p.id) ? 'Drop from mine' : 'Mine'}
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
              A sleeper here is someone ESPN is late on who can start for you in September.
              Deep 12-team dart throws do not belong on this board.
            </p>
            {sleeperHowTo.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h3>Take these in their window</h3>
            {sleeperCards.filter((s) => s.tier === 'board').map((s) => (
              <div className="card" key={s.name}>
                <div className="kicker">{s.pos} {s.team} · ESPN {s.espnAdp ?? '—'} · {s.window}</div>
                <h3>{s.name}</h3>
                <p>{s.why}</p>
                <p><strong>How to draft:</strong> {s.howToDraft}</p>
                <p className="kicker">{s.source}</p>
              </div>
            ))}
            <h3>Middle rounds — FLEX and the tight-end wait</h3>
            {sleeperCards.filter((s) => s.tier === 'middle').map((s) => (
              <div className="card" key={s.name}>
                <div className="kicker">{s.pos} {s.team} · ESPN {s.espnAdp ?? '—'} · {s.window}</div>
                <h3>{s.name}</h3>
                <p>{s.why}</p>
                <p><strong>How to draft:</strong> {s.howToDraft}</p>
                <p className="kicker">{s.source}</p>
              </div>
            ))}
            <h3>Last-round darts</h3>
            {sleeperCards.filter((s) => s.tier === 'dart').map((s) => (
              <div className="card" key={s.name}>
                <div className="kicker">{s.pos} {s.team} · ESPN {s.espnAdp ?? '—'} · {s.window}</div>
                <h3>{s.name}</h3>
                <p>{s.why}</p>
                <p><strong>How to draft:</strong> {s.howToDraft}</p>
                <p className="kicker">{s.source}</p>
              </div>
            ))}
            <p className="kicker">{researchStamp}</p>
          </>
        )}

        {page === 'edges' && (
          <>
            <h2>Where this board disagrees with ESPN</h2>
            <p className="lead">These are the edges. Read the reason, not just the name.</p>
            <div className="grid-2">
              <div>
                <h3>Take them if they fall</h3>
                {sleepers.map((x) => (
                  <div className="card edge" key={x.name}>
                    <h3>{x.name}</h3>
                    <p>{x.why}</p>
                  </div>
                ))}
                <h3>ESPN is too late on these</h3>
                {tooLate.map((x) => (
                  <div className="card edge" key={x.name}>
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
      </main>
    </div>
  )
}
