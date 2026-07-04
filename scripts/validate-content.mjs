#!/usr/bin/env node
// Validação estrutural do conteúdo das lições: importa os dados de verdade
// (via esbuild, já usado pelo Vite) e checa invariantes — roda antes do
// build para pegar erros de digitação e inconsistências cedo.
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFile, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'

const here = dirname(fileURLToPath(import.meta.url))
const entry = join(here, '..', 'src', 'data', 'index.ts')
const outFile = join(tmpdir(), `claudelingo-content-${Date.now()}.mjs`)

await build({ entryPoints: [entry], outfile: outFile, bundle: true, format: 'esm', platform: 'node' })
const { levels } = await import(`file://${outFile}`)
await unlink(outFile)

const problems = []
const check = (cond, msg) => {
  if (!cond) problems.push(msg)
}

for (const level of levels) {
  check(level.lessons.length > 0, `nível ${level.id} (${level.slug}): sem lições`)

  for (const lesson of level.lessons) {
    check(lesson.id.startsWith(`${level.id}-`), `lição "${lesson.id}" não pertence ao nível ${level.id}`)
    check(lesson.title?.trim().length > 0, `lição ${lesson.id}: sem título`)
    check(
      lesson.exercises.length === 5,
      `lição ${lesson.id} (${lesson.title}): tem ${lesson.exercises.length} exercícios (padrão é 5)`,
    )

    lesson.exercises.forEach((ex, i) => {
      const tag = `lição ${lesson.id} ex${i + 1} (${ex.type})`
      check(typeof ex.explanation === 'string' && ex.explanation.trim().length > 0, `${tag}: sem explanation`)

      if (ex.type === 'mc') {
        check(Array.isArray(ex.options) && ex.options.length === 4, `${tag}: deveria ter exatamente 4 opções`)
        check(Number.isInteger(ex.correct) && ex.correct >= 0 && ex.correct < ex.options.length, `${tag}: "correct" fora do range`)
        const uniq = new Set(ex.options.map((o) => o.trim().toLowerCase()))
        check(uniq.size === ex.options.length, `${tag}: opções duplicadas`)
        check(ex.question?.trim().length > 0, `${tag}: pergunta vazia`)
      }

      if (ex.type === 'tf') {
        check(typeof ex.correct === 'boolean', `${tag}: "correct" deveria ser boolean`)
        check(ex.statement?.trim().length > 0, `${tag}: statement vazio`)
      }

      if (ex.type === 'fill') {
        check(ex.template?.includes('___'), `${tag}: template sem lacuna "___"`)
        check(Array.isArray(ex.answers) && ex.answers.length > 0, `${tag}: sem respostas aceitas`)
        check(ex.question?.trim().length > 0, `${tag}: pergunta vazia`)
      }

      if (ex.type === 'order') {
        check(Array.isArray(ex.steps) && ex.steps.length >= 2, `${tag}: menos de 2 passos`)
        const uniq = new Set(ex.steps?.map((s) => s.trim().toLowerCase()))
        check(uniq.size === ex.steps?.length, `${tag}: passos duplicados`)
        check(ex.question?.trim().length > 0, `${tag}: pergunta vazia`)
      }
    })
  }
}

// ids de lição globalmente únicos
const allIds = levels.flatMap((lv) => lv.lessons.map((l) => l.id))
const dupIds = allIds.filter((id, i) => allIds.indexOf(id) !== i)
check(dupIds.length === 0, `ids de lição duplicados: ${[...new Set(dupIds)].join(', ')}`)

const totalLessons = levels.reduce((n, lv) => n + lv.lessons.length, 0)
const totalExercises = levels.reduce((n, lv) => n + lv.lessons.reduce((m, l) => m + l.exercises.length, 0), 0)

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} problema(s) de conteúdo encontrados:\n`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error('')
  process.exit(1)
} else {
  console.log(
    `✓ conteúdo validado: ${levels.length} níveis, ${totalLessons} lições, ${totalExercises} exercícios — tudo consistente`,
  )
}
