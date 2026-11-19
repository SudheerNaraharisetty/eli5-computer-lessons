/* Lesson 13: Types and converting (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l13  Types and converting
     ===================================================================== */

  // A paper delivery note with a handwritten-looking amount on it.
  const note = (x, y, item, amount) =>
    box(x, y, 170, 150, P.paper2, 8) +
    `<path d="M${x + 18} ${y + 52} H${x + 152} M${x + 18} ${y + 124} H${x + 152}" stroke="${P.sand}" stroke-width="2.5"/>` +
    T(x + 85, y + 36, 'DELIVERY NOTE', { s: 11.5, f: P.ink2 }) +
    T(x + 85, y + 78, item, { s: 15, w: 700, f: P.ink2 }) +
    T(x + 85, y + 112, amount, { s: 26, m: true, f: P.danger });

  // A kitchen scale. reading: the text on its display.
  const scale = (x, y, reading) =>
    `<rect x="${x + 30}" y="${y}" width="120" height="16" rx="6" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 86}" y="${y + 16}" width="8" height="18" fill="${P.ink}"/>` +
    box(x, y + 34, 180, 92, P.white, 16) +
    `<rect x="${x + 26}" y="${y + 52}" width="128" height="44" rx="8" fill="#15132B"/>` +
    T(x + 90, y + 82, reading, { s: 20, m: true, f: '#7CF0B5' }) +
    `<circle cx="${x + 90}" cy="${y + 110}" r="6" fill="${P.ink}"/>`;

  const kind = (x, y, val, name, col) =>
    box(x, y, 128, 66, P.white, 12) +
    T(x + 64, y + 30, val, { s: 18, m: true, f: col }) +
    T(x + 64, y + 52, name, { s: 12.5, w: 700, f: P.ink2 });

  const ideaPic = svg(600, 330, 'A delivery note says "200 g" for rice. An arrow labelled int() reads the note and puts 200 grams on the kitchen scale. Below, four kinds of value: 42 is an int, 38.5 is a float, "42" in quotes is a str, and True is a bool.',
    note(24, 18, 'Rice', '"200"') +
    T(109, 192, 'text: you can read it', { s: 12.5, w: 700, f: P.danger }) +
    arrow(214, 92, 382, 92, P.accent, 3.5) +
    `<rect x="252" y="62" width="92" height="34" rx="10" fill="${P.tint}" stroke="${P.accent}" stroke-width="2"/>` +
    T(298, 85, 'int()', { s: 16, m: true, f: P.accent }) +
    T(298, 124, 'read the label', { s: 12.5, w: 700, f: P.ink2 }) +
    `<rect x="440" y="10" width="64" height="38" rx="10" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(472, 35, 'rice', { s: 13, f: P.warn }) +
    scale(392, 48, '200 g') +
    T(482, 192, 'a number: you can weigh it', { s: 12.5, w: 700, f: P.ok }) +
    `<line x1="20" y1="216" x2="580" y2="216" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    kind(20, 236, '42', 'int', P.accent) +
    kind(166, 236, '38.5', 'float', P.accent) +
    kind(312, 236, '"42"', 'str', P.danger) +
    kind(458, 236, 'True', 'bool', P.ok) +
    T(300, 326, 'every value has a type. type() tells you which', { s: 12.5, w: 700, f: P.ink2 }));

  const types = [
    'print(type(42))',
    'print(type(38.5))',
    'print(type("42"))',
    'print(type(True))',
    'print(3 + 2.0)',
    'print(isinstance(42, int))',
    'print(isinstance("42", int))'
  ];
  const convert = [
    'label = "200"',
    'grams = int(label)',
    'print(grams + 50)',
    'print(float("38.5") + 1.5)',
    'print(str(140) + " grams")',
    'print(int(2.9))',
    'print(round(2.9))',
    'print(bool(0), bool("Ana"))'
  ];
  const codePic = `<div style="width:100%">${run(types, { title: 'types.py' })}${run(convert, { title: 'convert.py' })}</div>`;

  const glue = ['rice = "200"', 'extra = "50"', 'print(rice + extra)'];
  const chop = ['protein = "38.5"', 'grams = int(protein)', 'print(grams, "grams of protein")'];
  const painPic = `<div style="width:100%">` +
    code(glue, { title: 'delivery.py', bad: [3] }) +
    term(['$ python3 delivery.py', '20050'], 'terminal') +
    code(chop, { title: 'protein.py', bad: [2] }) +
    term(['$ python3 protein.py', 'Traceback (most recent call last):', '  File "protein.py", line 2, in <module>', '    grams = int(protein)', "ValueError: invalid literal for int() with base 10: '38.5'"], 'terminal') +
    `</div>`;

  const reader = [
    '# Ben\'s protein, copied from three nutrition labels',
    'breakfast = "24"',
    'lunch = "38"',
    'dinner = "45"',
    'print("Protein today:", breakfast + lunch + dinner)'
  ];

  const tryLines = [
    'label = "38.5"',
    'grams = int(label)',
    'print(grams, "grams of protein")'
  ];

  const catchLines = [
    'print(int(2.9))',
    'print(round(2.9))',
    'print(str(0.1 + 0.2))',
    'print(str(round(0.1 + 0.2, 2)))'
  ];

  COURSE.add({
    id: 'l13', minutes: 9,
    summary: 'Every value has a <b>type</b>: <code>int</code>, <code>float</code>, <code>str</code> or <code>bool</code>. To change one into another, call the type like a tool: <code>int("200")</code> gives the number <code>200</code>, <code>float("38.5")</code> gives <code>38.5</code>, <code>str(140)</code> gives the text <code>"140"</code>. Text from forms, files and <code>input()</code> is <b>always</b> text, so <b>convert it before you do maths</b>.',
    video: {
      src: 'videos/l13-converting.mp4', poster: 'videos/l13-converting.jpg', length: '1 min 8 s',
      script: [
        'A delivery arrives. The note says 200 grams of rice. But a note is only writing. You cannot weigh it.',
        'Python sees the same difference. 200 in quote marks is text, a string. 200 without quotes is a number, an int.',
        'To turn the label into a weight, call int. It reads the text and gives back the real number. Now it goes on the scale.',
        'This matters, because what comes from a form, a file or a question is always text. Add the label 200 to the label 50, and they stick together. 20050 grams. Convert them first, and you get 250.',
        'Ben\'s protein label says 38.5. Int only reads whole numbers, so Python stops with a ValueError. Float reads the point, and it goes through.',
        'One catch. Int of 2.9 is 2. It chops, it does not round.',
        'Text is a label. Convert it before you weigh it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A label you read is not an amount you can weigh.',
        text: [
          'A delivery arrives in your kitchen. The note says <b>"200"</b> next to the rice. You can read that note, but you cannot put it on the scale. First you read it, then you weigh out <b>200 grams</b> of real rice.',
          'Python has the same two kinds of 200. <code>"200"</code> in quotes is <b>text</b>, a <code>str</code>. <code>200</code> without quotes is a <b>number</b>, an <code>int</code>. They look alike when you print them, but only the number can do maths.',
          'Every value has a <b>type</b>. You know four: <code>int</code> and <code>float</code> (lesson 6), <code>str</code> (lesson 8) and <code>bool</code> (lesson 10). <code>type()</code> tells you which one a value is. <b>Converting</b> means making a new value of another type, like reading the label and putting the real amount on the scale.'
        ],
        tip: 'Converting never changes the label. <code>int(label)</code> hands you a <b>new</b> value, the same way the text tools in lesson 9 hand you a new copy. The jar called <code>label</code> still holds the text.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Call the type you want, like a tool.',
        text: [
          '<b>types.py</b> recaps the four types. Then two new things. Mix an <code>int</code> and a <code>float</code> in a sum, and the answer is a <code>float</code>: <code>3 + 2.0</code> is <code>5.0</code>. And <code>isinstance(42, int)</code> is the polite way to ask "is this an int?". It answers <code>True</code> or <code>False</code>.',
          '<b>convert.py</b> converts. Each type\'s name works as a tool: <code>int("200")</code> reads the text and gives the whole number <code>200</code>. <code>float("38.5")</code> gives <code>38.5</code>. <code>str(140)</code> gives the text <code>"140"</code>, which you met in lesson 8.',
          '<code>int(2.9)</code> gives <code>2</code>. It <b>chops</b> off everything after the point. It does not round. If you mean "the nearest whole number", use <code>round(2.9)</code>, which gives <code>3</code>.',
          'A peek at <code>bool()</code>: <code>bool(0)</code> is <code>False</code> and <code>bool("Ana")</code> is <code>True</code>. Zero and empty text count as no, almost everything else as yes. Lesson 23, Truthy and falsy, has the full story.',
          'Press <b>Run</b> on both boxes. Then change <code>2.9</code> to <code>2.1</code> on the last lines of convert.py and see which answer moves.'
        ],
        tip: 'The type names are short for what they hold: <b>int</b> for integer (a whole number), <b>float</b> for a number with a floating point, <b>str</b> for string (of characters) and <b>bool</b> for Boole, the man from lesson 10.'
      },
      {
        label: 'The pain', pic: painPic,
        h: '"200" + "50" is 20050, and int() trips on a point.',
        text: [
          'Text arrives in your programs all the time. What a guest types into a form, a line read from a file, the answer to a question with <code>input()</code> (lesson 14): it is <b>always text</b>, even when it looks like a number.',
          'Pain number 1: you add two delivery notes. <code>"200" + "50"</code> is not a sum. It glues two pieces of text, as in lesson 8, and you get <code>20050</code>. Twenty kilograms of rice, and <b>no error</b> to warn you.',
          'Pain number 2: Ben\'s nutrition label says <code>"38.5"</code> grams of protein. <code>int()</code> only reads <b>whole</b> numbers, so it does not know what to do with the point. Python stops with a <code>ValueError</code>: "invalid literal for int()". Literal means the text you gave it, and Python shows it at the end: <code>\'38.5\'</code>.'
        ],
        warn: 'Pain number 1 is the sneaky one. A ValueError stops the program and tells you the line. Gluing text is allowed, so you just get a wrong number.'
      },
      {
        label: 'The fix', pic: run(reader, { title: 'labels.py' }),
        h: 'Convert first, then add.',
        text: [
          'You copied Ben\'s protein from three labels, as text. Press <b>Run</b>. Python prints <code>Protein today: 243845</code>. That is three labels glued together, not a total.',
          'Fix it where you add: wrap each label in <code>int()</code>. On line 5, write <code>int(breakfast) + int(lunch) + int(dinner)</code> in place of the glued sum, and run again. Now it prints <code>Protein today: 107</code>, a real number of grams.',
          'Leave the labels as text on lines 2 to 4. In a real program they come from outside, from a label, a form or a file, so you cannot just remove the quotes. You convert them at the moment you need a number.'
        ],
        tip: 'Not sure what you have? Print the type: <code>print(type(lunch))</code> shows <code>&lt;class \'str\'&gt;</code>. If it says <code>str</code> and you want maths, convert.'
      },
      {
        label: 'Try it', pic: run(tryLines, { title: 'protein.py' }),
        h: 'Pick the right tool for the label.',
        text: [
          'Press <b>Run</b> and read the <code>ValueError</code>. The label has a point, so <code>int()</code> cannot read it. Change <code>int</code> to <code>float</code> on line 2 and run again: <code>38.5 grams of protein</code>.',
          'Now try other labels on line 1, one at a time. <code>" 140 "</code> with spaces round it works: <code>int()</code> and <code>float()</code> ignore spaces at the ends. <code>"1,000"</code> fails, because a comma is not part of a number. <code>"two"</code> fails, and so does empty text <code>""</code>.',
          'Every failure is a <code>ValueError</code>, and the last line shows the exact text that would not convert. For <code>float()</code> the words are different: <code>could not convert string to float: \'two\'</code>.'
        ],
        tip: 'Rule of thumb: counts like guests, desserts and minutes use <code>int()</code>. Measurements with a point, like grams of protein from a label, use <code>float()</code>. <code>float()</code> reads whole numbers too: <code>float("140")</code> is <code>140.0</code>.'
      },
      {
        label: 'The catch', pic: run(catchLines, { title: 'careful.py' }),
        h: 'Converting can lose a bit, or show a tail.',
        text: [
          'Converting a <code>float</code> to an <code>int</code> throws away the part after the point. <code>int(2.9)</code> is <code>2</code>, not 3. Chloe made 2.9 batches of dessert? <code>int</code> says 2. If you mean the nearest whole number, <b>round first</b>: <code>round(2.9)</code> is <code>3</code>.',
          'Converting a <code>float</code> to text shows every digit Python has. Remember the tiny tail from lesson 6? <code>str(0.1 + 0.2)</code> puts it on your label: <code>0.30000000000000004</code>. Round before you turn a number into text, as the last line does.',
          'Press <b>Run</b> and compare each pair of lines.'
        ],
        warn: '<code>int()</code> on a float never warns you. A missing 0.9 of a batch is silent. Decide on purpose: chop with <code>int()</code>, or round with <code>round()</code>.'
      }
    ],
    exercises: [
      {
        file: 'l13_read_the_labels.py', title: 'Read the labels',
        task: 'The file holds labels copied as <b>text</b>: Ben\'s protein from four nutrition labels and Ana\'s minutes from three training runs. Work out <b>Ben\'s total grams of protein</b> and <b>Ana\'s total minutes</b>, by converting the labels with <code>int()</code> or <code>float()</code>. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the labels at the top. Do not change them. Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> with a sum of the converted labels. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.',
          'If Python stops with a <code>ValueError</code>, read the last line. It shows the label that would not convert. Does it have a point in it?'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this show?',
        pic: code(['print(int("200") + int("50"))'], { title: 'rice.py' }),
        options: ['250', '20050', '"250"', 'A TypeError'],
        answer: 0,
        why: 'Both labels are converted to numbers first, so <code>+</code> is a real sum: 200 + 50 = 250.',
        hint: 'What type does <code>int("200")</code> give back?'
      },
      {
        type: 'bucket', q: 'Does this give a number, or stop with a ValueError?',
        buckets: ['A number', 'ValueError'],
        items: [
          ['int("140")', 0],
          ['int(" 140 ")', 0],
          ['float("2.5")', 0],
          ['float("140")', 0],
          ['int("2.5")', 1],
          ['int("two")', 1],
          ['int("1,000")', 1],
          ['int("")', 1]
        ],
        why: 'Spaces at the ends are fine, and <code>float()</code> reads whole numbers too. A point stops <code>int()</code>. Words, commas and empty text stop both.',
        hint: '<code>int()</code> wants digits only, maybe with spaces round them.'
      },
      {
        type: 'fix', q: 'Ben\'s protein labels are text. This prints <code>2438</code>. Make it print the real total, <code>62</code>. Keep the labels as text.',
        code: ['breakfast = "24"', 'lunch = "38"', 'print(breakfast + lunch)'],
        title: 'protein.py',
        check: [
          'if breakfast != "24" or lunch != "38":',
          '    msg = "Keep the labels exactly as they are, in quotes. Convert them where you add them."',
          'elif out.strip() == "62":',
          '    ok = True',
          'elif out.strip() == "62.0":',
          '    msg = "Right total, but grams here are whole numbers. Use int() so it prints 62."',
          'else:',
          '    msg = "It printed " + out.strip() + ". Wrap each label in int() before you add them."'
        ].join('\n'),
        why: 'Two pieces of text glue together. Two numbers add up. <code>int(breakfast) + int(lunch)</code> is 24 + 38 = 62.',
        hint: 'Put <code>int( )</code> round each name on line 3.'
      },
      {
        type: 'fix', q: 'The label has a point, and Python stops with a ValueError. Fix line 2 so it prints <code>58.5</code>.',
        code: ['protein = "38.5"', 'grams = int(protein)', 'print(grams + 20)'],
        title: 'label.py',
        check: [
          'if protein != "38.5":',
          '    msg = "Keep the label as it is. Change the tool that reads it."',
          'elif out.strip() == "58.5":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Read the label with float() so the .5 is kept."'
        ].join('\n'),
        why: '<code>int()</code> only reads whole numbers. <code>float()</code> reads the point, so 38.5 + 20 = 58.5.',
        hint: 'Which type is a number with a point in it?'
      },
      {
        type: 'match', q: 'Match each line to what it gives.',
        pairs: [
          ['int(2.9)', '<code>2</code>'],
          ['round(2.9)', '<code>3</code>'],
          ['float("2.5")', '<code>2.5</code>'],
          ['3 + 2.0', '<code>5.0</code>'],
          ['str(140) + "g"', '<code>140g</code>'],
          ['bool(0)', '<code>False</code>']
        ],
        why: '<code>int()</code> chops and <code>round()</code> rounds. A sum with a float in it gives a float. <code>str()</code> makes text that can be joined. Zero counts as <code>False</code>.',
        hint: 'Start with the ones you are sure of. Remember: int() does not round.'
      },
      {
        type: 'pick', q: 'Back to lesson 8. Chloe typed how many desserts she wants each night into a form. What does this show?',
        pic: code(['desserts = "2"', 'print(desserts * 3)'], { title: 'chloe.py' }),
        options: ['222', '6', 'A ValueError', '2 2 2'],
        answer: 0,
        why: 'The form gives text. <code>*</code> on text repeats it, as in lesson 8, so <code>"2" * 3</code> is <code>222</code>. Convert first: <code>int(desserts) * 3</code> is <code>6</code>.',
        hint: '<code>"2"</code> has quotes. What does <code>*</code> do to text?'
      },
      {
        type: 'pick', q: 'Which line asks "is <code>grams</code> an int?" and answers True or False?',
        options: ['isinstance(grams, int)', 'int(grams)', 'grams = int', 'type(grams) = int'],
        answer: 0,
        why: '<code>isinstance(grams, int)</code> answers <code>True</code> or <code>False</code>. <code>int(grams)</code> converts instead of asking, and the last two are not questions at all.',
        hint: 'One of them converts. Two of them use a single <code>=</code>. Only one asks.'
      },
      {
        type: 'type', q: 'Ana\'s training log says <code>"42"</code> minutes, as text. Type the line that turns it into a whole number and prints it.',
        prompt: '>>>',
        answers: ['print(int("42"))'],
        accept: '^print\\(\\s*int\\(\\s*["\']42["\']\\s*\\)\\s*\\)$',
        why: '<code>int("42")</code> reads the text and gives the number 42. <code>print</code> shows it.',
        hint: 'print, then int, then the text "42" in quotes, with two closing brackets.'
      }
    ]
  });
})();
