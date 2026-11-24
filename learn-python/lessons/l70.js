/* Lesson 70: Inheritance (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l70  Inheritance
     ===================================================================== */

  // The parent class. Shown in full in kitchen.py, then seeded as appliance.py
  // next to the later boxes, so they can import it (lesson 60).
  const applianceLines = [
    'class Appliance:',
    '    def __init__(self, name, watts):',
    '        self.name = name',
    '        self.watts = watts',
    '        self.on = False',
    '',
    '    def start(self):',
    '        self.on = True',
    '        print(f"{self.name} is on")',
    '',
    '    def stop(self):',
    '        self.on = False',
    '        print(f"{self.name} is off")',
    '',
    '    def power_cost(self, minutes):',
    '        kwh = self.watts / 1000 * minutes / 60',
    '        return round(kwh * 0.30, 2)     # 0.30 per kWh'
  ];
  const FILES = { 'appliance.py': applianceLines.join('\n') + '\n' };

  /* small pill inside an SVG card */
  const pill = (x, y, w, s, o) => {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${o.fill || P.ink}"${o.dash ? ` stroke="${o.dash}" stroke-width="2" stroke-dasharray="5 4"` : ''}/>` +
      T(x + w / 2, y + 18, s, { s: 12.5, m: true, f: o.f || '#fff' });
  };

  /* ---- The idea: a family tree of appliances ---- */
  const treeSvg = svg(600, 330, 'A family tree. At the top, the parent class Appliance: it knows name, watts and on, and it can start(), stop() and power_cost(). Below it, two children: class Blender(Appliance) and class Kettle(Appliance). An arrow labelled "is a" goes up from each child to the parent. Each child gets everything the parent has, without writing it again.',
    box(150, 14, 300, 140, P.white, 16) +
    `<rect x="164" y="28" width="110" height="26" rx="13" fill="${P.tint}"/>` + T(219, 46, 'Appliance', { s: 13, m: true, f: P.accent }) +
    T(368, 46, 'the parent', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 80, 'knows: name, watts, on', { s: 13, w: 700, f: P.ink2 }) +
    pill(166, 98, 82, 'start()') + pill(256, 98, 74, 'stop()') + pill(338, 98, 100, 'power_cost()') +
    arrow(160, 226, 232, 162, P.ok, 3) + arrow(440, 226, 368, 162, P.ok, 3) +
    `<rect x="148" y="176" width="54" height="24" rx="12" fill="${P.okT}"/>` + T(175, 193, 'is a', { s: 12.5, f: P.ok }) +
    `<rect x="398" y="176" width="54" height="24" rx="12" fill="${P.okT}"/>` + T(425, 193, 'is a', { s: 12.5, f: P.ok }) +
    box(24, 232, 262, 82, P.white, 14) +
    T(155, 262, 'class Blender(Appliance)', { s: 13.5, m: true }) + T(155, 292, 'gets all 3 buttons for free', { s: 12, w: 700, f: P.ink2 }) +
    box(314, 232, 262, 82, P.white, 14) +
    T(445, 262, 'class Kettle(Appliance)', { s: 13.5, m: true }) + T(445, 292, 'gets all 3 buttons for free', { s: 12, w: 700, f: P.ink2 }));

  const kettleLines = applianceLines.concat([
    '',
    '',
    'class Kettle(Appliance):         # a kettle is an appliance',
    '    pass',
    '',
    'kettle = Kettle("kettle", 2000)  # tea for Ana',
    'kettle.start()',
    'kettle.stop()',
    'print(kettle.power_cost(3))      # 3 minutes to boil',
    'print(kettle.watts, kettle.on)'
  ]);
  const ideaPic = `<div style="width:100%;min-width:0">${treeSvg}${run(kettleLines, { title: 'kitchen.py' })}</div>`;

  /* ---- The code: override start, and how Python finds a method ---- */
  const blenderLines = [
    'from appliance import Appliance    # the class from kitchen.py',
    '',
    'class Blender(Appliance):',
    '    def start(self):               # Blender\'s own start',
    '        self.on = True',
    '        print(f"{self.name} goes whirr")',
    '',
    'blender = Blender("blender", 1000)',
    'blender.start()            # found in Blender',
    'blender.stop()             # not in Blender: found in Appliance',
    'print(blender.power_cost(6))'
  ];
  const lookupSvg = svg(600, 236, 'How Python finds a method. blender.start(): Python looks in Blender first and finds start there, so the blender goes whirr and the parent\'s start is never reached. blender.stop(): Python looks in Blender, finds no stop, climbs the "is a" arrow to Appliance, and finds stop there.',
    T(140, 40, 'blender.stop()', { s: 17, m: true }) +
    T(140, 66, '1. look in Blender: no stop', { s: 12.5, f: P.danger }) +
    T(140, 88, '2. climb up to Appliance: found', { s: 12.5, f: P.ok }) +
    T(140, 160, 'blender.start()', { s: 17, m: true }) +
    T(140, 186, 'look in Blender: found at once', { s: 12.5, f: P.ok }) +
    T(140, 208, 'Appliance\'s start is never reached', { s: 12, w: 700, f: P.ink2 }) +
    box(300, 14, 284, 86, P.white, 14) +
    T(442, 40, 'Appliance', { s: 14, m: true, f: P.accent }) +
    pill(312, 58, 76, 'start()', { fill: '#cfcbd9', f: P.ink2 }) + pill(396, 58, 70, 'stop()', { fill: P.ok }) + pill(474, 58, 100, 'power_cost()') +
    arrow(442, 146, 442, 106, P.ok, 3) + T(470, 132, 'is a', { s: 12.5, f: P.ok, a: 'start' }) +
    box(300, 150, 284, 76, P.white, 14) +
    T(442, 176, 'Blender(Appliance)', { s: 14, m: true, f: P.accent }) +
    pill(330, 190, 80, 'start()', { fill: P.ok }) + pill(426, 190, 128, 'no stop here', { fill: P.dangerT, f: P.danger, dash: P.danger }));
  const codePic = `<div style="width:100%;min-width:0">${run(blenderLines, { title: 'blender.py', files: FILES })}${lookupSvg}</div>`;

  /* ---- The pain: your own __init__ replaces the parent's ---- */
  const forgotLines = [
    'from appliance import Appliance',
    '',
    'class Blender(Appliance):',
    '    def __init__(self, name, watts, speeds):',
    '        self.speeds = speeds',
    '',
    'blender = Blender("blender", 1000, 3)   # Ben\'s blender',
    'print(blender.speeds)',
    'print(blender.power_cost(6))'
  ];
  const painTerm = term([
    '$ python3 speeds.py',
    '3',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/speeds.py", line 9, in <module>',
    '    print(blender.power_cost(6))',
    '          ~~~~~~~~~~~~~~~~~~^^^',
    '  File "/Users/you/kitchen/appliance.py", line 16, in power_cost',
    '    kwh = self.watts / 1000 * minutes / 60',
    '          ^^^^^^^^^^',
    'AttributeError: \'Blender\' object has no attribute \'watts\''
  ], 'terminal, Python 3.15');
  const painPic = `<div style="width:100%;min-width:0">${run(forgotLines, { title: 'speeds.py', files: FILES })}${painTerm}</div>`;

  /* ---- The fix: super().__init__ first, then your own ---- */
  const fixedLines = [
    'from appliance import Appliance',
    '',
    'class Blender(Appliance):',
    '    def __init__(self, name, watts, speeds):',
    '        super().__init__(name, watts)    # 1. the parent\'s setup',
    '        self.speeds = speeds             # 2. then your own',
    '',
    '    def start(self):',
    '        self.on = True',
    '        print(f"{self.name} goes whirr")',
    '',
    'blender = Blender("blender", 1000, 3)',
    'blender.start()',
    'print(blender.watts, blender.speeds, blender.on)',
    'print(blender.power_cost(6))'
  ];
  const superSvg = svg(600, 176, 'What super().__init__ does. Blender("blender", 1000, 3) runs Blender.__init__. Its first line, super().__init__(name, watts), runs the parent\'s setup, Appliance.__init__, which puts name, watts and on on the blender. The second line adds the blender\'s own speeds. So the blender has name, watts, on and speeds.',
    box(16, 16, 296, 104, P.white, 14) +
    T(164, 42, 'Blender.__init__', { s: 14, m: true, f: P.accent }) +
    T(164, 72, '1. super().__init__(name, watts)', { s: 12.5, m: true }) +
    T(164, 100, '2. self.speeds = speeds', { s: 12.5, m: true }) +
    arrow(316, 66, 360, 66, P.ok, 3) +
    box(366, 16, 218, 104, P.okT, 14) +
    T(475, 42, 'Appliance.__init__', { s: 14, m: true, f: P.ok }) +
    T(475, 72, 'self.name, self.watts', { s: 12.5, m: true }) +
    T(475, 100, 'self.on = False', { s: 12.5, m: true }) +
    T(300, 156, 'the blender has: name, watts, on (from the parent) + speeds (its own)', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${run(fixedLines, { title: 'speeds.py', files: FILES })}${superSvg}</div>`;

  /* ---- Try it: the is-a test in code ---- */
  const familyLines = [
    'from appliance import Appliance',
    '',
    'class Kettle(Appliance):',
    '    pass',
    '',
    'class Blender(Appliance):',
    '    def start(self):',
    '        self.on = True',
    '        print(f"{self.name} goes whirr")',
    '',
    'kettle = Kettle("kettle", 2000)',
    'blender = Blender("blender", 1000)',
    '',
    'for thing in [kettle, blender]:   # tea for Ana, smoothie for Ben',
    '    thing.start()',
    '',
    'print(isinstance(blender, Appliance))',
    'print(isinstance(blender, Kettle))',
    'print(issubclass(Kettle, Appliance))',
    'print(issubclass(Appliance, object))'
  ];

  /* ---- The catch: keep the tree shallow, and is-a only ---- */
  const deepCode = code([
    'class Appliance:',
    '    pass',
    'class ElectricAppliance(Appliance):',
    '    pass',
    'class CountertopAppliance(ElectricAppliance):',
    '    pass',
    'class MotorAppliance(CountertopAppliance):',
    '    pass',
    'class Blender(MotorAppliance):     # where is start() now?',
    '    pass'
  ], { title: 'too_deep.py', bad: [3, 5, 7, 9] });
  const hasCode = code([
    'class Kitchen(Oven):    # "a kitchen is an oven"? No.',
    '    pass',
    '',
    'home = Kitchen()',
    'home.preheat(180)       # runs, but makes no sense'
  ], { title: 'kitchen.py', bad: [1, 5] });
  const catchPic = `<div style="width:100%;min-width:0">${deepCode}${hasCode}</div>`;

  COURSE.add({
    id: 'l70', minutes: 14,
    summary: '<b>Inheritance</b> makes a new class from an old one. <code>class Blender(Appliance):</code> puts the <b>parent</b> in brackets, and the <b>child</b> gets every method of the parent without writing it again: <code>blender.stop()</code> works even though Blender has no <code>stop</code>. Python looks in the child first, then <b>climbs up</b> to the parent. Write a method again in the child to <b>override</b> it: Blender\'s own <code>start</code> goes "whirr". If the child needs its own <code>__init__</code>, call the parent\'s setup first with <code>super().__init__(name, watts)</code>, then add your own, like <code>self.speeds</code>. Forget it and the parent\'s setup never runs: <code>AttributeError: \'Blender\' object has no attribute \'watts\'</code>. Use it only when the <b>is a</b> test passes ("a blender is an appliance"). <code>isinstance(blender, Appliance)</code> is <code>True</code>, and every class inherits from <code>object</code>. Keep the tree <b>shallow</b>: one or two levels.',
    video: {
      src: 'videos/l70-inheritance.mp4', poster: 'videos/l70-inheritance.jpg', length: '1 min 12 s',
      script: [
        'Ana wants tea. Ben wants a protein smoothie. Kitchen Coach already has an appliance class. It knows a name and its watts. It can start, stop, and work out its power cost.',
        'A kettle is a kind of appliance. So is a blender. Put the parent in brackets. Class Blender, Appliance. The child gets every method, without writing them again.',
        'Blender dot stop. Python looks in Blender first. No stop there. So it climbs up to Appliance. Found it.',
        'But a blender does not just turn on. It goes whirr. Write start again, inside Blender. That overrides the parent.',
        'Ben\'s blender has 3 speeds, so it gets its own init. Now ask for the power cost. Attribute error. Blender object has no attribute watts. The new init replaced the parent\'s setup.',
        'Call super, dot init, with name and watts, first. Watts is back. 6 minutes cost 0.03.',
        'A child class gets everything from its parent. Change only what is different.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A blender is a kind of appliance.',
        text: [
          'Ana wants tea after her long run. Ben wants a protein smoothie after the gym. Kitchen Coach already has a class <code>Appliance</code>. It knows a <b>name</b>, its <b>watts</b> and whether it is <b>on</b>. It can <code>start()</code>, <code>stop()</code> and work out its <code>power_cost()</code>.',
          'A kettle is an appliance. A blender is an appliance too. You could copy all 17 lines into a <code>Kettle</code> class and again into a <code>Blender</code> class. Then a fix to <code>power_cost</code> has to be made in three places, and one gets forgotten.',
          '<b>Inheritance</b> says it once. <code>class Kettle(Appliance):</code> puts the <b>parent</b> class in the brackets. The new class is the <b>child</b>. It gets <b>every method</b> of the parent, for free. Here the child is empty, just <code>pass</code> (lesson 66). Press <b>Run</b>: the kettle starts, stops, and boiling for 3 minutes costs <code>0.03</code>. 2000 W for 3 minutes is 0.1 kWh, at 0.30 per kWh.'
        ],
        tip: 'Before you inherit, say it out loud: "a kettle <b>is an</b> appliance". If the sentence sounds right, inheritance fits. That is the <b>is a</b> test.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Change only what is different.',
        text: [
          'A blender does not just turn on. It goes <b>whirr</b>. So <code>Blender</code> writes its <b>own</b> <code>start</code>. A method in the child with the same name as one in the parent <b>overrides</b> it: the child\'s version wins. This box has the <code>Appliance</code> class from kitchen.py saved next to it as appliance.py, so line 1 imports it (lesson 60).',
          'How does Python choose? For <code>blender.start()</code> it looks in <code>Blender</code> first, finds <code>start</code>, and runs it: <code>blender goes whirr</code>. For <code>blender.stop()</code> it looks in <code>Blender</code>, finds no <code>stop</code>, and <b>climbs up</b> to <code>Appliance</code>. Found. <code>blender is off</code>.',
          'Press <b>Run</b>. Then add a line at the end: <code>print(Blender.__mro__)</code>. That is the order Python climbs: <code>Blender</code>, then <code>Appliance</code>, then <code>object</code>. You will meet <code>object</code> in Try it.'
        ],
        tip: 'Override only what is different. Blender does not copy <code>stop</code> or <code>power_cost</code>: they already work. Six minutes of blending, for Ben\'s smoothie and two more, cost <code>0.03</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Your own __init__ replaces the parent\'s.',
        text: [
          'Ben\'s blender has <b>3 speeds</b>. The blender should remember that, so it gets its own <code>__init__</code> with a <code>speeds</code> jar (lesson 67). Press <b>Run</b>. <code>print(blender.speeds)</code> works: <code>3</code>. Then Python stops: <code>AttributeError: \'Blender\' object has no attribute \'watts\'</code>.',
          'But you passed 1000 watts! The trouble is the lookup from The code. <code>__init__</code> is a method like any other. Blender now has its own, so Python finds it in Blender and <b>never climbs up</b> to <code>Appliance.__init__</code>. The parent\'s setup never ran. Nothing ever wrote <code>self.watts</code>, <code>self.name</code> or <code>self.on</code>.',
          'Read the error the lesson 4 way, from the bottom. It points into <b>appliance.py</b>, at <code>self.watts</code> in <code>power_cost</code>. The parent\'s method is fine. It reaches for something its own <code>__init__</code> would have set up.'
        ],
        warn: 'A child with its own <code>__init__</code> and an <code>AttributeError</code> about a parent\'s attribute almost always means one thing: the parent\'s setup was never called.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Call the parent\'s setup first, with super().',
        text: [
          '<code>super()</code> means "my parent class". So <code>super().__init__(name, watts)</code> runs <code>Appliance.__init__</code> for this blender. It puts <code>name</code>, <code>watts</code> and <code>on</code> on it, as it always did. You do not pass <code>self</code>: Python hands it over, just like in lesson 68.',
          '1. <b>First</b> line of the child\'s <code>__init__</code>: <code>super().__init__(...)</code> with what the parent needs.',
          '2. <b>Then</b> add what is new: <code>self.speeds = speeds</code>.',
          'Press <b>Run</b>: <code>blender goes whirr</code>, <code>1000 3 True</code>, <code>0.03</code>. The parent sets up what every appliance has. The child adds only what is different.'
        ],
        tip: '<code>super()</code> works in any method. An overriding <code>start</code> could call <code>super().start()</code> to do the parent\'s job too, then add its own line.'
      },
      {
        label: 'Try it', pic: run(familyLines, { title: 'family.py', files: FILES }),
        h: 'Ask Python: is this a kind of that?',
        text: [
          'The loop (lesson 35) calls <code>start()</code> on each appliance. Each one does its own: the kettle uses the parent\'s start, the blender its own whirr. The loop does not care which kind it holds.',
          '<code>isinstance(blender, Appliance)</code> asks the is-a question in code: <code>True</code>, a blender is an appliance. A blender is not a kettle: <code>False</code>. They are sisters, not parent and child. <code>issubclass(Kettle, Appliance)</code> asks the same about two classes.',
          'The last line says <code>True</code>: <b>every class inherits from <code>object</code></b>, even one with no brackets. That is where the names with underscores in <code>dir()</code> came from in lesson 65, like <code>__eq__</code> and <code>__init__</code>. Now give <code>Kettle</code> its own <code>start</code> that prints <code>kettle clicks on</code>, and run it again.'
        ],
        tip: '<code>isinstance</code> is the usual way to check a type. <code>type(blender) == Appliance</code> is <code>False</code>, because the type is exactly Blender. <code>isinstance</code> also says yes to children.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Keep the family small, and only for "is a".',
        text: [
          '<b>Deep trees hurt.</b> Five levels of parents means that to find out what <code>blender.start()</code> does, you open five classes. A fix high up changes everything below it. Keep inheritance <b>shallow</b>: a parent and its children, two levels, maybe three.',
          '<b>"Has a" is not "is a".</b> <code>class Kitchen(Oven):</code> runs, and <code>home.preheat(180)</code> even works. But a kitchen is not an oven. A kitchen <b>has</b> an oven, and a kettle, and a blender. Say the sentence. If "is a" sounds wrong, do not inherit.',
          'For "has a", an object keeps other objects on <code>self</code>, like <code>self.oven = Oven()</code>. That is the next lesson.'
        ],
        warn: 'Next lesson, Composition: a kitchen <b>has</b> an oven. Build bigger objects from smaller ones instead of stacking parents.'
      }
    ],
    exercises: [
      {
        file: 'l70_kitchen_family.py', title: 'Chloe\'s toaster',
        task: 'Chloe toasts gluten-free bread. Write <code>class Toaster(Appliance)</code>. A toaster has <b>slots</b>: <code>Toaster("toaster", 1200, 2)</code>. Its <code>__init__</code> calls <code>super().__init__</code> first, then keeps <code>self.slots</code>. Its own <code>start</code> sets <code>self.on = True</code> and prints <code>toaster glows red</code>. <code>stop</code> and <code>power_cost</code> come from the parent: 5 minutes of toast cost <code>0.03</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. There is no Toaster yet, so the check gives the first hint.',
          'Leave <code>Appliance</code> as it is. Between <code>START</code> and <code>END</code>, write <code>class Toaster(Appliance):</code> with <code>__init__</code> and <code>start</code>. Do not copy <code>stop</code> or <code>power_cost</code>.',
          'Run the file until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Appliance:', '    def start(self):', '        print("on")', '', '    def stop(self):', '        print("off")', '', 'class Kettle(Appliance):', '    def start(self):', '        print("click")', '', 'kettle = Kettle()', 'kettle.start()', 'kettle.stop()'], { title: 'kettle.py' }),
        options: ['click, then off', 'on, then off', 'click, on, then off', 'click, then AttributeError: no stop'],
        answer: 0,
        why: '<code>start</code> is found in Kettle first, so the parent\'s is never reached: <code>click</code>. Kettle has no <code>stop</code>, so Python climbs up to Appliance: <code>off</code>.',
        hint: 'Where does Python look first? And where does it look when that fails?'
      },
      {
        type: 'fix', q: 'Python stops with <code>AttributeError: \'Blender\' object has no attribute \'watts\'</code>. Fix the class so it prints <code>3</code> and then <code>0.03</code>.',
        code: forgotLines, title: 'speeds.py', files: FILES,
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["3", "0.03"]:',
          '    ok = True',
          'else:',
          '    msg = "It should print two lines: 3, then 0.03."'
        ].join('\n'),
        why: 'Blender\'s own <code>__init__</code> replaced the parent\'s, so <code>self.watts</code> was never set. Add <code>super().__init__(name, watts)</code> as its first line.',
        hint: 'What has to run before <code>self.speeds = speeds</code> so the blender gets its name and watts?'
      },
      {
        type: 'bucket', q: 'Should the first class inherit from the second? Say the sentence: "a ... is a ..."',
        buckets: ['Is a: inherit', 'Has a: do not inherit'],
        items: [
          ['Kettle from Appliance', 0],
          ['Toaster from Appliance', 0],
          ['Blender from Appliance', 0],
          ['Kitchen from Oven', 1],
          ['Blender from Jug', 1],
          ['Pantry from Rice', 1]
        ],
        why: 'A kettle, a toaster and a blender each <b>is an</b> appliance. A kitchen <b>has</b> an oven, a blender <b>has</b> a jug, and a pantry <b>has</b> rice. Those are "has a", for lesson 71.',
        hint: 'Read it out loud: "a kitchen is an oven". Does that sound right?'
      },
      {
        type: 'order', q: '<code>Blender</code> has its own <code>start</code> but no <code>stop</code>. Python runs <code>blender.stop()</code>. Put the steps in order.',
        items: ['See that blender is a Blender', 'Look for stop in Blender: not there', 'Climb up to the parent, Appliance', 'Find stop in Appliance and run it with self = blender'],
        why: 'Python starts with the object\'s own class, then climbs up the family one step at a time. The first <code>stop</code> it finds wins, and <code>self</code> is still the blender.',
        hint: 'Python always starts with the class that made the object.'
      },
      {
        type: 'pick', q: '<code>Kettle</code> and <code>Blender</code> are both <code>class ...(Appliance)</code>. <code>kettle = Kettle("kettle", 2000)</code>. Which print <code>True</code>?',
        options: ['isinstance(kettle, Appliance)', 'isinstance(kettle, Blender)', 'issubclass(Blender, Appliance)', 'issubclass(Appliance, Blender)', 'isinstance(kettle, object)'],
        answer: [0, 2, 4],
        why: 'A kettle is an appliance, and every object is an <code>object</code>. A kettle is not a blender: they are sisters. And Appliance is the parent of Blender, not its child.',
        hint: 'The question always reads left to right: "is the first a kind of the second?"'
      },
      {
        type: 'fix', q: 'The kettle should say <code>kettle clicks on</code> when it starts. Give <code>Kettle</code> its own <code>start</code>. It must still turn the kettle on, and <code>stop</code> must still come from the parent.',
        code: ['from appliance import Appliance', '', 'class Kettle(Appliance):', '    pass', '', 'kettle = Kettle("kettle", 2000)', 'kettle.start()', 'print(kettle.on)', 'kettle.stop()'],
        title: 'kettle.py', files: FILES,
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["kettle clicks on", "True", "kettle is off"]:',
          '    ok = True',
          'elif lines[:1] == ["kettle is on"]:',
          '    msg = "That is still the parent\'s start. Write def start(self): inside Kettle."',
          'elif lines[1:2] == ["False"]:',
          '    msg = "Your start prints, but the kettle is not on. Add self.on = True."',
          'else:',
          '    msg = "It should print three lines: kettle clicks on, True, kettle is off."'
        ].join('\n'),
        why: 'A <code>start</code> written inside Kettle overrides the parent\'s, so it must do the whole job: <code>self.on = True</code> and the print. <code>stop</code> is not in Kettle, so Python still finds it in Appliance.',
        hint: 'Replace <code>pass</code> with <code>def start(self):</code> and two lines under it.'
      },
      {
        type: 'pick', q: 'Back to lesson 67. Blender\'s <code>__init__</code> is <code>def __init__(self, name, watts, speeds):</code>. What happens with <code>Blender("blender", 1000)</code>?',
        options: [
          'TypeError: Blender.__init__() missing 1 required positional argument: \'speeds\'',
          'AttributeError: \'Blender\' object has no attribute \'speeds\'',
          'It works, and speeds comes from Appliance',
          'TypeError: Appliance.__init__() missing 1 required positional argument: \'speeds\''
        ],
        answer: 0,
        why: 'The child\'s <code>__init__</code> is the one Python runs, and it has 3 jars after <code>self</code>. You gave 2 values, so it stops right at the call. The parent has no speeds at all.',
        hint: 'Which class\'s __init__ runs first, and how many jars does it have?'
      },
      {
        type: 'fill', q: 'Finish the child class so a blender gets the parent\'s setup and keeps its speeds.',
        text: 'class Blender(___):\n    def __init__(self, name, watts, speeds):\n        ___().__init__(name, ___)\n        self.speeds = speeds',
        options: ['Appliance', 'super', 'watts', 'self', 'object', 'speeds'],
        answer: ['Appliance', 'super', 'watts'],
        why: 'The parent goes in the brackets after the class name. <code>super()</code> means that parent, and its <code>__init__</code> needs <code>name</code> and <code>watts</code>. No <code>self</code>: Python passes it.',
        hint: 'What does Appliance.__init__ need, apart from self?'
      }
    ]
  });
})();
