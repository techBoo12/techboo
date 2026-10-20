/* AuxHR case study: the story blocks. Oct 20 2026: shortened on her word ("too long"); full previous version in files/auxhr_case/short_v1/auxhr-case.BEFORE.js. Loaded only by case/auxhr.html after case.js. Text lives here; shared hero/meta/footer come from case.js + content.js. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal) return;
  const A = "../assets/cases/auxhr/";
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const win = (src, url, alt, cls="")=>`<div class="ax-win ${cls}"><div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div>`;
  const phone = (src, alt)=>`<div class="ax-phone"><div class="scr"><img src="${A}${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div></div>`;
  const eyebrow = (n, t)=>`<div class="ax-eyebrow"><b>${n}</b><i></i>${esc(t)}</div>`;
  const stage = (inner, cap, cls="", capCls="")=>`<div class="ax-stage ${cls}">${cap?`<span class="ax-cap ${capCls}"><i></i>${esc(cap)}</span>`:""}${inner}</div>`;
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

  const html = `
  <!-- 00 hero visual -->
  <section class="ax ax-sec tight rv" id="ax-live">
    <div class="ax-stage ax-hero2"><span class="ax-wm" aria-hidden="true">AuxHR</span>
      <div class="ax-hero2-win">${win("dash_r1.webp","app.auxhr.com · dashboard","AuxHR recruiter dashboard")}</div>
      <div class="ax-hero2-card"><img src="${A}live_brief.webp" alt="Candidate diagnostic brief" loading="lazy" decoding="async"></div>
      <span class="ax-cap rec" style="left:auto;right:28px"><i></i>Recruiter Dashboard</span>
    </div>
  </section>

  <!-- overview: about, problem, goal, solution. Oct 20 2026: rebalanced after the short cut went too far ("why did you remove all the problems solution"); all wording trimmed from short_v1/auxhr-case.BEFORE.js -->
  <section class="ax ax-sec tight rv" id="ax-overview">
    ${eyebrow("Overview","About The Project")}
    <p class="ax-lede">AuxHR is SalesPlat's AI-powered talent acquisition platform. The first designs shipped fast as an MVP; using it showed us where the screens got in the way, so we redesigned the whole product around how recruiters and candidates actually move through a hiring week. I led that redesign.</p>

    <div style="margin-top:56px">${eyebrow("Overview","The Problem")}</div>
    <h2 class="ax-h2">Hiring breaks in both directions.</h2>
    <p class="ax-lede">The product requirements and the user research named the same pains from two sides of the table. The MVP proved the idea, but each flow was its own page, with no shared language between the recruiter side and the talent side.</p>
    <div class="ax-grid c2">
      <div class="ax-card rec"><span class="ax-tag"><i></i>Recruiter</span>
        <ul><li>Too much time on manual tasks: reading CVs one by one, the same outreach again and again.</li><li>Unqualified applicants flooding every post, so the strong ones get lost in the pile.</li><li>No visibility into the overall pipeline. Candidates stall, hiring managers ask for updates nobody has.</li><li>Specialised skills are hard to find from a CV alone, and hard to compare fairly across people.</li></ul></div>
      <div class="ax-card talent"><span class="ax-tag"><i></i>Talent</span>
        <ul><li>Long, repetitive application forms that ask for the CV they just uploaded.</li><li>Silence after applying. No idea whether anyone looked, or what happens next.</li><li>Specialised skills and certifications are hard to highlight to the people deciding.</li><li>Entry-level candidates compete blind: no clarity on what recruiters are actually looking for.</li></ul></div>
    </div>

    <div class="ax-card" style="margin-top:22px"><span class="ax-tag"><i></i>Goal</span><p>Bridge the rift between open roles and the people who fit them.</p></div>

    <div style="margin-top:56px">${eyebrow("Overview","The Solution")}</div>
    <h2 class="ax-h2">Set the criteria once. Let the platform run the pipeline with you.</h2>
    <p class="ax-lede">A recruiter creates a role and configures how the AI screens it. Talent applies in one click from a profile that already carries their experience. The AI scores everyone against the same bar, and both sides watch the same pipeline from their own dashboard.</p>
    <div class="ax-grid c3">
      <div class="ax-card rec"><span class="ax-tag"><i></i>Recruiter</span><p>Every application sorted, filtered and scored on arrival. Candidate briefs instead of raw CVs.</p></div>
      <div class="ax-card talent"><span class="ax-tag"><i></i>Talent</span><p>One profile does the applying. Roles ranked by real fit, with a status on every application.</p></div>
      <div class="ax-card ai"><span class="ax-tag"><i></i>AI Configuration</span><p>Screening questions, weights and pass marks set per role by the hiring manager, applied to every applicant the same way.</p></div>
    </div>
  </section>

  <!-- chapter I: talent -->
  <section class="ax ax-sec rv" id="ax-talent">
    ${eyebrow("Chapter I","Talent")}
    <h2 class="ax-h2">Stand out. Get matched. <em>Land the role.</em></h2>
    ${stage(win("dash_t5.webp","app.auxhr.com · talent dashboard","Talent dashboard: matched roles ranked by fit, profile strength, applications and assessments at a glance"), "Talent Dashboard", "", "talent")}
    <div class="ax-rows">
      ${row("Discover","Roles ranked by real fit, not posting date","Fit score, salary range and requirements are visible before applying.","", img("fig_talent_f1.webp","Discover the right roles","beige"), false)}
      ${row("Assess","Assessments inside the flow, results shared back","Talent takes the test as part of applying and moves on automatically when they pass.","", pad("dash_t6.webp","app.auxhr.com · assessment","Talent assessment screen: one question at a time with progress and timer"), true)}
      ${row("Track","Every application in one place, with a status that means something","The same stage names the recruiter uses, so the talent view mirrors the pipeline.","", pad("dash_t7.webp","app.auxhr.com · my applications","Talent applications list with stage and status per role"), false)}
      ${row("Apply","Apply to any role in one click","No repeated forms. The profile carries over.","", img("fig_talent_apply.webp","Apply to any role in one click","beige"), true)}
    </div>
    <div class="ax-duo">
      ${stage(win("fig_talent_hero.webp","auxhr.com · talent","Talent landing page hero: Stand out. Get matched. Land your dream role."), "Talent Landing · Designed, In Build", "deep", "talent")}
      ${stage(`<div style="display:flex;justify-content:center">${phone("fig_m_talent_hero.webp","Talent landing page on a phone")}</div>`, "Talent Landing · Mobile", "deep", "talent")}
    </div>
  </section>

  <!-- film -->
  <section class="ax ax-sec rv" id="ax-film">
    ${eyebrow("Film","The Product In Motion")}
    <div class="ax-video" style="margin-top:24px"><video data-vsrc="../assets/media/motion_auxhr3.mp4" poster="../assets/media/motion_auxhr3.jpg" controls playsinline preload="none" data-noauto="1" width="1920" height="1080"></video></div>
  </section>

  <!-- chapter II: recruiter -->
  <section class="ax ax-sec rv" id="ax-rec">
    ${eyebrow("Chapter II","Recruiter")}
    <h2 class="ax-h2">Hire better. <em>Move faster.</em></h2>
    ${stage(win("dash_r1.webp","app.auxhr.com · recruiter dashboard","Recruiter dashboard: open roles, applicants, shortlisted and time to hire; recent candidates with match and stage; the week's pipeline"), "Recruiter Dashboard", "", "rec")}
    <div class="ax-rows">
      ${row("Pipeline","Candidates, already scored","CV match, screening score and personality fit on every row. Applied to Shortlisted in one click.","", pad("dash_r3.webp","app.auxhr.com · candidates","Candidates list with CV match, screening and personality scores per person"), false)}
      ${row("Brief","A candidate brief, not a CV to decode","The three scores first, then strong matches and a suggested next step.","", pad("dash_r4.webp","app.auxhr.com · candidate","Candidate profile with diagnostic brief, strong matches and suggested next step"), true)}
      ${row("Roles","Job posts with the state of each role in one list","Open and closed roles, department, type and applicant count.","", img("live_jobs.webp","Job posts list: Sales Representative, Product Designer, Backend Engineer with applicant counts","beige"), false)}
      ${row("Team","Collaborative hiring in one workspace","Hiring managers, recruiters and executives aligned in one view.","", img("live_collab.webp","Collaborative hiring: hiring managers and recruiters in one workspace","beige"), true)}
    </div>
    <div class="ax-strip">
      ${stage(`<img src="${A}live_brief.webp" alt="Candidate diagnostic brief card" loading="lazy" data-lb="case" data-cap="Candidate diagnostic brief">`, "Diagnostic Brief · Live", "", "rec")}
      ${stage(`<img src="${A}live_stats.webp" alt="Pipeline stats card" loading="lazy" data-lb="case" data-cap="Pipeline stats">`, "Pipeline At A Glance · Live", "soft", "rec")}
      ${stage(`<img src="${A}live_candidate.webp" alt="Candidate card with fit score" loading="lazy" data-lb="case" data-cap="Candidate card">`, "Candidate Card · Live", "deep", "rec")}
    </div>
  </section>

  <!-- chapter III: AI configuration -->
  <section class="ax ax-sec rv" id="ax-ai">
    ${eyebrow("Chapter III","AI Configuration")}
    <h2 class="ax-h2">Set the bar once. The AI holds <em>everyone</em> to it.</h2>
    <p class="ax-lede">While posting a role, the recruiter sets the questions, the personality tests, the CV requirements and how much each one weighs. Every applicant is tested against the same criteria.</p>
    ${stage(win("dash_r2.webp","app.auxhr.com · post a job · screening","Post a job: screening setup with skill weights, pre-screening questions and personality assessment toggles"), "Post A Job · Screening Setup", "", "")}
    <div class="ax-rows">
      ${row("Output","Three scores that travel with the candidate","CV match, screening answers and personality fit, on the card, in the pipeline and in the brief.","", img("live_scores.webp","CV Match, Screening Answers and Personality Fit scores","pad"), false)}
      ${row("Design","The configuration screen itself","Role details, screening setup, publish. Toggles switch each assessment on, sliders carry the weights.","", img("fig_feat_ai.webp","AI Configuration and CV Matching: set the questions, weights and benchmarks once","beige"), true)}
    </div>
  </section>

  <!-- website (was in About / Solution / Process) -->
  <section class="ax ax-sec rv" id="ax-site">
    ${eyebrow("Website","auxhr.com")}
    ${stage(`<div class="ax-hero-stage">${win("live_home_fold.webp","auxhr.com","AuxHR recruiter site, live at auxhr.com")}${phone("live_home_fold_m.webp","AuxHR site on a phone")}</div>`, "Live · auxhr.com", "", "")}
    <div class="ax-under"><span>The recruiter site as it is live today, desktop and phone.</span><a href="https://www.auxhr.com" target="_blank" rel="noopener">Open auxhr.com ↗</a></div>
    ${stage(win("live_steps.webp","auxhr.com · how it works","How AuxHR works: create your role, let AI find the fit, review your matches, make your move"), "How It Works · Live", "deep")}
    <div class="ax-duo">
      ${stage(win("fig_recruiter_full.webp","Figma · Recruiter landing page","Recruiter landing page, full design in Figma","tall"), "Recruiter Site · Figma", "deep", "rec")}
      ${stage(win("fig_talent_full.webp","Figma · Talent landing page","Talent landing page, full design in Figma","tall"), "Talent Site · Figma", "deep", "talent")}
    </div>
  </section>

  <!-- brand -->
  <section class="ax ax-sec rv" id="ax-brand">
    ${eyebrow("Brand","From SupportPro To AuxHR")}
    <div class="ax-brand">
      <div class="ax-logo old light"><span class="lab">Before · SupportPro</span><img src="${A}brand_supportpro_wordmark.png" alt="SupportPro wordmark" style="max-width:78%"></div>
      <div class="ax-arrow">→</div>
      <div class="ax-logo new light"><span class="lab">After · AuxHR</span><img src="${A}brand_auxhr_mark.png" alt="AuxHR logo" style="max-height:120px"></div>
    </div>
    <div class="ax-grid c3">
      <div class="ax-stage beige" style="padding:0;overflow:hidden;border-radius:22px;min-height:300px;display:flex;align-items:flex-end"><img src="${A}brand_supportpro_banner.webp" alt="SupportPro LinkedIn banner: Experience Business Exponential Growth with our Top Vetted Talents" loading="lazy" data-lb="case" data-cap="SupportPro, the services brand" style="display:block;width:100%"><span class="ax-cap" style="position:absolute;left:14px;top:12px;font-size:11px;padding:6px 10px">SupportPro · Services Brand</span></div>
      <div class="ax-stage deep" style="padding:0;overflow:hidden;border-radius:22px;display:flex;justify-content:center"><img src="${A}brand_auxhr_first_post.webp" alt="First public AuxHR creative: Struggling with getting the best talents? Another job board isn't the solution, use AuxHR" loading="lazy" data-lb="case" data-cap="First AuxHR creative" style="display:block;height:300px;width:auto"><span class="ax-cap" style="position:absolute;left:14px;top:12px;font-size:11px;padding:6px 10px">AuxHR · First Public Creative</span></div>
      <div class="ax-stage soft" style="padding:0;overflow:hidden;border-radius:22px"><img src="${A}brand_auxhr_og.webp" alt="AuxHR social card: AI-powered hiring that finds the right fit" loading="lazy" data-lb="case" data-cap="AuxHR social card" style="display:block;width:100%;height:300px;object-fit:cover"><span class="ax-cap" style="position:absolute;left:14px;top:12px;font-size:11px;padding:6px 10px">AuxHR · Social Card</span></div>
    </div>
  </section>

  <!-- style guide -->
  <section class="ax ax-sec rv" id="ax-style">
    ${eyebrow("Style Guide","Colour, Type, Components")}
    <div class="ax-ramps">${ramps}</div>
    <div class="ax-type">
      <div class="ax-card ax-spec"><span class="mono">General Sans Variable</span><p class="big" style="margin-top:14px">Hire better. Move faster.<br>Build stronger teams.</p><p class="mid">Recruitment shouldn't require hours of repetitive work.</p></div>
      <div class="ax-card"><span class="ax-tag"><i style="background:var(--ax-violet)"></i>Surfaces</span><h4>Soft, rounded, calm</h4><div style="margin-top:22px" class="ax-abc">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</div></div>
    </div>
    <div class="ax-comp">
      ${stage(`<img src="${A}live_scores.webp" alt="Score card component" loading="lazy" data-lb="case" data-cap="Score card"><span class="lab">Score Card</span>`, "", "deep")}
      ${stage(`<img src="${A}live_jobs.webp" alt="Job list component" loading="lazy" data-lb="case" data-cap="Job list"><span class="lab">Job List</span>`, "", "beige")}
      ${stage(`<img src="${A}live_journey.webp" alt="Candidate journey timeline component" loading="lazy" data-lb="case" data-cap="Candidate journey timeline"><span class="lab">Journey Timeline</span>`, "", "soft")}
    </div>
  </section>

  <!-- close -->
  <section class="ax ax-sec rv" id="ax-close">
    <div class="ax-close">
      <h2 class="ax-h2">Recruiters open AuxHR to a scored shortlist, not a stack of CVs.</h2>
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
