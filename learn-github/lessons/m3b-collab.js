/* Module 3 (part 2): Collaboration. Pull requests, issues, forks, team rules. */
(function () {
  const { P, graph, term, esc } = GH;

  /* ---------- small drawing helpers ---------- */
  const card = (x, y, w, h, fill, r) => `<rect x="${x + 4}" y="${y + 5}" width="${w}" height="${h}" rx="${r || 14}" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 14}" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const t = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" font-size="${o.s || 13}" font-weight="${o.w || 800}" fill="${o.f || P.ink}"${o.mono ? ' font-family="JetBrains Mono, monospace"' : ''}>${esc(s)}</text>`; };
  const pill = (x, y, s, bg, fg, o) => { o = o || {}; const w = s.length * (o.cw || 7.2) + 20; return `<rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${bg}" stroke="${o.stroke || P.ink}" stroke-width="2"/>` + t(x + w / 2, y + 15.5, s, { a: 'middle', s: o.s || 12, f: fg, mono: o.mono }); };
  const avatar = (cx, cy, r, col, letter) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>` + t(cx, cy + r * .38, letter, { a: 'middle', s: r, f: P.white });
  const check = (x, y, on) => `<rect x="${x}" y="${y}" width="16" height="16" rx="4" fill="${on ? P.ok : P.white}" stroke="${P.ink}" stroke-width="2"/>${on ? `<path d="M${x + 4} ${y + 8.5} l3 3 l5 -6" fill="none" stroke="${P.white}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
  const arrow = (x1, y1, x2, y2, col, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"${dash ? ' stroke-dasharray="7 7"' : ''} marker-end="url(#m3b${col.slice(1)})"/>`;
  const defs = cols => `<defs>${cols.map(c => `<marker id="m3b${c.slice(1)}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${c}"/></marker>`).join('')}</defs>`;
  const cloud = (cx, cy, s, fill) => `<path transform="translate(${cx} ${cy}) scale(${s})" d="M-44 26 a22 22 0 0 1 4 -44 a30 30 0 0 1 56 -4 a20 20 0 0 1 22 48z" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="${2.5 / s}" stroke-linejoin="round"/>`;
  const laptop = (x, y) => `<rect x="${x + 4}" y="${y + 5}" width="120" height="76" rx="8" fill="${P.ink}"/><rect x="${x}" y="${y}" width="120" height="76" rx="8" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/><rect x="${x + 10}" y="${y + 10}" width="100" height="56" rx="4" fill="${P.tint}"/><path d="M${x - 14} ${y + 84} h148 l-10 12 h-128z" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const stack = html => `<div style="display:grid;gap:10px;width:100%">${html}</div>`;
  const cap = s => `<div style="font:800 12px Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:${P.ink2}">${esc(s)}</div>`;

  /* ---------- l25 pictures ---------- */
  const prPage = `<svg viewBox="0 0 560 360" role="img" aria-label="A pull request page: title, open status, branch arrow, a review comment and a green merge button">
    ${defs([P.accent])}
    ${card(16, 14, 524, 326, P.white, 18)}
    <rect x="16" y="14" width="524" height="34" rx="18" fill="${P.sand}"/><rect x="16" y="34" width="524" height="14" fill="${P.sand}"/><line x1="16" y1="48" x2="540" y2="48" stroke="${P.ink}" stroke-width="2.5"/>
    ${[0, 1, 2].map(i => `<circle cx="${38 + i * 18}" cy="31" r="5.5" fill="${[P.danger, P.warn, P.ok][i]}"/>`).join('')}
    ${t(40, 82, 'Add dark mode', { s: 22 })}${t(222, 82, '#12', { s: 22, f: P.mute, w: 700 })}
    ${pill(40, 96, 'Open', P.okT, P.ok)}
    ${pill(104, 96, 'dark-mode', P.tint, P.accent, { mono: true, cw: 7.6 })}${arrow(222, 107, 258, 107, P.accent)}${pill(266, 96, 'main', P.tint, P.accent, { mono: true, cw: 7.6 })}
    ${t(40, 150, 'Conversation', { s: 12.5 })}${t(150, 150, 'Commits 3', { s: 12.5, f: P.mute })}${t(240, 150, 'Files changed 4', { s: 12.5, f: P.mute })}
    <line x1="40" y1="160" x2="134" y2="160" stroke="${P.accent}" stroke-width="3.5"/><line x1="40" y1="162" x2="516" y2="162" stroke="${P.sand}" stroke-width="2"/>
    ${avatar(58, 196, 15, P.warn, 'R')}
    <rect x="84" y="178" width="300" height="40" rx="10" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>${t(98, 203, 'Looks great. One tiny fix?', { s: 13, w: 700 })}
    ${avatar(58, 248, 15, P.accent, 'A')}
    <rect x="84" y="230" width="220" height="40" rx="10" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>${t(98, 255, 'Fixed in commit c4e1.', { s: 13, w: 700 })}
    ${check(40, 290, true)}${t(64, 303, 'All checks passed', { s: 13, f: P.ok })}
    <rect x="378" y="284" width="138" height="34" rx="17" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>${t(447, 306, 'Merge', { a: 'middle', s: 14, f: P.white })}
    <g transform="rotate(-8 452 210)"><rect x="400" y="190" width="110" height="38" rx="10" fill="${P.okT}" stroke="${P.ok}" stroke-width="3"/>${t(455, 215, 'APPROVED', { a: 'middle', s: 14, f: P.ok })}</g>
  </svg>`;

  const loopSteps = [['1', 'branch'], ['2', 'commit'], ['3', 'push'], ['4', 'open PR'], ['5', 'review'], ['6', 'merge'], ['7', 'delete branch'], ['8', 'pull main']];
  const loop = (() => {
    const cx = 280, cy = 180, rx = 210, ry = 128;
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${P.accent}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>`;
    loopSteps.forEach(([n, l], i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / loopSteps.length, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      const w = l.length * 8 + 46;
      s += `<rect x="${x - w / 2 + 3}" y="${y - 17 + 4}" width="${w}" height="34" rx="17" fill="${P.ink}"/><rect x="${x - w / 2}" y="${y - 17}" width="${w}" height="34" rx="17" fill="${i === 3 ? P.accent : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
      s += `<circle cx="${x - w / 2 + 17}" cy="${y}" r="11" fill="${i === 3 ? P.white : P.ink}"/>` + t(x - w / 2 + 17, y + 4.5, n, { a: 'middle', s: 12, f: i === 3 ? P.accent : P.white });
      s += t(x - w / 2 + 34, y + 5, l, { s: 13.5, f: i === 3 ? P.white : P.ink });
    });
    s += t(cx, cy - 6, 'GitHub flow', { a: 'middle', s: 22 }).replace('font-weight="800"', 'font-weight="700" font-family="Fraunces, Georgia, serif"');
    s += t(cx, cy + 18, 'repeat forever', { a: 'middle', s: 13, f: P.mute, w: 700 });
    return `<svg viewBox="0 0 560 360" role="img" aria-label="The GitHub flow loop: branch, commit, push, open PR, review, merge, delete branch, pull main">${s}</svg>`;
  })();

  const reviewPic = `<svg viewBox="0 0 560 330" role="img" aria-label="Three kinds of review: approve, request changes, comment">
    ${[['Approve', '✓', P.ok, P.okT, 'Ship it.'], ['Request changes', '!', P.danger, P.dangerT, 'Fix this first.'], ['Comment', '…', P.accent, P.tint, 'Just a thought.']].map(([h, ic, c, bg, say], i) => {
    const x = 16 + i * 180;
    return card(x, 40, 160, 240, P.white, 16) + `<circle cx="${x + 80}" cy="100" r="34" fill="${bg}" stroke="${P.ink}" stroke-width="2.5"/>` + t(x + 80, 113, ic, { a: 'middle', s: 34, f: c }) +
      t(x + 80, 168, h, { a: 'middle', s: 14.5 }) + `<rect x="${x + 16}" y="190" width="128" height="56" rx="10" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>` + t(x + 80, 223, say, { a: 'middle', s: 13, w: 700, f: P.ink2 });
  }).join('')}
  </svg>`;

  const sized = (pct, html) => `<div style="width:${pct}%">${html}</div>`;
  const strategies = stack(
    cap('1. Merge commit: keeps every commit, adds a join') +
    graph({ label: 'Merge commit', lanes: ['main', 'feature'], commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'M', parents: ['B', 'D'], hi: true }], refs: { main: 'M' }, head: 'main', dx: 70 }) +
    cap('2. Squash: all PR commits become one') +
    sized(62, graph({ label: 'Squash merge', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'S', parents: ['B'], hi: true }], refs: { main: 'S' }, head: 'main', dx: 70 })) +
    cap('3. Rebase: commits replayed in a straight line') +
    sized(80, graph({ label: 'Rebase merge', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: "C'", parents: ['B'], hi: true }, { id: "D'", parents: ["C'"], hi: true }], refs: { main: "D'" }, head: 'main', dx: 70 }))
  );

  /* ---------- l26 pictures ---------- */
  const issueCard = `<svg viewBox="0 0 560 350" role="img" aria-label="An issue card: number 7, title, labels, assignee and a task list">
    ${card(30, 18, 500, 310, P.white, 18)}
    <circle cx="66" cy="62" r="14" fill="${P.okT}" stroke="${P.ok}" stroke-width="3"/><circle cx="66" cy="62" r="4" fill="${P.ok}"/>
    ${t(92, 70, 'Login button does nothing', { s: 21 })}
    ${t(92, 94, '#7 opened by Ana', { s: 12.5, f: P.mute, w: 700 })}
    ${pill(92, 108, 'bug', P.dangerT, P.danger)}${pill(146, 108, 'good first issue', P.okT, P.ok)}${pill(290, 108, 'v1.0', P.sand, P.ink2)}
    <line x1="52" y1="146" x2="508" y2="146" stroke="${P.sand}" stroke-width="2"/>
    ${t(56, 176, 'Steps to fix', { s: 14 })}
    ${check(56, 192, true)}${t(82, 205, 'Find the broken click handler', { s: 13.5, w: 700 })}
    ${check(56, 222, false)}${t(82, 235, 'Fix it and add a test', { s: 13.5, w: 700 })}
    ${check(56, 252, false)}${t(82, 265, 'Ask @raj to review', { s: 13.5, w: 700 })}
    <rect x="370" y="168" width="140" height="70" rx="12" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>${t(386, 190, 'Assignee', { s: 11.5, f: P.mute })}${avatar(398, 214, 13, P.warn, 'R')}${t(420, 219, 'raj', { s: 13.5 })}
    <rect x="370" y="250" width="140" height="56" rx="12" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>${t(386, 272, 'Milestone', { s: 11.5, f: P.mute })}${t(386, 293, 'v1.0 launch', { s: 13.5 })}
    <rect x="56" y="284" width="180" height="10" rx="5" fill="${P.sand}"/><rect x="56" y="284" width="60" height="10" rx="5" fill="${P.ok}"/>${t(246, 294, '1 of 3 tasks', { s: 12, f: P.mute, w: 700 })}
  </svg>`;

  const autoClose = `<svg viewBox="0 0 560 280" role="img" aria-label="A pull request that says Fixes #7 closes issue 7 when it merges">
    ${defs([P.ok])}
    ${card(20, 40, 230, 170, P.white, 16)}
    ${t(40, 74, 'Pull request #15', { s: 15 })}
    <rect x="40" y="90" width="190" height="34" rx="8" fill="${P.sand}"/>${t(52, 112, 'Fixes #7', { s: 14, mono: true })}
    <rect x="40" y="148" width="110" height="34" rx="17" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>${t(95, 170, 'Merged', { a: 'middle', s: 13.5, f: P.white })}
    ${arrow(264, 125, 316, 125, P.ok)}
    ${t(290, 108, 'auto', { a: 'middle', s: 12, f: P.ok })}
    ${card(330, 40, 210, 170, P.white, 16)}
    ${t(350, 74, 'Issue #7', { s: 15 })}
    ${t(350, 100, 'Login button does nothing', { s: 12, w: 700, f: P.ink2 })}
    <rect x="350" y="148" width="104" height="34" rx="17" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>${t(402, 170, 'Closed', { a: 'middle', s: 13.5, f: P.accent })}
    ${t(280, 252, 'Also works: Closes #7, Resolves #7', { a: 'middle', s: 13, f: P.ink2, w: 700 })}
  </svg>`;

  const board = (() => {
    const cols = [['To do', P.sand, ['Dark mode', 'Fix typo']], ['In progress', P.warnT, ['Login bug #7']], ['Done', P.okT, ['Add README', 'Logo']]];
    let s = '';
    cols.forEach(([h, bg, items], i) => {
      const x = 16 + i * 180;
      s += card(x, 20, 164, 300, bg, 16) + t(x + 16, 50, h, { s: 14 }) + pill(x + 112, 34, String(items.length), P.white, P.ink, { s: 11 });
      items.forEach((it, k) => { s += `<rect x="${x + 12}" y="${70 + k * 64}" width="140" height="52" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + t(x + 24, 100 + k * 64, it, { s: 13 }); });
    });
    return `<svg viewBox="0 0 560 340" role="img" aria-label="A project board with three columns: to do, in progress, done">${s}</svg>`;
  })();

  /* ---------- l27 pictures ---------- */
  const forkVsClone = `<svg viewBox="0 0 580 360" role="img" aria-label="Fork copies the original repo to your GitHub account. Clone copies your fork to your laptop. A pull request goes back to the original.">
    ${defs([P.accent, P.ok, P.warn])}
    ${cloud(120, 90, 1.4, P.tint)}${t(126, 104, 'original', { a: 'middle', s: 15 })}${t(126, 168, 'octo/website', { a: 'middle', s: 12.5, mono: true, f: P.ink2 })}
    ${cloud(450, 90, 1.4, P.okT)}${t(456, 104, 'your fork', { a: 'middle', s: 15 })}${t(456, 168, 'you/website', { a: 'middle', s: 12.5, mono: true, f: P.ink2 })}
    ${arrow(208, 74, 362, 74, P.accent)}${pill(250, 40, 'fork', P.white, P.accent, { mono: true, stroke: P.accent })}
    ${arrow(456, 186, 456, 238, P.ok)}${pill(468, 198, 'clone', P.white, P.ok, { mono: true, stroke: P.ok })}
    ${laptop(396, 246)}${t(456, 284, 'your laptop', { a: 'middle', s: 13 })}
    ${arrow(370, 120, 214, 120, P.warn, true)}${pill(226, 132, 'pull request', P.white, P.warn, { mono: true, stroke: P.warn })}
    ${t(40, 300, 'Fork = copy on GitHub.', { s: 15 })}${t(40, 326, 'Clone = copy on your computer.', { s: 15 })}
  </svg>`;

  const remotes = term(['$ gh repo fork octo/website --clone', '✓ Created fork you/website', '✓ Cloned fork', '✓ Added remote upstream', '$ cd website', '$ git remote -v', 'origin    git@github.com:you/website.git (fetch)', 'origin    git@github.com:you/website.git (push)', 'upstream  git@github.com:octo/website.git (fetch)', 'upstream  git@github.com:octo/website.git (push)'], 'fork in one line');

  const syncGraph = stack(
    cap('Before: the original moved ahead') +
    graph({ label: 'upstream/main is ahead of your main', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], hi: true }, { id: 'D', parents: ['C'], hi: true }], refs: { main: 'B', 'upstream/main': 'D' }, head: 'main', dx: 80 }) +
    cap('After fetch, merge, push: everyone matches') +
    graph({ label: 'main, origin/main and upstream/main all on D', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'], hi: true }], refs: { main: 'D', 'origin/main': 'D', 'upstream/main': 'D' }, head: 'main', dx: 80 })
  );

  const houseFiles = (() => {
    const files = [['README.md', 'What it is, how to run it', P.tint], ['CONTRIBUTING.md', 'How to help', P.okT], ['LICENSE', 'What you may do with it', P.warnT], ['CODE_OF_CONDUCT.md', 'How we treat people', P.dangerT]];
    let s = '';
    files.forEach(([n, d, bg], i) => {
      const x = 16 + (i % 2) * 272, y = 16 + Math.floor(i / 2) * 156;
      s += card(x, y, 252, 136, P.white, 16) + `<path d="M${x + 22} ${y + 22} h38 l14 14 v56 h-52z" fill="${bg}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
        t(x + 90, y + 52, n, { s: 13.5, mono: true }) + t(x + 90, y + 76, d, { s: 12.5, w: 700, f: P.ink2 });
    });
    return `<svg viewBox="0 0 560 330" role="img" aria-label="Four house-rule files: README, CONTRIBUTING, LICENSE, CODE OF CONDUCT">${s}</svg>`;
  })();

  const licenses = `<svg viewBox="0 0 560 300" role="img" aria-label="Three common licenses compared: MIT, Apache 2.0, GPL">
    ${[['MIT', 'Use it for anything.', 'Keep the notice.', P.okT], ['Apache 2.0', 'Like MIT, plus', 'a patent promise.', P.tint], ['GPL', 'Share your changes', 'under GPL too.', P.warnT]].map(([n, a, b, bg], i) => {
    const x = 16 + i * 180;
    return card(x, 30, 164, 200, bg, 16) + t(x + 82, 82, n, { a: 'middle', s: 22 }).replace('font-weight="800"', 'font-weight="700" font-family="Fraunces, Georgia, serif"') +
      t(x + 82, 130, a, { a: 'middle', s: 13, w: 700 }) + t(x + 82, 152, b, { a: 'middle', s: 13, w: 700 });
  }).join('')}
    ${t(280, 276, 'No LICENSE file means nobody may reuse the code.', { a: 'middle', s: 14, f: P.danger })}
  </svg>`;

  /* ---------- l28 pictures ---------- */
  const ladder = (() => {
    const lv = [['Read', 'look and clone', P.sand], ['Triage', '+ manage issues and PRs', P.tint], ['Write', '+ push to branches', P.okT], ['Maintain', '+ repo settings, no danger zone', P.warnT], ['Admin', '+ everything, even delete', P.dangerT]];
    let s = '';
    lv.forEach(([n, d, bg], i) => {
      const y = 262 - i * 58, x = 30 + i * 40, w = 500 - i * 40;
      s += card(x, y, w, 46, bg, 12) + t(x + 16, y + 29, n, { s: 15 }) + t(x + 110, y + 29, d, { s: 13, w: 700, f: P.ink2 });
    });
    s += t(30, 30, 'More power going up', { s: 13, f: P.mute });
    return `<svg viewBox="0 0 560 330" role="img" aria-label="Permission ladder from read up to admin">${s}</svg>`;
  })();

  const shield = `<svg viewBox="0 0 560 320" role="img" aria-label="A shield guards the main branch. Rules: needs a PR, needs 1 approval, checks must pass, no force push">
    ${graph({ commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }], refs: { main: 'C' }, head: 'main', dx: 60 }).replace(/^<svg[^>]*>/, '<g transform="translate(10 120)">').replace(/<\/svg>$/, '</g>')}
    <path d="M180 74 l60 -24 l60 24 v52 c0 44 -30 70 -60 84 c-30 -14 -60 -40 -60 -84z" transform="translate(-20 30)" fill="${P.tint}" stroke="${P.ink}" stroke-width="3"/>
    <rect x="203" y="150" width="34" height="28" rx="5" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/><path d="M209 150 v-10 a11 11 0 0 1 22 0 v10" fill="none" stroke="${P.ink}" stroke-width="3"/>
    ${[['Pull request required', true], ['1 approving review', true], ['Status checks pass', true], ['No force push', true], ['No deleting main', true]].map(([r], i) => check(320, 70 + i * 40, true) + t(346, 83 + i * 40, r, { s: 13.5 })).join('')}
  </svg>`;

  const codeowners = term(['# file: .github/CODEOWNERS', '# pattern        owner', '*                @ana', '*.js             @octo/frontend-team', '/docs/           @raj', '.github/         @octo/admins'], 'CODEOWNERS');

  const depFile = term(['# file: .github/dependabot.yml', 'version: 2', 'updates:', '  - package-ecosystem: "npm"', '    directory: "/"', '    schedule:', '      interval: "weekly"'], 'dependabot.yml');

  const blocked = term(['$ git push', 'remote: error: GH013: Repository rule violations found', 'remote: - Push cannot contain secrets', 'remote:   Found: GitHub Personal Access Token', 'remote:   in config.js line 3', ' ! [remote rejected] main -> main (push declined)', '# remove the secret, then rotate it', '$ git log --show-signature -1', 'Good signature from Ana', '# the commit shows a Verified badge on GitHub'], 'push protection');

  /* =========================== l25 =========================== */
  COURSE.add({
    id: 'l25', module: 3, minutes: 14,
    title: 'Pull requests.',
    kicker: 'Ask, review, merge',
    summary: 'A pull request is how teams change main safely. You push a branch, ask for a review, talk about it, then merge. All of it works from the terminal with <code>gh pr</code>.',
    parts: [
      {
        pic: prPage,
        h: 'A pull request is a polite ask.',
        text: ['You made a branch. Now you ask: "Please <b>pull</b> my branch into main."', 'That ask is a <b>pull request</b>, or <b>PR</b>. It has a title, a number, the changes, comments, checks, and a Merge button.'],
        tip: 'GitLab calls the same thing a merge request. Same idea.'
      },
      {
        pic: loop,
        h: 'The GitHub flow loop.',
        text: ['Almost every team works in this loop. Small branch, small PR, merge, repeat.', 'Main always works. New work always happens on a branch.'],
        cmds: [
          { c: 'git switch -c dark-mode', d: '1. Make a branch for one job.' },
          { c: 'git commit -am "Add dark mode"', d: '2. Save your work.' },
          { c: 'git push -u origin dark-mode', d: '3. Send the branch to GitHub.' },
          { c: 'gh pr create --fill', d: '4. Open the PR.' },
          { c: 'gh pr merge --squash --delete-branch', d: '6 and 7. Merge, then delete the branch.' },
          { c: 'git switch main && git pull', d: '8. Get the new main back on your laptop.' }
        ]
      },
      {
        pic: term(['$ gh pr create --fill', 'Creating pull request for dark-mode into main', 'https://github.com/you/site/pull/12', '$ gh pr create --draft --title "WIP: dark mode"', '$ gh pr create --reviewer raj --assignee @me --label ui'], 'open a PR'),
        h: 'Open a PR from the terminal.',
        text: ['<code>gh pr create</code> asks a few questions, then opens the PR. Flags answer them up front.', 'A <b>draft</b> PR says "not ready yet, but look if you want". It cannot be merged.'],
        cmds: [
          { c: 'gh pr create', d: 'Open a PR. It asks for title and body.' },
          { c: 'gh pr create --fill', d: 'Use your commit messages as the title and body.' },
          { c: 'gh pr create --title "Add dark mode" --body "Closes #7"', d: 'Give the title and body yourself.' },
          { c: 'gh pr create --draft', d: 'Open it as a draft, not ready to merge.' },
          { c: 'gh pr create --base main', d: 'Pick the branch you want to merge into.' },
          { c: 'gh pr create --reviewer raj', d: 'Ask raj to review it.' },
          { c: 'gh pr create --assignee @me', d: 'Assign the PR to yourself.' },
          { c: 'gh pr create --label ui', d: 'Add a label.' },
          { c: 'gh pr create --web', d: 'Finish writing it in the browser.' }
        ]
      },
      {
        pic: term(['$ gh pr list', '#12  Add dark mode    dark-mode   OPEN', '#11  Fix footer       fix-footer  DRAFT', '$ gh pr checkout 12', 'Switched to branch dark-mode', '$ gh pr checks', '✓ build   ✓ tests   ✓ lint'], 'look around'),
        h: 'Look at PRs.',
        text: ['List PRs, read one, see its changes, or pull it onto your laptop to try it.', '<code>gh pr checkout 12</code> is the best trick here. You get the PR branch in one line.'],
        cmds: [
          { c: 'gh pr list', d: 'All open PRs in this repo.' },
          { c: 'gh pr status', d: 'Your PRs, and PRs waiting for your review.' },
          { c: 'gh pr view 12', d: 'Read PR 12 in the terminal.' },
          { c: 'gh pr view 12 --web', d: 'Open PR 12 in the browser.' },
          { c: 'gh pr diff 12', d: 'Show the changed lines.' },
          { c: 'gh pr checkout 12', d: 'Download PR 12 and switch to its branch.' },
          { c: 'gh pr checks 12', d: 'Show if the automatic tests passed.' },
          { c: 'git fetch origin pull/12/head:pr-12', d: 'The plain Git way: copy PR 12 into a branch called pr-12.' }
        ]
      },
      {
        pic: reviewPic,
        h: 'Review and talk.',
        text: ['A reviewer reads the changes and answers in one of three ways.', 'Got feedback? Fix it on the <b>same branch</b> and push again. The PR updates by itself. No new PR needed.'],
        cmds: [
          { c: 'gh pr review 12 --approve', d: 'Say yes, it is good to merge.' },
          { c: 'gh pr review 12 --request-changes -b "Please add a test"', d: 'Say no, fix this first.' },
          { c: 'gh pr review 12 --comment -b "Nice idea"', d: 'Leave a note without a yes or no.' },
          { c: 'gh pr comment 12 -b "Pushed the fix"', d: 'Add a normal comment to the chat.' },
          { c: 'gh pr edit 12 --add-label ready', d: 'Change labels, title, reviewers and more.' },
          { c: 'gh pr ready 12', d: 'Turn a draft into a real PR.' },
          { c: 'git push', d: 'New commits on the branch show up in the PR.' }
        ]
      },
      {
        pic: strategies,
        h: 'Three ways to merge.',
        text: ['<b>Merge commit</b> keeps every commit and adds a join. <b>Squash</b> turns the whole PR into one neat commit. <b>Rebase</b> replays the commits in a straight line.', 'Many teams squash, so main reads like a list of finished features.'],
        cmds: [
          { c: 'gh pr merge 12 --merge', d: 'Merge with a merge commit.' },
          { c: 'gh pr merge 12 --squash', d: 'Squash all commits into one.' },
          { c: 'gh pr merge 12 --rebase', d: 'Replay commits on top of main.' },
          { c: 'gh pr merge 12 --squash --delete-branch', d: 'Merge and clean up the branch.' },
          { c: 'gh pr merge 12 --auto --squash', d: 'Merge by itself once checks and reviews pass.' },
          { c: 'gh pr close 12', d: 'Close without merging.' },
          { c: 'gh pr reopen 12', d: 'Open a closed PR again.' }
        ],
        tip: 'Delete the branch after merging. Its work is safe inside main now.'
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What is a pull request?',
        options: ['A request to merge your branch into another branch', 'A command that downloads code', 'A bug report', 'A copy of a repo on your account'],
        answer: 0,
        hints: { 1: 'That sounds like git pull. A PR is a conversation on GitHub.', 2: 'That is an issue. Lesson 26.', 3: 'That is a fork. Lesson 27.' },
        why: 'A PR asks the owners to pull your branch into main, with review and checks first.'
      },
      {
        type: 'order',
        q: 'Put the GitHub flow loop in order.',
        items: ['git switch -c fix-footer', 'git commit -am "Fix footer"', 'git push -u origin fix-footer', 'gh pr create --fill', 'gh pr merge --squash --delete-branch', 'git switch main && git pull'],
        why: 'Branch, commit, push, open PR, merge, then bring main home.'
      },
      {
        type: 'match',
        q: 'Match each command to what it does.',
        pairs: [['gh pr checkout 12', 'Get PR 12 onto your laptop'], ['gh pr diff 12', 'Show the changed lines'], ['gh pr checks 12', 'See if the tests passed'], ['gh pr status', 'Your PRs and review requests'], ['gh pr ready 12', 'Turn a draft into a real PR']],
        why: 'These five cover most days of reviewing.'
      },
      {
        type: 'bucket',
        q: 'Which review action is it?',
        buckets: ['Approve', 'Request changes', 'Just comment'],
        items: [['gh pr review 12 --approve', 0], ['"Looks good, ship it"', 0], ['gh pr review 12 --request-changes -b "add a test"', 1], ['"This breaks login, fix first"', 1], ['gh pr review 12 --comment -b "nice"', 2], ['"Have you seen this library?"', 2]],
        why: 'Approve says yes. Request changes blocks. Comment is a note with no verdict.'
      },
      {
        type: 'pick',
        q: 'A reviewer asked for a fix. What do you do?',
        options: ['Commit the fix on the same branch and git push', 'Close the PR and open a new one', 'Delete the branch', 'Email the fix'],
        answer: 0,
        hint: 'The PR follows the branch.',
        why: 'The PR watches the branch. Push new commits and the PR updates itself.'
      },
      {
        type: 'bucket',
        q: 'Which merge style gives this result?',
        buckets: ['Merge commit', 'Squash', 'Rebase'],
        items: [['Adds a join commit with two parents', 0], ['Keeps every commit and the branch shape', 0], ['The whole PR becomes one commit', 1], ['gh pr merge --squash', 1], ['Commits replayed in a straight line', 2], ['gh pr merge --rebase', 2]],
        why: 'Merge keeps the shape, squash makes one commit, rebase keeps the commits but makes them a straight line.'
      },
      {
        type: 'fill',
        q: 'Open a draft PR into main, and ask raj to review.',
        text: 'gh pr ___ --___ --base ___ --reviewer raj',
        options: ['create', 'draft', 'main', 'merge', 'web', 'origin'],
        answer: ['create', 'draft', 'main'],
        hint: 'You are creating a PR that is not ready yet, aimed at main.',
        why: 'gh pr create --draft --base main --reviewer raj.'
      },
      {
        type: 'type',
        q: 'Merge PR 12 as one squashed commit and delete its branch.',
        prompt: '~/site $',
        answers: ['gh pr merge 12 --squash --delete-branch', 'gh pr merge 12 --delete-branch --squash', 'gh pr merge 12 -s -d', 'gh pr merge 12 -d -s', 'gh pr merge --squash --delete-branch 12'],
        hint: 'Start with gh pr merge 12, then two flags.',
        why: 'gh pr merge 12 --squash --delete-branch. Short form: -s -d.'
      }
    ]
  });

  /* =========================== l26 =========================== */
  COURSE.add({
    id: 'l26', module: 3, minutes: 12,
    title: 'Issues and projects.',
    kicker: 'To-do cards for code',
    summary: 'Issues are to-do cards: bugs, ideas, and tasks. You can make them, label them, link them to PRs, and move them across a board, all from the terminal.',
    parts: [
      {
        pic: issueCard,
        h: 'An issue is a to-do card.',
        text: ['Found a bug? Have an idea? Write an <b>issue</b>. It gets a number, like <b>#7</b>.', 'Issues use Markdown. <code>- [ ]</code> makes a checkbox task list. <code>@raj</code> pings a person.'],
        tip: 'Labels say what kind of card it is. Milestones group cards for a release, like v1.0.'
      },
      {
        pic: term(['$ gh issue create --title "Login button does nothing" --label bug', 'https://github.com/you/site/issues/7', '$ gh issue list --assignee @me', '#7  Login button does nothing  bug', '$ gh issue view 7'], 'issues'),
        h: 'Make and find issues.',
        text: ['<code>gh issue create</code> makes a card. <code>gh issue list</code> finds cards, with filters.'],
        cmds: [
          { c: 'gh issue create', d: 'Make an issue. It asks for title and body.' },
          { c: 'gh issue create --title "Login broken" --body "Click does nothing"', d: 'Give title and body up front.' },
          { c: 'gh issue create --label bug --assignee raj', d: 'Add a label and a person.' },
          { c: 'gh issue create --milestone "v1.0"', d: 'Put it in a milestone.' },
          { c: 'gh issue list', d: 'All open issues.' },
          { c: 'gh issue list --label bug', d: 'Only issues with the bug label.' },
          { c: 'gh issue list --assignee @me', d: 'Only issues assigned to you.' },
          { c: 'gh issue list --state closed', d: 'Closed issues instead of open ones.' },
          { c: 'gh issue view 7', d: 'Read issue 7.' }
        ]
      },
      {
        pic: term(['$ gh issue comment 7 -b "I can reproduce this"', '$ gh issue edit 7 --add-label "good first issue"', '$ gh label create needs-design --color FFAA00', '$ gh issue close 7', '✓ Closed issue #7'], 'tidy up'),
        h: 'Talk, label, close.',
        text: ['Comment on a card, change its labels, close it when done, reopen it if it comes back.', 'Labels are yours to invent. Common ones: <b>bug</b>, <b>enhancement</b>, <b>good first issue</b>.'],
        cmds: [
          { c: 'gh issue comment 7 -b "I can reproduce this"', d: 'Add a comment.' },
          { c: 'gh issue edit 7 --add-label bug', d: 'Add a label. Also --remove-label, --title, --add-assignee.' },
          { c: 'gh issue close 7', d: 'Close the issue.' },
          { c: 'gh issue reopen 7', d: 'Open it again.' },
          { c: 'gh label list', d: 'See all labels in the repo.' },
          { c: 'gh label create needs-design --color FFAA00 --description "Waiting on design"', d: 'Make a new label.' }
        ]
      },
      {
        pic: autoClose,
        h: 'Link code to issues.',
        text: ['Write <b>Fixes #7</b> in a PR description or commit message. When that merges into main, issue 7 closes by itself.', '<code>gh issue develop</code> makes a branch tied to the issue, so the link is there from the start.'],
        cmds: [
          { c: 'gh issue develop 7 --checkout', d: 'Make a branch for issue 7 and switch to it.' },
          { c: 'git commit -m "Fix login click (fixes #7)"', d: 'Mention the issue in a commit.' },
          { c: 'gh pr create --title "Fix login" --body "Closes #7"', d: 'The PR will close issue 7 on merge.' }
        ],
        tip: 'Only the words fix, close, resolve and their forms (fixes, closed, resolves) close issues. "Related to #7" just links.'
      },
      {
        pic: term(['.github/', '├── ISSUE_TEMPLATE/', '│   ├── bug_report.md', '│   └── feature_request.md', '└── pull_request_template.md', '# pull_request_template.md', '## What changed', '## How to test', '- [ ] I added tests'], 'templates'),
        h: 'Templates fill the blank page.',
        text: ['Put template files in a <code>.github</code> folder. New issues and PRs start pre-filled.', 'So every bug report asks for steps to reproduce, and every PR asks how to test it.']
      },
      {
        pic: board,
        h: 'Boards and discussions.',
        text: ['A <b>Project</b> is a board. Cards move from <b>To do</b> to <b>Done</b>. Cards can be issues and PRs from many repos.', '<b>Discussions</b> are a forum tab for questions and ideas that are not tasks yet.'],
        cmds: [
          { c: 'gh project list', d: 'Your project boards. Needs: gh auth refresh -s project.' },
          { c: 'gh project item-add 1 --owner "@me" --url https://github.com/you/site/issues/7', d: 'Put issue 7 on board number 1.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket',
        q: 'Issue or pull request?',
        buckets: ['Issue', 'Pull request'],
        items: [['"The login button is broken"', 0], ['"Idea: add dark mode"', 0], ['A to-do card with a task list', 0], ['"Here is my code, please merge"', 1], ['Has a Files changed tab', 1], ['Has a Merge button', 1]],
        why: 'Issues describe work. Pull requests carry code.'
      },
      {
        type: 'pick',
        q: 'Which PR description closes issue 7 when it merges?',
        options: ['Fixes #7', 'About #7', 'See issue 7', 'Issue: seven'],
        answer: 0,
        hint: 'You need a closing keyword plus #7.',
        why: 'Fixes, Closes and Resolves followed by #7 close the issue on merge.'
      },
      {
        type: 'pick',
        q: 'Which of these close issue 12 on merge?',
        options: ['Closes #12', 'Resolves #12', 'Related to #12', 'fixed #12', 'Look at #12'],
        answer: [0, 1, 3],
        hint: 'Fix, close and resolve, in any form.',
        why: 'Closes, Resolves and fixed all work. "Related to" and "Look at" only link.'
      },
      {
        type: 'match',
        q: 'Match each command to what it does.',
        pairs: [['gh issue list --assignee @me', 'Cards assigned to you'], ['gh issue list --state closed', 'Finished cards'], ['gh issue develop 7 --checkout', 'Branch for issue 7'], ['gh issue reopen 7', 'Bring a closed card back'], ['gh label list', 'See every label']],
        why: 'List with filters, develop for branches, reopen for comebacks, label list for the label set.'
      },
      {
        type: 'order',
        q: 'Fix a bug from issue to closed.',
        items: ['gh issue create --title "Login broken" --label bug', 'gh issue develop 7 --checkout', 'git commit -am "Fix login (fixes #7)"', 'git push -u origin HEAD', 'gh pr create --fill', 'gh pr merge --squash'],
        why: 'Issue, branch, commit with the keyword, push, PR, merge. The issue closes by itself.'
      },
      {
        type: 'fill',
        q: 'Where does each template file go?',
        text: '.github/___/bug_report.md\n.github/___',
        options: ['ISSUE_TEMPLATE', 'pull_request_template.md', 'templates', 'pr.txt', 'issues'],
        answer: ['ISSUE_TEMPLATE', 'pull_request_template.md'],
        hint: 'Look at the folder tree in picture 5.',
        why: 'Issue templates live in .github/ISSUE_TEMPLATE/. The PR template is .github/pull_request_template.md.'
      },
      {
        type: 'type',
        q: 'Add the label <code>bug</code> to issue 7.',
        prompt: '~/site $',
        answers: ['gh issue edit 7 --add-label bug', 'gh issue edit 7 --add-label "bug"', 'gh issue edit --add-label bug 7'],
        hint: 'gh issue edit, the number, then --add-label.',
        why: 'gh issue edit 7 --add-label bug.'
      },
      {
        type: 'type',
        q: 'List only the open issues with the label <code>bug</code>.',
        prompt: '~/site $',
        answers: ['gh issue list --label bug', 'gh issue list -l bug', 'gh issue list --label "bug"'],
        hint: 'gh issue list plus a filter flag.',
        why: 'gh issue list --label bug. Short form: -l bug.'
      }
    ]
  });

  /* =========================== l27 =========================== */
  COURSE.add({
    id: 'l27', module: 3, minutes: 13,
    title: 'Forks and open source.',
    kicker: 'Help on projects you do not own',
    summary: 'You cannot push to a stranger\'s repo. So you fork it: make your own copy on GitHub, change it, and send a pull request back. This is how open source works.',
    parts: [
      {
        pic: forkVsClone,
        h: 'Fork on GitHub, clone to your laptop.',
        text: ['<b>Fork</b>: copy someone\'s repo into <b>your</b> GitHub account. You can push to your copy.', '<b>Clone</b>: copy a repo from GitHub to <b>your computer</b>.', 'Then a PR carries your change back to the original.']
      },
      {
        pic: remotes,
        h: 'Fork in one line.',
        text: ['<code>gh repo fork --clone</code> forks, clones, and wires up two remotes for you.', '<b>origin</b> is your fork. You push here. <b>upstream</b> is the original. You only read from it.'],
        cmds: [
          { c: 'gh repo fork octo/website --clone', d: 'Fork the repo and clone your fork.' },
          { c: 'git remote -v', d: 'Check the remotes: origin and upstream.' },
          { c: 'git remote add upstream https://github.com/octo/website.git', d: 'Add upstream by hand if you forked on the website.' }
        ]
      },
      {
        pic: syncGraph,
        h: 'Keep your fork fresh.',
        text: ['The original keeps moving. Your fork does not move by itself.', 'Fetch from upstream, merge into your main, then push to origin. Or press <b>Sync fork</b> on your fork\'s GitHub page.'],
        cmds: [
          { c: 'git fetch upstream', d: 'Download new commits from the original.' },
          { c: 'git switch main', d: 'Go to your main branch.' },
          { c: 'git merge upstream/main', d: 'Bring the new commits into your main.' },
          { c: 'git rebase upstream/main', d: 'Or replay your branch on top instead.' },
          { c: 'git push origin main', d: 'Update your fork on GitHub.' },
          { c: 'gh repo sync', d: 'Sync from the terminal in one step.' }
        ],
        tip: 'Never work on main in a fork. Keep main as a clean copy, and branch from it.'
      },
      {
        pic: term(['$ git switch -c fix-typo', '$ git commit -am "Fix typo in README"', '$ git push -u origin fix-typo', '$ gh pr create --repo octo/website --fill', 'Creating pull request for you:fix-typo into main in octo/website', 'https://github.com/octo/website/pull/88'], 'send it back'),
        h: 'Send your change back.',
        text: ['Branch, commit, push to <b>your fork</b>. Then open a PR on the <b>original</b> repo.', 'The owners review it. If they merge it, you are an open source contributor.'],
        cmds: [
          { c: 'git switch -c fix-typo', d: 'A branch for one small fix.' },
          { c: 'git push -u origin fix-typo', d: 'Push it to your fork.' },
          { c: 'gh pr create --repo octo/website', d: 'Open the PR on the original repo.' }
        ]
      },
      {
        pic: houseFiles,
        h: 'Read the house rules first.',
        text: ['<b>README</b> says what the project is. <b>CONTRIBUTING</b> says how they want help. <b>CODE_OF_CONDUCT</b> says how to treat people.', '<b>LICENSE</b> says what you are allowed to do with the code.']
      },
      {
        pic: licenses,
        h: 'Licenses in one breath.',
        text: ['<b>MIT</b>: do anything, keep the copyright notice. <b>Apache 2.0</b>: the same, plus a promise about patents. <b>GPL</b>: if you share a changed version, it must stay GPL.', 'Look for the <b>good first issue</b> label to find a friendly first task. Be kind in every comment. A real person reads it.'],
        warn: 'A repo with no LICENSE file is not free to copy, even if it is public.'
      }
    ],
    quiz: [
      {
        type: 'bucket',
        q: 'Fork or clone?',
        buckets: ['Fork', 'Clone'],
        items: [['Copy lands on your GitHub account', 0], ['Lets you push when you do not own the repo', 0], ['gh repo fork', 0], ['Copy lands on your computer', 1], ['git clone', 1], ['Lets you edit files in your code editor', 1]],
        why: 'Fork is a copy on GitHub. Clone is a copy on your machine. You usually do both.'
      },
      {
        type: 'match',
        q: 'In a forked repo, match each remote.',
        pairs: [['origin', 'Your fork. You push here.'], ['upstream', 'The original. You fetch from here.'], ['upstream/main', 'The original\'s main, as last fetched'], ['origin/main', 'Your fork\'s main on GitHub']],
        why: 'Push to origin, fetch from upstream.'
      },
      {
        type: 'order',
        q: 'Sync your fork\'s main with the original.',
        items: ['git fetch upstream', 'git switch main', 'git merge upstream/main', 'git push origin main'],
        why: 'Download, go to main, merge the new commits, update your fork.'
      },
      {
        type: 'pick',
        q: 'You pushed a fix to your fork. Where do you open the PR?',
        options: ['On the original repo, from your fork\'s branch', 'On your fork, into your fork\'s main', 'Nowhere. Pushing is enough.', 'In an issue'],
        answer: 0,
        hint: 'The owners of the original need to see it.',
        why: 'The PR goes to the original, so its owners can review and merge it. gh pr create --repo owner/repo.'
      },
      {
        type: 'match',
        q: 'Match the file to its job.',
        pairs: [['README.md', 'What it is and how to run it'], ['CONTRIBUTING.md', 'How to send help'], ['LICENSE', 'What you may do with the code'], ['CODE_OF_CONDUCT.md', 'How to treat people']],
        why: 'Read these four before your first PR to any project.'
      },
      {
        type: 'bucket',
        q: 'Which license fits?',
        buckets: ['MIT', 'Apache 2.0', 'GPL'],
        items: [['Shortest: do anything, keep the notice', 0], ['Includes a patent promise', 1], ['Shared changes must stay under the same license', 2]],
        why: 'MIT is minimal. Apache adds patents. GPL is share-alike.'
      },
      {
        type: 'fill',
        q: 'Add the original repo as a remote.',
        text: 'git remote ___ ___ https://github.com/octo/website.git',
        options: ['add', 'upstream', 'origin', 'push', 'fork'],
        answer: ['add', 'upstream'],
        hint: 'origin is already your fork.',
        why: 'git remote add upstream <url>. The name upstream is a habit, not a rule, but everyone uses it.'
      },
      {
        type: 'type',
        q: 'Fork <code>octo/website</code> and clone it in one command.',
        prompt: '~ $',
        answers: ['gh repo fork octo/website --clone', 'gh repo fork octo/website --clone=true', 'gh repo fork --clone octo/website'],
        hint: 'gh repo fork, the repo name, then a flag.',
        why: 'gh repo fork octo/website --clone. It also adds the upstream remote.'
      }
    ]
  });

  /* =========================== l28 =========================== */
  COURSE.add({
    id: 'l28', module: 3, minutes: 13,
    title: 'Team rules.',
    kicker: 'Permissions, protection, robots',
    summary: 'A team repo needs rules. Who can push, what must happen before main changes, who reviews which files, and robots that watch for danger.',
    parts: [
      {
        pic: ladder,
        h: 'Who can do what.',
        text: ['People you add to a repo are <b>collaborators</b>. Each gets a level.', '<b>Read</b> can look. <b>Triage</b> can sort issues. <b>Write</b> can push. <b>Maintain</b> can change settings. <b>Admin</b> can do anything, even delete.'],
        cmds: [
          { c: 'gh api -X PUT repos/you/site/collaborators/raj -f permission=push', d: 'Invite raj with write access. API names: pull, triage, push, maintain, admin.' },
          { c: 'gh api repos/you/site/collaborators', d: 'List collaborators.' }
        ],
        tip: 'On the website: Settings, then Collaborators. Give people the lowest level that does the job.'
      },
      {
        pic: shield,
        h: 'Protect main.',
        text: ['A <b>ruleset</b> (or branch protection rule) guards a branch. It can say:', '<b>No push without a PR.</b> <b>At least 1 approval.</b> <b>Checks must pass.</b> <b>No force push.</b> <b>No deleting.</b> <b>Signed commits only.</b>'],
        cmds: [
          { c: 'gh ruleset list', d: 'See the rulesets on this repo.' },
          { c: 'gh ruleset view 42', d: 'Read ruleset 42 in detail.' },
          { c: 'gh ruleset check main', d: 'See which rules apply to main.' }
        ],
        tip: 'Set rules on the website: Settings, then Rules, then Rulesets.'
      },
      {
        pic: codeowners,
        h: 'CODEOWNERS picks reviewers.',
        text: ['A file called <code>.github/CODEOWNERS</code> says who owns which files.', 'Touch a <code>.js</code> file and the frontend team is asked to review. Automatically. Rules lower in the file win.'],
        cmds: [
          { c: 'echo "*.js @octo/frontend-team" >> .github/CODEOWNERS', d: 'Make the frontend team own every .js file.' }
        ]
      },
      {
        pic: term(['$ gh repo edit --enable-squash-merge --enable-merge-commit=false', '$ gh repo edit --delete-branch-on-merge', '$ gh repo edit --enable-auto-merge', '✓ Edited repository you/site'], 'merge settings'),
        h: 'Choose how PRs merge.',
        text: ['A repo can allow or block each merge style. Many teams allow only squash.', 'Turn on <b>auto-delete</b> so merged branches clean themselves up. Turn on <b>auto-merge</b> so PRs merge as soon as they pass.'],
        cmds: [
          { c: 'gh repo edit --enable-squash-merge', d: 'Allow squash merging.' },
          { c: 'gh repo edit --enable-merge-commit=false', d: 'Block plain merge commits.' },
          { c: 'gh repo edit --enable-rebase-merge=false', d: 'Block rebase merging.' },
          { c: 'gh repo edit --delete-branch-on-merge', d: 'Delete branches after merge, automatically.' },
          { c: 'gh repo edit --enable-auto-merge', d: 'Allow gh pr merge --auto.' }
        ]
      },
      {
        pic: depFile,
        h: 'Dependabot watches your parts.',
        text: ['Your project uses other people\'s packages. Sometimes they have holes.', '<b>Dependabot alerts</b> warn you. <b>Dependabot updates</b> open PRs that bump the version for you. Add <code>.github/dependabot.yml</code> to switch on weekly update PRs.']
      },
      {
        pic: blocked,
        h: 'Secrets and signatures.',
        text: ['<b>Secret scanning</b> looks for passwords and keys in your code. <b>Push protection</b> blocks the push before the secret even lands.', '<b>Signed commits</b> prove a commit really came from you. GitHub shows a green <b>Verified</b> badge. A rule can require them.'],
        cmds: [
          { c: 'git log --show-signature -1', d: 'Check the signature on the last commit.' }
        ],
        warn: 'If a secret was pushed, removing it is not enough. Revoke it and make a new one. Lesson 31 covers the cleanup.'
      }
    ],
    quiz: [
      {
        type: 'order',
        q: 'Sort the levels from least power to most.',
        items: ['Read', 'Triage', 'Write', 'Maintain', 'Admin'],
        why: 'Read, triage, write, maintain, admin. Give the lowest level that works.'
      },
      {
        type: 'match',
        q: 'Match each level to what it adds.',
        pairs: [['Read', 'Look and clone'], ['Triage', 'Label and close issues'], ['Write', 'Push to branches'], ['Maintain', 'Change settings, no danger zone'], ['Admin', 'Delete the repo']],
        why: 'Each level adds a bit more power.'
      },
      {
        type: 'bucket',
        q: 'Can a ruleset on main do this?',
        buckets: ['Yes, a rule can', 'No, not a rule'],
        items: [['Require a pull request', 0], ['Require 1 approving review', 0], ['Require checks to pass', 0], ['Block force pushes', 0], ['Require signed commits', 0], ['Write the code for you', 1], ['Make reviews faster', 1]],
        why: 'Rules gate what reaches main. They cannot do the work.'
      },
      {
        type: 'pick',
        q: 'What does this line in CODEOWNERS do? <code>*.js @octo/frontend-team</code>',
        options: ['Asks the frontend team to review any PR that changes a .js file', 'Lets only the frontend team read .js files', 'Deletes .js files', 'Makes the frontend team admins'],
        answer: 0,
        hint: 'CODEOWNERS is about reviewers.',
        why: 'CODEOWNERS requests reviews from owners. With a rule, their approval becomes required.'
      },
      {
        type: 'match',
        q: 'Match the robot to its job.',
        pairs: [['Dependabot alerts', 'Warn about a package with a known hole'], ['Dependabot updates', 'Open PRs that bump package versions'], ['Secret scanning', 'Find keys already in the code'], ['Push protection', 'Block a push that contains a key']],
        why: 'Two watch your packages, two watch for secrets.'
      },
      {
        type: 'fill',
        q: 'Make merged branches delete themselves, and allow auto-merge.',
        text: 'gh repo ___ --___ --enable-auto-merge',
        options: ['edit', 'delete-branch-on-merge', 'create', 'prune', 'set'],
        answer: ['edit', 'delete-branch-on-merge'],
        hint: 'You are editing repo settings.',
        why: 'gh repo edit --delete-branch-on-merge --enable-auto-merge.'
      },
      {
        type: 'pick',
        q: 'Push protection blocked your push. It found an API key. What now?',
        options: ['Remove the key from the commit, push again, and revoke the key', 'Push with --force', 'Turn off push protection', 'Rename the file'],
        answer: 0,
        hint: 'Never fight the guard. Remove the secret.',
        why: 'Take the key out, push clean commits, and replace the key to be safe.'
      },
      {
        type: 'type',
        q: 'List the rulesets on this repo.',
        prompt: '~/site $',
        answers: ['gh ruleset list', 'gh rs list', 'gh ruleset ls'],
        hint: 'gh, then the thing, then list.',
        why: 'gh ruleset list. Then gh ruleset view <id> to read one.'
      }
    ]
  });
})();
