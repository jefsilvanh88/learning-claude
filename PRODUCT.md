# ClaudeLingo — PRODUCT.md

## Register

product — app UI (aprendizado gamificado). O design serve o produto: clareza, foco na tarefa, recompensa visual pontual.

## O que é

PWA gamificado no estilo Duolingo para aprender a usar Claude e Claude Code: 7 níveis progressivos (Uso → Prompting → Ferramentas & MCP → Subagentes → Skills → Segurança → Autonomia), ~130 exercícios curtos com feedback imediato, XP e streak diário. 100% estático, offline-first, progresso no dispositivo.

## Quem usa

Devs e curiosos de IA brasileiros (PT-BR), a maioria vindo de anúncios no Instagram, estudando **no celular** em sessões de 5–10 minutos — no ônibus, na fila, antes de dormir. Tela pequena, uma mão, ambiente de pouca luz. Muitos nunca abriram um terminal; o app não pode assumir fluência técnica além de curiosidade.

## Resultado desejado

O usuário volta todo dia (streak), termina um nível por semana e sai do app sabendo *fazer* — escrever um CLAUDE.md, ligar um MCP, criar uma skill — não só reconhecer termos.

## Personalidade de marca

Arcade acolhedor. Retrô 8-bit sem ser infantil: o charme vem do pixel e do laranja Claude, a seriedade vem da tipografia legível e do conteúdo denso. Tom de voz: direto, caloroso, levemente brincalhão — nunca corporativo, nunca bobinho.

## Anti-referências

- Duolingo genérico re-skinado (verde → laranja e nada mais)
- SaaS dark-mode com glassmorphism e gradientes roxo-azul
- Visual "curso online" (thumbnails gritantes, setas, contadores de urgência)
- Infantilização: Comic Sans-alikes no corpo do texto, mascote onipresente

## Princípios estratégicos de design

1. **Uma tarefa por tela.** Exercício ocupa a tela toda; nada compete com a pergunta.
2. **Feedback é o produto.** A explicação pós-resposta é onde o aprendizado acontece — ela recebe hierarquia, não um toast descartável.
3. **Pixel é tempero, não prato.** Fonte pixel só em display curto (números de XP, nomes de nível, mascote); corpo de texto sempre em sans legível ≥16px.
4. **Polegar primeiro.** Ações primárias na metade inferior da tela, alvos ≥44px, navegação inferior com ≤4 itens.
5. **Offline é o caso normal.** Nenhum estado depende de rede; nada de spinners de carregamento remoto.
