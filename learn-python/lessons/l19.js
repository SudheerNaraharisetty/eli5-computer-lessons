/* Lesson 19: if (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l19  if
     ===================================================================== */

  // A pot on the stove, tasted, then a fork in the recipe: an extra step only when the answer is yes.
  const ideaPic = svg(600, 300, 'A pot of soup is tasted. A diamond asks: too salty? Yes leads to an extra step, add water, then serve. No skips straight to serve.',
    // the pot
    `<path d="M48 96 q-8 -14 0 -26 q8 -12 0 -24 M86 96 q-8 -14 0 -26 q8 -12 0 -24 M124 96 q-8 -14 0 -26 q8 -12 0 -24" fill="none" stroke="${P.mute}" stroke-width="3" stroke-linecap="round"/>` +
    `<rect x="12" y="122" width="16" height="12" rx="4" fill="${P.ink}"/><rect x="144" y="122" width="16" height="12" rx="4" fill="${P.ink}"/>` +
    box(24, 104, 124, 96, P.warnT, 16) +
    `<rect x="18" y="100" width="136" height="14" rx="7" fill="${P.ink}"/>` +
    T(86, 162, 'soup', { s: 15 }) +
    T(86, 236, '1. taste it', { s: 13, w: 700, f: P.ink2 }) +
    arrow(156, 160, 194, 160, P.ink, 3) +
    // the question
    `<path d="M196 160 L266 104 L336 160 L266 216 Z" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(266, 157, 'Too', { s: 13 }) + T(266, 174, 'salty?', { s: 13 }) +
    T(266, 236, '2. decide', { s: 13, w: 700, f: P.ink2 }) +
    // yes: the extra step
    `<path d="M266 104 V58 H360" fill="none" stroke="${P.ok}" stroke-width="3" stroke-linecap="round"/>` + arrow(352, 58, 372, 58, P.ok, 3) +
    T(278, 88, 'yes', { s: 13, f: P.ok, a: 'start' }) +
    box(374, 34, 120, 48, P.okT, 12) + T(434, 64, 'Add water', { s: 14, f: P.ok }) +
    `<path d="M494 58 H540 V120" fill="none" stroke="${P.ok}" stroke-width="3" stroke-linecap="round"/>` + arrow(540, 112, 540, 134, P.ok, 3) +
    // no: straight on
    arrow(336, 160, 504, 160, P.ink, 3) +
    T(420, 150, 'no: skip it', { s: 13, f: P.ink2 }) +
    box(506, 136, 80, 48, P.white, 12) + T(546, 166, 'Serve', { s: 14 }) +
    T(300, 284, 'An extra step, only when the answer is yes.', { s: 14, w: 700, f: P.ink2 }));

  // The parts of an if, drawn on a dark code panel.
  const cw = 10.2; // JetBrains Mono at 17px: 0.6em per character
  const mono = (x, y, s, f) => `<text x="${x}" y="${y}" font-size="17" font-weight="500" font-family="JetBrains Mono, monospace" fill="${f}">${s}</text>`;
  const anatomyPic = svg(600, 176, 'The parts of an if. Line 1: if, a question, a colon. Line 2 is pushed in by 4 spaces and runs only when the answer is True. Line 3 is back at the left edge and always runs.',
    `<rect x="8" y="8" width="584" height="160" rx="14" fill="#15132B"/>` +
    `<rect x="22" y="72" width="292" height="34" rx="6" fill="#1F7A5C" opacity="0.45"/>` +
    mono(32, 56, '<tspan fill="#C9C6FF">if</tspan> ben_protein &lt; <tspan fill="#FFC24B">30</tspan><tspan fill="#FFC24B">:</tspan>', '#ECEAFF') +
    mono(32 + 4 * cw, 96, '<tspan fill="#C9C6FF">print</tspan>(<tspan fill="#7CF0B5">"Shake for Ben"</tspan>)', '#ECEAFF') +
    mono(32, 136, '<tspan fill="#C9C6FF">print</tspan>(<tspan fill="#7CF0B5">"Check done"</tspan>)', '#ECEAFF') +
    T(334, 56, '← if, a question, a colon', { s: 13.5, f: '#ECEAFF', a: 'start' }) +
    T(334, 96, '← pushed in: only when True', { s: 13.5, f: '#7CF0B5', a: 'start' }) +
    T(334, 136, '← at the left edge: always', { s: 13.5, f: '#ECEAFF', a: 'start' }));

  const meal = [
    'ben_protein = 22',
    'ana_run_minutes = 45',
    '',
    'print("Kitchen Coach: meal check")',
    'if ben_protein < 30:',
    '    print("Ben: add a protein shake")',
    'if ana_run_minutes > 60:',
    '    print("Ana: long run, add 30 g of carbs")',
    'print("Check done. Enjoy dinner!")'
  ];
  const codePic = `<div style="width:100%">${anatomyPic}${run(meal, { title: 'meal_check.py' })}</div>`;

  const painPic = `<div style="width:100%">` +
    code(['ben_protein = 22', 'if ben_protein < 30', '    print("Ben: add a protein shake")'], { title: 'meal.py, no colon', bad: [2] }) +
    term(['$ python3 meal.py', '  File "meal.py", line 2', '    if ben_protein < 30', '                       ^', "SyntaxError: expected ':'"], 'terminal') +
    code(['ben_protein = 22', 'if ben_protein < 30:', 'print("Ben: add a protein shake")'], { title: 'meal.py, not pushed in', bad: [3] }) +
    term(['$ python3 meal.py', '  File "meal.py", line 3', '    print("Ben: add a protein shake")', '    ^^^^^', "IndentationError: expected an indented block after 'if' statement on line 2"], 'terminal') +
    code(['chloe_dessert = "rice, milk, sugar"', 'if "flour" in chloe_dessert:', '    print("Chloe: careful, gluten!")', '    print("Dessert is served")'], { title: 'dessert.py, pushed in too far', bad: [4] }) +
    term(['$ python3 dessert.py', '# (nothing is printed, and there is no error)'], 'terminal') +
    `</div>`;

  const broken = [
    'ben_protein = 22',
    'chloe_dessert = "flour, butter, sugar"',
    '',
    'if ben_protein < 30',
    '    print("Ben: add a protein shake")',
    'if "flour" in chloe_dessert:',
    'print("Chloe: careful, this has gluten!")',
    'print("Dinner is ready")'
  ];

  const coach = [
    'ingredients = input("What is in Chloe\'s dessert? ").lower()',
    'minutes = int(input("How many minutes did Ana run? "))',
    '',
    'if "flour" in ingredients:',
    '    print("Chloe: flour has gluten. Pick another.")',
    'if minutes > 60:',
    '    print("Ana: long run, add 30 g of carbs.")',
    'print("Kitchen Coach is done.")'
  ];

  const soup = [
    'salt_grams = 4',
    '',
    'if salt_grams > 5:',
    '    print("Too salty: add water")',
    '',
    'salt_grams = salt_grams + 3',
    'print("Salt in the pot:", salt_grams, "g")'
  ];

  COURSE.add({
    id: 'l19', minutes: 12,
    summary: 'Until now, every line ran, top to bottom. <code>if</code> lets the program <b>decide</b>. Write <code>if</code>, a True or False question, and a <b>colon</b>. The lines under it, <b>pushed in by 4 spaces</b>, run <b>only when the answer is True</b>. The first line back at the left edge always runs.',
    video: {
      src: 'videos/l19-if.mp4', poster: 'videos/l19-if.jpg', length: '1 min 8 s',
      script: [
        'Before you serve the soup, you taste it. Too salty? Then add water. Not salty? You skip that step.',
        'Until now, Python ran every line, top to bottom. The word if lets your program taste and decide.',
        'Write if, then a question, then a colon. The line under it is pushed in by 4 spaces. That block runs only when the answer is True.',
        'Ben\'s meal has 22 grams of protein. Is 22 under 30? True. The block lights up. Add a protein shake.',
        'Now make it 35. Is 35 under 30? False. The block stays dark, and Python jumps past it.',
        'The last line is not pushed in, so it always runs.',
        'Two mistakes stop everything. Forget the colon, and Python says, expected colon. Forget the spaces, and it says, expected an indented block.',
        'If asks its question once, at that moment. When the answer is True, it runs the block.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Taste it, and decide.',
        text: [
          'A good cook does not follow the recipe blindly. Before serving the soup, you <b>taste it</b>. Too salty? Then you add water. Not salty? You <b>skip</b> that step and serve.',
          'Ben is vegetarian. If tonight\'s dish has meat, you swap it for beans. Ana ran far today. If her run was over an hour, she gets extra carbs. Each time you <b>check a question</b>, and do an extra step <b>only when the answer is yes</b>.',
          'Every program so far ran <b>every line</b>, from top to bottom, as lesson 1 said. Python could ask questions (lesson 10), but it could not act on the answer. <code>if</code> changes that. It is the first way to make a program <b>decide</b>.'
        ],
        tip: 'Module 2 is about decisions and loops. A decision picks <b>which lines</b> run. A loop, from lesson 25 on, runs lines <b>again</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'if, a question, a colon, and a block.',
        text: [
          'Line 5 is an <b>if statement</b>. It has three parts: the word <code>if</code>, a <b>question</b> that gives True or False, and a <b>colon</b> <code>:</code> at the end. Any question from lesson 10 works: <code>&lt;</code>, <code>&gt;=</code>, <code>==</code>, <code>in</code>, or a jar that holds True or False.',
          'Line 6 is <b>pushed in by 4 spaces</b>. That is called <b>indenting</b>. Every indented line right under an if is its <b>block</b>. The block runs <b>only when the answer is True</b>. Line 9 is back at the left edge, so it is not part of any block. It <b>always</b> runs.',
          'Trace it in your head, line by line, like Python does. Line 5 asks: is 22 under 30? True, so line 6 runs. Line 7 asks: is 45 over 60? False, so Python <b>skips</b> line 8 and goes on to line 9. Two ifs in a row are two separate questions. Python asks each one.',
          'Press <b>Run</b>. Then change <code>22</code> to <code>35</code> on line 1 and run again: Ben\'s tip is gone. Change <code>45</code> to <code>75</code> on line 2: Ana\'s tip appears.'
        ],
        tip: 'In VS Code, type the colon and press Enter. The next line starts <b>4 spaces in</b> by itself. In the code boxes on this page, the <b>Tab</b> key adds 4 spaces. To go back to the left edge, press Backspace.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A missing colon, missing spaces, and one bug that makes no noise.',
        text: [
          '<b>Pain 1: no colon.</b> The colon tells Python "the question ends here, the block comes next". Without it, Python cannot read the line, and nothing runs at all: <code>SyntaxError: expected \':\'</code>. The little <code>^</code> points at the spot where the colon should be.',
          '<b>Pain 2: not pushed in.</b> After the colon, Python expects at least one indented line. Here line 3 starts at the left edge, so the if has an empty block: <code>IndentationError: expected an indented block after \'if\' statement on line 2</code>. Python even says which if is missing its block.',
          '<b>Pain 3: pushed in too far.</b> "Dessert is served" should always print. But it is indented, so it joined the if\'s block. Chloe\'s rice pudding has no flour, the answer is False, and Python skips <b>both</b> lines. No error, no dessert announcement. Python cannot know which lines you meant to push in.'
        ],
        warn: 'Pain 3 is the dangerous one. Errors 1 and 2 stop and tell you. A line that is indented by mistake just goes quiet, and only when the answer is False. Look at the left edge of every line under an if, and ask: should this line always run?'
      },
      {
        label: 'The fix', pic: run(broken, { title: 'fix_me.py' }),
        h: 'Add the colon. Push the block in.',
        text: [
          'Press <b>Run</b>. Python stops on line 4 with <code>SyntaxError: expected \':\'</code>. Add a colon at the end of line 4 and run again.',
          'Now it stops with <code>IndentationError: expected an indented block after \'if\' statement on line 6</code>. Click at the start of line 7 and press <b>Tab</b> (or type 4 spaces). Run once more. Three lines appear.',
          'Notice: both errors stop Python <b>before</b> line 1 runs. A missing colon and missing spaces are like a recipe card with a smudged step. Python reads the whole card first, and refuses to start cooking from a card it cannot read.',
          'Last, check the silent pain: <code>print("Dinner is ready")</code> stays at the left edge, because dinner is ready either way. Change line 2 to <code>"rice, milk, sugar"</code> and run. The gluten warning goes, and dinner is still ready.'
        ],
        tip: 'Python accepts any number of spaces, as long as every line of the block uses the <b>same</b> number. Everyone uses <b>4</b>. Stick to it, and your code looks like everyone else\'s.'
      },
      {
        label: 'Try it', pic: run(coach, { title: 'kitchen_coach.py', inputs: ['Flour, butter, sugar', '75'] }),
        h: 'Kitchen Coach makes its first decisions.',
        text: [
          'Kitchen Coach asks two questions and decides. This box answers them for you: the dessert has <code>Flour, butter, sugar</code>, and Ana ran <code>75</code> minutes. Press <b>Run</b>. Both tips appear.',
          '<code>.lower()</code> on line 1 (lesson 9) turns <code>Flour</code> into <code>flour</code>. Without it, <code>"flour" in "Flour, butter, sugar"</code> is False, because capitals count. Remove <code>.lower()</code> and run to see the warning vanish. Then put it back.',
          'Change <code>&gt; 60</code> to <code>&gt; 90</code> on line 6. Is 75 over 90? Work it out before you press Run.',
          'Now add a third question at the end, for Ben: <code>protein = int(input("Grams of protein in Ben\'s meal? "))</code>. Under it, an if that prints <code>Ben: add a protein shake</code> when <code>protein &lt; 30</code>. The box has no ready answer for this one, so <b>you</b> type it. Try <code>22</code>, then run again and try <code>40</code>.'
        ],
        tip: 'From lesson 16: Chloe may not have picked yet, so her jar holds <code>None</code>. Now you can act on that: <code>if chloe_dessert is None:</code> and, pushed in, <code>print("Chloe is still deciding")</code>. That is how a program avoids printing "Dessert: None" on the menu.'
      },
      {
        label: 'The catch', pic: run(soup, { title: 'soup.py' }),
        h: 'if tastes once. It does not keep watching.',
        text: [
          'Press <b>Run</b>. The pot has 4 g of salt, so line 3 asks "is 4 over 5?". False, no warning. Then line 6 adds 3 more grams. The pot now has 7 g, too salty. But no warning appears.',
          'An <code>if</code> asks its question <b>once</b>, at the moment Python reaches that line. It is not a rule that stays on guard. It is one taste of the soup. Lesson 11 had the same catch: <code>=</code> stores a value once, and does not watch it either.',
          'To check again, taste again. Copy lines 3 and 4 and paste them at the very end. Run: now the second if, asked after the salt went in, prints <code>Too salty: add water</code>.'
        ],
        warn: 'Order matters. Put each if <b>after</b> the lines that set its values. An if that runs too early answers a question about the old soup.'
      }
    ],
    exercises: [
      {
        file: 'l19_taste_and_decide.py', title: 'Taste and decide',
        task: 'Kitchen Coach checks two meals. Write an if that prints a <b>protein tip</b> for Ben only when his meal has <b>under 30 g</b> of protein, and a second if that prints a <b>gluten warning</b> for Chloe only when <code>"flour"</code> is in her dessert. Then print <code>Meal check done</code>, which must always run. The check runs your code with <b>four different meals</b> and looks at what appears each time.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the comment at the top for the exact lines to print. Write your ifs between the <code>START</code> and <code>END</code> lines, under the two jars. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that names the meal where your code went wrong.',
          'Python stops before the check with a <code>SyntaxError</code> or an <code>IndentationError</code>? Read its last line. It is one of the two pains from this lesson.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this program print?',
        pic: code(['oven_temp = 150', 'if oven_temp >= 180:', '    print("Oven is ready")', '    print("Put the cake in")', 'print("Wash the bowls")'], { title: 'cake.py' }),
        options: ['Only: Wash the bowls', 'Oven is ready, Put the cake in, Wash the bowls', 'Oven is ready, Wash the bowls', 'Nothing at all'],
        answer: 0,
        why: 'Is 150 at least 180? False. So Python skips the whole block, both indented lines. Line 5 is at the left edge, so it always runs.',
        hint: 'Work out the question on line 2 first. Then: which lines belong to the block?'
      },
      {
        type: 'fix', q: 'Ben has 35 g of protein, so he needs no shake. But "Dinner is served" never prints. Fix it so the program prints only <code>Dinner is served</code>.',
        code: ['ben_protein = 35', 'if ben_protein < 30:', '    print("Ben: add a protein shake")', '    print("Dinner is served")'],
        title: 'dinner.py',
        check: [
          'lines = out.splitlines()',
          'if ben_protein != 35:',
          '    msg = "Keep ben_protein at 35. Fix the indenting instead."',
          'elif lines == ["Dinner is served"]:',
          '    ok = True',
          'elif any("shake" in l for l in lines):',
          '    msg = "Ben has 35 g, so the shake tip should stay hidden. Keep it pushed in under the if."',
          'else:',
          '    msg = "It printed: " + (out.strip() or "nothing") + ". Move the Dinner line to the left edge, so it is not part of the block."'
        ].join('\n'),
        why: 'The last line was pushed in, so it belonged to the if\'s block and was skipped with it. At the left edge, it always runs.',
        hint: 'Which line should run whatever Ben ate? Take away its 4 spaces.'
      },
      {
        type: 'fix', q: 'This stops before it prints anything. Fix both mistakes so it prints <code>Ana: add 30 g of carbs</code> and then <code>Plan ready</code>.',
        code: ['ana_run_minutes = 75', 'if ana_run_minutes > 60', 'print("Ana: add 30 g of carbs")', 'print("Plan ready")'],
        title: 'ana.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Ana: add 30 g of carbs", "Plan ready"]:',
          '    ok = True',
          'elif lines == ["Plan ready"]:',
          '    msg = "Only Plan ready printed. Is 75 over 60? Keep the question as it was."',
          'else:',
          '    msg = "It printed: " + (out.strip() or "nothing") + ". Add the colon to line 2, and push only line 3 in by 4 spaces."'
        ].join('\n'),
        why: 'First Python wants the colon at the end of the if line. Then it wants the block pushed in. Plan ready stays at the left edge, so it always prints.',
        hint: 'Run it and read the last line of the error. Fix that, then run again for the next one.'
      },
      {
        type: 'match', q: 'Match what you see to what went wrong.',
        pairs: [
          ["SyntaxError: expected ':'", 'The if line has no colon at the end'],
          ["IndentationError: expected an indented block after 'if' statement on line 2", 'The line under the if starts at the left edge'],
          ['IndentationError: unexpected indent', 'A line is pushed in, but there is no if above it'],
          ['No error, but a line that should always print goes missing', 'That line is pushed in under an if by mistake']
        ],
        why: 'Two errors about the if line and its block, one about spaces where no block is expected, and the quiet one with no error at all.',
        hint: 'Read the key word in each: colon, indented block, unexpected, no error.'
      },
      {
        type: 'fill', q: 'Fill the blanks so the warning prints only when the dessert has flour.',
        text: '___ "flour" ___ chloe_dessert___\n    print("Chloe: careful, gluten!")',
        options: ['if', 'in', ':', '=', 'is', '.'],
        answer: ['if', 'in', ':'],
        why: '<code>if</code>, then the question <code>"flour" in chloe_dessert</code> from lesson 9, then the colon.',
        hint: 'Three parts: the word that starts a decision, the word that looks inside text, and the mark at the end of the line.'
      },
      {
        type: 'pick', q: 'How many lines does this print?',
        pic: code(['ben_protein = 25', 'ana_run_minutes = 90', 'chloe_dessert = "rice, milk, sugar"', '', 'if ben_protein < 30:', '    print("Shake for Ben")', 'if ana_run_minutes > 60:', '    print("Carbs for Ana")', 'if "flour" in chloe_dessert:', '    print("Gluten warning for Chloe")', 'print("Done")'], { title: 'checks.py' }),
        options: ['3', '1', '2', '4'],
        answer: 0,
        why: 'Three separate ifs, three separate questions. 25 under 30: True. 90 over 60: True. Flour in rice pudding: False. So Shake, Carbs, and Done, which always runs.',
        hint: 'Answer each question on its own, then add the line that always runs.'
      },
      {
        type: 'pick', q: 'The water hits 100 degrees on line 4. Does "Add the pasta" print?',
        pic: code(['water_temp = 96', 'if water_temp >= 100:', '    print("Add the pasta")', 'water_temp = 100', 'print("Water:", water_temp)'], { title: 'pasta.py' }),
        options: ['No. The if asked on line 2, when the water was 96', 'Yes. The water reaches 100, so the if fires', 'Yes, but only after line 5', 'Python stops with an error'],
        answer: 0,
        why: 'An if asks once, at the moment Python reaches it. On line 2 the answer was False. Changing the jar later does not go back and ask again. The output is only <code>Water: 100</code>.',
        hint: 'Python runs top to bottom. What was in the jar when line 2 ran?'
      },
      {
        type: 'pick', q: 'Back to lesson 16. Which line asks "has Chloe still not chosen?" the way Python programmers write it?',
        options: ['if chloe_dessert is None:', 'if chloe_dessert = None:', 'if chloe_dessert == "None":', 'if chloe_dessert is None'],
        answer: 0,
        why: '<code>is None</code> asks whether the jar is the empty None value. One <code>=</code> stores, so it is a SyntaxError here (lesson 10). <code>"None"</code> in quotes is text, a dessert called None. And the last one forgot its colon.',
        hint: 'Check three things: is or ==, no quotes around None, and the colon.'
      }
    ]
  });
})();
