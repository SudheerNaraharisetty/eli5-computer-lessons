/* Lesson 82: Iterators (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l82  Iterators
     ===================================================================== */

  // A plate seen from above. cx, cy = centre.
  const plate = (cx, cy, food, label, fade) =>
    `<g${fade ? ' opacity="0.35"' : ''}><circle cx="${cx}" cy="${cy}" r="26" fill="${P.white}" stroke="${P.ink}" stroke-width="3"/>` +
    `<circle cx="${cx}" cy="${cy}" r="13" fill="${food}" stroke="${P.ink}" stroke-width="2"/>` +
    (label ? T(cx, cy + 44, label, { s: 12.5, w: 700 }) : '') + `</g>`;
  const pill = (x, y, w, text, fill, col) =>
    `<rect x="${x}" y="${y}" width="${w}" height="28" rx="14" fill="${fill}"/>` + T(x + w / 2, y + 19, text, { s: 12.5, f: col, m: true });
  const FOOD = ['#F2C14E', '#C0492B', '#D9A066'];

  /* ---- The idea: the list is the pass, the iterator is the waiter ---- */
  const ideaSvg = svg(600, 300, 'Left, the pass: a list of three plates, pasta, bean chili and pancakes. It is iterable: you can loop over it as often as you like. iter(plates) sends a waiter. Each next(waiter) carries the next plate to a guest: pasta to Ana, bean chili to Ben, pancakes to Chloe. The waiter remembers where it is. A fourth next finds nothing left: StopIteration.',
    T(150, 22, 'THE PASS: an iterable', { s: 12.5, f: P.accent }) +
    box(16, 34, 268, 120, P.white, 14) +
    T(150, 58, 'plates = [ ... ]', { s: 13.5, m: true }) +
    `<rect x="36" y="128" width="228" height="10" rx="4" fill="#E2C99C" stroke="${P.ink}" stroke-width="2"/>` +
    plate(80, 96, FOOD[0]) + plate(150, 96, FOOD[1]) + plate(220, 96, FOOD[2]) +
    T(150, 178, 'loop over it again and again', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(150, 190, 150, 222, P.accent, 2.5) +
    box(66, 228, 168, 40, P.tint, 12) + T(150, 254, 'iter(plates)', { s: 14, m: true, f: P.accent }) +
    T(150, 290, 'sends a waiter', { s: 12.5, w: 700, f: P.ink2 }) +
    T(450, 22, 'THE WAITER: an iterator', { s: 12.5, f: P.ok }) +
    [['next(waiter)', 'pasta', 'Ana', 0], ['next(waiter)', 'bean chili', 'Ben', 1], ['next(waiter)', 'pancakes', 'Chloe', 2]].map((r, i) => {
      const y = 40 + i * 52;
      return pill(314, y + 6, 116, r[0], P.okT, P.ok) + arrow(436, y + 20, 462, y + 20, P.ink2, 2) +
        box(468, y, 116, 40, P.white, 10) + `<circle cx="488" cy="${y + 20}" r="9" fill="${FOOD[r[3]]}" stroke="${P.ink}" stroke-width="2"/>` +
        T(504, y + 18, r[1], { s: 11.5, w: 700, a: 'start' }) + T(504, y + 33, 'for ' + r[2], { s: 11, w: 700, a: 'start', f: P.ink2 });
    }).join('') +
    pill(314, 202, 116, 'next(waiter)', P.dangerT, P.danger) + arrow(436, 216, 462, 216, P.ink2, 2) +
    `<rect x="468" y="196" width="116" height="40" rx="10" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    T(526, 221, 'nothing left', { s: 12, f: P.danger }) +
    box(330, 252, 250, 34, P.dangerT, 10) + T(455, 275, 'StopIteration', { s: 13.5, m: true, f: P.danger }));

  const waiterLines = [
    'plates = ["pasta", "bean chili", "pancakes"]   # on the pass',
    '',
    'waiter = iter(plates)    # a waiter for these plates',
    'print(waiter)',
    'print(next(waiter))      # Ana\'s plate',
    'print(next(waiter))      # Ben\'s plate',
    'print(next(waiter))      # Chloe\'s plate',
    '',
    'print(plates)            # the list is still full',
    'for plate in plates:     # so you can loop it again',
    '    print("again:", plate)'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(waiterLines, { title: 'waiter.py' })}</div>`;

  /* ---- The code: what a for loop really does ---- */
  const forInside = [
    'plates = ["pasta", "bean chili", "pancakes"]',
    '',
    'print("What you write:")',
    'for plate in plates:',
    '    print("  serve", plate)',
    '',
    'print("What Python does:")',
    'waiter = iter(plates)            # 1. one waiter, once',
    'while True:',
    '    try:',
    '        plate = next(waiter)     # 2. the next plate, please',
    '    except StopIteration:        # 3. nothing left',
    '        break                    #    so the loop ends',
    '    print("  serve", plate)'
  ];
  const stopTerm = term([
    '$ python3 waiter.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/waiter.py", line 6, in <module>',
    '    next(waiter)',
    '    ~~~~^^^^^^^^',
    'StopIteration'
  ], 'a 4th next(waiter) with 3 plates, Python 3.15');
  const loopSvg = svg(600, 96, 'A for loop calls iter once, then next, next, next. When next raises StopIteration, the loop catches it and ends quietly.',
    pill(10, 30, 110, 'iter() once', P.tint, P.accent) + arrow(124, 44, 142, 44, P.ink2, 2) +
    pill(146, 30, 64, 'next', P.okT, P.ok) + pill(216, 30, 64, 'next', P.okT, P.ok) + pill(286, 30, 64, 'next', P.okT, P.ok) +
    arrow(354, 44, 372, 44, P.ink2, 2) + pill(376, 30, 130, 'StopIteration', P.dangerT, P.danger) +
    arrow(510, 44, 528, 44, P.ink2, 2) + T(562, 49, 'stop', { s: 14, f: P.ok }) +
    T(300, 86, 'the for loop catches StopIteration for you: no error, the loop just ends', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(forInside, { title: 'for_inside.py' })}${loopSvg}${stopTerm}</div>`;

  /* ---- The pain: looking at an iterator uses it up ---- */
  const PROTEIN = 'protein = {"lentil soup": 18, "tofu stir-fry": 24, "pasta bake": 22, "bean chili": 15}';
  const painLines = [
    PROTEIN,
    '',
    'rich = filter(lambda name: protein[name] >= 20, protein)',
    'if any(rich):                    # is there at least one?',
    '    print("Ben has choices:")',
    '    for name in rich:',
    '        print("-", name)',
    '',
    'cards = map(lambda name: name.title(), protein)',
    'print(list(cards))               # check the cards',
    'for card in cards:               # then print them',
    '    print("Card:", card)',
    'print("Done")'
  ];
  const painSvg = svg(600, 120, 'The filter waiter holds tofu stir-fry and pasta bake. any(rich) asks for plates until it finds one: it takes tofu stir-fry and stops. The for loop then gets only what is left, pasta bake. Tofu stir-fry is never printed.',
    T(70, 24, 'filter waiter', { s: 12.5, f: P.accent }) +
    box(14, 36, 112, 50, P.tint, 12) + T(70, 66, 'rich', { s: 14, m: true, f: P.accent }) +
    arrow(132, 52, 196, 40, P.danger, 2.5) + box(200, 20, 150, 40, P.dangerT, 10) + T(275, 45, 'tofu stir-fry', { s: 12.5, f: P.danger }) +
    T(470, 45, 'eaten by any(rich)', { s: 12.5, w: 700, f: P.danger }) +
    arrow(132, 72, 196, 86, P.ok, 2.5) + box(200, 68, 150, 40, P.okT, 10) + T(275, 93, 'pasta bake', { s: 12.5, f: P.ok }) +
    T(470, 93, 'all the loop gets', { s: 12.5, w: 700, f: P.ok }));
  const painPic = `<div style="width:100%;min-width:0">${run(painLines, { title: 'ben_choices.py' })}${painSvg}</div>`;

  /* ---- The fix: make a list once, or ask for a new waiter ---- */
  const fixLines = [
    PROTEIN,
    '',
    'rich = list(filter(lambda name: protein[name] >= 20, protein))',
    'if any(rich):                    # a list is not used up',
    '    print("Ben has choices:")',
    '    for name in rich:',
    '        print("-", name)',
    '',
    'cards = list(map(lambda name: name.title(), protein))',
    'print(cards)',
    'for card in cards:',
    '    print("Card:", card)',
    'print("Done")'
  ];
  const againLines = [
    'def rich_dishes():',
    '    """A NEW filter waiter every time you call it."""',
    '    return filter(lambda name: protein[name] >= 20, protein)',
    '',
    'if any(rich_dishes()):',
    '    for name in rich_dishes():   # a fresh waiter, from plate 1',
    '        print("-", name)'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(fixLines, { title: 'ben_choices.py' })}` +
    code(againLines, { title: 'the other way: ask for a new waiter each time' }) + `</div>`;

  /* ---- Try it: next with a default, and a file is a waiter too ---- */
  const tryLines = [
    'desserts = iter(["brownie", "fruit salad"])',
    'print(next(desserts, "no more"))',
    'print(next(desserts, "no more"))',
    'print(next(desserts, "no more"))   # empty: you get the default',
    '',
    'with open("menu.csv") as f:',
    '    header = next(f)              # take the first line off',
    '    print("skipped:", header.strip())',
    '    for line in f:                # the loop goes on from line 2',
    '        name, grams = line.strip().split(",")',
    '        print(f"{name}: {grams} g protein")'
  ];
  const MENU = 'dish,protein\nlentil soup,18\ntofu stir-fry,24\npasta bake,22\n';

  /* ---- The catch: which things are one-shot ---- */
  const catchLines = [
    'plates = ["pasta", "bean chili", "pancakes"]',
    'pairs = zip(["Ana", "Ben", "Chloe"], plates)',
    '',
    'print(len(plates), len(plates))  # a list: ask as often as you like',
    'print(dict(pairs))',
    'print(dict(pairs))                # zip is used up',
    '',
    'waiter = iter(plates)',
    'print(iter(waiter) is waiter)     # an iterator is its own waiter',
    'print(iter(plates) is plates)     # a list sends a NEW waiter',
    '',
    'cards = map(lambda p: p.upper(), plates)',
    'try:',
    '    print(len(cards))',
    'except TypeError as err:',
    '    print(err)'
  ];
  const kinds = svg(600, 150, 'Two groups. Iterable, loop again and again: a list, a tuple, text, a dict, a set, range. Iterator, one pass only: map, filter, zip, enumerate, iter of anything, an open file.',
    box(10, 10, 284, 130, P.okT, 14) + T(152, 36, 'ITERABLE: again and again', { s: 12.5, f: P.ok }) +
    T(152, 70, 'list   tuple   str', { s: 14, m: true }) + T(152, 98, 'dict   set   range', { s: 14, m: true }) +
    T(152, 126, 'each loop gets a new waiter', { s: 12, w: 700, f: P.ink2 }) +
    box(306, 10, 284, 130, P.dangerT, 14) + T(448, 36, 'ITERATOR: one pass only', { s: 12.5, f: P.danger }) +
    T(448, 70, 'map   filter   zip', { s: 14, m: true }) + T(448, 98, 'enumerate   iter()   a file', { s: 14, m: true }) +
    T(448, 126, 'it is the waiter: used up', { s: 12, w: 700, f: P.ink2 }));
  const classLines = [
    'class Waiter:',
    '    def __init__(self, plates):',
    '        self.plates = plates',
    '        self.i = 0                    # where the waiter is',
    '',
    '    def __iter__(self):',
    '        return self                   # I am my own waiter',
    '',
    '    def __next__(self):',
    '        if self.i == len(self.plates):',
    '            raise StopIteration       # nothing left',
    '        plate = self.plates[self.i]',
    '        self.i += 1',
    '        return plate',
    '',
    'for plate in Waiter(["pasta", "bean chili"]):',
    '    print(plate)'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${kinds}${run(catchLines, { title: 'one_shot.py' })}` +
    code(classLines, { title: 'a peek: your own waiter class (prints pasta, then bean chili)' }) + `</div>`;

  COURSE.add({
    id: 'l82', minutes: 13,
    summary: 'An <b>iterable</b> is anything you can loop over: a list, text, a dict, range, a file. An <b>iterator</b> is the waiter that hands out its items <b>one at a time</b> and remembers where it is. <code>waiter = iter(plates)</code> sends a waiter, <code>next(waiter)</code> brings the next plate, and when nothing is left <code>next</code> raises <code>StopIteration</code>. A <code>for</code> loop does exactly that: <code>iter</code> once, then <code>next</code> until <code>StopIteration</code>, which it catches for you. <code>map</code>, <code>filter</code>, <code>zip</code>, <code>enumerate</code> and open files <b>are</b> iterators, so they are <b>used up after one pass</b>: a second <code>list(m)</code> gives <code>[]</code>, with no error. Need the items twice? <b>Make a list once</b>. And <code>next(waiter, "no more")</code> gives a default instead of <code>StopIteration</code>.',
    video: {
      src: 'videos/l82-iterators.mp4', poster: 'videos/l82-iterators.jpg', length: '1 min 5 s',
      script: [
        'Dinner is ready. 3 plates wait on the pass: pasta, bean chili and pancakes. The list is iterable. You can loop over it as often as you like.',
        'To serve them, Python sends a waiter. Iter of plates. The waiter carries one plate at a time, and remembers where it is. Next. Pasta for Ana. Next. Bean chili for Ben. Next. Pancakes for Chloe.',
        'Ask for next a fourth time, and the pass is empty. Python raises Stop Iteration.',
        'A for loop does exactly this. It calls iter once. Then next, next, next, until Stop Iteration. Then it stops, quietly.',
        'Now the catch. Map, filter and zip are waiters too. The first time you list the map, it serves every plate. List it again, and the tray is empty. No error. Just an empty list.',
        'Need the plates twice? Make a list once.',
        'An iterator hands out one item at a time, and only once.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The pass holds the plates. The waiter carries them.',
        text: [
          'Dinner is ready. Three plates wait on the <b>pass</b>, the counter between the kitchen and the table: pasta for Ana, bean chili for Ben, pancakes for Chloe. In Python the pass is a list. A list is <b>iterable</b>: something you can loop over. Text, dicts, range and files are iterable too.',
          'To serve, you need a <b>waiter</b>. <code>iter(plates)</code> sends one. <code>next(waiter)</code> asks for the next plate, and the waiter brings exactly one. The waiter <b>remembers where it is</b>, so the second <code>next</code> brings the second plate, not the first again. That waiter is an <b>iterator</b>.',
          'Press <b>Run</b>. <code>print(waiter)</code> only shows <code>&lt;list_iterator object at 0x...&gt;</code>: a waiter, not the plates. After the waiter is done, <code>plates</code> is still full, and the loop at the end serves it again. Now add a fourth <code>print(next(waiter))</code> before <code>print(plates)</code> and run it.'
        ],
        tip: 'Iterable means "can give you a waiter". Iterator means "is the waiter". A list is iterable but not an iterator: <code>next(plates)</code> stops with <code>TypeError: \'list\' object is not an iterator</code>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'What a for loop really does.',
        text: [
          'When the pass is empty, <code>next</code> has nothing to bring. It does not hand back <code>None</code>. It <b>raises</b> an exception called <code>StopIteration</code>: the burnt-dish message from lesson 52, and the one you got with your fourth <code>next</code>.',
          'A <code>for</code> loop is built from these pieces. It calls <code>iter()</code> <b>once</b>, then <code>next()</code> again and again, and runs the body with each plate. When <code>next</code> raises <code>StopIteration</code>, the loop <b>catches it</b> and ends quietly. That is why you have never seen <code>StopIteration</code> from a <code>for</code> loop.',
          'Press <b>Run</b>. The second half writes the same loop by hand with <code>while True</code> and <code>break</code> (lessons 25 and 28) and <code>try</code> and <code>except</code> (lesson 53). Both halves serve the same three plates. You never need to write the long way. It is there so you can see the waiter at work.'
        ],
        tip: 'This is why <code>for</code> works on a list, text, a dict, range and a file alike. Each one can give a waiter, and <code>for</code> only ever talks to the waiter.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A peek uses the waiter up.',
        text: [
          'Kitchen Coach lists Ben\'s high-protein dishes: 20 g or more. <code>filter</code> (lesson 81) picks them, and before printing the code checks there is at least one. <code>any(rich)</code> is <code>True</code> as soon as it finds <b>one</b> truthy item (lesson 23), and then it stops looking. Press <b>Run</b>.',
          'Only <code>pasta bake</code> is printed. The tofu stir-fry, 24 g, is missing. <code>filter</code> returns a waiter, not a list. <code>any</code> asked it for one plate, got the tofu stir-fry, and stopped. The loop got only <b>what was left</b>.',
          'The cards are worse. <code>list(cards)</code> takes every card off the <code>map</code> waiter to show them. Then <code>for card in cards</code> finds an empty tray and prints nothing. No error, no warning, just <code>Done</code>. Lesson 81 showed this: a second <code>list(m)</code> gives <code>[]</code>.'
        ],
        warn: 'Anything that looks at an iterator moves it on: <code>any()</code>, <code>list()</code>, <code>sum()</code>, <code>max()</code>, <code>in</code>, <code>next()</code> or a loop. The second look starts where the first one stopped.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Need it twice? Make a list once.',
        text: [
          'Wrap the waiter in <code>list()</code> <b>once</b>, straight away: <code>rich = list(filter(...))</code>. Now <code>rich</code> is a plain list on the pass, and every look gets a <b>new</b> waiter that starts at the first plate. <code>any(rich)</code> and the loop both see both dishes.',
          'The same for the cards: <code>cards = list(map(...))</code>. Press <b>Run</b>: both of Ben\'s dishes, and all four cards. The code below <code>rich = ...</code> did not change at all.',
          'The other way is to <b>ask for a new waiter</b> each time. A function that returns <code>filter(...)</code> builds a fresh one at every call, as in the second box. Use that when the list would be huge and you only need to walk it.'
        ],
        tip: 'Rule of thumb: if you only loop <b>once</b>, keep the iterator. If you look <b>twice</b>, or need <code>len()</code> or <code>[0]</code>, make a list.'
      },
      {
        label: 'Try it', pic: run(tryLines, { title: 'menu_file.py', files: { 'menu.csv': MENU } }),
        h: 'next with a default, and the file is a waiter.',
        text: [
          '<code>next(desserts, "no more")</code> gives a <b>default</b>. When the waiter has nothing left, you get <code>"no more"</code> instead of <code>StopIteration</code>. No <code>try</code> needed.',
          'An open file is an iterator too: it hands out <b>one line at a time</b> (lesson 55). <code>menu.csv</code> starts with a heading line, <code>dish,protein</code>. <code>header = next(f)</code> takes that line off, and the <code>for</code> loop carries on from line 2, because the file remembers where it is.',
          'Press <b>Run</b>. Then delete the two lines that start with <code>header</code> and <code>print("skipped:"</code>, run it again, and find the fake dish called <code>dish</code>. Put them back, and add a fourth <code>next(desserts, "no more")</code>.'
        ],
        tip: 'The default can be anything: <code>next(waiter, None)</code> is common. It only helps with <code>next</code>. A <code>for</code> loop never needs it.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Know which ones are one-shot.',
        text: [
          'A <b>list</b>, tuple, text, dict, set or range sends a <b>new waiter</b> for every loop, so you can loop them as often as you like. <code>map</code>, <code>filter</code>, <code>zip</code>, <code>enumerate</code>, an open file and anything from <code>iter()</code> <b>are</b> the waiter: one pass, then used up. Press <b>Run</b>: the second <code>dict(pairs)</code> is <code>{}</code>.',
          '<code>is</code> (lesson 16) asks "the very same thing?". <code>iter(waiter) is waiter</code> is <code>True</code>: asking a waiter for a waiter gives the same waiter, so its place is kept. <code>iter(plates) is plates</code> is <code>False</code>: the list sends someone new.',
          'A waiter does not know how many plates are left. <code>len(cards)</code> stops with <code>TypeError: object of type \'map\' has no len()</code>, and <code>cards[0]</code> with <code>\'map\' object is not subscriptable</code>. Make a list when you need those.'
        ],
        warn: 'The last box shows how a class becomes a waiter: <code>__iter__</code> and <code>__next__</code>, the dunder methods from lesson 72. You will rarely write one. Lesson 83, Generators, makes your own waiter in a few lines with <code>yield</code>, and lesson 101, The data model, explains the double-underscore names.'
      }
    ],
    exercises: [
      {
        file: 'l82_waiter.py', title: 'The waiter',
        task: 'Serve three courses with <code>iter()</code> and <code>next()</code>, ask once more with <code>next(waiter, "no more")</code> instead of crashing, and fix the menu cards: a <code>map</code> object is used up after one <code>list()</code>, so make a list once.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. It prints what your names hold: <code>checked</code> is already <code>[]</code>.',
          'Between <code>START</code> and <code>END</code>, make the waiter, take three plates with <code>next</code>, then a fourth with a default.',
          'Wrap the <code>map</code> in <code>list()</code>. Run it until it says <code>PASS</code>. The check also tries a second dinner.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['waiter = iter(["soup", "pasta", "brownie"])', 'next(waiter)', 'print(next(waiter))'], { title: 'courses.py' }),
        options: ['pasta', 'soup', 'brownie', '<list_iterator object at 0x...>'],
        answer: 0,
        why: 'The first <code>next</code> took the soup (nobody printed it). The waiter remembers where it is, so the second <code>next</code> brings the pasta.',
        hint: 'How many plates has the waiter already carried?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['doubled = map(lambda g: g * 2, [18, 24])', 'print(list(doubled))', 'print(list(doubled))'], { title: 'double.py' }),
        options: ['[36, 48] then []', '[36, 48] then [36, 48]', '[36, 48] then [72, 96]', '[36, 48] then StopIteration'],
        answer: 0,
        why: 'A map object is an iterator. The first <code>list()</code> takes every item. The second finds an empty tray, and <code>list()</code> turns that into an empty list, with no error.',
        hint: 'Can a waiter serve the same plate twice?'
      },
      {
        type: 'fix', q: 'Ben should see <b>both</b> high-protein dishes, but only the pasta bake is printed. Fix it so it prints <code>Ben has choices:</code>, <code>- tofu stir-fry</code> and <code>- pasta bake</code>.',
        code: [PROTEIN, '', 'rich = filter(lambda name: protein[name] >= 20, protein)', 'if any(rich):', '    print("Ben has choices:")', '    for name in rich:', '        print("-", name)'],
        title: 'ben_choices.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["Ben has choices:", "- tofu stir-fry", "- pasta bake"]:',
          '    ok = True',
          'elif lines == ["Ben has choices:", "- pasta bake"]:',
          '    msg = "Still only the pasta bake. any(rich) takes the first dish off the filter waiter. Make rich a list once: rich = list(filter(...))"',
          'else:',
          '    msg = "It should print exactly 3 lines: Ben has choices:, - tofu stir-fry, - pasta bake."'
        ].join('\n'),
        why: '<code>rich = list(filter(lambda name: protein[name] >= 20, protein))</code>. A list sends a new waiter for <code>any()</code> and another for the loop, so nothing is lost.',
        hint: 'What does any() do to a waiter? Make something that can be looked at twice.'
      },
      {
        type: 'fix', q: 'There are only two desserts, so the third <code>next</code> stops with <code>StopIteration</code>. Fix it so it prints <code>brownie</code>, <code>fruit salad</code> and then <code>no more</code>.',
        code: ['desserts = iter(["brownie", "fruit salad"])', 'print(next(desserts))', 'print(next(desserts))', 'print(next(desserts))'],
        title: 'desserts.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["brownie", "fruit salad", "no more"]:',
          '    ok = True',
          'elif "StopIteration" in out:',
          '    msg = "Still StopIteration. Give the last next() a default: next(desserts, \\"no more\\")"',
          'else:',
          '    msg = "It should print brownie, fruit salad and no more, one per line."'
        ].join('\n'),
        why: '<code>print(next(desserts, "no more"))</code>. The second value is what <code>next</code> gives back when the waiter has nothing left.',
        hint: 'next() takes a second value.'
      },
      {
        type: 'bucket', q: 'Can you loop over it again and again, or is it used up after one pass?',
        buckets: ['Again and again (iterable)', 'One pass only (iterator)'],
        items: [
          ['["pasta", "pancakes"]', 0],
          ['"bean chili"', 0],
          ['{"Ana": 2600}', 0],
          ['range(3)', 0],
          ['map(f, plates)', 1],
          ['zip(guests, meals)', 1],
          ['enumerate(steps)', 1],
          ['open("menu.csv")', 1]
        ],
        why: 'A list, text, a dict and range send a new waiter for each loop. map, zip, enumerate and an open file <b>are</b> the waiter: one pass, then empty.'
      },
      {
        type: 'order', q: 'Put in order what Python does for <code>for plate in plates:</code>.',
        items: [
          'Call iter(plates) once to get a waiter',
          'Call next(waiter) and put the result in plate',
          'Run the loop body with that plate',
          'Call next(waiter) again, and again',
          'next raises StopIteration: the loop ends quietly'
        ],
        why: 'iter once, next until StopIteration. The loop catches StopIteration for you, so you never see it.'
      },
      {
        type: 'pick', q: 'Back to lesson 77. What does the last line print?',
        pic: code(['guests = ["Ana", "Ben", "Chloe"]', 'kcal = [2600, 2400, 2000]', 'pairs = zip(guests, kcal)', 'targets = dict(pairs)', 'print(len(list(pairs)))'], { title: 'targets.py' }),
        options: ['0', '3', '6', 'TypeError: object of type \'zip\' has no len()'],
        answer: 0,
        why: '<code>dict(pairs)</code> already took every pair off the zip waiter. <code>list(pairs)</code> is <code>[]</code>, and the length of an empty list is 0. <code>targets</code> is fine: it is a dict, which you can use as often as you like.',
        hint: 'What did dict(pairs) do to the zip waiter?'
      },
      {
        type: 'type', q: 'Type the call that brings the next plate from <code>waiter</code>, or <code>"no more"</code> when the pass is empty.',
        prompt: '>>>',
        answers: ['next(waiter, "no more")'],
        accept: '^next\\( ?waiter ?, ?(["\'])no more\\1 ?\\)$',
        why: 'The second value of <code>next</code> is the default. With it, an empty waiter gives <code>"no more"</code> instead of raising <code>StopIteration</code>.',
        hint: 'next(waiter, ...)'
      }
    ]
  });
})();
