/* Lesson 98: Performance and profiling (module 9). One file per lesson.
   Every Run box was checked with Python 3.14 (Homebrew) and in this page (Pyodide, Python 3.14).
   Terminal pictures are real, run on 2026-11-23: cProfile, profiling.tracing and timeit with
   Python 3.15.2 (Homebrew) on a Mac. The new sampling profiler (python -m profiling.sampling, new in 3.15)
   needs admin rights on macOS ("Permission Error: Unable to access process memory"), so its output
   was captured with Python 3.15.2 on Linux (the python:3.15-slim container), same coach.py.
   Times differ on every computer and every run: Run boxes print booleans and shapes, not exact numbers. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l98  Performance and profiling
     ===================================================================== */

  // The small morning every Run box imports. On the Mac, coach.py has the same stations
  // with the real numbers: 20,000 orders and 40,000 pantry items.
  const stations = [
    'def read_orders():',
    '    return [f"item-{n * 7 % 12_000}" for n in range(5_000)]',
    '',
    '',
    'def load_pantry():',
    '    return [f"item-{n}" for n in range(10_000)]',
    '',
    '',
    'def in_pantry(item, pantry):',
    '    return item in pantry',
    '',
    '',
    'def check_pantry(orders, pantry):',
    '    missing = []',
    '    for item in orders:',
    '        if not in_pantry(item, pantry):',
    '            missing.append(item)',
    '    return missing',
    '',
    '',
    'def cook(orders):',
    '    return [f"{item}: cooked" for item in orders]',
    '',
    '',
    'def plate(dishes):',
    '    return "\\n".join(dishes)'
  ];
  const files = { 'stations.py': stations.join('\n') + '\n' };

  // A kitchen station card, used in several pictures.
  const station = (x, y, w, name, sub, fill, col) =>
    box(x, y, w, 58, fill || P.white, 10) +
    T(x + w / 2, y + 26, name, { s: 13.5, f: col || P.ink }) +
    T(x + w / 2, y + 45, sub, { s: 11, m: true, w: 700, f: P.ink2 });

  /* ---- The idea: a stopwatch says how long, not where ---- */
  const names = [['read orders', 'read_orders'], ['check pantry', 'check_pantry'], ['cook', 'cook'], ['plate', 'plate']];
  const ideaSvg = svg(600, 250, 'Kitchen Coach\'s morning as a kitchen line with four stations: read orders, check pantry, cook, plate. A stopwatch over the whole line says 2.02 seconds. Under each station is a question mark: the stopwatch does not say which station took the time. Guessing picks one at random. A profiler puts a stopwatch on every station.',
    box(170, 14, 260, 54, P.warnT, 12) +
    `<circle cx="204" cy="41" r="15" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><path d="M204 41 L204 31 M204 41 L212 45" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/><rect x="199" y="20" width="10" height="5" fill="${P.ink}"/>` +
    T(318, 48, 'whole morning: 2.02 s', { s: 15, m: true }) +
    `<path d="M24 86 L24 78 L576 78 L576 86" stroke="${P.warn}" stroke-width="2.5" fill="none"/>` +
    names.map(([n, f], i) => station(16 + i * 146, 96, 128, n, f + '()') +
      T(80 + i * 146, 188, '?', { s: 26, f: P.mute }) +
      (i < 3 ? arrow(146 + i * 146, 125, 160 + i * 146, 125, P.ink, 2) : '')).join('') +
    T(300, 232, 'The stopwatch says how long. It does not say where.', { s: 13, w: 700, f: P.ink2 }));
  const morning = [
    'import time',
    'from stations import read_orders, load_pantry, check_pantry, cook, plate',
    '',
    'start = time.perf_counter()',
    'orders = read_orders()',
    'pantry = load_pantry()',
    'missing = check_pantry(orders, pantry)',
    'report = plate(cook(orders))',
    'took = time.perf_counter() - start',
    '',
    'print(f"{len(orders):,} orders, {len(missing)} missing")',
    'print(f"Morning check: {took * 1000:.0f} ms")'
  ];
  const macRun = ['$ python3 coach.py', '20000 orders, 2857 missing', 'Morning check: 2.02 s'];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${code(stations, { title: 'stations.py (the four stations, a small morning)' })}${run(morning, { title: 'morning.py', files })}${term(macRun, 'terminal, Python 3.15: the real morning, 20,000 orders')}</div>`;

  /* ---- The code: cProfile puts a stopwatch on every function ---- */
  const cprof = [
    '$ python3 -m cProfile -s cumulative coach.py',
    '20000 orders, 2857 missing',
    'Morning check: 2.02 s',
    '         22872 function calls in 2.024 seconds',
    ' ',
    '   Ordered by: cumulative time',
    ' ',
    '   ncalls  tottime  percall  cumtime  percall filename:lineno(function)',
    '        1    0.000    0.000    2.024    2.024 {built-in method builtins.exec}',
    '        1    0.000    0.000    2.024    2.024 coach.py:1(<module>)',
    '        1    0.002    0.002    2.020    2.020 coach.py:16(check_pantry)',
    '    20000    2.018    0.000    2.018    0.000 coach.py:12(in_pantry)',
    '        1    0.002    0.002    0.002    0.002 coach.py:8(load_pantry)',
    '        1    0.001    0.001    0.001    0.001 coach.py:4(read_orders)',
    '        1    0.000    0.000    0.000    0.000 coach.py:24(cook)',
    '        1    0.000    0.000    0.000    0.000 coach.py:28(plate)',
    '# ... 5 more lines, all 0.000'
  ];
  const colSvg = svg(600, 300, 'One line of the profiler output, taken apart. 20000 under ncalls: in_pantry was called 20,000 times, once per order. 2.018 under tottime: seconds spent inside in_pantry itself. 2.018 under cumtime: seconds inside in_pantry plus everything it called, the same here because it calls nothing of ours. percall is time divided by calls. Below, the cumtime of each station as a bar: check pantry 2.020 seconds, a bar across the whole width. Read orders 0.001, load pantry 0.002, cook 0.000 and plate 0.000: bars too thin to see.',
    box(12, 10, 576, 46, P.white, 10) +
    T(300, 39, '20000   2.018   0.000   2.018   0.000  coach.py:12(in_pantry)', { s: 13, m: true }) +
    [[56, 'ncalls', 'times called'], [136, 'tottime', 'inside it only'], [292, 'cumtime', 'it + what it calls'], [462, 'filename:lineno', 'which function']].map(([x, h, s]) =>
      `<line x1="${x}" y1="58" x2="${x}" y2="74" stroke="${P.accent}" stroke-width="2"/>` + T(x, 90, h, { s: 12.5, m: true, f: P.accent }) + T(x, 107, s, { s: 11.5, w: 700, f: P.ink2 })).join('') +
    T(16, 140, 'cumtime of each station, in seconds', { s: 13, a: 'start' }) +
    [['read orders', 0.001], ['load pantry', 0.002], ['check pantry', 2.020], ['cook', 0.000], ['plate', 0.000]].map(([n, v], i) => {
      const y = 154 + i * 28, w = Math.max(2, v / 2.024 * 370), hot = v > 1;
      return T(118, y + 15, n, { s: 12.5, a: 'end', f: hot ? P.danger : P.ink2 }) +
        `<rect x="128" y="${y}" width="${w}" height="20" rx="4" fill="${hot ? P.danger : P.ink2}"/>` +
        T(hot ? 128 + w - 8 : 140, y + 15, v.toFixed(3) + (hot ? '  (99.8%)' : ''), { s: 12, m: true, a: hot ? 'end' : 'start', f: hot ? P.white : P.ink2 });
    }).join(''));
  const profileIt = [
    'import cProfile',
    'from stations import read_orders, load_pantry, check_pantry, cook, plate',
    '',
    'with cProfile.Profile() as prof:',
    '    orders = read_orders()',
    '    pantry = load_pantry()',
    '    missing = check_pantry(orders, pantry)',
    '    report = plate(cook(orders))',
    '',
    'prof.print_stats("cumulative")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${term(cprof, 'terminal, Python 3.15: the real morning, profiled')}${colSvg}${run(profileIt, { title: 'profile_it.py', files })}</div>`;

  /* ---- The pain: in on a list walks the shelf ---- */
  const shelfSvg = svg(600, 260, 'Top: the pantry as a list is one long shelf, item-0, item-1, item-2 and on to item-39999. To answer is item-39999 here, the clerk looks at every item from the left: 40,000 looks. Bottom: the pantry as a set is a wall of labelled drawers. Python works out the drawer from the name and opens only that one: 1 look.',
    T(16, 24, 'a list: one long shelf', { s: 14, a: 'start' }) +
    ['item-0', 'item-1', 'item-2', 'item-3', 'item-4'].map((s, i) => `<rect x="${16 + i * 78}" y="38" width="70" height="34" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(51 + i * 78, 60, s, { s: 11.5, m: true })).join('') +
    T(436, 61, '...', { s: 16 }) +
    `<rect x="470" y="38" width="112" height="34" rx="6" fill="${P.warnT}" stroke="${P.warn}" stroke-width="2.5"/>` + T(526, 60, 'item-39999', { s: 11.5, m: true }) +
    `<path d="M30 86 L560 86" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="3 7"/>` + arrow(548, 86, 568, 86, P.danger, 2.5) +
    T(16, 112, '"item-39999" in shelf: look, look, look... 40,000 looks', { s: 13, w: 700, f: P.danger, a: 'start' }) +
    T(16, 150, 'a set: labelled drawers', { s: 14, a: 'start' }) +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
      const x = 16 + (i % 4) * 64, y = 162 + Math.floor(i / 4) * 40, hot = i === 6;
      return `<rect x="${x}" y="${y}" width="56" height="32" rx="5" fill="${hot ? P.okT : P.sand}" stroke="${hot ? P.ok : P.ink}" stroke-width="${hot ? 3 : 2}"/><rect x="${x + 20}" y="${y + 20}" width="16" height="5" rx="2" fill="${P.ink}"/>`;
    }).join('') +
    T(156, 236, 'item-39999', { s: 10.5, m: true, f: P.ok }) +
    arrow(470, 216, 166, 216, P.ok, 2.5) +
    T(300, 190, '"item-39999" in drawer', { s: 13, m: true, a: 'start', f: P.ok }) +
    T(300, 254, 'straight to the right drawer: 1 look', { s: 13, w: 700, f: P.ok, a: 'start' }));
  const shelf = [
    'def walk_shelf(item, shelf):',
    '    looks = 0',
    '    for thing in shelf:',
    '        looks += 1',
    '        if thing == item:',
    '            return looks',
    '    return looks',
    '',
    '',
    'shelf = [f"item-{n}" for n in range(10_000)]',
    '',
    'for item in ["item-2", "item-5000", "item-9999", "item-12345"]:',
    '    print(f"{item}: {walk_shelf(item, shelf):,} looks")'
  ];
  const painPic = `<div style="width:100%;min-width:0">${shelfSvg}${run(shelf, { title: 'shelf.py' })}</div>`;

  /* ---- The fix: one line, the pantry becomes a set ---- */
  const fixLine = [
    'start = time.perf_counter()',
    'orders = read_orders()',
    'pantry = set(load_pantry())',
    'missing = check_pantry(orders, pantry)',
    'report = plate(cook(orders))'
  ];
  const fixed = [
    'import time',
    'from stations import read_orders, load_pantry, check_pantry',
    '',
    'orders = read_orders()',
    'shelf = load_pantry()    # a list: walk it item by item',
    'drawer = set(shelf)      # a set: go straight to the spot',
    '',
    'start = time.perf_counter()',
    'missing_slow = check_pantry(orders, shelf)',
    'slow = time.perf_counter() - start',
    '',
    'start = time.perf_counter()',
    'missing_fast = check_pantry(orders, drawer)',
    'fast = time.perf_counter() - start',
    '',
    'print(f"list: {slow * 1000:.1f} ms")',
    'print(f"set:  {fast * 1000:.1f} ms")',
    'print("same missing items:", missing_fast == missing_slow)',
    'print("the set was faster:", fast < slow)'
  ];
  const after = [
    '$ python3 coach.py',
    '20000 orders, 2857 missing',
    'Morning check: 0.01 s',
    '$ python3 -m cProfile -s cumulative coach.py',
    '         22872 function calls in 0.007 seconds',
    ' ',
    '   ncalls  tottime  percall  cumtime  percall filename:lineno(function)',
    '        1    0.001    0.001    0.002    0.002 coach.py:16(check_pantry)',
    '        1    0.002    0.002    0.002    0.002 coach.py:8(load_pantry)',
    '        1    0.001    0.001    0.001    0.001 coach.py:4(read_orders)',
    '    20000    0.001    0.000    0.001    0.000 coach.py:12(in_pantry)',
    '# ... the rest, all 0.000'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${code(fixLine, { title: 'coach.py, line 34: the only change', good: [3] })}${term(after, 'terminal, Python 3.15: the same morning, with a set')}${run(fixed, { title: 'fixed.py', files })}</div>`;

  /* ---- Try it: timeit, and the new sampling profiler ---- */
  const timeitTerm = [
    '$ python3 -m timeit -s \'shelf = [f"item-{n}" for n in range(40_000)]\' \'"item-39999" in shelf\'',
    '2000 loops, best of 5: 178 usec per loop',
    '$ python3 -m timeit -s \'shelf = [f"item-{n}" for n in range(40_000)]\' -s \'drawer = set(shelf)\' \'"item-39999" in drawer\'',
    '50000000 loops, best of 5: 8.17 nsec per loop'
  ];
  const timeitBox = [
    'import timeit',
    '',
    'shelf = [f"item-{n}" for n in range(10_000)]',
    'drawer = set(shelf)',
    '',
    'list_s = timeit.timeit(lambda: "item-9999" in shelf, number=1_000)',
    'set_s = timeit.timeit(lambda: "item-9999" in drawer, number=1_000)',
    '',
    'print(f"1,000 checks on the list: {list_s * 1000:.1f} ms")',
    'print(f"1,000 checks on the set:  {set_s * 1000:.3f} ms")'
  ];
  const sampling = [
    '$ python3 -m profiling.sampling run coach.py',
    '20000 orders, 2857 missing',
    'Morning check: 2.08 s',
    'Captured 2087 samples in 2.09 seconds',
    'Sample rate: 999.55 samples/sec',
    'Error rate: 0.24',
    'Profile Stats:',
    '       nsamples   sample%   tottime (s)  filename:lineno(function)',
    '      2037/2037      97.8         2.037  coach.py:13(in_pantry)',
    '          26/26       1.2         0.026  coach.py:9(load_pantry)',
    '          14/14       0.7         0.014  coach.py:25(cook)',
    '            4/4       0.2         0.004  coach.py:29(plate)',
    '            1/1       0.0         0.001  coach.py:5(read_orders)',
    '# trimmed: the cumul% and cumtime columns, and the rest, are left out'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${term(timeitTerm, 'terminal, Python 3.15: timeit, one small line')}${run(timeitBox, { title: 'timeit_it.py' })}${term(sampling, 'new in 3.15: the sampling profiler (this run: Linux, Python 3.15.2)')}</div>`;

  /* ---- The catch: when not to ---- */
  const step = (y, n, s, col) => `<circle cx="34" cy="${y}" r="14" fill="${col}"/>` + T(34, y + 5, String(n), { s: 13, f: P.white }) + T(58, y + 5, s, { s: 13.5, a: 'start' });
  const catchSvg = svg(600, 250, 'A short checklist. First ask: is it too slow for the people who use it? If no, stop: keep the code readable. If yes: 1, time the whole thing. 2, profile it. 3, fix only the top line. 4, check the answer is the same and time it again.',
    box(16, 12, 568, 54, P.warnT, 12) +
    T(300, 45, 'Is it too slow for the people who use it?', { s: 15 }) +
    `<path d="M150 66 L150 92" stroke="${P.ink}" stroke-width="2"/>` + T(150, 108, 'no', { s: 13, f: P.ok }) +
    box(64, 118, 176, 46, P.okT, 10) + T(152, 146, 'stop. keep it readable', { s: 12.5, f: P.ok }) +
    `<path d="M420 66 L420 82" stroke="${P.ink}" stroke-width="2"/>` + T(436, 80, 'yes', { s: 13, f: P.danger, a: 'start' }) +
    `<g transform="translate(270 70)">` +
    step(34, 1, 'time the whole thing', P.ink) + step(76, 2, 'profile it', P.ink) +
    step(118, 3, 'fix only the top line', P.danger) + step(160, 4, 'same answer? time again', P.ok) + `</g>`);
  const catchPic = `<div style="width:100%;min-width:0">${catchSvg}</div>`;

  COURSE.add({
    id: 'l98', minutes: 14,
    summary: 'When a program is slow, <b>measure, do not guess</b>. <code>time.perf_counter()</code> around a block says <b>how long</b> (lessons 42 and 84), but not <b>where</b>. A <b>profiler</b> puts a stopwatch on <b>every function</b>: <code>python3 -m cProfile -s cumulative coach.py</code> lists them, slowest first. <code>ncalls</code> is how many times a function ran, <code>tottime</code> the time inside it only, <code>cumtime</code> the time inside it plus everything it called. Kitchen Coach checks 20,000 orders against a pantry of 40,000 items, and 2.02 of its 2.024 seconds are in <code>in_pantry</code>: <code>item in pantry</code> on a <b>list</b> walks the shelf item by item, 457 million looks in all. Make the pantry a <b>set</b> (lesson 39), one line, and the morning drops to 0.01 s. <code>timeit</code> times one small line many times: <code>python3 -m timeit</code> in a terminal, <code>timeit.timeit()</code> in code. <b>New in 3.15</b>: a <code>profiling</code> package, with <code>profiling.tracing</code> as the new name for cProfile and a <b>sampling profiler</b>, <code>python -m profiling.sampling</code>, that peeks at a running program about 1,000 times a second. And when not to: most programs are fast enough. Write it clear first, measure, and fix only the step the profiler points at.',
    video: {
      src: 'videos/l98-performance-and-profiling.mp4', poster: 'videos/l98-performance-and-profiling.jpg', length: '1 min 7 s',
      script: [
        'Every morning, Kitchen Coach checks 20,000 orders against the pantry. Four stations. Read the orders, check the pantry, cook, plate.',
        'The stopwatch says 2 seconds. But which station is slow? Do not guess. Measure.',
        'Run it under the profiler. It puts a stopwatch on every function. Read orders, almost nothing. Cook and plate, almost nothing. Check pantry, 99 percent of the time.',
        'Zoom in. The pantry is a list, one long shelf. To answer "is it here?", the clerk walks the shelf, item by item. For 20,000 orders, that is 457 million looks.',
        'A set is a wall of labelled drawers. Python goes straight to the right drawer and opens it. One look.',
        'Change one line. The pantry becomes a set. Profile again. The bar shrinks to nothing, and the stopwatch drops from 2 seconds to 1 hundredth of a second.',
        'Measure first. The profiler shows the slow step. Fix that one.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A stopwatch says how long. Not where.',
        text: [
          'Kitchen Coach now helps a busy meal-prep kitchen. Every morning it checks the day\'s orders against the pantry and lists what is missing. Four stations, in order: <b>read the orders</b>, <b>check the pantry</b>, <b>cook</b>, <b>plate</b>. On the Mac, with 20,000 orders and a pantry of 40,000 items, the morning takes <b>2 seconds</b>. Every single morning.',
          'Which station is slow? You could <b>guess</b>. Cooking sounds like hard work. Gluing 20,000 lines together in <code>plate</code> sounds slow too. Lesson 88 said it about bugs, and it is just as true for speed: <b>do not guess, look</b>.',
          'The stations live in <code>stations.py</code>, with a smaller morning (5,000 orders, 10,000 items) so it fits in your browser. Press <b>Run</b> on <code>morning.py</code>. <code>time.perf_counter()</code>, the stopwatch from lessons 42 and 84, times the whole morning. Your number will differ from run to run.',
          'Now move the stopwatch: put <code>start = ...</code> just above <code>missing = ...</code> and <code>took = ...</code> just below it, and run again. Almost the same number. You found the slow station by hand. With 4 stations that works. With 40 functions calling each other, you need a tool.'
        ],
        tip: 'A Run box here runs Python compiled to WebAssembly, a little slower than <code>python3</code> on your computer. The <b>shape</b> of the result is the same: which step is slow, and by how much compared with the others.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'The profiler puts a stopwatch on every function.',
        text: [
          'A <b>profiler</b> runs your program and times <b>every function</b> in it, without you changing a line. Python comes with one, <b>cProfile</b>. In a terminal: <code>python3 -m cProfile -s cumulative coach.py</code>. <code>-m cProfile</code> runs coach.py under the profiler (like <code>-m pip</code> in lesson 63), and <code>-s cumulative</code> sorts the table, the biggest <code>cumtime</code> first.',
          'Read the table one column at a time. <code>ncalls</code>: how many times the function ran. <code>in_pantry</code> ran 20,000 times, once per order. <code>tottime</code>: seconds spent <b>inside</b> the function itself. <code>cumtime</code>: seconds inside it <b>plus everything it called</b>. <code>percall</code> is that time divided by <code>ncalls</code>. The top lines, <code>exec</code> and <code>&lt;module&gt;</code>, are the whole file, so they are always 100%.',
          'Now the answer jumps out: <code>check_pantry</code> took <b>2.020</b> of the <b>2.024</b> seconds, and nearly all of it was inside <code>in_pantry</code>. Everything else together: about 0.004 s. Your guess about cooking was wrong.',
          'You can profile part of a program from code too. Press <b>Run</b> on <code>profile_it.py</code>: <code>with cProfile.Profile() as prof:</code> (lesson 85, Context managers) times only the lines inside it, and <code>prof.print_stats("cumulative")</code> prints the same table. Read the <code>cumtime</code> column first.'
        ],
        tip: '<b>New in 3.15</b>: cProfile has a new home, <code>python3 -m profiling.tracing -s cumulative coach.py</code>. Same profiler, same table, a clearer name. <code>cProfile</code> still works, so every tutorial you find keeps working.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'in on a list walks the shelf, item by item.',
        text: [
          '<code>in_pantry</code> is one tiny line: <code>return item in pantry</code>. Why is it slow? Because <code>pantry</code> is a <b>list</b>. To answer "is item-39999 in here?", Python starts at the left end and compares, one item at a time, until it finds it or runs out of shelf. Lesson 39 said a set answers <code>in</code> fast. This is the other half of that story.',
          'Press <b>Run</b> on <code>shelf.py</code>. <code>walk_shelf</code> does what <code>in</code> does on a list, and counts. <code>item-2</code> is found after <b>3</b> looks, near the front. <code>item-9999</code> takes <b>10,000</b>. <code>item-12345</code> is not there, and Python only knows that after looking at <b>all 10,000</b>.',
          'Now the real morning: 20,000 orders, a shelf of 40,000 items, and many orders near the far end or not there at all. That adds up to <b>457,162,856</b> looks. Each look is fast, and still the total is 2 seconds. A longer shelf makes every check slower: twice the pantry, about twice the time.'
        ],
        warn: 'The slow line looked innocent. <code>item in pantry</code> reads exactly the same for a list and a set. Only the container behind the name decides how much work it is. That is why you profile instead of reading the code and guessing.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One line: the pantry becomes a set.',
        text: [
          'A set does not walk. It works out the right drawer from the name itself and opens only that one: <b>one look</b>, whether the pantry holds 10 items or 40,000. So change one line of coach.py: <code>pantry = set(load_pantry())</code>. Nothing else. <code>in_pantry</code> still says <code>item in pantry</code>, and now it is fast.',
          'Run it again: <b>0.01 s</b> instead of 2.02 s. Profile again: <code>in_pantry</code> still runs 20,000 times, but all 20,000 together take <b>0.001</b> s. The profiler now shows no single slow station. That is how you know you are done.',
          'Press <b>Run</b> on <code>fixed.py</code>. It times the list and the set side by side, and checks the most important thing first: <b>the same missing items</b>. A fast answer that is wrong is not a fix. Your milliseconds will differ, but the set wins every time.'
        ],
        tip: 'Make the set <b>once</b>, before the loop. <code>if item in set(pantry_list)</code> inside the loop builds a whole new set for every order, and is even slower than the list.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'timeit for one line. The sampling profiler for a running kitchen.',
        text: [
          'The profiler says <b>which function</b>. To compare two ways of writing <b>one small line</b>, use <b>timeit</b>. It runs the line many times and reports a fair time per run. In a terminal, <code>python3 -m timeit -s \'setup\' \'line\'</code> runs the setup once and the line thousands of times. On the Mac: <b>178 usec</b> (microseconds, millionths of a second) to find the last item on a 40,000 shelf, and <b>8.17 nsec</b> (nanoseconds, billionths) in a set. About 20,000 times faster.',
          'In code, <code>timeit.timeit(lambda: ..., number=1_000)</code> runs a lambda (lesson 80) 1,000 times and returns the total seconds. Press <b>Run</b> on <code>timeit_it.py</code>. The set may show <code>0.000</code> ms: too fast for the browser\'s clock to see. Then make the shelf 10 times bigger, <code>range(100_000)</code>, and change <code>"item-9999"</code> to <code>"item-99999"</code>. The list gets about 10 times slower. The set stays tiny.',
          '<b>New in 3.15: the sampling profiler.</b> cProfile records <b>every</b> call, which slows the program down while it watches. The new <code>python3 -m profiling.sampling run coach.py</code> does not touch your code. About 1,000 times a second it peeks at which line is running, and counts. 2,037 peeks found Python inside <code>in_pantry</code>: 97.8% of them. Same answer, almost no slowdown, so it is safe even on a real, busy program. It can also <code>attach</code> to a program that is already running.'
        ],
        warn: 'On macOS the sampling profiler needs admin rights to peek into another program: without them it stops with <code>Permission Error: Unable to access process memory on macOS</code>. Put <code>sudo</code> in front (<code>sudo python3 -m profiling.sampling run coach.py</code>) and type your Mac password, or use <code>python3 -m cProfile</code>, which needs nothing. The output above was captured on Linux, with the same coach.py.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Most programs are fast enough. Measure before you change anything.',
        text: [
          '<b>Do not speed up what you have not measured.</b> Programmers who guess spend a day making <code>cook</code> clever and win 0.001 s. The profiler would have pointed at the pantry in one minute. And a clever rewrite of the wrong step is harder to read and still slow.',
          '<b>Clear first.</b> Kitchen Coach for 3 friends checks 6 dishes, not 20,000 orders. A list is perfect there, and nobody will ever notice the difference. Make it work, make it clear (lessons 49 and 92), and only when a real person waits too long, measure and fix.',
          '<b>Numbers wobble.</b> Times change from run to run and computer to computer. Run more than once, compare inside the <b>same</b> run, and trust big differences (2 s against 0.01 s), not tiny ones.',
          '<b>Two classic slow steps</b>, so you recognise them in a profile. <code>in</code> on a big list inside a loop: use a set or a dict. And building text with <code>report += line</code> in a long loop: collect the pieces in a list and <code>"\\n".join(pieces)</code> once at the end, like <code>plate</code> does.'
        ],
        tip: 'Fixed the slow step and it is still too slow? Lesson 99, Concurrency, shows how several cooks can share the work.'
      }
    ],
    exercises: [
      {
        file: 'l98_slow_step.py', title: 'Find the slow step',
        task: '<code>find_missing(orders, pantry_list)</code> lists every order that is not in the pantry. It is right, and slow. <b>Profile</b> it, find the slow step, and fix it with a set. The check says <code>PASS</code> when your version gives the same missing items and is at least 5 times faster.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. STEP 1 shows how long the morning check takes.',
          'In a terminal, run <code>python3 -m cProfile -s cumulative l98_slow_step.py</code>. Which function has almost all of the <code>cumtime</code>? Skip the names that start with <code>_</code>: they are the check.',
          'Between <code>START</code> and <code>END</code>, make a set from <code>pantry_list</code> once, before the loop, and check the set instead. Keep looping over <code>orders</code>, so the missing items stay in order.',
          'Run the file. STEP 2 times the old way and yours and says <code>PASS</code> or gives one hint. Then profile it again and compare.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Kitchen Coach\'s morning check suddenly takes 20 seconds. What do you do <b>first</b>?',
        options: ['Run it under a profiler and see which function takes the time', 'Rewrite the cook step, because cooking sounds slow', 'Turn every list in the program into a set', 'Buy a faster computer'],
        answer: 0,
        why: 'Measure, do not guess. The profiler shows the one step that eats the time. Rewriting a guessed step, or changing everything at once, usually wins nothing and makes the code harder to read.',
        hint: 'Lesson 88 said it about bugs: do not guess, look.'
      },
      {
        type: 'pick', q: 'Here is a real profile. Which function should you fix?',
        pic: term([
          '   ncalls  tottime  percall  cumtime  percall filename:lineno(function)',
          '        1    0.000    0.000    3.140    3.140 menu.py:1(<module>)',
          '        1    0.004    0.004    3.130    3.130 menu.py:20(plan_week)',
          '     7000    3.090    0.000    3.090    0.000 menu.py:9(has_allergen)',
          '        7    0.020    0.003    0.030    0.004 menu.py:14(load_recipes)',
          '        1    0.006    0.006    0.006    0.006 menu.py:30(print_menu)'
        ], 'terminal: python3 -m cProfile -s cumulative menu.py'),
        options: ['has_allergen: it ran 7,000 times and its own time is 3.09 of 3.14 seconds', 'plan_week: it has the biggest cumtime', 'load_recipes: it ran 7 times', 'print_menu: printing is always slow'],
        answer: 0,
        why: '<code>plan_week</code> has a big <code>cumtime</code> only because it <b>calls</b> <code>has_allergen</code>: its own <code>tottime</code> is 0.004 s. Follow the big <code>cumtime</code> down until you find the line where <code>tottime</code> is big too. That is the slow step.',
        hint: 'cumtime includes everything a function calls. tottime is its own work.'
      },
      {
        type: 'match', q: 'Match each profiler column to what it means.',
        pairs: [
          ['ncalls', 'how many times the function ran'],
          ['tottime', 'seconds inside the function itself'],
          ['cumtime', 'seconds inside it, plus everything it called'],
          ['percall', 'a time divided by the number of calls'],
          ['filename:lineno(function)', 'which function, and where it starts']
        ],
        why: 'Sort by <code>cumtime</code> to see which part of the program is slow, then look for a big <code>tottime</code> to find the function doing the work. A big <code>ncalls</code> often explains why: a small cost, paid 20,000 times.',
        hint: 'tot = total in this function only. cum = cumulative, it adds up the calls inside.'
      },
      {
        type: 'fix', q: 'This check is slow because <code>pantry</code> is a list. Make it fast with a set, without changing what it prints.',
        code: [
          'pantry = [f"item-{n}" for n in range(10_000)]',
          'orders = [f"item-{n * 7 % 12_000}" for n in range(5_000)]',
          '',
          'missing = []',
          'for item in orders:',
          '    if item not in pantry:',
          '        missing.append(item)',
          '',
          'print(len(missing), "missing")',
          'print("first:", missing[0])'
        ],
        title: 'morning.py',
        check: [
          'sets = [v for v in globals().values() if isinstance(v, (set, frozenset)) and len(v) == 10_000]',
          'lines = out.splitlines()',
          'if lines != ["714 missing", "first: item-10003"]:',
          '    msg = "It should still print  714 missing  and  first: item-10003. Keep looping over orders, in order."',
          'elif not sets:',
          '    msg = "Same output, but the pantry is still a list. Make it a set: wrap the list in set(...) on line 1."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>pantry = set(...)</code> on line 1 is the whole fix. <code>item not in pantry</code> reads the same, but now each check goes straight to one drawer instead of walking up to 10,000 items. The orders stay a list, so the missing items keep their order.',
        hint: 'Change line 1 only. A set is made with set(...).'
      },
      {
        type: 'bucket', q: 'Which of these answer <code>x in ...</code> by going straight to the spot, and which walk item by item?',
        buckets: ['Straight to the spot (fast)', 'Walks item by item (slower when big)'],
        items: [
          ['a set', 0],
          ['a dict (it checks the keys)', 0],
          ['a frozenset', 0],
          ['a list', 1],
          ['a tuple', 1]
        ],
        why: 'Sets, frozensets and dict keys work out the spot from the value itself, so <code>in</code> is one look at any size. Lists and tuples keep things in order, so <code>in</code> has to compare from the front. For 5 items you will never notice. For 40,000, inside a loop, you will.',
        hint: 'Lesson 42 chose a set for the allergens for exactly this reason.'
      },
      {
        type: 'pick', q: 'Back to lesson 84. You have <code>@timed</code>, a decorator that prints how long one function took. When is a profiler the better tool?',
        options: ['When you do not know yet which function is slow: it times every function without changing your code', 'Never: @timed and a profiler tell you exactly the same thing', 'Only when the program has an error', 'When the program has just one function'],
        answer: 0,
        why: '<code>@timed</code> is great once you know where to look: you put it on one function and keep it. A profiler answers the question before that, "where is the time going?", for all 40 functions at once, and you add nothing to the code.',
        hint: 'How many functions would you have to decorate to find the slow one?'
      },
      {
        type: 'order', q: 'Put the steps for speeding up a slow program in order.',
        items: ['Time the whole thing, so you know the starting number', 'Profile it and find the function with the most time', 'Fix only that step', 'Check the answer is still the same', 'Time it again and compare'],
        why: 'Measure, find, fix one thing, check it is still right, and measure again. If it is still too slow, profile again: a new step is now at the top.',
        hint: 'You cannot say it got faster without a number from before.'
      },
      {
        type: 'pick', q: 'Which are good reasons <b>not</b> to speed up code? Pick all that apply.',
        options: ['It is already fast enough for the people who use it', 'You have not measured it, so you do not know which part is slow', 'The faster version would be much harder to read, for a gain nobody notices', 'The profiler shows one function takes 99% of a 30 second wait'],
        answer: [0, 1, 2],
        why: 'Most programs are fast enough, and clear code is worth more than a few saved milliseconds. Measure first. A function eating 99% of a 30 second wait is the one case where you should act, and the fix is often one line.',
        hint: 'One option is the perfect reason to start, not to stop.'
      }
    ]
  });
})();
