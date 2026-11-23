"""Writes compositions/story.html for the l41 nesting video.
Repeated parts (the cupboard with three guest boxes, the day tags and plates) are generated here,
so every timed element is still a plain tag with a stable id in the HTML."""
import html
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
W = [w['start'] for w in json.loads((HERE / 'assets/voice/words.json').read_text())]
STORY = round(W[149] + 0.6 - 0.1, 2)   # the takeaway starts on "Read"

# ---- code panel: 32px JetBrains Mono = 19.2px per char, text at page x 136, rows 56px ----
FS, CW, RH = 32, 19.2, 56
KW = {'print', 'append', 'for', 'in', 'range'}


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
    # scene 1: the guests record
    ('La1', 1, 'guests = {'),
    ('La2', 2, '    "Ana": {"kcal": 2600,'),
    ('La3', 3, '            "likes": ["pasta", "oats"]},'),
    ('La4', 4, '    "Ben": {"kcal": 2800,'),
    ('La5', 5, '            "likes": ["tofu", "lentils"]},'),
    ('La6', 6, '    "Chloe": {"kcal": 2000,'),
    ('La7', 7, '              "likes": ["pudding", "berries"]},'),
    ('La8', 8, '}'),
    # row 9 changes per scene
    ('Lb', 9, 'print(guests["Ben"]["likes"][0])'),
    ('Lc', 9, 'guests["Ana"]["likes"].append("rice")'),
    ('Ld', 9, 'print(guests["Ben"][0])'),
    # the [[]] * 3 trap
    ('Le1', 1, 'week = [[]] * 3'),
    ('Le2', 2, 'week[0].append("soup")'),
    ('Le3', 3, 'print(week)'),
    # the fix
    ('Lf1', 1, 'week = []'),
    ('Lf2', 2, 'for day in range(3):'),
    ('Lf3', 3, '    week.append([])'),
    ('Lf4', 4, 'week[0].append("soup")'),
    ('Lf5', 5, 'print(week)'),
]
for _, _, s in CODE:
    assert len(s) * CW <= 920, s
code_html = '\n'.join(line(*c) for c in CODE)

OUTS = [
    ('ob', 1, 'tofu'),
    ('oe', 1, "[['soup'], ['soup'], ['soup']]"),
    ('of', 1, "[['soup'], [], []]"),
]
out_html = '\n'.join(f'<div class="s-out" id="{i}" style="top:{656 + 52 * (r - 1)}px">{html.escape(t)}</div>' for i, r, t in OUTS)

# ---- right side, scenes 1-4: a cupboard (guests) with three boxes (one dict per friend) ----
CUP = (1150, 96, 684, 782)
BOX_X, BOX_W, BOX_H = 1180, 624, 220
BOX_TOP = {'Ana': 166, 'Ben': 402, 'Chloe': 638}
COL = {'Ana': '#3b37e6', 'Ben': '#1f7a5c', 'Chloe': '#b8235a'}
KCAL = {'Ana': 2600, 'Ben': 2800, 'Chloe': 2000}
LIKES = {'Ana': ['pasta', 'oats', 'rice'], 'Ben': ['tofu', 'lentils'], 'Chloe': ['pudding', 'berries']}
JAR_DX, JAR_DY, JAR_W, JAR_H = 24, 78, 576, 124
CHIP_CW = 16.8  # 28px mono


def chip_w(s):
    return len(s) * CHIP_CW + 36


chip_pos = {}  # (name, k) -> (x in jar, width)
for name, items in LIKES.items():
    x = 170
    for k, it in enumerate(items):
        chip_pos[(name, k)] = (x, chip_w(it))
        x += chip_w(it) + 14
    assert x - 14 <= JAR_W - 20, name

boxes = ''
for name in LIKES:
    top = BOX_TOP[name]
    chips = ''
    for k, it in enumerate(LIKES[name]):
        x, w = chip_pos[(name, k)]
        hide = ' s-hide' if (name, k) == ('Ana', 2) else ''
        chips += (f'<div id="c-{name}-{k}" class="ck{hide}" style="left:{x:.1f}px; width:{w:.1f}px">{it}</div>'
                  f'<div id="i-{name}-{k}" class="ix{hide}" style="left:{x:.1f}px; width:{w:.1f}px">[{k}]</div>')
    boxes += (f'<div id="bx-{name}" class="s-abs gbox s-ol" style="left:{BOX_X}px; top:{top}px">'
              f'<div class="gh"><i style="background:{COL[name]}">{name[0]}</i>{name}</div>'
              f'<div id="kc-{name}" class="kc s-hide">"kcal": {KCAL[name]}</div>'
              f'<div id="jar-{name}" class="jar s-hide"><div class="jl">"likes"</div>{chips}</div>'
              f'</div>')

ben_top = BOX_TOP['Ben']
jar_abs = (BOX_X + JAR_DX, ben_top + JAR_DY)
tofu_x, tofu_w = chip_pos[('Ben', 0)]
TOFU = (jar_abs[0] + tofu_x, jar_abs[1] + 16, tofu_w, 52)
PAD = 12
HL = [
    ('hl0', CUP[0] - PAD, CUP[1] - PAD, CUP[2] + 2 * PAD, CUP[3] + 2 * PAD),
    ('hl1', BOX_X - PAD, ben_top - PAD, BOX_W + 2 * PAD, BOX_H + 2 * PAD),
    ('hl2', jar_abs[0] - PAD, jar_abs[1] - PAD, JAR_W + 2 * PAD, JAR_H + 2 * PAD),
    ('hl3', TOFU[0] - PAD, TOFU[1] - PAD, TOFU[2] + 2 * PAD, TOFU[3] + 2 * PAD),
]
hl_html = ''.join(f'<div id="{i}" class="s-abs hl s-hide" style="left:{x:.0f}px; top:{y:.0f}px; width:{w:.0f}px; height:{h:.0f}px"></div>'
                  for i, x, y, w, h in HL)

# numbered badges: on the code (above each bracket of row 9) and on the right (the thing it hands back)
col = lambda c: 136 + c * CW
midc = lambda a, b: (col(a) + col(b + 1)) / 2
ROW9_TOP = 96 + 88 + RH * 8          # page y of row 9's top
BADGES = [
    ('bc1', midc(12, 18), ROW9_TOP - 34, 1), ('bc2', midc(19, 27), ROW9_TOP - 34, 2), ('bc3', midc(28, 30), ROW9_TOP - 34, 3),
    ('br1', BOX_X + BOX_W, ben_top + 28, 1), ('br2', jar_abs[0] + JAR_W, jar_abs[1] + JAR_H - 14, 2), ('br3', TOFU[0], TOFU[1], 3),
]
badge_html = ''.join(f'<div id="{i}" class="s-abs badge s-hide" style="left:{x - 24:.0f}px; top:{y - 24:.0f}px">{n}</div>' for i, x, y, n in BADGES)

# ---- right side, scenes 5-6: day tags, one shared plate, then three plates ----
TAG_X = [1150, 1392, 1634]
TAG_TOP, TAG_W, TAG_H = 150, 200, 130
DAYS = ['Mon', 'Tue', 'Wed']
tags = ''.join(
    f'<div id="tl{k}" class="s-abs tlab s-hide" style="left:{x}px">week[{k}]</div>'
    f'<div id="tg{k}" class="s-abs tag s-ol s-hide" style="left:{x}px"><div class="td">{d}</div>'
    f'<div id="tv0-{k}" class="tv">[]</div><div id="tv1-{k}" class="tv s-hide">[\'soup\']</div></div>'
    for k, (x, d) in enumerate(zip(TAG_X, DAYS)))
PLATE = (1492, 640, 140)   # one shared plate: centre and radius
cx = [x + TAG_W // 2 for x in TAG_X]
ends = [(PLATE[0] - 70, PLATE[1] - PLATE[2] + 20), (PLATE[0], PLATE[1] - PLATE[2]), (PLATE[0] + 70, PLATE[1] - PLATE[2] + 20)]
strings = ''.join(f'<path id="st{k}" class="str" d="M{cx[k]} {TAG_TOP + TAG_H + 8} L{ex} {ey}" />' for k, (ex, ey) in enumerate(ends))
PLATES3_Y, P3R = 560, 90
plates3 = ''.join(f'<div id="p3-{k}" class="s-abs plate s-ol s-hide" style="left:{cx[k] - P3R}px; top:{PLATES3_Y - P3R}px; width:{2 * P3R}px; height:{2 * P3R}px"></div>'
                  f'<div id="p3l-{k}" class="s-abs plab s-hide" style="left:{cx[k] - 110}px; top:{PLATES3_Y + P3R + 22}px">its own []</div>'
                  for k in range(3))
SOUP_W = chip_w('soup')

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

    /* the cupboard and the guest boxes */
    #cup {{ left: {CUP[0]}px; top: {CUP[1]}px; width: {CUP[2]}px; height: {CUP[3]}px; background: #ece7df; border-radius: 26px; }}
    #cup-h {{ position: absolute; left: 30px; top: 10px; font: 700 34px/56px "JetBrains Mono", monospace; color: #3b37e6; }}
    #cup-h span {{ font: 800 28px/56px "Manrope", sans-serif; color: #3e3b52; margin-left: 14px; }}
    .gbox {{ width: {BOX_W}px; height: {BOX_H}px; background: #fff; border-radius: 20px; }}
    .gh {{ position: absolute; left: 20px; top: 12px; font: 700 40px/52px "Fraunces", serif; display: flex; align-items: center; gap: 12px; }}
    .gh i {{ display: inline-block; width: 44px; height: 44px; border-radius: 50%; color: #fff; font: 800 28px/44px "Manrope", sans-serif; text-align: center; font-style: normal; }}
    .kc {{ position: absolute; right: 44px; top: 18px; font: 700 28px/48px "JetBrains Mono", monospace; color: #3e3b52; }}
    .jar {{ position: absolute; left: {JAR_DX}px; top: {JAR_DY}px; width: {JAR_W}px; height: {JAR_H}px; background: #fbebd2; border-radius: 18px; box-shadow: 0 0 0 3px #0e0c1d; }}
    .jl {{ position: absolute; left: 16px; top: 22px; font: 700 28px/48px "JetBrains Mono", monospace; color: #8a560f; }}
    .ck {{ position: absolute; top: 16px; height: 52px; border-radius: 26px; background: #fff; box-shadow: 0 0 0 3px #0e0c1d; text-align: center; font: 700 28px/52px "JetBrains Mono", monospace; }}
    .ix {{ position: absolute; top: 76px; text-align: center; font: 700 28px/36px "JetBrains Mono", monospace; color: #3b37e6; }}
    .hl {{ border-radius: 26px; box-shadow: 0 0 0 7px #3b37e6; }}
    .badge {{ width: 48px; height: 48px; line-height: 48px; border-radius: 50%; text-align: center; font-size: 28px; color: #fff; background: #3b37e6; box-shadow: 0 0 0 4px #fff; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill.w {{ background: #fbebd2; color: #8a560f; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}
    .bot {{ left: 1150px; top: 914px; }}

    /* the week: day tags, strings, plates */
    .tlab {{ top: 96px; width: {TAG_W}px; text-align: center; font: 700 28px/44px "JetBrains Mono", monospace; color: #3b37e6; }}
    .tag {{ top: {TAG_TOP}px; width: {TAG_W}px; height: {TAG_H}px; background: #fff; border-radius: 20px; }}
    .td {{ position: absolute; left: 0; top: 10px; width: {TAG_W}px; text-align: center; font: 700 40px/52px "Fraunces", serif; }}
    .tv {{ position: absolute; left: 0; top: 70px; width: {TAG_W}px; text-align: center; font: 700 28px/40px "JetBrains Mono", monospace; color: #1f7a5c; }}
    .plate {{ border-radius: 50%; background: #fff; }}
    #plate1 {{ left: {PLATE[0] - PLATE[2]}px; top: {PLATE[1] - PLATE[2]}px; width: {2 * PLATE[2]}px; height: {2 * PLATE[2]}px; }}
    .plate::after {{ content: ""; position: absolute; inset: 22px; border-radius: 50%; box-shadow: 0 0 0 3px #ece7df; }}
    .plab {{ width: 220px; text-align: center; font: 700 28px/40px "JetBrains Mono", monospace; color: #3e3b52; }}
    #plate1l {{ left: {PLATE[0] - 110}px; top: {PLATE[1] + PLATE[2] + 22}px; }}
    .soup {{ width: {SOUP_W:.1f}px; height: 52px; border-radius: 26px; background: #fbebd2; box-shadow: 0 0 0 3px #0e0c1d; text-align: center; font: 700 28px/52px "JetBrains Mono", monospace; z-index: 3; }}
    #strs {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #strs .str {{ fill: none; stroke: #b8235a; stroke-width: 5; stroke-dasharray: 2 12; stroke-linecap: round; opacity: 0; }}

    /* code panel */
    #s-code {{ left: 96px; top: 96px; width: 1000px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1000px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ margin-left: 14px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    #s-bar > span {{ position: relative; display: block; width: 260px; height: 40px; }}
    #s-bar > span > span {{ position: absolute; left: 0; top: 0; }}
    .s-ln {{ position: absolute; left: 40px; font: 500 {FS}px/{RH}px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .n {{ color: #ffc24b; }}
    .s-ln .s {{ color: #7cf0b5; }}
    #s-div {{ position: absolute; left: 40px; top: 598px; width: 920px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 606px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; left: 40px; font: 500 34px/52px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    .s-err {{ position: absolute; left: 40px; top: 656px; width: 920px; padding: 18px 26px; border-radius: 16px; background: #3a1530; color: #ff8fb1; font: 600 34px/48px "JetBrains Mono", monospace; white-space: pre; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; z-index: 5; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="cup" class="s-abs s-ol"><div id="cup-h" class="s-hide">guests<span>a dict of dicts</span></div></div>
        {boxes}
        {hl_html}
        <div id="pl-nest" class="s-abs pill a bot s-hide">containers inside containers</div>
        <div id="pl-ana" class="s-abs pill w bot s-hide">Ana: rice too, please</div>
        <div id="pl-place" class="s-abs pill g bot s-hide">the list changed where it lives</div>
        <div id="pl-labels" class="s-abs pill d bot s-hide">labels, not positions: no <b>[0]</b></div>

        <svg id="strs" class="s-abs" viewBox="0 0 1920 1080">{strings}</svg>
        {tags}
        <div id="plate1" class="s-abs plate s-ol s-hide"></div>
        <div id="plate1l" class="s-abs plab s-hide">one list</div>
        {plates3}
        <div id="soupE" class="s-abs soup s-hide" style="left:{cx[0] - SOUP_W / 2:.1f}px; top:{TAG_TOP + TAG_H + 30}px">soup</div>
        <div id="soupF" class="s-abs soup s-hide" style="left:{cx[0] - SOUP_W / 2:.1f}px; top:{TAG_TOP + TAG_H + 30}px">soup</div>
        <div id="pl-one" class="s-abs pill d s-hide" style="left:1150px; top:914px">three names, one plate</div>
        <div id="pl-own" class="s-abs pill g s-hide" style="left:1150px; top:914px">each day gets its own list</div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i><span><span id="fn1">guests.py</span><span id="fn2" class="s-hide">week.py</span></span></div>
{code_html}
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
{out_html}
          <div class="s-err" id="oerr">KeyError: 0</div>
        </div>
        {badge_html}

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-g" style="stroke:#ffc24b" />
          <path id="r-ben" style="stroke:#ffc24b" />
          <path id="r-likes" style="stroke:#ffc24b" />
          <path id="r-0" style="stroke:#ffc24b" />
          <path id="r-app" style="stroke:#7cf0b5" />
          <path id="r-d0" style="stroke:#ff8fb1" />
          <path id="r-lab1" style="stroke:#b8235a" />
          <path id="r-lab2" style="stroke:#b8235a" />
          <path id="r-inner" style="stroke:#ffc24b" />
          <path id="r-times" style="stroke:#ff8fb1" />
          <path id="r-new" style="stroke:#7cf0b5" />
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
      const col = (c) => 136 + c * {CW};            // left edge of a code column
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const half = (a, b) => (b - a + 1) * {CW} / 2 + 12;
      const row = (r) => 212 + {RH} * (r - 1);      // centre y of code row r
      const codeRing = (id, r, a, b) => ring(id, mid(a, b), row(r), half(a, b), 34);
      codeRing("r-g", 9, 6, 11);
      codeRing("r-ben", 9, 12, 18);
      codeRing("r-likes", 9, 19, 27);
      codeRing("r-0", 9, 28, 30);
      codeRing("r-app", 9, 22, 36);
      codeRing("r-d0", 9, 19, 21);
      ring("r-lab1", {BOX_X + BOX_W - 44 - 12 * CHIP_CW + 3 * CHIP_CW:.1f}, {ben_top + 42}, 66, 32);
      ring("r-lab2", {jar_abs[0] + 16 + 3.5 * CHIP_CW:.1f}, {jar_abs[1] + 46}, 72, 32);
      codeRing("r-inner", 1, 7, 10);
      codeRing("r-times", 1, 12, 14);
      codeRing("r-new", 3, 16, 17);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const dim = (sel, at, v) => tl.to(sel, {{ opacity: v, duration: 0.3, ease: "power2.out" }}, at);
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
      const zoomIn = (id, at) => tl.fromTo(id, {{ opacity: 0, scale: 1.12 }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", immediateRender: false }}, at);

      // Frame 0: the cupboard with one box per friend.
      tl.set("#s-cursor", {{ x: 1500, y: 960 }}, 0);

      /* ---- 1. One record per friend: a dict of dicts, each with kcal and a list ---- */
      ["Ana", "Ben", "Chloe"].forEach((n, k) => bump(`#bx-${{n}}`, t(4) + k * 0.25));
      show("#cup-h", t(8), 0.3);
      type("La1", t(8), 0.3);
      type("La2", t(12), 0.35); type("La3", t(13) + 0.1, 0.45);
      type("La4", t(14), 0.35); type("La5", t(15), 0.45);
      type("La6", t(16), 0.35); type("La7", t(17), 0.45);
      type("La8", t(18), 0.1);
      ["Ana", "Ben", "Chloe"].forEach((n, k) => pop(`#kc-${{n}}`, t(21) + k * 0.12, {{ from: 0.6, d: 0.35 }}));
      ["Ana", "Ben", "Chloe"].forEach((n, k) => pop(`#jar-${{n}}`, t(24) + k * 0.15, {{ from: 0.8, d: 0.4 }}));
      pop("#pl-nest", t(29), {{ from: 0.6 }});

      /* ---- 2. guests["Ben"]["likes"][0]: one step per bracket ---- */
      out("#pl-nest", t(32) - 0.3, 0.2);
      type("Lb", t(33), 0.8);
      pop("#bc1", t(41), {{ from: 0.3 }}); pop("#bc2", t(42), {{ from: 0.3 }}); pop("#bc3", t(43), {{ from: 0.3 }});
      draw("r-g", t(44), 0.4);
      zoomIn("#hl0", t(44));
      draw("r-ben", t(45), 0.4);
      out("#hl0", t(45), 0.2);
      zoomIn("#hl1", t(45));
      dim(["#bx-Ana", "#bx-Chloe"], t(45), 0.3);
      dim(["#La1", "#La2", "#La3", "#La6", "#La7", "#La8"], t(45), 0.45);
      pop("#br1", t(49), {{ from: 0.3 }});
      bump("#bx-Ben", t(51));
      draw("r-likes", t(53), 0.4);
      out("#hl1", t(53), 0.2);
      zoomIn("#hl2", t(53));
      pop("#br2", t(57), {{ from: 0.3 }});
      bump("#jar-Ben", t(59));
      draw("r-0", t(61), 0.4);
      out("#hl2", t(61), 0.2);
      zoomIn("#hl3", t(61));
      bump("#i-Ben-0", t(62));
      pop("#br3", t(64), {{ from: 0.3 }});
      show("#ob", t(66), 0.2);
      bump("#c-Ben-0", t(66));

      /* ---- 3. Ana wants rice: guests["Ana"]["likes"].append("rice") ---- */
      const B3 = t(67) - 0.3;
      out(["#r-g", "#r-ben", "#r-likes", "#r-0", "#hl3", "#bc1", "#bc2", "#bc3", "#br1", "#br2", "#br3", "#ob", "#Lb"], B3, 0.25);
      dim(["#La1", "#La2", "#La3", "#La6", "#La7", "#La8"], B3, 1);
      dim(["#La4", "#La5"], B3, 0.45);
      dim("#bx-Ana", B3, 1);
      dim("#bx-Ben", B3, 0.3);
      pop("#pl-ana", t(67), {{ from: 0.6 }});
      type("Lc", t(71), 1.6);
      show("#s-cursor", t(71), 0.2);
      tl.set("#s-cursor", {{ x: 1560, y: 980 }}, t(71));
      cursorTo({BOX_X + JAR_DX + chip_pos[('Ana', 2)][0] + 50:.0f}, {BOX_TOP['Ana'] + JAR_DY + 42}, t(72), 0.9);
      draw("r-app", t(74), 0.45);
      out("#s-cursor", t(76) + 0.3, 0.2);
      pop("#c-Ana-2", t(76), {{ from: 0.3 }});
      show("#i-Ana-2", t(76) + 0.2, 0.25);
      out("#pl-ana", t(79) - 0.1, 0.2);
      pop("#pl-place", t(80), {{ from: 0.6 }});
      bump("#jar-Ana", t(80));

      /* ---- 4. Skip a step: guests["Ben"][0] is a KeyError. Labels, not positions ---- */
      const B4 = t(85) - 0.3;
      out(["#r-app", "#pl-place", "#Lc"], B4, 0.25);
      dim(["#La2", "#La3"], B4, 0.45);
      dim(["#La4", "#La5"], B4, 1);
      dim("#bx-Ana", B4, 0.3);
      dim("#bx-Ben", B4, 1);
      type("Ld", t(91), 0.7);
      zoomIn("#hl1", t(92));
      draw("r-d0", t(93), 0.4);
      pop("#oerr", t(96), {{ from: 0.85 }});
      draw("r-lab1", t(101), 0.4);
      draw("r-lab2", t(101) + 0.3, 0.4);
      pop("#pl-labels", t(98), {{ from: 0.6 }});

      /* ---- 5. The trap: week = [[]] * 3. Soup on Monday lands on every day ---- */
      const B5 = t(104) - 0.35;
      const sc4 = ["#cup", "#bx-Ana", "#bx-Ben", "#bx-Chloe", "#hl1", "#r-d0", "#r-lab1", "#r-lab2", "#pl-labels", "#oerr",
        "#La1", "#La2", "#La3", "#La4", "#La5", "#La6", "#La7", "#La8", "#Ld", "#fn1"];
      out(sc4, B5, 0.3);
      show("#fn2", B5 + 0.3, 0.2);
      [0, 1, 2].forEach((k) => {{ pop(`#tg${{k}}`, t(106) + k * 0.15, {{ from: 0.6, d: 0.4 }}); show(`#tl${{k}}`, t(106) + k * 0.15 + 0.2, 0.2); }});
      type("Le1", t(108), 0.5);
      draw("r-inner", t(110), 0.4);
      pop("#plate1", t(112), {{ from: 0.6 }});
      show("#plate1l", t(112) + 0.2, 0.25);
      draw("r-times", t(114), 0.4);
      [0, 1, 2].forEach((k) => show(`#st${{k}}`, t(114) + 0.2 + k * 0.12, 0.25));
      type("Le2", t(116), 0.55);
      show("#s-cursor", t(116), 0.2);
      tl.set("#s-cursor", {{ x: 1560, y: 980 }}, t(116));
      cursorTo({cx[0] + 40}, {TAG_TOP + 60}, t(116) + 0.05, 0.8);
      out("#s-cursor", t(119) + 0.2, 0.2);
      pop("#soupE", t(119), {{ from: 0.4, d: 0.3 }});
      tl.to("#soupE", {{ x: {PLATE[0] - cx[0]}, y: {PLATE[1] - 26 - (TAG_TOP + TAG_H + 30)}, duration: 0.6, ease: "power2.inOut" }}, t(119) + 0.35);
      type("Le3", t(121), 0.3);
      [0, 1, 2].forEach((k) => {{ out(`#tv0-${{k}}`, t(122) + k * 0.2, 0.1); pop(`#tv1-${{k}}`, t(122) + k * 0.2 + 0.1, {{ from: 0.5, d: 0.3 }}); }});
      show("#oe", t(124), 0.2);
      [0, 1, 2].forEach((k) => tl.to(`#st${{k}}`, {{ strokeDasharray: "14 6", duration: 0.3 }}, t(126)));
      pop("#pl-one", t(126), {{ from: 0.6 }});
      bump("#plate1", t(128));

      /* ---- 6. The fix: a loop, a new list each time. Soup stays on Monday ---- */
      const B6 = t(130) - 0.3;
      out(["#Le1", "#Le2", "#Le3", "#oe", "#r-inner", "#r-times", "#pl-one", "#plate1", "#plate1l", "#soupE", "#st0", "#st1", "#st2"], B6, 0.3);
      [0, 1, 2].forEach((k) => {{ out(`#tv1-${{k}}`, B6, 0.2); show(`#tv0-${{k}}`, B6 + 0.25, 0.2); }});
      type("Lf1", t(132), 0.3);
      type("Lf2", t(134), 0.5);
      type("Lf3", t(137), 0.45);
      draw("r-new", t(140), 0.4);
      [0, 1, 2].forEach((k) => {{ pop(`#p3-${{k}}`, t(140) + k * 0.35, {{ from: 0.5, d: 0.4 }}); show(`#p3l-${{k}}`, t(140) + k * 0.35 + 0.2, 0.2); }});
      type("Lf4", t(144), 0.5);
      out("#r-new", t(144), 0.2);
      pop("#soupF", t(145), {{ from: 0.4, d: 0.3 }});
      tl.to("#soupF", {{ y: {PLATES3_Y - 26 - (TAG_TOP + TAG_H + 30)}, duration: 0.45, ease: "power2.inOut" }}, t(145) + 0.3);
      out("#tv0-0", t(146), 0.1); pop("#tv1-0", t(146) + 0.1, {{ from: 0.5, d: 0.3 }});
      type("Lf5", t(147) - 0.2, 0.3);
      show("#of", t(147) + 0.2, 0.2);
      pop("#pl-own", t(144), {{ from: 0.6 }});

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", {{ opacity: 0, duration: 0.25, ease: "power2.in" }}, {STORY} - 0.3);

      window.__timelines = window.__timelines || {{}};
      window.__timelines["story"] = tl;
    }})();
  </script>
</template>
'''
(HERE / 'compositions' / 'story.html').write_text(html_out, encoding='utf-8')
print('wrote story.html', STORY)
