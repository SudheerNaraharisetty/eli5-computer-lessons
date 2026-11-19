/* Lesson 8: Text (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l08  Text
     ===================================================================== */

  // A paper binder clip with a quote mark on it: the quotes that hold a string.
  const clip = (x, y, q, col) =>
    `<rect x="${x - 14}" y="${y - 30}" width="28" height="60" rx="7" fill="${col || P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x - 8} ${y - 30} q8 -18 16 0" fill="none" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x, y + 13, q, { s: 26, f: P.white, m: true });
  // One row of character boxes, so the learner can count what len() counts.
  const cells = (x, y, s, o) => {
    o = o || {};
    return [...s].map((c, i) => {
      const cx = x + i * 30, sp = c === ' ';
      return `<rect x="${cx}" y="${y}" width="28" height="36" rx="5" fill="${sp ? (o.spaceFill || P.warnT) : P.white}" stroke="${P.ink}" stroke-width="2"/>` +
        (sp ? `<path d="M${cx + 7} ${y + 24} v5 h14 v-5" fill="none" stroke="${P.warn}" stroke-width="2.5" stroke-linecap="round"/>` : T(cx + 14, y + 25, c, { s: 16, m: true })) +
        T(cx + 14, y + 52, String(i + 1), { s: 10.5, w: 700, f: P.mute });
    }).join('');
  };

  const ideaPic = `<div style="width:100%">` +
    svg(600, 300, 'A recipe card with words on it next to a kitchen scale showing 200 grams. Words are text, called str. The number on the scale is an int. Below, the words Chloe\'s cake held between two clips: the quote marks.',
      // recipe card: words
      box(16, 14, 300, 176, P.warnT, 16) +
      T(36, 46, 'Recipe card', { s: 18, a: 'start' }) +
      box(226, 24, 72, 30, P.accent, 15) + T(262, 45, 'str', { s: 15, m: true, f: P.white }) +
      [["Chloe's cake", 82], ['Bean chili', 114], ['Lasagne', 146]].map(([s, y]) =>
        `<line x1="36" y1="${y + 8}" x2="296" y2="${y + 8}" stroke="${P.sand}" stroke-width="2"/>` + T(40, y, s, { s: 16, w: 700, a: 'start' })).join('') +
      T(166, 180, 'words: text', { s: 12.5, w: 700, f: P.ink2 }) +
      // scale: a number
      box(340, 14, 244, 176, P.paper2, 16) +
      T(360, 46, 'Scale', { s: 18, a: 'start' }) +
      box(498, 24, 70, 30, P.ok, 15) + T(533, 45, 'int', { s: 15, m: true, f: P.white }) +
      `<rect x="402" y="66" width="120" height="8" rx="4" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="360" y="76" width="204" height="78" rx="18" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="380" y="90" width="164" height="48" rx="9" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(462, 124, '200 g', { s: 24, m: true }) +
      T(462, 180, 'numbers: maths', { s: 12.5, w: 700, f: P.ink2 }) +
      // the string held by two clips
      `<rect x="96" y="226" width="408" height="52" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(300, 261, "Chloe's cake", { s: 24, m: true }) +
      clip(96, 252, '"') + clip(504, 252, '"') +
      T(300, 298, 'the quotes hold the words, like two clips', { s: 12.5, w: 700, f: P.ink2 })) +
    code(['print("Chloe\'s cake")', 'print(\'Ben says "yum!"\')', 'print("Ben says \\"yum!\\"")', 'print("Boil the water\\nAdd the pasta")', 'print("Pasta\\t350 g")'], { title: 'quotes.py' }) +
    term(['$ python3 quotes.py', "Chloe's cake", 'Ben says "yum!"', 'Ben says "yum!"', 'Boil the water', 'Add the pasta', 'Pasta   350 g'], 'terminal') +
    `</div>`;

  const cardLines = [
    'print("Bean" + " " + "chili")',
    'print("Ben: " + "bean chili")',
    'print("=" * 20)',
    'print(len("lasagne"))',
    'print(len("bean chili"))',
    'print("""Rice pudding for Chloe',
    '1. Warm 1 litre of milk',
    '2. Stir in 100 g of rice""")'
  ];

  const painPic = `<div style="width:100%">` +
    code(['print("200" + "50")', 'print(200 + 50)'], { title: 'flour.py', bad: [1], good: [2] }) +
    term(['$ python3 flour.py', '20050', '250'], 'terminal') +
    svg(600, 132, 'A flour jar label that reads Flour: 20050 g, ringed in red. Two text pieces, 200 and 50, were glued together instead of added.',
      box(150, 26, 300, 74, P.white, 12) +
      `<rect x="150" y="26" width="300" height="20" rx="12" fill="${P.sand}"/>` +
      T(300, 82, 'Flour: 20050 g', { s: 24, m: true }) +
      `<ellipse cx="337" cy="74" rx="50" ry="26" fill="none" stroke="${P.danger}" stroke-width="4" transform="rotate(-3 335 74)"/>` +
      T(300, 126, '"200" and "50" were glued, not added. 100 times too much flour.', { s: 12.5, w: 700, f: P.danger })) +
    code(['print("Pasta: " + 3)'], { title: 'menu.py', bad: [1] }) +
    term(['$ python3 menu.py', 'Traceback (most recent call last):', '  File "menu.py", line 1, in <module>', '    print("Pasta: " + 3)', '          ~~~~~~~~~~^~~', 'TypeError: can only concatenate str (not "int") to str'], 'terminal') +
    `</div>`;

  const fixLines = [
    'print("Flour: " + "200" + " g")',
    'print("Ana runs", 21.1, "km")',
    'print("Pasta: " + 3 + " plates")'
  ];

  const menuLines = [
    'print("Tonight\'s menu")',
    'print("=" * 14)',
    'print("Ana: pasta")',
    'print("Ben: bean chili")',
    'print("Chloe: rice pudding")',
    'print(len("Tonight\'s menu"))'
  ];

  const catchPic = `<div style="width:100%">` +
    code(['print(len(""))', 'print(len("pasta"))', 'print(len("pasta "))', 'print("pasta" == "pasta ")'], { title: 'labels.py', hi: [3, 4] }) +
    term(['$ python3 labels.py', '0', '5', '6', 'False'], 'terminal') +
    svg(600, 196, 'Three jar labels counted box by box. An empty string has 0 characters. pasta has 5. pasta with a space at the end has 6, and the space is a real character.',
      T(30, 34, '""', { s: 16, m: true, a: 'start' }) +
      `<rect x="150" y="12" width="28" height="36" rx="5" fill="none" stroke="${P.mute}" stroke-width="2" stroke-dasharray="5 4"/>` +
      T(200, 36, 'len 0: still text, just empty', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
      T(30, 94, '"pasta"', { s: 16, m: true, a: 'start' }) + cells(150, 70, 'pasta') +
      T(316, 94, 'len 5', { s: 14, f: P.ok, a: 'start' }) +
      T(30, 152, '"pasta "', { s: 16, m: true, a: 'start' }) + cells(150, 128, 'pasta ') +
      T(346, 152, 'len 6', { s: 14, f: P.danger, a: 'start' }) +
      arrow(440, 182, 316, 164, P.warn, 2.5) + T(446, 186, 'a space is a character', { s: 12.5, w: 700, f: P.warn, a: 'start' })) +
    `</div>`;

  COURSE.add({
    id: 'l08', minutes: 10,
    summary: 'Text in Python is called a <b>string</b> (<code>str</code>): characters inside <b>quotes</b>. <code>+</code> joins strings, <code>*</code> repeats one, and <code>len()</code> counts its characters. <code>"200"</code> in quotes is text, not a number, so <code>"200" + "50"</code> gives <code>20050</code>.',
    video: {
      src: 'videos/l08-text.mp4', poster: 'videos/l08-text.jpg', length: '1 min 6 s',
      script: [
        'On a recipe card, you write words. On a scale, you read numbers. Python keeps the two apart.',
        'In Python, words are called strings. A string is text inside quotes. The quotes hold the words, like two clips.',
        'Single or double quotes both work. But Chloe\'s cake has an apostrophe inside. So use double quotes, and it fits.',
        'A plus sign joins two strings. A star repeats one. An equals sign, times 20, prints a divider line.',
        'And len counts the characters. Lasagne has 7.',
        'Now the trouble. You label the flour. 200, plus 50. But both are in quotes, so Python does not add. It glues. 2, 0, 0, 5, 0.',
        'And text plus a real number? Python stops with a TypeError.',
        'The fix is str, short for string. It turns the number 3 into text, so the label can join it.',
        'Words go in quotes. Numbers do not.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Words go on the recipe card. Numbers go on the scale.',
        text: [
          'Your kitchen has <b>words</b> and <b>numbers</b>. The recipe card says "Chloe\'s cake". The scale says 200 g. Lesson 6 was about the numbers. This lesson is about the words.',
          'In Python, a piece of text is called a <b>string</b>, <code>str</code> for short. It is a row of characters strung together, like beads. You have used strings since lesson 1: <code>"Ana: pasta"</code> is one.',
          'The <b>quotes</b> hold the words, like two clips. Single <code>\'...\'</code> and double <code>"..."</code> quotes both work. Use the kind that lets you write the other inside: <code>"Chloe\'s cake"</code> has an apostrophe, so it goes in double quotes. <code>\'Ben says "yum!"\'</code> goes in single quotes.',
          'For the rare string that needs both, put a <b>backslash</b> <code>\\</code> in front of a quote, and Python reads it as a plain character: <code>"Ben says \\"yum!\\""</code>. A backslash also makes two special characters: <code>\\n</code> starts a new line, and <code>\\t</code> jumps to the next tab stop.'
        ],
        tip: 'The backslash and the letter after it count as <b>one</b> character. <code>\\n</code> is not printed: it moves the rest of the text down a line.'
      },
      {
        label: 'The code', pic: run(cardLines, { title: 'card.py' }),
        h: 'Join, repeat, count.',
        text: [
          '<code>+</code> between two strings <b>joins</b> them, end to end. This is called <b>concatenation</b>. Python adds no space for you, so line 1 joins three pieces: <code>"Bean"</code>, a space, and <code>"chili"</code>.',
          '<code>*</code> with a string and a whole number <b>repeats</b> the string. <code>"=" * 20</code> is twenty <code>=</code> signs in a row: a divider line under a menu title.',
          '<code>len(...)</code> counts the <b>characters</b> in a string. <code>"lasagne"</code> has 7. <code>"bean chili"</code> has 10, because the space counts too.',
          '<b>Three quotes</b> in a row, <code>"""</code>, start a string that can run over several lines, like a whole recipe card. It ends at the next <code>"""</code>.',
          'Press <b>Run</b>. Then change <code>20</code> on line 3 to <code>40</code>, and run again.'
        ],
        tip: 'In lesson 6 you saw <code>&lt;class \'str\'&gt;</code> for <code>type("200")</code>. Now you know: <code>str</code> is a string.'
      },
      {
        label: 'The pain', pic: painPic,
        h: '"200" + "50" is 20050.',
        text: [
          'You write the flour for a cake on a jar label: 200 g, plus 50 g more. But you wrote both weights <b>in quotes</b>. Quotes make text, so <code>"200" + "50"</code> does not add. It <b>glues</b> the characters together: <code>20050</code>. That is 100 times too much flour.',
          'Without quotes, <code>200 + 50</code> is maths, and you get <code>250</code>. On the screen, <code>200</code> and <code>"200"</code> look the same. To Python they are different kinds of value: an int and a str.',
          'Now mix the two kinds. <code>"Pasta: " + 3</code> joins text to a number. Python cannot glue a number onto text, so it stops with the <b>TypeError</b> from lesson 4: <code>can only concatenate str (not "int") to str</code>.'
        ],
        warn: 'The <code>20050</code> mistake is the worse one. A TypeError stops your program and tells you the line. Gluing two strings is allowed, so you get a wrong answer and <b>no error at all</b>.'
      },
      {
        label: 'The fix', pic: run(fixLines, { title: 'labels.py' }),
        h: 'Turn the number into text with str().',
        text: [
          '<code>str(...)</code> turns a value into <b>text</b>. <code>str(3)</code> gives <code>"3"</code>, and text joins text. So write <code>"Pasta: " + str(3) + " plates"</code>.',
          'Press <b>Run</b> and read the TypeError on line 3. Then wrap the <code>3</code> in <code>str(...)</code>, and run again. You should see <code>Pasta: 3 plates</code>.',
          'Line 2 shows the other way, from lesson 4: <b>commas</b> in <code>print</code>. Each value can be any kind, and <code>print</code> puts a <b>space</b> between them for you. With <code>+</code> you add every space yourself: <code>"Pasta:" + "3" + "plates"</code> prints <code>Pasta:3plates</code>.'
        ],
        tip: 'And to fix <code>20050</code>: weights are numbers, so write them without quotes. <code>200 + 50</code>. Lesson 13, Types and converting, turns text like <code>"200"</code> back into the number 200.'
      },
      {
        label: 'Try it', pic: run(menuLines, { title: 'menu_card.py' }),
        h: 'Print a menu card with a neat divider.',
        text: [
          'Press <b>Run</b>. The title <code>Tonight\'s menu</code> has 14 characters, so 14 <code>=</code> signs fit under it exactly. Line 6 proves it.',
          'Change the title to <code>Dinner for Ana, Ben and Chloe</code> on line 1. Now the divider is too short. Change the <code>14</code> on line 2 until it fits.',
          'Then let Python count for you: replace the <code>14</code> with <code>len("...")</code> and put the same title inside it. The divider now fits any title.',
          'Last, try <code>"-"</code> or <code>"~"</code> instead of <code>"="</code> for a different look.'
        ],
        tip: 'Writing the title twice is clumsy. In lesson 11 you put it in a labelled jar, a <b>variable</b>, and write it only once.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Empty is still text. A space is a character.',
        text: [
          '<code>""</code>, two quotes with nothing between them, is the <b>empty string</b>. It is still a string, just with no characters in it: <code>len("")</code> is 0. Like a blank label: it is there, but it says nothing.',
          'A <b>space</b> is a character, like any letter. <code>"pasta "</code> with a space at the end has 6 characters, not 5. To Python it is a different word: <code>"pasta" == "pasta "</code> is <code>False</code>.',
          'You cannot see a space at the end of a line, so this bug hides well. A label that says <code>"pasta "</code> does not match the jar called <code>"pasta"</code>.'
        ],
        warn: 'Text typed by people often has extra spaces at the ends. Lesson 9, Text tools, shows how to trim them off.'
      }
    ],
    exercises: [
      {
        file: 'l08_menu_card.py', title: 'A menu card with a perfect divider',
        task: 'Print a menu card: a <b>title</b>, a <b>divider</b> of <code>=</code> signs <b>exactly as long as the title</b> (use <code>len</code> and <code>*</code>), and <b>3 lines</b> with a dish for Ana, Ben and Chloe. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Write your card between the <code>START</code> and <code>END</code> lines. For the divider, put <code>len("...")</code> with your title inside it after the <code>*</code>. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Is this value text (a string) or a number?',
        buckets: ['Text (str)', 'Number'],
        items: [
          ['"200"', 0],
          ['200', 1],
          ["'Chloe'", 0],
          ['2.5', 1],
          ['"2.5"', 0],
          ['""', 0],
          ['-18', 1]
        ],
        why: 'Quotes make text, whatever is inside them, even digits, and even nothing at all. No quotes and only digits make a number.',
        hint: 'Look only for quote marks.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['print("200" + "50")'], { title: 'flour.py' }),
        options: ['250', '20050', '200 50', 'A TypeError'],
        answer: 1,
        why: 'Both are in quotes, so both are text. <code>+</code> glues text end to end, with no space: <code>20050</code>. No error, just a wrong amount.',
        hint: 'Are these numbers, or text that looks like numbers?'
      },
      {
        type: 'fix', q: 'This stops with a TypeError. Fix it with <code>str()</code> so it prints <code>Pasta: 3 plates</code>.',
        code: ['print("Pasta: " + 3 + " plates")'],
        title: 'labels.py',
        check: [
          'if out.strip() == "Pasta: 3 plates":',
          '    ok = True',
          'elif out.strip().replace(" ", "") == "Pasta:3plates":',
          '    msg = "Close. Check the spaces: it printed " + out.strip() + ". The spaces live inside the quotes."',
          'else:',
          '    msg = "It printed " + out.strip() + ". It should print Pasta: 3 plates."'
        ].join('\n'),
        why: '<code>str(3)</code> turns the number into the text <code>"3"</code>, and text joins text. Commas in <code>print</code> would work too.',
        hint: 'Wrap the 3 like this: str(3).'
      },
      {
        type: 'fix', q: 'Chloe\'s cake will not print. Fix the quotes.',
        code: ["print('Chloe's cake')"],
        title: 'cake.py',
        check: [
          'if out.strip() == "Chloe\'s cake":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". It should print exactly: Chloe\'s cake"'
        ].join('\n'),
        why: 'The apostrophe ended the single-quoted string too early. Put the string in double quotes, <code>"Chloe\'s cake"</code>, and the apostrophe is just a character.',
        hint: 'Python thinks the string ends at the apostrophe. Use the other kind of quote around the whole thing.'
      },
      {
        type: 'match', q: 'Match each line to what it prints.',
        pairs: [
          ['print("Ana" + "Ben")', '<code>AnaBen</code>'],
          ['print("Ana", "Ben")', '<code>Ana Ben</code>'],
          ['print("Ana" * 2)', '<code>AnaAna</code>'],
          ['print(len("Ana"))', '<code>3</code>']
        ],
        why: '<code>+</code> glues with no space. Commas in <code>print</code> add a space. <code>*</code> repeats. <code>len</code> counts characters.',
        hint: 'Which one adds a space for you?'
      },
      {
        type: 'pick', q: 'How many characters does <code>len("bean chili ")</code> count? Look closely at the end.',
        options: ['10', '9', '11', '2'],
        answer: 2,
        why: '<code>bean</code> 4, the space 1, <code>chili</code> 5, and the space at the end 1 more: 11. Every space is a character.',
        hint: 'Count the spaces too, including the one before the closing quote.'
      },
      {
        type: 'pick', q: 'Back to lesson 6. What does this line show?',
        pic: code(['print(type("200"))'], { title: 'flour.py' }),
        options: ["<class 'int'>", "<class 'str'>", '200', "<class 'float'>"],
        answer: 1,
        why: '<code>type()</code> names the kind. The quotes make <code>"200"</code> a string, so the kind is <code>str</code>, even though it is made of digits.',
        hint: 'What do the quotes do to the digits inside them?'
      },
      {
        type: 'type', q: 'Type the line that prints a divider of exactly <b>20</b> <code>=</code> signs, without typing 20 of them.',
        prompt: '>>>',
        answers: ['print("=" * 20)'],
        accept: '^print\\(\\s?"="\\s?\\*\\s?20\\s?\\)$|^print\\(\\s?20\\s?\\*\\s?"="\\s?\\)$',
        why: '<code>"=" * 20</code> repeats the string 20 times. <code>print</code> shows the result.',
        hint: 'print, then the = sign in quotes, then a star, then 20.'
      }
    ]
  });
})();
