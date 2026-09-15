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

    // Guarda o HTML original do quiz (perguntas, barra de progresso, etc.)
    // assim que a página carrega, para podermos restaurá-lo no "Refazer Quiz"
    // sem precisar dar location.reload() — o que, com a paginação da aula,
    // jogava o aluno de volta pra Página 1 em vez de continuar na atividade.
    const quizContainerEl = document.getElementById('eduflexQuizContainer');
    const originalQuizHTML = quizContainerEl ? quizContainerEl.innerHTML : '';

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
      if (questionText) questionText.innerText = qData.q;
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

      // Marca visualmente a opção escolhida (certa/errada) e atualiza o placar,
      // independentemente de ser ou não a última questão.
      if (isCorrect) {
        btn.classList.remove('btn-light', 'text-muted');
        btn.classList.add('btn-success', 'text-white', 'fw-bold');
        currentScore++;

        const scoreCount = document.getElementById('quizScoreCount');
        if (scoreCount) scoreCount.innerText = currentScore;
      } else {
        btn.classList.remove('btn-light', 'text-muted');
        btn.classList.add('btn-danger', 'text-white', 'fw-bold');
      }

      const isLastQuestion = currentQIndex === questionsData.length - 1;

      const feedbackBox = document.getElementById('quizFeedbackBox');
      if (feedbackBox) {
        feedbackBox.classList.remove('d-none', 'bg-success-subtle', 'text-success-emphasis', 'border-success-subtle', 'bg-danger-subtle', 'text-danger-emphasis', 'border-danger-subtle');

        if (isCorrect) {
          feedbackBox.classList.add('bg-success-subtle', 'text-success-emphasis', 'border', 'border-success-subtle');
          feedbackBox.innerHTML = '<strong>Parabéns, você acertou!</strong> ' + exp;
        } else {
          feedbackBox.classList.add('bg-danger-subtle', 'text-danger-emphasis', 'border', 'border-danger-subtle');
          feedbackBox.innerHTML = '<strong>Você não selecionou a resposta correta!</strong> ' + exp;
        }
      }

      const nextBtn = document.getElementById('quizNextBtn');

      // Na última questão: mostra o feedback normalmente (acima), mas não
      // mostra o botão "Próxima Questão" nem a tela de resultado final.
      // (O botão já estava escondido desde o render, aqui só garantimos.)
      if (isLastQuestion) {
        if (nextBtn) nextBtn.classList.add('d-none');
        return;
      }

      if (nextBtn) nextBtn.disabled = false;
    };

    // Define o ícone, o título e a mensagem exibidos na tela final, de acordo
    // com a faixa de aproveitamento do aluno.
    function getQuizFeedback(score, total) {
      const pct = total > 0 ? Math.round((score / total) * 100) : 0;

      if (pct === 100) {
        return {
          icon: 'bi-trophy-fill',
          iconColor: 'text-warning',
          title: 'Parabéns, você mandou muito bem!',

          message: `Você acertou todas as ${total} questões. Mostrou que domina bem o conteúdo desta aula!`
        };
      }
      if (pct >= 70) {
        return {
          icon: 'bi-emoji-smile-fill',
          iconColor: 'text-success',
          title: 'Muito bem!',
          message: `Você acertou ${score} de ${total} questões (${pct}% de aproveitamento). Só faltou pouco para a perfeição!`
        };
      }
      if (pct >= 50) {
        return {
          icon: 'bi-emoji-neutral-fill',
          iconColor: 'text-primary',
          title: 'Está quase lá!',
          message: `Você acertou ${score} de ${total} questões (${pct}% de aproveitamento). Vale a pena revisar o conteúdo e tentar de novo.`
        };
      }
      if (pct > 0) {
        return {
          icon: 'bi-emoji-frown-fill',
          iconColor: 'text-secondary',
          title: 'Vamos tentar de novo?',
          message: `Você acertou ${score} de ${total} questões (${pct}% de aproveitamento). Que tal revisar o conteúdo da aula antes de refazer?`
        };
      }
      return {
        icon: 'bi-emoji-dizzy-fill',
        iconColor: 'text-danger',
        title: 'Vish, acho que precisa melhorar',
        message: `Você não acertou nenhuma das ${total} questões. Não desanime — reveja o conteúdo da aula e tente novamente!`
      };
    }

    // Prepara (ou reinicia) o quiz: zera o placar, restaura a primeira
    // pergunta e reataca o listener do botão "Próxima Questão". Usada tanto
    // no carregamento da página quanto no botão "Refazer Quiz".
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
      } else {
        const quizContainer = document.getElementById('eduflexQuizContainer');
        if (quizContainer) {
          const feedback = getQuizFeedback(currentScore, questionsData.length);
          quizContainer.innerHTML = `
            <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
              <i class="bi ${feedback.icon} display-4 ${feedback.iconColor} mb-3"></i>
              <h4 class="fw-bold text-dark mb-2">${feedback.title}</h4>
              <p class="text-secondary mb-4">${feedback.message}</p>
              <div>
                <button class="btn bg-primary text-white rounded-pill px-4" id="quizRestartBtn">
                  <i class="bi bi-arrow-repeat me-1"></i> Refazer Quiz
                </button>
              </div>
            </div>
          `;

          const restartBtn = document.getElementById('quizRestartBtn');
          if (restartBtn) {
            restartBtn.addEventListener('click', () => {
              // Restaura a estrutura original do quiz (sem recarregar a
              // página inteira) e reinicia do zero.
              quizContainer.innerHTML = originalQuizHTML;
              startQuiz();
            });
          }
        }
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

      let current = 0;

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

        actionsList.innerHTML = '';
        const hasActions = Array.isArray(obj.actions) && obj.actions.length > 0;
        if (actionsLabel) actionsLabel.classList.toggle('d-none', !hasActions);
        actionsList.classList.toggle('d-none', !hasActions);
        if (hasActions) {
          obj.actions.forEach((action) => {
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
        }

        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) nextBtn.disabled = idx === data.length - 1;
      }

      function render(idx) {
        current = idx;
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

        let maxHeight = 0;
        const originalIdx = current;
        data.forEach((obj, i) => {
          paint(i);
          maxHeight = Math.max(maxHeight, panel.scrollHeight);
        });
        paint(originalIdx);

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

      // Variante em modal (opt-in via data-timeline-modal="idDoModal" no
      // container): em vez de pintar um painel pequeno com scroll interno
      // logo abaixo da trilha de datas, cada clique pinta o conteúdo dentro
      // de um modal grande (Bootstrap) e o abre. Painel/scroll internos
      // continuam existindo só na variante antiga, abaixo.
      const modalId = container.dataset.timelineModal;
      const modalEl = modalId ? document.getElementById(modalId) : null;

      const panel = modalEl ? modalEl.querySelector('.tl-panel') : container.querySelector('.tl-panel');
      const bignum = panel ? panel.querySelector('.tl-panel-bignum') : null;
      const era = panel ? panel.querySelector('.tl-panel-era') : null;
      const title = panel ? panel.querySelector('.tl-panel-title') : null;
      const desc = panel ? panel.querySelector('.tl-panel-desc') : null;

      if (!panel || !title || !desc) return;

      function paint(idx) {
        const item = data[idx];
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
        if (bignum) bignum.textContent = item.num;
        if (era) era.textContent = item.era;
        title.textContent = item.title;
        desc.innerHTML = item.desc;
      }

      if (modalEl) {
        dots.forEach((dot) => {
          dot.addEventListener('click', () => {
            paint(parseInt(dot.dataset.idx, 10));
            bootstrap.Modal.getOrCreateInstance(modalEl).show();
          });
        });
        paint(0);
        return;
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

    // Acessibilidade: permite abrir/fechar os cards expansíveis (imagem +
    // texto que revela ao clicar) via teclado, com Enter ou Espaço.
    document.querySelectorAll('.card-expandable[role="button"]').forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          card.click();
        }
      });
    });

    /* ==========================================================================
       12. ATIVIDADE DE ESTUDO DE CASO (checkboxes de múltipla resposta,
       corrigidas de uma vez só ao clicar em "Confirmar respostas")
       ==========================================================================
       Cada checkbox marcado com data-correct="true" é uma resposta certa.
       Ao confirmar: opções certas marcadas ficam verdes (✓), opções erradas
       marcadas ficam vermelhas (✗), opções certas que passaram batido ficam
       em laranja (!) pra mostrar o que faltou. O painel de análise mostra a
       introdução "positiva" só se TODAS as certas foram marcadas e NENHUMA
       errada foi marcada; caso contrário, mostra a introdução "negativa" —
       o restante do texto (explicação) é o mesmo nos dois casos.
       ========================================================================== */
    document.querySelectorAll('[data-situacao]').forEach(function (card) {
      const btn = card.querySelector('.caso-confirmar-btn');
      if (!btn) return;

      // Aviso "selecione ao menos uma opção", criado uma vez e escondido
      // por padrão, reaproveitado sempre que a pessoa tentar confirmar
      // sem marcar nada.
      const aviso = document.createElement('div');
      aviso.className = 'alert alert-warning mt-3 mb-0 d-none';
      aviso.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Selecione ao menos uma opção antes de confirmar.';
      btn.insertAdjacentElement('afterend', aviso);

      btn.addEventListener('click', function () {
        const checkboxes = card.querySelectorAll('.form-check-input');
        const anyChecked = Array.from(checkboxes).some((cb) => cb.checked);
        if (!anyChecked) {
          aviso.classList.remove('d-none');
          aviso.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }
        aviso.classList.add('d-none');

        let allCorrect = true;

        checkboxes.forEach(function (cb) {
          const isCorrect = cb.dataset.correct === 'true';
          const label = cb.closest('.form-check').querySelector('.form-check-label');
          if (cb.checked && isCorrect) {
            label.classList.add('text-success', 'fw-bold');
            label.insertAdjacentHTML('afterbegin', '<i class="bi bi-check-circle-fill text-success me-1"></i>');
          } else if (cb.checked && !isCorrect) {
            label.classList.add('text-danger', 'fw-bold');
            label.insertAdjacentHTML('afterbegin', '<i class="bi bi-x-circle-fill text-danger me-1"></i>');
            allCorrect = false;
          } else if (!cb.checked && isCorrect) {
            label.classList.add('text-warning', 'fw-bold');
            label.insertAdjacentHTML('afterbegin', '<i class="bi bi-exclamation-circle-fill text-warning me-1"></i>');
            allCorrect = false;
          }
          cb.disabled = true;
        });

        const feedback = document.querySelector(btn.dataset.target);
        if (feedback) {
          feedback.classList.remove('d-none');
          const pos = feedback.querySelector('.feedback-positivo');
          const neg = feedback.querySelector('.feedback-negativo');
          if (pos) pos.classList.toggle('d-none', !allCorrect);
          if (neg) neg.classList.toggle('d-none', allCorrect);
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        btn.disabled = true;
      });
    });

    // Revela a próxima situação (como o botão "Próxima Questão" do quiz)
    // só depois que a pessoa confirma as respostas da situação atual.
    document.querySelectorAll('.proxima-situacao-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const nextCard = document.querySelector('[data-situacao="' + btn.dataset.next + '"]');
        if (!nextCard) return;
        const currentCard = btn.closest('[data-situacao]');
        if (currentCard) currentCard.classList.add('d-none');
        nextCard.classList.remove('d-none');
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* ==========================================================================
       FLUXO "BADC" CLICÁVEL -- variante do componente .flow-badc (passo a
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

    /* ==========================================================================
       GRÁFICO DE BARRAS SIMPLES (.h5n1-chart) -- a altura de cada barra
       representa o dado em si (por isso continua variável). Antes vinha em
       style="height: X%;" inline no HTML (não permitido pelo eMAG - 2.2);
       agora o valor fica em data-height e é aplicado aqui, em JS. As cores
       (fixas, uma por categoria) já foram movidas para o CSS via
       data-color -- ver style.css.
       ========================================================================== */
    document.querySelectorAll('.h5n1-chart-bar[data-height]').forEach((bar) => {
      bar.style.height = bar.dataset.height + '%';
    });
  });
})();