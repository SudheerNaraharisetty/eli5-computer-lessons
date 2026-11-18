// Generates compositions/story.html for lesson 54, Brooks's law.
// Left: the team as dots on a ring, wired by who must talk to whom (6 pairs, then 28).
// Right: a panel that follows the weeks. Bottom: the project timeline with the DUE date.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 61.9;

/* ---------- the team ring ---------- */
const CX = 620, CY = 368, R = 236;
const NODES = [...Array(8)].map((_, k) => {
  const a = ((-67.5 + 45 * k) * Math.PI) / 180;
  return { x: Math.round(CX + R * Math.cos(a)), y: Math.round(CY + R * Math.sin(a)) };
});
// originals sit on even places, newcomers on odd places
const PEOPLE = [
  { name: "Priya", shirt: "#c9c6ff", hair: "#2a2140" },
  { name: "new", shirt: "#ffd98a", hair: "#6b3b1f", isNew: true },
  { name: "Sam", shirt: "#a9dcc4", hair: "#3e3b52" },
  { name: "new", shirt: "#ffd98a", hair: "#2a2140", isNew: true },
  { name: "Nina", shirt: "#f3cf95", hair: "#2a2140" },
  { name: "new", shirt: "#ffd98a", hair: "#b9741a", isNew: true },
  { name: "Tom", shirt: "#c9c6ff", hair: "#6b3b1f" },
  { name: "new", shirt: "#ffd98a", hair: "#3e3b52", isNew: true },
];
const personSvg = (shirt, hair) => `<svg viewBox="0 0 100 100">
              <path d="M18 100 Q18 62 50 62 Q82 62 82 100 Z" fill="${shirt}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
              <circle cx="50" cy="38" r="20" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="5" />
              <path d="M30 36 Q32 16 50 16 Q68 16 70 36 Q58 26 44 27 Q36 28 30 36 Z" fill="${hair}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
            </svg>`;
const nodeHtml = (p, k) => {
  const { x, y } = NODES[k];
  return `        <div id="s-p${k}" class="s-pw${p.isNew ? " s-new" : ""}">
          <div class="s-node" style="left:${x - 50}px;top:${y - 50}px">${personSvg(p.shirt, p.hair)}</div>
          <div class="s-name" style="left:${x - 90}px;top:${y + 56}px"><span${p.isNew ? ' class="n"' : ""}>${p.name}</span></div>
        </div>`;
};
const pairs = [];
for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) pairs.push([i, j]);
const oldPairs = pairs.filter(([i, j]) => i % 2 === 0 && j % 2 === 0);
const newPairs = pairs.filter(([i, j]) => !(i % 2 === 0 && j % 2 === 0));
if (oldPairs.length !== 6 || pairs.length !== 28) throw new Error("pair count");
const edge = ([i, j], cls) => `<path id="s-e${i}${j}" class="${cls}" d="M${NODES[i].x} ${NODES[i].y} L${NODES[j].x} ${NODES[j].y}" />`;
// teaching arrows, trimmed to the node edges
const trim = (a, b, s, e) => {
  const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
  return `M${(a.x + (dx * s) / L).toFixed(1)} ${(a.y + (dy * s) / L).toFixed(1)} L${(b.x - (dx * e) / L).toFixed(1)} ${(b.y - (dy * e) / L).toFixed(1)}`;
};
const TEACH = [[2, 1], [2, 3], [6, 5], [6, 7]];
const teachPath = ([a, b], n) => `<path id="s-t${n}" class="s-teach" d="${trim(NODES[a], NODES[b], 60, 66)}" />`;
const teachHead = ([a, b], n) => {
  const A = NODES[a], B = NODES[b], dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, tx = B.x - ux * 56, ty = B.y - uy * 56;
  const p1 = [tx - ux * 22 + uy * 13, ty - uy * 22 - ux * 13], p2 = [tx - ux * 22 - uy * 13, ty - uy * 22 + ux * 13];
  return `<polygon id="s-th${n}" class="s-th" points="${tx.toFixed(1)},${ty.toFixed(1)} ${p1.map((v) => v.toFixed(1)).join(",")} ${p2.map((v) => v.toFixed(1)).join(",")}" />`;
};

/* ---------- the timeline ---------- */
const X0 = 230, WK = 180, DUE = X0 + 3 * WK;
const TA = 770, TB = 838, AX = 918; // plan track top, real track top, axis y

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

// 24 task tiles, 6 x 4. The 10 essentials are scattered through the list.
const ESSENTIAL = new Set([0, 2, 3, 7, 9, 12, 14, 18, 19, 22]);
const tiles = [...Array(24)].map((_, i) => {
  const c = i % 6, r = Math.floor(i / 6);
  return `<div class="s-tile${ESSENTIAL.has(i) ? " s-ess" : " s-cut"}" style="left:${c * 74}px;top:${r * 70}px"></div>`;
}).join("");

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
    .s-pill { position: absolute; height: 48px; line-height: 48px; padding: 0 22px; border-radius: 999px; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-lab { position: absolute; font-size: 28px; line-height: 40px; color: #3e3b52; white-space: nowrap; letter-spacing: 0.04em; }

    /* Maya and the count */
    #s-maya { left: 104px; top: 352px; width: 200px; height: 260px; }
    #s-mname { left: 146px; top: 626px; background: #3b37e6; color: #fff; }
    #s-count { left: 96px; top: 96px; width: 236px; height: 214px; background: #fff; border-radius: 22px; }
    .s-crow { position: absolute; left: 24px; width: 190px; height: 92px; }
    .s-crow small { position: absolute; left: 0; top: 0; font-size: 28px; line-height: 34px; color: #3e3b52; letter-spacing: 0.05em; }
    .s-num { position: absolute; left: 0; top: 30px; width: 190px; height: 64px; font: 700 58px/64px "Fraunces", serif; }
    .s-num b { position: absolute; left: 0; top: 0; opacity: 0; font-weight: 700; }
    .s-num b.on { opacity: 1; }
    #s-n28 { color: #b8235a; }

    /* the team ring */
    #s-edges { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .s-eo { fill: none; stroke: #0e0c1d; stroke-width: 6; stroke-linecap: round; opacity: 0; }
    .s-en { fill: none; stroke: #b8235a; stroke-width: 4; stroke-linecap: round; opacity: 0; }
    .s-teach { fill: none; stroke: #3b37e6; stroke-width: 7; stroke-linecap: round; opacity: 0; }
    .s-th { fill: #3b37e6; opacity: 0; }
    .s-pw { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; opacity: 0; }
    .s-node { position: absolute; width: 100px; height: 100px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 5px #0e0c1d, 0 7px 0 5px #0e0c1d; overflow: hidden; }
    .s-node > svg { position: absolute; left: 0; top: 0; width: 100px; height: 100px; }
    .s-new .s-node { background: #fffaf0; }
    .s-name { position: absolute; width: 180px; height: 40px; text-align: center; }
    .s-name > span { display: inline-block; padding: 0 12px; height: 40px; line-height: 40px; font-size: 28px; border-radius: 10px; background: #f6f1eb; white-space: nowrap; }
    .s-name > span.n { color: #8a5510; }
    .s-q { position: absolute; width: 50px; height: 50px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 32px; line-height: 50px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-tt { position: absolute; background: #e6e3ff; color: #3b37e6; opacity: 0; }
    #s-bad { position: absolute; width: 50px; height: 50px; border-radius: 50%; background: #b8235a; color: #fff; font-size: 34px; line-height: 50px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks > path { fill: none; stroke: #b8235a; stroke-width: 7; stroke-linecap: round; opacity: 0; }

    /* own piece */
    #s-own { left: 960px; top: 120px; width: 260px; height: 270px; border-radius: 24px; border: 5px dashed #1f7a5c; background: #f3faf6; }
    #s-own .s-node { left: 75px; top: 52px; }
    #s-own .lbl { position: absolute; left: 0; top: 176px; width: 250px; text-align: center; font-size: 28px; line-height: 34px; color: #1f7a5c; }
    #s-early { left: 1016px; top: 94px; background: #1f7a5c; color: #fff; }

    /* right panel */
    #s-panel { left: 1290px; top: 96px; width: 534px; height: 606px; background: #fbf8f4; border-radius: 28px; }
    #s-ptitle { left: 1322px; top: 118px; font: 700 46px/1.15 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-card { position: absolute; left: 1322px; top: 200px; width: 470px; height: 480px; opacity: 0; }
    .s-big { font: 700 120px/1 "Fraunces", serif; letter-spacing: -0.03em; }
    .s-row { position: absolute; left: 0; font-size: 34px; line-height: 44px; white-space: nowrap; opacity: 0; }
    .s-row i { font-style: normal; color: #3e3b52; }
    .s-week { position: absolute; left: 0; top: 0; background: #0e0c1d; color: #fff; }
    .s-done { position: absolute; left: 0; top: 380px; width: 470px; height: 88px; border-radius: 18px; background: #fbe0ea; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-done span { position: absolute; left: 22px; top: 0; font-size: 30px; line-height: 88px; white-space: nowrap; }
    .s-done span b { color: #b8235a; font-size: 44px; }
    .s-stamp { position: absolute; padding: 2px 16px; background: #b8235a; color: #fff; font-size: 30px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; opacity: 0; }
    #s-oven { position: absolute; left: 60px; top: 10px; width: 350px; height: 300px; }
    #s-timer { left: 152px; top: 112px; background: #fff; font-size: 34px; height: 56px; line-height: 56px; }
    .s-baker { position: absolute; top: 314px; width: 80px; height: 80px; opacity: 0; }
    #s-same { position: absolute; left: 0; top: 410px; width: 470px; text-align: center; font-size: 32px; line-height: 44px; opacity: 0; }
    #s-tiles { position: absolute; left: 12px; top: 64px; width: 440px; height: 280px; }
    .s-tile { position: absolute; width: 60px; height: 56px; border-radius: 12px; background: #fff; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-tile.s-ess::after { content: ""; position: absolute; inset: 0; border-radius: 12px; background: #1f7a5c; opacity: var(--g, 0); }

    /* timeline */
    #s-axis { left: ${X0 - 30}px; top: ${AX}px; width: ${7 * WK + 120}px; height: 6px; background: #0e0c1d; border-radius: 3px; }
    .s-wk { position: absolute; top: ${AX + 16}px; width: 160px; text-align: center; font-size: 28px; line-height: 40px; color: #3e3b52; white-space: nowrap; }
    .s-tick { position: absolute; top: ${AX - 10}px; width: 5px; height: 26px; background: #0e0c1d; }
    #s-dueline { left: ${DUE - 3}px; top: ${TA - 14}px; width: 6px; height: ${AX - TA + 14}px; background: #b8235a; }
    #s-due { left: ${DUE - 104}px; top: 708px; background: #b8235a; color: #fff; }
    #s-plan { left: ${X0}px; top: ${TA}px; width: ${3 * WK}px; height: 50px; border-radius: 12px; border: 4px dashed #3b37e6; background: rgba(59, 55, 230, 0.06); }
    #s-plan span { position: absolute; left: 18px; top: 0; font-size: 28px; line-height: 42px; color: #3b37e6; white-space: nowrap; }
    #s-real { left: ${X0}px; top: ${TB}px; width: ${6 * WK}px; height: 58px; border-radius: 12px; overflow: hidden; }
    #s-real .a { position: absolute; left: 0; top: 0; width: ${3 * WK}px; height: 58px; background: #c9c6ff; }
    #s-real .b { position: absolute; left: ${3 * WK}px; top: 0; width: ${3 * WK}px; height: 58px; background: #fbe0ea; }
    #s-real span { position: absolute; left: 18px; top: 0; font-size: 28px; line-height: 58px; white-space: nowrap; }
    #s-ext { left: ${X0 + 6 * WK + 6}px; top: ${TB}px; width: ${WK - 6}px; height: 58px; border-radius: 12px; background: #b8235a; }
    #s-later { left: ${X0 + 6 * WK + 40}px; top: ${TA - 6}px; }
    #s-short { left: ${X0}px; top: ${TB}px; width: ${2.5 * WK}px; height: 58px; border-radius: 12px; background: #ddefe6; }
    #s-short span { position: absolute; left: 18px; top: 0; font-size: 28px; line-height: 58px; color: #1f7a5c; white-space: nowrap; }
    #s-check { left: ${X0 + 2.5 * WK - 30}px; top: ${TB - 2}px; width: 62px; height: 62px; }
    #s-wait { left: ${X0 + 2.5 * WK + 120}px; top: ${TB + 4}px; background: #ece7df; color: #3e3b52; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
        <!-- Maya and the counter -->
        <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
        </svg>
        <div id="s-mname" class="s-pill">Maya</div>
        <div id="s-count" class="s-abs s-ol s-hide">
          <div class="s-crow" style="top:14px"><small>PEOPLE</small><div class="s-num"><b id="s-n4" class="on">4</b><b id="s-n8">8</b><b id="s-n4b">4</b></div></div>
          <div class="s-crow" style="top:112px"><small>PAIRS</small><div class="s-num"><b id="s-n0" class="on">0</b><b id="s-n6">6</b><b id="s-n28">28</b><b id="s-n6b">6</b></div></div>
        </div>

        <!-- the team -->
        <div id="s-team" class="s-abs" style="left:0;top:0;width:1920px;height:1080px">
          <svg id="s-edges" class="s-abs" viewBox="0 0 1920 1080">
            ${oldPairs.map((p) => edge(p, "s-eo")).join("\n            ")}
            ${newPairs.map((p) => edge(p, "s-en")).join("\n            ")}
            ${TEACH.map(teachPath).join("\n            ")}
            ${TEACH.map(teachHead).join("\n            ")}
          </svg>
${PEOPLE.map(nodeHtml).join("\n")}
${[1, 3, 5, 7].map((k) => `          <div id="s-q${k}" class="s-q" style="left:${NODES[k].x + 28}px;top:${NODES[k].y - 70}px">?</div>`).join("\n")}
          <div id="s-tt2" class="s-pill s-tt" style="left:${NODES[2].x + 50}px;top:${NODES[2].y + 40}px">teaching</div>
          <div id="s-tt4" class="s-pill s-tt" style="left:${NODES[6].x - 150}px;top:${NODES[6].y - 116}px">teaching</div>
          <div id="s-bad" style="left:${NODES[5].x - 84}px;top:${NODES[5].y - 70}px">!</div>
        </div>
        <div id="s-own" class="s-abs s-hide">
          <div class="s-node">${personSvg("#ffd98a", "#6b3b1f")}</div>
          <div class="lbl">a piece of<br />their own</div>
        </div>
        <div id="s-early" class="s-pill s-hide">early</div>

        <!-- right panel -->
        <div id="s-panel" class="s-abs s-ol"></div>
        <div id="s-ptitle" class="s-abs">Christmas pre-orders</div>

        <div id="s-c1" class="s-card">
          <div class="s-big" style="position:absolute;left:0;top:10px">24</div>
          <div class="s-row" style="top:44px;left:170px;opacity:1;font-size:40px">tasks left</div>
          <div id="s-c1b" class="s-row" style="top:170px">4 people finish</div>
          <div id="s-c1c" class="s-row" style="top:218px">about <b>4 tasks a week</b></div>
          <div id="s-c1d" class="s-row" style="top:300px;color:#b8235a">needs 6 weeks. Has 3.</div>
        </div>

        <div id="s-c2" class="s-card">
          <div class="s-lab" style="left:0;top:0;color:#8a5510">MAYA'S MATH</div>
          <div id="s-m1" class="s-row" style="top:70px;font:700 46px/60px Fraunces, serif">4 people <i>→</i> 6 weeks</div>
          <div id="s-m2" class="s-row" style="top:150px;font:700 46px/60px Fraunces, serif;color:#3b37e6">8 people <i>→</i> 3 weeks?</div>
          <div id="s-m3" class="s-row" style="top:250px">twice the people,</div>
          <div id="s-m4" class="s-row" style="top:298px">half the time</div>
        </div>

        <div id="s-c3" class="s-card">
          <div class="s-pill s-week">WEEK 1</div>
          <div id="s-w1a" class="s-row" style="top:80px"><i>4 new people:</i> learning</div>
          <div id="s-w1b" class="s-row" style="top:136px"><i>Sam and Tom:</i> teaching</div>
          <div id="s-w1c" class="s-row" style="top:192px"><i>building:</i> very little</div>
          <div id="s-d1" class="s-done"><span>done: <b>1</b> task, plan said 8</span></div>
        </div>

        <div id="s-c4" class="s-card">
          <div class="s-pill s-week">WEEK 2</div>
          <div id="s-w2a" class="s-row" style="top:80px"><i>stand-up:</i> 10 → 40 min</div>
          <div id="s-w2b" class="s-row" style="top:136px"><i>2 edits clash</i> in 1 file</div>
          <div id="s-w2c" class="s-row" style="top:192px"><i>tax:</i> broken</div>
          <div id="s-w2s" class="s-stamp" style="left:220px;top:190px">WRONG</div>
          <div id="s-d2" class="s-done"><span>done: <b>3</b> tasks, plan said 8</span></div>
        </div>

        <div id="s-c5" class="s-card">
          <svg id="s-oven" viewBox="0 0 350 300">
            <rect x="10" y="20" width="330" height="270" rx="26" fill="#ece7df" stroke="#0e0c1d" stroke-width="6" />
            <rect x="10" y="20" width="330" height="60" rx="26" fill="#fff" stroke="#0e0c1d" stroke-width="6" />
            <circle cx="60" cy="50" r="13" fill="#0e0c1d" /><circle cx="110" cy="50" r="13" fill="#0e0c1d" />
            <rect x="40" y="110" width="270" height="150" rx="16" fill="#15132b" stroke="#0e0c1d" stroke-width="6" />
            <path d="M110 232 Q175 190 240 232 Z" fill="#e2ad6b" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
            <path d="M70 250 H280" stroke="#ff9d5c" stroke-width="6" stroke-linecap="round" />
          </svg>
          <div id="s-timer" class="s-pill">1 hour</div>
          <svg id="s-b1" class="s-baker" style="left:60px" viewBox="0 0 100 100">${personSvg("#fff", "#2a2140").replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg>
          <svg id="s-b2" class="s-baker" style="left:150px" viewBox="0 0 100 100">${personSvg("#fff", "#6b3b1f").replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg>
          <svg id="s-b3" class="s-baker" style="left:240px" viewBox="0 0 100 100">${personSvg("#fff", "#b9741a").replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg>
          <svg id="s-b4" class="s-baker" style="left:330px" viewBox="0 0 100 100">${personSvg("#fff", "#3e3b52").replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg>
          <div id="s-same">more bakers, <b>same hour</b></div>
        </div>

        <div id="s-c7" class="s-card">
          <div class="s-pill s-week" style="background:#b8235a">1 DEC: DEADLINE</div>
          <div class="s-lab" style="left:0;top:84px">TASKS DONE BY NOW</div>
          <div id="s-x1" class="s-row" style="top:136px"><i>Maya's plan:</i> 24</div>
          <div id="s-x2" class="s-row" style="top:192px"><i>4 people alone:</i> 12</div>
          <div id="s-x3" class="s-row" style="top:248px;color:#b8235a"><i>8 people:</i> 8</div>
          <div id="s-x4" class="s-row" style="top:320px;font-size:30px">8 people did <b>less</b> than 4.</div>
        </div>

        <div id="s-c6" class="s-card">
          <div class="s-lab" style="left:0;top:0">THE 24 TASKS</div>
          <div id="s-tiles">${tiles}</div>
          <div id="s-k10" class="s-row" style="top:356px;color:#1f7a5c">10 open pre-orders</div>
          <div id="s-k14" class="s-row" style="top:410px"><i>14 can wait for January</i></div>
        </div>

        <!-- timeline -->
        <div id="s-axis" class="s-abs"></div>
${["now", "week 1", "week 2", "week 3", "week 4", "week 5", "week 6", "week 7"].map((s, i) => `        <div class="s-tick" style="left:${X0 + i * WK - 2}px"></div><div class="s-wk" style="left:${X0 + i * WK - 80}px">${s}</div>`).join("\n")}
        <div id="s-plan" class="s-abs s-hide"><span data-layout-ignore>Maya's plan</span></div>
        <div id="s-real" class="s-abs s-ol s-hide"><div class="a"></div><div class="b"></div><span data-layout-ignore>work left, at 4 tasks a week</span></div>
        <div id="s-ext" class="s-abs s-ol s-hide"></div>
        <div id="s-later" class="s-abs s-stamp" style="font-size:34px">LATER</div>
        <div id="s-short" class="s-abs s-ol s-hide"><span data-layout-ignore>10 tasks</span></div>
        <svg id="s-check" class="s-abs s-hide" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#1f7a5c" stroke="#0e0c1d" stroke-width="5" /><path d="M19 33 L28 42 L46 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <div id="s-wait" class="s-pill s-hide">the other 14 come after</div>
        <div id="s-dueline" class="s-abs s-hide"></div>
        <div id="s-due" class="s-pill s-hide">DUE: 1 Dec</div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-r1" d="${hand(X0 + 3 * WK, TA + 25, 70, 46)}" style="stroke:#3b37e6" />
          <path id="s-r2" d="${hand(X0 + 6 * WK, TB + 29, 70, 50)}" />
          <path id="s-r3" d="${hand(NODES[5].x, NODES[5].y, 80, 80)}" />
          <path id="s-r4" d="${hand(1320 + 140, 200 + 214, 200, 40)}" style="stroke:#b8235a" />
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
      const N = ${JSON.stringify(NODES)};

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const fade = (sel, at) => tl.fromTo(sel, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, at);
      const swap = (a, b, at) => {
        tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.08);
      };
      const draw = (sel, at, d) => {
        document.querySelectorAll(sel).forEach((p, i) => {
          const L = p.getTotalLength() + 2;
          gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
          tl.set(p, { strokeDashoffset: L, opacity: 1 }, at);
          tl.to(p, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at + 0.01);
        });
      };
      const card = (sel, at) => tl.fromTo(sel, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, at);
      const cardOut = (sel, at) => tl.to(sel, { opacity: 0, x: -30, duration: 0.22, ease: "power2.in" }, at);
      const person = (k, at) => tl.fromTo("#s-p" + k, { opacity: 0, scale: 0.4, transformOrigin: N[k].x + "px " + N[k].y + "px" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, at);
      const bar = (sel, at, d) => tl.fromTo(sel, { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: d || 0.7, ease: "power3.out" }, at);

      /* ---- 1. Pre-orders due in 3 weeks; 6 weeks of work ---- */
      tl.fromTo("#s-axis", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.8, ease: "power3.out" }, 0.1);
      tl.fromTo(".s-wk, .s-tick", { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.04 }, 0.3);
      tl.fromTo("#s-ptitle", { opacity: 0.0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, 0.05);
      tl.fromTo("#s-dueline", { opacity: 0, scaleY: 0, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: 0.4, ease: "power3.out" }, t(5) - 0.1);
      pop("#s-due", t(5) + 0.1, { from: 0.4, ease: "back.out(2.2)" });
      [0, 2, 4, 6].forEach((k, i) => person(k, t(9) + i * 0.12));
      card("#s-c1", t(13) - 0.2);
      bar("#s-real", t(13), 1.0);
      fade("#s-c1b", t(14));
      fade("#s-c1c", t(14) + 0.3);
      fade("#s-c1d", t(16) - 0.1);

      /* ---- 2. Maya's math ---- */
      cardOut("#s-c1", t(20) - 0.1);
      card("#s-c2", t(20) + 0.1);
      fade("#s-m1", t(22) - 0.1);
      [1, 3, 5, 7].forEach((k, i) => person(k, t(23) + i * 0.13));
      fade("#s-m2", t(25));
      fade("#s-m3", t(26));
      fade("#s-m4", t(29));
      tl.fromTo("#s-plan", { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.7, ease: "power3.out" }, t(29) + 0.1);
      draw("#s-r1", t(32), 0.45);
      out("#s-r1", t(34) + 0.3, 0.25);

      /* ---- 3. Week 1: learn, and teach ---- */
      cardOut("#s-c2", t(34) - 0.2);
      card("#s-c3", t(34));
      [1, 3, 5, 7].forEach((k, i) => pop("#s-q" + k, t(39) + i * 0.1, { from: 0.3, ease: "back.out(2.2)" }));
      fade("#s-w1a", t(39));
      draw(".s-teach", t(53) - 0.1, 0.4);
      tl.fromTo(".s-th", { opacity: 0 }, { opacity: 1, duration: 0.15 }, t(53) + 0.3);
      pop(["#s-tt2", "#s-tt4"], t(50), { from: 0.4 });
      fade("#s-w1b", t(50));
      fade("#s-w1c", t(51) + 0.2);
      tl.fromTo("#s-d1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, t(53) + 0.1);

      /* ---- 4. Week 2: count the pairs ---- */
      out([".s-teach", ".s-th", ".s-q", "#s-tt2", "#s-tt4"], t(55) - 0.2, 0.25);
      cardOut("#s-c3", t(56) - 0.3);
      card("#s-c4", t(56));
      tl.fromTo("#s-count", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(57));
      tl.to("#s-maya, #s-mname", { opacity: 0.25, duration: 0.3 }, t(57));
      tl.to(".s-new", { opacity: 0.18, duration: 0.3, ease: "power2.inOut" }, t(57) + 0.2);
      tl.fromTo("#s-n4", { scale: 1 }, { scale: 1.25, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, t(64));
      draw(".s-eo", t(66), 0.4);
      swap("#s-n0", "#s-n6", t(67) + 0.1);
      tl.to(".s-new", { opacity: 1, duration: 0.3, ease: "power2.out" }, t(69) - 0.1);
      swap("#s-n4", "#s-n8", t(69));
      // 22 new lines, drawn fast one after another
      document.querySelectorAll(".s-en").forEach((p, i) => draw("#" + p.id, t(71) + i * 0.05, 0.3));
      swap("#s-n6", "#s-n28", t(72) + 0.2);
      tl.fromTo("#s-count", { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t(72) + 0.3);
      fade("#s-w2a", t(73));
      fade("#s-w2b", t(77) - 0.1);
      tl.fromTo("#s-w2b", { x: 0 }, { x: 8, duration: 0.06, yoyo: true, repeat: 5, ease: "none" }, t(77) + 0.35);
      fade("#s-w2c", t(83));
      draw("#s-r3", t(82), 0.4);
      pop("#s-bad", t(83) + 0.1, { from: 0.3, ease: "back.out(2.4)" });
      tl.fromTo("#s-w2s", { opacity: 0, scale: 2.2, rotation: 4 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, t(85));
      tl.fromTo("#s-d2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, t(85) + 0.3);

      /* ---- 5. Some work cannot be split ---- */
      out("#s-r3", t(86) - 0.1, 0.2);
      tl.to(["#s-team", "#s-count"], { opacity: 0.3, duration: 0.4, ease: "power2.inOut" }, t(88));
      cardOut("#s-c4", t(88));
      card("#s-c5", t(92) - 0.3);
      tl.fromTo("#s-timer", { scale: 1 }, { scale: 1.15, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t(96));
      ["#s-b1", "#s-b2", "#s-b3", "#s-b4"].forEach((b, i) => tl.fromTo(b, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.8)" }, t(100) + i * 0.16));
      fade("#s-same", t(102));
      tl.fromTo("#s-timer", { scale: 1 }, { scale: 1.15, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t(103) + 0.3);

      /* ---- 6. Plan week 3, alone week 6, with them week 7 ---- */
      cardOut("#s-c5", t(104) - 0.2);
      card("#s-c7", t(104) - 0.1);
      fade("#s-x1", t(106));
      draw("#s-r1", t(107), 0.45);
      fade("#s-x2", t(110));
      fade("#s-x3", t(115));
      fade("#s-x4", t(116) + 0.3);
      draw("#s-r2", t(113), 0.45);
      bar("#s-ext", t(117) - 0.15, 0.5);
      tl.fromTo("#s-later", { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, t(118) + 0.2);

      /* ---- 7. Cut the list; four people, on time; add early ---- */
      out(["#s-r1", "#s-r2", "#s-later", "#s-plan"], t(119), 0.3);
      cardOut("#s-c7", t(121) - 0.3);
      card("#s-c6", t(121));
      tl.to(".s-cut", { y: 120, opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.03 }, t(122));
      tl.to(".s-ess", { "--g": 1, duration: 0.3, stagger: 0.05 }, t(125));
      fade("#s-k10", t(126));
      fade("#s-k14", t(128) + 0.4);
      // the team goes back to four: the newcomers and their lines leave
      tl.to(".s-en", { opacity: 0, duration: 0.3 }, t(133));
      tl.to(".s-new, #s-bad", { opacity: 0, duration: 0.3 }, t(133));
      tl.to(["#s-team", "#s-count", "#s-maya", "#s-mname"], { opacity: 1, duration: 0.3 }, t(133));
      swap("#s-n8", "#s-n4b", t(134));
      swap("#s-n28", "#s-n6b", t(134) + 0.15);
      tl.to(["#s-real", "#s-ext"], { opacity: 0, duration: 0.3 }, t(136) - 0.1);
      bar("#s-short", t(136), 0.6);
      pop("#s-check", t(139), { from: 0.2, ease: "back.out(2.4)" });
      fade("#s-wait", t(139) + 0.4);
      pop("#s-own", t(143), { from: 0.6 });
      pop("#s-early", t(147) - 0.05, { from: 0.4, ease: "back.out(2.2)" });
      tl.fromTo("#s-own", { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t(149));

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
