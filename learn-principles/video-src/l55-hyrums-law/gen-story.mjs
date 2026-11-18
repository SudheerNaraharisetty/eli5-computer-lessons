// Generates compositions/story.html for lesson 55, Hyrum's law.
// One iceberg: the written promise above the water, everything observable below it,
// with a string from each hidden behaviour to the partner program that relies on it.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 68.95;

const MONO = `font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0;`;

const personSvg = (shirt, hair) => `<svg class="s-pi" viewBox="0 0 100 110">
            <path d="M12 108 Q12 62 50 62 Q88 62 88 108 Z" fill="${shirt}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
            <circle cx="50" cy="34" r="22" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="5" />
            <path d="M28 32 Q30 10 50 10 Q70 10 72 32 Q60 22 44 22 Q34 24 28 32 Z" fill="${hair}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
          </svg>`;

// Partner programs (right column)
const PARTNERS = [
  { k: "d", name: "Delivery app", top: 110, shirt: "#c9c6ff", hair: "#2a2140", a: "In the oven", b: "Unknown status" },
  { k: "p", name: "Party planner", top: 425, shirt: "#f3cf95", hair: "#6b3b1f", a: "Collect #210 first", b: "Collect #212 first" },
  { k: "w", name: "Wedding planner", top: 740, shirt: "#a9dcc4", hair: "#3e3b52", a: "Bad order caught", b: "All orders placed" },
];
const partnerCard = (p) => `        <div id="s-p${p.k}" class="s-pc s-ol" style="top:${p.top}px">
          ${personSvg(p.shirt, p.hair)}
          <span class="s-pn">${p.name}</span>
          <div class="s-scr"><b class="s-sa">${p.a}</b><b class="s-sb">${p.b}</b></div>
          <div class="s-q">?</div>
          <div class="s-stamp">BROKEN</div>
        </div>`;

// Strings: hidden behaviour (left) -> partner (right)
const SA = [1022, 558], SB = [1022, 725], SC = [1022, 888];
const PY = PARTNERS.map((p) => p.top + 115);
const str = (a, y) => `M${a[0]} ${a[1]} C1150 ${a[1]} 1170 ${y} 1288 ${y}`;
const half1 = (a) => `M${a[0]} ${a[1]} C1066 ${a[1] + 8} 1088 ${a[1] + 50} 1092 ${a[1] + 92}`;
const half2 = (y) => `M1288 ${y} C1250 ${y + 10} 1236 ${y + 54} 1232 ${y + 94}`;

// Hand-drawn ring
const hand = (cx, cy, rx, ry) =>
  `M${cx - rx + 4} ${cy + 2} C${cx - rx - 2} ${cy - ry - 6} ${cx + rx} ${cy - ry - 8} ${cx + rx} ${cy} C${cx + rx} ${cy + ry + 4} ${cx - rx - 6} ${cy + ry + 6} ${cx - rx} ${cy - 8}`;

// 300 users on three rings around the API
const CX = 960, CY = 560;
const RINGS = [[440, 262], [600, 350], [760, 440]];
const dots = [];
RINGS.forEach(([rx, ry], k) => {
  for (let i = 0; i < 100; i++) {
    const a = (i / 100) * Math.PI * 2 + k * 0.031;
    dots.push([+(CX + rx * Math.cos(a)).toFixed(1), +(CY + ry * Math.sin(a)).toFixed(1)]);
  }
});
// put the "first user" (ring 2, angle 0) first
const first = dots.splice(100, 1)[0];
dots.unshift(first);
const DOTCOL = ["#3b37e6", "#b9741a", "#1f7a5c"];
const linesSvg = dots.map((d, i) => `<line class="${i ? "s-ml" : "s-ml0"}" x1="${CX}" y1="${CY}" x2="${d[0]}" y2="${d[1]}" />`).join("");
const dotsSvg = dots.map((d, i) => `<circle class="${i ? "s-md" : "s-md0"}" cx="${d[0]}" cy="${d[1]}" r="10" fill="${DOTCOL[i % 3]}" />`).join("");

const HYRUM = ["With", "enough", "users,", "every", "behaviour", "they", "can", "see", "is", "depended", "on", "by", "somebody."];
const HAC = new Set([3, 4, 12]);

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

const TICK = `<svg viewBox="0 0 56 56"><path d="M16 29 L25 38 L41 20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg>`;

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #s-all, #s-wrap, #s-scene { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono { ${MONO} }
    .s-full { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }

    /* opening */
    #s-maya { left: 40px; top: 430px; width: 330px; height: 429px; }
    #s-name { left: 330px; top: 640px; padding: 6px 26px; background: #3b37e6; color: #fff; border-radius: 999px; font-size: 40px; line-height: 1.3; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }

    /* the iceberg */
    #s-water { left: 96px; top: 470px; width: 1084px; height: 530px; background: #dce7f3; border-radius: 0 0 28px 28px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-ice { fill: #fff; stroke: #0e0c1d; stroke-width: 5; stroke-linejoin: round; }
    #s-wave { fill: none; stroke: #3b6fb0; stroke-width: 6; stroke-linecap: round; }
    #s-under-lab { left: 420px; top: 936px; font-size: 28px; line-height: 40px; color: #2c4f7c; letter-spacing: 0.06em; white-space: nowrap; }

    /* the API card (tip) */
    #s-api { left: 300px; top: 150px; width: 640px; height: 250px; background: #fff; border-radius: 24px; }
    #s-apibar { left: 0; top: 0; width: 640px; height: 64px; background: #15132b; border-radius: 24px 24px 0 0; display: flex; align-items: center; padding: 0 22px; gap: 9px; }
    #s-apibar > i { width: 14px; height: 14px; border-radius: 50%; background: #ff6b8b; }
    #s-apibar > i:nth-child(2) { background: #ffc24b; }
    #s-apibar > i:nth-child(3) { background: #4bd69b; }
    #s-apibar > span { margin-left: 12px; font: 700 32px/1 "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; color: #eceaff; white-space: nowrap; }
    #s-says { left: 30px; top: 86px; font-size: 32px; line-height: 44px; white-space: nowrap; }
    #s-vals { left: 30px; top: 158px; display: flex; gap: 18px; }
    #s-vals > span { height: 58px; line-height: 58px; padding: 0 20px; border-radius: 12px; background: #ddefe6; color: #0e0c1d; font: 700 32px/58px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-promise { left: 320px; top: 92px; height: 48px; line-height: 48px; padding: 0 22px; border-radius: 999px; background: #3b37e6; color: #fff; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-kept { left: 690px; top: 92px; height: 48px; line-height: 48px; padding: 0 22px 0 58px; border-radius: 999px; background: #1f7a5c; color: #fff; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-kept > svg { position: absolute; left: 6px; top: 0; width: 48px; height: 48px; }

    /* hidden behaviours */
    .s-chip { position: absolute; left: 600px; width: 420px; background: #fff; border-radius: 16px; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-ct { position: absolute; left: 24px; font: 700 32px/96px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: nowrap; }
    .s-tok { position: relative; display: inline-block; vertical-align: top; height: 96px; }
    .s-tok > b { position: absolute; left: 0; top: 0; white-space: nowrap; }
    #s-cA .s-tok { width: 154px; }
    #s-cC .s-tok { width: 308px; }
    .s-tok > b.s-new { opacity: 0; color: #1f7a5c; }
    .s-tok > b.s-old { color: #b9741a; }
    .s-lab { position: absolute; font-size: 30px; line-height: 40px; color: #2c4f7c; white-space: nowrap; text-align: right; width: 300px; left: 270px; }
    #s-cB .s-h { position: absolute; left: 24px; top: 10px; font-size: 28px; line-height: 36px; color: #3e3b52; }
    #s-cB .s-row { position: absolute; left: 24px; font: 700 28px/36px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: nowrap; }
    #s-cB .s-row i { font-style: normal; color: #6f6b80; }

    /* partners */
    .s-pc { position: absolute; left: 1290px; width: 540px; height: 230px; background: #fff; border-radius: 24px; opacity: 0; }
    .s-pi { position: absolute; left: 22px; top: 14px; width: 64px; height: 70px; }
    .s-pn { position: absolute; left: 100px; top: 22px; font-size: 36px; line-height: 50px; white-space: nowrap; }
    .s-scr { position: absolute; left: 24px; top: 96px; width: 492px; height: 108px; background: #15132b; border-radius: 16px; }
    .s-scr > b { position: absolute; left: 0; top: 0; width: 492px; text-align: center; font-size: 36px; line-height: 108px; white-space: nowrap; opacity: 0; }
    .s-scr > b.s-sa { color: #7cf0b5; }
    .s-scr > b.s-sb { color: #ff8fa8; }
    .s-q { position: absolute; right: 22px; top: 18px; width: 58px; height: 58px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 36px; line-height: 58px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-stamp { position: absolute; right: -18px; top: -26px; padding: 2px 18px; background: #b8235a; color: #fff; font-size: 32px; letter-spacing: 0.08em; line-height: 48px; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }

    /* strings and marks */
    .s-str { fill: none; stroke: #0e0c1d; stroke-width: 5; stroke-linecap: round; opacity: 0; }
    .s-cut { fill: none; stroke: #b8235a; stroke-width: 5; stroke-linecap: round; stroke-dasharray: 10 10; opacity: 0; }
    .s-ring { fill: none; stroke: #b8235a; stroke-width: 6; stroke-linecap: round; opacity: 0; }

    /* Sam's cursor */
    #s-sam { left: 0; top: 0; width: 200px; height: 80px; }
    #s-sam > svg { position: absolute; left: 0; top: 0; width: 48px; height: 48px; }
    #s-sam > span { position: absolute; left: 40px; top: 40px; height: 44px; line-height: 44px; padding: 0 18px; border-radius: 999px; background: #b9741a; color: #fff; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }

    /* Hyrum card */
    #s-hy { left: 260px; top: 230px; width: 1400px; height: 600px; background: #fff; border-radius: 30px; }
    #s-hyk { left: 60px; top: 50px; height: 64px; line-height: 64px; padding: 0 30px; border-radius: 999px; background: #3b37e6; color: #fff; font-size: 40px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    #s-hyt { left: 60px; top: 160px; width: 1280px; font: 700 70px/1.22 "Fraunces", serif; letter-spacing: -0.02em; }
    #s-hyt > span { display: inline-block; opacity: 0; }
    #s-hyt > span.ac { color: #3b37e6; }
    #s-hyw { left: 60px; top: 500px; font-size: 30px; line-height: 40px; color: #3e3b52; white-space: nowrap; }

    /* many users */
    #s-many { left: 0; top: 0; width: 1920px; height: 1080px; }
    .s-ml, .s-ml0 { stroke: #3e3b52; stroke-width: 2.5; opacity: 0; }
    .s-md, .s-md0 { stroke: #0e0c1d; stroke-width: 3; opacity: 0; }
    #s-mapi { left: 820px; top: 500px; width: 280px; height: 120px; background: #15132b; border-radius: 20px; color: #eceaff; font: 700 34px/120px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; text-align: center; white-space: nowrap; }
    #s-mcount { left: 790px; top: 650px; width: 340px; height: 64px; background: #fff; border-radius: 999px; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    #s-mcount > b { position: absolute; left: 0; top: 0; width: 340px; text-align: center; font-size: 36px; line-height: 64px; white-space: nowrap; }

    /* change on purpose */
    #s-fix { left: 0; top: 0; width: 1920px; height: 1080px; }
    #s-fh { left: 0; top: 70px; width: 1920px; text-align: center; font: 700 76px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-st { position: absolute; top: 210px; width: 480px; height: 210px; background: #fff; border-radius: 24px; opacity: 0; }
    .s-st > i { position: absolute; left: 24px; top: 24px; width: 56px; height: 56px; border-radius: 50%; background: #3b37e6; color: #fff; font-style: normal; font-size: 32px; line-height: 56px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-st > b { position: absolute; left: 100px; top: 24px; font-size: 38px; line-height: 56px; white-space: nowrap; }
    .s-st > span { position: absolute; left: 24px; top: 108px; width: 432px; font-size: 30px; line-height: 40px; color: #3e3b52; }
    .s-arr { position: absolute; top: 300px; width: 70px; height: 30px; opacity: 0; }
    #s-fapi { left: 200px; top: 640px; width: 520px; height: 110px; background: #fff; border-radius: 18px; opacity: 0; }
    #s-fapi .s-ct { line-height: 110px; }
    #s-fapi .s-tok { width: 154px; height: 110px; }
    #s-fdel { left: 1180px; top: 560px; width: 560px; height: 330px; background: #fff; border-radius: 24px; opacity: 0; }
    #s-fdel .s-scr { top: 96px; width: 512px; }
    #s-fdel .s-scr > b { width: 512px; }
    #s-fcode { left: 24px; top: 236px; height: 64px; line-height: 64px; padding: 0 18px; border-radius: 12px; background: #ddefe6; font: 700 30px/64px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-fok { left: 500px; top: -24px; width: 60px; height: 60px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-fok > svg { position: absolute; left: 2px; top: 2px; width: 56px; height: 56px; }
    #s-env { left: 0; top: 0; width: 84px; height: 60px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
      <div id="s-scene">
        <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
        </svg>
        <div id="s-name" class="s-abs s-hide">Maya</div>

        <!-- iceberg -->
        <svg id="s-tip" class="s-abs s-full s-hide" viewBox="0 0 1920 1080">
          <path class="s-ice" d="M230 470 L255 300 L285 170 L380 118 L640 100 L880 124 L975 238 L1000 470 Z" />
        </svg>
        <div id="s-under" class="s-abs s-hide" style="left:0;top:0;width:1920px;height:1080px">
          <div id="s-water" class="s-abs"></div>
          <svg class="s-abs s-full" viewBox="0 0 1920 1080">
            <path class="s-ice" d="M230 470 L150 600 L122 760 L170 930 L360 984 L800 984 L1080 930 L1140 760 L1100 580 L1000 470 Z" />
            <path id="s-wave" d="M100 470 Q140 452 180 470 T260 470 T340 470 T420 470 T500 470 T580 470 T660 470 T740 470 T820 470 T900 470 T980 470 T1060 470 T1140 470 T1176 470" />
          </svg>
          <div id="s-under-lab" class="s-abs s-hide">EVERYTHING PEOPLE CAN SEE</div>
        </div>

        <div id="s-api" class="s-abs s-ol s-hide">
          <div id="s-apibar" class="s-abs"><i></i><i></i><i></i><span>orders API</span></div>
          <div id="s-says" class="s-abs s-hide">status(order) answers one of:</div>
          <div id="s-vals" class="s-abs"><span>received</span><span>baking</span><span>ready</span></div>
        </div>
        <div id="s-promise" class="s-abs s-hide">the written promise</div>
        <div id="s-kept" class="s-abs s-hide">${TICK}promise kept</div>

        <div id="s-lA" class="s-lab s-hide" style="top:538px">capital letters</div>
        <div id="s-lB" class="s-lab s-hide" style="top:705px">in time order</div>
        <div id="s-lC" class="s-lab s-hide" style="top:868px">a typo</div>
        <div id="s-cA" class="s-chip s-hide" style="top:510px;height:96px"><div class="s-ct">status → <span class="s-tok"><b class="s-old">"BAKING"</b><b class="s-new">"baking"</b></span></div></div>
        <div id="s-cB" class="s-chip s-hide" style="top:640px;height:172px">
          <div class="s-h">today's orders</div>
          <div class="s-row" id="s-r0" style="top:52px"><i>10:02</i> #210</div>
          <div class="s-row" id="s-r1" style="top:88px"><i>10:15</i> #211</div>
          <div class="s-row" id="s-r2" style="top:124px"><i>10:31</i> #212</div>
        </div>
        <div id="s-cC" class="s-chip s-hide" style="top:840px;height:96px"><div class="s-ct"><span class="s-tok"><b class="s-old">"Unknwon cookie"</b><b class="s-new">"Unknown cookie"</b></span></div></div>

${PARTNERS.map(partnerCard).join("\n")}

        <svg id="s-strings" class="s-abs s-full" viewBox="0 0 1920 1080">
          <path id="s-sA" class="s-str" d="${str(SA, PY[0])}" />
          <path id="s-sB" class="s-str" d="${str(SB, PY[1])}" />
          <path id="s-sC" class="s-str" d="${str(SC, PY[2])}" />
          <path id="s-xA1" class="s-cut" d="${half1(SA)}" /><path id="s-xA2" class="s-cut" d="${half2(PY[0])}" />
          <path id="s-xB1" class="s-cut" d="${half1(SB)}" /><path id="s-xB2" class="s-cut" d="${half2(PY[1])}" />
          <path id="s-xC1" class="s-cut" d="${half1(SC)}" /><path id="s-xC2" class="s-cut" d="${half2(PY[2])}" />
          <path id="s-gA" class="s-ring" d="${hand(874, 558, 104, 40)}" />
          <path id="s-gB" class="s-ring" d="${hand(810, 762, 220, 66)}" />
          <path id="s-gC" class="s-ring" d="${hand(712, 888, 88, 38)}" />
        </svg>
        <div id="s-sam" class="s-abs s-hide"><svg viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg><span>Sam</span></div>
      </div>

      <!-- Hyrum's law -->
      <div id="s-hy" class="s-abs s-ol s-hide">
        <div id="s-hyk" class="s-abs">Hyrum's law</div>
        <div id="s-hyt" class="s-abs">${HYRUM.map((w, i) => `<span${HAC.has(i) ? ' class="ac"' : ""}>${w}</span>`).join(" ")}</div>
        <div id="s-hyw" class="s-abs">Named after Hyrum Wright, an engineer at Google. A rule of thumb.</div>
      </div>

      <!-- many users -->
      <div id="s-many" class="s-abs s-hide">
        <svg class="s-abs s-full" viewBox="0 0 1920 1080">
          <g>${linesSvg}</g>
          <g>${dotsSvg}</g>
        </svg>
        <div id="s-mapi" class="s-abs s-ol">orders API</div>
        <div id="s-mcount" class="s-abs"><b id="s-m1">1 user</b><b id="s-m300" class="s-hide">300 users</b></div>
      </div>

      <!-- change on purpose -->
      <div id="s-fix" class="s-abs s-hide">
        <div id="s-fh" class="s-abs">Change on purpose</div>
        <div id="s-st1" class="s-st s-ol" style="left:150px"><i>1</i><b>Announce</b><span>Tell every user what changes, and the date.</span></div>
        <div id="s-st2" class="s-st s-ol" style="left:720px"><i>2</i><b>Old way still works</b><span>Give users time to update.</span></div>
        <div id="s-st3" class="s-st s-ol" style="left:1290px"><i>3</i><b>Switch</b><span>On the day you said.</span></div>
        <svg id="s-ar1" class="s-arr" style="left:640px" viewBox="0 0 70 30"><path d="M4 15 H52 M44 5 L62 15 L44 25" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <svg id="s-ar2" class="s-arr" style="left:1210px" viewBox="0 0 70 30"><path d="M4 15 H52 M44 5 L62 15 L44 25" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <svg id="s-fline" class="s-abs s-full" viewBox="0 0 1920 1080"><path id="s-fs" class="s-str" d="M724 695 C900 695 1000 700 1178 700" /></svg>
        <div id="s-fapi" class="s-abs s-ol"><div class="s-ct">status → <span class="s-tok"><b class="s-old">"BAKING"</b><b class="s-new">"baking"</b></span></div></div>
        <div id="s-fdel" class="s-abs s-ol">
          ${personSvg("#c9c6ff", "#2a2140")}
          <span class="s-pn">Delivery app</span>
          <div class="s-scr"><b class="s-sa" style="opacity:1">In the oven</b></div>
          <div id="s-fcode" class="s-abs">.lower() == "baking"</div>
          <div id="s-fok" class="s-abs">${TICK}</div>
        </div>
        <svg id="s-env" class="s-abs s-hide" viewBox="0 0 84 60"><rect x="4" y="4" width="76" height="52" rx="6" fill="#fff" stroke="#0e0c1d" stroke-width="5" /><path d="M6 8 L42 34 L78 8" fill="none" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /></svg>
      </div>
      </div>
    </div>
  </div>

  <script>
    (function () {
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });
      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", stagger: o.st || 0 }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const swap = (a, b, at) => {
        tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.08);
      };
      const draw = (sel, at, d) => {
        document.querySelectorAll(sel).forEach((p) => {
          const L = p.getTotalLength();
          tl.set(p, { strokeDasharray: L + " " + L, strokeDashoffset: L, opacity: 0 }, 0);
          tl.fromTo(p, { strokeDashoffset: L, opacity: 1 }, { strokeDashoffset: 0, opacity: 1, duration: d || 0.5, ease: "power2.out" }, at);
        });
      };
      // a string snaps: the taut line goes, two slack red halves drop
      const snap = (k, at) => {
        tl.to("#s-s" + k, { opacity: 0, duration: 0.08 }, at);
        tl.fromTo(["#s-x" + k + "1", "#s-x" + k + "2"], { opacity: 0, scaleY: 0.2, transformOrigin: "0% 0%" }, { opacity: 1, scaleY: 1, duration: 0.45, ease: "bounce.out" }, at);
      };

      /* 1. Maya's company offers an orders API; three partners use it */
      tl.fromTo("#s-maya", { y: 30 }, { y: 0, duration: 0.6, ease: "expo.out" }, 0);
      pop("#s-name", 0.6, { from: 0.4 });
      tl.fromTo("#s-api", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.4)" }, t(5) - 0.1);
      ["#s-pd", "#s-pp", "#s-pw"].forEach((c, i) => tl.fromTo(c, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(7 + i) - 0.05));
      pop(".s-q", t(14), { from: 0.3, st: 0.15, ease: "back.out(2.4)" });

      /* 2. The written promise */
      tl.to(["#s-maya", "#s-name"], { opacity: 0, x: -80, duration: 0.4, ease: "power3.in" }, t(18) - 0.5);
      pop("#s-promise", t(19), { from: 0.4 });
      tl.fromTo("#s-says", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(23));
      pop("#s-vals > span:nth-child(1)", t(25), { from: 0.5 });
      pop("#s-vals > span:nth-child(2)", t(26), { from: 0.5 });
      pop("#s-vals > span:nth-child(3)", t(28), { from: 0.5 });
      out(".s-q", t(29), 0.3);
      tl.fromTo("#s-tip", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(33) - 0.1);

      /* 3. Under the water */
      tl.fromTo("#s-under", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, t(37) - 0.1);
      tl.fromTo("#s-under-lab", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(41));
      tl.fromTo("#s-wave", { y: 0 }, { y: 8, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 3 }, t(43));
      pop("#s-cA", t(50), { from: 0.6 });
      pop("#s-lA", t(50) + 0.15, { from: 0.8 });
      pop("#s-cB", t(57) - 0.1, { from: 0.6 });
      pop("#s-lB", t(57) + 0.1, { from: 0.8 });
      pop("#s-cC", t(65) - 0.15, { from: 0.6 });
      pop("#s-lC", t(65) + 0.1, { from: 0.8 });

      /* 4. Nobody promised it, but people tie strings to it */
      tl.to("#s-promise", { scale: 1.12, yoyo: true, repeat: 1, duration: 0.2, ease: "power1.inOut" }, t(67));
      draw("#s-gA", t(77) - 0.1, 0.45);
      draw("#s-sA", t(74), 0.6);
      tl.fromTo("#s-pd .s-sa", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(74) + 0.5);
      out("#s-gA", t(80) - 0.3);
      draw("#s-gB", t(85) - 0.1, 0.45);
      draw("#s-sB", t(82), 0.6);
      tl.fromTo("#s-pp .s-sa", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(82) + 0.5);
      out("#s-gB", t(87) - 0.2);
      draw("#s-gC", t(94) - 0.1, 0.45);
      draw("#s-sC", t(90), 0.6);
      tl.fromTo("#s-pw .s-sa", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(90) + 0.5);
      out("#s-gC", t(95));

      /* 5. Sam tidies up */
      tl.fromTo("#s-sam", { opacity: 0, x: 1100, y: 1000 }, { opacity: 1, x: 760, y: 470, duration: 0.8, ease: "power3.out" }, t(97) - 0.1);
      tl.to("#s-sam", { x: 900, y: 556, duration: 0.5, ease: "power2.inOut" }, t(100) - 0.55);
      swap("#s-cA .s-old", "#s-cA .s-new", t(100) + 0.05);
      snap("A", t(101) + 0.1);
      tl.to("#s-sam", { x: 940, y: 740, duration: 0.45, ease: "power2.inOut" }, t(106) - 0.5);
      tl.to("#s-r0", { y: 36, duration: 0.4, ease: "power2.inOut" }, t(106));
      tl.to("#s-r1", { y: 36, duration: 0.4, ease: "power2.inOut" }, t(106));
      tl.to("#s-r2", { y: -72, duration: 0.4, ease: "power2.inOut" }, t(106));
      snap("B", t(107));
      tl.to("#s-sam", { x: 880, y: 890, duration: 0.4, ease: "power2.inOut" }, t(109) - 0.45);
      swap("#s-cC .s-old", "#s-cC .s-new", t(109) + 0.05);
      snap("C", t(110) + 0.1);
      tl.to("#s-sam", { opacity: 0, x: 1080, y: 1040, duration: 0.5, ease: "power2.in" }, t(111));
      pop("#s-kept", t(113), { from: 0.4, ease: "back.out(2.2)" });

      /* 6. All three programs break */
      ["#s-pd", "#s-pp", "#s-pw"].forEach((c, i) => {
        const at = t(117) + i * 0.45;
        swap(c + " .s-sa", c + " .s-sb", at);
        tl.to(c, { rotation: i === 1 ? -4 : 4, y: 14, duration: 0.35, ease: "back.out(2)" }, at + 0.1);
        tl.fromTo(c + " .s-stamp", { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, at + 0.2);
      });

      /* 7. Hyrum's law */
      tl.to("#s-scene", { opacity: 0.1, duration: 0.4, ease: "power2.inOut" }, t(121) - 0.2);
      tl.fromTo("#s-hy", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(121));
      const hw = gsap.utils.toArray("#s-hyt > span");
      hw.forEach((s, i) => tl.fromTo(s, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, t(125 + i) - 0.05));

      /* 8. 1 user ... 300 users */
      out(["#s-hy", "#s-scene"], t(138) - 0.45, 0.3);
      tl.fromTo("#s-many", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(138) - 0.2);
      tl.fromTo(".s-md0", { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, t(139));
      tl.fromTo(".s-ml0", { opacity: 0 }, { opacity: 0.6, duration: 0.3 }, t(141) - 0.1);
      swap("#s-m1", "#s-m300", t(142));
      tl.fromTo(".s-md", { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", stagger: 0.0045 }, t(142) + 0.1);
      tl.fromTo(".s-ml", { opacity: 0 }, { opacity: 0.45, duration: 0.2, stagger: 0.004 }, t(145) - 0.1);

      /* 9. Change on purpose */
      out("#s-many", t(147) - 0.3, 0.3);
      tl.fromTo("#s-fix", { opacity: 0 }, { opacity: 1, duration: 0.01 }, t(147));
      tl.fromTo("#s-fh", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t(148) - 0.1);
      tl.fromTo(["#s-fapi", "#s-fdel"], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", stagger: 0.12 }, t(148) + 0.2);
      draw("#s-fs", t(149), 0.5);
      pop("#s-st1", t(151) - 0.05, { from: 0.7 });
      tl.fromTo("#s-env", { opacity: 0, x: 640, y: 600, rotation: -8 }, { opacity: 1, x: 1080, y: 560, rotation: 6, duration: 0.7, ease: "power2.inOut" }, t(151) + 0.2);
      tl.to("#s-env", { opacity: 0, duration: 0.2 }, t(151) + 0.95);
      tl.fromTo("#s-ar1", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, t(153) - 0.2);
      pop("#s-st2", t(153), { from: 0.7 });
      pop("#s-fcode", t(157), { from: 0.5 });
      tl.fromTo("#s-ar2", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, t(161) - 0.3);
      pop("#s-st3", t(161), { from: 0.7 });
      swap("#s-fapi .s-old", "#s-fapi .s-new", t(162) + 0.1);
      pop("#s-fok", t(162) + 0.45, { from: 0.2, ease: "back.out(2.4)" });

      /* hand off */
      tl.to("#s-wrap", { opacity: 0, duration: 0.3, ease: "power2.in" }, ${END} - 0.35);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;

fs.writeFileSync(path.join(here, "compositions/story.html"), html);
console.log("wrote story.html", html.length, "bytes; story ends", END, "last word", (W[W.length - 1] + 0.6).toFixed(2));
