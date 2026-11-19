/* Lesson 12: Good names (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l12  Good names
     ===================================================================== */

  // A pantry jar with a label and what is inside. good: true (clear label), false (vague label)
  const jar = (x, y, label, inside, good) =>
    `<rect x="${x + 40}" y="${y}" width="90" height="16" rx="5" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 14}" y="${y + 16}" width="142" height="94" rx="20" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 20}" y="${y + 28}" width="130" height="30" rx="8" fill="${good ? P.white : P.sand}" stroke="${good ? P.ok : P.ink}" stroke-width="2"/>` +
    T(x + 85, y + 48, label, { s: 13.5, m: true, f: good ? P.ok : P.ink2 }) +
    T(x + 85, y + 92, inside, { s: good ? 17 : 22, m: true, f: good ? P.accent : P.mute });

  const ideaPic = svg(600, 300, 'Two pantry shelves. On the first, the jars are labelled x, stuff and misc, and you cannot tell what is inside. On the second, the jars are labelled flour_g with 500, cook_minutes with 20, and is_gluten_free with True. Each label says what is inside, and the unit.',
    T(20, 18, 'Labels that say nothing', { s: 14, f: P.danger, a: 'start' }) +
    jar(14, 28, 'x', '?', false) + jar(214, 28, 'stuff', '?', false) + jar(414, 28, 'misc', '?', false) +
    T(20, 172, 'Labels that say what, and how much', { s: 14, f: P.ok, a: 'start' }) +
    jar(14, 182, 'flour_g', '500', true) + jar(214, 182, 'cook_minutes', '20', true) + jar(414, 182, 'is_gluten_free', 'True', true));

  const clean = [
    'MINUTES_PER_HOUR = 60',
    'guest_count = 3',
    'ben_protein_target_g = 140',
    'ben_is_vegetarian = True',
    'ana_long_run_hours = 2.5',
    'print("Guests tonight:", guest_count)',
    'print("Ben\'s protein target:", ben_protein_target_g, "g")',
    'print("Ben is vegetarian:", ben_is_vegetarian)',
    'print("Ana\'s long run:", ana_long_run_hours * MINUTES_PER_HOUR, "minutes")'
  ];

  // How the same idea looks in different styles. Only one is Python's.
  const stylePic = svg(600, 156, 'The same name in three styles. protein_target_g, small letters with underscores, is Python\'s style for variables. proteinTargetG and ProteinTarget work but are not Python\'s style. protein-target-g is an error, because Python reads the dashes as minus signs.',
    box(16, 14, 280, 40, P.okT, 10) + T(30, 40, 'protein_target_g', { s: 16, m: true, f: P.ok, a: 'start' }) + T(452, 40, 'Python\'s style for variables', { s: 13, f: P.ok }) +
    box(16, 62, 280, 40, P.white, 10) + T(30, 88, 'proteinTargetG', { s: 16, m: true, a: 'start' }) + T(452, 88, 'works, but other languages\' style', { s: 13, f: P.ink2 }) +
    box(16, 110, 280, 40, P.dangerT, 10) + T(30, 136, 'protein-target-g', { s: 16, m: true, f: P.danger, a: 'start' }) + T(452, 136, 'error: the - is a minus sign', { s: 13, f: P.danger }));

  const codePic = `<div style="width:100%;min-width:0">${stylePic}${run(clean, { title: 'kitchen_coach.py' })}</div>`;

  // cook_time = 20: the same label read two ways.
  const timerPic = svg(600, 176, 'A jar labelled cook_time holds 20. Read as 20 seconds, the rice is still raw. Read as 20 minutes, the rice is cooked. The label cook_minutes leaves no doubt.',
    `<rect x="40" y="24" width="90" height="16" rx="5" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="14" y="40" width="142" height="100" rx="20" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="22" y="52" width="126" height="30" rx="8" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>` +
    T(85, 72, 'cook_time', { s: 14, m: true, f: P.ink2 }) + T(85, 120, '20', { s: 24, m: true, f: P.accent }) +
    arrow(164, 76, 250, 46, P.danger, 2.5) + arrow(164, 104, 250, 132, P.ok, 2.5) +
    box(256, 16, 326, 62, P.dangerT, 12) + T(276, 43, '20 seconds?', { s: 16, m: true, f: P.danger, a: 'start' }) + T(276, 66, 'the rice is still raw', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    box(256, 100, 326, 62, P.okT, 12) + T(276, 127, '20 minutes?', { s: 16, m: true, f: P.ok, a: 'start' }) + T(276, 150, 'the rice is cooked', { s: 13, w: 700, f: P.ink2, a: 'start' }));

  const shadow = [
    'print("Tonight\'s dish")',
    'print = "Bean chili"',
    'print(print)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(shadow, { title: 'dish.py', bad: [2] }) +
    term(['$ python3 dish.py', "Tonight's dish", 'Traceback (most recent call last):', '  File "dish.py", line 3, in <module>', '    print(print)', '    ~~~~~^^^^^^^', "TypeError: 'str' object is not callable"], 'terminal') +
    timerPic + `</div>`;

  const messy = [
    'x = 140',
    'y = 2.5',
    'z = True',
    'n = 3',
    'print("Guests tonight:", n)',
    'print("Ben\'s protein target:", x, "g")',
    'print("Ben is vegetarian:", z)',
    'print("Ana\'s long run:", y * 60, "minutes")'
  ];

  const catchPic = `<div style="width:100%;min-width:0">` +
    code([
      'the_number_of_grams_of_protein_ben_wants_to_eat_each_day = 140',
      'ben_protein_target_g = 140',
      'bptg = 140'
    ], { title: 'too_long_or_too_short.py', bad: [1, 3], good: [2] }) +
    svg(600, 92, 'A scale from too short to too long. bptg is too short: only you know what it means. The sentence-long name is too long. ben_protein_target_g sits in the middle: clear, not complete.',
      `<line x1="40" y1="40" x2="560" y2="40" stroke="${P.sand}" stroke-width="10" stroke-linecap="round"/>` +
      `<circle cx="60" cy="40" r="11" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(60, 76, 'bptg: a riddle', { s: 13, f: P.danger }) +
      `<circle cx="300" cy="40" r="13" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 76, 'ben_protein_target_g: clear', { s: 13, f: P.ok }) +
      `<circle cx="540" cy="40" r="11" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(530, 76, 'a whole sentence', { s: 13, f: P.danger }) +
      T(300, 18, 'aim for clear, not complete', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  COURSE.add({
    id: 'l12', minutes: 9,
    summary: 'A variable\'s name is the label on its jar. A good one says <b>what is inside</b> and, for a measure, the <b>unit</b>: <code>cook_minutes</code>, not <code>x</code> or <code>cook_time</code>. Python\'s style is <b>snake_case</b> (small letters and underscores) for variables and <b>UPPER_CASE</b> for values that should not change. Never use a name Python already has, like <code>print</code>.',
    video: {
      src: 'videos/l12-good-names.mp4', poster: 'videos/l12-good-names.jpg', length: '1 min 3 s',
      script: [
        'Open your pantry. The jars say x, stuff, and misc. Which one is the flour? You have to open every jar to find out.',
        'Code can look just the same. x equals 140. But 140 what?',
        'So peel off the old label, and write a clear one. Ben protein target, g for grams. Now you know what is inside, and the unit. Python\'s style guide asks for small letters, with underscores between the words.',
        'Units matter. A jar says cook time, 20. Your friend meant 20 minutes. You read 20 seconds. The rice is still raw. Call it cook minutes, and nobody has to guess.',
        'One more trap. Never take a name Python already uses. Label a jar print, and it swallows the print tool. The next print stops with a type error. A string is not callable.',
        'A good label says what is inside, and how it is measured.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A jar labelled "stuff" helps nobody.',
        text: [
          'Picture two pantries. In the first, the jars say <code>x</code>, <code>stuff</code> and <code>misc</code>. To find the flour, you open every jar and sniff it.',
          'In the second, each label says <b>what is inside</b> and <b>how it is measured</b>: <code>flour_g</code>, <code>cook_minutes</code>, <code>is_gluten_free</code>. You find what you need without opening anything.',
          'In lesson 11 you made labelled jars: variables. Python does not care what the label says. <code>x = 140</code> works exactly like <code>ben_protein_target_g = 140</code>. But <b>people</b> read your code: your friend, and you, three weeks from now. Names are written for them.'
        ],
        tip: 'A good name removes the need for a note. <code>x = 140</code> needs a note to explain it. <code>ben_protein_target_g = 140</code> explains itself.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'snake_case for jars, UPPER_CASE for fixed values.',
        text: [
          'Python has an official style guide, called <b>PEP 8</b>. For variables it says: small letters, with an <b>underscore</b> <code>_</code> between the words. This is called <b>snake_case</b>, because the words lie flat, like a snake. Spaces are not allowed in a name, and a dash <code>-</code> is a minus sign, so underscores do the joining.',
          'A value that should <b>never change</b> while the program runs gets a name in <b>UPPER_CASE</b>: <code>MINUTES_PER_HOUR = 60</code>, <code>TAX_RATE = 0.08</code>. Python does not stop you from changing it. The capitals are a <b>promise</b> to the reader: "this stays the same".',
          'A good name says <b>what</b> is inside: <code>guest_count</code>, not <code>n</code>. A measure also says the <b>unit</b>: <code>ben_protein_target_g</code> is in grams, <code>ana_long_run_hours</code> is in hours. A True or False jar reads like a <b>yes or no question</b>: <code>ben_is_vegetarian</code>, <code>has_gluten</code>.',
          'Names are <b>case-sensitive</b>: <code>Ana_target</code> and <code>ana_target</code> are two different jars. Press <b>Run</b>. Then change <code>2.5</code> to <code>1.5</code> and run again. You know which line to change because the name tells you.'
        ],
        tip: 'Other languages use other styles, like <code>proteinTargetG</code>. Python runs those too, but every Python programmer expects snake_case. Writing it makes your code look at home.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A name that hides a tool, and a name with no unit.',
        text: [
          'Pain number 1: <b>borrowing a name Python already uses</b>. <code>print</code> is a tool that comes with Python. Line 2 sticks the label <code>print</code> on a jar of text. Now the name <code>print</code> means "Bean chili", and the print tool is hidden behind it.',
          'Line 3 tries to use print. Python finds the text instead, and you cannot "call" text like a tool. Read the last line: <code>TypeError: \'str\' object is not callable</code>. "Callable" means "something you can use with brackets", like <code>print(...)</code>.',
          'Pain number 2: <b>a name with no unit</b>. A friend writes <code>cook_time = 20</code> for the rice. They mean minutes. You read seconds. Python is happy with both, and the rice comes out raw. No error, just a ruined dinner.'
        ],
        warn: 'Names to keep for Python\'s own tools: <code>print</code>, <code>input</code>, <code>len</code>, <code>str</code>, <code>int</code>, <code>list</code>, <code>sum</code>, <code>type</code>. If VS Code colours your new name like <code>print</code>, pick another.'
      },
      {
        label: 'The fix', pic: run(shadow, { title: 'dish.py' }),
        h: 'Give the jar its own name.',
        text: [
          'Press <b>Run</b>. Line 1 prints, then Python stops on line 3 with the <code>TypeError</code>.',
          'The cure is a name that says what is inside. Change <code>print = "Bean chili"</code> to <code>dish = "Bean chili"</code>, and <code>print(print)</code> to <code>print(dish)</code>. Run again: <code>Tonight\'s dish</code>, then <code>Bean chili</code>.',
          'For the rice, put the unit in the name: <code>rice_cook_minutes = 20</code>. Now nobody has to guess, not your friend, and not you next month.'
        ],
        tip: 'The hidden <code>print</code> only lasts until the program ends. Each run starts fresh, and so does every new Python program. Nothing on your computer is broken.'
      },
      {
        label: 'Try it', pic: run(messy, { title: 'kitchen_coach.py' }),
        h: 'Relabel the jars.',
        text: [
          'This program works, but its jars say <code>x</code>, <code>y</code>, <code>z</code> and <code>n</code>. Press <b>Run</b> and note the four lines it prints.',
          'Now rename every jar: <code>x</code> becomes <code>ben_protein_target_g</code>, <code>y</code> becomes <code>ana_long_run_hours</code>, <code>z</code> becomes <code>ben_is_vegetarian</code>, <code>n</code> becomes <code>guest_count</code>. Change each name in <b>both</b> places: where the jar is filled, and where it is used.',
          'Then give the <code>60</code> on the last line its own UPPER_CASE jar, <code>MINUTES_PER_HOUR = 60</code>, at the top. Run again. The output is <b>exactly the same</b>. Names change how code reads, never what it does.'
        ],
        tip: 'Missed one? Python says <code>NameError: name \'y\' is not defined</code> and points at the line. That is the old label, still in use.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Clear, not complete.',
        text: [
          'A name can be too long. <code>the_number_of_grams_of_protein_ben_wants_to_eat_each_day</code> says everything, but nobody wants to read it ten times, or type it without a typo.',
          'A name can be too short too. <code>bptg</code> saves letters, but only you know what it means, and only this week. Avoid made-up short forms. Common ones like <code>g</code> for grams at the end of a name are fine.',
          'Aim for <b>clear, not complete</b>. And the rule of thumb: the <b>shorter</b> the part of the program where a name is used, the shorter it can be. A counter used for two lines, like <code>i</code> in the loops of lesson 26, can be one letter. A jar used all over Kitchen Coach needs a full name.'
        ],
        warn: 'Watch out for names that lie. A jar called <code>total_with_tax</code> that holds the bill <b>before</b> tax is worse than <code>x</code>. A vague name makes the reader ask. A wrong name makes them believe it.'
      }
    ],
    exercises: [
      {
        file: 'l12_rename_the_jars.py', title: 'Rename the jars',
        task: 'A Kitchen Coach program works, but every jar has a one-letter name. Rename all six jars with the names listed in the file, so each name matches what is inside. The output must stay <b>exactly the same</b>. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the six descriptions and the six names at the top of the file. Work out which name belongs to which jar.',
          'Between the <code>START</code> and <code>END</code> lines, change every one-letter name, both where the jar is filled and where it is used. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.',
          'If Python stops with a <code>NameError</code> before the check runs, a <code>print(...)</code> line still uses an old one-letter name. Rename it there too.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Sort the jar labels. Which ones help a reader?',
        buckets: ['Clear name', 'Poor name'],
        items: [
          ['cook_minutes', 0],
          ['ben_protein_target_g', 0],
          ['is_gluten_free', 0],
          ['guest_count', 0],
          ['stuff', 1],
          ['x', 1],
          ['cook_time', 1],
          ['ctgt', 1]
        ],
        why: 'A clear name says what is inside and, for a measure, the unit. <code>cook_time</code> has no unit: seconds or minutes? <code>ctgt</code> is a short form only its writer understands.',
        hint: 'For each one, ask: would a friend know what is inside, and in which unit?'
      },
      {
        type: 'pick', q: 'Which name follows Python\'s style for a variable?',
        options: ['chloeDessertG', 'ChloeDessertG', 'chloe_dessert_g', 'chloe-dessert-g'],
        answer: 2,
        why: 'Python\'s style guide, PEP 8, asks for snake_case: small letters with underscores. <code>chloe-dessert-g</code> is not even a name: Python reads the dashes as minus signs.',
        hint: 'Python\'s style is named after a snake: flat and joined by underscores.'
      },
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['print = "hi"', 'print("Pasta for Ana")'], { title: 'menu.py' }),
        options: ['It shows Pasta for Ana', 'It shows hi', "TypeError: 'str' object is not callable", "NameError: name 'print' is not defined"],
        answer: 2,
        why: 'Line 1 puts the text "hi" in a jar called <code>print</code>, which hides the print tool. On line 2 Python finds text, and text cannot be used with brackets like a tool.',
        hint: 'After line 1, what does the name print hold?'
      },
      {
        type: 'fix', q: 'Someone used <code>len</code> as a jar name, and now <code>len("Chloe")</code> breaks. Rename the jar so both lines print.',
        code: ['len = 140', 'print("Ben\'s protein target:", len, "g")', 'print("Letters in Chloe:", len("Chloe"))'],
        title: 'targets.py',
        check: [
          'want = "Ben\'s protein target: 140 g\\nLetters in Chloe: 5"',
          'if out == want:',
          '    ok = True',
          'elif out.startswith("Ben\'s protein target: 140 g"):',
          '    msg = "Close. It should print exactly two lines: the target, then Letters in Chloe: 5."',
          'else:',
          '    msg = "It printed: " + out + ". Rename the jar on line 1, and use the new name on line 2. Leave len(\\"Chloe\\") on line 3 alone."'
        ].join('\n'),
        why: '<code>len</code> is Python\'s letter-counting tool from lesson 8. A jar with a real name, like <code>ben_protein_target_g</code>, leaves the tool free to use.',
        hint: 'Line 1 hides the len tool. Give the jar a name that says what is inside, and use that name on line 2.'
      },
      {
        type: 'match', q: 'Match each name to what it tells the reader.',
        pairs: [
          ['TAX_RATE', 'A value that should never change'],
          ['ben_is_vegetarian', 'A yes or no question'],
          ['rice_cook_minutes', 'A measure, with its unit'],
          ['guest_count', 'How many of something'],
          ['i', 'A counter used for a line or two']
        ],
        why: 'Capitals promise "this stays the same". <code>is_</code> and <code>has_</code> read as questions. A unit at the end says how it is measured. One letter is fine only where a name lives for a moment.',
        hint: 'Look at the shape of each name: capitals, a question word, a unit, a count.'
      },
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['Ana_carbs_g = 95', 'print(ana_carbs_g)'], { title: 'ana.py' }),
        options: ['It shows 95', "NameError: name 'ana_carbs_g' is not defined. Did you mean: 'Ana_carbs_g'?", 'It shows ana_carbs_g', 'It shows 0'],
        answer: 1,
        why: 'Names are case-sensitive. A capital A and a small a make two different labels, and there is no jar called <code>ana_carbs_g</code>. Python even guesses the one you meant.',
        hint: 'Compare the first letter of the name on each line.'
      },
      {
        type: 'pick', q: 'Which name is a lie?',
        pic: code(['TAX_RATE = 0.08', 'bill_before_tax = 75.60', 'total_with_tax = bill_before_tax', 'print(total_with_tax)'], { title: 'bill.py' }),
        options: ['TAX_RATE', 'bill_before_tax', 'total_with_tax', 'None of them'],
        answer: 2,
        why: '<code>total_with_tax</code> holds the bill before tax: nothing was added. Python runs it happily, and anyone who trusts the name pays the wrong amount. A name must match what is really inside.',
        hint: 'Follow the value. Is any tax ever added?'
      },
      {
        type: 'pick', q: 'Back to lessons 6 and 7. What does this show?',
        pic: code(['MINUTES_PER_HOUR = 60', 'ana_long_run_hours = 2.5', 'print(ana_long_run_hours * MINUTES_PER_HOUR)'], { title: 'run.py' }),
        options: ['150', '150.0', '2.560', "TypeError: 'int' object is not callable"],
        answer: 1,
        why: '2.5 hours times 60 is 150. Because 2.5 is a float, the answer is a float too, so Python shows <code>150.0</code>. The good names make the sum easy to check in your head.',
        hint: 'A float times an int gives which kind of number?'
      }
    ]
  });
})();
