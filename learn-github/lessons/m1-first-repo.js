/* Module 1: Your first repo. Lessons 5 to 12. */
(function () {
  const { P, graph, term, areas, esc } = GH;

  /* ---------- tiny SVG kit ---------- */
  const svg = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  const box = (x, y, w, h, fill, r) => `<rect x="${x + 4}" y="${y + 5}" width="${w}" height="${h}" rx="${r || 14}" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 14}" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 800}" fill="${o.f || P.ink}"${o.m ? ' font-family="JetBrains Mono, monospace"' : ''}>${esc(s)}</text>`; };
  const arrow = (x1, y1, x2, y2, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), b = 13, s = 7;
    const p1 = [x2 - b * Math.cos(a) + s * Math.sin(a), y2 - b * Math.sin(a) - s * Math.cos(a)];
    const p2 = [x2 - b * Math.cos(a) - s * Math.sin(a), y2 - b * Math.sin(a) + s * Math.cos(a)];
    const ex = x2 - (b - 2) * Math.cos(a), ey = y2 - (b - 2) * Math.sin(a);
    return `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${col || P.ink}" stroke-width="${w || 3}" stroke-linecap="round"/><path d="M${x2} ${y2} L${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}z" fill="${col || P.ink}"/>`;
  };
  const folder = (x, y, w, fill) => { const h = w * .72; return `<path d="M${x + 4} ${y + 5} h${w * .38} l${w * .08} ${h * .14} h${w * .54} v${h * .86} h-${w}z" fill="${P.ink}"/><path d="M${x} ${y} h${w * .38} l${w * .08} ${h * .14} h${w * .54} v${h * .86} h-${w}z" fill="${fill || P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`; };
  const file = (x, y, name, fill, mark) => `<g transform="translate(${x} ${y})"><path d="M3 4 h30 l12 12 v42 h-42z" fill="${P.ink}"/><path d="M0 0 h30 l12 12 v42 h-42z" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.2" stroke-linejoin="round"/><path d="M30 0 v12 h12" fill="none" stroke="${P.ink}" stroke-width="2.2"/>${[20, 29, 38].map(l => `<rect x="7" y="${l}" width="${l === 38 ? 16 : 27}" height="4" rx="2" fill="${P.sand}"/>`).join('')}${mark ? `<circle cx="40" cy="48" r="11" fill="${mark[1]}" stroke="${P.ink}" stroke-width="2"/><text x="40" y="52.5" text-anchor="middle" font-size="12" font-weight="800" fill="${P.white}">${esc(mark[0])}</text>` : ''}${name ? `<text x="21" y="76" text-anchor="middle" font-size="11.5" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">${esc(name)}</text>` : ''}</g>`;
  const pillT = (x, y, s, fill, col, mono) => { const w = s.length * (mono ? 8 : 7.4) + 22; return `<rect x="${x - w / 2}" y="${y - 13}" width="${w}" height="26" rx="13" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>${T(x, y + 4.5, s, { s: 12.5, f: col || P.ink, m: mono })}`; };

  /* =====================================================================
     l05  init and status
     ===================================================================== */
  const initPic = svg(600, 270, 'A plain folder becomes a repo with a hidden .git memory box inside',
    folder(40, 70, 160) + T(120, 195, 'my-app', { s: 15 }) + T(120, 218, 'just a folder', { s: 12, w: 700, f: P.mute }) +
    arrow(232, 120, 352, 120, P.accent, 3.5) + pillT(292, 92, 'git init', P.white, P.accent, true) +
    folder(390, 70, 170, P.okT) + box(430, 118, 90, 46, P.tint, 10) + T(475, 146, '.git', { s: 16, m: true, f: P.accent }) +
    T(475, 205, 'my-app', { s: 15 }) + T(475, 228, 'now a repo, with a memory', { s: 12, w: 700, f: P.mute }));

  const gitDirPic = svg(600, 300, 'Inside the hidden .git folder: objects, refs, HEAD and config',
    box(20, 20, 560, 260, P.paper2, 20) + T(300, 54, '.git/  (hidden)', { s: 16, m: true }) +
    [['objects/', 'every photo, packed small', P.okT], ['refs/', 'branch name stickers', P.tint], ['HEAD', '"you are here"', P.warnT], ['config', 'settings for this repo', P.sand]].map((r, i) => {
      const x = 44 + (i % 2) * 272, y = 78 + Math.floor(i / 2) * 96;
      return box(x, y, 240, 76, r[2], 14) + T(x + 20, y + 32, r[0], { a: 'start', s: 16, m: true }) + T(x + 20, y + 56, r[1], { a: 'start', s: 12.5, w: 700, f: P.ink2 });
    }).join(''));

  const trackPic = svg(600, 280, 'Untracked files are outside, tracked files are inside the watched circle',
    `<circle cx="420" cy="140" r="118" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(420, 44, 'TRACKED', { s: 12.5, f: P.ok }) +
    file(358, 96, 'app.js') + file(440, 96, 'README.md') + T(420, 222, 'Git watches these', { s: 12, w: 700, f: P.ink2 }) +
    T(130, 44, 'UNTRACKED', { s: 12.5, f: P.danger }) + file(54, 90, 'notes.txt', P.white, ['?', P.danger]) + file(150, 90, 'todo.md', P.white, ['?', P.danger]) +
    T(130, 222, 'new, never added', { s: 12, w: 700, f: P.ink2 }) + arrow(240, 140, 290, 140, P.accent) + T(265, 170, 'git add', { s: 11.5, m: true, f: P.accent }));

  const codesPic = svg(600, 270, 'Short status codes: ?? untracked, A added, M modified, D deleted',
    [['??', 'Untracked', 'new file Git does not know', P.dangerT, P.danger], ['A', 'Added', 'new file, staged', P.okT, P.ok], ['M', 'Modified', 'changed since last photo', P.warnT, P.warn], ['D', 'Deleted', 'removed since last photo', P.sand, P.ink2]].map((r, i) => {
      const y = 18 + i * 62;
      return box(20, y, 76, 48, r[3], 12) + T(58, y + 32, r[0], { s: 20, m: true, f: r[4] }) + T(120, y + 22, r[1], { a: 'start', s: 16 }) + T(120, y + 42, r[2], { a: 'start', s: 12.5, w: 700, f: P.ink2 });
    }).join('') + box(400, 40, 180, 186, '#15132B', 14) +
    ['?? notes.txt', 'A  logo.png', ' M app.js', 'M  style.css', ' D old.txt'].map((l, i) => T(418, 78 + i * 30, l, { a: 'start', s: 13, m: true, f: i === 0 ? '#FF8FB0' : i === 1 || i === 3 ? '#7CF0B5' : i === 2 ? '#FFC24B' : '#C9C6FF' })).join(''));

  const cleanPic = svg(600, 240, 'A tidy desk: nothing to commit, working tree clean',
    box(60, 150, 480, 24, P.sand, 8) + `<rect x="100" y="174" width="18" height="50" fill="${P.ink}"/><rect x="482" y="174" width="18" height="50" fill="${P.ink}"/>` +
    folder(240, 70, 120, P.okT) + `<circle cx="420" cy="80" r="30" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M405 80 l10 10 l18 -20" fill="none" stroke="${P.white}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(300, 40, 'working tree clean', { s: 16, m: true, f: P.ok }));

  COURSE.add({
    id: 'l05', module: 1, minutes: 7,
    title: 'Start a repo.',
    kicker: 'git init and git status',
    summary: 'Two commands start everything. <code>git init</code> gives a folder a memory. <code>git status</code> tells you what is going on.',
    parts: [
      {
        pic: initPic,
        h: 'git init gives a folder a memory.',
        text: ['Go into any folder and type <code>git init</code>. Nothing looks different, but now Git is watching.', 'That folder is now a <b>repository</b>. You only do this once per project.'],
        cmds: [
          { c: 'git init', d: 'Turn the folder you are in into a Git repo.' },
          { c: 'git init my-app', d: 'Make a new folder called my-app and turn it into a repo.' }
        ]
      },
      {
        pic: gitDirPic,
        h: 'The memory lives in .git.',
        text: ['<code>git init</code> makes a hidden folder called <code>.git</code>. Every photo, every branch and every setting lives inside it.', 'Names that start with a dot are hidden. Use <code>ls -a</code> to see them.'],
        cmds: [{ c: 'ls -a', d: 'List all files, including hidden ones like .git.' }],
        warn: 'Delete the .git folder and the whole history is gone. Your files stay, but every save point disappears. Never edit it by hand.'
      },
      {
        pic: term(['$ git status', 'On branch main', 'No commits yet', '', 'Untracked files:', '  (use "git add <file>..." to include)', '        notes.txt', '', 'nothing added to commit but untracked files present'], 'git status'),
        h: 'git status is your best friend.',
        text: ['Lost? Type <code>git status</code>. It tells you which branch you are on, what changed, and what to do next.', 'It is 100% safe. It only looks. Run it all the time.'],
        cmds: [{ c: 'git status', d: 'Show what changed, what is staged, and which branch you are on.' }],
        tip: 'Read the hints in brackets. Git often prints the exact command you need.'
      },
      {
        pic: trackPic,
        h: 'Tracked or untracked.',
        text: ['A <b>tracked</b> file is one Git already knows. It was in a past photo or you added it.', 'An <b>untracked</b> file is brand new. Git sees it but ignores it until you <code>git add</code> it.']
      },
      {
        pic: codesPic,
        h: 'The short version.',
        text: ['<code>git status -s</code> prints one line per file with a tiny code in front.', 'Two columns: the <b>left</b> letter is what is staged. The <b>right</b> letter is what changed but is not staged yet.'],
        cmds: [{ c: 'git status -s', d: 'Short status. One line per file with a code: ?? A M D.' }]
      },
      {
        pic: cleanPic,
        h: 'Clean means all saved.',
        text: ['When every change is in a commit, <code>git status</code> says <b>nothing to commit, working tree clean</b>.', 'The <b>working tree</b> is just your project folder. Clean means it matches the last photo.']
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What does <code>git init</code> create?',
        options: ['A hidden .git folder that holds the history', 'A copy of your project on GitHub', 'A new file called README.md', 'A backup zip of your folder'],
        answer: 0,
        hints: { 1: 'git init never touches the internet.', 2: 'git init does not make any files you can see.', 3: 'No zip. Think hidden folder.' },
        why: 'git init makes .git, the folder where all photos and settings live.'
      },
      {
        type: 'pick',
        q: 'You delete the <code>.git</code> folder by accident. What happens?',
        options: ['All history is gone, your files stay', 'Your files are deleted too', 'Nothing, Git rebuilds it', 'GitHub restores it automatically'],
        answer: 0,
        why: 'Your current files stay, but every commit lived inside .git. Unless a copy exists elsewhere (like GitHub), the history is lost.'
      },
      {
        type: 'match',
        q: 'Match each <code>git status -s</code> code to its meaning.',
        pairs: [['??', 'New file Git is not tracking yet'], ['A', 'New file that is staged'], ['M', 'Changed since the last commit'], ['D', 'Deleted since the last commit']],
        why: '?? untracked, A added, M modified, D deleted.'
      },
      {
        type: 'bucket',
        q: 'Sort the files. Is Git tracking them?',
        buckets: ['Tracked', 'Untracked'],
        items: [['File in the last commit', 0], ['File you just ran git add on', 0], ['Changed file from last week', 0], ['Brand new file, never added', 1], ['Shows as ?? in status -s', 1]],
        why: 'Tracked means Git knows it from a commit or an add. Untracked means brand new and never added.'
      },
      {
        type: 'order',
        q: 'Start a brand new project. Put the steps in order.',
        items: ['mkdir my-app', 'cd my-app', 'git init', 'git status'],
        why: 'Make the folder, walk into it, start the repo, then check on it.'
      },
      {
        type: 'fill',
        q: 'Ask for the short status.',
        text: 'git ___ -___',
        options: ['status', 's', 'init', 'short', 'log'],
        answer: ['status', 's'],
        why: 'git status -s prints one line per file.'
      },
      {
        type: 'type',
        q: 'Make a new folder called <code>my-app</code> that is already a Git repo, in one command.',
        answers: ['git init my-app'],
        hint: 'git init, then a folder name.',
        why: 'git init my-app creates the folder and the .git inside it.'
      },
      {
        type: 'type',
        q: 'You are lost. Type the command that tells you what is going on.',
        answers: ['git status', 'git status -s', 'git status --short'],
        hint: 'The safest, most used command in Git.',
        why: 'git status is always safe and always helpful.'
      }
    ]
  });

  /* =====================================================================
     l06  the staging area
     ===================================================================== */
  const stagePic = svg(600, 290, 'A photo stage: two files stand on stage, one waits off stage',
    `<path d="M120 200 h360 l40 40 h-440z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M120 30 q40 50 0 170" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/><path d="M480 30 q-40 50 0 170" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="100" y="20" width="400" height="18" rx="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
    file(220, 112, 'app.js', P.okT) + file(320, 112, 'style.css', P.okT) + T(300, 262, 'STAGED: will be in the photo', { s: 12.5, f: P.ok }) +
    file(530, 160, '', P.white) + T(551, 252, 'notes', { s: 11.5, m: true }) + T(551, 272, 'waits', { s: 11, w: 700, f: P.mute }));

  const hunkPic = term(['$ git add -p', 'diff --git a/app.js b/app.js', '@@ -1,3 +1,4 @@', ' const name = "shop";', '+const tax = 0.2;', '(1/2) Stage this hunk [y,n,q,a,d,s,e,?]? y', '@@ -9,2 +10,3 @@', '+console.log("debug");', '(2/2) Stage this hunk [y,n,q,a,d,s,e,?]? n'], 'git add -p');

  const rmPic = svg(600, 260, 'git rm deletes a file, git rm --cached only stops tracking it, git mv renames',
    box(16, 20, 180, 220, P.dangerT, 18) + T(106, 52, 'git rm', { s: 15, m: true, f: P.danger }) + file(85, 74, 'old.js') +
    `<path d="M80 176 h52 l-6 44 h-40z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><rect x="74" y="168" width="64" height="9" rx="3" fill="${P.ink}"/>` +
    box(210, 20, 180, 220, P.tint, 18) + T(300, 52, 'git rm --cached', { s: 14, m: true, f: P.accent }) + file(279, 74, '.env') +
    T(300, 186, 'stays on disk', { s: 12.5 }) + T(300, 206, 'Git stops tracking', { s: 12, w: 700, f: P.ink2 }) +
    box(404, 20, 180, 220, P.okT, 18) + T(494, 52, 'git mv', { s: 15, m: true, f: P.ok }) + file(470, 74, '') +
    pillT(494, 172, 'a.js → b.js', P.white, P.ink, true) + T(494, 210, 'rename + stage', { s: 12, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l06', module: 1, minutes: 10,
    title: 'The staging area.',
    kicker: 'git add, restore, rm, mv',
    summary: 'Before a photo, you choose who stands in it. The staging area is where you line up the changes for your next commit.',
    parts: [
      {
        pic: areas({ n: 3, hi: [1], files: { 0: ['app.js*'], 1: ['app.js'], 2: [] }, arrows: [{ f: 0, t: 1, l: 'git add' }, { f: 1, t: 2, l: 'git commit' }] }),
        h: 'Three places.',
        text: ['<b>Working folder</b>: the files you edit.', '<b>Staging area</b>: changes you picked for the next photo.', '<b>Local repo</b>: the photos you already took.']
      },
      {
        pic: stagePic,
        h: 'Pick who is in the photo.',
        text: ['You changed three files but only two belong together. Stage those two. Commit. Then do the third.', 'Small, focused commits are easy to read and easy to undo.'],
        cmds: [
          { c: 'git add app.js', d: 'Stage one file.' },
          { c: 'git add .', d: 'Stage every change in this folder and below, including new and deleted files.' },
          { c: 'git add -A', d: 'Stage every change in the whole repo, new, changed and deleted.' },
          { c: 'git add -u', d: 'Stage changes and deletions of tracked files only. Skips brand new files.' }
        ]
      },
      {
        pic: hunkPic,
        h: 'Stage only part of a file.',
        text: ['<code>git add -p</code> walks through each chunk of change, called a <b>hunk</b>, and asks you.', '<b>y</b> stage it. <b>n</b> skip it. <b>s</b> split it smaller. <b>q</b> quit.'],
        cmds: [{ c: 'git add -p', d: 'Go through changes piece by piece and pick which hunks to stage.' }],
        tip: 'Great for leaving debug lines out of a commit.'
      },
      {
        pic: areas({ n: 3, hi: [0], files: { 0: ['notes.txt'], 1: [] }, arrows: [{ f: 1, t: 0, l: 'git restore --staged' }] }),
        h: 'Changed your mind? Unstage.',
        text: ['Staged a file by mistake? Take it off the stage. Your edits stay in the file.'],
        cmds: [{ c: 'git restore --staged notes.txt', d: 'Unstage a file. The changes stay in your working folder.' }]
      },
      {
        pic: rmPic,
        h: 'Delete, untrack, rename.',
        text: ['Use Git versions of delete and rename, so the change is staged for you.'],
        cmds: [
          { c: 'git rm old.js', d: 'Delete the file and stage the deletion.' },
          { c: 'git rm --cached .env', d: 'Stop tracking the file but keep it on your disk.' },
          { c: 'git mv a.js b.js', d: 'Rename or move a file and stage it.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'Why does the staging area exist?',
        options: ['So you choose exactly what goes in each commit', 'To upload files to GitHub', 'To make Git slower', 'To delete files safely'],
        answer: 0,
        why: 'Staging lets you build each photo on purpose, one topic at a time.'
      },
      {
        type: 'order',
        q: 'Put the trip of a change in order.',
        items: ['Edit the file in your working folder', 'git add the file', 'It waits in the staging area', 'git commit saves it to the local repo'],
        why: 'Working folder, then staging area, then local repo.'
      },
      {
        type: 'match',
        q: 'Match each <code>git add</code> to what it stages.',
        pairs: [['git add app.js', 'Only that one file'], ['git add -A', 'Everything in the whole repo'], ['git add -u', 'Changes to tracked files only, no new files'], ['git add -p', 'Piece by piece, you choose'], ['git restore --staged app.js', 'Takes the file back off the stage']],
        why: 'One file, everything, tracked only, piece by piece, and the undo.'
      },
      {
        type: 'pick',
        q: 'You made a brand new file. Which command will <b>not</b> stage it?',
        options: ['git add -u', 'git add .', 'git add -A', 'git add new.js'],
        answer: 0,
        hint: 'One of these only cares about files Git already knows.',
        why: '-u means update: tracked files only. New files are skipped.'
      },
      {
        type: 'bucket',
        q: 'Does the file stay on your disk?',
        buckets: ['File stays on disk', 'File is removed from disk'],
        items: [['git rm --cached a.txt', 0], ['git restore --staged a.txt', 0], ['git add a.txt', 0], ['git rm a.txt', 1], ['rm a.txt', 1]],
        why: '--cached and --staged only touch Git\'s list. git rm and rm delete the real file.'
      },
      {
        type: 'fill',
        q: 'Unstage <code>notes.txt</code> but keep your edits.',
        text: 'git ___ --___ notes.txt',
        options: ['restore', 'staged', 'rm', 'cached', 'reset', 'hard'],
        answer: ['restore', 'staged'],
        why: 'git restore --staged takes it off the stage. The file is untouched.'
      },
      {
        type: 'type',
        q: 'Stage your changes chunk by chunk, so you can skip the debug line.',
        answers: ['git add -p', 'git add --patch'],
        hint: 'git add with a one-letter flag. p for patch.',
        why: 'git add -p asks about each hunk: y, n, s, q.'
      },
      {
        type: 'type',
        q: 'Rename <code>a.js</code> to <code>b.js</code> the Git way.',
        answers: ['git mv a.js b.js'],
        hint: 'mv means move. Old name first, new name second.',
        why: 'git mv renames the file and stages the rename in one step.'
      }
    ]
  });

  /* =====================================================================
     l07  commits
     ===================================================================== */
  const msgPic = svg(600, 290, 'Bad commit messages crossed out, good ones with a check',
    T(150, 30, 'VAGUE', { s: 12.5, f: P.danger }) + T(450, 30, 'CLEAR', { s: 12.5, f: P.ok }) +
    ['stuff', 'fixed things', 'asdf', 'final fix 2'].map((m, i) => { const y = 48 + i * 58; return box(30, y, 240, 44, P.dangerT, 10) + T(150, y + 28, m, { s: 14, m: true }) + `<line x1="46" y1="${y + 23}" x2="254" y2="${y + 23}" stroke="${P.danger}" stroke-width="3"/>`; }).join('') +
    ['Add login button', 'Fix crash on empty cart', 'Update README setup', 'Remove old logo'].map((m, i) => { const y = 48 + i * 58; return box(318, y, 260, 44, P.okT, 10) + T(448, y + 28, m, { s: 13.5, m: true }); }).join(''));

  const editorPic = term(['$ git commit', '# your editor opens a file like this:', 'Add search box to header', '', 'Users asked to find products faster.', 'The box filters as you type.', '# Please enter the commit message.', '# Lines starting with # are ignored.', '# save and close the editor to finish'], 'commit message editor');

  const amendPic = graph({
    label: 'Commit C is replaced by C prime after amend',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], ghost: true, x: 2 }, { id: "C'", parents: ['B'], hi: true, x: 3, lane: 0 }],
    refs: { main: "C'" }, head: 'main'
  });

  const prefixPic = svg(600, 250, 'Conventional commit prefixes: feat, fix, docs, chore',
    [['feat:', 'a new feature', P.tint, P.accent], ['fix:', 'a bug fix', P.okT, P.ok], ['docs:', 'only docs changed', P.warnT, P.warn], ['chore:', 'tools, no app change', P.sand, P.ink2]].map((r, i) => {
      const x = 20 + (i % 2) * 290, y = 22 + Math.floor(i / 2) * 110;
      return box(x, y, 270, 88, r[2], 16) + T(x + 22, y + 40, r[0], { a: 'start', s: 22, m: true, f: r[3] }) + T(x + 22, y + 66, r[1], { a: 'start', s: 13, w: 700, f: P.ink2 });
    }).join(''));

  COURSE.add({
    id: 'l07', module: 1, minutes: 10,
    title: 'Take the photo.',
    kicker: 'git commit and good messages',
    summary: 'A commit saves everything on the stage as one photo with a note. Good notes make history easy to read.',
    parts: [
      {
        pic: areas({ n: 3, hi: [2], files: { 1: ['app.js'], 2: ['Add cart'] }, arrows: [{ f: 1, t: 2, l: 'git commit -m' }] }),
        h: 'Commit saves the stage.',
        text: ['<code>git commit -m "message"</code> takes everything staged and saves it as a new photo.', 'Only staged changes go in. Unstaged edits wait for next time.'],
        cmds: [
          { c: 'git commit -m "Add cart page"', d: 'Save the staged changes with a one-line message.' },
          { c: 'git commit -m "Add cart page" -m "Shows items and total price."', d: 'First -m is the title, second -m is the longer body.' }
        ]
      },
      {
        pic: msgPic,
        h: 'Write notes your future self can read.',
        text: ['Write the title like an order: <b>Add</b>, <b>Fix</b>, <b>Remove</b>. Not "added" or "fixing".', 'Keep the title under about <b>50 characters</b>. Use the body to say <b>why</b>.']
      },
      {
        pic: editorPic,
        h: 'No -m? An editor opens.',
        text: ['Plain <code>git commit</code> opens your text editor. Line 1 is the title. Leave a blank line, then write the body.', 'Save and close the editor to finish. Close it empty to cancel.'],
        cmds: [{ c: 'git commit', d: 'Open your editor to write a longer commit message.' }],
        tip: 'Stuck in Vim? Press Esc, type :wq and press Enter. Lesson 4 shows how to pick a friendlier editor.'
      },
      {
        pic: areas({ n: 3, hi: [2], files: { 0: ['app.js*'] }, arrows: [{ f: 0, t: 2, l: 'git commit -am', c: P.warn }] }),
        h: 'The shortcut that skips the stage.',
        text: ['<code>-a</code> stages every <b>tracked</b> file that changed, then commits. One step instead of two.'],
        cmds: [
          { c: 'git commit -a -m "Fix typo"', d: 'Stage all changed tracked files and commit.' },
          { c: 'git commit -am "Fix typo"', d: 'Same thing, shorter.' }
        ],
        warn: 'New untracked files are not included. You still need git add for those.'
      },
      {
        pic: amendPic,
        h: 'Fix the last photo.',
        text: ['Forgot a file or made a typo in the message? <b>Amend</b> replaces the last commit with a fixed one.', 'The old <b>C</b> is thrown away and a new <b>C\'</b> takes its place.'],
        cmds: [
          { c: 'git commit --amend', d: 'Redo the last commit: add staged changes and edit the message in your editor.' },
          { c: 'git commit --amend --no-edit', d: 'Add staged changes to the last commit and keep its message.' },
          { c: 'git commit --amend -m "Better message"', d: 'Replace the last commit message.' }
        ],
        warn: 'Do not amend a commit you already pushed. Other people have the old one, and history will not match.'
      },
      {
        pic: prefixPic,
        h: 'Labels some teams use.',
        text: ['Many teams start messages with a type, like <code>feat: add search</code>. This is called <b>Conventional Commits</b>.', 'Tools can read these labels to build change lists and version numbers.'],
        cmds: [{ c: 'git commit --allow-empty -m "chore: trigger build"', d: 'Make a commit with no changes. Handy to restart a build.' }]
      }
    ],
    quiz: [
      {
        type: 'bucket',
        q: 'Sort the commit messages.',
        buckets: ['Good message', 'Bad message'],
        items: [['Add login button', 0], ['Fix crash on empty cart', 0], ['docs: explain setup', 0], ['stuff', 1], ['asdf', 1], ['changes', 1], ['fixed it lol', 1]],
        why: 'Good messages say what changed, in the order form, short and specific.'
      },
      {
        type: 'pick',
        q: 'What does <code>-a</code> in <code>git commit -am</code> skip?',
        options: ['Brand new untracked files', 'Changed tracked files', 'The message', 'The staging area check for deleted files'],
        answer: 0,
        why: '-a only grabs files Git already tracks. New files need git add first.'
      },
      {
        type: 'order',
        q: 'You just committed but forgot <code>style.css</code>. Fix it in order.',
        items: ['Notice style.css is missing', 'git add style.css', 'git commit --amend --no-edit', 'git log --oneline to check'],
        why: 'Stage the missing file, then amend. The message stays.'
      },
      {
        type: 'match',
        q: 'Match the prefix to the change.',
        pairs: [['feat:', 'A new feature for users'], ['fix:', 'A bug fix'], ['docs:', 'Only the documentation changed'], ['chore:', 'Tooling or setup, no app change']],
        why: 'Conventional Commits: feat, fix, docs, chore and a few more.'
      },
      {
        type: 'pick',
        q: 'When should you <b>not</b> use <code>--amend</code>?',
        options: ['After the commit is pushed and shared', 'When you forgot a file', 'When the message has a typo', 'Right after committing'],
        answer: 0,
        why: 'Amend rewrites the commit. Anyone who already has it will have a different history.'
      },
      {
        type: 'fill',
        q: 'Add staged changes to the last commit and keep the same message.',
        text: 'git commit --___ --___',
        options: ['amend', 'no-edit', 'all', 'allow-empty', 'message'],
        answer: ['amend', 'no-edit'],
        why: '--amend redoes the last commit, --no-edit keeps its message.'
      },
      {
        type: 'type',
        q: 'Commit the staged changes with the message <code>Add homepage</code>.',
        answers: ['git commit -m "Add homepage"', 'git commit --message "Add homepage"', 'git commit --message="Add homepage"'],
        hint: 'git commit, then -m, then the message in quotes.',
        why: 'git commit -m "Add homepage" saves the photo with that note.'
      }
    ]
  });

  /* =====================================================================
     l08  reading history
     ===================================================================== */
  const funnelPic = svg(600, 280, 'A funnel: many commits go in, a filter lets only matching ones out',
    [0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${70 + i * 76}" cy="40" r="16" fill="${i % 3 === 1 ? P.tint : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`).join('') +
    `<path d="M60 80 h480 l-170 110 v50 h-140 v-50z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(300, 118, '--author  --since  --grep', { s: 14, m: true }) + T(300, 142, '-n 5   -- file.js', { s: 14, m: true }) +
    `<circle cx="270" cy="262" r="14" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="330" cy="262" r="14" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(470, 262, 'only matches', { s: 13, f: P.accent }));

  const rangePic = graph({
    label: 'main..feature shows only D and E, the commits on feature that main does not have',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'D', lane: 1, parents: ['B'], hi: true, x: 2.5 }, { id: 'E', lane: 1, parents: ['D'], hi: true, x: 3.5 }],
    refs: { main: 'C', feature: 'E' }, head: 'feature'
  });

  const showPic = svg(600, 260, 'A magnifying glass over one commit shows its message and changes',
    `<line x1="70" y1="130" x2="370" y2="130" stroke="${P.accent}" stroke-width="4"/>` +
    [0, 1, 2, 3].map(i => `<circle cx="${70 + i * 100}" cy="130" r="20" fill="${i === 2 ? P.accent : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`).join('') +
    `<circle cx="270" cy="130" r="58" fill="none" stroke="${P.ink}" stroke-width="7"/><line x1="312" y1="172" x2="360" y2="220" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/>` +
    box(400, 40, 180, 180, P.white, 14) + T(416, 70, 'commit 3f9a1c2', { a: 'start', s: 12, m: true, f: P.warn }) + T(416, 94, 'Sam · Tue', { a: 'start', s: 12, w: 700, f: P.mute }) +
    T(416, 120, 'Fix typo', { a: 'start', s: 13 }) + T(416, 154, '- teh cat', { a: 'start', s: 12.5, m: true, f: P.danger }) + T(416, 178, '+ the cat', { a: 'start', s: 12.5, m: true, f: P.ok }));

  COURSE.add({
    id: 'l08', module: 1, minutes: 10,
    title: 'Read the history.',
    kicker: 'git log and git show',
    summary: 'Every photo you took is in the history. <code>git log</code> lists them. <code>git show</code> opens one up.',
    parts: [
      {
        pic: term(['$ git log', 'commit 3f9a1c2e8b7d6a5f4e3d2c1b0a9f8e7d6c5b4a39 (HEAD -> main)', 'Author: Sam Lee <sam@example.com>', 'Date:   Tue Oct 6 09:14 2026', '', '    Fix typo in title', '', 'commit 9b1e44a...', ':'], 'git log'),
        h: 'The photo album.',
        text: ['<code>git log</code> lists commits, <b>newest first</b>. Each has a hash (its ID), an author, a date and a message.', 'Long lists open in a <b>pager</b>. Arrow keys scroll. Press <b>q</b> to quit.'],
        cmds: [{ c: 'git log', d: 'List commits, newest first. Press q to quit.' }]
      },
      {
        pic: term(['$ git log --oneline --graph --all', '* 7c2d9e1 (feature) Add search', '| * 3f9a1c2 (HEAD -> main) Fix typo', '|/', '* 9b1e44a Add header', '* 1a2b3c4 First commit'], 'the tree view'),
        h: 'The short, drawn version.',
        text: ['<code>--oneline</code> squeezes each commit to one line. <code>--graph</code> draws the branch lines. <code>--all</code> shows every branch.'],
        cmds: [
          { c: 'git log --oneline', d: 'One short line per commit.' },
          { c: 'git log --graph', d: 'Draw branch and merge lines on the left.' },
          { c: 'git log --all', d: 'Show commits from every branch, not just this one.' },
          { c: 'git log --decorate', d: 'Show branch and tag names next to commits (on by default in new Git).' },
          { c: 'git log --oneline --graph --all', d: 'The favorite combo: the whole tree at a glance.' }
        ]
      },
      {
        pic: funnelPic,
        h: 'Filter the list.',
        text: ['Big projects have thousands of commits. Filters find the ones you need.'],
        cmds: [
          { c: 'git log -n 5', d: 'Only the last 5 commits.' },
          { c: 'git log -5', d: 'Same as -n 5.' },
          { c: 'git log --author="Sam"', d: 'Only commits by an author whose name matches Sam.' },
          { c: 'git log --since="2 weeks ago"', d: 'Only commits newer than 2 weeks.' },
          { c: 'git log --until="2026-01-01"', d: 'Only commits older than that date.' },
          { c: 'git log --grep="login"', d: 'Only commits whose message mentions login.' },
          { c: 'git log -- app.js', d: 'Only commits that touched app.js.' },
          { c: 'git log --follow -- app.js', d: 'History of one file, even across renames.' }
        ]
      },
      {
        pic: term(['$ git log --stat -1', 'commit 3f9a1c2 Fix typo in title', ' index.html | 2 +-', ' style.css  | 5 +++++', ' 2 files changed, 6 insertions(+), 1 deletion(-)'], 'git log --stat'),
        h: 'See what changed in each.',
        text: ['<code>--stat</code> shows which files changed and how much. <code>-p</code> shows every changed line.'],
        cmds: [
          { c: 'git log --stat', d: 'Each commit plus a list of changed files.' },
          { c: 'git log -p', d: 'Each commit plus the full line-by-line changes (the patch).' },
          { c: 'git log --pretty=format:"%h %an %s"', d: 'Your own format: short hash, author name, subject.' }
        ]
      },
      {
        pic: rangePic,
        h: 'What is on one branch but not the other?',
        text: ['<code>main..feature</code> means: commits on <b>feature</b> that <b>main</b> does not have. Here, <b>D</b> and <b>E</b>.'],
        cmds: [{ c: 'git log main..feature', d: 'Commits on feature that are not on main yet.' }]
      },
      {
        pic: showPic,
        h: 'Open one photo.',
        text: ['<code>git show</code> prints one commit: who, when, the message, and the exact changes.'],
        cmds: [
          { c: 'git show 3f9a1c2', d: 'Show one commit by its hash.' },
          { c: 'git show HEAD', d: 'Show the commit you are on right now.' },
          { c: 'git show HEAD:app.js', d: 'Print app.js exactly as it was in that commit.' },
          { c: 'git shortlog -sn', d: 'Count commits per person, most first.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'You ran <code>git log</code> and the screen is stuck on a <code>:</code>. How do you get out?',
        options: ['Press q', 'Close the terminal', 'Type exit', 'Press Enter forever'],
        answer: 0,
        why: 'That colon is the pager. q quits it.'
      },
      {
        type: 'match',
        q: 'Match the <code>git log</code> flag to what it does.',
        pairs: [['--oneline', 'One short line per commit'], ['--graph', 'Draws the branch lines'], ['--all', 'Includes every branch'], ['--stat', 'Lists changed files per commit'], ['-p', 'Shows every changed line']],
        why: 'Mix and match these. --oneline --graph --all is the classic.'
      },
      {
        type: 'bucket',
        q: 'Does the flag filter which commits appear, or add detail to each?',
        buckets: ['Filters the list', 'Adds detail'],
        items: [['--author', 0], ['--since', 0], ['--grep', 0], ['-n 5', 0], ['-p', 1], ['--stat', 1], ['--graph', 1]],
        why: 'Filters shrink the list. Detail flags show more about each commit.'
      },
      {
        type: 'order',
        q: 'Plain <code>git log</code> shows commits in which order? Arrange them as it prints.',
        items: ['Fix typo (today)', 'Add header (yesterday)', 'Add page (last week)', 'First commit (last month)'],
        why: 'git log starts with the newest commit and walks back in time.'
      },
      {
        type: 'fill',
        q: 'Build the favorite tree view.',
        text: 'git log --___ --___ --___',
        options: ['oneline', 'graph', 'all', 'stat', 'short'],
        answer: ['oneline', 'graph', 'all'],
        hint: 'One line each, drawn lines, every branch.',
        why: 'git log --oneline --graph --all draws the whole repo.'
      },
      {
        type: 'type',
        q: 'Show only the last 5 commits.',
        answers: ['git log -n 5', 'git log -5', 'git log -n5', 'git log --max-count=5', 'git log --oneline -5', 'git log --oneline -n 5'],
        hint: 'git log with -n and a number.',
        why: 'git log -n 5 or git log -5 both work.'
      },
      {
        type: 'type',
        q: 'Print the file <code>app.js</code> as it was in the current commit.',
        answers: ['git show HEAD:app.js'],
        hint: 'git show, then HEAD, a colon, and the file name.',
        why: 'git show HEAD:app.js prints the file from that commit without changing anything.'
      },
      {
        type: 'pick',
        q: 'What does <code>git log main..feature</code> list?',
        options: ['Commits on feature that main does not have', 'Commits on main that feature does not have', 'Every commit on both', 'The difference in files'],
        answer: 0,
        why: 'A..B means "reachable from B but not from A".'
      }
    ]
  });

  /* =====================================================================
     l09  diff and blame
     ===================================================================== */
  const spotPic = svg(600, 270, 'Two versions of a file side by side: a red removed line and a green added line',
    box(20, 20, 260, 230, P.white, 16) + T(150, 50, 'before', { s: 13, f: P.mute }) + box(320, 20, 260, 230, P.white, 16) + T(450, 50, 'after', { s: 13, f: P.mute }) +
    ['<h1>Shop</h1>', 'color: red;', 'size: 12px;'].map((l, i) => (i === 1 ? `<rect x="34" y="${92 + i * 40}" width="232" height="28" rx="6" fill="${P.dangerT}"/>` : '') + T(48, 112 + i * 40, (i === 1 ? '- ' : '  ') + l, { a: 'start', s: 13, m: true, f: i === 1 ? P.danger : P.ink })).join('') +
    ['<h1>Shop</h1>', 'color: blue;', 'size: 12px;'].map((l, i) => (i === 1 ? `<rect x="334" y="${92 + i * 40}" width="232" height="28" rx="6" fill="${P.okT}"/>` : '') + T(348, 112 + i * 40, (i === 1 ? '+ ' : '  ') + l, { a: 'start', s: 13, m: true, f: i === 1 ? P.ok : P.ink })).join(''));

  const blamePic = svg(600, 260, 'Each line of a file labeled with who last changed it and when',
    box(20, 20, 560, 220, P.white, 16) +
    [['a1b2c3d', 'Sam', 'Mon', 'function total(cart) {', P.tint], ['9f8e7d6', 'Ana', 'Wed', '  let sum = 0;', P.okT], ['9f8e7d6', 'Ana', 'Wed', '  for (const i of cart)', P.okT], ['5c4b3a2', 'Raj', 'Fri', '    sum += i.price * 1.2;', P.warnT], ['a1b2c3d', 'Sam', 'Mon', '  return sum;', P.tint]].map((r, i) => {
      const y = 40 + i * 38;
      return `<rect x="34" y="${y}" width="190" height="30" rx="8" fill="${r[4]}"/>` + T(44, y + 20, r[0], { a: 'start', s: 11.5, m: true, f: P.ink2 }) + T(130, y + 20, r[1], { a: 'start', s: 12.5 }) + T(176, y + 20, r[2], { a: 'start', s: 11.5, w: 700, f: P.mute }) + T(240, y + 20, r[3], { a: 'start', s: 13, m: true });
    }).join(''));

  COURSE.add({
    id: 'l09', module: 1, minutes: 10,
    title: 'Spot the difference.',
    kicker: 'git diff and git blame',
    summary: 'A diff shows exactly which lines changed. Blame shows who changed each line and when.',
    parts: [
      {
        pic: spotPic,
        h: 'Red went away. Green is new.',
        text: ['A line starting with <b>-</b> was removed. A line starting with <b>+</b> was added.', 'A changed line shows up as one minus and one plus.']
      },
      {
        pic: term(['$ git diff', 'diff --git a/style.css b/style.css', '--- a/style.css', '+++ b/style.css', '@@ -1,3 +1,3 @@', ' h1 {', '-  color: red;', '+  color: blue;', '   size: 12px;'], 'git diff'),
        h: 'How to read a diff.',
        text: ['<code>---</code> is the old file, <code>+++</code> is the new one.', '<code>@@ -1,3 +1,3 @@</code> is a <b>hunk</b> header: "starting at line 1, 3 lines before, 3 lines after". Lines with a space in front did not change.'],
        cmds: [{ c: 'git diff', d: 'Show changes in your working folder that are not staged yet.' }]
      },
      {
        pic: areas({ n: 3, arrows: [{ f: 0, t: 1, l: 'git diff' }, { f: 1, t: 2, l: 'git diff --staged' }, { f: 0, t: 2, l: 'git diff HEAD', c: P.ok }] }),
        h: 'Which two things are you comparing?',
        text: ['<code>git diff</code>: working folder vs stage. <code>--staged</code>: stage vs last commit. <code>HEAD</code>: everything vs last commit.'],
        cmds: [
          { c: 'git diff --staged', d: 'Show what is staged, compared with the last commit.' },
          { c: 'git diff --cached', d: 'Same as --staged. Older name.' },
          { c: 'git diff HEAD', d: 'All changes, staged or not, compared with the last commit.' }
        ],
        tip: 'Before every commit, run git diff --staged to read what you are about to save.'
      },
      {
        pic: term(['$ git diff main..feature --stat', ' app.js    | 12 ++++++++----', ' search.js | 40 ++++++++++++++++', ' 2 files changed, 48 insertions(+), 4 deletions(-)'], 'compare branches'),
        h: 'Compare any two points.',
        text: ['Give diff two commits, two branches or two tags and it shows the difference between them.'],
        cmds: [
          { c: 'git diff a1b2c3d 9f8e7d6', d: 'Changes between two commits.' },
          { c: 'git diff main..feature', d: 'Changes between the tips of two branches.' },
          { c: 'git diff --stat', d: 'Just the list of files and how much changed.' },
          { c: 'git diff --name-only', d: 'Just the names of changed files.' },
          { c: 'git diff --word-diff', d: 'Highlight changed words instead of whole lines.' },
          { c: 'git difftool', d: 'Open the changes in a visual diff program.' }
        ]
      },
      {
        pic: blamePic,
        h: 'Who wrote this line?',
        text: ['<code>git blame</code> labels every line with the commit, author and date that last changed it.', 'It is not about blaming people. It helps you find who to ask and why a line exists.'],
        cmds: [
          { c: 'git blame app.js', d: 'Show who last changed each line of app.js.' },
          { c: 'git blame -L 10,20 app.js', d: 'Only lines 10 to 20.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'In a diff, what does a line starting with <code>+</code> mean?',
        options: ['The line was added', 'The line was removed', 'The line is important', 'The line did not change'],
        answer: 0,
        why: '+ is new, - is gone, a space means unchanged.'
      },
      {
        type: 'bucket',
        q: 'Sort these diff lines.',
        buckets: ['Removed', 'Added', 'Unchanged'],
        items: [['-  color: red;', 0], ['-  old line', 0], ['+  color: blue;', 1], ['+  new line', 1], ['   size: 12px;', 2], ['   h1 {', 2]],
        why: 'The first character decides: minus, plus, or space.'
      },
      {
        type: 'match',
        q: 'Match the command to what it compares.',
        pairs: [['git diff', 'Working folder vs staging area'], ['git diff --staged', 'Staging area vs last commit'], ['git diff HEAD', 'All your changes vs last commit'], ['git diff main..feature', 'Tip of main vs tip of feature']],
        why: 'diff always compares two things. Know which two.'
      },
      {
        type: 'pick',
        q: 'Which two commands show what is <b>staged</b>?',
        options: ['git diff --staged', 'git diff --cached', 'git diff', 'git diff --name-only'],
        answer: [0, 1],
        hint: 'One is the new name, one is the old name.',
        why: '--staged and --cached are the same thing.'
      },
      {
        type: 'order',
        q: 'Careful commit routine. Put it in order.',
        items: ['Edit files', 'git diff to read your changes', 'git add the good ones', 'git diff --staged to double check', 'git commit -m "..."'],
        why: 'Read, stage, read again, commit. No surprises.'
      },
      {
        type: 'fill',
        q: 'List only the names of changed files.',
        text: 'git ___ --___',
        options: ['diff', 'name-only', 'log', 'stat', 'names'],
        answer: ['diff', 'name-only'],
        why: 'git diff --name-only prints only file names.'
      },
      {
        type: 'type',
        q: 'Find who last changed lines 10 to 20 of <code>app.js</code>.',
        answers: ['git blame -L 10,20 app.js', 'git blame app.js -L 10,20', 'git blame -L10,20 app.js'],
        hint: 'git blame, then -L start,end, then the file.',
        why: 'git blame -L 10,20 app.js narrows blame to those lines.'
      }
    ]
  });

  /* =====================================================================
     l10  .gitignore
     ===================================================================== */
  const bouncerPic = svg(600, 280, 'A bouncer with a list stops .env, node_modules and .DS_Store at the door of the repo',
    box(380, 30, 200, 220, P.okT, 18) + T(480, 64, 'your repo', { s: 15 }) + file(420, 88, 'app.js') + file(492, 88, 'README') +
    `<rect x="372" y="150" width="16" height="100" fill="${P.ink}"/>` +
    `<circle cx="320" cy="96" r="24" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2.5"/><rect x="292" y="122" width="56" height="78" rx="14" fill="${P.ink}"/>` +
    box(262, 150, 70, 92, P.white, 6) + T(297, 172, '.gitignore', { s: 9.5, m: true }) + [0, 1, 2].map(i => `<rect x="272" y="${184 + i * 16}" width="50" height="6" rx="3" fill="${P.sand}"/>`).join('') +
    file(30, 40, '.env', P.dangerT) + file(130, 70, 'node_mod', P.dangerT) + file(50, 160, '.DS_Store', P.dangerT) +
    `<path d="M212 108 l24 24 M236 108 l-24 24" stroke="${P.danger}" stroke-width="5" stroke-linecap="round"/>` +
    T(120, 266, 'not allowed in', { s: 13, f: P.danger }));

  const ignoreFile = term(['# .gitignore', '# lines starting with # are notes', '*.log', 'node_modules/', '/build', '**/temp', '!keep.log', '.env', '.DS_Store'], '.gitignore');

  const whatPic = svg(600, 260, 'Four kinds of files to ignore: secrets, builds, dependencies, OS junk',
    [['Secrets', '.env  keys.pem', P.dangerT, P.danger], ['Builds', 'dist/  build/', P.warnT, P.warn], ['Dependencies', 'node_modules/  venv/', P.tint, P.accent], ['OS junk', '.DS_Store  Thumbs.db', P.sand, P.ink2]].map((r, i) => {
      const x = 20 + (i % 2) * 290, y = 20 + Math.floor(i / 2) * 116;
      return box(x, y, 270, 94, r[2], 16) + T(x + 22, y + 38, r[0], { a: 'start', s: 18, f: r[3] }) + T(x + 22, y + 68, r[1], { a: 'start', s: 13, m: true });
    }).join(''));

  const trackedTrap = svg(600, 250, 'A file already in a commit stays tracked even after adding it to .gitignore, until git rm --cached',
    box(20, 40, 250, 170, P.paper2, 18) + T(145, 72, 'already committed', { s: 13, f: P.ink2 }) + file(124, 92, '.env', P.dangerT) +
    T(145, 196, '.gitignore ignores it? NO', { s: 12.5, f: P.danger }) +
    arrow(290, 125, 350, 125, P.accent, 3.5) + pillT(320, 96, 'rm --cached', P.white, P.accent, true) +
    box(370, 40, 210, 170, P.okT, 18) + T(475, 72, 'untracked + ignored', { s: 13, f: P.ok }) + file(454, 92, '.env') + T(475, 196, 'still on your disk', { s: 12.5, f: P.ink2 }));

  COURSE.add({
    id: 'l10', module: 1, minutes: 9,
    title: 'Ignore the junk.',
    kicker: '.gitignore',
    summary: 'Some files must never go into Git: passwords, build output, downloaded packages. A file called <code>.gitignore</code> keeps them out.',
    parts: [
      {
        pic: bouncerPic,
        h: 'A bouncer for your repo.',
        text: ['<code>.gitignore</code> is a plain text file at the top of your project. Every line is a rule for files Git should pretend are not there.', 'Ignored files never show in <code>git status</code> and <code>git add .</code> skips them.'],
        cmds: [
          { c: 'touch .gitignore', d: 'Create an empty .gitignore file.' },
          { c: 'echo "*.log" >> .gitignore', d: 'Add a rule to the end of .gitignore.' }
        ],
        tip: 'Commit the .gitignore file itself so your whole team shares the rules.'
      },
      {
        pic: ignoreFile,
        h: 'The pattern language.',
        text: ['<code>*.log</code>: any file ending in .log. <code>node_modules/</code>: that folder anywhere.', '<code>/build</code>: only at the top. <code>**/temp</code>: temp at any depth. <code>!keep.log</code>: but keep this one. <code>#</code>: a note.']
      },
      {
        pic: whatPic,
        h: 'What to ignore.',
        text: ['Ignore anything that is <b>secret</b>, anything a tool can <b>rebuild</b>, anything you can <b>download</b> again, and junk your <b>computer</b> makes.'],
        warn: 'A password pushed to GitHub is leaked even if you delete it later. Ignore .env before your first commit.'
      },
      {
        pic: trackedTrap,
        h: 'Already committed? Untrack it.',
        text: ['.gitignore only stops <b>untracked</b> files. If a file is already in a commit, Git keeps watching it.', 'Remove it from Git (not from disk) with <code>--cached</code>, then commit.'],
        cmds: [
          { c: 'git rm --cached .env', d: 'Stop tracking .env. The file stays on your disk.' },
          { c: 'git rm -r --cached node_modules', d: 'Stop tracking a whole folder.' }
        ]
      },
      {
        pic: term(['$ git check-ignore -v debug.log', '.gitignore:3:*.log    debug.log', '$ git status --ignored', 'Ignored files:', '        debug.log', '        node_modules/'], 'is it ignored?'),
        h: 'Why is my file ignored?',
        text: ['<code>git check-ignore -v</code> tells you which rule, in which file, on which line, is hiding a file.'],
        cmds: [
          { c: 'git check-ignore -v debug.log', d: 'Show the exact rule that ignores this file.' },
          { c: 'git status --ignored', d: 'List ignored files too.' }
        ]
      },
      {
        pic: svg(600, 230, 'A global ignore file for your whole computer, and a .gitkeep file holding an empty folder',
          box(20, 30, 270, 170, P.tint, 18) + T(155, 66, 'one list for every repo', { s: 13.5 }) + T(155, 100, '~/.gitignore_global', { s: 13, m: true, f: P.accent }) + T(155, 134, '.DS_Store', { s: 13, m: true }) + T(155, 160, '.vscode/', { s: 13, m: true }) +
          box(310, 30, 270, 170, P.okT, 18) + folder(395, 70, 100, P.white) + T(445, 128, '.gitkeep', { s: 12, m: true }) + T(445, 182, 'Git skips empty folders', { s: 12.5, f: P.ink2 })),
        h: 'Global rules and empty folders.',
        text: ['Put your personal junk, like editor folders, in a <b>global</b> ignore file once. It works in every repo.', 'Git does not save empty folders. Drop an empty file named <code>.gitkeep</code> inside to keep one.', 'Ready-made lists for every language live at <a href="https://github.com/github/gitignore" target="_blank" rel="noopener">github.com/github/gitignore</a>.'],
        cmds: [
          { c: 'git config --global core.excludesFile ~/.gitignore_global', d: 'Use one ignore file for all your repos.' },
          { c: 'touch logs/.gitkeep', d: 'Keep an empty folder in Git by giving it a placeholder file.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket',
        q: 'Commit it or ignore it?',
        buckets: ['Commit', 'Ignore'],
        items: [['src/app.js', 0], ['README.md', 0], ['package.json', 0], ['.gitignore', 0], ['.env', 1], ['node_modules/', 1], ['.DS_Store', 1], ['dist/', 1], ['error.log', 1]],
        why: 'Commit your source and setup. Ignore secrets, downloads, builds, logs and OS junk.'
      },
      {
        type: 'match',
        q: 'Match the pattern to what it ignores.',
        pairs: [['*.log', 'Every file ending in .log'], ['node_modules/', 'That folder, wherever it is'], ['/build', 'build only at the top level'], ['!keep.log', 'An exception: do not ignore this one'], ['# notes', 'A comment, ignored by Git']],
        why: '* any name, / folder, leading / top only, ! exception, # comment.'
      },
      {
        type: 'pick',
        q: 'You added <code>.env</code> to .gitignore, but Git still shows changes to it. Why?',
        options: ['It was already committed, so Git still tracks it', 'The pattern needs a star', '.gitignore only works on GitHub', 'You must restart the terminal'],
        answer: 0,
        why: '.gitignore only affects untracked files. Run git rm --cached .env, then commit.'
      },
      {
        type: 'order',
        q: 'Stop tracking a committed <code>.env</code>. Put it in order.',
        items: ['Add .env to .gitignore', 'git rm --cached .env', 'git commit -m "Stop tracking .env"', 'Change your leaked passwords if it was pushed'],
        why: 'Rule first, untrack, commit. If it ever reached GitHub, treat the secret as leaked.'
      },
      {
        type: 'fill',
        q: 'Find which rule hides <code>debug.log</code>.',
        text: 'git ___ -___ debug.log',
        options: ['check-ignore', 'v', 'status', 'ignore', 'p'],
        answer: ['check-ignore', 'v'],
        why: 'git check-ignore -v prints the file, line and pattern.'
      },
      {
        type: 'pick',
        q: 'Git will not save your empty <code>logs/</code> folder. What do people do?',
        options: ['Put an empty .gitkeep file inside', 'Add logs/ to .gitignore', 'Run git add -f', 'Use git mv'],
        answer: 0,
        why: 'Git tracks files, not folders. A placeholder file keeps the folder.'
      },
      {
        type: 'type',
        q: 'Stop tracking <code>secrets.txt</code> but keep it on your disk.',
        answers: ['git rm --cached secrets.txt'],
        hint: 'git rm with the flag that means "only from Git\'s list".',
        why: 'git rm --cached removes it from the index only.'
      }
    ]
  });

  /* =====================================================================
     l11  undo everything
     ===================================================================== */
  const mapPic = svg(600, 330, 'Which undo: not staged use restore, staged use restore --staged, committed private use reset, committed shared use revert, junk files use clean',
    [['Edited, not staged', 'git restore', P.okT], ['Staged by mistake', 'git restore --staged', P.okT], ['Committed, not pushed', 'git reset', P.warnT], ['Committed and pushed', 'git revert', P.tint], ['New junk files', 'git clean', P.dangerT]].map((r, i) => {
      const y = 14 + i * 62;
      return box(16, y, 250, 48, P.white, 12) + T(32, y + 30, r[0], { a: 'start', s: 14 }) + arrow(276, y + 24, 326, y + 24, P.ink, 3) + box(336, y, 248, 48, r[2], 12) + T(354, y + 30, r[1], { a: 'start', s: 14, m: true });
    }).join(''));

  const resetPic = svg(600, 300, 'reset soft keeps changes staged, mixed keeps them in files, hard throws them away',
    [['--soft', 'changes stay STAGED', P.okT, P.ok, 'safe'], ['--mixed', 'changes stay in your FILES', P.warnT, P.warn, 'safe (default)'], ['--hard', 'changes are GONE', P.dangerT, P.danger, 'destroys work']].map((r, i) => {
      const x = 16 + i * 196;
      return box(x, 30, 176, 240, r[2], 18) + T(x + 88, 70, r[0], { s: 20, m: true, f: r[3] }) +
        `<circle cx="${x + 88}" cy="130" r="30" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
        (i === 2 ? `<path d="M${x + 74} 116 l28 28 M${x + 102} 116 l-28 28" stroke="${P.danger}" stroke-width="5" stroke-linecap="round"/>` : i === 1 ? `<path d="M${x + 74} 116 h20 l8 8 v20 h-28z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2"/>` : `<path d="M${x + 70} 130 l10 -12 h16 l10 12 v12 h-36z" fill="${P.tint}" stroke="${P.ink}" stroke-width="2"/>`) +
        T(x + 88, 196, r[1], { s: 11.5 }) + pillT(x + 88, 236, r[4], P.white, r[3]);
    }).join(''));

  const revertPic = graph({
    label: 'Revert adds a new commit B-undo that cancels commit B',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: '-B', parents: ['C'], hi: true }],
    refs: { main: '-B' }, head: 'main'
  });

  const vsPic = svg(600, 260, 'Reset erases commits from the line, revert adds an undo commit at the end',
    box(16, 20, 276, 220, P.dangerT, 18) + T(154, 52, 'RESET rewrites', { s: 14, f: P.danger }) +
    `<line x1="50" y1="130" x2="250" y2="130" stroke="${P.ink2}" stroke-width="4"/>` + ['A', 'B', 'C'].map((l, i) => `<circle cx="${60 + i * 90}" cy="130" r="18" fill="${i === 2 ? P.white : P.white}" stroke="${P.ink}" stroke-width="2.5" ${i === 2 ? 'stroke-dasharray="4 4" opacity=".5"' : ''}/>` + T(60 + i * 90, 135, l, { s: 13 })).join('') +
    `<path d="M228 108 l44 44 M272 108 l-44 44" stroke="${P.danger}" stroke-width="5" stroke-linecap="round"/>` + T(154, 206, 'only for private work', { s: 12.5, f: P.ink2 }) +
    box(308, 20, 276, 220, P.okT, 18) + T(446, 52, 'REVERT adds', { s: 14, f: P.ok }) +
    `<line x1="336" y1="130" x2="556" y2="130" stroke="${P.ink2}" stroke-width="4"/>` + ['A', 'B', 'C', '-B'].map((l, i) => `<circle cx="${342 + i * 70}" cy="130" r="18" fill="${i === 3 ? P.ok : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + T(342 + i * 70, 135, l, { s: 12.5, f: i === 3 ? P.white : P.ink })).join('') +
    T(446, 206, 'safe for shared work', { s: 12.5, f: P.ink2 }));

  const safetyPic = svg(600, 300, 'Danger meter from safe to destroys work',
    `<defs><linearGradient id="dm" x1="0" x2="1"><stop offset="0" stop-color="${P.ok}"/><stop offset=".55" stop-color="${P.warn}"/><stop offset="1" stop-color="${P.danger}"/></linearGradient></defs>` +
    `<rect x="30" y="40" width="540" height="22" rx="11" fill="url(#dm)" stroke="${P.ink}" stroke-width="2.5"/>` + T(30, 28, 'SAFE', { a: 'start', s: 12, f: P.ok }) + T(570, 28, 'LOSES WORK', { a: 'end', s: 12, f: P.danger }) +
    [['status', 40], ['restore --staged', 100], ['revert', 160], ['reset --soft', 220], ['commit --amend', 280], ['restore file', 340], ['reset --hard', 400], ['clean -fd', 460]].map((r, i) => {
      const x = 40 + i * 74, y = 96 + (i % 2) * 90;
      const col = i < 3 ? P.okT : i < 5 ? P.warnT : P.dangerT;
      return `<line x1="${x}" y1="62" x2="${x}" y2="${y - 4}" stroke="${P.ink}" stroke-width="2"/>` + box(x - 48, y, 96, 52, col, 10) + T(x, y + 22, 'git', { s: 11, w: 700, f: P.mute, m: true }) + T(x, y + 40, r[0], { s: r[0].length > 12 ? 9.5 : 11.5, m: true });
    }).join(''));

  COURSE.add({
    id: 'l11', module: 1, minutes: 14,
    title: 'Undo anything.',
    kicker: 'restore, reset, revert, clean',
    summary: 'Almost every mistake in Git can be undone. The trick is picking the right undo for where the mistake lives.',
    parts: [
      {
        pic: mapPic,
        h: 'Where is the mistake?',
        text: ['Ask one question: <b>how far did the change get?</b> Edited, staged, committed, or pushed. Each place has its own undo.']
      },
      {
        pic: areas({ n: 3, files: { 0: ['app.js*'] }, arrows: [{ f: 2, t: 0, l: 'git restore app.js' }] }),
        h: 'Undo edits you have not committed.',
        text: ['<code>git restore</code> puts a file back the way it was in the last commit. Your unsaved edits to it are gone.'],
        cmds: [
          { c: 'git restore app.js', d: 'Throw away edits to app.js. Back to the last commit.' },
          { c: 'git restore --source=HEAD~1 app.js', d: 'Bring back app.js as it was one commit ago.' },
          { c: 'git checkout -- app.js', d: 'Old way to throw away edits. You will see it in older guides.' },
          { c: 'git reset app.js', d: 'Old way to unstage a file. Same as git restore --staged.' }
        ],
        warn: 'Edits thrown away by restore were never committed, so Git cannot get them back.'
      },
      {
        pic: resetPic,
        h: 'Take back commits with reset.',
        text: ['<code>git reset HEAD~1</code> moves your branch back one commit. The flag decides what happens to that commit\'s changes.'],
        cmds: [
          { c: 'git reset --soft HEAD~1', d: 'Undo the last commit. Changes stay staged.' },
          { c: 'git reset HEAD~1', d: 'Undo the last commit. Changes stay in your files, unstaged. (Same as --mixed.)' },
          { c: 'git reset --hard HEAD~1', d: 'Undo the last commit and delete its changes. Dangerous.' }
        ]
      },
      {
        pic: revertPic,
        h: 'Undo a shared commit with revert.',
        text: ['<code>git revert</code> does not erase. It adds a <b>new</b> commit that does the exact opposite of an old one.', 'History stays the same for everyone, so it is safe after you push.'],
        cmds: [
          { c: 'git revert a1b2c3d', d: 'Make a new commit that undoes commit a1b2c3d.' },
          { c: 'git revert --no-edit a1b2c3d', d: 'Same, and use the default message without opening an editor.' },
          { c: 'git revert -m 1 9f8e7d6', d: 'Undo a merge commit. -m 1 means keep the main line side.' }
        ]
      },
      {
        pic: vsPic,
        h: 'Reset or revert?',
        text: ['<b>Reset</b> rewrites history. Fine for commits only you have.', '<b>Revert</b> adds to history. Use it for anything already pushed.']
      },
      {
        pic: term(['$ git clean -n', 'Would remove debug.txt', 'Would remove temp/', '$ git clean -fd', 'Removing debug.txt', 'Removing temp/'], 'git clean'),
        h: 'Sweep away untracked junk.',
        text: ['<code>git clean</code> deletes <b>untracked</b> files. Always do a dry run with <code>-n</code> first.'],
        cmds: [
          { c: 'git clean -n', d: 'Dry run. List what would be deleted. Deletes nothing.' },
          { c: 'git clean -f', d: 'Delete untracked files.' },
          { c: 'git clean -fd', d: 'Delete untracked files and folders.' },
          { c: 'git clean -fdx', d: 'Also delete ignored files, like builds and node_modules.' }
        ],
        warn: 'Cleaned files were never in Git. They do not go to a trash can.'
      },
      {
        pic: safetyPic,
        h: 'The danger meter.',
        text: ['Green commands never lose work. Red ones can. Before a red one, run <code>git status</code> and think twice.'],
        cmds: [{ c: 'git commit --amend', d: 'Fix the last commit (recap from lesson 7). Rewrites it, so only before pushing.' }]
      }
    ],
    quiz: [
      {
        type: 'match',
        q: 'Match each situation to the right undo.',
        pairs: [['git restore app.js', 'I edited a file and want the old version back'], ['git restore --staged app.js', 'I staged a file by mistake'], ['git reset --soft HEAD~1', 'My last commit is wrong, not pushed, keep changes'], ['git revert a1b2c3d', 'A pushed commit broke things'], ['git clean -fd', 'Delete stray untracked files and folders']],
        why: 'Edited: restore. Staged: restore --staged. Private commit: reset. Shared commit: revert. Junk: clean.'
      },
      {
        type: 'bucket',
        q: 'Safe, or can it destroy work?',
        buckets: ['Safe', 'Can destroy work'],
        items: [['git status', 0], ['git restore --staged a.js', 0], ['git revert a1b2c3d', 0], ['git reset --soft HEAD~1', 0], ['git reset --hard HEAD~1', 1], ['git clean -fd', 1], ['git restore a.js', 1]],
        why: 'Hard reset, clean and restoring a file all throw away uncommitted work.'
      },
      {
        type: 'pick',
        q: 'A bad commit is already on GitHub and your team pulled it. Best undo?',
        options: ['git revert', 'git reset --hard', 'git commit --amend', 'Delete the repo'],
        answer: 0,
        why: 'Revert adds an undo commit. Nobody\'s history breaks.'
      },
      {
        type: 'pick',
        q: 'After <code>git reset --soft HEAD~1</code>, where are the changes from that commit?',
        options: ['Staged, ready to commit again', 'In your files, unstaged', 'Gone', 'On GitHub'],
        answer: 0,
        why: 'Soft keeps them staged. Mixed (the default) leaves them unstaged. Hard deletes them.'
      },
      {
        type: 'order',
        q: 'Clean up junk files safely. Put the steps in order.',
        items: ['git status to see untracked files', 'git clean -n for a dry run', 'Read the list carefully', 'git clean -fd'],
        why: 'Look, dry run, read, then delete.'
      },
      {
        type: 'fill',
        q: 'Undo the last commit but keep its changes staged.',
        text: 'git reset --___ HEAD~___',
        options: ['soft', '1', 'hard', 'mixed', '2'],
        answer: ['soft', '1'],
        why: 'git reset --soft HEAD~1.'
      },
      {
        type: 'type',
        q: 'Do a dry run that shows which untracked files <code>git clean</code> would delete.',
        answers: ['git clean -n', 'git clean --dry-run', 'git clean -nd', 'git clean -dn', 'git clean -n -d'],
        hint: 'git clean with the "not really" flag.',
        why: 'git clean -n only lists. Nothing is deleted.'
      },
      {
        type: 'type',
        q: 'Make a new commit that undoes commit <code>a1b2c3d</code>.',
        answers: ['git revert a1b2c3d', 'git revert --no-edit a1b2c3d'],
        hint: 'The safe undo for shared history.',
        why: 'git revert a1b2c3d adds an opposite commit.'
      }
    ]
  });

  /* =====================================================================
     l12  HEAD and pointers
     ===================================================================== */
  const hashPic = svg(600, 240, 'A commit hash is a fingerprint: 40 characters, usually shortened to 7',
    `<g transform="translate(60 40)">` + [0, 1, 2, 3, 4].map(i => `<path d="M${70 - i * 12} ${80} a${12 + i * 12} ${16 + i * 14} 0 1 1 ${24 + i * 24} 0" fill="none" stroke="${P.accent}" stroke-width="5" stroke-linecap="round"/>`).join('') + `</g>` +
    box(250, 40, 330, 70, P.white, 14) + T(415, 70, '3f9a1c2e8b7d6a5f4e3d', { s: 14, m: true }) + T(415, 92, '2c1b0a9f8e7d6c5b4a39', { s: 14, m: true }) +
    T(415, 136, 'full hash: 40 characters', { s: 12.5, f: P.mute }) +
    box(330, 154, 170, 50, P.tint, 14) + T(415, 186, '3f9a1c2', { s: 20, m: true, f: P.accent }) + T(160, 222, 'unique fingerprint', { s: 13, f: P.ink2 }));

  const stickyA = graph({ label: 'main is a sticky note on commit C', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], hi: true }], refs: { main: 'C' }, head: 'main' });
  const stickyB = graph({ label: 'After a commit, the main sticky note moves to D', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'], hi: true }], refs: { main: 'D' }, head: 'main' });
  const stickyPic = `<div style="display:grid;gap:10px;width:100%">${stickyA}<div style="text-align:center;font:800 13px var(--mono);color:var(--accent)">git commit ↓</div>${stickyB}</div>`;

  const relPic = graph({
    label: 'HEAD~1, HEAD~2 and HEAD~3 count back from HEAD',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'], hi: true }],
    refs: { 'HEAD~3': 'A', 'HEAD~2': 'B', 'HEAD~1': 'C', main: 'D' }, head: 'main'
  });

  const parentsPic = graph({
    label: 'A merge commit M has two parents: HEAD^1 on main and HEAD^2 on the feature branch',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'F', lane: 1, parents: ['A'], x: 1.2 }, { id: 'C', parents: ['B'], x: 2 }, { id: 'M', parents: ['C', 'F'], hi: true, x: 3 }],
    refs: { 'HEAD^1': 'C', 'HEAD^2': 'F', main: 'M' }, head: 'main'
  });

  const detachedPic = graph({
    label: 'Detached HEAD: HEAD points straight at commit B, not at a branch',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'], hi: true }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'] }],
    refs: { main: 'D' }, head: 'B'
  });

  COURSE.add({
    id: 'l12', module: 1, minutes: 12,
    title: 'HEAD and pointers.',
    kicker: 'hashes, HEAD~1, detached HEAD',
    summary: 'Every commit has an ID. Branches and HEAD are just name tags that point at commits. Once you see that, Git stops being magic.',
    parts: [
      {
        pic: hashPic,
        h: 'Every commit has a fingerprint.',
        text: ['Each commit gets a <b>hash</b>: 40 letters and numbers made from its content. No two commits share one.', 'You can use just the first 7 characters. That is the <b>short hash</b>.'],
        cmds: [
          { c: 'git rev-parse HEAD', d: 'Print the full hash of the commit you are on.' },
          { c: 'git rev-parse --short HEAD', d: 'Print the short hash.' }
        ]
      },
      {
        pic: stickyPic,
        h: 'A branch is a sticky note.',
        text: ['A branch name like <b>main</b> is a sticky note stuck on one commit.', 'When you commit, the note jumps forward to the new commit by itself. That is all a branch is.']
      },
      {
        pic: relPic,
        h: 'HEAD and counting back.',
        text: ['<b>HEAD</b> means "where I am now". Usually it points at a branch, which points at a commit.', '<code>HEAD~1</code> is one step back. <code>HEAD~3</code> is three steps back. <code>HEAD^</code> is the same as <code>HEAD~1</code>.'],
        cmds: [
          { c: 'git show HEAD~1', d: 'Show the commit one step before HEAD.' },
          { c: 'git show HEAD~3', d: 'Show the commit three steps back.' },
          { c: 'git show HEAD^', d: 'Same as HEAD~1: the first parent.' }
        ]
      },
      {
        pic: parentsPic,
        h: 'Merge commits have two parents.',
        text: ['A merge joins two lines, so it has two parents. <code>^1</code> is the line you were on. <code>^2</code> is the line you merged in.'],
        cmds: [{ c: 'git show HEAD^2', d: 'Show the second parent of a merge commit (the merged-in branch).' }]
      },
      {
        pic: term(['$ git reset --hard HEAD~2', '# oops, wrong number', '$ git show main@{1}', 'commit 9b1e44a  (where main was before)', '$ git reset --hard ORIG_HEAD', 'HEAD is now at 9b1e44a'], 'where was I?'),
        h: 'Where a name used to point.',
        text: ['<code>main@{1}</code> means "where main was one move ago". Git remembers past spots for a while.', '<code>ORIG_HEAD</code> is a bookmark Git saves before big moves like reset and merge. Lesson 31 covers the full rescue kit.'],
        cmds: [
          { c: 'git show main@{1}', d: 'Show where main pointed before its last move.' },
          { c: 'git reset --hard ORIG_HEAD', d: 'Jump back to where you were before the last reset or merge.' }
        ]
      },
      {
        pic: detachedPic,
        h: 'Detached HEAD is just visiting.',
        text: ['Check out a commit directly and HEAD points at the commit, not at a branch. Git calls this <b>detached HEAD</b>.', 'Look around freely. If you make commits here, give them a branch before you leave, or they get lost.'],
        cmds: [
          { c: 'git switch --detach a1b2c3d', d: 'Visit an old commit (detached HEAD).' },
          { c: 'git checkout a1b2c3d', d: 'Older way to visit a commit.' },
          { c: 'git switch main', d: 'Go back to the main branch.' },
          { c: 'git switch -', d: 'Go back to wherever you were before.' },
          { c: 'git switch -c new-branch', d: 'Make a branch right here, so new commits are kept.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick',
        q: 'What is <code>HEAD~2</code>?',
        options: ['The commit two steps before where you are', 'The second branch', 'Two commits ahead', 'The second parent of a merge'],
        answer: 0,
        hints: { 3: 'That is HEAD^2. The ~ walks back in a straight line.' },
        why: '~ counts back along first parents. HEAD~2 is the grandparent.'
      },
      {
        type: 'match',
        q: 'Match the name to what it points at.',
        pairs: [['HEAD', 'Where you are right now'], ['HEAD~1', 'One commit back'], ['HEAD^2', 'Second parent of a merge'], ['main@{1}', 'Where main was before its last move'], ['3f9a1c2', 'One exact commit, by short hash']],
        why: 'All of these are just ways to name a commit.'
      },
      {
        type: 'bucket',
        q: 'Is the name relative (counts from HEAD) or fixed (one exact commit)?',
        buckets: ['Relative to HEAD', 'One fixed commit'],
        items: [['HEAD~1', 0], ['HEAD^', 0], ['HEAD~3', 0], ['HEAD^2', 0], ['3f9a1c2', 1], ['a1b2c3d4e5f6...', 1]],
        why: 'HEAD names move with you. Hashes never change.'
      },
      {
        type: 'pick',
        q: 'What is a branch, really?',
        options: ['A movable name tag pointing at one commit', 'A full copy of all files', 'A folder inside the project', 'A list of every commit'],
        answer: 0,
        why: 'A branch is a tiny pointer. That is why making one is instant.'
      },
      {
        type: 'order',
        q: 'You visit an old commit, try a fix, and want to keep it. Order the steps.',
        items: ['git switch --detach a1b2c3d', 'Edit files and commit', 'git switch -c try-fix', 'git switch main'],
        why: 'Visit, commit, give it a branch name, then go home. The branch keeps your work safe.'
      },
      {
        type: 'fill',
        q: 'Jump back to the branch you were on before.',
        text: 'git ___ ___',
        options: ['switch', '-', 'back', 'checkout', 'HEAD'],
        answer: ['switch', '-'],
        why: 'git switch - toggles to your previous branch, like cd -.'
      },
      {
        type: 'type',
        q: 'Print the short hash of the commit you are on.',
        answers: ['git rev-parse --short HEAD', 'git rev-parse --short=7 HEAD'],
        hint: 'git rev-parse, the short flag, then HEAD.',
        why: 'git rev-parse --short HEAD prints something like 3f9a1c2.'
      }
    ]
  });
})();
