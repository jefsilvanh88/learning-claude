import { useLocation, useParams, Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { findLesson } from '../data'
import { useProgress } from '../store/progress'
import { Flame } from '../components/ui'

interface ResultState {
  xp: number
  firstTryCorrect: number
  total: number
  perfect: boolean
}

export default function Results() {
  const { lessonId } = useParams()
  const location = useLocation()
  const streak = useProgress((s) => s.currentStreak())
  const state = location.state as ResultState | null
  const found = lessonId ? findLesson(lessonId) : null

  if (!state || !found) {
    return (
      <div className="mx-auto max-w-[480px] px-5 py-16 text-center">
        <Link to="/" className="btn-3d btn-brand inline-block px-6 py-3">
          Voltar à trilha
        </Link>
      </div>
    )
  }

  const stars = state.perfect ? 3 : state.firstTryCorrect >= state.total * 0.6 ? 2 : 1

  return (
    <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col items-center justify-center px-5 text-center">
      <p className="font-pixel text-sm text-gold">Lição completa</p>
      <h1 className="mt-2 text-2xl font-black">{found.lesson.title}</h1>

      <div className="mt-6 flex gap-2" aria-label={`${stars} de 3 estrelas`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="pop-in" style={{ animationDelay: `${i * 120}ms` }}>
            <Star
              size={44}
              aria-hidden
              fill={i < stars ? 'var(--color-gold)' : 'var(--color-surface-2)'}
              strokeWidth={i < stars ? 0 : 2}
              color="var(--color-edge)"
            />
          </span>
        ))}
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-edge bg-surface px-4 py-5">
          <p className="font-pixel text-2xl text-gold">+{state.xp}</p>
          <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-muted">XP ganho</p>
        </div>
        <div className="rounded-2xl border-2 border-edge bg-surface px-4 py-5">
          <p className="flex items-center justify-center gap-2 font-pixel text-2xl text-brand">
            <Flame size={24} /> {streak}
          </p>
          <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-muted">Dias de streak</p>
        </div>
      </div>

      <p className="mt-6 text-sm font-bold text-muted">
        {state.firstTryCorrect} de {state.total} de primeira
        {state.perfect && ' — lição perfeita, +10 XP de bônus!'}
      </p>

      <Link to="/" className="btn-3d btn-brand mt-10 w-full py-4 text-lg">
        Continuar
      </Link>
    </div>
  )
}
