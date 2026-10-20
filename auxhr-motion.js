/* AuxHR case: motion layer (Oct 20 2026, her corrections 6:27-6:31 PM). Loaded after auxhr-case.js. Everything is code: no video, no AI images.
   Each piece plays only while on screen and shows its final frame under prefers-reduced-motion. */
(function(){
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.querySelector("#case .case-gallery"); if(!root) return;
  const seen = (el, on, off, th=.3)=>{ if(!("IntersectionObserver" in window)){ on(); return; }
    new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) on(); else if(off) off(); }),{threshold:th}).observe(el); };

  /* 1. full-page browser windows that scroll themselves top to bottom on a loop */
  root.querySelectorAll(".ax-swin").forEach(w=>{
    const vp = w.querySelector(".ax-swin-vp"), img = vp.querySelector("img");
    const fit = ()=>{ const d = Math.max(0, img.offsetHeight - vp.clientHeight); w.style.setProperty("--d", d+"px"); w.style.setProperty("--dur", Math.max(14, Math.round(d/110))+"s"); };
    if(img.complete) fit(); img.addEventListener("load", fit); addEventListener("resize", fit);
    if(RM){ w.classList.add("manual"); return; }
    seen(w, ()=>{ fit(); w.classList.add("play"); }, ()=>w.classList.remove("play"), .25);
  });

  /* 2. the rebrand story (her 6:40 PM): CSS keyframes, played only on screen; reduced motion shows the final AuxHR frame */
  root.querySelectorAll("[data-axr]").forEach(s=>{
    if(RM){ s.classList.add("done"); return; }
    seen(s, ()=>s.classList.add("play"), ()=>s.classList.remove("play"), .35);
  });
})();
