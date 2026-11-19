/* Lesson 6: Numbers (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l06  Numbers
     ===================================================================== */

  // A display window with a value in it, like the screen on a kitchen tool.
  const lcd = (x, y, w, val, fill, col) =>
    `<rect x="${x}" y="${y}" width="${w}" height="52" rx="10" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + w / 2, y + 36, val, { s: 26, m: true, f: col || P.ink });
  const chip = (x, y, w, s) => box(x, y, w, 30, P.white, 15) + T(x + w / 2, y + 20, s, { s: 12.5 });

  const toolsPic = svg(600, 300, 'Two kitchen tools. A counter shows 3, for 3 guests, 12 cookies and Chloe\'s 3 desserts: whole numbers, called int. A scale shows 2.5, for Ana\'s 2.5 kg of pasta and 0.75 litres of milk: numbers with a point, called float.',
      // counter
      box(16, 16, 276, 268, P.paper2, 18) +
      T(36, 50, 'Counter', { s: 19, a: 'start' }) + T(36, 72, 'for things you count', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
      box(206, 30, 70, 32, P.accent, 16) + T(241, 52, 'int', { s: 16, m: true, f: P.white }) +
      `<rect x="34" y="92" width="240" height="84" rx="20" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="214" y="84" width="36" height="12" rx="5" fill="${P.accent}" stroke="${P.ink}" stroke-width="2"/>` +
      lcd(52, 108, 204, '3', P.tint) +
      chip(34, 194, 108, '3 guests') + chip(152, 194, 122, '12 cookies') + chip(34, 238, 180, 'Chloe: 3 desserts') +
      // scale
      box(308, 16, 276, 268, P.paper2, 18) +
      T(328, 50, 'Scale', { s: 19, a: 'start' }) + T(328, 72, 'for things you measure', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
      box(484, 30, 84, 32, P.accent, 16) + T(526, 52, 'float', { s: 16, m: true, f: P.white }) +
      `<rect x="376" y="86" width="160" height="8" rx="4" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="326" y="96" width="240" height="80" rx="20" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      lcd(344, 110, 204, '2.5', P.okT) +
      chip(326, 194, 170, 'Ana: 2.5 kg pasta') + chip(326, 238, 120, '0.75 l milk'));

  const nums = [
    'print(3)',
    'print(type(3))',
    'print(2.5)',
    'print(type(2.5))',
    'print(-18)',
    'print(type(-18))',
    'print(1_000_000)',
    'print(type(1_000_000))'
  ];

  const painPic = `<div style="width:100%">` +
    code(['print("Guests tonight:")', 'print(2.0)'], { title: 'party.py', bad: [2] }) +
    term(['$ python3 party.py', 'Guests tonight:', '2.0'], 'terminal') +
    code(['print(0.1 + 0.2)'], { title: 'scale.py', hi: [1] }) +
    term(['$ python3 scale.py', '0.30000000000000004'], 'terminal') +
    svg(600, 120, 'A ruler of Python\'s own unit. Its marks never land exactly on 0.3, so the nearest mark is a tiny bit off.',
      `<line x1="40" y1="70" x2="560" y2="70" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
      [60, 112, 164, 216, 268, 320, 372, 424, 476, 528].map(x => `<line x1="${x}" y1="56" x2="${x}" y2="84" stroke="${x === 268 ? P.danger : P.ink}" stroke-width="3" stroke-linecap="round"/>`).join('') +
      `<line x1="278" y1="34" x2="278" y2="96" stroke="${P.accent}" stroke-width="3" stroke-dasharray="6 5"/>` +
      T(278, 26, 'exactly 0.3', { s: 13, f: P.accent }) +
      T(300, 114, 'Python\'s marks never land on 0.3. The nearest one is a hair off.', { s: 12.5, w: 700, f: P.ink2 })) +
    `</div>`;

  const fixLines = [
    'print(3)',
    'print(0.1 + 0.2)',
    'print(round(0.1 + 0.2, 2))',
    'print(1.10 + 2.20)',
    'print(round(1.10 + 2.20, 2))'
  ];

  const tryLines = [
    'print(140)',
    'print(type(140))',
    'print(2.5)',
    'print(type(2.5))'
  ];

  const catchPic = `<div style="width:100%">` +
    code(['print(0.1 + 0.2 == 0.3)'], { title: 'scale.py', bad: [1] }) +
    term(['$ python3 scale.py', 'False'], 'terminal') +
    svg(600, 150, 'A balance. On one side 0.1 plus 0.2, on the other 0.3. It tips a tiny bit, so Python says they are not equal.',
      `<path d="M300 40 L300 128 M250 132 H350" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
      `<g transform="rotate(-3 300 40)"><line x1="120" y1="40" x2="480" y2="40" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
      box(70, 50, 120, 40, P.dangerT, 10) + T(130, 76, '0.1 + 0.2', { s: 15, m: true }) +
      box(410, 50, 120, 40, P.okT, 10) + T(470, 76, '0.3', { s: 15, m: true }) + `</g>` +
      `<circle cx="300" cy="40" r="7" fill="${P.ink}"/>` +
      T(300, 146, 'off by a tiny tail, so Python says "not equal"', { s: 12.5, w: 700, f: P.danger })) + `</div>`;

  COURSE.add({
    id: 'l06', minutes: 9,
    summary: 'Python has two kinds of number. An <b>int</b> is a whole number, for things you <b>count</b>: 3 guests. A <b>float</b> has a point, for things you <b>measure</b>: 2.5 kg of pasta. <code>type()</code> tells you which kind a value is.',
    video: {
      src: 'videos/l06-numbers.mp4', poster: 'videos/l06-numbers.jpg', length: '1 min 1 s',
      script: [
        'In your kitchen, some numbers you count, and some you measure.',
        'You count on a counter. 3 guests. 12 cookies. 3 desserts for Chloe.',
        'You measure on a scale. 2.5 kilos of pasta for Ana. 0.75 litres of milk.',
        'Python keeps the two apart. A whole number is an int. A number with a point is a float. Ask type, and Python names the kind.',
        'So count with int. 2.0 guests makes no sense.',
        'Now a surprise on the scale. 0.1, plus 0.2. Python shows 0.3, then a long tail of zeros, and a 4 at the end.',
        'Python\'s scale weighs in a slightly different unit, so some amounts can never be hit exactly. It gets very, very close.',
        'To show it nicely, round it to 2 places. 0.3.',
        'Count with int. Measure with float.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: toolsPic,
        h: 'Some numbers you count. Some you measure.',
        text: [
          'Look around your kitchen. Some numbers are <b>counts</b>: 3 guests, 12 cookies, Chloe\'s 3 desserts. You never have half a guest.',
          'Other numbers are <b>measures</b>: Ana\'s 2.5 kg of pasta for training week, 0.75 litres of milk. Here the part after the point matters.',
          'Python keeps the two apart. A whole number is an <b>int</b> (short for integer). A number with a point is a <b>float</b>. A counter for ints, a scale for floats.'
        ],
        tip: 'Grams can go either way. Ben plans his protein in whole grams, 140 a day, so for him an int is fine. When the part after the point matters, use a float.'
      },
      {
        label: 'The code', pic: run(nums, { title: 'numbers.py' }),
        h: 'Write a number with no quote marks.',
        text: [
          'In lesson 1 you printed words inside quote marks. A number goes into <code>print</code> <b>without</b> quote marks: <code>print(3)</code>.',
          '<code>type(...)</code> asks Python "what kind of value is this?". Put it inside <code>print</code> to see the answer: <code>&lt;class \'int\'&gt;</code> for 3, <code>&lt;class \'float\'&gt;</code> for 2.5. "Class" is Python\'s word for "kind".',
          'A minus sign makes a <b>negative</b> number. Your freezer sits at <code>-18</code> degrees, and that is still an int.',
          'Big numbers are hard to read. Write <code>1_000_000</code> with underscores where you would put spaces. Python ignores them and prints <code>1000000</code>. You cannot use spaces or commas inside a number.',
          'Press <b>Run</b>. Then change <code>2.5</code> to <code>2</code> on lines 3 and 4 and run again. The kind changes to int.'
        ],
        tip: '<code>print(200)</code> and <code>print("200")</code> show the same thing on the screen: 200. But the first is a number and the second is <b>text</b> that looks like a number. Try <code>print(type("200"))</code>: Python says <code>str</code>, its short name for text. Lesson 8 is about text, and lesson 13 shows why the difference matters.'
      },
      {
        label: 'The pain', pic: painPic,
        h: '2.0 guests, and a strange 4.',
        text: [
          'Pain number 1: a float where a count belongs. <code>2.0</code> guests reads oddly, and it is a float, not an int. Later, some tools <b>refuse</b> a float. In lesson 27 you will stir 20 times with <code>range</code>, and <code>range(2.0)</code> stops with <code>TypeError: \'float\' object cannot be interpreted as an integer</code>.',
          'Pain number 2: the scale is a tiny bit off. <code>0.1 + 0.2</code> should be 0.3. Python prints <code>0.30000000000000004</code>. (The <code>+</code> adds, just like on a calculator. Lesson 7 does all the maths.)',
          'Why? Python\'s scale weighs in a slightly <b>different unit</b> from ours. Some amounts, like 0.1, cannot be weighed exactly in that unit. Python picks the nearest mark it has. It is very, very close, but not exact.'
        ],
        warn: 'This is not a bug in Python, and it is not your mistake. Every programming language that uses floats does the same. The tail is tiny: the 4 sits 17 places after the point.'
      },
      {
        label: 'The fix', pic: run(fixLines, { title: 'scale.py' }),
        h: 'Count with int. Round floats when you show them.',
        text: [
          'For a count, write a whole number: <code>3</code>, not <code>3.0</code>. Then it is an int, and Python treats it as a count.',
          'For a measure you want to <b>show</b>, use <code>round</code>. <code>round(0.1 + 0.2, 2)</code> means "round this to 2 digits after the point". The number goes first, then a comma, then how many digits you want.',
          'It works for money too. A loaf at 1.10 plus butter at 2.20 prints a long tail. Rounded to 2 places it shows <code>3.3</code>.',
          'Press <b>Run</b> and compare each line with the rounded one under it.'
        ],
        tip: '<code>round</code> drops a zero at the end, so you get <code>3.3</code>, not <code>3.30</code>. Lesson 15, f-strings, shows how to always print 2 digits, like a price tag.'
      },
      {
        label: 'Try it', pic: run(tryLines, { title: 'coach.py' }),
        h: 'Ben\'s protein and Ana\'s pasta.',
        text: [
          'Ben aims for <b>140 grams</b> of protein a day, planned in whole grams. Ana buys <b>2.5 kg</b> of pasta for training week. Press Run and check the kinds.',
          'Now change <code>140</code> to <code>140.0</code> on both lines and run again. Same amount, but now it is a float.',
          'Add a line <code>print(0.1 + 0.7)</code>. What does the scale say? Then wrap it in <code>round(..., 2)</code> and run once more.'
        ],
        tip: 'In the terminal, type <code>python3</code> on its own (on Windows, <code>py</code>) to get a <code>&gt;&gt;&gt;</code> prompt. Type <code>2.5</code> and press Enter, and Python shows it straight back. Type <code>exit()</code> to leave.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Never ask if two floats are exactly equal.',
        text: [
          '<code>==</code> asks Python "are these two exactly the same?". It answers <code>True</code> (yes) or <code>False</code> (no). Lesson 10 covers True and False, lesson 21 covers comparisons.',
          'Ask it about <code>0.1 + 0.2</code> and <code>0.3</code>, and Python says <code>False</code>. They differ by a tiny tail, and <code>==</code> checks every last digit.',
          'So when <b>money</b> or <b>weights</b> matter, never test floats for exact equality. Later lessons show the safe ways. For now: count with int, measure with float, and round when you show a float.'
        ],
        warn: 'A program that checks "has Ben eaten exactly 0.3 kg?" with floats can say no when the answer is yes. No error appears. The result is just wrong.'
      }
    ],
    exercises: [
      {
        file: 'l06_numbers.py', title: 'Count it or weigh it',
        task: 'Replace the placeholders so the program prints <b>Ben\'s protein target</b> (140 grams a day) as an <b>int</b> and <b>Ana\'s pasta</b> (2.5 kg) as a <b>float</b>, each followed by its <code>type()</code>. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> with a number. No quote marks, no units. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Is this value an int or a float?',
        buckets: ['int', 'float'],
        items: [
          ['3', 0],
          ['2.5', 1],
          ['-18', 0],
          ['1_000_000', 0],
          ['2.0', 1],
          ['0.75', 1],
          ['140', 0]
        ],
        why: 'A point makes it a float, even <code>2.0</code>. No point makes it an int, even with a minus sign or underscores.',
        hint: 'Look for a point. That is the only thing that decides it.'
      },
      {
        type: 'pick', q: 'What does this line show?',
        pic: code(['print(type(0.75))'], { title: 'milk.py' }),
        options: ["<class 'float'>", "<class 'int'>", '0.75', 'float 0.75'],
        answer: 0,
        why: '<code>type()</code> names the kind, and <code>print</code> shows it. 0.75 has a point, so it is a float.',
        hint: 'type() does not show the value itself. It shows the kind.'
      },
      {
        type: 'pick', q: 'You are writing down how many guests come tonight. Which value fits best?',
        options: ['3', '3.0', '"3"', '3.5'],
        answer: 0,
        why: 'Guests are counted, so a whole number, an int. <code>3.0</code> is a float, <code>"3"</code> is text, and nobody brings half a guest.',
        hint: 'Count or measure? And which one is a number, not text?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['print(1_000_000)'], { title: 'flour.py' }),
        options: ['1000000', '1_000_000', '1,000,000', 'An error'],
        answer: 0,
        why: 'Underscores only help <b>you</b> read the number. Python ignores them and prints the plain number.',
        hint: 'Are the underscores part of the number, or just there for your eyes?'
      },
      {
        type: 'fix', q: 'Chloe has 3 desserts on the menu, but this prints <code>3.0</code>. Make it print <code>3</code>, a count.',
        code: ['print(3.0)'],
        title: 'desserts.py',
        check: [
          'if out.strip() == "3":',
          '    ok = True',
          'elif out.strip() == "3.0":',
          '    msg = "It still prints 3.0. Desserts are counted: drop the point and the zero."',
          'else:',
          '    msg = "It printed " + out.strip() + ". It should print just 3."'
        ].join('\n'),
        why: 'Without the point, <code>3</code> is an int: the right kind for a count.',
        hint: 'A whole number has no point.'
      },
      {
        type: 'fix', q: 'The scale shows a long tail. Keep the sum, but make it print <code>0.3</code> by rounding to 2 places.',
        code: ['print(0.1 + 0.2)'],
        title: 'scale.py',
        check: [
          'if out.strip() == "0.3":',
          '    ok = True',
          'elif out.strip() == "0.30000000000000004":',
          '    msg = "Still the long tail. Wrap the sum: round(0.1 + 0.2, 2)"',
          'else:',
          '    msg = "It printed " + out.strip() + ". Round to 2 places: the sum first, then a comma, then 2."'
        ].join('\n'),
        why: '<code>round(0.1 + 0.2, 2)</code> rounds to 2 digits after the point, so the tiny tail disappears from what you show.',
        hint: 'Put round( in front of the sum, and , 2) after it, inside the print brackets.'
      },
      {
        type: 'pick', q: 'Back to lesson 4. You want to print one million and type it with spaces. Python stops. What is the right fix?',
        pic: code(['print(1 000 000)'], { title: 'flour.py' }) +
          term(['$ python3 flour.py', '  File "flour.py", line 1', '    print(1 000 000)', '          ^^^^^', 'SyntaxError: invalid syntax. Perhaps you forgot a comma?'], 'terminal'),
        options: ['print(1_000_000)', 'print(1, 000, 000)', 'print(1000 000)', 'print(1.000.000)'],
        answer: 0,
        why: 'Read the last line first: a SyntaxError, so Python could not even read the line. Its guess about a comma is wrong here: <code>print(1, 000, 000)</code> runs, but prints <code>1 0 0</code>. Underscores are the way to space out a number.',
        hint: 'Python\'s guess is not always right. Which one writes a single big number?'
      },
      {
        type: 'type', q: 'Type the line that shows what kind of value <code>-18</code> is (your freezer temperature).',
        prompt: '>>>',
        answers: ['print(type(-18))'],
        why: '<code>type(-18)</code> asks the kind, and <code>print</code> shows the answer: <code>&lt;class \'int\'&gt;</code>. A minus sign does not make it a float.',
        hint: 'print, then type, then the number. Two pairs of brackets.'
      }
    ]
  });
})();
