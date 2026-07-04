import { useMemo, useState } from 'react'
import type { Exercise, FillBlank, MultipleChoice, OrderSteps, TrueFalse } from '../types'
import { Check, X } from 'lucide-react'

export interface ExerciseProps {
  exercise: Exercise
  /** true depois que o usuário respondeu (revela certo/errado e trava a UI) */
  revealed: boolean
  onSubmit: (correct: boolean) => void
}

function SubmitButton({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="btn-3d btn-brand mt-6 w-full py-4 text-lg"
      disabled={!enabled}
      onClick={onClick}
    >
      Verificar
    </button>
  )
}

function optionClass(base: string, state: 'idle' | 'selected' | 'correct' | 'wrong') {
  const map = {
    idle: '',
    selected: 'option-selected',
    correct: 'option-correct',
    wrong: 'option-wrong',
  }
  return `option-card ${map[state]} ${base}`
}

function McView({ ex, revealed, onSubmit }: { ex: MultipleChoice } & Omit<ExerciseProps, 'exercise'>) {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <div>
      <h2 className="text-xl font-black">{ex.question}</h2>
      {ex.code && (
        <pre className="mt-3 overflow-x-auto rounded-xl bg-surface p-4 font-mono text-sm text-gold">
          {ex.code}
        </pre>
      )}
      <div className="mt-5 flex flex-col gap-3">
        {ex.options.map((opt, i) => {
          let state: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle'
          if (revealed && i === ex.correct) state = 'correct'
          else if (revealed && i === selected) state = 'wrong'
          else if (i === selected) state = 'selected'
          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              className={optionClass('px-4 py-3.5 text-left text-[15px] font-bold leading-snug', state)}
              onClick={() => setSelected(i)}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {!revealed && (
        <SubmitButton enabled={selected !== null} onClick={() => onSubmit(selected === ex.correct)} />
      )}
    </div>
  )
}

function TfView({ ex, revealed, onSubmit }: { ex: TrueFalse } & Omit<ExerciseProps, 'exercise'>) {
  const [selected, setSelected] = useState<boolean | null>(null)
  const opts: { label: string; value: boolean; icon: typeof Check }[] = [
    { label: 'Verdadeiro', value: true, icon: Check },
    { label: 'Falso', value: false, icon: X },
  ]
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-muted">Verdadeiro ou falso?</p>
      <h2 className="mt-2 text-xl font-black">{ex.statement}</h2>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {opts.map(({ label, value, icon: Icon }) => {
          let state: 'idle' | 'selected' | 'correct' | 'wrong' = 'idle'
          if (revealed && value === ex.correct) state = 'correct'
          else if (revealed && value === selected) state = 'wrong'
          else if (value === selected) state = 'selected'
          return (
            <button
              key={label}
              type="button"
              disabled={revealed}
              className={optionClass('flex items-center justify-center gap-2 px-4 py-5 font-extrabold', state)}
              onClick={() => setSelected(value)}
            >
              <Icon size={20} strokeWidth={3} aria-hidden />
              {label}
            </button>
          )
        })}
      </div>
      {!revealed && (
        <SubmitButton enabled={selected !== null} onClick={() => onSubmit(selected === ex.correct)} />
      )}
    </div>
  )
}

function normalize(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function FillView({ ex, revealed, onSubmit }: { ex: FillBlank } & Omit<ExerciseProps, 'exercise'>) {
  const [value, setValue] = useState('')
  const correct = ex.answers.some((a) => normalize(a) === normalize(value))
  const parts = ex.template.split('___')
  return (
    <div>
      <h2 className="text-xl font-black">{ex.question}</h2>
      <div className="mt-6 rounded-xl bg-surface p-5 font-mono text-lg">
        {parts[0]}
        <input
          type="text"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Resposta"
          disabled={revealed}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`mx-1 w-32 rounded-lg border-2 bg-surface-2 px-2 py-1 text-center font-mono text-lg outline-none transition-colors focus:border-brand ${
            revealed ? (correct ? 'border-success text-success' : 'border-error text-error') : 'border-edge'
          }`}
        />
        {parts[1] ?? ''}
      </div>
      {revealed && !correct && (
        <p className="mt-3 font-bold text-success">
          Resposta: <span className="font-mono">{ex.answers[0]}</span>
        </p>
      )}
      {!revealed && <SubmitButton enabled={value.trim().length > 0} onClick={() => onSubmit(correct)} />}
    </div>
  )
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function OrderView({ ex, revealed, onSubmit }: { ex: OrderSteps } & Omit<ExerciseProps, 'exercise'>) {
  // embaralha uma vez por exercício; reembaralha se sair igual ao gabarito
  const pool = useMemo(() => {
    let p = shuffled(ex.steps)
    while (ex.steps.length > 1 && p.every((s, i) => s === ex.steps[i])) p = shuffled(ex.steps)
    return p
  }, [ex])
  const [picked, setPicked] = useState<string[]>([])
  const remaining = pool.filter((s) => !picked.includes(s))
  const correct = picked.length === ex.steps.length && picked.every((s, i) => s === ex.steps[i])

  return (
    <div>
      <h2 className="text-xl font-black">{ex.question}</h2>
      <ol className="mt-5 flex min-h-14 flex-col gap-2" aria-label="Sua ordem">
        {picked.map((step, i) => {
          const state = revealed ? (step === ex.steps[i] ? 'correct' : 'wrong') : 'selected'
          return (
            <li key={step}>
              <button
                type="button"
                disabled={revealed}
                className={optionClass('flex w-full items-start gap-3 px-4 py-3 text-left text-[15px] font-bold', state)}
                onClick={() => setPicked(picked.filter((s) => s !== step))}
              >
                <span className="font-pixel text-sm text-gold">{i + 1}</span>
                <span className="leading-snug">{step}</span>
              </button>
            </li>
          )
        })}
        {picked.length === 0 && (
          <li className="rounded-xl border-2 border-dashed border-edge px-4 py-3 text-sm text-muted">
            Toque nos passos abaixo, na ordem certa
          </li>
        )}
      </ol>
      {remaining.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 border-t-2 border-edge pt-4">
          {remaining.map((step) => (
            <button
              key={step}
              type="button"
              disabled={revealed}
              className="option-card px-4 py-3 text-left text-[15px] font-bold leading-snug"
              onClick={() => setPicked([...picked, step])}
            >
              {step}
            </button>
          ))}
        </div>
      )}
      {revealed && !correct && (
        <div className="mt-4 rounded-xl bg-surface p-4">
          <p className="text-sm font-bold text-muted">Ordem correta:</p>
          <ol className="mt-2 list-inside list-decimal text-[15px] font-bold leading-relaxed">
            {ex.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      )}
      {!revealed && (
        <SubmitButton enabled={picked.length === ex.steps.length} onClick={() => onSubmit(correct)} />
      )}
    </div>
  )
}

export function ExerciseView({ exercise, revealed, onSubmit }: ExerciseProps) {
  switch (exercise.type) {
    case 'mc':
      return <McView ex={exercise} revealed={revealed} onSubmit={onSubmit} />
    case 'tf':
      return <TfView ex={exercise} revealed={revealed} onSubmit={onSubmit} />
    case 'fill':
      return <FillView ex={exercise} revealed={revealed} onSubmit={onSubmit} />
    case 'order':
      return <OrderView ex={exercise} revealed={revealed} onSubmit={onSubmit} />
  }
}
