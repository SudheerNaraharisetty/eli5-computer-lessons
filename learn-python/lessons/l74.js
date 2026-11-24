/* Lesson 74: Properties (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l74  Properties
     ===================================================================== */

  // The ingredients of Chloe's brownies, used by every Recipe box.
  // 1100 + 720 + 320 + 140 + 120 = 2400 kcal, 12 brownies = 200 kcal each.
  const make = [
    'brownies = Recipe("Chloe\'s brownies", 12, {"dark chocolate": 1100,',
    '    "butter": 720, "sugar": 320, "eggs": 140, "almond flour": 120})'
  ];

  // A jar drawn in svg, with a label card on it.
  const jar = (x, title, rows, tone) =>
    `<rect x="${x + 30}" y="14" width="180" height="22" rx="6" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    box(x, 40, 240, 200, P.paper2, 26) +
    `<rect x="${x + 2}" y="182" width="236" height="56" rx="24" fill="#8a5a3c"/>` +
    box(x + 22, 62, 196, 104, P.white, 12) +
    T(x + 120, 86, title, { s: 13 }) +
    rows.map((r, i) => T(x + 36, 116 + i * 30, r[0], { s: 12, w: 700, a: 'start', f: P.ink2 }) + T(x + 204, 116 + i * 30, r[1], { s: 13, m: true, a: 'end', f: r[2] || P.ink })).join('');

  /* ---- The idea: a label written once goes stale ---- */
  const ideaPic = svg(600, 300, 'Two jars after you add walnuts. Left: a label written once in __init__ still says total 2400 kcal, but the real total is 2640. It is stale. Right: a smart label, a property, works out the sum every time you read it, so it says 2640.',
    jar(20, 'written once', [['total', '2400', P.danger], ['real', '2640', P.ok]]) +
    `<rect x="${20 + 112}" y="100" width="100" height="32" rx="16" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    T(140, 214, 'stale', { s: 15, f: '#fff' }) +
    jar(340, 'smart label', [['total', '2640', P.ok], ['each', '220', P.ok]]) +
    T(460, 214, 'always right', { s: 14, f: '#fff' }) +
    T(140, 272, 'self.total_kcal = sum(...)', { s: 12, m: true, f: P.danger }) +
    T(140, 292, 'in __init__: worked out once', { s: 11.5, w: 700, f: P.ink2 }) +
    T(460, 272, '@property', { s: 13, m: true, f: P.accent }) +
    T(460, 292, 'worked out on every read', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(272, 140, 328, 140, P.ink2, 2.5));
  const stale = [
    'class Recipe:',
    '    def __init__(self, name, servings, kcal):',
    '        self.name = name',
    '        self.servings = servings',
    '        self.kcal = kcal                          # ingredient: kcal',
    '        self.total_kcal = sum(kcal.values())      # worked out once',
    '',
    '    def add(self, item, kcal):',
    '        self.kcal[item] = kcal',
    '',
    ...make,
    'print(brownies.total_kcal)',
    'brownies.add("walnuts", 240)',
    'print(brownies.total_kcal)               # the label',
    'print(sum(brownies.kcal.values()))       # the real total'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(stale, { title: 'stale.py' })}</div>`;

  /* ---- The code: @property for total_kcal and kcal_each ---- */
  const smart = [
    'class Recipe:',
    '    def __init__(self, name, servings, kcal):',
    '        self.name = name',
    '        self.servings = servings',
    '        self.kcal = kcal                  # ingredient: kcal',
    '',
    '    def add(self, item, kcal):',
    '        self.kcal[item] = kcal',
    '',
    '    @property',
    '    def total_kcal(self):',
    '        return sum(self.kcal.values())',
    '',
    '    @property',
    '    def kcal_each(self):',
    '        return self.total_kcal / self.servings',
    '',
    ...make,
    'print(brownies.total_kcal, brownies.kcal_each)',
    'brownies.add("walnuts", 240)',
    'print(brownies.total_kcal, brownies.kcal_each)'
  ];
  const readSvg = svg(600, 150, 'What happens when you read brownies.total_kcal. You write it with no brackets, like an attribute. Python sees that total_kcal is a property, so it runs the method total_kcal(self) with brownies as self. The method adds up the calories and hands back 2640.',
    T(100, 26, 'you write', { s: 12, w: 700, f: P.ink2 }) +
    box(10, 38, 180, 50, P.white, 12) + T(100, 69, 'brownies.total_kcal', { s: 13, m: true }) +
    T(100, 112, 'no brackets', { s: 12, w: 700, f: P.accent }) +
    arrow(196, 63, 236, 63, P.ink2, 2.5) +
    T(355, 26, 'Python runs the method', { s: 12, w: 700, f: P.ink2 }) +
    box(240, 38, 230, 76, P.tint, 12) + T(355, 62, '@property', { s: 12, m: true, f: P.accent }) +
    T(355, 84, 'def total_kcal(self):', { s: 12.5, m: true }) + T(355, 104, 'return sum(...)', { s: 12, m: true, f: P.ink2 }) +
    arrow(476, 63, 516, 63, P.ink2, 2.5) +
    T(560, 26, 'you get', { s: 12, w: 700, f: P.ink2 }) +
    box(522, 38, 72, 50, P.okT, 12) + T(558, 69, '2640', { s: 15, m: true, f: P.ok }) +
    T(300, 140, 'Looks like an attribute. Runs code every time you read it.', { s: 12.5, w: 700, f: P.ink2 }));
  const bracketsTerm = term([
    '$ python3 brownies.py',
    '2400 200.0',
    '2640 220.0',
    'Traceback (most recent call last):',
    '  File "/Users/chloe/kitchen/brownies.py", line 23, in <module>',
    '    print(brownies.total_kcal())',
    '          ~~~~~~~~~~~~~~~~~~~^^',
    "TypeError: 'int' object is not callable"
  ], 'print(brownies.total_kcal()) at the end of brownies.py, terminal, Python 3.15');
  const codePic = `<div style="width:100%;min-width:0">${run(smart, { title: 'brownies.py' })}${readSvg}${bracketsTerm}</div>`;

  /* ---- The pain: servings can be set to anything ---- */
  const zero = [
    'class Recipe:',
    '    def __init__(self, name, servings, kcal):',
    '        self.name = name',
    '        self.servings = servings',
    '        self.kcal = kcal',
    '',
    '    @property',
    '    def kcal_each(self):',
    '        return sum(self.kcal.values()) / self.servings',
    '',
    ...make,
    'print(brownies.kcal_each)',
    'brownies.servings = -12        # a slip: the minus sign',
    'print(brownies.kcal_each)',
    'brownies.servings = 0          # Kitchen Coach\'s form, left empty',
    'print(brownies.kcal_each)'
  ];
  const painPic = run(zero, { title: 'zero.py' });

  /* ---- The fix: a setter that guards servings ---- */
  const guardHead = [
    'class Recipe:',
    '    def __init__(self, name, servings, kcal):',
    '        self.name = name',
    '        self.kcal = kcal',
    '        self.servings = servings       # this runs the setter below',
    '',
    '    @property',
    '    def servings(self):',
    '        return self._servings',
    '',
    '    @servings.setter',
    '    def servings(self, value):',
    '        if value < 1:',
    '            raise ValueError(f"servings must be at least 1, got {value}")',
    '        self._servings = value',
    '',
    '    @property',
    '    def kcal_each(self):',
    '        return sum(self.kcal.values()) / self.servings',
    ''
  ];
  const guard = [
    ...guardHead,
    ...make,
    'print(brownies.kcal_each)',
    'brownies.servings = 24         # cut them smaller',
    'print(brownies.kcal_each)',
    'brownies.servings = 0',
    'print(brownies.kcal_each)'
  ];
  const setSvg = svg(600, 170, 'How brownies.servings = 24 runs. The = goes to the setter, def servings(self, value), with 24 in value. The guard asks: is value less than 1? No, so it keeps it in self._servings. With 0 the guard says yes and raises ValueError, and self._servings stays 24.',
    box(10, 20, 170, 48, P.white, 12) + T(95, 50, 'servings = 24', { s: 13, m: true }) +
    box(10, 96, 170, 48, P.dangerT, 12) + T(95, 126, 'servings = 0', { s: 13, m: true, f: P.danger }) +
    arrow(184, 44, 222, 70, P.ink2, 2.5) + arrow(184, 120, 222, 94, P.ink2, 2.5) +
    box(226, 40, 168, 80, P.tint, 12) + T(310, 64, '@servings.setter', { s: 11.5, m: true, f: P.accent }) +
    T(310, 90, 'if value < 1:', { s: 12.5, m: true }) + T(310, 110, 'the guard', { s: 11, w: 700, f: P.ink2 }) +
    arrow(398, 62, 436, 44, P.ok, 2.5) + arrow(398, 98, 436, 120, P.danger, 2.5) +
    box(440, 20, 150, 48, P.okT, 12) + T(515, 50, '_servings = 24', { s: 12, m: true, f: P.ok }) +
    box(440, 96, 150, 48, P.dangerT, 12) + T(515, 126, 'ValueError', { s: 13, m: true, f: P.danger }) +
    T(300, 164, 'Every = goes through the guard, even the one in __init__.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${run(guard, { title: 'guard.py' })}${setSvg}</div>`;

  /* ---- Try it: a read-only property on a flour jar ---- */
  const flour = [
    'class Jar:',
    '    def __init__(self, item, capacity, grams):',
    '        self.item = item',
    '        self.capacity = capacity',
    '        self.grams = grams',
    '',
    '    @property',
    '    def grams_left(self):',
    '        return self.capacity - self.grams',
    '',
    'flour = Jar("rice flour", 1000, 650)',
    'print(flour.grams_left)',
    'flour.grams = flour.grams - 120      # Chloe bakes',
    'print(flour.grams_left)',
    'flour.grams_left = 500'
  ];

  /* ---- The catch: plain attributes first, a property later ---- */
  const before = code([
    'class Guest:',
    '    def __init__(self, name, calories):',
    '        self.name = name',
    '        self.calories = calories',
    '',
    'ana = Guest("Ana", 2600)',
    'ana.calories = 2800',
    'print(ana.name, ana.calories)'
  ], { title: 'guests.py, version 1: plain attributes', good: [3, 4] });
  const later = [
    'class Guest:',
    '    def __init__(self, name, calories):',
    '        self.name = name             # plain: fine as it is',
    '        self.calories = calories     # now guarded by the setter',
    '',
    '    @property',
    '    def calories(self):',
    '        return self._calories',
    '',
    '    @calories.setter',
    '    def calories(self, value):',
    '        if value < 1000:',
    '            raise ValueError(f"calories look too low, got {value}")',
    '        self._calories = value',
    '',
    'ana = Guest("Ana", 2600)             # the same lines as before',
    'ana.calories = 2800                  # race week',
    'print(ana.name, ana.calories)',
    'ana._calories = 0                    # Python does not stop you',
    'print(ana.calories)'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${before}${run(later, { title: 'guests.py, version 2' })}</div>`;

  COURSE.add({
    id: 'l74', minutes: 13,
    summary: 'A <b>property</b> is a method that you <b>read like an attribute</b>, with no brackets. Put <code>@property</code> on the line above <code>def total_kcal(self):</code>, and <code>brownies.total_kcal</code> runs the method <b>every time you read it</b>. So a total worked out from other attributes is <b>never stale</b>: add walnuts, and the label says 2640 at once. A stored <code>self.total_kcal = sum(...)</code> in <code>__init__</code> is worked out once and goes stale. A property can also <b>guard</b> a value. Add a <b>setter</b> with <code>@servings.setter</code>: it runs on every <code>brownies.servings = ...</code> and can <code>raise ValueError</code> for 0, before anything divides by zero. The real value lives in <code>self._servings</code>. The underscore means "please do not touch from outside", but Python does not stop you. A property with no setter is read-only: <code>AttributeError: property \'grams_left\' of \'Jar\' object has no setter</code>. Do not wrap every attribute "just in case". Start plain. You can switch to a property later and <b>no caller has to change</b>.',
    video: {
      src: 'videos/l74-properties.mp4', poster: 'videos/l74-properties.jpg', length: '1 min 12 s',
      script: [
        'Chloe\'s gluten-free brownies. 12 of them. Kitchen Coach keeps the recipe in a jar, with a label on the front. Total, 2400 calories.',
        'Who wrote that label? Init did, once. Self dot total kcal equals the sum.',
        'Now add walnuts. 240 more calories. The real total is 2640. The label still says 2400. It is stale.',
        'The fix is a property. At property, on top of a method. Now the label is worked out every time you read it. No brackets.',
        'Read it again. 2640. And each brownie, 220.',
        'A property can guard a value, too. Add a setter. It runs every time you assign. Someone types servings equals 0. That would divide by 0. The guard says no. Value error. Servings must be at least 1.',
        'A property looks like an attribute, but runs code. The label is always right.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'A label written once goes stale.',
        text: [
          'Kitchen Coach keeps the recipe for Chloe\'s gluten-free brownies: 12 brownies, and the calories of each ingredient in a dict (lesson 37). Dark chocolate 1100, butter 720, sugar 320, eggs 140, almond flour 120. That is <b>2400 kcal</b> in total, so <b>200 kcal</b> a brownie.',
          'The total sits on the recipe like a label on a jar: <code>self.total_kcal = sum(kcal.values())</code> in <code>__init__</code>. Press <b>Run</b>. It says 2400. Then Chloe adds a handful of walnuts, 240 kcal more. The label <b>still says 2400</b>. The real total is <b>2640</b>.',
          'The label was worked out <b>once</b>, when the recipe was made, and nobody worked it out again. It is <b>stale</b>. You could make <code>add</code> update it, but then every method that changes the ingredients has to remember. What you want is a label that <b>works itself out</b> every time somebody reads it. That is a <b>property</b>.'
        ],
        tip: 'Anything you can work out from other attributes, like a total, an average or what is left in a jar, is a good job for a property. Store the ingredients. Work out the total.'
      },
      {
        label: 'The code', pic: codePic,
        h: '@property: a method you read without brackets.',
        text: [
          'Write the total as a method, <code>def total_kcal(self):</code> that returns the sum, and put <code>@property</code> on the line above it. Now <code>brownies.total_kcal</code>, with <b>no brackets</b>, runs that method and hands back its answer. It reads like an attribute, but it is worked out <b>fresh every time</b>.',
          'The <code>@</code> line is called a <b>decorator</b>. It wraps the method below it and changes how it is used. You will write your own in lesson 84, Decorators. For now, read <code>@property</code> as "read this method like an attribute".',
          'Press <b>Run</b>: <code>2400 200.0</code>, then after the walnuts <code>2640 220.0</code>. <code>kcal_each</code> is a property too, and it uses <code>self.total_kcal</code> inside. Now add a line, <code>brownies.add("hazelnuts", 120)</code>, before the last print and run it again. Both numbers follow by themselves: <code>2760 230.0</code>.'
        ],
        tip: 'Do not add brackets. <code>brownies.total_kcal()</code> reads the number 2640 first, then tries to call it like a function: <code>TypeError: \'int\' object is not callable</code>. Lesson 12 met its cousin, <code>\'str\' object is not callable</code>: "callable" means something you can use with brackets.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Anyone can set servings to anything.',
        text: [
          '<code>servings</code> is still a plain attribute, so any number gets in. A slip of the finger sets it to <code>-12</code>. Press <b>Run</b>. Python happily prints <code>-200.0</code> kcal a brownie. No error. Kitchen Coach would show Chloe a negative number.',
          'Then Kitchen Coach\'s form is sent with the servings box left at <code>0</code>. Nothing happens on that line. The crash comes <b>later</b>, when somebody reads <code>kcal_each</code>: <code>ZeroDivisionError: division by zero</code> (lesson 7), pointing at line 9, inside the property.',
          'The mistake was on line 16. The error points somewhere else. In a big program that "somewhere else" can be a long way from the line that let the 0 in.'
        ],
        warn: 'A bad value that gets in quietly is worse than one that is stopped at the door. Stop it where it comes in.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A setter guards the door.',
        text: [
          'Make <code>servings</code> a property, then give it a <b>setter</b>: a second method with the same name and <code>@servings.setter</code> above it. Python runs the setter on <b>every</b> <code>brownies.servings = ...</code>, with the new number in <code>value</code>. Inside, the guard from lesson 54: <code>if value &lt; 1:</code> then <code>raise ValueError(...)</code>.',
          'The number itself is kept in <code>self._servings</code>, with an underscore. It needs a different name: <code>self.servings = value</code> inside the setter would run the setter again, and again. The getter, under <code>@property</code>, hands <code>self._servings</code> back.',
          'Look at <code>__init__</code>: it writes <code>self.servings = servings</code> with no underscore, on purpose, so even a <b>new</b> recipe goes through the guard. Press <b>Run</b>: <code>200.0</code>, then cut into 24, <code>100.0</code>. Then <code>servings = 0</code> stops <b>right there</b>: the traceback starts at line 26, the line with the mistake, and ends in the guard on line 14 with <code>ValueError: servings must be at least 1, got 0</code>. Change the 0 to <code>-12</code> and run it again.'
        ],
        tip: 'Order matters: first <code>@property</code> with the getter, then <code>@servings.setter</code>. The setter\'s decorator uses the name the getter just made.'
      },
      {
        label: 'Try it', pic: run(flour, { title: 'flour.py' }),
        h: 'No setter: read-only.',
        text: [
          'Chloe bakes with rice flour. The jar holds 1000 g and has 650 g in it, so <code>grams_left</code> is <b>350</b>. She uses 120 g, and the property follows: <b>470</b>. Press <b>Run</b>.',
          'The last line tries to <b>write</b> to <code>grams_left</code>. It has no setter, so Python stops: <code>AttributeError: property \'grams_left\' of \'Jar\' object has no setter</code>. That is what you want. How much room is left comes from the jar and what is in it. Nobody should type it in by hand.',
          'Now delete the last line, and add one instead: <code>flour.capacity = 2000</code>, Chloe moves the flour into a bigger jar. Then <code>print(flour.grams_left)</code>. It says <b>1470</b>, with no extra work.'
        ],
        tip: 'A property without a setter is a <b>read-only</b> label. Give a property a setter only when people should be able to change it, and then check the value.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Start plain. Switch later.',
        text: [
          'Do not turn every attribute into a property "just in case". <code>self.name = name</code> needs no checks and nothing to work out, so a plain attribute is perfect. A property for it would be six lines that do nothing.',
          'Here is the superpower: you can <b>switch later</b>. Version 1 of <code>Guest</code> has a plain <code>calories</code>. Months later you want a guard. Version 2 makes <code>calories</code> a property with a setter, and the lines that <b>use</b> the class, <code>ana.calories = 2800</code>, stay exactly the same. Press <b>Run</b>: <code>Ana 2800</code>.',
          'And the underscore is only a note: "please do not touch". Python does not stop you. <code>ana._calories = 0</code> walks right past the guard and prints <code>0</code>. Inside the class, use <code>self._calories</code>. Outside, always use <code>ana.calories</code>.'
        ],
        warn: 'Next lesson, Review: classes and objects. Mixed practice with everything from module 6, from the first class to properties.'
      }
    ],
    exercises: [
      {
        file: 'l74_smart_jar.py', title: 'A smart jar',
        task: 'Kitchen Coach wants a jar that is <b>always right</b>. Give the class <code>Jar</code> a property <code>grams_left</code> (capacity minus what is in it) and a property <code>percent_full</code> (how full it is, out of 100). Then guard the grams: keep them in <code>self._grams</code>, and make a setter for <code>grams</code> that raises <code>ValueError</code> for a negative number or for more than the jar holds.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The jar has no properties yet, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, add the <code>grams</code> property and its setter, then <code>grams_left</code> and <code>percent_full</code>. Run it after each one.',
          'Run the file until it says <code>PASS</code>. The check also tries to put -5 g and 1200 g into a 1000 g jar, so your guard must say no.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Jar:', '    def __init__(self, capacity, grams):', '        self.capacity = capacity', '        self.grams = grams', '', '    @property', '    def grams_left(self):', '        return self.capacity - self.grams', '', 'rice = Jar(2000, 1500)', 'rice.grams = 1200          # Ana cooks 300 g for race week', 'print(rice.grams_left)'], { title: 'rice.py' }),
        options: ['800', '500', '1200', 'TypeError: \'int\' object is not callable'],
        answer: 0,
        why: '<code>grams_left</code> is worked out when you read it, after the change: 2000 - 1200 = 800. A stored total would still say 500.',
        hint: 'When does the property do its sum?'
      },
      {
        type: 'fix', q: 'The total goes stale after the walnuts. Make <code>total_kcal</code> a property so it prints <code>2400</code>, then <code>2640</code>. Leave the lines under the class as they are.',
        code: [
          'class Recipe:',
          '    def __init__(self, name, servings, kcal):',
          '        self.name = name',
          '        self.servings = servings',
          '        self.kcal = kcal',
          '        self.total_kcal = sum(kcal.values())',
          '',
          '    def add(self, item, kcal):',
          '        self.kcal[item] = kcal',
          '',
          ...make,
          'print(brownies.total_kcal)',
          'brownies.add("walnuts", 240)',
          'print(brownies.total_kcal)'
        ],
        title: 'stale.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["2400", "2640"] and isinstance(vars(Recipe).get("total_kcal"), property):',
          '    ok = True',
          'elif lines == ["2400", "2640"]:',
          '    msg = "The numbers are right. Now make total_kcal a property, so no method has to remember to update it."',
          'else:',
          '    msg = "It should print 2400, then 2640. Work the sum out in a method with @property above it."'
        ].join('\n'),
        why: 'Delete the stored line in <code>__init__</code> and add <code>@property</code> with <code>def total_kcal(self): return sum(self.kcal.values())</code>. The sum is then worked out on every read, after the walnuts too.',
        hint: 'If you keep self.total_kcal = ... in __init__, Python says the property has no setter. Delete that line.'
      },
      {
        type: 'fix', q: 'The setter lets anything in. Add a guard so <code>Recipe("test", 0)</code> and <code>Recipe("test", -3)</code> stop with a <code>ValueError</code>. The program must still print <code>24</code>.',
        code: [
          'class Recipe:',
          '    def __init__(self, name, servings):',
          '        self.name = name',
          '        self.servings = servings',
          '',
          '    @property',
          '    def servings(self):',
          '        return self._servings',
          '',
          '    @servings.setter',
          '    def servings(self, value):',
          '        self._servings = value         # no check yet',
          '',
          'brownies = Recipe("Chloe\'s brownies", 12)',
          'brownies.servings = 24',
          'print(brownies.servings)'
        ],
        title: 'servings.py',
        check: [
          'lines = out.strip().splitlines()',
          'let_in = []',
          'for n in [0, -3]:',
          '    try:',
          '        Recipe("test", n)',
          '        let_in.append(n)',
          '    except ValueError:',
          '        pass',
          'if lines != ["24"]:',
          '    msg = "It should still print exactly one line: 24."',
          'elif let_in:',
          '    msg = f"Recipe(\\"test\\", {let_in[0]}) was let in. In the setter, raise ValueError when value is less than 1."',
          'else:',
          '    try:',
          '        Recipe("test", 1)',
          '        ok = True',
          '    except Exception:',
          '        msg = "1 serving is fine. Only stop values below 1."'
        ].join('\n'),
        why: 'In the setter, before <code>self._servings = value</code>: <code>if value &lt; 1:</code> then <code>raise ValueError(f"servings must be at least 1, got {value}")</code>. <code>__init__</code> writes <code>self.servings</code>, so new recipes go through the guard too.',
        hint: 'The guard goes inside def servings(self, value), above the line that keeps the value.'
      },
      {
        type: 'bucket', q: 'Plain attribute, or property?',
        buckets: ['Plain attribute: self.x = x', 'Property: worked out or guarded'],
        items: [
          ['a guest\'s name', 0],
          ['the name of a recipe', 0],
          ['the total calories of all the ingredients', 1],
          ['the calories in each brownie', 1],
          ['grams left in the flour jar', 1],
          ['servings, which must be at least 1', 1]
        ],
        why: 'If a value can be worked out from other attributes, a property keeps it from going stale. If it needs a check, a property with a setter guards it. Everything else stays a plain attribute.',
        hint: 'Does it need a sum, or a check? If not, keep it plain.'
      },
      {
        type: 'pick', q: '<code>grams_left</code> is a property with no setter. What happens on the last line?',
        pic: code(['flour = Jar("rice flour", 1000, 650)', 'flour.grams_left = 500'], { title: 'flour.py' }),
        options: ["AttributeError: property 'grams_left' of 'Jar' object has no setter", 'grams_left is now 500', 'The property is replaced by a plain attribute', 'grams becomes 500'],
        answer: 0,
        why: 'A property with no setter is read-only. Python refuses to write to it. To change what <code>grams_left</code> says, change <code>grams</code> or <code>capacity</code>.',
        hint: 'Which methods does the property have?'
      },
      {
        type: 'pick', q: 'Back to lesson 53. <code>Recipe</code> is the class with the guard from The fix. What does this print?',
        pic: code(['brownies = Recipe("Chloe\'s brownies", 12, {"dark chocolate": 1100,', '    "butter": 720, "sugar": 320, "eggs": 140, "almond flour": 120})', 'try:', '    brownies.servings = 0', 'except ValueError as error:', '    print("Not saved:", error)', 'print(brownies.servings)'], { title: 'form.py' }),
        options: ['Not saved: servings must be at least 1, got 0, then 12', 'Not saved: servings must be at least 1, got 0, then 0', 'Only 12', 'ZeroDivisionError: division by zero'],
        answer: 0,
        why: 'The setter raises before it keeps the value, so <code>_servings</code> stays 12. <code>except</code> catches the <code>ValueError</code> and prints its message. Kitchen Coach can show that message on its form.',
        hint: 'Does the setter reach self._servings = value when value is 0?'
      },
      {
        type: 'fill', q: 'Finish the guarded <code>servings</code>: a getter, a setter, and the hidden name that keeps the number.',
        text: '    @___\n    def servings(self):\n        return self._servings\n\n    @servings.___\n    def servings(self, value):\n        if value < 1:\n            raise ValueError("servings must be at least 1")\n        self.___ = value',
        options: ['property', 'setter', '_servings', 'servings', 'getter', 'self'],
        answer: ['property', 'setter', '_servings'],
        why: '<code>@property</code> makes the getter. <code>@servings.setter</code> adds the setter to it. The number lives in <code>self._servings</code>. Writing <code>self.servings = value</code> there would call the setter again and again.',
        hint: 'The setter keeps the number under a name with an underscore.'
      },
      {
        type: 'pick', q: 'What does the underscore in <code>self._servings</code> mean?',
        options: ['A note to other programmers: use servings from outside, not _servings. Python does not stop you.', 'Python makes _servings secret, so nobody outside can read it', 'It makes _servings read-only', 'It is a typo: Python ignores the underscore'],
        answer: 0,
        why: 'It is a promise between programmers, nothing more. <code>brownies._servings = 0</code> works and walks past the guard. So from outside, always use <code>brownies.servings</code>.',
        hint: 'Try ana._calories = 0 in The catch.'
      }
    ]
  });
})();
