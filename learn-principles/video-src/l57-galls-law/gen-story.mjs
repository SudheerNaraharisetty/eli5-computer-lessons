// Generates compositions/story.html for lesson 57, Gall's law.
// Left: try 1, seven blocks held up by scaffolding, switched on at once, they fall.
// Right: try 2, one small block that works, then one piece at a time.
// Then the left side becomes a chart: pieces in real use, month by month.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 65.7;

const WEB = { fill: "#e6e3ff", col: "#3b37e6" }, KIT = { fill: "#fbebd2", col: "#b9741a" }, MON = { fill: "#ddefe6", col: "#1f7a5c" };
// try 1: the seven pieces of the plan, bottom to top in the tower
const PIECES = [
  { k: "ord", name: "ordering", t: WEB },
  { k: "kit", name: "kitchen screen", t: KIT },
  { k: "del", name: "delivery", t: KIT },
  { k: "loy", name: "loyalty points", t: WEB },
  { k: "sto", name: "stock", t: KIT },
  { k: "acc", name: "accounts", t: MON },
  { k: "app", name: "phone app", t: WEB },
];
const BX = 250, BW = 340, BH = 80, GROUND = 920;
const top1 = (i) => GROUND - BH - i * 94; // block i sits on a scaffold plank
// where each block sits on the plan card (absolute), then where it lands as rubble
const PLAN = PIECES.map((_, i) => ({ x: 600 + (i % 3) * 400, y: 330 + Math.floor(i / 3) * 120 }));
const RUBBLE = [
  [120, 840, -4], [470, 842, 3], [290, 762, -12], [610, 770, 9], [140, 690, 13], [520, 690, -7], [330, 606, 17],
];

// try 2: the tower that grows
const RX = 1220, RW = 440;
const TRY2 = [
  { k: "b0", name: "order 1 cookie → kitchen", when: "week 1", rot: 0 },
  { k: "b1", name: "delivery", when: "month 2", rot: -2 },
  { k: "b2", name: "loyalty points", when: "month 4", rot: 1.5 },
  { k: "b3", name: "phone app", when: "month 6", rot: -1.2 },
];
const top2 = (i) => GROUND - BH - i * 84;

// chart geometry
const CX0 = 250, CY0 = 820, PXM = 70, PXN = 66; // month and piece scale
const cx = (m) => CX0 + m * PXM, cy = (n) => CY0 - n * PXN;
const RED = `M${cx(0)} ${cy(0)} H${cx(9)} L${cx(9) + 8} ${cy(7)} L${cx(9) + 16} ${cy(0)} H${cx(9) + 50}`;
const GREEN = `M${cx(0)} ${cy(0)} H${cx(0.25)} V${cy(2)} H${cx(2)} V${cy(3)} H${cx(4)} V${cy(4)} H${cx(6)} V${cy(5)} H${cx(8)} V${cy(6)} H${cx(9) + 50}`;

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

const CHECK = `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#1f7a5c" stroke="#0e0c1d" stroke-width="5" /><path d="M19 33 L28 42 L46 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>`;

// scaffolding: two poles, a plank under every block, cross braces
const planks = PIECES.map((_, i) => `<path d="M216 ${top1(i) + BH + 7} H624" />`).join("");
const braces = PIECES.slice(1).map((_, i) => {
  const a = top1(i) + BH + 7, b = top1(i + 1) + BH + 7;
  return i % 2 ? `<path class="s-br" d="M230 ${a} L610 ${b}" />` : `<path class="s-br" d="M610 ${a} L230 ${b}" />`;
}).join("");

// "?" badges sprinkled over the rubble
const QS = [[210, 800], [420, 812], [600, 830], [360, 724], [560, 650], [240, 650], [700, 738], [460, 580]];

const months = Array.from({ length: 9 }, (_, i) => `<b id="s-m${i + 1}">${i + 1}</b>`).join("");

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; }
    #s-all, #s-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-pill { position: absolute; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-lab { position: absolute; font-size: 30px; line-height: 40px; color: #3e3b52; white-space: nowrap; letter-spacing: 0.04em; }

    /* opening */
    #s-maya { left: 96px; top: 540px; width: 330px; height: 429px; }
    #s-plan { left: 520px; top: 96px; width: 1300px; height: 600px; background: #fff; border-radius: 28px; }
    #s-ptitle { left: 48px; top: 34px; font: 700 76px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-pages { left: 470px; top: 54px; background: #ece7df; color: #0e0c1d; }
    #s-switch { left: 760px; top: 760px; padding: 6px 30px; background: #0e0c1d; color: #fff; border-radius: 16px; font-size: 44px; line-height: 1.3; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 8px 0 4px #3b37e6; }

    /* blocks */
    .s-blk { position: absolute; height: ${BH}px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; opacity: 0; }
    .s-blk > i { position: absolute; left: 16px; top: 16px; width: 12px; height: 48px; border-radius: 6px; }
    .s-chk { position: absolute; width: 60px; height: 60px; opacity: 0; }
    .s-chk > svg { position: absolute; left: 0; top: 0; width: 60px; height: 60px; }

    /* try 1 */
    #s-h1 { left: 110px; top: 120px; }
    #s-h2 { left: 1040px; top: 120px; }
    #s-scaf { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; opacity: 0; }
    #s-scaf path { fill: none; stroke: #8a8577; stroke-width: 10; stroke-linecap: round; }
    #s-scaf .s-br { stroke-width: 5; stroke: #a9a395; }
    #s-ground { left: 96px; top: ${GROUND + 8}px; width: 1728px; height: 8px; border-radius: 4px; background: #0e0c1d; opacity: 0; }
    #s-month { left: 1100px; top: 260px; width: 560px; height: 230px; background: #fff; border-radius: 26px; }
    #s-month small { position: absolute; left: 40px; top: 30px; font-size: 30px; letter-spacing: 0.08em; color: #3e3b52; }
    #s-mnum { position: absolute; left: 40px; top: 74px; width: 200px; height: 130px; font: 700 120px/130px "Fraunces", serif; }
    #s-mnum > b { position: absolute; left: 0; top: 0; opacity: 0; }
    #s-of9 { position: absolute; left: 160px; top: 128px; font-size: 36px; color: #3e3b52; white-space: nowrap; }
    #s-nocust { left: 1100px; top: 540px; background: #ece7df; }
    #s-sday { left: 1100px; top: 200px; padding: 4px 26px; background: #0e0c1d; color: #fff; border-radius: 14px; font-size: 40px; line-height: 1.3; white-space: nowrap; }
    .s-fail { position: absolute; left: 1100px; width: 640px; height: 100px; background: #fbe0ea; border-radius: 22px; display: flex; align-items: center; padding-left: 96px; font-size: 38px; color: #b8235a; white-space: nowrap; opacity: 0; }
    .s-fail > span { position: absolute; left: 24px; top: 22px; width: 56px; height: 56px; border-radius: 50%; background: #b8235a; color: #fff; font-size: 36px; line-height: 56px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-q { position: absolute; width: 56px; height: 56px; border-radius: 50%; background: #b8235a; color: #fff; font-size: 34px; line-height: 56px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-which { left: 1100px; top: 700px; background: #fff; color: #b8235a; }
    #s-back { left: 230px; top: 420px; padding: 6px 30px; background: #b8235a; color: #fff; font-size: 52px; letter-spacing: 0.08em; border-radius: 12px; box-shadow: 0 0 0 5px #0e0c1d; white-space: nowrap; }

    /* try 2 */
    .s-when { position: absolute; left: 1040px; height: 48px; line-height: 48px; padding: 0 18px; border-radius: 999px; background: #fff; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-thatsall { left: 1110px; top: 300px; background: #fff; color: #3e3b52; box-shadow: none; border: 4px dashed #3e3b52; line-height: 44px; }
    .s-guess { position: absolute; left: 1110px; height: 56px; display: flex; align-items: center; gap: 14px; opacity: 0; }
    .s-gp { position: relative; width: 600px; height: 56px; }
    .s-gp > div { position: absolute; left: 0; top: 0; height: 56px; line-height: 56px; padding: 0 22px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-gp .bad { background: #fbe0ea; color: #b8235a; }
    .s-gp .good { background: #ddefe6; color: #1f7a5c; opacity: 0; }
    #s-onlynew { left: 1300px; top: 960px; background: #ddefe6; color: #1f7a5c; }

    /* chart */
    #s-chart { left: 96px; top: 190px; width: 900px; height: 790px; background: #fff; border-radius: 28px; }
    #s-ctitle { left: 40px; top: 28px; font-size: 30px; letter-spacing: 0.06em; color: #3e3b52; white-space: nowrap; }
    #s-plot { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-plot .ax { fill: none; stroke: #0e0c1d; stroke-width: 5; stroke-linecap: round; }
    #s-plot .gr { fill: none; stroke: #ece7df; stroke-width: 3; }
    #s-red { fill: none; stroke: #b8235a; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    #s-green { fill: none; stroke: #1f7a5c; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    .s-tick { position: absolute; font-size: 28px; color: #3e3b52; white-space: nowrap; }
    #s-lred { left: 470px; top: ${cy(0) - 64}px; color: #b8235a; }
    #s-lgreen { left: 300px; top: ${cy(6) - 62}px; color: #1f7a5c; }
    .s-cl { position: absolute; font-size: 30px; white-space: nowrap; opacity: 0; }

    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks > path { fill: none; stroke: #1f7a5c; stroke-width: 7; stroke-linecap: round; opacity: 0; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap" data-layout-allow-overlap>
        <!-- opening: Maya and the plan -->
        <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
        </svg>
        <div id="s-plan" class="s-abs s-ol s-hide">
          <div id="s-ptitle" class="s-abs">Maya 2.0</div>
          <div id="s-pages" class="s-pill s-hide">the plan: 60 pages</div>
        </div>
        <div id="s-switch" class="s-abs s-hide">switch it all on: month 9</div>

        <!-- try 1 -->
        <div id="s-h1" class="s-lab s-hide">TRY 1: ALL AT ONCE</div>
        <div id="s-ground" class="s-abs"></div>
        <svg id="s-scaf" class="s-abs" viewBox="0 0 1920 1080">
          <path d="M230 ${top1(6) - 30} V${GROUND + 4}" /><path d="M610 ${top1(6) - 30} V${GROUND + 4}" />
          ${planks}${braces}
        </svg>
        <div id="s-month" class="s-abs s-ol s-hide"><small>BUILDING, NOT USED</small><div id="s-mnum">${months}</div><div id="s-of9">month</div></div>
        <div id="s-nocust" class="s-pill s-hide">real customers using it: 0</div>
${PIECES.map((p, i) => `        <div id="s-p-${p.k}" class="s-blk" data-layout-allow-occlusion style="left:${BX}px;top:${top1(i)}px;width:${BW}px;background:${p.t.fill}"><i style="background:${p.t.col}"></i>${p.name}</div>`).join("\n")}
        <div id="s-sday" class="s-abs s-hide">SWITCH-ON DAY</div>
        <div id="s-f1" class="s-fail s-ol" style="top:300px"><span>!</span>orders vanish</div>
        <div id="s-f2" class="s-fail s-ol" style="top:430px"><span>!</span>loyalty points double</div>
        <div id="s-f3" class="s-fail s-ol" style="top:560px"><span>!</span>the app cannot log in</div>
${QS.map(([x, y], i) => `        <div id="s-q${i}" class="s-q" style="left:${x}px;top:${y}px">?</div>`).join("\n")}
        <div id="s-which" class="s-pill s-hide">which guess broke what?</div>
        <div id="s-back" class="s-abs s-hide">SWITCHED BACK</div>

        <!-- chart (replaces the rubble) -->
        <div id="s-chart" class="s-abs s-ol s-hide">
          <div id="s-ctitle" class="s-abs">PIECES IN REAL USE</div>
        </div>
        <svg id="s-plot" class="s-abs" viewBox="0 0 1920 1080">
          <g id="s-axes" opacity="0">
${[1, 2, 3, 4, 5, 6, 7].map((n) => `            <path class="gr" d="M${cx(0)} ${cy(n)} H${cx(9) + 50}" />`).join("\n")}
            <path class="ax" d="M${cx(0)} ${cy(7) - 20} V${cy(0)} H${cx(9) + 60}" />
          </g>
          <path id="s-red" d="${RED}" />
          <path id="s-green" d="${GREEN}" />
        </svg>
        <div id="s-ticks" class="s-abs s-hide" style="left:0;top:0">
          <div class="s-tick" style="left:${cx(0) - 24}px;top:${cy(0) - 20}px">0</div>
          <div class="s-tick" style="left:${cx(0) - 24}px;top:${cy(7) - 20}px">7</div>
${[0, 3, 6, 9].map((m) => `          <div class="s-tick" style="left:${cx(m) - 8}px;top:${cy(0) + 14}px">${m}</div>`).join("\n")}
          <div class="s-tick" style="left:${cx(4) - 20}px;top:${cy(0) + 56}px">months</div>
        </div>
        <div id="s-lred" class="s-cl">try 1: zero, then a crash</div>
        <div id="s-lgreen" class="s-cl">try 2: step by step</div>

        <!-- try 2 -->
        <div id="s-h2" class="s-lab s-hide">TRY 2: ONE PIECE AT A TIME</div>
        <div id="s-thatsall" class="s-pill s-hide">no delivery, no loyalty, no app</div>
        <div id="s-g1" class="s-guess" style="top:420px"><div class="s-gp"><div class="bad">wrong guess: pick-up time</div><div class="good">fixed in a day: pick-up time</div></div></div>
        <div id="s-g2" class="s-guess" style="top:510px"><div class="s-gp"><div class="bad">wrong guess: clock 1 hour off</div><div class="good">fixed in a day: the clock</div></div></div>
${TRY2.map((b, i) => `        <div id="s-${b.k}" class="s-blk" style="left:${RX}px;top:${top2(i)}px;width:${RW}px;background:${i ? "#fff" : "#ddefe6"}"><i style="background:#1f7a5c"></i>${b.name}</div>
        <div id="s-${b.k}w" class="s-when" style="top:${top2(i) + 16}px">${b.when}</div>
        <div id="s-${b.k}c" class="s-chk" style="left:${RX + RW - 26}px;top:${top2(i) - 22}px">${CHECK}</div>`).join("\n")}
        <div id="s-onlynew" class="s-pill s-hide">the only new thing</div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-r1" d="${hand(RX + RW / 2, top2(0) + BH / 2, RW / 2 + 40, 62)}" />
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
      const stamp = (sel, at, rot) => tl.fromTo(sel, { opacity: 0, scale: 2.2, rotation: 4 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.3, ease: "power4.in" }, at);

      const PLAN = ${JSON.stringify(PLAN)};
      const RUB = ${JSON.stringify(RUBBLE)};
      const KEYS = ${JSON.stringify(PIECES.map((p) => p.k))};
      const BX = ${BX}, TOPS = ${JSON.stringify(PIECES.map((_, i) => top1(i)))};

      /* ---- 1. Maya plans Maya 2.0: seven pieces, sixty pages, month nine ---- */
      tl.fromTo("#s-maya", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0.1);
      tl.fromTo("#s-plan", { opacity: 0, y: 40, rotation: -2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)" }, t(4) - 0.1);
      tl.fromTo("#s-ptitle", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, t(7) - 0.05);
      // each block sits on the plan until the teams build it
      KEYS.forEach((k, i) => tl.set("#s-p-" + k, { x: PLAN[i].x - BX, y: PLAN[i].y - TOPS[i] }, 0));
      [11, 12, 14, 15, 17, 18, 21].forEach((w, i) => pop("#s-p-" + KEYS[i], t(w) - 0.05, { from: 0.5, ease: "back.out(2)" }));
      pop("#s-pages", t(29) - 0.05, { from: 0.4 });
      tl.fromTo("#s-switch", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, t(32) - 0.05);
      tl.fromTo("#s-switch", { scale: 1 }, { scale: 1.08, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, t(37));

      /* ---- 2. Nine months on scaffolding, no customer ---- */
      out(["#s-maya", "#s-switch"], t(39) - 0.3, 0.3);
      tl.to("#s-plan", { opacity: 0, scale: 0.92, duration: 0.35, ease: "power2.in" }, t(39) - 0.2);
      fade("#s-h1", t(39));
      tl.fromTo("#s-ground", { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.5, ease: "power3.out" }, t(39));
      tl.fromTo("#s-scaf", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t(39) + 0.1);
      tl.fromTo("#s-month", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(44) - 0.1);
      for (let m = 1; m <= 9; m++) {
        const at = t(44) + (m - 1) * 0.48;
        if (m > 1) tl.to("#s-m" + (m - 1), { opacity: 0, duration: 0.08 }, at);
        tl.fromTo("#s-m" + m, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, at);
      }
      KEYS.forEach((k, i) => tl.to("#s-p-" + k, { x: 0, y: 0, duration: 0.5, ease: "power3.inOut" }, t(39) + 0.1 + i * 0.15));
      pop("#s-nocust", t(48) - 0.05, { from: 0.4 });

      /* ---- 3. Switch-on day: everything meets reality at once ---- */
      out(["#s-month", "#s-nocust"], t(55) - 0.25, 0.25);
      stamp("#s-sday", t(55), -2);
      tl.to("#s-scaf", { opacity: 0, y: 260, duration: 0.5, ease: "power2.in" }, t(56) + 0.1);
      KEYS.forEach((k, i) => {
        const [x, y, r] = RUB[i];
        tl.to("#s-p-" + k, { x: x - BX, y: y - TOPS[i], rotation: r, duration: 0.55 + (6 - i) * 0.04, ease: "bounce.out" }, t(56) + 0.35 + (6 - i) * 0.07);
      });
      tl.fromTo("#s-f1", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(57));
      tl.fromTo("#s-f2", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(59));
      tl.fromTo("#s-f3", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(62));
      ${JSON.stringify(QS)}.forEach((_, i) => pop("#s-q" + i, t(67) + i * 0.3, { from: 0.2, ease: "back.out(2.4)", d: 0.35 }));
      pop("#s-which", t(75), { from: 0.4 });
      // the question marks shake: which guess broke what?
      tl.fromTo([${QS.map((_, i) => `"#s-q${i}"`).join(", ")}], { rotation: 0 }, { rotation: 14, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 5, stagger: 0.05 }, t(78));
      tl.fromTo(["#s-f1", "#s-f2", "#s-f3"], { x: 0 }, { x: 10, duration: 0.08, ease: "sine.inOut", yoyo: true, repeat: 3, stagger: 0.15 }, t(80));
      stamp("#s-back", t(85) + 0.1, -7);

      /* ---- 4. Second try: one cookie, and the kitchen sees it ---- */
      out(["#s-sday", "#s-f1", "#s-f2", "#s-f3", "#s-which"], t(87) - 0.2, 0.3);
      tl.to([${QS.map((_, i) => `"#s-q${i}"`).join(", ")}, ${PIECES.map((p) => `"#s-p-${p.k}"`).join(", ")}, "#s-back", "#s-h1"], { opacity: 0.25, duration: 0.4, ease: "power2.inOut" }, t(87));
      fade("#s-h2", t(87) + 0.1);
      tl.fromTo("#s-b0", { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out" }, t(93) - 0.1);
      pop("#s-b0w", t(89), { from: 0.4 });
      pop("#s-b0c", t(99), { from: 0.2, ease: "back.out(2.4)" });
      pop("#s-thatsall", t(101), { from: 0.5 });
      tl.fromTo("#s-g1", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out" }, t(104));
      tl.fromTo("#s-g2", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out" }, t(106));
      [["#s-g1", t(111)], ["#s-g2", t(113) + 0.1]].forEach(([g, at]) => {
        tl.to(g + " .bad", { opacity: 0, duration: 0.12 }, at);
        tl.fromTo(g + " .good", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, at + 0.06);
      });
      draw("#s-r1", t(116) - 0.05, 0.5);
      pop("#s-onlynew", t(118), { from: 0.4 });

      /* ---- 5. Then one piece at a time ---- */
      out(["#s-thatsall", "#s-g1", "#s-g2", "#s-r1", "#s-onlynew"], t(121) - 0.1, 0.3);
      [["b1", 127], ["b2", 128], ["b3", 130]].forEach(([k, w], i) => {
        const rot = ${JSON.stringify(TRY2.map((b) => b.rot))}[i + 1];
        tl.fromTo("#s-" + k, { opacity: 0, y: -300, rotation: 0 }, { opacity: 1, y: 0, rotation: rot, duration: 0.55, ease: "bounce.out" }, t(w) - 0.2);
        pop("#s-" + k + "w", t(w) + 0.2, { from: 0.4 });
        pop("#s-" + k + "c", t(w) + 0.45, { from: 0.2, ease: "back.out(2.4)" });
      });
      ["#s-b0c", "#s-b1c", "#s-b2c", "#s-b3c"].forEach((c, i) =>
        tl.fromTo(c, { scale: 1 }, { scale: 1.3, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1 }, t(133) + i * 0.22));

      /* ---- 6. Count the working pieces ---- */
      out([${QS.map((_, i) => `"#s-q${i}"`).join(", ")}, ${PIECES.map((p) => `"#s-p-${p.k}"`).join(", ")}, "#s-back", "#s-h1", "#s-scaf"], t(139) - 0.2, 0.3);
      tl.fromTo("#s-chart", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t(139));
      tl.fromTo("#s-axes", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(141));
      fade("#s-ticks", t(141) + 0.1);
      draw("#s-red", t(143), 1.6, "none");
      tl.fromTo("#s-lred", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(147));
      draw("#s-green", t(151) + 0.1, 1.8, "none");
      tl.fromTo("#s-lgreen", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(153));

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
