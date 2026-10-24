/* Sphinx AI Powered Promotional Video: the film page, v1 (Oct 20 2026, her ask 9:36 PM "rework this AI film you see the vision yeah?").
   A premiere page: full bleed letterboxed player (muted highlights loop on desktop, poster on phones; Play With Sound loads the
   full 35 s film), the story in three acts from real frames with their timecodes (tap a frame to play the film from there),
   the craft, and a credits roll ending. Title, brand, role and tags come from content.js; the scene lines are the film's own
   on-screen words. Reduced motion: posters only, no roll animation. */
(function(){
  const C = window.CONTENT, slug = document.body.dataset.slug;
  const k = (C.work.cases||[]).find(x=>x.slug===slug) || {};
  const esc = (s)=>String(s??"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const DESK = !!(window.matchMedia && matchMedia("(hover: hover) and (min-width: 900px)").matches) && !RM;
  const A = "../assets/cases/sphinx-ai-promo/";
  const FILM = "../assets/cases/sphinx-ai-promo/video01.mp4", PREVIEW = A+"film_preview.mp4", POSTER = A+"poster_8.webp", END = A+"end_bg.webp";
  const RUNTIME = 35.5;
  const tc = (s)=>{ s = Math.max(0, Math.floor(s)); return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); };
  /* every frame below is a real frame of the film at that second; the words are what the film shows on screen */
  const ACTS = [
    { n:"I", t:"Controlled By The Few", f:[[0.6,"Every market on earth"],[2.2,"Has always been controlled"],[4.3,"By the few"],[6.0,"Commodity market"],[8.0,"Traded behind closed doors"]] },
    { n:"II", t:"A New Kind Of Market", f:[[10.2,"Sphinx"],[13.6,"Sphinx"],[16.2,"24/7 commodity trading"],[20.3,"Decentralized"],[22.6,"Institutional grade infrastructure"]] },
    { n:"III", t:"Market For All", f:[[26.0,"The market never sleeps"],[28.0,"Neither does Sphinx"],[29.6,"Market for all"],[34.0,"Objects in mirror are closer than they appear"]] }
  ];
  const frameSrc = (t)=> A+"scenes/s"+t.toFixed(1).padStart(5,"0")+".webp";
  const CRAFT = [
    ["Editing", "Cut to the script line by line, from the trading floor to the closing shot in the mirror."],
    ["Animation", "Still frames brought to life: the globe, the vault doors, the Sphinx at night."],
    ["Motion Graphics", "Kinetic captions, the Sphinx mark and the decentralized globe, timed to the voice."],
    ["AI Tools", "Built from stills, AI animation and edit."]
  ];
  const ICO = {
    play:`<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8.5 5.8v12.4c0 .8.9 1.3 1.6.9l9.8-6.2c.6-.4.6-1.4 0-1.8l-9.8-6.2c-.7-.4-1.6.1-1.6.9z" fill="currentColor"/></svg>`,
    pause:`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>`,
    on:`<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>`,
    off:`<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>`,
    fs:`<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`
  };
  const back = ["../ai-motion-designs#ai-films", "AI / Motion Designs"];
  const role = (k.badges&&k.badges.length?k.badges:["Editing","Animation","Motion Graphics"]);
  const D = (C.nav&&C.nav.first ? C.nav.first+" "+C.nav.last : "Adaikem Ajufo");

  const credits = [["A Film For", "Sphinx AI"], ["Editing", D], ["Animation", D], ["Motion Graphics", D], ["Made With", "AI Tools"], ["Runtime", "0:35"]];

  document.getElementById("case").innerHTML = `
    <section class="sf-hero">
      <div class="sf-glow" aria-hidden="true"></div>
      <div class="sf-in">
        <a class="sf-back" href="${back[0]}"><span aria-hidden="true">←</span> ${back[1]}</a>
        <p class="sf-eye mono"><i aria-hidden="true"></i>AI Film <b>·</b> Sphinx AI</p>
        <h1 class="sf-title">${esc(k.title||"Sphinx AI Powered Promotional Video")}</h1>
        <p class="sf-log">Every market on earth has always been controlled by the few. This film introduces Sphinx: a new kind of market, with 24/7 commodity trading that is fast, reliable and decentralized.</p>
      </div>
    </section>

    <section class="sf-stage" aria-label="Film player">
      <div class="sf-screen" id="sf-screen">
        <img class="sf-poster" src="${POSTER}" alt="Sphinx AI promo, the vault doors scene" fetchpriority="high">
        ${DESK?`<video class="sf-pv" id="sf-pv" muted loop playsinline preload="none" poster="${POSTER}" aria-hidden="true" data-src="${PREVIEW}"></video>`:""}
        <video class="sf-fv" id="sf-fv" playsinline preload="none" poster="${POSTER}" data-vsrc="${FILM}" data-noauto="1" aria-label="${esc(k.title||"")}"></video>
        <span class="sf-lb t" aria-hidden="true"></span><span class="sf-lb b" aria-hidden="true"></span>
        <button class="sf-big" id="sf-big" type="button" aria-label="Play the film with sound"><span class="sf-big-i">${ICO.play}</span><span class="sf-big-l">Play With Sound<small class="mono">0:35</small></span></button>
        <span class="sf-load mono" id="sf-load" aria-live="polite"></span>
        <div class="sf-ctl" id="sf-ctl">
          <button type="button" class="sf-c" id="sf-pp" aria-label="Pause">${ICO.pause}</button>
          <span class="sf-tc mono" id="sf-tc">00:00 / ${tc(RUNTIME)}</span>
          <div class="sf-bar" id="sf-bar" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="${Math.round(RUNTIME)}" aria-valuenow="0" tabindex="0"><i id="sf-fill"></i></div>
          <button type="button" class="sf-c sf-snd" id="sf-snd" aria-label="Mute">${ICO.on}<span>Sound On</span></button>
          <button type="button" class="sf-c" id="sf-fs" aria-label="Full screen">${ICO.fs}</button>
        </div>
      </div>
      <div class="sf-facts">
        <dl>
          <div><dt>Client</dt><dd>Sphinx AI</dd></div>
          <div><dt>Runtime</dt><dd>0:35</dd></div>
          <div><dt>Format</dt><dd>16:9 · With Sound</dd></div>
        </dl>
        <div class="sf-chips">${role.map(b=>`<span>${esc(b)}</span>`).join("")}</div>
      </div>
    </section>

    <section class="sf-sec sf-acts">
      <div class="sf-head"><p class="sf-k mono">The Story</p><h2 class="sf-h">Three Acts, Thirty Five Seconds</h2><p class="sf-sub">Real frames from the film, with the words it shows on screen. Tap any frame to play from that moment.</p></div>
      ${ACTS.map(a=>`
      <div class="sf-act sf-rv">
        <div class="sf-act-h"><span class="sf-act-n mono">Act ${a.n}</span><h3>${esc(a.t)}</h3><span class="sf-act-tc mono">${tc(a.f[0][0])} to ${tc(a.f[a.f.length-1][0])}</span></div>
        <div class="sf-strip"><div class="sf-track">${a.f.map(([t,l])=>`
          <button class="sf-fr" type="button" data-t="${t}" aria-label="Play from ${tc(t)}: ${esc(l)}">
            <span class="sf-fr-img"><img src="${frameSrc(t)}" alt="" loading="lazy" decoding="async" width="640" height="360"><span class="sf-fr-tc mono">${tc(t)}</span><span class="sf-fr-p" aria-hidden="true">${ICO.play}</span></span>
            <span class="sf-fr-l">${esc(l)}</span>
          </button>`).join("")}</div></div>
      </div>`).join("")}
    </section>

    <section class="sf-sec sf-craft">
      <div class="sf-head"><p class="sf-k mono">The Craft</p><h2 class="sf-h">How It Was Made</h2></div>
      <div class="sf-cgrid">${CRAFT.map(([t,d],i)=>`<article class="sf-cc sf-rv" style="--d:${i*90}ms"><span class="sf-cc-n mono">0${i+1}</span><h3>${t}</h3><p>${esc(d)}</p></article>`).join("")}</div>
    </section>

    <section class="sf-end" id="sf-end" aria-label="Thanks For Scrolling">
      <div class="sf-end-bg" aria-hidden="true" style="background-image:url('${END}')"></div>
      <div class="sf-roll-win">
        <div class="sf-roll" id="sf-roll">
          <p class="sf-r-k mono">End Credits</p>
          <p class="sf-r-film">${esc(k.title||"Sphinx AI Powered Promotional Video")}</p>
          <dl class="sf-r-list">${credits.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>
          <h2 class="sf-ty">Thanks For <span>Scrolling</span></h2>
          <p class="sf-r-sign">The market never sleeps. Thanks for staying till the credits.</p>
        </div>
      </div>
      <div class="sf-end-act">
        <button class="sf-btn" type="button" id="sf-replay"><span class="sf-btn-i">${ICO.play}</span> Replay The Film</button>
        <a class="sf-btn ghost" href="${back[0]}"><span aria-hidden="true">←</span> Back To Projects</a>
      </div>
    </section>
    <footer class="sf-foot"><p>${esc((C.footer&&C.footer.rights)||"All Rights Reserved © techBoo")}</p></footer>`;

  /* ---------- player ---------- */
  const $ = (id)=>document.getElementById(id);
  const scr = $("sf-screen"), pv = $("sf-pv"), fv = $("sf-fv"), big = $("sf-big"), load = $("sf-load");
  const pp = $("sf-pp"), snd = $("sf-snd"), bar = $("sf-bar"), fill = $("sf-fill"), tcEl = $("sf-tc"), fsb = $("sf-fs");
  let filmReady = false, wantT = 0, started = false;

  if(pv){
    const io = new IntersectionObserver(es=>es.forEach(e=>{
      if(started) return;
      if(e.isIntersecting){ if(!pv.src){ pv.src = pv.dataset.src; } pv.play().then(()=>scr.classList.add("pv-on")).catch(()=>{}); }
      else pv.pause();
    }),{threshold:0.25});
    io.observe(pv);
  }
  function setSnd(){ const on = !fv.muted; snd.innerHTML = (on?ICO.on:ICO.off)+`<span>${on?"Sound On":"Sound Off"}</span>`; snd.setAttribute("aria-label", on?"Mute":"Unmute"); }
  function startFilm(t){
    wantT = t||0; started = true;
    if(pv){ pv.pause(); }
    scr.classList.add("film");
    fv.muted = false; setSnd();
    if(filmReady){ try{ fv.currentTime = wantT; }catch(_){} fv.play().catch(()=>{}); return; }
    load.textContent = "Loading Film"; scr.classList.add("loading");
    fv.addEventListener("vready", ()=>{ filmReady = true; scr.classList.remove("loading"); load.textContent = "";
      const go = ()=>{ try{ fv.currentTime = wantT; }catch(_){} fv.play().catch(()=>{ fv.muted = true; setSnd(); fv.play().catch(()=>{}); }); };
      if(fv.readyState>=1) go(); else fv.addEventListener("loadedmetadata", go, {once:true}); }, {once:true});
    if(window.vload) vload(fv); else { fv.src = FILM; fv.dispatchEvent(new Event("vready")); }
  }
  big.addEventListener("click", ()=>startFilm(0));
  scr.addEventListener("click", (e)=>{ if(e.target.closest(".sf-ctl, .sf-big")) return; if(!started){ startFilm(0); return; } if(scr.classList.contains("idle")){ return; } fv.paused ? fv.play() : fv.pause(); });
  pp.addEventListener("click", ()=>{ fv.paused ? fv.play() : fv.pause(); });
  snd.addEventListener("click", ()=>{ fv.muted = !fv.muted; setSnd(); });
  fsb.addEventListener("click", ()=>{ const el = fv; if(el.requestFullscreen) el.requestFullscreen().catch(()=>{}); else if(el.webkitEnterFullscreen) el.webkitEnterFullscreen(); });
  let idleT = 0; const wake = ()=>{ scr.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(()=>{ if(!fv.paused) scr.classList.add("idle"); }, 2400); };
  ["pointermove","pointerdown","touchstart","keydown"].forEach(ev=>scr.addEventListener(ev, wake, {passive:true}));
  fv.addEventListener("play", ()=>{ wake(); scr.classList.add("playing"); pp.innerHTML = ICO.pause; pp.setAttribute("aria-label","Pause"); });
  fv.addEventListener("pause", ()=>{ scr.classList.remove("playing","idle"); pp.innerHTML = ICO.play; pp.setAttribute("aria-label","Play"); });
  fv.addEventListener("timeupdate", ()=>{ const d = fv.duration||RUNTIME, t = fv.currentTime; fill.style.transform = `scaleX(${Math.min(1,t/d)})`; tcEl.textContent = tc(t)+" / "+tc(d); bar.setAttribute("aria-valuenow", Math.round(t)); });
  fv.addEventListener("ended", ()=>{ scr.classList.remove("playing"); });
  const seek = (x)=>{ const r = bar.getBoundingClientRect(), d = fv.duration||RUNTIME; const t = Math.max(0, Math.min(1, (x-r.left)/r.width))*d; if(!started) startFilm(t); else { try{ fv.currentTime = t; }catch(_){} } };
  bar.addEventListener("pointerdown", (e)=>{ seek(e.clientX); const mv = (ev)=>seek(ev.clientX), up = ()=>{ removeEventListener("pointermove", mv); removeEventListener("pointerup", up); }; addEventListener("pointermove", mv); addEventListener("pointerup", up); });
  bar.addEventListener("keydown", (e)=>{ if(e.key==="ArrowRight"||e.key==="ArrowLeft"){ e.preventDefault(); try{ fv.currentTime = Math.max(0, fv.currentTime + (e.key==="ArrowRight"?5:-5)); }catch(_){} } });
  /* pause the film when it leaves the screen */
  new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting && started && !fv.paused) fv.pause(); }),{threshold:0.15}).observe(scr);

  /* frames: play from that moment */
  document.querySelectorAll(".sf-fr").forEach(b=>b.addEventListener("click", ()=>{
    const t = +b.dataset.t; scr.scrollIntoView({behavior: RM?"auto":"smooth", block:"center"}); startFilm(t);
  }));
  $("sf-replay").addEventListener("click", ()=>{ scr.scrollIntoView({behavior: RM?"auto":"smooth", block:"center"}); startFilm(0); });

  /* ---------- reveals + credits roll ---------- */
  const rv = document.querySelectorAll(".sf-rv");
  if(!RM && "IntersectionObserver" in window){
    document.documentElement.classList.add("sf-anim");
    const rio = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); rio.unobserve(e.target); } }),{rootMargin:"0px 0px -8% 0px"});
    rv.forEach(el=>rio.observe(el));
    const end = $("sf-end");
    new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) end.classList.add("roll"); }),{threshold:0.3}).observe(end);
  } else { rv.forEach(el=>el.classList.add("in")); $("sf-end").classList.add("still"); }
})();
