# ClaudeLingo — DESIGN.md

## Tema

**Dark-only.** Cena: celular à noite, pouca luz ambiente, sessão curta antes de dormir — tela clara agrediria. O dark também é a identidade dos anúncios que originaram o produto. Não há tema claro na v1.

Estratégia de cor: **committed** — o laranja Claude carrega 30–40% da superfície visível (CTAs, trilha, progresso, streak), sobre um fundo quase-preto quente.

## Paleta (OKLCH)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `oklch(0.16 0.014 55)` | fundo do app (quase-preto quente, puxado ao âmbar) |
| `--surface` | `oklch(0.21 0.018 55)` | cards, exercícios, nav |
| `--surface-2` | `oklch(0.26 0.02 55)` | elementos elevados, opções de resposta |
| `--ink` | `oklch(0.95 0.01 75)` | texto principal |
| `--ink-muted` | `oklch(0.72 0.02 70)` | texto secundário (≥4.5:1 sobre surface) |
| `--brand` | `oklch(0.70 0.19 45)` | laranja Claude — CTAs, progresso, ativo |
| `--brand-deep` | `oklch(0.55 0.16 42)` | pressed, bordas de botão 3D |
| `--success` | `oklch(0.75 0.17 145)` | acerto |
| `--error` | `oklch(0.62 0.21 25)` | erro |
| `--gold` | `oklch(0.82 0.14 85)` | XP, estrelas |
| `--locked` | `oklch(0.40 0.01 55)` | níveis bloqueados |

Contraste verificado: ink sobre bg ≈ 13:1; ink-muted sobre surface ≥ 4.6:1; texto sobre brand usa `oklch(0.15 0.02 45)` (≈8:1).

## Tipografia

- **Display**: `"Silkscreen"` (pixel, self-hosted woff2) — SOMENTE títulos de nível, números de XP/streak, logo. Nunca em corpo ou botões longos. Tamanho mínimo 14px; letter-spacing normal.
- **Corpo/UI**: `"Nunito Sans"` (self-hosted woff2, pesos 400/700/900) com fallback `system-ui`. Corpo 16–17px, line-height 1.55. Botões e labels em 700/900.
- `text-wrap: balance` em headings; sem heading acima de 3rem no mobile.

## Componentes-chave

- **Botão primário**: pill retangular com cantos 12px, fundo `--brand`, borda inferior 4px `--brand-deep` (efeito 3D de arcade, como Duolingo); pressed = translateY(2px) + borda 2px. Texto 800, `--on-brand`.
- **Opção de resposta**: card `--surface-2`, borda 2px `oklch(0.32 0.02 55)`, borda inferior 4px; selecionada = borda `--brand`; correta = borda+tint `--success`; errada = `--error` + shake sutil.
- **Trilha (Home)**: nós circulares de lição em zigue-zague vertical suave, conectados por linha pontilhada; nível atual pulsa; bloqueados em `--locked` com cadeado SVG.
- **Barra de progresso da lição**: topo, 8px, track `--surface-2`, fill `--brand`, animada com transform.
- **Painel de feedback**: sheet fixa na base, verde/vermelho tintado, título curto + explicação de 1–3 frases + botão CONTINUAR ocupando a largura.
- **Streak**: chama SVG própria (não emoji) + número em Silkscreen dourado.
- **Ícones**: Lucide (stroke 2px) em toda a UI; nenhum emoji como ícone.

## Layout

- Mobile-first, coluna única `max-width: 480px` centrada; em desktop o app continua sendo um "telefone largo" centrado com a trilha — não vira dashboard.
- Espaçamento em escala de 4px (4/8/12/16/24/32/48).
- Nav inferior fixa (3 itens: Trilha, Perfil, Sobre) com `env(safe-area-inset-bottom)`; conteúdo com padding-bottom compensando.
- `min-height: 100dvh`; sem scroll horizontal em nenhuma viewport ≥320px.

## Motion

- Micro-interações 150–250ms, ease-out; pressed em 80ms.
- Acerto: painel de feedback sobe (translateY) + check com stroke-dash; erro: shake 3× de 4px na opção.
- XP no Results: contagem numérica animada + estrelas com stagger de 40ms.
- Tudo com alternativa em `@media (prefers-reduced-motion: reduce)` (crossfade/instantâneo).
- Sem animações de layout (width/height); só transform/opacity.

## Vozes proibidas (herdadas do Impeccable)

Sem gradient text, sem glassmorphism, sem side-stripes coloridas, sem eyebrows uppercase em toda seção, sem grids de cards idênticos, sem z-index 999.
