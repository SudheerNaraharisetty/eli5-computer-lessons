// Generates compositions/story.html for lesson 28. Run: node gen-story.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const words = JSON.parse(readFileSync("assets/voice/words.json", "utf8"));
const W = words.map((w) => +w.start.toFixed(3));
const STORY = 56.15;

/* ---------- geometry (the "tall" state is the base; earlier states are offsets) ---------- */
const PX = 96, PY = 60, PW = 880, HEAD = 60, PAD = 24, LH = 44, CH = 16.8, TX = PX + 40;
const rowTop = (r) => PY + HEAD + PAD + r * LH;
const rowMid = (r) => rowTop(r) + LH / 2;
const hRows = (n) => HEAD + PAD * 2 + n * LH;

const COL = {
  card: { dark: "#c9c6ff", solid: "#3b37e6", tint: "#e6e3ff" },
  phone: { dark: "#7cf0b5", solid: "#1f7a5c", tint: "#ddefe6" },
  cash: { dark: "#ffc24b", solid: "#b9741a", tint: "#fbebd2" },
  voucher: { dark: "#8fd3ff", solid: "#1d6fa5", tint: "#dceefa" },
};

const e = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const kw = (s) => `<span class="kw">${s}</span>`;
const q = (s) => `<span class="q">${e(s)}</span>`;
const ln = (id, row, html, cls) => `<div class="s-ln ${cls || ""}" id="${id}" style="top:${rowTop(row)}px">${html}</div>`;

const lines = [
  ln("l-b0", 0, `${kw("def")} <span class="fn">checkout</span>(total):`),
  ln("l-t0", 0, `${kw("def")} <span class="fn">checkout</span>(total, method):`, "s-hide"),
  ln("l-k1", 1, `    ${kw("if")} method == &quot;card&quot;:`, "s-hide c-card ch-card"),
  ln("l-c1", 2, `        <span class="sm">swipe_machine</span>.${q("connect()")}`, "c-card ch-card"),
  ln("l-c2", 3, `        <span class="sm">swipe_machine</span>.${q("send_cents")}(to_cents(total))`, "c-card ch-card"),
  `<div class="s-ln c-card ch-card s-two" id="l-c3" style="top:${rowTop(4)}px"><span id="l-c3a">        ${kw("if")} <span class="sm">swipe_machine</span>.last_code == <span class="q" id="k-seven">7</span>:</span><span id="l-c3b" class="s-hide">        result = swipe_machine.last_code</span></div>`,
  ln("l-p1", 5, `    ${kw("elif")} method == &quot;phone&quot;:`, "s-hide c-phone ch-phone"),
  ln("l-p2", 6, `        tap_pad.${q("wake()")}`, "s-hide c-phone ch-phone"),
  ln("l-p3", 7, `        result = tap_pad.request(total)`, "s-hide c-phone ch-phone"),
  ln("l-h1", 8, `    ${kw("elif")} method == &quot;cash&quot;:`, "s-hide c-cash ch-cash"),
  ln("l-h2", 9, `        result = cash_drawer.take(total)`, "s-hide c-cash ch-cash"),
  ln("l-v1", 10, `    ${kw("elif")} method == &quot;voucher&quot;:`, "s-hide c-voucher ch-voucher"),
  ln("l-v2", 11, `        result = voucher_book.use(total)`, "s-hide c-voucher ch-voucher"),
  `<div class="s-ln s-two s-hide" id="l-12" style="top:${rowTop(12)}px"><span id="l-12a">    ${kw("if")} result == ${q("7")} ${kw("or")} result == ${q('"OK"')}:</span><span id="l-12b" class="s-hide">    ${kw("if")} result == ${q('"OK"')} ${kw("or")} result == ${q("True")}:</span></div>`,
  ln("l-pr", 13, `        print_receipt(total)`),
];

/* ---------- devices and wires ---------- */
const DX = 1440, DW = 384, DH = 150;
const devs = [
  { k: "card", c: 170, name: "card machine", says: "says 7" },
  { k: "phone", c: 370, name: "phone tap", says: 'says "OK"' },
  { k: "cash", c: 570, name: "cash drawer", says: 'says "OK"' },
  { k: "voucher", c: 770, name: "voucher book", says: "says True" },
];
const icon = {
  card: `<rect x="14" y="6" width="82" height="98" rx="12" fill="#fff" stroke="#0e0c1d" stroke-width="5"/><rect x="26" y="18" width="58" height="30" rx="6" fill="#15132b"/><g fill="#3b37e6"><circle cx="36" cy="64" r="6"/><circle cx="55" cy="64" r="6"/><circle cx="74" cy="64" r="6"/><circle cx="36" cy="84" r="6"/><circle cx="55" cy="84" r="6"/><circle cx="74" cy="84" r="6"/></g>`,
  phone: `<rect x="26" y="4" width="58" height="102" rx="12" fill="#ddefe6" stroke="#0e0c1d" stroke-width="5"/><path d="M42 62 Q55 46 68 62 M36 48 Q55 24 74 48" fill="none" stroke="#1f7a5c" stroke-width="6" stroke-linecap="round"/><circle cx="55" cy="78" r="6" fill="#1f7a5c"/>`,
  cash: `<rect x="8" y="26" width="94" height="38" rx="8" fill="#fff" stroke="#0e0c1d" stroke-width="5"/><rect x="2" y="60" width="106" height="40" rx="8" fill="#fbebd2" stroke="#0e0c1d" stroke-width="5"/><circle cx="55" cy="80" r="11" fill="#ffc24b" stroke="#0e0c1d" stroke-width="5"/>`,
  voucher: `<path d="M6 24 H104 V44 a11 11 0 0 0 0 22 V86 H6 V66 a11 11 0 0 0 0 -22 Z" fill="#dceefa" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round"/><path d="M40 30 V80" stroke="#1d6fa5" stroke-width="5" stroke-dasharray="7 7" stroke-linecap="round"/><circle cx="72" cy="55" r="11" fill="#1d6fa5"/>`,
};
const devHtml = (d) => `<div class="s-dev${d.k === "card" ? "" : " s-hide"}" id="d-${d.k}" style="left:${DX}px;top:${d.c - DH / 2}px">
            <svg viewBox="0 0 110 110">${icon[d.k]}</svg>
            <b>${d.name}</b>
            <i class="s-says s-hide" id="says-${d.k}" style="background:${COL[d.k].tint}">${e(d.says)}</i>
            ${d.k === "card" ? '<div id="s-stamp" class="s-hide">NO RECEIPT</div>' : ""}
          </div>`;

const X0 = PX + PW + 6;
const wire = (id, k, ya, yb, a, b) => {
  const d = `M${X0} ${ya} C${X0 + 170} ${ya + a} ${DX - 170} ${yb + b} ${DX - 4} ${yb}`;
  return `<path class="s-wire s-wu w-${id}" d="${d}" /><path class="s-wire s-wo w-${id}" d="${d}" stroke="${COL[k].solid}" />`;
};
const cardWires = [wire("c1", "card", rowMid(2), 206, -150, 130), wire("c2", "card", rowMid(3), 170, 120, -150), wire("c3", "card", rowMid(4), 134, -60, 190)].join("\n            ");
const ownWires = [
  wire("p1", "phone", rowMid(6), 396, -130, 120), wire("p2", "phone", rowMid(7), 346, 110, -130),
  wire("h1", "cash", rowMid(9), 570, -150, 150),
  wire("v1", "voucher", rowMid(11), 760, 150, -150),
].join("\n            ");
const y12 = rowMid(12);
const d12c = `M${X0} ${y12} C${X0 + 170} ${y12 - 300} ${DX - 170} ${228 + 260} ${DX - 4} 228`;
const resWires = [
  `<path class="s-wire s-wu w-r1" d="${d12c}" /><path class="s-wire s-wo w-r1" id="w-r1o" d="${d12c}" stroke="${COL.card.solid}" /><path id="w-r1x" d="${d12c}" />`,
  wire("r2", "phone", y12, 420, -220, 200), wire("r3", "cash", y12, 612, 130, -160), wire("r4", "voucher", y12, 804, -120, -60),
].join("\n            ");

/* ---------- plugs ---------- */
const PARK = 1444, PLUG = 1020, PLUGY = 470, rows = [130, 300, 470, 640, 810];
const plugs = [
  { k: "card", name: "CardPayment", quirk: "last_code == 7" },
  { k: "phone", name: "PhonePayment", quirk: "tap_pad.wake()" },
  { k: "cash", name: "CashPayment", quirk: "cash_drawer" },
  { k: "voucher", name: "VoucherPayment", quirk: "voucher_book" },
  { k: "store", name: "StoreCreditPayment", quirk: "credit_book" },
];
const plugHtml = (p, i) => {
  const c = COL[p.k] || { tint: "#0e0c1d", solid: "#fff" };
  return `<div class="s-plug s-hide${p.k === "store" ? " s-store" : ""}" id="pl-${p.k}" style="left:${PARK}px;top:${rows[i]}px">
          <span class="s-prong" style="top:22px"></span><span class="s-prong" style="top:102px"></span>
          <div class="s-body" style="background:${c.tint}"><b>${p.name}</b><code id="pq-${p.k}" class="s-hide">${e(p.quirk)}</code></div>
          ${p.k === "store" ? '<div id="s-new" class="s-hide">NEW</div>' : ""}
        </div>`;
};

/* ---------- the fix-state code (bigger type) ---------- */
const FY = 400, FH = 278, FCH = 20.4;
const fl = (i, html, id) => `<div class="s-fl" ${id ? `id="${id}"` : ""} style="top:${FY + HEAD + 28 + i * 54}px">${html}</div>`;

const html = `<template>
  <style>
    @font-face { font-family: "Fraunces"; font-weight: 700; src: url("assets/fonts/fraunces-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; src: url("assets/fonts/manrope-600.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 800; src: url("assets/fonts/manrope-800.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; font-family: "Manrope", sans-serif; font-weight: 800; color: #0e0c1d; }
    #root * { box-sizing: border-box; }
    #s-all, #s-wrap, #s-grp, #s-cardgrp, #s-fix { position: absolute; inset: 0; }
    .s-abs { position: absolute; }
    .s-hide { opacity: 0; }
    .s-mono, .s-ln, .s-fl, .s-plug code, .s-says, #s-true, #s-ifc code { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }

    #s-title { left: 96px; top: 232px; font: 700 68px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-notice { left: 1260px; top: 30px; width: 564px; height: 108px; border-radius: 22px; background: #fbebd2; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; padding: 14px 28px; }
    #s-notice small { display: block; font-size: 28px; line-height: 1.3; letter-spacing: 0.04em; color: #8a5510; }
    #s-notice b { display: block; font-size: 36px; line-height: 1.3; white-space: nowrap; }

    /* the checkout panel */
    #s-panel { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-head { left: ${PX}px; top: ${PY}px; width: ${PW}px; height: ${HEAD}px; background: #211e40; border-radius: 20px 20px 0 0; box-shadow: 0 5px 0 0 #0e0c1d; display: flex; align-items: center; padding: 0 26px; gap: 10px; }
    #s-head > i { width: 16px; height: 16px; border-radius: 50%; background: #ff6b8b; }
    #s-head > i:nth-child(2) { background: #ffc24b; }
    #s-head > i:nth-child(3) { background: #4bd69b; }
    #s-head > span { margin-left: 14px; font: 700 28px "JetBrains Mono", monospace; color: #a9a5d6; }
    #s-grow { position: absolute; right: 16px; top: 6px; height: 48px; line-height: 48px; padding: 0 20px; border-radius: 999px; background: #ffc24b; color: #0e0c1d; font-size: 28px; white-space: nowrap; }
    #s-same { position: absolute; right: 16px; top: 6px; height: 48px; line-height: 48px; padding: 0 20px; border-radius: 999px; background: #ddefe6; color: #1f7a5c; font-size: 28px; white-space: nowrap; }
    .s-ln { position: absolute; left: ${TX}px; height: ${LH}px; font-weight: 500; font-size: 28px; line-height: ${LH}px; white-space: pre; color: #eceaff; }
    .s-ln .kw, .s-fl .kw { color: #ff9db3; }
    .s-ln .fn, .s-fl .fn { color: #fff; font-weight: 700; }
    .s-ln .q { display: inline-block; border-radius: 6px; }
    .s-ln .sm { display: inline-block; }
    .c-card { color: ${COL.card.dark}; }
    .c-phone { color: ${COL.phone.dark}; }
    .c-cash { color: ${COL.cash.dark}; }
    .c-voucher { color: ${COL.voucher.dark}; }
    .s-two { width: 800px; }
    .s-two > span { position: absolute; left: 0; top: 0; height: ${LH}px; white-space: pre; }
    .s-fl { position: absolute; left: ${TX}px; height: 54px; font-weight: 500; font-size: 34px; line-height: 54px; white-space: pre; color: #eceaff; opacity: 0; }
    .s-fl .pay { color: #7cf0b5; font-weight: 700; }
    #s-true { left: 716px; top: ${FY + HEAD + 28 + 54 + 1}px; height: 52px; line-height: 52px; padding: 0 20px; border-radius: 999px; background: #7cf0b5; color: #0e0c1d; font-weight: 700; font-size: 32px; }

    /* devices and wires */
    .s-dev { position: absolute; width: ${DW}px; height: ${DH}px; background: #fff; border-radius: 22px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-dev > svg { position: absolute; left: 18px; top: 20px; width: 110px; height: 110px; }
    .s-dev > b { position: absolute; left: 144px; top: 22px; font-size: 32px; line-height: 44px; white-space: nowrap; }
    .s-says { position: absolute; left: 144px; top: 78px; height: 48px; line-height: 48px; padding: 0 14px; border-radius: 10px; font-style: normal; font-weight: 700; font-size: 28px; white-space: nowrap; box-shadow: 0 0 0 3px #0e0c1d; }
    #s-stamp { position: absolute; right: -16px; top: -46px; padding: 2px 16px; background: #b8235a; color: #fff; font-size: 30px; line-height: 1.5; letter-spacing: 0.06em; border-radius: 10px; box-shadow: 0 0 0 4px #0e0c1d; white-space: nowrap; }
    .s-wires { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .s-wire { fill: none; stroke-linecap: round; opacity: 0; }
    .s-wu { stroke: #0e0c1d; stroke-width: 14; }
    .s-wo { stroke-width: 6; }
    #w-r1x { fill: none; stroke: #b8235a; stroke-width: 7; stroke-linecap: round; stroke-dasharray: 4 20; opacity: 0; }

    /* socket, interface card, plugs */
    #s-socket { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    #s-ghost { fill: none; stroke: #3b37e6; stroke-width: 6; stroke-dasharray: 16 12; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    #s-tab { left: 1000px; top: 176px; height: 52px; line-height: 52px; padding: 0 22px; border-radius: 14px 14px 0 0; background: #3b37e6; color: #fff; font-size: 30px; letter-spacing: 0.1em; box-shadow: 0 0 0 5px #0e0c1d; }
    #s-ifc { left: 1000px; top: 233px; width: 392px; height: 176px; background: #fff; border-radius: 0 22px 22px 22px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    #s-ifc code { position: absolute; left: 28px; top: 22px; font-weight: 700; font-size: 42px; line-height: 60px; color: #3b37e6; white-space: nowrap; }
    #s-ifc span { position: absolute; left: 28px; top: 96px; font-size: 32px; line-height: 52px; white-space: nowrap; }
    #s-ifc span b { color: #1f7a5c; }
    #s-ifc span i { font-style: normal; color: #b8235a; }
    .s-plug { position: absolute; width: 380px; height: 140px; }
    .s-prong { position: absolute; left: 4px; width: 66px; height: 16px; background: #6f6b80; border-radius: 4px; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-body { position: absolute; left: 60px; top: 0; width: 320px; height: 140px; border-radius: 26px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-body b { position: absolute; left: 0; top: 20px; width: 320px; text-align: center; font-size: 28px; line-height: 40px; letter-spacing: -0.01em; white-space: nowrap; }
    .s-body code { position: absolute; left: 14px; top: 72px; width: 292px; height: 48px; line-height: 48px; text-align: center; border-radius: 10px; background: #15132b; color: #fff; font-weight: 500; font-size: 28px; white-space: nowrap; }
    .s-store .s-body b { color: #fff; }
    .s-store .s-body code { background: #fff; color: #0e0c1d; }
    #s-new { position: absolute; right: -16px; top: -30px; padding: 0 16px; height: 46px; line-height: 46px; border-radius: 999px; background: #ffc24b; font-size: 28px; letter-spacing: 0.06em; box-shadow: 0 0 0 4px #0e0c1d; }

    /* marks */
    #s-marks { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .s-ring { fill: none; stroke: #ff6b8b; stroke-width: 6; stroke-linecap: round; opacity: 0; }
    #s-cursor { left: 0; top: 0; width: 48px; height: 48px; }
    #s-what { left: 96px; top: 226px; font: 700 68px/1.2 "Fraunces", serif; letter-spacing: -0.02em; white-space: nowrap; }
    #s-what i { font-style: normal; color: #3b37e6; }
    .s-tile { position: absolute; top: 776px; width: 424px; height: 112px; background: #fff; border-radius: 22px; box-shadow: 0 0 0 5px #0e0c1d, 0 10px 0 5px #0e0c1d; }
    .s-tile > span { position: absolute; left: 28px; top: 32px; font-size: 32px; line-height: 48px; white-space: nowrap; }
    .s-tile > b { position: absolute; right: 30px; top: 16px; width: 60px; height: 80px; text-align: right; font: 700 68px/80px "Fraunces", serif; }
    .s-tile > b > u { position: absolute; right: 0; top: 0; text-decoration: none; }
    .s-ok { position: absolute; width: 56px; height: 56px; border-radius: 50%; background: #1f7a5c; box-shadow: 0 0 0 4px #0e0c1d; }
    .s-ok > svg { position: absolute; left: 0; top: 0; width: 56px; height: 56px; }
  </style>

  <div id="root" data-composition-id="story" data-width="1920" data-height="1080">
    <div id="s-all" class="clip" data-start="0" data-duration="${STORY}" data-track-index="1">
      <div id="s-wrap">
        <div id="s-title" class="s-abs">Maya's checkout</div>
        <div id="s-notice" class="s-abs s-hide"><small>CUSTOMERS ASK</small><b>More ways to pay?</b></div>
        <div id="s-what" class="s-abs s-hide">It knows <i>what</i>. Not who.</div>

        <div id="s-grp">
          <!-- wires and the things on the other end -->
          <svg class="s-wires" viewBox="0 0 1920 1080">
            ${ownWires}
            ${resWires}
          </svg>
          <div id="s-cardgrp">
            <svg class="s-wires" viewBox="0 0 1920 1080">
            ${cardWires}
            </svg>
          </div>
          ${devs.slice(1).map(devHtml).join("\n          ")}
          <div id="s-cardgrp2" class="s-abs" style="left:0;top:0">
          ${devHtml(devs[0])}
          </div>

          <!-- socket (slides out from behind the panel) -->
          <svg id="s-socket" class="s-abs" viewBox="0 0 1920 1080">
            <g id="s-sock" opacity="0">
              <path d="M960 450 H1076 V497 H1016 V523 H1076 V577 H1016 V603 H1076 V650 H960 Z" fill="#0e0c1d" />
              <path d="M960 440 H1076 V487 H1016 V513 H1076 V567 H1016 V593 H1076 V640 H960 Z" fill="#3b37e6" stroke="#0e0c1d" stroke-width="5" stroke-linejoin="round" />
            </g>
          </svg>

          <!-- the checkout panel -->
          <svg id="s-panel" class="s-abs" viewBox="0 0 1920 1080">
            <rect id="s-psh" x="${PX}" y="${PY + 10}" width="${PW}" height="${hRows(5)}" rx="22" fill="#0e0c1d" stroke="#0e0c1d" stroke-width="5" />
            <rect id="s-pbg" x="${PX}" y="${PY}" width="${PW}" height="${hRows(5)}" rx="22" fill="#15132b" stroke="#0e0c1d" stroke-width="5" />
          </svg>
          <div id="s-headw" class="s-abs" style="left:0;top:0">
            <div id="s-head" class="s-abs"><i></i><i></i><i></i><span>checkout.py</span>
              <div id="s-grow" class="s-hide">5 lines → 14 lines</div>
              <div id="s-same" class="s-hide">not touched</div>
            </div>
          </div>
          <div id="s-lines" class="s-abs" style="left:0;top:0">
            ${lines.join("\n            ")}
          </div>
          <div id="s-fix">
            ${fl(0, `${kw("def")} <span class="fn">checkout</span>(total, payment):`)}
            ${fl(1, `    ${kw("if")} <span class="pay">payment.pay(total)</span>:`)}
            ${fl(2, `        print_receipt(total)`)}
            <div id="s-true" class="s-abs s-hide">True</div>
          </div>
        </div>

        <!-- the interface -->
        <div id="s-tab" class="s-abs s-hide">INTERFACE</div>
        <div id="s-ifc" class="s-abs s-hide"><code id="s-ifc1" class="s-hide">pay(amount)</code><span id="s-ifc2" class="s-hide">→ <b>True</b> or <i>False</i></span></div>

        <!-- plugs -->
        ${plugs.map(plugHtml).join("\n        ")}

        <!-- tiles -->
        <div class="s-tile s-hide" id="s-t1" style="left:96px"><span>ways to pay</span><b><u id="s-n4">4</u><u id="s-n5" class="s-hide">5</u></b></div>
        <div class="s-tile s-hide" id="s-t2" style="left:552px"><span>edits to checkout</span><b><u>0</u></b></div>
        <div class="s-ok s-hide" id="s-okc" style="left:946px;top:750px"><svg viewBox="0 0 56 56"><path d="M16 29 L25 38 L41 20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg></div>

        <svg id="s-marks" class="s-abs" viewBox="0 0 1920 1080">
          <path id="s-ghost" d="M1024 492 H1080 V496 Q1080 470 1106 470 H1374 Q1400 470 1400 496 V584 Q1400 610 1374 610 H1106 Q1080 610 1080 584 V588 H1024 V572 H1080 V508 H1024 Z" />
          <path id="s-rifc" class="s-ring" style="stroke:#3b37e6" d="M1010 300 C1006 214 1400 208 1404 300 C1408 438 1000 446 1000 322" />
          <path id="s-rq" class="s-ring" d="M${TX + 7 * FCH - 22} ${FY + HEAD + 28 + 54 + 27} C${TX + 7 * FCH - 26} ${FY + HEAD + 28 + 54 - 18} ${TX + 25 * FCH + 24} ${FY + HEAD + 28 + 54 - 22} ${TX + 25 * FCH + 22} ${FY + HEAD + 28 + 54 + 27} C${TX + 25 * FCH + 20} ${FY + HEAD + 28 + 54 + 76} ${TX + 7 * FCH - 30} ${FY + HEAD + 28 + 54 + 78} ${TX + 7 * FCH - 26} ${FY + HEAD + 28 + 54 + 18}" />
        </svg>
        <svg id="s-cursor" class="s-abs s-hide" viewBox="0 0 48 48"><path d="M4 3 L4 37 L13 29 L20 45 L27 42 L20 26 L33 26 Z" fill="#fff" stroke="#0e0c1d" stroke-width="4" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>

  <script>
    (function () {
      // Word start times from the narration (seconds), offset by the 0.6 s lead-in.
      const W = ${JSON.stringify(W)};
      const t = (i) => W[i] + 0.6;
      const tl = gsap.timeline({ paused: true });
      const ft = (sel, a, b, at) => tl.fromTo(sel, a, Object.assign({ immediateRender: false }, b), at);
      const pop = (sel, at, o) => { o = o || {}; ft(sel, { opacity: 0, scale: o.from || 0.6 }, { opacity: 1, scale: 1, duration: o.d || 0.45, ease: o.ease || "back.out(1.6)" }, at); };
      const fin = (sel, at, d) => tl.to(sel, { opacity: 1, duration: d || 0.3, ease: "power2.out" }, at);
      const out = (sel, at, d) => tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, at);
      const LEN = new Map();
      document.querySelectorAll(".s-wire, .s-ring").forEach((p) => {
        const L = Math.ceil(p.getTotalLength()) || 800;
        LEN.set(p, L);
        p.style.strokeDasharray = L + " " + (L + 40);
        p.style.strokeDashoffset = L;
      });
      const draw = (sel, at, d) => {
        document.querySelectorAll(sel).forEach((p) => {
          tl.set(p, { opacity: 1 }, at);
          ft(p, { strokeDashoffset: LEN.get(p) }, { strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out" }, at);
        });
      };
      const undraw = (sel, at, d) => {
        document.querySelectorAll(sel).forEach((p) => {
          tl.to(p, { strokeDashoffset: LEN.get(p), duration: d || 0.35, ease: "power2.in" }, at);
          tl.set(p, { opacity: 0 }, at + (d || 0.35));
        });
      };
      const hop = (sel, at) => tl.to(sel, { y: "-=16", duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1 }, at);
      const light = (sel, at) => {
        tl.to(sel, { backgroundColor: "#ffc24b", color: "#0e0c1d", duration: 0.15 }, at);
        ft(sel, { scale: 1.35 }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, at);
      };
      const unlight = (sel, at, col) => tl.to(sel, { backgroundColor: "rgba(255,194,75,0)", color: col, duration: 0.25 }, at);

      /* ---- start state: the short checkout, one card machine ---- */
      tl.set("#s-grp", { y: 300 }, 0);
      tl.set(["#s-cardgrp", "#s-cardgrp2"], { y: -44 }, 0);
      tl.set(["#l-c1", "#l-c2", "#l-c3"], { x: ${-4 * CH}, y: -44 }, 0);
      tl.set("#l-pr", { y: ${-9 * LH} }, 0);
      tl.set("#l-12", { y: ${-4 * LH} }, 0);

      /* ---- 1. One card machine, and the code knows it well ---- */
      tl.fromTo("#d-card", { scale: 0.92 }, { scale: 1, duration: 0.5, ease: "back.out(1.8)" }, 0.05);
      hop("#d-card", t(6) - 0.05);
      ft(".sm", { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.12 }, t(11));
      tl.to(".sm", { color: "#ffc24b", duration: 0.2, stagger: 0.12 }, t(11));
      tl.to(".sm", { color: "#c9c6ff", duration: 0.3 }, t(22));
      light("#l-c1 .q", t(15));
      draw(".w-c1", t(15) + 0.05, 0.5);
      light("#l-c2 .q", t(16));
      draw(".w-c2", t(16) + 0.05, 0.5);
      draw(".w-c3", t(18), 0.5);
      light("#k-seven", t(21));
      pop("#says-card", t(21) + 0.2, { from: 0.4 });

      /* ---- 2. Phone, cash, vouchers: each one is wired in ---- */
      out("#s-title", t(22) - 0.1, 0.3);
      ft("#s-notice", { opacity: 0, y: -50, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.5)" }, t(23) - 0.1);
      unlight(["#l-c1 .q", "#l-c2 .q", "#k-seven"], t(24), "#c9c6ff");
      const grow = (at, gy, nRows, ly) => {
        tl.to("#s-grp", { y: gy, duration: 0.5, ease: "power3.inOut" }, at);
        tl.to("#s-pbg, #s-psh", { attr: { height: ${HEAD + PAD * 2} + nRows * ${LH} }, duration: 0.5, ease: "power3.inOut" }, at);
        tl.to(["#l-12", "#l-pr"], { y: ly, duration: 0.5, ease: "power3.inOut" }, at);
      };
      const PH = t(28) - 0.2;
      grow(PH, 90, 10, ${-4 * LH});
      out("#l-b0", PH, 0.15);
      fin("#l-t0", PH + 0.1, 0.25);
      tl.to(["#l-c1", "#l-c2", "#l-c3"], { x: 0, y: 0, duration: 0.5, ease: "power3.inOut" }, PH);
      tl.to(["#s-cardgrp", "#s-cardgrp2"], { y: 0, duration: 0.5, ease: "power3.inOut" }, PH);
      out("#l-c3a", PH, 0.15);
      fin("#l-c3b", PH + 0.15, 0.25);
      fin("#l-k1", PH + 0.25, 0.25);
      ft(".ch-phone", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", stagger: 0.07 }, PH + 0.3);
      fin("#l-12", PH + 0.45, 0.25);
      pop("#d-phone", PH + 0.25, { from: 0.6 });
      draw(".w-p1", PH + 0.5, 0.4);
      draw(".w-p2", PH + 0.6, 0.4);

      const CA = t(30) - 0.15;
      out("#s-notice", CA - 0.1, 0.25);
      grow(CA, 40, 12, ${-2 * LH});
      ft(".ch-cash", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", stagger: 0.07 }, CA + 0.25);
      pop("#d-cash", CA + 0.2, { from: 0.6 });
      draw(".w-h1", CA + 0.45, 0.4);

      const VO = t(32) - 0.15;
      grow(VO, 0, 14, 0);
      ft(".ch-voucher", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", stagger: 0.07 }, VO + 0.25);
      pop("#d-voucher", VO + 0.2, { from: 0.6 });
      draw(".w-v1", VO + 0.45, 0.4);

      // "wired into checkout": the last question has to reach every one of them
      draw(".w-r1", t(36), 0.5);
      draw(".w-r2", t(36) + 0.2, 0.5);
      draw(".w-r3", t(37), 0.5);
      draw(".w-r4", t(38), 0.5);
      // "its own quirks"
      pop("#says-phone", t(40), { from: 0.4 });
      pop("#says-cash", t(41), { from: 0.4 });
      pop("#says-voucher", t(42), { from: 0.4 });
      light("#l-12a .q", t(42));
      pop("#s-grow", t(45), { from: 0.4 });

      /* ---- 3. A change for vouchers breaks cards ---- */
      ft("#s-cursor", { opacity: 0, x: 620, y: 1040 }, { opacity: 1, x: ${TX + 18 * CH}, y: ${rowTop(12) + 30}, duration: 0.7, ease: "power3.out" }, t(47));
      out("#l-12a", t(51), 0.12);
      ft("#l-12b", { opacity: 0, scale: 1.12, transformOrigin: "20% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, t(51) + 0.08);
      tl.to("#l-12b .q", { backgroundColor: "#ffc24b", color: "#0e0c1d", duration: 0.15 }, t(51) + 0.1);
      tl.to("#s-cursor", { opacity: 0, x: 700, y: 900, duration: 0.5, ease: "power2.in" }, t(52) - 0.2);
      out(".w-r1", t(52), 0.15);
      fin("#w-r1x", t(52), 0.15);
      tl.to("#d-card", { x: 10, duration: 0.07, ease: "power1.inOut", yoyo: true, repeat: 5 }, t(52));
      tl.to("#says-card", { backgroundColor: "#fbe0ea", color: "#b8235a", duration: 0.2 }, t(52) + 0.1);
      ft("#s-stamp", { opacity: 0, scale: 2.4, rotation: 4 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "power4.in" }, t(53) - 0.1);

      /* ---- 4. The fix: decide what checkout needs ---- */
      const F = t(54) - 0.1;
      out(["#s-grow", "#s-stamp", "#w-r1x"], F, 0.25);
      undraw(".w-c1, .w-c2, .w-c3, .w-p1, .w-p2, .w-h1, .w-v1, .w-r2, .w-r3, .w-r4", F, 0.4);
      tl.to(".s-dev", { x: 520, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.06 }, F + 0.25);
      unlight("#l-12 .q", F + 0.2, "#eceaff");
      tl.to("#s-lines", { opacity: 0.55, duration: 0.4 }, t(56));
      ft("#s-sock", { opacity: 1, x: -120 }, { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.4)" }, t(56));
      tl.fromTo("#s-sock", { scaleX: 1, svgOrigin: "960 540" }, { scaleX: 1.12, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, t(61));
      pop("#s-ifc", t(63) - 0.3, { from: 0.7, d: 0.35 });
      pop("#s-ifc1", t(63), { from: 0.5 });
      ft("#s-ifc2", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(67));
      ft("#s-tab", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" }, t(77) - 0.1);
      draw("#s-rifc", t(77) + 0.15, 0.7);

      /* ---- 5. Every way to pay becomes a plug with that shape ---- */
      out("#s-rifc", t(79) + 0.4, 0.3);
      ft("#s-ghost", { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, t(85) - 0.1);
      tl.to("#s-ghost", { opacity: 0, duration: 0.3 }, t(89) - 0.25);
      const rowsY = ${JSON.stringify(rows)};
      [["card", t(89)], ["phone", t(90)], ["cash", t(91)], ["voucher", t(92)]].forEach(([k, at], i) => {
        ft("#pl-" + k, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.6)" }, at - 0.05);
        document.querySelectorAll(".ch-" + k).forEach((el) => {
          const top = parseFloat(el.style.top);
          tl.to(el, { x: "+=1150", y: "+=" + (rowsY[i] + 74 - top), scale: 0.5, opacity: 0, duration: 0.5, ease: "power3.in" }, at + 0.05);
        });
        pop("#pq-" + k, at + 0.45, { from: 0.5, d: 0.35 });
      });
      // "hides its own quirks inside"
      ft(".s-body code", { scale: 1 }, { scale: 1.12, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.1 }, t(97));

      /* ---- 6. Checkout shrinks to one question ---- */
      const SH = t(100) - 0.25;
      out("#s-lines", SH, 0.2);
      tl.to("#s-pbg", { attr: { y: ${FY}, height: ${FH} }, duration: 0.6, ease: "power3.inOut" }, SH);
      tl.to("#s-psh", { attr: { y: ${FY + 10}, height: ${FH} }, duration: 0.6, ease: "power3.inOut" }, SH);
      tl.to("#s-headw", { y: ${FY - PY}, duration: 0.6, ease: "power3.inOut" }, SH);
      tl.to(".s-fl", { opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.08 }, SH + 0.45);
      draw("#s-rq", t(102), 0.6);

      /* ---- 7. Plug in any of them ---- */
      const DXP = ${PLUG - PARK};
      const plugIn = (k, i, at) => {
        tl.to("#pl-" + k, { x: DXP + 26, y: ${PLUGY} - rowsY[i], duration: 0.3, ease: "power3.inOut" }, at - 0.34);
        tl.to("#pl-" + k, { x: DXP, duration: 0.12, ease: "power4.in" }, at - 0.04);
        tl.fromTo("#s-sock", { scaleX: 0.94, svgOrigin: "960 540" }, { scaleX: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, at + 0.08);
        ft("#s-true", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.2)" }, at + 0.12);
      };
      const plugOut = (k, at) => {
        tl.to("#pl-" + k, { x: 0, y: 0, duration: 0.3, ease: "power3.inOut" }, at);
        tl.to("#s-true", { opacity: 0, duration: 0.1 }, at);
      };
      out("#s-rq", t(104) - 0.3, 0.25);
      const INS = [45.5, 46.4, 47.3, 48.2];
      ["card", "phone", "cash", "voucher"].forEach((k, i) => {
        plugIn(k, i, INS[i]);
        if (i < 3) plugOut(k, INS[i + 1] - 0.42);
      });
      pop("#s-t1", t(106) + 0.2, { from: 0.6 });
      ft("#s-what", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t(111));

      /* ---- 8. Store credit arrives: a new plug that simply fits ---- */
      plugOut("voucher", t(116) - 0.1);
      ft("#pl-store", { opacity: 1, x: 520 }, { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.2)" }, t(117) - 0.1);
      pop("#pq-store", t(119), { from: 0.5, d: 0.35 });
      pop("#s-new", t(121), { from: 0.3, ease: "back.out(2.4)" });
      plugIn("store", 4, t(125));
      out("#s-n4", t(125) + 0.3, 0.12);
      ft("#s-n5", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, t(125) + 0.38);
      ft("#s-same", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t(127));
      pop("#s-t2", t(126), { from: 0.6 });
      pop("#s-okc", t(129), { from: 0.2, ease: "back.out(2.4)" });

      /* ---- hand off to the takeaway ---- */
      tl.to("#s-wrap", { opacity: 0, duration: 0.3, ease: "power2.in" }, ${(STORY - 0.35).toFixed(2)});

      window.__timelines = window.__timelines || {};
      window.__timelines["story"] = tl;
    })();
  </script>
</template>
`;
mkdirSync("compositions", { recursive: true });
writeFileSync("compositions/story.html", html);
console.log("story.html written,", html.length, "bytes");
