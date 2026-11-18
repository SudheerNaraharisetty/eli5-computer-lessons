// Generates compositions/story.html (the 48 lights and the street are repetitive markup).
// Run: node gen-story.mjs
import { writeFileSync, readFileSync } from "node:fs";

const words = JSON.parse(readFileSync(new URL("./assets/voice/words.json", import.meta.url)));
const W = (Array.isArray(words) ? words : words.words).map((w) => +(w.start ?? w[1]).toFixed(3));

/* ---------- the street ---------- */
const SHOP_X = (i) => 130 + i * 340; // 5 shops, 300 wide, 40 apart
const winC = (i) => [SHOP_X(i) + 105, 560]; // window centre
const crack = (id, i) => {
  const [x, y] = winC(i);
  return `<path id="${id}" class="s-crk" d="M${x} ${y} l-52 -44 M${x} ${y} l58 -30 M${x} ${y} l-34 52 M${x} ${y} l48 44 M${x} ${y} l-66 8 M${x - 24} ${y - 20} l-6 -24 M${x + 28} ${y + 22} l20 -6" />`;
};
const awn = ["#e6e3ff", "#ddefe6", "#fbebd2", "#fbe0ea", "#e6e3ff"];
const shops = [0, 1, 2, 3, 4].map((i) => {
  const x = SHOP_X(i);
  return `<g>
    <rect x="${x}" y="360" width="300" height="430" rx="10" fill="#fff" stroke="#0e0c1d" stroke-width="6" />
    <path id="s-awn${i}" d="M${x - 10} 360 H${x + 310} L${x + 290} 430 H${x + 10} Z" fill="${awn[i]}" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
    <rect x="${x + 25}" y="485" width="160" height="150" rx="6" fill="#fbf8f4" stroke="#0e0c1d" stroke-width="6" />
    <path d="M${x + 45} 505 l30 0 M${x + 45} 505 l0 30" stroke="#c9c6ff" stroke-width="6" stroke-linecap="round" />
    <rect x="${x + 210}" y="560" width="66" height="230" rx="6" fill="#ece7df" stroke="#0e0c1d" stroke-width="6" />
    <circle cx="${x + 262}" cy="680" r="6" fill="#0e0c1d" />
  </g>`;
}).join("\n");
const cracks = [crack("s-c1", 1), crack("s-c0", 0), crack("s-c3", 3), crack("s-c4", 4)].join("\n");
const litter = [
  [SHOP_X(0) + 150, 820, -18, "#ff6b8b"], [SHOP_X(1) + 240, 826, 30, "#ffc24b"], [SHOP_X(2) + 60, 822, -40, "#c9c6ff"],
  [SHOP_X(3) + 180, 828, 14, "#fff"], [SHOP_X(4) + 90, 822, 60, "#ff6b8b"]
].map(([x, y, r, f], k) => `<g id="s-lit${k}"><rect x="${x - 16}" y="${y - 11}" width="32" height="22" rx="4" fill="${f}" stroke="#0e0c1d" stroke-width="5" transform="rotate(${r} ${x} ${y})" /></g>`).join("\n");
const graffiti = [2, 4].map((i, k) => {
  const x = SHOP_X(i);
  return `<path id="s-gr${k}" class="s-gr" d="M${x + 22} 720 q20 -40 40 -4 q16 -44 40 -2 q18 -38 40 4 q14 -30 30 -6" />`;
}).join("\n");

/* ---------- the board: 8 x 6 lights ---------- */
const LX = (c) => 210 + c * 118, LY = (r) => 338 + r * 112;
let lights = "";
for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++)
  lights += `<div class="s-lt" id="s-L${r}${c}" style="left:${LX(c) - 42 - 96}px;top:${LY(r) - 42 - 96}px"><i></i></div>`;
const ringPath = (id, r, c, extra) => {
  const x = LX(c), y = LY(r);
  return `<path id="${id}" class="s-ring" ${extra || ""} d="M${x - 58} ${y + 6} C${x - 60} ${y - 64} ${x + 62} ${y - 66} ${x + 60} ${y - 2} C${x + 60} ${y + 64} ${x - 62} ${y + 66} ${x - 54} ${y - 12}" />`;
};

const num = (id, vals) => `<span class="s-num" id="s-${id}">${vals.map((v) => `<b id="s-${id}-${v}">${v}</b>`).join("")}</span>`;

const face = `<circle cx="200" cy="150" r="104" fill="#5a3418" stroke="#0e0c1d" stroke-width="6" />
            <circle cx="200" cy="162" r="84" fill="#c98d62" stroke="#0e0c1d" stroke-width="6" />
            <path d="M112 170 Q110 74 200 72 Q292 74 288 170 Q270 118 200 112 Q132 116 112 170 Z" fill="#5a3418" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
            <circle cx="150" cy="198" r="13" fill="#e88f7a" />
            <circle cx="250" cy="198" r="13" fill="#e88f7a" />
            <circle cx="170" cy="172" r="8" fill="#0e0c1d" />
            <circle cx="230" cy="172" r="8" fill="#0e0c1d" />
            <path d="M174 204 Q200 222 226 204" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />`;

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    #s-all, #s-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }

    /* street */
    #s-street { left: 0; top: 0; width: 1920px; height: 1080px; }
    #s-street .s-crk { opacity: 0; fill: none; stroke: #b8235a; stroke-width: 7; stroke-linecap: round; }
    #s-street .s-gr { opacity: 0; fill: none; stroke: #b9741a; stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; }
    #s-h1 { left: 130px; top: 110px; font: 700 96px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-h1 span { display: inline-block; }
    #s-h1 .ac { color: #b8235a; }
    #s-nobody { left: 1180px; top: 136px; padding: 6px 30px; background: #b8235a; color: #fff; border-radius: 999px; font-size: 44px; line-height: 1.4; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }
    #s-h2 { left: 130px; top: 110px; font: 700 96px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-h2 span { display: inline-block; opacity: 0; }
    #s-h2 .ac { color: #3b37e6; }

    /* board */
    #s-board { left: 96px; top: 96px; width: 1054px; height: 888px; background: #15132b; border-radius: 24px; color: #fff; }
    #s-bar { left: 0; top: 0; width: 1054px; height: 64px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 26px; gap: 10px; }
    #s-bar > i { width: 16px; height: 16px; border-radius: 50%; background: #ff6b8b; }
    #s-bar > i:nth-child(2) { background: #ffc24b; }
    #s-bar > i:nth-child(3) { background: #4bd69b; }
    #s-bar > span { margin-left: 14px; font: 700 28px "JetBrains Mono", monospace; color: #a9a5d6; }
    .s-pill { position: absolute; right: 22px; top: 10px; padding: 0 18px; height: 44px; border-radius: 999px; color: #fff; font-size: 28px; line-height: 44px; white-space: nowrap; }
    #s-modeA { background: #b8235a; }
    #s-modeB { background: #1f7a5c; }
    .s-chip { position: absolute; top: 90px; height: 70px; padding: 0 22px; border-radius: 16px; background: #211e40; display: flex; align-items: center; gap: 16px; font-size: 28px; color: #c9c6ff; letter-spacing: 0.06em; white-space: nowrap; }
    .s-num { position: relative; display: inline-block; height: 56px; width: 92px; font: 700 46px/56px "Fraunces", serif; color: #fff; }
    .s-num b { position: absolute; left: 0; top: 0; opacity: 0; }
    #s-red b { color: #ff9db3; }
    #s-red b#s-red-0 { color: #7cf0b5; }
    #s-warn b { color: #ffc24b; }
    #s-warn b#s-warn-0 { color: #7cf0b5; }
    #s-chipR { left: 72px; }
    #s-chipW { left: 330px; }
    #s-chipW .s-num { width: 120px; }
    .s-lt { position: absolute; width: 84px; height: 84px; border-radius: 50%; background-color: #4bd69b; box-shadow: 0 0 0 5px #0b0a18; }
    .s-lt > i { position: absolute; left: 16px; top: 14px; width: 22px; height: 16px; border-radius: 50%; background: #fff; opacity: 0.45; transform: rotate(-30deg); }

    /* right panel */
    #s-right { left: 1210px; top: 96px; width: 614px; height: 888px; background: #fbf8f4; border-radius: 28px; }
    #s-face { left: 30px; top: 10px; width: 96px; height: 104px; }
    .s-rt { position: absolute; left: 140px; top: 28px; font: 700 52px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-tg { position: absolute; top: 128px; padding: 0 20px; height: 50px; border-radius: 999px; font-size: 30px; line-height: 50px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-tgName { left: 40px; background: #3b37e6; color: #fff; }
    #s-tgNew { left: 190px; background: #e6e3ff; }
    #s-tgHurry { left: 302px; background: #fbebd2; color: #8a560f; }
    .s-lab { position: absolute; left: 44px; font-size: 28px; letter-spacing: 0.08em; color: #3e3b52; white-space: nowrap; }
    .s-row { position: absolute; left: 40px; width: 534px; height: 64px; background: #fff; border-radius: 16px; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; display: flex; align-items: center; padding: 0 22px; gap: 16px; font-size: 30px; white-space: nowrap; }
    .s-row .s-mono { font-size: 28px; font-weight: 700; color: #5d596f; }
    .s-dot { width: 30px; height: 30px; border-radius: 50%; flex: none; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-row > s { position: absolute; left: 70px; top: 30px; width: 220px; height: 6px; border-radius: 3px; background: #b8235a; }
    #s-nobody2 { left: 40px; top: 726px; padding: 6px 26px; background: #0e0c1d; color: #fff; border-radius: 14px; font-size: 36px; line-height: 1.4; white-space: nowrap; }
    .s-card { position: absolute; left: 40px; width: 534px; border-radius: 20px; background: #fff; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; padding: 16px 26px; }
    .s-card b { display: block; font: 700 46px/1.2 "Fraunces", serif; letter-spacing: -0.01em; }
    .s-card small { display: block; font-size: 30px; line-height: 1.35; color: #3e3b52; }
    #s-cal { top: 214px; height: 150px; text-align: center; padding-top: 22px; }
    #s-cal small { letter-spacing: 0.08em; }
    #s-cal b { font-size: 64px; color: #b9741a; }
    #s-bugc { top: 400px; height: 130px; }
    #s-bugc b { color: #b8235a; }
    .s-bub { position: absolute; left: 40px; top: 590px; width: 534px; border-radius: 26px; padding: 22px 30px; font: 700 46px/1.2 "Fraunces", serif; letter-spacing: -0.01em; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-bub > svg { position: absolute; left: 60px; top: -40px; width: 60px; height: 44px; }
    #s-bubA { background: #fbe0ea; color: #b8235a; }
    #s-bubB { background: #ddefe6; color: #1f7a5c; }
    #s-greenc { top: 214px; height: 130px; }
    #s-greenc b { color: #1f7a5c; }
    #s-fixc { top: 400px; height: 130px; }
    #s-fixc b { color: #1f7a5c; }
    .s-ok { position: absolute; right: 22px; top: 30px; width: 70px; height: 70px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-ok > svg { position: absolute; left: 0; top: 0; width: 70px; height: 70px; }

    /* "everyone says" */
    #s-month { left: 1230px; top: 300px; padding: 10px 26px; background: #fbebd2; border-radius: 18px; font-size: 34px; line-height: 1.3; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }
    #s-month b { color: #b9741a; }
    #s-says { left: 1230px; top: 430px; width: 600px; padding: 22px 30px; background: #fff; border-radius: 26px; font: 700 50px/1.2 "Fraunces", serif; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    #s-says small { display: block; margin-top: 8px; font: 800 30px/1.3 "Manrope", sans-serif; color: #3e3b52; }
    #s-says > svg { position: absolute; left: -44px; top: 40px; width: 50px; height: 60px; }

    /* marks */
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks path { opacity: 0; }
    .s-ring { fill: none; stroke: #ff6b8b; stroke-width: 7; stroke-linecap: round; }
    #s-cursor { left: 0; top: 0; width: 52px; height: 52px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="55.35" data-track-index="1">
      <div id="s-wrap">
        <!-- the street -->
        <div id="s-streetwrap" class="s-abs" style="left:0;top:0;width:1920px;height:1080px">
          <svg id="s-street" class="s-abs" viewBox="0 0 1920 1080">
            <path d="M60 790 H1860" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
            ${shops}
            ${graffiti}
            ${cracks}
            ${litter}
          </svg>
          <div id="s-h1" class="s-abs"><span>One</span> <span class="ac">cracked</span> <span class="ac">window.</span></div>
          <div id="s-nobody" class="s-abs s-hide">nobody cares</div>
        </div>
        <div id="s-h2" class="s-abs"><span>Code</span> <span>has</span> <span class="ac">broken</span> <span class="ac">windows</span> <span>too.</span></div>

        <!-- the test board -->
        <div id="s-board" class="s-abs s-ol s-hide">
          <div id="s-bar" class="s-abs"><i></i><i></i><i></i><span>shop tests</span></div>
          <div id="s-modeA" class="s-pill s-hide">the usual board</div>
          <div id="s-modeB" class="s-pill s-hide">a clean board</div>
          <div class="s-chip s-hide" id="s-chipR">RED ${num("red", [0, 1, 6, 7])}</div>
          <div class="s-chip s-hide" id="s-chipW">WARNINGS ${num("warn", [0, 200, 400])}</div>
          ${lights}
        </div>

        <div id="s-month" class="s-abs s-hide">red for <b>a month</b></div>
        <div id="s-says" class="s-abs s-hide">
          <svg viewBox="0 0 50 60"><path d="M48 4 L4 30 L48 56" fill="#fff" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /><path d="M50 10 V50" stroke="#fff" stroke-width="8" /></svg>
          &ldquo;Ignore that one.&rdquo;<small>It always fails.</small>
        </div>

        <!-- Priya's side -->
        <div id="s-right" class="s-abs s-ol s-hide">
          <svg id="s-face" class="s-abs" viewBox="86 36 228 236">${face}</svg>
          <div class="s-rt" id="s-rtA">Monday</div>
          <div class="s-rt s-hide" id="s-rtB">Monday, again</div>
          <div class="s-tg s-hide" id="s-tgName">Priya</div>
          <div class="s-tg s-hide" id="s-tgNew">new</div>
          <div class="s-tg s-hide" id="s-tgHurry">in a hurry</div>

          <div id="s-A1" class="s-abs" style="left:0;top:0;width:614px;height:888px">
            <div class="s-lab s-hide" id="s-labSees" style="top:206px">SHE SEES</div>
            <div class="s-row s-hide" id="s-see1" style="top:250px"><span class="s-dot" style="background:#ff6b8b"></span>a red light</div>
            <div class="s-row s-hide" id="s-see2" style="top:328px"><span class="s-mono"># TODO fix later</span></div>
            <div class="s-row s-hide" id="s-see3" style="top:406px"><span class="s-dot" style="background:#ffc24b"></span>200 warnings</div>
            <div class="s-lab s-hide" id="s-labSo" style="top:498px">SO SHE</div>
            <div class="s-row s-hide" id="s-do1" style="top:542px">skips writing a test<s></s></div>
            <div class="s-row s-hide" id="s-do2" style="top:620px"><span class="s-mono" style="color:#b8235a"># TODO test Sunday</span></div>
            <div id="s-nobody2" class="s-abs s-hide">Nobody notices.</div>
          </div>

          <div id="s-A2" class="s-abs" style="left:0;top:0;width:614px;height:888px">
            <div class="s-card s-hide" id="s-cal"><small>LATER</small><b>3 months</b></div>
            <div class="s-card s-hide" id="s-bugc"><b>Red no. 7: a real bug</b><small id="s-hid" class="s-hide">hidden for 2 weeks</small></div>
            <div class="s-bub s-hide" id="s-bubA"><svg viewBox="0 0 60 44"><path d="M8 42 L20 2 L44 42" fill="#fbe0ea" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /><path d="M4 44 H56" stroke="#fbe0ea" stroke-width="9" /></svg>&ldquo;Red is normal here.&rdquo;</div>
          </div>

          <div id="s-B" class="s-abs" style="left:0;top:0;width:614px;height:888px">
            <div class="s-card s-hide" id="s-greenc"><b>48 green</b><small>0 warnings, 0 notes</small></div>
            <div class="s-card s-hide" id="s-fixc"><b>Fixed at 11:50</b><small>before lunch</small><div class="s-ok"><svg viewBox="0 0 70 70"><path d="M20 36 L31 47 L51 24" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg></div></div>
            <div class="s-bub s-hide" id="s-bubB"><svg viewBox="0 0 60 44"><path d="M8 42 L20 2 L44 42" fill="#ddefe6" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /><path d="M4 44 H56" stroke="#ddefe6" stroke-width="9" /></svg>&ldquo;Red is an emergency here.&rdquo;</div>
          </div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          ${ringPath("s-ring1", 1, 5)}
          ${ringPath("s-ring7", 3, 2, 'stroke-dasharray="16 12"')}
          ${ringPath("s-ringB", 3, 2)}
        </svg>
        <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds); t(i) adds the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const GREEN = "#4bd69b", RED = "#ff6b8b";
      const tl = gsap.timeline({ paused: true });
      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.2, ease: "power2.in" }, at);
      const slide = (sel, at) => tl.fromTo(sel, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out", immediateRender: false }, at);
      const L = (r, c) => "#s-L" + r + c;
      const toRed = (r, c, at) => {
        tl.to(L(r, c), { backgroundColor: RED, duration: 0.15 }, at);
        tl.fromTo(L(r, c), { scale: 1 }, { scale: 1.25, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, at);
      };
      const toGreen = (r, c, at) => tl.to(L(r, c), { backgroundColor: GREEN, duration: 0.25 }, at);
      const cur = {};
      const setNum = (id, v, at) => {
        if (cur[id] !== undefined) tl.to("#s-" + id + "-" + cur[id], { opacity: 0, duration: 0.1 }, at);
        tl.fromTo("#s-" + id + "-" + v, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, at + 0.06);
        cur[id] = v;
      };
      // stroke drawing from the real path length
      const prep = (id) => {
        const p = document.querySelector(id);
        const len = Math.ceil(p.getTotalLength()) || 400;
        if (!p.getAttribute("stroke-dasharray")) p.style.strokeDasharray = len + " " + (len + 40);
        return len;
      };
      const draw = (id, at, d) => {
        const len = prep(id);
        tl.set(id, { opacity: 1 }, at);
        tl.fromTo(id, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out", immediateRender: false }, at);
      };
      gsap.set(["#s-lit0", "#s-lit1", "#s-lit2", "#s-lit3", "#s-lit4"], { opacity: 0 });
      gsap.set(".s-lt", { opacity: 0 });

      /* ---- 1. One cracked window ---- */
      tl.fromTo("#s-h1 span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out", stagger: 0.25 }, 0.05);
      draw("#s-c1", t(1) + 0.05, 0.5);
      tl.fromTo("#s-street", { x: 0 }, { x: 8, duration: 0.05, yoyo: true, repeat: 3, ease: "none", immediateRender: false }, t(1) + 0.05);
      pop("#s-nobody", t(10) - 0.05, { from: 0.4 });
      // soon there are more
      [["#s-c3", 0], ["#s-gr0", 0.25], ["#s-c0", 0.5], ["#s-gr1", 0.8], ["#s-c4", 1.05]].forEach(([id, d]) =>
        draw(id, t(12) + d, 0.45));
      [0, 1, 2, 3, 4].forEach((k) => tl.fromTo("#s-lit" + k, { opacity: 0, y: -90 }, { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out", immediateRender: false }, t(12) + 0.15 + k * 0.22));
      tl.to("#s-awn2", { rotation: 4, svgOrigin: SHOPAWN, duration: 0.4, ease: "back.out(2)" }, t(15));

      /* ---- Code has broken windows too ---- */
      out(["#s-h1", "#s-nobody"], t(16) - 0.35, 0.25);
      tl.to("#s-streetwrap", { opacity: 0.45, y: 110, scale: 0.8, transformOrigin: "50% 100%", duration: 0.6, ease: "power3.inOut" }, t(16) - 0.3);
      out("#s-streetwrap", t(21) - 0.45, 0.3);
      tl.fromTo("#s-h2 span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out", stagger: 0.18 }, t(16) - 0.05);
      tl.to("#s-h2", { scale: 1.06, transformOrigin: "0% 50%", duration: 0.5, ease: "power2.out" }, t(19));

      /* ---- 2. The test board ---- */
      tl.to("#s-h2", { opacity: 0, y: -40, duration: 0.3, ease: "power2.in" }, t(21) - 0.45);
      tl.fromTo("#s-board", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, t(21) - 0.15);
      tl.fromTo("#s-lt-all", {}, {}, 0);
      tl.fromTo(".s-lt", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", stagger: { each: 0.016, grid: [6, 8], from: "start" }, immediateRender: false }, t(29) - 0.05);
      slide("#s-chipR", t(29) + 0.3);
      setNum("red", 0, t(29) + 0.3);
      slide("#s-chipW", t(29) + 0.45);
      setNum("warn", 200, t(29) + 0.45);
      // one has been red for a month
      toRed(1, 5, t(38) - 0.05);
      setNum("red", 1, t(38) + 0.05);
      draw("#s-ring1", t(38) + 0.1, 0.45);
      pop("#s-month", t(41) - 0.1, { from: 0.5 });
      pop("#s-says", t(44) - 0.35, { from: 0.5 });
      tl.fromTo("#s-modeA", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out", immediateRender: false }, t(44) + 0.4);

      /* ---- 3. Monday: Priya ---- */
      out(["#s-month", "#s-says"], t(47) + 0.05, 0.2);
      tl.fromTo("#s-right", { opacity: 0, x: 90 }, { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" }, t(47) + 0.1);
      pop("#s-tgName", t(48) - 0.05, { from: 0.4 });
      pop("#s-tgNew", t(50) - 0.05, { from: 0.4 });
      pop("#s-tgHurry", t(54) - 0.05, { from: 0.4 });
      slide("#s-labSees", t(56) - 0.1);
      slide("#s-see1", t(58));
      tl.fromTo(L(1, 5), { scale: 1 }, { scale: 1.3, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, t(58) + 0.05);
      slide("#s-see2", t(61));
      slide("#s-see3", t(64));
      tl.fromTo("#s-chipW", { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, t(66));
      slide("#s-labSo", t(67) - 0.1);
      slide("#s-do1", t(69) - 0.05);
      tl.fromTo("#s-do1 > s", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, t(69) + 0.35);
      slide("#s-do2", t(74));
      tl.fromTo("#s-nobody2", { opacity: 0, scale: 2, rotation: 3 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.3, ease: "power4.in", immediateRender: false }, t(78) - 0.15);

      /* ---- 4. Three months later ---- */
      out("#s-A1", t(80) - 0.3, 0.3);
      out("#s-ring1", t(80) - 0.3, 0.3);
      tl.fromTo("#s-cal", { opacity: 0, rotationX: -90, transformOrigin: "50% 0%" }, { opacity: 1, rotationX: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: false }, t(80));
      [[0, 1], [2, 7], [4, 0], [4, 5], [5, 3]].forEach(([r, c], i) => toRed(r, c, t(83) + i * 0.28));
      setNum("red", 6, t(86) - 0.05);
      setNum("warn", 400, t(84) + 0.3);
      toRed(3, 2, t(90) + 0.05);
      setNum("red", 7, t(90) + 0.15);
      draw("#s-ring7", t(91), 0.5);
      pop("#s-bugc", t(93) - 0.1, { from: 0.6 });
      pop("#s-bubA", t(96) - 0.05, { from: 0.5 });
      out("#s-ring7", t(102), 0.4);
      tl.fromTo("#s-hid", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out", immediateRender: false }, t(104));

      /* ---- 5. Play it again on a clean board ---- */
      const TR = t(106) - 0.1;
      out(["#s-A2"], TR, 0.3);
      out("#s-modeA", TR, 0.2);
      [[5, 3], [4, 5], [4, 0], [3, 2], [2, 7], [1, 5], [0, 1]].forEach(([r, c], i) => toGreen(r, c, TR + 0.1 + i * 0.12));
      setNum("red", 0, TR + 0.9);
      out("#s-rtA", TR + 0.2, 0.2);
      tl.fromTo("#s-rtB", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out", immediateRender: false }, TR + 0.35);
      setNum("warn", 0, t(112) - 0.05);
      tl.fromTo("#s-modeB", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out", immediateRender: false }, t(112));
      tl.fromTo(".s-lt", { scale: 1 }, { scale: 1.14, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1, stagger: { each: 0.012, grid: [6, 8], from: "start" }, immediateRender: false }, t(114) - 0.05);
      pop("#s-greenc", t(115) - 0.1, { from: 0.6 });
      tl.fromTo("#s-face", { y: 0 }, { y: -16, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, t(117));
      tl.fromTo("#s-tgHurry", { scale: 1 }, { scale: 1.15, duration: 0.16, yoyo: true, repeat: 1, immediateRender: false }, t(119));
      // her change turns one light red
      toRed(3, 2, t(125) - 0.05);
      setNum("red", 1, t(125) + 0.05);
      tl.to(".s-lt:not(#s-L32)", { opacity: 0.28, duration: 0.4, ease: "power2.inOut" }, t(129) - 0.1);
      draw("#s-ringB", t(129), 0.45);
      pop("#s-bubB", t(130) - 0.05, { from: 0.5 });
      // she fixes it before lunch
      tl.fromTo("#s-cursor", { opacity: 0, x: 760, y: 1000 }, { opacity: 1, x: 452, y: 682, duration: 0.7, ease: "power3.out", immediateRender: false }, t(134) - 0.45);
      toGreen(3, 2, t(136));
      setNum("red", 0, t(136) + 0.05);
      tl.to(".s-lt:not(#s-L32)", { opacity: 1, duration: 0.4 }, t(136) + 0.2);
      out("#s-ringB", t(136) + 0.1, 0.3);
      pop("#s-fixc", t(136) - 0.05, { from: 0.6 });
      tl.to("#s-cursor", { opacity: 0, x: 560, y: 820, duration: 0.4, ease: "power2.in" }, t(138));

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.3, ease: "power2.in" }, 55.0);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`.replace("SHOPAWN", JSON.stringify(SHOP_X(2) + 290 + " 430")).replace('      tl.fromTo("#s-lt-all", {}, {}, 0);\n', "");

writeFileSync(new URL("./compositions/story.html", import.meta.url), html);
console.log("story.html written,", W.length, "words");
