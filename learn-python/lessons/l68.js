/* Lesson 68: Methods (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l68  Methods
     ===================================================================== */

  /* ---- The idea: an appliance comes with its own buttons ---- */
  const ovenCard = (x, y) =>
    box(x, y, 268, 214, P.white, 16) +
    `<rect x="${x + 14}" y="${y + 14}" width="74" height="26" rx="13" fill="${P.tint}"/>` + T(x + 51, y + 32, 'oven', { s: 13, m: true, f: P.accent }) +
    `<circle cx="${x + 60}" cy="${y + 86}" r="34" fill="${P.paper}" stroke="${P.ink}" stroke-width="3"/>` +
    T(x + 60, y + 86, '0', { s: 20, m: true }) + T(x + 60, y + 104, '°C', { s: 11, f: P.ink2 }) +
    `<rect x="${x + 112}" y="${y + 58}" width="140" height="30" rx="15" fill="${P.ink}"/>` + T(x + 182, y + 78, 'preheat()', { s: 13, m: true, f: '#fff' }) +
    `<rect x="${x + 112}" y="${y + 96}" width="140" height="30" rx="15" fill="${P.ink}"/>` + T(x + 182, y + 116, 'is_ready()', { s: 13, m: true, f: '#fff' }) +
    `<rect x="${x + 18}" y="${y + 138}" width="232" height="62" rx="10" fill="#2a2745"/>` +
    T(x + 134, y + 175, 'the data: self.temp', { s: 12, w: 700, f: '#eceaff' });
  const ideaPic = svg(600, 300, 'Two ways to keep an oven. Left: a dict {"temp": 0} on one shelf and a loose recipe card preheat(appliance, temp) on another. Nothing ties them together, so the card can be handed the pantry by mistake. Right: an Oven object made from class Oven. Its data, self.temp, and its buttons, preheat() and is_ready(), live together in one appliance.',
    T(150, 22, 'Loose: data here, card there', { s: 13, f: P.danger }) +
    box(16, 40, 268, 64, P.white, 12) + T(150, 66, 'oven = {"temp": 0}', { s: 13, m: true }) + T(150, 90, 'a dict on the shelf', { s: 11.5, w: 700, f: P.ink2 }) +
    box(16, 124, 268, 64, P.white, 12) + T(150, 150, 'def preheat(appliance, temp)', { s: 12, m: true }) + T(150, 174, 'a loose card: any dict fits', { s: 11.5, w: 700, f: P.ink2 }) +
    box(16, 208, 268, 64, P.dangerT, 12) + T(150, 234, 'preheat(pantry, 180)', { s: 13, m: true, f: P.danger }) + T(150, 258, 'heats the rice. No error.', { s: 11.5, w: 700, f: P.danger }) +
    T(450, 22, 'Method: the button is on the oven', { s: 13, f: P.ok }) +
    ovenCard(316, 40) +
    T(450, 286, 'data and buttons, together', { s: 12.5, w: 700, f: P.ok }));
  const loose = [
    'oven = {"temp": 0}',
    'pantry = {"rice": 900}',
    '',
    'def preheat(appliance, temp):',
    '    appliance["temp"] = temp',
    '',
    'preheat(oven, 180)',
    'preheat(pantry, 180)     # oops: the wrong dict',
    'print(oven)',
    'print(pantry)'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(loose, { title: 'loose.py' })}</div>`;

  /* ---- The code: class Oven with two methods ---- */
  const ovenCode = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):',
    '        self.temp = temp',
    '        print(f"Heating to {temp} C")',
    '',
    '    def is_ready(self, recipe_temp):',
    '        return self.temp >= recipe_temp',
    '',
    'oven = Oven()',
    'print(oven.temp)',
    'print(oven.is_ready(180))     # Chloe\'s banana bread',
    'oven.preheat(180)',
    'print(oven.temp)',
    'print(oven.is_ready(180))'
  ];
  const selfSvg = svg(600, 196, 'What Python really runs. You write oven.preheat(180). Python finds preheat in the class Oven and calls Oven.preheat(oven, 180). The object in front of the dot, oven, goes into the first jar, self. 180 goes into the second jar, temp.',
    T(130, 26, 'you write', { s: 12, w: 700, f: P.ink2 }) +
    T(130, 56, 'oven.preheat(180)', { s: 18, m: true }) +
    T(450, 26, 'Python runs', { s: 12, w: 700, f: P.ink2 }) +
    T(450, 56, 'Oven.preheat(oven, 180)', { s: 18, m: true, f: P.accent }) +
    arrow(232, 50, 314, 50, P.ink2, 2.5) +
    arrow(488, 66, 330, 118, P.warn, 2.5) + arrow(547, 66, 388, 118, P.ok, 2.5) +
    box(160, 122, 280, 46, P.white, 12) +
    T(300, 151, 'def preheat(self, temp):', { s: 16, m: true }) +
    T(510, 104, 'oven → self', { s: 12.5, w: 800, f: P.warn, a: 'start' }) + T(510, 124, '180 → temp', { s: 12.5, w: 800, f: P.ok, a: 'start' }) +
    T(300, 188, 'the object in front of the dot fills self', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(ovenCode, { title: 'oven.py' })}${selfSvg}</div>`;

  /* ---- The pain: forget self, forget the brackets ---- */
  const noSelf = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(temp):',
    '        self.temp = temp',
    '',
    'oven = Oven()',
    'oven.preheat(180)',
    'print(oven.temp)'
  ];
  const bracketsCode = code([
    'oven = Oven()        # the class Oven from oven.py',
    'oven.preheat         # no brackets: nothing happens',
    'print(oven.temp)',
    'print(oven.preheat)'
  ], { title: 'brackets.py', bad: [2] });
  const bracketsTerm = term([
    '$ python3 brackets.py',
    '0',
    '<bound method Oven.preheat of <__main__.Oven object at 0x102ca4980>>'
  ], 'terminal, Python 3.15');
  const painPic = `<div style="width:100%;min-width:0">${run(noSelf, { title: 'forgot_self.py' })}${bracketsCode}${bracketsTerm}</div>`;

  /* ---- The fix: self first, self. to keep it ---- */
  const fixed = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):   # 1. self first',
    '        self.temp = temp       # 2. self. keeps it',
    '',
    'oven = Oven()',
    'oven.preheat(180)             # 3. brackets',
    'print(oven.temp)',
    '',
    'roaster = Oven()              # its own self',
    'roaster.preheat(200)          # Ana\'s potatoes',
    'print(oven.temp, roaster.temp)'
  ];
  const countSvg = svg(600, 110, 'Count the values Python hands over. oven.preheat(180) hands over 2: the oven and 180. def preheat(temp) has 1 jar. 2 values, 1 jar: takes 1 positional argument but 2 were given. def preheat(self, temp) has 2 jars, so it fits.',
    box(16, 16, 176, 78, P.white, 12) + T(104, 44, 'hands over 2', { s: 13, f: P.ink2 }) + T(104, 72, 'oven, 180', { s: 15, m: true }) +
    box(212, 16, 176, 78, P.dangerT, 12) + T(300, 44, '1 jar: no', { s: 13, f: P.danger }) + T(300, 72, 'preheat(temp)', { s: 14, m: true }) +
    box(408, 16, 176, 78, P.okT, 12) + T(496, 44, '2 jars: yes', { s: 13, f: P.ok }) + T(496, 72, 'preheat(self, temp)', { s: 12.5, m: true }));
  const fixPic = `<div style="width:100%;min-width:0">${run(fixed, { title: 'forgot_self.py' })}${countSvg}</div>`;

  /* ---- Try it: a method that hands back text ---- */
  const blender = [
    'class Blender:',
    '    def __init__(self):',
    '        self.jug = []',
    '',
    '    def add(self, item):',
    '        self.jug.append(item)',
    '',
    '    def blend(self):',
    '        drink = " + ".join(self.jug)',
    '        self.jug = []                 # empty the jug',
    '        return f"Smoothie: {drink}"',
    '',
    'blender = Blender()',
    'blender.add("banana")',
    'blender.add("soy milk")',
    'blender.add("peanut butter")',
    'bens = blender.blend()               # Ben\'s after the gym',
    'print(bens)',
    'print(blender.jug)'
  ];

  /* ---- The catch: forget self. inside, and when a plain function is better ---- */
  const lost = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):',
    '        temp = temp           # forgot self.',
    '',
    '    def is_ready(self, recipe_temp):',
    '        return self.temp >= recipe_temp',
    '',
    'oven = Oven()',
    'oven.preheat(180)',
    'print(oven.temp, oven.is_ready(180))'
  ];
  const plain = code([
    'def c_to_f(celsius):      # needs no oven',
    '    return celsius * 9 / 5 + 32',
    '',
    'print(c_to_f(180))             # 356.0'
  ], { title: 'convert.py', good: [1, 2] });
  const catchPic = `<div style="width:100%;min-width:0">${run(lost, { title: 'lost_heat.py' })}${plain}</div>`;

  COURSE.add({
    id: 'l68', minutes: 13,
    summary: 'A <b>method</b> is a function written <b>inside the class</b>. It is a button on every object made from that class. Its first parameter is <b>self</b>: <code>def preheat(self, temp):</code>. When you call <code>oven.preheat(180)</code>, Python really runs <code>Oven.preheat(oven, 180)</code>: the object <b>in front of the dot</b> goes into <code>self</code>, and you never pass it yourself. Inside, <code>self.temp = temp</code> changes <b>this</b> object\'s own data, and a method can <b>return</b> an answer, like <code>oven.is_ready(180)</code> gives <code>True</code>. Forget <code>self</code> in the <code>def</code> and Python stops with <code>TypeError: Oven.preheat() takes 1 positional argument but 2 were given</code>. Forget the brackets and nothing happens: <code>&lt;bound method Oven.preheat ...&gt;</code>. Methods keep the <b>data and what you can do with it together</b>, so the wrong thing cannot be preheated by mistake.',
    video: {
      src: 'videos/l68-methods.mp4', poster: 'videos/l68-methods.jpg', length: '1 min 13 s',
      script: [
        'Chloe wants gluten-free banana bread. It bakes at 180 degrees. So Kitchen Coach gets an oven.',
        'Here is the template. Class Oven. Every new oven starts cold, at 0.',
        'Give it a button. A method is a function inside the class. Def preheat. Self, then temp.',
        'Press it. Oven dot preheat, 180.',
        'Wait. Preheat has 2 jars, and you gave 1 value. Where is self?',
        'Python fills it in. Oven dot preheat, 180, is really Oven dot preheat, oven, 180. The object in front of the dot becomes self.',
        'Self dot temp is this oven\'s own dial. 0 becomes 180.',
        'A method can answer, too. Is ready, 180? True. The lamp turns green.',
        'Now forget self in the def. Type error. Preheat takes 1 positional argument, but 2 were given. The oven still comes in, with no jar for it.',
        'A method is what an object can do. Python hands it the object as self.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'An appliance comes with its own buttons.',
        text: [
          'Chloe wants gluten-free banana bread, baked at <b>180 °C</b>. So Kitchen Coach needs an oven. In lesson 67 you made objects that <b>know</b> things: <code>self.name</code>, <code>self.protein</code>. An oven must also <b>do</b> things. It preheats. It tells you when it is ready.',
          'You could keep the oven as a dict and write a loose recipe card for it, <code>def preheat(appliance, temp):</code>. Press <b>Run</b> on <b>loose.py</b>. It works for the oven. But the card takes <b>any</b> dict, so <code>preheat(pantry, 180)</code> happily "heats" the rice: <code>{\'rice\': 900, \'temp\': 180}</code>. No error. Nothing ties the card to the thing it is for.',
          'A <b>method</b> fixes that. It is a function written <b>inside the class</b>, so it becomes a <b>button on every object</b> of that kind. Every oven has a <code>preheat</code> button. A pantry has none, so <code>pantry.preheat(180)</code> would stop with an <code>AttributeError</code> (lesson 65) instead of quietly doing the wrong thing. The data and what you can do with it live <b>together</b>.'
        ],
        tip: 'You have pressed methods since lesson 9: <code>"pasta".upper()</code>, <code>shopping.append("tofu")</code>. Somebody wrote those inside the classes str and list. Now you write your own.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A def inside the class, with self first.',
        text: [
          'A method is written like any function (lesson 44), but <b>pushed in under the class</b>, next to <code>__init__</code>. Its first parameter is always <code>self</code>. <code>preheat(self, temp)</code> sets the oven\'s own dial with <code>self.temp = temp</code>. <code>is_ready(self, recipe_temp)</code> <b>returns</b> an answer, <code>True</code> or <code>False</code>, like the cards in lesson 45.',
          'You call it with the dot and brackets: <code>oven.preheat(180)</code>. You pass <b>one</b> value, but the method has <b>two</b> jars. Python fills the first one for you. <code>oven.preheat(180)</code> is really <code>Oven.preheat(oven, 180)</code>: the object <b>in front of the dot</b> goes into <code>self</code>, and 180 goes into <code>temp</code>. So <code>self</code> always means "this oven, the one you pressed".',
          'Press <b>Run</b>: <code>0</code>, <code>False</code>, then it heats, then <code>180</code> and <code>True</code>. Our oven is instant. A real one takes about 10 minutes. Now add a line at the end, <code>Oven.preheat(oven, 200)</code>, and <code>print(oven.temp)</code>. It prints <code>Heating to 200 C</code> and <code>200</code>: the long way does exactly the same thing.'
        ],
        tip: '<code>self</code> is only a name, but every Python programmer uses it. Always call the first jar <code>self</code>, and VS Code and other people will understand your code at once.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Forget self, and the oven has nowhere to go.',
        text: [
          'Ben writes the oven from memory and leaves out <code>self</code>: <code>def preheat(temp):</code>. Press <b>Run</b> on <b>forgot_self.py</b>. Python stops: <code>TypeError: Oven.preheat() takes 1 positional argument but 2 were given</code>.',
          'But you gave only one, 180! Count again the way Python does. <code>oven.preheat(180)</code> hands over the oven <b>and</b> 180. That is 2. The <code>def</code> has 1 jar. A "positional argument" is a value handed over by its place in the brackets (lesson 46). So "1 but 2 were given" almost always means <b>a missing self</b>.',
          'The other slip is forgetting the brackets. <code>oven.preheat</code> on its own does not press the button. Nothing heats, and no error tells you. <code>print(oven.preheat)</code> shows the button itself: <code>&lt;bound method Oven.preheat of &lt;__main__.Oven object at 0x...&gt;&gt;</code>. "Bound" means it is already tied to this oven, waiting to be pressed. You saw <code>&lt;built-in method upper ...&gt;</code> in lesson 65. Same idea, your own button.'
        ],
        warn: 'When a method stops with "takes N positional arguments but N+1 were given", look at its <code>def</code> line first. Is <code>self</code> there?'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'self first in the def. self. in front of what it keeps.',
        text: [
          '1. Put <code>self</code> <b>first</b> in every method\'s <code>def</code>, even when the method does not seem to need it.',
          '2. Inside, write <code>self.</code> in front of everything the object should <b>keep</b>: <code>self.temp = temp</code>. The plain name <code>temp</code> is just the jar for the value you passed in.',
          '3. Call it with <b>brackets</b>: <code>oven.preheat(180)</code>.',
          'Press <b>Run</b>. Lines 12 and 13 make a second oven for Ana\'s roast potatoes at 200 °C. Each oven has its <b>own</b> self, so each keeps its own dial: <code>180 200</code>. One class, one <code>preheat</code>, many ovens.'
        ],
        tip: 'Read the error with your fingers: count the values in the call, then add 1 for the object in front of the dot. Compare it with the jars in the <code>def</code>.'
      },
      {
        label: 'Try it', pic: run(blender, { title: 'blender.py' }),
        h: 'A method can hand back an answer.',
        text: [
          'The blender keeps a jug, a list (lesson 31). <code>add</code> changes the jug and returns nothing. <code>blend</code> joins everything in the jug with <code>.join()</code> (lesson 31), <b>empties</b> it, and <b>returns</b> a line of text. Press <b>Run</b>: <code>Smoothie: banana + soy milk + peanut butter</code>, then <code>[]</code>. The jug is empty again.',
          'Now make Chloe\'s after Ben\'s. Under <code>print(bens)</code>, add strawberries and oat milk, blend again and print it. The jug starts empty, so Ben\'s banana is not in Chloe\'s drink.',
          'Then write your own method. Inside the class, add <code>def count(self):</code> that returns <code>len(self.jug)</code>. Call it after two <code>add</code>s and print what it hands back: <code>2</code>.'
        ],
        tip: 'A method that changes the object, like <code>add</code>, usually returns nothing. A method that answers a question, like <code>blend</code> or <code>is_ready</code>, returns the answer. Lists work the same way: <code>.append()</code> gives <code>None</code> (lesson 34).'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Forget self. inside, and the heat is lost.',
        text: [
          'This one gives <b>no error</b>, which makes it worse. Line 6 says <code>temp = temp</code> instead of <code>self.temp = temp</code>. Press <b>Run</b>: <code>0 False</code>. The oven never heated.',
          'Without <code>self.</code>, <code>temp</code> is a name that lives only in the method\'s own pan (lesson 47). It is gone when the method ends. Only <code>self.temp</code> is stuck to the oven. Add <code>self.</code> back and run it again: <code>180 True</code>.',
          'And not every function needs to be a method. <code>c_to_f(celsius)</code> turns a recipe\'s Celsius into Fahrenheit. It needs no oven and no <code>self</code>, so keep it a plain function. Make something a method when it <b>reads or changes the object\'s own data</b>.'
        ],
        warn: 'Next lesson, Attributes: what an object knows about itself, how to change it from outside, and data that every oven shares.'
      }
    ],
    exercises: [
      {
        file: 'l68_kitchen_scale.py', title: 'Ben\'s kitchen scale',
        task: 'Ben weighs his breakfast for protein: <b>80 g</b> of oats and <b>150 g</b> of yogurt. Give the class <code>Scale</code> three methods: <code>add(grams)</code> puts more on the scale, <code>total()</code> <b>returns</b> the grams on it now, and <code>reset()</code> empties it back to 0. Then <code>scale.total()</code> gives <b>230</b>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The class has no methods yet, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, write the three methods inside the class, pushed in under <code>__init__</code>. Each one starts with <code>self</code>.',
          'Run the file until it says <code>PASS</code>. The check also uses two scales at once, so keep the grams on <code>self</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'You write <code>oven.preheat(200)</code>. What does Python really run?',
        options: ['Oven.preheat(oven, 200)', 'Oven.preheat(200)', 'preheat(self, 200)', 'oven.preheat(oven, 200)'],
        answer: 0,
        why: 'Python finds <code>preheat</code> in the class <code>Oven</code> and hands it the object in front of the dot as the first value. That fills <code>self</code>. Then 200 fills <code>temp</code>.',
        hint: 'Where does the method live, and what goes into self?'
      },
      {
        type: 'fix', q: 'Python stops with <code>TypeError: Oven.preheat() takes 1 positional argument but 2 were given</code>. Fix it so it prints <code>180</code>.',
        code: noSelf, title: 'forgot_self.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["180"]:',
          '    ok = True',
          'else:',
          '    msg = "It should print exactly one line: 180."'
        ].join('\n'),
        why: 'The call hands over 2 values, the oven and 180, but <code>def preheat(temp)</code> has 1 jar. Put <code>self</code> first: <code>def preheat(self, temp):</code>.',
        hint: 'Count the jars in the def on line 5. What is missing in front of temp?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Oven:', '    def __init__(self):', '        self.temp = 0', '', '    def preheat(self, temp):', '        self.temp = temp', '', 'big = Oven()', 'small = Oven()', 'big.preheat(220)', 'print(big.temp, small.temp)'], { title: 'two_ovens.py' }),
        options: ['220 0', '220 220', '0 0', '0 220'],
        answer: 0,
        why: '<code>big.preheat(220)</code> runs with <code>self</code> = big, so only big\'s dial changes. <code>small</code> has its own <code>self.temp</code>, still 0.',
        hint: 'Which oven was in front of the dot?'
      },
      {
        type: 'fix', q: 'Ana\'s pasta needs 12 minutes, but this prints <code>0</code>. No error. Fix the method so it prints <code>12</code>.',
        code: ['class Timer:', '    def __init__(self):', '        self.minutes = 0', '', '    def set(self, minutes):', '        minutes = minutes', '', 'timer = Timer()', 'timer.set(12)          # Ana\'s pasta', 'print(timer.minutes)'],
        title: 'timer.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["12"]:',
          '    ok = True',
          'else:',
          '    msg = "It should print exactly one line: 12."'
        ].join('\n'),
        why: '<code>minutes = minutes</code> only fills a jar inside the method, and it is gone when the method ends (lesson 47). <code>self.minutes = minutes</code> keeps it on this timer.',
        hint: 'What has to go in front of the name on line 6 so the timer keeps it?'
      },
      {
        type: 'order', q: 'Python runs <code>oven.preheat(180)</code>. Put the steps in order.',
        items: ['Look at oven: it is an Oven', 'Find preheat in the class Oven', 'Put oven in self and 180 in temp', 'Run the lines of preheat: self.temp = 180'],
        why: 'The dot asks the object. Python looks up the method in its class, fills <code>self</code> with the object and the other jars with your values, then runs the method\'s lines.',
        hint: 'Python has to know the type before it can find the button.'
      },
      {
        type: 'pick', q: 'Back to lesson 45. What does this print?',
        pic: code(['class Scale:', '    def __init__(self):', '        self.grams = 0', '', '    def add(self, grams):', '        self.grams = self.grams + grams', '', '    def total(self):', '        print(self.grams)', '', 'scale = Scale()', 'scale.add(80)', 'oats = scale.total()', 'print(oats)'], { title: 'scale.py' }),
        options: ['80, then None', '80, then 80', 'Only 80', 'None, then 80'],
        answer: 0,
        why: '<code>total()</code> <b>prints</b> 80 but returns nothing, so <code>oats</code> is <code>None</code>. A method follows the same rule as any card: to hand a value back, use <code>return self.grams</code>.',
        hint: 'Lesson 45: what does a function hand back when it only prints?'
      },
      {
        type: 'pick', q: '<code>is_ready</code> is <code>def is_ready(self, recipe_temp):</code>. Kitchen Coach calls <code>oven.is_ready(180, 10)</code>. Why does the error say <b>3</b>?',
        pic: term(['TypeError: Oven.is_ready() takes 2 positional arguments but 3 were given'], 'terminal'),
        options: ['The oven counts too: oven, 180 and 10', 'Python counts from 0', 'self counts twice', '10 is counted as two digits'],
        answer: 0,
        why: 'The object in front of the dot is always handed over first. So 3 values arrive, oven, 180 and 10, for 2 jars, <code>self</code> and <code>recipe_temp</code>. Drop the 10.',
        hint: 'Add 1 for the object in front of the dot.'
      },
      {
        type: 'fill', q: 'Finish the method and the line that uses it, so the program prints <code>180</code>.',
        text: 'class Oven:\n    def __init__(self):\n        self.temp = 0\n\n    def ___(___, temp):\n        self.temp = temp\n\noven = Oven()\noven.preheat(180)\nprint(oven.___)',
        options: ['preheat', 'self', 'temp', 'oven', 'Oven', 'preheat()'],
        answer: ['preheat', 'self', 'temp'],
        why: 'The method\'s name is what you press after the dot. Its first jar is <code>self</code>. And <code>oven.temp</code> reads what the oven keeps, with no brackets, because it is something the oven knows.',
        hint: 'The first jar of every method has the same name.'
      }
    ]
  });
})();
