"""Writes compositions/story.html for the l42 "Choosing the right one" video.
Repeated parts (drawers, job cards, code lines) are generated here, so every timed element is
still a plain tag with a stable id in the HTML. Sets are only printed with sorted()."""
import html
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
W = [w['start'] for w in json.loads((HERE / 'assets/voice/words.json').read_text())]
STORY = 58.0

FS, CW, RH = 32, 19.2, 56
KW = {'print', 'set', 'sorted', 'for', 'in', 'if'}


def paint(src):
    out = []
    for part in re.split(r'("[^"]*")', src):
        if part.startswith('"'):
            out.append(f'<span class="s">{html.escape(part)}</span>')
            continue
        for tok in re.split(r'(\W)', part):
            if tok in KW:
                out.append(f'<span class="k">{tok}</span>')
            elif tok.isdigit():
                out.append(f'<span class="n">{tok}</span>')
            else:
                out.append(html.escape(tok))
    return ''.join(out)


def line(id_, row, src):
    return f'<div class="s-ln" id="{id_}" data-n="{len(src)}" style="top:{88 + RH * (row - 1)}px">{paint(src)}</div>'


CODE = [
    # scene A: one line per job
    ('La1', 1, 'courses = ["soup", "chili", "pudding"]'),
    ('La2', 2, 'oven = (180, "fan")'),
    ('La3', 3, 'goals = {"Ana": 90, "Ben": 140, "Chloe": 70}'),
    ('La4', 4, 'allergens = {"nuts", "sesame", "gluten"}'),
    # scene B: everything in lists
    ('Lb1', 1, 'guests = [("Ana", 90),'),
    ('Lb2', 2, '          ("Ben", 140),'),
    ('Lb3', 3, '          ("Chloe", 70)]'),
    ('Lb4', 4, 'for g in guests:'),
    ('Lb5', 5, '    if g[0] == "Ben":'),
    ('Lb6', 6, '        print(g[1])'),
    ('Lb8', 8, 'allergens = ["nuts", "nuts",'),
    ('Lb9', 9, '             "sesame", "gluten"]'),
    ('Lb10', 10, 'print(allergens)'),
    # scene C: the right containers
    ('Lc1', 1, 'goals = {"Ana": 90, "Ben": 140, "Chloe": 70}'),
    ('Lc2', 2, 'print(goals["Ben"])'),
    ('Lc4', 4, 'allergens = {"nuts", "nuts", "sesame", "gluten"}'),
    ('Lc5', 5, 'print(sorted(allergens))'),
]
code_html = '\n'.join(line(*c) for c in CODE)

OUTS = [
    ('ob1', 1, '140'),
    ('ob2', 2, "['nuts', 'nuts', 'sesame', 'gluten']"),
    ('oc1', 1, '140'),
    ('oc2', 2, "['gluten', 'nuts', 'sesame']"),
]
out_html = '\n'.join(f'<div class="s-out" id="{i}" style="top:{712 + 52 * (r - 1)}px">{t}</div>' for i, r, t in OUTS)

# ---- right side: four drawers, 2 x 2 ----
KINDS = [('list', '[ ]', '#3b37e6', '#e6e3ff', 'courses'),
         ('tuple', '( )', '#1f7a5c', '#ddefe6', 'oven'),
         ('dict', '{k: v}', '#8a560f', '#fbebd2', 'goals'),
         ('set', '{ }', '#b8235a', '#fbe0ea', 'allergens')]
DPOS = [(1150, 470), (1502, 470), (1150, 730), (1502, 730)]
DW, DH = 332, 230
drawers = ''.join(
    f'<div id="dr{k}" class="s-abs drawer s-ol s-hide" style="left:{x}px; top:{y}px; background:{tint}">'
    f'<div class="dn" style="color:{col}">{name}</div><div class="dm">{html.escape(mark)}</div>'
    f'<div id="dt{k}" class="dt s-hide">{jar}</div><div class="dh"></div></div>'
    for k, ((name, mark, col, tint, jar), (x, y)) in enumerate(zip(KINDS, DPOS)))

JOBS = [('Job 1', 'Order of courses', 'soup → chili → pudding', 'order matters? will it change?'),
        ('Job 2', 'Oven setting', '180 degrees, fan', 'a fixed record?'),
        ('Job 3', 'Protein goals', 'Ana 90 · Ben 140 · Chloe 70', 'look it up by a name?'),
        ('Job 4', 'Allergens', 'nuts, sesame, gluten', 'only ask: is it in?')]
JX, JY, JW, JH = 1150, 180, 684, 170
jobs = ''.join(
    f'<div id="job{k}" class="s-abs job s-ol s-hide"><div class="jn">{n}</div><div class="jt">{t}</div>'
    f'<div id="jx{k}" class="jx">{x}</div></div>'
    f'<div id="q{k}" class="s-abs qp s-hide"><span>{q}</span></div>'
    for k, (n, t, x, q) in enumerate(JOBS))
flights = [[k, DPOS[k][0] + DW / 2 - (JX + JW / 2), DPOS[k][1] + DH / 2 - (JY + JH / 2)] for k in range(4)]

dots = ''.join(f'<div id="dot{k}" class="s-abs dot s-hide" style="left:{1262 + k * 120}px; top:{215}px">{k + 1}</div>' for k in range(4))

# scene B: three list rows and four allergen chips
ROWS = ['("Ana", 90)', '("Ben", 140)', '("Chloe", 70)']
rows = ''.join(
    f'<div id="ri{k}" class="s-abs idx s-hide" style="left:1150px; top:{290 + k * 90}px">[{k}]</div>'
    f'<div id="rb{k}" class="s-abs rowb s-ol s-hide" style="left:1250px; top:{290 + k * 90}px">{html.escape(s)}</div>'
    for k, s in enumerate(ROWS))
CHECK = '<svg viewBox="0 0 48 48"><path d="M10 25 L20 35 L39 13" fill="none" stroke="#1f7a5c" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CROSS = '<svg viewBox="0 0 48 48"><path d="M13 13 L35 35 M35 13 L13 35" fill="none" stroke="#b8235a" stroke-width="7" stroke-linecap="round"/></svg>'
marks = ''.join(f'<div id="mk{k}" class="s-abs mk s-hide" style="left:1700px; top:{298 + k * 90}px">{CHECK if k == 1 else CROSS}</div>' for k in range(3))
ACH = ['nuts', 'nuts', 'sesame', 'gluten']
chips = ''.join(f'<div id="ac{k}" class="s-abs chip s-ol s-hide" style="left:{1150 + k * 176}px; top:700px">{s}</div>' for k, s in enumerate(ACH))

# scene C: three labelled jars and a bowl
JARS = [('Ana', 90), ('Ben', 140), ('Chloe', 70)]
jars = ''.join(
    f'<div id="jr{k}" class="s-abs jar s-ol s-hide" style="left:{1150 + k * 242}px"><div class="lid"></div>'
    f'<div class="jl">{n}</div><div class="jv">{g} g</div></div>'
    for k, (n, g) in enumerate(JARS))
BOWL_CHIPS = [('bc0', 'nuts', 1230, 600), ('bc1', 'sesame', 1412, 650), ('bc2', 'gluten', 1594, 600)]
bowlchips = ''.join(f'<div id="{i}" class="s-abs chip s-ol s-hide" style="left:{x}px; top:{y}px">{t}</div>' for i, t, x, y in BOWL_CHIPS)

html_out = f'''<template>
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

    #head {{ left: 1150px; top: 96px; font: 700 48px/60px "Fraunces", serif; white-space: nowrap; }}

    .drawer {{ width: {DW}px; height: {DH}px; border-radius: 22px; }}
    .dn {{ position: absolute; left: 26px; top: 18px; font: 700 52px/64px "JetBrains Mono", monospace; }}
    .dm {{ position: absolute; right: 26px; top: 24px; font: 700 36px/56px "JetBrains Mono", monospace; color: #3e3b52; }}
    .dt {{ position: absolute; left: 26px; top: 108px; height: 60px; line-height: 60px; padding: 0 22px; border-radius: 30px; background: #fff; font: 700 30px/60px "JetBrains Mono", monospace; box-shadow: 0 0 0 4px #0e0c1d; }}
    .dh {{ position: absolute; left: 121px; bottom: 18px; width: 90px; height: 14px; border-radius: 7px; background: #0e0c1d; }}

    .dot {{ width: 80px; height: 80px; border-radius: 50%; background: #0e0c1d; color: #fff; text-align: center; font-size: 40px; line-height: 80px; }}
    .job {{ left: {JX}px; top: {JY}px; width: {JW}px; height: {JH}px; border-radius: 22px; background: #fff; }}
    .jn {{ position: absolute; left: 26px; top: 24px; height: 48px; line-height: 48px; padding: 0 18px; border-radius: 24px; background: #0e0c1d; color: #fff; font-size: 28px; }}
    .jt {{ position: absolute; left: 170px; top: 18px; font: 700 44px/60px "Fraunces", serif; white-space: nowrap; }}
    .jx {{ position: absolute; left: 28px; top: 96px; font: 700 32px/48px "JetBrains Mono", monospace; color: #3e3b52; white-space: nowrap; }}
    .qp {{ left: 1150px; top: 376px; width: 684px; height: 64px; line-height: 64px; padding: 0 26px; border-radius: 32px; background: #e6e3ff; color: #3b37e6; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    #yes {{ left: 1662px; top: 376px; width: 172px; height: 64px; line-height: 64px; text-align: center; border-radius: 32px; background: #ddefe6; color: #1f7a5c; font-size: 30px; box-shadow: 0 0 0 4px #0e0c1d; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}

    .idx {{ width: 80px; font: 700 32px/72px "JetBrains Mono", monospace; color: #3b37e6; }}
    .rowb {{ width: 400px; height: 72px; line-height: 72px; padding-left: 28px; border-radius: 16px; background: #fff; font: 700 32px/72px "JetBrains Mono", monospace; }}
    .mk {{ width: 56px; height: 56px; }}
    .mk svg {{ width: 56px; height: 56px; }}
    .chip {{ width: 160px; height: 64px; text-align: center; border-radius: 32px; background: #fbebd2; font: 700 30px/64px "JetBrains Mono", monospace; }}
    .chip.dup {{ background: #fbe0ea; color: #b8235a; }}

    .jar {{ top: 290px; width: 200px; height: 170px; border-radius: 22px; background: #fff; }}
    .jar .lid {{ position: absolute; left: 40px; top: -22px; width: 120px; height: 18px; border-radius: 6px; background: #0e0c1d; }}
    .jar .jl {{ position: absolute; left: 0; top: 24px; width: 200px; text-align: center; font: 700 44px/56px "Fraunces", serif; }}
    .jar .jv {{ position: absolute; left: 0; top: 96px; width: 200px; text-align: center; font: 700 32px/48px "JetBrains Mono", monospace; color: #3b37e6; }}
    #bowl {{ left: 1150px; top: 580px; width: 684px; height: 250px; background: #fff; border-radius: 0 0 50% 50% / 0 0 100% 100%; }}

    /* code panel */
    #s-code {{ left: 96px; top: 96px; width: 1000px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1000px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    .fname {{ position: absolute; left: 140px; top: 12px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    .s-ln {{ position: absolute; left: 40px; font: 500 {FS}px/{RH}px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .n {{ color: #ffc24b; }}
    .s-ln .s {{ color: #7cf0b5; }}
    #s-div {{ position: absolute; left: 40px; top: 660px; width: 920px; height: 3px; background: #2e2a58; opacity: 0; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 666px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; opacity: 0; }}
    .s-out {{ position: absolute; left: 40px; font: 500 34px/52px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    #lines {{ left: 40px; top: 820px; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="head" class="s-abs">Kitchen Coach: dinner party</div>
        {dots}
        {drawers}
        {jobs}
        <div id="yes" class="s-abs s-hide">yes, yes</div>

        <div id="pl-wrong" class="s-abs pill d s-hide" style="left:1150px; top:190px">the wrong drawer: a list</div>
        {rows}
        {marks}
        <div id="pl-every" class="s-abs pill d s-hide" style="left:1250px; top:560px">checks every item</div>
        {chips}
        <div id="pl-twice" class="s-abs pill d s-hide" style="left:1150px; top:810px"><b>nuts</b> twice</div>

        <div id="pl-right" class="s-abs pill g s-hide" style="left:1150px; top:190px">the right drawers: a dict, a set</div>
        {jars}
        <div id="pl-look" class="s-abs pill g s-hide" style="left:1356px; top:486px">one look, by name</div>
        <div id="bowl" class="s-abs s-ol s-hide"></div>
        {bowlchips}
        <div id="bn" class="s-abs chip dup s-ol s-hide" style="left:1600px; top:470px">nuts</div>
        <div id="pl-once" class="s-abs pill g s-hide" style="left:1150px; top:880px"><b>nuts</b> once</div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i></div>
          <div id="fn0" class="fname">party.py</div>
          <div id="fn1" class="fname s-hide">party_lists.py</div>
          <div id="fn2" class="fname s-hide">party_fixed.py</div>
{code_html}
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
{out_html}
          <div id="lines" class="s-abs pill g s-hide">9 lines → 4 lines</div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-g0" style="stroke:#ffc24b" />
          <path id="r-ben" style="stroke:#ffc24b" />
          <path id="r-nuts" style="stroke:#ff8fb1" />
          <path id="r-jar" style="stroke:#1f7a5c" />
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
      const FLIGHTS = {json.dumps(flights)};

      const ring = (id, cx, cy, rx, ry) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d);
        const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L;
      }};
      const col = (c) => 136 + c * {CW};
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const row = (r) => 212 + {RH} * (r - 1);
      ring("r-g0", mid(7, 10), row(5), 62, 34);
      ring("r-ben", mid(6, 17), row(2), 126, 36);
      ring("r-nuts", mid(13, 26), row(4), 150, 36);
      ring("r-jar", 1492, 375, 130, 110);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out", immediateRender: false }}, at);
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.1, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const type = (id, at, d) => {{
        const n = +document.getElementById(id).dataset.n;
        tl.fromTo("#" + id, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || Math.min(0.9, 0.025 * n), ease: `steps(${{n}})`, immediateRender: false }}, at);
      }};
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", {{ x: x - 4, y: y - 3, duration: d || 0.6, ease: "power2.inOut" }}, at);

      tl.set("#s-cursor", {{ x: 1500, y: 980 }}, 0);

      /* ---- 1. Kitchen Coach, four jobs, four drawers ---- */
      bump("#head", t(0));
      for (let k = 0; k < 4; k++) pop(`#dot${{k}}`, t(9) + k * 0.12, {{ from: 0.4, d: 0.35 }});
      [15, 17, 19, 22].forEach((w, k) => pop(`#dr${{k}}`, t(w) - 0.1, {{ from: 0.7 }}));

      /* ---- 2-5. each job: card, question, flies into its drawer, code line ---- */
      const JOB = [
        {{ card: 23, q: 30, yes: 38, fly: 41, land: 44 }},
        {{ card: 45, q: 56, fly: 59, land: 62 }},
        {{ card: 63, q: 69, fly: 79, land: 80 }},
        {{ card: 81, q: 87, fly: 94, land: 97 }},
      ];
      out(["#dot0", "#dot1", "#dot2", "#dot3"], t(23) - 0.3, 0.2);
      JOB.forEach((j, k) => {{
        pop(`#job${{k}}`, t(j.card), {{ from: 0.8 }});
        if (k === 1) {{ tl.set("#jx1", {{ opacity: 0 }}, t(j.card)); show("#jx1", t(50), 0.25); }}
        pop(`#q${{k}}`, t(j.q), {{ from: 0.7, d: 0.35 }});
        if (j.yes) pop("#yes", t(j.yes), {{ from: 0.5, d: 0.3 }});
        const [, dx, dy] = FLIGHTS[k];
        const F = t(j.fly) - 0.2, L = F + 0.5;
        out(k === 0 ? [`#q${{k}}`, "#yes"] : `#q${{k}}`, F - 0.1, 0.2);
        tl.to(`#job${{k}}`, {{ x: dx, y: dy, scale: 0.3, duration: 0.5, ease: "power2.in" }}, F);
        tl.to(`#job${{k}}`, {{ opacity: 0, duration: 0.15 }}, L - 0.15);
        bump(`#dr${{k}}`, L);
        pop(`#dt${{k}}`, L, {{ from: 0.5, d: 0.35 }});
        type(`La${{k + 1}}`, L, 0.45);
      }});

      /* ---- 6. The wrong drawer: guests in a list, allergens in a list ---- */
      const B = t(98) - 0.05;
      out(["#dr0", "#dr1", "#dr2", "#dr3", "#La1", "#La2", "#La3", "#La4", "#fn0"], B, 0.25);
      show("#fn1", B + 0.25, 0.2);
      pop("#pl-wrong", t(100), {{ from: 0.6 }});
      type("Lb1", t(102), 0.4); type("Lb2", t(102) + 0.4, 0.4); type("Lb3", t(102) + 0.8, 0.4);
      for (let k = 0; k < 3; k++) {{ pop(`#rb${{k}}`, t(104) + k * 0.15, {{ from: 0.6, d: 0.3 }}); show(`#ri${{k}}`, t(104) + k * 0.15, 0.2); }}
      type("Lb4", t(108), 0.35); type("Lb5", t(108) + 0.35, 0.4); type("Lb6", t(108) + 0.75, 0.35);
      draw("r-g0", t(110), 0.4);
      show("#s-cursor", t(110), 0.2);
      tl.set("#s-cursor", {{ x: 1560, y: 980 }}, t(110));
      [112, 114, 116].forEach((w, k) => {{
        cursorTo(1600, 330 + k * 90, t(w) - 0.45, 0.4);
        pop(`#mk${{k}}`, t(w), {{ from: 0.4, d: 0.3 }});
        if (k === 1) tl.set("#rb1", {{ backgroundColor: "#ddefe6" }}, t(w));
      }});
      pop("#pl-every", t(117), {{ from: 0.6 }});
      out(["#s-cursor", "#r-g0"], t(119) - 0.2, 0.2);
      show(["#s-div", "#s-outlbl"], t(117), 0.2);
      show("#ob1", t(117), 0.2);
      type("Lb8", t(119), 0.5); type("Lb9", t(119) + 0.5, 0.5); type("Lb10", t(122), 0.4);
      for (let k = 0; k < 4; k++) pop(`#ac${{k}}`, t(124) + k * 0.12, {{ from: 0.5, d: 0.3 }});
      show("#ob2", t(126), 0.2);
      [0, 1].forEach((k) => {{ tl.set(`#ac${{k}}`, {{ backgroundColor: "#fbe0ea", color: "#b8235a" }}, t(126)); bump(`#ac${{k}}`, t(126) + k * 0.15); }});
      pop("#pl-twice", t(129), {{ from: 0.6 }});

      /* ---- 7. The fix: a dict jumps to Ben, a set keeps nuts once, code gets shorter ---- */
      const C = t(130) - 0.3;
      out(["#pl-wrong", "#pl-every", "#pl-twice", "#rb0", "#rb1", "#rb2", "#ri0", "#ri1", "#ri2", "#mk0", "#mk1", "#mk2",
           "#ac0", "#ac1", "#ac2", "#ac3", "#Lb1", "#Lb2", "#Lb3", "#Lb4", "#Lb5", "#Lb6", "#Lb8", "#Lb9", "#Lb10", "#ob1", "#ob2", "#fn1"], C, 0.25);
      show("#fn2", C + 0.25, 0.2);
      pop("#pl-right", t(130), {{ from: 0.6 }});
      type("Lc1", t(131), 0.6);
      for (let k = 0; k < 3; k++) pop(`#jr${{k}}`, t(133) + k * 0.12, {{ from: 0.6, d: 0.35 }});
      type("Lc2", t(134), 0.4);
      draw("r-ben", t(135), 0.4);
      show("#s-cursor", t(135), 0.2);
      tl.set("#s-cursor", {{ x: 1500, y: 980 }}, t(135));
      cursorTo(1500, 400, t(136), 0.55);
      tl.set("#jr1", {{ backgroundColor: "#ddefe6" }}, t(139) - 0.15);
      draw("r-jar", t(138), 0.4);
      pop("#pl-look", t(139), {{ from: 0.6 }});
      show("#oc1", t(139), 0.2);
      out(["#s-cursor", "#r-ben"], t(140) - 0.2, 0.2);
      // the set
      tl.fromTo("#bowl", {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }}, t(140));
      type("Lc4", t(141), 0.7);
      for (let k = 0; k < 3; k++) pop(`#bc${{k}}`, t(143) + k * 0.12, {{ from: 0.5, d: 0.3 }});
      draw("r-nuts", t(145) - 0.2, 0.4);
      pop("#bn", t(145) - 0.1, {{ from: 0.5, d: 0.25 }});
      tl.to("#bn", {{ keyframes: [{{ x: -340, y: 110, duration: 0.35, ease: "power2.in" }}, {{ x: -260, y: -20, rotation: 18, duration: 0.3, ease: "power2.out" }}, {{ y: 20, opacity: 0, duration: 0.25, ease: "power2.in" }}] }}, t(145) + 0.2);
      bump("#bc0", t(145) + 0.55);
      type("Lc5", t(146), 0.45);
      show("#oc2", t(147), 0.2);
      pop("#pl-once", t(147), {{ from: 0.6 }});
      out("#r-nuts", t(148), 0.2);
      pop("#lines", t(148) - 0.2, {{ from: 0.6 }});

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", {{ opacity: 0, duration: 0.25, ease: "power2.in" }}, {STORY} - 0.3);

      window.__timelines = window.__timelines || {{}};
      window.__timelines["story"] = tl;
    }})();
  </script>
</template>
'''
(HERE / 'compositions' / 'story.html').write_text(html_out, encoding='utf-8')
print('wrote story.html')
