/* v4 (Oct 16 2026): shared header (logo + name, Hire me pill, tab row) and the tab pages.
   About | UI/UX Designs | AI / Motion Designs | Brand Designs | Video Edits. All words live in content.js.
   Tab switches render in place (no page reload): the header stays, the page swaps instantly, the URL updates. */
(function(){
  const C = window.CONTENT, B = C.brand, body = document.body;
  const base = body.dataset.base || "";
  const esc = (s)=>String(s??"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const U = (p)=> /^(https?:|mailto:|#)/.test(p) ? p : base + p;
  const G = C.groups;
  const TABS = C.tabs;
  const tabById = (id)=> TABS.find(t=>t.id===id) || TABS[0];

  /* which tab a case belongs to (case pages) */
  function tabOfCase(slug){
    for(const id of ["uiux","motion","brand"]) if((G[id].cases||[]).includes(slug)) return id;
    return "uiux";
  }
  window.TBTabOfCase = tabOfCase;
  window.TBTabPage = (id)=> tabById(id).page;
  const isCase = !!body.dataset.slug;
  let active = body.dataset.tab || (isCase ? tabOfCase(body.dataset.slug) : "about");
  body.dataset.tab = active;

  /* path -> tab (for in-place switching and back/forward) */
  function tabOfPath(pathname){
    const last = (pathname.split("/").pop() || "").replace(/\.html$/,"");
    if(!last || last==="index") return "about";
    const t = TABS.find(t=>t.page===last); return t ? t.id : null;
  }

  /* ---------- HEADER ---------- */
  const head = document.createElement("header");
  head.className = "tb-head"; head.id = "tb-head";
  head.innerHTML = `
    <div class="tb-bar">
      <a class="tb-brand" href="${U("./")}" data-tab="about" aria-label="${esc(B.name)}, about">
        <img class="tb-logo" src="${U(B.logo)}" alt="" width="38" height="38">
        <span class="tb-name"><span>${esc(B.first)}</span> <em>${esc(B.last)}</em><small>${esc(B.tag)}</small></span>
      </a>
      <a class="tb-hire" href="mailto:${C.footer.email}"><span class="tb-dot"></span>${esc(B.hire)}</a><!-- Oct 18 10:17 PM her ask: Hire me back in header, opens email -->
    </div>
    <nav class="tb-tabs" aria-label="Portfolio">
      <div class="tb-tabs-in">${TABS.map(t=>`<a href="${U(t.page)}" data-tab="${t.id}">${esc(t.label)}</a>`).join("")}</div>
    </nav>`;
  const old = document.querySelector("header.nav"); if(old) old.replaceWith(head); else body.prepend(head);
  function markTab(id){
    head.querySelectorAll(".tb-tabs a").forEach(a=>{ const on = a.dataset.tab===id && !isCase; a.classList.toggle("on", a.dataset.tab===id); if(on) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
    const on = head.querySelector(".tb-tabs a.on"); if(on){ const row = head.querySelector(".tb-tabs"); row.scrollLeft = Math.max(0, on.offsetLeft - 20); }
  }
  markTab(active);
  if(isCase) return;   // case pages: header only (their links are normal page loads)

  const main = document.getElementById("page");
  const F = C.footer;

  const contactBlock = (big)=> `
    <section class="tb-contact${big?" big":""}" id="contact">
      <div class="foot-orb"><div class="orb-core"></div><div class="orb-ring"></div><div class="orb-gloss"></div></div>
      <p class="eyebrow">${esc(C.contact.eyebrow)}</p>
      <h2 class="tb-contact-t">${C.contact.title}</h2>
      <p class="tb-contact-b">${esc(C.contact.body)}</p>
      <a class="tb-hire big tb-mail" href="mailto:${F.email}"><span class="tb-dot"></span>${esc(B.hire)}</a>
      <p class="socials tb-socials"><a class="li-ico" href="${F.linkedinHref}" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a></p>
      <p class="rights">${esc(F.rights)}</p>
    </section>`;
  const footSmall = ()=> `
    <footer class="tb-foot">
      <div><p class="foot-label">Like what you see?</p><a class="tb-hire big" href="mailto:${F.email}"><span class="tb-dot"></span>${esc(B.hire)}</a></div>
      <div class="tb-foot-r"><a class="foot-link" href="mailto:${F.email}">${esc(F.email)}</a><p class="socials"><a class="li-ico" href="${F.linkedinHref}" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a></p><p class="rights">${esc(F.rights)}</p></div>
    </footer>`;
  const pageHead = (g)=> `<div class="tb-phead"><p class="eyebrow left">${esc(g.eyebrow)}</p><h1 class="tb-title">${esc(g.title)}</h1>${g.intro?`<p class="tb-intro">${esc(g.intro)}</p>`:""}</div>`;
  const subHead = (s, n)=> `<div class="tb-sub"><span class="tb-sub-n">${n||""}</span><div><p class="eyebrow left">${esc(s.eyebrow)}</p><h2 class="tb-sub-t">${esc(s.title)}</h2>${s.intro?`<p class="tb-sub-i">${esc(s.intro)}</p>`:""}</div></div>`;
  const secById = (id)=> C.sections.find(s=>s.id===id);
  const vgrid = (s)=> `<div class="vgrid cols-${(s.items.length===3 && !s.items.some(i=>i.span))?3:(s.cols||2)} tb-vgrid">${s.items.map(TB.tile).join("")}</div>`;
  let clockTimer = null;

  /* Oct 18 2026 (her words: each section has its own thumbnail and it keeps updating as the site grows):
     the landing tile shows the FIRST visible item of that section, video if it has one. explore.img is only a fallback. */
  function autoThumb(g){
    const fromMedia = (m)=> m ? (m.type==="video" ? {vid:m.src, img:m.poster||""} : {img:m.src||"", vid:null}) : null;
    const tryCases = ()=>{ for(const id of (g.cases||[])){ const k=C.work.cases.find(c=>(c.slug||c.key)===id); if(k && !k.hidden && k.media && k.media.src) return fromMedia(k.media); } return null; };
    const trySecs = ()=>{ for(const sid of (g.sections||[])){ const s=C.sections.find(x=>x.id===sid); for(const it of ((s&&s.items)||[])){ if(!it.soon && it.src) return /\.mp4/.test(it.src)?{vid:it.src,img:it.poster||""}:{img:it.src,vid:null}; } } return null; };
    const r = (g.sections ? (trySecs()||tryCases()) : (tryCases()||trySecs()));
    return r || {img:(g.explore&&g.explore.img)||"", vid:(g.explore&&g.explore.vid)||null};
  }

  const RENDER = {
    about(){
      const H = C.hero, A = C.about, E = C.experience, L = C.loop;
      const tiles = ["uiux","motion","video","brand"].map(id=>{
        const g = G[id], t = tabById(id);
        const n = id==="uiux" ? g.cases.length+" case studies"
                : id==="motion" ? "AI films · motion design"
                : id==="brand" ? "Artists · robotics · brands"
                : "Brand videos, shot & edited";
        const a = autoThumb(g);
        return { id, t: t.label, d: n, img: a.img, vid: a.vid, href: t.page };
      });
      main.innerHTML = `
      <section class="tb-hero">
        <div class="orb-wrap tb-orb"><div class="orb"><div class="orb-core"></div><div class="orb-ring"></div><div class="orb-gloss"></div></div></div>
        <h1 class="tb-hero-h">${H.sentence}</h1>
        <div class="tb-widget">
          <div class="w-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg><div><span class="w-label">${esc(H.workingOutOf)}</span><span class="w-value">${esc(H.city)}</span></div></div>
          <div class="w-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><div><span class="w-label">${esc(H.localTimeLabel)}</span><span class="w-value" id="w-time"></span></div></div>
        </div>
      </section>

      <section class="tb-loop" aria-label="Adaikem">
        <div class="tb-loop-m"><video data-vsrc="${(L.src4k && window.matchMedia && matchMedia("(min-width: 901px)").matches) ? L.src4k : L.src}" poster="${L.poster}" autoplay muted loop playsinline preload="auto" disablepictureinpicture aria-label="${esc(L.alt)}"></video></div>
      </section>

      <section class="tb-about" id="about">
        <p class="eyebrow left">${esc(A.eyebrow)}</p>
        <p class="tb-about-b">${esc(A.body)}</p>
        <a class="tb-about-h" href="${A.handleHref}" target="_blank" rel="noopener">${esc(A.handle)}</a>
      </section>

      <section class="tb-exp" id="experience">
        ${subHead({eyebrow:"Experience", title:"Where I’ve worked"})}
        <ol class="tb-exp-list">${E.map(e=>`
          <li>
            <span class="tb-exp-yr"><span class="tb-exp-y mono">${esc(e.years)}</span>${e.loc?`<span class="tb-exp-l tb-exp-l2">${esc(e.loc)}</span>`:""}</span>
            <span class="tb-exp-m"><span class="tb-exp-oh"><span class="tb-exp-o">${esc(e.org)}</span>${e.loc?`<span class="tb-exp-l tb-exp-l1">${esc(e.loc)}</span>`:""}</span>${e.roles.map(([r,d])=>`<span class="tb-exp-r">${esc(r)}${d?`<span class="tb-exp-d">${esc(d)}</span>`:""}</span>`).join("")}</span>
          </li>`).join("")}
        </ol>
      </section>

      <section class="tb-explore">
        ${subHead({eyebrow:"The work", title:"Explore my categories"})}
        <div class="tb-ex-grid">${tiles.map(x=>`<a class="tb-ex" href="${x.href}" data-tab="${x.id}"><span class="tb-ex-img">${x.vid?`<video data-vsrc="${x.vid}" poster="${x.img}" autoplay muted loop playsinline preload="none" disablepictureinpicture></video>`:x.img?`<img src="${x.img}" alt="" loading="lazy" decoding="async">`:`<span class="tb-ex-ph"><span class="soon-orb"></span><span class="mono">COMING SOON</span></span>`}</span><span class="tb-ex-t">${esc(x.t)} <i>→</i></span><span class="tb-ex-d">${esc(x.d)}</span></a>`).join("")}</div>
      </section>
      ${contactBlock(true)}`;
      const H2 = H; const tick = ()=>{ const el=document.getElementById("w-time"); if(el) el.innerHTML = esc(new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:H2.timezone})).replace(":","<span class=\"tb-colon\">:</span>"); };
      tick(); clockTimer = setInterval(tick, 15000);
      const lv = main.querySelector(".tb-loop video"); if(lv){ lv.muted = true; if(window.vload) vload(lv); else { lv.src = lv.dataset.vsrc; } lv.addEventListener("vready", ()=>lv.play().catch(()=>{}), {once:true}); }
      main.querySelectorAll(".tb-ex-img video").forEach(v=>{ v.muted=true; const go=()=>{ if(window.vload) vload(v); else v.src=v.dataset.vsrc; }; if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ io.disconnect(); go(); } },{rootMargin:"300px"}); io.observe(v); } else go(); v.addEventListener("vready", ()=>v.play().catch(()=>{}), {once:true}); v.addEventListener("loadeddata", ()=>v.play().catch(()=>{}), {once:true}); });
      document.title = C.meta.title;
    },
    uiux(){
      const g = G.uiux;
      const W3 = ["hm-trades","stikboo","chainai","presale-memecoin-landing","redesigned-neon-ui"];
      const PRI=["auxhr","warblelive","hm-trades","sofavault","stikboo","invora"];   /* Oct 20 2026: Invora right after Stikboo */   /* Oct 19 2026: AuxHR first, before WarbleLive (her ask) */ const OR=k=>{const p=PRI.indexOf(k); return p>=0?p:10+g.cases.indexOf(k);};
      const colA = g.cases.filter(k=>!W3.includes(k)), colB = g.cases.filter(k=>W3.includes(k));
      main.innerHTML = `<section class="tb-page">${pageHead(g)}<div class="cards tb-cards tb-split"><div class="tb-col">${colA.map(k=>`<div class="tb-cw" style="--o:${OR(k)}">${TB.workCards([k])}</div>`).join("")}</div><div class="tb-col">${colB.map(k=>`<div class="tb-cw" style="--o:${OR(k)}">${TB.workCards([k])}</div>`).join("")}</div></div></section>${footSmall()}`;
      document.title = `${g.title} | ${B.name}`;
      if(window.vhydrate) vhydrate(main);
    },
    motion(){
      /* Oct 18 2026 v7: the living AI / Motion page lives in motion-page.js (+ .css); loaded on demand on an in-place tab switch */
      if(window.TBMotionPage){ window.TBMotionPage({ main, C, G, B, esc, pageHead, subHead, footSmall, secById }); return; }
      if(!window.__tbMP){ window.__tbMP = 1; let n = 0; const ready = ()=>{ if(++n===2 && active==="motion" && window.TBMotionPage) RENDER.motion(); };
        const l = document.createElement("link"); l.rel = "stylesheet"; l.href = U("motion-page.css?v=7"); l.onload = l.onerror = ready; document.head.appendChild(l);
        const s = document.createElement("script"); s.src = U("motion-page.js?v=7"); s.onload = s.onerror = ready; document.head.appendChild(s); }
      const g = G.motion;
      const secs = g.sections.map(secById).filter(Boolean);
      main.innerHTML = `<section class="tb-page">${pageHead(g)}
          <nav class="tb-chips" aria-label="Sections">${secs.map(s=>`<a href="#${s.id}">${esc(s.title)}</a>`).join("")}</nav>
          <div class="cards tb-cards">${TB.workCards(g.featured)}</div></section>
        ${secs.map((s,i)=>`<section class="tb-page tb-subsec" id="${s.id}">${subHead(s, "0"+(i+1))}${vgrid(s)}</section>`).join("")}
        ${footSmall()}`;
      document.title = `${g.title} | ${B.name}`;
      TB.wireVideos(main);
    },
    brand(){
      const g = G.brand;
      main.innerHTML = `<section class="tb-page">${pageHead(g)}<div class="cards tb-cards">${TB.workCards(g.cases)}</div>
          <div class="vgrid cols-1 tb-vgrid tb-solo">${TB.tile(g.soon)}</div></section>${footSmall()}`;
      document.title = `${g.title} | ${B.name}`;
      if(window.vhydrate) vhydrate(main);
    },
    video(){
      const g = G.video;
      const secs = g.sections.map(secById).filter(Boolean);
      main.innerHTML = `<section class="tb-page">${pageHead(g)}${secs.map(s=>vgrid(s)).join("")}</section>${footSmall()}`;
      document.title = `${g.title} | ${B.name}`;
      TB.wireVideos(main);
    }
  };

  function render(id, hash){
    if(clockTimer){ clearInterval(clockTimer); clockTimer = null; }
    main.querySelectorAll("video").forEach(v=>{ try{ v.pause(); }catch(_){} });
    active = RENDER[id] ? id : "about";
    body.dataset.tab = active;
    markTab(active);
    RENDER[active]();
    if(hash){ const t=document.getElementById(hash); if(t){ t.scrollIntoView(); return; } }
    window.scrollTo(0,0);
  }

  /* in-place tab switching: intercept clicks on any link that points at a tab */
  document.addEventListener("click",(e)=>{
    if(e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]"); if(!a || a.target==="_blank") return;
    const url = new URL(a.getAttribute("href"), location.href);
    if(url.origin!==location.origin) return;
    const id = a.dataset.tab || tabOfPath(url.pathname); if(!id) return;
    const hash = a.dataset.hash || url.hash.slice(1);
    if(!a.dataset.tab && !hash && url.pathname===location.pathname && a.getAttribute("href").startsWith("#")) return;
    e.preventDefault();
    if(id===active && hash){ const t=document.getElementById(hash); if(t){ t.scrollIntoView({behavior:"smooth"}); history.replaceState({tab:id}, "", url.pathname+"#"+hash); return; } }
    if(id===active && !hash){ window.scrollTo({top:0,behavior:"smooth"}); return; }
    history.pushState({tab:id}, "", url.pathname + (hash?"#"+hash:""));
    render(id, hash);
  });
  window.addEventListener("popstate",()=>{ const id = tabOfPath(location.pathname); if(id) render(id, location.hash.slice(1)); });

  /* first paint: no entrance animation after the first page */
  render(active, location.hash.slice(1));
  history.replaceState({tab:active}, "");
  requestAnimationFrame(()=>{ body.classList.add("ready"); setTimeout(()=>body.classList.add("tb-swapped"), 1200); });
  window.__siteReady = true;
})();

;(function(){var kick=function(){document.querySelectorAll('video[muted],video').forEach(function(v){if(v.muted&&v.paused&&v.src&&v.dataset.noauto!=='1'){var r=v.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)v.play().catch(function(){});}});};
['touchstart','touchend','scroll','click'].forEach(function(e){addEventListener(e,kick,{passive:true});});
document.addEventListener('visibilitychange',function(){if(!document.hidden)kick();});setTimeout(kick,800);setTimeout(kick,2500);})();
