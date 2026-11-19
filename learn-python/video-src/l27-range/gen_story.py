"""Writes compositions/story.html for the l27 range video.
The repeated elements (20 stir cells, outputs, timer digits) are generated here so every
timed element is still a plain tag with a stable id in the HTML."""
import pathlib

W = [0.0, 0.209, 0.685, 1.126, 1.718, 2.159, 2.647, 3.541, 3.715, 3.901, 4.226, 4.331, 4.516, 5.178, 5.41, 5.619, 6.153, 6.455, 6.629, 7.21, 7.407, 7.744, 7.895, 8.301, 9.416, 9.764, 10.077, 10.194, 10.542, 10.797, 11.122, 11.25, 11.355, 12.225, 12.492, 13.015, 13.41, 13.955, 14.257, 15.488, 16.208, 16.567, 17.067, 17.345, 17.461, 17.624, 17.798, 17.972, 18.982, 19.365, 19.632, 20.131, 20.932, 21.432, 21.989, 22.302, 22.674, 23.336, 23.487, 23.765, 24.125, 24.381, 24.624, 25.658, 26.018, 26.25, 26.331, 26.726, 26.911, 27.306, 27.596, 27.759, 28.595, 28.874, 29.245, 29.431, 29.895, 30.069, 30.151, 30.859, 31.254, 31.428, 31.939, 32.345, 32.647, 33.541, 33.715, 34.028, 34.412, 34.853, 35.283, 35.434, 36.316, 36.664, 36.966, 37.129, 37.605, 37.848, 38.243, 38.545, 39.555, 39.799, 40.054, 40.925, 41.099, 41.215, 41.331, 41.598, 41.97, 42.202, 42.62, 42.852, 43.561, 43.967, 44.118, 44.478, 44.617, 45.581, 45.743, 46.01, 46.324, 46.498, 46.637, 47.531, 47.833, 48.03, 48.576, 48.878, 48.994, 49.76, 50.178, 50.619, 51.211, 51.583, 52.395, 53.115, 53.731, 54.369, 54.683, 54.799, 54.984, 55.147, 55.925, 56.296, 57.469, 57.655, 57.968, 58.943, 59.199, 59.338, 59.547, 60.186, 60.534, 60.894, 61.196, 62.02, 62.252, 62.891, 63.077, 63.518, 63.82, 64.168]

STORY = 59.4
DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

# ---- generated markup ----
cells = ''.join(
    f'<div id="c{i}" class="s-abs cell s-ol s-hide" style="left:{1150 + (i % 10) * 69}px; top:{520 + (i // 10) * 82}px"><b id="cn{i}">{i}</b></div>'
    for i in range(20))
timer = ''.join(f'<div id="tn{i}" class="tnum">{i}</div>' for i in range(20))
out_stir = ''.join(
    f'<div id="os{i}" class="s-out" style="left:{40 + (i // 10) * 300}px; top:{330 + (i % 10) * 48}px">Stir {i}</div>'
    for i in range(20))
out_day = ''.join(
    f'<div id="od{d}" class="s-out" style="left:40px; top:{330 + (d - 1) * 48}px">Day {d}</div>' for d in range(1, 8))
out_min = ''.join(
    f'<div id="om{m}" class="s-out" style="left:{40 + (0 if m > 5 else 300)}px; top:{330 + ((10 - m) % 5) * 48}px">{m}</div>'
    for m in range(10, 0, -1))
cal = ''.join(
    f'<div id="d{i + 1}" class="s-abs day s-ol s-hide" style="left:{1150 + i * 84}px"><span>{d}</span><b id="dn{i + 1}">{i + 1}</b></div>'
    for i, d in enumerate(DAYS))
dial = ''.join(f'<div id="dv{m}" class="dval">{m}</div>' for m in range(10, 0, -1))
ticks = ''.join(
    f'<line x1="190" y1="22" x2="190" y2="{46 if k % 3 == 0 else 38}" stroke="#0e0c1d" stroke-width="{6 if k % 3 == 0 else 4}" stroke-linecap="round" transform="rotate({k * 30} 190 190)"/>'
    for k in range(12))

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
    .mono {{ font-family: "JetBrains Mono", monospace; font-weight: 700; }}

    /* header cards: the recipe, then each friend */
    .hdr {{ left: 1150px; top: 96px; width: 684px; height: 120px; background: #fff; border-radius: 22px; }}
    .hdr .av {{ position: absolute; left: 26px; top: 26px; width: 68px; height: 68px; border-radius: 50%; color: #fff; font-size: 38px; line-height: 68px; text-align: center; box-shadow: 0 0 0 4px #0e0c1d; }}
    .hdr .tx {{ position: absolute; left: 116px; top: 0; height: 120px; line-height: 120px; font: 700 46px/120px "Fraunces", serif; white-space: nowrap; letter-spacing: -0.01em; }}
    .hdr .tx b {{ font: 700 46px/120px "JetBrains Mono", monospace; color: #3b37e6; }}
    #h-rec {{ background: #fbebd2; }}
    #h-rec .av {{ background: #b9741a; }}

    /* stir counter */
    #tm {{ left: 1150px; top: 262px; width: 684px; height: 200px; background: #fff; border-radius: 22px; }}
    #tm .lb {{ position: absolute; left: 34px; top: 34px; font-size: 34px; color: #3e3b52; }}
    #tm .lb2 {{ position: absolute; left: 34px; top: 86px; font: 700 34px/44px "JetBrains Mono", monospace; color: #3b37e6; }}
    .tnum {{ position: absolute; left: 330px; top: 20px; width: 320px; height: 160px; text-align: center; font: 700 140px/160px "JetBrains Mono", monospace; color: #3b37e6; opacity: 0; }}
    .cell {{ width: 56px; height: 56px; background: #fff; border-radius: 12px; text-align: center; }}
    .cell b {{ display: block; font: 700 28px/56px "JetBrains Mono", monospace; color: #3b37e6; opacity: 0; }}
    #g20 {{ left: 1150px; top: 790px; width: 76px; height: 64px; border-radius: 12px; border: 5px dashed #b8235a; background: #fbe0ea; color: #b8235a; text-align: center; font: 700 34px/54px "JetBrains Mono", monospace; }}
    .pill {{ height: 64px; line-height: 64px; padding: 0 28px; border-radius: 999px; font-size: 32px; white-space: nowrap; }}
    #p20 {{ left: 1150px; top: 694px; background: #1f7a5c; color: #fff; }}
    #pstop {{ left: 1256px; top: 790px; background: #fbe0ea; color: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; }}

    /* Ana's week */
    #h-ana .av {{ background: #3b37e6; }}
    .day {{ top: 290px; width: 76px; height: 130px; background: #fff; border-radius: 14px; text-align: center; }}
    .day span {{ display: block; margin-top: 14px; font-size: 28px; line-height: 36px; color: #3e3b52; }}
    .day b {{ display: block; margin-top: 10px; font: 700 52px/60px "JetBrains Mono", monospace; color: #3b37e6; opacity: 0; }}
    #g8 {{ left: 1738px; top: 290px; width: 76px; height: 130px; border-radius: 14px; border: 5px dashed #6f6b80; background: #fbf8f4; text-align: center; color: #6f6b80; font: 700 52px/120px "JetBrains Mono", monospace; }}
    #sunx {{ left: 1654px; top: 290px; width: 76px; height: 130px; border-radius: 14px; border: 5px dashed #b8235a; background: #fbe0ea; text-align: center; }}
    #sunx span {{ display: block; margin-top: 9px; font-size: 28px; line-height: 36px; color: #b8235a; }}
    #sunx b {{ display: block; margin-top: 10px; font: 700 52px/60px "JetBrains Mono", monospace; color: #b8235a; }}
    .tag {{ top: 452px; height: 52px; line-height: 52px; padding: 0 18px; border-radius: 999px; font-size: 28px; white-space: nowrap; }}
    #tstart {{ left: 1140px; background: #e6e3ff; color: #3b37e6; box-shadow: 0 0 0 4px #0e0c1d; }}
    #tstop {{ left: 1720px; background: #ece7df; color: #3e3b52; box-shadow: 0 0 0 4px #0e0c1d; }}
    #pshort {{ left: 1150px; top: 560px; background: #fbe0ea; color: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; }}
    #pobo {{ left: 1150px; top: 670px; background: #0e0c1d; color: #fff; }}
    #pobo b {{ color: #ffc24b; }}

    /* Chloe's countdown */
    #h-chl .av {{ background: #b8235a; }}
    #dial {{ left: 1302px; top: 270px; width: 380px; height: 380px; border-radius: 50%; background: #fff; }}
    #dial svg {{ position: absolute; left: 0; top: 0; width: 380px; height: 380px; }}
    #dlit {{ position: absolute; left: 0; top: 0; width: 380px; height: 380px; border-radius: 50%; background: #ddefe6; opacity: 0; }}
    .dval {{ position: absolute; left: 0; top: 100px; width: 380px; text-align: center; font: 700 150px/170px "JetBrains Mono", monospace; color: #b8235a; opacity: 0; }}
    #dmin {{ position: absolute; left: 0; top: 268px; width: 380px; text-align: center; font-size: 30px; color: #3e3b52; }}
    #g0 {{ left: 1150px; top: 724px; width: 76px; height: 76px; border-radius: 50%; border: 5px dashed #b8235a; background: #fbe0ea; color: #b8235a; text-align: center; font: 700 40px/66px "JetBrains Mono", monospace; }}
    #p0 {{ left: 1256px; top: 730px; background: #fbe0ea; color: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; }}
    #stamp {{ left: 1330px; top: 852px; height: 84px; line-height: 84px; padding: 0 36px; border-radius: 18px; background: #1f7a5c; color: #fff; font-size: 44px; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }}

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
    .dg {{ position: absolute; top: 88px; font: 500 38px/60px "JetBrains Mono", monospace; color: #ffc24b; opacity: 0; }}
    #s-div {{ position: absolute; left: 40px; top: 272px; width: 920px; height: 3px; background: #2e2a58; }}
    #s-outlbl {{ position: absolute; left: 40px; top: 280px; font: 800 28px/40px "Manrope", sans-serif; color: #c9c6ff; }}
    .s-out {{ position: absolute; font: 500 34px/48px "JetBrains Mono", monospace; color: #7cf0b5; white-space: pre; opacity: 0; }}
    #ox7 {{ position: absolute; left: 24px; top: 616px; width: 220px; height: 52px; border-radius: 12px; border: 4px dashed #ff6b8b; opacity: 0; }}

    #s-marks {{ left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }}
    #s-marks path {{ fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0; }}
    #s-cursor {{ left: 0; top: 0; width: 52px; height: 52px; }}
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="{STORY}" data-track-index="1">
      <div id="s-wrap">

        <!-- stage 1: the risotto and the stir counter -->
        <div id="h-rec" class="s-abs hdr s-ol"><div class="av">R</div><div class="tx">Risotto: stir <b id="rec20">20</b> times</div></div>
        <div id="tm" class="s-abs s-ol"><div class="lb">stir count</div><div class="lb2" id="tmr">range(20)</div>{timer}</div>
        {cells}
        <div id="p20" class="s-abs pill s-hide">= 20 stirs</div>
        <div id="g20" class="s-abs s-hide">20</div>
        <div id="pstop" class="s-abs pill s-hide">stop is not included</div>

        <!-- stage 2: Ana's week -->
        <div id="h-ana" class="s-abs hdr s-ol s-hide"><div class="av">A</div><div class="tx">Ana: days 1 to 7</div></div>
        {cal}
        <div id="g8" class="s-abs s-hide">8</div>
        <div id="sunx" class="s-abs s-hide"><span>Sun</span><b>7</b></div>
        <div id="tstart" class="s-abs tag s-hide">start</div>
        <div id="tstop" class="s-abs tag s-hide">stop</div>
        <div id="pshort" class="s-abs pill s-hide">Sunday is missing</div>
        <div id="pobo" class="s-abs pill s-hide">off by <b>one</b>: the classic</div>

        <!-- stage 3: Chloe's countdown -->
        <div id="h-chl" class="s-abs hdr s-ol s-hide"><div class="av">C</div><div class="tx">Chloe: dessert timer</div></div>
        <div id="dial" class="s-abs s-ol s-hide"><div id="dlit"></div><svg viewBox="0 0 380 380">{ticks}</svg>{dial}<div id="dmin">minutes left</div></div>
        <div id="g0" class="s-abs s-hide">0</div>
        <div id="p0" class="s-abs pill s-hide">0 never shows</div>
        <div id="stamp" class="s-abs s-hide">Dessert is out!</div>

        <!-- the code -->
        <div id="s-code" class="s-abs s-ol s-hide">
          <div id="s-bar"><i></i><i></i><i></i><span>kitchen.py</span></div>
          <div class="s-ln" id="LS1" style="top:88px"><span class="k">for</span> stir <span class="k">in</span> range(<span class="n">20</span>):</div>
          <div class="s-ln" id="LS2" style="top:148px">    <span class="k">print</span>(<span class="s">f"Stir {{stir}}"</span>)</div>
          <div class="s-ln" id="LA1" style="top:88px"><span class="k">for</span> day <span class="k">in</span> range(<span class="n">1</span>,  ):</div>
          <div class="dg" id="dg8" style="left:496px">8</div>
          <div class="dg" id="dg7" style="left:496px">7</div>
          <div class="s-ln" id="LA2" style="top:148px">    <span class="k">print</span>(<span class="s">f"Day {{day}}"</span>)</div>
          <div class="s-ln" id="LC1" style="top:88px"><span class="k">for</span> minute <span class="k">in</span> range(<span class="n">10</span>, <span class="n">0</span>, <span class="n">-1</span>):</div>
          <div class="s-ln" id="LC2" style="top:148px">    <span class="k">print</span>(minute)</div>
          <div id="s-div"></div>
          <div id="s-outlbl">output</div>
          {out_stir}
          {out_day}
          <div id="ox7"></div>
          {out_min}
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="r-rec" style="stroke:#3b37e6" />
          <path id="r-rng" style="stroke:#ffc24b" />
          <path id="r-stir" style="stroke:#ffc24b" />
          <path id="r-zero" style="stroke:#3b37e6" />
          <path id="r-g20" style="stroke:#b8235a" />
          <path id="r-c20" style="stroke:#ff6b8b" />
          <path id="r-a1" style="stroke:#ffc24b" />
          <path id="r-a8" style="stroke:#ffc24b" />
          <path id="r-sun" style="stroke:#b8235a" />
          <path id="r-cs" style="stroke:#ffc24b" />
          <path id="r-c10" style="stroke:#ffc24b" />
          <path id="r-c0" style="stroke:#ffc24b" />
          <path id="r-g0" style="stroke:#b8235a" />
        </svg>
        <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {{
      // Word start times from the narration (seconds). The voice starts 0.6 s into the film.
      const W = {W};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({{ paused: true }});

      // Rings in page pixels. Code text starts at x 136, 22.8 px per char. Row 1 centre y = 214.
      const ring = (id, cx, cy, rx, ry) => {{
        const d = `M${{cx - rx + 6}} ${{cy + 4}} C${{cx - rx + 2}} ${{cy - ry}} ${{cx + rx}} ${{cy - ry - 3}} ${{cx + rx}} ${{cy}} C${{cx + rx}} ${{cy + ry}} ${{cx - rx - 3}} ${{cy + ry + 3}} ${{cx - rx}} ${{cy - 8}}`;
        const p = document.getElementById(id); p.setAttribute("d", d);
        const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L;
      }};
      const col = (c) => 136 + c * 22.8;          // left edge of a code column
      ring("r-rec", 1591, 156, 50, 40);           // 20 on the recipe card
      ring("r-rng", (col(12) + col(21)) / 2, 214, 116, 38);  // range(20), cols 12-20
      ring("r-stir", (col(4) + col(8)) / 2, 214, 56, 36);    // stir, cols 4-7
      ring("r-zero", 1178, 548, 38, 38);          // cell 0
      ring("r-g20", 1188, 822, 62, 52);           // the dashed 20
      ring("r-c20", (col(18) + col(20)) / 2, 214, 36, 36);   // 20 in the code
      ring("r-a1", (col(17) + col(18)) / 2, 214, 26, 34);    // start 1
      ring("r-a8", (col(20) + col(21)) / 2, 214, 26, 34);    // stop 8 / 7
      ring("r-sun", 1692, 355, 50, 90);           // Sunday
      ring("r-cs", (col(27) + col(29)) / 2, 214, 40, 36);    // -1
      ring("r-c10", (col(20) + col(22)) / 2, 214, 38, 36);   // 10
      ring("r-c0", (col(24) + col(25)) / 2, 214, 26, 34);    // 0
      ring("r-g0", 1188, 762, 56, 56);            // the dashed 0

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
      // A number on a counter: the old one goes at once, the new one pops in.
      const tick = (prev, next, at) => {{
        if (prev) tl.set(prev, {{ opacity: 0 }}, at);
        tl.set(next, {{ opacity: 1 }}, at);
        tl.fromTo(next, {{ scale: 1.25 }}, {{ scale: 1, duration: 0.12, ease: "power2.out", immediateRender: false }}, at);
      }};

      /* ---- 1. The risotto recipe says, stir twenty times. Let Python count ---- */
      draw("r-rec", t(5), 0.4);
      out("#r-rec", t(13), 0.2);
      bump("#tm", t(16));

      /* ---- 2. For stir in range twenty. Range hands the loop one number at a time ---- */
      tl.fromTo("#s-code", {{ opacity: 0, y: 60 }}, {{ opacity: 1, y: 0, duration: 0.5, ease: "expo.out", immediateRender: false }}, t(19) - 0.3);
      type("#LS1", t(19), 22, 0.5);
      type("#LS2", t(23), 25, 0.4);
      draw("r-rng", t(22), 0.4);
      out("#r-rng", t(26), 0.2);
      for (let i = 0; i < 20; i++) pop(`#c${{i}}`, t(28) + i * 0.02, {{ from: 0.5, d: 0.3 }});
      draw("r-stir", t(28), 0.4);
      out("#r-stir", t(33), 0.2);

      /* ---- 3. Counting starts at zero. 0 to 19 is twenty stirs. 20 never shows ---- */
      const stirAt = [t(38), t(40), t(41)];
      const fast0 = t(42), fast1 = t(47) + 0.15;
      for (let i = 3; i < 20; i++) stirAt.push(fast0 + (i - 3) * (fast1 - fast0) / 16);
      stirAt.forEach((at, i) => {{
        tick(i ? `#tn${{i - 1}}` : null, `#tn${{i}}`, at);
        tl.to(`#c${{i}}`, {{ backgroundColor: "#e6e3ff", duration: 0.12 }}, at);
        tl.fromTo(`#cn${{i}}`, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.1, immediateRender: false }}, at);
        tl.fromTo(`#os${{i}}`, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.1, immediateRender: false }}, at);
      }});
      draw("r-zero", t(38), 0.35);
      out("#r-zero", t(42), 0.2);
      pop("#p20", t(50), {{ from: 0.5 }});
      pop("#g20", t(52), {{ from: 0.5 }});
      draw("r-g20", t(54), 0.4);
      draw("r-c20", t(58), 0.4);
      pop("#pstop", t(61), {{ from: 0.6 }});

      /* ---- 4. Ana: days 1 to 7. Start at 1, stop at 8. The week fills up ---- */
      const B4 = t(63) - 0.45;
      out(["#h-rec", "#tm", "#p20", "#g20", "#pstop", "#r-g20", "#r-c20", "#LS1", "#LS2"], B4, 0.3);
      for (let i = 0; i < 20; i++) {{ out(`#c${{i}}`, B4, 0.3); out(`#os${{i}}`, B4, 0.3); }}
      pop("#h-ana", t(63), {{ from: 0.8 }});
      for (let d = 1; d <= 7; d++) pop(`#d${{d}}`, t(68) + (d - 1) * 0.04, {{ from: 0.5, d: 0.35 }});
      type("#LA1", t(72), 23, 0.45);
      type("#LA2", t(73) + 0.2, 24, 0.4);
      pop("#dg8", t(78), {{ from: 0.4 }});
      draw("r-a1", t(75), 0.35);
      pop("#tstart", t(75), {{ from: 0.6 }});
      draw("r-a8", t(78), 0.35);
      pop("#g8", t(78), {{ from: 0.5 }});
      pop("#tstop", t(78) + 0.1, {{ from: 0.6 }});
      bump("#d1", t(81));
      bump("#g8", t(84));
      out(["#r-a1"], t(85), 0.2);
      for (let d = 1; d <= 7; d++) {{
        const at = t(86) + (d - 1) * (t(91) - t(86)) / 6;
        tl.to(`#d${{d}}`, {{ backgroundColor: "#e6e3ff", duration: 0.15 }}, at);
        pop(`#dn${{d}}`, at, {{ from: 0.4, d: 0.3 }});
        show(`#od${{d}}`, at, 0.15);
      }}

      /* ---- 5. Write stop at seven: Sunday goes missing. One day short ---- */
      out(["#r-a8", "#tstart"], t(92) - 0.2, 0.2);
      tl.fromTo("#s-cursor", {{ opacity: 0, x: 860, y: 640 }}, {{ opacity: 1, x: 520, y: 220, duration: 0.5, ease: "power3.out", immediateRender: false }}, t(92));
      tl.set("#dg8", {{ opacity: 0 }}, t(95));
      pop("#dg7", t(95), {{ from: 0.4, d: 0.3 }});
      tl.to("#s-cursor", {{ opacity: 0, duration: 0.25 }}, t(96));
      out(["#g8", "#d7"], t(97) - 0.1, 0.2);
      show("#sunx", t(97), 0.25);
      tl.to("#tstop", {{ x: -84, duration: 0.4, ease: "power2.inOut" }}, t(97));
      out("#od7", t(97), 0.2);
      show("#ox7", t(97), 0.2);
      draw("r-sun", t(99), 0.45);
      pop("#pshort", t(100), {{ from: 0.6 }});
      pop("#pobo", t(106), {{ from: 0.6 }});

      /* ---- 6. Chloe: a third number is the step. 10 down to 1. Never 0 ---- */
      const B6 = t(112) - 0.45;
      out(["#h-ana", "#sunx", "#tstop", "#pshort", "#pobo", "#r-sun", "#ox7", "#LA1", "#LA2", "#dg7"], B6, 0.3);
      for (let d = 1; d <= 7; d++) {{ out(`#d${{d}}`, B6, 0.3); out(`#od${{d}}`, B6, 0.3); }}
      pop("#h-chl", t(112), {{ from: 0.8 }});
      pop("#dial", t(116), {{ from: 0.6 }});
      type("#LC1", t(117), 31, 0.55);
      type("#LC2", t(119), 17, 0.3);
      draw("r-cs", t(122), 0.4);
      out("#r-cs", t(124), 0.2);
      draw("r-c10", t(125), 0.35);
      draw("r-c0", t(128), 0.35);
      draw("r-cs", t(129), 0.35);
      out(["#r-c10", "#r-c0", "#r-cs"], t(133), 0.2);
      const minAt = [t(134), t(135), t(136)];
      for (let k = 0; k < 7; k++) minAt.push(t(137) + k * (t(141) - t(137)) / 6);
      minAt.forEach((at, k) => {{
        const m = 10 - k;
        tick(k ? `#dv${{m + 1}}` : null, `#dv${{m}}`, at);
        tl.fromTo(`#om${{m}}`, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.1, immediateRender: false }}, at);
      }});
      pop("#g0", t(142), {{ from: 0.5 }});
      draw("r-g0", t(143), 0.4);
      pop("#p0", t(143), {{ from: 0.6 }});
      show("#dlit", t(145), 0.3);
      tl.set("#dv1", {{ color: "#1f7a5c" }}, t(145));
      tl.fromTo("#stamp", {{ opacity: 0, scale: 1.6, rotation: -8 }}, {{ opacity: 1, scale: 1, rotation: -4, duration: 0.4, ease: "back.out(2)", immediateRender: false }}, t(145));

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", {{ opacity: 0, duration: 0.25, ease: "power2.in" }}, {STORY} - 0.3);

      window.__timelines = window.__timelines || {{}};
      window.__timelines["story"] = tl;
    }})();
  </script>
</template>
'''
pathlib.Path(__file__).with_name('compositions').joinpath('story.html').write_text(html, encoding='utf-8')
print('wrote story.html')
