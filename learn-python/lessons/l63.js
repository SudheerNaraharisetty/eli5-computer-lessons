/* Lesson 63: pip and packages (module 5). One file per lesson.
   Terminal output checked with Python 3.15.2 (Homebrew, macOS), pip 26.2.2, tabulate 0.10.0, on 2026-11-23.
   The Run boxes were checked in this page (Pyodide, Python 3.14.2): tabulate is not one of Pyodide's packages. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l63  pip and packages
     ===================================================================== */

  // A book standing on a shelf: spine with a label written bottom to top (same as lesson 60).
  const book = (x, base, w, h, fill, label, txt) =>
    `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<text transform="translate(${x + w / 2 + 5} ${base - 10}) rotate(-90)" font-size="13" font-weight="800" fill="${txt || P.ink}">${label}</text>`;
  const plank = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="8" rx="3" fill="${P.ink}"/>`;
  // A small padlock.
  const lock = (x, y) =>
    `<path d="M${x - 9} ${y} v-8 a9 9 0 0 1 18 0 v8" fill="none" stroke="${P.danger}" stroke-width="4"/>` +
    `<rect x="${x - 14}" y="${y}" width="28" height="22" rx="4" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    `<circle cx="${x}" cy="${y + 10}" r="3" fill="${P.white}"/>`;

  /* ---- The idea: your shelf, the shop, and pip in between ---- */
  const shopSvg = svg(600, 330, 'Left: your shelf, the cookbooks that come free with Python: math, json, random, pathlib. None of them makes pretty tables. Right: PyPI, the Python Package Index, a shop with more than half a million cookbooks written by other people, among them tabulate. An arrow labelled pip carries tabulate from the shop to your computer.',
    T(140, 24, 'YOUR SHELF: comes with Python', { s: 13, f: P.ok }) +
    book(40, 200, 40, 120, P.warnT, 'math') + book(84, 200, 46, 138, P.tint, 'json') + book(134, 200, 40, 112, P.dangerT, 'random') + book(178, 200, 44, 128, P.okT, 'pathlib') +
    plank(28, 200, 206) +
    box(40, 222, 194, 40, P.white, 10) + T(137, 247, 'a pretty table? no', { s: 13, f: P.danger }) +
    T(460, 24, 'PyPI: the shop', { s: 13, f: P.accent }) +
    `<rect x="350" y="40" width="220" height="40" rx="6" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(460, 67, 'pypi.org', { s: 16, f: P.white, m: true }) +
    `<rect x="358" y="80" width="204" height="122" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    book(370, 196, 22, 90, P.sand, '') + book(396, 196, 22, 76, P.warnT, '') + book(422, 196, 40, 108, P.accent, 'tabulate', P.white) +
    book(466, 196, 22, 84, P.okT, '') + book(492, 196, 22, 96, P.dangerT, '') + book(518, 196, 22, 70, P.tint, '') +
    T(460, 226, 'more than 500,000 packages', { s: 12.5, w: 700, f: P.ink2 }) +
    T(460, 244, 'written by other people', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(440, 256, 398, 294, P.accent, 3) +
    box(270, 286, 120, 36, P.tint, 10) + T(330, 310, 'pip', { s: 16, m: true, f: P.accent }) +
    T(470, 312, 'carries it home', { s: 13, w: 700, f: P.ink2 }));

  // Module vs package: one file vs a folder of files.
  const pkgSvg = svg(600, 190, 'Left: a module is one .py file, like your kitchen.py from lesson 60. Right: a package is a folder of modules. The json you used in lesson 59 is really a folder called json, holding __init__.py, decoder.py, encoder.py, scanner.py and more. tabulate is a package too.',
    T(140, 24, 'A MODULE: one file', { s: 13, f: P.ink2 }) +
    box(60, 46, 160, 50, P.white, 10) + T(140, 77, 'kitchen.py', { s: 15, m: true }) +
    T(140, 124, 'lesson 60', { s: 12.5, w: 700, f: P.ink2 }) +
    T(430, 24, 'A PACKAGE: a folder of modules', { s: 13, f: P.ink2 }) +
    box(300, 40, 270, 140, P.warnT, 12) + T(318, 66, 'json/', { s: 15, m: true, a: 'start' }) +
    ['__init__.py', 'decoder.py', 'encoder.py', 'scanner.py'].map((f, i) => T(340, 92 + i * 22, f, { s: 13, m: true, a: 'start', f: P.ink2 })).join('') +
    T(500, 158, '... and more', { s: 12, w: 700, f: P.ink2 }));
  const ideaPic = `<div style="width:100%;min-width:0">${shopSvg}${pkgSvg}</div>`;

  /* ---- The code: Kitchen Coach wants tabulate ---- */
  const benTable = [
    'from tabulate import tabulate',
    '',
    'meals = [',
    '    ["Breakfast", "Greek yogurt", 20],',
    '    ["Lunch", "Lentil soup", 18],',
    '    ["Dinner", "Tofu stir-fry", 32],',
    ']',
    'print(tabulate(meals, headers=["Meal", "Dish", "Protein (g)"]))'
  ];
  const TABLE = [
    'Meal       Dish             Protein (g)',
    '---------  -------------  -------------',
    'Breakfast  Greek yogurt              20',
    'Lunch      Lentil soup               18',
    'Dinner     Tofu stir-fry             32'
  ];
  const notFound = [
    '$ python3 ben_table.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/ben_table.py", line 1, in <module>',
    '    from tabulate import tabulate',
    "ModuleNotFoundError: No module named 'tabulate'"
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(benTable, { title: 'ben_table.py' })}` +
    term(['# what Ben wants to see, once tabulate is installed'].concat(TABLE), 'the goal') +
    term(notFound, 'terminal, Python 3.15, on a fresh computer') + `</div>`;

  /* ---- The pain: pip install into the shared Python ---- */
  const pep668 = [
    '$ python3 -m pip install tabulate',
    'error: externally-managed-environment',
    ' ',
    '× This environment is externally managed',
    '╰─> To install Python packages system-wide, try brew install',
    '    xyz, where xyz is the package you are trying to',
    '    install.',
    ' ',
    "    If you wish to install a Python library that isn't in Homebrew,",
    '    use a virtual environment:',
    ' ',
    '    python3 -m venv path/to/venv',
    '    source path/to/venv/bin/activate',
    '    python3 -m pip install xyz',
    '# ... 19 more lines of advice ...',
    'hint: See PEP 668 for the detailed specification.'
  ];
  const sharedSvg = svg(600, 200, 'One shared shelf with a padlock, used by your Mac\'s own tools and by every one of your projects: Kitchen Coach, Ana\'s planner and Chloe\'s dessert app. If Kitchen Coach squeezes a new book onto it, or swaps a book for another version, something else on the shelf can break.',
    T(300, 24, 'ONE SHARED SHELF FOR EVERYTHING', { s: 13, f: P.danger }) +
    book(150, 150, 40, 100, P.sand, 'brew') + book(194, 150, 36, 86, P.sand, 'tools') + book(234, 150, 44, 110, P.tint, 'json') +
    book(282, 150, 40, 96, P.okT, 'math') + book(326, 150, 50, 116, P.warnT, 'pip') +
    plank(136, 150, 256) + lock(420, 96) +
    box(450, 80, 130, 40, P.dangerT, 10) + T(515, 105, 'do not touch', { s: 13, f: P.danger }) +
    ['Kitchen Coach', 'Ana\'s planner', 'Chloe\'s desserts'].map((n, i) => box(24 + i * 192, 164, 168, 30, P.white, 8) + T(108 + i * 192, 184, n, { s: 12.5 })).join(''));
  const painPic = `<div style="width:100%;min-width:0">${term(pep668, 'terminal, Homebrew Python 3.15 on a Mac')}${sharedSvg}</div>`;

  /* ---- The fix: a venv, your own small shelf ---- */
  const venvSvg = svg(600, 250, 'The kitchen-coach project folder holds ben_table.py and a box called .venv: its own small shelf. tabulate goes on that small shelf, not on the shared shelf, which keeps its padlock.',
    box(24, 20, 400, 216, P.white, 14) + T(44, 50, 'kitchen-coach/', { s: 15, m: true, a: 'start' }) +
    box(44, 70, 150, 34, P.tint, 8) + T(119, 93, 'ben_table.py', { s: 13, m: true }) +
    `<rect x="214" y="66" width="190" height="154" rx="12" fill="${P.okT}" stroke="${P.ok}" stroke-width="3" stroke-dasharray="8 6"/>` +
    T(309, 92, '.venv/', { s: 15, m: true, f: P.ok }) +
    book(236, 196, 24, 64, P.sand, '') + book(264, 196, 22, 56, P.warnT, '') + book(290, 196, 44, 92, P.accent, 'tabulate', P.white) +
    plank(226, 196, 166) +
    T(119, 150, 'its own small', { s: 13, w: 700, f: P.ok }) + T(119, 170, 'shelf, right here', { s: 13, w: 700, f: P.ok }) +
    arrow(186, 160, 222, 160, P.ok, 2.5) +
    book(470, 160, 30, 80, P.sand, '') + book(504, 160, 32, 90, P.tint, '') + book(540, 160, 30, 72, P.okT, '') +
    plank(458, 160, 124) + lock(520, 190) +
    T(520, 240, 'shared shelf', { s: 12.5, w: 700, f: P.ink2 }));
  const fixMac = [
    '$ python3 -m venv .venv',
    '$ source .venv/bin/activate',
    '# the prompt now starts with (.venv): the venv is switched on',
    '$ python3 -m pip install tabulate',
    'Collecting tabulate',
    '  Downloading tabulate-0.10.0-py3-none-any.whl.metadata (40 kB)',
    'Downloading tabulate-0.10.0-py3-none-any.whl (39 kB)',
    'Installing collected packages: tabulate',
    'Successfully installed tabulate-0.10.0',
    '$ python3 ben_table.py'
  ].concat(TABLE);
  const fixWin = [
    '$ py -m venv .venv',
    '$ .venv\\Scripts\\activate',
    '$ python -m pip install tabulate',
    '$ python ben_table.py'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${venvSvg}${term(fixMac, 'terminal, Mac or Linux, Python 3.15')}${term(fixWin, 'the same on Windows')}</div>`;

  /* ---- Try it: a plain table with f-strings, and a safe import ---- */
  const plain = [
    'meals = [',
    '    ("Breakfast", "Greek yogurt", 20),',
    '    ("Lunch", "Lentil soup", 18),',
    '    ("Dinner", "Tofu stir-fry", 32),',
    ']',
    '',
    'print(f"{\'Meal\':<11}{\'Dish\':<15}{\'Protein (g)\':>11}")',
    'print("-" * 37)',
    'for meal, dish, grams in meals:',
    '    print(f"{meal:<11}{dish:<15}{grams:>11}")'
  ];
  const safe = [
    'try:',
    '    from tabulate import tabulate',
    'except ModuleNotFoundError:',
    '    tabulate = None',
    '',
    'meals = [["Lunch", "Lentil soup", 18], ["Dinner", "Tofu stir-fry", 32]]',
    '',
    'if tabulate is None:',
    '    print("No tabulate here. Plain version:")',
    '    for meal, dish, grams in meals:',
    '        print(f"{meal:<8}{dish:<15}{grams:>3} g")',
    'else:',
    '    print(tabulate(meals, headers=["Meal", "Dish", "Protein (g)"]))'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(plain, { title: 'ben_plain.py' })}${run(safe, { title: 'ben_safe.py' })}` +
    term(['$ python3 ben_safe.py', 'Meal    Dish             Protein (g)', '------  -------------  -------------', 'Lunch   Lentil soup               18', 'Dinner  Tofu stir-fry             32'], 'the same ben_safe.py, in a venv with tabulate') + `</div>`;

  /* ---- The catch: the wrong Python, and Ben's laptop ---- */
  const wrongPy = [
    '$ deactivate',
    '$ python3 ben_table.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/ben_table.py", line 1, in <module>',
    '    from tabulate import tabulate',
    "ModuleNotFoundError: No module named 'tabulate'"
  ];
  const freeze = [
    '$ source .venv/bin/activate',
    '$ python3 -m pip list',
    'Package  Version',
    '-------- -------',
    'pip      26.2.2',
    'tabulate 0.10.0',
    '$ python3 -m pip freeze > requirements.txt',
    '$ cat requirements.txt',
    'tabulate==0.10.0'
  ];
  const bens = [
    '$ python3 -m venv .venv',
    '$ source .venv/bin/activate',
    '$ python3 -m pip install -r requirements.txt',
    'Collecting tabulate==0.10.0 (from -r requirements.txt (line 1))',
    '# ... download lines ...',
    'Successfully installed tabulate-0.10.0'
  ];
  const listSvg = svg(600, 150, 'requirements.txt is a shopping list. Your laptop writes it with pip freeze. Ben\'s laptop reads it with pip install -r and gets exactly the same books, tabulate version 0.10.0.',
    box(16, 30, 150, 90, P.white, 10) + T(91, 64, 'your laptop', { s: 14 }) + T(91, 92, 'pip freeze >', { s: 13, m: true, f: P.ink2 }) +
    arrow(170, 76, 200, 76, P.ink, 2.5) +
    `<path d="M206 18 h188 v114 h-188 z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(300, 44, 'requirements.txt', { s: 13, m: true }) + T(300, 84, 'tabulate==0.10.0', { s: 13, m: true, f: P.accent }) +
    T(300, 116, 'the shopping list', { s: 12, w: 700, f: P.ink2 }) +
    arrow(400, 76, 430, 76, P.ink, 2.5) +
    box(434, 30, 150, 90, P.okT, 10) + T(509, 64, 'Ben\'s laptop', { s: 14 }) + T(509, 92, 'pip install -r', { s: 13, m: true, f: P.ok }));
  const catchPic = `<div style="width:100%;min-width:0">${term(wrongPy, 'terminal: the venv is switched off')}${term(freeze, 'terminal: write the shopping list')}${listSvg}${term(bens, 'terminal, on Ben\'s laptop')}</div>`;

  COURSE.add({
    id: 'l63', minutes: 15,
    summary: 'The cookbooks that come with Python are free, so check them first. When you need more, <b>PyPI</b> (the Python Package Index, <code>pypi.org</code>) is a shop of packages other people wrote, and <b>pip</b> carries one home: <code>python3 -m pip install tabulate</code>. A <b>module</b> is one <code>.py</code> file; a <b>package</b> is a folder of modules. Never install into the Python everyone shares. Make a <b>virtual environment</b> per project, your own small shelf: <code>python3 -m venv .venv</code>, switch it on with <code>source .venv/bin/activate</code> (Windows: <code>.venv\\Scripts\\activate</code>), then pip install. Pick the <code>.venv</code> Python in VS Code. <code>pip freeze &gt; requirements.txt</code> writes a shopping list, and <code>pip install -r requirements.txt</code> buys the same books on another computer.',
    video: {
      src: 'videos/l63-pip-and-packages.mp4', poster: 'videos/l63-pip-and-packages.jpg', length: '1 min 8 s',
      script: [
        'Ben wants Kitchen Coach to print his protein as a neat table.',
        'The free cookbooks that come with Python have no table book.',
        'But PyPI does. A shop with half a million cookbooks, written by other cooks.',
        'Import tabulate, and Python says: no module named tabulate. The book is not on your shelf.',
        'So you ask pip to carry it home. python3 -m pip install tabulate.',
        'On a Mac with Homebrew, it refuses. Externally managed environment. That shelf is shared. Do not touch.',
        'The fix is your own small shelf, right next to the project. A virtual environment.',
        'python3 -m venv .venv makes it. Activate switches it on.',
        'Now pip install works, and the table appears.',
        'For Ben\'s laptop, pip freeze writes a shopping list, requirements.txt. Ben buys the same books with one command.',
        'Free cookbooks first. When you need more, make a venv, and pip install.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The free cookbooks do not have everything.',
        text: [
          'Ben wants Kitchen Coach to print his protein per meal as a <b>neat table</b>, with lined-up columns and a header. You check the cookbooks that come free with Python first (lesson 61, The standard library). There is <code>json</code>, <code>math</code>, <code>random</code>, <code>pathlib</code>... but no book that draws tables.',
          'Other cooks have written one. <b>PyPI</b>, the <b>Python Package Index</b> at <code>pypi.org</code>, is a shop with more than half a million cookbooks that people share for free. One of them is <code>tabulate</code>. It turns a list of rows into a table.',
          '<b>pip</b> is the tool that carries a book from the shop to your computer. It comes with Python. You will use it in a terminal, not in your code.',
          'A word you will see a lot: <b>package</b>. A <b>module</b> is one <code>.py</code> file, like your <code>kitchen.py</code> in lesson 60. A <b>package</b> is a <b>folder</b> of modules. The <code>json</code> you used in lesson 59 is really a folder. You import both the same way. People also call anything you download from PyPI "a package".'
        ],
        tip: 'You never type the shop\'s address. pip knows where PyPI is. You only need the package\'s exact name.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'import tabulate: the book is not on your shelf.',
        text: [
          'Here is the code Ben wants. <code>from tabulate import tabulate</code> takes the <code>tabulate</code> card out of the <code>tabulate</code> book (yes, same name twice). The card takes a list of rows and the column names, and gives back the whole table as text. You <code>print</code> it.',
          'Press <b>Run</b>. It stops on line 1 with <code>ModuleNotFoundError: No module named \'tabulate\'</code>, the same error as a misspelt module in lesson 60. This time the spelling is right. The book is simply <b>not on your shelf</b>.',
          'Your own Python 3.15 says exactly the same on a fresh computer. Python does not go shopping by itself. Somebody has to bring the book home first.'
        ],
        tip: 'The Python in this page can fetch a few popular packages by itself when you import them, from its own small shop. tabulate is not one of them, so in this page you get the same error as on a fresh computer.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'pip install, and a locked shelf.',
        text: [
          'In the terminal you type <code>python3 -m pip install tabulate</code>. Read it as: "Python 3, run your own <b>pip</b> module, and install tabulate". The <code>-m pip</code> part matters. Your computer can have several Pythons (lesson 2). <code>python3 -m pip</code> uses the pip that belongs to <b>this</b> <code>python3</code>, so the book lands on the shelf of the Python that will run your code. On Windows it is <code>py -m pip</code>.',
          'With Python from <b>Homebrew</b> on a Mac, or on many Linux systems like Ubuntu and Debian, pip refuses: <code>error: externally-managed-environment</code>. That Python is a <b>shared shelf</b>. Your Mac\'s own tools and every one of your projects use it. Squeeze a new book onto it, or swap one for another version, and something else can break. So the shelf has a lock.',
          'If you installed Python from python.org like in lesson 2, pip may not refuse. It puts the book on the shared shelf anyway. That works today, until Ana\'s planner needs an older version of the same book. One shelf can only hold one version.'
        ],
        warn: 'The message mentions <code>--break-system-packages</code>. Do not use it, and do not use <code>sudo</code> with pip. Both force the book onto the shared shelf. The real fix is the next part.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A virtual environment: your own small shelf.',
        text: [
          'Give each project its <b>own small shelf</b>, right next to its code. That shelf is called a <b>virtual environment</b>, or <b>venv</b>. In the terminal, in your project folder:',
          '1. <code>python3 -m venv .venv</code> makes it: a folder called <code>.venv</code> with its own Python and its own pip. The dot at the start of the name is just a habit. It keeps the folder out of the way.',
          '2. <code>source .venv/bin/activate</code> <b>switches it on</b> for this terminal. On Windows: <code>.venv\\Scripts\\activate</code>. The prompt now starts with <code>(.venv)</code>, and <code>python3</code> means the Python in <code>.venv</code>.',
          '3. <code>python3 -m pip install tabulate</code>. No lock this time: the book goes on the small shelf. <code>python3 ben_table.py</code> prints Ben\'s table.',
          '4. In VS Code, open the Command Palette and run <b>Python: Select Interpreter</b> (lesson 2). Pick the one in <code>.venv</code>. Now the Run button uses the small shelf too. To switch the venv off in a terminal, type <code>deactivate</code>.'
        ],
        tip: 'One venv per project, made once. Lesson 91, Virtual environments, shows more about them. Some people use <b>uv</b>, a newer and very fast tool that does these same jobs. The steps here work everywhere.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'A plain table, and a program that never crashes.',
        text: [
          'No package needed for a simple table: lesson 15 lined up columns with f-string widths. Press <b>Run</b> on <code>ben_plain.py</code>. <code>:&lt;11</code> fills 11 characters with the text on the left, <code>:&gt;11</code> pushes the number to the right. <code>for meal, dish, grams in meals:</code> unpacks each row into three jars, like lesson 36.',
          'Now add Ben\'s snack: a new row <code>("Snack", "Peanut butter", 8)</code>, and run it again. Then add a total: <code>total = 0</code> before the loop, <code>total = total + grams</code> inside it, and print it after. It should be <b>78</b>.',
          'Then press <b>Run</b> on <code>ben_safe.py</code>. It tries the import under <code>try</code> (lesson 53). This page has no tabulate, so the <code>except ModuleNotFoundError</code> net catches it, sets <code>tabulate = None</code>, and the plain version prints. On a computer with tabulate in its venv, the same file prints the real table, as the terminal below shows.'
        ],
        tip: 'The plain f-string table is fine for three rows. A package pays off when the job gets bigger: many columns, long names, borders. That is the rule: <b>free cookbooks first</b>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'The wrong Python, and Ben\'s laptop.',
        text: [
          '<b>"I installed it, but it still says ModuleNotFoundError."</b> Nearly always, the code ran with a <b>different Python</b>: a new terminal where the venv is not switched on, or VS Code still set to the old interpreter. The book is on the small shelf, but this Python looks at the shared one. Switch the venv on, or pick the <code>.venv</code> interpreter in VS Code.',
          '<b>Ben wants to run Kitchen Coach on his laptop.</b> Do not send him your <code>.venv</code> folder: it only works on your computer. Send a <b>shopping list</b> instead. <code>python3 -m pip list</code> shows what is on your small shelf. <code>python3 -m pip freeze &gt; requirements.txt</code> writes it to a file, with exact versions: <code>tabulate==0.10.0</code>. The <code>&gt;</code> sends what a command prints into a file.',
          'On his laptop, Ben makes his own venv, switches it on, and runs <code>python3 -m pip install -r requirements.txt</code>. The <code>-r</code> means "read the list from this file". He gets the very same books.',
          '<b>Spell names exactly.</b> Anyone can put a package on PyPI, and some bad ones use names one letter away from popular ones. Copy the name from the package\'s page on pypi.org.'
        ],
        warn: 'A package is code written by strangers that runs on your computer. Install only what you need, from names you checked. Free cookbooks first.'
      }
    ],
    exercises: [
      {
        file: 'l63_ben_table.py', title: 'Ben\'s protein table',
        task: 'Kitchen Coach prints Ben\'s table with <code>tabulate</code>. Make it <b>polite</b>: when tabulate is not installed, print the install steps (already written for you as <code>HOW_TO_INSTALL</code>) instead of crashing. When it is installed, print the table. The check runs your code twice, on a pretend computer without tabulate and on one with it. Next to it is <code>l63_requirements.txt</code>, the shopping list.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. STEP 1 shows the red <code>ModuleNotFoundError</code>, and the check gives a hint.',
          'Between <code>START</code> and <code>END</code>: put the import under <code>try:</code>, catch <code>ModuleNotFoundError</code>, and set <code>tabulate = None</code> there. Then <code>if tabulate is None:</code> print <code>HOW_TO_INSTALL</code>, <code>else:</code> print the table. Save and run until it says <code>PASS</code>.',
          'Now do it for real. Follow the 5 steps your program prints: make a <code>.venv</code> in the exercises folder, switch it on, and run <code>python3 -m pip install -r l63_requirements.txt</code>.',
          'Pick the <code>.venv</code> interpreter in VS Code and run the file again. STEP 1 now shows Ben\'s real table.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Back to lessons 59 and 61. Which of these come <b>free with Python</b>, and which need <code>pip install</code> first?',
        buckets: ['Comes with Python', 'Needs pip install'],
        items: [
          ['json', 0],
          ['math', 0],
          ['random', 0],
          ['pathlib', 0],
          ['tabulate', 1],
          ['rich', 1]
        ],
        why: '<code>json</code>, <code>math</code>, <code>random</code> and <code>pathlib</code> are in the standard library: you just import them. <code>tabulate</code> and <code>rich</code> (another table and colour package) live on PyPI, so pip has to bring them home first.',
        hint: 'Which ones did earlier lessons import without installing anything?'
      },
      {
        type: 'pick', q: 'What is the difference between a <b>module</b> and a <b>package</b>?',
        options: ['A module is one .py file. A package is a folder of modules.', 'A module comes with Python. A package always comes from PyPI.', 'A package is one .py file. A module is a folder.', 'There is none: they are two words for one .py file.'],
        answer: 0,
        why: 'A module is one file, like <code>kitchen.py</code>. A package is a folder of modules, like <code>json</code>, which holds <code>decoder.py</code>, <code>encoder.py</code> and more. Both come with Python sometimes, and both can come from PyPI.',
        hint: 'Think of json in lesson 59: one file, or a folder?'
      },
      {
        type: 'pick', q: 'On a Mac with Homebrew Python, <code>python3 -m pip install tabulate</code> stops with <code>error: externally-managed-environment</code>. What do you do?',
        options: ['Make a venv in the project, switch it on, and pip install there', 'Run it again with --break-system-packages', 'Run it again with sudo in front', 'Give up: tabulate does not work on a Mac'],
        answer: 0,
        why: 'That Python is a shared shelf with a lock. Forcing the book onto it can break other tools. A venv is the project\'s own small shelf: <code>python3 -m venv .venv</code>, <code>source .venv/bin/activate</code>, then pip install.',
        hint: 'The error message itself suggests a virtual environment.'
      },
      {
        type: 'order', q: 'A new project on a Mac. Put the steps in order, so <code>ben_table.py</code> prints the table.',
        items: ['python3 -m venv .venv', 'source .venv/bin/activate', 'python3 -m pip install tabulate', 'python3 ben_table.py'],
        why: 'Make the small shelf, switch it on, put the book on it, then cook. Switch it on before you install, or the book goes to the wrong shelf.',
        hint: 'You cannot switch on a venv that does not exist yet.'
      },
      {
        type: 'match', q: 'Match each command to what it does.',
        pairs: [
          ['python3 -m venv .venv', 'Makes a new small shelf called .venv'],
          ['python3 -m pip install tabulate', 'Brings tabulate home from PyPI'],
          ['python3 -m pip freeze > requirements.txt', 'Writes the shopping list, with exact versions'],
          ['python3 -m pip install -r requirements.txt', 'Buys every book on the shopping list'],
          ['deactivate', 'Switches the venv off in this terminal']
        ],
        why: 'venv makes the shelf. pip install fills it. freeze writes down what is on it. install -r fills another shelf from that list. deactivate switches the shelf off.',
        hint: 'Start with the one that has -r: r for "read the list".'
      },
      {
        type: 'fix', q: 'This page has no tabulate, so this stops with <code>ModuleNotFoundError</code>. Make it print <code>Please pip install tabulate</code> instead of crashing. Keep the table line for computers that have it.',
        code: ['from tabulate import tabulate', '', 'meals = [["Lunch", "Lentil soup", 18]]', 'print(tabulate(meals))'],
        title: 'ben_table.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Please pip install tabulate"]:',
          '    ok = True',
          'elif "Please pip install tabulate" in out:',
          '    msg = "Close. Print only that one line, exactly: Please pip install tabulate"',
          'else:',
          '    msg = "It should print exactly: Please pip install tabulate. It printed: " + (out.strip() or "nothing")'
        ].join('\n'),
        why: 'Put the import under <code>try:</code> and catch <code>ModuleNotFoundError</code> (lessons 53 and 60). Then only print the table when tabulate is there, for example with <code>tabulate = None</code> in the except and <code>if tabulate is None:</code> ... <code>else:</code>.',
        hint: '<code>try:</code>, the import pushed in by 4 spaces, then <code>except ModuleNotFoundError:</code>. If you print the message there, the table line still runs. Use <code>tabulate = None</code> and an if.'
      },
      {
        type: 'pick', q: 'You made a venv and installed tabulate in it. In the terminal, <code>python3 ben_table.py</code> works. But the VS Code Run button says <code>ModuleNotFoundError: No module named \'tabulate\'</code>. Why?',
        options: ['VS Code runs a different Python. Pick the .venv one with Python: Select Interpreter.', 'tabulate was installed wrong. Install it again.', 'VS Code cannot use packages from PyPI.', 'The file must be renamed to tabulate.py.'],
        answer: 0,
        why: 'The book is on the small shelf in <code>.venv</code>, but VS Code is still cooking with the shared Python. Point VS Code at <code>.venv</code> and it finds the book. And never name your own file <code>tabulate.py</code>: lesson 60 showed why.',
        hint: 'Which stove is VS Code using? (lesson 2)'
      },
      {
        type: 'type', q: 'Type the command that makes a virtual environment called <code>.venv</code> on a Mac.',
        prompt: '$',
        answers: ['python3 -m venv .venv'],
        why: '<code>python3 -m venv .venv</code>: "Python 3, run your venv module, and make a small shelf called <code>.venv</code>". On Windows: <code>py -m venv .venv</code>.',
        hint: 'It looks like the pip command: python3, then -m, then the name of the tool, then the folder name.'
      }
    ]
  });
})();
