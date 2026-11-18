// Generates compositions/story.html for lesson 62, Occam's razor.
// Monday 7:00: every price on the website is $0.00. Three theories arrive as cards,
// each loaded with "weights": the new, unseen things that would have to be true.
// Then the release log card arrives with no weights at all. The cards are sorted
// lightest first, a magnifying glass checks them in order, the first one turns green,
// and a razor shaves the extra weights away.
// Run: node gen-story.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "assets/voice/words.json"), "utf8"));
const W = words.map((w) => w.start);
const END = 64.2;

const SLOT = [140, 560, 980, 1400]; // left edge of each card slot
const GTOP = 300; // top of every theory group (absolute)
const CTOP = 300; // card top inside the group (absolute 600)
const BTOP = (i) => CTOP - 14 - (i + 1) * 74; // weight i (0 = lowest) inside the group

const WEB = { fill: "#e6e3ff", col: "#3b37e6" }, KIT = { fill: "#fbebd2", col: "#b9741a" }, MON = { fill: "#ddefe6", col: "#1f7a5c" };
const TH = [
  { k: "hack", who: "Tom", team: WEB, l1: "A hacker", l2: "broke in", slot: 0, to: 2, w: ["someone targets us", "gets past passwords", "leaves no trace"] },
  { k: "db", who: "Nina", team: KIT, l1: "A rare bug in", l2: "the database", slot: 1, to: 1, w: ["an unknown bug", "strikes today"] },
  { k: "clk", who: "Sam", team: MON, l1: "The server clock,", l2: "only on Mondays", slot: 2, to: 3, w: ["clock zone wrong", "prices use the clock", "only on Mondays"] },
];

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
          <path d="M172 206 Q200 196 228 206" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />`;

const CHECK = `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#1f7a5c" stroke="#0e0c1d" stroke-width="5" /><path d="M19 33 L28 42 L46 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>`;

const ROWS = [
  { k: "r1", name: "Choc chip", p: "$3.00" },
  { k: "r2", name: "Oat and raisin", p: "$2.50" },
  { k: "r3", name: "Ginger snap", p: "$2.00" },
];

const theoryGroup = (t) => `
        <div id="s-g-${t.k}" class="s-grp" data-layout-allow-overlap style="left:${SLOT[t.slot]}px">
${t.w.map((w, i) => `          <div id="s-gh-${t.k}${i}" class="s-ghost" style="top:${BTOP(i)}px">?</div>
          <div id="s-w-${t.k}${i}" class="s-wt" style="top:${BTOP(i)}px">${w}</div>`).join("\n")}
          <div class="s-card s-ol" style="top:${CTOP}px">
            <div class="s-who" style="background:${t.team.fill};color:${t.team.col}">${t.who}</div>
            <div class="s-th">${t.l1}<br />${t.l2}</div>
            <div id="s-no-${t.k}" class="s-nothing">nothing found</div>
          </div>
          <div id="s-n-${t.k}" class="s-count">${t.w.length}</div>
        </div>`;

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
    .s-mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-pill { position: absolute; height: 54px; line-height: 54px; padding: 0 24px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-lab { position: absolute; font-size: 30px; line-height: 40px; color: #3e3b52; white-space: nowrap; letter-spacing: 0.06em; }

    /* opening: Maya and the website */
    #s-maya { left: 96px; top: 520px; width: 360px; height: 468px; }
    #s-site { left: 560px; top: 150px; width: 1200px; height: 640px; background: #fff; border-radius: 28px; }
    #s-sbar { left: 0; top: 0; width: 1200px; height: 76px; background: #ece7df; border-radius: 28px 28px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 30px; gap: 12px; }
    #s-sbar > i { width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; box-shadow: 0 0 0 3px #0e0c1d; }
    #s-sbar > i:nth-child(2) { background: #ffc24b; }
    #s-sbar > i:nth-child(3) { background: #4bd69b; }
    #s-sbar > span { margin-left: 18px; font-size: 30px; color: #3e3b52; }
    #s-stitle { left: 56px; top: 110px; font: 700 64px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-row { position: absolute; left: 56px; width: 1088px; height: 110px; border-radius: 20px; background: #fbf8f4; box-shadow: 0 0 0 4px #0e0c1d; display: flex; align-items: center; padding: 0 32px; }
    .s-row > b { font-size: 42px; }
    .s-price { position: absolute; right: 32px; top: 25px; width: 5.2ch; height: 60px; font: 700 50px/60px "JetBrains Mono", monospace; }
    .s-price > span { position: absolute; right: 0; top: 0; }
    .s-price > .z { color: #b8235a; opacity: 0; }
    #s-clock { left: 1420px; top: 104px; background: #0e0c1d; color: #fff; }
    #s-zero { left: 1180px; top: 826px; padding: 6px 28px; background: #b8235a; color: #fff; font-size: 48px; letter-spacing: 0.06em; border-radius: 12px; box-shadow: 0 0 0 5px #0e0c1d; white-space: nowrap; }

    /* top band */
    #s-mini { left: 96px; top: 96px; height: 64px; line-height: 64px; font-size: 34px; }
    #s-mini > span { position: relative; display: inline-block; width: 5.2ch; height: 64px; vertical-align: top; }
    #s-mini > span > b { position: absolute; left: 0; top: 0; font-family: "JetBrains Mono", monospace; }
    #s-head { left: 700px; top: 106px; }
    #s-unseen { left: 760px; top: 170px; background: #fbe0ea; color: #b8235a; }

    /* theory groups */
    .s-grp { position: absolute; top: ${GTOP}px; width: 380px; height: 600px; }
    .s-card { position: absolute; left: 0; width: 380px; height: 260px; background: #fff; border-radius: 24px; }
    .s-who { position: absolute; left: 24px; top: 22px; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; font-size: 30px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    .s-th { position: absolute; left: 26px; top: 98px; font: 700 40px/1.15 "Fraunces", serif; letter-spacing: -0.01em; white-space: nowrap; }
    .s-nothing { position: absolute; left: 70px; top: 196px; height: 50px; line-height: 50px; padding: 0 20px; border-radius: 12px; background: #ece7df; color: #3e3b52; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #3e3b52; opacity: 0; }
    .s-ghost, .s-wt { position: absolute; left: 20px; width: 340px; height: 64px; border-radius: 14px; text-align: center; line-height: 64px; font-size: 28px; white-space: nowrap; opacity: 0; }
    .s-ghost { border: 4px dashed #3e3b52; line-height: 56px; color: #3e3b52; font-size: 34px; }
    .s-wt { background: #3e3b52; color: #fff; box-shadow: 0 0 0 4px #0e0c1d, 0 6px 0 4px #0e0c1d; }
    .s-count { position: absolute; left: 330px; top: ${CTOP - 30}px; width: 68px; height: 68px; border-radius: 50%; background: #b8235a; color: #fff; font-size: 40px; line-height: 68px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }

    /* the release log card */
    #s-g-rel { left: ${SLOT[3]}px; z-index: 5; }
    #s-relcard { background: #fff; }
    #s-relcard .s-who { background: #0e0c1d; color: #fff; }
    .s-rl { position: absolute; left: 26px; white-space: nowrap; opacity: 0; }
    #s-rl1 { top: 90px; font-size: 34px; }
    #s-rl2 { top: 136px; font-size: 30px; color: #3e3b52; }
    #s-rl3 { left: 20px; top: 184px; font-size: 28px; }
    #s-rl3 .old { color: #b8235a; text-decoration: line-through; text-decoration-thickness: 4px; }
    #s-rl3 .new { color: #1f7a5c; }
    #s-n-rel { background: #1f7a5c; }
    #s-fact { left: 110px; top: 200px; padding: 4px 26px; background: #1f7a5c; color: #fff; font-size: 44px; letter-spacing: 0.1em; border-radius: 12px; box-shadow: 0 0 0 5px #0e0c1d; white-space: nowrap; }
    #s-conf { left: 30px; top: 30px; background: #ddefe6; color: #1f7a5c; }
    #s-fixd { left: 30px; top: 110px; background: #ddefe6; color: #1f7a5c; }
    #s-relchk { left: 330px; top: ${CTOP - 30}px; width: 68px; height: 68px; }
    #s-relchk > svg { position: absolute; left: 0; top: 0; width: 68px; height: 68px; }

    /* the hour */
    #s-dial { left: 1560px; top: 60px; width: 200px; height: 200px; }
    #s-hour { left: 1290px; top: 200px; background: #fff; }

    /* Maya asks */
    #s-maya2 { left: 1660px; top: 40px; width: 200px; height: 260px; }
    #s-ask { left: 1150px; top: 120px; height: 72px; line-height: 72px; padding: 0 30px; border-radius: 22px; background: #fff; font: 700 44px/72px "Fraunces", serif; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }

    /* sorting and checking */
    .s-ord { position: absolute; top: 912px; width: 60px; height: 60px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 32px; line-height: 60px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    #s-lens { left: 0; top: 0; width: 220px; height: 220px; z-index: 10; }
    #s-razor { left: 0; top: 0; width: 360px; height: 120px; z-index: 10; }
    #s-nopromise { left: 600px; top: 100px; background: #fbe0ea; color: #b8235a; }
    #s-lookfirst { left: 600px; top: 178px; background: #ddefe6; color: #1f7a5c; }
    #s-nopromise s { text-decoration-thickness: 4px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${END}" data-track-index="1">
      <div id="s-wrap" data-layout-allow-overlap>
        <!-- opening -->
        <svg id="s-maya" class="s-abs" viewBox="0 0 400 520">${MAYA}
        </svg>
        <div id="s-site" class="s-abs s-ol">
          <div id="s-sbar" class="s-abs"><i></i><i></i><i></i><span>Maya's Cookies: order online</span></div>
          <div id="s-stitle" class="s-abs">Today's cookies</div>
${ROWS.map((r, i) => `          <div id="s-${r.k}" class="s-row" style="top:${226 + i * 136}px"><b>${r.name}</b><span class="s-price"><span class="p">${r.p}</span><span class="z">$0.00</span></span></div>`).join("\n")}
        </div>
        <div id="s-clock" class="s-pill">MON 7:00</div>
        <div id="s-zero" class="s-abs s-hide">EVERY PRICE $0.00</div>

        <!-- top band -->
        <div id="s-mini" class="s-pill s-hide" style="background:#fbe0ea;color:#b8235a">website: <span><b id="s-mz">$0.00</b><b id="s-mo" style="opacity:0;color:#1f7a5c">$3.00</b></span></div>
        <div id="s-head" class="s-lab s-hide">NEW THINGS THAT MUST BE TRUE</div>
        <div id="s-unseen" class="s-pill s-hide">nobody has seen any of them</div>

        <!-- theories -->
${TH.map(theoryGroup).join("\n")}
        <div id="s-g-rel" class="s-grp" data-layout-allow-overlap>
          <div id="s-fact" class="s-abs s-hide">A FACT</div>
          <div id="s-conf" class="s-pill s-hide">10 min: confirmed</div>
          <div id="s-fixd" class="s-pill s-hide">5 min: fixed</div>
          <div id="s-relcard" class="s-card s-ol s-hide" style="top:${CTOP}px">
            <div class="s-who">release log</div>
            <div id="s-rl1" class="s-rl">7:00 one change</div>
            <div id="s-rl2" class="s-rl">Priya renamed</div>
            <div id="s-rl3" class="s-rl s-mono"><span class="old">cookie_prices</span> <span class="new">prices</span></div>
          </div>
          <div id="s-n-rel" class="s-count">0</div>
          <div id="s-relchk" class="s-abs s-hide">${CHECK}</div>
        </div>

        <!-- the hour -->
        <svg id="s-dial" class="s-abs s-hide" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="88" fill="#fff" stroke="#0e0c1d" stroke-width="8" />
          <path d="M100 100 V48" stroke="#0e0c1d" stroke-width="10" stroke-linecap="round" />
          <g id="s-hand"><path d="M100 100 V26" stroke="#b8235a" stroke-width="8" stroke-linecap="round" /></g>
          <circle cx="100" cy="100" r="9" fill="#0e0c1d" />
        </svg>
        <div id="s-hour" class="s-pill s-hide">8:15 to 9:15</div>

        <!-- Maya asks -->
        <svg id="s-maya2" class="s-abs s-hide" viewBox="0 0 400 520">${MAYA}
        </svg>
        <div id="s-ask" class="s-abs s-hide">What changed?</div>

        <!-- sorting, checking, shaving -->
${SLOT.map((x, i) => `        <div id="s-o${i}" class="s-ord" style="left:${x + 160}px">${i + 1}</div>`).join("\n")}
        <svg id="s-lens" class="s-abs s-hide" viewBox="0 0 220 220">
          <path d="M140 140 L204 204" stroke="#0e0c1d" stroke-width="26" stroke-linecap="round" />
          <path d="M140 140 L204 204" stroke="#b9741a" stroke-width="14" stroke-linecap="round" />
          <circle cx="88" cy="88" r="70" fill="#e6e3ff" fill-opacity="0.35" stroke="#0e0c1d" stroke-width="12" />
          <path d="M52 70 Q62 50 84 44" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" />
        </svg>
        <svg id="s-razor" class="s-abs s-hide" viewBox="0 0 360 120">
          <path d="M150 34 H340 Q352 34 352 46 V74 Q352 86 340 86 H150 Z" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
          <path d="M10 40 H160 V80 H34 Q10 80 10 60 Z" fill="#dcd8e8" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
          <path d="M14 76 H158" stroke="#fff" stroke-width="4" stroke-linecap="round" />
          <circle cx="166" cy="60" r="9" fill="#ffc24b" stroke="#0e0c1d" stroke-width="4" />
        </svg>
        <div id="s-nopromise" class="s-pill s-hide">not a promise that it is true</div>
        <div id="s-lookfirst" class="s-pill s-hide">where to look first</div>
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
      const stamp = (sel, at, rot) => tl.fromTo(sel, { opacity: 0, scale: 2.2, rotation: 4 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.3, ease: "power4.in" }, at);
      const SLOT = ${JSON.stringify(SLOT)};

      /* ---- 1. Monday 7:00: every price is $0.00 ---- */
      tl.fromTo("#s-maya", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 0);
      tl.fromTo("#s-site", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 0);
      tl.fromTo("#s-clock", { scale: 1 }, { scale: 1.15, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, t(1));
      ["#s-r1", "#s-r2", "#s-r3"].forEach((r, i) => tl.fromTo(r, { x: 0 }, { x: 10, duration: 0.07, ease: "sine.inOut", yoyo: true, repeat: 3 }, t(6) + i * 0.12));
      ["#s-r1", "#s-r2", "#s-r3"].forEach((r, i) => {
        tl.to(r + " .p", { opacity: 0, y: -20, duration: 0.15, ease: "power2.in" }, t(12) + i * 0.1);
        tl.fromTo(r + " .z", { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t(12) + 0.1 + i * 0.1);
      });
      stamp("#s-zero", t(13), -4);

      /* ---- 2. The team gathers. Three theories ---- */
      out(["#s-site", "#s-zero", "#s-clock", "#s-maya"], t(17) - 0.1, 0.3);
      tl.fromTo("#s-mini", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(17) + 0.2);
      const fly = (k, at) => tl.fromTo("#s-g-" + k, { opacity: 0, y: 160, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: "back.out(1.4)" }, at);
      ${JSON.stringify(TH.map((x) => x.k))}.forEach((k) => tl.set("#s-g-" + k, { opacity: 0 }, 0));
      fly("hack", t(21) - 0.1);
      fly("db", t(27) - 0.1);
      fly("clk", t(35) - 0.1);

      /* ---- 3. Each theory needs new things to be true. Count them ---- */
      tl.fromTo("#s-g-clk .s-th", { scale: 1 }, { scale: 1.08, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "0% 50%" }, t(42));
      fade("#s-head", t(45) - 0.1);
      const GH = { hack: 3, db: 2, clk: 3 };
      Object.keys(GH).forEach((k, j) => {
        for (let i = 0; i < GH[k]; i++) pop("#s-gh-" + k + i, t(47) + j * 0.35 + i * 0.12, { from: 0.4, d: 0.35 });
      });
      pop("#s-unseen", t(54), { from: 0.5 });
      // counting: each weight drops onto its ghost
      const drop = (k, n, at, gap) => {
        for (let i = 0; i < n; i++) {
          tl.fromTo("#s-w-" + k + i, { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out" }, at + i * gap);
          tl.to("#s-gh-" + k + i, { opacity: 0, duration: 0.1 }, at + i * gap + 0.2);
        }
      };
      drop("hack", 3, t(60) - 0.1, 0.3);
      pop("#s-n-hack", t(62), { from: 0.3, ease: "back.out(2.4)" });
      drop("db", 2, t(64) - 0.1, 0.3);
      pop("#s-n-db", t(66), { from: 0.3, ease: "back.out(2.4)" });
      drop("clk", 3, t(68) - 0.15, 0.25);
      pop("#s-n-clk", t(69), { from: 0.3, ease: "back.out(2.4)" });

      /* ---- 4. An hour chasing them. Nothing ---- */
      out(["#s-unseen"], t(70) - 0.2, 0.25);
      pop("#s-dial", t(73), { from: 0.5 });
      pop("#s-hour", t(74), { from: 0.5 });
      tl.fromTo("#s-hand", { rotation: 0, svgOrigin: "100 100" }, { rotation: 360, svgOrigin: "100 100", duration: t(79) - t(74), ease: "none" }, t(74));
      ["hack", "db", "clk"].forEach((k, i) => tl.fromTo("#s-g-" + k, { y: 0 }, { y: -14, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 3 }, t(75) + i * 0.25));
      ["hack", "db", "clk"].forEach((k, i) => stamp("#s-no-" + k, t(79) - 0.1 + i * 0.15, -3));

      /* ---- 5. What changed? The release log ---- */
      out(["#s-dial", "#s-hour", "#s-head"], t(80) - 0.1, 0.3);
      tl.fromTo("#s-maya2", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t(80));
      tl.fromTo("#s-ask", { opacity: 0, scale: 0.6, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.45, ease: "back.out(1.8)" }, t(86) - 0.05);
      tl.fromTo("#s-relcard", { opacity: 0, y: 160, rotation: 4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: "back.out(1.4)" }, t(89) - 0.1);
      fade("#s-rl1", t(92));
      fade("#s-rl2", t(100));
      fade("#s-rl3", t(101) + 0.1);
      pop("#s-n-rel", t(107), { from: 0.3, ease: "back.out(2.4)" });
      stamp("#s-fact", t(112) - 0.05, -4);

      /* ---- 6. Line them up, lightest first ---- */
      out(["#s-ask", "#s-maya2"], t(113) - 0.1, 0.3);
      ["hack", "db", "clk"].forEach((k) => out("#s-no-" + k, t(113), 0.2));
      tl.set("#s-g-hack", { zIndex: 1 }, t(113));
      const mv = (sel, from, to, at, lift) => tl.to(sel, { keyframes: [
        { y: lift, duration: 0.3, ease: "power2.out" },
        { x: SLOT[to] - SLOT[from], duration: 0.7, ease: "power3.inOut" },
        { y: 0, duration: 0.3, ease: "power2.in" },
      ] }, at);
      mv("#s-g-rel", 3, 0, t(116) - 0.2, -40);
      mv("#s-g-hack", 0, 2, t(116) - 0.2, 30);
      mv("#s-g-clk", 2, 3, t(117) - 0.1, 30);
      [0, 1, 2, 3].forEach((i) => pop("#s-o" + i, t(118) + i * 0.15, { from: 0.3, ease: "back.out(2.4)", d: 0.35 }));

      // the lens checks in order: it lands on card 1
      tl.fromTo("#s-lens", { opacity: 0, x: SLOT[0] - 160, y: 640, rotation: -20 }, { opacity: 1, x: SLOT[0] + 220, y: 560, rotation: 0, duration: 0.6, ease: "expo.out" }, t(121) - 0.1);

      /* ---- 7. Ten minutes to confirm. Five to fix ---- */
      tl.to("#s-relcard", { backgroundColor: "#ddefe6", duration: 0.3 }, t(126));
      out("#s-n-rel", t(126), 0.15);
      pop("#s-relchk", t(126) + 0.1, { from: 0.2, ease: "back.out(2.4)" });
      out("#s-fact", t(126), 0.2);
      pop("#s-conf", t(127), { from: 0.5 });
      pop("#s-fixd", t(130), { from: 0.5 });
      tl.to("#s-mz", { opacity: 0, duration: 0.15 }, t(131));
      tl.fromTo("#s-mo", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t(131) + 0.1);
      tl.to("#s-mini", { backgroundColor: "#ddefe6", color: "#1f7a5c", duration: 0.3 }, t(131) + 0.1);

      /* ---- 8. The razor shaves away the extra weights ---- */
      out("#s-lens", t(133) - 0.1, 0.25);
      const RY = 518;
      tl.fromTo("#s-razor", { opacity: 0, x: -380, y: RY }, { opacity: 1, x: -300, y: RY, duration: 0.3, ease: "power2.out" }, t(134) - 0.1);
      const sweepA = t(135), sweepD = t(142) - t(135);
      tl.to("#s-razor", { x: 1940, duration: sweepD, ease: "none" }, sweepA);
      // each weight flies off as the blade passes the middle of its card
      const NEWSLOT = { db: 1, hack: 2, clk: 3 };
      ${JSON.stringify(TH.map((x) => [x.k, x.w.length]))}.forEach(([k, n]) => {
        const cx = SLOT[NEWSLOT[k]] + 190;
        const at = sweepA + ((cx - 30) - (-300 + 180)) / (1940 + 300) * sweepD;
        for (let i = 0; i < n; i++) {
          tl.to("#s-w-" + k + i, { x: 120 + i * 60, y: -260 - i * 50, rotation: 30 + i * 25, opacity: 0, duration: 0.6, ease: "power2.out" }, at + i * 0.05);
        }
        tl.to("#s-n-" + k, { backgroundColor: "#6f6b80", duration: 0.2 }, at);
      });

      /* ---- 9. Not a promise. An order to check in ---- */
      tl.fromTo("#s-nopromise", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(146) - 0.05);
      tl.fromTo("#s-lookfirst", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(155) - 0.05);
      [0, 1, 2, 3].forEach((i) => tl.fromTo("#s-o" + i, { scale: 1 }, { scale: 1.3, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1 }, t(158) + i * 0.2));

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
