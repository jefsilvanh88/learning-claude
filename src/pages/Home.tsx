import { Link } from 'react-router-dom'
import { Lock, Star, Play } from 'lucide-react'
import { levels } from '../data'
import { useProgress } from '../store/progress'
import { StatsBar } from '../components/ui'

/** deslocamento horizontal em zigue-zague da trilha */
const drift = [0, 44, 64, 44, 0, -44, -64, -44]

export default function Home() {
  const completed = useProgress((s) => s.completedLessons)
  const isDone = (id: string) => completed.includes(id)

  // primeira lição não concluída de toda a trilha = a "atual"
  const allLessons = levels.flatMap((lv) => lv.lessons)
  const currentIdx = allLessons.findIndex((l) => !isDone(l.id))

  let cursor = 0
  return (
    <div className="mx-auto max-w-[480px] px-5 pb-24">
      <header className="sticky top-0 z-10 -mx-5 mb-2 flex items-center justify-between border-b-2 border-edge bg-bg/95 px-5 py-3 backdrop-blur">
        <h1 className="font-pixel text-lg text-brand">ClaudeLingo</h1>
        <StatsBar />
      </header>

      {levels.map((level) => {
        const levelStart = cursor
        cursor += level.lessons.length
        const levelUnlocked = currentIdx === -1 || currentIdx >= levelStart

        return (
          <section key={level.id} className="mt-8">
            <div
              className={`rounded-2xl border-2 px-5 py-4 ${
                levelUnlocked ? 'border-brand-deep bg-surface' : 'border-edge bg-surface opacity-60'
              }`}
            >
              <p className="font-pixel text-xs text-gold">Nível {level.id}</p>
              <h2 className="mt-1 text-lg font-black">{level.title}</h2>
              <p className="text-sm font-bold text-muted">{level.tagline}</p>
            </div>

            <ol className="mt-6 flex flex-col items-center gap-7">
              {level.lessons.map((lesson, i) => {
                const globalIdx = levelStart + i
                const done = isDone(lesson.id)
                const isCurrent = globalIdx === currentIdx
                const unlocked = done || isCurrent
                const offset = drift[globalIdx % drift.length]

                const node = (
                  <div
                    className={`flex size-16 items-center justify-center rounded-full border-b-4 ${
                      done
                        ? 'border-success-deep bg-success text-[oklch(0.16_0.03_145)]'
                        : isCurrent
                          ? 'node-current border-brand-deep bg-brand text-on-brand'
                          : 'border-edge bg-surface-2 text-locked'
                    }`}
                  >
                    {done ? (
                      <Star size={26} fill="currentColor" strokeWidth={0} aria-hidden />
                    ) : isCurrent ? (
                      <Play size={26} fill="currentColor" strokeWidth={0} aria-hidden />
                    ) : (
                      <Lock size={22} aria-hidden />
                    )}
                  </div>
                )

                return (
                  <li key={lesson.id} style={{ transform: `translateX(${offset}px)` }}>
                    {unlocked ? (
                      <Link
                        to={`/licao/${lesson.id}`}
                        aria-label={`${done ? 'Refazer' : 'Começar'} lição: ${lesson.title}`}
                        className="flex flex-col items-center gap-1.5"
                      >
                        {node}
                        <span className={`max-w-36 text-center text-xs font-extrabold leading-tight ${isCurrent ? 'text-brand' : 'text-muted'}`}>
                          {lesson.title}
                        </span>
                      </Link>
                    ) : (
                      <div aria-label={`Bloqueada: ${lesson.title}`} className="flex flex-col items-center gap-1.5">
                        {node}
                        <span className="max-w-36 text-center text-xs font-extrabold leading-tight text-locked">
                          {lesson.title}
                        </span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
