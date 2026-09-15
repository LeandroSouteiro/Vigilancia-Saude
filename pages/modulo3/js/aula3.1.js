/* ==========================================================================
   DADOS DO QUIZ - AULA 3.1
   Página em branco (template) — substitua a pergunta de exemplo abaixo
   pelas questões reais desta aula.
   Inclua este arquivo no HTML da Aula 3.1 ANTES de js/main.js:
     <script src="js/aula3.1.js"></script>
     <script src="js/main.js"></script>
   ========================================================================== */

window.EDUFLEX_QUIZ_QUESTIONS = [
  {
    q: "A abordagem de Saúde Única (One Health) propõe uma mudança na forma de compreender e enfrentar os problemas de saúde. De acordo com o conteúdo desta aula, essa abordagem se caracteriza principalmente por:",
    opts: [
      { letter: "A", text: "Priorizar exclusivamente as ações de vigilância epidemiológica voltadas às doenças humanas.", correct: false, exp: "A abordagem de Saúde Única reconhece que a saúde humana, animal e ambiental estão interligadas. Assim, a vigilância e o enfrentamento de riscos sanitários exigem ações integradas entre diferentes setores e áreas do conhecimento." },
      { letter: "B", text: "Integrar os campos da saúde humana, animal e ambiental, reconhecendo a interdependência entre eles na produção dos agravos à saúde.", correct: true, exp: "A abordagem de Saúde Única reconhece que a saúde humana, animal e ambiental estão interligadas. Assim, a vigilância e o enfrentamento de riscos sanitários exigem ações integradas entre diferentes setores e áreas do conhecimento." },
      { letter: "C", text: "Transferir a responsabilidade da vigilância em saúde apenas para os serviços de atenção primária.", correct: false, exp: "A abordagem de Saúde Única reconhece que a saúde humana, animal e ambiental estão interligadas. Assim, a vigilância e o enfrentamento de riscos sanitários exigem ações integradas entre diferentes setores e áreas do conhecimento." },
      { letter: "D", text: "Substituir as políticas tradicionais de saúde pública por estratégias voltadas apenas ao controle ambiental.", correct: false, exp: "A abordagem de Saúde Única reconhece que a saúde humana, animal e ambiental estão interligadas. Assim, a vigilância e o enfrentamento de riscos sanitários exigem ações integradas entre diferentes setores e áreas do conhecimento." }
    ]
  }
];

/* ==========================================================================
   DADOS DA TIMELINE HISTÓRICA - AULA 3.1
   Usado pelo motor genérico em main.js (initHistoryTimeline). A chave
   "marcoLegal" corresponde ao atributo data-timeline="marcoLegal" no HTML.
   O campo "desc" aceita HTML (parágrafos e listas) -- o motor usa
   innerHTML, não textContent, então o texto original pode manter os
   parágrafos e listas separados como no material fornecido.
   ========================================================================== */
window.EDUFLEX_TIMELINES = {
  marcoLegal: [
    {
      num: '1988',
      era: '',
      title: 'Constituição Federal: a base ampliada do conceito de Saúde',
      desc: '<p>A Constituição estabelece, nos artigos 196 a 200, que a saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas. Essa expressão é central, pois indica que a produção da saúde extrapola o setor saúde e depende de ações em outros campos da política pública (BRASIL, 1988).</p><p>Além disso, o artigo 225 assegura o direito ao meio ambiente ecologicamente equilibrado. Ao aproximarmos os artigos 196 e 225, percebemos que a própria Constituição já estabelece a conexão entre saúde e ambiente como dever do Estado.</p><p>Outro ponto essencial está no artigo 23, que define como competência comum da União, Estados e Municípios cuidar da saúde, proteger o meio ambiente, combater a poluição e preservar a fauna e a flora. Essa competência compartilhada é um fundamento jurídico claro para a Vigilância Cooperativa.</p><p>No artigo 37 constam os Princípios da Administração Pública. Esses princípios estão totalmente alinhados à lógica da Saúde Única e da Vigilância Cooperativa. Os princípios da legalidade, eficiência e, sobretudo, da cooperação entre entes federados e setores, dão sustentação à construção de arranjos institucionais colaborativos. A Vigilância Cooperativa não apenas é permitida, como é coerente com esses princípios.</p>'
    },
    {
      num: '1990',
      era: '',
      title: 'Lei Orgânica da Saúde',
      desc: '<p>A Lei 8.080/90 reforça uma concepção ampliada ao afirmar que:</p><p>"A saúde tem como fatores determinantes e condicionantes, entre outros, o meio ambiente, o trabalho, a renda, a educação…" (BRASIL, 1990).</p><p>Ou seja, a lei reconhece explicitamente que os determinantes da saúde estão fora do setor saúde.</p><p>Ainda, ao tratar das atribuições do SUS, a lei inclui:</p><ul><li>Vigilância Sanitária.</li><li>Vigilância Epidemiológica.</li><li>Saúde dos trabalhadores.</li><li>Colaboração na proteção do meio ambiente.</li></ul><p>O termo colaboração é a chave. Ele indica que as vigilâncias não atuam sozinhas quando se trata de ambiente, mas em articulação com outros setores, que o enfrentamento dos determinantes ambientais da saúde demanda ação coordenada entre os campos de política pública.</p>'
    },
    {
      num: '2000',
      era: '',
      title: 'Legislação ambiental',
      desc: '<p>A Lei nº 9.985/2000 institui o Sistema Nacional de Unidades de Conservação da Natureza (SNUC), ao reconhecer as Unidades de Conservação como instrumentos de proteção da biodiversidade e manutenção da integridade dos ecossistemas. A preservação de áreas protegidas contribui para a estabilidade ecológica, para a regulação de ciclos hidrológicos e climáticos e para a redução de processos de degradação que podem favorecer a emergência de zoonoses.</p>'
    },
    {
      num: '2012',
      era: '',
      title: 'Lei nº 12.651/2012',
      desc: '<p>Dispõe sobre a proteção da vegetação nativa, ao estabelecer Áreas de Preservação Permanente e Reservas Legais, cria barreiras ecológicas relevantes para a proteção de recursos hídricos, controle de erosão, estabilidade de encostas e manutenção de corredores ecológicos. Tais dispositivos possuem impacto indireto, porém significativo, na prevenção de desastres sanitários e na redução de vulnerabilidades socioambientais.</p><p>Assim, a legislação ambiental brasileira não apenas regula o uso dos recursos naturais, mas também estrutura condições ecológicas fundamentais para a promoção da saúde coletiva.</p>'
    },
    {
      num: '2013',
      era: '',
      title: 'Normativas da agricultura, pecuária e abastecimento (MAPA) e saúde animal',
      desc: '<p>O MAPA possui sistemas robustos de vigilância e defesa sanitária animal, voltados ao controle de zoonoses, inspeção de produtos de origem animal, controle de trânsito animal e monitoramento de doenças, podendo citar a Instrução Normativa n° 50/2013, que traz a lista das doenças de animais de notificação compulsória no Brasil, que compreende, além das zoonoses, as enfermidades de rápida difusão que trazem impactos socioeconômicos e de segurança alimentar (doenças transfronteiriças) e também as doenças endêmicas existentes nos rebanhos.</p><p>Essas ações dialogam diretamente com a saúde humana, especialmente em temas como:</p><ul><li>Zoonoses.</li><li>Segurança alimentar.</li><li>Resistência antimicrobiana.</li><li>Uso de agrotóxicos e medicamentos veterinários.</li></ul><p>A legislação agropecuária, portanto, é parte da estrutura que sustenta a Vigilância Cooperativa.</p>'
    },
    {
      num: '2017',
      era: '',
      title: 'Normativas da Vigilância Ambiental em Saúde',
      desc: '<p>A Vigilância Ambiental, regulamentada por diversas portarias do Ministério da Saúde, já atua em temas como qualidade da água, ar, solo, desastres naturais, substâncias químicas e vetores. Esses temas, por natureza, exigem articulação com meio ambiente, saneamento, defesa civil e planejamento urbano.</p><p>A Portaria de Consolidação nº 5/2017 organiza as ações de Vigilância em Saúde e evidencia a necessidade de integração entre áreas.</p>'
    },
    {
      num: '2018',
      era: '',
      title: 'Política Nacional de Vigilância em Saúde (PNVS)',
      desc: '<p>A PNVS é talvez o documento mais explícito ao afirmar que a vigilância deve ser organizada de forma integrada, contínua e articulada, considerando riscos, danos e determinantes do processo saúde-doença (BRASIL, 2018).</p><p>A política orienta:</p><ul><li>Integração entre as vigilâncias.</li><li>Atuação territorial.</li><li>Articulação intersetorial.</li><li>Análise de risco ampliada.</li></ul>'
    }
  ]
};