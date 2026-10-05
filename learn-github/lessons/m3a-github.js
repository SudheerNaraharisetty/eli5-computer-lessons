/* Module 3a: GitHub. Lessons 20 to 24. */
(function () {
  const { P, graph, term, areas, esc } = GH;
  const MONO = 'JetBrains Mono, monospace';

  // small helpers for drawings
  const box = (x, y, w, h, fill, r) => `<rect x="${x + 4}" y="${y + 5}" width="${w}" height="${h}" rx="${r || 14}" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 14}" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const txt = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 800}"${o.m ? ` font-family="${MONO}"` : ''} fill="${o.f || P.ink}">${esc(s)}</text>`; };
  const pill = (x, y, s, fill, col, mono) => { const w = s.length * (mono ? 7.6 : 7.2) + 22; return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>${txt(x + w / 2, y + 16.5, s, { s: 12, f: col || P.ink, m: mono })}`; };
  const laptop = (x, y, label) => `<g transform="translate(${x} ${y})"><rect x="4" y="5" width="120" height="78" rx="10" fill="${P.ink}"/><rect width="120" height="78" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><rect x="10" y="10" width="100" height="58" rx="5" fill="${P.tint}"/><path d="M-14 84 h148 l-10 14 h-128z" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>${label ? txt(60, 122, label, { s: 13 }) : ''}</g>`;
  const cloud = (x, y, label, fill) => `<g transform="translate(${x} ${y})"><path d="M8 82 a22 22 0 0 1 4 -44 a30 30 0 0 1 56 -6 a22 22 0 0 1 40 10 a20 20 0 0 1 4 40z" transform="translate(4 5)" fill="${P.ink}"/><path d="M8 82 a22 22 0 0 1 4 -44 a30 30 0 0 1 56 -6 a22 22 0 0 1 40 10 a20 20 0 0 1 4 40z" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>${label ? txt(62, 66, label, { s: 14 }) : ''}</g>`;
  const arrow = (x1, y1, x2, y2, col, id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="${col}"/></marker></defs><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col}" stroke-width="3.5" stroke-linecap="round" marker-end="url(#${id})"/>`;
  const key = (x, y, fill) => `<g transform="translate(${x} ${y})"><circle cx="22" cy="22" r="20" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="22" cy="22" r="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><path d="M42 18 h56 v10 h-8 v10 h-10 v-10 h-8 v8 h-10 v-8 h-20z" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/></g>`;
  const lock = (x, y, fill) => `<g transform="translate(${x} ${y})"><path d="M14 40 v-14 a22 22 0 0 1 44 0 v14" fill="none" stroke="${P.ink}" stroke-width="6"/><rect x="4" y="44" width="74" height="4" rx="2" fill="${P.ink}"/><rect x="0" y="38" width="72" height="56" rx="10" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="36" cy="60" r="7" fill="${P.ink}"/><rect x="33" y="62" width="6" height="16" rx="3" fill="${P.ink}"/></g>`;

  /* ================= l20 GitHub tour ================= */
  const profile = `<svg viewBox="0 0 560 320" role="img" aria-label="A GitHub profile card with an avatar, a username and a grid of green activity squares">
    ${box(20, 20, 520, 280, P.white, 20)}
    <circle cx="96" cy="100" r="46" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="96" cy="86" r="16" fill="${P.accent}"/><path d="M66 128 a30 26 0 0 1 60 0" fill="${P.accent}"/>
    ${txt(170, 84, 'Sam Rivera', { a: 'start', s: 22, w: 800 })}${txt(170, 108, '@sam-codes', { a: 'start', s: 14, f: P.mute, m: true })}
    ${pill(170, 120, '12 repositories', P.sand)}${pill(318, 120, '4 stars', P.warnT, P.warn)}
    ${txt(48, 184, 'ACTIVITY', { a: 'start', s: 11, f: P.ink2 })}
    ${Array.from({ length: 4 * 22 }, (_, i) => { const c = i % 22, r = Math.floor(i / 22); const lvl = (c * 7 + r * 3) % 5; const f = [P.sand, P.okT, '#9FD3BC', '#4FA683', P.ok][lvl]; return `<rect x="${48 + c * 21}" y="${196 + r * 21}" width="16" height="16" rx="4" fill="${f}" stroke="${P.ink}" stroke-width="1"/>`; }).join('')}
  </svg>`;

  const tabs = ['Code', 'Issues', 'Pull requests', 'Actions', 'Settings'];
  let tx = 40;
  const tabRow = tabs.map((t, i) => { const w = t.length * 7.4 + 24; const s = `<rect x="${tx}" y="104" width="${w}" height="28" rx="8" fill="${i === 0 ? P.ink : P.paper2}" stroke="${P.ink}" stroke-width="2"/>${txt(tx + w / 2, 122.5, t, { s: 12, f: i === 0 ? P.white : P.ink })}`; tx += w + 8; return s; }).join('');
  const repoPage = `<svg viewBox="0 0 600 400" role="img" aria-label="A simple drawing of a repository page with tabs, star watch and fork buttons, a file list, a green Code button and a README">
    ${box(16, 16, 568, 368, P.white, 18)}
    <rect x="16" y="16" width="568" height="34" rx="18" fill="${P.sand}"/><rect x="16" y="34" width="568" height="16" fill="${P.sand}"/><path d="M16 50 h568" stroke="${P.ink}" stroke-width="2.5"/>
    <circle cx="40" cy="33" r="6" fill="${P.danger}"/><circle cx="58" cy="33" r="6" fill="${P.warn}"/><circle cx="76" cy="33" r="6" fill="${P.ok}"/>
    ${txt(40, 82, 'sam-codes / pizza-app', { a: 'start', s: 17, m: true })}${pill(272, 66, 'Public', P.okT, P.ok)}
    ${pill(352, 66, '★ Star 4', P.paper2)}${pill(440, 66, 'Watch', P.paper2)}${pill(508, 66, 'Fork', P.paper2)}
    ${tabRow}
    <rect x="40" y="150" width="380" height="120" rx="10" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>
    ${['README.md', 'index.html', 'style.css', 'app.js'].map((f, i) => `${txt(58, 176 + i * 26, f, { a: 'start', s: 12.5, m: true })}<path d="M40 ${186 + i * 26} h380" stroke="${P.sand}" stroke-width="${i < 3 ? 2 : 0}"/>`).join('')}
    <rect x="440" y="150" width="120" height="36" rx="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>${txt(500, 173, '<> Code ▾', { s: 13, f: P.white })}
    <rect x="40" y="286" width="520" height="80" rx="10" fill="${P.tint}" stroke="${P.ink}" stroke-width="2"/>${txt(58, 312, 'README.md', { a: 'start', s: 11, f: P.accent, m: true })}${txt(58, 340, 'Pizza App', { a: 'start', s: 20 })}${txt(58, 358, 'Order pizza in two taps.', { a: 'start', s: 12, w: 600, f: P.ink2 })}
  </svg>`;

  const pubPriv = `<svg viewBox="0 0 560 300" role="img" aria-label="A public repo is a glass box anyone can look into. A private repo is a locked box only invited people can open.">
    ${box(30, 40, 220, 200, P.okT, 20)}
    ${[0, 1, 2].map(i => `<rect x="${70 + i * 48}" y="96" width="36" height="46" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>`).join('')}
    <circle cx="90" cy="190" r="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="90" cy="190" r="5" fill="${P.ink}"/><circle cx="140" cy="190" r="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="140" cy="190" r="5" fill="${P.ink}"/><circle cx="190" cy="190" r="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="190" cy="190" r="5" fill="${P.ink}"/>
    ${txt(140, 278, 'Public: anyone can see', { s: 15, f: P.ok })}
    ${box(310, 40, 220, 200, P.dangerT, 20)}
    ${lock(384, 70, P.white)}
    ${pill(358, 190, 'invited only', P.white, P.danger)}
    ${txt(420, 278, 'Private: only you + invited', { s: 15, f: P.danger })}
  </svg>`;

  const btn3 = `<svg viewBox="0 0 560 280" role="img" aria-label="Three buttons. Star is a bookmark and a thank you. Watch sends you updates. Fork makes your own copy on GitHub.">
    ${box(24, 40, 156, 200, P.warnT, 18)}
    <path d="M102 76 l12 26 l28 3 l-21 19 l6 28 l-25 -14 l-25 14 l6 -28 l-21 -19 l28 -3z" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    ${txt(102, 184, 'Star', { s: 18 })}${txt(102, 208, 'bookmark + thanks', { s: 12, w: 700, f: P.ink2 })}
    ${box(202, 40, 156, 200, P.tint, 18)}
    <path d="M232 112 q48 -44 96 0 q-48 44 -96 0z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="280" cy="112" r="15" fill="${P.accent}"/><circle cx="280" cy="112" r="6" fill="${P.ink}"/>
    ${txt(280, 184, 'Watch', { s: 18 })}${txt(280, 208, 'get updates', { s: 12, w: 700, f: P.ink2 })}
    ${box(380, 40, 156, 200, P.okT, 18)}
    <path d="M458 150 v-26 M458 124 q0 -18 -24 -26 M458 124 q0 -18 24 -26" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="434" cy="90" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="482" cy="90" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="458" cy="154" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>
    ${txt(458, 184, 'Fork', { s: 18 })}${txt(458, 208, 'your own copy', { s: 12, w: 700, f: P.ink2 })}
  </svg>`;

  const mdRaw = ['# Pizza App', '', 'Order **fast** pizza.', '', '- Cheese', '- Pepperoni', '', 'Run `npm start`', '', '[Docs](https://ex.com)'];
  const markdown = `<svg viewBox="0 0 600 340" role="img" aria-label="Left: README.md written in Markdown. Right: how GitHub shows it.">
    ${box(16, 30, 270, 290, P.white, 16)}${txt(30, 56, 'README.md (you type)', { a: 'start', s: 12, f: P.mute })}
    ${mdRaw.map((l, i) => txt(30, 86 + i * 22, l, { a: 'start', s: 13, w: 700, m: true, f: l.startsWith('#') ? P.accent : P.ink })).join('')}
    ${arrow(292, 175, 316, 175, P.accent, 'mdA')}
    ${box(316, 30, 268, 290, P.paper2, 16)}${txt(330, 56, 'GitHub shows', { a: 'start', s: 12, f: P.mute })}
    <text x="330" y="96" font-size="26" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.ink}">Pizza App</text><path d="M330 106 h236" stroke="${P.sand}" stroke-width="2"/>
    <text x="330" y="134" font-size="14" font-weight="600" fill="${P.ink}">Order <tspan font-weight="800">fast</tspan> pizza.</text>
    <circle cx="336" cy="160" r="3.5" fill="${P.ink}"/>${txt(348, 165, 'Cheese', { a: 'start', s: 14, w: 600 })}<circle cx="336" cy="184" r="3.5" fill="${P.ink}"/>${txt(348, 189, 'Pepperoni', { a: 'start', s: 14, w: 600 })}
    <text x="330" y="226" font-size="14" font-weight="600" fill="${P.ink}">Run</text><rect x="362" y="210" width="96" height="22" rx="6" fill="${P.sand}"/>${txt(410, 226, 'npm start', { s: 12.5, m: true })}
    <text x="330" y="262" font-size="14" font-weight="800" fill="${P.accent}" text-decoration="underline">Docs</text>
  </svg>`;

  const codeBtn = `<svg viewBox="0 0 560 300" role="img" aria-label="The green Code button opens a box with three ways to copy the repo: HTTPS, SSH and GitHub CLI">
    <rect x="30" y="24" width="130" height="40" rx="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>${txt(95, 49, '<> Code ▾', { s: 14, f: P.white })}
    ${box(30, 78, 500, 196, P.white, 16)}
    ${[['HTTPS', 'https://github.com/sam-codes/pizza-app.git', 1], ['SSH', 'git@github.com:sam-codes/pizza-app.git', 0], ['GitHub CLI', 'gh repo clone sam-codes/pizza-app', 0]].map(([n, u, on], i) => `
      <rect x="50" y="${96 + i * 58}" width="460" height="46" rx="10" fill="${on ? P.tint : P.paper2}" stroke="${P.ink}" stroke-width="2"/>
      ${txt(64, 114 + i * 58, n, { a: 'start', s: 12, f: P.accent })}${txt(64, 132 + i * 58, u, { a: 'start', s: 12.5, m: true })}
      <rect x="474" y="${106 + i * 58}" width="26" height="26" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/><rect x="480" y="${112 + i * 58}" width="11" height="13" rx="2" fill="none" stroke="${P.ink}" stroke-width="2"/>`).join('')}
  </svg>`;

  const org = `<svg viewBox="0 0 580 320" role="img" aria-label="An organization holds repos and teams of people. Your profile README is a repo named after your username.">
    ${box(20, 24, 330, 270, P.paper2, 20)}
    ${txt(185, 56, 'Organization: pizza-co', { s: 15 })}
    ${[['web team', P.tint, 40], ['mobile team', P.okT, 190]].map(([n, f, x]) => `${box(x, 74, 136, 100, f, 14)}${[0, 1, 2].map(k => `<circle cx="${x + 34 + k * 34}" cy="112" r="13" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>`).join('')}${txt(x + 68, 154, n, { s: 13 })}`).join('')}
    ${['pizza-app', 'pizza-api', 'menu-site'].map((r, i) => pill(40 + i * 100, 202, r, P.white, P.ink, true)).join('')}
    ${txt(185, 262, 'shared repos, shared people', { s: 12, w: 700, f: P.ink2 })}
    ${box(380, 24, 180, 270, P.warnT, 20)}
    ${txt(470, 56, 'Profile README', { s: 14 })}
    <rect x="398" y="74" width="144" height="26" rx="13" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>${txt(470, 91, 'sam-codes/sam-codes', { s: 10.5, m: true })}
    <rect x="398" y="116" width="144" height="150" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>
    ${txt(470, 146, 'Hi, I am Sam', { s: 15 })}${txt(470, 170, 'I build pizza', { s: 12, w: 600, f: P.ink2 })}${txt(470, 188, 'apps.', { s: 12, w: 600, f: P.ink2 })}
    ${txt(470, 240, 'shows on your profile', { s: 11, w: 700, f: P.mute })}
  </svg>`;

  COURSE.add({
    id: 'l20', module: 3, minutes: 8,
    title: 'Tour of GitHub.',
    kicker: 'The website, page by page',
    summary: 'Git lives on your computer. GitHub is a website that keeps a copy of your repos online, so friends can see them, help, and build with you.',
    parts: [
      {
        pic: profile,
        h: 'Your home on the internet.',
        text: ['Make a free account at <b>github.com</b>. Your <b>profile</b> shows your repos and a grid of green squares.', 'Each green square is a day you did something. Darker means busier.'],
        tip: 'Pick a username you are happy to put on a job application. It shows in every link to your work.'
      },
      {
        pic: repoPage,
        h: 'The repo page.',
        text: ['Every repo gets a page. Along the top are the <b>tabs</b>.', '<b>Code</b> shows the files. <b>Issues</b> is the to-do list. <b>Pull requests</b> is where changes get reviewed. <b>Actions</b> runs robots. <b>Settings</b> is only for owners.']
      },
      {
        pic: pubPriv,
        h: 'Public or private.',
        text: ['A <b>public</b> repo is a glass box. The whole world can look, copy, and learn.', 'A <b>private</b> repo is a locked box. Only you and people you invite can see it.'],
        tip: 'You can switch later in Settings. Never put passwords in a repo, public or private.'
      },
      {
        pic: btn3,
        h: 'Star, watch, fork.',
        text: ['<b>Star</b> is a bookmark and a thank you to the author.', '<b>Watch</b> sends you updates when things happen.', '<b>Fork</b> makes your own copy of someone else\'s repo, under your account.']
      },
      {
        pic: markdown,
        h: 'README is the front door.',
        text: ['A file called <b>README.md</b> shows up on the repo page, under the files. It says what the project is and how to use it.', 'It is written in <b>Markdown</b>: plain text with a few symbols. <code>#</code> makes a heading, <code>**word**</code> makes bold, <code>-</code> makes a list, backticks make <code>code</code>, and <code>[text](url)</code> makes a link. Three backticks on their own line start and end a code block.']
      },
      {
        pic: codeBtn,
        h: 'The green Code button.',
        text: ['It hands you the repo\'s address in three flavors: <b>HTTPS</b>, <b>SSH</b>, and <b>GitHub CLI</b>. You paste it into your terminal to download the repo.', 'Press the <b>.</b> key on any repo page to open <b>github.dev</b>, a code editor right in the browser.'],
        cmds: [
          { c: 'git clone https://github.com/sam-codes/pizza-app.git', d: 'Download the repo using the HTTPS address.' },
          { c: 'gh repo clone sam-codes/pizza-app', d: 'Same thing with the GitHub CLI address.' }
        ]
      },
      {
        pic: org,
        h: 'Organizations and teams.',
        text: ['An <b>organization</b> is a shared account for a company or a club. It owns repos. People join it and get grouped into <b>teams</b>.', 'Make a repo with the <b>exact same name as your username</b>. Its README becomes the welcome text on your profile. That is your <b>profile README</b>.']
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What is the difference between Git and GitHub?',
        options: ['Git runs on your computer. GitHub is a website that hosts repos online.', 'They are two names for the same thing.', 'GitHub runs on your computer. Git is the website.', 'Git is only for teams, GitHub is only for one person.'],
        answer: 0,
        why: 'Git is the tool. GitHub is one place to keep Git repos online and work with others.'
      },
      {
        type: 'match',
        q: 'Match each tab to what you find there.',
        pairs: [['Code', 'The files and the README'], ['Issues', 'The to-do list and bug reports'], ['Pull requests', 'Changes waiting for review'], ['Actions', 'Robots that test and build your code'], ['Settings', 'Owner-only switches like public or private']],
        why: 'Five tabs, five jobs. You will visit all of them in this module.'
      },
      {
        type: 'bucket',
        q: 'Who can see it?',
        buckets: ['Public repo', 'Private repo'],
        items: [['Anyone on the internet', 0], ['Shows up in search for everyone', 0], ['Strangers can fork it', 0], ['Only you and invited people', 1], ['Good for a secret school project', 1], ['Hidden from search', 1]],
        why: 'Public is a glass box. Private is a locked box with a guest list.'
      },
      {
        type: 'match',
        q: 'Match each button to what it does.',
        pairs: [['Star', 'Bookmark it and say thanks'], ['Watch', 'Get notified about activity'], ['Fork', 'Make your own copy on GitHub'], ['Code', 'Copy the address to download it']],
        why: 'Star, watch, fork and Code are the four buttons you will press most.'
      },
      {
        type: 'fill',
        q: 'Finish this README in Markdown.',
        text: '___ Pizza App\nOrder ___fast___ pizza.\n___ Cheese\n[Docs](https://ex.com)',
        options: ['#', '**', '**', '-', '>', '__'],
        answer: ['#', '**', '**', '-'],
        hint: 'Heading, then bold on both sides of a word, then a list item.',
        why: '# makes a heading, **word** makes bold, and - starts a list item.'
      },
      {
        type: 'pick',
        q: 'Your username is <code>sam-codes</code>. What should you name the repo for your profile README?',
        options: ['sam-codes', 'profile', 'README', 'github.io'],
        answer: 0,
        hints: { 1: 'Close, but GitHub looks for one very specific name.', 2: 'README is the file, not the repo name.', 3: 'That one is for GitHub Pages websites.' },
        why: 'A repo named exactly like your username puts its README on your profile page.'
      },
      {
        type: 'order',
        q: 'You want to download a repo you found. Put the steps in order.',
        items: ['Open the repo page on GitHub', 'Press the green Code button', 'Copy the address', 'Run git clone with that address in your terminal'],
        why: 'Find it, press Code, copy, clone.'
      },
      {
        type: 'type',
        q: 'Clone the repo using the GitHub CLI address from picture 6.',
        answers: ['gh repo clone sam-codes/pizza-app'],
        hint: 'Start with gh repo clone, then owner/name.',
        why: 'gh repo clone owner/name downloads the repo. You will meet gh properly in lesson 24.'
      }
    ]
  });

  /* ================= l21 Connect your computer ================= */
  const roads = `<svg viewBox="0 0 580 300" role="img" aria-label="Two ways to reach GitHub. HTTPS uses a token like a ticket. SSH uses a key that fits a lock.">
    ${laptop(28, 100, 'your computer')}
    ${cloud(430, 98, 'GitHub')}
    <path d="M170 120 C 260 40, 340 40, 430 120" fill="none" stroke="${P.accent}" stroke-width="4" stroke-dasharray="8 6"/>
    <path d="M170 170 C 260 250, 340 250, 430 170" fill="none" stroke="${P.ok}" stroke-width="4" stroke-dasharray="8 6"/>
    <g transform="translate(250 34)">${box(0, 0, 80, 44, P.tint, 8)}${txt(40, 20, 'TOKEN', { s: 11, f: P.accent })}${txt(40, 36, 'ghp_••••', { s: 11, m: true })}</g>
    ${txt(290, 100, 'HTTPS + token', { s: 14, f: P.accent })}
    ${key(236, 216, P.okT)}
    ${txt(290, 204, 'SSH + key', { s: 14, f: P.ok })}
  </svg>`;

  const keyPair = `<svg viewBox="0 0 580 300" role="img" aria-label="ssh-keygen makes two files. The private key stays with you. The public key is a lock you give to GitHub.">
    ${box(24, 40, 250, 220, P.dangerT, 20)}
    ${key(70, 84, P.white)}
    ${txt(149, 170, 'id_ed25519', { s: 15, m: true })}${txt(149, 194, 'PRIVATE KEY', { s: 12, f: P.danger })}
    ${pill(84, 214, 'never share', P.white, P.danger)}
    ${box(306, 40, 250, 220, P.okT, 20)}
    ${lock(394, 46, P.white)}
    ${txt(431, 170, 'id_ed25519.pub', { s: 15, m: true })}${txt(431, 194, 'PUBLIC KEY', { s: 12, f: P.ok })}
    ${pill(370, 214, 'give to GitHub', P.white, P.ok)}
  </svg>`;

  const agentPic = term(['$ eval "$(ssh-agent -s)"', 'Agent pid 4821', '$ ssh-add ~/.ssh/id_ed25519', 'Identity added: /Users/sam/.ssh/id_ed25519'], 'load your key');

  const giveLock = `<svg viewBox="0 0 580 300" role="img" aria-label="Copy the public key, paste it into GitHub Settings under SSH keys, then test the connection">
    ${laptop(26, 70, 'pbcopy < id_ed25519.pub')}
    ${arrow(176, 120, 236, 120, P.accent, 'glA')}
    ${box(246, 30, 310, 240, P.white, 16)}
    ${txt(266, 60, 'Settings › SSH and GPG keys', { a: 'start', s: 13 })}
    <path d="M246 74 h310" stroke="${P.sand}" stroke-width="2"/>
    ${txt(266, 100, 'Title', { a: 'start', s: 11, f: P.mute })}<rect x="266" y="108" width="270" height="28" rx="8" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>${txt(276, 127, 'My laptop', { a: 'start', s: 12, w: 700 })}
    ${txt(266, 158, 'Key', { a: 'start', s: 11, f: P.mute })}<rect x="266" y="166" width="270" height="44" rx="8" fill="${P.okT}" stroke="${P.ink}" stroke-width="2"/>${txt(276, 186, 'ssh-ed25519 AAAAC3Nz...', { a: 'start', s: 11.5, m: true })}${txt(276, 202, 'sam@example.com', { a: 'start', s: 11.5, m: true, f: P.ink2 })}
    <rect x="266" y="224" width="110" height="30" rx="15" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>${txt(321, 244, 'Add SSH key', { s: 12, f: P.white })}
  </svg>`;

  const tokenPic = `<svg viewBox="0 0 560 300" role="img" aria-label="A personal access token is like a ticket with a list of what it allows and an end date. It replaces your password for HTTPS.">
    <g transform="rotate(-3 280 150)">${box(60, 50, 440, 190, P.tint, 18)}
    <circle cx="60" cy="145" r="20" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="500" cy="145" r="20" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/><rect x="36" y="110" width="22" height="70" fill="${P.paper2}"/><rect x="502" y="110" width="22" height="70" fill="${P.paper2}"/>
    ${txt(100, 90, 'PERSONAL ACCESS TOKEN', { a: 'start', s: 13, f: P.accent })}
    ${txt(100, 124, 'ghp_7fK2••••••••••••••••', { a: 'start', s: 17, m: true })}
    ${pill(100, 146, 'repo', P.white, P.ink, true)}${pill(170, 146, 'workflow', P.white, P.ink, true)}
    ${txt(100, 210, 'expires: 90 days', { a: 'start', s: 12, w: 700, f: P.ink2 })}</g>
    <g transform="translate(400 210)"><circle cx="40" cy="40" r="36" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>${txt(40, 36, 'password', { s: 11, f: P.danger })}${txt(40, 52, 'no longer', { s: 11, f: P.danger })}<path d="M14 66 L66 14" stroke="${P.danger}" stroke-width="4"/></g>
  </svg>`;

  const ghLogin = term(['$ gh auth login', '? Where do you use GitHub? GitHub.com', '? Preferred protocol for Git operations? SSH', '? Upload your SSH public key? ~/.ssh/id_ed25519.pub', '? How would you like to authenticate? Login with a web browser', '✓ Logged in as sam-codes', '$ gh auth status', '✓ Logged in to github.com account sam-codes'], 'the easy way');

  COURSE.add({
    id: 'l21', module: 3, minutes: 9,
    title: 'Connect your computer.',
    kicker: 'SSH keys, tokens, gh auth',
    summary: 'GitHub needs to know it is really you before it lets you upload. You prove it with a key or a token, set up once.',
    parts: [
      {
        pic: roads,
        h: 'Two roads to GitHub.',
        text: ['<b>HTTPS</b> addresses start with <code>https://</code>. You prove who you are with a <b>token</b>, like a ticket.', '<b>SSH</b> addresses start with <code>git@github.com:</code>. You prove who you are with a <b>key</b> that fits a lock.', 'Both work. SSH is set once and forgotten. Pick one.']
      },
      {
        pic: keyPair,
        h: 'Make a key and a lock.',
        text: ['One command makes <b>two files</b> in a hidden folder called <code>~/.ssh</code>.', 'The <b>private key</b> stays on your computer. The <b>public key</b> ends in <code>.pub</code>. That one is the lock you hand to GitHub.'],
        cmds: [
          { c: 'ssh-keygen -t ed25519 -C "you@example.com"', d: 'Make a new key pair. Press Enter to accept the default place.' },
          { c: 'ls ~/.ssh', d: 'See the two files: id_ed25519 and id_ed25519.pub.' }
        ],
        warn: 'Never share or upload <code>id_ed25519</code> (no .pub). Whoever has it can act as you.'
      },
      {
        pic: agentPic,
        h: 'Hand the key to the helper.',
        text: ['The <b>ssh-agent</b> is a little helper that holds your key in memory, so you do not type a passphrase every time.', 'Start it, then add your key to it.'],
        cmds: [
          { c: 'eval "$(ssh-agent -s)"', d: 'Start the ssh-agent helper.' },
          { c: 'ssh-add ~/.ssh/id_ed25519', d: 'Give your private key to the helper.' }
        ]
      },
      {
        pic: giveLock,
        h: 'Give the lock to GitHub.',
        text: ['Copy the <b>.pub</b> file. On GitHub, go to <b>Settings</b>, then <b>SSH and GPG keys</b>, then <b>New SSH key</b>. Paste. Save.', 'Then knock on the door to test it.'],
        cmds: [
          { c: 'pbcopy < ~/.ssh/id_ed25519.pub', d: 'Mac: copy the public key to the clipboard.' },
          { c: 'cat ~/.ssh/id_ed25519.pub', d: 'Linux or Windows: print it, then copy it by hand.' },
          { c: 'ssh -T git@github.com', d: 'Test it. Success says "Hi sam-codes! You\'ve successfully authenticated".' }
        ]
      },
      {
        pic: tokenPic,
        h: 'Using HTTPS? Use a token.',
        text: ['GitHub stopped accepting your account password in the terminal. When Git asks for a password, paste a <b>personal access token</b> instead.', 'Make one in <b>Settings › Developer settings › Personal access tokens</b>. Give it only the powers it needs and an end date.', 'A <b>credential helper</b> remembers the token so you paste it only once.'],
        cmds: [
          { c: 'git config --global credential.helper osxkeychain', d: 'Mac: save tokens in the Keychain.' },
          { c: 'git config --global credential.helper manager', d: 'Windows: save tokens with Git Credential Manager.' }
        ],
        warn: 'Treat a token like a password. If one leaks, delete it on GitHub right away.'
      },
      {
        pic: ghLogin,
        h: 'The easy way: gh auth login.',
        text: ['<b>gh</b> is GitHub\'s own terminal tool. It can do all of the above for you by asking a few questions.', 'It logs you in through the browser, and can even upload your SSH key.'],
        cmds: [
          { c: 'brew install gh', d: 'Mac: install the GitHub CLI.' },
          { c: 'winget install GitHub.cli', d: 'Windows: install the GitHub CLI.' },
          { c: 'gh auth login', d: 'Log in. Answer the questions, then confirm in the browser.' },
          { c: 'gh auth status', d: 'Check who you are logged in as.' },
          { c: 'gh auth setup-git', d: 'Let plain git use gh\'s login for HTTPS.' },
          { c: 'gh ssh-key add ~/.ssh/id_ed25519.pub', d: 'Upload your public key without visiting the website.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket',
        q: 'Which file is which?',
        buckets: ['Keep secret', 'Safe to give GitHub'],
        items: [['id_ed25519', 0], ['your personal access token', 0], ['your GitHub password', 0], ['id_ed25519.pub', 1], ['ssh-ed25519 AAAAC3...', 1]],
        why: 'Only the .pub lock is safe to share. Keys, tokens, and passwords stay secret.'
      },
      {
        type: 'order',
        q: 'Set up SSH from scratch. Put the steps in order.',
        items: ['ssh-keygen -t ed25519 -C "you@example.com"', 'eval "$(ssh-agent -s)"', 'ssh-add ~/.ssh/id_ed25519', 'pbcopy < ~/.ssh/id_ed25519.pub', 'Paste it in GitHub Settings › SSH keys', 'ssh -T git@github.com'],
        why: 'Make the pair, load the helper, add the key, copy the lock, give it to GitHub, test.'
      },
      {
        type: 'pick',
        q: 'Git asks for your password over HTTPS. What do you paste?',
        options: ['A personal access token', 'Your GitHub account password', 'Your private SSH key', 'Your email address'],
        answer: 0,
        hints: { 1: 'GitHub stopped accepting account passwords in the terminal.', 2: 'Never paste your private key anywhere.', 3: 'Git needs proof, not just a name.' },
        why: 'For HTTPS, a personal access token takes the place of your password.'
      },
      {
        type: 'match',
        q: 'Match the command to its job.',
        pairs: [['ssh-keygen -t ed25519', 'Make a new key pair'], ['ssh-add ~/.ssh/id_ed25519', 'Load the key into the helper'], ['ssh -T git@github.com', 'Test the connection'], ['gh auth login', 'Log in with the GitHub CLI'], ['gh auth status', 'Show who you are logged in as']],
        why: 'Make, load, test. Or let gh handle it.'
      },
      {
        type: 'bucket',
        q: 'HTTPS or SSH? Sort the addresses and proofs.',
        buckets: ['HTTPS', 'SSH'],
        items: [['https://github.com/sam/app.git', 0], ['personal access token', 0], ['credential.helper', 0], ['git@github.com:sam/app.git', 1], ['id_ed25519.pub', 1], ['ssh-agent', 1]],
        why: 'HTTPS uses tokens and credential helpers. SSH uses keys and the agent.'
      },
      {
        type: 'fill',
        q: 'Make a key, then upload it with gh.',
        text: 'ssh-keygen -t ___ -C "you@example.com"\ngh ___ add ~/.ssh/id_ed25519.___',
        options: ['ed25519', 'ssh-key', 'pub', 'rsa', 'key', 'private'],
        answer: ['ed25519', 'ssh-key', 'pub'],
        why: 'ed25519 is the modern key type. You always upload the .pub file.'
      },
      {
        type: 'type',
        q: 'Test whether GitHub accepts your SSH key.',
        answers: ['ssh -T git@github.com'],
        hint: 'ssh, a capital T flag, then git@github.com.',
        why: 'ssh -T git@github.com knocks on the door. GitHub says hi with your username if the key works.'
      },
      {
        type: 'type',
        q: 'Log in to GitHub with the GitHub CLI.',
        answers: ['gh auth login'],
        hint: 'gh, then auth, then the action.',
        why: 'gh auth login walks you through everything, including the browser step.'
      }
    ]
  });

  /* ================= l22 Remotes and clone ================= */
  const remotePic = `<svg viewBox="0 0 580 280" role="img" aria-label="Your laptop repo is linked to a GitHub repo. The link has a nickname tag: origin.">
    ${laptop(30, 80, 'your repo')}
    ${cloud(420, 80, 'GitHub repo')}
    <path d="M176 128 L420 128" stroke="${P.ink}" stroke-width="4" stroke-dasharray="10 7"/>
    <g transform="rotate(-6 298 100)">${box(246, 76, 104, 40, P.warnT, 10)}<circle cx="262" cy="96" r="5" fill="${P.ink}"/>${txt(306, 102, 'origin', { s: 16, m: true })}</g>
    ${txt(298, 200, 'a remote = a nickname for a URL', { s: 14, f: P.ink2 })}
  </svg>`;

  const clonePic = `<svg viewBox="0 0 580 300" role="img" aria-label="git clone copies the whole repo from GitHub to your computer, with all its history and an origin link already set">
    ${cloud(40, 30, 'GitHub')}
    ${arrow(170, 110, 330, 150, P.accent, 'clA')}
    ${pill(196, 96, 'git clone', P.white, P.accent, true)}
    ${box(330, 110, 220, 160, P.warnT, 16)}
    ${txt(440, 140, 'pizza-app/', { s: 15, m: true })}
    ${['index.html', 'app.js', '.git/  (all history)'].map((f, i) => `<rect x="350" y="${154 + i * 32}" width="180" height="24" rx="6" fill="${i === 2 ? P.okT : P.white}" stroke="${P.ink}" stroke-width="2"/>${txt(440, 171 + i * 32, f, { s: 12, m: true })}`).join('')}
    ${txt(150, 260, 'every commit comes along', { s: 13, f: P.ink2 })}
  </svg>`;

  const remotesTerm = term(['$ git remote', 'origin', '$ git remote -v', 'origin  git@github.com:sam-codes/pizza-app.git (fetch)', 'origin  git@github.com:sam-codes/pizza-app.git (push)'], 'list remotes');

  const swapUrl = `<svg viewBox="0 0 580 260" role="img" aria-label="set-url changes the address behind the origin nickname, for example from HTTPS to SSH">
    ${pill(240, 24, 'origin', P.warnT, P.ink, true)}
    ${box(20, 78, 250, 70, P.tint, 14)}${txt(145, 104, 'BEFORE (HTTPS)', { s: 11, f: P.accent })}${txt(145, 128, 'https://github.com/sam/app.git', { s: 11, m: true })}
    ${arrow(278, 113, 302, 113, P.ink, 'suA')}
    ${box(310, 78, 250, 70, P.okT, 14)}${txt(435, 104, 'AFTER (SSH)', { s: 11, f: P.ok })}${txt(435, 128, 'git@github.com:sam/app.git', { s: 11, m: true })}
    ${txt(290, 200, 'same nickname, new address', { s: 14, f: P.ink2 })}
  </svg>`;

  const tracking = graph({
    label: 'Local main is at D. origin/main, the bookmark of GitHub, is still at B.',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], hi: true }, { id: 'D', parents: ['C'], hi: true }],
    refs: { 'origin/main': 'B', main: 'D' }, head: 'main'
  });

  COURSE.add({
    id: 'l22', module: 3, minutes: 8,
    title: 'Remotes and clone.',
    kicker: 'Linking your repo to GitHub',
    summary: 'A remote is a nickname for a repo somewhere else, usually on GitHub. Clone makes a full copy of one on your computer.',
    parts: [
      {
        pic: remotePic,
        h: 'A remote is a nickname.',
        text: ['Typing a long URL every time is tiring. So Git lets you give it a short name.', 'The usual name is <b>origin</b>. It just means "the main copy on GitHub".']
      },
      {
        pic: clonePic,
        h: 'Clone copies everything.',
        text: ['<b>Clone</b> downloads the whole repo: files plus every commit ever made.', 'It also sets up the <b>origin</b> remote for you, pointing back where it came from.'],
        cmds: [
          { c: 'git clone https://github.com/sam-codes/pizza-app.git', d: 'Make a folder called pizza-app with the full repo inside.' },
          { c: 'git clone git@github.com:sam-codes/pizza-app.git my-folder', d: 'Same, but name the folder my-folder.' },
          { c: 'git clone --depth 1 https://github.com/sam-codes/pizza-app.git', d: 'Only grab the newest commit. Fast for huge repos.' },
          { c: 'git clone --branch dev https://github.com/sam-codes/pizza-app.git', d: 'Clone and start on the dev branch.' }
        ]
      },
      {
        pic: remotesTerm,
        h: 'See and change remotes.',
        text: ['Started with <code>git init</code> instead of clone? Then you have no remote yet. Add one.', '<code>-v</code> shows the address next to each nickname.'],
        cmds: [
          { c: 'git remote', d: 'List remote nicknames.' },
          { c: 'git remote -v', d: 'List nicknames with their addresses.' },
          { c: 'git remote add origin git@github.com:sam-codes/pizza-app.git', d: 'Link this repo to GitHub, nickname origin.' },
          { c: 'git remote rename origin old', d: 'Change the nickname origin to old.' },
          { c: 'git remote remove old', d: 'Forget a remote. Nothing on GitHub is deleted.' }
        ]
      },
      {
        pic: swapUrl,
        h: 'Change the address.',
        text: ['Switched from HTTPS to SSH? Or renamed the repo? Keep the nickname, change the address behind it.'],
        cmds: [
          { c: 'git remote set-url origin git@github.com:sam-codes/pizza-app.git', d: 'Point origin at a new address.' },
          { c: 'git remote show origin', d: 'Full report: address, branches, what is tracked.' }
        ]
      },
      {
        pic: tracking,
        h: 'origin/main is a bookmark.',
        text: ['<b>origin/main</b> is a dashed sticker. It shows where <b>main</b> was on GitHub <b>the last time you checked</b>.', 'Here you made C and D locally. GitHub has not seen them yet. The bookmark still sits on B.', 'It only moves when you talk to GitHub: fetch, pull, or push.'],
        cmds: [
          { c: 'git branch -r', d: 'List remote-tracking branches like origin/main.' }
        ],
        tip: 'You never commit on origin/main directly. It is read-only, a photo of GitHub.'
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What is <code>origin</code>?',
        options: ['The usual nickname for your repo\'s GitHub address', 'The first commit in the repo', 'A branch that GitHub makes', 'A special folder inside .git'],
        answer: 0,
        hints: { 1: 'The first commit is just a commit. Think nicknames.', 2: 'origin/main is a bookmark, but origin itself is the remote.' },
        why: 'origin is just a name for a URL. You could call it anything, but everyone uses origin.'
      },
      {
        type: 'match',
        q: 'Match the clone command to what it does.',
        pairs: [['git clone <url>', 'Full copy in a folder named after the repo'], ['git clone <url> my-folder', 'Full copy in a folder you name'], ['git clone --depth 1 <url>', 'Only the newest commit'], ['git clone --branch dev <url>', 'Start on the dev branch']],
        why: 'Plain clone is the default. Flags tweak the folder, the depth, or the starting branch.'
      },
      {
        type: 'order',
        q: 'You made a repo with git init. Now link it to GitHub and check it.',
        items: ['Create an empty repo on GitHub', 'Copy its address from the Code button', 'git remote add origin <address>', 'git remote -v'],
        why: 'Make the repo online, copy the address, add the remote, then look to confirm.'
      },
      {
        type: 'bucket',
        q: 'Does this command change anything?',
        buckets: ['Only looks', 'Changes your remotes'],
        items: [['git remote', 0], ['git remote -v', 0], ['git remote show origin', 0], ['git branch -r', 0], ['git remote add origin <url>', 1], ['git remote rename origin old', 1], ['git remote set-url origin <url>', 1], ['git remote remove old', 1]],
        why: 'Looking is always safe. add, rename, set-url and remove edit your list of remotes.'
      },
      {
        type: 'fill',
        q: 'Switch origin from HTTPS to SSH.',
        text: 'git remote ___ origin ___',
        options: ['set-url', 'git@github.com:sam/app.git', 'add', 'https://github.com/sam/app.git', 'rename'],
        answer: ['set-url', 'git@github.com:sam/app.git'],
        hint: 'You are changing the address, and SSH addresses start with git@.',
        why: 'set-url keeps the nickname and swaps the address.'
      },
      {
        type: 'pick',
        q: 'Look at picture 5. You made commits C and D. Why is origin/main still on B?',
        options: ['You have not talked to GitHub since B', 'C and D are broken', 'origin/main always stays on the second commit', 'Someone deleted C and D on GitHub'],
        answer: 0,
        why: 'origin/main only moves when you fetch, pull, or push.'
      },
      {
        type: 'type',
        q: 'Show your remotes with their addresses.',
        answers: ['git remote -v', 'git remote --verbose'],
        hint: 'git remote plus the "verbose" flag.',
        why: 'git remote -v prints each nickname twice, once for fetch and once for push.'
      },
      {
        type: 'type',
        q: 'Link this repo to <code>git@github.com:sam/app.git</code> with the usual nickname.',
        answers: ['git remote add origin git@github.com:sam/app.git'],
        hint: 'git remote add, then the nickname, then the address.',
        why: 'git remote add origin <url> is the first thing you do after git init when the repo also lives on GitHub.'
      }
    ]
  });

  /* ================= l23 Push, fetch, pull ================= */
  const flows = areas({ n: 4, hi: [2, 3], arrows: [{ f: 2, t: 3, l: 'git push' }, { f: 3, t: 2, l: 'git fetch', c: P.ok }, { f: 3, t: 0, l: 'git pull', c: P.warn }] });

  const pushTerm = term(['$ git push -u origin main', 'Enumerating objects: 5, done.', 'To github.com:sam-codes/pizza-app.git', ' * [new branch]      main -> main', "branch 'main' set up to track 'origin/main'.", '# from now on, just:', '$ git push'], 'first push');

  const fetchGraph = graph({
    label: 'After fetch: origin/main moved to E with Ana\'s new commits. Your main is still at C.',
    lanes: ['main', 'origin'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'D', lane: 1, parents: ['B'], hi: true, x: 2 }, { id: 'E', lane: 1, parents: ['D'], hi: true, x: 3 }],
    refs: { main: 'C', 'origin/main': 'E' }, head: 'main'
  });

  const pullEq = `<svg viewBox="0 0 580 230" role="img" aria-label="git pull equals git fetch plus git merge">
    ${box(16, 60, 150, 100, P.warnT, 18)}${txt(91, 106, 'git pull', { s: 18, m: true, f: P.warn })}${txt(91, 132, 'one step', { s: 12, w: 700, f: P.ink2 })}
    ${txt(194, 120, '=', { s: 40, f: P.ink })}
    ${box(222, 60, 150, 100, P.okT, 18)}${txt(297, 106, 'git fetch', { s: 18, m: true, f: P.ok })}${txt(297, 132, 'download', { s: 12, w: 700, f: P.ink2 })}
    ${txt(400, 120, '+', { s: 40, f: P.ink })}
    ${box(428, 60, 136, 100, P.tint, 18)}${txt(496, 106, 'git merge', { s: 18, m: true, f: P.accent })}${txt(496, 132, 'join in', { s: 12, w: 700, f: P.ink2 })}
    ${txt(290, 206, 'with --rebase, the second step is a rebase instead', { s: 13, f: P.ink2 })}
  </svg>`;

  const statusTerm = term(['$ git status', 'On branch main', "Your branch is ahead of 'origin/main' by 2 commits.", '  (use "git push" to publish your local commits)', '$ git status -sb', '## main...origin/main [ahead 2]'], 'ahead and behind');

  const rejected = term(['$ git push', 'To github.com:sam-codes/pizza-app.git', ' ! [rejected]        main -> main (fetch first)', "error: failed to push some refs", 'hint: Updates were rejected because the remote contains work', 'hint: that you do not have locally.', '# fix: get their work first, then push', '$ git pull', '$ git push'], 'rejected!');

  COURSE.add({
    id: 'l23', module: 3, minutes: 10,
    title: 'Push, fetch, pull.',
    kicker: 'Sending and getting commits',
    summary: 'Push uploads your commits to GitHub. Fetch downloads other people\'s commits. Pull downloads and joins them into your work.',
    parts: [
      {
        pic: flows,
        h: 'Three verbs, two directions.',
        text: ['<b>push</b> sends your saved commits <b>up</b> to GitHub.', '<b>fetch</b> brings new commits <b>down</b> into your repo, but does not touch your files.', '<b>pull</b> brings them down <b>and</b> updates your files.']
      },
      {
        pic: pushTerm,
        h: 'Push.',
        text: ['The first time, tell Git where to push and ask it to remember. That is <code>-u</code>, short for upstream.', 'After that, plain <code>git push</code> is enough.'],
        cmds: [
          { c: 'git push -u origin main', d: 'First push of main. Remember origin/main as its partner.' },
          { c: 'git push', d: 'Upload new commits on this branch to its partner.' },
          { c: 'git push origin feature', d: 'Upload the branch called feature to origin.' },
          { c: 'git config --global push.autoSetupRemote true', d: 'Never type -u again. New branches set up their partner by themselves.' }
        ]
      },
      {
        pic: fetchGraph,
        h: 'Fetch: look before you leap.',
        text: ['Ana pushed <b>D</b> and <b>E</b>. <code>git fetch</code> downloads them and moves the <b>origin/main</b> bookmark.', 'Your <b>main</b> and your files stay exactly as they were. Fetch is always safe.'],
        cmds: [
          { c: 'git fetch', d: 'Download new commits from origin. Changes no files.' },
          { c: 'git fetch --all', d: 'Fetch from every remote you have.' },
          { c: 'git fetch --prune', d: 'Also remove bookmarks for branches deleted on GitHub.' }
        ]
      },
      {
        pic: pullEq,
        h: 'Pull = fetch + merge.',
        text: ['<code>git pull</code> does a fetch, then joins the new commits into your branch.', 'Add <code>--rebase</code> to put your commits on top instead of making a merge commit. That keeps history in one straight line.'],
        cmds: [
          { c: 'git pull', d: 'Fetch, then merge into your current branch.' },
          { c: 'git pull --rebase', d: 'Fetch, then replay your commits on top.' },
          { c: 'git pull --ff-only', d: 'Only update if it is a simple fast-forward. Otherwise stop.' },
          { c: 'git config --global pull.rebase true', d: 'Make every pull use rebase.' }
        ]
      },
      {
        pic: statusTerm,
        h: 'Ahead and behind.',
        text: ['<b>Ahead by 2</b>: you have 2 commits GitHub does not. Push them.', '<b>Behind by 3</b>: GitHub has 3 you do not. Pull them.', 'The partner branch is called the <b>upstream</b>. You can set it by hand.'],
        cmds: [
          { c: 'git status -sb', d: 'Short status with ahead and behind counts.' },
          { c: 'git branch -u origin/main', d: 'Make origin/main the upstream of this branch.' },
          { c: 'git branch --set-upstream-to=origin/main', d: 'Long spelling of the same thing.' }
        ],
        tip: 'Numbers are only as fresh as your last fetch. Run git fetch first to see the truth.'
      },
      {
        pic: rejected,
        h: 'Rejected? Pull first.',
        text: ['If GitHub has commits you do not, it refuses your push so nothing gets lost. Pull, then push again.', 'If you rewrote your own commits and must replace GitHub\'s copy, use <b>force-with-lease</b>. It refuses if someone else pushed in the meantime.'],
        cmds: [
          { c: 'git push --force-with-lease', d: 'Replace GitHub\'s branch, but only if nobody else pushed since you looked.' },
          { c: 'git push --force', d: 'Replace GitHub\'s branch no matter what. Can erase teammates\' work.' },
          { c: 'git push origin --delete feature', d: 'Delete the feature branch on GitHub.' }
        ],
        warn: 'Never force push to a shared main branch. Plain --force can delete other people\'s commits.'
      }
    ],
    quiz: [
      {
        type: 'match',
        q: 'Match each verb to what it does.',
        pairs: [['git push', 'Upload your commits to GitHub'], ['git fetch', 'Download commits, change no files'], ['git pull', 'Download and join into your branch'], ['git pull --rebase', 'Download, then put your commits on top']],
        why: 'push goes up. fetch and pull come down. pull also updates your files.'
      },
      {
        type: 'pick',
        q: '<code>git pull</code> is the same as which two commands?',
        options: ['git fetch, then git merge', 'git push, then git fetch', 'git clone, then git merge', 'git add, then git commit'],
        answer: 0,
        why: 'pull = fetch + merge. With --rebase, it is fetch + rebase.'
      },
      {
        type: 'bucket',
        q: 'Safe or risky?',
        buckets: ['Always safe', 'Can lose work'],
        items: [['git fetch', 0], ['git fetch --prune', 0], ['git status -sb', 0], ['git push --force-with-lease', 0], ['git push --force', 1], ['git push origin --delete main', 1]],
        why: 'Fetch only downloads. force-with-lease checks first. Plain --force and deleting main can destroy work.'
      },
      {
        type: 'order',
        q: 'Your push was rejected because a teammate pushed first. Fix it.',
        items: ['git pull', 'Fix any merge conflicts', 'git push'],
        why: 'Get their work, join it, then your push is a simple step forward.'
      },
      {
        type: 'fill',
        q: 'First push of a brand new main branch.',
        text: 'git push ___ ___ main',
        options: ['-u', 'origin', '--force', 'main', 'github'],
        answer: ['-u', 'origin'],
        hint: 'The upstream flag, then the remote nickname.',
        why: '-u remembers origin/main as the partner, so later you just type git push.'
      },
      {
        type: 'pick',
        q: 'Status says <b>Your branch is ahead of \'origin/main\' by 2 commits</b>. What should you do?',
        options: ['git push', 'git pull', 'git clone', 'Nothing, it will upload by itself'],
        answer: 0,
        hints: { 1: 'Behind means pull. Ahead means you have extra.', 3: 'Git never uploads without being asked.' },
        why: 'Ahead means you have commits GitHub does not. Push them.'
      },
      {
        type: 'type',
        q: 'Download new commits from GitHub without changing any files.',
        answers: ['git fetch', 'git fetch origin'],
        hint: 'It is the safe one of the three verbs.',
        why: 'git fetch updates origin/main and leaves your branch and files alone.'
      },
      {
        type: 'type',
        q: 'Delete the branch <code>old-idea</code> on GitHub.',
        answers: ['git push origin --delete old-idea', 'git push origin :old-idea', 'git push --delete origin old-idea'],
        hint: 'It is a push, to origin, with a delete flag.',
        why: 'git push origin --delete old-idea removes the branch from GitHub. Your local copy stays.'
      }
    ]
  });

  /* ================= l24 The gh tool ================= */
  const bridge = `<svg viewBox="0 0 580 260" role="img" aria-label="gh is a bridge between your terminal and the GitHub website">
    ${box(20, 60, 190, 130, P.night || '#15132B', 14)}
    <rect x="20" y="60" width="190" height="26" rx="14" fill="#211E40"/><circle cx="38" cy="73" r="5" fill="#FF6B8B"/><circle cx="54" cy="73" r="5" fill="#FFC24B"/><circle cx="70" cy="73" r="5" fill="#4BD69B"/>
    ${txt(36, 120, '$ gh repo view', { a: 'start', s: 13, m: true, f: P.white })}${txt(36, 144, '$ gh pr list', { a: 'start', s: 13, m: true, f: P.white })}${txt(36, 168, '$ gh issue list', { a: 'start', s: 13, m: true, f: P.white })}
    <path d="M220 126 h140" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/><path d="M220 126 h140" stroke="${P.warn}" stroke-width="5" stroke-linecap="round"/>
    ${pill(258, 92, 'gh', P.warnT, P.ink, true)}
    ${cloud(380, 74, 'GitHub')}
    ${txt(290, 230, 'git talks to repos. gh talks to the website.', { s: 13, f: P.ink2 })}
  </svg>`;

  const createTerm = term(['$ cd pizza-app', '$ gh repo create pizza-app --public --source=. --remote=origin --push', '✓ Created repository sam-codes/pizza-app on GitHub', '✓ Added remote git@github.com:sam-codes/pizza-app.git', '✓ Pushed commits to git@github.com:sam-codes/pizza-app.git'], 'one command, three jobs');

  const viewTerm = term(['$ gh repo view', 'sam-codes/pizza-app', 'Order pizza in two taps.', '', '  # Pizza App', '  Order fast pizza.', '', 'View this repository on GitHub: https://github.com/sam-codes/pizza-app'], 'read the README');

  const editPic = `<svg viewBox="0 0 580 260" role="img" aria-label="gh can change a repo's description and name. Deleting is permanent.">
    ${box(20, 30, 250, 200, P.white, 16)}
    ${txt(40, 64, 'pizza-app', { a: 'start', s: 16, m: true })}${txt(40, 90, 'Order pizza fast.', { a: 'start', s: 13, w: 600, f: P.ink2 })}
    ${pill(40, 110, 'gh repo edit', P.tint, P.accent, true)}${pill(40, 146, 'gh repo rename', P.tint, P.accent, true)}
    ${txt(40, 204, 'change details anytime', { a: 'start', s: 12, w: 700, f: P.mute })}
    ${box(310, 30, 250, 200, P.dangerT, 16)}
    <path d="M396 92 h78 l-8 96 h-62z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><rect x="386" y="78" width="98" height="14" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><rect x="420" y="66" width="30" height="12" rx="4" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    ${[414, 435, 456].map(x => `<path d="M${x} 104 v70" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>`).join('')}
    ${txt(435, 214, 'gh repo delete = forever', { s: 13, f: P.danger })}
  </svg>`;

  const superTerm = term(['$ gh search repos "pizza" --limit 3', 'pizza-co/pizza-api     Pizza ordering API', 'chefs/dough-calc       Dough hydration calculator', 'sam-codes/pizza-app    Order pizza in two taps', '$ gh alias set rv "repo view --web"', '$ gh rv', 'Opening github.com/sam-codes/pizza-app in your browser.'], 'superpowers');

  COURSE.add({
    id: 'l24', module: 3, minutes: 8,
    title: 'The gh tool.',
    kicker: 'GitHub from the terminal',
    summary: 'git moves commits around. gh does the website things, like making repos, opening pages, and searching, without leaving the terminal.',
    parts: [
      {
        pic: bridge,
        h: 'gh is a bridge.',
        text: ['<b>git</b> knows nothing about GitHub\'s website. It only knows repos and commits.', '<b>gh</b> is GitHub\'s own tool. It talks to the website for you: repos, pull requests, issues, and more.'],
        cmds: [
          { c: 'gh help', d: 'List every gh command group.' },
          { c: 'gh status', d: 'Your dashboard: PRs and issues that need you, across all repos.' }
        ]
      },
      {
        pic: createTerm,
        h: 'Make a GitHub repo from a folder.',
        text: ['You have a local repo with commits. One command creates the GitHub repo, adds origin, and pushes.', 'Leave out the flags and gh asks you questions instead.'],
        cmds: [
          { c: 'gh repo create my-app --public --source=. --remote=origin --push', d: 'Create my-app on GitHub from this folder, link it as origin, and push.' },
          { c: 'gh repo create', d: 'Answer questions to make a new repo step by step.' }
        ]
      },
      {
        pic: viewTerm,
        h: 'Clone, look, open.',
        text: ['No need to copy URLs. Just say <b>owner/name</b>.', '<code>view</code> prints the README in the terminal. Add <code>--web</code> to open the page in your browser.'],
        cmds: [
          { c: 'gh repo clone owner/repo', d: 'Clone a repo by its short name.' },
          { c: 'gh repo view', d: 'Show this repo\'s description and README.' },
          { c: 'gh repo view --web', d: 'Open this repo\'s page in the browser.' },
          { c: 'gh browse', d: 'Open the repo in the browser. Add a file name to jump to that file.' },
          { c: 'gh repo list', d: 'List your repos.' }
        ]
      },
      {
        pic: editPic,
        h: 'Change it, rename it, delete it.',
        text: ['Owners can change a repo\'s details from the terminal.', 'Deleting removes the repo, its issues, and its pull requests. There is no trash can.'],
        cmds: [
          { c: 'gh repo edit --description "Order pizza fast"', d: 'Change the one-line description.' },
          { c: 'gh repo rename pizza-web', d: 'Rename this repo on GitHub.' },
          { c: 'gh repo delete', d: 'Delete the repo on GitHub forever. It asks you to confirm.' }
        ],
        warn: 'gh repo delete cannot be undone. Type the name slowly and be sure.'
      },
      {
        pic: superTerm,
        h: 'Superpowers.',
        text: ['Search all of GitHub. Make your own short commands with <b>aliases</b>. Add new commands with <b>extensions</b>.', '<code>gh api</code> talks straight to GitHub\'s API. Anything the website can do, it can do.'],
        cmds: [
          { c: 'gh search repos "pizza"', d: 'Search GitHub for repos about pizza.' },
          { c: 'gh alias set rv "repo view --web"', d: 'Make gh rv a shortcut for gh repo view --web.' },
          { c: 'gh extension install owner/gh-name', d: 'Add a new command made by the community.' },
          { c: 'gh api repos/{owner}/{repo}', d: 'Ask GitHub\'s API about this repo. Prints JSON.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket',
        q: 'Which tool does the job?',
        buckets: ['git', 'gh'],
        items: [['Make a commit', 0], ['Switch branches', 0], ['Push commits', 0], ['Create a repo on GitHub', 1], ['Open the repo page in a browser', 1], ['Search GitHub for repos', 1]],
        why: 'git moves commits. gh does website things.'
      },
      {
        type: 'fill',
        q: 'Create a public GitHub repo from this folder and push.',
        text: 'gh repo ___ my-app --___ --source=___ --remote=origin --push',
        options: ['create', 'public', '.', 'new', 'private', '..'],
        answer: ['create', 'public', '.'],
        hint: 'The dot means "this folder".',
        why: 'gh repo create my-app --public --source=. --remote=origin --push does it all in one go.'
      },
      {
        type: 'match',
        q: 'Match the gh command to the result.',
        pairs: [['gh repo view', 'Prints the README in the terminal'], ['gh repo view --web', 'Opens the repo page in the browser'], ['gh repo list', 'Lists your repos'], ['gh repo clone owner/repo', 'Downloads a repo by short name'], ['gh status', 'Shows what needs your attention']],
        why: 'gh repo is the family for whole-repo actions. gh status is your personal dashboard.'
      },
      {
        type: 'order',
        q: 'Brand new project to GitHub. Put the steps in order.',
        items: ['mkdir my-app and cd into it', 'git init', 'Make a file, git add, git commit', 'gh repo create my-app --public --source=. --remote=origin --push', 'gh repo view --web'],
        why: 'Make the repo locally with a commit, then one gh command puts it online, then look at it.'
      },
      {
        type: 'pick',
        q: 'Which gh command can never be undone?',
        options: ['gh repo delete', 'gh repo rename', 'gh repo edit --description', 'gh browse'],
        answer: 0,
        why: 'Delete removes the repo and its issues forever. The others can be changed back.'
      },
      {
        type: 'pick',
        q: 'You type <code>gh repo view --web</code> twenty times a day. What helps?',
        options: ['gh alias set rv "repo view --web"', 'gh extension install', 'gh api repos/{owner}/{repo}', 'git remote add'],
        answer: 0,
        why: 'An alias turns a long command into a short one. Now gh rv does it.'
      },
      {
        type: 'type',
        q: 'Open the current repo in your browser.',
        answers: ['gh browse', 'gh repo view --web', 'gh repo view -w'],
        hint: 'Either gh browse, or gh repo view with the web flag.',
        why: 'gh browse and gh repo view --web both open the page.'
      },
      {
        type: 'type',
        q: 'Search GitHub for repos about <code>pizza</code>.',
        answers: ['gh search repos pizza', 'gh search repos "pizza"'],
        hint: 'gh search, then what kind of thing, then the word.',
        why: 'gh search repos finds repos. gh search also does issues, prs, and code.'
      }
    ]
  });
})();
