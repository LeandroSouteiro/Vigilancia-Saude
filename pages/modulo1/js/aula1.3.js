/* ==========================================================================
   DADOS DO QUIZ - AULA 1.3
   Inclua este arquivo no HTML da Aula 1.3 ANTES de js/main.js:
     <script src="js/aula1.3.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "Sobre a Vigilância em Saúde no Brasil, de acordo com a Política Nacional de Vigilância em Saúde (PNVS), assinale a alternativa correta:",
    opts: [
      { letter: "A", text: "É um processo eventual e pontual, voltado apenas para epidemias de grande escala.  ", correct: false, exp: "A Vigilância em Saúde é um processo permanente, que demanda monitoramento das situações de normalidade, para identificar alterações em relação aos padrões esperados. Aplica-se à saúde e a doenças, sejam infecciosas transmissíveis ou crônicas não-transmissíveis, envolvendo seus fatores determinantes e condicionantes de origens diversas. Está presente em serviços de saúde, laboratórios, centros de gestão e pesquisa e também nas comunidades dos territórios, onde é possível analisar a saúde de coletividades.  " },
      { letter: "B", text: "Consiste em ações restritas à coleta de dados, sem envolver análise ou disseminação de informações. ", correct:false, exp: "A Vigilância em Saúde é um processo permanente, que demanda monitoramento das situações de normalidade, para identificar alterações em relação aos padrões esperados. Aplica-se à saúde e a doenças, sejam infecciosas transmissíveis ou crônicas não-transmissíveis, envolvendo seus fatores determinantes e condicionantes de origens diversas. Está presente em serviços de saúde, laboratórios, centros de gestão e pesquisa e também nas comunidades dos territórios, onde é possível analisar a saúde de coletividades. " },
      { letter: "C", text: "Tem como objetivo principal orientar o planejamento e a execução de medidas de saúde pública. ", correct: true, exp: "Uma das principais finalidades da Vigilância em Saúde é orientar o planejamento, aumentando a efetividade de medidas que podem ser aplicadas individual ou coletivamente para melhorar a Saúde Pública. Há medidas que só produzem o efeito esperado quando aplicadas coletivamente, o que, por vezes, demanda adesão de cada indivíduo e das coletividades." },
      { letter: "D", text: "Limita-se ao monitoramento de doenças transmissíveis, sem considerar fatores sociais e ambientais. ", correct: false, exp: "A Vigilância em Saúde é um processo permanente, que demanda monitoramento das situações de normalidade, para identificar alterações em relação aos padrões esperados. Aplica-se à saúde e a doenças, sejam infecciosas transmissíveis ou crônicas não-transmissíveis, envolvendo seus fatores determinantes e condicionantes de origens diversas. Está presente em serviços de saúde, laboratórios, centros de gestão e pesquisa e também nas comunidades dos territórios, onde é possível analisar a saúde de coletividades.  " },
      { letter: "E", text: "É uma prática exclusiva de laboratórios e centros de pesquisa, sem relação com comunidades locais.  ", correct: false, exp: "A Vigilância em Saúde é um processo permanente, que demanda monitoramento das situações de normalidade, para identificar alterações em relação aos padrões esperados. Aplica-se à saúde e a doenças, sejam infecciosas transmissíveis ou crônicas não-transmissíveis, envolvendo seus fatores determinantes e condicionantes de origens diversas. Está presente em serviços de saúde, laboratórios, centros de gestão e pesquisa e também nas comunidades dos territórios, onde é possível analisar a saúde de coletividades.  " }
    ]
  }
];

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO - AULA 1.3
   Usado pelo motor genérico em main.js (initInfographics). A chave
   "genomica" corresponde ao atributo data-infographic="genomica" no HTML.
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  genomica: [
    {
      icon: 'bi-geo-alt-fill',
      color: '#17b6d4',
      title: 'Objetivo 1',
      desc: 'Melhorar o acesso a ferramentas para ter uma melhor representação geográfica.',
      actions: [
        'Defender o valor da vigilância genômica junto aos criadores de políticas.',
        'Mapear e monitorar o panorama de capacidades e habilidades.',
        'Entregar soluções de tecnologia contextualizadas e sustentáveis.',
        'Estimular a inovação e a pesquisa para lidar com necessidades locais e globais.',
        'Moldar um mercado sustentável e de qualidade para maximizar o acesso.'
      ]
    },
    {
      icon: 'bi-people-fill',
      color: '#5b2a86',
      title: 'Objetivo 2',
      desc: 'Fortalecer a força de trabalho para fornecer resultados com velocidade, escala e qualidade.',
      actions: [
        'Implementar pacotes de treinamento em genômica e bioinformática.',
        'Promover comunidades de troca de conhecimento e prática.',
        'Implementar programas externos de avaliação de qualidade.',
        'Fortalecer programas para o desenvolvimento e a retenção da força de trabalho.'
      ]
    },
    {
      icon: 'bi-database-fill',
      color: '#f5a623',
      title: 'Objetivo 3',
      desc: 'Aprimorar o compartilhamento de dados e utilizá-los para melhorar as ações e a tomada de decisões, do nível local ao global, em saúde pública.',
      actions: [
        'Desenvolver consenso sobre padrões de dados e metadados.',
        'Estabelecer princípios de compartilhamento de dados e de acesso.',
        'Garantir acordos de compartilhamento de dados.',
        'Harmonizar normas, padrões, referências e materiais de referência.',
        'Tornar rotineiro o uso da genômica na prática de vigilância.'
      ]
    },
    {
      icon: 'bi-diagram-3-fill',
      color: '#f2622e',
      title: 'Objetivo 4',
      desc: 'Maximizar a conectividade para agregar valor de forma oportuna à arquitetura de vigilância mais ampla.',
      actions: [
        'Facilitar o compartilhamento de dados, espécimes e informações.',
        'Aumentar os vínculos das redes nos níveis local, regional e global.',
        'Implementar colaboração direcionada com parceiros de Uma Saúde.',
        'Fortalecer redes em contextos rotineiros, epidêmicos e pandêmicos.'
      ]
    },
    {
      icon: 'bi-shield-fill-check',
      color: '#ef4060',
      title: 'Objetivo 5',
      desc: 'Manter uma postura de prontidão para emergências.',
      actions: [
        'Testar e ampliar a capacidade dos sistemas de Vigilância Genômica.',
        'Estabelecer e apoiar projetos conjuntos para manutenção de habilidades.',
        'Implementar avaliações durante e após ações para fortalecimento das práticas.'
      ]
    }
  ]
};

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO 2 - AULA 1.3
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "ciclo7etapas" corresponde ao atributo data-infographic="ciclo7etapas"
   no HTML. Este infográfico não tem "ações estratégicas" (só descrição por
   etapa), então o campo "actions" fica de fora — o motor já sabe esconder
   essa parte do painel quando não existe.
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS.ciclo7etapas = [
  {
    icon: 'bi-megaphone-fill',
    color: '#0f9b8e',
    title: 'Detecção e comunicação',
    desc: 'Consiste em identificar um problema de saúde, evento de interesse em Saúde Pública ou situação de risco, e comunicá-lo às autoridades sanitárias. Para isso, é essencial criar e divulgar canais de comunicação acessíveis entre comunidade e gestores, garantindo que rumores, sinais e ocorrências sejam rapidamente notificados.'
  },
  {
    icon: 'bi-search',
    color: '#84cc16',
    title: 'Investigação',
    desc: 'Nesta fase, os dados são coletados e processados. Muitas vezes, começa pela checagem da veracidade de um rumor ou notícia e costuma envolver profissionais de saúde. A comunidade pode contribuir fornecendo informações locais, relatos e percepções que enriquecem a investigação.'
  },
  {
    icon: 'bi-bar-chart-line-fill',
    color: '#f7a600',
    title: 'Análise',
    desc: 'É o momento de interpretar os dados e transformá-los em informações úteis. A participação comunitária amplia a qualidade das análises, pois oferece uma visão mais próxima da realidade vivida, revelando nuances que os números isolados não mostram.'
  },
  {
    icon: 'bi-share-fill',
    color: '#e63950',
    title: 'Divulgação',
    desc: 'Refere-se ao compartilhamento das informações com os públicos interessados. Nem sempre tudo deve ser divulgado de forma ampla. Por isso, envolver representantes comunitários ajuda a decidir o que, como e para quem comunicar, evitando pânico social, combatendo notícias falsas e garantindo que a população receba orientações claras e úteis.'
  },
  {
    icon: 'bi-clipboard-check-fill',
    color: '#b24bf3',
    title: 'Planejamento',
    desc: 'Nesta etapa, definem-se ações e estratégias para proteger a saúde das populações em risco. A participação comunitária é fundamental para identificar vulnerabilidades locais, reconhecer ameaças específicas e propor soluções mais adequadas às condições de cada território.'
  },
  {
    icon: 'bi-gear-fill',
    color: '#6d28d9',
    title: 'Implementação',
    desc: 'É o momento de colocar em prática o que foi planejado. Muitas vezes, a resposta em Saúde Pública exige ação direta das comunidades. Quando elas conhecem e participam do planejamento, tornam-se parceiras na execução, fortalecendo a coesão e a efetividade das medidas.'
  },
  {
    icon: 'bi-eye-fill',
    color: '#2563eb',
    title: 'Avaliação e monitoramento',
    desc: 'Consiste em verificar se as medidas adotadas foram eficazes e efetivas, ajustando ou aperfeiçoando as respostas. Em situações crônicas, como endemias ou contaminações persistentes, essa etapa precisa ser contínua, reiniciando-se o ciclo desde a detecção múltiplas vezes. A comunidade desempenha papel crucial aqui: ninguém melhor do que ela para avaliar se o problema foi resolvido ou se persiste.'
  }
];

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO 3 - AULA 1.3
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "potenciaisGenomica" corresponde ao atributo data-infographic="potenciaisGenomica"
   no HTML. Substitui o antigo carrossel de imagens (#carouselGaleriaEduFlex):
   os 5 textos abaixo são exatamente os mesmos que estavam nas legendas dos
   slides (imgs/23.jpg a imgs/27.jpg), apenas realocados para o painel do
   infográfico. Assim como em "ciclo7etapas", não há "ações estratégicas"
   por item, então o campo "actions" fica de fora.
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS.potenciaisGenomica = [
  {
    icon: 'bi-search',
    color: '#f7a51e',
    title: 'Potencial 1',
    desc: 'Identificar patógenos com maior precisão, incluindo sua origem filogenética e cadeias de transmissão e clusters genômicos (aglomerados de casos com conexão), revelando vínculos entre eles.'
  },
  {
    icon: 'bi-diagram-3-fill',
    color: '#1fa3ba',
    title: 'Potencial 2',
    desc: 'Acompanhar a circulação e evolução dos agentes, comparando genes e construindo árvores filogenéticas (“genealógicas”) com base em pequenas diferenças no genoma.'
  },
  {
    icon: 'bi-exclamation-triangle-fill',
    color: '#e35d51',
    title: 'Potencial 3',
    desc: 'Avaliar riscos, prevendo o quão perigoso é um novo patógeno ou variante em termos de transmissibilidade, virulência, resistência a medicamentos antimicrobianos e/ou capacidade de escapar das vacinas.'
  },
  {
    icon: 'bi-capsule',
    color: '#8dbb27',
    title: 'Potencial 4',
    desc: 'Desenvolver vacinas, terapias e métodos diagnósticos mais rápidos e acessíveis.'
  },
  {
    icon: 'bi-clipboard2-pulse-fill',
    color: '#ac6ec3',
    title: 'Potencial 5',
    desc: 'Apoiar decisões de maior precisão em Saúde Pública, indicando medidas mais adequadas para conter surtos e epidemias.'
  }
];