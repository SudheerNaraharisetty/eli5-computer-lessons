/* Lesson 60: Modules and import (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l60  Modules and import
     ===================================================================== */

  // The cookbook every Run box on this page gets, as kitchen.py in its folder.
  // Every box uses these SAME two cards, so Python's memory of an earlier import never shows an old version.
  const CARDS = [
    'def protein_in(grams, per_100g):',
    '    """Grams of protein in this much food."""',
    '    return grams * per_100g / 100',
    '',
    '',
    'def kcal_in(grams, per_100g):',
    '    """Calories (kcal) in this much food."""',
    '    return round(grams * per_100g / 100)'
  ];
  const TESTS = [
    'print("Testing the cookbook")',
    'print(protein_in(150, 17))',
    'print(kcal_in(150, 130))'
  ];
  const GUARDED = CARDS.concat(['', '', 'if __name__ == "__main__":'], TESTS.map(l => '    ' + l));
  const KITCHEN = { 'kitchen.py': CARDS.join('\n') + '\n' };
  const KITCHEN_GUARDED = { 'kitchen.py': GUARDED.join('\n') + '\n' };

  // A book standing on a shelf: spine with a label written bottom to top.
  const book = (x, base, w, h, fill, label, txt) =>
    `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<text transform="translate(${x + w / 2 + 5} ${base - 12}) rotate(-90)" font-size="14" font-weight="800" fill="${txt || P.ink}">${label}</text>`;
  const fileCard = (x, y, name, lines, col) =>
    box(x, y, 210, 30 + lines.length * 22, P.white, 10) +
    T(x + 12, y + 20, name, { s: 13, m: true, a: 'start', f: P.ink2 }) +
    lines.map((l, i) => T(x + 12, y + 44 + i * 22, l[0], { s: 12, m: true, a: 'start', f: l[1] || P.ink })).join('');

  const ideaSvg = svg(600, 360, 'Top: before. coach.py and planner.py each hold their own copy of the protein_in and kcal_in cards. The typo was fixed in coach.py, which says rice is 195 kcal, but planner.py still has the old copy and says 1950 kcal. Bottom: after. The cards live once, in a cookbook called kitchen on the shelf, next to the books that come with Python, math, time and json. coach.py and planner.py both import kitchen and both say 195 kcal.',
    T(300, 20, 'BEFORE: the cards copied into two files', { s: 13, f: P.danger }) +
    fileCard(24, 34, 'coach.py', [['def protein_in(...)'], ['def kcal_in(...)  / 100'], ['rice: 195 kcal', P.ok]]) +
    fileCard(356, 34, 'planner.py', [['def protein_in(...)'], ['def kcal_in(...)  / 10', P.danger], ['rice: 1950 kcal', P.danger]]) +
    T(295, 92, '≠', { s: 30, f: P.danger }) +
    `<line x1="20" y1="148" x2="580" y2="148" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 172, 'AFTER: one cookbook on the shelf', { s: 13, f: P.ok }) +
    book(70, 300, 34, 96, P.warnT, 'math') + book(108, 300, 30, 84, P.okT, 'time') + book(142, 300, 36, 110, P.tint, 'json') +
    book(182, 300, 50, 120, P.accent, 'kitchen', P.white) +
    `<rect x="56" y="300" width="196" height="8" rx="3" fill="${P.ink}"/>` +
    T(154, 330, 'kitchen.py is a module', { s: 12.5, w: 700, f: P.accent }) +
    fileCard(340, 186, 'coach.py', [['import kitchen', P.ok], ['rice: 195 kcal', P.ok]]) +
    fileCard(340, 270, 'planner.py', [['import kitchen', P.ok], ['rice: 195 kcal', P.ok]]) +
    arrow(338, 212, 240, 226, P.ok, 2.5) + arrow(338, 296, 240, 250, P.ok, 2.5));
  const plannerCopy = [
    '# planner.py: Ana\'s running planner, with the cards pasted in',
    'def kcal_in(grams, per_100g):',
    '    return round(grams * per_100g / 10)',
    '',
    'print(f"Rice: {kcal_in(150, 130)} kcal")'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${code(plannerCopy, { title: 'planner.py, the old copy', bad: [3] })}${term(['$ python3 planner.py', 'Rice: 1950 kcal'], 'terminal')}</div>`;

  // The code: kitchen.py and coach.py.
  const coach = [
    'import kitchen',
    '',
    'ben = kitchen.protein_in(150, 17) + kitchen.protein_in(200, 9)',
    'print(f"Ben\'s lunch: {ben} g protein")',
    '',
    'rice = kitchen.kcal_in(150, 130)',
    'print(f"Ana\'s rice: {rice} kcal")'
  ];
  const dotSvg = svg(600, 150, 'kitchen.protein_in(150, 17) read in three pieces: kitchen is the book, the dot means from that book, protein_in is the page called that. Three ways to write the import: import kitchen then kitchen.protein_in, from kitchen import protein_in then protein_in, import kitchen as kc then kc.protein_in.',
    T(300, 34, 'kitchen.protein_in(150, 17)', { s: 22, m: true }) +
    arrow(178, 60, 150, 92, P.accent, 2.5) + T(140, 112, 'the book', { s: 13, f: P.accent }) +
    arrow(276, 60, 276, 92, P.warn, 2.5) + T(276, 112, 'the dot: "from that book,"', { s: 13, f: P.warn }) +
    arrow(360, 60, 430, 92, P.ok, 2.5) + T(470, 112, '"the page called"', { s: 13, f: P.ok }) +
    T(300, 142, 'Python opens kitchen.py, finds the card, and calls it.', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${code(CARDS, { title: 'kitchen.py (the cookbook, already in the box\'s folder)' })}${run(coach, { title: 'coach.py', files: KITCHEN })}${dotSvg}</div>`;

  // The pain: the cookbook's own test lines run on import.
  const leaky = CARDS.concat(['', ''], TESTS);
  const coachSmall = [
    'import kitchen',
    '',
    'ben = kitchen.protein_in(150, 17) + kitchen.protein_in(200, 9)',
    'print(f"Ben\'s lunch: {ben} g protein")'
  ];
  const twice = [
    'import kitchen',
    'from kitchen import kcal_in',
    '',
    'print(f"Ana\'s rice: {kcal_in(150, 130)} kcal")'
  ];
  const painPic = `<div style="width:100%;min-width:0">${code(leaky, { title: 'kitchen.py, with test lines at the bottom', bad: [11, 12, 13] })}` +
    code(coachSmall, { title: 'coach.py' }) +
    term(['$ python3 kitchen.py', 'Testing the cookbook', '25.5', '195', '$ python3 coach.py', 'Testing the cookbook', '25.5', '195', "Ben's lunch: 43.5 g protein"], 'terminal, Python 3.15') +
    code(twice, { title: 'twice.py, imports kitchen two times' }) +
    term(['$ python3 twice.py', 'Testing the cookbook', '25.5', '195', "Ana's rice: 195 kcal"], 'terminal, Python 3.15') + `</div>`;

  // The fix: the __main__ guard.
  const coachGuard = [
    'import kitchen',
    '',
    'ben = kitchen.protein_in(150, 17) + kitchen.protein_in(200, 9)',
    'print(f"Ben\'s lunch: {ben} g protein")',
    '',
    'print("In coach.py, __name__ is", __name__)',
    'print("In kitchen.py, __name__ is", kitchen.__name__)'
  ];
  const nameDemo = CARDS.concat(['', '', 'print("kitchen.py thinks its name is", __name__)', '', 'if __name__ == "__main__":'], TESTS.map(l => '    ' + l));
  const fixPic = `<div style="width:100%;min-width:0">${run(GUARDED, { title: 'kitchen.py, run on its own' })}${run(coachGuard, { title: 'coach.py', files: KITCHEN_GUARDED })}` +
    code(nameDemo, { title: 'kitchen.py, with one extra line to show its name', hi: [11, 13] }) +
    term(['$ python3 kitchen.py', 'kitchen.py thinks its name is __main__', 'Testing the cookbook', '25.5', '195', '$ python3 coach.py', 'kitchen.py thinks its name is kitchen', "Ben's lunch: 43.5 g protein"], 'terminal, Python 3.15') + `</div>`;

  // Try it: Ana's planner, with from ... import and import math.
  const planner = [
    'import math',
    'from kitchen import kcal_in',
    '',
    'breakfast = kcal_in(80, 380) + kcal_in(250, 64)',
    'print(f"Ana\'s breakfast: {breakfast} kcal")',
    '',
    'bowl = kcal_in(150, 130)',
    'bowls = math.ceil(700 / bowl)',
    'print(f"Before the long run: {bowls} bowls of rice, {bowl} kcal each")'
  ];

  // The catch: when import goes wrong.
  const typo = [
    'import kitchn',
    '',
    'print(kitchn.kcal_in(150, 130))'
  ];
  const jsonFile = [
    'import json',
    '',
    'pantry = {"rice": 900, "oats": 400}',
    'with open("pantry.json", "w") as f:',
    '    json.dump(pantry, f)'
  ];
  const shelfSvg = svg(600, 190, 'The shelf Python searches first is your own folder. Your notebook called json.py stands in front of the real json book that came with Python, so Python grabs your notebook. It has no dump card, so json.dump fails.',
    book(84, 160, 46, 112, P.accent, 'kitchen', P.white) + book(134, 160, 34, 96, P.warnT, 'math') + book(172, 160, 30, 84, P.okT, 'time') + book(206, 160, 40, 120, P.tint, 'json') +
    `<rect x="70" y="160" width="190" height="8" rx="3" fill="${P.ink}"/>` +
    box(196, 76, 66, 84, P.white, 6) + T(229, 110, 'json', { s: 13, m: true, f: P.danger }) + T(229, 128, '.py', { s: 13, m: true, f: P.danger }) +
    T(171, 186, 'your folder comes first', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(306, 110, 270, 110, P.danger, 2.5) +
    T(312, 96, 'Python grabs YOUR json.py.', { s: 14, f: P.danger, a: 'start' }) +
    T(312, 120, 'It has no dump card:', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    T(312, 142, 'AttributeError', { s: 13, m: true, f: P.danger, a: 'start' }));
  const catchPic = `<div style="width:100%;min-width:0">${run(typo, { title: 'coach.py', files: KITCHEN })}` +
    term(['$ python3 coach.py', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/coach.py", line 1, in <module>', '    import kitchn', "ModuleNotFoundError: No module named 'kitchn'. Did you mean: 'kitchen'?"], 'terminal, Python 3.15') +
    term(['$ ls', 'coach.py  recipes', '$ ls recipes', 'kitchen.py', '$ python3 coach.py', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/coach.py", line 1, in <module>', '    import kitchen', "ModuleNotFoundError: No module named 'kitchen'"], 'terminal, kitchen.py is one folder deeper') +
    shelfSvg + code(jsonFile, { title: 'json.py (your lesson 59 practice file, badly named)', bad: [5] }) +
    term(['$ python3 json.py', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/json.py", line 1, in <module>', '    import json', '  File "/Users/you/kitchen/json.py", line 5, in <module>', '    json.dump(pantry, f)', '    ^^^^^^^^^', "AttributeError: module 'json' has no attribute 'dump' (consider renaming '/Users/you/kitchen/json.py' since it has the same name as the standard library module named 'json' and prevents importing that standard library module)"], 'terminal, Python 3.15') + `</div>`;

  COURSE.add({
    id: 'l60', minutes: 13,
    summary: 'A <b>module</b> is just a <code>.py</code> file. Put your recipe cards in <code>kitchen.py</code> once, and every program in the same folder can use them: <code>import kitchen</code>, then <code>kitchen.protein_in(150, 17)</code>. The <b>dot</b> means "from that book, the card called". <code>from kitchen import protein_in</code> brings one card in by name, and <code>import kitchen as kc</code> gives the book a short nickname. Python runs a module\'s top-level code <b>once</b>, on the first import. Put the cookbook\'s own test lines under <code>if __name__ == "__main__":</code>, so they run only when you run the file on its own. A wrong name, or a file in another folder, gives <code>ModuleNotFoundError</code>. Never name your own file after a module you use, like <code>json.py</code> or <code>random.py</code>.',
    video: {
      src: 'videos/l60-modules-and-import.mp4', poster: 'videos/l60-modules-and-import.jpg', length: '1 min 8 s',
      script: [
        'Kitchen Coach has grown to 300 lines. Its protein and calorie cards are copy-pasted into Ana\'s planner too.',
        'You fix a typo in one copy. The other copy still says a bowl of rice is 1950 calories.',
        'So move the cards into their own file, kitchen.py. That file is a module. A cookbook on the shelf.',
        'Import kitchen takes the book off the shelf. kitchen.protein_in opens it at the right page. The dot means, from that book, the page called.',
        'Coach and planner both import it. Fix a card once, and it is fixed everywhere.',
        'But the cookbook\'s own test lines print inside Coach too. So tuck them under, if __name__ == "__main__". A bookmark: only when you read this book on its own.',
        'One trap. Save your own notes as json.py, and Python grabs your notebook, not the real json book.',
        'A module is a cookbook. Write the cards once, import them anywhere.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Copy-pasted cards drift apart.',
        text: [
          'Kitchen Coach has grown to one file of <b>300 lines</b>. Ana also has her own running planner, <code>planner.py</code>. It needs the same recipe cards from lesson 45, <code>protein_in</code> and <code>kcal_in</code>, so you <b>copy-pasted</b> them in.',
          'Then you found a typo in <code>kcal_in</code>: <code>/ 10</code> instead of <code>/ 100</code>. You fixed it in Kitchen Coach. The copy in the planner still has it, so the planner says a 150 g bowl of rice is <b>1950 kcal</b>. The right answer is 195. Two copies, two answers.',
          'The fix is a <b>cookbook</b>. Put the cards in one file, <code>kitchen.py</code>, and let both programs read from it. A Python file that other files use like this is called a <b>module</b>. There is nothing special inside: a module is <b>just a <code>.py</code> file</b>.'
        ],
        tip: 'You have imported modules before: <code>import math</code> in lesson 21, <code>import time</code> in lesson 42, <code>import json</code> in lesson 59. Those are cookbooks that come with Python. Today you write your own.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'import kitchen, then kitchen.protein_in.',
        text: [
          'The first box shows <code>kitchen.py</code>: two cards and nothing else. It is already saved in the Run box\'s folder, next to <code>coach.py</code>. You cannot see it in the box, so it is shown above.',
          '<code>import kitchen</code> means "find <code>kitchen.py</code> and take that cookbook off the shelf". You write the file name <b>without</b> <code>.py</code>. Python looks first in the folder of the program you run.',
          'After that, <code>kitchen</code> is a name, like a variable. <code>kitchen.protein_in(150, 17)</code> reads: "from the kitchen book, the card called <code>protein_in</code>, with 150 and 17". The <b>dot</b> is the same dot as in <code>f.write</code> (lesson 56): it reaches inside something. Press <b>Run</b>: 43.5 g for Ben, 195 kcal for Ana.',
          'Now add Ben\'s eggs. Add the line <code>eggs = kitchen.protein_in(100, 13)</code> after line 3, change line 4 to print <code>ben + eggs</code>, and run it again. It should say 56.5.'
        ],
        tip: 'Each Run here starts in a fresh folder with <code>kitchen.py</code> in it. On your computer, save <code>kitchen.py</code> and <code>coach.py</code> in the <b>same folder</b> and run <code>python3 coach.py</code> there.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The cookbook\'s test lines run on import.',
        text: [
          'While you wrote <code>kitchen.py</code>, you added three test lines at the bottom and ran it with <code>python3 kitchen.py</code>. Good habit: you saw 25.5 and 195 and knew the cards worked.',
          'But <code>import kitchen</code> <b>runs the whole file</b>, top to bottom. That is how the cards get made: each <code>def</code> line runs and stores a card. The test lines at the left edge run too. So <code>python3 coach.py</code> now starts with <code>Testing the cookbook</code>, <code>25.5</code> and <code>195</code>, lines that mean nothing to Ben.',
          'Python runs a module <b>once</b>, on the first import, and keeps it in memory. <code>twice.py</code> imports <code>kitchen</code> two times, and the test lines still appear only once. The second import just reuses the open book.'
        ],
        warn: 'Top-level code is every line at the left edge that is not inside a <code>def</code>. In a module, keep it to cards, names and settings. Anything that prints or does work there happens to <b>every</b> program that imports it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'if __name__ == "__main__": only on its own.',
        text: [
          'Every Python file has a hidden name, <code>__name__</code>, with two underscores on each side. When you <b>run</b> a file, its <code>__name__</code> is <code>"__main__"</code>: "the main program". When another file <b>imports</b> it, its <code>__name__</code> is the module name, <code>"kitchen"</code>.',
          'So put the test lines under <code>if __name__ == "__main__":</code>, pushed in by 4 spaces. It is a bookmark that says: <b>only when you read this book on its own</b>. Press <b>Run</b> on the first box, <code>kitchen.py</code> run on its own: the tests print. Press <b>Run</b> on <code>coach.py</code>: it imports the same file, and only Ben\'s line appears.',
          'The second box also prints both names. In the Run boxes, the code you run is always the main program, so its <code>__name__</code> is <code>"__main__"</code>. The imported book is <code>"kitchen"</code>.',
          'The terminal below shows the same thing on your computer, with one extra line in <code>kitchen.py</code> that prints its name each time the file runs.'
        ],
        tip: 'You will see <code>if __name__ == "__main__":</code> at the bottom of a lot of Python files. Now you can read it: "the lines below are for running this file directly, not for anyone who imports it".'
      },
      {
        label: 'Try it', pic: run(planner, { title: 'planner.py', files: KITCHEN }),
        h: 'from kitchen import kcal_in, and a book from Python.',
        text: [
          'Ana\'s planner only needs one card. <code>from kitchen import kcal_in</code> takes that card out of the book by name, so line 4 can say <code>kcal_in(80, 380)</code> with no <code>kitchen.</code> in front. 80 g of oats and 250 ml of milk: 464 kcal.',
          'Line 1 imports <code>math</code>, a cookbook that comes with Python. <code>math.ceil</code> rounds a number <b>up</b> to a whole number. Ana wants 700 kcal of rice before her long run. 700 / 195 is 3.59, so she needs 4 bowls. Press <b>Run</b>.',
          'Now try the other two ways. Change line 2 to <code>import kitchen as kc</code>: <code>as</code> gives the book a short nickname. Line 4 and line 7 must now say <code>kc.kcal_in(...)</code>. Run it. Then change Ana\'s goal on line 8 from 700 to 900, and run it again: 5 bowls.',
          'Want both cards? <code>from kitchen import kcal_in, protein_in</code>, with a comma.'
        ],
        tip: 'Which one to use? <code>import kitchen</code> is the clearest: every call says which book the card came from. <code>from ... import</code> is fine for one or two cards you use a lot. Use <code>as</code> for long names. Lesson 61, The standard library, opens more of the books that come with Python. Lesson 62 shows a new way to import in 3.15.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'When import cannot find the right book.',
        text: [
          '<b>Wrong name.</b> Press <b>Run</b> on the first box: <code>ModuleNotFoundError: No module named \'kitchn\'</code>. One letter is missing, and Python cannot guess. Python 3.15 on your computer even adds <code>Did you mean: \'kitchen\'?</code>. The page runs 3.14, which does not. Fix the spelling on lines 1 and 3 and run it again.',
          '<b>Wrong folder.</b> If <code>kitchen.py</code> sits in a sub-folder like <code>recipes</code>, <code>import kitchen</code> does not look inside it. You get the same error. Keep the cookbook next to the program that imports it.',
          '<b>Your own file hides a real one.</b> Python looks in <b>your folder first</b>. You saved your lesson 59 practice as <code>json.py</code>. Now <code>import json</code> finds <b>your</b> file, not the json module that comes with Python, and your file has no <code>dump</code> card. The error looks crazy: "module json has no attribute dump". Read the note in brackets: Python 3.15 tells you exactly what happened and says to rename your file.',
          'Rename it to something like <code>save_pantry.py</code>, and the real json is back. The same trap waits for files called <code>random.py</code>, <code>math.py</code> or <code>time.py</code>.'
        ],
        warn: 'Never name your own file after a module you import. If a module that always worked suddenly "has no attribute", look in your folder for a file with the same name.'
      }
    ],
    exercises: [
      {
        file: 'l60_kitchen.py', title: 'Share the cookbook',
        task: 'This exercise is <b>two files</b>. <code>l60_kitchen.py</code> is the cookbook: finish its <code>kcal_in</code> card, then put its test lines under <code>if __name__ == "__main__":</code>. <code>l60_coach.py</code> imports the cookbook and checks your work. The check calls your card with <b>other numbers</b>, and checks that importing the cookbook prints nothing.',
        steps: [
          'Press <b>Open in VS Code</b>. Next to it, in the same folder, is <code>l60_coach.py</code>. Open that too.',
          'Run <code>l60_coach.py</code> first. Look at what it prints: the cookbook\'s test lines leak into Coach, and Ana\'s breakfast is 0 kcal. The check gives you a hint.',
          'In <code>l60_kitchen.py</code>, between <code>START</code> and <code>END</code>: make <code>kcal_in</code> return the calories, rounded to a whole number. Then put the three test lines under <code>if __name__ == "__main__":</code>, each pushed in by 4 spaces. Save the file.',
          'Run <code>l60_kitchen.py</code> on its own: the tests still print. Then run <code>l60_coach.py</code> again until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Your program says <code>import kitchen</code>. What does Python look for first?',
        options: ['A file called kitchen.py in the folder of the program you run', 'A folder called kitchen on the desktop', 'A function called kitchen in the same file', 'A website called kitchen'],
        answer: 0,
        why: 'A module is just a <code>.py</code> file. <code>import kitchen</code> looks for <code>kitchen.py</code>, starting in the folder of the program you run. You leave off the <code>.py</code> in the import line.',
        hint: 'A module is just a file. Which file, and where?'
      },
      {
        type: 'fix', q: 'This stops with <code>NameError: name \'protein_in\' is not defined</code>. <code>kitchen.py</code>, with its <code>protein_in</code> card, is in the folder. Fix it so the program prints <code>25.5</code>.',
        code: ['import kitchen', '', 'print(protein_in(150, 17))'],
        title: 'coach.py', files: KITCHEN,
        check: [
          'if out.strip() == "25.5":',
          '    ok = True',
          'else:',
          '    msg = "It should print just 25.5. It printed: " + out.strip()'
        ].join('\n'),
        why: '<code>import kitchen</code> brings in the book, not its cards. Either reach inside with the dot, <code>kitchen.protein_in(150, 17)</code>, or bring the card in by name: <code>from kitchen import protein_in</code>.',
        hint: 'Put <code>kitchen.</code> in front of <code>protein_in</code> on line 3.'
      },
      {
        type: 'match', q: 'Match each import line to how you then call the card.',
        pairs: [
          ['import kitchen', 'kitchen.kcal_in(150, 130)'],
          ['from kitchen import kcal_in', 'kcal_in(150, 130)'],
          ['import kitchen as kc', 'kc.kcal_in(150, 130)'],
          ['import math', 'math.ceil(3.59)']
        ],
        why: '<code>import X</code> gives you the book, so you use the dot. <code>from X import card</code> gives you the card itself. <code>as</code> gives the book a nickname. <code>math</code> is a book that comes with Python and works the same way.',
        hint: 'After the import, which name exists: the book, the nickname, or the card?'
      },
      {
        type: 'pick', q: '<code>kitchen.py</code> has <code>print("Cookbook open")</code> at the left edge. How many times does <code>Cookbook open</code> appear when you run <code>python3 coach.py</code>?',
        pic: code(['import kitchen', 'from kitchen import kcal_in', 'import kitchen', '', 'print(kcal_in(150, 130))'], { title: 'coach.py' }),
        options: ['Once', 'Three times', 'Never: imports do not run code', 'Twice'],
        answer: 0,
        why: 'Python runs a module once, on the first import, and keeps it in memory. The next imports reuse it. So <code>Cookbook open</code> prints once, then <code>195</code>.',
        hint: 'The second time, is the book already off the shelf?'
      },
      {
        type: 'pick', q: 'What does <code>python3 coach.py</code> print?',
        pic: code(['def kcal_in(grams, per_100g):', '    return round(grams * per_100g / 100)', '', 'if __name__ == "__main__":', '    print("Testing:", kcal_in(150, 130))'], { title: 'kitchen.py' }) +
          code(['from kitchen import kcal_in', '', 'print("Ana:", kcal_in(80, 380))'], { title: 'coach.py' }),
        options: ['Ana: 304', 'Testing: 195, then Ana: 304', 'Testing: 195', 'Nothing: the guard stops the whole cookbook'],
        answer: 0,
        why: 'When coach.py imports kitchen, kitchen\'s <code>__name__</code> is <code>"kitchen"</code>, not <code>"__main__"</code>, so the test line is skipped. The <code>def</code> still runs, so the card works: 80 * 380 / 100 = 304.',
        hint: 'Who is the main program here: coach.py or kitchen.py?'
      },
      {
        type: 'pick', q: 'This worked yesterday. Today, in a folder where you also saved a file called <code>random.py</code>, it stops with <code>AttributeError: module \'random\' has no attribute \'choice\'</code>. What is the fix?',
        pic: code(['import random', '', 'print(random.choice(["trifle", "sorbet", "pudding"]))'], { title: 'dessert.py' }),
        options: ['Rename your random.py to something else', 'Reinstall Python', 'Write import random twice', 'Change choice to Choice'],
        answer: 0,
        why: 'Python looks in your folder first, so <code>import random</code> found your <code>random.py</code>, which has no <code>choice</code> card. Rename your file and Python finds the real random module again. Python 3.15 says so in the error, too.',
        hint: 'Which random did Python open?'
      },
      {
        type: 'pick', q: 'Back to lesson 59. You saved the pantry with <code>import json</code>, then <code>json.dump(pantry, f)</code>. What is <code>json</code> in that code?',
        options: ['A module: a cookbook of cards that comes with Python', 'A variable you made yourself', 'A file in your folder called pantry.json', 'A keyword, like if or for'],
        answer: 0,
        why: '<code>json</code> is a module that comes with Python. <code>import json</code> takes it off the shelf, and <code>json.dump</code> is "from the json book, the card called dump". Exactly like <code>kitchen.protein_in</code>.',
        hint: 'Read json.dump the way you read kitchen.protein_in.'
      },
      {
        type: 'type', q: 'Type the line that brings <b>only</b> the <code>kcal_in</code> card out of <code>kitchen</code>, so you can call it as <code>kcal_in(150, 130)</code>.',
        prompt: '>>>',
        answers: ['from kitchen import kcal_in'],
        why: '<code>from kitchen import kcal_in</code>. No <code>.py</code>, and no brackets after the card\'s name: you bring the card in, you do not call it yet.',
        hint: 'from, the book, import, the card.'
      }
    ]
  });
})();
