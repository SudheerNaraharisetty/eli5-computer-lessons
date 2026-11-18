// Generates compositions/story.html for lesson 44. Geometry (file boxes, arrows clipped to
// box edges, hairball and ring layouts) is computed here so the two layouts stay consistent.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 60.0; // story scene length (the takeaway starts here)

const CW = 16.8, BH = 60;
// label, hairball [cx, cy, rot], ring [cx, cy]
const F = {
  tax: ["tax.py", [330, 230, -3], [651, 566]],
  web: ["website.py", [1050, 760, 2], [720, 186]],
  db: ["database.py", [240, 700, 3], [990, 186]],
  place: ["place_order.py", [760, 330, -2], [430, 340]],
  order: ["order.py", [1080, 300, 3], [465, 566]],
  printer: ["printer.py", [500, 130, -2], [400, 930]],
  refund: ["refund_sale.py", [420, 930, 2], [900, 770]],
  card: ["card_payment.py", [1100, 520, -3], [900, 930]],
  points: ["points.py", [840, 940, 3], [846, 566]],
  till: ["till_screen.py", [900, 150, -2], [210, 186]],
};
const EXTRA = {
  phone: ["phone_app.py", [480, 186]],
  cloud: ["cloud_db.py", [990, 186]],
};
const wOf = (label) => Math.round(label.length * CW + 28);
// id, from, to, kind
const A = [
  ["a1", "tax", "web", "out", true],
  ["a2", "web", "db", "level", true],
  ["a3", "db", "tax", "in", true],
  ["a5", "order", "printer", "out"],
  ["a6", "refund", "card", "out"],
  ["a7", "place", "tax", "in"],
  ["a8", "place", "order", "in"],
  ["a9", "refund", "points", "in"],
  ["a11", "place", "till", "out"],
  ["a12", "web", "place", "in"],
];
const r1 = (n) => Math.round(n * 10) / 10;
function seg(aLabel, a, bLabel, b) {
  const clip = (c, w, o, gap) => {
    const dx = o[0] - c[0], dy = o[1] - c[1];
    const hw = w / 2 + gap, hh = BH / 2 + gap;
    const t = Math.min(dx ? hw / Math.abs(dx) : 1e9, dy ? hh / Math.abs(dy) : 1e9);
    return [r1(c[0] + dx * t), r1(c[1] + dy * t)];
  };
  const p = clip(a, wOf(aLabel), b, 10), q = clip(b, wOf(bLabel), a, 24);
  return { x1: p[0], y1: p[1], x2: q[0], y2: q[1] };
}
const arrows = A.map(([id, f, t, kind, loop]) => {
  const h = seg(F[f][0], F[f][1], F[t][0], F[t][1]);
  const r = seg(F[f][0], F[f][2], F[t][0], F[t][2]);
  return { id, kind, loop: !!loop, h, r, mid: [r1((r.x1 + r.x2) / 2), r1((r.y1 + r.y2) / 2)] };
});
const phoneArrow = seg(EXTRA.phone[0], EXTRA.phone[1], F.place[0], F.place[2]);

const boxes = Object.entries(F).map(([k, v]) => ({ k, label: v[0], w: wOf(v[0]), h: v[1], r: v[2] }));
const data = {
  boxes: boxes.map((b) => ({ k: b.k, hx: r1(b.h[0] - b.w / 2), hy: b.h[1] - BH / 2, rot: b.h[2], rx: r1(b.r[0] - b.w / 2), ry: b.r[1] - BH / 2 })),
  arrows,
  phone: { x: r1(EXTRA.phone[1][0] - wOf(EXTRA.phone[0]) / 2), y: EXTRA.phone[1][1] - BH / 2, a: phoneArrow },
  cloud: { x: r1(EXTRA.cloud[1][0] - wOf(EXTRA.cloud[0]) / 2), y: EXTRA.cloud[1][1] - BH / 2 },
};

// hand-drawn ring around a box
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

const marker = (id, col) => `<marker id="s-mk-${id}" markerUnits="userSpaceOnUse" markerWidth="30" markerHeight="30" refX="12" refY="15" orient="auto"><path d="M3 3 L27 15 L3 27 Z" fill="${col}" /></marker>`;

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
    .s-pill { position: absolute; height: 46px; line-height: 46px; padding: 0 22px; border-radius: 999px; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }

    /* rings */
    .s-ring { position: absolute; background: #fbf8f4; box-shadow: 0 0 0 5px #0e0c1d; opacity: 0; }
    #s-rO { left: 60px; top: 96px; width: 1200px; height: 914px; border-radius: 56px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    #s-rM { left: 200px; top: 256px; width: 920px; height: 594px; border-radius: 46px; }
    #s-rC { left: 350px; top: 416px; width: 620px; height: 274px; border-radius: 36px; }

    /* files */
    .s-f { position: absolute; left: 0; top: 0; height: 60px; line-height: 60px; text-align: center; background: #fff; border-radius: 14px; font: 700 28px/60px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; opacity: 0; }
    #s-shop { left: 480px; top: 480px; width: 360px; height: 120px; border-radius: 22px; background: #fff; text-align: center; font: 700 52px/120px "JetBrains Mono", monospace; font-variant-ligatures: none; }
    #s-f-phone, #s-f-cloud { background: #ddefe6; }
    .s-chip { position: absolute; left: 0; top: 0; height: 46px; line-height: 46px; text-align: center; border-radius: 999px; background: #ffd98a; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-loop { left: 440px; top: 520px; padding: 4px 22px; background: #b8235a; color: #fff; font-size: 40px; letter-spacing: 0.08em; border-radius: 12px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    #s-unch { left: 566px; top: 667px; background: #1f7a5c; color: #fff; }

    /* arrows */
    #s-arrows, #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-arrows > line { stroke: #0e0c1d; stroke-width: 6; stroke-linecap: round; opacity: 0; }
    #s-marks > path { fill: none; stroke: #3b37e6; stroke-width: 7; stroke-linecap: round; opacity: 0; }

    /* right column */
    .s-card { position: absolute; left: 1320px; width: 540px; border-radius: 24px; background: #fff; }
    .s-card small { position: absolute; left: 30px; top: 18px; font-size: 28px; line-height: 1.3; letter-spacing: 0.04em; color: #3e3b52; white-space: nowrap; }
    .s-big { position: absolute; left: 30px; top: 60px; font: 700 62px/1.15 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-count, #s-top2 { top: 96px; height: 150px; }
    #s-top2 .s-big { font-size: 48px; top: 68px; }
    #s-top2 .ac { color: #3b37e6; }
    #s-ab { top: 282px; height: 112px; display: flex; align-items: center; padding: 0 26px; gap: 14px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    #s-ab b { width: 52px; height: 52px; line-height: 52px; text-align: center; border-radius: 12px; background: #e6e3ff; box-shadow: 0 0 0 4px #0e0c1d; font: 700 30px/52px "JetBrains Mono", monospace; }
    #s-ab svg { width: 64px; height: 30px; flex: none; }
    #s-imp { top: 430px; height: 200px; background: #15132b; color: #fff; }
    #s-imp div, #s-chk .s-cl { position: absolute; left: 28px; height: 52px; font: 500 28px/52px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: pre; }
    .s-dim { color: #a9a5d6; }
    .s-kw { color: #c9c6ff; }
    .s-bad { color: #ff9db5; font-weight: 700; }
    .s-good { color: #7cf0b5; font-weight: 700; }
    #s-req { top: 282px; height: 132px; background: #fbebd2; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    #s-req small { color: #8a5510; }
    #s-req .s-big { font-size: 42px; top: 62px; }
    #s-pq { left: 1475px; top: 452px; width: 230px; opacity: 0; }
    #s-pqm { left: 1692px; top: 420px; width: 50px; height: 50px; border-radius: 50%; background: #b8235a; color: #fff; font-size: 34px; line-height: 50px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-byhand { left: 1466px; top: 598px; background: #fbe0ea; color: #b8235a; }
    #s-legend { top: 282px; height: 236px; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-lr { position: absolute; left: 28px; height: 52px; display: flex; align-items: center; gap: 18px; font-size: 30px; white-space: nowrap; }
    .s-lr i { width: 52px; height: 44px; border-radius: 12px; box-shadow: 0 0 0 4px #0e0c1d; flex: none; }
    #s-zero { top: 282px; height: 190px; }
    #s-zero small { top: 40px; line-height: 1.35; }
    #s-zn { position: absolute; right: 44px; top: 20px; width: 150px; height: 150px; font: 700 130px/150px "Fraunces", serif; text-align: center; color: #1f7a5c; }
    #s-chk { top: 282px; height: 338px; background: #15132b; color: #fff; }
    #s-chkbar { left: 0; top: 0; width: 540px; height: 56px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 24px; gap: 10px; }
    #s-chkbar > i { width: 16px; height: 16px; border-radius: 50%; background: #ff6b8b; }
    #s-chkbar > i:nth-child(2) { background: #ffc24b; }
    #s-chkbar > i:nth-child(3) { background: #4bd69b; }
    #s-chkbar > span { margin-left: 12px; font: 700 28px "JetBrains Mono", monospace; color: #a9a5d6; }
    #s-never { left: 28px; top: 152px; font-size: 28px; line-height: 44px; color: #ff9db5; white-space: nowrap; }
    .s-mk { position: absolute; left: 468px; width: 44px; height: 44px; }
    .s-strike { position: absolute; left: 24px; height: 5px; border-radius: 3px; background: #ff6b8b; }
    #s-maya { left: 1574px; top: 652px; width: 262px; height: 340px; }
    #s-cursor { left: 0; top: 0; width: 48px; height: 48px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
        <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
        </svg>

        <!-- the three rings -->
        <div id="s-rO" class="s-ring"></div>
        <div id="s-rM" class="s-ring"></div>
        <div id="s-rC" class="s-ring"></div>

        <!-- arrows: "A mentions B" -->
        <svg id="s-arrows" class="s-abs" viewBox="0 0 1920 1080">
          <defs>
            ${marker("ink", "#0e0c1d")}
            ${marker("red", "#b8235a")}
            ${marker("ok", "#1f7a5c")}
          </defs>
${arrows.map((a) => `          <line id="s-${a.id}" x1="${a.h.x1}" y1="${a.h.y1}" x2="${a.h.x2}" y2="${a.h.y2}" marker-end="url(#s-mk-ink)" />`).join("\n")}
          <line id="s-a13" x1="${phoneArrow.x1}" y1="${phoneArrow.y1}" x2="${phoneArrow.x2}" y2="${phoneArrow.y2}" marker-end="url(#s-mk-ok)" style="stroke:#1f7a5c" />
        </svg>

        <!-- the program on day one -->
        <div id="s-shop" class="s-abs s-ol">shop.py</div>

        <!-- the ten files -->
${boxes.map((b) => `        <div id="s-f-${b.k}" class="s-f" style="width:${b.w}px">${b.label}</div>`).join("\n")}
        <div id="s-f-phone" class="s-f" style="width:${wOf(EXTRA.phone[0])}px">${EXTRA.phone[0]}</div>
        <div id="s-f-cloud" class="s-f" style="width:${wOf(EXTRA.cloud[0])}px">${EXTRA.cloud[0]}</div>

        <!-- rules stuck to the wrong files -->
        <div id="s-c1" class="s-chip" style="width:150px" data-layout-allow-overlap>10% off</div>
        <div id="s-c2" class="s-chip" style="width:124px" data-layout-allow-overlap>+ tax</div>
        <div id="s-c1b" class="s-chip" style="width:150px" data-layout-allow-overlap>10% off</div>
        <div id="s-c2b" class="s-chip" style="width:124px" data-layout-allow-overlap>+ tax</div>
        <div id="s-loop" class="s-abs s-hide">A LOOP</div>
        <div id="s-unch" class="s-pill s-hide">unchanged</div>

        <!-- right column -->
        <div id="s-count" class="s-card s-ol s-hide">
          <small>MAYA'S SHOP PROGRAM</small>
          <div id="s-n1" class="s-big">1 file</div>
          <div id="s-n10" class="s-big s-hide">10 files</div>
        </div>
        <div id="s-top2" class="s-card s-ol s-hide">
          <small id="s-t2a">THE FIX</small>
          <div id="s-t2A" class="s-big s-hide">Sort into 3 rings</div>
          <small id="s-t2b" class="s-hide">THE DEPENDENCY RULE</small>
          <div id="s-t2B" class="s-big s-hide">Arrows point <span class="ac">inward</span></div>
        </div>
        <div id="s-ab" class="s-card s-hide">
          <b>A</b>
          <svg viewBox="0 0 64 30"><line x1="3" y1="15" x2="44" y2="15" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" /><path d="M40 3 L62 15 L40 27 Z" fill="#0e0c1d" /></svg>
          <b>B</b>
          <span>A mentions B</span>
        </div>
        <div id="s-imp" class="s-card s-ol s-hide">
          <div id="s-i1" class="s-hide" style="top:22px"><span class="s-dim">tax.py      </span><span class="s-kw">import</span> <span class="s-bad">website</span></div>
          <div id="s-i2" class="s-hide" style="top:74px"><span class="s-dim">website.py  </span><span class="s-kw">import</span> <span class="s-bad">database</span></div>
          <div id="s-i3" class="s-hide" style="top:126px"><span class="s-dim">database.py </span><span class="s-kw">import</span> <span class="s-bad">tax</span></div>
        </div>
        <div id="s-req" class="s-card s-hide"><small>CUSTOMERS ASK</small><div class="s-big">Add a phone app</div></div>
        <div id="s-pq" class="s-f">phone_app.py</div>
        <div id="s-pqm" class="s-abs s-hide">?</div>
        <div id="s-byhand" class="s-pill s-hide">copied by hand</div>
        <div id="s-legend" class="s-card s-hide">
          <div id="s-lg1" class="s-lr s-hide" style="top:24px"><i style="background:#ffe9b8"></i>the shop's rules</div>
          <div id="s-lg2" class="s-lr s-hide" style="top:92px"><i style="background:#dcd8ff"></i>what the shop does</div>
          <div id="s-lg3" class="s-lr s-hide" style="top:160px"><i style="background:#ece7df"></i>what touches the world</div>
        </div>
        <div id="s-zero" class="s-card s-ol s-hide">
          <small>FILES CHANGED<br />IN THE CENTRE</small>
          <div id="s-zn" class="s-hide">0</div>
        </div>
        <div id="s-chk" class="s-card s-ol s-hide">
          <div id="s-chkbar" class="s-abs"><i></i><i></i><i></i><span>order.py</span></div>
          <div id="s-k1" class="s-cl s-hide" style="top:82px"><span class="s-kw">from</span> <span class="s-good">tax</span> <span class="s-kw">import</span> TAX_RATE</div>
          <svg id="s-m1" class="s-mk s-hide" style="top:86px" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="#1f7a5c" /><path d="M12 23 L19 30 L32 15" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <div id="s-never" class="s-abs s-hide">must never appear here:</div>
          <div id="s-k2" class="s-cl s-hide" style="top:204px"><span class="s-kw">import</span> <span class="s-bad">web_toolkit</span></div>
          <div id="s-k3" class="s-cl s-hide" style="top:260px"><span class="s-kw">import</span> <span class="s-bad">database</span></div>
          <svg id="s-m2" class="s-mk s-hide" style="top:208px" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="#b8235a" /><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" /></svg>
          <svg id="s-m3" class="s-mk s-hide" style="top:264px" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="#b8235a" /><path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" /></svg>
        </div>

        <!-- hand-drawn marks and pointer -->
        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-hr" d="${hand(F.order[2][0], F.order[2][1] + 3, 108, 52)}" />
          <path id="s-zr" style="stroke:#1f7a5c;stroke-width:8" d="${hand(1751, 380, 82, 80)}" />
        </svg>
        <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds), offset by the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      // Geometry from gen-story.mjs: box positions (hairball and rings) and arrow end points.
      const G = ${JSON.stringify(data)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });
      const INK = "#0e0c1d", RED = "#b8235a", OK = "#1f7a5c";

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6, rotation: o.rot || 0 }, { opacity: 1, scale: 1, rotation: o.rot || 0, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const slideIn = (sel, at) => tl.fromTo(sel, { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, at);
      const swap = (a, b, at) => {
        tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.08);
      };
      const draw = (sel, at, d) => {
        const p = document.querySelector(sel);
        const L = p.getTotalLength() + 2;
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
        tl.set(p, { strokeDashoffset: L, opacity: 1 }, at);
        tl.to(p, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at + 0.01);
      };
      const paint = (id, col, mk, at) => {
        tl.to("#s-" + id, { stroke: col, duration: 0.2, ease: "power2.out" }, at);
        tl.set("#s-" + id, { attr: { "marker-end": "url(#s-mk-" + mk + ")" } }, at);
      };
      const B = {}; G.boxes.forEach((b) => (B[b.k] = b));
      const AR = {}; G.arrows.forEach((a) => (AR[a.id] = a));
      const box = (k) => "#s-f-" + k;
      const all = G.arrows.map((a) => "#s-" + a.id);

      /* ---- 1. One file grows into ten, with arrows everywhere ---- */
      pop("#s-count", 0.15, { from: 0.85, d: 0.4, ease: "power3.out" });
      tl.fromTo("#s-shop", { scale: 1 }, { scale: 1.22, duration: 1.3, ease: "power1.in" }, t(3) - 0.2);
      tl.to("#s-shop", { scale: 1.5, opacity: 0, duration: 0.3, ease: "power2.out" }, t(5) - 0.05);
      G.boxes.forEach((b, i) => {
        tl.fromTo(box(b.k), { x: 660 - 100, y: 510, opacity: 0, scale: 0.3, rotation: 0 }, { x: b.hx, y: b.hy, opacity: 1, scale: 1, rotation: b.rot, duration: 0.7, ease: "back.out(1.2)" }, t(5) + i * 0.05);
      });
      swap("#s-n1", "#s-n10", t(5) + 0.1);
      tl.fromTo(all, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out", stagger: 0.14 }, t(10) - 0.1);

      /* ---- 2. An arrow means "mentions". Three of them make a loop ---- */
      pop("#s-ab", t(16), { from: 0.8 });
      tl.to(all.filter((s) => !AR[s.slice(3)].loop), { opacity: 0.22, duration: 0.4, ease: "power2.inOut" }, t(23) - 0.1);
      const loopStep = (id, from, to, row, at) => {
        paint(id, RED, "red", at);
        tl.to("#s-" + id, { attr: { "stroke-width": 10 }, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, at);
        tl.to([box(from), box(to)], { backgroundColor: "#fbe0ea", duration: 0.3, ease: "power2.out" }, at);
        tl.fromTo(row, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, at + 0.1);
      };
      slideIn("#s-imp", t(24) - 0.15);
      loopStep("a1", "tax", "web", "#s-i1", t(26) - 0.1);
      loopStep("a2", "web", "db", "#s-i2", t(33) - 0.1);
      loopStep("a3", "db", "tax", "#s-i3", t(38) - 0.1);
      tl.fromTo("#s-loop", { opacity: 0, scale: 2.2, rotation: 4 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, t(43) - 0.25);

      /* ---- 3. A phone app: the rules are stuck to the wrong files ---- */
      out(["#s-ab", "#s-imp", "#s-loop"], t(44) - 0.3, 0.25);
      ["a1", "a2", "a3"].forEach((id) => paint(id, INK, "ink", t(44) - 0.1));
      tl.to(all, { opacity: 0.4, duration: 0.4, ease: "power2.inOut" }, t(44) - 0.1);
      tl.to([box("tax"), box("web"), box("db")], { backgroundColor: "#ffffff", duration: 0.3 }, t(44) - 0.1);
      tl.fromTo("#s-req", { opacity: 0, y: -50, rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.5)" }, t(44));
      tl.fromTo("#s-pq", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, t(48) - 0.05);
      pop("#s-pqm", t(49) + 0.2, { from: 0.3, ease: "back.out(2.4)" });
      const c1h = { x: B.web.hx + 23, y: B.web.hy + 52 }, c2h = { x: B.db.hx + 44, y: B.db.hy + 52 };
      const c1r = { x: B.web.rx + 23, y: B.web.ry + 52 }, c2r = { x: B.db.rx + 44, y: B.db.ry + 52 };
      tl.fromTo("#s-c1", { x: c1h.x, y: c1h.y, opacity: 0, scale: 0.3 }, { x: c1h.x, y: c1h.y, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)" }, t(58) - 0.05);
      tl.to(box("web"), { backgroundColor: "#fbebd2", duration: 0.3 }, t(58));
      tl.fromTo("#s-c2", { x: c2h.x, y: c2h.y, opacity: 0, scale: 0.3 }, { x: c2h.x, y: c2h.y, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)" }, t(62) - 0.05);
      tl.to(box("db"), { backgroundColor: "#fbebd2", duration: 0.3 }, t(62));
      tl.fromTo("#s-c1b", { x: c1h.x, y: c1h.y, opacity: 0 }, { x: 1404, y: 534, opacity: 1, duration: 0.75, ease: "power3.inOut" }, t(68) - 0.1);
      tl.fromTo("#s-c2b", { x: c2h.x, y: c2h.y, opacity: 0 }, { x: 1626, y: 534, opacity: 1, duration: 0.75, ease: "power3.inOut" }, t(68) + 0.1);
      tl.fromTo("#s-byhand", { opacity: 0, scale: 2, rotation: 4 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.3, ease: "power4.in" }, t(69) + 0.2);

      /* ---- 4. The fix: the same files glide into three rings ---- */
      out(["#s-req", "#s-pq", "#s-pqm", "#s-count"], t(71) - 0.2, 0.3);
      out(["#s-c1b", "#s-c2b", "#s-byhand"], t(72) + 0.45, 0.25);
      slideIn("#s-top2", t(71) + 0.1);
      tl.fromTo("#s-t2A", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(73));
      const GL = t(73) + 0.1, GD = 1.5;
      tl.fromTo(["#s-rO", "#s-rM", "#s-rC"], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.14 }, GL + 0.2);
      G.boxes.forEach((b) => tl.to(box(b.k), { x: b.rx, y: b.ry, rotation: 0, duration: GD, ease: "power3.inOut" }, GL));
      G.arrows.forEach((a) => tl.to("#s-" + a.id, { attr: a.r, duration: GD, ease: "power3.inOut" }, GL));
      tl.to("#s-c1", { x: c1r.x, y: c1r.y, duration: GD, ease: "power3.inOut" }, GL);
      tl.to("#s-c2", { x: c2r.x, y: c2r.y, duration: GD, ease: "power3.inOut" }, GL);
      tl.to(all, { opacity: 1, duration: 0.4, ease: "power2.out" }, GL + GD - 0.2);
      // centre: the rules go home
      tl.to("#s-rC", { backgroundColor: "#ffe9b8", duration: 0.4, ease: "power2.inOut" }, t(82) - 0.1);
      slideIn("#s-legend", t(82) - 0.1);
      pop("#s-lg1", t(84), { from: 0.7 });
      tl.to("#s-c1", { x: B.order.rx + 6, y: B.order.ry + 7, scale: 0.5, opacity: 0, duration: 0.7, ease: "power3.in" }, t(84) - 0.1);
      tl.to("#s-c2", { x: B.tax.rx + 2, y: B.tax.ry + 7, scale: 0.5, opacity: 0, duration: 0.7, ease: "power3.in" }, t(84) + 0.05);
      tl.to([box("web"), box("db")], { backgroundColor: "#ffffff", duration: 0.3 }, t(84) + 0.2);
      tl.fromTo([box("order"), box("tax"), box("points")], { scale: 1 }, { scale: 1.1, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.08 }, t(85) + 0.05);
      // middle and outside
      tl.to("#s-rM", { backgroundColor: "#dcd8ff", duration: 0.4, ease: "power2.inOut" }, t(86) - 0.05);
      pop("#s-lg2", t(89), { from: 0.7 });
      tl.fromTo([box("place"), box("refund")], { scale: 1 }, { scale: 1.1, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.1 }, t(89) + 0.1);
      tl.to("#s-rO", { backgroundColor: "#ece7df", duration: 0.4, ease: "power2.inOut" }, t(93) - 0.05);
      pop("#s-lg3", t(94), { from: 0.7 });
      tl.fromTo([box("till"), box("web"), box("db"), box("card"), box("printer")], { scale: 1 }, { scale: 1.08, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.09 }, t(94) + 0.1);

      /* ---- 5. One rule: arrows point inward ---- */
      out(["#s-t2a", "#s-t2A"], t(99) - 0.2, 0.2);
      tl.fromTo("#s-t2b", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(100));
      tl.fromTo("#s-t2B", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(102) - 0.05);
      G.arrows.filter((a) => a.kind === "in").forEach((a, i) => paint(a.id, OK, "ok", t(104) + i * 0.16));
      const outs = G.arrows.filter((a) => a.kind === "out");
      outs.forEach((a, i) => {
        const at = t(108) - 0.1 + i * 0.12;
        paint(a.id, RED, "red", at);
        tl.to("#s-" + a.id, { attr: { "stroke-width": 11 }, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 3 }, at);
      });
      outs.forEach((a, i) => {
        const at = t(113) - 0.15 + i * 0.14;
        tl.to("#s-" + a.id, { rotation: 180, svgOrigin: a.mid[0] + " " + a.mid[1], duration: 0.7, ease: "back.inOut(1.5)" }, at);
        paint(a.id, OK, "ok", at + 0.45);
      });

      /* ---- 6. Drop in the phone app, swap the database: the centre does not change ---- */
      tl.fromTo("#s-f-phone", { x: G.phone.x, y: G.phone.y - 300, opacity: 0, rotation: -8 }, { x: G.phone.x, y: G.phone.y, opacity: 1, rotation: 0, duration: 0.65, ease: "back.out(1.3)" }, t(116));
      tl.fromTo("#s-a13", { opacity: 0, attr: { x2: G.phone.a.x1, y2: G.phone.a.y1 } }, { opacity: 1, attr: { x2: G.phone.a.x2, y2: G.phone.a.y2 }, duration: 0.4, ease: "power2.out" }, t(119) + 0.1);
      tl.to(box("db"), { y: B.db.ry - 150, rotation: 9, opacity: 0, duration: 0.45, ease: "power3.in" }, t(121));
      tl.fromTo("#s-f-cloud", { x: G.cloud.x, y: G.cloud.y - 300, opacity: 0, rotation: 8 }, { x: G.cloud.x, y: G.cloud.y, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.3)" }, t(123) - 0.15);
      out("#s-legend", t(124) - 0.35, 0.25);
      slideIn("#s-zero", t(124) - 0.05);
      pop("#s-unch", t(128), { from: 0.4 });
      pop("#s-zn", t(129) - 0.05, { from: 0.3, ease: "back.out(2.2)" });
      draw("#s-zr", t(129) + 0.35, 0.5);

      /* ---- 7. The check: read the imports at the top of a centre file ---- */
      out(["#s-zero", "#s-zr", "#s-unch"], t(130) - 0.3, 0.25);
      slideIn("#s-chk", t(132) - 0.1);
      tl.fromTo("#s-k1", { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "steps(14)" }, t(134));
      tl.fromTo("#s-cursor", { opacity: 0, x: 1250, y: 760 }, { opacity: 1, x: 500, y: 596, duration: 0.9, ease: "power3.out" }, t(138) - 0.2);
      draw("#s-hr", t(140), 0.5);
      pop("#s-m1", t(141) + 0.2, { from: 0.2, ease: "back.out(2.4)" });
      tl.to("#s-cursor", { opacity: 0, duration: 0.3 }, t(142));
      tl.fromTo("#s-never", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t(143));
      tl.fromTo("#s-k2", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t(145) - 0.05);
      tl.fromTo("#s-k3", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t(146));
      ["2", "3"].forEach((n, i) => {
        const at = t(147) + i * 0.18;
        pop("#s-m" + n, at + 0.1, { from: 0.2, ease: "back.out(2.4)" });
      });

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
console.log("story.html written", html.length, "bytes;", arrows.length, "arrows");
