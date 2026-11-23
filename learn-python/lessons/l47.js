/* Lesson 47: Scope (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l47  Scope
     ===================================================================== */

  // A labelled jar. val: the value inside ('' = empty, drawn dashed). col: colour of the value.
  const jar = (x, y, name, val, col) =>
    `<rect x="${x}" y="${y}" width="112" height="56" rx="12" fill="${val ? P.white : P.paper2}" stroke="${P.ink}" stroke-width="2.5" stroke-dasharray="${val ? '' : '6 5'}"/>` +
    `<rect x="${x + 30}" y="${y - 9}" width="52" height="10" rx="4" fill="${P.ink}"/>` +
    (val ? T(x + 56, y + 36, val, { s: 18, m: true, f: col || P.ink }) : '') +
    T(x + 56, y + 76, name, { s: 13, m: true, f: P.ink2 });

  // A pan on the stove: the inside of one call.
  const pan = (x, y, w, h, title, noHandle) =>
    (noHandle ? '' : `<rect x="${x + w - 6}" y="${y + h / 2 - 9}" width="96" height="18" rx="8" fill="${P.ink}"/>`) +
    box(x, y, w, h, P.warnT, 40) + T(x + w / 2, y + 30, title, { s: 14, m: true });

  const ideaPic = svg(600, 352, 'Top: a pan on the stove, the inside of the call left_after(450). It holds two jars made during the call: kcal is 450 and left is 1950. They are washed away when the call ends. Bottom: the kitchen counter, the top of the file, with the jar daily_goal holding 2400. A green arrow shows the pan can read the counter jar.',
    pan(30, 14, 420, 168, 'the pan: left_after(450)') +
    jar(88, 72, 'kcal', '450', P.accent) + jar(280, 72, 'left', '1950', P.ok) +
    T(240, 174, 'made in the pan, washed away after the call', { s: 12.5, w: 700, f: P.ink2 }) +
    box(20, 226, 560, 116, P.sand, 16) +
    T(44, 256, 'the counter', { s: 15, a: 'start' }) +
    T(44, 278, 'the top of the file', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(44, 298, 'jars here stay all the time', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    jar(400, 248, 'daily_goal', '2400', P.ink) +
    arrow(440, 238, 372, 188, P.ok, 3) +
    T(462, 212, 'the pan can read it', { s: 12.5, w: 700, f: P.ok, a: 'start' }));

  const goal = [
    'daily_goal = 2400',
    '',
    'def left_after(kcal):',
    '    left = daily_goal - kcal',
    '    return left',
    '',
    'print(left_after(450))',
    'print(left_after(900))',
    'print(daily_goal)'
  ];

  const broken = [
    'kcal_today = 0',
    '',
    'def eat(kcal):',
    '    kcal_today = kcal_today + kcal',
    '',
    'eat(450)',
    'print(f"Today: {kcal_today} kcal")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(broken, { title: 'coach.py', bad: [4] }) +
    term(['$ python3 coach.py', 'Traceback (most recent call last):', '  File "coach.py", line 6, in <module>', '    eat(450)', '    ~~~^^^^^', '  File "coach.py", line 4, in eat', '    kcal_today = kcal_today + kcal', '                 ^^^^^^^^^^', "UnboundLocalError: cannot access local variable 'kcal_today' where it is not associated with a value"], 'terminal') +
    svg(600, 178, 'Inside the pan, the line kcal_today = kcal_today + kcal makes a new pan jar called kcal_today. It is still empty when the right side tries to read it, so Python stops. The counter jar kcal_today, holding 0, is never touched.',
      pan(20, 12, 300, 152, 'the pan: eat(450)') +
      jar(48, 62, 'kcal', '450', P.accent) +
      `<rect x="184" y="62" width="112" height="56" rx="12" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
      `<rect x="214" y="53" width="52" height="10" rx="4" fill="${P.danger}"/>` + T(240, 98, 'empty!', { s: 15, f: P.danger }) +
      T(240, 136, 'kcal_today', { s: 13, m: true, f: P.danger }) +
      box(440, 40, 140, 104, P.sand, 14) + T(510, 62, 'the counter', { s: 12.5 }) +
      jar(454, 78, '', '0', P.ink) + T(510, 168, 'never touched', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const fixed = [
    'kcal_today = 0',
    '',
    'def eat(total, kcal):',
    '    return total + kcal',
    '',
    'kcal_today = eat(kcal_today, 450)',
    'kcal_today = eat(kcal_today, 700)',
    'kcal_today = eat(kcal_today, 820)',
    'print(f"Ana today: {kcal_today} kcal")'
  ];
  const flowPic = svg(600, 170, 'The value 0 from the counter jar kcal_today is passed into the pan as total, with 450 as kcal. The pan returns 450, and the caller pours it back into the counter jar, which now holds 450.',
    T(64, 24, 'the counter', { s: 12.5, w: 700, f: P.ink2 }) +
    jar(8, 52, 'kcal_today', '0', P.ink) +
    arrow(126, 80, 170, 80, P.accent, 3) + T(148, 64, 'in', { s: 12, w: 700, f: P.accent }) +
    pan(176, 10, 260, 146, 'eat(0, 450)', true) +
    jar(192, 62, 'total', '0', P.accent) + jar(312, 62, 'kcal', '450', P.accent) +
    arrow(442, 80, 478, 80, P.ok, 3) + T(460, 106, 'back', { s: 12, w: 700, f: P.ok }) +
    T(538, 24, 'the counter', { s: 12.5, w: 700, f: P.ink2 }) +
    jar(482, 52, 'kcal_today', '450', P.ok));

  const twoJars = [
    'kcal = 2000            # on the counter: Ana\'s goal',
    '',
    'def snack(kcal):       # a new jar in the pan',
    '    kcal = kcal + 150',
    '    return kcal',
    '',
    'print(snack(300))',
    'print(kcal)'
  ];

  const glob = [
    'kcal_today = 0',
    '',
    'def eat(kcal):',
    '    global kcal_today',
    '    kcal_today = kcal_today + kcal',
    '',
    'eat(450)',
    'eat(700)',
    'print(kcal_today)'
  ];
  const behindPic = svg(600, 150, 'Three cards, eat, snack and reset, all reach out of their pans with global and change the same counter jar kcal_today. Looking at the jar, you cannot tell which card changed it last.',
    [['eat(450)', 20], ['snack()', 215], ['reset()', 410]].map(([n, x]) =>
      box(x, 14, 170, 44, P.warnT, 12) + T(x + 85, 42, n, { s: 14, m: true }) +
      `<path d="M${x + 85} 62 L${x + 85 + (300 - x - 85) * 0.82} 92" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5" fill="none"/>`).join('') +
    box(210, 96, 180, 44, P.white, 12) + T(300, 124, 'kcal_today = ?', { s: 14, m: true, f: P.danger }) +
    T(480, 124, 'who changed it?', { s: 12.5, w: 700, f: P.danger }));

  COURSE.add({
    id: 'l47', minutes: 12,
    summary: 'Every call of a function cooks in its <b>own pan</b>. Names made inside the function, its <b>parameters</b> and anything it assigns with <code>=</code>, are <b>local</b>: they live in the pan during the call and are <b>gone</b> after it. Printing one outside stops with a <code>NameError</code>. A function can <b>read</b> a name from the top of the file, but <b>assigning</b> to it makes a <b>new local jar</b> with the same name, so <code>kcal_today = kcal_today + kcal</code> inside a card stops with an <code>UnboundLocalError</code>. The good fix: <b>pass the value in and return the new value</b>, then store it outside: <code>kcal_today = eat(kcal_today, 450)</code>. <code>global</code> also works, but then any card can change the jar behind your back, so avoid it.',
    video: {
      src: 'videos/l47-scope.mp4', poster: 'videos/l47-scope.jpg', length: '1 min 0 s',
      script: [
        'Kitchen Coach keeps a jar on the counter. Calories today. It starts at 0.',
        'Ana eats breakfast. A recipe card called eat should add 450.',
        'But every card cooks in its own pan. Any name the card fills in becomes a new jar, inside the pan. Same name, a different jar.',
        'So this line reads the pan jar, before anything is in it. It is empty. Python stops. Unbound local error.',
        'The counter jar is never touched.',
        'And when the card is done, the pan is washed. Its jars are gone.',
        'The fix: pass the total in. Return hands the new total back, and you pour it into the counter jar. 450.',
        'You could write global, so the card reaches the counter jar. It works. But then any card can change your jar behind your back.',
        'What is made in the pan stays in the pan. Pass it in, hand it back.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every call cooks in its own pan.',
        text: [
          'Your kitchen has a <b>counter</b>. Jars you make at the top of a file sit there, and they stay for the whole program. Kitchen Coach keeps Ana\'s daily goal there: <code>daily_goal = 2400</code>.',
          'A recipe card does its work in a <b>pan on the stove</b>. Every call gets a fresh, clean pan. The card\'s <b>parameters</b> are jars in that pan, and so is every name the card makes with <code>=</code>. Python calls these names <b>local</b>: they belong to the inside of the card.',
          'When the call is over, the pan is <b>washed</b>. Its jars are gone. What happens in the pan stays in the pan. Where a name can be used is called its <b>scope</b>.'
        ],
        tip: 'The pan can still <b>look at</b> the counter. A card may read <code>daily_goal</code> from the top of the file. Changing it is another story: that is the pain in part 3.'
      },
      {
        label: 'The code', pic: run(goal, { title: 'goal.py' }),
        h: 'Read the counter, cook in the pan.',
        text: [
          'Line 1 puts a jar on the counter. Line 4 runs <b>inside</b> the card. It <b>reads</b> <code>daily_goal</code> from the counter, takes away <code>kcal</code>, and puts the answer in a new jar called <code>left</code>. Both <code>kcal</code> and <code>left</code> live in the pan.',
          'Each call gets a new pan. The first call works out 2400 - 450, which is <b>1950</b>. The second starts clean and works out 2400 - 900, which is <b>1500</b>. Line 9 shows the counter jar did not change: still <b>2400</b>. Press <b>Run</b>.',
          'Now add one more line at the bottom: <code>print(left)</code>. Run it again. Python stops with <code>NameError: name \'left\' is not defined</code>. The pan was washed after the call, so outside the card there is <b>no jar called left</b>. The only way out of the pan is <code>return</code>.'
        ],
        tip: 'You met this idea in lesson 45: the loop and the card each had a jar called <code>grams</code>, and nothing went wrong. Now you know why. They live in different places.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Same name, a different jar, and it is empty.',
        text: [
          'Kitchen Coach keeps a running total on the counter: <code>kcal_today = 0</code>. Ana eats a 450 kcal breakfast, so you write a card <code>eat(kcal)</code> that adds it. Run it, and Python stops with an <code>UnboundLocalError</code>.',
          'Why? Before a card cooks, Python reads the whole card. It sees <code>kcal_today =</code> <b>inside</b> the card, so it decides: <code>kcal_today</code> is a <b>pan jar</b>, a new local name, for the whole card. Same name as the counter jar, but a <b>different jar</b>.',
          'Then line 4 runs. The right side <code>kcal_today + kcal</code> tries to read the <b>pan</b> jar first, and nothing is in it yet. That is what the message means: <code>cannot access local variable \'kcal_today\' where it is not associated with a value</code>. "Local variable" is the pan jar. "Not associated with a value" is the empty jar. The counter jar with its 0 is <b>never touched</b>.'
        ],
        warn: '<code>kcal_today += kcal</code> stops the same way. <code>+=</code> (lesson 35) also puts a value in the jar, so the name is local to the card.'
      },
      {
        label: 'The fix', pic: `<div style="width:100%;min-width:0">${run(fixed, { title: 'coach.py' })}${flowPic}</div>`,
        h: 'Pass it in. Hand it back.',
        text: [
          'Do not let the card reach out to the counter. Give it what it needs, and let it <b>hand the answer back</b>. The card now has two jars: <code>total</code>, the calories so far, and <code>kcal</code>, the meal. It returns <code>total + kcal</code>.',
          'Line 6 does the rest. It <b>passes in</b> the counter value, 0, and stores what comes back in the counter jar: <code>kcal_today = eat(kcal_today, 450)</code>. Now the counter holds 450. Lunch adds 700, dinner adds 820. Press <b>Run</b>: <code>Ana today: 1970 kcal</code>.',
          'This is <code>return</code> from lesson 45 doing its job. The card touches nothing outside its pan. Every change to the counter jar is right there, on a line you can see, with <code>kcal_today =</code> at the front.',
          'Ana has a 150 kcal snack too. Add one more line, <code>kcal_today = eat(kcal_today, 150)</code>, before the print. Is it 2120?'
        ],
        tip: 'Read the call line out loud: "kcal today becomes what eat gives back". The line itself tells you the counter jar changes. Nothing is hidden inside the card.'
      },
      {
        label: 'Try it', pic: run(twoJars, { title: 'two_jars.py' }),
        h: 'Same name, two jars.',
        text: [
          'Here the counter has a jar called <code>kcal</code> holding Ana\'s goal, 2000. The card has a parameter called <code>kcal</code> too. They have the same name, but they are <b>two different jars</b>. The card\'s jar lives in the pan, and inside the card that is the one Python uses.',
          'Press <b>Run</b>. <code>snack(300)</code> puts 300 in the pan jar, adds 150 and returns <b>450</b>. Then <code>print(kcal)</code> outside the card shows the counter jar: still <b>2000</b>. The pan jar hid the counter jar for a moment, and never changed it.',
          'Now change the last two lines so the counter jar takes the answer: <code>kcal = snack(kcal)</code>, then <code>print(kcal)</code>. Run it. What does the counter jar hold now?'
        ],
        tip: 'Same names inside and outside work, but they can confuse the person reading the code. Pick a name that says which jar you mean, like <code>goal_kcal</code> on the counter and <code>kcal</code> on the card.'
      },
      {
        label: 'The catch', pic: `<div style="width:100%;min-width:0">${run(glob, { title: 'global.py' })}${behindPic}</div>`,
        h: 'global works. Avoid it anyway.',
        text: [
          'Python has a word that lets a card reach out of its pan: <code>global</code>. Line 4 says "in this card, <code>kcal_today</code> means the jar on the counter". Then line 5 changes the counter jar directly. Press <b>Run</b>: <b>1150</b>. It works.',
          'So why avoid it? Look at line 7: <code>eat(450)</code>. Nothing on that line says that a counter jar changes. You only find out by reading the card. In a small file, fine. In a real program with 30 cards, any card might write <code>global kcal_today</code> and change it <b>behind your back</b>. When the total is wrong, you have to read every card to find out who changed it.',
          'With <b>pass it in, hand it back</b>, the card only works with what you give it, and every change shows up on a line with <code>=</code>. That is easier to read, easier to test and easier to fix. Use it almost every time.'
        ],
        warn: 'If you see <code>global</code> in your own code, take it as a hint: could this card take the value as a parameter and <code>return</code> the new one? Usually it can.'
      }
    ],
    exercises: [
      {
        file: 'l47_calorie_log.py', title: "Ana's calorie log",
        task: 'The starter card <code>log_meal</code> tries to change a counter jar from inside the card, so it stops with an <code>UnboundLocalError</code>. Rewrite it to <b>take the total in and return the new total</b>: <code>log_meal(total, kcal)</code>. Store what it hands back. The check calls your card with <b>other numbers</b>, and it reads your file to make sure there is no <code>global</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file. Run it once: it stops with the <code>UnboundLocalError</code> from this lesson.',
          'Between <code>START</code> and <code>END</code>, give the card two jars, return the new total, and store the result in the loop. Save the file.',
          'Run it again. The check says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['salt_g = 5', '', 'def season(salt_g):', '    salt_g = salt_g + 2', '    return salt_g', '', 'print(season(10))', 'print(salt_g)'], { title: 'salt.py' }),
        options: ['12, then 5', '12, then 12', '7, then 5', '7, then 7'],
        answer: 0,
        why: 'The parameter <code>salt_g</code> is a pan jar, a different jar from the one on the counter. 10 goes in, plus 2 is 12, and 12 comes back. The counter jar was never touched, so it still holds 5.',
        hint: 'Which jar does the card use: the one in its pan, or the one on the counter?'
      },
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['servings = 4', '', 'def double():', '    servings = servings * 2', '    return servings', '', 'print(double())'], { title: 'double.py' }),
        options: ['It stops with UnboundLocalError', 'It prints 8', 'It prints 4', 'It stops with NameError: name \'servings\' is not defined'],
        answer: 0,
        why: 'The card assigns to <code>servings</code>, so <code>servings</code> is a pan jar for the whole card. The right side reads that pan jar before anything is in it: <code>cannot access local variable \'servings\' where it is not associated with a value</code>.',
        hint: 'Does the card put something in <code>servings</code> with <code>=</code>?'
      },
      {
        type: 'bucket', q: 'At the top of the file: <code>goal = 2400</code>. Each line below is the only line inside <code>def card(kcal):</code>. Which ones work when you call <code>card(300)</code>?',
        buckets: ['Works', 'UnboundLocalError'],
        items: [
          ['return goal - kcal', 0],
          ['print(goal)', 0],
          ['left = goal - kcal', 0],
          ['kcal = kcal + 50', 0],
          ['goal = goal - kcal', 1],
          ['goal += 100', 1]
        ],
        why: 'Reading a counter jar is fine. Making a new pan jar like <code>left</code> is fine. <code>kcal</code> is the card\'s own parameter, so changing it is fine. But <code>goal = ...</code> and <code>goal += ...</code> make <code>goal</code> a pan jar, and then reading it first fails.',
        hint: 'Look for lines that put a value into <code>goal</code> itself.'
      },
      {
        type: 'pick', q: 'What happens on the last line?',
        pic: code(['def plate_up(grams):', '    portion = grams / 4', '    return portion', '', 'plate_up(800)', 'print(portion)'], { title: 'plate.py' }),
        options: ['It stops with NameError: name \'portion\' is not defined', 'It prints 200.0', 'It prints None', 'It prints 800'],
        answer: 0,
        why: '<code>portion</code> was a pan jar. When the call ended, the pan was washed. Line 5 also throws away the 200.0 that came back, because nothing stores it. Write <code>portion = plate_up(800)</code> to keep it.',
        hint: 'Where did the jar <code>portion</code> live, and is it still there after the call?'
      },
      {
        type: 'fix', q: 'This stops with <code>UnboundLocalError</code>. Fix it <b>without</b> <code>global</code>: make the card <code>eat(total, kcal)</code> return the new total, and store it, so the program prints <code>Today: 1150 kcal</code>.',
        code: broken.slice(0, 6).concat(['eat(700)', broken[6]]),
        title: 'coach.py',
        check: [
          'import dis',
          'f = globals().get("eat")',
          'if not callable(f):',
          '    msg = "Keep the card called eat."',
          'elif any(i.opname == "STORE_GLOBAL" for i in dis.get_instructions(f)):',
          '    msg = "It works, but the card changes the counter jar with global. Pass the total in and return the new total instead."',
          'else:',
          '    try:',
          '        back = f(1000, 200)',
          '    except TypeError:',
          '        back = "no"',
          '    if back == "no":',
          '        msg = "Give the card two jars: def eat(total, kcal):"',
          '    elif back is None:',
          '        msg = "eat(1000, 200) handed back None. Did you forget return?"',
          '    elif back != 1200:',
          '        msg = "eat(1000, 200) should hand back 1200. Use the jars: return total + kcal"',
          '    elif out != "Today: 1150 kcal":',
          '        msg = "It printed: " + out + ". Store what eat hands back: kcal_today = eat(kcal_today, 450)"',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'The card becomes <code>def eat(total, kcal):</code> with <code>return total + kcal</code>. The calls become <code>kcal_today = eat(kcal_today, 450)</code> and <code>kcal_today = eat(kcal_today, 700)</code>. The value goes in, the new value comes back, and the counter jar changes on a line you can see.',
        hint: 'Two jars on the card, return the sum, and put <code>kcal_today =</code> in front of each call.'
      },
      {
        type: 'pick', q: 'Back to lesson 45. Someone forgot one line in the fix. What does this print?',
        pic: code(['kcal_today = 0', '', 'def eat(total, kcal):', '    total = total + kcal', '', 'kcal_today = eat(kcal_today, 450)', 'print(kcal_today)'], { title: 'coach.py' }),
        options: ['None', '450', '0', 'It stops with UnboundLocalError'],
        answer: 0,
        why: 'The card works out 450, but only in its pan jar <code>total</code>. There is no <code>return</code>, so the card hands back <code>None</code> (lesson 45), and line 6 puts None in the counter jar. The fix needs both halves: pass it in, <b>and</b> hand it back.',
        hint: 'What does a card hand back when it has no <code>return</code>?'
      },
      {
        type: 'fill', q: 'Finish the fix so the counter jar ends up holding 450.',
        text: 'def eat(___, kcal):\n    ___ total + kcal\n\nkcal_today = ___(kcal_today, 450)',
        options: ['total', 'return', 'eat', 'global', 'print', 'kcal_today'],
        answer: ['total', 'return', 'eat'],
        why: 'The card takes the total in as <code>total</code>, hands the new total back with <code>return</code>, and the call <code>eat(kcal_today, 450)</code> is stored in the counter jar. No <code>global</code> needed.',
        hint: 'The first blank is a jar on the card. The second hands the value back. The third is the card\'s name.'
      },
      {
        type: 'pick', q: 'A program with <code>global kcal_today</code> in a card works and prints the right number. Why do most Python programmers still avoid it?',
        options: ['Any card can change the counter jar, and the call line does not show it', 'global only works in Python 3.15', 'global deletes the counter jar after the call', 'Python prints a warning every time global is used'],
        answer: 0,
        why: 'With <code>global</code>, <code>eat(450)</code> quietly changes a jar outside the card. In a big program, any card might do that, so a wrong total means reading every card. Pass it in and hand it back, and every change is a visible line with <code>=</code>.',
        hint: 'Think of a big program with 30 cards and one wrong total.'
      }
    ]
  });
})();
