/* Lesson 92: Formatting and linting (module 8). One file per lesson.
   Terminal output is real: Ruff 0.17.6 (installed with pip 26.2.2 into a venv made by Python 3.15.2,
   Homebrew, macOS), captured on 2026-11-23 in a scratch folder. Ruff prints paths relative to the folder
   it runs in, so no real path appears. Only the pip progress bar line was left out.
   Ruff 0.17's default rules include F401, F821, F841 and E722, but not E711 or E731: those come with
   extend-select = ["E"], as part 5 shows (checked with --show-settings).
   The Run boxes were checked with Python 3.14 and in this page (Pyodide, Python 3.14). Ruff is not in
   Pyodide, so the Run boxes show what the code does, and terminal pictures show what Ruff says. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l92  Formatting and linting
     ===================================================================== */

  // Ben's coach.py, as he wrote it: it runs, it is messy, and it hides 3 problems.
  const MESSY = [
    'import json',
    '',
    '',
    'def protein_today(meals,shake = 0):',
    '    protein=sum( meals )',
    '    if shake>0 :',
    '        total = protein+shake',
    '    return protein',
    '',
    'def ben_message(protein,goal=140):',
    '    if protein<goal:',
    '        return f"Ben: {goal-protein} g to go"',
    "    return f'Ben: goal reached, {protien} g!'",
    '',
    'print(ben_message(protein_today([30,45,40])))'
  ];
  // The same file after  ruff format coach.py  (exactly what Ruff 0.17.6 wrote).
  const TIDY = [
    'import json',
    '',
    '',
    'def protein_today(meals, shake=0):',
    '    protein = sum(meals)',
    '    if shake > 0:',
    '        total = protein + shake',
    '    return protein',
    '',
    '',
    'def ben_message(protein, goal=140):',
    '    if protein < goal:',
    '        return f"Ben: {goal - protein} g to go"',
    '    return f"Ben: goal reached, {protien} g!"',
    '',
    '',
    'print(ben_message(protein_today([30, 45, 40])))'
  ];

  /* ---- The idea: a tidy counter and an inspector ---- */
  const flag = (x, y, code, words, col) =>
    `<rect x="${x}" y="${y}" width="4" height="58" fill="${P.ink}"/>` +
    `<path d="M${x + 4} ${y} L${x + 66} ${y + 12} L${x + 4} ${y + 24} Z" fill="${col}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 26, y + 17, code, { s: 11, f: P.white, m: true }) +
    T(x + 14, y + 48, words, { s: 12.5, a: 'start', w: 700, f: P.ink2 });
  const ideaSvg = svg(600, 300, 'Two jobs. Top: ruff format takes a messy line, x=sum( meals )+shake with print(\'Ben:\',x), and writes it tidy, x = sum(meals) + shake with print("Ben:", x). Only the layout changes. Bottom: ruff check is an inspector. It reads the code without running it and plants flags: F401 an import nobody uses, F841 a value that is never used, F821 a name that does not exist.',
    T(20, 22, 'ruff format: tidies the layout', { s: 14, a: 'start', f: P.accent }) +
    box(16, 34, 238, 76, P.white, 12) +
    T(30, 64, 'x=sum( meals )+shake', { s: 13, m: true, a: 'start', f: P.danger }) +
    T(30, 90, "print('Ben:',x)", { s: 13, m: true, a: 'start', f: P.danger }) +
    arrow(262, 72, 332, 72, P.accent, 2.5) +
    box(342, 34, 242, 76, P.okT, 12) +
    T(356, 64, 'x = sum(meals) + shake', { s: 13, m: true, a: 'start', f: P.ok }) +
    T(356, 90, 'print("Ben:", x)', { s: 13, m: true, a: 'start', f: P.ok }) +
    T(300, 134, 'same program, same answer: only spaces, quotes and lines move', { s: 12.5, w: 700, f: P.ink2 }) +
    T(20, 172, 'ruff check: finds likely mistakes, without running', { s: 14, a: 'start', f: P.danger }) +
    box(16, 184, 568, 100, P.white, 12) +
    flag(36, 200, 'F401', 'import nobody uses', P.warn) +
    flag(222, 200, 'F841', 'filled, never used', P.warn) +
    flag(408, 200, 'F821', 'no such name', P.danger));
  const sameAnswer = [
    'def ben_total(meals,shake = 0):',
    '    return sum( meals )+shake',
    'print( ben_total([30,45,40],shake = 30) )',
    '',
    '',
    'def ben_total_tidy(meals, shake=0):',
    '    return sum(meals) + shake',
    '',
    '',
    'print(ben_total_tidy([30, 45, 40], shake=30))'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(sameAnswer, { title: 'same_answer.py' })}</div>`;

  /* ---- The code: install Ruff, format, check ---- */
  const install = [
    '# in kitchen-coach, with the project\'s .venv switched on (lesson 91)',
    '$ python3 -m pip install ruff',
    'Collecting ruff',
    '  Downloading ruff-0.17.6-py3-none-macosx_11_0_arm64.whl.metadata (20 kB)',
    'Downloading ruff-0.17.6-py3-none-macosx_11_0_arm64.whl (9.6 MB)',
    'Installing collected packages: ruff',
    'Successfully installed ruff-0.17.6',
    '$ ruff --version',
    'ruff 0.17.6'
  ];
  const fmtDiff = [
    '$ ruff format --diff coach.py',
    '--- coach.py',
    '+++ coach.py',
    '@@ -1,15 +1,17 @@',
    ' import json',
    ' ',
    ' ',
    '-def protein_today(meals,shake = 0):',
    '-    protein=sum( meals )',
    '-    if shake>0 :',
    '-        total = protein+shake',
    '+def protein_today(meals, shake=0):',
    '+    protein = sum(meals)',
    '+    if shake > 0:',
    '+        total = protein + shake',
    '     return protein',
    ' ',
    "-def ben_message(protein,goal=140):",
    "-    if protein<goal:",
    '-        return f"Ben: {goal-protein} g to go"',
    "-    return f'Ben: goal reached, {protien} g!'",
    ' ',
    '-print(ben_message(protein_today([30,45,40])))',
    '+',
    '+',
    '+def ben_message(protein, goal=140):',
    '+    if protein < goal:',
    '+        return f"Ben: {goal - protein} g to go"',
    '+    return f"Ben: goal reached, {protien} g!"',
    '+',
    '+',
    '+print(ben_message(protein_today([30, 45, 40])))',
    ' ',
    '1 file would be reformatted',
    '$ ruff format coach.py',
    '1 file reformatted'
  ];
  const checkRun = [
    '$ ruff check --output-format concise coach.py',
    'coach.py:1:8: F401 [*] `json` imported but unused',
    'coach.py:7:9: F841 Local variable `total` is assigned to but never used',
    'coach.py:14:34: F821 Undefined name `protien`',
    'Found 3 errors.',
    '[*] 1 fixable with `--fix` (1 unsafe fix available with `--fix --unsafe-fixes`).'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(MESSY, { title: 'coach.py (Ben\'s)' })}` +
    term(install, 'terminal, Python 3.15') + term(fmtDiff, 'terminal: what would ruff format change?') +
    run(TIDY, { title: 'coach.py (after ruff format)' }) + term(checkRun, 'terminal: ruff check, one line per problem') + `</div>`;

  /* ---- The pain: Python only finds the typo when that line runs ---- */
  const week = TIDY.slice(3, 16).concat([
    '# Monday: 30 + 45 + 40 = 115 g',
    'print(ben_message(protein_today([30, 45, 40])))',
    '# Tuesday: the same meals and a 30 g shake = 145 g',
    'print(ben_message(protein_today([30, 45, 40], shake=30)))',
    '# Wednesday: 40 + 55 + 50 = 145 g, goal reached',
    'print(ben_message(protein_today([40, 55, 50])))'
  ]);
  const painSvg = svg(600, 150, 'Three days of Ben\'s week. Monday, 115 g: the message is right, 25 g to go. Tuesday, 145 g with the shake: the message says 25 g to go, because the shake was lost, and Python says nothing. Wednesday, 145 g: NameError, the program crashes on the line Python had never run before.',
    box(14, 20, 176, 112, P.okT, 12) + T(102, 50, 'Monday, 115 g', { s: 14 }) + T(102, 80, '25 g to go', { s: 14, m: true, f: P.ok }) + T(102, 112, 'right ✓', { s: 13, f: P.ok }) +
    box(212, 20, 176, 112, P.warnT, 12) + T(300, 50, 'Tuesday, 145 g', { s: 14 }) + T(300, 80, '25 g to go', { s: 14, m: true, f: P.warn }) + T(300, 112, 'wrong, silently', { s: 13, f: P.warn }) +
    box(410, 20, 176, 112, P.dangerT, 12) + T(498, 50, 'Wednesday, 145 g', { s: 14 }) + T(498, 80, 'NameError', { s: 14, m: true, f: P.danger }) + T(498, 112, 'crash ✗', { s: 13, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(week, { title: 'ben_week.py' })}</div>`;

  /* ---- The fix: read the report, --fix the safe one, fix two by hand ---- */
  const longReport = [
    '$ ruff check coach.py',
    '# ... F401 and F841 first, then:',
    'F821 Undefined name `protien`',
    '  --> coach.py:14:34',
    '   |',
    '12 |     if protein < goal:',
    '13 |         return f"Ben: {goal - protein} g to go"',
    '14 |     return f"Ben: goal reached, {protien} g!"',
    '   |                                  ^^^^^^^',
    ' ',
    'Found 3 errors.',
    '[*] 1 fixable with `--fix` (1 unsafe fix available with `--fix --unsafe-fixes`).'
  ];
  const fixRun = [
    '$ ruff check --fix --output-format concise coach.py',
    'coach.py:6:9: F841 Local variable `total` is assigned to but never used',
    'coach.py:13:34: F821 Undefined name `protien`',
    'Found 3 errors (1 fixed, 2 remaining).',
    '1 unsafe fix available with `--fix --unsafe-fixes`.',
    '# fix lines 6 and 13 by hand (the box below), save, and ask again:',
    '$ ruff check coach.py',
    'All checks passed!'
  ];
  const FIXED = [
    'def protein_today(meals, shake=0):',
    '    protein = sum(meals)',
    '    if shake > 0:',
    '        protein = protein + shake',
    '    return protein',
    '',
    '',
    'def ben_message(protein, goal=140):',
    '    if protein < goal:',
    '        return f"Ben: {goal - protein} g to go"',
    '    return f"Ben: goal reached, {protein} g!"',
    '',
    '',
    'print(ben_message(protein_today([30, 45, 40])))',
    'print(ben_message(protein_today([30, 45, 40], shake=30)))',
    'print(ben_message(protein_today([40, 55, 50])))'
  ];
  const stepsSvg = svg(600, 120, 'The routine, in four steps: ruff format tidies the layout. ruff check lists the problems. ruff check --fix fixes the safe ones. You fix the rest by hand, until it says All checks passed.',
    [['ruff format', 'tidy layout', P.accent, P.tint], ['ruff check', 'list problems', P.danger, P.dangerT], ['--fix', 'safe ones', P.warn, P.warnT], ['by hand', 'the rest', P.ok, P.okT]].map(([a, b, c, f], i) => {
      const x = 12 + i * 148;
      return box(x, 24, 128, 74, f, 12) + T(x + 64, 56, a, { s: 14, m: true, f: c }) + T(x + 64, 82, b, { s: 12.5, w: 700, f: P.ink2 }) +
        (i < 3 ? arrow(x + 132, 61, x + 146, 61, P.ink, 2) : '');
    }).join(''));
  const fixPic = `<div style="width:100%;min-width:0">${term(longReport, 'terminal: the full report for one problem')}${stepsSvg}${term(fixRun, 'terminal: --fix, then by hand')}${run(FIXED, { title: 'coach.py (fixed)' })}</div>`;

  /* ---- Try it: more rules, a settings file, and format on save ---- */
  const grams = [
    'def grams(text):',
    '    try:',
    '        return int(txt)',
    '    except:',
    '        return 0',
    '',
    '',
    'print("Lentil soup:", grams("18"), "g protein")',
    'print("Tofu stir-fry:", grams("32"), "g protein")',
    'print("A spoonful:", grams("some"), "g protein")'
  ];
  const helpers = [
    'def grams(text):',
    '    try:',
    '        return int(text)',
    '    except:',
    '        return 0',
    '',
    '',
    'def dessert_for(dessert):',
    '    if dessert == None:',
    '        return "fruit salad"',
    '    return dessert',
    '',
    '',
    'by_protein = lambda dish: dish["protein"]'
  ];
  const toml = [
    '[tool.ruff]',
    'line-length = 88',
    '',
    '[tool.ruff.lint]',
    'extend-select = ["E"]'
  ];
  const moreRules = [
    '# without pyproject.toml: Ruff\'s default rules',
    '$ ruff check --output-format concise helpers.py',
    'helpers.py:4:5: E722 Do not use bare `except`',
    'Found 1 error.',
    '# with the pyproject.toml above, the E rules join in',
    '$ ruff check --output-format concise helpers.py',
    'helpers.py:4:5: E722 Do not use bare `except`',
    'helpers.py:9:19: E711 Comparison to `None` should be `cond is None`',
    'helpers.py:14:1: E731 Do not assign a `lambda` expression, use a `def`',
    'Found 3 errors.',
    '2 unsafe fixes available with `--fix --unsafe-fixes`.'
  ];
  const vscode = [
    '{',
    '    "[python]": {',
    '        "editor.defaultFormatter": "charliermarsh.ruff",',
    '        "editor.formatOnSave": true',
    '    }',
    '}'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(grams, { title: 'grams.py' })}<div style="height:14px"></div>` +
    code(helpers, { title: 'helpers.py', bad: [4, 9, 14] }) + code(toml, { title: 'pyproject.toml', hi: [2, 5] }) + term(moreRules, 'terminal, Ruff 0.17.6') +
    code(vscode, { title: 'VS Code: settings.json (Open User Settings JSON)' }) + `</div>`;

  /* ---- The catch: let the formatter win, and never silence a rule blindly ---- */
  const fight = [
    'meals = {',
    '    "lunch":     30,   # lined up by hand',
    '    "dinner":    45,',
    '    "snack":     40,',
    '}'
  ];
  const noqaBad = [
    'import json  # noqa',
    'total = protein + shake  # noqa: F841'
  ];
  const noqaGood = [
    'import readline  # noqa: F401  turns on arrow keys in input()',
    '',
    'name = input("Name? ")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${code(fight, { title: 'before ruff format', bad: [2, 3, 4] })}` +
    term(['$ ruff format meals.py', '1 file reformatted', '# the hand-made lining up is gone:', 'meals = {', '    "lunch": 30,  # lined up by hand', '    "dinner": 45,', '    "snack": 40,', '}'], 'terminal') +
    `<div style="height:14px"></div>${code(noqaBad, { title: 'hiding problems', bad: [1, 2] })}<div style="height:14px"></div>${code(noqaGood, { title: 'a noqa with a code and a reason', good: [1] })}</div>`;

  COURSE.add({
    id: 'l92', minutes: 15,
    summary: 'Code is read far more often than it is written, so Python cooks agree on one style, PEP 8 (lesson 12). Two tools keep a kitchen tidy, and <b>Ruff</b> is both. A <b>formatter</b> rewrites the <b>layout</b> for you: spaces, quotes, blank lines, long lines. <code>ruff format coach.py</code>. The program does exactly the same thing afterwards. A <b>linter</b> reads your code <b>without running it</b> and points at likely mistakes: <code>ruff check</code>. Each problem has a code: <b>F401</b> an import nobody uses, <b>F841</b> a variable that is filled and never used, <b>F821</b> a name that does not exist, which Python would only find when that line runs. <code>ruff check --fix</code> fixes the safe ones, and you fix the rest. Install Ruff in the project\'s venv with <code>python3 -m pip install ruff</code>. Settings go in <code>pyproject.toml</code> under <code>[tool.ruff]</code>: <code>extend-select = ["E"]</code> adds rules like <b>E711</b> (<code>== None</code>), <b>E722</b> (bare <code>except</code>) and <b>E731</b> (a named lambda). The VS Code Ruff extension can format on every save. Let the formatter win, and only silence a rule with <code># noqa: CODE</code> plus a reason.',
    video: {
      src: 'videos/l92-formatting-and-linting.mp4', poster: 'videos/l92-formatting-and-linting.jpg', length: '1 min 11 s',
      script: [
        "Ben wrote coach.py for Kitchen Coach. It runs. But look at it. Squashed commas. Spaces in odd places. Single quotes here, double quotes there. Code is read far more often than it is written.",
        "Ruff can tidy it. Type ruff format. Every line snaps into place, and all the quotes become double. Same program, same answer.",
        "Now type ruff check. It reads the code without running it, like an inspector with a flashlight. Flag 1. JSON is imported, but never used. Flag 2. Total is filled, but never read, so Ben's shake is lost. Flag 3. A typo in protein: the i and the e are swapped. That name does not exist. Python would only crash on the day Ben reaches his goal.",
        "Add --fix. Ruff deletes the unused import for you. The other two need a person. Total becomes protein. The typo becomes protein. All checks passed.",
        "Ruff format tidies the layout. Ruff check finds mistakes before you run."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A tidy counter, and an inspector with a flashlight.',
        text: [
          'Ben wrote part of Kitchen Coach in a hurry. It works. But commas are squashed, spaces are in odd places, and some strings use <code>\'single\'</code> quotes and some <code>"double"</code>. Code is <b>read far more often than it is written</b>: by Ben next month, by you, by anyone who helps. A messy counter slows every cook down.',
          'Lesson 12 met Python\'s style guide, <b>PEP 8</b>. Nobody wants to fix spaces by hand, so two tools do it, and one program, <b>Ruff</b>, is both.',
          'A <b>formatter</b> tidies the <b>layout</b>: spaces around <code>=</code> and <code>+</code>, one space after each comma, double quotes, two blank lines between functions. It never changes what the code does. A <b>linter</b> is an inspector. It reads the code <b>without running it</b> and plants a flag on anything that looks like a mistake, each with a short code like <code>F821</code>.',
          'Press <b>Run</b>. The messy card and the tidy card both print <code>145</code>. Python does not care about spaces inside a line. People do. Add or remove spaces inside the brackets on line 3 and run again: still 145.'
        ],
        tip: 'Ruff is free, written by a company called Astral, and very fast: it checks a big project in well under a second. It replaces older tools you may see in other projects, like Black (a formatter) and Flake8 (a linter).'
      },
      {
        label: 'The code', pic: codePic,
        h: 'ruff format tidies. ruff check reports.',
        text: [
          'Here is Ben\'s <code>coach.py</code>. Press <b>Run</b>: <code>Ben: 25 g to go</code>. 30 + 45 + 40 is 115 g, and his goal is 140 g. Nothing looks wrong.',
          'Ruff is a package, so it goes in the project\'s <b>venv</b>, the separate kitchen from lesson 91: switch it on and type <code>python3 -m pip install ruff</code>. Ruff is a command of its own, so then you just type <code>ruff</code>.',
          '<code>ruff format --diff coach.py</code> shows what it <b>would</b> change and changes nothing: <code>-</code> lines go, <code>+</code> lines come. Every change is spacing, quotes or blank lines. <code>ruff format coach.py</code> really does it: <code>1 file reformatted</code>. Run the tidy box: the same <code>Ben: 25 g to go</code>.',
          'Now the inspector: <code>ruff check coach.py</code>. Read each line from the left: the file, the <b>line</b>, the <b>column</b>, the code, and what is wrong. Three flags, on a file that runs fine. <code>--output-format concise</code> asks for one line per problem. Without it, Ruff also shows the lines around each problem, as in part 4.'
        ],
        tip: 'Ruff has two commands for two jobs: <code>ruff format</code> only touches layout, <code>ruff check</code> only reports problems. To check a whole project, give it a dot for "this folder": <code>ruff check .</code>'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Python only finds a typo when that line runs.',
        text: [
          'Look at the three flags again. <code>import json</code> is never used: harmless, but it makes a reader look for JSON that is not there. The other two are <b>real bugs</b>.',
          '<b>F841</b>: on line 4 of this box, <code>total = protein + shake</code> fills a jar called <code>total</code>, and nobody ever reads it. The function returns <code>protein</code>, so Ben\'s 30 g shake is lost. <b>F821</b>: <code>protien</code>, with the i and e swapped, is a name that does not exist.',
          'Press <b>Run</b> on Ben\'s week. Monday is right. Tuesday, with the shake, he has 145 g and has reached his goal, but Coach still says <code>25 g to go</code>, and Python says nothing. Wednesday, 145 g from meals: <code>NameError: name \'protien\' is not defined. Did you mean: \'protein\'?</code> The line with the typo had never run before, so Python had never read it closely.',
          'That is the pain. Python checks a name only <b>when the line runs</b>. A bug in a branch that runs once a month waits a month. Ruff reads every line, every branch, before anything runs.'
        ],
        warn: 'Both bugs passed every quick run for days. A run only tests the lines it happens to reach. The linter reads all of them.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Let --fix do the safe one, then fix the rest by hand.',
        text: [
          'The full report (no <code>--output-format</code>) shows each problem with the lines around it, and <code>^^^^^^^</code> under the exact word, the way Python\'s tracebacks do (lesson 52). Line 14, column 34: <code>protien</code>.',
          'A <code>[*]</code> marks a problem Ruff can fix <b>safely</b>. <code>ruff check --fix coach.py</code> deletes the unused import for you: <code>1 fixed, 2 remaining</code>.',
          'The other two need a person, because only you know what Ben meant. Ruff\'s idea for F841 is to delete the name <code>total</code>, and it calls that an <b>unsafe fix</b>: the shake would still be lost. Ben meant to add the shake to <code>protein</code>. So change <code>total</code> to <code>protein</code>, and <code>protien</code> to <code>protein</code>. Save, run <code>ruff check</code> again: <code>All checks passed!</code>',
          'Press <b>Run</b> on the fixed card: Monday 25 g to go, Tuesday and Wednesday goal reached with 145 g. Then run your taste tests (lesson 89) too: Ruff finds slips in the writing, tests check that the answers are right.'
        ],
        tip: 'Ruff only rewrote what was safe. <code>--unsafe-fixes</code> exists, but read what it would change first (<code>--diff</code>), because "unsafe" means it can change what the program does.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'More rules, a settings file, and tidy on every save.',
        text: [
          '<b>A bare except hides a typo.</b> Press <b>Run</b> on <code>grams.py</code>: every dish has <code>0 g protein</code>. Line 3 says <code>txt</code>, a name that does not exist, and the bare <code>except:</code> (lesson 53) swallows the NameError too. Ruff flags both: F821 on line 3 and <b>E722</b> on line 4. Change line 4 to <code>except ValueError:</code> and run: now the NameError shows itself. Fix <code>txt</code> to <code>text</code>: 18 g, 32 g, and 0 g for "some".',
          '<b>Pick your rules in <code>pyproject.toml</code>.</b> This is the project\'s settings file, next to your code (lesson 94, Packaging, explains the rest of it). Under <code>[tool.ruff]</code>, <code>line-length = 88</code> is the longest line the formatter aims for (88 is the default). Under <code>[tool.ruff.lint]</code>, <code>extend-select = ["E"]</code> adds the <b>E</b> rules from PEP 8 to Ruff\'s default rules. Now <code>== None</code> gets <b>E711</b> (ask <code>is None</code>, lesson 16), and the named lambda from lesson 80 gets <b>E731</b>: "use a <code>def</code>". <code>select</code> instead of <code>extend-select</code> would replace the defaults rather than add to them.',
          '<b>Tidy on every save.</b> In VS Code, install the <b>Ruff</b> extension (by Astral) from the Extensions panel. It underlines problems as you type. Put the lines above into your settings, and every Save runs <code>ruff format</code> for you.'
        ],
        tip: 'Not sure what a code means? <code>ruff rule F821</code> explains it in plain words, with an example and the fix.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Do not fight the formatter, and never silence a rule blindly.',
        text: [
          '<b>Let the formatter win.</b> Lining up values by hand looks nice once, and <code>ruff format</code> undoes it the next time it runs. Every project that uses a formatter looks the same, so nobody argues about spaces. If a line is hard to read after formatting, give a value a good name or split the work, do not push the spaces back.',
          '<b>Silence a rule only with a reason.</b> <code># noqa</code> at the end of a line tells Ruff to say nothing about that line. A bare <code># noqa</code> hides every problem on the line, even ones you have not seen yet. And silencing F841 here would hide Ben\'s lost shake. When there really is a reason, name the code and write the reason. <code>import readline</code> is never used by name, but importing it turns on the arrow keys inside <code>input()</code> on Mac and Linux, so F401 is wrong there: <code># noqa: F401  turns on arrow keys in input()</code>. The check at the bottom of this lesson\'s exercise has one too.',
          '<b>A linter is not a test.</b> Ruff knows Python, not Kitchen Coach. In lesson 89, <code>shake=250</code> as a default broke Ana\'s calories, and Ruff found nothing wrong: the code was tidy and every name existed. Lesson 90\'s type hints and lesson 89\'s taste tests catch other kinds of mistakes. Use all three.'
        ],
        warn: 'Ruff also flags a <code># noqa: CODE</code> that no longer hides anything (RUF100), so old silences do not pile up.'
      }
    ],
    exercises: [
      {
        file: 'l92_tidy_kitchen.py', title: 'A tidy kitchen',
        task: '<code>dessert_for()</code> picks a dessert for each guest. It runs fine most nights, but it hides <b>3 problems</b>: an unused import, a <code>== None</code>, and a typo in a branch that only runs when Chloe is offered a dessert with gluten in it. Let Ruff find them, then fix all 3.',
        steps: [
          'Press <b>Open in VS Code</b>. Open a terminal in that folder, make a venv, switch it on, and type <code>python3 -m pip install ruff</code> (lesson 91).',
          'Type <code>ruff check --extend-select E l92_tidy_kitchen.py</code>. It lists 3 problems with their codes and line numbers.',
          'Fix them between <code>START</code> and <code>END</code>. <code>--fix</code> can do the safe one. Run <code>ruff check</code> again until it says <code>All checks passed!</code>. Try <code>ruff format</code> on it too.',
          'Run the file with plain <code>python3</code>. It serves every guest, takes every branch, and prints <code>PASS</code> or one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Which tool does each job?',
        buckets: ['ruff format (layout)', 'ruff check (mistakes)'],
        items: [
          ['puts spaces around = and +', 0],
          ["turns 'single' quotes into \"double\"", 0],
          ['puts two blank lines between functions', 0],
          ['finds a name that was never defined', 1],
          ['finds an import nobody uses', 1],
          ['finds a variable that is filled and never read', 1]
        ],
        why: 'The formatter only moves spaces, quotes, blank lines and line breaks, so the program does exactly the same thing. The linter reads what the code <b>means</b> and points at likely mistakes.',
        hint: 'Does it change how the code looks, or find something wrong with it?'
      },
      {
        type: 'pick', q: 'Ruff prints this line. What do <code>14</code> and <code>34</code> tell you?',
        pic: term(['coach.py:14:34: F821 Undefined name `protien`'], 'terminal'),
        options: ['Line 14, column 34: where the name starts', '14 problems, 34 lines checked', 'Rule 14, checked 34 times', 'The 14th and 34th letters are wrong'],
        answer: 0,
        why: 'Ruff writes <code>file:line:column</code>. Column 34 is the first letter of <code>protien</code>, which is why the full report puts <code>^^^^^^^</code> right under it. In VS Code, <b>Cmd+click</b> (Ctrl+click on Windows) on <code>coach.py:14:34</code> in the terminal jumps straight there.',
        hint: 'Python\'s tracebacks say "line 14". Ruff adds one more number.'
      },
      {
        type: 'fix', q: 'Ruff says <code>F841 Local variable `totl` is assigned to but never used</code>. Chloe\'s 320 kcal rice pudding with an 80 kcal topping should be 400 kcal. Fix the function so it prints <code>400</code>.',
        code: ['def dessert_kcal(base, topping=0):', '    kcal = base', '    if topping > 0:', '        totl = kcal + topping', '    return kcal', '', '', 'print(dessert_kcal(320, topping=80))'],
        title: 'dessert.py',
        check: [
          'f = globals().get("dessert_kcal")',
          'if not callable(f):',
          '    msg = "Keep the function  def dessert_kcal(base, topping=0):"',
          'elif out.strip() != "400":',
          '    msg = "It should print 400. The topping is added to a jar nobody reads. Which jar does the function return?"',
          'elif f(250) != 250 or f(250, topping=50) != 300:',
          '    msg = "dessert_kcal(250, topping=50) should be 300, and dessert_kcal(250) should be 250."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The topping went into <code>totl</code>, and the function returns <code>kcal</code>, so the 80 kcal were lost. Write <code>kcal = kcal + topping</code> (or return the total). F841 is often a lost value like this, not just clutter.',
        hint: 'Which name is returned, and which name gets the topping?'
      },
      {
        type: 'fix', q: 'Ruff says <code>F821 Undefined name `kcall`</code>. Ana only reaches that line on a big training day, so it has never crashed yet. Fix it so both lines print.',
        code: ['def ana_message(kcal, goal=2600):', '    if kcal < goal:', '        return f"Ana: {goal - kcal} kcal to go"', '    return f"Ana: fuelled, {kcall} kcal"', '', '', 'print(ana_message(2400))', 'print(ana_message(2650))'],
        title: 'ana.py',
        check: [
          'f = globals().get("ana_message")',
          'if not callable(f):',
          '    msg = "Keep the function  def ana_message(kcal, goal=2600):"',
          'elif out.strip().splitlines() != ["Ana: 200 kcal to go", "Ana: fuelled, 2650 kcal"]:',
          '    msg = "Expected  Ana: 200 kcal to go  and then  Ana: fuelled, 2650 kcal. Read the name on line 4 letter by letter."',
          'elif f(2800) != "Ana: fuelled, 2800 kcal":',
          '    msg = "ana_message(2800) should say  Ana: fuelled, 2800 kcal. Use the parameter, not a fixed number."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>kcall</code> has one <b>l</b> too many. The parameter is <code>kcal</code>. Python only noticed when Ana had a big day and line 4 finally ran. Ruff reads line 4 every time.',
        hint: 'Compare the name on line 4 with the parameter on line 1.'
      },
      {
        type: 'match', q: 'Match each Ruff code to what it means.',
        pairs: [
          ['F401', 'an import nobody uses'],
          ['F821', 'a name that does not exist'],
          ['F841', 'a variable filled and never read'],
          ['E711', 'compares with == None'],
          ['E722', 'a bare except:'],
          ['E731', 'a lambda given a name']
        ],
        why: 'F codes come from Pyflakes and point at likely bugs. E codes come from the PEP 8 style checks, and you add them with <code>extend-select = ["E"]</code>. You do not need to learn the codes by heart: <code>ruff rule E711</code> explains any of them.',
        hint: 'F821 and F841 differ in one direction: one is read and never filled, the other filled and never read.'
      },
      {
        type: 'order', q: 'You finished a change to Kitchen Coach. Put a pro\'s tidy-up in order.',
        items: ['Switch on the project\'s venv, where Ruff is installed', 'ruff format . to tidy the layout', 'ruff check --fix . to list problems and fix the safe ones', 'Fix the remaining problems by hand', 'Run the taste tests with pytest'],
        why: 'Ruff lives in the venv, so switch it on first. Format, then check, so the report is about real problems and not spacing. Fix what --fix could not. Last, the tests make sure every answer is still right after all those edits.',
        hint: 'You cannot run ruff before you can reach it, and tests go last.'
      },
      {
        type: 'pick', q: 'Back to lesson 80. With the E rules on, Ruff says <code>E731 Do not assign a `lambda` expression, use a `def`</code> about this line. What does it want?',
        pic: code(['by_protein = lambda dish: dish["protein"]', 'dishes.sort(key=by_protein)'], { title: 'menu.py' }),
        options: ['A def card: def by_protein(dish): with return dish["protein"] on the line below it', 'by_protein = def dish: dish["protein"]', 'Delete the line: sort without a key', 'by_protein == lambda dish: dish["protein"]'],
        answer: 0,
        why: 'As lesson 80 said: if it is worth a name, it is worth a <code>def</code>. The function then knows its own name, so error messages say <code>by_protein</code> and not <code>&lt;lambda&gt;</code>. A lambda written straight into <code>key=</code> has no name, so Ruff is happy with that too.',
        hint: 'Which option is a normal recipe card?'
      },
      {
        type: 'pick', q: '<code>ruff check --fix</code> removed <code>import json</code> but left <code>F841 Local variable `total` is assigned to but never used</code>. Why did it not fix that one too?',
        options: ['Fixing it could change what the program does, and only Ben knows what he meant', 'Ruff can only fix one problem per run', '--fix only works on the first line of a file', 'F841 is just a style rule, so Ruff ignores it'],
        answer: 0,
        why: 'Deleting an unused import never changes what the program does, so it is <b>safe</b>. For F841, Ruff would delete the name <code>total</code>, which keeps the bug: the shake is still lost. That is an <b>unsafe fix</b>, so Ruff waits for a person. Ben meant <code>protein = protein + shake</code>.',
        hint: 'Look for the word "unsafe" in Ruff\'s last line.'
      }
    ]
  });
})();
