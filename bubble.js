/* bubble.js — Oct 16 2026.
   BIG BUBBLE (her voice note 4:18 PM: "make it do exactly like that Teslim thingy, it expands like some sort of way"):
   a port of the mechanism behind teslimalabi.com's hero bubble, a Unicorn Studio WebGL scene (project gA8fP6pmoLZaaVD7PBHu,
   read from its scene file): one image layer + two cursor-trail effects, rendered on a 2:1 canvas around the bubble.
     1. appear: the bubble spins in from 0.7 turn (252deg) to 0 over 5 s, easeInOutQuad, after a 1 s delay, while fading
        in linearly over 2 s. After that it is perfectly still. No breathing, no float, no scroll reaction.
     2. trail A ("default" mouse effect, radius 0.52, momentum 0): the cursor paints its direction into a fading map
        (x0.71 per frame); bubble pixels under it are pushed along the movement with a little RGB split.
     3. trail B ("blur" mouse effect, radius 0.528, softness 0.26, momentum 0.37, amount 0.5, decay x0.74 per frame,
        spread 0.06): the same push, much stronger, smeared with a 24-tap motion blur and RGB split.
   Together: drag the cursor through it and the bubble stretches/expands after the cursor like liquid, then springs back
   in about a third of a second. Her bubble's look is drawn into the texture from the same gradients as the CSS, so
   colours, size and position are unchanged. Renders only while something moves; falls back to the static CSS bubble
   (with a CSS spin-in) without WebGL; nothing runs under prefers-reduced-motion. pointer-events:none, no layout change.
   The small follower bubble (further down) is unchanged. */
(function(){
  if(!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches || !window.requestAnimationFrame) return;
  var probe = document.createElement("canvas");
  var gl = probe.getContext("webgl", {alpha:true, premultipliedAlpha:true, antialias:false, depth:false, stencil:false, powerPreference:"low-power"});
  var c2 = document.createElement("canvas").getContext("2d");
  if(!gl || !c2 || !c2.createConicGradient) return;           // CSS fallback keeps the static bubble + CSS spin-in
  var cv = probe; cv.className = "tb-orb-gl"; cv.setAttribute("aria-hidden","true");

  var VS = "attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}";
  var HSV = "vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.,-1./3.,2./3.,-1.);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);}";
  // trail map pass (his ping-pong shader, line for line; smoothstep written out because edge0 > edge1)
  var FS_TRAIL = "precision highp float;varying vec2 v;uniform sampler2D uPrev;uniform vec2 uM,uPM;uniform float uA,uRad,uSoft,uDecay,uSpread;"+
    "vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.,2./3.,1./3.,3.);vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);}"+
    "void main(){vec2 uv=v;vec2 cu=uv*vec2(uA,1.);vec2 dir=(uM-uPM)*vec2(uA,1.);float dist=length(dir);"+
    "vec2 su=mix(uv,uv/(1.+uSpread*.03)+uSpread*.015,uSpread);vec3 last=pow(texture2D(uPrev,su).rgb,vec3(2.2));vec3 draw=last;"+
    "if(dist>1e-6){dir/=dist;float rad=uRad*.4*mix(uA,1.,.5);float ang=atan(dir.y,dir.x);if(ang<0.)ang+=6.2831852;"+
    "float t=clamp(dot(cu-uPM*vec2(uA,1.),dir)/dist,0.,1.);vec2 cp=mix(uPM,uM,t)*vec2(uA,1.);float dl=distance(cu,cp);"+
    "float s=clamp((dl-rad)/(rad*uSoft-rad),0.,1.);s=s*s*(3.-2.*s);s*=s;"+
    "vec3 mc=pow(hsv2rgb(vec3(ang/6.2831852,1.,1.)),vec3(2.2));float I=min(.7,dist*10.)*s*.4;draw=mix(last,mc,I);}"+
    "draw=max(draw*uDecay-vec3(.00025),0.);gl_FragColor=vec4(pow(draw,vec3(1./2.2)),1.);}";
  // effect A: image layer (her bubble, rotated by the appear spin) + his defaultTrail
  var FS_A = "precision highp float;varying vec2 v;uniform sampler2D uImg,uTr;uniform vec2 uS;uniform float uRot;"+HSV+
    "vec4 img(vec2 uv){vec2 q=(uv-.5)*uS;float c=cos(uRot),s=sin(uRot);q=vec2(c*q.x-s*q.y,s*q.x+c*q.y)+.5;"+
    "if(q.x<0.||q.y<0.||q.x>1.||q.y>1.)return vec4(0.);return texture2D(uImg,q);}"+
    "void main(){vec3 tr=rgb2hsv(texture2D(uTr,v).rgb);float st=tr.z*.4;vec2 md=vec2(cos(tr.x*6.2831853),sin(tr.x*6.2831853))*st;"+
    "vec2 d=md*.4;vec2 u=v-d;vec4 col=img(u);if(st>.0005){vec2 o=d*.67*.12;col.r=img(u-o).r;col.b=img(u+o).b;}gl_FragColor=col;}";
  // effect B: his blurTrail (24 gaussian taps, sigma 12, chromatic aberration per tap) on top of effect A
  var FS_B = "precision highp float;varying vec2 v;uniform sampler2D uTex,uTr;"+HSV+
    "void main(){vec3 tr=rgb2hsv(texture2D(uTr,v).rgb);float st=tr.z;if(st<.002){gl_FragColor=texture2D(uTex,v);return;}"+
    "vec2 md=vec2(cos(tr.x*6.2831853),sin(tr.x*6.2831853))*st;vec2 d=md*.4;vec4 col=vec4(0.);float tw=0.;"+
    "for(int i=0;i<24;i++){float fi=float(i);float w=.7978845608*exp(-fi*fi/288.);vec2 o=d*(1.5+.2401)*mix(1.,fi/24.,.2401);"+
    "vec2 u=v-o;vec4 sm=texture2D(uTex,u);vec2 oo=o*.25*.12;sm.r=texture2D(uTex,u-oo).r;sm.b=texture2D(uTex,u+oo).b;col+=w*sm;tw+=w;}"+
    "gl_FragColor=col/tw;}";

  function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o;}
  function prog(fs){var p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,VS));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.bindAttribLocation(p,0,"p");gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));var u={},n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);
    for(var i=0;i<n;i++){var a=gl.getActiveUniform(p,i);u[a.name]=gl.getUniformLocation(p,a.name);}return {p:p,u:u};}
  var P;
  try{ P = {tr:prog(FS_TRAIL), a:prog(FS_A), b:prog(FS_B)}; }catch(e){ return; }
  var qb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,qb); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0); gl.disable(gl.BLEND);

  function tex(w,h){var t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    if(w)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);return t;}
  function fbo(w,h){var t=tex(w,h),f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);return {t:t,f:f,w:w,h:h};}
  function freeF(o){if(o){gl.deleteTexture(o.t);gl.deleteFramebuffer(o.f);}}
  var imgT = tex(0,0);

  // ---- her bubble, drawn from the exact CSS gradients (v3.css .tb-hero .tb-orb .orb-core / .orb-ring / .orb-gloss) ----
  function stops(g,list){ // CSS interpolates in premultiplied space; sub-stops make the canvas gradient match
    for(var i=0;i<list.length;i++){var a=list[i],b=list[i+1];
      if(!b){g.addColorStop(Math.min(1,a[0]),"rgba("+a[1]+","+a[2]+","+a[3]+","+a[4]+")");break;}
      for(var k=0;k<8;k++){var f=k/8,al=a[4]+(b[4]-a[4])*f,r=[1,2,3].map(function(j){var pm=a[j]*a[4]*(1-f)+b[j]*b[4]*f;return Math.round(al>0?pm/al:b[j]);});
        g.addColorStop(Math.min(1,a[0]+(b[0]-a[0])*f),"rgba("+r[0]+","+r[1]+","+r[2]+","+al.toFixed(4)+")");}}
  }
  function paint(D){
    var cn = document.createElement("canvas"); cn.width = cn.height = D; var x = cn.getContext("2d"), R2 = Math.SQRT1_2*D;
    x.save(); x.beginPath(); x.arc(D/2,D/2,D/2,0,7); x.clip();
    [[.5,.5,[[0,18,20,26,.30],[.62,12,13,18,.55],[.71,10,10,10,0]]],
     [.62,.64,[[0,70,110,160,.18],[.30,40,60,90,.08],[.58,40,60,90,0]]],
     [.30,.55,[[0,150,160,180,.12],[.30,150,160,180,0]]],
     [.34,.30,[[0,255,255,255,.10],[.22,255,255,255,0]]]].forEach(function(L){
      var cx=L[0]*D, cy=L[1]*D, R=Math.max(Math.hypot(cx,cy),Math.hypot(D-cx,cy),Math.hypot(cx,D-cy),Math.hypot(D-cx,D-cy));
      var g=x.createRadialGradient(cx,cy,0,cx,cy,R); stops(g,L[2]); x.fillStyle=g; x.fillRect(0,0,D,D);
    });
    // ring: conic gradient, masked by the radial ring mask x the 95deg linear mask, opacity .9 (the CSS blur sits under the mask)
    var rn = document.createElement("canvas"); rn.width = rn.height = D; var r = rn.getContext("2d");
    var cg = r.createConicGradient(-Math.PI/2,D/2,D/2);
    [[0,"#6d6bff"],[70,"#4fc8ff"],[140,"#5fe8c0"],[190,"#b8f06a"],[215,"#ffd84d"],[240,"#ff9a3c"],[268,"#ff4d6d"],[305,"#d05bff"],[360,"#6d6bff"]].forEach(function(s){cg.addColorStop(s[0]/360,s[1]);});
    r.fillStyle=cg; r.beginPath(); r.arc(D/2,D/2,D/2,0,7); r.fill();
    r.globalCompositeOperation="destination-in";
    var rg=r.createRadialGradient(D/2,D/2,0,D/2,D/2,R2); [[0,0],[.52,0],[.60,.35],[.675,1],[.695,1],[.71,0],[1,0]].forEach(function(s){rg.addColorStop(s[0],"rgba(0,0,0,"+s[1]+")");});
    r.fillStyle=rg; r.fillRect(0,0,D,D);
    var an=95*Math.PI/180, dx=Math.sin(an), dy=-Math.cos(an), Lh=(Math.abs(D*dx)+Math.abs(D*dy))/2;
    var lg=r.createLinearGradient(D/2-dx*Lh,D/2-dy*Lh,D/2+dx*Lh,D/2+dy*Lh); [[0,1],[.35,.8],[.70,.22],[1,.08]].forEach(function(s){lg.addColorStop(s[0],"rgba(0,0,0,"+s[1]+")");});
    r.fillStyle=lg; r.fillRect(0,0,D,D);
    x.globalAlpha=.9; x.drawImage(rn,0,0); x.globalAlpha=1;
    // gloss: ellipse 34% x 16% at 20%/12%, radial .22 white -> 0 at 70% (farthest-corner), blur(6px)
    var gw=.34*D, gh=.16*D, gx=.20*D+gw/2, gy=.12*D+gh/2, k=D/cssD;
    if(typeof x.filter==="string") x.filter="blur("+(6*k).toFixed(1)+"px)";
    x.save(); x.translate(gx,gy); x.scale(1,gh/gw); var gg=x.createRadialGradient(0,0,0,0,0,gw/2*Math.SQRT2);
    gg.addColorStop(0,"rgba(255,255,255,.22)"); gg.addColorStop(.7,"rgba(255,255,255,0)"); gg.addColorStop(1,"rgba(255,255,255,0)");
    x.fillStyle=gg; x.beginPath(); x.arc(0,0,gw/2,0,7); x.fill(); x.restore(); x.filter="none";
    x.restore();
    return cn;
  }

  // ---- state ----
  var wrap = null, cssD = 0, W = 0, H = 0, dpr = 1, tA = null, tB = null, tA2 = null, tB2 = null, eA = null, scaleUv = [1,1];
  var m = null, pm = null, m1 = null, pm1 = null, tgt = null;   // trail A uses the raw cursor, trail B a momentum-smoothed one
  var idle = 999, running = false, lastTs = 0, introT0 = -1, shown = false, lost = false;
  var SPIN = .7*2*Math.PI;
  function easeIOQ(t){ return t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }

  function size(){
    if(!wrap) return false;
    var orb = wrap.querySelector(".orb"); var D = orb ? orb.offsetWidth : wrap.offsetWidth;
    var cw = cv.offsetWidth, ch = cv.offsetHeight; if(!D || !cw || !ch) return false;
    var nd = Math.min(1.5, window.devicePixelRatio || 1);
    if(D === cssD && cw === W && ch === H && nd === dpr) return true;
    cssD = D; W = cw; H = ch; dpr = nd;
    cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr);
    scaleUv = [W/D, H/D];
    var tw = Math.max(2,Math.round(W*.5)), th = Math.max(2,Math.round(H*.5));
    [tA,tB,tA2,tB2,eA].forEach(freeF);
    tA = fbo(tw,th); tA2 = fbo(tw,th); tB = fbo(tw,th); tB2 = fbo(tw,th); eA = fbo(cv.width,cv.height);
    var T = Math.min(2048, Math.round(D*dpr*1.25));
    gl.bindTexture(gl.TEXTURE_2D,imgT); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,paint(T));
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
    return true;
  }
  function radA(){ var w = innerWidth; return w >= 992 ? .52 : w >= 576 ? .722 : .5; }   // his breakpoints for trail A
  function trail(src, dst, M, PM, rad, soft, decay, spread){
    gl.bindFramebuffer(gl.FRAMEBUFFER,dst.f); gl.viewport(0,0,dst.w,dst.h); gl.useProgram(P.tr.p); var u=P.tr.u;
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,src.t); gl.uniform1i(u.uPrev,0);
    gl.uniform2f(u.uM,M[0],M[1]); gl.uniform2f(u.uPM,PM[0],PM[1]); gl.uniform1f(u.uA,W/H);
    gl.uniform1f(u.uRad,rad); gl.uniform1f(u.uSoft,soft); gl.uniform1f(u.uDecay,decay); gl.uniform1f(u.uSpread,spread);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function draw(rot){
    var M = m || [-9,-9], PM = pm || M, M1 = m1 || M, PM1 = pm1 || M1;
    trail(tA, tA2, M, PM, radA(), 0, Math.pow(.18,.2), 0);   var s=tA; tA=tA2; tA2=s;
    trail(tB, tB2, M1, PM1, .528, .26, Math.pow(.22,.2), .06); s=tB; tB=tB2; tB2=s;
    gl.bindFramebuffer(gl.FRAMEBUFFER,eA.f); gl.viewport(0,0,eA.w,eA.h); gl.useProgram(P.a.p);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,imgT); gl.uniform1i(P.a.u.uImg,0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,tA.t); gl.uniform1i(P.a.u.uTr,1);
    gl.uniform2f(P.a.u.uS,scaleUv[0],scaleUv[1]); gl.uniform1f(P.a.u.uRot,rot); gl.drawArrays(gl.TRIANGLES,0,6);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null); gl.viewport(0,0,cv.width,cv.height); gl.useProgram(P.b.p);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,eA.t); gl.uniform1i(P.b.u.uTex,0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,tB.t); gl.uniform1i(P.b.u.uTr,1);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function kick(){ if(!running && wrap && !lost){ running = true; lastTs = 0; requestAnimationFrame(tick); } }
  function tick(ts){
    if(!wrap || lost){ running = false; return; }
    if(lastTs && ts - lastTs < 14){ requestAnimationFrame(tick); return; }   // his scene runs at 60 fps; the trails decay per frame
    lastTs = ts;
    if(!size()){ running = false; return; }
    // momentum 0.37 (his getMousePosWithMomentum: two halvings toward the last position = 1/4 of the way per frame)
    pm = m; m = tgt;
    pm1 = m1; if(tgt){ if(!m1) m1 = tgt.slice(); else if(Math.abs(tgt[0]-m1[0])*W > .001 || Math.abs(tgt[1]-m1[1])*H > .001) m1 = [(tgt[0]+3*m1[0])/4,(tgt[1]+3*m1[1])/4]; }
    var rot = 0, op = 1, intro = false;
    if(introT0 >= 0){
      var t = ts - introT0; intro = t < 6100;
      rot = SPIN*(1 - easeIOQ(Math.max(0,Math.min(1,(t-1000)/5000))));
      op = Math.max(0,Math.min(1,(t-1000)/2000));
      if(!intro) introT0 = -1;
    }
    draw(rot);
    cv.style.opacity = op.toFixed(3);
    if(!shown){ shown = true; wrap.classList.add("tb-gl-on"); }
    idle++;
    var chasing = tgt && m1 && (Math.abs(tgt[0]-m1[0])*W > .5 || Math.abs(tgt[1]-m1[1])*H > .5);
    if(!intro && idle > 50 && !chasing){ running = false; return; }   // trails have faded to zero: hold the still frame
    requestAnimationFrame(tick);
  }
  function move(cx, cy){
    if(!wrap) return; var r = cv.getBoundingClientRect(); if(!r.width) return;
    tgt = [(cx - r.left)/r.width, 1 - (cy - r.top)/r.height];
    if(!m){ m = pm = tgt; m1 = pm1 = tgt.slice(); }
    if(r.bottom < 0 || r.top > innerHeight) return;
    idle = 0; kick();
  }
  addEventListener("pointermove", function(e){ move(e.clientX, e.clientY); }, {passive:true});
  addEventListener("touchmove", function(e){ var t = e.touches && e.touches[0]; if(t) move(t.clientX, t.clientY); }, {passive:true});   // his scene listens to touchmove on phones
  addEventListener("resize", function(){ if(wrap){ idle = 0; kick(); } }, {passive:true});
  cv.addEventListener("webglcontextlost", function(e){ e.preventDefault(); lost = true; if(wrap) wrap.classList.remove("tb-gl-on"); }, false);

  window.tbBigBubble = { attach: function(w){
    if(w === wrap) return;
    wrap = w; shown = false; m = pm = m1 = pm1 = tgt = null;
    if(!w){ if(cv.parentNode) cv.parentNode.removeChild(cv); return; }
    w.appendChild(cv); cv.style.opacity = "0"; cssD = 0;
    if(tA){ [tA,tA2,tB,tB2].forEach(function(o){ gl.bindFramebuffer(gl.FRAMEBUFFER,o.f); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); }); }
    introT0 = w.classList.contains("tb-orb-intro") ? performance.now() : -1;
    idle = 0; kick();
  }};
})();

/* SMALL FOLLOWER BUBBLE (unchanged): once she scrolls a small copy pops out of the big bubble and follows the cursor
   (desktop) or floats by the right edge with the scroll (touch). Back at the top it flies home into the big bubble. */
(function(){
  if(!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches || !window.requestAnimationFrame) return;
  var page = document.getElementById("page") || document.querySelector("main");
  var TOP = 60;                                  // within this many px of the top = "at the top"
  var touchMode = matchMedia("(hover: none), (pointer: coarse)").matches;
  var orbWrap = null, orbEl = null, first = true;
  var bf = null;
  var mx = -1, my = -1, hasMouse = false;        // last cursor position
  var tx = -1, ty = -1, hasTouch = false;        // last finger position (phones)
  var x = 0, y = 0, vx = 0, vy = 0;              // follower position + smoothed velocity
  var s = 0, op = 0;                             // follower scale + opacity
  var state = "home";                            // home | pop | out | back
  var popT = 0, lastSY = scrollY, sv = 0, running = false, lastTs = 0;

  function grabOrb(){
    var w = page && page.querySelector(".tb-hero .tb-orb");
    if(w !== orbWrap){
      orbWrap = w; orbEl = w ? w.querySelector(".orb") : null;
      if(w && first) w.classList.add("tb-orb-intro");   // the slow dance-in plays on first load only; a tab switch shows it at once
      if(w) first = false;
      if(window.tbBigBubble) window.tbBigBubble.attach(w);
      if(!w && state !== "home") hide();                 // a page with no hero: nothing to pop out of
    }
  }
  function orbCenter(){
    if(!orbEl) return null;
    var r = orbEl.getBoundingClientRect();
    if(r.bottom < 0 || r.top > innerHeight) return null;
    return {x: r.left + r.width/2, y: r.top + r.height/2, w: r.width};
  }
  function make(){
    bf = document.createElement("div"); bf.id = "tb-bf"; bf.setAttribute("aria-hidden","true");
    bf.innerHTML = '<div class="bf-in"><div class="bf-core"></div><div class="bf-ring"></div><div class="bf-gloss"></div></div>';
    document.body.appendChild(bf);
  }
  function hide(){ state = "home"; s = 0; op = 0; if(bf){ bf.style.opacity = "0"; bf.style.transform = "translate3d(-300px,-300px,0)"; } }
  function homePoint(){
    var c = orbCenter();
    if(c){ // a spot on the bubble's visible part (on phones the bubble hangs off the right edge)
      var hx = Math.min(c.x, innerWidth - 60); return {x: hx, y: c.y};
    }
    return {x: innerWidth - 60, y: 120};
  }
  function target(){
    if(!touchMode && hasMouse) return {x: mx + 26, y: my + 22};      // just off the pointer so it never covers what she points at
    if(touchMode && hasTouch) return {x: Math.max(30, Math.min(innerWidth-30, tx)), y: Math.max(30, ty - 70)};  // phones: follows the finger, just above it
    var bob = Math.sin(performance.now()/900) * 6;
    var yy = innerHeight * 0.58 - Math.max(-140, Math.min(140, sv * 9)) + bob;  // lags behind the scroll, then settles
    return {x: innerWidth - (touchMode ? 19 : 46), y: yy};   // on phones it hugs the edge, beside the text column
  }
  function kick(){ if(!running){ running = true; lastTs = 0; requestAnimationFrame(tick); } }
  function easeOutBack(t){ var c1 = 1.9, c3 = c1 + 1; return 1 + c3*Math.pow(t-1,3) + c1*Math.pow(t-1,2); }

  function tick(ts){
    var dt = lastTs ? Math.min(50, ts - lastTs) : 16; lastTs = ts;
    var k = dt / 16.67;
    var sy = scrollY; sv += ((sy - lastSY) - sv) * Math.min(1, .25*k); lastSY = sy;
    var atTop = sy <= TOP;

    // the follower
    if(!orbWrap && state !== "home") hide();
    if(state === "home" && !atTop && orbWrap){
      if(!bf) make();
      var h = homePoint(); x = h.x; y = h.y; s = .2; op = 0; vx = vy = 0; popT = 0; state = "pop";
    }
    if((state === "pop" || state === "out") && atTop) state = "back";
    if(state === "back" && !atTop) state = "out";
    if(state !== "home" && bf){
      var t = state === "back" ? homePoint() : target();
      var ease = state === "pop" ? .16 : state === "back" ? .14 : (touchMode || !hasMouse ? .09 : .12);
      var nx = x + (t.x - x) * Math.min(1, ease*k), ny = y + (t.y - y) * Math.min(1, ease*k);
      vx += ((nx - x) - vx) * .3; vy += ((ny - y) - vy) * .3; x = nx; y = ny;
      if(state === "pop"){
        popT = Math.min(1, popT + dt/420);
        s = .2 + .8*easeOutBack(popT); op = Math.min(1, popT*2.2);
        if(popT >= 1){ state = "out"; s = 1; }
      } else if(state === "out"){ s += (1 - s)*.2*k; op += (1 - op)*.2*k; }
      else { // back: shrink into the big bubble and vanish
        var d = Math.hypot(t.x - x, t.y - y);
        s += ((d < 40 ? .15 : .7) - s)*.16*k; op += ((d < 30 ? 0 : 1) - op)*.2*k;
        if(d < 14 && op < .06){ hide(); }
      }
      if(state !== "home"){
        var sp = Math.min(.14, Math.hypot(vx, vy)/120), a = Math.atan2(vy, vx)*57.2958;   // a little liquid stretch along the motion
        bf.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + a.toFixed(1) + "deg) scale(" + (s*(1+sp)).toFixed(3) + "," + (s*(1-sp*.6)).toFixed(3) + ") rotate(" + (-a).toFixed(1) + "deg)";
        bf.style.opacity = Math.max(0, Math.min(1, op)).toFixed(3);
      }
    }

    var stop = (state === "home" ||
      (state === "out" && !touchMode && hasMouse && Math.abs(x - mx - 26) < .3 && Math.abs(y - my - 22) < .3 && Math.abs(sv) < .05 && Math.abs(s - 1) < .002 && op > .995));
    if(stop){ running = false; return; }
    requestAnimationFrame(tick);
  }

  addEventListener("scroll", kick, {passive:true});
  addEventListener("pointermove", function(e){
    if(e.pointerType === "mouse"){ mx = e.clientX; my = e.clientY; hasMouse = true; touchMode = false; kick(); }
  }, {passive:true});
  function fing(e){ var t = e.touches && e.touches[0]; if(t){ tx = t.clientX; ty = t.clientY; hasTouch = true; kick(); } }
  addEventListener("touchstart", fing, {passive:true});
  addEventListener("touchmove", fing, {passive:true});
  addEventListener("resize", kick, {passive:true});
  document.addEventListener("mouseleave", function(){ /* keep the last spot; it settles there */ });

  grabOrb();
  if(page) new MutationObserver(function(){ grabOrb(); kick(); }).observe(page, {childList:true});
  if(scrollY > TOP) kick();
})();
