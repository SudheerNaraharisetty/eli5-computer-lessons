/* Lesson 88: Debugging (module 8). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The pdb session in The fix is a real python3.15 run (input piped in, the folder shown as /Users/you/kitchen).
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l88  Debugging
     ===================================================================== */

  const tick = (x, y, col) => `<path d="M${x - 8} ${y} l6 6 l11 -13" fill="none" stroke="${col || P.ok}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cross = (x, y, col) => `<path d="M${x - 7} ${y - 7} l14 14 m0 -14 l-14 14" stroke="${col || P.danger}" stroke-width="3.5" stroke-linecap="round"/>`;
  const MEALS = [['breakfast', 650], ['lunch', 820], ['snack', 510], ['dinner', 620]];
  const DAY = 'day = [("breakfast", 650), ("lunch", 820), ("snack", 510), ("dinner", 620)]';

  /* ---- The idea: the program runs, and it lies ---- */
  const ideaSvg = svg(600, 230, 'Left: the Kitchen Coach screen says Ana ate 3110 kcal today. No error, no traceback. Right: a note worked out by hand: 650 plus 820 plus 510 plus 620 is 2600. The two answers do not match.',
    box(16, 16, 260, 196, P.white, 14) +
    `<rect x="16" y="16" width="260" height="40" rx="14" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(146, 42, 'Kitchen Coach', { s: 15, f: P.accent }) +
    T(146, 90, 'Ana ate today', { s: 14, w: 700, f: P.ink2 }) +
    T(146, 140, '3110 kcal', { s: 34, f: P.danger }) +
    box(56, 162, 180, 34, P.okT, 17) + T(146, 184, 'no error at all', { s: 13, f: P.ok }) +
    T(300, 120, '≠', { s: 40, f: P.danger }) +
    `<g transform="rotate(2 460 110)">` + box(326, 24, 250, 184, P.warnT, 8) +
    T(346, 54, 'by hand:', { s: 14, a: 'start', f: P.ink2 }) +
    MEALS.map(([m, k], i) => T(346, 82 + i * 24, m, { s: 13, w: 700, a: 'start', f: P.ink2 }) + T(556, 82 + i * 24, (i ? '+ ' : '') + k, { s: 14, m: true, a: 'end' })).join('') +
    `<line x1="456" y1="168" x2="558" y2="168" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(556, 194, '2600', { s: 18, m: true, a: 'end', f: P.ok }) + `</g>`);
  const idea = [DAY, '', 'total = 0', 'snacks = 0', 'for meal, kcal in day:', '    total = total + kcal', '    if meal == "snack":', '        total = total + kcal', 'print(f"Ana ate {total} kcal today")', 'print(f"Snacks: {snacks} kcal")'];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(idea, { title: 'ana_day.py' })}</div>`;

  /* ---- The code: the method, and a print with = after every step ---- */
  const methodSvg = svg(600, 120, 'The method in five steps. 1 Reproduce: make the wrong answer happen on purpose. 2 Guess where it goes wrong. 3 Look at the values, step by step. 4 Fix the first step that goes wrong. 5 Re-check, with more than one example.',
    [['1', 'reproduce', 'see it go', 'wrong'], ['2', 'guess', 'where,', 'roughly?'], ['3', 'look', 'values, step', 'by step'], ['4', 'fix', 'the first', 'wrong step'], ['5', 're-check', 'more than', 'one day']].map((r, i) => {
      const x = 8 + i * 118, hot = i === 2;
      return box(x, 12, 104, 96, hot ? P.tint : P.white, 12) +
        `<circle cx="${x + 52}" cy="34" r="13" fill="${hot ? P.accent : P.ink}"/>` + T(x + 52, 39, r[0], { s: 13, f: P.white }) +
        T(x + 52, 66, r[1], { s: 13, f: hot ? P.accent : P.ink }) +
        T(x + 52, 84, r[2], { s: 11, w: 700, f: P.ink2 }) + T(x + 52, 99, r[3], { s: 11, w: 700, f: P.ink2 }) +
        (i < 4 ? arrow(x + 106, 60, x + 116, 60, P.ink2, 2) : '');
    }).join(''));
  const tapeSvg = svg(600, 236, 'The values after each step, next to what they should be. After breakfast: total 650, should be 650, right. After lunch: 1470, should be 1470, right. After the snack: 2490, should be 1980, wrong: this is the first step that goes wrong. After dinner: 3110, should be 2600, wrong too, but only because the snack step already was.',
    T(150, 24, 'step', { s: 12.5, f: P.mute }) + T(330, 24, 'total=', { s: 12.5, f: P.mute, m: true }) + T(450, 24, 'should be', { s: 12.5, f: P.mute }) +
    [['breakfast', 650, 650], ['lunch', 1470, 1470], ['snack', 2490, 1980], ['dinner', 3110, 2600]].map(([m, got, want], i) => {
      const y = 36 + i * 44, bad = got !== want, first = i === 2;
      return box(70, y, 470, 34, first ? P.dangerT : P.white, 10) +
        T(150, y + 23, m, { s: 14, f: first ? P.danger : P.ink }) + T(330, y + 23, String(got), { s: 15, m: true, f: bad ? P.danger : P.ink }) +
        T(450, y + 23, String(want), { s: 15, m: true, f: P.ok }) + (bad ? cross(516, y + 17) : tick(516, y + 18));
    }).join('') +
    `<circle cx="36" cy="141" r="24" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="6 5"/>` + T(36, 146, 'here', { s: 12, f: P.danger }) +
    T(305, 228, 'the first wrong value is the clue. Later ones are only copies of it.', { s: 12.5, w: 700, f: P.ink2 }));
  const look = [DAY, '', 'total = 0', 'snacks = 0', 'for meal, kcal in day:', '    total = total + kcal', '    if meal == "snack":', '        total = total + kcal', '    print(f"{meal=} {total=}")', 'print(f"Ana ate {total} kcal today")'];
  const codePic = `<div style="width:100%;min-width:0">${methodSvg}${run(look, { title: 'ana_day.py' })}${tapeSvg}</div>`;

  /* ---- The pain: guessing, and patching the answer ---- */
  const patch = [
    'def day_total(day):',
    '    total = 0',
    '    for meal, kcal in day:',
    '        total = total + kcal',
    '        if meal == "snack":',
    '            total = total + kcal',
    '    return total - 510    # "fixed" it!',
    '',
    'monday = [("breakfast", 650), ("lunch", 820), ("snack", 510), ("dinner", 620)]',
    'tuesday = [("breakfast", 600), ("lunch", 780), ("dinner", 700)]',
    'print(f"Monday: {day_total(monday)} kcal")',
    'print(f"Tuesday: {day_total(tuesday)} kcal")'
  ];
  const painSvg = svg(600, 120, 'Monday, with a snack: 2600, right, by luck. Tuesday, no snack: the program says 1570, but by hand 600 plus 780 plus 700 is 2080. The patch hid one bug and made a new one.',
    box(14, 16, 280, 88, P.okT, 12) + T(154, 46, 'Monday (snack 510)', { s: 14 }) + T(154, 84, '2600', { s: 24, m: true, f: P.ok }) + tick(224, 76) +
    box(306, 16, 280, 88, P.dangerT, 12) + T(446, 46, 'Tuesday (no snack)', { s: 14 }) +
    T(400, 84, '1570', { s: 24, m: true, f: P.danger }) + T(470, 84, 'not', { s: 13, f: P.ink2 }) + T(528, 84, '2080', { s: 24, m: true, f: P.ok }));
  const painPic = `<div style="width:100%;min-width:0">${run(patch, { title: 'patched.py' })}${painSvg}</div>`;

  /* ---- The fix: breakpoint() and pdb, a real session ---- */
  const session = [
    '$ python3 ana_day.py',
    '> /Users/you/kitchen/ana_day.py(6)<module>()',
    '-> breakpoint()',
    '(Pdb) p meal, total',
    "('breakfast', 0)",
    '(Pdb) c',
    '> /Users/you/kitchen/ana_day.py(6)<module>()',
    '-> breakpoint()',
    '(Pdb) p meal, total',
    "('lunch', 650)",
    '(Pdb) c',
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
    '2490',
    '(Pdb) q',
    'Quitting pdb will kill the process. Quit anyway? [y/n] y'
  ];
  const bpFile = code([DAY, '', 'total = 0', 'snacks = 0', 'for meal, kcal in day:', '    breakpoint()', '    total = total + kcal', '    if meal == "snack":', '        total = total + kcal', 'print(f"Ana ate {total} kcal today")', 'print(f"Snacks: {snacks} kcal")'], { title: 'ana_day.py', hi: [6] });
  const cmdSvg = svg(600, 200, 'The six pdb commands you need. p name: print a value. n: next, run this line and stop at the next one. s: step into the function this line calls. c: continue until the next breakpoint. l: list the code around where you are. q: quit.',
    [['p total', 'print a value'], ['n', 'next: run this line, stop again'], ['s', 'step into a function call'], ['c', 'continue to the next stop'], ['l', 'list the lines around here'], ['q', 'quit the debugger']].map((r, i) => {
      const col = i % 2, row = Math.floor(i / 2), x = 12 + col * 296, y = 14 + row * 62;
      return box(x, y, 280, 48, P.white, 10) +
        `<rect x="${x + 10}" y="${y + 10}" width="${r[0].length > 1 ? 82 : 36}" height="28" rx="8" fill="#15132B"/>` +
        T(x + 10 + (r[0].length > 1 ? 41 : 18), y + 29, r[0], { s: 14, m: true, f: '#FFC24B' }) +
        T(x + (r[0].length > 1 ? 102 : 56), y + 29, r[1], { s: 13, w: 700, a: 'start', f: P.ink2 });
    }).join(''));
  const fixPic = `<div style="width:100%;min-width:0">${bpFile}${term(session, 'terminal, Python 3.15')}${cmdSvg}</div>`;

  /* ---- Try it: VS Code's debugger, then fix and re-check ---- */
  const vsLines = ['for meal, kcal in day:', '    total = total + kcal', '    if meal == "snack":', '        total = total + kcal', 'print(f"Ana ate {total} kcal today")'];
  const vsSvg = svg(600, 300, 'A picture of VS Code while debugging. Left, the Run and Debug panel. Under Variables: meal is snack, kcal is 510, total is 1980, snacks is 0. Right, the code. A red dot left of line 8 is a breakpoint. Line 8 is highlighted in yellow with an arrow: Python paused before running it. At the top, the debug toolbar: Continue F5, Step Over F10, Step Into F11, Stop. A note says: press F10 and total becomes 2490.',
    // window
    box(8, 10, 584, 276, P.white, 12) +
    `<rect x="8" y="10" width="584" height="30" rx="12" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="26" cy="25" r="5" fill="#FF6B8B"/><circle cx="42" cy="25" r="5" fill="#FFC24B"/><circle cx="58" cy="25" r="5" fill="#4BD69B"/>` +
    T(300, 30, 'ana_day.py, Visual Studio Code', { s: 12, w: 700, f: P.ink2 }) +
    // activity bar with the Run and Debug icon
    `<rect x="10" y="40" width="34" height="244" fill="${P.paper}"/>` +
    `<rect x="10" y="54" width="34" height="34" fill="${P.tint}"/>` +
    `<path d="M21 62 l14 9 l-14 9 z" fill="${P.accent}"/><circle cx="35" cy="80" r="4" fill="${P.danger}"/>` +
    // side bar: Variables
    `<line x1="44" y1="40" x2="44" y2="284" stroke="${P.ink}" stroke-width="1.5"/>` +
    `<line x1="204" y1="40" x2="204" y2="284" stroke="${P.ink}" stroke-width="1.5"/>` +
    T(54, 60, 'RUN AND DEBUG', { s: 10.5, a: 'start', f: P.mute }) +
    T(54, 86, '⌄ VARIABLES', { s: 11.5, a: 'start' }) +
    T(62, 108, '⌄ Locals', { s: 11.5, w: 700, a: 'start', f: P.ink2 }) +
    [['meal', "'snack'"], ['kcal', '510'], ['total', '1980'], ['snacks', '0']].map((r, i) =>
      (r[0] === 'total' ? `<rect x="58" y="${118 + i * 24}" width="142" height="22" rx="5" fill="${P.warnT}"/>` : '') +
      T(74, 134 + i * 24, r[0] + ':', { s: 12, m: true, a: 'start', f: P.accent }) + T(134, 134 + i * 24, r[1], { s: 12, m: true, a: 'start' })).join('') +
    T(54, 236, '› WATCH', { s: 11.5, a: 'start', f: P.mute }) + T(54, 260, '› CALL STACK', { s: 11.5, a: 'start', f: P.mute }) +
    // debug toolbar
    box(232, 50, 340, 34, P.paper2, 8) +
    [['▶', 'F5', P.ok], ['↷', 'F10', P.accent], ['↓', 'F11', P.accent], ['■', 'stop', P.danger]].map((r, i) => {
      const x = 252 + i * 84;
      return T(x, 73, r[0], { s: 16, f: r[2] }) + T(x + 30, 72, r[1], { s: 11.5, f: P.ink2 });
    }).join('') +
    `<rect x="${252 + 84 - 14}" y="54" width="70" height="26" rx="6" fill="none" stroke="${P.accent}" stroke-width="2.5"/>` +
    // editor
    vsLines.map((l, i) => {
      const n = 5 + i, y = 116 + i * 28, cur = n === 8;
      return (cur ? `<rect x="206" y="${y - 18}" width="384" height="26" fill="#FFF1C9"/>` : '') +
        T(238, y, String(n), { s: 12, m: true, a: 'end', f: P.mute }) +
        (cur ? `<circle cx="216" cy="${y - 5}" r="6.5" fill="#E51400"/><path d="M243 ${y - 11} l8 6 l-8 6 z" fill="${P.warn}"/>` : '') +
        `<text x="256" y="${y}" xml:space="preserve" style="white-space:pre" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="${P.ink}">${l.replace(/"/g, '&quot;')}</text>`;
    }).join('') +
    box(250, 240, 322, 34, P.tint, 17) + T(411, 262, 'press F10: total becomes 2490', { s: 13, f: P.accent }));
  const fixMe = [
    'def day_total(day):',
    '    total = 0',
    '    snacks = 0',
    '    for meal, kcal in day:',
    '        total = total + kcal',
    '        if meal == "snack":',
    '            total = total + kcal',
    '    return total, snacks',
    '',
    'monday = [("breakfast", 650), ("lunch", 820), ("snack", 510), ("dinner", 620)]',
    'tuesday = [("breakfast", 600), ("lunch", 780), ("snack", 240), ("dinner", 700)]',
    'for day in [monday, tuesday]:',
    '    total, snacks = day_total(day)',
    '    print(f"{total=} {snacks=}")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${vsSvg}${run(fixMe, { title: 'fix_and_recheck.py' })}</div>`;

  /* ---- The catch: debug lines left behind, and the rubber duck ---- */
  const leftover = [DAY, '', 'total = 0', 'snacks = 0', 'for meal, kcal in day:', '    total = total + kcal', '    if meal == "snack":', '        snacks = snacks + kcal', '    print(f"{meal=} {total=}")    # debug line, left in by mistake', 'print(f"Ana ate {total} kcal today")', 'print(f"Snacks: {snacks} kcal")'];
  const duckSvg = svg(600, 150, 'A yellow rubber duck on the counter next to the code. A speech bubble from you: then, if the meal is a snack, add kcal to total. Wait. Total already has it.',
    `<ellipse cx="96" cy="128" rx="72" ry="10" fill="${P.sand}"/>` +
    `<path d="M40 104 q-6 -40 40 -42 q8 -34 40 -30 q30 6 24 36 q22 2 26 18 q-4 -2 -14 0 q8 30 -40 40 q-60 6 -76 -22 z" fill="#FFD23F" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M144 64 q20 -2 26 6 q-12 8 -28 4 z" fill="#F28C28" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="128" cy="52" r="5" fill="${P.ink}"/>` +
    `<path d="M66 92 q22 12 44 -4" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    box(210, 18, 376, 112, P.white, 16) + `<path d="M212 92 l-26 14 l28 -2" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(230, 48, '"Then, if the meal is a snack,', { s: 13.5, w: 700, a: 'start', f: P.ink2 }) +
    T(230, 72, 'add kcal to total."', { s: 13.5, w: 700, a: 'start', f: P.ink2 }) +
    T(230, 108, '"Wait. Total already has it."', { s: 15, a: 'start', f: P.accent }));
  const catchPic = `<div style="width:100%;min-width:0">${run(leftover, { title: 'ana_day.py' })}${duckSvg}</div>`;

  COURSE.add({
    id: 'l88', minutes: 15,
    summary: 'The hard bugs are the ones with <b>no error</b>: the program runs and gives the <b>wrong number</b>. Kitchen Coach says Ana ate 3110 kcal, but by hand it is 2600. There is no traceback to read, so <b>do not guess</b>. Use the method: <b>reproduce</b> it, <b>guess</b> roughly where, <b>look at the values step by step</b>, <b>fix</b> the first step that goes wrong, and <b>re-check</b> with more than one example. Three ways to look: a print with an equals sign, <code>print(f"{total=}")</code>, which shows <code>total=1840</code>. <code>breakpoint()</code>, which pauses the program in the <b>pdb</b> debugger, where <code>p</code> prints a value, <code>n</code> runs the next line, <code>s</code> steps into a function, <code>c</code> carries on, <code>l</code> lists the code and <code>q</code> quits. And the <b>VS Code debugger</b>: a red dot left of a line number, F5 to start, the Variables panel, and F10 for one line at a time. Stuck? Explain each line out loud to a <b>rubber duck</b>.',
    video: {
      src: 'videos/l88-debugging.mp4', poster: 'videos/l88-debugging.jpg', length: '1 min 8 s',
      script: [
        'Kitchen Coach adds up Ana\'s day. Breakfast, lunch, a snack, and dinner. It says 3110 calories. But by hand, it should be 2600. No error, no traceback. The program runs fine, and it lies.',
        'So don\'t guess. Walk the recipe one step at a time, and look at the total after every step. A print with an equals sign shows it. So does the debugger. Press n, for next.',
        'Step 1, breakfast. 650. Right. Step 2, lunch. 1470. Right. Step 3, the snack. 2490. That should be 1980. The total jumped too far. Here is the first step that goes wrong.',
        'Look inside. The line under if adds the snack to total, again. It was meant for the snacks jar. Change total to snacks, and run it again. 2600. Correct.',
        'Don\'t guess. Walk the steps, look at the values, and find the first step that goes wrong.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The program runs, and it lies.',
        text: [
          'Kitchen Coach adds up what Ana ate today: breakfast, lunch, a snack and dinner. Press <b>Run</b>. It says <code>Ana ate 3110 kcal today</code>. Ana adds it up by hand: 650 + 820 + 510 + 620 is <b>2600</b>. Someone is wrong, and it is not Ana.',
          'There is <b>no error</b>. No traceback, nothing to read from the bottom up like in lesson 52. Python did exactly what the recipe says. The <b>recipe</b> is wrong. A mistake like this is a <b>bug</b>, and finding it is called <b>debugging</b>.',
          'Lesson 53 warned you: <b>no error does not mean a good answer</b>. A crash at least tells you where it burnt. A wrong number just sits there looking confident. That makes it the hard kind, and this lesson is about how to hunt it.'
        ],
        tip: 'Look at the second line of the output too: <code>Snacks: 0 kcal</code>. Ana had a snack. Two strange values are often two clues to <b>one</b> bug.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Look at the value after every step.',
        text: [
          'Debugging is a method, not a talent. <b>1. Reproduce</b>: make the wrong answer happen on purpose (you just did). <b>2. Guess</b> roughly where it goes wrong. <b>3. Look</b> at the values, step by step. <b>4. Fix</b> the first step that goes wrong. <b>5. Re-check</b>, with more than one example.',
          'The quickest way to look is a print with an <b>equals sign</b>, from lesson 15. <code>print(f"{total=}")</code> prints the name <b>and</b> the value, like <code>total=1840</code>, so you never mix up which number is which. One line at the end of each pass shows the total <b>after every step</b>.',
          'Press <b>Run</b> and hold your hand-worked numbers next to it. After breakfast 650, right. After lunch 1470, right. After the snack <b>2490</b>, but it should be 650 + 820 + 510 = <b>1980</b>. That is the <b>first step that goes wrong</b>. Dinner is wrong too, but only because the snack step already was.',
          'Now look <b>inside</b> the snack step. Copy the print line and paste it as a new line straight under <code>total = total + kcal</code> on line 6, with the same 4 spaces. Run it again: on the snack pass, total is still 1980 after line 6. So the jump happens in the lines under <code>if</code>.'
        ],
        tip: 'Several names fit in one print: <code>print(f"{meal=} {kcal=} {total=}")</code>. Text values show their quotes, like <code>meal=\'snack\'</code>, so you can even spot a sneaky space.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Guessing makes a second bug.',
        text: [
          'Without the method, people <b>guess</b>. They stare at the code, change something at random, and run it again. Or worse, they <b>patch the answer</b>: "it is 510 too high, so take 510 off".',
          'Press <b>Run</b>. Monday now says 2600. Fixed? Look at Tuesday. Ana had no snack, so the real total is 600 + 780 + 700 = <b>2080</b>, but Kitchen Coach says <b>1570</b>. The patch took off a snack that was never there.',
          'The bug is still inside. The patch only hid it on the one day you tested, and added a <b>new</b> bug for every other day. A guess that "works" once is the most dangerous kind.'
        ],
        warn: 'Never fix the final answer. Find the <b>first step</b> where a value goes wrong, and fix that step.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'breakpoint() pauses the recipe.',
        text: [
          'Prints are great, but you have to decide in advance what to print. A <b>debugger</b> lets you pause the program and ask about <b>any</b> value. Python comes with one, called <b>pdb</b>. To use it, write <code>breakpoint()</code> on a line of its own, and run the file on your computer.',
          'Python pauses <b>on that line</b> and shows <code>(Pdb)</code>, waiting for you. The arrow <code>-&gt;</code> shows the line it is on. Type <code>p meal, total</code> and it prints them. Type <code>c</code> (continue) and it runs until it reaches <code>breakpoint()</code> again, on the next meal.',
          'On the snack, type <code>n</code> (next) to run one line at a time. After line 7, <code>p total</code> says 1980. Right. Two more <code>n</code> and line 9 has run: <code>p total</code> says <b>2490</b>. Line 9 is the step that goes wrong: it adds the snack to <code>total</code> a <b>second</b> time, and nothing ever goes into <code>snacks</code>.',
          '<code>s</code> (step) is like <code>n</code>, but when the line calls one of your functions, it goes <b>inside</b> it. <code>l</code> (list) shows the lines around you, and <code>q</code> quits. In Python 3.14 and 3.15, <code>q</code> asks <code>Quit anyway? [y/n]</code>: type <code>y</code>.'
        ],
        tip: 'pdb has many more commands (type <code>help</code> at the <code>(Pdb)</code> prompt), and newer versions colour the code. These six are all you need for a long time.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Fix the step, then re-check.',
        text: [
          '<b>The VS Code debugger</b> does the same with clicks. Open your file and click just <b>left of a line number</b>: a <b>red dot</b> appears. That is a breakpoint, and you do not need to write <code>breakpoint()</code> at all. Press <b>F5</b> (or the <b>Run and Debug</b> icon on the left, the play button with a bug) and pick <b>Python Debugger: Python File</b> the first time it asks. It comes with the Python extension from lesson 2.',
          'With the red dot on the <code>total</code> line under <code>if</code>, the program runs until it reaches that line, and that only happens on the snack. Line 8 turns yellow: Python paused <b>before</b> running it. The <b>Variables</b> panel shows every name and its value, <code>total: 1980</code>. Press <b>F10</b> (Step Over) to run one line: <code>total</code> jumps to 2490. <b>F5</b> carries on, and the red square stops.',
          'Now finish the method in this box. Press <b>Run</b>: Monday says <code>total=3110 snacks=0</code>. Fix the step that goes wrong: the line under <code>if</code> was meant to fill the snacks jar, so change it to <code>snacks = snacks + kcal</code>.',
          'Then <b>re-check</b>. Run it again: <code>total=2600 snacks=510</code> for Monday, and <code>total=2320 snacks=240</code> for Tuesday, which you can check by hand. Two days, both right.'
        ],
        tip: 'The red dot also works in the exercise file. In VS Code, F11 is Step Into, the same as <code>s</code> in pdb.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Clean up, and talk to the duck.',
        text: [
          '<b>Debug lines are scaffolding.</b> Press <b>Run</b>: the bug is fixed, but a forgotten debug print still fills Ana\'s screen with <code>meal=\'breakfast\' total=650</code> and friends. When the bug is found, <b>delete</b> your debug prints and every <code>breakpoint()</code>. A leftover <code>breakpoint()</code> is worse: it freezes the program at <code>(Pdb)</code> for whoever runs it next.',
          '<b>In this page, use prints.</b> The Run boxes here are made for output, so <code>print(f"{x=}")</code> is the tool to use. Keep <code>breakpoint()</code> and the red dots for VS Code and the terminal on your own computer, where pdb and the Variables panel work properly.',
          '<b>When the values all look right and the answer is still wrong</b>, try the <b>rubber duck</b>. Explain the program to a rubber duck (or a plant, or a patient friend), one line at a time, out loud: what each line does, and why. Somewhere in the middle you hear yourself say something the code does not do. Programmers really do keep ducks on their desks for this.'
        ],
        warn: 'Before you call a bug fixed, run the program <b>without</b> any debug lines, on <b>more than one</b> example. Next lesson, 89, Testing with pytest, turns those re-checks into taste tests that run by themselves.'
      }
    ],
    exercises: [
      {
        file: 'l88_find_the_bug.py', title: 'Find the bug',
        task: 'Kitchen Coach adds up Ben\'s protein for the week. By hand it is <b>984 g</b>, but the program says <b>228 g</b>. No error, no traceback, and <b>one</b> bug. Find the first step where a value goes wrong, with <code>print(f"{x=}")</code> lines, <code>breakpoint()</code>, or a red dot in VS Code, then fix only that.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Step 1 prints <code>Ben ate 228 g of protein this week</code>, and the check gives you a hint.',
          'Do not guess. Add <code>print(f"{day=} {total=}")</code> inside a loop, or <code>breakpoint()</code> on a line of its own and step with <code>n</code>, <code>s</code> and <code>p</code>. Or click left of a line number for a red dot and press <b>F5</b>. Find the first value that is wrong.',
          'Fix that one step. Run it until it says <code>PASS</code>, then delete your debug lines and run it once more.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which of these is the hard kind of bug, the one this lesson is about?',
        options: ['The program runs to the end and prints "Ana ate 3110 kcal today", but by hand it is 2600', 'The program stops with NameError: name \'totl\' is not defined', 'Python says SyntaxError: \'(\' was never closed, and runs nothing', 'The program stops with ZeroDivisionError: division by zero'],
        answer: 0,
        why: 'The other three come with a traceback that names the problem and the line (lesson 52). A wrong number with no error gives you nothing to read, so you have to look at the values yourself.',
        hint: 'Which one gives Python nothing to complain about?'
      },
      {
        type: 'type', q: 'What does this print? Type it exactly.',
        pic: run(['total = 1840', 'print(f"{total=}")'], { title: 'peek.py' }),
        prompt: 'output >',
        answers: ['total=1840'],
        accept: '^total=1840$',
        why: 'An equals sign at the end of the blank prints the name, the <code>=</code>, and the value. That is why it is the quickest debug print: you always know which number is which.',
        hint: 'Lesson 15: the = shows the name as well as the value.'
      },
      {
        type: 'pick', q: 'Chloe\'s sugar should be 12, then 30, then 38 after each dessert. Here are the debug prints. Which step is the <b>first</b> to go wrong?',
        pic: term(["dessert='fruit salad' sugar=12", "dessert='brownie' sugar=30", "dessert='flapjack' sugar=56", "dessert='sorbet' sugar=80"], 'output'),
        options: ['The flapjack step', 'The sorbet step', 'The brownie step', 'All of them'],
        answer: 0,
        why: '12 and 30 match. After the flapjack it should be 38, but it is 56: that is the first wrong value. The sorbet total is wrong too, but only because it starts from the wrong 56. Look at the flapjack step.',
        hint: 'Compare each line with the numbers it should be. Stop at the first mismatch.'
      },
      {
        type: 'match', q: 'You are paused at <code>(Pdb)</code>. Match each command to what it does.',
        pairs: [
          ['p total', 'print the value of total'],
          ['n', 'run this line, pause at the next one'],
          ['s', 'go inside the function this line calls'],
          ['c', 'carry on until the next breakpoint'],
          ['q', 'quit the debugger']
        ],
        why: 'p prints, n is next, s steps into, c continues, q quits. With those and <code>l</code> to list the code, you can walk any program one step at a time.',
        hint: 'Each command is the first letter of a word: print, next, step, continue, quit.'
      },
      {
        type: 'order', q: 'Put the debugging method in order.',
        items: ['Make the wrong answer happen on purpose', 'Guess roughly where it goes wrong', 'Look at the values step by step', 'Fix the first step that goes wrong', 'Re-check with more than one example'],
        why: 'Reproduce, guess, look, fix, re-check. Looking comes before fixing, and the re-check uses a second example so a lucky patch cannot fool you.',
        hint: 'You cannot look at the values of a bug you cannot make happen.'
      },
      {
        type: 'fix', q: 'Chloe\'s desserts this week have 12 + 18 + 8 + 24 = <b>62 g</b> of sugar, but the program says 24. Find the step that goes wrong (a <code>print(f"{sugar=}")</code> inside the loop helps), and fix it so it prints <code>Sugar this week: 62 g</code>.',
        code: ['desserts = [12, 18, 8, 24]', '', 'for grams in desserts:', '    sugar = 0', '    sugar = sugar + grams', 'print(f"Sugar this week: {sugar} g")'],
        title: 'sugar.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines and lines[-1] == "Sugar this week: 62 g" and len(lines) == 1:',
          '    ok = True',
          'elif lines and lines[-1] == "Sugar this week: 62 g":',
          '    msg = "62 g, well done. Now delete your debug print so only the total is shown."',
          'elif "sugar=" in out:',
          '    msg = "Read your prints: where does sugar go back to 0? Which line does that, and how often does it run?"',
          'else:',
          '    msg = "The output should be one line: Sugar this week: 62 g"'
        ].join('\n'),
        why: '<code>sugar = 0</code> is inside the loop, so it runs on <b>every</b> pass and throws away what was added before. Only the last dessert, 24, survives. Move it above the <code>for</code> line, with no spaces in front, so it runs once.',
        hint: 'Print sugar at the top of the loop. What happens to it each time a new dessert starts?'
      },
      {
        type: 'bucket', q: 'Back to lesson 52. Which of these give you a <b>traceback</b> to read, and which only give a wrong answer?',
        buckets: ['Traceback', 'No error, wrong answer'],
        items: [
          ['int("two")', 0],
          ['kcal["supper"] with no "supper" key', 0],
          ['adding the snack to the total twice', 1],
          ['sugar = 0 inside the loop, not above it', 1],
          ['print(total / 0)', 0]
        ],
        why: 'ValueError, KeyError and ZeroDivisionError stop the program with a traceback: read it from the bottom up, as lesson 52 taught. Adding twice or resetting a total are perfectly good Python, so nothing complains. Those need prints or the debugger.',
        hint: 'Would Python itself notice something is wrong, or only you?'
      },
      {
        type: 'pick', q: 'In VS Code you click left of line 8 and press F5. What happens?',
        pic: code([DAY, '', 'total = 0', 'snacks = 0', 'for meal, kcal in day:', '    total = total + kcal', '    if meal == "snack":', '        total = total + kcal', 'print(f"Ana ate {total} kcal today")'], { title: 'ana_day.py', bad: [8] }),
        options: ['The program runs until it is about to run line 8, on the snack, and pauses. The Variables panel shows total: 1980', 'Line 8 is deleted, because the red dot marks a mistake', 'The program pauses on line 8 after it has run, showing total: 2490', 'The program pauses four times on line 8, once for every meal'],
        answer: 0,
        why: 'A red dot is a breakpoint: Python pauses <b>before</b> running that line. Line 8 only runs when the meal is a snack, so it pauses once, with total still 1980. Press F10 to run the line and watch it become 2490.',
        hint: 'Does line 8 run for breakfast? And does the debugger pause before or after a line?'
      }
    ]
  });
})();
