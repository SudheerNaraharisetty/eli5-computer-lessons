// Generates compositions/story.html for lesson 33. Run: node gen-story.mjs
import { readFileSync, writeFileSync } from "node:fs";

const W = JSON.parse(readFileSync("assets/voice/words.json", "utf8")).map((w) => w.start);
const C = [742, 1026, 1310, 1594]; // centre x of the four slots, arms and parts
const SLOT = ["payment", "book", "printer", "day"];
const SHELF_Y = 800, DOCK_Y = 214, UP = DOCK_Y - SHELF_Y;

/* ---- icons, 64x64 ---- */
const ic = {
  card: (d) => `<svg viewBox="0 0 64 64"><rect x="14" y="4" width="36" height="56" rx="7" fill="#fff" stroke="#0e0c1d" stroke-width="4"${d}/><rect x="20" y="11" width="24" height="15" rx="3" fill="#15132b"/><g fill="#0e0c1d"><circle cx="24" cy="35" r="2.6"/><circle cx="32" cy="35" r="2.6"/><circle cx="40" cy="35" r="2.6"/><circle cx="24" cy="44" r="2.6"/><circle cx="32" cy="44" r="2.6"/><circle cx="40" cy="44" r="2.6"/><circle cx="24" cy="53" r="2.6"/><circle cx="32" cy="53" r="2.6"/><circle cx="40" cy="53" r="2.6"/></g></svg>`,
  book: (d) => `<svg viewBox="0 0 64 64"><rect x="8" y="8" width="48" height="48" rx="6" fill="#fff" stroke="#0e0c1d" stroke-width="4"${d}/><path d="M8 24 H56 M8 40 H56 M24 8 V56" stroke="#0e0c1d" stroke-width="3.5"/></svg>`,
  note: (d) => `<svg viewBox="0 0 64 64"><rect x="12" y="6" width="42" height="52" rx="6" fill="#fff" stroke="#0e0c1d" stroke-width="4"${d}/><path d="M22 22 H44 M22 32 H44 M22 42 H36" stroke="#0e0c1d" stroke-width="3.5" stroke-linecap="round"/><path d="M6 18 H18 M6 32 H18 M6 46 H18" stroke="#0e0c1d" stroke-width="4" stroke-linecap="round"/></svg>`,
  printer: (d, f) => `<svg viewBox="0 0 64 64"><rect x="18" y="4" width="28" height="20" fill="#fff" stroke="#0e0c1d" stroke-width="4"/><rect x="6" y="22" width="52" height="26" rx="6" fill="${f || "#fff"}" stroke="#0e0c1d" stroke-width="4"${d}/><rect x="18" y="40" width="28" height="20" fill="#fff" stroke="#0e0c1d" stroke-width="4"/><path d="M24 50 H40" stroke="#0e0c1d" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  clock: () => `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="#fff" stroke="#0e0c1d" stroke-width="4"/><path d="M32 32 V16 M32 32 L43 39" stroke="#0e0c1d" stroke-width="4.5" stroke-linecap="round"/><circle cx="32" cy="32" r="3.5" fill="#0e0c1d"/></svg>`,
  leaf: () => `<svg viewBox="0 0 64 64"><rect x="8" y="10" width="48" height="48" rx="6" fill="#fff" stroke="#0e0c1d" stroke-width="4"/><rect x="8" y="10" width="48" height="15" rx="6" fill="#3b37e6" stroke="#0e0c1d" stroke-width="4"/><path d="M20 4 V16 M44 4 V16" stroke="#0e0c1d" stroke-width="4.5" stroke-linecap="round"/><path d="M22 40 H42 M32 34 V50" stroke="#0e0c1d" stroke-width="4" stroke-linecap="round"/></svg>`,
};
const DSH = ` stroke-dasharray="6 5"`;
const check = (id) => `<div class="s-ok s-hide" id="${id}"><svg viewBox="0 0 56 56"><path d="M16 29 L25 38 L41 20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg></div>`;

const real = [
  ["card machine", ic.card("")],
  ["sales book", ic.book("")],
  ["X200 printer", ic.printer("")],
  ["the clock", ic.clock()],
];
const fake = [
  ["fake payment", ic.card(DSH)],
  ["notebook", ic.note(DSH)],
  ["fake printer", ic.printer(DSH)],
  ['"Tuesday"', ic.leaf()],
];
const badge = [["real charge", "$0.01 charged"], ["real row", "+ 0.01 saved"], ["real paper", '"Paid 0.01"']];

const realCards = real.map(([name, icon], i) => `
        <div class="s-abs s-part s-real s-hide" id="s-r${i + 1}" style="left:${C[i] - 120}px;top:${SHELF_Y}px">
          <i class="s-nub"></i>${icon}<b>${name}</b>
          ${i < 3 ? `<div class="s-bdg s-hide" id="s-bd${i + 1}" data-layout-allow-overflow><span id="s-bd${i + 1}a" data-layout-allow-overlap>${badge[i][0]}</span><span id="s-bd${i + 1}b" class="s-hide s-mono" data-layout-allow-overlap>${badge[i][1]}</span></div>` : ""}
          ${check("s-ck" + (i + 1))}
        </div>`).join("");
const fakeCards = fake.map(([name, icon], i) => `
        <div class="s-abs s-part s-fake s-hide" id="s-f${i + 1}" style="left:${C[i] - 120}px;top:${DOCK_Y}px"><i class="s-nub"></i>${icon}<b${i === 3 ? ' class="s-mono"' : ""}>${name}</b></div>`).join("");
const slots = SLOT.map((s, i) => `
          <div class="s-abs s-slot s-mono s-hide" id="s-sl${i + 1}" style="left:${C[i] - 130 - 96}px">${s}<i id="s-on${i + 1}"></i></div>`).join("");
const cells = [["payment =", "CardPayment()"], ["book =", "SpreadsheetBook()"], ["printer =", "X200Printer()"], ["day =", "today()"]].map(([a, b], i) => `
          <div class="s-abs s-cell s-mono s-hide" id="s-ce${i + 1}" style="left:${C[i] - 150 - 96}px"><span>${a}</span><b>${b}</b></div>`).join("");
const arms = C.map((x, i) => `
        <svg class="s-abs s-arm s-hide" id="s-a${i + 1}" style="left:${x - 40}px" viewBox="0 0 80 176"><path d="M40 0 V132" stroke="#0e0c1d" stroke-width="30" /><path d="M40 0 V132" stroke="#c9c6ff" stroke-width="18" /><path d="M14 170 V146 Q14 128 40 128 Q66 128 66 146 V170" fill="none" stroke="#0e0c1d" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" /><path d="M14 170 V146 Q14 128 40 128 Q66 128 66 146 V170" fill="none" stroke="#c9c6ff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" /></svg>`).join("");

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
    .s-mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }

    /* Maya */
    #s-maya { left: 96px; top: 96px; width: 490px; height: 120px; background: #e6e3ff; border-radius: 22px; }
    #s-maya > svg { position: absolute; left: 14px; top: 10px; width: 100px; height: 100px; }
    #s-maya small { position: absolute; left: 130px; top: 18px; font-size: 28px; letter-spacing: 0.06em; color: #3b37e6; line-height: 1.2; white-space: nowrap; }
    #s-maya b { position: absolute; left: 130px; top: 58px; font-size: 32px; line-height: 1.3; white-space: nowrap; }

    /* the checkout */
    #s-tab { left: 124px; top: 318px; height: 62px; padding: 0 26px; background: #211e40; color: #a9a5d6; border-radius: 16px 16px 0 0; font-size: 28px; font-weight: 700; line-height: 50px; box-shadow: 0 0 0 5px #0e0c1d; }
    #s-box { left: 96px; top: 370px; width: 1728px; height: 280px; background: #15132b; border-radius: 24px; color: #fff; z-index: 2; }
    #s-plate { left: 0; top: 0; width: 1728px; height: 110px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; }
    #s-def { left: 44px; top: 30px; font-size: 34px; font-weight: 700; line-height: 50px; white-space: pre; }
    #s-def .kw { color: #c9c6ff; }
    #s-def .fn { color: #7cf0b5; }
    .s-close { top: 30px; font-size: 34px; font-weight: 700; line-height: 50px; }
    #s-cl1 { left: 500px; }
    #s-cl2 { left: 1642px; }
    .s-slot { top: 17px; width: 260px; height: 76px; border-radius: 16px; background: #0e0c1d; box-shadow: inset 0 0 0 4px #8480b8; color: #c9c6ff; font-size: 30px; font-weight: 700; line-height: 76px; text-align: center; }
    .s-slot > i { position: absolute; inset: 0; border-radius: 16px; box-shadow: inset 0 0 0 5px #7cf0b5; opacity: 0; }
    #s-price { left: 324px; top: 17px; width: 164px; height: 76px; border-radius: 16px; background: #0e0c1d; box-shadow: inset 0 0 0 4px #ffc24b; color: #ffc24b; font-size: 30px; font-weight: 700; line-height: 76px; }
    #s-price > span { position: absolute; left: 0; top: 0; width: 164px; text-align: center; }
    #s-gets { left: 44px; top: 150px; font-size: 34px; line-height: 1.25; color: #ff9db3; white-space: nowrap; }
    #s-gets small { display: block; font-size: 28px; color: #c9c6ff; font-weight: 600; }
    .s-cell { top: 146px; width: 300px; height: 100px; text-align: center; font-size: 28px; line-height: 46px; white-space: nowrap; }
    .s-cell > span { display: block; color: #c9c6ff; }
    .s-cell > b { display: block; color: #ff9db3; font-weight: 700; }
    #s-uses { left: 44px; top: 166px; font-size: 36px; line-height: 1.3; color: #7cf0b5; white-space: nowrap; }
    #s-count { left: 1040px; top: 148px; width: 644px; height: 96px; border-radius: 999px; background: #fff; color: #0e0c1d; font-size: 32px; line-height: 96px; padding-left: 36px; white-space: nowrap; }
    #s-zero { position: absolute; right: 16px; top: 10px; width: 76px; height: 76px; border-radius: 50%; background: #1f7a5c; color: #fff; font: 700 54px/72px "Fraunces", serif; text-align: center; }

    /* arms */
    .s-arm { top: 640px; width: 80px; height: 176px; z-index: 7; overflow: visible; }

    /* under the counter */
    #s-shelf { left: 96px; top: 736px; width: 1728px; height: 264px; background: #ece7df; border-radius: 24px; z-index: 1; }
    .s-shlab { left: 40px; top: 36px; font-size: 30px; letter-spacing: 0.08em; line-height: 1.3; color: #3e3b52; white-space: nowrap; }
    .s-shpill { left: 40px; top: 116px; height: 58px; padding: 0 26px; border-radius: 999px; font-size: 32px; line-height: 58px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-nobody { background: #fbe0ea; color: #b8235a; }
    #s-untouched { background: #ddefe6; color: #1f7a5c; }

    /* parts */
    .s-part { width: 240px; height: 130px; border-radius: 18px; z-index: 6; text-align: center; }
    .s-part > svg { position: absolute; left: 88px; top: 12px; width: 64px; height: 64px; }
    .s-part > b { position: absolute; left: 0; top: 82px; width: 240px; font-size: 28px; line-height: 40px; white-space: nowrap; }
    .s-part > b.s-mono { font-weight: 700; }
    .s-nub { position: absolute; left: 96px; top: 124px; width: 48px; height: 40px; border-radius: 0 0 12px 12px; }
    .s-real { background: #ddefe6; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-real .s-nub { background: #ddefe6; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-fake { background: #f6f1eb; outline: 4px dashed #0e0c1d; }
    .s-fake .s-nub { background: #f6f1eb; outline: 4px dashed #0e0c1d; }
    .s-zip { background: #e6e3ff; box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-zip .s-nub { background: #e6e3ff; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-new { position: absolute; right: -20px; top: -24px; padding: 0 16px; height: 44px; border-radius: 999px; background: #3b37e6; color: #fff; font-size: 28px; line-height: 44px; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-bdg { position: absolute; left: -6px; top: 138px; width: 252px; height: 52px; border-radius: 999px; background: #b8235a; color: #fff; font-size: 28px; line-height: 52px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    .s-bdg > span { position: absolute; left: 0; top: 0; width: 252px; text-align: center; }
    .s-bdg > span.s-mono { font-weight: 700; }
    .s-ok { position: absolute; right: -22px; top: -22px; width: 56px; height: 56px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-ok > svg { position: absolute; left: 0; top: 0; width: 56px; height: 56px; }

    /* what you can see from outside */
    #s-see { left: 420px; top: 262px; height: 62px; padding: 0 28px; border-radius: 999px; background: #fbebd2; font-size: 32px; line-height: 62px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; z-index: 8; }

    /* tax report */
    #s-report { left: 1250px; top: 96px; width: 574px; height: 226px; background: #fff; border-radius: 24px; z-index: 3; }
    #s-report small { position: absolute; left: 36px; top: 24px; font-size: 28px; letter-spacing: 0.1em; color: #b9741a; line-height: 1.3; }
    #s-report em { position: absolute; left: 36px; top: 64px; font-style: normal; font-size: 30px; font-weight: 600; color: #3e3b52; line-height: 1.3; white-space: nowrap; }
    #s-amt { left: 36px; top: 116px; width: 260px; height: 76px; font-size: 56px; font-weight: 700; line-height: 76px; }
    #s-amt > b { position: absolute; left: 0; top: 0; }
    #s-q { left: 462px; top: 108px; width: 80px; height: 80px; border-radius: 50%; background: #fbe0ea; color: #b8235a; font: 700 60px/78px "Fraunces", serif; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-cent { left: 1556px; top: 208px; width: 132px; height: 56px; border-radius: 999px; background: #b8235a; color: #fff; font-size: 30px; font-weight: 700; line-height: 56px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; z-index: 9; }

    /* the wiring */
    #s-tray { left: 620px; top: 96px; width: 1204px; height: 88px; background: #fff; border-radius: 22px; z-index: 8; }
    #s-main { left: 16px; top: 14px; height: 60px; padding: 0 22px; border-radius: 14px; background: #15132b; color: #7cf0b5; font-size: 30px; font-weight: 700; line-height: 60px; }
    #s-wiring { left: 196px; top: 14px; font-size: 36px; line-height: 60px; white-space: nowrap; }
    #s-hands { left: 420px; top: 14px; font-size: 30px; font-weight: 600; line-height: 60px; color: #3e3b52; white-space: nowrap; }
    .s-set { right: 16px; top: 14px; height: 60px; padding: 0 26px; border-radius: 999px; color: #fff; font-size: 30px; letter-spacing: 0.06em; line-height: 60px; white-space: nowrap; }
    #s-set1 { background: #1f7a5c; }
    #s-set2 { background: #0e0c1d; }
    #s-set3 { background: #3b37e6; }

    /* marks */
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; z-index: 9; }
    #s-marks path { opacity: 0; fill: none; stroke: #ff6b8b; stroke-width: 6; stroke-linecap: round; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="51" data-track-index="1">
      <div id="s-wrap">
        <div id="s-maya" class="s-abs s-ol">
          <svg viewBox="100 62 200 200">
            <circle cx="200" cy="150" r="104" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
            <circle cx="200" cy="162" r="84" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="6" />
            <path d="M117 150 Q146 66 226 78 Q280 88 284 152 Q240 112 190 120 Q150 124 117 150 Z" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
            <circle cx="150" cy="198" r="13" fill="#f5a8a0" />
            <circle cx="250" cy="198" r="13" fill="#f5a8a0" />
            <circle cx="170" cy="172" r="8" fill="#0e0c1d" />
            <circle cx="230" cy="172" r="8" fill="#0e0c1d" />
            <path d="M172 202 Q200 228 228 202" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
          </svg>
          <small>MAYA</small>
          <b id="s-m1" data-layout-allow-overlap>her checkout</b>
          <b id="s-m2" class="s-hide" data-layout-allow-overlap>tries it out</b>
          <b id="s-m3" class="s-hide" data-layout-allow-overlap>buys her own cookie</b>
          <b id="s-m4" class="s-hide" data-layout-allow-overlap>fixes checkout</b>
          <b id="s-m5" class="s-hide" data-layout-allow-overlap>writes the wiring</b>
        </div>

        <!-- under the counter -->
        <div id="s-shelf" class="s-abs s-ol s-hide">
          <div class="s-abs s-shlab" id="s-sh1" data-layout-allow-overlap>4 HELPERS</div>
          <div class="s-abs s-shlab s-hide" id="s-sh2" data-layout-allow-overlap>UNDER THE COUNTER</div>
          <div class="s-abs s-shlab s-hide" id="s-sh3" data-layout-allow-overlap>THE REAL PARTS</div>
          <div class="s-abs s-shpill s-hide" id="s-nobody" data-layout-allow-overlap>nobody looks here</div>
          <div class="s-abs s-shpill s-hide" id="s-untouched" data-layout-allow-overlap>not touched</div>
        </div>

        <!-- the checkout -->
        <div id="s-tab" class="s-abs s-mono">checkout.py</div>
        <div id="s-box" class="s-abs s-ol">
          <div id="s-plate" class="s-abs">
            <div id="s-def" class="s-abs s-mono"><span class="kw">def</span> <span class="fn">checkout</span>(</div>
            <div id="s-price" class="s-abs s-mono"><span id="s-p1" data-layout-allow-overlap>price</span><span id="s-p2" class="s-hide" data-layout-allow-overlap>$0.01</span></div>
            <div id="s-cl1" class="s-abs s-close s-mono">):</div>
            <div id="s-cl2" class="s-abs s-close s-mono s-hide">):</div>${slots}
          </div>
          <div id="s-gets" class="s-abs s-hide">gets them itself<small>inside, out of sight</small></div>${cells}
          <div id="s-uses" class="s-abs s-hide">uses only what it is handed</div>
          <div id="s-count" class="s-abs s-hide">lines changed in checkout:<div id="s-zero" class="s-hide" data-layout-allow-overflow>0</div></div>
        </div>
${arms}
${realCards}
${fakeCards}
        <div class="s-abs s-part s-zip s-hide" id="s-z3" style="left:${C[2] - 120}px;top:${DOCK_Y}px"><i class="s-nub"></i>${ic.printer("", "#c9c6ff")}<b>Zip 5 printer</b><div id="s-new">new</div></div>

        <div id="s-see" class="s-abs s-hide">all you can see from the front</div>

        <div id="s-report" class="s-abs s-ol s-hide">
          <small>TAX REPORT</small>
          <em>Sales this month</em>
          <div id="s-amt" class="s-abs s-mono"><b id="s-am1" data-layout-allow-overlap>$412.00</b><b id="s-am2" class="s-hide" data-layout-allow-overlap>$412.01</b></div>
          <div id="s-q" class="s-abs s-hide">?</div>
        </div>
        <div id="s-cent" class="s-abs s-mono s-hide">+0.01</div>

        <div id="s-tray" class="s-abs s-ol s-hide">
          <div id="s-main" class="s-abs s-mono">main.py</div>
          <div id="s-wiring" class="s-abs s-hide">the wiring</div>
          <div id="s-hands" class="s-abs s-hide">hands the parts in</div>
          <div id="s-set1" class="s-abs s-set s-hide" data-layout-allow-overlap>THE SHOP: REAL PARTS</div>
          <div id="s-set2" class="s-abs s-set s-hide" data-layout-allow-overlap>A TRY-OUT: PRETEND PARTS</div>
          <div id="s-set3" class="s-abs s-set s-hide" data-layout-allow-overlap>SHOP 2: A DIFFERENT PRINTER</div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-rprice" data-ring="502 425 106 54" />
          <path id="s-ramt" data-ring="1410 250 148 50" />
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
      const UP = ${UP};

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.2, ease: "power2.in" }, at);
      const swap = (a, b, at) => {
        tl.to(a, { opacity: 0, duration: 0.12, ease: "power2.in" }, at);
        tl.fromTo(b, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, at + 0.08);
      };

      /* hand-drawn rings: draw by real length */
      const LEN = {};
      document.querySelectorAll("#s-marks path[data-ring]").forEach((p) => {
        const [cx, cy, rx, ry] = p.dataset.ring.split(" ").map(Number);
        const k = ry * 1.34;
        p.setAttribute("d", "M" + (cx - rx) + " " + (cy + 1) + " C" + (cx - rx - 2) + " " + (cy - k) + " " + (cx + rx) + " " + (cy - k - 2) + " " + (cx + rx) + " " + (cy - 1) + " C" + (cx + rx) + " " + (cy + k) + " " + (cx - rx - 6) + " " + (cy + k + 2) + " " + (cx - rx - 4) + " " + (cy - 7));
        const L = Math.ceil(p.getTotalLength()) || 600;
        LEN["#" + p.id] = L;
        p.style.strokeDasharray = L + " " + (L + 40);
      });
      const draw = (sel, at, d) => {
        tl.set(sel, { opacity: 1 }, at);
        tl.fromTo(sel, { strokeDashoffset: LEN[sel] }, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at);
      };

      /* a part travels between the shelf and its slot */
      const dock = (n, at) => {
        tl.to("#s-r" + n, { y: UP, duration: 0.7, ease: "power3.inOut" }, at);
        tl.to("#s-on" + n, { opacity: 1, duration: 0.15 }, at + 0.6);
        tl.fromTo("#s-sl" + n, { scale: 1 }, { scale: 1.08, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1 }, at + 0.6);
      };
      const undock = (n, at) => {
        tl.to("#s-on" + n, { opacity: 0, duration: 0.12 }, at);
        tl.to("#s-r" + n, { y: 0, duration: 0.6, ease: "power3.inOut" }, at);
      };
      const dropIn = (sel, n, at) => {
        tl.fromTo(sel, { opacity: 0, y: -90 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, at);
        tl.to("#s-on" + n, { opacity: 1, duration: 0.15 }, at + 0.35);
        tl.fromTo("#s-sl" + n, { scale: 1 }, { scale: 1.08, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1 }, at + 0.35);
      };
      const liftOut = (sel, n, at) => {
        tl.to("#s-on" + n, { opacity: 0, duration: 0.12 }, at);
        tl.to(sel, { opacity: 0, y: -90, duration: 0.3, ease: "power2.in" }, at);
      };

      /* ---- 1. The checkout needs four helpers ---- */
      tl.fromTo("#s-box", { scale: 1 }, { scale: 1.02, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, t(1));
      tl.fromTo("#s-shelf", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(3) - 0.1);
      [6, 9, 12, 15].forEach((w, i) => pop("#s-r" + (i + 1), t(w) - 0.05, { from: 0.5 }));

      /* ---- 2. It gets them itself: four arms ---- */
      pop("#s-gets", t(20) - 0.05, { from: 0.8, d: 0.35 });
      tl.fromTo(".s-cell", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", stagger: 0.14 }, t(20) + 0.1);
      tl.fromTo(".s-arm", { opacity: 1, scaleY: 0, transformOrigin: "50% 0%" }, { opacity: 1, scaleY: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.13 }, t(24) - 0.1);
      tl.to(".s-real", { y: -8, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.13 }, t(24) + 0.4);
      swap("#s-sh1", "#s-sh2", t(26));
      pop("#s-nobody", t(30), { from: 0.5 });
      /* from the front: only a price */
      tl.to(["#s-shelf", ".s-real", ".s-arm", ".s-cell", "#s-gets"], { opacity: 0.4, duration: 0.5, ease: "power2.inOut" }, t(32));
      pop("#s-see", t(34) - 0.1, { from: 0.5 });
      draw("#s-rprice", t(40) - 0.1, 0.5);
      tl.fromTo("#s-price", { scale: 1 }, { scale: 1.12, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, t(41));

      /* ---- 3. Trying it out touches the real things ---- */
      out(["#s-see", "#s-rprice", "#s-nobody"], t(42) - 0.1, 0.25);
      tl.to(["#s-shelf", ".s-real", ".s-arm", ".s-cell", "#s-gets"], { opacity: 1, duration: 0.4, ease: "power2.inOut" }, t(42));
      swap("#s-m1", "#s-m2", t(44));
      [[50, 52], [54, 57], [61, 62]].forEach(([wa, wb], i) => {
        const n = i + 1;
        tl.to("#s-a" + n, { scaleY: 1.06, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 3 }, t(wa));
        tl.to("#s-r" + n, { rotation: 3, duration: 0.08, ease: "power1.inOut", yoyo: true, repeat: 5 }, t(wa) + 0.1);
        pop("#s-bd" + n, t(wb) - 0.05, { from: 0.4, d: 0.35 });
      });
      swap("#s-m2", "#s-m3", t(65));
      swap("#s-p1", "#s-p2", t(71));
      [1, 2, 3].forEach((n, i) => swap("#s-bd" + n + "a", "#s-bd" + n + "b", t(72) + i * 0.16));
      /* the cent travels to the tax report */
      pop("#s-report", t(79), { from: 0.7 });
      tl.fromTo("#s-cent", { opacity: 0, scale: 0.5, x: -596, y: 520 }, { opacity: 1, scale: 1, x: -596, y: 520, duration: 0.3, ease: "back.out(1.8)" }, t(75));
      tl.to("#s-cent", { x: 0, duration: 1.0, ease: "power1.inOut" }, t(77));
      tl.to("#s-cent", { y: 0, duration: 1.0, ease: "power2.inOut" }, t(77));
      swap("#s-am1", "#s-am2", t(77) + 1.0);
      draw("#s-ramt", t(81) + 0.1, 0.5);
      pop("#s-q", t(81) + 0.4, { from: 0.2, ease: "back.out(2.4)" });

      /* ---- 4. The fix: arms in, four slots, the wiring ---- */
      out(["#s-report", "#s-cent", "#s-ramt", "#s-bd1", "#s-bd2", "#s-bd3"], t(82) - 0.1, 0.3);
      tl.to("#s-p2", { opacity: 0, duration: 0.12, ease: "power2.in" }, t(82));
      tl.to("#s-p1", { opacity: 1, duration: 0.25, ease: "power2.out" }, t(82) + 0.1);
      swap("#s-m3", "#s-m4", t(83));
      tl.to(".s-arm", { scaleY: 0, duration: 0.4, ease: "power3.in", stagger: 0.08 }, t(84) - 0.05);
      tl.set(".s-arm", { opacity: 0 }, t(84) + 0.75);
      out([".s-cell", "#s-gets"], t(86), 0.3);
      tl.set("#s-cl1", { opacity: 0 }, t(88));
      tl.set("#s-cl2", { opacity: 1 }, t(88));
      tl.fromTo(".s-slot", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.16 }, t(89));
      tl.fromTo("#s-tray", { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.3)" }, t(96) - 0.1);
      pop("#s-wiring", t(99) - 0.05, { from: 0.6, d: 0.35 });
      swap("#s-m4", "#s-m5", t(99));
      swap("#s-sh2", "#s-sh3", t(100) - 0.2);
      tl.fromTo("#s-hands", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: "expo.out" }, t(100));
      [1, 2, 3, 4].forEach((n, i) => dock(n, t(100) + i * 0.14));
      tl.fromTo("#s-uses", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(102) + 0.3);

      /* ---- 5. Three sets of parts, one checkout ---- */
      out("#s-hands", t(104), 0.2);
      pop("#s-set1", t(106) - 0.05, { from: 0.5, d: 0.35 });
      tl.to(".s-real", { scale: 1.07, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.07 }, t(108));
      /* a try-out */
      [1, 2, 3, 4].forEach((n, i) => undock(n, t(110) - 0.1 + i * 0.07));
      swap("#s-set1", "#s-set2", t(112));
      [1, 2, 3, 4].forEach((n, i) => dropIn("#s-f" + n, n, t(113) - 0.05 + i * 0.12));
      [1, 2, 3, 4].forEach((n, i) => pop("#s-ck" + n, t(116) + i * 0.1, { from: 0.2, ease: "back.out(2.4)", d: 0.3 }));
      pop("#s-untouched", t(118), { from: 0.5, d: 0.35 });
      /* shop two */
      [1, 2, 3, 4].forEach((n, i) => liftOut("#s-f" + n, n, t(119) - 0.2 + i * 0.05));
      out([".s-ok", "#s-untouched"], t(119) - 0.1, 0.2);
      swap("#s-set2", "#s-set3", t(120));
      [1, 2, 4].forEach((n, i) => dock(n, t(120) + i * 0.1));
      dropIn("#s-z3", 3, t(123) - 0.05);
      tl.to("#s-z3", { rotation: -3, duration: 0.1, ease: "power1.inOut", yoyo: true, repeat: 3 }, t(124));
      tl.to("#s-r3", { opacity: 0.55, duration: 0.3 }, t(124));
      /* nothing changed in checkout */
      tl.fromTo("#s-count", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(125) - 0.05);
      tl.fromTo("#s-zero", { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, t(129) - 0.2);
      tl.fromTo("#s-box", { scale: 1 }, { scale: 1.015, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1 }, t(129) + 0.1);

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.26, ease: "power2.in" }, 50.72);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
writeFileSync("compositions/story.html", html);
console.log("story.html written,", html.length, "chars");
