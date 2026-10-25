/* techBoo parallax + curtain scroll, PREVIEW v2 (Oct 25 2026). HOMEPAGE (About tab of index.html) ONLY.
   Her voice note 11:08 Lagos: only the landing page; the bubble must keep showing underneath the sections all the way down
   ("maybe make them transparent").
   - Lenis smooth scroll (vendored: assets/px/lenis.min.js), created only while the About tab is on screen and destroyed
     the moment tabs.js swaps to another tab (no smoothing, no sticky, no inline styles left on other tabs).
   - Each top-level block of <main> goes into a full-width sticky .px-layer. Layers after the hero are translucent glass
     (dark ~62% + backdrop blur, rounded top corners, lilac hairline) and slide over the one before like curtains.
     A covered layer fades out underneath, so at most one sheet of glass sits over the orb at any moment.
   - The hero orb is pinned position:fixed where it first appears, inside the bottom layer, so it glows through every sheet.
   - Hero title rises faster than the scroll and fades; the info card faster still. Headings/media drift a little (parallax).
   - prefers-reduced-motion: nothing here runs. */
(function(){
  if(window.__pxInit) return; window.__pxInit = true;
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");
  if(RM && RM.matches) return;
  var root = document.documentElement, body = document.body;
  var main = document.getElementById("page") || document.querySelector("main");
  if(!main || body.dataset.slug) return;
  var lenis = null, on = false, rafId = 0;
  function isHome(){ return body.dataset.tab === "about" && !!main.querySelector(".tb-hero"); }
  var layers = [], all = [], order = [], hero = null, movers = [], hh = 0, vh = innerHeight, dirty = true, orb = null;
  var clamp = function(v,a,b){ return v<a?a:(v>b?b:v); };

  function headH(){
    var h = document.querySelector(".tb-head");             /* opaque sticky header (home/tabs) */
    if(h){ var cs = getComputedStyle(h); if(cs.position==="sticky"||cs.position==="fixed") return Math.round(h.getBoundingClientRect().height); }
    return 0;                                               /* case pages: floating nav, layers stick to the very top */
  }
  function isBlock(el){
    if(el.nodeType!==1 || el.classList.contains("px-layer")) return false;
    var t = el.tagName; if(t==="SCRIPT"||t==="STYLE"||t==="TEMPLATE"||t==="LINK") return false;
    var cs = getComputedStyle(el);
    if(cs.position==="fixed"||cs.position==="absolute"||cs.display==="none") return false;
    return true;
  }
  function inflow(el){ return Array.prototype.filter.call(el.children, isBlock); }
  function makeLayer(parent, before, cls){ var L = document.createElement("div"); L.className = cls; parent.insertBefore(L, before); return L; }
  /* a very tall block (a whole case-study gallery) is opened up: its own sections become curtains inside it */
  function deepen(B, W){
    var c = B, d = 0, k;
    while(d < 5){ k = inflow(c); if(k.length === 1){ c = k[0]; d++; } else break; }
    k = inflow(c);
    if(k.length < 2) return false;
    var y0 = window.scrollY||0;
    var cs = getComputedStyle(c), col = false;
    if(cs.display === "block" || cs.display === "flow-root") col = false;
    else if((cs.display === "flex" || cs.display === "inline-flex") && cs.flexDirection.indexOf("column") === 0 && cs.flexWrap === "nowrap") col = true;
    else return false;
    var tall = k.filter(function(x){ return x.getBoundingClientRect().height >= 120; }).length;
    if(tall < 2) return false;
    var cur = null;
    k.forEach(remember);
    k.forEach(function(el){
      var small = el.getBoundingClientRect().height < 120;
      if(small && cur){ cur.appendChild(el); return; }
      cur = makeLayer(c, el, "px-layer px-in"); cur.appendChild(el);
      if(col){ cur.style.display = "flex"; cur.style.flexDirection = "column"; cur.style.alignItems = cs.alignItems; cur.style.rowGap = cs.rowGap; }
    });
    W.classList.add("px-deep");
    return true;
  }
  /* wrapping must not move anything: sibling/first-child rules and collapsing margins are re-applied inline */
  var snap = [];
  function docTop(el){ var t = 0; while(el){ t += el.offsetTop; el = el.offsetParent; } return t; }   /* ignores transforms (reveal animations) */
  function remember(el){
    if(el.__pxSnap) return; el.__pxSnap = 1;
    var cs = getComputedStyle(el);
    snap.push({el:el, mt:cs.marginTop, mb:cs.marginBottom, pt:cs.paddingTop, pb:cs.paddingBottom, top:docTop(el)});
  }
  function fixup(){
    if(!snap.length) return;
    snap.forEach(function(s){
      var cs = getComputedStyle(s.el);
      if(cs.marginTop !== s.mt) s.el.style.marginTop = s.mt;
      if(cs.marginBottom !== s.mb) s.el.style.marginBottom = s.mb;
      if(cs.paddingTop !== s.pt) s.el.style.paddingTop = s.pt;
      if(cs.paddingBottom !== s.pb) s.el.style.paddingBottom = s.pb;
    });
    root.classList.add("px-measure");
    snap.forEach(function(s){ var d = 0, n = s.el; while(n){ d++; n = n.parentElement; } s.depth = d; });
    snap.sort(function(a,b){ return (a.top - b.top) || (a.depth - b.depth); });
    snap.forEach(function(s){
      var now = docTop(s.el), d = Math.round(now - s.top);
      if(Math.abs(d) >= 1){ s.el.style.marginTop = (parseFloat(getComputedStyle(s.el).marginTop) - d) + "px"; }
    });
    root.classList.remove("px-measure");
    snap = [];
  }
  function wrap(){
    var kids = Array.prototype.slice.call(main.children);
    if(!kids.some(isBlock)) return false;
    kids.forEach(function(el){ if(isBlock(el)) remember(el); });
    var cur = null, vh0 = innerHeight;
    kids.forEach(function(el){
      if(el.classList.contains("px-layer")){ cur = null; return; }
      if(!isBlock(el)) return;
      var h = el.getBoundingClientRect().height;
      if(h < 40 && cur && !cur.classList.contains("px-deep")){ cur.appendChild(el); return; }
      cur = makeLayer(main, el, "px-layer"); cur.appendChild(el);
      if(h > vh0*2.2) deepen(el, cur);
    });
    fixup();
    return true;
  }
  function collect(){
    layers = Array.prototype.slice.call(main.querySelectorAll(":scope > .px-layer"));
    var inner = Array.prototype.slice.call(main.querySelectorAll(".px-in"));
    movers = []; hero = null; orb = null;
    var h = main.querySelector(".tb-hero");
    if(h && layers[0] && layers[0].contains(h)){
      hero = {L:layers[0], t:h.querySelector(".tb-hero-h"), w:h.querySelector(".tb-widget"), o:null}; orb = h.querySelector(".tb-orb");
    } else if(layers[0] && layers[0].firstElementChild){
      /* case pages: the whole intro block (back link, title, meta) rises a little faster and fades as the work slides over it */
      hero = null;
    }
    layers.forEach(function(L, i){ L.style.zIndex = String(i+1); });
    var groups = new Map();
    inner.forEach(function(L){ var p = L.parentNode, n = groups.get(p)||0; groups.set(p, n+1); L.style.zIndex = String(n+1); });
    all = layers.filter(function(L){ return !L.classList.contains("px-deep"); }).concat(inner);
    var seq = [];
    layers.forEach(function(L){ if(L.classList.contains("px-deep")) seq = seq.concat(Array.prototype.slice.call(L.querySelectorAll(".px-in"))); else seq.push(L); });
    order = seq;
    seq.forEach(function(L, i){
      if(i===0 && hero) return;
      var hs = L.querySelectorAll("h1, h2, .tb-about-b");
      for(var k=0;k<hs.length && k<2;k++) movers.push({el:hs[k], L:L, s:40});
      var ms = L.querySelectorAll(".tb-loop-m, .tb-ex-grid");
      for(var m=0;m<ms.length && m<2;m++) movers.push({el:ms[m], L:L, s:-26});
    });
    movers.forEach(function(m){ m.el.classList.add("px-mv"); });
  }
  function measure(){
    hh = headH(); vh = innerHeight;
    root.style.setProperty("--px-hh", hh+"px");
    var y0 = window.scrollY || root.scrollTop;
    movers.forEach(function(m){ m.el.style.translate = ""; });
    if(hero){ ["t","w","o"].forEach(function(k){ if(hero[k]) hero[k].style.translate = ""; }); }
    root.classList.add("px-measure");                       /* sticky off for one read = natural positions */
    var all2 = layers.concat(Array.prototype.slice.call(main.querySelectorAll(".px-in")));
    all2.forEach(function(L){ var r = L.getBoundingClientRect(); L.__top = r.top + y0; L.__h = r.height; });
    movers.forEach(function(m){ m.top = m.el.getBoundingClientRect().top + y0; m.h = m.el.offsetHeight; });
    root.classList.remove("px-measure");
    all2.forEach(function(L){
      var t = Math.min(hh, vh - L.__h);
      if(L.classList.contains("px-in")){ var pr = L.parentNode.getBoundingClientRect(); }
      L.style.setProperty("--px-top", t + "px");
    });
    if(lenis) lenis.resize();
    dirty = false;
  }

  function fixOrb(){
    if(!orb) return;
    orb.classList.remove("px-orb-fix"); orb.style.left = ""; orb.style.top = "";
    var r = orb.getBoundingClientRect(), y0 = window.scrollY || root.scrollTop;
    orb.style.left = r.left.toFixed(1) + "px";
    orb.style.top = (r.top + y0).toFixed(1) + "px";     /* where it sits at the top of the page, then held there */
    orb.classList.add("px-orb-fix");
  }
  function measure(){
    hh = headH(); vh = innerHeight;
    root.style.setProperty("--px-hh", hh+"px");
    var y0 = window.scrollY || root.scrollTop;
    movers.forEach(function(m){ m.el.style.translate = ""; });
    if(hero){ ["t","w"].forEach(function(k){ if(hero[k]) hero[k].style.translate = ""; }); }
    root.classList.add("px-measure");                       /* sticky off for one read = natural positions */
    var all2 = layers.concat(Array.prototype.slice.call(main.querySelectorAll(".px-in")));
    all2.forEach(function(L){ var r = L.getBoundingClientRect(); L.__top = r.top + y0; L.__h = r.height; });
    movers.forEach(function(m){ m.top = m.el.getBoundingClientRect().top + y0; m.h = m.el.offsetHeight; });
    fixOrb();
    root.classList.remove("px-measure");
    all2.forEach(function(L){ L.style.setProperty("--px-top", Math.min(hh, vh - L.__h) + "px"); });
    if(lenis) lenis.resize();
    dirty = false;
  }
  function frame(){
    var y = window.scrollY || root.scrollTop;
    /* a layer fades out as the next sheet of glass covers the screen (the hero layer never fades: it holds the orb) */
    for(var i=1;i<order.length;i++){
      var L = order[i], N = order[i+1], d = 0;
      if(N){ var nt = N.__top - y; d = clamp((vh - nt)/Math.max(1, vh - hh), 0, 1); }
      var o = 1 - clamp((d - 0.45)/0.5, 0, 1); o = o*o*(3-2*o);
      var v = o.toFixed(3);
      if(L.__o !== v){ L.style.opacity = v; L.style.visibility = o < 0.004 ? "hidden" : ""; L.__o = v; }
    }
    if(hero){
      var H = hero.L.__h || 1, base = hero.L.__top - hh;
      var p = clamp((y - base)/H, 0, 1);
      if(hero.t){ hero.t.style.translate = "0 " + (-p*H*0.55).toFixed(1) + "px"; hero.t.style.opacity = clamp(1 - p*1.25, 0, 1).toFixed(3); }
      if(hero.w){ hero.w.style.translate = "0 " + (-p*H*0.3).toFixed(1) + "px"; hero.w.style.opacity = clamp(1 - p*1.8, 0, 1).toFixed(3); }
    }
    for(var j=0;j<movers.length;j++){
      var m = movers[j];
      var c = clamp((m.top - y + m.h/2 - vh/2) / vh, -1.2, 1.2);
      m.el.style.translate = "0 " + (c*m.s).toFixed(1) + "px";
    }
  }
  function raf(t){
    if(!on) return;
    if(lenis) lenis.raf(t);
    if(dirty) measure();
    frame();
    rafId = requestAnimationFrame(raf);
  }

  function enable(){
    if(on) return; on = true;
    root.classList.add("px-on");
    if(window.Lenis){
      try{ lenis = new Lenis({lerp:.085, smoothWheel:true, syncTouch:false, wheelMultiplier:1, allowNestedScroll:true, anchors:false, autoRaf:false}); window.__lenis = lenis; }
      catch(e){ lenis = null; }
    }
    hh = headH(); root.style.setProperty("--px-hh", hh+"px");
    wrap(); collect(); measure(); frame();
    rafId = requestAnimationFrame(raf);
  }
  function disable(){
    if(!on) return; on = false;
    cancelAnimationFrame(rafId);
    if(lenis){ try{ lenis.destroy(); }catch(e){} lenis = null; window.__lenis = null; }
    root.classList.remove("px-on", "px-measure", "lenis", "lenis-smooth", "lenis-stopped", "lenis-scrolling");
    root.style.removeProperty("--px-hh");
    if(orb){ orb.classList.remove("px-orb-fix"); orb.style.left = orb.style.top = ""; }
    layers = []; all = []; order = []; movers = []; hero = null; orb = null; snap = [];
  }

  /* tabs.js swaps the page in place: About on screen = on (re-wrap the fresh render), any other tab = fully off */
  var pend = false;
  new MutationObserver(function(){
    if(pend) return; pend = true;
    Promise.resolve().then(function(){
      pend = false;
      if(!isHome()){ disable(); return; }
      if(!on){ enable(); return; }
      if(wrap()){ collect(); measure(); if(lenis) lenis.scrollTo(window.scrollY, {immediate:true, force:true}); frame(); }
    });
  }).observe(main, {childList:true});

  /* any link click halts a glide still in progress, so tabs.js's own scrollTo(0,0) wins on a tab switch */
  document.addEventListener("click", function(e){
    if(!lenis || !lenis.isScrolling) return;
    var a = e.target.closest && e.target.closest("a[href]"); if(!a) return;
    lenis.scrollTo(window.scrollY || root.scrollTop, {immediate:true, force:true});
  }, true);

  /* menus/lightboxes that lock the page: pause smooth scroll while locked */
  new MutationObserver(function(){
    if(!lenis) return;
    var lk = getComputedStyle(body).overflow === "hidden";
    if(lk && !lenis.isStopped) lenis.stop(); else if(!lk && lenis.isStopped) lenis.start();
  }).observe(body, {attributes:true, attributeFilter:["style","class"]});

  if(window.ResizeObserver){ new ResizeObserver(function(){ dirty = true; }).observe(main); }
  addEventListener("resize", function(){ dirty = true; });
  addEventListener("load", function(){ dirty = true; });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ dirty = true; });

  /* where each curtain lands (used by the preview recordings) */
  window.__pxStops = function(){ return order.map(function(L){ return Math.max(0, Math.round(L.__top - hh)); }); };
  window.__pxOn = function(){ return on; };

  if(isHome()) enable();
})();
