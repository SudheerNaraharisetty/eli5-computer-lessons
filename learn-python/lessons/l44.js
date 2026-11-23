/* Lesson 44: def (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l44  def
     ===================================================================== */

  // A checkbox in front of a checklist line.
  const tick = (x, y, col) => `<rect x="${x}" y="${y - 11}" width="13" height="13" rx="3" fill="${P.white}" stroke="${col || P.ink}" stroke-width="2"/>`;

  // The idea: cards Python wrote for you, and a card you write yourself.
  const builtin = (x, y, s) => box(x, y, 116, 42, P.white, 10) + T(x + 58, y + 27, s, { s: 15, m: true, f: P.accent });
  const ideaPic = svg(600, 312, 'Left: four recipe cards Python already wrote for you: print, len, sorted and input. You call them, and you never see their steps. Right: a card you write yourself, called print_breakfast, with four steps: 50 g oats, 1 banana, 1 coffee, 500 ml water.',
    T(144, 30, 'Cards Python wrote for you', { s: 14 }) +
    builtin(20, 50, 'print()') + builtin(150, 50, 'len()') +
    builtin(20, 110, 'sorted()') + builtin(150, 110, 'input()') +
    T(144, 194, 'You call them by name.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(144, 214, 'You never see their steps.', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(290, 136, 330, 136, P.accent, 3) +
    T(310, 120, 'now', { s: 12, f: P.accent }) +
    box(340, 22, 240, 236, P.warnT, 18) +
    T(460, 54, 'print_breakfast()', { s: 15, m: true, f: P.accent }) +
    `<line x1="358" y1="68" x2="562" y2="68" stroke="${P.ink}" stroke-width="2"/>` +
    ['50 g oats', '1 banana', '1 coffee', '500 ml water'].map((s, i) => {
      const y = 104 + i * 38;
      return tick(364, y) + T(388, y, s, { s: 14, w: 700, a: 'start' });
    }).join('') +
    T(460, 288, 'your own card: you write the steps', { s: 12.5, w: 700, f: P.ink2 }));

  // The code: the parts of a function.
  const anatomyPic = svg(600, 292, 'The parts of a function. Line 1: def print_breakfast(): with the word def (a new card), its name, the brackets and the colon. Under it, the body: four print lines pushed in by 4 spaces. They run only when the card is called. At the bottom, the call: print_breakfast() with brackets. Now the body runs.',
    box(14, 14, 572, 214, P.white, 14) +
    T(56, 44, 'new card', { s: 13, f: P.accent }) + `<line x1="56" y1="50" x2="56" y2="64" stroke="${P.accent}" stroke-width="2"/>` +
    T(164, 44, 'its name', { s: 13 }) + `<line x1="164" y1="50" x2="164" y2="64" stroke="${P.ink}" stroke-width="2"/>` +
    T(256, 44, 'brackets', { s: 13, f: P.warn }) + `<line x1="256" y1="50" x2="256" y2="64" stroke="${P.warn}" stroke-width="2"/>` +
    T(334, 44, 'colon', { s: 13, f: P.danger }) + `<line x1="322" y1="50" x2="278" y2="66" stroke="${P.danger}" stroke-width="2"/>` +
    T(40, 86, 'def', { s: 18, m: true, a: 'start', f: P.accent }) +
    T(83.2, 86, 'print_breakfast', { s: 18, m: true, a: 'start' }) +
    T(245.2, 86, '()', { s: 18, m: true, a: 'start', f: P.warn }) +
    T(266.8, 86, ':', { s: 18, m: true, a: 'start', f: P.danger }) +
    ['print("- 50 g oats")', 'print("- 1 banana")', 'print("- 1 coffee")', 'print("- 500 ml water")']
      .map((s, i) => T(83.2, 120 + i * 28, s, { s: 18, m: true, a: 'start' })).join('') +
    `<path d="M74 102 h-10 v104 h10" fill="none" stroke="${P.ok}" stroke-width="3"/>` +
    T(370, 128, 'the body:', { s: 13.5, a: 'start', f: P.ok }) +
    T(370, 150, 'pushed in 4 spaces,', { s: 13, w: 700, a: 'start', f: P.ink2 }) +
    T(370, 172, 'runs only when called', { s: 13, w: 700, a: 'start', f: P.ink2 }) +
    box(14, 240, 572, 44, P.okT, 12) +
    T(40, 268, 'print_breakfast()', { s: 18, m: true, a: 'start', f: P.ok }) +
    T(240, 268, '← the call: now the body runs', { s: 13.5, a: 'start' }));

  const first = [
    'def print_breakfast():',
    '    print("- 50 g oats")',
    '    print("- 1 banana")',
    '    print("- 1 coffee")',
    '    print("- 500 ml water")',
    '',
    'print("Good morning, Ben!")',
    'print_breakfast()',
    'print("Have a strong training day.")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${anatomyPic}${run(first, { title: 'breakfast.py' })}</div>`;

  // The pain: three photocopies, Wednesday missed.
  const ITEMS = ['50 g oats', '1 banana', '15 g peanut butter', '1 coffee', '500 ml water'];
  const sheet = (x, day, missed) => {
    let s = box(x, 16, 176, 182, P.white, 12) + T(x + 88, 42, day, { s: 15 });
    ITEMS.forEach((it, i) => {
      const y = 74 + i * 26;
      if (i === 2 && missed) {
        s += `<rect x="${x + 10}" y="${y - 17}" width="156" height="24" rx="12" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="5 5"/>` +
          T(x + 88, y, 'missed', { s: 13, f: P.danger });
        return;
      }
      if (i === 2) s += `<rect x="${x + 10}" y="${y - 17}" width="156" height="24" rx="8" fill="${P.okT}"/>`;
      s += tick(x + 16, y) + T(x + 36, y, it, { s: 12.5, w: 700, a: 'start', f: i === 2 ? P.ok : P.ink });
    });
    return s;
  };
  const painSvg = svg(600, 236, 'Three copies of the breakfast checklist: Monday, Tuesday and Wednesday. Monday and Tuesday got the new line, 15 g peanut butter. Wednesday was missed: it still has the old list.',
    sheet(14, 'Monday') + sheet(210, 'Tuesday') + sheet(406, 'Wednesday', true) +
    T(300, 226, 'You changed 2 copies. The 3rd still has the old list.', { s: 13, w: 700, f: P.danger }));

  const copies = [
    'print("Monday")',
    'print("- 50 g oats")',
    'print("- 1 banana")',
    'print("- 15 g peanut butter")',
    'print("- 1 coffee")',
    'print("- 500 ml water")',
    'print("Tuesday")',
    'print("- 50 g oats")',
    'print("- 1 banana")',
    'print("- 15 g peanut butter")',
    'print("- 1 coffee")',
    'print("- 500 ml water")',
    'print("Wednesday")',
    'print("- 50 g oats")',
    'print("- 1 banana")',
    'print("- 1 coffee")',
    'print("- 500 ml water")'
  ];
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(copies, { title: 'mornings.py' })}</div>`;

  // The fix: one card, three calls.
  const fixSvg = svg(600, 252, 'One recipe card called print_breakfast, with 5 steps including 15 g peanut butter. Three arrows labelled call go from the card to Monday, Tuesday and Wednesday. Each morning runs the same card.',
    box(14, 20, 250, 196, P.warnT, 16) +
    T(139, 50, 'print_breakfast', { s: 15, m: true, f: P.accent }) +
    `<line x1="30" y1="62" x2="248" y2="62" stroke="${P.ink}" stroke-width="2"/>` +
    ITEMS.map((it, i) => {
      const y = 92 + i * 27;
      return tick(32, y, i === 2 ? P.ok : P.ink) + T(54, y, it, { s: 13, w: 700, a: 'start', f: i === 2 ? P.ok : P.ink });
    }).join('') +
    ['Mon', 'Tue', 'Wed'].map((d, i) => {
      const y = 22 + i * 68;
      return arrow(272, 118, 352, y + 24, P.accent, 2.5) +
        box(360, y, 222, 48, P.white, 12) +
        T(374, y + 30, d, { s: 14, a: 'start' }) +
        T(418, y + 30, 'print_breakfast()', { s: 13, m: true, a: 'start', f: P.ok });
    }).join('') +
    T(318, 96, 'call', { s: 12, f: P.accent }) +
    T(300, 244, 'One card. Change it once, and every morning changes.', { s: 13, w: 700, f: P.ok }));

  const fixed = [
    'def print_breakfast():',
    '    print("- 50 g oats")',
    '    print("- 1 banana")',
    '    print("- 15 g peanut butter")',
    '    print("- 1 coffee")',
    '    print("- 500 ml water")',
    '',
    'print("Monday")',
    'print_breakfast()',
    'print("Tuesday")',
    'print_breakfast()',
    'print("Wednesday")',
    'print_breakfast()'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${fixSvg}${run(fixed, { title: 'mornings.py' })}</div>`;

  const warmup = [
    'def print_warmup():',
    '    print("  5 min easy jog")',
    '    print("  10 leg swings, each side")',
    '    print("  10 walking lunges")',
    '',
    'print("Ana\'s run days")',
    'for day in ["Mon", "Wed", "Fri"]:',
    '    print(day)',
    '    print_warmup()',
    'print("Sunday: long run, 16 km")'
  ];

  const catchCode = [
    'def print_breakfast():',
    '    print("- 50 g oats")',
    '    print("- 1 banana")',
    '',
    'print_breakfast          # only the name',
    'print(print_breakfast)   # the card itself',
    'print_breakfast()        # the call'
  ];
  const nameErr = [
    '$ python3 breakfast.py',
    'Traceback (most recent call last):',
    '  File "breakfast.py", line 1, in <module>',
    '    print_breakfast()',
    '    ^^^^^^^^^^^^^^^',
    "NameError: name 'print_breakfast' is not defined"
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(catchCode, { title: 'brackets.py' })}` +
    code(['print_breakfast()', '', 'def print_breakfast():', '    print("- 50 g oats")'], { title: 'breakfast.py, call before def', bad: [1] }) +
    term(nameErr, 'terminal') + `</div>`;

  COURSE.add({
    id: 'l44', minutes: 11,
    summary: 'A <b>function</b> is a recipe card with a name. You have used Python\'s own cards since lesson 1: <code>print()</code>, <code>len()</code>, <code>input()</code>. Now you write your own. <code>def print_breakfast():</code> starts the card, and the lines <b>pushed in</b> under it are its steps. Writing the card runs nothing. <b>Calling</b> it, <code>print_breakfast()</code> with brackets, runs the steps, as often as you like. So a change goes in <b>one place</b>. Write the card <b>before</b> you call it, and never forget the <code>()</code>.',
    video: {
      src: 'videos/l44-def.mp4', poster: 'videos/l44-def.jpg', length: '1 min 3 s',
      script: [
        'Every morning, Kitchen Coach prints Ben\'s breakfast checklist. Oats, banana, coffee, water.',
        'The program plans 3 mornings, so the same 4 lines are copied 3 times. Monday, Tuesday, Wednesday.',
        'Then Ben asks for peanut butter, for extra protein. You add it to Monday. Then Tuesday. Wednesday is missed, and nobody notices.',
        'The fix is a recipe card. Write def, a name, empty brackets and a colon. The steps go underneath, pushed in. Writing the card cooks nothing yet.',
        'To use it, call it by name, with brackets. Print breakfast, 3 times. Now add peanut butter once, on the card, and every morning gets it.',
        'Two traps. Forget the brackets, and nothing happens. No error at all. Call it before the def line, and Python stops with a name error. Write the card first.',
        'Write the steps once with def. Call them by name whenever you need them.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A function is a recipe card with a name.',
        text: [
          'You have used functions since lesson 1. <code>print()</code>, <code>len()</code>, <code>sorted()</code> and <code>input()</code> are all <b>functions</b>: recipe cards that Python\'s own cooks wrote. You call one by its name and brackets, and its steps run. You never had to see those steps.',
          'Now you write <b>your own</b> card. You give a few steps a <b>name</b>, once. After that, the name alone runs all the steps, as often as you need them.',
          'Kitchen Coach prints Ben\'s breakfast checklist every morning: oats, a banana, coffee and water. That is a perfect card: the same steps, used again and again.'
        ],
        tip: 'This lesson opens Module 4, Functions. The empty brackets will soon hold ingredients, and a card can hand back a dish. That is lesson 45, Parameters and return.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'def writes the card. The call uses it.',
        text: [
          '<b>Line 1</b> starts the card: the word <code>def</code> (short for define), the <b>name</b>, empty <b>brackets</b> <code>()</code> and a <b>colon</b>. It is like <code>if</code> in lesson 19: a line that ends in a colon, with a block pushed in by <b>4 spaces</b> under it. That block is the <b>body</b>, the steps on the card.',
          'Press <b>Run</b>. Python reads from the top. At <code>def</code> it only <b>writes the card down</b>: nothing is printed yet. The first output is <code>Good morning, Ben!</code> from line 7.',
          'Line 8, <code>print_breakfast()</code>, is the <b>call</b>. Python jumps to the card, runs its 4 steps, then comes back and carries on with line 9. Now copy line 8 and paste it at the end, so it is there twice. Run it again: the checklist prints twice.'
        ],
        tip: 'Name a function like a jar (lesson 12): <b>snake_case</b>, small letters and underscores. A jar name says what is inside. A function <b>does</b> something, so start its name with a <b>verb</b>: <code>print_breakfast</code>, <code>show_warmup</code>, <code>count_protein</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Three copies, one change, one missed.',
        text: [
          'Before you knew <code>def</code>, Kitchen Coach planned 3 mornings by <b>copying</b> the 4 checklist lines 3 times. It worked fine.',
          'Then Ben asked for <b>15 g of peanut butter</b> each morning, for extra protein. You added the line to Monday, then to Tuesday... and stopped. Press <b>Run</b>. Wednesday still has the <b>old list</b>.',
          'No error tells you. The program runs, and Ben finds out on Wednesday morning. With 3 copies it is easy to miss one. Real programs print the same thing in 10 or 20 places.'
        ],
        warn: 'Copying lines is the warning sign. When you paste the same lines a second time, stop and ask: should this be a card with a name?'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Write it once. Call it three times.',
        text: [
          'Put the checklist on <b>one card</b>: <code>def print_breakfast():</code> with the 5 steps pushed in under it. Then each morning is one short line: <code>print_breakfast()</code>.',
          'Press <b>Run</b>. All three mornings have peanut butter, because there is only <b>one checklist</b> to change. The 17 lines became 13, and they say what they do.',
          'Now Ben switches from coffee to tea. Change <code>1 coffee</code> to <code>1 tea</code> on the card, <b>once</b>, and run it. Every morning follows.'
        ],
        tip: 'Each call runs the <b>whole</b> card, top to bottom, every time. The card itself never changes when you call it. It is the same card on Monday and on Wednesday.'
      },
      {
        label: 'Try it', pic: run(warmup, { title: 'warmup.py' }),
        h: 'A card inside a loop.',
        text: [
          'Ana does the same warm-up before every run. Here it is on a card, called from a <code>for</code> loop (lesson 26): once for each run day. Press <b>Run</b>.',
          'Change one step on the card, for example 10 lunges to 12, and run it. All three days change. Then add <code>"Sat"</code> to the list of days.',
          'Now write a second card, <code>print_cooldown()</code>, with two steps of your own, like <code>"  5 min walk"</code>. Put its <code>def</code> under the first card, then call it on a new line under <code>print_warmup()</code>, pushed in by 4 spaces so it stays inside the loop.'
        ],
        tip: 'Keep all your <code>def</code> cards at the <b>top</b> of the file, and the code that uses them under them. Then the cards are always written before anyone calls them.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'The name is not the call. And write the card first.',
        text: [
          '<b>Trap 1: no brackets.</b> <code>print_breakfast</code> without <code>()</code> only <b>names</b> the card. It does not call it. Python sees nothing wrong, so there is <b>no error</b>, and nothing happens. Press <b>Run</b>: line 5 prints nothing at all.',
          'Line 6 prints the card itself: <code>&lt;function print_breakfast at 0x...&gt;</code>. The number after <code>at</code> is where the card sits in the computer\'s memory. It changes from run to run and from computer to computer, so yours will differ. When you see this, you forgot the brackets.',
          '<b>Trap 2: calling before the def.</b> Python reads from the top. In <code>breakfast.py</code> below, line 1 asks for <code>print_breakfast</code> before the card is written, so Python stops with <code>NameError: name \'print_breakfast\' is not defined</code>, the same error as a typo (lesson 4). Move the <code>def</code> above the call.'
        ],
        warn: 'A function name with no brackets is the quietest bug in this lesson: no error, no output. If a card "does nothing", look for the missing <code>()</code> first.'
      }
    ],
    exercises: [
      {
        file: 'l44_breakfast_card.py', title: 'The breakfast card',
        task: 'Kitchen Coach prints Ben\'s breakfast checklist for 3 mornings. The checklist is <b>copied 3 times</b>, and Wednesday\'s copy is out of date: no peanut butter. Write the checklist <b>once</b>, as a function called <code>print_breakfast</code>, and call it for each morning.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines the program must print are in the comment at the top.',
          'Run it first and read the hint. Then rewrite the lines between <code>START</code> and <code>END</code>: one <code>def print_breakfast():</code> card with the 5 items, and one call under each day. Save the file.',
          'Run it again. The check runs your function on its own too, and makes sure the items are written only once. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'fill', q: 'Fill the blanks: write a card called <code>print_lunch</code>, then call it.',
        text: '___ print_lunch___\n    print("Bean chili for Ben")\n\nprint_lunch___',
        options: ['def', '():', '()', 'define', ':', 'call'],
        answer: ['def', '():', '()'],
        why: '<code>def print_lunch():</code> writes the card: def, the name, brackets and a colon. <code>print_lunch()</code> calls it: the name and brackets, no colon.',
        hint: 'The first line needs brackets <b>and</b> a colon. The call needs only the brackets.'
      },
      {
        type: 'pick', q: 'What does this program print?',
        pic: code(['def print_dessert():', '    print("Rice pudding for Chloe")', '', 'print("Dinner is ready")'], { title: 'dinner.py' }),
        options: ['Only: Dinner is ready', 'Rice pudding for Chloe, then Dinner is ready', 'Dinner is ready, then Rice pudding for Chloe', "NameError: name 'print_dessert' is not defined"],
        answer: 0,
        why: 'The <code>def</code> only writes the card. Nothing on it runs until someone calls <code>print_dessert()</code>, and nobody does.',
        hint: 'Is <code>print_dessert()</code> ever called?'
      },
      {
        type: 'pick', q: 'How many lines does this print?',
        pic: code(['def print_toast():', '    print("2 slices of gluten-free toast")', '    print("1 spoon of jam")', '', 'print("Chloe\'s breakfast")', 'print_toast()', 'print_toast()'], { title: 'toast.py' }),
        options: ['5', '3', '4', '2'],
        answer: 0,
        why: 'Line 5 prints 1 line. Each call runs the whole card: 2 lines, twice. 1 + 2 + 2 = 5.',
        hint: 'Each call runs every line of the card.'
      },
      {
        type: 'pick', q: 'Back to lesson 26, for loops. How many lines does this print?',
        pic: code(['def print_stretch():', '    print("  stretch for 5 min")', '', 'for day in ["Mon", "Tue", "Wed"]:', '    print(day)', '    print_stretch()', 'print("Rest day")'], { title: 'stretch.py' }),
        options: ['7', '6', '4', '5'],
        answer: 0,
        why: 'The loop runs 3 rounds. Each round prints the day and calls the card, which prints 1 line: 2 lines a round, 6 in all. Then <code>Rest day</code> once, after the loop: 7.',
        hint: 'Count one round of the loop first, then times 3. Is the last line inside the loop?'
      },
      {
        type: 'fix', q: 'This program prints nothing at all, and shows no error. Fix the last line so the checklist prints.',
        code: ['def print_breakfast():', '    print("- 50 g oats")', '    print("- 1 banana")', '', 'print_breakfast'],
        title: 'breakfast.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["- 50 g oats", "- 1 banana"]:',
          '    ok = True',
          'elif "None" in lines:',
          '    msg = "Close. The card already prints. Call it on its own, without print( ) around it. Lesson 45 explains the None."',
          'elif not lines:',
          '    msg = "Still nothing. The name alone does not call the card. What does a call always have after the name?"',
          'else:',
          '    msg = "It should print the 2 checklist lines, once. Keep the card as it was."'
        ].join('\n'),
        why: '<code>print_breakfast()</code>. Without brackets, the name only points at the card. The brackets are what call it.',
        hint: 'Look at how you call <code>print()</code> or <code>len()</code>. What comes after the name?'
      },
      {
        type: 'fix', q: 'Python stops with <code>NameError: name \'print_breakfast\' is not defined</code>. Fix it so the program prints <code>Monday</code>, then the checklist.',
        code: ['print("Monday")', 'print_breakfast()', '', 'def print_breakfast():', '    print("- 50 g oats")', '    print("- 1 banana")'],
        title: 'monday.py',
        check: [
          'lines = out.splitlines()',
          'card = globals().get("print_breakfast")',
          'if not callable(card):',
          '    msg = "Keep the card print_breakfast. Move it, do not delete it."',
          'elif lines == ["Monday", "- 50 g oats", "- 1 banana"]:',
          '    ok = True',
          'else:',
          '    msg = "It printed " + str(len(lines)) + " lines. It should print Monday, then the 2 checklist lines, once."'
        ].join('\n'),
        why: 'Move the 3 lines of the card to the top, above the call. Python reads from the top, so the card must be written before you use it.',
        hint: 'Python reads from the top. At line 2, has it seen the card yet?'
      },
      {
        type: 'bucket', q: 'Which names are good names for your own function?',
        buckets: ['Good name', 'Bad name'],
        items: [
          ['print_breakfast', 0],
          ['show_warmup', 0],
          ['print_shopping_list', 0],
          ['Breakfast', 1],
          ['print-breakfast', 1],
          ['pb', 1],
          ['print', 1],
          ['do_it', 1]
        ],
        why: 'Good names are snake_case and start with a verb that says what the card does. <code>Breakfast</code> breaks the style, <code>print-breakfast</code> is not allowed (the dash is a minus), <code>pb</code> and <code>do_it</code> say nothing, and <code>print</code> hides Python\'s own print (lesson 12).',
        hint: 'Small letters and underscores, a verb first, and never a name Python already has.'
      },
      {
        type: 'type', q: 'The card <code>print_breakfast</code> is written. Type the line that runs it once.',
        prompt: '>>>',
        answers: ['print_breakfast()'],
        why: 'The name, then brackets. The brackets are what turn the name into a call.',
        hint: 'Just the name is not enough.'
      }
    ]
  });
})();
