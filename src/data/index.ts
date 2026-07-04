import type { Level } from '../types'
import { level1 } from './level1'
import { level2 } from './level2'
import { level3 } from './level3'
import { level4 } from './level4'
import { level5 } from './level5'
import { level6 } from './level6'
import { level7 } from './level7'

export const levels: Level[] = [level1, level2, level3, level4, level5, level6, level7]

export function findLesson(lessonId: string) {
  for (const level of levels) {
    const idx = level.lessons.findIndex((l) => l.id === lessonId)
    if (idx !== -1) return { level, lesson: level.lessons[idx], indexInLevel: idx }
  }
  return null
}

export const totalLessons = levels.reduce((n, lv) => n + lv.lessons.length, 0)
export const totalExercises = levels.reduce(
  (n, lv) => n + lv.lessons.reduce((m, ls) => m + ls.exercises.length, 0),
  0,
)
