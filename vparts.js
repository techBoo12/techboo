/* Videos larger than one upload piece ship as byte parts (name.mp4.part0, .part1, …); this joins them in the browser.
   Every <video data-vsrc="…"> is filled when it nears the screen. Full files are kept beside the site in site_v2_fullmedia/. */
window.VPARTS = {
 "assets/cases/sphinx-ai-promo/video01.mp4": 5,
 "assets/cases/spenda-motion/video01.mp4": 2,
 "assets/cases/balenciaga/video05.mp4": 2,
 "assets/media/motion_axiscard.mp4": 2,
 "assets/media/ai_axis.mp4": 5,
 "assets/media/motion_bolapsd_v2.mp4": 6,
 "assets/media/motion_auxhr3.mp4": 30,
 "assets/media/motion_axisrecap.mp4": 6,
 "assets/media/motion_spenda_v2.mp4": 4,
 "assets/media/warblelive_banner.mp4": 3,
 "assets/media/video_spenda.mp4": 7,
 "assets/media/about_loop_4k.mp4": 9,
 "assets/media/about_loop_1080.mp4": 3,
 "assets/media/hm_trades_cover.mp4": 2,
 "assets/media/hm_trades_cover2.mp4": 2,
 "assets/media/hm_trades_cover3.mp4": 2,
 "assets/media/warblelive_scroll5.mp4": 2,
 "assets/media/sofavault_scroll2.mp4": 2,
 "assets/media/stikboo_mint1.mp4": 1,
 "assets/media/sofavault_ai_demo1.mp4": 1
};
(function(){
  const P = window.VPARTS, cache = {};
  function prefix(v){ return v.dataset.vbase || ""; }
  function load(v){
    if(v.dataset.vloaded) return; v.dataset.vloaded = "1";
    const rel = v.dataset.vsrc, key = rel.replace(/^(\.\.\/)+/, ""), n = P[key];
    const done = (url)=>{ v.src = url; if((v.muted || v.closest(".vtile")) && v.dataset.noauto!=="1"){ const r=v.getBoundingClientRect(); if(r.bottom>0 && r.top<innerHeight) v.play().catch(()=>{}); } v.dispatchEvent(new Event("vready")); };
    if(!n){ done(rel); return; }
    const base = rel;
    cache[key] = cache[key] || Promise.all(Array.from({length:n},(_,i)=>fetch(base+".part"+i).then(r=>{ if(!r.ok) throw new Error(r.status); return r.arrayBuffer(); })))
      .then(bufs=>URL.createObjectURL(new Blob(bufs,{type:"video/mp4"})));
    cache[key].then(done).catch(()=>{ v.dataset.vloaded=""; });
  }
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ io.unobserve(e.target); load(e.target); } }),{rootMargin:"400px 0px"}) : null;
  window.vhydrate = function(root){ (root||document).querySelectorAll("video[data-vsrc]").forEach(v=>{ if(v.dataset.vobs) return; v.dataset.vobs="1"; io ? io.observe(v) : load(v); }); };
  window.vload = load;
})();
