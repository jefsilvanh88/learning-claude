# ClaudeLingo 🕹️

**Como Duolingo, mas para aprender Claude.**

PWA gamificado em português para aprender a usar o Claude e o Claude Code de verdade: 7 níveis progressivos, 31 lições, 155 exercícios com feedback imediato, XP, estrelas e streak diário.

## Níveis

1. **Uso** — Chat, Code, Cowork, modelos, Projects e imagens/arquivos
2. **Prompting** — bons prompts, contexto, CLAUDE.md, plan mode, economia de tokens
3. **Ferramentas & MCP** — conectores, GitHub, permissões, slash commands, automação/notas/CRM
4. **Subagentes** — contexto isolado, paralelismo, orquestração
5. **Skills** — SKILL.md, skills de projeto vs pessoais, plugins
6. **Segurança** — API keys, sandbox, menor privilégio, prompt injection
7. **Autonomia** — hooks, rotinas agendadas, loops, autonomia gradual e com juízo

## Rodando localmente

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # build de produção (tsc + vite)
npm run preview   # serve o build em localhost:4173
```

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Zustand (progresso persistido em localStorage — sem backend)
- vite-plugin-pwa (instalável e 100% offline)
- Deploy automático no GitHub Pages via Actions (pasta `.github/workflows/`)

> Para o deploy funcionar, ative **Settings → Pages → Source: GitHub Actions** no repositório. O app é publicado em `https://<usuario>.github.io/learning-claude/`.

## Design

A direção visual (arcade acolhedor, dark + laranja Claude, fonte pixel só em display) está documentada em [PRODUCT.md](PRODUCT.md) e [DESIGN.md](DESIGN.md), construída com as skills [Impeccable](https://github.com/pbakaus/impeccable) e [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (instaladas em `.claude/skills/`).

---

Projeto independente de estudo. Claude é uma marca da Anthropic.
