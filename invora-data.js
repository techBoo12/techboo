/* Invora case entry (Oct 20 2026). Preview only: added here, not in content.js, so Invora is not listed on any page until she approves. Only case/invora.html loads this file. */
(function(){
  var C = window.CONTENT; if(!C || !C.work || !C.work.cases) return;
  if(C.work.cases.some(function(k){ return k.slug === "invora"; })) return;
  C.work.cases.push({
    "slug": "invora", "brand": "INVORA", "title": "Invora", "dot": "#2ED3B7",
    "outcome": "Invora",
    "role": "Product Designer",
    "media": {"type": "image", "src": "assets/cases/invora/cover.webp", "alt": "Invora dashboard"},
    "badges": ["UI/UX", "SaaS", "Fintech"], "tags": ["UI/UX", "SaaS", "Fintech"],
    "href": "case/invora", "desc": "", "gallery": []
  });
})();
