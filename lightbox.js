/* Shared lightbox for case pages (Oct 18 2026).
   Any element with data-lb="<group>" opens a fullscreen viewer of every frame in that group.
   Image source: data-src, else the element's own <img> (currentSrc/src). Caption: data-cap or alt.
   Controls: arrows / swipe for prev-next, double-tap or Zoom button or pinch to zoom, drag to pan when zoomed,
   close with X, Esc or a tap on the backdrop. Usage: TBLightbox.bind(root) (auto-binds document on load). */
(function(){
  if(window.TBLightbox) return;
  const css = `
  .tblb{position:fixed;inset:0;z-index:1000;background:rgba(4,2,6,.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .25s ease;touch-action:none}
  .tblb.open{opacity:1;pointer-events:auto}
  .tblb-stage{position:relative;flex:1;overflow:hidden;display:flex;align-items:center;justify-content:center}
  .tblb-img{max-width:calc(100vw - 32px);max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);object-fit:contain;border-radius:14px;user-select:none;-webkit-user-drag:none;transform-origin:center center;will-change:transform;box-shadow:0 30px 90px rgba(0,0,0,.6)}
  .tblb-img.anim{transition:transform .3s cubic-bezier(.19,1,.22,1),opacity .2s ease}
  .tblb-top,.tblb-bot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;color:#fff;font:500 13px/1.4 Manrope,system-ui,sans-serif;position:relative;z-index:2}
  .tblb-count{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.16em;color:rgba(255,255,255,.7)}
  .tblb-cap{flex:1;text-align:center;color:rgba(255,255,255,.85);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
  .tblb button{appearance:none;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;border-radius:999px;height:44px;min-width:44px;padding:0 14px;font:600 13px Manrope,system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px}
  .tblb button:hover{background:rgba(255,255,255,.16)}
  .tblb button:focus-visible{outline:2px solid #C4A0FF;outline-offset:2px}
  .tblb-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:48px;height:48px!important;padding:0!important;font-size:20px!important}
  .tblb-prev{left:14px}.tblb-next{right:14px}
  .tblb.single .tblb-nav{display:none}
  @media (max-width:700px){.tblb-nav{display:none}.tblb-img{max-width:calc(100vw - 20px);max-height:calc(100dvh - 130px)}}
  html.tblb-lock,html.tblb-lock body{overflow:hidden}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  let el, img, capEl, countEl, zoomBtn, items = [], idx = 0, lastFocus = null;
  let scale = 1, tx = 0, ty = 0;
  const pts = new Map(); let pinch0 = null, pan0 = null, swipe0 = null, lastTap = 0;

  function build(){
    el = document.createElement("div");
    el.className = "tblb"; el.setAttribute("role","dialog"); el.setAttribute("aria-modal","true"); el.setAttribute("aria-label","Image viewer"); el.hidden = true;
    el.innerHTML = `<div class="tblb-top"><span class="tblb-count"></span><span class="tblb-cap"></span><button type="button" class="tblb-close" aria-label="Close">✕</button></div>
      <div class="tblb-stage"><button type="button" class="tblb-nav tblb-prev" aria-label="Previous">←</button><img class="tblb-img" alt=""><button type="button" class="tblb-nav tblb-next" aria-label="Next">→</button></div>
      <div class="tblb-bot"><button type="button" class="tblb-p2" aria-label="Previous">← Prev</button><button type="button" class="tblb-zoom" aria-pressed="false">Zoom</button><button type="button" class="tblb-n2" aria-label="Next">Next →</button></div>`;
    document.body.appendChild(el);
    img = el.querySelector(".tblb-img"); capEl = el.querySelector(".tblb-cap"); countEl = el.querySelector(".tblb-count"); zoomBtn = el.querySelector(".tblb-zoom");
    el.querySelector(".tblb-close").onclick = close;
    el.querySelector(".tblb-prev").onclick = el.querySelector(".tblb-p2").onclick = ()=>go(-1);
    el.querySelector(".tblb-next").onclick = el.querySelector(".tblb-n2").onclick = ()=>go(1);
    zoomBtn.onclick = ()=> setZoom(scale>1 ? 1 : 2.4);
    const stage = el.querySelector(".tblb-stage");
    stage.addEventListener("click", e=>{ if(e.target===stage && scale===1) close(); });
    stage.addEventListener("pointerdown", down); stage.addEventListener("pointermove", move);
    ["pointerup","pointercancel","pointerleave"].forEach(t=>stage.addEventListener(t, up));
    stage.addEventListener("wheel", e=>{ e.preventDefault(); const s = Math.min(5, Math.max(1, scale * (e.deltaY<0?1.15:1/1.15))); scale = s; if(s===1){tx=ty=0;} apply(false); }, {passive:false});
    document.addEventListener("keydown", e=>{ if(!el.classList.contains("open")) return;
      if(e.key==="Escape") close(); else if(e.key==="ArrowRight") go(1); else if(e.key==="ArrowLeft") go(-1);
      else if(e.key==="Tab"){ const f=[...el.querySelectorAll("button")].filter(b=>b.offsetParent); const i=f.indexOf(document.activeElement);
        if(e.shiftKey && i<=0){ e.preventDefault(); f[f.length-1].focus(); } else if(!e.shiftKey && i===f.length-1){ e.preventDefault(); f[0].focus(); } } });
  }
  function apply(anim){ img.classList.toggle("anim", !!anim); img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`; zoomBtn.textContent = scale>1 ? "Zoom out" : "Zoom"; zoomBtn.setAttribute("aria-pressed", scale>1); img.style.cursor = scale>1 ? "grab" : "zoom-in"; }
  function setZoom(s){ scale = s; if(s===1){ tx=ty=0; } apply(true); }
  function srcOf(n){ if(n.dataset.src) return n.dataset.src; const i = n.tagName==="IMG" ? n : n.querySelector("img"); return i ? (i.currentSrc || i.src) : ""; }
  function capOf(n){ if(n.dataset.cap) return n.dataset.cap; const i = n.tagName==="IMG" ? n : n.querySelector("img"); return i ? i.alt : ""; }
  function show(i){
    idx = (i + items.length) % items.length; const n = items[idx];
    scale = 1; tx = ty = 0; apply(false);
    img.style.opacity = 0; img.onload = ()=>{ img.style.opacity = 1; };
    img.src = srcOf(n); img.alt = capOf(n); capEl.textContent = capOf(n);
    countEl.textContent = `${idx+1} / ${items.length}`;
    [idx-1, idx+1].forEach(k=>{ const m = items[(k+items.length)%items.length]; if(m){ const p = new Image(); p.src = srcOf(m); } });
  }
  function go(d){ if(items.length>1) show(idx + d); }
  function open(group, node){
    if(!el) build();
    items = [...document.querySelectorAll(`[data-lb="${CSS.escape(group)}"]`)].filter(n=>srcOf(n));
    if(!items.length) return;
    lastFocus = document.activeElement; el.hidden = false; el.classList.toggle("single", items.length<2);
    show(Math.max(0, items.indexOf(node)));
    document.documentElement.classList.add("tblb-lock");
    requestAnimationFrame(()=>{ el.classList.add("open"); el.querySelector(".tblb-close").focus(); });
  }
  function close(){ if(!el) return; el.classList.remove("open"); document.documentElement.classList.remove("tblb-lock"); setTimeout(()=>{ el.hidden = true; img.removeAttribute("src"); }, 260); if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true}); }

  function down(e){
    if(e.target.closest("button")) return;
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    try{ e.currentTarget.setPointerCapture(e.pointerId); }catch(_){}
    if(pts.size===2){ const [a,b] = [...pts.values()]; pinch0 = {d:Math.hypot(a.x-b.x,a.y-b.y), s:scale}; swipe0 = pan0 = null; }
    else if(pts.size===1){
      const now = Date.now(); if(now - lastTap < 300 && e.target===img){ setZoom(scale>1?1:2.4); lastTap = 0; return; } lastTap = now;
      if(scale>1) pan0 = {x:e.clientX, y:e.clientY, tx, ty}; else swipe0 = {x:e.clientX, y:e.clientY, t:now};
    }
  }
  function move(e){
    if(!pts.has(e.pointerId)) return; pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(pinch0 && pts.size===2){ const [a,b] = [...pts.values()]; scale = Math.min(5, Math.max(1, pinch0.s * Math.hypot(a.x-b.x,a.y-b.y) / pinch0.d)); if(scale===1){tx=ty=0;} apply(false); }
    else if(pan0){ tx = pan0.tx + (e.clientX - pan0.x); ty = pan0.ty + (e.clientY - pan0.y); apply(false); }
    else if(swipe0){ const dx = e.clientX - swipe0.x; img.style.transform = `translateX(${dx}px)`; }
  }
  function up(e){
    if(!pts.has(e.pointerId)) return; pts.delete(e.pointerId);
    if(pinch0 && pts.size<2){ pinch0 = null; if(scale<1.05) setZoom(1); return; }
    if(swipe0){ const dx = e.clientX - swipe0.x, dy = e.clientY - swipe0.y; swipe0 = null;
      if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx<0 ? 1 : -1); else apply(true);
      if(Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx)) close(); }
    pan0 = null;
  }
  function bind(root){
    (root||document).querySelectorAll("[data-lb]").forEach(n=>{
      if(n.__tblb) return; n.__tblb = true;
      if(!/^(BUTTON|A)$/.test(n.tagName)){ n.setAttribute("role","button"); n.tabIndex = 0; n.style.cursor = "zoom-in"; }
      n.addEventListener("click", e=>{ e.preventDefault(); open(n.dataset.lb, n); });
      n.addEventListener("keydown", e=>{ if(e.key==="Enter" || e.key===" "){ e.preventDefault(); open(n.dataset.lb, n); } });
    });
  }
  window.TBLightbox = { bind, open, close };
  if(document.readyState !== "loading") bind(); else document.addEventListener("DOMContentLoaded", ()=>bind());
})();
