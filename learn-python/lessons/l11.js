/* Lesson 11: Variables (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l11  Variables
     ===================================================================== */

  // A glass jar with a paper label and a value inside. w is the jar width.
  const jar = (x, y, w, h, label, value, o) => {
    o = o || {};
    const ring = o.ring ? `<ellipse cx="${x + w / 2}" cy="${y + h - 38}" rx="${w / 2 - 20}" ry="30" fill="none" stroke="${o.ring}" stroke-width="4" transform="rotate(-3 ${x + w / 2} ${y + h - 38})"/>` : '';
    return `<rect x="${x + 22}" y="${y}" width="${w - 44}" height="18" rx="5" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x}" y="${y + 18}" width="${w}" height="${h - 18}" rx="22" fill="${o.fill || P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x + 10}" y="${y + 34}" width="${w - 20}" height="30" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x + w / 2, y + 54, label, { s: o.ls || 13, m: true }) +
      (value === '' ? '' : `<rect x="${x + w / 2 - 34}" y="${y + h - 62}" width="68" height="46" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + w / 2, y + h - 31, value, { s: 20, m: true, f: o.vf || P.accent })) + ring;
  };
  const shelf = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="12" rx="4" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>`;

  const ideaPic = svg(600, 300, 'The line ben_protein = 140, with arrows: the name ben_protein becomes the label on a jar, and the value 140 goes inside it. The jar sits on a shelf next to the jars ana_carbs, holding 350, and chloe_desserts, holding 2.',
    box(80, 14, 440, 52, '#15132B', 12) +
    T(140, 48, 'ben_protein', { s: 20, m: true, f: '#ECEAFF', a: 'start' }) +
    T(292, 48, '=', { s: 20, m: true, f: '#FFC24B', a: 'start' }) +
    T(320, 48, '140', { s: 20, m: true, f: '#FFC24B', a: 'start' }) +
    T(398, 48, '= means store', { s: 13, f: '#C9C6FF', a: 'start' }) +
    jar(26, 130, 160, 140, 'ana_carbs', '350') +
    jar(220, 130, 160, 140, 'ben_protein', '140', { fill: P.okT }) +
    jar(414, 130, 160, 140, 'chloe_desserts', '2', { ls: 12 }) +
    shelf(10, 590, 270) +
    arrow(206, 72, 252, 166, P.accent, 3) + T(196, 104, 'the label', { s: 12.5, w: 700, f: P.accent, a: 'end' }) +
    arrow(338, 72, 318, 206, P.ok, 3) + T(350, 120, 'the value goes in', { s: 12.5, w: 700, f: P.ok, a: 'start' }) +
    T(300, 298, 'Kitchen Coach\'s shelf: one jar, one name, one value', { s: 12.5, w: 700, f: P.ink2 }));

  const coachLines = [
    'ana_carbs = 350',
    'ben_protein = 140',
    'chloe_desserts = 2',
    'ben_dish = "bean chili"',
    'chloe_gluten_free = True',
    '',
    'print("Kitchen Coach v0.1")',
    'print("Ana needs", ana_carbs, "g of carbs a day")',
    'print("Ben needs", ben_protein, "g of protein a day")',
    'print("Ben eats", ben_dish)',
    'print("Chloe has", chloe_desserts, "desserts this week")',
    'print("Chloe is gluten-free:", chloe_gluten_free)',
    'print("After a 30 g shake, Ben needs", ben_protein - 30, "g more")'
  ];

  const painPic = `<div style="width:100%">` +
    code(['ben_protein = 140', 'print("Ben needs", ben_protien, "g")'], { title: 'coach.py, a typo', bad: [2] }) +
    term(['$ python3 coach.py', 'Traceback (most recent call last):', '  File "coach.py", line 2, in <module>', '    print("Ben needs", ben_protien, "g")', '                       ^^^^^^^^^^^', "NameError: name 'ben_protien' is not defined. Did you mean: 'ben_protein'?"], 'terminal') +
    code(['print("Ana needs", ana_carbs, "g")', 'ana_carbs = 350'], { title: 'coach.py, the wrong order', bad: [1] }) +
    term(['$ python3 coach.py', 'Traceback (most recent call last):', '  File "coach.py", line 1, in <module>', '    print("Ana needs", ana_carbs, "g")', '                       ^^^^^^^^^', "NameError: name 'ana_carbs' is not defined"], 'terminal') +
    `</div>`;

  const fixLines = [
    'ana_carbs = 350',
    'ben_protein = 140',
    'print("Ana needs", ana_carbs, "g of carbs")',
    'print("Ben needs", ben_protien, "g of protein")',
    'print("Chloe has", chloe_desserts, "desserts")',
    'chloe_desserts = 2'
  ];
  const namesPic = `<div style="width:100%">${run(fixLines, { title: 'coach.py' })}` +
    code(['for = 3', '2nd_course = "soup"', 'ben-protein = 140'], { title: 'names.py, three names Python refuses', bad: [1, 2, 3] }) +
    term([
      '# for = 3',
      '    for = 3',
      '        ^',
      'SyntaxError: invalid syntax',
      '# 2nd_course = "soup"',
      '    2nd_course = "soup"',
      '    ^',
      'SyntaxError: invalid decimal literal',
      '# ben-protein = 140',
      '    ben-protein = 140',
      '    ^^^^^^^^^^^',
      "SyntaxError: cannot assign to expression here. Maybe you meant '==' instead of '='?"
    ], 'terminal, one line at a time') + `</div>`;

  const scaleLines = [
    'servings = 4',
    'print("Plan:", servings, "servings")',
    'servings = servings + 2',
    'print("Ana and Ben want seconds:", servings)',
    'servings += 2',
    'print("Two neighbours drop in:", servings)',
    'servings -= 1',
    'print("Chloe skips the main:", servings)',
    'servings *= 2',
    'print("Double it for lunch tomorrow:", servings)',
    'pasta_grams = servings * 100',
    'print("Cook", pasta_grams, "g of pasta")'
  ];

  const catchLines = [
    'pasta_price = 3',
    'total = pasta_price * 2',
    'print("Total:", total)',
    'pasta_price = 4',
    'print("Price now:", pasta_price)',
    'print("Total:", total)'
  ];
  const catchPic = `<div style="width:100%">${run(catchLines, { title: 'shopping.py' })}` +
    svg(600, 170, 'Two jars. pasta_price now holds 4. total still holds 6, ringed in red: it was worked out when the price was 3 and nobody updated it.',
      jar(70, 14, 180, 140, 'pasta_price', '4') +
      jar(350, 14, 180, 140, 'total', '6', { ring: P.danger, vf: P.danger }) +
      shelf(40, 560, 154) +
      `<line x1="258" y1="84" x2="342" y2="84" stroke="${P.mute}" stroke-width="3" stroke-dasharray="7 7"/>` +
      `<path d="M288 72 l24 24 m0 -24 l-24 24" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
      T(300, 60, 'no link', { s: 12.5, f: P.danger })) +
    code(['ana_carbs = 350', 'last_week = ana_carbs', 'ana_carbs = 400', 'print(ana_carbs, last_week)'], { title: 'targets.py', hi: [2] }) +
    term(['$ python3 targets.py', '400 350'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l11', minutes: 12,
    summary: 'A <b>variable</b> is a <b>name for a value</b>, like a label on a jar. <code>ben_protein = 140</code> means "store 140 in the jar labelled ben_protein". Use the name later and Python opens the jar. Store a new value and the old one is gone. <code>+=</code> updates a jar from its own value.',
    video: {
      src: 'videos/l11-variables.mp4', poster: 'videos/l11-variables.jpg', length: '1 min 8 s',
      script: [
        'Kitchen Coach has a problem. It forgets everything. So give it a shelf of jars.',
        'A variable is a label on a jar. Ben protein, equals, 140. Read the equals sign as store. Put 140 in the jar labelled Ben protein.',
        'Fill two more. Ana carbs, 350. Chloe desserts, 2.',
        'Now use the name, and Python opens the jar. Ben protein minus 20 is 120.',
        'A jar holds one thing at a time. Tip out the 140, and store 150.',
        'Spell the label wrong, and Python stops. NameError. It even asks, did you mean Ben protein?',
        'Now the catch. Pasta costs 3. Total is price times 2, so 6. Then the price goes up to 4. Total is still 6. The equals sign stored a copy, back then. It does not watch the price.',
        'A variable is a name for a value. Label the jar, and use it later.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A variable is a labelled jar.',
        text: [
          'Until now, Kitchen Coach forgot everything. Each number lived on one line and was gone. If Ben\'s target of 140 g appeared three times, you typed 140 three times.',
          'A <b>variable</b> is a <b>name for a value</b>. Think of a jar on a shelf with a label on it. You put a value in, and later you ask for it by its label.',
          '<code>ben_protein = 140</code> reads: "put 140 in the jar labelled <code>ben_protein</code>". The name goes on the left, the value on the right. Here <code>=</code> does not mean "equals". It means <b>store</b>. Lesson 10 showed the difference: <code>==</code> asks a question, <code>=</code> fills a jar.',
          'You have seen this before. In the lesson 5 exercise you wrote <code>my_name = "Sam"</code>. That line made a variable called <code>my_name</code>. Now you know what it was.'
        ],
        tip: 'A name with two words uses an <b>underscore</b> <code>_</code> between them: <code>ben_protein</code>. A space is not allowed inside a name.'
      },
      {
        label: 'The code', pic: run(coachLines, { title: 'coach.py' }),
        h: 'Kitchen Coach v0.1 remembers.',
        text: [
          'Lines 1 to 5 fill five jars. A jar can hold <b>any kind of value</b>: a whole number, text in quotes, or <code>True</code> and <code>False</code>.',
          'The <code>print</code> lines use the <b>names</b>, with no quotes. Python opens each jar and prints what is inside. With quotes, <code>"ana_carbs"</code> would just be text, and Python would print the word.',
          'A name works anywhere its value would. Line 13 does maths with it: <code>ben_protein - 30</code> is 110. The jar still holds 140. Using a value does not take it out.',
          'Press <b>Run</b>. Then Ben raises his target: change <code>140</code> to <code>150</code> on line 2, and run again. You changed one number, and <b>two lines</b> of the output changed.'
        ],
        tip: 'This is the big win. A value you use in many places lives in one jar. Change the jar, and every line that uses the name follows.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A jar with the wrong label does not exist.',
        text: [
          'Python finds a jar by its <b>exact</b> label. <code>ben_protien</code> has two letters swapped, so to Python it is a different name. No jar has that label, and Python stops with a <b>NameError</b>: <code>name \'ben_protien\' is not defined</code>.',
          'Capitals count too. <code>Ana</code> and <code>ana</code> are two different names.',
          'The order matters. Python runs from <b>top to bottom</b>, as in lesson 1. On line 1 of the second program, the jar <code>ana_carbs</code> does not exist yet. It is filled on line 2, one line too late. Same error, same message.'
        ],
        warn: 'A NameError is lesson 4\'s burnt dish that explains itself. The last line names the label Python could not find. Look for a typo, or for a jar that is used before the line that fills it.'
      },
      {
        label: 'The fix', pic: namesPic,
        h: 'Match the label exactly, and fill the jar first.',
        text: [
          'Press <b>Run</b>. Line 4 has a typo. Python even suggests the fix: <code>Did you mean: \'ben_protein\'?</code> Fix the spelling and run again.',
          'Now line 5 stops: <code>chloe_desserts</code> is used before it is filled. Move line 6 above line 5, and all three lines print.',
          'Python also has <b>rules</b> for names. A name uses <b>letters, digits and underscores</b>. It <b>cannot start with a digit</b>, so <code>2nd_course</code> fails. It cannot be one of Python\'s own words, like <code>for</code>, <code>if</code> or <code>True</code>. A minus sign is maths, so <code>ben-protein</code> fails too. These break the rules before anything runs, so you get a <b>SyntaxError</b>, not a NameError.'
        ],
        tip: 'Legal is not the same as good. <code>x = 140</code> works, but in a month you will not know what <code>x</code> is. Lesson 12, Good names, is about picking labels people can read.'
      },
      {
        label: 'Try it', pic: run(scaleLines, { title: 'servings.py' }),
        h: 'Change what is in the jar.',
        text: [
          'Run it. Line 3 looks odd but is common: <code>servings = servings + 2</code>. Python works out the right side first, with the old value: 4 + 2 is 6. Then it stores 6 in the same jar. The 4 is <b>gone</b>. A jar holds one thing at a time.',
          'This is so common that it has a shortcut: <code>servings += 2</code> means "add 2 to what is in the jar". <code>-=</code> takes away and <code>*=</code> multiplies.',
          'Now change the <code>4</code> on line 1 to <code>6</code>. Before you press Run, work out the last line in your head. Then check.'
        ],
        tip: 'You can even put a different kind of value in a jar: <code>servings = "lots"</code> is allowed. But then <code>servings * 100</code> repeats the text 100 times instead of doing maths. Keep one kind of value per jar. Lesson 13, Types and converting, explains the kinds.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: '= stores a value once. It does not keep watching.',
        text: [
          'Run this. <code>total = pasta_price * 2</code> works out <code>3 * 2</code> <b>at that moment</b> and stores 6. Then the price goes up to 4. <code>total</code> is still 6.',
          'The <code>=</code> is not a rule that stays true forever, like in maths class. It is one action: work out the value, put it in the jar, done. The jar <code>total</code> has no idea where its 6 came from.',
          'To fix it, work the total out again after the price changes. Add <code>total = pasta_price * 2</code> above the last line, and run again. Now it says 8.',
          'The same goes for copying one jar into another. <code>last_week = ana_carbs</code> puts a copy of 350 into <code>last_week</code>. Changing <code>ana_carbs</code> later leaves <code>last_week</code> alone.'
        ],
        warn: 'That copy rule is true for numbers and text. Lists, which you meet in module 3, behave differently, and module 9 explains why. For now: a jar keeps its value until a line with <code>=</code> changes that jar.'
      }
    ],
    exercises: [
      {
        file: 'l11_kitchen_coach_v0.py', title: 'Kitchen Coach v0, with jars',
        task: 'Fill jars for the three friends\' targets and for Ben\'s dinner. Then let Python work out <b>how much protein Ben still needs</b> after dinner, using only the jar names, and print it. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the comment at the top for the exact names and values. Write your lines between the <code>START</code> and <code>END</code> lines. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this line do?',
        pic: code(['servings = 4'], { title: 'dinner.py' }),
        options: ['Stores 4 in a jar labelled servings', 'Asks whether servings is 4, and gives True or False', 'Prints 4 on the screen', 'Says that servings is 4 forever'],
        answer: 0,
        why: 'One <code>=</code> means store. The name on the left is the label, the value on the right goes in the jar. Nothing is printed.',
        hint: 'Read the = sign as "store".'
      },
      {
        type: 'fix', q: 'This stops with a NameError. Fix it so it prints <code>Ben still needs 45 g</code>.',
        code: ['ben_protein = 140', 'ben_eaten = 95', 'print("Ben still needs", ben_protien - ben_eaten, "g")'],
        title: 'protein.py',
        check: [
          'if out.strip() == "Ben still needs 45 g":',
          '    ok = True',
          'elif "45" in out:',
          '    msg = "The number is right. Keep the words exactly as they were: Ben still needs 45 g"',
          'else:',
          '    msg = "It printed " + out.strip() + ". Use the two jars: ben_protein - ben_eaten."'
        ].join('\n'),
        why: 'Python finds a jar by its exact label. <code>ben_protien</code> had two letters swapped, so no jar matched. The error even suggested <code>ben_protein</code>.',
        hint: 'Read the last line of the error. Python says which name it does not know, and what you probably meant.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['servings = 4', 'servings = servings + 2', 'servings += 3', 'print(servings)'], { title: 'servings.py' }),
        options: ['9', '4', '7', 'servings'],
        answer: 0,
        why: '4, then 4 + 2 is 6, then 6 + 3 is 9. Each line replaces what was in the jar. <code>print</code> has no quotes around the name, so it prints the value.',
        hint: 'Follow the jar line by line: what is in it after each line?'
      },
      {
        type: 'bucket', q: 'Will Python accept this as a variable name?',
        buckets: ['Allowed', 'Not allowed'],
        items: [
          ['ana_carbs', 0],
          ['protein2', 0],
          ['_total', 0],
          ['Chloe', 0],
          ['2nd_course', 1],
          ['for', 1],
          ['ben-protein', 1],
          ['dessert count', 1]
        ],
        why: 'Letters, digits and underscores, never a digit first, never one of Python\'s own words like <code>for</code>. A minus sign or a space splits the name in two. <code>Chloe</code> is allowed, though Lesson 12 shows why small letters are the usual choice.',
        hint: 'Check four things: only letters, digits and _, no digit at the start, no space, and not a Python word.'
      },
      {
        type: 'pick', q: 'What is the last line printed?',
        pic: code(['pasta_price = 3', 'total = pasta_price * 2', 'pasta_price = 4', 'print(total)'], { title: 'shopping.py' }),
        options: ['6', '8', '4', 'A NameError'],
        answer: 0,
        why: '<code>total</code> was worked out on line 2, when the price was 3. It stored 6 and does not watch the price. To get 8, work the total out again after line 3.',
        hint: 'When was line 2 run, and what was in the price jar at that moment?'
      },
      {
        type: 'order', q: 'Put the lines in order so the program runs and prints <code>Ana needs 350 g of carbs</code>.',
        items: ['ana_carbs = 300', 'ana_carbs += 50', 'print("Ana needs", ana_carbs, "g of carbs")'],
        why: 'The jar must be filled before it is used. Then <code>+= 50</code> turns 300 into 350. Print comes last, so it shows the new value.',
        hint: 'Python runs from the top. A jar has to exist before you add to it or print it.'
      },
      {
        type: 'pick', q: 'Back to lesson 10. Which line <b>asks a question</b> and gives <code>True</code> or <code>False</code>?',
        options: ['oven_temp == 180', 'oven_temp = 180', 'oven_temp += 180', 'oven_temp = "180"'],
        answer: 0,
        why: 'Two equals signs compare. One equals sign stores a value in a jar, and so do <code>+=</code> and friends.',
        hint: 'One = fills a jar. How many = signs does a question need?'
      },
      {
        type: 'type', q: 'Type the shortcut line that adds <b>2</b> to what is in the jar <code>servings</code>.',
        prompt: '>>>',
        answers: ['servings += 2'],
        accept: '^servings\\s?\\+=\\s?2$',
        why: '<code>servings += 2</code> is short for <code>servings = servings + 2</code>.',
        hint: 'The name, then plus and equals together, then 2.'
      }
    ]
  });
})();
