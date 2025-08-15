(function(){
  /* =========================
     UTILIDADES / CONFIG INICIAL
     ========================= */
  // Ano no rodapé
  var YEAR = document.getElementById('year');
  if (YEAR) YEAR.textContent = new Date().getFullYear();

  // UTM propagada do <head>
  var utm = window.__utm || '';

  // WhatsApp: DEFINA o número real
  var WHATSAPP_NUMBER = '5561999999999'; // <-- TROCAR PELO NÚMERO CERTO
  var BASE_WA = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' +
    encodeURIComponent('Olá, quero informações sobre o MacBook Pro (M2/M3/M4). Vim pela Landing Page.');

  function buildWaLink(extra){
    var url = BASE_WA;
    if (extra) url += encodeURIComponent(' | ' + extra);
    if (utm) url += '%0A%0AUTM=' + encodeURIComponent(utm);
    return url;
  }

  // Bind em todos os botões .js-wa (link + métricas)
  document.querySelectorAll('.js-wa').forEach(function(btn){
    var product = btn.getAttribute('data-product') || 'generic';
    btn.setAttribute('href', buildWaLink(product));
    btn.addEventListener('click', function(){
      // GA4 via GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_click',
        product: product,
        position_id: btn.id || 'no-id',
        utm: utm
      });
      // Meta Pixel
      if (window.fbq) fbq('track', 'Contact', { content_name: product });
    });
  });

  /* =========================
     TRACK DE SEÇÕES / SCROLL
     ========================= */
  var sections = ['hero','viewer-3d','modelos','prova-social','duvidas','lifestyle'];
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var id = e.target.id || e.target.getAttribute('data-section');
        if (!id) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'section_view', section: id });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(id){
    var el = document.getElementById(id);
    if (el) obs.observe(el);
  });

  // Scroll depth simples
  var f25=false,f50=false,f75=false;
  window.addEventListener('scroll', function(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = (window.scrollY / h) * 100;
    if (!window.dataLayer) window.dataLayer = [];
    if (!f25 && p > 25){ window.dataLayer.push({event:'scroll_depth',percent:25}); f25 = true; }
    if (!f50 && p > 50){ window.dataLayer.push({event:'scroll_depth',percent:50}); f50 = true; }
    if (!f75 && p > 75){ window.dataLayer.push({event:'scroll_depth',percent:75}); f75 = true; }
  });

  /* =========================
     SEÇÃO 3D — CONTROLES 14"/16"
     ========================= */
  var labelEl = document.getElementById('viewerLabel');
  var toggleBtns = document.querySelectorAll('.size-toggle');
  var viewers = {
    '14': document.getElementById('viewer14'),
    '16': document.getElementById('viewer16')
  };

  // Função para alternar entre 14" e 16"
  function setActiveViewer(size){
    if (!viewers[size]) return;

    // Alterna visibilidade dos viewers
    Object.keys(viewers).forEach(function(k){
      if (viewers[k]) viewers[k].classList.remove('is-visible');
    });
    viewers[size].classList.add('is-visible');

    // Atualiza estado visual dos botões
    toggleBtns.forEach(function(b){ b.classList.remove('is-active'); });
    var activeBtn = document.querySelector('.size-toggle[data-size="'+ size +'"]');
    if (activeBtn) activeBtn.classList.add('is-active');

    // Atualiza legenda
    if (labelEl){
      labelEl.textContent = (size === '16')
        ? 'MacBook Pro 16″ — Space Black'
        : 'MacBook Pro 14″ — Space Black';
    }

    // Métrica
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'viewer_size_change', size: size });
  }

  // Liga os botões 14/16
  toggleBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var s = btn.getAttribute('data-size') || '14';
      setActiveViewer(s);
    });
  });

  // Estado inicial: 14"
  setActiveViewer('14');

  // Track de interação com o 3D (1x por viewer)
  var interacted = { 'viewer14': false, 'viewer16': false };
  ['viewer14','viewer16'].forEach(function(id){
    var wrap = document.getElementById(id);
    if (!wrap) return;
    wrap.addEventListener('pointerdown', function(){
      if (interacted[id]) return;
      interacted[id] = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'viewer_interact', viewer: id });
    });
  });

})();

