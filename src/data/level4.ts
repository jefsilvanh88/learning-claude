import type { Level } from '../types'

export const level4: Level = {
  id: 4,
  slug: 'subagentes',
  title: 'Subagentes',
  tagline: 'Vários Claudes trabalhando para você',
  lessons: [
    {
      id: '4-1',
      title: 'O que são subagentes',
      exercises: [
        {
          type: 'mc',
          question: 'O que é um subagente no Claude Code?',
          options: [
            'Uma instância do Claude lançada para cumprir uma subtarefa com contexto próprio',
            'Um estagiário humano',
            'Um segundo computador',
            'Um plugin de teclado',
          ],
          correct: 0,
          explanation:
            'O agente principal delega: cria um subagente com instruções específicas, que trabalha isolado e devolve só o resultado.',
        },
        {
          type: 'tf',
          statement: 'O subagente compartilha a mesma janela de contexto do agente principal.',
          correct: false,
          explanation:
            'Cada subagente tem contexto próprio. É justamente essa a vantagem: a bagunça da exploração fica lá, só o resumo volta.',
        },
        {
          type: 'mc',
          question: 'Qual metáfora descreve melhor os subagentes?',
          options: [
            'Um chef que delega o corte e o molho para ajudantes e monta o prato final',
            'Uma fotocopiadora',
            'Um espelho',
            'Um cofre',
          ],
          correct: 0,
          explanation:
            'O agente principal orquestra; cada ajudante domina sua parte e reporta pronto. O chef não precisa ver cada casca de cebola.',
        },
        {
          type: 'mc',
          question: 'O que volta do subagente para o agente principal?',
          options: [
            'Todo o passo a passo, cada arquivo lido',
            'Apenas a resposta/resumo final do trabalho',
            'Nada',
            'Um arquivo de log de 10GB',
          ],
          correct: 1,
          explanation:
            'O subagente condensa horas de exploração em um relatório. O contexto do principal fica limpo para decidir o próximo passo.',
        },
        {
          type: 'tf',
          statement: 'Subagentes podem usar ferramentas (ler arquivos, rodar comandos), como o agente principal.',
          correct: true,
          explanation:
            'Cada subagente pode ter seu conjunto de ferramentas — inclusive restrito de propósito, como "só leitura" para exploração.',
        },
      ],
    },
    {
      id: '4-2',
      title: 'Contexto isolado',
      exercises: [
        {
          type: 'mc',
          question: 'Por que isolar contexto é tão valioso em tarefas grandes?',
          options: [
            'Porque logs volumosos de busca poluiriam o raciocínio do agente principal',
            'Porque é mais bonito',
            'Para gastar mais tokens',
            'Para esconder informações de você',
          ],
          correct: 0,
          explanation:
            'Explorar um repositório gigante gera montanhas de texto. Isolado no subagente, isso não dilui as decisões do orquestrador.',
        },
        {
          type: 'mc',
          question: 'Qual tarefa é perfeita para um subagente de busca?',
          options: [
            '"Onde está implementada a autenticação neste monorepo de 5000 arquivos?"',
            '"Quanto é 2+2?"',
            '"Renomeie esta variável"',
            '"Traduza esta frase"',
          ],
          correct: 0,
          explanation:
            'Fan-out de busca em muitos arquivos é o caso clássico: o subagente varre tudo e devolve só os caminhos relevantes.',
        },
        {
          type: 'tf',
          statement: 'Um subagente lembra do que outro subagente fez, automaticamente.',
          correct: false,
          explanation:
            'Subagentes não compartilham memória entre si. Quem coordena e passa informação entre eles é o agente principal.',
        },
        {
          type: 'mc',
          question: 'O resultado de um subagente parece incompleto. O que o orquestrador pode fazer?',
          options: [
            'Aceitar e seguir com informação ruim',
            'Enviar nova mensagem ao mesmo subagente ou lançar outro com instruções melhores',
            'Desistir da tarefa',
            'Reiniciar o computador',
          ],
          correct: 1,
          explanation:
            'Subagentes podem receber follow-ups mantendo seu contexto — ou você refina a instrução e relança.',
        },
        {
          type: 'mc',
          question: 'Instruções para subagentes devem ser…',
          options: [
            'Vagas, para deixar a criatividade fluir',
            'Específicas e completas: o subagente não vê a conversa que você teve antes',
            'Em letras maiúsculas',
            'Sempre em inglês',
          ],
          correct: 1,
          explanation:
            'O subagente começa "do zero": só sabe o que a instrução diz. Contexto incompleto = resultado incompleto.',
        },
      ],
    },
    {
      id: '4-3',
      title: 'Paralelismo',
      exercises: [
        {
          type: 'mc',
          question: 'Qual o grande ganho de lançar vários subagentes ao mesmo tempo?',
          options: [
            'Tarefas independentes rodam em paralelo em vez de uma por vez',
            'O texto fica colorido',
            'Usa menos energia',
            'Nenhum, é só marketing',
          ],
          correct: 0,
          explanation:
            'Pesquisar 4 bibliotecas, revisar 3 módulos, migrar N arquivos: se as partes não dependem umas das outras, paralelize.',
        },
        {
          type: 'mc',
          question: 'Quais tarefas NÃO devem rodar em paralelo?',
          options: [
            'As que dependem do resultado umas das outras',
            'As que são independentes',
            'As de leitura',
            'As pequenas',
          ],
          correct: 0,
          explanation:
            'Se a etapa B precisa do resultado de A, paralelizar gera trabalho errado. Dependência = sequência.',
        },
        {
          type: 'order',
          question: 'Ordene o fluxo de um trabalho paralelo bem feito:',
          steps: [
            'Quebrar a tarefa em partes independentes',
            'Lançar um subagente por parte, cada um com instrução completa',
            'Coletar os resultados de todos',
            'Integrar e resolver conflitos no agente principal',
          ],
          explanation:
            'Dividir → despachar → coletar → integrar. A integração final é papel do orquestrador.',
        },
        {
          type: 'tf',
          statement: 'Mais subagentes é sempre melhor: o ideal é lançar 20 para qualquer coisa.',
          correct: false,
          explanation:
            'Cada subagente custa tokens e coordenação. Use o mínimo que resolve — para tarefa pequena, nenhum: faça direto.',
        },
        {
          type: 'mc',
          question: 'Dois subagentes editando o mesmo arquivo ao mesmo tempo tende a causar…',
          options: [
            'Conflito: um sobrescreve o trabalho do outro',
            'O dobro de qualidade',
            'Nada, arquivos aceitam tudo',
            'Um backup automático',
          ],
          correct: 0,
          explanation:
            'Paralelize por arquivos/módulos distintos. Escrita concorrente no mesmo lugar é receita de conflito.',
        },
      ],
    },
    {
      id: '4-4',
      title: 'Quando (não) usar',
      exercises: [
        {
          type: 'mc',
          question: 'Para corrigir um typo num arquivo conhecido, o certo é…',
          options: [
            'Lançar 3 subagentes',
            'Editar direto, sem subagente nenhum',
            'Criar um comitê',
            'Reescrever o projeto',
          ],
          correct: 1,
          explanation:
            'Subagente tem custo de partida (re-explicar contexto). Tarefa pequena e localizada se faz na mão, direto.',
        },
        {
          type: 'mc',
          question: 'Qual cenário justifica um subagente especializado em revisão de código?',
          options: [
            'Revisar um diff grande com olhar independente, sem viés de quem escreveu',
            'Mudar a cor de um botão',
            'Ler um README',
            'Rodar um único teste',
          ],
          correct: 0,
          explanation:
            'Um revisor com contexto limpo não "se apaixona" pela solução: avalia o diff pelo que está escrito, como um colega de fora.',
        },
        {
          type: 'tf',
          statement: 'Dá para definir subagentes personalizados com nome, prompt e ferramentas próprias em .claude/agents/.',
          correct: true,
          explanation:
            'Arquivos markdown em .claude/agents/ definem agentes reutilizáveis: revisor, pesquisador, testador — cada um com seu perfil.',
        },
        {
          type: 'mc',
          question: 'O sinal claro de que a tarefa merece subagentes é…',
          options: [
            'Ela envolve muito material para vasculhar OU partes independentes OU precisa de visão imparcial',
            'Ela é urgente',
            'Ela é chata',
            'É sexta-feira',
          ],
          correct: 0,
          explanation:
            'Volume (isolar a bagunça), independência (paralelizar) e imparcialidade (contexto limpo) são os três gatilhos clássicos.',
        },
        {
          type: 'fill',
          question: 'Complete: no Claude Code, subagentes reutilizáveis são definidos em arquivos markdown na pasta .claude/___/',
          template: '.claude/___/',
          answers: ['agents'],
          explanation:
            'A pasta .claude/agents/ guarda as definições; o frontmatter define nome, descrição, modelo e ferramentas.',
        },
      ],
    },
  ],
}
