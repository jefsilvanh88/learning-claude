import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { X, Check, CircleX } from 'lucide-react'
import { findLesson } from '../data'
import { ExerciseView } from '../components/exercises'
import { useProgress } from '../store/progress'

interface QueueItem {
  exerciseIdx: number
  isRetry: boolean
}

export default function Lesson() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const completeLesson = useProgress((s) => s.completeLesson)

  const found = useMemo(() => (lessonId ? findLesson(lessonId) : null), [lessonId])

  const [queue, setQueue] = useState<QueueItem[]>(() =>
    found ? found.lesson.exercises.map((_, i) => ({ exerciseIdx: i, isRetry: false })) : [],
  )
  const [pos, setPos] = useState(0)
  const [answered, setAnswered] = useState<null | boolean>(null)
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  // renderiza o exercício de novo (estado interno zerado) quando ele volta na fila
  const [attempt, setAttempt] = useState(0)

  if (!found) {
    return (
      <div className="mx-auto max-w-[480px] px-5 py-16 text-center">
        <p className="font-bold">Lição não encontrada.</p>
        <Link to="/" className="btn-3d btn-brand mt-6 inline-block px-6 py-3">
          Voltar à trilha
        </Link>
      </div>
    )
  }

  const { lesson } = found
  const total = lesson.exercises.length
  const current = queue[pos]
  const exercise = lesson.exercises[current.exerciseIdx]
  const answeredCount = pos - queue.slice(0, pos).filter((q) => q.isRetry).length
  const progress = Math.min(answeredCount / total, 1)

  function handleSubmit(correct: boolean) {
    setAnswered(correct)
    if (correct) {
      if (current.isRetry) {
        setXpEarned((v) => v + 5)
      } else {
        setXpEarned((v) => v + 10)
        setFirstTryCorrect((v) => v + 1)
      }
    }
  }

  function handleContinue() {
    let nextQueue = queue
    if (answered === false) {
      // errou: o mesmo exercício volta ao fim da fila como revisão
      nextQueue = [...queue, { exerciseIdx: current.exerciseIdx, isRetry: true }]
      setQueue(nextQueue)
    }
    const next = pos + 1
    if (next >= nextQueue.length) {
      const perfect = firstTryCorrect === total
      const bonus = perfect ? 10 : 0
      completeLesson(lesson.id, xpEarned + bonus, firstTryCorrect)
      navigate(`/resultado/${lesson.id}`, {
        state: { xp: xpEarned + bonus, firstTryCorrect, total, perfect },
        replace: true,
      })
      return
    }
    setPos(next)
    setAnswered(null)
    setAttempt((a) => a + 1)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col px-5">
      <header className="flex items-center gap-4 py-4">
        <Link to="/" aria-label="Sair da lição" className="text-muted">
          <X size={26} strokeWidth={3} />
        </Link>
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso da lição"
          className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2"
        >
          <div
            className="h-full rounded-full bg-brand transition-transform duration-300 ease-out"
            style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
          />
        </div>
        {current.isRetry && <span className="font-pixel text-[10px] text-gold">REVISÃO</span>}
      </header>

      <main className="flex-1 pb-48 pt-4">
        <ExerciseView
          key={`${current.exerciseIdx}-${attempt}`}
          exercise={exercise}
          revealed={answered !== null}
          onSubmit={handleSubmit}
        />
      </main>

      {answered !== null && (
        <div
          role="status"
          className={`feedback-rise fixed inset-x-0 bottom-0 z-30 border-t-4 ${
            answered ? 'border-success bg-[oklch(0.24_0.05_145)]' : 'border-error bg-[oklch(0.24_0.06_25)]'
          }`}
        >
          <div className="mx-auto max-w-[480px] px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <p className={`flex items-center gap-2 text-lg font-black ${answered ? 'text-success' : 'text-error'}`}>
              {answered ? (
                <>
                  <Check size={22} strokeWidth={3.5} aria-hidden /> Muito bem!
                </>
              ) : (
                <>
                  <CircleX size={22} strokeWidth={3} aria-hidden /> Não foi dessa vez
                </>
              )}
            </p>
            <p className="mt-2 text-[15px] font-semibold leading-relaxed">{exercise.explanation}</p>
            {!answered && (
              <p className="mt-2 text-xs font-bold text-muted">Este exercício volta no fim da lição.</p>
            )}
            <button
              type="button"
              autoFocus
              className={`btn-3d mt-4 w-full py-4 text-lg ${answered ? 'btn-success' : 'btn-brand'}`}
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
