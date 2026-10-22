/* AuxHR case: motion layer (Oct 20 2026, her corrections 6:27-6:31 PM). Loaded after auxhr-case.js. Everything is code: no video, no AI images.
   Each piece plays only while on screen and shows its final frame under prefers-reduced-motion. */
(function(){
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 0. hero film (Oct 21 2026 4:50 PM, her words "why is this not playing"). It used to wait, unmuted and paused, for all 30 parts (25 MB)
     before it even had a source, so it sat on its poster. Now: muted autoplay loop, the light 8 s preview at once, the full film swapped in
     when its parts land (desktop at once; phones when she taps or unmutes, to spare mobile data). Plays only while on screen. */
  (function(){
    const v = document.querySelector("video[data-axfilm]"); if(!v) return;
    const full = v.dataset.axfilm, key = full.replace(/^(\.\.\/)+/, ""), n = (window.VPARTS||{})[key];
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    let inView = false, sysT = 0, userPaused = false, loading = null, isFull = false;
    const go = ()=>{ if(!RM && inView && !userPaused && v.paused) v.play().catch(()=>{}); };
    const halt = ()=>{ if(!v.paused){ sysT = performance.now(); v.pause(); } };
    v.addEventListener("pause", ()=>{ if(performance.now() - sysT > 600 && !v.ended && !v.seeking && document.visibilityState==="visible") userPaused = true; });
    v.addEventListener("play", ()=>{ userPaused = false; });
    const loadFull = ()=>{
      if(loading || isFull) return;
      loading = (n ? Promise.all(Array.from({length:n},(_,i)=>fetch(full+".part"+i).then(r=>{ if(!r.ok) throw new Error(r.status); return r.arrayBuffer(); })))
                      .then(b=>URL.createObjectURL(new Blob(b,{type:"video/mp4"}))) : Promise.resolve(full))
        .then(url=>{ const m = v.muted, wasPlaying = !userPaused; sysT = performance.now(); v.src = url; isFull = true; v.loop = true; v.muted = m;
                     if(wasPlaying) userPaused = false; go(); })
        .catch(()=>{ loading = null; });
    };
    if(!RM) v.src = v.dataset.axprev; else v.removeAttribute("autoplay");
    const wide = matchMedia("(min-width: 900px)").matches;
    const ask = ()=>{ if(!isFull) loadFull(); };
    ["volumechange","click","touchend"].forEach(ev=>v.addEventListener(ev, ()=>{ if(ev!=="volumechange" || !v.muted) ask(); }));
    v.addEventListener("play", ()=>{ if(RM) ask(); });
    if(wide && !RM) v.addEventListener("playing", ask, {once:true});
    if(wide && RM) loadFull();
    if("IntersectionObserver" in window) new IntersectionObserver(es=>es.forEach(e=>{ inView = e.isIntersecting; inView ? go() : halt(); }),{threshold:.2}).observe(v);
    else { inView = true; go(); }
    document.addEventListener("visibilitychange", ()=>{ document.visibilityState==="visible" ? go() : halt(); });
  })();
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
