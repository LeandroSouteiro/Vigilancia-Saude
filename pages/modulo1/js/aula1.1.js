/* ==========================================================================
   DADOS DO QUIZ - AULA 1.1
   Inclua este arquivo no HTML da Aula 1.1 ANTES de js/main.js:
     <script src="js/aula1.1.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "A Vigilância em Saúde no SUS tem como função principal: ",
    opts: [
      { letter: "A", text: "Executar ações isoladas de controle de doenças.", correct: false, exp: "A Vigilância em Saúde no SUS atua de forma integrada para identificar, acompanhar e agir sobre riscos, agravos e seus determinantes. " },
      { letter: "B", text: "Produzir informações sem articulação com a gestão.", correct: false, exp: "A Vigilância em Saúde no SUS atua de forma integrada para identificar, acompanhar e agir sobre riscos, agravos e seus determinantes. " },
      { letter: "C", text: "Conhecer, monitorar e intervir sobre riscos, agravos e determinantes da saúde.", correct: true, exp: "A Vigilância em Saúde no SUS atua de forma integrada para identificar, acompanhar e agir sobre riscos, agravos e seus determinantes. " },
      { letter: "D", text: "Centralizar decisões no nível federal. ", correct: false, exp: "A Vigilância em Saúde no SUS atua de forma integrada para identificar, acompanhar e agir sobre riscos, agravos e seus determinantes. " }
    ]
  }
];

/* ==========================================================================
   DADOS DA TIMELINE HISTÓRICA - AULA 1.1
   Usado pelo motor genérico em main.js (initHistoryTimeline). A chave
   "historico" corresponde ao atributo data-timeline="historico" no HTML.
   ========================================================================== */
window.EDUFLEX_TIMELINES = {
  historico: [
    {
      num: '01',
      era: '',
      title: 'Segunda metade do século XX',
      desc: 'O modelo, predominante nesse período, caracterizava-se por forte centralização decisória, normatização rígida e intervenções predominantemente verticalizadas, com pouca articulação com os territórios e com as condições sociais, econômicas e ambientais que determinam o processo saúde-doença. A vigilância era concebida, majoritariamente, como instrumento de contenção de riscos biológicos, voltado à proteção da coletividade por meio do controle e da coerção, e não como parte de uma política pública orientada por direitos.'
    },
    {
      num: '02',
      era: '',
      title: 'Reforma Sanitária Brasileira',
      desc: 'A partir da Reforma Sanitária Brasileira, o modelo anterior passa a ser profundamente questionado. O movimento sanitário introduz uma crítica estrutural ao modelo biomédico e centralizador, defendendo a saúde como direito de cidadania e dever do Estado, bem como a necessidade de reorganizar as práticas de saúde a partir das necessidades reais da população.'
    },
    {
      num: '03',
      era: '',
      title: 'Constituição Federal de 1988 e SUS',
      desc: 'Com a Constituição Federal de 1988 e a criação do SUS, a vigilância deixa de ser uma ação isolada e passa a integrar um sistema público universal, descentralizado e participativo, assumindo papel estratégico na formulação, no planejamento e na avaliação das políticas de saúde.'
    }
  ]
};

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO - AULA 1.1
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "territorioDengue" corresponde ao atributo data-infographic="territorioDengue"
   no HTML. Substitui o antigo carrossel de imagens (#carouselGaleriaEduFlex,
   imgs/10 a 13.jpg — nessa ordem). A imagem de referência traz só os números
   1 a 4 (sem título por item), então, como já fizemos em outras aulas nesse
   mesmo formato, o campo "title" fica vazio e o texto completo de cada
   legenda original vai para "desc". Não há "ações estratégicas" por item,
   então o campo "actions" fica de fora (mesmo padrão já usado em outras
   aulas).
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  territorioDengue: [
    {
      icon: 'bi-trash3-fill',
      color: '#3775b6',
      title: '',
      desc: 'Bairros com maior precariedade de saneamento, coleta irregular de lixo e acúmulo de água.'
    },
    {
      icon: 'bi-houses-fill',
      color: '#2c978d',
      title: '',
      desc: 'Áreas de expansão urbana desordenada, com ocupações irregulares.'
    },
    {
      icon: 'bi-airplane-fill',
      color: '#ba7c1e',
      title: '',
      desc: 'Fluxos populacionais intensos, como regiões turísticas, áreas portuárias e zonas de grande mobilidade diária.'
    },
    {
      icon: 'bi-hospital-fill',
      color: '#d43d41',
      title: '',
      desc: 'Desigualdades socioeconômicas, que aumentam a exposição ao vetor e dificultam o acesso aos serviços de saúde.'
    }
  ]
};