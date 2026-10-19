/* AuxHR case study: the story blocks. Loaded only by case/auxhr.html after case.js. Text lives here; shared hero/meta/footer come from case.js + content.js. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal) return;
  const A = "../assets/cases/auxhr/";
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const win = (src, url, alt, cls="")=>`<div class="ax-win ${cls}"><div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div>`;
  const phone = (src, alt)=>`<div class="ax-phone"><div class="scr"><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div></div>`;
  const eyebrow = (n, t)=>`<div class="ax-eyebrow"><b>${n}</b><i></i>${esc(t)}</div>`;
  const stage = (inner, cap, cls="", capCls="")=>`<div class="ax-stage ${cls}">${cap?`<span class="ax-cap ${capCls}"><i></i>${esc(cap)}</span>`:""}${inner}</div>`;
  const row = (k, h, p, dec, media, flip)=>`<div class="ax-row ${flip?"flip":""} rv"><div class="ax-row-text"><span class="ax-k">${esc(k)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p>${dec?`<div class="ax-dec"><b>Design decision.</b> ${esc(dec)}</div>`:""}</div>${media}</div>`;
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

  const html = `
  <!-- 00 hero visual -->
  <section class="ax ax-sec tight rv" id="ax-live">
    <div class="ax-stage ax-hero2"><span class="ax-wm" aria-hidden="true">AuxHR</span>
      <div class="ax-hero2-win">${win("dash_r1.webp","app.auxhr.com · dashboard","AuxHR recruiter dashboard")}</div>
      <div class="ax-hero2-card"><img src="${A}live_brief.webp" alt="Candidate diagnostic brief" loading="lazy" decoding="async"></div>
      <span class="ax-cap rec" style="left:auto;right:28px"><i></i>Recruiter dashboard</span>
    </div>
    <div class="ax-facts">
      <div><span class="foot-label">Role</span><span class="v">Associate Design Lead. Product, UX and UI across both sides, the AI configuration flow, the marketing site and the design system</span></div>
      <div><span class="foot-label">Timeline</span><span class="v">2025 to 2026. MVP first, then the full redesign; recruiter site live October 2026</span></div>
      <div><span class="foot-label">Platform</span><span class="v">Web app, desktop and mobile. React front end</span></div>
      <div><span class="foot-label">Company</span><span class="v">SalesPlat Technologies, Lagos. AuxHR is in beta with selected businesses and talent</span></div>
    </div>
    <nav class="ax-toc" aria-label="Contents">
      ${[["01","Overview","ax-about"],["02","Problem","ax-problem"],["03","Goal","ax-goal"],["04","Solution","ax-solution"],["05","Process","ax-process"],["06","Brand","ax-brand"],["I","Talent","ax-talent"],["II","Recruiters","ax-rec"],["III","AI configuration","ax-ai"],["07","Style guide","ax-style"],["08","Landscape","ax-comp"]].map(([n,t,id])=>`<a href="#${id}"><b>${n}</b>${t}</a>`).join("")}
    </nav>
  </section>

  <!-- 01 about -->
  <section class="ax ax-sec rv" id="ax-about">
    ${eyebrow("01","About the project")}
    <h2 class="ax-h2">One hiring platform, built for the two people who never meet until the interview.</h2>
    <p class="ax-lede">AuxHR is SalesPlat's AI-powered talent acquisition platform. Businesses list roles, screen applicants and hire with automation doing the repetitive work. Talent builds one profile, gets matched to roles that genuinely fit, takes assessments inside the flow and sees where every application stands.</p>
    <p class="ax-lede">The first designs shipped fast as an MVP. Using it showed us where the screens got in the way, so we went back to how recruiters and candidates actually move through a hiring week and redesigned the whole product around it. I led that redesign.</p>
    ${stage(`<div class="ax-hero-stage">${win("live_home_fold.webp","auxhr.com","AuxHR recruiter site, live at auxhr.com")}${phone("live_home_fold_m.webp","AuxHR site on a phone")}</div>`, "Live · auxhr.com", "", "")}
    <div class="ax-under"><span>The recruiter site as it is live today, desktop and phone. Every screen below is the shipped product; anything still in design is labelled.</span><a href="https://www.auxhr.com" target="_blank" rel="noopener">Open auxhr.com ↗</a></div>
    <div class="ax-grid c3">
      <div class="ax-card rec"><span class="ax-tag"><i></i>Recruiters</span><h4>Hiring managers and talent teams</h4><p>Startups, agencies and growing businesses that need to fill roles fast without reading every CV by hand. They own the job description and the bar.</p></div>
      <div class="ax-card talent"><span class="ax-tag"><i></i>Talent</span><h4>Job seekers at every stage</h4><p>From a support specialist with five years in startups to a graduate UX writer. They want to be seen for what they can do, apply without retyping their life, and hear back.</p></div>
      <div class="ax-card ai"><span class="ax-tag"><i></i>The engine</span><h4>AI configuration</h4><p>The feature AuxHR is built around. Recruiters set the questions, weights and pass marks once; the AI tests every applicant against them and filters unqualified CVs before a human reads them.</p></div>
    </div>
  </section>

  <!-- 02 problem -->
  <section class="ax ax-sec rv" id="ax-problem">
    ${eyebrow("02","The problem")}
    <h2 class="ax-h2">Hiring breaks in both directions.</h2>
    <p class="ax-lede">The product requirements and the user research named the same pains from two sides of the table.</p>
    <div class="ax-grid c2">
      <div class="ax-card rec"><span class="ax-tag"><i></i>For recruiters</span>
        <ul><li>Too much time on manual tasks: reading CVs one by one, the same outreach again and again.</li><li>Unqualified applicants flooding every post, so the strong ones get lost in the pile.</li><li>No visibility into the overall pipeline. Candidates stall, hiring managers ask for updates nobody has.</li><li>Specialised skills are hard to find from a CV alone, and hard to compare fairly across people.</li></ul></div>
      <div class="ax-card talent"><span class="ax-tag"><i></i>For talent</span>
        <ul><li>Long, repetitive application forms that ask for the CV they just uploaded.</li><li>Silence after applying. No idea whether anyone looked, or what happens next.</li><li>Specialised skills and certifications are hard to highlight to the people deciding.</li><li>Entry-level candidates compete blind: no clarity on what recruiters are actually looking for.</li></ul></div>
    </div>
    <div class="ax-grid c1" style="grid-template-columns:1fr"><div class="ax-card"><h4>And the MVP added a third problem</h4><p>Screens built for speed, each flow its own page, no shared language between the recruiter side and the talent side. It proved the idea. It did not yet feel like a product people could trust with their hiring.</p></div></div>
  </section>

  <!-- 03 goal -->
  <section class="ax ax-sec rv" id="ax-goal">
    ${eyebrow("03","Goal of the product")}
    <h2 class="ax-h2">Bridge the rift between open roles and the people who fit them.</h2>
    <p class="ax-lede">AuxHR's stated aim is to help businesses generate real salary worth of jobs and help talent land offers without the friction. The redesign translated that into three design goals.</p>
    <div class="ax-grid c3">
      <div class="ax-card"><div class="ax-num">1</div><h4>Score first, read second</h4><p>Every applicant should arrive with a CV match, screening answers and personality fit already in front of the recruiter, so reading starts with the right people.</p></div>
      <div class="ax-card"><div class="ax-num">2</div><h4>One structure, both sides</h4><p>Recruiters and talent should recognise the same product: one left rail, one workspace, one card language, one set of statuses that mean the same thing on either side.</p></div>
      <div class="ax-card"><div class="ax-num">3</div><h4>Never leave anyone guessing</h4><p>A role, an application or a candidate should always show what stage it is at and what happens next. No dead ends, no silence.</p></div>
    </div>
  </section>

  <!-- 04 solution -->
  <section class="ax ax-sec rv" id="ax-solution">
    ${eyebrow("04","The solution")}
    <h2 class="ax-h2">Set the criteria once. Let the platform run the pipeline with you.</h2>
    <p class="ax-lede">A recruiter creates a role and configures how the AI screens it. Talent applies in one click from a profile that already carries their experience. The AI matches CVs, runs pre-screening and personality assessments, scores everyone against the same bar and moves qualified people forward automatically. Both sides watch the same pipeline from their own dashboard.</p>
    ${stage(win("live_steps.webp","auxhr.com · how it works","How AuxHR works: create your role, let AI find the fit, review your matches, make your move"), "How it works · live", "deep")}
    <div class="ax-grid c3">
      <div class="ax-card talent"><span class="ax-tag"><i></i>Talent side</span><h4>Profile, matches, assessments, applications</h4><p>One profile does the applying. Roles ranked by real fit. Assessments inside the flow with results shared back instantly. One list of applications with a status on each.</p></div>
      <div class="ax-card rec"><span class="ax-tag"><i></i>Recruiter side</span><h4>Job posts, candidates, pipeline, dashboard</h4><p>Rich job creation. Every application sorted, filtered and scored on arrival. Candidate briefs instead of raw CVs. One click from Applied to Shortlisted.</p></div>
      <div class="ax-card ai"><span class="ax-tag"><i></i>AI configuration</span><h4>Questions, weights, pass marks, CV rules</h4><p>Set per role by the hiring manager: screening questions with score ratings, personality test combinations, CV matching requirements in plain words. Applied to every applicant the same way.</p></div>
    </div>
  </section>

  <!-- 05 process -->
  <section class="ax ax-sec rv" id="ax-process">
    ${eyebrow("05","Design process")}
    <h2 class="ax-h2">From a PRD and four personas to a live product.</h2>
    <p class="ax-lede">The work ran in the open with product and engineering: the requirements doc set the features, the personas set the priorities, the MVP taught us what to fix, and the redesign shipped in parts, marketing site first.</p>
    <div class="ax-steps">
      <div class="ax-step"><b>01</b><h4>Requirements</h4><p>PRD: target market, feature list, user stories, competitors, hardware. The spine for every decision.</p></div>
      <div class="ax-step"><b>02</b><h4>Personas</h4><p>Paul the experienced support specialist, Clara the entry-level UX writer, Philip the startup recruiter, Sarah the SME HR manager.</p></div>
      <div class="ax-step"><b>03</b><h4>Flows</h4><p>Role creation with screening setup, apply with pre-assessment, pipeline stages, notifications on every status change.</p></div>
      <div class="ax-step"><b>04</b><h4>MVP</h4><p>Shipped fast to selected businesses and talent. Watched how people really used it. Listed what the screens hid.</p></div>
      <div class="ax-step"><b>05</b><h4>Redesign</h4><p>New structure, new brand surface, one component language, recruiter and talent sites, both dashboards and the AI configuration flow.</p></div>
      <div class="ax-step"><b>06</b><h4>Ship and iterate</h4><p>Recruiter site live at auxhr.com. Talent landing designed and in build. Dashboards rolling out to beta users.</p></div>
    </div>
    <div class="ax-duo">
      ${stage(win("fig_recruiter_full.webp","Figma · Recruiter landing page","Recruiter landing page, full design in Figma","tall"), "Redesign in Figma · recruiter site", "deep", "rec")}
      ${stage(win("fig_talent_full.webp","Figma · Talent landing page","Talent landing page, full design in Figma","tall"), "Redesign in Figma · talent site", "deep", "talent")}
    </div>
    <p class="ax-note">Both pages scroll inside their frame. Desktop and 375 px mobile versions were designed side by side; the same components carry both.</p>
  </section>

  <!-- 06 brand -->
  <section class="ax ax-sec rv" id="ax-brand">
    ${eyebrow("06","Branding")}
    <h2 class="ax-h2">From SupportPro to AuxHR.</h2>
    <p class="ax-lede">The product began inside SalesPlat as SupportPro, a vetted-talent and recruitment service whose software grew into a hiring platform. The name described a helper; the product had become infrastructure. As AI screening moved to the centre it needed a name that could sit beside the HR tools it plugs into. AuxHR: the auxiliary layer that does the heavy lifting beside an HR team. SupportPro continues as SalesPlat's recruitment-services brand; AuxHR is the software.</p>
    <div class="ax-brand">
      <div class="ax-logo old light"><span class="lab">Before · SupportPro</span><img src="${A}brand_supportpro_wordmark.png" alt="SupportPro wordmark" style="max-width:78%"></div>
      <div class="ax-arrow">→</div>
      <div class="ax-logo new light"><span class="lab">After · AuxHR</span><img src="${A}brand_auxhr_mark.png" alt="AuxHR logo" style="max-height:120px"></div>
    </div>
    <div class="ax-grid c3">
      <div class="ax-card"><h4>Name and mark</h4><p>SupportPro was a wordmark with a red speed swoosh, the language of a services agency. AuxHR gets a proper mark: a rounded "a" built from parallel lines that read as pathways and a play arrow, the product moving candidates forward. Blue only, no second accent.</p></div>
      <div class="ax-card"><h4>What carried over</h4><p>The blue family stayed so the hand-off felt like growth, not a reset: the SupportPro primary #4985df lives on as the launch site's brand blue, and Raleway stayed the headline face through the transition. The co-branded "Top HR platform by SalesPlat | SupportPro" line bridged the two names during beta.</p></div>
      <div class="ax-card"><h4>What changed</h4><p>Positioning moved from "hire our vetted talents" to "your team hires better with AI". The palette gained depth: indigo and violet gradients for hero and metric surfaces, cyan for live signals, beige for calm panels. Voice got shorter: "Hire better. Move faster. Build stronger teams."</p></div>
    </div>
    <div class="ax-grid c3">
      <div class="ax-stage beige" style="padding:0;overflow:hidden;border-radius:22px;min-height:300px;display:flex;align-items:flex-end"><img src="${A}brand_supportpro_banner.webp" alt="SupportPro LinkedIn banner: Experience Business Exponential Growth with our Top Vetted Talents" loading="lazy" data-lb="case" data-cap="SupportPro, the services brand" style="display:block;width:100%"><span class="ax-cap" style="position:absolute;left:14px;top:12px;font-size:11px;padding:6px 10px">SupportPro · services brand</span></div>
      <div class="ax-stage deep" style="padding:0;overflow:hidden;border-radius:22px;display:flex;justify-content:center"><img src="${A}brand_auxhr_first_post.webp" alt="First public AuxHR creative: Struggling with getting the best talents? Another job board isn't the solution, use AuxHR" loading="lazy" data-lb="case" data-cap="First AuxHR creative, July 2025" style="display:block;height:300px;width:auto"><span class="ax-cap" style="position:absolute;left:14px;top:12px;font-size:11px;padding:6px 10px">AuxHR · first public creative, July 2025</span></div>
      <div class="ax-stage soft" style="padding:0;overflow:hidden;border-radius:22px"><img src="${A}brand_auxhr_og.webp" alt="AuxHR social card: AI-powered hiring that finds the right fit" loading="lazy" data-lb="case" data-cap="AuxHR social card, 2026" style="display:block;width:100%;height:300px;object-fit:cover"><span class="ax-cap" style="position:absolute;left:14px;top:12px;font-size:11px;padding:6px 10px">AuxHR · social card, 2026</span></div>
    </div>
    <div class="ax-steps c5">
      <div class="ax-step"><b>2022</b><h4>SupportPro</h4><p>SalesPlat's recruitment brand: vetted talents for growth, sales and support teams.</p></div>
      <div class="ax-step"><b>2024</b><h4>SupportPro, the software</h4><p>The first hiring product ships under the services name. Blue wordmark, Raleway, a quick MVP.</p></div>
      <div class="ax-step"><b>2025</b><h4>AuxHR named</h4><p>The platform gets its own name and mark. First AuxHR creatives go public in July; the site runs co-branded with SupportPro through beta.</p></div>
      <div class="ax-step"><b>2026</b><h4>Redesign</h4><p>New visual system, both landing pages, both dashboards, AI configuration flow. Last SupportPro traces leave the UI.</p></div>
      <div class="ax-step"><b>Oct 2026</b><h4>auxhr.com live</h4><p>The redesigned recruiter site ships. Talent site in build. Dashboards rolling out to beta users.</p></div>
    </div>
    <p class="ax-note">Brand history from SalesPlat's and AuxHR's public LinkedIn pages, the public SupportPro front-end repository and auxhr.com. Old assets shown as found, not redrawn.</p>
  </section>

  <!-- 07 talent -->
  <section class="ax ax-sec rv" id="ax-talent">
    ${eyebrow("The product · chapter I","Talent")}
    <div class="ax-pillar"><span class="ax-pill talent"><i></i>Talent side</span></div>
    <h2 class="ax-h2">Stand out. Get matched. <em>Land the role.</em></h2>
    <p class="ax-lede">One profile carries skills, experience and certifications into every application. AuxHR surfaces roles where the experience is a genuine match, runs the assessments, and shows exactly where each application stands.</p>
    ${stage(win("dash_t5.webp","app.auxhr.com · talent dashboard","Talent dashboard: matched roles ranked by fit, profile strength, applications and assessments at a glance"), "Talent dashboard", "", "talent")}
    <div class="ax-rows">
      ${row("Discover","Roles ranked by real fit, not posting date","Talent sees matched roles with a fit score, salary range and requirements visible before applying. Open roles are grouped; strongest fits rise to the top.","The fit score sits on the card, not behind a click. If AuxHR is going to rank people, talent should see the same number recruiters see.", img("fig_talent_f1.webp","Discover the right roles","beige"), false)}
      ${row("Assess","Assessments inside the flow, results shared back","Pre-screening and personality assessments run when a role asks for them. Talent takes the test as part of applying, gets the result immediately and moves to the next stage automatically when they pass.","Progress, time left and the question are the only three things on screen. Everything else waits.", pad("dash_t6.webp","app.auxhr.com · assessment","Talent assessment screen: one question at a time with progress and timer"), true)}
      ${row("Track","Every application in one place, with a status that means something","Applied, In review, Assessment, Interview, Offer. The same stage names the recruiter uses, so the talent view is a true mirror of the pipeline. Reminders land before assessments and interviews.","No silence after applying. If a status has not changed, the card still says what the next step is.", pad("dash_t7.webp","app.auxhr.com · my applications","Talent applications list with stage and status per role"), false)}
      ${row("Apply","Apply to any role in one click","No repeated forms. The profile carries over, recruiters get full context instantly, and an application can be updated or withdrawn from the same list.","The apply button is the whole flow. Anything that needed another form was moved into the profile, once.", img("fig_talent_apply.webp","Apply to any role in one click","beige"), true)}
    </div>
    <div class="ax-duo">
      ${stage(win("fig_talent_hero.webp","auxhr.com · talent","Talent landing page hero: Stand out. Get matched. Land your dream role."), "Talent landing · designed, in build", "deep", "talent")}
      ${stage(`<div style="display:flex;justify-content:center">${phone("fig_m_talent_hero.webp","Talent landing page on a phone")}</div>`, "Talent landing · mobile", "deep", "talent")}
    </div>
  </section>

  <!-- intermission -->
  <section class="ax ax-sec rv" id="ax-film">
    ${eyebrow("Intermission","The launch film")}
    <h2 class="ax-h2">Sixty seconds of the product in motion.</h2>
    <p class="ax-lede">Recruiters first, then talent: a role goes up, the AI screens, the shortlist forms, the candidate gets the news. Tap to play, sound on.</p>
    <div class="ax-video" style="margin-top:32px"><video data-vsrc="../assets/media/motion_auxhr3.mp4" poster="../assets/media/motion_auxhr3.jpg" controls playsinline preload="none" data-noauto="1" width="1920" height="1080"></video></div>
  </section>

  <!-- 08 recruiters -->
  <section class="ax ax-sec rv" id="ax-rec">
    ${eyebrow("The product · chapter II","Recruiters")}
    <div class="ax-pillar"><span class="ax-pill rec"><i></i>Recruiter side</span></div>
    <h2 class="ax-h2">Hire better. <em>Move faster.</em></h2>
    <p class="ax-lede">Post a role once. Every applicant arrives scored against the criteria, the pipeline updates live as people move through it, and hiring managers, recruiters and interviewers work from one view.</p>
    ${stage(win("dash_r1.webp","app.auxhr.com · recruiter dashboard","Recruiter dashboard: open roles, applicants, shortlisted and time to hire; recent candidates with match and stage; the week's pipeline"), "Recruiter dashboard", "", "rec")}
    <div class="ax-rows">
      ${row("Pipeline","Candidates, already scored","Each candidate row carries a CV match, a screening score and a personality fit, plus the stage they are at. Filter by match, stage or status. Move someone from Applied to Shortlisted in one click.","Scores are shown as plain percentages with a single colour scale across the product, so a 71 means the same thing in a list, a brief and a dashboard tile.", pad("dash_r3.webp","app.auxhr.com · candidates","Candidates list with CV match, screening and personality scores per person"), false)}
      ${row("Brief","A candidate brief, not a CV to decode","The profile page leads with the three scores, then strong matches, what to explore in the interview and why this person stands out. The next step is already suggested.","Reasoning next to the number. Recruiters told us a score alone is something they argue with; a score with its evidence is something they act on.", pad("dash_r4.webp","app.auxhr.com · candidate","Candidate profile with diagnostic brief, strong matches and suggested next step"), true)}
      ${row("Roles","Job posts with the state of each role in one list","Open and closed roles, department, type and applicant count. Rich job creation with role, requirements and salary range. Every application that comes in is already sorted and filtered.","One list, no tabs. A recruiter with four open roles should see all four and their counts without clicking.", img("live_jobs.webp","Job posts list: Sales Representative, Product Designer, Backend Engineer with applicant counts","beige"), false)}
      ${row("Team","Collaborative hiring in one workspace","Hiring managers, recruiters and executives aligned on sourcing, scorecards, interview scheduling and offer letters. Zero tab switching.","People, not permissions. The team view shows faces and roles first; the access rules sit behind them.", img("live_collab.webp","Collaborative hiring: hiring managers and recruiters in one workspace","beige"), true)}
    </div>
    <div class="ax-strip">
      ${stage(`<img src="${A}live_brief.webp" alt="Candidate diagnostic brief card" loading="lazy" data-lb="case" data-cap="Candidate diagnostic brief">`, "Diagnostic brief · live", "", "rec")}
      ${stage(`<img src="${A}live_stats.webp" alt="Pipeline stats card" loading="lazy" data-lb="case" data-cap="Pipeline stats">`, "Pipeline at a glance · live", "soft", "rec")}
      ${stage(`<img src="${A}live_candidate.webp" alt="Candidate card with fit score" loading="lazy" data-lb="case" data-cap="Candidate card">`, "Candidate card · live", "deep", "rec")}
    </div>
  </section>

  <!-- 09 AI configuration -->
  <section class="ax ax-sec rv" id="ax-ai">
    ${eyebrow("The product · chapter III","AI configuration")}
    <div class="ax-pillar"><span class="ax-pill ai"><i></i>The engine</span></div>
    <h2 class="ax-h2">Set the bar once. The AI holds <em>everyone</em> to it.</h2>
    <p class="ax-lede">This is the feature AuxHR is built around, and the part a hiring manager touches most. While posting a role, the recruiter configures how the AI screens: the questions and their score ratings, the personality test combination, the CV requirements in their own words, and how much each one weighs. Every applicant is then tested against the same criteria. Unqualified CVs are filtered before a human reads them, and candidates receive their result and move forward automatically.</p>
    ${stage(win("dash_r2.webp","app.auxhr.com · post a job · screening","Post a job, step 2 of 3: screening setup with skill weights, pre-screening questions and personality assessment toggles"), "Post a job · screening setup", "", "")}
    <div class="ax-grid c4">
      <div class="ax-card ai"><span class="ax-tag"><i></i>Screening questions</span><h4>Set by the hiring manager</h4><p>Role-specific questions with a score rating each. Years managing a pipeline, experience with CRM reporting, comfort with quota targets.</p></div>
      <div class="ax-card ai"><span class="ax-tag"><i></i>Weights</span><h4>Skills that matter most count most</h4><p>The recruiter weights the skills a role requires. The AI scores the CV against those weights, not against keywords.</p></div>
      <div class="ax-card ai"><span class="ax-tag"><i></i>Personality fit</span><h4>Test combinations per role</h4><p>Trait profiles combined with role expectations to see who will thrive, not only who qualifies.</p></div>
      <div class="ax-card ai"><span class="ax-tag"><i></i>CV matching</span><h4>Requirements in plain words</h4><p>The resume is benchmarked against what the role actually needs, written the way the recruiter would say it.</p></div>
    </div>
    <div class="ax-rows">
      ${row("Output","Three scores that travel with the candidate","CV match, screening answers and personality fit. They appear on the candidate card, in the pipeline and in the brief, and they update as the candidate completes each stage.","The weights live on the role, the scores live on the person. Changing a role's criteria never rewrites a candidate's history.", img("live_scores.webp","CV Match, Screening Answers and Personality Fit scores","pad"), false)}
      ${row("Design","The configuration screen itself","Setting up screening is a three-step post flow: role details, screening setup, publish. Toggles switch each assessment on, sliders carry the weights, and a live preview of what the candidate will see sits beside it.","Defaults do the first draft. A recruiter can publish with sensible weights in a minute, then tune. Configuration is never a wall of empty fields.", img("fig_feat_ai.webp","AI Configuration and CV Matching: set the questions, weights and benchmarks once","beige"), true)}
    </div>
  </section>

  <!-- 10 style guide -->
  <section class="ax ax-sec rv" id="ax-style">
    ${eyebrow("07","Style guide")}
    <h2 class="ax-h2">A system built to carry two audiences.</h2>
    <p class="ax-lede">Eight colour ramps, one type family, soft surfaces and a small set of components used identically on the recruiter and talent sides.</p>
    <div class="ax-ramps">${ramps}</div>
    <p class="ax-note">Blue 600 #213aff is the primary. Gradients run Blue 300 #91b6ff to Violet 400 #5d3eff; the metrics band runs Violet 300 through Blue 500 into Violet 950. Hover a swatch for its step and hex.</p>
    <div class="ax-type">
      <div class="ax-card ax-spec"><span class="mono">General Sans Variable · 400 / 500 / 600</span><p class="big" style="margin-top:14px">Hire better. Move faster.<br>Build stronger teams.</p><p class="mid">Recruitment shouldn't require hours of repetitive work.</p><p class="body">AuxHR uses AI to help your team quickly understand candidate profiles, match CVs, identify relevant matches and surface useful insights throughout the hiring process.</p><span class="mono">Hero 60/1.1 · Section 40/47 · Lede 20/30 · Body 16/24 · Label 14 · Mono labels 12 caps</span></div>
      <div class="ax-card"><span class="ax-tag"><i style="background:var(--ax-violet)"></i>Surfaces</span><h4>Soft, rounded, calm</h4><p>Beige 50 #f5f3ee panels at 24 px radius. White cards with a 16 px radius and one shadow across the product: 0 24 60 at 28% of Navy 950. Gradients only on hero and metric surfaces; everything a user edits sits on flat colour.</p><div style="margin-top:22px" class="ax-abc">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789</div></div>
    </div>
    <div class="ax-comp">
      ${stage(`<img src="${A}live_scores.webp" alt="Score card component" loading="lazy" data-lb="case" data-cap="Score card"><span class="lab">Score card</span>`, "", "deep")}
      ${stage(`<img src="${A}live_jobs.webp" alt="Job list component" loading="lazy" data-lb="case" data-cap="Job list"><span class="lab">Job list</span>`, "", "beige")}
      ${stage(`<img src="${A}live_journey.webp" alt="Candidate journey timeline component" loading="lazy" data-lb="case" data-cap="Candidate journey timeline"><span class="lab">Journey timeline</span>`, "", "soft")}
    </div>
  </section>

  <!-- 08 competitors -->
  <section class="ax ax-sec rv" id="ax-comp">
    ${eyebrow("08","Competitive landscape")}
    <h2 class="ax-h2">Where AuxHR sits.</h2>
    <p class="ax-lede">The requirements work mapped the tools hiring teams already pay for. Most are strong at one end of the funnel: sourcing, or tracking, or technical tests. AuxHR's position is the middle, configurable AI screening that both sides of the hire can see, built for teams that may not have an HR department at all.</p>
    <div class="ax-matrix">
      <div class="mr head"><span>Capability</span><b>AuxHR</b><span>Workable</span><span>Greenhouse</span><span>Indeed</span></div>
      ${[
        ["AI screens and scores every application against the recruiter's own criteria", 1,1,1,1],
        ["Screening questions with pass marks set per role", 1,1,1,1],
        ["Personality and role-fit assessment built into the apply flow", 1,1,0,0],
        ["CV match, screening and personality shown as three separate scores on the candidate", 1,0,0,0],
        ["Candidate gets the assessment result and moves forward automatically", 1,0,0,0],
        ["Talent dashboard: every application with its stage, on the same platform", 1,0,0,2],
        ["Collaborative pipeline: team, scorecards, interviews, offers", 1,1,1,2],
        ["One product for recruiters and talent, not an employer-only tool", 1,0,0,1]
      ].map(([c,...v])=>`<div class="mr"><span>${esc(c)}</span>${v.map((x,i)=>`<b data-n="${["AuxHR","Workable","Greenhouse","Indeed"][i]}" class="${i===0?"me":""} ${x===1?"y":x===2?"p":"n"}">${x===1?"✓":x===2?"partly":"–"}</b>`).join("")}</div>`).join("")}
    </div>
    <p class="ax-note">Read from each product's public site in October 2026: Workable (AI Screening Assistant, Workable Assessments, collaborative hiring), Greenhouse (AI application review, scorecards, structured interviews; assessments through marketplace partners), Indeed (Smart Screening, screener questions, job-seeker application status). "Partly" means the capability exists in a narrower form. AuxHR items are the shipped product.</p>
  </section>

  <!-- close -->
  <section class="ax ax-sec rv" id="ax-close">
    <div class="ax-close">
      ${eyebrow("Close","What the redesign changed")}
      <h2 class="ax-h2">Recruiters open AuxHR to a scored shortlist, not a stack of CVs.</h2>
      <p class="ax-lede">Talent applies once and is never left guessing. And the AI is something the team configures in plain language, not a black box. The recruiter site is live, the talent site is in build, and the dashboards are rolling out to beta users. More features land as they ship.</p>
      <a class="cta" href="https://www.auxhr.com" target="_blank" rel="noopener">Visit auxhr.com ↗</a>
    </div>
  </section>`;

  gal.innerHTML = html;
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
