// Generates compositions/story.html for lesson 53, Conway's law.
// Two drawings with the same geometry: the people (top row) and the software (bottom row).
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 56.6;

// geometry
const X = [110, 730, 1350], CW = 460, CH = 220;
const PY = 170, SY = 560, OFF = SY - PY; // people row top, software row top
const PM = PY + CH / 2, SM = SY + CH / 2; // line heights
const TEAMS = [
  { k: "kit", name: "Kitchen team", col: "#b9741a", shirt: "#f3cf95", people: ["baker", "Nina"], prog: "kitchen screen" },
  { k: "web", name: "Website team", col: "#3b37e6", shirt: "#c9c6ff", people: ["Priya", "Tom"], prog: "website" },
  { k: "mon", name: "Money team", col: "#1f7a5c", shirt: "#a9dcc4", people: ["accountant", "Sam"], prog: "books" },
];
const HAIR = ["#2a2140", "#6b3b1f", "#2a2140", "#b9741a", "#3e3b52", "#2a2140"];

const personSvg = (shirt, hair, hat) => `<svg class="s-pp" viewBox="0 0 100 110">
            <path d="M12 108 Q12 62 50 62 Q88 62 88 108 Z" fill="${shirt}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
            <circle cx="50" cy="34" r="22" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="5" />
            ${hat
              ? `<path d="M30 24 Q26 4 40 6 Q50 -4 60 6 Q74 4 70 24 Z" fill="#fff" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />`
              : `<path d="M28 32 Q30 10 50 10 Q70 10 72 32 Q60 22 44 22 Q34 24 28 32 Z" fill="${hair}" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />`}
          </svg>`;

const card = (t, i) => `        <div id="s-c-${t.k}" class="s-card s-ol" style="left:${X[i]}px;top:${PY}px">
          <div class="s-ct" style="background:${t.col}">${t.name}</div>
          <div class="s-in"></div>
          <div class="s-p" data-layout-allow-overflow style="left:88px">${personSvg(t.shirt, HAIR[i * 2], t.k === "kit")}<span>${t.people[0]}</span></div>
          <div class="s-p" data-layout-allow-overflow style="left:288px">${personSvg(t.shirt, HAIR[i * 2 + 1], false)}<span>${t.people[1]}</span></div>
        </div>`;

const prog = (t, i) => `        <div id="s-g-${t.k}" class="s-prog s-ol" style="left:${X[i]}px;top:${SY}px">
          <div class="s-pbar"><i></i><i></i><i></i><span>${t.prog}</span></div>
          <div class="s-stripe" style="background:${t.col}"></div>
        </div>`;

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

const G1 = X[0] + CW, G2 = X[1]; // kitchen | website gap
const G3 = X[1] + CW, G4 = X[2]; // website | money gap
const gapC = (G1 + G2) / 2, gap2C = (G3 + G4) / 2;
const ln = (id, x1, x2, y, cls) => `<path id="${id}" class="${cls}" d="M${x1 + 6} ${y} H${x2 - 6}" />`;

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
    .s-pill { position: absolute; height: 48px; line-height: 48px; padding: 0 22px; border-radius: 999px; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-lab { position: absolute; font-size: 28px; line-height: 40px; color: #3e3b52; white-space: nowrap; letter-spacing: 0.04em; }

    /* opening */
    #s-maya { left: 760px; top: 300px; width: 400px; height: 520px; }
    #s-sign { left: 610px; top: 110px; padding: 20px 38px; background: #fff; border-radius: 22px; font: 700 64px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-co { left: 1250px; top: 210px; background: #3b37e6; color: #fff; font-size: 34px; height: 56px; line-height: 56px; }

    /* people */
    #s-office { left: 700px; top: 142px; width: 1140px; height: 330px; border-radius: 36px; border: 5px dashed #3e3b52; }
    .s-card { position: absolute; width: ${CW}px; height: ${CH}px; background: #fff; border-radius: 24px; opacity: 0; }
    .s-ct { position: absolute; left: 18px; top: 16px; height: 46px; line-height: 46px; padding: 0 20px; border-radius: 999px; color: #fff; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-in { position: absolute; left: 178px; top: 128px; width: 104px; height: 8px; border-radius: 4px; background: #0e0c1d; }
    .s-p { position: absolute; top: 72px; width: 84px; height: 140px; }
    .s-p > svg { position: absolute; left: 0; top: 0; width: 84px; height: 92px; }
    .s-p > span { position: absolute; left: -58px; top: 94px; width: 200px; text-align: center; font-size: 28px; line-height: 40px; white-space: nowrap; }

    /* software */
    .s-prog { position: absolute; width: ${CW}px; height: ${CH}px; background: #15132b; border-radius: 24px; opacity: 0; }
    .s-pbar { position: absolute; left: 0; top: 0; width: ${CW}px; height: 64px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 22px; gap: 9px; }
    .s-pbar > i { width: 14px; height: 14px; border-radius: 50%; background: #ff6b8b; }
    .s-pbar > i:nth-child(2) { background: #ffc24b; }
    .s-pbar > i:nth-child(3) { background: #4bd69b; }
    .s-pbar > span { margin-left: 12px; font: 700 32px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; color: #eceaff; white-space: nowrap; }
    .s-stripe { position: absolute; left: 22px; bottom: 20px; width: 70px; height: 12px; border-radius: 6px; }

    /* links and marks */
    #s-lines, #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .s-thick { fill: none; stroke: #0e0c1d; stroke-width: 12; stroke-linecap: round; opacity: 0; }
    .s-dot { fill: none; stroke: #3e3b52; stroke-width: 7; stroke-linecap: round; stroke-dasharray: 2 20; opacity: 0; }
    .s-fix { fill: none; stroke: #1f7a5c; stroke-width: 14; stroke-linecap: round; opacity: 0; }
    #s-marks > path { fill: none; stroke: #b8235a; stroke-width: 7; stroke-linecap: round; opacity: 0; }
    #s-trace { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; opacity: 0; }
    #s-trace rect { fill: rgba(59, 55, 230, 0.06); stroke: #3b37e6; stroke-width: 7; }
    #s-trace path { fill: none; stroke: #3b37e6; stroke-width: 9; stroke-linecap: round; }
    #s-file { left: ${gapC - 30}px; top: ${SM - 78}px; width: 60px; height: 72px; }

    .s-q { position: absolute; width: 60px; height: 60px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 36px; line-height: 60px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    /* the order */
    .s-ord { position: absolute; left: 0; top: 0; height: 52px; display: flex; gap: 10px; opacity: 0; }
    .s-chip { height: 52px; line-height: 52px; padding: 0 18px; border-radius: 12px; background: #eceaff; color: #0e0c1d; font: 700 28px/52px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-tag { height: 52px; line-height: 52px; padding: 0 18px; border-radius: 12px; background: #ffd98a; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-fall { left: 0; top: 0; opacity: 0; }
    #s-lost { left: ${gapC - 70}px; top: 960px; padding: 2px 20px; background: #b8235a; color: #fff; font-size: 36px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    #s-nonote { left: ${X[0] + 250}px; top: ${SY + 160}px; background: #fbe0ea; color: #b8235a; }
    #s-ok { left: ${X[0] + CW - 40}px; top: ${SY - 26}px; width: 64px; height: 64px; }

    /* the fix */
    #s-monday { left: ${gapC - 120}px; top: 402px; background: #ddefe6; color: #1f7a5c; }
    #s-deal { left: 200px; top: 850px; width: 800px; height: 170px; background: #fff; border-radius: 24px; }
    #s-deal small { position: absolute; left: 34px; top: 22px; font-size: 28px; letter-spacing: 0.06em; color: #3b37e6; white-space: nowrap; }
    #s-deal b { position: absolute; left: 34px; top: 70px; width: 740px; font: 700 40px/1.2 "Fraunces", serif; letter-spacing: -0.01em; }
    #s-cursor { left: 0; top: 0; width: 48px; height: 48px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap">
        <!-- opening: Maya -->
        <div id="s-open" class="s-abs" style="left:0;top:0;width:1920px;height:1080px">
          <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
          </svg>
          <div id="s-sign" class="s-abs s-ol">Maya's Cookies</div>
          <div id="s-co" class="s-pill s-hide">now a company</div>
        </div>

        <!-- the people -->
        <div id="s-hp" class="s-lab s-hide" style="left:110px;top:84px">WHO TALKS TO WHOM</div>
        <div id="s-office" class="s-abs s-hide"></div>
        <div id="s-lo" class="s-lab s-hide" style="left:1150px;top:412px">one front office</div>
        <div id="s-lk" class="s-lab s-hide" style="left:${X[0] + 60}px;top:412px">bakery, across town</div>
${TEAMS.map(card).join("\n")}

        <!-- the software -->
        <div id="s-hs" class="s-lab s-hide" style="left:110px;top:494px">THE SOFTWARE, A YEAR LATER</div>
        <div id="s-noplan" class="s-pill s-hide" style="left:640px;top:490px;background:#fbebd2;color:#8a5510">nobody planned it</div>
${TEAMS.map(prog).join("\n")}
        <div id="s-lf" class="s-pill s-hide" style="left:${gapC - 200}px;top:810px;background:#fbe0ea;color:#b8235a">1 file a night, copied by hand</div>
        <div id="s-ll" class="s-pill s-hide" style="left:${gap2C - 80}px;top:810px;background:#ddefe6;color:#1f7a5c">live link</div>

        <svg id="s-lines" class="s-abs" viewBox="0 0 1920 1080">
          ${ln("s-pt", G3, G4, PM, "s-thick")}
          ${ln("s-pd", G1, G2, PM, "s-dot")}
          ${ln("s-pf", G1, G2, PM, "s-fix")}
          ${ln("s-st", G3, G4, SM, "s-thick")}
          ${ln("s-sd", G1, G2, SM, "s-dot")}
          ${ln("s-sf", G1, G2, SM, "s-fix")}
        </svg>
        <div id="s-tl1" class="s-lab s-hide" style="left:${gap2C - 56}px;top:${PM - 56}px;color:#0e0c1d">all day</div>
        <div id="s-tl2" class="s-lab s-hide" style="left:${gapC - 46}px;top:${PM - 56}px;color:#b8235a">rarely</div>
        <svg id="s-file" class="s-abs s-hide" viewBox="0 0 60 72"><path d="M4 4 H40 L56 20 V68 H4 Z" fill="#fff" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /><path d="M40 4 V20 H56" fill="none" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /><path d="M14 34 H46 M14 46 H46 M14 58 H36" stroke="#3e3b52" stroke-width="5" stroke-linecap="round" /></svg>

        <div id="s-q1" class="s-q" style="left:${gapC - 30}px;top:${SM - 30}px">?</div>
        <div id="s-q2" class="s-q" style="left:${gap2C - 30}px;top:${SM - 30}px">?</div>

        <!-- tracing of the people chart -->
        <svg id="s-trace" class="s-abs" viewBox="0 0 1920 1080">
${X.map((x) => `          <rect x="${x}" y="${PY}" width="${CW}" height="${CH}" rx="24" />`).join("\n")}
          <path d="M${G3 + 6} ${PM} H${G4 - 6}" />
          <path d="M${G1 + 6} ${PM} H${G2 - 6}" stroke-dasharray="2 20" />
        </svg>

        <!-- the order -->
        <div id="s-o1" class="s-ord"><div class="s-chip">order 212</div><div id="s-t1" class="s-tag">NO NUTS</div></div>
        <div id="s-fall" class="s-abs s-tag">NO NUTS</div>
        <div id="s-lost" class="s-abs s-hide">LOST</div>
        <div id="s-nonote" class="s-pill s-hide">no note</div>
        <div id="s-o2" class="s-ord"><div class="s-chip">order 213</div><div class="s-tag">NO NUTS</div></div>
        <svg id="s-ok" class="s-abs s-hide" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#1f7a5c" stroke="#0e0c1d" stroke-width="5" /><path d="M19 33 L28 42 L46 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>

        <!-- the fix -->
        <div id="s-monday" class="s-pill s-hide">every Monday</div>
        <div id="s-deal" class="s-abs s-ol s-hide"><small>AGREED BY WEBSITE AND KITCHEN</small><b>Every order goes to the kitchen at once, with its note.</b></div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-r1" d="${hand(gapC, PM, 104, 70)}" />
          <path id="s-r2" d="${hand(gapC, SM, 104, 70)}" />
          <path id="s-r3" style="stroke:#3b37e6" d="${hand(gap2C, SM, 104, 70)}" />
          <path id="s-r4" d="${hand(gapC, PM, 104, 70)}" />
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
      const OFF = ${OFF};

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const fade = (sel, at) => tl.fromTo(sel, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, at);
      const draw = (sel, at, d) => {
        const p = document.querySelector(sel);
        const L = p.getTotalLength() + 2;
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
        tl.set(p, { strokeDashoffset: L, opacity: 1 }, at);
        tl.to(p, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at + 0.01);
      };
      // a dotted line appears dot by dot, left to right
      const grow = (sel, at, d) => tl.fromTo(sel, { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.6, ease: "power1.inOut" }, at);
      const pulse = (sel, at) => tl.fromTo(sel, { scale: 1 }, { scale: 1.05, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, at);

      /* ---- 1. Maya's shop is a company now: three teams ---- */
      tl.fromTo("#s-sign", { opacity: 0, y: -120, rotation: -8 }, { opacity: 1, y: 0, rotation: -3, duration: 0.6, ease: "back.out(1.3)" }, 0.15);
      pop("#s-co", t(5) - 0.05, { from: 0.4, ease: "back.out(2)" });
      tl.to("#s-open", { opacity: 0, y: -60, duration: 0.45, ease: "power3.in" }, t(9) - 0.2);
      tl.fromTo("#s-c-web", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, t(12) - 0.05);
      tl.fromTo("#s-c-kit", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, t(13) - 0.05);
      tl.fromTo("#s-c-mon", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, t(15) - 0.05);

      /* ---- 2. Who talks to whom ---- */
      fade("#s-hp", t(16) - 0.1);
      tl.fromTo("#s-office", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, t(21) - 0.1);
      fade("#s-lo", t(21) + 0.2);
      draw("#s-pt", t(23) - 0.05, 0.4);
      fade("#s-tl1", t(24));
      pulse(["#s-c-web", "#s-c-mon"], t(24) + 0.1);
      pulse("#s-c-kit", t(27));
      fade("#s-lk", t(30));
      grow("#s-pd", t(33), 0.7);
      fade("#s-tl2", t(34) - 0.05);

      /* ---- 3. The software, a year later: one program per team ---- */
      fade("#s-hs", t(38) - 0.1);
      pop("#s-noplan", t(39), { from: 0.5 });
      out("#s-noplan", t(47) - 0.3, 0.2);
      tl.fromTo("#s-g-kit", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, t(49) - 0.05);
      tl.fromTo("#s-g-web", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, t(49) + 0.15);
      tl.fromTo("#s-g-mon", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, t(49) + 0.35);
      [["kit", 0], ["web", 1], ["mon", 2]].forEach(([k, i]) => pulse(["#s-c-" + k, "#s-g-" + k], t(51) + i * 0.35));

      /* ---- 4. The links between the programs ---- */
      pop("#s-q1", t(57), { from: 0.3, ease: "back.out(2.2)" });
      pop("#s-q2", t(57) + 0.2, { from: 0.3, ease: "back.out(2.2)" });
      tl.fromTo(["#s-g-web"], { scale: 1 }, { scale: 1.04, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, t(60));
      tl.fromTo(["#s-g-mon"], { scale: 1 }, { scale: 1.04, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, t(62));
      out("#s-q2", t(64) - 0.2, 0.2);
      out("#s-q1", t(69) - 0.2, 0.2);
      draw("#s-st", t(64) - 0.05, 0.45);
      pop("#s-ll", t(65), { from: 0.5 });
      grow("#s-sd", t(70) - 0.1, 0.8);
      pop("#s-file", t(71), { from: 0.3, ease: "back.out(2.2)" });
      pop("#s-lf", t(74), { from: 0.5 });

      /* ---- 5. Slide the two drawings together ---- */
      tl.set("#s-trace", { opacity: 0, y: 0 }, 0);
      tl.fromTo("#s-trace", { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, t(77) - 0.1);
      tl.to("#s-trace", { y: OFF, duration: 1.1, ease: "power3.inOut" }, t(77) + 0.25);
      tl.fromTo("#s-trace", { scale: 1 }, { scale: 1.012, svgOrigin: "960 620", duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1 }, t(83));
      draw("#s-r3", t(84), 0.4);
      draw("#s-r2", t(86) - 0.1, 0.4);
      out(["#s-trace", "#s-r2", "#s-r3"], t(87) + 0.2, 0.3);

      /* ---- 6. The note falls into the gap ---- */
      const oy = ${SY + 92};
      tl.set("#s-t1", { opacity: 0 }, 0);
      tl.fromTo("#s-o1", { x: 990, y: oy, opacity: 0, scale: 0.6 }, { x: 990, y: oy, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, t(89));
      tl.to("#s-o1", { x: 820, duration: 0.35, ease: "power2.inOut" }, t(92) - 0.3);
      tl.fromTo("#s-t1", { opacity: 0, scale: 1.6, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.2)" }, t(93) - 0.05);
      tl.to("#s-o1", { x: 752, duration: 0.8, ease: "power2.inOut" }, t(95));
      // into the gap: the order goes on, the note drops out
      tl.to("#s-o1", { x: 378, duration: 0.6, ease: "power2.in" }, t(102) - 0.5);
      tl.set("#s-t1", { opacity: 0 }, t(102) + 0.1);
      tl.fromTo("#s-fall", { x: 575, y: oy, opacity: 0, rotation: 0 }, { x: 575, y: oy, opacity: 1, rotation: 0, duration: 0.01 }, t(102) + 0.1);
      tl.to("#s-fall", { y: 900, rotation: 24, duration: 0.8, ease: "power2.in" }, t(102) + 0.12);
      tl.to("#s-o1", { x: 138, duration: 0.6, ease: "power2.out" }, t(102) + 0.1);
      tl.fromTo("#s-lost", { opacity: 0, scale: 2.2, rotation: 4 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, t(104) + 0.1);
      draw("#s-r2", t(105) - 0.1, 0.4);
      pop("#s-nonote", t(108), { from: 0.4 });

      /* ---- 7. The fix starts with people ---- */
      out(["#s-o1", "#s-fall", "#s-lost", "#s-nonote", "#s-r2", "#s-lf"], t(111) - 0.1, 0.3);
      tl.to(["#s-st", "#s-sd", "#s-ll", "#s-file"], { opacity: 0.35, duration: 0.4, ease: "power2.inOut" }, t(113));
      draw("#s-r1", t(115) - 0.1, 0.45);
      pop("#s-monday", t(121), { from: 0.4 });
      out(["#s-pd", "#s-tl2", "#s-r1"], t(122) - 0.05, 0.2);
      draw("#s-pf", t(122), 0.45);
      tl.fromTo("#s-deal", { opacity: 0, y: 50, rotation: -2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.5)" }, t(125));
      // the software follows
      tl.to(["#s-st", "#s-ll"], { opacity: 1, duration: 0.4, ease: "power2.inOut" }, t(127) - 0.1);
      tl.to("#s-file", { opacity: 0, y: -40, duration: 0.3, ease: "power2.in" }, t(128));
      tl.to("#s-sd", { opacity: 0, duration: 0.2 }, t(128) + 0.2);
      draw("#s-sf", t(129) - 0.15, 0.45);
      tl.fromTo("#s-sf", { strokeWidth: 14 }, { strokeWidth: 20, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, t(129) + 0.35);

      /* ---- 8. Every order reaches the kitchen, note and all ---- */
      tl.fromTo("#s-o2", { x: 800, y: oy, opacity: 0, scale: 0.6 }, { x: 800, y: oy, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, t(131) - 0.1);
      tl.to("#s-o2", { x: 138, duration: 1.4, ease: "power2.inOut" }, t(133) - 0.1);
      pop("#s-ok", t(138), { from: 0.2, ease: "back.out(2.4)" });

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
