/* Lesson 79: *args and **kwargs (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l79  *args and **kwargs
     ===================================================================== */

  // 12 px JetBrains Mono advances 7.2 px per character.
  const CH = 7.2;
  const mono = (x, y, parts) => parts.map(([c, s, f]) => T(x + c * CH, y, s, { s: 12, m: true, w: 600, a: 'start', f: f || P.ink })).join('');
  // A dish on the tray: a small white card with its name.
  const chip = (x, y, s, w) => `<rect x="${x}" y="${y}" width="${w || 66}" height="30" rx="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(x + (w || 66) / 2, y + 20, s, { s: 12 });
  const tray = (x, y, w, label) => `<rect x="${x}" y="${y}" width="${w}" height="56" rx="12" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x + 10, y - 6, label, { s: 11.5, m: true, a: 'start', f: P.accent });
  // A sticky note on the board.
  const note = (x, y, s, w, col) => `<rect x="${x}" y="${y}" width="${w}" height="30" rx="5" fill="${col || '#FFE58A'}" stroke="${P.ink}" stroke-width="2"/>` + T(x + w / 2, y + 20, s, { s: 11.5, m: true, w: 700 });

  /* ---- The idea: one star, any number of dishes ---- */
  const ideaSvg = svg(600, 344, 'Three calls of the same card, def plate(*dishes). plate("rice", "beans", "salsa") puts 3 dishes on the tray: the tuple (\'rice\', \'beans\', \'salsa\'). plate("pasta") puts 1 dish on the tray: (\'pasta\',). plate() leaves the tray empty: (). The star collects every value the call brings into one tuple.',
    box(20, 14, 560, 40, P.tint, 10) + mono(36, 39, [[0, 'def', P.accent], [4, 'plate('], [10, '*dishes', P.danger], [17, '):']]) +
    T(560, 39, 'any number of dishes', { s: 12, a: 'end', f: P.ink2 }) +
    [
      ['plate("rice", "beans", "salsa")', ['rice', 'beans', 'salsa'], "('rice', 'beans', 'salsa')"],
      ['plate("pasta")', ['pasta'], "('pasta',)"],
      ['plate()', [], '()']
    ].map(([call, dishes, tup], i) => {
      const y = 84 + i * 86;
      return mono(20, y + 32, [[0, call]]) +
        arrow(258, y + 28, 296, y + 28, P.ink2, 2) +
        tray(306, y + 4, 222, i === 0 ? '*dishes' : '') +
        dishes.map((d, k) => chip(314 + k * 70, y + 17, d)).join('') +
        (dishes.length ? '' : T(417, y + 37, 'empty', { s: 12, f: P.mute })) +
        T(574, y + 37, String(dishes.length), { s: 20, f: P.accent }) +
        T(306, y + 80, tup, { s: 11.5, m: true, a: 'start', f: P.ok });
    }).join(''));
  const plateCode = [
    'def plate(*dishes):',
    '    print(f"{len(dishes)} on the plate: {dishes}")',
    '',
    'plate("rice", "beans", "salsa")',
    'plate("pasta")',
    'plate()'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(plateCode, { title: 'plate.py' })}</div>`;

  /* ---- The code: **notes, and all four kinds together ---- */
  const orderRule = svg(600, 214, 'The card def make(dish, *toppings, servings=2, **notes), in four parts, always in this order. dish is a normal parameter: the first plain value. *toppings collects the rest of the plain values in a tuple. servings=2 comes after the star, so it can only be filled by name: keyword-only. **notes collects every other named value in a dict.',
    box(20, 14, 560, 44, P.white, 10) +
    mono(32, 41, [[0, 'def', P.accent], [4, 'make('], [9, 'dish', P.ink], [13, ', '], [15, '*toppings', P.ok], [24, ', '], [26, 'servings=2', P.warn], [36, ', '], [38, '**notes', P.danger], [45, '):']]) +
    [[9, 4, P.ink, '1. normal', ['the first', 'plain value']], [15, 9, P.ok, '2. *toppings', ['the other plain', 'values: a tuple']], [26, 10, P.warn, '3. keyword-only', ['by name only:', 'servings=3']], [38, 7, P.danger, '4. **notes', ['the other named', 'values: a dict']]].map(([c, len, col, h, sub], i) => {
      const cx = 32 + (c + len / 2) * CH, bx = 20 + i * 142;
      return `<line x1="${32 + c * CH + 1}" y1="52" x2="${32 + (c + len) * CH - 1}" y2="52" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>` +
        `<path d="M${cx} 58 L${bx + 66} 96" stroke="${col}" stroke-width="2" fill="none"/>` +
        `<rect x="${bx}" y="96" width="132" height="96" rx="10" fill="${P.paper2}" stroke="${col}" stroke-width="2.5"/>` +
        T(bx + 66, 120, h, { s: 12.5, f: col }) +
        sub.map((line, k) => T(bx + 66, 146 + k * 18, line, { s: 11.5, w: 700, f: P.ink2 })).join('');
    }).join('') +
    T(300, 210, 'always in this order: normal, *args, keyword-only, **kwargs', { s: 12, w: 700, f: P.ink2 }));
  const orderCode = [
    'def order(dish, **notes):',
    '    print(f"{dish}: {notes}")',
    '',
    'order("pancakes", gluten_free=True, extra="cream")',
    'order("soup")',
    '',
    'def make(dish, *toppings, servings=2, **notes):',
    '    print(f"{servings} x {dish}")',
    '    print(f"  toppings: {toppings}")',
    '    print(f"  notes: {notes}")',
    '',
    'make("pancakes", "berries", "syrup", servings=3, gluten_free=True)',
    'make("oats")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(orderCode, { title: 'order.py' })}${orderRule}</div>`;

  /* ---- The pain: the meals are already in a list ---- */
  const meals = [
    'def total_kcal(*amounts):',
    '    print(f"amounts = {amounts}")',
    '    return sum(amounts)',
    '',
    'print(total_kcal(450, 320, 610))',
    '',
    'ben_meals = [450, 320, 610]',
    'print(total_kcal(ben_meals))'
  ];
  const painSvg = svg(600, 170, 'Left: total_kcal(450, 320, 610) puts three numbers on the tray, and sum adds them: 1380. Right: total_kcal(ben_meals) puts ONE thing on the tray, the whole list, still closed like a bag. sum tries 0 plus a list and stops with a TypeError.',
    T(150, 22, 'total_kcal(450, 320, 610)', { s: 12, m: true, w: 600 }) +
    tray(24, 46, 252, '*amounts') + chip(34, 59, '450', 70) + chip(114, 59, '320', 70) + chip(194, 59, '610', 70) +
    T(150, 132, 'sum: 1380 ✓', { s: 14, f: P.ok }) +
    T(450, 22, 'total_kcal(ben_meals)', { s: 12, m: true, w: 600 }) +
    tray(324, 46, 252, '*amounts') +
    `<path d="M352 60 h140 l-6 30 h-128 z" fill="#EAD9BF" stroke="${P.ink}" stroke-width="2" stroke-linejoin="round"/>` +
    T(422, 81, '[450, 320, 610]', { s: 11.5, m: true, w: 700 }) +
    T(536, 81, '1 item', { s: 12, f: P.danger }) +
    T(450, 132, 'sum: 0 + a list? TypeError', { s: 14, f: P.danger }) +
    T(300, 162, 'the list goes in as ONE value, still closed', { s: 12, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(meals, { title: 'meals.py' })}${painSvg}</div>`;

  /* ---- The fix: * and ** in the call spread a list or a dict ---- */
  const spread = [
    'def total_kcal(*amounts):',
    '    return sum(amounts)',
    '',
    'def make(dish, *toppings, servings=2, **notes):',
    '    return f"{servings} x {dish}, toppings {toppings}, notes {notes}"',
    '',
    'ben_meals = [450, 320, 610]',
    'print(total_kcal(*ben_meals))',
    '',
    'chloe_order = {"dish": "pancakes", "servings": 1, "gluten_free": True, "extra": "cream"}',
    'print(make(**chloe_order))',
    '',
    'ana_toppings = ["banana", "honey"]',
    'print(make("porridge", *ana_toppings, servings=2))'
  ];
  const fixSvg = svg(600, 150, 'Top: total_kcal(*ben_meals). The star in the call opens the bag, so the call is the same as total_kcal(450, 320, 610). Bottom: make(**chloe_order). Two stars in the call turn each key and value of the dict into a named value, the same as make(dish="pancakes", servings=1, gluten_free=True, extra="cream").',
    mono(20, 30, [[0, 'total_kcal('], [11, '*', P.danger], [12, 'ben_meals)']]) +
    arrow(178, 26, 214, 26, P.ink2, 2) +
    mono(224, 30, [[0, 'total_kcal(450, 320, 610)', P.ok]]) +
    T(20, 58, 'one star: the list spills out as plain values', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    mono(20, 98, [[0, 'make('], [5, '**', P.danger], [7, 'chloe_order)']]) +
    arrow(162, 94, 198, 94, P.ink2, 2) +
    mono(208, 98, [[0, 'make(dish="pancakes", servings=1,', P.ok]]) +
    mono(208, 118, [[5, 'gluten_free=True, extra="cream")', P.ok]]) +
    T(20, 144, 'two stars: each key becomes a name, each value its value', { s: 12, w: 700, a: 'start', f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${run(spread, { title: 'spread.py' })}${fixSvg}</div>`;

  /* ---- Try it: Ben's protein ---- */
  const protein = [
    'def total_protein(*grams):',
    '    return sum(grams)',
    '',
    'def protein_report(name, **foods):',
    '    for food, grams in foods.items():',
    '        print(f"  {food}: {grams} g")',
    '    print(f"{name}: {sum(foods.values())} g protein")',
    '',
    '# Ben\'s lunch: lentils, tofu and yogurt',
    'print(total_protein(18, 12, 10))',
    'protein_report("Ben", lentils=18, tofu=12, yogurt=10)'
  ];

  /* ---- The catch: **notes swallows a typo ---- */
  const loose = [
    'def order(dish, **notes):',
    '    if notes.get("gluten_free"):',
    '        print("Gluten-free kitchen")',
    '    print(f"Order: {dish}")',
    '',
    'order("pancakes", gluten_free=True)',
    'order("pancakes", glutn_free=True)   # a typo: no e'
  ];
  const strict = [
    'def order(dish, gluten_free=False, extra=None):',
    '    if gluten_free:',
    '        print("Gluten-free kitchen")',
    '    print(f"Order: {dish}")',
    '',
    'order("pancakes", gluten_free=True)',
    'order("pancakes", glutn_free=True)   # a typo: no e'
  ];
  const catchSvg = svg(600, 128, 'The notes board of order(dish, **notes) after the typo call. The note glutn_free=True sits on the board, with a dashed ring and a pill that says missed: the function only looks for gluten_free, so nobody reads this note, and Chloe\'s pancakes are made without the gluten-free check.',
    `<rect x="20" y="14" width="330" height="100" rx="12" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(32, 34, '**notes', { s: 12, m: true, a: 'start', f: P.accent }) +
    note(46, 56, 'glutn_free=True', 170) +
    `<ellipse cx="131" cy="71" rx="104" ry="30" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    `<rect x="248" y="58" width="78" height="26" rx="13" fill="${P.dangerT}"/>` + T(287, 76, 'missed', { s: 12.5, f: P.danger }) +
    T(372, 46, 'Nobody reads this note.', { s: 13, a: 'start' }) +
    T(372, 70, 'The code looks for gluten_free.', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(372, 94, 'No error. Wrong pancakes.', { s: 12, w: 700, a: 'start', f: P.danger }));
  const catchPic = `<div style="width:100%;min-width:0">${run(loose, { title: 'typo.py' })}${catchSvg}${run(strict, { title: 'typo_named.py' })}</div>`;

  COURSE.add({
    id: 'l79', minutes: 13,
    summary: 'A star in front of a parameter collects <b>any number</b> of plain values into a <b>tuple</b>: <code>def plate(*dishes):</code> works for <code>plate("rice", "beans", "salsa")</code>, <code>plate("pasta")</code> and <code>plate()</code>. Two stars collect any number of <b>named</b> values into a <b>dict</b>: <code>def order(dish, **notes):</code> turns <code>gluten_free=True, extra="cream"</code> into <code>{\'gluten_free\': True, \'extra\': \'cream\'}</code>. The usual names are <code>*args</code> and <code>**kwargs</code>. The order on the card is always: normal, <code>*args</code>, keyword-only, <code>**kwargs</code>. A parameter after the star can only be filled <b>by name</b>. In a <b>call</b>, the stars do the opposite and spread: <code>total_kcal(*ben_meals)</code>, <code>make(**chloe_order)</code>. When you know the names, write them out: <code>**kwargs</code> takes a typo like <code>glutn_free=True</code> without a word.',
    video: {
      src: 'videos/l79-args-and-kwargs.mp4', poster: 'videos/l79-args-and-kwargs.jpg', length: '1 min 12 s',
      script: [
        'Kitchen Coach serves dinner. But tonight, nobody knows how many dishes are coming.',
        'So plate gets one parameter, with a star in front. Star dishes.',
        'Call plate with rice, beans and salsa. Each one slides into a single tray, a tuple called dishes. One dish or ten, the star collects them all.',
        'Chloe\'s order comes with notes. Gluten free equals True. Extra equals cream. Two stars in front of notes collect the named values. They stick to a board. A dictionary.',
        'Ben\'s meals are already in a list. Put a star before the list in the call, and it spills out, one value each. 1380 calories.',
        'Now the catch. Chloe\'s note has a typo: gluten, with no e. Double star notes takes it anyway. No error, and nobody checks the gluten. When you know the names, write them out, and Python catches the typo.',
        'Star args collects extra values in a tuple. Double star keyword args collects named ones in a dict.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One star, any number of dishes.',
        text: [
          'Kitchen Coach plates dinner. Some nights it is three dishes, some nights one, some nights none yet. A card like <code>def plate(a, b, c):</code> (lesson 45) needs <b>exactly three</b>. Call it with one dish and Python stops: <code>missing 2 required positional arguments</code>.',
          'Put a <b>star</b> in front of the parameter: <code>def plate(*dishes):</code>. Now the card takes <b>any number</b> of plain values. Python collects them all into <b>one tuple</b> (lesson 36) called <code>dishes</code>, in the order they came. That is the tray in the picture.',
          'Press <b>Run</b>. Three dishes give <code>(\'rice\', \'beans\', \'salsa\')</code>. One dish gives <code>(\'pasta\',)</code>, with the comma that marks a tuple of one. No dishes give <code>()</code>, an empty tuple, and no error. Then add a fourth dish to the first call and run it again.'
        ],
        tip: 'The name after the star is yours to choose. <code>*dishes</code> says what it holds, which is best. In general code you will see <code>*args</code>, short for "arguments". The star does the work, not the name.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Two stars collect the named ones.',
        text: [
          '<b>Two stars</b> collect <b>named</b> values (keyword arguments, lesson 46). <code>def order(dish, **notes):</code> takes the dish, then any number of <code>name=value</code> notes. Python puts them in a <b>dict</b> (lesson 37): <code>{\'gluten_free\': True, \'extra\': \'cream\'}</code>. No notes give an empty dict, <code>{}</code>. The usual general name is <code>**kwargs</code>, short for "keyword arguments".',
          '<b>All four kinds on one card.</b> <code>def make(dish, *toppings, servings=2, **notes):</code>. The order is fixed, as in the picture: normal parameters, then <code>*toppings</code>, then the ones with a name, then <code>**notes</code>. In the first call, <code>"pancakes"</code> fills <code>dish</code>, the next plain values go to <code>toppings</code>, <code>servings=3</code> fills its own jar, and the name nobody asked for, <code>gluten_free</code>, lands in <code>notes</code>. Press <b>Run</b>.',
          '<b>After the star, names only.</b> <code>*toppings</code> takes <b>every</b> plain value that is left. So <code>servings</code> can never get a plain value: it is <b>keyword-only</b>. Try it: add <code>make("pancakes", "berries", 4)</code> and run. You get <code>2 x pancakes</code> with toppings <code>(\'berries\', 4)</code>. The 4 became a topping. No error. Write <code>servings=4</code> and it works.'
        ],
        tip: 'Leave out the dish, <code>make(servings=3)</code>, and Python stops: <code>TypeError: make() missing 1 required positional argument: \'dish\'</code>. The stars make room for extras. The normal parameters are still required.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The meals are already in a list.',
        text: [
          'Ben logs his meals in a list (lesson 31): <code>ben_meals = [450, 320, 610]</code>. Kitchen Coach has <code>total_kcal(*amounts)</code>. So you hand it the list. Press <b>Run</b>.',
          'The first call works: <code>amounts = (450, 320, 610)</code> and <code>1380</code>. The second prints <code>amounts = ([450, 320, 610],)</code>, a tuple with <b>one</b> item: the whole list. The star collected exactly what you passed, <b>one value</b>, and that value is a list.',
          'Then <code>sum()</code> tries to add <code>0 + [450, 320, 610]</code> and stops: <code>TypeError: unsupported operand type(s) for +: \'int\' and \'list\'</code>. You could type <code>total_kcal(ben_meals[0], ben_meals[1], ben_meals[2])</code>. But that breaks the day Ben eats four meals.'
        ],
        warn: 'Read the error from the bottom: the problem shows up inside <code>total_kcal</code>, on the <code>sum</code> line. But the cause is in the <b>call</b>. Printing what the function got, like <code>amounts</code> here, finds it fast.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A star in the call opens the bag.',
        text: [
          'Put the star in the <b>call</b>: <code>total_kcal(*ben_meals)</code>. In a call the star does the <b>opposite</b> job. It opens the list and passes each item as its own value, exactly as if you had typed <code>total_kcal(450, 320, 610)</code>. Lesson 78 did the same with <code>print(*bag)</code>. Press <b>Run</b>: <code>1380</code>.',
          'Two stars in a call open a <b>dict</b>: each key becomes a name and each value its value. Chloe\'s saved order <code>chloe_order</code> holds the dish, the servings and her notes. <code>make(**chloe_order)</code> is the same as <code>make(dish="pancakes", servings=1, gluten_free=True, extra="cream")</code>.',
          'You can mix them: <code>make("porridge", *ana_toppings, servings=2)</code>. Change <code>ana_toppings</code> to three toppings and run it again. The card does not change.'
        ],
        tip: 'One rule for both places. In a <code>def</code>, stars <b>collect</b>. In a call, stars <b>spread</b>.'
      },
      {
        label: 'Try it', pic: run(protein, { title: 'protein.py' }),
        h: 'Ben\'s protein, any number of foods.',
        text: [
          '<code>total_protein(*grams)</code> adds any number of protein grams. <code>protein_report(name, **foods)</code> takes each food by name. <code>foods.items()</code> (lesson 38) hands over each food with its grams. Press <b>Run</b>: Ben\'s lunch has <b>40 g</b> of protein.',
          'Add Ben\'s dinner below: <code>protein_report("Ben", chickpeas=15, eggs=13, cheese=7)</code>. Before you run it, say the total. (35 g.)',
          'Then break it twice, and read each error. Add <code>unit="g"</code> to the <code>total_protein</code> call. Then call <code>protein_report(lentils=18)</code> with no name. Press Reset when you are done.'
        ],
        tip: 'The two errors: <code>TypeError: total_protein() got an unexpected keyword argument \'unit\'</code>, because a card with only <code>*grams</code> accepts no names at all. And <code>TypeError: protein_report() missing 1 required positional argument: \'name\'</code>, because <code>**foods</code> only collects extras. The name is still required.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'When you know the names, write them out.',
        text: [
          '<code>**notes</code> takes <b>any</b> name. That includes the wrong one. Chloe\'s second order says <code>glutn_free=True</code>, with no e. Press <b>Run</b> on the first <code>typo.py</code>. The first order prints <code>Gluten-free kitchen</code>. The second just prints <code>Order: pancakes</code>. The typo landed in the dict, nobody looks for it, and there is <b>no error</b>. Chloe gets ordinary pancakes.',
          'Now run the second box. The card names its parameters: <code>gluten_free=False, extra=None</code>. The same typo stops the program: <code>TypeError: order() got an unexpected keyword argument \'glutn_free\'. Did you mean \'gluten_free\'?</code>. Python catches the typo, and even suggests the fix. The names on the card also tell the reader what the card needs, without opening it.',
          'So use the stars when the number of values really is open: a sum of any number of meals, a plate of any number of dishes, or a function that only <b>passes</b> everything on to another function. Lesson 84, Decorators, uses <code>*args, **kwargs</code> exactly like that, to wrap any function without knowing its parameters.'
        ],
        warn: 'If you know the parameters, write them out. <code>def order(dish, **notes)</code> hides what the card needs and swallows typos. <code>def order(dish, gluten_free=False, extra=None)</code> shows it and catches them.'
      }
    ],
    exercises: [
      {
        file: 'l79_any_guests.py', title: 'Cook for any number of guests',
        task: 'Write <code>total_protein</code> so it adds <b>any number</b> of grams, and <code>place_order</code> so it takes a dish and <b>any number of named notes</b>, and gives back one line: <code>"pancakes (gluten_free=True, extra=cream)"</code>, or <code>"soup (no notes)"</code> when there are none.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. It shows what your two functions give now, and the first hint.',
          'Between <code>START</code> and <code>END</code>, give <code>total_protein</code> one parameter with a star, and give <code>place_order</code> a <code>**notes</code> parameter. Build the <code>key=value</code> pieces from <code>notes.items()</code> and join them with <code>", "</code>.',
          'Run it until it says <code>PASS</code>. The check also calls your functions with other values, and with no values at all.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def plate(*dishes):', '    print(dishes)', '', 'plate("pasta")'], { title: 'plate.py' }),
        options: ["('pasta',)", "'pasta'", "['pasta']", 'pasta'],
        answer: 0,
        why: 'A starred parameter is <b>always</b> a tuple, even with one value. A tuple of one is shown with a comma: <code>(\'pasta\',)</code>.',
        hint: 'What kind of collection does a star make?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def order(dish, **notes):', '    print(notes)', '', 'order("tea", milk="oat", sugar_g=0)'], { title: 'tea.py' }),
        options: ["{'milk': 'oat', 'sugar_g': 0}", "('oat', 0)", "{'dish': 'tea', 'milk': 'oat', 'sugar_g': 0}", "['milk', 'sugar_g']"],
        answer: 0,
        why: '<code>"tea"</code> fills <code>dish</code>. The two named values that are left go into the dict <code>notes</code>, name as key, value as value.',
        hint: 'Does dish go into notes, or into its own parameter?'
      },
      {
        type: 'order', q: 'Put the parameters of <code>make</code> in the only order Python accepts.',
        items: ['def make(dish,', '*toppings,', 'servings=2,', '**notes):'],
        why: 'Normal parameters first, then <code>*args</code>, then the keyword-only ones, and <code>**kwargs</code> always last.',
        hint: 'The two-star parameter collects everything named that is left, so it comes at the very end.'
      },
      {
        type: 'fix', q: 'This stops with <code>TypeError: unsupported operand type(s) for +: \'int\' and \'list\'</code>. Change only the <b>call</b> so it prints <code>1380</code>.',
        code: ['def total_kcal(*amounts):', '    return sum(amounts)', '', 'ben_meals = [450, 320, 610]', 'print(total_kcal(ben_meals))'],
        title: 'meals.py',
        check: [
          'got = out.strip()',
          'import inspect',
          'kinds = [p.kind for p in inspect.signature(total_kcal).parameters.values()]',
          'if inspect.Parameter.VAR_POSITIONAL not in kinds:',
          '    msg = "Keep the card as it is: def total_kcal(*amounts). Fix the call instead."',
          'elif ben_meals != [450, 320, 610]:',
          '    msg = "Keep Ben\\\'s list as it is: [450, 320, 610]. Change only the call."',
          'elif got == "1380":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + got + ". Put a star in front of the list in the call: total_kcal(*ben_meals)"'
        ].join('\n'),
        why: '<code>total_kcal(*ben_meals)</code>. In a call the star opens the list, so each meal arrives as its own value.',
        hint: 'In a def, a star collects. In a call, it spreads.'
      },
      {
        type: 'fix', q: 'Ben wants <b>4</b> servings, but this makes 2 and treats the 4 as a topping. Fix the call so it prints <code>4 x pancakes, toppings (\'berries\',)</code>.',
        code: ['def make(dish, *toppings, servings=2):', '    print(f"{servings} x {dish}, toppings {toppings}")', '', 'make("pancakes", "berries", 4)'],
        title: 'servings.py',
        check: [
          'got = out.strip()',
          'if got == "4 x pancakes, toppings (\'berries\',)":',
          '    ok = True',
          'elif "4)" in got:',
          '    msg = "The 4 is still a topping. After *toppings, servings can only be filled by name."',
          'else:',
          '    msg = "It printed " + got + ". It should print 4 x pancakes, toppings (\'berries\',)"'
        ].join('\n'),
        why: '<code>make("pancakes", "berries", servings=4)</code>. <code>*toppings</code> takes every plain value that is left, so <code>servings</code> is keyword-only: it must be named.',
        hint: 'Name the jar.'
      },
      {
        type: 'bucket', q: 'The card is <code>def make(dish, *toppings, servings=2, **notes):</code>. Which calls run, and which stop with an error?',
        buckets: ['Runs', 'Stops with an error'],
        items: [
          ['make("oats")', 0],
          ['make("oats", "nuts", "honey", "figs")', 0],
          ['make("oats", servings=3, vegan=True)', 0],
          ['make(dish="oats", gluten_free=True)', 0],
          ['make()', 1],
          ['make(servings=3)', 1],
          ['make(servings=3, "oats")', 1]
        ],
        why: '<code>dish</code> has no default, so <code>make()</code> and <code>make(servings=3)</code> are missing it. A plain value after a named one is a <code>SyntaxError</code> (lesson 46). Everything else fits: extra plain values go to <code>toppings</code>, extra names to <code>notes</code>.',
        hint: 'Is the dish there? Do plain values come before names?'
      },
      {
        type: 'pick', q: 'Which is the better card for Kitchen Coach\'s orders, and why?',
        pic: code(['def order_a(dish, **notes): ...', 'def order_b(dish, gluten_free=False, extra=None): ...', '', 'order_a("pancakes", glutn_free=True)', 'order_b("pancakes", glutn_free=True)'], { title: 'orders.py' }),
        options: [
          'order_b: the typo stops it with a TypeError that even suggests gluten_free',
          'order_a: it accepts any note, so it never crashes',
          'They are the same: both ignore the typo',
          'order_a: **notes checks the spelling of every note'
        ],
        answer: 0,
        why: '<code>order_a</code> drops <code>glutn_free</code> into the dict, and nobody reads it. No error, wrong pancakes. <code>order_b</code> names its parameters, so Python says <code>got an unexpected keyword argument \'glutn_free\'. Did you mean \'gluten_free\'?</code>. When you know the names, write them out.',
        hint: 'A crash with a clear message is better than a quiet wrong dish.'
      },
      {
        type: 'pick', q: 'Back to lesson 36. What happens when this runs?',
        pic: code(['def plate(*dishes):', '    dishes.append("bread")', '    return dishes', '', 'print(plate("soup"))'], { title: 'bread.py' }),
        options: ["AttributeError: 'tuple' object has no attribute 'append'", "('soup', 'bread')", "['soup', 'bread']", 'TypeError: plate() takes 0 positional arguments'],
        answer: 0,
        why: '<code>*dishes</code> is a <b>tuple</b>, and a tuple never changes, so it has no <code>.append()</code>. Python 3.15 even adds: <code>Did you mean to use a \'list\' object?</code>. To add a dish, make a new tuple, <code>dishes + ("bread",)</code>, or a list, <code>list(dishes)</code>.',
        hint: 'What kind of collection does the star make, and can it change?'
      }
    ]
  });
})();
