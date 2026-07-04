# ClaudeLingo

PWA estilo Duolingo (PT-BR) para aprender Claude/Claude Code. Sem backend: progresso em localStorage.

## Comandos

- `npm run dev` — dev server
- `npm run validate` — valida estrutura do conteúdo (`scripts/validate-content.mjs`)
- `npm run build` — validate + typecheck (tsc -b) + build; rode antes de commitar
- `npm run preview` — serve dist/ em :4173

## Estrutura

- `src/data/level*.ts` — conteúdo das lições (tipado por `src/types.ts`; união discriminada `Exercise`); **todas as lições têm exatamente 5 exercícios**, por consistência de ritmo
- `src/store/progress.ts` — XP/streak/desbloqueio (Zustand persist, chave `claudelingo-progress`)
- `src/components/exercises.tsx` — os 4 tipos de exercício (mc, tf, fill, order)
- `src/pages/` — Home (trilha), Lesson (fila com revisão de erros), Results, Profile, About
- Roteamento: HashRouter (compatível com GitHub Pages); base do Vite é `/learning-claude/`; `App.tsx` usa `key={lessonId}` na rota de lição para forçar remontagem ao trocar de lição

## Regras

- Conteúdo novo segue os tipos existentes; erros voltam ao fim da fila da lição
- Toda lição nova deve ter exatamente 5 exercícios (o `npm run validate` barra o build se não tiver)
- Progresso é identificado por `lessonId` (string), não por posição — inserir lições novas no meio da trilha não invalida o progresso de quem já começou
- Design: seguir PRODUCT.md e DESIGN.md (dark-only, laranja Claude, fonte pixel APENAS em display curto)
- Skills de design em `.claude/skills/` (impeccable, ui-ux-pro-max) — usar ao mexer em UI
- Fontes são self-hosted em `public/fonts/` (offline-first; não adicionar CDNs externos)

## Verificação de conteúdo

- `npm run validate` roda a cada build/CI: checa estrutura (4 opções por mc, índice `correct` válido, sem duplicatas, `___` em fill, ≥2 passos em order, 5 exercícios/lição)
- `scripts/e2e/full-sweep.mjs` é uma ferramenta manual (não roda no CI, exige Playwright à parte) que percorre a trilha inteira no navegador — rode antes de publicar mudanças grandes de conteúdo. Veja o cabeçalho do arquivo para instruções de uso.
