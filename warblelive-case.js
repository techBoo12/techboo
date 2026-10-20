/* WarbleLive case page v2 (Oct 20 2026): a coded web page in WarbleLive's own brand (black, magenta #FF2AF9, plum #751F72, lilac #C4A0FF, Cabin). Keeps the live hero from wl-hero.js as the first frame, then rebuilds her screens in HTML/CSS. Copy and figures read off her own boards. Runs after case.js + wl-hero.js + cs2-case.js. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal || !window.CS2) return;
  const {RM, phone, reveal, tabs, onView, count, mountEnding} = CS2;
  document.body.classList.add("cs2-page","wrb2-page");
  const L = "../assets/cases/warblelive/live/", A = "../assets/cases/warblelive/";
  const P = [["poster0","Rave and Roses Party","Mavin Music Organization"],["poster1","Love is Not a Crime","The VMI music Organization"],["poster2","The Dumebi Event","The VMI music Organization"],["poster3","Mixtape Listening Event","Mavin Music Organization"],["poster4","Osimehn home match","The VMI music Organization"]];
  const I = {
    tk:'<svg viewBox="0 0 24 24"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
    fee:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2.1-.5-2.6-1.5M12 6.5V8M12 16v1.5"/></svg>',
    gift:'<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9C10 5 6 5 7 8s5 1 5 1 4 2 5-1-3-3-5 1"/></svg>',
    chart:'<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    bot:'<svg viewBox="0 0 24 24"><path d="M5 19l5-5M14 6l4 4M9 9l6 6M3 21l2-2M15 3l6 6-9 9-6-6z"/></svg>',
    ppl:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.2.6 3.5 2.6 3.5 6"/></svg>',
    chain:'<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    ai:'<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>'
  };
  const nav = (on)=>`<div class="wlp-nav">${["Home","Events","Wallet","Market"].map(n=>`<b class="${n===on?"on":""}"><i></i>${n}</b>`).join("")}</div>`;

  /* --- INTERLUDE: promise marquee + poster ribbon --- */
  const words = [["Secure Tickets","f"],["Offline Verification",""],["AI Discovery","g"],["NFT Tickets",""],["Smarter Pricing","f"]].map(([w,c])=>`<span class="wrb2-w ${c}">${w}</span>`).join('<span class="wrb2-star">✦</span>');
  const ribbon = P.map(([p,t,o])=>`<span class="wrb2-chip"><img src="${L}${p}.webp" alt="" loading="lazy" decoding="async"><span>${t}<small>${o}</small></span></span>`).join("");
  const inter1 = `<div class="cs2-int wrb2-int" aria-label="WarbleLive promises">
      <div class="cs2-mq" style="--dur:32s">${words+words+words}</div>
      <div class="cs2-mq rev" style="--dur:40s">${ribbon+ribbon+ribbon}</div>
    </div>`;

  /* --- ABOUT --- */
  const about = `<section class="cs2-sec">
      <div class="cs2-grid2">
        <div class="cs2-rv"><span class="cs2-eb"><i></i>About The Project</span>
          <h2 class="cs2-h2">Paper Tickets Out. <em>Smart Tickets In.</em></h2>
          <p class="cs2-p">WarbleLive is entering a $2.4B African live event market that's still stuck on paper tickets, informal systems and widespread fraud.</p>
          <p class="cs2-p">It flips it with AI-powered event discovery and blockchain-secured digital tickets.</p></div>
        <div class="wrb2-stat cs2-rv d1">
          <span class="l">African Live Event Market</span>
          <b><span data-to="2.4" data-dec="1" data-pre="$" data-suf="B">$0.0B</span></b>
          <div class="wrb2-old"><span>Paper tickets</span><span>Informal systems</span><span>Widespread fraud</span></div>
        </div>
      </div>
    </section>`;

  /* --- PROBLEM: two sides --- */
  const prob = `<section class="cs2-sec tight">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>The Problem</span><h2 class="cs2-h2">Both Sides Of The Door <em>Were Losing.</em></h2></div>
      <div class="wrb2-sides" data-tabgroup>
        <div class="cs2-tabs cs2-rv" role="tablist"><button class="cs2-tab" role="tab" data-k="g">Event Goers</button><button class="cs2-tab" role="tab" data-k="o">Organizers</button></div>
        <div class="cs2-cards three" data-pane="g">
          <div class="cs2-card"><span class="cs2-ic">${I.tk}</span><h4>Fake Tickets</h4><p>No way to tell a real ticket from a copy.</p></div>
          <div class="cs2-card"><span class="cs2-ic">${I.fee}</span><h4>Hidden Fees</h4><p>The price at checkout isn't the price on the poster.</p></div>
          <div class="cs2-card"><span class="cs2-ic">${I.gift}</span><h4>Zero Loyalty Rewards</h4><p>Showing up again and again earns nothing.</p></div>
        </div>
        <div class="cs2-cards three" data-pane="o">
          <div class="cs2-card"><span class="cs2-ic">${I.chart}</span><h4>Flying Blind</h4><p>No real-time data on sales or the crowd.</p></div>
          <div class="cs2-card"><span class="cs2-ic">${I.bot}</span><h4>Rampant Scalping</h4><p>Tickets flipped before fans can get them.</p></div>
          <div class="cs2-card"><span class="cs2-ic">${I.ppl}</span><h4>No Direct Reach</h4><p>No way to reach verified attendees directly.</p></div>
        </div>
      </div>
    </section>`;

  /* --- SOLUTION INTERLUDE --- */
  const sol = `<section class="cs2-band wrb2-sol"><div class="cs2-sec cs2-center">
      <span class="cs2-eb cs2-rv"><i></i>The Solution</span>
      <h2 class="cs2-h2 cs2-rv" style="max-width:20ch">Blockchain Keeps Tickets Legit. <em>AI Makes Discovery Personal.</em></h2>
      <div class="wrb2-dual cs2-rv d1" id="wrb2-dual">
        <div class="wrb2-node"><span class="cs2-ic">${I.chain}</span><b>On-Chain Tickets</b><small>Every ticket is a verifiable NFT</small></div>
        <div class="wrb2-core" aria-hidden="true"><img src="${L}logo_mark.webp" alt=""><i></i><i></i></div>
        <div class="wrb2-node"><span class="cs2-ic">${I.ai}</span><b>AI Discovery</b><small>Events picked for you</small></div>
      </div>
      <p class="cs2-p cs2-rv" style="margin:34px auto 0;max-width:46ch">Together, WarbleLive gives Africa's events market something it's never had: real ownership and smarter pricing.</p>
    </div></section>`;

  /* --- PROCESS --- */
  const STEPS = [["Empathize","Surveys and interviews with event goers and organizers to find where ticketing breaks."],["Define","One problem statement: fake tickets and hidden fees for fans, no data and no reach for organizers."],["Ideate","Blockchain tickets, offline verification and AI discovery, mapped into one flow."],["Prototype","Attendee app, organizer dashboard and web, in high fidelity."],["Test","Walked real ticket journeys, from discovery to the door, and fixed the friction."]];
  const proc = `<section class="cs2-sec">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>Design Process</span><h2 class="cs2-h2">Five Steps <em>To The Door</em></h2></div>
      <div class="wrb2-proc cs2-rv" data-tabgroup data-auto="3200">
        <div class="cs2-tabs" role="tablist">${STEPS.map(([n],i)=>`<button class="cs2-tab" role="tab" data-k="s${i}">${n}</button>`).join("")}</div>
        ${STEPS.map(([n,t],i)=>`<div class="wrb2-pane" data-pane="s${i}"><span class="n">0${i+1}</span><div><h4>${n}</h4><p>${t}</p></div></div>`).join("")}
      </div>
    </section>`;

  /* --- SCREEN 01: DISCOVERY --- */
  const CATS = ["All","Music","Sports","Art","Party"];
  const evCard = ([p,t,o])=>`<div class="wlp-ev"><img src="${L}${p}.webp" alt="" loading="lazy" decoding="async"><b>${t}</b><small>${o}</small></div>`;
  const discScr = `<div class="wlp">
      <div class="wlp-top"><span class="wlp-hi">Hi techBoo<small>Find your next event</small></span><span class="wlp-bell">🔔</span></div>
      <div class="wlp-stat"><span>My Tickets</span><b data-to="68">0</b><small>Tickets</small></div>
      <div class="wlp-search">⌕ <span>Search events, artists, venues</span></div>
      <div class="wlp-cats" id="wrb2-cats">${CATS.map((c,i)=>`<button type="button" class="${i?"":"on"}" data-c="${c}">${c}</button>`).join("")}</div>
      <div class="wlp-h">Trending <span>See all</span></div>
      <div class="wlp-rail"><div class="wlp-railin">${P.map(evCard).join("")}${P.map(evCard).join("")}</div></div>
      <div class="wlp-h">Popular Events</div>
      <div class="wlp-pop" id="wrb2-pop">${[["The Rave","Music"],["HEIS","Music"],["The Art","Art"],["Osimehn home match","Sports"]].map(([t,c])=>`<span data-c="${c}"><i>${c[0]}</i>${t}<small>${c} Event</small></span>`).join("")}</div>
      ${nav("Home")}
    </div>`;

  /* --- SCREEN 02: EVENT DETAIL --- */
  const detScr = `<div class="wlp">
      <div class="wlp-poster"><img src="${L}poster0.webp" alt="" loading="lazy" decoding="async"><span class="wlp-tag">Music Event</span></div>
      <h5 class="wlp-t">The Rave Listening Party &amp; HIM</h5>
      <div class="wlp-host"><img src="${L}logo_mark.webp" alt=""><span>Hosted by<b>The Vmi Organization</b></span></div>
      <div class="wlp-meta"><span>📅 2/2/25</span><span>🕛 12:00PM</span></div>
      <div class="wlp-sold"><div><span>Total Ticket</span><b>5000/5000</b></div><div class="bar"><i id="wrb2-bar"></i></div><small id="wrb2-pct">0%</small></div>
      <div class="wlp-types" id="wrb2-types"><button type="button" class="on" data-p="Regular">Regular</button><button type="button" data-p="VIP">VIP</button></div>
      <div class="wlp-buy"><span>Price<b>$3.15</b></span><button type="button">Buy Ticket</button></div>
    </div>`;

  /* --- SCREEN 03: PURCHASE --- */
  const buyScr = `<div class="wlp">
      <div class="wlp-top"><span class="wlp-hi">Buy Ticket<small>The Rave Listening Party</small></span><span class="wlp-bell">✕</span></div>
      <div class="wlp-mini"><img src="${L}poster0.webp" alt=""><span><b>The Rave Listening Party &amp; HIM</b><small>2/2/25 · 12:00PM</small></span></div>
      <div class="wlp-kv"><span>Seller</span><b>Techboo</b></div>
      <div class="wlp-kv"><span>Ticket Type</span><b>VIP</b></div>
      <div class="wlp-kv"><span>Price</span><b>$3.15</b></div>
      <div class="wlp-qty"><span>Quantity</span><div><button type="button" data-d="-1" aria-label="Less">−</button><b id="wrb2-q">2</b><button type="button" data-d="1" aria-label="More">+</button></div></div>
      <div class="wlp-tot"><span>Total</span><b id="wrb2-tot">$6.30</b></div>
      <button type="button" class="wlp-cta" id="wrb2-pay">Buy Ticket</button>
      <div class="wlp-minted" id="wrb2-minted"><span>✓</span><b>Ticket Minted</b><small>Saved to your ticket wallet</small></div>
    </div>`;

  const show = (id,num,title,em,lines,phones,flip)=>`<section class="cs2-sec wrb2-show ${flip?"flip":""}" ${id?`id="${id}"`:""}>
      <div class="wrb2-copy cs2-rv"><span class="wrb2-num">${num}</span><h3 class="cs2-h3">${title} <em>${em}</em></h3>${lines.map(l=>`<p class="cs2-p">${l}</p>`).join("")}</div>
      <div class="cs2-phones cs2-rv d1">${phones}</div>
    </section>`;
  const screens =
    show("wrb2-disc","01","Discovery","That Knows You",["Trending posters roll, categories filter in a tap, and your ticket count sits up top.","Try the category chips."],phone(discScr)) +
    show("wrb2-det","02","Event Detail","At A Glance",["Host, date, time and how many tickets are left, before you scroll.","Pick Regular or VIP and buy from the same screen."],phone(detScr),1) +
    show("wrb2-buy","03","Checkout","With No Surprises",["Seller, type and price are on the page. The total updates as you change the quantity, so there's nothing hidden.","Tap Buy Ticket."],phone(buyScr));

  /* --- ORGANIZER INTERLUDE --- */
  const org = `<section class="cs2-band wrb2-org"><div class="cs2-sec">
      <div class="cs2-grid2">
        <div class="cs2-rv"><span class="cs2-eb"><i></i>For Organizers</span><h2 class="cs2-h2">No More <em>Flying Blind.</em></h2>
          <p class="cs2-p">Real-time sales, events and rewards in one dashboard.</p></div>
        <div class="wrb2-dash cs2-rv d1" id="wrb2-dash">
          <div class="wrb2-dk"><span>Total Sales</span><b data-to="68">0</b><small>Tickets</small></div>
          <div class="wrb2-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle class="v" cx="60" cy="60" r="50" pathLength="500" style="--to:${500-432}"/></svg><span><b data-to="432">0</b><small>of 500 sold</small></span></div>
          <div class="wrb2-bars" aria-hidden="true">${[38,62,45,80,56,92,70].map((h,i)=>`<i style="--h:${h}%;--d:${i*90}ms"></i>`).join("")}</div>
        </div>
      </div>
    </div></section>`;

  /* --- VISUAL LANGUAGE --- */
  const sty = `<section class="cs2-sec wrb2-sty">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>Visual Language</span><h2 class="cs2-h2">Night Out <em>Energy</em></h2></div>
      <div class="wrb2-styg">
        <div class="wrb2-aa cs2-rv"><b>Aa</b><span>Cabin</span><small>Regular · Medium · SemiBold · Bold</small></div>
        <div class="wrb2-sw cs2-rv d1">${[["#FF2AF9","Magenta"],["#751F72","Plum"],["#C4A0FF","Lilac"],["#000000","Black"]].map(([h,n])=>`<span style="--c:${h}"><i></i><b>${n}</b><small>${h}</small></span>`).join("")}</div>
      </div>
    </section>`;

  /* --- OUTCOME --- (original boards removed Oct 20 2026: both carried the ticket artwork) */
  const out = `<section class="cs2-sec cs2-center">
      <span class="cs2-eb cs2-rv"><i></i>The Outcome</span>
      <h2 class="cs2-h2 cs2-rv" style="max-width:18ch">Real Ownership. <em>Smarter Pricing.</em></h2>
      <p class="cs2-p cs2-rv" style="margin:18px auto 0;max-width:46ch">One platform for fans and organizers: tickets that can't be faked, a door that works offline and events that find you.</p>
      <div class="wrb2-out cs2-rv"><span>AI event discovery</span><span>NFT tickets</span><span>Offline verification</span><span>Organizer dashboard</span></div>
    </section>`;

  /* keep the live hero frame from wl-hero.js, replace everything after it */
  const keep = gal.querySelector(".wlh");
  gal.innerHTML = "";
  if(keep) gal.appendChild(keep);
  const wrap = document.createElement("div"); wrap.className = "cs2 wrb2";
  wrap.innerHTML = inter1+about+prob+sol+proc+screens+org+sty+out;
  gal.appendChild(wrap);
  const root = wrap;
  reveal(root); tabs(root);

  /* category chips filter popular events */
  const cats = root.querySelector("#wrb2-cats"), pop = root.querySelector("#wrb2-pop");
  cats.querySelectorAll("button").forEach(b=>b.addEventListener("click", ()=>{ cats.querySelectorAll("button").forEach(x=>x.classList.remove("on")); b.classList.add("on");
    pop.querySelectorAll("span").forEach(s=>{ s.hidden = !(b.dataset.c==="All" || s.dataset.c===b.dataset.c); }); }));
  if(!RM) onView(cats, ()=>{ let i=0, user=false; cats.addEventListener("click", ()=>user=true, {once:true});
    const t=setInterval(()=>{ if(user){clearInterval(t);return;} i=(i+1)%CATS.length; cats.querySelectorAll("button")[i].click(); user=false; }, 2200); });
  /* tickets sold bar fills to 100% */
  const bar = root.querySelector("#wrb2-bar"), pct = root.querySelector("#wrb2-pct");
  onView(bar, ()=>{ bar.style.width="100%"; if(RM){pct.textContent="100%";return;} let v=0; const t=setInterval(()=>{ v=Math.min(100,v+4); pct.textContent=v+"%"; if(v>=100) clearInterval(t); }, 40); });
  root.querySelectorAll("#wrb2-types button").forEach(b=>b.addEventListener("click", ()=>{ b.parentNode.querySelectorAll("button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); }));
  /* quantity stepper + total */
  const q = root.querySelector("#wrb2-q"), tot = root.querySelector("#wrb2-tot"); let n = 2;
  root.querySelectorAll(".wlp-qty button").forEach(b=>b.addEventListener("click", ()=>{ n = Math.max(1, Math.min(10, n + +b.dataset.d)); q.textContent = n; tot.textContent = "$"+(3.15*n).toFixed(2); }));
  const pay = root.querySelector("#wrb2-pay"), mint = root.querySelector("#wrb2-minted");
  pay.addEventListener("click", ()=>{ mint.classList.add("on"); setTimeout(()=>mint.classList.remove("on"), 2600); });
  if(!RM) onView(pay, ()=>{ setInterval(()=>{ mint.classList.add("on"); setTimeout(()=>mint.classList.remove("on"), 2200); }, 5200); });
  /* organizer dashboard draws in */
  const dash = root.querySelector("#wrb2-dash"); onView(dash, ()=>dash.classList.add("on"));
  /* solution core pulses */
  const dual = root.querySelector("#wrb2-dual"); onView(dual, ()=>dual.classList.add("on"));

  /* ending: plain "Thanks For Scrolling" in the WarbleLive brand (Oct 20 2026 10:35 PM her word: no ticket anywhere) */
  mountEnding({cls:"cs2 wrb2 wrb2-plain", a:"#FF2AF9", b:"#751F72", bg:"#000", card:`<div class="wrb2-bye">
      <img src="${L}logo_mark.webp" alt="" width="44" height="44">
      <p>Thanks for spending a few minutes here. See you at the next one.</p>
    </div>`});
})();
