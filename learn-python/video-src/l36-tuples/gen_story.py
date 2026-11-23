"""Writes compositions/story.html for the l36 tuples video.
Repeated parts (the three recipe cards, their rows) are generated here so every timed element
is still a plain tag with a stable id in the HTML."""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
W = json.loads((HERE / 'assets/voice/words.json').read_text())
W = [w['start'] for w in W]

STORY = 62.0
ROWS = [('200', 'g flour'), ('300', 'ml milk'), ('2', 'eggs')]
CARD_X, CARD_Y, CARD_W, CARD_H = 1150, 96, 684, 400
ROW_Y = [150, 235, 320]          # row centres, inside the card
VAL_R = 250                      # right edge of the value column, inside the card


def card(id_, cls, title):
    rows = ''.join(
        f'<div class="cv" id="{id_}-v{i}" style="top:{y - 36}px">{v}</div>'
        f'<div class="cu" style="top:{y - 24}px">{u}</div>'
        for i, ((v, u), y) in enumerate(zip(ROWS, ROW_Y)))
    return (f'<div id="{id_}" class="s-abs card s-ol {cls}">'
            f'<div class="ct">{title}</div>{rows}</div>')


cards = (card('cp', 'plain', "Grandma's pancakes")
         + card('cs', 'paper s-hide', 'scrap of paper')
         + card('cl', 'lam s-hide', "Grandma's pancakes"))

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

    /* recipe cards: plain (start), paper (a list), laminated (a tuple) */
    .card {{ left: {CARD_X}px; top: {CARD_Y}px; width: {CARD_W}px; height: {CARD_H}px; border-radius: 22px; background: #fff; overflow: hidden; }}
    .card.paper {{ background: #fbebd2; border-radius: 6px;
      background-image: repeating-linear-gradient(#fbebd2 0 84px, #e2cfae 84px 87px); background-position: 0 107px; }}
    .card.lam {{ background: #fff; }}
    .card.lam::before {{ content: ""; position: absolute; inset: 14px; border: 5px solid #3b37e6; border-radius: 14px; }}
    .ct {{ position: absolute; left: 0; right: 0; top: 22px; text-align: center; font: 700 46px/60px "Fraunces", serif; letter-spacing: -0.01em; }}
    .cv {{ position: absolute; left: 0; width: {VAL_R}px; text-align: right; font: 700 60px/72px "JetBrains Mono", monospace; }}
    .cu {{ position: absolute; left: {VAL_R + 28}px; font-size: 40px; line-height: 48px; color: #3e3b52; white-space: nowrap; }}
    #shine {{ left: {CARD_X}px; top: {CARD_Y}px; width: {CARD_W}px; height: {CARD_H}px; overflow: hidden; border-radius: 22px; }}
    #shine i {{ position: absolute; top: -40px; left: 0; width: 90px; height: 520px; }}
    #shine u {{ display: block; width: 100%; height: 100%; background: #e6e3ff; opacity: 0.8; transform: rotate(18deg); }}
    #scr400 {{ left: {CARD_X + VAL_R + 250}px; top: {CARD_Y + ROW_Y[0] - 50}px; font: 700 54px/64px "JetBrains Mono", monospace; color: #b8235a; }}
    #scr-line {{ left: {CARD_X + 120}px; top: {CARD_Y + ROW_Y[0] - 4}px; width: 140px; height: 7px; background: #b8235a; border-radius: 4px; transform-origin: 0 50%; }}
    .hl {{ left: {CARD_X + 30}px; width: {CARD_W - 60}px; height: 80px; border-radius: 14px; background: #e6e3ff; }}
    #safe {{ left: {CARD_X + 430}px; top: {CARD_Y + 290}px; padding: 0 26px; height: 76px; line-height: 76px; border-radius: 16px; background: #ddefe6; color: #1f7a5c; font-size: 44px; box-shadow: 0 0 0 5px #1f7a5c; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}

    /* batches after the scribble */
    .bt {{ top: 600px; width: 200px; height: 170px; background: #fff; border-radius: 18px; text-align: center; }}
    .bt span {{ display: block; margin-top: 22px; font-size: 32px; line-height: 40px; }}
    .bt b {{ display: block; margin-top: 18px; font: 700 44px/56px "JetBrains Mono", monospace; color: #b8235a; }}
    .bt em {{ display: block; font-style: normal; font-size: 28px; line-height: 34px; color: #b8235a; }}
    #wrong {{ left: 1380px; top: 800px; padding: 0 30px; height: 84px; line-height: 84px; border-radius: 16px; background: #fbe0ea; color: #b8235a; font-size: 52px; letter-spacing: 0.06em; box-shadow: 0 0 0 5px #b8235a; }}

    /* jars after unpacking */
    .jar {{ top: 600px; width: 196px; height: 210px; background: #fff; border-radius: 26px 26px 34px 34px; text-align: center; }}
    .jar::before {{ content: ""; position: absolute; left: 24px; right: 24px; top: -30px; height: 26px; background: #0e0c1d; border-radius: 8px; }}
    .jar span {{ display: block; margin-top: 30px; font-size: 36px; line-height: 44px; color: #3e3b52; }}
    .jar b {{ display: block; margin-top: 26px; font: 700 64px/76px "JetBrains Mono", monospace; color: #3b37e6; }}
    .fly {{ font: 700 60px/72px "JetBrains Mono", monospace; color: #3b37e6; width: 196px; text-align: center; }}

    /* the trap */
    .tr {{ left: 1150px; width: 684px; height: 130px; border-radius: 22px; background: #fff; }}
    .tr .code {{ position: absolute; left: 36px; top: 0; font: 700 56px/130px "JetBrains Mono", monospace; }}
    .tr .lab {{ position: absolute; right: 30px; top: 33px; }}

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
    .s-ln .s {{ color: #7cf0b5; }}
    #s-div {{ position: absolute; left: 40px; top: 330px; width: 920px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 340px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; left: 40px; font: 500 38px/56px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    .s-err {{ position: absolute; left: 40px; top: 390px; width: 920px; padding: 18px 26px; border-radius: 16px; background: #3a1530; color: #ff8fb1; font: 600 34px/50px "JetBrains Mono", monospace; white-space: pre; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
    #chip400 {{ left: 0; top: 0; padding: 0 18px; height: 70px; line-height: 70px; border-radius: 14px; background: #b8235a; color: #fff; font: 700 44px/70px "JetBrains Mono", monospace; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="hl0" class="s-abs hl s-hide" style="top:{CARD_Y + ROW_Y[0] - 40}px"></div>
        <div id="hl1" class="s-abs hl s-hide" style="top:{CARD_Y + ROW_Y[1] - 40}px"></div>
        {cards}
        <div id="shine" class="s-abs s-hide"><i><u></u></i></div>
        <div id="scr-line" class="s-abs s-hide"></div>
        <div id="scr400" class="s-abs s-hide">400</div>
        <div id="safe" class="s-abs s-hide">SAFE</div>

        <div id="pl-never" class="s-abs pill a s-hide" style="left:1150px; top:560px">the ratio never changes</div>
        <div id="pl-list" class="s-abs pill d s-hide" style="left:1150px; top:560px">a list: <b>[ ]</b> anyone can change it</div>
        <div id="pl-tuple" class="s-abs pill a s-hide" style="left:1150px; top:560px">a tuple: <b>( )</b></div>
        <div id="pl-cannot" class="s-abs pill a s-hide" style="left:1150px; top:650px">a list you cannot change</div>
        <div id="pl-read" class="s-abs pill g s-hide" style="left:1150px; top:560px">reading works: index, slice</div>

        <div id="b0" class="s-abs bt s-ol s-hide" style="left:1150px"><span>Saturday</span><b>400</b><em>g flour</em></div>
        <div id="b1" class="s-abs bt s-ol s-hide" style="left:1392px"><span>Sunday</span><b>400</b><em>g flour</em></div>
        <div id="b2" class="s-abs bt s-ol s-hide" style="left:1634px"><span>Monday</span><b>400</b><em>g flour</em></div>
        <div id="wrong" class="s-abs s-hide">WRONG</div>

        <div id="j0" class="s-abs jar s-ol s-hide" style="left:1160px; top:620px"><span>flour</span><b>200</b></div>
        <div id="j1" class="s-abs jar s-ol s-hide" style="left:1394px; top:620px"><span>milk</span><b>300</b></div>
        <div id="j2" class="s-abs jar s-ol s-hide" style="left:1628px; top:620px"><span>eggs</span><b>2</b></div>
        <div id="f0" class="s-abs fly s-hide" style="left:1160px; top:{620 + 100}px">200</div>
        <div id="f1" class="s-abs fly s-hide" style="left:1394px; top:{620 + 100}px">300</div>
        <div id="f2" class="s-abs fly s-hide" style="left:1628px; top:{620 + 100}px">2</div>
        <div id="pl-new" class="s-abs pill a s-hide" style="left:1150px; top:864px">new: <b>400 600 4</b></div>
        <div id="pl-same" class="s-abs pill g s-hide" style="left:1150px; top:946px">the card stays <b>(200, 300, 2)</b></div>

        <div id="tr0" class="s-abs tr s-ol s-hide" style="top:600px"><div class="code">("egg")</div><div class="lab pill d">just text</div></div>
        <div id="tr1" class="s-abs tr s-ol s-hide" style="top:790px"><div class="code">("egg",)</div><div class="lab pill g">a tuple</div></div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i><span>pancake.py</span></div>
          <div class="s-ln" id="La1" style="top:88px">pancake = [<span class="n">200</span>, <span class="n">300</span>, <span class="n">2</span>]</div>
          <div class="s-ln" id="La2" style="top:148px">pancake[<span class="n">0</span>] = <span class="n">400</span></div>
          <div class="s-ln" id="Lb1" style="top:88px">pancake = (<span class="n">200</span>, <span class="n">300</span>, <span class="n">2</span>)</div>
          <div class="s-ln" id="Lb2" style="top:148px"><span class="k">print</span>(pancake[<span class="n">0</span>])</div>
          <div class="s-ln" id="Lb3" style="top:208px"><span class="k">print</span>(pancake[:<span class="n">2</span>])</div>
          <div class="s-ln" id="Lb4" style="top:268px">pancake[<span class="n">0</span>] = <span class="n">400</span></div>
          <div class="s-ln" id="Lc2" style="top:148px">flour, milk, eggs = pancake</div>
          <div class="s-ln" id="Lc3" style="top:208px"><span class="k">print</span>(flour * <span class="n">2</span>, milk * <span class="n">2</span>, eggs * <span class="n">2</span>)</div>
          <div class="s-ln" id="Ld1" style="top:88px">extra = (<span class="s">"egg"</span>)</div>
          <div class="s-ln" id="Ld1b" style="top:88px">extra = (<span class="s">"egg"</span>,)</div>
          <div class="s-ln" id="Ld2" style="top:148px"><span class="k">print</span>(type(extra))</div>
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
          <div class="s-out" id="ob1" style="top:390px">200</div>
          <div class="s-out" id="ob2" style="top:446px">(200, 300)</div>
          <div class="s-err" id="oerr">TypeError: 'tuple' object
does not support item assignment</div>
          <div class="s-out" id="oc" style="top:390px">400 600 4</div>
          <div class="s-out" id="od1" style="top:390px">&lt;class 'str'&gt;</div>
          <div class="s-out" id="od2" style="top:390px">&lt;class 'tuple'&gt;</div>
        </div>

        <div id="chip400" class="s-abs s-hide">400</div>
        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-sq1" style="stroke:#ffc24b" />
          <path id="r-sq2" style="stroke:#ffc24b" />
          <path id="r-rd1" style="stroke:#ffc24b" />
          <path id="r-rd2" style="stroke:#ffc24b" />
          <path id="r-flour" style="stroke:#3b37e6" />
          <path id="r-unpack" style="stroke:#ffc24b" />
          <path id="r-comma" style="stroke:#ffc24b" />
          <path id="r-comma2" style="stroke:#1f7a5c" />
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
      const col = (c) => 136 + c * 22.8;          // left edge of a code column
      const mid = (a, b) => (col(a) + col(b + 1)) / 2;
      const row = (r) => 214 + 60 * (r - 1);      // centre y of code row r
      ring("r-sq1", mid(10, 22), row(1), 172, 38);
      ring("r-sq2", mid(22, 22), row(1), 20, 34);
      ring("r-rd1", mid(10, 22), row(1), 172, 38);
      ring("r-rd2", mid(22, 22), row(1), 20, 34);
      ring("r-flour", {CARD_X + CARD_W // 2}, {CARD_Y + ROW_Y[0]}, 300, 50);
      ring("r-unpack", mid(0, 16), row(2), 228, 40);
      ring("r-comma", mid(14, 14), row(1) + 8, 17, 24);
      ring("r-comma2", {1150 + 36 + int(6.5 * 33.6)}, 868, 20, 30);

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
      const cursorTo = (x, y, at, d) => tl.to("#s-cursor", {{ x: x - 4, y: y - 3, duration: d || 0.6, ease: "power2.inOut" }}, at);

      // Rows start on the plain card, visible from frame 0.
      tl.set("#s-cursor", {{ x: 1500, y: 700 }}, 0);
      tl.set("#scr400", {{ rotation: -8 }}, 0);

      /* ---- 1. Grandma's card: 200 g flour, 300 ml milk, 2 eggs. The ratio never changes ---- */
      for (let i = 0; i < 3; i++) tl.set(`#cp-v${{i}}`, {{ opacity: 0 }}, 0);
      pop("#cp-v0", t(5), {{ from: 0.4 }});
      pop("#cp-v1", t(10), {{ from: 0.4 }});
      pop("#cp-v2", t(15), {{ from: 0.4 }});
      pop("#pl-never", t(18), {{ from: 0.6 }});

      /* ---- 2. A scrap of paper, a list in square brackets. One line doubles the flour. Every batch wrong ---- */
      out("#pl-never", t(21) - 0.2, 0.2);
      tl.to("#cp", {{ opacity: 0, duration: 0.3 }}, t(25));
      tl.fromTo("#cs", {{ opacity: 0, rotation: 0 }}, {{ opacity: 1, rotation: -2, duration: 0.45, ease: "power2.out", immediateRender: false }}, t(25));
      type("#La1", t(30), 23, 0.6);
      draw("r-sq1", t(32), 0.45);
      pop("#pl-list", t(35), {{ from: 0.6 }});
      out(["#r-sq1", "#r-sq2"], t(40) - 0.2, 0.2);
      type("#La2", t(41), 16, 0.5);
      show("#s-cursor", t(42) - 0.3, 0.2);
      cursorTo({CARD_X + 190}, {CARD_Y + ROW_Y[0]}, t(42) - 0.3, 0.6);
      tl.fromTo("#scr-line", {{ opacity: 1, scaleX: 0 }}, {{ opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out", immediateRender: false }}, t(44));
      tl.to("#cs-v0", {{ color: "#6f6b80", duration: 0.2 }}, t(44));
      pop("#scr400", t(44) + 0.25, {{ from: 0.3 }});
      out("#s-cursor", t(46), 0.2);
      out("#pl-list", t(48) - 0.2, 0.2);
      pop("#b0", t(48), {{ from: 0.5 }});
      pop("#b1", t(49), {{ from: 0.5 }});
      pop("#b2", t(50), {{ from: 0.5 }});
      tl.fromTo("#wrong", {{ opacity: 0, scale: 2.2, rotation: -6 }}, {{ opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power3.in", immediateRender: false }}, t(53));

      /* ---- 3. Laminate the card. Round brackets make a tuple. A list you cannot change ---- */
      const B3 = t(54) - 0.2;
      out(["#b0", "#b1", "#b2", "#wrong", "#La2", "#scr400", "#scr-line", "#cs"], B3, 0.25);
      tl.fromTo("#cl", {{ opacity: 0, scale: 1.15 }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", immediateRender: false }}, t(55));
      tl.set("#shine", {{ opacity: 1 }}, t(55) + 0.2);
      tl.fromTo("#shine i", {{ x: -160 }}, {{ x: 760, duration: 0.8, ease: "power2.inOut", immediateRender: false }}, t(55) + 0.2);
      tl.set("#shine", {{ opacity: 0 }}, t(55) + 1.05);
      out("#La1", t(57) - 0.15, 0.15);
      show("#Lb1", t(57), 0.2);
      draw("r-rd1", t(58), 0.45);
      pop("#pl-tuple", t(62), {{ from: 0.6 }});
      pop("#pl-cannot", t(66), {{ from: 0.6 }});

      /* ---- 4. You can still read it. Index 0 is the flour. A slice gives flour and milk ---- */
      out(["#r-rd1", "#r-rd2", "#pl-tuple", "#pl-cannot"], t(71) - 0.2, 0.2);
      pop("#pl-read", t(74), {{ from: 0.6 }});
      type("#Lb2", t(76), 17, 0.5);
      show("#hl0", t(80), 0.25);
      draw("r-flour", t(80), 0.45);
      show("#ob1", t(80) + 0.2, 0.2);
      out("#r-flour", t(82) - 0.1, 0.2);
      type("#Lb3", t(82), 18, 0.5);
      show("#hl1", t(84), 0.25);
      show("#ob2", t(85), 0.2);

      /* ---- 5. Try to write on it: pancake[0] = 400. Python refuses. TypeError. Safe ---- */
      out(["#hl0", "#hl1", "#pl-read"], t(87), 0.25);
      show("#s-cursor", t(88), 0.2);
      tl.set("#s-cursor", {{ x: 1500, y: 700 }}, t(88));
      cursorTo(col(17), row(4) + 10, t(88) + 0.05, 0.9);
      type("#Lb4", t(93), 16, 1.6);
      // the 400 flies at the card and bounces off
      tl.set("#chip400", {{ x: col(13) - 18, y: row(4) - 35 }}, t(98) - 0.05);
      tl.fromTo("#chip400", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.1, immediateRender: false }}, t(98) - 0.05);
      tl.to("#chip400", {{ x: {CARD_X + 60}, y: {CARD_Y + ROW_Y[0] - 35}, duration: 0.45, ease: "power2.in" }}, t(98));
      tl.fromTo("#cl", {{ x: 0 }}, {{ keyframes: [{{ x: 16, duration: 0.06 }}, {{ x: -12, duration: 0.07 }}, {{ x: 8, duration: 0.07 }}, {{ x: 0, duration: 0.08 }}], immediateRender: false }}, t(98) + 0.45);
      tl.to("#chip400", {{ keyframes: [{{ x: {CARD_X - 200}, y: {CARD_Y + ROW_Y[0] - 140}, rotation: -25, duration: 0.3, ease: "power2.out" }}, {{ y: 900, rotation: -70, opacity: 0, duration: 0.55, ease: "power2.in" }}] }}, t(98) + 0.45);
      out("#s-cursor", t(99), 0.2);
      out(["#ob1", "#ob2"], t(100) - 0.15, 0.15);
      pop("#oerr", t(100), {{ from: 0.85 }});
      bump("#oerr", t(107));
      tl.fromTo("#safe", {{ opacity: 0, scale: 2, rotation: -8 }}, {{ opacity: 1, scale: 1, rotation: -8, duration: 0.3, ease: "power3.in", immediateRender: false }}, t(112));

      /* ---- 6. Unpack into three jars: flour, milk, eggs. New values. The card stays the same ---- */
      const B6 = t(113) - 0.2;
      out(["#safe", "#oerr", "#Lb2", "#Lb3", "#Lb4"], B6, 0.25);
      type("#Lc2", t(117), 27, 0.6);
      draw("r-unpack", t(117) + 0.6, 0.4);
      pop("#j0", t(121), {{ from: 0.5 }}); pop("#j1", t(121) + 0.1, {{ from: 0.5 }}); pop("#j2", t(121) + 0.2, {{ from: 0.5 }});
      for (let i = 0; i < 3; i++) tl.set(`#j${{i}} b`, {{ opacity: 0 }}, t(121));
      // a copy of each card value drops into its jar
      [[0, 123, {CARD_X + VAL_R - 196}], [1, 124, {CARD_X + VAL_R - 196}], [2, 126, {CARD_X + VAL_R - 196}]].forEach(([i, w, fx]) => {{
        const jx = [1160, 1394, 1628][i];
        const fy = [{CARD_Y + ROW_Y[0] - 36}, {CARD_Y + ROW_Y[1] - 36}, {CARD_Y + ROW_Y[2] - 36}][i];
        tl.set(`#f${{i}}`, {{ opacity: 1 }}, t(w));
        tl.fromTo(`#f${{i}}`, {{ x: fx - jx + 0, y: fy - 720 }}, {{ x: 0, y: 0, duration: 0.5, ease: "power2.inOut", immediateRender: false }}, t(w));
        tl.set(`#f${{i}}`, {{ opacity: 0 }}, t(w) + 0.5);
        tl.set(`#j${{i}} b`, {{ opacity: 1 }}, t(w) + 0.5);
        bump(`#cl-v${{i}}`, t(w));
      }});
      out("#r-unpack", t(127), 0.2);
      type("#Lc3", t(128), 32, 0.6);
      show("#oc", t(130), 0.2);
      pop("#pl-new", t(130), {{ from: 0.6 }});
      bump("#cl", t(132));
      pop("#pl-same", t(131) + 0.1, {{ from: 0.6 }});

      /* ---- 7. One trap: ("egg") is just text. Add a comma: a tuple ---- */
      const B7 = t(138) - 0.4;
      out(["#j0", "#j1", "#j2", "#pl-new", "#pl-same", "#oc", "#Lb1", "#Lc2", "#Lc3"], B7, 0.25);
      tl.to("#cl", {{ opacity: 0.25, duration: 0.3 }}, B7);
      type("#Ld1", t(138), 15, 0.5);
      type("#Ld2", t(138) + 0.6, 18, 0.5);
      pop("#tr0", t(138), {{ from: 0.6 }});
      tl.set("#tr0 .lab", {{ opacity: 0 }}, t(138));
      show("#od1", t(143), 0.2);
      pop("#tr0 .lab", t(143), {{ from: 0.5 }});
      out("#Ld1", t(147) - 0.05, 0.05);
      tl.set("#Ld1b", {{ opacity: 1 }}, t(147));
      draw("r-comma", t(147), 0.35);
      pop("#tr1", t(147), {{ from: 0.6 }});
      tl.set("#tr1 .lab", {{ opacity: 0 }}, t(147));
      draw("r-comma2", t(147) + 0.3, 0.35);
      out("#od1", t(152) - 0.1, 0.1);
      show("#od2", t(153), 0.2);
      pop("#tr1 .lab", t(153), {{ from: 0.5 }});

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
