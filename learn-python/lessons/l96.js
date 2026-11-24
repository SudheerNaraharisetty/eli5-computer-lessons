/* Lesson 96: How Python runs code (module 9). One file per lesson.
   Every Run box was checked with Python 3.14.4 (Homebrew) and in this page (Pyodide, Python 3.14).
   Terminal pictures are real: Python 3.15.2 and 3.14.4 (Homebrew) and /usr/bin/python3 3.9.6 (Apple),
   run on 2026-11-23 in a scratch folder. Only the folder part of full paths was changed to /Users/you/kitchen-coach.
   Bytecode names change between versions: 3.14 and 3.15 say LOAD_FAST_BORROW and LOAD_SMALL_INT,
   3.9 said LOAD_FAST, LOAD_CONST and BINARY_ADD. 3.15 says LOAD_COMMON_CONSTANT where 3.14 says LOAD_CONST (None).
   Pyodide sets sys.dont_write_bytecode, so __pycache__ is only shown in terminal pictures. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l96  How Python runs code
     ===================================================================== */

  // A small instruction tile, the same look in every picture.
  const tile = (x, y, w, h, text, col) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="#15132B" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 10, y + h / 2 + 4.5, text, { s: 11.5, m: true, a: 'start', f: col || '#ECEAFF', w: 700 });
  // A plate on the counter (the value stack).
  const plate = (x, y, v, fill) =>
    `<rect x="${x}" y="${y}" width="76" height="26" rx="13" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 38, y + 18, v, { s: 14, m: true });
  const badge = (x, y, n, col) => `<circle cx="${x}" cy="${y}" r="14" fill="${col || P.ink}"/>` + T(x, y + 5, String(n), { s: 13, f: P.white });

  /* ---- The idea: read, parse, compile, run ---- */
  const tNode = (x, y, w, s, col) => `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" fill="${P.white}" stroke="${col || P.ink}" stroke-width="2"/>` + T(x + w / 2, y + 16.5, s, { s: 12, m: true, f: col || P.ink });
  const row = (y, n, title, sub, col) => badge(30, y + 26, n, col) + T(54, y + 26, title, { s: 15, a: 'start' }) + T(54, y + 46, sub, { s: 12, a: 'start', w: 700, f: P.ink2 });
  const ideaSvg = svg(600, 372, 'Four stations, top to bottom. 1, Read: Python reads the whole text of the file, here the line return protein + 30. 2, Parse: the words become a small tree, Return, then a plus with protein and 30 under it. 3, Compile: the tree is rewritten as bytecode, four tiny steps: LOAD_FAST_BORROW protein, LOAD_SMALL_INT 30, BINARY_OP plus, RETURN_VALUE. 4, Run: the line cook does one step at a time. 115 and 30 go on the counter, plus turns them into 145, and 145 is handed back. Stations 1 to 3 happen before anything runs.',
    row(14, 1, 'Read', 'the whole file, as text', P.accent) +
    box(232, 18, 352, 56, P.warnT, 12) + T(250, 52, 'return protein + 30', { s: 15, m: true, a: 'start' }) + T(574, 36, 'coach.py', { s: 11, w: 700, f: P.ink2, a: 'end' }) +
    arrow(30, 46, 30, 96, P.ink, 2) +
    row(100, 2, 'Parse', 'words become a tree', P.accent) +
    `<path d="M300 126 L390 126 M390 126 L470 112 M390 126 L470 140" stroke="${P.ink}" stroke-width="2" fill="none"/>` +
    tNode(240, 114, 74, 'Return') + tNode(370, 114, 40, '+', P.accent) + tNode(460, 100, 90, 'protein') + tNode(460, 128, 40, '30') +
    arrow(30, 132, 30, 182, P.ink, 2) +
    row(186, 3, 'Compile', 'the tree becomes bytecode', P.accent) +
    tile(232, 186, 190, 26, 'LOAD_FAST_BORROW protein') + tile(430, 186, 154, 26, 'LOAD_SMALL_INT 30') +
    tile(232, 218, 190, 26, 'BINARY_OP (+)', '#FFC24B') + tile(430, 218, 154, 26, 'RETURN_VALUE') +
    arrow(30, 218, 30, 268, P.ink, 2) +
    row(272, 4, 'Run', 'one step at a time', P.ok) +
    plate(240, 266, '30') + plate(240, 294, '115') + arrow(326, 294, 372, 294, P.ok, 2.5) +
    plate(384, 280, '145', P.okT) + arrow(470, 294, 506, 294, P.ok, 2.5) + T(514, 299, 'handed back', { s: 12, w: 700, a: 'start', f: P.ok }) +
    `<path d="M210 16 L218 16 L218 246 L210 246" stroke="${P.accent}" stroke-width="2.5" fill="none"/>` +
    T(120, 356, 'Stations 1 to 3: the chef, before anything runs.', { s: 12.5, w: 700, f: P.accent, a: 'start' }));
  const treeBox = [
    'import ast',
    '',
    'card = "total = 650 + 820"',
    'tree = ast.parse(card)',
    'print(ast.dump(tree, indent=2))'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(treeBox, { title: 'tree.py' })}</div>`;

  /* ---- The code: dis shows the bytecode ---- */
  const shake = [
    'import dis',
    '',
    '',
    'def add_shake(protein):',
    '    return protein + 30',
    '',
    '',
    'print(add_shake(115))',
    'dis.dis(add_shake)'
  ];
  const stackSvg = svg(600, 250, 'The line cook runs add_shake(115), one step at a time, with a counter for the values. Step 1, LOAD_FAST_BORROW protein: 115 goes on the counter. Step 2, LOAD_SMALL_INT 30: 30 goes on top. Step 3, BINARY_OP plus: the top two come off, are added, and 145 goes back. Step 4, RETURN_VALUE: 145 is handed back to whoever asked, and the counter is empty.',
    [['LOAD_FAST_BORROW', 'protein', ['115'], 'put protein (115)', 'on the counter'],
     ['LOAD_SMALL_INT', '30', ['115', '30'], 'put 30', 'on top'],
     ['BINARY_OP', '(+)', ['145'], 'take 2 off, add,', 'put 1 back'],
     ['RETURN_VALUE', '', [], 'hand the top', 'value back']].map(([op, arg, stack, w1, w2], i) => {
      const x = 8 + i * 148;
      const hot = i === 2;
      return badge(x + 14, 18, i + 1, hot ? P.warn : P.ink) +
        `<rect x="${x}" y="36" width="136" height="48" rx="8" fill="#15132B" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + 68, 56, op, { s: 11.5, m: true, f: hot ? '#FFC24B' : '#ECEAFF', w: 700 }) + T(x + 68, 75, arg, { s: 11.5, m: true, f: '#C9C6FF', w: 700 }) +
        `<rect x="${x + 8}" y="96" width="120" height="96" rx="10" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + 68, 186, 'counter', { s: 11, w: 700, f: P.ink2 }) +
        stack.map((v, k) => plate(x + 30, 146 - k * 30, v, hot ? P.okT : P.white)).join('') +
        (i === 3 ? T(x + 68, 140, '145 out', { s: 13, f: P.ok }) : '') +
        T(x + 68, 216, w1, { s: 12, w: 700, f: P.ink2 }) + T(x + 68, 234, w2, { s: 12, w: 700, f: P.ink2 }) +
        (i < 3 ? arrow(x + 138, 60, x + 146, 60, P.ink, 2) : '');
    }).join(''));
  const codePic = `<div style="width:100%;min-width:0">${run(shake, { title: 'shake.py' })}${stackSvg}</div>`;

  /* ---- The pain: a SyntaxError stops everything, a NameError stops late ---- */
  const top4 = [
    'print("Coach is starting")',
    'print("Ana: pasta, 650 kcal")',
    'print("Ben: bean chili, 820 kcal")',
    'print("Chloe: rice pudding")'
  ];
  const smudge = top4.concat(['print("Total:" 650 + 820)']);
  const late = top4.concat(['print("Total:", totl)']);
  const seg = (x, y, w, s, fill, col) => `<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>` + T(x + w / 2, y + 20, s, { s: 11.5, f: col || P.ink });
  const lane = (y, name, stopAt, result, resCol) => {
    const steps = ['read', 'tree', 'bytecode', 'line 1', 'line 2', 'line 3', 'line 4', 'line 5'];
    const xs = [16, 76, 136, 232, 300, 368, 436, 504], ws = [56, 56, 88, 64, 64, 64, 64, 64];
    return T(16, y, name, { s: 13.5, m: true, a: 'start' }) +
      steps.map((s, i) => {
        const fill = i < stopAt ? P.okT : i === stopAt ? P.dangerT : P.sand;
        const col = i < stopAt ? P.ok : i === stopAt ? P.danger : P.mute;
        return seg(xs[i], y + 10, ws[i], i === stopAt ? '✗ ' + s : s, fill, col);
      }).join('') +
      T(16, y + 64, result, { s: 13, w: 800, f: resCol, a: 'start' });
  };
  const painSvg = svg(600, 214, 'Two files with a mistake on line 5. smudge.py has a missing comma: Python stops while reading, before line 1 runs. Printed: nothing. late.py has a name that was never made: reading, the tree and the bytecode are fine, lines 1 to 4 run and print, and line 5 stops with a NameError.',
      `<line x1="226" y1="14" x2="226" y2="196" stroke="${P.ink}" stroke-width="2" stroke-dasharray="5 6"/>` +
      T(120, 14, 'before anything runs', { s: 11.5, w: 700, f: P.accent }) + T(410, 14, 'running, line by line', { s: 11.5, w: 700, f: P.ok }) +
      lane(40, 'smudge.py: SyntaxError', 0, 'printed: nothing at all', P.danger) +
      lane(134, 'late.py: NameError', 7, 'printed: 4 lines, then the error', P.warn));
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(smudge, { title: 'smudge.py' })}<div style="height:14px"></div>${run(late, { title: 'late.py' })}</div>`;

  /* ---- The fix: check the card without cooking, and the saved rewrite ---- */
  const pyCompile = [
    '$ python3 -m py_compile coach.py',
    '  File "coach.py", line 5',
    '    print("Total:" 650 + 820)',
    '          ^^^^^^^^^^^^^^^^^^',
    'SyntaxError: invalid syntax. Perhaps you forgot a comma?',
    '# add the comma, then ask again. No news is good news:',
    '$ python3 -m py_compile coach.py',
    '$'
  ];
  const meals = ['def add_shake(protein):', '    return protein + 30'];
  const coach = ['import meals', '', 'print("Ben:", meals.add_shake(115), "g protein")'];
  const cache = [
    '$ ls',
    'coach.py  meals.py',
    '$ python3 coach.py',
    'Ben: 145 g protein',
    '$ ls',
    '__pycache__  coach.py  meals.py',
    '$ ls __pycache__',
    'meals.cpython-315.pyc',
    '# the same project, run once with Python 3.14:',
    '$ python3.14 coach.py',
    'Ben: 145 g protein',
    '$ ls __pycache__',
    'meals.cpython-314.pyc  meals.cpython-315.pyc',
    '# safe to delete. Python makes it again next time:',
    '$ rm -r __pycache__',
    '$ python3 coach.py',
    'Ben: 145 g protein'
  ];
  const nameSvg = svg(600, 120, 'The file name meals.cpython-315.pyc, taken apart: meals is the module it came from. cpython-315 is which Python made it, CPython 3.15. .pyc means Python compiled: bytecode.',
    box(20, 18, 560, 44, P.white, 12) +
    T(300, 47, 'meals . cpython-315 . pyc', { s: 18, m: true }) +
    T(150, 92, 'meals: from meals.py', { s: 12.5, w: 700, f: P.ink2 }) + T(312, 92, 'cpython-315: made by 3.15', { s: 12.5, w: 700, f: P.accent }) + T(490, 92, '.pyc: bytecode', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 114, 'one file per module, per Python version', { s: 12, w: 700, f: P.mute }));
  const fixPic = `<div style="width:100%;min-width:0">${term(pyCompile, 'terminal, Python 3.15: read and rewrite, without cooking')}` +
    code(meals, { title: 'meals.py' }) + code(coach, { title: 'coach.py' }) + term(cache, 'terminal, Python 3.15 and 3.14') + nameSvg + `</div>`;

  /* ---- Try it: who is cooking in this page, and a line cook that learns ---- */
  const who = [
    'import sys',
    '',
    'print(sys.implementation.name)',
    'print(sys.implementation.cache_tag)',
    'print(sys.version_info[:2])',
    'print(sys.platform)'
  ];
  const whoMac = ['$ python3 who.py', 'cpython', 'cpython-315', '(3, 15)', 'darwin'];
  const learn = [
    'import dis',
    '',
    '',
    'def add_shake(protein):',
    '    return protein + 30',
    '',
    '',
    '# a week of Ben\'s shakes',
    'for day in range(7):',
    '    add_shake(115)',
    '',
    'dis.dis(add_shake, adaptive=True)'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(who, { title: 'who.py' })}${term(whoMac, 'the same file on a Mac, Python 3.15')}<div style="height:14px"></div>${run(learn, { title: 'week.py' })}</div>`;

  /* ---- The catch: not machine code, not secret, not stable ---- */
  const versions = [
    '$ /usr/bin/python3 --version',
    'Python 3.9.6',
    '$ /usr/bin/python3 shake.py',
    '  5           0 LOAD_FAST                0 (protein)',
    '              2 LOAD_CONST               1 (30)',
    '              4 BINARY_ADD',
    '              6 RETURN_VALUE',
    '$ python3 shake.py',
    '  4           RESUME                   0',
    ' ',
    '  5           LOAD_FAST_BORROW         0 (protein)',
    '              LOAD_SMALL_INT          30',
    '              BINARY_OP                0 (+)',
    '              RETURN_VALUE'
  ];
  const fold = ['import dis', '', 'dis.dis("total = 650 + 820")'];
  const foldRun = [
    '$ python3.14 fold.py',
    '  0           RESUME                   0',
    ' ',
    '  1           LOAD_CONST               2 (1470)',
    '              STORE_NAME               0 (total)',
    '              LOAD_CONST               1 (None)',
    '              RETURN_VALUE',
    '$ python3.15 fold.py',
    '  0           RESUME                   0',
    ' ',
    '  1           LOAD_CONST               1 (1470)',
    '              STORE_NAME               0 (total)',
    '              LOAD_COMMON_CONSTANT     7 (None)',
    '              RETURN_VALUE'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${term(versions, 'terminal: shake.py (add_shake, then dis.dis) on two Pythons')}` +
    code(fold, { title: 'fold.py' }) + term(foldRun, 'terminal: 3.14 and 3.15 disagree') + `</div>`;

  COURSE.add({
    id: 'l96', minutes: 14,
    summary: 'When you type <code>python3 coach.py</code>, Python does not cook straight from your text. <b>First it reads the whole file</b> and turns the words into a tree (the <code>ast</code> module shows it). Then it <b>compiles</b> the tree into <b>bytecode</b>: tiny numbered steps like <code>LOAD_FAST_BORROW</code>, <code>BINARY_OP (+)</code> and <code>RETURN_VALUE</code> (the <code>dis</code> module shows them). Only then does the <b>interpreter loop</b> run the steps, one at a time, with a counter of values called the stack. That is why a <b>SyntaxError</b> stops a file before line 1 runs, while a <b>NameError</b> only stops it when that line is reached. <code>python3 -m py_compile</code> checks a file without running it. Python saves the bytecode of imported modules in <code>__pycache__</code> (<code>meals.cpython-315.pyc</code>) to start faster next time: safe to delete, never to commit. The standard Python is <b>CPython</b>, written in C, and this page runs CPython too, compiled to WebAssembly. Bytecode is not machine code, not a secret, and changes between Python versions.',
    video: {
      src: 'videos/l96-how-python-runs-code.mp4', poster: 'videos/l96-how-python-runs-code.jpg', length: '1 min 6 s',
      script: [
        'Ben types python3 coach.py. What happens before he sees 145?',
        'First, Python reads the whole card. Every line, before it cooks anything.',
        'The words become a small tree. Return, plus, and under it, protein and 30.',
        'Then the chef rewrites the tree as tiny numbered steps. This is bytecode. Load protein. Load 30. Binary op, plus. Return value.',
        'Now the line cook takes over, one step at a time. 115 goes on the counter. 30 goes on top. Plus takes both off, and puts back 145. Return hands it to Ben.',
        'Now smudge line 5. One comma is missing. The chef starts reading, stops at line 5, and rejects the whole card. Nothing is cooked. Not even line 1. Syntax error.',
        'Python reads the whole file, turns it into bytecode, then runs it one small step at a time.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The chef reads the whole card, rewrites it, then cooks.',
        text: [
          'Lesson 1 said a program is a recipe the computer follows <b>literally</b>. But who reads the recipe, and how? When you type <code>python3 coach.py</code>, four things happen, always in this order.',
          '<b>1. Read.</b> Python reads the <b>whole file</b> as text, every line, before it cooks anything. <b>2. Parse.</b> It works out what the words mean and builds a small <b>tree</b>: "return something, and that something is protein plus 30". <b>3. Compile.</b> It rewrites the tree as <b>bytecode</b>: a list of tiny numbered kitchen steps, much smaller than your lines. <b>4. Run.</b> A loop inside Python, the <b>line cook</b>, does those steps one at a time.',
          'The <code>ast</code> module (Abstract Syntax Tree) shows you station 2. Press <b>Run</b>: the line <code>total = 650 + 820</code> (Ana\'s pasta plus Ben\'s chili, in kcal) becomes an <code>Assign</code>. Its target is the name <code>total</code>, and its value is a <code>BinOp</code>: a <b>bin</b>ary <b>op</b>eration, one sign between two things, <code>650</code>, <code>Add()</code> and <code>820</code>.',
          'Change <code>+</code> to <code>*</code> on line 3 and run again. Only one word in the tree changes: <code>op=Mult()</code>.'
        ],
        tip: 'Python reads <code>Store()</code> as "a jar is being filled here". When a name is read instead, the tree says <code>Load()</code>. You never write trees by hand. Tools like Ruff (lesson 92) and pytest (lesson 89) read them to understand your code.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'dis shows the steps the line cook follows.',
        text: [
          'The <code>dis</code> module (short for <b>dis</b>assemble) prints the bytecode of a function. Press <b>Run</b>: first <code>145</code>, then four columns. The first number is the <b>line</b> in your file. Then the <b>instruction</b>, and what it works on.',
          'The line cook has a <b>counter</b>, where it puts values while it works. Programmers call it the <b>stack</b>: like plates, the last one put down is the first one taken. <code>LOAD_FAST_BORROW 0 (protein)</code> puts the value of <code>protein</code>, 115, on the counter. <code>LOAD_SMALL_INT 30</code> puts 30 on top. <code>BINARY_OP 0 (+)</code> takes the top two off, adds them, and puts one plate back: 145. <code>RETURN_VALUE</code> hands that plate back to whoever called the function.',
          '<code>RESUME</code> at the top is the cook saying "ready, start here". It is in every function. Your one line, <code>return protein + 30</code>, became four small steps. Real programs have thousands, and the line cook runs millions a second.',
          'Change <code>+ 30</code> to <code>* 2</code> on line 5 and run again. Which lines of the bytecode change?'
        ],
        tip: '<b>BORROW</b> is a speed trick from Python 3.14: the cook reads the jar without making its own copy of the value. The name says how, not what. It is still "load the value of protein".'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One smudge, and nothing is cooked. Not even line 1.',
        text: [
          'Both files have four good lines and one mistake on <b>line 5</b>. Press <b>Run</b> on <code>smudge.py</code>. Lines 1 to 4 are perfect, and still <b>nothing prints</b>, just a <code>SyntaxError</code>. The comma after <code>"Total:"</code> is missing, so the chef cannot read line 5, and a card that cannot be read cannot be rewritten into steps. The cook never gets the card.',
          'Now press <b>Run</b> on <code>late.py</code>. Four lines print, <b>then</b> <code>NameError: name \'totl\' is not defined</code>. This card reads fine: <code>totl</code> is a perfectly good name, as words go. Station 2 checks <b>grammar</b>, not <b>meaning</b>. Whether a jar called <code>totl</code> exists is only asked when the cook reaches step 5.',
          'Lesson 52 said a SyntaxError burns before cooking. Now you know why. A <code>SyntaxError</code> (and its cousin <code>IndentationError</code>) happens at stations 1 to 3, so the whole file stops. Every other error, <code>NameError</code>, <code>TypeError</code>, <code>ValueError</code>, <code>ZeroDivisionError</code>, happens at station 4, on the step that hits it, after every earlier step has already run.'
        ],
        warn: 'The opposite pain: a typo in a line that rarely runs passes stations 1 to 3 and waits, maybe for weeks, until the cook reaches it. That is lesson 92\'s <code>protien</code>. Ruff reads every line to catch those early.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Check the card without cooking. Keep the rewrite for next time.',
        text: [
          '<b>Read the error by its station.</b> Nothing printed and a <code>SyntaxError</code>? The card could not be read. Go to the line it names, look at the <code>^^^</code> marks, and read the last line of the error: Python often guesses the fix, like <code>Perhaps you forgot a comma?</code> Some lines printed, then an error? The card was fine, the cook hit a problem on that step, and everything before it already happened.',
          '<b>Check without cooking.</b> <code>python3 -m py_compile coach.py</code> does stations 1 to 3 and stops. A smudge gives the same <code>SyntaxError</code>. A clean card prints nothing at all, and not a single line of <code>coach.py</code> runs. Handy before you start a program that sends emails or deletes files.',
          '<b>The rewrite is kept.</b> Reading and rewriting take time, so when <code>coach.py</code> imports <code>meals.py</code> (lesson 60), Python saves the bytecode of <code>meals.py</code> in a folder called <code>__pycache__</code>. Next time, if <code>meals.py</code> has not changed, Python skips stations 1 to 3 for it and starts faster. If you edit <code>meals.py</code>, Python notices and rewrites it. The file you run, <code>coach.py</code>, is not cached: it is read fresh every time.',
          '<b>That is lesson 93\'s scrap.</b> <code>__pycache__</code> is made by Python, differs per Python version, and is remade whenever it is missing. That is why <code>.gitignore</code> lists <code>__pycache__/</code> and <code>*.pyc</code>, and why deleting it is always safe.'
        ],
        tip: 'Each Python version writes its own file: <code>cpython-314</code> and <code>cpython-315</code> sit side by side, because their bytecode is different.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'You have been using CPython all along.',
        text: [
          'The <code>python3</code> you installed in lesson 2 is <b>CPython</b>: the standard Python, a program written in the C language. It contains the chef, the rewriter and the line cook. Other Pythons exist (PyPy is one), but when people say "Python" they nearly always mean CPython.',
          'Press <b>Run</b> on <code>who.py</code>. It says <code>cpython</code>, <code>cpython-314</code> and <code>emscripten</code>. The Run boxes in this course use <b>Pyodide</b>: CPython itself, compiled to <b>WebAssembly</b> so it runs inside your browser. Every Run button you pressed since lesson 1 used the same reader, rewriter and line cook as your Mac. Only the platform differs: <code>darwin</code> is macOS.',
          '<b>The line cook learns.</b> Run <code>week.py</code>. After a few calls, <code>adaptive=True</code> shows <code>BINARY_OP_ADD_INT</code>: the cook noticed it is always adding two whole numbers and switched to a faster step just for that. Change <code>range(7)</code> to <code>range(1)</code> and run: after only one call it is still the general <code>BINARY_OP</code>. Python has done this since 3.11.',
          'Two more speed-ups are on the way. Since 3.13 there is an experimental <b>JIT</b> that turns the busiest bytecode into real machine code while the program runs. It is still experimental and off by default. And since 3.14 the <b>free-threaded</b> build, where several cooks can run steps at the same moment, is officially supported. Lesson 99, Concurrency, shows what that means.'
        ],
        tip: 'Lesson 101, The data model, shows what <code>BINARY_OP (+)</code> really asks: "dear left value, how do you add?" That is how <code>+</code> works on numbers, text and lists alike.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Bytecode is not machine code, not secret, and not stable.',
        text: [
          '<b>Not machine code.</b> Your computer\'s chip cannot run bytecode. Only the line cook, a loop inside CPython, can. That is why you need Python installed to run a <code>.py</code> file, and why one <code>.pyc</code> works on Mac, Windows and Linux alike, as long as the Python version is the same.',
          '<b>Not a secret.</b> Anyone with your <code>.pyc</code> files can read the steps with <code>dis</code>, and there are tools that turn them back into readable Python. Shipping only <code>.pyc</code> files does not hide your code. Passwords and keys still belong in <code>.env</code>, never in code (lesson 93). And never edit a <code>.pyc</code> by hand: change the <code>.py</code>, and Python rewrites the rest.',
          '<b>Not stable.</b> Bytecode changes with almost every Python version. The old Python 3.9 that comes with Apple\'s developer tools said <code>LOAD_FAST</code>, <code>LOAD_CONST</code> and <code>BINARY_ADD</code> for the same function. Even 3.14 and 3.15 disagree on <code>fold.py</code>. Use <code>dis</code> to look and learn, but never write a program or a test that depends on its exact output.',
          'Look at <code>fold.py</code> again: <code>LOAD_CONST 1470</code>. The chef did <code>650 + 820</code> <b>while rewriting</b>, because both numbers were already known. The cook never adds at all.'
        ],
        warn: 'Python is not "slow because it is interpreted" in one simple way. Lesson 98, Performance and profiling, shows how to <b>measure</b> which step is slow, instead of guessing.'
      }
    ],
    exercises: [
      {
        file: 'l96_read_first.py', title: 'Read first, then cook',
        task: '<code>add_protein(meals, shake)</code> should give Ben\'s protein for the day: his meals added up, <b>plus</b> his shake. Right now it forgets the shake. Predict what the bytecode shows, fix the return line, and check that <code>dis</code> now shows a <code>BINARY_OP</code> with <code>(+)</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file as it is. STEP 1 shows the tree of your return line and the bytecode. Is there a <code>BINARY_OP (+)</code>? Who does the adding now?',
          'Change the return line between <code>START</code> and <code>END</code> so it adds the shake. Before you run it, guess which new instruction appears.',
          'Run it. STEP 2 says <code>PASS</code> or gives one hint.',
          'Bonus: delete the colon at the end of the <code>def</code> line and run. Not even the STEP 1 heading prints. Put it back.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: 'You type <code>python3 coach.py</code>. Put what Python does in order.',
        items: ['Read the whole file as text', 'Parse the words into a tree', 'Compile the tree into bytecode', 'Run the bytecode, one step at a time'],
        why: 'The chef reads the whole card, understands it, rewrites it as tiny steps, and only then does the line cook start. Stations 1 to 3 finish before any of your lines runs.',
        hint: 'The cook can only follow steps that already exist.'
      },
      {
        type: 'pick', q: 'What does this program print?',
        pic: code(['print("Coach is starting")', 'print("Ana: 650 kcal")', 'print("Ben: 820 kcal")', 'if 650 + 820 > 1400', '    print("Big dinner tonight")'], { title: 'coach.py' }),
        options: ['Nothing, just a SyntaxError', 'The first 3 lines, then a SyntaxError', 'All 4 lines', 'The first 3 lines and no error'],
        answer: 0,
        why: 'Line 4 has no colon after the condition. Python reads the whole file before it runs anything, finds the smudge, and stops. Lines 1 to 3 are fine, and they still never run.',
        hint: 'Look at line 4 closely. When does Python find that kind of mistake?'
      },
      {
        type: 'bucket', q: 'When does Python find each mistake?',
        buckets: ['Reading: nothing runs', 'Running: earlier lines already ran'],
        items: [
          ['a missing colon after if', 0],
          ['a ( that is never closed', 0],
          ['wrong indentation', 0],
          ['a name that was never made', 1],
          ['int("some")', 1],
          ['dividing by zero', 1]
        ],
        why: 'Grammar is checked while reading: colons, brackets, indentation. That is a SyntaxError or IndentationError, and nothing runs. Meaning is checked while cooking: does the jar exist, can "some" become a number? Those errors stop the step that hits them.',
        hint: 'Could the chef spot it just by reading the words, without knowing any values?'
      },
      {
        type: 'fix', q: 'Press Run: nothing prints, not even line 1. Fix the card so all 4 lines print.',
        code: ['print("Coach is starting")', 'print("Ana: pasta, 650 kcal")', 'print("Ben: bean chili, 820 kcal")', 'print("Chloe: rice pudding, 410 kcal"'],
        title: 'coach.py',
        check: [
          'lines = out.splitlines()',
          'want = ["Coach is starting", "Ana: pasta, 650 kcal", "Ben: bean chili, 820 kcal", "Chloe: rice pudding, 410 kcal"]',
          'if lines == want:',
          '    ok = True',
          'elif len(lines) != 4:',
          '    msg = "It should print exactly 4 lines. It printed " + str(len(lines)) + "."',
          'else:',
          '    msg = "Close. Keep the words inside the quotes exactly as they were."'
        ].join('\n'),
        why: 'Line 4 never closed its bracket: <code>SyntaxError: \'(\' was never closed</code>. One missing <code>)</code> at the end stopped the whole card, because Python reads everything before it cooks anything.',
        hint: 'Read the last line of the error. Count the brackets on line 4.'
      },
      {
        type: 'match', q: 'Match each bytecode step to the line cook\'s job.',
        pairs: [
          ['LOAD_FAST_BORROW protein', 'put the value of protein on the counter'],
          ['LOAD_SMALL_INT 30', 'put the number 30 on the counter'],
          ['BINARY_OP (+)', 'take the top two off, add, put one back'],
          ['RETURN_VALUE', 'hand the top value back to the caller'],
          ['RESUME', '"ready, start here" at the top of a function']
        ],
        why: 'Each step is tiny. Your one line <code>return protein + 30</code> became the middle four. The counter is the <b>stack</b>: the last plate put down is the first one taken.',
        hint: 'LOAD means "put on the counter". BINARY means "two of them".'
      },
      {
        type: 'fix', q: 'Chloe\'s 320 kcal rice pudding with an 80 kcal topping should be <b>400</b> kcal. Press Run and read the bytecode: <code>BINARY_OP 5 (*)</code>. Fix it so it prints 400 and the bytecode shows <code>BINARY_OP (+)</code>.',
        code: ['import dis', '', '', 'def dessert_kcal(base, topping):', '    return base * topping', '', '', 'print(dessert_kcal(320, 80))', 'dis.dis(dessert_kcal)'],
        title: 'dessert.py',
        check: [
          'import dis as _dis',
          'f = globals().get("dessert_kcal")',
          'if not callable(f):',
          '    msg = "Keep the function  def dessert_kcal(base, topping):"',
          'elif not out.startswith("400"):',
          '    msg = "The first line printed should be 400. 320 kcal plus 80 kcal."',
          'elif not any("BINARY_OP" in i.opname and i.argrepr == "+" for i in _dis.get_instructions(f)):',
          '    msg = "It prints 400, but the bytecode has no BINARY_OP (+). Add base and topping with the + sign."',
          'elif f(250, 50) != 300:',
          '    msg = "dessert_kcal(250, 50) should be 300. Use the parameters, not fixed numbers."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>*</code> multiplied the two: 25600 kcal, quite a dessert. With <code>+</code> the step becomes <code>BINARY_OP 0 (+)</code>. Notice <code>LOAD_FAST_BORROW_LOAD_FAST_BORROW (base, topping)</code> above it: two loads glued into one step, another speed trick.',
        hint: 'Change one sign on line 5.'
      },
      {
        type: 'pick', q: 'Back to lesson 93. Your project has <code>__pycache__/meals.cpython-315.pyc</code>. What is it, and why is it in <code>.gitignore</code>?',
        options: ['Bytecode Python saved for meals.py. Python makes it again whenever it is missing, so it does not belong in Git', 'A backup of meals.py, so you must commit it in case meals.py is lost', 'The compiled, secret version of meals.py, which hides your code', 'A log of every time coach.py ran'],
        answer: 0,
        why: 'It is the rewritten card for <code>meals.py</code>, made by CPython 3.15, kept so the next import starts faster. Each computer and each Python version makes its own, and it is safe to delete. It is not a backup and not secret: anyone can read it with <code>dis</code>.',
        hint: 'Look at the name: the module, which Python made it, and .pyc.'
      },
      {
        type: 'pick', q: 'Which of these are true about bytecode? Pick all that apply.',
        options: ['It can be different in each Python version', 'Anyone with the .pyc can read the steps with dis', 'Your computer\'s chip runs it directly, like an app', 'Shipping only .pyc files keeps your code secret', 'This page runs bytecode too, with CPython compiled to WebAssembly'],
        answer: [0, 1, 4],
        why: 'Bytecode is for the line cook inside CPython, not for the chip. It changes between versions (3.9 said <code>BINARY_ADD</code>, 3.14 says <code>BINARY_OP</code>), and it hides nothing. Pyodide is CPython, so every Run box here followed the same steps.',
        hint: 'Two of the options are myths about .pyc files.'
      }
    ]
  });
})();
