// Generates compositions/story.html for lesson 47 (Unix philosophy).
// Run: node gen-story.mjs
import { writeFileSync, readFileSync } from "node:fs";

const W = JSON.parse(readFileSync(new URL("./assets/voice/words.json", import.meta.url))).map((w) => w.start);
const S_END = 55.35; // story scene length; the takeaway starts here

/* ---------- geometry ---------- */
const MW = 196, MH = 220, MTOP = 190, PIPE_Y = 300;
const mLeft = [286, 670, 1054, 1438];
const mCx = mLeft.map((x) => x + MW / 2);
const slotCx = [192, 576, 960, 1344, 1728];
const STACK_TOP = 450, SW = 184;
const COL = { "choc chip": "#e6e3ff", oat: "#fbebd2", ginger: "#fbe0ea", lemon: "#ddefe6" };

const file = ["choc chip", "oat", "ginger", "choc chip", "lemon", "oat", "choc chip", "ginger", "oat", "choc chip"];
const sorted = [...file].sort();
const rot = [-5, 4, -3, 6, -6, 3, -4, 5, -2, 4];
const off = [-8, 10, -4, 6, -10, 8, 4, -6, 10, -4];

const slip = (name, j, cls, id, style = "") =>
  `<div class="b-slip ${cls}"${id ? ` id="${id}"` : ""} style="top:${j * 42}px;background:${COL[name]};${style}">${name}</div>`;
const bundle = (name, n, j, id) =>
  `<div class="b-bun" id="${id}" style="top:${j * 80}px;background:${COL[name]}"><i class="b-n">${n}</i><span>${name}</span></div>`;
const stack = (i, id, inner) => `<div class="b-stack" id="${id}" style="left:${slotCx[i] - SW / 2}px" data-layout-allow-overflow data-layout-allow-overlap>${inner}</div>`;

const machine = (id, left, word, chip, extra = "") =>
  `<div class="b-mach s-hide" id="${id}" style="left:${left}px">
            <span class="b-coup" style="left:-12px"></span><span class="b-coup" style="right:-12px"></span>
            <div class="b-body"><i class="b-light"></i><b${word.includes("<br") ? ' class="two"' : ""}>${word}</b><code>${chip}</code></div>${extra}
            <div class="b-job s-hide">1 job</div>
          </div>`;

const segs = [[150, 300], [468, 684], [852, 1068], [1236, 1452], [1620, 1790]];
const ringPath = (cx, cy, rx, ry) =>
  `M${cx - rx * 0.94} ${cy + 4} C${cx - rx * 1.02} ${cy - ry * 1.25} ${cx + rx} ${cy - ry * 1.3} ${cx + rx} ${cy} C${cx + rx} ${cy + ry * 1.3} ${cx - rx * 1.06} ${cy + ry * 1.3} ${cx - rx} ${cy - 10}`;

const maya = `<circle cx="200" cy="44" r="42" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
            <circle cx="200" cy="150" r="104" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
            <rect x="178" y="226" width="44" height="50" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="6" />
            <path d="M70 520 C70 340 130 268 200 268 C270 268 330 340 330 520 Z" fill="#e6e3ff" stroke="#0e0c1d" stroke-width="6" />
            <path d="M132 520 V366 Q200 338 268 366 V520 Z" fill="#fff" stroke="#0e0c1d" stroke-width="6" />
            <path d="M132 366 L160 282 M268 366 L240 282" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
            <circle cx="200" cy="162" r="84" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="6" />
            <path d="M117 150 Q146 66 226 78 Q280 88 284 152 Q240 112 190 120 Q150 124 117 150 Z" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
            <circle cx="150" cy="198" r="13" fill="#f5a8a0" /><circle cx="250" cy="198" r="13" fill="#f5a8a0" />
            <circle cx="170" cy="172" r="8" fill="#0e0c1d" /><circle cx="230" cy="172" r="8" fill="#0e0c1d" />
            <path d="M176 206 Q200 222 224 206" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />`;

const buttons = Array.from({ length: 40 }, (_, i) =>
  `<i class="a-btn${i === 0 ? " one" : ""}" style="left:${41 + (i % 8) * 102}px;top:${118 + Math.floor(i / 8) * 86}px">${i + 1}</i>`).join("");

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #root * { box-sizing: border-box; }
    #s-all, #a-wrap, #b-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-hide { opacity: 0; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    code, .mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }

    /* ---------- scene A: Maya, and Sam's one big program ---------- */
    #a-maya { left: 96px; top: 470px; width: 400px; height: 520px; }
    #a-bubble { left: 330px; top: 236px; width: 520px; height: 180px; background: #fff; border-radius: 30px; }
    #a-tail { left: 90px; top: 158px; width: 40px; height: 40px; background: #fff; box-shadow: 5px 5px 0 0 #0e0c1d; }
    .a-q { position: absolute; left: 36px; top: 26px; width: 450px; font: 700 50px/1.26 "Fraunces", serif; letter-spacing: -0.02em; }
    #a-mach { left: 930px; top: 120px; width: 880px; height: 790px; background: #fff; border-radius: 30px; }
    #a-head { left: 0; top: 0; width: 880px; height: 88px; background: #15132b; border-radius: 30px 30px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; }
    #a-name { left: 34px; top: 16px; height: 56px; font: 700 40px/56px "JetBrains Mono", monospace; color: #fff; white-space: nowrap; }
    #a-by { right: 24px; top: 18px; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; background: #ffc24b; font-size: 30px; white-space: nowrap; }
    .a-btn { position: absolute; width: 84px; height: 66px; border-radius: 16px; background: #fbf8f4; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; font-style: normal; font-size: 30px; line-height: 66px; text-align: center; opacity: 0; }
    .a-btn.one { background: #7cf0b5; opacity: 1; }
    #a-count { left: 41px; top: 584px; width: 460px; height: 96px; font: 700 76px/96px "Fraunces", serif; letter-spacing: -0.02em; }
    #a-count > span { position: absolute; left: 0; top: 0; white-space: nowrap; }
    #a-weeks { right: 41px; top: 602px; height: 60px; line-height: 60px; padding: 0 26px; border-radius: 999px; background: #3b37e6; color: #fff; font-size: 34px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    #a-sub { left: 41px; top: 702px; font-size: 32px; line-height: 44px; color: #3e3b52; white-space: nowrap; }
    #a-card { left: 560px; top: 440px; height: 68px; line-height: 68px; padding: 0 28px; border-radius: 18px; background: #fbebd2; font-size: 36px; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }
    #a-stamp { left: 1090px; top: 388px; padding: 10px 34px; background: #b8235a; color: #fff; font-size: 58px; line-height: 1.3; letter-spacing: 0.06em; border-radius: 16px; box-shadow: 0 0 0 6px #0e0c1d; white-space: nowrap; }

    /* ---------- scene B: the line of small tools ---------- */
    #b-face { left: 98px; top: 58px; width: 108px; height: 108px; }
    .b-pill { position: absolute; height: 48px; line-height: 48px; padding: 0 22px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #b-who { left: 226px; top: 60px; background: #0e0c1d; color: #fff; }
    #b-unix { left: 226px; top: 122px; background: #e6e3ff; }
    #b-ask { left: 1160px; top: 58px; width: 662px; height: 108px; background: #fff; border-radius: 26px; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }
    #b-ask > svg { position: absolute; left: 16px; top: 10px; width: 80px; height: 88px; }
    #b-ask > small { position: absolute; left: 112px; top: 10px; font-size: 28px; line-height: 34px; letter-spacing: 0.06em; color: #6a4a12; }
    .b-q { position: absolute; left: 112px; top: 44px; font: 700 40px/52px "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #b-askok { position: absolute; right: -20px; top: -20px; width: 56px; height: 56px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; }
    #b-askok > svg { position: absolute; left: 0; top: 0; width: 56px; height: 56px; }
    #b-tray { left: 584px; top: 54px; width: 548px; height: 116px; border-radius: 22px; background: #ece7df; box-shadow: 0 0 0 5px #0e0c1d; }
    #b-tray > small { position: absolute; left: 0; top: 8px; width: 548px; text-align: center; font-size: 28px; line-height: 36px; letter-spacing: 0.14em; color: #3e3b52; }
    #b-chips { position: absolute; left: 0; top: 52px; width: 548px; height: 50px; display: flex; justify-content: center; gap: 14px; }
    #b-chips > code { height: 50px; line-height: 50px; padding: 0 12px; border-radius: 10px; background: #15132b; color: #7cf0b5; font-weight: 700; font-size: 28px; }
    #b-st2 .b-n { opacity: 0; }

    .b-seg { position: absolute; top: ${PIPE_Y - 15}px; height: 30px; background: #c9c6ff; box-shadow: 0 0 0 5px #0e0c1d; }
    .b-drip { position: absolute; top: ${PIPE_Y + 22}px; width: 0; height: 110px; border-left: 6px dashed #6f6b80; }
    .b-blob { position: absolute; left: 0; top: ${PIPE_Y - 22}px; width: 56px; height: 44px; border-radius: 22px; background: #3b37e6; box-shadow: 0 0 0 5px #0e0c1d; opacity: 0; }
    .b-mach { position: absolute; top: ${MTOP}px; width: ${MW}px; height: ${MH}px; }
    .b-body { position: absolute; inset: 0; background: #fff; border-radius: 24px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .b-body > b { position: absolute; left: 0; top: 46px; width: ${MW}px; text-align: center; font-size: 44px; line-height: 52px; letter-spacing: 0.04em; white-space: nowrap; }
    .b-body > b.two { top: 42px; font-size: 34px; line-height: 40px; }
    .b-body > code { position: absolute; left: 28px; top: 142px; width: ${MW - 56}px; height: 54px; line-height: 54px; text-align: center; border-radius: 12px; background: #15132b; color: #7cf0b5; font-weight: 700; font-size: 32px; }
    .b-light { position: absolute; right: 16px; top: 14px; width: 22px; height: 22px; border-radius: 50%; background: #c9c5d6; box-shadow: 0 0 0 4px #0e0c1d; }
    .b-coup { position: absolute; top: ${PIPE_Y - MTOP - 32}px; width: 24px; height: 64px; border-radius: 7px; background: #3b37e6; box-shadow: 0 0 0 5px #0e0c1d; }
    .b-job { position: absolute; left: 38px; top: 236px; width: 120px; height: 48px; line-height: 48px; text-align: center; border-radius: 999px; background: #1f7a5c; color: #fff; font-size: 30px; box-shadow: 0 0 0 4px #0e0c1d; }
    .b-tag { position: absolute; left: 22px; top: 98px; width: 152px; height: 40px; line-height: 40px; text-align: center; border-radius: 999px; background: #fbe0ea; font-size: 28px; box-shadow: 0 0 0 3px #0e0c1d; }
    .b-mach.find .b-body > b { top: 34px; }
    .b-mach.find .b-body > code { top: 152px; height: 50px; line-height: 50px; }

    #b-file { left: 98px; top: 206px; height: 50px; line-height: 50px; padding: 0 11px; border-radius: 12px; background: #15132b; color: #eceaff; font: 700 30px/50px "JetBrains Mono", monospace; box-shadow: 0 0 0 4px #0e0c1d; }
    .b-stack { position: absolute; top: ${STACK_TOP}px; width: ${SW}px; height: 420px; }
    .b-slip { position: absolute; left: 0; width: ${SW}px; height: 36px; border-radius: 8px; font-size: 28px; line-height: 36px; text-align: center; white-space: nowrap; box-shadow: 0 0 0 3px #0e0c1d; opacity: 0; }
    .b-bun { position: absolute; left: 0; width: ${SW}px; height: 60px; border-radius: 10px; font-size: 28px; line-height: 60px; white-space: nowrap; box-shadow: 0 0 0 3px #0e0c1d, 6px 7px 0 3px #0e0c1d; opacity: 0; }
    .b-bun > span { position: absolute; left: 37px; top: 0; }
    .b-n { position: absolute; left: -18px; top: 5px; width: 50px; height: 50px; border-radius: 50%; background: #0e0c1d; color: #fff; font-style: normal; font-size: 32px; line-height: 50px; text-align: center; }
    #b-ans { left: 1594px; top: 716px; background: #1f7a5c; color: #fff; }
    #b-plain { left: 866px; top: 800px; background: #fbebd2; }
    #b-same { left: 1250px; top: 800px; background: #3b37e6; color: #fff; }
    #b-two { left: ${slotCx[2] - SW / 2}px; top: ${STACK_TOP}px; width: ${SW}px; height: 176px; background: #fff; border-radius: 22px; text-align: center; }
    #b-two > b { display: block; font: 700 110px/124px "Fraunces", serif; color: #1f7a5c; }
    #b-two > small { display: block; font-size: 28px; line-height: 36px; }

    #b-term { left: 98px; top: 916px; width: 1724px; height: 80px; background: #15132b; border-radius: 20px; }
    .b-cmd { position: absolute; left: 30px; top: 14px; height: 52px; display: flex; font: 700 34px/52px "JetBrains Mono", monospace; color: #fff; white-space: pre; }
    .b-cmd > i { font-style: normal; color: #7cf0b5; }
    .b-cmd > span { display: inline-block; opacity: 0; }
    .b-cmd .bar { display: inline-block; color: #c9c6ff; }
    #b-out { position: absolute; right: 30px; top: 14px; height: 52px; font: 700 34px/52px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; }
    #b-out > u { text-decoration: none; color: #a9a5d6; }

    .b-tile { position: absolute; left: 1160px; width: 662px; height: 124px; background: #fff; border-radius: 24px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .b-tile > span { position: absolute; left: 32px; top: 36px; font-size: 36px; line-height: 52px; white-space: nowrap; }
    .b-tile > b { position: absolute; right: 36px; top: 18px; width: 70px; height: 88px; font: 700 80px/88px "Fraunces", serif; }
    .b-tile > b > u { position: absolute; right: 0; top: 0; text-decoration: none; }

    #b-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .b-ring { fill: none; stroke: #ff6b8b; stroke-width: 7; stroke-linecap: round; opacity: 0; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${S_END}" data-track-index="1">

      <!-- ===== scene A ===== -->
      <div id="a-wrap">
        <svg id="a-maya" class="s-abs" viewBox="0 0 400 520">
            ${maya}
        </svg>
        <div id="a-bubble" class="s-abs s-ol s-hide">
          <span id="a-tail" class="s-abs"></span>
          <div class="a-q s-hide" id="a-q1">Today's three best sellers?</div>
          <div class="a-q s-hide" id="a-q2" data-layout-allow-overlap>How many ginger?</div>
        </div>
        <div id="a-mach" class="s-abs s-ol s-hide">
          <div id="a-head" class="s-abs"><span id="a-name" class="s-abs">ShopReportMaster</span><span id="a-by" class="s-abs s-hide">Sam's program</span></div>
          ${buttons}
          <div id="a-count" class="s-abs"><span id="a-c1">1 option</span><span id="a-c40" class="s-hide" data-layout-allow-overlap>40 options</span></div>
          <div id="a-weeks" class="s-abs s-hide">3 weeks later</div>
          <div id="a-sub" class="s-abs s-hide">reads, counts, sorts, formats, emails</div>
        </div>
        <div id="a-card" class="s-abs s-hide" data-layout-allow-overlap data-layout-allow-occlusion>How many ginger?</div>
        <div id="a-stamp" class="s-abs s-hide" data-layout-allow-overlap data-layout-allow-occlusion>NO BUTTON</div>
      </div>

      <!-- ===== scene B ===== -->
      <div id="b-wrap">
        <svg id="b-face" class="s-abs s-hide" viewBox="0 0 108 108">
          <circle cx="54" cy="54" r="50" fill="#ddefe6" stroke="#0e0c1d" stroke-width="5" />
          <circle cx="54" cy="30" r="15" fill="#8d8a99" stroke="#0e0c1d" stroke-width="5" />
          <circle cx="54" cy="60" r="30" fill="#e8b792" stroke="#0e0c1d" stroke-width="5" />
          <path d="M25 56 Q30 28 54 30 Q78 28 83 56 Q68 42 54 44 Q40 42 25 56 Z" fill="#8d8a99" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
          <circle cx="42" cy="62" r="9" fill="#fff" stroke="#0e0c1d" stroke-width="4" /><circle cx="66" cy="62" r="9" fill="#fff" stroke="#0e0c1d" stroke-width="4" />
          <path d="M51 62 H57" stroke="#0e0c1d" stroke-width="4" /><path d="M45 78 Q54 85 63 78" fill="none" stroke="#0e0c1d" stroke-width="4" stroke-linecap="round" />
        </svg>
        <div id="b-who" class="b-pill s-hide">The accountant</div>
        <div id="b-unix" class="b-pill s-hide">grew up with Unix</div>
        <div id="b-ask" class="s-abs s-hide">
          <svg viewBox="96 30 208 230" data-layout-ignore>${maya}</svg>
          <small>MAYA ASKS</small>
          <div class="b-q" id="b-q1">Today's three best sellers?</div>
          <div class="b-q s-hide" id="b-q2" data-layout-allow-overlap>How many ginger?</div>
          <div id="b-askok" class="s-hide"><svg viewBox="0 0 56 56"><path d="M16 29 L25 38 L41 20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg></div>
        </div>
        <div id="b-tray" class="s-abs s-hide"><small>TOOLBOX</small><div id="b-chips"><code id="b-tc0">sort</code><code id="b-tc1">uniq</code><code id="b-tc2">head</code><code id="b-tc3">grep</code><code id="b-tc4">wc</code></div></div>

        <!-- pipe -->
        ${segs.map((s, i) => `<div class="b-seg" id="b-seg${i}" style="left:${s[0]}px;width:${s[1] - s[0]}px"></div>`).join("\n        ")}
        ${[1, 2, 3, 4].map((i) => `<div class="b-drip s-hide" id="b-drip${i}" style="left:${slotCx[i] - 3}px"></div>`).join("\n        ")}
        <div class="b-drip s-hide" id="b-drip0" style="left:${slotCx[0] - 3}px"></div>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<div class="b-blob" id="b-blob${i}"></div>`).join("")}

        <!-- the stream, after each tool -->
        <div id="b-file" class="s-abs s-hide">sales.txt</div>
        ${stack(0, "b-st0", file.map((n, j) => slip(n, j, "p0" + (n === "ginger" ? " gin" : " notgin"), "")).join(""))}
        ${stack(1, "b-st1", sorted.map((n, j) => slip(n, j, "p1", "")).join(""))}
        ${stack(2, "b-st2", [["choc chip", 4], ["ginger", 2], ["lemon", 1], ["oat", 3]].map((r, j) => bundle(r[0], r[1], j, "b-c" + j)).join(""))}
        ${stack(3, "b-st3", [["choc chip", 4], ["ginger", 2], ["lemon", 1], ["oat", 3]].map((r, j) => bundle(r[0], r[1], j, "b-r" + j)).join(""))}
        ${stack(4, "b-st4", [["choc chip", 4], ["oat", 3], ["ginger", 2], ["lemon", 1]].map((r, j) => bundle(r[0], r[1], j, "b-t" + j)).join(""))}
        ${stack(1, "b-g1", ["ginger", "ginger"].map((n, j) => slip(n, j, "g1", "")).join(""))}
        <div id="b-two" class="s-abs s-ol s-hide"><b>2</b><small>ginger sold</small></div>
        <div id="b-ans" class="b-pill s-hide">Maya's answer</div>
        <div id="b-plain" class="b-pill s-hide">plain lines of text</div>
        <div id="b-same" class="b-pill s-hide">the same pipe, every time</div>

        <!-- machines -->
        ${machine("b-m0", mLeft[0], "SORT", "sort")}
        ${machine("b-m1", mLeft[1], "COUNT", "uniq")}
        ${machine("b-m2", mLeft[2], "RANK", "sort")}
        ${machine("b-m3", mLeft[3], "TOP 3", "head")}
        ${machine("b-m4", mLeft[0], "FIND", "grep", '<div class="b-tag">ginger</div>').replace('class="b-mach s-hide"', 'class="b-mach find s-hide"')}
        ${machine("b-m5", mLeft[1], "COUNT<br />LINES", "wc")}

        <!-- the real command line -->
        <div id="b-term" class="s-abs s-ol s-hide">
          <div class="b-cmd" id="b-cmd1"><i>$ </i><span id="b-k0">sort sales.txt</span><span id="b-k1"><span class="bar"> | </span>uniq -c</span><span id="b-k2"><span class="bar"> | </span>sort -rn</span><span id="b-k3"><span class="bar"> | </span>head -3</span></div>
          <div class="b-cmd" id="b-cmd2" data-layout-allow-overlap><i id="b-p2" class="s-hide">$ </i><span id="b-j0">grep ginger sales.txt</span><span id="b-j1"><span class="bar"> | </span>wc -l</span></div>
          <div id="b-out" class="s-hide"><u>prints </u>2</div>
        </div>

        <div class="b-tile s-hide" id="b-tileA" style="top:470px"><span>questions answered</span><b><u id="b-n1">1</u><u id="b-n2" class="s-hide" data-layout-allow-overlap>2</u></b></div>
        <div class="b-tile s-hide" id="b-tileB" style="top:634px"><span>new programs built</span><b><u>0</u></b></div>

        <svg id="b-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="b-rans" class="b-ring" style="stroke:#1f7a5c" d="${ringPath(slotCx[4] - 4, STACK_TOP + 112, 122, 138)}" />
          ${[1, 2, 3].map((i) => `<path id="b-rp${i}" class="b-ring" d="${ringPath(slotCx[i], PIPE_Y, 84, 44)}" />`).join("\n          ")}
        </svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds); t(i) adds the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });
      const pop = (sel, at, o) => { o = o || {}; tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", stagger: o.stagger || 0 }, at); };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const swap = (a, b, at) => { tl.to(a, { opacity: 0, duration: 0.14, ease: "power2.in" }, at); tl.fromTo(b, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.1); };
      const draw = (sel, at, d) => { const p = document.querySelector(sel); const L = p.getTotalLength() + 2; gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); tl.set(p, { opacity: 1 }, at); tl.to(p, { strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out" }, at + 0.01); };
      const type = (sel, at, n) => tl.fromTo(sel, { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: n * 0.035, ease: "steps(" + n + ")" }, at);
      const mCx = ${JSON.stringify(mCx)}, slotCx = ${JSON.stringify(slotCx)};
      // a pulse of data runs along the pipe into a machine, and the machine thumps
      const run = (blob, from, m, mx, at) => {
        tl.set(blob, { opacity: 1 }, at - 0.35);
        tl.fromTo(blob, { x: from - 28, scaleX: 1 }, { x: mx - 28, scaleX: 1.5, duration: 0.34, ease: "power2.in", immediateRender: false }, at - 0.34);
        tl.set(blob, { opacity: 0 }, at);
        tl.to(m + " .b-light", { backgroundColor: "#4bd69b", duration: 0.1 }, at);
        tl.fromTo(m + " .b-body", { scale: 1 }, { scale: 1.07, duration: 0.11, ease: "power2.out", yoyo: true, repeat: 1 }, at);
      };
      const spill = (sel, at, stagger) => tl.fromTo(sel, { opacity: 0, x: -110, y: -70, scale: 0.5 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.4)", stagger: stagger }, at);

      /* ================= scene A ================= */
      /* 1. Maya asks one question */
      pop("#a-bubble", t(1) - 0.05, { from: 0.5 });
      tl.fromTo("#a-q1", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, t(4) - 0.1);

      /* 2. Sam's one big program */
      tl.fromTo("#a-mach", { opacity: 0, x: 140 }, { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" }, t(10) - 0.05);
      type("#a-name", t(13) - 0.1, 16);
      pop("#a-by", t(10) + 0.5, { from: 0.4 });
      tl.fromTo(".a-btn.one", { scale: 1 }, { scale: 1.25, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, t(17));
      pop("#a-weeks", t(19), { from: 0.4 });
      tl.fromTo(".a-btn:not(.one)", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.03 }, t(22) - 0.1);
      swap("#a-c1", "#a-c40", t(24) + 0.15);
      tl.fromTo("#a-sub", { opacity: 0 }, { opacity: 1, duration: 0.4 }, t(25) + 0.2);

      /* 3. the next question bounces off */
      swap("#a-q1", "#a-q2", t(29) - 0.05);
      tl.fromTo("#a-card", { opacity: 0, x: 0, y: -90, rotation: 0, scale: 0.6 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, t(31) + 0.35);
      tl.to("#a-card", { x: 300, y: 20, rotation: 4, duration: 0.36, ease: "power2.in" }, t(32) - 0.1);
      tl.to("#a-card", { x: -50, y: 330, rotation: -18, duration: 0.6, ease: "power2.out" }, t(32) + 0.26);
      tl.fromTo("#a-mach", { x: 0 }, { x: 14, duration: 0.05, yoyo: true, repeat: 5, ease: "power1.inOut" }, t(32) + 0.26);
      tl.fromTo("#a-stamp", { opacity: 0, scale: 2.4, rotation: 5 }, { opacity: 1, scale: 1, rotation: -7, duration: 0.28, ease: "power4.in" }, t(34) - 0.2);

      /* hand over to the accountant */
      tl.to("#a-wrap", { opacity: 0, x: -120, filter: "blur(10px)", duration: 0.4, ease: "power3.in" }, t(38) - 0.55);

      /* ================= scene B ================= */
      gsap.set(".b-seg", { scaleX: 0, transformOrigin: "0% 50%" });
      /* 4. the accountant lines up four small tools */
      pop("#b-face", t(38) - 0.1, { from: 0.4 });
      tl.fromTo("#b-who", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(39) - 0.05);
      tl.fromTo("#b-unix", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(43) - 0.1);
      tl.fromTo("#b-ask", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(40));
      tl.fromTo("#b-term", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(47) - 0.2);
      const chipX = [664, 770, 875, 980, 1068], chipOf = [0, 1, 0, 2, 3, 4], CY = -171;
      const pulse = (c, at) => tl.fromTo("#b-tc" + c, { scale: 1 }, { scale: 1.25, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, at);
      tl.fromTo("#b-tray", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(45) - 0.1);
      ["#b-m0", "#b-m1", "#b-m2", "#b-m3"].forEach((m, i) => {
        pulse(chipOf[i], t(50) - 0.2 + i * 0.2);
        tl.fromTo(m, { opacity: 0, x: chipX[chipOf[i]] - mCx[i], y: CY, scale: 0.3 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, t(50) - 0.15 + i * 0.2);
      });
      tl.to(".b-seg", { scaleX: 1, duration: 0.3, ease: "power2.out", stagger: 0.12 }, t(53) - 0.05);
      tl.fromTo(".b-coup", { scaleY: 1 }, { scaleY: 1.3, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out", stagger: 0.05 }, t(55) - 0.05);

      /* 5. in goes the pile; each tool changes the stream */
      tl.fromTo(".p0", { opacity: 0, y: -260, rotation: 0 }, { opacity: 1, y: 0, rotation: (i) => [${rot}][i], x: (i) => [${off}][i], duration: 0.45, ease: "bounce.out", stagger: 0.05 }, t(40) + 0.3);
      pop("#b-file", t(42), { from: 0.5 });
      tl.fromTo("#b-st0", { y: 0 }, { y: -22, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 3 }, t(59) - 0.1);
      tl.fromTo("#b-file", { scale: 1 }, { scale: 1.15, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, t(61));
      tl.fromTo("#b-drip0", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(59));

      run("#b-blob0", slotCx[0], "#b-m0", mCx[0], t(62));            // SORT
      type("#b-k0", t(62), 14);
      tl.to("#b-st0", { opacity: 0.55, duration: 0.4 }, t(62) + 0.1);
      spill(".p1", t(64) - 0.25, 0.05);
      tl.fromTo("#b-drip1", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(64));

      run("#b-blob1", slotCx[1], "#b-m1", mCx[1], t(67));            // COUNT
      type("#b-k1", t(67), 10);
      tl.to("#b-st1", { opacity: 0.55, duration: 0.4 }, t(68));
      spill("#b-st2 .b-bun", t(69), 0.14);
      tl.fromTo("#b-st2 .b-n", { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)", stagger: 0.09 }, t(74));
      tl.fromTo("#b-drip2", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(69));

      run("#b-blob2", slotCx[2], "#b-m2", mCx[2], t(77));            // RANK
      type("#b-k2", t(77), 11);
      tl.to("#b-st2", { opacity: 0.55, duration: 0.4 }, t(77) + 0.3);
      spill("#b-st3 .b-bun", t(78) - 0.1, 0.06);
      tl.fromTo("#b-drip3", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(78));
      tl.to("#b-r3", { y: -160, x: 0, duration: 0.5, ease: "power2.inOut" }, t(80) - 0.1);
      tl.to(["#b-r1", "#b-r2"], { y: 80, duration: 0.5, ease: "power2.inOut" }, t(80) - 0.1);

      run("#b-blob3", slotCx[3], "#b-m3", mCx[3], t(83));            // TOP 3
      type("#b-k3", t(83), 10);
      tl.to("#b-st3", { opacity: 0.55, duration: 0.4 }, t(84));
      spill("#b-st4 .b-bun", t(84) + 0.1, 0.07);
      tl.fromTo("#b-drip4", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(84) + 0.1);
      tl.to("#b-t3", { y: 200, x: 30, rotation: 24, opacity: 0, duration: 0.5, ease: "power2.in" }, t(86) - 0.05);

      draw("#b-rans", t(89) - 0.15, 0.6);                             // Maya's answer
      pop("#b-ans", t(90), { from: 0.4 });
      pop("#b-askok", t(90) + 0.25, { from: 0.2, ease: "back.out(2.4)" });

      /* 6. one job each, plain lines, the same pipe */
      out(["#b-rans", "#b-ans"], t(91) - 0.25);
      ["#b-m0", "#b-m1", "#b-m2", "#b-m3"].forEach((m, i) => {
        pop(m + " .b-job", t(93) + i * 0.22, { from: 0.3, ease: "back.out(2.2)", d: 0.35 });
        tl.fromTo(m + " .b-body > b", { scale: 1 }, { scale: 1.16, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, t(93) + i * 0.22);
      });
      tl.to(["#b-st0", "#b-st1", "#b-st2", "#b-st3"], { opacity: 1, duration: 0.4, stagger: 0.08 }, t(99) - 0.1);
      pop("#b-plain", t(99), { from: 0.4 });
      [1, 2, 3].forEach((i, k) => draw("#b-rp" + i, t(108) - 0.1 + k * 0.22, 0.4));
      tl.to("#b-cmd1 .bar", { color: "#ffc24b", scale: 1.5, duration: 0.2, ease: "back.out(2)", stagger: 0.22 }, t(108) - 0.05);
      pop("#b-same", t(108) + 0.3, { from: 0.4 });

      /* 7. a new question: unclip, re-snap */
      tl.to("#b-askok", { opacity: 0, duration: 0.2 }, t(111));
      swap("#b-q1", "#b-q2", t(114) - 0.1);
      out(["#b-st1", "#b-st2", "#b-st3", "#b-st4", "#b-plain", "#b-same", "#b-rp1", "#b-rp2", "#b-rp3", ".b-job", "#b-cmd1 > span", "#b-drip1", "#b-drip2", "#b-drip3", "#b-drip4"], t(116) - 0.1, 0.3);
      ["#b-m0", "#b-m1", "#b-m2", "#b-m3"].forEach((m, i) => {
        tl.to(m + " .b-light", { backgroundColor: "#c9c5d6", duration: 0.1 }, t(118) - 0.1);
        tl.to(m, { y: -34, rotation: i % 2 ? 6 : -6, duration: 0.22, ease: "back.out(2)" }, t(118) - 0.12 + i * 0.06);
        tl.to(m, { x: chipX[chipOf[i]] - mCx[i], y: CY, rotation: 0, scale: 0.3, opacity: 0, duration: 0.45, ease: "power3.in" }, t(118) + 0.2 + i * 0.07);
        pulse(chipOf[i], t(118) + 0.62 + i * 0.07);
      });
      tl.to(["#b-seg3", "#b-seg4"], { opacity: 0, duration: 0.3 }, t(118));
      pulse(3, t(120) - 0.45);
      pulse(4, t(122) - 0.45);
      tl.fromTo("#b-m4", { opacity: 0, x: chipX[3] - mCx[0], y: CY, scale: 0.3 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, t(120) - 0.4);   // FIND ginger
      type("#b-j0", t(120), 21);
      tl.to("#b-st0", { opacity: 1, duration: 0.2 }, t(120));
      tl.to(".notgin", { opacity: 0.4, duration: 0.3 }, t(121) - 0.1);
      tl.to(".gin", { scale: 1.16, duration: 0.3, ease: "back.out(2)" }, t(121) - 0.1);
      run("#b-blob4", slotCx[0], "#b-m4", mCx[0], t(121) + 0.25);
      spill(".g1", t(121) + 0.35, 0.12);
      tl.fromTo("#b-drip1", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(121) + 0.4);

      tl.fromTo("#b-m5", { opacity: 0, x: chipX[4] - mCx[1], y: CY, scale: 0.3 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, t(122) - 0.4);   // COUNT LINES
      type("#b-j1", t(122) + 0.1, 8);
      run("#b-blob5", slotCx[1], "#b-m5", mCx[1], t(124) + 0.3);
      tl.fromTo("#b-two", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, t(125) - 0.05);
      tl.fromTo("#b-drip2", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, t(125));
      tl.fromTo("#b-out", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(125) + 0.1);
      pop("#b-askok", t(125) + 0.4, { from: 0.2, ease: "back.out(2.4)" });

      pop("#b-tileA", t(125) + 0.5, { from: 0.7 });
      swap("#b-n1", "#b-n2", t(126) - 0.15);
      pop("#b-tileB", t(126) + 0.1, { from: 0.7 });
      tl.fromTo("#b-tileB u", { scale: 1 }, { scale: 1.4, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, t(128));

      /* hand off to the takeaway */
      tl.to("#b-wrap", { opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, ${S_END} - 0.35);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
writeFileSync(new URL("./compositions/story.html", import.meta.url), html);
console.log("story.html written", html.length);
