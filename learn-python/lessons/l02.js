/* Lesson 2: Install Python and VS Code (module 0). One file per lesson.
   Install steps checked against python.org/downloads, docs.python.org/3/using/windows.html (3.15.2 docs)
   and code.visualstudio.com/docs/python/python-tutorial on 2026-11-19. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l02  Install Python and VS Code
     ===================================================================== */

  // A stove (Python), a laptop on the counter (VS Code) and a recipe holder (the Python extension).
  const stove = (x, y, lit) =>
    `<rect x="${x}" y="${y + 22}" width="130" height="150" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x}" y="${y}" width="130" height="28" rx="6" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<ellipse cx="${x + 35}" cy="${y + 14}" rx="20" ry="6" fill="${P.ink}"/><ellipse cx="${x + 95}" cy="${y + 14}" rx="20" ry="6" fill="${P.ink}"/>` +
    (lit ? `<path d="M${x + 22} ${y + 14} q4 -14 8 -2 q4 -14 8 -2 q4 -14 8 2z M${x + 82} ${y + 14} q4 -14 8 -2 q4 -14 8 -2 q4 -14 8 2z" fill="#FFC24B" stroke="${P.warn}" stroke-width="1.5"/>` : '') +
    `<rect x="${x + 16}" y="${y + 60}" width="98" height="96" rx="8" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>` +
    `<rect x="${x + 30}" y="${y + 50}" width="70" height="6" rx="3" fill="${P.ink}"/>`;
  const laptop = (x, y) =>
    `<rect x="${x}" y="${y}" width="120" height="78" rx="6" fill="#15132B" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 12}" y="${y + 18}" width="40" height="6" rx="3" fill="#C9C6FF"/><rect x="${x + 56}" y="${y + 18}" width="44" height="6" rx="3" fill="#A8E6C4"/>` +
    `<rect x="${x + 12}" y="${y + 34}" width="30" height="6" rx="3" fill="#FF6B8B"/><rect x="${x + 46}" y="${y + 34}" width="54" height="6" rx="3" fill="#A8E6C4"/>` +
    `<rect x="${x + 12}" y="${y + 50}" width="70" height="6" rx="3" fill="#C9C6FF"/>` +
    `<path d="M${x - 8} ${y + 80} H${x + 128} L${x + 122} ${y + 90} H${x - 2} Z" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const holder = (x, y) =>
    `<path d="M${x + 8} ${y + 66} L${x + 22} ${y + 44} L${x + 36} ${y + 66}" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<rect x="${x}" y="${y}" width="44" height="50" rx="4" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 8}" y="${y + 12}" width="28" height="5" rx="2.5" fill="${P.accent}"/><rect x="${x + 8}" y="${y + 23}" width="20" height="5" rx="2.5" fill="${P.ok}"/><rect x="${x + 8}" y="${y + 34}" width="24" height="5" rx="2.5" fill="${P.danger}"/>`;

  const kitchenPic = svg(600, 330, 'Your kitchen: the stove is Python, the counter with a laptop is VS Code, the recipe holder is the Python extension, and a terminal window is where you talk to the kitchen',
    T(300, 26, 'YOUR KITCHEN', { s: 13, f: P.ink2 }) +
    `<line x1="20" y1="232" x2="580" y2="232" stroke="${P.ink}" stroke-width="3"/>` +
    stove(36, 58, true) +
    `<rect x="214" y="160" width="190" height="72" rx="6" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    laptop(240, 68) + holder(372, 92) +
    box(440, 70, 140, 96, '#15132B', 10) +
    T(456, 100, '$ python3', { s: 13, m: true, f: '#ECEAFF', a: 'start' }) + T(456, 120, '  --version', { s: 13, m: true, f: '#ECEAFF', a: 'start' }) +
    T(456, 146, 'Python 3.15.2', { s: 13, m: true, f: '#7CF0B5', a: 'start' }) +
    [['The stove', 'Python 3.15', 101, P.accent], ['The counter', 'VS Code', 270, P.accent], ['The holder', 'Python extension', 394, P.ok], ['The terminal', 'talk to the kitchen', 510, P.danger]].map(([a, b, x, c], i) =>
      T(x, 262 + (i % 2) * 0, a, { s: 13.5 }) + T(x, 282, b, { s: 12.5, w: 700, f: c })).join('') +
    T(300, 318, 'cooks · where you write · colours and checks · where you type commands', { s: 12, w: 700, f: P.ink2 }));

  const checkPic = `<div style="width:100%">` +
    term(['# macOS or Linux', '$ python3 --version', 'Python 3.15.2'], 'VS Code terminal on a Mac') +
    term(['# Windows', '$ py --version', 'Python 3.15.2'], 'VS Code terminal on Windows') + `</div>`;

  const painPic = `<div style="width:100%">` +
    term(['# Python is not installed yet, or the terminal was opened before you installed it', '$ python3 --version', 'zsh: command not found: python3'], 'Mac: no stove found') +
    term(['# Windows, no Python installed: the Microsoft Store app opens instead', '$ python --version'], 'Windows: the Store opens') +
    term(['# The old Python that came with macOS', '$ /usr/bin/python3 --version', 'Python 3.9.6'], 'Mac: an old stove') + `</div>`;

  // The VS Code bottom bar and the Select Interpreter list.
  const fixPic = svg(600, 300, 'VS Code bottom bar shows Python 3.9.6. Clicking it opens Select Interpreter, where you pick Python 3.15.2',
    box(20, 18, 560, 170, P.white, 12) +
    T(40, 48, 'Select Interpreter', { s: 14, a: 'start', f: P.ink2 }) +
    `<rect x="32" y="62" width="536" height="56" rx="8" fill="${P.tint}"/><rect x="32" y="62" width="5" height="56" fill="${P.accent}"/>` +
    T(50, 86, 'Python 3.15.2', { s: 16, a: 'start' }) + T(50, 107, '/usr/local/bin/python3', { s: 12.5, w: 600, m: true, a: 'start', f: P.ink2 }) +
    `<path d="M520 80 l8 9 l16 -18" fill="none" stroke="${P.ok}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(50, 144, 'Python 3.9.6', { s: 15, a: 'start', f: P.ink2 }) + T(50, 165, '/usr/bin/python3  (came with macOS)', { s: 12.5, w: 600, m: true, a: 'start', f: P.ink2 }) +
    `<rect x="20" y="236" width="560" height="40" rx="6" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(36, 261, 'Ln 2, Col 1', { s: 13, w: 700, f: P.white, a: 'start' }) +
    T(560, 261, 'Python 3.9.6', { s: 14, f: P.white, a: 'end' }) +
    `<ellipse cx="510" cy="256" rx="62" ry="20" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="7 5"/>` +
    arrow(470, 230, 300, 194, P.danger, 2.5) +
    T(300, 296, 'the bottom bar of VS Code: click the version to change it', { s: 12.5, w: 700, f: P.ink2 }));

  const versionCode = [
    'import platform',
    'print("The stove in this page is Python")',
    'print(platform.python_version())'
  ];
  const setupCode = [
    'print("Kitchen setup")',
    'print("Stove: Python 3.15")',
    'print("Counter: VS Code")',
    'print("Recipe holder: the Python extension")'
  ];

  COURSE.add({
    id: 'l02', minutes: 20,
    summary: 'Set up your own kitchen: install <b>Python 3.15</b> (the stove that cooks your recipes) and <b>VS Code</b> (the counter where you write them), add the <b>Python extension</b>, and check the version in the <b>terminal</b>.',
    video: {
      src: 'videos/l02-install.mp4', poster: 'videos/l02-install.jpg', length: '1 min 11 s',
      script: [
        'Before you can cook, you need a kitchen.',
        'First, the stove. That is Python, the part that cooks your recipes. Download version 3.15 from python.org.',
        'Next, the counter, where you write. That is VS Code.',
        'Then snap on a recipe holder. That is the Python extension, made by Microsoft. It colours your code and catches typos.',
        'Now, check the stove. In VS Code, open the terminal. That is a window where you type commands to the computer. Type python3 --version. On Windows, type py instead.',
        'Python answers with its version. 3.15. Your stove works.',
        'Does the bottom bar of VS Code say 3.9? That is an old stove that came with your Mac. Click it, and pick 3.15.',
        'Online tutorials often use older versions. This course always tells you which one it uses.',
        'Python cooks. VS Code is where you write. The terminal tells you which stove you have.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: kitchenPic,
        h: 'Every cook needs a kitchen.',
        text: [
          'In lesson 1 you wrote a recipe for the computer. Now you need a kitchen on <b>your own computer</b> to cook it in. You set it up once, and use it for the whole course.',
          '<b>Python</b> is the stove. It is the program that reads your recipe and does the steps. This course uses <b>Python 3.15</b>, the newest version.',
          '<b>VS Code</b> is the counter where you write your recipes. It is a free code editor from Microsoft.',
          'The <b>Python extension</b> is a recipe holder that snaps onto the counter. It colours your code so it is easy to read, spots typos, and adds a Run button.'
        ],
        tip: 'Everything here is free. It takes about 15 minutes, most of it waiting for downloads.'
      },
      {
        label: 'The code', pic: checkPic,
        h: 'Install it, step by step.',
        text: [
          '<b>1. The stove (Python).</b> Go to <b>python.org/downloads</b>.',
          '<b>On a Mac:</b> click <b>Download Python 3.15.2</b> (or the newest 3.15). Open the file you downloaded and click Continue, then Install, until it says it is done.',
          '<b>On Windows:</b> click <b>Download Python install manager</b>. Open the file and click Install. Then open the Terminal app from the Start menu and type <code>py install 3.15</code>. If it asks a yes or no question, such as adding a folder to PATH, type <code>y</code>. PATH is the list of places where your computer looks for commands.',
          '<b>On Linux:</b> Python 3 is usually there already. Check it with <code>python3 --version</code>. If it is older than 3.14, install a newer one with your package manager or from python.org.',
          '<b>2. The counter (VS Code).</b> Go to <b>code.visualstudio.com</b>, download it for your computer, and install it. On a Mac, drag it into your Applications folder.',
          '<b>3. The recipe holder.</b> Open VS Code. Click the <b>Extensions</b> icon on the left (four small squares). Search for <b>Python</b>, pick the one by <b>Microsoft</b>, and click Install.',
          '<b>4. Check the stove.</b> In VS Code, open the menu <b>View</b>, then <b>Terminal</b>. A <b>terminal</b> is a window where you type commands to the computer. Type the command in the picture and press Enter. Python answers with its version.'
        ],
        tip: 'Installed Python while VS Code was open? Close VS Code and open it again. A terminal only finds programs that were installed before it opened.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Three classic first problems.',
        text: [
          '<b>"command not found".</b> The terminal looked for <code>python3</code> and found nothing. Either Python is not installed yet, or the terminal was opened before you installed it.',
          '<b>Windows opens the Microsoft Store.</b> When no Python is installed, typing <code>python</code> on Windows can open the Store app instead. On other setups it says the word is <b>not recognized</b>. Both mean the same: the stove is not there yet.',
          '<b>The wrong stove.</b> Many Macs already have an <b>old python3</b>, often 3.9.6, that came with Apple\'s developer tools. It is too old for this course. Some lessons use features that only exist in 3.14 and 3.15.',
          'If VS Code picks that old stove, your code runs on <b>3.9</b> even though you installed 3.15. You see it in the bottom bar of VS Code.'
        ],
        warn: 'Do not delete the Python that came with your Mac. macOS tools use it. Just install 3.15 next to it and tell VS Code to use the new one.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Tell VS Code which stove to use.',
        text: [
          '<b>Command not found:</b> install Python (step 1), then close VS Code and open it again.',
          '<b>Windows Store opens, or "not recognized":</b> install the Python install manager from python.org, then open a <b>new</b> terminal. Still stuck? Search the Start menu for <b>Manage app execution aliases</b> and check that the <b>Python</b> entries are switched on.',
          '<b>The wrong stove:</b> open any <code>.py</code> file. Look at the bar along the bottom of VS Code. On the right it shows the Python version VS Code uses. Click it, or open the Command Palette (<code>Ctrl+Shift+P</code>, or <code>Cmd+Shift+P</code> on a Mac) and type <b>Python: Select Interpreter</b>. Pick <b>3.15</b>.',
          '"Interpreter" is the word VS Code uses for "which Python". In the kitchen, it is which stove you cook on.'
        ],
        tip: 'Some tutorials show the older Windows installer, with a box at the bottom of its first screen called <b>Add python.exe to PATH</b>. If you use that installer, tick the box. If you forget, the terminal cannot find Python.'
      },
      {
        label: 'Try it', pic: run(setupCode, { title: 'kitchen.py' }),
        h: 'Cook lesson 1\'s menu for real.',
        text: [
          'First, get the course files. On the course\'s GitHub page, <b>github.com/SudheerNaraharisetty/eli5-computer-lessons</b>, press the green <b>Code</b> button, then <b>Download ZIP</b>. Unzip it somewhere you can find again, like your Documents folder.',
          'In VS Code, use <b>File</b>, then <b>Open Folder</b>, and pick the unzipped folder. Then type its location into the box under the exercise below, so <b>Open in VS Code</b> finds your files.',
          'Now go back to <b>lesson 1</b> and open its exercise, <code>l01_first_menu.py</code>. Press the <b>Run</b> button at the top right of VS Code. You see a <b>HINT</b> at the bottom. Write your three-line menu, save, and run again until it says <b>PASS</b>.',
          'Warm up here first: this box is the same kind of Python. Change line 2 to the version your terminal showed, like <code>Python 3.15.2</code>, then press Run.'
        ],
        tip: 'Does Run show 3.9 or a HINT about an old Python? That is the wrong stove from The pain. Click the version in the bottom bar and pick 3.15.'
      },
      {
        label: 'The catch', pic: run(versionCode, { title: 'which_stove.py' }),
        h: 'Versions matter.',
        text: [
          'Press Run. This page has its own small Python inside your browser, and it says <b>3.14.2</b>. It is close enough to run every example in the course, but it is not the Python on your computer. Your own stove is whatever <b>the terminal</b> says.',
          'Line 1, <code>import platform</code>, borrows a ready-made toolbox that comes with Python. Lesson 60, Modules and import, explains it. Line 3 asks it for the version number.',
          'Python changes a little every year. Tutorials online are often written for an <b>older</b> version, so a few things in them look different or are missing. When code from the web acts strangely, check which version it was written for.',
          'This course always tells you its version: <b>Python 3.15</b>. When a feature is new in 3.15, the lesson says so.'
        ],
        warn: 'Python 2 is a very old version that stopped getting updates in 2020. If a tutorial writes <code>print "hello"</code> without brackets, it is Python 2. Close it and find a newer one.'
      }
    ],
    exercises: [
      {
        file: 'l02_check_setup.py', title: 'Check your kitchen',
        task: 'Print the Python version your terminal shows. The file checks that VS Code runs it with <b>Python 3.14 or newer</b>, and that the version you printed matches the one VS Code really used.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Open the terminal (View, then Terminal) and type <code>python3 --version</code> on a Mac or Linux, or <code>py --version</code> on Windows.',
          'Change the line between <code>START</code> and <code>END</code> to print that version, for example <code>print("Python 3.15.2")</code>. Save the file.',
          'Run it with the Run button at the top right. Keep going until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Match each part of your coding kitchen to its job.',
        pairs: [
          ['Python', 'The stove: it reads your recipe and does the steps'],
          ['VS Code', 'The counter: where you write your code'],
          ['Python extension', 'The recipe holder: colours your code and spots typos'],
          ['Terminal', 'A window where you type commands to the computer']
        ],
        why: 'Python does the cooking. VS Code is where you write. The extension helps you write. The terminal is where you give the computer commands, like asking for the Python version.',
        hint: 'Which one actually cooks? Which one is only for writing?'
      },
      {
        type: 'order', q: 'Put the setup steps in a sensible order.',
        items: ['Install Python 3.15 from python.org', 'Install VS Code', 'Install the Python extension in VS Code', 'Open the course folder in VS Code', 'Check the version in the terminal'],
        why: 'Stove first, then the counter, then the holder that snaps onto the counter. Then open your recipes and check the stove works.',
        hint: 'You cannot add an extension to VS Code before VS Code is installed.'
      },
      {
        type: 'type', q: 'You are on a Mac. Type the command that asks Python for its version.',
        prompt: '$',
        answers: ['python3 --version', 'python3 -V'],
        why: '<code>python3</code> names the program, and <code>--version</code> asks it for its version. On Windows you type <code>py --version</code>.',
        hint: 'The program name on a Mac ends in 3. Then a space and two dashes.'
      },
      {
        type: 'pick', q: 'On your Mac the terminal says <code>Python 3.9.6</code>, even though the course uses 3.15. What is going on?',
        pic: term(['$ python3 --version', 'Python 3.9.6'], 'terminal'),
        options: ['That is the old Python that came with macOS. Install 3.15 from python.org, then open a new terminal.', 'Python 3.9.6 is newer than 3.15, so it is fine', 'Your computer is broken', 'Delete the old Python first'],
        answer: 0,
        why: 'Many Macs already have an old python3. After you install 3.15 and open a new terminal, <code>python3</code> finds the new one. Leave the old one alone: macOS uses it.',
        hint: 'Compare the numbers after the 3: is 9 newer than 15?'
      },
      {
        type: 'match', q: 'Match each problem to its fix.',
        pairs: [
          ['Install Python, then open a new terminal', '<code>command not found: python3</code>'],
          ['Install the Python install manager from python.org', 'Windows opens the Microsoft Store when you type <code>python</code>'],
          ['Python: Select Interpreter, then pick 3.15', 'The VS Code bottom bar says Python 3.9.6'],
          ['Install the Python extension by Microsoft', 'VS Code shows your code in one plain colour, with no Run button']
        ],
        why: 'No stove: install one. Wrong stove: pick the right one. No recipe holder: snap it on.',
        hint: 'Is the stove missing, or is VS Code using the wrong one?'
      },
      {
        type: 'pick', q: 'A Run box in this page says <code>3.14.2</code>. Your terminal says <code>Python 3.15.2</code>. Which one is the Python on <b>your</b> computer?',
        options: ['3.15.2, what the terminal says', '3.14.2, what the page says', 'Both are on your computer', 'Neither'],
        answer: 0,
        why: 'The page runs its own small Python inside your browser. The terminal talks to the Python installed on your computer.',
        hint: 'Which one did you install yourself?'
      },
      {
        type: 'fix', q: 'Back to lesson 1: this setup list stops with an error. Fix it so it prints both lines.',
        code: ['print("Stove: Python 3.15")', 'print("Counter: VS Code)'],
        title: 'kitchen.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Stove: Python 3.15", "Counter: VS Code"]:',
          '    ok = True',
          'elif len(lines) != 2:',
          '    msg = "It should print exactly 2 lines. It printed " + str(len(lines)) + "."',
          'else:',
          '    msg = "Close. Keep the words inside the quotes exactly as they were."'
        ].join('\n'),
        why: 'Every piece of text needs a quote mark at the start and at the end. Python reads the error from the bottom up, and so do you.',
        hint: 'Read the last line of the red error. Then look at the end of line 2: where does the text stop?'
      },
      {
        type: 'pick', q: 'A tutorial shows <code>print "Hello Ana"</code>, with no brackets. You get an error when you try it. Why?',
        options: ['The tutorial is for Python 2, a very old version', 'You need to install a bigger Python', 'VS Code is broken', 'Ana is not a real name'],
        answer: 0,
        why: 'In Python 2, print did not need brackets. Python 3 has needed them since 2008, so it stops with <code>SyntaxError: Missing parentheses in call to \'print\'</code>. Always check which version a tutorial uses.',
        hint: 'How did you write print in lesson 1?'
      }
    ]
  });
})();
