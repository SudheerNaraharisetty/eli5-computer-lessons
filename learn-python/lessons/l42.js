/* Lesson 42: Choosing the right one (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l42  Choosing the right one
     ===================================================================== */

  // The four containers, each with its colour and the brackets that make it.
  const KINDS = [
    { name: 'list', mark: '[ ]', col: P.accent, tint: P.tint },
    { name: 'tuple', mark: '( )', col: P.ok, tint: P.okT },
    { name: 'dict', mark: '{k: v}', col: P.warn, tint: P.warnT },
    { name: 'set', mark: '{ }', col: P.danger, tint: P.dangerT }
  ];

  // A drawer: a labelled box with a handle.
  const drawer = (x, y, k) =>
    box(x, y, 104, 66, k.tint, 12) +
    T(x + 52, y + 28, k.name, { s: 17, m: true, f: k.col }) +
    T(x + 52, y + 50, k.mark, { s: 13, m: true, f: P.ink2 }) +
    `<rect x="${x + 36}" y="${y + 57}" width="32" height="5" rx="2.5" fill="${P.ink}"/>`;

  const JOBS = [
    ['Order of the courses', 'soup, chili, pudding', 'Does the order matter,', 'and will it change?'],
    ['The oven setting', '180, "fan"', 'Is it a fixed record', 'that never changes?'],
    ['Protein goal per guest', 'Ben → 140 g', 'Will I look things up', 'by a name?'],
    ['Every allergen', 'nuts, sesame, gluten', 'Do I only ask "is it in?"', 'One of each?']
  ];
  const ideaPic = svg(600, 356, 'Four kitchen jobs for the dinner party, each with its question and the container it goes in. The order of the courses: does the order matter, and will it change? A list. The oven setting, 180 and fan: a fixed record? A tuple. The protein goal per guest: will I look things up by a name? A dict. Every allergen: do I only ask "is it in?", one of each? A set.',
    JOBS.map(([title, ex, q1, q2], i) => {
      const y = 12 + i * 84, k = KINDS[i];
      return box(12, y, 214, 66, P.white, 12) +
        T(24, y + 28, title, { s: 14, a: 'start' }) +
        T(24, y + 50, ex, { s: 12, m: true, w: 700, f: P.ink2, a: 'start' }) +
        T(348, y + 29, q1, { s: 12.5, w: 700, f: P.ink2 }) +
        T(348, y + 48, q2, { s: 12.5, w: 700, f: P.ink2 }) +
        arrow(236, y + 35, 252, y + 35, P.mute, 2) +
        arrow(448, y + 35, 474, y + 35, k.col, 3) +
        drawer(484, y, k);
    }).join(''));

  // The 4-row comparison card.
  const ROWS = [
    ['list', 'yes', 'yes', 'yes', 'position [0]'],
    ['tuple', 'yes', 'no', 'yes', 'position [0]'],
    ['dict', 'yes, as added', 'yes', 'keys: no', 'key ["Ben"]'],
    ['set', 'no', 'yes', 'no', 'only in']
  ];
  const COLS = [178, 290, 392, 506];
  const tablePic = svg(600, 256, 'A comparison card. List: in order yes, can change yes, duplicates yes, look up by position. Tuple: in order yes, can change no, duplicates yes, look up by position. Dict: in order yes, as added, can change yes, duplicate keys no, look up by key. Set: in order no, can change yes, duplicates no, and no look up at all, only in.',
    box(10, 8, 576, 236, P.white, 16) +
    ['in order?', 'can change?', 'duplicates?', 'look up by'].map((h, i) => T(COLS[i], 42, h, { s: 13.5 })).join('') +
    ROWS.map((r, i) => {
      const y = 92 + i * 44, k = KINDS[i];
      return `<line x1="24" y1="${y - 26}" x2="572" y2="${y - 26}" stroke="${P.sand}" stroke-width="2"/>` +
        `<rect x="24" y="${y - 20}" width="84" height="30" rx="8" fill="${k.tint}"/>` +
        T(66, y + 1, r[0], { s: 15, m: true, f: k.col }) +
        r.slice(1).map((v, j) => T(COLS[j], y, v, { s: 13, w: 700, m: j === 3, f: v === 'no' || v === 'keys: no' ? P.danger : P.ink })).join('');
    }).join(''));

  const party = [
    'courses = ["tomato soup", "bean chili", "rice pudding"]  # list',
    'oven = (180, "fan")                                      # tuple',
    'goals = {"Ana": 90, "Ben": 140, "Chloe": 70}             # dict',
    'allergens = {"nuts", "sesame", "gluten"}                 # set',
    '',
    'courses.insert(1, "green salad")      # Chloe adds a course',
    'print("Courses:", courses)',
    '',
    'temp, mode = oven                     # unpack, lesson 36',
    'print(f"Oven: {temp} C, {mode}")',
    '',
    'print("Ben needs", goals["Ben"], "g protein")',
    'print("Anyone allergic to nuts?", "nuts" in allergens)'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(party, { title: 'party.py' })}${tablePic}</div>`;

  // The pain: a cursor checks every guest; nuts lands on the list twice.
  const rowBox = (x, y, s, fill) => box(x, y, 150, 40, fill, 10) + T(x + 75, y + 26, s, { s: 13.5, m: true, w: 700 });
  const chipS = (x, y, s, fill) => {
    const w = s.length * 8.4 + 24;
    return `<rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="30" rx="15" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x, y + 5, s, { s: 13.5, m: true, w: 700 });
  };
  const painSvg = svg(600, 230, 'Left: to find Ben in a list of guests, Python checks every item one by one: Ana, no. Ben, yes. Chloe, no. 3 checks for 1 goal. Right: the allergen list says nuts twice, because a list happily keeps duplicates.',
    T(100, 24, 'guests: a list', { s: 14 }) +
    ['("Ana", 90)', '("Ben", 140)', '("Chloe", 70)'].map((s, i) => rowBox(24, 40 + i * 54, s, i === 1 ? P.okT : P.white) +
      T(200, 66 + i * 54, i === 1 ? '✓' : '✗', { s: 20, f: i === 1 ? P.ok : P.danger }) +
      T(14, 66 + i * 54, String(i + 1), { s: 12, f: P.mute })).join('') +
    T(110, 214, 'checks every guest', { s: 13, w: 700, f: P.danger }) +
    `<line x1="262" y1="20" x2="262" y2="220" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(430, 24, 'allergens: a list', { s: 14 }) +
    chipS(340, 70, 'nuts', P.dangerT) + chipS(420, 70, 'nuts', P.dangerT) + chipS(512, 70, 'sesame', P.white) + chipS(372, 116, 'gluten', P.white) +
    box(452, 102, 120, 32, P.dangerT, 10) + T(512, 123, 'nuts twice', { s: 13, f: P.danger }) +
    T(430, 172, 'Ana and Ben both said nuts.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(430, 194, 'A list keeps every copy.', { s: 12.5, w: 700, f: P.ink2 }));

  const pain = [
    'guests = [("Ana", 90), ("Ben", 140), ("Chloe", 70)]',
    '',
    '# What is Ben\'s goal? Walk the list and check every guest.',
    'for g in guests:',
    '    if g[0] == "Ben":',
    '        print("Ben needs", g[1], "g protein")',
    '',
    'allergens = []',
    'allergens.append("nuts")     # from Ana',
    'allergens.append("nuts")     # from Ben',
    'allergens.append("sesame")   # from Ben',
    'allergens.append("gluten")   # from Chloe',
    'print("Keep off the table:", allergens)',
    'print("Anyone allergic to nuts?", "nuts" in allergens)'
  ];
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(pain, { title: 'party_lists.py' })}</div>`;

  // The fix: a labelled rack goes straight to Ben; the bowl keeps one of each.
  const jar = (x, y, name, g, on) =>
    box(x, y, 76, 84, on ? P.okT : P.white, 12) +
    `<rect x="${x + 14}" y="${y - 10}" width="48" height="10" rx="3" fill="${P.ink}"/>` +
    T(x + 38, y + 34, name, { s: 14 }) + T(x + 38, y + 62, g + ' g', { s: 13, m: true, f: on ? P.ok : P.accent });
  const fixSvg = svg(600, 206, 'Left: a dict is a labelled rack of jars, Ana 90, Ben 140, Chloe 70. goals of Ben goes straight to the Ben jar: one look. Right: a set is a bowl with nuts, sesame and gluten. The second nuts bounces off: one of each.',
    T(140, 22, 'goals["Ben"]', { s: 15, m: true, f: P.ok }) +
    jar(14, 92, 'Ana', 90, false) + jar(102, 92, 'Ben', 140, true) + jar(190, 92, 'Chloe', 70, false) +
    arrow(140, 32, 140, 76, P.ok, 3) +
    T(140, 200, 'straight to the label', { s: 13, w: 700, f: P.ok }) +
    `<line x1="284" y1="20" x2="284" y2="200" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    `<path d="M318 92 h258 q0 92 -129 92 q-129 0 -129 -92 z" fill="${P.ink}" transform="translate(4 5)"/>` +
    `<path d="M318 92 h258 q0 92 -129 92 q-129 0 -129 -92 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    chipS(380, 118, 'nuts', P.okT) + chipS(484, 116, 'sesame', P.okT) + chipS(432, 154, 'gluten', P.okT) +
    chipS(540, 40, 'nuts', P.dangerT) + arrow(522, 58, 500, 80, P.danger, 2.5) +
    `<path d="M512 72 q24 -6 30 -30" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="4 5"/>` +
    T(400, 34, 'allergens: a set', { s: 14 }) +
    T(447, 200, 'already in: it bounces off', { s: 13, w: 700, f: P.danger }));

  const fixed = [
    'goals = {"Ana": 90, "Ben": 140, "Chloe": 70}',
    'print("Ben needs", goals["Ben"], "g protein")',
    '',
    'allergens = set()',
    'allergens.add("nuts")      # from Ana',
    'allergens.add("nuts")      # from Ben: already in, nothing changes',
    'allergens.add("sesame")    # from Ben',
    'allergens.add("gluten")    # from Chloe',
    'print("Keep off the table:", sorted(allergens))',
    'print("Anyone allergic to nuts?", "nuts" in allergens)'
  ];
  const convert = [
    'oven_list = [180, "fan"]',
    'guest_pairs = [("Ana", 90), ("Ben", 140), ("Chloe", 70)]',
    'allergen_list = ["nuts", "nuts", "sesame", "gluten"]',
    '',
    'oven = tuple(oven_list)',
    'goals = dict(guest_pairs)        # each pair: (key, value)',
    'allergens = set(allergen_list)',
    '',
    'print(oven, goals["Ben"], sorted(allergens))',
    'print(type(oven), type(goals), type(allergens))'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${fixSvg}${run(fixed, { title: 'party_fixed.py' })}${run(convert, { title: 'convert.py' })}</div>`;

  const timing = [
    'import time    # the kitchen clock cookbook (lesson 60 explains import)',
    '',
    'tickets = list(range(1_000_000))   # 1,000,000 order numbers in a list',
    'ticket_set = set(tickets)          # the same numbers in a set',
    'wanted = 999_999                   # the very last ticket',
    '',
    'start = time.perf_counter()',
    'for check in range(10):',
    '    found = wanted in tickets',
    'list_ms = (time.perf_counter() - start) * 1000',
    '',
    'start = time.perf_counter()',
    'for check in range(10):',
    '    found = wanted in ticket_set',
    'set_ms = (time.perf_counter() - start) * 1000',
    '',
    'print(f"10 checks in the list: {list_ms:.1f} ms")',
    'print(f"10 checks in the set:  {set_ms:.3f} ms")',
    'print("Your numbers will differ. Run it again and see.")'
  ];

  const nested = [
    'allergies = {"Ana": ["nuts"], "Ben": ["nuts", "sesame"], "Chloe": ["gluten"]}',
    'print("Ben avoids:", allergies["Ben"])',
    '',
    'every = set()',
    'for name, items in allergies.items():',
    '    for item in items:',
    '        every.add(item)',
    'print("Keep off the table:", sorted(every))'
  ];

  COURSE.add({
    id: 'l42', minutes: 12,
    summary: 'Pick the container by the <b>question you will ask it</b>. Does the order matter, and will it change? A <b>list</b>. Is it a fixed record? A <b>tuple</b>. Will you look things up by a name? A <b>dict</b>. Do you only ask "is it in?" and want one of each? A <b>set</b>. The wrong one still works, but the code gets long and slow: a list makes Python check <b>every item</b> to find Ben, and it keeps <b>duplicates</b>. Each container\'s name also converts: <code>tuple(x)</code>, <code>dict(pairs)</code>, <code>set(x)</code>.',
    video: {
      src: 'videos/l42-choosing-the-right-one.mp4', poster: 'videos/l42-choosing-the-right-one.jpg', length: '1 min 4 s',
      script: [
        'Kitchen Coach is planning a dinner party. It has 4 jobs, and 4 drawers: a list, a tuple, a dict and a set.',
        'Job 1: the order of the courses. Does the order matter, and will it change? Yes and yes. That is a list.',
        'Job 2: the oven setting. 180 degrees, fan. A fixed record. That is a tuple.',
        'Job 3: each guest\'s protein goal. Will you look it up by a name? Then use a dict.',
        'Job 4: every allergen anyone has. You only ask, is it in there? That is a set.',
        'Pick the wrong drawer. Put the guests in a list, and finding Ben means walking past every item, one by one. Put the allergens in a list, and nuts shows up twice.',
        'Swap in a dict, and Python jumps straight to Ben. Swap in a set, and nuts appears once. The code gets shorter, too.',
        'Pick the container by the question you will ask it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Four jobs, four containers.',
        text: [
          'Kitchen Coach is planning a dinner party for Ana, Ben and Chloe. It has <b>four jobs</b>, and you now know <b>four containers</b>: the list (lesson 31), the tuple (lesson 36), the dict (lesson 37) and the set (lesson 39). Each job fits one of them best.',
          'Do not pick by habit. Pick by <b>the question you will ask the data</b>. Ask these four, in this order:',
          '1. Does the <b>order</b> matter, and will it <b>change</b>? Use a <b>list</b>. 2. Is it a <b>fixed record</b>, a few values that belong together and never change? Use a <b>tuple</b>. 3. Will I <b>look things up by a name</b>? Use a <b>dict</b>. 4. Do I only care whether something <b>is in it</b>, and want <b>no duplicates</b>? Use a <b>set</b>.'
        ],
        tip: 'The brackets tell you which one you are holding: <code>[ ]</code> list, <code>( )</code> tuple, <code>{"key": value}</code> dict, <code>{"a", "b"}</code> set.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Each job in its own container.',
        text: [
          'Press <b>Run</b> on <code>party.py</code>. Each of the four jobs gets the container that fits it.',
          'The <b>courses</b> are a list, because their order matters and Chloe adds a green salad in the middle with <code>.insert()</code> (lesson 34). The <b>oven</b> is a tuple: 180 degrees, fan, and nobody should change it by accident. You unpack it into two jars, as in lesson 36. The <b>goals</b> are a dict, so <code>goals["Ben"]</code> goes straight to Ben. The <b>allergens</b> are a set, so each one is there once and <code>in</code> answers fast.',
          'The card under the code puts the four side by side. Read it one row at a time. A dict keeps the order you added things (lesson 37), but you never ask it for "the second one": you ask by key.'
        ],
        tip: 'Most real programs use all four, often in the same few lines. Choosing is not a one-time decision for the whole program. It is a small choice for each piece of data.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The wrong container still works. Badly.',
        text: [
          'Here is the same party with <b>everything in lists</b>. Press <b>Run</b>. It prints the right goal for Ben, so what is wrong?',
          '<b>Pain 1: looking up by name.</b> A list only knows positions. To find Ben, the loop checks <b>every guest</b>: is <code>g[0]</code> Ben? No. Yes. No. It even goes on checking Chloe after Ben is found. And <code>g[0]</code> and <code>g[1]</code> say nothing about what they mean. With 3 guests that is a little clumsy. With 3,000 it is slow, and you write that loop again every time you need a goal.',
          '<b>Pain 2: duplicates.</b> Ana and Ben both said nuts, so the list says <code>\'nuts\', \'nuts\'</code>. A list keeps every copy. The warning card for the kitchen now has nuts on it twice, and <code>"nuts" in allergens</code> has to read the list from the start each time.'
        ],
        warn: 'No error message tells you that you picked the wrong container. The program runs. The signs are code that is <b>long and clumsy</b>: loops that search for one thing, <code>[0]</code> and <code>[1]</code> everywhere, and duplicates you have to clean up.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Swap in the right one. The code gets shorter.',
        text: [
          '<b>Look up by name? Use a dict.</b> <code>goals["Ben"]</code> goes straight to the jar with Ben\'s label. The four-line search loop becomes <b>one line</b>, and it reads like what it does.',
          '<b>One of each? Use a set.</b> <code>.add("nuts")</code> twice still leaves one nuts (lesson 39). Print it with <code>sorted()</code>, so the order is A to Z every time. Press <b>Run</b> on <code>party_fixed.py</code>.',
          '<b>Already have a list?</b> The name of each container also <b>converts</b>, like <code>int()</code> and <code>str()</code> in lesson 13. <code>tuple(x)</code> makes a tuple, <code>set(x)</code> a set, and <code>dict(pairs)</code> makes a dict from a list of <b>(key, value) pairs</b>. Run <code>convert.py</code>. Then change <code>guest_pairs</code> so Ben appears twice, with 140 and then 150, and run it again. Which goal wins?'
        ],
        tip: 'In <code>dict(pairs)</code>, each pair must have exactly 2 items: the key first, then the value. If a key comes twice, the last one wins, just like <code>goals["Ben"] = 150</code> replaces the old value.'
      },
      {
        label: 'Try it', pic: run(timing, { title: 'stopwatch.py' }),
        h: 'Time it: in on a list vs a set.',
        text: [
          'How much faster is <code>in</code> on a set? Time it. <code>import time</code> opens Python\'s clock tools (lesson 60, Modules and import, explains how). <code>time.perf_counter()</code> reads a stopwatch in seconds. Read it before and after, subtract, and multiply by 1000 for milliseconds (ms).',
          'Press <b>Run</b>. The list has to check up to 1,000,000 numbers to find the last one, 10 times over. The set goes straight to its spot. When we tried it, the list took between <b>50 and 150 ms</b> and the set less than <b>0.01 ms</b>. <b>Your numbers will differ</b>, from computer to computer and from run to run. The set may even show <code>0.000</code>: too fast for the browser\'s clock to see.',
          'Now change <code>wanted = 999_999</code> to <code>wanted = 0</code> and run it again. The list gets fast, because 0 is the <b>first</b> item: it stops looking as soon as it finds it. A set is fast wherever the item is.'
        ],
        tip: 'Speed only matters when the container is big or you ask often. For 3 guests, pick the container that makes the code <b>clear</b>. The good news: the clear choice and the fast choice are usually the same one.'
      },
      {
        label: 'The catch', pic: run(nested, { title: 'allergies.py' }),
        h: 'Sometimes the answer is two containers.',
        text: [
          'The four questions do not always give one answer. Kitchen Coach wants to know <b>who</b> avoids what (look up by name: a dict) <b>and</b> the full list of allergens (one of each: a set). So use both. Lesson 41 showed how containers <b>nest</b>: here a dict holds a list for each guest, and a loop pours every item into one set. Press <b>Run</b>.',
          'Every choice also <b>gives something up</b>. A set forgets the order and how many times a thing was added. A dict holds each key <b>once</b>, so two guests both called Ben need different keys. A tuple cannot change, so if the value will change, it was never a fixed record.',
          'Not sure? Start with a <b>list</b>. It is the everyday container. Switch when one of the four questions says so: you search it by name, you clean out duplicates, or something changes that never should.'
        ],
        warn: 'Need a set or a dict that must never change? Lesson 40, Frozen collections: <code>frozenset</code>, and <code>frozendict</code>, which is new in Python 3.15. The Run boxes on this page use Python 3.14, so try <code>frozendict</code> in VS Code, not here.'
      }
    ],
    exercises: [
      {
        file: 'l42_dinner_party.py', title: 'The dinner party',
        task: 'Someone stored all of Kitchen Coach\'s party data in <b>lists</b>. Change the 4 lines so each job uses the <b>right container</b>: a list, a tuple, a dict or a set. The party plan under them must then print the 5 lines given at the top of the file.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the 4 jobs in the comment at the top. One of the four is already right.',
          'Run it first and read the hint. Then change the lines between <code>START</code> and <code>END</code>. <code>tuple()</code>, <code>dict()</code> and <code>set()</code> convert a list, or you can write the new container by hand. Save the file.',
          'Run it again. The check looks at the <b>type</b> of each of the 4 jars and at what the party plan prints. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Kitchen Coach has more jobs. Which container fits each one best?',
        buckets: ['list', 'tuple', 'dict', 'set'],
        items: [
          ['The steps of a recipe, in order. You may add one.', 0],
          ['Guests in the order they replied', 0],
          ['The oven setting: 180, fan', 1],
          ['A pancake ratio that must never change', 1],
          ['Calories of each dish, looked up by dish name', 2],
          ['Each guest\'s phone number, by name', 2],
          ['Every allergen anyone has', 3],
          ['Dishes served so far. You only ask "served yet?"', 3]
        ],
        why: 'Order that changes: a list. A fixed record: a tuple. Looked up by a name: a dict. Only "is it in?", one of each: a set.',
        hint: 'Ask the four questions in order: order and change? fixed record? look up by name? only "is it in?"'
      },
      {
        type: 'match', q: 'Match each question to the container it points to.',
        pairs: [
          ['list', 'Does the order matter, and will it change?'],
          ['tuple', 'Is it a fixed record that never changes?'],
          ['dict', 'Will I look things up by a name?'],
          ['set', 'Do I only ask "is it in?", with no duplicates?']
        ],
        why: 'These are the four questions of this lesson. Ask them in that order and the first "yes" usually picks the container.',
        hint: 'Which one has labels? Which one cannot change? Which one keeps one of each?'
      },
      {
        type: 'pick', q: 'Back to lesson 36. What happens when you run this?',
        pic: code(['oven = (180, "fan")', 'oven[0] = 200', 'print(oven)'], { title: 'oven.py' }),
        options: ["TypeError: 'tuple' object does not support item assignment", "It prints (200, 'fan')", "It prints [200, 'fan']", 'IndexError: tuple index out of range'],
        answer: 0,
        why: 'A tuple cannot change, so Python stops on line 2. That is exactly why the oven setting is a tuple: nobody changes it by accident. If you really want a new setting, make a new tuple: <code>oven = (200, "fan")</code>.',
        hint: 'Round brackets. Can you change an item of a tuple?'
      },
      {
        type: 'pick', q: 'Back to lesson 39. What does this print?',
        pic: code(['allergens = set(["nuts", "gluten", "nuts", "nuts"])', 'print(len(allergens))'], { title: 'allergens.py' }),
        options: ['2', '4', '3', '1'],
        answer: 0,
        why: 'A set keeps one of each: nuts and gluten. So <code>len()</code> counts 2. That is why "every allergen anyone has" is a set.',
        hint: 'How many <b>different</b> allergens are there?'
      },
      {
        type: 'fix', q: 'Kitchen Coach looks up Ben\'s goal by name, but <code>guests</code> is a list. Python stops with a <code>TypeError</code>. Change line 1 so <code>guests</code> is a <b>dict</b> and the program prints <code>140</code>. Keep line 2 as it is.',
        code: ['guests = [("Ana", 90), ("Ben", 140), ("Chloe", 70)]', 'print(guests["Ben"])'],
        title: 'goals.py',
        check: [
          'got = out.strip()',
          'if type(guests) is dict and got == "140":',
          '    ok = True',
          'elif type(guests) is not dict:',
          '    msg = "guests is still a " + type(guests).__name__ + ". Make it a dict: write {\\"Ana\\": 90, ...} by hand, or wrap the list in dict(...)."',
          'else:',
          '    msg = "It printed " + got + ". Ben\'s goal is 140. Keep the names and numbers as they were."'
        ].join('\n'),
        why: '<code>guests = {"Ana": 90, "Ben": 140, "Chloe": 70}</code>, or <code>guests = dict([("Ana", 90), ("Ben", 140), ("Chloe", 70)])</code>. A list only knows positions like <code>[0]</code>. A dict knows names.',
        hint: 'A list wants a number in the square brackets. Which container takes a name like "Ben"?'
      },
      {
        type: 'fix', q: 'The allergen list has duplicates. Change line 1 so <code>allergens</code> is a <b>set</b>, and the program prints <code>[\'gluten\', \'nuts\', \'sesame\']</code>.',
        code: ['allergens = ["nuts", "gluten", "nuts", "sesame", "gluten"]', 'print(sorted(allergens))'],
        title: 'allergens.py',
        check: [
          'got = out.strip()',
          'if type(allergens) in (set, frozenset) and got == "[\'gluten\', \'nuts\', \'sesame\']":',
          '    ok = True',
          'elif type(allergens) not in (set, frozenset):',
          '    msg = "allergens is still a " + type(allergens).__name__ + ". Wrap the list in set(...), or use curly braces."',
          'else:',
          '    msg = "It printed " + got + ". Keep the same 5 words in line 1."'
        ].join('\n'),
        why: '<code>allergens = set(["nuts", "gluten", "nuts", "sesame", "gluten"])</code>. The set keeps one of each, and <code>sorted()</code> hands back a list, A to Z.',
        hint: 'Which container keeps one of each? Its name also converts a list.'
      },
      {
        type: 'pick', q: 'Kitchen Coach keeps every dish it has served tonight. All it ever asks is "Have we served this one yet?", hundreds of times. Which container fits best?',
        options: ['A set: in is fast, and one of each is enough', 'A list: in is just as fast on a list', 'A tuple: the dishes never change', 'A dict with the dish names as values'],
        answer: 0,
        why: 'The only question is "is it in?", so it is a set. <code>in</code> on a list checks the items one by one. The served dishes do change during the night, so a tuple is out. A dict answers <code>in</code> about its <b>keys</b>, not its values (lesson 38).',
        hint: 'Which of the four questions is Kitchen Coach asking?'
      },
      {
        type: 'type', q: '<code>guest_pairs</code> is a list of <code>(name, goal)</code> pairs. Type the line that makes a dict called <code>goals</code> from it.',
        prompt: '>>>',
        answers: ['goals = dict(guest_pairs)'],
        accept: '^goals ?= ?dict\\( ?guest_pairs ?\\)$',
        why: '<code>dict()</code> turns a list of (key, value) pairs into a dictionary. Then <code>goals["Ben"]</code> works.',
        hint: 'The name of the container converts, like set(...) does for a set.'
      }
    ]
  });
})();
