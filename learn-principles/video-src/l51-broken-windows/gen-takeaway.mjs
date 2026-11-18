// Generates compositions/takeaway.html. Run: node gen-takeaway.mjs
import { writeFileSync, readFileSync } from "node:fs";
const W = JSON.parse(readFileSync(new URL("./assets/voice/words.json", import.meta.url))).map((w) => w.start);
const S = 55.35;
const g = (i) => +(W[i] + 0.6 - S).toFixed(3); // scene-local time of word i
const mini = (id, reds) => {
  let s = "";
  for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) {
    const red = reds.some(([a, b]) => a === r && b === c);
    s += `<i style="left:${60 + c * 76}px;top:${34 + r * 60}px;background:${red ? "#ff6b8b" : "#4bd69b"}"${red && r === 3 && c === 2 ? ` id="${id}-new"` : ""}></i>`;
  }
  return s;
};
const face = readFileSync(new URL("./gen-story.mjs", import.meta.url), "utf8").match(/const face = `([\s\S]*?)`;/)[1];
const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    #t-all { position: absolute; inset: 0; }
    .t-abs { position: absolute; }
    .t-head { left: 110px; font: 700 80px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .t-head span { display: inline-block; opacity: 0; }
    #t-h1 { top: 64px; }
    #t-h2 { top: 162px; }
    #t-h2 .ac { color: #3b37e6; }
    .t-board { top: 300px; width: 680px; height: 420px; background: #15132b; border-radius: 24px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; opacity: 0; }
    .t-board > i { position: absolute; width: 46px; height: 46px; border-radius: 50%; box-shadow: 0 0 0 4px #0b0a18; }
    #t-bA { left: 110px; }
    #t-bB { left: 1130px; }
    .t-lab { top: 752px; width: 680px; text-align: center; font-size: 40px; line-height: 1.3; white-space: nowrap; opacity: 0; }
    #t-lA { left: 110px; color: #b8235a; }
    #t-lB { left: 1130px; color: #1f7a5c; }
    #t-face { left: 860px; top: 400px; width: 200px; height: 208px; opacity: 0; }
    #t-same { left: 820px; top: 630px; width: 280px; text-align: center; font-size: 34px; line-height: 1.25; opacity: 0; }
    #t-rule { left: 110px; top: 880px; padding: 10px 34px; background: #b8235a; color: #fff; border-radius: 999px; font-size: 44px; line-height: 1.4; white-space: nowrap; box-shadow: 0 0 0 5px #0e0c1d, 0 8px 0 5px #0e0c1d; opacity: 0; }
    #t-next { left: 1130px; top: 892px; padding: 8px 30px; background: #0e0c1d; color: #fff; border-radius: 999px; font-size: 34px; line-height: 1.4; white-space: nowrap; opacity: 0; }
    #t-next b { color: #c9c6ff; }
  </style>

  <div id="root" data-composition-id="takeaway" data-width="1920" data-height="1080">
    <div id="t-all" class="clip" data-start="0" data-duration="13.15" data-track-index="1">
      <div id="t-h1" class="t-abs t-head"><span>Mess</span> <span>does</span> <span>not</span> <span>come</span> <span>from</span> <span>bad</span> <span>people.</span></div>
      <div id="t-h2" class="t-abs t-head"><span>It</span> <span>comes</span> <span>from</span> <span class="ac">what</span> <span class="ac">looks</span> <span class="ac">normal.</span></div>
      <div id="t-bA" class="t-abs t-board">${mini("t-a", [[0, 1], [1, 5], [2, 7], [3, 2], [4, 0], [4, 5], [5, 3]])}</div>
      <div id="t-bB" class="t-abs t-board">${mini("t-b", [[3, 2]])}</div>
      <div id="t-lA" class="t-abs t-lab">&ldquo;Red is normal here.&rdquo;</div>
      <div id="t-lB" class="t-abs t-lab">&ldquo;Red is an emergency here.&rdquo;</div>
      <svg id="t-face" class="t-abs" viewBox="86 36 228 236">${face}</svg>
      <div id="t-same" class="t-abs">same Priya</div>
      <div id="t-rule" class="t-abs">Don't live with broken windows.</div>
      <div id="t-next" class="t-abs">Next <b>→</b> Lesson 52: Review: bigger structure</div>
    </div>
  </div>

  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#t-face", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, ${g(139)});
      tl.fromTo("#t-same", { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${g(140)});
      tl.fromTo("#t-bA", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, ${g(141)});
      tl.fromTo("#t-bB", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, ${g(141)} + 0.35);
      tl.fromTo("#t-lA", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, ${g(142)} + 0.2);
      tl.fromTo("#t-lB", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, ${g(142)} + 0.5);
      tl.fromTo("#t-b-new", { scale: 1 }, { scale: 1.35, duration: 0.2, yoyo: true, repeat: 3, ease: "power2.out" }, ${g(142)} + 0.6);
      const w1 = gsap.utils.toArray("#t-h1 span"), w2 = gsap.utils.toArray("#t-h2 span");
      ${JSON.stringify([143, 144, 145, 146, 147, 148, 149].map(g))}.forEach((at, i) => tl.fromTo(w1[i], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, at - 0.05));
      ${JSON.stringify([150, 151, 152, 153, 154, 155].map(g))}.forEach((at, i) => tl.fromTo(w2[i], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, at - 0.05));
      tl.fromTo("#t-rule", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, ${g(157)} - 0.1);
      tl.fromTo("#t-next", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, ${g(161)} + 0.8);
      window.__timelines = window.__timelines || {};
      window.__timelines["takeaway"] = tl;
    })();
  </script>
</template>
`;
writeFileSync(new URL("./compositions/takeaway.html", import.meta.url), html);
console.log("takeaway.html written");
