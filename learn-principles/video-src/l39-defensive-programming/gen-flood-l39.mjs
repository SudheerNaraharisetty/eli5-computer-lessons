// Fills the <!--COOKIES--> slot in compositions/story.html with a fixed pile of cookies (seeded, so it never changes).
import fs from "node:fs";
const f = new URL("./compositions/story.html", import.meta.url);
let s = 7; const r = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
const out = [];
for (let i = 0; i < 30; i++) {
  const row = Math.floor(i / 6), col = i % 6;
  const x = Math.round(34 + col * 62 + (row % 2) * 24 + r() * 16), y = Math.round(250 - row * 48 - r() * 14), R = 27;
  out.push(`          <g><circle cx="${x}" cy="${y}" r="${R}" fill="${i % 3 ? "#d9a05b" : "#e2ad6b"}" stroke="#0e0c1d" stroke-width="5" /><circle cx="${x - 9}" cy="${y - 6}" r="4" fill="#5a3418" /><circle cx="${x + 8}" cy="${y + 2}" r="4" fill="#5a3418" /><circle cx="${x - 2}" cy="${y + 11}" r="3.5" fill="#5a3418" /></g>`);
}
let html = fs.readFileSync(f, "utf8");
html = html.replace(/<!--COOKIES-->[\s\S]*?(?=\n\s*<\/svg>\n\s*<div id="s-inside")/, "<!--COOKIES-->\n" + out.join("\n"));
fs.writeFileSync(f, html);
console.log("cookies:", out.length);
