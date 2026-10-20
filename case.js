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
  /* shared lightbox: tap any frame to view it large (lightbox.js) */
  const lbBind = ()=>window.TBLightbox && TBLightbox.bind($("case"));
  if(window.TBLightbox) lbBind(); else { const sc = document.createElement("script"); sc.src = "../lightbox.js"; sc.onload = lbBind; document.head.appendChild(sc); }
  requestAnimationFrame(()=>document.body.classList.add("ready"));
  window.__siteReady = true;
})();
