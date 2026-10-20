/* AuxHR animated dashboard mocks. Mount: <div class="axd" data-axd="talent|rec" data-base="../assets/cases/auxhr/"></div> */
(function(){
'use strict';
var W=1200,H=750;
var RM=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* stock-style headshots in every avatar circle (Oct 20 2026) */
var FB=(document.body.getAttribute('data-base')||'../')+'assets/cases/auxhr/avatars/';
var DF={'Amaka Obi':'amaka_obi','Philip Kosana':'philip_kosana','Adaeze Okonkwo':'adaeze_okonkwo','Tunde Bakare':'tunde_bakare','Clara Ebenezer':'clara_ebenezer','Paul Akakuigbe':'paul_akakuigbe','Ngozi Eze':'ngozi_eze','Emeka Nwosu':'emeka_nwosu'};
function fimg(nm,sz){var f=DF[nm];return '<img src="'+FB+f+'-96.webp" srcset="'+FB+f+'-96.webp 96w, '+FB+f+'-192.webp 192w" sizes="'+sz+'" alt="'+nm+'" decoding="async">';}
var I={
 grid:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
 brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
 file:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
 check:'<path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14.5c2 .8 3.2 2.6 3.7 5.5"/>',
 chat:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
 cog:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
 bell:'<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',
 spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 3.5M12 17h.01"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 ok:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
 down:'<path d="M12 4v12M6 10l6 6 6-6M5 20h14"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
};
function ic(n,sw){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(sw||1.8)+'" stroke-linecap="round" stroke-linejoin="round">'+I[n]+'</svg>';}
function nav(items){return '<div class="axd-nav">'+items.map(function(it){return '<div class="axd-ni'+(it[2]?' on':'')+'">'+ic(it[0])+'<span>'+it[1]+'</span>'+(it[3]?'<b>'+it[3]+'</b>':'')+'</div>';}).join('')+'</div>';}
function chrome(inner){return '<div class="axd-bar"><div class="axd-dots"><i></i><i></i><i></i></div><div class="axd-url">'+ic('lock',2.2)+'app.auxhr.com/dashboard</div><div class="axd-tabr"><i></i></div></div><div class="axd-app">'+inner+'</div>';}
var CUR='<div class="axd-cur"><div class="axd-rip"></div><svg viewBox="0 0 26 30"><path d="M3 2l19 12.2-8.3 1.6 4.9 9.3-3.6 1.9-4.9-9.4L3.5 23z" fill="#0f1652" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg></div>';
function toast(t,s){return '<div class="axd-toast"><div class="ic">'+ic('ok',2.6)+'</div><div><b>'+t+'</b><span>'+s+'</span></div><i class="bar"></i></div>';}
function fmt(n){return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}

/* ---------------- TALENT ---------------- */
var ROLES=[
 ['Product Designer','Brightline','Lagos, Hybrid','Full Time','B','#efeaff','#5b2cff',94],
 ['UI/UX Designer','Lumen Pay','Remote, Africa','Full Time','L','#e6fbfe','#0e8aa3',91],
 ['Product Designer II','Savanna Tech','Nairobi, Remote','Contract','S','#e9efff','#213aff',87],
 ['Visual Designer','Kora Health','Accra, Hybrid','Full Time','K','#fff1e6','#e2620c',82]
];
function talentHTML(base){
 var side='<aside class="axd-side"><div class="axd-logo"><img src="'+base+'brand_auxhr_mark.png" alt="AuxHR"></div>'+
  '<div class="axd-sec">Menu</div>'+nav([['grid','Dashboard',1],['search','Find Jobs',0,'24'],['file','Applications',0],['check','Assessments',0,'1'],['user','My Profile'],['chat','Messages',0,'2']])+
  '<div class="axd-sec">Account</div>'+nav([['cog','Settings'],['help','Help Center']])+
  '<div class="axd-promo"><h5>Profile 85% Done</h5><p>Add one more project to stand out to recruiters.</p><span class="axd-glassbtn">Add Project</span></div></aside>';
 var top='<div class="axd-top"><div class="axd-search">'+ic('search')+'Search jobs, companies or skills<kbd>⌘K</kbd></div><div class="axd-sp"></div><div class="axd-ib">'+ic('bell')+'<i></i></div><div class="axd-me"><div class="axd-av ph">'+fimg('Amaka Obi','36px')+'</div><div><b>Amaka Obi</b><span>Product Designer</span></div></div></div>';
 var hello='<div class="axd-hello"><div><h2>Welcome Back, Amaka</h2><p>4 new roles match your profile today. Your next interview is on Thursday.</p></div><div style="display:flex;gap:10px"><span class="axd-btn">'+ic('cal')+'This Week</span><span class="axd-btn pri">'+ic('spark')+'Find Matches</span></div></div>';
 var prof='<div class="axd-card axd-prof"><div class="axd-cover"><span class="axd-glass"><i></i>Open To Work</span></div><div class="axd-av big ph">'+fimg('Amaka Obi','66px')+'</div><div class="axd-pinfo"><h3>Amaka Obi</h3><p>Product Designer · Lagos, Nigeria · 4 Yrs</p><div class="axd-chips"><span class="axd-chip">Figma</span><span class="axd-chip">Design Systems</span><span class="axd-chip">Research</span></div></div></div>';
 var str='<div class="axd-card axd-str"><div class="axd-ring"><svg viewBox="0 0 96 96"><defs><linearGradient id="axdRingG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#63eafd"/><stop offset=".5" stop-color="#7b74ff"/><stop offset="1" stop-color="#5b2cff"/></linearGradient></defs><circle class="trk" cx="48" cy="48" r="40" fill="none" stroke-width="10"/><circle class="fil" cx="48" cy="48" r="40" fill="none" stroke-width="10" stroke-linecap="round" pathLength="100"/></svg><b><span data-n="str">0</span>%</b></div><div><h4>Profile Strength</h4><p>Assessment done. Add one project to reach 100%.</p><span class="axd-pill p-violet">Strong Profile</span></div></div>';
 var stats='<div class="axd-card axd-stats"><div class="axd-ch"><div><h4>Your Applications</h4><p>Tracked live, no follow-up emails</p></div></div><div class="axd-sg"><div class="axd-st hl"><b data-n="applied">0</b><span>Applied</span></div><div class="axd-st"><b data-n="review">0</b><span>In Review</span></div><div class="axd-st"><b data-n="intv">0</b><span>Interviews</span></div></div></div>';
 var rows=ROLES.map(function(r,i){return '<div class="axd-role'+(i===0?' tgt':'')+'"><div class="axd-lg" style="background:'+r[5]+';color:'+r[6]+'">'+r[4]+'</div><div class="axd-rt"><h5>'+r[0]+'</h5><p>'+r[1]+' · '+r[2]+'</p><div class="tags"><span>'+r[3]+'</span><span>Posted '+(i+1)+'d Ago</span></div></div><div class="axd-mp"><b data-n="m'+i+'">0</b><b>%</b><small>Match</small><div class="axd-mb"><i data-bar="'+r[7]+'"></i></div></div><div class="axd-apply'+(i===0?' pri':'')+'"><span class="a">Apply in 1 click</span><span class="b">Applied '+'\u2713'+'</span></div></div>';}).join('');
 var match='<div class="axd-card axd-match"><div class="axd-ch"><div><h4>Matched For You</h4><p>Ranked by how well your profile fits each role</p></div><a>View All</a></div><div class="axd-roles">'+rows+'</div></div>';
 var next='<div class="axd-card axd-next"><div class="axd-ch"><h4>Up Next</h4><a>Calendar</a></div><div class="axd-nx"><div class="axd-ev"><div class="axd-dt"><b>22</b><span>OCT</span></div><div><h6>Portfolio Review</h6><p>Lumen Pay · Thu, 10:00 AM</p></div><span class="axd-pill p-blue" style="margin-left:auto">Interview</span></div><div class="axd-ev"><div class="axd-dt"><b>24</b><span>OCT</span></div><div><h6>Design Challenge</h6><p>Savanna Tech · 45 Min</p></div><span class="axd-pill p-amber" style="margin-left:auto">Due</span></div></div></div>';
 var main='<div class="axd-main">'+top+'<div class="axd-body">'+hello+'<div class="axd-grid"><div class="axd-col">'+prof+str+stats+'</div><div class="axd-col">'+match+next+'</div></div></div>'+toast('Application Sent','Product Designer at Brightline')+'</div>';
 return chrome(side+main)+CUR;
}

/* ---------------- RECRUITER ---------------- */
var CANDS=[
 ['Adaeze Okonkwo','Customer Success Lead','AO','#ff9a3c,#f26a1b',94,'Shortlisted','p-green',0],
 ['Tunde Bakare','Growth Marketing Manager','TB','#4266ff,#213aff',91,'Personality Test','p-violet',1],
 ['Clara Ebenezer','UX Writer','CE','#7b74ff,#5b2cff',88,'Pre-Screened','p-blue',1],
 ['Paul Akakuigbe','Support Specialist','PA','#22c1d6,#0e8aa3',86,'Shortlisted','p-green',0],
 ['Ngozi Eze','Sales Development Rep','NE','#f472b6,#db2777',74,'Under Review','p-amber',1],
 ['Emeka Nwosu','Backend Engineer','EN','#94a3b8,#64748b',58,'Not A Fit','p-grey',0]
];
var KPIS=[['Active Job Posts',12,'brief','#efeaff','#5b2cff','+2','vs last week'],['Total Applications',1284,'users','#e9efff','#2e4fe6','+18.2%','vs last week'],['Screened By AI',846,'spark','#e6fbfe','#0e8aa3','66%','of all applicants'],['Shortlisted',128,'star','#e8f6ee','#1b7b44','+12','this week']];
var FUN=[['Applied',1284,'#91b6ff,#4266ff'],['CV Matched',912,'#a5a0ff,#7b74ff'],['Pre-Screened',846,'#8f7bff,#5b2cff'],['Personality Test',410,'#7ff0ff,#22c1d6'],['Shortlisted',128,'#7ddca6,#1b7b44']];
function recHTML(base){
 var side='<aside class="axd-side"><div class="axd-logo"><img src="'+base+'brand_auxhr_mark.png" alt="AuxHR"></div>'+
  '<div class="axd-sec">Hiring</div>'+nav([['grid','Dashboard',1],['brief','Job Posts',0,'12'],['users','Applications',0,'48'],['check','Pre-Screening'],['spark','AI Configuration']])+
  '<div class="axd-sec">Workspace</div>'+nav([['bell','Notifications',0,'6'],['chat','Chats',0,'3'],['cog','Settings']])+
  '<div class="axd-promo"><h5>Beta Plan</h5><p>Unlimited AI screening while AuxHR is in beta.</p><span class="axd-glassbtn">See Plans</span></div>'+
  '<div class="axd-user"><div class="axd-av ph" style="background:linear-gradient(135deg,#4266ff,#213aff)">'+fimg('Philip Kosana','34px')+'</div><div><b>Philip Kosana</b><span>Kosana Tech Ltd</span></div></div></aside>';
 var top='<div class="axd-top"><div class="axd-search">'+ic('search')+'Search candidates, jobs or tests<kbd>⌘K</kbd></div><div class="axd-sp"></div><span class="axd-btn">'+ic('cal')+'This Week</span><div class="axd-ib">'+ic('bell')+'<i></i></div><span class="axd-btn pri">'+ic('plus',2.4)+'Post A Job</span></div>';
 var hello='<div class="axd-hello"><div><h2>Good Morning, Philip</h2><p>Here is what happened across your job posts this week.</p></div><span class="axd-btn">'+ic('down')+'Export Report</span></div>';
 var kp='<div class="axd-kpis">'+KPIS.map(function(k,i){return '<div class="axd-card axd-kpi"><div class="axd-kh"><span class="axd-ki" style="background:'+k[3]+';color:'+k[4]+'">'+ic(k[2])+'</span>'+k[0]+'</div><b class="v" data-n="k'+i+'">0</b><div class="axd-kd"><em class="'+(i===2?'g':'')+'">'+k[5]+'</em>'+k[6]+'</div></div>';}).join('')+'</div>';
 var rows=CANDS.map(function(c,i){return '<div class="axd-tr'+(i===2?' tgt':'')+'"><div class="axd-cand"><div class="axd-av ph" style="background:linear-gradient(135deg,'+c[3]+')">'+fimg(c[0],'32px')+'</div><div><b>'+c[0]+'</b><span>'+c[1]+'</span></div></div><div class="axd-cv2"><div class="axd-cvb"><i data-bar="'+c[4]+'"></i></div><b data-n="c'+i+'">0%</b></div><div><span class="axd-pill '+c[6]+'">'+c[5]+'</span></div><span class="axd-act'+(c[7]?' sl':'')+'">'+(c[7]?'Shortlist':'View')+'</span></div>';}).join('');
 var tbl='<div class="axd-card axd-tbl"><div class="axd-ch"><div><h4>Recent Applicants</h4><p>Scored by AuxHR the moment they apply</p></div><a>View All</a></div><div class="axd-th"><span>Candidate</span><span>CV Match</span><span>Status</span><span style="text-align:right">Action</span></div>'+rows+'<div class="axd-tf"><span>Showing 6 of 48</span><span>Customer Success Lead · Lagos</span></div></div>';
 // chart: 12 points over 312x112
 var a=[34,42,38,55,49,63,58,72,66,84,79,96], s=[20,26,25,36,31,41,40,49,46,57,55,66];
 function path(v){var p='';for(var i=0;i<v.length;i++){var x=4+i*(304/11),y=108-v[i];p+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}return p;}
 var pa=path(a),ps=path(s);
 var chart='<div class="axd-card axd-chart"><div class="axd-ch"><div><h4>Applications</h4><p>Last 12 days</p></div><div class="axd-leg"><span><i style="background:#5b2cff"></i>Received</span><span><i style="background:#22c1d6"></i>Screened</span></div></div>'+
  '<svg width="316" height="128" viewBox="0 0 316 128"><defs><linearGradient id="axdArG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b74ff" stop-opacity=".32"/><stop offset="1" stop-color="#7b74ff" stop-opacity="0"/></linearGradient></defs>'+
  '<g stroke="#eef0f6" stroke-width="1"><path d="M0 28H316M0 58H316M0 88H316"/></g><path d="M0 112H316" stroke="#e4e7ec"/>'+
  '<path class="axd-ar" d="'+pa+'L308 112L4 112Z" fill="url(#axdArG)"/>'+
  '<path class="axd-ln" d="'+ps+'" fill="none" stroke="#22c1d6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" pathLength="100"/>'+
  '<path class="axd-ln" d="'+pa+'" fill="none" stroke="#5b2cff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" pathLength="100"/>'+
  '<g class="axd-pt"><circle class="axd-pt2" cx="308" cy="12" r="5" fill="#7b74ff"/><circle cx="308" cy="12" r="4.5" fill="#fff" stroke="#5b2cff" stroke-width="2.5"/></g>'+
  '<g font-size="9.5" fill="#98a2b3" font-family="inherit"><text x="2" y="125">Oct 9</text><text x="140" y="125">Oct 14</text><text x="282" y="125">Oct 20</text></g></svg></div>';
 var fun='<div class="axd-card axd-funnel"><div class="axd-ch"><div><h4>Hiring Funnel</h4><p>All open roles</p></div><a>Details</a></div>'+FUN.map(function(f,i){return '<div class="axd-fr"><span>'+f[0]+'</span><div class="axd-fb"><i data-bar="'+Math.max(8,f[1]/1284*100)+'" style="background:linear-gradient(90deg,'+f[2]+')"></i></div><b data-n="f'+i+'">0</b></div>';}).join('')+'</div>';
 var main='<div class="axd-main">'+top+'<div class="axd-body">'+hello+kp+'<div class="axd-grid">'+tbl+'<div class="axd-col">'+chart+fun+'</div></div></div>'+toast('Candidate Shortlisted','Clara Ebenezer, UX Writer')+'</div>';
 return chrome(side+main)+CUR;
}

/* ---------------- engine ---------------- */
function Mock(el){
 var kind=el.getAttribute('data-axd'); if(kind!=='talent'&&kind!=='rec')return;
 if(el.__axd)return; el.__axd=1;
 var base=el.getAttribute('data-base')||'../assets/cases/auxhr/';
 var cv=document.createElement('div'); cv.className='axd-cv axd-'+(kind==='talent'?'t':'r');
 cv.innerHTML=kind==='talent'?talentHTML(base):recHTML(base);
 el.innerHTML=''; el.appendChild(cv);
 el.setAttribute('role','img'); el.setAttribute('aria-label',kind==='talent'?'AuxHR talent dashboard: Amaka Obi applies to a matched role in one click':'AuxHR recruiter dashboard: Philip Kosana shortlists a candidate');
 var scale=1;
 function fit(){var w=el.clientWidth||el.getBoundingClientRect().width||W;scale=w/W;cv.style.transform='scale('+scale+')';el.style.height=(H*scale)+'px';el.style.borderRadius=Math.max(6,18*scale)+'px';}
 fit(); if(window.ResizeObserver){new ResizeObserver(fit).observe(el);}else window.addEventListener('resize',fit);
 function q(s){return cv.querySelector(s);} function qa(s){return Array.prototype.slice.call(cv.querySelectorAll(s));}
 var timers=[],rafs=[],running=false;
 function at(t,f){timers.push(setTimeout(f,t));}
 function setN(key,v,suf){var e=q('[data-n="'+key+'"]');if(e)e.textContent=fmt(v)+(suf||'');}
 function count(key,from,to,dur,suf){var e=q('[data-n="'+key+'"]');if(!e)return;var t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);var k=1-Math.pow(1-p,3);e.textContent=fmt(from+(to-from)*k)+(suf||'');if(p<1)rafs.push(requestAnimationFrame(step));}rafs.push(requestAnimationFrame(step));}
 function bump(key){var e=q('[data-n="'+key+'"]');if(!e)return;e.classList.remove('axd-bump');void e.offsetWidth;e.classList.add('axd-bump');}
 function bars(on,stagger){qa('[data-bar]').forEach(function(b,i){var go=function(){b.style.transform='scaleX('+(on?(+b.getAttribute('data-bar'))/100:0)+')';};if(on&&stagger)at(i*stagger,go);else go();});}
 var cur=q('.axd-cur'),toastEl=q('.axd-toast');
 function pos(sel,fx,fy){var t=typeof sel==='string'?q(sel):sel;var r=t.getBoundingClientRect(),c=cv.getBoundingClientRect();return [(r.left-c.left)/scale+r.width/scale*fx,(r.top-c.top)/scale+r.height/scale*fy];}
 function move(p,d){cur.style.transition='transform '+d+'ms cubic-bezier(.45,.05,.2,1),opacity .4s';cur.style.transform='translate('+p[0].toFixed(1)+'px,'+p[1].toFixed(1)+'px)';}
 function click(){cur.classList.remove('down');void cur.offsetWidth;cur.classList.add('down');at(180,function(){cur.classList.remove('down');});}
 var D=kind==='talent'?{
  reset:function(){
   var f=q('.axd-ring .fil');f.style.strokeDashoffset=100;
   ['str','applied','review','intv','m0','m1','m2','m3'].forEach(function(k){setN(k,0);});
   bars(false);qa('.axd-role').forEach(function(r){r.classList.remove('hov');});
   var b=q('.tgt .axd-apply');b.classList.remove('done','press');toastEl.classList.remove('in');
   cur.style.transition='none';cur.style.opacity=0;cur.style.transform='translate(1230px,770px)';
  },
  idle:function(){D.reset();q('.axd-ring .fil').style.strokeDashoffset=15;setN('str',85);setN('applied',3);setN('review',2);setN('intv',1);ROLES.forEach(function(r,i){setN('m'+i,r[7]);});bars(true);},
  final:function(){q('.axd-ring .fil').style.strokeDashoffset=15;setN('str',85);setN('applied',4);setN('review',2);setN('intv',1);ROLES.forEach(function(r,i){setN('m'+i,r[7]);});bars(true);q('.tgt .axd-apply').classList.add('done');},
  play:function(){
   at(150,function(){q('.axd-ring .fil').style.strokeDashoffset=15;count('str',0,85,1600);count('applied',0,3,1000);count('review',0,2,1000);count('intv',0,1,1000);});
   at(350,function(){bars(true,140);ROLES.forEach(function(r,i){at(i*140,function(){count('m'+i,0,r[7],1200);});});});
   at(1100,function(){cur.style.transition='none';cur.style.transform='translate(1150px,720px)';void cur.offsetWidth;cur.style.opacity=1;move(pos('.tgt .axd-rt',.45,.55),1500);});
   at(2500,function(){q('.axd-role.tgt').classList.add('hov');});
   at(3500,function(){move(pos('.tgt .axd-apply',.42,.62),800);});
   at(4400,function(){click();q('.tgt .axd-apply').classList.add('press');});
   at(4600,function(){var b=q('.tgt .axd-apply');b.classList.remove('press');b.classList.add('done');});
   at(4950,function(){toastEl.classList.add('in');});
   at(5300,function(){count('applied',3,4,300);bump('applied');});
   at(5900,function(){q('.axd-role.tgt').classList.remove('hov');move(pos('.axd-st.hl',.7,.75),1300);});
   at(8400,function(){toastEl.classList.remove('in');});
   at(9500,function(){cur.style.opacity=0;q('.axd-ring .fil').style.strokeDashoffset=100;count('str',85,0,700);bars(false);ROLES.forEach(function(r,i){count('m'+i,r[7],0,600);});count('applied',4,0,600);count('review',2,0,600);count('intv',1,0,600);q('.tgt .axd-apply').classList.remove('done');});
  },
  loop:10600
 }:{
  reset:function(){
   KPIS.forEach(function(k,i){setN('k'+i,0);});FUN.forEach(function(f,i){setN('f'+i,0);});CANDS.forEach(function(c,i){setN('c'+i,0,'%');});
   bars(false);q('.axd-chart').classList.remove('on');
   var r=q('.axd-tr.tgt');r.classList.remove('hov');var p=r.querySelector('.axd-pill');p.className='axd-pill p-blue';p.textContent='Pre-Screened';
   var a=r.querySelector('.axd-act');a.classList.remove('ok','press');a.textContent='Shortlist';
   toastEl.classList.remove('in');cur.style.transition='none';cur.style.opacity=0;cur.style.transform='translate(1230px,770px)';
  },
  idle:function(){D.reset();KPIS.forEach(function(k,i){setN('k'+i,k[1]);});FUN.forEach(function(f,i){setN('f'+i,f[1]);});CANDS.forEach(function(c,i){setN('c'+i,c[4],'%');});bars(true);q('.axd-chart').classList.add('on');},
  final:function(){KPIS.forEach(function(k,i){setN('k'+i,k[1]+(i===3?1:0));});FUN.forEach(function(f,i){setN('f'+i,f[1]+(i===4?1:0));});CANDS.forEach(function(c,i){setN('c'+i,c[4],'%');});bars(true);q('.axd-chart').classList.add('on');var r=q('.axd-tr.tgt');var p=r.querySelector('.axd-pill');p.className='axd-pill p-green';p.textContent='Shortlisted';var a=r.querySelector('.axd-act');a.classList.add('ok');a.textContent='Shortlisted';},
  play:function(){
   at(150,function(){KPIS.forEach(function(k,i){at(i*90,function(){count('k'+i,0,k[1],1400);});});q('.axd-chart').classList.add('on');});
   at(500,function(){bars(true,90);CANDS.forEach(function(c,i){at(i*90,function(){count('c'+i,0,c[4],1100,'%');});});FUN.forEach(function(f,i){at(i*90,function(){count('f'+i,0,f[1],1200);});});});
   at(1500,function(){cur.style.transition='none';cur.style.transform='translate(1150px,720px)';void cur.offsetWidth;cur.style.opacity=1;move(pos('.axd-tr.tgt .axd-cand',.6,.6),1500);});
   at(2900,function(){q('.axd-tr.tgt').classList.add('hov');});
   at(3700,function(){move(pos('.axd-tr.tgt .axd-act',.45,.6),800);});
   at(4600,function(){click();q('.axd-tr.tgt .axd-act').classList.add('press');});
   at(4800,function(){var r=q('.axd-tr.tgt'),a=r.querySelector('.axd-act'),p=r.querySelector('.axd-pill');a.classList.remove('press');a.classList.add('ok');a.textContent='Shortlisted';p.className='axd-pill p-green axd-bump';p.textContent='Shortlisted';});
   at(5100,function(){toastEl.classList.add('in');});
   at(5450,function(){count('k3',128,129,300);bump('k3');count('f4',128,129,300);bump('f4');});
   at(6100,function(){q('.axd-tr.tgt').classList.remove('hov');move(pos('.axd-kpis .axd-kpi:nth-child(4)',.72,.8),1300);});
   at(8600,function(){toastEl.classList.remove('in');});
   at(9700,function(){cur.style.opacity=0;q('.axd-chart').classList.remove('on');bars(false);KPIS.forEach(function(k,i){count('k'+i,k[1]+(i===3?1:0),0,600);});FUN.forEach(function(f,i){count('f'+i,f[1]+(i===4?1:0),0,600);});CANDS.forEach(function(c,i){count('c'+i,c[4],0,600,'%');});
     var r=q('.axd-tr.tgt'),a=r.querySelector('.axd-act'),p=r.querySelector('.axd-pill');a.classList.remove('ok');a.textContent='Shortlist';p.className='axd-pill p-blue';p.textContent='Pre-Screened';});
  },
  loop:10800
 };
 function stop(){running=false;timers.forEach(clearTimeout);timers=[];rafs.forEach(cancelAnimationFrame);rafs=[];}
 function cycle(){if(!running)return;timers=[];D.play();at(D.loop,function(){if(running){D.reset();timers.push(setTimeout(cycle,60));}});}
 function start(){if(running)return;stop();D.reset();running=true;timers.push(setTimeout(cycle,60));}
 if(RM){el.classList.add('axd-static');D.final();return;}
 D.idle();
 if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){fit();start();}else if(running){stop();D.idle();}});},{threshold:0.25}).observe(el);}else start();
 el.__axdStart=start; el.__axdStop=stop;
}
function init(){Array.prototype.forEach.call(document.querySelectorAll('.axd[data-axd]'),Mock);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.AuxDash={init:init};
})();
