// Builds compositions/story.html for lesson 49 (Testing pyramid). Run: node gen-story.mjs
import { writeFileSync } from "node:fs";

const W = [0.0, 0.43, 0.813, 1.567, 1.916, 2.101, 2.485, 2.868, 2.995, 3.286, 3.506, 4.447, 4.83, 4.934, 5.596, 6.223, 6.536, 6.653, 7.546, 8.208, 8.51, 8.649, 9.509, 9.694, 9.892, 10.054, 10.205, 10.495, 10.704, 11.633, 12.005, 12.214, 12.574, 12.922, 13.142, 13.27, 13.56, 13.746, 13.99, 14.884, 15.441, 15.79, 15.94, 16.266, 16.498, 17.311, 17.485, 17.914, 18.123, 19.389, 19.575, 19.691, 19.981, 20.457, 20.654, 20.886, 21.107, 21.374, 21.525, 22.117, 23.371, 23.638, 23.812, 23.905, 24.242, 25.043, 25.205, 25.554, 25.681, 25.786, 26.134, 26.401, 26.552, 27.469, 27.655, 27.957, 28.189, 28.758, 29.002, 29.397, 29.582, 30.65, 30.801, 31.324, 31.533, 31.939, 32.125, 32.299, 32.415, 33.611, 33.947, 34.377, 34.911, 35.468, 36.269, 36.502, 36.769, 37.5, 37.906, 38.243, 38.452, 38.847, 39.16, 39.52, 40.426, 40.658, 40.913, 41.192, 41.378, 41.622, 41.726, 42.109, 42.249, 42.434, 42.539, 43.061, 43.978, 44.211, 44.408, 45.337, 45.639, 45.987, 46.196, 46.602, 47.601, 47.891, 48.297, 48.657, 49.11, 49.691, 49.888, 50.132, 50.236, 51.339, 51.583, 51.99, 52.141, 52.733, 53.719, 53.987, 54.126, 54.265, 54.811, 55.635, 55.972, 56.564, 56.97, 57.713, 57.957, 58.038, 58.143, 58.874, 59.118, 59.374, 59.49, 59.884, 60.291, 60.778];
const DUR = 54.1;

const tick = (c, w) => `<svg viewBox="0 0 24 24"><path d="M5 13 L10 18 L19 7" fill="none" stroke="${c || "#fff"}" stroke-width="${w || 4}" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
const cross = `<svg viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" /></svg>`;
const slowClock = `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="#fff" stroke="#0e0c1d" stroke-width="5" /><path d="M30 14 V30 L42 37" fill="none" stroke="#0e0c1d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
const stopwatch = `<svg viewBox="0 0 44 48"><rect x="17" y="1" width="10" height="7" rx="2" fill="#0e0c1d" /><circle cx="22" cy="28" r="17" fill="#fff" stroke="#0e0c1d" stroke-width="4" /><path d="M22 28 V17" stroke="#0e0c1d" stroke-width="4" stroke-linecap="round" /></svg>`;
const linkIcon = `<svg viewBox="0 0 84 40"><path d="M30 20 H54" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" /><rect x="4" y="5" width="30" height="30" rx="7" fill="#fff" stroke="#0e0c1d" stroke-width="5" /><rect x="50" y="5" width="30" height="30" rx="7" fill="#fff" stroke="#0e0c1d" stroke-width="5" /></svg>`;
const cookieIcon = `<svg viewBox="0 0 120 84"><circle cx="46" cy="42" r="34" fill="#e2ad6b" stroke="#0e0c1d" stroke-width="5" /><g fill="#5a3418"><circle cx="34" cy="32" r="5" /><circle cx="56" cy="38" r="5" /><circle cx="40" cy="56" r="5" /><circle cx="58" cy="58" r="4" /></g><path d="M78 34 L78 76 L89 66 L97 84 L106 80 L98 62 L113 62 Z" fill="#fff" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" /></svg>`;
const bugSvg = `<svg viewBox="0 0 72 72"><g stroke="#0e0c1d" stroke-width="5" stroke-linecap="round" fill="none"><path d="M20 26 L6 18 M18 38 L4 38 M20 50 L6 58 M52 26 L66 18 M54 38 L68 38 M52 50 L66 58 M30 14 L24 4 M42 14 L48 4" /></g><ellipse cx="36" cy="40" rx="19" ry="23" fill="#b8235a" stroke="#0e0c1d" stroke-width="5" /><circle cx="36" cy="17" r="10" fill="#0e0c1d" /><path d="M36 22 V62" stroke="#0e0c1d" stroke-width="4" /><circle cx="28" cy="36" r="4" fill="#0e0c1d" /><circle cx="44" cy="46" r="4" fill="#0e0c1d" /></svg>`;
const ring = (id, cx, cy, rx, ry, col) => {
  const x0 = cx - rx, x1 = cx + rx, k = ry * 1.33;
  return `<path id="${id}" class="s-ring"${col ? ` style="stroke:${col}"` : ""} d="M${x0} ${cy + 2} C${x0 - 2} ${cy - k} ${x1} ${cy - k - 2} ${x1} ${cy} C${x1} ${cy + k} ${x0 - 6} ${cy + k + 2} ${x0 - 4} ${cy - 8}" />`;
};

/* ---------- scene A: the grid of 20 places ---------- */
const GX = 1290 + 32, GY = 96 + 116, TS = 104, TP = 122;
let tiles = "";
for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
  const i = r * 4 + c, w = [56, 40, 64, 48, 36][(i * 3 + r) % 5], w2 = [38, 60, 30, 52][(i + c) % 4];
  tiles += `<div class="s-tile" id="s-t${i}" style="left:${32 + c * TP}px;top:${116 + r * TP}px"><span style="top:26px;width:${w}px;background:#c9c6ff"></span><span style="top:48px;left:30px;width:${w2}px;background:#7cf0b5"></span><span style="top:70px;width:${Math.round((w + w2) / 2)}px;background:#ffc24b"></span><b>?</b></div>`;
}
const tileC = (r, c) => [GX + c * TP + TS / 2, GY + r * TP + TS / 2];

/* ---------- scene C: the pyramid ---------- */
const CX = 620, TINY = 58, PITCH = 66;
const rows = [[15, 732], [13, 666], [12, 600]];
let tinyHtml = "", n = 0;
const tinyPos = [];
rows.forEach(([cnt, y]) => {
  const x0 = CX - (cnt * TINY + (cnt - 1) * 8) / 2;
  for (let i = 0; i < cnt; i++) {
    tinyPos.push([x0 + i * PITCH, y]);
    tinyHtml += `<div class="s-tiny" id="s-u${n}" style="left:${x0 + i * PITCH}px;top:${y}px">${tick("#fff", 4)}</div>`;
    n++;
  }
});
const RED = 11; // bottom row, 12th block
const [redX, redY] = tinyPos[RED];
let midHtml = "";
for (let i = 0; i < 6; i++) midHtml += `<div class="s-mid" id="s-m${i}" style="left:${CX - 378 + i * 128}px;top:496px">${linkIcon}<i class="s-okb">${tick()}</i></div>`;
let topHtml = "";
for (let i = 0; i < 2; i++) topHtml += `<div class="s-top" id="s-e${i}" style="left:${CX - 217 + i * 224}px;top:348px">${cookieIcon}<i class="s-okb">${tick()}</i></div>`;

const label = (id, top, count, col, caps, text, chip) => `<div class="s-lab s-hide" id="${id}" style="top:${top}px"><b style="color:${col}">${count}</b><div><small style="color:${col}">${caps}</small><span>${text}</span></div><em class="s-hide">${stopwatch}${chip}</em></div>`;

let dots = "";
[1, 1, 1, 0, 1, 0, 0, 0].forEach((ok, i) => { dots += `<i class="s-dot ${ok ? "y" : "n"}" style="left:${i * 64}px">${ok ? tick() : '<svg viewBox="0 0 24 24"><path d="M7 12 H17" stroke="#3e3b52" stroke-width="4" stroke-linecap="round" /></svg>'}</i>`; });
let reruns = "";
for (let i = 0; i < 20; i++) reruns += `<i class="s-re" style="left:${i * 70}px">${tick()}</i>`;

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #s-B, #s-C, #s-l1, #s-l2 { opacity: 0; }
    #s-all, #s-wrap, #s-A, #s-B, #s-C, #s-cone { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; }
    .s-abs { position: absolute; }
    .s-ol { box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-ol4 { box-shadow: 0 0 0 4px #0e0c1d, 0 7px 0 4px #0e0c1d; }
    .s-hide { opacity: 0; }
    .s-mono { font-family: "JetBrains Mono", monospace; font-weight: 700; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-h { font: 700 50px/1.15 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-pill { padding: 0 22px; height: 52px; line-height: 52px; border-radius: 999px; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }

    /* ---- A: testing by hand ---- */
    #s-list { left: 96px; top: 96px; width: 590px; height: 888px; background: #fff; border-radius: 28px; }
    #s-head { left: 32px; top: 22px; }
    #s-maya { left: 30px; top: 96px; width: 88px; height: 104px; }
    #s-pm { left: 124px; top: 122px; background: #3b37e6; color: #fff; }
    #s-ps { left: 248px; top: 122px; background: #e6e3ff; }
    #s-ph { left: 368px; top: 122px; background: #fbebd2; color: #8a5510; }
    .s-row { position: absolute; left: 32px; width: 526px; height: 72px; display: flex; align-items: center; gap: 20px; font-size: 32px; white-space: nowrap; }
    .s-row > i { position: relative; width: 48px; height: 48px; flex: none; border-radius: 10px; background: #fff; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-row > i > svg { position: absolute; left: 2px; top: 2px; width: 44px; height: 44px; opacity: 0; }
    #s-ghost { top: 500px; height: 76px; left: 26px; width: 538px; padding-left: 6px; border-radius: 16px; outline: 4px dashed #b8235a; outline-offset: 0; color: #3e3b52; }
    #s-ghost > i { box-shadow: 0 0 0 4px #6f6b80; }
    #s-never { right: -8px; top: -30px; background: #fbe0ea; color: #b8235a; }
    #s-time { left: 32px; top: 606px; width: 526px; height: 250px; }
    #s-clock { left: 0; top: 0; width: 150px; height: 150px; }
    #s-25 { left: 176px; top: 2px; font: 700 88px/1.1 "Fraunces", serif; letter-spacing: -0.03em; white-space: nowrap; }
    #s-25s { left: 180px; top: 100px; font-size: 30px; color: #3e3b52; white-space: nowrap; }
    #s-dlab { left: 0; top: 172px; font-size: 28px; color: #3e3b52; white-space: nowrap; }
    #s-dots { left: 0; top: 216px; width: 526px; height: 48px; }
    .s-dot { position: absolute; top: 0; width: 48px; height: 48px; border-radius: 50%; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-dot.y { background: #1f7a5c; }
    .s-dot.n { background: #ece7df; }
    .s-dot > svg { position: absolute; left: 6px; top: 6px; width: 36px; height: 36px; }
    #s-wed { left: 32px; top: 612px; width: 526px; height: 240px; background: #fbf8f4; border-radius: 20px; }
    #s-wed small { position: absolute; left: 26px; top: 16px; font-size: 28px; letter-spacing: 0.06em; color: #3e3b52; white-space: nowrap; }
    .s-wr { position: absolute; left: 26px; width: 474px; height: 70px; display: flex; align-items: center; justify-content: space-between; font-size: 32px; }
    .s-wr b { font: 700 52px/1 "JetBrains Mono", monospace; }
    #s-wrong { right: -22px; top: -30px; padding: 4px 18px; background: #b8235a; color: #fff; font-size: 32px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; }

    .s-big { position: absolute; width: 200px; height: 150px; background: #fff; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-size: 32px; opacity: 0; }
    .s-big > svg { width: 62px; height: 62px; }
    .s-big > i { position: absolute; right: -20px; top: -20px; width: 56px; height: 56px; border-radius: 50%; background: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-big > i > svg { position: absolute; left: 8px; top: 8px; width: 40px; height: 40px; }
    #s-pivot { left: 940px; top: 660px; width: 80px; height: 46px; }
    #s-ground { left: 800px; top: 706px; width: 360px; height: 7px; border-radius: 4px; background: #0e0c1d; }
    #s-cap { left: 760px; top: 744px; width: 440px; text-align: center; font-size: 32px; line-height: 1.3; color: #3e3b52; }
    #s-capt { left: 760px; top: 214px; width: 440px; text-align: center; }

    #s-grid { left: 1290px; top: 96px; width: 534px; height: 888px; background: #fbf8f4; border-radius: 28px; }
    #s-gh { left: 32px; top: 26px; }
    .s-tile { position: absolute; width: 104px; height: 104px; border-radius: 16px; background: #15132b; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-tile > span { position: absolute; left: 16px; height: 12px; border-radius: 6px; }
    .s-tile > b { position: absolute; left: 0; top: 0; width: 104px; height: 104px; border-radius: 16px; background: #fbe0ea; color: #b8235a; font: 700 72px/104px "Fraunces", serif; text-align: center; opacity: 0; }
    #s-20 { left: 32px; top: 744px; font: 700 76px/1.1 "Fraunces", serif; letter-spacing: -0.03em; color: #b8235a; white-space: nowrap; }
    #s-which { left: 36px; top: 836px; font-size: 36px; color: #3e3b52; white-space: nowrap; }
    #s-btag { left: 1330px; top: 372px; background: #fff; }
    #s-spot { left: 0; top: 0; width: 136px; height: 136px; border-radius: 50%; box-shadow: 0 0 0 9px #ff6b8b; }
    .s-bug { position: absolute; left: 0; top: 0; width: 76px; height: 76px; opacity: 0; }
    #s-cursor { left: 0; top: 0; width: 48px; height: 48px; }

    /* ---- B: what a test is ---- */
    #s-bh { left: 96px; top: 70px; font: 700 68px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-code { left: 96px; top: 190px; width: 1060px; height: 290px; background: #15132b; border-radius: 24px; color: #fff; }
    .s-bar { position: absolute; left: 0; top: 0; width: 100%; height: 64px; background: #211e40; border-radius: 24px 24px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 26px; gap: 10px; }
    .s-bar > i { width: 16px; height: 16px; border-radius: 50%; background: #ff6b8b; }
    .s-bar > i:nth-child(2) { background: #ffc24b; }
    .s-bar > i:nth-child(3) { background: #4bd69b; }
    .s-bar > span { margin-left: 14px; font: 700 28px "JetBrains Mono", monospace; color: #a9a5d6; }
    #s-lines { left: 40px; top: 96px; width: 1000px; font: 500 36px/70px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
    .s-ln { height: 70px; white-space: pre; }
    .kw { color: #c9c6ff; }
    .fn { color: #7cf0b5; }
    .nu { color: #ffc24b; }
    #s-wire { left: 1156px; top: 332px; width: 64px; height: 6px; background: #0e0c1d; }
    #s-res { left: 1220px; top: 190px; width: 604px; height: 290px; background: #fff; border-radius: 24px; }
    .s-rr { position: absolute; left: 36px; width: 532px; height: 84px; display: flex; align-items: center; justify-content: space-between; font-size: 34px; color: #3e3b52; opacity: 0; }
    .s-rr b { font: 700 58px/1 "JetBrains Mono", monospace; color: #0e0c1d; }
    #s-eq { left: 36px; top: 196px; width: 532px; height: 66px; border-radius: 16px; background: #ddefe6; color: #1f7a5c; font-size: 34px; line-height: 66px; text-align: center; white-space: nowrap; }
    #s-pass { right: -22px; top: -30px; padding: 4px 20px; background: #1f7a5c; color: #fff; font-size: 34px; letter-spacing: 0.08em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-again { left: 96px; top: 566px; }
    #s-res2 { left: 96px; top: 652px; width: 1400px; height: 56px; }
    .s-re { position: absolute; top: 0; width: 56px; height: 56px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-re > svg { position: absolute; left: 8px; top: 8px; width: 40px; height: 40px; }
    #s-ms { left: 96px; top: 760px; display: flex; align-items: center; gap: 14px; padding: 8px 28px 8px 20px; background: #fff; border-radius: 999px; font: 700 46px/1.2 "Fraunces", serif; white-space: nowrap; }
    #s-ms > svg { width: 50px; height: 54px; }

    /* ---- C: the pyramid ---- */
    #s-ch { left: 129px; top: 112px; font: 700 68px/1.1 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    .s-tiny { position: absolute; width: 58px; height: 58px; border-radius: 12px; background: #ddefe6; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-tiny > svg { position: absolute; left: 9px; top: 9px; width: 40px; height: 40px; opacity: 0; }
    .s-mid { position: absolute; width: 116px; height: 92px; border-radius: 16px; background: #fbebd2; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-mid > svg { position: absolute; left: 16px; top: 26px; width: 84px; height: 40px; }
    .s-top { position: absolute; width: 210px; height: 136px; border-radius: 20px; background: #e6e3ff; box-shadow: 0 0 0 5px #0e0c1d; opacity: 0; }
    .s-top > svg { position: absolute; left: 45px; top: 26px; width: 120px; height: 84px; }
    .s-okb { position: absolute; right: -14px; top: -14px; width: 44px; height: 44px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; opacity: 0; }
    .s-okb > svg { position: absolute; left: 6px; top: 6px; width: 32px; height: 32px; }
    #s-redx { left: ${redX}px; top: ${redY}px; width: 58px; height: 58px; border-radius: 12px; background: #b8235a; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-redx > svg { position: absolute; left: 9px; top: 9px; width: 40px; height: 40px; }
    .s-lab { position: absolute; left: 1190px; width: 634px; height: 112px; }
    .s-lab > b { position: absolute; left: 0; top: 0; width: 118px; text-align: right; font: 700 92px/112px "Fraunces", serif; letter-spacing: -0.03em; }
    .s-lab > div { position: absolute; left: 142px; top: 8px; }
    .s-lab small { display: block; font-size: 28px; letter-spacing: 0.06em; line-height: 1.3; white-space: nowrap; }
    .s-lab span { display: block; font-size: 36px; line-height: 1.35; white-space: nowrap; }
    .s-lab > em { position: absolute; right: 0; top: 2px; display: flex; align-items: center; gap: 8px; padding: 0 18px 0 12px; height: 50px; border-radius: 999px; background: #fff; font-style: normal; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-lab > em > svg { width: 30px; height: 34px; }
    .s-conn { position: absolute; height: 5px; background: #0e0c1d; border-radius: 3px; opacity: 0; }
    #s-fn { left: 1190px; top: 470px; width: 634px; height: 232px; background: #15132b; border-radius: 24px; color: #fff; }
    #s-fl { left: 36px; top: 90px; font: 500 30px/56px "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: pre; }
    #s-fl .dim { color: #a9a5d6; }
    #s-tag { left: 700px; top: 836px; height: 66px; padding: 0 26px 0 14px; display: flex; align-items: center; gap: 14px; background: #fff; border-radius: 16px; font-size: 32px; white-space: nowrap; box-shadow: 0 0 0 5px #b8235a, 0 8px 0 5px #0e0c1d; }
    #s-tag > i { position: relative; width: 42px; height: 42px; border-radius: 50%; background: #b8235a; flex: none; }
    #s-tag > i > svg { position: absolute; left: 5px; top: 5px; width: 32px; height: 32px; }
    #s-stem { left: ${redX + 27}px; top: ${redY + 64}px; width: 5px; height: ${836 - redY - 64 - 5}px; background: #b8235a; }
    #s-sec { left: 486px; top: 844px; display: flex; align-items: center; gap: 10px; padding: 0 20px 0 14px; height: 52px; border-radius: 999px; background: #ddefe6; font-size: 30px; white-space: nowrap; box-shadow: 0 0 0 4px #0e0c1d; }
    #s-sec > svg { width: 30px; height: 34px; }

    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-marks path, #s-marks polygon { opacity: 0; }
    .s-ring { fill: none; stroke: #ff6b8b; stroke-width: 6; stroke-linecap: round; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1">
      <div id="s-wrap">

        <!-- A: testing by hand -->
        <div id="s-A">
          <div id="s-list" class="s-abs s-ol">
            <div id="s-head" class="s-abs s-h s-hide">Before every update</div>
            <svg id="s-maya" class="s-abs" viewBox="88 0 224 264">
              <circle cx="200" cy="44" r="42" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
              <circle cx="200" cy="150" r="104" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" />
              <circle cx="200" cy="162" r="84" fill="#f2c9a5" stroke="#0e0c1d" stroke-width="6" />
              <path d="M117 150 Q146 66 226 78 Q280 88 284 152 Q240 112 190 120 Q150 124 117 150 Z" fill="#2a2140" stroke="#0e0c1d" stroke-width="6" stroke-linejoin="round" />
              <circle cx="150" cy="198" r="13" fill="#f5a8a0" />
              <circle cx="250" cy="198" r="13" fill="#f5a8a0" />
              <circle cx="170" cy="172" r="8" fill="#0e0c1d" />
              <circle cx="230" cy="172" r="8" fill="#0e0c1d" />
              <path d="M172 202 Q200 228 228 202" fill="none" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
            </svg>
            <div id="s-pm" class="s-abs s-pill s-hide">Maya</div>
            <div id="s-ps" class="s-abs s-pill s-hide">Sam</div>
            <div id="s-ph" class="s-abs s-pill s-hide">test by hand</div>
            <div class="s-row s-hide" id="s-r1" style="top:236px"><i>${tick("#1f7a5c", 4)}</i>Order a cookie</div>
            <div class="s-row s-hide" id="s-r2" style="top:324px"><i>${tick("#1f7a5c", 4)}</i>Pay with the test card</div>
            <div class="s-row s-hide" id="s-r3" style="top:412px"><i>${tick("#1f7a5c", 4)}</i>Check the receipt</div>
            <div class="s-row s-hide" id="s-ghost"><i></i>Order $100 of cookies<div id="s-never" class="s-abs s-pill s-hide">never clicked</div></div>
            <div id="s-time" class="s-abs">
              <svg id="s-clock" class="s-abs s-hide" viewBox="0 0 150 150">
                <circle cx="75" cy="83" r="60" fill="#0e0c1d" />
                <circle cx="75" cy="75" r="60" fill="#fff" stroke="#0e0c1d" stroke-width="6" />
                <path d="M75 25 V35 M75 115 V125 M25 75 H35 M115 75 H125" stroke="#0e0c1d" stroke-width="6" stroke-linecap="round" />
                <path id="s-hand" d="M75 75 V36" stroke="#b8235a" stroke-width="8" stroke-linecap="round" />
                <circle cx="75" cy="75" r="8" fill="#0e0c1d" />
              </svg>
              <div id="s-25" class="s-abs s-hide">25 min</div>
              <div id="s-25s" class="s-abs s-hide">of clicking, every time</div>
              <div id="s-dlab" class="s-abs s-hide">Tested before the update?</div>
              <div id="s-dots" class="s-abs">${dots}</div>
            </div>
            <div id="s-wed" class="s-abs s-ol4 s-hide">
              <small>WEDDING ORDER, $100</small>
              <div class="s-wr" style="top:66px"><span>charged</span><b style="color:#b8235a">$98.10</b></div>
              <div class="s-wr s-hide" id="s-should" style="top:146px"><span>should be</span><b style="color:#1f7a5c">$87.20</b></div>
              <div id="s-wrong" class="s-abs s-hide">WRONG</div>
            </div>
          </div>

          <div id="s-capt" class="s-abs s-h s-hide">Every check is big</div>
          <div id="s-cone">
            <div class="s-big s-ol4" id="s-b1" style="left:880px;top:500px">${slowClock}order<i>${cross}</i></div>
            <div class="s-big s-ol4" id="s-b2" style="left:773px;top:336px">${slowClock}pay<i>${cross}</i></div>
            <div class="s-big s-ol4" id="s-b3" style="left:987px;top:336px">${slowClock}receipt<i>${cross}</i></div>
          </div>
          <svg id="s-pivot" class="s-abs s-hide" viewBox="0 0 80 46"><path d="M40 2 L76 44 H4 Z" fill="#0e0c1d" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
          <div id="s-ground" class="s-abs s-hide"></div>
          <div id="s-cap" class="s-abs s-hide">Slow. Top-heavy.<br />Easy to skip.</div>

          <div id="s-grid" class="s-abs s-ol s-hide">
            <div id="s-gh" class="s-abs s-h">The shop's code</div>
            ${tiles}
            <div id="s-20" class="s-abs s-hide">20 places</div>
            <div id="s-which" class="s-abs s-hide">Which one is wrong?</div>
          </div>
          <div id="s-btag" class="s-abs s-pill s-hide">rule for big orders</div>
          <div id="s-spot" class="s-abs s-hide"></div>
          <div class="s-bug" id="s-bug1">${bugSvg}</div>
          <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
        </div>

        <!-- B: what a test is -->
        <div id="s-B">
          <div id="s-bh" class="s-abs s-hide">A test</div>
          <div id="s-code" class="s-abs s-ol s-hide">
            <div class="s-bar"><i></i><i></i><i></i><span>test_order.py</span></div>
            <div id="s-lines" class="s-abs">
              <div class="s-ln" id="s-l1"><span class="kw">def</span> <span class="fn">test_small_order</span>():</div>
              <div class="s-ln" id="s-l2">    <span class="kw">assert</span> final_total(10) == <span class="nu">10.90</span></div>
            </div>
          </div>
          <div id="s-wire" class="s-abs s-hide"></div>
          <div id="s-res" class="s-abs s-ol s-hide">
            <div class="s-rr" id="s-ans" style="top:22px"><span>the answer</span><b>10.90</b></div>
            <div class="s-rr" id="s-exp" style="top:106px"><span>expected</span><b>10.90</b></div>
            <div id="s-eq" class="s-abs s-hide">the same: test passes</div>
            <div id="s-pass" class="s-abs s-hide">PASS</div>
          </div>
          <div id="s-again" class="s-abs s-h s-hide">Run it again. And again.</div>
          <div id="s-res2" class="s-abs">${reruns}</div>
          <div id="s-ms" class="s-abs s-ol4 s-hide">${stopwatch}a few milliseconds each time</div>
        </div>

        <!-- C: the pyramid -->
        <div id="s-C">
          <div id="s-ch" class="s-abs s-hide">Maya's tests</div>
          ${tinyHtml}
          <div id="s-redx" class="s-abs s-hide">${cross}</div>
          ${midHtml}
          ${topHtml}
          <div class="s-conn" id="s-c1" style="left:1065px;top:697px;width:105px"></div>
          <div class="s-conn" id="s-c2" style="left:1012px;top:540px;width:158px"></div>
          <div class="s-conn" id="s-c3" style="left:872px;top:414px;width:298px"></div>
          ${label("s-la1", 642, "40", "#1f7a5c", "TINY TESTS", "one rule each", "under 1 s")}
          ${label("s-la2", 486, "6", "#b9741a", "MIDDLE TESTS", "real parts, together", "10 s")}
          ${label("s-la3", 358, "2", "#3b37e6", "BIG TESTS", "buy a cookie", "2 min")}
          <div id="s-fn" class="s-abs s-ol s-hide">
            <div class="s-bar"><i></i><i></i><i></i><span>rules/order.py</span></div>
            <div id="s-fl" class="s-abs"><span class="kw">def</span> <span class="fn">final_total</span>(price):
<span class="dim">    ...</span></div>
          </div>
          <div class="s-bug" id="s-bug2">${bugSvg}</div>
          <div id="s-stem" class="s-abs s-hide"></div>
          <div id="s-tag" class="s-abs s-hide"><i>${cross}</i><span class="s-mono">test_party_order</span></div>
          <div id="s-sec" class="s-abs s-hide">${stopwatch}0.4 s</div>
        </div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          ${ring("s-ring1", 536, 392, 176, 36)}
          ${ring("s-ring2", 806, 392, 104, 36, "#7cf0b5")}
          <path id="s-arr" class="s-ring" style="stroke-width:8" d="M1118 870 C1300 870 1420 830 1420 668" />
          <polygon id="s-arrh" points="1420,636 1401,670 1439,670" fill="#ff6b8b" />
          ${ring("s-ring3", 1397, 588, 118, 32)}
        </svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds), offset by the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });

      const pop = (sel, at, o) => {
        o = o || {};
        tl.fromTo(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.4, ease: o.ease || "back.out(1.6)", immediateRender: !o.again }, at);
      };
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const draw = (sel, at, d) => {
        gsap.utils.toArray(sel).forEach((p) => {
          const L = p.getTotalLength() + 2;
          gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
          tl.set(p, { strokeDashoffset: L, opacity: 1 }, at);
          tl.to(p, { strokeDashoffset: 0, duration: d || 0.45, ease: "power2.out" }, at + 0.01);
        });
      };
      const drop = (sel, at, h) => tl.fromTo(sel, { opacity: 0, y: -(h || 320) }, { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" }, at);
      const click = (row, at, cx, cy) => {
        tl.to("#s-cursor", { x: cx, y: cy, duration: 0.4, ease: "power2.inOut" }, at - 0.45);
        tl.to("#s-cursor", { scale: 0.8, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" }, at);
        tl.to(row + " > i", { backgroundColor: "#ddefe6", duration: 0.15 }, at + 0.05);
        tl.fromTo(row + " > i > svg", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, at + 0.05);
      };


      /* ---- 1. Testing by hand ---- */
      tl.fromTo("#s-head", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(0) - 0.05);
      pop("#s-pm", t(3) - 0.05, { from: 0.4 });
      pop("#s-ps", t(5) - 0.05, { from: 0.4 });
      pop("#s-ph", t(9) - 0.05, { from: 0.4 });
      tl.fromTo("#s-cursor", { opacity: 0, x: 620, y: 1000 }, { opacity: 1, x: 560, y: 330, duration: 0.6, ease: "power3.out" }, t(9) + 0.1);
      [["#s-r1", t(11), 236], ["#s-r2", t(14), 324], ["#s-r3", t(15), 412]].forEach(([r, at, top]) => {
        tl.fromTo(r, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, at - 0.1);
        click(r, at + 0.3, 96 + 32 + 20, 96 + top + 30);
      });
      pop(["#s-pivot", "#s-ground"], t(11) - 0.1, { from: 0.8, d: 0.3 });
      drop("#s-b1", t(11) + 0.3, 420);
      drop("#s-b2", t(14) + 0.25, 300);
      drop("#s-b3", t(15) + 0.5, 300);
      tl.to("#s-cursor", { opacity: 0, x: 420, y: 700, duration: 0.5, ease: "power2.in" }, t(17) + 0.5);
      tl.fromTo("#s-cone", { rotation: 0, transformOrigin: "980px 704px" }, { rotation: -2.4, duration: 0.5, ease: "sine.inOut" }, t(17) + 0.5);
      tl.to("#s-cone", { rotation: 2.4, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 18 }, t(17) + 1.0);
      pop("#s-clock", t(18) - 0.1, { from: 0.5 });
      tl.fromTo("#s-hand", { rotation: 0, svgOrigin: "75 75" }, { rotation: 360 * 2 + 150, duration: 1.3, ease: "power2.inOut" }, t(18));
      pop("#s-25", t(18) + 0.15, { from: 0.5 });
      tl.fromTo("#s-25s", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(21));
      pop("#s-capt", t(19) + 0.2, { from: 0.7 });
      tl.fromTo("#s-dlab", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(22) - 0.1);
      gsap.utils.toArray(".s-dot").forEach((d, i) => pop(d, t(22) + 0.1 + i * 0.22, { from: 0.3, d: 0.3 }));
      tl.fromTo("#s-cap", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t(26));

      /* ---- 2. A bug slips in ---- */
      tl.fromTo("#s-grid", { opacity: 0, x: 90 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t(8) - 0.1);
      tl.fromTo("#s-bug1", { opacity: 0, x: 1860, y: 20, rotation: -120 }, { opacity: 1, x: 1700, y: 150, rotation: -120, duration: 0.35, ease: "power2.out" }, t(31) - 0.1);
      tl.to("#s-bug1", { x: ${tileC(2, 1)[0] - 38}, y: ${tileC(2, 1)[1] - 38}, rotation: -150, duration: 1.0, ease: "power1.inOut" }, t(32));
      tl.to("#s-bug1", { rotation: -138, duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, t(32) + 0.02);
      pop("#s-btag", t(35), { from: 0.4 });
      tl.to("#s-bug1", { scale: 0.2, opacity: 0, duration: 0.35, ease: "power2.in" }, t(37) + 0.2);
      out("#s-btag", t(39) - 0.2);
      tl.to("#s-r1", { backgroundColor: "#e6e3ff", boxShadow: "0 0 0 8px #e6e3ff", borderRadius: 12, duration: 0.3 }, t(39));
      tl.fromTo("#s-ghost", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, t(41));
      pop("#s-never", t(39) + 0.1 + 2.0, { from: 0.4 });
      out(["#s-clock", "#s-25", "#s-25s", "#s-dlab", ".s-dot"], t(45) - 0.3, 0.25);
      tl.fromTo("#s-wed", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, t(46) - 0.1);
      tl.fromTo("#s-wrong", { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: -7, duration: 0.3, ease: "power4.in" }, t(48) + 0.1);
      tl.fromTo("#s-should", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, t(48) + 0.6);
      tl.to("#s-b3", { backgroundColor: "#fbe0ea", duration: 0.25 }, t(51) - 0.05);
      pop("#s-b3 > i", t(51), { from: 0.2, ease: "back.out(2.4)" });
      out(["#s-capt", "#s-cap"], t(51) - 0.1);
      // the spotlight wanders over all 20 places
      const TC = (r, c) => [${GX} + c * ${TP} - 16, ${GY} + r * ${TP} - 16];
      const sweep0 = t(53), per = (t(59) + 0.35 - sweep0) / 5;
      tl.fromTo("#s-spot", { opacity: 0, x: TC(0, 0)[0], y: TC(0, 0)[1], scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, sweep0 - 0.35);
      for (let r = 0; r < 5; r++) {
        const fwd = r % 2 === 0;
        tl.to("#s-spot", { x: TC(r, fwd ? 3 : 0)[0], duration: per - 0.1, ease: "sine.inOut" }, sweep0 + r * per);
        if (r < 4) tl.to("#s-spot", { y: TC(r + 1, 0)[1], duration: 0.1, ease: "none" }, sweep0 + (r + 1) * per - 0.1);
        for (let c = 0; c < 4; c++) {
          const k = fwd ? c : 3 - c;
          tl.fromTo("#s-t" + (r * 4 + c) + " > b", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, sweep0 + r * per + (k + 0.5) * (per - 0.1) / 4);
        }
      }
      out("#s-spot", t(59) + 0.4, 0.2);
      pop("#s-20", t(58) - 0.05, { from: 0.5 });
      tl.fromTo("#s-which", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t(58) + 0.35);

      /* ---- 3. What a test is ---- */
      tl.to("#s-A", { opacity: 0, x: -80, duration: 0.3, ease: "power2.in" }, t(61) - 0.1);
      tl.set("#s-B", { opacity: 1 }, t(61) + 0.2);
      tl.fromTo("#s-code", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, t(62));
      pop("#s-bh", t(66) - 0.1, { from: 0.7 });
      tl.fromTo("#s-l1", { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "steps(14)", immediateRender: false }, t(69) - 0.1);
      tl.fromTo("#s-l2", { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "steps(18)", immediateRender: false }, t(70) + 0.25);
      draw("#s-ring1", t(74) - 0.05, 0.5);
      tl.fromTo("#s-wire", { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power2.out" }, t(75));
      tl.fromTo("#s-res", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(75) + 0.05);
      tl.fromTo("#s-ans", { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.4)" }, t(76));
      draw("#s-ring2", t(78) - 0.05, 0.45);
      tl.fromTo("#s-exp", { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.4)" }, t(78) + 0.3);
      pop("#s-eq", t(80), { from: 0.7 });
      tl.fromTo("#s-pass", { opacity: 0, scale: 2.4, rotation: -4 }, { opacity: 1, scale: 1, rotation: 6, duration: 0.3, ease: "power4.in" }, t(80) + 0.35);
      tl.fromTo("#s-again", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(84) - 0.1);
      gsap.utils.toArray(".s-re").forEach((d, i) => pop(d, t(84) + 0.15 + i * 0.045, { from: 0.3, d: 0.22 }));
      pop("#s-ms", t(86), { from: 0.6 });

      /* ---- 4. Forty, six, two ---- */
      out("#s-marks > #s-ring1, #s-marks > #s-ring2", t(89) - 0.1, 0.2);
      tl.to("#s-B", { scale: 0.06, x: ${tinyPos[0][0] + 29 - 960}, y: ${tinyPos[0][1] + 29 - 540}, opacity: 0, duration: 0.55, ease: "power3.in", transformOrigin: "960px 540px" }, t(89) - 0.1);
      tl.set("#s-C", { opacity: 1 }, t(89));
      pop("#s-ch", t(89) + 0.1, { from: 0.7 });
      pop("#s-u0", t(89) + 0.42, { from: 2.2, ease: "back.out(2)" });
      gsap.utils.toArray(".s-tiny").slice(1).forEach((d, i) => pop(d, t(91) + i * 0.036, { from: 0.2, d: 0.25, ease: "back.out(2.2)" }));
      pop("#s-la1", t(91) + 0.1, { from: 0.7 });
      tl.fromTo("#s-c1", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(91) + 0.3);
      tl.fromTo("#s-la1 span", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t(94));
      gsap.utils.toArray(".s-mid").forEach((d, i) => drop(d, t(98) - 0.1 + i * 0.09, 240));
      pop("#s-la2", t(98) + 0.1, { from: 0.7 });
      tl.fromTo("#s-c2", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(98) + 0.3);
      tl.fromTo("#s-la2 span", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t(101));
      gsap.utils.toArray(".s-top").forEach((d, i) => drop(d, t(106) - 0.1 + i * 0.16, 260));
      pop("#s-la3", t(106) + 0.1, { from: 0.7 });
      tl.fromTo("#s-c3", { opacity: 0 }, { opacity: 1, duration: 0.2 }, t(106) + 0.3);
      tl.fromTo("#s-la3 span", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t(108));

      /* ---- 5. Run them all ---- */
      const runBase = (at, skip) => gsap.utils.toArray(".s-tiny").forEach((d, i) => {
        if (i === skip) return;
        tl.to(d, { backgroundColor: "#1f7a5c", duration: 0.1 }, at + i * 0.009);
        tl.to(d.querySelector("svg"), { opacity: 1, duration: 0.1 }, at + i * 0.009);
      });
      runBase(t(116));
      pop("#s-la1 > em", t(116) + 0.15, { from: 0.4 });
      gsap.utils.toArray(".s-mid").forEach((d, i) => {
        tl.to(d, { backgroundColor: "#bfe6d3", duration: 0.12 }, t(116) + 0.4 + i * 0.06);
        pop(d.querySelector(".s-okb"), t(116) + 0.4 + i * 0.06, { from: 0.3, d: 0.22 });
      });
      pop("#s-la2 > em", t(116) + 0.5, { from: 0.4 });
      gsap.utils.toArray(".s-top").forEach((d, i) => {
        tl.to(d, { backgroundColor: "#bfe6d3", duration: 0.12 }, t(116) + 0.75 + i * 0.15);
        pop(d.querySelector(".s-okb"), t(116) + 0.75 + i * 0.15, { from: 0.3, d: 0.22 });
      });
      pop("#s-la3 > em", t(116) + 0.95, { from: 0.4 });

      /* ---- 6. Plant the same bug ---- */
      out([".s-lab", ".s-conn"], t(120) - 0.3, 0.25);
      tl.to(".s-tiny", { backgroundColor: "#ddefe6", duration: 0.25 }, t(119));
      tl.to(".s-tiny > svg", { opacity: 0, duration: 0.2 }, t(119));
      tl.to(".s-mid", { backgroundColor: "#fbebd2", duration: 0.25 }, t(119));
      tl.to(".s-top", { backgroundColor: "#e6e3ff", duration: 0.25 }, t(119));
      tl.to(".s-okb", { opacity: 0, duration: 0.2 }, t(119));
      tl.fromTo("#s-fn", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(120) - 0.05);
      tl.fromTo("#s-bug2", { opacity: 0, x: 1880, y: 250, rotation: -150 }, { opacity: 1, x: 1800, y: 330, rotation: -150, duration: 0.3, ease: "power2.out" }, t(120) + 0.2);
      tl.to("#s-bug2", { x: 1640, y: 606, rotation: -160, duration: 0.85, ease: "power1.inOut" }, t(121));
      tl.to("#s-bug2", { rotation: -148, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, t(121) + 0.02);
      tl.to("#s-bug2", { rotation: -90, duration: 0.25, ease: "power2.out" }, t(123) + 0.1);
      runBase(t(126), ${RED});
      tl.to("#s-u${RED}", { opacity: 0, duration: 0.05 }, t(128) - 0.05);
      tl.fromTo("#s-redx", { opacity: 0, scale: 2.6 }, { opacity: 1, scale: 1.25, duration: 0.4, ease: "back.out(2)" }, t(128) - 0.05);
      pop("#s-sec", t(130) - 0.05, { from: 0.4 });
      tl.fromTo("#s-stem", { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" }, { opacity: 1, scaleY: 1, duration: 0.2, ease: "power2.out" }, t(134) - 0.2);
      pop("#s-tag", t(134) - 0.05, { from: 0.5 });
      draw("#s-arr", t(135), 0.6);
      tl.fromTo("#s-arrh", { opacity: 0 }, { opacity: 1, duration: 0.12 }, t(135) + 0.55);
      draw("#s-ring3", t(137) - 0.1, 0.5);

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.25, ease: "power2.in" }, ${(DUR - 0.27).toFixed(2)});

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
writeFileSync(new URL("./compositions/story.html", import.meta.url), html);
console.log("story.html written", html.length);
