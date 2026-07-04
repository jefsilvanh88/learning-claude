import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Data local no formato YYYY-MM-DD (não UTC, o streak é do dia do usuário) */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000)
}

interface ProgressState {
  xp: number
  streak: number
  lastActiveDay: string | null
  /** ids de lições completas, ex.: "1-2" */
  completedLessons: string[]
  /** melhor contagem de acertos de primeira por lição */
  bestScores: Record<string, number>
  completeLesson: (lessonId: string, earnedXp: number, firstTryCorrect: number) => void
  /** streak atual considerando se o usuário perdeu dias desde a última atividade */
  currentStreak: () => number
  reset: () => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastActiveDay: null,
      completedLessons: [],
      bestScores: {},

      completeLesson: (lessonId, earnedXp, firstTryCorrect) =>
        set((s) => {
          const today = todayKey()
          let streak = s.streak
          if (s.lastActiveDay === null) {
            streak = 1
          } else {
            const gap = daysBetween(s.lastActiveDay, today)
            if (gap === 1) streak = s.streak + 1
            else if (gap > 1) streak = 1
            // gap === 0: mesma data, streak mantém
          }
          return {
            xp: s.xp + earnedXp,
            streak,
            lastActiveDay: today,
            completedLessons: s.completedLessons.includes(lessonId)
              ? s.completedLessons
              : [...s.completedLessons, lessonId],
            bestScores: {
              ...s.bestScores,
              [lessonId]: Math.max(s.bestScores[lessonId] ?? 0, firstTryCorrect),
            },
          }
        }),

      currentStreak: () => {
        const { streak, lastActiveDay } = get()
        if (!lastActiveDay) return 0
        return daysBetween(lastActiveDay, todayKey()) > 1 ? 0 : streak
      },

      reset: () =>
        set({ xp: 0, streak: 0, lastActiveDay: null, completedLessons: [], bestScores: {} }),
    }),
    { name: 'claudelingo-progress' },
  ),
)
