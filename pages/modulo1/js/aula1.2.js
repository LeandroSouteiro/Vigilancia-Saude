/* ==========================================================================
   DADOS DO QUIZ - AULA 1.2
   Inclua este arquivo no HTML da Aula 1.2 ANTES de js/main.js:
     <script src="js/aula1.2.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [  
  {
    q: "A Política Nacional de Vigilância em Saúde (PNVS) estabelece diversos princípios que orientam as ações de vigilância no SUS. Entre eles, o princípio do conhecimento do território utiliza ferramentas específicas para definir prioridades. Qual é a principal ferramenta utilizada para conhecimento do território segundo a PNVS? ",
    opts: [
      { letter: "A", text: "Censo demográfico e pesquisas de opinião pública. ", correct: false, exp: "O princípio do conhecimento do território estabelecido pela PNVS utiliza especificamente a epidemiologia e a avaliação de risco para a definição de prioridades nos processos de planejamento, alocação de recursos e orientação programática.  " },
      { letter: "B", text: "Epidemiologia e avaliação de risco para definição de prioridades.", correct: true, exp: "O princípio do conhecimento do território estabelecido pela PNVS utiliza especificamente a epidemiologia e a avaliação de risco para a definição de prioridades nos processos de planejamento, alocação de recursos e orientação programática." },
      { letter: "C", text: "Orçamento público e análise de custos dos serviços. ", correct: false, exp: "O princípio do conhecimento do território estabelecido pela PNVS utiliza especificamente a epidemiologia e a avaliação de risco para a definição de prioridades nos processos de planejamento, alocação de recursos e orientação programática.  " },
      { letter: "D", text: "Registros hospitalares e prontuários eletrônicos.", correct: false, exp: "O princípio do conhecimento do território estabelecido pela PNVS utiliza especificamente a epidemiologia e a avaliação de risco para a definição de prioridades nos processos de planejamento, alocação de recursos e orientação programática.  " },
      { letter: "E", text: "Mapeamento geográfico e análise de infraestrutura urbana.", correct: false, exp: "O princípio do conhecimento do território estabelecido pela PNVS utiliza especificamente a epidemiologia e a avaliação de risco para a definição de prioridades nos processos de planejamento, alocação de recursos e orientação programática.  " }
    ]
  }
];

/* ==========================================================================
   DADOS DOS INFOGRÁFICOS INTERATIVOS - AULA 1.2
   Usado pelo motor genérico em main.js (initInfographic). Cada chave do
   objeto abaixo corresponde a um atributo data-infographic="..." no HTML.

   - "desafiosDigitais": substitui o antigo carrossel de imagens
     (#carouselGaleriaEduFlex). Os títulos e textos abaixo são exatamente
     os mesmos que estavam nos 5 slides (imgs/18, 19, 21, 20 e 22.jpg —
     nessa ordem), apenas realocados para o painel do infográfico.

   - "caracteristicasPnvs": substitui o antigo carrossel de imagens
     (#carouselGaleriaId, imgs/14 a 17.jpg — nessa ordem), que apresentava
     as 4 principais características da PNVS. Os textos abaixo são
     exatamente os mesmos que estavam nas legendas de cada slide.

   Em nenhum dos dois há "ações estratégicas" por item, então o campo
   "actions" fica de fora (mesmo padrão já usado em outras aulas).
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  desafiosDigitais: [
    {
      icon: 'bi-wifi-off',
      color: '#4e9eef',
      title: 'Desigualdade digital',
      desc: 'Nem todos os territórios têm a mesma infraestrutura tecnológica.'
    },
    {
      icon: 'bi-mortarboard-fill',
      color: '#ee53b7',
      title: 'Capacitação profissional',
      desc: 'É necessário formar trabalhadores com competências digitais.'
    },
    {
      icon: 'bi-clipboard-data-fill',
      color: '#ff9a2a',
      title: 'Qualidade dos dados',
      desc: 'Sistemas digitais dependem de dados completos e consistentes.'
    },
    {
      icon: 'bi-shield-lock-fill',
      color: '#2ad8b5',
      title: 'Segurança e privacidade',
      desc: 'Dados de saúde requerem proteção rigorosa.'
    },
    {
      icon: 'bi-arrow-left-right',
      color: '#5133c5',
      title: 'Interoperabilidade',
      desc: 'Sistemas precisam conversar entre si de forma eficiente.'
    }
  ],
  caracteristicasPnvs: [
    {
      icon: 'bi-bank',
      color: '#015eab',
      title: 'Política de Estado',
      desc: 'Define a Vigilância em Saúde como política pública de Estado e função essencial do SUS.'
    },
    {
      icon: 'bi-people-fill',
      color: '#287935',
      title: 'Universal',
      desc: 'Tem caráter universal, ou seja, deve alcançar toda a população brasileira.'
    },
    {
      icon: 'bi-diagram-3-fill',
      color: '#fd711c',
      title: 'Transversal',
      desc: 'É transversal porque perpassa todos os níveis de atenção à saúde e orienta o modelo de atenção nos territórios.'
    },
    {
      icon: 'bi-geo-alt-fill',
      color: '#5c4a9c',
      title: 'Gestão pública',
      desc: 'Sua gestão é de responsabilidade exclusiva do poder público.'
    }
  ]
};