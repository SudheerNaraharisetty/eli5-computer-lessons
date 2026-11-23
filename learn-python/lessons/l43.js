/* Lesson 43: Review: collections (module 3). Quiz only, no video, no exercise. */
(function () {
  const { P, code, run, svg, box, T, arrow } = PR;

  /* =====================================================================
     l43  Review: collections
     ===================================================================== */

  // One jar on the pantry shelf: a lid with the lesson number, then a card with the title, the key code and one plain line.
  const jar = (x, y, n, title, mono, plain, tint) =>
    `<rect x="${x + 18}" y="${y}" width="96" height="18" rx="5" fill="${P.ink}"/>` +
    `<line x1="${x + 26}" y1="${y + 6}" x2="${x + 106}" y2="${y + 6}" stroke="${P.mute}" stroke-width="1.2"/>` +
    T(x + 66, y + 14, 'Lesson ' + n, { s: 10.5, f: P.white }) +
    box(x, y + 16, 132, 88, P.white, 16) +
    `<rect x="${x + 7}" y="${y + 24}" width="118" height="72" rx="8" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
    T(x + 66, y + 42, title, { s: title.length > 14 ? 11.5 : 12.5 }) +
    T(x + 66, y + 64, mono, { s: mono.length > 14 ? 10.5 : 11.5, m: true, w: 700 }).replace('<text ', '<text style="font-variant-ligatures:none" ') +
    T(x + 66, y + 86, plain, { s: 11, w: 700, f: P.ink2 });

  const jars = [
    [31, 'Lists', '["oats", "rice"]', 'in order, can grow', P.tint],
    [32, 'Indexing', 'shopping[-1]', 'count from 0', P.tint],
    [33, 'Slicing', 'week_km[:3]', 'stop is left out', P.tint],
    [34, 'List methods', 'shopping.sort()', 'own line, no =', P.tint],
    [35, 'Looping lists', 'for x in basket:', 'build a new list', P.tint],
    [36, 'Tuples', '("egg",)', 'the comma makes it', P.okT],
    [37, 'Dictionaries', 'protein["tofu"]', 'look up by key', P.okT],
    [38, 'Using dicts', '.get("oats", 0)', 'no KeyError', P.okT],
    [39, 'Sets', 'set(merged)', 'one of each', P.warnT],
    [40, 'Frozen', 'frozenset(...)', 'can be a dict key', P.warnT],
    [41, 'Nesting', 'g["Ben"]["likes"]', 'one step per bracket', P.warnT],
    [42, 'Choosing', 'list? dict? set?', 'ask: what is the job', P.warnT]
  ];
  // The pantry shelf under each row of jars.
  const shelf = y => `<rect x="10" y="${y}" width="580" height="9" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const recapPic = svg(600, 428, 'Twelve jars on three pantry shelves, one per lesson of module 3, each with its key code and one plain idea. Lists: lists, indexing, slicing, list methods, looping over lists. Fixed and labelled: tuples, dictionaries, working with dictionaries. One of each and beyond: sets, frozen collections, nesting, choosing the right one. Below the shelves, this review.',
    T(300, 20, 'Module 3: one pantry, twelve jars', { s: 15 }) +
    jars.map((s, i) => jar(21 + (i % 4) * 142, 30 + Math.floor(i / 4) * 114, ...s)).join('') +
    [138, 252, 366].map(y => shelf(y - 4)).join('') +
    box(160, 382, 280, 34, P.white, 10) +
    `<rect x="166" y="388" width="88" height="22" rx="6" fill="${P.ink}"/>` + T(210, 403.5, 'Lesson 43', { s: 11, f: P.white }) +
    T(266, 404, 'Review: you are here', { s: 12.5, a: 'start' }));

  // How to play: predict, run, compare. And: the last line of an error names the problem.
  const step = (x, n, head, line1, line2, fill) =>
    box(x, 20, 170, 104, fill, 14) +
    `<circle cx="${x + 26}" cy="${42}" r="12" fill="${P.ink}"/>` + T(x + 26, 46.5, String(n), { s: 12.5, f: P.white }) +
    T(x + 46, 47, head, { s: 15, a: 'start' }) +
    T(x + 85, 82, line1, { s: 12, w: 700, f: P.ink2 }) +
    T(x + 85, 102, line2, { s: 12, w: 700, f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(600, 196, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare. Below: an error? Read its last line. IndexError, KeyError and TypeError each name the problem.',
      step(14, 1, 'Predict', 'say every line', 'out loud first', P.tint) +
      arrow(190, 72, 212, 72, P.accent, 3) +
      step(216, 2, 'Run', 'press Run and', 'read every line', P.warnT) +
      arrow(392, 72, 414, 72, P.accent, 3) +
      step(418, 3, 'Compare', 'surprised? that is', 'the lesson to reread', P.okT) +
      box(14, 142, 572, 40, P.dangerT, 12) +
      `<rect x="28" y="150" width="86" height="24" rx="7" fill="${P.danger}"/>` + T(71, 166.5, 'KeyError', { s: 12.5, f: P.white, m: true }) +
      T(128, 167, 'An error? Its last line names the problem. Read it first.', { s: 12.5, w: 700, a: 'start', f: P.ink })) +
    run(['# Warm up: say the output out loud, then press Run', 'shopping = ["oats", "rice"]', 'shopping.append("tofu")', 'print(shopping[0], shopping[-1], len(shopping))'], { title: 'warm_up.py' }) +
    run(['# One line works, one line stops. Which one, and why?', 'protein = {"tofu": 17, "lentils": 9}', 'print(protein.get("Tofu", 0))', 'print(protein["Tofu"])'], { title: 'read_the_error.py' }) +
    `</div>`;

  COURSE.add({
    id: 'l43', minutes: 25,
    summary: 'Twelve lessons of collections on one pantry shelf: lists, indexing, slicing, list methods, looping, tuples, dicts, dict tools, sets, frozen collections, nesting, and choosing the right one. Then <b>16 mixed questions</b>, easy to hard, with <b>6 real bugs</b> to fix. Most of them you can <b>run</b>.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One pantry, twelve jars.',
        text: [
          'Module 3 taught your program to keep <b>many values under one name</b>. Each jar in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>Lists</b> (blue). A list keeps items <b>in order</b> and can change. Positions start at <b>0</b>, and <code>-1</code> is the last item. A slice <code>[start:stop]</code> makes a new list, and the stop is <b>left out</b>. Methods like <code>.append()</code> and <code>.sort()</code> change the list itself and hand back <code>None</code>, so call them on their own line. Never remove items from a list while you loop over it: build a new list.',
          '<b>Fixed and labelled</b> (green). A <b>tuple</b> is a list that cannot change, and the <b>comma</b> makes it: <code>("egg",)</code>. A <b>dict</b> finds a value by its key. A missing key stops with <code>KeyError</code>, so ask with <code>in</code> or use <code>.get(key, default)</code>.',
          '<b>One of each, and beyond</b> (orange). A <b>set</b> drops duplicates and has no order, so use <code>sorted()</code> to print it. <code>{}</code> is an empty <b>dict</b>, and <code>set()</code> is an empty set. A <b>frozenset</b> never changes, so it can be a dict key. Containers can hold containers: read one step per bracket, and give each row its own list. Pick the container by the <b>question you will ask it</b>.'
        ],
        tip: 'Module 2 still applies: <code>for</code> runs once per item, <code>if</code> picks a path, and an empty list, dict or set counts as no.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>. With a list, say every item, brackets and quotes too. Then pick your answer, and press <b>Run</b> to check it.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code and checks what it prints. There is often more than one good fix.',
          'Many bugs in this module stop with an error. Read the <b>last line</b> first: <code>IndexError</code> means no item at that position, <code>KeyError</code> means no such key, and <code>TypeError</code> means the wrong kind of value. Try it now on <code>read_the_error.py</code> above.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Warm up. Kitchen Coach has <code>shopping = ["oats", "rice", "tofu"]</code>, <code>protein = {"tofu": 17, "lentils": 9}</code> and <code>pancake = (200, 300, 2)</code>. Does each line work, or stop with an error? Not sure? Paste the three lines and one of these into any code box.',
        buckets: ['Works', 'Stops with an error'],
        items: [
          ['shopping[-1]', 0],
          ['shopping[-3]', 0],
          ['shopping[1:10]', 0],
          ['protein.get("oats", 0)', 0],
          ['"tofu" in protein', 0],
          ['len(pancake)', 0],
          ['shopping[3]', 1],
          ['protein["oats"]', 1],
          ['protein[0]', 1],
          ['pancake[0] = 250', 1],
          ['shopping.remove("milk")', 1]
        ],
        why: '<code>shopping[3]</code> is past the end: <code>IndexError</code>. But a slice never raises, so <code>[1:10]</code> just stops at the end. <code>protein["oats"]</code> and <code>protein[0]</code> are both <code>KeyError</code>: a dict has keys, not positions. A tuple cannot change, so <code>pancake[0] = 250</code> is a <code>TypeError</code>. And <code>.remove()</code> stops with <code>ValueError</code> when the item is not there.',
        hint: 'Three items means positions 0, 1 and 2, or -1, -2 and -3. A dict only knows its keys. A tuple never changes.'
      },
      {
        type: 'pick', q: 'What does Kitchen Coach print?',
        pic: run(['shopping = ["flour", "eggs", "milk", "rice"]', 'print(shopping[2], shopping[-1])'], { title: 'shopping.py' }),
        options: ['milk rice', 'eggs rice', 'milk flour', 'eggs milk'],
        answer: 0,
        why: 'Counting starts at 0: flour is 0, eggs is 1, milk is 2. <code>-1</code> is always the last item, rice.',
        hint: 'Lesson 32: the first item is at 0. Which item is at 2?'
      },
      {
        type: 'type', q: 'Ana\'s week, Monday to Sunday. Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['week_km = [5, 8, 6, 0, 10, 7, 16]', 'print(week_km[2:5])'], { title: 'ana_week.py' }),
        prompt: 'output >',
        answers: ['[6, 0, 10]'],
        accept: '^\\[6, ?0, ?10\\]$',
        why: 'The slice starts at position 2 (the 6) and stops <b>before</b> position 5. So it takes positions 2, 3 and 4: <code>[6, 0, 10]</code>. Stop minus start, 5 minus 2, is 3 items.',
        hint: 'Lesson 33: count from 0, and the stop is left out. Which positions are 2, 3 and 4?'
      },
      {
        type: 'pick', q: 'Kitchen Coach makes three empty baskets. What does it print?',
        pic: run(['a = {}', 'b = set()', 'c = {"eggs"}', 'print(type(a), type(b), type(c))'], { title: 'baskets.py' }),
        options: [
          "<class 'dict'> <class 'set'> <class 'set'>",
          "<class 'set'> <class 'set'> <class 'set'>",
          "<class 'dict'> <class 'set'> <class 'dict'>",
          "<class 'set'> <class 'dict'> <class 'set'>"
        ],
        answer: 0,
        why: 'Empty curly brackets <code>{}</code> make an empty <b>dict</b>: dicts came first, so they got the short way. An empty set is <code>set()</code>. Curly brackets with items but no colons, like <code>{"eggs"}</code>, make a set.',
        hint: 'Lesson 39: is {} an empty set or an empty dict?'
      },
      {
        type: 'match', q: 'Match each Kitchen Coach job to the container that fits it best.',
        pairs: [
          ['list', 'the shopping list: in order, and you add and cross off items'],
          ['tuple', 'Grandma\'s pancakes: 200 g flour, 300 ml milk, 2 eggs, in that order, never changed'],
          ['dict', 'each guest\'s protein goal, looked up by the guest\'s name'],
          ['set', 'every allergen at the table, one of each, growing as guests arrive'],
          ['frozenset', 'a group of guests, in any order, used as the key for a menu'],
          ['dict of lists', 'each guest\'s name, with the list of foods they like']
        ],
        why: 'Ask what the job is. In order and changing: a list. A fixed record: a tuple. Look up by a name: a dict. One of each: a set. A set that must be a dict key has to be frozen. And a name with many things is a dict whose values are lists.',
        hint: 'Lesson 42: pick the container by the question you will ask it. Start with the ones you are sure of.'
      },
      {
        type: 'order', q: 'Ana\'s week is <code>week_km = [5, 8, 6, 0, 10, 7, 16]</code>, 7 days. Put the slices in order, from the <b>fewest</b> items to the <b>most</b>.',
        items: [
          'week_km[2:3]',
          'week_km[-2:]',
          'week_km[:3]',
          'week_km[3:]',
          'week_km[1:6]',
          'week_km[:]'
        ],
        why: '<code>[2:3]</code> is 1 item: stop minus start. <code>[-2:]</code> is the last 2. <code>[:3]</code> is the first 3. <code>[3:]</code> starts at position 3 and goes to the end: 4 items. <code>[1:6]</code> is 5. <code>[:]</code> is a copy of all 7.',
        hint: 'For a slice with both numbers, the count is stop minus start. A missing number means the front or the end.'
      },
      {
        type: 'pick', q: 'Ana cooks a carb dinner and Ben brings lentils. What does this print?',
        pic: run(['pantry = {"rice": 900, "oats": 400}', 'pantry["rice"] -= 150', 'pantry["lentils"] = pantry.get("lentils", 0) + 250', 'print(pantry.get("quinoa"), pantry["rice"], pantry["lentils"])'], { title: 'pantry.py' }),
        options: ['None 750 250', '0 750 250', "KeyError: 'lentils'", 'None 900 250'],
        answer: 0,
        why: 'Line 2 takes 150 g off the rice: 750. On line 3 there is no lentils key yet, so <code>.get("lentils", 0)</code> gives 0, plus 250. <code>.get("quinoa")</code> with no default gives <code>None</code>, not 0 and not an error.',
        hint: 'Lesson 38: what does .get hand back for a missing key when you give no default?'
      },
      {
        type: 'fill', q: 'Kitchen Coach counts how often Ben ate each food this week. Fill the blanks so it prints <code>{\'oats\': 2, \'tofu\': 1, \'rice\': 1}</code>.',
        text: 'meals = ["oats", "tofu", "oats", "rice"]\ncounts = ___\nfor food in ___:\n    counts[food] = counts.___(food, 0) + 1\nprint(counts)',
        options: ['{}', 'meals', 'get', 'set()', 'counts', 'pop', '[]'],
        answer: ['{}', 'meals', 'get'],
        why: 'Start with an empty <b>dict</b>, <code>{}</code>, not <code>set()</code> or <code>[]</code>. Loop over the meals. <code>counts.get(food, 0)</code> gives 0 the first time a food shows up, so there is no <code>KeyError</code>.',
        hint: 'Food to number of times is a key to a value. Which empty container holds keys and values?'
      },
      {
        type: 'fix', q: 'Kitchen Coach should print the shopping list A to Z, then how many items it has. Press Run: it prints <code>None</code>, then stops. Fix it so it prints <code>[\'eggs\', \'oats\', \'rice\']</code> and then <code>3 items</code>.',
        code: ['shopping = ["rice", "eggs", "oats"]', 'shopping = shopping.sort()', 'print(shopping)', 'print(len(shopping), "items")'],
        title: 'sort_it.py',
        check: [
          'want = "[\'eggs\', \'oats\', \'rice\']\\n3 items"',
          'if out == want:',
          '    ok = True',
          'elif out.startswith("None"):',
          '    msg = "shopping still holds None. .sort() changes the list and hands back None. Do not put its answer in the jar."',
          'else:',
          '    msg = "It should print [\'eggs\', \'oats\', \'rice\'] and then 3 items."'
        ].join('\n'),
        why: '<code>.sort()</code> sorts the list <b>in place</b> and hands back <code>None</code>. The <code>=</code> put that <code>None</code> in the jar, and <code>len(None)</code> is a <code>TypeError</code>. Write <code>shopping.sort()</code> on its own line, or <code>shopping = sorted(shopping)</code>.',
        hint: 'Lesson 34: what does .sort() hand back? Where does line 2 put it?'
      },
      {
        type: 'fix', q: 'Chloe wants one topping, and it must stay fixed, so it is a tuple. But the loop prints one letter per line. Fix line 1 so it prints <code>berries</code> once, and <code>toppings</code> is still a tuple.',
        code: ['toppings = ("berries")', 'for t in toppings:', '    print(t)'],
        title: 'toppings.py',
        check: [
          't = globals().get("toppings")',
          'if out == "berries" and type(t) is tuple:',
          '    ok = True',
          'elif type(t) is list:',
          '    msg = "It prints berries now, but toppings is a list. Keep the round brackets and make it a tuple."',
          'elif type(t) is str:',
          '    msg = "toppings is still text, so the loop walks its letters. Round brackets alone do not make a tuple."',
          'else:',
          '    msg = "It should print berries once, with toppings a tuple of one item."'
        ].join('\n'),
        why: 'Round brackets alone only group, so <code>("berries")</code> is just the text <code>"berries"</code>, and <code>for</code> walks text letter by letter. The <b>comma</b> makes the tuple: <code>("berries",)</code>.',
        hint: 'Lesson 36: what makes a tuple, the brackets or the comma?'
      },
      {
        type: 'pick', q: 'Three plates: Ana, Ben and Chloe. Cake goes on Chloe\'s plate only. What does this print?',
        pic: run(['plates = [[]] * 3          # Ana, Ben, Chloe', 'plates[2].append("cake")   # cake for Chloe', 'print(plates[0], len(plates))'], { title: 'plates.py' }),
        options: ["['cake'] 3", '[] 3', "['cake'] 1", '[] 1'],
        answer: 0,
        why: '<code>[[]] * 3</code> makes three names for <b>one</b> list. Cake on Chloe\'s plate is cake on the only plate, so Ana\'s plate shows it too. There are still 3 places in <code>plates</code>, they just share one list.',
        hint: 'Lesson 41: does * 3 make three lists, or three names for one list?'
      },
      {
        type: 'fix', q: 'Only Ben has a protein goal, and Kitchen Coach stops with <code>KeyError: \'protein_g\'</code>. Fix it so it prints <code>Ana: 2600 kcal</code>, <code>Ben: 2800 kcal, 140 g protein</code>, <code>Chloe: 2000 kcal</code>. Do not change the guests.',
        code: [
          'guests = {',
          '    "Ana": {"kcal": 2600, "likes": ["pasta", "oats"]},',
          '    "Ben": {"kcal": 2800, "protein_g": 140, "likes": ["tofu", "lentils"]},',
          '    "Chloe": {"kcal": 2000, "likes": ["pudding", "berries"]},',
          '}',
          'for name, info in guests.items():',
          '    kcal = info["kcal"]',
          '    protein = info["protein_g"]',
          '    print(f"{name}: {kcal} kcal, {protein} g protein")'
        ],
        title: 'goals.py',
        check: [
          'want = "Ana: 2600 kcal\\nBen: 2800 kcal, 140 g protein\\nChloe: 2000 kcal"',
          'g = globals().get("guests")',
          'same = g == {"Ana": {"kcal": 2600, "likes": ["pasta", "oats"]}, "Ben": {"kcal": 2800, "protein_g": 140, "likes": ["tofu", "lentils"]}, "Chloe": {"kcal": 2000, "likes": ["pudding", "berries"]}}',
          'if out == want and same:',
          '    ok = True',
          'elif out == want:',
          '    msg = "Right output, but the guests changed. Leave the dict as it was, and ask about the key instead."',
          'elif "None g protein" in out or "0 g protein" in out:',
          '    msg = "No crash now, but Ana and Chloe get a protein part they should not have. Print it only when the key is there."',
          'else:',
          '    msg = "It should print three lines: Ana: 2600 kcal, Ben: 2800 kcal, 140 g protein, Chloe: 2000 kcal."'
        ].join('\n'),
        why: 'Ask before you reach: <code>if "protein_g" in info:</code> print the long line, <code>else:</code> print only the kcal. <code>in</code> asks about the keys of one friend\'s dict, so it is True only for Ben.',
        hint: 'Lesson 37: ask with in before you look up a key that may be missing. Then lesson 20: if and else pick the line.'
      },
      {
        type: 'fix', q: 'Chloe never eats these, and the card is frozen. Kitchen Coach checks tonight\'s list and stops with a <code>TypeError</code>. Fix line 3 so it prints <code>Not for Chloe: [\'flour\', \'rye\']</code>.',
        code: ['never = frozenset({"flour", "rye", "barley"})', 'tonight = ["rice", "flour", "lemon", "rye", "flour"]', 'clash = tonight & never', 'print("Not for Chloe:", sorted(clash))'],
        title: 'chloe_check.py',
        check: [
          'if out == "Not for Chloe: [\'flour\', \'rye\']":',
          '    ok = True',
          'elif out.count("flour") > 1:',
          '    msg = "Flour shows twice. Make one of each first, then take the things in both."',
          'else:',
          '    msg = "It should print: Not for Chloe: [\'flour\', \'rye\']"'
        ].join('\n'),
        why: '<code>&amp;</code> means "in both", and it works between sets, not between a list and a set. Turn the list into a set first: <code>clash = set(tonight) &amp; never</code>. That also drops the second flour. <code>sorted()</code> makes the order the same every time.',
        hint: 'Read the last line of the error: which two kinds of value does &amp; not accept? Lesson 39: how do you turn a list into a set?'
      },
      {
        type: 'fix', q: 'Ben keeps only snacks with at least 10 g of protein. Kitchen Coach removes the small ones, but one sneaks through. Fix it so it prints <code>[25, 30]</code>.',
        code: ['snacks_g = [25, 8, 6, 30, 4]    # protein in each snack', 'for g in snacks_g:', '    if g < 10:', '        snacks_g.remove(g)', 'print(snacks_g)'],
        title: 'ben_snacks.py',
        check: [
          'if out == "[25, 30]":',
          '    ok = True',
          'elif out == "[25, 6, 30]":',
          '    msg = "The 6 still sneaks through. Removing an item makes the next one slide into its spot, and the loop skips it. Build a new list instead."',
          'else:',
          '    msg = "It should print [25, 30]."'
        ].join('\n'),
        why: 'When 8 is removed, 6 slides into its spot, and the loop moves on past it. Leave the list alone while you loop it. Build a new one: <code>keep = []</code>, then <code>if g &gt;= 10: keep.append(g)</code>, and print <code>keep</code>. Looping over a copy, <code>snacks_g[:]</code>, works too.',
        hint: 'Lesson 35: never remove from the list you are looping over. Which new list could you build instead?'
      },
      {
        type: 'pick', q: 'Python 3.15 adds <code>frozendict</code>. The Run boxes here use 3.14, so this one has no Run button. On Python 3.15, what does it print?',
        pic: code(['spice = frozendict({"salt": 5, "pepper": 2})   # grams per pot', 'bigger = spice | {"cumin": 1}', 'print(len(spice), len(bigger))'], { title: 'spice.py, needs Python 3.15' }),
        options: ['2 3', '3 3', '2 2', "TypeError: 'frozendict' object does not support item assignment"],
        answer: 0,
        why: 'A frozendict never changes. <code>|</code> does not write on the old card: it makes a <b>new</b> frozendict with cumin added. So <code>spice</code> still has 2 keys, and <code>bigger</code> has 3. There is no item assignment here, so no error.',
        hint: 'Lesson 40: does | change the frozen card, or make a new one?'
      },
      {
        type: 'fix', q: 'Hardest one. Chloe copies the week plan to try a dessert on Wednesday, but the dessert shows up in the shared plan too. Fix line 2 (you may use more lines) so it prints <code>[[\'oats\'], [\'pasta\'], [\'rice\']]</code> and then <code>[[\'oats\'], [\'pasta\'], [\'rice\', \'pudding\']]</code>.',
        code: ['week = [["oats"], ["pasta"], ["rice"]]', 'chloe = week[:]', 'chloe[2].append("pudding")', 'print(week)', 'print(chloe)'],
        title: 'chloe_week.py',
        check: [
          'want = "[[\'oats\'], [\'pasta\'], [\'rice\']]\\n[[\'oats\'], [\'pasta\'], [\'rice\', \'pudding\']]"',
          'if out == want:',
          '    ok = True',
          'elif out.count("pudding") == 2:',
          '    msg = "Pudding is still in both. week[:] copies the outer list only. The inner lists are still shared."',
          'else:',
          '    msg = "It should print the week without pudding, then Chloe\'s week with pudding on Wednesday."'
        ].join('\n'),
        why: '<code>week[:]</code> makes a new <b>outer</b> list, but its items are the same inner lists. Copy each day too: <code>chloe = []</code>, then <code>for day in week:</code> with <code>chloe.append(day[:])</code> inside. Now each of Chloe\'s days is her own list.',
        hint: 'Lesson 41: a copy copies only the outside. Build chloe in a loop, and copy each day with [:].'
      }
    ]
  });
})();
