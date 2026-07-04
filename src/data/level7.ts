import type { Level } from '../types'

export const level7: Level = {
  id: 7,
  slug: 'autonomia',
  title: 'Autonomia',
  tagline: 'Faça o Claude operar sozinho',
  lessons: [
    {
      id: '7-1',
      title: 'Hooks',
      exercises: [
        {
          type: 'mc',
          question: 'O que são hooks no Claude Code?',
          options: [
            'Scripts que rodam automaticamente em eventos: antes/depois de ferramentas, no fim da sessão…',
            'Anotações que o próprio Claude faz para si durante o raciocínio',
            'Atalhos de teclado configuráveis pelo usuário',
            'Um tipo de skill que só funciona com MCP',
          ],
          correct: 0,
          explanation:
            'Hooks são automação determinística: no evento X, rode o script Y. Sempre, sem depender do modelo "lembrar".',
        },
        {
          type: 'mc',
          question: 'Qual a diferença fundamental entre um hook e uma instrução no CLAUDE.md?',
          options: [
            'Nenhuma',
            'O hook SEMPRE executa (é código); a instrução o modelo interpreta e pode escorregar',
            'Hooks são mais lentos',
            'Instruções são pagas',
          ],
          correct: 1,
          explanation:
            '"Sempre rode o lint" como instrução depende do modelo; como hook PostToolUse, é garantido. Regra dura = hook.',
        },
        {
          type: 'mc',
          question: 'Exemplo clássico de hook útil:',
          options: [
            'Rodar formatador/lint automaticamente após cada edição de arquivo',
            'Trocar o papel de parede',
            'Tocar uma música',
            'Abrir o navegador aleatoriamente',
          ],
          correct: 0,
          explanation:
            'PostToolUse + matcher de edição = todo arquivo salvo já sai formatado. Ninguém precisa lembrar de nada.',
        },
        {
          type: 'tf',
          statement: 'Um hook PreToolUse pode bloquear uma ação antes de ela acontecer.',
          correct: true,
          explanation:
            'Hooks de pré-execução podem validar e vetar: "nunca tocar na pasta migrations/", por exemplo. Guardrail de verdade.',
        },
        {
          type: 'fill',
          question: 'Complete: hooks são configurados no arquivo ___.json (do projeto ou do usuário)',
          template: '.claude/___.json',
          answers: ['settings'],
          explanation:
            'O settings.json define hooks, permissões e variáveis — a central de configuração do Claude Code.',
        },
      ],
    },
    {
      id: '7-2',
      title: 'Rotinas agendadas',
      exercises: [
        {
          type: 'mc',
          question: 'O que é uma rotina/trigger agendada para um agente?',
          options: [
            'Uma tarefa que dispara sozinha num horário: "toda manhã, resuma os e-mails novos"',
            'Uma tarefa que só roda se você estiver com o app aberto no momento',
            'Um comando que precisa ser digitado manualmente todo dia',
            'Um lembrete que só aparece, sem executar nada',
          ],
          correct: 0,
          explanation:
            'Agendamento transforma o agente em serviço: a tarefa roda sem você pedir, no ritmo que você definir.',
        },
        {
          type: 'mc',
          question: 'Qual formato clássico define agendamentos recorrentes?',
          options: ['cron', 'JPEG', 'CSV', 'MP3'],
          correct: 0,
          explanation:
            'Expressões cron ("0 9 * * 1-5" = 9h de seg a sex) são o padrão para definir recorrência.',
        },
        {
          type: 'tf',
          statement: 'Uma rotina agendada pode tanto continuar uma sessão existente quanto abrir uma sessão nova a cada disparo.',
          correct: true,
          explanation:
            'Continuar a sessão mantém contexto acumulado; sessão nova garante começo limpo. Escolha pelo tipo de tarefa.',
        },
        {
          type: 'mc',
          question: 'Boa candidata a rotina diária:',
          options: [
            '"Verifique os PRs abertos do time e resuma o que está travado"',
            '"Invente uma tarefa aleatória"',
            '"Apague arquivos antigos sem verificar"',
            '"Mande 500 e-mails de bom dia"',
          ],
          correct: 0,
          explanation:
            'Rotinas brilham em monitoramento e síntese recorrente: estado de PRs, inbox, métricas — trabalho chato que precisa ser feito sempre.',
        },
        {
          type: 'mc',
          question: 'Sua rotina agendada falhou de madrugada. O design correto prevê…',
          options: [
            'Silêncio eterno: ninguém fica sabendo',
            'Notificação/relato da falha para você ver de manhã',
            'Culpar o estagiário',
            'Rodar 100 vezes seguidas até passar',
          ],
          correct: 1,
          explanation:
            'Autonomia exige observabilidade: rotina que falha em silêncio é pior que rotina nenhuma.',
        },
      ],
    },
    {
      id: '7-3',
      title: 'Loops e monitoramento',
      exercises: [
        {
          type: 'mc',
          question: 'O que é "babysitting" de PR com um agente?',
          options: [
            'O agente monitora o PR: CI falhou, ele corrige; reviewer comentou, ele responde — até o merge',
            'Aprovar automaticamente qualquer mudança, sem revisão nenhuma',
            'Fechar o PR assim que ele é aberto',
            'Escrever a descrição do PR uma única vez, no início',
          ],
          correct: 0,
          explanation:
            'Você abre o PR e delega a manutenção: o agente reage a eventos do PR até ele ficar verde e mergeado.',
        },
        {
          type: 'mc',
          question: 'Num loop autônomo ("continue até os testes passarem"), o que é essencial definir?',
          options: [
            'Uma condição de parada clara (sucesso ou limite de tentativas)',
            'Nada, loop infinito é lindo',
            'A cor do terminal',
            'Um nome fofo para o loop',
          ],
          correct: 0,
          explanation:
            'Loop sem critério de parada queima recursos e pode piorar o código. Terminal state: verde, ou N tentativas e reporta.',
        },
        {
          type: 'tf',
          statement: 'Esperar um evento externo (CI, deploy) refazendo a mesma pergunta a cada 10 segundos é a forma mais eficiente.',
          correct: false,
          explanation:
            'Polling frenético desperdiça; o desenho certo usa eventos/webhooks quando existem, ou intervalos proporcionais ao ritmo real da coisa esperada.',
        },
        {
          type: 'mc',
          question: 'O agente autônomo tentou 5 vezes corrigir o CI e continua vermelho. Comportamento ideal?',
          options: [
            'Continuar tentando para sempre em silêncio',
            'Parar, resumir o diagnóstico e te chamar com o que descobriu',
            'Desabilitar o CI',
            'Fazer force-push na main',
          ],
          correct: 1,
          explanation:
            'Autonomia madura sabe escalar para o humano: "travei aqui, eis o que sei". Melhor que ruído infinito ou silêncio.',
        },
        {
          type: 'order',
          question: 'Ordene o ciclo de um agente monitorando um PR:',
          steps: [
            'Evento chega (CI falhou / comentário novo)',
            'Agente investiga a causa',
            'Aplica a correção e faz push',
            'Verifica se o PR ficou verde',
            'Repete até merge — ou escala para o humano',
          ],
          explanation:
            'Evento → diagnóstico → ação → verificação. O loop tem saída definida: merge ou escalar.',
        },
      ],
    },
    {
      id: '7-4',
      title: 'Autonomia com juízo',
      exercises: [
        {
          type: 'mc',
          question: 'A regra de ouro para dar mais autonomia a um agente é…',
          options: [
            'Aumentar autonomia junto com isolamento e reversibilidade',
            'Dar tudo de uma vez no primeiro dia',
            'Nunca dar autonomia nenhuma',
            'Deixar o agente decidir sozinho quanta autonomia quer',
          ],
          correct: 0,
          explanation:
            'Mais poder, mais contenção: ambiente isolado, mudanças via PR, ações externas com aprovação. Confiança se constrói por degraus.',
        },
        {
          type: 'tf',
          statement: 'Tarefas reversíveis (editar arquivo em branch) toleram mais autonomia que irreversíveis (enviar e-mail).',
          correct: true,
          explanation:
            'Reversibilidade é o eixo: o que o git desfaz pode ser autônomo; o que o mundo vê pede confirmação.',
        },
        {
          type: 'mc',
          question: 'Combinando tudo que você aprendeu: qual pipeline usa o Claude no máximo, com segurança?',
          options: [
            'Rotina agendada → subagentes exploram → skills guiam o padrão → hooks garantem qualidade → PR para revisão humana',
            'Acesso root em produção sem git',
            'Um prompt gigante toda segunda-feira, na mão',
            'Copiar e colar do chat para sempre',
          ],
          correct: 0,
          explanation:
            'As camadas se somam: agendamento (quando), subagentes (escala), skills (como), hooks (garantias), PR (portão humano). Isso é um sistema de IA operando de verdade.',
        },
        {
          type: 'mc',
          question: 'Antes de automatizar uma tarefa nova com autonomia alta, o que fazer primeiro?',
          options: [
            'Rodar supervisionado algumas vezes, ver o resultado, só então automatizar',
            'Automatizar direto e ver o que acontece',
            'Perguntar para outro agente se ele autoriza',
            'Esperar a tarefa dar errado uma vez para aprender',
          ],
          correct: 0,
          explanation:
            'Confiança se constrói observando o comportamento em casos reais e supervisionados antes de tirar as mãos do volante.',
        },
        {
          type: 'order',
          question: 'Ordene como aumentar a autonomia de um agente com segurança, do início ao fim:',
          steps: [
            'Supervisionar cada ação manualmente',
            'Pré-aprovar as ações repetitivas e seguras',
            'Deixar rodar sozinho em ambiente isolado, revisando o resultado depois',
            'Estender a mesma automação a ambientes mais críticos, só depois de confiança acumulada',
          ],
          explanation:
            'Autonomia é ganha em degraus, não concedida de uma vez: supervisão total → allowlist → isolamento sem supervisão → produção. Pular degraus é o que costuma dar errado.',
        },
      ],
    },
  ],
}
