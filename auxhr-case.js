/* AuxHR case study: the story blocks. Oct 20 2026: shortened on her word ("too long"); full previous version in files/auxhr_case/short_v1/auxhr-case.BEFORE.js. Loaded only by case/auxhr.html after case.js. Text lives here; shared hero/meta/footer come from case.js + content.js. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal) return;
  const A = "../assets/cases/auxhr/";
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const win = (src, url, alt, cls="")=>`<div class="ax-win ${cls}"><div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div>`;
  /* auto-scrolling browser window for a full-length page (auxhr-motion.js drives it) */
  const swin = (src, url, alt)=>`<div class="ax-win ax-swin"><div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div><div class="ax-swin-vp"><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div></div>`;
  const phone = (src, alt)=>`<div class="ax-phone"><div class="scr"><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div></div>`;
  /* Oct 20 2026 6:42 PM: one short eyebrow, then a real h2; no "LABEL line MONO SUBTITLE" split */
  const eyebrow = (t)=>`<div class="ax-eyebrow"><i></i>${esc(t)}</div>`;
  /* Oct 20 2026 6:25 PM, her word: label dots become icons inside their own glass chip, across the page */
  const LI = {"rec": "<svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2.5\"/><path d=\"M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18\"/></svg>", "talent": "<svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7\"/></svg>", "ai": "<svg viewBox=\"0 0 24 24\"><path d=\"M4 7h9M17 7h3M4 17h3M11 17h9\"/><circle cx=\"15\" cy=\"7\" r=\"2\"/><circle cx=\"9\" cy=\"17\" r=\"2\"/><path d=\"M19 11.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z\"/></svg>", "goal": "<svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.4\"/></svg>", "live": "<svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z\"/></svg>", "figma": "<svg viewBox=\"0 0 24 24\"><path d=\"M12 19l7-7 2 2-7 7z\"/><path d=\"M18 13l-1.5-7.5L3 2l3.5 13.5L14 17z\"/><circle cx=\"11\" cy=\"11\" r=\"2\"/></svg>", "screen": "<svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/></svg>"};
  const ico = (k)=>`<i class="ax-ic k-${k}" aria-hidden="true">${LI[k]||LI.screen}</i>`;
  const capIco = (cap, capCls)=> capCls==="rec"||capCls==="talent" ? capCls : /figma/i.test(cap) ? "figma" : /live|auxhr\.com/i.test(cap) ? "live" : /screening|setup/i.test(cap) ? "ai" : "screen";
  const stage = (inner, cap, cls="", capCls="")=>`<div class="ax-stage ${cls}">${cap?`<span class="ax-cap ${capCls}">${ico(capIco(cap, capCls))}${esc(cap)}</span>`:""}${inner}</div>`;
  const row = (k, h, p, dec, media, flip)=>`<div class="ax-row ${flip?"flip":""} rv"><div class="ax-row-text"><span class="ax-k">${esc(k)}</span><h3>${esc(h)}</h3>${p?`<p>${esc(p)}</p>`:""}${dec?`<div class="ax-dec"><b>Design decision.</b> ${esc(dec)}</div>`:""}</div>${media}</div>`;
  const pad = (src, url, alt, cls="pad")=>`<div class="ax-row-media ${cls}">${win(src, url, alt)}</div>`;
  const img = (src, alt, cls="")=>`<div class="ax-row-media ${cls}"><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div>`;

  const RAMPS = {
    blue:["#eaf2ff","#d9e8ff","#bad3ff","#91b6ff","#3f88ff","#4266ff","#213aff","#162aec","#1527be","#1b2b94","#0f1652"],
    violet:["#e4e5ff","#cfd0ff","#a9a8ff","#7b74ff","#5d3eff","#4f13ff","#4800ff","#4800ff","#4000e4","#3700b0","#160040"],
    navy:["#f3f6fc","#e7edf7","#cad8ed","#9bb7de","#6591cb","#4173b6","#305999","#28487c","#243e68","#233657","#101828"],
    cyan:["#ebfeff","#cefbff","#a2f5ff","#63eafd","#1cd6f4","#00b8d9","#0393b7","#0a7594","#125f78","#144e65","#063346"],
    green:["#eafff6","#cdfee7","#a0fad5","#63f2c0","#25e2a6","#00c48c","#00a479","#008364","#00674f","#005542","#003027"],
    orange:["#fef9ec","#fdedc8","#fada8d","#f7c052","#f5a623","#ef8711","#d3630c","#af440e","#8f3411","#752c12","#431505"],
    beige:["#f5f3ee","#efede5","#dfd8c9","#cabfa7","#b4a183","#a58b6a","#987b5e","#7f654f","#685344","#554439","#2d241d"],
    gray:["#ffffff","#efefef","#dcdcdc","#bdbdbd","#989898","#7c7c7c","#656565","#525252","#464646","#3d3d3d","#292929"]
  };
  const STEPS = ["50","100","200","300","400","500","600","700","800","900","950"];
  const ramps = Object.entries(RAMPS).map(([n,cs])=>`<div class="ax-ramp"><span class="nm">${n}</span>${cs.map((c,i)=>`<i style="background:${c}" title="${n} ${STEPS[i]} ${c}"><span style="color:${i<5?"#101828":"#fff"}">${STEPS[i]} ${c}</span></i>`).join("")}</div>`).join("");

  /* BRAND assets: filled from what the public web still holds (see files/auxhr_case/branding/NOTES.md) */
  const BRAND = window.AX_BRAND || {};


  /* PERSONAS (Oct 20 2026). Avatars: free-licence stock photos (her 6:33 PM ask), see avatar() below. */
  const PI = {"about": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7\"/></svg>", "demo": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z\"/><circle cx=\"12\" cy=\"10\" r=\"2.6\"/></svg>", "moti": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M13 2 4 14h7l-1 8 9-12h-7z\"/></svg>", "goal": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.4\"/></svg>", "frus": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 3 2 20h20z\"/><path d=\"M12 10v4M12 17v.5\"/></svg>"};
  const PERSONAS = [
    { cls:"rec", tag:"Recruiter", name:"Philip Kosana", role:"Tech Startup Recruiter", ini:"PK",
      about:"Recruits for a fast-paced tech startup. Handles high-volume openings on tight deadlines. Data-driven and focused on efficiency.",
      demo:[["Role","In-house Recruiter"],["Company","Tech startup, scaling"],["Based","Lagos, hires remote"],["Experience","Mid-level"],["Tools","LinkedIn, ATS, spreadsheets"]],
      moti:"Fill every role fast without lowering the bar.",
      goals:["Spot qualified candidates fast in a large pool","Automate CV screening and first outreach","Track the pipeline and report on hiring","Cut time to hire"],
      frus:["Hours of manual work: CVs one by one, the same outreach again","Unqualified applicants bury the strong ones","No view of the pipeline, so candidates stall","Specialised skills are hard to spot and compare from a CV"] },
    { cls:"talent", tag:"Talent", name:"Paul Akakuigbe", role:"Customer Support Specialist", ini:"PA",
      about:"5+ years in customer support, mostly at tech startups. Skilled across support tools. Wants a role where he can grow.",
      demo:[["Role","Support Specialist"],["Background","Tech startups"],["Based","Lagos, open to remote"],["Experience","5+ years"],["Tools","Helpdesk, live chat, LinkedIn"]],
      moti:"A next role that uses his skills and moves his career forward.",
      goals:["Find a role that matches his skills and offers growth","Show his experience and certifications clearly","Apply without retyping his CV","Hear back quickly on every application"],
      frus:["Long, repetitive forms that ask for the CV he just uploaded","Silence after applying, no idea what happens next","Hard to highlight specialised skills and certifications","No clarity on what recruiters actually want"] }
  ];
  /* her 6:33 PM: "put stock pictures in the persona". Free-licence Pexels photos (commercial use, no attribution needed):
     recruiter https://www.pexels.com/photo/professional-man-smiling-in-modern-office-environment-28426642/
     talent    https://www.pexels.com/photo/close-up-shot-of-a-man-in-black-suit-smiling-7163464/ */
  const avatar = (p)=>`<img class="ax-av" src="${A}persona_${p.cls==="rec"?"recruiter":"talent"}.webp" alt="${esc(p.name)}, ${esc(p.role)}" width="240" height="240" loading="lazy" decoding="async">`;
  const pf = (k, label, body)=>`<div class="ax-pf ${k}"><span class="ax-chip"><i class="ax-ic" aria-hidden="true">${PI[k]}</i>${label}</span>${body}</div>`;
  const persona = (p, n)=>`<article class="ax-persona ${p.cls} rv" style="transition-delay:${n*.12}s">
      <header class="ax-ph"><div class="ax-avw">${avatar(p)}</div><div><span class="ax-ptag">${ico(p.cls)}${p.tag}</span><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p></div></header>
      ${pf("about","About",`<p>${esc(p.about)}</p>`)}
      ${pf("demo","Demographics",`<dl>${p.demo.map(([a,b])=>`<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>`)}
      ${pf("moti","Motivation",`<p class="q">${esc(p.moti)}</p>`)}
      <div class="ax-pcols">
        ${pf("goal","Goals",`<ul>${p.goals.map(g=>`<li>${esc(g)}</li>`).join("")}</ul>`)}
        ${pf("frus","Frustrations",`<ul>${p.frus.map(g=>`<li>${esc(g)}</li>`).join("")}</ul>`)}
      </div>
    </article>`;

  const html = `
  <!-- Oct 20 2026 6:22 PM: hero dashboard visual removed on her word ("remove the recruiter dashboard in the beginning"); About The Project now opens the page. Old markup in files/auxhr_case/short_v4/auxhr-case.js.BEFORE -->
  <!-- film. Oct 20 2026 6:32 PM, her word "this should be in a better place maybe at the top before AI powered": moved into the hero (see the move below the render), no eyebrow -->
  <section class="ax ax-sec ax-film-hero" id="ax-film">
    <div class="ax-video"><video data-vsrc="../assets/media/motion_auxhr3.mp4" poster="../assets/media/motion_auxhr3.jpg" controls playsinline preload="none" data-noauto="1" width="1920" height="1080"></video></div>
  </section>

  <!-- overview: about, problem, goal, solution. Oct 20 2026: rebalanced after the short cut went too far ("why did you remove all the problems solution"); all wording trimmed from short_v1/auxhr-case.BEFORE.js -->
  <section class="ax ax-sec tight rv" id="ax-overview">
    ${eyebrow("About The Project")}
    <p class="ax-lede">AuxHR is SalesPlat's AI-powered talent acquisition platform. The first designs shipped fast as an MVP; using it showed us where the screens got in the way, so we redesigned the whole product around how recruiters and candidates actually move through a hiring week. I led that redesign.</p>

    <div style="margin-top:56px">${eyebrow("The Problem")}</div>
    <h2 class="ax-h2">Hiring breaks in both directions.</h2>
    <p class="ax-lede">The product requirements and the user research named the same pains from two sides of the table. The MVP proved the idea, but each flow was its own page, with no shared language between the recruiter side and the talent side.</p>
    <!-- Oct 20 2026 6:21 PM: her word "we need to identify them with personas". The plain Recruiter/Talent pain cards became two persona cards. Names, about, goals and frustrations come from the AuxHR PRD personas (Philp Kosana, Akakuigbe Paul); frustrations reuse the old pain bullets. Old markup in files/auxhr_case/short_v4/auxhr-case.js.BEFORE -->
    <div class="ax-personas">${PERSONAS.map(persona).join("")}</div>

    <div class="ax-goal rv"><span class="ax-goal-k">${ico("goal")}Goal</span><p>Bridge the rift between open roles and the people who fit them.</p></div>

    <!-- interlude (her 6:12 PM voice note + 6:28 PM "don't forget the banners") -->
    <div class="axi-wrap rv"><div class="axi" data-axi="funnel"></div></div>

    <div style="margin-top:56px">${eyebrow("The Solution")}</div>
    <h2 class="ax-h2">Set the criteria once. Let the platform run the pipeline with you.</h2>
    <p class="ax-lede">A recruiter creates a role and configures how the AI screens it. Talent applies in one click from a profile that already carries their experience. The AI scores everyone against the same bar, and both sides watch the same pipeline from their own dashboard.</p>
    <div class="ax-grid c3">
      <div class="ax-card rec"><span class="ax-tag">${ico("rec")}Recruiter</span><p>Every application sorted, filtered and scored on arrival. Candidate briefs instead of raw CVs.</p></div>
      <div class="ax-card talent"><span class="ax-tag">${ico("talent")}Talent</span><p>One profile does the applying. Roles ranked by real fit, with a status on every application.</p></div>
      <div class="ax-card ai"><span class="ax-tag">${ico("ai")}AI Configuration</span><p>Screening questions, weights and pass marks set per role by the hiring manager, applied to every applicant the same way.</p></div>
    </div>
  </section>

  <!-- chapter I: talent -->
  <section class="ax ax-sec rv" id="ax-talent">
    ${eyebrow("Chapter I · Talent")}
    <h2 class="ax-h2">Stand out. Get matched. <em>Land the role.</em></h2>
    ${stage(`<div class="axd" data-axd="talent" data-base="${A}" aria-label="Animated talent dashboard: Amaka applies to a matched role in one click"></div>`, "Talent Dashboard", "ax-dstage", "talent")}
    <div class="ax-rows">
      ${row("Discover","Roles ranked by real fit","Fit score and pay visible before applying.","", `<div class="ax-row-media vig"><div class="axv" data-axv="discover"></div></div>`, false)}
      ${row("Assess","Tests inside the flow","Pass and move on automatically.","", `<div class="ax-row-media vig"><div class="axv" data-axv="assess"></div></div>`, true)}
      ${row("Track","Every application, one live status","The same stages the recruiter sees.","", `<div class="ax-row-media vig"><div class="axv" data-axv="track"></div></div>`, false)}
      ${row("Apply","Apply in one click","The profile carries over. No forms.","", `<div class="ax-row-media vig"><div class="axv" data-axv="apply"></div></div>`, true)}
    </div>
    <!-- Oct 20 2026 7:46 PM, her words "those dots should be logos of the company" + "why remove": fig_talent_full_v2.webp has real company logo chips on the 6 job cards and a clean talent CTA banner (the Figma frame had the recruiter CTA text stacked over the talent copy). Original: fig_talent_full.webp -->
    <!-- Oct 20 2026 6:31 PM, her word "make this part the full landing page remove the phone": phone card hidden, the browser card now auto-scrolls the full talent landing (auxhr-motion.js) -->
    ${stage(swin("fig_talent_full_v2_faces.webp","auxhr.com · talent","Talent landing page, full design: Stand out. Get matched. Land your dream role."), "Talent Landing · Designed, In Build", "deep", "talent")}
  </section>

  <div class="axi-wrap rv"><div class="axi" data-axi="marquee"></div></div>

  <!-- chapter II: recruiter. Oct 20 2026 6:34 PM, her word "do this chapter two like chapter one the way i arranged it remove the unnecessary things": same order as chapter I (label, headline, dashboard, four feature rows, landing page); the three live cards strip is gone -->
  <section class="ax ax-sec rv" id="ax-rec">
    ${eyebrow("Chapter II · Recruiter")}
    <h2 class="ax-h2">Hire better. <em>Move faster.</em></h2>
    ${stage(`<div class="axd" data-axd="rec" data-base="${A}" aria-label="Animated recruiter dashboard: Philip shortlists a scored candidate"></div>`, "Recruiter Dashboard", "ax-dstage", "rec")}
    <div class="ax-rows">
      ${row("Post","Every role and its state in one list","Open and closed roles with applicant counts.","", `<div class="ax-row-media vig"><div class="axv" data-axv="post"></div></div>`, false)}
      ${row("Screen","A brief, not a CV to decode","Three scores first, then a suggested next step.","", `<div class="ax-row-media vig"><div class="axv" data-axv="screen"></div></div>`, true)}
      ${row("Pipeline","Candidates arrive already scored","Applied to Shortlisted in one click.","", `<div class="ax-row-media vig"><div class="axv" data-axv="pipeline"></div></div>`, false)}
      ${row("Collaborate","The whole hiring team in one view","Hiring managers and recruiters aligned.","", `<div class="ax-row-media vig"><div class="axv" data-axv="collaborate"></div></div>`, true)}
    </div>
    ${stage(swin("fig_recruiter_full.webp","auxhr.com · recruiter","Recruiter landing page, full design"), "Recruiter Landing · Designed", "deep", "rec")}
  </section>

  <div class="axi-wrap rv"><div class="axi" data-axi="passmark"></div></div>

  <!-- chapter III: AI configuration. Oct 20 2026 6:36 PM, her word "same as chapter 3": mirrors chapter I (label, headline, frame, short feature rows); the long lede paragraph is gone -->
  <section class="ax ax-sec rv" id="ax-ai">
    ${eyebrow("Chapter III · AI Configuration")}
    <h2 class="ax-h2">Set the bar once. The AI holds <em>everyone</em> to it.</h2>
    ${stage(win("dash_r2_faces.webp","app.auxhr.com · post a job · screening","Post a job: screening setup with skill weights, pre-screening questions and personality assessment toggles"), "Post A Job · Screening Setup", "", "")}
    <div class="ax-rows">
      ${row("Configure","Questions, tests and weights, set once per role","Toggles switch each test on, sliders carry the weights.","", `<div class="ax-row-media vig"><div class="axv" data-axv="configure"></div></div>`, false)}
      ${row("Score","Three scores travel with every candidate","CV match, screening and personality fit.","", `<div class="ax-row-media vig"><div class="axv" data-axv="score"></div></div>`, true)}
    </div>
  </section>

  <!-- Oct 20 2026 6:38 PM, her word "remove this part i already told you where to put recruiters and talents full landing pages": the Website section (live mock, How It Works, both Figma site cards) is gone; the full landing pages live inside chapters I and II. Old markup in files/auxhr_case/short_v4/ -->

  <!-- brand. Oct 20 2026 6:40-6:41 PM, her words "this could be written better and the representation of changing from support pro should be a short motion story film" + remove the three creative cards. The story is coded (auxhr-motion.js), real logo files only -->
  <section class="ax ax-sec rv" id="ax-brand">
    ${eyebrow("The Rebrand")}
    <h2 class="ax-h2">From SupportPro to <em>AuxHR.</em></h2>
    <p class="ax-lede">A services brand became a product. The name and mark had to say AI powered hiring.</p>
    <div class="ax-rb" data-axr aria-label="Motion story: the SupportPro wordmark breaks apart and the AuxHR mark draws in">
      <div class="ax-rb-card"></div>
      <div class="ax-rb-old"><span class="rb-l">${[[0,125],[145,262],[285,406],[427,549],[562,685],[705,862],[881,1000],[1018,1215]].map((s,i)=>`<i style="--x0:${(s[0]/1400*100).toFixed(2)}%;--x1:${((1400-s[1]-1)/1400*100).toFixed(2)}%;--i:${i}"></i>`).join("")}</span><span class="rb-sw"></span></div>
      <div class="ax-rb-new"><span class="rb-lines"></span><span class="rb-tri"></span><span class="rb-word"></span></div>
      <span class="ax-rb-cap a">SupportPro · Services</span><span class="ax-rb-cap b">AuxHR · AI Hiring</span>
    </div>
  </section>

  <!-- style guide. Oct 20 2026 6:42-6:43 PM: proper header, a real type specimen; Surfaces card and the three component cards removed -->
  <section class="ax ax-sec rv" id="ax-style">
    ${eyebrow("Style Guide")}
    <h2 class="ax-h2">Color, Typography, <em>Components</em></h2>
    <div class="ax-ramps">${ramps}</div>
    <div class="ax-spec2">
      <div class="sp-aa"><b>Aa</b><span class="sp-nm">General Sans</span><span class="sp-ab">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789</span>
        <div class="sp-w"><span style="font-weight:400">Regular</span><span style="font-weight:500">Medium</span><span style="font-weight:600">Semibold</span><span style="font-weight:700">Bold</span></div></div>
      <div class="sp-scale">
        <div class="r"><span class="t">H1 · 56px</span><p style="font-size:56px;font-weight:600;letter-spacing:-.03em">Hire better.</p></div>
        <div class="r"><span class="t">H2 · 40px</span><p style="font-size:40px;font-weight:600;letter-spacing:-.025em">Move faster.</p></div>
        <div class="r"><span class="t">H3 · 24px</span><p style="font-size:24px;font-weight:600">Build stronger teams</p></div>
        <div class="r"><span class="t">Body · 16px</span><p style="font-size:16px;font-weight:400">Every applicant arrives scored against the same bar.</p></div>
        <div class="r"><span class="t">Caption · 12px</span><p style="font-size:12px;font-weight:500;letter-spacing:.04em">Shortlisted · 2 min ago</p></div>
      </div>
    </div>
  </section>

  <!-- close. Oct 20 2026 6:44 PM, her words "this should be thanks for scrolling / product designer Ajufo adaikem / like that warble and hm trades ending / leave that visit auxhr" -->
  <section class="ax ax-sec rv" id="ax-close">
    <div class="ax-thanks">
      <div class="th-rings" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="th-react" aria-hidden="true"><span><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 5.4 3.2C13.8 6.2 15.3 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z"/></svg></span><span><svg viewBox="0 0 24 24"><path d="M22 3 2 11l7 3 3 7 10-18z"/><path d="M9 14l5-5"/></svg></span><span><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg></span></div>
      <h2 class="th-h">Thank You For Scrolling!</h2>
      <span class="th-by">Case Study By</span>
      <p class="th-name">Adaikem Ajufo</p>
      <span class="th-role">Product Designer</span>
      <a class="cta" href="https://www.auxhr.com" target="_blank" rel="noopener">Visit auxhr.com ↗</a>
    </div>
  </section>`;

  gal.innerHTML = html;
  /* the film sits in the hero, between the title/meta and the lede (her 6:32 PM ask) */
  { const f = gal.querySelector("#ax-film"), hero = document.querySelector("#case .case-hero"); if(f && hero){ const t = hero.querySelector(".case-text"); t ? hero.insertBefore(f, t) : hero.appendChild(f); } }
  if(window.vhydrate) vhydrate(gal);
  const els = gal.querySelectorAll(".rv");
  if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{rootMargin:"0px 0px -6% 0px"});
    els.forEach(el=>io.observe(el));
  } else els.forEach(el=>el.classList.add("in"));
  const lb = ()=>window.TBLightbox && TBLightbox.bind(gal);
  if(window.TBLightbox) lb(); else document.addEventListener("DOMContentLoaded", ()=>setTimeout(lb,300));
  /* smooth anchors inside the page */
  gal.querySelectorAll('.ax-toc a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{ const t=document.getElementById(a.getAttribute("href").slice(1)); if(t){ e.preventDefault(); t.scrollIntoView({behavior:"smooth",block:"start"}); } }));
})();
