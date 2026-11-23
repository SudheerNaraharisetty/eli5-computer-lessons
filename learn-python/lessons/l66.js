/* Lesson 66: Classes (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l66  Classes
     ===================================================================== */

  // A loose recipe slip: a dict written by hand.
  const slip = (x, y, rot, lines, bad) =>
    `<g transform="rotate(${rot} ${x + 110} ${y + 42})">` + box(x, y, 220, 84, P.white, 10) +
    lines.map((l, i) => T(x + 16, y + 30 + i * 26, l, { s: 13, m: true, a: 'start', f: bad === i ? P.danger : P.ink })).join('') + '</g>';
  // A plate made from the template, with its labels.
  const plate = (x, y, varName, name, protein, missed) =>
    box(x, y, 172, 170, P.white, 12) +
    `<circle cx="${x + 86}" cy="${y + 44}" r="28" fill="${P.paper}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x + 86}" cy="${y + 44}" r="15" fill="${P.warnT}" stroke="${P.ink2}" stroke-width="1.5"/>` +
    T(x + 86, y + 94, varName, { s: 14, m: true }) +
    `<rect x="${x + 10}" y="${y + 106}" width="152" height="24" rx="7" fill="${P.okT}"/>` +
    T(x + 18, y + 123, '.name', { s: 11.5, m: true, a: 'start', f: P.ok }) + T(x + 156, y + 123, name, { s: 11.5, m: true, a: 'end' }) +
    (missed
      ? `<rect x="${x + 10}" y="${y + 136}" width="152" height="24" rx="7" fill="none" stroke="${P.danger}" stroke-width="2" stroke-dasharray="5 4"/>` +
        T(x + 18, y + 153, '.protein', { s: 11.5, m: true, a: 'start', f: P.danger }) + T(x + 156, y + 153, 'missed', { s: 11.5, a: 'end', f: P.danger })
      : `<rect x="${x + 10}" y="${y + 136}" width="152" height="24" rx="7" fill="${P.okT}"/>` +
        T(x + 18, y + 153, '.protein', { s: 11.5, m: true, a: 'start', f: P.ok }) + T(x + 156, y + 153, protein, { s: 11.5, m: true, a: 'end' }));

  /* ---- The idea: loose slips, or one template card ---- */
  const ideaPic = svg(600, 500, 'Left: two loose recipe slips written as dicts. Ben\'s slip says "protien", a typo nobody notices. Right: one template card on the wall called class Dish. Three plates are made from it, soup, salad and pudding, and every one is the same kind of thing: a Dish. The pudding plate forgot its protein label.',
    T(150, 24, 'Loose slips (dicts)', { s: 14, f: P.ink2 }) +
    slip(36, 44, -3, ['{"name": "lentil soup",', ' "protein": 18}']) +
    slip(48, 140, 2, ['{"name": "bean chili",', ' "protien": 15}'], 1) +
    T(150, 252, 'a typo hides until later', { s: 12.5, w: 700, f: P.danger }) +
    T(450, 24, 'One template card', { s: 14, f: P.ink2 }) +
    box(340, 56, 220, 86, P.tint, 14) + T(450, 92, 'class Dish', { s: 18, m: true, f: P.accent }) +
    T(450, 122, 'on the wall', { s: 12, w: 700, f: P.ink2 }) +
    `<path d="M450 150 V272 M116 272 H484" fill="none" stroke="${P.ink2}" stroke-width="2.5"/>` +
    arrow(116, 272, 116, 288, P.ink2, 2.5) + arrow(300, 272, 300, 288, P.ink2, 2.5) + arrow(484, 272, 484, 288, P.ink2, 2.5) +
    T(462, 214, 'Dish()', { s: 13, m: true, f: P.ink2, a: 'start' }) +
    plate(30, 294, 'soup', "'lentil soup'", '18') +
    plate(214, 294, 'salad', "'green salad'", '12') +
    plate(398, 294, 'pudding', "'rice pudding'", '', true) +
    T(300, 492, 'Dish() makes a new, separate dish each time. Every one is a Dish.', { s: 12.5, w: 700, f: P.ok }));

  /* ---- The code: class Dish, call it, label each dish ---- */
  const dishes = [
    'class Dish:',
    '    pass',
    '',
    '',
    'soup = Dish()',
    'salad = Dish()',
    'print(type(soup))',
    'print(type(salad))',
    '',
    'soup.name = "lentil soup"',
    'soup.protein = 18',
    'salad.name = "green salad"',
    'salad.protein = 12',
    '',
    'print(soup.name, soup.protein)',
    'print(salad.name, salad.protein)'
  ];
  const readSvg = svg(600, 150, 'How to read class Dish. The word class, then the name of the new type with a capital letter, then a colon. Inside, pass means nothing on the card yet. Below, Dish with brackets calls the class: it makes one new Dish and hands it back.',
    T(150, 44, 'class Dish:', { s: 22, m: true }) +
    `<path d="M66 56 h66" stroke="${P.accent}" stroke-width="2.5"/>` + T(99, 76, 'a new type', { s: 12, w: 700, f: P.accent }) +
    `<path d="M146 56 h66" stroke="${P.ok}" stroke-width="2.5"/>` + T(179, 76, 'Capital D', { s: 12, w: 700, f: P.ok }) +
    box(40, 92, 220, 44, P.tint, 10) + T(150, 120, 'the template card', { s: 14, f: P.accent }) +
    T(450, 44, 'soup = Dish()', { s: 22, m: true }) +
    `<path d="M492 56 h46" stroke="${P.warn}" stroke-width="2.5"/>` + T(515, 76, 'call it', { s: 12, w: 700, f: P.warn }) +
    box(340, 92, 220, 44, P.warnT, 10) + T(450, 120, 'one new dish', { s: 14, f: P.warn }));
  const codePic = `<div style="width:100%;min-width:0">${run(dishes, { title: 'dishes.py' })}${readSvg}</div>`;

  /* ---- The pain: labels by hand, one by one ---- */
  const byHand = [
    'class Dish:',
    '    pass',
    '',
    '',
    'soup = Dish()',
    'soup.name = "lentil soup"',
    'soup.protein = 18',
    '',
    'chili = Dish()',
    'chili.name = "bean chili"',
    'chili.protien = 15',
    '',
    'pudding = Dish()',
    'pudding.name = "rice pudding"',
    '',
    'for dish in [soup, chili, pudding]:',
    '    print(dish.name, dish.protein)'
  ];
  const painSvg = svg(600, 214, 'Three plates labelled by hand. Soup has a name and a protein. Chili has a name and a label spelled protien, so there is no protein label. Pudding has a name and no protein label at all: it was forgotten.',
    plate(16, 16, 'soup', "'lentil soup'", '18') +
    box(212, 16, 172, 170, P.white, 12) +
    `<circle cx="298" cy="60" r="28" fill="${P.paper}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="298" cy="60" r="15" fill="${P.dangerT}" stroke="${P.ink2}" stroke-width="1.5"/>` +
    T(298, 110, 'chili', { s: 14, m: true }) +
    `<rect x="222" y="122" width="152" height="24" rx="7" fill="${P.okT}"/>` + T(230, 139, '.name', { s: 11.5, m: true, a: 'start', f: P.ok }) + T(368, 139, "'bean chili'", { s: 11.5, m: true, a: 'end' }) +
    `<rect x="222" y="152" width="152" height="24" rx="7" fill="${P.dangerT}"/>` + T(230, 169, '.protien', { s: 11.5, m: true, a: 'start', f: P.danger }) + T(368, 169, '15', { s: 11.5, m: true, a: 'end' }) +
    plate(408, 16, 'pudding', "'rice pudding'", '', true) +
    T(298, 206, 'a typo makes a NEW label', { s: 12.5, w: 700, f: P.danger }) +
    T(494, 206, 'forgotten', { s: 12.5, w: 700, f: P.danger }));
  const forgotTerm = term([
    '$ python3 by_hand.py',
    'lentil soup 18',
    'bean chili 15',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/by_hand.py", line 17, in <module>',
    '    print(dish.name, dish.protein)',
    '                     ^^^^^^^^^^^^',
    "AttributeError: 'Dish' object has no attribute 'protein'"
  ], 'after fixing the typo, terminal, Python 3.15');
  const painPic = `<div style="width:100%;min-width:0">${run(byHand, { title: 'by_hand.py' })}${painSvg}${forgotTerm}</div>`;

  /* ---- The fix: one recipe card that makes every dish ---- */
  const maker = [
    'class Dish:',
    '    pass',
    '',
    '',
    'def make_dish(name, protein):',
    '    dish = Dish()',
    '    dish.name = name',
    '    dish.protein = protein',
    '    return dish',
    '',
    '',
    'soup = make_dish("lentil soup", 18)',
    'chili = make_dish("bean chili", 15)',
    'pudding = make_dish("rice pudding", 6)',
    '',
    'for dish in [soup, chili, pudding]:',
    '    print(f"{dish.name}: {dish.protein} g protein")',
    '',
    'print(isinstance(pudding, Dish))'
  ];
  const fixPic = run(maker, { title: 'make_dish.py' });

  /* ---- Try it: a label on the template card itself ---- */
  const shared = [
    'class Dish:',
    '    kitchen = "home"     # on the template card: every dish shares it',
    '',
    '',
    'soup = Dish()',
    'salad = Dish()',
    'soup.name = "lentil soup"',
    'salad.name = "green salad"',
    'print(soup.name, "from", soup.kitchen)',
    'print(salad.name, "from", salad.kitchen)',
    '',
    'Dish.kitchen = "Ben\'s flat"',
    'print(soup.name, "from", soup.kitchen)',
    'print(salad.name, "from", salad.kitchen)'
  ];

  /* ---- The catch: forget the brackets ---- */
  const noBrackets = [
    'class Dish:',
    '    pass',
    '',
    '',
    'soup = Dish            # no brackets!',
    'soup.name = "lentil soup"',
    '',
    'pudding = Dish()',
    'print(pudding.name)',
    'print(soup)',
    'print(pudding)'
  ];
  const wallSvg = svg(600, 150, 'Without brackets, soup = Dish puts a second label on the template card itself. soup.name then writes "lentil soup" on the card on the wall, and every dish made from it after that shows that name. With brackets, Dish() makes a new plate.',
    box(16, 20, 268, 110, P.dangerT, 14) + T(150, 48, 'soup = Dish', { s: 16, m: true, f: P.danger }) +
    T(150, 78, 'a label on the CARD', { s: 13.5 }) + T(150, 106, 'every dish now says lentil soup', { s: 12, w: 700, f: P.danger }) +
    box(316, 20, 268, 110, P.okT, 14) + T(450, 48, 'soup = Dish()', { s: 16, m: true, f: P.ok }) +
    T(450, 78, 'a NEW plate', { s: 13.5 }) + T(450, 106, 'its labels are its own', { s: 12, w: 700, f: P.ok }));
  const catchPic = `<div style="width:100%;min-width:0">${run(noBrackets, { title: 'no_brackets.py' })}${wallSvg}</div>`;

  COURSE.add({
    id: 'l66', minutes: 12,
    summary: 'A <b>class</b> is a template card for your own kind of object. <code>class Dish:</code> makes a new type, named with a <b>capital letter</b>. <code>pass</code> means "nothing here yet". <b>Call the class</b> with brackets to make an object: <code>soup = Dish()</code>. Every call makes a <b>new, separate</b> dish, and <code>type(soup)</code> says <code>&lt;class \'__main__.Dish\'&gt;</code>. You can write labels on a dish with the dot, <code>soup.name = "lentil soup"</code>, and read them back with <code>soup.name</code>. Labels written by hand go on <b>one</b> dish only, so it is easy to forget one or misspell one: <code>AttributeError: \'Dish\' object has no attribute \'protein\'</code>. A function that makes and labels each dish keeps them the same. A name set inside the class, like <code>kitchen = "home"</code>, is shared by every dish. And without brackets, <code>soup = Dish</code> is the template itself, not a new dish.',
    video: {
      src: 'videos/l66-classes.mp4', poster: 'videos/l66-classes.jpg', length: '1 min 8 s',
      script: [
        'You keep writing dishes as loose dictionaries. A name, and the protein. But Ben typed protien. Nothing warned him. Later, Kitchen Coach asks for protein. Key error.',
        'Make a template instead. A class. Class Dish, with a capital D. Pass means nothing on it yet. It is the card on the wall.',
        'Call the class, with brackets, and it makes a new dish. Soup. Salad. Pudding. Each call makes a new, separate plate. Ask type: each one is a Dish.',
        'Now label each plate by hand. Soup dot name, lentil soup. Soup dot protein, 18. The salad gets its own labels.',
        'But by hand, it is easy to forget one. Chloe\'s pudding got a name, but no protein. Attribute error. A Dish object has no attribute protein.',
        'Next lesson, the template sets up every new dish for you, with init and self.',
        'A class is a template. Call it to make a new object.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A template card for a dish.',
        text: [
          'Kitchen Coach writes each dish down as a dict, the spice rack from lesson 37: <code>{"name": "lentil soup", "protein": 18}</code>. It works, but every dict is a <b>loose slip</b>. Nothing says what a dish should have. Ben wrote his chili as <code>{"name": "bean chili", "protien": 15}</code>. Nobody noticed, until Kitchen Coach asked for <code>chili["protein"]</code> and stopped with <code>KeyError: \'protein\'</code>.',
          'A <b>class</b> is a <b>template card</b> on the kitchen wall. It says "this is what a Dish is". Every dish you make from it is the <b>same kind of thing</b>: a Dish. In lesson 65 you met Python\'s own types, list, str, Path and date. A class lets you make <b>your own</b> type.',
          'The card is not a dish. You cannot eat the card. You use it to <b>make</b> dishes, as many as you like, and each one is a new, separate plate.'
        ],
        tip: 'In lesson 65, <code>type()</code> printed <code>&lt;class \'list\'&gt;</code>. That word "class" is the same one. A list is made from the list class. Your soup will be made from the Dish class.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'class makes the card. Calling it makes a dish.',
        text: [
          '<code>class Dish:</code> writes the template card. Then comes the name of your new type, with a <b>capital letter</b> (<code>Dish</code>, <code>Drink</code>, <code>KitchenTimer</code>), and a colon. That is how Python cooks tell a class from a function or a variable, which use small letters.',
          'The lines inside a class are indented, like the lines inside <code>def</code> (lesson 44). Our card has nothing on it yet, but Python needs at least one line there. <code>pass</code> is that line: it means "nothing here yet".',
          '<b>Call the class</b> with brackets to make a dish: <code>soup = Dish()</code>. Each call makes a <b>new, separate</b> object. <code>type(soup)</code> says <code>&lt;class \'__main__.Dish\'&gt;</code>: a Dish, made in this file (<code>__main__</code> is the name of the file you run, lesson 60).',
          'The dot from lesson 65 works on your dishes too, in both directions. <code>soup.name = "lentil soup"</code> <b>writes</b> a label on that one dish. <code>soup.name</code> <b>reads</b> it back. Press <b>Run</b>. Then make a third dish, <code>pudding = Dish()</code>, give it <code>.name = "rice pudding"</code> and <code>.protein = 6</code>, and print it.'
        ],
        tip: '<code>print(soup)</code> shows <code>&lt;__main__.Dish object at 0x1049ce120&gt;</code>: a Dish object and where it sits in memory. Not pretty. Lesson 72, Dunder methods, teaches print how to show your dish.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Labels by hand, one dish at a time.',
        text: [
          'Each dish needs a name and a protein. Your class does not know that. It is a blank card. So you write every label <b>by hand</b>, two lines per dish, and the more dishes you make, the more lines you write. Press <b>Run</b>.',
          'Python stops: <code>AttributeError: \'Dish\' object has no attribute \'protein\'. Did you mean: \'protien\'?</code> Ben\'s typo is back. <code>chili.protien = 15</code> did not fail. It quietly wrote a <b>new label</b> with the wrong name, so chili has no <code>protein</code>. Python 3.14 and 3.15 at least guess what you meant. (3.15 words it a little differently: <code>Did you mean \'.protien\' instead of \'.protein\'?</code>)',
          'Fix the typo and run it again. Now it stops on the pudding. Chloe\'s pudding got a name, but <b>nobody wrote its protein</b>. The same <code>AttributeError</code>, this time with no guess, because there is nothing close. And it stops at the <b>print</b>, far from the line where you forgot.'
        ],
        warn: 'A blank class keeps nothing in order. Python lets you write any label, with any spelling, on any one dish. A forgotten label only shows up later, when something reads it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One recipe card makes every dish the same way.',
        text: [
          'Write the labels in <b>one place</b>. <code>make_dish(name, protein)</code> is a recipe card (lesson 44). It calls <code>Dish()</code>, writes both labels on the new dish, and returns it. Every dish now comes out with <code>.name</code> and <code>.protein</code>, spelled the same way every time. Press <b>Run</b>.',
          'Now try to forget one. Add the line <code>toast = make_dish("cheese toast")</code> and run it. Python stops <b>at that line</b>: <code>TypeError: make_dish() missing 1 required positional argument: \'protein\'</code>. The mistake shows up where you made it, not three screens later.',
          'The last line uses <code>isinstance()</code> from lesson 13: "is this a Dish?" <code>True</code>. Your own class works with it like int and str do.'
        ],
        tip: 'This "make it and set it up" job is so common that Python gives every class a built-in place for it. Lesson 67, __init__ and self, moves <code>make_dish</code> <b>inside</b> the class, so <code>Dish("lentil soup", 18)</code> sets up each new dish by itself.'
      },
      {
        label: 'Try it', pic: run(shared, { title: 'shared.py' }),
        h: 'A label on the card is shared by every dish.',
        text: [
          'A name you write <b>inside</b> the class goes on the template card itself. <code>kitchen = "home"</code> is a <b>class attribute</b>: every dish reads it from the card, so both say <code>from home</code>. Press <b>Run</b>.',
          'Line 12 changes it on the card, <code>Dish.kitchen = "Ben\'s flat"</code>, and <b>both</b> dishes now say Ben\'s flat. Nobody touched soup or salad. They read the card.',
          'Now add a third dish for Chloe, <code>pudding = Dish()</code>, at the very end and print <code>pudding.kitchen</code>. A brand new dish already knows the kitchen. Then try <code>soup.kitchen = "cafe"</code> before the last two prints: only soup changes, because that writes a label on the soup plate, not on the card. Lesson 69, Attributes, has more.'
        ],
        tip: 'Use a class attribute only for something that is truly the same for every dish. A name or a protein is different for each dish, so it belongs on each plate.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'No brackets, no new dish.',
        text: [
          '<code>soup = Dish</code> with <b>no brackets</b> does not make a dish. It sticks a second label, <code>soup</code>, on the <b>template card itself</b>. Then <code>soup.name = "lentil soup"</code> writes on the card on the wall.',
          'Press <b>Run</b>. The brand new pudding says <code>lentil soup</code>: it read the name from the card. <code>print(soup)</code> shows <code>&lt;class \'__main__.Dish\'&gt;</code>, the class. <code>print(pudding)</code> shows <code>&lt;__main__.Dish object at 0x...&gt;</code>, a real dish. The number after <code>0x</code> changes every run.',
          'It is the same rule as in lesson 65: brackets press the button. <code>Dish</code> is the card. <code>Dish()</code> makes a dish. Add the brackets on line 5 and run it again: now the pudding has no name, and you get the <code>AttributeError</code> you expect.'
        ],
        warn: 'If every dish suddenly shows the same name, look for a missing <code>()</code> after the class name.'
      }
    ],
    exercises: [
      {
        file: 'l66_dish_template.py', title: 'A template for drinks',
        task: 'Ana drinks a <b>sports drink</b> on her long runs, and Chloe loves a <b>hot chocolate</b>. Write a <code>Drink</code> class, make <b>two separate</b> drinks from it, write a <code>name</code> and <code>calories</code> label on each, and print them. The check makes sure both are real Drink objects, not dicts, and not the class itself.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. There is no <code>Drink</code> yet, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, follow the four numbered comments: the class, two drinks, their labels, and two prints.',
          'Run the file until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Dish:', '    pass', '', '', 'pudding = Dish()', 'print(type(pudding))'], { title: 'what_type.py' }),
        options: ["<class '__main__.Dish'>", "<class 'type'>", "<class 'dict'>", 'pudding'],
        answer: 0,
        why: '<code>Dish()</code> made a new object from your class, so its type is Dish. <code>__main__</code> means the class was made in the file you ran. <code>&lt;class \'type\'&gt;</code> is what you get for the card itself, <code>type(Dish)</code>.',
        hint: 'What kind of thing does calling Dish() make?'
      },
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['class Dish:', '    pass', '', '', 'soup = Dish()', 'salad = Dish()', 'soup.name = "lentil soup"', 'print(salad.name)'], { title: 'two_dishes.py' }),
        options: ["AttributeError: 'Dish' object has no attribute 'name'", 'lentil soup', 'None', "KeyError: 'name'"],
        answer: 0,
        why: 'Each call to <code>Dish()</code> makes a <b>separate</b> dish. The label went on soup only. Salad never got a name, so reading it stops with an <code>AttributeError</code>.',
        hint: 'Is salad the same plate as soup?'
      },
      {
        type: 'fix', q: 'Kitchen Coach stops with an <code>AttributeError</code>. Fix it so it prints all three dishes with their protein. Chloe\'s rice pudding has <b>6</b> g.',
        code: byHand, title: 'by_hand.py',
        check: [
          'lines = out.splitlines()',
          'if any("Error" in line for line in lines):',
          '    msg = "It still stops with an error. Read the last line of it."',
          'elif lines[:2] != ["lentil soup 18", "bean chili 15"]:',
          '    msg = "The first two lines should be: lentil soup 18, then bean chili 15."',
          'elif lines[2:] != ["rice pudding 6"]:',
          '    msg = "The pudding needs its protein too: rice pudding 6."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Two fixes. <code>chili.protien</code> becomes <code>chili.protein</code>, and the pudding needs its own line, <code>pudding.protein = 6</code>. A blank class checks nothing, so every label written by hand is a chance to slip.',
        hint: 'Read the "Did you mean" part of the error first. After that fix, the next error names the dish that is still missing a label.'
      },
      {
        type: 'match', q: 'Match each line to what it does in the kitchen.',
        pairs: [
          ['class Dish:', 'Writes the template card'],
          ['pass', 'Nothing on the card yet'],
          ['soup = Dish()', 'Makes a new dish from the card'],
          ['soup.protein = 18', 'Writes a label on that one dish'],
          ['print(soup.protein)', 'Reads that label back']
        ],
        why: 'The class is the card. Calling it with brackets makes a dish. The dot with <code>=</code> writes a label on one dish. The dot alone reads it.',
        hint: 'Which line has brackets after the class name?'
      },
      {
        type: 'fill', q: 'Finish the template for a kitchen timer, then make one timer.',
        text: 'class ___:\n    ___\n\n\negg_timer = KitchenTimer___',
        options: ['KitchenTimer', 'pass', '()', 'kitchen_timer', 'return', '[]'],
        answer: ['KitchenTimer', 'pass', '()'],
        why: 'The class name starts with a capital letter and each word starts with a capital: <code>KitchenTimer</code>. <code>pass</code> fills the empty card. The brackets call the class and make a new timer.',
        hint: 'The name on the card must match the name you call. Then press the button.'
      },
      {
        type: 'fix', q: 'Kitchen Coach says soup is not a Dish. Fix <b>one line</b> so it prints <code>&lt;class \'__main__.Dish\'&gt;</code> and then <code>True</code>.',
        code: ['class Dish:', '    pass', '', '', 'soup = Dish', 'soup.name = "lentil soup"', 'print(type(soup))', 'print(isinstance(soup, Dish))'],
        title: 'no_brackets.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["<class \'__main__.Dish\'>", "True"]:',
          '    ok = True',
          'elif lines[:1] == ["<class \'type\'>"]:',
          '    msg = "soup is still the template card itself. How do you make a new dish from it?"',
          'else:',
          '    msg = "It should print exactly two lines: <class \'__main__.Dish\'> and then True."'
        ].join('\n'),
        why: '<code>soup = Dish</code> only puts a second label on the class. <code>&lt;class \'type\'&gt;</code> is the type of a class. <code>soup = Dish()</code> calls it and makes a real dish.',
        hint: 'Lesson 65: brackets press the button.'
      },
      {
        type: 'pick', q: 'Back to lesson 37. What happens when you run this?',
        pic: code(['chili = {"name": "bean chili", "protien": 15}', 'print(chili["protein"])'], { title: 'slip.py' }),
        options: ["KeyError: 'protein'", '15', 'None', "AttributeError: 'dict' object has no attribute 'protein'"],
        answer: 0,
        why: 'The dict only has the keys you typed, and <code>"protien"</code> is not <code>"protein"</code>. A missing key stops with a <code>KeyError</code>. That is the loose slip from the idea: nothing checked the spelling when the dict was written.',
        hint: 'Square brackets look up a key. Is that exact key in the dict?'
      },
      {
        type: 'pick', q: 'Which of these follow the naming rule for a <b>class</b>?',
        options: ['Dish', 'KitchenTimer', 'Drink', 'dish', 'kitchen_timer'],
        answer: [0, 1, 2],
        why: 'Class names start with a capital letter, and each new word starts with one too: <code>KitchenTimer</code>. Small letters with underscores, like <code>kitchen_timer</code>, are for variables and functions. Python does not force it, but every Python cook reads a capital as "this is a class".',
        hint: 'Look at the first letter.'
      }
    ]
  });
})();
