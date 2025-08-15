/* ====== AJUSTES GERAIS ====== */
img, picture, video { background: transparent !important; display: block; }

/* Botão verde padrão */
.btn-primary {
  background:#07d83b; color:#fff;
  transition:filter .2s, transform .2s;
}
.btn-primary:hover { filter:brightness(.95); transform:translateY(-1px); }

/* Chip “PRO” com borda forte */
.chip-pro { border-width:3px; }
@media (min-width:768px){ .chip-pro { border-width:4px; } }

/* Micro-animação suave usada no hero */
@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.float-slow { animation: floatY 6s ease-in-out infinite; }

/* FAQ: o “+” gira quando abre */
details[open] summary .plus { transform: rotate(45deg); }
/* Remove o marcador padrão do <summary> */
summary::-webkit-details-marker { display:none; }

/* Sub-menu do hero (chips) */
.chip-link{
  display:inline-block; padding:.5rem .9rem; border-radius:9999px;
  border:1px solid rgba(255,255,255,.16); color:#fff;
  background:rgba(255,255,255,.06);
  transition: background .2s, border-color .2s, transform .2s;
}
.chip-link:hover{
  background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.28);
  transform: translateY(-1px);
}

/* Bullets verdes das listas */
.bullet{ display:inline-block; width:6px; height:6px; border-radius:9999px; background:#07d83b; }

/* ====== SEÇÃO 3D (estilo Apple) ====== */

/* Botões 14"/16" */
.size-toggle{
  -webkit-appearance:none; appearance:none;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.18);
  color:#fff;
  padding:.6rem 1rem;
  border-radius:9999px;
  font-weight:600;
  transition: background .2s, border-color .2s, transform .2s, color .2s, box-shadow .2s;
}
.size-toggle:hover{ transform:translateY(-1px); background:rgba(255,255,255,.12); }
.size-toggle.is-active{
  background:#fff; color:#000; border-color:#fff;
  box-shadow:0 0 0 6px rgba(255,255,255,.06) inset;
}

/* Wrapper de cada viewer (usaremos 2 iframes e alternamos) */
.viewer-iframe{ display:none; }
.viewer-iframe.is-visible{ display:block; }

/* Embed do Sketchfab responsivo e com visual limpo */
.sketchfab-embed-wrapper{ position:relative; width:100%; }
.sketchfab-embed-wrapper iframe{
  display:block; width:100%;
  /* proporção parecida com a da Apple; ajusta conforme preferir */
  aspect-ratio: 16 / 9;
  background:#0a0a0a;
}

/* Créditos do Sketchfab discretos */
.sf-credit{
  font-size:12px; color:rgba(255,255,255,.55);
  padding:.5rem .75rem;
}
.sf-credit a{ color:rgba(255,255,255,.75); text-decoration:none; }
.sf-credit a:hover{ text-decoration:underline; }

/* ====== (opcional) efeito de tampa — se for usar em alguma cena custom ====== */
/* Animação de abertura da tampa */
@keyframes lidOpen {
  0%   { transform: rotateX(78deg); }
  50%  { transform: rotateX(20deg); }
  100% { transform: rotateX(0deg); }
}
/* Ao entrar em cena, reproduz a animação */
#apple-hero-3d.inview #lid {
  animation: lidOpen 1.6s cubic-bezier(.22,.61,.36,1) forwards;
}
/* Tilt/parallax suave da cena inteira */
.mb-canvas:hover { transition: transform .15s ease; }
