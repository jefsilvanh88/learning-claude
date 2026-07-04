# ClaudeLingo

PWA estilo Duolingo (PT-BR) para aprender Claude/Claude Code. Sem backend: progresso em localStorage.

## Comandos

- `npm run dev` — dev server
- `npm run build` — typecheck (tsc -b) + build; rode antes de commitar
- `npm run preview` — serve dist/ em :4173

## Estrutura

- `src/data/level*.ts` — conteúdo das lições (tipado por `src/types.ts`; união discriminada `Exercise`)
- `src/store/progress.ts` — XP/streak/desbloqueio (Zustand persist, chave `claudelingo-progress`)
- `src/components/exercises.tsx` — os 4 tipos de exercício (mc, tf, fill, order)
- `src/pages/` — Home (trilha), Lesson (fila com revisão de erros), Results, Profile, About
- Roteamento: HashRouter (compatível com GitHub Pages); base do Vite é `/learning-claude/`

## Regras

- Conteúdo novo segue os tipos existentes; erros voltam ao fim da fila da lição
- Design: seguir PRODUCT.md e DESIGN.md (dark-only, laranja Claude, fonte pixel APENAS em display curto)
- Skills de design em `.claude/skills/` (impeccable, ui-ux-pro-max) — usar ao mexer em UI
- Fontes são self-hosted em `public/fonts/` (offline-first; não adicionar CDNs externos)
