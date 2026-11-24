/* Lesson 101: The data model (module 9). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l101  The data model
     ===================================================================== */

  const MEAL = [
    'from dataclasses import dataclass',
    '',
    '',
    '@dataclass',
    'class Meal:',
    '    kcal: int',
    '    protein: int'
  ];
  const ADD = [
    '    def __add__(self, other):',
    '        if not isinstance(other, Meal):',
    '            return NotImplemented',
    '        return Meal(self.kcal + other.kcal, self.protein + other.protein)'
  ];
  const RADD = [
    '    def __radd__(self, other):',
    '        if other == 0:            # sum() starts with 0',
    '            return self',
    '        return NotImplemented'
  ];
  const DAY = [
    'breakfast = Meal(450, 15)     # oats, banana and milk',
    'lunch = Meal(700, 38)         # pasta with tuna',
    'snack = Meal(300, 8)          # toast with peanut butter'
  ];

  /* ---- The idea: the switchboard ---- */
  const plug = (x, y, syn, dun) =>
    box(x, y, 118, 34, P.white, 9) + T(x + 59, y + 23, syn, { s: 13, m: true }) +
    arrow(x + 124, y + 17, x + 158, y + 17, P.ink2, 2) +
    `<rect x="${x + 164}" y="${y}" width="118" height="34" rx="9" fill="${P.okT}" stroke="${P.ok}" stroke-width="2"/>` +
    T(x + 223, y + 23, dun, { s: 12.5, m: true, f: P.ok });
  const ideaSvg = svg(600, 300, 'The switchboard. Each piece of Python syntax on the left calls a dunder method on the right. len(x) calls __len__, a + b calls __add__, a == b calls __eq__, a < b calls __lt__, x[k] calls __getitem__, x in y calls __contains__, for x in y calls __iter__, if x: calls __bool__, with x: calls __enter__ and __exit__, and f() calls __call__.',
    T(150, 22, 'you write', { s: 12, w: 700, f: P.ink2 }) + T(450, 22, 'you write', { s: 12, w: 700, f: P.ink2 }) +
    T(232, 22, 'Python calls', { s: 12, w: 700, f: P.ok }) + T(532, 22, 'Python calls', { s: 12, w: 700, f: P.ok }) +
    plug(10, 36, 'len(x)', '__len__') + plug(308, 36, 'x in y', '__contains__') +
    plug(10, 84, 'a + b', '__add__') + plug(308, 84, 'for x in y', '__iter__') +
    plug(10, 132, 'a == b', '__eq__') + plug(308, 132, 'if x:', '__bool__') +
    plug(10, 180, 'a < b', '__lt__') + plug(308, 180, 'with x:', '__enter__') +
    plug(10, 228, 'x[k]', '__getitem__') + plug(308, 228, 'f()', '__call__') +
    T(300, 290, 'the syntax is the plug, the dunder method is the socket', { s: 12.5, w: 700, f: P.ink2 }));
  const plugs = [
    'print(3 + 4)',
    'print((3).__add__(4))         # the same question, asked by hand',
    '',
    'print(len("oats"))',
    'print("oats".__len__())',
    '',
    'shopping = ["oats", "rice"]',
    'print("rice" in shopping)',
    'print(shopping.__contains__("rice"))',
    'print(shopping + ["tofu"])',
    'print(shopping.__add__(["tofu"]))'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(plugs, { title: 'plugs.py' })}</div>`;

  /* ---- The code: Kitchen Coach's Meal ---- */
  const meals = [...MEAL, '', '', 'breakfast = Meal(450, 15)     # oats, banana and milk', 'lunch = Meal(700, 38)         # pasta with tuna', 'print(breakfast)', 'print(breakfast == Meal(450, 15))', 'print(breakfast.kcal + lunch.kcal, "kcal")'];

  /* ---- The pain: + and len() have no socket ---- */
  const painMeal = [...MEAL, '', '', 'breakfast = Meal(450, 15)     # oats, banana and milk', 'lunch = Meal(700, 38)         # pasta with tuna', 'print(breakfast + lunch)'];
  const pantryTerm = term([
    '$ python3 pantry.py',
    'Traceback (most recent call last):',
    '  File "/Users/ana/kitchen/pantry.py", line 7, in <module>',
    '    print(len(pantry), "items")',
    '          ~~~^^^^^^^^',
    "TypeError: object of type 'Pantry' has no len()"
  ], 'the pantry class, Python 3.15');
  const pantryBare = code([
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = grams',
    '',
    '',
    'pantry = Pantry({"oats": 400, "rice": 900, "lentils": 250})',
    'print(len(pantry), "items")'
  ], { title: 'pantry.py', bad: [7] });
  const painPic = `<div style="width:100%;min-width:0">${run(painMeal, { title: 'meals.py' })}${pantryBare}${pantryTerm}</div>`;

  /* ---- The fix: __add__, then __radd__ for sum() ---- */
  const withAdd = [...MEAL, '', ...ADD, '', '', ...DAY, 'print(breakfast + lunch)', 'print(breakfast + lunch + snack)', 'print(breakfast)'];
  const withRadd = [...MEAL, '', ...ADD, '', ...RADD, '', '', 'day = [Meal(450, 15), Meal(700, 38), Meal(300, 8)]', 'print((0).__add__(day[0]))    # the int is asked first', 'print(day[0].__radd__(0))     # then the meal is asked', 'print(sum(day))'];
  const step = (y, txt, ans, col, colT) =>
    box(20, y, 380, 44, P.white, 10) + T(210, y + 28, txt, { s: 13, m: true }) +
    arrow(406, y + 22, 436, y + 22, P.ink2, 2) +
    `<rect x="442" y="${y}" width="140" height="44" rx="10" fill="${colT}" stroke="${col}" stroke-width="2"/>` + T(512, y + 28, ans, { s: 12.5, m: true, f: col });
  const chainSvg = svg(600, 290, 'How sum(day) adds three meals. sum starts with 0. Step 1: 0 + breakfast asks the int first: int.__add__ gives NotImplemented. Step 2: Python turns around and asks the meal: breakfast.__radd__(0) gives breakfast. Step 3: breakfast + lunch calls Meal.__add__ and gives Meal(1150, 53). Step 4: that + snack gives Meal(1450, 61).',
    T(300, 20, 'sum(day) starts with 0, then adds each meal', { s: 13, w: 800 }) +
    step(36, '0 + breakfast:  (0).__add__(...)', 'NotImplemented', P.danger, P.dangerT) +
    step(96, 'turn around:  breakfast.__radd__(0)', 'breakfast', P.ok, P.okT) +
    step(156, 'breakfast + lunch:  __add__', 'Meal(1150, 53)', P.ok, P.okT) +
    step(216, '... + snack:  __add__', 'Meal(1450, 61)', P.ok, P.okT) +
    T(300, 284, 'without __radd__, step 2 fails: unsupported operand type(s) for +: \'int\' and \'Meal\'', { s: 11.5, w: 700, f: P.danger }));
  const fixPic = `<div style="width:100%;min-width:0">${run(withAdd, { title: 'meals.py' })}${chainSvg}${run(withRadd, { title: 'whole_day.py' })}</div>`;

  /* ---- Try it: the pantry, and sorting meals ---- */
  const pantry = [
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = grams        # a dict: item -> grams',
    '',
    '    def __len__(self):',
    '        return len(self.grams)',
    '',
    '    def __contains__(self, item):',
    '        return item in self.grams',
    '',
    '    def __getitem__(self, item):',
    '        return self.grams[item]',
    '',
    '    def __iter__(self):',
    '        return iter(self.grams)',
    '',
    '    def __bool__(self):',
    '        return len(self.grams) > 0',
    '',
    '',
    'pantry = Pantry({"oats": 400, "rice": 900, "lentils": 250})',
    'print(len(pantry), "items")',
    'print("oats" in pantry, "flour" in pantry)',
    'print(pantry["rice"], "g rice")',
    'for item in pantry:',
    '    print("-", item)',
    '',
    'for shelf in [pantry, Pantry({})]:',
    '    if shelf:',
    '        print("Something to cook")',
    '    else:',
    '        print("Empty: shopping time")'
  ];
  const order = [
    'from dataclasses import dataclass',
    'from functools import total_ordering',
    '',
    '',
    '@total_ordering',
    '@dataclass',
    'class Meal:',
    '    kcal: int',
    '    protein: int',
    '',
    '    def __lt__(self, other):',
    '        return self.protein < other.protein',
    '',
    '',
    'day = [Meal(700, 38), Meal(450, 15), Meal(520, 9)]',
    'print(sorted(day))',
    'print(max(day))',
    'print(Meal(450, 15) >= Meal(300, 8))'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(pantry, { title: 'pantry.py' })}${run(order, { title: 'most_protein.py' })}</div>`;

  /* ---- The catch: __eq__ takes away __hash__ ---- */
  const unhash = [...MEAL, '', '', 'breakfast = Meal(450, 15)', 'print(breakfast == Meal(450, 15))', 'eaten = {breakfast, Meal(450, 15)}', 'print(eaten)'];
  const surprise = code([
    'class Pantry:',
    '    ...',
    '    def __sub__(self, item):          # pantry - "oats"',
    '        del self.grams[item]          # quietly throws food away',
    '        send_shopping_email(item)     # and emails Ana'
  ], { title: 'surprise.py', bad: [3, 4, 5] });
  const catchPic = `<div style="width:100%;min-width:0">${run(unhash, { title: 'eaten.py' })}${surprise}</div>`;

  COURSE.add({
    id: 'l101', minutes: 15,
    summary: 'Python\'s syntax is a set of <b>plugs</b>, and the <b>data model</b> is the list of sockets. <code>len(x)</code> calls <code>x.__len__()</code>, <code>a + b</code> calls <code>a.__add__(b)</code>, <code>==</code> calls <code>__eq__</code>, <code>&lt;</code> calls <code>__lt__</code>, <code>x[k]</code> calls <code>__getitem__</code>, <code>in</code> calls <code>__contains__</code>, <code>for</code> calls <code>__iter__</code>, <code>if x:</code> calls <code>__bool__</code> (or <code>__len__</code>), <code>with</code> calls <code>__enter__</code> and <code>__exit__</code>, and <code>f()</code> calls <code>__call__</code>. Numbers, text and lists work because they have these methods. Your own class has none, so <code>breakfast + lunch</code> stops with <code>TypeError: unsupported operand type(s) for +: \'Meal\' and \'Meal\'</code>. Write <code>__add__</code> and return a <b>new</b> Meal. When it gets something it does not understand, it should <code>return NotImplemented</code>, not raise. That tells Python to <b>ask the other side</b>: <code>sum(day)</code> starts with 0, <code>int.__add__</code> answers NotImplemented, and Python calls <code>breakfast.__radd__(0)</code>. Give <code>Pantry</code> <code>__len__</code>, <code>__contains__</code>, <code>__getitem__</code>, <code>__iter__</code> and <code>__bool__</code>, and <code>len</code>, <code>in</code>, <code>[]</code>, <code>for</code> and <code>if</code> all work on it. <code>@total_ordering</code> builds <code>&lt;=</code>, <code>&gt;</code> and <code>&gt;=</code> from one <code>__lt__</code>. The catch: writing <code>__eq__</code> (or <code>@dataclass</code> writing it) removes <code>__hash__</code>, so a Meal cannot go in a set. And make <code>+</code> feel like adding.',
    video: {
      src: 'videos/l101-the-data-model.mp4', poster: 'videos/l101-the-data-model.jpg', length: '1 min 13 s',
      script: [
        'Kitchen Coach adds up Ana\'s meals. Breakfast: 450 calories, 15 grams of protein. Lunch: 700 calories, 38 grams. Breakfast plus lunch.',
        'Type error! Python does not know what plus means for a meal.',
        'Python\'s syntax is a switchboard. Len, plus, equals, in, square brackets, for. Each one is a cable, and each cable needs a socket on your class: a dunder method. Plus looks for dunder add. That socket is empty.',
        'So write dunder add. Return a new meal, with the calories added and the protein added. Plug it in. Breakfast plus lunch: 1150 calories, 53 grams.',
        'Now add up the whole day with sum. Error again! Sum starts at 0, and 0 plus a meal asks the int first. The int answers: not implemented. So Python turns around and asks the meal, with dunder r add. Write it, and the day adds up: 1450 calories.',
        'Python\'s syntax is a set of plugs. Write the dunder, and your object fits.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every piece of syntax calls a dunder method.',
        text: [
          'Lesson 72 showed four hooks: <code>print</code> calls <code>__str__</code>, a list shows <code>__repr__</code>, <code>==</code> calls <code>__eq__</code> and <code>len()</code> calls <code>__len__</code>. That was not a special trick for four functions. It is how <b>all</b> of Python\'s syntax works.',
          'Think of a <b>switchboard</b>. The syntax you write is the <b>plug</b>: <code>a + b</code>, <code>len(x)</code>, <code>x[k]</code>, <code>for</code>. The dunder method is the <b>socket</b> on the object: <code>__add__</code>, <code>__len__</code>, <code>__getitem__</code>, <code>__iter__</code>. When you write <code>a + b</code>, Python really asks <code>a.__add__(b)</code>. Python\'s documentation calls this list of sockets the <b>data model</b>.',
          'Press <b>Run</b>. <code>3 + 4</code> and <code>(3).__add__(4)</code> both print <code>7</code>. The brackets around <code>3</code> are there because <code>3.</code> would look like the start of <code>3.5</code>. Numbers, text and lists all have these sockets, which is why <code>+</code> adds numbers but <b>joins</b> lists: each type answers the same question in its own way. Lesson 96 showed the line cook\'s step <code>BINARY_OP (+)</code>. This is what it does: it asks the left value for <code>__add__</code>.'
        ],
        tip: 'You never call <code>__add__</code> yourself in real code. Write <code>a + b</code>. The dunder calls in this box only show what Python does for you.'
      },
      {
        label: 'The code', pic: run(meals, { title: 'meals.py' }),
        h: 'Kitchen Coach counts Ana\'s meals.',
        text: [
          'Ana is training for a half-marathon, so Kitchen Coach keeps each meal as a <code>Meal</code> with its calories and its grams of protein. It is a dataclass (lesson 73): two fields, and <code>@dataclass</code> writes <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> for you. Press <b>Run</b>.',
          'Three sockets are already filled. <code>Meal(450, 15)</code> uses <code>__init__</code>. <code>print(breakfast)</code> shows <code>Meal(kcal=450, protein=15)</code> through <code>__repr__</code>. <code>breakfast == Meal(450, 15)</code> is <code>True</code> through <code>__eq__</code>.',
          'Adding works too, but only by hand: <code>breakfast.kcal + lunch.kcal</code> gives <code>1150 kcal</code>. Every place that needs a total would repeat this for each field. Kitchen Coach wants to write <code>breakfast + lunch</code>, like plain numbers.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Your class has empty sockets.',
        text: [
          'Press <b>Run</b>. <code>print(breakfast + lunch)</code> stops with <code>TypeError: unsupported operand type(s) for +: \'Meal\' and \'Meal\'</code>. An <b>operand</b> is a value on either side of <code>+</code>. Python asked <code>breakfast</code> for <code>__add__</code>, found no such method, and gave up.',
          'The pantry has the same problem. Kitchen Coach keeps it in a small class around a dict of grams. <code>len(pantry)</code> stops with <code>TypeError: object of type \'Pantry\' has no len()</code>. <code>"oats" in pantry</code> says <code>argument of type \'Pantry\' is not a container or iterable</code>, and <code>pantry["oats"]</code> says <code>\'Pantry\' object is not subscriptable</code>.',
          'Each message names the plug that found no socket: <code>+</code>, <code>len()</code>, <code>in</code>, <code>[]</code>. Read them as "this object has no socket for that". Python is not broken. Your class just has not said what these mean yet.'
        ],
        warn: 'There is one surprise: <code>if pantry:</code> does <b>not</b> fail. An object with no <code>__bool__</code> and no <code>__len__</code> always counts as <b>true</b>, even an empty pantry. That bug is silent. The Try it part fixes it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: '__add__, and __radd__ for sum().',
        text: [
          '<code>__add__(self, other)</code> gets the meal on the left as <code>self</code> and the value on the right as <code>other</code>. It <b>returns a new Meal</b> with both fields added. Press <b>Run</b> on <code>meals.py</code>: <code>Meal(kcal=1150, protein=53)</code>, then <code>Meal(kcal=1450, protein=61)</code> for all three. <code>breakfast</code> itself stays <code>450</code>: <code>+</code> makes something new, like <code>3 + 4</code> does not change the 3.',
          'If <code>other</code> is not a Meal, <code>__add__</code> does <code>return NotImplemented</code>. That is a special value, not an error. It means "I do not know how to add that, ask the other side". Then Python tries the <b>reflected</b> method on the right value: <code>other.__radd__(self)</code>, "r" for right. Only when both sides say NotImplemented does Python raise the <code>TypeError</code>.',
          'That matters for <code>sum()</code>. <code>sum(day)</code> starts with <code>0</code> and adds each meal to it, so its first step is <code>0 + breakfast</code>. The int is asked first and answers NotImplemented (the second box prints it). Python turns around and calls <code>breakfast.__radd__(0)</code>. Our <code>__radd__</code> says: adding a meal to 0 gives the meal. Press <b>Run</b> on <code>whole_day.py</code>: <code>Meal(kcal=1450, protein=61)</code>. Now delete the four <code>__radd__</code> lines, and the line that calls <code>day[0].__radd__(0)</code> by hand, and run again: <code>unsupported operand type(s) for +: \'int\' and \'Meal\'</code>.'
        ],
        tip: 'No <code>__radd__</code>? Give <code>sum</code> a Meal to start from instead of 0: <code>sum(day, start=Meal(0, 0))</code>. Then every step is Meal + Meal.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'A pantry that len, in, [], for and if understand.',
        text: [
          'Each socket in <code>pantry.py</code> is two lines, and each one just asks the dict inside. <code>__len__</code> returns how many items. <code>__contains__(self, item)</code> answers <code>in</code>. <code>__getitem__(self, item)</code> answers <code>pantry["rice"]</code>. <code>__iter__</code> hands back a waiter, <code>iter(self.grams)</code>, exactly like lesson 82. <code>__bool__</code> answers <code>if pantry:</code> with <code>True</code> or <code>False</code>. Press <b>Run</b>: the empty pantry now says <code>Empty: shopping time</code>.',
          'Now delete the two <code>__bool__</code> lines and run it again. Same answers. With no <code>__bool__</code>, Python falls back to <code>__len__</code>: length 0 counts as false, just like an empty list (lesson 23). Python has more fallbacks like this: with no <code>__contains__</code>, <code>in</code> loops through <code>__iter__</code>.',
          'Ben wants his meals by protein. <code>sorted()</code>, <code>min()</code> and <code>max()</code> compare with <code>&lt;</code>, so they need <code>__lt__</code>. Write that one method and put <code>@total_ordering</code> from <code>functools</code> on the class (a decorator, lesson 84): it builds <code>&lt;=</code>, <code>&gt;</code> and <code>&gt;=</code> from your <code>&lt;</code> and <code>==</code>. Run <code>most_protein.py</code>. Then change <code>self.protein &lt; other.protein</code> to compare <code>kcal</code>, and the order changes.'
        ],
        tip: 'Two more sockets you already used. <code>with</code> calls <code>__enter__</code> and <code>__exit__</code> (lesson 85). And <code>f()</code> calls <code>__call__</code>: a function is simply an object with that socket. Give a class <code>def __call__(self):</code> and its objects can be called like functions. You rarely need that.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: '__eq__ takes away the fingerprint.',
        text: [
          'Kitchen Coach wants the set of meals Ana has eaten (lesson 39). Press <b>Run</b>. <code>==</code> works, then line 12 stops: <code>TypeError: cannot use \'Meal\' as a set element (unhashable type: \'Meal\')</code>.',
          'A set and a dict key need a <b>fingerprint</b>, the <code>__hash__</code> from lesson 40, and two equal things must have the same fingerprint. The default fingerprint belongs to the <b>object</b>, not its values. So as soon as a class gets its own <code>__eq__</code>, Python <b>removes</b> <code>__hash__</code>, so equal meals cannot get different fingerprints. <code>@dataclass</code> wrote <code>__eq__</code>, so Meal lost its hash. The same happens when you write <code>__eq__</code> by hand.',
          'The fix for a value that should never change: <code>@dataclass(frozen=True)</code>. Change line 4 and run it again: <code>{Meal(kcal=450, protein=15)}</code>, one meal, because the two are equal. A frozen Meal cannot change, so its fingerprint is safe, and our <code>__add__</code> returns new meals anyway. A hand-written class can add <code>def __hash__(self): return hash((self.kcal, self.protein))</code>, but only if those fields never change.'
        ],
        warn: '<b>Make <code>+</code> feel like adding.</b> A socket can run any code, so <code>pantry - "oats"</code> <i>could</i> throw food away and send an email. Nobody reading <code>pantry - "oats"</code> expects that. Write a dunder only when the syntax already means that in plain words: <code>+</code> combines, <code>len</code> counts, <code>in</code> asks. For anything else, write a method with a clear name, like <code>pantry.use("oats", 80)</code>.'
      }
    ],
    exercises: [
      {
        file: 'l101_pantry_protocol.py', title: 'The pantry protocol',
        task: 'Kitchen Coach\'s <code>Pantry</code> keeps a dict of grams, but <code>len(pantry)</code>, <code>"oats" in pantry</code> and <code>pantry["oats"]</code> all stop with a <code>TypeError</code>. Give the class five dunder methods: <code>__len__</code>, <code>__contains__</code>, <code>__getitem__</code>, <code>__iter__</code> and <code>__bool__</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The check says HINT 1: <code>len(pantry)</code> needs a socket.',
          'Between <code>START</code> and <code>END</code>, write one method at a time inside the class. Each one only asks <code>self.grams</code>. Run the file after each one: the hint moves on to the next socket.',
          'Run it until it says <code>PASS</code>. The check also tries an empty pantry, so <code>__bool__</code> must say <code>False</code> when there is nothing in it.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Meal has <code>__add__</code>. What does Python call first for this line?',
        pic: code(['total = breakfast + lunch'], { title: 'coach.py' }),
        options: ['breakfast.__add__(lunch)', 'lunch.__add__(breakfast)', 'breakfast.__radd__(lunch)', 'Meal.add(breakfast, lunch)'],
        answer: 0,
        why: 'Python asks the value on the <b>left</b> first: <code>breakfast.__add__(lunch)</code>. Only if that returns <code>NotImplemented</code> does it try the right value\'s <code>__radd__</code>.',
        hint: 'Which side does Python ask first?'
      },
      {
        type: 'match', q: 'Match the syntax to the dunder method Python calls.',
        pairs: [
          ['len(pantry)', '__len__'],
          ['"oats" in pantry', '__contains__'],
          ['pantry["oats"]', '__getitem__'],
          ['for item in pantry:', '__iter__'],
          ['if pantry:', '__bool__'],
          ['a < b', '__lt__']
        ],
        why: 'Each plug has its socket: <code>len</code> asks <code>__len__</code>, <code>in</code> asks <code>__contains__</code>, square brackets ask <code>__getitem__</code>, a loop asks <code>__iter__</code>, <code>if</code> asks <code>__bool__</code> and <code>&lt;</code> asks <code>__lt__</code>.',
        hint: 'Square brackets "get an item".'
      },
      {
        type: 'fix', q: '<code>sum(day)</code> stops with a <code>TypeError</code>. Make the program print <code>Meal(kcal=1450, protein=61)</code>.',
        code: [...MEAL, '', ...ADD, '', '', 'day = [Meal(450, 15), Meal(700, 38), Meal(300, 8)]', 'print(sum(day))'], title: 'whole_day.py',
        check: [
          'if out.strip() == "Meal(kcal=1450, protein=61)":',
          '    ok = True',
          'elif "\'int\' and \'Meal\'" in out:',
          '    msg = "sum() still starts with 0 + meal. Write __radd__ in the class, or give sum a start Meal."',
          'else:',
          '    msg = "It should print exactly: Meal(kcal=1450, protein=61)"'
        ].join('\n'),
        why: '<code>sum</code> starts with <code>0 + Meal(450, 15)</code>. The int answers NotImplemented, so Python calls the meal\'s <code>__radd__(0)</code>. Return <code>self</code> when <code>other == 0</code>. Or skip the 0: <code>sum(day, start=Meal(0, 0))</code>.',
        hint: 'def __radd__(self, other): inside the class. If other == 0, return self.'
      },
      {
        type: 'order', q: 'Put in order what Python does for <code>sum([breakfast, lunch])</code> when Meal has <code>__add__</code> and <code>__radd__</code>.',
        items: [
          'Start with 0 and try 0 + breakfast: ask (0).__add__(breakfast)',
          'The int returns NotImplemented',
          'Turn around: call breakfast.__radd__(0), which returns breakfast',
          'Add the next meal: breakfast.__add__(lunch)',
          'Return Meal(kcal=1150, protein=53)'
        ],
        why: 'The left value is always asked first. <code>NotImplemented</code> means "ask the other side", so Python calls the right value\'s <code>__radd__</code>. After that first step, every step is Meal + Meal.',
        hint: 'sum begins with the number 0.'
      },
      {
        type: 'pick', q: 'Someone writes <code>breakfast + 5</code>. What should <code>Meal.__add__</code> do when <code>other</code> is not a Meal?',
        options: ['return NotImplemented', 'raise TypeError("not a meal")', 'return None', 'return self'],
        answer: 0,
        why: '<code>return NotImplemented</code> lets Python ask the other side (<code>(5).__radd__</code>), and if nobody knows, Python raises its own clear <code>TypeError: unsupported operand type(s) for +: \'Meal\' and \'int\'</code>. Raising yourself skips the other side. <code>None</code> or <code>self</code> would hide the mistake.',
        hint: 'One answer is a special value that means "ask the other side".'
      },
      {
        type: 'pick', q: 'What happens when this runs?',
        pic: code([...MEAL, '', 'eaten = {Meal(450, 15), Meal(700, 38)}', 'print(len(eaten))'], { title: 'eaten.py' }),
        options: ["TypeError: cannot use 'Meal' as a set element (unhashable type: 'Meal')", 'It prints 2', 'It prints 1', "AttributeError: 'Meal' object has no attribute '__hash__'"],
        answer: 0,
        why: '<code>@dataclass</code> writes <code>__eq__</code>, and a class with its own <code>__eq__</code> loses <code>__hash__</code>. A set needs a hash for each item. <code>@dataclass(frozen=True)</code> gives it back.',
        hint: 'What does a set need from each item (lesson 40)?'
      },
      {
        type: 'fix', q: 'The empty pantry says <code>Something to cook</code>. Add one method so the program prints <code>Something to cook</code> and then <code>Shopping time</code>.',
        code: ['class Pantry:', '    def __init__(self, grams):', '        self.grams = grams', '', '', 'for shelf in [Pantry({"oats": 400}), Pantry({})]:', '    if shelf:', '        print("Something to cook")', '    else:', '        print("Shopping time")'], title: 'shelves.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["Something to cook", "Shopping time"]:',
          '    ok = True',
          'elif lines == ["Something to cook", "Something to cook"]:',
          '    msg = "Both still count as true. Give the class __bool__ (or __len__) that looks at self.grams."',
          'elif "should return bool" in out:',
          '    msg = "__bool__ must return True or False. Compare: len(self.grams) > 0"',
          'else:',
          '    msg = "It should print Something to cook, then Shopping time."'
        ].join('\n'),
        why: 'With no <code>__bool__</code> and no <code>__len__</code>, every object is true. <code>def __bool__(self): return len(self.grams) &gt; 0</code> answers <code>if</code>. <code>def __len__(self): return len(self.grams)</code> works too, because <code>if</code> falls back to the length.',
        hint: 'def __bool__(self): inside the class, returning len(self.grams) > 0.'
      },
      {
        type: 'pick', q: 'Back to lesson 82. Pantry has <code>__iter__</code>. What does <code>for item in pantry:</code> do first?',
        options: ['Calls iter(pantry) once, which calls pantry.__iter__()', 'Calls pantry.__getitem__(0)', 'Calls len(pantry) to know how many rounds', 'Calls next(pantry) right away'],
        answer: 0,
        why: 'A <code>for</code> loop calls <code>iter()</code> once to get a waiter, and <code>iter()</code> asks the object\'s <code>__iter__</code>. Then it calls <code>next()</code> on that waiter until <code>StopIteration</code>.',
        hint: 'Lesson 82: a waiter is sent first.'
      }
    ]
  });
})();
