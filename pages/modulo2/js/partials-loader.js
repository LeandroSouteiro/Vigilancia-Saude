/* ==========================================================================
   CARREGADOR DE PARCIAIS (HEADER / SIDEBAR / MODAIS / RODAPÉ)
   Busca fragmentos HTML compartilhados e injeta nos placeholders de cada
   página. Assim, cabeçalho, menu lateral, modais e rodapé ficam escritos em
   UM lugar só — editar esses arquivos atualiza automaticamente a Home e
   todas as aulas.

   PLACEHOLDERS ESPERADOS EM CADA PÁGINA:
     <div id="site-header"></div>   -> partials/header.html
     <div id="site-sidebar"></div>  -> partials/sidebar.html  (só nas aulas)
     <div id="site-modals"></div>   -> partials/modals.html
     <div id="site-footer"></div>   -> partials/footer.html   (só nas aulas)

   CAMINHOS: como a Home (index.html) fica na raiz do site e as aulas ficam
   dentro de pages/moduloX/, os links dentro dos parciais usam dois tokens
   que são substituídos antes de injetar:
     {{ROOT}}  -> caminho até a raiz do site (ex.: logo, link "Página Inicial")
     {{PAGES}} -> caminho até a pasta "pages/" (ex.: links do modal Módulos
                  e do menu lateral)
   Cada página declara os valores certos ANTES de carregar este script:

     <script>
       window.SITE_ROOT = '../../';   // raiz do site a partir desta página
       window.PAGES_ROOT = '../';     // pasta pages/ a partir desta página
       window.SIDEBAR_SUBTITLE = 'Módulo 1 · Aula 1.2 · Fundamentos da Vigilância em Saúde';
     </script>
     <script src="js/partials-loader.js"></script>

   Na Home (index.html), ROOT/PAGES são '' e 'pages/'. A Home não tem
   sidebar/rodapé de aula, então basta não incluir os placeholders
   correspondentes — o loader simplesmente ignora o que não existir.

   DESTAQUE AUTOMÁTICO DO LINK ATIVO: depois de injetar o menu lateral, o
   loader compara a URL de cada link com a URL atual da página e marca o
   correspondente como "active" (e abre o módulo certo), então não é preciso
   marcar isso manualmente em cada página.

   IMPORTANTE: este arquivo precisa ser servido por um servidor local/HTTP
   (Live Server, Moodle, etc.) — abrir o .html direto (duplo-clique) bloqueia
   o fetch() de arquivos locais por causa de CORS.

   Depois que os parciais terminam de carregar, este script dispara o evento
   "partialsReady" no document. O main.js espera esse evento (em vez de
   DOMContentLoaded) antes de rodar sua lógica.
   ========================================================================== */

(function () {
  'use strict';

  const ROOT = typeof window.SITE_ROOT === 'string' ? window.SITE_ROOT : '';
  const PAGES = typeof window.PAGES_ROOT === 'string' ? window.PAGES_ROOT : '';
  const SUBTITLE = typeof window.SIDEBAR_SUBTITLE === 'string' ? window.SIDEBAR_SUBTITLE : '';

  function applyTokens(html) {
    return html
      .split('{{ROOT}}').join(ROOT)
      .split('{{PAGES}}').join(PAGES)
      .split('{{SUBTITLE}}').join(SUBTITLE);
  }

  async function loadPartial(url, mountSelector) {
    const mount = document.querySelector(mountSelector);
    if (!mount) return;

    try {
      const response = await fetch(ROOT + url);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      const raw = await response.text();
      mount.outerHTML = applyTokens(raw);
    } catch (err) {
      console.error(
        '[EduFlex] Não foi possível carregar o parcial "' + url + '". ' +
        'Verifique se a página está sendo servida por um servidor local/HTTP ' +
        '(não abra o arquivo direto com duplo-clique) e se window.SITE_ROOT ' +
        'está configurado corretamente nesta página.',
        err
      );
    }
  }

  // Marca como "active" o link do menu lateral que corresponde à página
  // atual, e garante que o accordion daquele módulo esteja aberto — e que
  // os demais módulos fiquem fechados, mesmo quando o link ativo não
  // pertence a nenhum módulo (ex.: "Encerramento do Curso").
  function highlightActiveSidebarLink() {
    const sidebar = document.getElementById('sidebarAula');
    if (!sidebar) return;

    const links = sidebar.querySelectorAll('a.nav-link[href]');
    let matched = null;
    const currentUrl = window.location.href.split('#')[0].split('?')[0];

    links.forEach((link) => {
      link.classList.remove('active');
      // link.href (propriedade, não getAttribute) já vem resolvido pelo
      // navegador como URL absoluta, então a comparação funciona
      // independente de quantos "../" o link tem.
      if (link.href === currentUrl) {
        matched = link;
      }
    });

    if (!matched) return;
    matched.classList.add('active');

    const collapseEl = matched.closest('.accordion-collapse');
    const accordionItem = matched.closest('.accordion-item');

    // Fecha todos os módulos que não sejam o do link ativo (se houver um).
    // Isso cobre tanto o caso "trocar de módulo aberto" quanto o caso do
    // link ativo não pertencer a módulo nenhum — nesse caso todos fecham.
    sidebar.querySelectorAll('.accordion-collapse.show').forEach((el) => {
      if (el !== collapseEl) el.classList.remove('show');
    });
    sidebar.querySelectorAll('.accordion-button:not(.collapsed)').forEach((btn) => {
      const targetSelector = btn.getAttribute('data-bs-target');
      const targetEl = targetSelector ? sidebar.querySelector(targetSelector) : null;
      if (targetEl !== collapseEl) {
        btn.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (collapseEl && !collapseEl.classList.contains('show')) {
      collapseEl.classList.add('show');
      const btn = accordionItem ? accordionItem.querySelector('.accordion-button') : null;
      if (btn) {
        btn.classList.remove('collapsed');
        btn.setAttribute('aria-expanded', 'true');
      }
    }
  }

  async function init() {
    await Promise.all([
      loadPartial('partials/header.html', '#site-header'),
      loadPartial('partials/sidebar.html', '#site-sidebar'),
      loadPartial('partials/modals.html', '#site-modals'),
      loadPartial('partials/footer.html', '#site-footer'),
    ]);

    highlightActiveSidebarLink();

    // Re-inicializa os ícones do Lucide para os que vieram dentro dos parciais
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    document.dispatchEvent(new Event('partialsReady'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();