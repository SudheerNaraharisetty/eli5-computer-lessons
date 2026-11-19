/* Lesson 26: for loops (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l26  for loops
     ===================================================================== */

  // The round table: three plates around a pot, a name and a turn number for each guest.
  const plate = (x, y, full) =>
    `<circle cx="${x}" cy="${y}" r="27" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    (full ? `<circle cx="${x}" cy="${y}" r="17" fill="#E3A548" stroke="${P.warn}" stroke-width="2"/>` : '');
  const seat = (x, y, name, col, n) =>
    box(x - 44, y - 17, 88, 34, P.white, 17) + T(x, y + 6, name, { s: 14, f: col }) +
    `<circle cx="${x - 44}" cy="${y - 17}" r="12" fill="${P.ink}"/>` + T(x - 44, y - 12.5, String(n), { s: 12, f: P.white });
  const round = (y, n, val, col) =>
    T(352, y, `round ${n}`, { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(430, y, 'guest = ', { s: 14, m: true, a: 'start' }) + T(514, y, val, { s: 14, m: true, f: col, a: 'start' });

  const ideaPic = svg(600, 300, 'A round table with three plates around a pot. Ana is guest 1, Ben guest 2, Chloe guest 3. On the right, the loop goes round three times: guest is Ana, then Ben, then Chloe, then there are no guests left and the loop ends.',
    `<circle cx="174" cy="160" r="104" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    plate(174, 98, true) + plate(228, 192, true) + plate(120, 192, false) +
    `<circle cx="174" cy="160" r="20" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    seat(174, 34, 'Ana', P.accent, 1) + seat(298, 270, 'Ben', P.ok, 2) + seat(50, 270, 'Chloe', P.danger, 3) +
    arrow(238, 66, 270, 120, P.accent, 2.5) + arrow(206, 262, 150, 262, P.accent, 2.5) +
    box(336, 30, 248, 236, P.white, 16) +
    T(460, 58, 'for guest in guests:', { s: 14, m: true }) +
    `<line x1="352" y1="72" x2="568" y2="72" stroke="${P.sand}" stroke-width="2"/>` +
    round(102, 1, '"Ana"', P.accent) + round(140, 2, '"Ben"', P.ok) + round(178, 3, '"Chloe"', P.danger) +
    box(352, 204, 216, 44, P.okT, 12) + T(460, 224, 'no guests left:', { s: 13, f: P.ok }) + T(460, 241, 'the loop ends', { s: 13, f: P.ok }) +
    T(460, 292, 'one round per guest, in order', { s: 12.5, w: 700, f: P.ink2 }));

  const spell = [
    'dish = "pasta"',
    '',
    'for letter in dish:',
    '    print(letter)',
    '',
    'print("Done spelling")'
  ];
  const greet = [
    '# PREVIEW: a list, the shopping list of lesson 31',
    'guests = ["Ana", "Ben", "Chloe"]',
    '',
    'for guest in guests:',
    '    print(f"Welcome, {guest}! Your plate is ready.")',
    '',
    'print("Everyone is served.")'
  ];
  const codePic = `<div style="width:100%;min-width:0">` +
    code(spell, { title: 'spell.py', hi: [3] }) +
    term(['$ python3 spell.py', 'p', 'a', 's', 't', 'a', 'Done spelling'], 'terminal') +
    run(greet, { title: 'table.py' }) + `</div>`;

  const printInside = [
    'meal_calories = [450, 700, 600]  # Ana\'s meals before her race',
    'total = 0',
    'for calories in meal_calories:',
    '    total += calories',
    '    print(f"Total: {total} calories")'
  ];
  const resetInside = [
    'meal_calories = [450, 700, 600]',
    'for calories in meal_calories:',
    '    total = 0',
    '    total += calories',
    'print(f"Total: {total} calories")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(printInside, { title: 'calories.py, print pushed in', bad: [5] }) +
    term(['$ python3 calories.py', 'Total: 450 calories', 'Total: 1150 calories', 'Total: 1750 calories', '# three totals, and only the last one is real'], 'terminal') +
    code(resetInside, { title: 'calories.py, jar emptied every round', bad: [3] }) +
    term(['$ python3 calories.py', 'Total: 600 calories', '# only the last meal: the jar was emptied each round'], 'terminal') + `</div>`;

  const fixMe = [
    '# Ana\'s meals before her race, in calories',
    'meal_calories = [450, 700, 600]',
    '',
    'total = 0',
    'for calories in meal_calories:',
    '    total += calories',
    '    print(f"Total: {total} calories")'
  ];

  const vowels = [
    'dish = "spaghetti carbonara"',
    'vowels = 0',
    '',
    'for letter in dish:',
    '    if letter in "aeiou":',
    '        vowels += 1',
    '',
    'print(f"{dish} has {vowels} vowels")'
  ];
  const glutenFree = [
    '# PREVIEW list: tonight\'s menu',
    'menu = ["rice pudding", "flour pancakes", "bean chili", "wheat pasta", "potato soup"]',
    '',
    'safe = 0',
    'for dish in menu:',
    '    if "flour" not in dish and "wheat" not in dish:',
    '        print(f"Chloe can eat: {dish}")',
    '        safe += 1',
    '',
    'print(f"{safe} dishes are safe for Chloe")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(vowels, { title: 'vowels.py' })}${run(glutenFree, { title: 'chloe.py' })}</div>`;

  const byWord = ['for word in "Ana and Ben":', '    print(word)'];
  const upper = ['dish = "soup"', 'for letter in dish:', '    letter = letter.upper()', 'print(dish)'];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(byWord, { title: 'names.py', bad: [1] }) +
    term(['$ python3 names.py', 'A', 'n', 'a', ' ', 'a', 'n', 'd', ' ', 'B', 'e', 'n', '# 11 lines: every letter, and the 2 spaces too'], 'terminal') +
    code(upper, { title: 'soup.py' }) +
    term(['$ python3 soup.py', 'soup', '# the jar letter changed, the text in dish did not'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l26', minutes: 12,
    summary: '<code>for item in something:</code> runs the block under it <b>once for each item</b>, and the loop variable holds <b>each value in turn</b>. Loop over text and you get it <b>letter by letter</b>. To add things up, use the <b>accumulator</b>: <code>total = 0</code> before the loop, <code>total += ...</code> inside, <code>print</code> after. Use <code>for</code> when you have the items, <code>while</code> when you wait for something to happen.',
    video: {
      src: 'videos/l26-for-loops.mp4', poster: 'videos/l26-for-loops.jpg', length: '1 min 3 s',
      script: [
        'Dinner is ready. Ana, Ben and Chloe sit at a round table, and you serve each guest in turn.',
        'In Python, that is a for loop. For guest in guests, colon. The line pushed in runs once for each guest.',
        'First, guest is Ana. The spoon fills her plate. Then guest becomes Ben. Then Chloe. No guests left, so the loop ends by itself.',
        'A loop can add things up too. Ana eats 3 meals before her race. Start a jar at 0. Each time round, add one meal. 450. 700. 600.',
        'After the loop, print the jar once. 1750 calories.',
        'Now push that print inside the loop. The jar shouts its total after every spoonful. 3 numbers, and only the last one is the real total.',
        'For each item, run the block. Add it up inside. Print it after.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Serve each guest at the table, in turn.',
        text: [
          'Dinner is ready. Ana, Ben and Chloe sit at a round table. You do not shout "food for everyone!" and hope. You go round the table: <b>for each guest</b>, fill their plate. Then the next guest. When there is nobody left, you sit down.',
          'You do the same with a recipe card. To check it for flour, you read it <b>letter by letter</b>, or <b>item by item</b>, from the first to the last.',
          'In lesson 25 a <code>while</code> loop repeated a step <b>until</b> something happened, like stirring until the sauce thickens. A <code>for</code> loop is simpler. You already have the things. It takes them <b>one at a time</b> and stops by itself after the last one.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'for, a name, in, the things, and a colon.',
        text: [
          '<code>for letter in dish:</code> reads like English. <code>for</code> starts the loop. <code>letter</code> is the <b>loop variable</b>: a jar that Python fills with <b>each value in turn</b>. <code>in dish</code> says what to go through. The <b>colon</b> and the lines <b>pushed in by 4 spaces</b> work exactly like <code>if</code> in lesson 19.',
          'The text <code>"pasta"</code> has 5 letters, so the block runs <b>5 times</b>. First <code>letter</code> is <code>"p"</code>, then <code>"a"</code>, and so on. After the last letter, Python carries on with the first line back at the left edge: <code>Done spelling</code>, printed once.',
          'The second box is a <b>preview</b>. <code>["Ana", "Ben", "Chloe"]</code> is a <b>list</b>: a shopping list of values, inside square brackets, with commas between them. Lesson 31 explains lists fully. For now, a <code>for</code> loop over a list gives you <b>one whole item</b> per round, here one guest.',
          'Press <b>Run</b>. Then add a fourth friend: type a comma after <code>"Chloe"</code>, then a name in quotes, like <code>"Dev"</code>. Run it again. You changed one list, and the loop served one more guest without a single new <code>print</code>.'
        ],
        tip: 'Name the loop variable after <b>one</b> of the things: <code>for guest in guests</code>, <code>for dish in menu</code>, <code>for letter in dish</code>. Plural for the whole, singular for one item. It is lesson 12 again: the label says what is in the jar.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A total that shouts every round, and a jar that keeps emptying.',
        text: [
          'Adding things up in a loop is so common that it has a name: the <b>accumulator</b>. Start a jar at <code>0</code> before the loop. Inside the loop, add one item with <code>+=</code> from lesson 11. Ana\'s three meals are 450, 700 and 600 calories, so the total should be <b>1750</b>.',
          '<b>Pain 1: print pushed in.</b> The <code>print</code> sits inside the loop, so it runs <b>every round</b>. You get 450, then 1150, then 1750. That is a running total. Only the last line is the real answer, and a reader cannot tell which one to trust.',
          '<b>Pain 2: the jar is emptied every round.</b> <code>total = 0</code> moved inside the loop. Every round, Python empties the jar and then adds one meal. So at the end the jar holds only the <b>last</b> meal: <code>600</code>. No error, just a wrong number.'
        ],
        warn: 'Both bugs run without any error. Python cannot know which lines you meant to repeat. It trusts the spaces at the start of each line. One push of the Tab key decides whether a line runs once or every round.'
      },
      {
        label: 'The fix', pic: run(fixMe, { title: 'calories.py' }),
        h: 'Before the loop, inside the loop, after the loop.',
        text: [
          'Press <b>Run</b>. You see the running total from Pain 1, three lines.',
          'Fix it: click at the start of line 7 and delete the 4 spaces, so <code>print</code> starts at the left edge. Run it again. Now there is one line: <code>Total: 1750 calories</code>.',
          'That is the accumulator in three places. <b>Before</b> the loop: set up the jar once, <code>total = 0</code>. <b>Inside</b> the loop: the work for one item, <code>total += calories</code>. <b>After</b> the loop: the answer, printed once.'
        ],
        tip: '<b>Counting</b> is the same pattern. Start with <code>count = 0</code>, and inside the loop add 1 only when an <code>if</code> says yes: <code>if "flour" not in dish: count += 1</code>. You try it in the next part.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Count the vowels. Count the safe dishes.',
        text: [
          'The first box counts the vowels in a dish name. For each letter, an <code>if</code> from lesson 19 asks "is it one of a, e, i, o, u?" with <code>in</code> from lesson 9. Only a yes adds 1. Press <b>Run</b>: <code>spaghetti carbonara has 7 vowels</code>.',
          'Now change the dish to <code>"Apple crumble"</code> and run it. You get 3, but there are 4. The capital <code>A</code> is not in <code>"aeiou"</code>. Fix it with lesson 9: change line 5 to <code>if letter.lower() in "aeiou":</code>.',
          'The second box loops over a preview list of dishes. Chloe eats no gluten, so a dish with flour or wheat is out. The loop prints each safe dish and counts them: <b>3</b>. Add <code>"wheat bread"</code> and <code>"fruit salad"</code> to the menu and run it again. Which number do you expect?'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Text goes letter by letter, and the loop variable is a copy.',
        text: [
          'A <code>for</code> loop over <b>text</b> always goes <b>one character at a time</b>. Calling the jar <code>word</code> does not change that. <code>"Ana and Ben"</code> has 11 characters, spaces included, so you get 11 lines. To go name by name, you need a list of names, like <code>guests</code>.',
          'Changing the loop variable does <b>not</b> change the original. Each round, <code>letter</code> holds one letter from <code>dish</code>. Putting a new value in <code>letter</code> changes only that jar. <code>dish</code> is still <code>"soup"</code>.',
          '<b>for or while?</b> Use <code>for</code> when you <b>have the things</b>: the guests, the letters, the meals. Use <code>while</code> from lesson 25 when you <b>wait for something</b>: stir until it thickens, ask until the answer is valid. To repeat a step a set number of times, like "stir 20 times", lesson 27 gives you <code>range</code>.'
        ],
        warn: 'Forget the colon and Python stops before it runs anything: <code>SyntaxError: expected \':\'</code>. Forget to push the next line in and you get <code>IndentationError: expected an indented block after \'for\' statement on line 1</code>. Same two pains as <code>if</code>, same fix.'
      }
    ],
    exercises: [
      {
        file: 'l26_serve_the_table.py', title: 'Serve the table',
        task: 'Two lists are ready for you: <code>guests</code> and Ana\'s <code>meal_calories</code>. Use <b>for loops</b> to print <code>Welcome, Ana!</code> for every guest, and then <b>one</b> line with the total: <code>Ana\'s total: 1750 calories</code>. The check runs your code again with other tables, so let the loops do the work.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact words of each line are in the comment at the top of the file.',
          'Write your loops between the <code>START</code> and <code>END</code> lines. Do not type the names or numbers yourself, and do not change the two lists. Save the file.',
          'Run it. The check tries one guest, four guests and an empty table, then says <code>PASS</code> or gives you one hint.',
          'Three totals, or only the last meal? Those are the two pains from this lesson. Look at which lines are pushed in.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['for letter in "rice":', '    print(letter)'], { title: 'rice.py' }),
        options: ['r, i, c and e, each on its own line', 'rice', 'rice, 4 times', 'An error: you cannot loop over text'],
        answer: 0,
        why: 'A <code>for</code> loop over text takes one character per round. <code>"rice"</code> has 4 letters, so <code>print</code> runs 4 times, one letter each time.',
        hint: 'What is in the jar <code>letter</code> in the first round?'
      },
      {
        type: 'fix', q: 'Python refuses to run this. Fix it so it greets all three guests.',
        code: ['guests = ["Ana", "Ben", "Chloe"]', '', 'for guest in guests', '    print(f"Hi {guest}")'],
        title: 'greet.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Hi Ana", "Hi Ben", "Hi Chloe"]:',
          '    ok = guests == ["Ana", "Ben", "Chloe"]',
          '    msg = "" if ok else "Keep the list of guests as it was."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want three lines: Hi Ana, Hi Ben, Hi Chloe."'
        ].join('\n'),
        why: 'Like <code>if</code>, a <code>for</code> line ends with a colon. Without it Python stops at once with <code>SyntaxError: expected \':\'</code>.',
        hint: 'Read the last line of the error. What is missing at the end of line 3?'
      },
      {
        type: 'pick', q: 'How many lines does this print?',
        pic: code(['for word in "Ana and Ben":', '    print(word)'], { title: 'names.py' }),
        options: ['11', '3', '1', '9'],
        answer: 0,
        why: 'Text is looped one <b>character</b> at a time, whatever the jar is called. 9 letters plus 2 spaces is 11 rounds, so 11 lines. Two of them show just a space.',
        hint: 'Does the name <code>word</code> change what the loop hands out? Count the spaces too.'
      },
      {
        type: 'fix', q: 'Ben ate 30, 45 and 40 g of protein, but this says 40. Fix it so it prints <code>Ben ate 115 g of protein</code>.',
        code: ['meal_protein_g = [30, 45, 40]  # PREVIEW list: Ben\'s meals', '', 'for protein_g in meal_protein_g:', '    total_g = 0', '    total_g += protein_g', '', 'print(f"Ben ate {total_g} g of protein")'],
        title: 'protein.py',
        check: [
          'if out.strip() == "Ben ate 115 g of protein":',
          '    ok = meal_protein_g == [30, 45, 40]',
          '    msg = "" if ok else "Keep the list as [30, 45, 40]. Let the loop add it up."',
          'elif out.strip() == "Ben ate 40 g of protein":',
          '    msg = "Still 40, the last meal only. total_g = 0 runs every round and empties the jar. Move it above the for line, at the left edge."',
          'else:',
          '    msg = "It printed: " + out.strip() + ". You want exactly: Ben ate 115 g of protein"'
        ].join('\n'),
        why: 'The jar is set up <b>once</b>, before the loop. Inside the loop, only the adding happens. Now 30 + 45 + 40 = 115.',
        hint: 'Which line empties the jar? It should run once, not every round.'
      },
      {
        type: 'fill', q: 'Ana\'s three pre-race meals have 60, 90 and 75 g of carbs. Fill the blanks so this prints <code>225</code>.',
        text: 'meal_carbs_g = [60, 90, 75]\ntotal_g = ___\nfor carbs_g in meal_carbs_g___\n    total_g ___ carbs_g\n___(total_g)',
        options: ['0', ':', '+=', 'print', '=', '1', 'len'],
        answer: ['0', ':', '+=', 'print'],
        why: 'Start the jar at 0, end the <code>for</code> line with a colon, add each item with <code>+=</code>, and print once after the loop: 60 + 90 + 75 = 225. With <code>=</code> instead of <code>+=</code>, the jar would only keep the last meal.',
        hint: 'An empty jar holds 0. Adding to a jar is the shortcut from lesson 11.'
      },
      {
        type: 'bucket', q: 'Which loop fits each job?',
        buckets: ['for', 'while'],
        items: [
          ['Greet each of the guests', 0],
          ['Check every letter of a dish name', 0],
          ['Add up the calories of 3 meals', 0],
          ['Stir until the sauce thickens', 1],
          ['Ask for a number until the answer is valid', 1],
          ['Keep heating until the water boils', 1]
        ],
        why: '<code>for</code> is for when you already have the things to go through. <code>while</code> is for when you wait for something to become True, and you cannot know in advance how many rounds that takes.',
        hint: 'Do you have the items already, or are you waiting for something to happen?'
      },
      {
        type: 'pick', q: 'Back to lesson 12. Which name is best for the blank in <code>for ___ in guests:</code>?',
        options: ['guest', 'guests', 'x', 'g'],
        answer: 0,
        why: 'Each round the jar holds <b>one</b> guest, so call it <code>guest</code>. <code>guests</code> would hide the whole list. <code>x</code> and <code>g</code> say nothing about what is inside.',
        hint: 'One item from a plural list gets the singular name.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(upper, { title: 'soup.py' }),
        options: ['soup', 'SOUP', 'S', 'An error'],
        answer: 0,
        why: 'Each round, <code>letter</code> holds a copy of one letter. Giving <code>letter</code> a new value changes only that jar. <code>dish</code> is never touched, and text tools give back a new copy anyway (lesson 9).',
        hint: 'Which jar does line 3 put a new value in? Is it <code>dish</code>?'
      }
    ]
  });
})();
