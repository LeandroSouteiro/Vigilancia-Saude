/* ==========================================================================
   DADOS DO QUIZ - AULA 2.1
   Página em branco (template) — substitua a pergunta de exemplo abaixo
   pelas questões reais desta aula.
   Inclua este arquivo no HTML da Aula 2.1 ANTES de js/main.js:
     <script src="js/aula2.1.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "O Sistema de Informações sobre Mortalidade (SIM) utiliza a Declaração de Óbito (DO) como documento base para registro dos óbitos no Brasil. Sobre o SIM e suas características, é CORRETO afirmar que:",
    opts: [
      { letter: "A", text: "A DO deve ser preenchida exclusivamente por médicos legistas em todos os casos de óbito ocorridos no país.", correct: false, exp: "<strong>Alternativa A está incorreta</strong>: A DO deve ser preenchida por médico que atendeu o paciente ou que verificou o óbito, não exclusivamente por médicos legistas." },
      { letter: "B", text: "A causa básica da morte registrada na DO corresponde à doença ou condição que iniciou a cadeia de eventos que levou diretamente ao óbito, sendo fundamental para as estatísticas de mortalidade.", correct: true, exp: "<strong>Alternativa B está correta</strong>: A causa básica é realmente a doença ou condição que iniciou a cadeia de eventos que resultou no óbito, conforme metodologia da CID-10." },
      { letter: "C", text: "O SIM registra apenas óbitos ocorridos em ambiente hospitalar, não contemplando óbitos domiciliares ou em via pública.", correct: false, exp: "<strong>Alternativa C está incorreta</strong>: O SIM registra óbitos ocorridos em qualquer local (hospital, domicílio, via pública etc.)." },
      { letter: "D", text: "A responsabilidade pela digitação e validação dos dados do SIM é exclusiva do Ministério da Saúde através do DATASUS.", correct: false, exp: "<strong>Alternativa D está incorreta</strong>: A responsabilidade pela digitação é do município, que envia ao estado, que consolida e envia ao DATASUS." }
    ]
  }
];

/* ==========================================================================
   DADOS DO FLUXOGRAMA INTERATIVO - AULA 2.1
   Usado pelo motor genérico em main.js (initFlowchart). A chave "coletaDados"
   corresponde ao atributo data-flowchart="coletaDados" no HTML.
   ========================================================================== */
window.EDUFLEX_FLOWCHARTS = {
  coletaDados: {
    levels: [
      {
        title: 'Nível local',
        sub: 'Ponta do sistema',
        icon: 'bi-hospital-fill',
        intro: 'Tudo começa nos pontos de atendimento: UBS, UPA, hospitais, laboratórios. Os profissionais de saúde são os responsáveis por gerar o registro inicial:',
        items: [
          'Médico que preenche DO.',
          'Enfermeiro que registra o nascimento na DNV.',
          'Profissional que notifica um caso de dengue no SINAN.',
          'Técnico que registra procedimentos no SAI.'
        ],
        note: 'A qualidade e completude desse primeiro registro são críticas, erros ou omissões nesta fase comprometem toda a cadeia de informação.'
      },
      {
        title: 'Nível municipal',
        sub: 'Coleta e validação inicial',
        icon: 'bi-building-fill',
        intro: 'A SMS recebe os formulários (fisicamente ou por sistemas eletrônicos locais) e os digita nos sistemas nacionais. O município é considerado o custodiante primário dos dados, e suas responsabilidades são:',
        items: [
          'Digitação dos dados.',
          'Validação inicial (verificar campos obrigatórios, consistências básicas).',
          'Investigação de casos notificados (no caso do SINAN).',
          'Busca ativa de subnotificações.',
          'Gestão local dos dados.',
          'Envio ao nível estadual.'
        ]
      },
      {
        title: 'Nível estadual',
        sub: 'Consolidação e validação avançada',
        icon: 'bi-bar-chart-fill',
        intro: 'A SES atua como um "centro de inteligência" intermediário, suas responsabilidades são:',
        items: [
          'Consolidação dos dados de todos os municípios.',
          'Validação avançada (cruzamento entre sistemas, identificação de inconsistências epidemiológicas).',
          'Apoio técnico aos municípios.',
          'Produção de análises epidemiológicas estaduais.',
          'Coordenação de respostas a emergências sanitárias.',
          'Envio ao nível federal.'
        ]
      },
      {
        title: 'Nível federal',
        sub: 'DATASUS',
        icon: 'bi-database-fill',
        intro: 'São responsabilidades desse nível:',
        items: [
          'Consolidação nacional.',
          'Manutenção da infraestrutura tecnológica.',
          'Estabelecimento de padrões e manuais técnicos.',
          'Processamento e crítica dos dados.',
          'Disponibilização pública dos dados.',
          {
            text: 'Retroalimentação aos estados e municípios.',
            linkWord: 'Retroalimentação',
            popoverTitle: 'Princípio da Retroalimentação',
            popoverContent: 'O DATASUS devolve informações processadas (indicadores, relatórios) para estados e municípios, auxiliando no planejamento local.'
          }
        ]
      }
    ]
  }
};
/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO - AULA 2.1
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "pesquisaSaude" corresponde ao atributo data-infographic="pesquisaSaude"
   no HTML. Substitui o antigo carrossel de imagens (#carouselExemplo): o
   texto de cada item é exatamente a legenda completa que estava em cada um
   dos 8 slides (imgs/05 a 12.jpg — nessa ordem), sem título, exibida como
   texto corrido no campo "desc". Não há "ações estratégicas" por item,
   então o campo "actions" fica de fora (mesmo padrão já usado em outras
   aulas).
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  pesquisaSaude: [
    { icon: 'bi-heart-pulse-fill', color: '#7bb242', title: 'Doenças crônicas não transmissíveis', desc: 'Prevalência autorreferida de hipertensão, diabetes, doenças cardíacas, AVC, asma, depressão, câncer.' },
    { icon: 'bi-exclamation-triangle-fill', color: '#f5ab18', title: 'Fatores de risco', desc: 'Tabagismo, consumo de álcool, alimentação (consumo de frutas, verduras, refrigerantes, sal), atividade física, sedentarismo.' },
    { icon: 'bi-gender-female', color: '#fa8001', title: 'Saúde da mulher', desc: 'Realização de mamografia, preventivo de câncer de colo de útero.' },
    { icon: 'bi-emoji-smile-fill', color: '#e0493c', title: 'Saúde bucal', desc: 'Última consulta ao dentista, perda dentária.' },
    { icon: 'bi-cone-striped', color: '#af41b2', title: 'Acidentes e violências', desc: 'Acidentes de trânsito, quedas, violência doméstica.' },
    { icon: 'bi-person-wheelchair', color: '#71559b', title: 'Capacidade funcional', desc: 'Dificuldades para atividades básicas (comer, tomar banho) e instrumentais (fazer compras, gerir finanças) da vida diária.' },
    { icon: 'bi-capsule', color: '#00739e', title: 'Uso de medicamentos', desc: 'Medicamentos em uso contínuo, acesso gratuito.' },
    { icon: 'bi-hospital', color: '#00b2be', title: 'Acesso a serviços', desc: 'Internações, atendimento de urgência, consultas médicas, exames.' }
  ]
};