/* Lesson 33: Slicing (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l33  Slicing
     ===================================================================== */

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const KM = [5, 8, 6, 0, 10, 7, 16];

  // One slice of the loaf. kind: 'on' (in the loaf) | 'cut' (picked) | 'miss' (left out by mistake)
  const slice = (x, y, w, h, i, kind) => {
    const fill = kind === 'cut' ? P.tint : kind === 'miss' ? P.dangerT : P.warnT;
    const edge = kind === 'miss' ? P.danger : P.ink;
    return (kind === 'miss'
      ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${edge}" stroke-width="2.5" stroke-dasharray="6 5"/>`
      : `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="14" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${edge}" stroke-width="2.5"/>`) +
      T(x + w / 2, y + h * 0.36, DAYS[i], { s: 12.5, w: 700, f: kind === 'miss' ? P.danger : P.ink2 }) +
      T(x + w / 2, y + h * 0.78, String(KM[i]), { s: 18, m: true, f: kind === 'miss' ? P.danger : P.ink });
  };
  const cutLine = (x, y1, y2, col) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${col || P.accent}" stroke-width="3.5" stroke-dasharray="7 6"/>`;

  const ideaPic = svg(600, 300, "Ana's week as a loaf of 7 slices, numbered 0 to 6. The knife cuts at 0 and at 3. Slices 0, 1 and 2 land on a board as a new list, 5, 8 and 6. Slice 3 stays on the loaf: the stop is not included. The loaf is still whole.",
    T(36, 24, 'week_km[0:3]', { s: 16, m: true, a: 'start', f: P.accent }) +
    T(564, 24, 'the loaf stays whole', { s: 13, w: 700, a: 'end', f: P.ok }) +
    DAYS.map((d, i) => T(70 + i * 76, 52, String(i), { s: 15, m: true, f: P.accent })).join('') +
    DAYS.map((d, i) => slice(36 + i * 76, 62, 68, 96, i, i < 3 ? 'cut' : 'on')).join('') +
    cutLine(32, 38, 172) + cutLine(260, 38, 172) +
    `<ellipse cx="298" cy="114" rx="44" ry="56" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="7 5"/>` +
    T(32, 192, 'start: 0', { s: 13, a: 'start', f: P.accent }) +
    T(254, 192, 'stop: 3', { s: 13, a: 'end', f: P.accent }) +
    T(352, 192, 'slice 3 stays: not included', { s: 13, a: 'start', f: P.danger }) +
    box(36, 206, 528, 82, P.sand, 16) +
    [0, 1, 2].map(i => slice(60 + i * 66, 214, 58, 64, i, 'cut')).join('') +
    arrow(276, 246, 318, 246, P.ink, 2.5) +
    T(330, 244, '[5, 8, 6]', { s: 18, m: true, a: 'start', f: P.accent }) +
    T(330, 270, 'a new list', { s: 12.5, w: 700, a: 'start', f: P.ink2 }));

  const loaf = [
    "# Ana's runs this week, Monday to Sunday, in km",
    'week_km = [5, 8, 6, 0, 10, 7, 16]',
    '',
    'first_three = week_km[0:3]   # cut at 0, stop before 3',
    'print(first_three)',
    'print(week_km[3:6])',
    'print(week_km)               # the loaf is still whole'
  ];
  const shorts = [
    "ben_meals = ['dal', 'tofu', 'chili', 'omelette', 'paneer']",
    '',
    'print(ben_meals[:3])    # no start: from the front',
    'print(ben_meals[3:])    # no stop: to the end',
    'print(ben_meals[-3:])   # the last three',
    'print(ben_meals[:])     # no start, no stop: a full copy'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(loaf, { title: 'loaf.py' })}` +
    code(shorts, { title: 'ben_meals.py' }) +
    term(['$ python3 ben_meals.py', "['dal', 'tofu', 'chili']", "['omelette', 'paneer']", "['chili', 'omelette', 'paneer']", "['dal', 'tofu', 'chili', 'omelette', 'paneer']"], 'terminal') + `</div>`;

  const pain = [
    'week_km = [5, 8, 6, 0, 10, 7, 16]',
    '',
    '# Tuesday, Wednesday and Thursday: 3 days?',
    'print(week_km[1:3])',
    '# the last three days?',
    'print(week_km[3:])'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    svg(600, 150, "week_km[1:3] gives Tuesday and Wednesday only. Thursday, at position 3, is the stop, so it is a dashed red gap marked missing.",
      T(30, 22, 'week_km[1:3]', { s: 14, m: true, a: 'start', f: P.accent }) +
      DAYS.map((d, i) => T(64 + i * 80, 46, String(i), { s: 13, m: true, f: P.accent })).join('') +
      DAYS.map((d, i) => slice(32 + i * 80, 54, 64, 64, i, i === 1 || i === 2 ? 'cut' : i === 3 ? 'miss' : 'on')).join('') +
      cutLine(108, 34, 128) + cutLine(268, 34, 128) +
      T(188, 144, 'you get 2 days', { s: 13, f: P.accent }) +
      T(304, 144, 'Thursday is missing', { s: 13, a: 'start', f: P.danger })) +
    code(pain, { title: 'ana_days.py', bad: [4, 6] }) +
    term(['$ python3 ana_days.py', '[8, 6]', '[0, 10, 7, 16]', '# 2 days, then 4 days. No error, no warning.'], 'terminal') + `</div>`;

  const edges = [
    'shopping = ["eggs", "oats", "milk", "rice", "beans"]',
    'print(shopping[2:100])   # the stop is past the end',
    'print(shopping[10:])     # the start is past the end',
    'print(shopping[10])      # one item, lesson 32'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(pain, { title: 'ana_days.py' })}` +
    code(edges, { title: 'shopping.py', bad: [4] }) +
    term(['$ python3 shopping.py', "['milk', 'rice', 'beans']", '[]', 'Traceback (most recent call last):', '  File "shopping.py", line 4, in <module>', '    print(shopping[10])      # one item, lesson 32', '          ~~~~~~~~^^^^', 'IndexError: list index out of range'], 'terminal') + `</div>`;

  const textSteps = [
    '# Slicing works on text too',
    'name = "Chloe"',
    'print(name[:3])',
    'race_day = "2026-11-19"',
    'print(race_day[:4])     # the year',
    'print(race_day[5:7])    # the month',
    'phone = "07700 900123"',
    'print(phone[-4:])       # the last 4 digits',
    'dessert = "PAVLOVA-GF"',
    'print(dessert[-2:])     # Chloe looks for GF: gluten-free',
    '',
    '# A third number is the step',
    'week_km = [5, 8, 6, 0, 10, 7, 16]',
    'print(week_km[::2])     # every second day',
    'print(week_km[::-1])    # back to front'
  ];

  const copyDemo = [
    "# Chloe's dessert ratings, out of 10",
    'scores = [9, 7, 10, 8, 6]',
    'top = scores[:3]      # a slice is a NEW list',
    'top[0] = 0            # change the slice...',
    'print(top)',
    'print(scores)         # ...the original is untouched'
  ];
  const twoNames = [
    'scores = [9, 7, 10, 8, 6]',
    'same = scores         # lesson 31: a second name, ONE list',
    'copy = scores[:]      # a slice: a NEW list',
    'same[0] = 0',
    'print(scores)',
    'print(copy)'
  ];
  const swap = [
    '# Less common: replace a slice in place',
    'shopping = ["eggs", "flour", "bread", "milk"]',
    'shopping[1:3] = ["oats", "honey"]   # gluten-free for Chloe',
    'print(shopping)'
  ];
  const textFix = [
    'dessert = "flour cake"',
    'dessert[:5] = "rice"'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(copyDemo, { title: 'ratings.py' })}` +
    code(twoNames, { title: 'two_names.py', hi: [2, 3] }) +
    term(['$ python3 two_names.py', '[0, 7, 10, 8, 6]', '[9, 7, 10, 8, 6]', '# same changed the one list. copy kept its own.'], 'terminal') +
    code(swap, { title: 'shopping.py' }) +
    term(['$ python3 shopping.py', "['eggs', 'oats', 'honey', 'milk']"], 'terminal') +
    code(textFix, { title: 'dessert.py', bad: [2] }) +
    term(['$ python3 dessert.py', 'Traceback (most recent call last):', '  File "dessert.py", line 2, in <module>', '    dessert[:5] = "rice"', '    ~~~~~~~^^^^', "TypeError: 'str' object does not support item assignment"], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l33', minutes: 12,
    summary: 'A <b>slice</b> cuts a run of items out of a list: <code>week_km[0:3]</code> gives a <b>new list</b> with the items at 0, 1 and 2. The <b>stop is never included</b>, exactly like <code>range</code>. Leave a number out to cut from the front or to the end: <code>[:3]</code>, <code>[3:]</code>, <code>[-3:]</code> for the last three, <code>[:]</code> for a copy. A third number is the <b>step</b>: <code>[::-1]</code> is back to front. Slices work on text too, and they never raise <code>IndexError</code>.',
    video: {
      src: 'videos/l33-slicing.mp4', poster: 'videos/l33-slicing.jpg', length: '1 min 8 s',
      script: [
        'Ana ran every day this week. 7 numbers on one list. Picture it as a loaf of bread, with 7 slices, numbered 0 to 6.',
        'You want her first 3 days. Write the list name, then square brackets with 0, colon, 3. That is a slice.',
        '0 is where the knife starts. 3 is where it stops. But slice 3 stays on the loaf. Just like range, the stop is not included.',
        'The knife lifts away a new list: slices 0, 1 and 2. 5, 8 and 6 kilometres. And the loaf is still whole. The original list does not change.',
        'Leave a number out, and the cut runs to the end. Minus 3, colon, gives the last 3 days.',
        'A second colon adds a step. Step 2 takes every second slice. 0, 2, 4 and 6.',
        'Step minus 1 flips the loaf on the board. Sunday comes first.',
        'Start, stop, step. The stop is never included, and the loaf stays whole.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Cut a piece off the loaf.',
        text: [
          'Ana logs every run of her week on one list: <code>week_km = [5, 8, 6, 0, 10, 7, 16]</code>. Lesson 32 took <b>one</b> item by its position. Now she wants a <b>run</b> of them: her first three days.',
          'Think of the list as a loaf of bread. You choose <b>where the knife starts</b> and <b>where it stops</b>, and you get a piece. That is a <b>slice</b>: <code>week_km[0:3]</code>, the list name, then <b>start</b>, a colon, <b>stop</b>, inside square brackets.',
          'The knife stops <b>at</b> slice 3, so slice 3 stays on the loaf. You get the items at 0, 1 and 2. It is the rule from lesson 27: in <code>range(0, 3)</code> the <b>stop is never included</b> either.',
          'You get a <b>new list</b>. The loaf is still whole: <code>week_km</code> has all 7 days, exactly as before.'
        ],
        tip: 'Read <code>week_km[0:3]</code> out loud as "from 0, <b>up to but not including</b> 3". Same words as range.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'week_km[start:stop]',
        text: [
          'Press <b>Run</b> on <code>loaf.py</code>. <code>[0:3]</code> gives <code>[5, 8, 6]</code>, Monday to Wednesday. <code>[3:6]</code> gives Thursday to Saturday. The last line shows the whole week, untouched.',
          'Now be the knife. Change <code>[3:6]</code> to <code>[3:7]</code> and run it: Sunday joins. Try <code>[2:4]</code>. Before you press Run, say how many days you expect. <b>Stop minus start</b> is the count: 4 minus 2 is 2.',
          'You can <b>leave a number out</b>. No start means "from the front": Ben\'s top three meals are <code>ben_meals[:3]</code>. No stop means "to the end": <code>[3:]</code>. A negative start counts from the end, as in lesson 32: <code>[-3:]</code> is <b>the last three</b>. Leave both out, <code>[:]</code>, and you get the whole loaf as a <b>copy</b>.'
        ],
        tip: 'The colon is what makes it a slice. <code>ben_meals[3]</code> is one meal, <code>\'omelette\'</code>. <code>ben_meals[3:]</code> is a list: <code>[\'omelette\', \'paneer\']</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One day short, or one day too many.',
        text: [
          'Ana wants Tuesday, Wednesday and Thursday. Tuesday is at position 1, so you write <code>week_km[1:3]</code>, thinking "from 1, three days". Python gives <code>[8, 6]</code>: <b>two</b> days. The 3 is the <b>stop</b>, not a count, and the stop is never included. Thursday silently vanishes.',
          'Then she wants the last three days. You write <code>week_km[3:]</code>, because 3 is three. That starts at <b>position 3</b> and runs to the end: <code>[0, 10, 7, 16]</code>, four days.',
          'Neither line crashes. Both give a list that looks fine at a glance. That is what makes them dangerous.'
        ],
        warn: 'This is the <b>off-by-one</b> from lesson 27, back in a new place. Every number inside the brackets is a <b>position</b>, never a count.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Positions in, stop one past the last.',
        text: [
          'Two rules. <b>1.</b> The stop is one past the last position you want. Tuesday to Thursday is positions 1, 2 and 3, so the stop is 4: <code>week_km[1:4]</code>. Check: 4 minus 1 is 3 days.',
          '<b>2.</b> For "the last few", count from the end with a <b>minus</b>: <code>week_km[-3:]</code>. It works whatever the length of the list, so it still works when Ana logs 14 days.',
          'Fix both lines in the box and press <b>Run</b>. You want <code>[8, 6, 0]</code> and <code>[10, 7, 16]</code>.',
          'One more thing a slice does differently: it <b>never raises IndexError</b>. In lesson 32, <code>shopping[10]</code> on a list of 5 stopped the program. A slice that runs past the end just stops at the end: <code>shopping[2:100]</code> is fine, and <code>shopping[10:]</code> is an empty list, <code>[]</code>.'
        ],
        tip: 'No error is not always good news. An empty <code>[]</code> where you expected items usually means the start is past the end. Print the slice and look.'
      },
      {
        label: 'Try it', pic: run(textSteps, { title: 'slices.py' }),
        h: 'Text, and a third number.',
        text: [
          'Text is a row of characters, so it slices too. <code>"Chloe"[:3]</code> is <code>"Chl"</code>. A date written as <code>"2026-11-19"</code> gives its year with <code>[:4]</code>. A phone number gives its last 4 digits with <code>[-4:]</code>. Press <b>Run</b>.',
          'A <b>third</b> number is the <b>step</b>, as in <code>range</code>: <code>[start:stop:step]</code>. <code>week_km[::2]</code> takes every second day. <code>week_km[::-1]</code> walks the list <b>back to front</b>, a handy trick for "newest first". All three can work together: <code>week_km[0:7:2]</code>.',
          'Your turn: print the <b>day</b> of the date, the last two characters. Print Chloe\'s name back to front. Then print the weekend, Saturday and Sunday, from <code>week_km</code>. Say what you expect before each Run.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A slice is a copy. Text never changes.',
        text: [
          '<b>A slice is a new list.</b> In <code>ratings.py</code>, <code>top[0] = 0</code> puts 0 at position 0 of <code>top</code>. Run it: <code>top</code> changes, <code>scores</code> does not. The piece left the loaf.',
          'That makes <code>[:]</code> the clean way to <b>copy</b> a list. Lesson 31 warned you: <code>same = scores</code> is a second name for <b>one</b> list, so a change through <code>same</code> shows up in <code>scores</code>. <code>copy = scores[:]</code> is a list of its own.',
          '<b>Less common:</b> on the left of <code>=</code>, a slice <b>replaces</b> that piece of the list in place. <code>shopping[1:3] = ["oats", "honey"]</code> swaps flour and bread for Chloe. You will rarely need it. Lesson 34, List methods, has the everyday tools.',
          '<b>Text never changes.</b> You can read a slice of text, but never replace one: <code>TypeError: \'str\' object does not support item assignment</code>. Build a new string instead: <code>dessert = "rice" + dessert[5:]</code> gives <code>"rice cake"</code>. Same rule as the text tools of lesson 9.'
        ],
        warn: '<code>[::-1]</code> gives a <b>reversed copy</b>. It never flips the original. To keep it, store it: <code>newest_first = week_km[::-1]</code>.'
      }
    ],
    exercises: [
      {
        file: 'l33_cut_the_loaf.py', title: 'Cut the loaf',
        task: 'Ana logged two weeks of runs. With <b>slices only</b>, no loops, print her <b>first week</b>, her <b>second week</b>, <b>every second day</b> of week 1, the <b>last three days</b>, the whole list <b>reversed</b>, and the <b>year</b> from her race date.',
        steps: [
          'Press <b>Open in VS Code</b>. The 6 exact lines to print are in the comment at the top of the file.',
          'The first print is written for you, with an off-by-one in it. Fix it, then add the other five between the <code>START</code> and <code>END</code> lines. Save the file.',
          'Run it. The check runs your lines again with another two weeks and another date, so let the slices do the work. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['shopping = ["eggs", "oats", "milk", "rice", "beans"]', 'print(shopping[1:3])'], { title: 'shopping.py' }),
        options: ["['oats', 'milk']", "['oats', 'milk', 'rice']", "['eggs', 'oats', 'milk']", "['eggs', 'oats']"],
        answer: 0,
        why: 'Start at position 1, <code>"oats"</code>. Stop <b>before</b> position 3. That is 2 items: 3 minus 1.',
        hint: 'Positions start at 0. And is the stop included?'
      },
      {
        type: 'match', q: 'With <code>week_km = [5, 8, 6, 0, 10, 7, 16]</code>, match each slice to what it gives.',
        pairs: [
          ['week_km[:2]', '[5, 8]'],
          ['week_km[5:]', '[7, 16]'],
          ['week_km[2:4]', '[6, 0]'],
          ['week_km[::3]', '[5, 0, 16]'],
          ['week_km[::-1]', '[16, 7, 10, 0, 6, 8, 5]']
        ],
        why: 'No start is the front, no stop is the end. <code>[2:4]</code> is positions 2 and 3. A step of 3 takes positions 0, 3 and 6. A step of -1 goes back to front.',
        hint: 'Write the positions 0 to 6 under the numbers first.'
      },
      {
        type: 'fix', q: 'Ben wants his <b>top three</b> meals, the first three on his list. Fix the slice.',
        code: ["ben_meals = ['dal', 'tofu', 'chili', 'omelette', 'paneer']", 'top_three = ben_meals[1:3]', 'print(top_three)'],
        title: 'ben_top.py',
        check: [
          'got = out.strip()',
          'want = "[\'dal\', \'tofu\', \'chili\']"',
          'if got == want and ben_meals == ["dal", "tofu", "chili", "omelette", "paneer"]:',
          '    ok = True',
          'elif got == want:',
          '    msg = "Keep Ben\'s list as it was. Change only the slice."',
          'elif got == "[\'tofu\', \'chili\']":',
          '    msg = "Still 2 meals, starting at tofu. The first meal sits at position 0, and the stop is never included."',
          'elif got == "[\'tofu\', \'chili\', \'omelette\']":',
          '    msg = "Three meals now, but from position 1. Start at 0, or leave the start out."',
          'else:',
          '    msg = "It printed " + got + ". You want dal, tofu and chili."'
        ].join('\n'),
        why: '<code>ben_meals[:3]</code> (or <code>[0:3]</code>) gives positions 0, 1 and 2. The first item is at 0, and the stop, 3, is one past the last one you want.',
        hint: 'Where does the first meal sit? And which stop gives you three items?'
      },
      {
        type: 'fix', q: 'Ana wants her <b>last three</b> days. This prints four. Fix it so it still works if the list gets longer.',
        code: ['week_km = [5, 8, 6, 0, 10, 7, 16]', 'last_three = week_km[3:]', 'print(f"Last 3 days: {last_three}")'],
        title: 'last_three.py',
        check: [
          'got = out.strip()',
          'if got == "Last 3 days: [10, 7, 16]" and week_km == [5, 8, 6, 0, 10, 7, 16]:',
          '    ok = True',
          'elif got == "Last 3 days: [0, 10, 7, 16]":',
          '    msg = "Still 4 days. [3:] starts at position 3. Count from the end instead, with a minus."',
          'elif got == "Last 3 days: [10, 7, 16]":',
          '    msg = "Keep the week as it was. Change only the slice."',
          'else:',
          '    msg = "It printed " + got + ". You want Last 3 days: [10, 7, 16]."'
        ].join('\n'),
        why: '<code>week_km[-3:]</code> starts 3 from the end and runs to the end. <code>[4:]</code> gives the same today, but breaks when Ana logs a longer list.',
        hint: 'Lesson 32: a negative position counts from the end.'
      },
      {
        type: 'bucket', q: 'The list <code>shopping</code> has <b>5</b> items. Which lines stop with an error?',
        buckets: ['IndexError', 'Works fine'],
        items: [
          ['shopping[10]', 0],
          ['shopping[-6]', 0],
          ['shopping[2:100]', 1],
          ['shopping[10:]', 1],
          ['shopping[-6:]', 1],
          ['shopping[4]', 1]
        ],
        why: 'One position past the end is an <code>IndexError</code>. A slice never raises one: it stops at the edge. <code>shopping[10:]</code> is <code>[]</code>, and <code>shopping[-6:]</code> is the whole list. <code>shopping[4]</code> is the last item, so it is fine.',
        hint: 'One item by position can miss. A slice just cuts what is there.'
      },
      {
        type: 'pick', q: 'Back to lesson 27. <code>range(2, 5)</code> gives 2, 3 and 4. Which items does <code>dishes[2:5]</code> give?',
        pic: code(['dishes = ["soup", "pasta", "chili", "salad", "curry", "pudding"]'], { title: 'menu.py' }),
        options: ["['chili', 'salad', 'curry']", "['pasta', 'chili', 'salad']", "['chili', 'salad', 'curry', 'pudding']", "['pasta', 'chili', 'salad', 'curry']"],
        answer: 0,
        why: 'A slice takes the positions that the matching <code>range</code> hands out: 2, 3 and 4. The stop, 5, is never included in either.',
        hint: 'Positions 2, 3 and 4. Which dishes sit there?'
      },
      {
        type: 'type', q: 'Ana\'s race is on <code>race_day = "2027-04-11"</code>. Type the slice that gives the <b>month</b>, <code>"04"</code>.',
        prompt: '>>>',
        answers: ['race_day[5:7]', 'print(race_day[5:7])'],
        accept: '^(print\\()?race_day\\[(5|-5):(7|-3)\\]\\)?$',
        why: 'Count the characters: <code>2027</code> is 0 to 3, the dash is 4, and the month is at 5 and 6. The stop is one past the last: 7.',
        hint: 'Write the positions under each character. The dash after the year is at position 4.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['scores = [9, 7, 10, 8, 6]', 'top = scores[:3]', 'top[0] = 0', 'print(scores)'], { title: 'ratings.py' }),
        options: ['[9, 7, 10, 8, 6]', '[0, 7, 10, 8, 6]', '[0, 7, 10]', 'TypeError'],
        answer: 0,
        why: 'A slice is a <b>new list</b>. Changing <code>top</code> never touches <code>scores</code>. (With <code>top = scores</code>, two names for one list, you would see the 0.)',
        hint: 'Is <code>top</code> a second name for the same list, or a piece cut from it?'
      }
    ]
  });
})();
