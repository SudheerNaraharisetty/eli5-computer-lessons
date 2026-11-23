"""Writes compositions/story.html for the l35 looping-over-lists video.
Repeated elements (the 5 basket cards, spot numbers, copies) are generated here so every timed
element is still a plain tag with a stable id in the HTML."""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
W = json.loads((HERE / 'assets/voice/words.json').read_text())
W = [w['start'] for w in W] if isinstance(W, list) and W and isinstance(W[0], dict) else W

STORY = 57.6
ITEMS = ['oats', 'pasta', 'rye bread', 'rice', 'tofu']
GLUTEN = {1, 2}
SY = lambda k: 384 + 92 * k          # top of basket spot k
CARD_L, CARD_W, CARD_H = 1206, 290, 74
COL_L, COL_W = 1560, 274             # right column
PAPER_TOP = lambda j: 400 + 88 * j   # where copy j lands on the paper list

CHECK = '<svg viewBox="0 0 40 40"><path d="M10 21 L17 28 L30 13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CROSS = '<svg viewBox="0 0 40 40"><path d="M13 13 L27 27 M27 13 L13 27" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>'

def card(i):
    return (f'<div id="k{i}" class="s-abs card s-ol s-hide" style="left:{CARD_L}px; top:{SY(i)}px">'
            f'<i id="kt{i}" class="tint"></i><span>{ITEMS[i]}</span>'
            f'<em id="kx{i}" class="bdg bx">{CROSS}</em><em id="kc{i}" class="bdg bk">{CHECK}</em></div>')

cards = ''.join(card(i) for i in range(5))
spots = ''.join(f'<div id="n{k}" class="s-abs spot s-hide" style="top:{SY(k)}px">{k}</div>' for k in range(5))
ghosts = ''.join(f'<div id="g{k}" class="s-abs ghost s-hide" style="top:{SY(k)}px"><span>{ITEMS[k]}</span></div>' for k in range(5))
SAFE = [0, 3, 4]
copies = ''.join(f'<div id="q{i}" class="s-abs card small s-ol s-hide" style="left:{COL_L + 12}px; top:{PAPER_TOP(j)}px"><span>{ITEMS[i]}</span></div>'
                 for j, i in enumerate(SAFE))
LIFT = {f'q{i}': [CARD_L - (COL_L + 12), SY(i) - PAPER_TOP(j)] for j, i in enumerate(SAFE)}
ivals = ''.join(f'<div id="iv{i}" class="iv s-hide">"{ITEMS[i]}"</div>' for i in range(5))

S = '<span class="st">'
K = lambda w: f'<span class="k">{w}</span>'
LINES = {
    'L0': (0, f'basket = [{S}"oats"</span>, {S}"pasta"</span>, {S}"rye bread"</span>,'),
    'L1': (1, f'          {S}"rice"</span>, {S}"tofu"</span>]'),
    'L2': (2, f'gluten = [{S}"pasta"</span>, {S}"rye bread"</span>, {S}"flour"</span>]'),
    'L4': (4, f'{K("for")} item {K("in")} basket:'),
    'L5': (5, f'    {K("print")}(item)'),
    'P5': (5, f'    {K("if")} item {K("in")} gluten:'),
    'P6': (6, '        basket.remove(item)'),
    'P8': (8, f'{K("print")}(basket)'),
    'F4': (4, 'safe = []'),
    'F5': (5, f'{K("for")} item {K("in")} basket:'),
    'F6': (6, f'    {K("if")} item {K("not")} {K("in")} gluten:'),
    'F7': (7, '        safe.append(item)'),
    'F8': (8, f'{K("print")}(safe)'),
    'C4': (4, f'{K("for")} item {K("in")} basket[:]:'),
    'C5': (5, f'    {K("if")} item {K("in")} gluten:'),
    'C6': (6, '        basket.remove(item)'),
    'C8': (8, f'{K("print")}(basket)'),
}
code_lines = ''.join(f'<div class="s-ln" id="{k}" style="top:{88 + 60 * r}px">{h}</div>' for k, (r, h) in LINES.items())
outa = ''.join(f'<div class="s-out sm" id="oa{j}" style="top:{528 + 48 * j}px">{ITEMS[j]}</div>' for j in range(5))
RYE = "<span class=\"rd\">'rye bread'</span>"

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

    /* header: Chloe's basket */
    #h-ch {{ left: 1150px; top: 96px; width: 684px; height: 110px; background: #fff; border-radius: 22px; }}
    #h-ch .av {{ position: absolute; left: 24px; top: 21px; width: 68px; height: 68px; border-radius: 50%; background: #b8235a; color: #fff; font-size: 38px; line-height: 68px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }}
    #h-ch .tx {{ position: absolute; left: 114px; top: 0; height: 110px; font: 700 46px/110px "Fraunces", serif; white-space: nowrap; letter-spacing: -0.01em; }}
    #h-gf {{ left: 1630px; top: 127px; height: 48px; line-height: 48px; padding: 0 18px; border-radius: 999px; background: #fbe0ea; color: #b8235a; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}

    /* the loop variable */
    #ibox {{ left: 1150px; top: 236px; width: 684px; height: 80px; background: #fff; border-radius: 18px; }}
    #ibox .nm {{ position: absolute; left: 28px; top: 0; font: 700 40px/80px "JetBrains Mono", monospace; color: #0e0c1d; white-space: pre; }}
    .iv {{ position: absolute; left: 220px; top: 0; font: 700 40px/80px "JetBrains Mono", monospace; color: #3b37e6; white-space: pre; }}

    .colh {{ top: 336px; height: 36px; font-size: 28px; line-height: 36px; color: #3e3b52; white-space: nowrap; }}
    .spot {{ left: 1150px; width: 44px; height: {CARD_H}px; text-align: center; font: 700 34px/{CARD_H}px "JetBrains Mono", monospace; color: #3b37e6; }}
    .card {{ width: {CARD_W}px; height: {CARD_H}px; background: #fbebd2; border-radius: 16px; }}
    .card .tint {{ position: absolute; inset: 0; border-radius: 16px; background: #fbe0ea; opacity: 0; }}
    .card span {{ position: absolute; left: 22px; top: 0; font-size: 34px; line-height: {CARD_H}px; white-space: nowrap; }}
    .card.small {{ width: 250px; height: 70px; background: #ddefe6; }}
    .card.small span {{ line-height: 70px; }}
    .bdg {{ position: absolute; left: 234px; top: 17px; width: 40px; height: 40px; border-radius: 50%; opacity: 0; }}
    .bdg svg {{ width: 40px; height: 40px; display: block; }}
    .bx {{ background: #b8235a; }}
    .bk {{ background: #1f7a5c; }}
    .ghost {{ left: {COL_L}px; width: {COL_W}px; height: {CARD_H}px; border-radius: 16px; border: 4px dashed #0e0c1d; background: #fbf8f4; }}
    .ghost span {{ position: absolute; left: 20px; top: 0; font-size: 32px; line-height: 66px; color: #3e3b52; white-space: nowrap; }}
    #tray {{ left: {COL_L}px; top: {SY(0)}px; width: {COL_W}px; height: {CARD_H}px; border-radius: 16px; border: 4px dashed #b8235a; }}
    #paper {{ left: {COL_L}px; top: {SY(0)}px; width: {COL_W}px; height: 300px; background: #fff; border-radius: 16px; }}
    .pill {{ left: 1150px; top: 880px; height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pd {{ background: #fbe0ea; color: #b8235a; }}
    .pg {{ background: #ddefe6; color: #1f7a5c; }}
    .pa {{ background: #e6e3ff; color: #3b37e6; }}

    /* code panel: 38px mono = 22.8px per char, text at page x 136, rows 60px from panel y 88 */
    #s-code {{ left: 96px; top: 96px; width: 1000px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1000px; height: 64px; background: #211e40; display: flex; align-items: center; padding: 0 26px; gap: 12px; }}
    #s-bar > i {{ width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ margin-left: 14px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; }}
    .s-ln {{ position: absolute; left: 40px; font: 500 38px/60px "JetBrains Mono", monospace; color: #eceaff; white-space: pre; opacity: 0; }}
    .s-ln .k {{ color: #c9c6ff; }}
    .s-ln .st {{ color: #ffc24b; }}
    .s-div {{ position: absolute; left: 40px; width: 920px; height: 3px; background: #2e2a58; opacity: 0; }}
    .s-ol2 {{ position: absolute; left: 40px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; opacity: 0; }}
    .s-out {{ position: absolute; left: 40px; font: 500 36px/56px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    .s-out.sm {{ line-height: 48px; }}
    .s-out .rd {{ color: #ff8fb0; }}
    .stamp {{ top: 860px; height: 70px; line-height: 70px; padding: 0 26px; border-radius: 14px; font-size: 36px; white-space: nowrap; background: #fbe0ea; color: #b8235a; box-shadow: 0 0 0 5px #b8235a; }}
    #st1 {{ left: 136px; }}
    #st2 {{ left: 430px; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 56px; height: 56px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="h-ch" class="s-abs s-ol"><div class="av">C</div><div class="tx">Chloe's basket</div></div>
        <div id="h-gf" class="s-abs s-hide">no gluten</div>

        <div id="ibox" class="s-abs s-ol s-hide"><div class="nm">item = </div>{ivals}</div>

        <div id="hb" class="s-abs colh s-hide" style="left:{CARD_L}px">basket</div>
        <div id="hr" class="s-abs colh s-hide" style="left:{COL_L}px; color:#b8235a">removed</div>
        <div id="hs" class="s-abs colh s-hide" style="left:{COL_L}px; color:#1f7a5c">safe = [ ]</div>
        <div id="hc" class="s-abs colh s-hide" style="left:{COL_L}px; color:#3b37e6">basket[:] copy</div>
        {spots}
        <div id="tray" class="s-abs s-hide"></div>
        <div id="paper" class="s-abs s-ol s-hide"></div>
        {ghosts}
        {cards}
        {copies}

        <div id="pl-skip" class="s-abs pill pd s-hide">rye bread: never checked</div>
        <div id="pl-alone" class="s-abs pill pa s-hide">leave the basket alone</div>
        <div id="pl-all" class="s-abs pill pg s-hide">5 of 5 checked. Nothing skipped.</div>
        <div id="pl-slice" class="s-abs pill pa s-hide">[:] is a slice: a copy (lesson 33)</div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol s-hide">
          <div id="s-bar"><i></i><i></i><i></i><span>basket.py</span></div>
          {code_lines}
          <div class="s-div" id="da" style="top:470px"></div>
          <div class="s-ol2" id="la" style="top:478px">output</div>
          {outa}
          <div class="s-div" id="db" style="top:640px"></div>
          <div class="s-ol2" id="lb" style="top:648px">output</div>
          <div class="s-out" id="ob" style="top:698px">['oats', {RYE}, 'rice', 'tofu']</div>
          <div class="s-out" id="of" style="top:698px">['oats', 'rice', 'tofu']</div>
          <div class="s-out" id="oc" style="top:698px">['oats', 'rice', 'tofu']</div>
        </div>
        <div id="st1" class="s-abs stamp s-hide">No error.</div>
        <div id="st2" class="s-abs stamp s-hide">Bread for Chloe!</div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-item" style="stroke:#ffc24b" />
          <path id="r-bask" style="stroke:#ffc24b" />
          <path id="r-rem" style="stroke:#ff6b8b" />
          <path id="r-skip" style="stroke:#b8235a; stroke-dasharray: 14 12" />
          <path id="r-not" style="stroke:#ffc24b" />
          <path id="r-app" style="stroke:#4bd69b" />
          <path id="r-copy" style="stroke:#ffc24b" />
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
      const LIFT = {json.dumps(LIFT)};
      const SY = (k) => {SY(0)} + 92 * k;
      const tl = gsap.timeline({{ paused: true }});

      const ring = (id, cx, cy, rx, ry, dashed) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d);
        const L = p.getTotalLength(); p.dataset.len = L;
        if (!dashed) {{ p.style.strokeDasharray = L; p.style.strokeDashoffset = L; }}
      }};
      const col = (c) => 136 + c * 22.8;
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const RY = (r) => 214 + 60 * r;
      ring("r-item", mid(4, 7), RY(4), 62, 36);
      ring("r-bask", mid(12, 17), RY(4), 84, 36);
      ring("r-rem", mid(8, 26), RY(6), 252, 40);
      ring("r-skip", {CARD_L + CARD_W // 2}, SY(1) + 37, 158, 58, true);
      ring("r-not", mid(12, 17), RY(6), 84, 36);
      ring("r-app", mid(8, 24), RY(7), 232, 40);
      ring("r-copy", mid(18, 20), RY(4), 46, 36);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.4, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.fromTo(sel, {{ opacity: 1 }}, {{ opacity: 0, duration: d || 0.25, ease: "power2.in", immediateRender: false }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        if (p.style.strokeDasharray && !p.style.strokeDasharray.includes(" ")) {{
          tl.set(p, {{ opacity: 1 }}, at);
          tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out", immediateRender: false }}, at);
        }} else {{ show(p, at, d || 0.35); }}
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.08, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const type = (sel, at, n, d) => tl.fromTo(sel, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.035 * n, ease: `steps(${{n}})`, immediateRender: false }}, at);

      // Card positions are tracked here so every move is a fromTo with exact start values.
      const pos = [0, 1, 2, 3, 4].map(() => ({{ x: 0, y: 0, s: 1 }}));
      const move = (i, to, at, d, ease) => {{
        const from = Object.assign({{}}, pos[i]);
        tl.fromTo(`#k${{i}}`, {{ x: from.x, y: from.y, scale: from.s }}, {{ x: to.x, y: to.y, scale: to.s, duration: d || 0.5, ease: ease || "power2.inOut", immediateRender: false }}, at);
        pos[i] = Object.assign({{}}, to);
      }};
      // The cursor points at the right edge of basket spot k; the item box shows the loop variable.
      let cur = null, cy = null, curItem = null;
      const point = (k, at) => {{
        const to = {{ x: {CARD_L + CARD_W - 8}, y: SY(k) + 34 }};
        if (cy === null) {{ tl.set("#s-cursor", {{ x: to.x, y: to.y }}, at - 0.3); show("#s-cursor", at - 0.3, 0.2); }}
        else tl.fromTo("#s-cursor", {{ x: to.x, y: cy }}, {{ x: to.x, y: to.y, duration: 0.22, ease: "power2.inOut", immediateRender: false }}, at - 0.22);
        cy = to.y; cur = k;
        bump(`#n${{k}}`, at);
      }};
      const hideCursor = (at) => {{ out("#s-cursor", at, 0.2); cy = null; }};
      const setItem = (i, at) => {{
        if (curItem !== null) out(`#iv${{curItem}}`, at - 0.12, 0.12);
        show(`#iv${{i}}`, at, 0.15);
        curItem = i;
      }};
      const clearItem = (at) => {{ if (curItem !== null) out(`#iv${{curItem}}`, at, 0.15); curItem = null; }};
      const visit = (k, i, at) => {{ point(k, at); setItem(i, at); bump(`#k${{i}}`, at); }};

      /* ---- 1. Back from the shop, five things in the basket. Chloe: no gluten ---- */
      tl.fromTo("#s-code", {{ opacity: 0, y: 60 }}, {{ opacity: 1, y: 0, duration: 0.5, ease: "expo.out", immediateRender: false }}, t(5) - 0.3);
      type("#L0", t(7), 39, 0.9);
      type("#L1", t(7) + 0.95, 25, 0.5);
      show("#hb", t(7), 0.3);
      for (let i = 0; i < 5; i++) {{ pop(`#k${{i}}`, t(7) + i * 0.12, {{ from: 0.5, d: 0.35 }}); pop(`#n${{i}}`, t(7) + i * 0.12, {{ from: 0.3, d: 0.3 }}); }}
      pop("#h-gf", t(14), {{ from: 0.5 }});
      type("#L2", t(14), 40, 0.9);
      for (let i = 0; i < 5; i++) bump(`#k${{i}}`, t(18) + i * 0.08);

      /* ---- 2. for item in basket: the loop hands you one item at a time ---- */
      type("#L4", t(22), 19, 0.55);
      draw("r-item", t(23), 0.35);
      draw("r-bask", t(25), 0.35);
      out(["#r-item", "#r-bask"], t(27) + 0.4, 0.2);
      type("#L5", t(27), 15, 0.4);
      pop("#ibox", t(28), {{ from: 0.8 }});
      show(["#da", "#la"], t(30), 0.3);
      [[35, 0], [36, 1], [37, 2], [39, 3], [40, 4]].forEach(([w, k]) => {{ visit(k, k, t(w)); show(`#oa${{k}}`, t(w) + 0.1, 0.15); }});

      /* ---- 3. The trap: remove inside the loop. Rye bread slides up and is never checked ---- */
      const B3 = t(41) - 0.2;
      hideCursor(B3); clearItem(B3);
      out(["#L5", "#da", "#la", "#oa0", "#oa1", "#oa2", "#oa3", "#oa4"], B3, 0.25);
      type("#P5", t(42), 22, 0.5);
      type("#P6", t(42) + 0.6, 27, 0.6);
      type("#P8", t(42) + 1.3, 13, 0.35);
      visit(0, 0, t(44));
      visit(1, 1, t(47));
      show("#kt1", t(47) + 0.15, 0.25);
      draw("r-rem", t(50), 0.45);
      show(["#tray", "#hr"], t(50), 0.3);
      move(1, {{ x: {COL_L + COL_W // 2 - (CARD_L + CARD_W // 2)}, y: -92, s: 0.9 }}, t(52), 0.7);
      for (let i = 2; i < 5; i++) move(i, {{ x: 0, y: -92, s: 1 }}, t(61) + (i - 2) * 0.08, 0.45);
      bump("#k2", t(66)); bump("#n1", t(66));
      visit(2, 3, t(77));
      draw("r-skip", t(83), 0.35);
      pop("#pl-skip", t(86), {{ from: 0.6 }});
      visit(3, 4, t(88));
      hideCursor(t(90) + 0.4); clearItem(t(90) + 0.4);
      show(["#db", "#lb"], t(90), 0.25);
      show("#ob", t(91), 0.25);
      pop("#st1", t(94), {{ from: 0.5 }});
      pop("#st2", t(97), {{ from: 0.5 }});

      /* ---- 4. The fix: leave the basket alone, append the safe items to a new list ---- */
      const B4 = t(100) - 0.2;
      out(["#L4", "#P5", "#P6", "#P8", "#db", "#lb", "#ob", "#st1", "#st2", "#pl-skip", "#r-skip", "#r-rem", "#tray", "#hr", "#kt1"], B4, 0.25);
      move(1, {{ x: 0, y: 0, s: 1 }}, t(101), 0.6);
      for (let i = 2; i < 5; i++) move(i, {{ x: 0, y: 0, s: 1 }}, t(101) + 0.2, 0.45);
      pop("#pl-alone", t(102), {{ from: 0.6 }});
      type("#F4", t(106), 9, 0.3);
      pop("#paper", t(110), {{ from: 0.85 }});
      show("#hs", t(110), 0.3);
      type("#F5", t(113), 19, 0.4);
      type("#F6", t(113) + 0.45, 26, 0.5);
      [[113, 0], [114, 1], [115, 2], [117, 3], [118, 4]].forEach(([w, k]) => {{
        visit(k, k, t(w));
        if (k === 1 || k === 2) {{ show(`#kt${{k}}`, t(w) + 0.1, 0.2); pop(`#kx${{k}}`, t(w) + 0.1, {{ from: 0.3, d: 0.3 }}); }}
        else pop(`#kc${{k}}`, t(w) + 0.1, {{ from: 0.3, d: 0.3 }});
      }});
      draw("r-not", t(117), 0.35);
      out("#r-not", t(119) - 0.1, 0.2);
      type("#F7", t(119), 25, 0.45);
      draw("r-app", t(119) + 0.3, 0.35);
      hideCursor(t(120)); clearItem(t(120));
      [[121, 0], [122, 3], [123, 4]].forEach(([w, i]) => {{
        tl.fromTo(`#q${{i}}`, {{ opacity: 1, x: LIFT[`q${{i}}`][0], y: LIFT[`q${{i}}`][1] }}, {{ opacity: 1, x: 0, y: 0, duration: 0.45, ease: "power2.inOut", immediateRender: false }}, t(w) - 0.15);
      }});
      type("#F8", t(123) + 0.1, 11, 0.3);
      show(["#db", "#lb"], t(123) + 0.3, 0.2);
      show("#of", t(123) + 0.5, 0.2);
      out("#pl-alone", t(124) - 0.2, 0.2);
      pop("#pl-all", t(124), {{ from: 0.6 }});

      /* ---- 5. Must you remove? Loop over a copy made with a slice, remove from the real one ---- */
      const B5 = t(129) - 0.2;
      out(["#F4", "#F5", "#F6", "#F7", "#F8", "#of", "#db", "#lb", "#r-app", "#paper", "#hs", "#q0", "#q3", "#q4", "#pl-all",
           "#kt1", "#kt2", "#kx1", "#kx2", "#kc0", "#kc3", "#kc4"], B5, 0.25);
      type("#C4", t(135), 22, 0.5);
      type("#C5", t(135) + 0.55, 22, 0.45);
      type("#C6", t(135) + 1.05, 27, 0.5);
      for (let k = 0; k < 5; k++) pop(`#g${{k}}`, t(138) + k * 0.07, {{ from: 0.6, d: 0.3 }});
      show("#hc", t(138), 0.3);
      draw("r-copy", t(140), 0.35);
      pop("#pl-slice", t(142), {{ from: 0.6 }});
      show(["#kt1", "#kt2"], t(143), 0.2);
      out(["#k1", "#k2"], t(143) + 0.3, 0.3);
      move(3, {{ x: 0, y: -184, s: 1 }}, t(143) + 0.5, 0.45);
      move(4, {{ x: 0, y: -184, s: 1 }}, t(143) + 0.58, 0.45);
      type("#C8", t(143), 13, 0.3);
      show(["#db", "#lb"], t(144), 0.2);
      show("#oc", t(144) + 0.1, 0.2);

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
