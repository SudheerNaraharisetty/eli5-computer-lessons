/* Lesson 3: Run your first file (module 0). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l03  Run your first file
     ===================================================================== */

  // A recipe card with lines, drawn as a file page with a folded corner.
  const filePage = (x, y, w, h, name) =>
    `<path d="M${x + 4} ${y + 5} h${w - 30} l30 30 v${h - 30} h-${w} z" fill="${P.ink}"/>` +
    `<path d="M${x} ${y} h${w - 30} l30 30 v${h - 30} h-${w} z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M${x + w - 30} ${y} v30 h30" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(x + 18, y + 30, name, { s: 16, a: 'start', m: true });

  const ideaPic = svg(600, 300, 'Left: a recipe card saved as the file dinner.py, kept for next time. Right: one step said out loud at the >>> prompt, like tasting with a spoon, then forgotten.',
    T(150, 24, 'A FILE', { s: 12.5, f: P.accent }) + T(450, 24, 'THE >>> PROMPT', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="14" x2="300" y2="290" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    filePage(40, 40, 220, 170, 'dinner.py') +
    ['print("Dinner at 7")', 'print("Starter: soup")', 'print("Main: chili")', 'print("Dessert: pudding")'].map((s, i) =>
      T(58, 102 + i * 26, s, { s: 12, w: 700, a: 'start', m: true, f: P.ink2 })).join('') +
    T(150, 246, 'a recipe card in your notebook', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 268, 'kept, run again any time', { s: 13, f: P.accent }) +
    box(330, 60, 240, 84, '#15132B', 12) +
    T(346, 94, '>>> print("Taste!")', { s: 13, a: 'start', m: true, f: '#ECEAFF' }) +
    T(346, 124, 'Taste!', { s: 13, a: 'start', m: true, f: '#A8E6C4' }) +
    // a tasting spoon
    `<ellipse cx="420" cy="196" rx="30" ry="18" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M448 190 L540 168" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M448 190 L540 168" stroke="${P.white}" stroke-width="2.5" stroke-linecap="round"/>` +
    T(450, 246, 'one step, said out loud', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 268, 'a quick taste, then it is gone', { s: 13, f: P.ok }));

  const dinner = [
    'print("Dinner at 7")',
    'print("Guests:", "Ana", "Ben", "Chloe")',
    'print()',
    'print("Starter: tomato soup")',
    'print("Main: bean chili with rice")',
    'print("Dessert: rice pudding")'
  ];
  const dinnerOut = ['Dinner at 7', 'Guests: Ana Ben Chloe', '', 'Starter: tomato soup', 'Main: bean chili with rice', 'Dessert: rice pudding'];

  // The top of the VS Code window: the tab and the Run button.
  const vsBar = (dot) => svg(600, 92, dot
    ? 'The dinner.py tab in VS Code with a round dot where the close cross should be: the file has changes that are not saved.'
    : 'The top of VS Code: the dinner.py tab, and the Run button, a triangle at the top right.',
    box(10, 12, 580, 66, '#211E40', 12) +
    `<rect x="24" y="24" width="190" height="54" rx="8" fill="#15132B"/>` +
    T(40, 58, 'dinner.py', { s: 16, a: 'start', m: true, f: '#ECEAFF' }) +
    (dot ? `<circle cx="192" cy="51" r="7" fill="#fff"/><circle cx="192" cy="51" r="17" fill="none" stroke="${P.danger}" stroke-width="3"/>`
      : T(192, 57, '×', { s: 18, f: '#8480B8' })) +
    (dot ? box(236, 30, 150, 36, P.dangerT, 18) + T(311, 54, 'not saved', { s: 14, f: P.danger })
      : `<path d="M520 36 L520 66 L546 51 Z" fill="#7CF0B5"/><circle cx="533" cy="51" r="25" fill="none" stroke="${P.warn}" stroke-width="3"/>` +
        T(488, 56, 'Run', { s: 14, a: 'end', f: '#ECEAFF' })));

  const codePic = `<div style="width:100%;min-width:0">${vsBar(false)}${run(dinner, { title: 'dinner.py' })}` +
    term(['$ python3 dinner.py'].concat(dinnerOut), 'terminal, inside the folder that holds dinner.py') + `</div>`;

  // Folders: the terminal is standing in "you", the file is inside "kitchen".
  const folder = (x, y, w, h, name, fill) =>
    `<path d="M${x + 4} ${y + 5} h${w * 0.36} l12 14 h${w * 0.64 - 12} v${h} h-${w} z" fill="${P.ink}"/>` +
    `<path d="M${x} ${y} h${w * 0.36} l12 14 h${w * 0.64 - 12} v${h} h-${w} z" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(x + 14, y + 36, name, { s: 15, a: 'start' });
  const folderPic = (here) => svg(600, 230, here === 'kitchen'
    ? 'The terminal now stands inside the kitchen folder, right next to dinner.py, so Python finds it.'
    : 'The terminal stands in your home folder. dinner.py is one folder deeper, inside kitchen, so Python looks in the wrong place.',
    folder(20, 20, 560, 196, 'you  (your home folder)', P.paper2) +
    folder(250, 70, 310, 130, 'kitchen', P.tint) +
    filePage(400, 116, 150, 70, 'dinner.py') +
    (here === 'kitchen'
      ? box(262, 134, 120, 36, P.okT, 18) + T(322, 158, 'you are here', { s: 13, f: P.ok }) + arrow(384, 152, 396, 152, P.ok, 2.5)
      : box(40, 120, 150, 36, P.warnT, 18) + T(115, 144, 'you are here', { s: 13, f: P.warn }) +
        `<path d="M196 146 Q290 214 396 170" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 6"/>` +
        T(120, 190, 'no dinner.py in here', { s: 13, f: P.danger })));

  const errTerm = term([
    '$ python3 dinner.py',
    ".../Python: can't open file '/Users/you/dinner.py': [Errno 2] No such file or directory"
  ], 'terminal, in your home folder');
  const painPic = `<div style="width:100%;min-width:0">${folderPic('home')}${errTerm}</div>`;

  const fixPic = `<div style="width:100%;min-width:0">${folderPic('kitchen')}` +
    term(['$ cd kitchen', '$ python3 dinner.py'].concat(dinnerOut), 'terminal, now in the kitchen folder') + `</div>`;

  const announce = [
    'print("Welcome, Ana, Ben and Chloe!")',
    'print("Main: bean chili with rice")',
    'print("Starter: tomato soup")',
    'print("Dessert: rice pudding")',
    'print("Thanks for coming. Goodbye!")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(announce, { title: 'announce.py' })}` +
    term(['$ python3', 'Python 3.15.2 (main, ...) on darwin', 'Type "help", "copyright", "credits" or "license" for more information.', '>>> print("Is the soup hot?")', 'Is the soup hot?', '>>> exit()', '$'], 'terminal: the >>> prompt') + `</div>`;

  const catchPic = `<div style="width:100%;min-width:0">${vsBar(true)}` +
    code(['print("Dinner at 7")', 'print("Starter: tomato soup")'], { title: 'dinner.py, on your screen (not saved yet)', hi: [2] }) +
    term(['$ python3 dinner.py', 'Dinner at 7', 'Starter: salad', '# Python ran the saved file. It still says salad.'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l03', minutes: 10,
    summary: 'A <b>file</b> is a recipe card you keep. You save your code as <code>dinner.py</code>, then run it with the <b>Run</b> button or by typing <code>python3 dinner.py</code>. Python reads it from the top, one line at a time.',
    video: {
      src: 'videos/l03-run-a-file.mp4', poster: 'videos/l03-run-a-file.jpg', length: '1 min',
      script: [
        'A recipe you only keep in your head is gone by tomorrow. So you write it on a card. In Python, that card is a file.',
        'In VS Code, make a new file and save it as dinner.py. The .py says: this is Python.',
        'Now write the steps. Print, dinner at 7. Then print the starter, the main and the dessert.',
        'Run it. Press the Run button, or type python3 dinner.py in the terminal. Python reads the card from the top, one line at a time, and stops when it runs out of lines.',
        'Now change the starter to soup, and run it again from the terminal. Still the old starter? Look at the tab. A white dot means the file is not saved. Python runs the saved card, not your screen.',
        'Save, run again, and the soup is served.',
        'A file is a recipe card you keep. Save it, then run it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Write the recipe down.',
        text: [
          'A recipe in your head is gone by next week. A recipe on a card in your notebook is still there, and you can cook it again and again. In Python, that card is a <b>file</b>.',
          'In VS Code, choose <b>File</b>, then <b>New Text File</b>. Then choose <b>File</b>, then <b>Save As</b>, and type the name <code>dinner.py</code>. Put it in a new folder called <code>kitchen</code>, so you know where it lives.',
          'The <code>.py</code> at the end matters. It tells VS Code "this is Python". Now VS Code colours your code and shows a <b>Run</b> button. A file called just <code>dinner</code> gets neither.',
          'There is a second way to talk to Python: the <code>>>></code> prompt. It is like a <b>tasting spoon</b>. You say one step out loud, see the result at once, and nothing is written down. You try it below, in Try it.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'Run it two ways.',
        text: [
          'Type these lines into <code>dinner.py</code> and save. Then run it. <b>Way 1:</b> press the <b>Run</b> button, the triangle at the top right of VS Code. <b>Way 2:</b> open a terminal (in VS Code: <b>Terminal</b>, then <b>New Terminal</b>) and type <code>python3 dinner.py</code>, then press Enter. On Windows, type <code>py dinner.py</code>.',
          'Two new things on lines 2 and 3. Put <b>several values</b> in one <code>print</code>, with commas between them, and Python prints them on one line with a space between each. An empty <code>print()</code> prints a <b>blank line</b>, like a gap on the card.',
          'Python reads the file <b>from the top</b>, one line at a time. When it runs out of lines, the program ends. There is no "stop" step to write.'
        ],
        tip: 'Press <b>Run</b> on the box above to try it right here. The page runs real Python, so you can change the guests or the dishes and run it again.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Python looks in the wrong folder.',
        text: [
          'A terminal is always <b>standing in one folder</b>, like you standing in one room of your house. That folder is called the <b>current folder</b>. When you type <code>python3 dinner.py</code>, Python only looks for <code>dinner.py</code> in that one folder.',
          'A new terminal often starts in your <b>home folder</b>. But <code>dinner.py</code> is one folder deeper, inside <code>kitchen</code>. So Python stops with <code>No such file or directory</code>. "Directory" is another word for folder.',
          'Read the message. It even tells you <b>where it looked</b>: <code>/Users/you/dinner.py</code>. That is the home folder, not the kitchen.'
        ],
        warn: 'The start of that line is the long address of Python on your computer, so it looks different on every computer. The part from <code>can\'t open file</code> to the end is the same everywhere, on Windows too.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Walk into the right room with cd.',
        text: [
          '<code>cd kitchen</code> means "change directory": walk into the <code>kitchen</code> folder. Now the terminal stands next to <code>dinner.py</code>, and <code>python3 dinner.py</code> finds it.',
          'Not sure what to type after <code>cd</code>? Type <code>cd</code> and a space, then <b>drag the folder</b> from Finder (or File Explorer on Windows) into the terminal. It types the full address for you. Press Enter.',
          'Easiest of all: in VS Code, choose <b>File</b>, then <b>Open Folder</b>, and pick <code>kitchen</code>. A new terminal in VS Code then starts inside it.'
        ],
        tip: 'The <b>Run</b> button never has this problem. It gives Python the full address of the file, so the current folder does not matter.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Swap two lines. Then taste with the spoon.',
        text: [
          'In <code>announce.py</code> the main comes before the starter. Press <b>Run</b> and look at the order. Now <b>swap lines 2 and 3</b> and run it again. The output changes order with the lines. Python never moves a step for you.',
          'Now the tasting spoon. In a terminal, type <code>python3</code> and press Enter (on Windows: <code>py</code>). You see a short welcome and the <code>>>></code> prompt. Type <code>print("Is the soup hot?")</code> and press Enter. Python answers at once.',
          'To leave, type <code>exit()</code> and press Enter. A shortcut also works: <b>Ctrl+D</b> on a Mac, or <b>Ctrl+Z then Enter</b> on Windows. Python says nothing as it leaves. You just see the normal terminal prompt again.'
        ],
        tip: 'Since Python 3.13, plain <code>exit</code> without brackets works too. Older Pythons only answer <code>Use exit() or Ctrl-D (i.e. EOF) to exit</code>, so <code>exit()</code> is the safe habit.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Python runs the saved file, not your screen.',
        text: [
          'You change the starter to tomato soup and run <code>python3 dinner.py</code> again. It still says <b>salad</b>. Look at the tab: there is a <b>dot</b> where the little cross should be (white in a dark theme). That dot means "changed, but <b>not saved</b>".',
          'The terminal reads the file that is saved on your computer, so it cooks the <b>old card</b>. Save with <b>Cmd+S</b> on a Mac or <b>Ctrl+S</b> on Windows. The dot turns back into a cross. Run again, and the soup is served.',
          'The Run button saves the file for you before it runs. Typing in the terminal does not. So make it a habit: <b>save, then run</b>.'
        ],
        warn: 'The tasting spoon forgets. Everything you type at <code>>>></code> is gone when you leave. Anything you want to keep goes in a file.'
      }
    ],
    exercises: [
      {
        file: 'l03_dinner_file.py', title: 'The evening plan, in order',
        task: 'The plan for the evening got shuffled and the goodbye fell off. Make the program print <b>exactly 5 lines</b> in this order: your friends <b>arrive</b>, the <b>starter</b>, the <b>main</b>, the <b>dessert</b>, and <b>goodbye</b>. The file checks the order when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, move whole lines up or down until the order is right. Then add a goodbye line.',
          'Save the file. Check the tab: no dot means it is saved.',
          'Run it twice: once with the Run button, and once in the terminal. In the terminal, <code>cd</code> into the <code>exercises</code> folder first. At the bottom you see <code>PASS</code> or a hint that names the line to move.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Recipe card or tasting spoon? Would you put this in a <b>file</b>, or just try it at the <code>>>></code> prompt?',
        buckets: ['A file (keep it)', 'The >>> prompt (a quick taste)'],
        items: [
          ['The dinner plan you run every Friday', 0],
          ['Kitchen Coach, the program you build all course', 0],
          ['A program you want to send to a friend', 0],
          ['Check how one print line looks', 1],
          ['See what 2 + 3 gives', 1],
          ['A quick test you do not need tomorrow', 1]
        ],
        why: 'A file is kept and can be run again and again. The <code>>>></code> prompt answers one line at a time and forgets everything when you leave.',
        hint: 'Ask: will I want this again tomorrow?'
      },
      {
        type: 'order', q: 'Put the steps in order to run your first file from the terminal.',
        items: ['Make a new file in VS Code', 'Write your print lines', 'Save it as dinner.py', 'cd into the folder that holds dinner.py', 'Type python3 dinner.py and press Enter'],
        why: 'Write, save, stand in the right folder, then run. Skip the save and Python runs an old version. Skip the cd and Python cannot find the file.',
        hint: 'You cannot save what you have not written, and Python can only run what is saved.'
      },
      {
        type: 'pick', q: 'Your file is at <code>/Users/you/kitchen/dinner.py</code>. You open a new terminal and see this. What do you do?',
        pic: term(['$ python3 dinner.py', ".../Python: can't open file '/Users/you/dinner.py': [Errno 2] No such file or directory"], 'terminal'),
        options: ['Type cd kitchen, then run python3 dinner.py again', 'Reinstall Python', 'Rename the file to dinner.txt', 'Delete the file and write it again'],
        answer: 0,
        why: 'Python looked in <code>/Users/you</code>, the home folder. The file is one folder deeper, in <code>kitchen</code>. Walk in with <code>cd kitchen</code> and run it again.',
        hint: 'Compare where Python looked with where the file really is.'
      },
      {
        type: 'pick', q: 'You change <code>salad</code> to <code>tomato soup</code>. The tab shows a dot. You type <code>python3 dinner.py</code> in the terminal. What does it print for the starter?',
        pic: vsBar(true),
        options: ['Starter: salad', 'Starter: tomato soup', 'An error, because the file is not saved', 'Nothing at all'],
        answer: 0,
        why: 'The dot means the change is only on your screen. The terminal runs the saved file, which still says salad. Save first, then run.',
        hint: 'What is saved on the computer right now?'
      },
      {
        type: 'pick', q: 'What does this line print?',
        pic: code(['print("Guests:", "Ana", "Ben", "Chloe")'], { title: 'dinner.py' }),
        options: ['Guests: Ana Ben Chloe', 'Guests:AnaBenChloe', 'Guests:, Ana, Ben, Chloe', 'Four lines, one word on each'],
        answer: 0,
        why: 'Several values in one <code>print</code>, separated by commas, come out on one line with one space between each. The commas themselves are not printed.',
        hint: 'The commas separate the values. Are they printed?'
      },
      {
        type: 'fix', q: 'The goodbye comes first! Fix the code so it prints the arrival, then a blank line, then <code>Dinner is served</code>, and the goodbye <b>last</b>.',
        code: ['print("Goodbye, see you next Friday!")', 'print("Ana, Ben and Chloe arrive")', 'print()', 'print("Dinner is served")'],
        title: 'evening.py',
        check: [
          'lines = out.splitlines()',
          'want = ["Ana, Ben and Chloe arrive", "", "Dinner is served", "Goodbye, see you next Friday!"]',
          'if lines == want:',
          '    ok = True',
          'elif "" not in lines:',
          '    msg = "Keep the empty print(). It makes the blank line after the arrival."',
          'elif len(lines) != 4:',
          '    msg = "It should print 4 lines, counting the blank one. It printed " + str(len(lines)) + "."',
          'elif lines[-1] != want[-1]:',
          '    msg = "The goodbye should be the last line. Move the whole goodbye line to the bottom."',
          'else:',
          '    msg = "Close. Check the order: arrive, blank line, Dinner is served, goodbye. Keep the words the same."'
        ].join('\n'),
        why: 'The order of the lines is the order of the evening. Moving one line to the bottom moved the goodbye to the end.',
        hint: 'Move the whole first line to the bottom. Do not change the words.'
      },
      {
        type: 'type', q: 'You are at the <code>>>></code> prompt. Type what leaves it and takes you back to the normal terminal.',
        prompt: '>>>',
        answers: ['exit()', 'exit', 'quit()', 'quit'],
        why: '<code>exit()</code> works in every Python 3. In Python 3.13 and newer, plain <code>exit</code> works too. Ctrl+D (Mac) or Ctrl+Z then Enter (Windows) also leave.',
        hint: 'It is a word that means "leave", followed by empty brackets.'
      },
      {
        type: 'pick', q: 'Back to lesson 1. You run this file. What appears before Python stops?',
        pic: code(['print("Starter: tomato soup")', 'prnt("Main: bean chili")', 'print("Dessert: rice pudding")'], { title: 'dinner.py' }),
        options: ['Starter: tomato soup, then an error about line 2', 'Only the error, nothing else', 'All three dishes, then the error', 'Starter and Dessert, skipping line 2'],
        answer: 0,
        why: 'Python reads from the top. Line 1 runs, so the starter appears. Line 2 has <code>prnt</code>, so Python stops there with a <code>NameError</code>. Line 3 never runs.',
        hint: 'Top to bottom, one line at a time. What happens at the first broken line?'
      }
    ]
  });
})();
