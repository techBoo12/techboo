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
  const peers = all.filter(x=>(window.TBTabOfCase?TBTabOfCase(x.slug):"uiux")===tabId); const pool = peers.length>1?peers:all;
  const i = pool.indexOf(k), nx = pool[(i+1)%pool.length];
  /* Oct 20 2026 8:29 PM her ask "put thanks for scrolling in all of my case studies": the paid-receipt ending from Invora, restyled per case. Invora has its own; hm-trades and warblelive get theirs from their redesigns; motion pieces are not case studies. */
  const TY_SKIP = ["invora","hm-trades","warblelive","sphinx-ai-promo","spenda-motion"];
  const TY_THEME = {
    auxhr:{a:"#4266ff",b:"#63eafd",c:"#91b6ff",bg:"#07091d",font:"'General Sans','Manrope',sans-serif",head:"'General Sans','Manrope',sans-serif",ink:"#fff"},
    sofavault:{a:"#B5CCC8",b:"#1C5A63",c:"#F7F4EF",bg:"#0b1a1c",font:"'Poppins','Manrope',sans-serif",head:"'Poppins','Manrope',sans-serif",ink:"#F7F4EF"},
    stikboo:{a:"#D4FF4A",b:"#8B5CF6",c:"#7DF9FF",bg:"#0d0a1b",font:"'Space Grotesk','Manrope',sans-serif",head:"'Tiny5',monospace",ink:"#fff",pixel:1}
  };
  const tyOn = !TY_SKIP.includes(slug) && tabId === "uiux";
  const th = TY_THEME[slug] || {a:k.dot||"#C4A0FF",b:"#C4A0FF",c:"#fff",bg:"#0b0b10",font:"'Inter','Manrope',sans-serif",head:"'Inter','Manrope',sans-serif",ink:"#fff"};
  const TY_NAME = {auxhr:"AuxHR",sofavault:"SofaVault",stikboo:"Stikboo",chainai:"ChainAI","replicated-soft-ui":"Soft UI","responsive-ecommerce":"E-Commerce Website","splash-signin-signup":"Splash And Auth Screens","train-app-onboarding":"Train App Onboarding"};
  const tyName = TY_NAME[slug] || (k.brand||k.title||"").toLowerCase().replace(/(^|[\s·&-])([a-z])/g,(m,p,ch)=>p+ch.toUpperCase());
  const tyHTML = !tyOn ? "" : `<div class="tb-ty${th.pixel?" px":""}" id="tb-ty" style="--ty-a:${th.a};--ty-b:${th.b};--ty-c:${th.c};--ty-bg:${th.bg};--ty-font:${th.font};--ty-head:${th.head};--ty-ink:${th.ink}">
        <div class="tb-ty-glow" aria-hidden="true"></div>
        <h2 class="tb-ty-h">Thanks For <span>Scrolling</span></h2>
        <div class="tb-ty-rc">
          <div class="tb-ty-top"><span class="tb-ty-mk" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg></span><div><b>Receipt</b><small>${esc(tyName)} Case Study</small></div></div>
          <div class="tb-ty-row"><span>Designed By</span><b>Adaikem Ajufo</b></div>
          <div class="tb-ty-row"><span>Role</span><b>${esc(k.role||"Product Designer")}</b></div>
          <div class="tb-ty-row tot"><span>Your Time</span><b>Paid In Full</b></div>
          <div class="tb-ty-stamp" aria-hidden="true"><span>Thank You</span></div>
        </div>
        <div class="tb-ty-act"><a class="tb-ty-btn" href="../${backHref}"><span aria-hidden="true">←</span> Back To Projects</a><button class="tb-ty-btn ghost" type="button" data-ty-top>Back To Top <span aria-hidden="true">↑</span></button>${k.website?`<a class="tb-ty-btn ghost" href="${k.website}" target="_blank" rel="noopener">Visit ${esc(k.website.replace(/^https?:\/\/(www\.)?/,"").replace(/\/.*$/,""))} <span aria-hidden="true">↗</span></a>`:""}</div>
      </div>`;
  if(tyOn && !document.getElementById("tb-ty-css")){
    const st = document.createElement("style"); st.id = "tb-ty-css";
    st.textContent = `
body[data-slug="auxhr"] #ax-close{display:none}
.tb-ty{position:relative;overflow:hidden;isolation:isolate;border-radius:30px;padding:84px 24px 64px;margin:20px 0 48px;display:flex;flex-direction:column;align-items:center;text-align:center;background:var(--ty-bg);border:1px solid color-mix(in srgb,var(--ty-a) 22%,transparent);font-family:var(--ty-font);color:var(--ty-ink)}
.tb-ty-glow{position:absolute;inset:-30%;z-index:-1;background:conic-gradient(from 0deg at 50% 60%,transparent 0deg,color-mix(in srgb,var(--ty-a) 26%,transparent) 60deg,transparent 140deg,color-mix(in srgb,var(--ty-b) 26%,transparent) 220deg,transparent 300deg);filter:blur(40px);animation:tbTySpin 16s linear infinite}
.tb-ty::after{content:"";position:absolute;inset:0;z-index:-1;background-image:radial-gradient(color-mix(in srgb,var(--ty-a) 18%,transparent) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:radial-gradient(60% 60% at 50% 45%,#000,transparent);mask-image:radial-gradient(60% 60% at 50% 45%,#000,transparent)}
.tb-ty-h{margin:0;font:700 clamp(44px,7.2vw,104px)/.98 var(--ty-head);letter-spacing:-.05em;color:var(--ty-ink);max-width:11ch}
.tb-ty.px .tb-ty-h{font-weight:400;letter-spacing:.01em;line-height:1.02;text-transform:uppercase}
.tb-ty-h span{display:inline-block;padding:0 .04em .1em;margin-bottom:-.1em;background:linear-gradient(100deg,var(--ty-b) 0%,var(--ty-a) 30%,#fff 45%,var(--ty-a) 60%,var(--ty-b) 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:tbTySheen 5s ease-in-out infinite}
.tb-ty-rc{position:relative;margin-top:44px;width:min(380px,100%);text-align:left;padding:20px 22px 30px;border-radius:20px 20px 6px 6px;background:linear-gradient(160deg,rgba(255,255,255,.12),color-mix(in srgb,var(--ty-a) 7%,transparent) 60%,rgba(255,255,255,.03));border:1px solid color-mix(in srgb,var(--ty-a) 32%,transparent);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 30px 70px rgba(0,0,0,.45);-webkit-mask:linear-gradient(#000,#000) top/100% calc(100% - 10px) no-repeat,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/18px 10px repeat-x;mask:linear-gradient(#000,#000) top/100% calc(100% - 10px) no-repeat,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/18px 10px repeat-x;transform:translateY(24px);opacity:0;transition:transform .9s cubic-bezier(.2,.8,.2,1),opacity .9s}
.tb-ty.on .tb-ty-rc{transform:none;opacity:1}
.tb-ty-top{display:flex;align-items:center;gap:10px;padding-bottom:14px;margin-bottom:6px;border-bottom:1px dashed rgba(255,255,255,.2)}
.tb-ty-top>div{flex:1;min-width:0}
.tb-ty-mk{width:28px;height:28px;flex:0 0 28px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,var(--ty-b),var(--ty-a))}
.tb-ty.px .tb-ty-mk{border-radius:4px;color:#0d0a1b}
.tb-ty-top b{display:block;font-size:15px;font-weight:700;color:var(--ty-ink)}
.tb-ty-top small{display:block;font-size:12px;color:rgba(255,255,255,.6);padding-right:96px}
.tb-ty-row{display:flex;justify-content:space-between;gap:12px;padding:9px 0;font-size:14px}
.tb-ty-row span{color:rgba(255,255,255,.6);flex:none}
.tb-ty-row b{color:var(--ty-ink);font-weight:600;text-align:right}
.tb-ty-row.tot{margin-top:6px;padding-top:14px;border-top:1px dashed rgba(255,255,255,.2);font-size:16px}
.tb-ty-row.tot b{color:var(--ty-a)}
body[data-slug="sofavault"] .tb-ty-row.tot b{color:var(--ty-c)}
.tb-ty-stamp{position:absolute;right:18px;top:20px;padding:6px 10px;border:2.5px solid var(--ty-a);border-radius:10px;color:var(--ty-a);font:800 12.5px/1 var(--ty-font);letter-spacing:.12em;text-transform:uppercase;transform:rotate(-12deg) scale(2.2);opacity:0;background:color-mix(in srgb,var(--ty-bg) 50%,transparent)}
.tb-ty.px .tb-ty-stamp{font-family:"Tiny5",monospace;font-weight:400;border-radius:3px}
.tb-ty.on .tb-ty-stamp{animation:tbTyStamp .6s cubic-bezier(.3,1.4,.5,1) 1s forwards}
.tb-ty-act{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:38px}
.tb-ty-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 22px;border-radius:999px;font:600 15px/1 var(--ty-font);color:var(--ty-bg);background:linear-gradient(135deg,var(--ty-a),color-mix(in srgb,var(--ty-a) 70%,#fff));border:0;cursor:pointer;text-decoration:none;transition:transform .2s;box-shadow:0 12px 30px color-mix(in srgb,var(--ty-a) 30%,transparent)}
.tb-ty-btn:hover{transform:translateY(-2px)}
.tb-ty-btn.ghost{color:var(--ty-ink);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.2);box-shadow:none}
.tb-ty.px .tb-ty-btn{border-radius:6px}
@keyframes tbTySpin{to{transform:rotate(360deg)}}
@keyframes tbTySheen{0%,20%{background-position:100% 0}60%,100%{background-position:0 0}}
@keyframes tbTyStamp{to{opacity:1;transform:rotate(-12deg) scale(1)}}
.tb-ty:not(.on) .tb-ty-glow,.tb-ty:not(.on) .tb-ty-h span{animation-play-state:paused}
@media (max-width:600px){.tb-ty{border-radius:22px;padding:60px 18px 48px;margin:10px 0 36px}.tb-ty-h{font-size:46px}.tb-ty.px .tb-ty-h{font-size:40px}.tb-ty-rc{margin-top:34px;padding:18px 18px 28px}.tb-ty-row{font-size:13.5px}.tb-ty-act{margin-top:30px;gap:10px}.tb-ty-btn{padding:13px 18px;font-size:14px}.tb-ty-stamp{right:14px;top:22px;font-size:11.5px;padding:5px 9px}}
@media (prefers-reduced-motion:reduce){.tb-ty-glow,.tb-ty-h span{animation:none!important}.tb-ty-rc{transform:none;opacity:1;transition:none}.tb-ty-stamp{opacity:1;transform:rotate(-12deg);animation:none!important}}`;
    document.head.appendChild(st);
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
    if("IntersectionObserver" in window && !rm){ new IntersectionObserver(es=>es.forEach(e=>tyEl.classList.toggle("on", e.isIntersecting)),{rootMargin:"0px 0px -10% 0px"}).observe(tyEl); } else tyEl.classList.add("on");
    const tb = tyEl.querySelector("[data-ty-top]"); if(tb) tb.addEventListener("click", ()=>scrollTo({top:0, behavior: rm ? "auto" : "smooth"}));
  }
  /* shared lightbox: tap any frame to view it large (lightbox.js) */
  const lbBind = ()=>window.TBLightbox && TBLightbox.bind($("case"));
  if(window.TBLightbox) lbBind(); else { const sc = document.createElement("script"); sc.src = "../lightbox.js"; sc.onload = lbBind; document.head.appendChild(sc); }
  requestAnimationFrame(()=>document.body.classList.add("ready"));
  window.__siteReady = true;
})();
