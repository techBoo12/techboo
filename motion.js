/* v6 motion (Oct 16 2026): Teslim-style reveals on her own elements. Vanilla JS, IntersectionObserver, no layout shift
   (transforms/opacity/filter only), off for prefers-reduced-motion. First paint animates; a tab switch shows what is on screen at once. */
(function(){
  if(!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const root = document.documentElement; root.classList.add("tb-motion");
  const page = document.getElementById("page") || document.querySelector("main"); if(!page) return;
  let firstPaint = true;
  function split(el, mode){
    if(el.dataset.tbSplit) return; el.dataset.tbSplit = "1"; let i = 0;
    const walk = (node)=>{
      [...node.childNodes].forEach(n=>{
        if(n.nodeType===3){
          const parts = n.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(p=>{
            if(!p) return;
            if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(p)); return; }
            if(mode==="w"){ const s=document.createElement("span"); s.className="tb-w"; s.style.setProperty("--i",i++); s.textContent=p; frag.appendChild(s); }
            else { const w=document.createElement("span"); w.className="tb-nw"; [...p].forEach(ch=>{ const s=document.createElement("span"); s.className="tb-l"; s.style.setProperty("--i",i++); s.textContent=ch; w.appendChild(s); }); frag.appendChild(w); }
          });
          n.replaceWith(frag);
        } else if(n.nodeType===1) walk(n);
      });
    };
    walk(el);
  }
  // Oct 16 2026 (her ask): animate every time an element comes into view, scrolling down OR back up.
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("tb-in"); }),{rootMargin:"0px 0px -8% 0px", threshold:0.08});
  const out = new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting){ const t=e.target;   // fully off screen: reset so it replays
      if(t.classList.contains("tb-now")){ t.classList.remove("tb-now"); if(t.dataset.tbCls) t.classList.add(t.dataset.tbCls); if(t.dataset.tbDelay) t.style.setProperty("--d", t.dataset.tbDelay+"ms"); io.observe(t); }
      t.classList.remove("tb-in"); } }),{threshold:0});
  function onScreen(el){ const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }
  function arm(el, cls, delay){
    if(el.dataset.tbArmed) return; el.dataset.tbArmed = "1";
    el.dataset.tbCls = cls || ""; el.dataset.tbDelay = delay || "";
    if(!firstPaint && onScreen(el)){ el.classList.add("tb-now"); out.observe(el); return; }   // tab switch: instant
    if(cls) el.classList.add(cls); if(delay) el.style.setProperty("--d", delay+"ms");
    io.observe(el); out.observe(el);
  }
  function init(){
    const hero = page.querySelector(".tb-hero-h");
    if(hero && !hero.dataset.tbSplit){
      if(firstPaint){ split(hero,"w"); hero.classList.add("tb-split"); requestAnimationFrame(()=>hero.classList.add("tb-go")); }
      else hero.dataset.tbSplit = "skip";
    }
    const wdg = page.querySelector(".tb-widget"); if(wdg && firstPaint) wdg.classList.add("tb-rise");
    page.querySelectorAll(".tb-sub-t, .tb-contact-t, .giant").forEach(t=>{ if(!t.dataset.tbSplit){ if(firstPaint || !onScreen(t)) split(t,"l"); } arm(t, "", 0); });
    page.querySelectorAll(".tb-loop-m, .tb-about > *, .tb-sub .eyebrow, .tb-sub-i, .tb-phead, .tb-intro, .tb-contact > *:not(.tb-contact-t), .tb-foot").forEach((el,i)=>arm(el,"tb-rv", 0));
    page.querySelectorAll(".tb-exp-list li").forEach((li,i)=>arm(li,"tb-rv",(i%6)*70));
    page.querySelectorAll(".tb-ex, .vtile").forEach((c,i)=>arm(c,"tb-tilt",(i%4)*90));
    firstPaint = false;
  }
  init();
  new MutationObserver(()=>init()).observe(page,{childList:true});
})();
