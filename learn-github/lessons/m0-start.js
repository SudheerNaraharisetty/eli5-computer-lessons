/* Module 0: Start here. */
(function () {
  const { P, graph, term, esc } = GH;

  // a paper document icon with a filename under it
  const doc = (x, y, name, tilt, col) => `<g transform="translate(${x} ${y}) rotate(${tilt})">
    <path d="M4 6 h52 l18 18 v70 h-70z" fill="${P.ink}"/>
    <path d="M0 0 h52 l18 18 v70 h-70z" fill="${col || P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M52 0 v18 h18" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    ${[30, 42, 54, 66].map(l => `<rect x="12" y="${l}" width="${l === 66 ? 26 : 46}" height="5" rx="2.5" fill="${P.sand}"/>`).join('')}
    <text x="35" y="112" text-anchor="middle" font-size="12.5" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">${esc(name)}</text></g>`;

  const mess = `<svg viewBox="0 0 560 360" role="img" aria-label="Five copies of the same essay with confusing names">
    ${doc(40, 30, 'essay.doc', -6)}
    ${doc(210, 18, 'essay_final.doc', 3)}
    ${doc(390, 36, 'essay_final2.doc', 7)}
    ${doc(100, 196, 'FINAL_real.doc', 4, P.warnT)}
    ${doc(330, 200, 'use_THIS_one.doc', -5, P.dangerT)}
    <g transform="translate(250 200)"><circle cx="20" cy="20" r="26" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="20" y="31" text-anchor="middle" font-size="32" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.danger}">?</text></g></svg>`;

  // camera snapshotting a folder into a strip of photos
  const photo = (x, n, msg, who, hi) => `<g transform="translate(${x} 70)">
    <rect x="4" y="6" width="104" height="128" rx="8" fill="${P.ink}"/>
    <rect width="104" height="128" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="10" y="10" width="84" height="64" rx="5" fill="${hi ? P.tint : P.paper}" stroke="${P.ink}" stroke-width="2"/>
    <path d="M24 30 h14 l4 5 h22 v22 h-40z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="80" cy="22" r="9" fill="${hi ? P.accent : P.ink2}"/><text x="80" y="26" text-anchor="middle" font-size="11" font-weight="800" fill="${P.white}">${n}</text>
    <text x="52" y="96" text-anchor="middle" font-size="12" font-weight="800" fill="${P.ink}">${esc(msg)}</text>
    <text x="52" y="114" text-anchor="middle" font-size="10.5" font-weight="700" fill="${P.mute}">${esc(who)}</text></g>`;
  const camera = `<svg viewBox="0 0 600 260" role="img" aria-label="A camera takes snapshots of your project folder">
    <g transform="translate(14 96)"><rect x="4" y="6" width="96" height="66" rx="12" fill="${P.ink}"/><rect width="96" height="66" rx="12" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="30" y="-12" width="34" height="14" rx="4" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
    <circle cx="48" cy="33" r="21" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="48" cy="33" r="11" fill="${P.ink}"/><circle cx="44" cy="29" r="3.5" fill="${P.white}"/>
    <text x="48" y="96" text-anchor="middle" font-size="14" font-weight="800" fill="${P.ink}">Git</text></g>
    <path d="M122 129 L156 129" stroke="${P.ink}" stroke-width="3" stroke-dasharray="5 5"/>
    ${photo(164, 1, 'Add title', 'Sam · Mon')}
    ${photo(306, 2, 'Fix typo', 'Sam · Tue')}
    ${photo(448, 3, 'New photo', 'Ana · Wed', true)}
    <text x="380" y="40" text-anchor="middle" font-size="13" font-weight="800" fill="${P.ink2}" letter-spacing="1.5">EACH SNAPSHOT = ONE COMMIT</text></svg>`;

  const timeTravel = graph({
    label: 'Five commits. HEAD has jumped back to commit C.',
    commits: [
      { id: 'A', msg: 'start', parents: [] }, { id: 'B', msg: 'title', parents: ['A'] },
      { id: 'C', msg: 'menu', parents: ['B'], hi: true }, { id: 'D', msg: 'colors', parents: ['C'] }, { id: 'E', msg: 'oops', parents: ['D'] }
    ],
    refs: { main: 'E' }, head: 'C', msgs: true
  });

  const team = graph({
    label: 'Ana and Raj work on their own lines, then join main',
    lanes: ['main', 'ana', 'raj'],
    commits: [
      { id: 'A', parents: [] }, { id: 'B', parents: ['A'] },
      { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 2, parents: ['B'] },
      { id: 'E', lane: 1, parents: ['C'] },
      { id: 'F', parents: ['B', 'E'], hi: true }, { id: 'G', parents: ['F', 'D'], hi: true }
    ],
    refs: { main: 'G', ana: 'E', raj: 'D' }, head: 'main'
  });

  COURSE.add({
    id: 'l01', module: 0, minutes: 6,
    title: 'Save points.',
    kicker: 'What version control is',
    summary: 'Git is a save button with a memory. It keeps every version of your project, so you can look back, undo, and work with friends.',
    parts: [
      {
        pic: mess,
        h: 'Without Git, files pile up.',
        text: ['You change an essay. You are scared to lose the old one, so you make a copy. Then another. Soon nobody knows which file is the real one.', '<b>Version control</b> fixes this. You keep <b>one</b> folder, and a tool remembers every version for you.']
      },
      {
        pic: camera,
        h: 'Git is a camera for your folder.',
        text: ['When you say so, Git takes a photo of your whole project. That photo is called a <b>commit</b>.', 'Each commit remembers <b>what</b> changed, <b>who</b> changed it, <b>when</b>, and a short note about <b>why</b>.', 'The folder plus all its photos is called a <b>repository</b>, or <b>repo</b> for short.'],
        tip: 'Git only takes a photo when you ask. It is not an automatic backup.'
      },
      {
        pic: timeTravel,
        h: 'Travel back to any photo.',
        text: ['Each circle is a commit. The line shows the order, oldest on the left.', 'Broke something in <b>E</b>? Jump back to <b>C</b> and look around. The newer photos are still there. Nothing is lost.', '<b>HEAD</b> is the sticker that says "you are here".']
      },
      {
        pic: team,
        h: 'Work with friends without crashing.',
        text: ['Ana and Raj each work on their own copy line, called a <b>branch</b>.', 'When they are done, Git joins their work back into <b>main</b>. That is a <b>merge</b>. Nobody overwrites anybody.'],
        tip: 'You will learn branches and merges in Module 2. For now, just enjoy the picture.'
      },
      {
        pic: term(['$ git init', 'Initialized empty Git repository', '$ git add .', '$ git commit -m "first save"', '[main (root-commit) 3f9a1c2] first save', '$ git log --oneline', '3f9a1c2 (HEAD -> main) first save'], 'a sneak peek'),
        h: 'You talk to Git by typing.',
        text: ['We will use Git from the <b>terminal</b>: a window where you type commands. It looks scary. It is not.', 'This is a whole first save in four lines. By the end of this course you will read every line like a sentence.'],
        cmds: [
          { c: 'git init', d: 'Start a new repo in this folder.' },
          { c: 'git add .', d: 'Pick all changes to go in the next photo.' },
          { c: 'git commit -m "first save"', d: 'Take the photo, with a note.' },
          { c: 'git log --oneline', d: 'List all photos, one per line.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'In Git, what is a <b>commit</b>?',
        options: ['A snapshot of your project with a note', 'A file named final_v2.doc', 'A copy of your project on the internet', 'A list of bugs'],
        answer: 0,
        hints: { 1: 'That is the mess Git saves you from.', 2: 'That is GitHub. A commit lives on your own computer first.', 3: 'Not quite. Think about the camera picture.' },
        why: 'A commit is one photo of the whole project, plus who, when, and a message.'
      },
      {
        type: 'bucket',
        q: 'Sort these. What does a commit remember?',
        buckets: ['Saved in a commit', 'Not what Git does'],
        items: [['Who made it', 0], ['When it was made', 0], ['A message about why', 0], ['The project files', 0], ['Writes your code for you', 1], ['Saves by itself every minute', 1], ['Fixes your bugs', 1]],
        why: 'Git records who, when, why, and the files. It never writes code or saves without being asked.'
      },
      {
        type: 'order',
        q: 'Put a normal day with Git in order.',
        items: ['Edit your files', 'Pick which changes to save', 'Take the snapshot with a message', 'Share it online'],
        why: 'Edit, pick, commit, share. You will repeat this loop thousands of times.'
      },
      {
        type: 'match',
        q: 'Match each word to its meaning.',
        pairs: [['Repository', 'The project folder plus all its saved photos'], ['Commit', 'One saved photo of the project'], ['Commit message', 'The short note that says why'], ['Branch', 'Your own line of work, next to the others'], ['HEAD', 'The "you are here" sticker']],
        why: 'These five words show up in every lesson from here on.'
      },
      {
        type: 'fill',
        q: 'Fill in the sneak peek from picture 5.',
        text: 'git ___\ngit add .\ngit ___ -m "first save"\ngit log --___',
        options: ['init', 'commit', 'oneline', 'photo', 'start', 'save'],
        answer: ['init', 'commit', 'oneline'],
        hint: 'Scroll up to picture 5 and copy what you see.',
        why: 'init starts a repo, commit takes the photo, log --oneline lists them.'
      },
      {
        type: 'type',
        q: 'Ask Git to show the photo list, one per line.',
        context: ['# you made three commits today'],
        answers: ['git log --oneline'],
        hint: 'It starts with git log, then the flag from picture 5.',
        why: 'git log --oneline prints each commit as one short line. You will use it constantly.'
      }
    ]
  });

  /* ---------- shared drawing bits for lessons 2 to 4 ---------- */
  const box = (x, y, w, h, fill, r) => `<rect x="${x}" y="${y + 5}" width="${w}" height="${h}" rx="${r || 14}" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 14}" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const txt = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 800}"${o.mono ? ' font-family="JetBrains Mono, monospace"' : ''} fill="${o.c || P.ink}">${esc(s)}</text>`; };
  const laptop = (x, y, w, label, inner) => {
    const h = w * 0.62;
    return `<g transform="translate(${x} ${y})">${box(0, 0, w, h, P.white, 12)}<rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="6" fill="${P.paper}" stroke="${P.ink}" stroke-width="2"/>${inner || ''}
      <path d="M-14 ${h + 8} h${w + 28} l-10 14 h-${w + 8}z" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
      ${label ? txt(w / 2, h + 44, label, { s: 14 }) : ''}</g>`;
  };
  const cloud = (cx, cy, s, fill, label) => `<g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M-70 34 a30 30 0 0 1 4 -59 a42 42 0 0 1 78 -12 a32 32 0 0 1 58 22 a26 26 0 0 1 -6 49z" transform="translate(4 6)" fill="${P.ink}"/>
    <path d="M-70 34 a30 30 0 0 1 4 -59 a42 42 0 0 1 78 -12 a32 32 0 0 1 58 22 a26 26 0 0 1 -6 49z" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    ${label ? txt(0, 14, label, { s: 17 }) : ''}</g>`;
  const arrowDefs = `<defs>${[['a', P.accent], ['d', P.danger], ['o', P.ok], ['k', P.ink]].map(([n, c]) => `<marker id="m0${n}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${c}"/></marker>`).join('')}</defs>`;
  const arrow = (d, col, m) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="3.5" stroke-linecap="round" marker-end="url(#m0${m})"/>`;
  const key = (x, y, w, label) => `${box(x, y, w, 46, P.white, 10)}${txt(x + w / 2, y + 29, label, { s: 15, mono: true })}`;

  /* ---------- Lesson 2: Git and GitHub ---------- */
  const miniGraph = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 0 H96" stroke="${P.accent}" stroke-width="4"/>${[0, 48, 96].map((cx, i) => `<circle cx="${cx}" cy="0" r="12" fill="${i === 2 ? P.accent : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`).join('')}</g>`;
  const home = `<svg viewBox="0 0 560 330" role="img" aria-label="A laptop with Git inside. It works without wifi.">${arrowDefs}
    ${laptop(130, 30, 300, 'Your computer', `
      ${txt(150, 62, 'Git lives here', { s: 15, c: P.ink2 })}
      ${miniGraph(102, 104)}
      <g transform="translate(110 132)"><path d="M0 8 h22 l7 8 h44 v32 h-73z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.2" stroke-linejoin="round"/></g>
      ${txt(150, 164, '.git', { s: 13, mono: true })}`)}
    <g transform="translate(500 48)">
      ${[34, 22, 10].map(r => `<path d="M${-r} 0 a${r} ${r} 0 0 1 ${r * 2} 0" fill="none" stroke="${P.ink2}" stroke-width="4" stroke-linecap="round" transform="translate(0 ${34 - r})"/>`).join('')}
      <circle cx="0" cy="36" r="4.5" fill="${P.ink2}"/><path d="M-30 46 L30 -6" stroke="${P.danger}" stroke-width="5" stroke-linecap="round"/>
      ${txt(0, 76, 'no wifi? fine.', { s: 12.5, c: P.danger })}</g></svg>`;

  const gallery = `<svg viewBox="0 0 580 360" role="img" aria-label="GitHub is a cloud that holds repos. Two laptops push up and pull down.">${arrowDefs}
    ${cloud(290, 86, 1.75, P.tint)}
    ${txt(290, 62, 'GitHub', { s: 20, c: P.accent })}
    ${[0, 1, 2].map(i => `<g transform="translate(${208 + i * 58} 80)"><rect width="48" height="34" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>${txt(24, 22, 'repo', { s: 10.5, mono: true, c: P.ink2 })}</g>`).join('')}
    ${laptop(40, 210, 150, '', `${miniGraph(28, 46)}`)}
    ${laptop(390, 210, 150, '', `${miniGraph(28, 46)}`)}
    ${txt(115, 344, 'Sam (local)', { s: 13.5 })}${txt(465, 344, 'Ana (local)', { s: 13.5 })}
    ${arrow('M120 200 Q140 160 190 150', P.accent, 'a')}${txt(108, 172, 'push', { s: 13, mono: true, c: P.accent })}
    ${arrow('M392 150 Q440 160 460 200', P.ok, 'o')}${txt(470, 172, 'pull', { s: 13, mono: true, c: P.ok })}
    ${txt(290, 190, 'the remote', { s: 12.5, c: P.ink2 })}</svg>`;

  const hosts = `<svg viewBox="0 0 580 320" role="img" aria-label="One laptop with Git can connect to GitHub, GitLab or Bitbucket">
    ${cloud(100, 70, 1.05, P.tint, 'GitHub')}${cloud(290, 70, 1.05, P.warnT, 'GitLab')}${cloud(480, 70, 1.05, P.okT, 'Bitbucket')}
    ${[100, 290, 480].map(x => `<path d="M${x} 128 L290 ${180}" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="6 6"/>`).join('')}
    ${laptop(215, 176, 150, '', `${txt(65, 45, 'Git', { s: 20, c: P.accent })}${txt(65, 66, 'same tool', { s: 11.5, c: P.ink2 })}`)}
    ${txt(290, 316, 'Same Git. Pick a home online.', { s: 14 })}</svg>`;

  const tile = (x, y, label, icon, fill) => `${box(x, y, 230, 112, fill)}<g transform="translate(${x + 44} ${y + 56})">${icon}</g>${txt(x + 150, y + 62, label, { s: 15 })}`;
  const extras = `<svg viewBox="0 0 520 280" role="img" aria-label="GitHub adds pull requests, issues, Actions and stars">
    ${tile(20, 20, 'Pull requests', `<circle cx="-12" cy="-22" r="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="-12" cy="22" r="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="16" cy="22" r="7" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/><path d="M-12 -15 V15 M16 15 V-6 Q16 -22 0 -22" fill="none" stroke="${P.ink}" stroke-width="2.5"/>`, P.tint)}
    ${tile(270, 20, 'Issues', `<circle r="24" fill="${P.white}" stroke="${P.ok}" stroke-width="4"/><circle r="6" fill="${P.ok}"/>`, P.okT)}
    ${tile(20, 150, 'Actions', `<circle r="24" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><path d="M-7 -12 L13 0 L-7 12z" fill="${P.warn}" stroke="${P.ink}" stroke-width="2" stroke-linejoin="round"/>`, P.warnT)}
    ${tile(270, 150, 'Stars + profile', `<path d="M0 -26 L7.6 -9 L26 -7.5 L12 5 L16 24 L0 14 L-16 24 L-12 5 L-26 -7.5 L-7.6 -9z" fill="${P.white}" stroke="${P.danger}" stroke-width="3" stroke-linejoin="round"/>`, P.dangerT)}</svg>`;

  COURSE.add({
    id: 'l02', module: 0, minutes: 6,
    title: 'Git and GitHub.',
    kicker: 'Git vs GitHub',
    summary: 'They sound like twins, but they are different things. Git is a tool on your computer. GitHub is a website that keeps a copy of your repo online.',
    parts: [
      {
        pic: home,
        h: 'Git lives on your computer.',
        text: ['Git is a free program. You install it once, and it runs on <b>your</b> machine.', 'It keeps all your commits in a hidden folder called <code>.git</code> inside your project.', 'No internet needed. You can commit on a plane.']
      },
      {
        pic: gallery,
        h: 'GitHub lives on the internet.',
        text: ['GitHub is a website that stores Git repos online. Think of a shared photo gallery in the cloud.', 'Your copy is the <b>local</b> repo. The copy on GitHub is the <b>remote</b>.', 'You <b>push</b> your commits up. Friends <b>pull</b> them down.'],
        cmds: [
          { c: 'git push', d: 'Send your new commits up to the remote (GitHub). Module 3 covers it.' },
          { c: 'git pull', d: 'Bring new commits down from the remote into your copy.' }
        ]
      },
      {
        pic: hosts,
        h: 'GitHub is one of many homes.',
        text: ['GitLab and Bitbucket do the same job as GitHub. Git works with all of them.', 'Learn Git once and you can use any of them. This course uses GitHub because most people do.']
      },
      {
        pic: extras,
        h: 'GitHub adds teamwork tools.',
        text: ['Git only knows about commits. GitHub adds the people stuff on top.', '<b>Pull requests</b> ask a team to review and accept your changes. <b>Issues</b> are a to-do list for bugs and ideas. <b>Actions</b> are robots that test your code. <b>Stars</b> are likes.'],
        tip: 'Pull requests and issues belong to GitHub, not Git. They do not live in your .git folder.'
      },
      {
        pic: GH.areas({ n: 4, hi: [2, 3], arrows: [{ f: 2, t: 3, l: 'git push' }, { f: 3, t: 2, l: 'git pull', c: P.ok }] }),
        h: 'Two tools in your terminal.',
        text: ['<code>git</code> saves and moves commits. It talks to any host.', '<code>gh</code> is GitHub\'s own command line tool. It opens pull requests and issues without a browser. You will meet it in Module 3.'],
        cmds: [
          { c: 'gh repo view --web', d: 'Teaser: open the current repo\'s GitHub page in your browser.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'Is GitHub the same thing as Git?',
        options: ['Yes, two names for one thing', 'No. Git is a tool, GitHub is a website that hosts Git repos', 'No. GitHub is the newer version of Git', 'Yes, but GitHub costs money'],
        answer: 1,
        hints: { 0: 'Look at pictures 1 and 2. One is on your laptop, one is in the cloud.', 2: 'GitHub is not a version of Git. It uses Git.', 3: 'They are different things, and both have free options.' },
        why: 'Git is the program. GitHub is one website that stores Git repos and adds teamwork tools.'
      },
      {
        type: 'pick',
        q: 'You are on a plane with no wifi. What still works?',
        options: ['Making commits with Git', 'Opening a pull request', 'Pushing to GitHub', 'Nothing at all'],
        answer: 0,
        hints: { 1: 'Pull requests live on the GitHub website, so they need the internet.', 2: 'Pushing sends commits to GitHub, which needs the internet.', 3: 'Git runs on your own computer. Some things work.' },
        why: 'Git is local. You can commit offline and push later when you land.'
      },
      {
        type: 'bucket',
        q: 'Sort each thing to where it belongs.',
        buckets: ['Git (your computer)', 'GitHub (website)'],
        items: [['Takes snapshots (commits)', 0], ['Works with no internet', 0], ['Keeps history in a .git folder', 0], ['Pull requests', 1], ['Issues', 1], ['Actions robots', 1], ['Shares your repo with the world', 1]],
        why: 'Commits and history are Git. Pull requests, issues, Actions and sharing are GitHub.'
      },
      {
        type: 'match',
        q: 'Match each word to its meaning.',
        pairs: [['Local', 'The copy on your own computer'], ['Remote', 'A copy somewhere else, like on GitHub'], ['git push', 'Send my commits up'], ['git pull', 'Bring new commits down'], ['GitLab', 'Another website that hosts Git repos']],
        why: 'Local and remote, push and pull. These four words carry the whole of Module 3.'
      },
      {
        type: 'order',
        q: 'Sam fixes a typo and Ana gets it. Put the steps in order.',
        items: ['Sam edits the file on his laptop', 'Sam commits with Git', 'Sam pushes to GitHub', 'Ana pulls from GitHub'],
        why: 'Work and commit locally, push up, then others pull down.'
      },
      {
        type: 'fill',
        q: 'Fill in the two directions.',
        text: 'git ___    # send my commits up to GitHub\ngit ___    # bring new commits down to me',
        options: ['push', 'pull', 'send', 'get', 'upload', 'download'],
        answer: ['push', 'pull'],
        hint: 'Look at the arrows in picture 2.',
        why: 'push goes up, pull comes down.'
      },
      {
        type: 'type',
        q: 'Type the command that sends your commits to GitHub.',
        context: ['# you just made 2 commits on your laptop'],
        answers: ['git push'],
        hint: 'It is git, then the word for sending up.',
        why: 'git push uploads your new commits to the remote.'
      }
    ]
  });

  /* ---------- Lesson 3: The terminal ---------- */
  const bubble = (x, y, w, lines, mine) => {
    const h = 22 + lines.length * 22;
    return `<g transform="translate(${x} ${y})">${box(0, 0, w, h, mine ? P.paper2 : P.white, 16)}${lines.map((l, i) => txt(16, 30 + i * 22, l, { a: 'start', s: 14, mono: true, c: mine ? P.accent : P.ink })).join('')}</g>`;
  };
  const chat = `<svg viewBox="0 0 560 330" role="img" aria-label="A chat: you type ls and pwd, the computer answers">
    <g transform="translate(32 40)">${box(0, 0, 70, 52, P.night || '#15132B', 8)}<rect x="10" y="10" width="50" height="32" rx="4" fill="#15132B"/>${txt(35, 32, '$_', { s: 14, mono: true, c: '#7CF0B5' })}<rect x="22" y="58" width="26" height="10" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/></g>
    ${txt(67, 132, 'computer', { s: 12, c: P.ink2 })}
    <g transform="translate(488 50)"><circle r="24" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="-8" cy="-4" r="3" fill="${P.ink}"/><circle cx="8" cy="-4" r="3" fill="${P.ink}"/><path d="M-9 8 q9 8 18 0" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/></g>
    ${txt(488, 96, 'you', { s: 12, c: P.ink2 })}
    ${bubble(300, 30, 150, ['$ ls'], true)}
    ${bubble(120, 90, 250, ['notes.txt  photos/'])}
    ${bubble(300, 168, 150, ['$ pwd'], true)}
    ${bubble(120, 228, 250, ['/Users/sam'])}</svg>`;

  const NODES = {
    root: [280, 34, '/'], users: [280, 94, 'Users'], sam: [280, 154, 'sam  (~)'],
    desk: [130, 220, 'Desktop'], proj: [290, 220, 'projects'],
    web: [210, 292, 'website'], notes: [380, 292, 'notes.txt']
  };
  const EDGES = [['root', 'users'], ['users', 'sam'], ['sam', 'desk'], ['sam', 'proj'], ['proj', 'web'], ['proj', 'notes']];
  const tree = (here, extra, noPin) => {
    let s = EDGES.map(([a, b]) => { const [x1, y1] = NODES[a], [x2, y2] = NODES[b]; return `<path d="M${x1} ${y1 + 14} C${x1} ${y1 + 40} ${x2} ${y2 - 40} ${x2} ${y2 - 14}" fill="none" stroke="${P.ink2}" stroke-width="2.5"/>`; }).join('');
    Object.entries(NODES).forEach(([id, [x, y, l]]) => {
      const w = l.length * 8.6 + 26, file = l.includes('.');
      s += `<rect x="${x - w / 2}" y="${y - 15 + 4}" width="${w}" height="30" rx="${file ? 6 : 15}" fill="${P.ink}"/><rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="30" rx="${file ? 6 : 15}" fill="${id === here ? P.accent : file ? P.white : P.warnT}" stroke="${P.ink}" stroke-width="2.2"/>${txt(x, y + 5, l, { s: 13, mono: true, c: id === here ? P.white : P.ink })}`;
    });
    if (here && !noPin) { const [x, y] = NODES[here]; s += `<g transform="translate(${x + 62} ${y - 28})"><rect width="96" height="22" rx="11" fill="${P.ink}"/>${txt(48, 15, 'you are here', { s: 11, c: P.white })}</g>`; }
    return `<svg viewBox="0 0 560 330" role="img" aria-label="Folders drawn as a tree, starting at slash">${arrowDefs}${s}${extra || ''}</svg>`;
  };
  const treePic = tree('proj');
  const movePic = tree('proj',
    arrow('M250 236 Q205 250 208 272', P.accent, 'a') + `<g transform="translate(70 281)"><rect width="96" height="22" rx="11" fill="${P.white}" stroke="${P.accent}" stroke-width="2"/>${txt(48, 15, 'cd website', { s: 11.5, mono: true, c: P.accent })}</g>` +
    arrow('M262 206 Q234 190 248 170', P.danger, 'd') + `<g transform="translate(160 146)"><rect width="56" height="22" rx="11" fill="${P.white}" stroke="${P.danger}" stroke-width="2"/>${txt(28, 15, 'cd ..', { s: 11.5, mono: true, c: P.danger })}</g>` +
    arrow('M424 292 Q540 240 332 152', P.ok, 'o') + `<g transform="translate(480 270)"><rect width="56" height="22" rx="11" fill="${P.white}" stroke="${P.ok}" stroke-width="2"/>${txt(28, 15, 'cd ~', { s: 11.5, mono: true, c: P.ok })}</g>`, true);

  const page = (x, y, lines, fill) => `<g transform="translate(${x} ${y})"><path d="M3 5 h40 l14 14 v56 h-54z" fill="${P.ink}"/><path d="M0 0 h40 l14 14 v56 h-54z" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"/><path d="M40 0 v14 h14" fill="none" stroke="${P.ink}" stroke-width="2.3"/>${(lines || []).map((l, i) => txt(8, 30 + i * 16, l, { a: 'start', s: 11, mono: true })).join('')}</g>`;
  const folder = (x, y, fill) => `<g transform="translate(${x} ${y})"><path d="M3 5 h26 l8 9 h38 v44 h-72z" fill="${P.ink}"/><path d="M0 0 h26 l8 9 h38 v44 h-72z" fill="${fill || P.warnT}" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"/></g>`;
  const panel = (i, icon, cmd, note) => { const x = 14 + i * 146; return `${box(x, 20, 132, 210, P.white)}<g transform="translate(${x + 38} 54)">${icon}</g>${txt(x + 66, 168, cmd, { s: 11.5, mono: true, c: P.accent })}${txt(x + 66, 196, note, { s: 12, c: P.ink2 })}`; };
  const making = `<svg viewBox="0 0 600 250" role="img" aria-label="mkdir makes a folder, touch makes an empty file, echo writes text, double arrow adds a line">
    ${panel(0, folder(-10, 10), 'mkdir css', 'new folder')}
    ${panel(1, page(0, 0, []), 'touch a.txt', 'new empty file')}
    ${panel(2, page(0, 0, ['hi']), 'echo hi > a.txt', 'write (replace)')}
    ${panel(3, page(0, 0, ['hi', 'again'], P.okT), 'echo again >>', 'add to the end')}</svg>`;

  const cpmvrm = `<svg viewBox="0 0 600 250" role="img" aria-label="cp copies a file, mv moves or renames it, rm deletes it for good">${arrowDefs}
    ${box(14, 20, 180, 210)}${page(42, 50, ['a']) }${page(112, 50, ['a'], P.tint)}${arrow('M98 92 L108 92', P.accent, 'a')}${txt(104, 168, 'cp a.txt b.txt', { s: 11.5, mono: true, c: P.accent })}${txt(104, 196, 'copy', { s: 13, c: P.ink2 })}
    ${box(210, 20, 180, 210)}${page(232, 50, ['a'])}${folder(308, 62)}${arrow('M290 86 Q300 70 316 80', P.ok, 'o')}${txt(300, 168, 'mv a.txt docs/', { s: 11.5, mono: true, c: P.ok })}${txt(300, 196, 'move or rename', { s: 13, c: P.ink2 })}
    ${box(406, 20, 180, 210, P.dangerT)}<g transform="translate(470 46)"><rect x="-4" y="0" width="60" height="10" rx="4" fill="${P.white}" stroke="${P.ink}" stroke-width="2.3"/><rect x="16" y="-8" width="20" height="9" rx="3" fill="${P.white}" stroke="${P.ink}" stroke-width="2.3"/><path d="M2 14 h48 l-6 66 h-36z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"/>${[16, 26, 36].map(x => `<path d="M${x} 24 v46" stroke="${P.danger}" stroke-width="2.5"/>`).join('')}</g>${txt(496, 168, 'rm a.txt', { s: 11.5, mono: true, c: P.danger })}${txt(496, 196, 'gone. no trash bin.', { s: 13, c: P.danger })}</svg>`;

  const keys = `<svg viewBox="0 0 560 270" role="img" aria-label="Keyboard keys: Tab finishes names, Up arrow repeats, Control C stops, q quits a list">
    ${key(24, 26, 80, 'Tab')}${txt(118, 54, 'finishes names for you', { a: 'start', s: 14 })}
    ${key(24, 88, 80, '↑')}${txt(118, 116, 'brings back your last command', { a: 'start', s: 14 })}
    ${key(24, 150, 60, 'Ctrl')}${txt(96, 178, '+', { s: 18 })}${key(108, 150, 46, 'C')}${txt(168, 178, 'stops a running command', { a: 'start', s: 14 })}
    ${key(24, 212, 46, 'q')}${txt(84, 240, 'quits a long list (like git log)', { a: 'start', s: 14 })}</svg>`;

  COURSE.add({
    id: 'l03', module: 0, minutes: 10,
    title: 'The terminal.',
    kicker: 'Terminal basics',
    summary: 'The terminal is a text chat with your computer. Learn about fifteen words and you can walk around your folders, make files, and run Git.',
    parts: [
      {
        pic: chat,
        h: 'A chat with your computer.',
        text: ['You type a command. Press <b>Enter</b>. The computer answers.', 'On a Mac open <b>Terminal</b> (it runs a shell called zsh). On Windows use <b>Git Bash</b>, which comes with Git, or PowerShell. On Linux open <b>Terminal</b> (usually bash).', 'The text before your cursor, often ending in <code>$</code> or <code>%</code>, is the <b>prompt</b>. You never type the <code>$</code> yourself.']
      },
      {
        pic: treePic,
        h: 'Folders are a tree.',
        text: ['Every folder sits inside another folder, all the way up to the top, called <code>/</code> (root).', 'You are always standing in one folder. <code>pwd</code> tells you which. <code>ls</code> lists what is inside.', 'Files starting with a dot, like <code>.git</code>, are <b>hidden</b>. <code>ls -la</code> shows them too.'],
        cmds: [
          { c: 'pwd', d: 'Print the folder you are in right now (print working directory).' },
          { c: 'ls', d: 'List the files and folders here.' },
          { c: 'ls -la', d: 'List everything, including hidden dot files, with details.' }
        ]
      },
      {
        pic: movePic,
        h: 'Walk around with cd.',
        text: ['<code>cd</code> means change directory. A directory is just a folder.', 'A <b>relative</b> path starts from where you stand, like <code>website</code>. An <b>absolute</b> path starts from the top, like <code>/Users/sam/projects</code>, and works from anywhere.', '<code>..</code> means "one folder up". <code>~</code> means your home folder.'],
        cmds: [
          { c: 'cd website', d: 'Go into the folder called website (relative path).' },
          { c: 'cd ..', d: 'Go up one folder.' },
          { c: 'cd ~', d: 'Go to your home folder. Plain cd does the same.' },
          { c: 'cd -', d: 'Jump back to the folder you were in before.' },
          { c: 'cd /Users/sam/projects', d: 'Go to an exact place using an absolute path.' }
        ]
      },
      {
        pic: making,
        h: 'Make folders and files.',
        text: ['<code>mkdir</code> makes a folder. <code>touch</code> makes an empty file.', '<code>echo "hi" &gt; a.txt</code> writes text into a file and <b>replaces</b> what was there. Two arrows <code>&gt;&gt;</code> <b>add</b> to the end instead.', '<code>cat</code> prints a file so you can read it.'],
        cmds: [
          { c: 'mkdir my-site', d: 'Make a new folder.' },
          { c: 'mkdir -p src/css/themes', d: 'Make folders inside folders in one go.' },
          { c: 'touch index.html', d: 'Make a new empty file.' },
          { c: 'echo "hi" > notes.txt', d: 'Write text into a file, replacing what was there.' },
          { c: 'echo "again" >> notes.txt', d: 'Add a line to the end of a file.' },
          { c: 'cat notes.txt', d: 'Show what is inside a file.' }
        ]
      },
      {
        pic: cpmvrm,
        h: 'Copy, move, delete.',
        text: ['<code>cp</code> copies. <code>mv</code> moves, and also renames.', '<code>rm</code> deletes. There is no trash bin and no "are you sure". Read the line twice before you press Enter.'],
        cmds: [
          { c: 'cp a.txt b.txt', d: 'Copy a file.' },
          { c: 'mv a.txt docs/', d: 'Move a file into another folder.' },
          { c: 'mv old.txt new.txt', d: 'Rename a file.' },
          { c: 'rm a.txt', d: 'Delete a file forever.' },
          { c: 'rm -r old-folder', d: 'Delete a folder and everything inside it.' }
        ],
        warn: '<code>rm -r</code> on the wrong folder deletes it for good. Git can only bring back files you had committed.'
      },
      {
        pic: keys,
        h: 'Keyboard superpowers.',
        text: ['Type the first letters of a name, then press <b>Tab</b>. The terminal finishes it.', 'Press <b>Up</b> to bring back an old command. <b>Ctrl + C</b> stops something stuck.', 'Long output like <code>git log</code> opens in a scroller called a <b>pager</b>. Press <b>q</b> to leave it.'],
        cmds: [
          { c: 'clear', d: 'Wipe the screen clean. Your files are not touched.' },
          { c: 'code .', d: 'Open this folder in VS Code (if installed).' },
          { c: 'open .', d: 'Open this folder in Finder (macOS).' },
          { c: 'explorer .', d: 'Open this folder in File Explorer (Windows).' }
        ],
        tip: 'Copying and pasting commands is normal. Professionals do it all day.'
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What does <code>pwd</code> do?',
        options: ['Shows which folder you are in', 'Changes your password', 'Deletes the current folder', 'Lists all files'],
        answer: 0,
        hints: { 1: 'Good guess from the letters, but no. It stands for print working directory.', 2: 'pwd never changes anything. It only tells you something.', 3: 'That is ls.' },
        why: 'pwd prints the full path of the folder you are standing in.'
      },
      {
        type: 'type',
        q: 'You are in <code>~/projects</code>. Go into the <code>website</code> folder.',
        prompt: '~/projects $',
        answers: ['cd website', 'cd website/', 'cd ./website', 'cd ./website/'],
        hint: 'Change directory, then the folder name.',
        why: 'cd website moves you one folder down into website.'
      },
      {
        type: 'type',
        q: 'Now go back up one folder.',
        prompt: '~/projects/website $',
        answers: ['cd ..', 'cd ../', 'cd -'],
        hint: 'Two dots mean one folder up.',
        why: 'cd .. moves you up to the parent folder.'
      },
      {
        type: 'order',
        q: 'Start a new website project. Put the commands in order.',
        items: ['mkdir my-site', 'cd my-site', 'touch index.html', 'ls'],
        why: 'Make the folder, step inside, create a file, then look to check it is there.'
      },
      {
        type: 'match',
        q: 'Match each command to what it does.',
        pairs: [['ls', 'List what is in this folder'], ['mkdir', 'Make a new folder'], ['touch', 'Make a new empty file'], ['cat', 'Show what is inside a file'], ['mv', 'Move or rename'], ['rm', 'Delete forever']],
        why: 'These six cover most of your daily file work.'
      },
      {
        type: 'bucket',
        q: 'Which commands are safe, and which can destroy work?',
        buckets: ['Safe any time', 'Can destroy files'],
        items: [['pwd', 0], ['ls -la', 0], ['cat notes.txt', 0], ['cd ..', 0], ['clear', 0], ['rm notes.txt', 1], ['rm -r old', 1], ['echo "x" > notes.txt', 1]],
        hint: 'A single > replaces what was inside the file.',
        why: 'Looking and moving is safe. rm deletes, and a single > overwrites the whole file.'
      },
      {
        type: 'fill',
        q: 'Replace the file, then add a line to it.',
        text: 'echo "hello" ___ notes.txt   # replace\necho "again" ___ notes.txt   # add to end',
        options: ['>', '>>', '<', '|', '&'],
        answer: ['>', '>>'],
        hint: 'One arrow writes fresh. Two arrows add on.',
        why: '> replaces the file. >> appends to the end.'
      },
      {
        type: 'bucket',
        q: 'Absolute or relative path?',
        buckets: ['Absolute (starts at the top)', 'Relative (starts where you are)'],
        items: [['/Users/sam/projects', 0], ['/etc', 0], ['/', 0], ['website', 1], ['../photos', 1], ['./notes.txt', 1]],
        hint: 'Absolute paths always begin with a slash.',
        why: 'A leading / means start from the root. Anything else starts from the current folder.'
      },
      {
        type: 'pick',
        q: '<code>git log</code> filled the screen and you are stuck. What do you press?',
        options: ['q', 'Esc', 'Ctrl + Z', 'Close the laptop'],
        answer: 0,
        hints: { 1: 'Esc does nothing in the pager.', 2: 'Ctrl + Z pauses the program in the background. It is still there.', 3: 'Please do not.' },
        why: 'q quits the pager and gives you your prompt back.'
      }
    ]
  });

  /* ---------- Lesson 4: Set up Git ---------- */
  const machine = (x, label, fill, mark) => laptop(x, 40, 150, label, `<g transform="translate(75 38)">${mark}</g>${txt(65, 76, 'git version 2.x', { s: 10.5, mono: true, c: P.ok })}`.replace('translate(75 38)', 'translate(65 36)'));
  const installPic = `<svg viewBox="0 0 580 230" role="img" aria-label="Three laptops for macOS, Windows and Linux, each showing git version 2">
    ${machine(24, 'macOS', P.white, `<circle r="18" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.3"/>${txt(0, 5, 'mac', { s: 11 })}`)}
    ${machine(214, 'Windows', P.white, [[-10, -10], [10, -10], [-10, 10], [10, 10]].map(([x, y]) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" fill="${P.tint}" stroke="${P.ink}" stroke-width="2"/>`).join(''))}
    ${machine(404, 'Linux', P.white, `<ellipse rx="15" ry="19" fill="${P.ink}"/><ellipse cy="5" rx="9" ry="12" fill="${P.white}"/><path d="M-6 -20 l12 0 l-6 8z" fill="${P.warn}"/>`)}</svg>`;

  const nameTag = `<svg viewBox="0 0 560 290" role="img" aria-label="A name tag with your name and email, stuck on every commit">
    <g transform="translate(24 40)">${box(0, 0, 290, 200, P.white, 18)}<path d="M2 16 a14 14 0 0 1 14 -14 h258 a14 14 0 0 1 14 14 v58 h-286z" fill="${P.accent}"/>
      ${txt(145, 36, 'HELLO', { s: 24, c: P.white })}${txt(145, 60, 'my name is', { s: 13, c: P.white, w: 700 })}
      ${txt(145, 126, 'Sam Lee', { s: 32 })}${txt(145, 166, 'sam@example.com', { s: 14, mono: true, c: P.ink2 })}</g>
    <g transform="translate(350 64)">${box(0, 0, 180, 150, P.white, 10)}<rect x="12" y="12" width="156" height="52" rx="6" fill="${P.paper}" stroke="${P.ink}" stroke-width="2"/>${txt(90, 44, 'commit 3f9a1c2', { s: 12, mono: true })}
      ${txt(14, 90, 'Author: Sam Lee', { a: 'start', s: 12, mono: true, c: P.accent })}${txt(14, 112, 'sam@example.com', { a: 'start', s: 11.5, mono: true, c: P.ink2 })}${txt(14, 134, 'Fix typo', { a: 'start', s: 12, mono: true })}</g>
    <path d="M318 140 L346 140" stroke="${P.ink}" stroke-width="3" stroke-dasharray="5 5"/></svg>`;

  const settingRow = (y, label, val) => `${txt(40, y + 25, label, { a: 'start', s: 15 })}<rect x="300" y="${y + 4}" width="190" height="32" rx="16" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.2"/>${txt(395, y + 25, val, { s: 13, mono: true, c: P.accent })}`;
  const defaultsPic = `<svg viewBox="0 0 530 250" role="img" aria-label="Settings panel: default branch main, editor VS Code">
    ${box(14, 20, 500, 210, P.white, 18)}<rect x="16" y="22" width="496" height="40" rx="16" fill="${P.sand}"/>${txt(264, 48, 'Git settings', { s: 15 })}
    ${settingRow(78, 'First branch name', 'main')}
    <line x1="40" y1="134" x2="490" y2="134" stroke="${P.sand}" stroke-width="2"/>
    ${settingRow(144, 'Text editor', 'code --wait')}</svg>`;

  const slab = (y, label, sub, file, fill) => `<g transform="translate(70 ${y})"><path d="M0 0 h340 l40 -30 h-340z" fill="${fill}" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"/><rect x="0" y="0" width="340" height="56" fill="${fill}" stroke="${P.ink}" stroke-width="2.3"/><path d="M340 0 l40 -30 v56 l-40 30z" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"/>
    ${txt(18, 24, label, { a: 'start', s: 16 })}${txt(18, 44, sub, { a: 'start', s: 12, w: 700, c: P.ink2 })}${txt(322, 36, file, { a: 'end', s: 11.5, mono: true, c: P.ink2 })}</g>`;
  const layers = `<svg viewBox="0 0 560 330" role="img" aria-label="Three layers of settings: local on top wins over global, which wins over system">${arrowDefs}
    ${slab(230, 'System', 'every user on this computer', 'git --system', P.sand)}
    ${slab(150, 'Global', 'you, in every repo', '~/.gitconfig', P.warnT)}
    ${slab(70, 'Local', 'only this one repo', '.git/config', P.tint)}
    ${arrow('M500 286 L500 56', P.accent, 'a')}${txt(512, 50, 'wins', { a: 'start', s: 14, c: P.accent })}</svg>`;

  const vimPic = `<svg viewBox="0 0 560 300" role="img" aria-label="Escape from vim: press Esc, then type colon w q to save and quit, or colon q bang to quit without saving">
    <g transform="translate(20 20)">${box(0, 0, 260, 250, '#15132B', 14)}
      ${['Fix the login bug', '~', '~', '~', '~'].map((l, i) => txt(16, 34 + i * 26, l, { a: 'start', s: 13, mono: true, c: i ? '#6E69B8' : '#ECEAFF' })).join('')}
      ${txt(16, 226, '-- INSERT --', { a: 'start', s: 13, mono: true, c: '#7CF0B5' })}</g>
    ${key(310, 30, 70, 'Esc')}${txt(394, 59, 'first, always', { a: 'start', s: 13, c: P.ink2 })}
    ${key(310, 110, 70, ':wq')}${txt(394, 132, 'save and quit', { a: 'start', s: 14 })}${txt(394, 150, 'then Enter', { a: 'start', s: 12, c: P.ink2 })}
    ${key(310, 190, 70, ':q!')}${txt(394, 212, 'quit, throw away', { a: 'start', s: 14, c: P.danger })}${txt(394, 230, 'then Enter', { a: 'start', s: 12, c: P.ink2 })}</svg>`;

  COURSE.add({
    id: 'l04', module: 0, minutes: 8,
    title: 'Set up Git.',
    kicker: 'Install and configure',
    summary: 'Install Git, tell it your name and email, and pick a few good defaults. You do this once per computer.',
    parts: [
      {
        pic: installPic,
        h: 'Install Git.',
        text: ['Pick the line for your computer and run it in the terminal.', 'On Windows you can also download <b>Git for Windows</b> from git-scm.com. It gives you Git Bash too.', 'Then check it worked with <code>git --version</code>.'],
        cmds: [
          { c: 'xcode-select --install', d: 'macOS: install Apple\'s developer tools, which include Git.' },
          { c: 'brew install git', d: 'macOS with Homebrew: install the newest Git.' },
          { c: 'winget install --id Git.Git -e', d: 'Windows: install Git for Windows.' },
          { c: 'sudo apt install git', d: 'Ubuntu or Debian Linux: install Git.' },
          { c: 'git --version', d: 'Check Git is installed and see which version.' }
        ]
      },
      {
        pic: nameTag,
        h: 'Tell Git who you are.',
        text: ['Every commit carries a name tag. Git needs your name and email to write it.', 'Use the <b>same email</b> as your GitHub account, so GitHub links your commits to your profile.'],
        cmds: [
          { c: 'git config --global user.name "Sam Lee"', d: 'Set the name stamped on your commits.' },
          { c: 'git config --global user.email "sam@example.com"', d: 'Set the email stamped on your commits.' }
        ],
        tip: 'Quotes are needed when the value has a space, like a full name.'
      },
      {
        pic: defaultsPic,
        h: 'Pick good defaults.',
        text: ['Name the first branch of new repos <code>main</code>. That is what GitHub uses.', 'Choose the editor Git opens when it needs a longer message. <code>code --wait</code> means VS Code. <code>nano</code> is a simple one in the terminal.'],
        cmds: [
          { c: 'git config --global init.defaultBranch main', d: 'New repos start on a branch called main.' },
          { c: 'git config --global core.editor "code --wait"', d: 'Use VS Code as Git\'s editor.' },
          { c: 'git config --global core.editor nano', d: 'Use nano, a simple terminal editor, instead.' }
        ]
      },
      {
        pic: layers,
        h: 'Three layers of settings.',
        text: ['<b>System</b> covers everyone on the computer. <b>Global</b> covers you, in all your repos, and lives in <code>~/.gitconfig</code>. <b>Local</b> covers one repo only, in <code>.git/config</code>.', 'The closer layer <b>wins</b>. A local email beats your global one.'],
        cmds: [
          { c: 'git config --local user.email "sam@work.com"', d: 'Use a different email in this one repo only. Run it inside the repo.' },
          { c: 'git config --system core.autocrlf input', d: 'Set something for every user on the machine (needs admin rights).' }
        ],
        tip: 'Leave out the flag and git config writes to --local.'
      },
      {
        pic: term(['$ git config --list --show-origin', 'file:~/.gitconfig   user.name=Sam Lee', 'file:~/.gitconfig   user.email=sam@example.com', 'file:~/.gitconfig   init.defaultbranch=main', 'file:.git/config    user.email=sam@work.com', '$ git config user.email', 'sam@work.com'], 'check your settings'),
        h: 'Check your settings.',
        text: ['<code>git config --list</code> prints every setting. Add <code>--show-origin</code> to see which file each one came from.', 'Ask for one value by giving just its name.'],
        cmds: [
          { c: 'git config --list', d: 'Show all your settings.' },
          { c: 'git config --list --show-origin', d: 'Show all settings and the file each one comes from.' },
          { c: 'git config user.name', d: 'Show one setting (the one that wins here).' },
          { c: 'git config --global --edit', d: 'Open your global settings file in your editor.' }
        ]
      },
      {
        pic: vimPic,
        h: 'Get help, and escape vim.',
        text: ['Every command has a manual. <code>-h</code> gives a short list of options. <code>git help</code> opens the full page.', 'If Git opens a strange screen with <code>~</code> lines, you are in <b>vim</b>. Press <b>Esc</b>, type <code>:wq</code> and Enter to save and leave.'],
        cmds: [
          { c: 'git help commit', d: 'Open the full manual page for a command.' },
          { c: 'git commit -h', d: 'Print a short summary of a command\'s options.' },
          { c: 'man git-commit', d: 'Same full manual, through the system man reader. Press q to quit.' }
        ],
        warn: '<code>:q!</code> quits vim and throws away what you typed. Use it when you want to cancel.'
      }
    ],
    quiz: [
      {
        type: 'order',
        q: 'Set up a brand new laptop. Put the steps in order.',
        items: ['Install Git', 'Check it with git --version', 'Set your user.name', 'Set your user.email', 'Set init.defaultBranch to main'],
        why: 'Install, confirm, then name, email and defaults. Once per computer.'
      },
      {
        type: 'type',
        q: 'Check that Git is installed.',
        prompt: '~ $',
        answers: ['git --version', 'git version'],
        hint: 'git, then a flag that asks for the version.',
        why: 'git --version prints something like git version 2.47.0.'
      },
      {
        type: 'type',
        q: 'Set your name to <b>Sam Lee</b> for all your repos.',
        prompt: '~ $',
        answers: ['git config --global user.name "Sam Lee"'],
        accept: '^git config --global user\\.name ".+"$',
        hint: 'git config, the --global flag, user.name, then the name in quotes.',
        why: 'git config --global user.name "Sam Lee" writes your name into ~/.gitconfig.'
      },
      {
        type: 'fill',
        q: 'Set your email for every repo.',
        text: 'git config ___ user.___ "sam@example.com"',
        options: ['--global', 'email', 'name', '--mail', 'global', '--all'],
        answer: ['--global', 'email'],
        hint: 'Flags start with two dashes. The setting is user dot something.',
        why: 'git config --global user.email sets the email on all your commits.'
      },
      {
        type: 'match',
        q: 'Match each flag or command to its meaning.',
        pairs: [['--system', 'Every user on this computer'], ['--global', 'You, in all your repos (~/.gitconfig)'], ['--local', 'Only this one repo (.git/config)'], ['git help commit', 'The full manual page'], ['git commit -h', 'A short list of options']],
        why: 'Three layers of settings, and two ways to get help.'
      },
      {
        type: 'pick',
        q: 'Your global email is personal. Inside a work repo you set a <b>local</b> work email. Which email do commits in that repo use?',
        options: ['The local work email', 'The global personal email', 'Both emails', 'Git refuses to commit'],
        answer: 0,
        hints: { 1: 'Look at picture 4. Which layer is on top?', 2: 'A commit has exactly one author email.', 3: 'Two layers is normal. Git just picks one.' },
        why: 'The closest layer wins. Local beats global, and global beats system.'
      },
      {
        type: 'bucket',
        q: 'Which install command goes with which computer?',
        buckets: ['macOS', 'Windows', 'Linux'],
        items: [['brew install git', 0], ['xcode-select --install', 0], ['winget install --id Git.Git -e', 1], ['Git for Windows installer', 1], ['sudo apt install git', 2]],
        why: 'brew and xcode-select are Mac tools, winget is Windows, apt is Debian and Ubuntu Linux.'
      },
      {
        type: 'pick',
        q: 'Git dropped you into vim. You typed your message. How do you save and quit?',
        options: ['Esc, then :wq and Enter', 'Ctrl + C', 'Type exit', 'Press q'],
        answer: 0,
        hints: { 1: 'Ctrl + C does not leave vim.', 2: 'vim would just type the word exit into your message.', 3: 'In insert mode, q is just a letter.' },
        why: 'Esc leaves typing mode. :wq means write, then quit.'
      }
    ]
  });
})();
