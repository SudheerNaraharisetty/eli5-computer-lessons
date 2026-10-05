/* Module 2: Branches. */
(function () {
  const { P, graph, term, esc } = GH;

  // two pictures stacked with a caption each
  const duo = (a, capA, b, capB) => `<div style="display:grid;gap:10px;width:100%">
    <div><span class="tag">${capA}</span>${a}</div><div><span class="tag accent">${capB}</span>${b}</div></div>`;

  // a small card with a word and caption, for svg grids
  const card = (x, y, w, word, cap, fill) => `<g transform="translate(${x} ${y})">
    <rect x="3" y="5" width="${w}" height="74" rx="14" fill="${P.ink}"/>
    <rect width="${w}" height="74" rx="14" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="${w / 2}" y="32" text-anchor="middle" font-size="17" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">${esc(word)}</text>
    <text x="${w / 2}" y="56" text-anchor="middle" font-size="12" font-weight="700" fill="${P.ink2}">${esc(cap)}</text></g>`;

  /* ---------------- l13 Branches ---------------- */
  const l13a = graph({
    label: 'Two branch notes, main and login, stuck on the same commit C',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], hi: true }],
    refs: { main: 'C', login: 'C' }, head: 'main'
  });
  const l13b = graph({
    label: 'HEAD moved to the login branch, which has a new commit D',
    lanes: ['main', 'login'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'], hi: true }],
    refs: { main: 'C', login: 'D' }, head: 'login'
  });
  const namesSvg = `<svg viewBox="0 0 560 300" role="img" aria-label="Good branch names grouped by type">
    ${card(20, 20, 240, 'feature/login', 'new things', P.tint)}
    ${card(300, 20, 240, 'fix/typo', 'repairs', P.okT)}
    ${card(20, 130, 240, 'docs/readme', 'writing', P.warnT)}
    ${card(300, 130, 240, 'chore/deps', 'housekeeping', P.sand)}
    <text x="280" y="248" text-anchor="middle" font-size="14" font-weight="800" fill="${P.ink2}">type / short-name</text>
    <text x="280" y="274" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.mute}">lowercase, dashes, no spaces</text></svg>`;

  COURSE.add({
    id: 'l13', module: 2, minutes: 9,
    title: 'Branches.',
    kicker: 'Sticky notes on commits',
    summary: 'A branch is a sticky note with a name, stuck on a commit. Make a new note, work on it, and main stays safe.',
    parts: [
      {
        pic: l13a,
        h: 'A branch is just a sticky note.',
        text: ['A branch is a name that points at one commit. That is all. It costs almost nothing.', 'Make a new branch and Git sticks a second note on the commit you are on.'],
        cmds: [
          { c: 'git branch', d: 'List your branches. A star marks the one you are on.' },
          { c: 'git branch login', d: 'Make a new note called login. You stay where you are.' }
        ]
      },
      {
        pic: l13b,
        h: 'Switch to move HEAD.',
        text: ['<b>HEAD</b> sits on the branch you are using. Switch, and HEAD moves.', 'New commits go on the branch HEAD is on. Here, <b>D</b> lands on login. main does not move.'],
        cmds: [
          { c: 'git switch login', d: 'Move to the login branch.' },
          { c: 'git switch -c login', d: 'Create login and move to it in one step.' },
          { c: 'git checkout login', d: 'The older way to switch. Still works everywhere.' },
          { c: 'git checkout -b login', d: 'The older way to create and switch.' },
          { c: 'git switch -', d: 'Jump back to the branch you were on before.' }
        ],
        tip: '<code>switch</code> is newer and only does one job. <code>checkout</code> does many jobs, so you will see it in old guides.'
      },
      {
        pic: term(['$ git branch -vv', '* login  9c1e2f0 Add form', '  main   3a7b1d4 [origin/main] Home page', '$ git branch -a', '* login', '  main', '  remotes/origin/main'], 'look around'),
        h: 'See every branch.',
        text: ['Add a flag to see more. <b>-v</b> shows the last commit. <b>-vv</b> also shows what it tracks online.', 'Branches starting with <b>remotes/</b> are copies of GitHub branches. You meet them in Module 3.'],
        cmds: [
          { c: 'git branch -a', d: 'All branches, yours and the remote ones.' },
          { c: 'git branch -r', d: 'Only remote branches.' },
          { c: 'git branch -v', d: 'Each branch with its last commit.' },
          { c: 'git branch -vv', d: 'Also shows the online branch it follows.' }
        ]
      },
      {
        pic: graph({
          label: 'Branch fix is merged into main, branch idea is not',
          lanes: ['main', 'idea'],
          commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], hi: true }, { id: 'X', lane: 1, parents: ['B'] }],
          refs: { main: 'C', fix: 'C', idea: 'X' }, head: 'main'
        }),
        h: 'Rename and delete.',
        text: ['<b>fix</b> sits inside main already, so it is <b>merged</b>. Deleting it loses nothing.', '<b>idea</b> has commit X that main does not have. Git refuses <b>-d</b> to protect it.'],
        cmds: [
          { c: 'git branch -m old-name new-name', d: 'Rename any branch.' },
          { c: 'git branch -m new-name', d: 'Rename the branch you are on.' },
          { c: 'git branch -d fix', d: 'Delete a branch that is already merged. Safe.' },
          { c: 'git branch -D idea', d: 'Force delete, even with unmerged work.' },
          { c: 'git branch --merged', d: 'Branches already inside the current one.' },
          { c: 'git branch --no-merged', d: 'Branches with work not merged yet.' }
        ],
        warn: '<code>-D</code> with a capital D throws away unmerged commits. Check <code>--no-merged</code> first.'
      },
      {
        pic: namesSvg,
        h: 'Give branches good names.',
        text: ['Start with the kind of work, then a slash, then a short name. Your team will thank you.', 'Rarely you want a branch with no history at all, like a page for a website. That is an <b>orphan</b> branch.'],
        cmds: [
          { c: 'git switch -c feature/login', d: 'A clear, typed branch name.' },
          { c: 'git switch --orphan gh-pages', d: 'A brand new branch with no past commits.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is a branch, really?',
        options: ['A name that points at one commit', 'A full copy of every file', 'A folder on GitHub', 'A backup on a USB stick'],
        answer: 0, hints: { 1: 'Branches are cheap because they copy nothing.', 2: 'It lives on your computer first.', 3: 'Not quite. Think sticky note.' },
        why: 'A branch is a tiny pointer. That is why making one is instant.'
      },
      {
        type: 'type', q: 'Create a branch called <code>login</code> and move to it, in one command.',
        answers: ['git switch -c login', 'git checkout -b login'],
        hint: 'Use switch with the create flag.',
        why: 'git switch -c login (or the older git checkout -b login) does both jobs.'
      },
      {
        type: 'bucket', q: 'What does each command do?',
        buckets: ['Makes a branch', 'Only moves you', 'Deletes a branch'],
        items: [['git branch idea', 0], ['git switch -c idea', 0], ['git checkout -b idea', 0], ['git switch idea', 1], ['git checkout idea', 1], ['git switch -', 1], ['git branch -d idea', 2], ['git branch -D idea', 2]],
        why: 'switch -c and checkout -b also move you, but their main job is making the branch.'
      },
      {
        type: 'order', q: 'Try an idea safely. Put the steps in order.',
        items: ['git switch -c idea', 'Edit files and commit', 'git switch main', 'git branch -D idea'],
        why: 'Make a branch, work, go back to main, and throw the idea away if it failed. main never saw it.'
      },
      {
        type: 'match', q: 'Match each flag to what it shows.',
        pairs: [['git branch -a', 'Every branch, local and remote'], ['git branch -r', 'Only remote branches'], ['git branch -vv', 'Last commit and the online branch it follows'], ['git branch --merged', 'Branches already inside this one'], ['git branch --no-merged', 'Branches with work not joined yet']],
        why: 'These flags help you clean up old branches without losing work.'
      },
      {
        type: 'fill', q: 'Rename <code>logn</code> to <code>login</code>, then delete the merged branch <code>fix</code>.',
        text: 'git branch ___ logn login\ngit branch ___ fix',
        options: ['-m', '-d', '-D', '-c', '-r'],
        answer: ['-m', '-d'],
        hint: 'm for move (rename), d for delete. Lowercase d is the safe one.',
        why: '-m renames, -d safely deletes a merged branch.'
      },
      {
        type: 'pick', q: 'You were on <code>main</code>, then switched to <code>login</code>. What does <code>git switch -</code> do?',
        options: ['Takes you back to main', 'Deletes login', 'Makes a branch called -', 'Shows all branches'],
        answer: 0,
        why: 'The dash means "the branch I was on before", like the back button.'
      }
    ]
  });

  /* ---------------- l14 Merging ---------------- */
  const ffBefore = graph({
    label: 'Before: main at B, feature two commits ahead at D',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }],
    refs: { main: 'B', feature: 'D' }, head: 'main'
  });
  const ffAfter = graph({
    label: 'After a fast-forward: main slid forward to D',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', parents: ['B'], hi: true }, { id: 'D', parents: ['C'], hi: true }],
    refs: { main: 'D', feature: 'D' }, head: 'main'
  });
  const threeWay = graph({
    label: 'main and feature both moved. Merge commit M has two parents.',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'E', parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'M', parents: ['E', 'D'], hi: true }],
    refs: { main: 'M', feature: 'D' }, head: 'main'
  });
  const noFF = graph({
    label: 'With --no-ff Git makes merge commit M even when it could slide',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'M', parents: ['B', 'D'], hi: true }],
    refs: { main: 'M', feature: 'D' }, head: 'main'
  });
  const squash = graph({
    label: 'Squash merge: three feature commits become one new commit S on main',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'E', lane: 1, parents: ['D'] }, { id: 'S', parents: ['B'], hi: true, x: 5 }],
    refs: { main: 'S', feature: 'E' }, head: 'main'
  });

  COURSE.add({
    id: 'l14', module: 2, minutes: 9,
    title: 'Merging.',
    kicker: 'Joining branches back together',
    summary: 'Merge brings the work from one branch into the branch you are on. Sometimes Git just slides a note forward. Sometimes it ties two lines together.',
    parts: [
      {
        pic: duo(ffBefore, 'Before', ffAfter, 'After git merge feature'),
        h: 'Fast-forward: just slide the note.',
        text: ['main has not moved since feature started. So Git does not need a new commit.', 'It slides the <b>main</b> note forward to <b>D</b>. This is a <b>fast-forward</b>.'],
        cmds: [
          { c: 'git switch main', d: 'Go to the branch that should receive the work.' },
          { c: 'git merge feature', d: 'Bring feature into the branch you are on.' }
        ],
        tip: 'Always switch to the receiving branch first. Merge pulls work in, toward you.'
      },
      {
        pic: threeWay,
        h: 'Both moved? Git ties a knot.',
        text: ['Here main got commit <b>E</b> while feature got <b>C</b> and <b>D</b>. Sliding is impossible.', 'Git makes a new <b>merge commit</b>, <b>M</b>. It has two parents, one from each line.'],
        cmds: [{ c: 'git merge feature', d: 'Same command. Git picks fast-forward or a merge commit by itself.' }]
      },
      {
        pic: noFF,
        h: 'Choose the merge style.',
        text: ['<b>--no-ff</b> always makes a merge commit, so the history shows a feature happened.', '<b>--ff-only</b> is the opposite. It merges only if it can slide, and stops otherwise.'],
        cmds: [
          { c: 'git merge --no-ff feature', d: 'Always make a merge commit.' },
          { c: 'git merge --ff-only feature', d: 'Only slide forward. Refuse if a knot is needed.' }
        ]
      },
      {
        pic: squash,
        h: 'Squash: many commits become one.',
        text: ['<b>--squash</b> takes all the changes from feature and stages them as one change.', 'Then you commit once. main gets one tidy commit, <b>S</b>.'],
        cmds: [
          { c: 'git merge --squash feature', d: 'Stage all of feature as one change. No commit yet.' },
          { c: 'git commit -m "Add login"', d: 'Save it as one commit.' }
        ],
        tip: 'After a squash, Git does not see feature as merged. Delete it with <code>-D</code>.'
      },
      {
        pic: term(['$ git log --graph --oneline --all', '*   7d1c0aa (HEAD -> main) Merge branch feature', '|\\', '| * 41be9f2 (feature) Add form', '| * 0c88e31 Add page', '* | 9a2f11d Fix header', '|/', '* 3a7b1d4 Home page'], 'see the knot'),
        h: 'See it, then tidy up.',
        text: ['<b>--graph</b> draws the lines with text. Each star is a commit.', 'Changed your mind in the middle? <b>--abort</b> puts everything back. Done? Delete the old branch.'],
        cmds: [
          { c: 'git log --graph --oneline --all', d: 'Draw every branch as a text picture.' },
          { c: 'git merge --abort', d: 'Stop a merge and go back to before it.' },
          { c: 'git branch -d feature', d: 'Delete the merged branch. Its commits stay in main.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'When does Git do a <b>fast-forward</b>?',
        options: ['When the receiving branch has not moved since the other branch started', 'When both branches have new commits', 'Only when you add --squash', 'Every time you push'],
        answer: 0, hints: { 1: 'Then Git needs a merge commit.', 2: 'Squash makes a new commit instead.' },
        why: 'If main is behind on the same line, Git just slides it forward.'
      },
      {
        type: 'order', q: 'Merge feature into main and clean up. Put it in order.',
        items: ['git switch main', 'git merge feature', 'git log --graph --oneline', 'git branch -d feature'],
        why: 'Go to the receiver, merge, look, then delete the finished branch.'
      },
      {
        type: 'bucket', q: 'What will each merge create?',
        buckets: ['Just slides main', 'Makes a merge commit'],
        items: [['main has no new commits', 0], ['git merge --ff-only feature (works)', 0], ['Both branches have new commits', 1], ['git merge --no-ff feature', 1]],
        why: '--no-ff always ties a knot. A fast-forward only happens when main is behind on the same line.'
      },
      {
        type: 'match', q: 'Match each command to its job.',
        pairs: [['git merge feature', 'Bring feature into my branch'], ['git merge --no-ff feature', 'Always make a merge commit'], ['git merge --ff-only feature', 'Slide forward or refuse'], ['git merge --squash feature', 'Stage all of feature as one change'], ['git merge --abort', 'Cancel and go back']],
        why: 'One verb, five flavors.'
      },
      {
        type: 'fill', q: 'Squash feature into one commit.',
        text: 'git switch main\ngit merge ___ feature\ngit ___ -m "Add login"',
        options: ['--squash', '--no-ff', 'commit', 'push', 'add'],
        answer: ['--squash', 'commit'],
        hint: 'Squash stages the changes. You still have to save them.',
        why: 'merge --squash stages everything, then one commit saves it.'
      },
      {
        type: 'type', q: 'You are on main. Merge the branch <code>feature</code> in.',
        answers: ['git merge feature'],
        why: 'git merge feature pulls feature into the branch you are on.'
      },
      {
        type: 'pick', q: 'How many parents does a merge commit have?',
        options: ['Two', 'One', 'None', 'As many as there are files'],
        answer: 0,
        why: 'One parent from each line it joins. That is how Git remembers both stories.'
      }
    ]
  });

  /* ---------------- l15 Merge conflicts ---------------- */
  const clash = `<svg viewBox="0 0 560 300" role="img" aria-label="Two people change the same line of a file in different ways">
    <g transform="translate(20 30)"><rect x="3" y="5" width="200" height="90" rx="14" fill="${P.ink}"/><rect width="200" height="90" rx="14" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="100" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="${P.accent}">main says</text>
    <text x="100" y="62" text-anchor="middle" font-size="16" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">title: Hi</text></g>
    <g transform="translate(340 30)"><rect x="3" y="5" width="200" height="90" rx="14" fill="${P.ink}"/><rect width="200" height="90" rx="14" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="100" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="${P.ok}">feature says</text>
    <text x="100" y="62" text-anchor="middle" font-size="16" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">title: Hey</text></g>
    <path d="M120 128 L250 200" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/><path d="M440 128 L310 200" stroke="${P.ok}" stroke-width="4" stroke-linecap="round"/>
    <path d="M280 170 l14 22 l24 -6 l-12 22 l18 18 l-26 2 l-6 26 l-14 -20 l-22 12 l4 -26 l-22 -12 l24 -8 l-6 -24 z" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="282" y="226" text-anchor="middle" font-size="22" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.danger}">?</text>
    <text x="280" y="290" text-anchor="middle" font-size="13" font-weight="800" fill="${P.ink2}">Same line, two answers. Git asks you.</text></svg>`;

  COURSE.add({
    id: 'l15', module: 2, minutes: 10,
    title: 'Merge conflicts.',
    kicker: 'When Git needs you to decide',
    summary: 'A conflict is Git politely asking: two branches changed the same line, which one wins? You pick, Git saves.',
    parts: [
      {
        pic: clash,
        h: 'Same line, two answers.',
        text: ['Git merges different lines by itself. Easy.', 'But if both branches change the <b>same line</b>, Git cannot guess. It stops and asks you. That is a <b>conflict</b>.'],
        tip: 'A conflict is not an error. Nothing is broken. Git is just being careful.'
      },
      {
        pic: term(['$ git merge feature', 'Auto-merging index.html', 'CONFLICT (content): Merge conflict in index.html', 'Automatic merge failed; fix conflicts and then commit.', '$ git status', 'You have unmerged paths.', '        both modified:   index.html'], 'uh oh'),
        h: 'Git tells you where.',
        text: ['The merge stops. <b>git status</b> lists files marked <b>both modified</b>.', 'Those are the files you need to open and fix.'],
        cmds: [
          { c: 'git status', d: 'Find the files in conflict.' },
          { c: 'git diff', d: 'Show the clashing lines from both sides.' },
          { c: 'git log --merge', d: 'Show the commits that touched the clashing files.' }
        ]
      },
      {
        pic: term(['# inside index.html', '<<<<<<< HEAD', 'title: Hi', '=======', 'title: Hey', '>>>>>>> feature'], 'index.html'),
        h: 'Read the markers.',
        text: ['<b>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</b> starts your side, the branch you are on.', '<b>=======</b> is the wall between the two sides.', '<b>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</b> ends their side, the branch coming in.']
      },
      {
        pic: term(['# you edit the file to what you want:', 'title: Hey there', '$ git add index.html', '$ git commit', '[main 7d1c0aa] Merge branch feature'], 'fixed'),
        h: 'Fix it in three moves.',
        text: ['<b>1.</b> Edit the file. Keep what you want. Delete all three marker lines.', '<b>2.</b> <b>git add</b> the file to say "fixed".', '<b>3.</b> Commit to finish the merge.'],
        cmds: [
          { c: 'git add index.html', d: 'Mark the file as fixed.' },
          { c: 'git commit', d: 'Finish the merge. Git writes the message for you.' },
          { c: 'git merge --continue', d: 'Same as commit, after you add every file.' },
          { c: 'git merge --abort', d: 'Panic button. Undo the whole merge.' }
        ],
        warn: 'Search the file for <code>&lt;&lt;&lt;&lt;</code> before you add it. Leftover markers break code.'
      },
      {
        pic: term(['$ git checkout --ours index.html', '# keep my version of the whole file', '$ git checkout --theirs index.html', '# keep their version of the whole file', '$ git mergetool', '# open a side by side fixing tool'], 'shortcuts'),
        h: 'Shortcuts for whole files.',
        text: ['Want one side for the whole file? <b>--ours</b> is the branch you are on. <b>--theirs</b> is the one coming in.', '<b>rerere</b> makes Git remember how you fixed a conflict, and repeat it next time.'],
        cmds: [
          { c: 'git checkout --ours index.html', d: 'Keep my side for this file.' },
          { c: 'git checkout --theirs index.html', d: 'Keep their side for this file.' },
          { c: 'git mergetool', d: 'Open a visual tool to fix conflicts.' },
          { c: 'git config --global rerere.enabled true', d: 'Remember fixes and reuse them.' }
        ]
      },
      {
        pic: graph({
          label: 'Short branches merged often rarely conflict',
          lanes: ['main', 'small'],
          commits: [{ id: 'A', parents: [] }, { id: 'B', lane: 1, parents: ['A'] }, { id: 'C', parents: ['A', 'B'], hi: true }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'E', parents: ['C', 'D'], hi: true }],
          refs: { main: 'E' }, head: 'main'
        }),
        h: 'Fewer conflicts, happier days.',
        text: ['Keep branches <b>short</b> and merge <b>often</b>.', 'Get the latest main before you start. Tell teammates which files you are touching.', 'Do not reformat a whole file in the same change as a fix.']
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Why does a merge conflict happen?',
        options: ['Two branches changed the same lines differently', 'Git crashed', 'A file is too big', 'You forgot to push'],
        answer: 0, hints: { 1: 'Git is fine. It is waiting for you.', 3: 'Pushing has nothing to do with a local merge.' },
        why: 'Different lines merge by themselves. Same lines need a human.'
      },
      {
        type: 'match', q: 'Match each marker to its meaning.',
        pairs: [['<<<<<<< HEAD', 'Start of my side'], ['=======', 'The wall between sides'], ['>>>>>>> feature', 'End of the incoming side'], ['both modified', 'git status words for a conflict file']],
        why: 'Delete all three marker lines when you fix the file.'
      },
      {
        type: 'order', q: 'Fix a conflict. Put the steps in order.',
        items: ['git merge feature', 'git status to find the files', 'Edit the file and remove the markers', 'git add index.html', 'git commit'],
        why: 'Merge, find, fix, add, commit.'
      },
      {
        type: 'bucket', q: 'Will this cause a conflict?',
        buckets: ['Conflict', 'Merges by itself'],
        items: [['Both change line 3 of app.js', 0], ['One deletes a line the other edited', 0], ['main edits line 1, feature edits line 40', 1], ['Each branch edits a different file', 1], ['Only one branch changed the file', 1]],
        why: 'Only overlapping changes to the same lines need your help.'
      },
      {
        type: 'fill', q: 'Keep <b>your</b> version of style.css, then mark it fixed.',
        text: 'git checkout --___ style.css\ngit ___ style.css',
        options: ['ours', 'theirs', 'add', 'mine', 'push'],
        answer: ['ours', 'add'],
        hint: 'Ours is the branch you are on.',
        why: '--ours keeps your side. git add marks the file as fixed.'
      },
      {
        type: 'type', q: 'This merge is a mess. Cancel it and go back to before.',
        answers: ['git merge --abort'],
        hint: 'The merge command has a flag for stopping.',
        why: 'git merge --abort restores everything to how it was before the merge.'
      },
      {
        type: 'pick', q: 'What does turning on <code>rerere</code> do?',
        options: ['Remembers how you fixed a conflict and reuses it', 'Deletes conflict markers for you', 'Stops all conflicts forever', 'Pushes after every merge'],
        answer: 0,
        why: 'rerere means reuse recorded resolution. Handy when the same conflict keeps coming back.'
      }
    ]
  });

  /* ---------------- l16 Rebase ---------------- */
  const rbBefore = graph({
    label: 'Before rebase: feature starts from B, main moved to E',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'E', parents: ['B'] }],
    refs: { main: 'E', feature: 'D' }, head: 'feature'
  });
  const rbAfter = graph({
    label: 'After rebase: new copies C prime and D prime sit on top of E. Old C and D fade.',
    lanes: ['main', 'feature', 'old'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 2, parents: ['B'], ghost: true }, { id: 'D', lane: 2, parents: ['C'], ghost: true }, { id: 'E', parents: ['B'] }, { id: "C'", lane: 1, parents: ['E'], hi: true }, { id: "D'", lane: 1, parents: ["C'"], hi: true }],
    refs: { main: 'E', feature: "D'" }, head: 'feature'
  });
  const mergeWay = graph({
    label: 'Merge keeps both lines and adds a knot',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'E', parents: ['B'] }, { id: 'M', parents: ['E', 'C'], hi: true }],
    refs: { main: 'M' }, head: 'main'
  });
  const rebaseWay = graph({
    label: 'Rebase gives one straight line',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'E', parents: ['B'] }, { id: "C'", parents: ['E'], hi: true }],
    refs: { main: "C'" }, head: 'main'
  });
  const golden = `<svg viewBox="0 0 560 280" role="img" aria-label="Rewriting shared commits confuses your teammates">
    ${[0, 1].map(i => `<g transform="translate(${40 + i * 300} 40)"><rect x="4" y="6" width="180" height="112" rx="12" fill="${P.ink}"/><rect width="180" height="112" rx="12" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
      <rect x="12" y="12" width="156" height="76" rx="6" fill="${i ? P.dangerT : P.okT}"/>
      <text x="90" y="46" text-anchor="middle" font-size="14" font-weight="800" fill="${P.ink}">${i ? 'Ana sees' : 'You have'}</text>
      <text x="90" y="70" text-anchor="middle" font-size="14" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">${i ? 'C and D?' : "C' and D'"}</text>
      <rect x="-14" y="112" width="208" height="14" rx="7" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/></g>`).join('')}
    <path d="M262 92 h36 M262 106 h36 M290 80 l-20 38" fill="none" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>
    <text x="280" y="210" text-anchor="middle" font-size="20" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.danger}">Never rebase commits</text>
    <text x="280" y="238" text-anchor="middle" font-size="20" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.danger}">other people already have.</text></svg>`;

  COURSE.add({
    id: 'l16', module: 2, minutes: 10,
    title: 'Rebase.',
    kicker: 'Moving your work on top',
    summary: 'Rebase picks up your commits and replays them on top of the newest main. History becomes one straight line.',
    parts: [
      {
        pic: duo(rbBefore, 'Before', rbAfter, 'After git rebase main'),
        h: 'Pick up and replay.',
        text: ['Your feature started at <b>B</b>, but main moved on to <b>E</b>.', 'Rebase copies <b>C</b> and <b>D</b> and replays them on top of E. The copies are new commits, <b>C\'</b> and <b>D\'</b>. The old ones fade away.'],
        cmds: [
          { c: 'git switch feature', d: 'Go to the branch you want to move.' },
          { c: 'git rebase main', d: 'Replay my commits on top of main.' }
        ]
      },
      {
        pic: term(['$ git rebase main', 'CONFLICT (content): Merge conflict in app.js', 'error: could not apply 0c88e31... Add page', '# fix app.js, then:', '$ git add app.js', '$ git rebase --continue', 'Successfully rebased and updated refs/heads/feature.'], 'rebase stop'),
        h: 'Conflicts happen one commit at a time.',
        text: ['Rebase replays commits one by one. If one clashes, it stops.', 'Fix the file, <b>git add</b> it, then continue. Repeat until done.'],
        cmds: [
          { c: 'git rebase --continue', d: 'Fixed it. Go on to the next commit.' },
          { c: 'git rebase --skip', d: 'Drop this commit and go on.' },
          { c: 'git rebase --abort', d: 'Stop and put everything back.' }
        ]
      },
      {
        pic: duo(mergeWay, 'Merge', rebaseWay, 'Rebase'),
        h: 'Merge or rebase?',
        text: ['<b>Merge</b> keeps the true story, with knots. Safe for everyone.', '<b>Rebase</b> rewrites your commits into a straight line. Cleaner to read.', 'Many teams rebase their own branch, then merge it.']
      },
      {
        pic: golden,
        h: 'The golden rule.',
        text: ['Rebase makes <b>new</b> commits. If a teammate already has the old ones, their history and yours no longer match.', 'Rebase only your own, unshared work.'],
        cmds: [
          { c: 'git pull --rebase', d: 'Get new commits and replay your unpushed work on top.' },
          { c: 'git config --global pull.rebase true', d: 'Make every pull rebase by default.' }
        ],
        warn: 'Never rebase main, or any branch other people use.'
      },
      {
        pic: graph({
          label: 'Rebase onto: move only the topic commits from old-base to main',
          lanes: ['main', 'old', 'topic'],
          commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'X', lane: 1, parents: ['A'] }, { id: 'T', lane: 2, parents: ['X'], ghost: true }, { id: "T'", parents: ['B'], hi: true, x: 4 }],
          refs: { main: 'B', old: 'X', topic: "T'" }, head: 'topic'
        }),
        h: 'Expert move: rebase --onto.',
        text: ['Your topic branch grew out of <b>old</b> by mistake.', '<b>--onto</b> lifts only the commits after old, and puts them on main.'],
        cmds: [{ c: 'git rebase --onto main old topic', d: 'Move topic commits that come after old onto main.' }]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does <code>git rebase main</code> do on your feature branch?',
        options: ['Replays your commits on top of main', 'Deletes main', 'Merges feature into main', 'Uploads to GitHub'],
        answer: 0, hints: { 2: 'Rebase moves your branch, not main.' },
        why: 'It copies your commits onto the tip of main. Your branch moves, main does not.'
      },
      {
        type: 'bucket', q: 'Merge or rebase?',
        buckets: ['Merge', 'Rebase'],
        items: [['Keeps a knot commit', 0], ['Safe on shared branches', 0], ['Makes a straight line', 1], ['Creates new copies of commits', 1], ['Only for your own unshared work', 1]],
        why: 'Merge adds, rebase rewrites.'
      },
      {
        type: 'order', q: 'Rebase hits a conflict. Put the rescue in order.',
        items: ['git rebase main', 'Fix the file', 'git add app.js', 'git rebase --continue'],
        why: 'Fix, add, continue. Repeat for each stopped commit.'
      },
      {
        type: 'match', q: 'Match the rebase flags.',
        pairs: [['git rebase --continue', 'I fixed it, go on'], ['git rebase --skip', 'Leave this commit out'], ['git rebase --abort', 'Undo the whole rebase'], ['git pull --rebase', 'Get new work and replay mine on top']],
        why: 'Three escape hatches and one daily habit.'
      },
      {
        type: 'fill', q: 'Move <code>topic</code> off of <code>old</code> and onto <code>main</code>.',
        text: 'git rebase ___ main old ___',
        options: ['--onto', 'topic', '--skip', 'main', '-i'],
        answer: ['--onto', 'topic'],
        hint: 'The order is: new base, old base, branch.',
        why: 'git rebase --onto main old topic.'
      },
      {
        type: 'type', q: 'You are on feature. Replay it on top of the latest main.',
        answers: ['git rebase main'],
        why: 'git rebase main moves your branch to start from main\'s tip.'
      },
      {
        type: 'pick', q: 'Which branch should you never rebase?',
        options: ['main, shared with your team', 'Your own branch nobody else has', 'A branch you made five minutes ago', 'A local experiment'],
        answer: 0,
        why: 'Rebasing shared history breaks your teammates\' copies.'
      }
    ]
  });

  /* ---------------- l17 Interactive rebase ---------------- */
  const messy = graph({
    label: 'Messy history with four small commits',
    commits: [{ id: 'A', msg: 'start', parents: [] }, { id: 'B', msg: 'add login', parents: ['A'] }, { id: 'C', msg: 'wip', parents: ['B'] }, { id: 'D', msg: 'typo', parents: ['C'] }, { id: 'E', msg: 'oops', parents: ['D'] }],
    refs: { feature: 'E' }, head: 'feature', msgs: true
  });
  const clean = graph({
    label: 'Clean history with one clear commit',
    commits: [{ id: 'A', msg: 'start', parents: [] }, { id: 'L', msg: 'Add login form', parents: ['A'], hi: true }],
    refs: { feature: 'L' }, head: 'feature', msgs: true
  });
  const words = `<svg viewBox="0 0 600 290" role="img" aria-label="The seven words in an interactive rebase list">
    ${card(10, 10, 135, 'pick', 'keep it', P.white)}
    ${card(155, 10, 135, 'reword', 'new message', P.tint)}
    ${card(300, 10, 135, 'edit', 'stop to change', P.warnT)}
    ${card(445, 10, 135, 'squash', 'join, mix notes', P.okT)}
    ${card(82, 110, 135, 'fixup', 'join, drop note', P.okT)}
    ${card(227, 110, 135, 'drop', 'delete it', P.dangerT)}
    ${card(372, 110, 135, 'exec', 'run a command', P.sand)}
    <text x="300" y="240" text-anchor="middle" font-size="13.5" font-weight="800" fill="${P.ink2}">Change the first word on a line. Move lines to reorder.</text>
    <text x="300" y="266" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.mute}">Oldest commit is at the top of the list.</text></svg>`;

  COURSE.add({
    id: 'l17', module: 2, minutes: 10,
    title: 'Interactive rebase.',
    kicker: 'Tidy history before you share',
    summary: 'Interactive rebase opens a to-do list of your commits. Rename, join, reorder, or delete them, then Git rebuilds the line.',
    parts: [
      {
        pic: duo(messy, 'Before', clean, 'After'),
        h: 'Clean up before you share.',
        text: ['Real work makes small messy commits like "wip" and "oops". That is fine.', 'Before others see them, you can tidy them into a few clear commits.'],
        warn: 'Only tidy commits you have not pushed for others yet. Same golden rule as rebase.'
      },
      {
        pic: term(['$ git rebase -i HEAD~3', '# your editor opens:', 'pick c3d4e5f wip', 'pick e5f6a7b typo', 'pick f7a8b9c oops', '# change pick to another word, save, close'], 'the to-do list'),
        h: 'Open the to-do list.',
        text: ['<b>HEAD~3</b> means "the last three commits". Git opens them in your editor as a list.', 'Each line starts with <b>pick</b>. You change that word, save, and close the editor.'],
        cmds: [{ c: 'git rebase -i HEAD~3', d: 'Edit the last three commits as a list.' }]
      },
      {
        pic: words,
        h: 'Seven magic words.',
        text: ['<b>squash</b> and <b>fixup</b> both join a commit into the one above it.', 'squash lets you mix the messages. fixup quietly throws its message away.', 'To <b>reorder</b> commits, move the lines up or down.']
      },
      {
        pic: term(['pick a1b2c3d add login', 'fixup c3d4e5f wip', 'fixup e5f6a7b typo', 'reword f7a8b9c oops', '# saved: Git joins 3 into 1, then asks for a new message'], 'edited list'),
        h: 'Squash three into one.',
        text: ['Keep the first line as <b>pick</b>. Mark the ones below it <b>fixup</b>.', 'They melt into the first commit. One clean commit comes out.']
      },
      {
        pic: term(['edit a1b2c3d add login', '# Git stops at that commit', '$ git commit --amend', '$ git rebase --continue'], 'edit stop'),
        h: 'Stop and change a commit.',
        text: ['<b>edit</b> pauses the rebase on that commit. Change files, then amend.', 'When you are happy, continue.'],
        cmds: [
          { c: 'git commit --amend', d: 'Change the paused commit.' },
          { c: 'git rebase --continue', d: 'Carry on with the rest of the list.' }
        ]
      },
      {
        pic: term(['$ git commit --fixup a1b2c3d', '[feature 9e9e9e9] fixup! add login', '$ git rebase -i --autosquash main', '# the fixup line is already in place'], 'autosquash'),
        h: 'Pro trick: autosquash.',
        text: ['Found a bug in an older commit? Make a <b>fixup commit</b> that names it.', '<b>--autosquash</b> moves it under its target and marks it fixup for you.'],
        cmds: [
          { c: 'git commit --fixup a1b2c3d', d: 'A commit meant to melt into commit a1b2c3d.' },
          { c: 'git rebase -i --autosquash main', d: 'Arrange all fixup commits automatically.' }
        ]
      }
    ],
    quiz: [
      {
        type: 'type', q: 'Open the last <b>three</b> commits as a to-do list.',
        answers: ['git rebase -i HEAD~3', 'git rebase --interactive HEAD~3'],
        hint: 'rebase, the interactive flag, then HEAD~ and a number.',
        why: 'git rebase -i HEAD~3 lists the last three commits for editing.'
      },
      {
        type: 'match', q: 'Match each to-do word to what it does.',
        pairs: [['pick', 'Keep the commit as it is'], ['reword', 'Keep it, change the message'], ['edit', 'Pause so I can change it'], ['squash', 'Join into the commit above, mix messages'], ['fixup', 'Join into the commit above, drop its message'], ['drop', 'Delete the commit']],
        why: 'These six cover almost every cleanup.'
      },
      {
        type: 'bucket', q: 'What happens to the commit message?',
        buckets: ['Message is kept or changed', 'Message disappears'],
        items: [['pick', 0], ['reword', 0], ['squash', 0], ['fixup', 1], ['drop', 1]],
        why: 'fixup melts in silently. drop removes the whole commit.'
      },
      {
        type: 'fill', q: 'Melt "wip" and "typo" into "add login".',
        text: 'pick a1b2c3d add login\n___ c3d4e5f wip\n___ e5f6a7b typo',
        options: ['fixup', 'fixup', 'drop', 'pick', 'edit'],
        answer: ['fixup', 'fixup'],
        hint: 'You want them joined in, without their messages.',
        why: 'fixup joins each commit into the one above and drops its note.'
      },
      {
        type: 'order', q: 'Fix an old commit with autosquash. Put it in order.',
        items: ['Edit the file with the fix', 'git add .', 'git commit --fixup a1b2c3d', 'git rebase -i --autosquash main'],
        why: 'Make the fix, stage it, label it as a fixup, then let autosquash arrange it.'
      },
      {
        type: 'pick', q: 'In the to-do list, how do you change the order of commits?',
        options: ['Move the lines up or down', 'Type reorder', 'Change pick to swap', 'You cannot'],
        answer: 0,
        why: 'The list is replayed top to bottom. Move a line and its commit moves.'
      },
      {
        type: 'pick', q: 'The rebase stopped on an <code>edit</code> line. You changed a file and added it. What next?',
        options: ['git commit --amend, then git rebase --continue', 'git push', 'git rebase --abort', 'git merge'],
        answer: 0,
        why: 'Amend the paused commit, then continue the list.'
      }
    ]
  });

  /* ---------------- l18 Stash ---------------- */
  const pocket = `<svg viewBox="0 0 560 300" role="img" aria-label="Half-done work goes into a pocket called the stash">
    <g transform="translate(30 60)">
      <rect x="4" y="6" width="190" height="150" rx="14" fill="${P.ink}"/><rect width="190" height="150" rx="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
      <text x="95" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="${P.ink2}">your desk</text>
      <rect x="22" y="48" width="66" height="84" rx="6" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.2" transform="rotate(-6 55 90)"/>
      <rect x="100" y="48" width="66" height="84" rx="6" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.2" transform="rotate(5 133 90)"/>
      <text x="95" y="182" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.danger}">half done, not ready to commit</text></g>
    <path d="M240 130 Q290 90 330 130" fill="none" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/><path d="M322 116 l10 15 l-17 4" fill="none" stroke="${P.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="286" y="88" text-anchor="middle" font-size="13" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.accent}">git stash</text>
    <g transform="translate(350 50)">
      <path d="M4 6 h170 v120 q-85 70 -170 0z" fill="${P.ink}"/><path d="M0 0 h170 v120 q-85 70 -170 0z" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
      <path d="M20 22 h130" stroke="${P.white}" stroke-width="3" stroke-dasharray="6 6"/>
      <text x="85" y="88" text-anchor="middle" font-size="20" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.white}">stash</text>
      <text x="85" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="${P.tint}">a safe pocket</text></g></svg>`;
  const stack = `<svg viewBox="0 0 560 290" role="img" aria-label="Stashes stack up. The newest is stash@{0} on top.">
    ${[2, 1, 0].map((n, k) => `<g transform="translate(${80 + k * 14} ${40 + k * 52})"><rect x="4" y="6" width="300" height="70" rx="12" fill="${P.ink}"/><rect width="300" height="70" rx="12" fill="${n === 0 ? P.tint : P.white}" stroke="${P.ink}" stroke-width="2.5"/>
      <text x="18" y="30" font-size="15" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">stash@{${n}}</text>
      <text x="18" y="52" font-size="12.5" font-weight="700" fill="${P.ink2}">${['new header idea', 'half a bug fix', 'colors test'][n]}</text></g>`).join('')}
    <text x="440" y="190" font-size="14" font-weight="800" fill="${P.accent}">newest</text><path d="M436 186 h-30" stroke="${P.accent}" stroke-width="3"/>
    <text x="440" y="86" font-size="14" font-weight="800" fill="${P.mute}">oldest</text></svg>`;
  const popApply = `<svg viewBox="0 0 560 260" role="img" aria-label="Pop takes the stash out of the pocket. Apply copies it and keeps it.">
    ${[0, 1].map(i => `<g transform="translate(${30 + i * 280} 30)"><text x="120" y="10" text-anchor="middle" font-size="16" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">${i ? 'apply' : 'pop'}</text>
      <rect x="30" y="34" width="180" height="70" rx="12" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/><text x="120" y="76" text-anchor="middle" font-size="14" font-weight="800" fill="${P.white}">pocket</text>
      <rect x="70" y="56" width="100" height="34" rx="6" fill="${i ? P.warnT : P.sand}" stroke="${P.ink}" stroke-width="2" stroke-dasharray="${i ? '0' : '5 4'}" opacity="${i ? 1 : .6}"/>
      <path d="M120 112 v40" stroke="${P.ink}" stroke-width="3"/><path d="M110 142 l10 12 l10 -12" fill="none" stroke="${P.ink}" stroke-width="3"/>
      <rect x="70" y="160" width="100" height="34" rx="6" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2"/>
      <text x="120" y="222" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.ink2}">${i ? 'copy out, pocket keeps it' : 'take out, pocket empty'}</text></g>`).join('')}</svg>`;

  COURSE.add({
    id: 'l18', module: 2, minutes: 8,
    title: 'Stash.',
    kicker: 'A pocket for half-done work',
    summary: 'Need to switch tasks but your work is not ready to commit? Put it in the stash pocket, do the other thing, then take it back out.',
    parts: [
      {
        pic: pocket,
        h: 'Put messy work in your pocket.',
        text: ['Your boss says "fix this bug now!" but your files are half changed.', '<b>git stash</b> tucks the changes away. Your folder is clean again, so you can switch branches.'],
        cmds: [{ c: 'git stash', d: 'Save changes to the pocket and clean the folder.' }]
      },
      {
        pic: stack,
        h: 'Stashes stack up.',
        text: ['Each stash goes on top of the pile. The newest is <b>stash@{0}</b>.', 'Give it a message so you remember what it was.'],
        cmds: [
          { c: 'git stash push -m "new header idea"', d: 'Stash with a name.' },
          { c: 'git stash list', d: 'See the whole pile.' },
          { c: 'git stash show -p stash@{0}', d: 'See the changes inside one stash.' }
        ]
      },
      {
        pic: popApply,
        h: 'Take it back out.',
        text: ['<b>pop</b> puts the changes back and removes them from the pocket.', '<b>apply</b> puts them back but keeps a copy in the pocket.'],
        cmds: [
          { c: 'git stash pop', d: 'Bring back the newest stash and remove it.' },
          { c: 'git stash apply stash@{2}', d: 'Bring back stash 2 and keep it in the pile.' }
        ]
      },
      {
        pic: term(['$ git status -s', ' M app.js', '?? notes.txt', '$ git stash', '# app.js stashed, notes.txt left behind', '$ git stash -u', '# both stashed'], 'new files'),
        h: 'New files need a flag.',
        text: ['Plain stash only takes files Git already tracks. New, untracked files stay behind.', '<b>-u</b> takes untracked files too. <b>-a</b> takes everything, even ignored files.'],
        cmds: [
          { c: 'git stash -u', d: 'Also stash new untracked files.' },
          { c: 'git stash -a', d: 'Stash all files, even ignored ones.' },
          { c: 'git stash push index.html', d: 'Stash only one file.' }
        ]
      },
      {
        pic: term(['$ git stash drop stash@{1}', 'Dropped stash@{1}', '$ git stash branch fix-later', 'Switched to a new branch fix-later', '$ git stash clear'], 'tidy up'),
        h: 'Tidy the pocket.',
        text: ['Drop one stash you do not need. Or turn a stash into its own branch.', '<b>clear</b> empties the whole pocket.'],
        cmds: [
          { c: 'git stash drop stash@{1}', d: 'Delete one stash.' },
          { c: 'git stash branch fix-later', d: 'Make a new branch with the stash applied.' },
          { c: 'git stash clear', d: 'Delete every stash.' }
        ],
        warn: '<code>git stash clear</code> cannot be undone the easy way. List first.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'When is stash the right tool?',
        options: ['You must switch tasks but your work is not ready to commit', 'You want to share work online', 'You want to delete a branch', 'You want to see history'],
        answer: 0,
        why: 'Stash is a temporary pocket for unfinished work.'
      },
      {
        type: 'order', q: 'Pause your work to fix a bug on main. Put it in order.',
        items: ['git stash', 'git switch main', 'Fix the bug and commit', 'git switch feature', 'git stash pop'],
        why: 'Pocket it, go fix, come back, take it out.'
      },
      {
        type: 'bucket', q: 'Pop or apply?',
        buckets: ['git stash pop', 'git stash apply'],
        items: [['Removes it from the pile', 0], ['The usual choice', 0], ['Keeps a copy in the pile', 1], ['Good for using one stash on two branches', 1]],
        why: 'pop takes it out. apply copies it out.'
      },
      {
        type: 'match', q: 'Match each stash command.',
        pairs: [['git stash list', 'See every stash'], ['git stash -u', 'Include new untracked files'], ['git stash drop stash@{1}', 'Delete one stash'], ['git stash clear', 'Delete all stashes'], ['git stash branch fix-later', 'Turn a stash into a branch']],
        why: 'You now know the whole stash family.'
      },
      {
        type: 'fill', q: 'Stash with a note, then look at the pile.',
        text: 'git stash ___ -m "header idea"\ngit stash ___',
        options: ['push', 'list', 'pop', 'show', 'save-me'],
        answer: ['push', 'list'],
        why: 'push -m names the stash. list shows the pile.'
      },
      {
        type: 'type', q: 'Bring back the newest stash and remove it from the pile.',
        answers: ['git stash pop'],
        why: 'git stash pop restores and deletes the newest stash.'
      },
      {
        type: 'pick', q: 'You stashed, but your new file <code>notes.txt</code> is still in the folder. Why?',
        options: ['Plain stash skips untracked files. Use -u.', 'Git is broken', 'The file is too small', 'You need to push first'],
        answer: 0,
        why: 'Untracked files need git stash -u.'
      }
    ]
  });

  /* ---------------- l19 Cherry-pick and tags ---------------- */
  const cherry = graph({
    label: 'Cherry-pick copies commit D from feature onto main as D prime',
    lanes: ['main', 'feature'],
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'C', lane: 1, parents: ['B'] }, { id: 'D', lane: 1, parents: ['C'] }, { id: 'E', lane: 1, parents: ['D'] }, { id: "D'", parents: ['B'], hi: true, x: 5 }],
    refs: { main: "D'", feature: 'E' }, head: 'main'
  });
  const tags = graph({
    label: 'Tags v1.0 and v1.1 are labels that never move',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'], hi: true }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'], hi: true }, { id: 'E', parents: ['D'] }],
    refs: { 'v1.0': 'B', 'v1.1': 'D', main: 'E' }, head: 'main'
  });
  const visit = graph({
    label: 'HEAD visits tag v1.0 in detached mode',
    commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'], hi: true }, { id: 'C', parents: ['B'] }, { id: 'D', parents: ['C'] }],
    refs: { 'v1.0': 'B', main: 'D' }, head: 'B'
  });
  const semver = `<svg viewBox="0 0 560 280" role="img" aria-label="Version 2.4.1 means major 2, minor 4, patch 1">
    ${[['2', 'MAJOR', 'breaks old stuff', P.dangerT, P.danger], ['4', 'MINOR', 'new feature', P.okT, P.ok], ['1', 'PATCH', 'bug fix', P.tint, P.accent]].map(([n, l, d, f, c], i) => `<g transform="translate(${40 + i * 170} 40)">
      <rect x="4" y="6" width="140" height="130" rx="18" fill="${P.ink}"/><rect width="140" height="130" rx="18" fill="${f}" stroke="${P.ink}" stroke-width="2.5"/>
      <text x="70" y="94" text-anchor="middle" font-size="76" font-weight="800" font-family="Fraunces, Georgia, serif" fill="${P.ink}">${n}</text>
      <text x="70" y="170" text-anchor="middle" font-size="14" font-weight="800" letter-spacing="1.5" fill="${c}">${l}</text>
      <text x="70" y="192" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.ink2}">${d}</text></g>`).join('')}
    <circle cx="197" cy="150" r="6" fill="${P.ink}"/><circle cx="367" cy="150" r="6" fill="${P.ink}"/>
    <text x="280" y="262" text-anchor="middle" font-size="14" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink2}">tag: v2.4.1</text></svg>`;

  COURSE.add({
    id: 'l19', module: 2, minutes: 10,
    title: 'Cherry-pick and tags.',
    kicker: 'Copy one commit, label a release',
    summary: 'Cherry-pick copies one single commit onto your branch. A tag is a name that marks a special commit forever, like v1.0.',
    parts: [
      {
        pic: cherry,
        h: 'Cherry-pick one commit.',
        text: ['You want only commit <b>D</b> from feature, not the whole branch.', 'Cherry-pick makes a copy, <b>D\'</b>, on the branch you are on.'],
        cmds: [
          { c: 'git cherry-pick 41be9f2', d: 'Copy that one commit onto my branch.' },
          { c: 'git cherry-pick -x 41be9f2', d: 'Copy it and note where it came from in the message.' }
        ]
      },
      {
        pic: term(['$ git cherry-pick -n 41be9f2', '# changes staged, not committed', '$ git cherry-pick a1b2c3d..f7a8b9c', '# copies the commits after a1b2c3d, up to f7a8b9c', '$ git cherry-pick --continue'], 'more picks'),
        h: 'More ways to pick.',
        text: ['<b>-n</b> brings the changes in without committing, so you can tweak them.', 'A range <b>A..B</b> copies many commits. Conflicts work just like merge.'],
        cmds: [
          { c: 'git cherry-pick -n 41be9f2', d: 'Bring the changes in, but do not commit. Same as --no-commit.' },
          { c: 'git cherry-pick a1b2c3d..f7a8b9c', d: 'Copy every commit after the first, up to the second.' },
          { c: 'git cherry-pick --continue', d: 'Fixed a conflict. Go on.' },
          { c: 'git cherry-pick --abort', d: 'Stop and go back.' }
        ]
      },
      {
        pic: tags,
        h: 'Tags mark special moments.',
        text: ['A branch note moves with every commit. A <b>tag</b> stays put forever.', 'Use tags for releases. A <b>lightweight</b> tag is just a name. An <b>annotated</b> tag also saves who, when, and a message.'],
        cmds: [
          { c: 'git tag v1.0', d: 'Lightweight tag on the current commit.' },
          { c: 'git tag -a v1.0 -m "First release"', d: 'Annotated tag with a message. Best for releases.' },
          { c: 'git tag v0.9 3a7b1d4', d: 'Tag an older commit.' },
          { c: 'git tag', d: 'List all tags.' },
          { c: 'git tag -l "v1.*"', d: 'List tags that match a pattern.' },
          { c: 'git show v1.0', d: 'Show the tag and its commit.' }
        ]
      },
      {
        pic: term(['$ git push origin v1.0', ' * [new tag]  v1.0 -> v1.0', '$ git push --follow-tags', '$ git tag -d v1.0', '$ git push origin --delete v1.0'], 'share tags'),
        h: 'Tags do not travel by themselves.',
        text: ['A normal push does not send tags. You push them on purpose.', 'Deleting a tag is two steps: on your computer, then on GitHub.'],
        cmds: [
          { c: 'git push origin v1.0', d: 'Send one tag to GitHub.' },
          { c: 'git push --tags', d: 'Send every tag.' },
          { c: 'git push --follow-tags', d: 'Push commits plus their annotated tags.' },
          { c: 'git tag -d v1.0', d: 'Delete the tag on your computer.' },
          { c: 'git push origin --delete v1.0', d: 'Delete the tag on GitHub.' }
        ]
      },
      {
        pic: visit,
        h: 'Visit an old release.',
        text: ['You can look at the code exactly as it was at v1.0. HEAD sits on the commit, not on a branch. That is <b>detached HEAD</b>.', '<b>git describe</b> names where you are, like <b>v1.0-2-g41be9f2</b>: two commits after v1.0.'],
        cmds: [
          { c: 'git switch --detach v1.0', d: 'Go look at the code at tag v1.0.' },
          { c: 'git checkout v1.0', d: 'The older way to do the same.' },
          { c: 'git describe', d: 'Name this commit using the nearest tag.' }
        ],
        tip: 'Just looking? Fine. Want to make changes? Create a branch first with <code>git switch -c hotfix</code>.'
      },
      {
        pic: semver,
        h: 'Version numbers have a meaning.',
        text: ['Most projects use <b>semantic versioning</b>: MAJOR.MINOR.PATCH.', 'Fix a bug: bump PATCH. Add a feature: bump MINOR. Break old behavior: bump MAJOR.']
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does <code>git cherry-pick 41be9f2</code> do?',
        options: ['Copies that one commit onto the branch you are on', 'Merges the whole branch', 'Deletes the commit', 'Tags the commit'],
        answer: 0,
        why: 'Cherry-pick copies exactly one commit as a new commit.'
      },
      {
        type: 'bucket', q: 'Branch or tag?',
        buckets: ['Branch', 'Tag'],
        items: [['Moves forward with each commit', 0], ['Where you do new work', 0], ['Never moves', 1], ['Marks a release like v2.0', 1], ['Must be pushed on purpose', 1]],
        why: 'Branches move, tags stay.'
      },
      {
        type: 'match', q: 'Match each tag command.',
        pairs: [['git tag -a v1.0 -m "First"', 'Make an annotated tag'], ['git tag -l "v1.*"', 'List matching tags'], ['git push origin v1.0', 'Send a tag to GitHub'], ['git tag -d v1.0', 'Delete a tag locally'], ['git push origin --delete v1.0', 'Delete a tag on GitHub']],
        why: 'Make, list, share, delete.'
      },
      {
        type: 'order', q: 'Release version 1.0. Put it in order.',
        items: ['Commit the last fix', 'git tag -a v1.0 -m "First release"', 'git push origin main', 'git push origin v1.0'],
        why: 'Commit, tag it, push the branch, push the tag.'
      },
      {
        type: 'fill', q: 'Copy a commit and record where it came from.',
        text: 'git ___ -x 41be9f2',
        options: ['cherry-pick', 'merge', 'tag', 'rebase'],
        answer: ['cherry-pick'],
        why: 'cherry-pick -x adds "cherry picked from commit ..." to the message.'
      },
      {
        type: 'type', q: 'Make an <b>annotated</b> tag <code>v2.0</code> with the message <code>Big update</code>.',
        answers: ['git tag -a v2.0 -m "Big update"', 'git tag v2.0 -a -m "Big update"', 'git tag -am "Big update" v2.0'],
        hint: 'git tag, the annotate flag, the name, then -m and the message in quotes.',
        why: 'git tag -a v2.0 -m "Big update" stores who, when, and the message.'
      },
      {
        type: 'pick', q: 'The app is at <b>1.4.2</b>. You add a new feature without breaking anything. What is next?',
        options: ['1.5.0', '1.4.3', '2.0.0', '1.4.2.1'],
        answer: 0, hints: { 1: 'That is for a bug fix.', 2: 'That is for breaking changes.' },
        why: 'A new feature bumps MINOR and resets PATCH to 0.'
      },
      {
        type: 'pick', q: 'You run <code>git push</code>. Do your tags go to GitHub too?',
        options: ['No, push tags with git push origin v1.0 or --tags', 'Yes, always', 'Only lightweight tags', 'Only on Fridays'],
        answer: 0,
        why: 'Tags travel only when you push them, or with --follow-tags.'
      }
    ]
  });
})();
