// Builds index.html, compositions/story.html and compositions/takeaway.html for lesson 106.
// Run: node gen.mjs
// All positions and every number on screen are computed here from the same data the lesson uses
// (guests, recipes, pantry), by running the lesson's planner algorithm in JS. So the film cannot
// disagree with the code. The HTML is static and the timeline is deterministic.
import { writeFileSync, readFileSync, mkdirSync } from 'fs';

const here = p => new URL(p, import.meta.url);
const W = JSON.parse(readFileSync(here('./assets/voice/words.json'), 'utf8')).map(w => +w.start.toFixed(3));
const AUDIO = 65.527;                    // narration length, seconds
const LEAD = 0.6;
const S2 = +(W[150] + LEAD - 0.2).toFixed(2);     // takeaway starts just before "Filter"
const TOTAL = +(AUDIO + LEAD + 2.4).toFixed(1);
const D2 = +(TOTAL - S2).toFixed(2);

/* ---------- the data (module 10 spec) and the planner, exactly as in planner.py ---------- */
const GUESTS = [
  { name: 'Ana', kcal: 2600, prot: 100, veg: false, gf: false, rule: 'eats everything', tint: '#e6e3ff', col: '#3b37e6' },
  { name: 'Ben', kcal: 2400, prot: 140, veg: true, gf: false, rule: 'vegetarian', tint: '#ddefe6', col: '#1f7a5c' },
  { name: 'Chloe', kcal: 2000, prot: 75, veg: false, gf: true, rule: 'gluten-free', tint: '#fbe0ea', col: '#b8235a' }
];
const RECIPES = [
  { key: 'lentil', name: 'lentil soup', kcal: 320, prot: 18, veg: true, gf: true, ing: { lentils: 80, carrots: 100 } },
  { key: 'tofu', name: 'tofu stir-fry', kcal: 350, prot: 24, veg: true, gf: false, ing: { tofu: 150, rice: 75, 'soy sauce': 15 } },
  { key: 'pasta', name: 'pasta bake', kcal: 610, prot: 22, veg: true, gf: false, ing: { pasta: 100, cheese: 40 } },
  { key: 'bean', name: 'bean chili', kcal: 380, prot: 15, veg: true, gf: true, ing: { beans: 150, tomatoes: 200 } },
  { key: 'chicken', name: 'chicken rice bowl', kcal: 650, prot: 40, veg: false, gf: true, ing: { chicken: 150, rice: 100 } },
  { key: 'pudding', name: 'rice pudding', kcal: 300, prot: 8, veg: true, gf: true, ing: { rice: 50, milk: 200 } },
  { key: 'yogurt', name: 'yogurt bowl', kcal: 250, prot: 20, veg: true, gf: true, ing: { yogurt: 200, berries: 80 } }
];
const pantry = { rice: 1000, lentils: 400, carrots: 500, tofu: 200, 'soy sauce': 100, pasta: 500, cheese: 200, beans: 300, tomatoes: 400, chicken: 300, milk: 1000, yogurt: 400, berries: 150 };
const JARS = ['chicken', 'rice', 'tofu', 'pasta', 'cheese', 'yogurt', 'berries', 'lentils'];   // the 8 jars shown
const jarVals = Object.fromEntries(JARS.map(j => [j, [pantry[j]]]));

const allows = (g, r) => !(g.veg && !r.veg) && !(g.gf && !r.gf);
const hasAll = ing => Object.entries(ing).every(([k, v]) => (pantry[k] || 0) >= v);
const byProtein = (a, b) => b.prot - a.prot || a.name.localeCompare(b.name);
// plan[g] = { lineUp: [keys], meals: [{key, swaps: [[jar, valueIndex]]}], kcal, prot }
const PLAN = GUESTS.map(g => {
  const lineUp = RECIPES.filter(r => allows(g, r)).filter(r => hasAll(r.ing)).sort(byProtein);
  const meals = []; let kcal = 0;
  for (const r of lineUp) {
    if (meals.length === 3) break;
    if (!hasAll(r.ing)) continue;
    if (kcal + r.kcal > g.kcal) continue;
    const swaps = [];
    for (const [k, v] of Object.entries(r.ing)) {
      pantry[k] -= v;
      if (jarVals[k]) { jarVals[k].push(pantry[k]); swaps.push([k, jarVals[k].length - 1]); }
    }
    meals.push({ key: r.key, swaps }); kcal += r.kcal;
  }
  return { lineUp: lineUp.map(r => r.key), meals, kcal, prot: meals.reduce((s, m) => s + RECIPES.find(r => r.key === m.key).prot, 0) };
});
const R = Object.fromEntries(RECIPES.map(r => [r.key, r]));
// The film's story depends on these facts. Stop if the data ever says otherwise.
const expect = (cond, msg) => { if (!cond) throw new Error('film does not match the code: ' + msg); };
expect(PLAN[0].meals.map(m => m.key).join() === 'chicken,tofu,pasta', 'Ana');
expect(PLAN[1].meals.map(m => m.key).join() === 'pasta,yogurt,lentil', 'Ben');
expect(PLAN[2].meals.map(m => m.key).join() === 'chicken,lentil,bean', 'Chloe');
expect(PLAN[1].lineUp.join() === 'pasta,yogurt,lentil,bean,pudding', 'Ben line-up');
expect(PLAN[2].lineUp.join() === 'chicken,lentil,bean,pudding', 'Chloe line-up');
expect(jarVals.tofu.join() === '200,50', 'tofu jar');
expect(PLAN.map(p => p.prot).join() === '86,60,73' && PLAN.map(p => p.kcal).join() === '1610,1180,1350', 'totals');
const SHORT = PLAN.map((p, i) => GUESTS[i].prot - p.prot);       // 14, 80, 2
expect(SHORT.join() === '14,80,2', 'short');
console.log('plan:', PLAN.map((p, i) => `${GUESTS[i].name} ${p.meals.map(m => m.key)} ${p.kcal} kcal ${p.prot} g`).join(' | '));
console.log('jars:', JSON.stringify(jarVals));

/* ---------- layout ---------- */
const LX = 70, CW = 560, CH = 290, CTOP = [70, 400, 730];
const SLOT = k => 88 + 44 * k;
const MX = 690, MW = 560, RTOP = 190, PITCH = 106, RH = 88;
const RX = 1310, JW = 255, JH = 108;
const jarX = i => RX + (i % 2) * 285, jarY = i => 170 + Math.floor(i / 2) * 128;
const FILE = RECIPES.map(r => r.key);                             // order in recipes.json
const SORTED = [...RECIPES].sort(byProtein).map(r => r.key);     // Ana's line-up: all seven
expect(PLAN[0].lineUp.join() === SORTED.join(), 'Ana line-up is all seven');

const cards = GUESTS.map((g, i) => `
        <div class="card s-ol" id="c${i}" style="top:${CTOP[i]}px">
          <div class="hd" style="background:${g.tint}"></div>
          <div class="nm">${g.name}</div>
          <div class="rl" id="c${i}rl" style="color:${g.col}; box-shadow:0 0 0 4px ${g.col}">${g.rule}</div>
          ${[0, 1, 2].map(k => `<div class="slot" id="c${i}s${k}" style="top:${SLOT(k) + 40}px"></div>`).join('')}
          <div class="goal" id="c${i}goal">goal: ${g.prot} g protein</div>
          <div class="tot" id="c${i}tot">${PLAN[i].prot} / ${g.prot} g protein</div>
          <div class="short" id="c${i}short">short ${SHORT[i]} g</div>
          <div class="act" id="c${i}act"></div>
        </div>`).join('');

const BAD = { chicken: "no meat", tofu: 'needs 150 g tofu' };
const rows = RECIPES.map(r => `
        <div class="row" id="r_${r.key}">
          <div class="hl" id="r_${r.key}hl"></div>
          <div class="rn">${r.name}</div>
          <div class="rp" id="r_${r.key}p">${r.prot} g</div>
          <div class="tk" id="r_${r.key}tk">✓ taken</div>
          ${BAD[r.key] ? `<div class="bad" id="r_${r.key}bad">${BAD[r.key]}</div>` : ''}
        </div>`).join('');

const jars = JARS.map((j, i) => `
        <div class="jar" id="j_${j}" style="left:${jarX(i)}px; top:${jarY(i)}px">
          <div class="lid"></div>
          <div class="jn">${j}</div>
          ${jarVals[j].map((v, n) => `<div class="jv" id="j_${j}v${n}"${n ? ' style="opacity:0"' : ''}>${v} g</div>`).join('')}
        </div>`).join('');

// chips: a recipe name that flies from its line-up row to a meal slot on the guest card
const chips = PLAN.map((p, g) => p.meals.map((m, k) =>
  `<div class="chip" id="ch${g}${k}" style="left:${MX + 24}px; top:${RTOP + k * PITCH + 22}px" data-dx="${LX + 24 - (MX + 24)}" data-dy="${CTOP[g] + SLOT(k) - (RTOP + k * PITCH + 22)}">${R[m.key].name}</div>`).join('')).join('\n        ');

const FONTS = `
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    #root * { font-variant-ligatures: none !important; font-feature-settings: "liga" 0, "calt" 0 !important; }`;

const story = `<template>
  <style>${FONTS}
    #s-all, #s-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .h { position: absolute; font: 700 46px/56px "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .sub { position: absolute; font: 800 28px/40px "Manrope", sans-serif; color: #3e3b52; white-space: nowrap; }
    .pill { position: absolute; height: 46px; padding: 0 18px; border-radius: 23px; font: 800 28px/46px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    .pill.ok { background: #ddefe6; color: #1f7a5c; box-shadow: 0 0 0 4px #1f7a5c; }

    /* guest cards */
    .card { position: absolute; left: ${LX}px; width: ${CW}px; height: ${CH}px; background: #fff; border-radius: 20px; }
    .card .hd { position: absolute; left: 0; top: 0; width: ${CW}px; height: 76px; border-radius: 20px 20px 0 0; border-bottom: 4px solid #0e0c1d; }
    .card .nm { position: absolute; left: 24px; top: 8px; font: 700 46px/60px "Fraunces", serif; }
    .card .rl { position: absolute; right: 20px; top: 16px; height: 44px; padding: 0 16px; border-radius: 22px; background: #fff; font: 800 28px/44px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    .card .slot { position: absolute; left: 24px; width: ${CW - 48}px; height: 0; border-bottom: 4px dashed #b9b4c6; opacity: 0; }
    .card .goal, .card .tot { position: absolute; left: 24px; top: 234px; font: 500 28px/44px "JetBrains Mono", monospace; white-space: nowrap; opacity: 0; }
    .card .goal { color: #5d596e; }
    .card .short { position: absolute; right: 20px; top: 234px; height: 44px; padding: 0 14px; border-radius: 10px; background: #b8235a; color: #fff; font: 800 28px/44px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    .card .act { position: absolute; left: -5px; top: -5px; width: ${CW + 10}px; height: ${CH + 10}px; border-radius: 25px; border: 10px solid #ffc24b; opacity: 0; }
    .chip { position: absolute; font: 800 30px/44px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }

    /* the line-up */
    #lineup { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; }
    .row { position: absolute; left: ${MX}px; top: ${RTOP}px; width: ${MW}px; height: ${RH}px; background: #fff; border-radius: 16px; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .row .hl { position: absolute; inset: 0; border-radius: 16px; background: #ffe7b0; opacity: 0; }
    .row .rn { position: absolute; left: 24px; top: 20px; font: 800 32px/48px "Manrope", sans-serif; white-space: nowrap; }
    .row .rp { position: absolute; right: 24px; top: 20px; font: 700 32px/48px "JetBrains Mono", monospace; color: #3b37e6; white-space: nowrap; }
    .row .tk { position: absolute; right: 16px; top: 20px; height: 48px; padding: 0 14px; border-radius: 10px; background: #1f7a5c; color: #fff; font: 800 28px/48px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    .row .bad { position: absolute; right: 16px; top: 20px; height: 48px; padding: 0 14px; border-radius: 10px; background: #b8235a; color: #fff; font: 800 28px/48px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    #kc { left: ${MX}px; top: 380px; width: ${MW}px; height: 250px; background: #15132b; border-radius: 24px; opacity: 0; }
    #kc .k1 { position: absolute; left: 0; right: 0; top: 50px; text-align: center; font: 700 64px/76px "Fraunces", serif; color: #fff; }
    #kc .k2 { position: absolute; left: 0; right: 0; top: 140px; text-align: center; font: 800 36px/48px "Manrope", sans-serif; color: #c9c6ff; }

    /* the pantry */
    .jar { position: absolute; width: ${JW}px; height: ${JH}px; background: #fff; border-radius: 16px; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .jar .lid { position: absolute; left: 70px; top: -14px; width: 115px; height: 14px; border-radius: 6px 6px 0 0; background: #0e0c1d; }
    .jar .jn { position: absolute; left: 20px; top: 8px; font: 800 30px/42px "Manrope", sans-serif; color: #3e3b52; }
    .jar .jv { position: absolute; left: 20px; top: 50px; font: 700 38px/50px "JetBrains Mono", monospace; white-space: nowrap; }
    #chk { left: ${RX}px; top: 720px; width: 540px; height: 190px; background: #fff; border-radius: 20px; opacity: 0; }
    #chk .q { position: absolute; left: 24px; font: 800 32px/48px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    #chk .y { position: absolute; right: 20px; height: 48px; padding: 0 16px; border-radius: 10px; background: #1f7a5c; color: #fff; font: 800 30px/48px "Manrope", sans-serif; opacity: 0; }

    #plan { left: ${MX + 20}px; top: 330px; width: ${MW - 20}px; height: 300px; opacity: 0; }
    #plan .p1 { position: absolute; left: 0; top: 0; font: 700 68px/80px "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #plan .p2 { position: absolute; left: 0; top: 110px; font: 800 40px/56px "Manrope", sans-serif; color: #3e3b52; opacity: 0; }

    /* greedy card */
    #greedy { left: ${MX}px; top: 250px; width: ${MW}px; height: 430px; background: #15132b; border-radius: 24px; opacity: 0; }
    #greedy .g1 { position: absolute; left: 36px; top: 34px; font: 700 60px/72px "Fraunces", serif; color: #ffc24b; }
    #greedy .g2, #greedy .g3 { position: absolute; left: 36px; right: 30px; font: 800 38px/52px "Manrope", sans-serif; color: #fff; opacity: 0; }
    #greedy .g2 { top: 140px; }
    #greedy .g3 { top: 286px; color: #ff8fab; }

    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks path { fill: none; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    #s-cursor { left: 0; top: 0; width: 56px; height: 56px; opacity: 0; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${S2}" data-track-index="1">
      <div id="s-wrap">
        ${cards}

        <div id="lineup">
          <div class="h" id="lt0" style="left:${MX}px; top:64px; opacity:0">Ana's line-up</div>
          <div class="h" id="lt1" style="left:${MX}px; top:64px; opacity:0">Ben's line-up</div>
          <div class="h" id="lt2" style="left:${MX}px; top:64px; opacity:0">Chloe's line-up</div>
          <div class="pill ok" id="pk1" style="left:${MX}px; top:128px">✓ she may eat it</div>
          <div class="pill ok" id="pk2" style="left:${MX + 290}px; top:128px">✓ pantry has it</div>
          <div class="sub" id="lsub" style="left:${MX}px; top:130px; opacity:0">most protein first ↓</div>
          ${rows}
        </div>
        <div id="kc" class="s-abs s-ol"><div class="k1">Kitchen Coach</div><div class="k2">picks up to 3 meals each</div></div>

        <div class="h" id="pt" style="left:${RX}px; top:64px">One shared pantry</div>
        ${jars}
        <div id="chk" class="s-abs s-ol">
          <div class="q" id="q1" style="top:26px">still in the pantry?</div><div class="y" id="y1" style="top:26px">yes</div>
          <div class="q" id="q2" style="top:106px">calories fit?</div><div class="y" id="y2" style="top:106px">yes</div>
        </div>

        <div id="plan" class="s-abs">
          <div class="p1">← Today's plan</div>
          <div class="p2" id="p2">3 meals each,<br />from one pantry</div>
        </div>

        <div id="greedy" class="s-abs s-ol">
          <div class="g1">A greedy planner</div>
          <div class="g2" id="g2">takes the best dish it sees right now</div>
          <div class="g3" id="g3">and never looks back</div>
        </div>

        ${chips}

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-prot" style="stroke:#3b37e6" />
          <path id="r-tofu" style="stroke:#b8235a" />
          <path id="r-tofu2" style="stroke:#b8235a" />
          <path id="r-ben" style="stroke:#ffc24b" />
        </svg>
        <svg id="s-cursor" class="s-abs" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds). The voice starts 0.6 s into the film.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + ${LEAD};
      const tl = gsap.timeline({ paused: true });
      const PITCH = ${PITCH};

      const ringD = (cx, cy, rx, ry) => \`M\${cx - rx + 6} \${cy + 4} C\${cx - rx + 2} \${cy - ry} \${cx + rx} \${cy - ry - 3} \${cx + rx} \${cy} C\${cx + rx} \${cy + ry} \${cx - rx - 3} \${cy + ry + 3} \${cx - rx} \${cy - 8}\`;
      const ring = (id, cx, cy, rx, ry) => { const p = document.getElementById(id); p.setAttribute("d", ringD(cx, cy, rx, ry)); const L = p.getTotalLength(); p.dataset.len = L; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; };
      ring("r-prot", ${MX + MW - 24 - 38}, ${RTOP + RH / 2}, 62, 38);
      ring("r-tofu", ${jarX(2) + JW / 2}, ${jarY(2) + JH / 2 - 2}, ${JW / 2 + 22}, ${JH / 2 + 24});
      ring("r-tofu2", ${jarX(2) + JW / 2}, ${jarY(2) + JH / 2 - 2}, ${JW / 2 + 22}, ${JH / 2 + 24});
      ring("r-ben", ${LX + CW - 20 - 92}, ${CTOP[1] + 234 + 22}, 112, 36);

      const pop = (sel, at, o) => { o = o || {}; tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.4, ease: o.ease || "back.out(1.6)", immediateRender: false }, at); };
      const show = (sel, at, d) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }, at);
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const draw = (id, at, d) => { const p = document.getElementById(id); tl.set(p, { opacity: 1 }, at); tl.fromTo(p, { strokeDashoffset: +p.dataset.len }, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out", immediateRender: false }, at); };
      const bump = (sel, at, s) => tl.fromTo(sel, { scale: 1 }, { scale: s || 1.07, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, at);
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", { x: x, y: y, duration: d || 0.4, ease: "power3.inOut" }, at);
      const rowAt = (k) => cursorTo(${MX + 330}, ${RTOP + 46} + k * PITCH, 0, 0);

      // a jar value swaps: the old number fades, the new one pops, the jar bumps
      const swap = (jar, n, at, bad) => {
        tl.to("#j_" + jar + "v" + (n - 1), { opacity: 0, duration: 0.15 }, at);
        tl.fromTo("#j_" + jar + "v" + n, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, at + 0.12);
        if (bad) tl.set("#j_" + jar + "v" + n, { color: "#b8235a" }, at);
        bump("#j_" + jar, at + 0.1, 1.06);
      };
      // a row is picked: its name flies to the guest's meal slot, the row is marked taken
      const take = (g, k, key, at, d) => {
        d = d || 0.55;
        const c = document.getElementById("ch" + g + k);
        tl.set(c, { opacity: 1, x: 0, y: 0 }, at);
        tl.to(c, { x: +c.dataset.dx, y: +c.dataset.dy, duration: d, ease: "power3.inOut" }, at);
        tl.to("#c" + g + "s" + k, { opacity: 0, duration: 0.15 }, at + d - 0.1);
        tl.to("#r_" + key + "p", { opacity: 0, duration: 0.15 }, at);
        pop("#r_" + key + "tk", at + 0.1, { d: 0.3 });
        tl.to("#r_" + key + "hl", { opacity: 0, duration: 0.2 }, at + 0.2);
        tl.to("#r_" + key, { opacity: 0.45, duration: 0.3 }, at + d);
      };
      // lay the rows out: keys in order get slots 0, 1, 2...; every other row disappears
      const ALL = ${JSON.stringify(FILE)};
      const layout = (keys, at, d) => {
        ALL.forEach((key) => {
          const k = keys.indexOf(key);
          if (k < 0) tl.to("#r_" + key, { opacity: 0, duration: 0.25, ease: "power2.in" }, at);
          else tl.to("#r_" + key, { y: k * PITCH, opacity: 1, duration: d || 0.5, ease: "power3.inOut" }, at);
        });
      };
      // fresh rows for the next guest: tags off, protein numbers back
      const reset = (at) => {
        tl.to(".row .tk, .row .bad, .row .hl", { opacity: 0, duration: 0.2 }, at);
        tl.to(".row .rp", { opacity: 1, duration: 0.2 }, at);
      };
      const hl = (key, at) => show("#r_" + key + "hl", at, 0.2);
      const active = (g, at) => { [0, 1, 2].forEach((i) => tl.to("#c" + i + "act", { opacity: i === g ? 1 : 0, duration: 0.25 }, at)); };

      tl.set("#s-cursor", { x: 1100, y: 620 }, 0);
      ALL.forEach((key, i) => tl.set("#r_" + key, { y: i * PITCH }, 0));

      /* ---- 1. The pantry is stocked. The guest cards are written. Kitchen Coach picks the meals ---- */
      ${JARS.map((j, i) => `pop("#j_${j}", t(1) - 0.1 + ${(i * 0.09).toFixed(2)}, { d: 0.35, from: 0.7 });`).join('\n      ')}
      show(["#c0rl", "#c1rl", "#c2rl"], t(5), 0.3);
      show(["#c0goal", "#c1goal", "#c2goal"], t(6), 0.3);
      bump(["#c0", "#c1", "#c2"], t(8), 1.02);
      pop("#kc", t(10) - 0.1, { from: 0.85, d: 0.4 });
      show(".card .slot", t(12), 0.3);

      /* ---- 2. Ana goes first. Keeps what she may eat and the pantry can make. Lines them up ---- */
      out("#kc", t(15) - 0.25, 0.25);
      active(0, t(15));
      show("#lt0", t(15), 0.3);
      ${FILE.map((key, i) => `pop("#r_${key}", t(20) + ${(i * 0.08).toFixed(2)}, { d: 0.3, from: 0.85 });`).join('\n      ')}
      pop("#pk1", t(24), { d: 0.35 });
      pop("#pk2", t(28), { d: 0.35 });
      out(["#pk1", "#pk2"], t(31) - 0.1, 0.2);
      layout(${JSON.stringify(SORTED)}, t(33), 0.7);
      show("#lsub", t(36), 0.3);
      draw("r-prot", t(37), 0.45);
      out("#r-prot", t(39) - 0.1, 0.25);

      /* ---- 3. It walks down the line. Chicken rice bowl. Still in the pantry? Calories fit? Take it ---- */
      tl.set("#s-cursor", { x: ${MX + 330}, y: ${RTOP - 60} }, t(39));
      tl.to("#s-cursor", { opacity: 1, duration: 0.2 }, t(39));
      cursorTo(${MX + 330}, ${RTOP + 46}, t(41), 0.5);
      hl("chicken", t(45));
      pop("#chk", t(48) - 0.15, { from: 0.9, d: 0.3 });
      show("#q1", t(48), 0.2);
      bump(["#j_chicken", "#j_rice"], t(51), 1.06);
      pop("#y1", t(52), { d: 0.3 });
      show("#q2", t(53), 0.2);
      pop("#y2", t(55), { d: 0.3 });
      take(0, 0, "chicken", t(56));
      swap("chicken", 1, t(56) + 0.3);
      swap("rice", 1, t(56) + 0.4);

      /* ---- 4. Tofu stir-fry. Take it. The tofu jar drops from 200 g to 50. Pasta bake makes 3 ---- */
      tl.to(["#y1", "#y2"], { opacity: 0, duration: 0.15 }, t(58) - 0.2);
      cursorTo(${MX + 330}, ${RTOP + 46 + PITCH}, t(58) - 0.2, 0.4);
      hl("tofu", t(58));
      pop("#y1", t(59), { d: 0.25 });
      pop("#y2", t(59) + 0.3, { d: 0.25 });
      take(0, 1, "tofu", t(60));
      swap("rice", 2, t(60) + 0.4);
      draw("r-tofu", t(63), 0.45);
      bump("#j_tofu", t(67), 1.08);
      swap("tofu", 1, t(71) - 0.1, true);
      out("#r-tofu", t(72) - 0.15, 0.25);
      tl.to(["#y1", "#y2"], { opacity: 0, duration: 0.15 }, t(72) - 0.2);
      cursorTo(${MX + 330}, ${RTOP + 46 + 2 * PITCH}, t(72) - 0.2, 0.4);
      hl("pasta", t(72));
      pop("#y1", t(73), { d: 0.25 });
      pop("#y2", t(73) + 0.2, { d: 0.25 });
      take(0, 2, "pasta", t(74));
      swap("pasta", 1, t(74) + 0.3);
      swap("cheese", 1, t(74) + 0.4);
      bump("#c0", t(75), 1.03);
      tl.to("#s-cursor", { opacity: 0, duration: 0.2 }, t(77));
      out("#chk", t(77), 0.25);
      out("#c0goal", t(78), 0.15);
      show("#c0tot", t(78) + 0.1, 0.3);

      /* ---- 5. Now Ben. Same pantry. Chicken rice bowl? No meat. Out. Tofu stir-fry? Needs 150. Out ---- */
      active(1, t(80));
      out("#lt0", t(80), 0.2);
      show("#lt1", t(81) - 0.1, 0.3);
      out("#lsub", t(80), 0.2);
      reset(t(80));
      layout(${JSON.stringify(SORTED)}, t(80) + 0.1, 0.3);
      bump("#pt", t(82), 1.06);
      hl("chicken", t(84));
      bump("#c1rl", t(88), 1.15);
      tl.to("#r_chickenp", { opacity: 0, duration: 0.15 }, t(87));
      pop("#r_chickenbad", t(87), { d: 0.3 });
      layout(${JSON.stringify(SORTED.filter(k => k !== 'chicken'))}, t(91), 0.45);
      hl("tofu", t(92));
      tl.to("#r_tofup", { opacity: 0, duration: 0.15 }, t(95));
      pop("#r_tofubad", t(95), { d: 0.3 });
      draw("r-tofu2", t(102), 0.4);
      bump("#j_tofu", t(104), 1.08);
      layout(${JSON.stringify(PLAN[1].lineUp)}, t(105), 0.45);
      out("#r-tofu2", t(106) - 0.1, 0.25);
      show("#lsub", t(106), 0.2);

      /* ---- 6. So Ben gets pasta bake, yogurt bowl and lentil soup ---- */
      take(1, 0, "pasta", t(109), 0.5);
      swap("pasta", 2, t(109) + 0.3);
      swap("cheese", 2, t(109) + 0.4);
      take(1, 1, "yogurt", t(111), 0.5);
      swap("yogurt", 1, t(111) + 0.3);
      swap("berries", 1, t(111) + 0.4);
      take(1, 2, "lentil", t(114), 0.5);
      swap("lentils", 1, t(114) + 0.3);
      out("#c1goal", t(115) + 0.3, 0.15);
      show("#c1tot", t(115) + 0.4, 0.3);

      /* ---- 7. Chloe gets her 3. And here is the plan ---- */
      active(2, t(116));
      out("#lt1", t(116), 0.15);
      show("#lt2", t(116) + 0.1, 0.25);
      reset(t(116));
      layout(${JSON.stringify(PLAN[2].lineUp)}, t(116) + 0.05, 0.35);
      take(2, 0, "chicken", t(117), 0.4);
      swap("chicken", 2, t(117) + 0.25);
      swap("rice", 3, t(117) + 0.35);
      take(2, 1, "lentil", t(118), 0.4);
      swap("lentils", 2, t(118) + 0.25);
      take(2, 2, "bean", t(119), 0.4);
      out("#c2goal", t(119) + 0.4, 0.15);
      show("#c2tot", t(119) + 0.5, 0.3);
      active(-1, t(120));
      out("#lineup", t(120), 0.35);
      tl.fromTo("#plan", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out", immediateRender: false }, t(121));
      show("#p2", t(124), 0.3);
      bump(["#c0", "#c1", "#c2"], t(124), 1.03);

      /* ---- 8. Everyone ends up short on protein. Ben by 80 grams. Greedy ---- */
      pop("#c0short", t(128) - 0.1, { d: 0.3 });
      pop("#c1short", t(128) + 0.1, { d: 0.3 });
      pop("#c2short", t(128) + 0.3, { d: 0.3 });
      draw("r-ben", t(131), 0.4);
      bump("#c1short", t(133), 1.15);
      out("#r-ben", t(135) - 0.15, 0.25);
      out("#plan", t(135), 0.25);
      pop("#greedy", t(136), { from: 0.85, d: 0.4 });
      show("#g2", t(140), 0.3);
      show("#g3", t(146) - 0.15, 0.3);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;

/* ---------- takeaway ---------- */
const STEPS = [['Filter', 'rules + pantry'], ['Sort', 'most protein first'], ['Pick', 'kcal fit, up to 3'], ['Take', 'pantry.take()']];
const tk = i => +(W[i] + LEAD - S2).toFixed(3);
const takeaway = `<template>
  <style>${FONTS}
    #t-all { position: absolute; inset: 0; }
    .t-abs { position: absolute; }
    .t-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .step { position: absolute; top: 150px; width: 390px; height: 250px; background: #fff; border-radius: 20px; opacity: 0; }
    .step .n { position: absolute; left: 24px; top: 24px; width: 60px; height: 60px; border-radius: 50%; background: #0e0c1d; color: #fff; font: 800 34px/60px "Manrope", sans-serif; text-align: center; }
    .step .w { position: absolute; left: 104px; top: 14px; font: 700 68px/80px "Fraunces", serif; color: #3b37e6; }
    .step .d { position: absolute; left: 24px; right: 16px; top: 150px; font: 800 32px/44px "Manrope", sans-serif; color: #3e3b52; white-space: nowrap; }
    .t-head { left: 120px; top: 520px; font: 700 78px/1.15 "Fraunces", serif; letter-spacing: -0.03em; white-space: nowrap; opacity: 0; }
    .t-head .a { color: #3b37e6; }
    #t-h2 { top: 630px; }
    #t-next { left: 120px; top: 880px; padding: 8px 30px; background: #0e0c1d; color: #fff; border-radius: 999px; font-size: 36px; line-height: 1.4; opacity: 0; white-space: nowrap; }
    #t-next b { color: #c9c6ff; }
  </style>

  <div id="root" data-composition-id="takeaway" data-width="1920" data-height="1080">
    <div id="t-all" class="clip" data-start="0" data-duration="${D2}" data-track-index="1">
      ${STEPS.map((s, i) => `<div class="step t-ol" id="st${i}" style="left:${120 + i * 430}px"><div class="n">${i + 1}</div><div class="w">${s[0]}</div><div class="d">${s[1]}</div></div>`).join('\n      ')}
      <div id="t-h1" class="t-abs t-head">One <span class="a">shared pantry</span>,</div>
      <div id="t-h2" class="t-abs t-head">so <span class="a">the order</span> matters.</div>
      <div id="t-next" class="t-abs">Next <b>→</b> Lesson 107: Taste-test Kitchen Coach</div>
    </div>
  </div>

  <script>
    (function () {
      // Narration word starts, relative to this scene's start (${S2} s into the film).
      const g = { filter: ${tk(150)}, sort: ${tk(151)}, pick: ${tk(152)}, take: ${tk(153)}, one: ${tk(154)}, so: ${tk(157)}, matters: ${tk(160)} };
      const tl = gsap.timeline({ paused: true });
      const pop = (sel, at) => tl.fromTo(sel, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, at);
      pop("#st0", g.filter - 0.05);
      pop("#st1", g.sort - 0.05);
      pop("#st2", g.pick - 0.05);
      pop("#st3", g.take - 0.05);
      tl.fromTo("#t-h1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, g.one - 0.1);
      tl.fromTo("#t-h2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, g.so - 0.1);
      tl.fromTo("#t-next", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, g.matters + 0.9);
      window.__timelines = window.__timelines || {};
      window.__timelines["takeaway"] = tl;
    })();
  </script>
</template>
`;

const index = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        width: 1920px;
        height: 1080px;
        overflow: hidden;
        background: #f6f1eb;
      }
      #ground {
        position: absolute;
        inset: 0;
        background: #f6f1eb;
      }
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${TOTAL}"
      data-width="1920"
      data-height="1080"
    >
      <div id="ground"></div>
      <div
        id="story"
        data-composition-id="story"
        data-composition-src="compositions/story.html"
        data-start="0"
        data-duration="${S2}"
        data-track-index="1"
        data-track-kind="graphics"
        data-width="1920"
        data-height="1080"
      ></div>
      <div
        id="takeaway"
        data-composition-id="takeaway"
        data-composition-src="compositions/takeaway.html"
        data-start="${S2}"
        data-duration="${D2}"
        data-track-index="1"
        data-track-kind="graphics"
        data-width="1920"
        data-height="1080"
      ></div>
      <audio
        id="voice"
        class="clip"
        src="assets/voice/narration.mp3"
        data-start="${LEAD}"
        data-duration="${AUDIO.toFixed(2)}"
        data-track-index="2"
        data-volume="1"
      ></audio>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;

mkdirSync(here('./compositions'), { recursive: true });
writeFileSync(here('./compositions/story.html'), story);
writeFileSync(here('./compositions/takeaway.html'), takeaway);
writeFileSync(here('./index.html'), index);
console.log('wrote index.html, story.html, takeaway.html. story', S2, 's, takeaway', D2, 's, total', TOTAL, 's');
