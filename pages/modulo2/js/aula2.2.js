/* ==========================================================================
   DADOS DO QUIZ - AULA 2.2
   Inclua este arquivo no HTML da Aula 2.2 ANTES de js/main.js:
     <script src="js/aula2.2.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "O uso de <em>linkage</em> de bases climáticas/ambientais, educacionais e sociais na vigilância em saúde é mais bem justificado quando:",
    opts: [
      { letter: "A", text: "O objetivo é apenas ampliar o número de variáveis disponíveis, sem definir produto ou hipótese de trabalho.", correct: false, exp: "O principal objetivo do <em>linkage</em> não é apenas reunir um grande volume de dados, substituir os sistemas existentes ou ampliar o acesso às informações. Seu papel é integrar diferentes bases para compreender a interação entre exposições, vulnerabilidades e desfechos em saúde, produzindo informações úteis para o planejamento, a prevenção e a tomada de decisão, sempre respeitando princípios éticos e de proteção de dados. " },
      { letter: "B", text: "O objetivo é entender como exposições e vulnerabilidades se combinam no território para antecipar riscos e orientar decisões.", correct: true, exp: "Você identificou corretamente que o <em>linkage</em> é uma estratégia para integrar diferentes fontes de informação, permitindo compreender como fatores ambientais, sociais, educacionais e de saúde se combinam na produção dos riscos. Essa abordagem fortalece a Vigilância em Saúde ao possibilitar intervenções mais preventivas, territorializadas e orientadas por evidências, sem substituir os sistemas tradicionais de informação. " },
      { letter: "C", text: "O objetivo é substituir os sistemas clássicos de vigilância epidemiológica.", correct: false, exp: "O principal objetivo do <em>linkage</em> não é apenas reunir um grande volume de dados, substituir os sistemas existentes ou ampliar o acesso às informações. Seu papel é integrar diferentes bases para compreender a interação entre exposições, vulnerabilidades e desfechos em saúde, produzindo informações úteis para o planejamento, a prevenção e a tomada de decisão, sempre respeitando princípios éticos e de proteção de dados. " },
      { letter: "D", text: "O objetivo é divulgar microdados integrados para uso público irrestrito.", correct: false, exp: "O principal objetivo do <em>linkage</em> não é apenas reunir um grande volume de dados, substituir os sistemas existentes ou ampliar o acesso às informações. Seu papel é integrar diferentes bases para compreender a interação entre exposições, vulnerabilidades e desfechos em saúde, produzindo informações úteis para o planejamento, a prevenção e a tomada de decisão, sempre respeitando princípios éticos e de proteção de dados. " }
    ]
  }
];

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO (HOTSPOT) - AULA 2.2
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "mvpPassos" corresponde ao atributo data-infographic="mvpPassos" no HTML.
   Mesmo padrão do "ciclo7etapas" da aula 1.3: pontos clicáveis sobre uma
   imagem (imgs/infografico-mvp-linkage.jpg), cada um abrindo a descrição no
   painel ao lado. Sem "actions" (só descrição por passo), igual ciclo7etapas.
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  mvpPassos: [
  {
    icon: 'bi-patch-question-fill',
    title: 'Passo 1 · Pergunta e produto',
    color: '#fd5303',
    desc: 'Defina a pergunta e o produto. Exemplo: "Quais bairros apresentam maior risco de internação por causas respiratórias durante episódios de fumaça?" Produto: mapa semanal de risco com estratificação por vulnerabilidade.'
  },
  {
    icon: 'bi-database-fill',
    title: 'Passo 2 · Dados e janela',
    color: '#ebc400',
    desc: 'Liste bases necessárias e defina janela temporal. Para fumaça: qualidade do ar (ou proxy), internações por causas respiratórias, população vulnerável (idosos/crianças), e indicador social.'
  },
  {
    icon: 'bi-geo-alt-fill',
    title: 'Passo 3 · Unidade espacial',
    color: '#a0c915',
    desc: 'Defina unidade de análise (bairro, município, setor censitário) e avalie viabilidade de privacidade. Se a unidade for muito granular, ajuste divulgação para agregação segura.'
  },
  {
    icon: 'bi-card-checklist',
    title: 'Passo 4 · Preparação e padronização',
    color: '#12af9a',
    desc: 'Limpeza de campos, padronização de datas, normalização de texto, deduplicação quando cabível, documentação do dicionário de dados.'
  },
  {
    icon: 'bi-clipboard-check-fill',
    title: 'Passo 5 · <em>Linkage</em> e validação',
    color: '#137fb0',
    desc: 'Escolha método (determinístico/probabilístico). Estime e documente erro. Rode checagens de consistência.'
  },
  {
    icon: 'bi-bar-chart-fill',
    title: 'Passo 6 · Indicadores e visualização',
    color: '#693aa4',
    desc: 'Transforme clima/ambiente em indicador (ex.: percentil de PM2,5 por semana; dias consecutivos acima do limiar), estratifique por vulnerabilidade, produza alertas.'
  },
  {
    icon: 'bi-shield-check',
    title: 'Passo 7 · Rotina e governança',
    color: '#a3399e',
    desc: 'Defina periodicidade, responsáveis, controle de versão e regras de acesso. Sem governança, a integração vira risco — e a vigilância perde legitimidade.'
  }
  ]
};