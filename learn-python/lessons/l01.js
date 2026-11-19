/* Lesson 1: What a program is (module 0). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l01  What a program is
     ===================================================================== */

  // A little robot cook: the computer. mood: 'ok' | 'stuck' | 'happy'
  const robot = (x, y, mood) => {
    const face = mood === 'stuck' ? P.tint : P.white;
    const eyes = mood === 'stuck'
      ? `<path d="M${x - 15} ${y - 4} l8 8 m0 -8 l-8 8 M${x + 7} ${y - 4} l8 8 m0 -8 l-8 8" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>`
      : `<circle cx="${x - 11}" cy="${y}" r="4.5" fill="${P.ink}"/><circle cx="${x + 11}" cy="${y}" r="4.5" fill="${P.ink}"/>`;
    const mouth = mood === 'stuck'
      ? `<path d="M${x - 9} ${y + 16} h18" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>`
      : `<path d="M${x - 10} ${y + 13} q10 9 20 0" fill="none" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>`;
    return `<path d="M${x - 22} ${y - 26} q-12 -18 6 -26 q10 -16 32 -4 q20 -4 16 16 q4 8 -10 14 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
      `<rect x="${x - 30}" y="${y - 24}" width="60" height="50" rx="12" fill="${face}" stroke="${P.ink}" stroke-width="2.5"/>` + eyes + mouth +
      `<rect x="${x - 24}" y="${y + 30}" width="48" height="34" rx="8" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<circle cx="${x}" cy="${y + 47}" r="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>`;
  };
  const friend = (x, y, name, need, col) =>
    box(x, y, 230, 64, P.white, 14) +
    `<circle cx="${x + 32}" cy="${y + 32}" r="18" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 32, y + 38, name[0], { s: 15, f: P.white }) +
    T(x + 60, y + 28, name, { s: 15, a: 'start' }) + T(x + 60, y + 49, need, { s: 12, w: 700, f: P.ink2, a: 'start' });

  const recipePic = svg(600, 300, 'A recipe card with four numbered steps, next to Ana, Ben and Chloe, the three friends coming to dinner',
    box(20, 22, 300, 256, P.warnT, 18) +
    T(170, 56, "Tonight's dinner", { s: 17 }) +
    ['Announce the menu', 'Pasta for Ana', 'Bean chili for Ben', 'Rice pudding for Chloe'].map((s, i) => {
      const y = 92 + i * 46;
      return `<circle cx="52" cy="${y}" r="14" fill="${P.ink}"/>` + T(52, y + 5, String(i + 1), { s: 13, f: P.white }) + T(78, y + 5, s, { s: 14, w: 700, a: 'start' });
    }).join('') +
    arrow(296, 84, 296, 238, P.accent, 3) +
    T(170, 266, 'exact steps, in order', { s: 12.5, w: 700, f: P.ink2 }) +
    friend(350, 30, 'Ana', 'half-marathon: carbs', P.accent) +
    friend(350, 112, 'Ben', 'vegetarian, lifts: protein', P.ok) +
    friend(350, 194, 'Chloe', 'gluten-free, loves dessert', P.danger) +
    T(465, 290, 'your guests, all course long', { s: 12.5, w: 700, f: P.ink2 }));

  const menu = [
    'print("Tonight\'s menu")',
    'print("Ana: pasta")',
    'print("Ben: bean chili")',
    'print("Chloe: rice pudding")'
  ];
  const codePic = `<div style="width:100%">${code(menu, { title: 'menu.py', hi: [1] })}` +
    term(['$ python3 menu.py', "Tonight's menu", 'Ana: pasta', 'Ben: bean chili', 'Chloe: rice pudding'], 'terminal') + `</div>`;

  const typo = menu.slice(); typo[1] = 'prnt("Ana: pasta")';
  const errLines = [
    '$ python3 menu.py',
    "Tonight's menu",
    'Traceback (most recent call last):',
    '  File "menu.py", line 2, in <module>',
    '    prnt("Ana: pasta")',
    '    ^^^^',
    "NameError: name 'prnt' is not defined. Did you mean: 'print'?"
  ];
  const painPic = `<div style="width:100%">` +
    svg(600, 176, 'A person can follow "add some salt". The robot cook freezes because it does not know how much "some" is.',
      T(150, 26, 'A PERSON', { s: 12.5, f: P.ok }) + T(450, 26, 'THE COMPUTER', { s: 12.5, f: P.danger }) +
      `<line x1="300" y1="16" x2="300" y2="170" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
      box(30, 44, 240, 50, P.white, 12) + T(150, 75, '"Add some salt."', { s: 15 }) +
      T(150, 136, 'a pinch, by feel. Fine.', { s: 13, w: 700, f: P.ok }) +
      box(322, 44, 176, 50, P.white, 12) + T(410, 75, '"Add some salt."', { s: 14 }) +
      robot(552, 90, 'stuck') +
      box(338, 110, 112, 32, P.dangerT, 10) + T(394, 131, 'how much?', { s: 13, f: P.danger }) +
      arrow(456, 124, 508, 104, P.danger, 2.5) +
      T(410, 168, 'it cannot guess. It stops.', { s: 13, w: 700, f: P.danger })) +
    code(typo, { title: 'menu.py, one letter missing', bad: [2] }) + term(errLines, 'terminal') + `</div>`;

  const catchPic = `<div style="width:100%">${code(['print("Add 500 grams of salt")'], { title: 'soup.py' })}` +
    svg(600, 170, 'The computer prints the line about 500 grams of salt without any complaint. Only you know that is far too much.',
      box(24, 40, 300, 84, '#15132B', 14) + T(174, 90, 'Add 500 grams of salt', { s: 16, m: true, f: '#ECEAFF' }) +
      robot(390, 72, 'happy') + box(434, 38, 146, 34, P.okT, 10) + T(507, 60, 'Done!', { s: 14, f: P.ok }) +
      box(434, 82, 146, 34, P.dangerT, 10) + T(507, 104, 'way too much', { s: 13, f: P.danger }) +
      T(300, 160, 'Python checks the spelling, never the sense.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  COURSE.add({
    id: 'l01', minutes: 8,
    summary: 'A <b>program</b> is a recipe for a computer: exact steps, in order. You write it in a language the computer reads. In this course that language is <b>Python</b>.',
    video: {
      src: 'videos/l01-what-a-program-is.mp4', poster: 'videos/l01-what-a-program-is.jpg', length: '1 min 8 s',
      script: [
        'Tonight, you are cooking for 3 friends. Ana is training for a half marathon. Ben lifts weights and eats no meat. Chloe skips gluten, but never dessert.',
        'You follow a recipe. Exact steps, in order.',
        'A computer is a cook too. A very fast one. But it follows every step exactly as written, and it never guesses.',
        'So if the recipe says, add some salt, the computer freezes. How much is some?',
        'A program is a recipe, written in a language the computer reads. This one is Python.',
        'Each line says print, and then the words to show. Run it, and the menu appears, one line at a time, for each friend.',
        'Now one letter goes missing. Print, without the i. Python stops, and tells you the line, the problem, and even a guess at the fix.',
        'Fix the letter, and dinner is served.',
        'A program is a recipe. Exact steps, in order, for a cook who never guesses.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: recipePic,
        h: 'A recipe is exact steps, in order.',
        text: [
          'Tonight you cook dinner for three friends. <b>Ana</b> is training for a half-marathon, so she wants carbs. <b>Ben</b> is vegetarian and lifts weights, so he wants protein. <b>Chloe</b> eats no gluten and never skips dessert.',
          'You follow a <b>recipe</b>: a list of steps. Each step is clear, and the order matters. You do not serve the pasta before you cook it.',
          'A computer is a cook too. A very fast one. It follows its recipe <b>exactly as written</b>, one step after another.'
        ],
        tip: 'Ana, Ben and Chloe come back in every lesson. Over the course you build <b>Kitchen Coach</b>, a small program that plans meals for them.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Your first program.',
        text: [
          'A <b>program</b> is a recipe written in a language the computer reads. The language in this course is <b>Python</b>. The file is called <code>menu.py</code>. The <code>.py</code> at the end means "a Python file".',
          '<code>print</code> is a step Python already knows: show some words on the screen. The words go inside the brackets, between quote marks. Python shows them <b>exactly</b>, without the quotes.',
          'Python runs the lines <b>from top to bottom</b>, one at a time. Four lines in, four lines out, in the same order.'
        ],
        tip: 'The dark box under the code is a <b>terminal</b>: a window where you type commands. <code>python3 menu.py</code> means "Python, please cook the recipe in menu.py". Lesson 3 shows you how.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The computer never guesses.',
        text: [
          'A friend helping in your kitchen can follow "add some salt". They taste and decide. A computer cannot. "Some" is not a number, so it has <b>no idea what to do</b>.',
          'Python is just as strict about spelling. On line 2, <code>print</code> lost its <code>i</code>. A person would read <code>prnt</code> as print. Python does not know any step called <code>prnt</code>, so it <b>stops</b>.',
          'Line 1 still ran, so the menu title appeared. Then Python stopped and printed an <b>error</b> instead of Ana\'s dish. Ben and Chloe get nothing either.'
        ],
        warn: 'An error looks scary the first time. It is not a crash of your computer and nothing is broken. It is the computer telling you which step it could not follow.'
      },
      {
        label: 'The fix', pic: run(typo, { title: 'menu.py' }),
        h: 'Read the error calmly.',
        text: [
          'Every cook burns a dish now and then. A good cook looks at it and asks why. Read a Python error the same way, <b>from the bottom up</b>:',
          '1. The <b>last line</b> names the problem: <code>NameError: name \'prnt\' is not defined</code>. "Name" is what Python calls a word like <code>prnt</code>. Python is saying "I don\'t know that word".',
          '2. It even guesses the fix: <code>Did you mean: \'print\'?</code>',
          '3. The line above says <b>where</b>: <code>line 2</code>. Go there, put the <code>i</code> back, and run it again.',
          'Try it now. Press <b>Run</b> on the code to see the real error. Then fix line 2 and press Run again.'
        ],
        tip: 'The code box is a real Python, running inside this page. You can edit it, run it, break it and press Reset. Nothing you do here can harm your computer.'
      },
      {
        label: 'Try it', pic: run(menu, { title: 'menu.py' }),
        h: 'Change the menu.',
        text: [
          'Now the menu is yours. Change <b>pasta</b> to another dish Ana would like, then press Run.',
          'Add a fifth line that prints a drink for everyone. Copy a whole line and change the words, so the brackets and quote marks stay in place.',
          'Then break it on purpose. Remove one quote mark and press Run. Read the error from the bottom up. Then press Reset.'
        ],
        tip: 'Further down this page there is an exercise to do in <b>VS Code</b>, the code editor you will use for the rest of the course. Lesson 2 installs it.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Fast and exact, with no common sense.',
        text: [
          'A computer can follow millions of steps a second and never gets bored or tired. That is its power.',
          'But it has <b>no common sense</b>. It checks that each step is written correctly. It never checks that the step is a <b>good idea</b>. Tell it to add 500 grams of salt and it says "done".',
          'So the thinking stays with you, the cook. You decide what the dish should be. The computer only follows your recipe, exactly.'
        ],
        warn: 'When a program gives a strange result with no error, the computer did not get it wrong. It did exactly what the recipe said. The recipe was wrong.'
      }
    ],
    exercises: [
      {
        file: 'l01_first_menu.py', title: "Tonight's menu, in VS Code",
        task: 'Write a program that prints a menu of <b>exactly 3 lines</b>, and make sure <b>Ana, Ben and Chloe</b> each appear on it. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Write your menu between the <code>START</code> and <code>END</code> lines, one <code>print(...)</code> per line. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.',
          'Not installed Python or VS Code yet? That is lesson 2. Come back to this afterwards.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is a program?',
        options: ['Exact steps a computer follows, in order', 'A picture that shows on the screen', 'A guess the computer makes about what you want', 'The wires inside a computer'],
        answer: 0,
        why: 'A program is a recipe for a computer. Exact steps, in order, and nothing is guessed.',
        hint: 'Think of the recipe card in your kitchen.'
      },
      {
        type: 'bucket', q: 'Could a computer follow this step as it is written?',
        buckets: ['Exact enough', 'Too vague'],
        items: [
          ['Add 5 grams of salt', 0],
          ['Bake for 25 minutes', 0],
          ['Add some salt', 1],
          ['Cook until it looks done', 1],
          ['Serve a big plate to Ben', 1],
          ['Pour 300 ml of water', 0]
        ],
        why: 'A computer needs exact amounts and exact actions. "Some", "looks done" and "big" all need a human to decide.',
        hint: 'Ask: is there a number or a clear action, or does someone have to judge?'
      },
      {
        type: 'pick', q: 'What does this program show <b>first</b>?',
        pic: code(['print("Dessert for Chloe")', 'print("Pasta for Ana")', 'print("Chili for Ben")'], { title: 'menu.py' }),
        options: ['Pasta for Ana', 'Dessert for Chloe', 'Chili for Ben', 'All three at the same moment'],
        answer: 1,
        why: 'Python runs from top to bottom. Line 1 runs first, even though dessert usually comes last. The computer has no common sense about meals.',
        hint: 'Python does not care what makes sense for dinner. Which line is on top?'
      },
      {
        type: 'order', q: 'Put the lines in order so the program prints the menu below, top to bottom: <code>Welcome!</code>, then the starter, the main, the dessert.',
        items: ['print("Welcome!")', 'print("Starter: tomato soup")', 'print("Main: bean chili")', 'print("Dessert: rice pudding")'],
        why: 'The order of the lines is the order of the output. Change the order of the recipe and you change the meal.',
        hint: 'The first line of output comes from the first line of code.'
      },
      {
        type: 'pick', q: 'Python shows this error. Which line of <code>menu.py</code> do you go to?',
        pic: term(['Traceback (most recent call last):', '  File "menu.py", line 3, in <module>', '    prnt("Chloe: rice pudding")', '    ^^^^', "NameError: name 'prnt' is not defined. Did you mean: 'print'?"], 'terminal'),
        options: ['Line 1', 'Line 3', 'The last line of the file', 'Every line, from the top'],
        answer: 1,
        why: 'The error says <code>line 3</code> and even shows that line with little arrows under the problem.',
        hint: 'Look for the word "line" in the error.'
      },
      {
        type: 'fix', q: 'This program stops with an error. Fix it so it prints both lines.',
        code: ['print("Tonight\'s menu")', 'prnt("Pasta for Ana")'],
        title: 'menu.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Tonight\'s menu", "Pasta for Ana"]:',
          '    ok = True',
          'elif len(lines) != 2:',
          '    msg = "It should print exactly 2 lines. It printed " + str(len(lines)) + "."',
          'else:',
          '    msg = "Close. Keep the words inside the quotes exactly the same as before."'
        ].join('\n'),
        why: 'One missing letter stopped the whole recipe. Put it back, and every step runs.',
        hint: 'Read the last line of the red error. Python even suggests the fix.'
      },
      {
        type: 'type', q: 'Type the line of Python that shows the words <code>Hello Ben</code> on the screen.',
        prompt: '>>>',
        answers: ['print("Hello Ben")'],
        why: '<code>print</code>, then brackets, then the exact words between quote marks. Single quotes work too.',
        hint: 'It looks like the menu lines: print, a bracket, a quote mark, the words, a quote mark, a bracket.'
      },
      {
        type: 'pick', q: 'You run <code>print("Add 500 grams of salt")</code>. What does the computer do?',
        options: ['Shows the line, exactly as written', 'Refuses, because that is far too much salt', 'Changes it to 5 grams', 'Asks if you are sure'],
        answer: 0,
        why: 'The computer checks that the step is written correctly, not that it is a good idea. The common sense is your job.',
        hint: 'Does a computer have common sense?'
      }
    ]
  });
})();
