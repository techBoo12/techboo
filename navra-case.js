/* Navra case study: a new fintech dashboard project, designed and coded live (Oct 20 2026, her words "ok do the fintech dashboard").
   Loaded only by case/navra.html after case.js. Every visual is code (HTML, CSS, SVG). Navra is a made up product; all figures are sample data and add up. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal) return;
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = (v)=>"₦"+Math.round(v).toLocaleString("en-NG");
  const NS = (v)=>(v<0?"−":"+")+N(Math.abs(v));
  const M = (v)=>"₦"+(v/1e6).toFixed(v>=1e7?1:2).replace(/\.0+$/,"")+"M";

  /* ---------- sample data (October 2026, Lumen Foods Ltd, Lagos) ---------- */
  const MONTHS = ["Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"];
  const INC = [11.2,12.8,10.4,13.1,14.0,13.6,15.2,14.8,16.1,15.7,16.39,18.42].map(v=>v*1e6);
  const EXP = [9.1,10.6,9.8,10.2,10.9,11.4,11.0,12.1,11.6,11.9,11.44,11.0865].map(v=>v*1e6);
  const KPI = [
    {k:"bal", t:"Total Balance", v:48250400, d:"+8.2%", up:true, ic:"wallet"},
    {k:"inc", t:"Income", v:18420000, d:"+12.4%", up:true, ic:"in"},
    {k:"exp", t:"Expenses", v:11086500, d:"−3.1%", up:true, ic:"out"},
    {k:"net", t:"Net Cash Flow", v:7333500, d:"+21.7%", up:true, ic:"flow"}
  ];
  const CATS = [
    {n:"Payroll", v:4850000, b:5000000, c:"var(--c1)"},
    {n:"Rent & Utilities", v:1920000, b:2000000, c:"var(--c2)"},
    {n:"Marketing", v:1680000, b:2000000, c:"var(--c3)"},
    {n:"Logistics", v:1400000, b:1500000, c:"var(--c4)"},
    {n:"Software", v:1236500, b:1000000, c:"var(--c5)"}
  ];
  const SPEND = CATS.reduce((a,c)=>a+c.v,0); /* 11,086,500 */
  const TX = [
    ["Oct 20","Paystack Payout","Income","Settlement",1240000,"Completed"],
    ["Oct 20","Figma","Software","Card •• 4821",-72000,"Completed"],
    ["Oct 19","Chowdeck Orders","Income","Transfer",386500,"Completed"],
    ["Oct 19","GIG Logistics","Logistics","Transfer",-214000,"Pending"],
    ["Oct 18","Ikeja Electric","Rent & Utilities","Card •• 4821",-96400,"Completed"],
    ["Oct 18","Shoprite Supply Contract","Income","Transfer",2750000,"Completed"],
    ["Oct 17","Meta Ads","Marketing","Card •• 9033",-420000,"Completed"],
    ["Oct 16","October Payroll","Payroll","Bulk Transfer",-4850000,"Completed"],
    ["Oct 15","Google Workspace","Software","Card •• 9033",-58800,"Completed"],
    ["Oct 14","Bolt Food Payout","Income","Settlement",918200,"Completed"],
    ["Oct 13","Lekki Office Rent","Rent & Utilities","Transfer",-1650000,"Completed"],
    ["Oct 12","Jumia Vendor Payout","Income","Settlement",1104000,"Pending"],
    ["Oct 11","AWS","Software","Card •• 4821",-310500,"Failed"],
    ["Oct 10","Kwik Delivery","Logistics","Transfer",-182000,"Completed"]
  ].map(([d,p,c,m,a,s],i)=>({i,d,p,c,m,a,s}));
  const CARDS = [
    {id:"4821", name:"Virtual Card", kind:"virtual", limit:500000},
    {id:"9033", name:"Physical Card", kind:"physical", limit:1000000}
  ];
  CARDS.forEach(c=>{ c.tx = TX.filter(t=>t.m.endsWith(c.id)); c.spent = c.tx.filter(t=>t.s!=="Failed").reduce((a,t)=>a-t.a,0); });

  /* ---------- icons ---------- */
  const IC = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
    card:'<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19M6.5 15h4"/>',
    chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    wallet:'<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 10h-5a2 2 0 0 0 0 4h5z"/>',
    in:'<path d="M17 7L7 17M7 9v8h8"/>', out:'<path d="M7 17L17 7M9 7h8v8"/>',
    flow:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    bell:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    snow:'<path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    x:'<path d="M18 6L6 18M6 6l12 12"/>', heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>', bulb:'<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'
  };
  const svg = (k,s=18)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
  let lgN = 0;
  const mkLogo = ()=>{ const id = "nvg"+(++lgN); return `<span class="nv-logo" aria-hidden="true"><svg viewBox="0 0 32 32" width="30" height="30"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B6CFF"/><stop offset="1" stop-color="#4FD8B5"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#${id})"/><path d="M9 22V10l14 12V10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`; };
  const stat = (s)=>`<span class="nv-st ${s.toLowerCase()}">${s}</span>`;
  const catDot = (c)=>{ const x = CATS.find(k=>k.n===c); return `<i class="nv-cd" style="background:${x?x.c:"var(--pos)"}"></i>`; };

  /* ---------- views ---------- */
  const kpiCard = (k)=>`<div class="nv-kpi" data-k="${k.k}"><div class="nv-kpi-top"><span class="nv-kpi-ic ${k.k}">${svg(k.ic,16)}</span><span>${k.t}</span></div><b data-count="${k.v}">${N(k.v)}</b><small class="${k.up?"up":"dn"}">${k.d} <em>vs Sep</em></small></div>`;
  const txRow = (t)=>`<div class="nv-tr" data-type="${t.a>0?"income":"expense"}" data-status="${t.s.toLowerCase()}" data-q="${esc((t.p+" "+t.c+" "+t.m).toLowerCase())}"><span class="nv-tr-p"><span class="nv-av ${t.a>0?"in":"out"}">${svg(t.a>0?"in":"out",14)}</span><span><b>${esc(t.p)}</b><small>${t.d} · ${esc(t.m)}</small></span></span><span class="nv-tr-c">${catDot(t.a>0?"":t.c)}${esc(t.c)}</span><span class="nv-tr-s">${stat(t.s)}</span><span class="nv-tr-a ${t.a>0?"pos":""}">${NS(t.a)}</span></div>`;
  const vOverview = `
    <div class="nv-kpis">${KPI.map(kpiCard).join("")}</div>
    <div class="nv-row2">
      <section class="nv-panel nv-cash"><header><div><h4>Cash Flow</h4><small>Last 12 months</small></div><div class="nv-legend"><span><i style="background:var(--acc)"></i>Income</span><span><i style="background:var(--neg)"></i>Expenses</span></div></header><div class="nv-line" data-chart="line"></div></section>
      <section class="nv-panel nv-spend"><header><div><h4>Spend By Category</h4><small>October</small></div></header><div class="nv-donut-wrap"><div class="nv-donut" data-chart="donut"></div><ul class="nv-dl">${CATS.map((c,i)=>`<li data-i="${i}"><i style="background:${c.c}"></i><span>${c.n}</span><b>${(c.v/SPEND*100).toFixed(1)}%</b></li>`).join("")}</ul></div></section>
    </div>
    <section class="nv-panel nv-recent"><header><div><h4>Recent Transactions</h4><small>Today and yesterday</small></div><button class="nv-link" type="button" data-go="tx">View All</button></header><div class="nv-tbl">${TX.slice(0,5).map(txRow).join("")}</div></section>`;
  const vTx = `
    <section class="nv-panel nv-txp">
      <div class="nv-tools"><label class="nv-search">${svg("search",16)}<input type="search" placeholder="Search transactions" aria-label="Search transactions" data-search></label>
      <div class="nv-chips" role="tablist">${["All","Income","Expenses","Pending"].map((c,i)=>`<button type="button" class="${i?"":"on"}" data-f="${c.toLowerCase()}">${c}</button>`).join("")}</div></div>
      <div class="nv-tbl nv-tbl-full"><div class="nv-th"><span>Transaction</span><span>Category</span><span>Status</span><span>Amount</span></div>${TX.map(txRow).join("")}<div class="nv-empty" hidden>No transactions match that search.</div></div>
      <footer class="nv-count" data-count-out>Showing 14 of 14</footer>
    </section>`;
  const cardFace = (c)=>`<button type="button" class="nv-cardf ${c.kind}" data-card="${c.id}" aria-label="${c.name} ending ${c.id}"><span class="nv-cardf-top">${mkLogo()}<span>Navra Business</span><em>${c.name}</em></span><span class="nv-chip-ic"></span><span class="nv-cardf-no">•••• •••• •••• ${c.id}</span><span class="nv-cardf-bot"><span>Lumen Foods Ltd</span><span>09/29</span></span><span class="nv-frozen">${svg("snow",14)} Frozen</span></button>`;
  const vCards = `
    <div class="nv-cards-row">
      <div class="nv-cardstack">${CARDS.map(cardFace).join("")}</div>
      <section class="nv-panel nv-carddet" data-det>
        <header><div><h4 data-cname>Virtual Card •• 4821</h4><small>Monthly limit</small></div><label class="nv-switch"><input type="checkbox" data-freeze><span></span>Freeze</label></header>
        <div class="nv-lim"><div class="nv-lim-n"><b data-cspent>₦0</b><span data-climit>of ₦500,000</span></div><div class="nv-bar"><i data-cbar></i></div></div>
        <h5>Card Activity</h5><div class="nv-tbl" data-ctx></div>
      </section>
    </div>`;
  const avgInc = INC.reduce((a,b)=>a+b,0)/12;
  const vAn = `
    <div class="nv-kpis three">
      <div class="nv-kpi"><div class="nv-kpi-top"><span class="nv-kpi-ic inc">${svg("chart",16)}</span><span>Avg Monthly Income</span></div><b data-count="${Math.round(avgInc)}">${N(avgInc)}</b><small class="up">12 month average</small></div>
      <div class="nv-kpi"><div class="nv-kpi-top"><span class="nv-kpi-ic net">${svg("flow",16)}</span><span>Savings Rate</span></div><b data-count="39.8" data-suffix="%" data-dec="1">39.8%</b><small class="up">Net cash flow ÷ income, Oct</small></div>
      <div class="nv-kpi"><div class="nv-kpi-top"><span class="nv-kpi-ic exp">${svg("wallet",16)}</span><span>Top Category</span></div><b>Payroll</b><small>43.7% of spend</small></div>
    </div>
    <div class="nv-row2 an">
      <section class="nv-panel"><header><div><h4>Income By Month</h4><small>Nov 2025 to Oct 2026</small></div></header><div class="nv-bars" data-chart="bars"></div></section>
      <section class="nv-panel"><header><div><h4>Budget Vs Actual</h4><small>October</small></div></header><div class="nv-budget">${CATS.map(c=>{ const p = c.v/c.b*100; return `<div class="nv-bud ${p>100?"over":""}"><div><span>${c.n}</span><b>${N(c.v)} <em>/ ${M(c.b)}</em></b></div><div class="nv-bar"><i style="--w:${Math.min(p,100).toFixed(1)}%;--c:${p>100?"var(--neg)":c.c}"></i></div><small>${p>100?`${(p-100).toFixed(0)}% over budget`:`${p.toFixed(0)}% used`}</small></div>`; }).join("")}</div></section>
    </div>`;
  const NAV = [["ov","Overview","grid"],["tx","Transactions","list"],["cd","Cards","card"],["an","Analytics","chart"]];
  const TITLES = {ov:["Good Morning, Ada","Here is how Lumen Foods is doing this month."],tx:["Transactions","Every naira in and out, searchable."],cd:["Cards","Limits, activity and a freeze switch."],an:["Analytics","Trends and budgets at a glance."]};
  const app = `
  <div class="nv-app" data-theme="light" data-view="ov">
    <aside class="nv-side">
      <div class="nv-brand">${mkLogo()}<b>Navra</b></div>
      <nav class="nv-nav" aria-label="Dashboard views">${NAV.map(([k,t,i],j)=>`<button type="button" data-v="${k}" class="${j?"":"on"}">${svg(i)}<span>${t}</span></button>`).join("")}<span class="nv-nav-ind" aria-hidden="true"></span></nav>
      <div class="nv-side-bot"><button type="button" class="nv-theme" data-theme-t aria-label="Switch light or dark">${svg("sun",16)}${svg("moon",16)}<span>Dark Mode</span></button>
      <div class="nv-me"><span class="nv-me-av">AO</span><span><b>Ada Okafor</b><small>Lumen Foods Ltd</small></span></div></div>
    </aside>
    <div class="nv-main">
      <header class="nv-top"><div class="nv-top-l"><span class="nv-mlogo">${mkLogo()}</span><div><h3 data-title>${TITLES.ov[0]}</h3><p data-sub>${TITLES.ov[1]}</p></div></div>
      <div class="nv-top-r"><span class="nv-pill">${svg("cal",15)}Oct 2026</span><button type="button" class="nv-ib nv-theme-m" data-theme-t aria-label="Switch light or dark">${svg("sun",16)}${svg("moon",16)}</button><span class="nv-ib nv-bell">${svg("bell",16)}<i></i></span></div></header>
      <div class="nv-views">
        <div class="nv-view on" data-view-p="ov">${vOverview}</div>
        <div class="nv-view" data-view-p="tx">${vTx}</div>
        <div class="nv-view" data-view-p="cd">${vCards}</div>
        <div class="nv-view" data-view-p="an">${vAn}</div>
      </div>
    </div>
    <nav class="nv-tabbar" aria-label="Dashboard views">${NAV.map(([k,t,i],j)=>`<button type="button" data-v="${k}" class="${j?"":"on"}">${svg(i,19)}<span>${t}</span></button>`).join("")}</nav>
  </div>`;

  /* ---------- interlude: transactions stream in, the balance ticks ---------- */
  const chips = TX.slice(0,10).map(t=>`<span class="nv-mq-chip ${t.a>0?"in":"out"}"><i>${svg(t.a>0?"in":"out",12)}</i>${esc(t.p)}<b>${NS(t.a)}</b></span>`).join("");
  const spark = (()=>{ const net = INC.map((v,i)=>v-EXP[i]); let run = 0; const pts = net.map(v=>run+=v); const mx = Math.max(...pts), mn = Math.min(...pts); return pts.map((v,i)=>`${(i/11*280).toFixed(1)},${(70-(v-mn)/(mx-mn)*60).toFixed(1)}`).join(" "); })();

  gal.innerHTML = `
  <section class="nv-inter" id="nv-inter" aria-label="Transactions flow into one balance">
    <div class="nv-mq" aria-hidden="true"><div class="nv-mq-in">${chips}${chips}</div></div>
    <div class="nv-mq r" aria-hidden="true"><div class="nv-mq-in">${chips}${chips}</div></div>
    <div class="nv-bal">
      <div class="nv-bal-top">${mkLogo()}<span>Total Balance</span></div>
      <b class="nv-bal-n" data-tick="48250400">₦48,250,400</b>
      <svg class="nv-spark" viewBox="0 0 280 74" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="nvsp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8B6CFF" stop-opacity=".45"/><stop offset="1" stop-color="#8B6CFF" stop-opacity="0"/></linearGradient></defs><polygon points="0,74 ${spark} 280,74" fill="url(#nvsp)"/><polyline points="${spark}" fill="none" stroke="#B9A6FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>
      <small><span class="up">+8.2%</span> this month</small>
    </div>
  </section>
  <section class="nv-sec nv-intro rv">
    <h2 class="nv-h2">Money, <em>Made Readable</em></h2>
    <p class="nv-lead">A finance dashboard for small businesses. Built live, so everything below is clickable.</p>
  </section>
  <section class="nv-sec nv-hero rv" id="nv-hero">
    <div class="nv-seg" role="tablist" aria-label="Preview size"><button type="button" class="on" data-mode="d">Desktop</button><button type="button" data-mode="m">Mobile</button></div>
    <div class="nv-win" data-mode="d"><div class="nv-win-bar"><i></i><i></i><i></i><span>app.navra.finance/overview</span></div><div class="nv-stage"><div class="nv-scale">${app}</div></div></div>
    <p class="nv-hint"><span></span>Live: switch views, search, filter, freeze a card, flip to dark.</p>
  </section>
  <section class="nv-sec nv-mk" id="nv-mk">
    <h2 class="nv-h3 rv">Mockups</h2>
    <figure class="nv-mk-card nv-mk-hero rv"><img src="../assets/cases/navra/mk_laptop.webp" width="2000" height="1250" alt="Navra dashboard on a laptop" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Laptop"></figure>
    <div class="nv-mk-2">
      <figure class="nv-mk-card rv"><img src="../assets/cases/navra/mk_tilt.webp" width="2000" height="1250" alt="Navra screens in perspective" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Perspective"></figure>
      <figure class="nv-mk-card rv"><img src="../assets/cases/navra/mk_phones.webp" width="1600" height="1257" alt="Navra mobile, light and dark" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Mobile"></figure>
    </div>
    <h3 class="nv-mk-h rv">Key Screens</h3>
    <div class="nv-mk-grid rv"><figure class="nv-frame"><div class="nv-fbar"><i></i><i></i><i></i><span>app.navra.finance/overview</span></div><img src="../assets/cases/navra/scr_ov.webp" width="1600" height="925" alt="Navra Overview" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Overview"><figcaption>Overview</figcaption></figure><figure class="nv-frame"><div class="nv-fbar"><i></i><i></i><i></i><span>app.navra.finance/transactions</span></div><img src="../assets/cases/navra/scr_tx.webp" width="1600" height="925" alt="Navra Transactions" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Transactions"><figcaption>Transactions</figcaption></figure><figure class="nv-frame"><div class="nv-fbar"><i></i><i></i><i></i><span>app.navra.finance/cards</span></div><img src="../assets/cases/navra/scr_cd.webp" width="1600" height="925" alt="Navra Cards" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Cards"><figcaption>Cards</figcaption></figure><figure class="nv-frame"><div class="nv-fbar"><i></i><i></i><i></i><span>app.navra.finance/analytics</span></div><img src="../assets/cases/navra/scr_an.webp" width="1600" height="925" alt="Navra Analytics" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Analytics"><figcaption>Analytics</figcaption></figure></div>
    <h3 class="nv-mk-h rv">Light Mode Vs Dark Mode</h3>
    <div class="nv-mk-ld rv"><figure class="nv-frame"><div class="nv-fbar"><i></i><i></i><i></i><span>app.navra.finance/overview</span></div><img src="../assets/cases/navra/scr_ov.webp" width="1600" height="925" alt="Navra Light Mode" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Light Mode"><figcaption>Light Mode</figcaption></figure><figure class="nv-frame"><div class="nv-fbar"><i></i><i></i><i></i><span>app.navra.finance/overview</span></div><img src="../assets/cases/navra/scr_ov_dark.webp" width="1600" height="925" alt="Navra Dark Mode" loading="lazy" decoding="async" data-lb="case" data-cap="Navra · Dark Mode"><figcaption>Dark Mode</figcaption></figure></div>
  </section>
  <section class="nv-sec nv-psg rv">
    ${[["heart","The Problem","Owners juggle bank apps, payout dashboards and spreadsheets just to know if they made money this month."],["bulb","The Solution","One screen for balance, cash flow, cards and spend, with a table you can actually search."],["target","The Goal","Answer three questions at a glance: what came in, where it went, what is left."]].map(([i,h,p],j)=>`<article class="nv-psg-i"><span class="nv-num"><b>0${j+1}</b></span><h3>${h}</h3><p>${p}</p></article>`).join("")}
  </section>
  <!-- CLOSE (her 8:55 PM ask): Thanks For Scrolling as a Payment Successful transfer card, not a receipt (only Invora gets a receipt) -->
  <section class="nv-sec" id="nv-thanks">
    <div class="nv-ty">
      <h2 class="nv-ty-h">Thanks For <span>Scrolling</span></h2>
      <div class="nv-pay">
        <div class="nv-pay-ok" aria-hidden="true"><svg viewBox="0 0 52 52" width="60" height="60"><circle cx="26" cy="26" r="23" pathLength="1"/><path d="M15 27l7.5 7.5L37 19" pathLength="1"/></svg></div>
        <b class="nv-pay-t">Payment Successful</b>
        <small class="nv-pay-s">Your time, sent in full</small>
        <div class="nv-pay-rows">
          <div><span>Designed By</span><b>Adaikem Ajufo</b></div>
          <div><span>Role</span><b>Product Designer</b></div>
          <div><span>Status</span><b><em>Completed</em></b></div>
        </div>
        <div class="nv-pay-sign">Thank You</div>
      </div>
      <div class="nv-ty-act">
        <a class="nv-ty-btn" href="../ui-ux-designs"><span aria-hidden="true">←</span> Back To Projects</a>
        <button class="nv-ty-btn ghost" type="button" data-nv-top>Back To Top <span aria-hidden="true">↑</span></button>
      </div>
    </div>
  </section>`;

  /* ---------- the generic Thanks For Scrolling receipt (case.js) in Navra colours; no next-project card ---------- */
  const thx = gal.querySelector("#nv-thanks");
  gal.querySelector("[data-nv-top]").addEventListener("click", ()=>scrollTo({top:0, behavior: reduce ? "auto" : "smooth"}));
  const ty = null;
  if(ty){ Object.entries({"--ty-a":"#B9A6FF","--ty-b":"#4FD8B5","--ty-c":"#8B6CFF","--ty-bg":"#0b0a18","--ty-font":'"Plus Jakarta Sans","Manrope",sans-serif',"--ty-head":'"Plus Jakarta Sans","Manrope",sans-serif',"--ty-ink":"#fff"}).forEach(([k,v])=>ty.style.setProperty(k,v)); }

  /* ---------- behaviour ---------- */
  const root = gal.querySelector(".nv-app");
  const $ = (s,el=root)=>el.querySelector(s), $$ = (s,el=root)=>[...el.querySelectorAll(s)];
  const ease = (t)=>1-Math.pow(1-t,3);
  const countUp = (el, dur=1300)=>{
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec||0), suf = el.dataset.suffix||"";
    const fmt = (v)=> suf ? v.toFixed(dec)+suf : N(v);
    if(reduce){ el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const step = (now)=>{ const p = Math.min(1,(now-t0)/dur); el.textContent = fmt(to*ease(p)); if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };

  /* line chart */
  const lineBox = $('[data-chart="line"]');
  const W = 640, H = 230, PL = 44, PR = 10, PT = 14, PB = 28;
  const maxY = 20e6;
  const X = (i)=>PL + i*(W-PL-PR)/11, Y = (v)=>PT + (1-v/maxY)*(H-PT-PB);
  const smoothPath = (arr)=>arr.map((v,i)=>{ if(!i) return `M${X(0)},${Y(v)}`; const x0 = X(i-1), x1 = X(i), cx = (x0+x1)/2; return `C${cx},${Y(arr[i-1])} ${cx},${Y(v)} ${x1},${Y(v)}`; }).join(" ");
  lineBox.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Income and expenses, last 12 months">
    <defs><linearGradient id="nvar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--acc)" stop-opacity=".28"/><stop offset="1" stop-color="var(--acc)" stop-opacity="0"/></linearGradient></defs>
    ${[0,5,10,15,20].map(v=>`<line x1="${PL}" x2="${W-PR}" y1="${Y(v*1e6)}" y2="${Y(v*1e6)}" class="nv-grid"/><text x="${PL-8}" y="${Y(v*1e6)+4}" text-anchor="end" class="nv-ax">${v?"₦"+v+"M":"0"}</text>`).join("")}
    ${MONTHS.map((m,i)=>`<text x="${X(i)}" y="${H-8}" text-anchor="middle" class="nv-ax">${m}</text>`).join("")}
    <path class="nv-area" d="${smoothPath(INC)} L${X(11)},${Y(0)} L${X(0)},${Y(0)} Z" fill="url(#nvar)"/>
    <path class="nv-ln inc" d="${smoothPath(INC)}" pathLength="1"/>
    <path class="nv-ln exp" d="${smoothPath(EXP)}" pathLength="1"/>
    <line class="nv-guide" x1="0" x2="0" y1="${PT}" y2="${H-PB}"/>
    <circle class="nv-dot inc" r="5"/><circle class="nv-dot exp" r="5"/>
    ${MONTHS.map((m,i)=>`<rect class="nv-hit" data-i="${i}" x="${X(i)-(W-PL-PR)/22}" y="0" width="${(W-PL-PR)/11}" height="${H}"/>`).join("")}
  </svg><div class="nv-tip" hidden></div>`;
  const lsvg = $("svg", lineBox), tip = $(".nv-tip", lineBox), guide = $(".nv-guide", lineBox), dI = $(".nv-dot.inc", lineBox), dE = $(".nv-dot.exp", lineBox);
  const showTip = (i)=>{
    const year = i<2 ? 2025 : 2026;
    guide.setAttribute("x1",X(i)); guide.setAttribute("x2",X(i)); dI.setAttribute("cx",X(i)); dI.setAttribute("cy",Y(INC[i])); dE.setAttribute("cx",X(i)); dE.setAttribute("cy",Y(EXP[i]));
    lineBox.classList.add("hov");
    tip.hidden = false;
    tip.innerHTML = `<b>${MONTHS[i]} ${year}</b><span><i style="background:var(--acc)"></i>Income <em>${N(INC[i])}</em></span><span><i style="background:var(--neg)"></i>Expenses <em>${N(EXP[i])}</em></span>`;
    const r = {width: lsvg.clientWidth || lsvg.getBoundingClientRect().width, height: lsvg.clientHeight || 230}, px = X(i)/W*r.width, py = Y(INC[i])/H*r.height;
    tip.style.left = Math.max(4, Math.min(r.width - tip.offsetWidth - 4, px - tip.offsetWidth/2)) + "px";
    tip.style.top = Math.max(0, py - tip.offsetHeight - 14) + "px";
  };
  $$(".nv-hit", lineBox).forEach(h=>{ h.addEventListener("mouseenter",()=>showTip(+h.dataset.i)); h.addEventListener("click",()=>showTip(+h.dataset.i)); });
  lsvg.addEventListener("mouseleave",()=>{ lineBox.classList.remove("hov"); tip.hidden = true; });

  /* donut */
  const donut = $('[data-chart="donut"]');
  const R = 52, CIRC = 2*Math.PI*R; let acc = 0;
  donut.innerHTML = `<svg viewBox="0 0 140 140" role="img" aria-label="Spend by category"><circle cx="70" cy="70" r="${R}" class="nv-dtrack"/>${CATS.map((c,i)=>{ const len = c.v/SPEND*CIRC; const seg = `<circle class="nv-seg" data-i="${i}" cx="70" cy="70" r="${R}" stroke="${c.c}" stroke-dasharray="${Math.max(0,len-2.5)} ${CIRC}" stroke-dashoffset="${-acc}" style="--len:${len}"/>`; acc += len; return seg; }).join("")}</svg><div class="nv-dc"><small data-dl>Total Spend</small><b data-dv>${M(SPEND)}</b></div>`;
  const dl = $("[data-dl]",donut), dv = $("[data-dv]",donut);
  const hiSeg = (i)=>{ $$(".nv-seg",donut).forEach(s=>s.classList.toggle("dim", i!==null && +s.dataset.i!==i)); $$(".nv-dl li").forEach(l=>l.classList.toggle("on", +l.dataset.i===i)); if(i===null){ dl.textContent="Total Spend"; dv.textContent=M(SPEND); } else { dl.textContent=CATS[i].n; dv.textContent=M(CATS[i].v); } };
  $$(".nv-seg",donut).concat($$(".nv-dl li")).forEach(el=>{ el.addEventListener("mouseenter",()=>hiSeg(+el.dataset.i)); el.addEventListener("mouseleave",()=>hiSeg(null)); });

  /* income bars */
  const bars = $('[data-chart="bars"]');
  bars.innerHTML = `<div class="nv-bars-in">${INC.map((v,i)=>`<div class="nv-b ${i===11?"now":""}" style="--h:${(v/maxY*100).toFixed(1)}%;--d:${i*45}ms"><span class="nv-b-v">${M(v)}</span><i></i><small>${MONTHS[i]}</small></div>`).join("")}</div>`;

  /* transactions: search + filter */
  const search = $("[data-search]"), rowsT = $$(".nv-tbl-full .nv-tr"), out = $("[data-count-out]"), empty = $(".nv-empty");
  let filt = "all";
  const applyF = ()=>{
    const q = search.value.trim().toLowerCase(); let n = 0;
    rowsT.forEach(r=>{ const okF = filt==="all" || (filt==="income" && r.dataset.type==="income") || (filt==="expenses" && r.dataset.type==="expense") || (filt==="pending" && r.dataset.status==="pending"); const ok = okF && (!q || r.dataset.q.includes(q)); r.hidden = !ok; if(ok) n++; });
    out.textContent = `Showing ${n} of ${rowsT.length}`; empty.hidden = n>0;
  };
  search.addEventListener("input", applyF);
  $$(".nv-chips button").forEach(b=>b.addEventListener("click",()=>{ $$(".nv-chips button").forEach(x=>x.classList.toggle("on",x===b)); filt = b.dataset.f; applyF(); }));

  /* cards */
  const frozen = {};
  const selCard = (id)=>{
    const c = CARDS.find(x=>x.id===id);
    $$(".nv-cardf").forEach(f=>f.classList.toggle("sel", f.dataset.card===id));
    $("[data-cname]").textContent = `${c.name} •• ${c.id}`;
    $("[data-cspent]").textContent = N(c.spent); $("[data-climit]").textContent = `of ${N(c.limit)} spent`;
    const bar = $("[data-cbar]"); bar.style.width = "0%"; requestAnimationFrame(()=>requestAnimationFrame(()=>{ bar.style.width = (c.spent/c.limit*100).toFixed(1)+"%"; }));
    $("[data-ctx]").innerHTML = c.tx.map(txRow).join("");
    $("[data-freeze]").checked = !!frozen[id]; root.dataset.card = id;
  };
  $$(".nv-cardf").forEach(f=>f.addEventListener("click",()=>selCard(f.dataset.card)));
  $("[data-freeze]").addEventListener("change",(e)=>{ const id = root.dataset.card; frozen[id] = e.target.checked; $(`.nv-cardf[data-card="${id}"]`).classList.toggle("frz", e.target.checked); });
  selCard("4821");

  /* view switching */
  const ind = $(".nv-nav-ind");
  const moveInd = ()=>{ const on = $(".nv-nav button.on"); if(on && ind){ ind.style.transform = `translateY(${on.offsetTop}px)`; ind.style.height = on.offsetHeight+"px"; } };
  const play = (v)=>{
    const p = $(`[data-view-p="${v}"]`);
    p.classList.remove("go"); void p.offsetWidth; p.classList.add("go");
    $$("[data-count]", p).forEach(el=>countUp(el));
    if(v==="cd") selCard(root.dataset.card||"4821");
  };
  const setView = (v)=>{
    root.dataset.view = v;
    $$("[data-v]").forEach(b=>b.classList.toggle("on", b.dataset.v===v));
    $$(".nv-view").forEach(p=>p.classList.toggle("on", p.dataset.viewP===v));
    $("[data-title]").textContent = TITLES[v][0]; $("[data-sub]").textContent = TITLES[v][1];
    $(".nv-views").scrollTop = 0;
    const ub = gal.querySelector(".nv-win-bar span"); if(ub) ub.textContent = "app.navra.finance/" + ({ov:"overview",tx:"transactions",cd:"cards",an:"analytics"})[v];
    moveInd(); play(v);
  };
  $$("[data-v]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.v)));
  $$("[data-go]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.go)));
  $$("[data-theme-t]").forEach(b=>b.addEventListener("click",()=>{ root.dataset.theme = root.dataset.theme==="dark" ? "light" : "dark"; }));
  addEventListener("resize", moveInd); moveInd();

  /* start the dashboard the first time it is on screen; loops (interlude) run only while visible */
  let started = false;
  const start = ()=>{ if(started) return; started = true; root.classList.add("live"); play("ov"); };
  const balEl = gal.querySelector("[data-tick]");
  const inter = gal.querySelector("#nv-inter");
  let tickT = null;
  const tick = ()=>{ if(reduce) return; const to = +balEl.dataset.tick, t0 = performance.now(); const st = (now)=>{ const p = Math.min(1,(now-t0)/1600); balEl.textContent = N(to*(0.86+0.14*ease(p))); if(p<1) requestAnimationFrame(st); }; requestAnimationFrame(st); };
  const rvs = gal.querySelectorAll(".rv");
  if("IntersectionObserver" in window && !reduce){
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{rootMargin:"0px 0px -10% 0px"});
    rvs.forEach(el=>io.observe(el));
    new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ start(); } }),{rootMargin:"0px 0px -20% 0px"}).observe(root);
    new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) thx.classList.add("on"); }),{rootMargin:"0px 0px -15% 0px"}).observe(thx);
    new IntersectionObserver(es=>es.forEach(e=>{ inter.classList.toggle("on", e.isIntersecting); if(e.isIntersecting){ tick(); clearInterval(tickT); tickT = setInterval(tick, 6000); } else clearInterval(tickT); })).observe(inter);
  } else { rvs.forEach(el=>el.classList.add("in")); inter.classList.add("on"); thx.classList.add("on"); start(); }
  /* Desktop is the default on every screen: the 1280px dashboard is scaled to fit the frame. Mobile shows the phone layout. */
  const win = gal.querySelector(".nv-win"), stage = gal.querySelector(".nv-stage"), scaler = gal.querySelector(".nv-scale");
  const fit = ()=>{
    const base = win.dataset.mode === "m" ? 390 : 1280;
    const k = Math.min(1, stage.clientWidth / base);
    scaler.style.transform = k < 1 ? `scale(${k})` : "none";
    stage.style.height = Math.ceil(root.offsetHeight * k) + "px";
    moveInd();
  };
  gal.querySelectorAll(".nv-seg button").forEach(b=>b.addEventListener("click",()=>{
    gal.querySelectorAll(".nv-seg button").forEach(x=>x.classList.toggle("on", x===b));
    const segEl = b.parentElement, y0 = segEl.getBoundingClientRect().top;
    win.dataset.mode = b.dataset.mode; fit(); play(root.dataset.view || "ov");
    const y1 = segEl.getBoundingClientRect().top; if(Math.abs(y1 - y0) > 2) scrollBy(0, y1 - y0);
  }));
  if("ResizeObserver" in window) new ResizeObserver(fit).observe(stage); else addEventListener("resize", fit);
  fit();
  window.NavraDash = {setView, mode:(m)=>{ const b = gal.querySelector(`.nv-seg [data-mode="${m}"]`); if(b) b.click(); }};
})();
