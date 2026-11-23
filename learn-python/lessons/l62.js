/* Lesson 62: Lazy imports (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l62  Lazy imports  (new in Python 3.15)
     Every lazy import example is a terminal picture with real Python 3.15.2 output.
     The Run boxes run Python 3.14, which does not have lazy import.
     ===================================================================== */

  // The slow cookbook. In the terminal pictures it waits 1 second when it loads.
  const BIG = [
    '# big_cookbook.py: 400 recipes and a meal plan for every guest',
    'import time',
    '',
    'print("loading big cookbook...")',
    'time.sleep(1)  # pretend: reading 400 recipes takes 1 second',
    '',
    '',
    'def plan(guest):',
    '    return f"Meal plan for {guest}: 7 days, 21 meals"'
  ];
  // The same cookbook for the Run boxes: half a second is enough to see.
  const BIG_RUN = { 'big_cookbook.py': BIG.join('\n').replace('time.sleep(1)  # pretend: reading 400 recipes takes 1 second', 'time.sleep(0.5)  # pretend: reading 400 recipes takes a while') + '\n' };

  // Kitchen Coach, grown: seven cookbooks at the top, one of them slow.
  const COACH = [
    'import time',
    'start = time.perf_counter()',
    '',
    'import json',
    'import math',
    'import random',
    'import pathlib',
    'import kitchen',
    'import big_cookbook',
    '',
    'print(f"Ready in {time.perf_counter() - start:.2f} s")',
    'mode = input("Mode (shopping or plan)? ")',
    'if mode == "plan":',
    '    print(big_cookbook.plan("Ana"))',
    'else:',
    '    print("Shopping list: oats, rice, tofu")'
  ];
  const LAZY = COACH.slice(); LAZY[8] = 'lazy import big_cookbook';
  const TYPO = LAZY.map(l => l.replace(/big_cookbook/g, 'big_cookbok'));

  // A book standing up: spine with its label written bottom to top (same drawing as lesson 60).
  const book = (x, base, w, h, fill, label, txt) =>
    `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<text transform="translate(${x + w / 2 + 5} ${base - 10}) rotate(-90)" font-size="13" font-weight="800" fill="${txt || P.ink}">${label}</text>`;
  const smallBooks = (x0, base) => [['json', P.tint], ['math', P.warnT], ['random', P.dangerT], ['pathlib', P.okT], ['kitchen', P.accent, P.white]]
    .map((b, i) => book(x0 + i * 30, base, 26, 74 + (i % 3) * 8, b[1], b[0], b[2])).join('');

  const ideaSvg = svg(600, 330, 'Left, normal import: at every start all the cookbooks come down onto the counter, the big cookbook too, and Kitchen Coach is ready after about 1 second. Right, lazy import: the small books come down, but the big cookbook stays on the shelf with a sticky note that says later. Ready after about 0.01 seconds. It comes down only when the code says big_cookbook.plan.',
    T(150, 24, 'import big_cookbook', { s: 14, m: true, f: P.danger }) +
    T(150, 44, 'every book comes down, every run', { s: 12.5, w: 700, f: P.ink2 }) +
    smallBooks(34, 250) + book(190, 250, 64, 150, P.warn, 'big_cookbook', P.white) +
    `<rect x="24" y="250" width="252" height="10" rx="3" fill="${P.ink}"/>` + T(150, 282, 'the counter', { s: 12, w: 700, f: P.ink2 }) +
    box(60, 292, 180, 30, P.dangerT, 10) + T(150, 312, 'Ready in about 1 s', { s: 13, f: P.danger }) +
    `<line x1="300" y1="14" x2="300" y2="322" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(450, 24, 'lazy import big_cookbook', { s: 14, m: true, f: P.ok }) +
    T(450, 44, 'the big one waits on the shelf', { s: 12.5, w: 700, f: P.ink2 }) +
    `<rect x="470" y="196" width="120" height="8" rx="3" fill="${P.ink}"/>` +
    book(500, 196, 64, 134, P.warn, 'big_cookbook', P.white) +
    `<rect x="548" y="74" width="48" height="24" rx="4" fill="#FFE58A" stroke="${P.ink}" stroke-width="2"/>` + T(572, 91, 'later', { s: 11.5 }) +
    smallBooks(320, 250) +
    `<rect x="312" y="250" width="164" height="10" rx="3" fill="${P.ink}"/>` + T(394, 282, 'the counter', { s: 12, w: 700, f: P.ink2 }) +
    box(330, 292, 210, 30, P.okT, 10) + T(435, 312, 'Ready in about 0.01 s', { s: 13, f: P.ok }) +
    T(532, 228, 'comes down at the', { s: 11.5, w: 700, f: P.ink2 }) + T(532, 244, 'first big_cookbook.', { s: 11.5, m: true, f: P.ink2 }));

  /* ---------- The idea: every run opens every cookbook ---------- */
  const ideaPic = `<div style="width:100%;min-width:0">${code(BIG, { title: 'big_cookbook.py (the slow one)', hi: [4, 5] })}${code(COACH, { title: 'coach.py', hi: [9] })}` +
    term(['$ python3 coach.py', 'loading big cookbook...', 'Ready in 1.02 s', 'Mode (shopping or plan)? shopping', 'Shopping list: oats, rice, tofu'], 'terminal, Python 3.15: most days') +
    term(['$ python3 coach.py', 'loading big cookbook...', 'Ready in 1.01 s', 'Mode (shopping or plan)? plan', 'Meal plan for Ana: 7 days, 21 meals'], 'terminal, Python 3.15: plan day') + `</div>`;

  /* ---------- The code: lazy import ---------- */
  const lazyJson = [
    'lazy import json',
    '',
    'pantry = {"rice": 900, "oats": 400}',
    'print(json.dumps(pantry))'
  ];
  const codePic = `<div style="width:100%;min-width:0">${ideaSvg}${code(LAZY, { title: 'coach.py, one word added', good: [9], hi: [14] })}` +
    term(['$ python3.15 coach.py', 'Ready in 0.01 s', 'Mode (shopping or plan)? shopping', 'Shopping list: oats, rice, tofu'], 'terminal, Python 3.15: most days') +
    term(['$ python3.15 coach.py', 'Ready in 0.01 s', 'Mode (shopping or plan)? plan', 'loading big cookbook...', 'Meal plan for Ana: 7 days, 21 meals'], 'terminal, Python 3.15: plan day') +
    run(lazyJson, { title: 'pantry.py' }) + `</div>`;

  /* ---------- The pain: a typo hides until the plan day ---------- */
  const painPic = `<div style="width:100%;min-width:0">${code(TYPO, { title: 'coach.py, one letter missing (cookbok)', bad: [9, 14] })}` +
    term(['$ python3.15 coach.py', 'Ready in 0.01 s', 'Mode (shopping or plan)? shopping', 'Shopping list: oats, rice, tofu'], 'Monday to Saturday: no error at all') +
    term(['$ python3.15 coach.py', 'Ready in 0.01 s', 'Mode (shopping or plan)? plan', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/coach.py", line 9, in <module>', '    lazy import big_cookbok', "ImportError: lazy import of 'big_cookbok' raised an exception during resolution", '', 'The above exception was the direct cause of the following exception:', '', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/coach.py", line 14, in <module>', '    print(big_cookbok.plan("Ana"))', '          ^^^^^^^^^^^', "ModuleNotFoundError: No module named 'big_cookbok'. Did you mean: 'big_cookbook'?"], 'Sunday, plan day: Python 3.15') +
    term(['$ python3.15 coach.py', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/coach.py", line 9, in <module>', '    import big_cookbok', "ModuleNotFoundError: No module named 'big_cookbok'. Did you mean: 'big_cookbook'?"], 'the same typo with a normal import: it fails on the first run') + `</div>`;

  /* ---------- The fix: read both halves, and run every mode ---------- */
  const fixSvg = svg(600, 200, 'The lazy import traceback has two halves. The first half points at line 9, the lazy import line, and says the import failed. The second half points at line 14, where the name was first used, and says what went wrong: no module named big_cookbok. Read the last line first, then look at both line numbers.',
    box(20, 16, 560, 74, P.warnT, 12) + T(36, 42, 'first half', { s: 12.5, f: P.warn, a: 'start' }) +
    T(36, 68, 'line 9    lazy import big_cookbok', { s: 14, m: true, a: 'start' }) + T(562, 68, 'WHERE you asked', { s: 12.5, f: P.warn, a: 'end' }) +
    T(300, 110, 'was the direct cause of', { s: 12.5, w: 700, f: P.ink2 }) +
    box(20, 120, 560, 74, P.dangerT, 12) + T(36, 146, 'second half (read this line first)', { s: 12.5, f: P.danger, a: 'start' }) +
    T(36, 172, 'line 14   big_cookbok.plan(...)', { s: 14, m: true, a: 'start' }) + T(562, 172, 'WHEN it loaded', { s: 12.5, f: P.danger, a: 'end' }));
  const fixPic = `<div style="width:100%;min-width:0">${fixSvg}` +
    term(['$ python3.15 coach.py', 'Ready in 0.01 s', 'Mode (shopping or plan)? shopping', 'Shopping list: oats, rice, tofu', '$ python3.15 coach.py', 'Ready in 0.01 s', 'Mode (shopping or plan)? plan', 'loading big cookbook...', 'Meal plan for Ana: 7 days, 21 meals'], 'after a change: run every mode once, Python 3.15') + `</div>`;

  /* ---------- Try it: the old trick that works everywhere ---------- */
  const inside = [
    'import time',
    'start = time.perf_counter()',
    '',
    '',
    'def show_plan(guest):',
    '    import big_cookbook  # opened only when this card runs',
    '    print(big_cookbook.plan(guest))',
    '',
    '',
    'print(f"Ready in {time.perf_counter() - start:.2f} s")',
    'mode = input("Mode (shopping or plan)? ")',
    'if mode == "plan":',
    '    show_plan("Ana")',
    'else:',
    '    print("Shopping list: oats, rice, tofu")'
  ];

  /* ---------- The catch: where lazy is not allowed, and when not to use it ---------- */
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(['def show_plan(guest):', '    lazy import big_cookbook', '    print(big_cookbook.plan(guest))'], { title: 'coach.py, lazy inside a def', bad: [2] }) +
    term(['$ python3.15 coach.py', '  File "/Users/you/kitchen/coach.py", line 2', '    lazy import big_cookbook', '    ^^^^^^^^^^^^^^^^^^^^^^^^', 'SyntaxError: lazy import not allowed inside functions'], 'terminal, Python 3.15') +
    code(['try:', '    lazy import big_cookbook', 'except ImportError:', '    print("No big cookbook today")'], { title: 'coach.py, lazy inside try', bad: [2] }) +
    term(['$ python3.15 coach.py', '  File "/Users/you/kitchen/coach.py", line 2', '    lazy import big_cookbook', '    ^^^^^^^^^^^^^^^^^^^^^^^^', 'SyntaxError: lazy import not allowed inside try/except blocks'], 'terminal, Python 3.15') + `</div>`;

  COURSE.add({
    id: 'l62', minutes: 12,
    summary: 'A normal <code>import</code> opens the cookbook <b>at the import line</b>: its top-level code runs right there (lesson 60), even if this run never uses it. New in <b>Python 3.15</b>: <code>lazy import big_cookbook</code> puts a "later" note on the name instead. The cookbook loads the <b>first time</b> your code uses it, like <code>big_cookbook.plan("Ana")</code>, and never if you do not. Kitchen Coach starts in about 0.01 s instead of about 1 s. The price: a misspelled module name no longer fails at the top. It fails <b>later</b>, at the first use, maybe days later. So run every mode once after a change. <code>lazy</code> only works at the top level of a file, not inside a <code>def</code> or a <code>try</code>. The trick that works in every Python, even in this page\'s 3.14: put the <code>import</code> inside the function that needs it.',
    video: {
      src: 'videos/l62-lazy-imports.mp4', poster: 'videos/l62-lazy-imports.jpg', length: '1 min 6 s',
      script: [
        'Kitchen Coach has grown. It imports 7 cookbooks at the top. One of them, the big cookbook, takes a second to open.',
        'A normal import opens every book at the import line. On every run. Even when you only want the shopping list.',
        'So Coach is ready in 1 second. 6 days out of 7, you wait for a book you never read.',
        'Python 3.15 adds one word. Lazy. lazy import big_cookbook puts a sticky note on the book. Later.',
        'Now Coach is ready in a hundredth of a second. The big book stays on the shelf.',
        'On plan day, the code says big_cookbook.plan. That first use brings the book down, right then.',
        'The catch. Misspell its name, and nothing fails at the top. The error waits for the next plan day, far from the import line. So run every mode once.',
        'Lazy import waits until you actually use the cookbook. Faster starts, but errors show up later.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every run opens every cookbook.',
        text: [
          'Kitchen Coach has grown. <code>coach.py</code> now imports <b>7 cookbooks</b> at the top. Six are quick. One, <code>big_cookbook.py</code>, holds 400 recipes and a meal plan for each guest. Loading it is slow. Here a <code>time.sleep(1)</code> pretends it takes 1 second.',
          'Remember lesson 60: <code>import</code> runs the module\'s <b>top-level code</b>, once, right at the import line. So line 9 prints <code>loading big cookbook...</code> and waits 1 second, on <b>every</b> run.',
          'But most days you only want the shopping list. Ana asks for a meal plan once a week. Six days out of seven, you wait for a book you never open.',
          '<code>time.perf_counter()</code> is the stopwatch from lesson 42. Line 2 starts it, line 11 prints how long the start took: about 1 second, every time.'
        ],
        tip: 'Real programs have this problem too. A tool can import big libraries for charts or spreadsheets, and then you only asked it for its help text. Lesson 63, pip and packages, shows where those big cookbooks come from.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'lazy import: open it when you first use it.',
        text: [
          'Python 3.15 adds one word: <code>lazy</code>. Write <code>lazy import big_cookbook</code>, and Python does <b>not</b> open the book at that line. It puts a sticky note on the name <code>big_cookbook</code> that says "later".',
          'The book loads the <b>first time your code uses the name</b>. Here that is line 14, <code>big_cookbook.plan("Ana")</code>. In shopping mode line 14 never runs, so the book never loads. No <code>loading big cookbook...</code>, and Coach is ready in about 0.01 s instead of about 1 s. Your numbers will be a little different.',
          'On plan day it still works. The loading line appears <b>after</b> you type <code>plan</code>, right when line 14 needs the book. After that it is a normal module. Use it ten times and it still loads once.',
          '<code>lazy from big_cookbook import plan</code> works the same way: the book loads when you first call <code>plan</code>.',
          '<b>This page runs Python 3.14</b>, which is older than <code>lazy</code>. Press <b>Run</b> on the last box to see what 3.14 says: <code>SyntaxError: invalid syntax</code>, with the marks under <code>import</code>. Then delete the word <code>lazy</code> and run it again. A normal import works everywhere.'
        ],
        tip: '<code>lazy</code> is a <b>soft keyword</b>: it is special only right before <code>import</code> or <code>from</code>. A variable called <code>lazy</code> still works. Lesson 2 shows how to install Python 3.15 on your computer.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A typo now waits for you.',
        text: [
          'You type <code>big_cookbok</code>, one letter short, on line 9 and on line 14. With a normal import, the very first run stops at line 9 with <code>ModuleNotFoundError</code>. You fix it in ten seconds.',
          'With <code>lazy import</code>, Python does not look for the book at line 9. Monday to Saturday you only ask for the shopping list, and <b>everything works</b>. No error, no warning.',
          'Then on Sunday Ana asks for her plan. Line 14 uses the name for the first time, Python finally looks for <code>big_cookbok.py</code>, and the program stops. The mistake was made days ago, far from where it shows up.',
          'That is the trade. A lazy import makes the start fast, and it moves the error <b>later</b>.'
        ],
        warn: 'A lazy import is only checked when it is used. Code that never runs in your tests can hide a broken import for a long time.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Read both halves, and run every mode.',
        text: [
          'The Sunday error is long, but Python is kind. Read it <b>from the bottom up</b> (lesson 4). The last line says what is wrong: <code>No module named \'big_cookbok\'</code>, and even <code>Did you mean: \'big_cookbook\'?</code>',
          'The traceback has <b>two halves</b>. The second half shows <b>when</b> the book was needed: line 14. The first half, above "was the direct cause of", shows <b>where</b> you asked for it: line 9, the <code>lazy import</code> line. That is the line to fix.',
          'To catch it before Sunday: after you change an import, <b>run every mode once</b>. Shopping, then plan. If both work, every lazy cookbook has been opened at least once.',
          'And keep lazy for the books that are slow <b>and</b> often unused. <code>json</code> and <code>math</code> load in a blink, so a normal import is fine for them.'
        ],
        tip: 'Lesson 89, Testing with pytest, makes "run every mode once" automatic. For now, two runs by hand are enough.'
      },
      {
        label: 'Try it', pic: run(inside, { title: 'coach.py, works in every Python', files: BIG_RUN }),
        h: 'The old trick: import inside the def.',
        text: [
          'Before 3.15, people got the same effect another way: put the <code>import</code> <b>inside the function</b> that needs the book. That works in every Python, so it works in this page too. <code>big_cookbook.py</code> is already in the box\'s folder. Here it waits half a second.',
          'Press <b>Run</b> and type <code>shopping</code>. Ready in about 0.00 s, and no loading line: <code>show_plan</code> never ran, so its import never ran.',
          'Run it again and type <code>plan</code>. Now line 6 runs, the book loads, and Ana gets her plan.',
          'Now see the slow start. Cut line 6 and paste it at the top as line 3, with no spaces in front. Run it and type <code>shopping</code>: the loading line is back, and the start takes about 0.5 s.'
        ],
        tip: 'Which one to pick? On 3.15, <code>lazy import</code> keeps all your imports at the top, where readers look for them. The import-inside-a-def trick hides one in the middle of the file, but it runs on any Python.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Top level only, and not for everything.',
        text: [
          '<b>Top level only.</b> <code>lazy import</code> must sit at the left edge of the file. Inside a <code>def</code>, Python 3.15 refuses: <code>lazy import not allowed inside functions</code>. A def already runs its import late, so there it would mean nothing.',
          '<b>Not inside try.</b> A <code>try</code> around an import is there to catch a missing book (lesson 53). A lazy import does not look for the book at that line, so there would be nothing to catch. Python says so: <code>not allowed inside try/except blocks</code>. Both are SyntaxErrors, so the file does not run at all.',
          '<b>When not to use it.</b> In a small script that always uses every import, lazy makes nothing faster. It only moves errors later. And when you want every problem <b>up front</b>, the moment the program starts, keep the normal import.',
          '<b>Older Python.</b> 3.14 and older do not know <code>lazy</code>. If your program has to run there too, use the import-inside-a-def trick.'
        ],
        warn: 'Rule of thumb: normal <code>import</code> by default. <code>lazy import</code> for a book that is slow to open and that many runs never touch.'
      }
    ],
    exercises: [
      {
        file: 'l62_coach.py', title: 'Leave the big cookbook on the shelf',
        task: 'This exercise is <b>two files</b>. <code>l62_big_cookbook.py</code> is slow: it waits 1 second and prints <code>loading big cookbook...</code> when it loads. <code>l62_coach.py</code> is Kitchen Coach, which imports it at the top. Change Coach so that in <b>shopping</b> mode the big cookbook is never loaded, and in <b>plan</b> mode it still is. On Python 3.15, use <code>lazy import</code>. On an older Python, move the import inside <code>show_plan</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. Next to it, in the same folder, is <code>l62_big_cookbook.py</code>. You do not change that one.',
          'Run <code>l62_coach.py</code> first. The check runs Coach twice, once in each mode, and shows you what each run printed. It also tells you which Python you have.',
          'Python 3.15: between <code>START</code> and <code>END</code>, add the word <code>lazy</code> in front of the import. Older Python: move the import line inside <code>show_plan</code>, pushed in by 4 spaces. (On an older Python, <code>lazy</code> stops the whole file with <code>SyntaxError: invalid syntax</code> before the check can even start.)',
          'Save and run <code>l62_coach.py</code> again until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Python 3.15. You run this and type <code>shopping</code>. Does <code>loading big cookbook...</code> appear?',
        pic: code(['lazy import big_cookbook', '', 'mode = input("Mode? ")', 'if mode == "plan":', '    print(big_cookbook.plan("Ana"))', 'else:', '    print("Shopping list: oats, rice, tofu")'], { title: 'coach.py' }),
        options: ['No: the book loads only when line 5 uses it, and line 5 does not run', 'Yes, at line 1, before the question', 'Yes, at the very end of the program', 'No, and plan mode would never load it either'],
        answer: 0,
        why: 'A lazy import loads the module the first time the name is used. In shopping mode, nothing uses <code>big_cookbook</code>, so it is never loaded. In plan mode, line 5 uses it, and it loads right there.',
        hint: 'Which line is the first one that uses the name big_cookbook?'
      },
      {
        type: 'pick', q: 'Back to lesson 60. <code>big_cookbook.py</code> prints <code>loading big cookbook...</code> at its left edge. How many times does that line appear when you run this with <code>python3.15 coach.py</code>?',
        pic: code(['lazy import big_cookbook', '', 'print(big_cookbook.plan("Ana"))', 'print(big_cookbook.plan("Ben"))', 'print(big_cookbook.plan("Chloe"))'], { title: 'coach.py' }),
        options: ['Once, just before Ana\'s plan', 'Three times, once per plan', 'Never: lazy books do not run their top-level code', 'Once, before anything else, at line 1'],
        answer: 0,
        why: 'Lazy only changes <b>when</b> the book is opened. On the first use, line 3, Python runs its top-level code, once, and keeps the module. Lines 4 and 5 reuse it, exactly like a second import in lesson 60.',
        hint: 'Lesson 60: a module\'s top-level code runs once.'
      },
      {
        type: 'fix', q: 'This page runs Python 3.14, so <code>lazy</code> is a SyntaxError here. Make it run in the page, and still open <code>random</code> only when a dessert is picked: move the import <b>inside</b> <code>pick_dessert</code>.',
        code: ['lazy import random', '', '', 'def pick_dessert():', '    return random.choice(["trifle", "sorbet", "rice pudding"])', '', '', 'print("Shopping list: oats, rice, tofu")', 'print("Dessert for Chloe:", pick_dessert())'],
        title: 'dessert.py',
        check: [
          'if "Dessert for Chloe:" not in out or "Shopping list" not in out:',
          '    msg = "It should print the shopping list and a dessert for Chloe."',
          'elif "random" in globals():',
          '    msg = "It runs, but random is still imported at the top. Move the import line inside pick_dessert, pushed in by 4 spaces."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Inside a def, <code>import random</code> runs only when <code>pick_dessert()</code> is called. That is the trick that works in every Python. On 3.15 you could keep <code>lazy import random</code> at the top instead.',
        hint: 'Delete line 1. Add <code>import random</code> as the first line inside <code>pick_dessert</code>, 4 spaces in.'
      },
      {
        type: 'pick', q: 'Python 3.15. Which of these lines are SyntaxErrors?',
        options: ['lazy import json   (inside a def)', 'lazy import json   (inside a try)', 'lazy import json   (at the top of the file)', 'lazy from json import dumps   (at the top of the file)'],
        answer: [0, 1],
        why: 'Lazy imports must be at the top level of the file. Inside a function Python says <code>lazy import not allowed inside functions</code>, and inside a try it says <code>not allowed inside try/except blocks</code>. At the top, both <code>lazy import</code> and <code>lazy from ... import</code> are fine.',
        hint: 'Top level is fine. Two places are not.'
      },
      {
        type: 'pick', q: 'Python 3.15. Line 1 says <code>lazy import big_cookbok</code>, one letter short. When do you find out?',
        options: ['The first time a run uses big_cookbok, maybe days later', 'Right away, at line 1, on the first run', 'Never: Python fixes the spelling for you', 'When you save the file'],
        answer: 0,
        why: 'A lazy import does not look for the file at the import line. The <code>ModuleNotFoundError</code> appears at the first use. Runs that never use it work fine, so the typo can hide. Run every mode once after a change.',
        hint: 'When does a lazy import actually look for the file?'
      },
      {
        type: 'bucket', q: 'Lazy or normal? Sort each case.',
        buckets: ['lazy import', 'normal import'],
        items: [
          ['A slow cookbook only plan mode uses', 0],
          ['A big chart library, used by one rare menu option', 0],
          ['A 10-line script that uses json on every run', 1],
          ['You want a missing module to stop the program at once', 1],
          ['Your program must also run on Python 3.14', 1],
          ['A slow report module that most runs skip', 0]
        ],
        why: 'Lazy pays off when a module is slow to load and many runs never use it. When every run uses it, when you want errors up front, or when older Pythons must run the file, keep the normal import (or put it inside a def for old Pythons).',
        hint: 'Ask: is it slow, and do many runs skip it?'
      },
      {
        type: 'pick', q: 'The Run boxes on this page use Python 3.14. What does 3.14 print for <code>lazy import json</code>?',
        options: ['SyntaxError: invalid syntax', 'ModuleNotFoundError: No module named \'lazy\'', 'Nothing: it imports json normally', 'NameError: name \'lazy\' is not defined'],
        answer: 0,
        why: 'Python 3.14 does not know the <code>lazy</code> keyword, so it cannot read the line at all. It stops before running anything with <code>SyntaxError: invalid syntax</code>.',
        hint: 'Try it in the Run box in "The code".'
      },
      {
        type: 'type', q: 'Python 3.15. Type the line that imports <code>big_cookbook</code> so it loads only when it is first used.',
        prompt: '>>>',
        answers: ['lazy import big_cookbook'],
        why: '<code>lazy import big_cookbook</code>. One word in front of a normal import, at the top of the file.',
        hint: 'One new word, then a normal import.'
      }
    ]
  });
})();
