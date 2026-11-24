/* Lesson 77: enumerate and zip (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l77  enumerate and zip
     ===================================================================== */

  // Chloe's gluten-free pancakes, used by every steps box.
  const stepsList = [
    'steps = [',
    '    "Whisk rice flour and milk",',
    '    "Beat in 2 eggs",',
    '    "Rest the batter 10 minutes",',
    '    "Fry 2 minutes a side",',
    ']',
    ''
  ];
  const badge = (x, y, n, col) =>
    `<circle cx="${x}" cy="${y}" r="13" fill="${col}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 5, String(n), { s: 13, f: P.white, m: true });
  const guestChip = (x, y, name, col, fade) =>
    `<g${fade ? ' opacity="0.4"' : ''}>` + box(x, y, 104, 34, P.white, 10) +
    `<circle cx="${x + 18}" cy="${y + 17}" r="10" fill="${col}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 34, y + 22, name, { s: 13, a: 'start' }) + `</g>`;
  const mealChip = (x, y, meal) => box(x, y, 124, 34, P.warnT, 10) + T(x + 62, y + 22, meal, { s: 12.5 });

  /* ---- The idea: two jobs loops do all the time ---- */
  const ideaPic = svg(600, 290, 'Left: the recipe card for Chloe\'s pancakes. A loop with range(len(steps)) numbered the four steps 0, 1, 2, 3, so the card says Step 0, which is wrong. Right: guests Ana, Ben, Chloe and Dev, and only three meals. Pairing them with guests[i] and meals[i] works three times, then meals[3] does not exist: IndexError.',
    T(150, 22, 'NUMBER THE STEPS', { s: 12.5, f: P.accent }) +
    box(20, 36, 260, 200, P.white, 16) +
    T(150, 62, "Chloe's pancakes", { s: 14 }) +
    ['Whisk rice flour and milk', 'Beat in 2 eggs', 'Rest the batter 10 min', 'Fry 2 minutes a side'].map((s, i) =>
      badge(48, 92 + i * 38, i, P.danger) + T(70, 97 + i * 38, s, { s: 12.5, w: 700, a: 'start' })).join('') +
    box(70, 246, 160, 32, P.dangerT, 10) + T(150, 267, 'Step 0? Wrong.', { s: 13, f: P.danger }) +
    T(450, 22, 'PAIR THE GUESTS', { s: 12.5, f: P.ok }) +
    [['Ana', P.accent, 'pasta'], ['Ben', P.ok, 'bean chili'], ['Chloe', P.danger, 'pancakes'], ['Dev', P.warn, null]].map((g, i) => {
      const y = 40 + i * 50;
      return guestChip(318, y, g[0], g[1]) + T(436, y + 22, 'i = ' + i, { s: 11.5, w: 700, f: P.ink2, m: true }) +
        (g[2] ? mealChip(462, y, g[2])
          : `<rect x="462" y="${y}" width="124" height="34" rx="10" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` + T(524, y + 22, 'meals[3]?', { s: 12, m: true, f: P.danger }));
    }).join('') +
    box(330, 246, 250, 32, P.dangerT, 10) + T(455, 267, 'IndexError', { s: 13, m: true, f: P.danger }));
  const offByOne = [
    ...stepsList,
    'for i in range(len(steps)):',
    '    print(f"Step {i}: {steps[i]}")'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(offByOne, { title: 'off_by_one.py' })}</div>`;

  /* ---- The code: enumerate ---- */
  const pancakes = [
    ...stepsList,
    'for number, step in enumerate(steps, start=1):',
    '    print(f"Step {number}: {step}")',
    '',
    'print(list(enumerate(["whisk", "fry"])))',
    'print(list(enumerate(["whisk", "fry"], start=1)))'
  ];
  const enumSvg = svg(600, 170, 'enumerate(steps, start=1) hands the loop one pair per round: (1, "Whisk rice flour and milk"), then (2, "Beat in 2 eggs"), and so on. for number, step in ... unpacks each pair into two names, number and step.',
    box(10, 54, 120, 48, P.white, 12) + T(70, 84, 'steps', { s: 14, m: true }) +
    arrow(136, 78, 172, 78, P.ink2, 2.5) +
    box(176, 40, 150, 76, P.tint, 12) + T(251, 72, 'enumerate', { s: 14, m: true, f: P.accent }) + T(251, 96, 'start=1', { s: 12.5, m: true, f: P.ink2 }) +
    arrow(332, 78, 368, 78, P.ink2, 2.5) +
    box(372, 12, 218, 36, P.okT, 10) + T(481, 35, '(1, "Whisk rice...")', { s: 12, m: true, f: P.ok }) +
    box(372, 60, 218, 36, P.okT, 10) + T(481, 83, '(2, "Beat in 2 eggs")', { s: 12, m: true, f: P.ok }) +
    T(481, 120, '... one pair per round', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 158, 'for number, step in ...  splits each pair into two names (lesson 36)', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(pancakes, { title: 'pancakes.py' })}${enumSvg}</div>`;

  /* ---- The pain: pairing two lists by index ---- */
  const pairsBad = [
    'guests = ["Ana", "Ben", "Chloe", "Dev"]   # Dev too',
    'meals = ["pasta", "bean chili", "pancakes"]',
    '',
    'for i in range(len(guests)):',
    '    print(f"{guests[i]}: {meals[i]}")'
  ];
  const painTerm = term([
    '$ python3 pairs.py',
    'Ana: pasta',
    'Ben: bean chili',
    'Chloe: pancakes',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/pairs.py", line 5, in <module>',
    '    print(f"{guests[i]}: {meals[i]}")',
    '                          ~~~~~^^^',
    'IndexError: list index out of range'
  ], 'terminal, Python 3.15');
  const painPic = `<div style="width:100%;min-width:0">${run(pairsBad, { title: 'pairs.py' })}${painTerm}</div>`;

  /* ---- The fix: zip ---- */
  const placeCards = [
    'guests = ["Ana", "Ben", "Chloe"]',
    'meals = ["pasta", "bean chili", "pancakes"]',
    'kcal = [2600, 2400, 2000]',
    '',
    'for guest, meal in zip(guests, meals):',
    '    print(f"{guest}: {meal}")',
    '',
    'print(list(zip(guests, meals)))',
    '',
    'targets = dict(zip(guests, kcal))',
    'print(targets)',
    'print(targets["Chloe"])'
  ];
  const zipSvg = svg(600, 200, 'zip(guests, meals) works like a zipper. It takes the first guest and the first meal, then the second of each, then the third, and hands the loop one pair at a time: (Ana, pasta), (Ben, bean chili), (Chloe, pancakes).',
    T(70, 22, 'guests', { s: 12.5, f: P.accent, m: true }) + T(530, 22, 'meals', { s: 12.5, f: P.ok, m: true }) +
    [['Ana', P.accent, 'pasta'], ['Ben', P.ok, 'bean chili'], ['Chloe', P.danger, 'pancakes']].map((g, i) => {
      const y = 36 + i * 52;
      return guestChip(18, y, g[0], g[1]) + mealChip(468, y, g[2]) +
        arrow(128, y + 17, 186, y + 17, P.ink2, 2) + arrow(462, y + 17, 414, y + 17, P.ink2, 2) +
        box(192, y, 216, 34, P.okT, 10) + T(300, y + 22, `("${g[0]}", "${g[2]}")`, { s: 12, m: true, f: P.ok });
    }).join('') +
    T(300, 194, 'first with first, second with second: one pair per round', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${run(placeCards, { title: 'place_cards.py' })}${zipSvg}</div>`;

  /* ---- Try it: three lists, and enumerate around zip ---- */
  const dinner = [
    'guests = ["Ana", "Ben", "Chloe"]',
    'meals = ["pasta", "bean chili", "pancakes"]',
    'kcal = [2600, 2400, 2000]',
    '',
    'for guest, meal, target in zip(guests, meals, kcal):',
    '    print(f"{guest}: {meal}, {target} kcal a day")',
    '',
    'for seat, (guest, meal) in enumerate(zip(guests, meals), start=1):',
    '    print(f"Seat {seat}: {guest} gets {meal}")'
  ];

  /* ---- The catch: zip stops at the shortest list, quietly ---- */
  const devBox = [
    'guests = ["Ana", "Ben", "Chloe", "Dev"]',
    'meals = ["pasta", "bean chili", "pancakes"]',
    '',
    'for guest, meal in zip(guests, meals):',
    '    print(f"{guest}: {meal}")',
    'print("All cards printed. Where is Dev?")',
    'print()',
    '',
    'for guest, meal in zip(guests, meals, strict=True):',
    '    print(f"{guest}: {meal}")'
  ];
  const catchSvg = svg(600, 166, 'Four guests, three meals. Plain zip stops at the shortest list: Ana, Ben and Chloe get a card, and Dev is dropped with no error. zip with strict=True notices that one list ran out first and stops with ValueError: zip() argument 2 is shorter than argument 1.',
    [['Ana', P.accent], ['Ben', P.ok], ['Chloe', P.danger], ['Dev', P.warn]].map((g, i) =>
      guestChip(14 + i * 112, 14, g[0], g[1], i === 3)).join('') +
    `<rect x="344" y="8" width="116" height="48" rx="14" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    box(476, 16, 110, 32, P.dangerT, 10) + T(531, 37, 'dropped', { s: 13, f: P.danger }) +
    T(14, 86, 'zip(guests, meals)', { s: 13, m: true, a: 'start' }) + T(300, 86, '3 cards, Dev missing, no error', { s: 12.5, w: 700, a: 'start', f: P.warn }) +
    T(14, 118, 'zip(..., strict=True)', { s: 13, m: true, a: 'start', f: P.accent }) + T(300, 118, 'ValueError: you hear about it', { s: 12.5, w: 700, a: 'start', f: P.ok }) +
    T(300, 156, 'Same length on purpose? Say so with strict=True.', { s: 12.5, w: 700, f: P.ink2 }));
  const catchPic = `<div style="width:100%;min-width:0">${catchSvg}${run(devBox, { title: 'dev.py' })}</div>`;

  COURSE.add({
    id: 'l77', minutes: 12,
    summary: '<code>enumerate(steps, start=1)</code> hands a loop <b>a number and an item</b> each round: <code>for number, step in enumerate(steps, start=1):</code>. No <code>range(len(...))</code>, no <code>steps[i]</code>, no "Step 0". <code>zip(guests, meals)</code> walks two lists <b>side by side</b>, like a zipper: first with first, second with second. <code>dict(zip(guests, kcal))</code> builds a dict from two lists. The catch: zip <b>stops at the shortest list and says nothing</b>, so a fourth guest with no meal is quietly dropped. When the lists must be the same length, write <code>zip(guests, meals, strict=True)</code>, and a short list stops with <code>ValueError: zip() argument 2 is shorter than argument 1</code>.',
    video: {
      src: 'videos/l77-enumerate-and-zip.mp4', poster: 'videos/l77-enumerate-and-zip.jpg', length: '1 min 8 s',
      script: [
        'Chloe\'s gluten-free pancakes. 4 steps on the recipe card. Kitchen Coach prints them with a loop over range of len. Step 0? Nobody cooks step 0. Every number is 1 too low.',
        'Python has a tool for this. Enumerate. It hands the loop two things at once: a number, and the step. Say start equals 1, and the steps are numbered 1, 2, 3, 4.',
        'Now the place cards. 3 guests, and 3 plates. Zip pairs them up, side by side, like the teeth of a zipper. Ana gets pasta. Ben gets bean chili. Chloe gets pancakes.',
        'Then Dev texts. He is coming too. 4 guests, but still 3 plates. Zip stops at the shortest list, and says nothing. No error. Dev is simply dropped.',
        'So add strict equals true. Now a missing plate is loud. Value error. Zip argument 2 is shorter than argument 1.',
        'Enumerate numbers things. Zip pairs things.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'Number the steps. Pair the guests.',
        text: [
          'Two jobs come up in almost every kitchen program. <b>Number things</b>: Chloe\'s gluten-free pancakes have 4 steps, and the card should say Step 1 to Step 4. And <b>pair things</b>: Ana, Ben and Chloe each get a meal, so the first guest goes with the first meal, the second with the second.',
          'With what you know so far, both jobs need positions. Lesson 27 showed <code>range(len(...))</code>, and lesson 32 showed <code>steps[i]</code>. Press <b>Run</b> on <code>off_by_one.py</code>. It prints <code>Step 0: Whisk rice flour and milk</code>. Positions start at 0, but people count from 1, so every number is <b>one too low</b>.',
          'You could write <code>i + 1</code>. It works, but now there are three things to get right: the range, the <code>[i]</code> and the <code>+ 1</code>. Python has two small tools that do these jobs for you: <code>enumerate</code> numbers things, and <code>zip</code> pairs things.'
        ],
        tip: 'Lesson 35 warned you about <code>range(len(...))</code>: it invites an off-by-one. Today you meet the clean way out.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'enumerate: a number and the item, every round.',
        text: [
          '<code>enumerate(steps, start=1)</code> walks the list and hands the loop <b>two things</b> each round: a number and the item. <code>for number, step in ...</code> catches them in two names. That is the unpacking from lesson 36, the same trick as <code>for item, grams in pantry.items():</code> in lesson 38. Lesson 78, Unpacking, goes deeper.',
          'Press <b>Run</b>: <code>Step 1</code> to <code>Step 4</code>, with no <code>[i]</code> and no <code>+ 1</code>. The two last lines peek inside with <code>list()</code>, as lesson 27 did for range. Each round is a <b>tuple</b> (lesson 36): <code>[(0, \'whisk\'), (1, \'fry\')]</code>.',
          'Without <code>start</code>, enumerate counts from <b>0</b>, like positions do. Delete <code>, start=1</code> from the loop and run it again: Step 0 is back. Then try <code>start=10</code>.'
        ],
        tip: 'The names are yours. <code>for i, step in ...</code> works the same. Pick names that read well: <code>for number, step</code>, <code>for rank, dish</code>, <code>for seat, guest</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Pairing by position breaks when the lists differ.',
        text: [
          'Kitchen Coach prints a place card for each guest. The old way loops over positions and reads both lists: <code>guests[i]</code> and <code>meals[i]</code>.',
          'Then Dev texts: he is coming too. You add him to <code>guests</code>, but nobody has planned his meal yet. Press <b>Run</b>. Three cards print, then round 4 asks for <code>meals[3]</code>, and there is no fourth meal: <code>IndexError: list index out of range</code> (lesson 32).',
          'The loop only counts over <code>guests</code>. It has no idea that <code>meals</code> is a different list with its own length. Every line with <code>[i]</code> is a place where the two lists can drift apart.'
        ],
        warn: 'Swap the lists the other way (more meals than guests) and you get no error at all. The extra meal is silently never printed. Two lists, two lengths, one index: that is a trap either way.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'zip: walk two lists side by side.',
        text: [
          '<code>zip(guests, meals)</code> works like a zipper. Each round it takes <b>one item from each list</b>, at the same position, and hands them over as a pair: <code>("Ana", "pasta")</code>, then <code>("Ben", "bean chili")</code>, then <code>("Chloe", "pancakes")</code>. <code>for guest, meal in ...</code> unpacks each pair. No <code>range</code>, no <code>[i]</code>.',
          'Press <b>Run</b>. The <code>list(zip(...))</code> line shows the pairs it made, as tuples. Then the last three lines build Kitchen Coach\'s calorie targets: <code>dict()</code> can build a dictionary (lesson 37) from pairs: the first item of each pair becomes a key, the second its value. So <code>dict(zip(guests, kcal))</code> gives <code>{\'Ana\': 2600, \'Ben\': 2400, \'Chloe\': 2000}</code>. Two lists in, one dict out.',
          'Now change it: add a fourth list, <code>drinks = ["water", "milk", "tea"]</code>, and pair it in too: <code>for guest, meal, drink in zip(guests, meals, drinks):</code>. zip takes as many lists as you like.'
        ],
        tip: 'Like range (lesson 27), zip and enumerate are <b>lazy</b>: they make each pair when the loop asks for it. <code>print(zip(guests, meals))</code> only shows <code>&lt;zip object at 0x...&gt;</code>. Wrap it in <code>list()</code> to peek.'
      },
      {
        label: 'Try it', pic: run(dinner, { title: 'dinner_cards.py' }),
        h: 'Three lists, and a seat number too.',
        text: [
          'The first loop zips <b>three</b> lists: each guest, their meal and their calorie target for the day. Press <b>Run</b>.',
          'The second loop <b>combines</b> both tools: <code>enumerate(zip(guests, meals), start=1)</code>. zip makes the pairs, and enumerate numbers them. Each round is then a number and a pair, so the names say the same shape: <code>seat, (guest, meal)</code>, with brackets around the pair. Lesson 78, Unpacking, explains those brackets fully.',
          'Change it: add dessert to every card. Add <code>desserts = ["fruit", "yogurt", "brownie"]</code>, so Chloe\'s card says <code>Seat 3: Chloe gets pancakes, then brownie</code>. Hint: add <code>desserts</code> into the <code>zip</code>, and a name for it inside the brackets.'
        ],
        tip: 'Read <code>for seat, (guest, meal) in enumerate(zip(...))</code> from the inside out: zip pairs, enumerate numbers the pairs.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'zip stops at the shortest list, quietly.',
        text: [
          'Back to Dev. With 4 guests and 3 meals, plain <code>zip</code> does <b>not</b> crash. It stops as soon as the <b>shortest</b> list runs out. Press <b>Run</b>: Ana, Ben and Chloe get cards, and Dev is simply <b>dropped</b>. No error, no warning. Dev sits down to an empty table.',
          'When the lists <b>must</b> be the same length, say so: <code>zip(guests, meals, strict=True)</code>. It pairs exactly as before, and when one list runs out before the other it stops with <code>ValueError: zip() argument 2 is shorter than argument 1</code>. "Argument 2" is <code>meals</code>, the second list you gave it.',
          'Look at the output: the three cards print <b>before</b> the error. zip only notices at the end, when it asks <code>meals</code> for a fourth item. So in Kitchen Coach, check before you print anything you cannot take back, or catch the <code>ValueError</code> with <code>try</code> (lesson 53).'
        ],
        warn: 'Next lesson, 78 Unpacking, opens up the <code>a, b = pair</code> trick you used all lesson: <code>*rest</code>, swapping two values, and unpacking inside loops.'
      }
    ],
    exercises: [
      {
        file: 'l77_dinner_cards.py', title: 'Dinner cards',
        task: 'Finish three functions for Kitchen Coach. <code>numbered_steps</code> returns the pancake steps numbered from 1 with <code>enumerate</code>. <code>place_cards</code> returns a card like <code>Ana: pasta</code> for each guest with <code>zip(..., strict=True)</code>, so a guest with no meal raises <code>ValueError</code>. <code>calorie_targets</code> returns a dict built with <code>dict(zip(...))</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The starter uses <code>range(len(...))</code>, so the check finds Step 0 first.',
          'Between <code>START</code> and <code>END</code>, rewrite each function with <code>enumerate</code> or <code>zip</code>. Run it after each one.',
          'Run it until it says <code>PASS</code>. The check also tries 4 guests with 3 meals: your <code>place_cards</code> must stop with a <code>ValueError</code>, not drop Dev.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['for i, dish in enumerate(["soup", "pasta"]):', '    print(i, dish)'], { title: 'menu.py' }),
        options: ['0 soup, then 1 pasta', '1 soup, then 2 pasta', '(0, \'soup\'), then (1, \'pasta\')', 'soup, then pasta'],
        answer: 0,
        why: 'With no <code>start</code>, enumerate counts from 0, like positions. <code>for i, dish</code> unpacks each pair, so <code>print</code> gets two separate values.',
        hint: 'Is there a start=1?'
      },
      {
        type: 'pick', q: 'Three guests, two drinks. What does this print?',
        pic: code(['guests = ["Ana", "Ben", "Chloe"]', 'drinks = ["water", "milk"]', '', 'for guest, drink in zip(guests, drinks):', '    print(guest, drink)'], { title: 'drinks.py' }),
        options: ['Ana water, Ben milk, and nothing for Chloe', 'Ana water, Ben milk, Chloe None', 'IndexError: list index out of range', 'ValueError: zip() argument 2 is shorter than argument 1'],
        answer: 0,
        why: 'Plain zip stops at the shortest list, with no error. Chloe is quietly left out. Only <code>strict=True</code> would raise the ValueError.',
        hint: 'Is there a strict=True?'
      },
      {
        type: 'fix', q: 'The card starts at Step 0. Make it print <code>Step 1</code> to <code>Step 3</code>, using <code>enumerate</code>.',
        code: ['steps = ["Whisk rice flour and milk", "Beat in 2 eggs", "Fry 2 minutes a side"]', '', 'for i in range(len(steps)):', '    print(f"Step {i}: {steps[i]}")'],
        title: 'steps.py',
        check: [
          'want = ["Step 1: Whisk rice flour and milk", "Step 2: Beat in 2 eggs", "Step 3: Fry 2 minutes a side"]',
          'lines = out.strip().splitlines()',
          'if lines == want:',
          '    ok = True',
          'elif lines and lines[0].startswith("Step 0"):',
          '    msg = "Still Step 0. Give enumerate a start: enumerate(steps, start=1)."',
          'else:',
          '    msg = "It should print 3 lines, Step 1: Whisk rice flour and milk first."'
        ].join('\n'),
        why: '<code>for number, step in enumerate(steps, start=1):</code> then <code>print(f"Step {number}: {step}")</code>. No range, no <code>[i]</code>, no <code>+ 1</code>.',
        hint: 'Two names after for: one for the number, one for the step.'
      },
      {
        type: 'fix', q: 'Build <code>targets</code> from the two lists, so it prints <code>{\'Ana\': 2600, \'Ben\': 2400, \'Chloe\': 2000}</code>. One line is enough.',
        code: ['guests = ["Ana", "Ben", "Chloe"]', 'kcal = [2600, 2400, 2000]', '', 'targets = {}       # build it here', 'print(targets)'],
        title: 'targets.py',
        check: [
          'want = {"Ana": 2600, "Ben": 2400, "Chloe": 2000}',
          'if targets == want and out.strip() == str(want):',
          '    ok = True',
          'elif targets == {}:',
          '    msg = "targets is still empty. Try targets = dict(zip(guests, kcal))."',
          'else:',
          '    msg = "targets should be " + str(want) + ". Names are the keys, calories the values."'
        ].join('\n'),
        why: '<code>targets = dict(zip(guests, kcal))</code>. zip makes the pairs <code>("Ana", 2600)</code> and so on, and <code>dict()</code> turns each pair into a key and its value.',
        hint: 'zip pairs the lists. Which built-in turns pairs into a dictionary?'
      },
      {
        type: 'match', q: 'Match each line to what it gives.',
        pairs: [
          ['list(enumerate(["a", "b"]))', '<code>[(0, \'a\'), (1, \'b\')]</code>'],
          ['list(enumerate(["a", "b"], start=1))', '<code>[(1, \'a\'), (2, \'b\')]</code>'],
          ['list(zip(["a", "b"], [5, 6]))', '<code>[(\'a\', 5), (\'b\', 6)]</code>'],
          ['dict(zip(["a", "b"], [5, 6]))', '<code>{\'a\': 5, \'b\': 6}</code>'],
          ['list(zip(["a", "b", "c"], [5]))', '<code>[(\'a\', 5)]</code>']
        ],
        why: 'enumerate puts the number first and counts from 0 unless you give a start. zip pairs by position and stops at the shortest list. dict() turns pairs into keys and values.',
        hint: 'Look at what comes first in each pair, and at how long the shortest list is.'
      },
      {
        type: 'pick', q: 'Dev has no meal yet. What happens?',
        pic: code(['guests = ["Ana", "Ben", "Chloe", "Dev"]', 'meals = ["pasta", "bean chili", "pancakes"]', '', 'for guest, meal in zip(guests, meals, strict=True):', '    print(f"{guest}: {meal}")'], { title: 'cards.py' }),
        options: ['Three cards print, then ValueError: zip() argument 2 is shorter than argument 1', 'ValueError straight away, before any card prints', 'Three cards print and Dev is quietly dropped', 'IndexError: list index out of range'],
        answer: 0,
        why: 'strict=True pairs exactly like zip. It only finds out that <code>meals</code> is short when it asks for a fourth meal, after three cards have printed. Then it stops loudly.',
        hint: 'When does zip find out that meals ran out?'
      },
      {
        type: 'pick', q: 'Back to lesson 27. <code>steps</code> has 4 items. Which <code>range</code> gives the same numbers that <code>enumerate(steps, start=1)</code> puts in front of them?',
        options: ['range(1, 5)', 'range(1, 4)', 'range(4)', 'range(0, 5)'],
        answer: 0,
        why: 'enumerate gives 1, 2, 3, 4. range never includes its stop, so it needs <code>range(1, 5)</code>. With enumerate you never have to work that out.',
        hint: 'range stops just before its second number.'
      },
      {
        type: 'bucket', q: 'Which tool fits the job?',
        buckets: ['enumerate', 'zip'],
        items: [
          ['print the recipe steps as Step 1, Step 2, ...', 0],
          ['rank the dishes 1, 2, 3 by protein', 0],
          ['number the guests\' seats around the table', 0],
          ['give each guest the meal at the same position', 1],
          ['build a dict from a list of names and a list of calories', 1],
          ['walk a list of dishes and a list of protein grams together', 1]
        ],
        why: 'One list that needs numbers: enumerate. Two or more lists that belong together, position by position: zip.',
        hint: 'Count the lists: one list plus numbers, or two lists side by side?'
      }
    ]
  });
})();
