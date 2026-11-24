/* Lesson 84: Decorators (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l84  Decorators
     ===================================================================== */

  // The wrapper ring: a blue rounded frame with a lamp at the top and the bottom.
  const ringBox = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${P.tint}" stroke="${P.accent}" stroke-width="6"/>`;
  const lamp = (cx, cy, s, w) => `<rect x="${cx - (w || 92) / 2}" y="${cy - 14}" width="${w || 92}" height="28" rx="14" fill="${P.white}" stroke="${P.accent}" stroke-width="2.5"/>` + T(cx, cy + 5, s, { s: 12, m: true, w: 700, f: P.accent });
  const card = (x, y, w, name, sub) => box(x, y, w, 70, P.white, 10) + T(x + w / 2, y + 28, name, { s: 15, m: true }) +
    `<line x1="${x + 14}" y1="${y + 38}" x2="${x + w - 14}" y2="${y + 38}" stroke="${P.ink}" stroke-width="2"/>` + T(x + w / 2, y + 58, sub, { s: 11.5, w: 700, f: P.ink2 });

  /* ---- The idea: a card, and the same card inside a timer ---- */
  const ideaSvg = svg(600, 250, 'Left: the recipe card bake on its own. Calling it just bakes. An arrow labelled with_timer(bake) leads to the right: the same card, now inside a blue ring called wrapper. The ring has a lamp at the top that says timer: start and a lamp at the bottom that says timer: ding!. Calling the wrapper runs the top lamp, then the card, then the bottom lamp. The card itself is not changed.',
    T(100, 22, 'the recipe on its own', { s: 12, f: P.ink2 }) +
    card(30, 80, 140, 'bake', 'bakes the dish') +
    arrow(190, 115, 318, 115, P.ok, 3) +
    T(254, 100, 'with_timer(bake)', { s: 12, m: true, f: P.ok }) +
    T(254, 140, 'hands back', { s: 11.5, w: 700, f: P.ink2 }) +
    T(254, 156, 'a new function', { s: 11.5, w: 700, f: P.ink2 }) +
    T(460, 22, 'the wrapper around it', { s: 12, f: P.accent }) +
    ringBox(340, 40, 240, 170) +
    lamp(460, 40, 'timer: start', 120) + lamp(460, 210, 'timer: ding!', 120) +
    card(390, 80, 140, 'bake', 'the same card') +
    T(300, 244, 'the card is not changed: the wrapper adds steps before and after it', { s: 12, w: 700, f: P.ink2 }));
  const wrapCode = [
    'def bake():',
    '    print("  baking the pasta bake")',
    '',
    'def with_timer(func):',
    '    def wrapper():',
    '        print("timer: start")',
    '        func()',
    '        print("timer: ding!")',
    '    return wrapper',
    '',
    'bake()',
    'print("---")',
    'timed_bake = with_timer(bake)',
    'timed_bake()'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(wrapCode, { title: 'wrap.py' })}</div>`;

  /* ---- The code: timed, and the @ shortcut ---- */
  const timedCode = [
    'import time',
    '',
    'def timed(func):',
    '    def wrapper(*args, **kwargs):',
    '        start = time.perf_counter()',
    '        result = func(*args, **kwargs)',
    '        took = time.perf_counter() - start',
    '        print(f"{func.__name__} took {took:.1f} s")',
    '        return result',
    '    return wrapper',
    '',
    'def bake(dish, minutes):',
    '    time.sleep(0.2)   # pretend: the oven works for 0.2 s',
    '    return f"{dish}, baked {minutes} min"',
    '',
    'bake = timed(bake)',
    'plate = bake("pasta bake", minutes=35)',
    'print(plate)'
  ];
  const flowSvg = svg(600, 196, 'What happens when you call bake("pasta bake", minutes=35) after bake = timed(bake). 1, the wrapper starts the clock. 2, it calls the real bake with the same values, and keeps the answer in result. 3, it stops the clock and prints bake took 0.2 s. 4, it returns result, so the plate gets "pasta bake, baked 35 min".',
    [
      ['1', 'start the clock', 'perf_counter()'],
      ['2', 'cook the real recipe', 'func(*args, **kwargs)'],
      ['3', 'stop, say how long', 'print(...)'],
      ['4', 'hand the dish back', 'return result']
    ].map(([n, h, c], i) => {
      const x = 8 + i * 148;
      return box(x, 14, 136, 120, i === 1 ? P.white : P.tint, 12) +
        `<circle cx="${x + 22}" cy="36" r="13" fill="${P.accent}"/>` + T(x + 22, 41, n, { s: 13, f: P.white }) +
        T(x + 78, 41, i === 1 ? 'the card' : 'wrapper', { s: 11.5, m: true, f: i === 1 ? P.ink : P.accent }) +
        T(x + 68, 74, h.split(', ')[0], { s: 12.5 }) + (h.includes(', ') ? T(x + 68, 92, h.split(', ')[1], { s: 12.5 }) : '') +
        T(x + 68, 120, c, { s: 10.5, m: true, w: 600, f: P.ink2 }) +
        (i < 3 ? arrow(x + 138, 74, x + 150, 74, P.ink2, 2) : '');
    }).join('') +
    box(8, 150, 580, 36, P.okT, 10) + T(298, 174, 'plate = "pasta bake, baked 35 min"     printed: bake took 0.2 s', { s: 12, m: true, w: 600, f: P.ok }));
  const codePic = `<div style="width:100%;min-width:0">${run(timedCode, { title: 'timed.py' })}${flowSvg}</div>`;

  /* ---- The pain: the same two lines in every recipe ---- */
  const painCode = [
    'def soak_oats(grams):',
    '    print("Starting soak_oats")',
    '    jars = grams // 80',
    '    print("Finished soak_oats")',
    '    return jars',
    '',
    'def cook_rice(grams):',
    '    print("Starting cook_rice")',
    '    return grams * 3',
    '    print("Finished cook_rice")',
    '',
    'def boil_eggs(count):',
    '    print("Starting boil_eggs")',
    '    note = f"{count} eggs, 9 min"',
    '    print("Finished soak_oats")',
    '    return note',
    '',
    'print(soak_oats(400), "jars of oats")',
    'print(cook_rice(250), "g of cooked rice")',
    'print(boil_eggs(6))'
  ];

  /* ---- The fix: one decorator, one @ line per recipe ---- */
  const fixCode = [
    'def logged(func):',
    '    def wrapper(*args, **kwargs):',
    '        print(f"Starting {func.__name__}")',
    '        result = func(*args, **kwargs)',
    '        print(f"Finished {func.__name__}")',
    '        return result',
    '    return wrapper',
    '',
    '@logged',
    'def soak_oats(grams):',
    '    return grams // 80',
    '',
    '@logged',
    'def cook_rice(grams):',
    '    return grams * 3',
    '',
    '@logged',
    'def boil_eggs(count):',
    '    return f"{count} eggs, 9 min"',
    '',
    'print(soak_oats(400), "jars of oats")',
    'print(cook_rice(250), "g of cooked rice")',
    'print(boil_eggs(6))'
  ];
  const atSvg = svg(600, 150, 'Two ways to write the same thing. Left: def bake, then on a line below it, bake = timed(bake). Right: @timed on the line right above def bake. Python runs the def, then hands the new function to timed and keeps the answer under the same name. Both give the same result.',
    box(10, 12, 270, 100, P.white, 12) +
    T(26, 40, 'def bake(dish, minutes):', { s: 12, m: true, w: 600, a: 'start' }) +
    T(26, 60, '    ...', { s: 12, m: true, w: 600, a: 'start', f: P.mute }) +
    T(26, 92, 'bake = timed(bake)', { s: 13, m: true, a: 'start', f: P.danger }) +
    T(300, 70, '=', { s: 28, f: P.ink2 }) +
    box(320, 12, 270, 100, P.white, 12) +
    T(336, 40, '@timed', { s: 13, m: true, a: 'start', f: P.danger }) +
    T(336, 64, 'def bake(dish, minutes):', { s: 12, m: true, w: 600, a: 'start' }) +
    T(336, 84, '    ...', { s: 12, m: true, w: 600, a: 'start', f: P.mute }) +
    T(300, 140, 'the @ line is a shortcut for the line below the def, nothing more', { s: 12, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${atSvg}${run(fixCode, { title: 'logged.py' })}</div>`;

  /* ---- Try it: any parameters pass through ---- */
  const tryCode = [
    'def logged(func):',
    '    def wrapper(*args, **kwargs):',
    '        print(f"Starting {func.__name__} with {args} {kwargs}")',
    '        result = func(*args, **kwargs)',
    '        print(f"Finished {func.__name__}")',
    '        return result',
    '    return wrapper',
    '',
    '@logged',
    'def pack_boxes(days, kcal=650):',
    '    return f"{days} boxes of {kcal} kcal"',
    '',
    'def split_carbs(grams, meals):',
    '    return grams // meals',
    '',
    'print(pack_boxes(5))',
    'print(pack_boxes(5, kcal=700))',
    'print(split_carbs(600, 3), "g of carbs per meal")'
  ];

  /* ---- The catch ---- */
  const noReturn = [
    'def logged(func):',
    '    def wrapper(*args, **kwargs):',
    '        print(f"Starting {func.__name__}")',
    '        func(*args, **kwargs)          # the answer is thrown away',
    '        print(f"Finished {func.__name__}")',
    '    return wrapper',
    '',
    '@logged',
    'def cook_rice(grams):',
    '    """Cooked rice weighs about 3 times the dry rice."""',
    '    return grams * 3',
    '',
    'print(cook_rice(250), "g of cooked rice")',
    'print(cook_rice.__name__)',
    'print(cook_rice.__doc__)'
  ];
  const noWrapperTerm = term([
    '$ python3 coach.py',
    'Traceback (most recent call last):',
    '  File "/Users/ana/kitchen/coach.py", line 12, in <module>',
    '    print(cook_rice(250), "g of cooked rice")',
    '          ~~~~~~~~~^^^^^',
    "TypeError: 'NoneType' object is not callable"
  ], 'return wrapper left out, Python 3.15');
  const wrapsCode = [
    'import functools',
    '',
    'def logged(func):',
    '    @functools.wraps(func)',
    '    def wrapper(*args, **kwargs):',
    '        print(f"Starting {func.__name__}")',
    '        result = func(*args, **kwargs)',
    '        print(f"Finished {func.__name__}")',
    '        return result',
    '    return wrapper',
    '',
    '@logged',
    'def cook_rice(grams):',
    '    """Cooked rice weighs about 3 times the dry rice."""',
    '    return grams * 3',
    '',
    'print(cook_rice(250), "g of cooked rice")',
    'print(cook_rice.__name__)',
    'print(cook_rice.__doc__)'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(noReturn, { title: 'no_return.py' })}${noWrapperTerm}${run(wrapsCode, { title: 'wraps.py' })}</div>`;

  COURSE.add({
    id: 'l84', minutes: 14,
    summary: 'A function is a value (lesson 80), so a function can <b>take</b> a function and <b>hand back</b> a new one. That is a <b>decorator</b>. Inside it you write a second <code>def</code>, the <b>wrapper</b>, which does something before, calls the real function, does something after, and <b>returns the result</b>. Then the decorator returns the wrapper. <code>def timed(func):</code> with <code>def wrapper(*args, **kwargs):</code> inside starts a clock, runs <code>result = func(*args, **kwargs)</code>, prints <code>bake took 0.2 s</code>, and does <code>return result</code>. <code>bake = timed(bake)</code> swaps the card for the wrapped one. <code>@timed</code> on the line above <code>def bake</code> means <b>exactly that line</b>. You already used two: <code>@dataclass</code> (lesson 73) and <code>@property</code> (lesson 74). Write the extra steps once and put one <code>@logged</code> line on every recipe, instead of copying the same prints into each. The catch: forget <code>return result</code> and every call gives <code>None</code>. Forget <code>return wrapper</code> and the call stops with <code>TypeError: \'NoneType\' object is not callable</code>. And the wrapper hides the name: <code>cook_rice.__name__</code> becomes <code>\'wrapper\'</code>. Put <code>@functools.wraps(func)</code> on the wrapper to keep the name and the docstring.',
    video: {
      src: 'videos/l84-decorators.mp4', poster: 'videos/l84-decorators.jpg', length: '1 min 4 s',
      script: [
        'Ana is meal prepping for her half-marathon. She wants Kitchen Coach to say when each recipe starts, and when it ends.',
        'So you copy the same lines into every recipe. 5 recipes, 10 copies. One copy is wrong, and nobody notices.',
        'Instead, clip a kitchen timer onto the card. timed takes a function, and hands back a new one, the wrapper.',
        'Now call bake. First the timer starts. Then the real recipe cooks. Then the timer stops, and says: bake took 0.2 seconds. And the dish comes back out.',
        'That line, bake equals timed of bake, has a shortcut. At timed, right above the def. It means exactly the same.',
        'Careful. If the wrapper forgets to return the result, the dish stays inside. The plate comes out empty. None.',
        'A decorator wraps a function in extra steps. At timed means bake equals timed of bake.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Wrap the recipe. Do not rewrite it.',
        text: [
          'Ana is meal prepping for her half-marathon, five recipes in one Sunday. She wants Kitchen Coach to say when each step <b>starts</b> and when it <b>ends</b>, so she can follow along. You could add those lines to every recipe card. Or you could clip one kitchen timer <b>around</b> each card, and leave the cards as they are.',
          'Two things you know make that possible. Lesson 80 showed that a function is a <b>value</b>: <code>bake</code> with no brackets is the card itself, and you can hand it to another function. The new thing: a <code>def</code> can sit <b>inside</b> another <code>def</code>. The inner function is made each time the outer one runs, and the outer one can <code>return</code> it, like any other value.',
          'Read <code>with_timer</code>. It takes a card, <code>func</code>. Inside, it writes a new card, <code>wrapper</code>, that prints, calls <code>func()</code>, and prints again. Then it hands back that <code>wrapper</code>, without calling it. Press <b>Run</b>: plain <code>bake()</code> only bakes. <code>timed_bake()</code> rings the timer before and after, and the baking happens in the middle.'
        ],
        tip: 'Inside <code>wrapper</code>, the name <code>func</code> still works after <code>with_timer</code> has finished. The inner card remembers the jars of the card it was written in (lesson 47 showed the inside of a function. This is the same rule, one level deeper).'
      },
      {
        label: 'The code', pic: codePic,
        h: 'timed: a function that takes a function.',
        text: [
          'A <b>decorator</b> is a function that takes a function and hands back a new, <b>wrapped</b> function. Here is a real one, <code>timed</code>, built in four steps. The <code>wrapper</code> takes <code>*args, **kwargs</code> (lesson 79), so it accepts <b>any</b> values and passes them on, untouched, to the real card: <code>func(*args, **kwargs)</code>. It does not need to know that bake wants a dish and minutes.',
          '<code>time.perf_counter()</code> is the stopwatch from lesson 42. <code>func.__name__</code> is the name the card was written with, <code>\'bake\'</code>. Every function has one, like the <code>__name__</code> of a module in lesson 60. <code>{took:.1f}</code> rounds to 1 decimal. The answer of the real card goes in <code>result</code>, and the last line of the wrapper hands it back.',
          'Then <code>bake = timed(bake)</code>: the label <code>bake</code> now points at the wrapper, and the wrapper holds the old card inside. Press <b>Run</b>: <code>bake took 0.2 s</code>, then the plate, <code>pasta bake, baked 35 min</code>. Now change it: make the oven work for <code>0.5</code> s, and say what it will print before you run it.'
        ],
        tip: '<code>time.sleep(0.2)</code> pauses for 0.2 seconds, to pretend the oven is busy. Real timings wobble a little, so the f-string rounds them to 1 decimal.'
      },
      {
        label: 'The pain', pic: run(painCode, { title: 'meal_prep.py' }),
        h: 'The same two lines, copied into every recipe.',
        text: [
          'Without a decorator, every recipe needs a <code>print("Starting ...")</code> at the top and a <code>print("Finished ...")</code> before each <code>return</code>. Ana\'s prep has five recipes, so that is <b>ten copied lines</b>, each with the name typed by hand. Three are shown here.',
          'Press <b>Run</b> and look closely. <code>cook_rice</code> never says it finished: its <code>return</code> comes first, and a function stops at <code>return</code> (lesson 45). <code>boil_eggs</code> says <code>Finished soak_oats</code>, because that line was copied and never renamed. No error, no warning. Ana just gets a wrong log.',
          'And when Ana asks for the time of each step too, you edit all five recipes again.'
        ],
        warn: 'Copied lines drift apart. Each copy is one more place for a wrong name or a missing line.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: '@logged: write the extra steps once.',
        text: [
          'Write the two prints <b>once</b>, in a decorator called <code>logged</code>. It uses <code>func.__name__</code>, so the name is always right. The recipes go back to being just recipes.',
          'Then put <code>@logged</code> on the line right above each <code>def</code>. The <code>@</code> line is a <b>shortcut</b>: <code>@logged</code> above <code>def cook_rice</code> means exactly <code>cook_rice = logged(cook_rice)</code> right after the def. You write the name once, and you see the wrapping at the top of the card.',
          'Press <b>Run</b>. Every step now starts and finishes with its own name, <code>cook_rice</code> included, and the answers still come back: 5 jars, 750 g, 6 eggs. When Ana wants timings too, you change <code>logged</code> in one place.'
        ],
        tip: 'Lesson 73 promised this. <code>@dataclass</code> is a decorator too: Python hands it the finished class, and it hands the class back with <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> added. <code>@property</code> (lesson 74) wraps a method so you read it like an attribute. Same <code>@</code>, same idea: take a thing, hand back a better one.'
      },
      {
        label: 'Try it', pic: run(tryCode, { title: 'try_it.py' }),
        h: 'Any recipe, any ingredients.',
        text: [
          'Because the wrapper takes <code>*args, **kwargs</code>, one decorator fits every recipe card, whatever its parameters. Here it also prints them: <code>args</code> is a tuple of the plain values, <code>kwargs</code> a dict of the named ones (lesson 79).',
          'Press <b>Run</b>. <code>pack_boxes(5)</code> shows <code>(5,) {}</code>, and <code>pack_boxes(5, kcal=700)</code> shows <code>(5,) {\'kcal\': 700}</code>. The default <code>kcal=650</code> is filled in later, inside the real card.',
          'Now change it: put <code>@logged</code> above <code>def split_carbs</code> and run it again. Say first what the two new lines will be. Then try the long way: delete that <code>@logged</code> and write <code>split_carbs = logged(split_carbs)</code> under the def instead. Same output.'
        ],
        tip: 'Decorators can take settings too, like <code>@repeat(3)</code>, which is a function that <b>makes</b> a decorator. You will meet those in libraries. For now, the plain kind is all you need.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Return the result, return the wrapper, keep the name.',
        text: [
          '<b>Forget <code>return result</code>, and the dish stays inside.</b> In <code>no_return.py</code> the wrapper calls the card but throws its answer away. A function with no <code>return</code> hands back <code>None</code> (lesson 45), so every decorated recipe now returns <code>None</code>. Press <b>Run</b>: <code>None g of cooked rice</code>. No error. Fix it: <code>result = func(*args, **kwargs)</code>, and <code>return result</code> at the end.',
          '<b>Forget <code>return wrapper</code>, and the card is gone.</b> Then <code>logged</code> hands back <code>None</code>, and <code>@logged</code> puts <code>None</code> under the name <code>cook_rice</code>. The def still looks fine. The crash comes at the <b>call</b>: <code>TypeError: \'NoneType\' object is not callable</code>. Read it as "you tried to call None".',
          '<b>The wrapper hides the name.</b> The same <code>no_return.py</code> prints <code>wrapper</code> for <code>cook_rice.__name__</code>, and <code>None</code> for the docstring (lesson 48). Error messages and help would say <code>wrapper</code> too. The fix is a decorator from Python\'s <code>functools</code> module: put <code>@functools.wraps(func)</code> on the line above <code>def wrapper</code>. It copies the name and the docstring of the real card onto the wrapper. Press <b>Run</b> on <code>wraps.py</code>: <code>cook_rice</code>, and the docstring is back.'
        ],
        warn: 'Every decorator you write should have these three lines: <code>@functools.wraps(func)</code> above the wrapper, <code>return result</code> at the end of the wrapper, and <code>return wrapper</code> at the end of the decorator.'
      }
    ],
    exercises: [
      {
        file: 'l84_kitchen_timer.py', title: 'Kitchen timer',
        task: 'Write the decorator <code>logged</code> for Ana\'s meal prep. Its wrapper prints <code>Starting &lt;name&gt;</code>, calls the real recipe with all its values, prints <code>Finished &lt;name&gt;</code>, and <b>returns the result</b>. Use <code>@functools.wraps(func)</code> so the recipe keeps its own name.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The starter <code>logged</code> hands the recipe back unwrapped, so nothing is printed and the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, write the wrapper inside <code>logged</code> and return it. The three recipes below it already have <code>@logged</code>.',
          'Run it until it says <code>PASS</code>. The check catches what your decorator prints, so it can compare it. It also tries the decorator on a recipe of its own.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: '<code>chop</code> has <code>@logged</code> above it (the <code>logged</code> from The fix), and its body is <code>print("chopping onions")</code>. Put the lines that <code>chop()</code> prints in order.',
        items: ['Starting chop', 'chopping onions', 'Finished chop'],
        why: 'The wrapper prints first, then calls the real card, which prints its own line, then the wrapper prints again.',
        hint: 'The real card runs in the middle of the wrapper.'
      },
      {
        type: 'pick', q: '<code>@timed</code> on the line above <code>def bake(...)</code> means:',
        options: [
          'bake = timed(bake), right after the def',
          'timed(bake) is called every time Python reads the file',
          'bake is called once, right away, with a timer',
          'Python adds a hidden timed parameter to bake'
        ],
        answer: 0,
        why: 'The @ line is a shortcut. Python runs the def, hands the new function to <code>timed</code>, and keeps what <code>timed</code> returns under the name <code>bake</code>. Nothing is called yet.',
        hint: 'It is a shortcut for one assignment.'
      },
      {
        type: 'fix', q: 'This prints <code>None g of cooked rice</code>. Fix the decorator so it prints <code>Starting cook_rice</code>, <code>Finished cook_rice</code>, then <code>750 g of cooked rice</code>.',
        code: ['def logged(func):', '    def wrapper(*args, **kwargs):', '        print(f"Starting {func.__name__}")', '        func(*args, **kwargs)', '        print(f"Finished {func.__name__}")', '    return wrapper', '', '@logged', 'def cook_rice(grams):', '    return grams * 3', '', 'print(cook_rice(250), "g of cooked rice")'],
        title: 'rice.py',
        check: [
          'want = "Starting cook_rice\\nFinished cook_rice\\n750 g of cooked rice"',
          'got = out.strip()',
          'if got == want:',
          '    ok = True',
          'elif "None g" in got:',
          '    msg = "Still None. Keep the answer: result = func(*args, **kwargs), and return result at the end of the wrapper."',
          'elif got.startswith("750"):',
          '    msg = "The answer is right, but the Starting and Finished lines are gone. Keep both prints."',
          'else:',
          '    msg = "It printed:\\n" + got + "\\nYou want:\\n" + want'
        ].join('\n'),
        why: 'The wrapper must keep the answer of the real card and hand it back: <code>result = func(*args, **kwargs)</code>, then <code>return result</code> after the second print.',
        hint: 'Where does the 750 go after func(...) works it out?'
      },
      {
        type: 'fix', q: 'This stops with <code>TypeError: \'NoneType\' object is not callable</code>. Add one line so it prints <code>Starting boil_eggs</code>, <code>Finished boil_eggs</code>, <code>6 eggs, 9 min</code>.',
        code: ['def logged(func):', '    def wrapper(*args, **kwargs):', '        print(f"Starting {func.__name__}")', '        result = func(*args, **kwargs)', '        print(f"Finished {func.__name__}")', '        return result', '', '@logged', 'def boil_eggs(count):', '    return f"{count} eggs, 9 min"', '', 'print(boil_eggs(6))'],
        title: 'eggs.py',
        check: [
          'want = "Starting boil_eggs\\nFinished boil_eggs\\n6 eggs, 9 min"',
          'got = out.strip()',
          'if got == want:',
          '    ok = True',
          'elif "not callable" in got:',
          '    msg = "Still calling None. logged must hand back the wrapper: return wrapper, lined up with def wrapper."',
          'elif got == "6 eggs, 9 min":',
          '    msg = "That returns the plain card. Hand back the wrapper instead, so the prints happen."',
          'else:',
          '    msg = "It printed:\\n" + got + "\\nYou want:\\n" + want'
        ].join('\n'),
        why: '<code>logged</code> has no <code>return</code>, so it hands back <code>None</code>, and <code>@logged</code> puts <code>None</code> under the name <code>boil_eggs</code>. Add <code>return wrapper</code> at the end of <code>logged</code>, indented by 4 spaces, not 8.',
        hint: 'What does logged hand back? Look at its last line.'
      },
      {
        type: 'pick', q: 'With the <code>logged</code> from The fix (no <code>functools.wraps</code>), what does <code>print(soak_oats.__name__)</code> show?',
        options: ['wrapper', 'soak_oats', 'logged', 'None'],
        answer: 0,
        why: 'After <code>@logged</code>, the name <code>soak_oats</code> points at the wrapper, and the wrapper was written as <code>def wrapper</code>. <code>@functools.wraps(func)</code> copies the real name onto it.',
        hint: 'Which function does the label soak_oats point at now?'
      },
      {
        type: 'fill', q: 'Finish the decorator so the recipe keeps its name and its answer.',
        text: 'import functools\n\ndef logged(func):\n    @functools.___(func)\n    def wrapper(*args, **kwargs):\n        print(f"Starting {func.__name__}")\n        result = func(*args, **kwargs)\n        return ___\n    return ___',
        options: ['wraps', 'result', 'wrapper', 'func', 'None', 'name'],
        answer: ['wraps', 'result', 'wrapper'],
        why: '<code>@functools.wraps(func)</code> keeps the name, <code>return result</code> hands back the dish, and <code>return wrapper</code> hands back the new function.',
        hint: 'The wrapper returns the answer. The decorator returns the wrapper.'
      },
      {
        type: 'pick', q: 'Back to lesson 79. The wrapper is <code>def wrapper(*args, **kwargs):</code>. You call <code>bake("pasta bake", minutes=35)</code>. What are <code>args</code> and <code>kwargs</code> inside the wrapper?',
        options: [
          'args is (\'pasta bake\',) and kwargs is {\'minutes\': 35}',
          'args is (\'pasta bake\', 35) and kwargs is {}',
          'args is [\'pasta bake\'] and kwargs is [\'minutes\']',
          'args is \'pasta bake\' and kwargs is 35'
        ],
        answer: 0,
        why: 'One star collects the plain values into a <b>tuple</b>, two stars collect the named values into a <b>dict</b>. <code>func(*args, **kwargs)</code> spreads them back out, so the real card gets exactly what you passed.',
        hint: 'Which value was given by name?'
      },
      {
        type: 'bucket', q: 'Is this a good job for a decorator?',
        buckets: ['A decorator fits', 'Not a decorator'],
        items: [
          ['say Starting and Finished around every recipe', 0],
          ['time how long each recipe takes', 0],
          ['add the same check before many functions', 0],
          ['sort the dishes by protein once', 1],
          ['change what one recipe cooks', 1],
          ['a step that only one function needs', 1]
        ],
        why: 'A decorator adds the <b>same extra steps</b> around <b>many</b> functions, without changing what they do. A one-time job, or a change to the recipe itself, belongs in the function.',
        hint: 'Is it the same extra step around many different recipes?'
      }
    ]
  });
})();
