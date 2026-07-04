import type { Level } from '../types'

export const level1: Level = {
  id: 1,
  slug: 'uso',
  title: 'Uso',
  tagline: 'Domine as formas de usar o Claude',
  lessons: [
    {
      id: '1-1',
      title: 'O que é o Claude',
      exercises: [
        {
          type: 'mc',
          question: 'O que é o Claude?',
          options: [
            'Um assistente de IA criado pela Anthropic',
            'Um editor de código',
            'Uma rede social para devs',
            'Um sistema operacional',
          ],
          correct: 0,
          explanation:
            'O Claude é uma família de modelos de IA da Anthropic. Você conversa com ele para escrever, programar, analisar e automatizar tarefas.',
        },
        {
          type: 'tf',
          statement: 'O Claude só serve para programadores.',
          correct: false,
          explanation:
            'O Claude ajuda em escrita, pesquisa, planilhas, documentos e automações. Programar é só uma das habilidades.',
        },
        {
          type: 'mc',
          question: 'Em quais lugares você pode usar o Claude?',
          options: [
            'Só no navegador',
            'Navegador, apps de celular/desktop, terminal e integrações',
            'Só no terminal',
            'Só dentro do VS Code',
          ],
          correct: 1,
          explanation:
            'O Claude está no claude.ai (web), em apps para iOS/Android/Mac/Windows, no terminal via Claude Code e em integrações como Slack e Chrome.',
        },
        {
          type: 'fill',
          question: 'Complete o endereço para usar o Claude no navegador:',
          template: 'https://___.ai',
          answers: ['claude'],
          explanation: 'O site oficial é claude.ai — é onde você conversa com o Claude na web.',
        },
        {
          type: 'mc',
          question: 'Qual empresa cria o Claude?',
          options: ['OpenAI', 'Google', 'Anthropic', 'Meta'],
          correct: 2,
          explanation:
            'A Anthropic é a empresa de pesquisa em IA que desenvolve o Claude, com foco em segurança.',
        },
      ],
    },
    {
      id: '1-2',
      title: 'Chat, Code e Cowork',
      exercises: [
        {
          type: 'mc',
          question: 'Para conversar, tirar dúvidas e escrever textos, o modo mais direto é…',
          options: [
            'Claude Chat (claude.ai ou apps)',
            'Claude Code no terminal',
            'A API da Anthropic',
            'Um servidor MCP',
          ],
          correct: 0,
          explanation:
            'O chat é a porta de entrada: conversa livre, arquivos anexados, artefatos e pesquisa. Sem instalação.',
        },
        {
          type: 'mc',
          question: 'O que é o Claude Code?',
          options: [
            'Um curso de programação',
            'Um agente que trabalha no seu computador/repositório: lê arquivos, edita código e roda comandos',
            'Um plugin de tema para o VS Code',
            'Um modelo de IA separado do Claude',
          ],
          correct: 1,
          explanation:
            'Claude Code é o Claude agindo como agente: navega no seu projeto, edita arquivos, executa comandos e faz commits — no terminal, no IDE ou na web.',
        },
        {
          type: 'tf',
          statement:
            'No Claude Code, o Claude consegue executar comandos e editar arquivos de verdade, não só sugerir.',
          correct: true,
          explanation:
            'Essa é a diferença de um agente: ele age. Por isso existem permissões — você controla o que ele pode executar.',
        },
        {
          type: 'mc',
          question: 'O que é o modo Cowork?',
          options: [
            'Um chat em grupo com outras pessoas',
            'O Claude trabalhando em tarefas longas de forma autônoma enquanto você acompanha',
            'Um editor de planilhas',
            'Um plano de assinatura',
          ],
          correct: 1,
          explanation:
            'No Cowork o Claude toca tarefas mais longas com autonomia (pesquisar, organizar arquivos, produzir documentos) e você supervisiona o andamento.',
        },
        {
          type: 'order',
          question: 'Ordene do menos autônomo para o mais autônomo:',
          steps: [
            'Chat: você pergunta, ele responde',
            'Claude Code assistido: ele age e pede permissão a cada passo',
            'Cowork/agente: ele executa uma tarefa longa e reporta no final',
          ],
          explanation:
            'A escada da autonomia: conversa → agente supervisionado → agente autônomo. Você escolhe o degrau conforme a confiança e o risco.',
        },
      ],
    },
    {
      id: '1-3',
      title: 'Modelos e escolhas',
      exercises: [
        {
          type: 'mc',
          question: 'Qual é a ideia de existirem modelos diferentes (Haiku, Sonnet, Opus…)?',
          options: [
            'São só nomes de versões antigas',
            'Equilibrar velocidade, custo e capacidade para cada tarefa',
            'Cada um fala um idioma',
            'São modelos de empresas diferentes',
          ],
          correct: 1,
          explanation:
            'Modelos menores são rápidos e baratos; maiores raciocinam melhor em tarefas difíceis. Escolha pelo trabalho a fazer.',
        },
        {
          type: 'mc',
          question: 'Para uma tarefa simples e repetitiva em massa, o mais eficiente costuma ser…',
          options: [
            'O modelo mais capaz',
            'Um modelo rápido e barato, como o Haiku',
            'Rodar duas vezes no modelo maior',
            'Tanto faz, o custo é igual',
          ],
          correct: 1,
          explanation:
            'Classificar, extrair e resumir em volume pedem velocidade e custo baixo. Guarde os modelos maiores para o que exige raciocínio profundo.',
        },
        {
          type: 'tf',
          statement: 'Depois de escolher um modelo, é impossível trocar no meio da conversa.',
          correct: false,
          explanation:
            'Dá para trocar de modelo entre mensagens no chat e no Claude Code (ex.: /model). A conversa continua.',
        },
        {
          type: 'fill',
          question: 'Complete o comando do Claude Code para trocar de modelo:',
          template: '/___',
          answers: ['model'],
          explanation: 'No Claude Code, /model mostra e troca o modelo em uso na sessão.',
        },
        {
          type: 'mc',
          question: 'Você quer refatorar um sistema complexo com muitas decisões de arquitetura. Qual perfil de modelo faz mais sentido?',
          options: [
            'O mais rápido possível',
            'O mais capaz em raciocínio, mesmo custando mais',
            'Qualquer um, o resultado é idêntico',
            'Um modelo de imagem',
          ],
          correct: 1,
          explanation:
            'Tarefas com muitas dependências e decisões se beneficiam dos modelos de topo (como Opus e a família 5). O custo extra se paga em retrabalho evitado.',
        },
      ],
    },
    {
      id: '1-4',
      title: 'Projects: contexto que persiste',
      exercises: [
        {
          type: 'mc',
          question: 'O que é um Project no claude.ai?',
          options: [
            'Um espaço com instruções e arquivos compartilhados, que todas as conversas dentro dele podem usar',
            'Um tipo de assinatura mais cara',
            'Um jogo dentro do chat',
            'Um limite de mensagens por dia',
          ],
          correct: 0,
          explanation:
            'Um Project é um workspace persistente: você define instruções e sobe arquivos de referência uma vez, e toda conversa aberta dentro dele já nasce com esse contexto.',
        },
        {
          type: 'mc',
          question: 'O que faz sentido colocar dentro de um Project?',
          options: [
            'Instruções personalizadas e arquivos de referência do assunto (docs, contratos, código)',
            'Sua senha do banco',
            'Nada, Projects são só uma pasta vazia',
            'Vídeos em alta resolução',
          ],
          correct: 0,
          explanation:
            'Instruções ("responda sempre em tom formal", "use as normas X") e arquivos de conhecimento (PDFs, planilhas, repositório) — tudo isso vira contexto automático para as conversas do Project.',
        },
        {
          type: 'tf',
          statement: 'Cada conversa nova dentro de um Project começa do zero, sem acesso aos arquivos que você subiu.',
          correct: false,
          explanation:
            'É o oposto: toda conversa dentro do Project herda as instruções e os arquivos dele. Essa é a razão de existir do recurso.',
        },
        {
          type: 'mc',
          question: 'Quando um Project vale mais a pena do que um chat solto?',
          options: [
            'Para uma pergunta rápida e isolada',
            'Quando você volta ao mesmo assunto várias vezes: uma pesquisa em andamento, um contrato específico, o material de um curso',
            'Nunca, chat solto sempre é melhor',
            'Só para times, nunca sozinho',
          ],
          correct: 1,
          explanation:
            'O ganho do Project é não repetir contexto. Assunto recorrente com os mesmos documentos de referência é o caso de uso ideal.',
        },
        {
          type: 'order',
          question: 'Ordene o fluxo de criar e usar um Project:',
          steps: [
            'Criar o Project e dar um nome claro',
            'Definir as instruções personalizadas',
            'Subir os arquivos de referência do assunto',
            'Abrir conversas dentro dele sempre que o assunto for esse',
          ],
          explanation:
            'Nomear → instruir → alimentar → conversar. Feito uma vez, cada conversa nova já parte pronta.',
        },
      ],
    },
  ],
}
