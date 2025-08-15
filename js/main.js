(function(){
  // Ano no rodapé
  var YEAR=document.getElementById('year'); 
  if(YEAR) YEAR.textContent=new Date().getFullYear();

  // UTM
  var utm = window.__utm || '';

  // WhatsApp: DEFINA o número
  var WHATSAPP_NUMBER='5561999999999'; // <-- TROCAR
  var BASE_WA='https://wa.me/'+WHATSAPP_NUMBER+'?text='+
    encodeURIComponent('Olá, quero informações sobre o MacBook Pro (M2/M3/M4). Vim pela Landing Page.');

  function buildWaLink(extra){
    var url = BASE_WA;
    if (extra) url += encodeURIComponent(' | ' + extra);
    if (utm) url += '%0A%0AUTM=' + encodeURIComponent(utm);
    return url;
  }

  // Bind em todos os botões .js-wa
  document.querySelectorAll('.js-wa').forEach(function(btn){
    var product = btn.getAttribute('data-product') || 'generic';
    btn.setAttribute('href', buildWaLink(product));
    btn.addEventListener('click', function(){
      // GA4 via GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event:'whatsapp_click',
        product:product,
        position_id:btn.id || 'no-id',
        utm: utm
      });
      // Meta Pixel
      if (window.fbq) fbq('track','Contact',{content_name:product});
    });
  });

  // Track de seções vistas (hero, modelos, prova-social, faq)
  var sections = ['hero','modelos','prova-social','faq','lifestyle'];
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var id = e.target.id || e.target.getAttribute('data-section');
        if (!id) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event:'section_view', section:id});
      }
    });
  }, {threshold: 0.4});
  sections.forEach(function(id){
    var el = document.getElementById(id); if (el) obs.observe(el);
  });

  // Scroll depth simples
  var f25=false,f50=false,f75=false;
  window.addEventListener('scroll', function(){
    var h=document.documentElement.scrollHeight - window.innerHeight;
    var p=(window.scrollY / h)*100;
    if (!window.dataLayer) window.dataLayer=[];
    if(!f25 && p>25){window.dataLayer.push({event:'scroll_depth',percent:25});f25=true}
    if(!f50 && p>50){window.dataLayer.push({event:'scroll_depth',percent:50});f50=true}
    if(!f75 && p>75){window.dataLayer.push({event:'scroll_depth',percent:75});f75=true}
  });
})();
