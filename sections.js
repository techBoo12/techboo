/* Renders the WORK cards and the video sections (AI films · motion · video edits) from CONTENT.
   Used by index.html (all sections) and by the shareable section pages (one section each). */
(function(){
  const C = window.CONTENT;
  const esc = (s)=>String(s??"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const mediaHTML = (m)=> m.type==="image" ? `<img src="${m.src}" alt="${esc(m.alt||"")}" loading="lazy" decoding="async">`
      : m.type==="video" ? `<video data-vsrc="${m.src}" poster="${m.poster||""}" muted loop playsinline preload="none" aria-label="${esc(m.alt||"")}"></video>`
      : `<div class="ph">${esc(m.label||"")}</div>`;
  const skip = new Set(C.work.notInWork||[]);

  const byKey = (id)=> C.work.cases.find(k=>(k.slug||k.key)===id);
  function workCards(keys){
    const list = keys ? keys.map(byKey).filter(k=>k && !k.hidden) : C.work.cases.filter(k=>!k.hidden && !skip.has(k.slug));
    return list.map(k => `
    <a class="card" href="${k.href||"#"}" ${k.href&&k.href.startsWith("http")?'target="_blank" rel="noopener"':""}>
      <div class="card-media">${mediaHTML(k.media)}</div>
      <div class="card-body">
        <div>
          <div class="brand-row"><span class="dot" style="background:${k.dot}"></span><span class="brand">${esc(k.brand)}</span></div>
          <h3 class="outcome">${esc(k.outcome)}</h3>
          <p class="role">${esc(k.role)}</p>
          <div class="badges">${(k.badges||[]).map((b,i)=>`<span class="badge ${i===0?"accent":""}">${esc(b)}</span>`).join("")}</div>
        </div>
        <div class="card-side">${k.desc?`<p class="desc">${esc(k.desc)}</p>`:""}${k.slug?`<span class="card-cta">${esc(k.cta||"View case study")} <i>→</i></span>`:(k.cta?`<span class="card-cta">${esc(k.cta)} <i>→</i></span>`:"")}</div>
      </div>
    </a>`).join("");
  }

  const SOUND_ON = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>`;
  const SOUND_OFF = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>`;

  function tile(it){
    const span = it.span ? ` style="--span:${it.span}"` : "";
    if(it.soon) return `
      <figure class="vtile soon"${span}>
        <div class="vmedia" style="aspect-ratio:${it.ar||"16/9"}"><div class="soon-in"><span class="soon-orb"></span><span class="mono">COMING SOON</span><span class="soon-t">${esc(it.title)}</span></div></div>
      </figure>`;
    return `
      <figure class="vtile"${span}>
        <div class="vmedia" style="aspect-ratio:${it.ar||"16/9"}">
          <video data-vsrc="${it.src}" poster="${it.poster||""}" muted loop playsinline preload="none" aria-label="${esc(it.title)}"></video>
          <button class="snd" type="button" aria-label="Tap for sound"><span class="i">${SOUND_OFF}</span><span class="l">Tap for sound</span></button>
        </div>
        <figcaption><span class="vt">${esc(it.title)}</span><span class="vm">${esc(it.meta||"")}</span>${it.href?`<a class="vlink" href="${it.href}">View case study <i>→</i></a>`:""}</figcaption>
      </figure>`;
  }

  function sectionHTML(s, opts){
    const standalone = opts && opts.standalone;
    return `
      <p class="eyebrow">${esc(s.eyebrow)}</p>
      <h2 class="giant">${esc(s.title)}</h2>
      ${s.intro?`<p class="sec-intro">${esc(s.intro)}</p>`:""}
      <div class="vgrid cols-${s.cols||2}">${s.items.map(tile).join("")}</div>
      ${standalone?"":`<p class="sec-more"><a href="${s.page}">Open ${esc(s.title)} page <i>↗</i></a></p>`}`;
  }

  // autoplay muted while on screen; tap toggles sound (one at a time)
  function wireVideos(root){
    if(window.vhydrate) vhydrate(root);
    const vids = [...root.querySelectorAll(".vtile video")];
    if("IntersectionObserver" in window){
      const io = new IntersectionObserver(es=>es.forEach(e=>{ const v=e.target;
        if(e.isIntersecting){ v.preload="auto"; v.play().catch(()=>{}); } else { v.pause(); if(!v.muted){ setSound(v,false); } } }),{threshold:0.35});
      vids.forEach(v=>io.observe(v));
    }
    function setSound(v,on){ v.muted=!on; const t=v.closest(".vtile"); t.classList.toggle("sound",on);
      const b=t.querySelector(".snd"); b.querySelector(".i").innerHTML = on?SOUND_ON:SOUND_OFF; b.querySelector(".l").textContent = on?"Sound on":"Tap for sound"; }
    vids.forEach(v=>{
      v.closest(".vmedia").addEventListener("click",(e)=>{
        const on = v.muted;
        vids.forEach(o=>{ if(o!==v && !o.muted) setSound(o,false); });
        setSound(v,on);
        if(on){ try{ v.currentTime = 0; }catch(_){} }
        v.play().catch(()=>{});
      });
    });
  }

  window.TB = { workCards, sectionHTML, wireVideos, esc, tile, byKey };
})();
