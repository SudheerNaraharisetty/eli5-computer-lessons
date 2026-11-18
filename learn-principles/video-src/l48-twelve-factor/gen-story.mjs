// Generates compositions/story.html for lesson 48 (Twelve-factor app).
// Run: node gen-story.mjs   (from this folder)
import fs from "fs";

const W = JSON.parse(fs.readFileSync("assets/voice/starts.json", "utf8"));

const INK = "#0e0c1d", OK = "#1f7a5c", DANGER = "#b8235a", ROOT = "#8a5a2b";

/* A potted plant = the program. 220 x 280 at 1:1 pixels. */
const plant = (id, left, top, extra = "") => `
        <svg id="${id}" class="s-abs s-plant${extra}" viewBox="0 0 220 280" style="left:${left}px;top:${top}px;width:220px;height:280px" data-layout-allow-overflow>
          <g class="lv">
            <path d="M110 176 V40" stroke="${INK}" stroke-width="7" stroke-linecap="round" />
            <ellipse class="lf" cx="66" cy="112" rx="46" ry="20" transform="rotate(-28 66 112)" fill="#3fa57a" stroke="${INK}" stroke-width="5" />
            <ellipse class="lf" cx="154" cy="86" rx="46" ry="20" transform="rotate(26 154 86)" fill="#3fa57a" stroke="${INK}" stroke-width="5" />
            <ellipse class="lf" cx="110" cy="34" rx="22" ry="34" fill="#3fa57a" stroke="${INK}" stroke-width="5" />
          </g>
          <path d="M6 186 H214 L196 276 H24 Z" fill="#e6e3ff" stroke="${INK}" stroke-width="5" stroke-linejoin="round" />
          <rect x="2" y="166" width="216" height="28" rx="8" fill="#fff" stroke="${INK}" stroke-width="5" />
          <text x="110" y="242" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="28" fill="${INK}">website.py</text>
        </svg>`;

const ring = (id, x1, x2, y, col = "#ff6b8b") =>
  `<path id="${id}" class="s-ring" style="stroke:${col}" d="M${x1 - 10} ${y + 8} C${x1 - 14} ${y - 38} ${x2 + 16} ${y - 40} ${x2 + 16} ${y} C${x2 + 16} ${y + 40} ${x1 - 18} ${y + 42} ${x1 - 14} ${y - 6}" />`;
const boxRing = (id, x1, y1, x2, y2, col) =>
  `<path id="${id}" class="s-ring" style="stroke:${col}" d="M${x1 + 30} ${y1 - 4} H${x2 - 20} Q${x2 + 8} ${y1 - 2} ${x2 + 6} ${y1 + 30} V${y2 - 24} Q${x2 + 4} ${y2 + 8} ${x2 - 28} ${y2 + 6} H${x1 + 20} Q${x1 - 8} ${y2 + 4} ${x1 - 6} ${y2 - 30} V${y1 + 26} Q${x1 - 2} ${y1 - 8} ${x1 + 40} ${y1 - 8}" />`;

/* Code panel geometry: text starts at x 876, line n centre y = 206 + (n-1)*56 + 28, 18px per char. */
const lineY = (n) => 206 + (n - 1) * 56 + 28;
const colX = (c) => 876 + c * 18;

/* Phase B tags under the old computer */
const TAGS = [
  ["s-t1", 620, "localhost = this computer"],
  ["s-t2", 700, "the key, typed in the file"],
  ["s-t3", 780, "a tool installed by hand"],
  ["s-t4", 860, "a folder only it has"]
];
const roots = TAGS.map(([id, y], i) => {
  const sx = 330 + i * 36, ey = y + 32;
  return `<path id="s-root${i + 1}" class="s-root" d="M${sx} 556 C${sx + 10} ${600 + i * 30} ${210 - i * 10} ${ey - 50} 128 ${ey}" />`;
}).join("\n          ");

/* Phase D columns */
const COLS = [
  ["s-c1", 358, "Her laptop", "localhost", "sk_test_1234", false],
  ["s-c2", 960, "Test machine", "test-db.example", "sk_test_1234", false],
  ["s-c3", 1562, "The real shop", "shop-db.example", "(the real key)", true]
];
const columns = COLS.map(([id, cx, head, db, key, real]) => `
        <div id="${id}h" class="s-abs s-colh s-hide" style="left:${cx - 262}px;width:524px">${head}</div>
        <div id="${id}desk" class="s-abs s-desk s-hide" style="left:${cx - 170}px"></div>
        <div id="${id}clip" class="s-abs s-clipline s-hide" style="left:${cx - 3}px"></div>
        <div id="${id}card" class="s-abs s-card s-ol4 s-hide" style="left:${cx - 230}px">
          <small class="s-mono">DATABASE_URL</small><b class="s-mono">${db}</b>
          <small class="s-mono">PAYMENT_KEY</small><b class="${real ? "s-real" : "s-mono"}">${key}</b>
        </div>`).join("");

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    #s-all, #s-wrap, #s-pa, #s-pb, #s-pd { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-ol4 { box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono { font-family: "JetBrains Mono", monospace; font-weight: 700; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-h { font: 700 54px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-pill { height: 56px; padding: 0 24px; border-radius: 999px; font-size: 30px; line-height: 56px; white-space: nowrap; }
    .s-good { background: #ddefe6; color: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-bad { background: #fbe0ea; color: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; }

    /* phase A: shop and data centre */
    #s-maya { left: 70px; top: 560px; width: 320px; height: 416px; }
    #s-desk { left: 400px; top: 700px; width: 620px; height: 34px; background: #fbf8f4; border-radius: 10px; }
    .s-leg { position: absolute; top: 740px; width: 26px; height: 236px; background: #0e0c1d; border-radius: 6px; }
    #s-mon { left: 700px; top: 460px; width: 280px; height: 190px; background: #15132b; border-radius: 16px; }
    #s-monst { left: 818px; top: 656px; width: 44px; height: 44px; background: #0e0c1d; }
    #s-montx { left: 724px; top: 488px; width: 232px; font-size: 28px; line-height: 1.3; color: #eceaff; white-space: normal; }
    #s-works { left: 410px; top: 330px; }
    #s-rack { left: 1300px; top: 600px; width: 420px; height: 376px; background: #15132b; border-radius: 18px; }
    .s-slot { position: absolute; left: 26px; width: 368px; height: 54px; border-radius: 10px; background: #211e40; }
    .s-slot i { position: absolute; right: 18px; top: 19px; width: 16px; height: 16px; border-radius: 50%; background: #4bd69b; }
    #s-rlab { left: 1300px; top: 196px; }
    #s-dlab { left: 1300px; top: 110px; }
    #s-slab { left: 140px; top: 110px; }
    #s-arc { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-arc path { fill: none; stroke: #3b37e6; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 16 14; opacity: 0; }
    #s-copylab { left: 860px; top: 196px; background: #e6e3ff; color: #3b37e6; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-falls { left: 1240px; top: 420px; padding: 6px 26px; background: #b8235a; color: #fff; font-size: 40px; letter-spacing: 0.06em; border-radius: 12px; box-shadow: 0 0 0 5px #0e0c1d; white-space: nowrap; }

    /* phase B/C: old computer, roots, code */
    #s-title { left: 96px; top: 96px; width: 624px; height: 116px; background: #fff; border-radius: 20px; padding: 10px 26px; }
    #s-title b { display: block; font: 700 46px/1.25 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-title small { display: block; font-size: 28px; line-height: 1.3; color: #6f6b80; white-space: nowrap; }
    #s-bslab { left: 120px; top: 506px; width: 600px; height: 52px; background: #15132b; border-radius: 12px; color: #eceaff; font-size: 28px; line-height: 52px; text-align: center; white-space: nowrap; }
    .s-root { fill: none; stroke: ${ROOT}; stroke-width: 8; stroke-linecap: round; opacity: 0; }
    .s-tag { position: absolute; left: 150px; width: 570px; height: 64px; padding: 0 22px; border-radius: 14px; background: #fbe0ea; color: #b8235a; font-size: 30px; line-height: 64px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-miss { left: 560px; top: 768px; padding: 0 18px; height: 46px; line-height: 46px; border-radius: 999px; background: #b8235a; color: #fff; font-size: 28px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    #s-set { left: 120px; top: 608px; width: 600px; height: 156px; background: #fbebd2; border-radius: 18px; }
    #s-set > small { position: absolute; left: 24px; top: 10px; font-size: 28px; line-height: 1.3; color: #8a5a10; white-space: nowrap; }
    .s-key { position: absolute; left: 24px; font-size: 28px; line-height: 44px; color: #4a4760; white-space: pre; }
    .s-val { position: absolute; font-size: 28px; line-height: 44px; white-space: pre; color: #0e0c1d; }
    #s-req { left: 120px; top: 780px; width: 600px; height: 72px; background: #ddefe6; border-radius: 18px; display: flex; align-items: center; gap: 18px; padding: 0 24px; font-size: 28px; white-space: nowrap; }
    #s-req > span { color: #1f7a5c; }

    #s-code { left: 780px; top: 96px; width: 1044px; height: 888px; background: #15132b; border-radius: 24px; color: #fff; }
    #s-bar { left: 0; top: 0; width: 1044px; height: 64px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 26px; gap: 10px; }
    #s-bar > i { width: 16px; height: 16px; border-radius: 50%; background: #ff6b8b; }
    #s-bar > i:nth-child(2) { background: #ffc24b; }
    #s-bar > i:nth-child(3) { background: #4bd69b; }
    #s-bar > span { margin-left: 14px; font: 700 28px "JetBrains Mono", monospace; color: #a9a5d6; }
    #s-lines { left: 36px; top: 110px; width: 980px; font: 500 30px/56px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-ln { height: 56px; display: flex; white-space: pre; }
    .s-ln > i { width: 60px; flex: none; font-style: normal; color: #8480b8; }
    .kw { color: #c9c6ff; }
    .fn { color: #7cf0b5; }
    .st { color: #ffc24b; }
    .s-tok { position: relative; display: inline-block; height: 56px; vertical-align: top; }
    .s-tok > b { position: absolute; left: 0; top: 0; font-weight: 500; white-space: pre; }
    .s-tok > b.b { opacity: 0; color: #7cf0b5; }
    .s-chk { position: absolute; width: 48px; height: 48px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-chk > svg { position: absolute; left: 0; top: 0; width: 48px; height: 48px; }

    /* phase D: three places */
    .s-colh { top: 104px; text-align: center; font: 700 52px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-desk { top: 482px; width: 340px; height: 22px; background: #0e0c1d; border-radius: 8px; }
    .s-clipline { top: 504px; width: 6px; height: 58px; background: #0e0c1d; }
    .s-card { top: 562px; width: 460px; height: 226px; background: #fbebd2; border-radius: 18px; padding: 12px 26px; }
    .s-card small { display: block; font-size: 28px; line-height: 44px; color: #4a4760; }
    .s-card b { display: block; font-size: 30px; line-height: 50px; white-space: nowrap; }
    .s-real { font-size: 30px; color: #b8235a; }
    .s-eq { top: 268px; font: 700 80px/1 "Fraunces", serif; color: #3b37e6; }
    #s-same { left: 790px; top: 820px; }
    #s-x3 { left: 1690px; top: 196px; padding: 0 18px; height: 56px; line-height: 56px; border-radius: 999px; background: #3b37e6; color: #fff; font-size: 32px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    .s-step { top: 870px; width: 230px; height: 76px; border-radius: 999px; background: #fff; font-size: 38px; line-height: 76px; text-align: center; white-space: nowrap; }
    .s-step > i { font-style: normal; color: #3b37e6; margin-right: 12px; }
    .s-sarr { top: 897px; width: 70px; height: 22px; }

    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .s-ring { fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }
    #s-hand { fill: none; stroke: #3b37e6; stroke-width: 6; stroke-linecap: round; opacity: 0; }
    #s-handhd { fill: #3b37e6; opacity: 0; }
    #s-cursor { left: 0; top: 0; width: 48px; height: 48px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="62" data-track-index="1">
      <div id="s-wrap">

        <!-- PHASE A: works in the shop, falls over in the data centre -->
        <div id="s-pa">
          <div id="s-slab" class="s-abs s-h">In the shop</div>
          <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">
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
            <path d="M172 202 Q200 228 228 202" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
          </svg>
          <div id="s-mon" class="s-abs s-ol"></div>
          <div id="s-montx" class="s-abs">the shop's old computer</div>
          <div id="s-monst" class="s-abs"></div>
          <div id="s-desk" class="s-abs s-ol"></div>
          <div class="s-leg" style="left:430px"></div>
          <div class="s-leg" style="left:964px"></div>
          ${plant("s-pot1", 430, 420)}
          <div id="s-works" class="s-abs s-pill s-good s-hide">works perfectly</div>

          <div id="s-dlab" class="s-abs s-h s-hide">Data centre</div>
          <div id="s-rlab" class="s-abs s-pill s-hide" style="background:#fff;box-shadow:0 0 0 4px #0e0c1d">a rented computer</div>
          <div id="s-rack" class="s-abs s-ol s-hide">
            <div class="s-slot" style="top:30px"><i></i></div>
            <div class="s-slot" style="top:104px"><i></i></div>
            <div class="s-slot" style="top:178px"><i></i></div>
            <div class="s-slot" style="top:252px"><i></i></div>
          </div>
          <svg id="s-arc" class="s-abs" viewBox="0 0 1920 1080"><path id="s-arcp" d="M560 400 C800 250 1200 250 1450 330" /></svg>
          <div id="s-copylab" class="s-abs s-pill s-hide">copy the code</div>
          ${plant("s-pot2", 1400, 320, " s-hide")}
          <div id="s-falls" class="s-abs s-hide">IT FALLS OVER</div>
        </div>

        <!-- PHASE B and C: roots, then the fix -->
        <div id="s-pb" class="s-hide">
          <div id="s-title" class="s-abs s-ol s-hide"><b>The Twelve-Factor App</b><small>a checklist, 12factor.net, 2011</small></div>
          <svg class="s-abs" style="left:0;top:0;width:1920px;height:1080px" viewBox="0 0 1920 1080" data-layout-ignore>
          ${roots}
          </svg>
          ${plant("s-pot3", 310, 230)}
          <div id="s-bslab" class="s-abs s-ol">the shop's old computer</div>
          ${TAGS.map(([id, y, txt]) => `<div id="${id}" class="s-tag s-hide" style="top:${y}px">${txt}</div>`).join("\n          ")}
          <div id="s-miss" class="s-abs s-hide">missing</div>

          <div id="s-set" class="s-abs s-ol4 s-hide"><small>settings for this place</small>
            <span class="s-key s-mono" style="top:56px">DATABASE_URL</span>
            <span class="s-key s-mono" style="top:100px">PAYMENT_KEY</span>
          </div>
          <span id="s-v1" class="s-abs s-val s-mono s-hide" style="left:380px;top:664px">localhost</span>
          <span id="s-v2" class="s-abs s-val s-mono s-hide" style="left:380px;top:708px">sk_test_1234</span>
          <div id="s-req" class="s-abs s-ol4 s-hide"><span>requirements.txt</span><b class="s-mono">receipt_maker</b></div>

          <div id="s-code" class="s-abs s-ol s-hide">
            <div id="s-bar" class="s-abs"><i></i><i></i><i></i><span>website.py</span></div>
            <div id="s-lines" class="s-abs">
              <div class="s-ln"><i>1</i><span><span class="kw">import</span> receipt_maker</span></div>
              <div class="s-ln"><i>2</i><span id="s-l2" class="s-hide"><span class="kw">import</span> os</span></div>
              <div class="s-ln"><i>3</i><span>DATABASE_URL = </span><span class="s-tok" id="s-k3" style="width:26ch"><b class="a st">"localhost"</b><b class="b">os.environ["DATABASE_URL"]</b></span></div>
              <div class="s-ln"><i>4</i><span>PAYMENT_KEY = </span><span class="s-tok" id="s-k4" style="width:25ch"><b class="a st">"sk_test_1234"</b><b class="b">os.environ["PAYMENT_KEY"]</b></span></div>
              <div class="s-ln"><i>5</i></div>
              <div class="s-ln"><i>6</i><span><span class="kw">def</span> <span class="fn">note</span>(event):</span></div>
              <div class="s-ln"><i>7</i><span class="s-tok" id="s-k7" style="width:47ch"><b class="a">    log = open(<span class="st">"/Users/maya/shop/log.txt"</span>, <span class="st">"a"</span>)</b><b class="b">    print(event)</b></span></div>
              <div class="s-ln"><i>8</i><span id="s-l8">    log.write(event)</span></div>
            </div>
          </div>
          <div id="s-ck1" class="s-chk s-hide" style="left:1268px;top:${lineY(1) - 24}px"><svg viewBox="0 0 48 48"><path d="M13 25 L21 33 L35 16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg></div>
          <div id="s-ck7" class="s-chk s-hide" style="left:1196px;top:${lineY(7) - 24}px"><svg viewBox="0 0 48 48"><path d="M13 25 L21 33 L35 16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg></div>
        </div>

        <!-- PHASE D: the same code in three places -->
        <div id="s-pd" class="s-hide">
          <div id="s-same" class="s-abs s-pill s-hide" style="background:#e6e3ff;color:#3b37e6;box-shadow:0 0 0 4px #0e0c1d">the same website.py</div>
          ${plant("s-x3b", 1372, 214, " s-hide").replace("data-layout-allow-overflow", "data-layout-allow-overflow data-layout-allow-overlap")}
          ${plant("s-x3c", 1532, 214, " s-hide").replace("data-layout-allow-overflow", "data-layout-allow-overflow data-layout-allow-overlap")}
          ${COLS.map(([id, cx]) => plant(id + "p", cx - 110, 200, " s-hide")).join("")}
          <div class="s-abs s-eq s-hide" id="s-eq1" style="left:640px">=</div>
          <div class="s-abs s-eq s-hide" id="s-eq2" style="left:1242px">=</div>
          ${columns}
          <div id="s-x3" class="s-abs s-hide">× 3</div>
          <div class="s-abs s-step s-ol4 s-hide" id="s-st1" style="left:500px"><i>1</i>copy</div>
          <svg class="s-abs s-sarr s-hide" id="s-sa1" style="left:755px" viewBox="0 0 70 22"><path d="M4 11 H56 M46 2 L62 11 L46 20" fill="none" stroke="#0e0c1d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <div class="s-abs s-step s-ol4 s-hide" id="s-st2" style="left:845px"><i>2</i>set</div>
          <svg class="s-abs s-sarr s-hide" id="s-sa2" style="left:1100px" viewBox="0 0 70 22"><path d="M4 11 H56 M46 2 L62 11 L46 20" fill="none" stroke="#0e0c1d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <div class="s-abs s-step s-ol4 s-hide" id="s-st3" style="left:1190px;background:#ddefe6;color:#1f7a5c"><i>3</i>start</div>
        </div>

        <!-- rings, arrows, pointer -->
        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          ${boxRing("s-rslab", 120, 506, 720, 558, "#b8235a")}
          ${ring("s-r1", colX(7), colX(20), lineY(1))}
          ${ring("s-r3", colX(15), colX(26), lineY(3))}
          ${ring("s-r4", colX(14), colX(28), lineY(4))}
          ${ring("s-r7", colX(15), colX(41), lineY(7))}
          ${ring("s-g3", colX(15), colX(26), lineY(3), "#7cf0b5")}
          ${ring("s-g4", colX(14), colX(28), lineY(4), "#7cf0b5")}
          <path id="s-hand" d="M724 650 C760 600 740 470 768 392" />
          <polygon id="s-handhd" points="770,374 756,400 782,398" />
          ${COLS.map(([id, cx]) => boxRing(id + "r", cx - 236, 556, cx + 236, 796, "#3b37e6")).join("\n          ")}
        </svg>
        <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds). t(i) = when word i is spoken, with the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const swap = (a, b, at) => {
        tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.08);
      };
      const prep = (sel) => {
        const p = document.querySelector(sel);
        const L = p.getTotalLength() + 2;
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
        return L;
      };
      const draw = (sel, at, d) => {
        prep(sel);
        tl.set(sel, { opacity: 1 }, at);
        tl.to(sel, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at + 0.01);
      };
      const undraw = (sel, at, d) => {
        const L = document.querySelector(sel).getTotalLength() + 2;
        tl.to(sel, { strokeDashoffset: L, duration: d || 0.45, ease: "power2.in" }, at);
        tl.set(sel, { opacity: 0 }, at + (d || 0.45));
      };

      /* ---- A1. It works in the shop ---- */
      tl.fromTo("#s-pot1 .lv", { rotation: -3, svgOrigin: "110 176" }, { rotation: 3, svgOrigin: "110 176", duration: 1.2, ease: "sine.inOut" }, 0.4);
      tl.to("#s-pot1 .lv", { rotation: 0, svgOrigin: "110 176", duration: 0.8, ease: "sine.inOut" }, 1.6);
      pop("#s-works", t(14), { from: 0.4 });

      /* ---- A2. Rented computer, copy, falls over ---- */
      out("#s-works", t(16), 0.25);
      tl.fromTo("#s-dlab", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(24) - 0.1);
      tl.fromTo("#s-rack", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(18));
      pop("#s-rlab", t(20), { from: 0.5 });
      prep("#s-arcp");
      tl.set("#s-arcp", { opacity: 1 }, t(27) - 0.1);
      tl.to("#s-arcp", { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, t(27) - 0.09);
      tl.set("#s-arcp", { strokeDasharray: "16 14", strokeDashoffset: 0 }, t(27) + 0.55);
      pop("#s-copylab", t(27), { from: 0.5 });
      tl.fromTo("#s-pot2", { opacity: 0, x: -970, y: 100, scale: 0.9 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.inOut" }, t(27) + 0.15);
      // falls over: tips, leaves droop and fade to brown
      tl.to("#s-pot2", { rotation: 14, transformOrigin: "80% 100%", duration: 0.35, ease: "power2.in" }, t(32) - 0.05);
      tl.to("#s-pot2 .lv", { rotation: 34, scaleY: 0.62, svgOrigin: "110 176", duration: 0.5, ease: "power2.in" }, t(32));
      tl.to("#s-pot2 .lf", { attr: { fill: "#c8a46e" }, duration: 0.5 }, t(32));
      tl.fromTo("#s-falls", { opacity: 0, scale: 2.2, rotation: 6 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, t(32));

      /* ---- B. Why? Roots into the old machine ---- */
      tl.to("#s-pa", { opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, 13.1);
      tl.fromTo("#s-pb", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 13.35);
      tl.fromTo("#s-code", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.55, ease: "expo.out" }, t(36));
      tl.fromTo("#s-lines .s-ln", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out", stagger: 0.05 }, t(36) + 0.1);
      ["#s-root1", "#s-root2", "#s-root3", "#s-root4"].forEach((r, i) => draw(r, t(39) + i * 0.15, 0.7));
      draw("#s-rslab", t(42), 0.5);
      out("#s-rslab", t(46), 0.25);
      // 1. localhost
      pop("#s-t1", t(48) - 0.05, { from: 0.7 });
      draw("#s-r3", t(48), 0.45);
      // 2. the key typed in
      pop("#s-t2", t(53), { from: 0.7 });
      draw("#s-r4", t(54), 0.45);
      // 3. a tool installed by hand, missing
      pop("#s-t3", t(61), { from: 0.7 });
      draw("#s-r1", t(61) + 0.1, 0.45);
      pop("#s-miss", t(67), { from: 0.3, ease: "back.out(2.4)" });
      // 4. the log folder
      pop("#s-t4", t(70), { from: 0.7 });
      draw("#s-r7", t(74), 0.55);

      /* ---- C. The cure ---- */
      out(["#s-r1", "#s-r3", "#s-r4", "#s-r7"], t(79), 0.3);
      tl.fromTo("#s-title", { opacity: 0, y: -40, rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.5)" }, t(84));
      // what differs between places: the pointer comes to the values first
      tl.fromTo("#s-cursor", { opacity: 0, x: 1500, y: 980 }, { opacity: 1, x: ${colX(16)}, y: ${lineY(3) + 4}, duration: 0.7, ease: "power3.out" }, t(89));
      tl.to("#s-cursor", { x: ${colX(16)}, y: ${lineY(4) + 4}, duration: 0.4, ease: "power2.inOut" }, t(93));
      tl.to("#s-cursor", { x: 1560, y: 640, duration: 0.4, ease: "power2.inOut" }, t(97));
      tl.to("#s-cursor", { x: ${colX(16)}, y: ${lineY(3) + 4}, duration: 0.45, ease: "power2.inOut" }, t(103));
      draw("#s-g3", t(95), 0.4);
      draw("#s-g4", t(95) + 0.15, 0.4);
      // ... out of the code: the two values fly into a settings card, two roots let go
      tl.fromTo("#s-set", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, t(98) - 0.1);
      out(["#s-t1", "#s-t2"], t(98) - 0.15, 0.2);
      undraw("#s-root1", t(98), 0.4);
      undraw("#s-root2", t(98) + 0.1, 0.4);
      tl.to(["#s-k3 .a", "#s-k4 .a"], { opacity: 0, duration: 0.15 }, t(98) + 0.05);
      tl.fromTo("#s-v1", { opacity: 0, x: ${colX(16) - 380}, y: ${lineY(3) - 22 - 664}, scale: 1.07 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: "power3.inOut" }, t(98) + 0.05);
      tl.fromTo("#s-v2", { opacity: 0, x: ${colX(15) - 380}, y: ${lineY(4) - 22 - 708}, scale: 1.07 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: "power3.inOut" }, t(98) + 0.2);
      out(["#s-g3", "#s-g4"], t(101), 0.25);
      // give it a name
      swap("#s-k3 .a", "#s-k3 .b", t(105));
      tl.to("#s-cursor", { x: ${colX(15)}, y: ${lineY(4) + 4}, duration: 0.35, ease: "power2.inOut" }, t(105) + 0.15);
      swap("#s-k4 .a", "#s-k4 .b", t(105) + 0.5);
      tl.to("#s-cursor", { x: ${colX(4)}, y: ${lineY(2) + 4}, duration: 0.35, ease: "power2.inOut" }, t(105) + 0.75);
      tl.fromTo("#s-l2", { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "steps(9)" }, t(105) + 1.05);
      tl.to("#s-cursor", { opacity: 0, x: 1300, y: 60, duration: 0.5, ease: "power2.in" }, t(106) + 1.2);
      // each place hands it in at the start
      draw("#s-hand", t(110), 0.5);
      tl.fromTo("#s-handhd", { opacity: 0 }, { opacity: 1, duration: 0.15 }, t(110) + 0.45);
      // list the tools
      out("#s-t3", t(116) - 0.1, 0.2);
      out("#s-miss", t(116) - 0.1, 0.2);
      undraw("#s-root3", t(116), 0.4);
      tl.fromTo("#s-req", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, t(116));
      pop("#s-ck1", t(118), { from: 0.2, ease: "back.out(2.4)" });
      // just print what happens
      out("#s-t4", t(123) - 0.1, 0.2);
      undraw("#s-root4", t(123), 0.4);
      swap("#s-k7 .a", "#s-k7 .b", t(123));
      tl.to("#s-l8", { opacity: 0, duration: 0.2 }, t(123) + 0.1);
      pop("#s-ck7", t(124), { from: 0.2, ease: "back.out(2.4)" });

      /* ---- D. The same code in three places ---- */
      tl.to("#s-pb", { opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, t(126) - 0.45);
      out(["#s-hand", "#s-handhd"], t(126) - 0.45, 0.3);
      tl.fromTo("#s-pd", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(126) - 0.1);
      ["#s-c1p", "#s-c2p", "#s-c3p"].forEach((p, i) => pop(p, t(128) + i * 0.14, { from: 0.6 }));
      ["#s-c1desk", "#s-c2desk", "#s-c3desk"].forEach((p, i) => tl.fromTo(p, { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.35, ease: "expo.out" }, t(128) + i * 0.14));
      pop("#s-same", t(129), { from: 0.5 });
      pop("#s-eq1", t(129) + 0.2, { from: 0.3 });
      pop("#s-eq2", t(129) + 0.35, { from: 0.3 });
      [["#s-c1", t(133)], ["#s-c2", t(136)], ["#s-c3", t(141)]].forEach(([c, at]) => {
        tl.fromTo(c + "h", { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, at - 0.05);
        tl.fromTo(c + "clip", { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" }, { opacity: 1, scaleY: 1, duration: 0.25, ease: "power2.out" }, at + 0.25);
        tl.fromTo(c + "card", { opacity: 0, y: -30, rotation: -2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.6)" }, at + 0.35);
      });
      out("#s-same", t(141), 0.25);
      ["#s-c1r", "#s-c2r", "#s-c3r"].forEach((r, i) => draw(r, t(146) + i * 0.18, 0.55));
      // three copies for Christmas
      out(["#s-c1r", "#s-c2r", "#s-c3r"], t(149) - 0.1, 0.25);
      tl.fromTo("#s-x3b", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(149));
      tl.fromTo("#s-x3c", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(150));
      pop("#s-x3", t(151), { from: 0.3, ease: "back.out(2.4)" });
      pop("#s-st1", t(153), { from: 0.5 });
      tl.fromTo("#s-sa1", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25 }, t(153) + 0.3);
      pop("#s-st2", t(154), { from: 0.5 });
      tl.fromTo("#s-sa2", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25 }, t(154) + 0.3);
      pop("#s-st3", t(155), { from: 0.5, ease: "back.out(2.2)" });

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, 61.65);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/story.html", html);
console.log("wrote compositions/story.html", html.length);
