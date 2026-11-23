"""Writes compositions/story.html for the l38 working-with-dictionaries video.
Repeated parts (jars, meal chips, tally rows) are generated here so every timed element
is still a plain tag with a stable id in the HTML."""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
W = [w['start'] for w in json.loads((HERE / 'assets/voice/words.json').read_text())]

STORY = 70.9
# right side
RX = 1190                      # left edge of the right-hand area
JW, JGAP = 140, 28             # jar width and gap
JTOP, JH = 196, 296            # jar top and height (shelf under it)
FILL_MAX = JH - 16             # fill height of a full 1000 g jar
JARS = [('rice', 900), ('oats', 400), ('lentils', 0), ('pasta', 150)]
jx = lambda i: RX + i * (JW + JGAP)
fillh = lambda g: round(FILL_MAX * g / 1000)

# code panel: 36px mono = 21.6px per char, text at page x 136, rows 58px from panel y 88
CH = 21.6
col = lambda c: 136 + c * CH
row = lambda r: 96 + 88 + 58 * (r - 1) + 29       # centre y of code row r
OUT_Y = lambda k: 440 + 54 * k                     # output line top, inside the panel


def jar(i, name, g):
    x = jx(i)
    return (f'<div id="jar{i}" class="s-abs jar s-ol" style="left:{x}px">'
            f'<div class="fill" id="fill{i}" style="height:{fillh(g)}px"></div>'
            f'<div class="gv" id="gv{i}">{g}</div>' + (f'<div class="gv" id="gv0b" style="opacity:0">750</div>' if i == 0 else '') + '</div>'
            f'<div id="lid{i}" class="s-abs lid" style="left:{x + 18}px"></div>'
            f'<div id="lab{i}" class="s-abs jlab" style="left:{x - 14}px">{name}</div>')


jars = ''.join(jar(i, n, g) for i, (n, g) in enumerate(JARS))

PAIRS = [('rice', 750), ('oats', 400), ('lentils', 0), ('pasta', 150)]
pairs = ''.join(
    f'<div id="pr{i}" class="s-abs pair s-ol s-hide"><span class="pk">item</span> <b class="s">"{n}"</b>'
    f'&nbsp;&nbsp;<span class="pk">grams</span> <b class="n">{g}</b></div>' for i, (n, g) in enumerate(PAIRS))

MEALS = [('Mon', 'oats'), ('Tue', 'rice'), ('Wed', 'oats'), ('Thu', 'tofu')]
meals = ''.join(
    f'<div id="ml{i}" class="s-abs meal s-ol s-hide" style="left:{jx(i)}px"><span>{d}</span><b>{f}</b></div>'
    for i, (d, f) in enumerate(MEALS))

TROWS = [('oats', 2), ('rice', 1), ('tofu', 1)]
TY = lambda k: 470 + 96 * k    # tally row top
trows = ''
for k, (f, n) in enumerate(TROWS):
    trows += f'<div id="tn{k}" class="s-abs tname s-hide" style="top:{TY(k)}px">{f}</div>'
    for m in range(n):
        trows += f'<div id="tm{k}{m}" class="s-abs tmark s-hide" style="top:{TY(k)}px; left:{RX + 230 + m * 34}px"></div>'
    trows += f'<div id="tc{k}" class="s-abs tcount s-hide" style="top:{TY(k)}px">{n}</div>'

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

    /* the pantry shelf */
    #ptitle {{ left: {RX}px; top: 40px; font: 700 50px/60px "Fraunces", serif; letter-spacing: -0.01em; }}
    .jar {{ top: {JTOP}px; width: {JW}px; height: {JH}px; background: #fff; border-radius: 18px 18px 26px 26px; overflow: hidden; }}
    .fill {{ position: absolute; left: 8px; right: 8px; bottom: 8px; background: #fbebd2; border-radius: 12px; }}
    .gv {{ position: absolute; left: 0; right: 0; top: 18px; text-align: center; font: 700 40px/48px "JetBrains Mono", monospace; color: #3b37e6; }}
    .lid {{ top: {JTOP - 30}px; width: {JW - 36}px; height: 22px; background: #0e0c1d; border-radius: 7px; }}
    .jlab {{ top: {JTOP + JH + 30}px; width: {JW + 28}px; text-align: center; font-size: 34px; line-height: 44px; }}
    #plank {{ left: {RX - 16}px; top: {JTOP + JH + 6}px; width: {4 * JW + 3 * JGAP + 32}px; height: 14px; background: #0e0c1d; border-radius: 5px; }}
    #hlab {{ left: {RX - 14}px; top: {JTOP + JH + 26}px; width: {4 * JW + 3 * JGAP + 28}px; height: 52px; border-radius: 14px; background: #e6e3ff; }}

    #ghost {{ left: {RX}px; top: 640px; width: {JW}px; height: 220px; border-radius: 18px 18px 26px 26px; border: 5px dashed #6f6b80; background: #fbf8f4; }}
    #ghost i {{ position: absolute; left: 0; right: 0; top: 60px; text-align: center; font: 700 80px/90px "Fraunces", serif; font-style: normal; color: #6f6b80; }}
    #glab {{ left: {RX - 14}px; top: 876px; width: {JW + 28}px; text-align: center; font-size: 34px; line-height: 44px; color: #5a5670; }}
    #zero {{ left: {RX + 230}px; top: 690px; width: 120px; height: 120px; line-height: 120px; text-align: center; border-radius: 22px; background: #ddefe6; color: #1f7a5c; font: 700 72px/120px "JetBrains Mono", monospace; box-shadow: 0 0 0 5px #1f7a5c; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}

    #minus {{ left: 0; top: 0; padding: 0 18px; height: 70px; line-height: 70px; border-radius: 14px; background: #b8235a; color: #fff; font: 700 42px/70px "JetBrains Mono", monospace; }}

    .pair {{ left: {RX}px; top: 640px; height: 84px; line-height: 84px; padding: 0 28px; border-radius: 18px; background: #fff; font-size: 32px; white-space: nowrap; }}
    .pair .pk {{ color: #5a5670; }}
    .pair b {{ font: 700 40px/84px "JetBrains Mono", monospace; }}
    .pair b.s {{ color: #1f7a5c; }}
    .pair b.n {{ color: #3b37e6; }}
    #ptr {{ left: 0; top: 118px; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 30px solid #3b37e6; }}
    #shop {{ left: {RX}px; top: 770px; width: {4 * JW + 3 * JGAP}px; height: 200px; background: #fff; border-radius: 22px; }}
    #shop .st {{ position: absolute; left: 30px; top: 18px; font: 700 40px/50px "Fraunces", serif; }}
    .sl {{ position: absolute; left: 30px; font-size: 36px; line-height: 46px; color: #b8235a; }}

    /* counting */
    .meal {{ top: 150px; width: {JW}px; height: 124px; background: #fff; border-radius: 18px; text-align: center; }}
    .meal span {{ display: block; margin-top: 14px; font-size: 28px; line-height: 36px; color: #5a5670; }}
    .meal b {{ display: block; margin-top: 8px; font-size: 38px; line-height: 48px; }}
    #mptr {{ left: 0; top: 104px; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 30px solid #3b37e6; }}
    #tally {{ left: {RX}px; top: 340px; width: {4 * JW + 3 * JGAP}px; height: 450px; background: #fff; border-radius: 22px; }}
    #tally .tt {{ position: absolute; left: 30px; top: 20px; font: 700 40px/56px "JetBrains Mono", monospace; color: #3b37e6; }}
    #tempty {{ left: {RX + 230}px; top: 520px; font: 700 64px/80px "JetBrains Mono", monospace; color: #6f6b80; }}
    .tname {{ left: {RX + 40}px; height: 72px; font-size: 40px; line-height: 72px; }}
    .tmark {{ top: 0; width: 10px; height: 64px; margin-top: 4px; background: #3b37e6; border-radius: 5px; }}
    .tcount {{ left: {RX + 520}px; height: 72px; font: 700 48px/72px "JetBrains Mono", monospace; color: #1f7a5c; }}
    #tslot {{ left: {RX + 26}px; top: {TY(0) - 8}px; width: 300px; height: 88px; border-radius: 16px; border: 5px dashed #b8235a; }}
    #tslot span {{ position: absolute; left: 14px; top: 0; font-size: 40px; line-height: 78px; color: #b8235a; }}
    #plus1 {{ left: 0; top: 0; padding: 0 16px; height: 64px; line-height: 64px; border-radius: 14px; background: #3b37e6; color: #fff; font: 700 40px/64px "JetBrains Mono", monospace; }}

    /* code panel */
    #s-code {{ left: 96px; top: 96px; width: 1040px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1040px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ margin-left: 14px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    .s-ln {{ position: absolute; left: 40px; font: 500 36px/58px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .n {{ color: #ffc24b; }}
    .s-ln .s {{ color: #7cf0b5; }}
    .sw {{ display: inline-block; position: relative; width: {3 * CH}px; height: 58px; vertical-align: top; }}
    .sw > span {{ position: absolute; left: 0; top: 0; }}
    #s-div {{ position: absolute; left: 40px; top: 378px; width: 960px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 388px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; left: 40px; font: 500 36px/54px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    .s-err {{ position: absolute; left: 40px; top: 440px; padding: 14px 26px; border-radius: 16px; background: #3a1530; color: #ff8fb1; font: 600 36px/50px "JetBrains Mono", monospace; white-space: pre; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="shelf">
          <div id="ptitle" class="s-abs">the pantry</div>
          <div id="hlab" class="s-abs s-hide"></div>
          <div id="plank" class="s-abs"></div>
          {jars}
        </div>
        <div id="ptr" class="s-abs s-hide"></div>

        <div id="ghost" class="s-abs s-hide"><i>?</i></div>
        <div id="glab" class="s-abs s-hide">quinoa</div>
        <div id="pl-nojar" class="s-abs pill d s-hide" style="left:{RX + 200}px; top:660px">no quinoa jar</div>
        <div id="zero" class="s-abs s-hide">0</div>
        <div id="pl-zero" class="s-abs pill g s-hide" style="left:{RX + 200}px; top:850px">no crash, just <b>0</b></div>

        <div id="pl-ana" class="s-abs pill a s-hide" style="left:{RX}px; top:660px">Ana: carb dinner</div>
        <div id="pl-drop" class="s-abs pill g s-hide" style="left:{RX}px; top:760px">rice: <b>900</b> → <b>750</b> g</div>

        {pairs}
        <div id="shop" class="s-abs s-ol s-hide"><div class="st">Shopping list</div>
          <div class="sl" id="sl0" style="top:84px">☐ lentils</div>
          <div class="sl" id="sl1" style="top:134px">☐ pasta</div></div>

        <div id="ttl2" class="s-abs s-hide" style="left:{RX}px; top:40px; font:700 50px/60px Fraunces, serif">this week</div>
        {meals}
        <div id="mptr" class="s-abs s-hide"></div>
        <div id="tally" class="s-abs s-ol s-hide"><div class="tt">counts</div></div>
        <div id="tempty" class="s-abs s-hide">{{ }}</div>
        <div id="tslot" class="s-abs s-hide"><span>oats ?</span></div>
        {trows}
        <div id="pl-notally" class="s-abs pill d s-hide" style="left:{RX}px; top:830px">no oats tally yet</div>
        <div id="pl-start0" class="s-abs pill g s-hide" style="left:{RX}px; top:830px">missing? start at <b>0</b></div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i><span id="fname" style="position:relative; display:inline-block; width:240px; height:40px"><span id="fn1" style="position:absolute; left:0">pantry.py</span><span id="fn2" style="position:absolute; left:0; opacity:0">counts.py</span></span></div>
          <div class="s-ln" id="La1" style="top:88px">pantry = {{<span class="s">"rice"</span>: <span class="sw"><span class="n" id="v900">900</span><span class="n" id="v750" style="opacity:0">750</span></span>, <span class="s">"oats"</span>: <span class="n">400</span>,</div>
          <div class="s-ln" id="La2" style="top:146px">          <span class="s">"lentils"</span>: <span class="n">0</span>, <span class="s">"pasta"</span>: <span class="n">150</span>}}</div>
          <div class="s-ln" id="Lq1" style="top:262px">pantry[<span class="s">"quinoa"</span>]</div>
          <div class="s-ln" id="Lq2" style="top:262px">pantry.get(<span class="s">"quinoa"</span>, <span class="n">0</span>)</div>
          <div class="s-ln" id="Lr" style="top:320px">pantry[<span class="s">"rice"</span>] -= <span class="n">150</span></div>
          <div class="s-ln" id="Li1" style="top:204px"><span class="k">for</span> item, grams <span class="k">in</span> pantry.items():</div>
          <div class="s-ln" id="Li2" style="top:262px">    <span class="k">if</span> grams &lt; <span class="n">200</span>:</div>
          <div class="s-ln" id="Li3" style="top:320px">        <span class="k">print</span>(item)</div>
          <div class="s-ln" id="Lc1" style="top:88px">meals = [<span class="s">"oats"</span>, <span class="s">"rice"</span>, <span class="s">"oats"</span>, <span class="s">"tofu"</span>]</div>
          <div class="s-ln" id="Lc2" style="top:146px">counts = {{}}</div>
          <div class="s-ln" id="Lc3" style="top:204px"><span class="k">for</span> food <span class="k">in</span> meals:</div>
          <div class="s-ln" id="Lc4" style="top:262px">    counts[food] += <span class="n">1</span></div>
          <div class="s-ln" id="Lc4b" style="top:262px">    counts[food] = counts.get(food, <span class="n">0</span>) + <span class="n">1</span></div>
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
          <div class="s-err" id="oerr1">KeyError: 'quinoa'</div>
          <div class="s-out" id="o0" style="top:{OUT_Y(0)}px">0</div>
          <div class="s-out" id="o750" style="top:{OUT_Y(0)}px">750</div>
          <div class="s-out" id="ol0" style="top:{OUT_Y(0)}px">lentils</div>
          <div class="s-out" id="ol1" style="top:{OUT_Y(1)}px">pasta</div>
          <div class="s-err" id="oerr2">KeyError: 'oats'</div>
          <div class="s-out" id="ocnt" style="top:{OUT_Y(0)}px">{{'oats': 2, 'rice': 1, 'tofu': 1}}</div>
        </div>

        <div id="minus" class="s-abs s-hide">-150</div>
        <div id="plus1" class="s-abs s-hide">+1</div>
        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-key" style="stroke:#ffc24b" />
          <path id="r-val" style="stroke:#ffc24b" />
          <path id="r-zero" style="stroke:#ffc24b" />
          <path id="r-items" style="stroke:#ffc24b" />
          <path id="r-pluseq" style="stroke:#ff6b8b" />
          <path id="r-get" style="stroke:#7cf0b5" />
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
      const tl = gsap.timeline({{ paused: true }});

      const ring = (id, cx, cy, rx, ry) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d);
        const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L;
      }};
      const CH = {CH};
      const col = (c) => 136 + c * CH;
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const row = (r) => {row(1)} + 58 * (r - 1);
      ring("r-key", mid(10, 15), row(1), 84, 36);
      ring("r-val", mid(18, 20), row(1), 50, 34);
      ring("r-zero", mid(21, 21), row(4), 22, 32);
      ring("r-items", mid(19, 32), row(3), 172, 38);
      ring("r-pluseq", mid(17, 20), row(4), 56, 34);
      ring("r-get", mid(26, 37), row(4), 148, 38);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out", immediateRender: false }}, at);
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.1, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const type = (sel, at, n, d) => tl.fromTo(sel, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.04 * n, ease: `steps(${{n}})`, immediateRender: false }}, at);
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", {{ x: x - 4, y: y - 3, duration: d || 0.6, ease: "power2.inOut" }}, at);
      const jx = (i) => {RX} + i * {JW + JGAP};

      /* ---- 1. The pantry is a dictionary. Key, value. Rice 900, oats 400, lentils 0, pasta 150 ---- */
      tl.set("#s-cursor", {{ x: 1500, y: 700 }}, 0);
      for (let i = 0; i < 4; i++) {{ tl.set(`#gv${{i}}`, {{ opacity: 0 }}, 0); tl.set(`#fill${{i}}`, {{ scaleY: 0, transformOrigin: "50% 100%" }}, 0); }}
      type("#La1", 0.3, 35, 0.9);
      type("#La2", 1.2, 36, 0.9);
      draw("r-key", t(9), 0.45);
      show("#hlab", t(9), 0.25);
      out("#hlab", t(16) - 0.1, 0.2);
      out("#r-key", t(16) - 0.1, 0.2);
      draw("r-val", t(16), 0.45);
      [[0, 18], [1, 21], [2, 24], [3, 26]].forEach(([i, w]) => {{
        tl.to(`#fill${{i}}`, {{ scaleY: 1, duration: 0.6, ease: "power2.out" }}, t(w));
        pop(`#gv${{i}}`, t(w), {{ from: 0.4 }});
      }});
      out("#r-val", t(23), 0.2);

      /* ---- 2. Ben asks for quinoa. No jar. Square brackets crash. get with 0: you get the zero ---- */
      pop("#ghost", t(33), {{ from: 0.6 }});
      show("#glab", t(33), 0.3);
      pop("#pl-nojar", t(34), {{ from: 0.6 }});
      type("#Lq1", t(37), 16, 0.5);
      pop("#oerr1", t(40), {{ from: 0.85 }});
      tl.fromTo("#ghost", {{ x: 0 }}, {{ keyframes: [{{ x: 14, duration: 0.06 }}, {{ x: -10, duration: 0.07 }}, {{ x: 6, duration: 0.07 }}, {{ x: 0, duration: 0.08 }}], immediateRender: false }}, t(40));
      out("#pl-nojar", t(45) - 0.2, 0.2);
      out(["#Lq1", "#oerr1"], t(45), 0.2);
      type("#Lq2", t(48), 23, 0.8);
      draw("r-zero", t(53), 0.4);
      show("#s-cursor", t(53), 0.2);
      cursorTo({RX + 70}, 750, t(53) + 0.1, 0.8);
      tl.fromTo("#zero", {{ opacity: 0, x: -200, scale: 0.4 }}, {{ opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)", immediateRender: false }}, t(56));
      show("#o0", t(56), 0.2);
      pop("#pl-zero", t(55) + 0.2, {{ from: 0.6 }});
      out("#s-cursor", t(58), 0.2);

      /* ---- 3. Ana's carb dinner: rice -= 150. The rice jar drops to 750 ---- */
      out(["#ghost", "#glab", "#zero", "#pl-zero", "#r-zero", "#o0"], t(60) - 0.3, 0.25);
      pop("#pl-ana", t(60), {{ from: 0.6 }});
      type("#Lr", t(65), 21, 0.6);
      show("#s-cursor", t(66), 0.2);
      tl.set("#s-cursor", {{ x: col(10), y: row(5) }}, t(66));
      cursorTo(jx(0) + 70, {JTOP + 140}, t(66) + 0.05, 0.7);
      tl.set("#minus", {{ x: col(18) - 10, y: row(5) - 35 }}, t(68) - 0.05);
      show("#minus", t(68) - 0.05, 0.1);
      tl.to("#minus", {{ x: jx(0) + 20, y: {JTOP + 70}, duration: 0.6, ease: "power2.inOut" }}, t(68));
      out("#minus", t(68) + 0.65, 0.15);
      out("#s-cursor", t(72), 0.2);
      tl.to("#fill0", {{ scaleY: {750/900:.4f}, duration: 0.8, ease: "power2.inOut" }}, t(72));
      tl.to("#gv0", {{ opacity: 0, duration: 0.15 }}, t(77) - 0.15);
      pop("#gv0b", t(77), {{ from: 0.5 }});
      tl.to("#v900", {{ opacity: 0, duration: 0.15 }}, t(77));
      tl.to("#v750", {{ opacity: 1, duration: 0.2 }}, t(77) + 0.1);
      show("#o750", t(77), 0.2);
      pop("#pl-drop", t(77) + 0.2, {{ from: 0.6 }});

      /* ---- 4. The shopping list: for item, grams in pantry.items(). Under 200? Lentils, pasta ---- */
      out(["#pl-ana", "#pl-drop", "#o750", "#Lq2", "#Lr"], t(81) - 0.1, 0.25);
      type("#Li1", t(85), 34, 1.0);
      draw("r-items", t(90), 0.45);
      out("#r-items", t(92) - 0.1, 0.2);
      // the loop walks the jars: a label with its grams, one round each
      [0, 1, 2, 3].forEach((i) => {{
        const at = t(88) + 1.4 * i;
        if (i === 0) {{ tl.set("#ptr", {{ x: jx(0) + 50 }}, at); show("#ptr", at, 0.2); }}
        else tl.to("#ptr", {{ x: jx(i) + 50, duration: 0.3, ease: "power2.inOut" }}, at);
        if (i > 0) out(`#pr${{i - 1}}`, at, 0.12);
        pop(`#pr${{i}}`, at + 0.05, {{ from: 0.8, d: 0.3 }});
        bump(`#lab${{i}}`, at);
      }});
      type("#Li2", t(101), 19, 0.5);
      tl.to(["#fill2", "#fill3"], {{ backgroundColor: "#fbe0ea", duration: 0.3 }}, t(102));
      tl.to(["#gv2", "#gv3"], {{ color: "#b8235a", duration: 0.3 }}, t(102));
      tl.to(["#lab2", "#lab3"], {{ color: "#b8235a", duration: 0.3 }}, t(102));
      type("#Li3", t(104), 19, 0.5);
      out(["#pr3", "#ptr"], t(105), 0.2);
      pop("#shop", t(105), {{ from: 0.8 }});
      tl.set(["#sl0", "#sl1"], {{ opacity: 0 }}, t(105));
      tl.set("#ptr", {{ x: jx(2) + 50 }}, t(107) - 0.01);
      show("#sl0", t(107), 0.2); show("#ol0", t(107), 0.2); bump("#lab2", t(107));
      show("#sl1", t(108), 0.2); show("#ol1", t(108), 0.2); bump("#lab3", t(108));

      /* ---- 5. Count this week's meals: counts[food] += 1. KeyError on the first oats ---- */
      const B5 = t(109) - 0.3;
      out(["#shelf", "#shop", "#La1", "#La2", "#Li1", "#Li2", "#Li3", "#ol0", "#ol1"], B5, 0.25);
      tl.set("#fn1", {{ opacity: 0 }}, B5 + 0.25);
      tl.set("#fn2", {{ opacity: 1 }}, B5 + 0.25);
      show("#ttl2", t(110), 0.25);
      [110, 111, 112, 113].forEach((w, i) => pop(`#ml${{i}}`, t(w) - 0.1 + i * 0.05, {{ from: 0.6 }}));
      type("#Lc1", t(110), 40, 0.9);
      pop("#tally", t(114), {{ from: 0.85 }});
      show("#tempty", t(114), 0.2);
      type("#Lc2", t(114), 11, 0.35);
      type("#Lc3", t(115), 18, 0.4);
      type("#Lc4", t(116), 21, 0.5);
      draw("r-pluseq", t(117), 0.4);
      // first meal: oats. +1 flies at the empty card and bounces
      tl.set("#mptr", {{ x: jx(0) + 50 }}, t(119) - 0.2);
      show("#mptr", t(119) - 0.2, 0.15);
      tl.set("#plus1", {{ x: jx(0) + 30, y: 290 }}, t(119) - 0.1);
      show("#plus1", t(119) - 0.1, 0.1);
      tl.to("#plus1", {{ x: {RX + 60}, y: {TY(0)}, duration: 0.35, ease: "power2.in" }}, t(119));
      tl.to("#plus1", {{ keyframes: [{{ x: {RX - 80}, y: {TY(0) - 80}, rotation: -25, duration: 0.25, ease: "power2.out" }}, {{ y: 900, rotation: -70, opacity: 0, duration: 0.45, ease: "power2.in" }}] }}, t(119) + 0.35);
      tl.fromTo("#tally", {{ x: 0 }}, {{ keyframes: [{{ x: 14, duration: 0.06 }}, {{ x: -10, duration: 0.07 }}, {{ x: 6, duration: 0.07 }}, {{ x: 0, duration: 0.08 }}], immediateRender: false }}, t(119) + 0.35);
      pop("#oerr2", t(119) + 0.3, {{ from: 0.85 }});
      out("#tempty", t(126), 0.2);
      show("#tslot", t(126), 0.25);
      pop("#pl-notally", t(128), {{ from: 0.6 }});

      /* ---- 6. The fix: counts[food] = counts.get(food, 0) + 1. Oats 2, rice 1, tofu 1 ---- */
      out(["#r-pluseq", "#oerr2", "#pl-notally", "#Lc4"], t(132), 0.2);
      type("#Lc4b", t(134), 42, 2.2);
      draw("r-get", t(141), 0.45);
      out("#tslot", t(144), 0.2);
      pop("#pl-start0", t(144), {{ from: 0.6 }});
      // walk the week: oats, rice, oats, tofu
      const B6 = t(144) + 0.3;
      const steps = [[0, "#tn0", "#tm00"], [1, "#tn1", "#tm10"], [2, null, "#tm01"], [3, "#tn2", "#tm20"]];
      steps.forEach(([i, name, mark], k) => {{
        const at = B6 + k * 0.55;
        tl.to("#mptr", {{ x: jx(i) + 50, duration: 0.25, ease: "power2.inOut" }}, at);
        if (name) show(name, at + 0.15, 0.2);
        tl.fromTo(mark, {{ opacity: 0, scaleY: 0 }}, {{ opacity: 1, scaleY: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }}, at + 0.2);
        bump(`#ml${{i}}`, at);
      }});
      out("#r-get", t(147) - 0.1, 0.2);
      pop("#tc0", t(147), {{ from: 0.4 }});
      type("#ocnt", t(147), 34, 0.8);
      pop("#tc1", t(149), {{ from: 0.4 }});
      pop("#tc2", t(151), {{ from: 0.4 }});
      out("#mptr", t(151), 0.2);

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
