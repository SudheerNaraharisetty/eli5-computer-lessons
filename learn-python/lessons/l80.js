/* Lesson 80: lambda (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l80  lambda
     ===================================================================== */

  // Tonight's four dishes, used by every box. Protein in grams, kcal per serving.
  const DISHES = [
    'dishes = [',
    '    {"name": "lentil soup", "protein": 18, "kcal": 320, "gluten_free": True},',
    '    {"name": "tofu stir-fry", "protein": 24, "kcal": 350, "gluten_free": False},',
    '    {"name": "pasta bake", "protein": 22, "kcal": 610, "gluten_free": False},',
    '    {"name": "bean chili", "protein": 15, "kcal": 380, "gluten_free": True},',
    ']'
  ];

  // 12 px JetBrains Mono advances 7.2 px per character.
  const CH = 7.2;
  const mono = (x, y, parts, s) => parts.map(([c, t, f]) => T(x + c * (s ? s * 0.6 : CH), y, t, { s: s || 12, m: true, w: 600, a: 'start', f: f || P.ink })).join('');
  const note = (x, y, w, h) => `<rect x="${x + 4}" y="${y + 5}" width="${w}" height="${h}" rx="4" fill="${P.ink}" transform="rotate(-2 ${x + w / 2} ${y + h / 2})"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#FFE27A" stroke="${P.ink}" stroke-width="2.5" transform="rotate(-2 ${x + w / 2} ${y + h / 2})"/>`;

  /* ---- The idea: hand sorted the recipe card itself ---- */
  const ideaSvg = svg(600, 236, 'Left: a recipe card called protein_of. It takes a dish and gives back its protein. An arrow hands the card, with no brackets, to the sorted machine: key=protein_of. sorted asks the card about every dish, gets 18, 24, 22 and 15, and lines the dishes up from 15 to 24. Below: with brackets, protein_of() cooks the card right away, with no dish, and stops with TypeError.',
    box(14, 20, 200, 118, P.white, 12) +
    T(114, 46, 'protein_of', { s: 15, m: true }) +
    `<line x1="30" y1="58" x2="198" y2="58" stroke="${P.ink}" stroke-width="2"/>` +
    T(114, 84, 'take a dish', { s: 12.5, w: 700, f: P.ink2 }) +
    T(114, 110, 'give back its protein', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(222, 78, 296, 78, P.ok, 3) +
    T(259, 66, 'key=', { s: 12, m: true, f: P.ok }) +
    box(304, 36, 110, 84, P.tint, 12) + T(359, 84, 'sorted', { s: 15, m: true, f: P.accent }) +
    arrow(420, 78, 452, 78, P.ink2, 2.5) +
    [['bean chili', 15], ['lentil soup', 18], ['pasta bake', 22], ['tofu stir-fry', 24]].map((d, i) =>
      box(460, 12 + i * 34, 128, 26, P.white, 8) + T(470, 30 + i * 34, d[0], { s: 11.5, w: 700, a: 'start' }) + T(580, 30 + i * 34, String(d[1]), { s: 11.5, m: true, a: 'end', f: P.ok })).join('') +
    box(14, 168, 270, 50, P.okT, 12) + T(149, 190, 'key=protein_of', { s: 13, m: true, f: P.ok }) + T(149, 208, 'hand over the card', { s: 11.5, w: 700, f: P.ink2 }) +
    box(316, 168, 270, 50, P.dangerT, 12) + T(451, 190, 'key=protein_of()', { s: 13, m: true, f: P.danger }) + T(451, 208, 'cooks it now, with no dish: TypeError', { s: 11.5, w: 700, f: P.ink2 }));
  const handOver = [...DISHES, '',
    'def protein_of(dish):',
    '    return dish["protein"]',
    '',
    'print(protein_of(dishes[0]))   # brackets: use the card now',
    'print(protein_of)              # no brackets: the card itself',
    '',
    'by_protein = sorted(dishes, key=protein_of)',
    'for dish in by_protein:',
    '    print(dish["protein"], dish["name"])'
  ];
  const aloneTerm = term([
    '$ python3 coach.py',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/coach.py", line 8, in <module>',
    '    print(sorted(dishes))',
    '          ~~~~~~^^^^^^^^',
    "TypeError: '<' not supported between instances of 'dict' and 'dict'"
  ], 'sorted with no key, Python 3.15');
  const ideaPic = `<div style="width:100%;min-width:0">${aloneTerm}${ideaSvg}${run(handOver, { title: 'hand_over.py' })}</div>`;

  /* ---- The code: the same card on a sticky note ---- */
  const lambdaSvg = svg(600, 282, 'Top left: the recipe card. def protein_of(dish): then return dish["protein"]. Two lines and a name. Top right: the sticky note. lambda d: d["protein"]. One line, no name. Below, the parts of the note: lambda means a function with no name. d is the ingredient it takes, like a parameter. After the colon comes one expression, and its value comes back by itself, with no return.',
    box(14, 16, 270, 92, P.white, 12) +
    T(26, 38, 'recipe card: def', { s: 11.5, a: 'start', f: P.ink2 }) +
    mono(26, 66, [[0, 'def', P.accent], [4, 'protein_of'], [14, '(dish):']]) +
    mono(26, 90, [[4, 'return', P.accent], [11, 'dish["protein"]']]) +
    arrow(292, 62, 330, 62, P.ink2, 2.5) +
    note(340, 22, 246, 80) +
    T(352, 46, 'sticky note: lambda', { s: 11.5, a: 'start', f: P.ink2 }) +
    mono(352, 80, [[0, 'lambda', P.accent], [7, 'd', P.danger], [8, ':'], [10, 'd["protein"]', P.ok]], 15) +
    // the parts, spelled out
    mono(150, 160, [[0, 'lambda', P.accent], [7, 'd', P.danger], [8, ':'], [10, 'd["protein"]', P.ok]], 20) +
    `<line x1="150" y1="170" x2="222" y2="170" stroke="${P.accent}" stroke-width="3.5" stroke-linecap="round"/>` +
    `<line x1="234" y1="170" x2="246" y2="170" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/>` +
    `<line x1="270" y1="170" x2="414" y2="170" stroke="${P.ok}" stroke-width="3.5" stroke-linecap="round"/>` +
    T(186, 196, 'no name', { s: 12.5, f: P.accent }) +
    T(186, 214, 'a function', { s: 11.5, w: 700, f: P.ink2 }) +
    `<line x1="240" y1="176" x2="240" y2="220" stroke="${P.danger}" stroke-width="2"/>` + T(240, 238, 'what it takes', { s: 12.5, f: P.danger }) +
    T(240, 256, 'like (dish)', { s: 11.5, w: 700, f: P.ink2 }) +
    T(400, 196, 'one expression', { s: 12.5, f: P.ok }) +
    T(400, 214, 'it comes back by itself', { s: 11.5, w: 700, f: P.ink2 }) +
    T(300, 278, 'same job, no def, no name, no return', { s: 12.5, w: 700, f: P.ink2 }));
  const stickyNote = [...DISHES, '',
    'ranked = sorted(dishes, key=lambda d: d["protein"], reverse=True)',
    'for dish in ranked:',
    '    print(dish["protein"], dish["name"])',
    '',
    'best = max(dishes, key=lambda d: d["protein"])',
    'print("Ben\'s pick:", best["name"])'
  ];
  const codePic = `<div style="width:100%;min-width:0">${lambdaSvg}${run(stickyNote, { title: 'sticky_note.py' })}</div>`;

  /* ---- The pain: three whole cards, each used once, one copied wrong ---- */
  const threeCards = [...DISHES, '',
    'def protein_of(dish):',
    '    return dish["protein"]',
    '',
    'def kcal_of(dish):',
    '    return dish["protein"]   # copied from protein_of',
    '',
    'def gluten_free_first(dish):',
    '    return 0 if dish["gluten_free"] else 1',
    '',
    'print("Ben:", [d["name"] for d in sorted(dishes, key=protein_of, reverse=True)])',
    'print("Light first:", [d["name"] for d in sorted(dishes, key=kcal_of)])',
    'print("Chloe:", [d["name"] for d in sorted(dishes, key=gluten_free_first)])'
  ];

  /* ---- The fix: the rule sits where it is used ---- */
  const stickyNotes = [...DISHES, '',
    'ben = sorted(dishes, key=lambda d: d["protein"], reverse=True)',
    'light = sorted(dishes, key=lambda d: d["kcal"])',
    'chloe = sorted(dishes, key=lambda d: 0 if d["gluten_free"] else 1)',
    '',
    'print("Ben:", [d["name"] for d in ben])',
    'print("Light first:", [d["name"] for d in light])',
    'print("Chloe:", [d["name"] for d in chloe])'
  ];
  const chloeSvg = svg(600, 150, 'Chloe\'s sticky note gives every gluten-free dish a 0 and every other dish a 1. sorted puts the 0s first: lentil soup and bean chili, then tofu stir-fry and pasta bake. Dishes with the same number keep their old order.',
    [['lentil soup', 0], ['tofu stir-fry', 1], ['pasta bake', 1], ['bean chili', 0]].map((d, i) =>
      box(14 + i * 146, 14, 132, 34, P.white, 10) + T(80 + i * 146, 36, d[0], { s: 12, w: 700 }) +
      `<circle cx="${80 + i * 146}" cy="66" r="12" fill="${d[1] ? P.danger : P.ok}" stroke="${P.ink}" stroke-width="2"/>` + T(80 + i * 146, 71, String(d[1]), { s: 12.5, m: true, f: P.white })).join('') +
    arrow(300, 84, 300, 104, P.ink2, 2.5) +
    [['lentil soup', 0], ['bean chili', 0], ['tofu stir-fry', 1], ['pasta bake', 1]].map((d, i) =>
      box(14 + i * 146, 108, 132, 34, d[1] ? P.white : P.okT, 10) + T(80 + i * 146, 130, d[0], { s: 12, w: 700, f: d[1] ? P.ink : P.ok })).join(''));
  const fixPic = `<div style="width:100%;min-width:0">${run(stickyNotes, { title: 'sticky_notes.py' })}${chloeSvg}</div>`;

  /* ---- Try it: .sort, min, and a built-in card ---- */
  const coach = [...DISHES, '',
    'names = [d["name"] for d in dishes]',
    'print(sorted(names, key=len))   # len is a recipe card too',
    '',
    'dishes.sort(key=lambda d: d["kcal"])   # in place, like lesson 34',
    'print([d["name"] for d in dishes])',
    '',
    'lightest = min(dishes, key=lambda d: d["kcal"])',
    'print("Lightest:", lightest["name"], lightest["kcal"], "kcal")'
  ];

  /* ---- The catch ---- */
  const catchBox = [...DISHES, '',
    '# one expression, with a choice inside: fine',
    'chloe = sorted(dishes, key=lambda d: 0 if d["gluten_free"] else 1)',
    'print([d["name"] for d in chloe])',
    '',
    '# a lambda with a name: it works, but it forgot its name',
    'score = lambda d: d["protein"]',
    'print(score)',
    '',
    'def protein_of(dish):',
    '    return dish["protein"]',
    'print(protein_of)'
  ];
  const ifTerm = term([
    '$ python3 chloe.py',
    '  File "/Users/chloe/kitchen/chloe.py", line 8',
    '    chloe = sorted(dishes, key=lambda d: if d["gluten_free"]: 0)',
    '                                         ^^',
    'SyntaxError: invalid syntax'
  ], 'an if-block inside a lambda, Python 3.15');
  const forgotTerm = term([
    '$ python3 ben.py',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/ben.py", line 8, in <module>',
    '    ranked = sorted(dishes, key=d["protein"])',
    '                                ^',
    "NameError: name 'd' is not defined. Did you mean: 'id'?"
  ], 'the lambda left out, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${ifTerm}${run(catchBox, { title: 'catch.py' })}${forgotTerm}</div>`;

  COURSE.add({
    id: 'l80', minutes: 13,
    summary: 'A function is a value. Its name <b>without brackets</b> is the recipe card itself, and you can hand it to another function: <code>sorted(dishes, key=protein_of)</code>. sorted then calls the card on every dish and sorts by the answers. <code>max</code>, <code>min</code> and <code>.sort()</code> take a <code>key</code> too. When the card is used only once, write it on a sticky note: <code>lambda d: d["protein"]</code> is a <b>tiny function with no name</b>. It takes <code>d</code>, and the <b>one expression</b> after the colon comes back by itself, with no <code>return</code>. So <code>sorted(dishes, key=lambda d: d["protein"], reverse=True)</code> lines up Ben\'s dishes, and <code>max(dishes, key=lambda d: d["protein"])</code> picks his tofu stir-fry. A choice is fine inside: <code>lambda d: 0 if d["gluten_free"] else 1</code>. The catch: a lambda holds <b>one expression</b>, no if-block, no assignment, no lines of steps. Do not give a lambda a name with <code>=</code>: if it needs a name, write <code>def</code>. Leave out the lambda (<code>key=d["protein"]</code>) and you get <code>NameError: name \'d\' is not defined</code>. Add brackets (<code>key=protein_of()</code>) and you get <code>TypeError</code>.',
    video: {
      src: 'videos/l80-lambda.mp4', poster: 'videos/l80-lambda.jpg', length: '1 min 6 s',
      script: [
        'Tonight, Kitchen Coach has 4 dishes. Ben lifts weights, so he wants them lined up by protein.',
        'But sorted can\'t compare two whole dishes. So you hand it a recipe card. Take a dish, give back its protein. Key equals protein of, with no brackets. You pass the card itself, and sorted uses it on every dish.',
        'But that card is used just once. A whole def, with a name, for one sort.',
        'So write it on a sticky note instead. Lambda d, colon, d protein. No name. One line. And the answer comes back by itself.',
        'Stick the note on sorted. It weighs each dish. 18. 24. 22. 15. Then it lines them up. Bean chili first. Tofu stir fry last.',
        'Careful. If you leave out the lambda, Python reads d protein right away. There is no d yet. Name error.',
        'A lambda is a one-line recipe with no name. Use it where a function is needed just once.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Hand over the recipe card itself.',
        text: [
          'Ben lifts weights, so tonight Kitchen Coach should line up the four dishes by <b>protein</b>. Each dish is a dict (lesson 37). But <code>sorted(dishes)</code> stops with <code>TypeError: \'&lt;\' not supported between instances of \'dict\' and \'dict\'</code>. Python can compare 18 with 24, but not one whole dish with another. Which part should count? It has no idea.',
          'So you tell it. A function is a <b>value</b>, like a number or a list. Lesson 44 showed that <code>protein_of</code> with no brackets only <b>names</b> the card. Here that is exactly what you want: the card itself, handed over. <code>sorted(dishes, key=protein_of)</code> means "sort the dishes, and to weigh each one, use this card". sorted calls the card on every dish, gets 18, 24, 22 and 15, and sorts the dishes by those numbers.',
          'Press <b>Run</b> on <code>hand_over.py</code>. With brackets, <code>protein_of(dishes[0])</code> uses the card now: <code>18</code>. Without brackets, <code>print(protein_of)</code> shows the card itself: <code>&lt;function protein_of at 0x...&gt;</code> (the number after <code>0x</code> is where it sits in memory and changes each run). Then the dishes, from 15 g up to 24 g.'
        ],
        tip: '<code>key</code> is a keyword argument (lesson 46), like <code>reverse=True</code> in lesson 34. Its value is a function that takes one item and gives back what to sort by.',
        warn: 'Hand over the card, do not cook it: <code>key=protein_of()</code> with brackets calls the card <b>right away</b>, with no dish, and stops with <code>TypeError: protein_of() missing 1 required positional argument: \'dish\'</code>. Try it: add <code>()</code> after <code>key=protein_of</code> and run.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'lambda: the same card on a sticky note.',
        text: [
          '<code>protein_of</code> is a whole recipe card: a <code>def</code>, a name, a <code>return</code>. For a rule you use once, Python has a shorter way, a <b>lambda</b>: <code>lambda d: d["protein"]</code>. It is a <b>tiny function with no name</b>, written right where you need it.',
          'Read it in three parts. <code>lambda</code> says "a function, no name". <code>d</code> before the colon is what it takes, like the <code>(dish)</code> in a <code>def</code>. After the colon is <b>one expression</b>, and its value comes back <b>by itself</b>: there is no <code>return</code>. So <code>lambda d: d["protein"]</code> does exactly what <code>protein_of</code> does.',
          'Press <b>Run</b>. <code>reverse=True</code> puts Ben\'s biggest first: 24, 22, 18, 15. And <code>max</code> takes a <code>key</code> too: <code>max(dishes, key=lambda d: d["protein"])</code> hands back the <b>whole dish</b> with the most protein, so <code>best["name"]</code> is <code>tofu stir-fry</code>. Now change it: make Ben\'s pick the dish with the <b>least</b> protein. Swap <code>max</code> for <code>min</code> and say the answer before you run it.'
        ],
        tip: 'The name <code>d</code> is yours, as with any parameter. <code>lambda dish: dish["protein"]</code> works the same. Short names are normal in a lambda because the whole thing fits on one line.'
      },
      {
        label: 'The pain', pic: run(threeCards, { title: 'three_cards.py' }),
        h: 'A whole card for every one-time sort.',
        text: [
          'Kitchen Coach sorts three ways tonight: by protein for Ben, lightest first for a quick lunch, and gluten-free first for Chloe. With <code>def</code>, that is three recipe cards, each with a name, each used <b>once</b>, each sitting far from the line that uses it.',
          'And the second card was made by copying the first. Its name was changed to <code>kcal_of</code>, but its body still says <code>dish["protein"]</code>. Press <b>Run</b>. "Light first" comes out as <code>bean chili, lentil soup, pasta bake, tofu stir-fry</code>: that is the protein order, and pasta bake, the heaviest at 610 kcal, sits in the middle. No error. The name says kcal, so nobody looks inside.',
          'To check a sort written like this, your eyes jump from the <code>sorted</code> line up to the card and back. Every extra name is one more place for the name and the body to disagree.'
        ],
        warn: 'Cards copied to make a new card are where this bug lives. The name promises one thing, and the body does another.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Put the rule where it is used.',
        text: [
          'Write each one-time rule as a lambda, inside the <code>sorted</code> call. Now the rule is <b>right there</b> on the line: <code>key=lambda d: d["kcal"]</code> says kcal, and there is no separate card that could say something else.',
          'Chloe\'s rule uses the one-line if and else from lesson 76: <code>lambda d: 0 if d["gluten_free"] else 1</code>. Gluten-free dishes get a <code>0</code>, the rest get a <code>1</code>, and sorted puts the 0s first. That is still <b>one expression</b>, so it fits in a lambda.',
          'Press <b>Run</b>. Ben: tofu stir-fry first. Light first: lentil soup, 320 kcal, then tofu stir-fry, 350. Chloe: lentil soup and bean chili, then the two with gluten. Dishes that tie keep the order they had, so lentil soup stays before bean chili.'
        ],
        tip: 'Then go back to <code>three_cards.py</code> in The pain and fix it there: either correct the body of <code>kcal_of</code>, or delete the three cards and use lambdas.'
      },
      {
        label: 'Try it', pic: run(coach, { title: 'coach.py' }),
        h: 'Any function can be the key.',
        text: [
          '<b>Built-in cards work too.</b> <code>len</code> is a function, so <code>sorted(names, key=len)</code> sorts the names by their length, shortest first. No lambda needed: the card already exists. Pasta bake and bean chili both have 10 characters, so they keep their old order.',
          '<b><code>.sort()</code> takes a key as well.</b> It sorts the list in place and hands back <code>None</code>, as in lesson 34, so it sits on its own line. <code>min</code> works like <code>max</code>: lentil soup is the lightest, at 320 kcal.',
          'Press <b>Run</b>. Then change it: Ana is training for a half-marathon and wants the dish with the <b>most</b> kcal. Add two lines that find it with <code>max</code> and print <code>Ana: pasta bake 610 kcal</code>.'
        ],
        tip: 'Lesson 81, sorted, map and filter, goes deeper into <code>key=</code>, and shows two more tools that take a function: <code>map</code> and <code>filter</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'One expression, no name, and never leave it out.',
        text: [
          '<b>A lambda holds one expression, nothing more.</b> No if-block with a colon and lines under it, no <code>=</code> to fill a jar, no list of steps. Write <code>lambda d: if d["gluten_free"]: 0</code> and Python stops with <code>SyntaxError: invalid syntax</code>, arrows under <code>if</code>. A one-line choice, <code>0 if ... else 1</code>, is an expression, so that one is fine. Need more than one line? Write a <code>def</code>.',
          '<b>Do not give a lambda a name.</b> <code>score = lambda d: d["protein"]</code> works, but Python\'s style guide, PEP 8, says to write a <code>def</code> instead. Press <b>Run</b>: the def card prints as <code>&lt;function protein_of ...&gt;</code>, but the named lambda prints as <code>&lt;function &lt;lambda&gt; ...&gt;</code>. It forgot its name, and error messages will say <code>&lt;lambda&gt;</code> too. If it is worth a name, it is worth a <code>def</code>. (Ruff, lesson 92, flags this for you.)',
          '<b>Do not leave out the lambda.</b> <code>key=d["protein"]</code> looks close, but Python works that out <b>before</b> sorted starts, and there is no <code>d</code> yet: <code>NameError: name \'d\' is not defined</code>. The <code>Did you mean: \'id\'?</code> is Python guessing at a built-in name, and here it guesses wrong. The word <code>lambda</code> is what makes <code>d</code> a parameter, filled in later for each dish.'
        ],
        warn: 'Rule of thumb: a lambda is for a <b>short rule used once</b>, usually as a <code>key</code>. Used in two places, more than one expression, or hard to read in one go? Write a <code>def</code> with a good name.'
      }
    ],
    exercises: [
      {
        file: 'l80_sticky_notes.py', title: 'Sticky notes',
        task: 'Finish three functions for Kitchen Coach, each with a <b>lambda</b> as the key. <code>lightest_first</code> returns the dishes sorted by kcal, smallest first. <code>bens_pick</code> returns the dish with the most protein, using <code>max</code>. <code>gluten_free_first</code> returns the dishes with the gluten-free ones first, for Chloe.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The starter hands the dishes back unsorted, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, replace each <code>return</code> line with one that uses <code>sorted</code> or <code>max</code> and a <code>key=lambda d: ...</code>. Run it after each one.',
          'Run it until it says <code>PASS</code>. The check also tries a second menu, and makes sure each function uses a lambda.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['dishes = [', '    {"name": "lentil soup", "protein": 18},', '    {"name": "tofu stir-fry", "protein": 24},', '    {"name": "bean chili", "protein": 15},', ']', 'ranked = sorted(dishes, key=lambda d: d["protein"])', 'print(ranked[0]["name"])'], { title: 'first.py' }),
        options: ['bean chili', 'tofu stir-fry', 'lentil soup', '15'],
        answer: 0,
        why: 'sorted weighs each dish by its protein and puts the smallest first: 15, 18, 24. <code>ranked[0]</code> is the whole bean chili dict, and <code>["name"]</code> takes its name.',
        hint: 'Is there a reverse=True?'
      },
      {
        type: 'fix', q: 'This stops with <code>NameError: name \'d\' is not defined</code>. Fix line 8 so it prints the names from least to most protein.',
        code: [...DISHES, '', 'ranked = sorted(dishes, key=d["protein"])', 'print([d["name"] for d in ranked])'],
        title: 'ben.py',
        check: [
          'want = "[\'bean chili\', \'lentil soup\', \'pasta bake\', \'tofu stir-fry\']"',
          'got = out.strip()',
          'if got == want:',
          '    ok = True',
          'elif "NameError" in got:',
          '    msg = "Still a NameError. The key needs a function: key=lambda d: d[\\"protein\\"]"',
          'elif got == "[\'tofu stir-fry\', \'pasta bake\', \'lentil soup\', \'bean chili\']":',
          '    msg = "That is most protein first. This time, least first: no reverse=True."',
          'else:',
          '    msg = "It printed " + got + ". You want " + want'
        ].join('\n'),
        why: '<code>key=lambda d: d["protein"]</code>. The word <code>lambda</code> makes <code>d</code> a parameter that sorted fills in with each dish. Without it, Python looks for a jar called <code>d</code> right away.',
        hint: 'key needs a function. What one word turns d["protein"] into a function of d?'
      },
      {
        type: 'fix', q: 'Ben\'s pick should be the dish with the most protein, but this stops with a <code>TypeError</code>. Fix it so it prints <code>Ben\'s pick: tofu stir-fry</code>.',
        code: [...DISHES, '', 'def protein_of(dish):', '    return dish["protein"]', '', 'best = max(dishes, key=protein_of())', 'print("Ben\'s pick:", best["name"])'],
        title: 'pick.py',
        check: [
          'got = out.strip()',
          'if got == "Ben\'s pick: tofu stir-fry":',
          '    ok = True',
          'elif "missing 1 required positional argument" in got:',
          '    msg = "protein_of() with brackets still calls the card with no dish. Hand over the card itself."',
          'elif "Ben\'s pick:" in got:',
          '    msg = "It printed " + got + ". Use max, and weigh each dish by its protein."',
          'else:',
          '    msg = "It should print: Ben\'s pick: tofu stir-fry"'
        ].join('\n'),
        why: '<code>key=protein_of</code>, with no brackets, hands max the card itself. With brackets, Python calls the card at once, with no dish. <code>key=lambda d: d["protein"]</code> works too.',
        hint: 'Look at the brackets after protein_of.'
      },
      {
        type: 'match', q: 'Match each sticky note to the recipe card that does the same job.',
        pairs: [
          ['lambda d: d["kcal"]', '<code>def f(d):</code> then <code>return d["kcal"]</code>'],
          ['lambda d: d["protein"] * 2', '<code>def f(d):</code> then <code>return d["protein"] * 2</code>'],
          ['lambda d: 0 if d["gluten_free"] else 1', '<code>def f(d):</code> then <code>if d["gluten_free"]: return 0</code>, else <code>return 1</code>'],
          ['lambda name: len(name)', '<code>def f(name):</code> then <code>return len(name)</code>']
        ],
        why: 'A lambda is a def with no name and an automatic <code>return</code> of its one expression. The part before the colon is the parameter, the part after is what comes back.',
        hint: 'Whatever is after the colon is what the card returns.'
      },
      {
        type: 'fill', q: 'Sort the dishes by kcal, biggest first, for Ana.',
        text: 'for_ana = sorted(dishes, key=___ d: d["kcal"], ___=True)',
        options: ['lambda', 'reverse', 'def', 'return', 'max', 'key'],
        answer: ['lambda', 'reverse'],
        why: '<code>key=lambda d: d["kcal"]</code> weighs each dish by its kcal, and <code>reverse=True</code> (lesson 34) puts the biggest first.',
        hint: 'One word makes a function with no name. The other flips the order.'
      },
      {
        type: 'bucket', q: 'A lambda, or a def?',
        buckets: ['A lambda is fine', 'Write a def'],
        items: [
          ['a one-time sort key: the protein of a dish', 0],
          ['max by kcal, used on one line', 0],
          ['0 if gluten-free, else 1, as a sort key', 0],
          ['a rule with an if-block and two print lines', 1],
          ['a rule you want to call from five places', 1],
          ['score = lambda d: ... so you can reuse it', 1]
        ],
        why: 'A lambda is for a short rule of one expression, used once, where it is written. Several lines, several uses, or a name: write a def.',
        hint: 'Is it one expression, used once, with no name?'
      },
      {
        type: 'pick', q: 'Why does <code>key=d["protein"]</code> give <code>NameError</code>, but <code>key=lambda d: d["protein"]</code> works?',
        options: [
          'Python works out d["protein"] at once, before sorted starts. With lambda, it is a rule that sorted calls later, with each dish as d.',
          'sorted only accepts the word lambda after key=.',
          'd is a special name that only works inside sorted.',
          'Dicts cannot be used in a key without lambda.'
        ],
        answer: 0,
        why: 'Every argument is worked out before the function starts. <code>d["protein"]</code> needs a jar called <code>d</code> now. <code>lambda d: ...</code> is a function, and <code>d</code> is its parameter, filled in on each call. And <code>key=len</code> works with no lambda at all.',
        hint: 'When does Python read the value after key= ?'
      },
      {
        type: 'pick', q: 'Back to lesson 34. What is in <code>dishes</code> after this runs?',
        pic: code(['dishes = [{"name": "pasta bake", "kcal": 610}, {"name": "lentil soup", "kcal": 320}]', 'dishes = dishes.sort(key=lambda d: d["kcal"])', 'print(dishes)'], { title: 'trap.py' }),
        options: ['None', 'The two dishes, lentil soup first', 'The two dishes, pasta bake first', 'TypeError'],
        answer: 0,
        why: '<code>.sort()</code> sorts in place and hands back <code>None</code>, with or without a key. Storing that answer in <code>dishes</code> throws the list away. Call it on its own line, or use <code>sorted()</code> for a new list.',
        hint: 'What does .sort() hand back?'
      }
    ]
  });
})();
