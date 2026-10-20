(function(){
"use strict";
var RM=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var FINE=window.matchMedia&&window.matchMedia("(pointer:fine)").matches;
var $=function(s,r){return (r||document).querySelector(s)};var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

/* toast */
var toastEl=$("#toast"),tt;
function toast(msg){if(!toastEl)return;toastEl.textContent=msg;toastEl.hidden=false;clearTimeout(tt);tt=setTimeout(function(){toastEl.hidden=true},2600)}

/* copy CA */
$$("[data-copy]").forEach(function(b){b.addEventListener("click",function(){var t=$("#ca").textContent;try{if(navigator.clipboard)navigator.clipboard.writeText(t).catch(function(){})}catch(e){}toast("CA Copied. It's A Placeholder, Ser.")})});

/* reveal */
var drops=$$("[data-drop]");
if(RM||!("IntersectionObserver" in window)){drops.forEach(function(d){d.classList.add("in")})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;setTimeout(function(){el.classList.add("in")},(Array.prototype.indexOf.call(el.parentNode.children,el)%4)*90);io.unobserve(el)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});drops.forEach(function(d){io.observe(d)})}

/* counters */
function fmt(n){return Math.round(n).toLocaleString("en-US")}
var cs=$$("[data-count]");
function runCount(el){var to=+el.getAttribute("data-count");if(RM){el.textContent=fmt(to);return}var t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1600);el.textContent=fmt(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
if("IntersectionObserver" in window){var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){runCount(e.target);co.unobserve(e.target)}})});cs.forEach(function(c){co.observe(c)})}else cs.forEach(function(c){c.textContent=fmt(+c.getAttribute("data-count"))});

/* hero parallax + cursor spotlight */
var hero=$(".hero");
if(hero&&!RM&&FINE){hero.addEventListener("pointermove",function(e){var r=hero.getBoundingClientRect();hero.style.setProperty("--mx",((e.clientX-r.left)/r.width-.5).toFixed(3));hero.style.setProperty("--my",((e.clientY-r.top)/r.height-.5).toFixed(3))});hero.addEventListener("pointerleave",function(){hero.style.setProperty("--mx",0);hero.style.setProperty("--my",0)})}
var spot=$("#spot");
if(spot&&!RM&&FINE){var sx=0,sy=0,tx=0,ty=0,run=false;document.addEventListener("pointermove",function(e){tx=e.clientX;ty=e.clientY;spot.classList.add("on");if(!run){run=true;requestAnimationFrame(loop)}},{passive:true});
 function loop(){sx+=(tx-sx)*.12;sy+=(ty-sy)*.12;spot.style.transform="translate3d("+sx.toFixed(1)+"px,"+sy.toFixed(1)+"px,0)";if(Math.abs(tx-sx)+Math.abs(ty-sy)>.5)requestAnimationFrame(loop);else run=false}}

/* glass tilt */
if(!RM&&FINE){$$(".tilt").forEach(function(c){c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty("--ry",((x-.5)*8).toFixed(2)+"deg");c.style.setProperty("--rx",((.5-y)*8).toFixed(2)+"deg");c.style.setProperty("--gx",(x*100).toFixed(1)+"%");c.style.setProperty("--gy",(y*100).toFixed(1)+"%")});c.addEventListener("pointerleave",function(){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")})})}


/* v4 deco: floating stars, pumpkins, candy, potions, coins + confetti */
var COL=["#FF7A1A","#6B3FE6","#B6F23A","#FF6FB1","#FFD23F","#CDB8FF"];
var SVG={
 star:function(c){return '<svg viewBox="0 0 40 40"><path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2Z" fill="'+c+'" stroke="#141414" stroke-width="2.6" stroke-linejoin="round"/></svg>'},
 pump:function(){return '<svg viewBox="0 0 48 46"><path d="M24 10c-2-5 1-8 5-9" fill="none" stroke="#141414" stroke-width="3" stroke-linecap="round"/><ellipse cx="15" cy="28" rx="12" ry="15" fill="#FF7A1A" stroke="#141414" stroke-width="2.6"/><ellipse cx="33" cy="28" rx="12" ry="15" fill="#FF7A1A" stroke="#141414" stroke-width="2.6"/><ellipse cx="24" cy="28" rx="11" ry="16" fill="#FF8F3D" stroke="#141414" stroke-width="2.6"/><path d="M17 24l3 3-4 1zM31 24l-3 3 4 1zM16 34q8 6 16 0" fill="#141414" stroke="#141414" stroke-width="2" stroke-linejoin="round"/></svg>'},
 candy:function(c){return '<svg viewBox="0 0 56 28"><path d="M14 14 2 4v20zM42 14l12-10v20z" fill="'+c+'" stroke="#141414" stroke-width="2.6" stroke-linejoin="round"/><circle cx="28" cy="14" r="12" fill="'+c+'" stroke="#141414" stroke-width="2.6"/><path d="M20 8q8 6 0 12M28 3q8 11 0 22M36 8q-6 6 0 12" fill="none" stroke="#141414" stroke-width="1.8" opacity=".55"/></svg>'},
 potion:function(c){return '<svg viewBox="0 0 36 48"><rect x="13" y="2" width="10" height="7" rx="2" fill="#C98B4E" stroke="#141414" stroke-width="2.6"/><path d="M14 9v9C6 21 3 27 3 33a15 15 0 0 0 30 0c0-6-3-12-11-15V9z" fill="#fff" stroke="#141414" stroke-width="2.6" stroke-linejoin="round"/><path d="M5 31c6-3 20-3 26 0a13 13 0 0 1-26 0z" fill="'+c+'"/><circle cx="14" cy="36" r="2.4" fill="#fff"/><circle cx="21" cy="40" r="1.6" fill="#fff"/></svg>'},
 coin:function(){return '<img src="assets/hex-coin.webp" alt="" style="width:100%;height:100%;filter:drop-shadow(3px 3px 0 #141414)">'}
};
function rnd(a,b){return a+Math.random()*(b-a)}
function seeded(n){var s=n;return function(){s=(s*9301+49297)%233280;return s/233280}}
$$("[data-deco]").forEach(function(box){
 var kind=box.getAttribute("data-deco"),R=seeded(kind==="hero"?7:42),small=window.innerWidth<700;
 function ok(x,y){
  if(kind==="hero"){if(small)return y<40||x<4||x>93;return y<12||y>90||x>88||(x>44&&x<52)}
  return x<15||x>85||y<10||y>94}
 function pt(){for(var t=0;t<60;t++){var x=R()*96,y=R()*94;if(ok(x,y))return [x,y]}return [2,2]}
 var kinds=["star","pump","candy","potion","coin","star","candy","star","coin","potion"];
 var n=small?9:16,h="";
 for(var i=0;i<n;i++){
  var k=kinds[i%kinds.length],c=COL[Math.floor(R()*COL.length)],sz=(k==="star"?22:k==="candy"?50:k==="coin"?42:40)*(small?.8:1)*(.8+R()*.5),P=pt();
  h+='<i style="left:'+P[0].toFixed(1)+'%;top:'+P[1].toFixed(1)+'%;width:'+sz.toFixed(0)+'px;height:'+sz.toFixed(0)+'px;--d:'+(7+R()*6).toFixed(1)+'s;--dl:-'+(R()*6).toFixed(1)+'s;--dx:'+(R()*24-12).toFixed(0)+'px;--dy:'+(-8-R()*14).toFixed(0)+'px;--r0:'+(R()*40-20).toFixed(0)+'deg;--r1:'+(R()*60-30).toFixed(0)+'deg">'+SVG[k](c)+'</i>';
 }
 for(var q=0;q<(small?10:22);q++){var cc=COL[Math.floor(R()*COL.length)],w=8+R()*8,ci=R()>.6,Q=pt();h+='<i class="conf'+(ci?' c':'')+'" style="left:'+Q[0].toFixed(1)+'%;top:'+Q[1].toFixed(1)+'%;width:'+w.toFixed(0)+'px;height:'+(ci?w:w*.5).toFixed(0)+'px;background:'+cc+';--d:'+(6+R()*6).toFixed(1)+'s;--dl:-'+(R()*6).toFixed(1)+'s;--dx:'+(R()*20-10).toFixed(0)+'px;--dy:'+(-8-R()*14).toFixed(0)+'px;--r0:'+(R()*180).toFixed(0)+'deg;--r1:'+(R()*360).toFixed(0)+'deg"></i>'}
 box.innerHTML=h;
});

/* thumbs marquee */
var th=$("#thumbs");
if(th){var pics=["pose-yeah","meme-fine","pose-mind","meme-moon","hex-coin","meme-3am","pose-diamond","meme-buttons","pose-sneak","meme-sleep","pose-nah","meme-brew"];var h="";for(var k=0;k<2;k++)pics.forEach(function(p,i){h+='<img src="assets/'+p+'.webp" alt="" loading="lazy" style="--r:'+((i%3)-1)*3+'deg">'});th.innerHTML=h}

/* meme wiggle */
$$(".meme").forEach(function(m){m.addEventListener("click",function(){if(RM)return;m.classList.remove("wiggle");void m.offsetWidth;m.classList.add("wiggle")})});

/* glass coin rain */
var rain=$("#rain");
function makeItRain(){if(RM||!rain)return;for(var i=0;i<34;i++){var d=document.createElement("img");d.src="assets/hex-coin.webp";d.alt="";d.className="drop";d.style.left=(Math.random()*100)+"vw";d.style.width=(34+Math.random()*46)+"px";d.style.setProperty("--rot",(Math.random()*720-360)+"deg");d.style.animationDuration=(1.8+Math.random()*1.8)+"s";d.style.animationDelay=(Math.random()*.9)+"s";rain.appendChild(d);(function(n){setTimeout(function(){n.remove()},4200)})(d)}for(var q=0;q<40;q++){var f=document.createElement("i");f.className="conf";var w=8+Math.random()*8;f.style.cssText="left:"+(Math.random()*100)+"vw;width:"+w+"px;height:"+(w*.55)+"px;background:"+COL[q%COL.length]+";--rot:"+(Math.random()*900-450)+"deg;animation-duration:"+(2+Math.random()*1.8)+"s;animation-delay:"+(Math.random()*.8)+"s";rain.appendChild(f);(function(n){setTimeout(function(){n.remove()},4400)})(f)}}
$$("[data-buy]").forEach(function(b){b.addEventListener("click",function(){makeItRain();toast("Not A Real Coin, Ser. Hex Is Unimpressed.")})});

/* roadmap progress */
var road=$("#road");
function onScroll(){if(!road)return;var r=road.getBoundingClientRect(),vh=window.innerHeight;var p=(vh*.85-r.top)/(r.height+vh*.35);p=Math.max(0,Math.min(1,p));road.style.setProperty("--p",RM?1:p.toFixed(3))}
window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);onScroll();

/* meme maker */
var C=$("#mkC");
if(C&&C.getContext){var ctx=C.getContext("2d");
 var opts=[["pose-yeah","Sunglasses"],["pose-nah","Nah"],["pose-cry","Crying"],["pose-mind","Mind Blown"],["pose-diamond","Diamond"],["pose-sneak","Sneaky"],["hex-hero","Coin Flip"],["pose-broom","Broom"],["meme-fine","This Is Fine"],["meme-sleep","Sleeping"]];
 var bgs=["#CDB8FF","#B6F23A","#FFD23F","#FF6FB1","#FF7A1A"];
 var st={i:0,bg:0};var cache={};
 var pick=$("#mkPick"),sw=$("#mkBg");
 opts.forEach(function(o,i){var b=document.createElement("button");b.type="button";b.className="chip";b.setAttribute("role","radio");b.setAttribute("aria-checked",i===0?"true":"false");b.setAttribute("aria-label",o[1]);b.innerHTML='<img src="assets/'+o[0]+'.webp" alt="">';b.addEventListener("click",function(){st.i=i;$$(".chip",pick).forEach(function(x,j){x.setAttribute("aria-checked",j===i?"true":"false")});draw()});pick.appendChild(b)});
 bgs.forEach(function(c,i){var b=document.createElement("button");b.type="button";b.style.background=c;b.setAttribute("aria-label","Background "+(i+1));b.setAttribute("aria-pressed",i===0?"true":"false");b.addEventListener("click",function(){st.bg=i;$$("button",sw).forEach(function(x,j){x.setAttribute("aria-pressed",j===i?"true":"false")});draw()});sw.appendChild(b)});
 function img(n,cb){if(cache[n]&&cache[n].complete&&cache[n].naturalWidth){cb(cache[n]);return}var im=new Image();im.onload=function(){cb(im)};im.src="assets/"+n+".webp";cache[n]=im}
 function wrap(t,maxW){var w=t.split(/\s+/),lines=[],cur="";w.forEach(function(x){var test=cur?cur+" "+x:x;if(ctx.measureText(test).width>maxW&&cur){lines.push(cur);cur=x}else cur=test});if(cur)lines.push(cur);return lines}
 function txt(t,top){t=(t||"").toUpperCase().trim();if(!t)return;var size=92;ctx.font=size+"px Anton, Impact, sans-serif";var lines=wrap(t,980);while(lines.length>2&&size>56){size-=8;ctx.font=size+"px Anton, Impact, sans-serif";lines=wrap(t,980)}
  ctx.textAlign="center";ctx.lineJoin="round";var lh=size*1.05;
  lines.forEach(function(l,i){var y=top?40+size+i*lh:1030-(lines.length-1-i)*lh;ctx.lineWidth=size/6;ctx.strokeStyle="#141414";ctx.strokeText(l,540,y);ctx.fillStyle="#fff";ctx.fillText(l,540,y)})}
 function draw(){var o=opts[st.i];img(o[0],function(im){ctx.clearRect(0,0,1080,1080);var isScene=o[0].indexOf("meme-")===0;
   if(isScene){var s=Math.max(1080/im.width,1080/im.height),w=im.width*s,h=im.height*s;ctx.drawImage(im,(1080-w)/2,(1080-h)/2,w,h)}
   else{ctx.fillStyle=bgs[st.bg];ctx.fillRect(0,0,1080,1080);ctx.fillStyle="rgba(20,20,20,.06)";for(var y=36;y<1080;y+=48)for(var x=36;x<1080;x+=48){ctx.beginPath();ctx.arc(x,y,3,0,7);ctx.fill()}
    var s2=Math.min(760/im.width,760/im.height),w2=im.width*s2,h2=im.height*s2;ctx.drawImage(im,(1080-w2)/2,(1080-h2)/2+30,w2,h2)}
   txt($("#mkTop").value,true);txt($("#mkBot").value,false);
   ctx.font="900 30px Inter, sans-serif";ctx.textAlign="right";var tw=ctx.measureText("$HEX").width;ctx.fillStyle="#141414";ctx.beginPath();if(ctx.roundRect)ctx.roundRect(1050-tw-28,1018,tw+28,48,24);else ctx.rect(1050-tw-28,1018,tw+28,48);ctx.fill();ctx.fillStyle="#B6F23A";ctx.fillText("$HEX",1036,1052)})}
 $("#mkTop").addEventListener("input",draw);$("#mkBot").addEventListener("input",draw);
 $("#mkDl").addEventListener("click",function(){try{var a=document.createElement("a");a.download="hex-meme.png";a.href=C.toDataURL("image/png");document.body.appendChild(a);a.click();a.remove();toast("Meme Saved. Go Post It.")}catch(e){toast("Long Press The Meme To Save It")}});
 if(document.fonts&&document.fonts.load){Promise.all([document.fonts.load("92px Anton"),document.fonts.load("900 30px Inter")]).then(draw,draw)}else draw();
}
})();
