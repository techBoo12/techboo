(function(){
  "use strict";
  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var G = window.AXB_GALLERY || [];
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* reveal on scroll */
  var rv = $$("[data-rv], .axb-end");
  if ("IntersectionObserver" in window && !RM){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function(el){ io.observe(el); });
  } else { rv.forEach(function(el){ el.classList.add("in"); }); }

  /* index highlight */
  var links = $$(".axb-index a");
  if ("IntersectionObserver" in window){
    var so = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        links.forEach(function(a){ a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$(".axb-sec").forEach(function(s){ so.observe(s); });
  }

  /* toast + copy */
  var toast = $("#axb-toast"), tt;
  function say(msg){ toast.textContent = msg; toast.classList.add("show"); clearTimeout(tt); tt = setTimeout(function(){ toast.classList.remove("show"); }, 1600); }
  function copy(text){
    if (navigator.clipboard && window.isSecureContext){ return navigator.clipboard.writeText(text).catch(function(){ return fallback(text); }); }
    return Promise.resolve(fallback(text));
  }
  function fallback(text){
    var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta);
  }
  $$(".axb-sw").forEach(function(b){
    b.addEventListener("click", function(){
      var hex = b.getAttribute("data-hex");
      copy(hex).then(function(){
        b.classList.add("copied"); var lab = $(".axb-sw-copy", b); lab.textContent = "Copied";
        say("Copied " + hex);
        setTimeout(function(){ b.classList.remove("copied"); lab.textContent = "Copy"; }, 1400);
      });
    });
  });

  /* layout toggle */
  var tg = $("#axb-toggle"), stage = $("#axb-stage");
  if (tg && stage){
    tg.addEventListener("click", function(){
      var on = tg.getAttribute("aria-pressed") !== "true";
      tg.setAttribute("aria-pressed", on ? "true" : "false");
      stage.classList.toggle("off", !on);
    });
  }

  /* gallery */
  var CATS = [["all","All"],["spotlight","Spotlights"],["champions","Champions"],["events","Events"],["campaigns","Campaigns"],["roles","Roles"]];
  var fbox = $("#axb-filters"), grid = $("#axb-masonry"), base = "../assets/cases/axis-brand/";
  var order = G.slice().reverse(); /* newest first */
  CATS.forEach(function(c, i){
    var n = c[0] === "all" ? order.length : order.filter(function(g){ return g.cat === c[0]; }).length;
    if (!n) return;
    var b = document.createElement("button");
    b.className = "axb-filter"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.dataset.cat = c[0]; b.innerHTML = c[1] + "<sup>" + n + "</sup>";
    fbox.appendChild(b);
  });
  order.forEach(function(g, i){
    var a = document.createElement("button");
    a.className = "axb-card"; a.dataset.cat = g.cat; a.dataset.i = i;
    a.setAttribute("aria-label", "Open " + g.title);
    a.innerHTML = '<div class="axb-card-img"><img src="' + base + g.id + '_t.webp" alt="' + g.title.replace(/"/g, "&quot;") + ' graphic for Axis Robotics Nigeria" width="' + g.w + '" height="' + g.h + '" loading="lazy" decoding="async"></div>' +
      '<div class="axb-card-cap"><b>' + g.title + '</b><span>' + g.date + '</span></div><span class="axb-card-zoom" aria-hidden="true"></span>';
    grid.appendChild(a);
  });
  var cur = "all";
  fbox.addEventListener("click", function(e){
    var b = e.target.closest(".axb-filter"); if (!b) return;
    cur = b.dataset.cat;
    $$(".axb-filter", fbox).forEach(function(x){ x.setAttribute("aria-selected", x === b ? "true" : "false"); });
    $$(".axb-card", grid).forEach(function(c){ c.classList.toggle("hide", cur !== "all" && c.dataset.cat !== cur); });
  });

  /* lightbox */
  var lb = $("#axb-lb"), li = $("#axb-lb-img"), lt = $("#axb-lb-t"), ld = $("#axb-lb-d"), la = $("#axb-lb-a"), idx = 0, lastFocus = null;
  function visible(){ return $$(".axb-card", grid).filter(function(c){ return !c.classList.contains("hide"); }).map(function(c){ return +c.dataset.i; }); }
  function show(i){
    var g = order[i]; idx = i;
    li.src = base + g.id + ".webp"; li.alt = g.title + " graphic for Axis Robotics Nigeria";
    lt.textContent = g.title; ld.textContent = g.date; la.href = g.url;
  }
  function open(i){
    lastFocus = document.activeElement; show(i); lb.hidden = false;
    requestAnimationFrame(function(){ lb.classList.add("open"); });
    document.body.style.overflow = "hidden"; $("#axb-lb-x").focus();
  }
  function close(){
    lb.classList.remove("open"); document.body.style.overflow = "";
    setTimeout(function(){ lb.hidden = true; }, RM ? 0 : 250);
    if (lastFocus) lastFocus.focus();
  }
  function step(d){ var v = visible(); var p = v.indexOf(idx); if (p < 0) p = 0; show(v[(p + d + v.length) % v.length]); }
  grid.addEventListener("click", function(e){ var c = e.target.closest(".axb-card"); if (c) open(+c.dataset.i); });
  $("#axb-lb-x").addEventListener("click", close);
  $("#axb-lb-prev").addEventListener("click", function(){ step(-1); });
  $("#axb-lb-next").addEventListener("click", function(){ step(1); });
  lb.addEventListener("click", function(e){ if (e.target === lb) close(); });
  document.addEventListener("keydown", function(e){
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function(e){ tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function(e){ if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); tx = null; });

  /* back to top */
  var tp = $("#axb-totop");
  if (tp) tp.addEventListener("click", function(e){ e.preventDefault(); window.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); });
})();
