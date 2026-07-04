import type { Level } from '../types'

export const level3: Level = {
  id: 3,
  slug: 'ferramentas',
  title: 'Ferramentas & MCP',
  tagline: 'Conecte o Claude ao seu mundo',
  lessons: [
    {
      id: '3-1',
      title: 'O que é MCP',
      exercises: [
        {
          type: 'mc',
          question: 'O que significa MCP?',
          options: [
            'Model Context Protocol',
            'Multi Chat Program',
            'Machine Code Parser',
            'Master Control Program',
          ],
          correct: 0,
          explanation:
            'MCP (Model Context Protocol) é um protocolo aberto que padroniza como modelos de IA se conectam a ferramentas e dados externos.',
        },
        {
          type: 'mc',
          question: 'Na prática, um servidor MCP serve para…',
          options: [
            'Hospedar seu site',
            'Dar ao Claude acesso a um sistema externo: GitHub, banco de dados, Gmail, Figma…',
            'Acelerar a internet',
            'Treinar novos modelos',
          ],
          correct: 1,
          explanation:
            'Cada servidor MCP expõe ferramentas de um sistema. Conectou, o Claude passa a poder agir naquele sistema.',
        },
        {
          type: 'tf',
          statement: 'O MCP é exclusivo da Anthropic e só funciona com o Claude.',
          correct: false,
          explanation:
            'O MCP é um protocolo aberto adotado pelo ecossistema. Um mesmo servidor MCP pode servir diferentes clientes de IA.',
        },
        {
          type: 'mc',
          question: 'Uma analogia comum para o MCP é…',
          options: [
            'Um cabo USB-C para IA: um padrão único para plugar qualquer coisa',
            'Um antivírus',
            'Um formato de imagem',
            'Um teclado novo',
          ],
          correct: 0,
          explanation:
            'Antes, cada integração era um conector proprietário. O MCP padroniza o plug: qualquer ferramenta, o mesmo protocolo.',
        },
        {
          type: 'fill',
          question: 'Complete o comando do Claude Code para gerenciar servidores MCP:',
          template: 'claude ___ add',
          answers: ['mcp'],
          explanation:
            'claude mcp add / list / remove gerenciam os servidores MCP conectados ao Claude Code.',
        },
      ],
    },
    {
      id: '3-2',
      title: 'Conectores do dia a dia',
      exercises: [
        {
          type: 'mc',
          question: 'Com o conector do Gmail, o Claude pode…',
          options: [
            'Buscar e-mails, resumir threads e preparar rascunhos',
            'Deletar sua conta do Google',
            'Mudar sua senha',
            'Nada, é só decorativo',
          ],
          correct: 0,
          explanation:
            'Conectores dão capacidades específicas com escopo controlado: buscar, ler e rascunhar — você continua no comando do enviar.',
        },
        {
          type: 'mc',
          question: 'Você quer que o Claude leia uma página do Notion e crie um resumo em outra. O que precisa?',
          options: [
            'Copiar e colar tudo manualmente para sempre',
            'Conectar o Notion via conector/MCP e dar as permissões',
            'Imprimir a página',
            'Um plugin de navegador pago',
          ],
          correct: 1,
          explanation:
            'Com o conector do Notion o Claude busca, lê e cria páginas direto no seu workspace.',
        },
        {
          type: 'tf',
          statement: 'Com o conector do Figma, o Claude consegue transformar um design em código.',
          correct: true,
          explanation:
            'O MCP do Figma expõe o design (camadas, tokens, componentes) para o Claude implementar em código — o fluxo design-to-code.',
        },
        {
          type: 'mc',
          question: 'Qual é a ordem certa de raciocínio antes de conectar uma ferramenta?',
          options: [
            'Conectar tudo que existir, quanto mais melhor',
            'Perguntar: preciso disso? Que acessos estou dando? Confio na fonte?',
            'Conectar e nunca mais olhar',
            'Esperar alguém conectar por você',
          ],
          correct: 1,
          explanation:
            'Cada conector é um acesso real aos seus dados. Conecte o que usa, entenda o escopo e prefira fontes oficiais.',
        },
        {
          type: 'mc',
          question: 'O Claude pode pesquisar na internet?',
          options: [
            'Não, nunca',
            'Sim, com a busca web habilitada ele pesquisa e cita fontes',
            'Só se você colar os links',
            'Só em sites da Anthropic',
          ],
          correct: 1,
          explanation:
            'Com web search o Claude busca informação atual e referencia as fontes — essencial para fatos recentes.',
        },
      ],
    },
    {
      id: '3-3',
      title: 'GitHub e código',
      exercises: [
        {
          type: 'mc',
          question: 'Conectado ao GitHub, o Claude pode…',
          options: [
            'Ler repositórios, abrir PRs, revisar código e responder issues',
            'Apenas ver seu avatar',
            'Deletar a conta de outros usuários',
            'Minerar criptomoedas',
          ],
          correct: 0,
          explanation:
            'A integração com GitHub cobre o ciclo do dev: explorar código, criar branches, commits, PRs e reviews.',
        },
        {
          type: 'tf',
          statement: 'O Claude Code pode criar um commit com mensagem descritiva por conta própria, se você pedir.',
          correct: true,
          explanation:
            'Peça "commita isso" e ele analisa o diff, escreve a mensagem e executa — seguindo as convenções do seu projeto.',
        },
        {
          type: 'mc',
          question: 'O que é o fluxo "@claude" no GitHub?',
          options: [
            'Mencionar o Claude em uma issue/PR para ele trabalhar nela via GitHub Actions',
            'Um emoji especial',
            'Um tema escuro para o GitHub',
            'Uma rede social',
          ],
          correct: 0,
          explanation:
            'Com o Claude Code instalado no repositório (GitHub Actions), mencionar @claude numa issue ou PR dispara o agente para resolver a tarefa.',
        },
        {
          type: 'order',
          question: 'Ordene um fluxo saudável de feature com Claude Code:',
          steps: [
            'Criar uma branch para a mudança',
            'Implementar com o Claude e revisar o diff',
            'Rodar testes e build',
            'Commit e push',
            'Abrir PR para revisão',
          ],
          explanation:
            'Branch → implementar → verificar → commit → PR. O Claude acelera cada etapa, mas o fluxo de engenharia continua o mesmo.',
        },
        {
          type: 'mc',
          question: 'Você pediu um PR e o CI falhou. O que dá para fazer com o Claude?',
          options: [
            'Pedir para ele ler os logs do CI, diagnosticar e corrigir',
            'Apagar o repositório',
            'Desativar o CI para sempre',
            'Nada, CI é problema de outro time',
          ],
          correct: 0,
          explanation:
            'O Claude lê logs de CI, encontra a causa e propõe o fix — e pode até monitorar o PR e reagir sozinho a falhas.',
        },
      ],
    },
    {
      id: '3-4',
      title: 'Permissões de ferramentas',
      exercises: [
        {
          type: 'mc',
          question: 'Por que o Claude Code pede permissão antes de rodar certos comandos?',
          options: [
            'Para te atrasar',
            'Porque comandos alteram o sistema de verdade — você decide o que é permitido',
            'Por exigência do governo',
            'É um bug conhecido',
          ],
          correct: 1,
          explanation:
            'Um agente que executa comandos precisa de limites. O sistema de permissões deixa você aprovar, negar ou pré-autorizar ações.',
        },
        {
          type: 'mc',
          question: 'Onde ficam as permissões pré-aprovadas de um projeto no Claude Code?',
          options: [
            'Em .claude/settings.json',
            'Num e-mail da Anthropic',
            'No histórico do navegador',
            'Não existe isso',
          ],
          correct: 0,
          explanation:
            'O settings.json (do projeto ou do usuário) guarda allowlists: comandos e ferramentas que podem rodar sem perguntar.',
        },
        {
          type: 'tf',
          statement: 'Pré-aprovar "npm test" no allowlist é razoável; pré-aprovar "rm -rf" não é.',
          correct: true,
          explanation:
            'Allowlist é para ações frequentes e seguras (testes, lint, build). Comandos destrutivos merecem aprovação caso a caso.',
        },
        {
          type: 'mc',
          question: 'O que faz o modo "aceitar edições" (accept edits)?',
          options: [
            'Aceita automaticamente edições de arquivo, mas ainda pergunta para comandos arriscados',
            'Aceita tudo sem perguntar nada, sempre',
            'Bloqueia todas as edições',
            'Muda o tema do terminal',
          ],
          correct: 0,
          explanation:
            'Os modos de permissão são degraus: plan (nada), normal (pergunta), accept edits (edições liberadas). Você escolhe por tarefa.',
        },
        {
          type: 'mc',
          question: 'Um servidor MCP desconhecido pede acesso amplo ao seu sistema. Atitude certa?',
          options: [
            'Instalar sem ler',
            'Desconfiar: verificar a fonte, o escopo pedido e instalar só se confiar',
            'Desligar o computador',
            'Dar acesso e torcer',
          ],
          correct: 1,
          explanation:
            'Servidores MCP executam com seus acessos. Trate como qualquer software: fonte confiável e menor privilégio possível.',
        },
      ],
    },
    {
      id: '3-5',
      title: 'Slash commands',
      exercises: [
        {
          type: 'fill',
          question: 'Complete o comando que limpa o contexto da conversa no Claude Code:',
          template: '/___',
          answers: ['clear'],
          explanation:
            '/clear zera o contexto da sessão — útil ao trocar completamente de tarefa.',
        },
        {
          type: 'mc',
          question: 'O que faz o /compact?',
          options: [
            'Compacta arquivos em .zip',
            'Resume a conversa para liberar espaço no contexto, mantendo o essencial',
            'Diminui a fonte do terminal',
            'Fecha o Claude Code',
          ],
          correct: 1,
          explanation:
            'Quando a sessão cresce, /compact resume o histórico e mantém o trabalho seguindo com contexto enxuto.',
        },
        {
          type: 'mc',
          question: 'Como criar um comando seu, ex.: /revisar?',
          options: [
            'Criar um arquivo markdown com o prompt em .claude/commands/',
            'Mandar e-mail para a Anthropic',
            'Não é possível',
            'Recompilar o Claude Code',
          ],
          correct: 0,
          explanation:
            'Slash commands personalizados são arquivos .md em .claude/commands/ — o nome do arquivo vira o comando.',
        },
        {
          type: 'tf',
          statement: 'O /init gera um CLAUDE.md inicial para o projeto.',
          correct: true,
          explanation:
            'O /init analisa a estrutura do repositório e escreve a primeira versão do CLAUDE.md para você revisar.',
        },
        {
          type: 'mc',
          question: 'Qual a diferença entre um slash command e simplesmente digitar o pedido?',
          options: [
            'Nenhuma, é frescura',
            'O comando empacota um prompt pronto e repetível — padroniza fluxos que você usa sempre',
            'Comandos são mais lentos',
            'Comandos custam mais caro',
          ],
          correct: 1,
          explanation:
            'Um bom slash command é um fluxo de trabalho engarrafado: mesma qualidade toda vez, sem redigitar instruções.',
        },
      ],
    },
  ],
}
