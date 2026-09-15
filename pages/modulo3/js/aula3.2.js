/* ==========================================================================
   DADOS DO QUIZ - AULA 3.2
   Página em branco (template) — substitua a pergunta de exemplo abaixo
   pelas questões reais desta aula.
   Inclua este arquivo no HTML da Aula 3.2 ANTES de js/main.js:
     <script src="js/aula3.2.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "[Pergunta de exemplo — substitua pela questão real desta aula.]",
    opts: [
      { letter: "A", text: "[Opção A]", correct: false, exp: "[Texto de feedback explicando a resposta certa.]" },
      { letter: "B", text: "[Opção B]", correct: true, exp: "[Texto de feedback explicando por que esta é a correta.]" },
      { letter: "C", text: "[Opção C]", correct: false, exp: "[Texto de feedback explicando a resposta certa.]" },
      { letter: "D", text: "[Opção D]", correct: false, exp: "[Texto de feedback explicando a resposta certa.]" }
    ]
  }
];

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO (HOTSPOT) - AULA 3.2
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "etapasIniciais" corresponde ao atributo data-infographic="etapasIniciais"
   no HTML. Mesmo padrão do "mvpPassos"/"lgpdPrincipios": pontos clicáveis
   sobre uma imagem (imgs/etapas-iniciais-vigilancia-epizootias.jpg), cada
   um abrindo a descrição no painel ao lado.
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  etapasIniciais: [
    {
      icon: 'bi-clipboard-check-fill',
      title: 'Verificação <em>in loco</em>',
      color: '#0b5ea7',
      desc: 'Confirmação da ocorrência no local da notificação.'
    },
    {
      icon: 'bi-binoculars-fill',
      title: 'Identificação das espécies afetadas',
      color: '#407924',
      desc: 'Reconhecimento e registro das espécies de primatas envolvidas.'
    },
    {
      icon: 'bi-droplet-fill',
      title: 'Coleta de amostras biológicas',
      color: '#e5b138',
      desc: 'Coleta de amostras adequadas para confirmação laboratorial.'
    },
    {
      icon: 'bi-geo-alt-fill',
      title: 'Georreferenciamento do local',
      color: '#2c8c87',
      desc: 'Registro preciso da localização geográfica da ocorrência.'
    },
    {
      icon: 'bi-tree-fill',
      title: 'Avaliação preliminar das características ambientais',
      color: '#6a4d89',
      desc: 'Análise inicial do ambiente e das condições do local da ocorrência.'
    }
  ]
};