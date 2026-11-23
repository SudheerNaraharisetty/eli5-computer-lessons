/* Lesson 37: Dictionaries (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l37  Dictionaries
     ===================================================================== */

  // One spice jar: a lid, a body, a label band and a number. label: text or null (no label).
  const jar = (x, y, label, val, o) => {
    o = o || {};
    const w = 74, h = 96;
    return `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="12" fill="${P.ink}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${o.hot ? P.tint : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x + 10}" y="${y - 11}" width="${w - 20}" height="12" rx="4" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2"/>` +
      `<rect x="${x + 2}" y="${y + 14}" width="${w - 4}" height="28" fill="${label ? P.tint : P.sand}"/>` +
      T(x + w / 2, y + 33, label || '?', { s: label ? 13 : 16, f: label ? P.accent : P.danger }) +
      T(x + w / 2, y + 78, String(val), { s: 24, m: true, f: o.f || P.ink });
  };
  const plank = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="12" rx="3" fill="${P.warn}" stroke="${P.ink}" stroke-width="2"/>`;
  const tag = (cx, y, label) =>
    `<rect x="${cx - 20}" y="${y}" width="40" height="26" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    T(cx, y + 18, label, { s: 14, m: true, f: P.ink2 });

  const ideaPic = svg(600, 320, 'Left: a list of Ben\'s protein numbers, 17, 9 and 13, in three jars with no labels, only positions 0, 1 and 2. Which one is tofu? Right: the same numbers on a spice rack with labels: tofu 17, lentils 9, eggs 13. You reach for a jar by its name.',
    T(150, 26, 'a list: [17, 9, 13]', { s: 15, m: true, f: P.danger }) +
    T(450, 26, 'a dict: {"tofu": 17, ...}', { s: 15, m: true, f: P.accent }) +
    `<line x1="300" y1="44" x2="300" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [17, 9, 13].map((v, i) => jar(28 + i * 86, 90, null, v)).join('') + plank(18, 188, 264) +
    [0, 1, 2].map(i => tag(65 + i * 86, 210, '[' + i + ']')).join('') +
    box(40, 254, 220, 40, P.dangerT, 12) + T(150, 280, 'which one is tofu?', { s: 14, f: P.danger }) +
    [['tofu', 17], ['lentils', 9], ['eggs', 13]].map(([k, v], i) => jar(328 + i * 86, 90, k, v, { hot: i === 0 })).join('') + plank(318, 188, 264) +
    `<path d="M365 252 L365 196" stroke="${P.accent}" stroke-width="3" fill="none"/><path d="M357 206 L365 194 L373 206" stroke="${P.accent}" stroke-width="3" fill="none"/>` +
    box(318, 254, 264, 40, P.okT, 12) + T(450, 280, 'protein["tofu"] gives 17', { s: 14, m: true, f: P.ok }));

  const read = [
    "# Ben's protein: grams in 100 g of each food",
    'protein = {"tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'print(protein)',
    'print(protein["tofu"])',
    'print(protein["eggs"], "g in 100 g of eggs")',
    'print(len(protein), "jars on the rack")',
    'print(type(protein))'
  ];
  const anatomy = svg(600, 140, 'The parts of one entry: the key "tofu" is the label, then a colon, then the value 17. Curly brackets go around all the entries, and a comma goes between them.',
    box(20, 16, 560, 70, P.white, 14) +
    T(300, 62, '{ "tofu": 17, "lentils": 9 }', { s: 24, m: true }) +
    T(98, 112, 'curly bracket', { s: 13, f: P.ink2 }) +
    T(196, 112, 'key', { s: 14, f: P.ok }) + T(256, 112, 'colon', { s: 13, f: P.ink2 }) + T(300, 112, 'value', { s: 14, f: P.warn }) +
    T(366, 112, 'comma', { s: 13, f: P.ink2 }) +
    `<path d="M98 98 L94 72 M196 98 L190 72 M256 98 L238 72 M300 98 L285 72 M366 98 L324 72" stroke="${P.mute}" stroke-width="2"/>`);
  const codePic = `<div style="width:100%;min-width:0">${run(read, { title: 'rack.py' })}${anatomy}</div>`;

  const pain = [
    'protein = {"tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'print("Tofu:", protein["tofu"])',
    'print("Tempeh:", protein["tempeh"])   # Ben asks for tempeh',
    'print("Eggs:", protein["eggs"])'
  ];
  const painPic = `<div style="width:100%;min-width:0">${run(pain, { title: 'ask_the_rack.py' })}` +
    term(['$ python3 ask_the_rack.py', 'Tofu: 17', 'Traceback (most recent call last):', '  File "ask_the_rack.py", line 4, in <module>', '    print("Tempeh:", protein["tempeh"])   # Ben asks for tempeh', '                     ~~~~~~~^^^^^^^^^^', "KeyError: 'tempeh'"], 'terminal, Python 3.15') +
    code(['protein = {"tofu": 17, "lentils": 9, "eggs": 13}', 'print(protein["Tofu"])'], { title: 'capital_t.py', bad: [2] }) +
    term(['$ python3 capital_t.py', 'Traceback (most recent call last):', '  File "capital_t.py", line 2, in <module>', '    print(protein["Tofu"])', '          ~~~~~~~^^^^^^^^', "KeyError: 'Tofu'"], 'terminal, Python 3.15') + `</div>`;

  const fixed = [
    'protein = {"tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'print("Tofu:", protein["tofu"])   # spelled exactly like the key',
    '',
    'food = "tempeh"',
    'if food in protein:',
    '    print(food, "has", protein[food], "g")',
    'else:',
    '    print("No", food, "on the rack yet")',
    '',
    'print("Eggs:", protein["eggs"])'
  ];

  const change = [
    'protein = {"tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'protein["oats"] = 13   # a new key: a new jar at the end',
    'protein["tofu"] = 15   # same key: the old value is replaced',
    '',
    'print(protein)',
    'print(len(protein), "jars")'
  ];
  const changePic = `<div style="width:100%;min-width:0">${run(change, { title: 'restock.py' })}` +
    svg(600, 150, 'The rack after the changes: tofu now 15, lentils 9, eggs 13, and a new jar, oats 13, at the end. Tofu kept its place at the front.',
      [['tofu', 15], ['lentils', 9], ['eggs', 13], ['oats', 13]].map(([k, v], i) => jar(60 + i * 124, 28, k, v, { hot: i === 0 || i === 3, f: i === 0 ? P.ok : P.ink })).join('') +
      plank(40, 126, 520) +
      T(97, 22, 'replaced', { s: 12, f: P.ok }) + T(469, 22, 'new, at the end', { s: 12, f: P.accent })) + `</div>`;

  const trap = [
    '# Two tofu jars? The rack keeps only one.',
    'protein = {"tofu": 17, "lentils": 9, "tofu": 15}',
    'print(protein)',
    'print(len(protein), "jars")',
    '',
    '# A dict has no positions to count from 0',
    'print(protein[0])'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(trap, { title: 'two_tofus.py' })}` +
    term(['$ python3 two_tofus.py', "{'tofu': 15, 'lentils': 9}", '2 jars', 'Traceback (most recent call last):', '  File "two_tofus.py", line 7, in <module>', '    print(protein[0])', '          ~~~~~~~^^^', 'KeyError: 0'], 'terminal, Python 3.15') + `</div>`;

  COURSE.add({
    id: 'l37', minutes: 12,
    summary: 'A <b>dictionary</b> (a <b>dict</b>) is a spice rack with labels. Each entry is a <b>key</b>, a colon and a <b>value</b>, inside curly brackets: <code>protein = {"tofu": 17, "lentils": 9}</code>. You look a value up <b>by its key</b>, not by position: <code>protein["tofu"]</code>. <code>protein["oats"] = 13</code> adds a jar, and using a key that already exists <b>replaces</b> its value, because each key appears only once. A key that is not there, or is spelled differently (<code>"Tofu"</code>), stops the program with <code>KeyError</code>. Check the spelling, or ask first with <code>in</code>.',
    video: {
      src: 'videos/l37-dictionaries.mp4', poster: 'videos/l37-dictionaries.jpg', length: '1 min 6 s',
      script: [
        'Ben lifts weights, so he counts protein. Grams in every 100 grams of food.',
        'In a list, that is 17, 9 and 13. But which one is tofu? You have to remember the position.',
        'A dictionary is a spice rack with labels. Curly brackets. Each jar has a key, a colon, and a value. Tofu, 17. Lentils, 9. Eggs, 13.',
        'Now ask by name. Protein, tofu, gives 17. No positions to remember.',
        'A new food? Give it a new key. Oats, 13, slides onto the rack.',
        'A new pack of tofu says 15. Use the same key again, and the old value is replaced. Each key appears only once.',
        'Then Ben asks for tempeh. There is no such label. Key error. Tofu with a capital T fails too. Keys must match exactly.',
        'So check the spelling, or ask first. If tempeh in protein.',
        'A dictionary finds things by name, not by position.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Find it by its label, not its place.',
        text: [
          '<b>Ben</b> lifts weights, so he counts protein. For each food he notes the grams of protein in <b>100 g</b>: firm tofu has about 17, cooked lentils 9, eggs 13.',
          'In a list that is <code>[17, 9, 13]</code>. It works, but the list only knows <b>positions</b>. Is tofu at index 0 or 2? You have to remember, and so does everyone who reads your code.',
          'A spice rack solves this with <b>labels</b>. You never count jars from the left. You read the label and take the jar. In Python that rack is a <b>dictionary</b>, or <b>dict</b> for short.'
        ],
        tip: 'Lesson 11 called a variable a labelled jar that holds one value. A dict is a whole rack of labelled jars under one name.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Curly brackets, keys and values.',
        text: [
          'A dict uses <b>curly brackets</b> <code>{ }</code>. Inside, each entry is a <b>key</b>, a colon, and a <b>value</b>: <code>"tofu": 17</code>. A comma goes between the entries. The key is the label on the jar. The value is what is inside.',
          'To look something up, put the <b>key</b> in square brackets: <code>protein["tofu"]</code> gives <code>17</code>. No counting from 0. Press <b>Run</b>.',
          '<code>len(protein)</code> counts the <b>entries</b>, so 3 jars. Python prints a dict with its curly brackets, keys and values, so you can see the whole rack at once.',
          'Your turn: add a line that prints how much protein lentils have. Then run it.'
        ],
        tip: 'Keys are usually text, like <code>"tofu"</code>. Values can be anything: numbers, text, even lists.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'No jar with that label.',
        text: [
          'Ben asks for <b>tempeh</b>. There is no tempeh jar on the rack. Press <b>Run</b>. Tofu prints, then Python stops with <code>KeyError: \'tempeh\'</code>. Eggs never print.',
          'A <b>KeyError</b> means "there is no key with that name". The last line names the key Python looked for. The little <code>^^^^</code> marks show where on the line it looked.',
          'Spelling counts, and so do capitals. <code>"Tofu"</code> with a capital T is a <b>different key</b> from <code>"tofu"</code>. Python never guesses that you meant the jar next to it. It gives the same <code>KeyError</code>, with <code>\'Tofu\'</code> in it.'
        ],
        warn: 'In lesson 32 a list said <code>IndexError</code> when you asked for a position past the end. A dict says <code>KeyError</code> when you ask for a label it does not have.'
      },
      {
        label: 'The fix', pic: run(fixed, { title: 'ask_the_rack.py' }),
        h: 'Check the spelling, or ask first.',
        text: [
          'First, read the key in the error. Is it a <b>typo</b>, or a capital letter? Then fix the spelling so it matches the key <b>exactly</b>.',
          'If the jar may really be missing, <b>ask first</b>. <code>food in protein</code> is <code>True</code> when <code>food</code> is a <b>key</b> of the dict, just like <code>in</code> on a list in lesson 31. Only then look it up. Press <b>Run</b>: no crash, and eggs print too.',
          'Now change <code>food = "tempeh"</code> to <code>"lentils"</code> and run it again.'
        ],
        tip: 'There is a shorter way: <code>protein.get("tempeh")</code> hands back <code>None</code> instead of stopping. Lesson 38, Working with dictionaries, shows it, along with looping over a dict.'
      },
      {
        label: 'Try it', pic: changePic,
        h: 'Add a jar, change a jar.',
        text: [
          'To <b>add</b> an entry, give a new key a value: <code>protein["oats"] = 13</code> (dry oats, per 100 g). Oats did not exist, so a new jar goes onto the rack.',
          'Ben buys a new pack of tofu that says 15 g. <code>protein["tofu"] = 15</code> uses a key that <b>already exists</b>, so the old 17 is <b>replaced</b>. Each key is on the rack only once.',
          'Press <b>Run</b>. The dict keeps the <b>order you added things</b>: tofu stays first, and oats goes at the end. Then add tempeh, 20 g per 100 g, and change eggs to 12. Run it and check that <code>len()</code> says 5.'
        ],
        tip: 'Adding and changing look exactly the same: <code>protein[key] = value</code>. Python decides: new key, new jar. Existing key, new value in the old jar.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'One label, one jar, and no positions.',
        text: [
          'Write the same key twice inside the curly brackets and Python does <b>not</b> warn you. The last one wins. Press <b>Run</b>: tofu is 15 and the rack has only 2 jars. Watch out for this when you copy and paste lines.',
          '<code>protein[0]</code> does not mean "the first jar". Python looks for a <b>key</b> called <code>0</code>, finds none, and stops with <code>KeyError: 0</code>. A dict finds things by name, never by position.',
          'So pick the right container. Things in an order you count through: a list. Things you look up by a name: a dict. Lesson 42, Choosing the right one, comes back to this.'
        ],
        warn: 'Keys must be values that never change, like text, numbers or tuples (lesson 36). A list cannot be a key.'
      }
    ],
    exercises: [
      {
        file: 'l37_spice_rack.py', title: "Ben's spice rack",
        task: 'The starter keeps Ben\'s protein numbers in a <b>list</b>, so every line has to remember which position is which. Turn it into a <b>dict</b> with 4 foods, <b>add</b> tempeh, <b>change</b> tofu, and print 4 exact lines.',
        steps: [
          'Press <b>Open in VS Code</b>. The 4 exact lines to print are in the comment at the top of the file.',
          'Run it first and read the hint. Then rewrite the lines between <code>START</code> and <code>END</code>: one dict, one line that adds, one line that changes, and the prints. Save the file.',
          'Run it again. The check says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which line makes a <b>dict</b>?',
        options: ['protein = {"tofu": 17, "eggs": 13}', 'protein = ["tofu": 17, "eggs": 13]', 'protein = ("tofu", 17, "eggs", 13)', 'protein = {"tofu" = 17, "eggs" = 13}'],
        answer: 0,
        why: 'Curly brackets, and a colon between each key and its value. Square brackets with colons are a <code>SyntaxError</code>, round brackets make a tuple, and <code>=</code> does not go inside a dict.',
        hint: 'Curly brackets, and something between the key and the value.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['protein = {"tofu": 17, "lentils": 9, "eggs": 13}', 'print(protein["lentils"])'], { title: 'rack.py' }),
        options: ['9', '17', '"lentils"', 'KeyError: \'lentils\''],
        answer: 0,
        why: 'Square brackets with a key hand back that key\'s value. The key is <code>"lentils"</code> and its value is 9.',
        hint: 'Find the jar labelled lentils. What is inside?'
      },
      {
        type: 'pick', q: 'Back to lesson 32. <code>shopping[0]</code> gives the first item of a list. What does <code>protein[0]</code> do?',
        pic: code(['protein = {"tofu": 17, "lentils": 9, "eggs": 13}', 'print(protein[0])'], { title: 'first.py' }),
        options: ['KeyError: 0', 'It prints 17', 'It prints tofu', 'IndexError: list index out of range'],
        answer: 0,
        why: 'A dict has no positions. Python looks for a <b>key</b> called <code>0</code>, finds none, and stops with <code>KeyError: 0</code>. Positions belong to lists, labels to dicts.',
        hint: 'In a dict, whatever is in the square brackets is a key.'
      },
      {
        type: 'fix', q: 'Ben gets a <code>KeyError</code>. Fix line 2 so it prints <code>Tofu has 17 g</code>. Do not change line 1.',
        code: ['protein = {"tofu": 17, "lentils": 9, "eggs": 13}', 'print("Tofu has", protein["Tofu"], "g")'],
        title: 'tofu.py',
        check: [
          'got = out.strip()',
          'if got == "Tofu has 17 g" and protein == {"tofu": 17, "lentils": 9, "eggs": 13}:',
          '    ok = True',
          'elif protein != {"tofu": 17, "lentils": 9, "eggs": 13}:',
          '    msg = "Keep line 1 exactly as it was. Fix the lookup on line 2 instead."',
          'elif "17" not in got:',
          '    msg = "Look up the value with protein[...] so the 17 comes from the dict."',
          'else:',
          '    msg = "It printed " + got + ". Keep the words around it the same: Tofu has 17 g."'
        ].join('\n'),
        why: 'The key is <code>"tofu"</code>, all small letters. <code>"Tofu"</code> is a different key, and the rack has no jar with that label. The text <code>"Tofu has"</code> can keep its capital: it is only words to print.',
        hint: 'Compare the key on line 1 with the key on line 2, letter by letter.'
      },
      {
        type: 'fix', q: 'Ben asks for tempeh, and the program stops. Make it print <code>No tempeh on the rack yet</code> when tempeh is missing, and then <code>Eggs: 13</code>. Do <b>not</b> add tempeh to the dict.',
        code: ['protein = {"tofu": 17, "lentils": 9, "eggs": 13}', 'food = "tempeh"', '', 'print(food, "has", protein[food], "g")', '', 'print("Eggs:", protein["eggs"])'],
        title: 'tempeh.py',
        check: [
          'lines = out.splitlines()',
          'if "tempeh" in protein:',
          '    msg = "Do not add tempeh to the dict. Ask first with if food in protein: and print the message when it is missing."',
          'elif lines == ["No tempeh on the rack yet", "Eggs: 13"]:',
          '    ok = True',
          'elif len(lines) != 2:',
          '    msg = "Print exactly 2 lines: the message about tempeh, then Eggs: 13. You printed " + str(len(lines)) + "."',
          'elif lines[0] != "No tempeh on the rack yet":',
          '    msg = "The first line is " + lines[0] + ". It should be: No tempeh on the rack yet"',
          'else:',
          '    msg = "The second line should be Eggs: 13."'
        ].join('\n'),
        why: '<code>if food in protein:</code> asks the rack first. Inside it, print the lookup. Under <code>else:</code>, print <code>"No", food, "on the rack yet"</code>. The eggs line runs either way.',
        hint: 'Put line 4 inside an if food in protein: and add an else: with the message.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['protein = {"tofu": 17, "eggs": 13}', 'protein["eggs"] = 12', 'protein["oats"] = 13', 'print(len(protein), protein["eggs"])'], { title: 'restock.py' }),
        options: ['3 12', '4 12', '3 13', '4 13'],
        answer: 0,
        why: '<code>"eggs"</code> already exists, so 13 is replaced by 12 and no jar is added. <code>"oats"</code> is new, so it adds the third jar. 3 jars, and eggs is 12.',
        hint: 'Which line adds a jar, and which one only changes what is inside?'
      },
      {
        type: 'fill', q: 'Fill the gaps to make a dict with two foods, then add oats with 13 g.',
        text: 'protein = ___"tofu"___ 17, "eggs": 13___\nprotein___"oats"___ = 13',
        options: ['{', ':', '}', '[', ']', '(', '='],
        answer: ['{', ':', '}', '[', ']'],
        why: 'Curly brackets around the entries and a colon between key and value. To add or look up, the key goes in <b>square</b> brackets after the name.',
        hint: 'Making the rack uses one kind of bracket. Reaching for a jar uses another.'
      },
      {
        type: 'type', q: 'Ben weighs firm tofu from a new shop: 16 g protein per 100 g. Type the one line that sets the value for the key <code>"tofu"</code> in <code>protein</code> to 16.',
        prompt: '>>>',
        answers: ['protein["tofu"] = 16'],
        accept: '^protein\\["tofu"\\] ?= ?16$',
        why: 'The name, the key in square brackets, then <code>=</code> and the new value. The key already exists, so its old value is replaced.',
        hint: 'It looks like protein["oats"] = 13.'
      }
    ]
  });
})();
