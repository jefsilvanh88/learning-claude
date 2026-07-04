// Varredura manual de QA: percorre as 31 lições da trilha (seedando o
// progresso incrementalmente) e confirma que cada uma renderiza e completa.
// Não faz parte do CI (exige Playwright + um browser instalado à parte) —
// é uma ferramenta de verificação humana antes de publicar conteúdo novo.
//
// Uso:
//   npm i -D playwright-core && npx playwright install chromium
//   npm run preview -- --port 4173 --strictPort &
//   node scripts/e2e/full-sweep.mjs
//
// Variáveis de ambiente opcionais:
//   BASE            URL base do app (padrão: localhost:4173/learning-claude/)
//   SHOTS           pasta para salvar screenshots (padrão: não salva nenhuma)
//   CHROMIUM_PATH   caminho de um executável Chromium específico

import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE || 'http://localhost:4173/learning-claude/'
const shots = process.env.SHOTS
if (shots) mkdirSync(shots, { recursive: true })

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
)
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const fails = []
const ok = (name, cond) => {
  console.log(`${cond ? 'PASS' : 'FAIL'} ${name}`)
  if (!cond) fails.push(name)
}
const known = new Map()

// ordem atual da trilha, usada só para o seeding incremental de progresso
const LESSON_IDS = [
  '1-1', '1-2', '1-3', '1-4', '1-5',
  '2-1', '2-2', '2-3', '2-4', '2-5',
  '3-1', '3-2', '3-3', '3-4', '3-5', '3-6',
  '4-1', '4-2', '4-3', '4-4',
  '5-1', '5-2', '5-3', '5-4',
  '6-1', '6-2', '6-3',
  '7-1', '7-2', '7-3', '7-4',
]

function seed(completed) {
  return page.evaluate((ids) => {
    localStorage.setItem(
      'claudelingo-progress',
      JSON.stringify({
        state: {
          xp: ids.length * 10,
          streak: 1,
          lastActiveDay: new Date().toISOString().slice(0, 10),
          completedLessons: ids,
          bestScores: {},
        },
        version: 0,
      }),
    )
  }, completed)
}

async function completeLesson() {
  let guard = 0
  while (!page.url().includes('/resultado/') && guard < 60) {
    guard++
    const q = (await page.locator('main h2').first().textContent()).trim()
    const fillInput = page.locator('main input[type="text"]')
    const isOrder = (await page.locator('main ol[aria-label="Sua ordem"]').count()) > 0

    if ((await fillInput.count()) > 0) {
      await fillInput.fill(known.get(q) ?? 'tentativa')
    } else if (isOrder) {
      const steps = known.get(q)
      const pool = page.locator('main div.border-t-2 button.option-card')
      if (steps) {
        for (const s of steps)
          await page.locator('main button.option-card', { hasText: s.slice(0, 30) }).last().click()
      } else {
        const n = await pool.count()
        for (let i = 0; i < n; i++) await pool.first().click()
      }
    } else {
      const target = known.get(q)
      if (target) await page.locator('main button.option-card', { hasText: target.slice(0, 30) }).first().click()
      else await page.locator('main button.option-card').first().click()
    }

    await page.getByRole('button', { name: 'Verificar', exact: true }).click()
    await page.getByRole('button', { name: 'Continuar', exact: true }).waitFor()

    if (isOrder) {
      const gab = page.locator('main ol.list-decimal li')
      if ((await gab.count()) > 0) known.set(q, (await gab.allTextContents()).map((s) => s.trim()))
      else
        known.set(
          q,
          (await page.locator('main ol[aria-label="Sua ordem"] button span:last-child').allTextContents()).map(
            (s) => s.trim(),
          ),
        )
    } else if ((await fillInput.count()) > 0) {
      const revealed = page.locator('main p.text-success span.font-mono')
      if ((await revealed.count()) > 0) known.set(q, (await revealed.textContent()).trim())
    } else {
      const correctBtn = page.locator('main button.option-card.option-correct')
      if ((await correctBtn.count()) > 0) known.set(q, (await correctBtn.first().textContent()).trim())
    }
    await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  }
  return guard
}

await page.goto(BASE, { waitUntil: 'networkidle' })

for (let i = 0; i < LESSON_IDS.length; i++) {
  const id = LESSON_IDS[i]
  await seed(LESSON_IDS.slice(0, i))
  await page.goto(`${BASE}#/licao/${id}`, { waitUntil: 'networkidle' })
  const hasH2 = (await page.locator('main h2').count()) > 0
  ok(`lição ${id} renderiza`, hasH2)
  if (!hasH2) continue
  const iters = await completeLesson()
  ok(`lição ${id} completa (${iters} iterações)`, page.url().includes(`/resultado/${id}`))
  if (shots) await page.screenshot({ path: `${shots}/${id}.png` })
}

await seed(LESSON_IDS)
await page.goto(`${BASE}#/`, { waitUntil: 'networkidle' })
if (shots) await page.screenshot({ path: `${shots}/home-completo.png`, fullPage: true })

await browser.close()
console.log(`\n${fails.length ? fails.length + ' FALHAS' : 'TUDO PASSOU'} — ${LESSON_IDS.length} lições verificadas`)
process.exit(fails.length ? 1 : 0)
