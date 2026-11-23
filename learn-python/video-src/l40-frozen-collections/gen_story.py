"""Writes compositions/story.html for the l40 frozen collections video.
Scenes: 1 the fridge card (set -> frozenset, .add bounces off, "rye" in never),
2 a plain set as a dict key fails (unhashable), 3 the fingerprint and the frozenset key,
4 frozendict, new in 3.15. Every code line and error text was run on python3.15."""
import html
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
W = [w['start'] for w in json.loads((HERE / 'assets/voice/words.json').read_text())]
STORY = 60.5

FS, CW, RH = 32, 19.2, 56
KW = {'print', 'frozenset', 'frozendict', 'in'}


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
    ('La1', 1, 'never = {"flour", "rye", "barley"}'),
    ('La1b', 1, 'never = frozenset({"flour", "rye", "barley"})'),
    ('La2', 2, 'never.add("oats")'),
    ('La2b', 2, 'print("rye" in never)'),
    ('Lb1', 1, 'ana_ben = {"Ana", "Ben"}'),
    ('Lb1b', 1, 'ana_ben = frozenset({"Ana", "Ben"})'),
    ('Lb2', 2, 'menus = {ana_ben: "pasta night"}'),
    ('Lb3', 3, 'print(menus[frozenset({"Ben", "Ana"})])'),
    ('Lc1', 1, 'spice = frozendict({"salt": 5, "pepper": 2})'),
    ('Lc2', 2, 'spice["salt"] = 50'),
]
code_html = '\n'.join(line(*c) for c in CODE)
OUTS = [('oa', 1, 'True'), ('ob', 1, 'pasta night')]
out_html = '\n'.join(f'<div class="s-out" id="{i}" style="top:{530 + 52 * (r - 1)}px">{t}</div>' for i, r, t in OUTS)
ERRS = [
    ('ea', "AttributeError: 'frozenset' object has\nno attribute 'add'. Did you mean to use\na 'set' object?"),
    ('eb', "TypeError: cannot use 'set' as a dict\nkey (unhashable type: 'set')"),
    ('ec', "TypeError: 'frozendict' object does\nnot support item assignment"),
]
err_html = '\n'.join(f'<div class="s-err" id="{i}">{html.escape(t)}</div>' for i, t in ERRS)


ITEMS = ['flour', 'rye', 'barley']
note_items = ''.join(f'<div class="ci s-hide" id="n-{it}" style="top:{118 + k * 74}px">{it}</div>' for k, it in enumerate(ITEMS))
lam_items = ''.join(f'<div class="ci" style="top:{118 + k * 74}px">{it}</div>' for k, it in enumerate(ITEMS))

# fingerprint: open arcs around a centre, drawn in one svg
import math


def arc(cx, cy, r, a0, a1):
    x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
    x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return f'M{x0:.1f} {y0:.1f} A{r} {r} 0 {large} 1 {x1:.1f} {y1:.1f}'


fp_paths = ''.join(f'<path d="{arc(80, 86, 12 + i * 12, 200 + i * 9, 520 - i * 14)}"/>' for i in range(6))

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

    /* the fridge and Chloe's card */
    #fridge {{ left: 1150px; top: 96px; width: 684px; height: 888px; background: #fbf8f4; border-radius: 30px; }}
    #handle {{ position: absolute; left: 40px; top: 300px; width: 28px; height: 240px; border-radius: 14px; background: #ece7df; box-shadow: 0 0 0 4px #0e0c1d; }}
    #frtop {{ position: absolute; left: 0; top: 200px; width: 684px; height: 5px; background: #0e0c1d; }}
    .card {{ left: 1282px; top: 300px; width: 420px; height: 380px; border-radius: 10px; }}
    #note {{ background: #fbebd2; }}
    #lam {{ background: #fff; border-radius: 18px; box-shadow: 0 0 0 5px #0e0c1d, 0 0 0 18px #e6e3ff, 0 0 0 23px #3b37e6, 0 14px 0 23px #3b37e6; }}
    .ch {{ position: absolute; left: 40px; top: 30px; font: 700 46px/60px "Fraunces", serif; white-space: nowrap; }}
    .ci {{ position: absolute; left: 60px; font: 700 44px/60px "JetBrains Mono", monospace; }}
    #magnet {{ position: absolute; left: 186px; top: -22px; width: 48px; height: 48px; border-radius: 50%; background: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; }}

    .chip {{ height: 64px; line-height: 64px; padding: 0 26px; text-align: center; border-radius: 32px; background: #fbebd2; font: 700 32px/64px "JetBrains Mono", monospace; white-space: nowrap; }}
    .chip.w {{ background: #fff; }}
    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill.w {{ background: #fbebd2; color: #8a560f; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}

    /* the dinner plan: key -> value */
    #plan {{ left: 1150px; top: 150px; }}
    .slot {{ top: 300px; height: 150px; border-radius: 22px; }}
    #key {{ left: 1150px; width: 330px; background: #fbebd2; }}
    #keyl {{ left: 1150px; width: 330px; background: #fff; box-shadow: 0 0 0 5px #0e0c1d, 0 0 0 16px #e6e3ff, 0 0 0 21px #3b37e6; }}
    #val {{ left: 1560px; width: 270px; background: #fff; font: 700 44px/52px "Fraunces", serif; text-align: center; padding-top: 23px; }}
    .slot .chip {{ position: absolute; top: 43px; }}
    .cap {{ top: 480px; font: 800 30px/40px "Manrope", sans-serif; color: #3e3b52; }}
    #karr {{ left: 1488px; top: 345px; width: 70px; height: 60px; }}
    #stamp {{ left: 1150px; top: 466px; padding: 0 22px; height: 76px; line-height: 76px; border-radius: 12px; background: #fbe0ea; color: #b8235a; font-size: 46px; letter-spacing: 0.06em; box-shadow: 0 0 0 5px #b8235a; }}
    #fp {{ left: 1180px; top: 560px; width: 170px; height: 180px; }}
    #fp path {{ fill: none; stroke: #3e3b52; stroke-width: 7; stroke-linecap: round; }}
    #fpx {{ left: 1180px; top: 560px; width: 170px; height: 180px; }}
    #look {{ left: 1150px; top: 800px; width: 330px; height: 150px; border-radius: 22px; background: #fff; box-shadow: 0 0 0 5px #0e0c1d, 0 0 0 16px #e6e3ff, 0 0 0 21px #3b37e6; }}
    #look .chip {{ position: absolute; top: 43px; }}

    /* grandma's spice card */
    #new {{ left: 1150px; top: 130px; height: 88px; line-height: 88px; padding: 0 36px; border-radius: 999px; background: #fbebd2; color: #8a560f; font-size: 48px; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; }}
    #spice {{ left: 1176px; top: 300px; width: 632px; height: 400px; background: #fff; border-radius: 18px; box-shadow: 0 0 0 5px #0e0c1d, 0 0 0 18px #e6e3ff, 0 0 0 23px #3b37e6, 0 14px 0 23px #3b37e6; }}
    #spice .ch {{ left: 50px; top: 34px; }}
    .sr {{ position: absolute; left: 60px; font: 700 48px/64px "JetBrains Mono", monospace; }}
    .sv {{ position: absolute; right: 60px; font: 700 48px/64px "JetBrains Mono", monospace; color: #3b37e6; }}
    #spice .note {{ position: absolute; left: 60px; top: 320px; font: 800 30px/40px "Manrope", sans-serif; color: #3e3b52; }}
    #lock {{ left: 1440px; top: 760px; padding: 0 26px; height: 80px; line-height: 80px; border-radius: 12px; background: #e6e3ff; color: #3b37e6; font-size: 48px; letter-spacing: 0.06em; box-shadow: 0 0 0 5px #3b37e6; }}

    /* code panel */
    #s-code {{ left: 96px; top: 96px; width: 1000px; height: 888px; background: #15132b; border-radius: 24px; overflow: hidden; }}
    #s-bar {{ position: absolute; left: 0; top: 0; width: 1000px; height: 64px; background: #211e40; }}
    #s-bar > i {{ position: absolute; top: 23px; width: 18px; height: 18px; border-radius: 50%; background: #ff6b8b; }}
    #s-bar > i:nth-child(2) {{ background: #ffc24b; }}
    #s-bar > i:nth-child(3) {{ background: #4bd69b; }}
    #s-bar > span {{ position: absolute; left: 126px; top: 12px; font: 700 30px/40px "JetBrains Mono", monospace; color: #c9c6ff; white-space: nowrap; }}
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

        <!-- scene 1: the fridge -->
        <div id="fridge" class="s-abs s-ol"><div id="frtop"></div><div id="handle"></div></div>
        <div id="note" class="s-abs card s-ol"><div id="magnet"></div><div class="ch">Chloe: never</div>{note_items}</div>
        <div id="lam" class="s-abs card s-hide" data-layout-allow-overlap><div class="ch">Chloe: never</div>{lam_items}</div>
        <div id="pl-chloe" class="s-abs pill d" style="left:1290px; top:860px">Chloe: gluten-free</div>
        <div id="pl-sticky" class="s-abs pill w s-hide" style="left:1290px; top:760px">a set: a sticky note</div>
        <div id="pl-frozen" class="s-abs pill a s-hide" style="left:1250px; top:760px"><b>frozenset</b>: laminated</div>
        <div id="oats" class="s-abs chip s-ol s-hide" style="left:1560px; top:880px">oats</div>

        <!-- scenes 2 and 3: the dinner plan -->
        <div id="plan" class="s-abs pill a s-hide"><b>menus</b>: a dict, who is coming → dinner</div>
        <div id="key" class="s-abs slot s-ol s-hide"><div id="k-ana" class="chip w s-ol s-hide" style="left:24px">Ana</div><div id="k-ben" class="chip w s-ol s-hide" style="left:176px">Ben</div></div>
        <div id="keyl" class="s-abs slot s-hide" data-layout-allow-overlap><div class="chip w s-ol" style="left:24px">Ana</div><div class="chip w s-ol" style="left:176px">Ben</div></div>
        <svg id="karr" class="s-abs s-hide" viewBox="0 0 70 60"><path d="M4 30 H50" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round"/><path d="M42 14 L64 30 L42 46 Z" fill="#0e0c1d"/></svg>
        <div id="val" class="s-abs slot s-ol s-hide">pasta<br>night</div>
        <div id="cap-k" class="s-abs cap s-hide" style="left:1150px">key: the label</div>
        <div id="cap-v" class="s-abs cap s-hide" style="left:1560px">value</div>
        <div id="stamp" class="s-abs s-hide">UNHASHABLE</div>
        <svg id="fp" class="s-abs s-hide" viewBox="0 0 160 180">{fp_paths}</svg>
        <svg id="fpx" class="s-abs s-hide" viewBox="0 0 160 180"><path d="M20 30 L140 150 M140 30 L20 150" stroke="#b8235a" stroke-width="12" stroke-linecap="round"/></svg>
        <div id="pl-fp" class="s-abs pill a s-hide" style="left:1390px; top:620px">a fixed fingerprint</div>
        <div id="pl-fpbad" class="s-abs pill d s-hide" style="left:1390px; top:620px">can change: no label</div>
        <div id="pl-fpok" class="s-abs pill g s-hide" style="left:1390px; top:620px">frozen: a fixed label</div>
        <div id="look" class="s-abs s-hide"><div class="chip w s-ol" style="left:24px">Ben</div><div class="chip w s-ol" style="left:176px">Ana</div></div>
        <div id="pl-same" class="s-abs pill g s-hide" style="left:1530px; top:843px">same label</div>

        <!-- scene 4: frozendict -->
        <div id="new" class="s-abs s-hide">NEW in Python 3.15</div>
        <div id="spice" class="s-abs s-hide"><div class="ch">Grandma's spice</div>
          <div class="sr" style="top:140px">salt</div><div id="sv-salt" class="sv s-hide" style="top:140px">5 g</div>
          <div class="sr" style="top:226px">pepper</div><div id="sv-pep" class="sv s-hide" style="top:226px">2 g</div>
          <div class="note">grams per pot</div></div>
        <div id="lock" class="s-abs s-hide">LOCKED</div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i style="left:26px"></i><i style="left:56px"></i><i style="left:86px"></i>
            <span id="ttl1">fridge.py</span><span id="ttl2" class="s-hide">menus.py</span><span id="ttl3" class="s-hide">spice.py · Python 3.15</span></div>
{code_html}
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
{out_html}
{err_html}
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-card" style="stroke:#b9741a" />
          <path id="x-rye" style="stroke:#b8235a" />
          <path id="r-braces" style="stroke:#ffc24b" />
          <path id="r-frozen" style="stroke:#ffc24b" />
          <path id="r-add" style="stroke:#ff8fb1" />
          <path id="r-rye" style="stroke:#1f7a5c" />
          <path id="r-key" style="stroke:#ffc24b" />
          <path id="r-fd" style="stroke:#ffc24b" />
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

      const setLen = (p) => {{ const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L; }};
      const ring = (id, cx, cy, rx, ry) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d); setLen(p);
      }};
      const strike = (id, x1, y1, x2, y2) => {{ const p = document.getElementById(id); p.setAttribute("d", `M${{x1}} ${{y1}} Q${{(x1 + x2) / 2}} ${{y1 - 14}} ${{x2}} ${{y2}}`); setLen(p); }};
      const col = (c) => 136 + {CW} + c * {CW};
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const row = (r) => 212 + {RH} * (r - 1);
      ring("r-card", 1492, 360, 190, 46);
      strike("x-rye", 1326, 528, 1444, 516);
      ring("r-braces", mid(8, 34), row(1), 292, 38);
      ring("r-frozen", mid(8, 16), row(1), 122, 38);
      ring("r-add", mid(5, 8), row(2), 64, 36);
      ring("r-rye", 1382, 522, 82, 44);
      ring("r-key", mid(9, 15), row(2), 102, 36);
      ring("r-fd", mid(8, 17), row(1), 130, 38);

      const pop = (sel, at, o) => {{ o = o || {{}}; tl.fromTo(sel, {{ opacity: 0, scale: o.from || 0.6 }}, {{ opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)", immediateRender: false }}, at); }};
      const show = (sel, at, d) => tl.fromTo(sel, {{ opacity: 0 }}, {{ opacity: 1, duration: d || 0.3, ease: "power2.out", immediateRender: false }}, at);
      const out = (sel, at, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at);
      const draw = (id, at, d) => {{
        const p = document.getElementById(id);
        tl.set(p, {{ opacity: 1 }}, at);
        tl.fromTo(p, {{ strokeDashoffset: +p.dataset.len }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out", immediateRender: false }}, at);
      }};
      const bump = (sel, at) => tl.fromTo(sel, {{ scale: 1 }}, {{ scale: 1.1, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }}, at);
      const shake = (sel, at) => tl.fromTo(sel, {{ x: 0 }}, {{ keyframes: [{{ x: -14, duration: 0.07 }}, {{ x: 14, duration: 0.07 }}, {{ x: -10, duration: 0.07 }}, {{ x: 10, duration: 0.07 }}, {{ x: 0, duration: 0.07 }}], immediateRender: false }}, at);
      const type = (id, at, d) => {{
        const n = +document.getElementById(id).dataset.n;
        tl.fromTo("#" + id, {{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}, {{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: d || Math.min(0.9, 0.025 * n), ease: `steps(${{n}})`, immediateRender: false }}, at);
      }};
      const swapLine = (a, b, at) => {{ out("#" + a, at - 0.1, 0.1); type(b, at, 0.5); }};
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", {{ x: x - 4, y: y - 3, duration: d || 0.6, ease: "power2.inOut" }}, at);

      // Frame 0: the fridge with Chloe's card, the items not yet named.
      tl.set("#s-cursor", {{ x: 1700, y: 820 }}, 0);
      tl.set("#note", {{ rotation: -3 }}, 0);
      tl.set("#lam", {{ rotation: -3 }}, 0);
      tl.set("#stamp", {{ rotation: -8 }}, 0);
      tl.set("#lock", {{ rotation: -6 }}, 0);

      /* ---- 1. Chloe's card: never flour, rye, barley. A sticky note anyone can change ---- */
      bump("#pl-chloe", t(0));
      draw("r-card", t(5), 0.45);
      pop("#n-flour", t(9), {{ from: 0.4, d: 0.3 }});
      pop("#n-rye", t(10), {{ from: 0.4, d: 0.3 }});
      pop("#n-barley", t(12), {{ from: 0.4, d: 0.3 }});
      out("#r-card", t(13), 0.2);
      tl.to("#note", {{ keyframes: [{{ rotation: 2, duration: 0.15 }}, {{ rotation: -6, duration: 0.2 }}, {{ rotation: -3, duration: 0.15 }}] }}, t(15));
      draw("x-rye", t(19), 0.35);
      out("#x-rye", t(21) + 0.4, 0.25);

      /* ---- 2. A set is that sticky note. frozenset laminates it. .add bounces off ---- */
      type("La1", t(22), 0.6);
      draw("r-braces", t(24), 0.45);
      out("#pl-chloe", t(26), 0.2);
      pop("#pl-sticky", t(27), {{ from: 0.6 }});
      out("#r-braces", t(29) - 0.2, 0.2);
      swapLine("La1", "La1b", t(32));
      draw("r-frozen", t(33), 0.4);
      out("#pl-sticky", t(36), 0.2);
      // laminate: the sticky note turns into the laminated card
      tl.to(["#note", "#lam"], {{ rotation: 0, duration: 0.4, ease: "power2.out" }}, t(36));
      show("#lam", t(37) + 0.1, 0.35);
      out("#note", t(37) + 0.4, 0.1);
      pop("#pl-frozen", t(38), {{ from: 0.6 }});
      out("#r-frozen", t(39) - 0.2, 0.2);
      type("La2", t(39), 0.45);
      pop("#oats", t(42), {{ from: 0.5, d: 0.3 }});
      tl.to("#oats", {{ keyframes: [{{ x: -90, y: -170, duration: 0.35, ease: "power2.in" }}, {{ x: 120, y: -40, rotation: 22, duration: 0.35, ease: "power2.out" }}, {{ x: 170, y: 20, opacity: 0, duration: 0.3, ease: "power2.in" }}] }}, t(44));
      bump("#lam", t(45));
      pop("#ea", t(47), {{ from: 0.85 }});
      draw("r-add", t(53), 0.4);

      /* ---- 3. Reading still works: is rye on the card? True ---- */
      out(["#ea", "#r-add"], t(55) - 0.2, 0.2);
      swapLine("La2", "La2b", t(55));
      show("#s-cursor", t(58), 0.2);
      cursorTo(1410, 540, t(58), 0.6);
      draw("r-rye", t(59) + 0.3, 0.4);
      show("#oa", t(63), 0.2);
      out("#s-cursor", t(63) + 0.3, 0.2);

      /* ---- 4. A second power: a label. A plain set as a key stops Python ---- */
      const B2 = t(64) - 0.2;
      out(["#fridge", "#lam", "#pl-frozen", "#r-rye", "#La1b", "#La2b", "#oa", "#ttl1"], B2, 0.3);
      show("#ttl2", B2 + 0.3, 0.2);
      pop("#plan", t(69), {{ from: 0.7 }});
      pop("#key", t(75), {{ from: 0.7 }});
      show("#cap-k", t(75) + 0.2, 0.3);
      type("Lb1", t(76), 0.6);
      pop("#k-ana", t(76), {{ from: 0.4, d: 0.3 }});
      pop("#k-ben", t(78), {{ from: 0.4, d: 0.3 }});
      show("#karr", t(80), 0.25);
      pop("#val", t(81), {{ from: 0.6 }});
      show("#cap-v", t(81) + 0.2, 0.3);
      type("Lb2", t(83), 0.6);
      draw("r-key", t(86), 0.4);
      shake("#key", t(92));
      pop("#eb", t(93), {{ from: 0.85 }});
      out("#cap-k", t(95) - 0.2, 0.15);
      tl.fromTo("#stamp", {{ opacity: 0, scale: 2.2 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "power3.in", immediateRender: false }}, t(95));

      /* ---- 5. Hashable: a fixed fingerprint. A set can change. A frozenset can be a label ---- */
      out(["#stamp", "#r-key"], t(98) + 0.6, 0.25);
      show("#cap-k", t(98) + 0.9, 0.3);
      pop("#fp", t(104), {{ from: 0.5 }});
      pop("#pl-fp", t(105), {{ from: 0.6 }});
      out("#pl-fp", t(109) - 0.1, 0.2);
      shake("#key", t(110));
      tl.to("#fp", {{ rotation: 40, duration: 0.5, ease: "power2.inOut" }}, t(110));
      tl.to("#fp path", {{ stroke: "#b8235a", duration: 0.3 }}, t(110));
      pop("#pl-fpbad", t(111), {{ from: 0.6 }});
      pop("#fpx", t(114), {{ from: 0.4, d: 0.3 }});
      // frozen: the key is laminated, the fingerprint holds still
      out(["#fpx", "#pl-fpbad", "#eb"], t(118) - 0.1, 0.2);
      swapLine("Lb1", "Lb1b", t(119));
      tl.to("#fp", {{ rotation: 0, duration: 0.4, ease: "power2.out" }}, t(119));
      tl.to("#fp path", {{ stroke: "#1f7a5c", duration: 0.3 }}, t(119));
      show("#keyl", t(120), 0.3);
      out("#key", t(120) + 0.3, 0.1);
      pop("#pl-fpok", t(121), {{ from: 0.6 }});
      type("Lb3", t(122), 0.7);
      pop("#look", t(122), {{ from: 0.6 }});
      tl.to("#look", {{ y: -500, duration: 0.6, ease: "power2.inOut" }}, t(126));
      out("#look", t(126) + 0.55, 0.15);
      bump("#keyl", t(126) + 0.55);
      tl.to("#val", {{ backgroundColor: "#ddefe6", duration: 0.25 }}, t(128));
      show("#ob", t(129), 0.2);
      pop("#pl-same", t(129), {{ from: 0.6 }});

      /* ---- 6. New in Python 3.15: frozendict. Grandma's spice ratio, locked ---- */
      const B4 = t(131) - 0.3;
      out(["#plan", "#keyl", "#karr", "#val", "#cap-k", "#cap-v", "#fp", "#pl-fpok", "#pl-same", "#Lb1b", "#Lb2", "#Lb3", "#ob", "#ttl2"], B4, 0.25);
      show("#ttl3", B4 + 0.3, 0.2);
      pop("#new", t(131), {{ from: 0.5, ease: "back.out(2.2)" }});
      type("Lc1", t(136), 0.7);
      draw("r-fd", t(137), 0.4);
      pop("#spice", t(138), {{ from: 0.7 }});
      out("#r-fd", t(140), 0.2);
      pop("#sv-salt", t(142), {{ from: 0.4, d: 0.3 }});
      pop("#sv-pep", t(144), {{ from: 0.4, d: 0.3 }});
      type("Lc2", t(144), 0.35);
      tl.fromTo("#lock", {{ opacity: 0, scale: 2.2 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "power3.in", immediateRender: false }}, t(145));
      pop("#ec", t(144) + 0.4, {{ from: 0.85 }});

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
