/* Lesson 52: Exceptions (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow, esc } = PR;

  /* =====================================================================
     l52  Exceptions
     ===================================================================== */

  // One line of monospace text that keeps its leading spaces, so ^ marks line up under the code.
  const mono = (x, y, s, fill, size, weight) =>
    `<text x="${x}" y="${y}" xml:space="preserve" style="white-space:pre" font-family="JetBrains Mono, monospace" font-size="${size || 12}" font-weight="${weight || 500}" fill="${fill || '#CFCBF5'}">${esc(s)}</text>`;
  const num = (x, y, n, col) =>
    `<circle cx="${x}" cy="${y}" r="12" fill="${col || P.ink}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 4.5, String(n), { s: 12.5, f: P.white });
  const pill = (x, y, w, label, fill, col) =>
    `<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${fill}" stroke="${col || P.ink}" stroke-width="2"/>` + T(x + w / 2, y + 18, label, { s: 12, f: col || P.ink });
  // A little pan with smoke rising from it.
  const pan = (x, y) =>
    `<path d="M${x + 8} ${y - 8} q-6 -9 0 -18 q6 -9 0 -18 M${x + 22} ${y - 8} q-6 -9 0 -18 q6 -9 0 -18" fill="none" stroke="${P.mute}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M${x - 6} ${y} h40 l-4 14 q-1 4 -5 4 h-22 q-4 0 -5 -4 z" fill="${P.ink}"/><rect x="${x + 32}" y="${y + 3}" width="18" height="5" rx="2.5" fill="${P.ink}"/>`;

  /* ---------- The idea: one evening, three burnt dishes ---------- */
  const crashes = [
    ['8:02 pm', 'Ana types her servings: "two"', 'servings = int("two")', 'ValueError', "invalid literal for int() with base 10: 'two'"],
    ['8:15 pm', 'Nobody has said yes yet: 0 guests', 'share = 2400 / guests', 'ZeroDivisionError', 'division by zero'],
    ['8:40 pm', 'Ben asks for quinoa', 'grams = protein["quinoa"]', 'KeyError', "'quinoa'"]
  ];
  const ideaPic = svg(600, 348, 'Three cards, one Friday evening. 8:02 pm: Ana types her servings as the word two, and int("two") stops with ValueError. 8:15 pm: 2400 / guests with 0 guests stops with ZeroDivisionError: division by zero. 8:40 pm: Ben asks for quinoa, and protein["quinoa"] stops with KeyError: quinoa.',
    crashes.map(([time, what, line, kind, msg], i) => {
      const y = 10 + i * 112;
      const w = kind.length * 7.6 + 22;
      return box(14, y, 566, 98, P.white, 14) +
        pan(36, y + 40) +
        T(100, y + 24, time, { s: 12, a: 'start', f: P.mute }) +
        T(160, y + 24, what, { s: 13, a: 'start' }) +
        `<rect x="100" y="${y + 34}" width="462" height="26" rx="6" fill="#15132B"/>` + mono(110, y + 52, line, '#ECEAFF', 12.5) +
        pill(100, y + 66, w, kind, P.dangerT, P.danger) +
        mono(100 + w + 10, y + 84, msg, P.danger, 11.5, 700);
    }).join(''));

  /* ---------- The code: two cards, one trail ---------- */
  const dinner = [
    'def kcal_per_guest(total_kcal, guests):',
    '    return total_kcal / guests',
    '',
    'def plan_dinner(guests):',
    '    share = kcal_per_guest(2400, guests)',
    '    print(f"Each guest: {share} kcal")',
    '',
    'plan_dinner(3)',
    'plan_dinner(0)'
  ];
  const dinnerTb = [
    '$ python3 dinner.py',
    'Each guest: 800.0 kcal',
    'Traceback (most recent call last):',
    '  File "dinner.py", line 9, in <module>',
    '    plan_dinner(0)',
    '    ~~~~~~~~~~~^^^',
    '  File "dinner.py", line 5, in plan_dinner',
    '    share = kcal_per_guest(2400, guests)',
    '  File "dinner.py", line 2, in kcal_per_guest',
    '    return total_kcal / guests',
    '           ~~~~~~~~~~~^~~~~~~~',
    'ZeroDivisionError: division by zero'
  ];
  const trail = [
    ['line 9, in <module>', 'plan_dinner(0)', 'the trail starts: the main recipe calls plan_dinner', P.white],
    ['line 5, in plan_dinner', 'kcal_per_guest(2400, guests)', 'plan_dinner calls kcal_per_guest', P.white],
    ['line 2, in kcal_per_guest', 'total_kcal / guests', 'it burnt here: the most recent call', P.dangerT]
  ];
  const trailPic = svg(600, 300, 'The traceback as a trail of three recipe cards, top to bottom. Line 9, the main recipe, calls plan_dinner. Line 5, inside plan_dinner, calls kcal_per_guest. Line 2, inside kcal_per_guest, is where it burnt: the most recent call, printed last.',
    trail.map(([where, line, say, fill], i) => {
      const y = 12 + i * 92;
      return box(70 + i * 22, y, 430 - i * 22, 70, fill, 12) +
        T(86 + i * 22, y + 24, where, { s: 13.5, m: true, a: 'start', f: i === 2 ? P.danger : P.ink }) +
        T(86 + i * 22, y + 44, line, { s: 12.5, m: true, a: 'start', f: P.accent }) +
        T(86 + i * 22, y + 62, say, { s: 11.5, w: 700, a: 'start', f: P.ink2 }) +
        (i < 2 ? arrow(110 + i * 22, y + 74, 110 + i * 22 + 22, y + 90, P.ink, 2.5) + T(146 + i * 22, y + 88, 'calls', { s: 11.5, a: 'start', f: P.mute }) : '');
    }).join('') +
    arrow(40, 30, 40, 220, P.accent, 3) +
    T(40, 248, 'older', { s: 11.5, f: P.accent }) +
    T(552, 216, 'most', { s: 12, f: P.danger }) + T(552, 232, 'recent', { s: 12, f: P.danger }) + T(552, 248, 'call last', { s: 12, f: P.danger }) +
    T(300, 292, 'Python prints the trail from the first call down to the one that burnt.', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(dinner, { title: 'dinner.py' })}${term(dinnerTb, 'terminal, Python 3.15')}${trailPic}</div>`;

  /* ---------- The pain: reading only the top ---------- */
  const report = [
    'protein = {"tofu": 17, "lentils": 9, "eggs": 13}   # grams in 100 g',
    '',
    'def protein_of(food):',
    '    return protein[food]',
    '',
    'def plate_protein(plate):',
    '    total = 0',
    '    for food in plate:',
    '        total += protein_of(food)',
    '    return total',
    '',
    'def dinner_report():',
    '    print("Ana:", plate_protein(["eggs", "lentils"]), "g")',
    '    print("Ben:", plate_protein(["tofu", "quinoa"]), "g")',
    '',
    'dinner_report()'
  ];
  const reportTb = [
    '$ python3 report.py',
    'Ana: 22 g',
    'Traceback (most recent call last):',
    '  File "report.py", line 16, in <module>',
    '    dinner_report()',
    '    ~~~~~~~~~~~~~^^',
    '  File "report.py", line 14, in dinner_report',
    '    print("Ben:", plate_protein(["tofu", "quinoa"]), "g")',
    '                  ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^',
    '  File "report.py", line 9, in plate_protein',
    '    total += protein_of(food)',
    '             ~~~~~~~~~~^^^^^^',
    '  File "report.py", line 4, in protein_of',
    '    return protein[food]',
    '           ~~~~~~~^^^^^^',
    "KeyError: 'quinoa'"
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    term(reportTb, 'terminal, Python 3.15') +
    svg(600, 120, 'Reading from the top, like a book, you land on line 16, dinner_report(). It looks fine, and the note has not told you what is wrong yet. The answer is waiting at the bottom.',
      box(16, 12, 270, 92, P.dangerT, 14) +
      T(151, 40, 'read from the top', { s: 14, f: P.danger }) +
      T(151, 64, 'line 16: dinner_report()', { s: 12.5, m: true, f: P.ink }) +
      T(151, 88, 'looks fine...?', { s: 12.5, w: 700, f: P.ink2 }) +
      box(314, 12, 270, 92, P.okT, 14) +
      T(449, 40, 'read from the bottom', { s: 14, f: P.ok }) +
      T(449, 64, "KeyError: 'quinoa'", { s: 12.5, m: true, f: P.ink }) +
      T(449, 88, 'no quinoa jar, line 4', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  /* ---------- The fix: 1, 2, 3 from the bottom ---------- */
  const readTb = ['  File "report.py", line 16, in <module>', '    dinner_report()', '  File "report.py", line 14, in dinner_report', '    print("Ben:", plate_protein(["tofu", "quinoa"]), "g")', '  File "report.py", line 9, in plate_protein', '    total += protein_of(food)', '  File "report.py", line 4, in protein_of', '    return protein[food]', "KeyError: 'quinoa'"];
  const readPic = svg(600, 330, 'The same traceback, read in three steps from the bottom. 1: the last line, KeyError quinoa, says what burnt. 2: the File line just above it, line 4 in protein_of, says where it burnt. 3: walk up: line 9 in plate_protein called it, and line 14 in dinner_report passed the plate with quinoa on it.',
    `<rect x="54" y="8" width="532" height="262" rx="14" fill="#15132B" stroke="${P.ink}" stroke-width="2.5"/>` +
    readTb.map((l, i) => mono(66, 36 + i * 28, l, i === 8 ? '#FFC24B' : l.startsWith('  File') ? '#CFCBF5' : '#ECEAFF', 11, i === 8 || i === 6 ? 700 : 500)).join('') +
    num(30, 260, 1, P.danger) + num(30, 204, 2, P.danger) + num(30, 148, 3) + num(30, 92, 3) +
    arrow(30, 242, 30, 220, P.danger, 2.5) + arrow(30, 186, 30, 164, P.ink, 2.5) + arrow(30, 130, 30, 108, P.ink, 2.5) +
    T(300, 294, '1 what burnt   2 where it burnt   3 who sent it there', { s: 13, f: P.accent }) +
    T(300, 318, 'the bottom names it, walking up explains it', { s: 12, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${readPic}${run(report, { title: 'report.py' })}</div>`;

  /* ---------- Try it: the family, and make each one burn ---------- */
  const fam = [
    ['ValueError', 'right kind, wrong value: int("two")', 0],
    ['TypeError', 'wrong kind: None + 450', 0],
    ['KeyError', 'no such key in a dict', 1],
    ['IndexError', 'no item at that position', 1],
    ['ZeroDivisionError', 'divide by 0', 2],
    ['FileNotFoundError', 'no such file (lesson 55)', 3]
  ];
  const groups = ['', 'LookupError', 'ArithmeticError', 'OSError'];
  const famPic = svg(600, 350, 'A family tree. At the top, Exception. Under it: ValueError, TypeError, then LookupError with its children KeyError and IndexError, ArithmeticError with ZeroDivisionError, and OSError with FileNotFoundError, which comes in lesson 55. Every one of them is an Exception.',
    box(220, 10, 160, 40, P.tint, 12) + T(300, 36, 'Exception', { s: 16, m: true, f: P.accent }) +
    `<path d="M60 50 V 320" stroke="${P.ink}" stroke-width="2.5"/>` + `<path d="M300 50 V 60 H 60" fill="none" stroke="${P.ink}" stroke-width="2.5"/>` +
    fam.map(([name, say, g], i) => {
      const y = 70 + i * 44, x = g ? 210 : 84;
      return (g ? '' : `<path d="M60 ${y + 16} H 84" stroke="${P.ink}" stroke-width="2.5"/>`) +
        box(x, y, g ? 166 : 166, 32, i === 4 ? P.dangerT : P.white, 9) +
        T(x + 10, y + 21, name, { s: 12.5, m: true, a: 'start', f: i === 4 ? P.danger : P.ink }) +
        T(x + 178, y + 21, say, { s: 11.5, w: 700, a: 'start', f: P.ink2 });
    }).join('') +
    [[1, 158, 2], [2, 246, 1], [3, 290, 1]].map(([g, y, n]) => {
      const first = 70 + fam.findIndex(f => f[2] === g) * 44 + 16;
      return `<path d="M60 ${first} H 84" stroke="${P.ink}" stroke-width="2.5"/>` +
        T(88, first + 4, groups[g], { s: 11, m: true, a: 'start', f: P.mute }) +
        `<path d="M186 ${first} H 210 ${n === 2 ? `M186 ${first} V ${first + 44} H 210` : ''}" fill="none" stroke="${P.ink}" stroke-width="2"/>`;
    }).join('') +
    T(300, 340, 'All of them are Exceptions. So are NameError and SyntaxError.', { s: 12.5, w: 700, f: P.ink2 }));
  const burn = [
    'protein = {"tofu": 17, "lentils": 9}',
    'runs_km = [5, 8, 12]',
    'guests = 0',
    '',
    'dish = 1   # change to 2, 3, 4 or 5, then press Run',
    '',
    'print("Cooking dish", dish)',
    'if dish == 1:',
    '    servings = int("two")',
    'elif dish == 2:',
    '    share = 2400 / guests',
    'elif dish == 3:',
    '    grams = protein["quinoa"]',
    'elif dish == 4:',
    '    longest = runs_km[3]',
    'elif dish == 5:',
    '    total = None + 450',
    'print("No smoke. Dish", dish, "is fine.")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${famPic}${run(burn, { title: 'burn.py' })}</div>`;

  /* ---------- The catch: SyntaxError burns before cooking ---------- */
  const syn = ['print("Kitchen open")', '', 'def plan_dinner(guests)', '    return 2400 / guests', '', 'print("Dinner planned")'];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(syn, { title: 'plan.py', bad: [3] }) +
    term(['$ python3 plan.py', '  File "plan.py", line 3', '    def plan_dinner(guests)', '                           ^', "SyntaxError: expected ':'"], 'terminal, Python 3.15: not even line 1 ran') +
    svg(600, 96, 'An exception stops the recipe while cooking, so the lines above it have already run. A SyntaxError stops Python before cooking starts: it cannot read the recipe, so nothing runs at all, and there is no Traceback heading and no trail.',
      box(16, 10, 270, 74, P.warnT, 12) + T(151, 36, 'exception', { s: 14 }) + T(151, 60, 'while cooking: lines above ran', { s: 12, w: 700, f: P.ink2 }) +
      box(314, 10, 270, 74, P.dangerT, 12) + T(449, 36, 'SyntaxError', { s: 14, m: true, f: P.danger }) + T(449, 60, 'before cooking: nothing ran', { s: 12, w: 700, f: P.ink2 })) +
    `</div>`;

  COURSE.add({
    id: 'l52', minutes: 12,
    summary: 'An <b>exception</b> is Python stopping in the middle of cooking and telling you what burnt. Every exception has a <b>type</b>, a named kind of problem like <code>ValueError</code>, <code>ZeroDivisionError</code> or <code>KeyError</code>, and a <b>message</b>. The <b>traceback</b> is the trail of calls that led there, oldest at the top, <b>most recent call last</b>. Read it from the bottom: (1) the last line names the problem, (2) the File line just above it says where it burnt, (3) walk up to see which card called which, and where the bad value came from. A <code>SyntaxError</code> is different: Python cannot read the recipe, so nothing runs at all.',
    video: {
      src: 'videos/l52-exceptions.mp4', poster: 'videos/l52-exceptions.jpg', length: '1 min 12 s',
      script: [
        'Kitchen Coach plans Friday dinner for 3 friends. Then the pan starts to smoke.',
        'Ana typed her servings as a word. Two. Python cannot turn that into a number, so it stops. Value error.',
        'The calories are split between 0 guests. Zero division error. Ben asks for quinoa, and the rack has no such key. Key error.',
        'Each one is an exception. Python stops, and tells you what burnt, in a traceback. Most people read it from the top, and stare at a line that looks fine.',
        'Read it from the bottom. 1. The last line names the problem. Division by zero. 2. Just above it, the line where it burnt. Line 2, in kcal per guest. 3. Walk up. Line 5 called it, and line 9 sent 0 guests.',
        'Exceptions have named types, all one family. Value error, type error, key error, index error. All exceptions.',
        'When it burns, read the last line first. It names the problem and points to the line.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Python stops and tells you what burnt.',
        text: [
          'Friday night. Kitchen Coach is planning dinner, and three dishes burn in one evening. Ana types her servings as the word <code>"two"</code>. Later the calories are shared between <b>0 guests</b>. Then Ben asks for <b>quinoa</b>, and the spice rack has no such jar.',
          'Each time, Python cannot do the step, so it <b>stops</b> right there. This kind of stop, in the middle of cooking, is called an <b>exception</b>: something out of the ordinary happened, and the normal recipe cannot go on. Python says it <b>raises</b> an exception.',
          'You have met these notes since lesson 4. Every exception has two parts on its last line: a <b>type</b>, the named kind of problem, like <code>ValueError</code>, and after the colon a <b>message</b> with the details, like <code>\'two\'</code>.'
        ],
        tip: 'A <code>ValueError</code> means the value has the right kind but makes no sense: <code>int()</code> takes text, but it cannot read the word "two" as a number (lesson 13). "Base 10" just means normal counting.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A trail of recipe cards.',
        text: [
          'Real programs have cards that call other cards. Here line 9 calls <code>plan_dinner(0)</code>. Inside it, line 5 calls <code>kcal_per_guest(2400, 0)</code>. Inside that, line 2 divides by 0, and Python stops. Press <b>Run</b>. Line 8 still works: <code>Each guest: 800.0 kcal</code>.',
          'Now the traceback is longer than in lesson 4. Each <code>File ... line N, in name</code> line is one step on the trail, with the code of that line under it. <code>in &lt;module&gt;</code> means the main recipe, outside every card. <code>in plan_dinner</code> means inside that card.',
          'The heading says <b>most recent call last</b>. Python prints the trail from the first call at the top, down to the call that was cooking when it burnt, at the bottom. The bottom is the newest. That is why you read it <b>from the bottom up</b>.'
        ],
        tip: 'On your computer a File line shows the whole path, like <code>File "/Users/you/kitchen/dinner.py", line 2</code>. Only the end matters: the file name and the line number. Lesson 50 called this pile of calls the <b>call stack</b>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Reading from the top, like a book.',
        text: [
          'Kitchen Coach prints a protein report. Ana\'s line works. Then Python stops with a long traceback, four steps deep.',
          'Most people read it like a book, from the top. The first File line says <b>line 16</b>: <code>dinner_report()</code>. You look at line 16. It looks fine. You check the brackets, the spelling, then you start changing things at random.',
          'The top is where the trail <b>started</b>, not where it burnt. It cannot tell you what is wrong, because the note has not said that yet. The answer is at the bottom.'
        ],
        warn: 'A long traceback is not a bigger problem. It is the same one burnt dish, with a longer trail of who called whom. One problem, one last line.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Last line, the line above it, then walk up.',
        text: [
          '1. <b>Read the last line.</b> <code>KeyError: \'quinoa\'</code>. A KeyError means a dict has no such key (lesson 37). Now you know what you are looking for.',
          '2. <b>Read the File line just above it.</b> <code>line 4, in protein_of</code>: <code>return protein[food]</code>. That is where it burnt. The line is correct. The food is the problem.',
          '3. <b>Walk up the trail.</b> Line 9 in <code>plate_protein</code> called it with each food. Line 14 in <code>dinner_report</code> sent Ben\'s plate, with <code>"quinoa"</code> on it. Now you know <b>why</b>: the rack has no quinoa jar.',
          'Press <b>Run</b> and read it yourself. Then fix it where the cause is: add <code>"quinoa": 4</code> to the dict on line 1 (cooked quinoa has about 4 g of protein in 100 g). Run again: <code>Ben: 21 g</code>.'
        ],
        tip: 'The bottom tells you <b>what</b> burnt and <b>where</b>. Walking up tells you <b>who sent the bad ingredient</b>. The fix is often higher up the trail than the line that burnt.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'One family, many names.',
        text: [
          'Exception types are a family. They are all <code>Exception</code>s, and some have a middle name: <code>KeyError</code> and <code>IndexError</code> are both a <code>LookupError</code>, looking for something that is not there. You will use the family in the next two lessons.',
          'Now burn some dishes on purpose. Before each run, say out loud which type you expect. Press <b>Run</b> for dish 1, then change <code>dish = 1</code> to 2, 3, 4 and 5.',
          'Notice the first line, <code>Cooking dish ...</code>, always prints. Python cooked up to the line that burnt. The last line, <code>No smoke...</code>, never prints for dishes 1 to 5. Try <code>dish = 6</code>: no branch matches, so nothing burns.'
        ],
        tip: 'Each type is a clue to the fix. <code>KeyError</code>: check the spelling of the key. <code>IndexError</code>: the list is shorter than you think. <code>ZeroDivisionError</code>: where did the 0 come from? <code>TypeError</code> with <code>NoneType</code>: did a card forget <code>return</code>?'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A SyntaxError burns before cooking.',
        text: [
          'One error is different. On line 3 the colon after <code>def plan_dinner(guests)</code> is missing. Python reads the whole file before it cooks (lesson 4), and it cannot read this one. So <b>nothing runs</b>, not even <code>print("Kitchen open")</code> on line 1.',
          'Look at the note: no <code>Traceback (most recent call last):</code> heading and no trail of cards, because no card was ever called. Just the file, the line, a <code>^</code>, and <code>SyntaxError: expected \':\'</code>. Read it the same way, from the bottom.',
          'Everything else in this lesson happened <b>while cooking</b>. Those are the exceptions a program can plan for. Next, in lesson 53, try and except, you catch one before it hits the floor.'
        ],
        warn: 'Do not just make the error go away. An exception is information. Read what burnt and why before you change anything.'
      }
    ],
    exercises: [
      {
        file: 'l52_read_the_smoke.py', title: 'Read the smoke',
        task: 'Four of Kitchen Coach\'s dishes burn, one at a time. You do not fix them. You <b>read</b> them: for each one, write the exception <b>type</b> and the <b>line number where it burnt</b> into jars like <code>type_1 = "ValueError"</code> and <code>line_1 = 12</code>. Each run shows the smoke of the next dish you have not solved.',
        steps: [
          'Press <b>Open in VS Code</b>, then run the file with the Run button at the top right. Dish 1 starts to smoke.',
          'Read the last line: the word before the colon is the type. Then read the lowest <code>File ..., line N</code>: that N is the line.',
          'Write both between <code>START</code> and <code>END</code>, save, and run again. Dish 3 has a long trail. Read it from the bottom.',
          'Four dishes, then <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Ana runs 3 days a week. Which line of <code>shop.py</code> did it burn on?',
        pic: term(['$ python3 shop.py', 'Traceback (most recent call last):', '  File "shop.py", line 11, in <module>', '    print(weekend_plan())', '          ~~~~~~~~~~~~^^', '  File "shop.py", line 8, in weekend_plan', '    sunday = run_on(3)', '  File "shop.py", line 4, in run_on', '    return runs_km[day]', '           ~~~~~~~^^^^^', 'IndexError: list index out of range'], 'terminal'),
        options: ['Line 4, in run_on', 'Line 11, in <module>', 'Line 8, in weekend_plan', 'The first line of the file'],
        answer: 0,
        why: 'The lowest File line, just above the last line, says where it burnt: line 4, <code>return runs_km[day]</code>. Walk up and you find why: line 8 asked for position 3, and a list of 3 runs only has positions 0, 1 and 2.',
        hint: 'Most recent call last. Which File line is lowest?'
      },
      {
        type: 'match', q: 'Each line burns on its own. Match it to the exception it raises.',
        pairs: [
          ['ValueError', '<code>int("two")</code>'],
          ['ZeroDivisionError', '<code>2400 / 0</code>'],
          ['KeyError', '<code>protein["quinoa"]</code> when the dict has no quinoa'],
          ['IndexError', '<code>runs_km[3]</code> when the list has 3 items'],
          ['TypeError', '<code>None + 450</code>']
        ],
        why: 'A word that is not a number is a bad value. Nobody can share by 0. A dict needs the key. A list needs the position. And None is the wrong kind of thing to add to a number.',
        hint: 'Run burn.py in Try it and change the dish number to see each one.'
      },
      {
        type: 'pick', q: 'The traceback heading says <code>Traceback (most recent call last):</code>. What does that tell you?',
        options: ['The call that was cooking when it burnt is printed at the bottom', 'The last line of your file has the problem', 'Python shows only the most recent error you made today', 'The first call is printed at the bottom'],
        answer: 0,
        why: 'The trail goes from the first call at the top down to the newest one at the bottom, the card that was on the stove when it burnt. So the bottom is where you start reading.',
        hint: 'Most recent comes last. Where is last in a printed note?'
      },
      {
        type: 'order', q: 'Here are the lines of the dinner.py traceback, without the code lines. Put them in the order you should <b>read</b> them.',
        items: ['ZeroDivisionError: division by zero', 'File "dinner.py", line 2, in kcal_per_guest', 'File "dinner.py", line 5, in plan_dinner', 'File "dinner.py", line 9, in <module>'],
        why: 'Last line first: what burnt. Then the File line just above it: where it burnt. Then walk up: who called it, and who called that.',
        hint: 'Start at the bottom of the note and climb.'
      },
      {
        type: 'fix', q: 'Ben\'s plate burns with a <code>KeyError</code>. Read the traceback, walk up, and fix the cause so it prints <code>Ben\'s plate: 21 g</code>. Do not change the dict or the cards.',
        code: ['protein = {"tofu": 17, "lentils": 9, "quinoa": 4}', '', 'def protein_of(food):', '    return protein[food]', '', 'def plate_protein(plate):', '    total = 0', '    for food in plate:', '        total += protein_of(food)', '    return total', '', 'print("Ben\'s plate:", plate_protein(["tofu", "Quinoa"]), "g")'],
        title: 'plate.py',
        check: [
          'p = globals().get("protein")',
          'if p != {"tofu": 17, "lentils": 9, "quinoa": 4}:',
          '    msg = "Leave the dict as it was. The problem is the food that was sent in."',
          'elif out.strip() != "Ben\'s plate: 21 g":',
          '    msg = "It printed: " + out.strip()',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The last line says <code>KeyError: \'Quinoa\'</code> with a capital Q. It burnt on line 4, but walking up to line 12 shows who sent it: the plate. Keys must match exactly, so <code>"Quinoa"</code> becomes <code>"quinoa"</code>. 17 + 4 is 21.',
        hint: 'Compare the key in the last line with the keys in the dict, letter by letter. Which line sent it?'
      },
      {
        type: 'pick', q: 'Back to lesson 45. Read the smoke. What went wrong?',
        pic: code(['def protein_in(grams, per_100g):', '    print(grams * per_100g / 100)', '', 'total = protein_in(150, 17) + protein_in(200, 9)'], { title: 'lunch.py' }) +
          term(['$ python3 lunch.py', '25.5', '18.0', 'Traceback (most recent call last):', '  File "lunch.py", line 4, in <module>', '    total = protein_in(150, 17) + protein_in(200, 9)', '            ~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~', "TypeError: unsupported operand type(s) for +: 'NoneType' and 'NoneType'"], 'terminal'),
        options: ['The card prints instead of returning, so each call hands back None, and None + None fails', 'Python cannot add 25.5 and 18.0', 'protein_in needs a third argument', 'Line 4 has a typo in the word total'],
        answer: 0,
        why: 'The last line names a <code>TypeError</code>: both sides of <code>+</code> are <code>NoneType</code>. A card with no <code>return</code> hands back None (lesson 45). The numbers on the screen were only printed. Fix the card with <code>return grams * per_100g / 100</code>.',
        hint: 'NoneType is the type of None. Which card hands back None?'
      },
      {
        type: 'pick', q: 'What does this program print before Python stops?',
        pic: code(['print("Kitchen open")', 'servings = int("two")', 'print("Servings:", servings)', 'if servings > 2', '    print("Big pot")'], { title: 'pot.py' }),
        options: ['Nothing at all, it stops with a SyntaxError', 'Kitchen open, then a ValueError', 'Kitchen open and Servings: two', 'Kitchen open, then a TypeError'],
        answer: 0,
        why: 'Line 4 is missing its colon. Python reads the whole file before cooking, finds the SyntaxError, and runs nothing. The <code>ValueError</code> on line 2 would come later, only after you fix line 4.',
        hint: 'Is every line of this recipe written correctly? Python checks that before it cooks.'
      },
      {
        type: 'type', q: 'Type the name of the exception that <code>int("two")</code> raises, exactly as Python spells it.',
        prompt: 'type >',
        answers: ['ValueError'],
        why: '<code>ValueError: invalid literal for int() with base 10: \'two\'</code>. The text is the right kind for <code>int()</code>, but its value cannot be read as a number.',
        hint: 'Two words joined, each with a capital letter. The first is about the value.'
      }
    ]
  });
})();
