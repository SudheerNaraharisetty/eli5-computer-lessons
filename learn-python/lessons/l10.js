/* Lesson 10: True and False (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T } = PR;

  /* =====================================================================
     l10  True and False
     ===================================================================== */

  // An indicator light on a kitchen panel. on: true (green), false (red)
  const light = (x, y, q, reading, on) => {
    const col = on ? P.ok : P.danger, tint = on ? P.okT : P.dangerT;
    return box(x, y, 176, 196, P.paper2, 16) +
      T(x + 88, y + 30, q, { s: 15 }) +
      `<circle cx="${x + 88}" cy="${y + 82}" r="30" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<ellipse cx="${x + 78}" cy="${y + 70}" rx="9" ry="6" fill="${P.white}" opacity="0.5"/>` +
      `<rect x="${x + 18}" y="${y + 124}" width="140" height="28" rx="8" fill="${P.tint}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x + 88, y + 143, reading, { s: 12.5, m: true }) +
      `<rect x="${x + 38}" y="${y + 158}" width="100" height="28" rx="14" fill="${tint}" stroke="${col}" stroke-width="2"/>` +
      T(x + 88, y + 177, on ? 'True' : 'False', { s: 14, m: true, f: col });
  };

  const ideaPic = svg(600, 290, 'Three kitchen indicator lights. Oven on: 180 degrees, green, True. Water boiling: 96 degrees, red, False. Flour in Chloe\'s dessert: rice, milk, sugar, red, False.',
    light(16, 14, 'Oven on?', '180 °C', true) +
    light(212, 14, 'Water boiling?', '96 °C', false) +
    light(408, 14, 'Flour in it?', 'rice, milk, sugar', false) +
    box(110, 236, 380, 40, P.white, 12) +
    T(300, 262, 'every answer is True or False: a bool', { s: 14 }));

  const nums = [
    'print(type(True))',
    'print(140 >= 120)',
    'print(95 > 100)',
    'print(3 == 3)',
    'print(3 != 4)',
    'print(-18 < 0)',
    'print(180 <= 200)'
  ];
  const names = [
    'print("Ana" == "Ana")',
    'print("Ana" == "ana")',
    'print("Ana" != "ana")',
    'print("flour" in "rice, milk, sugar")',
    'print("flour" in "Flour, cocoa, sugar")'
  ];
  const codePic = `<div style="width:100%">${run(nums, { title: 'questions.py' })}${run(names, { title: 'names.py' })}</div>`;

  // = puts a value in a jar. == is a balance that asks "the same?"
  const jarScale = svg(600, 200, 'Left: one equals sign is a jar label. It puts the value 3 into a jar labelled guests. Right: two equals signs are a balance. It weighs 3 against 3 and answers True.',
    box(16, 12, 270, 176, P.paper2, 16) +
    `<rect x="32" y="26" width="46" height="40" rx="9" fill="#15132B"/>` + T(55, 54, '=', { s: 24, m: true, f: '#FFC24B' }) +
    `<rect x="132" y="28" width="84" height="18" rx="5" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="118" y="46" width="112" height="104" rx="20" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="136" y="60" width="76" height="26" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(174, 78, 'guests', { s: 13 }) +
    `<rect x="156" y="98" width="36" height="36" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(174, 123, '3', { s: 20, m: true, f: P.accent }) +
    T(151, 176, 'puts a value in (lesson 11)', { s: 13, w: 700, f: P.ink2 }) +
    box(314, 12, 270, 176, P.paper2, 16) +
    `<rect x="330" y="26" width="60" height="40" rx="9" fill="#15132B"/>` + T(360, 54, '==', { s: 24, m: true, f: '#FFC24B' }) +
    `<path d="M480 46 V140 M450 146 H510" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" fill="none"/>` +
    `<line x1="410" y1="46" x2="550" y2="46" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M398 100 H446 Q422 120 398 100 Z M514 100 H562 Q538 120 514 100 Z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M422 46 L404 100 M422 46 L440 100 M538 46 L520 100 M538 46 L556 100" stroke="${P.ink}" stroke-width="1.5"/>` +
    `<rect x="408" y="72" width="28" height="28" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(422, 92, '3', { s: 16, m: true, f: P.accent }) +
    `<rect x="524" y="72" width="28" height="28" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(538, 92, '3', { s: 16, m: true, f: P.accent }) +
    `<circle cx="480" cy="46" r="6" fill="${P.ink}"/>` +
    `<rect x="340" y="120" width="70" height="26" rx="13" fill="${P.okT}" stroke="${P.ok}" stroke-width="2"/>` + T(375, 138, 'True', { s: 13, m: true, f: P.ok }) +
    T(449, 176, 'asks: are these the same?', { s: 13, w: 700, f: P.ink2 }));

  const painPic = `<div style="width:100%">${jarScale}` +
    code(['print(3 = 3)'], { title: 'chairs.py', bad: [1] }) +
    term(['$ python3 chairs.py', '  File "chairs.py", line 1', '    print(3 = 3)', '          ^^^', 'SyntaxError: expression cannot contain assignment, perhaps you meant "=="?'], 'terminal') +
    code(['print(true)'], { title: 'oven.py', bad: [1] }) +
    term(['$ python3 oven.py', 'Traceback (most recent call last):', '  File "oven.py", line 1, in <module>', '    print(true)', '          ^^^^', "NameError: name 'true' is not defined. Did you mean: 'True'?"], 'terminal') +
    `</div>`;

  const broken = [
    'print(3 = 3)',
    'print(true)'
  ];

  const checklist = [
    'print("Kitchen checklist")',
    'print("Oven on?", 0 > 0)',
    'print("Water boiling?", 96 >= 100)',
    'print("Ben\'s protein on target?", 140 >= 120)',
    'print("Ana\'s pasta over her plan?", 95 > 100)',
    'print("Flour in dessert?", "flour" in "rice, milk, sugar")'
  ];

  const catchLines = [
    'print("3" == 3)',
    'print("Ana " == "Ana")',
    'print(0.1 + 0.2 == 0.3)',
    'print(round(0.1 + 0.2, 2) == 0.3)'
  ];

  COURSE.add({
    id: 'l10', minutes: 9,
    summary: 'A <b>bool</b> is the third basic kind of value. It has exactly two values: <code>True</code> and <code>False</code>, each with a capital letter. You get one by asking a question: <code>140 &gt;= 120</code> gives <code>True</code>. Two equals signs <code>==</code> ask "are these the same?". One <code>=</code> does something else.',
    video: {
      src: 'videos/l10-true-and-false.mp4', poster: 'videos/l10-true-and-false.jpg', length: '1 min 7 s',
      script: [
        'Your kitchen is full of yes or no questions. Is the oven on? Is the water boiling? Is there flour in Chloe\'s dessert?',
        'Python answers with 2 values. True, and False. Capital T, capital F. They are a new kind of value, called a bool.',
        'You get one by asking a question. The oven is at 0 degrees. Is that more than 0? False. Turn it up to 180. True.',
        'The water is at 96. Is it at least 100? False. Later, it hits 100. True.',
        'Text can answer too. Is flour in rice pudding? False. Safe for gluten free Chloe.',
        'Now the trap. One equals sign is a jar label. It puts a value in. Two equals signs are a balance. They ask, are these the same? Use one where you meant two, and Python stops, and suggests two.',
        'And true, with a small t? Python has never heard of it.',
        'Ask a question. Get True or False.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A kitchen full of yes or no questions.',
        text: [
          'Cooking is full of small questions. Is the oven on? Is the water boiling? Is there flour in Chloe\'s dessert? She eats no gluten, so that one matters.',
          'Each question has only two answers: yes or no. A light on the oven is either on or off. Nothing in between.',
          'Python has a kind of value just for this. It is called a <b>bool</b>, and it has exactly two values: <code>True</code> and <code>False</code>. That makes three basic kinds so far: numbers (lesson 6), text (lesson 8), and now yes or no.'
        ],
        tip: '"Bool" is short for George <b>Boole</b>, a mathematician who wrote about true and false logic in the 1850s.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Ask a question, get True or False.',
        text: [
          'You rarely type <code>True</code> or <code>False</code> yourself. You get them by <b>asking</b>. A <b>comparison</b> puts two values side by side and asks a question about them:',
          '<code>==</code> the same? <code>!=</code> different? <code>&lt;</code> less than? <code>&gt;</code> more than? <code>&lt;=</code> at most? <code>&gt;=</code> at least? So <code>140 &gt;= 120</code> asks "is 140 grams of protein at least Ben\'s 120 gram target?". Python answers <code>True</code>.',
          'Text works too. <code>==</code> on text is <b>exact</b>, letter by letter, and capitals count: <code>"Ana" == "ana"</code> is <code>False</code>. <code>in</code> from lesson 9 is a question as well: is this word inside that text?',
          'Press <b>Run</b> on both boxes. Then change <code>95</code> to <code>105</code> in the first box and watch a <code>False</code> flip to <code>True</code>.'
        ],
        tip: 'Lesson 21, Comparisons, goes deeper. A bit of trivia: Python counts <code>True</code> as 1 and <code>False</code> as 0, so <code>True + True</code> is <code>2</code>. Fun to know, but do not write code like that.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One equals sign, and a small t.',
        text: [
          'Pain number 1: <b>one</b> equals sign. In maths class, <code>3 = 3</code> means "the same". In Python, one <code>=</code> means something else: <b>put a value in a labelled jar</b>. You meet it in lesson 11, Variables. The question "are these the same?" needs <b>two</b>: <code>==</code>.',
          'Write one where you meant two, and Python cannot even read the line. It stops with a <code>SyntaxError</code>. Read the last line: it even says <code>perhaps you meant "=="?</code>',
          'Pain number 2: a <b>small t</b>. <code>true</code> is not a word Python knows. Only <code>True</code>, with a capital T, is the bool. Python stops with a <code>NameError</code> and guesses the fix: <code>Did you mean: \'True\'?</code>'
        ],
        warn: 'This one-or-two equals mix-up catches almost every beginner, and plenty of experienced programmers on a tired day. When you mean a question, say it twice: <code>==</code>.'
      },
      {
        label: 'The fix', pic: run(broken, { title: 'fix_me.py' }),
        h: 'Two equals signs for a question. Capital T for True.',
        text: [
          'Press <b>Run</b>. Python stops on line 1 with the <code>SyntaxError</code>. Change <code>=</code> to <code>==</code> and run again.',
          'Now line 1 prints <code>True</code>, and Python stops on line 2 with the <code>NameError</code>. Change <code>true</code> to <code>True</code> and run once more. Two lines of <code>True</code>.',
          'Notice the order. A SyntaxError stops Python <b>before</b> anything runs, because it cannot read the recipe at all. A NameError only appears when Python reaches that line.'
        ],
        tip: 'Some code editors show <code>==</code> as one joined symbol. It is still two characters. Type two equals signs, with no space between them.'
      },
      {
        label: 'Try it', pic: run(checklist, { title: 'kitchen_checklist.py' }),
        h: 'Your kitchen checklist.',
        text: [
          '<code>print</code> can show several things at once. Put commas between them, and Python shows them on one line with a space between each. Here each line shows a question, then its answer.',
          'Press <b>Run</b>. The oven is off and the water is not boiling yet. Change <code>0</code> to <code>180</code> on line 2 and <code>96</code> to <code>100</code> on line 3, so both flip to <code>True</code>.',
          'Now break Ana\'s plan: give her pasta <code>110</code> grams of carbs instead of <code>95</code>. Then add <code>", flour"</code> to the end of Chloe\'s ingredients, inside the quotes, and watch her answer change.'
        ],
        tip: 'Every answer in this checklist is worked out by Python. In module 2 your program will <b>act</b> on the answers: lesson 19, <code>if</code>, tastes and decides, and lesson 22 combines questions with <code>and</code>, <code>or</code> and <code>not</code>.'
      },
      {
        label: 'The catch', pic: run(catchLines, { title: 'surprises.py' }),
        h: 'False, with no error.',
        text: [
          'Some comparisons answer <code>False</code> when you expected <code>True</code>, and Python does not warn you. Press <b>Run</b> and look at each one.',
          '<code>"3" == 3</code> is <code>False</code>. Text that looks like a number is still text, and text is never equal to a number. No error, just <code>False</code>. Lesson 13 shows how to turn <code>"3"</code> into <code>3</code>.',
          '<code>"Ana " == "Ana"</code> is <code>False</code> too. The space at the end counts. So do capitals. The text tools from lesson 9, like <code>strip</code> and <code>lower</code>, help you tidy text before you compare it.',
          'And from lesson 6: <code>0.1 + 0.2 == 0.3</code> is <code>False</code>, because floats are a tiny bit off. Round the sum first, as the last line does, and the answer is <code>True</code>.'
        ],
        warn: 'A wrong <code>False</code> is quiet. The program keeps going and simply gives the wrong answer. When a check surprises you, print both sides and look at them closely: the type, the spaces, the capitals, the digits.'
      }
    ],
    exercises: [
      {
        file: 'l10_kitchen_checks.py', title: 'Four kitchen checks',
        task: 'Answer <b>four yes or no questions</b> about tonight\'s dinner: the oven, Ben\'s protein, Ana\'s pasta and Chloe\'s dessert. Each answer must come from a <b>comparison</b> that Python works out, not from typing <code>True</code> or <code>False</code> yourself. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the four questions at the top of the file. Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> with a comparison that uses the numbers or words from its question. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.',
          'If Python stops with a <code>SyntaxError</code> before the check runs, read its last line. One <code>=</code> where you meant <code>==</code> is the usual reason.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which of these is a bool value that Python knows?',
        options: ['True', 'true', '"True"', 'TRUE'],
        answer: 0,
        why: 'Only <code>True</code>, with a capital T and the rest small, is the bool. <code>true</code> and <code>TRUE</code> give a NameError, and <code>"True"</code> in quotes is text.',
        hint: 'Capitals matter, and quote marks make text.'
      },
      {
        type: 'bucket', q: 'What does Python answer for each question?',
        buckets: ['True', 'False'],
        items: [
          ['140 >= 120', 0],
          ['95 > 100', 1],
          ['3 != 4', 0],
          ['100 >= 100', 0],
          ['2 < 2', 1],
          ['"Ana" == "ana"', 1],
          ['"flour" in "rice, milk, sugar"', 1]
        ],
        why: '<code>&gt;=</code> includes "equal", so <code>100 &gt;= 100</code> is True, while <code>2 &lt; 2</code> is not. Text must match exactly, capitals included, and the word "flour" is not in the rice pudding.',
        hint: 'Read each sign out loud: "at least", "more than", "different from", "less than", "the same as".'
      },
      {
        type: 'match', q: 'Match each sign to the question it asks.',
        pairs: [
          ['==', 'Are these the same?'],
          ['!=', 'Are these different?'],
          ['>=', 'Is the left at least the right?'],
          ['<=', 'Is the left at most the right?'],
          ['>', 'Is the left more than the right?'],
          ['<', 'Is the left less than the right?']
        ],
        why: 'Two equals signs ask "the same?". An exclamation mark in front means "not". A trailing <code>=</code> on <code>&lt;</code> or <code>&gt;</code> lets "equal" count as yes.',
        hint: 'The open side of < and > faces the bigger value.'
      },
      {
        type: 'fix', q: 'This line should print <code>Water boiling? True</code>, but Python stops. Fix it.',
        code: ['print("Water boiling?", 100 = 100)'],
        title: 'pot.py',
        check: [
          'if out.strip() == "Water boiling? True":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Keep the words and both numbers, and ask the question with two equals signs."'
        ].join('\n'),
        why: 'One <code>=</code> puts a value in a jar. Two <code>==</code> ask "are these the same?", and 100 is the same as 100.',
        hint: 'Python\'s error says <code>perhaps you meant "=="?</code>. It is right.'
      },
      {
        type: 'fix', q: 'Your guest list says <code>Ana</code>, but the name was typed as <code>ana</code>. Fix the second name so the line prints <code>True</code>.',
        code: ['print("Ana" == "ana")'],
        title: 'guests.py',
        check: [
          'if out.strip() == "True":',
          '    ok = True',
          'elif out.strip() == "False":',
          '    msg = "Still False. Text must match exactly, capital letters included."',
          'else:',
          '    msg = "It printed " + out.strip() + ". Keep the == question and fix the name."'
        ].join('\n'),
        why: 'With <code>==</code>, text must match letter by letter. A capital A and a small a are different letters to Python.',
        hint: 'Look at the first letter of each name.'
      },
      {
        type: 'pick', q: 'What does this show?',
        pic: code(['print("3" == 3)'], { title: 'chairs.py' }),
        options: ['False', 'True', 'A TypeError', '3'],
        answer: 0,
        why: '<code>"3"</code> is text and <code>3</code> is a number. Text is never equal to a number, so the answer is <code>False</code>, quietly, with no error.',
        hint: 'One of them has quote marks. What kind of value does that make it?'
      },
      {
        type: 'pick', q: 'Back to lesson 6. What does this show?',
        pic: code(['print(1_000_000 == 1000000)'], { title: 'flour.py' }),
        options: ['True', 'False', 'A SyntaxError', '1000000'],
        answer: 0,
        why: 'The underscores are only there for your eyes. Python reads <code>1_000_000</code> as the same number as <code>1000000</code>, so <code>==</code> answers <code>True</code>.',
        hint: 'Does Python care about the underscores inside a number?'
      },
      {
        type: 'type', q: 'Ben has eaten 140 grams of protein. Type the line that asks Python whether that is <b>at least</b> his 120 gram target.',
        prompt: '>>>',
        answers: ['print(140 >= 120)'],
        accept: '^print\\(\\s*(140\\s*>=\\s*120|120\\s*<=\\s*140)\\s*\\)$',
        why: '<code>&gt;=</code> means "at least", so <code>print(140 &gt;= 120)</code> shows <code>True</code>.',
        hint: 'print, brackets, the two numbers, and the "at least" sign between them: a greater-than and an equals.'
      }
    ]
  });
})();
