/* Module 4 (part b): big repos, internals, rare tools, team workflows, capstone. */
(function () {
  const { P, graph, term, areas, esc } = GH;

  /* ---------- local drawing helpers ---------- */
  const MARK = [['ink', P.ink], ['acc', P.accent], ['dan', P.danger], ['ok', P.ok]].map(([n, c]) => `<marker id="m4b-${n}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${c}"/></marker>`).join('');
  const svg = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"><defs>${MARK}</defs>${body}</svg>`;
  const box = (x, y, w, h, fill, o = {}) => `<rect x="${x}" y="${y + 5}" width="${w}" height="${h}" rx="${o.r || 14}" fill="${P.ink}"${o.dash ? ' opacity=".25"' : ''}/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 14}" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"${o.dash ? ' stroke-dasharray="6 5"' : ''}/>`;
  const txt = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 800}"${o.mono ? ' font-family="JetBrains Mono, monospace"' : ''} fill="${o.c || P.ink}">${esc(s)}</text>`;
  const arrow = (x1, y1, x2, y2, k = 'ink', o = {}) => `<path d="M${x1} ${y1} ${o.q ? `Q${o.q[0]} ${o.q[1]} ` : 'L'}${x2} ${y2}" fill="none" stroke="${{ ink: P.ink, acc: P.accent, dan: P.danger, ok: P.ok }[k]}" stroke-width="3" stroke-linecap="round"${o.dash ? ' stroke-dasharray="6 6"' : ''} marker-end="url(#m4b-${k})"/>`;
  const pill = (x, y, s, fill, col) => { const w = s.length * 7.4 + 20; return `<rect x="${x - w / 2}" y="${y - 12}" width="${w}" height="24" rx="12" fill="${fill || P.tint}" stroke="${P.ink}" stroke-width="2"/>${txt(x, y + 4.5, s, { s: 12, mono: true, c: col || P.accent })}`; };
  const folder = (x, y, w, h, fill) => `<path d="M${x + 4} ${y + 5} h${w * .38} l10 12 h${w * .62 - 10} v${h - 12} h-${w}z" fill="${P.ink}"/><path d="M${x} ${y} h${w * .38} l10 12 h${w * .62 - 10} v${h - 12} h-${w}z" fill="${fill || P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const dot = (x, y, fill, label, o = {}) => `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${fill}" stroke="${o.ghost ? P.mute : P.ink}" stroke-width="2.5"${o.ghost ? ' stroke-dasharray="4 4" opacity=".55"' : ''}/>${label ? txt(x, y + 4.5, label, { s: 11.5, c: o.tc || P.ink }) : ''}`;

  /* ================= l34 Big repos ================= */
  const worktreePic = svg(580, 320, 'Two folders on your disk share one Git history', `
    ${folder(30, 30, 200, 120)}${txt(130, 92, 'my-app/', { s: 16, mono: true })}${pill(130, 120, 'main')}
    ${folder(350, 30, 200, 120, P.okT)}${txt(450, 92, '../hotfix/', { s: 16, mono: true })}${pill(450, 120, 'hotfix-branch', P.okT, P.ok)}
    ${box(200, 214, 180, 80, P.tint)}
    ${[0, 1, 2].map(k => `<rect x="${222}" y="${230 + k * 14}" width="40" height="11" rx="4" fill="${k ? P.white : P.okT}" stroke="${P.ink}" stroke-width="2"/>`).join('')}
    ${txt(320, 250, 'one .git', { s: 15, mono: true })}${txt(320, 270, 'shared history', { s: 11.5, c: P.mute, w: 700 })}
    ${arrow(130, 160, 240, 210, 'acc')}${arrow(450, 160, 345, 210, 'ok')}`);

  const submodulePic = svg(600, 330, 'A project holds another repo pinned to one commit', `
    ${box(20, 30, 330, 270, P.paper2)}${txt(40, 62, 'my-app/', { a: 'start', s: 16, mono: true })}
    <rect x="40" y="80" width="140" height="26" rx="7" fill="${P.sand}"/>${txt(110, 98, '.gitmodules', { s: 12, mono: true })}
    <rect x="40" y="114" width="110" height="26" rx="7" fill="${P.sand}"/>${txt(95, 132, 'src/', { s: 12, mono: true })}
    ${box(60, 170, 240, 100, P.tint)}${txt(180, 205, 'libs/x/', { s: 16, mono: true })}${txt(180, 228, 'a whole other repo', { s: 12, c: P.ink2, w: 700 })}
    ${pill(180, 252, 'pinned @ 7c1e9a', P.white)}
    ${box(400, 60, 180, 220, P.white)}${txt(490, 92, 'x (its own repo)', { s: 13 })}
    <line x1="490" y1="120" x2="490" y2="250" stroke="${P.ok}" stroke-width="4"/>
    ${dot(490, 130, P.white, '')}${dot(490, 180, P.ok, '7c', { tc: P.white })}${dot(490, 230, P.white, '')}
    ${txt(530, 134, 'old', { s: 11, c: P.mute, a: 'start' })}${txt(530, 234, 'newest', { s: 11, c: P.mute, a: 'start' })}
    ${arrow(302, 230, 470, 186, 'ok', { dash: true, q: [400, 230] })}`);

  const lfsPic = svg(600, 320, 'Git LFS keeps a small pointer in the repo and the big file elsewhere', `
    <g transform="translate(30 40)"><path d="M6 8 h92 l24 24 v120 h-116z" fill="${P.ink}"/><path d="M0 0 h92 l24 24 v120 h-116z" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    ${txt(58, 70, 'design', { s: 15 })}${txt(58, 88, '.psd', { s: 15, mono: true })}${txt(58, 120, '2 GB', { s: 20, c: P.danger })}</g>
    ${box(230, 30, 170, 120, P.white)}${txt(315, 58, 'your repo', { s: 14 })}
    <rect x="248" y="72" width="134" height="60" rx="8" fill="${P.sand}"/>${txt(315, 92, 'pointer file', { s: 11.5 })}${txt(315, 108, 'oid sha256:4d7a…', { s: 10.5, mono: true, c: P.ink2 })}${txt(315, 123, 'size 2 GB', { s: 10.5, mono: true, c: P.ink2 })}
    <path d="M250 268 a40 14 0 0 0 130 0 v-60 a40 14 0 0 0 -130 0z" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/><ellipse cx="315" cy="208" rx="65" ry="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    ${txt(315, 246, 'LFS storage', { s: 14 })}${txt(315, 264, 'real file lives here', { s: 11, c: P.ink2, w: 700 })}
    ${arrow(155, 90, 225, 90, 'acc')}${txt(190, 78, 'tiny', { s: 11, c: P.accent })}
    ${arrow(155, 150, 245, 225, 'ok')}${txt(178, 205, 'big', { s: 11, c: P.ok })}
    ${box(440, 80, 140, 150, P.tint)}${txt(510, 112, 'git clone', { s: 13, mono: true })}${txt(510, 140, 'fast:', { s: 12, c: P.ink2 })}${txt(510, 158, 'only pointers', { s: 12, c: P.ink2 })}${txt(510, 190, 'git lfs pull', { s: 12, mono: true, c: P.accent })}${txt(510, 208, 'gets real files', { s: 11, c: P.ink2 })}`);

  const sparseRows = [['monorepo/', 0, 1], ['apps/web/', 1, 2], ['apps/mobile/', 1, 0], ['services/api/', 1, 0], ['services/payments/', 1, 0], ['docs/', 1, 0], ['package.json', 1, 1]];
  const sparsePic = svg(560, 340, 'Sparse checkout shows only apps/web from a huge monorepo', `
    ${sparseRows.map(([n, d, on], i) => { const y = 30 + i * 42, x = 40 + d * 40; return `<g opacity="${on ? 1 : .35}">${d ? `<path d="M${x - 22} ${y - 26} v26 h18" fill="none" stroke="${P.ink2}" stroke-width="2"/>` : ''}<rect x="${x}" y="${y - 14}" width="${n.length * 9 + 30}" height="30" rx="8" fill="${on === 2 ? P.tint : on ? P.white : P.sand}" stroke="${P.ink}" stroke-width="2"/>${txt(x + 15, y + 6, n, { a: 'start', s: 13, mono: true })}</g>`; }).join('')}
    ${box(370, 70, 170, 140, P.okT)}${txt(455, 104, 'on your disk', { s: 13 })}${txt(455, 134, 'apps/web/', { s: 13, mono: true })}${txt(455, 156, 'root files', { s: 12, c: P.ink2 })}${txt(455, 186, 'faded = skipped', { s: 11, c: P.mute, w: 700 })}`);

  const shallowPic = graph({
    label: 'A shallow clone has only the newest commit',
    commits: [
      { id: 'A', parents: [], ghost: true, msg: 'skipped' }, { id: 'B', parents: ['A'], ghost: true, msg: 'skipped' }, { id: 'C', parents: ['B'], ghost: true, msg: 'skipped' },
      { id: 'D', parents: ['C'], ghost: true, msg: 'skipped' }, { id: 'E', parents: ['D'], hi: true, msg: 'downloaded' }
    ],
    refs: { main: 'E' }, head: 'main', msgs: true
  });

  /* ================= l35 Under the hood ================= */
  const gitDir = [['HEAD', 'which branch you are on'], ['config', 'this repo’s settings'], ['refs/heads/', 'your branches'], ['refs/tags/', 'your tags'], ['refs/remotes/', 'branches from GitHub'], ['objects/', 'every file, folder, commit'], ['index', 'the staging area'], ['logs/', 'the reflog diary'], ['hooks/', 'scripts that run on events']];
  const gitDirPic = svg(560, 400, 'What lives inside the .git folder', `
    ${folder(20, 14, 150, 44, P.tint)}${txt(95, 48, '.git/', { s: 15, mono: true })}
    ${gitDir.map(([n, d], i) => { const y = 92 + i * 34; return `<path d="M40 ${y - 22} v22 h16" fill="none" stroke="${P.ink2}" stroke-width="2"/><rect x="58" y="${y - 13}" width="160" height="26" rx="7" fill="${n.endsWith('/') ? P.warnT : P.white}" stroke="${P.ink}" stroke-width="2"/>${txt(70, y + 5, n, { a: 'start', s: 12.5, mono: true })}${txt(236, y + 5, d, { a: 'start', s: 13, w: 700, c: P.ink2 })}`; }).join('')}`);

  const objectsPic = svg(620, 380, 'A commit points to a tree, the tree points to blobs and trees, and the commit points to its parent', `
    ${box(20, 20, 150, 52, P.warnT)}${txt(95, 42, 'tag v1.0', { s: 13 })}${txt(95, 60, 'object: tag', { s: 11, c: P.ink2, w: 700 })}
    ${box(220, 14, 180, 110, P.tint)}${txt(310, 38, 'commit a1b2', { s: 14, mono: true })}
    ${txt(236, 62, 'tree   9f3e', { a: 'start', s: 11.5, mono: true, c: P.ink2 })}${txt(236, 80, 'parent 77c0', { a: 'start', s: 11.5, mono: true, c: P.ink2 })}${txt(236, 98, 'author Sam', { a: 'start', s: 11.5, mono: true, c: P.ink2 })}${txt(236, 116, '"add menu"', { a: 'start', s: 11.5, mono: true, c: P.ink2 })}
    ${box(450, 34, 150, 70, P.white, { dash: true })}${txt(525, 64, 'commit 77c0', { s: 13, mono: true, c: P.mute })}${txt(525, 84, 'the parent', { s: 11, c: P.mute, w: 700 })}
    ${box(220, 170, 180, 86, P.okT)}${txt(310, 194, 'tree 9f3e', { s: 14, mono: true })}${txt(310, 216, 'README.md', { s: 11.5, mono: true, c: P.ink2 })}${txt(310, 234, 'src/', { s: 11.5, mono: true, c: P.ink2 })}
    ${box(40, 300, 170, 62, P.white)}${txt(125, 324, 'blob', { s: 13 })}${txt(125, 344, 'README text', { s: 11.5, c: P.ink2, w: 700 })}
    ${box(250, 300, 120, 62, P.okT)}${txt(310, 324, 'tree', { s: 13 })}${txt(310, 344, 'src/', { s: 11.5, mono: true, c: P.ink2 })}
    ${box(420, 300, 170, 62, P.white)}${txt(505, 324, 'blob', { s: 13 })}${txt(505, 344, 'app.js text', { s: 11.5, c: P.ink2, w: 700 })}
    ${arrow(170, 46, 216, 52, 'ink')}${arrow(402, 68, 446, 68, 'ink', { dash: true })}
    ${arrow(310, 128, 310, 165, 'acc')}${arrow(260, 260, 140, 296, 'ok')}${arrow(310, 260, 310, 296, 'ok')}${arrow(372, 330, 416, 330, 'ok')}`);

  const hashPic = svg(600, 300, 'Same content gives the same hash, changed content gives a new hash', `
    ${[['hello', 'ce0136…', 60, P.ok], ['hello', 'ce0136…', 150, P.ok], ['hello!', '2a8f5d…', 240, P.danger]].map(([c, h, y, col]) => `
      <rect x="20" y="${y - 22}" width="120" height="44" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>${txt(80, y + 5, c, { s: 15, mono: true })}
      ${arrow(144, y, 214, y, 'ink')}
      ${arrow(386, y, 446, y, 'ink')}
      <rect x="450" y="${y - 18}" width="130" height="36" rx="18" fill="${col === P.ok ? P.okT : P.dangerT}" stroke="${col}" stroke-width="2.5"/>${txt(515, y + 5, h, { s: 13.5, mono: true, c: col })}`).join('')}
    ${box(218, 30, 166, 240, P.tint)}
    <circle cx="301" cy="120" r="34" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="301" cy="120" r="12" fill="${P.accent}"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<rect x="296" y="78" width="10" height="12" fill="${P.ink}" transform="rotate(${a} 301 120)"/>`).join('')}
    ${txt(301, 190, 'SHA-1', { s: 18 })}${txt(301, 212, 'hash machine', { s: 12, c: P.ink2, w: 700 })}${txt(301, 244, 'content in,', { s: 11.5, c: P.ink2, w: 700 })}${txt(301, 260, 'name out', { s: 11.5, c: P.ink2, w: 700 })}`);

  const refsPic = svg(600, 300, 'HEAD file points to the main file, which holds a commit hash', `
    <g transform="translate(20 40)"><path d="M5 6 h120 l20 20 v90 h-140z" fill="${P.ink}"/><path d="M0 0 h120 l20 20 v90 h-140z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    ${txt(70, 30, '.git/HEAD', { s: 12.5, mono: true })}<rect x="10" y="48" width="120" height="40" rx="6" fill="${P.sand}"/>${txt(70, 66, 'ref: refs/', { s: 11, mono: true })}${txt(70, 81, 'heads/main', { s: 11, mono: true })}</g>
    <g transform="translate(220 40)"><path d="M5 6 h170 l20 20 v90 h-190z" fill="${P.ink}"/><path d="M0 0 h170 l20 20 v90 h-190z" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    ${txt(95, 30, '.git/refs/heads/main', { s: 12, mono: true })}<rect x="10" y="48" width="170" height="40" rx="6" fill="${P.white}"/>${txt(95, 66, 'a1b2c3d4e5f6…', { s: 12, mono: true })}${txt(95, 82, '(40 chars + newline)', { s: 10, c: P.mute, w: 700 })}</g>
    ${arrow(162, 105, 216, 105, 'acc')}${arrow(412, 105, 470, 105, 'acc')}
    ${dot(510, 105, P.accent, 'a1b2', { r: 30, tc: P.white })}${txt(510, 160, 'the commit', { s: 12, c: P.ink2 })}
    ${box(150, 210, 300, 60, P.okT)}${txt(300, 236, 'A branch is a 41-byte file.', { s: 15 })}${txt(300, 256, 'That is why branches are cheap.', { s: 12, c: P.ink2, w: 700 })}`);

  const plumbingPic = svg(560, 360, 'Porcelain commands sit on top, plumbing commands are the pipes underneath', `
    <rect x="30" y="100" width="500" height="22" rx="6" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>
    <path d="M190 100 q0 -70 90 -70 q90 0 90 70z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <path d="M270 30 v-14 h40 v8" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>
    ${txt(280, 78, 'PORCELAIN', { s: 13, c: P.accent })}
    ${txt(90, 60, 'add · commit', { s: 12.5, mono: true })}${txt(90, 80, 'log · switch', { s: 12.5, mono: true })}
    ${txt(470, 60, 'push · merge', { s: 12.5, mono: true })}${txt(470, 80, 'status · diff', { s: 12.5, mono: true })}
    <path d="M260 122 v60 q0 30 -40 30 h-120" fill="none" stroke="${P.ink2}" stroke-width="16" stroke-linecap="round"/>
    <path d="M300 122 v90 q0 30 40 30 h120" fill="none" stroke="${P.ink2}" stroke-width="16" stroke-linecap="round"/>
    <path d="M280 122 v200" fill="none" stroke="${P.ink2}" stroke-width="16" stroke-linecap="round"/>
    ${txt(280, 344, 'PLUMBING', { s: 13, c: P.warn })}
    ${pill(130, 190, 'hash-object', P.warnT, P.warn)}${pill(130, 236, 'cat-file', P.warnT, P.warn)}${pill(440, 210, 'write-tree', P.warnT, P.warn)}${pill(440, 280, 'update-ref', P.warnT, P.warn)}${pill(170, 290, 'commit-tree', P.warnT, P.warn)}`);

  const packPic = svg(600, 280, 'git gc squeezes many loose objects into one packfile', `
    ${Array.from({ length: 24 }, (_, i) => { const x = 30 + (i % 6) * 34, y = 50 + Math.floor(i / 6) * 40; return `<rect x="${x}" y="${y}" width="26" height="26" rx="5" fill="${[P.white, P.okT, P.tint, P.warnT][i % 4]}" stroke="${P.ink}" stroke-width="2"/>`; }).join('')}
    ${txt(125, 236, 'loose objects', { s: 14 })}${txt(125, 256, 'one file each', { s: 11.5, c: P.ink2, w: 700 })}
    ${arrow(250, 120, 340, 120, 'acc')}${txt(295, 104, 'git gc', { s: 13, mono: true, c: P.accent })}
    ${box(360, 50, 200, 140, P.tint)}
    <rect x="384" y="74" width="152" height="70" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>${txt(460, 104, 'pack-9c1f.pack', { s: 11.5, mono: true })}${txt(460, 124, 'squeezed, deltas', { s: 11, c: P.ink2, w: 700 })}
    ${txt(460, 172, 'pack-9c1f.idx', { s: 11.5, mono: true, c: P.ink2 })}
    ${txt(460, 236, 'one packfile', { s: 14 })}${txt(460, 256, 'smaller and faster', { s: 11.5, c: P.ink2, w: 700 })}`);

  /* ================= l36 Rare tools ================= */
  const bundlePic = svg(580, 280, 'A whole repo copied into one file on a USB stick', `
    <g transform="translate(40 80)"><rect x="5" y="6" width="200" height="90" rx="16" fill="${P.ink}"/><rect width="200" height="90" rx="16" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="200" y="22" width="40" height="46" rx="4" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/><rect x="212" y="34" width="8" height="8" fill="${P.ink}"/><rect x="224" y="34" width="8" height="8" fill="${P.ink}"/>
    ${txt(100, 52, 'repo.bundle', { s: 16, mono: true, c: P.white })}${txt(100, 72, 'all branches + history', { s: 11, c: P.tint, w: 700 })}</g>
    ${arrow(300, 125, 370, 125, 'acc')}
    <g transform="translate(380 60)"><rect x="10" y="0" width="160" height="104" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><rect x="24" y="14" width="132" height="76" rx="4" fill="${P.paper}"/>
    <path d="M0 104 h180 l-10 18 h-160z" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M62 42 a40 40 0 0 1 56 0 M72 54 a24 24 0 0 1 36 0" fill="none" stroke="${P.mute}" stroke-width="4" stroke-linecap="round"/><circle cx="90" cy="68" r="5" fill="${P.mute}"/>
    <line x1="58" y1="30" x2="122" y2="80" stroke="${P.danger}" stroke-width="5" stroke-linecap="round"/></g>
    ${txt(470, 220, 'no internet needed', { s: 14 })}`);

  const patchPic = svg(580, 300, 'A patch file travels in an email envelope', `
    ${box(40, 40, 300, 220, P.white)}
    <path d="M40 54 L190 160 L340 54" fill="none" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="80" y="150" width="220" height="90" rx="8" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>
    ${txt(190, 172, '0001-fix-typo.patch', { s: 12, mono: true })}
    <rect x="94" y="184" width="192" height="20" rx="4" fill="${P.dangerT}"/>${txt(102, 199, '- teh menu', { a: 'start', s: 12, mono: true, c: P.danger })}
    <rect x="94" y="208" width="192" height="20" rx="4" fill="${P.okT}"/>${txt(102, 223, '+ the menu', { a: 'start', s: 12, mono: true, c: P.ok })}
    ${arrow(352, 150, 420, 150, 'acc')}
    ${box(430, 90, 130, 120, P.tint)}${txt(495, 128, 'git am', { s: 15, mono: true })}${txt(495, 152, 'turns it back', { s: 11.5, c: P.ink2, w: 700 })}${txt(495, 168, 'into a commit', { s: 11.5, c: P.ink2, w: 700 })}`);

  const notesPic = svg(580, 300, 'A sticky note on a commit, and range-diff comparing two versions of a branch', `
    ${dot(90, 90, P.accent, 'C', { r: 26, tc: P.white })}
    <g transform="translate(130 30) rotate(5)"><rect width="130" height="86" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>${txt(65, 30, 'note:', { s: 12 })}${txt(65, 52, 'tested on', { s: 12, w: 700, c: P.ink2 })}${txt(65, 70, 'Safari 18', { s: 12, w: 700, c: P.ink2 })}</g>
    ${txt(300, 168, 'range-diff: v1 vs v2', { s: 13, c: P.ink2 })}
    ${[1, 2, 3].map(i => { const x = 140 + i * 90; return `${dot(x, 206, P.white, i + '')}${dot(x, 266, i === 2 ? P.warnT : P.white, i + "'")}<line x1="${x}" y1="222" x2="${x}" y2="250" stroke="${i === 2 ? P.warn : P.ok}" stroke-width="3"/>${txt(x + 24, 241, i === 2 ? '!' : '=', { s: 16, c: i === 2 ? P.warn : P.ok })}`; }).join('')}
    ${txt(120, 211, 'v1', { a: 'end', s: 13 })}${txt(120, 271, 'v2', { a: 'end', s: 13 })}`);

  const orphanPic = graph({
    label: 'An orphan branch starts a new history with no parent',
    lanes: ['main', 'gh-pages'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'X', lane: 1, parents: [], x: 1, hi: true, msg: 'no parent' }, { id: 'Y', lane: 1, parents: ['X'], x: 2 }],
    refs: { main: 'C', 'gh-pages': 'Y' }, head: 'gh-pages', msgs: true
  });

  const filterPic = svg(600, 300, 'filter-repo rewrites every commit so the secret file is gone', `
    ${txt(30, 50, 'before', { a: 'start', s: 13, c: P.ink2 })}
    ${[0, 1, 2].map(i => { const x = 130 + i * 150; return `${i ? `<line x1="${x - 130}" y1="80" x2="${x - 20}" y2="80" stroke="${P.accent}" stroke-width="4"/>` : ''}${dot(x, 80, P.white, 'ABC'[i], { r: 20 })}<rect x="${x + 26}" y="${66}" width="76" height="28" rx="6" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2"/>${txt(x + 64, 85, '.env', { s: 12, mono: true, c: P.danger })}`; }).join('')}
    ${arrow(300, 120, 300, 170, 'acc')}${txt(320, 152, 'git filter-repo', { a: 'start', s: 12.5, mono: true, c: P.accent })}
    ${txt(30, 214, 'after', { a: 'start', s: 13, c: P.ink2 })}
    ${[0, 1, 2].map(i => { const x = 130 + i * 150; return `${i ? `<line x1="${x - 130}" y1="240" x2="${x - 20}" y2="240" stroke="${P.ok}" stroke-width="4"/>` : ''}${dot(x, 240, P.okT, "ABC"[i] + "'", { r: 20 })}`; }).join('')}
    ${txt(300, 290, 'new hashes for every commit', { s: 12.5, c: P.ink2 })}`);

  const comparePic = graph({
    label: 'main and feature share a merge-base at commit B',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'], hi: true, msg: 'merge-base' }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'] },
      { id: 'E', lane: 1, parents: ['B'], x: 2 }, { id: 'F', lane: 1, parents: ['E'], x: 3 }],
    refs: { main: 'D', feature: 'F' }, head: 'feature', msgs: true
  });

  /* ================= l37 Team workflows ================= */
  const ghFlowPic = graph({
    label: 'GitHub flow: short branches off main, merged back with pull requests',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'E', parents: ['B', 'D'], hi: true },
      { id: 'F', lane: 1, parents: ['E'] }, { id: 'G', parents: ['E', 'F'], hi: true }],
    refs: { main: 'G' }, head: 'main'
  });

  const gitFlowPic = graph({
    label: 'Git flow with main, hotfix, release, develop and feature lines',
    lanes: ['main', 'hotfix', 'release', 'develop', 'feature'],
    commits: [
      { id: 'M1', parents: [] }, { id: 'D1', lane: 3, parents: ['M1'] }, { id: 'F1', lane: 4, parents: ['D1'] }, { id: 'F2', lane: 4, parents: ['F1'] },
      { id: 'D2', lane: 3, parents: ['D1', 'F2'] }, { id: 'R1', lane: 2, parents: ['D2'] }, { id: 'M2', parents: ['M1', 'R1'], hi: true },
      { id: 'H1', lane: 1, parents: ['M2'] }, { id: 'M3', parents: ['M2', 'H1'], hi: true }, { id: 'D3', lane: 3, parents: ['D2', 'H1'] }],
    refs: { main: 'M3', develop: 'D3' }, head: 'main', dx: 70
  });

  const trunkPic = graph({
    label: 'Trunk-based: tiny branches merged into main many times a day, with a release branch cut off',
    lanes: ['main', 'tiny', 'release/1.x'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'b', lane: 1, parents: ['B'] }, { id: 'C', parents: ['B', 'b'] }, { id: 'R', lane: 2, parents: ['C'] },
      { id: 'D', parents: ['C'] }, { id: 'd', lane: 1, parents: ['D'] }, { id: 'E', parents: ['D', 'd'] }, { id: 'R2', lane: 2, parents: ['R'], label: "R'" }, { id: 'F', parents: ['E'] }],
    refs: { main: 'F', 'release/1.x': 'R2' }, head: 'main', dx: 66
  });

  const convPic = svg(620, 330, 'Anatomy of a conventional commit message and how it bumps the version', `
    <rect x="20" y="40" width="580" height="56" rx="12" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    ${txt(310, 76, 'feat(login)!: add Google sign-in', { s: 22, mono: true })}
    ${[[82, 'type', P.accent], [178, 'scope', P.ok], [246, 'breaking', P.danger], [420, 'what changed', P.ink2]].map(([x, l, c]) => `<line x1="${x}" y1="100" x2="${x}" y2="122" stroke="${c}" stroke-width="3"/>${txt(x, 140, l, { s: 12.5, c })}`).join('')}
    ${[['fix:', '1.4.2 → 1.4.3', 'PATCH', P.ok, P.okT], ['feat:', '1.4.2 → 1.5.0', 'MINOR', P.accent, P.tint], ['feat!: or BREAKING CHANGE', '1.4.2 → 2.0.0', 'MAJOR', P.danger, P.dangerT]].map(([t, v, k, c, f], i) => { const y = 180 + i * 46; return `<rect x="20" y="${y}" width="580" height="38" rx="10" fill="${f}" stroke="${P.ink}" stroke-width="2"/>${txt(36, y + 25, t, { a: 'start', s: 13.5, mono: true })}${txt(390, y + 25, v, { s: 14, mono: true })}${txt(560, y + 25, k, { a: 'end', s: 13, c })}`; }).join('')}`);

  const mergePolicyPic = svg(600, 330, 'Three ways to land a pull request: merge commit, squash, rebase', `
    ${[['Merge commit', 50], ['Squash merge', 150], ['Rebase merge', 250]].map(([n, y]) => txt(20, y - 24, n, { a: 'start', s: 13, c: P.ink2 })).join('')}
    <line x1="40" y1="50" x2="560" y2="50" stroke="${P.accent}" stroke-width="4"/>
    <path d="M140 50 C190 50 190 92 240 92 L340 92 C390 92 390 50 440 50" fill="none" stroke="${P.ok}" stroke-width="4"/>
    ${dot(80, 50, P.white, 'A')}${dot(140, 50, P.white, 'B')}${dot(240, 92, P.okT, '1')}${dot(340, 92, P.okT, '2')}${dot(440, 50, P.accent, 'M', { tc: P.white })}
    ${txt(500, 82, 'keeps every commit', { s: 11.5, c: P.ink2, w: 700 })}
    <line x1="40" y1="150" x2="560" y2="150" stroke="${P.accent}" stroke-width="4"/>
    ${dot(80, 150, P.white, 'A')}${dot(140, 150, P.white, 'B')}${dot(260, 150, P.accent, 'S', { r: 20, tc: P.white })}
    ${txt(420, 182, '1 + 2 squeezed into S', { s: 11.5, c: P.ink2, w: 700 })}
    <line x1="40" y1="250" x2="560" y2="250" stroke="${P.accent}" stroke-width="4"/>
    ${dot(80, 250, P.white, 'A')}${dot(140, 250, P.white, 'B')}${dot(240, 250, P.okT, "1'")}${dot(340, 250, P.okT, "2'")}
    ${txt(470, 282, 'straight line, no merge commit', { s: 11.5, c: P.ink2, w: 700 })}`);

  /* ================= l38 Capstone ================= */
  const prPic = svg(560, 320, 'A pull request card with passing checks and an approval', `
    ${box(30, 24, 500, 270, P.white)}
    <rect x="50" y="46" width="72" height="26" rx="13" fill="${P.ok}"/>${txt(86, 64, 'Open', { s: 12, c: P.white })}
    ${txt(136, 65, 'Add about page  #1', { a: 'start', s: 17 })}
    ${txt(50, 98, 'feature/about → main', { a: 'start', s: 12.5, mono: true, c: P.ink2 })}
    ${[['tests', 'passed'], ['lint', 'passed']].map(([n, s], i) => `<circle cx="64" cy="${136 + i * 34}" r="11" fill="${P.ok}"/><path d="M58 ${136 + i * 34} l4 4 l8 -8" fill="none" stroke="${P.white}" stroke-width="3"/>${txt(84, 141 + i * 34, n + ' ' + s, { a: 'start', s: 13, w: 700 })}`).join('')}
    <rect x="50" y="212" width="460" height="60" rx="12" fill="${P.okT}" stroke="${P.ink}" stroke-width="2"/>${txt(70, 238, 'Ana approved these changes', { a: 'start', s: 13.5 })}${txt(70, 258, 'Looks great. Ship it.', { a: 'start', s: 12, c: P.ink2, w: 700 })}
    <g transform="translate(400 120) rotate(-8)"><rect width="110" height="44" rx="10" fill="${P.white}" stroke="${P.ok}" stroke-width="3"/>${txt(55, 28, 'APPROVED', { s: 14, c: P.ok })}</g>`);

  const shipPic = graph({
    label: 'The pull request is squashed into main and tagged v1.0.0',
    lanes: ['main', 'feature/about'],
    commits: [{ id: 'A', parents: [], msg: 'first save' }, { id: 'B', lane: 1, parents: ['A'], ghost: true }, { id: 'C', lane: 1, parents: ['B'], ghost: true },
      { id: 'S', parents: ['A'], x: 3, hi: true, msg: 'Add about page (#1)' }],
    refs: { main: 'S', 'v1.0.0': 'S', 'origin/main': 'S' }, head: 'main', msgs: true
  });

  const rescuePic = graph({
    label: 'After a bad reset, commits B C D still exist and reflog finds them',
    commits: [{ id: 'A', parents: [], hi: true }, { id: 'B', parents: ['A'], ghost: true }, { id: 'C', parents: ['B'], ghost: true }, { id: 'D', parents: ['C'], ghost: true, msg: 'HEAD@{1}' }],
    refs: { main: 'A' }, head: 'main', msgs: true
  });

  const certPic = svg(560, 340, 'A graduation certificate for Learn GitHub', `
    ${box(30, 24, 500, 280, P.paper2)}
    <rect x="46" y="40" width="468" height="248" rx="10" fill="none" stroke="${P.accent}" stroke-width="2" stroke-dasharray="6 5"/>
    ${txt(280, 92, 'Learn GitHub', { s: 30, c: P.ink })}
    ${txt(280, 124, 'GRADUATE', { s: 13, c: P.accent })}
    ${txt(280, 162, 'from zero to the terminal pro', { s: 14, w: 700, c: P.ink2 })}
    ${['init', 'commit', 'branch', 'merge', 'push', 'PR'].map((w, i) => pill(105 + i * 70, 204, w, i % 2 ? P.okT : P.tint, i % 2 ? P.ok : P.accent)).join('')}
    <circle cx="280" cy="258" r="22" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/><path d="M270 258 l7 7 l14 -14" fill="none" stroke="${P.white}" stroke-width="4" stroke-linecap="round"/>`);

  /* ================= lessons ================= */
  COURSE.add({
    id: 'l34', module: 4, minutes: 10,
    title: 'Big repos.',
    kicker: 'Worktrees, submodules, LFS, sparse',
    summary: 'Some projects are huge, hold other projects inside, or carry giant files. Git has a tool for each of those jobs.',
    parts: [
      {
        pic: worktreePic,
        h: 'Two branches open at once.',
        text: ['Busy on a feature, and a bug fix is urgent? Do not stash. Open a second folder.', 'A <b>worktree</b> is an extra folder that shares the same <code>.git</code>. Each folder has its own branch checked out.'],
        cmds: [
          { c: 'git worktree add ../hotfix hotfix-branch', d: 'Make folder <code>../hotfix</code> with <code>hotfix-branch</code> checked out.' },
          { c: 'git worktree list', d: 'Show every folder linked to this repo.' },
          { c: 'git worktree remove ../hotfix', d: 'Delete that extra folder safely.' },
          { c: 'git worktree prune', d: 'Clean up records of folders you deleted by hand.' }
        ],
        tip: 'One branch can be checked out in only one worktree at a time.'
      },
      {
        pic: submodulePic,
        h: 'A repo inside a repo.',
        text: ['A <b>submodule</b> puts another repo in a folder of yours. Your repo stores only a pin: <b>which commit</b> of it to use.', 'The list of submodules lives in a file called <code>.gitmodules</code>.'],
        cmds: [
          { c: 'git submodule add https://github.com/org/x libs/x', d: 'Add repo x into folder <code>libs/x</code>.' },
          { c: 'git clone --recurse-submodules <url>', d: 'Clone a project and all its submodules in one go.' },
          { c: 'git submodule update --init --recursive', d: 'Already cloned? Fill in the empty submodule folders.' },
          { c: 'git submodule update --remote', d: 'Move each pin to the newest commit of its repo.' },
          { c: 'git submodule status', d: 'Show each submodule and the commit it is pinned to.' },
          { c: "git submodule foreach 'git pull'", d: 'Run one command inside every submodule.' },
          { c: 'git subtree add --prefix=lib https://github.com/org/x main --squash', d: 'The other way: copy repo x into <code>lib/</code> as normal files. No pins to manage.' }
        ],
        warn: 'An empty submodule folder after cloning is normal. Run <code>git submodule update --init --recursive</code>.'
      },
      {
        pic: lfsPic,
        h: 'Giant files go to LFS.',
        text: ['Git keeps every version of every file. A 2 GB design file saved ten times is 20 GB of history.', '<b>Git LFS</b> (Large File Storage) puts a tiny pointer in the repo. The real file waits on a separate server.'],
        cmds: [
          { c: 'git lfs install', d: 'Turn on LFS on your computer. Once per machine.' },
          { c: 'git lfs track "*.psd"', d: 'Send all .psd files to LFS. Writes the rule into <code>.gitattributes</code>.' },
          { c: 'git add .gitattributes', d: 'Commit the rule so your team gets it too.' },
          { c: 'git lfs ls-files', d: 'List the files LFS is handling.' },
          { c: 'git lfs pull', d: 'Download the real big files for this branch.' }
        ]
      },
      {
        pic: sparsePic,
        h: 'Check out only what you need.',
        text: ['Some companies keep every app in one giant repo, a <b>monorepo</b>.', '<b>Sparse checkout</b> keeps the full history but puts only your folders on disk.'],
        cmds: [
          { c: 'git sparse-checkout init --cone', d: 'Turn on sparse mode using whole folders.' },
          { c: 'git sparse-checkout set apps/web', d: 'Keep only <code>apps/web</code> (plus root files) on disk.' },
          { c: 'git sparse-checkout list', d: 'Show which folders you kept.' },
          { c: 'git sparse-checkout disable', d: 'Bring every folder back.' }
        ]
      },
      {
        pic: shallowPic,
        h: 'Download less history.',
        text: ['A <b>shallow clone</b> grabs only the newest commits. Great for quick builds.', 'A <b>partial clone</b> grabs all commits, but fetches old file contents only when you need them.'],
        cmds: [
          { c: 'git clone --depth 1 <url>', d: 'Shallow: only the latest commit.' },
          { c: 'git fetch --unshallow', d: 'Changed your mind? Download the rest of the history.' },
          { c: 'git clone --filter=blob:none <url>', d: 'Partial: all commits, file contents on demand.' }
        ]
      },
      {
        pic: term(['$ git count-objects -vH', 'count: 1843', 'size: 9.12 MiB', 'in-pack: 52310', 'size-pack: 88.40 MiB', '$ git gc', 'Compressing objects: 100% done.', '$ git count-objects -vH', 'count: 0', 'size-pack: 61.02 MiB'], 'housekeeping'),
        h: 'Tidy up the storage.',
        text: ['Over time, Git collects lots of small loose files. Cleanup packs them tight.', 'Git does this by itself sometimes. You can also ask.'],
        cmds: [
          { c: 'git count-objects -vH', d: 'Show how much space the repo uses, in human sizes.' },
          { c: 'git gc', d: 'Garbage collect: pack loose objects, drop unreachable junk.' },
          { c: 'git maintenance run', d: 'Run all background cleanup tasks now.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'match',
        q: 'Match each tool to the problem it solves.',
        pairs: [['worktree', 'Two branches open in two folders at the same time'], ['submodule', 'Another repo pinned inside a folder of yours'], ['LFS', 'Huge design or video files'], ['sparse-checkout', 'Only one app folder from a giant monorepo'], ['--depth 1', 'A quick clone with only the newest commit']],
        why: 'Each of these fixes one kind of "too big" or "too many" problem.'
      },
      {
        type: 'type',
        q: 'Make a new folder <code>../hotfix</code> with branch <code>hotfix-branch</code> checked out.',
        answers: ['git worktree add ../hotfix hotfix-branch'],
        hint: 'git worktree add, then the folder, then the branch.',
        why: 'Now you can fix the bug in ../hotfix without touching your feature folder.'
      },
      {
        type: 'pick',
        q: 'You cloned a project and <code>libs/x</code> is empty. What now?',
        options: ['git submodule update --init --recursive', 'git lfs pull', 'git fetch --unshallow', 'git gc'],
        answer: 0,
        hints: { 1: 'That is for big files, not repos inside repos.', 2: 'That brings back history, not submodule folders.', 3: 'That only tidies storage.' },
        why: 'Submodule folders start empty. update --init --recursive fills them in.'
      },
      {
        type: 'order',
        q: 'Put the steps to start using LFS for .psd files in order.',
        items: ['git lfs install', 'git lfs track "*.psd"', 'git add .gitattributes design.psd', 'git commit -m "Track psd with LFS"', 'git push'],
        why: 'Install once, add the track rule, commit the rule with the file, then push.'
      },
      {
        type: 'fill',
        q: 'Keep only the web app folder on disk.',
        text: 'git sparse-checkout ___ --cone\ngit sparse-checkout ___ apps/web\ngit sparse-checkout ___',
        options: ['init', 'set', 'list', 'add', 'track', 'clone'],
        answer: ['init', 'set', 'list'],
        hint: 'Start it, choose folders, then check what you chose.',
        why: 'init turns it on, set picks folders, list shows them.'
      },
      {
        type: 'bucket',
        q: 'Does the command download less, or tidy what you already have?',
        buckets: ['Download less', 'Tidy what you have'],
        items: [['git clone --depth 1 <url>', 0], ['git clone --filter=blob:none <url>', 0], ['git sparse-checkout set apps/web', 0], ['git gc', 1], ['git maintenance run', 1], ['git worktree prune', 1]],
        why: 'Shallow, partial, and sparse limit what lands on disk. gc, maintenance, and prune clean up.'
      },
      {
        type: 'pick',
        q: 'Which file stores the LFS rules like <code>*.psd</code>?',
        options: ['.gitattributes', '.gitignore', '.gitmodules', '.git/config'],
        answer: 0,
        hints: { 1: 'That file lists what Git should ignore.', 2: 'That one lists submodules.', 3: 'That is local settings, not shared with your team.' },
        why: 'git lfs track writes into .gitattributes, which you commit so everyone gets it.'
      }
    ]
  });

  COURSE.add({
    id: 'l35', module: 4, minutes: 12,
    title: 'Under the hood.',
    kicker: 'Objects, hashes, refs, plumbing',
    summary: 'Open the .git folder and look inside. Git is a tiny database of four kinds of objects, each named by its hash.',
    parts: [
      {
        pic: gitDirPic,
        h: 'The .git folder is the repo.',
        text: ['Everything Git knows lives in one hidden folder: <code>.git</code>. Your files outside it are just the current view.', 'Delete <code>.git</code> and the history is gone. Copy it and you copied the whole repo.'],
        cmds: [
          { c: 'ls .git', d: 'Peek inside the hidden folder.' },
          { c: 'cat .git/HEAD', d: 'See which branch you are on, as plain text.' }
        ],
        warn: 'Look, but do not edit files in <code>.git</code> by hand.'
      },
      {
        pic: objectsPic,
        h: 'Four kinds of objects.',
        text: ['<b>Blob</b>: the contents of one file. <b>Tree</b>: a folder listing blobs and other trees.', '<b>Commit</b>: points to one tree, its parent commits, the author, and the message. <b>Tag</b>: an annotated label that points to a commit.'],
        cmds: [
          { c: 'git cat-file -t a1b2', d: 'Say what type an object is: blob, tree, commit, or tag.' },
          { c: 'git cat-file -p a1b2', d: 'Print an object’s contents in readable form.' },
          { c: 'git cat-file -p HEAD^{tree}', d: 'Print the folder listing of your latest commit.' },
          { c: 'git ls-tree HEAD', d: 'List the files and folders in the latest commit.' }
        ]
      },
      {
        pic: hashPic,
        h: 'Names come from content.',
        text: ['Git runs each object through a hash machine (<b>SHA-1</b>). Out comes a 40-character name.', 'Same content, same name. Change one letter and the name changes. This is <b>content addressing</b>. It also means history cannot be changed quietly.'],
        cmds: [
          { c: 'git hash-object README.md', d: 'Show the name Git would give this file. Saves nothing.' },
          { c: 'git hash-object -w README.md', d: 'Same, but also write the blob into <code>.git/objects</code>.' },
          { c: 'git init --object-format=sha256', d: 'Start a repo that uses the newer, stronger SHA-256 hashes.' }
        ]
      },
      {
        pic: refsPic,
        h: 'Branches are tiny sticky notes.',
        text: ['A branch is a file holding one commit hash. That is all. Making one is instant.', '<b>HEAD</b> is a file too. It usually says which branch you are on.'],
        cmds: [
          { c: 'git rev-parse HEAD', d: 'Turn a name like HEAD or main into its full hash.' },
          { c: 'git show-ref', d: 'List every branch and tag with its hash.' },
          { c: 'git symbolic-ref HEAD', d: 'Show the branch HEAD points to, like <code>refs/heads/main</code>.' }
        ]
      },
      {
        pic: plumbingPic,
        h: 'Porcelain on top, plumbing below.',
        text: ['The commands you use daily are <b>porcelain</b>: shiny and friendly.', 'Under them are <b>plumbing</b> commands: small pipes that scripts use. You can build a commit with only pipes.'],
        cmds: [
          { c: 'git ls-files -s', d: 'Show the index (staging area): each file with its blob hash.' },
          { c: 'git update-index --add hello.txt', d: 'Put a file into the index by hand. The pipe under <code>git add</code>.' },
          { c: 'git write-tree', d: 'Turn the index into a tree object. Prints its hash.' },
          { c: 'git commit-tree 9f3e -p HEAD -m "by hand"', d: 'Make a commit object from tree 9f3e with HEAD as parent.' },
          { c: 'git update-ref refs/heads/main 5c7d', d: 'Move the main sticky note to commit 5c7d.' }
        ],
        tip: 'Plumbing output never changes between versions, so scripts rely on it.'
      },
      {
        pic: packPic,
        h: 'Loose objects get packed.',
        text: ['New objects start as one small file each: <b>loose objects</b>.', 'Cleanup squeezes them into a <b>packfile</b>. It stores only the differences between similar files, so it is much smaller.'],
        cmds: [
          { c: 'git gc', d: 'Pack loose objects into a packfile.' },
          { c: 'git verify-pack -v .git/objects/pack/pack-*.idx', d: 'List what is inside a packfile and how it was squeezed.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'match',
        q: 'Match each object type to what it holds.',
        pairs: [['blob', 'The contents of one file'], ['tree', 'A folder listing of files and subfolders'], ['commit', 'A snapshot pointer, parents, author, message'], ['tag', 'A named label with a message that points to a commit']],
        why: 'Every repo is built from just these four object types.'
      },
      {
        type: 'pick',
        q: 'Two different files have exactly the same contents. How many blobs does Git store?',
        options: ['One', 'Two', 'None', 'It depends on the file names'],
        answer: 0,
        hints: { 1: 'The blob name comes from the content, not the file name.', 2: 'Git must store the content somewhere.', 3: 'Names live in trees, not blobs.' },
        why: 'Same content gives the same hash, so Git stores it once.'
      },
      {
        type: 'bucket',
        q: 'Porcelain or plumbing?',
        buckets: ['Porcelain (daily use)', 'Plumbing (pipes)'],
        items: [['git commit', 0], ['git status', 0], ['git switch', 0], ['git cat-file', 1], ['git hash-object', 1], ['git write-tree', 1], ['git update-ref', 1]],
        why: 'Porcelain is friendly and for humans. Plumbing is small, stable, and for scripts.'
      },
      {
        type: 'type',
        q: 'Print the type of object <code>a1b2</code>.',
        answers: ['git cat-file -t a1b2'],
        hint: 'git cat-file with the flag for type.',
        why: 'cat-file -t answers blob, tree, commit, or tag.'
      },
      {
        type: 'order',
        q: 'Build a commit with only plumbing. Put the steps in order.',
        items: ['git hash-object -w hello.txt', 'git update-index --add hello.txt', 'git write-tree', 'git commit-tree <tree> -m "by hand"', 'git update-ref refs/heads/main <commit>'],
        why: 'Blob first, then the index, then a tree, then a commit, then move the branch to it.'
      },
      {
        type: 'fill',
        q: 'Fill in what <code>.git/HEAD</code> usually contains.',
        text: '___: refs/___/main',
        options: ['ref', 'heads', 'tags', 'hash', 'remotes', 'tree'],
        answer: ['ref', 'heads'],
        hint: 'Look at the left file in picture 4.',
        why: 'HEAD normally points to a branch file in refs/heads.'
      },
      {
        type: 'pick',
        q: 'Why is making a branch instant in Git?',
        options: ['A branch is just a small file holding one hash', 'Git copies files very fast', 'Branches are stored on GitHub', 'Git compresses the whole project'],
        answer: 0,
        hints: { 1: 'Git copies nothing when you branch.', 2: 'Branches exist locally first.', 3: 'Nothing gets compressed when you branch.' },
        why: 'A new branch writes one 41-byte file. No files are copied.'
      }
    ]
  });

  COURSE.add({
    id: 'l36', module: 4, minutes: 12,
    title: 'Rare but real.',
    kicker: 'Bundles, patches, notes, filter-repo',
    summary: 'Tools you will not use every week, but will be very glad to know when the day comes.',
    parts: [
      {
        pic: bundlePic,
        h: 'A whole repo in one file.',
        text: ['No internet? Pack the repo into a single <b>bundle</b> file. Copy it on a USB stick.', 'The other side can clone from the file like it was GitHub.'],
        cmds: [
          { c: 'git bundle create repo.bundle --all', d: 'Pack every branch and tag into one file.' },
          { c: 'git bundle verify repo.bundle', d: 'Check the file is complete and usable.' },
          { c: 'git clone repo.bundle my-app', d: 'Clone from the file into folder <code>my-app</code>.' }
        ]
      },
      {
        pic: patchPic,
        h: 'Commits by email.',
        text: ['Some big projects, like the Linux kernel, take changes as <b>patch</b> files sent by email.', 'A patch is a commit written as text. <code>format-patch</code> writes it. <code>am</code> turns it back into a commit.'],
        cmds: [
          { c: 'git format-patch -1 HEAD', d: 'Write the last commit as a .patch file.' },
          { c: 'git format-patch -3', d: 'Write the last three commits, one file each.' },
          { c: 'git format-patch main..feature', d: 'Write every commit on feature that main does not have.' },
          { c: 'git am 0001-*.patch', d: 'Apply patch files as real commits, author and message included.' },
          { c: 'git diff > fix.patch', d: 'Save your uncommitted changes as a plain patch.' },
          { c: 'git apply --check fix.patch', d: 'Test if a patch would apply cleanly. Changes nothing.' },
          { c: 'git apply fix.patch', d: 'Apply the changes to your files, without committing.' },
          { c: 'git request-pull v1.0 https://github.com/me/app main', d: 'Write a summary asking someone to pull your work since v1.0.' }
        ]
      },
      {
        pic: notesPic,
        h: 'Sticky notes and compare views.',
        text: ['<b>Notes</b> add extra info to a commit without changing its hash.', '<b>range-diff</b> compares two versions of the same branch, for example before and after a rebase.'],
        cmds: [
          { c: 'git notes add -m "tested on Safari 18" C', d: 'Stick a note on commit C.' },
          { c: 'git notes show C', d: 'Read the note on commit C.' },
          { c: 'git range-diff main feature-v1 feature-v2', d: 'Compare commit by commit: what changed between v1 and v2 of a branch.' }
        ]
      },
      {
        pic: orphanPic,
        h: 'Odd jobs.',
        text: ['An <b>orphan</b> branch starts with no history at all. Handy for a docs site that lives apart from the code.', 'You can also zip up a commit, make a commit with no changes, or clean only ignored files.'],
        cmds: [
          { c: 'git switch --orphan gh-pages', d: 'Start a brand new branch with no parent commits.' },
          { c: 'git commit --allow-empty -m "trigger deploy"', d: 'Make a commit that changes nothing. Useful to re-run CI.' },
          { c: 'git archive --format=zip -o site.zip HEAD', d: 'Zip the files of a commit. No .git folder inside.' },
          { c: 'git clean -X -n', d: 'Preview deleting only ignored files (build output). Use <code>-f</code> to really delete.' }
        ]
      },
      {
        pic: filterPic,
        h: 'Rewrite all of history.',
        text: ['Pushed a password or a giant file long ago? It lives in every old commit.', '<b>git filter-repo</b> rewrites every commit without it. Every hash changes, so the whole team must re-clone.'],
        cmds: [
          { c: 'pip install git-filter-repo', d: 'Install it. It is a separate tool, recommended by the Git team.' },
          { c: 'git filter-repo --path .env --invert-paths', d: 'Remove <code>.env</code> from every commit ever.' },
          { c: 'git filter-repo --strip-blobs-bigger-than 10M', d: 'Remove every file bigger than 10 MB from history.' },
          { c: 'git replace <old> <new>', d: 'Make Git quietly show one object in place of another. Rare and advanced.' }
        ],
        warn: 'A leaked password is already stolen. Change the password first, then clean history.'
      },
      {
        pic: comparePic,
        h: 'Compare two branches.',
        text: ['The <b>merge-base</b> is the last commit two branches share. Here it is <b>B</b>.', 'These commands answer: how far apart are we, and what is on each side?'],
        cmds: [
          { c: 'git merge-base main feature', d: 'Print the last commit both branches share.' },
          { c: 'git log --left-right --oneline main...feature', d: 'List commits on each side. &lt; is main only, &gt; is feature only.' },
          { c: 'git cherry -v main', d: 'List your commits that are not in main yet (+ means missing).' },
          { c: 'git rev-list --count HEAD', d: 'Count the commits in your history.' },
          { c: 'git show-branch main feature', d: 'Old-style text chart of which commits are on which branch.' },
          { c: 'git instaweb', d: 'Open a simple web page to browse the repo locally. Needs a small web server.' },
          { c: 'git var GIT_EDITOR', d: 'Print which editor Git will open.' },
          { c: 'git config --list --show-scope', d: 'List every setting and whether it is system, global, or local.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'match',
        q: 'Match each tool to its job.',
        pairs: [['git bundle', 'Put a whole repo into one file for a USB stick'], ['git format-patch', 'Turn commits into files you can email'], ['git am', 'Turn emailed patch files back into commits'], ['git notes', 'Add extra info to a commit without changing it'], ['git filter-repo', 'Remove a file from every commit in history']],
        why: 'Rare tools, each with one clear job.'
      },
      {
        type: 'pick',
        q: 'You pushed an API key three months ago. What do you do <b>first</b>?',
        options: ['Revoke the key and make a new one', 'Run git filter-repo', 'Delete the file and commit', 'Make the repo private'],
        answer: 0,
        hints: { 1: 'Cleaning history is step two. Bots may already have the key.', 2: 'The key is still in old commits.', 3: 'Clones and caches already have it.' },
        why: 'Treat the key as stolen. Revoke it, then clean history with filter-repo.'
      },
      {
        type: 'type',
        q: 'Write the last commit as a patch file.',
        answers: ['git format-patch -1 HEAD', 'git format-patch -1'],
        hint: 'git format-patch, then how many, then which commit.',
        why: 'You get a file like 0001-fix-typo.patch ready to email.'
      },
      {
        type: 'bucket',
        q: 'Does it make a commit, or not?',
        buckets: ['Makes a commit', 'Does not commit'],
        items: [['git am 0001-fix.patch', 0], ['git commit --allow-empty -m "ci"', 0], ['git apply fix.patch', 1], ['git apply --check fix.patch', 1], ['git archive -o site.zip HEAD', 1], ['git notes add -m "ok"', 1]],
        why: 'am and commit create commits. apply only edits files. archive zips. notes do not change commits.'
      },
      {
        type: 'fill',
        q: 'Send a whole repo to a laptop with no internet.',
        text: 'git ___ create repo.bundle --all\n# copy the file over\ngit ___ repo.bundle my-app',
        options: ['bundle', 'clone', 'archive', 'push', 'pack', 'pull'],
        answer: ['bundle', 'clone'],
        why: 'bundle create packs it, clone unpacks it on the other side.'
      },
      {
        type: 'order',
        q: 'Test then apply a patch from a friend, safely.',
        items: ['git apply --check fix.patch', 'git apply fix.patch', 'git diff', 'git commit -am "Apply fix from Raj"'],
        why: 'Check it, apply it, look at the result, then commit.'
      },
      {
        type: 'pick',
        q: 'What does <code>git merge-base main feature</code> print?',
        options: ['The last commit both branches share', 'The newest commit on main', 'A merge commit', 'The number of different commits'],
        answer: 0,
        hints: { 1: 'Think about where the two lines split apart.', 2: 'It never creates anything.', 3: 'That is rev-list --count.' },
        why: 'The merge-base is where the branches split. Git uses it for every merge.'
      }
    ]
  });

  COURSE.add({
    id: 'l37', module: 4, minutes: 11,
    title: 'Team workflows.',
    kicker: 'GitHub flow, Git flow, trunk, conventions',
    summary: 'Every team picks a way to branch, name, and merge. Learn the common ones so you fit in on day one.',
    parts: [
      {
        pic: ghFlowPic,
        h: 'GitHub flow.',
        text: ['One rule: <b>main is always ready to ship</b>.', 'Each change gets a short branch, a pull request, a review, and a merge. Then delete the branch. Most teams start here.']
      },
      {
        pic: gitFlowPic,
        h: 'Git flow.',
        text: ['A bigger system for products with planned releases.', '<b>develop</b> collects features. A <b>release</b> branch gets polished, then merges to <b>main</b>. A <b>hotfix</b> fixes main fast and goes back into develop too.'],
        cmds: [
          { c: 'git switch -c feature/cart develop', d: 'Start a feature from develop.' },
          { c: 'git switch -c release/1.4 develop', d: 'Cut a release branch to polish.' },
          { c: 'git switch -c hotfix/1.4.1 main', d: 'Start an urgent fix from main.' }
        ],
        tip: 'Git flow is heavy. Many web teams find GitHub flow enough.'
      },
      {
        pic: trunkPic,
        h: 'Trunk-based development.',
        text: ['Everyone merges tiny changes into <b>main</b> (the trunk) many times a day.', 'Unfinished work hides behind a <b>feature flag</b>: an on/off switch in the code. Some teams also cut <b>release branches</b> and cherry-pick fixes into them.'],
        cmds: [
          { c: 'git switch -c release/1.x', d: 'Cut a release line from main.' },
          { c: 'git cherry-pick -x <fix-hash>', d: 'Copy one fix from main into the release line, noting where it came from.' }
        ]
      },
      {
        pic: convPic,
        h: 'Conventional commits.',
        text: ['A shared message format: <code>type(scope): what changed</code>.', 'Types: <b>feat</b>, <b>fix</b>, <b>docs</b>, <b>style</b>, <b>refactor</b>, <b>test</b>, <b>chore</b>. A <b>!</b> or a <code>BREAKING CHANGE:</code> footer means it breaks old code.', 'Tools read these messages to pick the next <b>semantic version</b> number automatically.'],
        cmds: [
          { c: 'git commit -m "fix(cart): round prices to 2 decimals"', d: 'A bug fix. Bumps PATCH: 1.4.2 to 1.4.3.' },
          { c: 'git commit -m "feat(login): add Google sign-in"', d: 'A new feature. Bumps MINOR: 1.4.2 to 1.5.0.' },
          { c: 'git commit -m "feat(api)!: remove v1 endpoints"', d: 'Breaking change. Bumps MAJOR: 1.4.2 to 2.0.0.' },
          { c: 'git commit -m "docs: explain setup steps"', d: 'Docs only. No version bump.' }
        ]
      },
      {
        pic: mergePolicyPic,
        h: 'Pick a merge style.',
        text: ['<b>Merge commit</b>: keeps every commit and the branch shape.', '<b>Squash</b>: the whole PR becomes one tidy commit. <b>Rebase</b>: replays the commits in a straight line.', 'The team picks one in the repo settings. Stick to it.'],
        cmds: [
          { c: 'gh pr merge --merge', d: 'Land the PR with a merge commit.' },
          { c: 'gh pr merge --squash', d: 'Land the PR as one squashed commit.' },
          { c: 'gh pr merge --rebase', d: 'Land the PR as a straight line of commits.' }
        ]
      },
      {
        pic: term(['$ git switch main', '$ git pull', '$ git switch -c feature/search-box', '# ... edit, then save small steps ...', '$ git add -p', '$ git commit -m "feat(search): add search box"', '$ git fetch origin', '$ git rebase origin/main', '$ git push -u origin feature/search-box', '$ gh pr create --fill'], 'a good day'),
        h: 'A good daily routine.',
        text: ['<b>Atomic commits</b>: one idea per commit. <b>Small PRs</b>: easy to review, quick to merge.', 'Name branches clearly, like <code>feature/search-box</code> or <code>fix/login-crash</code>. Review the code, never the person.', 'Keep your branch fresh with main so conflicts stay small.'],
        cmds: [
          { c: 'git switch main && git pull', d: 'Start every task from the newest main.' },
          { c: 'git switch -c feature/search-box', d: 'One branch per task, with a clear name.' },
          { c: 'git add -p', d: 'Stage piece by piece so each commit holds one idea.' },
          { c: 'git commit --fixup <hash>', d: 'Make a small fix-up for an earlier commit.' },
          { c: 'git rebase -i --autosquash main', d: 'Fold the fix-ups into the right commits before review.' },
          { c: 'git fetch origin', d: 'Download what the team pushed.' },
          { c: 'git rebase origin/main', d: 'Replay your branch on top of the newest main.' },
          { c: 'git merge origin/main', d: 'Or merge main into your branch, if your team prefers.' },
          { c: 'git push --force-with-lease', d: 'After a rebase, update your PR branch safely.' },
          { c: 'git push -u origin feature/search-box', d: 'First push of the branch, with tracking.' },
          { c: 'gh pr create --fill', d: 'Open the PR using your commit messages.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'match',
        q: 'Match each workflow to its main idea.',
        pairs: [['GitHub flow', 'main always ready, short branches, PR for every change'], ['Git flow', 'develop, release, and hotfix branches around main'], ['Trunk-based', 'tiny changes into main many times a day, behind feature flags'], ['Feature flag', 'an on/off switch that hides unfinished work']],
        why: 'Most teams use GitHub flow or trunk-based. Git flow fits planned releases.'
      },
      {
        type: 'bucket',
        q: 'Which version number does each commit bump? (version 1.4.2)',
        buckets: ['PATCH 1.4.3', 'MINOR 1.5.0', 'MAJOR 2.0.0'],
        items: [['fix: crash on empty cart', 0], ['fix(ui): button color', 0], ['feat: add dark mode', 1], ['feat(search): filters', 1], ['feat!: drop Node 18', 2], ['BREAKING CHANGE: new API', 2]],
        why: 'fix is PATCH, feat is MINOR, a ! or BREAKING CHANGE is MAJOR.'
      },
      {
        type: 'order',
        q: 'Put the daily routine in order.',
        items: ['git switch main', 'git pull', 'git switch -c feature/search-box', 'git commit -m "feat(search): add box"', 'git push -u origin feature/search-box', 'gh pr create --fill'],
        why: 'Fresh main, new branch, commit, push, open the PR.'
      },
      {
        type: 'fill',
        q: 'Write a conventional commit for a new login feature.',
        text: 'git commit -m "___(___): add Google sign-in"',
        options: ['feat', 'login', 'fix', 'chore', 'docs', 'main'],
        answer: ['feat', 'login'],
        why: 'type is feat, scope is login, then a short description.'
      },
      {
        type: 'pick',
        q: 'Your PR has 9 messy commits and the team wants one tidy commit in main. Which merge style?',
        options: ['Squash merge', 'Merge commit', 'Rebase merge', 'Cherry-pick'],
        answer: 0,
        hints: { 1: 'That keeps all 9 commits.', 2: 'That keeps all 9, just in a line.', 3: 'Not how PRs land.' },
        why: 'Squash turns the whole PR into one commit on main.'
      },
      {
        type: 'type',
        q: 'You rebased your PR branch. Update it on GitHub, the safe way.',
        answers: ['git push --force-with-lease', 'git push --force-with-lease origin feature/search-box'],
        hint: 'A force push, but the polite version.',
        why: '--force-with-lease refuses if someone else pushed in the meantime.'
      },
      {
        type: 'pick',
        q: 'Which is a good branch name?',
        options: ['fix/login-crash', 'my-branch', 'stuff2', 'final_final'],
        answer: 0,
        hints: { 1: 'It says nothing about the work.', 2: 'Nobody will know what is inside.', 3: 'That is the file mess from lesson 1.' },
        why: 'Type plus a short description tells the team what the branch is for.'
      },
      {
        type: 'bucket',
        q: 'Good team habit, or bad one?',
        buckets: ['Good habit', 'Bad habit'],
        items: [['One idea per commit', 0], ['Small pull requests', 0], ['Review the code, not the person', 0], ['A 3000-line PR', 1], ['Commit message "stuff"', 1], ['git push --force on a shared branch', 1]],
        why: 'Small, clear, kind, and safe beats big, vague, and forceful.'
      }
    ]
  });

  COURSE.add({
    id: 'l38', module: 4, minutes: 20,
    title: 'Your first real project.',
    kicker: 'Capstone and final exam',
    summary: 'One full mission from an empty folder to a tagged release, using everything you learned. Then the final exam.',
    parts: [
      {
        pic: term(['$ git config --global user.name "Sam Lee"', '$ git config --global user.email "sam@example.com"', '$ git config --global init.defaultBranch main', '$ gh auth login', '✓ Logged in to github.com as samlee', '$ gh auth status', '✓ Git operations protocol: ssh'], 'step 1: setup'),
        h: 'Step 1. Tell Git who you are.',
        text: ['Once per computer: your name, your email, and a login to GitHub.'],
        cmds: [
          { c: 'git config --global user.name "Sam Lee"', d: 'Your name on every commit.' },
          { c: 'git config --global user.email "sam@example.com"', d: 'Your email on every commit.' },
          { c: 'gh auth login', d: 'Log in to GitHub from the terminal.' },
          { c: 'gh auth status', d: 'Check you are logged in.' }
        ]
      },
      {
        pic: areas({ hi: [3], files: { 0: ['README.md'], 2: ['first save'], 3: ['my-site'] }, arrows: [{ f: 0, t: 1, l: 'git add' }, { f: 1, t: 2, l: 'git commit' }, { f: 2, t: 3, l: 'gh repo create --push' }] }),
        h: 'Step 2. Create and publish.',
        text: ['Make a folder, start a repo, save once, then put it on GitHub with one command.'],
        cmds: [
          { c: 'mkdir my-site && cd my-site', d: 'Make the folder and go in.' },
          { c: 'git init', d: 'Start the repo.' },
          { c: 'echo "# My site" > README.md', d: 'Make the first file.' },
          { c: 'git add README.md', d: 'Stage it.' },
          { c: 'git commit -m "first save"', d: 'Take the first photo.' },
          { c: 'gh repo create my-site --public --source=. --push', d: 'Create the GitHub repo, link it as origin, and push.' }
        ]
      },
      {
        pic: graph({
          label: 'A feature branch with two commits, pushed to origin',
          lanes: ['main', 'feature/about'],
          commits: [{ id: 'A', parents: [] }, { id: 'B', lane: 1, parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'], hi: true }],
          refs: { main: 'A', 'feature/about': 'C', 'origin/feature/about': 'C' }, head: 'feature/about'
        }),
        h: 'Step 3. Build on a branch.',
        text: ['Never work straight on main. Make a branch, save small steps, push it.'],
        cmds: [
          { c: 'git switch -c feature/about', d: 'New branch for the about page.' },
          { c: 'git add about.html', d: 'Stage the new page.' },
          { c: 'git commit -m "feat: add about page"', d: 'Save step one.' },
          { c: 'git commit -am "style: center the photo"', d: 'Save step two.' },
          { c: 'git push -u origin feature/about', d: 'Send the branch to GitHub and track it.' }
        ]
      },
      {
        pic: prPic,
        h: 'Step 4. Open a pull request.',
        text: ['Ask the team to look. Checks run by themselves. A teammate reviews and approves.'],
        cmds: [
          { c: 'gh pr create --fill', d: 'Open the PR with your commit messages as text.' },
          { c: 'gh pr checks', d: 'Watch the automatic tests.' },
          { c: 'gh pr review --approve', d: 'What your teammate runs to approve.' },
          { c: 'gh pr view --web', d: 'Open the PR in the browser.' }
        ]
      },
      {
        pic: term(['$ git fetch origin', '$ git merge origin/main', 'CONFLICT (content): Merge conflict in index.html', '$ cat index.html', '<<<<<<< HEAD', '<h1>About Sam</h1>', '=======', '<h1>About us</h1>', '>>>>>>> origin/main', '# edit: keep one line, delete the markers', '$ git add index.html', '$ git commit -m "Merge main, fix title"', '$ git push'], 'step 5: conflict'),
        h: 'Step 5. Fix a conflict.',
        text: ['A teammate changed the same line on main. Git stops and asks you to choose.', 'Pick the right text, delete the markers, add, commit, push.'],
        cmds: [
          { c: 'git fetch origin', d: 'Get the newest main.' },
          { c: 'git merge origin/main', d: 'Bring main into your branch. Conflict appears.' },
          { c: 'git status', d: 'See which files are in conflict.' },
          { c: 'git add index.html', d: 'Mark the conflict as fixed.' },
          { c: 'git commit -m "Merge main, fix title"', d: 'Finish the merge.' },
          { c: 'git push', d: 'Update the PR.' }
        ]
      },
      {
        pic: shipPic,
        h: 'Step 6. Merge, tag, release.',
        text: ['Squash the PR into main. Tag the moment as <b>v1.0.0</b>. Publish a release with notes.'],
        cmds: [
          { c: 'gh pr merge --squash --delete-branch', d: 'Land the PR as one commit and delete the branch.' },
          { c: 'git switch main && git pull', d: 'Get the new main locally.' },
          { c: 'git tag -a v1.0.0 -m "First release"', d: 'Label this commit as version 1.0.0.' },
          { c: 'git push origin v1.0.0', d: 'Send the tag to GitHub.' },
          { c: 'gh release create v1.0.0 --generate-notes', d: 'Publish a release page with auto-written notes.' }
        ]
      },
      {
        pic: rescuePic,
        h: 'Step 7. Rescue a mistake.',
        text: ['Oops: <code>git reset --hard HEAD~3</code> wiped three commits. Do not panic.', 'The <b>reflog</b> remembers where HEAD was. Jump back there.'],
        cmds: [
          { c: 'git reflog', d: 'See every place HEAD has been.' },
          { c: 'git reset --hard HEAD@{1}', d: 'Go back to where you were before the bad reset.' }
        ],
        tip: 'Committed work is very hard to lose in Git. Uncommitted work is easy to lose. Commit often.'
      },
      {
        pic: certPic,
        h: 'You made it.',
        text: ['From zero to a full release, all from the terminal.', 'Pass the final exam below to finish the course.']
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What is the difference between Git and GitHub?',
        options: ['Git tracks history on your computer. GitHub hosts repos online.', 'They are the same thing', 'GitHub is a newer version of Git', 'Git only works with GitHub'],
        answer: 0,
        hints: { 1: 'One is a tool, one is a website.', 2: 'GitHub is a company and website, not a version.', 3: 'Git works fine with no internet at all.' },
        why: 'Git is the tool. GitHub is a place to share Git repos and work together.'
      },
      {
        type: 'order',
        q: 'Order the full mission.',
        items: ['git config --global user.name "Sam"', 'git init', 'git commit -m "first save"', 'gh repo create my-site --public --source=. --push', 'git switch -c feature/about', 'git push -u origin feature/about', 'gh pr create --fill', 'gh pr merge --squash'],
        why: 'Setup, start, save, publish, branch, push, open PR, merge.'
      },
      {
        type: 'match',
        q: 'Match each area to the command that moves work into it.',
        pairs: [['git add', 'Working folder → Staging area'], ['git commit', 'Staging area → Local repo'], ['git push', 'Local repo → GitHub'], ['git pull', 'GitHub → your branch'], ['git restore --staged', 'Staging area → back out']],
        why: 'These five moves are the heart of daily Git.'
      },
      {
        type: 'bucket',
        q: 'Safe, or can lose work?',
        buckets: ['Safe', 'Can lose work'],
        items: [['git status', 0], ['git log', 0], ['git diff', 0], ['git revert HEAD', 0], ['git reset --hard', 1], ['git clean -fd', 1], ['git push --force', 1], ['git checkout -- file', 1]],
        why: 'Looking and reverting are safe. Hard reset, clean, force push, and discarding a file can destroy work.'
      },
      {
        type: 'type',
        q: 'Create and switch to a new branch called <code>feature/about</code>.',
        answers: ['git switch -c feature/about', 'git checkout -b feature/about'],
        hint: 'git switch with the create flag.',
        why: 'switch -c makes the branch and moves you onto it in one step.'
      },
      {
        type: 'fill',
        q: 'Fill in the conflict markers.',
        text: '___ HEAD\n<h1>About Sam</h1>\n___\n<h1>About us</h1>\n___ origin/main',
        options: ['<<<<<<<', '=======', '>>>>>>>', '-------', '#######'],
        answer: ['<<<<<<<', '=======', '>>>>>>>'],
        why: 'Your side is above =======, their side below. Delete all three markers when done.'
      },
      {
        type: 'pick',
        q: 'You committed to the wrong branch (main) and have not pushed. Best fix?',
        options: ['git branch feature, then git reset --hard HEAD~1 on main', 'git push --force', 'Delete the repo and clone again', 'git revert HEAD on main and push'],
        answer: 0,
        hints: { 1: 'That sends the mistake to everyone.', 2: 'Way too much. Nothing is broken.', 3: 'That works but leaves noise. Nothing is pushed yet, so you can move it cleanly.' },
        why: 'The new branch keeps the commit. Then main moves back one step.'
      },
      {
        type: 'type',
        q: 'Show every place HEAD has been, to find a lost commit.',
        answers: ['git reflog', 'git reflog show', 'git log -g'],
        hint: 'The reference log.',
        why: 'reflog is your safety net for almost every mistake.'
      },
      {
        type: 'match',
        q: 'Match the situation to the tool.',
        pairs: [['git stash', 'Park half-done work to switch branches'], ['git bisect', 'Find which commit introduced a bug'], ['git cherry-pick', 'Copy one commit onto another branch'], ['git rebase -i', 'Squash and reword commits before review'], ['git blame', 'See who last changed each line']],
        why: 'Each one saves hours when you pick it at the right time.'
      },
      {
        type: 'pick',
        q: 'Which commands talk to GitHub over the network?',
        options: ['git push', 'git fetch', 'git commit', 'git log'],
        answer: [0, 1],
        hint: 'commit and log only touch your own computer.',
        why: 'push, fetch, pull, and clone use the network. Almost everything else is local.'
      },
      {
        type: 'fill',
        q: 'Ship version 1.0.0.',
        text: 'git ___ -a v1.0.0 -m "First release"\ngit push origin v1.0.0\ngh ___ create v1.0.0 --generate-notes',
        options: ['tag', 'release', 'branch', 'commit', 'push'],
        answer: ['tag', 'release'],
        why: 'tag -a makes an annotated tag. gh release create publishes a release page.'
      },
      {
        type: 'bucket',
        q: 'Git command or GitHub CLI command?',
        buckets: ['git (Git)', 'gh (GitHub CLI)'],
        items: [['merge a branch locally', 0], ['undo with revert', 0], ['look at the reflog', 0], ['open a pull request', 1], ['create a release page', 1], ['fork a repo', 1], ['re-run a failed Actions job', 1]],
        why: 'git handles history. gh handles GitHub things like PRs, releases, forks, and Actions.'
      },
      {
        type: 'type',
        q: 'Your rebase got messy. Cancel it and go back to how things were.',
        answers: ['git rebase --abort'],
        hint: 'git rebase with the give-up flag.',
        why: '--abort puts everything back as it was before the rebase started.'
      },
      {
        type: 'pick',
        q: 'Which file tells Git to never track <code>node_modules/</code>?',
        options: ['.gitignore', '.gitattributes', '.gitmodules', 'README.md'],
        answer: 0,
        hints: { 1: 'That is for LFS and line endings.', 2: 'That lists submodules.', 3: 'That is for humans to read.' },
        why: '.gitignore lists files and folders Git should leave alone.'
      }
    ]
  });
})();
