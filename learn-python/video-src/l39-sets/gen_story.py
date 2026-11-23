"""Writes compositions/story.html for the l39 sets video.
Repeated parts (list cards, the 12 merged chips, the bowl spots, the Venn diagram) are generated
here so every timed element is still a plain tag with a stable id in the HTML.
Set contents are only ever shown as pictures (a bowl, a Venn diagram) or printed with sorted(),
never as a claimed print order of a set of strings."""
import html
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
W = [w['start'] for w in json.loads((HERE / 'assets/voice/words.json').read_text())]
STORY = 59.9

ANA = ['eggs', 'rice', 'bananas', 'oats']
BEN = ['eggs', 'rice', 'tofu', 'bread']
CHLOE = ['eggs', 'rice', 'berries', 'bananas']
MERGED = ANA + BEN + CHLOE

# ---- code panel: 32px JetBrains Mono = 19.2px per char, text at page x 136, rows 56px ----
FS, CW, RH = 32, 19.2, 56
KW = {'print', 'set', 'sorted', 'len', 'type', 'in'}


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
    # scene 1-2: the lists, joined, then set()
    ('La1', 1, 'ana = ["eggs", "rice", "bananas", "oats"]'),
    ('La2', 2, 'ben = ["eggs", "rice", "tofu", "bread"]'),
    ('La3', 3, 'chloe = ["eggs", "rice", "berries", "bananas"]'),
    ('La4', 4, 'merged = ana + ben + chloe'),
    ('La5', 5, 'to_buy = set(merged)'),
    ('La6', 6, 'print(len(to_buy))'),
    # scene 3: add, add again, in
    ('Lb1', 1, 'to_buy.add("milk")'),
    ('Lb2', 2, 'to_buy.add("eggs")'),
    ('Lb3', 3, 'print("tofu" in to_buy)'),
    # scene 4: set maths
    ('Lc1', 1, 'ana = {"eggs", "rice", "bananas", "oats"}'),
    ('Lc2', 2, 'ben = {"eggs", "rice", "tofu", "bread"}'),
    ('Lc3', 3, 'chloe = {"eggs", "rice", "berries", "bananas"}'),
    ('Lc4', 4, 'print(sorted(ana & ben & chloe))'),
    ('Lc5', 5, 'print(len(ana | ben | chloe))'),
    ('Lc6', 6, 'print(sorted(ben - chloe))'),
    # scene 5: the catches
    ('Ld1', 1, 'wanted = {"eggs", "rice", "tofu"}'),
    ('Ld2', 2, 'print(wanted[0])'),
    ('Ld2b', 2, 'print(sorted(wanted))'),
    ('Ld3', 3, 'basket = {}'),
    ('Ld3b', 3, 'basket = set()'),
    ('Ld4', 4, 'print(type(basket))'),
]
code_html = '\n'.join(line(*c) for c in CODE)

OUTS = [
    ('oa', 1, '7'),
    ('ob', 1, 'True'),
    ('oc1', 1, "['eggs', 'rice']"),
    ('oc2', 2, '7'),
    ('oc3', 3, "['bread', 'tofu']"),
    ('od1', 1, "['eggs', 'rice', 'tofu']"),
    ('od2', 2, "&lt;class 'dict'&gt;"),
    ('od2b', 2, "&lt;class 'set'&gt;"),
]
out_html = '\n'.join(f'<div class="s-out" id="{i}" style="top:{530 + 52 * (r - 1)}px">{t}</div>' for i, r, t in OUTS)

# ---- right side ----
CARD_X = [1150, 1386, 1622]
cards = ''.join(
    f'<div id="card{k}" class="s-abs lc s-ol" style="left:{x}px">'
    f'<div class="lh"><i style="background:{col}">{name[0]}</i>{name}</div>'
    + ''.join(f'<div class="li{" egg" if it == "eggs" else ""}" style="top:{80 + j * 50}px">{it}</div>' for j, it in enumerate(items))
    + '</div>'
    for k, (x, name, col, items) in enumerate(zip(CARD_X, ['Ana', 'Ben', 'Chloe'], ['#3b37e6', '#1f7a5c', '#b8235a'], [ANA, BEN, CHLOE])))

GX = [1150 + c * 174 for c in range(4)]
GY = [440 + r * 80 for r in range(3)]
grid_pos = [(GX[i % 4], GY[i // 4]) for i in range(12)]
grid = ''.join(f'<div id="g{i}" class="s-abs chip s-ol s-hide" style="left:{x}px; top:{y}px">{MERGED[i]}</div>'
               for i, (x, y) in enumerate(grid_pos))

SPOT = {'eggs': (1180, 490), 'rice': (1366, 500), 'bananas': (1556, 490), 'oats': (1250, 590),
        'tofu': (1440, 600), 'bread': (1620, 590), 'berries': (1330, 690), 'milk': (1530, 700)}
first_of = {}
for i, it in enumerate(MERGED):
    first_of.setdefault(it, i)
flights = []  # (chip index, dx, dy, is_duplicate, index of the chip already in the bowl)
for i, it in enumerate(MERGED):
    sx, sy = SPOT[it]
    gx, gy = grid_pos[i]
    flights.append([i, sx - gx, sy - gy, first_of[it] != i, first_of[it]])

badges = ''.join(
    f'<div id="bd{k}" class="s-abs badge {cls} s-hide" style="left:{grid_pos[i][0] + 128}px; top:{grid_pos[i][1] - 22}px">{n}</div>'
    for k, (i, n, cls) in enumerate([(0, 1, 'd'), (4, 2, 'd'), (8, 3, 'd'), (1, 1, 'w'), (5, 2, 'w'), (9, 3, 'w')]))

# ---- Venn: r 180, A (1380,330), B (1604,330), C (1492,474). Every item checked to sit in its region. ----
A, B, C, R = (1380, 330), (1604, 330), (1492, 474), 180
ITEMS = [('vi-eggs', 'eggs', 1492, 360), ('vi-rice', 'rice', 1492, 400), ('vi-bananas', 'bananas', 1400, 460),
         ('vi-oats', 'oats', 1300, 300), ('vi-tofu', 'tofu', 1690, 295), ('vi-bread', 'bread', 1690, 335),
         ('vi-berries', 'berries', 1492, 590)]
venn = f'''<svg id="venn" class="s-abs s-hide" viewBox="0 0 1920 1080">
  <defs>
    <clipPath id="cpA"><circle cx="{A[0]}" cy="{A[1]}" r="{R}"/></clipPath>
    <clipPath id="cpB"><circle cx="{B[0]}" cy="{B[1]}" r="{R}"/></clipPath>
    <mask id="mBC" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">
      <circle cx="{B[0]}" cy="{B[1]}" r="{R}" fill="#fff"/><circle cx="{C[0]}" cy="{C[1]}" r="{R}" fill="#000"/>
    </mask>
  </defs>
  <circle cx="{A[0]}" cy="{A[1]}" r="{R}" fill="#e6e3ff" fill-opacity="0.55"/>
  <circle cx="{B[0]}" cy="{B[1]}" r="{R}" fill="#ddefe6" fill-opacity="0.55"/>
  <circle cx="{C[0]}" cy="{C[1]}" r="{R}" fill="#fbe0ea" fill-opacity="0.55"/>
  <g id="vAny" opacity="0">
    <circle cx="{A[0]}" cy="{A[1]}" r="{R}" fill="#ffc24b"/><circle cx="{B[0]}" cy="{B[1]}" r="{R}" fill="#ffc24b"/><circle cx="{C[0]}" cy="{C[1]}" r="{R}" fill="#ffc24b"/>
  </g>
  <g id="vAll" opacity="0"><g clip-path="url(#cpA)"><g clip-path="url(#cpB)"><circle cx="{C[0]}" cy="{C[1]}" r="{R}" fill="#ffc24b"/></g></g></g>
  <g id="vMinus" opacity="0"><rect x="0" y="0" width="1920" height="1080" fill="#ffc24b" mask="url(#mBC)"/></g>
  <circle cx="{A[0]}" cy="{A[1]}" r="{R}" fill="none" stroke="#3b37e6" stroke-width="6"/>
  <circle cx="{B[0]}" cy="{B[1]}" r="{R}" fill="none" stroke="#1f7a5c" stroke-width="6"/>
  <circle cx="{C[0]}" cy="{C[1]}" r="{R}" fill="none" stroke="#b8235a" stroke-width="6"/>
  <text x="1215" y="150" class="vl" fill="#3b37e6">Ana</text>
  <text x="1770" y="150" class="vl" fill="#1f7a5c">Ben</text>
  <text x="1270" y="690" class="vl" fill="#b8235a">Chloe</text>
  {''.join(f'<text id="{i}" x="{x}" y="{y + 10}" class="vi">{t}</text>' for i, t, x, y in ITEMS)}
</svg>'''


def chk_venn():
    import math
    inside = lambda p, c: math.dist(p, c) < R
    want = {'eggs': 'ABC', 'rice': 'ABC', 'bananas': 'AC', 'oats': 'A', 'tofu': 'B', 'bread': 'B', 'berries': 'C'}
    for _, t, x, y in ITEMS:
        half = len(t) * 0.6 * 28 / 2
        for p in [(x - half, y - 12), (x + half, y - 12), (x - half, y + 12), (x + half, y + 12)]:
            got = ''.join(n for n, c in zip('ABC', (A, B, C)) if inside(p, c))
            assert got == want[t], (t, p, got)


chk_venn()

bowl2_spots = [('w0', 'eggs', 1262, 170), ('w1', 'rice', 1420, 250), ('w2', 'tofu', 1560, 175)]
bowl2 = ''.join(f'<div id="{i}" class="s-abs chip s-ol s-hide" style="left:{x}px; top:{y}px">{t}</div>' for i, t, x, y in bowl2_spots)
lrow = ''.join(f'<div id="lr{k}" class="s-abs chip s-ol s-hide" style="left:{1200 + k * 200}px; top:600px">{t}</div>'
               f'<div id="li{k}" class="s-abs idx s-hide" style="left:{1200 + k * 200}px; top:548px">[{k}]</div>'
               for k, t in enumerate(['eggs', 'rice', 'tofu']))

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

    /* friends' list cards */
    .lc {{ top: 96px; width: 212px; height: 296px; background: #fff; border-radius: 20px; }}
    .lh {{ position: absolute; left: 20px; top: 16px; font: 700 40px/52px "Fraunces", serif; display: flex; align-items: center; gap: 12px; }}
    .lh i {{ display: inline-block; width: 40px; height: 40px; border-radius: 50%; color: #fff; font: 800 28px/40px "Manrope", sans-serif; text-align: center; font-style: normal; }}
    .li {{ position: absolute; left: 24px; font: 700 30px/40px "JetBrains Mono", monospace; color: #3e3b52; }}
    .li.egg {{ color: #b8235a; }}

    /* item chips */
    .chip {{ width: 160px; height: 64px; line-height: 64px; text-align: center; border-radius: 32px; background: #fbebd2; font: 700 30px/64px "JetBrains Mono", monospace; }}
    .chip.dup {{ background: #fbe0ea; color: #b8235a; }}
    .badge {{ width: 48px; height: 48px; line-height: 48px; border-radius: 50%; text-align: center; font-size: 28px; color: #fff; }}
    .badge.d {{ background: #b8235a; }}
    .badge.w {{ background: #b9741a; }}
    .idx {{ width: 160px; text-align: center; font: 700 32px/40px "JetBrains Mono", monospace; color: #3b37e6; }}
    #wrong {{ left: 1340px; top: 710px; padding: 0 34px; height: 88px; line-height: 88px; border-radius: 16px; background: #fbe0ea; color: #b8235a; font-size: 56px; letter-spacing: 0.06em; box-shadow: 0 0 0 5px #b8235a; }}

    /* the bowl: a half ellipse */
    .bowl {{ background: #fff; border-radius: 0 0 50% 50% / 0 0 100% 100%; }}
    #bowl {{ left: 1150px; top: 470px; width: 684px; height: 380px; }}
    #bowl2 {{ left: 1230px; top: 150px; width: 524px; height: 300px; }}
    #count {{ left: 1392px; top: 884px; width: 200px; height: 64px; }}
    #count span {{ position: absolute; left: 0; top: 0; width: 200px; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill.w {{ background: #fbebd2; color: #8a560f; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}

    /* Venn */
    #venn {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    .vl {{ font: 700 40px "Fraunces", serif; text-anchor: middle; }}
    .vi {{ font: 700 28px "JetBrains Mono", monospace; text-anchor: middle; fill: #0e0c1d; }}

    /* the empty-braces cards */
    .tr {{ left: 1150px; width: 684px; height: 130px; border-radius: 22px; background: #fff; }}
    .tr .code {{ position: absolute; left: 36px; top: 0; font: 700 56px/130px "JetBrains Mono", monospace; }}
    .tr .lab {{ position: absolute; right: 30px; top: 33px; }}

    /* code panel */
    #s-code {{ left: 96px; top: 96px; width: 1000px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1000px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ margin-left: 14px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    .s-ln {{ position: absolute; left: 40px; font: 500 {FS}px/{RH}px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .n {{ color: #ffc24b; }}
    .s-ln .s {{ color: #7cf0b5; }}
    #s-div {{ position: absolute; left: 40px; top: 470px; width: 920px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 480px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; left: 40px; font: 500 34px/52px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    .s-err {{ position: absolute; left: 40px; top: 530px; width: 920px; padding: 18px 26px; border-radius: 16px; background: #3a1530; color: #ff8fb1; font: 600 32px/48px "JetBrains Mono", monospace; white-space: pre; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        {cards}
        <div id="bowl" class="s-abs bowl s-ol s-hide"></div>
        {grid}
        {badges}
        <div id="wrong" class="s-abs s-hide">WRONG</div>
        <div id="cm" class="s-abs chip s-ol s-hide" style="left:{SPOT['milk'][0]}px; top:380px">milk</div>
        <div id="ce" class="s-abs chip dup s-ol s-hide" style="left:{SPOT['eggs'][0]}px; top:380px">eggs</div>
        <div id="pl-already" class="s-abs pill d s-hide" style="left:1367px; top:378px">already in</div>
        <div id="count" class="s-abs s-hide"><span id="cnt7" class="pill g">7 things</span><span id="cnt8" class="pill g s-hide">8 things</span></div>
        <div id="pl-true" class="s-abs pill g s-hide" style="left:1150px; top:280px"><b>"tofu" in to_buy</b> → True</div>
        <div id="pl-fast" class="s-abs pill a s-hide" style="left:1150px; top:370px">fast: one look, no searching</div>

        {venn}
        <div id="pl-and" class="s-abs pill w s-hide" style="left:1150px; top:730px"><b>&amp;</b> in all three: eggs, rice</div>
        <div id="pl-or" class="s-abs pill w s-hide" style="left:1150px; top:730px"><b>|</b> in any of them: 7 things</div>
        <div id="pl-minus" class="s-abs pill w s-hide" style="left:1150px; top:730px"><b>-</b> in Ben's, not in Chloe's</div>

        <div id="bowl2" class="s-abs bowl s-ol s-hide"></div>
        {bowl2}
        <div id="pl-noorder" class="s-abs pill a s-hide" style="left:1150px; top:480px">a bowl: no first, no last</div>
        <div id="pl-noidx" class="s-abs pill d s-hide" style="left:1600px; top:480px">no <b>[0]</b></div>
        {lrow}
        <div id="pl-sorted" class="s-abs pill g s-hide" style="left:1150px; top:710px"><b>sorted()</b> a list, A to Z</div>
        <div id="tr0" class="s-abs tr s-ol s-hide" style="top:150px"><div class="code">{{}}</div><div class="lab pill d">an empty dict</div></div>
        <div id="tr1" class="s-abs tr s-ol s-hide" style="top:330px"><div class="code">set()</div><div class="lab pill g">an empty set</div></div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i><span>shopping.py</span></div>
{code_html}
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
{out_html}
          <div class="s-err" id="oerr">TypeError: 'set' object
is not subscriptable</div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-join" style="stroke:#ffc24b" />
          <path id="r-set" style="stroke:#ffc24b" />
          <path id="r-tofu" style="stroke:#1f7a5c" />
          <path id="r-braces" style="stroke:#ffc24b" />
          <path id="r-idx" style="stroke:#ff8fb1" />
          <path id="r-empty" style="stroke:#ffc24b" />
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
      const col = (c) => 136 + c * {CW};            // left edge of a code column
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const row = (r) => 212 + {RH} * (r - 1);      // centre y of code row r
      ring("r-join", mid(9, 25), row(4), 200, 36);
      ring("r-set", mid(9, 19), row(5), 140, 36);
      ring("r-tofu", 1520, 632, 116, 56);
      ring("r-braces", mid(6, 38), row(2), 350, 36);
      ring("r-idx", mid(12, 14), row(2), 44, 34);
      ring("r-empty", mid(9, 10), row(3), 40, 34);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out", immediateRender: false }}, at);
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.12, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const type = (id, at, d) => {{
        const n = +document.getElementById(id).dataset.n;
        tl.fromTo("#" + id, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || Math.min(0.9, 0.025 * n), ease: `steps(${{n}})`, immediateRender: false }}, at);
      }};
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", {{ x: x - 4, y: y - 3, duration: d || 0.6, ease: "power2.inOut" }}, at);

      // Frame 0: the three friends' lists, already written.
      tl.set("#s-cursor", {{ x: 1500, y: 760 }}, 0);
      ["#La1", "#La2", "#La3"].forEach((s) => tl.set(s, {{ opacity: 1 }}, 0));
      tl.set("#wrong", {{ rotation: -6 }}, 0);

      /* ---- 1. Three lists. Join them: eggs 3 times, rice 3 times. Wrong ---- */
      [0, 1, 2].forEach((k) => bump(`#card${{k}}`, t([0, 1, 3][k])));
      type("La4", t(13), 0.6);
      draw("r-join", t(13) + 0.6, 0.4);
      for (let i = 0; i < 12; i++) pop(`#g${{i}}`, t(16) + i * 0.06, {{ from: 0.4, d: 0.35 }});
      out("#r-join", t(19) - 0.2, 0.2);
      [[0, 19], [1, 20], [2, 21]].forEach(([k, w]) => {{ pop(`#bd${{k}}`, t(w), {{ from: 0.3 }}); tl.set(`#g${{[0, 4, 8][k]}}`, {{ backgroundColor: "#fbe0ea", color: "#b8235a" }}, t(w)); }});
      [[3, 22], [4, 23], [5, 24]].forEach(([k, w]) => pop(`#bd${{k}}`, t(w), {{ from: 0.3 }}));
      tl.fromTo("#wrong", {{ opacity: 0, scale: 2.2 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "power3.in", immediateRender: false }}, t(28));

      /* ---- 2. A set keeps one of each. set(merged). Duplicates bounce off. 7 things ---- */
      const B2 = t(29) - 0.3;
      out(["#wrong", "#card0", "#card1", "#card2", "#bd0", "#bd1", "#bd2", "#bd3", "#bd4", "#bd5"], B2, 0.25);
      for (let i = 0; i < 12; i++) tl.to(`#g${{i}}`, {{ y: -330, duration: 0.5, ease: "power2.inOut" }}, B2 + 0.1);
      tl.fromTo("#bowl", {{ opacity: 0, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: "power3.out", immediateRender: false }}, t(30));
      type("La5", t(35), 0.5);
      draw("r-set", t(39), 0.4);
      const F0 = t(40);
      FLIGHTS.forEach(([i, dx, dy, dup, keep], n) => {{
        const at = F0 + n * 0.2;
        if (!dup) {{
          tl.to(`#g${{i}}`, {{ x: dx, y: dy, duration: 0.4, ease: "power2.in" }}, at);
          tl.set(`#g${{i}}`, {{ backgroundColor: "#fbebd2", color: "#0e0c1d" }}, at + 0.4);
        }} else {{
          // fly to the rim above its twin, then bounce back out and fade
          tl.to(`#g${{i}}`, {{ keyframes: [{{ x: dx, y: dy - 110, duration: 0.3, ease: "power2.in" }}, {{ x: dx + 60, y: dy - 260, rotation: 18, duration: 0.3, ease: "power2.out" }}, {{ y: dy - 200, opacity: 0, duration: 0.25, ease: "power2.in" }}] }}, at);
          bump(`#g${{keep}}`, at + 0.3);
        }}
      }});
      pop("#pl-already", F0 + 4 * 0.2 + 0.3, {{ from: 0.6, d: 0.3 }});
      out("#pl-already", t(45) - 0.1, 0.2);
      out("#r-set", t(45) - 0.2, 0.2);
      type("La6", t(45), 0.4);
      show("#oa", t(45) + 0.4, 0.2);
      pop("#count", t(45), {{ from: 0.5 }});

      /* ---- 3. Add milk: it goes in. Add eggs again: nothing changes. Is tofu in it? True. Fast ---- */
      const B3 = t(49) - 0.3;
      out(["#La1", "#La2", "#La3", "#La4", "#La5", "#La6", "#oa"], B3, 0.2);
      type("Lb1", t(49), 0.45);
      pop("#cm", t(49), {{ from: 0.5, d: 0.3 }});
      tl.to("#cm", {{ y: {SPOT['milk'][1]} - 380, duration: 0.45, ease: "power2.in" }}, t(50));
      tl.to("#cnt7", {{ opacity: 0, duration: 0.15 }}, t(50) + 0.45);
      pop("#cnt8", t(50) + 0.5, {{ from: 0.5, d: 0.3 }});
      type("Lb2", t(55), 0.45);
      pop("#ce", t(56) - 0.2, {{ from: 0.5, d: 0.25 }});
      tl.to("#ce", {{ keyframes: [{{ y: 0, duration: 0.01 }}, {{ y: 60, duration: 0.3, ease: "power2.in" }}, {{ x: -40, y: -60, rotation: -18, duration: 0.3, ease: "power2.out" }}, {{ y: -20, opacity: 0, duration: 0.3, ease: "power2.in" }}] }}, t(56) + 0.1);
      bump("#g0", t(56) + 0.4);
      pop("#pl-already", t(56) + 0.4, {{ from: 0.6, d: 0.3 }});
      bump("#count", t(59));
      out("#pl-already", t(61) - 0.3, 0.2);
      type("Lb3", t(61), 0.55);
      show("#s-cursor", t(61), 0.2);
      cursorTo(1560, 650, t(61), 0.6);
      draw("r-tofu", t(62) + 0.2, 0.45);
      show("#ob", t(66), 0.2);
      pop("#pl-true", t(66), {{ from: 0.6 }});
      out("#s-cursor", t(67), 0.2);
      pop("#pl-fast", t(71), {{ from: 0.6 }});

      /* ---- 4. Kitchen maths: curly braces. & all three. | anyone. - Ben, not Chloe ---- */
      const B4 = t(72) - 0.3;
      out(["#bowl", "#count", "#cm", "#pl-true", "#pl-fast", "#r-tofu", "#Lb1", "#Lb2", "#Lb3", "#ob"], B4, 0.25);
      for (let i = 0; i < 12; i++) out(`#g${{i}}`, B4, 0.25);
      tl.fromTo("#venn", {{ opacity: 0, scale: 0.9, transformOrigin: "1492px 400px" }}, {{ opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", immediateRender: false }}, t(72) + 0.1);
      type("Lc1", t(76), 0.5);
      type("Lc2", t(77) + 0.2, 0.5);
      type("Lc3", t(79), 0.5);
      draw("r-braces", t(83), 0.45);
      out("#r-braces", t(85) - 0.2, 0.2);
      type("Lc4", t(85), 0.6);
      tl.fromTo("#vAll", {{ opacity: 0 }}, {{ opacity: 0.8, duration: 0.3, immediateRender: false }}, t(86));
      pop("#pl-and", t(87), {{ from: 0.6 }});
      show("#oc1", t(91), 0.2);
      bump("#vi-eggs", t(91)); bump("#vi-rice", t(93));
      tl.to("#vAll", {{ opacity: 0, duration: 0.25 }}, t(94) - 0.1);
      out("#pl-and", t(94) - 0.1, 0.2);
      type("Lc5", t(94), 0.6);
      tl.fromTo("#vAny", {{ opacity: 0 }}, {{ opacity: 0.8, duration: 0.3, immediateRender: false }}, t(95));
      pop("#pl-or", t(97), {{ from: 0.6 }});
      show("#oc2", t(98), 0.2);
      tl.to("#vAny", {{ opacity: 0, duration: 0.25 }}, t(101) - 0.1);
      out("#pl-or", t(101) - 0.1, 0.2);
      type("Lc6", t(101), 0.55);
      tl.fromTo("#vMinus", {{ opacity: 0 }}, {{ opacity: 0.8, duration: 0.3, immediateRender: false }}, t(103));
      pop("#pl-minus", t(104), {{ from: 0.6 }});
      show("#oc3", t(110), 0.2);
      bump("#vi-bread", t(110)); bump("#vi-tofu", t(112));

      /* ---- 5. Catches: no order, no index; sorted. {{}} is a dict; set() ---- */
      const B5 = t(113) - 0.3;
      out(["#venn", "#pl-minus", "#Lc1", "#Lc2", "#Lc3", "#Lc4", "#Lc5", "#Lc6", "#oc1", "#oc2", "#oc3"], B5, 0.25);
      type("Ld1", t(115), 0.6);
      tl.fromTo("#bowl2", {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }}, t(115));
      pop("#w0", t(116), {{ from: 0.5, d: 0.3 }}); pop("#w1", t(116) + 0.15, {{ from: 0.5, d: 0.3 }}); pop("#w2", t(116) + 0.3, {{ from: 0.5, d: 0.3 }});
      pop("#pl-noorder", t(119), {{ from: 0.6 }});
      type("Ld2", t(122), 0.45);
      show("#s-cursor", t(122), 0.2);
      tl.set("#s-cursor", {{ x: 1400, y: 700 }}, t(122));
      cursorTo(mid(12, 14), row(2) + 14, t(122) + 0.05, 0.8);
      draw("r-idx", t(125), 0.4);
      pop("#pl-noidx", t(124), {{ from: 0.6 }});
      out("#s-cursor", t(127), 0.2);
      pop("#oerr", t(129), {{ from: 0.85 }});
      // the fix: sorted() makes a list, with indexes
      out(["#oerr", "#r-idx", "#pl-noidx"], t(134) - 0.2, 0.2);
      out("#Ld2", t(134) - 0.1, 0.1);
      type("Ld2b", t(134), 0.5);
      show("#od1", t(135), 0.2);
      for (let k = 0; k < 3; k++) {{ pop(`#lr${{k}}`, t(135) + k * 0.12, {{ from: 0.5, d: 0.3 }}); show(`#li${{k}}`, t(135) + k * 0.12 + 0.15, 0.2); }}
      pop("#pl-sorted", t(135) + 0.4, {{ from: 0.6 }});
      // empty braces
      const B5b = t(136) - 0.15;
      out(["#bowl2", "#w0", "#w1", "#w2", "#pl-noorder"], B5b, 0.25);
      type("Ld3", t(137), 0.3);
      draw("r-empty", t(138), 0.35);
      pop("#tr0", t(138), {{ from: 0.6 }});
      tl.set("#tr0 .lab", {{ opacity: 0 }}, t(138));
      type("Ld4", t(139) + 0.2, 0.45);
      show("#od2", t(142), 0.2);
      pop("#tr0 .lab", t(142), {{ from: 0.5 }});
      out("#r-empty", t(146), 0.2);
      out("#Ld3", t(148) - 0.05, 0.05);
      tl.set("#Ld3b", {{ opacity: 1 }}, t(148));
      pop("#tr1", t(148), {{ from: 0.6 }});
      tl.set("#tr1 .lab", {{ opacity: 0 }}, t(148));
      out("#od2", t(149), 0.1);
      show("#od2b", t(149) + 0.1, 0.2);
      pop("#tr1 .lab", t(149) + 0.1, {{ from: 0.5 }});

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
