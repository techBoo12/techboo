/* cs2: shared kit for the coded HM Trades + WarbleLive case pages (Oct 20 2026). */
(function(){
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  /* run cb once when el is on screen (immediately under reduced motion) */
  const onView = (el, cb, margin="0px 0px -12% 0px")=>{
    if(!el) return;
    if(RM || !("IntersectionObserver" in window)){ cb(el); return; }
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ io.unobserve(e.target); cb(e.target); } }),{rootMargin:margin});
    io.observe(el);
  };
  /* count a number up: data-to, data-dec, data-pre, data-suf */
  const count = (el)=>{
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec||0), pre = el.dataset.pre||"", suf = el.dataset.suf||"";
    const fmt = (v)=> pre + v.toLocaleString("en-US",{minimumFractionDigits:dec,maximumFractionDigits:dec}) + suf;
    if(RM){ el.textContent = fmt(to); return; }
    const t0 = performance.now(), D = +(el.dataset.ms||1600);
    const step = (t)=>{ const k = Math.min(1,(t-t0)/D), e = 1-Math.pow(1-k,3); el.textContent = fmt(to*e); if(k<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const reveal = (root)=>{
    root.querySelectorAll(".cs2-rv").forEach(el=>onView(el, x=>x.classList.add("in")));
    root.querySelectorAll("[data-to]").forEach(el=>onView(el, count));
    root.querySelectorAll("[data-draw]").forEach(el=>onView(el, x=>x.classList.add("drawn")));
  };
  /* tabs: [data-tabs] container with .cs2-tab[data-k] and panes [data-pane=k] inside the same [data-tabgroup] */
  const tabs = (root)=>{
    root.querySelectorAll("[data-tabgroup]").forEach(g=>{
      const btns = g.querySelectorAll(".cs2-tab"), panes = g.querySelectorAll("[data-pane]");
      const set = (k)=>{ btns.forEach(b=>b.setAttribute("aria-selected", b.dataset.k===k?"true":"false")); panes.forEach(p=>p.hidden = p.dataset.pane!==k); g.dispatchEvent(new CustomEvent("cs2tab",{detail:k})); };
      btns.forEach(b=>b.addEventListener("click", ()=>{ set(b.dataset.k); g._auto && clearInterval(g._auto); }));
      if(btns[0]) set(btns[0].dataset.k);
      if(g.dataset.auto && !RM){ const ks=[...btns].map(b=>b.dataset.k); let i=0; onView(g, ()=>{ g._auto = setInterval(()=>{ i=(i+1)%ks.length; set(ks[i]); }, +g.dataset.auto); }); }
    });
  };
  /* Oct 20 2026 8:55 PM her word: endings are themed to the product (no receipts outside Invora). o.card = the product's own confirmation card HTML */
  const ending = (o)=>`<div class="cs2-ty ${o.cls||""}" id="cs2-ty" style="--ty-a:${o.a};--ty-b:${o.b};--ty-bg:${o.bg}">
      <div class="cs2-ty-glow" aria-hidden="true"></div>
      <h2 class="cs2-ty-h">Thanks For <span>Scrolling</span></h2>
      ${o.card}
      <div class="cs2-ty-act"><a class="cs2-ty-btn" href="${o.back}"><span aria-hidden="true">←</span> Back To Projects</a><button class="cs2-ty-btn ghost" type="button" data-ty-top>Back To Top <span aria-hidden="true">↑</span></button></div>
    </div>`;
  const mountEnding = (o)=>{
    const end = document.querySelector("#case .case-end"); if(!end) return;
    const back = (document.querySelector("#case .case-hero .back")||{}).getAttribute ? document.querySelector("#case .case-hero .back").getAttribute("href") : "../ui-ux-designs";
    end.insertAdjacentHTML("afterbegin", ending(Object.assign({back}, o)));
    if(o.onMount) o.onMount(document.getElementById("cs2-ty"));
    const ty = document.getElementById("cs2-ty");
    if(RM || !("IntersectionObserver" in window)) ty.classList.add("on");
    else new IntersectionObserver(es=>es.forEach(e=>ty.classList.toggle("on", e.isIntersecting)),{rootMargin:"0px 0px -10% 0px"}).observe(ty);
    ty.querySelector("[data-ty-top]").addEventListener("click", ()=>scrollTo({top:0, behavior: RM?"auto":"smooth"}));
  };
  const phone = (inner, cls="", style="")=>`<div class="cs2-phone ${cls}" style="${style}"><div class="cs2-scr"><div class="cs2-isl"></div><div class="cs2-sb"><span>9:41</span><b><svg width="16" height="10" viewBox="0 0 16 10" fill="#fff"><rect x="0" y="6" width="3" height="4" rx="1"/><rect x="4.3" y="4" width="3" height="6" rx="1"/><rect x="8.6" y="2" width="3" height="8" rx="1"/><rect x="12.9" y="0" width="3" height="10" rx="1"/></svg><i></i></b></div>${inner}<div class="cs2-home"></div></div></div>`;
  window.CS2 = {RM, esc, onView, count, reveal, tabs, ending, mountEnding, phone};
})();
