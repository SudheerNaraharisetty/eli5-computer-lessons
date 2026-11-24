/* Lesson 94: Packaging (module 8). One file per lesson.
   Terminal output checked with Python 3.15.2 (Homebrew, macOS), pip 26.2.2, build 1.6.1, hatchling 1.33.0, uv 0.11.5,
   on 2026-11-23, in throwaway venvs in a scratch folder. Only paths were changed in the pictures: the project shows as
   /Users/you/kitchen-coach and Ben's laptop as /Users/ben. The "can't open file" line starts with the long path of the
   Homebrew Python program, shortened here to "python3:". Long pip and build output is cut where marked "# ...".
   The wheel listing (python -m zipfile -l) is shown without its date and size columns.
   The Run boxes were checked with Python 3.14 and in this page (Pyodide, Python 3.14): tomllib is in Pyodide. */
(function () {
  const { P, code, run, term, svg, box, T, arrow, esc } = PR;

  /* =====================================================================
     l94  Packaging
     ===================================================================== */

  // A terminal like term(), plus "(.venv) $ " lines: the prompt of a switched-on venv (as in lesson 91).
  const vterm = (lines, title) => {
    const body = lines.map(l => {
      if (l.startsWith('(.venv) $ ')) return `<div class="ln o"><span style="color:#7CF0B5;font-weight:700">(.venv) $ </span><span style="color:#fff;font-weight:700">${esc(l.slice(10))}</span></div>`;
      if (l.startsWith('$ ')) return `<div class="ln c">${esc(l.slice(2))}</div>`;
      if (l.startsWith('# ')) return `<div class="ln m">${esc(l)}</div>`;
      return `<div class="ln o">${esc(l)}</div>`;
    }).join('');
    return `<div class="term"><div class="tb"><i></i><i></i><i></i><span>${esc(title || 'terminal')}</span></div><div class="tbody">${body}</div></div>`;
  };
  const stack = (...pics) => `<div style="width:100%;min-width:0">${pics.join('')}</div>`;

  // The real project, file by file.
  const PYPROJECT = [
    '[build-system]',
    'requires = ["hatchling"]',
    'build-backend = "hatchling.build"',
    '',
    '[project]',
    'name = "kitchen-coach"',
    'version = "0.1.0"',
    'description = "Today\'s meal plan for Ana, Ben and Chloe"',
    'readme = "README.md"',
    'requires-python = ">=3.14"',
    'dependencies = []',
    '',
    '[project.scripts]',
    'kitchen-coach = "kitchen_coach.cli:main"'
  ];
  const PLANS = [
    'PLANS = {',
    '    "ana": "rice bowl, 195 kcal, 2 hours before her run",',
    '    "ben": "tofu and lentils, 43.5 g protein",',
    '    "chloe": "gluten-free brownie after dinner",',
    '}',
    '',
    '',
    'def plan_for(name):',
    '    return PLANS.get(name.lower(), "no plan yet")'
  ];
  const INIT = '"""Kitchen Coach: today\'s meal plan for Ana, Ben and Chloe."""\n';
  const PKG = { 'kitchen_coach/__init__.py': INIT, 'kitchen_coach/plans.py': PLANS.join('\n') + '\n' };
  const CLI = [
    'import sys',
    '',
    'from kitchen_coach.plans import PLANS, plan_for',
    '',
    '',
    'def main():',
    '    names = sys.argv[1:]',
    '    if not names:',
    '        names = list(PLANS)',
    '    print("Kitchen Coach: today\'s plan")',
    '    for name in names:',
    '        print(f"  {name.title():<6} {plan_for(name)}")'
  ];

  // A recipe page, tilted a little: a white card with a file name and three grey lines.
  const page = (x, y, rot, name, col) =>
    `<g transform="rotate(${rot} ${x + 60} ${y + 45})">` + box(x, y, 120, 90, P.white, 8) +
    T(x + 60, y + 24, name, { s: 13, m: true, f: col || P.ink }) +
    [42, 58, 74].map(yy => `<rect x="${x + 14}" y="${y + yy}" width="${yy === 74 ? 60 : 92}" height="6" rx="3" fill="${P.sand}"/>`).join('') + `</g>`;

  /* ---- The idea: loose pages, or a bound cookbook with a cover ---- */
  const ideaSvg = svg(600, 330, 'Left, before: a zip of loose recipe pages, coach.py and plans.py, with a sticky note that says also pip install these, and run python3 coach.py from this folder only. Right, after: one bound cookbook. Its cover page is pyproject.toml, and it says name kitchen-coach, version 0.1.0, needs Python 3.14 or newer, and command kitchen-coach. An arrow from left to right says python -m build. Under the book: Ben types pip install, then kitchen-coach.',
    T(130, 22, 'BEFORE: a zip of loose pages', { s: 13, f: P.danger }) +
    page(14, 44, -6, 'coach.py') + page(120, 58, 5, 'plans.py') +
    `<g transform="rotate(-3 130 230)">${box(30, 176, 210, 96, P.warnT, 6)}` +
    T(135, 202, 'note for Ben:', { s: 12.5, f: P.warn }) +
    T(135, 226, '"also pip install these"', { s: 12, w: 700, f: P.ink2 }) +
    T(135, 248, '"run it from this folder"', { s: 12, w: 700, f: P.ink2 }) + `</g>` +
    T(130, 310, 'breaks on his laptop', { s: 12.5, f: P.danger }) +
    arrow(262, 150, 318, 150, P.accent, 3) + T(290, 132, 'build', { s: 12, m: true, f: P.accent }) +
    T(458, 22, 'AFTER: one bound cookbook', { s: 13, f: P.ok }) +
    `<rect x="338" y="44" width="16" height="230" rx="5" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    box(350, 40, 230, 236, P.white, 10) +
    T(465, 66, 'pyproject.toml', { s: 13, m: true, f: P.accent }) + T(465, 84, 'the cover page', { s: 11.5, w: 700, f: P.ink2 }) +
    `<line x1="366" y1="96" x2="564" y2="96" stroke="${P.sand}" stroke-width="3"/>` +
    T(366, 124, 'name', { s: 12, w: 700, a: 'start', f: P.ink2 }) + T(564, 124, 'kitchen-coach', { s: 12.5, m: true, a: 'end' }) +
    T(366, 156, 'version', { s: 12, w: 700, a: 'start', f: P.ink2 }) + T(564, 156, '0.1.0', { s: 12.5, m: true, a: 'end' }) +
    T(366, 188, 'needs', { s: 12, w: 700, a: 'start', f: P.ink2 }) + T(564, 188, 'Python >=3.14', { s: 12.5, m: true, a: 'end' }) +
    T(366, 220, 'command', { s: 12, w: 700, a: 'start', f: P.ink2 }) + T(564, 220, 'kitchen-coach', { s: 12.5, m: true, a: 'end', f: P.ok }) +
    T(465, 256, 'contents: src/kitchen_coach/', { s: 11.5, m: true, f: P.ink2 }) +
    box(350, 290, 230, 32, P.okT, 8) + T(465, 311, 'Ben: pip install, then kitchen-coach', { s: 11.5, f: P.ok }));
  const cover = [
    'import tomllib',
    '',
    'cover = """',
    '[project]',
    'name = "kitchen-coach"',
    'version = "0.1.0"',
    'requires-python = ">=3.14"',
    '',
    '[project.scripts]',
    'kitchen-coach = "kitchen_coach.cli:main"',
    '"""',
    '',
    'book = tomllib.loads(cover)',
    'project = book["project"]',
    'print("Name:    ", project["name"])',
    'print("Version: ", project["version"])',
    'print("Needs:    Python", project["requires-python"])',
    'for command, target in project["scripts"].items():',
    '    print(f"Command:  {command}  runs  {target}")'
  ];
  const ideaPic = stack(ideaSvg, run(cover, { title: 'read_cover.py' }));

  /* ---- The code: the layout, the cover page, the command ---- */
  const layout = [
    'kitchen-coach/              # the project folder',
    '    pyproject.toml          # the cover page',
    '    README.md               # the blurb on the back',
    '    src/',
    '        kitchen_coach/      # the package: import kitchen_coach',
    '            __init__.py     # "this folder is a package"',
    '            plans.py        # the recipes',
    '            cli.py          # main(): what the command runs',
    '    tests/',
    '        test_plans.py       # taste tests, they stay home'
  ];
  const scriptSvg = svg(600, 150, 'The line kitchen-coach = "kitchen_coach.cli:main" read in three pieces. Left of the equals sign: the command Ben types, kitchen-coach, with a hyphen. Right: the module kitchen_coach.cli, written with dots like an import, with an underscore. After the colon: the function to call, main.',
    T(300, 34, 'kitchen-coach = "kitchen_coach.cli:main"', { s: 19, m: true }) +
    arrow(110, 54, 96, 92, P.ok, 2.5) + T(96, 112, 'the command', { s: 13, f: P.ok }) + T(96, 132, 'Ben types', { s: 12, w: 700, f: P.ink2 }) +
    arrow(322, 54, 300, 92, P.accent, 2.5) + T(300, 112, 'the module', { s: 13, f: P.accent }) + T(300, 132, 'kitchen_coach/cli.py', { s: 12, m: true, f: P.ink2 }) +
    arrow(484, 54, 504, 92, P.warn, 2.5) + T(504, 112, 'the function', { s: 13, f: P.warn }) + T(504, 132, 'main()', { s: 12, m: true, f: P.ink2 }));
  const codePic = stack(code(layout, { title: 'the project folder' }),
    code(PYPROJECT, { title: 'pyproject.toml', hi: [6, 7, 10, 14] }), scriptSvg,
    code(CLI, { title: 'src/kitchen_coach/cli.py', hi: [6] }), code(PLANS, { title: 'src/kitchen_coach/plans.py' }));

  /* ---- The pain: a zip of .py files and a note ---- */
  const zipNote = [
    '# kitchen-coach.zip, for Ben',
    '#   coach.py',
    '#   plans.py',
    '#   NOTE.txt: "Also pip install these. Then run',
    '#              python3 coach.py from this folder."'
  ];
  const bensTries = [
    '# Ben unzipped it into Downloads. His terminal starts at home.',
    '$ python3 coach.py ben',
    "python3: can't open file '/Users/ben/coach.py': [Errno 2] No such file or directory",
    '# he moves coach.py to his Desktop, to find it fast',
    '$ python3 Desktop/coach.py ben',
    'Traceback (most recent call last):',
    '  File "/Users/ben/Desktop/coach.py", line 3, in <module>',
    '    from plans import PLANS, plan_for',
    "ModuleNotFoundError: No module named 'plans'",
    '$ cd Downloads/kitchen-coach',
    '$ python3 coach.py ben',
    "Kitchen Coach: today's plan",
    '  Ben    tofu and lentils, 43.5 g protein',
    '# it works, but only from inside this one folder'
  ];
  const painSvg = svg(600, 150, 'Three things can go wrong with a zip: Ben runs it from the wrong folder, a page gets separated from the others, and the note says pip install these but nothing checks that he did. The note is not something a computer can read.',
    [['wrong folder', 'can\'t open file'], ['a page goes missing', 'No module named'], ['the note is ignored', 'nothing checks it']].map((r, i) => {
      const x = 14 + i * 196;
      return box(x, 22, 180, 96, P.dangerT, 12) + T(x + 90, 58, r[0], { s: 14, f: P.danger }) + T(x + 90, 88, r[1], { s: 12.5, m: true, f: P.ink2 });
    }).join('') + T(300, 144, 'A note is for people. pip cannot read it.', { s: 13, w: 700, f: P.ink2 }));
  const painPic = stack(term(zipNote, 'what you sent'), vterm(bensTries, "terminal, on Ben's laptop"), painSvg);

  /* ---- The fix: pip install -e . makes it a real, installed package with a command ---- */
  const srcTrap = [
    '(.venv) $ python src/kitchen_coach/cli.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen-coach/src/kitchen_coach/cli.py", line 3, in <module>',
    '    from kitchen_coach.plans import PLANS, plan_for',
    "ModuleNotFoundError: No module named 'kitchen_coach'",
    '(.venv) $ python -m pip install -e .',
    'Obtaining file:///Users/you/kitchen-coach',
    "  Installing build dependencies: finished with status 'done'",
    '# ... 4 more steps ...',
    'Successfully built kitchen-coach',
    'Installing collected packages: kitchen-coach',
    'Successfully installed kitchen-coach-0.1.0',
    '(.venv) $ kitchen-coach',
    "Kitchen Coach: today's plan",
    '  Ana    rice bowl, 195 kcal, 2 hours before her run',
    '  Ben    tofu and lentils, 43.5 g protein',
    '  Chloe  gluten-free brownie after dinner',
    '(.venv) $ cd ~',
    '(.venv) $ kitchen-coach ben chloe dan',
    "Kitchen Coach: today's plan",
    '  Ben    tofu and lentils, 43.5 g protein',
    '  Chloe  gluten-free brownie after dinner',
    '  Dan    no plan yet'
  ];
  const whatPipWrote = [
    '(.venv) $ cat .venv/bin/kitchen-coach',
    '#!/Users/you/kitchen-coach/.venv/bin/python',
    'import sys',
    'from kitchen_coach.cli import main',
    "if __name__ == '__main__':",
    "    sys.argv[0] = sys.argv[0].removesuffix('.exe')",
    '    sys.exit(main())'
  ];
  const cliRun = CLI.concat(['', '', '# What happens when you type:  kitchen-coach ben', 'sys.argv = ["kitchen-coach", "ben"]', 'main()']);
  const fixPic = stack(vterm(srcTrap, 'terminal: in the project folder, venv switched on'),
    vterm(whatPipWrote, 'terminal: the little program pip wrote'),
    run(cliRun, { title: 'cli.py, with a pretend command line', files: PKG }));

  /* ---- Try it: build the book, and install it on Ben's laptop ---- */
  const buildIt = [
    '(.venv) $ python -m pip install build',
    '# ... Successfully installed build-1.6.1 ...',
    '(.venv) $ python -m build',
    '* Creating isolated environment: venv+pip...',
    '* Installing packages in isolated environment:',
    '  - hatchling',
    '# ... the same again for the wheel ...',
    '* Building wheel...',
    'Successfully built kitchen_coach-0.1.0.tar.gz and kitchen_coach-0.1.0-py3-none-any.whl',
    '(.venv) $ ls dist',
    'kitchen_coach-0.1.0-py3-none-any.whl',
    'kitchen_coach-0.1.0.tar.gz',
    '(.venv) $ python -m zipfile -l dist/kitchen_coach-0.1.0-py3-none-any.whl',
    'kitchen_coach/__init__.py',
    'kitchen_coach/cli.py',
    'kitchen_coach/plans.py',
    'kitchen_coach-0.1.0.dist-info/METADATA',
    'kitchen_coach-0.1.0.dist-info/WHEEL',
    'kitchen_coach-0.1.0.dist-info/entry_points.txt',
    'kitchen_coach-0.1.0.dist-info/RECORD'
  ];
  const onBens = [
    '$ python3 -m venv .venv',
    '$ source .venv/bin/activate',
    '(.venv) $ python -m pip install kitchen_coach-0.1.0-py3-none-any.whl',
    'Processing ./kitchen_coach-0.1.0-py3-none-any.whl',
    'Installing collected packages: kitchen-coach',
    'Successfully installed kitchen-coach-0.1.0',
    '(.venv) $ kitchen-coach ben',
    "Kitchen Coach: today's plan",
    '  Ben    tofu and lentils, 43.5 g protein'
  ];
  const wheelSvg = svg(600, 150, 'The wheel file name in pieces: kitchen_coach is the name, 0.1.0 the version, py3 means any Python 3, none means no compiled C code, any means any computer. .whl means it is a wheel, a zip that pip can install.',
    T(300, 36, 'kitchen_coach-0.1.0-py3-none-any.whl', { s: 19, m: true }) +
    arrow(126, 54, 100, 90, P.accent, 2.5) + T(100, 110, 'name', { s: 13, f: P.accent }) +
    arrow(238, 54, 226, 90, P.ok, 2.5) + T(226, 110, 'version', { s: 13, f: P.ok }) +
    arrow(354, 54, 366, 90, P.warn, 2.5) + T(366, 110, 'any Python 3,', { s: 13, f: P.warn }) + T(366, 130, 'any computer', { s: 13, f: P.warn }) +
    arrow(498, 54, 520, 90, P.ink2, 2.5) + T(520, 110, 'a wheel:', { s: 13, f: P.ink2 }) + T(520, 130, 'a zip for pip', { s: 13, f: P.ink2 }));
  const tryPic = stack(vterm(buildIt, 'terminal: bind the book'), wheelSvg, vterm(onBens, "terminal, on Ben's laptop, with the .whl file"));

  /* ---- The catch: two names, one version per release, loose dependencies ---- */
  const names = [
    '(.venv) $ python -m pip install kitchen-coach      # the name on the cover',
    '(.venv) $ python -c "import kitchen_coach"         # the name in Python: fine',
    '(.venv) $ python -c "import kitchen-coach"',
    '  File "<string>", line 1',
    '    import kitchen-coach',
    '                  ^',
    'SyntaxError: invalid syntax'
  ];
  const sameVersion = [
    '# you fixed a typo in plans.py and built again, still 0.1.0',
    '(.venv) $ python -m pip install kitchen_coach-0.1.0-py3-none-any.whl',
    'Processing ./kitchen_coach-0.1.0-py3-none-any.whl',
    'kitchen-coach is already installed with the same version as the provided wheel. Use --force-reinstall to force an installation of the wheel.',
    '# version = "0.2.0" on the cover, build, send the new wheel',
    '(.venv) $ python -m pip install kitchen_coach-0.2.0-py3-none-any.whl',
    'Processing ./kitchen_coach-0.2.0-py3-none-any.whl',
    'Installing collected packages: kitchen-coach',
    '  Attempting uninstall: kitchen-coach',
    '    Found existing installation: kitchen-coach 0.1.0',
    '    Uninstalling kitchen-coach-0.1.0:',
    '      Successfully uninstalled kitchen-coach-0.1.0',
    'Successfully installed kitchen-coach-0.2.0'
  ];
  const deps = [
    '[project]',
    'name = "kitchen-coach"',
    'version = "0.2.0"',
    'dependencies = [',
    '    "tabulate>=0.10",',
    ']'
  ];
  const tooNew = [
    '# requires-python = ">=3.16" by mistake',
    '(.venv) $ python -m pip install kitchen_coach-0.1.0-py3-none-any.whl',
    "ERROR: Package 'kitchen-coach' requires a different Python: 3.15.2 not in '>=3.16'"
  ];
  const catchPic = stack(vterm(names, 'terminal: two spellings of one name'), vterm(sameVersion, "terminal, on Ben's laptop: one version, one release"),
    code(deps, { title: 'pyproject.toml: a dependency, loosely', good: [5] }), code(['tabulate==0.10.0'], { title: 'requirements.txt (lesson 63): exact, for your own venv' }),
    vterm(tooNew, "terminal, on Ben's laptop: requires-python too high"));

  COURSE.add({
    id: 'l94', minutes: 15,
    summary: 'A zip of <code>.py</code> files plus a note ("also pip install these, run it from this folder") breaks on a friend\'s laptop. <b>Packaging</b> binds your code into a cookbook anyone can <code>pip install</code>. The <b>cover page</b> is <code>pyproject.toml</code>, written in TOML. <code>[build-system]</code> names the tool that binds the book (<b>hatchling</b>). <code>[project]</code> gives the <b>name</b> (<code>kitchen-coach</code>), the <b>version</b> (<code>0.1.0</code>), <code>requires-python = "&gt;=3.14"</code> and <code>dependencies</code>. <code>[project.scripts]</code> makes a command: <code>kitchen-coach = "kitchen_coach.cli:main"</code>. The code lives in <code>src/kitchen_coach/</code>, tests in <code>tests/</code>. While you work, <code>pip install -e .</code> installs it <b>editable</b>: the command works from any folder and sees every change. <code>python -m build</code> makes <code>dist/kitchen_coach-0.1.0-py3-none-any.whl</code>, a wheel, which Ben installs with pip. Hyphen on the cover, underscore in <code>import</code>. Bump the version for every release. List dependencies loosely (<code>&gt;=</code>), not pinned like <code>requirements.txt</code>. <code>tomllib</code> reads TOML in Python.',
    video: {
      src: 'videos/l94-packaging.mp4', poster: 'videos/l94-packaging.jpg', length: '1 min 6 s',
      script: [
        'Ben wants Kitchen Coach on his own laptop. So you send him a zip of loose recipe pages, with a note. Also pip install this. And only run it from this folder. On Ben\'s laptop, it breaks. No module named plans.',
        'So bind the pages into a real cookbook. First, the cover page: pyproject.toml. It gives the book a name, kitchen-coach. A version, 0.1.0. The Python it needs, 3.14 or newer. And under project scripts, one line makes a command. kitchen-coach runs the main function in cli.py.',
        'Now type python -m build. The loose pages are bound into one book. A wheel file, in the dist folder.',
        'On Ben\'s laptop, pip install the wheel. Then he types kitchen-coach, and today\'s plan appears.',
        'pyproject.toml is the cover page. Build it once, and anyone can pip install your cookbook.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A cookbook with a cover page.',
        text: [
          'Ben wants <b>Kitchen Coach</b> on his own laptop. Right now it is a few loose recipe pages: <code>.py</code> files in a folder on yours. You could zip them up and add a note. Part 3 shows how that goes.',
          'The pro way is a <b>package</b> you can <b>pip install</b>, just like the packages from PyPI in lesson 63. Think of a bound <b>cookbook</b>. The recipes are inside. On the front is a <b>cover page</b> that says the book\'s name, its version, which Python it needs, and the command it gives you. For Python, the cover page is a file called <code>pyproject.toml</code>. You met it in lesson 92, where Ruff kept its settings there.',
          'The file is written in <b>TOML</b>, a simple settings format: <code>[sections]</code> in square brackets, then <code>key = value</code> lines. Text goes in quotes, lists in <code>[ ]</code>. Python can read it with <b><code>tomllib</code></b>, a module from the standard library (lesson 61) since Python 3.11. <code>tomllib.loads(text)</code> turns TOML text into a <b>dict</b>. A section inside a section, <code>[project.scripts]</code>, becomes a dict inside a dict.',
          'Press <b>Run</b>. It reads the cover the way pip does. Then try two changes. Change <code>0.1.0</code> to <code>0.2.0</code> and run. Then delete the quotes around the version and run: <code>tomllib</code> refuses with <code>TOMLDecodeError</code>, because <code>0.1.0</code> without quotes is not a number and not text.'
        ],
        tip: '<b>Module</b>, <b>package</b>, <b>distribution</b>: a module is one <code>.py</code> file, a package is a folder of them you can <code>import</code>, and the thing you build and pip installs is called a distribution. Most people just say "package" for all of it.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'The layout, the cover, the command.',
        text: [
          '<b>The layout.</b> The project folder is <code>kitchen-coach</code>. The code moves into <code>src/kitchen_coach/</code>. That folder is the <b>package</b>: it has an <code>__init__.py</code> (it can be one docstring line), so Python treats it as something you can <code>import kitchen_coach</code>. <code>plans.py</code> holds the recipes, <code>cli.py</code> holds <code>main()</code>, the function the command runs. Your taste tests (lesson 89) live in <code>tests/</code>, outside the book. The extra <code>src/</code> folder is on purpose: it is the modern layout, and part 4 shows why it helps.',
          '<b><code>[build-system]</code></b> names the tool that binds the book. Here it is <b>hatchling</b>. pip fetches it by itself when it builds. You copy these three lines and never touch them.',
          '<b><code>[project]</code></b> is the cover: <code>name</code> (how pip knows it), <code>version</code>, a one-line <code>description</code>, the <code>readme</code>, <code>requires-python = "&gt;=3.14"</code> (Python 3.14 or newer: <code>&gt;=</code> means "at least"), and <code>dependencies</code>, the other packages it needs. Kitchen Coach needs none yet, so the list is empty.',
          '<b><code>[project.scripts]</code></b> is the table of contents for commands. One line, three pieces: the command Ben types (<code>kitchen-coach</code>), the module written like an import (<code>kitchen_coach.cli</code>), and after the colon the function to call (<code>main</code>).',
          '<code>cli.py</code> uses <b><code>sys.argv</code></b>: a list of the words typed on the command line. <code>sys.argv[0]</code> is the command, and <code>sys.argv[1:]</code> is everything after it (slicing, lesson 33). No names typed? Then it plans for all three friends.'
        ],
        tip: 'Bigger command-line programs use <code>argparse</code>, a standard library module that turns <code>sys.argv</code> into options with <code>--help</code> for free. For one or two words, <code>sys.argv</code> is enough.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A zip and a note break on a friend\'s laptop.',
        text: [
          'The quick way: zip <code>coach.py</code> and <code>plans.py</code>, add a note, send it. Look at what happens on Ben\'s laptop. All three tries are real.',
          '<b>Wrong folder.</b> His terminal starts in his home folder, not in Downloads, so <code>python3 coach.py</code> finds no file at all.',
          '<b>A page goes missing.</b> He moves <code>coach.py</code> to his Desktop. Now <code>from plans import ...</code> fails with <code>ModuleNotFoundError: No module named \'plans\'</code>. Remember lesson 60: Python looks for modules in the <b>script\'s own folder</b> first, and <code>plans.py</code> is still in Downloads.',
          '<b>The note.</b> It only works from inside that one folder. And "also pip install these" is for people. If Kitchen Coach needed tabulate (lesson 63) and Ben skipped that line, it would crash with another <code>ModuleNotFoundError</code>. pip cannot read a note. It <b>can</b> read a cover page.'
        ],
        warn: 'Every new version means a new zip, a new note, and the same three traps again.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'pip install -e . turns the folder into a real package.',
        text: [
          'Even on your own laptop, the <code>src/</code> layout stops <code>python src/kitchen_coach/cli.py</code> with <code>No module named \'kitchen_coach\'</code>. Python looks in <code>src/kitchen_coach/</code> for a folder called <code>kitchen_coach</code>, and there is none. That error is a good thing: it means only the <b>installed</b> package runs, exactly the way Ben will get it.',
          'So install it. In the project folder, with the venv switched on (lesson 91): <code>python -m pip install -e .</code> The dot means "this folder". pip reads the cover, fetches hatchling, and installs Kitchen Coach into the venv. <code>-e</code> means <b>editable</b>: pip does not copy your files, it points at them. Change <code>plans.py</code>, and the very next <code>kitchen-coach</code> shows the change. No reinstall.',
          'Now <code>kitchen-coach</code> is a real command, and it works from <b>any folder</b>: <code>cd ~</code> and run it, still fine. pip wrote a tiny program into <code>.venv/bin</code> that does <code>from kitchen_coach.cli import main</code>, then calls <code>main()</code>. That is your <code>[project.scripts]</code> line, turned into code.',
          'Press <b>Run</b> on <code>cli.py</code>. A Run box has no terminal, so the last two lines pretend: they fill <code>sys.argv</code> the way the terminal would for <code>kitchen-coach ben</code>, then call <code>main()</code>. Change <code>"ben"</code> to <code>"chloe", "ana"</code> and run. Then try <code>sys.argv = ["kitchen-coach"]</code>: all three friends.'
        ],
        tip: 'Your pytest tests (lesson 89) now just write <code>from kitchen_coach.plans import plan_for</code>. The editable install makes that import work from <code>tests/</code>.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Bind the book: python -m build.',
        text: [
          'To give Kitchen Coach to Ben, bind it. Install the <b>build</b> tool into your venv once: <code>python -m pip install build</code>. Then, in the project folder: <code>python -m build</code>. It makes a fresh, clean kitchen just for building, puts hatchling in it, and binds two files into a new <code>dist/</code> folder.',
          '<b><code>kitchen_coach-0.1.0-py3-none-any.whl</code></b> is a <b>wheel</b>: a zip with your package and a small <code>dist-info</code> folder that holds the cover (<code>METADATA</code>) and the command (<code>entry_points.txt</code>). <code>py3-none-any</code> means any Python 3, on any computer. Notice what is not inside: <code>tests/</code>. The <code>.tar.gz</code> holds the source, for tools that want to build it themselves.',
          'Send Ben the <code>.whl</code>. On his laptop: make a venv, switch it on, <code>python -m pip install kitchen_coach-0.1.0-py3-none-any.whl</code>. Then <code>kitchen-coach ben</code> from any folder. No note needed.',
          '<b>The exercise:</b> <code>l94_cookbook_cover.py</code> holds a cover page with three mistakes. Fix the TOML string. The check reads it with <code>tomllib</code> and tells you what pip would complain about.'
        ],
        tip: 'With <b>uv</b> (lesson 91), <code>uv build</code> does the same job and makes the same two files.<br><b>Publishing</b> to PyPI, so anyone can type <code>pip install kitchen-coach</code>, is one more step (<code>uv publish</code>, or the tool <code>twine</code>). Practise on <b>TestPyPI</b> first, a separate playground copy of PyPI. You log in with an API token: never write it in your code, in <code>pyproject.toml</code>, or in git.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Two spellings, a new version every time, loose dependencies.',
        text: [
          '<b>Hyphen on the cover, underscore in Python.</b> The project is <code>kitchen-coach</code>: that is what you <code>pip install</code> and what Ben types. The package folder is <code>kitchen_coach</code>: that is what you <code>import</code>. Python reads a hyphen as a minus sign, so <code>import kitchen-coach</code> is a SyntaxError. pip does not mind: to pip, <code>kitchen-coach</code>, <code>kitchen_coach</code> and <code>Kitchen.Coach</code> are the same name.',
          '<b>A new version for every release.</b> You fixed a typo and built again, still <code>0.1.0</code>. Ben\'s pip says "already installed with the same version" and does nothing. Change the version on the cover first, then build. A common habit: the last number for small fixes (<code>0.1.1</code>), the middle one for new features (<code>0.2.0</code>). PyPI never accepts the same version twice.',
          '<b>Dependencies loosely.</b> If Kitchen Coach used tabulate, the cover would say <code>"tabulate&gt;=0.10"</code>: any version from 0.10 on. Do not copy the exact pins from <code>requirements.txt</code> (<code>==0.10.0</code>). Ben\'s venv may already hold other packages that need a newer tabulate, and an exact pin would fight them. Exact pins rebuild <b>your own</b> venv. Loose ranges let the book fit into <b>anyone\'s</b>.',
          '<b><code>requires-python</code> tells the truth.</b> Set it too high and nobody can install it. Ben has Python 3.15, and a cover that asks for 3.16 or newer is refused.'
        ],
        warn: 'Pick a name that is not taken before you publish. Search pypi.org first. Many short names are long gone.'
      }
    ],
    exercises: [
      {
        file: 'l94_cookbook_cover.py', title: 'Fix the cookbook\'s cover page',
        task: 'The <code>COVER</code> string is a <code>pyproject.toml</code> with three mistakes: the version is missing, the command points at a function <code>cli.py</code> does not have, and <code>requires-python</code> asks for a Python that does not exist yet. Fix all three.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. STEP 1 shows what pip would read on your cover. The check gives one hint.',
          'Between <code>START</code> and <code>END</code>, add the missing <code>version</code> line under <code>name</code>. Run again: the next hint.',
          'Fix <code>requires-python</code> so Ben\'s Python 3.15 is allowed, and point the command at the function <code>cli.py</code> really has. The comment at the top shows <code>cli.py</code>.',
          'Run it until it says <code>PASS</code>. Want to go further? Make a real <code>kitchen-coach</code> folder with this cover, the layout from part 2, and run <code>python -m pip install -e .</code> in a venv.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Kitchen Coach is installed. What happens when Ben types <code>kitchen-coach</code>, because of this line?',
        pic: code(['[project.scripts]', 'kitchen-coach = "kitchen_coach.cli:main"'], { title: 'pyproject.toml' }),
        options: ['Python calls the main function from kitchen_coach/cli.py', 'Python runs every file in kitchen_coach/', 'Python opens pyproject.toml and prints it', 'Nothing: you still need python3 cli.py'],
        answer: 0,
        why: 'Left of <code>=</code> is the command. Right of it, the module (<code>kitchen_coach.cli</code>) and, after the colon, the function (<code>main</code>). pip wrote a tiny program for the command that imports <code>main</code> and calls it.',
        hint: 'Read the right side in two pieces, split at the colon.'
      },
      {
        type: 'fix', q: 'tomllib refuses this cover page. Fix the TOML string so the program prints the name and the version.',
        code: ['import tomllib', '', 'cover = """', '[project]', 'name = "kitchen-coach"', 'version = 0.1.0', '"""', '', 'book = tomllib.loads(cover)', 'print(book["project"]["name"], book["project"]["version"])'],
        title: 'cover_check.py',
        check: [
          'b = globals().get("book")',
          'if not isinstance(b, dict):',
          '    msg = "Keep the line  book = tomllib.loads(cover)"',
          'elif b.get("project", {}).get("version") != "0.1.0":',
          '    msg = "The version should be the text 0.1.0. In TOML, text needs quotes."',
          'elif "kitchen-coach 0.1.0" not in out:',
          '    msg = "Keep the print line at the bottom."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>0.1.0</code> is not a number (two dots) and, without quotes, not text either. <code>version = "0.1.0"</code> is text, and the program prints <code>kitchen-coach 0.1.0</code>. Versions are always text in <code>pyproject.toml</code>.',
        hint: 'Look at the name line. What does it have that the version line does not?'
      },
      {
        type: 'fix', q: '<code>kitchen-coach ben</code> should plan for Ben. Instead it prints three lines of <code>no plan yet</code>. Fix <code>main()</code>.',
        code: ['import sys', '', 'PLANS = {"ben": "tofu and lentils, 43.5 g protein"}', '', '', 'def main():', '    names = sys.argv[1]', '    for name in names:', '        print(name.title(), PLANS.get(name, "no plan yet"))', '', '', 'sys.argv = ["kitchen-coach", "ben"]', 'main()'],
        title: 'cli.py',
        check: [
          'lines = out.splitlines()',
          'if any("no plan yet" in l for l in lines):',
          '    msg = "Still no plan. sys.argv[1] is one string, \\"ben\\", and a for loop over a string goes letter by letter. Take a slice instead."',
          'elif lines != ["Ben tofu and lentils, 43.5 g protein"]:',
          '    msg = "It should print one line: Ben tofu and lentils, 43.5 g protein"',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>sys.argv[1]</code> is the single string <code>"ben"</code>, so the loop visited <code>b</code>, <code>e</code>, <code>n</code>. <code>sys.argv[1:]</code> is a list of every word after the command: <code>["ben"]</code>.',
        hint: 'One index gives one item. What gives "everything after the first"?'
      },
      {
        type: 'order', q: 'Put the steps in order, from your laptop to Ben typing the command.',
        items: ['Write pyproject.toml in the project folder', 'python -m build', 'Send Ben dist/kitchen_coach-0.1.0-py3-none-any.whl', 'Ben makes a venv and switches it on', 'Ben runs python -m pip install with the .whl file', 'Ben types kitchen-coach ben'],
        why: 'Cover first, then bind, then share the wheel. On Ben\'s side: a kitchen of his own (lesson 91), install the book, then use its command.',
        hint: 'You cannot build a book without a cover.'
      },
      {
        type: 'bucket', q: 'Where does each line belong?',
        buckets: ['pyproject.toml dependencies', 'requirements.txt'],
        items: [
          ['"tabulate>=0.10"', 0],
          ['tabulate==0.10.0', 1],
          ['Any new enough version will do', 0],
          ['Rebuild my own venv with the exact same versions', 1],
          ['Must fit into Ben\'s venv next to his other packages', 0]
        ],
        why: 'The cover says what the book <b>needs</b>, loosely, so it fits anyone\'s venv. <code>requirements.txt</code> from <code>pip freeze</code> (lesson 63) pins <b>exact</b> versions to rebuild one known kitchen.',
        hint: '>= is loose. == is exact.'
      },
      {
        type: 'pick', q: 'Back to lesson 60. Ben moved <code>coach.py</code> to his Desktop and got <code>ModuleNotFoundError: No module named \'plans\'</code>. Why?',
        pic: code(['import sys', '', 'from plans import PLANS, plan_for'], { title: 'Desktop/coach.py' }),
        options: ['Python looks for plans.py in the script\'s own folder first, and it stayed in Downloads', 'plans is a reserved word in Python', 'He needs Python 3.16', 'pip deleted plans.py'],
        answer: 0,
        why: 'The folder of the script you run is the first shelf Python searches. <code>plans.py</code> was not on it. An installed package is on the venv\'s shelf, so it is found from any folder.',
        hint: 'Which folder does Python search first?'
      },
      {
        type: 'type', q: 'You are in the <code>kitchen-coach</code> folder, venv on. Type the command that installs the project <b>editable</b>, so every change shows up at once.',
        prompt: '(.venv) $',
        answers: ['python -m pip install -e .', 'python3 -m pip install -e .', 'pip install -e .', 'python -m pip install --editable .', 'python3 -m pip install --editable .', 'pip install --editable .'],
        why: '<code>-e</code> (or <code>--editable</code>) makes pip point at your files instead of copying them, and the dot means "this folder", where <code>pyproject.toml</code> is.',
        hint: 'python -m pip install, the editable flag, then "this folder".'
      },
      {
        type: 'pick', q: 'Ben has <code>0.1.0</code>. You fixed a bug in <code>plans.py</code>. What do you do before <code>python -m build</code>?',
        options: ['Change version to "0.1.1" in pyproject.toml', 'Nothing: pip notices the change by itself', 'Rename the package to kitchen_coach2', 'Delete requires-python'],
        answer: 0,
        why: 'A wheel with the same version tells Ben\'s pip "already installed with the same version", so nothing changes. A new version number is a new release: <code>0.1.1</code> for a small fix.',
        hint: 'How does pip tell two releases apart?'
      }
    ]
  });
})();
