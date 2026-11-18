// Generates compositions/story.html for lesson 46 (the wall of 36 dials is too repetitive to hand-write).
// Run: node gen-story.mjs
import { writeFileSync } from "node:fs";

const W = [0.0, 0.43, 0.708, 0.906, 1.254, 1.649, 2.543, 2.821, 2.984, 3.239, 3.332, 3.971, 4.145, 4.783, 5.016, 5.108, 6.072, 6.362, 6.525, 6.966, 7.314, 7.767, 8.092, 8.533, 9.207, 9.613, 10.31, 10.623, 11.064, 11.622, 12.353, 13.537, 13.944, 15.023, 15.464, 15.894, 16.173, 16.393, 16.846, 16.963, 17.45, 18.356, 18.785, 19.354, 19.691, 20.086, 21.142, 21.456, 21.792, 22.141, 22.605, 23.418, 23.731, 23.929, 24.846, 25.02, 25.31, 25.554, 26.123, 26.796, 27.191, 27.435, 27.853, 28.004, 29.072, 29.443, 29.617, 29.838, 30.198, 30.5, 30.616, 31.104, 32.09, 32.276, 32.613, 32.891, 33.193, 33.518, 34.076, 34.575, 35.539, 35.69, 36.166, 36.746, 37.304, 37.524, 37.965, 38.256, 38.569, 38.755, 38.964, 39.788, 40.659, 41.1, 42.331, 42.482, 42.888, 43.19, 43.527, 43.794, 43.921, 44.235, 44.56, 45.535, 45.86, 46.313, 47.462, 47.822, 48.171, 48.693, 49.123, 49.494, 49.645, 50.469, 50.62, 51.154, 51.294, 51.816, 52.037, 52.164, 52.617, 52.942, 53.233, 54.138, 54.661, 54.846, 55.009, 55.462, 56.123, 56.483, 56.623, 57.343, 57.691, 57.9, 58.155, 58.376, 58.55, 59.409, 59.676, 59.85, 60.593, 60.953];
const DUR = 54.45;

const colX = (i) => 330 + i * 112;
const rowY = (j) => 300 + j * 112;
const isExc = (j, i) => (j === 0 && i === 10) || (j === 2 && i === 11);

/* ---- product icons ---- */
const tans = ["#d9a05b", "#e2ad6b", "#c98f4e", "#f0d9a8", "#ecd2a0", "#7a4a2a", "#f3d95e", "#f5a8c0", "#f2c9a5", "#b97a45"];
const cookie = (fill, dots) =>
  `<circle cx="32" cy="32" r="26" fill="${fill}" stroke="#0e0c1d" stroke-width="5" />` +
  (dots ? `<g fill="#5a3418"><circle cx="24" cy="26" r="4" /><circle cx="40" cy="30" r="4" /><circle cx="30" cy="42" r="4" /></g>` : "");
const cake = `<g stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round"><rect x="6" y="38" width="52" height="22" fill="#fff" /><rect x="15" y="20" width="34" height="18" fill="#fbe0ea" /><rect x="24" y="6" width="16" height="14" fill="#fff" /></g>`;
const gift = `<g stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round"><rect x="8" y="22" width="48" height="36" fill="#e6e3ff" /><path d="M32 22 V58 M8 36 H56" fill="none" /><path d="M32 22 C20 4 12 16 32 22 C52 16 44 4 32 22 Z" fill="#3b37e6" /></g>`;
const iconSvg = (i) => (i === 10 ? cake : i === 11 ? gift : cookie(tans[i], i % 2 === 0));
const icons = Array.from({ length: 12 }, (_, i) =>
  `<svg class="s-abs s-ico s-hide" id="s-i${i}" style="left:${colX(i) + 10}px;top:214px" viewBox="0 0 64 64">${iconSvg(i)}</svg>`).join("\n          ");

/* ---- dials ---- */
const dial = (id, cls, x, y, ptr, fill, pcol) =>
  `<svg class="s-abs s-dial ${cls} s-hide" id="${id}" style="left:${x}px;top:${y}px" viewBox="0 0 84 90"><circle cx="42" cy="46" r="36" fill="#0e0c1d" /><circle class="face" cx="42" cy="40" r="36" fill="${fill}" stroke="#0e0c1d" stroke-width="5" /><path d="M42 40 L${ptr}" stroke="${pcol}" stroke-width="7" stroke-linecap="round" /><circle cx="42" cy="40" r="6" fill="${pcol}" /></svg>`;
let dials = "";
for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) {
  const e = isExc(j, i);
  dials += "          " + dial(`s-d${j}-${i}`, e ? "s-exc" : `s-ord s-r${j}`, colX(i), rowY(j), e ? "66 40" : "42 16", "#fff", "#0e0c1d") + "\n";
}
const slots = [0, 1, 2].map((j) =>
  `<svg class="s-abs s-slot s-hide" id="s-slot${j}" style="left:${colX(12)}px;top:${rowY(j)}px" viewBox="0 0 84 90"><circle cx="42" cy="40" r="36" fill="#fbf8f4" stroke="#6f6b80" stroke-width="5" stroke-dasharray="10 9" /></svg>`).join("\n          ");
const gd = dial("s-g0", "s-new", colX(12), rowY(0), "42 16", "#ddefe6", "#1f7a5c") + "\n          " + dial("s-g1", "s-new", colX(12), rowY(1), "20 26", "#b8235a", "#fff");

const ring = (id, cx, cy, rx, ry, col) =>
  `<path id="${id}" class="s-ring" style="stroke:${col}" d="M${cx - rx + 4} ${cy + 4} C${cx - rx} ${cy - ry * 1.25} ${cx + rx} ${cy - ry * 1.3} ${cx + rx} ${cy} C${cx + rx} ${cy + ry * 1.3} ${cx - rx - 6} ${cy + ry * 1.25} ${cx - rx - 2} ${cy - 8}" />`;

const maya = `<svg id="s-maya" class="s-abs" viewBox="0 0 400 520" data-layout-allow-overflow>
            <circle cx="200" cy="44" r="42" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
            <circle cx="200" cy="150" r="104" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
            <g id="s-arm">
              <path d="M296 340 L366 232" stroke="#0e0c1d" stroke-width="50" stroke-linecap="round" />
              <path d="M296 340 L366 232" stroke="#f2c9a5" stroke-width="38" stroke-linecap="round" />
            </g>
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
            <path d="M172 202 Q200 228 228 202" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
          </svg>`;
const tick = `<svg viewBox="0 0 56 56"><path d="M16 29 L25 38 L41 20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg>`;

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #root * { box-sizing: border-box; }
    #s-all, #s-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono, #s-strip, #s-exc code, .s-rc code, .s-out code, #s-gtag, #s-tintag, #s-addr { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }

    #s-maya { left: 80px; top: 706px; width: 296px; height: 385px; }
    #s-name { left: 262px; top: 690px; padding: 2px 22px; background: #3b37e6; color: #fff; border-radius: 999px; font-size: 34px; line-height: 1.35; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }

    /* counter */
    #s-count { left: 96px; top: 56px; height: 104px; padding: 0 30px; background: #fff; border-radius: 22px; display: flex; align-items: center; gap: 22px; }
    #s-count > span { font-size: 34px; white-space: nowrap; }
    .s-num { position: relative; width: 96px; height: 84px; font: 700 72px/84px "Fraunces", serif; }
    .s-num b { position: absolute; right: 0; top: 0; opacity: 0; white-space: nowrap; }
    .s-num b.n2 { color: #1f7a5c; }

    /* the wall */
    #s-wall { left: 96px; top: 190px; width: 1728px; height: 450px; background: #fbf8f4; border-radius: 28px; }
    .s-row { left: 136px; height: 80px; font-size: 36px; line-height: 80px; }
    .s-ico { width: 64px; height: 64px; }
    .s-dial, .s-slot { width: 84px; height: 90px; }
    #s-gico { left: ${colX(12) + 10}px; top: 214px; width: 64px; height: 64px; }
    #s-gtag { left: 1560px; top: 112px; width: 264px; height: 56px; text-align: center; background: #3b37e6; color: #fff; border-radius: 999px; font-weight: 700; font-size: 30px; line-height: 56px; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    .s-badge { position: absolute; width: 50px; height: 50px; border-radius: 50%; background: #ffc24b; color: #0e0c1d; font-size: 30px; line-height: 50px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-missed { left: 1650px; top: 654px; padding: 0 20px; height: 52px; line-height: 52px; border-radius: 999px; background: #fbe0ea; color: #b8235a; font-size: 30px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }

    /* code strip */
    #s-strip { left: 400px; top: 716px; width: 1000px; height: 280px; background: #15132b; border-radius: 24px; color: #eceaff; }
    #s-sbar { left: 0; top: 0; width: 1000px; height: 60px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 26px; gap: 10px; }
    #s-sbar > i { width: 16px; height: 16px; border-radius: 50%; background: #ff6b8b; }
    #s-sbar > i:nth-child(2) { background: #ffc24b; }
    #s-sbar > i:nth-child(3) { background: #4bd69b; }
    #s-sbar > span { margin-left: 14px; font: 700 28px "JetBrains Mono", monospace; color: #a9a5d6; }
    .s-pg { position: absolute; left: 36px; top: 84px; width: 940px; font: 500 30px/54px "JetBrains Mono", monospace; }
    .s-ln { position: relative; height: 54px; display: flex; white-space: pre; }
    .s-ln > i { width: 48px; flex: none; font-style: normal; color: #8480b8; }
    .s-ln .nm { color: #eceaff; }
    #s-pgB .s-ln > span { color: #ffc24b; }
    #s-pgC .s-ln > i { color: #7cf0b5; }
    .s-pill { position: absolute; top: 4px; height: 46px; padding: 0 18px; border-radius: 999px; font: 800 28px/46px "Manrope", sans-serif; white-space: nowrap; }
    #s-okp { left: 700px; background: #1f7a5c; color: #fff; }
    #s-typo { left: 800px; background: #fbe0ea; color: #b8235a; }
    #s-forgot { left: 48px; background: #fbe0ea; color: #b8235a; }
    #s-gap { position: absolute; left: 260px; top: 8px; width: 420px; height: 38px; border-radius: 10px; box-shadow: inset 0 0 0 3px #8480b8; opacity: 0; }

    /* the web page */
    #s-page { left: 1440px; top: 716px; width: 384px; height: 280px; background: #fff; border-radius: 24px; }
    #s-addr { position: absolute; left: 0; top: 0; width: 384px; height: 60px; background: #ece7df; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; font-weight: 700; font-size: 28px; line-height: 60px; text-align: center; }
    #s-ptitle { left: 0; top: 74px; width: 384px; text-align: center; font: 700 38px/1.2 "Fraunces", serif; }
    #s-pimg { left: 92px; top: 132px; width: 200px; height: 124px; border-radius: 14px; background: #ece7df; }
    #s-pbad { left: 92px; top: 132px; width: 200px; height: 124px; }
    #s-broken { left: 196px; top: 214px; padding: 2px 16px; background: #b8235a; color: #fff; font-size: 30px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; }

    /* the house rule */
    #s-sign { left: 400px; top: 716px; width: 1424px; height: 280px; background: #fbebd2; border-radius: 24px; }
    #s-stag { left: 36px; top: 26px; padding: 0 22px; height: 50px; background: #0e0c1d; color: #fff; border-radius: 999px; font-size: 28px; line-height: 50px; letter-spacing: 0.08em; }
    #s-once { left: 262px; top: 26px; padding: 0 22px; height: 50px; background: #ddefe6; color: #1f7a5c; border-radius: 999px; font-size: 28px; line-height: 50px; white-space: nowrap; }
    #s-shead { left: 36px; top: 92px; font: 700 48px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-shead em, .s-rc code em { font-style: normal; color: #3b37e6; display: inline-block; }
    #s-rcs { left: 36px; top: 168px; display: flex; gap: 22px; }
    .s-rc { height: 86px; padding: 0 24px; background: #fff; border-radius: 18px; display: flex; align-items: center; gap: 18px; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; white-space: nowrap; }
    .s-rc small { font-size: 28px; color: #3e3b52; }
    .s-rc code { font-weight: 700; font-size: 34px; }

    /* the exceptions */
    #s-exc { left: 1100px; top: 190px; width: 724px; height: 450px; background: #fff; border-radius: 28px; }
    #s-etitle { left: 36px; top: 26px; font: 700 34px/52px "JetBrains Mono", monospace; }
    #s-etag { left: 300px; top: 26px; padding: 0 22px; height: 52px; background: #ffc24b; border-radius: 999px; font-size: 28px; line-height: 52px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-exc code { position: absolute; left: 142px; font-weight: 700; font-size: 28px; line-height: 44px; white-space: pre; }
    #s-gone { left: 150px; top: 300px; font: 700 120px/1.1 "Fraunces", serif; letter-spacing: -0.03em; color: #1f7a5c; white-space: nowrap; }
    #s-gone small { display: block; font: 800 36px/1.4 "Manrope", sans-serif; letter-spacing: 0; color: #3e3b52; }
    #s-plain { left: 36px; top: 366px; padding: 0 22px; height: 52px; background: #ddefe6; color: #1f7a5c; border-radius: 999px; font-size: 28px; line-height: 52px; white-space: nowrap; }

    /* ginger snaps, by name alone */
    #s-tin { left: 120px; top: 262px; width: 330px; height: 300px; background: #fff; border-radius: 26px; }
    #s-tinico { left: 105px; top: 34px; width: 120px; height: 120px; }
    #s-tinlbl { left: 0; top: 162px; width: 330px; text-align: center; font-size: 28px; color: #3e3b52; line-height: 1.3; }
    #s-tintag { left: 33px; top: 212px; width: 264px; height: 56px; text-align: center; background: #3b37e6; color: #fff; border-radius: 999px; font-weight: 700; font-size: 30px; line-height: 56px; }
    .s-out { position: absolute; left: 590px; width: 450px; height: 120px; background: #fbf8f4; border-radius: 20px; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-out small { position: absolute; left: 24px; top: 12px; font-size: 28px; line-height: 1.3; color: #3e3b52; }
    .s-out code { position: absolute; left: 24px; top: 60px; font-weight: 700; font-size: 28px; line-height: 44px; white-space: pre; }
    .s-out code em { font-style: normal; color: #3b37e6; }
    .s-ok { position: absolute; right: -22px; top: -22px; width: 56px; height: 56px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-ok > svg { position: absolute; left: 0; top: 0; width: 56px; height: 56px; }

    /* marks */
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks > path, #s-marks > polygon { opacity: 0; }
    .s-ring { fill: none; stroke: #ff6b8b; stroke-width: 6; stroke-linecap: round; }
    #s-cur { left: 0; top: 0; width: 48px; height: 48px; }
    #s-cur > svg { position: absolute; left: 0; top: 0; width: 48px; height: 48px; }
    #s-sam { left: -104px; top: 40px; padding: 0 16px; height: 44px; background: #fff; border-radius: 999px; font-size: 28px; line-height: 44px; box-shadow: 0 0 0 4px #0e0c1d; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1">
      <div id="s-wrap">
        ${maya}
        <div id="s-name" class="s-abs s-hide">Maya</div>

        <div id="s-count" class="s-abs s-ol s-hide">
          <span>lines of settings</span>
          <div class="s-num"><b class="n0">0</b><b class="n12">12</b><b class="n24">24</b><b class="n36">36</b><b class="n2">2</b></div>
        </div>

        <!-- after: the exceptions card sits under the dials that fly into it -->
        <div id="s-exc" class="s-abs s-ol s-hide">
          <div id="s-etitle" class="s-abs">settings.py</div>
          <div id="s-etag" class="s-abs s-hide">only the exceptions</div>
          <code id="s-e1" class="s-hide" style="top:130px">"wedding_cake": "/weddings"</code>
          <code id="s-e2" class="s-hide" style="top:270px">"gift_box": "labels/gift.txt"</code>
          <div id="s-plain" class="s-abs s-hide">in plain sight</div>
        </div>

        <!-- before: the wall -->
        <div id="s-wallwrap" class="s-abs" style="left:0;top:0;width:1920px;height:1080px">
          <div id="s-wall" class="s-abs s-ol"></div>
          <div class="s-abs s-row s-hide" id="s-row0" style="top:${rowY(0)}px">page</div>
          <div class="s-abs s-row s-hide" id="s-row1" style="top:${rowY(1)}px">photo</div>
          <div class="s-abs s-row s-hide" id="s-row2" style="top:${rowY(2)}px">label</div>
          ${icons}
          <svg class="s-abs s-hide" id="s-gico" viewBox="0 0 64 64">${cookie("#b5651d", false)}<path d="M20 26 L30 34 M44 22 L36 40 M24 44 L40 46" stroke="#5a3418" stroke-width="3.5" stroke-linecap="round" /></svg>
          ${slots}
        </div>
${dials}          ${gd}
        <div id="s-gtag" class="s-abs s-hide">ginger_snap</div>
        <div class="s-badge s-hide" id="s-b1" style="left:${colX(10) + 62}px;top:${rowY(0) - 26}px">1</div>
        <div class="s-badge s-hide" id="s-b2" style="left:${colX(11) + 62}px;top:${rowY(2) - 26}px">2</div>
        <div id="s-missed" class="s-abs s-hide">missed</div>

        <!-- settings.py, a few lines at a time -->
        <div id="s-strip" class="s-abs s-ol s-hide">
          <div id="s-sbar" class="s-abs"><i></i><i></i><i></i><span>settings.py</span></div>
          <div class="s-pg" id="s-pgA">
            <div class="s-ln s-hide" id="s-a0"><i>1</i><span>"<span class="nm">choc_chip</span>": "/shop/<span class="nm">choc_chip</span>",</span></div>
            <div class="s-ln s-hide" id="s-a1"><i>2</i><span>"<span class="nm">choc_chip</span>": "photos/<span class="nm">choc_chip</span>.jpg",</span></div>
            <div class="s-ln s-hide" id="s-a2"><i>3</i><span>"<span class="nm">choc_chip</span>": "labels/standard.txt",</span></div>
          </div>
          <div class="s-pg" id="s-pgB">
            <div class="s-ln s-hide" id="s-x0"><i>1</i><span>"wedding_cake": "/weddings"</span></div>
            <div class="s-ln s-hide" id="s-x1"><i>2</i><span>"gift_box": "labels/gift.txt"</span></div>
          </div>
          <div class="s-pg" id="s-pgC">
            <div class="s-ln s-hide" id="s-c0"><i>+</i><span class="s-hide" id="s-c0t">"ginger_snap": "/shop/ginger_snap"</span><div class="s-pill" id="s-okp">right</div></div>
            <div class="s-ln s-hide" id="s-c1"><i>+</i><span class="s-hide" id="s-c1t">"ginger_snap": "photos/ginger_snaps.jpg"</span><div class="s-pill s-hide" id="s-typo">typo</div></div>
            <div class="s-ln s-hide" id="s-c2"><i>+</i><div id="s-gap"></div><div class="s-pill s-hide" id="s-forgot">forgotten</div></div>
          </div>
        </div>

        <!-- the new page -->
        <div id="s-page" class="s-abs s-ol s-hide">
          <div id="s-addr">/shop/ginger_snap</div>
          <div id="s-ptitle" class="s-abs">Ginger snap</div>
          <div id="s-pimg" class="s-abs"></div>
          <svg id="s-pbad" class="s-abs s-hide" viewBox="0 0 200 124"><rect x="3" y="3" width="194" height="118" rx="12" fill="#fbe0ea" stroke="#b8235a" stroke-width="5" stroke-dasharray="14 10" /><path d="M78 40 L122 84 M122 40 L78 84" stroke="#b8235a" stroke-width="9" stroke-linecap="round" /></svg>
          <div id="s-broken" class="s-abs s-hide">BROKEN</div>
        </div>

        <!-- the house rule -->
        <div id="s-sign" class="s-abs s-ol s-hide">
          <div id="s-stag" class="s-abs">HOUSE RULE</div>
          <div id="s-once" class="s-abs s-hide">written once</div>
          <div id="s-shead" class="s-abs s-hide">Every product named <em class="s-mono sx">X</em> gets:</div>
          <div id="s-rcs" class="s-abs">
            <div class="s-rc s-hide" id="s-rc0"><small>page</small><code>/shop/<em class="sx">X</em></code></div>
            <div class="s-rc s-hide" id="s-rc1"><small>photo</small><code>photos/<em class="sx">X</em>.jpg</code></div>
            <div class="s-rc s-hide" id="s-rc2"><small>label</small><code>labels/standard.txt</code></div>
          </div>
        </div>

        <div id="s-gone" class="s-abs s-hide">34 lines gone<small>all of them followed the rule</small></div>

        <!-- ginger snaps, by name alone -->
        <div id="s-tin" class="s-abs s-ol s-hide">
          <svg id="s-tinico" class="s-abs" viewBox="0 0 64 64">${cookie("#b5651d", false)}<path d="M20 26 L30 34 M44 22 L36 40 M24 44 L40 46" stroke="#5a3418" stroke-width="3.5" stroke-linecap="round" /></svg>
          <div id="s-tinlbl" class="s-abs">new product</div>
          <div id="s-tintag" class="s-abs">ginger_snap</div>
        </div>
        <div class="s-out s-hide" id="s-o0" style="top:196px"><small>page</small><code>/shop/<em>ginger_snap</em></code><div class="s-ok">${tick}</div></div>
        <div class="s-out s-hide" id="s-o1" style="top:346px"><small>photo</small><code>photos/<em>ginger_snap</em>.jpg</code><div class="s-ok">${tick}</div></div>
        <div class="s-out s-hide" id="s-o2" style="top:496px"><small>label</small><code>labels/standard.txt</code><div class="s-ok">${tick}</div></div>

        <!-- circles, arrows, pointer -->
        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          ${ring("s-rn1", 583, 881, 100, 30, "#ffc24b")}
          ${ring("s-rn2", 943, 881, 100, 30, "#ffc24b")}
          ${ring("s-re1", colX(10) + 42, rowY(0) + 40, 56, 54, "#b9741a")}
          ${ring("s-re2", colX(11) + 42, rowY(2) + 40, 56, 54, "#b9741a")}
          ${ring("s-rs", 1105, 881, 22, 28, "#ff6b8b")}
          <path id="s-rmiss" d="M${colX(12) - 10} ${rowY(2) + 40} a52 52 0 1 0 104 0 a52 52 0 1 0 -104 0" fill="none" stroke="#b8235a" stroke-width="6" stroke-linecap="round" stroke-dasharray="14 12" />
          ${ring("s-rtag", 285, 502, 150, 44, "#b9741a")}
          <path id="s-w0" class="s-ring" style="stroke:#1f7a5c" d="M462 400 C520 400 520 256 572 256" />
          <path id="s-w1" class="s-ring" style="stroke:#1f7a5c" d="M462 412 H572" />
          <path id="s-w2" class="s-ring" style="stroke:#1f7a5c" d="M462 424 C520 424 520 556 572 556" />
          <polygon id="s-h0" points="586,256 568,246 568,266" fill="#1f7a5c" />
          <polygon id="s-h1" points="586,412 568,402 568,422" fill="#1f7a5c" />
          <polygon id="s-h2" points="586,556 568,546 568,566" fill="#1f7a5c" />
        </svg>
        <div id="s-cur" class="s-abs s-hide">
          <svg viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
          <div id="s-sam" class="s-abs">Sam</div>
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

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", stagger: o.stagger || 0 }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const swap = (a, b, at) => {
        if (a) tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.08);
      };
      // Stroke drawing from the real path length (pathLength="1" does not animate in the renderer).
      document.querySelectorAll("#s-marks .s-ring").forEach((p) => {
        const L = Math.ceil(p.getTotalLength()) || 400;
        p.dataset.len = L;
        p.style.strokeDasharray = L + " " + (L + 40);
        p.style.strokeDashoffset = L;
      });
      const draw = (sel, at, d) => {
        const p = document.querySelector(sel), L = +p.dataset.len;
        tl.set(p, { opacity: 1 }, at);
        tl.fromTo(p, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at);
      };
      const type = (sel, at, d, steps) => tl.fromTo(sel, { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d, ease: "steps(" + steps + ")" }, at);

      /* ---- 1. Twelve things, each needs a page, a photo and a label ---- */
      tl.to("#s-arm", { rotation: -16, svgOrigin: "296 340", duration: 0.2, ease: "power1.inOut", yoyo: true, repeat: 5 }, 0.3);
      pop("#s-name", 0.45, { from: 0.4 });
      pop(".s-ico", t(4) - 0.1, { from: 0.3, d: 0.35, stagger: 0.07 });
      pop("#s-row0", t(10), { from: 0.5 });
      pop("#s-row1", t(12), { from: 0.5 });
      pop("#s-row2", t(15), { from: 0.5 });

      /* ---- 2. The settings file spells out every one: 36 lines ---- */
      out("#s-name", t(16), 0.25);
      tl.fromTo("#s-strip", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(18) - 0.1);
      tl.fromTo("#s-count", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(18) + 0.1);
      tl.set(".s-num .n0", { opacity: 1 }, t(18) + 0.1);
      const rowAt = [t(20), t(24) - 0.1, t(26)];
      [0, 1, 2].forEach((j) => {
        const at = rowAt[j];
        type("#s-a" + j, at, 0.7, 14);
        for (let i = 0; i < 12; i++) pop("#s-d" + j + "-" + i, at + 0.1 + i * 0.07, { from: 0.3, d: 0.3, ease: "back.out(2)" });
      });
      swap(".s-num .n0", ".s-num .n12", t(23));
      swap(".s-num .n12", ".s-num .n24", t(26) - 0.2);
      swap(".s-num .n24", ".s-num .n36", t(29));

      /* ---- 3. Almost every line repeats the name; only two differ ---- */
      tl.to(".s-ord", { opacity: 0.4, duration: 0.5, ease: "power2.inOut" }, t(33));
      tl.to("#s-pgA .nm", { color: "#ffc24b", duration: 0.3 }, t(37));
      draw("#s-rn1", t(39), 0.45);
      draw("#s-rn2", t(40), 0.45);
      out(["#s-rn1", "#s-rn2", "#s-a0", "#s-a1", "#s-a2"], t(41) - 0.35, 0.2);
      tl.to(".s-exc .face", { fill: "#ffc24b", duration: 0.3 }, t(41) - 0.1);
      tl.fromTo(".s-exc", { scale: 1 }, { scale: 1.25, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.42 }, t(41));
      draw("#s-re1", t(41) + 0.05, 0.4);
      pop("#s-b1", t(41) + 0.25, { from: 0.3 });
      type("#s-x0", t(41) + 0.1, 0.5, 12);
      draw("#s-re2", t(42) + 0.05, 0.4);
      pop("#s-b2", t(42) + 0.25, { from: 0.3 });
      type("#s-x1", t(42) + 0.1, 0.5, 12);

      /* ---- 4. Sam adds ginger snaps: one right, one typo, one forgotten ---- */
      out(["#s-re1", "#s-re2", "#s-b1", "#s-b2", "#s-x0", "#s-x1"], t(46) - 0.1, 0.25);
      tl.to(".s-ord", { opacity: 1, duration: 0.4, ease: "power2.inOut" }, t(46));
      pop("#s-gico", t(49) - 0.05, { from: 0.3 });
      pop("#s-gtag", t(49) + 0.1, { from: 0.4 });
      pop(".s-slot", t(51), { from: 0.4, d: 0.35, stagger: 0.14 });
      tl.fromTo(["#s-c0", "#s-c1", "#s-c2"], { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", stagger: 0.14 }, t(51));
      tl.fromTo("#s-cur", { opacity: 0, x: 1500, y: 1010 }, { opacity: 1, x: 1560, y: 220, duration: 0.8, ease: "power3.out" }, t(51) + 0.3);
      tl.to("#s-cur", { x: ${colX(12) + 50}, y: ${rowY(0) + 50}, duration: 0.5, ease: "power2.inOut" }, t(56) - 0.55);
      pop("#s-g0", t(56), { from: 0.3, ease: "back.out(2.2)" });
      type("#s-c0t", t(56) - 0.5, 0.7, 14);
      tl.fromTo("#s-okp", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, t(57));
      tl.to("#s-cur", { x: ${colX(12) + 50}, y: ${rowY(1) + 50}, duration: 0.45, ease: "power2.inOut" }, t(58) - 0.5);
      pop("#s-g1", t(58) + 0.05, { from: 0.3, ease: "back.out(2.2)" });
      type("#s-c1t", t(58) - 0.4, 0.8, 16);
      draw("#s-rs", t(58) + 0.45, 0.35);
      pop("#s-typo", t(59), { from: 0.4 });
      tl.to("#s-cur", { x: ${colX(12) + 30}, y: ${rowY(2) - 20}, duration: 0.5, ease: "power2.inOut" }, t(60) - 0.2);
      tl.to("#s-cur", { x: 1500, y: 660, opacity: 0, duration: 0.6, ease: "power2.in" }, t(61));
      tl.fromTo("#s-rmiss", { opacity: 0, scale: 1.5, svgOrigin: "${colX(12) + 42} ${rowY(2) + 40}" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, t(61) + 0.1);
      pop("#s-missed", t(61) + 0.3, { from: 0.4 });
      pop("#s-forgot", t(61) + 0.2, { from: 0.4 });
      tl.fromTo("#s-gap", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(61) + 0.1);

      /* ---- 5. The new page shows a broken picture ---- */
      tl.fromTo("#s-page", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(66) - 0.1);
      tl.fromTo("#s-g1", { scale: 1 }, { scale: 1.3, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, t(70) - 0.3);
      pop("#s-pbad", t(70), { from: 0.5, ease: "back.out(2.2)" });
      tl.fromTo("#s-broken", { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: -7, duration: 0.3, ease: "power4.in" }, t(70) + 0.4);

      /* ---- 6. One house rule, written once ---- */
      out("#s-page", t(72) + 0.35, 0.3);
      out(["#s-strip", "#s-gtag", "#s-gico", ".s-slot", "#s-g0", "#s-g1", "#s-rmiss", "#s-missed", "#s-rs"], t(72), 0.3);
      tl.fromTo("#s-sign", { opacity: 0, y: 70, rotation: 2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: "back.out(1.3)" }, t(75) - 0.2);
      pop("#s-once", t(78), { from: 0.4 });
      tl.fromTo("#s-shead", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(77) + 0.25);
      pop("#s-rc0", t(82), { from: 0.6 });
      pop("#s-rc1", t(83), { from: 0.6 });
      pop("#s-rc2", t(85), { from: 0.6 });
      tl.fromTo(".sx", { scale: 1 }, { scale: 1.5, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.1 }, t(90) - 0.1);

      /* ---- 7. Thirty-four lines disappear; two exceptions stay ---- */
      tl.to(".s-ord", { opacity: 0, scale: 0.1, y: 150, duration: 0.45, ease: "power2.in", stagger: 0.03 }, t(91));
      swap(".s-num .n36", ".s-num .n2", t(93));
      tl.fromTo("#s-gone", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(93) + 0.75);
      out("#s-gone", t(106) - 0.1, 0.3);
      out(["#s-wall", ".s-ico", ".s-row"], t(93) + 0.5, 0.35);
      tl.fromTo("#s-exc", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(95));
      tl.to("#s-d0-10", { x: ${1136 - colX(10)}, y: ${310 - rowY(0)}, duration: 0.7, ease: "power3.inOut" }, t(97) - 0.1);
      tl.to("#s-d2-11", { x: ${1136 - colX(11)}, y: ${450 - rowY(2)}, duration: 0.7, ease: "power3.inOut" }, t(97) + 0.15);
      type("#s-e1", t(100), 0.5, 12);
      type("#s-e2", t(100) + 0.35, 0.5, 12);
      pop("#s-etag", t(102), { from: 0.4 });
      pop("#s-plain", t(104), { from: 0.4 });

      /* ---- 8. Ginger snaps need just a name ---- */
      tl.fromTo("#s-tin", { opacity: 0, x: -420, rotation: -6 }, { opacity: 1, x: 0, rotation: 0, duration: 0.7, ease: "back.out(1.2)" }, t(107) - 0.2);
      draw("#s-rtag", t(111), 0.5);
      [[114, 0], [116, 1], [119, 2]].forEach(([w, k]) => {
        draw("#s-w" + k, t(w) - 0.25, 0.3);
        tl.set("#s-h" + k, { opacity: 1 }, t(w) + 0.02);
        pop("#s-o" + k, t(w), { from: 0.7 });
        pop("#s-o" + k + " .s-ok", t(w) + 0.4, { from: 0.2, ease: "back.out(2.4)", d: 0.35 });
      });

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.3, ease: "power2.in" }, ${DUR} - 0.32);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
writeFileSync(new URL("./compositions/story.html", import.meta.url), html);
console.log("story.html written", html.length);
