/* ==========================================================================
   SISTEMA DE INTERATIVIDADE - EDUFLEX / MOODLE
   Arquivo: script.js
   ========================================================================== */

(function () {
  'use strict';

  // Este listener roda depois que o header e os modais (carregados via
  // partials-loader.js) já foram injetados no DOM — por isso escuta
  // "partialsReady" em vez de "DOMContentLoaded". Páginas que NÃO usam
  // partials-loader.js (ainda) não vão disparar esse evento; se este for
  // o caso, troque de volta para 'DOMContentLoaded' abaixo.
  document.addEventListener('partialsReady', () => {
    /* ==========================================================================
       1. INICIALIZAÇÃO DE ÍCONES E COMPONENTES GERAIS
       ========================================================================== */
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Referências de elementos globais do layout
    const btnToggle = document.getElementById('btnToggleSidebar');
    const sidebar = document.getElementById('sidebarAula');
    const header = document.getElementById('mainHeader');
    const progressBar = document.getElementById('scrollProgress');
    const btnBackToTop = document.getElementById('btnBackToTop');

    /* ==========================================================================
       2. COMPORTAMENTO DA SIDEBAR
       ========================================================================== */
    function checkInitialSidebarState() {
      if (sidebar && btnToggle && window.innerWidth <= 767.98) {
        sidebar.classList.add('collapsed');
        btnToggle.classList.add('is-collapsed');
        btnToggle.setAttribute('aria-expanded', 'false');
      }
    }
    checkInitialSidebarState();

    if (btnToggle && sidebar) {
      btnToggle.addEventListener('click', () => {
        const collapsed = sidebar.classList.toggle('collapsed');
        btnToggle.classList.toggle('is-collapsed', collapsed);
        btnToggle.setAttribute('aria-expanded', String(!collapsed));
      });
    }

    /* ==========================================================================
       3. LÓGICA DE SCROLL (HEADER, BARRA DE PROGRESSO E BOTÃO TOPO)
       ========================================================================== */
    window.addEventListener('scroll', () => {
      // Efeito no Header
      if (header) {
        header.classList.toggle('header-scrolled', window.scrollY > 20);
      }

      // Barra de progresso da leitura
      if (progressBar) {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
      }

      // Botão voltar ao topo
      if (btnBackToTop) {
        btnBackToTop.classList.toggle('show', window.scrollY > 400);
      }
    });

    if (btnBackToTop) {
      btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ==========================================================================
       4. LÓGICA DO QUIZ INTERATIVO
       ========================================================================== */
    let currentQIndex = 0;
    let currentScore = 0;

    // As perguntas de cada aula NÃO ficam aqui. Elas vêm de um arquivo separado
    // (ex.: js/quiz-data/aula1-1.js), que deve ser incluído no HTML ANTES deste
    // main.js e definir window.EDUFLEX_QUIZ_QUESTIONS. Assim, este arquivo serve
    // para todas as aulas do módulo sem precisar ser duplicada.
    const questionsData = window.EDUFLEX_QUIZ_QUESTIONS || [];

    function renderQuizQuestion(idx) {
      const quizContainer = document.getElementById('eduflexQuizContainer');
      if (!quizContainer) return;

      const qData = questionsData[idx];
      const isLastQuestion = idx === questionsData.length - 1;

      const questionCounter = document.getElementById('quizQuestionCounter');
      const quizProgressBar = document.getElementById('quizProgressBar');
      const questionText = document.getElementById('quizQuestionText');
      const feedbackBox = document.getElementById('quizFeedbackBox');
      const nextBtn = document.getElementById('quizNextBtn');
      const optionsContainer = document.getElementById('quizOptionsContainer');

      if (questionCounter) questionCounter.innerText = 'Questão ' + String(idx + 1).padStart(2, '0') + ' de ' + String(questionsData.length).padStart(2, '0');
      if (quizProgressBar) quizProgressBar.style.width = ((idx + 1) / questionsData.length) * 100 + '%';
      if (questionText) questionText.innerHTML = qData.q;
      if (feedbackBox) feedbackBox.classList.add('d-none');
      // Na última questão (inclusive quando o quiz só TEM uma questão), o
      // botão "Próxima Questão" não faz sentido — nem antes de responder, nem
      // depois. Por isso já escondemos aqui, na hora de montar a questão, em
      // vez de esperar o aluno responder para só então escondê-lo.
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.classList.toggle('d-none', isLastQuestion);
      }

      if (optionsContainer) {
        optionsContainer.innerHTML = '';
        qData.opts.forEach(opt => {
          const b = document.createElement('button');
          b.className = 'btn btn-outline-secondary text-start p-3 rounded-3 quiz-opt-btn';
          b.innerHTML = '<span class="fw-bold me-2">' + opt.letter + ')</span> ' + opt.text;
          b.onclick = function () { window.selectQuizOption(b, opt.correct, opt.exp); };
          optionsContainer.appendChild(b);
        });
      }
    }

    // Expondo funções do Quiz no objeto window para suporte aos eventos onclick HTML
    window.selectQuizOption = function (btn, isCorrect, exp) {
      const container = document.getElementById('quizOptionsContainer');
      if (!container) return;

      const allBtns = container.querySelectorAll('.quiz-opt-btn');
      allBtns.forEach(b => {
        b.disabled = true;
        b.classList.remove('btn-outline-secondary', 'btn-primary');
        b.classList.add('btn-light', 'text-muted');
      });

      const feedbackBox = document.getElementById('quizFeedbackBox');
      if (feedbackBox) {
        feedbackBox.classList.remove('d-none', 'bg-success-subtle', 'text-success-emphasis', 'border-success-subtle', 'bg-danger-subtle', 'text-danger-emphasis', 'border-danger-subtle');

        if (isCorrect) {
          btn.classList.remove('btn-light', 'text-muted');
          btn.classList.add('btn-success', 'text-white', 'fw-bold');
          feedbackBox.classList.add('bg-success-subtle', 'text-success-emphasis', 'border', 'border-success-subtle');
          feedbackBox.innerHTML = '<strong>Parabéns, você acertou!</strong> ' + exp;
          currentScore++;

          const scoreCount = document.getElementById('quizScoreCount');
          if (scoreCount) scoreCount.innerText = currentScore;
        } else {
          btn.classList.remove('btn-light', 'text-muted');
          btn.classList.add('btn-danger', 'text-white', 'fw-bold');
          feedbackBox.classList.add('bg-danger-subtle', 'text-danger-emphasis', 'border', 'border-danger-subtle');
          feedbackBox.innerHTML = '<strong>Você não selecionou a resposta correta!</strong> ' + exp;
        }
      }

      const nextBtn = document.getElementById('quizNextBtn');
      const isLastQuestion = currentQIndex === questionsData.length - 1;

      // Na última questão: mostra o feedback normalmente (acima), mas não
      // mostra o botão "Próxima Questão" nem a tela de resultado final.
      // (O botão já estava escondido desde o render, aqui só garantimos.)
      if (nextBtn) {
        if (isLastQuestion) {
          // Não existe "próxima pergunta" depois da última, e também não há
          // uma tela de resultado separada — o feedback desta última pergunta
          // já é o fim da atividade, então o botão simplesmente some.
          nextBtn.classList.add('d-none');
        } else {
          nextBtn.disabled = false;
        }
      }
    };

    // Prepara o quiz: zera o placar e renderiza a primeira pergunta.
    function startQuiz() {
      currentQIndex = 0;
      currentScore = 0;
      renderQuizQuestion(0);

      const nextBtn = document.getElementById('quizNextBtn');
      if (nextBtn) {
        nextBtn.addEventListener('click', window.nextQuizQuestion);
      }
    }

    window.nextQuizQuestion = function () {
      currentQIndex++;
      if (currentQIndex < questionsData.length) {
        renderQuizQuestion(currentQIndex);
      }
    };

    // Renderiza primeira questão se o container existir na página
    if (document.getElementById('eduflexQuizContainer')) {
      if (questionsData.length === 0) {
        console.warn(
          '[EduFlex Quiz] O container #eduflexQuizContainer existe, mas nenhuma pergunta foi encontrada. ' +
          'Verifique se o arquivo de dados da aula (ex.: js/quiz-data/aula1-1.js) foi incluído no HTML ' +
          'ANTES de js/main.js.'
        );
      } else {
        startQuiz();
      }
    }
    /* ==========================================================================
       5. INICIALIZAÇÃO DE POPOVERS (BOOTSTRAP)
       ========================================================================== */
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

    /* ==========================================================================
       6. PAGINAÇÃO DE CONTEÚDO DA AULA (avançar/retroceder + navegação entre aulas)
       ==========================================================================
       Este bloco é genérico e serve para qualquer aula do módulo: ele identifica
       os blocos ".aula-page" presentes no HTML e cria a paginação automaticamente.
       Na última página, em vez de "Anterior/Próximo" internos, exibe os botões
       "Aula Anterior" / "Próxima Aula", que apontam para outro arquivo HTML
       (lidos via data-prev-lesson / data-next-lesson no #aulaLessonNav). Se um
       desses atributos estiver vazio, o respectivo botão fica desativado. */
    const aulaPages = document.querySelectorAll('.aula-page');

    if (aulaPages.length > 1) {
      const totalAulaPages = aulaPages.length;
      const pagPrevBtn = document.getElementById('aulaPagPrev');
      const pagNextBtn = document.getElementById('aulaPagNext');
      const pagIndicator = document.getElementById('aulaPagIndicator');
      const paginationNav = document.getElementById('aulaPaginationNav');
      const lessonNav = document.getElementById('aulaLessonNav');
      const lessonPrevBtn = document.getElementById('aulaLessonPrev');
      const lessonNextBtn = document.getElementById('aulaLessonNext');

      // Botão "Iniciar Aula X" da primeira página: antes usava
      // onclick="..." inline no HTML (não permitido pelo eMAG - 2.2), agora
      // o clique é tratado aqui, delegando pro botão "Próximo" de sempre.
      const pagStartBtn = document.getElementById('aulaPagStart');
      if (pagStartBtn && pagNextBtn) {
        pagStartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          pagNextBtn.click();
        });
      }

      let aulaCurrentPage = 1;

      function setupAulaLessonNav() {
        if (!lessonNav) return;

        const prevLesson = (lessonNav.dataset.prevLesson || '').trim();
        const nextLesson = (lessonNav.dataset.nextLesson || '').trim();

        if (lessonPrevBtn) {
          if (prevLesson) {
            lessonPrevBtn.href = prevLesson;
            lessonPrevBtn.classList.remove('disabled');
            lessonPrevBtn.removeAttribute('aria-disabled');
            lessonPrevBtn.removeAttribute('tabindex');
          } else {
            lessonPrevBtn.href = '#';
            lessonPrevBtn.classList.add('disabled');
            lessonPrevBtn.setAttribute('aria-disabled', 'true');
            lessonPrevBtn.setAttribute('tabindex', '-1');
          }
        }

        if (lessonNextBtn) {
          if (nextLesson) {
            lessonNextBtn.href = nextLesson;
            lessonNextBtn.classList.remove('disabled');
            lessonNextBtn.removeAttribute('aria-disabled');
            lessonNextBtn.removeAttribute('tabindex');
          } else {
            lessonNextBtn.href = '#';
            lessonNextBtn.classList.add('disabled');
            lessonNextBtn.setAttribute('aria-disabled', 'true');
            lessonNextBtn.setAttribute('tabindex', '-1');
          }
        }
      }

      function renderAulaPage() {
        aulaPages.forEach((page) => {
          page.classList.toggle('active', Number(page.dataset.page) === aulaCurrentPage);
        });

        const isFirstPage = aulaCurrentPage === 1;
        const isLastPage = aulaCurrentPage === totalAulaPages;

        if (pagIndicator) {
          pagIndicator.innerText = 'Página ' + aulaCurrentPage + ' de ' + totalAulaPages;
        }
        if (pagPrevBtn) {
          pagPrevBtn.disabled = isFirstPage;
        }
        if (pagNextBtn) {
          pagNextBtn.disabled = isLastPage;
        }

        // Na última página, troca a paginação interna pela navegação entre aulas
        if (paginationNav) paginationNav.classList.toggle('d-none', isLastPage);
        if (lessonNav) lessonNav.classList.toggle('d-none', !isLastPage);

        // Leva o usuário de volta ao topo do conteúdo ao trocar de página
        const heroEl = document.querySelector('.aula-hero');
        const scrollTarget = heroEl ? heroEl.offsetTop : 0;
        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      }

      if (pagPrevBtn) {
        pagPrevBtn.addEventListener('click', () => {
          if (aulaCurrentPage > 1) {
            aulaCurrentPage--;
            renderAulaPage();
          }
        });
      }

      if (pagNextBtn) {
        pagNextBtn.addEventListener('click', () => {
          if (aulaCurrentPage < totalAulaPages) {
            aulaCurrentPage++;
            renderAulaPage();
          }
        });
      }

      setupAulaLessonNav();
      renderAulaPage();
    }

    /* ==========================================================================
       7. ALINHAMENTO DINÂMICO DOS BLOCOS "LARGOS" (.aula-full-bleed / .aula-wide-block)
       ==========================================================================
       Alguns elementos do conteúdo da aula (banners com imagem de fundo, grades
       de cards, abas) precisam "escapar" da coluna de leitura de 800px e ocupar
       mais espaço — alguns até a borda da área de conteúdo (full-bleed), outros
       uma largura intermediária (wide-block). Como esses elementos agora ficam
       aninhados dentro da paginação da aula (.aula-page), calculamos a largura e
       o deslocamento necessários via JS, medindo a área de conteúdo real
       (.main-content-inner) e o "miolo" de texto (.main-content-body). Isso é
       robusto independente de sidebar aberta/fechada, zoom ou tamanho de tela. */
    function alignWideBlocks() {
      const isMobile = window.innerWidth <= 991.98;
      const contentPane = document.querySelector('.main-content-inner');
      const readingColumn = document.querySelector('.main-content-body');

      const fullBleedEls = document.querySelectorAll('.aula-full-bleed');
      const wideBlockEls = document.querySelectorAll('.aula-wide-block');

      // Em telas menores a coluna já ocupa (quase) toda a largura disponível:
      // não há necessidade de calcular deslocamento, então apenas limpamos
      // qualquer ajuste inline aplicado anteriormente (ver regra CSS de fallback).
      if (isMobile || !contentPane) {
        fullBleedEls.forEach((el) => {
          el.style.width = '';
          el.style.marginLeft = '';
          el.style.marginRight = '';
        });
        wideBlockEls.forEach((el) => {
          el.style.width = '';
          el.style.marginLeft = '';
          el.style.marginRight = '';
        });
        return;
      }

      const paneRect = contentPane.getBoundingClientRect();
      const readingRect = readingColumn ? readingColumn.getBoundingClientRect() : paneRect;

      function align(el, targetRect) {
        // Reseta ajustes anteriores antes de medir, para não acumular erro
        el.style.width = '';
        el.style.marginLeft = '';
        el.style.marginRight = '';

        const elRect = el.getBoundingClientRect();
        const offsetLeft = targetRect.left - elRect.left;
        const offsetRight = elRect.right - targetRect.right;

        el.style.width = targetRect.width + 'px';
        el.style.marginLeft = offsetLeft + 'px';
        el.style.marginRight = offsetRight + 'px';
      }

      // Full-bleed: vai até a borda da área de conteúdo (fora da sidebar)
      fullBleedEls.forEach((el) => align(el, paneRect));

      // Wide-block: um pouco mais largo que o texto, com respiro nas laterais
      // (usa a "caixa de padding" da coluna de leitura, sem invadir a sidebar)
      wideBlockEls.forEach((el) => align(el, readingRect));
    }

    let alignResizeTimeout = null;
    function scheduleAlignWideBlocks(delay) {
      window.clearTimeout(alignResizeTimeout);
      alignResizeTimeout = window.setTimeout(alignWideBlocks, delay || 0);
    }

    if (document.querySelector('.aula-full-bleed') || document.querySelector('.aula-wide-block')) {
      // Primeira medição (aguarda imagens/fontes influenciarem o layout)
      scheduleAlignWideBlocks(50);
      window.addEventListener('load', () => scheduleAlignWideBlocks(0));
      window.addEventListener('resize', () => scheduleAlignWideBlocks(150));

      // Realinha ao abrir/fechar a sidebar (após a transição de 0.35s do CSS)
      if (btnToggle) {
        btnToggle.addEventListener('click', () => scheduleAlignWideBlocks(380));
      }

      // Realinha ao trocar de página na paginação da aula (o conteúdo muda de altura)
      if (aulaPages.length > 1) {
        document.getElementById('aulaPagPrev') && document.getElementById('aulaPagPrev').addEventListener('click', () => scheduleAlignWideBlocks(50));
        document.getElementById('aulaPagNext') && document.getElementById('aulaPagNext').addEventListener('click', () => scheduleAlignWideBlocks(50));
      }
    }

    /* ==========================================================================
       8. ALTURA IGUAL NOS CARDS DE TEXTO DO CARROSSEL (.principle-card)
       ==========================================================================
       Em vez de uma altura fixa "no chute" (que ou sobra espaço vazio em
       slides curtos, ou fica pequena demais em telas estreitas e cria scroll
       dentro do card), medimos a altura natural de CADA slide e aplicamos a
       maior delas a todos os slides daquele carrossel. Resultado: nunca
       aparece scroll interno, e os slides não mudam de tamanho ao trocar
       (sem "dança" de conteúdo) — em qualquer largura de tela.

       Como o carrossel pode estar dentro de uma página da paginação da aula
       que começa escondida (display:none), a medição é refeita sempre que:
       a janela é redimensionada, e o usuário troca de página na paginação
       (só então o carrossel realmente fica visível/mensurável).
       ========================================================================== */
    function equalizePrincipleCardHeights() {
      document.querySelectorAll('.carousel').forEach((carousel) => {
        const cards = carousel.querySelectorAll('.principle-card');
        if (cards.length < 2) return;

        // Se o próprio carrossel estiver invisível agora (ex.: página da
        // paginação ainda não ativa), não dá pra medir nada — sai e espera
        // ser chamado de novo quando a página ficar visível.
        if (carousel.offsetParent === null) return;

        // Zera a altura fixada antes de medir de novo, senão a medição
        // anterior interfere na próxima (ex.: depois de redimensionar).
        cards.forEach((card) => { card.style.height = ''; });

        let maxHeight = 0;
        cards.forEach((card) => {
          const item = card.closest('.carousel-item');
          const wasVisible = item.classList.contains('active');
          if (!wasVisible) {
            item.style.display = 'block';
            item.style.position = 'absolute';
            item.style.visibility = 'hidden';
            item.style.width = '100%';
          }
          maxHeight = Math.max(maxHeight, card.scrollHeight);
          if (!wasVisible) {
            item.style.display = '';
            item.style.position = '';
            item.style.visibility = '';
            item.style.width = '';
          }
        });

        if (maxHeight > 0) {
          cards.forEach((card) => { card.style.height = maxHeight + 'px'; });
        }
      });
    }

    if (document.querySelector('.principle-card')) {
      let cardResizeTimeout = null;
      const scheduleEqualizeCards = (delay) => {
        window.clearTimeout(cardResizeTimeout);
        cardResizeTimeout = window.setTimeout(equalizePrincipleCardHeights, delay || 0);
      };

      scheduleEqualizeCards(50);
      window.addEventListener('load', () => scheduleEqualizeCards(0));
      window.addEventListener('resize', () => scheduleEqualizeCards(150));

      // Recalcula ao trocar de página na paginação da aula (o carrossel pode
      // estar numa página que só agora ficou visível)
      if (aulaPages.length > 1) {
        document.getElementById('aulaPagPrev') && document.getElementById('aulaPagPrev').addEventListener('click', () => scheduleEqualizeCards(50));
        document.getElementById('aulaPagNext') && document.getElementById('aulaPagNext').addEventListener('click', () => scheduleEqualizeCards(50));
      }
    }

    /* ==========================================================================
       9. INFOGRÁFICO INTERATIVO EM TRILHA (navegação por pontos numerados
          coloridos ou pelos botões Anterior/Próximo)
       ==========================================================================
       Motor genérico: lê os dados de window.EDUFLEX_INFOGRAPHICS[chave], onde
       "chave" vem do atributo data-infographic="chave" do container no HTML.
       Assim, qualquer aula pode ter seu próprio infográfico só definindo os
       dados no arquivo js/aulaX.js correspondente — nenhuma lógica de
       comportamento fica solta no meio do HTML.

       Também equaliza a altura do painel com base no maior objetivo entre
       todos (mesmo problema que já resolvemos para os cards do carrossel de
       texto): sem isso, o painel muda de tamanho ao trocar de objetivo,
       "empurrando" o restante da página pra cima ou pra baixo.
       ========================================================================== */
    const infographicColors = ['#31052a', '#77206d', '#9c3f8e', '#d45eb7', '#c94ea1'];

    function initInfographic(container) {
      const key = container.dataset.infographic;
      const data = (window.EDUFLEX_INFOGRAPHICS || {})[key];
      if (!data || !data.length) return;

      const dots = container.querySelectorAll('.ig-dot');
      // Posição dos pontos: antes vinha em style="left:X%;top:Y%;" inline no
      // HTML (não permitido pelo eMAG - 2.2). Os valores agora ficam em
      // data-left/data-top e são aplicados aqui, em JS.
      dots.forEach((dot) => {
        if (dot.dataset.left) dot.style.left = dot.dataset.left + '%';
        if (dot.dataset.top) dot.style.top = dot.dataset.top + '%';
      });
      const panel = container.querySelector('.ig-panel');
      const panelIcon = container.querySelector('.ig-panel-icon');
      const panelIconI = panelIcon ? panelIcon.querySelector('i') : null;
      const panelTitle = container.querySelector('.ig-panel-title');
      const panelDesc = container.querySelector('.ig-panel-desc');
      const actionsLabel = container.querySelector('.ig-actions-label');
      const actionsList = container.querySelector('.ig-actions-list');
      const prevBtn = container.querySelector('.ig-panel-nav [id$="PrevBtn"]');
      const nextBtn = container.querySelector('.ig-panel-nav [id$="NextBtn"]');

      if (!panel || !panelTitle || !panelDesc || !actionsList) return;

      // Opt-in via data-start-closed="true" no container: nesse modo, nenhum
      // passo começa selecionado/aberto -- o painel só aparece (abaixo da
      // imagem) depois do primeiro clique num hotspot. Sem esse atributo, o
      // comportamento padrão continua idêntico ao de sempre (passo 1 já
      // aberto ao carregar), então infográficos existentes (ex.: o
      // "ciclo7etapas" da Aula 1.3) não são afetados.
      const startClosed = container.dataset.startClosed === 'true';
      let current = startClosed ? -1 : 0;
      let opened = !startClosed;

      function openPanel() {
        if (opened) return;
        opened = true;
        panel.classList.remove('ig-panel-hidden');
      }

      function paint(idx) {
        const obj = data[idx];
        const color = obj.color || infographicColors[idx % infographicColors.length];

        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));

        if (panelIcon) panelIcon.style.backgroundColor = color + '1a';
        if (panelIconI) {
          panelIconI.style.color = color;
          panelIconI.className = 'bi ' + obj.icon;
        }
        panelTitle.innerHTML = obj.title;
        panelTitle.style.color = color;
        panelDesc.innerHTML = obj.desc;

        // Infográficos como "ciclo7etapas" e "mvpPassos" não têm lista de
        // ações estratégicas, só descrição por etapa -- nesse caso escondemos
        // o rótulo e a lista em vez de quebrar em obj.actions.forEach.
        const actions = obj.actions || [];
        if (actionsLabel) actionsLabel.classList.toggle('d-none', actions.length === 0);
        actionsList.classList.toggle('d-none', actions.length === 0);
        actionsList.innerHTML = '';
        actions.forEach((action) => {
          const li = document.createElement('li');
          const icon = document.createElement('i');
          icon.className = 'bi bi-check-circle-fill';
          icon.style.color = color;
          const span = document.createElement('span');
          span.textContent = action;
          li.appendChild(icon);
          li.appendChild(span);
          actionsList.appendChild(li);
        });

        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) nextBtn.disabled = idx === data.length - 1;
      }

      function render(idx) {
        current = idx;
        openPanel();
        panel.style.opacity = 0;
        window.setTimeout(() => {
          paint(idx);
          panel.style.opacity = 1;
        }, 120);
      }

      dots.forEach((dot) => {
        dot.addEventListener('click', () => render(parseInt(dot.dataset.idx, 10)));
      });
      if (prevBtn) prevBtn.addEventListener('click', () => { if (current > 0) render(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', () => { if (current < data.length - 1) render(current + 1); });

      // Mede o conteúdo de TODOS os objetivos (não só o visível) pra achar a
      // maior altura e fixá-la no painel — evita o painel "dançar" de
      // tamanho ao trocar de objetivo. Como tudo roda em sequência síncrona
      // (sem esperar nada entre as trocas), o navegador não chega a desenhar
      // os estados intermediários na tela — só o resultado final.
      function equalizeHeight() {
        if (container.offsetParent === null) return;
        panel.style.minHeight = '';

        // Se o painel está escondido (ainda não aberto), precisa reaparecer
        // brevemente pra ter altura mensurável (scrollHeight de elemento com
        // display:none é sempre 0). Como todo o loop roda em sequência
        // síncrona, o navegador não chega a pintar esse estado intermediário
        // na tela -- por isso é seguro reesconder no final sem "piscar".
        const wasHidden = !opened;
        if (wasHidden) panel.classList.remove('ig-panel-hidden');

        let maxHeight = 0;
        const originalIdx = current;
        data.forEach((obj, i) => {
          paint(i);
          maxHeight = Math.max(maxHeight, panel.scrollHeight);
        });

        if (originalIdx === -1) {
          dots.forEach((dot) => dot.classList.remove('active'));
        } else {
          paint(originalIdx);
        }

        if (wasHidden) panel.classList.add('ig-panel-hidden');

        if (maxHeight > 0) panel.style.minHeight = maxHeight + 'px';
      }

      let resizeTimeout = null;
      const scheduleEqualize = (delay) => {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(equalizeHeight, delay || 0);
      };

      if (startClosed) {
        panel.classList.add('ig-panel-hidden');
      } else {
        paint(0);
      }
      scheduleEqualize(50);
      window.addEventListener('load', () => scheduleEqualize(0));
      window.addEventListener('resize', () => scheduleEqualize(150));

      if (aulaPages.length > 1) {
        document.getElementById('aulaPagPrev') && document.getElementById('aulaPagPrev').addEventListener('click', () => scheduleEqualize(50));
        document.getElementById('aulaPagNext') && document.getElementById('aulaPagNext').addEventListener('click', () => scheduleEqualize(50));
      }
    }

    document.querySelectorAll('[data-infographic]').forEach(initInfographic);

    /* ==========================================================================
       10. TIMELINE HISTÓRICA EM TRILHA (mesmo padrão de navegação do
           infográfico interativo, com um número grande no fundo do painel)
       ==========================================================================
       Motor genérico: lê os dados de window.EDUFLEX_TIMELINES[chave], onde
       "chave" vem do atributo data-timeline="chave" do container no HTML.
       Segue o mesmo princípio do infográfico: nenhuma lógica de comportamento
       fica solta no meio do HTML, só os dados (no arquivo js/aulaX.js da aula).
       ========================================================================== */
    function initHistoryTimeline(container) {
      const key = container.dataset.timeline;
      const data = (window.EDUFLEX_TIMELINES || {})[key];
      if (!data || !data.length) return;

      const dots = container.querySelectorAll('.tl-dot');
      const panel = container.querySelector('.tl-panel');
      const bignum = container.querySelector('.tl-panel-bignum');
      const era = container.querySelector('.tl-panel-era');
      const title = container.querySelector('.tl-panel-title');
      const desc = container.querySelector('.tl-panel-desc');

      if (!panel || !title || !desc) return;

      function paint(idx) {
        const item = data[idx];
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
        if (bignum) bignum.textContent = item.num;
        if (era) era.textContent = item.era;
        title.textContent = item.title;
        desc.textContent = item.desc;
      }

      function render(idx) {
        panel.style.opacity = 0;
        window.setTimeout(() => {
          paint(idx);
          panel.style.opacity = 1;
        }, 100);
      }

      dots.forEach((dot) => {
        dot.addEventListener('click', () => render(parseInt(dot.dataset.idx, 10)));
      });

      // Mesma técnica de equalização de altura do infográfico: mede todos os
      // itens (não só o visível) pra fixar a altura do painel no maior deles.
      function equalizeHeight() {
        if (container.offsetParent === null) return;
        panel.style.minHeight = '';
        let maxHeight = 0;
        data.forEach((item, i) => {
          paint(i);
          maxHeight = Math.max(maxHeight, panel.scrollHeight);
        });
        paint(0);
        if (maxHeight > 0) panel.style.minHeight = maxHeight + 'px';
      }

      let resizeTimeout = null;
      const scheduleEqualize = (delay) => {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(equalizeHeight, delay || 0);
      };

      paint(0);
      scheduleEqualize(50);
      window.addEventListener('load', () => scheduleEqualize(0));
      window.addEventListener('resize', () => scheduleEqualize(150));

      if (aulaPages.length > 1) {
        document.getElementById('aulaPagPrev') && document.getElementById('aulaPagPrev').addEventListener('click', () => scheduleEqualize(50));
        document.getElementById('aulaPagNext') && document.getElementById('aulaPagNext').addEventListener('click', () => scheduleEqualize(50));
      }
    }

    document.querySelectorAll('[data-timeline]').forEach(initHistoryTimeline);

    /* ==========================================================================
       11. FLUXOGRAMA INTERATIVO (caixa raiz -> níveis clicáveis -> modal)
       ==========================================================================
       Motor genérico: lê os dados de window.EDUFLEX_FLOWCHARTS[chave], onde
       "chave" vem do atributo data-flowchart="chave" do container no HTML.
       Cada nível pode ter itens de lista simples (string) ou um item com um
       trecho vinculado a um popover — nesse caso, o item é um objeto
       { text, linkWord, popoverTitle, popoverContent }, e o motor separa o
       texto ao redor de "linkWord" para inserir o link ali no meio.
       ========================================================================== */
    function initFlowchart(container) {
      const key = container.dataset.flowchart;
      const data = (window.EDUFLEX_FLOWCHARTS || {})[key];
      if (!data || !data.levels || !data.levels.length) return;

      const modalId = container.dataset.modalTarget || 'fcLevelModal';
      const modalEl = document.getElementById(modalId);
      if (!modalEl || typeof bootstrap === 'undefined') return;

      const modalTitle = modalEl.querySelector('.modal-title');
      const modalHeaderIcon = modalEl.querySelector('.fc-modal-header-icon');
      const modalIntro = modalEl.querySelector('.fc-modal-intro');
      const modalList = modalEl.querySelector('.fc-modal-list');
      const modalNote = modalEl.querySelector('.fc-modal-note');
      const bsModal = new bootstrap.Modal(modalEl);

      container.querySelectorAll('.fc-level-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const level = data.levels[parseInt(btn.dataset.idx, 10)];
          if (!level) return;

          if (modalTitle) modalTitle.textContent = level.title + (level.sub ? ' — ' + level.sub : '');
          if (modalHeaderIcon) modalHeaderIcon.className = 'bi fc-modal-header-icon ' + (level.icon || 'bi-diagram-3-fill');
          if (modalIntro) modalIntro.textContent = level.intro || '';
          if (modalNote) {
            modalNote.textContent = level.note || '';
            modalNote.classList.toggle('d-none', !level.note);
          }

          if (modalList) {
            modalList.innerHTML = '';
            (level.items || []).forEach((item) => {
              const li = document.createElement('li');

              if (typeof item === 'string') {
                li.textContent = item;
              } else if (item && item.linkWord && item.text.includes(item.linkWord)) {
                const [before, after] = item.text.split(item.linkWord);
                li.appendChild(document.createTextNode(before));

                const a = document.createElement('a');
                a.href = 'javascript:void(0)';
                a.setAttribute('role', 'button');
                a.setAttribute('tabindex', '0');
                a.setAttribute('data-bs-toggle', 'popover');
                a.setAttribute('data-bs-trigger', 'focus');
                a.setAttribute('data-bs-placement', 'bottom');
                a.setAttribute('data-bs-title', item.popoverTitle || '');
                a.setAttribute('data-bs-content', item.popoverContent || '');
                a.textContent = item.linkWord;
                li.appendChild(a);
                new bootstrap.Popover(a);

                li.appendChild(document.createTextNode(after));
              } else if (item && item.text) {
                li.textContent = item.text;
              }

              modalList.appendChild(li);
            });
          }

          bsModal.show();
        });
      });
    }

    document.querySelectorAll('[data-flowchart]').forEach(initFlowchart);

    /* ==========================================================================
       10. FLUXO "BADC" CLICÁVEL -- variante do componente .flow-badc (passo a
       passo com ícone + texto) em que o texto de cada etapa fica escondido até
       o usuário clicar no ícone. Opt-in via classe .flow-badc--clickable no
       container, então não muda em nada os .flow-badc estáticos já existentes
       em outras aulas (continuam sempre com o texto visível).
       ========================================================================== */
    document.querySelectorAll('.flow-badc--clickable').forEach((flow) => {
      flow.querySelectorAll('.flow-badc-step').forEach((step) => {
        const btn = step.querySelector('.flow-badc-icon');
        if (!btn) return;
        btn.addEventListener('click', () => {
          const isOpen = step.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      });
    });
  });
})();