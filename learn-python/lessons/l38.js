/* Lesson 38: Working with dictionaries (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l38  Working with dictionaries
     ===================================================================== */

  // One pantry jar, drawn from the shelf up. grams fill it (1000 g is full).
  // kind: 'ok' | 'low' (under 200 g) | 'ghost' (no such key) | 'here' (the loop is on it)
  const jar = (x, y, w, h, name, grams, kind) => {
    if (kind === 'ghost') {
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${P.paper2}" stroke="${P.mute}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
        `<rect x="${x + 14}" y="${y - 14}" width="${w - 28}" height="12" rx="4" fill="none" stroke="${P.mute}" stroke-width="2.5" stroke-dasharray="5 5"/>` +
        T(x + w / 2, y + h / 2 + 6, '?', { s: 26, f: P.mute }) +
        T(x + w / 2, y + h + 24, name, { s: 13.5, f: P.mute }) +
        T(x + w / 2, y + h + 44, 'no jar', { s: 12.5, w: 700, f: P.mute });
    }
    const fillH = Math.round((h - 10) * Math.min(grams, 1000) / 1000);
    const fill = kind === 'low' ? P.dangerT : P.warnT;
    return `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="14" fill="${P.ink}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${kind === 'here' ? P.tint : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      (fillH ? `<rect x="${x + 5}" y="${y + h - 5 - fillH}" width="${w - 10}" height="${fillH}" rx="9" fill="${fill}"/>` : '') +
      `<rect x="${x + 14}" y="${y - 14}" width="${w - 28}" height="12" rx="4" fill="${P.ink}"/>` +
      T(x + w / 2, y + h + 24, name, { s: 13.5 }) +
      T(x + w / 2, y + h + 44, grams + ' g', { s: 13, m: true, f: kind === 'low' ? P.danger : P.accent });
  };
  const shelf = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="8" rx="3" fill="${P.ink}"/>`;

  const ideaPic = svg(600, 300, 'A pantry shelf with four jars: rice 900 g, oats 400 g, lentils 0 g and pasta 150 g, each filled to its level. A fifth, dashed jar for quinoa is missing. pantry.get of quinoa with a default of 0 hands back 0 instead of an error.',
    T(20, 26, 'pantry = {item: grams left}', { s: 15, m: true, a: 'start', f: P.accent }) +
    [['rice', 900, 'ok'], ['oats', 400, 'ok'], ['lentils', 0, 'low'], ['pasta', 150, 'low']].map(([n, g, k], i) => jar(20 + i * 104, 64, 84, 140, n, g, k)).join('') +
    shelf(12, 208, 420) +
    jar(470, 64, 84, 140, 'quinoa', 0, 'ghost') +
    box(446, 0, 140, 40, P.okT, 10) + T(516, 25, '.get → 0', { s: 14, m: true, f: P.ok }) +
    arrow(512, 42, 512, 50, P.ok, 2.5) +
    T(300, 290, 'Key: the label on the jar. Value: the grams left inside.', { s: 13.5, w: 700, f: P.ink2 }));

  const pantryCode = [
    'pantry = {"rice": 900, "oats": 400, "lentils": 0, "pasta": 150}',
    '',
    '# 1. Look up a jar that may not be there',
    'print(pantry.get("quinoa", 0))    # no quinoa jar: you get the 0',
    'print(pantry.get("oats", 0))      # a real jar: you get what is in it',
    'print("rice" in pantry)           # in asks about keys...',
    'print(900 in pantry)              # ...never about values',
    '',
    '# 2. Use some up: Ana\'s carb dinner',
    'pantry["rice"] -= 150',
    'print(pantry["rice"])'
  ];
  const shopping = [
    'pantry = {"rice": 750, "oats": 400, "lentils": 0, "pasta": 150}',
    '',
    'print("Shopping list:")',
    'for item, grams in pantry.items():',
    '    if grams < 200:',
    '        print(f"- {item} ({grams} g left)")',
    '',
    'print(f"{len(pantry)} jars, {sum(pantry.values())} g in all")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(pantryCode, { title: 'pantry.py' })}` +
    run(shopping, { title: 'shopping.py' }) + `</div>`;

  const countsBug = [
    'meals = ["oats", "rice", "oats", "tofu"]',
    '',
    'counts = {}',
    'for food in meals:',
    '    counts[food] += 1    # one more tally for this food',
    '',
    'print(counts)'
  ];
  const tidyBug = [
    'pantry = {"rice": 750, "oats": 400, "lentils": 0, "pasta": 150}',
    '',
    'for item, grams in pantry.items():',
    '    if grams == 0:',
    '        del pantry[item]    # take the empty jar off the shelf',
    '',
    'print(pantry)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    svg(600, 150, 'A tally card called counts is empty. The first meal, oats, tries to add one more tally, but there is no oats tally to add to, so Python stops with KeyError oats.',
      T(20, 24, 'Monday: oats. One more tally for oats...', { s: 14, a: 'start' }) +
      box(20, 44, 220, 86, P.white, 14) + T(130, 72, 'counts', { s: 14, m: true, f: P.accent }) +
      T(130, 108, '{ }  empty', { s: 15, m: true, f: P.ink2 }) +
      box(300, 58, 120, 50, P.tint, 12) + T(360, 89, 'oats + 1', { s: 15, m: true, f: P.accent }) +
      arrow(296, 83, 250, 83, P.danger, 3) +
      box(440, 54, 146, 58, P.dangerT, 12) + T(513, 80, "KeyError:", { s: 13.5, m: true, f: P.danger }) + T(513, 100, "'oats'", { s: 13.5, m: true, f: P.danger }) +
      T(300, 146, 'oats + 1 needs an oats number first. There is none.', { s: 13, w: 700, f: P.ink2 })) +
    code(countsBug, { title: 'counts.py', bad: [5] }) +
    term(['$ python3 counts.py', 'Traceback (most recent call last):', '  File "counts.py", line 5, in <module>', '    counts[food] += 1    # one more tally for this food', '    ~~~~~~^^^^^^', "KeyError: 'oats'"], 'terminal') +
    code(tidyBug, { title: 'tidy.py', bad: [5] }) +
    term(['$ python3 tidy.py', 'Traceback (most recent call last):', '  File "tidy.py", line 3, in <module>', '    for item, grams in pantry.items():', '                       ~~~~~~~~~~~~^^', 'RuntimeError: dictionary changed size during iteration'], 'terminal') + `</div>`;

  const countsFix = [
    'meals = ["oats", "rice", "oats", "tofu"]',
    '',
    'counts = {}',
    'for food in meals:',
    '    counts[food] = counts.get(food, 0) + 1   # no tally yet? start at 0',
    '',
    'print(counts)'
  ];
  const tidyFix = [
    'pantry = {"rice": 750, "oats": 400, "lentils": 0, "pasta": 150}',
    '',
    'empty = []                       # 1. write the names down',
    'for item, grams in pantry.items():',
    '    if grams == 0:',
    '        empty.append(item)',
    '',
    'for item in empty:               # 2. then clear the shelf',
    '    del pantry[item]',
    'print(pantry)',
    '',
    'used = pantry.pop("pasta")       # take it off AND hand it back',
    'print(f"Cooked all {used} g of pasta")',
    'print(pantry)'
  ];
  const tidyCopy = [
    'pantry = {"rice": 750, "oats": 400, "lentils": 0, "pasta": 150}',
    '',
    'for item in list(pantry):        # loop over a copy of the keys',
    '    if pantry[item] == 0:',
    '        del pantry[item]         # change the real pantry',
    '',
    'print(pantry)'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(countsFix, { title: 'counts.py' })}` +
    run(tidyFix, { title: 'tidy.py' }) +
    code(tidyCopy, { title: 'tidy_copy.py', good: [3] }) +
    term(['$ python3 tidy_copy.py', "{'rice': 750, 'oats': 400, 'pasta': 150}"], 'terminal') + `</div>`;

  const week = [
    'meals = ["oats", "rice", "oats", "tofu", "rice", "oats"]',
    '',
    'counts = {}',
    'for food in meals:',
    '    counts[food] = counts.get(food, 0) + 1',
    '',
    'for food, times in counts.items():',
    '    print(f"{food}: {\'|\' * times}")'
  ];

  const catchCode = [
    'pantry = {"rice": 750, "lentils": 0}',
    '',
    'print(pantry.get("quinoa"))       # no default: None (lesson 16)',
    'print(pantry.get("quinoa", 0))',
    'print("quinoa" in pantry)         # get never adds the key',
    '',
    'if pantry.get("lentils"):',
    '    print("We have lentils")',
    'else:',
    '    print("No lentils?")          # 0 counts as no (lesson 23)',
    'print("lentils" in pantry)        # the jar IS there, just empty'
  ];

  COURSE.add({
    id: 'l38', minutes: 13,
    video: {
      src: 'videos/l38-working-with-dictionaries.mp4', poster: 'videos/l38-working-with-dictionaries.jpg', length: '1 min 18 s',
      script: [
        'Your pantry is a dictionary. Each jar is a key, and the grams left are its value. Rice, 900. Oats, 400. Lentils, 0. Pasta, 150.',
        'Ben asks for quinoa. No quinoa jar. Square brackets would crash with a key error. Use get instead. Pantry dot get, quinoa, comma, 0. No jar? You get the 0.',
        'Ana wants a carb dinner. Rice, minus equals 150. The rice jar drops to 750.',
        'Now the shopping list. For item, grams, in pantry dot items. Each round hands you a label and its grams. Under 200? Write it down. Lentils. Pasta.',
        'Now count this week\'s meals. Counts, food, plus equals 1. Key error, on the very first oats. There is no oats tally yet.',
        'The fix. Counts, food, equals counts dot get, food, 0, plus 1. Missing means 0. Oats, 2. Rice, 1. Tofu, 1.',
        'Use get for maybe-missing keys, and items to walk the whole pantry.'
      ]
    },
    summary: '<code>pantry.get("quinoa", 0)</code> looks up a key that <b>may be missing</b> and hands back the default instead of a <code>KeyError</code>. <code>in</code> asks about <b>keys</b>, never values. <code>pantry["rice"] -= 150</code> updates a value. <code>for item, grams in pantry.items():</code> walks <b>every key with its value</b>, and <code>.keys()</code> and <code>.values()</code> give one side. <code>del</code> and <code>.pop()</code> take a key out. To count things, write <code>counts[food] = counts.get(food, 0) + 1</code>. And never add or remove keys while you loop over the same dictionary.',
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Look up, use up, check the whole shelf.',
        text: [
          'Your pantry is a dictionary, like the spice rack in lesson 37. Each <b>key</b> is the label on a jar, and each <b>value</b> is the grams left inside: <code>{"rice": 900, "oats": 400, "lentils": 0, "pasta": 150}</code>.',
          'A real pantry gets three kinds of use. You <b>look up</b> a jar, and sometimes it is not there. You <b>use some up</b> when you cook. And once a week you <b>check every jar</b> to write the shopping list.',
          'Lesson 37 gave you <code>pantry["rice"]</code> and showed that a missing key stops with <code>KeyError</code>. Today you get the tools for the rest: <code>.get()</code>, <code>in</code>, <code>.items()</code>, <code>del</code> and <code>.pop()</code>.'
        ],
        tip: 'Ben asks for quinoa. You have no quinoa jar. A person says "zero, we have none". <code>.get("quinoa", 0)</code> lets Python say the same.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'get, in, a change, and a loop over items.',
        text: [
          '<b>Look up a maybe-missing key.</b> <code>pantry.get("quinoa", 0)</code> means "the value for quinoa, or <b>0</b> if there is no such key". No crash. When the key is there, the default is ignored: <code>pantry.get("oats", 0)</code> is <code>400</code>.',
          '<b>Ask if a key is there.</b> <code>"rice" in pantry</code> is <code>True</code>. But <code>900 in pantry</code> is <code>False</code>, even though one jar holds 900 g. On a dictionary, <code>in</code> looks at the <b>keys only</b>.',
          '<b>Use some up.</b> Ana\'s carb dinner takes 150 g of rice. <code>pantry["rice"] -= 150</code> reads the old value, takes 150 off and stores the new one, exactly like <code>-=</code> on a jar in lesson 11. Run <code>pantry.py</code>: the rice drops to <code>750</code>.',
          '<b>Check every jar.</b> <code>pantry.items()</code> hands the loop one <b>(key, value)</b> pair per round, as a tuple. <code>for item, grams in ...</code> unpacks each pair into two jars, the small step from lesson 36. Run <code>shopping.py</code>: lentils and pasta are under 200 g. Now change <code>200</code> to <code>500</code> and run it again. Before you press Run, say which jar joins the list.'
        ],
        tip: '<code>.values()</code> gives only the values, so <code>sum(pantry.values())</code> adds up all the grams. <code>.keys()</code> gives only the keys. A plain <code>for item in pantry:</code> also gives the keys, so you rarely need <code>.keys()</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The first tally crashes. The shelf moves under the loop.',
        text: [
          '<b>Pain 1: counting.</b> How many times did you eat each food this week? Start an empty dictionary, <code>counts = {}</code>, and add one for each meal: <code>counts[food] += 1</code>. It stops on the <b>very first</b> meal with <code>KeyError: \'oats\'</code>.',
          'Why? <code>counts[food] += 1</code> means <code>counts[food] = counts[food] + 1</code>. To add 1, Python first has to <b>read</b> <code>counts["oats"]</code>. The first time oats comes up, there is no oats key yet. Nothing to add 1 to.',
          '<b>Pain 2: removing jars while you check the shelf.</b> You loop over <code>pantry.items()</code> and <code>del</code> each empty jar. <code>del pantry["lentils"]</code> takes that key out of the dictionary. Python stops with <code>RuntimeError: dictionary changed size during iteration</code>.'
        ],
        warn: 'Lesson 35 had the same mistake with a list, and the list quietly <b>skipped</b> an item. A dictionary is stricter: it notices that its size changed and <b>stops</b> the program. That is good news. A loud error is far easier to fix than a quiet wrong answer.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'get with a 0, and write the names down first.',
        text: [
          '<b>Fix 1: start every count at 0.</b> <code>counts[food] = counts.get(food, 0) + 1</code>. The first time, <code>.get</code> finds no oats and hands back 0, so oats becomes 1. The next time it finds the 1, so oats becomes 2. Run <code>counts.py</code>: <code>{\'oats\': 2, \'rice\': 1, \'tofu\': 1}</code>.',
          '<b>Fix 2: never change the dictionary you are looping over.</b> First loop and <b>write down</b> the keys to remove in a new list, <code>empty</code>. Then loop over that list and <code>del</code> each one. Same rule as lesson 35: build something new instead of cutting what you walk.',
          '<code>.pop("pasta")</code> takes a key out too, and <b>hands back</b> its value, like the list <code>.pop()</code> in lesson 34. Use it when you still need the grams. Run <code>tidy.py</code> to see both.',
          'Or loop over a copy. <code>list(pantry)</code> calls the type like a tool, as <code>int()</code> did in lesson 13, and gives a new list of the keys. The loop walks the copy, and <code>del</code> changes the real pantry.'
        ],
        tip: 'Counting things is so common that Python has a ready-made counter, <code>collections.Counter</code>. You meet it in lesson 61, The standard library. The <code>.get(food, 0) + 1</code> line is what it does inside.'
      },
      {
        label: 'Try it', pic: run(week, { title: 'week.py' }),
        h: 'Count the week.',
        text: [
          'Press <b>Run</b>. Each food gets a row of tally marks. <code>\'|\' * times</code> repeats the text, as in lesson 8.',
          '1. Add <code>"lentils"</code> twice to <code>meals</code>. Before you run it, say where lentils will appear in the output. (Last: keys stay in the order they were first added, lesson 37.)',
          '2. Print only the foods you ate <b>more than once</b>: add the line <code>if times &gt; 1:</code> just above the print, and push the print 4 more spaces in.',
          '3. Break it on purpose: change line 5 back to <code>counts[food] += 1</code> and read the error. Then press Reset.'
        ]
      },
      {
        label: 'The catch', pic: run(catchCode, { title: 'catch.py' }),
        h: 'get without a default, and an empty jar is still a jar.',
        text: [
          '<b>Without a default, <code>.get</code> gives <code>None</code>.</b> <code>pantry.get("quinoa")</code> does not crash, but it hands back <code>None</code>, the empty jar from lesson 16. Do maths with it and you get a <code>TypeError</code> a few lines later. When you will count or add, give the default: <code>.get("quinoa", 0)</code>.',
          '<b><code>.get</code> only looks. It never adds the key.</b> After <code>pantry.get("quinoa", 0)</code>, <code>"quinoa" in pantry</code> is still <code>False</code>. To store a value, assign it: <code>pantry["quinoa"] = 500</code>.',
          '<b>An empty jar is still a jar.</b> <code>if pantry.get("lentils"):</code> says "No lentils?", because <code>0</code> counts as no (lesson 23). A missing jar and an empty jar look the same. Ask the question you mean: <code>"lentils" in pantry</code> for "do we stock it?", and <code>pantry["lentils"] == 0</code> for "is it empty?". Press <b>Run</b> and read each line.'
        ],
        warn: '<code>del pantry["quinoa"]</code> and <code>pantry.pop("quinoa")</code> on a missing key stop with <code>KeyError: \'quinoa\'</code>, just like <code>pantry["quinoa"]</code>. Check with <code>in</code> first, or give <code>.pop</code> a default: <code>pantry.pop("quinoa", 0)</code>.'
      }
    ],
    exercises: [
      {
        file: 'l38_pantry_count.py', title: 'Count the week, check the pantry',
        task: 'Count how many times each food was eaten this week with <code>.get()</code>, then walk the pantry with <code>.items()</code> and list every jar <b>under the limit</b>. The starter has the <code>counts[food] += 1</code> bug, so it stops with a <code>KeyError</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'Run it first and read the hint. Then fix the lines between <code>START</code> and <code>END</code>: one line for the count, and a loop over <code>pantry.items()</code> for the shopping part. Save the file.',
          'Run it again. The check also runs your lines with another week, another pantry and another limit. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['pantry = {"rice": 900, "oats": 400}', 'print(pantry.get("quinoa", 0))', 'print(pantry.get("oats", 0))'], { title: 'get.py' }),
        options: ['0, then 400', 'KeyError: \'quinoa\'', 'None, then 400', '0, then 0'],
        answer: 0,
        why: 'No quinoa key, so <code>.get</code> hands back the default, <code>0</code>. Oats is there, so the default is ignored and you get its value, <code>400</code>.',
        hint: 'The default is only used when the key is missing.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['pantry = {"rice": 900, "oats": 400}', 'print(400 in pantry)', 'print("oats" in pantry)'], { title: 'in.py' }),
        options: ['False, then True', 'True, then True', 'True, then False', 'KeyError: 400'],
        answer: 0,
        why: 'On a dictionary, <code>in</code> checks the <b>keys</b>. <code>400</code> is a value, not a key, so it is <code>False</code>. To search the values, write <code>400 in pantry.values()</code>.',
        hint: 'Does in look at the labels or at what is inside the jars?'
      },
      {
        type: 'fix', q: 'This stops with <code>KeyError: \'oats\'</code> on the first meal. Fix line 5 so it prints <code>{\'oats\': 2, \'rice\': 1, \'tofu\': 1}</code>.',
        code: ['meals = ["oats", "rice", "oats", "tofu"]', '', 'counts = {}', 'for food in meals:', '    counts[food] += 1', '', 'print(counts)'],
        title: 'counts.py',
        check: [
          'got = out.strip()',
          'if got == "{\'oats\': 2, \'rice\': 1, \'tofu\': 1}" and counts == {"oats": 2, "rice": 1, "tofu": 1}:',
          '    ok = True',
          'elif got == "{\'oats\': 1, \'rice\': 1, \'tofu\': 1}":',
          '    msg = "Every food shows 1. Add 1 to what is already there: counts.get(food, 0) + 1."',
          'else:',
          '    msg = "It printed " + got + ". Use counts[food] = counts.get(food, 0) + 1."'
        ].join('\n'),
        why: '<code>counts[food] = counts.get(food, 0) + 1</code>. The first oats finds no key, gets 0 and stores 1. The second oats finds 1 and stores 2.',
        hint: 'Read the old count with .get, with 0 as the default, then add 1 and store it.'
      },
      {
        type: 'fix', q: 'Python stops with <code>RuntimeError: dictionary changed size during iteration</code>. Fix it so the empty jars are removed and it prints <code>{\'rice\': 750, \'pasta\': 150}</code>.',
        code: ['pantry = {"rice": 750, "lentils": 0, "pasta": 150, "oats": 0}', '', 'for item, grams in pantry.items():', '    if grams == 0:', '        del pantry[item]', '', 'print(pantry)'],
        title: 'tidy.py',
        check: [
          'got = out.strip()',
          'if got == "{\'rice\': 750, \'pasta\': 150}" and pantry == {"rice": 750, "pasta": 150}:',
          '    ok = True',
          'elif got == "{\'rice\': 750, \'pasta\': 150}":',
          '    msg = "It prints the right thing, but pantry itself still has the empty jars. Remove them from pantry."',
          'else:',
          '    msg = "It printed " + got + ". Write the empty names in a new list first, or loop over list(pantry)."'
        ].join('\n'),
        why: 'Either collect the empty keys in a new list and <code>del</code> them in a second loop, or loop over a copy: <code>for item in list(pantry):</code> with <code>if pantry[item] == 0:</code>. Both leave the dictionary alone while the loop walks it.',
        hint: 'Never change the dictionary you are looping over. Loop over list(pantry), a copy of the keys, instead.'
      },
      {
        type: 'fill', q: 'Print every jar with its grams. Fill the blanks.',
        text: 'pantry = {"rice": 750, "oats": 400}\nfor ___, ___ in pantry.___():\n    print(f"{item}: {grams} g")',
        options: ['item', 'grams', 'items', 'keys', 'values', 'get'],
        answer: ['item', 'grams', 'items'],
        why: '<code>.items()</code> hands out (key, value) pairs, and <code>item, grams</code> unpacks each pair, key first. <code>.keys()</code> or <code>.values()</code> would give only one side.',
        hint: 'The f-string uses two names. Which method gives both the key and the value?'
      },
      {
        type: 'bucket', q: '<code>pantry = {"rice": 750}</code> has <b>no</b> quinoa. Which lines run fine, and which stop with <code>KeyError</code>?',
        buckets: ['Runs fine', 'KeyError'],
        items: [
          ['pantry.get("quinoa")', 0],
          ['pantry.get("quinoa", 0)', 0],
          ['"quinoa" in pantry', 0],
          ['pantry["quinoa"] = 500', 0],
          ['pantry["quinoa"]', 1],
          ['pantry["quinoa"] += 50', 1],
          ['del pantry["quinoa"]', 1],
          ['pantry.pop("quinoa")', 1]
        ],
        why: '<code>.get</code> and <code>in</code> only look, so a missing key is fine. Storing with <code>=</code> simply adds the key. Anything that must <b>read</b> or <b>remove</b> an existing key, including <code>+=</code>, stops with <code>KeyError</code>.',
        hint: 'Does the line need an old quinoa value to exist? Then it fails.'
      },
      {
        type: 'pick', q: 'Back to lesson 35. There, removing items from a list <b>while looping over it</b> quietly skipped the rye bread. What is the safe way to remove empty jars from <code>pantry</code>?',
        pic: code(['pantry = {"rice": 750, "lentils": 0, "oats": 0}'], { title: 'pantry.py' }),
        options: ['Loop over list(pantry), a copy of the keys, and del from pantry', 'Loop over pantry.items() and del inside the loop', 'Loop over pantry.items() and use .pop() instead of del', 'Loop twice over pantry.items(), deleting a few each time'],
        answer: 0,
        why: 'The same rule as lesson 35: never change what you are walking. Walk a copy (<code>list(pantry)</code>, like <code>basket[:]</code>), or write the names in a new list first. <code>.pop()</code> also changes the size, so it fails the same way.',
        hint: 'In lesson 35 the fix was to loop over a copy, basket[:]. What is the copy here?'
      },
      {
        type: 'type', q: '<code>counts</code> is a dictionary of food to times eaten. Type the one line that adds 1 to <code>counts</code> for <code>food</code>, starting at 0 when <code>food</code> is not there yet.',
        prompt: '>>>',
        answers: ['counts[food] = counts.get(food, 0) + 1'],
        accept: '^counts\\[food\\] ?= ?counts\\.get\\(food, ?0\\) ?\\+ ?1$',
        why: 'Read the old count with a default of 0, add 1, and store it under the same key.',
        hint: 'counts[food] = ... with counts.get(food, 0) on the right.'
      }
    ]
  });
})();
