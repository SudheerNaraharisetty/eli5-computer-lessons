// Generates compositions/story.html for lesson 59, Pareto principle.
// 200 complaint cards: a messy pile that sorts itself into 12 stacks, then lines up biggest first.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 66.6;

/* ---------- data: 12 causes, biggest first. Sum = 200. ---------- */
const CAUSES = [
  ["delivery time wrong", 92], ["discount code refused", 58], ["box crushed", 11], ["wrong flavour", 9],
  ["receipt email missing", 7], ["website slow", 6], ["allergy label unclear", 5], ["password reset fails", 4],
  ["menu typo", 3], ["charged twice", 2], ["gift message missing", 2], ["map hours wrong", 1],
];
const total = CAUSES.reduce((a, c) => a + c[1], 0);
if (total !== 200) throw new Error("counts must add to 200, got " + total);
// order in which each cause's first complaint arrived (sorted indexes): box crushed first, menu typo second
const ARRIVAL = [2, 8, 3, 11, 4, 7, 10, 0, 6, 9, 1, 5];

/* ---------- geometry ---------- */
const X0 = 130, BW = 96, PITCH = 112, BASE = 930, SL = 6; // bars, baseline, slat height
const sx = (i) => X0 + PITCH * i; // sorted x of stack i
const ux = (i) => X0 + PITCH * ARRIVAL.indexOf(i); // unsorted x (arrival order)
const top = (i) => BASE - SL * CAUSES[i][1];
const cum = []; CAUSES.reduce((a, c, i) => (cum[i] = a + c[1]), 0);
const CY = (c) => BASE - (600 * c) / 200; // cumulative 0..200 -> y
const pts = CAUSES.map((_, i) => [sx(i) + BW / 2, CY(cum[i])]);
const pathA = `M${X0} ${BASE} L${pts[0][0]} ${pts[0][1]} L${pts[1][0]} ${pts[1][1]}`;
const pathB = `M${pts[1][0]} ${pts[1][1]} ` + pts.slice(2).map((p) => `L${p[0]} ${p[1]}`).join(" ");

/* ---------- cards: seeded positions in a heap ---------- */
let seed = 59;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const FILL = ["#8f8bff", "#ffc24b"];
const cards = [];
CAUSES.forEach(([, n], c) => {
  for (let j = 0; j < n; j++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd());
    cards.push({
      c, j,
      px: Math.round(800 + Math.cos(a) * r * 430),
      py: Math.round(650 + Math.sin(a) * r * 175),
      rot: Math.round((rnd() - 0.5) * 60),
      z: Math.floor(rnd() * 400) + 10,
      drop: rnd(),
    });
  }
});
const cardHtml = cards.map((k, n) =>
  `<div id="s-k${n}" class="s-k" style="z-index:${k.z};background:${FILL[k.c] || "#fff"}"><i></i><i></i></div>`).join("\n          ");

const hand = (cx, cy, rx, ry) =>
  `M${cx - rx + 4} ${cy + 2} C${cx - rx - 2} ${cy - ry - 6} ${cx + rx} ${cy - ry - 8} ${cx + rx} ${cy} C${cx + rx} ${cy + ry + 4} ${cx - rx - 6} ${cy + ry + 6} ${cx - rx} ${cy - 8}`;

const MAYA = `
          <circle cx="200" cy="44" r="42" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
          <circle cx="200" cy="150" r="104" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
          <rect x="178" y="226" width="44" height="50" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="6" />
          <path d="M70 520 C70 340 130 268 200 268 C270 268 330 340 330 520 Z" fill="#e6e3ff" stroke="#0e0c1d" stroke-width="6" />
          <path d="M132 520 V366 Q200 338 268 366 V520 Z" fill="#fff" stroke="#0e0c1d" stroke-width="6" />
          <path d="M132 366 L160 282 M268 366 L240 282" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
          <circle cx="200" cy="162" r="84" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="6" />
          <path d="M117 150 Q146 66 226 78 Q280 88 284 152 Q240 112 190 120 Q150 124 117 150 Z" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
          <circle cx="150" cy="198" r="13" fill="#f5a8a0" />
          <circle cx="250" cy="198" r="13" fill="#f5a8a0" />
          <circle cx="170" cy="172" r="8" fill="#0e0c1d" />
          <circle cx="230" cy="172" r="8" fill="#0e0c1d" />
          <path d="M172 202 Q200 228 228 202" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />`;
const person = (shirt, hair) => `<svg viewBox="0 0 100 110">
            <path d="M12 108 Q12 62 50 62 Q88 62 88 108 Z" fill="${shirt}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
            <circle cx="50" cy="34" r="22" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="5" />
            <path d="M28 32 Q30 10 50 10 Q70 10 72 32 Q60 22 44 22 Q34 24 28 32 Z" fill="${hair}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
          </svg>`;

const RC = 1660; // right column centre
const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #s-all, #s-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-pill { position: absolute; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-lab { position: absolute; font-size: 30px; line-height: 40px; color: #3e3b52; white-space: nowrap; letter-spacing: 0.04em; }

    /* people, right column */
    #s-maya { left: ${RC - 125}px; top: 110px; width: 250px; height: 325px; }
    .s-fig { position: absolute; left: ${RC - 110}px; top: 150px; width: 220px; height: 242px; opacity: 0; }
    .s-fig > svg { width: 220px; height: 242px; }
    .s-nm { position: absolute; left: ${RC - 160}px; top: 446px; width: 320px; text-align: center; opacity: 0; }
    .s-nm > span { display: inline-block; height: 52px; line-height: 52px; padding: 0 26px; border-radius: 999px; background: #3b37e6; color: #fff; font-size: 32px; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-res { left: 1500px; top: 560px; width: 320px; height: 250px; background: #fff; border-radius: 22px; }
    #s-res small { position: absolute; left: 26px; top: 20px; font-size: 28px; letter-spacing: 0.06em; color: #3e3b52; white-space: nowrap; }
    .s-row { position: absolute; left: 26px; width: 270px; height: 70px; display: flex; align-items: baseline; justify-content: space-between; opacity: 0; }
    .s-row span { font-size: 30px; white-space: nowrap; }
    .s-row b { font: 700 54px/1 "Fraunces", serif; }

    /* counters and plan headers */
    #s-head1, #s-head2 { left: ${X0}px; top: 56px; }
    #s-count { left: ${X0}px; top: 112px; height: 60px; width: 470px; }
    #s-count > span { position: absolute; left: 0; top: 0; height: 60px; line-height: 60px; padding: 0 26px; border-radius: 999px; background: #fff; font-size: 36px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    #s-cnt2 { opacity: 0; color: #1f7a5c; }
    #s-p1 { left: ${X0}px; top: 206px; background: #fff; }
    #s-p2 { left: ${X0}px; top: 278px; background: #fff; }

    /* cards and stacks */
    .s-k { position: absolute; left: 0; top: 0; width: 80px; height: 50px; border-radius: 6px; box-shadow: 0 0 0 3px #0e0c1d; opacity: 0; }
    .s-k > i { position: absolute; left: 12px; height: 6px; border-radius: 3px; background: #3e3b52; opacity: 0.55; }
    .s-k > i:nth-child(1) { top: 14px; width: 52px; }
    .s-k > i:nth-child(2) { top: 28px; width: 34px; }
    .s-out { position: absolute; left: 0; width: ${BW}px; border-radius: 4px; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; z-index: 500; }
    .s-n { position: absolute; left: 0; width: ${BW}px; text-align: center; font: 700 34px/44px "Fraunces", serif; opacity: 0; z-index: 501; }
    .s-ghost { position: absolute; width: ${BW}px; border-radius: 4px; border: 4px dashed #6f6b80; opacity: 0; }
    #s-axis { left: ${X0 - 20}px; top: ${BASE + 2}px; width: ${PITCH * 12 + 24}px; height: 6px; border-radius: 3px; background: #0e0c1d; opacity: 0; }
    #s-chart { position: absolute; inset: 0; }
    #s-l1 { left: 250px; top: 296px; background: #e6e3ff; color: #2a26b8; z-index: 600; }
    #s-l2 { left: 404px; top: 556px; background: #ffe7b0; color: #7a4a00; z-index: 600; }
    #s-q3 { left: 700px; top: 200px; background: #fff; font-size: 34px; height: 60px; line-height: 60px; z-index: 600; }
    #s-q { left: 420px; top: 200px; background: #3b37e6; color: #fff; font-size: 34px; height: 60px; line-height: 60px; z-index: 600; }
    #s-lines { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; z-index: 700; }
    #s-lines > path { fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    .s-cl { stroke: #3b37e6; stroke-width: 8; }
    .s-ring { stroke: #b8235a; stroke-width: 7; }
    .s-brk { stroke: #0e0c1d; stroke-width: 5; }
    #s-dots circle { fill: #fff; stroke: #3b37e6; stroke-width: 5; opacity: 0; }
    .s-pc { position: absolute; font: 700 40px/48px "Fraunces", serif; color: #3b37e6; opacity: 0; z-index: 701; white-space: nowrap; }
    .s-bt { position: absolute; top: 958px; font-size: 30px; line-height: 40px; text-align: center; white-space: nowrap; opacity: 0; }
    #s-fixed { left: 128px; top: 420px; padding: 2px 22px; background: #1f7a5c; color: #fff; font-size: 44px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; z-index: 800; }

    /* the slow page */
    #s-page { left: ${X0}px; top: 260px; width: 1328px; height: 520px; background: #fff; border-radius: 26px; }
    #s-page h2 { position: absolute; left: 50px; top: 36px; font: 700 54px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-page h2 b { color: #b8235a; font-weight: 700; }
    #s-track { left: 50px; top: 190px; width: 1228px; height: 130px; border-radius: 16px; background: #ece7df; box-shadow: 0 0 0 4px #0e0c1d; overflow: hidden; }
    #s-fill { left: 0; top: 0; width: 1228px; height: 130px; background: #d8d4e8; }
    #s-big { left: 0; top: 0; width: 1105px; height: 130px; background: #ffc24b; opacity: 0; box-shadow: 4px 0 0 0 #0e0c1d; }
    #s-big90 { left: 50px; top: 220px; width: 1105px; text-align: center; font: 700 64px/70px "Fraunces", serif; opacity: 0; }
    #s-rest { left: 1155px; top: 340px; width: 123px; text-align: center; font-size: 30px; line-height: 38px; opacity: 0; }
    #s-job { left: 50px; top: 346px; height: 60px; line-height: 60px; background: #fbebd2; color: #7a4a00; font-size: 34px; opacity: 0; }
    #s-job b { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; font-weight: 700; }
    #s-secs { left: 50px; top: 430px; font-size: 30px; color: #3e3b52; opacity: 0; white-space: nowrap; }

    /* the limits */
    #s-8020 { left: 640px; top: 160px; height: 60px; line-height: 60px; background: #fff; font-size: 36px; z-index: 600; }
    #s-here { left: 880px; top: 160px; height: 60px; line-height: 60px; background: #ddefe6; color: #1f7a5c; font-size: 30px; z-index: 600; }
    #s-sline { left: 630px; top: 186px; width: 180px; height: 7px; border-radius: 4px; background: #b8235a; z-index: 601; opacity: 0; transform: rotate(-8deg); }
    #s-ct { position: absolute; left: ${sx(9) + BW / 2 - 150}px; top: 760px; width: 300px; text-align: center; z-index: 650; opacity: 0; }
    #s-ct > span { display: inline-block; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; background: #fbe0ea; color: #b8235a; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
        <!-- right column: who is speaking -->
        <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
        </svg>
        <div id="s-sam" class="s-fig">${person("#a9dcc4", "#2a2140")}</div>
        <div id="s-priya" class="s-fig">${person("#c9c6ff", "#6b3b1f")}</div>
        <div id="s-nmM" class="s-nm"><span>Maya</span></div>
        <div id="s-nmS" class="s-nm"><span style="background:#1f7a5c">Sam</span></div>
        <div id="s-nmP" class="s-nm"><span>Priya</span></div>
        <div id="s-res" class="s-abs s-ol s-hide">
          <small>AFTER 1 WEEK</small>
          <div id="s-rM" class="s-row" style="top:76px"><span>Maya's way</span><b>14</b></div>
          <div id="s-rS" class="s-row" style="top:156px"><span>Sam's way</span><b style="color:#1f7a5c">150</b></div>
        </div>

        <!-- plan headers and counter -->
        <div id="s-head1" class="s-lab s-hide">MAYA'S PLAN: OLDEST FIRST</div>
        <div id="s-head2" class="s-lab s-hide">SAM'S PLAN: COUNT FIRST</div>
        <div id="s-wk" class="s-pill s-hide" style="left:660px;top:48px;background:#fbebd2;color:#7a4a00">week 1</div>
        <div id="s-count" class="s-abs s-hide"><span id="s-cnt1">200 complaints</span><span id="s-cnt2">about 50 next month</span></div>
        <div id="s-p1" class="s-pill s-hide">box crushed · 11</div>
        <div id="s-p2" class="s-pill s-hide">menu typo · 3</div>

        <div id="s-chart">
          <div id="s-axis" class="s-abs"></div>
${CAUSES.map((c, i) => `          <div id="s-g${i}" class="s-ghost" style="left:${sx(i) - 4}px;top:${top(i) - 4}px;height:${SL * c[1] + 8}px"></div>`).slice(0, 2).join("\n")}
${CAUSES.map((c, i) => `          <div id="s-o${i}" class="s-out" style="top:${top(i)}px;height:${SL * c[1]}px"></div>`).join("\n")}
${CAUSES.map((c, i) => `          <div id="s-n${i}" class="s-n" style="top:${top(i) - 50}px">${c[1]}</div>`).join("\n")}
          ${cardHtml}
          <div id="s-l1" class="s-pill s-hide">delivery time wrong · 92</div>
          <div id="s-l2" class="s-pill s-hide">discount code refused · 58</div>
          <div id="s-q" class="s-pill s-hide">150 of 200</div>
          <div id="s-q3" class="s-pill s-hide">three quarters</div>
          <div id="s-fixed" class="s-abs s-hide">FIXED</div>
          <div id="s-pc75" class="s-pc" style="left:${pts[1][0] + 18}px;top:${pts[1][1] + 10}px">75%</div>
          <div id="s-pc100" class="s-pc" style="left:${pts[11][0] - 60}px;top:${pts[11][1] - 62}px">100%</div>
          <div id="s-bt1" class="s-bt" style="left:${sx(0) - 30}px;width:${PITCH + BW + 60}px">2 causes · 1 week</div>
          <div id="s-bt2" class="s-bt" style="left:${sx(2)}px;width:${PITCH * 9 + BW}px">10 causes · about a month · 50 complaints</div>
          <div id="s-ct"><span>charged twice · 2</span></div>
          <svg id="s-lines" class="s-abs" viewBox="0 0 1920 1080">
            <path id="s-ca" class="s-cl" d="${pathA}" />
            <path id="s-cb" class="s-cl" d="${pathB}" />
            <path id="s-ring" class="s-ring" d="${hand(sx(1) - 8, 640, 150, 330)}" />
            <path id="s-ring2" class="s-ring" stroke-dasharray="14 12" d="${hand(sx(9) + BW / 2, 905, 70, 46)}" />
            <path id="s-b1" class="s-brk" d="M${sx(0)} ${BASE + 18} V${BASE + 26} H${sx(1) + BW} V${BASE + 18}" />
            <path id="s-b2" class="s-brk" d="M${sx(2)} ${BASE + 18} V${BASE + 26} H${sx(11) + BW} V${BASE + 18}" />
            <g id="s-dots">${pts.map((p, i) => `<circle id="s-d${i}" cx="${p[0]}" cy="${p[1]}" r="9" />`).join("")}</g>
          </svg>
        </div>

        <!-- 80/20 is rough -->
        <div id="s-8020" class="s-pill s-hide">80 / 20</div>
        <div id="s-sline" class="s-abs"></div>
        <div id="s-here" class="s-pill s-hide">here: 2 of 12 causes made 75%</div>

        <!-- the slow page -->
        <div id="s-page" class="s-abs s-ol s-hide">
          <h2>The menu page takes <b>5 seconds</b> to load</h2>
          <div id="s-track" class="s-abs"><div id="s-fill" class="s-abs"></div><div id="s-big" class="s-abs"></div></div>
          <div id="s-big90" class="s-abs">90%</div>
          <div id="s-rest" class="s-abs">the rest</div>
          <div id="s-job" class="s-pill">one job: <b>resize_photos</b> · 4.5 s</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds), offset by the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });
      const K = ${JSON.stringify(cards.map((k) => [k.c, k.j, k.px, k.py, k.rot, Math.round(k.drop * 100) / 100]))};
      const SX = ${JSON.stringify(CAUSES.map((_, i) => sx(i)))};
      const UX = ${JSON.stringify(CAUSES.map((_, i) => ux(i)))};
      const card = (n) => "#s-k" + n;

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const fade = (sel, at) => tl.fromTo(sel, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, at);
      const draw = (sel, at, d, ease) => {
        const p = document.querySelector(sel);
        const L = p.getTotalLength() + 2;
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
        tl.set(p, { strokeDashoffset: L, opacity: 1 }, at);
        tl.to(p, { strokeDashoffset: 0, duration: d || 0.45, ease: ease || "power2.out" }, at + 0.01);
      };
      const swapTxt = (a, b, at) => {
        tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.08);
      };
      // where a card sits in a stack whose left edge is x
      const slot = (k, x) => ({ x: x + 8, y: ${BASE - 3 - 25} - ${SL} * k[1], rotation: 0, scaleX: 1.2, scaleY: 0.12 });
      const ofCause = (c) => K.map((k, n) => (k[0] === c ? card(n) : null)).filter(Boolean);

      /* ---- 1. 200 complaints fall into a heap ---- */
      tl.fromTo("#s-maya", { opacity: 1, y: 0 }, { opacity: 1, y: 0, duration: 0.01 }, 0);
      pop("#s-nmM", 0.2, { from: 0.4 });
      K.forEach((k, n) => {
        tl.fromTo(card(n), { x: k[2] - 40, y: k[3] - 25 - 700, rotation: k[4] - 40, opacity: 0 },
          { x: k[2] - 40, y: k[3] - 25, rotation: k[4], opacity: 1, duration: 0.5, ease: "power2.in" }, 0.15 + k[5] * 2.4);
      });
      tl.fromTo("#s-count", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, t(5) - 0.05);

      /* ---- 2. Maya's plan: oldest first ---- */
      fade("#s-head1", t(9) - 0.1);
      const crushed = ofCause(2), typo = ofCause(8);
      tl.to(crushed[0], { scale: 1.25, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, t(14));
      pop("#s-wk", t(18) - 0.1, { from: 0.4 });
      tl.to(crushed, { y: "-=40", scale: 1.12, duration: 0.35, ease: "back.out(2)" }, t(20) - 0.05);
      tl.to(typo, { y: "-=40", scale: 1.12, duration: 0.35, ease: "back.out(2)" }, t(21));
      pop("#s-p1", t(20) + 0.2, { from: 0.4 });
      pop("#s-p2", t(21) + 0.25, { from: 0.4 });
      tl.fromTo("#s-res", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(24) - 0.1);
      tl.to(crushed.concat(typo), { x: ${RC - 40}, y: 640, rotation: 0, scale: 0.4, opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.02 }, t(26));
      pop("#s-rM", t(28) - 0.05, { from: 0.5 });

      /* ---- 3. Sam counts first ---- */
      out(["#s-maya", "#s-nmM", "#s-head1", "#s-p1", "#s-p2", "#s-wk"], t(29) - 0.3, 0.25);
      tl.fromTo("#s-sam", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, t(29) - 0.05);
      pop("#s-nmS", t(29) + 0.15, { from: 0.4 });
      fade("#s-head2", t(30));
      // the 14 cards come back into the heap
      crushed.concat(typo).forEach((sel) => {
        const n = +sel.slice(5), k = K[n];
        tl.fromTo(sel, { x: k[2] - 40, y: k[3] - 25, rotation: k[4], scale: 0.5, opacity: 0 }, { x: k[2] - 40, y: k[3] - 25, rotation: k[4], scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, t(30) + 0.2 + (n % 7) * 0.03);
      });
      // into twelve stacks, in the order the causes first arrived
      K.forEach((k, n) => {
        tl.to(card(n), Object.assign(slot(k, UX[k[0]]), { duration: 0.7, ease: "power3.inOut" }), t(33) + (ARR_POS(k[0]) * 0.11) + (k[1] % 9) * 0.012);
      });
      function ARR_POS(c) { return ${JSON.stringify(ARRIVAL)}.indexOf(c); }
      ${CAUSES.map((_, i) => `tl.set("#s-o${i}", { x: UX[${i}] }, 0); tl.set("#s-n${i}", { x: UX[${i}] }, 0);`).join("\n      ")}
      tl.fromTo("#s-axis", { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power3.out" }, t(33));
      tl.fromTo(".s-out", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(33) + 2.0);
      tl.fromTo(".s-n", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.06 }, t(40) - 0.1);

      /* ---- 4. Line them up, biggest first ---- */
      K.forEach((k, n) => tl.to(card(n), { x: SX[k[0]] + 8, duration: 1.0, ease: "power3.inOut" }, t(44) + 0.1));
      SX.forEach((x, i) => tl.to(["#s-o" + i, "#s-n" + i], { x: x, duration: 1.0, ease: "power3.inOut" }, t(44) + 0.1));

      /* ---- 5. The first two ---- */
      const rest = [];
      for (let i = 2; i < 12; i++) rest.push("#s-o" + i, "#s-n" + i);
      const restCards = K.map((k, n) => (k[0] >= 2 ? card(n) : null)).filter(Boolean);
      tl.to(rest.concat(restCards), { opacity: 0.3, duration: 0.4, ease: "power2.inOut" }, t(49));
      pop("#s-l1", t(54) - 0.05, { from: 0.4 });
      pop("#s-l2", t(59) - 0.05, { from: 0.4 });
      draw("#s-ring", t(64) - 0.1, 0.6);
      pop("#s-q", t(65), { from: 0.4 });
      pop("#s-q3", t(71) - 0.05, { from: 0.4 });

      /* ---- 6. Add them up from the left ---- */
      out(["#s-ring", "#s-l1", "#s-l2", "#s-q", "#s-q3"], t(73) - 0.2, 0.25);
      tl.to(rest.concat(restCards), { opacity: 1, duration: 0.4, ease: "power2.inOut" }, t(73));
      draw("#s-ca", t(78) + 0.1, 1.0, "power1.in");
      pop("#s-d0", t(78) + 0.55, { from: 0.2, d: 0.3 });
      pop("#s-d1", t(81), { from: 0.2, d: 0.3 });
      pop("#s-pc75", t(82), { from: 0.4 });
      draw("#s-cb", t(83) - 0.1, 1.8, "power1.out");
      for (let i = 2; i < 12; i++) tl.fromTo("#s-d" + i, { opacity: 0 }, { opacity: 1, duration: 0.15 }, t(83) + (i - 1) * 0.15);
      pop("#s-pc100", t(83) + 1.8, { from: 0.4 });

      /* ---- 7. Fix those two first ---- */
      tl.fromTo("#s-fixed", { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.3, ease: "power4.in" }, t(87) - 0.1);
      const big = K.map((k, n) => (k[0] < 2 ? card(n) : null)).filter(Boolean).reverse();
      tl.to(big, { y: "-=260", opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.006 }, t(88) + 0.2);
      out(["#s-o0", "#s-o1", "#s-n0", "#s-n1"], t(88) + 0.4, 0.3);
      tl.fromTo(["#s-g0", "#s-g1"], { opacity: 0 }, { opacity: 1, duration: 0.4 }, t(88) + 1.1);
      draw("#s-b1", t(90) - 0.1, 0.35);
      fade("#s-bt1", t(90) + 0.1);
      pop("#s-rS", t(90) + 0.3, { from: 0.5 });
      out("#s-fixed", t(93) - 0.3, 0.2);
      swapTxt("#s-cnt1", "#s-cnt2", t(96));
      draw("#s-b2", t(101) - 0.1, 0.5);
      fade("#s-bt2", t(102));

      /* ---- 8. Code is the same: Priya's slow page ---- */
      tl.to("#s-chart", { opacity: 0, duration: 0.3, ease: "power2.in" }, t(109) - 0.2);
      out(["#s-head2", "#s-count", "#s-sam", "#s-nmS"], t(109) - 0.2, 0.25);
      tl.fromTo("#s-page", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(109) + 0.1);
      tl.fromTo("#s-priya", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, t(112) - 0.05);
      pop("#s-nmP", t(112) + 0.15, { from: 0.4 });
      tl.fromTo("#s-fill", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.4, ease: "none" }, t(113));
      tl.fromTo("#s-big", { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.7, ease: "power3.out" }, t(118) - 0.05);
      pop("#s-big90", t(118) + 0.25, { from: 0.4 });
      fade("#s-rest", t(118) + 0.5);
      pop("#s-job", t(126) - 0.05, { from: 0.5 });

      /* ---- 9. Count, don't guess. Weigh harm. ---- */
      out(["#s-page", "#s-priya", "#s-nmP"], t(128) - 0.3, 0.25);
      tl.to("#s-chart", { opacity: 1, duration: 0.4, ease: "power2.out" }, t(128));
      tl.to(["#s-head2", "#s-count", "#s-sam", "#s-nmS"], { opacity: 1, duration: 0.3 }, t(128));
      out(["#s-bt1", "#s-bt2", "#s-b1", "#s-b2"], t(128), 0.01);
      tl.to(".s-n", { scale: 1.3, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.08 }, t(129) + 0.4);
      pop("#s-8020", t(138) - 0.1, { from: 0.4 });
      tl.fromTo("#s-sline", { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "power2.out" }, t(139) + 0.15);
      pop("#s-here", t(139) + 0.5, { from: 0.4 });
      out(["#s-g0", "#s-g1"], t(141), 0.3);
      const twice = ofCause(9);
      tl.to(twice, { backgroundColor: "#ff6b8b", duration: 0.3 }, t(146));
      draw("#s-ring2", t(146) - 0.05, 0.45);
      fade("#s-ct", t(146) + 0.2);
      // it jumps the queue: arcs over the others to the front
      const dx = SX[1] - SX[9];
      const hop = twice.concat(["#s-o9", "#s-n9", "#s-ct"]);
      out("#s-ring2", t(149) - 0.2, 0.2);
      tl.to(hop, { x: "+=" + dx, duration: 1.0, ease: "power2.inOut" }, t(149));
      tl.to(hop, { y: "-=220", duration: 0.5, ease: "power2.out" }, t(149));
      tl.to(hop, { y: "+=220", duration: 0.5, ease: "power2.in" }, t(149) + 0.5);

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, ${END} - 0.35);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
fs.mkdirSync(path.join(here, "compositions"), { recursive: true });
fs.writeFileSync(path.join(here, "compositions/story.html"), html);
console.log("story.html written", html.length, "bytes; points", JSON.stringify(pts));
