/* Lesson 91: Virtual environments (module 8). One file per lesson.
   Terminal output checked with Python 3.15.2 (Homebrew, macOS), pip 26.2.2, pytest 9.2.0 and 8.4.2, uv 0.11.5, on 2026-11-23.
   The throwaway projects were made in a scratch folder. Only that folder was renamed in the pictures:
   it shows as /Users/you/kitchen-coach and /Users/you/chloe-blog. Long pip download lines are cut where marked "# ...".
   "One shared kitchen" (part 3) was captured in one throwaway venv standing in for a shared Python, so nothing real broke.
   The pip install into Homebrew's python3.15 was refused by PEP 668 (nothing was installed); its message is shortened.
   The Run boxes were checked with Python 3.14 and in this page (Pyodide, Python 3.14.2): in the page there is no venv,
   sys.prefix and sys.base_prefix are both "/", and sys.executable is /home/pyodide/this.program. */
(function () {
  const { P, code, run, term, svg, box, T, esc } = PR;

  /* =====================================================================
     l91  Virtual environments
     ===================================================================== */

  // A terminal like term(), plus "(.venv) $ " lines: the prompt of a switched-on venv.
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

  // A jar of a package: a lid, a body, its name and its version.
  const jar = (x, base, name, ver, fill) =>
    `<rect x="${x + 12}" y="${base - 86}" width="48" height="12" rx="4" fill="${P.ink2}"/>` +
    `<rect x="${x}" y="${base - 76}" width="72" height="76" rx="12" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 36, base - 46, name, { s: 12 }) + T(x + 36, base - 22, ver, { s: 13, m: true, f: P.ink2 });
  const plank = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="8" rx="3" fill="${P.ink}"/>`;

  /* ---- The idea: two projects, two kitchens ---- */
  const kitchen = (x, title, pyVer, fill) =>
    T(x + 138, 26, title, { s: 13, f: P.accent }) +
    box(x, 40, 276, 196, P.white, 16) +
    T(x + 18, 70, '.venv/', { s: 14, m: true, a: 'start', f: P.ok }) + T(x + 258, 70, 'its own shelf', { s: 11.5, w: 700, a: 'end', f: P.ink2 }) +
    jar(x + 16, 200, 'pytest', pyVer, fill) + jar(x + 102, 200, 'pluggy', '1.7.0', P.sand) + jar(x + 188, 200, 'Pygments', '2.21.0', P.sand) +
    plank(x + 8, 200, 260);
  const ideaSvg = svg(600, 300, 'Two kitchens side by side. Kitchen Coach has its own .venv with a shelf holding pytest 9.2.0, pluggy and Pygments. Chloe\'s baking blog has its own .venv with pytest 8.4.2 on its shelf. Both kitchens are built from the same Python 3.15, but their shelves never mix.',
    kitchen(16, 'KITCHEN COACH', '9.2.0', P.tint) + kitchen(308, 'CHLOE\'S BAKING BLOG', '8.4.2', P.warnT) +
    box(130, 256, 340, 34, P.sand, 10) + T(300, 278, 'both built from the same Python 3.15', { s: 13, w: 700 }));
  const whichKitchen = [
    'import sys',
    '',
    'print("Python", sys.version.split()[0])',
    'print("Which Python:", sys.executable)',
    'print("Kitchen:     ", sys.prefix)',
    'print("Built from:  ", sys.base_prefix)',
    '',
    'if sys.prefix != sys.base_prefix:',
    '    print("A kitchen of its own: a venv.")',
    'else:',
    '    print("No venv. This is the shared kitchen.")'
  ];
  const whichMac = [
    '$ python3 which_kitchen.py',
    'Python 3.15.2',
    'Which Python: /opt/homebrew/opt/python@3.15/bin/python3.15',
    'Kitchen:      /opt/homebrew/opt/python@3.15/Frameworks/Python.framework/Versions/3.15',
    'Built from:   /opt/homebrew/opt/python@3.15/Frameworks/Python.framework/Versions/3.15',
    'No venv. This is the shared kitchen.',
    '$ source .venv/bin/activate',
    '(.venv) $ python which_kitchen.py',
    'Python 3.15.2',
    'Which Python: /Users/you/kitchen-coach/.venv/bin/python',
    'Kitchen:      /Users/you/kitchen-coach/.venv',
    'Built from:   /opt/homebrew/opt/python@3.15/Frameworks/Python.framework/Versions/3.15',
    'A kitchen of its own: a venv.'
  ];
  const ideaPic = stack(ideaSvg, run(whichKitchen, { title: 'which_kitchen.py' }), vterm(whichMac, 'the same file on a Mac: first outside, then inside the venv'));

  /* ---- The code: make it, step in, look around, install, step out ---- */
  const makeIt = [
    '$ cd kitchen-coach',
    '$ python3 -m venv .venv',
    '$ ls .venv',
    'bin\t\tinclude\t\tlib\t\tpyvenv.cfg',
    '$ which python3',
    '/opt/homebrew/bin/python3',
    '$ source .venv/bin/activate',
    '(.venv) $ which python3',
    '/Users/you/kitchen-coach/.venv/bin/python3',
    '(.venv) $ python --version',
    'Python 3.15.2',
    '(.venv) $ python -c "import sys; print(sys.prefix)"',
    '/Users/you/kitchen-coach/.venv'
  ];
  const installIt = [
    '(.venv) $ python -m pip install pytest',
    'Collecting pytest',
    '# ... download lines ...',
    'Installing collected packages: pygments, pluggy, packaging, iniconfig, pytest',
    'Successfully installed iniconfig-2.3.1 packaging-26.4 pluggy-1.7.0 pygments-2.21.0 pytest-9.2.0',
    '(.venv) $ ls .venv/lib/python3.15/site-packages',
    '_pytest\t\tiniconfig\tpackaging\tpip\t\tpluggy\t\tpygments\tpytest',
    '# ... and their .dist-info folders',
    '(.venv) $ deactivate',
    '$ which python3',
    '/opt/homebrew/bin/python3'
  ];
  const winIt = [
    '$ py -m venv .venv',
    '$ .venv\\Scripts\\activate',
    '# in PowerShell that runs .venv\\Scripts\\Activate.ps1 for you',
    '(.venv) $ python -m pip install pytest',
    '(.venv) $ python -c "import sys; print(sys.prefix)"',
    '# C:\\Users\\you\\kitchen-coach\\.venv'
  ];
  const codePic = stack(vterm(makeIt, 'terminal, Mac or Linux: make the kitchen and step in'), vterm(installIt, 'terminal: install, look on the shelf, step out'), vterm(winIt, 'the same on Windows (prompt shortened to $)'));

  /* ---- The pain: one shared kitchen ---- */
  const knock = [
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
  ];
  const sharedSvg = svg(600, 236, 'One shared kitchen with one shelf. Kitchen Coach needs pytest 9.2.0 and Chloe\'s blog needs pytest 8.4.2. There is room for only one pytest on the shelf: when pytest 8.4.2 goes on for Chloe, pytest 9.2.0 falls off, and Kitchen Coach breaks.',
    T(300, 24, 'ONE SHARED KITCHEN, ONE SHELF', { s: 13, f: P.danger }) +
    box(40, 40, 380, 160, P.white, 16) +
    jar(70, 170, 'pytest', '8.4.2', P.warnT) + jar(156, 170, 'pluggy', '1.7.0', P.sand) + jar(242, 170, 'Pygments', '2.21.0', P.sand) +
    plank(52, 170, 356) + T(106, 192, 'for Chloe', { s: 12, f: P.warn }) +
    `<g transform="rotate(28 500 120)">${jar(462, 160, 'pytest', '9.2.0', P.tint)}</g>` +
    `<path d="M404 66 q36 -34 70 -6" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="6 5"/>` +
    T(510, 204, 'pytest 9.2.0 knocked off:', { s: 12.5, f: P.danger }) + T(510, 224, 'Kitchen Coach breaks', { s: 12.5, f: P.danger }));
  const twoLists = [
    'from pathlib import Path',
    '',
    'def shopping_list(project):',
    '    jars = {}',
    '    for line in Path(project, "requirements.txt").read_text().splitlines():',
    '        name, version = line.split("==")',
    '        jars[name] = version',
    '    return jars',
    '',
    'coach = shopping_list("kitchen-coach")',
    'chloe = shopping_list("chloe-blog")',
    '',
    'for name in coach:',
    '    if coach[name] == chloe.get(name):',
    '        print(f"{name:<10} {coach[name]:<7} same in both")',
    '    else:',
    '        print(f"{name:<10} {coach[name]:<7} but Chloe needs {chloe.get(name)}")'
  ];
  const coachReq = 'iniconfig==2.3.1\npackaging==26.4\npluggy==1.7.0\nPygments==2.21.0\npytest==9.2.0\n';
  const chloeReq = 'iniconfig==2.3.1\npackaging==26.4\npluggy==1.7.0\nPygments==2.21.0\npytest==8.4.2\n';
  const pep668 = [
    '$ python3 -m pip install requests',
    'error: externally-managed-environment',
    ' ',
    '× This environment is externally managed',
    '╰─> To install Python packages system-wide, try brew install',
    '    xyz, where xyz is the package you are trying to',
    '    install.',
    '# ... 23 more lines of advice ...',
    'hint: See PEP 668 for the detailed specification.'
  ];
  const painPic = stack(sharedSvg, vterm(knock, 'terminal: one kitchen shared by both projects'),
    run(twoLists, { title: 'two_lists.py', files: { 'kitchen-coach/requirements.txt': coachReq, 'chloe-blog/requirements.txt': chloeReq } }),
    term(pep668, 'terminal, Homebrew Python 3.15: the shared kitchen is locked'));

  /* ---- The fix: each project its own .venv ---- */
  const both = [
    '$ cd ~/kitchen-coach',
    '$ source .venv/bin/activate',
    '(.venv) $ python -m pytest --version',
    'pytest 9.2.0',
    '(.venv) $ deactivate',
    '$ cd ~/chloe-blog',
    '$ python3 -m venv .venv',
    '$ source .venv/bin/activate',
    '(.venv) $ python -m pip install pytest==8.4.2',
    '# ... download lines ...',
    'Successfully installed iniconfig-2.3.1 packaging-26.4 pluggy-1.7.0 pygments-2.21.0 pytest-8.4.2',
    '(.venv) $ python -m pytest --version',
    'pytest 8.4.2',
    '(.venv) $ deactivate'
  ];
  const doorLabel = [
    'from pathlib import Path',
    '',
    'cfg = Path("kitchen-coach/.venv/pyvenv.cfg")',
    'label = {}',
    'for line in cfg.read_text().splitlines():',
    '    key, value = line.split(" = ")',
    '    label[key] = value',
    '',
    'print("Kitchen:   ", cfg.parent)',
    'print("Python:    ", label["version"])',
    'print("Built from:", label["home"])',
    'print("Uses the shared shelf too?", label["include-system-site-packages"])'
  ];
  const cfg = who => 'home = /opt/homebrew/opt/python@3.15/bin\n' +
    'include-system-site-packages = false\n' +
    'version = 3.15.2\n' +
    'executable = /opt/homebrew/Cellar/python@3.15/3.15.2/Frameworks/Python.framework/Versions/3.15/bin/python3.15\n' +
    `command = /opt/homebrew/opt/python@3.15/bin/python3.15 -m venv /Users/you/${who}/.venv\n`;
  const fixPic = stack(vterm(both, 'terminal: two projects, two kitchens'),
    run(doorLabel, { title: 'door_label.py', files: { 'kitchen-coach/.venv/pyvenv.cfg': cfg('kitchen-coach'), 'chloe-blog/.venv/pyvenv.cfg': cfg('chloe-blog') } }));

  /* ---- Try it: throw the kitchen away and build it again ---- */
  const rebuild = [
    '(.venv) $ python -m pip freeze > requirements.txt',
    '(.venv) $ cat requirements.txt',
    'iniconfig==2.3.1',
    'packaging==26.4',
    'pluggy==1.7.0',
    'Pygments==2.21.0',
    'pytest==9.2.0',
    '(.venv) $ deactivate',
    '$ rm -rf .venv',
    '$ python3 -m venv .venv',
    '$ source .venv/bin/activate',
    '(.venv) $ python -m pip install -r requirements.txt',
    'Collecting iniconfig==2.3.1 (from -r requirements.txt (line 1))',
    '# ... download lines ...',
    'Successfully installed Pygments-2.21.0 iniconfig-2.3.1 packaging-26.4 pluggy-1.7.0 pytest-9.2.0',
    '(.venv) $ python -m pytest --version',
    'pytest 9.2.0'
  ];
  const vscodeSvg = svg(600, 150, 'VS Code: open the Command Palette and run Python: Select Interpreter. The list shows the shared Homebrew Python and the one in this project\'s .venv. Pick the .venv one, and the Run button and the terminal use this kitchen.',
    box(16, 16, 568, 118, P.white, 12) +
    T(36, 44, '> Python: Select Interpreter', { s: 14, m: true, a: 'start', f: P.accent }) +
    `<rect x="30" y="58" width="540" height="30" rx="6" fill="${P.okT}" stroke="${P.ok}" stroke-width="2"/>` +
    T(44, 79, 'Python 3.15.2 (.venv)   ./.venv/bin/python', { s: 13, m: true, a: 'start', f: P.ok }) + T(556, 79, 'pick this', { s: 12, a: 'end', f: P.ok }) +
    T(44, 115, 'Python 3.15.2   /opt/homebrew/bin/python3', { s: 13, m: true, a: 'start', f: P.ink2 }));
  const tryPic = stack(vterm(rebuild, 'terminal: write the list, throw the kitchen away, build it again'), vscodeSvg);

  /* ---- The catch: never commit it, never move it ---- */
  const gitignore = ['.venv/', '__pycache__/'];
  const moved = [
    '$ mv kitchen-coach coach',
    '$ cd coach',
    '$ source .venv/bin/activate',
    '(.venv) $ python --version',
    'zsh: command not found: python',
    '(.venv) $ which python3',
    '/opt/homebrew/bin/python3',
    '# the prompt says (.venv), but this is the shared kitchen'
  ];
  const forgot = [
    '# a new terminal: the venv is not switched on',
    '$ python3 -m pytest',
    '/opt/homebrew/opt/python@3.15/bin/python3.15: No module named pytest',
    '$ source .venv/bin/activate',
    '(.venv) $ python -m pytest',
    '# now it finds pytest on this kitchen\'s shelf'
  ];
  const catchPic = stack(code(gitignore, { title: '.gitignore', good: [1] }), vterm(moved, 'terminal: the project folder was renamed'), vterm(forgot, 'terminal: forgot to switch it on'));

  COURSE.add({
    id: 'l91', minutes: 14,
    summary: 'Every project gets a <b>kitchen of its own</b>: a <b>virtual environment</b>, or venv. Kitchen Coach needs pytest 9 and Chloe\'s baking blog needs pytest 8. One shared Python has one shelf, so installing one <b>knocks the other off</b>. Make a venv in each project folder with <code>python3 -m venv .venv</code> (Windows: <code>py -m venv .venv</code>), switch it on with <code>source .venv/bin/activate</code> (Windows: <code>.venv\\Scripts\\activate</code>), and the prompt starts with <code>(.venv)</code>. Now <code>python</code> and <code>pip install</code> use this kitchen only. <code>sys.prefix</code> says which kitchen you are in: inside a venv it is different from <code>sys.base_prefix</code>. <code>deactivate</code> steps out. A venv is <b>disposable</b>: never commit it (put <code>.venv/</code> in <code>.gitignore</code>), never move it, and rebuild it any time from <code>requirements.txt</code> with <code>pip install -r</code>. In VS Code, <b>Python: Select Interpreter</b> picks the <code>.venv</code>.',
    video: {
      src: 'videos/l91-virtual-environments.mp4', poster: 'videos/l91-virtual-environments.jpg', length: '1 min 14 s',
      script: [
        "Kitchen Coach needs pytest 9. Chloe's baking blog is older, and its tests need pytest 8. Both live on your laptop.",
        "With one shared kitchen, there is one shelf. Install pytest 8 for Chloe, and pip throws pytest 9 off the shelf. Now Kitchen Coach's tests break.",
        "So give each project a kitchen of its own. In the Kitchen Coach folder, type python3 -m venv .venv. That builds a new kitchen, with its own walls and its own shelf. It is called a virtual environment.",
        "Switch it on: source .venv/bin/activate. The prompt now starts with .venv. You are inside.",
        "Now pip install pytest. The jar goes on this kitchen's shelf, and nowhere else. Chloe's blog gets a kitchen of its own too, with pytest 8. Both work, side by side.",
        "Not sure which kitchen you are in? Ask Python. sys.prefix tells you.",
        "One project, one virtual environment. Make it, activate it, then install."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One project, one kitchen.',
        text: [
          'In lesson 63 you made a <code>.venv</code> so pip had somewhere to put tabulate. We called it a small shelf. It is really a whole small <b>kitchen</b>: its own <code>python</code>, its own <code>pip</code>, and its own shelf of packages. Its name is a <b>virtual environment</b>, or <b>venv</b>.',
          'Why one per project? Your laptop has two projects now. <b>Kitchen Coach</b> runs its taste tests with <b>pytest 9</b> (lesson 89). <b>Chloe\'s baking blog</b> is two years older, and its tests were written for <b>pytest 8</b>. One kitchen can only hold one pytest. Two kitchens can each hold their own, built from the same Python 3.15.',
          'How do you know which kitchen you are standing in? Ask Python. The <code>sys</code> module (it comes free with Python) knows. <code>sys.prefix</code> is the folder of the kitchen this Python cooks in <b>right now</b>. <code>sys.base_prefix</code> is the real Python it was built from. Outside a venv they are the <b>same</b> folder. Inside a venv they are <b>different</b>: <code>sys.prefix</code> is the <code>.venv</code> folder. <code>sys.executable</code> is the exact <code>python</code> program that is running.',
          'Press <b>Run</b>. The Python in this page lives in your browser. It has no venv and no folders of its own, so both prefixes are just <code>/</code> and it says <b>No venv</b>. The terminal below shows the same file on a Mac: first outside the venv, then inside it, where the kitchen is <code>/Users/you/kitchen-coach/.venv</code>.'
        ],
        tip: '<code>sys.version.split()[0]</code> takes the first word of the long version text: <code>3.15.2</code> on the Mac, <code>3.14.2</code> in this page.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Make it, switch it on, check, install, step out.',
        text: [
          '<b>Make it.</b> In the project folder, type <code>python3 -m venv .venv</code>. That runs Python\'s own <code>venv</code> module, which builds the kitchen in a new folder called <code>.venv</code>. Inside: <code>bin</code> holds its <code>python</code>, its <code>pip</code> and the <code>activate</code> script (on Windows that folder is called <code>Scripts</code>). <code>lib</code> holds the shelf, <code>site-packages</code>, where pip puts packages. <code>pyvenv.cfg</code> is the label on the door.',
          '<b>Switch it on.</b> <code>source .venv/bin/activate</code> steps into the kitchen for <b>this terminal</b>. The prompt now starts with <code>(.venv)</code>. That is your sign. Behind the scenes, activate puts <code>.venv/bin</code> first in the list of places the terminal looks for programs. So <code>which python3</code> now finds the kitchen\'s own <code>python3</code>. And inside a venv, plain <code>python</code> works too, even on a Mac where only <code>python3</code> worked before.',
          '<b>Check.</b> <code>python -c "import sys; print(sys.prefix)"</code> runs one line of Python straight from the terminal. It prints <code>/Users/you/kitchen-coach/.venv</code>: you are inside.',
          '<b>Install.</b> <code>python -m pip install pytest</code> puts pytest, and the four packages it needs, on <b>this</b> kitchen\'s shelf: <code>.venv/lib/python3.15/site-packages</code>. Nowhere else.',
          '<b>Step out.</b> <code>deactivate</code> leaves the kitchen. The prompt loses <code>(.venv)</code>, and <code>python3</code> is the shared one again. Nothing is deleted: next time, just activate again.'
        ],
        tip: 'Use <code>python -m pip</code>, not plain <code>pip</code>. It always installs for the very <code>python</code> you just named, so the package cannot land in the wrong kitchen.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One shared kitchen: one jar knocks the other off.',
        text: [
          'Picture both projects cooking in one shared Python. Kitchen Coach put <b>pytest 9.2.0</b> on the shelf. Now you help Chloe, and her blog needs <b>pytest 8.4.2</b>. pip does what you asked. Read the middle of its answer: <code>Found existing installation: pytest 9.2.0</code>, then <code>Successfully uninstalled pytest-9.2.0</code>. A shelf holds <b>one version</b> of each package. Chloe\'s tests work again, and Kitchen Coach now runs with the wrong pytest. Swap it back, and Chloe breaks. Every switch breaks somebody.',
          'Press <b>Run</b> on <code>two_lists.py</code>. It reads both projects\' shopping lists, <code>requirements.txt</code> (lesson 63), into dicts and compares them. Four jars are the same. One is not: <code>pytest 9.2.0 but Chloe needs 8.4.2</code>. One jar is enough to need two kitchens.',
          'Now add a line under line 11: <code>chloe["pytest"] = "9.2.0"</code>, as if Chloe updated her tests. Run again. Every line says <code>same in both</code>. Even then, keep two kitchens: next month one of them will want something new.',
          'On a Mac with Homebrew, and on many Linux systems, the shared kitchen is <b>locked</b> for exactly this reason. You met the message in lesson 63: <code>error: externally-managed-environment</code>. Your Mac\'s own tools use that Python too.'
        ],
        warn: 'Python from python.org on Windows has no lock. There, <code>pip install</code> with no venv switched on quietly fills the one shared shelf. So check for <code>(.venv)</code> before every install.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Each project gets its own .venv.',
        text: [
          'Give each project its own kitchen, in its own folder. In <code>kitchen-coach</code>, the <code>.venv</code> you made in part 2 holds pytest 9.2.0. In <code>chloe-blog</code>, make a second one and install pytest 8.4.2 there. Two kitchens, two shelves, and they never touch.',
          'Moving between projects is simple: <code>deactivate</code>, go to the other folder, activate its <code>.venv</code>. The terminal shows the proof: <code>pytest 9.2.0</code> in one kitchen, <code>pytest 8.4.2</code> in the other, on the same laptop, from the same Python 3.15.',
          'Every venv has a <b>label on its door</b>: <code>.venv/pyvenv.cfg</code>. It is a small text file of <code>key = value</code> lines. Press <b>Run</b> on <code>door_label.py</code>. It reads Kitchen Coach\'s label into a dict and prints which Python built the kitchen, and that <code>include-system-site-packages</code> is <code>false</code>: this kitchen does <b>not</b> borrow from the shared shelf.',
          'Now change <code>kitchen-coach</code> to <code>chloe-blog</code> on line 3 and run again. Same Python, another kitchen.'
        ],
        tip: 'Make the venv once per project, and call it <code>.venv</code> every time. VS Code and most tools look for that name first.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Throw the kitchen away. Build it again.',
        text: [
          'A venv is <b>disposable</b>. Your code lives in <code>coach.py</code> and <code>test_coach.py</code>, never in <code>.venv</code>. What matters is the <b>shopping list</b>. As in lesson 63, <code>python -m pip freeze &gt; requirements.txt</code> writes every jar on the shelf, with its exact version.',
          'Then try it for real in a test folder: <code>deactivate</code>, delete the kitchen with <code>rm -rf .venv</code> (Windows PowerShell: <code>Remove-Item -Recurse .venv</code>), make a new one, switch it on, and <code>python -m pip install -r requirements.txt</code>. Every jar comes back, same versions. Ben does exactly this on his laptop. Do it whenever a venv acts strange, or after you install a newer Python.',
          'In <b>VS Code</b>, open the Command Palette and run <b>Python: Select Interpreter</b> (lesson 2). Pick the one with <code>.venv</code> in it. Now the Run button cooks in this kitchen, and a new VS Code terminal switches the venv on by itself.',
          '<b>The exercise:</b> <code>l91_which_kitchen.py</code> finishes the <code>which_kitchen.py</code> idea from part 1. You write the test for "am I in a venv?", then run the file outside and inside a venv. It only says PASS inside.'
        ],
        tip: 'A fast newer tool, <b>uv</b>, does these same jobs: <code>uv venv</code> makes <code>.venv</code>, <code>uv pip install -r requirements.txt</code> fills it, and <code>uv run pytest</code> runs a command inside it without activating. It is a separate install. The <code>python3 -m venv</code> way works on every computer with Python.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Never commit it. Never move it.',
        text: [
          '<b>Never put <code>.venv</code> in git.</b> With just pytest on its shelf it is already 28 MB and almost 1,900 files, and it only works on your computer. Share <code>requirements.txt</code> instead. Add <code>.venv/</code> to a file called <code>.gitignore</code> in the project folder, and git leaves it alone. Python 3.13 and newer already hide each new venv from git, but the one line also covers venvs made by other tools. Lesson 93, Git for Python projects, sets this up.',
          '<b>Never move or rename the project folder with the venv inside.</b> The venv wrote its full address into its own files when it was built. After a rename, activate still adds <code>(.venv)</code> to the prompt, but it points at the old address. <code>python</code> is not found, and <code>python3</code> quietly falls back to the shared kitchen. The fix is the same as always: delete <code>.venv</code> and build it again from <code>requirements.txt</code>.',
          '<b>A new terminal starts outside every kitchen.</b> If pytest worked yesterday and today says <code>No module named pytest</code>, look at the prompt. No <code>(.venv)</code>? Activate first.'
        ],
        warn: 'On Windows, PowerShell may refuse to run <code>Activate.ps1</code> with "running scripts is disabled on this system". Run <code>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</code> once, then activate again.'
      }
    ],
    exercises: [
      {
        file: 'l91_which_kitchen.py', title: 'Which kitchen am I in?',
        task: 'Finish <code>in_own_kitchen(prefix, base_prefix)</code>: it gives <code>True</code> inside a venv and <code>False</code> outside. Then run the file twice: once in the shared kitchen, once inside a venv. The check only says <code>PASS</code> inside.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. STEP 1 shows which Python is running and which kitchen it is in. The check gives a hint.',
          'Between <code>START</code> and <code>END</code>, make the function compare the two folders. Run it again: the check says your function is right, but you are still in the shared kitchen.',
          'In a terminal, in the <code>exercises</code> folder: <code>python3 -m venv .venv</code>, then <code>source .venv/bin/activate</code> (Windows: <code>py -m venv .venv</code>, then <code>.venv\\Scripts\\activate</code>). Check the prompt starts with <code>(.venv)</code>, then type <code>python l91_which_kitchen.py</code>. It says <code>PASS</code>.',
          'In VS Code, run <b>Python: Select Interpreter</b>, pick the <code>.venv</code> one, and press Run: PASS there too. Then type <code>deactivate</code> in the terminal and run it once more: back in the shared kitchen.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The prompt starts with <code>(.venv)</code> in the <code>kitchen-coach</code> folder. You type <code>python -m pip install pytest</code>. Where does pytest go?',
        options: ['On the shelf of kitchen-coach/.venv, and nowhere else', 'Into the shared Python, for every project', 'Into every venv on the computer', 'Into VS Code'],
        answer: 0,
        why: 'Activate makes <code>python</code> mean the kitchen\'s own Python, and <code>python -m pip</code> installs for exactly that Python. So pytest lands in <code>.venv/lib/python3.15/site-packages</code>. Chloe\'s blog and the shared Python never see it.',
        hint: 'What does (.venv) in the prompt tell you?'
      },
      {
        type: 'pick', q: 'Your laptop has Kitchen Coach (needs pytest 9) and Chloe\'s blog (needs pytest 8). What is the right setup?',
        options: ['Two venvs: one in each project folder, each with its own pytest', 'One venv for both, and reinstall pytest each time you switch', 'Install both into the shared Python with --break-system-packages', 'Use pytest 8 everywhere and never update'],
        answer: 0,
        why: 'One shelf holds one version of each package, so swapping breaks one project every time. Two kitchens, one per project, each keep the version their project needs.',
        hint: 'One project, one ...?'
      },
      {
        type: 'fix', q: 'This page has <b>no venv</b>, but the program says <code>A kitchen of its own: a venv.</code> Fix <code>in_own_kitchen</code> so it tells the truth.',
        code: ['import sys', '', 'def in_own_kitchen(prefix, base_prefix):', '    return prefix == base_prefix', '', 'if in_own_kitchen(sys.prefix, sys.base_prefix):', '    print("A kitchen of its own: a venv.")', 'else:', '    print("No venv. This is the shared kitchen.")'],
        title: 'which.py',
        check: [
          'f = globals().get("in_own_kitchen")',
          'if not callable(f):',
          '    msg = "Keep the function  def in_own_kitchen(prefix, base_prefix):"',
          'elif f("/Users/you/kitchen-coach/.venv", "/opt/homebrew/opt/python@3.15") is not True:',
          '    msg = "Inside a venv, the two folders are different, and the function must give True. Which comparison means not equal?"',
          'elif f("/opt/homebrew/opt/python@3.15", "/opt/homebrew/opt/python@3.15") is not False:',
          '    msg = "When both folders are the same, there is no venv: the function must give False."',
          'elif "No venv. This is the shared kitchen." not in out:',
          '    msg = "Keep the if and else at the bottom: they print the answer."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Inside a venv, <code>sys.prefix</code> is the <code>.venv</code> folder and <code>sys.base_prefix</code> is the real Python, so they are <b>different</b>. The test is <code>return prefix != base_prefix</code>. Here both are <code>/</code>, so it gives <code>False</code> and the program says No venv.',
        hint: 'Same folder means no venv. Different folders mean a venv.'
      },
      {
        type: 'order', q: 'Ben has Chloe\'s blog code and its <code>requirements.txt</code>, on a new laptop. Put his steps in order.',
        items: ['cd chloe-blog', 'python3 -m venv .venv', 'source .venv/bin/activate', 'python -m pip install -r requirements.txt', 'python -m pytest'],
        why: 'Go into the project, build its kitchen, step in, fill the shelf from the shopping list, then cook. He gets pytest 8.4.2, exactly as Chloe has it.',
        hint: 'You cannot step into a kitchen that is not built yet.'
      },
      {
        type: 'bucket', q: 'Which of these go into git for Kitchen Coach, and which never do?',
        buckets: ['Commit it', 'Never commit it'],
        items: [
          ['coach.py', 0],
          ['test_coach.py', 0],
          ['requirements.txt', 0],
          ['.gitignore', 0],
          ['.venv/', 1],
          ['.venv/lib/python3.15/site-packages/pytest/', 1]
        ],
        why: 'Your code and the shopping list are the recipe. <code>.venv</code> is the kitchen: big, built for one computer, and easy to rebuild with <code>pip install -r requirements.txt</code>. <code>.gitignore</code> itself is committed, so everyone ignores the same things.',
        hint: 'Could Ben rebuild it from the shopping list?'
      },
      {
        type: 'match', q: 'Match each one to what it tells you.',
        pairs: [
          ['sys.prefix', 'The kitchen this Python cooks in right now'],
          ['sys.base_prefix', 'The real Python the kitchen was built from'],
          ['sys.executable', 'The exact python program that is running'],
          ['.venv/pyvenv.cfg', 'The label on the venv\'s door: version and home']
        ],
        why: 'Inside a venv, <code>sys.prefix</code> is the <code>.venv</code> folder, <code>sys.base_prefix</code> is the Python it came from, and <code>sys.executable</code> is <code>.venv/bin/python</code>. <code>pyvenv.cfg</code> writes down the same facts in a file.',
        hint: 'One is a file, three live in the sys module.'
      },
      {
        type: 'pick', q: 'Back to lesson 89. Yesterday <code>python3 -m pytest</code> ran Kitchen Coach\'s taste tests. Today, in a new terminal, you get this. What do you do?',
        pic: term(['$ python3 -m pytest', '/opt/homebrew/opt/python@3.15/bin/python3.15: No module named pytest'], 'terminal'),
        options: ['Switch the venv on with source .venv/bin/activate, then run pytest again', 'Install pytest into the shared Python', 'Delete test_coach.py', 'Rename the project folder'],
        answer: 0,
        why: 'A new terminal starts outside every kitchen. The path in the message is the shared Homebrew Python, whose shelf has no pytest. Activate the project\'s <code>.venv</code> (the prompt shows <code>(.venv)</code>) and pytest is there. In VS Code, the <code>.venv</code> interpreter does this for you.',
        hint: 'Which Python is named in the message?'
      },
      {
        type: 'pick', q: 'You renamed <code>kitchen-coach</code> to <code>coach</code>. Now the venv acts strange: <code>python</code> is not found. Which fixes are good? (pick all that apply)',
        options: ['Delete .venv and make it again with python3 -m venv .venv', 'Then fill it with python -m pip install -r requirements.txt', 'Copy a friend\'s .venv folder into the project', 'Install pytest into the shared Python with --break-system-packages'],
        answer: [0, 1],
        why: 'A venv keeps its full address inside its own files, so it breaks when the folder moves. It is disposable: delete it, build a new one, and refill it from the shopping list. A friend\'s <code>.venv</code> has their address in it, and the shared Python is locked for good reasons.',
        hint: 'A venv is disposable. What do you keep?'
      },
      {
        type: 'type', q: 'The venv is switched on. Type the command that writes every package on its shelf, with exact versions, into <code>requirements.txt</code>.',
        prompt: '(.venv) $',
        answers: ['python -m pip freeze > requirements.txt', 'python3 -m pip freeze > requirements.txt', 'pip freeze > requirements.txt'],
        why: '<code>pip freeze</code> prints <code>name==version</code> for every package, and <code>&gt;</code> sends that into the file (lesson 63). Inside the venv, <code>python</code> and <code>python3</code> are the same kitchen.',
        hint: 'python -m pip, then the word that "freezes" the versions, then > and the file name.'
      }
    ]
  });
})();
