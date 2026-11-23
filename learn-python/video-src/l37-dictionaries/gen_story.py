"""Writes compositions/story.html for the l37 dictionaries video.
The four jars are generated here so every timed element is still a plain tag with a stable id."""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
W = json.loads((HERE / 'assets/voice/words.json').read_text())
W = [w['start'] for w in W]

STORY = 59.4
JAR_X = [1172, 1338, 1504, 1670]   # left edge of each jar
JAR_Y, JAR_W, JAR_H = 400, 140, 196
KEYS = ['tofu', 'lentils', 'eggs', 'oats']
VALS = ['17', '9', '13', '13']


def jar(i):
    return (f'<div id="j{i}" class="s-abs jar s-ol" style="left:{JAR_X[i]}px">'
            f'<div class="lid"></div><div class="band" id="bd{i}"></div>'
            f'<div class="key s-hide" id="k{i}">{KEYS[i]}</div>'
            f'<div class="val s-hide" id="v{i}">{VALS[i]}</div></div>')


jars = ''.join(jar(i) for i in range(4))
ixs = ''.join(f'<div id="ix{i}" class="s-abs ix s-hide" style="left:{JAR_X[i] + 20}px">[{i}]</div>' for i in range(3))
qs = ''.join(f'<div id="q{i}" class="s-abs qm s-hide" style="left:{JAR_X[i] + 46}px">?</div>' for i in range(3))

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

    /* Ben */
    #ben {{ left: 1150px; top: 96px; width: 684px; height: 150px; background: #fff; border-radius: 22px; }}
    #ben .av {{ position: absolute; left: 30px; top: 30px; width: 90px; height: 90px; border-radius: 50%; background: #1f7a5c; color: #fff; text-align: center; font: 700 52px/90px "Fraunces", serif; box-shadow: 0 0 0 4px #0e0c1d; }}
    #ben .nm {{ position: absolute; left: 150px; top: 20px; font: 700 56px/68px "Fraunces", serif; }}
    #ben .sb {{ position: absolute; left: 150px; top: 88px; font-size: 32px; line-height: 40px; color: #3e3b52; }}
    #ben .pr {{ color: #1f7a5c; }}

    /* the spice rack */
    #rack {{ left: 1150px; top: 290px; width: 684px; height: 360px; background: #fbebd2; border-radius: 18px; }}
    #sign {{ left: 1150px; top: 306px; width: 684px; text-align: center; font-size: 32px; line-height: 44px; color: #3e3b52; }}
    #plank {{ left: 1150px; top: 598px; width: 684px; height: 52px; background: #b9741a; border-radius: 0 0 18px 18px; box-shadow: 0 0 0 5px #0e0c1d; }}
    .jar {{ top: {JAR_Y}px; width: {JAR_W}px; height: {JAR_H}px; background: #fff; border-radius: 20px 20px 26px 26px; }}
    .jar .lid {{ position: absolute; left: 18px; right: 18px; top: -30px; height: 24px; background: #0e0c1d; border-radius: 8px; }}
    .jar .band {{ position: absolute; left: 0; right: 0; top: 30px; height: 60px; background: #ece7df; }}
    .jar .key {{ position: absolute; left: 0; right: 0; top: 30px; height: 60px; line-height: 60px; text-align: center; font-size: 30px; color: #3b37e6; }}
    .jar .val {{ position: absolute; left: 0; right: 0; top: 108px; text-align: center; font: 700 56px/68px "JetBrains Mono", monospace; }}
    #v0b {{ color: #1f7a5c; }}
    .ix {{ top: 664px; width: 100px; height: 52px; line-height: 52px; text-align: center; border-radius: 12px; background: #fff; font: 700 34px/52px "JetBrains Mono", monospace; color: #3e3b52; box-shadow: 0 0 0 4px #0e0c1d; }}
    .qm {{ top: {JAR_Y + 30}px; width: 48px; text-align: center; font: 700 52px/60px "Fraunces", serif; color: #b8235a; }}
    #j3 {{ opacity: 0; }}

    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }}
    .pill.a {{ background: #e6e3ff; color: #3b37e6; }}
    .pill.d {{ background: #fbe0ea; color: #b8235a; }}
    .pill.g {{ background: #ddefe6; color: #1f7a5c; }}
    .pill b {{ font: 700 32px/64px "JetBrains Mono", monospace; }}

    /* key : value card */
    #kv {{ left: 1150px; top: 740px; width: 684px; height: 200px; background: #fff; border-radius: 22px; }}
    #kv .kt {{ position: absolute; left: 150px; top: 26px; font: 700 64px/80px "JetBrains Mono", monospace; white-space: pre; }}
    #kv .kt .s {{ color: #1f7a5c; }}
    #kv .kt .n {{ color: #b9741a; }}
    #kv .lb {{ position: absolute; top: 122px; font-size: 32px; line-height: 44px; color: #3b37e6; }}

    /* new tofu pack */
    #pack {{ left: 1150px; top: 740px; width: 300px; height: 196px; background: #fff; border-radius: 16px; text-align: center; }}
    #pack span {{ display: block; margin-top: 20px; font: 700 44px/54px "Fraunces", serif; }}
    #pack b {{ display: block; margin-top: 8px; font: 700 48px/58px "JetBrains Mono", monospace; color: #1f7a5c; }}
    #pack em {{ display: block; font-style: normal; font-size: 28px; line-height: 34px; color: #3e3b52; }}

    /* missing jar */
    #miss {{ left: {JAR_X[0]}px; top: 730px; width: {JAR_W}px; height: 190px; border-radius: 20px 20px 26px 26px; border: 5px dashed #b8235a; background: #fbe0ea; text-align: center; font-size: 28px; line-height: 180px; color: #b8235a; }}
    #ask {{ left: 1340px; top: 740px; width: 494px; height: 160px; background: #fff; border-radius: 22px; }}
    #ask .c {{ position: absolute; left: 28px; top: 22px; font: 700 34px/48px "JetBrains Mono", monospace; white-space: pre; }}
    #ask .c .s {{ color: #1f7a5c; }}
    #ask .c .k {{ color: #3b37e6; }}
    #ask .r {{ position: absolute; left: 28px; top: 88px; font-size: 32px; line-height: 44px; }}
    #ask .r b {{ font: 700 34px/44px "JetBrains Mono", monospace; color: #b8235a; }}
    #ask .r i {{ font-style: normal; color: #1f7a5c; }}

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
    #s-div {{ position: absolute; left: 40px; top: 700px; width: 920px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 704px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; left: 40px; font: 500 38px/52px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    .s-err {{ position: absolute; left: 40px; top: 800px; width: 920px; padding: 10px 26px; border-radius: 16px; background: #3a1530; color: #ff8fb1; font: 600 36px/52px "JetBrains Mono", monospace; white-space: pre; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <div id="ben" class="s-abs s-ol"><div class="av">B</div><div class="nm">Ben</div><div class="sb">vegetarian, lifts weights</div></div>
        <div id="rack" class="s-abs s-ol"></div>
        <div id="sign" class="s-abs s-hide">g protein per 100 g of food</div>
        <div id="plank" class="s-abs"></div>
        {jars}
        <div id="v0b" class="s-abs s-hide" style="left:{JAR_X[0]}px; top:{JAR_Y + 108}px; width:{JAR_W}px; text-align:center; font: 700 56px/68px 'JetBrains Mono', monospace;">15</div>
        {ixs}
        {qs}

        <div id="pl-which" class="s-abs pill d s-hide" style="left:1150px; top:760px">which one is tofu?</div>
        <div id="pl-pos" class="s-abs pill d s-hide" style="left:1150px; top:850px">you must remember positions</div>

        <div id="kv" class="s-abs s-ol s-hide">
          <div class="kt"><span class="s">"tofu"</span>: <span class="n">17</span></div>
          <div class="lb s-hide" id="lb-key" style="left:{150 + 3 * 38.4 - 28}px">key</div>
          <div class="lb s-hide" id="lb-val" style="left:{150 + 9 * 38.4 - 44}px">value</div>
        </div>

        <div id="pl-name" class="s-abs pill a s-hide" style="left:1150px; top:760px">by name: <b>"tofu"</b> gives <b>17</b></div>
        <div id="pl-nopos" class="s-abs pill g s-hide" style="left:1150px; top:850px">no positions to remember</div>
        <div id="pl-new" class="s-abs pill a s-hide" style="left:1150px; top:760px">a new key adds a jar</div>

        <div id="pack" class="s-abs s-ol s-hide"><span>tofu</span><b>15 g</b><em>per 100 g</em></div>
        <div id="pl-same" class="s-abs pill a s-hide" style="left:1480px; top:752px">same key: replaced</div>
        <div id="pl-once" class="s-abs pill g s-hide" style="left:1480px; top:842px">each key only once</div>

        <div id="miss" class="s-abs s-hide">tempeh</div>
        <div id="pl-nolabel" class="s-abs pill d s-hide" style="left:1340px; top:760px">no such label</div>
        <div id="pl-case" class="s-abs pill d s-hide" style="left:1340px; top:850px"><b>"Tofu"</b> is not <b>"tofu"</b></div>
        <div id="ask" class="s-abs s-ol s-hide">
          <div class="c"><span class="s">"tempeh"</span> <span class="k">in</span> protein</div>
          <div class="r"><b>False</b> <i>ask first, no crash</i></div>
        </div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol">
          <div id="s-bar"><i></i><i></i><i></i><span>protein.py</span></div>
          <div class="s-ln" id="La1" style="top:88px">protein = [<span class="n">17</span>, <span class="n">9</span>, <span class="n">13</span>]</div>
          <div class="s-ln" id="Lb1" style="top:88px">protein = {{</div>
          <div class="s-ln" id="Lb2" style="top:148px">    <span class="s">"tofu"</span>: <span class="n">17</span>,</div>
          <div class="s-ln" id="Lb3" style="top:208px">    <span class="s">"lentils"</span>: <span class="n">9</span>,</div>
          <div class="s-ln" id="Lb4" style="top:268px">    <span class="s">"eggs"</span>: <span class="n">13</span>,</div>
          <div class="s-ln" id="Lb5" style="top:328px">}}</div>
          <div class="s-ln" id="Lc" style="top:388px"><span class="k">print</span>(protein[<span class="s">"tofu"</span>])</div>
          <div class="s-ln" id="Ld" style="top:448px">protein[<span class="s">"oats"</span>] = <span class="n">13</span></div>
          <div class="s-ln" id="Le" style="top:508px">protein[<span class="s">"tofu"</span>] = <span class="n">15</span></div>
          <div class="s-ln" id="Lf" style="top:568px"><span class="k">print</span>(protein[<span class="s">"tempeh"</span>])</div>
          <div class="s-ln" id="Lf2" style="top:568px"><span class="k">print</span>(protein[<span class="s">"Tofu"</span>])</div>
          <div class="s-ln" id="Lf3" style="top:568px"><span class="k">print</span>(protein[<span class="s">"tofu"</span>])</div>
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
          <div class="s-out" id="o1" style="top:748px">17</div>
          <div class="s-out" id="o2" style="top:800px">15</div>
          <div class="s-err" id="oerr">KeyError: 'tempeh'</div>
          <div class="s-err" id="oerr2">KeyError: 'Tofu'</div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-list" style="stroke:#ffc24b" />
          <path id="r-open" style="stroke:#ffc24b" />
          <path id="r-close" style="stroke:#ffc24b" />
          <path id="r-key" style="stroke:#ffc24b" />
          <path id="r-colon" style="stroke:#ffc24b" />
          <path id="r-val" style="stroke:#ffc24b" />
          <path id="r-look" style="stroke:#ffc24b" />
          <path id="r-jar0" style="stroke:#3b37e6" />
          <path id="r-same" style="stroke:#ffc24b" />
          <path id="r-temp" style="stroke:#ff8fb1" />
          <path id="r-cap" style="stroke:#ff8fb1" />
          <path id="r-fix" style="stroke:#7cf0b5" />
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
      const half = (a, b) => (b - a + 1) * 11.4 + 16;
      const row = (r) => 214 + 60 * (r - 1);      // centre y of code row r
      ring("r-list", mid(10, 20), row(1), half(10, 20), 38);
      ring("r-open", mid(10, 10), row(1), 22, 34);
      ring("r-close", mid(0, 0), row(5), 22, 34);
      ring("r-key", mid(4, 9), row(2), half(4, 9), 36);
      ring("r-colon", mid(10, 10), row(2), 20, 32);
      ring("r-val", mid(12, 13), row(2), half(12, 13), 34);
      ring("r-look", mid(14, 19), row(6), half(14, 19), 36);
      ring("r-jar0", {JAR_X[0] + JAR_W // 2}, {JAR_Y + JAR_H // 2 - 14}, 96, 136);
      ring("r-same", mid(8, 13), row(8), half(8, 13), 36);
      ring("r-temp", mid(14, 21), row(9), half(14, 21), 36);
      ring("r-cap", mid(15, 15), row(9), 22, 34);
      ring("r-fix", mid(15, 15), row(9), 22, 34);

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
      const jarMid = (i) => {JAR_X[0]} + i * 166 + {JAR_W // 2};

      tl.set("#s-cursor", {{ x: 1500, y: 980 }}, 0);
      for (let i = 0; i < 3; i++) tl.set(`#j${{i}}`, {{ opacity: 0.35 }}, 0);

      /* ---- 1. Ben counts protein, grams per 100 g ---- */
      bump("#ben", t(6));
      show("#sign", t(10), 0.3);

      /* ---- 2. A list: 17, 9, 13. Which one is tofu? Remember the position ---- */
      type("#La1", t(16), 21, 0.5);
      draw("r-list", t(19) - 0.1, 0.45);
      [[0, 19], [1, 20], [2, 22]].forEach(([i, w]) => {{
        tl.to(`#j${{i}}`, {{ opacity: 1, duration: 0.2 }}, t(w));
        pop(`#v${{i}}`, t(w), {{ from: 0.4 }});
        pop(`#ix${{i}}`, t(w) + 0.1, {{ from: 0.5 }});
      }});
      out("#r-list", t(24) - 0.1, 0.2);
      show("#s-cursor", t(24), 0.2);
      cursorTo(jarMid(0), 560, t(24), 0.35);
      cursorTo(jarMid(2), 560, t(26), 0.45);
      cursorTo(jarMid(1), 560, t(27) + 0.3, 0.4);
      pop("#q0", t(27), {{ from: 0.3 }}); pop("#q1", t(27) + 0.1, {{ from: 0.3 }}); pop("#q2", t(27) + 0.2, {{ from: 0.3 }});
      pop("#pl-which", t(27), {{ from: 0.6 }});
      out("#s-cursor", t(31), 0.2);
      pop("#pl-pos", t(31), {{ from: 0.6 }});
      bump(["#ix0", "#ix1", "#ix2"], t(33));

      /* ---- 3. A dictionary: a spice rack with labels. Curly brackets. key : value. Tofu 17, lentils 9, eggs 13 ---- */
      out(["#pl-which", "#pl-pos", "#q0", "#q1", "#q2"], t(34) - 0.1, 0.25);
      bump("#rack", t(38));
      [0, 1, 2].forEach(i => tl.to(`#bd${{i}}`, {{ backgroundColor: "#e6e3ff", duration: 0.3 }}, t(41) + i * 0.1));
      out("#La1", t(42) - 0.1, 0.15);
      show("#Lb1", t(42), 0.2);
      show("#Lb5", t(42) + 0.2, 0.2);
      draw("r-open", t(42) + 0.1, 0.35);
      draw("r-close", t(43), 0.35);
      out(["#r-open", "#r-close"], t(44) - 0.1, 0.2);
      type("#Lb2", t(44), 15, 0.5);
      pop("#kv", t(45), {{ from: 0.7 }});
      draw("r-key", t(48), 0.4);
      pop("#lb-key", t(48), {{ from: 0.5 }});
      draw("r-colon", t(50), 0.35);
      draw("r-val", t(53), 0.4);
      pop("#lb-val", t(53), {{ from: 0.5 }});
      out(["#r-key", "#r-colon", "#r-val"], t(54) - 0.1, 0.2);
      out(["#ix0", "#ix1", "#ix2"], t(54) - 0.1, 0.25);
      pop("#k0", t(54), {{ from: 0.4 }});
      type("#Lb3", t(56), 17, 0.5);
      pop("#k1", t(56), {{ from: 0.4 }});
      type("#Lb4", t(58), 15, 0.5);
      pop("#k2", t(58), {{ from: 0.4 }});

      /* ---- 4. Ask by name: protein["tofu"] gives 17. No positions ---- */
      out("#kv", t(60) - 0.1, 0.25);
      type("#Lc", t(64), 22, 0.6);
      draw("r-look", t(65), 0.4);
      show("#s-cursor", t(65), 0.2);
      tl.set("#s-cursor", {{ x: col(17), y: row(6) + 10 }}, t(65));
      cursorTo(jarMid(0) + 30, 470, t(65) + 0.2, 0.6);
      draw("r-jar0", t(66), 0.45);
      show("#o1", t(67), 0.2);
      bump("#v0", t(67));
      pop("#pl-name", t(67), {{ from: 0.6 }});
      out(["#r-look", "#s-cursor"], t(68), 0.2);
      out("#r-jar0", t(70), 0.2);
      pop("#pl-nopos", t(69), {{ from: 0.6 }});

      /* ---- 5. A new key adds a jar: oats 13 slides onto the rack ---- */
      out(["#pl-name", "#pl-nopos"], t(72) - 0.1, 0.25);
      type("#Ld", t(75), 20, 0.6);
      tl.fromTo("#j3", {{ opacity: 1, x: 300 }}, {{ opacity: 1, x: 0, duration: 0.55, ease: "power3.out", immediateRender: false }}, t(80));
      tl.set("#bd3", {{ backgroundColor: "#e6e3ff" }}, t(80));
      pop("#k3", t(80) + 0.3, {{ from: 0.4 }});
      pop("#v3", t(81), {{ from: 0.4 }});
      pop("#pl-new", t(79), {{ from: 0.6 }});

      /* ---- 6. A new tofu pack says 15. Same key again: replaced. Each key once ---- */
      out("#pl-new", t(90) - 0.25, 0.2);
      pop("#pack", t(90), {{ from: 0.6 }});
      bump("#pack b", t(92));
      type("#Le", t(93), 20, 0.6);
      draw("r-same", t(96), 0.4);
      show("#s-cursor", t(96), 0.2);
      tl.set("#s-cursor", {{ x: col(14), y: row(8) + 10 }}, t(96));
      cursorTo(jarMid(0) + 30, 540, t(96) + 0.15, 0.6);
      tl.to("#v0", {{ opacity: 0, y: 30, duration: 0.3 }}, t(100));
      pop("#v0b", t(103), {{ from: 0.3 }});
      pop("#pl-same", t(103), {{ from: 0.6 }});
      out(["#r-same", "#s-cursor"], t(104), 0.2);
      pop("#pl-once", t(105), {{ from: 0.6 }});

      /* ---- 7. Ben asks for tempeh: no such label, KeyError. "Tofu" with a capital T fails too ---- */
      out(["#pack", "#pl-same", "#pl-once"], t(109), 0.25);
      type("#Lf", t(113), 24, 0.6);
      draw("r-temp", t(113) + 0.5, 0.4);
      show("#s-cursor", t(114), 0.2);
      tl.set("#s-cursor", {{ x: jarMid(0), y: 380 }}, t(114));
      cursorTo(jarMid(3), 380, t(114) + 0.1, 1.2);
      [0, 1, 2, 3].forEach(i => bump(`#k${{i}}`, t(114) + 0.15 + i * 0.3));
      tl.fromTo("#miss", {{ opacity: 0, scale: 0.7 }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }}, t(117));
      pop("#pl-nolabel", t(118), {{ from: 0.6 }});
      out("#s-cursor", t(118), 0.2);
      pop("#oerr", t(119), {{ from: 0.85 }});
      out("#r-temp", t(121) - 0.1, 0.15);
      tl.set("#Lf", {{ opacity: 0 }}, t(121));
      tl.set("#Lf2", {{ opacity: 1 }}, t(121));
      draw("r-cap", t(124), 0.35);
      tl.set("#oerr", {{ opacity: 0 }}, t(126));
      tl.set("#oerr2", {{ opacity: 1 }}, t(126));
      bump("#oerr2", t(126));
      pop("#pl-case", t(126), {{ from: 0.6 }});
      bump("#pl-case", t(130));

      /* ---- 8. Check the spelling, or ask first: "tempeh" in protein ---- */
      out("#r-cap", t(133) - 0.1, 0.15);
      tl.set("#Lf2", {{ opacity: 0 }}, t(133));
      tl.set("#Lf3", {{ opacity: 1 }}, t(133));
      draw("r-fix", t(133) + 0.05, 0.35);
      out(["#oerr2", "#pl-case"], t(134), 0.2);
      show("#o2", t(135), 0.2);
      out(["#pl-nolabel", "#r-fix"], t(137) - 0.1, 0.2);
      pop("#ask", t(139), {{ from: 0.6 }});
      bump("#ask .r b", t(142));

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
