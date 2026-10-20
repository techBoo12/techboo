/* AuxHR case: animated UI vignettes (.axv[data-axv]) and moving interludes (.axi[data-axi]).
   Plain IIFE, no libraries. Built Oct 20 2026 for techBoo's AuxHR case study. */
(function () {
  "use strict";
  var W = 400, H = 250;
  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var I = {
    check: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"/></svg>',
    clock: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8" cy="8" r="6.2"/><path d="M8 4.6V8l2.3 1.5"/></svg>',
    sort: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v10M2.5 10.5L5 13l2.5-2.5M11 13V3M8.5 5.5L11 3l2.5 2.5"/></svg>',
    spark: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M8 1.5l1.6 4.2 4.4 1.6-4.4 1.6L8 13.1 6.4 8.9 2 7.3l4.4-1.6z"/></svg>',
    brief: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="2" y="4.8" width="12" height="8.6" rx="2"/><path d="M5.8 4.8V3.6c0-.7.5-1.1 1.1-1.1h2.2c.6 0 1.1.4 1.1 1.1v1.2"/></svg>',
    doc: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 1.8h5.2L12.5 5v9.2H4z"/><path d="M9 1.8V5h3.5M6 8.2h4.5M6 11h4.5"/></svg>',
    link: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6.6 9.4l2.8-2.8M7.2 4.6l1-1a2.6 2.6 0 013.7 3.7l-1 1M8.8 11.4l-1 1a2.6 2.6 0 01-3.7-3.7l1-1"/></svg>',
    thumb: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M2 7h2.4v7H2zM5.6 13.6V7.2l2.9-4.9c.2-.4.7-.5 1.1-.3.6.3 1 1 .8 1.7L9.8 6.4h3.3c.9 0 1.5.8 1.3 1.7l-1.1 4.7c-.2.8-.9 1.3-1.7 1.3H6.2c-.3 0-.6-.2-.6-.5z"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h9.5M8.8 4.2L12.6 8l-3.8 3.8"/></svg>',
    plus: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3.5v9M3.5 8h9"/></svg>',
    users: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6" cy="5.6" r="2.4"/><path d="M1.8 13.4c.4-2.3 2.2-3.6 4.2-3.6s3.8 1.3 4.2 3.6M10.6 3.4a2.3 2.3 0 010 4.4M12 9.9c1.2.4 2 1.6 2.2 3.5"/></svg>',
    gear: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="2.2"/><path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4"/></svg>',
    cursor: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 2.8l13.4 9.9-6.1.9 3.6 6.9-2.6 1.3-3.6-7-4.5 4.2z" fill="#fff" stroke="#0f1652" stroke-width="1.4" stroke-linejoin="round"/></svg>'
  };

  function hd(icon, title, right) {
    return '<div class="axv-hd"><span class="axv-ic">' + icon + '</span><b>' + title + '</b>' + (right ? '<span class="axv-chip">' + right + '</span>' : '') + '</div>';
  }
  /* stock-style headshots for every avatar circle (Oct 20 2026, her word: "put them with actual stock pictures") */
  var FB = (document.body.getAttribute("data-base") || "../") + "assets/cases/auxhr/avatars/";
  var FACE = { "Amaka Obi": "amaka_obi", "Adaeze Okonkwo": "adaeze_okonkwo", "Adaeze O.": "adaeze_okonkwo", "Tunde Bakare": "tunde_bakare",
    "Chidi Eze": "chidi_eze", "Bola A.": "bola_adeyemi", "Bola Adeyemi": "bola_adeyemi", "Ifeoma N.": "ifeoma_nwosu", "Ifeoma Nwosu": "ifeoma_nwosu",
    "Kunle Adebayo": "kunle_adebayo", "Ngozi Eze": "ngozi_eze", "Emeka Uche": "emeka_uche", "Zainab Bello": "zainab_bello", "Seun Ogunleye": "seun_ogunleye",
    "Funmi Alade": "funmi_alade", "Yemi Oladipo": "yemi_oladipo", "Chiamaka Ibe": "chiamaka_ibe", "Musa Garba": "musa_garba", "Tolu Fashola": "tolu_fashola" };
  function av(ini, hue, nm) {
    var f = nm && FACE[nm];
    if (!f) return '<span class="axv-av h' + (hue || 0) + '">' + ini + '</span>';
    return '<span class="axv-av ph h' + (hue || 0) + '"><img src="' + FB + f + '-96.webp" srcset="' + FB + f + '-96.webp 96w, ' + FB + f + '-192.webp 192w" sizes="40px" alt="' + nm + '" width="40" height="40" decoding="async"></span>';
  }

  /* ---------------- runner ---------------- */
  function Runner(root, scene) {
    var self = this;
    this.root = root; this.timers = []; this.rafs = []; this.steps = []; this.resets = []; this.dur = 6000; this.instant = false; this.fresh = true;
    var c = document.createElement("div"); c.className = "axv-c";
    var s = document.createElement("div"); s.className = "axv-s";
    c.appendChild(s); root.appendChild(c);
    this.c = c; this.s = s;
    var api = {
      q: function (sel) { return s.querySelector(sel); },
      qa: function (sel) { return Array.prototype.slice.call(s.querySelectorAll(sel)); },
      at: function (ms, fn) { self.steps.push([ms, fn]); },
      reset: function (fn) { self.resets.push(fn); },
      dur: function (ms) { self.dur = ms; },
      count: function (node, from, to, ms, fmt) { self.count(node, from, to, ms, fmt); },
      cls: function (node, name, on) { if (node) node.classList[on === false ? "remove" : "add"](name); },
      tap: function (node) { if (self.instant || !node) return; node.classList.remove("on"); void node.offsetWidth; node.classList.add("on"); },
      runner: self
    };
    s.innerHTML = scene.html;
    scene.init(api);
    this.steps.sort(function (a, b) { return a[0] - b[0]; });
    this.fit();
    this.applyReset();
  }
  Runner.prototype.fit = function () {
    var w = this.root.clientWidth || W;
    this.c.style.transform = "scale(" + (w / W) + ")";
  };
  Runner.prototype.count = function (node, from, to, ms, fmt) {
    fmt = fmt || function (v) { return String(Math.round(v)); };
    if (!node) return;
    if (this.instant || !ms) { node.textContent = fmt(to); return; }
    var t0 = performance.now(), self = this;
    node.textContent = fmt(from);
    var id = { v: 0 };
    function tick(now) {
      var p = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      node.textContent = fmt(from + (to - from) * e);
      if (p < 1) id.v = requestAnimationFrame(tick);
    }
    id.v = requestAnimationFrame(tick);
    this.rafs.push(id);
  };
  Runner.prototype.applyReset = function () {
    var r = this.root;
    r.classList.add("axv-nt");
    this.resets.forEach(function (fn) { fn(); });
    void r.offsetWidth;
    r.classList.remove("axv-nt");
  };
  Runner.prototype.stop = function () {
    this.timers.forEach(clearTimeout); this.timers = [];
    this.rafs.forEach(function (id) { cancelAnimationFrame(id.v); }); this.rafs = [];
    this.running = false;
  };
  Runner.prototype.play = function () {
    var self = this;
    this.stop(); this.running = true;
    if (!this.fresh) {
      this.root.classList.add("axv-nt");
      this.s.style.opacity = "0";
      this.resets.forEach(function (fn) { fn(); });
      void this.root.offsetWidth;
      this.root.classList.remove("axv-nt");
      this.s.style.opacity = "1";
    }
    this.fresh = false;
    this.steps.forEach(function (st) {
      self.timers.push(setTimeout(st[1], st[0]));
    });
    this.timers.push(setTimeout(function () { self.s.style.opacity = "0"; }, this.dur - 420));
    this.timers.push(setTimeout(function () { self.play(); }, this.dur));
  };
  Runner.prototype.final = function () {
    this.stop();
    this.root.classList.add("axv-nt");
    this.instant = true;
    this.resets.forEach(function (fn) { fn(); });
    this.steps.forEach(function (st) { st[1](); });
    this.instant = false;
    this.s.style.opacity = "1";
    void this.root.offsetWidth;
  };

  /* ---------------- vignettes ---------------- */
  var S = {};

  /* discover: role cards re-sort by fit */
  S.discover = function () {
    var roles = [
      ["Brand Designer", "Lumen Pay · Remote", "LP", 72, 2],
      ["Product Designer", "Kosana Tech · Lagos, Hybrid", "KT", 94, 0],
      ["UX Researcher", "Halo Logistics · Remote", "HL", 83, 1]
    ];
    var sorted = [2, 0, 1]; // new slot per original index
    var html = hd(I.spark, "Matched For You", I.sort + " Sorted By Fit") + '<div class="dsc">';
    roles.forEach(function (r, i) {
      html += '<div class="dsc-card" data-i="' + i + '">' +
        '<span class="dsc-logo h' + r[4] + '">' + r[2] + '</span>' +
        '<div class="dsc-t"><b>' + r[0] + '<em class="dsc-top">Top Match</em></b><small>' + r[1] + '</small></div>' +
        '<div class="dsc-m"><span class="dsc-pct">0%</span><small>Match</small></div></div>';
    });
    html += '</div>';
    return {
      html: html,
      init: function (A) {
        var cards = A.qa(".dsc-card"), pcts = A.qa(".dsc-pct");
        A.reset(function () {
          cards.forEach(function (c, i) { c.style.transform = "translateY(" + i * 62 + "px)"; c.classList.remove("top", "up", "dn"); });
          pcts.forEach(function (p) { p.textContent = "0%"; p.parentNode.classList.remove("hi"); });
        });
        A.at(250, function () {
          pcts.forEach(function (p, i) { A.count(p, 0, roles[i][3], 1500 + i * 120, function (v) { return Math.round(v) + "%"; }); });
        });
        A.at(1950, function () {
          cards.forEach(function (c, i) { c.classList.toggle("up", sorted[i] < i); c.classList.toggle("dn", sorted[i] > i); c.style.transform = "translateY(" + sorted[i] * 62 + "px)"; });
        });
        A.at(2750, function () { cards.forEach(function (c) { c.classList.remove("up", "dn"); }); });
        A.at(2750, function () { A.cls(cards[1], "top"); A.cls(pcts[1].parentNode, "hi"); });
        A.dur(6400);
      }
    };
  };

  /* assess: timer, progress, passed chip */
  S.assess = function () {
    var opts = ["Funnel Analytics", "Button Colour", "Session Recordings", "Page Load Time"];
    var html = hd(I.doc, "Product Design Assessment", I.clock + ' <span class="as-time">04:52</span>') +
      '<div class="as-prog"><span class="as-q">Question 9 Of 10</span><span class="as-pc">80%</span><i><u></u></i></div>' +
      '<div class="as-card"><p>A user drops off at step 3 of onboarding. What do you check first?</p><div class="as-opts">';
    opts.forEach(function (o, i) { html += '<span class="as-o" data-i="' + i + '"><i></i>' + o + '</span>'; });
    html += '</div></div><div class="as-pass"><span class="as-pi">' + I.check + '</span>Passed, Moved To Shortlist</div>';
    return {
      html: html,
      init: function (A) {
        var time = A.q(".as-time"), bar = A.q(".as-prog u"), q = A.q(".as-q"), pc = A.q(".as-pc"), o = A.qa(".as-o"), pass = A.q(".as-pass");
        var sec0 = 292;
        function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return "0" + m + ":" + (r < 10 ? "0" : "") + r; }
        A.reset(function () {
          time.textContent = fmt(sec0); bar.style.transform = "scaleX(.8)"; q.textContent = "Question 9 Of 10"; pc.textContent = "80%";
          o.forEach(function (x) { x.classList.remove("hov", "sel"); }); pass.classList.remove("on");
        });
        for (var k = 1; k <= 6; k++) (function (k) { A.at(k * 1000, function () { time.textContent = fmt(sec0 - k); }); })(k);
        A.at(900, function () { A.cls(o[2], "hov"); });
        A.at(1500, function () { A.cls(o[2], "hov", false); A.cls(o[0], "hov"); });
        A.at(2100, function () { A.cls(o[0], "hov", false); A.cls(o[0], "sel"); });
        A.at(2600, function () { bar.style.transform = "scaleX(1)"; q.textContent = "Question 10 Of 10"; A.count(pc, 80, 100, 700, function (v) { return Math.round(v) + "%"; }); });
        A.at(3400, function () { A.cls(pass, "on"); });
        A.dur(6800);
      }
    };
  };

  /* track: status pipeline */
  S.track = function () {
    var st = ["Applied", "In Review", "Interview", "Offer"];
    var msg = [["Application Received", "Kosana Tech has your profile"], ["CV Under Review", "Scored 92% match by AuxHR AI"], ["Interview Scheduled", "Thu, 10:00 AM · Google Meet"], ["Offer Received", "Respond by Friday"]];
    var html = hd(I.brief, "Application Status", "Kosana Tech") +
      '<div class="tr-job"><b>Product Designer</b><small>Applied 3 Days Ago</small></div><div class="tr-line"><i class="tr-fill"></i><i class="tr-dot"></i>';
    st.forEach(function (s, i) { html += '<span class="tr-n" style="left:' + (i * 100 / 3) + '%"><i>' + I.check + '</i><small>' + s + '</small></span>'; });
    html += '</div><div class="tr-msg"><span class="tr-mi">' + I.spark + '</span><div><b>' + msg[0][0] + '</b><small>' + msg[0][1] + '</small></div></div>';
    return {
      html: html,
      init: function (A) {
        var fill = A.q(".tr-fill"), dot = A.q(".tr-dot"), n = A.qa(".tr-n"), box = A.q(".tr-msg"), mb = A.q(".tr-msg b"), ms = A.q(".tr-msg small");
        var span = 304;
        function setMsg(i) {
          if (A.runner.instant) { mb.textContent = msg[i][0]; ms.textContent = msg[i][1]; box.classList.toggle("ok", i === 3); return; }
          box.classList.add("sw");
          setTimeout(function () { mb.textContent = msg[i][0]; ms.textContent = msg[i][1]; box.classList.toggle("ok", i === 3); box.classList.remove("sw"); }, 220);
        }
        A.reset(function () {
          fill.style.transform = "scaleX(0)"; dot.style.transform = "translateX(0px)";
          n.forEach(function (x, i) { x.classList.toggle("on", i === 0); });
          mb.textContent = msg[0][0]; ms.textContent = msg[0][1]; box.classList.remove("ok", "sw");
        });
        [1, 2, 3].forEach(function (i) {
          A.at(600 + (i - 1) * 1700, function () { fill.style.transform = "scaleX(" + i / 3 + ")"; dot.style.transform = "translateX(" + span * i / 3 + "px)"; });
          A.at(1500 + (i - 1) * 1700, function () { A.cls(n[i], "on"); setMsg(i); });
        });
        A.dur(7800);
      }
    };
  };

  /* apply: one click, profile carries over */
  S.apply = function () {
    var html = '<div class="ap-prof"><small class="axv-lab">Your Profile</small>' + av("AO", 1, "Amaka Obi") +
      '<b>Amaka Obi</b><small>Product Designer · Lagos</small>' +
      '<ul><li>' + I.doc + 'Amaka_Obi_CV.pdf</li><li>' + I.link + 'Portfolio Linked</li><li>' + I.spark + 'Profile 85%</li></ul></div>' +
      '<div class="ap-app"><small class="axv-lab">Application</small><b>Product Designer</b><small>Kosana Tech · Hybrid</small>' +
      '<div class="ap-slot"><span class="ap-ph">Profile Carries Over</span><span class="ap-ticks"><em>' + I.check + 'CV</em><em>' + I.check + 'Portfolio</em><em>' + I.check + 'Profile</em></span></div>' +
      '<button class="ap-btn" type="button" tabindex="-1"><span class="ap-l1">Apply In 1 Click</span><span class="ap-l2">Applied ' + I.check + '</span><i class="axv-rip"></i></button></div>' +
      '<div class="ap-ghost">' + av("AO", 1, "Amaka Obi") + '<div><b>Amaka Obi</b><small>CV + Portfolio</small></div></div>' +
      '<span class="axv-cur">' + I.cursor + '</span>';
    return {
      html: html,
      init: function (A) {
        var cur = A.q(".axv-cur"), btn = A.q(".ap-btn"), rip = A.q(".axv-rip"), ghost = A.q(".ap-ghost"), slot = A.q(".ap-slot");
        A.reset(function () {
          cur.style.transform = "translate(410px,262px)"; btn.classList.remove("done", "press"); ghost.className = "ap-ghost"; slot.classList.remove("full");
        });
        A.at(300, function () { cur.style.transform = "translate(300px,206px)"; });
        A.at(1350, function () { A.cls(btn, "press"); A.tap(rip); });
        A.at(1550, function () { A.cls(btn, "press", false); A.cls(ghost, "show"); });
        A.at(1900, function () { A.cls(ghost, "go"); cur.style.transform = "translate(330px,230px)"; });
        A.at(2750, function () { A.cls(slot, "full"); });
        A.at(3150, function () { A.cls(btn, "done"); });
        A.at(3700, function () { cur.style.transform = "translate(410px,262px)"; });
        A.dur(6800);
      }
    };
  };

  /* post: job post list with applicant counters */
  S.post = function () {
    var rows = [["Sales Representative", "Lagos · Full Time", 41, 56, 1, 0], ["Product Designer", "Remote · Full Time", 108, 127, 1, 1], ["Backend Engineer", "Abuja · Contract", 86, 86, 0, 2]];
    var html = hd(I.brief, "Job Posts", I.plus + " New Post") + '<div class="ps">';
    rows.forEach(function (r) {
      html += '<div class="ps-row' + (r[4] ? '' : ' off') + '"><span class="ps-ic h' + r[5] + '">' + I.brief + '</span><div class="ps-t"><b>' + r[0] + '</b><small>' + r[1] + '</small></div>' +
        '<div class="ps-n"><b><span class="ps-v">' + r[2] + '</span><em class="ps-plus">+1</em></b><small>Applicants</small></div>' +
        '<span class="ps-pill">' + (r[4] ? 'Open' : 'Closed') + '</span></div>';
    });
    html += '</div>';
    return {
      html: html,
      init: function (A) {
        var v = A.qa(".ps-v"), pl = A.qa(".ps-plus"), cur = [0, 0];
        A.reset(function () { v.forEach(function (x, i) { x.textContent = rows[i][2]; }); cur = [rows[0][2], rows[1][2]]; pl.forEach(function (p) { p.classList.remove("on"); }); });
        A.at(200, function () {
          if (A.runner.instant) { v[0].textContent = rows[0][3]; v[1].textContent = rows[1][3]; }
          else { A.count(v[0], rows[0][2], rows[0][3] - 3, 1600); A.count(v[1], rows[1][2], rows[1][3] - 3, 1800); }
        });
        [2400, 3000, 3500, 3900, 4400, 4800].forEach(function (t, k) {
          A.at(t, function () {
            if (A.runner.instant) return;
            var i = k % 2, val = rows[i][3] - 3 + Math.floor(k / 2) + 1;
            v[i].textContent = val; A.tap(pl[i]);
          });
        });
        A.dur(6600);
      }
    };
  };

  /* screen: candidate brief with three score bars */
  S.screen = function () {
    var bars = [["CV Match", 88], ["Screening", 84], ["Personality Fit", 82]];
    var html = '<div class="sc-top">' + av("TB", 0, "Tunde Bakare") + '<div><b>Tunde Bakare</b><small>Sales Representative · Applied Today</small></div>' +
      '<div class="sc-ov"><b class="sc-total">0</b><small>Overall</small></div></div><div class="sc-bars">';
    bars.forEach(function (b, i) { html += '<div class="sc-b b' + i + '"><span>' + b[0] + '</span><b class="sc-v">0%</b><i><u></u></i></div>'; });
    html += '</div><div class="sc-next"><span class="sc-ni">' + I.arrow + '</span>Suggested Next Step: <b>Interview</b></div>';
    return {
      html: html,
      init: function (A) {
        var u = A.qa(".sc-b u"), val = A.qa(".sc-v"), tot = A.q(".sc-total"), nx = A.q(".sc-next");
        var pct = function (x) { return Math.round(x) + "%"; };
        A.reset(function () { u.forEach(function (x) { x.style.transform = "scaleX(0)"; }); val.forEach(function (x) { x.textContent = "0%"; }); tot.textContent = "0"; nx.classList.remove("on"); });
        bars.forEach(function (b, i) {
          A.at(350 + i * 700, function () { u[i].style.transform = "scaleX(" + b[1] / 100 + ")"; A.count(val[i], 0, b[1], 1100, pct); });
        });
        A.at(2300, function () { A.count(tot, 0, 85, 900); });
        A.at(3200, function () { A.cls(nx, "on"); });
        A.dur(6800);
      }
    };
  };

  /* pipeline: scored rows arrive, one slides to shortlisted */
  S.pipeline = function () {
    var html = hd(I.users, "Candidate Pipeline", "Product Designer") +
      '<div class="pp-col c0"><div class="pp-h">Applied <b class="pp-c0">24</b></div></div>' +
      '<div class="pp-col c1"><div class="pp-h">Shortlisted <b class="pp-c1">6</b></div></div>';
    var rows = [["AO", "Adaeze O.", 92, 1], ["CE", "Chidi Eze", 71, 2], ["BA", "Bola A.", 64, 0], ["IN", "Ifeoma N.", 88, 3]];
    rows.forEach(function (r, i) {
      html += '<div class="pp-row r' + i + '">' + av(r[0], r[3], r[1]) + '<b>' + r[1] + '</b><span class="pp-s">' + r[2] + '</span></div>';
    });
    return {
      html: html,
      init: function (A) {
        var r = A.qa(".pp-row"), c0 = A.q(".pp-c0"), c1 = A.q(".pp-c1");
        var X0 = 26, X1 = 214, Y = [88, 134, 180];
        function pos(el, x, y, o) { el.style.transform = "translate(" + x + "px," + y + "px)"; if (o !== undefined) el.style.opacity = o; }
        A.reset(function () {
          pos(r[0], X0, Y[0] - 14, 0); pos(r[1], X0, Y[1] - 14, 0); pos(r[2], X0, Y[2] - 14, 0); pos(r[3], X1, Y[0], 1);
          r.forEach(function (x) { x.classList.remove("sel", "won"); }); c0.textContent = "24"; c1.textContent = "6";
        });
        [0, 1, 2].forEach(function (i) { A.at(250 + i * 380, function () { pos(r[i], X0, Y[i], 1); }); });
        A.at(2000, function () { A.cls(r[0], "sel"); });
        A.at(2600, function () { pos(r[0], X1, Y[1]); c0.textContent = "23"; });
        A.at(3100, function () { pos(r[1], X0, Y[0]); pos(r[2], X0, Y[1]); c1.textContent = "7"; A.cls(r[0], "sel", false); A.cls(r[0], "won"); });
        A.dur(6800);
      }
    };
  };

  /* collaborate: team joins one candidate card */
  S.collaborate = function () {
    var team = [["TB", "Hiring Manager", 0], ["NE", "Recruiter", 2], ["KA", "Executive", 3]];
    var TEAMN = { TB: "Tunde Bakare", NE: "Ngozi Eze", KA: "Kunle Adebayo" };
    var html = '<div class="cb-card">' + av("AO", 1, "Adaeze Okonkwo") + '<div class="cb-who"><b>Adaeze Okonkwo</b><small>Product Designer · 91% Match</small></div>' +
      '<div class="cb-stack">';
    team.forEach(function (t) { html += '<span class="cb-a">' + av(t[0], t[2], TEAMN[t[0]]) + '</span>'; });
    html += '<small class="cb-rev"><span class="cb-n">0</span> Reviewing</small></div></div><div class="cb-team">';
    team.forEach(function (t) { html += '<span class="cb-m">' + av(t[0], t[2], TEAMN[t[0]]) + t[1] + '</span>'; });
    html += '</div><div class="cb-in">Write A Comment</div><div class="cb-cmt">' + av("TB", 0, "Tunde Bakare") + '<div><small>Tunde · Hiring Manager</small><p>Strong portfolio. Move her to interview.</p></div><span class="cb-like">' + I.thumb + '<b class="cb-lc">1</b></span></div>';
    return {
      html: html,
      init: function (A) {
        var cin = A.q(".cb-in"), a = A.qa(".cb-a"), m = A.qa(".cb-m"), n = A.q(".cb-n"), cmt = A.q(".cb-cmt"), like = A.q(".cb-like"), lc = A.q(".cb-lc");
        A.reset(function () { a.concat(m).forEach(function (x) { x.classList.remove("on"); }); n.textContent = "0"; cmt.classList.remove("on"); cin.classList.remove("off"); like.classList.remove("on", "bump"); lc.textContent = "1"; });
        [0, 1, 2].forEach(function (i) { A.at(400 + i * 650, function () { A.cls(m[i], "on"); A.cls(a[i], "on"); n.textContent = String(i + 1); }); });
        A.at(2600, function () { A.cls(cmt, "on"); A.cls(cin, "off"); });
        A.at(3500, function () { A.cls(like, "on"); });
        A.at(4200, function () { lc.textContent = "2"; A.cls(like, "bump"); });
        A.dur(7000);
      }
    };
  };

  /* configure: toggles and weight sliders */
  S.configure = function () {
    var rows = [["Screening Questions", "10 Questions · Role Specific", 40], ["Personality Test", "Big Five · 15 Minutes", 25], ["CV Requirements", "Portfolio · 3+ Years", 35]];
    var html = hd(I.gear, "AI Configuration", '<span class="cf-tot">Weights <b>0%</b></span>');
    rows.forEach(function (r, i) {
      html += '<div class="cf-row" style="top:' + (52 + i * 64) + 'px"><div class="cf-t"><b>' + r[0] + '</b><small>' + r[1] + '</small></div><span class="cf-tg"><i></i></span>' +
        '<div class="cf-sl"><i class="cf-tr"><u></u></i><i class="cf-th"></i><b class="cf-w">0%</b></div></div>';
    });
    return {
      html: html,
      init: function (A) {
        var rw = A.qa(".cf-row"), u = A.qa(".cf-tr u"), th = A.qa(".cf-th"), w = A.qa(".cf-w"), tot = A.q(".cf-tot b"), totc = A.q(".cf-tot");
        var L = 286, pct = function (x) { return Math.round(x) + "%"; };
        A.reset(function () {
          rw.forEach(function (x) { x.classList.remove("on"); }); u.forEach(function (x) { x.style.transform = "scaleX(0)"; });
          th.forEach(function (x) { x.style.transform = "translateX(0px)"; }); w.forEach(function (x) { x.textContent = "0%"; }); tot.textContent = "0%"; totc.classList.remove("ok");
        });
        var sum = 0;
        rows.forEach(function (r, i) {
          A.at(400 + i * 750, function () { A.cls(rw[i], "on"); });
          A.at(700 + i * 750, function () {
            var f = r[2] / 60; u[i].style.transform = "scaleX(" + f + ")"; th[i].style.transform = "translateX(" + f * L + "px)";
            A.count(w[i], 0, r[2], 900, pct);
            var before = rows.slice(0, i).reduce(function (s, x) { return s + x[2]; }, 0);
            A.count(tot, before, before + r[2], 900, pct);
          });
        });
        A.at(3300, function () { A.cls(totc, "ok"); });
        A.dur(6600);
      }
    };
  };

  /* score: three rings and a total */
  S.score = function () {
    var rings = [["CV Match", 88, "#91b6ff"], ["Screening", 82, "#7b74ff"], ["Personality Fit", 79, "#63eafd"]];
    var C = 2 * Math.PI * 30;
    var html = hd(I.spark, "AI Score · Amaka Obi", "Product Designer") + '<div class="sr-rings">';
    rings.forEach(function (r) {
      html += '<div class="sr-r"><svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="30" class="sr-bg"/><circle cx="40" cy="40" r="30" class="sr-fg" stroke="' + r[2] + '" stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + C.toFixed(2) + '" transform="rotate(-90 40 40)"/></svg><b class="sr-v">0</b><small>' + r[0] + '</small></div>';
    });
    html += '</div><div class="sr-tot"><small>Overall</small><b class="sr-t">0</b><span class="sr-chip">' + I.check + 'Shortlist</span></div>' +
      '<div class="sr-w">Weights: CV 35% · Screening 40% · Personality 25%</div>';
    return {
      html: html,
      init: function (A) {
        var fg = A.qa(".sr-fg"), v = A.qa(".sr-v"), t = A.q(".sr-t"), chip = A.q(".sr-chip");
        A.reset(function () { fg.forEach(function (x) { x.style.strokeDashoffset = C; }); v.forEach(function (x) { x.textContent = "0"; }); t.textContent = "0"; chip.classList.remove("on"); });
        rings.forEach(function (r, i) {
          A.at(350 + i * 650, function () { fg[i].style.strokeDashoffset = C * (1 - r[1] / 100); A.count(v[i], 0, r[1], 1200); });
        });
        A.at(2500, function () { A.count(t, 0, 83, 1000); });
        A.at(3500, function () { A.cls(chip, "on"); });
        A.dur(6800);
      }
    };
  };

  /* ---------------- interludes ---------------- */
  var PEOPLE = [
    ["Adaeze Okonkwo", "Product Designer", 94], ["Tunde Bakare", "Sales Representative", 89], ["Amaka Obi", "UX Researcher", 86],
    ["Chidi Eze", "Backend Engineer", 91], ["Ifeoma Nwosu", "Brand Designer", 88], ["Kunle Adebayo", "Data Analyst", 84],
    ["Ngozi Eze", "Recruiter", 90], ["Bola Adeyemi", "Frontend Engineer", 87], ["Emeka Uche", "Product Manager", 92],
    ["Zainab Bello", "Customer Success", 85], ["Seun Ogunleye", "DevOps Engineer", 83], ["Funmi Alade", "Content Designer", 89],
    ["Yemi Oladipo", "Account Executive", 81], ["Chiamaka Ibe", "QA Engineer", 86], ["Musa Garba", "Mobile Engineer", 90], ["Tolu Fashola", "HR Generalist", 82]
  ];
  function ini(n) { return n.split(" ").map(function (p) { return p[0]; }).join(""); }
  function mqCard(p, k) {
    return '<div class="mq-c">' + av(ini(p[0]), k % 4, p[0]) + '<div><b>' + p[0] + '</b><small>' + p[1] + '</small></div><span class="mq-p">' + p[2] + '%</span></div>';
  }
  var X = {};
  X.marquee = function (root) {
    function row(list, off) {
      var one = list.map(function (p, k) { return mqCard(p, k + off); }).join("");
      return '<div class="mq-row"><div class="mq-track">' + one + one + '</div></div>';
    }
    root.innerHTML = '<div class="axi-bg"></div><div class="mq-tag"><i></i>Live Talent Pool · Every Candidate Arrives Scored</div>' +
      '<div class="mq-rows">' + row(PEOPLE.slice(0, 8), 0) + row(PEOPLE.slice(8), 2) + '</div><div class="mq-beam"></div>';
  };
  X.funnel = function (root) {
    var h = '<div class="axi-bg"></div><div class="fn-tag"><i></i>CVs In · Ranked Briefs Out</div>';
    var sheets = [[4, -30, -14], [14, -40, 10], [24, -28, -6], [8, 110, 12], [30, -36, 18], [18, 120, -10], [2, 40, -18], [26, 128, 8], [12, -34, 4], [34, 115, -12]];
    sheets.forEach(function (s, i) {
      h += '<i class="fn-sh" style="--sx:' + s[0] + ';--sy:' + s[1] + ';--r:' + s[2] + 'deg;animation-delay:' + (i * 0.52).toFixed(2) + 's"><u></u><u></u><u></u><u></u></i>';
    });
    h += '<div class="fn-f"><svg viewBox="0 0 220 140" preserveAspectRatio="none"><defs><linearGradient id="axiFnG" x1="0" x2="1"><stop offset="0" stop-color="#4266ff" stop-opacity=".35"/><stop offset=".6" stop-color="#7b74ff" stop-opacity=".22"/><stop offset="1" stop-color="#63eafd" stop-opacity=".35"/></linearGradient>' +
      '<linearGradient id="axiFnS" x1="0" x2="1"><stop offset="0" stop-color="#91b6ff"/><stop offset=".65" stop-color="#7b74ff"/><stop offset="1" stop-color="#63eafd"/></linearGradient></defs>' +
      '<path d="M2 2 L140 56 L218 60 L218 80 L140 84 L2 138 Z" fill="url(#axiFnG)" stroke="url(#axiFnS)" stroke-width="1.5" vector-effect="non-scaling-stroke"/>' +
      '<path d="M40 17 L140 56 M40 123 L140 84" stroke="rgba(255,255,255,.18)" stroke-width="1" vector-effect="non-scaling-stroke" fill="none"/></svg>' +
      '<span class="fn-lab"><i></i>AuxHR AI</span><i class="fn-core"></i></div><i class="fn-beam"></i>';
    var out = [["Adaeze O.", "Product Designer", 94], ["Chidi E.", "Backend Engineer", 91], ["Tunde B.", "Sales Representative", 89]];
    out.forEach(function (o, i) {
      h += '<div class="fn-ch" style="--ty:' + (25 + i * 25) + ';animation-delay:' + (i * 0.8).toFixed(1) + 's"><span class="fn-rk">#' + (i + 1) + '</span><div><b>' + o[0] + '</b><small>' + o[1] + '</small></div><span class="fn-sc">' + o[2] + '</span></div>';
    });
    root.innerHTML = h;
  };
  X.passmark = function (root) {
    var scores = [91, 84, 77, 72, 69, 88, 63, 95, 74, 58, 81, 67, 79, 52, 86, 71];
    var h = '<div class="axi-bg"></div><div class="pm-head"><span class="pm-lab"><i></i>Pass Mark</span><span class="pm-cnt"><b class="pm-p">0</b> Pass · <b class="pm-f">0</b> Below</span></div>' +
      '<div class="pm-sl"><i class="pm-tr"><u></u></i><span class="pm-th"><b class="pm-v">70%</b></span></div><div class="pm-grid">';
    scores.forEach(function (s, i) {
      var p = PEOPLE[i];
      h += '<div class="pm-c" data-s="' + s + '">' + av(ini(p[0]), i % 4, p[0]) + '<b>' + s + '</b></div>';
    });
    root.innerHTML = h + '</div>';
    var tr = root.querySelector(".pm-tr"), fill = root.querySelector(".pm-tr u"), th = root.querySelector(".pm-th"), v = root.querySelector(".pm-v");
    var cells = Array.prototype.slice.call(root.querySelectorAll(".pm-c")), cp = root.querySelector(".pm-p"), cf = root.querySelector(".pm-f");
    var tw = 0, last = -1, raf = 0, t0 = 0, off = 0;
    function measure() { tw = tr.getBoundingClientRect().width; last = -1; }
    function ease(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    // 70 -> 45 -> 88 -> 70, hold
    var keys = [[0, 70], [2800, 45], [6300, 88], [8800, 70], [10800, 70]];
    function markAt(ms) {
      ms = ms % 10800;
      for (var k = 1; k < keys.length; k++) if (ms <= keys[k][0]) {
        var a = keys[k - 1], b = keys[k], p = (ms - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * ease(p);
      }
      return 70;
    }
    function draw(mark) {
      fill.style.transform = "scaleX(" + (mark / 100) + ")";
      th.style.transform = "translateX(" + (tw * mark / 100) + "px)";
      var m = Math.round(mark);
      if (m === last) return;
      last = m; v.textContent = m + "%";
      var pass = 0;
      cells.forEach(function (c) { var ok = +c.getAttribute("data-s") >= m; c.classList.toggle("ok", ok); if (ok) pass++; });
      cp.textContent = pass; cf.textContent = cells.length - pass;
    }
    function loop(now) { draw(markAt(now - t0 + off)); raf = requestAnimationFrame(loop); }
    measure(); draw(70);
    if (window.ResizeObserver) new ResizeObserver(function () { measure(); draw(markAt(off)); }).observe(tr);
    root._axi = {
      start: function () { if (RM || raf) return; t0 = performance.now(); raf = requestAnimationFrame(loop); },
      stop: function () { if (!raf) return; cancelAnimationFrame(raf); raf = 0; off += performance.now() - t0; }
    };
  };

  /* ---------------- boot ---------------- */
  function boot() {
    var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var t = e.target;
        if (t._axv) { if (e.isIntersecting) { if (!t._axv.running) t._axv.play(); } else t._axv.stop(); }
        if (t.classList.contains("axi")) {
          t.classList.toggle("axi-on", e.isIntersecting);
          if (t._axi) t._axi[e.isIntersecting ? "start" : "stop"]();
        }
      });
    }, { threshold: 0.25 }) : null;
    var ro = window.ResizeObserver ? new ResizeObserver(function (es) { es.forEach(function (e) { if (e.target._axv) e.target._axv.fit(); }); }) : null;

    Array.prototype.forEach.call(document.querySelectorAll(".axv[data-axv]"), function (el) {
      if (el._axv) return;
      var f = S[el.getAttribute("data-axv")];
      if (!f) return;
      el.classList.add("axv-" + el.getAttribute("data-axv"));
      var r = new Runner(el, f());
      el._axv = r;
      if (ro) ro.observe(el); else window.addEventListener("resize", function () { r.fit(); });
      if (RM || !io) r.final(); else io.observe(el);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".axi[data-axi]"), function (el) {
      if (el._axib) return;
      var f = X[el.getAttribute("data-axi")];
      if (!f) return;
      el._axib = 1;
      el.classList.add("axi-" + el.getAttribute("data-axi"));
      if (RM) el.classList.add("axi-rm");
      f(el);
      if (io && !RM) io.observe(el);
    });
  }
  window.AuxVig = { init: boot };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
