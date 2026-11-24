// Builds compositions/story.html for lesson 104. Run: node gen.mjs
// All positions are computed here, so the HTML is static and the timeline is deterministic.
import { writeFileSync, readFileSync } from 'fs';

const words = readFileSync(new URL('./assets/voice/words.json', import.meta.url), 'utf8');
const W = JSON.parse(words).map(w => +(w.start ?? w[1] ?? w).toFixed(3));

const CH = 16.8;                 // JetBrains Mono 28 px advance
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- the JSON panel ---------- */
const JX = 144, JTOP = 70;       // text x, panel top
const jRowTop = i => JTOP + 84 + 54 * i;
const NAMES = ['Ana', 'Ben', 'Chloe'];
const G = [
  { name: 'Ana', kcal: 2600, prot: 100, veg: false, gf: false },
  { name: 'Ben', kcal: 2400, prot: 140, veg: true, gf: false },
  { name: 'Chloe', kcal: 2000, prot: 75, veg: false, gf: true }
];
const jline = (g, key = 'protein_target') =>
  `{"name":"${g.name}","kcal_target":${g.kcal},"${key}":${g.prot},"vegetarian":${g.veg},"gluten_free":${g.gf}}`;
// tokens of a JSON line: [text, kind]
function jtokens(g, key = 'protein_target') {
  return [['{', 'p'], ['"name"', 'k'], [':', 'p'], [`"${g.name}"`, 's'], [',', 'p'],
    ['"kcal_target"', 'k'], [':', 'p'], [String(g.kcal), 'n'], [',', 'p'],
    [`"${key}"`, key === 'protein_target' ? 'k' : 'k bad'], [':', 'p'], [String(g.prot), 'n'], [',', 'p'],
    ['"vegetarian"', 'k'], [':', 'p'], [String(g.veg), 'n'], [',', 'p'],
    ['"gluten_free"', 'k'], [':', 'p'], [String(g.gf), 'n'], ['}', 'p']];
}
const jhtml = toks => toks.map(([t, k]) => k === 'p' ? esc(t) : `<span class="j${k.split(' ')[0]}${k.includes('bad') ? ' bad' : ''}">${esc(t)}</span>`).join('');
const col = (line, sub, from = 0) => line.indexOf(sub, from);

/* ---------- forms ---------- */
const FX = [96, 700, 1304], FTOP = 430, FTOP2 = 70, FW = 520;
const ROWS = ['kcal_target: int', 'protein_target: int', 'vegetarian: bool', 'gluten_free: bool'];
const rowTop = k => 104 + 62 * k;
const vals = g => [String(g.kcal), String(g.prot), g.veg ? 'True' : 'False', g.gf ? 'True' : 'False'];
const jvals = g => [String(g.kcal), String(g.prot), String(g.veg), String(g.gf)];

let forms = '', chips = '';
G.forEach((g, i) => {
  const id = 'f' + i;
  forms += `<div class="form s-ol" id="${id}" style="left:${FX[i]}px; top:${FTOP}px">` +
    `<div class="fh"></div><div class="ftag">Guest</div>` +
    `<div class="fn0" id="${id}n0">name: str</div><div class="fn" id="${id}n">${g.name}</div>` +
    `<div class="rhl" id="${id}hl"></div>` +
    ROWS.map((r, k) => `<div class="flab" style="top:${rowTop(k)}px">${r}</div><div class="slot" style="top:${rowTop(k)}px"></div>` +
      `<div class="fval" id="${id}v${k}" style="top:${rowTop(k)}px">${vals(g)[k]}</div>`).join('') +
    `</div>`;
  // chips: from the JSON token to the form slot (phase A, forms at FTOP)
  const line = jline(g);
  const nameTok = `"${g.name}"`;
  const nc = col(line, nameTok);
  chips += `<div class="chip" id="${id}c4" style="left:${JX + nc * CH}px; top:${jRowTop(i)}px" data-tx="${FX[i] + 492 - nameTok.length * CH}" data-ty="${FTOP + 16}">${esc(nameTok)}</div>`;
  const keys = ['"kcal_target":', '"protein_target":', '"vegetarian":', '"gluten_free":'];
  jvals(g).forEach((v, k) => {
    const c = col(line, keys[k]) + keys[k].length;
    chips += `<div class="chip" id="${id}c${k}" style="left:${JX + c * CH}px; top:${jRowTop(i)}px" data-tx="${FX[i] + 492 - v.length * CH}" data-ty="${FTOP + rowTop(k)}">${v}</div>`;
  });
});

/* ---------- JSON lines ---------- */
let jlines = '';
G.forEach((g, i) => { jlines += `<div class="jl" id="j${i}" style="top:${84 + 54 * i}px">${jhtml(jtokens(g))}</div>`; });
jlines += `<div class="jl" id="j1t" style="top:${84 + 54}px">${jhtml(jtokens(G[1], 'protien_target'))}</div>`;
const benLine = jline(G[1]);
const typoCol = col(benLine, '"protein_target"');
const typoX = JX + (typoCol + 8) * CH, typoY = jRowTop(1) + 24;     // centre of the key

/* ---------- recipes ---------- */
const R = [
  { id: 'rL', name: 'lentil soup', veg: true, gf: true, x: 96 },
  { id: 'rT', name: 'tofu stir-fry', veg: true, gf: false, x: 536 },
  { id: 'rP', name: 'pasta bake', veg: true, gf: false, x: 976 },
  { id: 'rC', name: 'chicken rice bowl', veg: false, gf: true, x: 1416 }
];
const RTOP = 910;
let recipes = '';
R.forEach(r => {
  recipes += `<div class="rc s-ol" id="${r.id}" style="left:${r.x}px; top:${RTOP}px"><div class="rn">${r.name}</div>` +
    `<div class="bd veg" id="${r.id}bv" style="left:24px">${r.veg ? 'veg' : ''}</div>` +
    `<div class="bd gf" id="${r.id}bg" style="left:${r.veg ? 132 : 24}px">${r.gf ? 'GF' : ''}</div>` +
    `<div class="no" id="${r.id}x">✗ ${r.veg ? 'gluten' : 'meat'}</div></div>`;
});

/* ---------- allows code panel ---------- */
const CODE = [
  ['<span class="k">class</span> Guest:', 'class Guest:'],
  ['    <span class="k">def</span> allows(self, recipe):', '    def allows(self, recipe):'],
  ['        <span class="k">if</span> self.vegetarian <span class="k">and not</span> recipe.vegetarian:', '        if self.vegetarian and not recipe.vegetarian:'],
  ['            <span class="k">return</span> <span class="b">False</span>', ''],
  ['        <span class="k">if</span> self.gluten_free <span class="k">and not</span> recipe.gluten_free:', '        if self.gluten_free and not recipe.gluten_free:'],
  ['            <span class="k">return</span> <span class="b">False</span>', ''],
  ['        <span class="k">return</span> <span class="s">True</span>', '']
];
const CPX = 420, CPY = 470;
let codeLines = CODE.map(([h], i) => `<div class="cl" id="k${i}" style="top:${76 + 46 * i}px">${h}</div>`).join('');

const story = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    #root * { font-variant-ligatures: none !important; font-feature-settings: "liga" 0, "calt" 0 !important; }
    #s-all, #s-wrap { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }

    .panel { position: absolute; background: #15132b; border-radius: 24px; overflow: hidden; }
    .bar { position: absolute; left: 0; top: 0; right: 0; height: 64px; background: #211e40; }
    .bar > i { position: absolute; top: 23px; width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }
    .bar > i:nth-child(2) { background: #ffc24b; }
    .bar > i:nth-child(3) { background: #4bd69b; }
    .ttl { position: absolute; left: 120px; top: 12px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }
    #json { left: 96px; top: ${JTOP}px; width: 1728px; height: 266px; }
    .jl { position: absolute; left: 48px; font: 500 28px/48px "JetBrains Mono", monospace; color: #c9c6ff; white-space: pre; opacity: 0; }
    .jk { color: #eceaff; }
    .js { color: #7cf0b5; }
    .jn { color: #ff8fab; }
    .jk.bad { color: #fff; background: #b8235a; border-radius: 6px; }
    .jhl { position: absolute; left: 0; width: 1728px; height: 48px; background: #2e2a5c; opacity: 0; }

    #plan { left: 96px; top: 440px; width: 1000px; height: 220px; opacity: 0; }
    .cl { position: absolute; left: 48px; font: 500 28px/48px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; }
    .cl .k { color: #ffc24b; }
    .cl .s { color: #7cf0b5; }
    .cl .b { color: #ff8fab; }
    .cl .m { color: #a9a5d6; }
    #code { left: ${CPX}px; top: ${CPY}px; width: 1080px; height: 420px; opacity: 0; }
    #code .cl { opacity: 0; }

    .form { position: absolute; width: ${FW}px; height: 366px; background: #fff; border-radius: 20px; overflow: hidden; opacity: 0; }
    .fh { position: absolute; left: 0; top: 0; width: ${FW}px; height: 80px; background: #e6e3ff; border-bottom: 4px solid #0e0c1d; }
    .ftag { position: absolute; left: 28px; top: 18px; font: 700 34px/44px "JetBrains Mono", monospace; color: #3b37e6; }
    .fn0 { position: absolute; right: 28px; top: 20px; font: 500 28px/40px "JetBrains Mono", monospace; color: #5d596e; }
    .fn { position: absolute; right: 28px; top: 10px; font: 700 46px/60px "Fraunces", serif; opacity: 0; }
    .flab { position: absolute; left: 28px; font: 500 28px/48px "JetBrains Mono", monospace; color: #3e3b52; white-space: pre; }
    .slot { position: absolute; right: 28px; width: 92px; height: 44px; border-bottom: 4px dashed #8a8698; }
    .fval { position: absolute; right: 28px; font: 500 28px/48px "JetBrains Mono", monospace; color: #3b37e6; opacity: 0; background: #fff; min-width: 104px; text-align: right; }
    .rhl { position: absolute; left: 10px; width: ${FW - 20}px; height: 52px; border-radius: 10px; background: #fbebd2; box-shadow: 0 0 0 3px #b9741a; opacity: 0; top: ${rowTop(0) - 2}px; }
    .chip { position: absolute; font: 500 28px/48px "JetBrains Mono", monospace; color: #fff; background: #3b37e6; border-radius: 8px; white-space: pre; opacity: 0; }

    .pill { position: absolute; height: 64px; padding: 0 26px; border-radius: 14px; font: 800 34px/64px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }
    .pill.bad { background: #fbe0ea; color: #b8235a; box-shadow: 0 0 0 5px #b8235a; }
    .pill.ok { background: #ddefe6; color: #1f7a5c; box-shadow: 0 0 0 5px #1f7a5c; }
    .pill.acc { background: #e6e3ff; color: #3b37e6; box-shadow: 0 0 0 4px #3b37e6; }
    .pill.mute { background: #ece7df; color: #3e3b52; box-shadow: 0 0 0 4px #3e3b52; }
    .pill code { font: 500 32px/64px "JetBrains Mono", monospace; }

    .gate { position: absolute; top: 452px; width: 500px; height: 52px; background: #fff; border-radius: 12px; font: 500 28px/52px "JetBrains Mono", monospace; text-align: center; color: #0e0c1d; box-shadow: 0 0 0 5px #0e0c1d; opacity: 0; }
    .gate > i { position: absolute; top: -26px; width: 10px; height: 104px; background: #0e0c1d; border-radius: 4px; }

    .rc { position: absolute; width: 400px; height: 130px; background: #fff; border-radius: 18px; opacity: 0; }
    .rn { position: absolute; left: 24px; top: 14px; font: 800 34px/46px "Manrope", sans-serif; white-space: nowrap; }
    .bd { position: absolute; top: 70px; height: 44px; padding: 0 18px; border-radius: 22px; font: 800 28px/44px "Manrope", sans-serif; color: #fff; opacity: 0; }
    .bd:empty { display: none; }
    .bd.veg { background: #1f7a5c; }
    .bd.gf { background: #3b37e6; }
    .no { position: absolute; right: 16px; top: 68px; height: 48px; padding: 0 16px; border-radius: 12px; background: #b8235a; color: #fff; font: 800 30px/48px "Manrope", sans-serif; opacity: 0; }

    #typo { left: 96px; top: 640px; width: 1728px; height: 158px; opacity: 0; }
    #tchip { left: 0; top: 0; font: 500 28px/48px "JetBrains Mono", monospace; color: #fff; background: #b8235a; border-radius: 8px; white-space: pre; opacity: 0; }
    #terr { left: 96px; top: 824px; font: 500 28px/48px "JetBrains Mono", monospace; color: #b8235a; white-space: pre; opacity: 0; }
    #stamp { left: 760px; top: 200px; padding: 6px 30px; border-radius: 14px; background: #fff; color: #b8235a; box-shadow: 0 0 0 7px #b8235a; font: 700 64px/84px "Fraunces", serif; opacity: 0; }

    #s-lines { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks path { fill: none; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    #s-cursor { left: 0; top: 0; width: 56px; height: 56px; opacity: 0; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="62" data-track-index="1">
      <div id="s-wrap">

        <div id="json" class="panel s-ol">
          <div class="bar"><i style="left:26px"></i><i style="left:56px"></i><i style="left:86px"></i><span class="ttl">data/guests.json</span></div>
          <div class="jhl" id="jh0" style="top:84px"></div>
          <div class="jhl" id="jh1" style="top:138px"></div>
          <div class="jhl" id="jh2" style="top:192px"></div>
          ${jlines}
        </div>

        <div id="plan" class="panel s-ol">
          <div class="bar"><i style="left:26px"></i><i style="left:56px"></i><i style="left:86px"></i><span class="ttl">planner.py</span></div>
          <div class="cl" style="top:84px"><span class="m"># ... 100 lines later ...</span></div>
          <div class="cl" style="top:138px">goal = guest[<span class="s">"protein_target"</span>]</div>
        </div>

        <div class="pill mute" id="pDict" style="left:96px; top:356px">a dict: any string key goes in</div>
        <div class="pill mute" id="pQuiet" style="left:760px; top:356px">no complaint</div>
        <div class="pill bad" id="pKey" style="left:1170px; top:530px">KeyError: 'protein_target'</div>
        <div class="pill acc" id="pStar" style="left:96px; top:356px"><code>Guest(**row)</code> for each line</div>

        ${forms}

        <div class="gate" id="g0" style="left:106px"><i style="left:-5px"></i><i style="right:-5px"></i>ana.allows(recipe)</div>
        <div class="gate" id="g1" style="left:710px"><i style="left:-5px"></i><i style="right:-5px"></i>ben.allows(recipe)</div>
        <div class="gate" id="g2" style="left:1314px"><i style="left:-5px"></i><i style="right:-5px"></i>chloe.allows(recipe)</div>

        <div id="code" class="panel s-ol">
          <div class="bar"><i style="left:26px"></i><i style="left:56px"></i><i style="left:86px"></i><span class="ttl">models.py</span></div>
          ${codeLines}
        </div>

        ${recipes}

        <div id="typo" class="panel s-ol">
          <div class="bar"><i style="left:26px"></i><i style="left:56px"></i><i style="left:86px"></i><span class="ttl">data/guests.json, Ben's line</span></div>
          <div class="jl" id="jt" style="top:84px; opacity:1">${jhtml(jtokens(G[1], 'protien_target'))}</div>
        </div>
        <div id="tchip" class="s-abs" data-layout-allow-overlap>"protien_target":140</div>
        <div id="terr" class="s-abs">TypeError: Guest.__init__() got an unexpected keyword argument 'protien_target'</div>
        <div id="stamp" class="s-abs" data-layout-allow-overlap>TypeError</div>
        <div class="pill acc" id="pLoad" style="left:96px; top:920px">at load time: <code>Guest(**row)</code></div>
        <div class="pill ok" id="pGood" style="left:760px; top:920px">fails early. Good.</div>

        ${chips}

        <svg id="s-lines" class="s-abs" viewBox="0 0 1920 1080">
          <path id="far" d="M1400 528 C1380 420 1100 330 ${typoX + 40} ${typoY + 30}" fill="none" stroke="#b8235a" stroke-width="5" stroke-dasharray="14 12" opacity="0" />
          <path id="farH" d="M${typoX + 40} ${typoY + 30} l30 -2 M${typoX + 40} ${typoY + 30} l14 26" fill="none" stroke="#b8235a" stroke-width="6" stroke-linecap="round" opacity="0" />
          <text id="farT" x="1440" y="420" font-family="Manrope" font-weight="800" font-size="34" fill="#b8235a" opacity="0">far from the cause</text>
        </svg>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-json" style="stroke:#ffc24b" />
          <path id="r-typo" style="stroke:#ff8fab" />
          <path id="r-pk" style="stroke:#b8235a" />
          <path id="r-allows" style="stroke:#ffc24b" />
          <path id="r-veg" style="stroke:#ffc24b" />
          <path id="r-gf" style="stroke:#ffc24b" />
        </svg>
        <svg id="s-cursor" class="s-abs" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds). The voice starts 0.6 s into the film.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });

      const ringD = (cx, cy, rx, ry) => \`M\${cx - rx + 6} \${cy + 4} C\${cx - rx + 2} \${cy - ry} \${cx + rx} \${cy - ry - 3} \${cx + rx} \${cy} C\${cx + rx} \${cy + ry} \${cx - rx - 3} \${cy + ry + 3} \${cx - rx} \${cy - 8}\`;
      const ring = (id, cx, cy, rx, ry) => { const p = document.getElementById(id); p.setAttribute("d", ringD(cx, cy, rx, ry)); const L = p.getTotalLength(); p.dataset.len = L; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; };
      ring("r-json", 300, ${JTOP + 32}, 200, 34);
      ring("r-typo", ${typoX}, ${typoY}, ${16 * CH / 2 + 18}, 30);
      ring("r-pk", 1400, 562, 250, 50);
      ring("r-allows", ${CPX + 48 + 12 * CH}, ${CPY + 76 + 46 + 24}, ${6 * CH / 2 + 16}, 28);

      const pop = (sel, at, o) => { o = o || {}; tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }, at); };
      const show = (sel, at, d) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }, at);
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const draw = (id, at, d) => { const p = document.getElementById(id); tl.set(p, { opacity: 1 }, at); tl.fromTo(p, { strokeDashoffset: +p.dataset.len }, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out", immediateRender: false }, at); };
      const bump = (sel, at, s) => tl.fromTo(sel, { scale: 1 }, { scale: s || 1.06, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, at);
      const type = (sel, at, n, d) => tl.fromTo(sel, { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.025 * n, ease: \`steps(\${n})\`, immediateRender: false }, at);
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", { x: x, y: y, duration: d || 0.45, ease: "power3.inOut" }, at);
      // a chip flies from its JSON token to its slot on the form, then the form value appears
      const fly = (f, k, at, d) => {
        const c = document.getElementById(f + "c" + k);
        const dx = +c.dataset.tx - parseFloat(c.style.left), dy = +c.dataset.ty - parseFloat(c.style.top);
        tl.set(c, { opacity: 1, x: 0, y: 0 }, at);
        tl.to(c, { x: dx, y: dy, duration: d, ease: "power2.inOut" }, at);
        tl.set(c, { opacity: 0 }, at + d);
        if (k === 4) { tl.set("#" + f + "n0", { opacity: 0 }, at + d); pop("#" + f + "n", at + d, { d: 0.3, from: 0.7 }); }
        else pop("#" + f + "v" + k, at + d, { d: 0.25, from: 0.7 });
      };
      const fill = (i, at, step, d) => { const f = "f" + i; show("#jh" + i, at - 0.1, 0.2); [4, 0, 1, 2, 3].forEach((k, n) => fly(f, k, at + n * step, d)); out("#jh" + i, at + 4 * step + d, 0.2); };

      tl.set("#s-cursor", { x: 1000, y: 700 }, 0);
      tl.set("#stamp", { rotation: -7 }, 0);

      /* ---- 1. Kitchen Coach reads Ana, Ben and Chloe from a JSON file. A dict with string keys ---- */
      type("#j0", t(3) - 0.1, 30, 0.45);
      type("#j1", t(4) - 0.05, 30, 0.45);
      type("#j2", t(6), 30, 0.45);
      draw("r-json", t(9), 0.45);
      out("#r-json", t(11), 0.25);
      pop("#pDict", t(15), { d: 0.4 });
      tl.to("#json .jk", { color: "#ffc24b", duration: 0.3 }, t(17));

      /* ---- 2. One typo, and nothing complains. Later, a KeyError far from the cause ---- */
      tl.to("#s-cursor", { opacity: 1, duration: 0.2 }, t(19));
      cursorTo(${typoX - 20}, ${typoY + 4}, t(19), 0.5);
      tl.set("#j1t", { opacity: 1 }, t(20) + 0.05);
      tl.set("#j1", { opacity: 0 }, t(20) + 0.05);
      draw("r-typo", t(21), 0.4);
      tl.to("#s-cursor", { opacity: 0, duration: 0.2 }, t(23));
      pop("#pQuiet", t(25), { d: 0.4 });
      out("#r-typo", t(27) - 0.2, 0.2);
      pop("#plan", t(27), { from: 0.9, d: 0.4 });
      draw("r-pk", t(33) + 0.15, 0.4);
      pop("#pKey", t(33), { d: 0.35 });
      show(["#far", "#farH"], t(35), 0.35);
      show("#farT", t(35) + 0.2, 0.3);
      draw("r-typo", t(36), 0.4);

      /* ---- 3. Give each kind of thing a class. A Guest dataclass is a form with labelled fields ---- */
      out(["#plan", "#pKey", "#far", "#farH", "#farT", "#pQuiet", "#pDict", "#r-pk", "#r-typo"], t(39) - 0.2, 0.3);
      tl.set("#j1", { opacity: 1 }, t(39) + 0.1);
      tl.set("#j1t", { opacity: 0 }, t(39) + 0.1);
      tl.to("#json .jk", { color: "#eceaff", duration: 0.3 }, t(39));
      pop("#f0", t(47), { d: 0.4, from: 0.8 });
      pop("#f1", t(47) + 0.15, { d: 0.4, from: 0.8 });
      pop("#f2", t(48), { d: 0.4, from: 0.8 });
      tl.to(".flab", { color: "#0e0c1d", duration: 0.2 }, t(53));
      bump(["#f0", "#f1", "#f2"], t(53), 1.03);
      show(["#f0hl", "#f1hl", "#f2hl"], t(55), 0.2);
      tl.to(["#f0hl", "#f1hl", "#f2hl"], { y: 62, duration: 0.3, ease: "power3.inOut" }, t(57));
      tl.to(["#f0hl", "#f1hl", "#f2hl"], { y: 124, duration: 0.3, ease: "power3.inOut" }, t(59));
      tl.to(["#f0hl", "#f1hl", "#f2hl"], { y: 186, duration: 0.3, ease: "power3.inOut" }, t(60));
      out(["#f0hl", "#f1hl", "#f2hl"], t(62) - 0.1, 0.2);

      /* ---- 4. Two stars unpack each JSON line into those fields. Ana, Ben and Chloe fill in ---- */
      pop("#pStar", t(62), { d: 0.4 });
      fill(0, t(64), 0.4, 0.6);
      fill(1, t(72) - 0.2, 0.12, 0.5);
      fill(2, t(74) - 0.1, 0.12, 0.5);

      /* ---- 5. Recipes get a class too, with badges. Veg. Gluten free ---- */
      out(["#json", "#pStar"], t(77) - 0.3, 0.3);
      tl.to(["#f0", "#f1", "#f2"], { y: ${FTOP2 - FTOP}, duration: 0.6, ease: "power3.inOut" }, t(77) - 0.2);
      pop("#rL", t(77) + 0.1, { d: 0.35, from: 0.8 });
      pop("#rT", t(77) + 0.25, { d: 0.35, from: 0.8 });
      pop("#rP", t(77) + 0.4, { d: 0.35, from: 0.8 });
      pop("#rC", t(77) + 0.55, { d: 0.35, from: 0.8 });
      pop(["#rLbv", "#rTbv", "#rPbv"], t(84), { d: 0.35 });
      pop(["#rLbg", "#rCbg"], t(85), { d: 0.35 });

      /* ---- 6. The rule moves onto the guest. Guest.allows puts a gate in front of each friend ---- */
      pop("#code", t(87), { from: 0.92, d: 0.35 });
      ${CODE.map((c, i) => `type("#k${i}", t(88) + ${(i * 0.12).toFixed(2)}, ${Math.max(c[1].length, 12)}, 0.3);`).join('\n      ')}
      tl.to("#s-cursor", { opacity: 1, duration: 0.2 }, t(92));
      cursorTo(${CPX + 48 + 9 * CH}, ${CPY + 76 + 46 + 30}, t(92), 0.45);
      draw("r-allows", t(95), 0.4);
      tl.to("#s-cursor", { opacity: 0, duration: 0.2 }, t(96) + 0.3);
      out(["#code", "#r-allows"], t(97) + 0.1, 0.3);
      tl.fromTo(".gate", { opacity: 1, clipPath: "inset(-30px 100% -30px -30px)" }, { opacity: 1, clipPath: "inset(-30px -30px -30px -30px)", duration: 0.5, ease: "power2.out", stagger: 0.15, immediateRender: false }, t(98));

      /* ---- 7. The chicken bowl slides toward Ben. It has meat. It bounces off ---- */
      tl.to("#rC", { x: ${760 - 1416}, y: ${528 - RTOP}, duration: 1.0, ease: "power2.inOut" }, t(107));
      bump("#g1", t(109) + 0.2, 1.06);
      tl.to("#rC", { x: ${760 - 1416 - 14}, duration: 0.07, yoyo: true, repeat: 3, ease: "none" }, t(109) + 0.2);
      pop("#rCx", t(112), { d: 0.35 });
      tl.to("#rC", { x: 0, y: 0, duration: 0.8, ease: "back.out(1.4)" }, t(114));

      /* ---- 8. Pasta and tofu slide toward Chloe. Both have gluten. Off they go ---- */
      tl.to("#rP", { x: ${1364 - 976}, y: ${528 - RTOP}, duration: 0.9, ease: "power2.inOut" }, t(116));
      tl.to("#rT", { x: ${1364 - 536}, y: ${700 - RTOP}, duration: 0.9, ease: "power2.inOut" }, t(118));
      bump("#g2", t(121), 1.06);
      tl.to(["#rP", "#rT"], { x: "-=14", duration: 0.07, yoyo: true, repeat: 3, ease: "none" }, t(121));
      pop(["#rPx", "#rTx"], t(124), { d: 0.35 });
      tl.to(["#rP", "#rT"], { x: 0, y: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.12 }, t(125));

      /* ---- 9. The typo? Ben's form has no field with that spelling. TypeError at load time ---- */
      out(["#rL", "#rT", "#rP", "#rC", ".gate"], t(128) - 0.1, 0.3);
      pop("#typo", t(129) - 0.1, { from: 0.9, d: 0.4 });
      tl.set("#tchip", { x: ${96 + 48 + col(jline(G[1], 'protien_target'), '"protien_target"') * CH}, y: ${640 + 84} }, 0);
      tl.set("#tchip", { opacity: 1 }, t(130));
      tl.to("#tchip", { x: 820, y: ${FTOP2 + rowTop(1)}, duration: 0.7, ease: "power2.inOut" }, t(130));
      tl.to("#f1", { x: -14, duration: 0.07, yoyo: true, repeat: 5, ease: "none" }, t(134));
      tl.to("#tchip", { y: ${FTOP2 + rowTop(1) + 120}, x: 760, rotation: -10, duration: 0.6, ease: "power2.in" }, t(135));
      out("#tchip", t(137) - 0.1, 0.3);
      pop("#stamp", t(138), { from: 1.6, ease: "power3.out", d: 0.3 });
      type("#terr", t(138) + 0.2, 79, 0.6);
      pop("#pLoad", t(140), { d: 0.35 });
      pop("#pGood", t(144), { d: 0.35 });
      bump("#pGood", t(146), 1.08);

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.2, ease: "power2.in" }, 61.75);

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
writeFileSync(new URL('./compositions/story.html', import.meta.url), story);
console.log('story.html written;', W.length, 'words; typo key centre', typoX, typoY);
