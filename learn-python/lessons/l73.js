/* Lesson 73: Dataclasses (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l73  Dataclasses
     ===================================================================== */

  /* ---- The idea: list the fields, get the boring methods for free ---- */
  const line = (x, y, txt, f) => T(x, y, txt, { s: 11, m: true, a: 'start', f: f || P.ink });
  const shelfCard = (y, nm, cap) =>
    `<rect x="440" y="${y}" width="144" height="58" rx="10" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(512, y + 25, nm, { s: 13, m: true, f: P.accent }) + T(512, y + 46, cap, { s: 11, w: 700, f: P.ink2 });
  const ideaPic = svg(600, 300, 'Left: a Dish class written by hand, 12 lines. The word protein is typed 6 times: 3 in __init__, 1 in __repr__ and 2 in __eq__. Middle: the same class with @dataclass, 5 lines: name: str, protein: int, servings: int = 2. Right: a shelf, free with @dataclass, holding __init__ (the setup), __repr__ (the printout) and __eq__ (the == check).',
    box(12, 12, 222, 276, P.white, 14) +
    T(123, 34, 'by hand: 12 lines', { s: 12.5, f: P.danger }) +
    line(24, 58, 'class Dish:') +
    line(24, 76, '  def __init__(self, name,') + line(24, 92, '      protein, servings=2):', P.danger) +
    line(24, 110, '    self.name = name') + line(24, 128, '    self.protein = protein', P.danger) +
    line(24, 146, '    self.servings = servings') +
    line(24, 170, '  def __repr__(self):') + line(24, 188, '    return f"Dish(...protein...)"', P.danger) +
    line(24, 212, '  def __eq__(self, other):') + line(24, 230, '    return (...protein ==', P.danger) + line(24, 248, '            other.protein...)', P.danger) +
    T(123, 276, '"protein" typed 6 times', { s: 11.5, w: 800, f: P.danger }) +
    arrow(240, 150, 262, 150, P.ink2, 2.5) +
    box(266, 70, 156, 160, P.okT, 14) +
    T(344, 94, '@dataclass: 5 lines', { s: 11.5, f: P.ok }) +
    line(278, 120, '@dataclass', P.danger) + line(278, 140, 'class Dish:') +
    line(278, 160, '  name: str') + line(278, 180, '  protein: int') + line(278, 200, '  servings: int = 2') +
    arrow(426, 150, 436, 150, P.ink2, 2.5) +
    T(512, 40, 'free with @dataclass', { s: 12, w: 800 }) +
    shelfCard(56, '__init__', 'the setup') + shelfCard(128, '__repr__', 'the printout') + shelfCard(200, '__eq__', 'the == check') +
    T(512, 282, 'you list the fields', { s: 12, w: 800, f: P.ok }));
  const ideaCode = [
    'from dataclasses import dataclass',
    '',
    '@dataclass',
    'class Dish:',
    '    name: str',
    '    protein: int',
    '    servings: int = 2',
    '',
    'soup = Dish("lentil soup", 18)',
    'print(soup)',
    'print(soup.name, soup.protein, soup.servings)',
    'print(soup == Dish("lentil soup", 18))'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(ideaCode, { title: 'dish.py' })}</div>`;

  /* ---- The code: every line, plus a method ---- */
  const dishCode = [
    'from dataclasses import dataclass',
    '',
    '@dataclass',
    'class Dish:',
    '    name: str',
    '    protein: int                   # grams for the whole pot',
    '    servings: int = 2',
    '',
    '    def protein_per_plate(self):',
    '        return self.protein / self.servings',
    '',
    'soup = Dish("lentil soup", 18)',
    'stir_fry = Dish("tofu stir-fry", 60, servings=3)',
    'menu = [soup, stir_fry]',
    'print(menu)',
    'print(stir_fry.protein_per_plate())',
    'soup.servings = 3                  # still an ordinary object',
    'print(soup)'
  ];
  const readSvg = svg(600, 120, 'How to read one field line. protein is the name of the field. The colon and int are a type hint: a label saying what should go in the jar, here a whole number. Python does not check it. = 2 on servings is a default, used when you leave it out.',
    T(300, 26, 'servings: int = 2', { s: 20, m: true }) +
    arrow(232, 38, 150, 74, P.accent, 2.5) + arrow(300, 38, 300, 74, P.warn, 2.5) + arrow(368, 38, 450, 74, P.ok, 2.5) +
    T(130, 94, 'the field name', { s: 12.5, w: 800, f: P.accent }) + T(130, 112, 'becomes self.servings', { s: 11, w: 700, f: P.ink2 }) +
    T(300, 94, 'a type hint', { s: 12.5, w: 800, f: P.warn }) + T(300, 112, 'a label, not checked', { s: 11, w: 700, f: P.ink2 }) +
    T(470, 94, 'a default', { s: 12.5, w: 800, f: P.ok }) + T(470, 112, 'used if you leave it out', { s: 11, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${readSvg}${run(dishCode, { title: 'menu.py' })}</div>`;

  /* ---- The pain: a hand-written Meal record that was not updated ---- */
  const handMeal = [
    'class Meal:',
    '    def __init__(self, guest, dish, calories, protein, gluten_free):',
    '        self.guest = guest',
    '        self.dish = dish',
    '        self.calories = calories',
    '        self.protein = protein',
    '        self.gluten_free = gluten_free     # added last week',
    '',
    '    def __repr__(self):',
    '        return f"Meal({self.guest}, {self.dish}, {self.calories}, {self.protein})"',
    '',
    '    def __eq__(self, other):',
    '        return (self.guest, self.dish, self.calories, self.protein) == (',
    '            other.guest, other.dish, other.calories, other.protein)',
    '',
    'plan = Meal("Chloe", "pasta", 650, 22, True)      # gluten-free pasta',
    'served = Meal("Chloe", "pasta", 650, 22, False)   # ordinary wheat pasta',
    'print(served)',
    'print("Matches the plan?", served == plan)'
  ];
  const countSvg = svg(600, 120, 'Where each field name is typed in the hand-written Meal class. In __init__: 3 times (the parameter, self dot name, and the value). In __repr__: once. In __eq__: twice. gluten_free was added to __init__ but not to __repr__ or __eq__. Missed, missed.',
    box(12, 14, 180, 92, P.okT, 12) + T(102, 40, '__init__', { s: 14, m: true, f: P.ok }) + T(102, 66, 'gluten_free: 3 times', { s: 12, w: 800 }) + T(102, 90, 'updated', { s: 12, w: 800, f: P.ok }) +
    box(210, 14, 180, 92, P.dangerT, 12) + T(300, 40, '__repr__', { s: 14, m: true, f: P.danger }) + T(300, 66, 'gluten_free: 0 times', { s: 12, w: 800 }) + T(300, 90, 'MISSED', { s: 13, w: 800, f: P.danger }) +
    box(408, 14, 180, 92, P.dangerT, 12) + T(498, 40, '__eq__', { s: 14, m: true, f: P.danger }) + T(498, 66, 'gluten_free: 0 times', { s: 12, w: 800 }) + T(498, 90, 'MISSED', { s: 13, w: 800, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(handMeal, { title: 'meal.py' })}${countSvg}</div>`;

  /* ---- The fix: the same record as a dataclass ---- */
  const dcMeal = [
    'from dataclasses import dataclass',
    '',
    '@dataclass',
    'class Meal:',
    '    guest: str',
    '    dish: str',
    '    calories: int',
    '    protein: int',
    '    gluten_free: bool',
    '',
    'plan = Meal("Chloe", "pasta", 650, 22, True)      # gluten-free pasta',
    'served = Meal("Chloe", "pasta", 650, 22, False)   # ordinary wheat pasta',
    'print(served)',
    'print("Matches the plan?", served == plan)'
  ];

  /* ---- Try it: Kitchen Coach's meal records for all three guests ---- */
  const tonight = [
    'from dataclasses import dataclass',
    '',
    '@dataclass',
    'class Meal:',
    '    guest: str',
    '    dish: str',
    '    calories: int',
    '    protein: int',
    '    gluten_free: bool = False',
    '',
    'meals = [',
    '    Meal("Ana", "pasta with chicken", 750, 40),',
    '    Meal("Ben", "tofu stir-fry", 620, 35),',
    '    Meal("Chloe", "salmon rice bowl", 680, 38, gluten_free=True),',
    ']',
    'for meal in meals:',
    '    print(meal)',
    '',
    'total = 0',
    'for meal in meals:',
    '    total += meal.protein',
    'print("Protein tonight:", total, "g")'
  ];
  const orderTerm = term([
    '$ python3 meals.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/meals.py", line 3, in <module>',
    '    @dataclass',
    '     ^^^^^^^^^',
    '  (17 more lines from inside dataclasses.py, cut here)',
    "TypeError: non-default argument 'calories' follows default argument 'minutes'"
  ], 'minutes: int = 20 moved above calories, terminal, Python 3.15');
  const tryPic = `<div style="width:100%;min-width:0">${run(tonight, { title: 'tonight.py' })}${orderTerm}</div>`;

  /* ---- The catch: a list as a default ---- */
  const allergies = [
    'from dataclasses import dataclass, field',
    '',
    '@dataclass',
    'class Guest:',
    '    name: str',
    '    calories: int',
    '    allergies: list = []          # one list for every guest?',
    '',
    'ana = Guest("Ana", 2600)',
    'chloe = Guest("Chloe", 1800)',
    'chloe.allergies.append("gluten")',
    'print(ana)',
    'print(chloe)'
  ];
  const goodGuest = code([
    '    allergies: list = field(default_factory=list)',
    '',
    '# Guest(name=\'Ana\', calories=2600, allergies=[])',
    '# Guest(name=\'Chloe\', calories=1800, allergies=[\'gluten\'])'
  ], { title: 'the fixed line, and what it prints', good: [1] });
  const catchPic = `<div style="width:100%;min-width:0">${run(allergies, { title: 'guests.py' })}${goodGuest}</div>`;

  COURSE.add({
    id: 'l73', minutes: 13,
    summary: 'Hand-written classes are mostly <b>boring typing</b>. Each field name goes in <code>__init__</code> three times (the parameter, <code>self.protein</code>, and the value), then again in <code>__repr__</code> and <code>__eq__</code>. Add a field, miss one place, and print or <code>==</code> goes quietly wrong. A <b>dataclass</b> fixes that. Write <code>from dataclasses import dataclass</code>, put <code>@dataclass</code> on the line above the class (a <b>decorator</b>, lesson 84), and <b>just list the fields</b>: <code>name: str</code>, <code>protein: int</code>, <code>servings: int = 2</code>. You get <code>__init__</code>, a clear <code>__repr__</code> like <code>Dish(name=\'lentil soup\', protein=18, servings=2)</code> and an <code>__eq__</code> that compares <b>every</b> field, for free. Methods still work. <code>: str</code> is a type hint, a label Python does <b>not</b> check (lesson 90). Two rules: fields with a default come <b>after</b> fields without one, and a list default must be <code>field(default_factory=list)</code>, so each object gets <b>its own new list</b>. <code>allergies: list = []</code> stops with <code>ValueError: mutable default</code>, which saves you from the shared-list trap of lesson 69.',
    video: {
      src: 'videos/l73-dataclasses.mp4', poster: 'videos/l73-dataclasses.jpg', length: '1 min 12 s',
      script: [
        'Kitchen Coach keeps a record for every dish. Here is the class, written by hand.',
        'Count the word protein. 1, 2, 3, in the setup. Once more in the printout. And twice in the equals check. 6 times, for one field.',
        'Add a field, and you must update every place. Miss one, and print or equals goes quietly wrong.',
        'Now the same class as a dataclass. Just list the fields. Name, protein, and servings, with a default of 2.',
        'The line with the at sign is a decorator. It writes the setup, the printout and the equals check for you.',
        'Print a dish. A clear record, every field named.',
        'One catch. Give it a list. Allergens equals an empty list. Python refuses, with a value error. A shared list would leak, like Chloe\'s gluten in lesson 69.',
        'Use field, with a default factory of list. Now each dish gets its own list.',
        'Dataclass writes the boring parts. You list the fields.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'List the fields. Get the boring parts free.',
        text: [
          'Kitchen Coach keeps a <b>record</b> for every dish and every guest. A record is a class that mostly <b>holds data</b>: a name, some grams, a few numbers. Since lesson 67 you write an <code>__init__</code> for that, and in lesson 72 you added <code>__repr__</code> for printing and <code>__eq__</code> for <code>==</code>.',
          'Look how often the word <code>protein</code> is typed in the picture: <b>6 times</b>, for one field. Most of that class is the same names, typed again and again.',
          'A <b>dataclass</b> is a class where you only <b>list the fields</b>. Python writes <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> for you. Press <b>Run</b> on <b>dish.py</b>: <code>Dish("lentil soup", 18)</code> works, <code>print</code> shows every field by name, and two dishes with the same values are <code>==</code>.'
        ],
        tip: 'A dataclass is still a normal class. Everything from lessons 66 to 72 still works on it: dots, methods, changing attributes.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Read a dataclass line by line.',
        text: [
          '<code>from dataclasses import dataclass</code> takes <code>dataclass</code> from a cookbook that comes free with Python (lesson 61).',
          '<code>@dataclass</code> on the line right above <code>class</code> is a <b>decorator</b>. It hands the finished class to <code>dataclass</code>, which adds the methods and gives the class back. You only need to use it here. Lesson 84, Decorators, shows how to write your own.',
          'Each field line is <code>name: type</code>. The part after the colon is a <b>type hint</b>: a label saying what goes in the jar. Python does <b>not</b> check it. Lesson 90, Type hints, covers them. <code>servings: int = 2</code> adds a <b>default</b>, like on a recipe card (lesson 46).',
          'Press <b>Run</b> on <b>menu.py</b>. The list shows both dishes in full (that is <code>__repr__</code> at work), the method <code>protein_per_plate</code> gives <code>20.0</code> grams, and <code>soup.servings = 3</code> changes the soup like any object. Now add <code>print(Dish("soup", "lots"))</code> at the end. No error: <code>Dish(name=\'soup\', protein=\'lots\', servings=2)</code>. The hint said <code>int</code>, and Python did not care.'
        ],
        tip: 'You can give a dataclass any methods you like. The fields go at the top, the methods below them, as in <code>protein_per_plate</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One new field, five places to update.',
        text: [
          'Here is Kitchen Coach\'s <code>Meal</code> record, written by hand. It has 5 fields. Last week someone added <code>gluten_free</code> for Chloe. They added it to <code>__init__</code>, and stopped there.',
          'Press <b>Run</b>. Chloe\'s plan says gluten-free pasta. The kitchen served ordinary wheat pasta. Kitchen Coach checks: <code>Matches the plan? True</code>. The hand-written <code>__eq__</code> never looks at <code>gluten_free</code>, so it calls two different meals equal. And <code>print(served)</code> does not show it either.',
          'No error, no warning. Every field name lives in several places, and the class is only right if <b>you</b> remember all of them. A typo, like <code>self.protien</code>, is just as quiet until much later.'
        ],
        warn: 'Hand-written <code>__repr__</code> and <code>__eq__</code> do not know about new fields. Python cannot tell you that you forgot one.'
      },
      {
        label: 'The fix', pic: run(dcMeal, { title: 'meal.py' }),
        h: 'Write the record as a dataclass.',
        text: [
          '1. Add <code>from dataclasses import dataclass</code> at the top.',
          '2. Put <code>@dataclass</code> on the line above <code>class Meal:</code>.',
          '3. Replace all three methods with one line per field: <code>guest: str</code>, <code>dish: str</code>, <code>calories: int</code>, <code>protein: int</code>, <code>gluten_free: bool</code>.',
          'Press <b>Run</b>. The print shows <code>gluten_free=False</code>, and <code>Matches the plan? False</code>. Chloe gets the right pasta. From 14 lines down to 7, and each field name is typed <b>once</b>. Add a sixth field and <code>__init__</code>, the print and <code>==</code> all know about it at once.'
        ],
        tip: 'The fields are in the order you list them. <code>Meal("Chloe", "pasta", 650, 22, True)</code> fills guest, dish, calories, protein, gluten_free, just like the parameters of the old <code>__init__</code>.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'One line for a new field.',
        text: [
          'Tonight\'s meal records for Ana, Ben and Chloe. <code>gluten_free</code> has a default of <code>False</code>, so only Chloe\'s line says <code>gluten_free=True</code> (a keyword argument, lesson 46). Press <b>Run</b>: three full records and <code>Protein tonight: 113 g</code>.',
          'Your turn. Kitchen Coach wants cooking times. Add <b>one line</b> as the last field: <code>minutes: int = 25</code>. Run it. Every record now ends with <code>minutes=25</code>, and you did not touch any method. Then give Chloe\'s quick rice bowl <code>minutes=15</code> on her line.',
          'Now move your <code>minutes</code> line up, above <code>calories</code>, and run again. Python stops at once: <code>TypeError: non-default argument \'calories\' follows default argument \'minutes\'</code>. Fields <b>with</b> a default must come <b>after</b> fields without one, for the same reason as in a <code>def</code>: Python could not tell which value is which.'
        ],
        tip: 'The terminal shows many extra lines from inside <code>dataclasses.py</code> before the TypeError. Read the last line, then the line of <b>your</b> file near the top: line 3, <code>@dataclass</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A list default needs field(default_factory=list).',
        text: [
          'Each guest has a list of allergies. The natural thing to write is <code>allergies: list = []</code>. Press <b>Run</b>: <code>ValueError: mutable default &lt;class \'list\'&gt; for field allergies is not allowed: use default_factory</code>. "Mutable" means it can change, like a list. (The box points at line 3, the <code>@dataclass</code> line. The lines below it in the message are inside <code>dataclasses.py</code>, Python\'s own file: the check runs while the class is being built.)',
          'Python refuses on purpose. That <code>[]</code> would be made <b>once</b>, and every guest would share it: Chloe\'s <code>"gluten"</code> would show up on Ana, the trap from lesson 69. The dataclass stops you before it happens.',
          'The fix: <code>allergies: list = field(default_factory=list)</code>. <code>field</code> also comes from <code>dataclasses</code> (it is already imported in this box). <code>default_factory=list</code> hands over the <b>name</b> <code>list</code>, with no brackets, and the dataclass calls <code>list()</code> for <b>every new guest</b>, so each one gets a new empty list. Change the line and run it: Ana <code>allergies=[]</code>, Chloe <code>allergies=[\'gluten\']</code>.'
        ],
        warn: 'Want a record that can never change after setup? Write <code>@dataclass(frozen=True)</code>. Then <code>soup.protein = 40</code> stops with <code>dataclasses.FrozenInstanceError: cannot assign to field \'protein\'</code>. Next lesson, Properties: a smart label on the jar.'
      }
    ],
    exercises: [
      {
        file: 'l73_meal_record.py', title: 'Kitchen Coach\'s guest records',
        task: 'The <code>Guest</code> class is written by hand, and it has bugs: <code>print</code> hides <code>gluten_free</code> and <code>allergies</code>, and <code>==</code> only looks at the name and calories. Turn it into a <b>dataclass</b> with the fields <code>name</code>, <code>calories</code>, <code>protein</code>, <code>gluten_free</code> (default <code>False</code>) and <code>allergies</code> (each guest gets <b>its own</b> new list). Keep the <code>daily_summary</code> method.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Guest is still written by hand, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, put <code>@dataclass</code> above <code>class Guest:</code>, write one line per field, and delete the hand-written <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code>.',
          'For allergies use <code>field(default_factory=list)</code>. If Python stops with <code>ValueError: mutable default</code>, that is the catch from the lesson. Run until it says <code>PASS</code>. The check prints Chloe, compares guests with <code>==</code>, and makes sure Chloe\'s gluten stays off Ana\'s list.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['from dataclasses import dataclass', '', '@dataclass', 'class Dish:', '    name: str', '    protein: int', '    servings: int = 2', '', 'bread = Dish("banana bread", 9, 8)', 'print(bread)'], { title: 'bread.py' }),
        options: [
          "Dish(name='banana bread', protein=9, servings=8)",
          "Dish('banana bread', 9, 8)",
          '<__main__.Dish object at 0x...>',
          "Dish(name='banana bread', protein=9, servings=2)"
        ],
        answer: 0,
        why: '<code>@dataclass</code> writes a <code>__repr__</code> that names every field. The third value, 8, goes into <code>servings</code> and replaces the default 2.',
        hint: 'Which methods does @dataclass write for you? One of them is for printing.'
      },
      {
        type: 'pick', q: 'Which methods does <code>@dataclass</code> write for you here?',
        options: ['__init__, the setup', '__repr__, the printout', '__eq__, the == check', 'a check that protein really is an int', 'protein_per_plate'],
        answer: [0, 1, 2],
        why: 'A dataclass writes the setup, the printout and the <code>==</code> check from your field list. It does not check type hints, and your own methods, like <code>protein_per_plate</code>, you still write yourself.',
        hint: 'Remember Dish("soup", "lots").'
      },
      {
        type: 'fix', q: 'Python stops with <code>ValueError: mutable default &lt;class \'list\'&gt; for field allergies is not allowed: use default_factory</code>. Fix it so it prints <code>[]</code>, then <code>[\'gluten\']</code>. Keep the dataclass.',
        code: ['from dataclasses import dataclass', '', '@dataclass', 'class Guest:', '    name: str', '    allergies: list = []', '', 'ana = Guest("Ana")', 'chloe = Guest("Chloe")', 'chloe.allergies.append("gluten")', 'print(ana.allergies)', 'print(chloe.allergies)'],
        title: 'allergies.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines != ["[]", "[\'gluten\']"]:',
          '    msg = "It should print two lines: [] and then [\'gluten\']."',
          'elif "__dataclass_fields__" not in vars(Guest):',
          '    msg = "It prints the right thing, but keep @dataclass above class Guest."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Import <code>field</code> too (<code>from dataclasses import dataclass, field</code>) and write <code>allergies: list = field(default_factory=list)</code>. The dataclass calls <code>list()</code> for every new guest, so Ana and Chloe each get their own list.',
        hint: 'Two changes: the import line, and the allergies line. The error message names the word you need.'
      },
      {
        type: 'fix', q: 'Python stops with <code>TypeError: non-default argument \'protein\' follows default argument \'servings\'</code>. Fix it so it prints <code>Dish(name=\'lentil soup\', protein=18, servings=2)</code>.',
        code: ['from dataclasses import dataclass', '', '@dataclass', 'class Dish:', '    name: str', '    servings: int = 2', '    protein: int', '', 'soup = Dish("lentil soup", 18)', 'print(soup)'],
        title: 'order.py',
        check: [
          'if out.strip() == "Dish(name=\'lentil soup\', protein=18, servings=2)":',
          '    ok = True',
          'else:',
          '    msg = "It should print exactly: Dish(name=\'lentil soup\', protein=18, servings=2)"'
        ].join('\n'),
        why: 'Fields with a default must come after the fields without one. Move <code>servings: int = 2</code> below <code>protein: int</code>. The fields are filled in the order they are listed, so 18 now goes into protein.',
        hint: 'Which line has an = in it? Where must it go?'
      },
      {
        type: 'pick', q: 'Back to lesson 69. This is a plain class, no dataclass. What is printed?',
        pic: code(['class Guest:', '    allergies = []', '', '    def __init__(self, name):', '        self.name = name', '', 'ana = Guest("Ana")', 'chloe = Guest("Chloe")', 'chloe.allergies.append("gluten")', 'print(ana.allergies)'], { title: 'shared.py', bad: [2] }),
        options: ["['gluten']", '[]', 'ValueError: mutable default', 'AttributeError'],
        answer: 0,
        why: 'In a plain class, <code>allergies = []</code> is one class attribute, shared by every guest. Chloe\'s append changes that one list, so Ana sees it too. A plain class lets it happen silently. A dataclass refuses with a <code>ValueError</code> and points you to <code>default_factory</code>.',
        hint: 'How many lists are made when the class body runs once?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['from dataclasses import dataclass', '', '@dataclass', 'class Meal:', '    guest: str', '    protein: int', '', 'a = Meal("Ben", 35)', 'b = Meal("Ben", 35)', 'c = Meal("Ben", 40)', 'print(a == b, a == c)'], { title: 'same.py' }),
        options: ['True False', 'False False', 'True True', 'False True'],
        answer: 0,
        why: 'The <code>__eq__</code> that <code>@dataclass</code> writes compares every field, in order. <code>a</code> and <code>b</code> have the same values, so they are equal even though they are two objects. <code>c</code> has 40 g of protein, so it is not.',
        hint: 'Without @dataclass, two separate objects are never ==. With it?'
      },
      {
        type: 'match', q: 'Match each line to what it means.',
        pairs: [
          ['name: str', 'a field, with a type hint saying it holds text'],
          ['servings: int = 2', 'a field with a default'],
          ['@dataclass', 'a decorator that writes __init__, __repr__ and __eq__'],
          ['field(default_factory=list)', 'a new empty list for each object'],
          ['@dataclass(frozen=True)', 'fields cannot change after setup']
        ],
        why: 'Field lines are a name, a hint after the colon, and maybe a default. The decorator above the class does the writing. <code>default_factory</code> makes a fresh value per object, and <code>frozen=True</code> locks the record.'
      },
      {
        type: 'fill', q: 'Finish Kitchen Coach\'s meal record.',
        text: 'from dataclasses import ___\n\n@___\nclass Meal:\n    guest: str\n    calories: ___\n    gluten_free: bool = False',
        options: ['dataclass', 'dataclass', 'int', 'self', 'def', '__init__'],
        answer: ['dataclass', 'dataclass', 'int'],
        why: 'Import <code>dataclass</code>, put <code>@dataclass</code> above the class, and give each field a type hint. Calories are a whole number, <code>int</code>. No <code>def</code> and no <code>__init__</code>: the dataclass writes those.',
        hint: 'The same word goes in the first two blanks.'
      }
    ]
  });
})();
