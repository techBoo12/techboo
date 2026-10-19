/* =====================================================================
   techBoo portfolio — ALL SITE TEXT LIVES HERE.
   Swap any string below; the page renders from this object.
   Placeholders she still needs to replace are marked  >>> PLACEHOLDER <<<
   ===================================================================== */
window.CONTENT = {
  meta: { title: "Adaikem Ajufo | techBoo · Product Designer & Visual Creator", description: "Adaikem Ajufo (techBoo), product designer and visual creator in Nigeria. I create/​design user-centered products that solve real problems." },

  nav: {
    first: "Adaikem",            // regular
    last: "Ajufo",               // italic, like teslim
    role: "Product Designer & Visual Creator · techBoo",
    links: [
      { n: "01", label: "ABOUT",              page: "./" },
      { n: "02", label: "UI/UX DESIGNS",      page: "ui-ux-designs" },
      { n: "03", label: "AI / MOTION DESIGNS", page: "ai-motion-designs" },
      { n: "04", label: "BRAND DESIGNS",      page: "brand-designs" },
      { n: "05", label: "VIDEO EDITS",        page: "video-edits" }
    ]
  },

  hero: {
    // Oct 16 2026 2:19 PM voice note: back to the ONE big-font sentence (as in v3); 2:30 PM: mobile hero like teslimalabi.com's.
    // <em> = lilac italic. Supporting line lightly rephrased (her ask: "don't use exactly what is on its own. Rephrase").
    sentence: "Adaikem Ajufo. <em>Product designer and visual creator</em> in Nigeria. <span class='tb-nw'>I create/design</span> user-centered products that solve real problems.",
    workingOutOf: "Working out of",
    city: "Nigeria",
    localTimeLabel: "Local Time",
    timezone: "Africa/Lagos"   // WAT clock (time zone id only, never shown)
  },

  // 4.5 s muted 16:9 loop from her Spenda 2.0 raw footage (clip c5 from 2.4 s). "Product Designer", "AI Prompt Designer", "Video Editor"
  // flash one after another behind her, 0.3 s each, with the Spenda 2.0 title entrance. src4k = desktop (3840x2160), src = phones (1920x1080).
  loop: { src: "assets/media/about_loop_1080.mp4", src4k: "assets/media/about_loop_4k.mp4", poster: "assets/media/about_loop.jpg", alt: "Adaikem doing a hand gesture, with the words Product Designer, AI Prompt Designer and Video Editor appearing one after another behind her" },

  work: {
    eyebrow: "Product & UI case studies",
    title: "Selected Work",
    // these two Behance pieces are motion work: shown under MOTION, not here (their case pages stay live)
    notInWork: ["spenda-motion", "sphinx-ai-promo"],
    cases: [
      {
        key: "auxhr",
        brand: "AUXHR · SALESPLAT",
        years: "2024 → 2025",
        dot: "#C4A0FF",
        outcome: "Redesigned a SaaS HR product from MVP to a product people trust",
        role: "Associate Design Lead · Product & UI/UX",
        desc: "Led the AuxHR redesign end-to-end. The first designs shipped as an MVP; the redesign brings a better look, clearer flows and better UX across onboarding, people and payroll.",   // >>> PLACEHOLDER <<< her words
        media: { type: "image", src: "assets/auxhr_cover.jpg", alt: "AuxHR redesign" },  // >>> PLACEHOLDER <<< old vs new screens
        badges: ["Lead", "SaaS", "B2B"]
      },
      {
        key: "axis",
        brand: "AXIS ROBOTICS",
        years: "SEPT 2025",
        dot: "#8FD3FF",
        outcome: "Turned a month of robot data into a recap people actually watched",
        role: "Motion design · Story & edit",
        desc: "September recap for Axis: narrated story film, typed-on labels, 3D data graphic and a six-country teleop montage. Physical AI, decoded for a timeline.",   // >>> PLACEHOLDER <<<
        media: { type: "image", src: "assets/axis_cover.jpg", alt: "Axis Robotics September recap" },
        badges: ["Motion", "Physical AI"],
        href: "ai-motion-designs#ai-films", cta: "Watch the recap film"
      },
      {
        key: "toki",
        brand: "TOKI FINANCE",
        years: "2024 → 2026",
        dot: "#FFC46B",
        outcome: "Gave a Web3 finance brand a visual language its community could rally around",
        role: "Brand visual design · Community",
        desc: "Brand visuals, campaign creatives and community-facing design for a Web3 finance product.",   // >>> PLACEHOLDER <<<
        media: { type: "placeholder", label: "TOKI · visuals coming" },   // >>> PLACEHOLDER <<< needs Toki visuals
        badges: ["Web3", "Fintech"]
      },
      /* ---- Behance case studies (pulled Oct 9 2026 from behance.net/adaikemajufo_techboo; text is hers, verbatim). hidden:true = not shown ---- */
      {"slug": "hm-trades", "source": "behance", "brand": "HM TRADES", "title": "FinTech Case Study", "years": "2024", "dot": "#C4A0FF", "outcome": "HM TRADES : A P2P Crypto Trading Platform", "role": "UI/UX", "desc": "Central Bank of Nigeria restrictions push Nigerians into risky P2P trades on apps with weak verification and hidden fees. I redesigned HM Trades into one trusted wallet and P2P marketplace : Verified vendors with escrow on every trade.", "media": {"type": "video", "src": "assets/media/hm_trades_cover3.mp4", "poster": "assets/media/hm_trades_cover3.jpg", "alt": "HM Trades"}, "badges": ["UI/UX", "Crypto App", "Fintech"], "tags": ["UI/UX", "Crypto App", "Fintech"], "href": "case/hm-trades", "behance": "https://www.behance.net/gallery/251660915/FinTech-Case-Study", "gallery": [{"type": "image", "slices": [["assets/cases/hm-trades/about.webp", 1240, 957], ["assets/cases/hm-trades/img01-02.webp", 1240, 1607], ["assets/cases/hm-trades/img01-03.webp", 1240, 1607], ["assets/cases/hm-trades/img01-04.webp", 1240, 1607], ["assets/cases/hm-trades/img01-05.webp", 1240, 1607], ["assets/cases/hm-trades/img01-06.webp", 1240, 1607], ["assets/cases/hm-trades/img01-07.webp", 1240, 1607], ["assets/cases/hm-trades/img01-08.webp", 1240, 1604]]}]},
      {"slug": "warblelive", "source": "behance", "brand": "WARBLELIVE", "title": "WarbleLive Case Study", "years": "2025", "dot": "#8FD3FF", "outcome": "AI-Powered Event Ticketing Platform Built for the African Market", "role": "Product Designer", "desc": "WarbleLive empowers you with secure tickets, offline verification and smarter tools for unforgettable events", "media": {"type": "video", "src": "assets/media/warblelive_scroll5.mp4", "poster": "assets/media/warblelive_scroll5.jpg", "alt": "WarbleLive Case Study"}, "badges": ["UI/UX", "Web App", "B2B", "B2C"], "tags": ["UI/UX", "Web App", "B2B", "B2C"], "website": "https://www.warblelive.io", "href": "case/warblelive", "behance": "https://www.behance.net/gallery/249994179/WarbleLive-Case-Study", "gallery": [{"type": "image", "slices": [["assets/cases/warblelive/img01-01b.webp", 1240, 801], ["assets/cases/warblelive/img01-02.webp", 1240, 1657]]}, {"type": "video", "src": "assets/media/warblelive_scroll5.mp4", "poster": "assets/media/warblelive_scroll5.jpg", "w": 1920, "h": 986, "loop": true}, {"type": "image", "slices": [["assets/cases/warblelive/img01-03p.webp", 1240, 1737], ["assets/cases/warblelive/img01-04a.webp", 1240, 280]]}, {"type": "video", "src": "assets/media/warblelive_banner.mp4", "poster": "assets/media/warblelive_banner.jpg", "w": 3840, "h": 2160, "loop": true}, {"type": "image", "slices": [["assets/cases/warblelive/img01-04b.webp", 1240, 829], ["assets/cases/warblelive/img01-05a.webp", 1240, 1400], ["assets/cases/warblelive/img01-05b.webp", 1240, 257], ["assets/cases/warblelive/img01-06.webp", 1240, 1657], ["assets/cases/warblelive/img01-07.webp", 1240, 1657], ["assets/cases/warblelive/img01-08.webp", 1240, 1657], ["assets/cases/warblelive/img01-09a.webp", 1240, 600], ["assets/cases/warblelive/billboard_43.webp", 1240, 930], ["assets/cases/warblelive/img01-09b.webp", 1240, 1057], ["assets/cases/warblelive/img01-10.webp", 1240, 1657], ["assets/cases/warblelive/img01-11.webp", 1240, 1657], ["assets/cases/warblelive/img01-12a.webp", 1240, 900], ["assets/cases/warblelive/img01-13d.webp", 1240, 3763], ["assets/cases/warblelive/img01-14.webp", 1240, 752]]}]},
      {"slug": "sofavault", "brand": "SOFAVAULT", "title": "SofaVault E-commerce Store", "dot": "#7FB8B0", "outcome": "An AI Powered Online Store that feels like a showroom", "role": "Product Designer", "desc": "Buying items online comes with a big doubt of how it will look in real life. SofaVault clears that doubt. Shoppers snap the space they want to put their furniture in, and the AI places the SofaVault piece right there so they see the real fit before they buy.", "media": {"type": "video", "src": "assets/media/sofavault_card2.mp4", "poster": "assets/media/sofavault_card2.jpg", "alt": "SofaVault E-commerce Store"}, "badges": ["UI/UX", "E-commerce", "Web + Mobile"], "tags": ["UI/UX", "E-commerce", "Web + Mobile"], "href": "case/sofavault", "gallery": [{"type": "image", "slices": [["assets/cases/sofavault/d01-home.webp", 1240, 6220], ["assets/cases/sofavault/d02-menu.webp", 1240, 775]]}, {"type": "image", "slices": [["assets/cases/sofavault/d03-shop.webp", 1240, 2882], ["assets/cases/sofavault/d04-product.webp", 1240, 2671]]}, {"type": "image", "slices": [["assets/cases/sofavault/d08-auth.webp", 1240, 796]]}, {"type": "image", "slices": [["assets/cases/sofavault/d09-room-1.webp", 1240, 973], ["assets/cases/sofavault/d09-room-2.webp", 1240, 775], ["assets/cases/sofavault/d09-room-3.webp", 1240, 775], ["assets/cases/sofavault/d09-room-4.webp", 1240, 775]]}, {"type": "video", "src": "assets/media/sofavault_ai_demo1.mp4", "poster": "assets/media/sofavault_ai_demo1.jpg", "w": 1440, "h": 900, "loop": true}, {"type": "image", "slices": [["assets/cases/sofavault/d05-cart.webp", 1240, 2025], ["assets/cases/sofavault/d06-checkout.webp", 1240, 2605], ["assets/cases/sofavault/d07-confirmed.webp", 1240, 2260]]}, {"type": "image", "slices": [["assets/cases/sofavault/m01.webp", 1240, 834], ["assets/cases/sofavault/m02.webp", 1240, 834], ["assets/cases/sofavault/m03.webp", 1240, 834]]}]},
      {"slug": "stikboo", "brand": "STIKBOO", "title": "Stikboo", "dot": "#D4FF4A", "outcome": "A 555 NFT collection product from my pixel character.", "role": "Product Designer · Brand + Web", "cta": "View project", "media": {"type": "video", "src": "assets/media/stikboo_card2.mp4", "poster": "assets/media/stikboo_card2.jpg", "alt": "Stikboo"}, "badges": ["NFT", "Web3", "Brand + Web"], "tags": ["NFT", "Web3", "Brand + Web"], "href": "case/stikboo", "gallery": [{"type": "image", "slices": [["assets/cases/stikboo/d01-landing.webp", 1240, 3014]]}, {"type": "image", "slices": [["assets/cases/stikboo/d02-crew.webp", 1240, 1218]]}, {"type": "image", "slices": [["assets/cases/stikboo/d03-traits-team-faq.webp", 1240, 2446]]}, {"type": "image", "slices": [["assets/cases/stikboo/d04-mint.webp", 1240, 2161]]}, {"type": "image", "slices": [["assets/cases/stikboo/m01-landing.webp", 1240, 875]]}, {"type": "image", "slices": [["assets/cases/stikboo/m02-mint.webp", 1240, 875]]}, {"type": "video", "src": "assets/media/stikboo_mint1.mp4", "poster": "assets/media/stikboo_mint1.jpg", "w": 1440, "h": 900, "loop": true}]},
      {"slug": "sphinx-ai-promo", "source": "behance", "brand": "SPHINX AI", "title": "Sphinx AI Powered Promotional Video", "years": "2026", "dot": "#FFC46B", "outcome": "Sphinx AI Powered Promotional Video", "role": "Editing · Animation · Motion Graphics", "desc": "", "media": {"type": "video", "src": "assets/cases/sphinx-ai-promo/video01.mp4", "poster": "assets/cases/sphinx-ai-promo/video01_poster.jpg", "alt": "Sphinx AI Powered Promotional Video"}, "badges": ["Editing", "Animation", "Motion Graphics"], "tags": ["visual design", "ai", "Video Editing"], "href": "case/sphinx-ai-promo", "behance": "https://www.behance.net/gallery/247177093/Sphinx-AI-Powered-Promotional-Video", "gallery": [{"type": "video", "src": "assets/cases/sphinx-ai-promo/video01.mp4", "poster": "assets/cases/sphinx-ai-promo/video01_poster.jpg", "w": 1280, "h": 720}]},
      {"slug": "spenda-motion", "source": "behance", "brand": "SPENDA", "title": "Spenda Motion Graphics", "years": "2026", "dot": "#9EF0C4", "outcome": "Spenda Motion Graphics", "role": "Graphic Design · Interaction Design · Motion Graphics", "desc": "", "media": {"type": "video", "src": "assets/cases/spenda-motion/video01.mp4", "poster": "assets/cases/spenda-motion/video01_poster.jpg", "alt": "Spenda Motion Graphics"}, "badges": ["Graphic Design", "Interaction Design", "Motion Graphics"], "tags": [], "href": "case/spenda-motion", "behance": "https://www.behance.net/gallery/245198211/Spenda-Motion-Graphics", "gallery": [{"type": "video", "src": "assets/cases/spenda-motion/video01.mp4", "poster": "assets/cases/spenda-motion/video01_poster.jpg", "w": 1280, "h": 720}]},
      {"slug": "de-logistics", "source": "behance", "brand": "DELIVERY EASE", "title": "DE Logistics Case Study", "years": "2026", "dot": "#FF9EC7", "outcome": "Real Time Tracking Logistics Design", "role": "Web Design", "desc": "", "media": {"type": "image", "src": "assets/cases/de-logistics/cover.webp", "alt": "DE Logistics Case Study"}, "badges": ["Web Design"], "tags": ["Logistics", "uiuxdesign", "Web Design", "mobile design", "webapp"], "href": "case/de-logistics", "behance": "https://www.behance.net/gallery/243331425/DE-Logistics-Case-Study", "gallery": [{"type": "image", "slices": [["assets/cases/de-logistics/img01-01.webp", 1240, 1693], ["assets/cases/de-logistics/img01-02.webp", 1240, 1693], ["assets/cases/de-logistics/img01-03.webp", 1240, 1693], ["assets/cases/de-logistics/img01-04.webp", 1240, 1693], ["assets/cases/de-logistics/img01-05.webp", 1240, 1693], ["assets/cases/de-logistics/img01-06.webp", 1240, 1693], ["assets/cases/de-logistics/img01-07.webp", 1240, 1693], ["assets/cases/de-logistics/img01-08.webp", 1240, 1693], ["assets/cases/de-logistics/img01-09.webp", 1240, 1693], ["assets/cases/de-logistics/img01-10.webp", 1240, 1693]]}], "hidden": true, "note": "Delivery Ease: hidden until techBoo says otherwise (she asked Oct 9 2026 to leave it out). Assets downloaded to files/portfolio/behance/de-logistics, not copied into the site."},
      {"slug": "chainai", "source": "behance", "brand": "CHAINAI", "title": "ChainAI", "years": "2024", "dot": "#C4A0FF", "outcome": "ChainAI", "role": "Web Design · UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/chainai/cover.webp", "alt": "ChainAI"}, "badges": ["Web Design", "UI/UX"], "tags": ["blockchain technology"], "href": "case/chainai", "behance": "https://www.behance.net/gallery/194015481/ChainAI", "gallery": [{"type": "image", "slices": [["assets/cases/chainai/img01-01.webp", 1240, 794]]}, {"type": "image", "slices": [["assets/cases/chainai/img02-01.webp", 1240, 1460], ["assets/cases/chainai/img02-02.webp", 1240, 1460], ["assets/cases/chainai/img02-03.webp", 1240, 1460], ["assets/cases/chainai/img02-04.webp", 1240, 1460]]}]},
      {"slug": "investment-dashboard", "source": "behance", "brand": "INVESTMENT DASHBOARD", "title": "Investment Dashboard UI", "years": "2024", "dot": "#8FD3FF", "outcome": "Investment Dashboard UI", "role": "Product Design", "desc": "", "media": {"type": "image", "src": "assets/cases/investment-dashboard/cover.webp", "alt": "Investment Dashboard UI"}, "badges": ["Product Design"], "tags": ["crypto", "web3", "ui design"], "href": "case/investment-dashboard", "behance": "https://www.behance.net/gallery/192083807/Investment-Dashboard-UI", "gallery": [{"type": "image", "slices": [["assets/cases/investment-dashboard/img01-01.webp", 1240, 992]]}]},
      {"slug": "presale-memecoin-landing", "source": "behance", "brand": "PRESALE MEMECOIN", "title": "Presale Memecoin Landing Page", "years": "2023", "dot": "#FFC46B", "outcome": "Presale Memecoin Landing Page", "role": "Product Design", "desc": "", "media": {"type": "image", "src": "assets/cases/presale-memecoin-landing/cover.webp", "alt": "Presale Memecoin Landing Page"}, "badges": ["Product Design"], "tags": ["crypto", "web3", "landing page", "memecoin"], "href": "case/presale-memecoin-landing", "behance": "https://www.behance.net/gallery/182057845/Presale-Memecoin-Landing-Page", "gallery": [{"type": "image", "slices": [["assets/cases/presale-memecoin-landing/img01-01.webp", 1240, 1232]]}, {"type": "image", "slices": [["assets/cases/presale-memecoin-landing/img02-01.webp", 1240, 1626], ["assets/cases/presale-memecoin-landing/img02-02.webp", 1240, 1626], ["assets/cases/presale-memecoin-landing/img02-03.webp", 1240, 1624]]}, {"type": "image", "slices": [["assets/cases/presale-memecoin-landing/img03-01.webp", 1240, 969]]}]},
      {"slug": "balenciaga", "source": "behance", "brand": "BALENCIAGA", "title": "Balenciaga", "years": "2023", "dot": "#9EF0C4", "outcome": "Balenciaga", "role": "Web Design · UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/balenciaga/cover.webp", "alt": "Balenciaga"}, "badges": ["Web Design", "UI/UX"], "tags": [], "href": "case/balenciaga", "behance": "https://www.behance.net/gallery/179873715/Balenciaga", "gallery": [{"type": "image", "slices": [["assets/cases/balenciaga/img01-01.webp", 1240, 886]]}, {"type": "image", "slices": [["assets/cases/balenciaga/img02-01.webp", 1240, 886]]}, {"type": "image", "slices": [["assets/cases/balenciaga/img03-01.webp", 1240, 1594]]}, {"type": "image", "slices": [["assets/cases/balenciaga/img04-01.webp", 1240, 666]]}, {"type": "video", "src": "assets/cases/balenciaga/video05.mp4", "poster": "assets/cases/balenciaga/video05_poster.jpg", "w": 1280, "h": 800}]},
      {"slug": "e-learning-dashboard", "source": "behance", "brand": "E-LEARNING DASHBOARD", "title": "E-Learning Dashboard", "years": "2023", "dot": "#FF9EC7", "outcome": "E-Learning Dashboard", "role": "Web Design · UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/e-learning-dashboard/cover.webp", "alt": "E-Learning Dashboard"}, "badges": ["Web Design", "UI/UX"], "tags": [], "href": "case/e-learning-dashboard", "behance": "https://www.behance.net/gallery/175528293/E-Learning-Dashboard", "gallery": [{"type": "image", "slices": [["assets/cases/e-learning-dashboard/img01-01.webp", 1240, 1197]]}, {"type": "image", "slices": [["assets/cases/e-learning-dashboard/img02-01.webp", 1240, 1197]]}]},
      {"slug": "splash-signin-signup", "source": "behance", "brand": "SPLASH & AUTH SCREENS", "title": "Splash, SignIn & SignUp Screens", "years": "2023", "dot": "#C4A0FF", "outcome": "Splash, SignIn & SignUp Screens", "role": "Product Design", "desc": "", "media": {"type": "image", "src": "assets/cases/splash-signin-signup/cover.webp", "alt": "Splash, SignIn & SignUp Screens"}, "badges": ["Product Design"], "tags": ["Onboarding Screen", "splash screen", "ui design"], "href": "case/splash-signin-signup", "behance": "https://www.behance.net/gallery/175281357/Splash-SignIn-SignUp-Screens", "gallery": [{"type": "image", "slices": [["assets/cases/splash-signin-signup/img01-01.webp", 1240, 886]]}, {"type": "image", "slices": [["assets/cases/splash-signin-signup/img02-01.webp", 1240, 886]]}]},
      {"slug": "auth-wiki", "source": "behance", "brand": "AUTH-WIKI", "title": "Auth-Wiki Case Study", "years": "2023", "dot": "#8FD3FF", "outcome": "Auth-Wiki Case Study", "role": "Product Design", "desc": "", "media": {"type": "image", "src": "assets/cases/auth-wiki/cover.webp", "alt": "Auth-Wiki Case Study"}, "badges": ["Product Design"], "tags": ["Case Study", "product design", "uidesign", "uiuxdesign"], "href": "case/auth-wiki", "behance": "https://www.behance.net/gallery/161853135/Auth-Wiki-Case-Study", "gallery": [{"type": "image", "slices": [["assets/cases/auth-wiki/img01-01.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-02.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-03.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-04.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-05.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-06.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-07.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-08.webp", 1240, 1730], ["assets/cases/auth-wiki/img01-09.webp", 1240, 1728]]}]},
      {"slug": "responsive-ecommerce", "source": "behance", "brand": "E-COMMERCE WEBSITE", "title": "A Responsive E-commerce Website", "years": "2023", "dot": "#FFC46B", "outcome": "A Responsive E-commerce Website", "role": "Product Design · Interaction Design", "desc": "", "media": {"type": "image", "src": "assets/cases/responsive-ecommerce/cover.webp", "alt": "A Responsive E-commerce Website"}, "badges": ["Product Design", "Interaction Design"], "tags": ["crypto", "Figma", "restaurant", "ui design", "Web Design"], "href": "case/responsive-ecommerce", "behance": "https://www.behance.net/gallery/161851927/A-Responsive-E-commerce-Website", "gallery": [{"type": "image", "slices": [["assets/cases/responsive-ecommerce/img01-01.webp", 1240, 1713], ["assets/cases/responsive-ecommerce/img01-02.webp", 1240, 1713], ["assets/cases/responsive-ecommerce/img01-03.webp", 1240, 1711]]}]},
      {"slug": "sign-in-page-ui", "hidden": true, "source": "behance", "brand": "SIGN IN PAGE", "title": "Sign In Page UI (Desktop and Mobile View)", "years": "2023", "dot": "#9EF0C4", "outcome": "Sign In Page UI (Desktop and Mobile View)", "role": "Product Design · UI/UX · Web Design", "desc": "", "media": {"type": "image", "src": "assets/cases/sign-in-page-ui/cover.webp", "alt": "Sign In Page UI (Desktop and Mobile View)"}, "badges": ["Product Design", "UI/UX", "Web Design"], "tags": ["Figma", "sign in page", "UI", "uiux"], "href": "case/sign-in-page-ui", "behance": "https://www.behance.net/gallery/161817753/Sign-In-Page-UI-%28Desktop-and-Mobile-View%29", "gallery": [{"type": "image", "slices": [["assets/cases/sign-in-page-ui/img01-01.webp", 1240, 886]]}]},
      {"slug": "clique-logistics", "hidden": true, "source": "behance", "brand": "CLIQUE LOGISTICS", "title": "Clique Logistics App Case Study", "years": "2022", "dot": "#FF9EC7", "outcome": "Clique Logistics App Case Study", "role": "UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/clique-logistics/cover.webp", "alt": "Clique Logistics App Case Study"}, "badges": ["UI/UX"], "tags": ["Case Study", "product design", "UI/UX"], "href": "case/clique-logistics", "behance": "https://www.behance.net/gallery/150894961/Case-study-Clique-logistics-app", "gallery": [{"type": "image", "slices": [["assets/cases/clique-logistics/img01-01.webp", 1240, 1040]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img02-01.webp", 1240, 1027], ["assets/cases/clique-logistics/img02-02.webp", 1240, 1027]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img03-01.webp", 1240, 1281]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img04-01.webp", 1240, 1046], ["assets/cases/clique-logistics/img04-02.webp", 1240, 1046]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img05-01.webp", 1240, 907]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img06-01.webp", 1240, 1232], ["assets/cases/clique-logistics/img06-02.webp", 1240, 1231]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img07-01.webp", 1240, 1107], ["assets/cases/clique-logistics/img07-02.webp", 1240, 1107]]}, {"type": "image", "slices": [["assets/cases/clique-logistics/img08-01.webp", 1240, 1066]]}]},
      {"slug": "replicated-soft-ui", "source": "behance", "brand": "SOFT UI", "title": "Replicated Soft UI", "years": "2022", "dot": "#C4A0FF", "outcome": "Replicated Soft UI", "role": "UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/replicated-soft-ui/cover.webp", "alt": "Replicated Soft UI"}, "badges": ["UI/UX"], "tags": ["softuidesign"], "href": "case/replicated-soft-ui", "behance": "https://www.behance.net/gallery/150894833/Replicated-Soft-UI", "gallery": [{"type": "image", "slices": [["assets/cases/replicated-soft-ui/img01-01.webp", 1240, 968], ["assets/cases/replicated-soft-ui/img01-02.webp", 1240, 967]]}]},
      {"slug": "redesigned-neon-ui", "hidden": true, "source": "behance", "brand": "NEON UI", "title": "Re-designed neon UI", "years": "2022", "dot": "#8FD3FF", "outcome": "Re-designed neon UI", "role": "UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/redesigned-neon-ui/cover.webp", "alt": "Re-designed neon UI"}, "badges": ["UI/UX"], "tags": ["neon ui", "neon ui design"], "href": "case/redesigned-neon-ui", "behance": "https://www.behance.net/gallery/150894155/Re-designed-neon-UI", "gallery": [{"type": "image", "slices": [["assets/cases/redesigned-neon-ui/img01-01.webp", 1240, 1021]]}, {"type": "image", "slices": [["assets/cases/redesigned-neon-ui/img02-01.webp", 1240, 744]]}, {"type": "image", "slices": [["assets/cases/redesigned-neon-ui/img03-01.webp", 1240, 998]]}]},
      {"slug": "train-app-onboarding", "source": "behance", "brand": "TRAIN APP", "title": "Train app onboarding screens", "years": "2022", "dot": "#FFC46B", "outcome": "Train app onboarding screens", "role": "UI/UX", "desc": "", "media": {"type": "image", "src": "assets/cases/train-app-onboarding/cover.webp", "alt": "Train app onboarding screens"}, "badges": ["UI/UX"], "tags": ["train", "ui design"], "href": "case/train-app-onboarding", "behance": "https://www.behance.net/gallery/150893225/Train-app-onboarding-screens", "gallery": [{"type": "image", "slices": [["assets/cases/train-app-onboarding/img01-01.webp", 1240, 842]]}, {"type": "image", "slices": [["assets/cases/train-app-onboarding/img02-01.webp", 1240, 1114]]}, {"type": "image", "slices": [["assets/cases/train-app-onboarding/img03-01.webp", 1240, 842]]}]}
    ]
  },

  /* ===== VIDEO SECTIONS (Clips · AI Films · Motion · UGC) =====
     item: title, meta (small line), src + poster (assets/media/…), ar = aspect ratio, span = grid columns (desktop),
     href = optional link (case study), soon = true for a "coming soon" tile (no fake content) */
  sections: [
    /* AI / Motion Designs page (Oct 18 2026, her asks 11:30 + 11:33 AM): every piece is a card like the Axis one:
       brand • years, title, role, tags, a SHORT line (max ~15 words), and a WATCH link. The fuller "desc" shows in the watch view.
       caseKey / href pull brand, role and tags from that case when the item does not set them. */
    { id: "ai-films", page: "ai-motion-designs#ai-films", eyebrow: "Directed by me, made with AI tools", title: "AI Films", cols: 2,
      intro: "Short films built from stills, AI animation and edit.",
      items: [
        { title: "Sphinx AI promo", meta: "Editing · animation", src: "assets/cases/sphinx-ai-promo/video01.mp4", poster: "assets/cases/sphinx-ai-promo/video01_poster.jpg", ar: "16/9", href: "case/sphinx-ai-promo", cta: "Watch the promo" },   // Oct 18 4:05 PM her ask: moved to AI Films, to be upgraded
        { soon: true, title: "More AI films on the way", meta: "Coming soon", ar: "16/9", span: 1 }
      ] },
    { id: "motion", page: "ai-motion-designs#motion", eyebrow: "Motion design & graphics", title: "Motion Designs", cols: 2,
      intro: "Product promos, brand motion and launch animations.",
      items: [
        { title: "AuxHR launch video", outcome: "AuxHR launch video", meta: "Product promo · 60 s · 2026", src: "assets/media/motion_auxhr3.mp4", poster: "assets/media/motion_auxhr3.jpg", ar: "16/9",
          brand: "AUXHR · SALESPLAT", years: "2026", dot: "#C4A0FF", role: "Motion design · Product promo", badges: ["Motion graphics", "SaaS"],
          short: "Launch Video for AuxHR, an AI powered hiring platform for talents and recruiters.", cta: "Watch video",
          desc: "Launch Video for AuxHR, an AI powered hiring platform for talents and recruiters. It walks through posting a role, AI screening and the shortlist, with the product UI in motion." },   // Oct 18 2026 11:30 AM: her ask, AuxHR video first in Motion Designs
        { title: "Axis Robotics · September recap", outcome: "Axis Robotics Recap", meta: "Recap film · 52 s · 2026", src: "assets/media/motion_axisrecap.mp4", poster: "assets/media/motion_axisrecap.jpg", ar: "16/9",
          caseKey: "axis", short: "Motion design for Axis Robotics recap 3D data graphics", cta: "Watch video" },   // Oct 18 12:13 her ask: second after AuxHR, intro cut, starts on the trajectories screen
        { title: "The Lore of Credit Rolls", outcome: "The Lore of Credit Rolls", meta: "Motion design · NFT · 48 s · 2026", src: "assets/media/motion_creditrolls.mp4", poster: "assets/media/motion_creditrolls.jpg", ar: "16/9",
          brand: "CREDIT ROLLS · MONAD", years: "2026", dot: "#FF8EE4", role: "Motion design · Launch video", badges: ["Motion design", "NFT"],
          short: "Launch video for an NFT product", cta: "Watch video",
          desc: "A motion story for Credit Rolls on Monad. Spikes bonded, then split into 1001 pixel cubes; the video tells that lore from the first boom to the mint.",
          link: "https://www.creditrolls.xyz/", linkLabel: "Visit creditrolls.xyz" },   // Oct 19 2026 12:27-12:41 PM her copy: heading, subheading, description + site link in the watch view; 4K web cut ends before the end card
        { title: "Spenda · motion graphics", outcome: "Spenda Motion Graphics", meta: "Motion graphics · 15 s", src: "assets/media/motion_spenda_v2.mp4", poster: "assets/media/motion_spenda_v2.jpg", ar: "16/9",
          brand: "SPENDA", dot: "#9EF0C4", role: "Motion design · Product promo", badges: ["Motion graphics", "Fintech"],
          short: "Motion graphics promo for Spenda, the naira to stablecoin app.", cta: "Watch video" },   // Oct 18 4:15 PM her ask: right after Axis recap
        { title: "bolapsd · immersive store concept", outcome: "bolapsd Immersive Store", src: "assets/media/motion_bolapsd_v2.mp4", poster: "assets/media/motion_bolapsd_v2.jpg", ar: "4/3",
          brand: "BOLAPSD", dot: "#FFC46B", role: "Website design · Motion", badges: ["Web", "E-commerce", "Motion"],
          short: "An immersive store concept for bolapsd, a Nigerian streetwear label. Tap a piece and it swings to centre stage.", cta: "Watch video",
          desc: "Most clothing websites feel like a catalogue. This one should feel like walking into the brand. An immersive website concept for bolapsd, a streetwear label in Nigeria: the clothes hang on a rail you can play with, and tapping a piece swings it off the rail to centre stage with price, sizes and colours ready to add to your bag. The interface stays black and white so the clothes do the talking." },   // Oct 18 4:21 PM her ask: LinkedIn cut from 0.5 s, no underground, summary of the LinkedIn post
        { title: "Axis contributor card", meta: "Launch animation · 2026", src: "assets/media/motion_axiscard.mp4", poster: "assets/media/motion_axiscard.jpg", ar: "16/9",
          brand: "AXIS ROBOTICS", years: "2026", dot: "#8FD3FF", role: "Launch animation", badges: ["Motion", "Launch"], cta: "Watch the animation" }

      ] },
    { id: "video-edits", page: "video-edits", eyebrow: "Brand videos, shot and edited by me", title: "Video Edits", cols: 3,
      intro: "Talking-head brand stories, shot by me and edited with motion.",
      items: [
        { title: "Spenda 2.0 · naira in, stablecoins out", meta: "Video edit for @myspenda · 72 s · 2026", src: "assets/media/video_spenda.mp4", poster: "assets/media/video_spenda.jpg", ar: "16/9", span: 2 },
        { soon: true, title: "Vertical 9:16 reels", meta: "Coming soon", ar: "8/9", span: 1 }
      ] }
  ],

  about: {
    eyebrow: "About",
    // her words, Oct 16 2026 1:42 PM voice note; 2:19 PM: "four" as a word, make it longer/fuller
    // v6 (Oct 16 2026 3:20 PM, her pick, three sentences)
    body: "I’m Adaikem, aka techBoo, a product and visual designer in Nigeria with four+ years of experience designing B2B, SaaS, fintech and Web3 products. I take products from rough ideas to clean, usable screens. When I’m not in Figma, I’m creating with AI, from prompts to video edits.",
    handle: "@techboo_", handleHref: "https://x.com/techboo_"
  },

  footer: {
    aboutLabel: "About Me", aboutLink: "Learn More", aboutHref: "#about",
    sayHi: "Say Hi",
    email: "adaikemmartilda@gmail.com",      // Oct 18 10:06 PM her official email
    linkedinLabel: "Linkedin", linkedinHandle: "adaikemajufo", linkedinHref: "https://www.linkedin.com/in/adaikemajufo/",   // >>> PLACEHOLDER <<< confirm URL
    behanceHref: "https://www.behance.net/adaikemajufo_techboo",
    xHref: "https://x.com/techboo_",
    signoff1: "With Intention", signoffAmp: "&", signoff2: "Motion",
    rights: "All Rights Reserved © techBoo 2026"
  }
};

/* =====================================================================
   Oct 16 2026 (v4): TAB STRUCTURE, her voice notes 1:35 PM + 1:42 PM + 1:47 PM:
   About | UI/UX Designs | AI / Motion Designs | Brand Designs | Video Edits
   Which case goes on which tab is decided by the lists below (key or slug).
   Clips are not on this site (they get their own site later).
   ===================================================================== */
window.CONTENT.brand = { name: "Adaikem Ajufo", first: "Adaikem", last: "Ajufo", tag: "techBoo", logo: "assets/logo.jpg", hire: "Hire me" };
window.CONTENT.tabs = [
  { id: "about",  label: "About",               page: "./" },
  { id: "uiux",   label: "UI/UX Designs",       page: "ui-ux-designs" },
  { id: "motion", label: "AI / Motion Designs", page: "ai-motion-designs" },
  { id: "brand",  label: "Brand Designs",       page: "brand-designs" },
  { id: "video",  label: "Video Edits",         page: "video-edits" }
];
window.CONTENT.groups = {
  uiux: { eyebrow: "B2B B2C SAAS FINTECH & WEB3 Case Studies", title: "UI/UX Designs",
    intro: "Products I designed end to end: research, flows, UI and the details that make people trust them.",
    cases: ["warblelive","sofavault","hm-trades","stikboo","clique-logistics","chainai","presale-memecoin-landing","e-learning-dashboard","sign-in-page-ui","balenciaga","redesigned-neon-ui"],
    explore: { img: "assets/media/warblelive_banner.jpg", vid: "assets/media/warblelive_banner.mp4" } },
  motion: { eyebrow: "AI films & motion design", title: "AI / Motion Designs",
    intro: "AI films, product promos, brand motion and launch animations.",
    cases: ["axis","sphinx-ai-promo"],
    featured: ["axis"],
    sections: ["motion","ai-films"],   // Oct 18 2026 11:30 AM: Motion Designs first, then AI Films
    extraItems: { "ai-films": [] },
    explore: { img: "assets/media/ai_axis.jpg", vid: "assets/media/ai_axis.mp4" } },
  brand: { eyebrow: "Brand & graphic design", title: "Brand Designs",
    intro: "Designs for artists, robotics teams and brands. Static brand and graphic work.",
    cases: ["toki"],
    soon: { soon: true, title: "Designs for artists & robotics brands", meta: "Uploading soon", ar: "16/9" },
    explore: { img: "" } },
  video: { eyebrow: "Video editing", title: "Video Edits",
    intro: "Brand videos I shot and edited, with motion and captions.",
    sections: ["video-edits"],
    explore: { img: "assets/media/video_spenda.jpg", vid: "assets/media/video_spenda.mp4" } }
};
/* Experience: short form, from her CV (Adaikem_Resume_*.pdf / Academic CV). Nothing here is clickable. */
window.CONTENT.experience = [
  { org: "SalesPlat Technologies", loc: "Nigeria · Hybrid", years: "Jul 2022 – Present", roles: [
      ["Associate Design Lead, AuxHR", "Jan 2026 – Present"],
      ["UI/UX Design Instructor, The Growth Hub", "Mar 2023 – Present"],
      ["Associate Product Designer, AuxHR", "Jun 2025 – Jan 2026"],
      ["Product Designer, Incubate", "Jul 2022 – Jun 2025"] ] },
  { org: "Freelance Product Visual Creator", loc: "Remote", years: "2023 – Present", roles: [ ["UI/UX, Motion Design & Video Edits", ""] ] },
  { org: "Axis Robotics Contributor", loc: "California · Remote", years: "Sep 2025 – Oct 2026", roles: [ ["Motion Designer & Brand Designer", ""] ] },
  { org: "Toki Finance", loc: "Japan · Remote", years: "Sep 2024 – Jan 2026", roles: [ ["Marketing Designer, Ambassador & Community Lead", ""] ] }
];
window.CONTENT.contact = { eyebrow: "Contact", title: "Let’s build something <em>people trust</em>.", body: "Product design, Web3 visuals, AI films and motion. Tell me what you’re making.", cta: "Email me" };
