/* AI / Motion Designs page, v7 (Oct 18 2026). Her asks, WhatsApp 11:27 to 11:33 AM:
   "let's do other sections side by side: AI/motion design"; pills Motion Designs first then AI Films, purple glass, the active
   one follows the scroll or the tap; AuxHR launch video first; every piece as a card like the Axis one (brand • year, title,
   role, tags, one short line, WATCH link) with a live muted preview and a purple glass play button; the fuller description
   lives in the watch view. Tap the frame, the play button or the WATCH link: fullscreen player with sound, swipe or arrows
   for the next piece, close on X, Esc, backdrop or a swipe down. All words and media come from content.js.
   Reduced motion: posters only, no reel animation, no reveals. */
(function(){
  const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const esc = (s)=>String(s??"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const pad = (n)=> String(n).padStart(2,"0");
  const ICON = {
    play: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8.5 5.8v12.4c0 .8.9 1.3 1.6.9l9.8-6.2c.6-.4.6-1.4 0-1.8l-9.8-6.2c-.7-.4-1.6.1-1.6.9z" fill="currentColor"/></svg>`,
    x: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
    l: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`,
    r: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>`,
    snd: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>`
  };

  /* every playable piece, in page order; brand / role / tags come from the item, else its case (caseKey or case/ href) */
  function collect(C, g, secById){
    const out = [];
    const byKey = (k)=> C.work.cases.find(c=>(c.slug||c.key)===k);
    (g.sections||[]).map(secById).filter(Boolean).forEach(s=>{
      s.items.forEach(it=>{
        if(it.soon || !it.src) return;
        const k = (it.caseKey && byKey(it.caseKey)) || (it.href && /^case\//.test(it.href) && C.work.cases.find(c=>c.href===it.href)) || {};
        const pick = (f)=> it[f]!==undefined ? it[f] : k[f];
        out.push({ sec: s.id, title: it.title, meta: it.meta||"", src: it.src, poster: it.poster||"", ar: it.ar||"16/9",
          href: it.href||"", brand: pick("brand")||"", years: pick("years")||"", dot: pick("dot")||"var(--lilac)",
          outcome: it.outcome || k.outcome || it.title, role: pick("role")||"", badges: pick("badges")||[],
          short: it.short||"", desc: it.desc || k.desc || "", cta: it.cta || "Watch" });
      });
    });
    return out;
  }

  const media = (p)=> RM
    ? `<img src="${p.poster}" alt="" loading="lazy" decoding="async">`
    : `<video data-vsrc="${p.src}" poster="${p.poster}" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true"></video>`;
  const words = (t)=> esc(t).split(/(\s+)/).map((w,i)=> (!w || /^\s+$/.test(w)) ? w : `<span class="mp-wm"><span class="mp-w" style="--i:${i}">${w}</span></span>`).join("");

  /* ---------- PAGE ---------- */
  window.TBMotionPage = function(x){
    const { main, C, G, B, subHead, footSmall, secById } = x;
    const g = G.motion;
    const secs = (g.sections||[]).map(secById).filter(Boolean);
    const P = collect(C, g, secById);
    const idx = (p)=> P.indexOf(p);
    const count = (id)=> P.filter(p=>p.sec===id).length;

    const reelTile = (p, clone)=> `
      <button class="mp-rt" type="button" data-open="${idx(p)}"${clone?' tabindex="-1" aria-hidden="true"':` aria-label="Watch ${esc(p.title)} full screen"`}>
        ${media(p)}<span class="mp-rt-t"><b>${pad(idx(p)+1)}</b>${esc(p.title)}</span>
      </button>`;
    const pb = (p)=> `<span class="mp-pb" aria-hidden="true"><span class="mp-pb-i">${ICON.play}</span></span>`;
    const card = (p, big)=> `
      <article class="card mp-card${big?" big":""}">
        <button class="card-media mp-media" type="button" data-open="${idx(p)}" aria-label="${esc(p.cta)}: ${esc(p.title)}, full screen with sound">
          ${media(p)}${pb(p)}
          <span class="mp-num mono">${pad(idx(p)+1)} / ${pad(P.length)}</span>
          <span class="mp-len mono">${esc((p.meta.match(/\d+\s?s\b/)||[""])[0])}</span>
        </button>
        <div class="card-body">
          <div>
            <div class="brand-row"><span class="dot" style="background:${p.dot}"></span><span class="brand">${esc(p.brand)}</span></div>
            <h3 class="outcome">${esc(p.outcome)}</h3>
            ${p.role?`<p class="role">${esc(p.role)}</p>`:""}
            ${p.badges.length?`<div class="badges">${p.badges.map((b,i)=>`<span class="badge ${i===0?"accent":""}">${esc(b)}</span>`).join("")}</div>`:""}
          </div>
          <div class="card-side">
            <p class="desc">${esc(p.short || p.meta)}</p>
            <button class="card-cta mp-watch" type="button" data-open="${idx(p)}">${esc(p.cta)} <i>→</i></button>
            ${p.href?`<a class="mp-case" href="${p.href}">View case study <i>↗</i></a>`:""}
          </div>
        </div>
      </article>`;

    const hero = `
      <section class="mp-hero" aria-label="${esc(g.title)}">
        <div class="mp-glow" aria-hidden="true"></div>
        <div class="mp-hero-in">
          <p class="eyebrow left mp-rv">${esc(g.eyebrow)}</p>
          <h1 class="tb-title mp-hero-t">${words(g.title)}</h1>
          ${g.intro?`<p class="tb-intro mp-rv" style="--d:180ms">${esc(g.intro)}</p>`:""}
        </div>
      </section>
      <nav class="mp-pills" aria-label="Sections"><div class="mp-pills-in"><span class="mp-ind" aria-hidden="true"></span>${secs.map((s,i)=>`<a href="#${s.id}" data-sec="${s.id}"${i===0?' class="on" aria-current="true"':""}>${esc(s.title)}<sup>${count(s.id)}</sup></a>`).join("")}</div></nav>`;

    const secHTML = (s,i)=>{
      const ps = P.filter(p=>p.sec===s.id);
      const soon = s.items.filter(it=>it.soon);
      return `<section class="tb-page tb-subsec mp-sec" id="${s.id}">${subHead(s, pad(i+1))}
        ${ps.length?card(ps[0], true):""}
        ${ps.length>1?`<div class="mp-grid">${ps.slice(1).map(p=>card(p,false)).join("")}</div>`:""}
        ${soon.length?`<div class="vgrid cols-1 tb-vgrid mp-soon">${soon.map(TB.tile).join("")}</div>`:""}
      </section>`;
    };

    main.innerHTML = hero + secs.map(secHTML).join("") + footSmall();
    document.title = `${g.title} | ${B.name}`;

    LB.set(P);
    main.addEventListener("click",(e)=>{
      const b = e.target.closest("[data-open]"); if(!b || !main.contains(b)) return;
      e.preventDefault(); LB.open(+b.dataset.open, b, !!b.dataset.reel);
    });
    pills(main);
    wire(main);
  };

  /* ---------- glass pills: active follows the scroll position or the tap ---------- */
  function pills(main){
    const nav = main.querySelector(".mp-pills"); if(!nav) return;
    const links = [...nav.querySelectorAll("a[data-sec]")], ind = nav.querySelector(".mp-ind");
    let cur = links[0] && links[0].dataset.sec, lockUntil = 0;
    const place = ()=>{ const a = links.find(l=>l.dataset.sec===cur); if(!a || !ind) return;
      ind.style.width = a.offsetWidth+"px"; ind.style.transform = `translateX(${a.offsetLeft}px)`; };
    const set = (id)=>{ if(!id) return; cur = id; links.forEach(l=>{ const on = l.dataset.sec===id; l.classList.toggle("on", on); if(on) l.setAttribute("aria-current","true"); else l.removeAttribute("aria-current"); }); place(); };
    links.forEach(l=>l.addEventListener("click",()=>{ set(l.dataset.sec); lockUntil = Date.now()+900; }));
    const pick = ()=>{ if(!main.isConnected){ removeEventListener("scroll", onS); return; } if(Date.now()<lockUntil) return;
      const line = innerHeight*0.42; let best = links[0].dataset.sec;
      links.forEach(l=>{ const s = document.getElementById(l.dataset.sec); if(s && s.getBoundingClientRect().top <= line) best = l.dataset.sec; });
      if(best!==cur) set(best);
      nav.classList.toggle("stuck", nav.getBoundingClientRect().top <= (parseFloat(getComputedStyle(document.body).getPropertyValue("--hh"))||110) + 1); };
    let t = false; const onS = ()=>{ if(!t){ t = true; requestAnimationFrame(()=>{ t = false; pick(); }); } };
    addEventListener("scroll", onS, {passive:true}); addEventListener("resize", ()=>{ place(); onS(); }, {passive:true});
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    set(cur); setTimeout(()=>{ place(); pick(); }, 60);
  }

  /* ---------- previews play muted in view, reveals, scroll zoom ---------- */
  function wire(main){
    if(window.vhydrate) vhydrate(main);
    const inView = (v)=>{ const r=v.getBoundingClientRect(); return r.bottom>0 && r.top<innerHeight && r.right>0 && r.left<innerWidth; };
    if(!RM && "IntersectionObserver" in window){
      document.documentElement.classList.add("mp-anim");
      const vio = new IntersectionObserver(es=>es.forEach(e=>{ const v=e.target;
        if(e.isIntersecting && !LB.isOpen()){ v.preload="auto"; if(v.src) v.play().catch(()=>{}); else if(window.vload) vload(v); }
        else if(!e.isIntersecting) v.pause(); }),{threshold:0.2});
      main.querySelectorAll(".mp-reelwrap video, .mp-sec video").forEach(v=>{ vio.observe(v);
        v.addEventListener("vready",()=>{ if(inView(v) && !LB.isOpen()) v.play().catch(()=>{}); else v.pause(); });
        v.addEventListener("playing",()=>v.closest(".mp-media, .mp-rt")?.classList.add("live"));
        v.addEventListener("timeupdate",()=>{ if(v.currentTime>7) v.currentTime=0; }); });
      /* reveals replay each time an element enters, like the rest of the site */
      const rio = new IntersectionObserver(es=>es.forEach(e=>{ e.target.classList.toggle("mp-in", e.isIntersecting); }),{rootMargin:"0px 0px -6% 0px", threshold:0.04});
      main.querySelectorAll(".mp-rv, .mp-card, .mp-reelwrap").forEach(el=>rio.observe(el));
      main.querySelectorAll(".mp-grid .mp-card").forEach((el,i)=>el.style.setProperty("--d", (i%2)*120+"ms"));
      requestAnimationFrame(()=>requestAnimationFrame(()=>main.querySelector(".mp-hero")?.classList.add("mp-go")));
      /* cinema zoom: each big card's preview opens up as it reaches the middle of the screen; the glow drifts */
      const z = [...main.querySelectorAll(".mp-card.big .mp-media")], glow = main.querySelector(".mp-glow");
      let tick = false;
      const upd = ()=>{ tick = false; if(!main.isConnected) return; const h = innerHeight;
        z.forEach(el=>{ const r = el.getBoundingClientRect(); const c = (r.top + r.height/2 - h/2) / h; el.style.setProperty("--z", Math.max(0, Math.min(1, 1.15 - Math.abs(c)*1.3)).toFixed(3)); });
        if(glow) glow.style.transform = `translate3d(0,${Math.min(scrollY,900)*0.3}px,0)`; };
      const onS = ()=>{ if(!main.isConnected){ removeEventListener("scroll", onS); return; } if(!tick){ tick = true; requestAnimationFrame(upd); } };
      addEventListener("scroll", onS, {passive:true}); addEventListener("resize", onS, {passive:true}); upd();
    } else {
      main.querySelectorAll(".mp-rv, .mp-card, .mp-reelwrap").forEach(el=>el.classList.add("mp-in"));
      main.querySelector(".mp-hero")?.classList.add("mp-go");
    }
  }

  /* ---------- FULLSCREEN PLAYER ---------- */
  const LB = (function(){
    let P = [], i = 0, el = null, opener = null, open = false, reel = false, v = null;
    function build(){
      if(el) return;
      el = document.createElement("div");
      el.className = "mp-lb"; el.hidden = true;
      el.setAttribute("role","dialog"); el.setAttribute("aria-modal","true"); el.setAttribute("aria-label","Video player");
      el.innerHTML = `
        <div class="mp-lb-top"><span class="mp-lb-n mono"></span><button class="mp-lb-x" type="button" aria-label="Close">${ICON.x}</button></div>
        <div class="mp-lb-stage"><div class="mp-lb-frame"></div></div>
        <button class="mp-lb-nav prev" type="button" aria-label="Previous piece">${ICON.l}</button>
        <button class="mp-lb-nav next" type="button" aria-label="Next piece">${ICON.r}</button>
        <div class="mp-lb-bot">
          <div class="mp-lb-cap">
            <div class="brand-row"><span class="dot mp-lb-dot"></span><span class="brand mp-lb-b"></span></div>
            <p class="mp-lb-t"></p>
            <p class="mp-lb-m"></p>
            <p class="mp-lb-d"></p>
            <a class="mp-case mp-lb-a" href="#">View case study <i>↗</i></a>
          </div>
          <div class="mp-lb-th" aria-label="All pieces"></div>
        </div>`;
      document.body.appendChild(el);
      el.querySelector(".mp-lb-x").addEventListener("click", ()=>close());
      el.querySelector(".prev").addEventListener("click", ()=>go(i-1, -1));
      el.querySelector(".next").addEventListener("click", ()=>go(i+1, 1));
      el.addEventListener("click",(e)=>{ const t = e.target; if(t===el || t.classList.contains("mp-lb-stage") || t.classList.contains("mp-lb-top") || t.classList.contains("mp-lb-bot")) close(); });
      el.querySelector(".mp-lb-a").addEventListener("click", ()=>close(true));
      /* swipe left/right for the next piece, down to close (not on the video's own control bar) */
      let sx=0, sy=0, st=0, track=false;
      const stage = el.querySelector(".mp-lb-stage");
      stage.addEventListener("touchstart",(e)=>{ const t=e.touches[0]; sx=t.clientX; sy=t.clientY; st=Date.now();
        const vr = v && v.getBoundingClientRect(); track = !(vr && t.clientY > vr.bottom-60 && t.clientY < vr.bottom+4); },{passive:true});
      stage.addEventListener("touchend",(e)=>{ if(!track) return; const t=e.changedTouches[0], dx=t.clientX-sx, dy=t.clientY-sy, quick = Date.now()-st < 800;
        if(quick && Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.4) go(i + (dx<0?1:-1), dx<0?1:-1);
        else if(quick && dy>110 && Math.abs(dy)>Math.abs(dx)*1.6) close(); },{passive:true});
      document.addEventListener("keydown",(e)=>{ if(!open) return;
        if(e.key==="Escape"){ e.preventDefault(); close(); }
        else if(e.key==="ArrowRight"){ e.preventDefault(); go(i+1, 1); }
        else if(e.key==="ArrowLeft"){ e.preventDefault(); go(i-1, -1); }
        else if(e.key==="Tab"){ const f=[...el.querySelectorAll("button,a[href],video")].filter(n=>n.offsetParent!==null); if(!f.length) return;
          const a=f[0], z=f[f.length-1]; if(e.shiftKey && document.activeElement===a){ e.preventDefault(); z.focus(); } else if(!e.shiftKey && document.activeElement===z){ e.preventDefault(); a.focus(); } } });
    }
    function thumbs(){
      const th = el.querySelector(".mp-lb-th");
      th.innerHTML = P.map((p,k)=>`<button type="button" data-k="${k}" aria-label="Play ${esc(p.title)}"><img src="${p.poster}" alt="" loading="lazy" decoding="async"><span class="mono">${pad(k+1)}</span></button>`).join("");
      th.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{ const k=+b.dataset.k; go(k, k>i?1:-1); }));
    }
    function others(pause){ document.querySelectorAll("#page video").forEach(o=>{ if(pause){ o.dataset.noauto="1"; o.pause(); } else delete o.dataset.noauto; }); }
    function drop(){ if(v){ try{ v.pause(); v.removeAttribute("src"); v.load(); }catch(_){} v.remove(); v = null; } }
    function show(dir){
      const p = P[i], fr = el.querySelector(".mp-lb-frame");
      el.querySelector(".mp-lb-n").textContent = `${pad(i+1)} / ${pad(P.length)}`;
      el.querySelector(".mp-lb-dot").style.background = p.dot;
      el.querySelector(".mp-lb-b").textContent = p.brand;
      el.querySelector(".mp-lb-t").textContent = p.title;
      el.querySelector(".mp-lb-m").textContent = [...new Set([p.meta, p.role].join(" · ").split(" · ").map(s=>s.trim()).filter(Boolean))].join(" · ");
      const d = el.querySelector(".mp-lb-d"); d.textContent = p.desc || p.short || ""; d.hidden = !d.textContent;
      const a = el.querySelector(".mp-lb-a"); if(p.href){ a.href = p.href; a.hidden = false; } else { a.hidden = true; a.removeAttribute("href"); }
      el.querySelectorAll(".mp-lb-th button").forEach((b,k)=>{ b.classList.toggle("on", k===i); if(k===i) b.setAttribute("aria-current","true"); else b.removeAttribute("aria-current"); });
      const th = el.querySelector(".mp-lb-th"), on = th.querySelector("button.on"); if(on) th.scrollLeft = on.offsetLeft - th.clientWidth/2 + on.clientWidth/2;
      drop();
      fr.style.setProperty("--ar", p.ar.replace("/"," / "));
      fr.classList.remove("mp-sl","mp-sr"); void fr.offsetWidth;
      if(!RM && dir) fr.classList.add(dir>0?"mp-sr":"mp-sl");
      fr.classList.add("mp-loading");
      fr.querySelector(".mp-lb-snd")?.remove();
      fr.style.backgroundImage = p.poster ? `url("${p.poster}")` : "";
      v = document.createElement("video");
      v.setAttribute("playsinline",""); v.playsInline = true; v.controls = true; v.preload = "auto";
      v.poster = p.poster; v.dataset.vsrc = p.src; v.dataset.noauto = "1";
      v.setAttribute("controlslist","nodownload noplaybackrate"); v.disablePictureInPicture = true;
      v.loop = !reel;
      v.addEventListener("ended",()=>{ if(reel) go(i+1, 1); });
      fr.appendChild(v);
      const mine = v;
      const start = ()=>{ if(mine!==v) return; fr.classList.remove("mp-loading");
        mine.muted = false;
        mine.play().catch(()=>{ if(mine!==v) return; mine.muted = true; mine.play().catch(()=>{});
          const s = document.createElement("button"); s.type="button"; s.className="mp-lb-snd"; s.innerHTML = ICON.snd+"<span>Tap for sound</span>";
          s.addEventListener("click",(e)=>{ e.stopPropagation(); mine.muted=false; mine.play().catch(()=>{}); s.remove(); }); fr.appendChild(s); }); };
      v.addEventListener("vready", start, {once:true});
      if(window.vload) vload(v); else { v.src = p.src; start(); }
    }
    function go(n, dir){ if(!open || !P.length) return; i = (n + P.length) % P.length; show(dir||0); }
    function openAt(n, from, isReel){
      build(); if(!P.length) return;
      opener = from || null; reel = !!isReel; i = Math.max(0, Math.min(P.length-1, n|0));
      thumbs(); others(true);
      open = true; el.hidden = false; document.documentElement.classList.add("mp-lock");
      requestAnimationFrame(()=>el.classList.add("on"));
      show(0);
      el.querySelector(".mp-lb-x").focus({preventScroll:true});
    }
    function close(leaving){
      if(!open) return; open = false;
      drop(); el.classList.remove("on"); el.hidden = true;
      document.documentElement.classList.remove("mp-lock");
      others(false);
      if(leaving!==true){
        document.querySelectorAll("#page .mp-reelwrap video, #page .mp-sec video").forEach(o=>{ const r=o.getBoundingClientRect(); if(o.src && r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth) o.play().catch(()=>{}); });
        if(opener && opener.isConnected) opener.focus({preventScroll:true});
      }
    }
    addEventListener("popstate", ()=>{ if(open) close(true); });
    return { set(list){ if(open) close(true); P = list; }, open: openAt, close, isOpen: ()=>open };
  })();
  window.TBMotionLB = LB;
})();
