// Generates compositions/story.html for lesson 60, Hofstadter's law.
// Opening: Sam guesses 2 days, Maya doubles it to 4.
// Then the one task card unfolds into ten smaller cards (a concertina), and the
// real bar along the day ruler grows with each card, its finish flag hopping right.
// Ending: three bars (2, 4, 9), then the five things to do, with an honest range.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 64.6;

/* ---------- layout ---------- */
const CW = 300, CH = 150, GX = 162, GAP = 24;
const ROWY = [124, 344];
const slot = (i) => ({ x: GX + (i % 5) * (CW + GAP), y: ROWY[Math.floor(i / 5)] });
const X0 = 270, DAY = 150;
const YREAL = 590, YSAM = 670, YMAYA = 744, AXIS = 830;

const GROUPS = {
  plan: { bg: "#ddefe6", fg: "#1f7a5c" },
  odd: { bg: "#fbebd2", fg: "#8a5510" },
  around: { bg: "#e6e3ff", fg: "#3b37e6" },
  stop: { bg: "#fbe0ea", fg: "#b8235a" },
};
const SMILE = `<svg class="s-ico" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffc24b" stroke="#0e0c1d" stroke-width="3.5"/><circle cx="14" cy="16" r="2.6" fill="#0e0c1d"/><circle cx="26" cy="16" r="2.6" fill="#0e0c1d"/><path d="M12 24 Q20 32 28 24" fill="none" stroke="#0e0c1d" stroke-width="3.5" stroke-linecap="round"/></svg>`;
const EMPTY = `<svg class="s-ico" viewBox="0 0 40 40"><rect x="7" y="5" width="26" height="30" fill="#fff" stroke="#0e0c1d" stroke-width="3.5"/></svg>`;
// ten pieces, in the order they are discovered
const CARDS = [
  { g: "plan", d: 1, days: "1 day", t: "Text box<br>+ save" },
  { g: "plan", d: 1, days: "1 day", t: "Print<br>the card" },
  { g: "odd", d: 0.5, days: "0.5 day", t: "Too long<br>for the card" },
  { g: "odd", d: 0.5, days: "0.5 day", t: `Emoji<br><span class="s-icons">${SMILE}<b>→</b>${EMPTY}</span>` },
  { g: "odd", d: 0.5, days: "0.5 day", t: "Rude<br>words" },
  { g: "around", d: 1.5, days: "1.5 days", t: "Kitchen screen<br>(Nina's team)" },
  { g: "around", d: 1, days: "1 day", t: "Tests" },
  { g: "around", d: 0.5, days: "0.5 day", t: "Tell the<br>partners" },
  { g: "around", d: 0.5, days: "0.5 day", t: "Review" },
  { g: "stop", d: 2, days: "2 days", t: "Emergency:<br>card payments" },
];
let cum = 0;
CARDS.forEach((c) => { c.from = cum; cum += c.d; c.to = cum; });
if (cum !== 9) throw new Error("cards must add to 9, got " + cum);

const cardHtml = (c, i) => {
  const { x, y } = slot(i), G = GROUPS[c.g];
  return `        <div id="s-c${i}" class="s-card" style="left:${x}px;top:${y}px">
          <div class="s-strip" style="background:${G.fg}"></div>
          <div class="s-days" style="background:${G.bg};color:${G.fg}">${c.days}</div>
          <div class="s-ct">${c.t}</div>
        </div>`;
};
const segHtml = (c, i) => `        <div id="s-g${i}" class="s-seg" style="left:${X0 + c.from * DAY}px;width:${c.d * DAY}px;background:${GROUPS[c.g].bg}"></div>`;
const PILLS = [
  { id: "s-pplan", g: "plan", x: slot(0).x, y: ROWY[0] - 58, t: "as planned" },
  { id: "s-podd", g: "odd", x: slot(2).x, y: ROWY[0] - 58, t: "odd cases" },
  { id: "s-paround", g: "around", x: slot(5).x, y: ROWY[1] - 58, t: "work around the work" },
  { id: "s-pstop", g: "stop", x: slot(9).x, y: ROWY[1] - 58, t: "interruption" },
];
const pillHtml = (p) => `        <div id="${p.id}" class="s-gpill" style="left:${p.x}px;top:${p.y}px;background:${GROUPS[p.g].bg};color:${GROUPS[p.g].fg}">${p.t}</div>`;

const ticks = [...Array(11)].map((_, d) =>
  `        <div class="s-tick" style="left:${X0 + d * DAY - 2}px"></div><div class="s-tl" style="left:${X0 + d * DAY - 40}px">${d}</div>`).join("\n");

const hand = (cx, cy, rx, ry) =>
  `M${cx - rx + 4} ${cy + 2} C${cx - rx - 2} ${cy - ry - 6} ${cx + rx} ${cy - ry - 8} ${cx + rx} ${cy} C${cx + rx} ${cy + ry + 4} ${cx - rx - 6} ${cy + ry + 6} ${cx - rx} ${cy - 8}`;

const ADVICE = [
  "Break it into small pieces",
  "List the work around the work",
  "Check what similar tasks really took",
  "Give a range: 6 to 10 days",
  "When it slips, say so early",
];
const adviceHtml = ADVICE.map((a, i) =>
  `        <div id="s-a${i}" class="s-adv" style="top:${70 + i * 88}px"><b>${i + 1}</b><span>${a}</span></div>`).join("\n");

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
const SAM = `
          <path d="M18 100 Q18 62 50 62 Q82 62 82 100 Z" fill="#a9dcc4" stroke="#0e0c1d" stroke-width="3" stroke-linejoin="round" />
          <circle cx="50" cy="38" r="20" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="3" />
          <path d="M30 36 Q32 16 50 16 Q68 16 70 36 Q58 26 44 27 Q36 28 30 36 Z" fill="#3e3b52" stroke="#0e0c1d" stroke-width="3" stroke-linejoin="round" />
          <circle cx="43" cy="40" r="2.2" fill="#0e0c1d" /><circle cx="57" cy="40" r="2.2" fill="#0e0c1d" />
          <path d="M43 47 Q50 53 57 47" fill="none" stroke="#0e0c1d" stroke-width="2.5" stroke-linecap="round" />`;

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    #s-all, #s-wrap, #s-open, #s-board { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-pill { position: absolute; height: 52px; line-height: 52px; padding: 0 24px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }

    /* opening */
    #s-sam { left: 120px; top: 330px; width: 320px; height: 320px; }
    #s-samname { left: 222px; top: 664px; background: #1f7a5c; color: #fff; }
    #s-maya { left: 1530px; top: 300px; width: 280px; height: 364px; }
    #s-mayaname { left: 1600px; top: 664px; background: #3b37e6; color: #fff; }
    #s-gift { left: 610px; top: 110px; width: 700px; height: 320px; background: #fff; border-radius: 26px; }
    #s-gift small { position: absolute; left: 44px; top: 30px; font-size: 34px; letter-spacing: 0.12em; color: #8a5510; }
    #s-gift .m { position: absolute; left: 44px; top: 96px; font: 700 54px/1.2 "Fraunces", serif; letter-spacing: -0.01em; white-space: nowrap; }
    #s-gift .f { position: absolute; left: 44px; top: 200px; font: 700 40px/1.2 "Fraunces", serif; color: #3e3b52; white-space: nowrap; }
    #s-gift i { position: absolute; right: 40px; bottom: 30px; width: 70px; height: 70px; }
    .s-idea { position: absolute; top: 500px; height: 64px; line-height: 64px; padding: 0 26px; border-radius: 18px; background: #e6e3ff; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    .s-bub { position: absolute; height: 84px; line-height: 84px; padding: 0 30px; border-radius: 26px; background: #fff; font: 700 48px/84px "Fraunces", serif; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }
    .s-bub::after { content: ""; position: absolute; bottom: -22px; width: 30px; height: 30px; background: #fff; transform: rotate(45deg); box-shadow: 5px 5px 0 0 #0e0c1d; }
    #s-bsam { left: 168px; top: 200px; }
    #s-bsam::after { left: 70px; }
    #s-bmaya { left: 1390px; top: 186px; }
    #s-bmaya::after { right: 90px; }
    #s-bmaya i { font-style: normal; color: #3b37e6; display: inline-block; }
    #s-cbox { left: 840px; top: 452px; width: 240px; height: 150px; }
    #s-uline { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-task { left: 650px; top: 630px; width: 620px; height: 140px; background: #fff; border-radius: 24px; }
    #s-task span { position: absolute; left: 34px; top: 0; font: 700 50px/140px "Fraunces", serif; white-space: nowrap; }
    #s-task b { position: absolute; right: 26px; top: 40px; height: 60px; line-height: 60px; padding: 0 20px; border-radius: 999px; background: #e6e3ff; color: #3b37e6; font-size: 32px; white-space: nowrap; }

    /* the unfolded cards */
    .s-card { position: absolute; width: ${CW}px; height: ${CH}px; background: #fff; border-radius: 18px; box-shadow: 0 0 0 4px #0e0c1d, 0 8px 0 4px #0e0c1d; overflow: hidden; opacity: 0; }
    .s-strip { position: absolute; left: 0; top: 0; width: 14px; height: ${CH}px; }
    .s-days { position: absolute; left: 30px; top: 14px; height: 42px; line-height: 42px; padding: 0 16px; border-radius: 999px; font-size: 28px; white-space: nowrap; }
    .s-ct { position: absolute; left: 32px; top: 62px; width: 260px; font-size: 30px; line-height: 38px; white-space: nowrap; }
    .s-icons { display: inline-flex; align-items: center; gap: 10px; height: 38px; vertical-align: top; }
    .s-icons b { font-size: 30px; }
    .s-ico { width: 34px; height: 34px; }
    .s-gpill { position: absolute; height: 44px; line-height: 44px; padding: 0 20px; border-radius: 999px; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 3px #0e0c1d; opacity: 0; }

    /* the day ruler and bars */
    .s-side { position: absolute; left: 80px; width: 150px; height: 56px; line-height: 56px; font-size: 30px; text-align: right; color: #3e3b52; opacity: 0; }
    .s-seg { position: absolute; top: ${YREAL}px; height: 56px; box-shadow: inset 0 0 0 4px #0e0c1d; border-radius: 10px; opacity: 0; }
    .s-bar { position: absolute; left: ${X0}px; height: 56px; border-radius: 10px; box-shadow: inset 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-bar span { position: absolute; left: 20px; top: 0; font-size: 30px; line-height: 56px; white-space: nowrap; }
    #s-bsambar { top: ${YSAM}px; width: ${2 * DAY}px; background: #fff; }
    #s-bmayabar { top: ${YMAYA}px; width: ${4 * DAY}px; background: #fff; }
    #s-axis { left: ${X0 - 16}px; top: ${AXIS}px; width: ${10 * DAY + 40}px; height: 6px; background: #0e0c1d; border-radius: 3px; opacity: 0; }
    .s-tick { position: absolute; top: ${AXIS - 10}px; width: 5px; height: 26px; background: #0e0c1d; opacity: 0; }
    .s-tl { position: absolute; top: ${AXIS + 16}px; width: 80px; text-align: center; font-size: 28px; line-height: 40px; color: #3e3b52; opacity: 0; }
    #s-dayslab { left: 80px; top: ${AXIS + 16}px; width: 150px; text-align: right; font-size: 28px; line-height: 40px; color: #3e3b52; opacity: 0; }
    #s-flag { left: ${X0 - 4}px; top: ${YREAL - 66}px; width: 48px; height: 66px; opacity: 0; }
    #s-nine { left: ${X0 + 9 * DAY + 26}px; top: ${YREAL + 2}px; background: #0e0c1d; color: #fff; }
    #s-gap { left: ${X0 + 4 * DAY + 10}px; top: ${YMAYA + 25}px; width: ${5 * DAY - 10}px; height: 0; border-top: 6px dashed #b8235a; opacity: 0; }
    #s-short { left: ${X0 + 6.5 * DAY - 150}px; top: ${YMAYA + 2}px; background: #fbe0ea; color: #b8235a; }
    #s-even { left: ${X0}px; top: ${AXIS + 76}px; font: 700 46px/1.2 "Fraunces", serif; color: #3b37e6; letter-spacing: -0.01em; white-space: nowrap; opacity: 0; }
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks > path { fill: none; stroke-width: 7; stroke-linecap: round; opacity: 0; }

    /* what to do */
    .s-adv { position: absolute; left: ${GX}px; height: 70px; display: flex; align-items: center; gap: 24px; opacity: 0; }
    .s-adv b { width: 60px; height: 60px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 32px; line-height: 60px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; flex: none; }
    .s-adv span { font-size: 40px; line-height: 70px; white-space: nowrap; }
    #s-range { left: ${X0 + 6 * DAY}px; top: ${YREAL - 14}px; width: ${4 * DAY}px; height: ${YMAYA + 56 - YREAL + 28}px; border-radius: 18px; border: 6px dashed #1f7a5c; background: rgba(31, 122, 92, 0.07); opacity: 0; }
    #s-rangelab { left: ${X0 + 6 * DAY - 6}px; top: ${YREAL - 72}px; background: #1f7a5c; color: #fff; }
    #s-ok { left: ${X0 + 9 * DAY + 168}px; top: ${YREAL - 2}px; width: 60px; height: 60px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-ok > svg { position: absolute; left: 0; top: 0; width: 60px; height: 60px; }
    #s-tell { left: ${X0 + 3 * DAY - 120}px; top: ${YREAL - 72}px; background: #fbebd2; color: #8a5510; }
    #s-tellpin { left: ${X0 + 3 * DAY - 3}px; top: ${YREAL - 20}px; width: 6px; height: 96px; background: #b9741a; opacity: 0; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
        <!-- opening: the guess -->
        <div id="s-open">
          <svg id="s-sam" class="s-abs" viewBox="0 0 100 100">${SAM}
          </svg>
          <div id="s-samname" class="s-pill">Sam</div>
          <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
          </svg>
          <div id="s-mayaname" class="s-pill">Maya</div>
          <div id="s-gift" class="s-abs s-ol s-hide">
            <small>GIFT MESSAGE</small>
            <div class="m">Happy birthday, Gran!</div>
            <div class="f">Love, Leo</div>
            <i><svg viewBox="0 0 70 70"><path d="M35 60 C10 44 6 28 14 18 C22 9 32 13 35 22 C38 13 48 9 56 18 C64 28 60 44 35 60 Z" fill="#fbe0ea" stroke="#b8235a" stroke-width="5" stroke-linejoin="round"/></svg></i>
          </div>
          <svg id="s-cbox" class="s-abs s-hide" viewBox="0 0 240 150"><path d="M20 50 H220 V140 H20 Z" fill="#f3cf95" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round"/><path d="M10 30 H230 V58 H10 Z" fill="#fbebd2" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round"/><path d="M120 30 V140" stroke="#b8235a" stroke-width="10"/><g stroke="#0e0c1d" stroke-width="4"><circle cx="62" cy="96" r="22" fill="#d9a05b"/><circle cx="178" cy="96" r="22" fill="#d9a05b"/></g><rect x="150" y="6" width="70" height="46" rx="6" fill="#fff" stroke="#0e0c1d" stroke-width="5" transform="rotate(12 185 29)"/></svg>
          <svg id="s-uline" class="s-abs" viewBox="0 0 1920 1080"><path d="M656 290 Q900 302 1190 286" fill="none" stroke="#3b37e6" stroke-width="8" stroke-linecap="round" opacity="0"/></svg>
          <div id="s-i0" class="s-idea s-hide" style="left:470px">a box on the website</div>
          <div id="s-i1" class="s-idea s-hide" style="left:874px">save the note</div>
          <div id="s-i2" class="s-idea s-hide" style="left:1168px">print the card</div>
          <div id="s-bsam" class="s-bub s-hide">2 days</div>
          <div id="s-bmaya" class="s-bub s-hide">2 × 2 = <i id="s-four">4</i> days</div>
        </div>
        <div id="s-task" class="s-abs s-ol s-hide"><span>Gift messages</span><b>2 days</b></div>

        <!-- the task, unfolded -->
        <div id="s-board">
${PILLS.map(pillHtml).join("\n")}
${CARDS.map(cardHtml).join("\n")}
${ADVICE.length ? adviceHtml : ""}
        </div>

        <!-- the day ruler -->
        <div class="s-side" id="s-lreal" style="top:${YREAL}px">Real</div>
        <div class="s-side" id="s-lsam" style="top:${YSAM}px">Sam</div>
        <div class="s-side" id="s-lmaya" style="top:${YMAYA}px">Maya</div>
        <div id="s-bsambar" class="s-bar"><span>guess: 2</span></div>
        <div id="s-bmayabar" class="s-bar"><span>2 × 2 = 4</span></div>
        <div id="s-range" class="s-abs"></div>
${CARDS.map(segHtml).join("\n")}
        <div id="s-axis" class="s-abs"></div>
${ticks}
        <div id="s-dayslab" class="s-abs">days</div>
        <svg id="s-flag" class="s-abs" viewBox="0 0 48 66"><path d="M6 64 V4" stroke="#0e0c1d" stroke-width="5" stroke-linecap="round"/><path d="M8 5 L44 15 L8 27 Z" fill="#b8235a" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round"/></svg>
        <div id="s-nine" class="s-pill s-hide">9 days</div>
        <div id="s-gap" class="s-abs"></div>
        <div id="s-short" class="s-pill s-hide">still 5 days short</div>
        <div id="s-even" class="s-abs">Even when you expect it to take longer.</div>
        <div id="s-rangelab" class="s-pill s-hide">range: 6 to 10</div>
        <div id="s-ok" class="s-abs"><svg viewBox="0 0 60 60"><path d="M17 31 L27 41 L44 21" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg></div>
        <div id="s-tellpin" class="s-abs"></div>
        <div id="s-tell" class="s-pill s-hide">day 3: tell Maya</div>
        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-rsam" style="stroke:#b8235a" d="${hand(X0 + DAY, YSAM + 28, DAY + 14, 38)}" />
          <path id="s-rmaya" style="stroke:#b8235a" d="${hand(X0 + 2 * DAY, YMAYA + 28, 2 * DAY + 14, 38)}" />
        </svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds), offset by the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });
      const DAY = ${DAY};
      const C = ${JSON.stringify(CARDS.map((c) => ({ to: c.to })))};

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const fade = (sel, at) => tl.fromTo(sel, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, at);
      const draw = (sel, at, d) => {
        document.querySelectorAll(sel).forEach((p) => {
          const L = p.getTotalLength() + 2;
          gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
          tl.set(p, { strokeDashoffset: L, opacity: 1 }, at);
          tl.to(p, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at + 0.01);
        });
      };
      const bar = (sel, at, d) => tl.fromTo(sel, { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: d || 0.6, ease: "power3.out" }, at);
      // a card folds open from its left edge, its bar segment grows, and the flag hops to the new end
      const unfold = (i, at) => {
        tl.fromTo("#s-c" + i, { opacity: 0, rotationY: -88, transformPerspective: 900, transformOrigin: "0% 50%" }, { opacity: 1, rotationY: 0, duration: 0.55, ease: "back.out(1.4)" }, at);
        bar("#s-g" + i, at + 0.25, 0.5);
        tl.to("#s-flag", { x: C[i].to * DAY, duration: 0.5, ease: "back.out(1.6)" }, at + 0.3);
        tl.fromTo("#s-flag", { y: 0 }, { y: -26, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, at + 0.3);
      };

      /* ---- 1. How long will gift messages take? ---- */
      tl.fromTo("#s-sam", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 0);
      tl.fromTo("#s-maya", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 0);
      pop("#s-mayaname", t(0) + 0.1, { from: 0.4 });
      pop("#s-samname", t(2) - 0.05, { from: 0.4 });
      tl.fromTo("#s-gift", { opacity: 0, y: -120, rotation: -9 }, { opacity: 1, y: 0, rotation: -2, duration: 0.6, ease: "back.out(1.3)" }, t(5) - 0.1);

      draw("#s-uline path", t(10), 0.5);
      tl.fromTo("#s-cbox", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, t(17) - 0.1);
      tl.fromTo("#s-cbox", { rotation: 0 }, { rotation: -4, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" }, t(20));

      /* ---- 2. Sam pictures it: three pieces, two days ---- */
      out(["#s-cbox", "#s-uline path"], t(22) - 0.1, 0.3);
      tl.to("#s-gift", { scale: 0.86, y: -20, duration: 0.5, ease: "power2.inOut" }, t(22));
      pop("#s-i0", t(25) - 0.05, { from: 0.5 });
      pop("#s-i1", t(29) - 0.05, { from: 0.5 });
      pop("#s-i2", t(32) - 0.05, { from: 0.5 });
      tl.to(["#s-i0", "#s-i1", "#s-i2"], { x: (k) => [240, -60, -330][k], y: 150, scale: 0.4, opacity: 0, duration: 0.45, ease: "power3.in", stagger: 0.06 }, t(35) - 0.2);
      tl.fromTo("#s-task", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, t(35) + 0.15);
      pop("#s-bsam", t(35), { from: 0.3, ease: "back.out(2.2)" });

      /* ---- 3. Maya doubles it ---- */
      tl.set("#s-four", { opacity: 0 }, 0);
      pop("#s-bmaya", t(41) - 0.05, { from: 0.3, ease: "back.out(2.2)" });
      tl.fromTo("#s-four", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)" }, t(43) - 0.05);

      /* ---- 4. The task unfolds: the ruler, the two plans, the first two cards ---- */
      tl.to("#s-open", { opacity: 0, y: -40, duration: 0.35, ease: "power2.in" }, t(45) - 0.2);
      tl.to("#s-task", { y: -330, duration: 0.5, ease: "power3.inOut" }, t(45) + 0.1);
      tl.fromTo("#s-axis", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power3.out" }, t(45));
      tl.fromTo(".s-tick, .s-tl, #s-dayslab", { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.03 }, t(45) + 0.2);
      tl.fromTo(".s-side", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.1 }, t(45) + 0.4);
      bar("#s-bsambar", t(45) + 0.5, 0.45);
      bar("#s-bmayabar", t(45) + 0.75, 0.55);
      tl.fromTo("#s-flag", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, t(47));
      tl.to("#s-task", { scaleX: 0, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.in" }, t(48) + 0.2);
      tl.set("#s-task", { opacity: 0 }, t(48) + 0.5);
      unfold(0, t(50) - 0.1);
      unfold(1, t(53) - 0.1);
      pop("#s-pplan", t(57), { from: 0.4 });

      /* ---- 5. The odd cases ---- */
      pop("#s-podd", t(61) - 0.05, { from: 0.4 });
      unfold(2, t(64));
      unfold(3, t(70) - 0.05);
      unfold(4, t(76) - 0.05);

      /* ---- 6. The work around the work ---- */
      pop("#s-paround", t(80) - 0.05, { from: 0.4 });
      unfold(5, t(85) - 0.05);
      unfold(6, t(91) - 0.05);
      unfold(7, t(93));
      unfold(8, t(98));

      /* ---- 7. An emergency steals two days ---- */
      pop("#s-pstop", t(102) - 0.05, { from: 0.4 });
      unfold(9, t(103) - 0.1);

      /* ---- 8. Guessed 2, planned 4, took 9 ---- */
      draw("#s-rsam", t(106), 0.5);
      draw("#s-rmaya", t(109), 0.55);
      pop("#s-nine", t(114) - 0.05, { from: 0.4, ease: "back.out(2.2)" });
      tl.fromTo("#s-gap", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" }, t(117));
      pop("#s-short", t(120) - 0.1, { from: 0.4, ease: "back.out(2.2)" });
      tl.fromTo("#s-even", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(120) + 0.4);

      /* ---- 9. What to do ---- */
      out(["#s-rsam", "#s-rmaya"], t(121) - 0.4, 0.3);
      out(["#s-gap", "#s-short"], t(140) - 0.3, 0.3);
      tl.to([".s-card", ".s-gpill"], { opacity: 0, y: -20, duration: 0.3, ease: "power2.in", stagger: 0.015 }, t(121) - 0.4);
      fade("#s-a0", t(122));
      fade("#s-a1", t(128));
      fade("#s-a2", t(134));
      fade("#s-a3", t(140));
      tl.fromTo("#s-range", { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, t(143) - 0.05);
      pop("#s-rangelab", t(143) + 0.15, { from: 0.4 });
      pop("#s-ok", t(146), { from: 0.2, ease: "back.out(2.4)" });
      fade("#s-a4", t(147));
      tl.fromTo("#s-tellpin", { opacity: 1, scaleY: 0, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: 0.35, ease: "power3.out" }, t(148));
      pop("#s-tell", t(148) + 0.25, { from: 0.4, ease: "back.out(2.2)" });

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
console.log("story.html written", html.length, "bytes");
