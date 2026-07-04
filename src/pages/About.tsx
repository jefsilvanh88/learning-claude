import { totalExercises, totalLessons, levels } from '../data'

export default function About() {
  return (
    <div className="mx-auto max-w-[480px] px-5 pb-24">
      <header className="py-4">
        <h1 className="font-pixel text-lg text-brand">Sobre</h1>
      </header>

      <div className="rounded-2xl border-2 border-edge bg-surface px-5 py-5">
        <h2 className="text-lg font-black">ClaudeLingo</h2>
        <p className="mt-2 text-[15px] font-semibold leading-relaxed text-muted">
          Um jogo de lições curtas para aprender a usar o Claude e o Claude Code de verdade: do
          primeiro prompt até agentes autônomos.
        </p>
        <p className="mt-3 font-pixel text-xs text-gold">
          {levels.length} níveis · {totalLessons} lições · {totalExercises} exercícios
        </p>
      </div>

      <h2 className="mt-8 text-lg font-black">Como funciona</h2>
      <ul className="mt-3 flex flex-col gap-2 text-[15px] font-semibold leading-relaxed text-muted">
        <li>• Acertou de primeira: +10 XP. Acertou na revisão: +5 XP. Lição perfeita: +10 de bônus.</li>
        <li>• Exercícios errados voltam no fim da lição até você acertar.</li>
        <li>• Estude todo dia para manter a chama do streak acesa.</li>
        <li>• Seu progresso fica salvo neste dispositivo — funciona até offline.</li>
      </ul>

      <h2 className="mt-8 text-lg font-black">Para ir além</h2>
      <ul className="mt-3 flex flex-col gap-2 text-[15px] font-semibold leading-relaxed">
        <li>
          <a className="text-brand underline" href="https://claude.ai" target="_blank" rel="noreferrer">
            claude.ai
          </a>{' '}
          <span className="text-muted">— use o Claude no navegador</span>
        </li>
        <li>
          <a className="text-brand underline" href="https://code.claude.com/docs" target="_blank" rel="noreferrer">
            code.claude.com/docs
          </a>{' '}
          <span className="text-muted">— documentação oficial do Claude Code</span>
        </li>
        <li>
          <a
            className="text-brand underline"
            href="https://www.anthropic.com/engineering"
            target="_blank"
            rel="noreferrer"
          >
            anthropic.com/engineering
          </a>{' '}
          <span className="text-muted">— melhores práticas direto da fonte</span>
        </li>
      </ul>

      <p className="mt-10 text-xs font-bold text-muted">
        Projeto independente de estudo. Claude é uma marca da Anthropic.
      </p>
    </div>
  )
}
