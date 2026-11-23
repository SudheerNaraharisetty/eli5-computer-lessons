/* Lesson 67: __init__ and self (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l67  __init__ and self
     ===================================================================== */

  // A small plate card: who it is for, the call that made it, and its labels.
  const plate = (x, y, who, call, name, protein) =>
    box(x, y, 180, 150, P.white, 14) +
    T(x + 90, y + 24, who, { s: 13.5 }) +
    T(x + 90, y + 48, call, { s: 10.5, m: true, f: P.accent }) +
    `<circle cx="${x + 40}" cy="${y + 104}" r="27" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x + 40}" cy="${y + 104}" r="16" fill="${P.tint}"/>` +
    T(x + 78, y + 98, name, { s: 11.5, m: true, a: 'start' }) +
    T(x + 78, y + 120, protein + ' g protein', { s: 11.5, m: true, a: 'start', f: P.ok });

  /* ---- The idea: a prep station sets up every new dish ---- */
  const ideaPic = svg(600, 350, 'A call, Dish("lentil soup", 18), goes into the prep station, __init__, and comes out as a plate that knows its name, lentil soup, and its protein, 18. Below, three plates set up the same way in one line each: Ana gets Dish("pasta bake", 22), Ben gets Dish("protein shake", 30), Chloe gets Dish("rice pudding", 8).',
    box(10, 14, 206, 66, P.white, 12) + T(113, 42, 'you write', { s: 11.5, w: 700, f: P.ink2 }) + T(113, 64, 'Dish("lentil soup", 18)', { s: 12, m: true, f: P.accent }) +
    arrow(220, 47, 252, 47, P.ink2, 2.5) +
    box(256, 8, 148, 80, P.tint, 12) + T(330, 38, 'prep station', { s: 14 }) + T(330, 66, '__init__', { s: 15, m: true, f: P.accent }) +
    arrow(408, 47, 440, 47, P.ink2, 2.5) +
    box(444, 8, 146, 80, P.white, 12) + T(517, 32, 'soup', { s: 13, m: true, f: P.accent }) +
    T(517, 55, 'lentil soup', { s: 11.5, m: true }) + T(517, 76, '18 g protein', { s: 11.5, m: true, f: P.ok }) +
    T(300, 118, 'Every Dish(...) goes through the same prep station.', { s: 12.5, w: 700, f: P.ink2 }) +
    plate(10, 138, 'for Ana', 'Dish("pasta bake", 22)', 'pasta bake', 22) +
    plate(210, 138, 'for Ben', 'Dish("protein shake", 30)', 'protein shake', 30) +
    plate(410, 138, 'for Chloe', 'Dish("rice pudding", 8)', 'rice pudding', 8) +
    T(300, 322, 'One line per dish. Nothing forgotten, nothing set up by hand.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The code: __init__ runs by itself, self is the new dish ---- */
  const prep = [
    'class Dish:',
    '    def __init__(self, name, protein):',
    '        print("prep station: setting up", name)',
    '        self.name = name',
    '        self.protein = protein',
    '',
    'soup = Dish("lentil soup", 18)',
    'shake = Dish("protein shake", 30)',
    '',
    'print(soup.name, soup.protein)',
    'print(shake.name, shake.protein)'
  ];
  // 17px mono: 10.2 px per character. Top line starts at x 126.5, bottom line at x 182.7.
  const callSvg = svg(600, 160, 'How the call fills the jars. Dish("lentil soup", 18): "lentil soup" goes into name and 18 goes into protein. self is not in the call: Python makes the new, empty Dish and passes it in as self, for you.',
    T(300, 42, 'def __init__(self, name, protein):', { s: 17, m: true }) +
    `<rect x="256" y="52" width="48" height="4" rx="2" fill="${P.warn}"/>` +
    `<rect x="318" y="52" width="46" height="4" rx="2" fill="${P.ok}"/>` +
    `<rect x="379" y="52" width="76" height="4" rx="2" fill="${P.ok}"/>` +
    T(300, 132, 'Dish("lentil soup", 18)', { s: 17, m: true }) +
    arrow(300, 112, 341, 64, P.ok, 2.5) + arrow(397, 112, 417, 64, P.ok, 2.5) +
    box(8, 92, 150, 50, P.warnT, 12) + T(83, 113, 'the new Dish', { s: 12.5 }) + T(83, 131, 'Python passes it', { s: 11, w: 700, f: P.ink2 }) +
    arrow(150, 92, 268, 64, P.warn, 2.5) +
    T(520, 112, '2 arguments', { s: 12.5, f: P.ok }) + T(520, 132, '3 parameters', { s: 12.5, f: P.warn }) + T(520, 152, 'self comes free', { s: 11.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(prep, { title: 'prep_station.py' })}${callSvg}</div>`;

  /* ---- The pain: forgetting self. ---- */
  const forgot = [
    'class Dish:',
    '    def __init__(self, name, protein):',
    '        name = name           # forgot self.',
    '        protein = protein     # forgot self.',
    '',
    'soup = Dish("lentil soup", 18)',
    'print("made the soup")',
    'print(soup.name)'
  ];
  const panSvg = svg(600, 140, 'Inside __init__, name = name only fills a jar in the pan. When __init__ ends, the pan is washed and the name is gone. self.name = name puts the label on the plate itself, and the plate is what you keep.',
    box(16, 16, 268, 108, P.dangerT, 14) + T(150, 42, 'name = name', { s: 15, m: true, f: P.danger }) +
    T(150, 72, 'a jar in the pan (lesson 47)', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 100, 'gone when __init__ ends', { s: 13, f: P.danger }) +
    box(316, 16, 268, 108, P.okT, 14) + T(450, 42, 'self.name = name', { s: 15, m: true, f: P.ok }) +
    T(450, 72, 'a label on the plate', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 100, 'stays with soup', { s: 13, f: P.ok }));
  const painPic = `<div style="width:100%;min-width:0">${run(forgot, { title: 'forgot_self.py' })}${panSvg}</div>`;

  /* ---- The fix: self. on every line, and Python guards the door ---- */
  const fixed = [
    'class Dish:',
    '    def __init__(self, name, protein):',
    '        self.name = name',
    '        self.protein = protein',
    '',
    'soup = Dish("lentil soup", 18)',
    'print(soup.name, "has", soup.protein, "g protein")',
    '',
    'pudding = Dish("rice pudding")    # Chloe\'s dessert',
    'print(pudding.name, "has", pudding.protein, "g protein")'
  ];
  const doorTerm = term([
    '$ python3 kitchen.py',
    'lentil soup has 18 g protein',
    'Traceback (most recent call last):',
    '  File "/Users/chloe/kitchen/kitchen.py", line 9, in <module>',
    '    pudding = Dish("rice pudding")    # Chloe\'s dessert',
    "TypeError: Dish.__init__() missing 1 required positional argument: 'protein'"
  ], 'terminal, Python 3.15');
  const fixPic = `<div style="width:100%;min-width:0">${run(fixed, { title: 'kitchen.py' })}${doorTerm}</div>`;

  /* ---- Try it: a default in __init__ ---- */
  const servings = [
    'class Dish:',
    '    def __init__(self, name, protein, servings=2):',
    '        self.name = name',
    '        self.protein = protein',
    '        self.servings = servings',
    '',
    'soup = Dish("lentil soup", 18)',
    'shake = Dish("protein shake", 30, servings=1)',
    '',
    'for dish in [soup, shake]:',
    '    print(f"{dish.name}: serves {dish.servings}, {dish.protein} g protein each")'
  ];

  /* ---- The catch: Python counts self, and __init__ hands back nothing ---- */
  const count = [
    'class Dish:',
    '    def __init__(self, name, protein):',
    '        self.name = name',
    '        self.protein = protein',
    '',
    'bake = Dish("pasta bake", 22)',
    'print(bake.name, bake.protein)',
    '',
    'pasta = Dish("pasta", 14, 2)     # 2 servings?'
  ];
  const giveBack = code([
    'class Dish:',
    '    def __init__(self, name, protein):',
    '        self.name = name',
    '        self.protein = protein',
    '        return self              # no!',
    '',
    'soup = Dish("lentil soup", 18)'
  ], { title: 'give_back.py', bad: [5] });
  const giveTerm = term([
    '$ python3 give_back.py',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/give_back.py", line 7, in <module>',
    '    soup = Dish("lentil soup", 18)',
    "TypeError: __init__() should return None, not 'Dish'"
  ], 'terminal, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${run(count, { title: 'count.py' })}${giveBack}${giveTerm}</div>`;

  COURSE.add({
    id: 'l67', minutes: 12,
    summary: 'Setting up each dish by hand, one attribute at a time, is how lines get forgotten. Give the class a <b>prep station</b> instead: a method called <code>__init__</code> (two underscores on each side). Python runs it <b>by itself</b> every time you make a new object, so <code>Dish("lentil soup", 18)</code> sets up the whole dish in one line. The arguments go into the parameters in order. The first parameter, <code>self</code>, is <b>the new object being set up</b>. Python passes it for you, which is why you give one argument fewer than there are parameters. Inside, <code>self.name = name</code> puts each value on the new object. Forget the <code>self.</code> and the value stays a name in the pan and is gone, so you get an <code>AttributeError</code> later. Forget an argument and Python stops right at the call: <code>TypeError: Dish.__init__() missing 1 required positional argument: \'protein\'</code>. Defaults work like on any recipe card: <code>servings=2</code>. And <code>__init__</code> never returns a value.',
    video: {
      src: 'videos/l67-init-and-self.mp4', poster: 'videos/l67-init-and-self.jpg', length: '1 min 12 s',
      script: [
        'Last lesson, you set up each dish by hand. A name. Then the protein. And one day, you forget a line.',
        'So give the class a prep station. Write def, then init, with two underscores on each side. Python runs it by itself, every time you make a new dish.',
        'Call Dish with lentil soup and 18. The arguments travel in. Lentil soup goes into name. 18 goes into protein.',
        'And self? Self is the new plate being set up. Python hands it over for you. That is why you pass 2 arguments, not 3.',
        'Self dot name equals name. The label goes on the plate. Self dot protein equals protein. 18 grams.',
        'Ben wants a protein shake. One line. 30 grams, set up the same way.',
        'Forget the protein, and Python stops right there. Type error. Missing 1 required positional argument: protein. No half-made dish leaves the station.',
        'Init sets up every new object. Self is the one being made.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A prep station sets up every new dish.',
        text: [
          'In lesson 66 you made a <code>Dish</code> and then stuck the labels on by hand: <code>soup = Dish()</code>, then <code>soup.name = "lentil soup"</code>, then <code>soup.protein = 18</code>. Three lines for one dish. Forget one, and Python only complains much later: <code>AttributeError: \'Dish\' object has no attribute \'protein\'</code>.',
          'A good kitchen has a <b>prep station</b>. Every dish that comes off it is laid out the same way: a plate, a name card, the protein written down. You say what you want, and the station does the rest.',
          'A class can have its own prep station. It is a method called <code>__init__</code>. Python runs it <b>by itself</b> every time you make a new object. So Ana\'s pasta bake, Ben\'s protein shake and Chloe\'s rice pudding are each set up in <b>one line</b>, and none of them can come out half-made.'
        ],
        tip: 'Say it "dunder init". "Dunder" is short for <b>d</b>ouble <b>under</b>score: two underscores before and two after. Python uses names like that for its own jobs, the ones it calls by itself. You meet more of them in lesson 72, Dunder methods. "init" is short for initialise: set up at the start.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Dish("lentil soup", 18) runs __init__.',
        text: [
          '<code>__init__</code> is a <code>def</code> inside the class, written like any recipe card from lesson 44. It has <b>parameters</b>, the jars from lesson 45. When you write <code>Dish("lentil soup", 18)</code>, Python makes a new, empty Dish and then calls <code>__init__</code> on it. Your <b>arguments</b> fill the jars in order: <code>"lentil soup"</code> into <code>name</code>, <code>18</code> into <code>protein</code>.',
          'The first jar, <code>self</code>, is different. It holds <b>the new dish being set up</b>. You never pass it. Python passes it for you, so the card has 3 parameters but the call has only 2 arguments. Inside, <code>self.name = name</code> reads: on this new dish, put a label <code>name</code>, and write on it what came in. Then the new dish is handed back and gets its name: <code>soup</code>.',
          'Press <b>Run</b>. The line in <code>__init__</code> that prints shows the station working: once for the soup, once for the shake, and you never called it yourself. Then add Chloe\'s dessert: <code>pudding = Dish("rice pudding", 8)</code> and <code>print(pudding.name, pudding.protein)</code>. Run it again.'
        ],
        tip: '<code>self</code> is only a name, but every Python programmer uses it, and so should you. In the same file, <code>soup</code> outside the class and <code>self</code> inside <code>__init__</code> are two names for the same plate.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Forget self. and the label never reaches the plate.',
        text: [
          'Press <b>Run</b>. It says <code>made the soup</code>, so making the dish worked. Then line 8 stops: <code>AttributeError: \'Dish\' object has no attribute \'name\'</code>.',
          'Look at lines 3 and 4. <code>name = name</code> has no <code>self.</code> in front. So it only fills a jar <b>inside the pan</b> of <code>__init__</code>. Lesson 47 showed you what happens to those: they are local, and they are gone when the call ends. The soup itself never got a label.',
          'This one is sneaky, because nothing goes wrong where the mistake is. Python only stops later, on the line that asks the soup for its name.'
        ],
        warn: 'Every value you want to <b>keep on the object</b> needs <code>self.</code> in front: <code>self.name = name</code>. A line without it is fine for a quick sum inside <code>__init__</code>, but it is gone afterwards.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'self. on every line, and Python guards the door.',
        text: [
          'Lines 3 and 4 now say <code>self.name = name</code> and <code>self.protein = protein</code>: one line for each jar. Read each one as "this dish\'s name is the name that came in". The soup gets both labels.',
          'Now the station <b>guards the door</b>. Press <b>Run</b>. The soup is fine, but Chloe\'s rice pudding came with no protein, and Python stops <b>right at that line</b>: <code>missing 1 required positional argument: \'protein\'</code>. In lesson 66 a forgotten label went unnoticed until something asked for it. Now a half-made dish never leaves the station, and the error even names the missing jar.',
          'Rice pudding has about 8 g protein per serving. Change line 9 to <code>Dish("rice pudding", 8)</code> and run it again.'
        ],
        tip: 'Python names the function in the error: <code>Dish.__init__()</code>. So when you see <code>__init__</code> in a <code>TypeError</code>, look at the line that <b>makes</b> the object, and count the arguments.'
      },
      {
        label: 'Try it', pic: run(servings, { title: 'servings.py' }),
        h: 'A default: 2 servings, unless told.',
        text: [
          '<code>__init__</code> takes defaults like any recipe card in lesson 46. Most dishes in your kitchen serve 2, so <code>servings=2</code> is written on the card. The soup leaves it out and gets 2. Ben\'s shake is just for him, so it says <code>servings=1</code>. Press <b>Run</b>.',
          'Now add Ana\'s pasta bake for 4: <code>bake = Dish("pasta bake", 22, 4)</code>, and put <code>bake</code> in the list on line 10. Run it. Then try Chloe\'s rice pudding with a named jar: <code>Dish("rice pudding", 8, servings=4)</code>.',
          'The loop on line 10 goes over plates. Each <code>dish</code> is a whole Dish object, and the dot asks it for its labels.'
        ],
        tip: 'Parameters with a default go <b>after</b> the ones without, just like in lesson 46. <code>def __init__(self, name, servings=2, protein):</code> is a <code>SyntaxError</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Python counts self too. And __init__ hands back nothing.',
        text: [
          'Press <b>Run</b>. The pasta bake is fine. Then <code>Dish("pasta", 14, 2)</code> stops: <code>Dish.__init__() takes 3 positional arguments but 4 were given</code>. But you only gave 3. Python counts <code>self</code>, the one it passed for you. So in these messages, take 1 away from both numbers: the card wants 2 of yours, and you gave 3. This card has no jar for servings.',
          'Writing <code>def __init__(name, protein):</code> with no <code>self</code> trips the same count. Python still passes the new dish first, so it lands in <code>name</code>, and the call has one argument too many.',
          'And <code>__init__</code> must not <code>return</code> a value. It only <b>sets up</b> the new object. Python hands the object back to you by itself. Write <code>return self</code> and Python stops: <code>__init__() should return None, not \'Dish\'</code>.'
        ],
        warn: 'Next lesson, Methods, you give Dish more functions with <code>self</code>, like <code>scale(guests)</code>: things a dish can <b>do</b>, not only labels it knows.'
      }
    ],
    exercises: [
      {
        file: 'l67_guest_setup.py', title: 'Set up each guest',
        task: 'Kitchen Coach needs to know your three guests. Write a class <code>Guest</code> with an <code>__init__</code> that stores <b>name</b>, <b>goal</b> and <b>calories</b> on <code>self</code>, with <code>calories=2000</code> as the default. Then set up Ana (half-marathon, 2600), Ben (protein, the usual calories) and Chloe (gluten-free, <code>calories=1800</code>), one line each. The check also sets up guests you have never seen, so your class has to work for anyone.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. <code>__init__</code> only has <code>self</code> so far, and the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, add the parameters, then one <code>self.x = x</code> line for each. Then replace each <code>None</code> with a <code>Guest(...)</code> call.',
          'Run the file until it says <code>PASS</code>. If it says a guest has no attribute, look for a missing <code>self.</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'match', q: 'The card is <code>def __init__(self, name, protein):</code> and you call <code>Dish("protein shake", 30)</code>. What lands in each jar?',
        pairs: [
          ['self', 'the new Dish being set up'],
          ['name', '"protein shake"'],
          ['protein', '30']
        ],
        why: 'Your arguments fill the jars after <code>self</code>, in order. <code>self</code> gets the new, empty Dish, and Python passes it for you.',
        hint: 'Which jar do you never fill yourself?'
      },
      {
        type: 'fill', q: 'Finish the prep station so every Dish is set up with its name and protein.',
        text: 'class Dish:\n    def ___(self, name, protein):\n        ___.name = name\n        self.protein = protein',
        options: ['__init__', 'self', 'init', 'Dish', 'soup', 'return'],
        answer: ['__init__', 'self'],
        why: 'The method Python runs by itself is <code>__init__</code>, with two underscores on each side. Plain <code>init</code> is just a method nobody calls. Inside, <code>self</code> is the new dish, so <code>self.name</code> puts the label on it. <code>soup</code> does not exist yet while the dish is being set up.',
        hint: 'Two underscores on each side. And which name means "the dish being set up"?'
      },
      {
        type: 'fix', q: 'This stops with <code>AttributeError: \'Dish\' object has no attribute \'protein\'</code>. Fix the class so it prints <code>lentil soup 18</code>.',
        code: ['class Dish:', '    def __init__(self, name, protein):', '        self.name = name', '        protein = protein', '', 'soup = Dish("lentil soup", 18)', 'print(soup.name, soup.protein)'],
        title: 'soup.py',
        check: [
          'if out.strip() != "lentil soup 18":',
          '    msg = "It should print exactly: lentil soup 18"',
          'elif not hasattr(Dish("x", 1), "protein"):',
          '    msg = "Close. Make the class store protein on the new dish, so every Dish has it."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>protein = protein</code> only fills a jar inside <code>__init__</code>, and it is gone when the call ends (lesson 47). <code>self.protein = protein</code> puts the value on the new dish, where <code>soup.protein</code> can find it.',
        hint: 'Compare line 3 and line 4. What does line 4 miss?'
      },
      {
        type: 'fix', q: 'Chloe\'s rice pudding has 8 g protein. This stops with <code>TypeError: Dish.__init__() missing 1 required positional argument: \'protein\'</code>. Fix the call so it prints <code>rice pudding 8</code>. Leave the class as it is.',
        code: ['class Dish:', '    def __init__(self, name, protein):', '        self.name = name', '        self.protein = protein', '', 'pudding = Dish("rice pudding")', 'print(pudding.name, pudding.protein)'],
        title: 'pudding.py',
        check: [
          'import inspect',
          'jars = list(inspect.signature(Dish.__init__).parameters)',
          'if jars != ["self", "name", "protein"]:',
          '    msg = "Leave the class as it is. Fix the line that makes the pudding."',
          'elif out.strip() != "rice pudding 8":',
          '    msg = "It should print exactly: rice pudding 8"',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The error names the empty jar: <code>protein</code>. The station will not make a half-set-up dish, so the call must bring both values: <code>Dish("rice pudding", 8)</code>.',
        hint: 'The error tells you which jar is empty. Add that value to the call on line 6.'
      },
      {
        type: 'bucket', q: 'The card is <code>def __init__(self, name, protein, servings=2):</code>. Which calls make a dish, and which stop with an error?',
        buckets: ['Makes a dish', 'Stops with an error'],
        items: [
          ['Dish("soup", 18)', 0],
          ['Dish("soup", 18, 4)', 0],
          ['Dish("soup", 18, servings=4)', 0],
          ['Dish(name="soup", protein=18)', 0],
          ['Dish("soup")', 1],
          ['Dish()', 1],
          ['Dish("soup", 18, 4, 1)', 1],
          ['Dish(self, "soup", 18)', 1]
        ],
        why: '<code>name</code> and <code>protein</code> have no default, so every call needs them, by position or by name. <code>servings</code> can be left out. Four of your own arguments is one too many. And you never pass <code>self</code>: outside the class there is no <code>self</code>, so Python says <code>NameError: name \'self\' is not defined</code>.',
        hint: 'Count your own arguments. The card wants 2 or 3 of them.'
      },
      {
        type: 'pick', q: 'You call <code>Dish("pasta", 14, 2)</code> on a card with <code>def __init__(self, name, protein):</code>. Python says <code>takes 3 positional arguments but 4 were given</code>. You only gave 3. Why 4?',
        options: ['Python counts self, the new dish it passes in for you', 'The string "pasta" counts as 2 arguments', 'Python counts the brackets', 'Python made a mistake'],
        answer: 0,
        why: 'Python passes the new dish as <code>self</code> first, so it counts 1 more on both sides: 3 jars with self, 4 values with self. Take 1 off both: the card takes 2 of yours, and you gave 3. Add <code>servings</code> to the card, or leave the 2 out.',
        hint: 'Which argument does Python pass without you writing it?'
      },
      {
        type: 'order', q: 'Put in order what happens when Python runs <code>soup = Dish("lentil soup", 18)</code>.',
        items: [
          'Python makes a new, empty Dish',
          'Python calls __init__ with self = the new Dish, name = "lentil soup", protein = 18',
          'self.name = name puts the name on the new Dish',
          'self.protein = protein puts the protein on it',
          'The finished Dish is handed back and labelled soup'
        ],
        why: 'The object exists first, empty, so that <code>__init__</code> has something to set up. <code>__init__</code> fills it line by line. Only then does the <code>=</code> put the name <code>soup</code> on it.',
        hint: 'Something has to exist before it can be set up.'
      },
      {
        type: 'pick', q: 'Back to lesson 45. What does this print?',
        pic: code(['class Dish:', '    def __init__(self, name, protein):', '        self.name = name', '        self.protein = protein', '        print("set up", name)', '', 'soup = Dish("lentil soup", 18)', 'print(soup.protein)'], { title: 'quiet.py' }),
        options: ['set up lentil soup, then 18', 'only 18', 'only set up lentil soup', 'None'],
        answer: 0,
        why: 'Making the dish runs <code>__init__</code>, so its <code>print</code> runs first: <code>set up lentil soup</code>. <code>__init__</code> hands back nothing itself (lesson 45: no <code>return</code> means None), but Python hands back the new Dish anyway, so <code>soup.protein</code> is <code>18</code>.',
        hint: 'Does making the dish run __init__? And what does Dish(...) hand back?'
      }
    ]
  });
})();
