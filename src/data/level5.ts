import type { Level } from '../types'

export const level5: Level = {
  id: 5,
  slug: 'skills',
  title: 'Skills',
  tagline: 'Ensine truques novos ao Claude',
  lessons: [
    {
      id: '5-1',
      title: 'O que é uma skill',
      exercises: [
        {
          type: 'mc',
          question: 'O que é uma skill do Claude?',
          options: [
            'Um pacote de instruções (e opcionalmente scripts) que ensina o Claude a fazer algo do seu jeito',
            'Um certificado de curso',
            'Um modelo de IA novo',
            'Um atalho de teclado',
          ],
          correct: 0,
          explanation:
            'Skill = pasta com um SKILL.md (instruções, exemplos, regras) que o Claude carrega quando a tarefa combina com ela.',
        },
        {
          type: 'mc',
          question: 'Qual a diferença entre skill e prompt avulso?',
          options: [
            'Nenhuma',
            'A skill é permanente, reutilizável e carregada sob demanda; o prompt morre com a conversa',
            'Skills são pagas',
            'Prompts são mais poderosos',
          ],
          correct: 1,
          explanation:
            'A skill engarrafa um processo: escreveu uma vez, todo uso futuro (seu ou do time) ganha a mesma qualidade.',
        },
        {
          type: 'tf',
          statement: 'O Claude carrega todas as skills inteiras em todas as conversas, o tempo todo.',
          correct: false,
          explanation:
            'Skills usam "progressive disclosure": o Claude vê só nome+descrição e carrega o conteúdo completo apenas quando é relevante.',
        },
        {
          type: 'mc',
          question: 'Bons candidatos a virar skill são…',
          options: [
            'Tarefas que você repete com regras próprias: relatório semanal, review de PR, formatação de docs',
            'Coisas que você faz uma vez na vida',
            'Nada, skills são inúteis',
            'Só tarefas de programação',
          ],
          correct: 0,
          explanation:
            'Repetição + regras próprias = skill. Se você já explicou o mesmo processo 3 vezes ao Claude, é hora de engarrafar.',
        },
        {
          type: 'fill',
          question: 'Complete o nome do arquivo principal de uma skill:',
          template: '___.md',
          answers: ['skill', 'SKILL'],
          explanation:
            'Cada skill vive numa pasta com um SKILL.md — frontmatter (nome, descrição) + instruções no corpo.',
        },
      ],
    },
    {
      id: '5-2',
      title: 'Anatomia do SKILL.md',
      exercises: [
        {
          type: 'mc',
          question: 'O que vai no frontmatter (cabeçalho YAML) de um SKILL.md?',
          options: [
            'Nome e descrição — a descrição diz QUANDO a skill deve ser usada',
            'Sua senha do GitHub',
            'O código-fonte do Claude',
            'Nada, é decorativo',
          ],
          correct: 0,
          explanation:
            'A descrição é o gatilho: é por ela que o Claude decide carregar a skill. Descrição vaga = skill nunca usada.',
        },
        {
          type: 'mc',
          question: 'Qual descrição de skill funciona melhor?',
          options: [
            '"Ajuda com coisas"',
            '"Use ao gerar relatórios de vendas: puxa o padrão da empresa, tabelas X e Y, tom executivo"',
            '"Skill boa"',
            '"v2 final AGORA VAI"',
          ],
          correct: 1,
          explanation:
            'Descrições específicas com gatilhos claros ("use quando…") fazem a skill disparar na hora certa.',
        },
        {
          type: 'tf',
          statement: 'Uma skill pode incluir scripts e arquivos de apoio além do SKILL.md.',
          correct: true,
          explanation:
            'A pasta da skill pode ter scripts executáveis, templates e referências — o SKILL.md orquestra o uso deles.',
        },
        {
          type: 'order',
          question: 'Ordene os passos para criar uma boa skill:',
          steps: [
            'Identificar um processo que você repete',
            'Escrever o passo a passo e as regras no SKILL.md',
            'Escrever uma descrição com gatilhos claros',
            'Testar em casos reais e refinar',
          ],
          explanation:
            'Processo → instruções → gatilho → iteração. Skills boas nascem de uso real, não de teoria.',
        },
        {
          type: 'mc',
          question: 'Skills muito longas (5000 linhas) tendem a…',
          options: [
            'Funcionar melhor',
            'Poluir o contexto; melhor dividir em arquivos de referência carregados sob demanda',
            'Ganhar prêmios',
            'Rodar mais rápido',
          ],
          correct: 1,
          explanation:
            'O SKILL.md deve ser o mapa; detalhes vão em arquivos de referência que o Claude lê só quando precisa.',
        },
      ],
    },
    {
      id: '5-3',
      title: 'Onde vivem as skills',
      exercises: [
        {
          type: 'mc',
          question: 'Onde ficam as skills de um projeto no Claude Code?',
          options: ['.claude/skills/', 'C:/Windows/skills', '/etc/skills', 'na nuvem apenas'],
          correct: 0,
          explanation:
            'Skills do projeto: .claude/skills/ (compartilhadas via git). Skills pessoais: ~/.claude/skills/ (só suas, valem em qualquer projeto).',
        },
        {
          type: 'mc',
          question: 'Qual a diferença entre skill de projeto e skill pessoal?',
          options: [
            'A de projeto vai no repositório e vale para o time; a pessoal fica na sua máquina e vale para todos os seus projetos',
            'Nenhuma',
            'A pessoal é paga',
            'A de projeto é secreta',
          ],
          correct: 0,
          explanation:
            'Regra prática: processo do time → projeto; preferência sua → pessoal.',
        },
        {
          type: 'tf',
          statement: 'Plugins podem empacotar skills, comandos, agentes e servidores MCP juntos, para instalar de uma vez.',
          correct: true,
          explanation:
            'Plugin é o pacote de distribuição: um marketplace de plugins instala capacidades completas com um comando.',
        },
        {
          type: 'mc',
          question: 'Você criou uma skill ótima e quer que o time use. Melhor caminho?',
          options: [
            'Commitar em .claude/skills/ do repositório do time',
            'Mandar print por WhatsApp',
            'Guardar segredo',
            'Reescrever toda semana',
          ],
          correct: 0,
          explanation:
            'No repositório, a skill chega para todos via git pull — versionada e revisável como código.',
        },
        {
          type: 'mc',
          question: 'Skills funcionam só no Claude Code?',
          options: [
            'Sim, exclusivo do terminal',
            'Não — o ecossistema de skills também alcança o app do Claude e a API',
            'Só no Windows',
            'Só com internet',
          ],
          correct: 1,
          explanation:
            'O conceito de skill (pasta + SKILL.md) é usado no Claude Code, no claude.ai e via API — o mesmo pacote de conhecimento em vários lugares.',
        },
      ],
    },
    {
      id: '5-4',
      title: 'Skills na prática',
      exercises: [
        {
          type: 'mc',
          question: 'Sua skill não está sendo ativada quando deveria. Primeira coisa a checar?',
          options: [
            'A descrição no frontmatter: ela menciona os gatilhos/termos da tarefa?',
            'A cor do terminal',
            'O antivírus',
            'A fase da lua',
          ],
          correct: 0,
          explanation:
            'O Claude escolhe skills pela descrição. Inclua nela as palavras que aparecem nos pedidos reais ("use quando o usuário pedir X…").',
        },
        {
          type: 'tf',
          statement: 'Dá para invocar uma skill manualmente digitando /nome-da-skill.',
          correct: true,
          explanation:
            'Skills podem ser user-invocable: além da ativação automática, você chama direto como um slash command.',
        },
        {
          type: 'mc',
          question: 'Uma skill de "review de PR" do time deveria conter…',
          options: [
            'Os critérios do time: o que olhar, o que barrar, formato do feedback',
            'A lista de aniversariantes do mês',
            'Senhas do servidor',
            'Piadas',
          ],
          correct: 0,
          explanation:
            'A skill codifica o padrão do time — o review passa a ser consistente independente de quem (ou o quê) revisa.',
        },
        {
          type: 'mc',
          question: 'Qual é o ciclo de vida saudável de uma skill?',
          options: [
            'Escrever uma vez e nunca mais tocar',
            'Usar, notar falhas, refinar as instruções — como código',
            'Deletar toda semana',
            'Duplicar em 10 versões',
          ],
          correct: 1,
          explanation:
            'Skill é software de instruções: itera com o uso. Cada falha vira uma regra nova ou um exemplo melhor.',
        },
        {
          type: 'fill',
          question: 'Complete: skills pessoais, válidas em todos os seus projetos, ficam em ~/.___/skills/',
          template: '~/.___/skills/',
          answers: ['claude'],
          explanation: 'O diretório ~/.claude/ guarda sua configuração pessoal: skills, agentes, comandos e settings.',
        },
      ],
    },
  ],
}
