/* Lesson 41: Nesting (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l41  Nesting
     ===================================================================== */

  // A small item chip, e.g. "tofu" in a jar. hot: highlight it.
  const chip = (x, y, s, hot) => {
    const w = s.length * 8.4 + 22;
    return `<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${hot ? P.tint : P.white}" stroke="${hot ? P.accent : P.ink}" stroke-width="${hot ? 2.5 : 2}"/>` +
      T(x + w / 2, y + 18, s, { s: 13, m: true, w: 700, f: hot ? P.accent : P.ink });
  };
  // A numbered step badge.
  const step = (x, y, n) => `<circle cx="${x}" cy="${y}" r="12" fill="${P.accent}"/>` + T(x, y + 5, String(n), { s: 13, f: P.white });
  // A friend's box inside the cupboard (small).
  const mini = (x, y, name, col, hot) =>
    `<rect x="${x}" y="${y}" width="128" height="40" rx="9" fill="${hot ? P.tint : P.white}" stroke="${hot ? P.accent : P.ink}" stroke-width="${hot ? 3 : 2}"/>` +
    `<circle cx="${x + 20}" cy="${y + 20}" r="10" fill="${col}"/>` + T(x + 20, y + 25, name[0], { s: 11, f: P.white }) +
    T(x + 38, y + 26, name, { s: 14, a: 'start', f: hot ? P.accent : P.ink });

  const ideaPic = svg(600, 330, 'Reading guests["Ben"]["likes"][0] in three steps. Step 1: open the guests cupboard and take out Ben\'s box. Step 2: open Ben\'s box and take out the likes jar. Step 3: take the first thing in the jar, tofu.',
    // the cupboard: guests
    box(14, 30, 160, 206, P.sand, 16) + T(94, 56, 'guests', { s: 15, m: true, f: P.accent }) +
    T(94, 74, 'a dict', { s: 12, w: 700, f: P.ink2 }) +
    mini(30, 86, 'Ana', P.accent) + mini(30, 134, 'Ben', P.ok, true) + mini(30, 182, 'Chloe', P.danger) +
    arrow(178, 154, 214, 154, P.accent, 3) + step(196, 134, 1) +
    // Ben's box: a dict
    box(220, 30, 200, 206, P.white, 16) + T(320, 56, 'guests["Ben"]', { s: 13.5, m: true, f: P.accent }) +
    T(320, 74, 'a dict', { s: 12, w: 700, f: P.ink2 }) +
    T(236, 104, '"goal": "protein"', { s: 12.5, m: true, a: 'start', f: P.ink2 }) +
    T(236, 126, '"kcal": 2800', { s: 12.5, m: true, a: 'start', f: P.ink2 }) +
    `<rect x="232" y="142" width="176" height="78" rx="12" fill="${P.tint}" stroke="${P.accent}" stroke-width="3"/>` +
    T(244, 164, '"likes":', { s: 12.5, m: true, a: 'start', f: P.accent }) +
    chip(244, 176, 'tofu') + chip(310, 176, 'lentils') +
    arrow(424, 154, 458, 154, P.accent, 3) + step(441, 134, 2) +
    // the jar: a list
    box(464, 30, 124, 206, P.warnT, 16) + T(526, 56, '["likes"]', { s: 13.5, m: true, f: P.accent }) +
    T(526, 74, 'a list', { s: 12, w: 700, f: P.ink2 }) +
    chip(486, 96, 'tofu', true) + T(514, 140, '[0]', { s: 12.5, m: true, f: P.accent }) + step(556, 109, 3) +
    chip(486, 156, 'lentils') + T(526, 200, '[1]', { s: 12.5, m: true, f: P.ink2 }) +
    // the line of code, one step per bracket
    `<rect x="60" y="262" width="480" height="44" rx="12" fill="#15132B"/>` +
    T(300, 291, 'guests["Ben"]["likes"][0]', { s: 17, m: true, f: '#ECEAFF' }) +
    T(300, 324, 'read left to right: cupboard, box, first jar. Result: "tofu"', { s: 12.5, w: 700, f: P.ink2 }));

  const guestsCode = [
    'guests = {',
    '    "Ana": {"goal": "carbs", "kcal": 2600, "likes": ["pasta", "oats"]},',
    '    "Ben": {"goal": "protein", "kcal": 2800, "protein_g": 140,',
    '            "likes": ["tofu", "lentils"]},',
    '    "Chloe": {"goal": "dessert", "kcal": 2000, "gluten_free": True,',
    '              "likes": ["pudding", "berries"]},',
    '}',
    '',
    'print(guests["Ben"]["likes"][0])     # cupboard, box, first jar',
    'print(guests["Ana"]["kcal"])',
    'print(guests["Chloe"]["gluten_free"])',
    '',
    'guests["Ana"]["likes"].append("rice")   # Ana wants rice too',
    'guests["Ben"]["protein_g"] += 20        # Ben trains harder this week',
    'print(guests["Ana"]["likes"])',
    'print(guests["Ben"]["protein_g"])'
  ];
  const planCode = [
    'plan = [',
    '    {"day": "Mon", "dish": "pasta", "kcal": 650},',
    '    {"day": "Tue", "dish": "lentil curry", "kcal": 580},',
    '    {"day": "Wed", "dish": "rice pudding", "kcal": 420},',
    ']',
    '',
    'total = 0',
    'for meal in plan:                  # each round: one whole dict',
    '    print(meal["day"], "-", meal["dish"], "-", meal["kcal"], "kcal")',
    '    total += meal["kcal"]',
    '',
    'print("Total:", total, "kcal")',
    'print(plan[1]["dish"])             # the list first, then the dict'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(guestsCode, { title: 'guests.py' })}${run(planCode, { title: 'plan.py' })}</div>`;

  const stepsBug = [
    'guests = {',
    '    "Ben": {"goal": "protein", "kcal": 2800,',
    '            "likes": ["tofu", "lentils"]},',
    '}',
    '',
    'print(guests["Ben"]["goal"][0])     # no error, but is that what you meant?',
    'print(guests["Ben"][0])             # a dict has no position 0'
  ];
  const weekBug = [
    'week = [[]] * 3              # three days, each an empty list?',
    'week[0].append("soup")       # soup on Monday only',
    'print(week)'
  ];
  // Three day tags tied by strings to ONE shared plate (list).
  const tag = (x, y, d, v, col) =>
    box(x, y, 110, 54, P.white, 12) + T(x + 55, y + 23, d, { s: 15 }) + T(x + 55, y + 44, v, { s: 12.5, m: true, f: col || P.ok });
  const trapPic = svg(600, 230, 'week = [[]] * 3 makes three names, week[0], week[1] and week[2], all tied by strings to one single list. Soup goes on that one plate, so Monday, Tuesday and Wednesday all show soup.',
    T(20, 22, 'week = [[]] * 3', { s: 15, m: true, a: 'start', f: P.accent }) +
    tag(110, 36, 'Mon', "['soup']") + tag(245, 36, 'Tue', "['soup']", P.danger) + tag(380, 36, 'Wed', "['soup']", P.danger) +
    [165, 300, 435].map((x, i) => `<line x1="${x}" y1="96" x2="${276 + i * 24}" y2="152" stroke="${P.danger}" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>`).join('') +
    `<ellipse cx="303" cy="182" rx="66" ry="32" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + chip(282, 169, 'soup') +
    T(400, 192, 'ONE list', { s: 13, a: 'start', f: P.danger }) +
    T(300, 226, 'Three names, one plate. Soup for Monday is soup for every day.', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(stepsBug, { title: 'steps.py' })}` +
    code(['guests = {', '    "Ben": {"goal": "protein", "kcal": 2800,', '            "likes": ["tofu", "lentils"]},', '}', 'print(guests["Ben"]["likes"]["first"])'], { title: 'first.py', bad: [5] }) +
    term(['$ python3 first.py', 'Traceback (most recent call last):', '  File "first.py", line 5, in <module>', '    print(guests["Ben"]["likes"]["first"])', '          ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^', 'TypeError: list indices must be integers or slices, not str'], 'terminal') +
    trapPic + run(weekBug, { title: 'week.py' }) + `</div>`;

  const readFix = [
    'guests = {',
    '    "Ana": {"goal": "carbs", "kcal": 2600, "likes": ["pasta", "oats"]},',
    '    "Ben": {"goal": "protein", "kcal": 2800, "protein_g": 140,',
    '            "likes": ["tofu", "lentils"]},',
    '}',
    '',
    'ben = guests["Ben"]           # step 1: Ben\'s box (a dict)',
    'print(type(ben), ben["goal"])',
    'likes = ben["likes"]          # step 2: the jar (a list)',
    'print(type(likes), likes)',
    'print(likes[0])               # step 3: the first thing in it',
    '',
    'likes.append("eggs")          # same list, so guests changes too',
    'print(guests["Ben"]["likes"])'
  ];
  const weekFix = [
    'week = []',
    'for day in range(3):',
    '    week.append([])          # a NEW empty list each round',
    'week[0].append("soup")',
    'week[2].append("salad")',
    'print(week)',
    'print(len(week), "days")'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(readFix, { title: 'steps.py' })}${run(weekFix, { title: 'week.py' })}</div>`;

  const tryCode = [
    'guests = {',
    '    "Ana": {"goal": "carbs", "kcal": 2600, "likes": ["pasta", "oats"]},',
    '    "Ben": {"goal": "protein", "kcal": 2800, "protein_g": 140,',
    '            "likes": ["tofu", "lentils"]},',
    '    "Chloe": {"goal": "dessert", "kcal": 2000, "gluten_free": True,',
    '              "likes": ["pudding", "berries"]},',
    '}',
    '',
    'total = 0',
    'for name, info in guests.items():      # info is one friend\'s dict',
    '    first = info["likes"][0]',
    '    protein = info.get("protein_g", 0)  # only Ben has this key',
    '    print(f"{name}: {first}, {protein} g protein")',
    '    total += info["kcal"]',
    '',
    'print("All three:", total, "kcal a day")'
  ];

  const catchCode = [
    'week = [["oats"], ["pasta"], ["rice"]]',
    '',
    'backup = week[:]                  # a new OUTER list (lesson 33)',
    'backup[0].append("berries")       # but the inner lists are shared',
    'print(week)',
    '',
    'safe = []',
    'for day in week:',
    '    safe.append(day[:])           # copy each inner list too',
    'safe[1].append("salad")',
    'print(week)',
    'print(safe)'
  ];

  COURSE.add({
    id: 'l41', minutes: 13,
    summary: 'A container can hold other containers: a <b>list inside a dict</b>, a <b>dict inside a dict</b>, a <b>list of dicts</b>. Read <code>guests["Ben"]["likes"][0]</code> <b>left to right, one step per bracket</b>: open the cupboard, open the box, take the first thing. Change deep data the same way: <code>guests["Ana"]["likes"].append("rice")</code>. A wrong step gives <code>KeyError: 0</code> or a <code>TypeError</code>, so name the middle step (<code>ben = guests["Ben"]</code>) when it gets deep. And never build rows with <code>[[]] * 3</code>: that is three names for <b>one</b> list. Build each row in a loop with <code>week.append([])</code>.',
    video: {
      src: 'videos/l41-nesting.mp4', poster: 'videos/l41-nesting.jpg', length: '1 min 12 s',
      script: [
        'Kitchen Coach keeps one record for each friend. Guests is a dictionary, and each friend inside has a dictionary too: the calories, and a list of foods they like. Containers inside containers.',
        'For Ben\'s first favourite, read left to right, one step per bracket. Guests, Ben: open the cupboard, take out Ben\'s box. Likes: open the box, take out the jar. 0: take the first one. Tofu.',
        'Ana wants rice too. Guests, Ana, likes, dot append, rice. The list inside changes, right where it lives.',
        'Skip a step, and Python stops. Guests, Ben, 0, is a key error. Ben\'s box has labels, not positions.',
        'Now plan 3 days. A list holding one empty list, times 3. Add soup to Monday, and soup lands on every day. 3 names, one plate.',
        'The fix: build the week in a loop, with a new list each time. Now soup stays on Monday.',
        'Read nested data one step at a time, and give each row its own list.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Containers inside containers.',
        text: [
          'Kitchen Coach now keeps <b>one record per friend</b>. Ana has a goal, a calorie target and a list of foods she likes. So do Ben and Chloe. Each record is a dictionary, like the spice rack in lesson 37.',
          'Where do the three records go? Into one more dictionary, <code>guests</code>, with each friend\'s name as the key. A dictionary whose values are dictionaries. And inside each of those, <code>"likes"</code> holds a list. That is <b>nesting</b>: containers inside containers.',
          'Picture a <b>cupboard</b> (<code>guests</code>) with one <b>box</b> per friend (<code>guests["Ben"]</code>), and in Ben\'s box a <b>jar</b> of foods (<code>guests["Ben"]["likes"]</code>). To get tofu, you open the cupboard, open the box, and take the first thing from the jar. Three steps, three brackets.'
        ],
        tip: 'Nothing new to learn about lists or dicts. A list or a dict can hold <b>any</b> value, and another list or dict is just a value. Every tool you already know works at every level.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One step per bracket, left to right.',
        text: [
          '<b>A dict of dicts, with lists inside.</b> In <code>guests.py</code>, each value of <code>guests</code> is a whole dictionary in curly brackets. A long dictionary can spread over several lines: inside brackets, Python does not mind the line breaks or the extra spaces.',
          '<b>Read it one step at a time.</b> <code>guests["Ben"]["likes"][0]</code> is three lookups in a row, read <b>left to right</b>. <code>guests["Ben"]</code> hands back Ben\'s dictionary. <code>["likes"]</code> looks in <b>that</b> and hands back his list. <code>[0]</code> takes position 0 of <b>that list</b>: <code>tofu</code>. Each bracket works on whatever the step before it handed back.',
          '<b>Change it the same way.</b> Walk to the thing, then use the tool you already know. <code>guests["Ana"]["likes"].append("rice")</code> walks to Ana\'s list and appends to it (lesson 34). <code>guests["Ben"]["protein_g"] += 20</code> walks to Ben\'s number and adds 20 (lesson 38). Press <b>Run</b>.',
          '<b>A list of dicts</b> is the other common shape, like a table: one dict per row. In <code>plan.py</code>, the <code>for</code> loop hands you one whole dict per round, so <code>meal["dish"]</code> reads that day\'s dish. Note the order in <code>plan[1]["dish"]</code>: the list first (position 1, Tuesday), then the dict (the key). Now add a Thursday row and run it again. Before you press Run, say the new total.'
        ],
        tip: 'Stuck reading a long line? Say each bracket out loud: "guests, the one called Ben, his likes, the first". If one step does not make sense, that is where the bug is.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A wrong step, and three days sharing one plate.',
        text: [
          '<b>Pain 1: a wrong step.</b> Press <b>Run</b> on <code>steps.py</code>. Line 6 has no error, but prints <code>p</code>: you meant the likes, took the goal by mistake, and <code>[0]</code> on text gives its first letter (lesson 32). Line 7 forgot the <code>["likes"]</code> step. <code>guests["Ben"]</code> is a dictionary, so Python looks for a <b>key</b> called <code>0</code> and stops with <code>KeyError: 0</code>, the same error as lesson 37.',
          'The other way round fails too. A list has positions, not keys, so <code>guests["Ben"]["likes"]["first"]</code> stops with <code>TypeError: list indices must be integers or slices, not str</code>. "Indices" means positions: a list wants a whole number in its brackets.',
          '<b>Pain 2: the shared plate.</b> You plan three days. Lesson 31 showed that <code>["salt"] * 3</code> repeats an item, so <code>[[]] * 3</code> looks like three empty lists. Add soup to Monday with <code>week[0].append("soup")</code>. Press <b>Run</b> on <code>week.py</code>: <code>[[\'soup\'], [\'soup\'], [\'soup\']]</code>. Soup on <b>every</b> day.',
          'Why? <code>* 3</code> does not make three new lists. It repeats the <b>same</b> list three times. It is lesson 31\'s "two names, one list" again: <code>week[0]</code>, <code>week[1]</code> and <code>week[2]</code> are three labels on one plate.'
        ],
        warn: 'The shared plate is the worst kind of bug: no error at all, just wrong food on the wrong day. <code>* 3</code> is fine for text and numbers, like <code>["salt"] * 3</code>. It goes wrong only when the item inside is a list or a dict, a thing that can change.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Name the middle step. Give each row its own list.',
        text: [
          '<b>Fix 1: name the middle step.</b> When a line has three or more brackets, split it. <code>ben = guests["Ben"]</code> is step 1, Ben\'s box. <code>likes = ben["likes"]</code> is step 2, the jar. <code>likes[0]</code> is step 3. Each name says what you are holding, and <code>print(type(...))</code> (lesson 13) shows it: a <code>dict</code>, then a <code>list</code>.',
          'The name is a <b>label on the same list</b>, not a copy (lesson 31). So <code>likes.append("eggs")</code> changes Ben\'s list inside <code>guests</code> too. Press <b>Run</b> on <code>steps.py</code> and look at the last line. That is exactly what you want when you update a record.',
          '<b>Fix 2: build each row in a loop.</b> Start with an empty week, and append a <b>new</b> empty list once per day: <code>week.append([])</code> runs 3 times, and each <code>[]</code> makes a brand-new list. Press <b>Run</b> on <code>week.py</code>: soup stays on Monday, salad on Wednesday, Tuesday is still empty.'
        ],
        tip: 'Lesson 76, Comprehensions, shows a one-line way to build the same week: <code>[[] for day in range(3)]</code>. It is the same loop, written short, and it also makes a new list each round.'
      },
      {
        label: 'Try it', pic: run(tryCode, { title: 'guest_book.py' }),
        h: 'Loop the guest book.',
        text: [
          'Press <b>Run</b>. <code>guests.items()</code> from lesson 38 hands you each name with its whole record. Inside the loop, <code>info</code> is one friend\'s dictionary, so one step, <code>info["likes"]</code>, reaches the list.',
          'Only Ben has a <code>"protein_g"</code> key. <code>info.get("protein_g", 0)</code> gives 0 for Ana and Chloe instead of a <code>KeyError</code>, also from lesson 38.',
          '1. Add a line that prints each friend\'s <b>last</b> liked food. (Lesson 32: position <code>-1</code>.)',
          '2. Add <code>"Dan": {"goal": "energy", "kcal": 2300, "likes": ["noodles"]},</code> as a fourth guest. Before you run it, say the new total.',
          '3. Break it on purpose: change <code>info["likes"][0]</code> to <code>info[0]</code> and read the error. Then press Reset.'
        ]
      },
      {
        label: 'The catch', pic: run(catchCode, { title: 'backup.py' }),
        h: 'A copy copies only the outside.',
        text: [
          'Lesson 33 said <code>week[:]</code> makes a new list. True, but only the <b>outer</b> one. The new list holds the <b>same inner lists</b>, the same plates. Press <b>Run</b>: berries added to <code>backup[0]</code> show up in <code>week</code> too.',
          'To copy nested data, copy every level. The loop at the bottom copies each inner list with <code>day[:]</code>, so the salad stays in <code>safe</code> only. Python also has a ready-made tool for this, <code>copy.deepcopy()</code>. You meet it in lesson 61, The standard library.',
          'And keep nesting <b>shallow</b>. Two or three levels read well. If you need four or five brackets to reach something, the data wants a better shape. Lesson 73, Dataclasses, gives each record named fields instead of string keys.'
        ],
        warn: 'Lesson 97, Mutability and references, explains why all of this happens: names and containers hold <b>references</b> to values, not copies. For now, remember: a list or dict inside another one is shared until you copy it yourself.'
      }
    ],
    exercises: [
      {
        file: 'l41_guest_book.py', title: 'The guest book',
        task: 'A nested <code>guests</code> dictionary is given. Print each guest\'s <b>first liked food</b>, the <b>total kcal</b> of all guests, then add <code>"rice"</code> to <b>Chloe\'s list</b> and print it. The starter has the wrong-step bug, <code>info[0]</code>, so it stops with <code>KeyError: 0</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'Run it first and read the hint. Then fix the lines between <code>START</code> and <code>END</code>: one more step for the first food, a line that adds the kcal, and one <code>.append()</code> for Chloe. Save the file.',
          'Run it again. The check also runs your lines with other guests, so typed-in answers will not pass. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['guests = {', '    "Ana": {"kcal": 2600, "likes": ["pasta", "oats"]},', '    "Ben": {"kcal": 2800, "likes": ["tofu", "lentils"]},', '}', 'print(guests["Ana"]["likes"][1])'], { title: 'read.py' }),
        options: ['oats', 'pasta', 'lentils', 'KeyError: 1'],
        answer: 0,
        why: 'Left to right: <code>guests["Ana"]</code> is Ana\'s dict, <code>["likes"]</code> is her list, and <code>[1]</code> is the second item, <code>oats</code>. Positions start at 0 (lesson 32).',
        hint: 'One step per bracket. Which list do you reach, and which position is 1?'
      },
      {
        type: 'order', q: 'Python reads <code>guests["Chloe"]["likes"][0]</code>. Put the steps in the order they happen.',
        items: ['Start with guests, the whole cupboard', 'guests["Chloe"]: Chloe\'s dict', '["likes"]: her list of foods', '[0]: the first food in that list'],
        why: 'Always left to right. Each bracket works on what the step before it handed back.',
        hint: 'Read the brackets from left to right.'
      },
      {
        type: 'match', q: '<code>guests = {"Ben": {"kcal": 2800, "likes": ["tofu", "lentils"]}}</code>. Match each expression to what it gives.',
        pairs: [
          ['guests', 'the whole guest book, a dict'],
          ['guests["Ben"]', "Ben's record, a dict"],
          ['guests["Ben"]["likes"]', "Ben's foods, a list"],
          ['guests["Ben"]["likes"][1]', 'the text "lentils"'],
          ['guests["Ben"]["kcal"]', 'the number 2800']
        ],
        why: 'Each extra bracket goes one level deeper: the cupboard, the box, the jar, one thing in the jar.',
        hint: 'Count the brackets. Each one opens one more container.'
      },
      {
        type: 'fix', q: 'This stops with <code>KeyError: 0</code>. Fix line 4 so it prints Ben\'s first liked food, <code>tofu</code>.',
        code: ['guests = {', '    "Ben": {"kcal": 2800, "likes": ["tofu", "lentils"]},', '}', 'print(guests["Ben"][0])'],
        title: 'first.py',
        check: [
          'got = out.strip()',
          'if got == "tofu" and guests == {"Ben": {"kcal": 2800, "likes": ["tofu", "lentils"]}}:',
          '    ok = True',
          'elif got == "tofu":',
          '    msg = "It prints tofu, but guests was changed. Keep lines 1 to 3 as they were."',
          'else:',
          '    msg = "It printed " + got + ". Add the missing step: guests[\\"Ben\\"][\\"likes\\"][0]."'
        ].join('\n'),
        why: '<code>print(guests["Ben"]["likes"][0])</code>. <code>guests["Ben"]</code> is a dictionary, and a dictionary has no position 0. Step into <code>["likes"]</code> first. That is a list, and a list has a position 0.',
        hint: 'Which step is missing between Ben\'s box and the first thing?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['week = [[]] * 3', 'week[1].append("salad")', 'print(week)'], { title: 'week.py' }),
        options: ["[['salad'], ['salad'], ['salad']]", "[[], ['salad'], []]", "[['salad'], [], []]", "[[], [], [], 'salad']"],
        answer: 0,
        why: '<code>[[]] * 3</code> repeats <b>one</b> list three times. All three days are labels on the same list, so salad shows up on every day.',
        hint: 'Does * 3 make three lists, or three names for one list?'
      },
      {
        type: 'fix', q: 'Soup should go on Monday only. Fix line 1 (you may use more lines) so it prints <code>[[\'soup\'], [], []]</code>.',
        code: ['week = [[]] * 3', 'week[0].append("soup")', 'print(week)'],
        title: 'week.py',
        check: [
          'got = out.strip()',
          'if got == "[[\'soup\'], [], []]" and len(week) == 3 and week[1] is not week[2]:',
          '    ok = True',
          'elif got == "[[\'soup\'], [\'soup\'], [\'soup\']]":',
          '    msg = "Still soup on every day. The three days still share one list. Build them in a loop: week = [], then for day in range(3): week.append([])."',
          'elif got == "[[\'soup\'], [], []]":',
          '    msg = "Right output, but Tuesday and Wednesday are still one shared list. Give each day its own new list."',
          'else:',
          '    msg = "It printed " + got + ". Keep lines 2 and 3, and give week 3 separate empty lists."'
        ].join('\n'),
        why: '<code>week = []</code>, then <code>for day in range(3):</code> with <code>week.append([])</code> inside. Each round makes a brand-new empty list, so each day has its own plate.',
        hint: 'Start with week = [] and append a new [] three times with a for loop and range(3).'
      },
      {
        type: 'pick', q: 'Back to lesson 38. Only Ben has a <code>"protein_g"</code> key. What does this print?',
        pic: code(['guests = {', '    "Ana": {"kcal": 2600},', '    "Ben": {"kcal": 2800, "protein_g": 140},', '    "Chloe": {"kcal": 2000},', '}', 'for name, info in guests.items():', '    print(name, info.get("protein_g", 0))'], { title: 'protein.py' }),
        options: ['Ana 0, then Ben 140, then Chloe 0', "KeyError: 'protein_g' on Ana", 'Ana None, then Ben 140, then Chloe None', 'Only Ben 140'],
        answer: 0,
        why: '<code>.items()</code> hands out each name with its whole record. <code>info</code> is one friend\'s dict, and <code>.get("protein_g", 0)</code> gives the default 0 when that key is missing, so nothing crashes.',
        hint: 'What does .get give back when the key is missing and you gave a default?'
      },
      {
        type: 'type', q: 'Type the one line that adds <code>"rice"</code> to the end of Ana\'s <code>"likes"</code> list inside <code>guests</code>.',
        prompt: '>>>',
        answers: ['guests["Ana"]["likes"].append("rice")'],
        accept: '^guests\\["Ana"\\]\\["likes"\\] ?\\.append\\("rice"\\)$',
        why: 'Walk to the list one step per bracket, then use the list tool you know: <code>.append()</code> (lesson 34). The list changes right where it lives, inside <code>guests</code>.',
        hint: 'guests, then Ana, then likes, then .append(...).'
      }
    ]
  });
})();
