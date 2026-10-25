/* WarbleLive case study v2 (Oct 21 2026): rebuilt from scratch at the AuxHR level on her word ("warble is trash" / "you did not even include the desktop screens").
   Loaded only by case/warblelive.html after case.js. Prefix wl2-. All copy is from her Behance slices unless marked FILLER. */
(function(){
  const gal = document.querySelector("#case .case-gallery"); if(!gal) return;
  document.body.classList.add("wl2-page");
  const DATA = {"T": {"hero_h": "AI-Powered Event Ticketing Platform Built for the African Market", "hero_p": "WarbleLive empowers you with secure tickets, offline verification and smarter tools for unforgettable events.", "overview": "WarbleLive is entering a $2.4B African live event market that's still stuck on paper tickets, informal systems, and widespread fraud and flipping it with AI-Powered event discovery and blockchain secured digital ticket/NFT", "problem": "Event goers deal with fake tickets, hidden fees, and zero loyalty rewards. Organizers fly blind, no real time data, rampant scalping, and no way to reach verified attendees directly.", "solution": "Blockchain keeps tickets legit, AI makes discovery personal. Together, WarbleLive gives Africa's events market something it's never had, real ownership, smarter pricing and a platform.", "process": "The design process followed a user-centered approach, starting with research and competitor analysis to identify user needs and pain points. Insights were used to define key features and user flows for easy event discovery and booking. Low-Fidelity wireframes were then created to structure navigation and reduce friction.", "steps": [["Empathy", "We carried out research through surveys to better understand the problem from the perspective of the users."], ["Define", "After we empathized with the users we were able to come up with the problem statement."], ["Ideate", "After we were able to define the problem statement, we did a lot of brainstorming, thinking and idea prioritization."], ["Prototype", "We voted on an idea after proper analysis and we created our user flows, low-fidelity wireframes and high-fidelity wireframes."], ["Test", "We carried out usability testing as well as design interaction after our prototype stage."]], "branding": "The app's branding is designed to feel modern, secure and easy to navigate, reflecting the excitement of discovering and attending events.", "logo": "The logo's minimal design uses simple geometry and clean typography to maintain scalability and strong brand recognition across all digital platforms and marketing channels.", "flow": "The user flow is designed to reduce cognitive load for both organizers and attendees by guiding users step-by-step, ensuring every action has a clear next step and no dead ends during the booking process.", "type": "Cabin's clean, neutral form lets event visuals do the talking, professional to feel premium and minimal enough and never get in the way. Cabin Sketch adds just the right amount of personality to headings, giving the interface an expressive edge that feels alive.", "type_note": "Cabin style : Clean neutral form to make WarbleLive look premium and minimal enough.", "color": "Purple on a dark background to create strong contrast, making key actions like CTA's, tickets, heading, prices to be very noticable and also gives the product an aesthetically pleasing visuals for a top notch user experience.", "grid": "Grid is important in a design for good 100% alignment, both mobile and desktop grid was used for WarbleLive but for the sake of this case study we will be focusing on MOBILE layout grid ensures consistent spacing, alignment and visual balance across screens, it helps to organize and make it easy for users to scan an interface.", "personas_intro": "Each persona represents a distinct relationship with live events, one as a consumer seeking authentic experiences, the other as a creator building a business around them.", "p1": {"name": "Chiamaka Osei", "age": "26 years old", "occ": "Marketing Executive", "loc": "Lagos, Nigeria", "att": "3-5 times per month", "img": "live/persona1.webp", "quote": "I want to buy my ticket, show up, have the time of my life, and never once stress about whether it's real or not.", "bio": "Chiamaka works at a fast-growing fintech firm in Victoria Island. She's the unofficial 'social coordinator' in her friend group, always the one finding the next concert, organizing group buys and posting the recap reel. She attends 3-5 events per month and considers live experiences a core part of her identity, not just entertainment. She's tech-savvy but crypto-adjacent and she uses Paystack daily but has only dabbled in crypto once.", "goals": ["Discover the best Afrobeats, Amapiano & art events in Lagos before they sell out", "Buy tickets instantly and securely from her phone without worrying about fakes", "Be the first in her circle to know about new events and earn social credibility", "Build a personal archive of every event she's attended as digital collectibles", "Transfer or resell tickets easily when plans change last minute"], "fr": ["Spent ₦15,000 on a counterfeit Burna Boy concert ticket bought via Instagram DM", "Has to check 5+ different pages and WhatsApp groups to find out what's on", "No single platform covers all the events she wants, she switches between 3 apps", "Can't get a refund when events are cancelled or rescheduled with no notice", "Hates the 40-minute gate queue caused by manual ticket verification"]}, "p2": {"name": "Kwame Mensah", "age": "33 years old", "occ": "Events Promoter", "loc": "Accra, Ghana", "att": "9-14 times per month", "img": "live/persona2.webp", "quote": "I know how many people came. I just don't know who they are, where they heard about me, or how to get them to my next event.", "bio": "Kwame has been promoting events in Accra since he was 24, starting with university parties and now running some of the most talked about Afrobeats nights in Ghana. He operates as a one man business with two assistants and a network of vendors. He's smart, ambitious and increasingly frustrated that his operations haven't scaled past 'WhatsApp and vibes.' He knows data matters he just has no infrastructure to collect or act on it", "goals": ["Scale his events from 500 to 5,000+ attendees within 2 years", "Access real-time ticket sales data so he can make decisions on the fly", "Own his audience build a CRM of verified, returning fans", "Eliminate scalping and reclaim the revenue that leaks to touts", "Earn royalties every time a ticket is resold on the secondary market", "Send targeted updates and offers directly to ticket holders"], "fr": ["His Excel sheet crashed mid-event and he had no idea how many tickets were left", "Scalpers buy blocks of 20 tickets and resell at 3-4× face value, angering fans", "Gate crashes account for an estimated 15-20% of his attendance every event", "After each event, he has zero contact details for the people who attended", "Bank transfer verification at the gate causes queues of 30-60 minutes", "Refund requests after cancellations are handled manually via WhatsApp"]}, "emp": {"Says": ["'Let me just buy at the gate'", "'I don't trust online ticket sites'", "'I wish there was one place for everything'", "'My friend got scammed last time'"], "Does": ["Screenshots WhatsApp ticket images", "Buys tickets last-minute at the gate", "Asks friends who've attended before", "Shares events only after attending"], "Thinks": ["Worries the ticket might be fake", "Wonders if a better deal exists elsewhere", "Questions if the platform is trustworthy", "Hopes the event lives up to the hype"], "Feels": ["Anxious about being scammed online", "Excited but cautious about new platforms", "Frustrated by long queues and confusion", "Relieved when entry goes smoothly"]}}, "D_ATT": [["web_landing_page", "warblelive.io", "Landing Page", null], ["web_discover_page", "warblelive.io/discover", "Discover Events", "t_web_discover_page"], ["web_att_event", "warblelive.io/events/the-rave-listening-party", "Event Page", "t_web_att_event"], ["web_att_marketplace", "warblelive.io/marketplace", "Marketplace", "t_web_att_marketplace"], ["web_att_dashboard", "warblelive.io/dashboard", "Attendee Dashboard", "t_web_att_dashboard"], ["web_att_ticket_wallet", "warblelive.io/wallet", "Ticket Wallet", "t_web_att_ticket_wallet"], ["web_att_sign_in", "warblelive.io/sign-in", "Sign In", "t_web_att_sign_in"]], "D_ORG": [["web_org_dashboard", "warblelive.io/organizer/dashboard", "Organizer Dashboard", "t_web_org_dashboard"], ["web_org_create_event", "warblelive.io/organizer/events/new", "Create Event", "t_web_org_create_event"], ["web_org_event_overview", "warblelive.io/organizer/events/overview", "Event Overview", "t_web_org_event_overview"], ["web_org_sales_analytics", "warblelive.io/organizer/analytics", "Sales Analytics", "t_web_org_sales_analytics"], ["web_org_leaderboard", "warblelive.io/organizer/rewards", "Rewards Leaderboard", "t_web_org_leaderboard"]], "M_ATT": [["app_sign_in", "Sign In"], ["att_home_trending", "Home"], ["att_events", "Explore Events"], ["att_event_details", "Event Details"], ["att_buy_ticket_1", "Purchase Ticket"], ["att_ticket_wallet_1", "Ticket Wallet"], ["att_marketplace", "Marketplace"]], "M_ORG": [["app_sign_up", "Sign Up"], ["org_dashboard", "Home"], ["org_create_event_1", "Create Event"], ["org_create_event_3", "Event Media"], ["org_orders", "Event Overview"], ["org_rewards", "Rewards"], ["org_rewards_leaderboard", "Leaderboard"]], "FLOW_ATT": ["Start", "Onboarding", "Login / Sign Up", "E-mail ID", "Home", "Search Events", ["Filter Events", "Browse Events"], "Select Event", "Event Details", "Choose Ticket", "Order Summary", "Review Selection", "Apply Promo Code", "Complete Payment", {"q": "Payment Success?", "yes": ["Sends Ticket To Wallet", "View / Download / Resell Ticket", "End"], "no": ["View Booking History", "My Bookings", "Booking Status", "Manage Booking"]}], "FLOW_ORG": ["Start", "Onboarding", "Login / Sign Up", "Home", ["Event Reservations", "View Wallet & Payouts", "Overview"], "Create New Events", "Create New", "Ticket Configuration", "Preview", "Event Created Successfully", ["Edit Event", "View Event Details"], "View Events History", ["Select / Manage Events", "View Analytics"], "End"]};
  const T = DATA.T;
  const A = "../assets/cases/warblelive/", F = A + "fig/", L = A + "live/";
  const esc = (s)=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const eyebrow = (t)=>`<div class="wl2-eyebrow"><i></i>${esc(t)}</div>`;
  const head = (k, h, p)=>`${eyebrow(k)}<h2 class="wl2-h2">${h}</h2>${p?`<p class="wl2-lede">${esc(p)}</p>`:""}`;
  const browser = (src, url, alt, cls="")=>`<div class="wl2-win ${cls}"><div class="wl2-bar"><span class="wl2-dots"><i></i><i></i><i></i></span><span class="wl2-url"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><b>${esc(url)}</b></span><span class="wl2-bar-sp"></span></div><div class="wl2-vp"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div></div>`;
  const phone = (src, alt, cls="")=>`<div class="wl2-phone ${cls}"><div class="wl2-scr"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" data-lb="case" data-cap="${esc(alt)}"></div></div>`;
  const seg = (name, opts, on)=>`<div class="wl2-seg" role="tablist" data-seg="${name}">${opts.map(([v,l])=>`<button type="button" role="tab" data-v="${v}" aria-selected="${v===on}" class="${v===on?"on":""}">${esc(l)}</button>`).join("")}</div>`;
  const ICON = {
    desk:`<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
    mob:`<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>`
  };

  /* 0. Hero stage. Oct 25 2026 2:29 AM her VN: "remove that phone beside it ... that preview of the website should be what is on the website right now ... in 4K".
     Phone removed; the browser now holds a 3840x2160 capture of the live warblelive.io homepage hero (Playwright, 1920x1080 @2x, Oct 25 2026). */
  const hero = `<section class="wl2-hero wl2-hero-solo rv">
    <div class="wl2-glow" aria-hidden="true"></div>
    <div class="wl2-hero-copy">
      <span class="wl2-pill"><img src="${L}logo_mark.webp" alt="" width="18" height="18">WarbleLive</span>
      <p class="wl2-hero-h">${esc(T.hero_h)}</p>
      <p class="wl2-hero-p">${esc(T.hero_p)}</p>
    </div>
    <div class="wl2-hero-stage">
      <div class="wl2-win wl2-hero-win"><div class="wl2-bar"><span class="wl2-dots"><i></i><i></i><i></i></span><span class="wl2-url"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><b>warblelive.io</b></span><span class="wl2-bar-sp"></span></div>
        <div class="wl2-vp"><img src="${L}live_hero_4k.webp" srcset="${L}live_hero_1920.webp 1920w, ${L}live_hero_4k.webp 3840w" sizes="(max-width: 720px) 92vw, 1080px" width="3840" height="2160" alt="The live warblelive.io homepage" decoding="async" fetchpriority="high" data-lb="case" data-cap="The live warblelive.io homepage"></div></div>
    </div>
  </section>`;

  /* 1. Overview */
  const overview = `<section class="wl2-sec rv">
    ${head("Overview","My Project Overview",T.overview)}
    <div class="wl2-grid c2">
      <div class="wl2-card wl2-prob"><span class="wl2-tag"><i></i>The Problem</span><p>${esc(T.problem)}</p></div>
      <div class="wl2-card wl2-sol"><span class="wl2-tag"><i></i>The Solution</span><p>${esc(T.solution)}</p></div>
    </div>
  </section>`;

  /* 2. Process */
  const process = `<section class="wl2-sec rv">
    ${head("Process","My Design Process",T.process)}
    <ol class="wl2-steps">${T.steps.map(([h,p],i)=>`<li class="wl2-card"><span class="wl2-num">0${i+1}</span><h4>${esc(h)}</h4><p>${esc(p)}</p></li>`).join("")}</ol>
  </section>`;

  /* 3. Personas */
  const persona = (P)=>`<article class="wl2-card wl2-persona">
    <div class="wl2-p-top"><img src="${L}${P.img.replace("live/","")}" alt="${esc(P.name)}" loading="lazy"><div><h4>${esc(P.name)}</h4>
      <dl><div><dt>Age</dt><dd>${esc(P.age)}</dd></div><div><dt>Occupation</dt><dd>${esc(P.occ)}</dd></div><div><dt>Location</dt><dd>${esc(P.loc)}</dd></div><div><dt>Attendance</dt><dd>${esc(P.att)}</dd></div></dl></div></div>
    <blockquote>“${esc(P.quote)}”</blockquote>
    <p class="wl2-bio">${esc(P.bio)}</p>
    <div class="wl2-lists"><div><span class="wl2-tag g"><i></i>Goals</span><ul>${P.goals.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div>
    <div><span class="wl2-tag f"><i></i>Frustrations</span><ul>${P.fr.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div></div>
  </article>`;
  const personas = `<section class="wl2-sec rv">${head("User Personas","The Two People I Designed For",T.personas_intro)}
    <div class="wl2-grid c2 wl2-personas">${persona(T.p1)}${persona(T.p2)}</div></section>`;

  /* 4. Empathy map */
  const E = T.emp;
  const quad = (k)=>`<div class="wl2-card wl2-q q-${k.toLowerCase()}"><span class="wl2-tag"><i></i>${k}</span><ul>${E[k].map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div>`;
  const empathy = `<section class="wl2-sec rv">${head("Empathy Map","What My Users Say, Do, Think And Feel","")}
    <div class="wl2-emp">${quad("Says")}${quad("Thinks")}<div class="wl2-emp-c"><img src="${L}persona1.webp" alt="Chiamaka Osei" loading="lazy"><span>Event Goer</span></div>${quad("Does")}${quad("Feels")}</div></section>`;

  /* 5 + 6. THE SPINE (her word, Oct 21 3:06 AM: "two kinds of users ... attendee and organizer"): one block per user, each with its userflow, desktop screens (default) and mobile screens */
  const dpane = (list, role)=>{
    const [f] = list;
    return `<div class="wl2-dpane" data-role="${role}">
      <div class="wl2-feature">${browser(F+f[0]+".webp", f[1], "WarbleLive "+f[2]+", desktop", "wl2-scroll wl2-big")}</div>
      <div class="wl2-thumbs" role="list" style="--n:${list.length}">${list.map((s,i)=>`<button type="button" role="listitem" class="wl2-th ${i===0?"on":""}" data-src="${F+s[0]}.webp" data-url="${esc(s[1])}" data-name="${esc(s[2])}"><span class="wl2-th-img"><img src="${F+(s[3]||s[0])}.webp" alt="" loading="lazy"></span><span class="wl2-th-l">${esc(s[2])}</span></button>`).join("")}</div>
    </div>`;
  };
  const mpane = (list, role)=>`<div class="wl2-mpane" data-role="${role}">
      <div class="wl2-track" tabindex="0" aria-label="${role==="att"?"Attendee":"Organizer"} mobile screens">${list.map(([s,l])=>`<figure class="wl2-slide">${phone(F+"t_"+s+".webp","WarbleLive "+l+", mobile")}<figcaption>${esc(l)}</figcaption></figure>`).join("")}</div>
      <div class="wl2-nav"><button type="button" class="wl2-arr" data-dir="-1" aria-label="Previous screen">‹</button><span class="wl2-dotsrow">${list.map((_,i)=>`<i class="${i===0?"on":""}"></i>`).join("")}</span><button type="button" class="wl2-arr" data-dir="1" aria-label="Next screen">›</button></div>
    </div>`;
  const chip = (s, cls="")=>`<span class="wl2-chip ${cls} ${/^(Start|End)$/.test(s)?"term":""}">${esc(s)}</span>`;
  const arrow = `<span class="wl2-arw" aria-hidden="true"></span>`;
  const flow = (steps)=>`<div class="wl2-flow">${steps.map(s=>{
      if(Array.isArray(s)) return `<span class="wl2-fork">${s.map(x=>chip(x)).join("")}</span>`;
      if(typeof s==="object") return `<span class="wl2-dec">${chip(s.q,"q")}<span class="wl2-br"><span class="wl2-br-row"><em>Yes</em>${s.yes.map(x=>chip(x)).join(arrow)}</span><span class="wl2-br-row no"><em>No</em>${s.no.map(x=>chip(x)).join(arrow)}</span></span></span>`;
      return chip(s);
    }).join(arrow)}</div>`;
  /* phones open the user chapters on the Mobile screens (they fit the screen); desktop and tablet keep Desktop first */
  const DEV0 = matchMedia("(max-width: 720px)").matches ? "mob" : "desk";
  const userBlock = (role)=>{
    const att = role==="att", P = att ? T.p1 : T.p2;
    const D = att ? DATA.D_ATT : DATA.D_ORG, M = att ? DATA.M_ATT : DATA.M_ORG, FL = att ? DATA.FLOW_ATT : DATA.FLOW_ORG;
    return `<section class="wl2-sec wl2-user wl2-${role} rv" id="wl2-${role}">
      <div class="wl2-user-head">
        <span class="wl2-unum">${att?"01":"02"}</span>
        <div>${eyebrow(att?"User 01 · The Attendee":"User 02 · The Organizer")}
        <h2 class="wl2-h2">${att?"The Attendee Side":"The Organizer Side"}</h2>
        <p class="wl2-user-who"><img src="${L}${P.img.replace("live/","")}" alt="" width="28" height="28">Designed for ${esc(P.name.split(" ")[0])}, ${esc(P.occ.toLowerCase())}, ${esc(P.loc)}</p></div>
      </div>
      <div class="wl2-card wl2-flowcard"><span class="wl2-tag"><i></i>${att?"Attendee":"Organizer"} Userflow</span>${flow(FL)}</div>
      <div class="wl2-ctrls">${seg("device-"+role,[["desk","Desktop"],["mob","Mobile"]],DEV0)}<span class="wl2-ctrl-note">${att?D.length:D.length} desktop screens · ${M.length} mobile screens</span></div>
      <div class="wl2-dev" data-dev="desk"${DEV0==="desk"?"":" hidden"}>${dpane(D, role)}</div>
      <div class="wl2-dev" data-dev="mob"${DEV0==="mob"?"":" hidden"}>${mpane(M, role)}</div>
    </section>`;
  };
  const flowIntro = `<section class="wl2-sec wl2-split rv">${head("Two Users","One Platform, Two Kinds Of Users",T.flow)}
    <div class="wl2-jump"><a href="#wl2-att" class="wl2-card"><span class="wl2-unum s">01</span><b>Attendee</b><span>Discovers events, buys and holds tickets</span></a><a href="#wl2-org" class="wl2-card"><span class="wl2-unum s">02</span><b>Organizer</b><span>Creates events, sells tickets, reads the data</span></a></div></section>`;
  const screens = flowIntro + userBlock("att") + userBlock("org");
  const userflow = "";

  /* 7. Branding */
  const branding = `<section class="wl2-sec rv">${head("Branding","My Branding For WarbleLive",T.branding)}
    <div class="wl2-brand">
      <div class="wl2-card wl2-logo"><img src="${L}logo_panel.webp" alt="WarbleLive logo" loading="lazy" data-lb="case" data-cap="WarbleLive logo"></div>
      <div class="wl2-card wl2-logo-t"><span class="wl2-tag"><i></i>The Logo</span><p>${esc(T.logo)}</p>
        <div class="wl2-mark"><img src="${L}logo_mark.webp" alt="" width="56" height="56"><span>WarbleLive</span></div></div>
    </div></section>`;

  /* 8. Typography, coded specimen */
  const typo = `<section class="wl2-sec rv">${head("Typography","Cabin And Cabin Sketch",T.type)}
    <div class="wl2-grid c2">
      <div class="wl2-card wl2-spec"><span class="wl2-tag"><i></i>Primary · Cabin</span><div class="wl2-aa">Aa</div>
        <div class="wl2-wts"><span style="font-weight:400">Regular</span><span style="font-weight:500">Medium</span><span style="font-weight:600">SemiBold</span><span style="font-weight:700">Bold</span></div>
        <p class="wl2-abc">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 ₦ $ ! ?</p></div>
      <div class="wl2-card wl2-spec sk"><span class="wl2-tag"><i></i>Headings · Cabin Sketch</span><div class="wl2-aa sk">Aa</div>
        <p class="wl2-sk-h">Trending Events</p><p class="wl2-note">${esc(T.type_note)}</p></div>
    </div></section>`;

  /* 9. Colour */
  const SW = [["Purple","#751F72"],["Black","#000000"],["White","#FFFFFF"],["Deep Purple","#210A23"]];
  const ACC = [["Magenta Glow","#FF2AF9"],["Electric Purple","#B23CFD"]];
  const sw = ([n,h])=>`<div class="wl2-sw"><span style="background:${h}"></span><b>${n}</b><code>${h}</code></div>`;
  const colour = `<section class="wl2-sec rv">${head("Colour Palette","Purple On Black",T.color)}
    <div class="wl2-card wl2-pal"><div class="wl2-sws">${SW.map(sw).join("")}</div><div class="wl2-acc"><span class="wl2-tag"><i></i>UI Accents</span><div class="wl2-sws a">${ACC.map(sw).join("")}</div><div class="wl2-grad"></div></div></div></section>`;

  /* 10. Layout grid */
  const grid = `<section class="wl2-sec rv">${head("Layout Grid","My Mobile Layout Grid",T.grid)}
    <div class="wl2-gridshow">
      <figure>${phone(F+"t_att_home_trending.webp","Mobile layout grid over the attendee home","wl2-gphone")}<figcaption>4 Column Grid</figcaption></figure>
      <figure>${phone(F+"t_org_dashboard.webp","Mobile layout grid over the organizer home","wl2-gphone")}<figcaption>4 Column Grid</figcaption></figure>
    </div></section>`;


  /* 10b. Brand designs. Oct 25 2026 2:29 AM her VNs: "add brand designs in the middle ... before the empathizing and the persona" and "all the banners were like below the case study after everything".
     Her banners/billboards move up from the bottom into the middle, joined by her app icon and splash. Rows are justified by aspect ratio so heights line up. Lede is FILLER (not from her slices). */
  const BN = [
    [[L+"banner.webp","Web Banner",1400,626],[L+"app_icon.webp","App Icon",910,680]],
    [[A+"billboard_43.webp","Billboard",1240,930],[L+"splash.webp","Splash Screen",606,1318,"sp"],[L+"billboard_lit.webp","Lightbox Poster",772,490]]
  ];
  const bframe = ([src,cap,w,h,cls])=>`<figure class="wl2-bn ${cls||""}" style="--ar:${(w/h).toFixed(4)}"><div class="wl2-bn-f"><img src="${src}" alt="WarbleLive ${esc(cap.toLowerCase())}" width="${w}" height="${h}" loading="lazy" decoding="async" data-lb="case" data-cap="WarbleLive ${esc(cap.toLowerCase())}"></div><figcaption>${esc(cap)}</figcaption></figure>`;
  const banners = `<section class="wl2-sec rv" id="wl2-banners">${head("Brand Designs","My Banners, Billboards And App Icon","I took WarbleLive off the screen and onto the street with the same purple on black, so the brand feels the same on a billboard as it does in the app.")}
    <div class="wl2-bns">${BN.map(r=>`<div class="wl2-bn-row">${r.map(bframe).join("")}</div>`).join("")}</div></section>`;

  /* 10c. Live product (Oct 25 2026): section captures of the live warblelive.io homepage (Playwright, 1440px @2x, Oct 25 2026). Lede is FILLER; headings in the shots are the site's own. */
  const LV = [["live_events","Events Powered By WarbleLive",2000,1424],["live_features","Core Features",2000,1843],["live_built","Built For Every Event",2000,1102]];
  const lwin = ([f,cap,w,h])=>`<figure class="wl2-lv" style="--ar:${(w/h).toFixed(4)}"><div class="wl2-win"><div class="wl2-bar"><span class="wl2-dots"><i></i><i></i><i></i></span><span class="wl2-url"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><b>warblelive.io</b></span><span class="wl2-bar-sp"></span></div><div class="wl2-vp nat"><img src="${L}${f}.webp" alt="warblelive.io, ${esc(cap.toLowerCase())}" width="${w}" height="${h}" loading="lazy" decoding="async" data-lb="case" data-cap="warblelive.io, ${esc(cap.toLowerCase())}"></div></div><figcaption>${esc(cap)}</figcaption></figure>`;
  const live = `<section class="wl2-sec rv" id="wl2-live">${head("Live Product","WarbleLive, Live On The Web","The brand carried all the way through to the shipped product. These are straight from warblelive.io as it runs today.")}
    <div class="wl2-lvs">${lwin(LV[0])}<div class="wl2-lv-row">${lwin(LV[1])}${lwin(LV[2])}</div></div></section>`;

  /* 10d. Interlude between personas and the empathy map (her word: "so that it's not just reading, reading, reading"): a moving strip of her mobile screens, no copy */
  const RIB = [["att_home_trending","Home"],["att_events","Explore Events"],["att_event_details","Event Details"],["att_buy_ticket_1","Purchase Ticket"],["att_ticket_wallet_1","Ticket Wallet"],["att_marketplace","Marketplace"],["org_dashboard","Organizer Home"],["org_create_event_1","Create Event"],["org_rewards_leaderboard","Rewards Leaderboard"]];
  const ribSet = (hid)=>`<div class="wl2-rib-set"${hid?' aria-hidden="true"':""}>${RIB.map(([s,l])=>phone(F+"t_"+s+".webp","WarbleLive "+l+", mobile","wl2-rib-ph")).join("")}</div>`;
  const ribbon = `<section class="wl2-rib rv" aria-label="WarbleLive mobile screens"><div class="wl2-rib-glow" aria-hidden="true"></div><div class="wl2-rib-track">${ribSet(false)}${ribSet(true)}</div></section>`;

  /* 11. Ending (TY_SKIP holds warblelive in case.js, so this is its own ending) */
  const ending = `<section class="wl2-end rv" id="wl2-ty">
    <div class="wl2-end-glow" aria-hidden="true"></div>
    <img src="${L}logo_mark.webp" alt="" width="54" height="54">
    <h2>Thanks For Scrolling</h2>
    <p>See you at the next event.</p>
    <button type="button" class="wl2-top">Back To Top ↑</button>
  </section>`;

  /* Oct 25 2026 order (her VN): brand block in the middle, before personas + empathy; a visual strip between personas and empathy */
  gal.innerHTML = `<div class="wl2">${hero}${overview}${process}${branding}${colour}${typo}${banners}${live}${personas}${ribbon}${empathy}${screens}${grid}${ending}</div>`;

  /* behaviour */
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anims = new WeakMap();
  const autoscroll = (win)=>{
    const vp = win.querySelector(".wl2-vp"), img = vp && vp.querySelector("img"); if(!img) return;
    const run = ()=>{
      const old = anims.get(img); if(old) old.cancel();
      img.style.transform = "";
      const d = img.offsetHeight - vp.clientHeight; if(rm || d < 24) return;
      const a = img.animate([{transform:"translateY(0)"},{transform:"translateY(0)",offset:.12},{transform:`translateY(${-d}px)`,offset:.88},{transform:`translateY(${-d}px)`}],{duration:Math.max(6000, d*9), iterations:Infinity, direction:"alternate", easing:"ease-in-out"});
      anims.set(img, a);
      win.onmouseenter = ()=>a.pause(); win.onmouseleave = ()=>a.play();
    };
    if(img.complete && img.naturalWidth) run(); else img.addEventListener("load", run, {once:true});
    win._run = run;
  };
  gal.querySelectorAll(".wl2-scroll").forEach(autoscroll);
  let rt; addEventListener("resize", ()=>{ clearTimeout(rt); rt = setTimeout(()=>gal.querySelectorAll(".wl2-scroll").forEach(w=>w._run&&w._run()), 200); });

  const setSeg = (el, v)=>el.querySelectorAll("button").forEach(b=>{ const on = b.dataset.v===v; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
  gal.querySelectorAll(".wl2-seg").forEach(sg=>sg.addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return; const v = b.dataset.v; setSeg(sg, v);
    const sec = sg.closest(".wl2-user"); if(!sec) return;
    sec.querySelectorAll(".wl2-dev").forEach(d=>d.hidden = d.dataset.dev!==v);
    const vis = sec.querySelector(`.wl2-dev[data-dev="${v}"]`);
    vis.querySelectorAll(".wl2-scroll").forEach(w=>w._run&&w._run());
    const t = vis.querySelector(".wl2-track"); if(t){ t.scrollLeft = 0; syncDots(t); }
  }));
  /* desktop thumbnails swap the featured browser */
  gal.querySelectorAll(".wl2-dpane").forEach(p=>p.addEventListener("click", e=>{
    const b = e.target.closest(".wl2-th"); if(!b) return;
    p.querySelectorAll(".wl2-th").forEach(x=>x.classList.toggle("on", x===b));
    const win = p.querySelector(".wl2-big"), img = win.querySelector(".wl2-vp img");
    win.querySelector(".wl2-url b").textContent = b.dataset.url;
    img.alt = "WarbleLive "+b.dataset.name+", desktop"; img.dataset.cap = img.alt;
    img.style.transform = ""; const old = anims.get(img); if(old) old.cancel();
    img.addEventListener("load", ()=>win._run&&win._run(), {once:true}); img.src = b.dataset.src;
  }));
  /* mobile track: arrows + dots */
  function syncDots(t){ const s = t.querySelectorAll(".wl2-slide"); if(!s.length) return; const w = s[0].offsetWidth + parseFloat(getComputedStyle(t).columnGap||0); const i = Math.round(t.scrollLeft / (w||1)); t.parentNode.querySelectorAll(".wl2-dotsrow i").forEach((d,j)=>d.classList.toggle("on", j===Math.min(i, s.length-1))); }
  gal.querySelectorAll(".wl2-mpane").forEach(p=>{
    const t = p.querySelector(".wl2-track");
    t.addEventListener("scroll", ()=>requestAnimationFrame(()=>syncDots(t)), {passive:true});
    p.querySelectorAll(".wl2-arr").forEach(a=>a.addEventListener("click", ()=>{ const s = t.querySelector(".wl2-slide"); t.scrollBy({left:(+a.dataset.dir)*(s.offsetWidth+parseFloat(getComputedStyle(t).columnGap||0)), behavior: rm?"auto":"smooth"}); }));
  });
  const top = gal.querySelector(".wl2-top"); if(top) top.addEventListener("click", ()=>scrollTo({top:0, behavior: rm?"auto":"smooth"}));
  /* reveal: case.js observed .rv before this script ran, so watch ours here */
  const rvs = gal.querySelectorAll(".rv");
  if("IntersectionObserver" in window && !rm){ const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{rootMargin:"0px 0px -6% 0px"}); rvs.forEach(el=>io.observe(el)); }
  else rvs.forEach(el=>el.classList.add("in"));
})();
