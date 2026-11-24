/* Lesson 85: Context managers (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l85  Context managers
     ===================================================================== */

  // A small oven seen from the front. on: power light red and window glowing.
  const oven = (x, y, on) =>
    `<rect x="${x + 4}" y="${y + 5}" width="150" height="130" rx="12" fill="${P.ink}"/>` +
    `<rect x="${x}" y="${y}" width="150" height="130" rx="12" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<line x1="${x}" y1="${y + 30}" x2="${x + 150}" y2="${y + 30}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x + 22}" cy="${y + 15}" r="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    `<circle cx="${x + 44}" cy="${y + 15}" r="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    `<circle cx="${x + 128}" cy="${y + 15}" r="8" fill="${on ? P.danger : P.sand}" stroke="${P.ink}" stroke-width="2"/>` +
    `<rect x="${x + 18}" y="${y + 44}" width="114" height="72" rx="8" fill="${on ? '#F6C27A' : P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 48}" y="${y + 84}" width="54" height="22" rx="4" fill="#6B3A2A" stroke="${P.ink}" stroke-width="2"/>`;
  const check = (x, y, col) => `<path d="M${x - 9} ${y} l6 7 l13 -15" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* ---- The idea ---- */
  const ideaSvg = svg(600, 290, 'Two kitchens. Left, by hand: oven on, bake, oven off. The cake burns halfway, an error, and the oven-off line never runs, so the oven light stays red, tagged still on. Right, with oven_on(180): the same error, but on the way out Python switches the oven off, tagged off, every time.',
    T(150, 26, 'by hand', { s: 14, m: true, f: P.danger }) + T(450, 26, 'with oven_on(180):', { s: 14, m: true, f: P.ok }) +
    `<line x1="300" y1="14" x2="300" y2="282" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    oven(64, 56, true) +
    `<circle cx="192" cy="71" r="20" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="6 5"/>` +
    T(150, 222, 'the cake burns: ValueError', { s: 12.5, w: 700, f: P.ink2 }) +
    box(84, 238, 132, 34, P.dangerT, 17) + T(150, 260, 'still on!', { s: 14, f: P.danger }) +
    oven(364, 56, false) +
    T(450, 222, 'the cake burns: ValueError', { s: 12.5, w: 700, f: P.ink2 }) +
    box(364, 238, 172, 34, P.okT, 17) + T(460, 260, 'off, every time', { s: 14, f: P.ok }) + check(386, 255, P.ok));
  const leftOn = [
    'oven = {"on": False}',
    '',
    'def bake(cake):',
    '    print("Baking", cake)',
    '    if cake == "chocolate cake":',
    '        raise ValueError("the cake burnt")',
    '',
    'try:',
    '    oven["on"] = True',
    '    print("Oven on: 180")',
    '    bake("chocolate cake")',
    '    oven["on"] = False',
    '    print("Oven off")',
    'except ValueError as err:',
    '    print("Problem:", err)',
    '',
    'print("Is the oven still on?", oven["on"])'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(leftOn, { title: 'left_on.py' })}</div>`;

  /* ---- The code: with calls __enter__, the block, then __exit__ ---- */
  const stepsSvg = svg(600, 236, 'What with does, in three steps. Step 1: Python calls __enter__, the oven goes on, and what __enter__ returns is the name after as. Step 2: your indented block runs. Step 3: Python calls __exit__, the oven goes off. Step 3 runs always, error or not.',
    box(16, 14, 568, 44, P.tint, 10) + T(36, 42, 'with Oven(180) as oven:', { s: 15, m: true, a: 'start' }) +
    [['1', '__enter__()', 'oven on, return self → as oven', P.accent, P.tint],
     ['2', 'your block', 'the indented lines run', P.ink2, P.white],
     ['3', '__exit__(...)', 'oven off, ALWAYS, error or not', P.ok, P.okT]].map((r, i) => {
      const y = 74 + i * 54;
      return `<circle cx="34" cy="${y + 20}" r="15" fill="${r[3]}"/>` + T(34, y + 25, r[0], { s: 14, f: P.white }) +
        box(60, y, 186, 40, r[4], 10) + T(153, y + 26, r[1], { s: 14, m: true, f: r[3] }) +
        arrow(254, y + 20, 290, y + 20, P.ink2, 2.5) + T(300, y + 25, r[2], { s: 13.5, w: 700, f: r[3], a: 'start' });
    }).join(''));
  const ovenClass = [
    'class Oven:',
    '    def __init__(self, temp):',
    '        self.temp = temp',
    '',
    '    def __enter__(self):',
    '        print("Oven on:", self.temp)',
    '        return self',
    '',
    '    def __exit__(self, exc_type, exc, tb):',
    '        print("Oven off. Problem:", exc_type)',
    '',
    'with Oven(180) as oven:',
    '    print("Baking banana bread at", oven.temp)',
    '',
    'print("Next, Chloe\'s cake")',
    'with Oven(180):',
    '    print("Baking chocolate cake")',
    '    raise ValueError("the cake burnt")',
    'print("This line never runs")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${stepsSvg}${run(ovenClass, { title: 'oven_class.py' })}</div>`;

  /* ---- The pain: try and finally by hand, around every bake ---- */
  const byHand = [
    'oven = {"on": False}',
    '',
    'def bake(cake):',
    '    oven["on"] = True',
    '    print("Oven on: 180")',
    '    try:',
    '        print("Baking", cake)',
    '        if cake == "chocolate cake":',
    '            raise ValueError("the cake burnt")',
    '    finally:',
    '        oven["on"] = False',
    '        print("Oven off")',
    '',
    'try:',
    '    bake("chocolate cake")',
    'except ValueError as err:',
    '    print("Problem:", err)',
    'print("Is the oven still on?", oven["on"])'
  ];
  const painSvg = svg(600, 150, 'Kitchen Coach bakes in many places: the roast, the pasta bake, the cake. Each one needs the same wrapping by hand: oven on, try, the bake, finally, oven off. Three copies are fine. The fourth one forgot finally, and its oven stays on.',
    ['roast', 'pasta bake', 'banana bread', 'cake'].map((n, i) => {
      const x = 14 + i * 146, bad = i === 3;
      return box(x, 14, 130, 112, bad ? P.dangerT : P.white, 12) + T(x + 65, 38, n, { s: 13, f: bad ? P.danger : P.ink }) +
        T(x + 14, 62, 'on', { s: 12, m: true, a: 'start', f: P.ink2 }) + T(x + 14, 80, 'try:', { s: 12, m: true, a: 'start', f: bad ? P.mute : P.ink2 }) +
        T(x + 14, 98, 'finally:', { s: 12, m: true, a: 'start', f: bad ? P.mute : P.ink2 }) + T(x + 14, 116, bad ? 'forgot!' : 'off', { s: 12, m: true, a: 'start', f: bad ? P.danger : P.ok }) +
        (bad ? `<line x1="${x + 12}" y1="76" x2="${x + 80}" y2="76" stroke="${P.danger}" stroke-width="2.5"/><line x1="${x + 12}" y1="94" x2="${x + 80}" y2="94" stroke="${P.danger}" stroke-width="2.5"/>` : '');
    }).join(''));
  const painPic = `<div style="width:100%;min-width:0">${run(byHand, { title: 'by_hand.py' })}${painSvg}</div>`;

  /* ---- The fix: @contextmanager ---- */
  const oneCard = [
    'from contextlib import contextmanager',
    '',
    'oven = {"on": False}',
    '',
    '@contextmanager',
    'def oven_on(temp):',
    '    oven["on"] = True',
    '    print("Oven on:", temp)',
    '    try:',
    '        yield temp',
    '    finally:',
    '        oven["on"] = False',
    '        print("Oven off")',
    '',
    'with oven_on(180) as temp:',
    '    print("Baking banana bread at", temp)',
    '',
    'try:',
    '    with oven_on(180):',
    '        print("Baking chocolate cake")',
    '        raise ValueError("the cake burnt")',
    'except ValueError as err:',
    '    print("Problem:", err)',
    'print("Is the oven still on?", oven["on"])'
  ];
  const mapSvg = svg(600, 200, 'How the generator lines up with the class. The lines before yield do the work of __enter__: oven on. yield hands temp to the name after as, and the generator pauses there while your with block runs. The finally block does the work of __exit__: oven off, even after an error.',
    box(14, 14, 300, 172, P.white, 12) +
    T(30, 42, 'oven["on"] = True', { s: 13, m: true, a: 'start' }) +
    T(30, 80, 'try:', { s: 13, m: true, a: 'start' }) + T(52, 104, 'yield temp', { s: 13, m: true, a: 'start', f: P.accent }) +
    T(30, 134, 'finally:', { s: 13, m: true, a: 'start' }) + T(52, 158, 'oven["on"] = False', { s: 13, m: true, a: 'start' }) +
    arrow(322, 38, 362, 38, P.ink2, 2.5) + T(372, 43, 'like __enter__', { s: 13.5, w: 700, f: P.ink2, a: 'start' }) +
    arrow(322, 100, 362, 100, P.accent, 2.5) + T(372, 96, 'pause here: your', { s: 13.5, w: 700, f: P.accent, a: 'start' }) + T(372, 114, 'with block runs', { s: 13.5, w: 700, f: P.accent, a: 'start' }) +
    arrow(322, 150, 362, 150, P.ok, 2.5) + T(372, 146, 'like __exit__:', { s: 13.5, w: 700, f: P.ok, a: 'start' }) + T(372, 164, 'runs even after an error', { s: 13.5, w: 700, f: P.ok, a: 'start' }));
  const fixPic = `<div style="width:100%;min-width:0">${run(oneCard, { title: 'oven_on.py' })}${mapSvg}</div>`;

  /* ---- Try it: two managers in one with, and suppress ---- */
  const tryBox = [
    'from contextlib import contextmanager, suppress',
    'from pathlib import Path',
    '',
    '@contextmanager',
    'def oven_on(temp):',
    '    print("Oven on:", temp)',
    '    try:',
    '        yield temp',
    '    finally:',
    '        print("Oven off")',
    '',
    '@contextmanager',
    'def apron():',
    '    print("Apron on")',
    '    try:',
    '        yield',
    '    finally:',
    '        print("Apron off")',
    '',
    'with (',
    '    apron(),',
    '    oven_on(180) as temp,',
    '):',
    '    print("Baking banana bread at", temp)',
    '',
    'with suppress(FileNotFoundError):',
    '    print(Path("old_notes.txt").read_text())',
    'print("No old notes? No problem.")'
  ];

  /* ---- The catch ---- */
  const noFinally = [
    'from contextlib import contextmanager',
    '',
    '@contextmanager',
    'def oven_on(temp):',
    '    print("Oven on:", temp)',
    '    yield temp',
    '    print("Oven off")    # skipped when the block fails',
    '',
    'try:',
    '    with oven_on(180):',
    '        print("Baking chocolate cake")',
    '        raise ValueError("the cake burnt")',
    'except ValueError as err:',
    '    print("Problem:", err)'
  ];
  const swallow = [
    'class Oven:',
    '    def __enter__(self):',
    '        print("Oven on")',
    '',
    '    def __exit__(self, exc_type, exc, tb):',
    '        print("Oven off")',
    '        return True    # do not do this: it hides the error',
    '',
    'with Oven():',
    '    print("Baking chocolate cake")',
    '    raise ValueError("the cake burnt")',
    'print("Dinner is served!")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(noFinally, { title: 'no_finally.py' })}<div style="height:14px"></div>${run(swallow, { title: 'swallow.py' })}</div>`;

  COURSE.add({
    id: 'l85', minutes: 14,
    summary: 'Some things must be <b>cleaned up every time</b>: the oven switched off after baking, even if Chloe\'s cake burns. A <b>context manager</b> is anything <code>with</code> can use. <code>with Oven(180) as oven:</code> makes Python call <code>__enter__</code> first (its return value becomes the name after <code>as</code>), then run your block, then call <code>__exit__(self, exc_type, exc, tb)</code> at the end, <b>always, even when the block raises an error</b>. That is <code>try</code> and <code>finally</code> written once, instead of around every bake. The easy way to make one: put <code>@contextmanager</code> (from <code>contextlib</code>) on a generator. The lines before <code>yield</code> set up, the <code>with</code> block runs while the generator is paused on <code>yield</code>, and the cleanup goes under <code>finally:</code>. Without <code>finally</code>, an error skips the cleanup. One <code>with</code> can hold several managers, and they close in reverse order. <code>suppress(FileNotFoundError)</code> ignores one expected error on purpose. Never return <code>True</code> from <code>__exit__</code>: that swallows the error.',
    video: {
      src: 'videos/l85-context-managers.mp4', poster: 'videos/l85-context-managers.jpg', length: '1 min',
      script: [
        'Kitchen Coach bakes Chloe\'s chocolate cake. Switch the oven on, 180 degrees. Bake. Then switch it off.',
        'But tonight, the cake burns. bake raises an error, and Python stops right there. The last line never runs. The oven is still on.',
        'The fix is a with block. With oven on, 180. The block sits inside, held like a clamp.',
        'When the block starts, Python calls enter. The oven goes on. Then your block runs. The cake burns again. But on the way out, Python calls exit, whatever happened. The oven goes off.',
        'Making your own is easy. Put contextmanager on a generator. Switch the oven on, then yield. The with block runs while the generator waits there. Put switch off under finally, so it runs even after an error.',
        'With sets up, runs your block, and always cleans up.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The oven goes off, even if the cake burns.',
        text: [
          'Kitchen Coach bakes Chloe\'s chocolate cake: oven on at 180, bake, oven off. Three steps, and the last one <b>must</b> happen. An oven left on all night is a real problem.',
          'Press <b>Run</b>. Tonight the cake burns: <code>bake</code> raises a <b>ValueError</b> (lesson 54). Python jumps straight to <code>except</code>, so the two "oven off" lines are <b>skipped</b>. The program carries on, and the last line says <code>Is the oven still on? True</code>. (<code>oven</code> is a small dict, so every part of the program can see the switch.)',
          'You have seen the cure for files in lesson 57: <code>with open(...) as f:</code> closes the notebook when the block ends, even after an error. Today you see <b>how</b> <code>with</code> does it, and you build your own <code>with</code> for the oven: <code>with oven_on(180):</code>.'
        ],
        tip: 'A <b>context manager</b> is anything you can put after <code>with</code>. An open file is one. By the end of this lesson, <code>oven_on(180)</code> is one too.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'with calls __enter__ first and __exit__ last.',
        text: [
          '<code>with</code> needs an object with two <b>dunder methods</b>, the hooks from lesson 72 that Python calls for you. When the block starts, Python calls <code>__enter__</code>. When the block ends, for <b>any</b> reason, Python calls <code>__exit__</code>.',
          'Whatever <code>__enter__</code> <b>returns</b> is what the name after <code>as</code> gets. Here it returns <code>self</code>, the oven itself, so <code>oven.temp</code> works inside the block. <code>__exit__</code> gets three extra values: the error\'s type, the error, and its traceback. When nothing went wrong, all three are <code>None</code>.',
          'Press <b>Run</b>. The banana bread prints <code>Oven off. Problem: None</code>. Chloe\'s cake raises a ValueError inside the block, and still <code>Oven off. Problem: &lt;class \'ValueError\'&gt;</code> appears <b>before</b> the traceback. Python switched the oven off on the way out, then let the error carry on and stop the program. The last line never runs.',
          'Now change it: move the <code>raise</code> line into the first <code>with</code> block, under the banana bread, and run again. The oven still goes off, every time.'
        ],
        tip: 'The names <code>exc_type, exc, tb</code> are only a habit. Any three names work, but you will see these everywhere.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'try and finally around every bake.',
        text: [
          'You can do it by hand, the way lesson 57 closed a file: put the work in <code>try:</code> and the cleanup in <code>finally:</code>, the block that runs whatever happens. Press <b>Run</b>: <code>Oven off</code> appears before <code>Problem: the cake burnt</code>, and the oven is off.',
          'It works. But Kitchen Coach does not bake in one place. The roast, the pasta bake, the banana bread and the cake each need the same <b>five lines of wrapping</b>, copied by hand. Copy them ten times and forget them once, and that oven stays on.',
          'And the "on" and the "off" sit far apart, with the real work in between. To see what forgetting looks like, delete the <code>try:</code> line and the <code>finally:</code> line, and pull every line that was under them back by 4 spaces, so the bake has no wrapping at all. Run it: <code>Oven off</code> is gone and the oven is still on.',
          'The <code>Oven</code> class from part 2 already solves it, but it is a whole class with three methods just to say "on, then off".'
        ],
        warn: 'Cleanup you have to remember is cleanup you will one day forget. Write it once, in one place, and let <code>with</code> run it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A generator with @contextmanager.',
        text: [
          'The standard module <code>contextlib</code> has a shortcut. Write a <b>generator</b> (lesson 83) and put <code>@contextmanager</code> on the line above it. The <code>@</code> line is a <b>decorator</b> (lesson 84): it wraps the function below it, and here it turns your generator into something <code>with</code> can use.',
          'Read <code>oven_on</code> from the top. The lines <b>before <code>yield</code></b> set up: oven on. At <code>yield temp</code> the generator <b>pauses</b>, just like in lesson 83, and the value after <code>yield</code> becomes the name after <code>as</code>. While it waits there, <b>your <code>with</code> block runs</b>. When the block ends, the generator wakes up and runs what comes after.',
          'The <code>try:</code> and <code>finally:</code> around the <code>yield</code> are what make it safe. If the block raises an error, Python sends that error back into the generator at the <code>yield</code> line, and <code>finally</code> still switches the oven off. Then the error carries on to your <code>except</code>. Press <b>Run</b>: <code>Oven off</code> twice, the problem is reported, and the oven is off.',
          'The wrapping is now written <b>once</b>. Every bake in Kitchen Coach is just <code>with oven_on(...):</code> and the indented bake.'
        ],
        tip: '<code>from contextlib import contextmanager</code> works like any import from lesson 60. The function must <code>yield</code> exactly once: the one moment the block runs.'
      },
      {
        label: 'Try it', pic: run(tryBox, { title: 'bake_day.py' }),
        h: 'Two managers in one with.',
        text: [
          'One <code>with</code> can hold <b>several</b> managers, separated by commas, as lesson 57 did with two files. The brackets let you put each on its own line. Press <b>Run</b>: apron on, oven on, bake, then <b>oven off before apron off</b>. They close in the <b>reverse</b> order, like taking the tray out before the apron.',
          'Now add <code>raise ValueError("the cake burnt")</code> as a new line under the <code>print</code> in the block, pushed in by 4 spaces, and run it. Both still come off, oven first, and then the traceback stops the program.',
          'The last <code>with</code> is a ready-made manager from <code>contextlib</code>. <code>suppress(FileNotFoundError)</code> means "if this one error happens in the block, ignore it". <code>Path("old_notes.txt").read_text()</code> reads a file (lesson 58), and there is no such file here. Without <code>suppress</code>, that is a FileNotFoundError. With it, Python skips the rest of the block and carries on quietly.',
          'Only suppress an error you <b>expect</b> and do not care about, the same rule as catching one with <code>except</code> (lesson 53).'
        ],
        tip: 'You will meet other ready-made managers: <code>open</code>, <code>suppress</code>, and <code>decimal.localcontext()</code>, which changes how many digits decimal maths keeps, only inside the block, and puts the old setting back afterwards.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Forget finally, or return True, and it goes wrong.',
        text: [
          '<b>No <code>finally</code>, no cleanup after an error.</b> Press <b>Run</b> on <code>no_finally.py</code>: <code>Oven on: 180</code>, the bake, the problem, and <b>no</b> <code>Oven off</code>. The error came back in at the <code>yield</code> line and flew straight out of the generator, so the line after it never ran. A bare <code>yield</code> only cleans up when nothing goes wrong. Fix it: wrap the <code>yield</code> in <code>try:</code> and put the last line under <code>finally:</code>.',
          '<b>Never return <code>True</code> from <code>__exit__</code>.</b> A true return value tells Python "I dealt with the error, forget it". Press <b>Run</b> on <code>swallow.py</code>: the cake burns, and the program prints <code>Dinner is served!</code> as if nothing happened. The error is <b>gone</b>. Delete the <code>return True</code> line and run it again: the ValueError is back where it belongs.',
          '<b>Keep the <code>@contextmanager</code> line.</b> Without it, <code>oven_on(180)</code> is a plain generator, and <code>with</code> stops with <code>TypeError: \'generator\' object does not support the context manager protocol (missed __exit__ method)</code>.'
        ],
        warn: 'A context manager should clean up and then let the error go on. Catching it is the caller\'s job, with <code>try</code> and <code>except</code>, as lesson 53 taught.'
      }
    ],
    exercises: [
      {
        file: 'l85_oven_off.py', title: 'Oven off, every time',
        task: 'Kitchen Coach\'s <code>oven_on(temp)</code> is a <code>@contextmanager</code> generator that writes <code>"Oven on: 180"</code> and <code>"Oven off"</code> into a list called <code>log</code>. It works for the banana bread, but when Chloe\'s cake burns inside the block, <code>"Oven off"</code> never reaches the log. Fix it with <code>try</code> and <code>finally</code>, and let the error still reach the caller.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The banana bread log ends with <code>Oven off</code>, but the cake log does not, and the check gives you a hint.',
          'Between <code>START</code> and <code>END</code>, put <code>yield temp</code> inside a <code>try:</code> and the <code>log.append("Oven off")</code> line under <code>finally:</code>. Do not catch the error.',
          'Run it until it says <code>PASS</code>. The check bakes twice, once with an error inside the block, and reads the log each time.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: 'Put the output of this program in order.',
        pic: code(['class Timer:', '    def __enter__(self):', '        print("timer starts")', '', '    def __exit__(self, exc_type, exc, tb):', '        print("timer rings")', '', 'print("mix the batter")', 'with Timer():', '    print("bake")', 'print("serve")'], { title: 'timer.py' }),
        items: ['mix the batter', 'timer starts', 'bake', 'timer rings', 'serve'],
        why: 'Python calls <code>__enter__</code> when the <code>with</code> block starts, runs the block, then calls <code>__exit__</code> when it ends. Only then does it go on to the next line.',
        hint: 'One hook runs as the block starts, the other as it ends.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Oven:', '    def __enter__(self):', '        return "hot tray"', '', '    def __exit__(self, exc_type, exc, tb):', '        print("Oven off")', '', 'with Oven() as x:', '    print(x)'], { title: 'tray.py' }),
        options: ['hot tray, then Oven off', 'Oven off, then hot tray', '&lt;__main__.Oven object at 0x...&gt;, then Oven off', 'None, then Oven off'],
        answer: 0,
        why: 'The name after <code>as</code> gets whatever <code>__enter__</code> returns, here the text <code>"hot tray"</code>. Not the <code>Oven</code> object itself, unless <code>__enter__</code> returns <code>self</code>. <code>Oven off</code> comes when the block ends.',
        hint: 'Where does the value of x come from?'
      },
      {
        type: 'fix', q: 'Chloe\'s cake burns and the oven stays on. Fix <code>oven_on</code> so the oven goes off <b>even when the block raises</b>. Keep the <code>except</code> at the bottom: the error must still reach it.',
        code: ['from contextlib import contextmanager', '', 'oven = {"on": False}', '', '@contextmanager', 'def oven_on(temp):', '    oven["on"] = True', '    print("Oven on:", temp)', '    yield temp', '    oven["on"] = False', '    print("Oven off")', '', 'try:', '    with oven_on(180):', '        print("Baking chocolate cake")', '        raise ValueError("the cake burnt")', 'except ValueError as err:', '    print("Problem:", err)'],
        title: 'oven_on.py',
        check: [
          'lines = out.strip().splitlines()',
          'want = ["Oven on: 180", "Baking chocolate cake", "Oven off", "Problem: the cake burnt"]',
          'o = globals().get("oven")',
          'if not isinstance(o, dict) or "on" not in o:',
          '    msg = "Keep the line  oven = {\\"on\\": False}  The check reads it."',
          'elif lines == want and o["on"] is False:',
          '    ok = True',
          'elif "Problem: the cake burnt" not in lines:',
          '    msg = "The error never reached the except at the bottom. Clean up in finally:, but do not catch the error inside oven_on."',
          'elif "Oven off" not in lines or o["on"]:',
          '    msg = "The oven is still on. Put  yield temp  inside  try:  and the two oven-off lines under  finally:"',
          'else:',
          '    msg = "The output should be: " + " / ".join(want)'
        ].join('\n'),
        why: 'Wrap the <code>yield</code>: <code>try:</code>, then <code>yield temp</code> indented, then <code>finally:</code> with the two oven-off lines under it. The error comes back in at the <code>yield</code>, <code>finally</code> switches the oven off, and the error carries on to <code>except</code>.',
        hint: 'Which block runs whatever happens? Put the cleanup there, and the yield in the try above it.'
      },
      {
        type: 'fix', q: 'The cake burns, but the program says <code>Dinner is served!</code>. The error has vanished. Fix <code>Oven</code> so the error reaches the <code>except</code> and the output ends with <code>Problem: the cake burnt</code>.',
        code: ['class Oven:', '    def __enter__(self):', '        print("Oven on")', '', '    def __exit__(self, exc_type, exc, tb):', '        print("Oven off")', '        return True', '', 'try:', '    with Oven():', '        print("Baking chocolate cake")', '        raise ValueError("the cake burnt")', '    print("Dinner is served!")', 'except ValueError as err:', '    print("Problem:", err)'],
        title: 'swallow.py',
        check: [
          'lines = out.strip().splitlines()',
          'want = ["Oven on", "Baking chocolate cake", "Oven off", "Problem: the cake burnt"]',
          'if lines == want:',
          '    ok = True',
          'elif "Dinner is served!" in lines:',
          '    msg = "The error is still swallowed. What does __exit__ return?"',
          'elif "Oven off" not in lines:',
          '    msg = "Keep  print(\\"Oven off\\")  in __exit__: the oven must still go off."',
          'else:',
          '    msg = "The output should be: " + " / ".join(want)'
        ].join('\n'),
        why: 'Delete <code>return True</code> (or write <code>return False</code>). A true return from <code>__exit__</code> tells Python the error was dealt with, so it disappears. With nothing returned, the oven still goes off and the ValueError carries on to <code>except</code>.',
        hint: 'One line in __exit__ tells Python to forget the error.'
      },
      {
        type: 'bucket', q: 'Chloe\'s cake raises a ValueError inside <code>with oven_on(180):</code>, and nothing catches it. Which of these still run?',
        buckets: ['Still runs', 'Skipped'],
        items: [
          ['__exit__ of a class used in the with', 0],
          ['the lines under finally: around the yield', 0],
          ['a line right after a bare yield, with no try', 1],
          ['the next line inside the with block, after the error', 1],
          ['the first line after the with block', 1]
        ],
        why: '<code>__exit__</code> and a <code>finally</code> around the <code>yield</code> always run: that is the whole point. A line after a bare <code>yield</code> is skipped, because the error flies out at the <code>yield</code>. The rest of the block, and the code after it, are skipped too, because nobody catches the error.',
        hint: 'Only the cleanup that with promises runs. Everything else stops at the error.'
      },
      {
        type: 'fill', q: 'Finish the oven so it goes off even when the cake burns.',
        text: '@___\ndef oven_on(temp):\n    print("Oven on:", temp)\n    try:\n        ___ temp\n    ___:\n        print("Oven off")',
        options: ['contextmanager', 'yield', 'finally', 'return', 'except', 'else'],
        answer: ['contextmanager', 'yield', 'finally'],
        why: '<code>@contextmanager</code> turns the generator into a context manager. <code>yield temp</code> is where the <code>with</code> block runs, and gives <code>temp</code> to <code>as</code>. <code>finally:</code> runs the cleanup whatever happens. <code>return</code> would end the generator before the block ran, and <code>except</code> would swallow the error.',
        hint: 'One word turns it into a manager, one pauses it, and one runs whatever happens.'
      },
      {
        type: 'pick', q: 'Back to lesson 83. Inside <code>oven_on</code>, what happens at <code>yield temp</code>?',
        pic: code(['@contextmanager', 'def oven_on(temp):', '    print("Oven on:", temp)', '    try:', '        yield temp', '    finally:', '        print("Oven off")'], { title: 'oven_on.py' }),
        options: ['The generator pauses there while the with block runs, then wakes up when the block ends', 'The function ends and returns temp, like return', 'The with block runs once for every value it yields', 'Nothing: yield only works in a for loop'],
        answer: 0,
        why: 'As in lesson 83, <code>yield</code> hands out a value and pauses the generator on that line. <code>@contextmanager</code> uses that pause: your <code>with</code> block runs while the generator waits, and when the block ends the generator carries on into <code>finally</code>.',
        hint: 'What did yield do to the pancake station in lesson 83?'
      },
      {
        type: 'pick', q: 'Someone deleted the <code>@contextmanager</code> line. What happens?',
        pic: code(['def oven_on(temp):', '    print("Oven on:", temp)', '    try:', '        yield temp', '    finally:', '        print("Oven off")', '', 'with oven_on(180):', '    print("Baking")'], { title: 'oven_on.py' }),
        options: ["TypeError: 'generator' object does not support the context manager protocol (missed __exit__ method)", 'Oven on: 180, Baking, Oven off', 'Baking, and the oven never goes on', 'Oven on: 180, then the program waits forever'],
        answer: 0,
        why: 'Without the decorator, <code>oven_on(180)</code> just gives a plain generator, and it runs none of its lines (lesson 83). A generator has no <code>__enter__</code> or <code>__exit__</code>, so <code>with</code> refuses it with that TypeError.',
        hint: 'What does calling a generator function give you, and does it have the two hooks with needs?'
      }
    ]
  });
})();
