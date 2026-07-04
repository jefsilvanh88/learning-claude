export interface MultipleChoice {
  type: 'mc'
  question: string
  /** Trecho de código/comando opcional exibido em bloco monoespaçado */
  code?: string
  options: string[]
  correct: number
  explanation: string
}

export interface TrueFalse {
  type: 'tf'
  statement: string
  correct: boolean
  explanation: string
}

export interface FillBlank {
  type: 'fill'
  question: string
  /** Texto com ___ marcando a lacuna, ex.: "O arquivo de contexto se chama ___" */
  template: string
  /** Respostas aceitas (comparação sem caixa/acentos) */
  answers: string[]
  explanation: string
}

export interface OrderSteps {
  type: 'order'
  question: string
  /** Passos na ordem correta; o app embaralha na exibição */
  steps: string[]
  explanation: string
}

export type Exercise = MultipleChoice | TrueFalse | FillBlank | OrderSteps

export interface Lesson {
  id: string
  title: string
  exercises: Exercise[]
}

export interface Level {
  id: number
  slug: string
  title: string
  tagline: string
  lessons: Lesson[]
}
