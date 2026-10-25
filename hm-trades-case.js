/* HM Trades case page v4 (Oct 25 2026: fuller hero, stroke-framed app panels instead of big phones, brand banners in the middle). v2 (Oct 20 2026): a coded web page in HM Trades' own brand. Screens rebuilt in HTML/CSS from her boards (figures read off her own screens). Runs after case.js + cs2-case.js. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal || !window.CS2) return;
  const {RM, reveal, tabs, onView, mountEnding} = CS2;
  document.body.classList.add("cs2-page","hm2-page");
  const A = "../assets/cases/hm-trades/";
  const I = {
    wallet:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12.5h2M3 9h15a3 3 0 0 0-3-3"/></svg>',
    shield:'<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    fee:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2.1-.5-2.6-1.5M12 6.5V8M12 16v1.5"/></svg>',
    bank:'<svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>',
    user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
    lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    store:'<svg viewBox="0 0 24 24"><path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM9 20v-6h6v6"/></svg>'
  };

  /* HM Trades stroke icon set (v4, Oct 25 2026): used in the app screens, the hero cards and the brand kit */
  const IC = {
    send:'<svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg>',
    receive:'<svg viewBox="0 0 24 24"><path d="M17 7L7 17M15 17H7V9"/></svg>',
    buy:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></svg>',
    sell:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8 12h8"/></svg>',
    swap:'<svg viewBox="0 0 24 24"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    wallet:I.wallet, lock:I.lock, shield:I.shield, user:I.user, bank:I.bank,
    p2p:'<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2.5 19c.5-3 2.4-5 4.5-5s4 2 4.5 5M12.5 19c.5-3 2.4-5 4.5-5s4 2 4.5 5"/></svg>',
    chat:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/></svg>',
    eye:'<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    bell:'<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4"/></svg>',
    home:'<svg viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v9H4z"/><path d="M10 20v-5h4v5"/></svg>'
  };
  const ACTS = [["send","Send"],["receive","Receive"],["buy","Buy"],["sell","Sell"]];
  const LOGO = (cls="")=>`<span class="hm3-logo ${cls}" aria-label="HM Trades logo"><b>HM</b></span>`;
  const spark = (up)=>`<svg class="hm2-spark" viewBox="0 0 56 22" aria-hidden="true"><path stroke="${up?"#6ACC9D":"#F06A7A"}" d="${up?"M2 18 L10 14 L17 16 L25 9 L33 11 L41 5 L48 7 L54 3":"M2 4 L10 8 L17 6 L25 12 L33 10 L41 15 L48 13 L54 18"}"/></svg>`;
  /* figures read off her HM Trades screens */
  const COINS = [["btc","BTC","Bitcoin","$65,111.44","-2.09%",0],["eth","ETH","Ethereum","$3,511.44","+2.09%",1],["bnb","BNB","BNB","$598.29","+2.08%",1],["usdt","USDT","Tether","₦1,453.00","P2P",1]];
  const coinRow = ([c,s,n,p,ch,up])=>`<div class="hmp-coin"><span class="hmp-ci ci-${c}">${s[0]}</span><span class="hmp-cn">${s}<small>${n}</small></span>${spark(up)}<span class="hmp-cp">${p}<small class="${up?"up":"dn"}">${ch}</small></span></div>`;
  const NAVI = {Home:"home",Wallet:"wallet",P2P:"p2p",Profile:"user"};
  const nav = (on)=>`<div class="hmp-nav">${["Home","Wallet","P2P","Profile"].map(n=>`<b class="${n===on?"on":""}">${IC[NAVI[n]]}${n}</b>`).join("")}</div>`;

  const walletScr = (id)=>`<div class="hmp" data-draw>
      <div class="hmp-top"><div style="display:flex;gap:8px;align-items:center"><span class="hmp-av">TB</span><span class="hmp-hi">Hi techBoo!<small>Welcome back</small></span></div><span class="hmp-bell">${IC.bell}</span></div>
      <div class="hmp-card"><span class="l">Total Balance</span><div class="hmp-bal" data-to="3540" data-dec="2" data-pre="$" ${id?`id="${id}"`:""}>$0.00</div><span class="hmp-chg">▲ +2.09% today</span></div>
      <div class="hmp-acts">${ACTS.map(([k,t])=>`<span class="hmp-act pulse a-${k}"><i>${IC[k]}</i>${t}</span>`).join("")}</div>
      <div class="hmp-h">Favourites <span>See all</span></div>
      ${COINS.slice(0,3).map(coinRow).join("")}
      ${nav("Home")}
    </div>`;

  /* --- FRAME: WarbleLive-style stroke frame around a fitted app panel (v4: replaces the big phone mockups) --- */
  const frame = (inner, label, cls="")=>`<figure class="hm3-frame ${cls}"><figcaption class="hm3-fbar"><span class="hm3-dots"><i></i><i></i><i></i></span><span class="hm3-flabel">${LOGO("xs")}${label}</span><span class="hm3-ftime">9:41</span></figcaption><div class="hm3-app">${inner}</div></figure>`;

  /* --- HERO (v4, Oct 25 2026: her note "it looks sparse... not one giant phone") --- */
  const offerMini = `<div class="hm3-fc hm3-offer"><div class="hmp-ven"><span class="hmp-av" style="width:22px;height:22px;font-size:8px">TB</span><span>Techboo<span class="v">✓</span><small>164 orders · 95%</small></span></div><div class="hm3-offer-r"><b>₦1,453.00<small> / USDT</small></b><button class="hmp-btn" type="button" tabindex="-1">Buy</button></div></div>`;
  const hero = `<section class="cs2-band hm2-hero hm3-hero"><div class="cs2-sec">
      <div class="hm3-hcopy cs2-rv">
        <span class="cs2-eb"><i></i>P2P Crypto · Mobile App</span>
        <div class="hm3-brandrow">${LOGO("lg")}<span class="hm3-bm">HM Trades<small>FinTech Case Study</small></span></div>
        <h2 class="hm2-word">HM<span>Trades</span></h2>
        <p class="hm2-sub">A P2P crypto trading platform built for Nigeria.</p>
        <div class="hm2-pills"><span class="hm2-pill">Mobile App</span><span class="hm2-pill">Wallet</span><span class="hm2-pill">P2P Marketplace</span><span class="hm2-pill">Escrow</span></div>
        <div class="hm3-meta">
          <div><span class="cs2-ic">${IC.wallet}</span><b>Wallet + P2P</b><small>In one app</small></div>
          <div><span class="cs2-ic">${IC.lock}</span><b>Escrow</b><small>On every trade</small></div>
          <div><span class="cs2-ic">${IC.shield}</span><b>Verified</b><small>Vendors only</small></div>
        </div>
        <div class="hm3-role"><span>Role <b>UI/UX</b></span><span>Market <b>Nigeria</b></span><span>Platform <b>Mobile</b></span></div>
      </div>
      <div class="hm3-stage cs2-rv d2">
        <div class="hm3-grid" aria-hidden="true"></div><div class="hm2-orb" aria-hidden="true"></div>
        <div class="hm3-hpanel">${frame(walletScr("hm2-bal"),"Home")}</div>
        <span class="hm2-float hm3-f1"><span class="hmp-ci ci-btc" style="width:26px;height:26px">B</span><span>BTC $65,111.44<small class="dn">-2.09%</small></span>${spark(0).replace('class="hm2-spark"','class="hm2-spark drawn"')}</span>
        <span class="hm2-float hm3-f2"><span class="hm3-fi g">${IC.lock}</span><span>Escrow Locked<small>Funds safe until released</small></span></span>
        <span class="hm2-float hm3-f3"><span class="hm3-fi b">${IC.shield}</span><span>Verified Vendor<small>164 completed orders</small></span></span>
        <div class="hm2-float hm3-f4">${offerMini}</div>
        <div class="hm2-float hm3-f5">${ACTS.map(([k,t])=>`<span class="hm3-ai a-${k}"><i>${IC[k]}</i>${t}</span>`).join("")}</div>
      </div>
    </div></section>`;

  /* --- TICKER INTERLUDE --- */
  const chips = COINS.map(([c,s,n,p,ch,up])=>`<span class="hm2-chip"><span class="hmp-ci ci-${c}">${s[0]}</span><span>${s} <small>${n}</small></span><span>${p} <small class="${up?"up":"dn"}">${ch}</small></span>${spark(up).replace('class="hm2-spark"','class="hm2-spark drawn"')}</span>`).join("");
  const words = [["Verified Vendors","f"],["Escrow On Every Trade",""],["Buy · Sell · Send","g"],["0% Fees",""]].map(([w,c])=>`<span class="hm2-w ${c}">${w}</span>`).join("");
  const ticker = `<div class="cs2-int hm2-tick" aria-label="HM Trades prices and promises">
      <div class="cs2-mq" style="--dur:34s">${chips+chips+chips+chips}</div>
      <div class="cs2-mq rev hm2-words" style="--dur:30s" aria-hidden="true">${words+words+words}</div>
    </div>`;

  /* --- ABOUT + PROBLEM --- */
  const about = `<section class="cs2-sec">
      <div class="cs2-grid2">
        <div class="cs2-rv"><span class="cs2-eb"><i></i>About The Project</span>
          <h2 class="cs2-h2">One Trusted Wallet. <em>One P2P Market.</em></h2></div>
        <div class="cs2-rv d1"><p class="cs2-p" style="margin-top:0">HM Trades is a mobile P2P crypto trading platform designed for the African market, most especially Nigeria.</p>
          <p class="cs2-p">I redesigned it into one place to hold, buy, sell and send crypto, with verified vendors and escrow on every trade.</p></div>
      </div>
    </section>
    <section class="cs2-sec tight hm2-prob">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>The Problem</span><h2 class="cs2-h2">P2P Was The Only Way In. <em>It Wasn't Safe.</em></h2>
      <p class="cs2-p">CBN restrictions on crypto pushed Nigerians to P2P. The platforms they found came with four problems.</p></div>
      <div class="cs2-cards">
        <div class="cs2-card cs2-rv"><span class="cs2-ic">${I.bank}</span><h4>CBN Restrictions</h4><p>Banks block crypto, so trading moves to P2P.</p></div>
        <div class="cs2-card cs2-rv d1"><span class="cs2-ic">${I.wallet}</span><h4>No Built-In Wallet</h4><p>Users keep coins in outside apps to trade.</p></div>
        <div class="cs2-card cs2-rv d2"><span class="cs2-ic">${I.shield}</span><h4>Weak Verification</h4><p>Low trust, frequent scams and fraud.</p></div>
        <div class="cs2-card cs2-rv d3"><span class="cs2-ic">${I.fee}</span><h4>Hidden Fees</h4><p>Unclear, high fees put people off trading.</p></div>
      </div>
    </section>`;

  /* --- ESCROW FLOW INTERLUDE --- */
  const flow = `<section class="cs2-band" style="background:radial-gradient(80% 120% at 50% 0%,rgba(101,76,144,.35),transparent 60%),#05050a"><div class="cs2-sec cs2-center">
      <span class="cs2-eb cs2-rv"><i></i>The Fix</span>
      <h2 class="cs2-h2 cs2-rv" style="max-width:18ch">Escrow Holds The Coins. <em>Nobody Gets Burned.</em></h2>
      <div class="hm2-flow" id="hm2-flow">
        <div class="hm2-node" data-n="0"><span class="cs2-ic">${I.user}</span><b>Buyer Pays</b><small>Bank transfer to the vendor</small></div>
        <span class="hm2-pipe" aria-hidden="true"></span>
        <div class="hm2-node" data-n="1"><span class="cs2-ic">${I.lock}</span><b>Escrow Locks</b><small>Seller's USDT is held by HM Trades</small><span class="hm2-lock">🔒 Locked</span></div>
        <span class="hm2-pipe" aria-hidden="true"></span>
        <div class="hm2-node" data-n="2"><span class="cs2-ic">${I.shield}</span><b>Coins Released</b><small>Payment confirmed, USDT lands in the wallet</small></div>
      </div>
    </div></section>`;


  /* --- BRAND BANNER 1 (v4): her board's hero look, gradient + outlined wordmark, with the wallet card and action icons --- */
  const bannerIntro = `<section class="hm3-ban hm3-ban1 cs2-rv" aria-label="HM Trades brand banner">
      <div class="hm3-ban-in">
        <div class="hm3-b1-copy">
          <div class="hm3-b1-logo">${LOGO("md")}<span>HM Trades</span></div>
          <div class="hm3-b1-word" aria-hidden="true">HM<br>TRADES</div>
          <p class="hm3-b1-tag">A FinTech P2P Trading Platform</p>
          <div class="hm3-b1-chips"><span>Buy</span><span>Sell</span><span>Send</span><span>Receive</span></div>
        </div>
        <div class="hm3-b1-art">
          <div class="hm3-wcard">
            <div class="t"><span>My Wallet</span><i>${IC.eye}</i></div>
            <div class="bal">$3,540.00</div>
            <div class="c"><span>▲ +2.09% today</span><span class="hm3-wnet">USDT · BTC · ETH · BNB</span></div>
          </div>
          <div class="hm3-wacts">${ACTS.map(([k,t])=>`<span class="hm3-ai lg a-${k}"><i>${IC[k]}</i>${t}</span>`).join("")}</div>
          <div class="hm3-b1-coins">${COINS.slice(0,3).map(([c,s,n,p,ch,up])=>`<span class="hm2-chip"><span class="hmp-ci ci-${c}">${s[0]}</span><span>${s}</span><span>${p} <small class="${up?"up":"dn"}">${ch}</small></span></span>`).join("")}</div>
        </div>
      </div>
    </section>`;

  /* --- BRAND KIT (v4, moved to the middle and expanded: logo, colours, type, icon set, components) --- */
  const KIT_ICONS = [["send","Send"],["receive","Receive"],["buy","Buy"],["sell","Sell"],["wallet","Wallet"],["p2p","P2P"],["lock","Escrow"],["shield","Verified"],["chat","Chat"],["bank","Bank"],["swap","Networks"],["user","Profile"]];
  const sty = `<section class="cs2-band hm3-kitband"><div class="cs2-sec">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>Visual Language</span><h2 class="cs2-h2">Dark, Calm, <em>Money Green</em></h2></div>
      <div class="hm3-kit">
        <div class="hm3-tile hm3-t-logo cs2-rv">${LOGO("xl")}<div class="nm">HM Trades</div><small class="lbl">Logo · App Icon</small></div>
        <div class="hm3-tile hm3-t-col cs2-rv d1"><small class="lbl">Colour</small>
          <div class="hm2-sw">
            <div class="hm2-swc" style="background:#654C90">Purple<small>#654C90</small></div>
            <div class="hm2-swc" style="background:#4A9ECC">Blue<small>#4A9ECC</small></div>
            <div class="hm2-swc" style="background:#6ACC9D;color:#06130d">Green<small>#6ACC9D</small></div>
            <div class="hm2-swc" style="background:var(--grad)">Gradient<small>Teal · Blue · Purple</small></div>
          </div></div>
        <div class="hm3-tile hm3-t-type cs2-rv"><small class="lbl">Typeface</small><div class="hm2-type"><div class="aa">Aa</div><div class="nm">Poppins</div><div class="wt"><span>Regular</span><span>Medium</span><span>SemiBold</span><span>Bold</span></div></div></div>
        <div class="hm3-tile hm3-t-ic cs2-rv d1"><small class="lbl">Icon Set</small>
          <div class="hm3-icons">${KIT_ICONS.map(([k,t])=>`<span><i>${IC[k]}</i>${t}</span>`).join("")}</div></div>
        <div class="hm3-tile hm3-t-ui cs2-rv d2"><small class="lbl">Components</small>
          <div class="hm3-ui">
            <div class="hmp-seg" style="margin:0"><button type="button" class="on" tabindex="-1">Buy</button><button type="button" tabindex="-1">Sell</button></div>
            <div class="hm3-btns"><button class="hmp-btn" type="button" tabindex="-1">Buy</button><button class="hmp-btn s" type="button" tabindex="-1">Sell</button><button class="hmp-cta" type="button" tabindex="-1">I Have Paid</button></div>
            <div class="hm3-tags"><span class="g"><i class="hm3-ii">${IC.lock}</i>Escrow Locked</span><span class="b"><i class="hm3-ii">${IC.shield}</i>Verified Vendor</span><span>0% Fee</span></div>
          </div></div>
      </div>
    </div></section>`;

  /* --- BRAND BANNER 2 (v4): quick actions, the icon set at full size --- */
  const bannerActs = `<section class="hm3-ban hm3-ban2 cs2-rv" aria-label="Buy, Sell, Send, Receive">
      <div class="hm3-ban-in">
        <div class="hm3-b2-head"><span class="cs2-eb"><i></i>Quick Actions</span><h2 class="cs2-h2">Buy, Sell, Send, Receive. <em>One Tap From Home.</em></h2></div>
        <div class="hm3-b2-row">${[["buy","Buy","From verified vendors"],["sell","Sell","To verified buyers"],["send","Send","ERC20 · BEP20 · TRC20 · Polygon"],["receive","Receive","Straight into the wallet"]].map(([k,t,d],i)=>`<div class="hm3-b2-it a-${k}" style="--i:${i}"><span class="hm3-b2-ic">${IC[k]}</span><b>${t}</b><small>${d}</small></div>`).join("")}</div>
      </div>
    </section>`;

  /* --- BRAND BANNER 3 (v4): marketing-style posters built from her own promises --- */
  const bannerPosters = `<section class="cs2-sec hm3-posters-sec">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>Brand In Use</span><h2 class="cs2-h2">Three Promises, <em>Three Posters</em></h2></div>
      <div class="hm3-posters">
        <div class="hm3-poster p1 cs2-rv">${LOGO("sm")}<div class="pw">0%<br>Fees</div><p>Shown upfront on every order.</p><div class="hm3-pv"><div class="hmp-kv"><span>Fee</span><b class="up">0%</b></div><div class="hmp-kv"><span>You receive</span><b>17.89 USDT</b></div></div></div>
        <div class="hm3-poster p2 cs2-rv d1">${LOGO("sm")}<div class="pw">Escrow<br>On Every<br>Trade</div><p>Coins stay locked until payment is confirmed.</p><div class="hm3-pv"><span class="hm3-tagl g"><i class="hm3-ii">${IC.lock}</i>Escrow Locked</span></div></div>
        <div class="hm3-poster p3 cs2-rv d2">${LOGO("sm")}<div class="pw">Verified<br>Vendors</div><p>Email, phone, ID and bank, checked.</p><div class="hm3-pv"><span class="hm3-tagl b"><i class="hm3-ii">${IC.shield}</i>164 completed orders · 95%</span></div></div>
      </div>
    </section>`;

  /* --- PROCESS --- */
  const STEPS = [["Empathise","Spoke to the people trading P2P in Nigeria and listened for where trust breaks."],["Define","Framed the core problems: no wallet, weak verification, unclear fees."],["Ideate","Mapped one app that holds the coins and runs the trade safely."],["Design","Wallet, marketplace, escrow trade, chat and vendor profiles in high fidelity."],["Test","Walked real flows to find friction before handoff."]];
  const proc = `<section class="cs2-sec">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>Design Process</span><h2 class="cs2-h2">Five Steps, <em>One Clear Flow</em></h2></div>
      <div class="hm2-proc cs2-rv" data-tabgroup data-auto="3200">
        <div class="cs2-tabs" role="tablist">${STEPS.map(([n],i)=>`<button class="cs2-tab" role="tab" data-k="s${i}">${n}</button>`).join("")}</div>
        ${STEPS.map(([n,t],i)=>`<div class="hm2-pane" data-pane="s${i}"><span class="n">0${i+1}</span><div><h4>${n}</h4><p>${t}</p></div></div>`).join("")}
      </div>
    </section>`;

  /* --- SCREENS: WALLET (tabs inside the phone) --- */
  const sendScr = `<div class="hmp"><div class="hmp-top"><span class="hmp-hi">Send USDT<small>Choose a network</small></span><span class="hmp-bell">✕</span></div>
      <div class="hmp-net">${[["ERC20","Ethereum"],["BEP20","BNB Smart Chain"],["TRC20","Tron"],["Polygon","Polygon PoS"]].map(([a,b],i)=>`<span class="${i===2?"on":""}">${a}<small>${b}</small></span>`).join("")}</div>
      <div class="hmp-addr">Recipient address<br><b style="color:#fff">TQ7x…9fK2</b></div>
      <button class="hmp-cta" type="button">Continue</button>${nav("Wallet")}</div>`;
  const coinsScr = `<div class="hmp" data-draw><div class="hmp-top"><span class="hmp-hi">Wallet<small>All your assets</small></span><span class="hmp-bell">＋</span></div>
      <div class="hmp-card" style="padding:12px"><span class="l">Total Balance</span><div class="hmp-bal" style="font-size:22px">$3,540.00</div></div>
      <div class="hmp-h">Assets <span>Manage</span></div>${COINS.map(coinRow).join("")}${nav("Wallet")}</div>`;
  const walletSec = `<section class="cs2-sec">
      <div class="hm2-show" data-tabgroup>
        <div class="cs2-rv"><span class="cs2-k">01 · Wallet</span><h3 class="cs2-h3" style="font-size:clamp(28px,3.4vw,44px)">A Wallet Built Right In</h3>
          <p class="cs2-p">Hold, receive and send coins without leaving the app. Tap through the screens.</p>
          <div class="cs2-tabs" role="tablist"><button class="cs2-tab" data-k="home">Home</button><button class="cs2-tab" data-k="assets">Assets</button><button class="cs2-tab" data-k="send">Send</button></div>
          <ul class="hm2-feat"><li>Balance, favourites and daily change at a glance</li><li>Four networks: ERC20, BEP20, TRC20 and Polygon</li><li>Send, receive, buy and sell one tap from home</li></ul></div>
        <div class="cs2-rv d1 hm3-shot">${frame(`<div data-pane="home">${walletScr()}</div><div data-pane="assets" hidden>${coinsScr}</div><div data-pane="send" hidden>${sendScr}</div>`,"Wallet")}</div>
      </div>
    </section>`;

  /* --- SCREENS: P2P MARKET (Buy / Sell toggle works) --- */
  const OFF = [["Techboo","164 orders · 95%","1,453.00","200,000 – 1,000,000"],["Ada Trades","Verified vendor","1,455.50","50,000 – 400,000"],["Kemi X","Verified vendor","1,456.00","20,000 – 250,000"]];
  const offers = (side)=>OFF.map(([v,m,p,l])=>`<div class="hmp-off"><div class="hmp-off-t"><span class="hmp-ven"><span class="hmp-av" style="width:24px;height:24px;font-size:9px">${v.slice(0,2).toUpperCase()}</span><span>${v}<span class="v">✓</span><small>${m}</small></span></span></div>
      <div class="hmp-pr">₦${p} <small>/ USDT</small></div>
      <div class="hmp-off-b"><span>Limit ₦${l}<br>Bank Transfer</span><button class="hmp-btn ${side==="sell"?"s":""}" type="button">${side==="sell"?"Sell":"Buy"}</button></div></div>`).join("");
  const market = `<div class="hmp" id="hm2-mkt"><div class="hmp-top"><span class="hmp-hi">P2P Market<small>Verified vendors only</small></span><span class="hmp-bell">⚙</span></div>
      <div class="hmp-seg"><button type="button" class="on" data-side="buy">Buy</button><button type="button" data-side="sell">Sell</button></div>
      <div class="hmp-filt"><span class="on">USDT</span><span>BTC</span><span>ETH</span><span>NGN ▾</span></div>
      <div class="hmp-offs">${offers("buy")}</div>${nav("P2P")}</div>`;
  const marketSec = `<section class="cs2-sec">
      <div class="hm2-show">
        <div class="cs2-rv hm3-shot">${frame(market,"P2P Market")}</div>
        <div class="cs2-rv d1"><span class="cs2-k">02 · Marketplace</span><h3 class="cs2-h3" style="font-size:clamp(28px,3.4vw,44px)">Every Vendor Verified</h3>
          <p class="cs2-p">Offers show the rate, limits, payment method and the vendor's track record before you tap. Flip between Buy and Sell.</p>
          <ul class="hm2-feat"><li>Verified badge, completed orders and rating on every offer</li><li>Clear limits in naira, no surprise fees</li><li>Filter by coin and currency</li></ul></div>
      </div>
    </section>`;

  /* --- SCREENS: ESCROW TRADE + CHAT --- */
  const trade = `<div class="hmp"><div class="hmp-top"><span class="hmp-hi">Buy USDT<small>Order with Techboo</small></span><span class="hmp-bell">⋯</span></div>
      <div class="hmp-timer"><small>Pay the seller within the time limit</small><b id="hm2-timer">15:00</b></div>
      <div class="hmp-ring"><i id="hm2-ring"></i></div>
      <div class="hmp-kv"><span>Price</span><b>₦1,453.00</b></div>
      <div class="hmp-kv"><span>Amount</span><b>₦26,000.00</b></div>
      <div class="hmp-kv"><span>You receive</span><b>17.89 USDT</b></div>
      <div class="hmp-kv"><span>Fee</span><b class="up">0%</b></div>
      <div class="hmp-esc"><i class="hm3-ii">${IC.lock}</i>The seller's USDT is locked in escrow until you confirm payment.</div>
      <button class="hmp-cta" type="button">I Have Paid</button></div>`;
  const chat = `<div class="hmp"><div class="hmp-top"><div style="display:flex;gap:8px;align-items:center"><span class="hmp-av">TB</span><span class="hmp-hi">Techboo<small style="color:#6ACC9D">● Online · Verified</small></span></div><span class="hmp-bell"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg></span></div>
      <div class="hmp-chat" id="hm2-chat">
        <span class="hmp-msg sys">Order created · USDT in escrow</span>
        <span class="hmp-msg them">Hi! Send to the account on the order, I'll release once it lands.</span>
        <span class="hmp-msg me">Done, just transferred ₦26,000 🙏</span>
        <span class="hmp-msg sys">Buyer marked as paid</span>
        <span class="hmp-msg them">Received. Releasing now ✅</span>
        <span class="hmp-msg sys">17.89 USDT released to your wallet</span>
      </div></div>`;
  const tradeSec = `<section class="cs2-band" style="background:radial-gradient(70% 90% at 100% 50%,rgba(74,158,204,.25),transparent 60%),#05050a"><div class="cs2-sec">
      <div class="cs2-center cs2-rv"><span class="cs2-k">03 · Escrow Trade</span><h2 class="cs2-h2" style="max-width:18ch">A Timer, A Lock, <em>A Chat</em></h2>
        <p class="cs2-p">The trade screen keeps both sides honest: a countdown to pay, coins locked in escrow, and a chat right inside the order.</p></div>
      <div class="hm3-pair cs2-rv d1">${frame(trade,"Order")}${frame(chat,"Chat")}</div>
    </div></section>`;

  /* --- SCREENS: VENDOR PROFILE --- */
  const prof = `<div class="hmp hmp-prof"><div class="av">TB</div><h5>Techboo<i>✓</i></h5><small style="color:rgba(255,255,255,.55)">Verified vendor</small>
      <div class="hmp-stats"><div class="hmp-stat"><b data-to="164">0</b><small>Completed orders</small></div><div class="hmp-stat"><b data-to="95" data-suf="%">0%</b><small>Good rating</small></div></div>
      <div class="hmp-ver"><span>Email <b>✓ Verified</b></span><span>Phone <b>✓ Verified</b></span><span>ID (KYC) <b>✓ Verified</b></span><span>Bank account <b>✓ Verified</b></span></div>${nav("Profile")}</div>`;
  const profSec = `<section class="cs2-sec">
      <div class="hm2-show">
        <div class="cs2-rv"><span class="cs2-k">04 · Trust</span><h3 class="cs2-h3" style="font-size:clamp(28px,3.4vw,44px)">Know Who You're Trading With</h3>
          <p class="cs2-p">Public vendor profiles turn trust into something you can see: orders completed, rating and every verification step.</p></div>
        <div class="cs2-rv d1 hm3-shot">${frame(prof,"Vendor Profile")}</div>
      </div>
    </section>`;

  /* --- COMPARE --- */
  const ROWS = [["Built-in wallet",1,0],["Verified vendors (KYC)",1,0],["Escrow on every trade",1,0],["In-order chat",1,1],["Clear fees",1,0],["Multiple networks",1,0]];
  const cmp = `<section class="cs2-sec">
      <div class="cs2-rv"><span class="cs2-eb"><i></i>Side By Side</span><h2 class="cs2-h2">HM Trades Vs <em>The Usual P2P App</em></h2></div>
      <div class="hm2-cmp" data-draw>
        <div class="hm2-cr h"><span>Feature</span><span class="hm">HM Trades</span><span>Typical P2P</span></div>
        ${ROWS.map(([f,a,b])=>`<div class="hm2-cr"><span>${f}</span><span class="hm ${a?"ok":"no"}">${a?"Yes":"No"}</span><span class="${b?"ok":"no"}">${b?"Yes":"No"}</span></div>`).join("")}
      </div>
    </section>`;

  /* --- OUTCOME + ORIGINALS --- */
  const out = `<section class="cs2-sec cs2-center">
      <span class="cs2-eb cs2-rv"><i></i>The Outcome</span>
      <h2 class="cs2-h2 cs2-rv" style="max-width:20ch">P2P That Feels <em>Safe Enough To Use</em></h2>
      <p class="cs2-p cs2-rv">One app to hold, trade and send crypto, where every vendor is verified and every trade sits in escrow.</p>
      <div class="hm2-out cs2-rv"><span>Wallet + P2P in one</span><span>Escrow on every trade</span><span>0% fees shown upfront</span><span>Verified vendors</span></div>
      <div class="cs2-orig cs2-rv" style="width:100%;text-align:left">
        <figure><img src="${A}img01-01.webp" alt="HM Trades original board: overview" loading="lazy" decoding="async" data-lb="case" data-cap="HM Trades · Original board"><figcaption>Original Board · Overview</figcaption></figure>
        <figure><img src="${A}img01-06.webp" alt="HM Trades original board: app screens" loading="lazy" decoding="async" data-lb="case" data-cap="HM Trades · Original board"><figcaption>Original Board · App Screens</figcaption></figure>
      </div>
    </section>`;

  gal.innerHTML = `<div class="cs2 hm2 hm3">${hero}${ticker}${about}${bannerIntro}${flow}${sty}${proc}${walletSec}${marketSec}${bannerActs}${tradeSec}${profSec}${bannerPosters}${cmp}${out}</div>`;
  const root = gal.firstElementChild;
  reveal(root); tabs(root);

  /* Buy / Sell toggle */
  const mkt = root.querySelector("#hm2-mkt");
  if(mkt) mkt.querySelectorAll(".hmp-seg button").forEach(b=>b.addEventListener("click", ()=>{
    mkt.querySelectorAll(".hmp-seg button").forEach(x=>x.classList.remove("on","s"));
    b.classList.add("on"); if(b.dataset.side==="sell") b.classList.add("s");
    mkt.querySelector(".hmp-offs").innerHTML = offers(b.dataset.side);
  }));
  /* network picker */
  root.querySelectorAll(".hmp-net span").forEach(s=>s.addEventListener("click", ()=>{ s.parentNode.querySelectorAll("span").forEach(x=>x.classList.remove("on")); s.classList.add("on"); }));
  /* escrow flow: step highlight loops */
  const fl = root.querySelector("#hm2-flow");
  onView(fl, ()=>{ const ns = fl.querySelectorAll(".hm2-node"); let i=0; const go=()=>{ ns.forEach((n,j)=>n.classList.toggle("on", j===i)); i=(i+1)%ns.length; }; go(); if(!RM) setInterval(go, 1500); else ns.forEach(n=>n.classList.add("on")); });
  /* trade timer counts down from 15:00, loops */
  const tm = root.querySelector("#hm2-timer"), rg = root.querySelector("#hm2-ring");
  onView(tm, ()=>{ if(RM) return; let s = 900; setInterval(()=>{ s = s<=0 ? 900 : s-1; tm.textContent = String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); rg.style.width = (s/900*100)+"%"; }, 1000); });
  /* chat messages arrive one by one */
  const ch = root.querySelector("#hm2-chat");
  onView(ch, ()=>{ const ms = [...ch.querySelectorAll(".hmp-msg")]; if(RM){ ms.forEach(m=>m.classList.add("show")); return; }
    const run = ()=>{ ms.forEach(m=>m.classList.remove("show")); ms.forEach((m,i)=>setTimeout(()=>m.classList.add("show"), 400+i*900)); };
    run(); setInterval(run, ms.length*900+3000); });

  /* ending: Trade Completed / Escrow Released (her 8:55 PM word: no receipts outside Invora) */
  mountEnding({cls:"cs2 hm2", a:"#6ACC9D", b:"#654C90", bg:"#05050a", card:`<div class="hm2-done">
      <div class="hm2-done-ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <h3>Trade Completed</h3>
      <div class="hm2-st"><span>🔓 Escrow Released</span></div>
      <div class="hmp-kv"><span>Designed By</span><b>Adaikem Ajufo</b></div>
      <div class="hmp-kv"><span>Role</span><b>UI/UX</b></div>
      <div class="hmp-kv"><span>Project</span><b>HM Trades</b></div>
      <div class="hmp-kv"><span>Your Time</span><b class="up">Well Spent</b></div>
      <p class="bye">Thanks for trading a few minutes with me. See you on the next one.</p>
    </div>`});
})();
