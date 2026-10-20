(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.remove("no-js");

  // members (her placeholder cards)
  var grid = document.getElementById("memGrid");
  if (grid) {
    var html = "";
    for (var i = 0; i < 9; i++) {
      html += '<article class="mem rv"><img src="assets/img/avatar.webp" alt="" loading="lazy" width="64" height="64">' +
        '<div><h3>John Paul</h3><div class="tags"><span class="tag b">Community Management</span>' +
        '<span class="tag gr">Growth Marketing</span><span class="tag yl">Growth Marketing</span></div></div></article>';
    }
    grid.innerHTML = html;
  }

  // nav: scrolled state, mobile toggle, active link
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-pill a"));
  function onScroll(){ nav.classList.toggle("scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  toggle.addEventListener("click", function(){
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.forEach(function(a){ a.addEventListener("click", function(){ nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); }); });
  var sections = links.map(function(a){ var id = a.getAttribute("href").slice(1); return id === "top" ? document.querySelector(".hero") : document.getElementById(id); });
  function setActive(){
    var y = window.scrollY + window.innerHeight * 0.35, idx = 0;
    sections.forEach(function(s, i){ if (s && s.getBoundingClientRect().top + window.scrollY <= y) idx = i; });
    links.forEach(function(a, i){ a.classList.toggle("is-active", i === idx); });
  }
  window.addEventListener("scroll", setActive, {passive:true}); setActive();

  // count up
  function countUp(el){
    if (el.dataset.done) return; el.dataset.done = "1";
    var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10), suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = to.toFixed(dec) + suf; return; }
    var t0 = null, dur = 1400;
    function step(t){ if (!t0) t0 = t; var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  // reveal
  var rv = document.querySelectorAll(".rv, .banner");
  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(rv, function(el){ el.classList.add("in"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), countUp);
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        var el = en.target, sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(sib, 6) * 70 + "ms";
        el.classList.add("in");
        Array.prototype.forEach.call(el.querySelectorAll("[data-count]"), countUp);
        if (el.hasAttribute("data-count")) countUp(el);
        io.unobserve(el);
        setTimeout(function(){ el.style.transitionDelay = ""; }, 1400);
      });
    }, {threshold:0.12, rootMargin:"0px 0px -6% 0px"});
    Array.prototype.forEach.call(rv, function(el){ io.observe(el); });
  }

  // event rows arrows
  Array.prototype.forEach.call(document.querySelectorAll(".arr"), function(b){
    b.addEventListener("click", function(){
      var row = document.getElementById(b.dataset.target);
      var card = row.firstElementChild;
      row.scrollBy({left: parseInt(b.dataset.dir, 10) * (card.getBoundingClientRect().width + 20), behavior: reduce ? "auto" : "smooth"});
    });
  });

  // faq: one open at a time
  var ds = document.querySelectorAll(".faq details");
  Array.prototype.forEach.call(ds, function(d){
    d.addEventListener("toggle", function(){ if (d.open) Array.prototype.forEach.call(ds, function(o){ if (o !== d) o.open = false; }); });
  });
})();
