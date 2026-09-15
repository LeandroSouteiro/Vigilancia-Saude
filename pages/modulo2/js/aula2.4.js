/* ==========================================================================
   DADOS DO QUIZ - AULA 2.4
   Página em branco (template) — substitua a pergunta de exemplo abaixo
   pelas questões reais desta aula.
   Inclua este arquivo no HTML da Aula 2.4 ANTES de js/main.js:
     <script src="js/aula2.4.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "Considerando a Lei Geral de Proteção de Dados e os conhecimentos apreendidos nesta aula, qual é a conduta correta de um/a gestor/a de vigilância digital ao implementar um novo sistema de monitoramento via aplicativos móveis?",
    opts: [
      { letter: "A", text: "Coletar o máximo de dados possível para o <em>Big Data</em>.", correct: false, exp: "A LGPD exige minimização e transparência. O <em>Privacy by Design</em> assegura que a privacidade seja considerada desde a arquitetura do sistema, protegendo a autodeterminação informativa. " },
      { letter: "B", text: "Adotar o <em>Privacy by Design</em>, garantindo a anonimização e informando claramente a finalidade legítima.", correct: true, exp: "A LGPD exige minimização e transparência. O <em>Privacy by Design</em> assegura que a privacidade seja considerada desde a arquitetura do sistema, protegendo a autodeterminação informativa." },
      { letter: "C", text: "Dispensar o sigilo profissional em favor do bem absoluto da saúde pública.", correct: false, exp: "A LGPD exige minimização e transparência. O <em>Privacy by Design</em> assegura que a privacidade seja considerada desde a arquitetura do sistema, protegendo a autodeterminação informativa. " },
      { letter: "D", text: "Criar perfis de risco comercial para parceiros privados.", correct: false, exp: "A LGPD exige minimização e transparência. O <em>Privacy by Design</em> assegura que a privacidade seja considerada desde a arquitetura do sistema, protegendo a autodeterminação informativa. " }
    ]
  }
];

/* ==========================================================================
   DADOS DO INFOGRÁFICO INTERATIVO (HOTSPOT) - AULA 2.4
   Usado pelo motor genérico em main.js (initInfographic). A chave
   "lgpdPrincipios" corresponde ao atributo data-infographic="lgpdPrincipios"
   no HTML. Mesmo padrão do "mvpPassos" da aula 2.3: pontos clicáveis sobre
   uma imagem (imgs/infografico-principios-lgpd.png), cada um abrindo a
   descrição no painel ao lado. Sem "actions" (só descrição por princípio).
   ========================================================================== */
window.EDUFLEX_INFOGRAPHICS = {
  lgpdPrincipios: [
  {
    icon: 'bi-bullseye',
    title: '1 · Finalidade',
    color: '#414e9c',
    desc: 'O primeiro princípio básico é a finalidade. O dado só pode ser coletado para propósitos legítimos, específicos e informados ao titular.'
  },
  {
    icon: 'bi-check2-circle',
    title: '2 · Adequação',
    color: '#2874a2',
    desc: 'O segundo princípio é o da adequação, ou seja, o tratamento deve ser compatível com as finalidades informadas.'
  },
  {
    icon: 'bi-funnel-fill',
    title: '3 · Necessidade',
    color: '#01a1c5',
    desc: 'O terceiro é o princípio da necessidade (minimização), que determina que a coleta deve ser apenas do mínimo de dados necessário para atingir o objetivo pretendido.'
  }
  ],
  omsPrincipiosIA: [
    {
      icon: 'bi-person-check-fill',
      title: '1 · Proteger a autonomia humana',
      color: '#ee1864',
      desc: 'Os humanos devem manter o controle total dos sistemas de saúde e das decisões médicas individuais. Isso inclui a proteção da privacidade e a obtenção de um consentimento informado válido para o uso de dados.'
    },
    {
      icon: 'bi-shield-fill-check',
      title: '2 · Promover o bem-estar, a segurança e o interesse público',
      color: '#d6a023',
      desc: 'Os desenvolvedores devem cumprir requisitos rigorosos de segurança e eficácia. A IA só deve ser utilizada se não causar danos físicos ou mentais que poderiam ser evitados por abordagens alternativas.'
    },
    {
      icon: 'bi-eye-fill',
      title: '3 · Garantir transparência, explicabilidade e inteligibilidade',
      color: '#7438ba',
      desc: 'A transparência exige que informações suficientes sobre o <em>design</em> do sistema sejam documentadas e publicadas antes do uso, permitindo um debate público significativo. O sistema deve ser explicável, ou seja, capaz de justificar seus resultados de forma compreensível para médicos e pacientes.'
    },
    {
      icon: 'bi-clipboard2-check-fill',
      title: '4 · Fomentar a responsabilidade e a prestação de contas (<em>accountability</em>)',
      color: '#00bbd6',
      desc: ' Deve haver uma especificação clara de quais tarefas o sistema pode realizar. Além disso, é necessário garantir mecanismos de reparação para indivíduos ou grupos prejudicados por decisões algorítmicas.'
    },
    {
      icon: 'bi-people-fill',
      title: '5 · Garantir inclusão e equidade',
      color: '#1885e0',
      desc: 'A IA deve ser projetada para ser acessível ao maior número possível de pessoas, independentemente de raça, gênero, idade ou condição socioeconômica. Deve-se evitar a codificação de vieses que marginalizem ainda mais grupos vulneráveis.'
    },
    {
      icon: 'bi-recycle',
      title: '6 · Promover uma IA responsiva e sustentável',
      color: '#ce2a2c',
      desc: 'Os sistemas devem ser avaliados continuamente durante o uso real para verificar se respondem adequadamente às expectativas. Além disso, a IA deve ser ambientalmente sustentável, minimizando o impacto no clima e no consumo de recursos.'
    }
  ]
};