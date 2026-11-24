/* Lesson 95: Review: tools of a pro (module 8). Quiz only, no video, no exercise.
   Every terminal picture is real output copied exactly from lessons 88 to 94 (pdb with Python 3.15.2,
   pytest 9.2.0, mypy 2.4.1, pip 26.2.2, Ruff 0.17.6, git 2.50.1). Lines starting with "# " are notes, as there.
   The Run boxes and fix checks were checked with Python 3.14.4 and in this page (Pyodide, Python 3.14) on 2026-11-23. */
(function () {
  const { P, code, run, term, svg, box, T } = PR;

  /* =====================================================================
     l95  Review: tools of a pro
     ===================================================================== */

  // One tool card per lesson, the same small picture as lesson 87. The cards sit in a grid
  // that is 3 or 4 wide on a desktop and 2 wide on a phone, so the text stays readable at every width.
  const MONO = 'font-variant-ligatures:none';
  const card = (n, title, mono, plain, tint) =>
    `<div style="min-width:0">` + svg(172, 118, `Lesson ${n}, ${title}: ${mono}. ${plain}.`,
      `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
      T(82, 14.5, 'Lesson ' + n, { s: 12, f: P.white }) +
      box(2, 17, 164, 94, P.white, 10) +
      `<rect x="9" y="25" width="150" height="78" rx="6" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
      `<line x1="9" y1="52" x2="159" y2="52" stroke="${P.danger}" stroke-width="1.4"/>` +
      T(84, 44, title, { s: title.length > 17 ? 12 : title.length > 14 ? 13 : 14 }) +
      T(84, 73, mono, { s: mono.length > 17 ? 11.5 : 12.5, m: true, w: 700 }).replace('<text ', `<text style="${MONO}" `) +
      T(84, 94, plain, { s: 12, w: 700, f: P.ink2 })) + `</div>`;

  const cards = [
    [88, 'Debugging', 'print(f"{total=}")', 'first wrong step', P.tint],
    [89, 'Testing with pytest', 'assert total == 2600', 'taste it every time', P.tint],
    [90, 'Type hints', 'meals: list[int]', 'labels, not locks', P.tint],
    [91, 'Virtual environments', 'python -m venv .venv', 'a kitchen per project', P.warnT],
    [92, 'Formatting, linting', 'ruff check --fix', 'tidy, then inspect', P.warnT],
    [93, 'Git for Python', 'git add, git commit', '.gitignore first', P.okT],
    [94, 'Packaging', 'python -m build', 'cover: pyproject.toml', P.okT]
  ];
  const youAreHere = `<div style="min-width:0">` + svg(172, 118, 'Lesson 95, this review: 16 questions. You are here.',
    `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
    T(82, 14.5, 'Lesson 95', { s: 12, f: P.white }) +
    box(2, 17, 164, 94, P.sand, 10) +
    T(84, 50, 'Review', { s: 16 }) +
    T(84, 72, '16 questions', { s: 12.5, w: 700, f: P.ink2 }) +
    T(84, 94, 'you are here', { s: 12.5, w: 700, f: P.accent })) + `</div>`;
  const chip = (fill, label) => `<span style="display:inline-block;background:${fill};color:${P.ink};border:2px solid ${P.ink};border-radius:999px;padding:2px 10px;margin:3px 4px 3px 0;font-size:13px;font-weight:800">${label}</span>`;
  const recapPic = `<div style="width:100%;min-width:0">` +
    `<div style="font-weight:800;font-size:16px;margin:0 0 4px;color:${P.ink}">Module 8: seven tools of a pro kitchen</div>` +
    `<div style="margin:0 0 10px">${chip(P.tint, 'Is it right?')}${chip(P.warnT, 'Is the kitchen in order?')}${chip(P.okT, 'Can others use it?')}</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,138px),1fr));gap:12px 10px">` +
    cards.map(c => card(...c)).join('') + youAreHere + `</div></div>`;

  // How to play: two kinds of question. Python runs here; the other tools run on your computer.
  const half = (x, head, line1, line2, fill, items) =>
    box(x, 8, 166, 196, fill, 12) +
    T(x + 83, 36, head, { s: 15 }) +
    T(x + 83, 56, line1, { s: 12, w: 700, f: P.ink2 }) + T(x + 83, 72, line2, { s: 12, w: 700, f: P.ink2 }) +
    items.map((t, i) => `<rect x="${x + 14}" y="${86 + i * 22}" width="138" height="18" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="1.2"/>` +
      T(x + 83, 99 + i * 22, t, { s: 11.5, m: true, w: 700 }).replace('<text ', `<text style="${MONO}" `)).join('');
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(360, 212, 'Two kinds of question. Left, Python runs here: f-strings with an equals sign, assert, type hints, fnmatch and tomllib. Press Run. Right, tools that run on your computer: pytest, mypy, ruff, pip and venv, git, build. Read their real output.',
      half(8, 'Python runs here', 'predict, then', 'press Run', P.tint, ['f"{total=}"', 'assert ... == 2600', 'goal: int', 'fnmatch', 'tomllib']) +
      half(186, 'Your computer', 'read the real', 'terminal output', P.warnT, ['pytest', 'mypy', 'ruff', 'pip, venv', 'git, build'])) +
    run(['# Warm up: say every line out loud, then press Run', 'day = [("breakfast", 650), ("lunch", 820), ("snack", 510), ("dinner", 620)]', '', 'total = 0', 'for meal, kcal in day:', '    total = total + kcal', '    print(f"{meal=} {total=}")', '', 'assert total == 2600, "Ana\'s day should be 2600"', 'print("Taste test passed")'], { title: 'warm_up.py' }) +
    `</div>`;

  // Ana's day with a breakpoint, exactly as in lesson 88.
  const DAY = 'day = [("breakfast", 650), ("lunch", 820), ("snack", 510), ("dinner", 620)]';
  const ANA_BP = [DAY, '', 'total = 0', 'snacks = 0', 'for meal, kcal in day:', '    breakpoint()', '    total = total + kcal', '    if meal == "snack":', '        total = total + kcal', 'print(f"Ana ate {total} kcal today")', 'print(f"Snacks: {snacks} kcal")'];
  // The part of lesson 88's real pdb session that happens on the snack.
  const PDB = [
    '# ... two c later, on the snack:',
    '> /Users/you/kitchen/ana_day.py(6)<module>()',
    '-> breakpoint()',
    '(Pdb) p meal, total',
    "('snack', 1470)",
    '(Pdb) n',
    '> /Users/you/kitchen/ana_day.py(7)<module>()',
    '-> total = total + kcal',
    '(Pdb) n',
    '> /Users/you/kitchen/ana_day.py(8)<module>()',
    '-> if meal == "snack":',
    '(Pdb) p total',
    '1980',
    '(Pdb) n',
    '> /Users/you/kitchen/ana_day.py(9)<module>()',
    '-> total = total + kcal',
    '(Pdb) n',
    '> /Users/you/kitchen/ana_day.py(5)<module>()',
    '-> for meal, kcal in day:',
    '(Pdb) p total',
    '2490'
  ];

  // The .gitignore sorter from lesson 93.
  const IS_IGNORED = [
    'def is_ignored(path, rules):',
    '    for rule in rules:',
    '        if rule.endswith("/"):                  # a folder rule, like .venv/',
    '            if rule[:-1] in path.parts[:-1]:',
    '                return True',
    '        elif any(fnmatch(part, rule) for part in path.parts):',
    '            return True',
    '    return False'
  ];

  const RUNNER = (names) => ['', '', `for test in [${names}]:`, '    try:', '        test()', '        print("PASSED", test.__name__)', '    except AssertionError:', '        print("FAILED", test.__name__)'];

  COURSE.add({
    id: 'l95', minutes: 25,
    summary: 'Seven lessons on one wall: debugging, testing with pytest, type hints, virtual environments, formatting and linting with Ruff, git for Python projects, and packaging. Then <b>16 mixed questions</b>, easy to hard, with <b>4 real bugs</b> to fix. Python itself runs in this page, so <code>f"{total=}"</code>, <code>assert</code>, hints, <code>fnmatch</code> and <code>tomllib</code> questions have a <b>Run</b> button. pytest, mypy, Ruff, pip, git and build run on your own computer, so those questions show their <b>real output</b> from the lessons, and you read it like a pro.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One wall, seven tools.',
        text: [
          'Module 8 did not teach Kitchen Coach a new trick. It taught you how pros <b>work</b> on code: find a bug, prove the code is right, keep each project in its own kitchen, keep it tidy, save it, and hand it on. Each card is one lesson, with the <b>one line</b> to remember and the <b>one idea</b> behind it.',
          '<b>Is it right?</b> (lavender). A wrong number with no error needs the debugging method: reproduce, guess, <b>look at the values step by step</b>, fix the <b>first</b> step that goes wrong, re-check. <code>print(f"{total=}")</code> shows the name and the value. <code>breakpoint()</code> pauses in pdb, where <code>p</code> prints, <code>n</code> runs the next line and <code>c</code> carries on. A <b>test</b> is a function named <code>test_...</code> with an <code>assert</code>, and <code>python3 -m pytest</code> runs them all and shows both numbers when one fails: <code>assert 2850 == 2600</code>. A <b>type hint</b> like <code>meals: list[int]</code> or <code>-&gt; int | None</code> is a label. Python never reads it while running. mypy reads it before you run.',
          '<b>Is the kitchen in order?</b> (orange). Each project gets its own <b>venv</b>: <code>python3 -m venv .venv</code>, then <code>source .venv/bin/activate</code>, and the prompt says <code>(.venv)</code>. One shelf holds one version of each package, so two projects that need two versions need two kitchens. <code>ruff format</code> tidies the layout and never changes what the code does. <code>ruff check</code> reads every line without running it: <b>F401</b> an unused import, <b>F841</b> a value filled and never read, <b>F821</b> a name that does not exist. <code>--fix</code> does only the safe ones.',
          '<b>Can others use it?</b> (green). Git keeps save points: <code>git status</code>, <code>git diff</code>, <code>git add</code>, <code>git commit -m "..."</code>, and <code>git restore</code> to throw away a change you did not save. Write the <code>.gitignore</code> first: <code>.venv/</code>, <code>__pycache__/</code>, <code>*.pyc</code>, the tool caches and <code>.env</code>. And <code>pyproject.toml</code> is the cookbook\'s cover: name, version, <code>requires-python</code>, loose <code>dependencies</code>, and a command under <code>[project.scripts]</code>. <code>python -m build</code> binds it into a wheel that Ben can <code>pip install</code>.'
        ],
        tip: 'The tools work as a team. Ruff finds slips in the writing, mypy finds wrong kinds of values, tests check the answers, and the debugger finds why an answer is wrong. None of them replaces the others (lesson 92, The catch).'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Run what runs here. Read what runs at home.',
        text: [
          'Python runs in this page, so every question about Python itself has a <b>Run</b> button: debug prints, taste tests called by hand, type hints, a <code>.gitignore</code> sorter and <code>tomllib</code>. As in lesson 87, <b>say the output out loud first</b>, then pick, then press Run to check.',
          'pytest, mypy, Ruff, pip, git and build are programs on your own computer, and they do not run in a browser. Those questions show their <b>real output</b>, exactly as the lessons captured it. Read it the way you read a traceback (lesson 52): which file and line, what it got, what it expected, and what the tool suggests.',
          'Try the warm-up. Each pass prints the name and the value of <code>meal</code> and <code>total</code>. Then the <code>assert</code> checks Ana\'s day. Now make a bug: change the snack from <code>510</code> to <code>610</code> and run it again. The total is 2700, and the taste test stops the program with your message.',
          'The <b>fix</b> questions are real Kitchen Coach code with a bug. Change it, then press <b>Run and check</b>. The page runs your code and often tries your function with other values too, so a fix that only bends the one example will not pass.'
        ],
        warn: 'Some bugs in this module give no error at all: a total that is too high, a zero, a test that passes for the wrong reason. Ask the lesson 88 question first: where is the <b>first</b> value that is wrong?'
      }
    ],
    quiz: [
      {
        type: 'type', q: 'Kitchen Coach is paused on the snack. What does this debug print show? Type it exactly, then press Run on the code to check.',
        pic: run(['meal = "snack"', 'total = 2490', 'print(f"{meal=} {total=}")'], { title: 'peek.py' }),
        prompt: 'output >',
        answers: ["meal='snack' total=2490"],
        why: 'An equals sign at the end of each blank prints the name, the <code>=</code> and the value. Text shows its quotes, so <code>meal=\'snack\'</code>, and the number shows as it is (lessons 15 and 88).',
        hint: 'Lesson 88: the = shows the name as well as the value. And text values keep their quotes.'
      },
      {
        type: 'match', q: 'Every tool from this module has its own job. Match each one to the problem it is made for.',
        pairs: [
          ['print(f"{total=}")', 'Ana\'s day says 3110, not 2600: find the first wrong step'],
          ['python3 -m pytest', 'check after every change that Ana\'s day is still 2600'],
          ['python3 -m mypy', 'text goes where the label says int, found before you run'],
          ['python3 -m venv .venv', 'Kitchen Coach needs pytest 9, Chloe\'s blog needs pytest 8'],
          ['ruff format', 'squashed commas and mixed quotes, tidied up'],
          ['ruff check', 'an import nobody uses, and a typo in a name'],
          ['git restore', 'Friday\'s change lost a zero: bring back the saved file'],
          ['python -m build', 'one wheel file that Ben can pip install']
        ],
        why: 'A debug print looks at the values step by step (lesson 88). pytest runs every taste test (lesson 89). mypy reads the type hints (lesson 90). A venv gives each project its own shelf (lesson 91). <code>ruff format</code> only moves spaces and quotes, <code>ruff check</code> finds likely mistakes (lesson 92). <code>git restore</code> brings back the last save point (lesson 93). <code>python -m build</code> binds the cookbook (lesson 94).',
        hint: 'Start with the ones you are surest of. Of the two ruff commands, one only moves spaces and quotes, the other finds mistakes.'
      },
      {
        type: 'pick', q: 'This is Kitchen Coach\'s very first save point, made with no <code>.gitignore</code>. Which files should <b>never</b> have gone in? (lesson 93)',
        pic: term([
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
          ' create mode 100644 tests/test_coach.py'
        ], 'terminal: the first save point, with no .gitignore yet'),
        options: ['.env', '__pycache__/meal_planner.cpython-315.pyc', 'requirements.txt', 'tests/test_coach.py', 'README.md', 'meal_planner.py'],
        answer: [0, 1],
        why: '<code>.env</code> holds the secret key, and now every copy of the repo has it: <code>git show e78a8e6:.env</code> prints it. The <code>.pyc</code> file is Python\'s own scrap, rebuilt whenever the code changes. The rest is what someone needs to rebuild and run the project: the code, the tests, the shopping list and the README (lesson 93).',
        hint: 'Two questions for each file: is it a secret? Can it be rebuilt by itself?'
      },
      {
        type: 'fill', q: '<code>gluten_free</code> takes Chloe\'s dessert menu, a dict like <code>{"brownie": False, "rice pudding": True}</code>, and hands back the names she can eat. Finish its type hints.',
        text: 'def gluten_free(menu: ___[str, bool]) ___ ___[str]:\n    return [dish for dish, ok in menu.items() if ok]',
        options: ['dict', '->', 'list', 'tuple', '=>', 'set'],
        answer: ['dict', '->', 'list'],
        why: 'The menu is a dict from text to <code>True</code> or <code>False</code>: <code>dict[str, bool]</code>. The arrow <code>-&gt;</code> brings in the return hint. Square brackets around a comprehension build a list, so it hands back <code>list[str]</code> (lessons 76 and 90).',
        hint: 'Lesson 90: what kind of collection is the menu, and what do square brackets around a comprehension build?'
      },
      {
        type: 'pick', q: 'Kitchen Coach and Chloe\'s baking blog share one Python, with no venv. You run this for Chloe. What happened to Kitchen Coach?',
        pic: term([
          '# one kitchen for both projects. Kitchen Coach put pytest 9 on the shelf.',
          '$ python3 -m pip install pytest==8.4.2',
          'Collecting pytest==8.4.2',
          '# ... 4 lines: Requirement already satisfied ...',
          'Installing collected packages: pytest',
          '  Attempting uninstall: pytest',
          '    Found existing installation: pytest 9.2.0',
          '    Uninstalling pytest-9.2.0:',
          '      Successfully uninstalled pytest-9.2.0',
          'Successfully installed pytest-8.4.2',
          '$ python3 -m pytest --version',
          'pytest 8.4.2'
        ], 'terminal: one kitchen shared by both projects'),
        options: [
          'Its pytest 9.2.0 was uninstalled. It now runs its tests with pytest 8.4.2',
          'Nothing. pip keeps pytest 9.2.0 and 8.4.2 side by side',
          'pip refused, so the shelf still holds pytest 9.2.0',
          'Kitchen Coach got its own copy of pytest 8.4.2 in a new .venv'
        ],
        answer: 0,
        why: 'Read the middle of pip\'s answer: <code>Found existing installation: pytest 9.2.0</code>, then <code>Successfully uninstalled pytest-9.2.0</code>. One shelf holds one version of each package. The fix is a kitchen per project: a <code>.venv</code> in each folder, each with its own pytest (lesson 91).',
        hint: 'Lesson 91: find the line that says uninstalled. How many pytests can one shelf hold?',
        hints: { 1: 'Look for the word uninstalled. One shelf holds one version.', 2: 'The last line answers this one: pytest --version says 8.4.2.', 3: 'No venv was made or switched on. The prompt has no (.venv).' }
      },
      {
        type: 'pick', q: 'Ruff checks Ben\'s <code>coach.py</code>. Which of the three problems does <code>ruff check --fix</code> fix all by itself?',
        pic: term([
          '$ ruff check --output-format concise coach.py',
          'coach.py:1:8: F401 [*] `json` imported but unused',
          'coach.py:7:9: F841 Local variable `total` is assigned to but never used',
          'coach.py:14:34: F821 Undefined name `protien`',
          'Found 3 errors.',
          '[*] 1 fixable with `--fix` (1 unsafe fix available with `--fix --unsafe-fixes`).'
        ], 'terminal: ruff check, one line per problem'),
        options: ['Only F401, the import nobody uses', 'Only F821, the typo in protien', 'F401 and F841, but not the typo', 'All three'],
        answer: 0,
        why: 'The <code>[*]</code> marks the one problem Ruff can fix <b>safely</b>: deleting an unused import never changes what the program does. Ruff\'s idea for F841 is an <b>unsafe</b> fix, because only Ben knows he meant <code>protein = protein + shake</code>. And for a typo, only a person knows the right name (lesson 92).',
        hint: 'Lesson 92: which line has the [*] mark? Read the last line of the report too.',
        hints: { 1: 'Ruff cannot know which name Ben meant. Which line has the [*]?', 2: 'The last line says the F841 fix is unsafe, so plain --fix leaves it alone.', 3: 'The last line says: 1 fixable with --fix.' }
      },
      {
        type: 'pick', q: 'Someone changed the default to <code>shake=250</code>, for Ben. The taste tests are called by hand, as in lesson 89. What does this print?',
        pic: run(['def daily_kcal(meals, shake=250):', '    return sum(meals) + shake', '', '', 'def test_ben():', '    assert daily_kcal([500, 700, 650], shake=250) == 2100', '', '', 'def test_chloe():', '    assert daily_kcal([400, 600, 650, 350]) == 2000', ...RUNNER('test_ben, test_chloe')], { title: 'taste_by_hand.py' }),
        options: ['PASSED test_ben, then FAILED test_chloe', 'FAILED test_ben, then PASSED test_chloe', 'PASSED test_ben, then PASSED test_chloe', 'FAILED test_ben, then the program stops with an AssertionError'],
        answer: 0,
        why: 'Ben passes <code>shake=250</code> himself, so his day is 500 + 700 + 650 + 250 = 2100, and his test passes. Chloe never drinks the shake, but the new default adds 250 anyway: 2000 + 250 = 2250, not 2000. That is exactly how lesson 89\'s change broke Ana. The <code>try</code> and <code>except</code> catch each AssertionError, so both lines print.',
        hint: 'Lesson 89: work out each total by hand. Which call uses the default?',
        hints: { 1: 'Ben passes shake=250 himself: 500 + 700 + 650 + 250. What is that?', 2: 'Chloe\'s call has no shake=, so the default 250 is added. Is 2250 equal to 2000?', 3: 'The except AssertionError catches each failure, so the loop goes on.' }
      },
      {
        type: 'bucket', q: 'The project is <code>kitchen-coach</code> and the package is <code>kitchen_coach</code>. Which spelling goes where? (lesson 94)',
        buckets: ['kitchen-coach (hyphen)', 'kitchen_coach (underscore)'],
        items: [
          ['the command Ben types', 0],
          ['name = "..." under [project]', 0],
          ['pip says: Successfully installed ___-0.1.0', 0],
          ['import ___', 1],
          ['the package folder inside src/', 1],
          ['the module, right of the = in [project.scripts]', 1],
          ['the start of the wheel: ___-0.1.0-py3-none-any.whl', 1]
        ],
        why: 'The cover and the command use the project name with a hyphen: <code>kitchen-coach</code>, and pip prints it that way. Python reads a hyphen as a minus sign, so everything Python imports uses the underscore: the folder, <code>import kitchen_coach</code>, and <code>kitchen_coach.cli:main</code>. The wheel file name uses the underscore too (lesson 94).',
        hint: 'Lesson 94, The catch: could Python read it as a minus sign?'
      },
      {
        type: 'pick', q: 'Kitchen Coach reads its cover page with <code>tomllib</code>, the way pip does. What does this print?',
        pic: run(['import tomllib', '', 'cover = """', '[project]', 'name = "kitchen-coach"', 'version = "0.2.0"', 'dependencies = [', '    "tabulate>=0.10",', ']', '', '[project.scripts]', 'kitchen-coach = "kitchen_coach.cli:main"', '"""', '', 'book = tomllib.loads(cover)', 'print("scripts" in book, "scripts" in book["project"])', 'print(book["project"]["dependencies"])', 'module, function = book["project"]["scripts"]["kitchen-coach"].split(":")', 'print(module, "->", function)'], { title: 'read_cover.py' }),
        options: [
          "False True, then ['tabulate>=0.10'], then kitchen_coach.cli -> main",
          "True True, then ['tabulate>=0.10'], then kitchen_coach.cli -> main",
          "False True, then tabulate>=0.10, then kitchen_coach.cli -> main",
          "False True, then ['tabulate>=0.10'], then kitchen-coach -> kitchen_coach.cli:main"
        ],
        answer: 0,
        why: '<code>[project.scripts]</code> is a section inside <code>[project]</code>, so it becomes a dict inside the <code>project</code> dict, not a key of its own at the top: <code>False True</code>. A TOML list in <code>[ ]</code> becomes a Python list. The value of the command is <code>"kitchen_coach.cli:main"</code>, and splitting it at the colon gives the module and the function (lesson 94).',
        hint: 'Lesson 94: a section inside a section becomes a dict inside a dict. And what does a TOML list turn into?',
        hints: { 1: 'The dot in [project.scripts] puts scripts inside project.', 2: 'The square brackets in TOML make a Python list, and print shows a list with its brackets.', 3: 'split works on the value, the text after the =, not on the key.' }
      },
      {
        type: 'order', q: 'You finished a change to Kitchen Coach. Put a pro\'s routine in order, from stepping into the kitchen to the save point.',
        items: ['source .venv/bin/activate', 'ruff format .', 'ruff check --fix .', 'python -m pytest', 'git add .', 'git commit -m "Add Ben\'s shake to daily_kcal"'],
        why: 'Ruff and pytest live in the venv, so switch it on first (lesson 91). Format, then check, so the report is about real problems and not spacing (lesson 92). The taste tests make sure every answer is still right after those edits (lesson 89). Only then put it on the tray and stamp the save point (lesson 93).',
        hint: 'You cannot reach Ruff or pytest before the kitchen is on. And you save only what you have checked.'
      },
      {
        type: 'pick', q: 'mypy read <code>labels.py</code> and found 2 errors. Now you press <b>Run</b>. What does Python do?',
        pic: `<div style="width:100%;min-width:0">` + run(['goal: int = "lots"            # the label says int', 'print(goal, type(goal))', '', '', 'def protein_left(goal: int, eaten: int) -> int:', '    left: int = goal - eaten  # a label that adds nothing', '    return left', '', '', 'print(protein_left(140, 95))', 'print(protein_left(140.5, 95))  # a float: no complaint'], { title: 'labels.py' }) +
          term(['$ python3 -m mypy labels.py', 'labels.py:1: error: Incompatible types in assignment (expression has type "str", variable has type "int")  [assignment]', 'labels.py:11: error: Argument 1 to "protein_left" has incompatible type "float"; expected "int"  [arg-type]', 'Found 2 errors in 1 file (checked 1 source file)'], 'terminal, Python 3.15, mypy 2.4.1') + `</div>`,
        options: [
          "It prints all three lines, lots <class 'str'>, 45 and 45.5, with no error",
          'It stops on line 1 with a TypeError, because lots is not an int',
          'It refuses to start until the 2 errors are fixed',
          "It prints lots <class 'str'> and 45, then stops on line 11"
        ],
        answer: 0,
        why: 'Hints are labels, not locks. Python keeps them in <code>__annotations__</code> and never checks them while it runs, so a str goes into the jar labelled int, and 140.5 - 95 gives 45.5. mypy reads the labels <b>before</b> you run, but only when you run mypy. Nothing stops Python (lesson 90).',
        hint: 'Lesson 90, The catch: does Python itself read the labels when it runs?',
        hints: { 1: 'Python never checks a hint while it runs. Press Run and see.', 2: 'mypy and Python are separate. mypy reports, Python runs anyway.', 3: 'A float minus an int is a float. Nothing checks the label on goal.' }
      },
      {
        type: 'fix', q: 'Ben ate 140 g, 135 g and 150 g of protein this week, <b>425 g</b> in all. Kitchen Coach says 140, with no error. Find the first step that goes wrong (a <code>print(f"{day=} {total=}")</code> in the loop helps), and fix it so it prints <code>Ben ate 425 g of protein</code>.',
        code: ['def protein_week(days):', '    total = 0', '    for day, grams in days:', '        total = total + grams', '        return total', '', '', 'week = [("Mon", 140), ("Tue", 135), ("Wed", 150)]', 'print(f"Ben ate {protein_week(week)} g of protein")'],
        title: 'ben_week.py',
        check: [
          'f = globals().get("protein_week")',
          'lines = out.strip().splitlines()',
          'if not callable(f):',
          '    msg = "Keep the function  def protein_week(days):"',
          'elif not lines or lines[-1] != "Ben ate 425 g of protein":',
          '    msg = "It should end with: Ben ate 425 g of protein. How many times does the loop go round before return hands back the total?"',
          'elif len(lines) != 1:',
          '    msg = "425 g, well done. Now delete your debug print, so only the total is shown."',
          'elif f([("Thu", 100), ("Fri", 120)]) != 220 or f([]) != 0:',
          '    msg = "protein_week should add up any week: 100 g and 120 g make 220, and an empty week is 0."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>return total</code> sits inside the loop, so the function hands back the total after the <b>first</b> day and the loop never goes round again. A debug print shows only <code>day=\'Mon\' total=140</code>. Take 4 spaces off <code>return total</code>, so it lines up with <code>for</code> and runs once, after every day (lessons 45 and 88).',
        hint: 'Lesson 88: print the values in the loop. How many days do you see before the function ends?'
      },
      {
        type: 'fix', q: 'Kitchen Coach commits a <code>.env.example</code> with the names and <b>empty</b> values, so others know what to set (lesson 93). But this rule list hides it too. Change <b>one</b> rule so <code>.env.example</code> says <code>COMMIT</code>, and <code>.env</code> is still ignored.',
        code: ['from fnmatch import fnmatch', 'from pathlib import Path', '', '', ...IS_IGNORED, '', '', 'rules = [".venv/", "__pycache__/", "*.pyc", ".env*"]', 'for name in ["coach.py", ".env", ".env.example", ".venv/pyvenv.cfg", "tests/__pycache__/test_coach.cpython-315-pytest-9.2.0.pyc"]:', '    print("ignore" if is_ignored(Path(name), rules) else "COMMIT", name)'],
        title: 'which_files.py',
        check: [
          'from pathlib import Path',
          'f = globals().get("is_ignored")',
          'r = globals().get("rules")',
          'if not callable(f) or not isinstance(r, list):',
          '    msg = "Keep the function is_ignored and the list called rules."',
          'elif f(Path(".env.example"), r):',
          '    msg = ".env.example is still ignored. Which rule matches every name that starts with .env?"',
          'elif not f(Path(".env"), r):',
          '    msg = "Now .env, with the secret key, would be committed. Keep a rule that matches exactly .env."',
          'elif not f(Path(".venv/pyvenv.cfg"), r) or not f(Path("tests/__pycache__/test_coach.cpython-315-pytest-9.2.0.pyc"), r) or not f(Path("__pycache__/meal_planner.cpython-315.pyc"), r):',
          '    msg = "Keep the rules for .venv/, __pycache__/ and *.pyc."',
          'elif f(Path("coach.py"), r) or f(Path("tests/test_coach.py"), r):',
          '    msg = "Your own code must still be committed."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The <code>*</code> in <code>.env*</code> means "any letters", so it matches <code>.env.example</code> as well. The plain name <code>.env</code> matches that one file only. A rule that is too wide hides files you need, like <code>*.py</code> did in lesson 93.',
        hint: 'Lesson 93: what does the * add to .env? Which rule matches just the one secret file?'
      },
      {
        type: 'pick', q: 'Hard one. This is lesson 88\'s real pdb session, on the snack. By hand, Ana\'s total after the snack should be 650 + 820 + 510 = <b>1980</b>. Which line of <code>ana_day.py</code> is the step that goes wrong?',
        pic: `<div style="width:100%;min-width:0">` + code(ANA_BP, { title: 'ana_day.py' }) + term(PDB, 'terminal, Python 3.15') + `</div>`,
        options: ['Line 9: it adds the snack to total a second time', 'Line 7: it adds the snack to total the first time', 'Line 8: if meal == "snack":', 'Line 6: breakpoint() changes the total'],
        answer: 0,
        why: 'The arrow <code>-&gt;</code> shows the line pdb is <b>about to</b> run. After line 7 has run, <code>p total</code> says 1980: right. After line 9 has run (pdb is back at line 5), it says 2490: wrong. So line 9 is the first step that goes wrong. It was meant to be <code>snacks = snacks + kcal</code> (lesson 88).',
        hint: 'Lesson 88: pdb stops before it runs the line under the arrow. Which line had just run when total became 2490?',
        hints: { 1: 'After line 7 ran, p total said 1980. That is right by hand.', 2: 'An if only decides. It does not change total. Look at the next p total.', 3: 'breakpoint() only pauses. Compare the values before and after each n.' }
      },
      {
        type: 'fix', q: 'Chloe ate 110 g of protein, more than her goal of 90 g, and Coach told her <code>-20 g left</code>. The taste test that shows the bug is already written, and it fails. Fix <b>the function</b>, not the tests, so both say <code>PASSED</code>.',
        code: ['def protein_left(goal, eaten):', '    return goal - eaten', '', '', 'def test_chloe():', '    assert protein_left(90, 65) == 25', '', '', 'def test_chloe_over_goal():', '    assert protein_left(90, 110) == 0', ...RUNNER('test_chloe, test_chloe_over_goal')],
        title: 'protein_left.py',
        check: [
          'f = globals().get("protein_left")',
          't = globals().get("test_chloe_over_goal")',
          'def _bad(goal, eaten):',
          '    return goal - eaten',
          'def _still_catches():',
          '    g = t.__globals__',
          '    old = g.get("protein_left")',
          '    g["protein_left"] = _bad',
          '    try:',
          '        t()',
          '        return False',
          '    except AssertionError:',
          '        return True',
          '    except Exception:',
          '        return False',
          '    finally:',
          '        g["protein_left"] = old',
          'lines = out.strip().splitlines()',
          'if not callable(f) or not callable(t):',
          '    msg = "Keep  def protein_left(goal, eaten):  and the two test functions."',
          'elif lines != ["PASSED test_chloe", "PASSED test_chloe_over_goal"]:',
          '    msg = "Not both PASSED yet. When Chloe eats more than her goal, what is left should be 0, never below."',
          'elif not _still_catches():',
          '    msg = "The tests were right. Put test_chloe_over_goal back as it was, and change protein_left instead."',
          'elif f(140, 95) != 45 or f(140, 200) != 0 or f(90, 90) != 0:',
          '    msg = "protein_left(140, 95) should be 45, and protein_left(140, 200) should be 0. Did you change the rule, or only bend it to Chloe\'s numbers?"',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Write <code>return max(goal - eaten, 0)</code>. <code>max</code> picks the bigger of the two (lesson 31): 25 stays 25, and -20 becomes 0. This is the habit from lesson 89: a bug report becomes a test first, you see it fail, and then you fix the <b>code</b>, never the expected number.',
        hint: 'Lesson 89, Try it: which built-in picks the bigger of two numbers?'
      },
      {
        type: 'fix', q: 'Hardest one. Ana\'s food log says she ate <code>0 kcal</code>, with no error. Ruff, with the E rules on, flags two lines in <code>kcal_of</code>: <b>F821</b> on line 5 and <b>E722</b> on line 6. Fix both, so a word like <code>lots</code> still counts as 0, but a typo can never hide again. It should print <code>Ana ate 2090 kcal</code>.',
        code: ['def kcal_of(entry):', '    """One line of Ana\'s food log, like "lunch 820", gives 820."""', '    amount = entry.split()[1]', '    try:', '        return int(amont)', '    except:', '        return 0', '', '', 'log = ["breakfast 650", "lunch 820", "snack lots", "dinner 620"]', 'print("Ana ate", sum([kcal_of(line) for line in log]), "kcal")'],
        title: 'food_log.py',
        check: [
          'f = globals().get("kcal_of")',
          'class _Boom:',
          '    def __int__(self):',
          '        raise LookupError("boom")',
          'class _Odd:',
          '    def split(self):',
          '        return ["snack", _Boom()]',
          'if not callable(f):',
          '    msg = "Keep the function  def kcal_of(entry):"',
          'elif out.strip() != "Ana ate 2090 kcal":',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: Ana ate 2090 kcal. Read the name on line 5 letter by letter."',
          'elif f("snack lots") != 0:',
          '    msg = "A word like lots should still count as 0. Which error does int(\\"lots\\") raise? Catch that one."',
          'else:',
          '    try:',
          '        f(_Odd())',
          '        msg = "The typo is fixed, but every other error is still swallowed. A bare except (or except Exception) would hide the next typo too. Catch only ValueError."',
          '    except LookupError:',
          '        ok = True'
        ].join('\n'),
        why: 'Line 5 says <code>amont</code>, a name that does not exist (F821), and the bare <code>except:</code> on line 6 (E722) swallowed that NameError too, so every line counted as 0. Write <code>except ValueError:</code> first: now the NameError shows itself. Then fix <code>amont</code> to <code>amount</code>. 650 + 820 + 0 + 620 is 2090, and <code>int("lots")</code> still raises a ValueError that turns into 0 (lessons 53 and 92).',
        hint: 'Lesson 92, Try it: a bare except hides a typo. Which one error should this except catch?'
      }
    ]
  });
})();
