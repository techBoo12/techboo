/* Case-study page: renders one Behance case from CONTENT.work.cases by <body data-slug>. All text lives in ../content.js */
(function(){
  const C = window.CONTENT, slug = document.body.dataset.slug;
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const all = C.work.cases.filter(k=>k.slug && !k.hidden);
  const k = all.find(x=>x.slug===slug);
  const $ = (id)=>document.getElementById(id);
  const up = (p)=> p && !/^https?:/.test(p) ? "../"+p : p;
  const TABPAGE = {uiux:["ui-ux-designs","UI/UX Designs"], motion:["ai-motion-designs#motion","AI / Motion Designs"], brand:["brand-designs","Brand Designs"]};
  const tabId = window.TBTabOfCase ? TBTabOfCase(slug) : "uiux";
  const [backHref, backLabel] = TABPAGE[tabId] || TABPAGE.uiux;
  if(!k){ $("case").innerHTML = `<section class="case-hero"><h1 class="case-title">Case not found</h1><p><a class="back" href="../${backHref}">← ${backLabel}</a></p></section>`; return; }
  document.title = `${k.title} | ${C.nav.first} ${C.nav.last}`;
  const meta = [["Role", k.role]];
  const descHTML = (k.outcome && k.outcome!==k.title ? `<p class="case-lede">${esc(k.outcome)}</p>` : "") + (k.desc && !["auxhr","invora"].includes(slug) ? `<p class="case-desc">${esc(k.desc)}</p>` : "");
  const gal = (k.gallery||[]).map(m=> m.type==="image"
      ? `<figure class="case-module rv">${m.slices.map(([s,w,h],j)=>`<img src="${up(s)}" width="${w}" height="${h}" alt="${esc(k.title)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(k.title)} · ${j+1}">`).join("")}</figure>`
      : `<figure class="case-module video rv"><video data-vsrc="${up(m.src)}" poster="${up(m.poster)}"${m.loop?" muted loop autoplay":" controls"} playsinline preload="none" width="${m.w}" height="${m.h}"></video></figure>`).join("");
  const peers = all.filter(x=>(window.TBTabOfCase?TBTabOfCase(x.slug):"uiux")===tabId); const ORD=((C.groups||{})[tabId]||{}).cases||[]; const oi=x=>{const n=ORD.indexOf(x.slug); return n<0?999:n;}; peers.sort((a,b)=>oi(a)-oi(b));   /* Oct 20 2026 10:01 PM: next project follows the page order */
  const pool = peers.length>1?peers:all;
  const i = pool.indexOf(k), nx = pool[(i+1)%pool.length];
  /* Oct 20 2026 8:29 PM her ask "put thanks for scrolling in all of my case studies": the paid-receipt ending from Invora, restyled per case. Invora has its own; hm-trades and warblelive get theirs from their redesigns; motion pieces are not case studies. */
  const TY_SKIP = ["invora","hm-trades","warblelive","sphinx-ai-promo","spenda-motion","navra"];   // navra: own Payment Successful ending
  /* Oct 20 2026 8:55 PM her voice note: "not everything should be receipt form". Each case now ends on an artefact from its own product world (endings.css). */
  const tyOn = !TY_SKIP.includes(slug) && tabId === "uiux";
  const role = esc(k.role||"Product Designer"), D = "Adaikem Ajufo";
  const row = (a,b,c)=>`<div class="tbe-row"><span>${a}</span><b${c?` class="${c}"`:""}>${b}</b></div>`;
  const ck = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>`;
  const PIX = ["..........",".LL....LL.","LLLL..LLLL","LLWLLLLLLL","LLLLLLLLLL",".LLLLLLLL.","..LLLLLL..","...LLLL...","....LL....",".........."];
  const TY_FONT = {sofavault:"Poppins:wght@400;500;600;700", "investment-dashboard":"Inter:wght@400;500;600;700", "presale-memecoin-landing":"Poppins:wght@400;500;600;700;800", "e-learning-dashboard":"Poppins:wght@400;500;600", "splash-signin-signup":"Nunito:wght@400;600;700;800", "auth-wiki":"Poppins:wght@400;500;600&family=IBM+Plex+Mono:wght@500", "responsive-ecommerce":"DM+Serif+Display&family=Manrope:wght@400;500;600;700", "replicated-soft-ui":"Poppins:wght@400;500;600", "train-app-onboarding":"Poppins:wght@400;500;600", stikboo:"Tiny5&family=Space+Grotesk:wght@400;500;600;700"};
  const TY_ART = {
    auxhr:()=>[`<div class="ax-cc"><div class="ax-cc-top"><span class="tbe-k">Application Update</span><span class="ax-chip">${ck} Shortlisted</span></div>
      <div class="ax-who"><span class="ax-av" aria-hidden="true">AA</span><div><b>${D}</b><small>Designed By</small></div></div>
      <div class="ax-pipe" aria-label="Applied, Screened, Shortlisted, Hired"><div class="ax-st"><i></i>Applied</div><div class="ax-st"><i></i>Screened</div><div class="ax-st"><i></i>Shortlisted</div><div class="ax-st now"><i></i>Hired</div></div>
      ${row("Role",role)}${row("Status","Offer Sent To You")}</div>`, "Thanks for reviewing this case. You made the shortlist."],
    sofavault:()=>[`<div class="sv-wrap"><span class="sv-string" aria-hidden="true"></span><div class="sv-tag">
      <div class="sv-head"><span class="sv-ico" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 12h20v5H2zM5 17v2M19 17v2"/></svg></span><div><b>SofaVault</b><small>Delivery Note</small></div></div>
      <div class="sv-to">Delivered To<b>Your Space</b></div>
      ${row("Designed By",D)}${row("Role",role)}${row("Status","Delivered")}
      <div class="sv-care">${ck} Handle With Care</div></div></div>`, "Hope it fits your space. Come back for another look anytime."],
    stikboo:()=>{ let px=""; PIX.forEach((r,y)=>[...r].forEach((c,x)=>{ const n=y*10+x; px+=`<i style="background:${c==="L"?"#D4FF4A":c==="W"?"#fff":"#8B5CF6"};animation-delay:${((n*37)%100)*9}ms"></i>`; }));
      return [`<div class="sb-card"><div class="sb-art" role="img" aria-label="Pixel heart">${px}<span class="sb-badge">Mint Successful</span></div>
      <div class="sb-meta"><div class="sb-name">Thanks #001 <small>1 Of 1</small></div>${row("Designed By",D)}${row("Role",role)}${row("Owner","You")}</div></div>`, "Minted just for you. Thanks for scrolling all the way down."]; },
    "investment-dashboard":()=>[`<div class="iv-card"><div class="iv-top"><span class="tbe-k">Portfolio Statement</span><span class="iv-live">Live</span></div>
      <div class="iv-bal">Your Time</div><div class="iv-big">Well Invested <span class="iv-up">↑ Up</span></div>
      <svg class="iv-chart" viewBox="0 0 300 92" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="ivg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3DE0F2" stop-opacity=".35"/><stop offset="1" stop-color="#3DE0F2" stop-opacity="0"/></linearGradient></defs><path class="f" d="M2 78 L34 70 L62 74 L92 58 L120 63 L150 46 L178 52 L206 34 L236 40 L264 20 L298 10 L298 92 L2 92Z"/><path class="l" d="M2 78 L34 70 L62 74 L92 58 L120 63 L150 46 L178 52 L206 34 L236 40 L264 20 L298 10"/></svg>
      ${row("Designed By",D)}${row("Role",role)}</div>`, "Thanks for spending your time here. Hope the return was worth it."],
    "presale-memecoin-landing":()=>[`<div class="mc-card"><div class="mc-coin" aria-hidden="true">MEO</div><div class="mc-done">Presale Complete</div>
      <div class="mc-clock" aria-label="Countdown finished"><b data-cd="h">00<small>HRS</small></b><b data-cd="m">00<small>MIN</small></b><b data-cd="s">03<small>SEC</small></b></div>
      <span class="mc-claim">${ck} Tokens Claimed</span>${row("Designed By",D)}${row("Role",role)}</div>`, "You made it to the end before the presale closed. Thanks for scrolling."],
    "e-learning-dashboard":()=>[`<div class="el-cert"><span class="el-seal" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg></span>
      <span class="tbe-k">Certificate Of Completion</span><div class="el-title">Course Completed</div><p class="el-sub">You finished the E-Learning Dashboard case study.</p>
      <div class="el-prog"><span>Course Progress</span><b>Complete</b></div><div class="el-bar"><i></i></div>
      ${row("Designed By",D)}${row("Role",role)}</div>`, "Lesson over. Thanks for learning your way through this one."],
    "splash-signin-signup":()=>[`<div class="sp-card"><div class="sp-ok" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></div>
      <h3>Welcome Favourite Human!</h3><p>You've signed in to the end of this case.</p>
      <div class="sp-in"><div><small>Designed By</small><b>${D}</b></div>${ck}</div>
      <div class="sp-in"><div><small>Role</small><b>${role}</b></div>${ck}</div>
      <div class="sp-go">Signed In</div></div>`, "Thanks for signing all the way in. See you on the next screen."],
    "auth-wiki":()=>{ const L=[`<span class="aw-k">import</span> { thank } <span class="aw-k">from</span> <span class="aw-s">"auth-wiki"</span>;`,`&nbsp;`,`<span class="aw-k">await</span> thank({`,`  designedBy: <span class="aw-s">"${D}"</span>,`,`  role: <span class="aw-s">"${role}"</span>,`,`});`,`<span class="aw-c">// you read the whole case</span>`];
      return [`<div class="aw-ed"><div class="aw-bar" aria-hidden="true"><i></i><i></i><i></i><span>thanks.js</span></div><pre class="aw-code">${L.map((l,i)=>`<span style="transition-delay:${400+i*180}ms">${l}</span>`).join("")}</pre></div>
      <div class="aw-toast"><i aria-hidden="true">✓</i> Authenticated · Reader Verified</div>`, "Thanks for reading the docs to the very last line."]; },
    "responsive-ecommerce":()=>[`<div class="ec-bag"><div class="ec-lab"><span class="ec-st">Order Ready</span><span class="tbe-k">Tom's Place</span><h3>Your Order Is Ready</h3>
      ${row("Designed By",D)}${row("Role",role)}${row("Served To","You")}</div></div>`, "Freshly served. Thanks for staying till dessert."],
    "replicated-soft-ui":()=>[`<div class="su-card"><div class="su-art" aria-hidden="true"></div><span class="su-np">Now Playing</span><h3>Thanks For Scrolling</h3><p>${D}</p>
      <div class="su-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="su-bar"><i></i></div><div class="su-time"><span>Start</span><span>The End</span></div>
      <div class="su-ctl" aria-hidden="true"><span><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></span><span class="pl"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></span><span><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></span></div>
      ${row("Designed By",D)}${row("Role",role)}</div>`, "That's the last track. Thanks for listening all the way through."],
    "train-app-onboarding":()=>[`<div class="tr-tk"><div class="tr-head"><span>E-Ticket</span><span>Arrived ${ck}</span></div>
      <div class="tr-route"><div class="tr-ends"><div><small>From</small><b>First Screen</b></div><div><small>To</small><b>The End</b></div></div>
      <div class="tr-line" aria-hidden="true"><span class="dot s"></span><span class="dot e"></span><svg class="train" width="30" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="background:#fff;border-radius:6px"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/></svg></div></div>
      <div class="tr-perf" aria-hidden="true"></div>
      <div class="tr-body"><div class="rows">${row("Designed By",D)}${row("Role",role)}</div><span class="tr-qr" aria-hidden="true"></span></div></div>`, "You've reached your final stop. Thanks for riding along."]
  };
  const art = (TY_ART[slug] || (()=>[`<div class="nt-card">${row("Designed By",D)}${row("Role",role)}</div>`, "Thanks for taking the time to look through this one."]))();
  const tyHTML = !tyOn ? "" : `<div class="tbe tbe-${TY_ART[slug]?slug:"note"}" id="tb-ty">
        <div class="tbe-bg" aria-hidden="true"></div>
        <h2 class="tbe-h">Thanks For <span>Scrolling</span></h2>
        <div class="tbe-art">${art[0]}</div>
        <p class="tbe-sign">${art[1]}</p>
        <div class="tbe-act"><a class="tbe-btn" href="../${backHref}"><span aria-hidden="true">←</span> Back To Projects</a><button class="tbe-btn ghost" type="button" data-ty-top>Back To Top <span aria-hidden="true">↑</span></button>${k.website?`<a class="tbe-btn ghost" href="${k.website}" target="_blank" rel="noopener">Visit ${esc(k.website.replace(/^https?:\/\/(www\.)?/,"").replace(/\/.*$/,""))} <span aria-hidden="true">↗</span></a>`:""}</div>
      </div>`;
  if(tyOn && !document.getElementById("tb-ty-css")){
    const ln = document.createElement("link"); ln.id = "tb-ty-css"; ln.rel = "stylesheet"; ln.href = "../endings.css?v=1"; document.head.appendChild(ln);
    if(TY_FONT[slug]){ const fl = document.createElement("link"); fl.rel = "stylesheet"; fl.href = "https://fonts.googleapis.com/css2?family="+TY_FONT[slug]+"&display=swap"; document.head.appendChild(fl); }
    const st = document.createElement("style"); st.textContent = `body[data-slug="auxhr"] #ax-close{display:none}`; document.head.appendChild(st);
  }
  const coverHTML = k.media.type==="video"
      ? `<video data-vsrc="${up(k.media.src)}" poster="${up(k.media.poster)}" muted loop autoplay playsinline></video>`
      : `<img src="${up(k.media.src)}" alt="${esc(k.title)}">`;
  $("case").innerHTML = `
    <section class="case-hero">
      <a class="back" href="../${backHref}"><span>←</span> ${esc(backLabel)}</a>
      <div class="brand-row"><span class="dot" style="background:${k.dot}"></span><span class="brand">${esc(k.brand)}</span></div>
      <h1 class="case-title">${esc(k.title)}</h1>
      <div class="case-meta">
        ${meta.map(([a,b])=>`<div><span class="foot-label">${a}</span><span class="v">${a==="Product Website"?b:esc(b)}</span></div>`).join("")}
        <div class="cm-full"><span class="foot-label">Tags</span><span class="badges">${(k.tags&&k.tags.length?k.tags:k.badges).map((b,j)=>`<span class="badge ${j===0?"accent":""}">${esc(b)}</span>`).join("")}</span></div>
        ${k.website?`<div class="cm-full cm-web"><span class="foot-label">Website</span><span class="v"><a class="foot-link pill" href="${k.website}" target="_blank" rel="noopener">Visit live website ↗</a></span></div>`:""}
      </div>
      ${descHTML ? `<div class="case-text">${descHTML}</div>` : ""}
    </section>
    <div class="case-cover rv"><div class="case-cover-media">${coverHTML}</div></div>
    <section class="case-gallery">${gal}</section>
    <section class="case-end">
      ${tyHTML}
      ${k.website?`<a class="foot-link pill" href="${k.website}" target="_blank" rel="noopener">Website is live ↗</a>`:""}
      <a class="next card-like" href="${nx.slug}">
        <span class="foot-label">Next project</span>
        <span class="next-row"><span class="next-thumb">${nx.media.type==="video"?`<img src="${up(nx.media.poster)}" alt="">`:`<img src="${up(nx.media.src)}" alt="" loading="lazy">`}</span>
        <span><span class="brand">${esc(nx.brand)}</span><span class="next-title">${esc(nx.title)} <i>→</i></span></span></span>
      </a>
    </section>
    <footer class="case-foot"><p class="rights">${esc(C.footer.rights)}</p><p class="socials"><a class="li-ico" href="${C.footer.linkedinHref}" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a><a href="mailto:${C.footer.email}">Email</a></p></footer>`;
  if(window.vhydrate) vhydrate(document.getElementById("case"));
  const els = document.querySelectorAll(".rv");
  if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{rootMargin:"0px 0px -8% 0px"});
    els.forEach(el=>io.observe(el));
  } else els.forEach(el=>el.classList.add("in"));
  const tyEl = document.getElementById("tb-ty");
  if(tyEl){
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cd = tyEl.querySelector('[data-cd="s"]'); let cdRun = false;
    const tick = ()=>{ if(!cd || cdRun) return; cdRun = true; if(rm){ cd.firstChild.nodeValue = "00"; return; } let n = 3; const t = setInterval(()=>{ n--; cd.firstChild.nodeValue = "0"+Math.max(n,0); if(n<=0) clearInterval(t); }, 700); };
    if("IntersectionObserver" in window && !rm){ new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ tyEl.classList.add("on"); tick(); } }),{rootMargin:"0px 0px -10% 0px"}).observe(tyEl); } else { tyEl.classList.add("on"); tick(); }
    const tb = tyEl.querySelector("[data-ty-top]"); if(tb) tb.addEventListener("click", ()=>scrollTo({top:0, behavior: rm ? "auto" : "smooth"}));
  }
  /* shared lightbox: tap any frame to view it large (lightbox.js) */
  const lbBind = ()=>window.TBLightbox && TBLightbox.bind($("case"));
  if(window.TBLightbox) lbBind(); else { const sc = document.createElement("script"); sc.src = "../lightbox.js"; sc.onload = lbBind; document.head.appendChild(sc); }
  requestAnimationFrame(()=>document.body.classList.add("ready"));
  window.__siteReady = true;
})();
