/* AI Films card, v1 (Oct 20 2026, her ask 9:36 PM "rework this AI film you see the vision yeah?").
   A cinematic glass card for items marked film:true in content.js. Desktop: the muted highlights loop (item.preview) plays while
   the card is on screen (motion-page.js observes every .mp-sec video). Phones: poster only, tap the frame for the full film with
   sound in the fullscreen player. One CTA: Open The Film (the film page). Words and media all come from the content.js item. */
(function(){
  const esc = (s)=>String(s??"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const PLAY = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8.5 5.8v12.4c0 .8.9 1.3 1.6.9l9.8-6.2c.6-.4.6-1.4 0-1.8l-9.8-6.2c-.7-.4-1.6.1-1.6.9z" fill="currentColor"/></svg>`;
  const desk = ()=> !!(window.matchMedia && matchMedia("(hover: hover) and (min-width: 900px)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches);
  /* p = the collected piece (motion-page.js), it = the raw content.js item, i = its index for the fullscreen player */
  window.TBFilmCard = function(p, it, i){
    const f = it.film || {};
    const media = desk() && it.preview
      ? `<video data-vsrc="${it.preview}" poster="${p.poster}" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true"></video>`
      : `<img src="${p.poster}" alt="" loading="lazy" decoding="async">`;
    const facts = [["Client", f.client], ["Year", p.years], ["Runtime", f.runtime]].filter(x=>x[1]);
    return `
      <article class="card fc-card mp-card big">
        <button class="fc-frame mp-media" type="button" data-open="${i}" aria-label="Play ${esc(p.outcome)} full screen with sound">
          ${media}
          <span class="fc-bars" aria-hidden="true"></span>
          <span class="fc-tag mono" aria-hidden="true"><i></i>AI Film</span>
          <span class="fc-len mono" aria-hidden="true">${esc(f.runtime||"")}</span>
          <span class="fc-pb" aria-hidden="true"><span class="fc-pb-i">${PLAY}</span><span class="fc-pb-l">Play With Sound</span></span>
        </button>
        <div class="fc-body">
          <div class="fc-main">
            <div class="brand-row"><span class="dot" style="background:${p.dot}"></span><span class="brand">${esc(p.brand)}</span></div>
            <h3 class="fc-title">${esc(p.outcome)}</h3>
            ${f.logline?`<p class="fc-line">${esc(f.logline)}</p>`:""}
            ${p.badges.length?`<div class="fc-chips">${p.badges.map(b=>`<span>${esc(b)}</span>`).join("")}</div>`:""}
          </div>
          <div class="fc-side">
            <dl class="fc-facts">${facts.map(([a,b])=>`<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>
            ${p.href?`<a class="fc-cta" href="${p.href}">${esc(it.cta||"Open The Film")} <i aria-hidden="true">→</i></a>`:""}
          </div>
        </div>
      </article>`;
  };
})();
