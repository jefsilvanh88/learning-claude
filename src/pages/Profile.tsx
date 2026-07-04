import { useState } from 'react'
import { levels, totalLessons } from '../data'
import { useProgress } from '../store/progress'
import { Flame, StatsBar } from '../components/ui'

export default function Profile() {
  const { xp, completedLessons, reset } = useProgress()
  const streak = useProgress((s) => s.currentStreak())
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="mx-auto max-w-[480px] px-5 pb-24">
      <header className="flex items-center justify-between py-4">
        <h1 className="font-pixel text-lg text-brand">Perfil</h1>
        <StatsBar />
      </header>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border-2 border-edge bg-surface px-2 py-5">
          <p className="font-pixel text-xl text-gold">{xp}</p>
          <p className="mt-1 text-[11px] font-extrabold uppercase text-muted">XP total</p>
        </div>
        <div className="rounded-2xl border-2 border-edge bg-surface px-2 py-5">
          <p className="flex items-center justify-center gap-1 font-pixel text-xl text-brand">
            <Flame size={18} lit={streak > 0} />
            {streak}
          </p>
          <p className="mt-1 text-[11px] font-extrabold uppercase text-muted">Streak</p>
        </div>
        <div className="rounded-2xl border-2 border-edge bg-surface px-2 py-5">
          <p className="font-pixel text-xl text-ink">
            {completedLessons.length}/{totalLessons}
          </p>
          <p className="mt-1 text-[11px] font-extrabold uppercase text-muted">Lições</p>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-black">Progresso por nível</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {levels.map((level) => {
          const done = level.lessons.filter((l) => completedLessons.includes(l.id)).length
          const pct = done / level.lessons.length
          return (
            <li key={level.id} className="rounded-2xl border-2 border-edge bg-surface px-4 py-3">
              <div className="flex items-baseline justify-between">
                <p className="font-bold">
                  <span className="font-pixel text-xs text-gold">Nv{level.id}</span> {level.title}
                </p>
                <p className="text-xs font-extrabold text-muted">
                  {done}/{level.lessons.length}
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full ${pct === 1 ? 'bg-success' : 'bg-brand'}`}
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-10">
        {confirming ? (
          <div className="rounded-2xl border-2 border-error bg-surface px-4 py-4">
            <p className="text-sm font-bold">Apagar todo o progresso? Não dá para desfazer.</p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                className="btn-3d flex-1 bg-error py-3 font-extrabold text-ink shadow-[0_4px_0_var(--color-error-deep)]"
                onClick={() => {
                  reset()
                  setConfirming(false)
                }}
              >
                Apagar
              </button>
              <button type="button" className="btn-3d btn-ghost flex-1 py-3" onClick={() => setConfirming(false)}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="text-sm font-bold text-muted underline" onClick={() => setConfirming(true)}>
            Zerar progresso
          </button>
        )}
      </div>
    </div>
  )
}
