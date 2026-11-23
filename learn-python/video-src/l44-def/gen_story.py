"""Writes compositions/story.html for the l44 def video.
Code rows, paper checklists and the recipe card are generated here, so every timed element
is still a plain tag with a stable id in the HTML."""
import html
import json
import math
import pathlib
import re

HERE = pathlib.Path(__file__).parent
W = [w['start'] for w in json.loads((HERE / 'assets/voice/words.json').read_text())]
STORY = round(W[133] + 0.6 - 0.1, 2)   # the takeaway starts on the last "Write"

# ---- code panel: 28px JetBrains Mono = 16.8px per char, text at page x 136, rows 44px ----
FS, CW, RH = 28, 16.8, 44
PANEL = (96, 96, 720, 888)
KW = {'print', 'def'}


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


def rtop(row):            # top of a code row, inside the panel
    return 88 + RH * (row - 1)


def line(id_, row, src, col=0, cls=''):
    return (f'<div class="s-ln{cls}" id="{id_}" data-n="{max(1, len(src))}" '
            f'style="top:{rtop(row)}px; left:{40 + col * CW:.1f}px">{paint(src)}</div>')


DAY = ['print("Monday")', 'print("Tuesday")', 'print("Wednesday")']
ITEM_SRC = ['print("- 50 g oats")', 'print("- 1 banana")', 'print("- 1 coffee")', 'print("- 500 ml water")']
PB_SRC = 'print("- 15 g peanut butter")'

rows_a = []
for d in range(3):
    rows_a.append((f'A{d * 5 + 1}', d * 5 + 1, DAY[d]))
    for k in range(4):
        rows_a.append((f'A{d * 5 + 2 + k}', d * 5 + 2 + k, ITEM_SRC[k]))
code_a = '\n'.join(line(i, r, s) for i, r, s in rows_a)
code_a += '\n' + line('AP1', 4, PB_SRC, cls=' pb') + '\n' + line('AP2', 10, PB_SRC, cls=' pb')

# the fixed program: a card (rows 1-5) and the calls (rows 7-12), all inside #bwrap
code_b = (line('Bdef', 1, 'def') + line('Bname', 1, 'print_breakfast', col=4) + line('Bbr', 1, '()', col=19) +
          line('Bco', 1, ':', col=21))
for k, s in enumerate(ITEM_SRC):
    code_b += line(f'B{k + 2}', k + 2, '    ' + s)
code_b += line('BP', 4, '    ' + PB_SRC, cls=' pb')
CALLS = [('C1', 7, DAY[0]), ('C2n', 8, 'print_breakfast'), ('C3', 9, DAY[1]), ('C4', 10, 'print_breakfast()'),
         ('C5', 11, DAY[2]), ('C6', 12, 'print_breakfast()')]
code_b += ''.join(line(i, r, s) for i, r, s in CALLS) + line('C2b', 8, '()', col=15)
code_d = line('D1', 1, 'print_breakfast()', cls=' bad')

for s in [PB_SRC, '    ' + PB_SRC]:
    assert 40 + len(s) * CW <= PANEL[2] - 30, s

# ---- right side: three paper checklists, and the recipe card ----
PX, PTOP, PW, PH = [870, 1200, 1530], 150, 300, 330
NAMES = ['oats', 'banana', 'coffee', 'water']
SLOT0, SLOT = 80, 48


def item(id_, slot, text, extra=''):
    return (f'<div id="{id_}" class="it{extra}" style="top:{SLOT0 + SLOT * slot}px">'
            f'<i></i>{text}</div>')


papers = ''
for d, (x, day) in enumerate(zip(PX, ['Monday', 'Tuesday', 'Wednesday'])):
    inner = f'<div class="ph">{day}</div>'
    inner += ''.join(item(f'p{d}-{n}', k if k < 2 else k, n) for k, n in enumerate(NAMES))
    inner += item(f'p{d}-pb', 2, 'peanut butter', ' pbi')
    if d == 2:
        inner += f'<div id="miss" class="miss" style="top:{SLOT0 + SLOT * 2 - 4}px">missed</div>'
    papers += f'<div id="pp{d}" class="s-abs paper s-ol{" s-hide" if d else ""}" style="left:{x}px">{inner}</div>'

CARD = (1130, 560, 440, 330)
card_inner = ''
card_inner += '<div id="ch" class="chd s-hide">print_breakfast</div><div id="chl" class="chl"></div>'
for k, n in enumerate(NAMES):
    card_inner += (f'<div id="k-{n}" class="it s-hide" style="top:{84 + SLOT * k}px"><i></i>{n}</div>')
card_inner += f'<div id="k-pb" class="it pbi s-hide" style="top:{84 + SLOT * 2}px"><i></i>peanut butter</div>'

# arrows: from the top of the card to the bottom of each paper
A0 = (CARD[0] + CARD[2] / 2, CARD[1] - 8)
ENDS = [(x + PW / 2, PTOP + PH + 18) for x in PX]
arrows = ''
for d, (ex, ey) in enumerate(ENDS):
    sx = A0[0] + (d - 1) * 120
    arrows += f'<path id="ar{d}" class="arl" d="M{sx:.0f} {A0[1]:.0f} L{ex:.0f} {ey:.0f}" />'
    # arrowhead
    a = math.atan2(ey - A0[1], ex - sx)
    b, s = 22, 12
    p1 = (ex - b * math.cos(a) + s * math.sin(a), ey - b * math.sin(a) - s * math.cos(a))
    p2 = (ex - b * math.cos(a) - s * math.sin(a), ey - b * math.sin(a) + s * math.cos(a))
    arrows += f'<path id="ah{d}" class="arh" d="M{ex:.0f} {ey:.0f} L{p1[0]:.1f} {p1[1]:.1f} L{p2[0]:.1f} {p2[1]:.1f} Z" />'

# page coordinates of code tokens
col = lambda c: 136 + c * CW
rowc = lambda r: 96 + rtop(r) + RH / 2

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

    /* paper checklists */
    .paper {{ top: {PTOP}px; width: {PW}px; height: {PH}px; background: #fff; border-radius: 18px; }}
    .ph {{ position: absolute; left: 0; top: 14px; width: {PW}px; text-align: center; font: 700 36px/48px "Fraunces", serif; }}
    .it {{ position: absolute; left: 22px; height: 44px; font: 800 28px/44px "Manrope", sans-serif; white-space: nowrap; opacity: 0; }}
    .it i {{ display: inline-block; width: 24px; height: 24px; margin: 0 14px -3px 0; border-radius: 6px; box-shadow: 0 0 0 3px #0e0c1d; background: #fff; }}
    .it.pbi {{ color: #1f7a5c; }}
    .it.pbi i {{ box-shadow: 0 0 0 3px #1f7a5c; background: #ddefe6; }}
    .miss {{ position: absolute; left: 14px; width: {PW - 28}px; height: 48px; border-radius: 24px; text-align: center; font: 800 28px/44px "Manrope", sans-serif; color: #b8235a; border: 4px dashed #b8235a; opacity: 0; }}
    #title {{ left: 870px; top: 56px; height: 60px; line-height: 60px; padding: 0 28px; border-radius: 999px; font-size: 32px; background: #fff; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }}
    #title b {{ display: inline-block; width: 40px; height: 40px; margin: 0 12px -6px -8px; border-radius: 50%; background: #1f7a5c; color: #fff; font-size: 28px; line-height: 40px; text-align: center; }}

    /* the recipe card */
    #card {{ left: {CARD[0]}px; top: {CARD[1]}px; width: {CARD[2]}px; height: {CARD[3]}px; background: #fbebd2; border-radius: 22px; }}
    .chd {{ position: absolute; left: 0; top: 12px; width: {CARD[2]}px; text-align: center; font: 700 32px/48px "JetBrains Mono", monospace; color: #3b37e6; }}
    .chl {{ position: absolute; left: 24px; top: 66px; width: {CARD[2] - 48}px; height: 3px; background: #0e0c1d; }}
    #arrows {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #arrows .arl {{ fill: none; stroke: #3b37e6; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #arrows .arh {{ fill: #3b37e6; opacity: 0; }}
    .callt {{ font: 800 28px/40px "Manrope", sans-serif; color: #3b37e6; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill.w {{ background: #fbebd2; color: #8a560f; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}
    .mid {{ left: 870px; top: 580px; }}
    .bot {{ left: 870px; top: 916px; }}

    /* code panel */
    #s-code {{ left: {PANEL[0]}px; top: {PANEL[1]}px; width: {PANEL[2]}px; height: {PANEL[3]}px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: {PANEL[2]}px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ margin-left: 14px; font: 700 28px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    #bwrap {{ position: absolute; left: 0; top: 0; width: {PANEL[2]}px; height: {PANEL[3]}px; }}
    .s-ln {{ position: absolute; font: 500 {FS}px/{RH}px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .n {{ color: #ffc24b; }}
    .s-ln .s {{ color: #7cf0b5; }}
    .s-ln.pb {{ background: rgba(124, 240, 181, 0.16); }}
    .s-ln.bad {{ background: rgba(255, 107, 139, 0.22); }}
    #wedbox {{ left: 20px; top: {rtop(13) - 4}px; width: 600px; height: {RH * 5 + 8}px; border: 4px dashed #ff8fb1; border-radius: 16px; opacity: 0; }}
    #bodybar {{ left: 56px; top: {rtop(2) + 4}px; width: 14px; height: {RH * 4 - 8}px; border: 4px solid #7cf0b5; border-right: none; border-radius: 6px 0 0 6px; opacity: 0; }}
    .s-err {{ position: absolute; left: 30px; top: {rtop(14) + 64}px; width: 660px; padding: 14px 22px; border-radius: 16px; background: #3a1530; color: #ff8fb1; font: 600 28px/42px "JetBrains Mono", monospace; white-space: pre; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; z-index: 5; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="title" class="s-abs"><b>B</b>Ben's breakfast checklist</div>
        {papers}
        <svg id="arrows" class="s-abs" viewBox="0 0 1920 1080">{arrows}</svg>
        <div id="callt" class="s-abs callt s-hide" style="left:{A0[0] + 60:.0f}px; top:{A0[1] - 52:.0f}px">call</div>
        <div id="card" class="s-abs s-ol s-hide">{card_inner}</div>

        <div id="pl-ben" class="s-abs pill w mid s-hide">Ben: add peanut butter, please</div>
        <div id="pl-miss" class="s-abs pill d bot s-hide">no error. Nobody notices.</div>
        <div id="pl-none" class="s-abs pill a bot s-hide">def writes the card. Nothing runs yet.</div>
        <div id="pl-call" class="s-abs pill g bot s-hide">a call: the name, then <b>()</b></div>
        <div id="pl-once" class="s-abs pill g bot s-hide">changed once, on the card</div>
        <div id="pl-quiet" class="s-abs pill d bot s-hide">no brackets: nothing, no error</div>
        <div id="pl-first" class="s-abs pill g bot s-hide">write the card first, then call it</div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i><span>mornings.py</span></div>
          <div id="awrap">
{code_a}
          </div>
          <div id="wedbox" class="s-abs"></div>
          <div id="bwrap">
{code_b}
            <div id="bodybar" class="s-abs"></div>
          </div>
{code_d}
          <div class="s-err" id="oerr">NameError: name 'print_breakfast'
is not defined</div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-def" style="stroke:#ffc24b" />
          <path id="r-name" style="stroke:#ffc24b" />
          <path id="r-br" style="stroke:#ffc24b" />
          <path id="r-co" style="stroke:#ffc24b" />
          <path id="r-call" style="stroke:#7cf0b5" />
          <path id="r-nob" style="stroke:#ff8fb1" />
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
      const RH = {RH}, SLOT = {SLOT};

      const ring = (id, cx, cy, rx, ry) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d);
        const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L;
      }};
      const col = (c) => 136 + c * {CW};
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const half = (a, b) => (b - a + 1) * {CW} / 2 + 12;
      const row = (r) => {96 + 88 + RH / 2} + RH * (r - 1);
      const codeRing = (id, r, a, b) => ring(id, mid(a, b), row(r), half(a, b), 30);
      codeRing("r-def", 1, 0, 2);
      codeRing("r-name", 1, 4, 18);
      codeRing("r-br", 1, 19, 20);
      codeRing("r-co", 1, 21, 21);
      codeRing("r-call", 9, 15, 16);   // the () of the Monday call, after the peanut butter row is added
      codeRing("r-nob", 9, 15, 16);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const dim = (sel, at, v) => tl.to(sel, {{ opacity: v, duration: 0.3, ease: "power2.out" }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out", immediateRender: false }}, at);
      }};
      const drawArrow = (k, at) => {{
        const p = document.getElementById("ar" + k), L = p.getTotalLength();
        p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: L }}, {{ strokeDashoffset: 0, duration: 0.4, ease: "power2.out", immediateRender: false }}, at);
        show("#ah" + k, at + 0.35, 0.15);
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.08, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const type = (id, at, d) => {{
        const n = +document.getElementById(id).dataset.n;
        tl.fromTo("#" + id, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || Math.min(0.7, 0.025 * n), ease: `steps(${{n}})`, immediateRender: false }}, at);
      }};
      const shift = (ids, at, dy) => tl.to(ids.map((i) => "#" + i), {{ y: dy, duration: 0.35, ease: "power2.inOut" }}, at);
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", {{ x: x - 4, y: y - 3, duration: d || 0.6, ease: "power2.inOut" }}, at);
      const items = (d) => ["oats", "banana", "coffee", "water"].map((n) => `#p${{d}}-${{n}}`);
      const fillPaper = (d, at, step) => items(d).forEach((s, k) => pop(s, at + k * (step || 0.12), {{ from: 0.6, d: 0.3 }}));
      // peanut butter arrives on a paper (or the card): coffee and water slide down a slot, then it pops in
      const addPB = (pre, at) => {{
        tl.to([`#${{pre}}-coffee`, `#${{pre}}-water`], {{ y: SLOT, duration: 0.35, ease: "power2.inOut" }}, at);
        pop(`#${{pre}}-pb`, at + 0.3, {{ from: 0.5, d: 0.35 }});
      }};

      // Frame 0: Ben's checklist title, the Monday paper and an empty code panel.
      tl.set("#s-cursor", {{ x: 1500, y: 960 }}, 0);

      /* ---- 1. Every morning: oats, banana, coffee, water ---- */
      type("A1", t(2), 0.4);
      ["oats", "banana", "coffee", "water"].forEach((n, k) => {{
        type("A" + (k + 2), t(8 + k), 0.4);
        pop(`#p0-${{n}}`, t(8 + k) + 0.1, {{ from: 0.6, d: 0.35 }});
      }});

      /* ---- 2. 3 mornings: the same lines, copied 3 times ---- */
      ["A6", "A7", "A8", "A9", "A10"].forEach((id, k) => type(id, t(23) + k * 0.12, 0.3));
      ["A11", "A12", "A13", "A14", "A15"].forEach((id, k) => type(id, t(24) + k * 0.12, 0.3));
      pop("#pp1", t(15) + 0.2, {{ from: 0.7 }});
      pop("#pp2", t(15) + 0.45, {{ from: 0.7 }});
      fillPaper(1, t(23) + 0.2, 0.1);
      fillPaper(2, t(24) + 0.2, 0.1);
      bump("#pp0", t(26)); bump("#pp1", t(27)); bump("#pp2", t(28));

      /* ---- 3. Peanut butter: Monday, Tuesday... Wednesday missed ---- */
      pop("#pl-ben", t(30), {{ from: 0.6 }});
      bump("#title", t(33));
      show("#s-cursor", t(38) - 0.4, 0.2);
      cursorTo({col(19) + 10:.0f}, {rowc(3) + 6:.0f}, t(38) - 0.3, 0.7);
      shift(["A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"], t(42) - 0.1, RH);
      type("AP1", t(42) + 0.25, 0.5);
      addPB("p0", t(42) + 0.2);
      cursorTo({col(19) + 10:.0f}, {rowc(9) + 6:.0f}, t(43) - 0.2, 0.5);
      shift(["A9", "A10", "A11", "A12", "A13", "A14", "A15"], t(44) - 0.1, 2 * RH);
      type("AP2", t(44) + 0.25, 0.5);
      addPB("p1", t(44) + 0.2);
      cursorTo(1480, 900, t(45) - 0.1, 0.6);
      out("#s-cursor", t(45) + 0.5, 0.2);
      out("#pl-ben", t(45), 0.2);
      tl.to(["#p2-coffee", "#p2-water"], {{ y: SLOT, duration: 0.35, ease: "power2.inOut" }}, t(46));
      pop("#miss", t(47), {{ from: 0.5 }});
      show("#wedbox", t(47), 0.3);
      pop("#pl-miss", t(49), {{ from: 0.6 }});

      /* ---- 4. The fix: a recipe card. def, a name, brackets, a colon ---- */
      const B4 = t(51) - 0.3;
      out(["#awrap", "#wedbox", "#miss", "#pl-miss", "#title"], B4, 0.3);
      [0, 1, 2].forEach((d) => out([...items(d), `#p${{d}}-pb`], B4, 0.3));
      [0, 1, 2].forEach((d) => tl.set([`#p${{d}}-coffee`, `#p${{d}}-water`], {{ y: 0 }}, B4 + 0.35));
      pop("#card", t(55), {{ from: 0.7 }});
      type("Bdef", t(58), 0.2); draw("r-def", t(58), 0.35);
      type("Bname", t(60), 0.4); draw("r-name", t(60), 0.4); show("#ch", t(60), 0.3);
      type("Bbr", t(62), 0.15); draw("r-br", t(62), 0.35);
      type("Bco", t(65), 0.1); draw("r-co", t(65), 0.35);
      out(["#r-def", "#r-name", "#r-br", "#r-co"], t(67), 0.25);
      ["oats", "banana", "coffee", "water"].forEach((n, k) => {{
        type("B" + (k + 2), t(67) + k * 0.35, 0.4);
        pop(`#k-${{n}}`, t(67) + k * 0.35 + 0.2, {{ from: 0.6, d: 0.3 }});
      }});
      show("#bodybar", t(70), 0.3);
      pop("#pl-none", t(74), {{ from: 0.6 }});

      /* ---- 5. Call it by name, with brackets. 3 times. Then peanut butter, once ---- */
      out(["#pl-none", "#bodybar"], t(78) - 0.2, 0.2);
      type("C1", t(81), 0.3);
      type("C2n", t(82), 0.35); type("C2b", t(85), 0.1);
      drawArrow(0, t(84));
      fillPaper(0, t(84) + 0.3, 0.1);
      draw("r-call", t(86), 0.4);
      pop("#pl-call", t(86), {{ from: 0.6 }});
      show("#callt", t(84) + 0.2, 0.3);
      type("C3", t(87), 0.3); type("C4", t(87) + 0.35, 0.35);
      type("C5", t(88), 0.3); type("C6", t(88) + 0.35, 0.35);
      drawArrow(1, t(89)); fillPaper(1, t(89) + 0.3, 0.08);
      drawArrow(2, t(89) + 0.3); fillPaper(2, t(89) + 0.6, 0.08);
      // the ring on () was drawn for row 9 (after the shift); before the shift the call sits on row 8
      gsap.set("#r-call", {{ y: -RH }});
      out(["#r-call", "#pl-call"], t(91) - 0.2, 0.2);
      show("#s-cursor", t(91), 0.2);
      tl.set("#s-cursor", {{ x: 1480, y: 960 }}, t(91));
      cursorTo({col(23) + 10:.0f}, {rowc(3) + 6:.0f}, t(91) + 0.05, 0.6);
      shift(["B4", "B5", "C1", "C2n", "C2b", "C3", "C4", "C5", "C6"], t(93) - 0.1, RH);
      type("BP", t(93) + 0.25, 0.5);
      addPB("k", t(93) + 0.2);
      out("#s-cursor", t(95), 0.2);
      pop("#pl-once", t(96), {{ from: 0.6 }});
      addPB("p0", t(100));
      addPB("p1", t(100) + 0.35);
      addPB("p2", t(100) + 0.7);

      /* ---- 6. Trap 1: no brackets, nothing happens. Trap 2: call before def ---- */
      out("#pl-once", t(104) - 0.2, 0.2);
      show("#s-cursor", t(106) - 0.3, 0.2);
      tl.set("#s-cursor", {{ x: 1480, y: 960 }}, t(106) - 0.3);
      cursorTo({col(16) + 6:.0f}, {rowc(9) + 6:.0f}, t(106) - 0.2, 0.6);
      draw("r-nob", t(107), 0.35);
      out("#C2b", t(108), 0.25);
      out("#s-cursor", t(108) + 0.4, 0.2);
      dim([...items(0), "#p0-pb"], t(110), 0.12);
      out("#arrows #ar0, #arrows #ah0", t(110), 0.2);
      pop("#pl-quiet", t(110), {{ from: 0.6 }});
      // back to normal before trap 2
      const B6 = t(116) - 0.2;
      out(["#r-nob", "#pl-quiet"], B6, 0.2);
      show("#C2b", B6, 0.2);
      dim([...items(0), "#p0-pb"], B6, 1);
      dim(["#ar0", "#ah0"], B6, 1);
      tl.to("#bwrap", {{ y: RH, duration: 0.4, ease: "power2.inOut" }}, t(117));
      type("D1", t(118) + 0.1, 0.45);
      pop("#oerr", t(122), {{ from: 0.85 }});
      dim(["#pp0", "#pp1", "#pp2", "#card", "#arrows", "#callt"], t(123), 0.25);
      pop("#pl-first", t(128) + 0.05, {{ from: 0.6 }});
      out("#D1", t(131), 0.25);
      out("#oerr", t(131), 0.25);
      tl.to("#bwrap", {{ y: 0, duration: 0.4, ease: "power2.inOut" }}, t(131) + 0.2);
      dim(["#pp0", "#pp1", "#pp2", "#card", "#arrows", "#callt"], t(131) + 0.2, 1);

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
