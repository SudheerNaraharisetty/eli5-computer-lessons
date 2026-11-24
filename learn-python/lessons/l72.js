/* Lesson 72: Dunder methods (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l72  Dunder methods
     ===================================================================== */

  const DISH = [
    'class Dish:',
    '    def __init__(self, name, protein):',
    '        self.name = name',
    '        self.protein = protein'
  ];
  const STR = [
    '    def __str__(self):',
    '        return f"{self.name} ({self.protein} g protein)"'
  ];
  const REPR = [
    '    def __repr__(self):',
    '        return f"Dish(\'{self.name}\', {self.protein})"'
  ];

  /* ---- The idea: print asks the dish for its __str__ hook ---- */
  const ideaSvg = svg(600, 270, 'print(soup) asks the soup: do you have a __str__ method? If not, Python prints its own plain label: <__main__.Dish object at 0x...>, the type and a memory address. If yes, Python calls __str__ and prints what it returns: lentil soup (18 g protein).',
    box(200, 10, 200, 52, P.tint, 12) + T(300, 43, 'print(soup)', { s: 17, m: true, f: P.accent }) +
    arrow(300, 64, 300, 92, P.ink2, 2.5) +
    T(300, 112, 'Python asks soup: do you have __str__?', { s: 13.5 }) +
    arrow(250, 124, 150, 156, P.ink2, 2.5) + arrow(350, 124, 450, 156, P.ink2, 2.5) +
    T(176, 146, 'no', { s: 13, w: 800, f: P.danger, a: 'end' }) + T(424, 146, 'yes', { s: 13, w: 800, f: P.ok, a: 'start' }) +
    box(10, 162, 280, 70, P.dangerT, 12) +
    T(150, 190, '<__main__.Dish object', { s: 13, m: true, f: P.danger }) +
    T(150, 214, 'at 0x10a3f2c50>', { s: 13, m: true, f: P.danger }) +
    box(310, 162, 280, 70, P.okT, 12) +
    T(450, 192, 'Python calls __str__', { s: 12, w: 700, f: P.ink2 }) +
    T(450, 216, 'lentil soup (18 g protein)', { s: 13, m: true, f: P.ok }) +
    T(150, 256, 'the type and where it sits in memory', { s: 12, w: 700, f: P.ink2 }) +
    T(450, 256, 'whatever __str__ returns', { s: 12, w: 700, f: P.ink2 }));
  const gibberish = [...DISH, '', '', 'soup = Dish("lentil soup", 18)', 'salad = Dish("green salad", 12)', 'print("Today\'s menu")', 'print(soup)', 'print(salad)'];
  const ideaPic = `<div style="width:100%;min-width:0">${run(gibberish, { title: 'menu.py' })}${ideaSvg}</div>`;

  /* ---- The code: __str__ ---- */
  const withStr = [...DISH, '', ...STR, '', '', 'soup = Dish("lentil soup", 18)', 'salad = Dish("green salad", 12)', 'print("Today\'s menu")', 'print(soup)', 'print(salad)', 'print(f"For Ben: {soup}")', 'print(str(salad).upper())'];

  /* ---- The pain: a list still shows the ugly label ---- */
  const listPain = [...DISH, '', ...STR, '', '', 'soup = Dish("lentil soup", 18)', 'salad = Dish("green salad", 12)', 'menu = [soup, salad]', 'print(soup)', 'print(menu)'];
  const painSvg = svg(600, 150, 'print(soup) uses __str__ and shows lentil soup (18 g protein). print(menu), a list, asks each dish for a different method, __repr__. Dish has none, so the list shows the plain label for each dish.',
    box(10, 12, 280, 96, P.okT, 14) + T(150, 40, 'print(soup)', { s: 15, m: true }) +
    T(150, 66, 'asks for __str__', { s: 13, w: 700, f: P.ok }) + T(150, 92, 'lentil soup (18 g protein)', { s: 12, m: true, f: P.ok }) +
    box(310, 12, 280, 96, P.dangerT, 14) + T(450, 40, 'print(menu)', { s: 15, m: true }) +
    T(450, 66, 'asks each dish for __repr__', { s: 13, w: 700, f: P.danger }) + T(450, 92, '[<__main__.Dish object ...>, ...]', { s: 12, m: true, f: P.danger }) +
    T(300, 138, 'Two different hooks. You only wrote one of them.', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(listPain, { title: 'menu.py' })}${painSvg}</div>`;

  /* ---- The fix: __repr__ ---- */
  const withRepr = [...DISH, '', ...STR, '', ...REPR, '', '', 'soup = Dish("lentil soup", 18)', 'salad = Dish("green salad", 12)', 'menu = [soup, salad]', 'print(soup)', 'print(menu)', 'print(repr(soup))', 'for dish in menu:', '    print("-", dish)'];
  const twoSvg = svg(600, 200, 'Two hooks. __str__ is for people: print(soup), an f-string {soup}, and str(soup) use it. __repr__ is for programmers: a list or dict, the REPL showing soup, repr(soup) and {soup!r} use it. It looks like the code that makes the dish.',
    box(10, 10, 280, 176, P.okT, 14) + T(150, 38, '__str__  for people', { s: 15, m: true, f: P.ok }) +
    T(150, 72, 'print(soup)', { s: 13, m: true }) + T(150, 98, 'f"{soup}"', { s: 13, m: true }) + T(150, 124, 'str(soup)', { s: 13, m: true }) +
    T(150, 164, 'lentil soup (18 g protein)', { s: 12, m: true, f: P.ok }) +
    box(310, 10, 280, 176, P.tint, 14) + T(450, 38, '__repr__  for programmers', { s: 15, m: true, f: P.accent }) +
    T(450, 72, 'print(menu)  in a list', { s: 13, m: true }) + T(450, 98, '>>> soup  in the REPL', { s: 13, m: true }) + T(450, 124, 'repr(soup)  f"{soup!r}"', { s: 13, m: true }) +
    T(450, 164, "Dish('lentil soup', 18)", { s: 12, m: true, f: P.accent }));
  const replTerm = term([
    '$ python3',
    '>>> from menu import Dish',
    '>>> soup = Dish("lentil soup", 18)',
    '>>> soup',
    "Dish('lentil soup', 18)",
    '>>> print(soup)',
    'lentil soup (18 g protein)'
  ], 'the >>> prompt (the REPL), Python 3.15, with the class saved in menu.py');
  const fixPic = `<div style="width:100%;min-width:0">${run(withRepr, { title: 'menu.py' })}${twoSvg}${replTerm}</div>`;

  /* ---- Try it: __eq__ and __len__ ---- */
  const eq = [...DISH, '', '    def __eq__(self, other):', '        return self.name == other.name and self.protein == other.protein', '', '',
    'soup = Dish("lentil soup", 18)', 'bens_soup = Dish("lentil soup", 18)', 'chili = Dish("bean chili", 15)', 'print(soup == bens_soup)', 'print(soup == chili)', 'print(soup != chili)', 'menu = [soup, chili]', 'print(Dish("bean chili", 15) in menu)'];
  const lunch = [
    'class Lunchbox:',
    '    def __init__(self):',
    '        self.snacks = []',
    '',
    '    def add(self, snack):',
    '        self.snacks.append(snack)',
    '',
    '    def __len__(self):',
    '        return len(self.snacks)',
    '',
    '',
    'box = Lunchbox()',
    'print(len(box), "snacks")',
    'box.add("banana")',
    'box.add("rice cake")',
    'box.add("peanut butter")',
    'print(len(box), "snacks for Ana\'s 12 km run")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(eq, { title: 'same_soup.py' })}${run(lunch, { title: 'lunchbox.py' })}</div>`;

  /* ---- The catch: __str__ must return, not print ---- */
  const printsStr = [...DISH, '', '    def __str__(self):', '        print(f"{self.name} ({self.protein} g protein)")', '', '', 'soup = Dish("lentil soup", 18)', 'print(soup)'];
  const catchTerm = term([
    '$ python3 menu.py',
    'lentil soup (18 g protein)',
    'Traceback (most recent call last):',
    '  File "/Users/chloe/kitchen/menu.py", line 11, in <module>',
    '    print(soup)',
    '    ~~~~~^^^^^^',
    'TypeError: Dish.__str__() must return a str, not NoneType'
  ], 'the same file in a terminal, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${run(printsStr, { title: 'menu.py' })}${catchTerm}</div>`;

  COURSE.add({
    id: 'l72', minutes: 13,
    summary: '<code>print(soup)</code> shows <code>&lt;__main__.Dish object at 0x10a3f2c50&gt;</code>: the type and where soup sits in memory, a number that changes on every run. Teach your class with <b>dunder methods</b>: "dunder" means <b>d</b>ouble <b>under</b>score, like <code>__init__</code>. They are <b>hooks</b>: you write them, and <b>Python calls them for you</b>. <code>__str__</code> is for <b>people</b>: <code>print(soup)</code>, f-strings and <code>str()</code> use it, so <code>return f"{self.name} ({self.protein} g protein)"</code>. <code>__repr__</code> is for <b>programmers</b>: a list like <code>print(menu)</code>, the REPL and <code>repr()</code> use it, and a good one looks like the code that makes the dish, <code>Dish(\'lentil soup\', 18)</code>. Write only <code>__str__</code> and a list still shows the ugly label. <code>__eq__</code> decides what <code>==</code> means (without it, two dishes are only equal if they are the very same object), and <code>__len__</code> answers <code>len(box)</code>. Every dunder must <b>return</b> its answer: a <code>__str__</code> that prints gives <code>TypeError: __str__ returned non-string (type NoneType)</code>.',
    video: {
      src: 'videos/l72-dunder-methods.mp4', poster: 'videos/l72-dunder-methods.jpg', length: '1 min 3 s',
      script: [
        'Kitchen Coach prints today\'s menu for Ana, Ben and Chloe. Print soup.',
        'And the card comes out like this. A Dish object, at a long, strange number. That number is where soup sits in memory, and it changes on every run. Python just does not know how to show your dish.',
        'So teach it, with a dunder method. Dunder means double underscore, like init. Def, dunder str. Return the name and the protein. You never call it yourself. Print calls it for you.',
        'Print soup again. Lentil soup, 18 grams protein.',
        'Now print the whole menu. It is a list, and it is ugly again! A list shows each dish with a different dunder: repr. Repr is for programmers. Make it look like the code that builds the dish. Dish, lentil soup, 18.',
        'Print the menu again. Every dish is readable.',
        'Dunder methods are hooks. Python calls them when you print, compare or measure.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Teach print how to show your dish.',
        text: [
          'Kitchen Coach prints today\'s menu for Ana, Ben and Chloe. Press <b>Run</b>. Instead of two dishes you get <code>&lt;__main__.Dish object at 0x...&gt;</code> twice. That is Python\'s own plain label: the <b>type</b> (a Dish, made in the file you ran) and the <b>memory address</b>, where the object sits in the computer\'s memory. The number after <code>0x</code> is different on every run and on every computer. Run it again and watch it change.',
          'Python does not know what matters about your dish. So it asks. When you <code>print(soup)</code>, Python looks for a method called <code>__str__</code> on the soup. If there is one, Python <b>calls it for you</b> and prints what it returns. If not, you get the plain label.',
          'Methods like <code>__str__</code> are called <b>dunder methods</b>. "Dunder" is short for <b>d</b>ouble <b>under</b>score: two underscores before the name and two after. You already wrote one: <code>__init__</code> (lesson 67), which Python calls every time you make a new object. Dunder methods are <b>hooks</b>. You never call them yourself. Python calls them when you print, compare or measure.'
        ],
        tip: 'Say <code>__str__</code> as "dunder str", and <code>__init__</code> as "dunder init". That is how Python cooks say them out loud.'
      },
      {
        label: 'The code', pic: run(withStr, { title: 'menu.py' }),
        h: '__str__: what people see.',
        text: [
          'Write <code>__str__</code> inside the class, like any method (lesson 68). It gets only <code>self</code>, the dish being shown, and it must <b>return</b> a piece of text. Here it is an f-string (lesson 15): <code>f"{self.name} ({self.protein} g protein)"</code>. Press <b>Run</b>.',
          'Now <code>print(soup)</code> shows <code>lentil soup (18 g protein)</code>. And it is not only print. An f-string uses the same hook: <code>f"For Ben: {soup}"</code>. So does <code>str(soup)</code>, which gives the text back so you can use it, here with <code>.upper()</code> from lesson 9.',
          'Notice that nobody writes <code>soup.__str__()</code>. You write <code>print(soup)</code> or <code>str(soup)</code>, and Python calls the dunder for you. Now change the text in <code>__str__</code> to <code>f"{self.name}: {self.protein} g"</code> and run it again. Every line that shows a dish changes at once, because they all ask the same one method.'
        ],
        tip: '<code>__str__</code> is for <b>people</b>: Ana reading her menu card. Make it short and friendly. Leave out anything only a programmer cares about.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'In a list, the dish is ugly again.',
        text: [
          'Kitchen Coach keeps the menu as a list (lesson 31): <code>menu = [soup, salad]</code>. Press <b>Run</b>. <code>print(soup)</code> is fine. But <code>print(menu)</code> shows <code>[&lt;__main__.Dish object at 0x...&gt;, &lt;__main__.Dish object at 0x...&gt;]</code>. All that work on <code>__str__</code>, and the menu still looks like gibberish.',
          'Here is why. To show a list, Python shows each item in it the way a <b>programmer</b> needs to see it. That uses a <b>different</b> dunder method: <code>__repr__</code> (say "dunder repper", short for representation). Dish has no <code>__repr__</code>, so each dish falls back to the plain label.',
          'The same happens inside a dict or a tuple. Try it: add <code>print({"Ben": soup})</code> at the end and run it. Ben\'s soup is ugly too.'
        ],
        warn: '<code>__str__</code> alone is not enough. As soon as a dish sits inside a list, a dict or the REPL, Python asks for <code>__repr__</code>.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: '__repr__: what programmers see.',
        text: [
          'Add a second hook, <code>__repr__</code>. It also gets only <code>self</code> and returns text. A good habit: make it look like <b>the code that makes the dish</b>, <code>Dish(\'lentil soup\', 18)</code>. Then anyone who reads it knows what it is and how to make one. Press <b>Run</b>.',
          'Now the menu reads <code>[Dish(\'lentil soup\', 18), Dish(\'green salad\', 12)]</code>, and <code>print(soup)</code> still uses <code>__str__</code>. <code>repr(soup)</code> asks for the programmer view on purpose. And a <code>for</code> loop that prints one dish at a time uses <code>__str__</code> again, because each line prints a single dish.',
          'The <code>&gt;&gt;&gt;</code> prompt from lesson 6 shows <code>__repr__</code> too. Programmers call it the <b>REPL</b>. Type <code>soup</code> and press Enter, and you see <code>Dish(\'lentil soup\', 18)</code>, the programmer view. Type <code>print(soup)</code> and you see the menu card.'
        ],
        tip: 'If you only have time for one, write <code>__repr__</code>. When a class has no <code>__str__</code>, print uses <code>__repr__</code> instead. In an f-string, <code>{soup!r}</code> asks for <code>__repr__</code>. Pros write <code>f"Dish({self.name!r}, {self.protein})"</code>: <code>!r</code> adds the quotes for you, and it still works for a name like <code>Ben\'s chili</code>.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: '__eq__ for ==, and __len__ for len().',
        text: [
          'Ben makes his own lentil soup with 18 g protein. Is it the same dish as yours? Without help, <code>==</code> says <code>False</code>: it only says <code>True</code> when both names point at the <b>very same object</b>. <code>__eq__(self, other)</code> lets you decide what "the same" means. Here: the same name <b>and</b> the same protein. Press <b>Run</b>: <code>True</code>, <code>False</code>, <code>True</code>, <code>True</code>.',
          '<code>other</code> is the dish on the right of <code>==</code>. <code>!=</code> uses your <code>__eq__</code> too, and so does <code>in</code> (lesson 31): it looks through the list with <code>==</code>. Now delete the two <code>__eq__</code> lines and run it again. Every answer is <code>False</code>, except <code>!=</code>.',
          'A short bonus in the second box: Ana\'s lunchbox (lesson 71) answers <code>len(box)</code> because it has <code>__len__</code>, which returns how many snacks are inside. Press <b>Run</b>: <code>0 snacks</code>, then <code>3 snacks</code>. Without <code>__len__</code>, Python stops with <code>TypeError: object of type \'Lunchbox\' has no len()</code>.'
        ],
        tip: 'This <code>__eq__</code> expects a Dish on both sides. <code>soup == "lentil soup"</code> stops with <code>AttributeError: \'str\' object has no attribute \'name\'</code>. Next lesson, Dataclasses, writes <code>__init__</code>, <code>__repr__</code> and a careful <code>__eq__</code> for you. Lesson 101, The data model, shows the hooks behind <code>+</code>, <code>[]</code> and more.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Return the text. Do not print it.',
        text: [
          'Chloe wrote her <code>__str__</code> with <code>print</code> instead of <code>return</code>. Press <b>Run</b>. The text shows up once, and then Python stops: <code>TypeError: __str__ returned non-string (type NoneType)</code>.',
          'Here is what happened. <code>print(soup)</code> called <code>__str__</code>. Inside, Chloe\'s own <code>print</code> wrote the text to the screen. Then <code>__str__</code> ended without a <code>return</code>, so it gave back <code>None</code> (lesson 16). Python asked for text, got nothing, and stopped. Python 3.15 says it more clearly: <code>Dish.__str__() must return a str, not NoneType</code>.',
          'Change <code>print(</code> to <code>return </code> on line 7 and run it again. The same goes for every dunder: <code>__repr__</code> returns text, <code>__eq__</code> returns <code>True</code> or <code>False</code>, <code>__len__</code> returns a whole number. Python does the printing, comparing and measuring with what you return.'
        ],
        warn: 'A dunder method answers Python\'s question with <code>return</code>. If you see "returned non-string" or "NoneType", look for a <code>print</code> where a <code>return</code> should be.'
      }
    ],
    exercises: [
      {
        file: 'l72_menu_card.py', title: 'The menu card',
        task: 'Kitchen Coach prints <code>&lt;__main__.Dish object at 0x...&gt;</code> for every dish. Give the class <code>Dish</code> three dunder methods: <code>__str__</code> returns <code>lentil soup (18 g protein)</code>, <code>__repr__</code> returns <code>Dish(\'lentil soup\', 18)</code>, and <code>__eq__</code> says two dishes are <code>==</code> when they have the same name <b>and</b> the same protein.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The menu is gibberish, and the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, under <code>__init__</code>, write the three methods, one at a time. Run the file after each one: the menu in STEP 1 gets better each time.',
          'Run the file until it says <code>PASS</code>. The check tries other dishes too, like Chloe\'s rice pudding, so use <code>self.name</code> and <code>self.protein</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Dish has <code>__str__</code> but no <code>__repr__</code>. What does the last line print?',
        pic: code([...DISH, '', ...STR, '', '', 'soup = Dish("lentil soup", 18)', 'print([soup])'], { title: 'one_dish.py' }),
        options: ['[<__main__.Dish object at 0x...>]', '[lentil soup (18 g protein)]', "['lentil soup (18 g protein)']", 'lentil soup (18 g protein)'],
        answer: 0,
        why: 'A list shows each item with <code>__repr__</code>, the programmer view. Dish has none, so the soup falls back to the plain label, even though <code>__str__</code> exists.',
        hint: 'Which dunder does a list ask for?'
      },
      {
        type: 'fix', q: 'The menu is still gibberish. Add a method so the program prints <code>lentil soup (18 g protein)</code> and then <code>[Dish(\'lentil soup\', 18), Dish(\'green salad\', 12)]</code>.',
        code: listPain, title: 'menu.py',
        check: [
          'lines = out.strip().splitlines()',
          'want = ["lentil soup (18 g protein)", "[Dish(\'lentil soup\', 18), Dish(\'green salad\', 12)]"]',
          'if lines == want:',
          '    ok = True',
          'elif len(lines) == 2 and lines[0] != want[0]:',
          '    msg = "print(soup) changed. Keep __str__ as it is and add a second method."',
          'elif len(lines) == 2 and "object at" in lines[1]:',
          '    msg = "The list still shows the plain label. Write def __repr__(self): inside the class."',
          'else:',
          '    msg = "The second line should be exactly: [Dish(\'lentil soup\', 18), Dish(\'green salad\', 12)]"'
        ].join('\n'),
        why: 'A list asks each dish for <code>__repr__</code>. <code>return f"Dish(\'{self.name}\', {self.protein})"</code> makes it look like the code that makes the dish. <code>__str__</code> stays for <code>print(soup)</code>.',
        hint: 'Inside the class, under __str__: def __repr__(self): and return an f-string.'
      },
      {
        type: 'pick', q: 'Dish has <code>__init__</code> only, no <code>__eq__</code>. What does this print?',
        pic: code([...DISH, '', '', 'soup = Dish("lentil soup", 18)', 'bens_soup = Dish("lentil soup", 18)', 'print(soup == bens_soup)'], { title: 'same.py' }),
        options: ['False', 'True', "TypeError: '==' not supported between instances of 'Dish' and 'Dish'", 'None'],
        answer: 0,
        why: 'Without <code>__eq__</code>, <code>==</code> only says <code>True</code> for the very same object. These are two separate dishes, even though their labels match. Write <code>__eq__</code> to compare the name and the protein.',
        hint: 'Two calls to Dish() make two separate objects.'
      },
      {
        type: 'match', q: 'Match what you write to the dunder method Python calls for you.',
        pairs: [
          ['soup = Dish("lentil soup", 18)', '__init__'],
          ['print(soup)', '__str__'],
          ['print([soup, salad])', '__repr__'],
          ['soup == bens_soup', '__eq__'],
          ['len(lunchbox)', '__len__']
        ],
        why: 'You write the everyday code, and Python calls the hook. Making an object calls <code>__init__</code>, print calls <code>__str__</code>, a list shows its items with <code>__repr__</code>, <code>==</code> calls <code>__eq__</code> and <code>len()</code> calls <code>__len__</code>.',
        hint: 'A list shows its items the programmer way.'
      },
      {
        type: 'fix', q: 'Chloe\'s menu stops with a <code>TypeError</code>. Fix <code>__str__</code> so the program prints <code>lentil soup (18 g protein)</code> exactly <b>once</b>, with no error.',
        code: printsStr, title: 'menu.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["lentil soup (18 g protein)"]:',
          '    ok = True',
          'elif "Error" in out:',
          '    msg = "It still stops with an error. __str__ must give the text back to Python."',
          'elif len(lines) > 1:',
          '    msg = "The text shows up more than once. Is there still a print inside __str__?"',
          'else:',
          '    msg = "It should print exactly one line: lentil soup (18 g protein)"'
        ].join('\n'),
        why: '<code>__str__</code> must <b>return</b> the text. Python does the printing. With <code>print</code> inside, the method gives back <code>None</code>, and Python stops with <code>__str__ returned non-string</code>.',
        hint: 'Swap one word on line 7.'
      },
      {
        type: 'fill', q: 'Finish the lunchbox so <code>len(box)</code> says how many snacks are inside.',
        text: 'class Lunchbox:\n    def __init__(self):\n        self.snacks = []\n\n    def ___(self):\n        return ___(self.snacks)',
        options: ['__len__', 'len', '__str__', 'count', '__size__', 'print'],
        answer: ['__len__', 'len'],
        why: '<code>len(box)</code> calls <code>box.__len__()</code>. Inside, the lunchbox asks its own list: <code>len(self.snacks)</code>. The method returns a whole number.',
        hint: 'The dunder name matches the function you call: len().'
      },
      {
        type: 'pick', q: 'Which of these use <code>__repr__</code>, not <code>__str__</code>? Pick all that do.',
        options: ['print(menu), where menu is a list of dishes', 'typing soup in the REPL and pressing Enter', 'repr(soup)', 'print(soup)', 'f"Today: {soup}"', 'str(soup)'],
        answer: [0, 1, 2],
        why: 'The programmer view, <code>__repr__</code>, is used for items inside a list, for the REPL and for <code>repr()</code>. <code>print</code>, f-strings and <code>str()</code> use the people view, <code>__str__</code>.',
        hint: 'Which ones are for programmers looking inside?'
      },
      {
        type: 'pick', q: 'Back to lesson 45. What does this print?',
        pic: code(['def label(name, protein):', '    print(f"{name} ({protein} g protein)")', '', '', 'text = label("lentil soup", 18)', 'print(text)'], { title: 'label.py' }),
        options: ['lentil soup (18 g protein), then None', 'lentil soup (18 g protein), twice', 'None only', 'lentil soup (18 g protein) only'],
        answer: 0,
        why: 'The function prints the text itself and has no <code>return</code>, so it gives back <code>None</code>. That is the same slip as a <code>__str__</code> that prints: the screen shows the text, but the caller gets <code>None</code>.',
        hint: 'What does a function give back when it has no return?'
      }
    ]
  });
})();
