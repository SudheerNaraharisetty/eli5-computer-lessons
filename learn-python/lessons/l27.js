/* Lesson 27: range (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l27  range
     ===================================================================== */

  // One numbered cell on a counting strip. kind: 'on' | 'stop' | 'miss'
  const cell = (x, y, w, label, kind) => {
    if (kind === 'stop' || kind === 'miss') {
      const col = kind === 'miss' ? P.danger : P.mute;
      return `<rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${kind === 'miss' ? P.dangerT : P.paper2}" stroke="${col}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
        T(x + w / 2, y + 29, label, { s: 15, m: true, f: col });
    }
    return `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="44" rx="10" fill="${P.ink}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(x + w / 2, y + 29, label, { s: 16, m: true, f: P.accent });
  };

  const ideaPic = svg(600, 300, 'range(20) hands out 20 numbers, 0 to 19, in two rows of ten. A dashed cell for 20 sits after them: 20 is the stop, and it is never handed out.',
    box(20, 14, 560, 54, P.warnT, 14) +
    T(40, 48, 'Risotto: stir 20 times', { s: 17, a: 'start' }) +
    T(560, 48, 'range(20)', { s: 17, m: true, a: 'end', f: P.accent }) +
    Array.from({ length: 20 }, (_, i) => cell(30 + (i % 10) * 54, 90 + Math.floor(i / 10) * 62, 44, String(i), 'on')).join('') +
    cell(30, 214, 44, '20', 'stop') +
    T(90, 242, 'the stop: never handed out', { s: 14, w: 700, f: P.ink2, a: 'start' }) +
    T(300, 290, '0, 1, 2 ... 19 is twenty stirs', { s: 14, f: P.ink }));

  const stir = [
    '# Stir the risotto 20 times',
    'for stir in range(20):',
    '    print(f"Stir {stir}")',
    'print("Done stirring")'
  ];
  const knead = ['for _ in range(3):', '    print("knead")'];
  const codePic = `<div style="width:100%;min-width:0">${run(stir, { title: 'risotto.py' })}` +
    code(knead, { title: 'bread.py', hi: [1] }) + term(['$ python3 bread.py', 'knead', 'knead', 'knead'], 'terminal') + `</div>`;

  // Ana's week as a calendar strip. upTo: last day shown. missSun: draw Sunday as missing.
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const week = (y, missSun) => DAYS.map((d, i) => {
    const x = 26 + i * 80;
    const miss = missSun && i === 6;
    return (miss
      ? `<rect x="${x}" y="${y}" width="68" height="74" rx="12" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>`
      : `<rect x="${x + 3}" y="${y + 4}" width="68" height="74" rx="12" fill="${P.ink}"/><rect x="${x}" y="${y}" width="68" height="74" rx="12" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>`) +
      T(x + 34, y + 26, d, { s: 13, f: miss ? P.danger : P.ink2 }) +
      T(x + 34, y + 60, String(i + 1), { s: 22, m: true, f: miss ? P.danger : P.accent });
  }).join('');

  const anaBug = [
    "# Ana's training week: days 1 to 7",
    'for day in range(1, 7):',
    '    print(f"Day {day}: run {day * 2} km")',
    'print("Rest, then race day!")'
  ];
  const anaZero = [
    "# Ana's training week: days 1 to 7",
    'for day in range(7):',
    '    print(f"Day {day}: run {day * 2} km")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    svg(600, 150, 'Ana\'s week from range(1, 7): Monday to Saturday are there, Sunday is a dashed red gap marked missing.',
      T(26, 24, "range(1, 7): Ana's week", { s: 14, m: true, a: 'start' }) +
      week(40, true) +
      `<ellipse cx="540" cy="77" rx="50" ry="50" fill="none" stroke="${P.danger}" stroke-width="3"/>` +
      T(300, 142, 'Sunday is missing. One day short.', { s: 14, f: P.danger })) +
    code(anaBug, { title: 'week.py', bad: [2] }) +
    term(['$ python3 week.py', 'Day 1: run 2 km', 'Day 2: run 4 km', 'Day 3: run 6 km', 'Day 4: run 8 km', 'Day 5: run 10 km', 'Day 6: run 12 km', 'Rest, then race day!', '# Day 7 never came. No error, no warning.'], 'terminal') +
    code(anaZero, { title: 'week.py, another try', bad: [2] }) +
    term(['$ python3 week.py', 'Day 0: run 0 km', 'Day 1: run 2 km', '# ... and it ends at Day 6: run 12 km'], 'terminal') + `</div>`;

  const countdown = [
    "# Chloe's dessert: the oven timer counts down",
    'for minute in range(10, 0, -1):',
    '    print(f"{minute} min left")',
    'print("Dessert is out of the oven!")'
  ];
  const benBug = [
    '# Ben wants 5 sets of 10 reps',
    'for set_no in range(1, 5):',
    '    print(f"Set {set_no}: 10 reps")',
    'print("Done. Protein shake time!")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(countdown, { title: 'oven_timer.py' })}${run(benBug, { title: 'ben_sets.py' })}</div>`;

  const whileStir = [
    '# lesson 25: the while way',
    'stir = 0',
    'while stir < 20:',
    '    print(f"Stir {stir}")',
    '    stir += 1  # forget this, and it never ends'
  ];
  const forStir = [
    '# the for and range way',
    'for stir in range(20):',
    '    print(f"Stir {stir}")'
  ];
  const lazy = [
    'big = range(1_000_000_000)  # instant',
    'print(big)',
    'print(list(range(5)))  # peek at a small one'
  ];
  const floaty = ['for cups in range(0, 1, 0.25):', '    print(cups)'];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(whileStir, { title: 'stir.py, with while', hi: [2, 3, 5] }) +
    code(forStir, { title: 'stir.py, with for and range', good: [2] }) +
    code(lazy, { title: 'lazy.py' }) +
    term(['$ python3 lazy.py', 'range(0, 1000000000)', '[0, 1, 2, 3, 4]'], 'terminal') +
    code(floaty, { title: 'cups.py', bad: [1] }) +
    term(['$ python3 cups.py', 'Traceback (most recent call last):', '  File "cups.py", line 1, in <module>', '    for cups in range(0, 1, 0.25):', '                ~~~~~^^^^^^^^^^^^', "TypeError: 'float' object cannot be interpreted as an integer"], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l27', minutes: 11,
    summary: '<code>range</code> hands a <code>for</code> loop whole numbers, one at a time. <code>range(20)</code> gives <b>0 up to 19</b>: twenty numbers, starting at 0. <code>range(1, 8)</code> gives 1 to 7, because the <b>stop is never included</b>. A third number is the <b>step</b>: <code>range(10, 0, -1)</code> counts down from 10 to 1. When you know how many times, <code>for</code> and <code>range</code> beat <code>while</code>: they always end.',
    video: {
      src: 'videos/l27-range.mp4', poster: 'videos/l27-range.jpg', length: '1 min 8 s',
      script: [
        'The risotto recipe says, stir 20 times. You could count in your head. Or let Python count for you.',
        'For stir in range 20. Range hands the loop one number at a time.',
        'But Python starts counting at 0. 0, 1, 2, all the way up to 19. That is 20 stirs. 20 itself never shows up. The stop number is not included.',
        'Ana wants a plan for days 1 to 7. Give range a start and a stop. Start at 1, stop at 8. The week fills up, Monday to Sunday.',
        'Write stop at 7, and Sunday goes missing. One day short. It is the most common loop mistake there is.',
        'Chloe is waiting for dessert. A third number is the step. Range from 10, stop at 0, step minus 1, counts down. 10, 9, 8, all the way to 1. Never 0. The oven opens.',
        'Know how many times? Use for and range. And remember, the stop is never included.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Stir 20 times. Let Python do the counting.',
        text: [
          'The risotto recipe says: <b>stir 20 times</b>. You could count in your head and hope you do not lose track. Or you could hand the counting to a kitchen timer that clicks once per stir.',
          'In lesson 26 a <code>for</code> loop took things one at a time. <code>range</code> is a counter you can hand to <code>for</code>. You tell it <b>where to stop</b>, and it hands out whole numbers, one per turn of the loop.',
          '<code>range(20)</code> hands out <b>20 numbers</b>: 0, 1, 2, all the way to 19. It starts at <b>0</b>, and the 20 itself is the <b>stop</b>, which is never handed out. 0 to 19 is still exactly twenty stirs.'
        ],
        tip: 'Why start at 0? Python counts <b>positions</b> from 0. The first jar on your shelf sits at position 0, the next at position 1. Lesson 32, Indexing, uses this all the time, so range starts there too.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'for stir in range(20):',
        text: [
          'Read line 2 out loud: "<b>for</b> each number that <code>range(20)</code> hands out, put it in the jar <code>stir</code> and run the block". The block is pushed in by 4 spaces, as in every loop and <code>if</code> so far.',
          'Press <b>Run</b>. You get <code>Stir 0</code> to <code>Stir 19</code>: 20 lines. Then <code>Done stirring</code>, once, because it sits back at the left edge.',
          'Now the recipe says 30. Change <code>20</code> to <code>30</code> and run it again. What is the last number? It is <code>29</code>, not 30. The stop is never included, and you still get exactly 30 stirs.'
        ],
        tip: 'Do not need the number at all? Name the jar <code>_</code>, a single underscore. It means "I am only counting". <code>for _ in range(3):</code> kneads the dough 3 times.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Sunday goes missing.',
        text: [
          'Ana wants a training plan for <b>days 1 to 7</b>, with longer runs each day. Day 0 makes no sense, so you give range <b>two</b> numbers: a <b>start</b> and a <b>stop</b>. <code>range(1, 6)</code> gives 1, 2, 3, 4, 5.',
          'You think "days 1 to 7" and write <code>range(1, 7)</code>. Python gives 1 to <b>6</b>. The stop, 7, is never included. Sunday silently vanishes from Ana\'s week. No error, no warning.',
          'So you try <code>range(7)</code>. Now there are seven days, but they start at <b>0</b>: <code>Day 0: run 0 km</code>. Also wrong.'
        ],
        warn: 'This is the <b>off-by-one</b> mistake: one too many or one too few. It is the most common loop bug there is, for beginners and experts alike. It hides in plain sight, because nothing crashes.'
      },
      {
        label: 'The fix', pic: run(anaBug, { title: 'week.py' }),
        h: 'The stop is one past the last number you want.',
        text: [
          'The rule: <b>stop = the last number you want, plus 1</b>. Ana wants days 1 to 7, so the stop is 8: <code>range(1, 8)</code>.',
          'Quick check: <b>stop minus start</b> is how many numbers you get. <code>range(1, 8)</code> is 8 minus 1, so 7 days. <code>range(1, 5)</code> is only 4 days, not the 5 you might expect.',
          'Press <b>Run</b> and count the days. Then change <code>7</code> to <code>8</code> on line 2 and run it again. Now Sunday is there: <code>Day 7: run 14 km</code>. Notice the loop number does real work: <code>{day * 2}</code> turns day 7 into 14 km.'
        ],
        tip: 'Say it out loud: "range from 1, <b>up to but not including</b> 8". Those words keep the off-by-one away.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'A third number: the step.',
        text: [
          'Chloe is waiting for dessert. Give range a <b>third</b> number, the <b>step</b>: how much to add each time. <code>range(0, 10, 2)</code> checks the oven every 2nd minute: 0, 2, 4, 6, 8. A <b>negative</b> step counts <b>down</b>: <code>range(10, 0, -1)</code> gives 10, 9, 8 and ends at <b>1</b>, not 0. The stop is still never included.',
          'Press <b>Run</b> on the oven timer. Then change <code>-1</code> to <code>-2</code>. Then delete <code>, -1</code> completely, so it reads <code>range(10, 0)</code>. Only the dessert line prints. Counting up from 10 never reaches 0, so the range is <b>empty</b>. No error, the loop just runs zero times. <code>range(5, 1)</code> is empty too.',
          'Second box: Ben wants <b>5 sets</b> of 10 reps, but he only gets 4. Fix the range so the sets are numbered 1 to 5.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Lazy, whole numbers only, and better than while for counting.',
        text: [
          '<b>range beats while for counting.</b> The <code>while</code> loop from lesson 25 needs three things: start the jar, check it, add 1. Forget <code>stir += 1</code> and it stirs forever. When you know how many times, <code>for</code> and <code>range</code> do all three for you, and they <b>always end</b>. Keep <code>while</code> for "until it thickens", when you do not know the count.',
          '<b>range is lazy.</b> It does not make all its numbers up front. It works each one out when the loop asks for it. So <code>range(1_000_000_000)</code> is instant. To <b>peek</b> at the numbers, wrap a small range in <code>list()</code>: <code>[0, 1, 2, 3, 4]</code>. Square brackets mean a list, which comes in lesson 31. Never do that with the billion: it would fill your memory.',
          '<b>Whole numbers only.</b> Lesson 6 warned you: <code>range(0, 1, 0.25)</code> stops with <code>TypeError: \'float\' object cannot be interpreted as an integer</code>. Count in whole steps and divide inside the loop instead.',
          'You will also see <code>range(len(...))</code> in other people\'s code, to count positions. It works, but looping over the things themselves, as in lesson 26, is usually clearer.'
        ]
      }
    ],
    exercises: [
      {
        file: 'l27_training_week.py', title: "Ana's training week",
        task: 'Use <code>for</code> and <code>range</code> to print Ana\'s plan for <b>days 1 to 7</b>, where each day\'s run is <code>4 + day</code> km. Then print a countdown from <b>5 down to 1</b>, and <code>Go!</code>. No <code>while</code> allowed.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'The week loop is half written, with an off-by-one in it. Fix it, then write the countdown loop yourself, between the <code>START</code> and <code>END</code> lines. Save the file.',
          'Run it. The check reads every line you printed and looks at your <code>range</code> calls, then says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which numbers does <code>range(5)</code> hand out?',
        options: ['0, 1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
        answer: 0,
        why: 'It starts at 0 and stops <b>before</b> 5. That is still 5 numbers.',
        hint: 'Where does range start when you give it one number? And is the stop included?'
      },
      {
        type: 'match', q: 'Match each range to the numbers it hands out.',
        pairs: [
          ['range(4)', '0, 1, 2, 3'],
          ['range(1, 4)', '1, 2, 3'],
          ['range(0, 10, 3)', '0, 3, 6, 9'],
          ['range(3, 0, -1)', '3, 2, 1'],
          ['range(4, 1)', 'nothing at all']
        ],
        why: 'Start (0 if you leave it out), stop (never included), step (1 if you leave it out). Counting up from 4 never reaches 1, so <code>range(4, 1)</code> is empty.',
        hint: 'For each one, write the start, add the step, and stop before you reach the stop.'
      },
      {
        type: 'type', q: 'Ana\'s plan runs from day 1 to day 7. Type the range call that gives exactly those days.',
        prompt: 'for day in',
        answers: ['range(1, 8)', 'range(1,8)', 'range(1, 8):', 'range(1,8):'],
        why: 'Start at 1. The stop is one past the last day you want, so 8.',
        hint: 'The stop is never included. Which number comes right after 7?'
      },
      {
        type: 'fix', q: 'The recipe card should read <code>Stir 1</code> up to <code>Stir 20</code>. Fix the loop.',
        code: ['for stir in range(20):', '    print(f"Stir {stir}")'],
        title: 'risotto.py',
        check: [
          'lines = out.splitlines()',
          'want = [f"Stir {n}" for n in range(1, 21)]',
          'if lines == want:',
          '    ok = True',
          'elif lines and lines[0] == "Stir 0":',
          '    msg = "It still starts at Stir 0. Give range a start of 1."',
          'elif lines and lines[-1] == "Stir 19":',
          '    msg = "It ends at Stir 19. The stop is never included, so it must be one past 20."',
          'else:',
          '    msg = "It printed " + str(len(lines)) + " lines, from " + (lines[0] if lines else "nothing") + " to " + (lines[-1] if lines else "nothing") + ". You want Stir 1 to Stir 20."'
        ].join('\n'),
        why: '<code>range(1, 21)</code> gives 1 to 20: start 1, and the stop is one past the last number. (Printing <code>{stir + 1}</code> with <code>range(20)</code> works too.)',
        hint: 'Two numbers: <code>range(1, ...)</code>. What stop gives 20 as the last number?'
      },
      {
        type: 'fix', q: 'Chloe\'s countdown prints nothing but the last line. Make it count down <code>5</code>, <code>4</code>, <code>3</code>, <code>2</code>, <code>1</code>, then print <code>Dessert!</code>.',
        code: ['for minute in range(5, 0):', '    print(minute)', 'print("Dessert!")'],
        title: 'oven_timer.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["5", "4", "3", "2", "1", "Dessert!"]:',
          '    ok = True',
          'elif lines == ["Dessert!"]:',
          '    msg = "Still only the Dessert! line. The range is empty: counting up from 5 never reaches 0. Add a third number, a step of -1."',
          'elif lines[-2:] == ["0", "Dessert!"]:',
          '    msg = "It reaches 0. The stop is never included, so stop at 0, not at -1."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want 5, 4, 3, 2, 1 and then Dessert!"'
        ].join('\n'),
        why: '<code>range(5, 0, -1)</code>: start at 5, step down by 1, and stop before 0. Without the step, range counts <b>up</b>, and an empty range runs the loop zero times, with no error.',
        hint: 'A countdown needs a negative step as the third number.'
      },
      {
        type: 'pick', q: 'Back to lessons 7 and 19. Do these two programs print the same numbers?',
        pic: code(['for minute in range(10):', '    if minute % 2 == 0:', '        print(minute)', '', 'for minute in range(0, 10, 2):', '    print(minute)'], { title: 'every_2nd_minute.py' }),
        options: ['Yes: both print 0, 2, 4, 6, 8', 'No: the first one prints nothing', 'No: the second one ends at 10', 'No: the first one prints 1, 3, 5, 7, 9'],
        answer: 0,
        why: '<code>% 2</code> from lesson 7 gives the leftover after dividing by 2, so <code>== 0</code> keeps the even minutes. A step of 2 hands out only those minutes in the first place. Both print 0, 2, 4, 6, 8. The step is shorter.',
        hint: 'Which numbers from 0 to 9 leave nothing over when you divide by 2?'
      },
      {
        type: 'fill', q: 'Ben wants 5 sets, numbered 1 to 5. Fill the blanks.',
        text: 'for set_no in ___(1, ___):\n    print(f"Set {set_no}: 10 reps")',
        options: ['range', '6', '5', 'while', 'len'],
        answer: ['range', '6'],
        why: '<code>range(1, 6)</code>: start 1, and 6 is one past the last set. 6 minus 1 is 5 sets.',
        hint: 'The stop is never included.'
      },
      {
        type: 'pick', q: 'You want to measure flour in quarter cups and write <code>for cups in range(0, 1, 0.25):</code>. What happens?',
        options: ['TypeError: range only takes whole numbers', 'It prints 0, 0.25, 0.5 and 0.75', 'It prints 0 to 1', 'The loop runs forever'],
        answer: 0,
        why: 'Python stops with <code>TypeError: \'float\' object cannot be interpreted as an integer</code>. range counts in whole numbers only. Count whole quarters with <code>range(4)</code> and divide by 4 inside the loop.',
        hint: 'Lesson 6 warned about this one. Is 0.25 an int or a float?'
      }
    ]
  });
})();
