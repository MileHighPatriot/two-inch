import { useMemo, useState } from 'react'
import {
  BYE_NOTES,
  CLOCK_STEPS,
  DO_NOT,
  R1_BY_SLOT,
  broncoRule,
  fades,
  handcuffs,
  irDead,
  irReal,
  landscape,
  league,
  players,
  sleepers,
  tooEarly,
  tooLate,
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

type Tab = 'clock' | 'script' | 'board' | 'lists' | 'cuffs'

const POS: (Pos | 'ALL')[] = ['ALL', 'QB', 'RB', 'WR', 'TE', 'DST', 'K']
const TABS: { id: Tab; label: string }[] = [
  { id: 'clock', label: 'Clock' },
  { id: 'script', label: 'Script' },
  { id: 'board', label: 'Board' },
  { id: 'lists', label: 'Lists' },
  { id: 'cuffs', label: 'Cuffs' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('clock')
  const [slot, setSlot] = useState<Slot | null>(() => loadSlot())
  const [taken, setTaken] = useState<Set<string>>(() => loadTaken())
  const [mine, setMine] = useState<Set<string>>(() => loadMine())
  const [query, setQuery] = useState('')
  const [pos, setPos] = useState<Pos | 'ALL'>('ALL')
  const [hideTaken, setHideTaken] = useState(true)
  const [round, setRound] = useState(1)
  const [openId, setOpenId] = useState<string | null>(null)

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
    setTab('script')
  }

  function gone(id: string) {
    setTaken(toggleTaken(taken, id))
  }

  function minePick(id: string) {
    const next = draftMine(taken, mine, id)
    setTaken(next.taken)
    setMine(next.mine)
  }

  function playerRow(p: Player) {
    const isGone = taken.has(p.id)
    const isMine = mine.has(p.id)
    return (
      <div key={p.id} className={`player${isGone ? ' gone' : ''}${isMine ? ' mine-row' : ''}`}>
        <button className="name-btn" onClick={() => setOpenId(openId === p.id ? null : p.id)}>
          <div>
            {(p.tags.includes('red') || p.tags.includes('cross-off')) && <span className="chip red">RED</span>}
            {p.tags.includes('smash') && <span className="chip smash">SMASH</span>}
            <strong>{p.name}</strong>
          </div>
          <div className="meta">
            {p.pos} {p.team} · ADP {p.espnAdp ?? '—'} · {p.window}
            {p.bye ? ` · bye ${p.bye}` : ''}
          </div>
          {openId === p.id && p.note && <p className="note">{p.note}</p>}
        </button>
        <div className="acts">
          <button className={isGone ? 'gone-on' : ''} onClick={() => gone(p.id)}>
            {isGone ? 'Undo gone' : 'Gone'}
          </button>
          <button className={isMine ? 'mine-on' : ''} onClick={() => minePick(p.id)}>
            {isMine ? 'Drop mine' : 'Mine'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="shell">
      <header className="top">
        <div className="kicker">{league.stamp}</div>
        <h1>{league.team} · {league.strategy}</h1>
        <div className="advice">
          <div className="round-row">
            <span className="kicker">On the clock · R{round}</span>
            <input
              type="number"
              min={1}
              max={16}
              value={round}
              onChange={(e) => setRound(Number(e.target.value) || 1)}
              aria-label="Round"
            />
          </div>
          <h2>{advice.headline}</h2>
          <p className="note">{advice.why}</p>
          {advice.names.length > 0 && <p>{advice.names.join(' · ')}</p>}
          {warns.map((w) => (
            <p key={w} className="warn">{w}</p>
          ))}
        </div>
      </header>

      {tab === 'clock' && (
        <>
          <div className="card">
            <div className="kicker">Decision tree</div>
            <ol>
              {CLOCK_STEPS.map((s) => (
                <li key={s.step}>{s.test}</li>
              ))}
            </ol>
          </div>
          <div className="card">
            <div className="kicker red">RED — do not draft at ADP</div>
            <p className="red">Jacobs · Love R2–R3 · Jeanty R2 · Kamara · Conner · Hunter · Aubrey · Dell · J. Higgins · Tyson · Mims · McBride R2 · early Allen</p>
            <div className="kicker smash">SMASH</div>
            <p className="smash">Chase Brown slide · Etienne · Watson · Godwin R8–10 · Lloyd R9–R10 · Harvey if no Waddle · Evans · Kraft</p>
          </div>
          <div className="card">
            <div className="kicker">R1 by slot</div>
            <p><strong>Early</strong> {R1_BY_SLOT.early}</p>
            <p><strong>Mid</strong> {R1_BY_SLOT.mid}</p>
            <p><strong>Late</strong> {R1_BY_SLOT.late}</p>
          </div>
          <div className="card">
            <div className="kicker">Do not</div>
            <ul>{DO_NOT.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="card">
            <div className="kicker">This morning</div>
            <p className="note">{landscape.tldr}</p>
          </div>
          {roster.length > 0 && (
            <div className="card">
              <div className="kicker">My roster · {roster.filter((p) => p.pos === 'RB').length} RB</div>
              {roster.map((p) => (
                <div key={p.id}>{p.name} · {p.pos} {p.team}</div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'script' && (
        <>
          <p className="note">Slot drops 1:30 PM Denver. Circle one. That script only.</p>
          <div className="slot-grid">
            {(['early', 'mid', 'late'] as Slot[]).map((s) => (
              <button key={s} className={slot === s ? 'on' : ''} onClick={() => lockSlot(s)}>
                {s === 'early' ? 'Early 1–3' : s === 'mid' ? 'Mid 4–7' : 'Late 8–10'}
              </button>
            ))}
          </div>
          {script && (
            <div className="card">
              <h2>{script.label}</h2>
              <p>{script.picks}</p>
              <p className="smash">{script.fork}</p>
              {script.rounds.map((r) => (
                <div key={r.round} className="player">
                  <div>
                    <strong>R{r.round}</strong> {r.take}
                    {r.backup && <div className="meta">Backup: {r.backup}</div>}
                    {r.note && <div className="note">{r.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'board' && (
        <>
          <input
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Chase, Lloyd, RB…"
            enterKeyHint="search"
          />
          <div className="row pos">
            {POS.map((p) => (
              <button key={p} className={pos === p ? 'on' : ''} onClick={() => setPos(p)}>
                {p}
              </button>
            ))}
            <button className={`chip-btn${hideTaken ? ' on' : ''}`} onClick={() => setHideTaken(!hideTaken)}>
              hide taken
            </button>
          </div>
          {board.map(playerRow)}
        </>
      )}

      {tab === 'lists' && (
        <>
          <div className="card">
            <h2 className="smash">Sleepers</h2>
            {sleepers.map((x) => <p key={x.name}><strong>{x.name}</strong> — {x.why}</p>)}
          </div>
          <div className="card">
            <h2 className="red">Fades</h2>
            {fades.map((x) => <p key={x.name}><strong>{x.name}</strong> — {x.why}</p>)}
          </div>
          <div className="card">
            <h2>Going too early</h2>
            {tooEarly.map((x) => <p key={x.name}><strong>{x.name}</strong> ESPN {x.espn} — {x.why}</p>)}
          </div>
          <div className="card">
            <h2>Going too late</h2>
            {tooLate.map((x) => <p key={x.name}><strong>{x.name}</strong> ESPN {x.espn} — {x.why}</p>)}
          </div>
          <div className="card">
            <h2>Byes</h2>
            {BYE_NOTES.map((b) => <p key={b.week}><strong>W{b.week}</strong> {b.teams} — {b.note}</p>)}
          </div>
        </>
      )}

      {tab === 'cuffs' && (
        <>
          <div className="card">
            <h2>One Bronco skill</h2>
            <p>{broncoRule}</p>
          </div>
          <div className="card">
            <h2>Handcuffs</h2>
            {handcuffs.map((h) => (
              <p key={h.starterId + h.cuff}><strong>{h.starter}</strong> → {h.cuff} · {h.when}</p>
            ))}
          </div>
          <div className="card">
            <h2>IR real</h2>
            {irReal.map((x) => <p key={x.name}><strong>{x.name}</strong> — {x.when}</p>)}
          </div>
          <div className="card">
            <h2 className="red">IR dead</h2>
            {irDead.map((x) => <p key={x}>{x}</p>)}
          </div>
        </>
      )}

      <nav className="dock" aria-label="Tabs">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
