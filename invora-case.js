/* Invora case study: story blocks + moving interludes. Loaded only by case/invora.html after case.js. Built Oct 20 2026 from her 5 Invora screens (Figma BOT, section "Invoicing Dashboard (Invora)"). Every visual is code (HTML, CSS, SVG); amounts shown inside the mock cards are the sample data already on her screens. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal) return;
  const A = "../assets/cases/invora/";
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const win = (src, url, alt, w, h)=>`<div class="iv-win"><div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div><img src="${A}${src}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div>`;
  const eyebrow = (n, t)=>n ? `<div class="iv-eyebrow"><b>${esc(n)}</b><i></i>${esc(t)}</div>` : `<div class="iv-eyebrow">${esc(t)}</div>`;
  const mark = `<span class="iv-mark" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="16.5" cy="15" r="1.2"/></svg></span>`;
  const lbl = (k, t, cls="")=>`<span class="iv-lbl ${cls}"><span class="iv-ico">${svg(k,14)}</span>${esc(t)}</span>`;
  const pill = (cls, t)=>`<span class="iv-pill ${cls}"><i></i>${esc(t)}</span>`;
  const ic = {
    heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
    bulb:'<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    frame:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    pin:'<path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    alert:'<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4"/><path d="M12 17.5h.01"/>'
  };
  const svg = (k, s=22)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ic[k]}</svg>`;


  const icF = {doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 12v6M9 15h6"/>',send:'<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>'};
  const svgF = (k)=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icF[k]}</svg>`;
  /* the invoice card used by several interludes (sample data from her Create Invoice + Payment Page screens) */
  const invoice = (opt={})=>`<div class="iv-inv ${opt.cls||""}">
      <div class="iv-inv-top">${mark}<div><b>Studio Nine</b><small>Design Agency · Lagos</small></div></div>
      <div class="iv-inv-meta"><span>${esc(opt.no||"INV-2042")}</span><span>Due ${esc(opt.due||"Nov 3, 2026")}</span></div>
      <div class="iv-inv-amt"><div><small>Amount Due</small><b>${opt.amt||"₦2,633,750"}</b></div>${opt.status||pill("y","Awaiting Payment")}</div>
      <div class="iv-inv-lines">${(opt.lines||[["Brand identity refresh","₦1,500,000"],["Logo system and guidelines","₦650,000"],["Stationery and templates","₦300,000"]]).map(([a,b])=>`<div><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join("")}</div>
      <div class="iv-inv-btn">${esc(opt.btn||"Pay Now")}</div>
    </div>`;

  /* phone with a code-built mobile version of her Client Payment Page */
  const phonePay = `<div class="iv-phone"><div class="iv-phone-in">
      <div class="iv-pp-top">${mark}<div><b>Studio Nine</b><small>INV-2042 · Due Nov 3, 2026</small></div></div>
      <div class="iv-pp-amt"><small>Amount Due</small><b>₦2,633,750</b><span>Billed to Lumen Digital Ltd</span></div>
      <div class="iv-pp-k">Choose How You Want To Pay</div>
      <div class="iv-pp-opt on"><i></i><div><b>Debit Or Credit Card</b><small>Visa, Mastercard, Verve</small></div></div>
      <div class="iv-pp-opt"><i></i><div><b>Bank Transfer</b><small>One-time account number</small></div></div>
      <div class="iv-pp-opt"><i></i><div><b>USD Wire</b><small>For international clients</small></div></div>
      <div class="iv-pp-btn"><span class="t1">Pay ₦2,633,750</span><span class="t2">Paid</span></div>
      <div class="iv-pp-foot">No account needed</div>
      <div class="iv-pp-done"><span>${svg("check")}</span><b>Payment Received</b><small>Studio Nine has been notified</small></div>
    </div></div>`;

  const SCREENS = [
    ["01","Dashboard","Money received, outstanding and overdue at a glance.","01-dashboard.webp",1440,1633,"app.invora · dashboard"],
    ["02","Create Invoice","NGN or USD, with a live preview of exactly what the client sees.","02-create-invoice.webp",1440,1324,"app.invora · new invoice"],
    ["03","Invoices List","Every invoice tagged paid, pending or overdue, with one tap reminders.","03-invoices-list.webp",1440,1191,"app.invora · invoices"],
    ["04","Client Profile","Billing history and how each client pays.","04-client-profile.webp",1440,1135,"app.invora · clients"],
    ["05","Client Payment Page","The client opens the link and pays. No account needed.","05-payment-page.webp",1440,928,"pay link · invoice INV-2042"]
  ];
  const screen = ([n,t,line,src,w,h,url])=>`<div class="iv-screen rv"><div class="iv-screen-text"><span class="iv-n">${n}</span><h3>${esc(t)}</h3><p>${esc(line)}</p></div>${win(src,url,`Invora ${t}`,w,h)}</div>`;

  const chaos = [
    ["wa","WhatsApp","Hi, please resend your account details"],
    ["bank","Bank Alert","Credit alert. Who is this from?"],
    ["sheet","Spreadsheet","Paid? Not paid? Follow up?"],
    ["word","Word Doc","invoice_final_v3.docx"],
    ["canva","Canva","Invoice template, edited again"],
    ["fx","Client Abroad","Is this in naira or dollars?"]
  ];

  const STEPS = [
    ["heart","Empathize","Freelancers and small agencies chasing payments."],
    ["target","Define","No single place to see who paid, who is late, plus currency confusion."],
    ["bulb","Ideate","One flow: invoice, link, paid. In NGN or USD."],
    ["frame","Prototype","The 5 screens, designed in Figma."],
    ["check","Test","Walking the flow from creating an invoice to the client paying."]
  ];


  /* personas: code-made avatars (SVG), no stats */
  const avatar = (skin, hair, shirt, bg, style)=>`<svg class="iv-av" viewBox="0 0 120 120" aria-hidden="true"><defs><clipPath id="c${style}"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#c${style})"><rect width="120" height="120" fill="${bg}"/>${style==="a"
      ? `<path d="M22 120c2-26 18-38 38-38s36 12 38 38z" fill="${shirt}"/><rect x="51" y="66" width="18" height="20" rx="8" fill="${skin}"/><ellipse cx="60" cy="52" rx="21" ry="24" fill="${skin}"/><path d="M38 50c0-18 10-28 22-28s22 10 22 28c-4-9-12-14-22-14s-18 5-22 14z" fill="${hair}"/><circle cx="52" cy="54" r="2.2" fill="#101828"/><circle cx="68" cy="54" r="2.2" fill="#101828"/><path d="M53 64c4 3 10 3 14 0" stroke="#101828" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="44" y="47" width="14" height="10" rx="4" fill="none" stroke="#101828" stroke-width="1.6"/><rect x="62" y="47" width="14" height="10" rx="4" fill="none" stroke="#101828" stroke-width="1.6"/><path d="M58 52h4" stroke="#101828" stroke-width="1.6"/>`
      : `<path d="M22 120c2-26 18-38 38-38s36 12 38 38z" fill="${shirt}"/><rect x="51" y="66" width="18" height="20" rx="8" fill="${skin}"/><circle cx="60" cy="30" r="17" fill="${hair}"/><ellipse cx="60" cy="54" rx="20" ry="23" fill="${skin}"/><path d="M40 52c-2-16 8-24 20-24s22 8 20 24c-6-8-12-12-20-12s-14 4-20 12z" fill="${hair}"/><circle cx="52" cy="55" r="2.2" fill="#101828"/><circle cx="68" cy="55" r="2.2" fill="#101828"/><path d="M53 65c4 3 10 3 14 0" stroke="#101828" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="39" cy="60" r="3" fill="#FDB022"/><circle cx="81" cy="60" r="3" fill="#FDB022"/>`}</g></svg>`;
  const PERSONAS = [
    {cls:"t", av:avatar("#8D5524","#1D2939","#0E9384","#CCFBEF","a"), name:"Tobi", role:"Freelance Brand Designer",
     about:"Works alone on brand and UI projects for clients in Nigeria and abroad.",
     demo:["Lagos based","Solo freelancer","Bills in NGN and USD"],
     motivation:"Spend the week designing, not chasing money.",
     goals:["Send a clean invoice in minutes","Get paid on time","Know who still owes"],
     frus:["Chasing payments on WhatsApp","Matching bank alerts by hand","Invoices made in Canva","Clients abroad unsure about currency"]},
    {cls:"a", av:avatar("#A0673C","#101828","#F79009","#FEF0C7","b"), name:"Amara", role:"Small Agency Owner · Studio Nine",
     about:"Runs a small design agency with several clients on projects at the same time.",
     demo:["Lagos based","Small team","Many clients at once"],
     motivation:"Keep cash flow steady so the team gets paid.",
     goals:["See paid, pending and overdue at a glance","Remind late clients in one tap","Know how each client pays"],
     frus:["Invoices spread across Word and spreadsheets","Nobody knows who has paid and who is late","Follow ups done by hand"]}
  ];
  const persona = (p)=>`<article class="iv-persona ${p.cls}">
      <header>${p.av}<div><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div></header>
      <div class="iv-pg"><h4>${lbl("user","About")}</h4><p>${esc(p.about)}</p></div>
      <div class="iv-pg"><h4>${lbl("pin","Demographics")}</h4><div class="iv-chips">${p.demo.map(d=>`<span>${esc(d)}</span>`).join("")}</div></div>
      <div class="iv-pg"><h4>${lbl("spark","Motivation")}</h4><p>${esc(p.motivation)}</p></div>
      <div class="iv-pg two"><div><h4>${lbl("target","Goals")}</h4><ul>${p.goals.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div><div class="fr"><h4>${lbl("alert","Frustrations","r")}</h4><ul>${p.frus.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div></div>
    </article>`;

  const USERS = ["Freelance Designers","Developers","Creators","Small Agencies"];
  const band = (dir)=>`<div class="iv-band ${dir}"><div class="iv-band-in">${[0,1,2,3].map(()=>USERS.map(u=>`<span>${esc(u)}</span><em>${mark}</em>`).join("")).join("")}</div></div>`;

  const html = `

  <!-- OPENING MOTION (her Oct 20 8:04 PM correction): one invoice rides Create, Send, Paid on a loop; a faint status marquee runs behind -->
  <section class="iv-flow" id="iv-flow" aria-label="Create an invoice, send a link, get paid">
    <div class="iv-flow-mq" aria-hidden="true"><div class="iv-flow-mq-in">${[0,1].map(()=>["Draft","Sent","Viewed","Paid","Reminder Sent","Paid In NGN","Paid In USD","Paid"].map(s=>`<span>${s}</span><i></i>`).join("")).join("")}</div></div>
    <div class="iv-flow-stage">
      <div class="iv-flow-track" aria-hidden="true">
        <div class="iv-flow-line"><i></i></div>
        <div class="iv-flow-node n1"><span>${svgF("doc")}</span><b>Create</b></div>
        <div class="iv-flow-node n2"><span>${svgF("send")}</span><b>Send</b></div>
        <div class="iv-flow-node n3"><span>${svgF("check")}</span><b>Paid</b></div>
        <div class="iv-flow-card">
          <div class="iv-flow-card-top">${mark}<div><b>INV-2042</b><small>Lumen Digital</small></div></div>
          <div class="iv-flow-amt">₦2,633,750</div>
          <div class="iv-flow-st"><span class="iv-pill d"><i></i>Draft</span><span class="iv-pill y"><i></i>Sent</span><span class="iv-pill"><i></i>Paid</span></div>
        </div>
        <div class="iv-flow-toast"><span>${svgF("check")}</span>Payment Received</div>
      </div>
    </div>
  </section>
  <section class="iv iv-sec tight rv" id="iv-intro">
    <h2 class="iv-h2 iv-intro-h">Invoicing That <em>Gets You Paid</em></h2>
  </section>
  <!-- overview: about, problem, personas, goal -->
  <section class="iv iv-sec tight rv" id="iv-overview">
    ${eyebrow("","About The Project")}
    <p class="iv-lede">Invora is an invoicing and payments tool for freelancers and small agencies. Create an invoice, send a link, get paid, see who still owes you.</p>
  </section>
  <section class="iv iv-sec rv" id="iv-problem">
    ${eyebrow("","The Problem")}
    <p class="iv-lede soft">Freelancers chase payments across WhatsApp, bank alerts and spreadsheets. Invoices get made in Word or Canva, nobody knows who has paid and who is late, and clients abroad get confused about currency.</p>
  </section>
  <!-- INTERLUDE 1: the chase. Autoplay (her Oct 20 8:05 PM correction: "let it move itself"): fragments drift on their own, pull together into one invoice, then scatter again. Sits before Personas. -->
  <section class="iv-chase" id="iv-chase" aria-label="From scattered messages to one invoice">
    <div class="iv-chase-pin">
      <div class="iv-chase-head"><span class="a">Scattered Everywhere</span><span class="b">One Invoice. One Link.</span></div>
      <div class="iv-chase-field">
        ${chaos.map(([k,t,s],i)=>`<div class="iv-frag ${k}" data-i="${i}"><b>${esc(t)}</b><span>${esc(s)}</span></div>`).join("")}
        <div class="iv-chase-inv">${invoice({cls:"sm"})}</div>
      </div>
    </div>
  </section>

  <section class="iv iv-sec rv" id="iv-personas">
    ${eyebrow("","Personas")}
    <div class="iv-personas">${PERSONAS.map(persona).join("")}</div>
  </section>
  <section class="iv iv-sec tight rv" id="iv-goal">
    <div class="iv-card goal">${lbl("target","Goal")}<p class="big">Make getting paid as easy as sending a link.</p></div>
  </section>

  <!-- design process: node line, steps light up in sequence -->
  <section class="iv iv-sec" id="iv-process">
    ${eyebrow("","Design Process")}
    <div class="iv-proc" id="iv-proc">
      <div class="iv-proc-line"><i></i></div>
      ${STEPS.map(([k,t,s],i)=>`<div class="iv-step" style="--d:${i}"><span class="iv-node">${svg(k)}</span><b>${esc(t)}</b><p>${esc(s)}</p></div>`).join("")}
    </div>
  </section>

  <!-- solution -->
  <section class="iv iv-sec" id="iv-solution">
    ${eyebrow("","The Screens")}
    <h2 class="iv-h2">Invoice, link, <em>paid.</em></h2>
    ${screen(SCREENS[0])}
    ${screen(SCREENS[1])}
  </section>

  <!-- INTERLUDE 2: NGN or USD. The invoice flips in 3D between a naira and a dollar invoice, currency chips orbit -->
  <section class="iv-inter" id="iv-fx">
    <div class="iv-inter-cap"><span>Bill In</span><b>NGN Or USD</b></div>
    <div class="iv-fx-stage">
      <div class="iv-orbit"><span class="o1">₦</span><span class="o2">$</span><span class="o3">NGN</span><span class="o4">USD</span></div>
      <div class="iv-flip"><div class="iv-flip-in">
        <div class="face fr">${invoice({})}</div>
        <div class="face bk">${invoice({no:"INV-2033",due:"Sep 15, 2026",amt:"$1,400",lines:[["Menu redesign","$1,400"]],status:pill("g","Paid"),btn:"Paid"}).replace("Studio Nine</b><small>Design Agency · Lagos","Studio Nine</b><small>Billed to Kobo Foods")}</div>
      </div></div>
    </div>
  </section>

  <section class="iv iv-sec tight">
    ${screen(SCREENS[2])}
  </section>

  <!-- INTERLUDE 3: the Paid stamp lands on a pending invoice; a reminder pings first -->
  <section class="iv-inter" id="iv-stamp">
    <div class="iv-inter-cap"><span>Pending To</span><b>Paid</b></div>
    <div class="iv-stamp-stage">
      <div class="iv-ping">${pill("y","Reminder Sent")}</div>
      ${invoice({cls:"stampable",no:"INV-2041",due:"Oct 24, 2026",amt:"₦920,000",lines:[["Pitch deck design","₦920,000"]],status:`<span class="iv-st">${pill("y","Pending")}${pill("g","Paid")}</span>`,btn:"Pay Now"}).replace("Studio Nine</b><small>Design Agency · Lagos","Studio Nine</b><small>Billed to Lumen Digital")}
      <div class="iv-stamp" aria-hidden="true"><span>Paid</span></div>
    </div>
  </section>

  <section class="iv iv-sec tight">
    ${screen(SCREENS[3])}
  </section>

  <!-- INTERLUDE 4: send a link. The link slides across into the phone, the phone tilts with scroll, the client pays -->
  <section class="iv-inter iv-link" id="iv-link">
    <div class="iv-inter-cap"><span>Send A Link</span><b>Get Paid</b></div>
    <div class="iv-link-stage">
      <div class="iv-link-src">${invoice({cls:"sm"})}</div>
      <div class="iv-link-track"><span class="iv-linkpill"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Invoice INV-2042 · Pay Now</span></div>
      <div class="iv-link-phone" data-tilt-phone>${phonePay}</div>
    </div>
  </section>

  <section class="iv iv-sec tight">
    ${screen(SCREENS[4])}
  </section>

  <!-- target users: moving band -->
  <section class="iv iv-sec" id="iv-users">
    ${eyebrow("","Target Users")}
  </section>
  <div class="iv-bands" aria-label="Freelance designers, developers, creators and small agencies">${band("l")}${band("r")}</div>

  <!-- CLOSE (her Oct 20 8:08 PM correction): Thanks For Scrolling in a new style, a paid receipt in Invora glass. Replaces the next-project card on this page. -->
  <section class="iv iv-sec" id="iv-thanks">
    <div class="iv-ty">
      <div class="iv-ty-glow" aria-hidden="true"></div>
      <h2 class="iv-ty-h">Thanks For <span>Scrolling</span></h2>
      <div class="iv-ty-rc">
        <div class="iv-ty-rc-top">${mark}<div><b>Receipt</b><small>Invora Case Study</small></div></div>
        <div class="iv-ty-row"><span>Designed By</span><b>Adaikem Ajufo</b></div>
        <div class="iv-ty-row"><span>Role</span><b>Product Designer</b></div>
        <div class="iv-ty-row"><span>Screens</span><b>5 Screens, Figma</b></div>
        <div class="iv-ty-row tot"><span>Your Time</span><b>Paid In Full</b></div>
        <div class="iv-ty-stamp" aria-hidden="true"><span>Thank You</span></div>
      </div>
      <div class="iv-ty-act">
        <a class="iv-ty-btn" href="../ui-ux-designs"><span aria-hidden="true">←</span> Back To Projects</a>
        <button class="iv-ty-btn ghost" type="button" data-top>Back To Top <span aria-hidden="true">↑</span></button>
      </div>
    </div>
  </section>
  `;
  gal.innerHTML = html;

  /* reveal for the blocks added here (case.js already observed its own) */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rvs = gal.querySelectorAll(".rv");
  const inview = (els, cls, margin)=>{
    if("IntersectionObserver" in window && !reduce){
      const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add(cls); io.unobserve(e.target); } }),{rootMargin:margin||"0px 0px -10% 0px"});
      els.forEach(el=>io.observe(el));
    } else els.forEach(el=>el.classList.add(cls));
  };
  inview(rvs,"in");
  inview(gal.querySelectorAll("#iv-proc"),"go","0px 0px -25% 0px");
  /* stamp + link loops run only while on screen */
  const live = gal.querySelectorAll("#iv-flow,#iv-stamp,#iv-link,#iv-fx,.iv-bands,#iv-thanks");
  if("IntersectionObserver" in window){
    const io2 = new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("on", e.isIntersecting)),{rootMargin:"0px 0px -15% 0px"});
    live.forEach(el=>io2.observe(el));
  } else live.forEach(el=>el.classList.add("on"));

  /* scroll-driven parts: hero tilt, the chase, phone tilt */
  const hero = gal.querySelector("[data-tilt]");
  const chase = gal.querySelector("#iv-chase");
  const frags = [...gal.querySelectorAll(".iv-frag")];
  const phone = gal.querySelector("[data-tilt-phone]");
  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const ease = (t)=>1-Math.pow(1-t,3);
  let ticking = false;
  const hdr = ()=>{ const h = document.querySelector(".tb-head, header.tb-header, body > header"); const b = h ? Math.max(0, Math.round(h.getBoundingClientRect().bottom)) : 0; document.documentElement.style.setProperty("--iv-hdr", b + "px"); };
  function frame(){
    ticking = false;
    const vh = innerHeight;
    const narrow = innerWidth < 600 ? 0.62 : 1;
    hdr();
    if(hero){
      const r = hero.getBoundingClientRect();
      const p = clamp(1 - (r.top + r.height*0.35) / vh, 0, 1);
      hero.style.setProperty("--p", reduce ? 1 : p.toFixed(3));
    }
    if(phone){
      const r = phone.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      phone.style.setProperty("--t", reduce ? 0.5 : p.toFixed(3));
    }
  }

  /* the chase: autoplay loop, no scroll or touch needed. Each chip sits at a spot inside the card (kept inside the edges at every width), floats on its own, then all pull into one invoice and scatter back. */
  const SPOT = [[-1,-0.95,-10],[1,-0.62,8],[-0.95,0.05,7],[1,0.32,-7],[-0.9,0.92,9],[0.95,1,-9]]; /* x, y in -1..1 of the free room, rotate deg */
  const smooth = (t)=>t*t*(3-2*t);
  let chaseOn = false, chaseRaf = 0, room = null, t0 = performance.now();
  const measure = ()=>{
    if(!chase) return;
    const pin = chase.querySelector(".iv-chase-pin"), head = chase.querySelector(".iv-chase-head");
    const W = pin.clientWidth, H = pin.clientHeight, fw = frags[0].offsetWidth, fh = Math.max(...frags.map(f=>f.offsetHeight));
    const cy = H*0.56, headB = head.offsetTop + head.offsetHeight + 14, amp = 6;
    room = { x: Math.max(0, W/2 - fw/2 - 10 - amp), up: Math.max(0, cy - headB - fh/2 - amp), down: Math.max(0, H - cy - fh/2 - 14 - amp) };
  };
  const PERIOD = 9000;
  const chaseAt = (now)=>{
    if(!room) measure();
    const ph = ((now - t0) % PERIOD) / PERIOD;
    let q = 0;
    if(reduce) q = 1;
    else if(ph < .42) q = 0;
    else if(ph < .56) q = smooth((ph-.42)/.14);
    else if(ph < .82) q = 1;
    else q = 1 - smooth((ph-.82)/.18);
    chase.style.setProperty("--q", q.toFixed(3));
    const s = now/1000;
    frags.forEach((f,i)=>{
      const [sx,sy,rot] = SPOT[i], k = 1 - q;
      const fx = reduce ? 0 : Math.sin(s*0.9 + i*1.7)*6, fy = reduce ? 0 : Math.cos(s*0.75 + i*2.3)*6, fr = reduce ? 0 : Math.sin(s*0.6 + i)*2.5;
      const x = sx*room.x*k + fx*k, y = (sy<0 ? sy*room.up : sy*room.down)*k + fy*k;
      f.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${((rot+fr)*k).toFixed(2)}deg) scale(${(1-0.55*q).toFixed(3)})`;
      f.style.opacity = (1 - clamp((q-0.55)/0.35,0,1)).toFixed(3);
    });
  };
  const chaseTick = (now)=>{ chaseRaf = 0; if(!chaseOn) return; chaseAt(now); chaseRaf = requestAnimationFrame(chaseTick); };
  if(chase){
    measure(); chaseAt(performance.now());
    if(!reduce){
      if("IntersectionObserver" in window){
        new IntersectionObserver(es=>es.forEach(e=>{ chaseOn = e.isIntersecting; if(chaseOn && !chaseRaf) chaseRaf = requestAnimationFrame(chaseTick); }),{rootMargin:"60px 0px"}).observe(chase);
      } else { chaseOn = true; chaseRaf = requestAnimationFrame(chaseTick); }
    }
    addEventListener("resize", ()=>{ measure(); chaseAt(performance.now()); });
  }

  /* design process: the line runs exactly through the centre of every circle, first to last */
  const proc = gal.querySelector("#iv-proc");
  const procLine = proc && proc.querySelector(".iv-proc-line");
  const placeLine = ()=>{
    if(!procLine) return;
    const nodes = proc.querySelectorAll(".iv-node"); if(nodes.length < 2) return;
    const pr = proc.getBoundingClientRect(), a = nodes[0].getBoundingClientRect(), b = nodes[nodes.length-1].getBoundingClientRect();
    const ax = a.left + a.width/2 - pr.left, ay = a.top + a.height/2 - pr.top, bx = b.left + b.width/2 - pr.left, by = b.top + b.height/2 - pr.top;
    const vertical = Math.abs(bx-ax) < Math.abs(by-ay);
    Object.assign(procLine.style, vertical
      ? {left:(ax-1)+"px", top:ay+"px", width:"2px", height:(by-ay)+"px", right:"auto", bottom:"auto"}
      : {left:ax+"px", top:(ay-1)+"px", width:(bx-ax)+"px", height:"2px", right:"auto", bottom:"auto"});
  };
  placeLine(); addEventListener("resize", placeLine); addEventListener("load", placeLine); setTimeout(placeLine, 600);
  const topBtn = gal.querySelector("[data-top]");
  if(topBtn) topBtn.addEventListener("click", ()=>scrollTo({top:0, behavior: reduce ? "auto" : "smooth"}));
  const onScroll = ()=>{ if(!ticking){ ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", onScroll, {passive:true});
  addEventListener("resize", ()=>{ hdr(); onScroll(); });
  hdr(); setTimeout(hdr, 400); setTimeout(hdr, 1500);
  frame();

  /* lightbox for the screens added here */
  const lb = ()=>window.TBLightbox && TBLightbox.bind(document.getElementById("case"));
  if(window.TBLightbox) lb(); else setTimeout(lb, 800);
})();
