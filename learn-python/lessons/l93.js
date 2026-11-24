/* Lesson 93: Git for Python projects (module 8). One file per lesson.
   Every git output was captured on 2026-11-23 in a throwaway repo (git 2.50.1, Apple Git-155),
   with Python 3.15.2 making the .venv and __pycache__. Commit dates were fixed, so the short hashes are real.
   The Run boxes were checked with Python 3.14.4 and in this page (Pyodide, Python 3.14).
   git does not run in the browser, so git is shown as terminal pictures. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l93  Git for Python projects
     ===================================================================== */

  const stack = (...pics) => `<div style="width:100%;min-width:0">${pics.join('')}</div>`;
  const GH = (id, text) => `<a href="../learn-github/#${id}">${text}</a>`;

  // A small sheet of paper with a folded corner and a file name on it.
  const page = (x, y, name, col) =>
    `<path d="M${x} ${y} h70 l16 16 v62 h-86 z" fill="${P.white}" stroke="${col || P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M${x + 70} ${y} v16 h16" fill="none" stroke="${col || P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(x + 43, y + 50, name, { s: 11, m: true, f: col || P.ink });
  // A stamp on the notebook timeline: a filled circle, the day, the message and the short hash.
  const stamp = (x, day, msg, hash, ghost) =>
    (ghost
      ? `<circle cx="${x}" cy="250" r="22" fill="${P.paper2}" stroke="${P.mute}" stroke-width="2.5" stroke-dasharray="6 6"/>`
      : `<circle cx="${x}" cy="250" r="22" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/><path d="M${x - 9} 251 l6 7 l12 -14" fill="none" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`) +
    T(x, 216, day, { s: 13, f: ghost ? P.mute : P.ink }) +
    T(x, 296, msg, { s: 12.5, w: 700, f: ghost ? P.mute : P.ink }) +
    T(x, 316, hash, { s: 12, m: true, f: ghost ? P.mute : P.accent });

  /* ---- The idea: folder, tray, notebook; and a timeline of save points ---- */
  const ideaSvg = svg(600, 330, 'Top: your folder of files, then git add puts changed pages on a tray, the staging area, then git commit stamps them into the notebook, the history. Bottom: a timeline of save points. Wednesday: Start Kitchen Coach, 276bfac. Thursday: Add a taste test for Ben, a5e5ef3. Friday: a dashed circle, not saved yet.',
    box(14, 20, 168, 140, P.white, 14) + T(98, 46, 'your folder', { s: 14 }) +
    T(98, 76, 'coach.py', { s: 12, m: true, f: P.ink2 }) + T(98, 98, 'meal_planner.py', { s: 12, m: true, f: P.ink2 }) +
    T(98, 120, 'tests/', { s: 12, m: true, f: P.ink2 }) + T(98, 142, 'requirements.txt', { s: 12, m: true, f: P.ink2 }) +
    arrow(188, 90, 230, 90, P.accent, 3) + T(209, 74, 'git add', { s: 12, m: true, f: P.accent }) +
    box(236, 20, 140, 140, P.tint, 14) + T(306, 46, 'the tray', { s: 14, f: P.accent }) +
    `<rect x="256" y="112" width="100" height="12" rx="4" fill="${P.ink}"/>` +
    `<rect x="270" y="66" width="34" height="44" rx="3" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/><rect x="296" y="60" width="34" height="50" rx="3" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    T(306, 148, 'staging area', { s: 12, w: 700, f: P.ink2 }) +
    arrow(382, 90, 424, 90, P.accent, 3) + T(403, 74, 'commit', { s: 12, m: true, f: P.accent }) +
    box(430, 20, 156, 140, P.warnT, 14) + T(508, 46, 'the notebook', { s: 14, f: P.warn }) +
    `<circle cx="480" cy="92" r="16" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="536" cy="92" r="16" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(508, 148, 'history', { s: 12, w: 700, f: P.ink2 }) +
    `<line x1="40" y1="250" x2="560" y2="250" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    stamp(110, 'Wed', 'Start Kitchen Coach', '276bfac') +
    stamp(300, 'Thu', 'Add a taste test for Ben', 'a5e5ef3') +
    stamp(490, 'Fri', 'not saved yet', 'your changes', true));
  const setupTerm = term([
    '$ git --version',
    'git version 2.50.1 (Apple Git-155)',
    '$ cd kitchen-coach',
    '$ git init',
    'Initialized empty Git repository in /Users/you/kitchen-coach/.git/'
  ], 'terminal, in the Kitchen Coach folder');
  const ideaPic = stack(ideaSvg, setupTerm);

  /* ---- The code: status, add, commit, log ---- */
  const firstCommit = [
    '$ git status',
    'On branch main',
    '',
    'No commits yet',
    '',
    'Untracked files:',
    '  (use "git add <file>..." to include in what will be committed)',
    '\t.env',
    '\tREADME.md',
    '\t__pycache__/',
    '\tcoach.py',
    '\tmeal_planner.py',
    '\trequirements.txt',
    '\ttests/',
    '',
    'nothing added to commit but untracked files present (use "git add" to track)',
    '$ git add .',
    '$ git commit -m "Start Kitchen Coach"',
    '[main (root-commit) e78a8e6] Start Kitchen Coach',
    ' 7 files changed, 26 insertions(+)',
    ' create mode 100644 .env',
    ' create mode 100644 README.md',
    ' create mode 100644 __pycache__/meal_planner.cpython-315.pyc',
    ' create mode 100644 coach.py',
    ' create mode 100644 meal_planner.py',
    ' create mode 100644 requirements.txt',
    ' create mode 100644 tests/test_coach.py',
    '$ git log --oneline',
    'e78a8e6 Start Kitchen Coach'
  ].map(l => l.replace(/\t/g, '        '));
  const codePic = stack(term(firstCommit, 'terminal: the first save point, with no .gitignore yet'));

  /* ---- The pain: the key, the scraps, and (with an older venv) 900 files ---- */
  const traySvg = svg(600, 170, 'On the tray, next to the code pages: a crate labelled .venv with 897 files, a key card labelled .env with the secret key, and a scrap labelled __pycache__. All three are marked: should not be here.',
    `<rect x="20" y="128" width="560" height="14" rx="5" fill="${P.ink}"/>` +
    page(30, 40, 'coach.py') + page(128, 40, 'tests/') +
    `<rect x="236" y="24" width="150" height="100" rx="8" fill="${P.warnT}" stroke="${P.danger}" stroke-width="3"/>` +
    `<path d="M236 58 h150 M236 92 h150 M286 24 v100 M336 24 v100" stroke="${P.warn}" stroke-width="2"/>` +
    `<rect x="250" y="50" width="122" height="44" rx="6" fill="${P.white}" stroke="${P.danger}" stroke-width="2"/>` +
    T(311, 70, '.venv', { s: 15, m: true, f: P.danger }) + T(311, 88, '897 files', { s: 11.5, w: 800, f: P.danger }) +
    box(400, 52, 92, 66, P.dangerT, 10) +
    `<circle cx="424" cy="78" r="10" fill="none" stroke="${P.danger}" stroke-width="3"/><path d="M434 78 h40 m-10 0 v10 m-10 -10 v7" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
    T(446, 108, '.env', { s: 13, m: true, f: P.danger }) +
    `<path d="M508 76 l20 -8 l16 6 l22 -6 l-6 22 l8 20 l-24 4 l-18 -6 l-14 4 z" fill="${P.sand}" stroke="${P.danger}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(536, 128 - 34, '.pyc', { s: 11, m: true, f: P.danger }) +
    T(300, 164, 'git add . put everything on the tray. Three of them should not be there.', { s: 12.5, w: 700, f: P.danger }));
  const leakTerm = term([
    '$ git show e78a8e6:.env',
    'KITCHEN_API_KEY=not-a-real-key'
  ], 'terminal: anyone with a copy can read the old save point');
  const oldVenvTerm = term([
    '# the same folder, with a .venv made the old way (before Python 3.13):',
    '$ git add .',
    '$ git commit -m "Start Kitchen Coach"',
    '[main (root-commit) 9beabd6] Start Kitchen Coach',
    ' 904 files changed, 143324 insertions(+)',
    ' create mode 100644 .env',
    ' create mode 100644 .venv/bin/Activate.ps1',
    ' create mode 100644 .venv/bin/activate',
    '# ... 895 more .venv lines ...',
    ' create mode 100644 README.md',
    ' create mode 100644 __pycache__/meal_planner.cpython-315.pyc'
  ], 'terminal: 897 of the 904 files are the venv');
  const painPic = stack(traySvg, leakTerm, oldVenvTerm);

  /* ---- The fix: a .gitignore, then status before and after, and a sorter to play with ---- */
  const gitignore = [
    '# the kitchen: rebuild it from requirements.txt',
    '.venv/',
    '',
    "# Python's own scraps",
    '__pycache__/',
    '*.pyc',
    '',
    '# tool caches',
    '.pytest_cache/',
    '.ruff_cache/',
    '.mypy_cache/',
    '',
    '# secrets: never commit these',
    '.env'
  ];
  const afterTerm = term([
    '$ git status',
    'On branch main',
    '',
    'No commits yet',
    '',
    'Untracked files:',
    '  (use "git add <file>..." to include in what will be committed)',
    '        .gitignore',
    '        README.md',
    '        coach.py',
    '        meal_planner.py',
    '        requirements.txt',
    '        tests/',
    '',
    'nothing added to commit but untracked files present (use "git add" to track)',
    '$ git add .',
    '$ git commit -m "Start Kitchen Coach"',
    '[main (root-commit) 276bfac] Start Kitchen Coach',
    ' 6 files changed, 39 insertions(+)',
    ' create mode 100644 .gitignore',
    ' create mode 100644 README.md',
    ' create mode 100644 coach.py',
    ' create mode 100644 meal_planner.py',
    ' create mode 100644 requirements.txt',
    ' create mode 100644 tests/test_coach.py',
    '$ git status --ignored',
    'On branch main',
    'Ignored files:',
    '  (use "git add -f <file>..." to include in what will be committed)',
    '        .env',
    '        .venv/',
    '        __pycache__/',
    '',
    'nothing to commit, working tree clean'
  ], 'terminal: a new Kitchen Coach folder, with the .gitignore in it');

  const sorterFiles = {
    'coach.py': 'from meal_planner import plan_day\n\nfor guest in ["Ana", "Ben", "Chloe"]:\n    print(guest, plan_day(guest))\n',
    'meal_planner.py': '"""Kitchen Coach: how many kcal each guest eats in a day."""\n',
    'tests/test_coach.py': 'from meal_planner import plan_day\n',
    'requirements.txt': 'pytest==9.2.0\n',
    'README.md': '# Kitchen Coach\n',
    '.gitignore': '.venv/\n__pycache__/\n*.pyc\n',
    '.env': 'KITCHEN_API_KEY=not-a-real-key\n',
    '.venv/pyvenv.cfg': 'version = 3.15.2\n',
    '.venv/lib/python3.15/site-packages/pytest/__init__.py': '# pytest lives here\n',
    '__pycache__/meal_planner.cpython-315.pyc': 'compiled bytes\n',
    'tests/__pycache__/test_coach.cpython-315-pytest-9.2.0.pyc': 'compiled bytes\n',
    '.pytest_cache/v/cache/lastfailed': '{}\n'
  };
  const sorterHead = [
    'from fnmatch import fnmatch',
    'from pathlib import Path',
    ''
  ];
  const sorterBody = [
    '',
    '',
    'def is_ignored(path, rules):',
    '    for rule in rules:',
    '        if rule.endswith("/"):                  # a folder rule, like .venv/',
    '            if rule[:-1] in path.parts[:-1]:',
    '                return True',
    '        elif any(fnmatch(part, rule) for part in path.parts):',
    '            return True',
    '    return False',
    '',
    '',
    'rules = [line for line in GITIGNORE.splitlines() if line and not line.startswith("#")]',
    'for path in sorted(Path(".").glob("**/*")):',
    '    if path.is_file():',
    '        print("ignore" if is_ignored(path, rules) else "COMMIT", path)',
    '',
    'if not is_ignored(Path(".env"), rules):',
    '    print("\\nWARNING: .env holds a secret key, and it would be committed!")'
  ];
  const sorter = sorterHead.concat(['GITIGNORE = """', '.venv/', '__pycache__/', '*.pyc', '"""'], sorterBody);
  const fixPic = stack(code(gitignore, { title: '.gitignore', good: [2, 5, 14] }), afterTerm,
    run(sorter, { title: 'which_files.py', files: sorterFiles }));

  /* ---- Try it: Thursday's save point, Friday's bad change, git diff, git restore ---- */
  const thursday = term([
    '$ git status',
    'On branch main',
    'Changes not staged for commit:',
    '  (use "git add <file>..." to update what will be committed)',
    '  (use "git restore <file>..." to discard changes in working directory)',
    '        modified:   tests/test_coach.py',
    '',
    'no changes added to commit (use "git add" and/or "git commit -a")',
    '$ git diff',
    'diff --git a/tests/test_coach.py b/tests/test_coach.py',
    'index fa8b8af..1e814e2 100644',
    '--- a/tests/test_coach.py',
    '+++ b/tests/test_coach.py',
    '@@ -3,3 +3,7 @@ from meal_planner import plan_day',
    ' ',
    ' def test_ana():',
    '     assert plan_day("Ana") == "2600 kcal in 4 meals, 650 kcal each"',
    '+',
    '+',
    '+def test_ben():',
    '+    assert plan_day("Ben") == "2800 kcal in 4 meals, 700 kcal each"',
    '$ git add tests/test_coach.py',
    '$ git commit -m "Add a taste test for Ben"',
    '[main a5e5ef3] Add a taste test for Ben',
    ' 1 file changed, 4 insertions(+)',
    '$ git log --oneline',
    'a5e5ef3 Add a taste test for Ben',
    '276bfac Start Kitchen Coach'
  ], 'terminal, Thursday: look, then save');
  const friday = term([
    '$ python3 coach.py',
    'Ana 260 kcal in 4 meals, 65 kcal each',
    'Ben 2800 kcal in 4 meals, 700 kcal each',
    'Chloe 2000 kcal in 4 meals, 500 kcal each',
    '$ git diff',
    'diff --git a/meal_planner.py b/meal_planner.py',
    'index 7843039..66f13ac 100644',
    '--- a/meal_planner.py',
    '+++ b/meal_planner.py',
    '@@ -1,6 +1,6 @@',
    ' """Kitchen Coach: how many kcal each guest eats in a day."""',
    ' ',
    '-DAILY_KCAL = {"Ana": 2600, "Ben": 2800, "Chloe": 2000}',
    '+DAILY_KCAL = {"Ana": 260, "Ben": 2800, "Chloe": 2000}',
    ' ',
    ' ',
    ' def plan_day(guest: str) -> str:',
    '$ git restore meal_planner.py',
    '$ git status',
    'On branch main',
    'nothing to commit, working tree clean',
    '$ python3 coach.py',
    'Ana 2600 kcal in 4 meals, 650 kcal each',
    'Ben 2800 kcal in 4 meals, 700 kcal each',
    'Chloe 2000 kcal in 4 meals, 500 kcal each'
  ], 'terminal, Friday: something is wrong. What changed?');
  const diffSvg = svg(600, 130, 'How to read the diff. The line with a minus, in red, is how it was at the last save point: Ana 2600. The line with a plus, in green, is how the file is now: Ana 260. One zero went missing.',
    `<rect x="14" y="14" width="572" height="40" rx="8" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2.5"/>` +
    T(26, 40, '-DAILY_KCAL = {"Ana": 2600, "Ben": 2800, ...}', { s: 14, m: true, a: 'start', f: P.danger }) +
    T(574, 40, 'last save point', { s: 12, a: 'end', f: P.danger }) +
    `<rect x="14" y="64" width="572" height="40" rx="8" fill="${P.okT}" stroke="${P.ok}" stroke-width="2.5"/>` +
    T(26, 90, '+DAILY_KCAL = {"Ana": 260, "Ben": 2800, ...}', { s: 14, m: true, a: 'start', f: P.ok }) +
    T(574, 90, 'your file now', { s: 12, a: 'end', f: P.ok }) +
    T(300, 124, 'git shows - lines in red and + lines in green', { s: 12.5, w: 700, f: P.ink2 }));
  const tryPic = stack(thursday, friday, diffSvg);

  /* ---- The catch: .gitignore is not an eraser; secrets live in the environment ---- */
  const secretCode = [
    'import os',
    'from pathlib import Path',
    '',
    '# 1. What a .env loader does: copy each NAME=value line into the environment.',
    'for line in Path(".env").read_text().splitlines():',
    '    if "=" in line and not line.startswith("#"):',
    '        name, value = line.split("=", 1)',
    '        os.environ[name] = value',
    '',
    '# 2. Kitchen Coach only asks the environment. The key is never in the code.',
    'key = os.environ.get("KITCHEN_API_KEY")',
    'if key is None:',
    '    print("No key found. Kitchen Coach plans meals offline.")',
    'else:',
    '    print(f"Key loaded: {key[:4]}... ({len(key)} characters)")',
    '    print("Fetching today\'s recipes for Ana, Ben and Chloe.")'
  ];
  const secretFiles = {
    '.env': '# never commit this file\nKITCHEN_API_KEY=not-a-real-key\n',
    '.env.example': '# copy me to .env and put your own key in\nKITCHEN_API_KEY=\n'
  };
  const untrack = term([
    '# .env was committed before the .gitignore existed:',
    '$ git status --short',
    '?? .gitignore',
    '$ git rm -r --cached .env __pycache__',
    "rm '.env'",
    "rm '__pycache__/meal_planner.cpython-315.pyc'",
    '$ git add .gitignore',
    '$ git commit -m "Ignore .env and Python scraps"',
    '[main 5dc7a24] Ignore .env and Python scraps',
    ' 3 files changed, 7 insertions(+), 1 deletion(-)',
    ' delete mode 100644 .env',
    ' create mode 100644 .gitignore',
    ' delete mode 100644 __pycache__/meal_planner.cpython-315.pyc',
    '$ git show e78a8e6:.env',
    'KITCHEN_API_KEY=not-a-real-key'
  ], 'terminal: stop tracking it. The old save point still has it.');
  const catchPic = stack(untrack, run(secretCode, { title: 'secret.py', files: secretFiles }));

  COURSE.add({
    id: 'l93', minutes: 14,
    summary: '<b>Git</b> keeps <b>save points</b> for a whole project folder. Each save point is a <b>commit</b>: a snapshot of your files with a short message. Once per project: <code>git init</code>. Then the loop: <code>git status</code> (what changed?), <code>git diff</code> (exactly which lines?), <code>git add</code> (put the pages on the <b>tray</b>, the staging area), <code>git commit -m "Add a taste test for Ben"</code> (stamp them), <code>git log --oneline</code> (the list of save points). Broke a file you have not committed? <code>git restore meal_planner.py</code> brings back the last saved version. A Python project needs a <b>.gitignore</b> file before the first commit: <code>.venv/</code> (big, built for one computer, rebuilt from requirements.txt), <code>__pycache__/</code> and <code>*.pyc</code> (Python\'s scraps), <code>.pytest_cache/</code>, <code>.ruff_cache/</code>, <code>.mypy_cache/</code>, and <code>.env</code> (secrets). Commit the code, the tests, <code>requirements.txt</code>, the README and the .gitignore. Keep keys out of code: read them with <code>os.environ.get("KITCHEN_API_KEY")</code>. <code>.gitignore</code> does not remove a file git already saved, and a key that was ever committed is leaked: make a new one. The Learn GitHub course goes deeper.',
    video: {
      src: 'videos/l93-git-for-python-projects.mp4', poster: 'videos/l93-git-for-python-projects.jpg', length: '1 min 6 s',
      script: [
        'Kitchen Coach lives in a folder. Git keeps save points for it, like stamps in a recipe notebook.',
        'Git add puts your pages on a tray. Git commit stamps them as one save point, with a short message.',
        'But git add dot grabs everything. The dot venv kitchen, almost 900 files, built for one computer. And dot env, with your secret key.',
        'So write a dot git ignore file first. The venv is turned away, and the key stays locked out. Your code, tests and requirements get the stamp.',
        "Then, on Friday, Ana's plan drops to 260 calories. Git diff shows what changed since the last save point. In red, 2600. In green, 260. One lost zero.",
        "Git restore rewinds the file to Thursday's save point, and Ana is back to 2600.",
        'Commit small save points. Ignore what can be rebuilt, or must stay secret.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Save points for the whole folder.',
        text: [
          'Kitchen Coach is now a real project folder: <code>coach.py</code>, <code>meal_planner.py</code>, a <code>tests</code> folder (lesson 89), <code>requirements.txt</code> (lesson 91). Every day you change something. Some days you break something. You want to go back to <b>Thursday</b>, when it worked.',
          '<b>Git</b> is a tool that keeps <b>save points</b> for a folder, like dated stamps in a recipe notebook. Each save point is called a <b>commit</b>. It remembers every file exactly as it was, with a short message that says what you changed. The folder plus its notebook is called a <b>repository</b>, or <b>repo</b>.',
          'Saving happens in two steps. <code>git add</code> puts the pages you changed on a <b>tray</b> (git calls it the <b>staging area</b>). <code>git commit</code> stamps everything on the tray as one save point. The tray lets you choose what goes into each save point.',
          'Git is a program you run in the terminal, not a Python module. <code>git --version</code> checks that it is there. <code>git init</code> turns the folder into a repo, once. It makes a hidden <code>.git</code> folder: that is the notebook. Never edit it by hand.'
        ],
        tip: 'First time with git? Before your first commit, git needs your name and email, set once per computer. ' + GH('l04', 'Learn GitHub, lesson 4: Set up Git') + ' shows it step by step, on a Mac and on Windows. That whole course goes deeper into git than this lesson. Here you learn what a <b>Python</b> project needs.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'status, add, commit, log.',
        text: [
          '<code>git status</code> is the question you ask most: what does git see? In a new repo, every file is <b>untracked</b>: git sees it, but has never saved it.',
          '<code>git add .</code> puts <b>everything</b> in the folder on the tray. The dot means "this folder". You can also name files: <code>git add coach.py</code>.',
          '<code>git commit -m "Start Kitchen Coach"</code> stamps the tray. <code>-m</code> is the message. Write it like an order: <b>Add</b>, <b>Fix</b>, <b>Remove</b>, and say what changed. git answers with a short <b>hash</b>, <code>e78a8e6</code>: the save point\'s own name. Yours will be different.',
          '<code>git log --oneline</code> lists the save points, newest first, one per line. It worked. But read the list of 7 files that went in. Three of them should never be there.'
        ],
        tip: 'Press <b>q</b> if <code>git log</code> or <code>git diff</code> fills the screen and waits. That is the pager, the same one <code>help()</code> uses (lesson 61).'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'git add . grabbed the key, the scraps and the kitchen.',
        text: [
          '<code>.env</code> holds Kitchen Coach\'s <b>secret key</b> for a recipe website. It is now inside a save point. Delete the file tomorrow and the old save point still has it: <code>git show e78a8e6:.env</code> prints it. Push the repo to GitHub, and anyone who can see it can use your key. (This key is fake. Robots scan public repos for real keys all day, and often find one within minutes.)',
          '<code>__pycache__/</code> is a folder Python makes by itself when you import a module. It holds <code>.pyc</code> files, Python\'s pre-chopped version of your code for one Python version. It changes whenever the code changes, and fills every save point with noise.',
          'The <code>.venv</code> is not in the list only because Python 3.13 and newer put a tiny file inside each new venv that tells git "skip me". A venv made the old way, or by another tool, goes in: <b>904 files</b> in one commit, 897 of them the venv. It only works on your computer anyway. Lesson 91: share <code>requirements.txt</code>, not the kitchen.'
        ],
        warn: 'Never commit a real key, password or token, not even "just for now". Taking it out later does not remove it from the older save points.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Write the .gitignore first.',
        text: [
          'A file called <code>.gitignore</code> in the project folder lists what git must skip. One rule per line, <code>#</code> for a comment. A rule that ends in <code>/</code> is a <b>folder</b>, anywhere in the project. <code>*</code> means "any letters", as in lesson 58\'s <code>glob</code>. A plain name like <code>.env</code> matches that one name.',
          'Make it <b>before</b> the first commit. Now <code>git status</code> lists only what belongs: the code, the tests, <code>requirements.txt</code>, the README, and the <code>.gitignore</code> itself, so everyone who copies the repo skips the same things. <code>git status --ignored</code> shows what was skipped. pytest, Ruff and mypy also hide their own caches, but one line each costs nothing and also covers older versions.',
          'Press <b>Run</b> on <b>which_files.py</b>. It sorts the folder the way git would, using <code>fnmatch</code>, a standard module that checks a name against a pattern with <code>*</code>. Its rules forgot two things: the secret, and pytest\'s cache. Add <code>.env</code> and <code>.pytest_cache/</code> as new lines inside the <code>"""</code>, and run it again until the warning is gone.'
        ],
        tip: 'GitHub keeps a ready-made <code>Python.gitignore</code> with every rule a Python project might need. It is long. The 7 rules here cover a normal project. ' + GH('l10', 'Learn GitHub, lesson 10: Ignore the junk') + ' covers patterns like <code>!keep.txt</code> and <code>/build/</code>.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Look before you save. Go back when it breaks.',
        text: [
          '<b>Thursday.</b> You add a taste test for Ben. <code>git status</code> says <code>modified: tests/test_coach.py</code>. <code>git diff</code> shows <b>exactly</b> which lines changed since the last save point: lines starting with <code>+</code> are new, lines with <code>-</code> are gone. It looks right, so <code>add</code>, <code>commit</code>, and the log has 2 save points.',
          '<b>Friday.</b> You tidy the planner, late and tired. Kitchen Coach now says Ana eats <b>260 kcal</b> a day, 65 kcal a meal. She is training for a half-marathon. <code>git diff</code> finds it in one look: <code>2600</code> became <code>260</code>. One zero lost.',
          '<code>git restore meal_planner.py</code> throws away the changes you have <b>not</b> committed and brings back the file from the last save point. <code>git status</code> says <code>working tree clean</code>, and Ana is back to 2600. Try it in your own project: change one number, run <code>git diff</code>, then <code>git restore</code> the file.'
        ],
        tip: 'Want to try a bigger idea without touching the working version? <code>git switch -c try-new-recipe</code> makes a <b>branch</b>: a side path for new save points. <code>git switch main</code> goes back. ' + GH('l13', 'Learn GitHub, lesson 13: Branches') + ' explains them, and ' + GH('l11', 'lesson 11: Undo anything') + ' covers going back further than the last save point.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: '.gitignore is not an eraser.',
        text: [
          '<code>.gitignore</code> only stops <b>new</b> files. A file git already saved stays tracked. Add <code>.env</code> to it too late and <code>git status</code> just shows the new <code>.gitignore</code>. Tell git to stop tracking with <code>git rm --cached .env</code> (<code>--cached</code> keeps your own copy on disk), and commit. The old save point <b>still has the key</b>. If a real key was ever committed, treat it as leaked: make a new one on the website and throw the old one away.',
          'So where does the key live? In the <b>environment</b>: a set of names and values every program gets from the terminal that starts it. <code>os.environ</code> is a dict-like view of it (the <code>os</code> module talks to your computer). The <code>.env</code> file stays on your computer, ignored. A loader copies it into the environment, and the code only asks: <code>os.environ.get("KITCHEN_API_KEY")</code>.',
          'Press <b>Run</b> on <b>secret.py</b>. Then make a typo on line 11, <code>"KITCHEN_KEY"</code>, and run it again. <code>.get()</code> gives <code>None</code>, as in lesson 38, and Kitchen Coach falls back to offline mode instead of crashing. Commit a <code>.env.example</code> with the same names and <b>empty</b> values, so others know what to set.'
        ],
        warn: 'Next lesson, Packaging: pyproject.toml turns Kitchen Coach into a cookbook other people can install with pip.',
        tip: 'Real projects use a package for step 1: <code>python -m pip install python-dotenv</code>, then <code>from dotenv import load_dotenv</code> and <code>load_dotenv()</code> at the top of the program.'
      }
    ],
    exercises: [
      {
        file: 'l93_gitignore_check.py', title: 'Write Kitchen Coach\'s .gitignore',
        task: 'Write the rules for Kitchen Coach\'s <code>.gitignore</code> as a Python list of strings. The check tries them on 13 paths from the project, using the same two kinds of rule git uses: a <b>folder rule</b> that ends in <code>/</code>, and a <b>name rule</b> with <code>*</code> for "any letters". It must skip the venv, every <code>__pycache__</code>, pytest\'s and Ruff\'s caches, and <code>.env</code>, and still save the code, the tests, <code>requirements.txt</code>, the README, <code>.gitignore</code> and <code>.env.example</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. There is only one rule yet, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, add one string per rule to the <code>GITIGNORE</code> list. Run after each one.',
          'Watch out for rules that are too wide: <code>*.py</code> hides your own code, and <code>.env*</code> hides <code>.env.example</code>.',
          'At <code>PASS</code>, copy your rules into a real <code>.gitignore</code> in a project folder, one per line, and run <code>git status</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: 'A new project folder. Put the commands in order: first the very first save point, then a change to <code>meal_planner.py</code> that you check and save.',
        items: ['git init', 'git add .', 'git commit -m "Start Kitchen Coach"', 'git diff', 'git add meal_planner.py', 'git commit -m "Plan 5 meals a day"'],
        why: '<code>git init</code> once. Then the loop: put pages on the tray with <code>add</code>, stamp them with <code>commit</code>. <code>git diff</code> shows changes that are not on the tray yet, so it comes before <code>add</code>.',
        hint: 'The repo must exist before anything else. And diff looks at changes that are not added yet.'
      },
      {
        type: 'bucket', q: 'Kitchen Coach: save it in git, or keep it out with .gitignore?',
        buckets: ['Commit it', 'Ignore it'],
        items: [
          ['coach.py', 0],
          ['tests/test_coach.py', 0],
          ['requirements.txt', 0],
          ['.gitignore', 0],
          ['.env.example (names, no values)', 0],
          ['.venv/', 1],
          ['__pycache__/', 1],
          ['.env', 1],
          ['.pytest_cache/', 1]
        ],
        why: 'Commit what someone needs to rebuild and run the project. Ignore what can be rebuilt (the venv from requirements.txt, Python\'s scraps, tool caches) and what must stay secret (.env). The .gitignore itself is committed, so everyone skips the same things.',
        hint: 'Ask two questions: can it be rebuilt? Is it a secret?'
      },
      {
        type: 'pick', q: 'Which number was in the last save point?',
        pic: term(['$ git diff', '--- a/meal_planner.py', '+++ b/meal_planner.py', '@@ -3 +3 @@', '-DAILY_KCAL = {"Ana": 2600, "Ben": 2800, "Chloe": 2000}', '+DAILY_KCAL = {"Ana": 260, "Ben": 2800, "Chloe": 2000}'], 'terminal'),
        options: ['2600', '260', 'Both: git saved two versions', 'Neither: git diff only shows the new file'],
        answer: 0,
        why: 'The <code>-</code> line is how the file was at the last save point. The <code>+</code> line is how it is now, not saved yet. So a zero was lost after the save point.',
        hint: 'Minus means taken away, plus means added.'
      },
      {
        type: 'pick', q: 'You broke <code>meal_planner.py</code> and have <b>not</b> committed since it last worked. Which command brings back the saved version?',
        options: ['git restore meal_planner.py', 'git diff meal_planner.py', 'git add meal_planner.py', 'git log --oneline'],
        answer: 0,
        why: '<code>git restore</code> throws away the changes that are not committed and gives you the file from the last save point. <code>diff</code> only shows them, <code>add</code> would put the broken version on the tray, and <code>log</code> lists save points.',
        hint: 'You want to restore something.'
      },
      {
        type: 'fix', q: 'Someone wrote this .gitignore, and now Kitchen Coach\'s <b>own code</b> is not committed. Fix one rule so <code>coach.py</code> is saved and the <code>.pyc</code> scraps are still ignored.',
        code: sorterHead.concat(['GITIGNORE = """', '.venv/', '__pycache__/', '*.py', '.env', '"""'], sorterBody),
        title: 'which_files.py', files: sorterFiles,
        check: [
          'from pathlib import Path',
          'rules = [line.strip() for line in GITIGNORE.splitlines() if line.strip() and not line.strip().startswith("#")]',
          'if is_ignored(Path("coach.py"), rules) or is_ignored(Path("tests/test_coach.py"), rules):',
          '    msg = "coach.py is still ignored. Which rule matches every name that ends in .py?"',
          'elif not is_ignored(Path("tests/__pycache__/test_coach.cpython-315-pytest-9.2.0.pyc"), rules):',
          '    msg = "Now the .pyc scraps get committed. Keep a rule for them."',
          'elif not is_ignored(Path(".env"), rules) or not is_ignored(Path(".venv/pyvenv.cfg"), rules):',
          '    msg = "Keep the rules for .venv/ and .env."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>*.py</code> matches every Python file, including your own code. The scraps end in <code>.pyc</code>, so the rule is <code>*.pyc</code>. (The <code>__pycache__/</code> rule already catches them too, so deleting the line also works.)',
        hint: 'Which names end in <code>.py</code>? Which ones end in <code>.pyc</code>?'
      },
      {
        type: 'pick', q: 'Last week you committed <code>.env</code> with a real key. Today you add <code>.env</code> to <code>.gitignore</code>, run <code>git rm --cached .env</code>, and commit. Is the key safe now?',
        options: [
          'No. The old save point still has it. Make a new key and throw the old one away.',
          'Yes. .gitignore removes it from every save point.',
          'Yes, as long as the .env file is deleted from your computer too.',
          'No, and the only fix is to delete the whole repo on your computer.'
        ],
        answer: 0,
        why: 'Your new save point no longer has the file, but every older one still does: <code>git show &lt;hash&gt;:.env</code> prints it. Anyone with a copy of the repo has the key. So the key itself must change.',
        hint: 'What does a save point remember?'
      },
      {
        type: 'pick', q: 'Back to lesson 38. <code>os.environ</code> works like a dict. Nobody has set <code>KITCHEN_API_KEY</code>. What does <code>os.environ.get("KITCHEN_API_KEY")</code> give?',
        options: ['None', 'An empty string ""', 'KeyError: \'KITCHEN_API_KEY\'', 'The value from .env.example'],
        answer: 0,
        why: '<code>.get()</code> hands back <code>None</code> for a missing key, exactly like <code>pantry.get("tofu")</code> in lesson 38. Square brackets, <code>os.environ["KITCHEN_API_KEY"]</code>, would stop with a <code>KeyError</code> instead.',
        hint: 'What did <code>.get()</code> give for tofu, which was not in the pantry?'
      },
      {
        type: 'type', q: 'Everything for Chloe\'s dessert is on the tray. Type the command that saves it as one save point with the message <code>Add a dessert for Chloe</code>.',
        prompt: '$',
        answers: ['git commit -m "Add a dessert for Chloe"'],
        why: '<code>git commit</code> stamps what is on the tray, and <code>-m</code> gives the save point its message, in quotes.',
        hint: 'git, then commit, then -m, then the message in quotes.'
      }
    ]
  });
})();
