/* Lesson 49: Small functions (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l49  Small functions
     ===================================================================== */

  const DATA = [
    'MENU = ["pasta", "chili", "chicken", "salad", "pudding"]',
    'PROTEIN = {"pasta": 13, "chili": 18, "chicken": 31, "salad": 3, "pudding": 6}',
    'KCAL = {"pasta": 380, "chili": 260, "chicken": 165, "salad": 90, "pudding": 250}',
    'HAS = {"pasta": "gluten", "chicken": "meat"}'
  ];

  // One small recipe card with a coloured edge. Used in the pictures.
  const mini = (x, y, w, name, col) =>
    box(x, y, w, 40, P.white, 10) +
    `<rect x="${x}" y="${y}" width="12" height="40" rx="4" fill="${col}"/>` +
    T(x + 24, y + 26, name, { s: 13.5, m: true, f: P.accent, a: 'start' });

  const ideaPic = svg(600, 330, 'Left: one big crumpled recipe card called plan_dinner. It picks the safe foods AND adds up the protein AND adds up the kcal AND prints the menu: four jobs on one card. A pair of scissors cuts it. Right: four small cards, pick_safe, count_protein, count_kcal and format_menu, each with one job, and a short plan_dinner card that just calls them.',
    `<g transform="rotate(-3 140 165)">` + box(20, 38, 240, 250, P.warnT, 14) +
    T(140, 70, 'plan_dinner()', { s: 16, m: true }) +
    `<line x1="36" y1="84" x2="244" y2="84" stroke="${P.ink}" stroke-width="2"/>` +
    T(140, 116, 'picks the safe foods', { s: 13.5, w: 700 }) +
    T(140, 148, 'AND adds up protein', { s: 13.5, w: 700, f: P.danger }) +
    T(140, 180, 'AND adds up kcal', { s: 13.5, w: 700, f: P.danger }) +
    T(140, 212, 'AND prints the menu', { s: 13.5, w: 700, f: P.danger }) +
    `<path d="M40 236 q40 -18 80 0 t80 0 t40 -6" fill="none" stroke="${P.sand}" stroke-width="3"/>` +
    T(140, 266, 'four jobs, one card', { s: 12.5, w: 700, f: P.ink2 }) + `</g>` +
    // scissors
    `<g transform="translate(272 136)"><circle cx="8" cy="10" r="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="8" cy="34" r="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><path d="M14 14 L44 30 M14 30 L44 14" stroke="${P.ink}" stroke-width="3.5" stroke-linecap="round"/></g>` +
    T(296, 200, 'split', { s: 12.5, f: P.accent }) +
    mini(336, 16, 248, 'pick_safe()', P.accent) +
    mini(336, 66, 248, 'count_protein()', P.ok) +
    mini(336, 116, 248, 'count_kcal()', P.warn) +
    mini(336, 166, 248, 'format_menu()', P.danger) +
    box(336, 222, 248, 74, P.okT, 12) +
    T(460, 248, 'plan_dinner()', { s: 14, m: true }) +
    T(460, 274, 'just calls the 4 cards', { s: 12.5, w: 700, f: P.ink2 }) +
    T(460, 322, 'one card, one job', { s: 12.5, w: 700, f: P.ok }));

  // The code: the long card that works.
  const big = DATA.concat([
    'GUESTS = {"Ana": set(), "Ben": {"meat"}, "Chloe": {"gluten"}}',
    '',
    'def plan_dinner(guests):',
    '    for name, avoid in guests.items():',
    '        safe = []',
    '        for food in MENU:',
    '            if HAS.get(food) not in avoid:',
    '                safe.append(food)',
    '        protein = 0',
    '        kcal = 0',
    '        for food in safe:',
    '            protein += PROTEIN[food]',
    '            kcal += KCAL[food]',
    '        foods = ", ".join(safe)',
    '        print(f"{name}: {foods} ({protein} g protein, {kcal} kcal)")',
    '',
    'plan_dinner(GUESTS)'
  ]);

  // The pain.
  const bugCard = [
    'def plan_dinner(guests):',
    '    for name, avoid in guests.items():',
    '        safe = []',
    '        for food in MENU:',
    '            if HAS.get(food) not in avoid:',
    '                safe.append(food)',
    '        protein = 0',
    '        kcal = 0',
    '        for food in safe:',
    '            protein = PROTEIN[food]',
    '            kcal += KCAL[food]',
    '        foods = ", ".join(safe)',
    '        print(f"{name}: {foods} ({protein} g protein, {kcal} kcal)")',
    '',
    'plan_dinner(GUESTS)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(['chloe_kcal = plan_dinner({"Chloe": {"gluten"}})', 'print(chloe_kcal)'], { title: 'chloe_app.py, Chloe wants a number', bad: [1] }) +
    term(['$ python3 chloe_app.py', 'Chloe: chili, chicken, salad, pudding (58 g protein, 765 kcal)', 'None'], 'terminal') +
    code(bugCard, { title: 'kitchen_coach.py, a week later (one character is missing)' }) +
    term(['$ python3 kitchen_coach.py', 'Ana: pasta, chili, chicken, salad, pudding (6 g protein, 1145 kcal)', 'Ben: pasta, chili, salad, pudding (6 g protein, 980 kcal)', 'Chloe: chili, chicken, salad, pudding (6 g protein, 765 kcal)'], 'terminal') + `</div>`;

  // The fix: small cards, and a short plan_dinner.
  const fixed = DATA.concat([
    '',
    'def pick_safe(foods, avoid):',
    '    """Return the foods with nothing from the avoid set."""',
    '    safe = []',
    '    for food in foods:',
    '        if HAS.get(food) not in avoid:',
    '            safe.append(food)',
    '    return safe',
    '',
    'def count_protein(foods):',
    '    """Return the grams of protein in these foods."""',
    '    total = 0',
    '    for food in foods:',
    '        total += PROTEIN[food]',
    '    return total',
    '',
    'def count_kcal(foods):',
    '    """Return the kcal in these foods."""',
    '    total = 0',
    '    for food in foods:',
    '        total += KCAL[food]',
    '    return total',
    '',
    'def format_menu(name, foods, protein, kcal):',
    '    """Return one guest\'s menu as one line of text."""',
    '    dishes = ", ".join(foods)',
    '    return f"{name}: {dishes} ({protein} g protein, {kcal} kcal)"',
    '',
    'def plan_dinner(guests):',
    '    """Print tonight\'s menu for every guest."""',
    '    for name, avoid in guests.items():',
    '        safe = pick_safe(MENU, avoid)',
    '        protein = count_protein(safe)',
    '        kcal = count_kcal(safe)',
    '        print(format_menu(name, safe, protein, kcal))',
    '',
    'plan_dinner({"Ana": set(), "Ben": {"meat"}, "Chloe": {"gluten"}})',
    'print(count_kcal(pick_safe(MENU, {"gluten"})))'
  ]);

  const andPic = svg(600, 150, 'The "and" test. Describe the card in one sentence. plan_dinner: picks the safe foods and adds up protein and adds up kcal and prints the menu. Three ands: split it. count_kcal: returns the kcal in these foods. No and: one job, keep it.',
    box(20, 14, 560, 56, P.dangerT, 12) +
    T(36, 39, 'plan_dinner: picks safe foods AND adds protein', { s: 13.5, w: 700, a: 'start' }) +
    T(36, 59, 'AND adds kcal AND prints the menu.', { s: 13.5, w: 700, a: 'start' }) +
    T(562, 49, 'split it', { s: 13.5, f: P.danger, a: 'end' }) +
    box(20, 84, 560, 50, P.okT, 12) +
    T(36, 114, 'count_kcal: returns the kcal in these foods.', { s: 13.5, w: 700, a: 'start' }) +
    T(562, 114, 'one job', { s: 13.5, f: P.ok, a: 'end' }));

  // Try it: check one card on its own.
  const check = [
    'PROTEIN = {"pasta": 13, "chili": 18, "chicken": 31, "salad": 3, "pudding": 6}',
    '',
    'def count_protein(foods):',
    '    """Return the grams of protein in these foods."""',
    '    total = 0',
    '    for food in foods:',
    '        total = PROTEIN[food]',
    '    return total',
    '',
    '# Check the card with tiny examples you can add up in your head.',
    'print(count_protein(["chili", "salad"]))         # want 21',
    'print(count_protein(["chili", "salad"]) == 21)   # want True',
    'print(count_protein([]) == 0)                    # want True'
  ];

  // The catch: too small.
  const tiny = [
    'def get_kcal(food):',
    '    return KCAL[food]',
    '',
    'def add(a, b):',
    '    return a + b',
    '',
    'def count_kcal(foods):',
    '    total = 0',
    '    for food in foods:',
    '        total = add(total, get_kcal(food))',
    '    return total'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(tiny, { title: 'too_small.py, cut too far', bad: [1, 4] }) +
    code(['def count_kcal(foods):', '    """Return the kcal in these foods."""', '    total = 0', '    for food in foods:', '        total += KCAL[food]', '    return total'], { title: 'just_right.py', good: [5] }) + `</div>`;

  COURSE.add({
    id: 'l49', minutes: 12,
    summary: 'When one function does many jobs, <b>split it into small cards</b>: <b>one function, one job</b>. The test: describe it in one sentence. If you need the word <b>"and"</b>, split it. Give each card a name that says its job, like <code>count_kcal</code>, and let it <b>return</b> its answer instead of printing it. Then the big card becomes a few <b>calls</b>, any card can be <b>reused</b> on its own (<code>count_kcal(pick_safe(MENU, {"gluten"}))</code> is Chloe\'s number), and each card can be <b>checked</b> with a tiny example you can add up in your head.',
    video: {
      src: 'videos/l49-small-functions.mp4', poster: 'videos/l49-small-functions.jpg', length: '1 min 7 s',
      script: [
        'Kitchen Coach has one big recipe card now. Plan dinner. It picks the safe foods, adds up protein and calories, and prints the menu. Four jobs on one card.',
        'Chloe wants her calories as a number, for her app. But this card only prints, and hands back None. To get the number, you would copy half the card.',
        'And a bug hides in the middle. Ben gets 6 grams of protein. Which line is wrong?',
        'So cut the card up. If you need the word "and" to say what it does, split it. Pick safe. Count protein. Count kcal. Format menu. One job each, and each returns its answer.',
        'Now plan dinner is just 4 calls.',
        'Chloe\'s number is one call. 765.',
        'Check each card on its own. Chili and salad should be 21 grams. It says 3. The bug is in this tiny card. Plus equals. Fixed.',
        'One card, one dish. Small functions are easy to read, reuse and check.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One card, one job.',
        text: [
          'Kitchen Coach has grown. One recipe card, <code>plan_dinner</code>, now does <b>four jobs</b> for every guest: it picks the foods they can eat, adds up the protein, adds up the calories, and prints the menu.',
          'It works. But nothing inside it can be used <b>on its own</b>. Chloe wants only her calories, as a number, for her phone app. The number is in there, somewhere in the middle, and the card never hands it back.',
          'The fix is the kitchen rule you already follow: <b>one card, one dish</b>. Split the big card into <b>small functions</b>, each with <b>one job</b>, a clear name and a <code>return</code>. Then the big card just calls them, in order.'
        ],
        tip: 'A quick test for any function: say what it does in one sentence. If you need the word <b>"and"</b>, it does more than one job. Split it.'
      },
      {
        label: 'The code', pic: run(big, { title: 'kitchen_coach.py' }),
        h: 'One long card that works.',
        text: [
          'Lines 1 to 4 are the kitchen data, in CAPITALS because they never change (lesson 12). <code>MENU</code> is tonight\'s dishes. <code>PROTEIN</code> and <code>KCAL</code> give grams of protein and kcal per serving. <code>HAS</code> says what a dish contains. Line 5 says what each guest must avoid: Ben eats no meat, Chloe no gluten. <code>set()</code> is an empty set: Ana avoids nothing (lesson 39).',
          'Lines 9 to 12 pick the safe foods. <code>HAS.get(food)</code> hands back <code>"gluten"</code>, <code>"meat"</code> or <code>None</code> for a dish with nothing in it (lesson 38). A dish stays if that is <b>not in</b> the guest\'s avoid set.',
          'Lines 13 to 17 add up protein and kcal in one loop. Line 18, <code>", ".join(safe)</code>, glues the list into one text with a comma and a space between the items. Line 19 prints the menu. Press <b>Run</b>.',
          'Now change Chloe\'s avoid set on line 5 to <code>{"gluten", "meat"}</code> and run it again. The chicken leaves her plate: 27 g protein, 600 kcal.'
        ],
        tip: 'Count the jobs in lines 8 to 19: <b>pick</b>, <b>add protein</b>, <b>add kcal</b>, <b>print</b>. They are all welded together inside one loop.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'You cannot reuse it, and you cannot check it.',
        text: [
          '<b>Pain 1: Chloe wants a number.</b> Her app needs her kcal, 765, to add to her day. But <code>plan_dinner</code> only <b>prints</b>. It has no <code>return</code>, so it hands back <code>None</code> (lesson 45), and it prints a menu line she did not ask for. To get the number, you would have to <b>copy</b> the filter loop and the adding loop into a new card. Two copies of the same steps, and every later fix has to be made twice.',
          '<b>Pain 2: a bug hides in the middle.</b> A week later, a small edit loses one character. Now everyone gets <b>6 g</b> of protein, and the kcal are still right. The bug is somewhere in 13 lines that do four jobs. Can you find it before you read on?',
          'You cannot test "just the protein part". It has no name, no input and no output. The only way to try it is to run the whole card and squint at the printed menu.'
        ],
        warn: 'A long function hides bugs. When something is wrong, you have to read every line, because every line could be the one. Small cards shrink the search to a few lines.'
      },
      {
        label: 'The fix', pic: `<div style="width:100%;min-width:0">${run(fixed, { title: 'kitchen_coach.py' })}${andPic}</div>`,
        h: 'Cut it into small cards.',
        text: [
          'Each job gets its <b>own card</b>, with one job, a name that says it, and a <code>return</code>. <code>pick_safe</code> hands back a list of foods. <code>count_protein</code> hands back grams. <code>count_kcal</code> hands back kcal. <code>format_menu</code> hands back the menu line as text. None of them prints.',
          'Now read <code>plan_dinner</code>, at the bottom. It reads like the recipe itself: pick the safe foods, count the protein, count the kcal, print the menu. Only this top card prints, because it is the one that talks to people.',
          'And Chloe\'s number is <b>one call</b>, on the last line: <code>count_kcal(pick_safe(MENU, {"gluten"}))</code>. Python works from the inside out: <code>pick_safe</code> hands back her foods, and <code>count_kcal</code> adds them up. Press <b>Run</b>: the three menu lines, then <code>765</code>.',
          'Each card also has a docstring (lesson 48). A small card with one job is easy to describe in one short line. If the line will not come, the card probably does too much.'
        ],
        tip: 'Names: a card that <b>does</b> something gets a verb, like <code>pick_safe</code>, <code>count_kcal</code>, <code>format_menu</code>. If you cannot find a short name without "and", the card does more than one job.'
      },
      {
        label: 'Try it', pic: run(check, { title: 'check_one_card.py' }),
        h: 'Check one card on its own.',
        text: [
          'Remember the 6 g bug? Here is <code>count_protein</code> with the same mistake. Because it is a small card that takes foods in and returns a number, you can <b>check it alone</b>, with a tiny example you can add up in your head: chili is 18, salad is 3, so the answer should be <b>21</b>.',
          'Press <b>Run</b>. It prints <code>3</code>, then <code>False</code>. <code>==</code> asks "is it equal?" and answers <code>True</code> or <code>False</code> (lesson 21). The card is wrong, and the bug must be in these 5 lines.',
          'Line 7 says <code>total = PROTEIN[food]</code>, so each food <b>replaces</b> the total and only the last one counts. Change <code>=</code> to <code>+=</code> and run it again: <code>21</code>, <code>True</code>, <code>True</code>. Then add one more check of your own: <code>print(count_protein(["chicken"]) == 31)</code>.'
        ],
        tip: 'Checking with <code>print</code> and <code>==</code> is a taste test by hand. Lesson 89, Testing with pytest, turns these checks into tests that run all at once, every time you change the code.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Small, not tiny.',
        text: [
          'You can cut too far. In the first box, <code>get_kcal</code> and <code>add</code> each hold one obvious line. To understand <code>count_kcal</code>, you now jump to two other cards and back. The code got <b>longer</b> and <b>harder</b> to read.',
          'Split off a card when its job has a name worth giving it, and you would like to <b>reuse</b> it or <b>check</b> it on its own. <code>KCAL[food]</code> and <code>a + b</code> already say what they do. A card for them adds nothing.',
          'There is no magic line count. A card that fits on your screen and passes the "and" test is usually fine. And it is fine for the top card, like <code>plan_dinner</code>, to print: the small cards return, and the top card shows the result to people.'
        ],
        warn: 'Splitting changes no behaviour by itself. Run the program before and after, and compare the output. Same menu, same numbers: the split worked.'
      }
    ],
    exercises: [
      {
        file: 'l49_split_the_card.py', title: 'Split the card',
        task: 'Sunday dinner. Kitchen Coach has one long <code>plan_dinner</code> card with four jobs. Fill in three small cards, <code>pick_safe</code>, <code>count_protein</code> and <code>count_kcal</code> (their names and docstrings are given), then rewrite <code>plan_dinner</code> so it just <b>calls</b> them. The check calls each small card with <b>other foods</b> too.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file. Run it once: the long card still prints the menu, and the check says which small card to fill in first.',
          'Between <code>START</code> and <code>END</code>, replace each <code># TODO</code> line with the real steps. Each card returns its answer and prints nothing. Then shorten <code>plan_dinner</code> to four calls. Save the file.',
          'Run it again. The check says <code>PASS</code> or gives you one hint. Try a card on its own too, for example <code>print(count_protein(["tofu", "fish"]))</code> should be 45. Remove your own prints before the final run.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Use the "and" test. Each sentence describes one function. Keep it, or split it?',
        buckets: ['One job: keep it', 'More than one job: split it'],
        items: [
          ['Return the kcal in these foods.', 0],
          ['Return the foods with nothing from the avoid set.', 0],
          ["Return one guest's menu as one line of text.", 0],
          ['Pick the safe foods and print them.', 1],
          ['Add up the protein and the kcal, and print both.', 1],
          ['Read the guests, check allergens and write the menu.', 1]
        ],
        why: 'If the sentence needs "and" to join two jobs, the function does two jobs. "One line of text" or "nothing from the avoid set" is still one job: it hands back one thing.',
        hint: 'Count the jobs, not the words. Does the sentence join two different actions?'
      },
      {
        type: 'match', q: 'Match each small card to its one job.',
        pairs: [
          ['pick_safe(foods, avoid)', 'hands back the foods a guest can eat'],
          ['count_protein(foods)', 'hands back the grams of protein'],
          ['format_menu(name, foods, protein, kcal)', 'hands back one menu line as text'],
          ['plan_dinner(guests)', 'calls the other cards and prints the menu']
        ],
        why: 'Each small card returns one thing. Only the top card, <code>plan_dinner</code>, prints, because it is the one that talks to people.',
        hint: 'The name says the job. Which one is the boss that calls the others?'
      },
      {
        type: 'pick', q: 'You check this card with a tiny example. What does it print?',
        pic: code(['KCAL = {"salad": 90, "pudding": 250}', '', 'def count_kcal(foods):', '    total = 0', '    for food in foods:', '        total = KCAL[food]', '    return total', '', 'print(count_kcal(["salad", "pudding"]))'], { title: 'check.py' }),
        options: ['250', '340', '90', 'None'],
        answer: 0,
        why: 'Line 6 uses <code>=</code>, so each food <b>replaces</b> the total. Only the last food, pudding, counts: 250. You expected 90 + 250 = 340, so the check shows the bug at once, inside a 5-line card. The fix is <code>total += KCAL[food]</code>.',
        hint: 'What is in <code>total</code> after the loop has seen the last food?'
      },
      {
        type: 'fix', q: 'Chloe\'s app adds a 120 kcal snack, but this stops with <code>TypeError: unsupported operand type(s) for +: \'NoneType\' and \'int\'</code>. Fix the card so the program prints only <code>With a 120 kcal snack: 885 kcal</code>.',
        code: [
          'KCAL = {"pasta": 380, "chili": 260, "chicken": 165, "salad": 90, "pudding": 250}',
          '',
          'def count_kcal(foods):',
          '    total = 0',
          '    for food in foods:',
          '        total += KCAL[food]',
          '    print(f"{total} kcal")',
          '',
          'chloe = count_kcal(["chili", "chicken", "salad", "pudding"])',
          'print(f"With a 120 kcal snack: {chloe + 120} kcal")'
        ],
        title: 'chloe_app.py',
        check: [
          'import io, contextlib',
          'got = out.strip()',
          'shown = io.StringIO()',
          'with contextlib.redirect_stdout(shown):',
          '    back = count_kcal(["salad"])',
          'if back == 90 and shown.getvalue() == "" and got == "With a 120 kcal snack: 885 kcal":',
          '    ok = True',
          'elif back is None:',
          '    msg = "count_kcal still hands back None. Change the print line at the end of the card to return total."',
          'elif shown.getvalue() != "":',
          '    msg = "The card returns now, but it still prints too. A small card only returns."',
          'elif back != 90:',
          '    msg = "count_kcal([\\"salad\\"]) should give 90. Keep the loop as it was."',
          'else:',
          '    msg = "It printed: " + got + ". It should print only: With a 120 kcal snack: 885 kcal"'
        ].join('\n'),
        why: 'The last line of the card becomes <code>return total</code>. Now the call hands back 765, the app adds 120, and the only print is in the app, where it belongs.',
        hint: 'Which word hands a value back, instead of showing it? Lesson 45.'
      },
      {
        type: 'pick', q: 'Which names say clearly what the card does? Pick all that apply.',
        options: ['count_kcal', 'pick_safe', 'do_stuff', 'format_menu', 'helper2', 'plan_and_count_and_print'],
        answer: [0, 1, 3],
        why: 'A good name starts with a verb and says the one job. <code>do_stuff</code> and <code>helper2</code> say nothing. <code>plan_and_count_and_print</code> fails the "and" test in its own name: that card should be split.',
        hint: 'Could you guess what the card hands back from the name alone?'
      },
      {
        type: 'pick', q: 'Back to lesson 48. You just split off this card. Which first line is the best docstring for it?',
        pic: code(['def count_protein(foods):', '    ???', '    total = 0', '    for food in foods:', '        total += PROTEIN[food]', '    return total'], { title: 'kitchen_coach.py' }),
        options: [
          '"""Return the grams of protein in these foods."""',
          '# Return the grams of protein in these foods.',
          '"""Loop over foods and use += on total."""',
          '"""Protein."""'
        ],
        answer: 0,
        why: 'A docstring is a string in triple quotes on the first line inside the card. It says <b>what</b> comes back, with the unit. A <code>#</code> comment is not kept as a docstring. "Loop and use +=" says how, not what. "Protein." says too little.',
        hint: 'It must be a string, and it should say what comes back, in which unit.'
      },
      {
        type: 'type', q: 'This line already ran: <code>safe = pick_safe(MENU, {"gluten"})</code>. Type the call that hands back the kcal of the foods in <code>safe</code>.',
        prompt: '>>>',
        answers: ['count_kcal(safe)'],
        why: 'One small card, one call: <code>count_kcal(safe)</code> hands back 765. No copying, no printing, just the number Chloe asked for.',
        hint: 'The card that adds up kcal, with the safe foods inside the brackets.'
      },
      {
        type: 'pick', q: 'Why is <code>count_protein</code> easy to check, while the protein part of the long <code>plan_dinner</code> was not?',
        options: [
          'It takes foods in and returns a number, so you can call it with a tiny list and compare the answer',
          'Small functions run faster, so bugs show up sooner',
          'Python checks small functions for mistakes by itself',
          'It has a docstring, and docstrings find bugs'
        ],
        answer: 0,
        why: 'A small card has a name, an input and an output. Call it with chili and salad, and you know the answer must be 21. The protein steps inside the long card had none of those, so you could only run everything and read the menu.',
        hint: 'What do you need to try a piece of code on its own?'
      }
    ]
  });
})();
