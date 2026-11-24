/* Lesson 76: Comprehensions (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l76  Comprehensions
     ===================================================================== */

  const PANTRY = [
    'pantry = [',
    '    ("rice", 750, True),',
    '    ("pasta", 500, False),',
    '    ("lentils", 400, True),',
    '    ("rye bread", 300, False),',
    '    ("tofu", 200, True),',
    ']'
  ];

  // One line of mono text in an svg, in coloured pieces. parts: [[col, text, colour], ...]
  // 12 px JetBrains Mono advances 7.2 px per character.
  const CH = 7.2;
  const mono = (x, y, parts) => parts.map(([c, s, f]) => T(x + c * CH, y, s, { s: 12, m: true, w: 600, a: 'start', f: f || P.ink })).join('');
  const under = (x, y, c0, len, col) => `<line x1="${x + c0 * CH + 1}" y1="${y}" x2="${x + (c0 + len) * CH - 1}" y2="${y}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;

  /* ---- The idea: the 4-line loop and the 1-line comprehension, parts in matching colours ---- */
  const ideaSvg = svg(600, 300, 'Top: the loop you know, 4 lines. shopping = [], for name, grams, gluten_free in pantry, if gluten_free, shopping.append(name). Bottom: the same list in one line, shopping = [name for name, grams, gluten_free in pantry if gluten_free]. The name from the append line is "what" goes on the list, in green. The for part is "for each", in blue. The if part is "which" items, in pink.',
    T(24, 22, 'The loop you know: 4 lines', { s: 13.5, a: 'start' }) +
    box(20, 32, 560, 112, P.white, 12) +
    [1, 2, 3, 4].map(n => `<circle cx="${552}" cy="${50 + (n - 1) * 24}" r="9" fill="${P.accent}"/>` + T(552, 54 + (n - 1) * 24, String(n), { s: 11, f: P.white })).join('') +
    mono(34, 54, [[0, 'shopping = []']]) +
    mono(34, 78, [[0, 'for name, grams, gluten_free in pantry', P.accent], [38, ':']]) +
    mono(34, 102, [[4, 'if gluten_free', P.danger], [18, ':']]) +
    mono(34, 126, [[8, 'shopping.append('], [24, 'name', P.ok], [28, ')']]) +
    arrow(300, 152, 300, 176, P.ink2, 2.5) +
    T(24, 196, 'The same list in one line: a comprehension', { s: 13.5, a: 'start' }) +
    box(20, 206, 560, 40, P.white, 12) +
    mono(34, 231, [[0, 'shopping = ['], [12, 'name', P.ok], [17, 'for name, grams, gluten_free in pantry', P.accent], [56, 'if gluten_free', P.danger], [70, ']']]) +
    under(34, 240, 12, 4, P.ok) + under(34, 240, 17, 38, P.accent) + under(34, 240, 56, 14, P.danger) +
    T(34 + 14 * CH, 272, 'what', { s: 13, f: P.ok }) +
    T(34 + 36 * CH, 272, 'for each', { s: 13, f: P.accent }) +
    T(34 + 63 * CH, 272, 'which', { s: 13, f: P.danger }) +
    T(300, 294, 'what goes on the list, for each item, which items', { s: 12, w: 700, f: P.ink2 }));
  const sideBySide = [...PANTRY, '',
    '# the loop you know: 4 lines',
    'shopping = []',
    'for name, grams, gluten_free in pantry:',
    '    if gluten_free:',
    '        shopping.append(name)',
    'print(shopping)',
    '',
    '# the same list, in one line',
    'quick = [name for name, grams, gluten_free in pantry if gluten_free]',
    'print(quick)',
    'print(shopping == quick)'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(sideBySide, { title: 'side_by_side.py' })}</div>`;

  /* ---- The code: transform, filter, both ---- */
  const shopping = [
    '# Ben\'s protein, one serving each: lentils, beans, tofu',
    'protein_g = [18, 15, 12]',
    'two_servings = [g * 2 for g in protein_g]',
    'print(two_servings)',
    '',
    ...PANTRY,
    'for_chloe = [name for name, grams, gluten_free in pantry if gluten_free]',
    'print(for_chloe)',
    '',
    'kg_for_chloe = [grams / 1000 for name, grams, gluten_free in pantry if gluten_free]',
    'print(kg_for_chloe)',
    '',
    '# a list of dicts works the same way',
    'basket = [{"name": "oats", "gluten_free": True}, {"name": "couscous", "gluten_free": False}]',
    'print([item["name"] for item in basket if item["gluten_free"]])'
  ];

  /* ---- The pain: the same 4 lines again, and the copy goes into the wrong list ---- */
  const twoLists = [...PANTRY, '',
    'shopping = []',
    'for name, grams, gluten_free in pantry:',
    '    if gluten_free:',
    '        shopping.append(name)',
    '',
    'kg = []',
    'for name, grams, gluten_free in pantry:',
    '    if gluten_free:',
    '        shopping.append(grams / 1000)   # copied from above',
    '',
    'print(shopping)',
    'print(kg)'
  ];
  const painSvg = svg(600, 172, 'Two lists, two copies of the same loop. The second loop was copied from the first, and its append still says shopping. So the kilograms land on the shopping list, and the kg list stays empty.',
    box(20, 20, 260, 98, P.white, 12) + T(150, 46, 'shopping', { s: 14, m: true, w: 700 }) +
    T(150, 74, "'rice', 'lentils', 'tofu',", { s: 12, m: true, w: 600, f: P.ok }) +
    T(150, 98, '0.75, 0.4, 0.2', { s: 12, m: true, w: 600, f: P.danger }) +
    box(380, 20, 200, 98, P.white, 12) + T(480, 46, 'kg', { s: 14, m: true, w: 700 }) +
    T(480, 82, 'empty', { s: 13, f: P.danger }) +
    `<path d="M480 122 C 470 142, 300 146, 238 124" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    `<path d="M238 124 l13 -1 m-13 1 l7 11" stroke="${P.danger}" stroke-width="2.5" stroke-linecap="round" fill="none"/>` +
    T(300, 166, 'meant for kg, appended to shopping', { s: 12, w: 700, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(twoLists, { title: 'two_lists.py' })}${painSvg}</div>`;

  /* ---- The fix: each list is named once, at the front ---- */
  const fixed = [...PANTRY, '',
    'shopping = [name for name, grams, gluten_free in pantry if gluten_free]',
    'kg = [grams / 1000 for name, grams, gluten_free in pantry if gluten_free]',
    '',
    'print(shopping)',
    'print(kg)',
    'print(f"{sum(kg)} kg to carry home")'
  ];

  /* ---- Try it: dict and set comprehensions ---- */
  const guests = [...PANTRY, '',
    '# a dict comprehension: key: value, for each',
    'stock = {name: grams for name, grams, gluten_free in pantry}',
    'print(stock)',
    '',
    '# dinner is a quarter of each friend\'s day',
    'day_kcal = {"Ana": 2600, "Ben": 2800, "Chloe": 2000}',
    'dinner_kcal = {name: kcal // 4 for name, kcal in day_kcal.items()}',
    'print(dinner_kcal)',
    '',
    '# a set comprehension: one of each',
    'orders = ["Pasta", "rice", "Rice", "tofu", "pasta"]',
    'dishes = {dish.lower() for dish in orders}',
    'print(sorted(dishes))'
  ];

  /* ---- The catch ---- */
  const filterOrChoice = [...PANTRY, '',
    '# a filter, AFTER the for: which items make the list?',
    'print([name for name, grams, gluten_free in pantry if gluten_free])',
    '',
    '# a choice, BEFORE the for: every item, one of two values',
    'print([name if gluten_free else "----" for name, grams, gluten_free in pantry])'
  ];
  const elseTerm = term([
    '$ python3 labels.py',
    '  File "/Users/chloe/kitchen/labels.py", line 9',
    '    labels = [name for name, grams, gluten_free in pantry if gluten_free else "----"]',
    '                                                                         ^^^^',
    'SyntaxError: invalid syntax'
  ], 'else after the for, Python 3.15');
  const tooMuch = [
    'plates = [f"{guest}: {dish}" for guest in guests for dish in dishes if dish not in avoid.get(guest, [])]'
  ];
  const plainLoop = [
    'plates = []',
    'for guest in guests:',
    '    for dish in dishes:',
    '        if dish not in avoid.get(guest, []):',
    '            plates.append(f"{guest}: {dish}")'
  ];
  const sideEffect = [
    'names = ["rice", "lentils", "tofu"]',
    'result = [print(name) for name in names]',
    'print(result)'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(filterOrChoice, { title: 'labels.py' })}${elseTerm}` +
    code(tooMuch, { title: 'plates.py: two fors and an if in one line', bad: [1] }) +
    code(plainLoop, { title: 'plates.py: the same, as a normal loop', good: [1, 2, 3, 4, 5] }) +
    code(sideEffect, { title: 'print_all.py', bad: [2] }) +
    term(['$ python3 print_all.py', 'rice', 'lentils', 'tofu', '[None, None, None]'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l76', minutes: 13,
    summary: 'A <b>comprehension</b> is the short way to write "make an empty list, loop, append": <code>[name for name, grams, gluten_free in pantry if gluten_free]</code>. Read it in three parts: <b>what</b> goes on the list (<code>name</code>), <b>for each</b> item (<code>for ... in pantry</code>), and <b>which</b> items (<code>if gluten_free</code>, optional). It builds a <b>new list</b> and leaves the old one alone. The what can be any expression: <code>[g * 2 for g in protein_g]</code>. Curly brackets make a <b>dict comprehension</b>, <code>{name: grams for ...}</code>, or a <b>set comprehension</b>, <code>{dish.lower() for ...}</code>. A choice of two values goes <b>before</b> the for: <code>[name if gluten_free else "----" for ...]</code>. Put <code>else</code> after the for and you get <code>SyntaxError: invalid syntax</code>. If it does not fit on one line, has two fors, or exists only to <code>print</code>, write a normal loop.',
    video: {
      src: 'videos/l76-comprehensions.mp4', poster: 'videos/l76-comprehensions.jpg', length: '1 min 2 s',
      script: [
        'Chloe is gluten free. So Kitchen Coach checks the pantry, and builds her a shopping list.',
        'Here is the way you know. One: start an empty list. Two: for each item in the pantry. Three: if it is gluten free. Four: append its name. Rice. Lentils. Tofu.',
        'It works. But that is 4 lines, and you write the same 4 lines again, every time you build a list.',
        'Python has a short way, called a comprehension. Square brackets, and 3 parts inside. First, what goes on the list: the name. Then, for each item in the pantry. Then, which ones: if it is gluten free.',
        'Run it. The same shopping list. Rice, lentils, tofu.',
        'Read it like a sentence. The name, for each item in the pantry, if it is gluten free.',
        'A comprehension builds a list in one line. What, for each, which.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A whole shopping list in one line.',
        text: [
          'Chloe eats no gluten. Kitchen Coach keeps the pantry as a list of tuples (lesson 36): a name, the grams, and <code>True</code> or <code>False</code> for gluten-free. To build Chloe\'s shopping list you write the loop from lesson 35: an <b>empty list</b>, a <b>for</b>, an <b>if</b>, an <b>append</b>. Four lines.',
          'Python has a short way to write exactly that loop. It is called a <b>comprehension</b>: <code>[name for name, grams, gluten_free in pantry if gluten_free]</code>. The square brackets say "build a new list". Inside are the same three pieces as in the loop, in this order: <b>what</b> goes on the list, <b>for each</b> item, <b>which</b> items.',
          'Press <b>Run</b>. Both ways print <code>[\'rice\', \'lentils\', \'tofu\']</code>, and <code>shopping == quick</code> says <code>True</code>. The same list, from one line instead of four.'
        ],
        tip: 'Say it out loud: "the name, for each item in the pantry, if it is gluten-free". A good comprehension reads like a sentence.'
      },
      {
        label: 'The code', pic: run(shopping, { title: 'shopping.py' }),
        h: 'What, for each, which.',
        text: [
          '<b>Change every item.</b> Ben eats two servings. <code>[g * 2 for g in protein_g]</code> has no <code>if</code>: every number goes on the new list, doubled. The <b>what</b> part can be any expression: <code>g * 2</code>, <code>name.upper()</code>, <code>f"{name}: {grams} g"</code>.',
          '<b>Keep only some items.</b> <code>if gluten_free</code> at the end is a filter. Items where it is <code>False</code> never reach the list. The <code>for</code> part works like any <code>for</code> loop, including unpacking a tuple into three names (lessons 36 and 38).',
          '<b>Both at once.</b> <code>[grams / 1000 for ... if gluten_free]</code> keeps the gluten-free items and turns their grams into kilograms: <code>[0.75, 0.4, 0.2]</code>. The last example loops over a list of dicts (lesson 41). Press <b>Run</b>. Then change <code>g * 2</code> to <code>g * 3</code> for a third serving, and say the new list before you run it again.'
        ],
        tip: 'A comprehension always builds a <b>new</b> list. <code>pantry</code> and <code>protein_g</code> are never changed. That also means it is safe where lesson 35\'s remove-while-looping was not.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The same four lines, and one goes into the wrong list.',
        text: [
          'Kitchen Coach also needs the kilograms to carry home. So you copy the four lines, rename the empty list to <code>kg</code>, and change <code>name</code> to <code>grams / 1000</code>. But the copy still says <code>shopping.append</code>. Press <b>Run</b>.',
          'The kilograms land on the <b>shopping list</b>: <code>[\'rice\', \'lentils\', \'tofu\', 0.75, 0.4, 0.2]</code>. And <code>kg</code> stays <code>[]</code>. No error, no warning. Python did exactly what the lines said.',
          'This is the weak spot of the four-line pattern. The name of the list is written <b>twice</b>, once at the top and once in the append, far apart. Forget the append, or append to the wrong list, and you only notice when the numbers are wrong. And a real program builds lists like this again and again.'
        ],
        warn: 'Copy-pasted loops are where this bug lives. Every copy is four more lines to read and one more list name to get wrong.'
      },
      {
        label: 'The fix', pic: run(fixed, { title: 'two_lists.py' }),
        h: 'Name each list once, at the front.',
        text: [
          'Write each list as a comprehension. <code>shopping = [...]</code> and <code>kg = [...]</code>. The name of the list appears <b>once</b>, on the left of the <code>=</code>. There is no <code>append</code> to forget and no other list to append to.',
          'Press <b>Run</b>: <code>[\'rice\', \'lentils\', \'tofu\']</code>, then <code>[0.75, 0.4, 0.2]</code>, then <code>1.35 kg to carry home</code>. Two lists, two lines, each one easy to check by reading it.',
          'Then go back to <code>two_lists.py</code> in The pain and fix it there too: replace each four-line loop with one comprehension, and run it.'
        ],
        tip: 'Need only the total? Leave out the square brackets: <code>sum(grams for name, grams, gluten_free in pantry if gluten_free)</code> gives <code>1350</code> without building a list first. That is a <b>generator expression</b>. Lesson 83, Generators, explains what it is.'
      },
      {
        label: 'Try it', pic: run(guests, { title: 'guests.py' }),
        h: 'Dict and set comprehensions.',
        text: [
          '<b>Dict comprehension.</b> Curly brackets and a <code>key: value</code> at the front build a dict (lesson 37): <code>{name: grams for ...}</code> gives the pantry as a label-to-grams rack. <code>day_kcal.items()</code> (lesson 38) hands over each guest with their calories, so <code>{name: kcal // 4 ...}</code> gives each friend\'s dinner: <code>{\'Ana\': 650, \'Ben\': 700, \'Chloe\': 500}</code>.',
          '<b>Set comprehension.</b> Curly brackets with <b>no</b> colon build a set (lesson 39): one of each. <code>"Pasta"</code> and <code>"pasta"</code> both become <code>"pasta"</code>, so three dishes are left. A set has no order, so print it with <code>sorted()</code>.',
          'Press <b>Run</b>. Then change it: give only the guests who eat <b>more than 2500 kcal</b> a day. Add <code>if kcal &gt; 2500</code> at the end of the dict comprehension. Before you run it, say who is left. (Ana and Ben.)'
        ],
        tip: 'There is no "tuple comprehension". Round brackets around <code>x for x in ...</code> make a generator expression, the one from the tip above.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Short is good. Too short is not.',
        text: [
          '<b>A choice goes before the for. A filter goes after it.</b> <code>if gluten_free</code> at the end <b>drops</b> items. To keep <b>every</b> item and pick one of two values, use a one-line if and else in the what part: <code>name if gluten_free else "----"</code> means "the name if it is gluten-free, otherwise <code>"----"</code>". It goes <b>before</b> the for. Run <code>labels.py</code>: 3 items, then 5. Put <code>else</code> after the for and Python stops with <code>SyntaxError: invalid syntax</code>, the arrows under <code>else</code>.',
          '<b>Two fors and an if is too much.</b> <code>plates.py</code> pairs every guest with every dish Chloe can eat, like a nested loop (lesson 29). In one line it is correct, but it is hard to read and hard to change. The normal loop says the same thing step by step. If it does not fit comfortably on one line, write the loop.',
          '<b>A comprehension builds a list. It is not a way to run a step for each item.</b> <code>[print(name) for name in names]</code> prints the names, and also builds a useless list of <code>None</code>, one per print (lesson 16). To print, or do anything else for each item, write a plain <code>for</code> loop.'
        ],
        warn: 'Rule of thumb: use a comprehension when you want a <b>new list, dict or set</b> and it reads as one short sentence. Use a <code>for</code> loop for anything else: printing, <code>break</code>, several steps per item, or a line that keeps growing.'
      }
    ],
    exercises: [
      {
        file: 'l76_shopping_list.py', title: 'Chloe\'s shopping list',
        task: 'Kitchen Coach has a pantry of dicts. Write <b>three comprehensions</b>, one line each: the <b>names</b> of the gluten-free items, the <b>kilograms</b> of every item, and a <b>dict</b> of name to kcal for the items over 100 kcal.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. It prints what each name holds now, and the first hint.',
          'Between <code>START</code> and <code>END</code>, replace each <code>None</code> with a comprehension. Look at the pantry at the top of the file: each item is a dict, so use <code>item["name"]</code>, <code>item["grams"]</code> and so on.',
          'Run it until it says <code>PASS</code>. The check also tries your lines on a second pantry, and makes sure each answer is a comprehension.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['protein_g = [20, 18, 13]', 'print([g * 2 for g in protein_g if g > 15])'], { title: 'ben.py' }),
        options: ['[40, 36]', '[40, 36, 26]', '[20, 18]', '[36, 26]'],
        answer: 0,
        why: 'The filter keeps 20 and 18 (13 is not over 15). The what part doubles each one that is kept: 40 and 36.',
        hint: 'First decide which items pass the if. Then apply g * 2 to those.'
      },
      {
        type: 'order', q: 'Put the pieces in order to build Chloe\'s list of gluten-free names.',
        items: ['shopping = [', 'name', 'for name, grams, gluten_free in pantry', 'if gluten_free', ']'],
        why: 'What, for each, which: <code>[name for name, grams, gluten_free in pantry if gluten_free]</code>.',
        hint: 'What goes on the list comes first, right after the bracket.'
      },
      {
        type: 'fix', q: 'The kilograms land on the shopping list and <code>kg</code> stays empty. Fix it so the program prints <code>[\'rice\', \'lentils\', \'tofu\']</code> and then <code>[0.75, 0.4, 0.2]</code>.',
        code: twoLists, title: 'two_lists.py',
        check: [
          'lines = out.strip().splitlines()',
          'want = ["[\'rice\', \'lentils\', \'tofu\']", "[0.75, 0.4, 0.2]"]',
          'if lines == want:',
          '    ok = True',
          'elif len(lines) == 2 and "0.75" in lines[0]:',
          '    msg = "The kilograms still go on the shopping list. Which list does the second append add to?"',
          'elif len(lines) == 2 and lines[1] == "[]":',
          '    msg = "kg is still empty. Build it with [grams / 1000 for ... if gluten_free]."',
          'else:',
          '    msg = "It should print exactly two lines: [\'rice\', \'lentils\', \'tofu\'] and [0.75, 0.4, 0.2]"'
        ].join('\n'),
        why: 'Either change the second <code>shopping.append</code> to <code>kg.append</code>, or better, write both lists as comprehensions: <code>kg = [grams / 1000 for name, grams, gluten_free in pantry if gluten_free]</code>. Then the list name appears only once.',
        hint: 'Look at the last line inside the second loop.'
      },
      {
        type: 'fix', q: 'This stops with <code>SyntaxError: invalid syntax</code>. Fix the comprehension so it prints <code>[\'rice\', \'----\', \'lentils\', \'----\', \'tofu\']</code>: every item, with <code>----</code> for the ones with gluten.',
        code: [...PANTRY, '', 'labels = [name for name, grams, gluten_free in pantry if gluten_free else "----"]', 'print(labels)'],
        title: 'labels.py',
        check: [
          'got = out.strip()',
          'if got == "[\'rice\', \'----\', \'lentils\', \'----\', \'tofu\']":',
          '    ok = True',
          'elif got == "[\'rice\', \'lentils\', \'tofu\']":',
          '    msg = "That is the filter: it drops items. Keep every item and choose the value before the for: name if gluten_free else \\"----\\""',
          'else:',
          '    msg = "It printed " + got + ". You want [\'rice\', \'----\', \'lentils\', \'----\', \'tofu\']"'
        ].join('\n'),
        why: 'A choice of two values goes <b>before</b> the for: <code>[name if gluten_free else "----" for name, grams, gluten_free in pantry]</code>. An <code>if</code> after the for is a filter and cannot have an <code>else</code>.',
        hint: 'Move  if gluten_free else "----"  so it sits right after name, before the for.'
      },
      {
        type: 'fill', q: 'Build a dict of each friend\'s dinner calories, a quarter of their day.',
        text: 'day_kcal = {"Ana": 2600, "Ben": 2800, "Chloe": 2000}\ndinner = {name___ kcal // 4 for name, kcal in day_kcal.___()}',
        options: [':', 'items', ',', 'keys', '=', 'values'],
        answer: [':', 'items'],
        why: 'A dict comprehension has <code>key: value</code> at the front. <code>.items()</code> hands over each key with its value, so the loop can unpack <code>name, kcal</code>.',
        hint: 'How is a key separated from its value inside curly brackets?'
      },
      {
        type: 'bucket', q: 'Comprehension or a normal <code>for</code> loop?',
        buckets: ['A comprehension', 'A normal for loop'],
        items: [
          ['A new list of the gluten-free names', 0],
          ['Every number in a list, doubled', 0],
          ['A dict of name to grams', 0],
          ['Print a line for each guest', 1],
          ['Stop at the first item with gluten', 1],
          ['Two fors, two ifs and an f-string', 1]
        ],
        why: 'A comprehension builds a new list, dict or set in one readable line. Printing, <code>break</code>, and anything that does not read as one short sentence belong in a loop.',
        hint: 'Is the job "make a new collection", and does it fit in one short line?'
      },
      {
        type: 'pick', q: 'What does <code>result</code> hold after this runs?',
        pic: code(['names = ["rice", "tofu"]', 'result = [print(name) for name in names]'], { title: 'print_all.py' }),
        options: ['[None, None]', "['rice', 'tofu']", '[]', 'Nothing: it is a SyntaxError'],
        answer: 0,
        why: 'Each round calls <code>print(name)</code>, which shows the name and gives back <code>None</code>. The comprehension puts those <code>None</code>s on the list. For printing, use a plain loop.',
        hint: 'What does print() give back?'
      },
      {
        type: 'pick', q: 'Back to lesson 34. What does this print?',
        pic: code(['shopping = ["rice"]', 'shopping = shopping.append("tofu")', 'print(shopping)'], { title: 'list.py' }),
        options: ['None', "['rice', 'tofu']", "['rice']", 'AttributeError'],
        answer: 0,
        why: '<code>.append()</code> changes the list in place and gives back <code>None</code>. Storing that in <code>shopping</code> throws the list away. A comprehension is the opposite: it gives back a new list, so <code>shopping = [...]</code> is right.',
        hint: 'What does .append() hand back?'
      }
    ]
  });
})();
