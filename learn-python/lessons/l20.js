/* Lesson 20: else and elif (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l20  else and elif
     ===================================================================== */

  // A pot of soup for the "taste" step.
  const pot = (x, y) =>
    `<rect x="${x - 44}" y="${y - 8}" width="16" height="12" rx="4" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 28}" y="${y - 8}" width="16" height="12" rx="4" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x - 32} ${y - 16} h64 v34 q0 20 -20 20 h-24 q-20 0 -20 -20 z" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<ellipse cx="${x}" cy="${y - 16}" rx="30" ry="7" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x + 22} ${y - 52} L${x + 6} ${y - 18}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>`;

  const ask = (y, q, a, fill, col, isElse) =>
    box(160, y, 190, 52, isElse ? P.sand : P.white, 12) + T(255, y + 33, q, { s: 15, m: !!isElse }) +
    arrow(354, y + 26, 404, y + 26, col, 3) + T(379, y + 18, isElse ? '' : 'yes', { s: 11.5, f: col }) +
    box(410, y, 170, 52, fill, 12) + T(495, y + 33, a, { s: 15, f: col });

  const ideaPic = svg(600, 300, 'Taste the soup. Ask: too salty? If yes, add water. If no, ask: too bland? If yes, add salt. If no, else: serve it. The checks go top to bottom and exactly one action happens.',
    pot(70, 130) + T(70, 196, 'taste it', { s: 13, w: 700, f: P.ink2 }) +
    arrow(112, 120, 154, 60, P.ink, 2.5) +
    ask(24, 'if too salty?', 'add water', P.dangerT, P.danger) +
    arrow(255, 82, 255, 112, P.ink2, 2.5) + T(272, 102, 'no', { s: 11.5, f: P.ink2, a: 'start' }) +
    ask(118, 'elif too bland?', 'add salt', P.tint, P.accent) +
    arrow(255, 176, 255, 206, P.ink2, 2.5) + T(272, 196, 'no', { s: 11.5, f: P.ink2, a: 'start' }) +
    ask(212, 'else:', 'serve it', P.okT, P.ok, true) +
    T(300, 292, 'checked top to bottom. Exactly one action happens.', { s: 13, w: 700, f: P.ink2 }));

  const chloe = [
    'gluten_free = False',
    '',
    'if gluten_free:',
    '    print("Chloe can have the lemon tart")',
    'else:',
    '    print("Chloe gets rice pudding instead")'
  ];
  const soup = [
    'salt_g = 14  # grams of salt per litre of soup',
    '',
    'if salt_g > 12:',
    '    print("Too salty: add water")',
    'elif salt_g < 6:',
    '    print("Too bland: add salt")',
    'else:',
    '    print("Just right: serve it")'
  ];
  const codePic = `<div style="width:100%">${code(chloe, { title: 'dessert.py', hi: [5] })}` +
    term(['$ python3 dessert.py', 'Chloe gets rice pudding instead'], 'terminal') + `</div>`;

  const wrongOrder = [
    'protein_g = 50  # grams in Ben\'s lunch',
    '',
    'if protein_g >= 20:',
    '    print("Good: enough protein")',
    'elif protein_g >= 40:',
    '    print("Great: plenty of protein")',
    'else:',
    '    print("Add beans or tofu")'
  ];
  const twoIfs = [
    'protein_g = 50',
    '',
    'if protein_g >= 40:',
    '    print("Great: plenty of protein")',
    'if protein_g >= 20:',
    '    print("Good: enough protein")'
  ];
  const painPic = `<div style="width:100%">` +
    code(wrongOrder, { title: 'protein.py, wrong order', bad: [3, 5] }) +
    term(['$ python3 protein.py', 'Good: enough protein', '# 50 g is "great", but the great line can never run'], 'terminal') +
    code(twoIfs, { title: 'protein.py, two separate ifs', bad: [5] }) +
    term(['$ python3 protein.py', 'Great: plenty of protein', 'Good: enough protein', '# two messages for one lunch'], 'terminal') + `</div>`;

  const dessertDesk = [
    'dessert = input("Dessert for Chloe? ").strip().lower()',
    '',
    'if dessert == "rice pudding":',
    '    print("Rice pudding: no gluten. Enjoy!")',
    'elif dessert == "lemon tart":',
    '    print("Lemon tart has wheat. Try the rice pudding.")',
    'else:',
    '    print(f"Not sure about {dessert}. Ask the cook.")'
  ];

  const badElse = [
    'protein_g = 12',
    '',
    'if protein_g >= 20:',
    '    print("Good: enough protein")',
    'else protein_g < 20:',
    '    print("Add beans or tofu")'
  ];
  const nested = [
    'run_minutes = 100',
    '',
    'if run_minutes > 45:',
    '    if run_minutes > 90:',
    '        print("Large portion")',
    '    else:',
    '        print("Medium portion")',
    'else:',
    '    print("Small portion")'
  ];
  const catchPic = `<div style="width:100%">` +
    code(badElse, { title: 'protein.py', bad: [5] }) +
    term(['$ python3 protein.py', '  File "protein.py", line 5', '    else protein_g < 20:', '         ^^^^^^^^^', "SyntaxError: expected ':'"], 'terminal') +
    code(nested, { title: 'portion.py, an if inside an if', hi: [4, 5, 6, 7] }) +
    term(['$ python3 portion.py', 'Large portion'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l20', minutes: 10,
    summary: '<code>else:</code> is what to do when the <code>if</code> is False: exactly one of the two blocks runs. <code>elif</code> (else if) adds more paths. Python checks them <b>top to bottom</b>, and the <b>first True wins</b>: its block runs and the rest are skipped. So put the <b>narrow</b> check first. <code>else</code> has no question. It catches everything left.',
    video: {
      src: 'videos/l20-else-elif.mp4', poster: 'videos/l20-else-elif.jpg', length: '1 min 6 s',
      script: [
        'You taste the soup. Too salty? Add water. Too bland? Add salt. Neither? Then it is just right, so serve it.',
        'In Python, if asks the first question. elif, short for else if, asks the next one. And else catches everything left over, so it needs no question.',
        'Python checks from the top. The first True wins. Its block runs, and the rest are skipped. 14 grams of salt? Too salty. 3? Too bland. 9? Neither, so else serves it. Exactly one bowl, every time.',
        'Now Ben\'s protein. 20 grams or more is good. 40 or more is great. Ben eats 50. But the first check, 20 or more, is already True. The wide net catches him first, and great never gets a chance.',
        'The fix is the order. Put the narrow check first. 40, then 20, then else.',
        'Top to bottom. The first True wins, and exactly one block runs.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Too salty, too bland, or just right.',
        text: [
          'In lesson 19, <code>if</code> tasted and decided: do something, or do nothing. A real cook has more choices than that.',
          'You taste the soup. <b>Too salty?</b> Add water. If not, <b>too bland?</b> Add salt. If neither, it is just right, so serve it.',
          'Notice two things. You ask the questions <b>in order</b>, and you stop at the first yes. And exactly <b>one</b> thing happens. You never add water and salt at the same time.'
        ]
      },
      {
        label: 'The code', pic: `<div style="width:100%">${codePic}${run(soup, { title: 'soup.py' })}</div>`,
        h: 'else for the other path, elif for more paths.',
        text: [
          '<b>else</b> means "otherwise". Its block runs when the <code>if</code> is <b>False</b>. Chloe\'s dessert either is gluten-free or it is not, so exactly one of the two lines prints. Never both, never neither. (A jar that already holds True or False can be the question by itself, like <code>if gluten_free:</code>.)',
          '<b>elif</b> is short for "else if": if the checks above were False, ask this new question. You can have as many <code>elif</code> lines as you need. <code>else</code> comes last and has <b>no question</b>. It catches everything left.',
          'Python checks <b>from the top</b>. The <b>first True wins</b>: its block runs, and every check below it is skipped. Run the soup taster. Then change <code>14</code> to <code>3</code>, run it, and change it to <code>9</code>. Each time exactly one line prints.'
        ],
        tip: '<code>elif</code> and <code>else</code> start at the same indent as their <code>if</code>, end with a colon, and own the indented block below them, just like the <code>if</code> in lesson 19.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The wide net catches everything first.',
        text: [
          'Ben wants feedback on his lunch: <b>20 g</b> of protein or more is good, <b>40 g</b> or more is great. His lunch has 50 g. The first program says only "Good".',
          'Why? 50 is at least 20, so the <b>first</b> check is True. Its block runs, and the rest are skipped. Every amount that is 40 or more is also 20 or more, so the <code>elif protein_g &gt;= 40</code> line can <b>never</b> run. No error, just the wrong answer.',
          'The second program has the other classic bug: two <b>separate</b> <code>if</code> lines. Separate ifs are separate questions, and each one can say yes. So one lunch gets <b>two</b> messages.'
        ],
        warn: 'Python never warns you about either bug. The code is correct Python. It just does not say what you meant. Test the edges: try 10, 25 and 50 grams and read every line it prints.'
      },
      {
        label: 'The fix', pic: run(wrongOrder, { title: 'protein.py' }),
        h: 'Narrow check first. One chain, not separate ifs.',
        text: [
          'Order the checks from <b>narrow</b> to <b>wide</b>: 40 or more first, then 20 or more, then <code>else</code>. Now 50 g stops at "great", 25 g falls through to "good", and 10 g reaches the <code>else</code>.',
          'Fix it here: swap <code>20</code> and <code>40</code> on lines 3 and 5, and swap the two messages, so each message stays with its own check. Run it. Then change Ben\'s lunch to 25, and then to 10, and run it each time.',
          'When you want <b>exactly one</b> answer, use <b>one chain</b>: one <code>if</code>, then <code>elif</code>, then <code>else</code>. Use separate <code>if</code> lines only when several things really can all be true, like "add salt" and also "add pepper".'
        ]
      },
      {
        label: 'Try it', pic: run(dessertDesk, { title: 'dessert_desk.py', inputs: ['brownie'] }),
        h: 'Kitchen Coach asks Chloe.',
        text: [
          'Press <b>Run</b>. The answer <code>brownie</code> is typed for you, so the program goes straight through. No check matches it, so the <code>else</code> catches it: "Not sure about brownie."',
          'Now teach Kitchen Coach about brownies. Add an <code>elif dessert == "brownie":</code> line before the <code>else</code>, with an indented line under it that prints <code>Brownies have wheat. Try the rice pudding.</code> Run it again. Your new block should win.',
          'The <code>else</code> here is a safety net for answers you did not plan for. In lesson 14 you saw that people type anything. A final <code>else</code> makes sure every answer gets a reply.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'else has no question. And do not nest too deep.',
        text: [
          '<code>else</code> never takes a question. It is "everything else". Writing <code>else protein_g &lt; 20:</code> stops Python before anything runs: <code>SyntaxError: expected \':\'</code>. Python wanted the colon straight after <code>else</code>. If you need a question there, you wanted <code>elif</code>. And <code>elif</code> always needs one: a bare <code>elif:</code> is a <code>SyntaxError: invalid syntax</code>.',
          'An <code>if</code> can sit <b>inside</b> another <code>if</code>. That is called <b>nesting</b>. The second program gives Ana the same portions as a flat chain would, but you have to follow two levels of indent to see it.',
          'Each level makes a recipe harder to read. When you can, write one flat <code>if</code>, <code>elif</code>, <code>else</code> chain. Lesson 22, <b>and, or, not</b>, shows how to join two questions into one, which removes most nesting.'
        ],
        tip: 'Python 3.10 and newer also has <code>match</code> and <code>case</code>, for picking one path by the exact value, like a dish name. That is lesson 24.'
      }
    ],
    exercises: [
      {
        file: 'l20_portion_coach.py', title: 'Ana\'s portion coach',
        task: 'Ana\'s run length is in the jar <code>run_minutes</code>. With <b>one</b> <code>if</code> / <code>elif</code> / <code>else</code> chain, print <b>exactly one</b> line: <b>Large</b> (3 cups of pasta) for more than 90 minutes, <b>Medium</b> (2 cups) for more than 45, and <b>Small</b> (1 cup) for anything else. The check runs your code for 8 runs, including exactly 45 and exactly 90.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact words of the three lines are in the comment at the top of the file.',
          'The <code>if</code> for more than 90 minutes is written for you. Add an <code>elif</code> and an <code>else</code> between the <code>START</code> and <code>END</code> lines. Save the file.',
          'Run it. The check tries 0, 30, 45, 46, 60, 90, 91 and 120 minutes, and says <code>PASS</code> or gives you one hint.',
          '"More than 90" does not include 90 itself. Think about <code>&gt;</code> and <code>&gt;=</code> (lesson 10).'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The soup has 9 grams of salt per litre. What does this print?',
        pic: code(soup.map((l, i) => i === 0 ? 'salt_g = 9' : l), { title: 'soup.py' }),
        options: ['Just right: serve it', 'Too bland: add salt', 'Too salty: add water', 'Nothing at all'],
        answer: 0,
        why: '9 is not more than 12, so the <code>if</code> is False. 9 is not less than 6, so the <code>elif</code> is False too. Every check was False, so the <code>else</code> block runs.',
        hint: 'Check each question from the top. Is 9 more than 12? Is 9 less than 6?'
      },
      {
        type: 'pick', q: 'Ben\'s lunch has 50 g of protein. What does this print?',
        pic: code(['protein_g = 50', '', 'if protein_g >= 20:', '    print("Good")', 'elif protein_g >= 40:', '    print("Great")', 'else:', '    print("Add beans")'], { title: 'protein.py' }),
        options: ['Good', 'Great', 'Good, then Great', 'Add beans'],
        answer: 0,
        why: 'The first True wins. 50 is at least 20, so "Good" prints and the rest of the chain is skipped. The "Great" line can never run in this order.',
        hint: 'Python stops at the first check that is True. Which check comes first?'
      },
      {
        type: 'fix', q: 'Kitchen Coach asks for the grams of protein, and Ben answers 50. It says "Good", but 50 g is great. Fix the <b>order</b> so it prints <code>Great</code>.',
        code: ['protein_g = int(input("Grams of protein in the lunch? "))', '', 'if protein_g >= 20:', '    print("Good")', 'elif protein_g >= 40:', '    print("Great")', 'else:', '    print("Add beans")'],
        title: 'protein.py', inputs: ['50'],
        check: [
          'last = out.splitlines()[-1] if out else ""',
          'lines = out.splitlines()[1:]',
          'if lines == ["Great"]:',
          '    ok = protein_g == 50',
          '    msg = "" if ok else "Keep the input line as it is, so Ben\'s 50 is used."',
          'elif last == "Good":',
          '    msg = "Still Good. The check for 20 or more is True for 50, so it wins. Put the check for 40 or more first."',
          'elif len(lines) > 1:',
          '    msg = "It printed more than one line. Keep one chain: if, elif, else."',
          'else:',
          '    msg = "It printed " + last + ". Keep the messages with their own checks: 40 or more is Great, 20 or more is Good."'
        ].join('\n'),
        why: 'Narrow first: <code>if protein_g &gt;= 40</code>, then <code>elif protein_g &gt;= 20</code>, then <code>else</code>. Now 50 stops at Great, and 25 still gets Good.',
        hint: 'Swap the numbers 20 and 40 on lines 3 and 5, and swap "Good" and "Great" so each message stays with its check.'
      },
      {
        type: 'fix', q: 'This soup has 15 g of salt per litre, and it prints <b>two</b> lines. Fix it so exactly one line prints: <code>Too salty: add water</code>.',
        code: ['salt_g = 15', '', 'if salt_g > 12:', '    print("Too salty: add water")', 'if salt_g >= 6:', '    print("Just right: serve it")'],
        title: 'soup.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Too salty: add water"]:',
          '    ok = salt_g == 15',
          '    msg = "" if ok else "Keep salt_g at 15."',
          'elif len(lines) > 1:',
          '    msg = "Still " + str(len(lines)) + " lines. Two separate ifs can both say yes. Make the second one part of the chain."',
          'else:',
          '    msg = "It printed: " + out.strip() + ". Keep both messages, and turn the second if into an elif."'
        ].join('\n'),
        why: 'Change the second <code>if</code> to <code>elif</code>. Now it is one chain: the first True wins, and the "just right" check is skipped. 9 g would still be just right.',
        hint: 'One small word on line 5 turns two separate questions into one chain.'
      },
      {
        type: 'fix', q: 'Python will not run this. Fix line 5 so it prints <code>Add beans or tofu</code> for Ben\'s 12 g lunch.',
        code: badElse, title: 'protein.py',
        check: [
          'if out.strip() == "Add beans or tofu":',
          '    ok = protein_g == 12',
          '    msg = "" if ok else "Keep protein_g at 12."',
          'else:',
          '    msg = "It printed: " + out.strip() + ". The else block should run for 12 g."'
        ].join('\n'),
        why: '<code>else</code> has no question: it is everything the checks above did not catch. Write <code>else:</code> on its own. (<code>elif protein_g &lt; 20:</code> also works, but <code>else:</code> says "everything else" more clearly.)',
        hint: 'Read the error: Python expected a colon straight after else.'
      },
      {
        type: 'order', q: 'Put the lines in order so Ben gets the right message for <b>any</b> amount: Great for 40 g or more, Good for 20 g or more, otherwise Add beans.',
        items: ['if protein_g >= 40:', '    print("Great")', 'elif protein_g >= 20:', '    print("Good")', 'else:', '    print("Add beans")'],
        why: 'The narrow check comes first, the wider check second, and <code>else</code> catches the rest. Each block sits right under its own question.',
        hint: 'The chain starts with if and ends with else. Which check is narrower, 40 or more, or 20 or more?'
      },
      {
        type: 'pick', q: 'Which of these lines are correct Python? (Pick all that apply.)',
        options: ['else:', 'elif salt_g < 6:', 'else salt_g < 6:', 'elif:', 'if salt_g > 12:'],
        answer: [0, 1, 4],
        why: '<code>if</code> and <code>elif</code> always need a question. <code>else</code> never has one. Every one of them ends with a colon.',
        hint: 'Which keyword never takes a question, and which two always do?'
      },
      {
        type: 'pick', q: 'Back to lesson 14. Ana types <code>100</code>. What happens?',
        pic: code(['run_minutes = input("Minutes? ")', '', 'if run_minutes > 90:', '    print("Large portion")', 'else:', '    print("Small portion")'], { title: 'portion.py' }),
        options: ['It stops with a TypeError on line 3', 'It prints Large portion', 'It prints Small portion', 'It stops with a SyntaxError'],
        answer: 0,
        why: '<code>input()</code> always gives text. Python cannot ask whether the text <code>"100"</code> is more than the number 90: <code>TypeError: \'&gt;\' not supported between instances of \'str\' and \'int\'</code>. Wrap it: <code>int(input("Minutes? "))</code>.',
        hint: 'What kind of value does input() always hand back?'
      }
    ]
  });
})();
