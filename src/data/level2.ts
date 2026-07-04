import type { Level } from '../types'

export const level2: Level = {
  id: 2,
  slug: 'prompting',
  title: 'Prompting',
  tagline: 'Aprenda a falar a língua do Claude',
  lessons: [
    {
      id: '2-1',
      title: 'Anatomia de um bom prompt',
      exercises: [
        {
          type: 'mc',
          question: 'Qual destes prompts tende a dar o melhor resultado?',
          options: [
            '"Melhora esse texto"',
            '"Reescreva este e-mail para um cliente irritado: tom calmo, no máximo 5 frases, sem jargão"',
            '"Texto bom por favor"',
            '"Escreve aí"',
          ],
          correct: 1,
          explanation:
            'Bons prompts têm objetivo, contexto e restrições. Quanto mais específico o pedido, menos o Claude precisa adivinhar.',
        },
        {
          type: 'tf',
          statement: 'Dar exemplos do resultado esperado dentro do prompt melhora a resposta.',
          correct: true,
          explanation:
            'Isso se chama few-shot prompting: 1–3 exemplos ensinam formato e tom melhor do que parágrafos de descrição.',
        },
        {
          type: 'mc',
          question: 'Você quer a resposta num formato exato (tabela, JSON…). O que funciona melhor?',
          options: [
            'Torcer para vir no formato certo',
            'Pedir explicitamente o formato e, se possível, mostrar um exemplo',
            'Mandar o mesmo prompt várias vezes',
            'Usar letras maiúsculas',
          ],
          correct: 1,
          explanation:
            '"Responda em uma tabela com colunas X e Y" ou um exemplo do JSON esperado eliminam ambiguidade de formato.',
        },
        {
          type: 'mc',
          question: 'Por que dar um papel ao Claude ("você é um revisor de contratos…") ajuda?',
          options: [
            'É um truque de mágica sem efeito real',
            'Direciona vocabulário, critérios e nível de detalhe da resposta',
            'Faz o modelo responder mais rápido',
            'Desbloqueia recursos pagos',
          ],
          correct: 1,
          explanation:
            'O papel define a lente: um "revisor de contratos" presta atenção em riscos e cláusulas, não em estilo literário.',
        },
        {
          type: 'order',
          question: 'Ordene as partes de um prompt bem construído:',
          steps: [
            'Contexto: quem você é e qual a situação',
            'Tarefa: o que exatamente deve ser feito',
            'Restrições: tom, tamanho, formato',
            'Exemplo do resultado esperado',
          ],
          explanation:
            'Contexto → tarefa → restrições → exemplo é uma receita simples que resolve a maioria dos prompts do dia a dia.',
        },
      ],
    },
    {
      id: '2-2',
      title: 'Contexto é tudo',
      exercises: [
        {
          type: 'mc',
          question: 'O que é a "janela de contexto" do Claude?',
          options: [
            'A janela do navegador',
            'Tudo que o modelo consegue "ver" na conversa: mensagens, arquivos e instruções',
            'Um limite de tempo por resposta',
            'O histórico de todas as suas conversas',
          ],
          correct: 1,
          explanation:
            'O modelo só responde com base no que está na janela de contexto. O que ficou de fora, ele não sabe.',
        },
        {
          type: 'tf',
          statement: 'O Claude lembra automaticamente de todas as conversas anteriores, para sempre.',
          correct: false,
          explanation:
            'Cada conversa tem seu contexto. Recursos de memória e arquivos como CLAUDE.md existem justamente para carregar o que importa entre sessões.',
        },
        {
          type: 'mc',
          question: 'Sua conversa ficou longa e o Claude começou a se perder. O que fazer?',
          options: [
            'Continuar até travar',
            'Começar uma conversa nova resumindo o estado atual, ou pedir um resumo antes de continuar',
            'Digitar mais rápido',
            'Repetir a última mensagem 3 vezes',
          ],
          correct: 1,
          explanation:
            'Conversas muito longas diluem o foco. Resumir e recomeçar (ou usar /compact no Claude Code) devolve clareza ao contexto.',
        },
        {
          type: 'mc',
          question: 'Você quer ajuda com um bug. Qual mensagem dá mais contexto útil?',
          options: [
            '"Meu código não funciona"',
            '"Erro X na linha Y ao rodar Z; aqui está o trecho e o que eu já tentei"',
            '"Conserta isso"',
            '"Por que nada funciona nessa vida?"',
          ],
          correct: 1,
          explanation:
            'Erro exato + código + o que já foi tentado transforma adivinhação em diagnóstico.',
        },
        {
          type: 'tf',
          statement: 'Anexar o arquivo relevante é melhor do que descrever o arquivo de memória.',
          correct: true,
          explanation:
            'O Claude trabalha melhor com a fonte real. Descrições de memória perdem detalhes que costumam ser exatamente onde mora o bug.',
        },
      ],
    },
    {
      id: '2-3',
      title: 'CLAUDE.md',
      exercises: [
        {
          type: 'fill',
          question: 'Complete o nome do arquivo de contexto que o Claude Code lê ao iniciar num projeto:',
          template: '___.md',
          answers: ['claude', 'CLAUDE'],
          explanation:
            'O CLAUDE.md na raiz do projeto é lido automaticamente no início da sessão: é o manual do seu projeto para o Claude.',
        },
        {
          type: 'mc',
          question: 'O que faz sentido colocar no CLAUDE.md?',
          options: [
            'Senhas e chaves de API',
            'Como rodar o projeto, convenções de código e o que não tocar',
            'A história completa da empresa',
            'Todos os arquivos do projeto copiados',
          ],
          correct: 1,
          explanation:
            'CLAUDE.md guarda o essencial: comandos de build/teste, estrutura, convenções e limites. Curto e útil — segredos jamais.',
        },
        {
          type: 'tf',
          statement: 'Existe um comando no Claude Code que gera um CLAUDE.md inicial analisando seu projeto.',
          correct: true,
          explanation:
            'O /init explora o repositório e escreve um CLAUDE.md inicial, que você deve revisar e ajustar.',
        },
        {
          type: 'mc',
          question: 'Seu CLAUDE.md tem 800 linhas e o Claude parece ignorar partes dele. Qual o provável problema?',
          options: [
            'O arquivo está no formato errado',
            'Contexto demais: instruções longas diluem as importantes',
            'Faltou pagar o plano',
            'O Claude não lê markdown',
          ],
          correct: 1,
          explanation:
            'CLAUDE.md compete com o resto do contexto. Enxuto e direto (o que é único do SEU projeto) funciona melhor que um manual gigante.',
        },
        {
          type: 'mc',
          question: 'Além do CLAUDE.md do projeto, onde mais dá para ter instruções permanentes?',
          options: [
            'Num CLAUDE.md global do usuário (ex.: ~/.claude/CLAUDE.md)',
            'Só no código-fonte',
            'Num post-it no monitor',
            'Não dá',
          ],
          correct: 0,
          explanation:
            'O CLAUDE.md global vale para todos os seus projetos (suas preferências); o do projeto vale para quem trabalha nele.',
        },
      ],
    },
    {
      id: '2-4',
      title: 'Plan mode e iteração',
      exercises: [
        {
          type: 'mc',
          question: 'O que é o plan mode do Claude Code?',
          options: [
            'Um modo em que o Claude só planeja e não altera nada até você aprovar',
            'Um plano de assinatura',
            'Um cronômetro de produtividade',
            'Um modo turbo',
          ],
          correct: 0,
          explanation:
            'No plan mode o Claude explora o código e propõe um plano. Nada é modificado até você aprovar — ideal para mudanças grandes.',
        },
        {
          type: 'mc',
          question: 'Quando o plan mode vale mais a pena?',
          options: [
            'Para corrigir um typo',
            'Para mudanças grandes, ambíguas ou arriscadas',
            'Nunca',
            'Só em projetos novos',
          ],
          correct: 1,
          explanation:
            'Quanto maior o estrago possível, mais vale planejar antes. Para ajustes triviais, execução direta é mais rápida.',
        },
        {
          type: 'tf',
          statement: 'Se a primeira resposta veio errada, reescrever o pedido com mais contexto costuma funcionar melhor do que responder só "tá errado".',
          correct: true,
          explanation:
            '"Tá errado" não diz o que corrigir. Diga o que veio errado e o que esperava — ou edite o prompt original.',
        },
        {
          type: 'order',
          question: 'Ordene o fluxo de trabalho com plan mode:',
          steps: [
            'Descrever a tarefa em plan mode',
            'Claude explora o código e propõe um plano',
            'Você revisa e ajusta o plano',
            'Aprovar e deixar o Claude executar',
            'Verificar o resultado (testes, review)',
          ],
          explanation:
            'Planejar → revisar → executar → verificar. O plano barato de mudar é o que ainda não virou código.',
        },
        {
          type: 'fill',
          question: 'Complete: no Claude Code, o atalho de teclado clássico para alternar modos (incluindo plan mode) é Shift+___',
          template: 'Shift + ___',
          answers: ['tab'],
          explanation: 'Shift+Tab alterna entre os modos de permissão, incluindo o plan mode.',
        },
      ],
    },
  ],
}
