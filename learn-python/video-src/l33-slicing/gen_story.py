"""Writes compositions/story.html for the l33 slicing video.
The repeated elements (7 loaf slices, labels, the pieces that land on the board) are generated
here so every timed element is still a plain tag with a stable id in the HTML."""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
W = json.loads((HERE / 'assets/voice/words.json').read_text())
W = [w['start'] for w in W] if isinstance(W, list) and W and isinstance(W[0], dict) else W

STORY = 60.4
DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
KM = [5, 8, 6, 0, 10, 7, 16]

# Loaf geometry: slice i at x = 1173 + 92 i, 86 wide; boundary k (a cut line) at x = 1170 + 92 k.
SX = lambda i: 1173 + 92 * i
BX = lambda k: 1170 + 92 * k
LOAF_TOP, BOARD_TOP = 310, 715

def slice_div(id_, i, left, top, extra=''):
    return (f'<div id="{id_}" class="s-abs sl s-ol{extra}" style="left:{left}px; top:{top}px">'
            f'<span>{DAYS[i]}</span><b>{KM[i]}</b></div>')

loaf = ''.join(slice_div(f'l{i}', i, SX(i), LOAF_TOP, ' s-hide') for i in range(7))
idx = ''.join(f'<div id="ix{i}" class="s-abs ix s-hide" style="left:{SX(i)}px">{i}</div>' for i in range(7))
neg = ''.join(f'<div id="nx{i}" class="s-abs nx s-hide" style="left:{SX(i)}px">{i - 7}</div>' for i in range(7))

# Pieces that land on the board, one set per slice.
SETS = {'a': [0, 1, 2], 'b': [4, 5, 6], 'c': [0, 2, 4, 6], 'd': [6, 5, 4, 3, 2, 1, 0]}
PIECE_X = {}
pieces = ''
for key, items in SETS.items():
    n = len(items)
    x0 = 1150 + (684 - (92 * n - 6)) // 2
    for j, i in enumerate(items):
        PIECE_X[(key, i)] = x0 + 92 * j
        pieces += slice_div(f'p{key}{i}', i, x0 + 92 * j, BOARD_TOP, ' s-hide')
lift = {f'p{k}{i}': SX(i) - x for (k, i), x in PIECE_X.items()}

html = f'''<template>
  <style>
    @font-face {{ font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }}
    @font-face {{ font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }}
    @font-face {{ font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }}
    #root * {{ font-variant-ligatures: none !important; font-feature-settings: "liga" 0, "calt" 0 !important; }}
    #s-all, #s-wrap {{ position: absolute; inset: 0; }}
    .s-abs {{ position: absolute; }}
    .s-ol {{ box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }}
    .s-hide {{ opacity: 0; }}

    /* header card: Ana */
    #h-ana {{ left: 1150px; top: 96px; width: 684px; height: 120px; background: #fff; border-radius: 22px; }}
    #h-ana .av {{ position: absolute; left: 26px; top: 26px; width: 68px; height: 68px; border-radius: 50%; background: #3b37e6; color: #fff; font-size: 38px; line-height: 68px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }}
    #h-ana .tx {{ position: absolute; left: 116px; top: 0; height: 120px; font: 700 46px/120px "Fraunces", serif; white-space: nowrap; letter-spacing: -0.01em; }}

    /* the loaf: one slice per day */
    .sl {{ width: 86px; height: 180px; background: #fbebd2; border-radius: 34px 34px 10px 10px; text-align: center; }}
    .sl span {{ display: block; margin-top: 30px; font-size: 28px; line-height: 36px; color: #3e3b52; }}
    .sl b {{ display: block; margin-top: 30px; font: 700 44px/56px "JetBrains Mono", monospace; color: #0e0c1d; }}
    .ix {{ top: 248px; width: 86px; height: 50px; text-align: center; font: 700 36px/50px "JetBrains Mono", monospace; color: #3b37e6; }}
    .nx {{ top: 512px; width: 86px; height: 44px; text-align: center; font: 700 30px/44px "JetBrains Mono", monospace; color: #b8235a; }}
    .cut {{ top: 236px; width: 0; height: 300px; border-left: 6px dashed #3b37e6; }}
    .tag {{ top: 512px; height: 48px; line-height: 48px; padding: 0 18px; border-radius: 999px; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    #tg-start {{ left: 1150px; background: #e6e3ff; color: #3b37e6; }}
    #tg-stop {{ left: {BX(3) - 46}px; background: #e6e3ff; color: #3b37e6; }}
    .pill {{ top: 590px; height: 60px; line-height: 60px; padding: 0 26px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    #pl-range {{ left: 1150px; background: #fbe0ea; color: #b8235a; }}
    #pl-whole {{ left: 1150px; background: #ddefe6; color: #1f7a5c; }}
    #pl-end {{ left: 1150px; background: #e6e3ff; color: #3b37e6; }}
    #pl-every {{ left: 1150px; background: #e6e3ff; color: #3b37e6; }}
    #pl-flip {{ left: 1150px; background: #e6e3ff; color: #3b37e6; }}

    /* the cutting board, where the new list lands */
    #board {{ left: 1150px; top: 680px; width: 684px; height: 250px; background: #ece7df; border-radius: 26px; }}
    #board-lb {{ left: 1176px; top: 940px; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; background: #0e0c1d; color: #fff; font-size: 28px; white-space: nowrap; }}

    /* knife: blade edge on the element's centre line (x 30) */
    #knife {{ left: 0; top: 0; width: 60px; height: 330px; }}

    /* code panel: 38px mono = 22.8px per char, text at page x 136, rows 60px from panel y 88 */
    #s-code {{ left: 96px; top: 96px; width: 1000px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1000px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ margin-left: 14px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    .s-ln {{ position: absolute; left: 40px; font: 500 38px/60px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .n {{ color: #ffc24b; }}
    #s-div {{ position: absolute; left: 40px; top: 330px; width: 920px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 340px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; left: 40px; font: 500 38px/56px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    #pl-slice {{ left: 610px; top: 248px; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 999px; background: #ffc24b; color: #0e0c1d; font-size: 28px; white-space: nowrap; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="h-ana" class="s-abs s-ol"><div class="av">A</div><div class="tx">Ana's runs this week</div></div>
        {idx}
        {loaf}
        {neg}
        <div id="tg-start" class="s-abs tag s-hide">start</div>
        <div id="tg-stop" class="s-abs tag s-hide">stop</div>
        <div id="pl-range" class="s-abs pill s-hide">like range: the stop is not included</div>
        <div id="pl-whole" class="s-abs pill s-hide">the loaf is still whole</div>
        <div id="pl-end" class="s-abs pill s-hide">no stop: cut to the end</div>
        <div id="pl-every" class="s-abs pill s-hide">step 2: every second slice</div>
        <div id="pl-flip" class="s-abs pill s-hide">step -1: back to front</div>

        <div id="board" class="s-abs s-ol s-hide"></div>
        <div id="board-lb" class="s-abs s-hide">a new list</div>
        {pieces}

        <div id="cut0" class="s-abs cut s-hide" style="left:{BX(0) - 3}px"></div>
        <div id="cut3" class="s-abs cut s-hide" style="left:{BX(3) - 3}px"></div>
        <div id="cut4" class="s-abs cut s-hide" style="left:{BX(4) - 3}px"></div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol s-hide">
          <div id="s-bar"><i></i><i></i><i></i><span>ana_week.py</span></div>
          <div class="s-ln" id="L1" style="top:88px">week_km = [<span class="n">5</span>, <span class="n">8</span>, <span class="n">6</span>, <span class="n">0</span>, <span class="n">10</span>, <span class="n">7</span>, <span class="n">16</span>]</div>
          <div class="s-ln" id="L2a" style="top:148px"><span class="k">print</span>(week_km[<span class="n">0</span>:<span class="n">3</span>])</div>
          <div class="s-ln" id="L2b" style="top:148px"><span class="k">print</span>(week_km[<span class="n">-3</span>:])</div>
          <div class="s-ln" id="L2c" style="top:148px"><span class="k">print</span>(week_km[::<span class="n">2</span>])</div>
          <div class="s-ln" id="L2d" style="top:148px"><span class="k">print</span>(week_km[::<span class="n">-1</span>])</div>
          <div class="s-ln" id="L3" style="top:208px"><span class="k">print</span>(week_km)</div>
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
          <div class="s-out" id="oa" style="top:390px">[5, 8, 6]</div>
          <div class="s-out" id="ob" style="top:390px">[10, 7, 16]</div>
          <div class="s-out" id="oc" style="top:390px">[5, 6, 10, 16]</div>
          <div class="s-out" id="od" style="top:390px">[16, 7, 10, 0, 6, 8, 5]</div>
          <div class="s-out" id="o2" style="top:446px">[5, 8, 6, 0, 10, 7, 16]</div>
        </div>
        <div id="pl-slice" class="s-abs s-hide">← a slice</div>

        <svg id="knife" class="s-abs s-hide" viewBox="0 0 60 330">
          <rect x="12" y="4" width="36" height="112" rx="12" fill="#0e0c1d"/>
          <circle cx="30" cy="36" r="6" fill="#ece7df"/><circle cx="30" cy="80" r="6" fill="#ece7df"/>
          <rect x="6" y="114" width="48" height="14" rx="4" fill="#6f6b80" stroke="#0e0c1d" stroke-width="3"/>
          <path d="M30 128 L30 322 Q8 300 8 250 L8 128 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round"/>
          <path d="M30 128 L30 322" stroke="#3b37e6" stroke-width="4"/>
        </svg>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-sl" style="stroke:#ffc24b" />
          <path id="r-0" style="stroke:#ffc24b" />
          <path id="r-3" style="stroke:#ffc24b" />
          <path id="r-s3" style="stroke:#b8235a" />
          <path id="r-m3" style="stroke:#ffc24b" />
          <path id="r-nx" style="stroke:#b8235a" />
          <path id="r-2" style="stroke:#ffc24b" />
          <path id="r-m1" style="stroke:#ffc24b" />
          <path id="r-sun" style="stroke:#3b37e6" />
        </svg>
        <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {{
      // Word start times from the narration (seconds). The voice starts 0.6 s into the film.
      const W = {json.dumps(W)};
      const t = (i) => W[i] + 0.6;
      const LIFT = {json.dumps(lift)};
      const tl = gsap.timeline({{ paused: true }});

      const ring = (id, cx, cy, rx, ry) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d);
        const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L;
      }};
      const col = (c) => 136 + c * 22.8;          // left edge of a code column
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const R2 = 274;                             // centre y of code row 2
      ring("r-sl", mid(13, 17), R2, 72, 38);      // [0:3]
      ring("r-0", mid(14, 14), R2, 22, 32);       // 0
      ring("r-3", mid(16, 16), R2, 22, 32);       // 3
      ring("r-s3", {SX(3) + 43}, 398, 66, 128);   // slice 3 on the loaf
      ring("r-m3", mid(14, 15), R2, 36, 34);      // -3
      ring("r-nx", {SX(4) + 43}, 534, 42, 30);    // the -3 label
      ring("r-2", mid(16, 16), R2, 22, 32);       // step 2
      ring("r-m1", mid(16, 17), R2, 36, 34);      // step -1
      ring("r-sun", {PIECE_X[('d', 6)] + 43}, {BOARD_TOP + 90}, 64, 120);  // Sunday, first on the board

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out", immediateRender: false }}, at);
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.08, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const type = (sel, at, n, d) => tl.fromTo(sel, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.04 * n, ease: `steps(${{n}})`, immediateRender: false }}, at);
      // A copy of a loaf slice rises off the loaf and lands on the board. The loaf slice stays.
      const lift = (key, i, at) => {{
        const id = `#p${{key}}${{i}}`;
        tl.set(id, {{ opacity: 1 }}, at);
        tl.fromTo(id, {{ x: LIFT[`p${{key}}${{i}}`], y: {LOAF_TOP - BOARD_TOP}, rotation: 0 }}, {{ keyframes: [
          {{ x: LIFT[`p${{key}}${{i}}`] * 0.5, y: {LOAF_TOP - BOARD_TOP} - 60, rotation: -6, duration: 0.3, ease: "power2.out" }},
          {{ x: 0, y: 0, rotation: 0, duration: 0.45, ease: "power2.inOut" }}
        ], immediateRender: false }}, at);
      }};
      // The knife drops at boundary k and leaves a dashed cut line.
      const knife = (k, at, cut) => {{
        const x = {BX(0)} + 92 * k - 30;
        tl.set("#knife", {{ x: x }}, at - 0.01);
        tl.fromTo("#knife", {{ opacity: 0, y: 120 }}, {{ opacity: 1, y: 230, duration: 0.35, ease: "power3.in", immediateRender: false }}, at);
        tl.to("#knife", {{ opacity: 0, y: 250, duration: 0.2 }}, at + 0.55);
        show(cut, at + 0.3, 0.15);
      }};

      /* ---- 1. Ana ran every day. Seven numbers on one list. A loaf, slices 0 to 6 ---- */
      tl.fromTo("#s-code", {{ opacity: 0, y: 60 }}, {{ opacity: 1, y: 0, duration: 0.5, ease: "expo.out", immediateRender: false }}, t(6) - 0.3);
      type("#L1", t(6), 34, 0.9);
      for (let i = 0; i < 7; i++) pop(`#l${{i}}`, t(15) + i * 0.08, {{ from: 0.5, d: 0.35 }});
      for (let i = 0; i < 7; i++) pop(`#ix${{i}}`, t(21) + i * (t(24) - t(21)) / 6, {{ from: 0.3, d: 0.3 }});

      /* ---- 2. The first three days: list name, square brackets, 0 colon 3. A slice ---- */
      for (let i = 0; i < 3; i++) bump(`#l${{i}}`, t(28) + i * 0.12);
      type("#L2a", t(31), 19, 0.7);
      draw("r-sl", t(36), 0.45);
      pop("#pl-slice", t(45), {{ from: 0.6 }});

      /* ---- 3. 0 is where the knife starts, 3 where it stops. Slice 3 stays. Like range ---- */
      out(["#r-sl", "#pl-slice"], t(46) - 0.2, 0.2);
      draw("r-0", t(46), 0.35);
      knife(0, t(50), "#cut0");
      pop("#tg-start", t(51), {{ from: 0.6 }});
      out("#r-0", t(52) - 0.1, 0.2);
      draw("r-3", t(52), 0.35);
      knife(3, t(55), "#cut3");
      pop("#tg-stop", t(56), {{ from: 0.6 }});
      draw("r-s3", t(59), 0.5);
      pop("#pl-range", t(66), {{ from: 0.6 }});
      out("#r-3", t(70), 0.2);

      /* ---- 4. The knife lifts away a new list: 0, 1, 2. 5, 8, 6 km. The loaf is still whole ---- */
      out(["#pl-range", "#tg-start", "#tg-stop", "#r-s3"], t(72) - 0.3, 0.25);
      pop("#board", t(72), {{ from: 0.9 }});
      for (let i = 0; i < 3; i++) lift("a", i, t(74) + i * 0.12);
      show("#board-lb", t(77), 0.3);
      show("#oa", t(78), 0.2);
      bump("#pa0", t(80)); bump("#pa1", t(81)); bump("#pa2", t(83));
      bump("#oa", t(84));
      for (let i = 0; i < 7; i++) bump(`#l${{i}}`, t(91) + i * 0.05);
      pop("#pl-whole", t(93), {{ from: 0.6 }});
      type("#L3", t(96), 14, 0.4);
      show("#o2", t(98), 0.25);

      /* ---- 5. Leave a number out: cut to the end. -3: gives the last three days ---- */
      const B5 = t(101) - 0.3;
      out(["#pl-whole", "#cut0", "#cut3", "#pa0", "#pa1", "#pa2", "#oa", "#L2a"], B5, 0.25);
      show("#L2b", B5 + 0.2, 0.25);
      pop("#pl-end", t(107), {{ from: 0.6 }});
      draw("r-m3", t(112), 0.4);
      for (let i = 0; i < 7; i++) pop(`#nx${{i}}`, t(112) + i * 0.06, {{ from: 0.4, d: 0.3 }});
      draw("r-nx", t(113), 0.35);
      knife(4, t(114), "#cut4");
      for (let i = 4; i < 7; i++) lift("b", i, t(115) + (i - 4) * 0.12);
      show("#ob", t(117), 0.2);

      /* ---- 6. A second colon adds a step. Step 2: every second slice, 0, 2, 4, 6 ---- */
      const B6 = t(120) - 0.3;
      out(["#pl-end", "#r-m3", "#r-nx", "#cut4", "#pb4", "#pb5", "#pb6", "#ob", "#L2b"], B6, 0.25);
      for (let i = 0; i < 7; i++) out(`#nx${{i}}`, B6, 0.25);
      show("#L2c", t(122), 0.25);
      draw("r-2", t(127), 0.35);
      pop("#pl-every", t(129), {{ from: 0.6 }});
      [[0, 132], [2, 133], [4, 134], [6, 136]].forEach(([i, w]) => {{ bump(`#l${{i}}`, t(w)); lift("c", i, t(w)); }});
      show("#oc", t(136) + 0.3, 0.2);

      /* ---- 7. Step -1 flips the loaf on the board. Sunday comes first ---- */
      const B7 = t(137) - 0.3;
      out(["#pl-every", "#r-2", "#pc0", "#pc2", "#pc4", "#pc6", "#oc", "#L2c"], B7, 0.25);
      show("#L2d", t(137), 0.25);
      draw("r-m1", t(138), 0.35);
      pop("#pl-flip", t(140), {{ from: 0.6 }});
      for (let k = 0; k < 7; k++) lift("d", 6 - k, t(140) + k * 0.1);
      show("#od", t(143), 0.2);
      draw("r-sun", t(146), 0.45);

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", {{ opacity: 0, duration: 0.25, ease: "power2.in" }}, {STORY} - 0.3);

      window.__timelines = window.__timelines || {{}};
      window.__timelines["story"] = tl;
    }})();
  </script>
</template>
'''
(HERE / 'compositions' / 'story.html').write_text(html, encoding='utf-8')
print('wrote story.html')
