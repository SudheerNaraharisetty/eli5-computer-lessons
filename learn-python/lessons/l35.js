/* Lesson 35: Looping over lists (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l35  Looping over lists
     ===================================================================== */

  const ITEMS = ['oats', 'pasta', 'rye bread', 'rice', 'tofu'];

  // One basket item. kind: 'on' | 'here' (the loop is on it) | 'bad' (gluten) | 'ok' (safe) | 'miss' (skipped) | 'gone'
  const item = (x, y, w, name, kind) => {
    const fill = { here: P.tint, bad: P.dangerT, ok: P.okT, miss: P.dangerT, gone: P.paper2 }[kind] || P.warnT;
    const edge = kind === 'miss' || kind === 'gone' ? P.danger : P.ink;
    const body = kind === 'miss' || kind === 'gone'
      ? `<rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${fill}" stroke="${edge}" stroke-width="2.5" stroke-dasharray="6 5"/>`
      : `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="44" rx="10" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${fill}" stroke="${edge}" stroke-width="2.5"/>`;
    return body + T(x + w / 2, y + 28, name, { s: 13.5, f: kind === 'miss' || kind === 'gone' ? P.danger : P.ink });
  };
  const finger = (x, y) => `<path d="M${x} ${y} l-9 -16 h18 z" fill="${P.accent}" stroke="${P.ink}" stroke-width="2" stroke-linejoin="round"/>`;
  const spotNos = (y, n) => Array.from({ length: n }, (_, k) => T(76 + k * 112, y, String(k), { s: 13, m: true, f: P.accent })).join('');

  const ideaPic = svg(600, 260, 'The basket as five items in a row: oats, pasta, rye bread, rice, tofu. A pointer moves along the row. Under each item, the loop variable item holds that item in turn: first oats, then pasta, and so on, until tofu.',
    T(26, 24, 'for item in basket:', { s: 16, m: true, a: 'start', f: P.accent }) +
    T(574, 24, 'one item at a time', { s: 13, w: 700, a: 'end', f: P.ink2 }) +
    ITEMS.map((s, i) => item(26 + i * 112, 60, 100, s, i === 2 ? 'here' : 'on')).join('') +
    finger(300, 54) +
    ITEMS.map((s, i) => box(26 + i * 112, 136, 100, 46, i === 2 ? P.tint : P.white, 10) +
      T(76 + i * 112, 154, 'round ' + (i + 1), { s: 11, w: 700, f: P.ink2 }) +
      T(76 + i * 112, 174, `"${s}"`, { s: 11.5, m: true, f: P.accent })).join('') +
    ITEMS.map((s, i) => arrow(76 + i * 112, 108, 76 + i * 112, 132, P.mute, 2)).join('') +
    T(300, 216, 'item holds each thing in the basket, in order.', { s: 13.5, w: 700, f: P.ink2 }) +
    T(300, 240, 'No position numbers needed.', { s: 13.5, f: P.ok }));

  const chloe = [
    'basket = ["oats", "pasta", "rye bread", "rice", "tofu"]',
    'gluten = ["pasta", "rye bread", "couscous", "flour"]',
    '',
    'safe_for_chloe = []                  # a new, empty list',
    'for item in basket:',
    '    if item in gluten:',
    '        print(f"{item}: gluten, not for Chloe")',
    '    else:',
    '        safe_for_chloe.append(item)  # keep it',
    '',
    'print(safe_for_chloe)',
    'print(f"{len(safe_for_chloe)} of {len(basket)} items are safe")'
  ];
  const ben = [
    "# Ben's protein from the basket, grams per portion",
    'protein_g = [20, 18, 13, 10]',
    '',
    'total = 0',
    'for grams in protein_g:',
    '    total += grams',
    '    print(f"+{grams} g, running total {total} g")',
    '',
    'print(f"Ben gets {total} g. sum() agrees: {sum(protein_g)} g")'
  ];
  const find = [
    'basket = ["oats", "pasta", "rye bread", "rice", "tofu"]',
    'gluten = ["pasta", "rye bread", "couscous", "flour"]',
    '',
    'print("tofu" in basket)      # one item? in needs no loop',
    '',
    'has_gluten = False           # a flag, lesson 28',
    'for item in basket:',
    '    if item in gluten:',
    '        has_gluten = True',
    '        break                # one is enough, stop looking',
    'print(has_gluten)'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(chloe, { title: 'chloe_safe.py' })}` +
    run(ben, { title: 'ben_protein.py' }) +
    code(find, { title: 'find.py' }) + term(['$ python3 find.py', 'True', 'True'], 'terminal') + `</div>`;

  const offByOne = [
    'basket = ["oats", "pasta", "rye bread", "rice", "tofu"]',
    '',
    '# "the last index is len - 1", so...',
    'for i in range(len(basket) - 1):',
    '    print(f"Checking {basket[i]}")'
  ];
  const removeBug = [
    'basket = ["oats", "pasta", "rye bread", "rice", "tofu"]',
    'gluten = ["pasta", "rye bread", "couscous", "flour"]',
    '',
    'for item in basket:',
    '    print(f"Checking {item}")',
    '    if item in gluten:',
    '        basket.remove(item)     # cut it out of the basket',
    '',
    'print(basket)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(offByOne, { title: 'check_all.py', bad: [4] }) +
    term(['$ python3 check_all.py', 'Checking oats', 'Checking pasta', 'Checking rye bread', 'Checking rice', '# tofu was never checked. No error.'], 'terminal') +
    svg(600, 266, 'Round 2: the loop is on spot 1, pasta, and removes it. Everything after it slides up one spot, so rye bread moves into spot 1. Round 3: the loop moves on to spot 2, which now holds rice. Rye bread is never checked.',
      T(26, 22, 'Round 2: the loop is on spot 1, and removes pasta', { s: 13.5, a: 'start', f: P.ink }) +
      spotNos(46, 5) +
      ITEMS.map((s, i) => item(26 + i * 112, 56, 100, s, i === 1 ? 'bad' : 'on')).join('') +
      finger(188, 52) +
      [2, 3, 4].map(i => arrow(56 + i * 112, 106, 56 + (i - 1) * 112 + 24, 126, P.mute, 2)).join('') +
      T(26, 150, 'Round 3: everything slid up. The loop moves on to spot 2', { s: 13.5, a: 'start', f: P.ink }) +
      spotNos(176, 5) +
      ['oats', 'rye bread', 'rice', 'tofu'].map((s, i) => item(26 + i * 112, 186, 100, s, i === 1 ? 'miss' : i === 2 ? 'here' : 'on')).join('') +
      finger(300, 182) +
      T(188, 254, 'never checked', { s: 13, f: P.danger }) +
      T(474, 254, 'spot 4 is empty: the loop ends', { s: 12.5, w: 700, f: P.ink2 })) +
    code(removeBug, { title: 'unpack.py', bad: [7] }) +
    term(['$ python3 unpack.py', 'Checking oats', 'Checking pasta', 'Checking rice', 'Checking tofu', "['oats', 'rye bread', 'rice', 'tofu']"], 'terminal') + `</div>`;

  const copyWay = [
    'basket = ["oats", "pasta", "rye bread", "rice", "tofu"]',
    'gluten = ["pasta", "rye bread", "couscous", "flour"]',
    '',
    'for item in basket[:]:          # loop over a copy (lesson 33)',
    '    if item in gluten:',
    '        basket.remove(item)     # cut from the real basket',
    '',
    'print(basket)'
  ];
  const fixPic = `<div style="width:100%;min-width:0">` +
    svg(600, 150, 'The basket stays as it was, five items. Next to it, a new paper list called safe gets oats, rice and tofu.',
      T(26, 22, 'basket: left alone', { s: 13.5, a: 'start', f: P.ink }) +
      ITEMS.map((s, i) => item(26 + i * 112, 34, 100, s, i === 1 || i === 2 ? 'bad' : 'ok')).join('') +
      T(26, 112, 'safe = []  then  safe.append(item)', { s: 13.5, m: true, a: 'start', f: P.ok }) +
      box(330, 92, 244, 50, P.white, 10) +
      ['oats', 'rice', 'tofu'].map((s, i) => T(372 + i * 80, 123, s, { s: 13.5, f: P.ok })).join('')) +
    run(removeBug, { title: 'unpack.py' }) +
    code(copyWay, { title: 'unpack_copy.py', good: [4] }) +
    term(['$ python3 unpack_copy.py', "['oats', 'rice', 'tofu']"], 'terminal') + `</div>`;

  const tryIt = [
    'basket = ["oats", "pasta", "rye bread", "rice", "tofu"]',
    'gluten = ["pasta", "rye bread", "couscous", "flour", "barley"]',
    '',
    'safe_for_chloe = []',
    'for item in basket:',
    '    if item in gluten:',
    '        print(f"{item}: gluten, not for Chloe")',
    '    else:',
    '        safe_for_chloe.append(item)',
    '',
    'print(f"Chloe can have: {safe_for_chloe}")'
  ];

  const exact = [
    'gluten = ["pasta", "rye bread", "couscous", "flour", "barley"]',
    '',
    'print("bread" in gluten)            # whole items only',
    'print("bread" in "rye bread")       # inside text: a piece is fine',
    'print("Rye bread" in gluten)        # capitals count',
    'print("Rye bread".lower() in gluten)'
  ];
  const copyVar = [
    'basket = ["oats", "pasta", "rice"]',
    'for item in basket:',
    '    item = item.upper()     # changes the jar called item...',
    'print(basket)               # ...not the basket',
    '',
    'shout = []',
    'for item in basket:',
    '    shout.append(item.upper())',
    'print(shout)'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(exact, { title: 'exact.py' })}` +
    run(copyVar, { title: 'shout.py' }) + `</div>`;

  COURSE.add({
    id: 'l35', minutes: 12,
    summary: '<code>for item in basket:</code> hands you <b>every item</b> of a list, in order, with no position numbers. Three patterns cover most jobs: a <b>running total</b>, a <b>new list</b> built with <code>.append()</code>, and a <b>search</b> with <code>in</code> or a flag. Two traps: <code>range(len(...))</code> invites an <b>off-by-one</b>, and <b>removing items while you loop</b> over the same list makes the loop <b>skip</b> the next one. Build a new list instead, or loop over a copy, <code>basket[:]</code>.',
    video: {
      src: 'videos/l35-looping-over-lists.mp4', poster: 'videos/l35-looping-over-lists.jpg', length: '1 min 5 s',
      script: [
        'You are back from the shop, with 5 things in the basket. Chloe eats no gluten, so you check every item.',
        'Write: for item in basket. The loop hands you one item at a time. Oats. Pasta. Rye bread. Rice. Tofu.',
        'Now the trap. You find the pasta, and you remove it from the basket, inside the loop. Everything after it slides up one spot. Rye bread lands where the pasta was. But the loop has already moved on, to the next spot. Rye bread is never checked, so it stays in the basket.',
        'No error. Just bread, for Chloe.',
        'The fix: leave the basket alone. Start a new, empty list on paper. For each item with no gluten, append it. Oats, rice, tofu. Every item checked. Nothing skipped.',
        'Must you remove from the basket? Loop over a copy, made with a slice, and remove from the real one.',
        'Loop over the items. Build a new list instead of cutting the old one.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Check every item in the basket.',
        text: [
          'You are back from the shop. Before you cook, you unpack the basket and look at <b>every item</b>. Chloe eats no gluten, so each one gets the same question: is it safe for her?',
          'In Python the basket is a list, and the question is a <code>for</code> loop. You met <code>for</code> in lesson 26, serving each guest at the table. A list works the same way: <code>for item in basket:</code> runs the block once for <b>each item</b>, and <code>item</code> holds that item in turn.',
          'Notice what is <b>not</b> there: no position numbers, no <code>[0]</code>, no counting. The loop walks the list for you, from the first item to the last, and never misses one.'
        ],
        tip: 'Plural for the list, singular for one item: <code>for item in basket</code>, <code>for dish in menu</code>, <code>for grams in protein_g</code>. Read it out loud and it says what it does.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Three jobs: build, total, find.',
        text: [
          '<b>Build a new list.</b> <code>chloe_safe.py</code> starts an empty list, <code>safe_for_chloe = []</code>. For each item it asks <code>item in gluten</code>. Gluten gets a warning line, anything else is added with <code>.append()</code>. Press <b>Run</b>: <code>[\'oats\', \'rice\', \'tofu\']</code> and <code>3 of 5 items are safe</code>. The basket itself never changes.',
          '<b>Keep a running total.</b> <code>ben_protein.py</code> is the accumulator from lesson 26: <code>total = 0</code> before the loop, <code>total += grams</code> inside. Run it and watch the total grow: 20, 38, 51, 61. When all you want is the final number, <code>sum()</code> from lesson 31 does it in one go. The loop earns its place when you need each step, or a condition, like "only the items over 15 g".',
          '<b>Find something.</b> To ask about <b>one</b> item, use <code>in</code>: <code>"tofu" in basket</code> needs no loop. To ask "is <b>any</b> item gluten?", loop with a flag, the True or False jar from lesson 28, and <code>break</code> as soon as you know.'
        ],
        tip: 'Change <code>chloe_safe.py</code>: add <code>"couscous"</code> to the basket and run it again. Before you press Run, say what the last line will be. (It is <code>3 of 6 items are safe</code>.)'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Tofu is missed. Rye bread sneaks through.',
        text: [
          '<b>Pain 1: counting positions yourself.</b> Lesson 32 said the last index is <code>len(basket) - 1</code>. So you write <code>range(len(basket) - 1)</code>. But <code>range</code> never includes its stop (lesson 27), so it gives 0 to 3, and tofu at position 4 is <b>never checked</b>. No error, just one item short.',
          '<b>Pain 2: cutting the list while you walk it.</b> You loop over the basket and <code>.remove()</code> each gluten item, the tool from lesson 34. The loop keeps its place by <b>spot number</b>. In round 2 it is on spot 1, pasta, and removes it. Everything after it slides up one spot, so rye bread is now in spot 1. Round 3 goes to spot 2, which now holds <b>rice</b>.',
          'Look at the terminal: <code>Checking rye bread</code> never appears. Rye bread was never looked at, so it is still in the basket, and Chloe gets bread. No error, no warning.'
        ],
        warn: 'Removing from a list while a <code>for</code> loop walks over that same list <b>skips the item right after each one you remove</b>. It only shows when two removals sit side by side, so it can hide for weeks.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Leave the basket alone. Build a new list.',
        text: [
          '<b>Fix 1: loop over the items themselves.</b> <code>for item in basket:</code> visits every item, the first and the last included. There is no stop number to get wrong.',
          '<b>Fix 2: build a new list instead of cutting the old one.</b> Start <code>safe = []</code>, and <code>.append()</code> each item that passes. The basket is never touched while you walk it, so nothing slides and nothing is skipped. As a bonus you keep both lists: what you bought and what Chloe can eat.',
          'Try it in <code>unpack.py</code> above: change it so it builds <code>safe</code> and prints <code>[\'oats\', \'rice\', \'tofu\']</code>. Then <code>Checking rye bread</code> shows up too.',
          'Must the basket itself change? Then loop over a <b>copy</b>. <code>basket[:]</code> is the slice from lesson 33 that copies the whole list. The loop walks the copy, which never changes, and <code>.remove()</code> cuts from the real basket.'
        ],
        tip: 'A quick test: inside a <code>for</code> loop, is there a line that changes the list you are looping over (<code>.remove()</code>, <code>.pop()</code>, <code>.insert()</code>)? Then build a new list, or loop over a copy.'
      },
      {
        label: 'Try it', pic: run(tryIt, { title: 'chloe_check.py' }),
        h: 'Unpack a new basket.',
        text: [
          'Press <b>Run</b>. Then make these changes, one at a time, and say what you expect before each Run.',
          '1. Add <code>"barley"</code> and <code>"eggs"</code> to the basket. Barley has gluten. Eggs do not.',
          '2. Add a second new list, <code>gluten_items = []</code>, and append the gluten items to it in the <code>if</code> branch. Print it at the end.',
          '3. Count: print <code>f"{len(safe_for_chloe)} safe, {len(gluten_items)} not"</code>. The two numbers should add up to <code>len(basket)</code>.',
          '4. Now add <code>"flour tortillas"</code> to the basket and run it. Does Chloe get them? Read The catch below to see why.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'in checks whole items, and item is only a copy.',
        text: [
          '<b>On a list, <code>in</code> looks for a whole item, exactly.</b> <code>"bread" in gluten</code> is <code>False</code>, because no item is exactly <code>"bread"</code>. On text, <code>in</code> looks for a piece: <code>"bread" in "rye bread"</code> is <code>True</code>. Capitals count too: <code>"Rye bread"</code> is not <code>"rye bread"</code>. Tidy the text first with <code>.lower()</code> from lesson 9. So <code>"flour tortillas"</code> slips past a list that only says <code>"flour"</code>. Real labels need a careful list.',
          '<b>The loop variable is a copy</b>, as lesson 26 showed. <code>item = item.upper()</code> changes the jar called <code>item</code>, never the basket. Run <code>shout.py</code>: the basket is still lowercase. To get changed items, build a new list again: <code>shout.append(item.upper())</code>.',
          '<b>Sometimes you do need the position</b>, for example to print "1. oats, 2. pasta". Python has a tool for that: <code>for i, item in enumerate(basket):</code> hands you the position and the item together. Lesson 77, enumerate and zip, explains it fully. Until then, loop over the items.'
        ],
        tip: 'Later, lesson 76, Comprehensions, shows a one-line way to write "start a new list, loop, append". The loop you wrote today is what that line means, so learn this one first.'
      }
    ],
    exercises: [
      {
        file: 'l35_check_the_basket.py', title: 'Check the basket',
        task: 'Check <b>every item</b> in the basket. Print one <code>Gluten: ...</code> line for each gluten item, then Chloe\'s <b>safe list</b> and a <b>count</b> like <code>4 of 7 items are safe</code>. The starter code has the remove-while-looping bug. Fix it by building a <b>new list</b>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'Run the starter first. Look at what it prints: one gluten item is missing. Then fix the lines between <code>START</code> and <code>END</code>, and save.',
          'Run it again. The check runs your lines a second time with another basket, and makes sure the basket was never changed. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['basket = ["pasta", "rye bread", "rice"]', 'gluten = ["pasta", "rye bread", "flour"]', 'for item in basket:', '    if item in gluten:', '        basket.remove(item)', 'print(basket)'], { title: 'unpack.py' }),
        options: ["['rye bread', 'rice']", "['rice']", "['pasta', 'rice']", 'IndexError'],
        answer: 0,
        why: 'Round 1 is on spot 0, pasta, and removes it. Rye bread slides into spot 0. Round 2 goes to spot 1, which is now rice. Rye bread is never checked, so it stays.',
        hint: 'After pasta is removed, what sits in spot 0, and which spot does the loop look at next?'
      },
      {
        type: 'fix', q: 'This loop never checks tofu. Fix it so every item is checked, one <code>Checking ...</code> line each.',
        code: ['basket = ["oats", "pasta", "rye bread", "rice", "tofu"]', 'for i in range(len(basket) - 1):', '    print(f"Checking {basket[i]}")'],
        title: 'check_all.py',
        check: [
          'lines = out.strip().splitlines()',
          'want = ["Checking oats", "Checking pasta", "Checking rye bread", "Checking rice", "Checking tofu"]',
          'if lines == want and basket == ["oats", "pasta", "rye bread", "rice", "tofu"]:',
          '    ok = True',
          'elif lines == want:',
          '    msg = "Keep the basket as it was. Change only the loop."',
          'elif lines == want[:4]:',
          '    msg = "Still 4 lines. range never includes its stop. Easier: loop over the items, for item in basket."',
          'else:',
          '    msg = "It printed " + str(len(lines)) + " lines. You want 5, from Checking oats to Checking tofu."'
        ].join('\n'),
        why: '<code>for item in basket:</code> with <code>print(f"Checking {item}")</code> visits every item, and there is no stop number to get wrong. (<code>range(len(basket))</code> also works, but it is longer and easier to break.)',
        hint: 'Do you need the position at all? Loop over the items themselves.'
      },
      {
        type: 'fix', q: 'Rye bread sneaks into Chloe\'s food. Fix the code so it prints <code>[\'oats\', \'rice\', \'tofu\']</code>.',
        code: ['basket = ["oats", "pasta", "rye bread", "rice", "tofu"]', 'gluten = ["pasta", "rye bread", "flour"]', '', 'for item in basket:', '    if item in gluten:', '        basket.remove(item)', '', 'print(basket)'],
        title: 'unpack.py',
        check: [
          'got = out.strip()',
          'if got == "[\'oats\', \'rice\', \'tofu\']":',
          '    ok = True',
          'elif got == "[\'oats\', \'rye bread\', \'rice\', \'tofu\']":',
          '    msg = "Rye bread is still there: the loop skipped it. Build a new list with append, or loop over a copy, basket[:]."',
          'else:',
          '    msg = "It printed " + got + ". You want [\'oats\', \'rice\', \'tofu\']."'
        ].join('\n'),
        why: 'Either build a new list (<code>safe = []</code>, append each item <code>not in gluten</code>, print <code>safe</code>) or loop over a copy with <code>for item in basket[:]:</code>. Both stop the loop from skipping.',
        hint: 'Never cut the list you are walking. Start safe = [] before the loop, or loop over basket[:].'
      },
      {
        type: 'fill', q: 'Add up Ben\'s protein with a running total. Fill the blanks.',
        text: 'protein_g = [20, 18, 13, 10]\ntotal = ___\nfor grams in protein_g:\n    total ___ grams\nprint(total)',
        options: ['0', '+=', '=', 'None', '1'],
        answer: ['0', '+='],
        why: 'Start the total at <code>0</code> before the loop, add each item with <code>+=</code> inside it. With <code>=</code> the total would just be the last item, 10.',
        hint: 'What should the total be before you have added anything? And which sign adds to what is already in the jar?'
      },
      {
        type: 'bucket', q: 'Does this job need you to write a <code>for</code> loop, or does one tool already do it?',
        buckets: ['Write a for loop', 'One tool does it'],
        items: [
          ['A new list of the items with no gluten', 0],
          ['Print a warning for each gluten item', 0],
          ['Is "tofu" in the basket?', 1],
          ['How many items are in the basket?', 1],
          ['The total of a list of grams', 1],
          ['The biggest number on a list', 1]
        ],
        why: '<code>in</code>, <code>len()</code>, <code>sum()</code> and <code>max()</code> (lessons 31 and 7) each do one whole-list job. Anything that looks at each item and does something different with it needs a loop.',
        hint: 'Is there a single word you already know that does it: in, len, sum, max?'
      },
      {
        type: 'pick', q: 'Back to lesson 28. What does this print?',
        pic: code(['basket = ["oats", "pasta", "rice"]', 'found = False', 'for item in basket:', '    if item == "pasta":', '        found = True', '        break', '    print(item)', 'print(found)'], { title: 'find.py' }),
        options: ['oats, then True', 'oats, pasta, rice, then True', 'oats, rice, then True', 'oats, then False'],
        answer: 0,
        why: 'Round 1 prints <code>oats</code>. Round 2 finds pasta, sets the flag and <code>break</code> leaves the loop at once, before the print. Rice is never reached. Then <code>True</code>.',
        hint: 'break leaves the loop right away. Does the print under it still run in that round?'
      },
      {
        type: 'type', q: 'Type the first line of a loop that hands you each item of the list <code>basket</code>, one at a time, in a variable called <code>item</code>.',
        prompt: '>>>',
        answers: ['for item in basket:'],
        why: '<code>for</code>, the name for one item, <code>in</code>, the list, and a colon. No range, no positions.',
        hint: 'Lesson 26: for, a name, in, the things, and a colon.'
      },
      {
        type: 'pick', q: 'What does <code>print("bread" in ["rye bread", "oats"])</code> show?',
        options: ['False', 'True', 'rye bread', 'TypeError'],
        answer: 0,
        why: 'On a list, <code>in</code> checks for a <b>whole item</b>. No item is exactly <code>"bread"</code>. (<code>"bread" in "rye bread"</code>, on text, would be True.)',
        hint: 'Is "bread" one of the items, exactly as written?'
      }
    ]
  });
})();
