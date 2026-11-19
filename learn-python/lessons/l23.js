/* Lesson 23: Truthy and falsy (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T } = PR;

  /* =====================================================================
     l23  Truthy and falsy
     ===================================================================== */

  // A plate seen from above. food: '' (empty), 'pea', 'crumb', or text for a paper note on it.
  const plate = (cx, cy, r, food) => {
    let on = '';
    if (food === 'pea') on = `<circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>`;
    else if (food === 'crumb') on = `<circle cx="${cx + 5}" cy="${cy + 4}" r="3.5" fill="${P.warn}"/><circle cx="${cx - 4}" cy="${cy - 2}" r="2.5" fill="${P.warn}"/>`;
    else if (food) on = `<g transform="rotate(-8 ${cx} ${cy})"><rect x="${cx - 34}" y="${cy - 14}" width="68" height="28" rx="4" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2"/>` +
      T(cx, cy + 6, food, { s: 14, m: true }) + `</g>`;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${r * 0.68}" fill="none" stroke="${P.sand}" stroke-width="2.5"/>` + on;
  };

  const falsy = [['0', ''], ['0.0', ''], ['""', ''], ['None', ''], ['False', '']];
  const truthy = [['-1', 'pea'], ['0.1', 'pea'], ['" "', 'crumb'], ['"False"', 'False'], ['"Ana"', 'Ana']];
  const ideaPic = svg(600, 330, 'Two rows of plates on a kitchen counter. Top row, empty plates that count as no: 0, 0.0, empty text, None and False. Bottom row, plates with something on them that count as yes: minus 1, 0.1, a single space, the text "False" and the text "Ana".',
    box(14, 10, 572, 140, P.dangerT, 16) +
    T(30, 36, 'FALSY: an empty plate counts as no', { s: 13, f: P.danger, a: 'start' }) +
    falsy.map((f, i) => plate(74 + i * 113, 82, 30, f[1]) + T(74 + i * 113, 136, f[0], { s: 14, m: true })).join('') +
    box(14, 166, 572, 140, P.okT, 16) +
    T(30, 192, 'TRUTHY: anything on the plate counts as yes', { s: 13, f: P.ok, a: 'start' }) +
    truthy.map((f, i) => plate(74 + i * 113, 238, 30, f[1]) + T(74 + i * 113, 292, f[0], { s: 14, m: true })).join('') +
    `<circle cx="${74 + 3 * 113}" cy="238" r="40" fill="none" stroke="${P.warn}" stroke-width="3" stroke-dasharray="6 5"/>` +
    T(300, 326, 'an empty shopping list [] is an empty plate too (lesson 31)', { s: 12, w: 700, f: P.ink2 }));

  const explorer = [
    'print("0       ->", bool(0))',
    'print("0.0     ->", bool(0.0))',
    'print(\'""      ->\', bool(""))',
    'print("None    ->", bool(None))',
    'print("False   ->", bool(False))',
    'print("-1      ->", bool(-1))',
    'print("0.1     ->", bool(0.1))',
    'print(\'" "     ->\', bool(" "))',
    'print(\'"False" ->\', bool("False"))',
    'print(\'"Ana"   ->\', bool("Ana"))'
  ];

  const note = [
    'chloe_note = ""  # Chloe pressed Enter and skipped the note',
    '',
    'if chloe_note:',
    '    print("Note for the cook:", chloe_note)',
    'else:',
    '    print("No note from Chloe")',
    '',
    'if not chloe_note:',
    '    print("Nothing to read. Start cooking.")'
  ];

  const shakes = [
    'ben_shakes = 0  # Ben drank no shakes today. A real answer.',
    '',
    'if not ben_shakes:',
    '    print("Ben has not filled in his shakes yet")',
    'else:',
    '    print("Shakes today:", ben_shakes)'
  ];
  const race = [
    'ana_racing = "False"  # read from a form, so it is text',
    '',
    'if ana_racing:',
    '    print("Ana: race tomorrow, extra carbs tonight")',
    'else:',
    '    print("Ana: normal portion")'
  ];
  const painPic = `<div style="width:100%">` +
    code(shakes, { title: 'shakes.py', bad: [3] }) +
    term(['$ python3 shakes.py', 'Ben has not filled in his shakes yet', '# he did fill it in: the answer was 0'], 'terminal') +
    code(race, { title: 'race.py', bad: [3] }) +
    term(['$ python3 race.py', 'Ana: race tomorrow, extra carbs tonight', '# the form said "False", and it still counted as yes'], 'terminal') +
    `</div>`;

  const nick = [
    'typed_name = ""  # Ana left the nickname box empty',
    '',
    'nickname = typed_name or "Guest"',
    'print(f"Welcome, {nickname}!")',
    '',
    'print("Chloe" or "Guest")',
    'print(0 or 2)'
  ];

  const portions = [
    'typed_portions = 0  # Ana wants no dessert tonight: race tomorrow',
    '',
    'portions = typed_portions or 2',
    'print("Dessert portions for Ana:", portions)',
    '',
    'portions = typed_portions',
    'if portions is None:',
    '    portions = 2',
    'print("Dessert portions for Ana:", portions)'
  ];

  COURSE.add({
    id: 'l23', minutes: 10,
    summary: 'An <code>if</code> does not need <code>True</code> or <code>False</code>. Give it any value and Python asks: <b>does this count as something?</b> Empty things count as no. They are called <b>falsy</b>: <code>False</code>, <code>None</code>, <code>0</code>, <code>0.0</code> and empty text <code>""</code>. Everything else is <b>truthy</b>, even <code>-1</code>, <code>" "</code> and the text <code>"False"</code>. <code>bool(x)</code> shows how Python sees a value. Careful: when <code>0</code> is a real answer, ask <code>is None</code> instead.',
    video: {
      src: 'videos/l23-truthy-falsy.mp4', poster: 'videos/l23-truthy-falsy.jpg', length: '1 min 11 s',
      script: [
        'Plates on your kitchen counter. An if in Python does not need True or False. It looks at any value and asks, does this count as something?',
        'An empty plate counts as no. 0, empty text, and None are all empty plates. Python calls them falsy.',
        'Anything on the plate counts as yes. Minus 1. A single space. Even a crumb. That is truthy.',
        'Now a surprise. A note that says False, in quotes. It is text with letters, so it counts as yes.',
        'Chloe skipped the note field. If note? The plate is empty, so the cook gets, no note.',
        'Ben drank 0 shakes. His glass is empty on purpose. That is a real answer. Ask, if not shakes, and Python says he never filled it in. Wrong. Ask, is shakes None.',
        'Ana leaves her nickname blank. Typed, or Guest. The first plate is empty, so the backup plate slides in.',
        'Empty counts as no. When 0 is a real answer, ask is None.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'An empty plate counts as no.',
        text: [
          'Walk past the counter and glance at the plates. An <b>empty plate</b> says "no food here". A plate with <b>anything</b> on it says "yes, something is here", even if it is a single pea or a crumb.',
          'Python does the same with any value. Until now, every <code>if</code> got a question that answered <code>True</code> or <code>False</code> (lesson 19). But you can give <code>if</code> <b>any value</b>, like a number or a piece of text. Python then asks: <b>does this count as something?</b>',
          'Values that count as no are called <b>falsy</b>: <code>False</code>, <code>None</code>, the number <code>0</code> (and <code>0.0</code>), and empty text <code>""</code>. Everything else is <b>truthy</b>: any number that is not zero, and any text with at least one character in it.'
        ],
        tip: 'Empty containers are falsy too. An empty shopping list, written <code>[]</code>, counts as no, and a list with one item counts as yes. Lists arrive in lesson 31.'
      },
      {
        label: 'The code', pic: `<div style="width:100%">${run(explorer, { title: 'plates.py' })}${run(note, { title: 'note.py' })}</div>`,
        h: 'bool() shows how Python sees a value.',
        text: [
          '<code>bool(x)</code> turns any value into <code>True</code> or <code>False</code>, the same way <code>if</code> sees it. You had a peek at it in lesson 13. Press <b>Run</b> on <code>plates.py</code> and read the table.',
          'Two lines surprise everyone. <code>" "</code> is text with one space in it. Not empty, so <code>True</code>. And <code>"False"</code> in quotes is text with five letters, so it is <code>True</code> too. Python never reads the words inside text. Only "is it empty?"',
          'Your turn: add a line for <code>"0"</code>, the digit zero in quotes. Guess first, then run it.',
          'Now <code>note.py</code>. Chloe skipped the note field, so her note is <code>""</code>. <code>if chloe_note:</code> reads as "if there is a note". <code>if not chloe_note:</code> (lesson 22) reads as "if the note is empty". Run it, then put <code>"no nuts, please"</code> in the jar and run again.'
        ],
        tip: 'Python programmers write <code>if name:</code> instead of <code>if name != "":</code>, and <code>if not note:</code> instead of <code>if note == "":</code>. Shorter, and it also catches None.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Zero is an answer. "False" is a word.',
        text: [
          'Ben drank <b>0 shakes</b> today. He filled in the form, and his answer was zero. But <code>not ben_shakes</code> treats 0 as an empty plate, so Kitchen Coach says he <b>never answered</b>. His glass was empty <b>on purpose</b>. That is still an answer.',
          'Lesson 16 warned about this: <code>None</code> means "no answer yet", and <code>0</code> is a real count. Truthiness throws both onto the same pile marked "no".',
          'The second bug: a form gave Ana\'s answer as the <b>text</b> <code>"False"</code>. Text with letters is truthy, so the <code>if</code> says yes and Ana gets extra carbs for a race that is not happening. Lesson 22 met a cousin of this bug: in <code>dish == "pasta" or "rice"</code>, the plain text <code>"rice"</code> always counts as yes.'
        ],
        warn: 'Neither bug gives an error. The program runs and prints a calm, wrong answer. Ask yourself: can this value be <code>0</code> or empty <b>and still be a real answer</b>?'
      },
      {
        label: 'The fix', pic: run(shakes, { title: 'shakes.py' }),
        h: 'When 0 is a real answer, ask is None.',
        text: [
          'Say what you mean. "Not filled in" means the jar holds <code>None</code>, so ask exactly that. Change line 3 to <code>if ben_shakes is None:</code> and run again: <code>Shakes today: 0</code>.',
          'Then test both other cases: set line 1 to <code>ben_shakes = None</code>, then to <code>ben_shakes = 2</code>. None says "not filled in". Every number, including 0, gets counted.',
          'For Ana\'s form, compare the text itself: <code>if ana_racing == "True":</code>. Now <code>"False"</code> gives the normal portion. Lesson 13 converted text to numbers with <code>int()</code>. There is no such shortcut for <code>bool()</code>: <code>bool("False")</code> is <code>True</code>.'
        ],
        tip: 'Rule of thumb: use <code>if x:</code> when "empty" and "missing" mean the same thing, like a note. Use <code>if x is None:</code> when 0 or <code>""</code> can be a real answer, like a count.'
      },
      {
        label: 'Try it', pic: run(nick, { title: 'nickname.py' }),
        h: 'A peek: what or really gives back.',
        text: [
          'This is a peek under the hood. In lesson 22, <code>or</code> joined two questions. The full truth: <code>or</code> gives back the <b>first value that counts as yes</b>, or the last one if none does. It does not have to be <code>True</code> or <code>False</code>.',
          'So <code>typed_name or "Guest"</code> means "the typed name, or if that plate is empty, the backup plate". Press <b>Run</b>: Ana left the box empty, so she is welcomed as <code>Guest</code>.',
          'Now type a nickname into line 1, like <code>"Speedy Ana"</code>, and run. Then try <code>" "</code>, one space. Is that what you wanted? Lesson 9\'s <code>.strip()</code> would help: <code>typed_name.strip() or "Guest"</code>.'
        ],
        tip: '<code>and</code> works the same way from the other side: it gives back the <b>first value that counts as no</b>, or the last one. <code>0 and 5</code> is <code>0</code>, and <code>4 and 5</code> is <code>5</code>. You rarely need that one.'
      },
      {
        label: 'The catch', pic: run(portions, { title: 'portions.py' }),
        h: 'Short is not always clear.',
        text: [
          'The <code>or</code> default has the same trap as the shakes. Ana typed <code>0</code>: no dessert tonight, race tomorrow. <code>typed_portions or 2</code> sees an empty plate and serves her <b>2</b>. Press <b>Run</b>: the first line says 2, the second says 0.',
          'The second version is longer, but it says exactly what it means: only a <b>missing</b> answer gets the default. Ana\'s 0 stays 0.',
          'Truthiness is short and Python programmers love it. Use it for "is there anything here?", like a note or a name. When the meaning matters, write the comparison out: <code>is None</code>, <code>== 0</code>, <code>== ""</code>. The next cook to read your recipe will thank you.'
        ],
        warn: 'Before you write <code>if x:</code> or <code>x or default</code>, list the values that count as no: 0, empty text, None, False. Could any of them be a real answer here? If yes, ask <code>is None</code>.'
      }
    ],
    exercises: [
      {
        file: 'l23_empty_or_not.py', title: 'Empty or not?',
        task: 'Kitchen Coach reads a guest\'s form. Write three checks: print the <b>note</b> only when there is one, pick a <b>nickname</b> with <code>or</code> and the backup <code>"Guest"</code>, and report <b>shakes</b> so that 0 counts as a real answer and only <code>None</code> means "not filled in". The check runs your code with many answers, including <code>0</code>, <code>""</code>, <code>" "</code> and <code>None</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'Replace the three <code>...</code> between the <code>START</code> and <code>END</code> lines. Save the file.',
          'Run it. At the bottom you see <code>PASS</code> or one hint that names the answer where your code went wrong.',
          'Before you change anything, run the file once. <code>if ...:</code> runs without an error. Why? The three dots are a value too, and it is truthy.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Does each value count as yes or no in an <code>if</code>?',
        buckets: ['Truthy (yes)', 'Falsy (no)'],
        items: [
          ['0', 1],
          ['""', 1],
          ['None', 1],
          ['0.0', 1],
          ['-1', 0],
          ['" "', 0],
          ['"False"', 0],
          ['"0"', 0]
        ],
        why: 'Only empty things count as no: zero, empty text, None and False. <code>-1</code> is not zero. <code>" "</code>, <code>"False"</code> and <code>"0"</code> are all text with something in it.',
        hint: 'Text: is anything at all between the quotes? Numbers: is it exactly zero?'
      },
      {
        type: 'pick', q: 'Chloe typed one space in the note box. What does this print?',
        pic: code(['note = " "', '', 'if note:', '    print("Read the note")', 'else:', '    print("No note")'], { title: 'note.py' }),
        options: ['Read the note', 'No note', 'Nothing at all', 'A TypeError'],
        answer: 0,
        why: 'A space is a character, so <code>" "</code> is not empty text. It counts as yes. Use <code>note.strip()</code> (lesson 9) if a lone space should count as empty.',
        hint: 'Is there anything between the quotes?'
      },
      {
        type: 'fix', q: 'Ben drank <b>0</b> shakes, and that is his real answer. Fix the check so it prints <code>Shakes today: 0</code>. A <code>None</code> should still mean "not filled in".',
        code: ['ben_shakes = 0', '', 'if not ben_shakes:', '    print("Not filled in")', 'else:', '    print("Shakes today:", ben_shakes)'],
        title: 'shakes.py',
        check: [
          'if ben_shakes != 0:',
          '    msg = "Keep ben_shakes at 0. Change the question on line 3 instead."',
          'elif out.strip() == "Shakes today: 0":',
          '    ok = True',
          'elif out.strip() == "Not filled in":',
          '    msg = "Still Not filled in. not ben_shakes treats 0 as empty. Ask whether the jar is None."',
          'else:',
          '    msg = "It printed: " + (out.strip() or "nothing") + ". Keep both messages and change only line 3."'
        ].join('\n'),
        why: '<code>if ben_shakes is None:</code> is True only for a missing answer. 0 is a real count, so it reaches the <code>else</code> and prints.',
        hint: 'Which value really means "not filled in"? Lesson 16 asked about it with two words.'
      },
      {
        type: 'fix', q: 'Ana left the nickname empty. Fix line 2 so it prints <code>Welcome, Guest!</code>, and would still print her nickname if she had typed one.',
        code: ['typed_name = ""', 'nickname = typed_name', 'print(f"Welcome, {nickname}!")'],
        title: 'nickname.py',
        check: [
          'if typed_name != "":',
          '    msg = "Keep typed_name empty. The fix goes on line 2."',
          'elif out.strip() == "Welcome, Guest!":',
          '    ok = True',
          'else:',
          '    msg = "It printed: " + (out.strip() or "nothing") + ". Give nickname a backup with or."'
        ].join('\n'),
        why: '<code>typed_name or "Guest"</code> gives the first value that counts as yes. The typed name is empty, so the backup plate slides in.',
        hint: 'Add <code>or</code> and a backup in quotes after <code>typed_name</code>.'
      },
      {
        type: 'fix', q: 'The form sends Ana\'s answer as the text <code>"False"</code>. Fix line 3 so this prints <code>Ana: normal portion</code>.',
        code: race,
        title: 'race.py',
        check: [
          'if ana_racing != "False":',
          '    msg = "Keep ana_racing as the text \\"False\\". The form sends text. Fix the question on line 3."',
          'elif out.strip() == "Ana: normal portion":',
          '    ok = True',
          'else:',
          '    msg = "It printed: " + out.strip() + ". The text \\"False\\" has letters, so it counts as yes. Compare it with the text you mean."'
        ].join('\n'),
        why: '<code>if ana_racing == "True":</code> compares the words themselves. Any text with letters is truthy, even the word False.',
        hint: 'Compare the text with <code>==</code> and the word in quotes that means "racing".'
      },
      {
        type: 'pick', q: 'Ana wants <b>0</b> dessert portions: race tomorrow. What does this print?',
        pic: code(['typed_portions = 0', 'portions = typed_portions or 2', 'print(portions)'], { title: 'portions.py' }),
        options: ['2', '0', 'True', 'None'],
        answer: 0,
        why: '<code>or</code> gives the first value that counts as yes. 0 counts as no, so <code>or</code> moves on to 2. Ana gets dessert she said no to. Use <code>is None</code> when 0 is a real answer.',
        hint: 'Does 0 count as yes or no?'
      },
      {
        type: 'pick', q: 'Back to lesson 16. <code>bool(None)</code> and <code>bool(0)</code> are both <code>False</code>. So what does this print?',
        pic: code(['print(None == 0)'], { title: 'jars.py' }),
        options: ['False', 'True', 'A TypeError', 'None'],
        answer: 0,
        why: 'Both count as no, but they are different values. None means "no answer yet" and 0 is a real count. <code>==</code> compares values, so the answer is <code>False</code>.',
        hint: 'Counting as no is not the same as being equal.'
      },
      {
        type: 'match', q: 'Match each line to what it gives.',
        pairs: [
          ['bool("False")', '<code>True</code>'],
          ['bool(0.0)', '<code>False</code>'],
          ['"" or "Guest"', '<code>"Guest"</code>'],
          ['"Ben" or "Guest"', '<code>"Ben"</code>'],
          ['0 or 2', '<code>2</code>']
        ],
        why: 'Text with letters is truthy, 0.0 is falsy. <code>or</code> gives back the first value that counts as yes, so an empty one is skipped.',
        hint: 'Start with the two bool lines. Then for each or: does the left side count as yes?'
      }
    ]
  });
})();
