/* Lesson 78: Unpacking (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l78  Unpacking
     ===================================================================== */

  // A labelled jar. x, y = top left. 112 x 130.
  const jar = (x, y, name, val, col) =>
    `<rect x="${x + 14}" y="${y - 10}" width="84" height="14" rx="5" fill="${P.ink}"/>` +
    box(x, y, 112, 130, P.white, 16) +
    T(x + 56, y + 58, val, { s: 22, m: true, f: col }) +
    `<rect x="${x + 12}" y="${y + 84}" width="88" height="32" rx="8" fill="${P.white}" stroke="${col}" stroke-width="3"/>` +
    T(x + 56, y + 106, name, { s: 16, m: true, f: col });
  const packet = (x, y, name, val, col) =>
    `<rect x="${x}" y="${y}" width="84" height="50" rx="10" fill="${P.white}" stroke="${col}" stroke-width="3"/>` +
    T(x + 42, y + 20, name, { s: 13, f: col }) + T(x + 42, y + 42, val, { s: 16, m: true });

  const ideaSvg = svg(600, 300, 'A grocery bag holds three packets: oats 500, rice 1000 and tofu 400. The line oats, rice, tofu = bag sends each value into its own labelled jar, in order: 500 into the jar called oats, 1000 into rice, 400 into tofu.',
    T(300, 26, 'oats, rice, tofu = bag', { s: 19, m: true }) +
    // the bag
    `<path d="M70 70 C70 46 100 46 100 70 M130 70 C130 46 160 46 160 70" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    box(30, 70, 170, 190, P.warnT, 14) +
    packet(73, 86, 'oats', '500', P.warn) + packet(73, 144, 'rice', '1000', P.accent) + packet(73, 202, 'tofu', '400', P.ok) +
    T(115, 286, 'the bag: 3 values', { s: 13, w: 700, f: P.ink2 }) +
    arrow(162, 111, 268, 122, P.warn, 2.5) + arrow(162, 169, 398, 122, P.accent, 2.5) + arrow(162, 227, 526, 122, P.ok, 2.5) +
    jar(222, 140, 'oats', '500', P.warn) + jar(350, 140, 'rice', '1000', P.accent) + jar(478, 140, 'tofu', '400', P.ok) +
    T(406, 296, '3 names: one jar per value, by position', { s: 13, w: 700, f: P.ink2 }));

  const receipt = [
    '# The grocery bag, in grams: oats, rice, tofu',
    'bag = [500, 1000, 400]',
    'oats, rice, tofu = bag            # one jar per item',
    'print(f"oats {oats} g, rice {rice} g, tofu {tofu} g")',
    '',
    '# One line of the receipt: item, grams, price in euros',
    'line = ("oats", 500, 2.40)',
    'print(line[0], line[1], line[2])  # by position',
    'item, grams, price = line         # by name',
    'print(f"{item}: {grams} g for {price:.2f} euros")'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(receipt, { title: 'receipt.py' })}</div>`;

  const places = [
    '# 1. A function hands back two values, as one tuple',
    'def kcal_range(kcal, margin):',
    '    return kcal - margin, kcal + margin   # a tuple',
    '',
    'low, high = kcal_range(650, 50)',
    'print(f"Ben\'s dinner: {low} to {high} kcal")',
    '',
    '# 2. A for loop unpacks each receipt line',
    'receipt = [',
    '    ("oats", 500, 2.40),',
    '    ("rice", 1000, 1.90),',
    '    ("tofu", 400, 2.80),',
    ']',
    'for item, grams, price in receipt:',
    '    print(f"{item}: {grams} g, {price:.2f} euros")',
    '',
    '# 3. .items() hands over (key, value) pairs',
    'ben = {"kcal": 650, "protein": 45, "carbs": 70}',
    'for name, amount in ben.items():',
    '    print(name, amount)'
  ];

  const swapBad = [
    '# The plates got mixed up: Ana has Ben\'s tofu bowl',
    'ana_plate = "tofu bowl"',
    'ben_plate = "pasta"',
    'print("before:", ana_plate, "|", ben_plate)',
    '',
    '# swap them, one line at a time',
    'ana_plate = ben_plate',
    'ben_plate = ana_plate',
    'print("after: ", ana_plate, "|", ben_plate)'
  ];
  const painSvg = svg(600, 150, 'Line 7 puts the pasta on Ana\'s plate, and the tofu bowl is gone: nothing holds it any more. Line 8 then copies the pasta onto Ben\'s plate as well. Two plates of pasta.',
    box(20, 18, 170, 100, P.white, 14) + T(105, 46, 'start', { s: 13, w: 700, f: P.ink2 }) + T(105, 74, 'Ana: tofu bowl', { s: 14, m: true }) + T(105, 100, 'Ben: pasta', { s: 14, m: true }) +
    arrow(198, 68, 222, 68, P.ink, 2.5) +
    box(226, 18, 170, 100, P.white, 14) + T(311, 46, 'after line 7', { s: 13, w: 700, f: P.ink2 }) + T(311, 74, 'Ana: pasta', { s: 14, m: true, f: P.danger }) + T(311, 100, 'Ben: pasta', { s: 14, m: true }) +
    arrow(404, 68, 428, 68, P.ink, 2.5) +
    box(432, 18, 150, 100, P.dangerT, 14) + T(507, 46, 'after line 8', { s: 13, w: 700, f: P.danger }) + T(507, 74, 'Ana: pasta', { s: 14, m: true, f: P.danger }) + T(507, 100, 'Ben: pasta', { s: 14, m: true, f: P.danger }) +
    T(300, 142, 'the tofu bowl was lost on line 7', { s: 13, w: 700, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(swapBad, { title: 'plates.py' })}${painSvg}</div>`;

  const swapGood = [
    '# The plates got mixed up: Ana has Ben\'s tofu bowl',
    'ana_plate = "tofu bowl"',
    'ben_plate = "pasta"',
    '',
    'ana_plate, ben_plate = ben_plate, ana_plate   # one line',
    'print("Ana:", ana_plate)',
    'print("Ben:", ben_plate)'
  ];
  const oldSwap = [
    'spare = ana_plate        # a third, empty plate',
    'ana_plate = ben_plate',
    'ben_plate = spare'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(swapGood, { title: 'plates.py' })}` +
    code(oldSwap, { title: 'the long way: a spare plate (it works, but 3 lines)' }) + `</div>`;

  const stars = [
    'steps = ["rinse the lentils", "chop the onion",',
    '         "fry the onion", "simmer 20 min", "serve"]',
    '',
    'first, *middle, last = steps',
    'print("first: ", first)',
    'print("middle:", middle)',
    'print("last:  ", last)',
    '',
    'head, *rest = steps',
    'print(len(rest), "steps after:", head)',
    '',
    '# _ for a value you do not need',
    'item, _, price = ("oats", 500, 2.40)',
    'print(item, price)',
    '',
    '# nested: a name, then a (kcal, protein) pair',
    'dinners = [("Ana", (700, 30)), ("Ben", (650, 45))]',
    'for name, (kcal, protein) in dinners:',
    '    print(f"{name}: {protein} g protein")',
    '',
    '# a star in a call spreads the bag into separate values',
    'bag = ["oats", "rice", "tofu"]',
    'print(bag)',
    'print(*bag)'
  ];

  const counts = [
    'ben = (650, 45, 70)        # kcal, protein, carbs',
    'try:',
    '    kcal, protein = ben    # 2 jars, 3 values',
    'except ValueError as err:',
    '    print(err)',
    '',
    'lunch = (520, 30)          # someone forgot the carbs',
    'try:',
    '    kcal, protein, carbs = lunch',
    'except ValueError as err:',
    '    print(err)',
    '',
    'kcal, *rest = ben          # a star takes whatever is left',
    'print(kcal, rest)',
    '',
    'first, *middle, last = ["oats", "rice"]',
    'print(first, middle, last) # nothing left for middle'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(counts, { title: 'counts.py' })}` +
    term(['$ python3 bag.py', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/bag.py", line 2, in <module>', '    oats, rice, tofu = bag', '    ^^^^^^^^^^^^^^^^', 'ValueError: too many values to unpack (expected 3, got 4)'], 'bag = [500, 1000, 400, 250], Python 3.15') +
    code(['steps = ["chop", "fry", "simmer", "serve"]', 'first, *middle, *last = steps'], { title: 'stars.py', bad: [2] }) +
    term(['$ python3 stars.py', '  File "/Users/you/kitchen/stars.py", line 2', '    first, *middle, *last = steps', '    ^^^^^^^^^^^^^^^^^^^^^', 'SyntaxError: multiple starred expressions in assignment'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l78', minutes: 13,
    summary: '<b>Unpacking</b> puts each value of a tuple or list into <b>its own name</b>, by position: <code>oats, rice, tofu = bag</code>. You met it in lesson 36. It works everywhere: on what a function returns (<code>low, high = kcal_range(650, 50)</code>, because <code>return a, b</code> hands back one tuple), in <code>for</code> loops over pairs and triples and over <code>.items()</code>, and to <b>swap</b> two names in one line: <code>a, b = b, a</code>. The counts must match, or Python stops with <code>ValueError: too many values to unpack (expected 3, got 4)</code> or <code>not enough values to unpack (expected 3, got 2)</code>. A <b>star</b> collects the rest into a list: <code>first, *middle, last = steps</code>. <code>_</code> is the usual name for a value you do not need. And <code>print(*bag)</code> spreads a list into separate values.',
    video: {
      src: 'videos/l78-unpacking.mp4', poster: 'videos/l78-unpacking.jpg', length: '1 min 5 s',
      script: [
        'You are back from the shop. The bag holds 3 things. 500 grams of oats, 1000 grams of rice, and 400 grams of tofu.',
        'Python unpacks the whole bag in one line. Oats, rice, tofu, equals bag. 3 names on the left. 3 values in the bag.',
        'Each value goes into its own jar, by position. 500 into oats. 1000 into rice. 400 into tofu.',
        'Now you add lentils. 4 values, but still 3 jars. The 3 jars wait, but the lentils have nowhere to go. So nothing goes in. Python stops. Value error. Too many values to unpack. Expected 3, got 4.',
        'So the counts must match. Or you add a star. First, star middle, last. The first value goes into first. The last value goes into last. And the big jar called middle takes everything in between, as a list.',
        'Unpacking puts each value in its own name. The counts must match, or use a star.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Unpack the grocery bag into labelled jars.',
        text: [
          'You are back from the shop with a bag of oats, rice and tofu. You do not leave them in the bag and dig around each time. You put each one in <b>its own labelled jar</b>.',
          'Lesson 36 showed the Python way: <code>oats, rice, tofu = bag</code>. Names on the left, separated by commas, and a tuple or a list on the right. The first value goes into the first name, the second into the second, and so on. That is <b>unpacking</b>.',
          'Press <b>Run</b>. Look at the receipt line too. <code>line[2]</code> works, but you have to remember that position 2 is the price. After <code>item, grams, price = line</code>, the code <b>says</b> what each value is. <code>{price:.2f}</code> shows 2 decimals (lesson 15).'
        ],
        tip: 'Unpacking works on any sequence of values: a tuple, a list, even the pairs a loop hands you. This lesson shows every place it turns up.'
      },
      {
        label: 'The code', pic: run(places, { title: 'unpack_everywhere.py' }),
        h: 'Three places you unpack every day.',
        text: [
          '<b>A function that hands back two values.</b> <code>return kcal - margin, kcal + margin</code> has a comma, and the comma makes a <b>tuple</b> (lesson 36). So the function hands back <b>one</b> tuple, <code>(600, 700)</code>, and <code>low, high = kcal_range(650, 50)</code> unpacks it into two jars.',
          '<b>A for loop over records.</b> Each receipt line is a tuple of three. <code>for item, grams, price in receipt:</code> unpacks each one as the loop hands it over. You saw this with three names in lesson 76. Lesson 77\'s <code>enumerate</code> and <code>zip</code> hand out pairs in exactly the same way.',
          '<b>A dict with <code>.items()</code>.</b> <code>.items()</code> hands over each <b>(key, value)</b> pair (lesson 38), and <code>name, amount</code> unpacks it. Press <b>Run</b>. Then change <code>margin</code> to 100 in the call and say Ben\'s new range before you run it again.'
        ],
        tip: 'Ben\'s macros are a tuple too: <code>(650, 45, 70)</code> for kcal, protein and carbs. <code>kcal, protein, carbs = macros</code> gives each number a name.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Swap two plates, lose one dinner.',
        text: [
          'The plates got mixed up. Ana has Ben\'s tofu bowl and Ben has Ana\'s pasta. Swap them, one line at a time: Ana gets Ben\'s plate, then Ben gets Ana\'s plate. Press <b>Run</b>.',
          'Both plates say <code>pasta</code>. Line 7 put the pasta on Ana\'s plate, and at that moment <b>nothing held the tofu bowl any more</b>. Line 8 then copied Ana\'s plate, which is already pasta, to Ben.',
          'No error and no warning. Ben, who lifts weights and counts his protein, gets a plate of pasta, and the tofu bowl is gone.'
        ],
        warn: 'Every swap written as two lines loses a value. The first line overwrites one of the two before the second line can read it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Swap in one line: a, b = b, a.',
        text: [
          '<code>ana_plate, ben_plate = ben_plate, ana_plate</code>. Python reads the <b>whole right side first</b>: it builds the tuple <code>("pasta", "tofu bowl")</code> from the old values. Only then does it unpack that tuple into the two names on the left. Nothing is overwritten too early.',
          'Press <b>Run</b>: Ana has the pasta, Ben has his tofu bowl. The long way needs a <b>spare plate</b> to hold one value while you move the other. It works, but it is 3 lines and an extra name.',
          'Your turn: add <code>chloe_plate = "fruit salad"</code> and pass all three plates one seat along in one line: <code>ana_plate, ben_plate, chloe_plate = ben_plate, chloe_plate, ana_plate</code>. Say who has what before you run it.'
        ],
        tip: 'Then go back to <code>plates.py</code> in The pain and fix it with the one-line swap.'
      },
      {
        label: 'Try it', pic: run(stars, { title: 'stars.py' }),
        h: 'A star takes the rest.',
        text: [
          '<b>A star collects the rest.</b> In <code>first, *middle, last = steps</code>, <code>first</code> and <code>last</code> get one value each, and <code>*middle</code> takes <b>everything in between</b>, as a list. <code>head, *rest = steps</code> splits off the first step. A star works however long the list is.',
          '<b><code>_</code> for a value you do not need.</b> <code>item, _, price = line</code> still needs three names, but <code>_</code> tells the reader "I do not use this one". It is a normal name, the grams really are in it. <b>Nested unpacking</b> follows the shape of the data: <code>for name, (kcal, protein) in dinners:</code>, with brackets around the inner pair.',
          '<b>A star in a call does the opposite.</b> <code>print(bag)</code> prints one list with its brackets. <code>print(*bag)</code> spreads the list into three separate values, as if you had written <code>print("oats", "rice", "tofu")</code>. Lesson 79, *args and **kwargs, goes deeper. Press <b>Run</b>, then add a step to <code>steps</code> and see which name grows.'
        ],
        tip: 'You can only use <b>one</b> star on the left. Python needs to know where "the rest" ends.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'The counts must match.',
        text: [
          '<b>Too many values.</b> Ben\'s macros have 3 values and you give 2 names: <code>too many values to unpack (expected 2, got 3)</code>. <b>Not enough values.</b> The lunch tuple forgot the carbs, so 3 names get only 2 values: <code>not enough values to unpack (expected 3, got 2)</code>. Both are a <code>ValueError</code>, and <b>no name is set at all</b>: Python checks the count before it fills any jar, so even the jars that would fit stay empty. Press <b>Run</b>: <code>except ValueError as err</code> (lesson 53) prints each message.',
          'Read the numbers in the message. <b>expected</b> is how many names you wrote. <b>got</b> is how many values there were. For a tuple or a list Python shows both. For some other things, like text, it only says <code>(expected 2)</code>.',
          'A star fixes "too many": <code>kcal, *rest = ben</code>. A starred name is <b>always a list</b>, even when nothing is left for it: <code>first, *middle, last = ["oats", "rice"]</code> gives <code>middle</code> the empty list <code>[]</code>. And two stars in one line stop with <code>SyntaxError: multiple starred expressions in assignment</code>.'
        ],
        warn: 'Unpack when you <b>know</b> how many values there are, like a receipt line that always has 3. When the count can change, loop over the list, or use a star.'
      }
    ],
    exercises: [
      {
        file: 'l78_grocery_bag.py', title: 'The grocery bag',
        task: 'Three jobs with unpacking. Add up the receipt with a loop that <b>unpacks</b> each line, <b>swap</b> two mixed-up jars in one line, and split the recipe steps into <code>first</code>, <code>middle</code> and <code>last</code> with a <b>star</b>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. It prints what your names hold, and the first hint.',
          'Change the lines between <code>START</code> and <code>END</code>. The starter adds up the receipt by position and gets the total wrong. Unpack each line into three names instead.',
          'Run it until it says <code>PASS</code>. The check also runs your lines on a second receipt and a second recipe.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def kcal_range(kcal, margin):', '    return kcal - margin, kcal + margin', '', 'low, high = kcal_range(700, 100)', 'print(high)'], { title: 'range.py' }),
        options: ['800', '600', '(600, 800)', 'TypeError: a function can only return one value'],
        answer: 0,
        why: 'The function hands back one tuple, <code>(600, 800)</code>. Unpacking puts 600 in <code>low</code> and 800 in <code>high</code>.',
        hint: 'Which value goes into the second name?'
      },
      {
        type: 'fix', q: 'The plates are mixed up, but this swap gives both friends pasta. Fix it so it prints <code>Ana: pasta</code> and then <code>Ben: tofu bowl</code>.',
        code: ['ana_plate = "tofu bowl"', 'ben_plate = "pasta"', '', 'ana_plate = ben_plate', 'ben_plate = ana_plate', 'print("Ana:", ana_plate)', 'print("Ben:", ben_plate)'],
        title: 'plates.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["Ana: pasta", "Ben: tofu bowl"]:',
          '    ok = True',
          'elif lines == ["Ana: pasta", "Ben: pasta"]:',
          '    msg = "Still two plates of pasta. Line 4 overwrites the tofu bowl before line 5 can read it. Swap both in one line."',
          'elif lines == ["Ana: tofu bowl", "Ben: pasta"]:',
          '    msg = "Nothing moved. Swap with ana_plate, ben_plate = ben_plate, ana_plate"',
          'else:',
          '    msg = "It should print exactly: Ana: pasta, then Ben: tofu bowl."'
        ].join('\n'),
        why: 'Replace lines 4 and 5 with <code>ana_plate, ben_plate = ben_plate, ana_plate</code>. Python builds the right side from the old values first, then unpacks.',
        hint: 'One line, with two names on each side of the = .'
      },
      {
        type: 'pick', q: 'What happens?',
        pic: code(['lunch = (520, 30)', 'kcal, protein, carbs = lunch'], { title: 'lunch.py' }),
        options: ['ValueError: not enough values to unpack (expected 3, got 2)', 'ValueError: too many values to unpack (expected 3, got 2)', 'carbs is None', 'carbs is 0'],
        answer: 0,
        why: '3 names, 2 values. Python never fills a jar with a made-up value. <b>expected</b> counts the names, <b>got</b> counts the values.',
        hint: 'Are there more names or more values?'
      },
      {
        type: 'fix', q: 'Each receipt line is <code>(item, grams, price)</code>. This stops with a <code>ValueError</code>. Fix the loop so it prints <code>Total: 7.10 euros</code>.',
        code: ['receipt = [("oats", 500, 2.40), ("rice", 1000, 1.90), ("tofu", 400, 2.80)]', 'total = 0', 'for item, price in receipt:', '    total += price', 'print(f"Total: {total:.2f} euros")'],
        title: 'receipt.py',
        check: [
          'got = out.strip()',
          'if got == "Total: 7.10 euros":',
          '    ok = True',
          'elif got == "Total: 1900.00 euros":',
          '    msg = "That added up the grams. The price is the third value of each line."',
          'else:',
          '    msg = "It printed " + got + ". Each line has 3 values, so the loop needs 3 names: item, grams, price."'
        ].join('\n'),
        why: '<code>for item, grams, price in receipt:</code>. Or <code>for item, _, price in receipt:</code>, since the grams are not used. The error said it: <code>expected 2, got 3</code>.',
        hint: 'Count the values in one receipt line, then count the names after for.'
      },
      {
        type: 'pick', q: 'What is <code>middle</code>?',
        pic: code(['first, *middle, last = ["oats", "rice"]'], { title: 'two.py' }),
        options: ['[]', 'None', "''", 'ValueError: not enough values to unpack'],
        answer: 0,
        why: '<code>first</code> and <code>last</code> need one value each, and there are exactly 2. Nothing is left for <code>middle</code>, and a starred name is always a list, so it is the empty list.',
        hint: 'A starred name always gets the same type of thing.'
      },
      {
        type: 'pick', q: 'Back to lesson 38. What happens?',
        pic: code(['ben = {"kcal": 650, "protein": 45, "carbs": 70}', 'for name, amount in ben:', '    print(name, amount)'], { title: 'macros.py' }),
        options: ['ValueError: too many values to unpack (expected 2)', 'It prints kcal 650, protein 45, carbs 70', 'It prints only the keys', 'KeyError: 0'],
        answer: 0,
        why: 'A loop over a dict hands over the <b>keys</b> only. The first key is the text <code>"kcal"</code>, 4 letters, and 4 letters do not fit into 2 names. Write <code>ben.items()</code> to get (key, value) pairs.',
        hint: 'What does a for loop over a dict hand you, without .items()?'
      },
      {
        type: 'match', q: 'Match each line to what it does.',
        pairs: [
          ['a, b = b, a', 'swap two names'],
          ['low, high = kcal_range(650, 50)', 'unpack what a function returns'],
          ['head, *rest = steps', 'split off the first, keep the rest as a list'],
          ['item, _, price = line', 'skip a value you do not need'],
          ['print(*bag)', 'spread a list into separate values']
        ],
        why: 'Every one is unpacking: names on the left get the values on the right by position, a star collects the rest, and in a call a star spreads a list out.'
      },
      {
        type: 'type', q: 'The jars are mixed up: <code>sugar</code> holds the salt and <code>salt</code> holds the sugar. Type the one line that swaps them.',
        prompt: '>>>',
        answers: ['sugar, salt = salt, sugar'],
        accept: '^(sugar ?, ?salt ?= ?salt ?, ?sugar|salt ?, ?sugar ?= ?sugar ?, ?salt)$',
        why: 'Two names on the left, the same two in the other order on the right. Python builds the right side first, so nothing is lost.',
        hint: 'a, b = b, a'
      }
    ]
  });
})();
