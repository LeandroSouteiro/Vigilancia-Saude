// Este script espera o evento "partialsReady" (disparado pelo
// partials-loader.js depois que o header já foi injetado no DOM) antes de
// rodar. Isso garante que #mainHeader já existe quando o listener de scroll
// tentar usá-lo — sem isso, existia uma janela pequena em que o header podia
// ainda não ter carregado.
//
// Observação: a chamada a lucide.createIcons() que existia aqui foi removida
// porque o partials-loader.js já chama isso sozinho, logo depois de injetar
// os parciais (e antes de disparar este evento) — manter as duas seria
// redundante.

// ==========================================================================
// FALLBACK DE IMAGENS QUEBRADAS (fundo do vídeo + logos do rodapé)
// ==========================================================================
// Antes esse comportamento vinha via atributo onerror="..." direto no HTML
// (JS inline), o que o guia de acessibilidade pede para evitar --
// comportamento deve ficar separado do conteúdo/marcação. Por isso ele foi
// movido para cá.
//
// IMPORTANTE: isso roda AQUI FORA do listener de "partialsReady", e não
// dentro dele. As imagens tratadas (fundo do vídeo e logos do rodapé) fazem
// parte do próprio HTML da página (não vêm de partials/header|sidebar|
// modals|footer.html), então já existem no DOM assim que este script
// carrega -- não é preciso esperar os parciais, que levam um tempo extra
// (fetch de 4 arquivos). Se esperássemos por "partialsReady", uma imagem
// que falhasse rápido demais (ex.: erro de rede já em cache) poderia
// disparar o evento "error" antes da gente sequer ter escutado por ele.
//
// Por segurança, além de escutar o evento "error", também checamos se a
// imagem JÁ falhou antes deste script rodar (img.complete === true e
// img.naturalWidth === 0 é a forma padrão de detectar isso).
function handleImgLoadError(img, onError) {
    if (img.complete && img.naturalWidth === 0) {
        onError.call(img);
    } else {
        img.addEventListener('error', onError);
    }
}

var videoBgImage = document.querySelector('.video-bg-image');
if (videoBgImage) {
    handleImgLoadError(videoBgImage, function () {
        this.style.display = 'none';
    });
}

document.querySelectorAll('.footer-logo-placeholder img').forEach(function (img) {
    handleImgLoadError(img, function () {
        this.style.display = 'none';
        this.parentNode.classList.add('no-img');
    });
});

document.addEventListener('partialsReady', function () {

    window.addEventListener('scroll', function() {
        var header = document.getElementById('mainHeader');
        var scrollProgress = document.getElementById('scrollProgress');
        var btnToTop = document.getElementById('btnBackToTop');

        var totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';

        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        if (window.scrollY > 400) {
            btnToTop.classList.add('visible');
        } else {
            btnToTop.classList.remove('visible');
        }
    });

    document.getElementById('btnBackToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    var transcricaoCollapse = document.getElementById('transcricaoCollapse');
    var btnTranscricao = document.querySelector('.btn-transcricao');

    transcricaoCollapse.addEventListener('show.bs.collapse', function () {
        btnTranscricao.classList.add('active');
    });
    transcricaoCollapse.addEventListener('hide.bs.collapse', function () {
        btnTranscricao.classList.remove('active');
    });

    // Animações de entrada: revela os elementos com a classe
    // .reveal-on-scroll conforme eles entram na viewport, usando
    // IntersectionObserver (mais leve que escutar "scroll" o tempo todo).
    // Respeita prefers-reduced-motion -- pessoas que pediram menos
    // movimento no sistema não veem nenhuma transição, os elementos já
    // aparecem visíveis direto (o CSS já cuida disso sozinho via media
    // query, mas aqui a gente também pula o observer por completo).
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealEls = document.querySelectorAll('.reveal-on-scroll');

    if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // Sem suporte a IntersectionObserver (navegador muito antigo) ou
        // movimento reduzido pedido: mostra tudo de uma vez, sem animação.
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Acessibilidade: avisa tecnologias assistivas quando um link abre em
    // nova aba/guia (target="_blank"), conforme o guia de acessibilidade
    // ("Descrever links de forma clara" -- deve-se informar quando o link
    // remete a outro site/nova instância). O indicador visual (ícone ↗)
    // fica só no CSS; aqui adicionamos o equivalente textual para quem usa
    // leitor de tela, sem precisar editar cada link manualmente.
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
        if (link.querySelector('.aviso-nova-aba')) return; // já processado
        var aviso = document.createElement('span');
        aviso.className = 'visually-hidden aviso-nova-aba';
        aviso.textContent = ' (abre em nova aba)';
        link.appendChild(aviso);
    });

});