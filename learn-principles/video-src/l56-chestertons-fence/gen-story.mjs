// Generates compositions/story.html for lesson 56, Chesterton's fence.
// Scene A: a fence across a country road; the camera pans past it to a cliff.
// Scene B/C/D: the "code road" with two fences (two odd lines), removed, consequences, put back with signs.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 74.5;

const INK = "#0e0c1d";
const WOOD = "#f3cf95";

// A gate across a road: 3 posts and 3 rails. viewBox 300 x 220.
const fenceSvg = (cls, ghost) => {
  const st = ghost
    ? `fill="none" stroke="#6f6b80" stroke-width="5" stroke-dasharray="12 10"`
    : `fill="${WOOD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"`;
  const posts = [20, 137, 254]
    .map((x) => `<path d="M${x} 214 V30 L${x + 13} 8 L${x + 26} 30 V214 Z" ${st} />`)
    .join("");
  const rails = [52, 112, 172].map((y) => `<rect x="6" y="${y}" width="288" height="26" rx="5" ${st} />`).join("");
  return `<svg class="${cls}" viewBox="0 0 300 220">${ghost ? posts + rails : rails + posts}</svg>`;
};

// A person, as in lesson 53. viewBox 100 x 110.
const personSvg = (shirt, hair, extra = "") => `<svg viewBox="0 0 100 110" data-layout-allow-overflow>
            <path d="M12 108 Q12 62 50 62 Q88 62 88 108 Z" fill="${shirt}" stroke="${INK}" stroke-width="5" stroke-linejoin="round" />
            <circle cx="50" cy="34" r="22" fill="#f2c9a5" stroke="${INK}" stroke-width="5" />
            <path d="M28 32 Q30 10 50 10 Q70 10 72 32 Q60 22 44 22 Q34 24 28 32 Z" fill="${hair}" stroke="${INK}" stroke-width="5" stroke-linejoin="round" />
            ${extra}
          </svg>`;

const hand = (cx, cy, rx, ry) =>
  `M${cx - rx + 4} ${cy + 2} C${cx - rx - 2} ${cy - ry - 6} ${cx + rx} ${cy - ry - 8} ${cx + rx} ${cy} C${cx + rx} ${cy + ry + 4} ${cx - rx - 6} ${cy + ry + 6} ${cx - rx} ${cy - 8}`;

// scene-A world geometry (world is 3400 wide, panned by PAN)
const CLIFF = 2650, PAN = -1100;
const FA = { x: 1110, y: 462, w: 380, h: 279 };

// code road geometry
const F1 = { x: 650, y: 560 }, F2 = { x: 1270, y: 560 }, FW = 220, FH = 161;

const queue = [0, 1, 2, 3, 4]
  .map((i) => `<div id="s-q${i}" class="s-qp s-hide" style="left:${890 + i * 86}px">${personSvg(["#a9dcc4", "#f3cf95", "#c9c6ff", "#fbe0ea", "#ece7df"][i], ["#6b3b1f", "#2a2140", "#b9741a", "#3e3b52", "#2a2140"][i])}</div>`)
  .join("\n        ");

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #s-all, #s-wrap, #s-a, #s-b { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-pill { position: absolute; height: 52px; line-height: 52px; padding: 0 24px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-stamp { position: absolute; padding: 2px 20px; color: #fff; background: #b8235a; font-size: 40px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }

    /* scene A: the country road */
    #s-world { left: 0; top: 0; width: 3400px; height: 1080px; }
    #s-land { left: 0; top: 0; width: 3400px; height: 1080px; }
    #s-fa { left: ${FA.x}px; top: ${FA.y}px; width: ${FA.w}px; height: ${FA.h}px; }
    #s-walker { left: 690px; top: 424px; width: 260px; height: 286px; }
    #s-bubble { left: 200px; top: 120px; width: 780px; height: 220px; background: #fff; border-radius: 28px; }
    #s-bubble p { position: absolute; left: 40px; font: 700 46px/1.15 "Fraunces", serif; letter-spacing: -0.01em; white-space: nowrap; }
    #s-btail { left: 660px; top: 330px; width: 80px; height: 80px; }
    #s-ck { left: 1020px; top: 50px; width: 800px; height: 380px; background: #fff; border-radius: 28px; }
    #s-ck h3 { position: absolute; left: 40px; top: 26px; font: 700 54px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-ck small { position: absolute; left: 42px; top: 92px; font-size: 28px; color: #3e3b52; font-weight: 600; white-space: nowrap; }
    #s-ck p { position: absolute; left: 40px; width: 730px; white-space: nowrap; font: 700 36px/1.22 "Fraunces", serif; color: #3b37e6; }
    #s-pana { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-pana > path { fill: none; stroke-linecap: round; opacity: 0; }
    #s-reason { left: 1330px; top: 400px; background: #b8235a; color: #fff; }

    /* scene B: the code road */
    #s-road { left: -10px; top: 640px; width: 1940px; height: 100px; background: #15132b; box-shadow: 0 0 0 5px #0e0c1d; }
    #s-road i { position: absolute; top: 46px; width: 60px; height: 8px; border-radius: 4px; background: #8480b8; }
    #s-roadlab { left: 30px; top: 664px; color: #c9c6ff; font-size: 30px; white-space: nowrap; }
    .s-f { position: absolute; width: ${FW}px; height: ${FH}px; }
    .s-f > svg { position: absolute; left: 0; top: 0; width: ${FW}px; height: ${FH}px; }
    #s-priya { left: 90px; top: 392px; width: 220px; height: 242px; }
    #s-pname { left: 128px; top: 772px; background: #c9c6ff; }
    .s-hdr { position: absolute; left: 0; top: 40px; width: 1920px; text-align: center; }
    .s-hdr > span { display: inline-block; height: 60px; line-height: 60px; padding: 0 30px; border-radius: 999px; background: #0e0c1d; color: #fff; font-size: 34px; white-space: nowrap; }
    #s-task { left: 70px; top: 150px; padding: 0 28px; height: 70px; line-height: 70px; background: #fbebd2; border-radius: 18px; font-size: 32px; white-space: nowrap; }
    #s-pass { left: 1440px; top: 150px; background: #1f7a5c; color: #fff; }
    .s-plq { position: absolute; top: 330px; height: 140px; background: #fff; border-radius: 20px; padding: 22px 26px; font: 700 34px/48px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: pre; }
    .s-plq .dim { color: #6f6b80; }
    .s-plq .kw { color: #3b37e6; }
    #s-p1 { left: 515px; width: 490px; }
    #s-p2 { left: 1200px; width: 360px; }
    .s-junk { background: #fbe0ea; color: #b8235a; }
    #s-j1 { left: 900px; top: 300px; }
    #s-j2 { left: 1470px; top: 300px; }
    #s-cursor { left: 0; top: 0; width: 52px; height: 52px; }

    /* scene C: what the fences kept out */
    #s-printer { left: 1560px; top: 236px; width: 300px; height: 150px; background: #15132b; border-radius: 22px; }
    #s-printer span { position: absolute; left: 30px; top: 30px; color: #eceaff; font-size: 30px; }
    #s-printer i { position: absolute; left: 40px; bottom: 26px; width: 220px; height: 14px; border-radius: 7px; background: #0e0c1d; box-shadow: 0 0 0 3px #8480b8; }
    #s-zz { left: 1810px; top: 196px; font: 700 40px/1 "Fraunces", serif; color: #3b37e6; }
    #s-rcpclip { left: 1580px; top: 368px; width: 260px; height: 250px; overflow: hidden; }
    #s-rcp { left: 0; top: 0; width: 260px; height: 240px; }
    #s-blank { left: 1590px; top: 470px; }
    #s-warm { left: 1450px; top: 780px; background: #fbebd2; color: #b9741a; }
    #s-till { left: 880px; top: 250px; width: 360px; height: 220px; background: #15132b; border-radius: 22px; color: #eceaff; }
    #s-till .tl { position: absolute; left: 28px; top: 22px; font-size: 30px; color: #c9c6ff; white-space: nowrap; }
    #s-till .amt { position: absolute; left: 28px; top: 70px; font: 700 64px/1.2 "JetBrains Mono", monospace; font-variant-ligatures: none; }
    #s-till .err { position: absolute; left: 28px; top: 160px; font-size: 30px; color: #ff9db5; white-space: nowrap; }
    #s-refused { left: 920px; top: 196px; }
    #s-frozen { left: 1030px; top: 492px; background: #3b37e6; }
    .s-qp { position: absolute; top: 780px; width: 80px; height: 88px; }
    .s-qp > svg { width: 80px; height: 88px; }
    #s-ben { left: 862px; top: 880px; background: #ddefe6; color: #1f7a5c; }
    #s-qlab { left: 1150px; top: 880px; background: #fbe0ea; color: #b8235a; }

    /* scene D: find out, then leave a sign */
    .s-tool { position: absolute; top: 790px; width: 560px; height: 230px; background: #fff; border-radius: 24px; }
    .s-tool h4 { position: absolute; left: 30px; top: 22px; font: 700 40px/1.15 "Fraunces", serif; letter-spacing: -0.01em; white-space: nowrap; }
    .s-tool p { position: absolute; left: 30px; top: 86px; width: 510px; font-size: 30px; line-height: 1.3; font-weight: 600; color: #3e3b52; }
    .s-tool .s-mono { font-size: 30px; color: #1f7a5c; font-weight: 700; }
    #s-t1 { left: 70px; }
    #s-t2 { left: 680px; }
    #s-t3 { left: 1290px; }
    .s-q { position: absolute; top: 470px; width: 64px; height: 64px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 40px; line-height: 64px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-qa { left: ${F1.x + FW / 2 - 32}px; }
    #s-qb { left: ${F2.x + FW / 2 - 32}px; }
    #s-gone { left: 560px; top: 160px; background: #fff; }
    #s-keep { left: 560px; top: 240px; background: #ddefe6; color: #1f7a5c; }
    .s-sign { position: absolute; top: 470px; width: 480px; height: 112px; background: #fff7e6; border-radius: 12px; padding: 12px 22px; font-size: 30px; line-height: 1.25; white-space: nowrap; }
    .s-sign b { color: #1f7a5c; }
    .s-sign i { position: absolute; top: 10px; width: 14px; height: 14px; border-radius: 50%; background: #0e0c1d; }
    #s-sg1 { left: ${F1.x + FW / 2 - 240}px; }
    #s-sg2 { left: ${F2.x + FW / 2 - 240}px; }
    #s-cmt { left: 360px; top: 830px; width: 1200px; height: 170px; background: #15132b; border-radius: 24px; padding: 30px 40px; font: 700 34px/56px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; color: #a9e8c8; white-space: pre; }

    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks > path { fill: none; stroke: #b8235a; stroke-width: 7; stroke-linecap: round; opacity: 0; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
        <!-- ============ scene A: the fence on the country road ============ -->
        <div id="s-a">
          <div id="s-world" class="s-abs" data-layout-allow-overflow>
            <svg id="s-land" class="s-abs" viewBox="0 0 3400 1080" data-layout-allow-overflow>
              <circle cx="300" cy="170" r="70" fill="#fbebd2" stroke="${INK}" stroke-width="5" />
              <path d="M-20 640 C200 420 420 430 640 560 C820 380 1100 400 1300 560 C1500 430 1800 420 2000 560 C2200 450 2450 470 ${CLIFF} 600 V640 H-20 Z" fill="#ece7df" stroke="${INK}" stroke-width="5" stroke-linejoin="round" />
              <path d="M-20 640 C300 520 560 540 860 620 C1150 530 1500 540 1800 620 C2050 560 2400 560 ${CLIFF} 620 V640 Z" fill="#ddefe6" stroke="${INK}" stroke-width="5" stroke-linejoin="round" />
              <rect x="-20" y="740" width="${CLIFF + 20}" height="360" fill="#ddefe6" />
              <path d="M-20 640 H${CLIFF} M-20 740 H${CLIFF}" stroke="${INK}" stroke-width="6" />
              <rect x="-20" y="643" width="${CLIFF + 20}" height="94" fill="#ece7df" />
              <path d="M-20 690 H${CLIFF - 20}" stroke="#fff" stroke-width="8" stroke-dasharray="50 40" />
              <path d="M${CLIFF} 600 L${CLIFF + 30} 700 L${CLIFF + 10} 800 L${CLIFF + 60} 900 L${CLIFF + 40} 1100" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round" />
              <path d="M${CLIFF} 600 L${CLIFF + 30} 700 L${CLIFF + 10} 800 L${CLIFF + 60} 900 L${CLIFF + 40} 1100 H-20 V1100" fill="none" />
              <rect x="${CLIFF + 50}" y="930" width="800" height="160" fill="#e6e3ff" />
              <path d="M${CLIFF + 60} 930 H3400" stroke="${INK}" stroke-width="5" />
              <path d="M${CLIFF + 140} 990 q20 -14 40 0 q20 14 40 0 M${CLIFF + 340} 1020 q20 -14 40 0 q20 14 40 0 M${CLIFF + 540} 985 q20 -14 40 0 q20 14 40 0" fill="none" stroke="#3b37e6" stroke-width="5" stroke-linecap="round" />
            </svg>
            <div id="s-fa" class="s-abs s-hide">${fenceSvg("s-fsvg", false)}</div>
          </div>
          <div id="s-walker" class="s-abs s-hide">${personSvg("#f3cf95", "#3e3b52", `<rect x="58" y="58" width="30" height="40" rx="4" fill="#fff" stroke="${INK}" stroke-width="5" transform="rotate(14 73 78)" /><path d="M66 70 h14 M65 80 h14" stroke="${INK}" stroke-width="4" transform="rotate(14 73 78)" />`)}</div>
          <div id="s-bubble" class="s-abs s-ol s-hide">
            <p id="s-b1" style="top:34px">"I don't see the use of this.</p>
            <p id="s-b2" class="s-hide" style="top:110px">Let us clear it away."</p>
          </div>
          <svg id="s-btail" class="s-abs s-hide" viewBox="0 0 80 80"><path d="M6 0 L40 70 L60 0" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round" /><rect x="0" y="0" width="80" height="6" fill="#fff" /></svg>
          <div id="s-ck" class="s-abs s-ol s-hide">
            <h3 id="s-ckn">G.K. Chesterton</h3>
            <small id="s-cks">The Thing, 1929</small>
            <p id="s-c1" class="s-hide" style="top:150px">"If you don't see the use of it,</p>
            <p id="s-c1b" class="s-hide" style="top:198px">I certainly won't let you clear it away.</p>
            <p id="s-c2" class="s-hide" style="top:270px">Go away and think."</p>
          </div>
          <svg id="s-pana" class="s-abs" viewBox="0 0 1920 1080">
            <path id="s-arrowA" d="M420 560 C800 480 1150 480 1470 590" stroke="#b8235a" stroke-width="7" stroke-dasharray="4 16" />
            <path id="s-headA" d="M1440 556 L1478 596 L1424 606" stroke="#b8235a" stroke-width="7" stroke-linejoin="round" />
            <path id="s-ringA" class="s-ringd" d="${hand(1580, 760, 170, 150)}" stroke="#b8235a" stroke-width="8" />
          </svg>
          <div id="s-reason" class="s-pill s-hide">the reason: a cliff</div>
        </div>

        <!-- ============ scenes B, C, D: the code road ============ -->
        <div id="s-b" class="s-hide">
          <div id="s-road" class="s-abs">${[...Array(16)].map((_, i) => `<i style="left:${300 + i * 110}px"></i>`).join("")}</div>
          <div id="s-roadlab" class="s-abs">checkout</div>
          <div class="s-hdr" id="s-h1"><span>Code has fences too</span></div>
          <div class="s-hdr s-hide" id="s-h2"><span>Next morning</span></div>
          <div class="s-hdr s-hide" id="s-h3"><span>Find out why it is there</span></div>
          <div id="s-priya" class="s-abs s-hide">${personSvg("#c9c6ff", "#2a2140")}</div>
          <div id="s-pname" class="s-pill s-hide">Priya</div>
          <div id="s-task" class="s-abs s-ol s-hide">Task: make checkout quicker</div>

          <div id="s-g1" class="s-f s-hide" style="left:${F1.x}px;top:${F1.y}px">${fenceSvg("", true)}</div>
          <div id="s-g2" class="s-f s-hide" style="left:${F2.x}px;top:${F2.y}px">${fenceSvg("", true)}</div>
          <div id="s-f1" class="s-f s-hide" style="left:${F1.x}px;top:${F1.y}px">${fenceSvg("", false)}</div>
          <div id="s-f2" class="s-f s-hide" style="left:${F2.x}px;top:${F2.y}px">${fenceSvg("", false)}</div>
          <div id="s-p1" class="s-plq s-ol s-hide"><span class="kw">if</span> order.total == 0:
    <span class="kw">return</span></div>
          <div id="s-p2" class="s-plq s-ol s-hide"><span class="dim">printer.wake()</span>
time.sleep(4)</div>
          <div id="s-j1" class="s-pill s-junk s-hide">junk?</div>
          <div id="s-j2" class="s-pill s-junk s-hide">junk?</div>
          <div id="s-pass" class="s-pill s-hide">✓ all tests pass</div>

          <!-- C: consequences -->
          <div id="s-printer" class="s-abs s-ol s-hide"><span>old printer</span><i></i></div>
          <div id="s-zz" class="s-abs s-hide">z z</div>
          <div id="s-rcpclip" class="s-abs">
            <svg id="s-rcp" class="s-abs" data-layout-allow-overflow viewBox="0 0 260 240"><path d="M10 0 H250 V220 l-15 -12 -15 12 -15 -12 -15 12 -15 -12 -15 12 -15 -12 -15 12 -15 -12 -15 12 -15 -12 -15 12 -15 -12 -15 12 -15 -12 -15 12 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round" /></svg>
          </div>
          <div id="s-blank" class="s-stamp s-hide">BLANK</div>
          <div id="s-warm" class="s-pill s-hide">needs 4 s to warm up</div>
          <div id="s-till" class="s-abs s-ol s-hide">
            <div class="tl">Ben: 1 free cookie</div>
            <div class="amt s-hide" id="s-amt">$0.00</div>
            <div class="err s-hide" id="s-err">payment error</div>
          </div>
          <div id="s-refused" class="s-stamp s-hide" data-layout-allow-overlap>$0 REFUSED</div>
          <div id="s-frozen" class="s-stamp s-hide" data-layout-allow-overlap>FROZEN</div>
        ${queue}
          <div id="s-ben" class="s-pill s-hide">Ben</div>
          <div id="s-qlab" class="s-pill s-hide">the queue grows</div>

          <!-- D: find out, then sign -->
          <div id="s-qa" class="s-q s-hide">?</div>
          <div id="s-qb" class="s-q s-hide">?</div>
          <div id="s-t1" class="s-tool s-ol s-hide"><h4>1. Read the history</h4><p>Sam, March: "The payment company refuses $0 charges."</p></div>
          <div id="s-t2" class="s-tool s-ol s-hide"><h4>2. Ask who wrote it</h4><p>Sam: "The old printer needs 4 s to warm up."</p></div>
          <div id="s-t3" class="s-tool s-ol s-hide"><h4>3. Write a test</h4><p><span class="s-mono">test_free_cookie</span><br />fails without the line</p></div>
          <div id="s-gone" class="s-pill s-hide">Reason gone? Remove it.</div>
          <div id="s-keep" class="s-pill s-hide">Still true? Nail up a sign.</div>
          <div id="s-sg1" class="s-sign s-ol s-hide"><i style="left:12px"></i><i style="right:12px"></i><b>Why:</b> the payment company<br />refuses $0 charges</div>
          <div id="s-sg2" class="s-sign s-ol s-hide"><i style="left:12px"></i><i style="right:12px"></i><b>Why:</b> the old printer<br />needs 4 s to warm up</div>
          <div id="s-cmt" class="s-abs s-ol s-hide"><span id="s-cm1" class="s-hide"># The payment company refuses $0 charges.</span>
<span id="s-cm2" class="s-hide"># The old printer needs 4 s to warm up.</span></div>

          <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
            <path id="s-rg2" d="${hand(F2.x + FW / 2, F2.y + 80, 150, 110)}" />
            <path id="s-rg1" d="${hand(F1.x + FW / 2, F1.y + 80, 150, 110)}" />
          </svg>
          <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round" /></svg>
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
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const draw = (sel, at, d) => {
        const p = document.querySelector(sel);
        const L = p.getTotalLength() + 2;
        tl.fromTo(sel, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out" }, at);
        tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.05 }, at);
      };
      const stamp = (sel, at, rot) => tl.fromTo(sel, { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: rot || -7, duration: 0.3, ease: "power4.in" }, at);

      /* ---- A1. A road, a fence, a man with a clipboard ---- */
      tl.fromTo("#s-fa", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out" }, t(8) - 0.1);
      tl.fromTo("#s-walker", { opacity: 0, x: -300 }, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, t(14) - 0.2);
      tl.fromTo("#s-bubble", { opacity: 0, scale: 0.7, transformOrigin: "60% 100%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, t(20) - 0.15);
      tl.fromTo("#s-btail", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(20));
            tl.fromTo("#s-b2", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, t(27));
      tl.to("#s-fa", { rotation: -3, transformOrigin: "50% 100%", duration: 0.09, yoyo: true, repeat: 5, ease: "sine.inOut" }, t(29));

      /* ---- A2. Chesterton's answer ---- */
      out(["#s-bubble", "#s-btail"], t(32) - 0.2, 0.3);
      tl.fromTo("#s-ck", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(33) - 0.1);
            tl.fromTo("#s-c1", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, t(39) - 0.1);
      tl.fromTo("#s-c1b", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, t(47) - 0.1);
      tl.fromTo("#s-c2", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, t(55) - 0.1);

      /* ---- A3. Walk past the fence: a cliff ---- */
      out("#s-ck", t(59) - 0.3, 0.3);
      tl.to("#s-world", { x: ${PAN}, duration: 1.9, ease: "power2.inOut" }, t(59));
      tl.to("#s-walker", { x: ${PAN}, duration: 1.9, ease: "power2.inOut" }, t(59));
      tl.fromTo("#s-arrowA", { opacity: 0 }, { opacity: 1, duration: 0.4 }, t(65) - 0.1);
      tl.fromTo("#s-headA", { opacity: 0 }, { opacity: 1, duration: 0.15 }, t(65) + 0.45);
      pop("#s-reason", t(66) + 0.1, { from: 0.4 });
      draw("#s-ringA", t(72) - 0.1, 0.5);

      /* ---- B1. Code has fences too ---- */
      tl.to("#s-a", { opacity: 0, y: -40, duration: 0.4, ease: "power3.in" }, t(74) + 0.1);
      tl.fromTo("#s-b", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, t(74) + 0.4);
      tl.fromTo("#s-road", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "expo.out" }, t(74) + 0.4);
      tl.fromTo("#s-h1", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(75) + 0.3);
      tl.fromTo("#s-priya", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(77) - 0.1);
      pop("#s-pname", t(77) + 0.1, { from: 0.4 });
      tl.fromTo("#s-task", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(81) - 0.1);
      tl.fromTo("#s-f1", { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out" }, t(85) - 0.1);
      tl.fromTo("#s-f2", { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out" }, t(85) + 0.15);
      pop("#s-p1", t(88) - 0.05, { from: 0.7 });
      pop("#s-p2", t(95) - 0.05, { from: 0.7 });
      pop("#s-j1", t(104), { from: 0.3, ease: "back.out(2.4)" });
      pop("#s-j2", t(105), { from: 0.3, ease: "back.out(2.4)" });

      /* ---- B2. She deletes both. Tests pass ---- */
      tl.fromTo("#s-cursor", { opacity: 0, x: 400, y: 1000 }, { opacity: 1, x: 760, y: 420, duration: 0.6, ease: "power3.out" }, t(106) - 0.55);
      tl.set(["#s-g1", "#s-g2"], { opacity: 1 }, t(107) + 0.05);
      tl.to(["#s-f1", "#s-p1", "#s-j1"], { opacity: 0, y: -260, rotation: -14, duration: 0.45, ease: "power3.in" }, t(107));
      tl.to("#s-cursor", { x: 1380, y: 420, duration: 0.35, ease: "power2.inOut" }, t(107) + 0.15);
      tl.to(["#s-f2", "#s-p2", "#s-j2"], { opacity: 0, y: -260, rotation: 14, duration: 0.45, ease: "power3.in" }, t(108) + 0.2);
      tl.to("#s-cursor", { opacity: 0, x: 1600, y: 200, duration: 0.5, ease: "power2.in" }, t(109));
      pop("#s-pass", t(111) - 0.05, { from: 0.4 });

      /* ---- C1. Next morning: blank receipt ---- */
      out(["#s-task", "#s-pass", "#s-h1"], t(114) - 0.3, 0.3);
      tl.fromTo("#s-h2", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(114));
      tl.fromTo("#s-printer", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(117) - 0.2);
      tl.fromTo("#s-zz", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, t(117));
      tl.fromTo("#s-rcp", { y: -250 }, { y: 0, duration: 0.8, ease: "power2.out" }, t(118));
      stamp("#s-blank", t(120) - 0.1, -8);
      draw("#s-rg2", t(123) - 0.2, 0.5);
      pop("#s-warm", t(129) - 0.2, { from: 0.4 });

      /* ---- C2. Ben's free cookie: $0, refused, frozen ---- */
      pop("#s-q0", t(132) - 0.1, { from: 0.5 });
      pop("#s-ben", t(132) + 0.1, { from: 0.4 });
      tl.fromTo("#s-till", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(135) - 0.2);
      pop("#s-amt", t(139), { from: 1.6, ease: "back.out(2)" });
      draw("#s-rg1", t(139) + 0.3, 0.5);
      tl.fromTo("#s-err", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(144) - 0.1);
      stamp("#s-refused", t(144) - 0.05, -6);
      stamp("#s-frozen", t(149) - 0.1, 5);
      tl.to("#s-till", { x: 6, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, t(149) + 0.2);
      ["#s-q1", "#s-q2", "#s-q3", "#s-q4"].forEach((q, i) => pop(q, t(149) + 0.15 + i * 0.12, { from: 0.4, d: 0.3 }));
      pop("#s-qlab", t(149) + 0.4, { from: 0.4, d: 0.3 });

      /* ---- D1. Before you remove a fence, find out why ---- */
      out(["#s-printer", "#s-zz", "#s-rcp", "#s-blank", "#s-warm", "#s-till", "#s-refused", "#s-frozen", "#s-q0", "#s-q1", "#s-q2", "#s-q3", "#s-q4", "#s-ben", "#s-qlab", "#s-rg1", "#s-rg2", "#s-h2"], t(150) + 0.15, 0.35);
      tl.fromTo("#s-h3", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(156) - 0.1);
      tl.fromTo(["#s-f1", "#s-f2"], { opacity: 0, y: -120, rotation: 0 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "bounce.out", stagger: 0.15, immediateRender: false }, t(155) - 0.25);
      tl.set(["#s-g1", "#s-g2"], { opacity: 0 }, t(155) + 0.3);
      pop(["#s-qa", "#s-qb"], t(158), { from: 0.3, ease: "back.out(2.4)" });
      out("#s-pname", t(162) - 0.35, 0.25);
      tl.fromTo("#s-t1", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t(162) - 0.1);
      tl.fromTo("#s-t2", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t(166) - 0.1);
      tl.fromTo("#s-t3", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t(172) - 0.1);

      /* ---- D2. Reason gone? Remove. Still true? A sign that says why ---- */
      out(["#s-qa", "#s-qb"], t(175) - 0.2, 0.3);
      tl.fromTo("#s-gone", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(177) - 0.1);
      tl.fromTo("#s-keep", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(183) - 0.1);
      tl.fromTo("#s-sg1", { opacity: 0, y: -160, rotation: -10 }, { opacity: 1, y: 0, rotation: -2, duration: 0.4, ease: "power4.in" }, t(184) - 0.1);
      tl.fromTo("#s-sg2", { opacity: 0, y: -160, rotation: 10 }, { opacity: 1, y: 0, rotation: 2, duration: 0.4, ease: "power4.in" }, t(187) - 0.25);
      out(["#s-gone", "#s-keep", "#s-t1", "#s-t2", "#s-t3"], t(188) - 0.2, 0.25);
      tl.fromTo("#s-cmt", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(189) - 0.05);
            tl.fromTo("#s-cm1", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(189) + 0.2);
      tl.fromTo("#s-cm2", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(191));

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.3, ease: "power2.in" }, ${END} - 0.35);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;

fs.writeFileSync(path.join(here, "compositions/story.html"), html);
console.log("story.html written");
