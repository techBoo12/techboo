/* $HEX case study motion (Oct 20 2026): reveals, split text, parallax, marquees, tilt, desktop/mobile site toggle */
(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // split headline letters
  document.querySelectorAll("[data-split]").forEach(function(el){
    var t = el.textContent; el.textContent = ""; el.setAttribute("aria-label", t);
    Array.prototype.forEach.call(t, function(c, i){
      var s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i);
      s.setAttribute("aria-hidden", "true");
      s.textContent = c === " " ? "\u00a0" : c; el.appendChild(s);
    });
  });

  // reveal on scroll
  var targets = document.querySelectorAll(".rv,[data-split]");
  if ("IntersectionObserver" in window && !reduce){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {rootMargin: "0px 0px -8% 0px", threshold: 0.12});
    targets.forEach(function(el){ io.observe(el); });
  } else { targets.forEach(function(el){ el.classList.add("in"); }); }

  // floating shapes in the ending
  var fl = document.querySelector(".hx-end-float");
  if (fl){
    var cols = ["#B6F23A","#FF6FB1","#FFD23F","#CDB8FF","#6B3FE6"];
    var spots = [[4,30],[92,24],[7,58],[90,52],[3,84],[93,80],[12,44],[86,68]];
    spots.forEach(function(p, i){
      var b = document.createElement("b"), star = i % 3 === 0, sz = star ? 46 : 22 + (i % 4) * 8;
      b.style.cssText = "left:"+p[0]+"%;top:"+p[1]+"%;width:"+sz+"px;height:"+sz+"px;background:"+cols[i%cols.length]+";border-radius:"+(i%2?"50%":"8px")+";--a:"+(i*23)+"deg;--t:"+(5+i%4)+"s;--dl:-"+(i*.7)+"s"+(star?";clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%);border:0":"");
      fl.appendChild(b);
    });
  }

  // marquees (JS so speed stays smooth; duplicated content loops seamlessly)
  var mqs = [];
  document.querySelectorAll("[data-marquee]").forEach(function(tr){
    var kids = Array.prototype.slice.call(tr.children);
    kids.forEach(function(k){ var c = k.cloneNode(true); c.setAttribute("aria-hidden","true"); tr.appendChild(c); });
    mqs.push({el: tr, x: 0, sp: parseFloat(tr.getAttribute("data-speed") || "0.8"), boost: 0});
  });

  // parallax + progress + scroll-velocity marquee boost
  var par = document.querySelectorAll("[data-par]");
  var prog = document.querySelector(".hx-progress");
  var root = document.documentElement, lastY = window.scrollY, vel = 0;
  function onScroll(){
    var y = window.scrollY, vh = window.innerHeight, max = root.scrollHeight - vh;
    vel = Math.min(14, Math.abs(y - lastY)); lastY = y;
    if (prog) prog.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    root.style.setProperty("--sy", y);
    if (reduce) return;
    par.forEach(function(el){
      var r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
      var c = (r.top + r.height / 2 - vh / 2);
      el.style.setProperty("--py", (c * parseFloat(el.getAttribute("data-par"))).toFixed(1) + "px");
    });
  }
  window.addEventListener("scroll", onScroll, {passive: true});
  onScroll();

  var last = performance.now();
  function tick(now){
    var dt = Math.min(50, now - last); last = now;
    if (!reduce){
      mqs.forEach(function(m){
        var half = m.el.scrollWidth / 2; if (!half) return;
        m.boost += (vel * 0.25 - m.boost) * 0.08;
        m.x -= (m.sp + m.boost) * dt * 0.06;
        if (-m.x >= half) m.x += half;
        m.el.style.transform = "translate3d(" + m.x.toFixed(2) + "px,0,0)";
      });
      vel *= 0.9;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // hero film tilt on pointer
  var film = document.querySelector("[data-tilt]");
  if (film && !reduce && window.matchMedia("(hover: hover)").matches){
    film.addEventListener("pointermove", function(e){
      var r = film.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      film.style.setProperty("--ty", (x * 5).toFixed(2) + "deg");
      film.style.setProperty("--tx", (-y * 4).toFixed(2) + "deg");
    });
    film.addEventListener("pointerleave", function(){ film.style.setProperty("--ty","0deg"); film.style.setProperty("--tx","0deg"); });
  }

  // play/pause the hero film when it leaves the screen
  var vid = document.querySelector(".hx-video");
  if (vid && window.vload) window.vload(vid);   // hydrate the parts-based film (vparts.js); it never loaded without this
  if (vid && "IntersectionObserver" in window){
    new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting){ var p = vid.play(); if (p && p.catch) p.catch(function(){}); } else { vid.pause(); }
      });
    }, {threshold: 0.15}).observe(vid);
  }

  // sound toggle on the hero film (it autoplays muted)
  var snd = document.querySelector(".hx-sound");
  if (snd && vid){
    snd.addEventListener("click", function(){
      var on = vid.muted;
      vid.muted = !on;
      if (on){ var p = vid.play(); if (p && p.catch) p.catch(function(){}); }
      snd.setAttribute("aria-pressed", on ? "true" : "false");
      snd.setAttribute("aria-label", on ? "Turn sound off" : "Turn sound on");
      snd.textContent = on ? "Sound On" : "Sound Off";
    });
  }

  // site preview: desktop renders the page at 1280px and scales it to fit; mobile shows it at phone width
  var win = document.querySelector(".hx-win"), frame = win && win.querySelector(".hx-frame"), ifr = frame && frame.querySelector("iframe");
  function fit(){
    if (!win) return;
    if (win.getAttribute("data-view") === "desktop"){
      var w = frame.clientWidth, h = frame.clientHeight, base = 1280;
      if (w < base){
        var s = w / base;
        ifr.style.width = base + "px"; ifr.style.height = (h / s) + "px";
        ifr.style.transform = "scale(" + s + ")"; ifr.style.transformOrigin = "0 0";
        return;
      }
    }
    ifr.style.width = "100%"; ifr.style.height = "100%"; ifr.style.transform = "none";
  }
  document.querySelectorAll(".hx-toggle button").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll(".hx-toggle button").forEach(function(b){ b.classList.toggle("on", b === btn); b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
      win.setAttribute("data-view", btn.getAttribute("data-view"));
      fit(); setTimeout(fit, 650);
    });
  });
  window.addEventListener("resize", fit);
  fit();

  // drag to scroll the pose row on desktop
  var drag = document.querySelector("[data-drag]");
  if (drag){
    var down = false, sx = 0, sl = 0;
    drag.addEventListener("pointerdown", function(e){ if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = drag.scrollLeft; drag.style.cursor = "grabbing"; });
    window.addEventListener("pointerup", function(){ down = false; drag.style.cursor = ""; });
    drag.addEventListener("pointermove", function(e){ if (down){ drag.scrollLeft = sl - (e.clientX - sx); } });
  }
})();
