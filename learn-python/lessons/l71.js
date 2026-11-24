/* Lesson 71: Composition (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l71  Composition
     ===================================================================== */

  /* ---- The idea: a kitchen HAS an oven, a fridge and guests ---- */
  const slot = (x, y, w, h, label) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${P.paper}" stroke="${P.ink2}" stroke-width="2" stroke-dasharray="7 6"/>` +
    T(x + w / 2, y + 20, label, { s: 12, w: 800, f: P.ink2 });
  const guest = (cx, cy, letter, name, fill) =>
    `<circle cx="${cx}" cy="${cy}" r="20" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(cx, cy + 6, letter, { s: 16, w: 800, f: '#fff' }) + T(cx, cy + 38, name, { s: 12, w: 700 });
  const ideaPic = svg(600, 300, 'Left: a kitchen floor plan. The Kitchen object has three slots, oven, fridge and guests. An Oven object sits in the oven slot, a Fridge object in the fridge slot, and three Guest objects, Ana, Ben and Chloe, in the guests slot. Caption: a kitchen HAS an oven. Right: the sentence test. A kitchen has an oven: hold it as an attribute, self.oven = Oven(). A blender is an appliance: inherit, class Blender(Appliance).',
    box(16, 16, 300, 268, P.white, 16) +
    `<rect x="30" y="28" width="86" height="24" rx="12" fill="${P.tint}"/>` + T(73, 45, 'kitchen', { s: 12, m: true, f: P.accent }) +
    slot(30, 62, 130, 104, 'self.oven') + slot(172, 62, 130, 104, 'self.fridge') + slot(30, 176, 272, 96, 'self.guests') +
    `<rect x="50" y="92" width="90" height="64" rx="8" fill="#fff" stroke="${P.ink}" stroke-width="2.5"/><circle cx="70" cy="110" r="11" fill="${P.paper}" stroke="${P.ink}" stroke-width="2"/><rect x="58" y="128" width="74" height="22" rx="4" fill="#2a2745"/>` + T(110, 115, 'Oven', { s: 11, m: true }) +
    `<rect x="192" y="88" width="90" height="70" rx="8" fill="#fff" stroke="${P.ink}" stroke-width="2.5"/><line x1="192" y1="108" x2="282" y2="108" stroke="${P.ink}" stroke-width="2.5"/>` + T(237, 136, 'Fridge', { s: 11, m: true }) +
    guest(90, 222, 'A', 'Ana', P.accent) + guest(166, 222, 'B', 'Ben', P.ok) + guest(242, 222, 'C', 'Chloe', P.danger) +
    T(450, 30, 'Say it out loud', { s: 14, w: 800 }) +
    box(336, 48, 248, 104, P.okT, 14) + T(460, 74, 'A kitchen HAS an oven.', { s: 13, w: 800, f: P.ok }) + T(460, 102, 'hold it as an attribute', { s: 12, w: 700, f: P.ink2 }) + T(460, 132, 'self.oven = Oven()', { s: 13, m: true }) +
    box(336, 172, 248, 104, P.warnT, 14) + T(460, 198, 'A blender IS an appliance.', { s: 13, w: 800, f: P.warn }) + T(460, 226, 'inherit (lesson 70)', { s: 12, w: 700, f: P.ink2 }) + T(460, 256, 'class Blender(Appliance)', { s: 12, m: true }));
  const guests = [
    'class Guest:',
    '    def __init__(self, name, diet):',
    '        self.name = name',
    '        self.diet = diet',
    '',
    'class Kitchen:',
    '    def __init__(self):',
    '        self.guests = [',
    '            Guest("Ana", "runner"),',
    '            Guest("Ben", "vegetarian"),',
    '            Guest("Chloe", "gluten-free"),',
    '        ]',
    '',
    '    def dinner_for(self):',
    '        for guest in self.guests:',
    '            print(f"A plate for {guest.name} ({guest.diet})")',
    '',
    'kitchen = Kitchen()',
    'kitchen.dinner_for()',
    'print(kitchen.guests[2].name)'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(guests, { title: 'guests.py' })}</div>`;

  /* ---- The code: a Kitchen that holds an Oven and a Fridge, and asks them ---- */
  const kitchenCode = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):',
    '        self.temp = temp',
    '        print(f"Oven: heating to {temp} C")',
    '',
    'class Fridge:',
    '    def __init__(self):',
    '        self.items = {"butter": 250, "eggs": 360, "tofu": 400}',
    '',
    '    def take(self, item, grams):',
    '        self.items[item] = self.items[item] - grams',
    '',
    'class Kitchen:',
    '    def __init__(self):',
    '        self.oven = Oven()          # a kitchen HAS an oven',
    '        self.fridge = Fridge()      # and HAS a fridge',
    '',
    '    def bake(self, dish, temp):',
    '        self.oven.preheat(temp)     # the oven does the heating',
    '        print(f"Kitchen: baking {dish}")',
    '',
    'kitchen = Kitchen()',
    'kitchen.fridge.take("butter", 100)',
    'kitchen.bake("banana bread", 180)',
    'print(kitchen.oven.temp)',
    'print(kitchen.fridge.items)'
  ];
  const askSvg = svg(600, 150, 'Delegation. You call kitchen.bake("banana bread", 180). The Kitchen has no heater of its own. Inside bake, it passes the job on to the object it holds: self.oven.preheat(180). The Oven changes its own temp to 180.',
    box(16, 34, 176, 80, P.white, 12) + T(104, 64, 'kitchen.bake(...)', { s: 13, m: true }) + T(104, 92, 'you ask the kitchen', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(196, 74, 238, 74, P.accent, 2.5) +
    box(242, 34, 176, 80, P.tint, 12) + T(330, 64, 'self.oven.preheat(180)', { s: 11.5, m: true, f: P.accent }) + T(330, 92, 'it asks its oven', { s: 11.5, w: 700, f: P.accent }) +
    arrow(422, 74, 464, 74, P.accent, 2.5) +
    box(468, 34, 116, 80, P.white, 12) + T(526, 64, 'Oven', { s: 14, m: true }) + T(526, 92, 'temp: 180', { s: 12, m: true, f: P.danger }) +
    T(300, 140, 'passing the job to a part you hold is called delegation', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(kitchenCode, { title: 'kitchen.py' })}${askSvg}</div>`;

  /* ---- The pain: class Kitchen(Oven) ---- */
  const isOven = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):',
    '        self.temp = temp',
    '',
    'class Kitchen(Oven):            # "a kitchen is an oven"?',
    '    def bake(self, dish, temp):',
    '        self.preheat(temp)',
    '        print(f"{dish} in at {self.temp} C")',
    '',
    'kitchen = Kitchen()',
    'kitchen.bake("banana bread", 180)     # Chloe',
    'kitchen.bake("roast potatoes", 200)   # Ana',
    'print(kitchen.temp)                   # a kitchen at 200 C?'
  ];
  const painSvg = svg(600, 170, 'class Kitchen(Oven) makes a kitchen shaped like an oven. It has one dial, kitchen.temp, and the buttons of an oven. Chloe\'s bread wants 180 and Ana\'s potatoes want 200, but there is only one dial, so the bread ends up at 200. There is no place for a fridge or a second oven. Stamp: WRONG.',
    box(16, 16, 250, 138, P.white, 16) +
    `<rect x="30" y="28" width="86" height="24" rx="12" fill="${P.tint}"/>` + T(73, 45, 'kitchen', { s: 12, m: true, f: P.accent }) +
    `<rect x="124" y="28" width="96" height="24" rx="12" fill="${P.warnT}"/>` + T(172, 45, 'is an Oven', { s: 12, m: true, f: P.warn }) +
    `<circle cx="66" cy="102" r="32" fill="${P.paper}" stroke="${P.ink}" stroke-width="3"/>` + T(66, 108, '200', { s: 17, m: true, f: P.danger }) +
    `<rect x="112" y="72" width="140" height="66" rx="8" fill="#2a2745"/>` + T(182, 90, 'bread 180?', { s: 11.5, w: 800, f: '#ffd2a8' }) + T(182, 108, 'potatoes 200', { s: 11.5, w: 800, f: '#ffd2a8' }) +
    `<g transform="rotate(-6 166 134)"><rect x="106" y="116" width="120" height="34" rx="6" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="3"/>` + T(166, 140, 'WRONG', { s: 19, w: 800, f: P.danger }) + `</g>` +
    `<rect x="290" y="24" width="140" height="58" rx="10" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2" stroke-dasharray="6 5"/>` + T(360, 50, 'fridge?', { s: 13, w: 800, f: P.danger }) + T(360, 70, 'no place', { s: 11, w: 700, f: P.danger }) +
    `<rect x="444" y="24" width="140" height="58" rx="10" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2" stroke-dasharray="6 5"/>` + T(514, 50, '2nd oven?', { s: 13, w: 800, f: P.danger }) + T(514, 70, 'no place', { s: 11, w: 700, f: P.danger }) +
    T(437, 112, 'one kitchen, one dial', { s: 13, w: 800 }) + T(437, 136, 'kitchen.temp, kitchen.preheat()', { s: 11.5, m: true, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(isOven, { title: 'is_an_oven.py' })}${painSvg}</div>`;

  /* ---- The fix: hold two Oven objects ---- */
  const hasOvens = [
    'class Oven:',
    '    def __init__(self):',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):',
    '        self.temp = temp',
    '',
    'class Kitchen:                  # a kitchen HAS ovens',
    '    def __init__(self):',
    '        self.oven = Oven()',
    '        self.top_oven = Oven()',
    '',
    '    def bake(self, dish, oven, temp):',
    '        oven.preheat(temp)',
    '        print(f"{dish} in at {oven.temp} C")',
    '',
    'kitchen = Kitchen()',
    'kitchen.bake("banana bread", kitchen.oven, 180)',
    'kitchen.bake("roast potatoes", kitchen.top_oven, 200)',
    'print(kitchen.oven.temp, kitchen.top_oven.temp)'
  ];
  const hotTerm = term([
    '$ python3 two_ovens.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/two_ovens.py", line 21, in <module>',
    '    print(kitchen.temp)',
    '          ^^^^^^^^^^^^',
    "AttributeError: 'Kitchen' object has no attribute 'temp'. Did you mean '.oven.temp' instead of '.temp'?"
  ], 'terminal, Python 3.15');
  const fixPic = `<div style="width:100%;min-width:0">${run(hasOvens, { title: 'two_ovens.py' })}${hotTerm}</div>`;

  /* ---- Try it: swap the part ---- */
  const swap = [
    'class Oven:',
    '    def preheat(self, temp):',
    '        print(f"Oven: heating to {temp} C, about 10 minutes")',
    '',
    'class AirFryer:',
    '    def preheat(self, temp):',
    '        print(f"Air fryer: heating to {temp} C, about 3 minutes")',
    '',
    'class Kitchen:',
    '    def __init__(self, oven):',
    '        self.oven = oven            # any part that can preheat',
    '',
    '    def bake(self, dish, temp):',
    '        self.oven.preheat(temp)',
    '        print(f"Baking {dish}")',
    '',
    'home = Kitchen(Oven())',
    'home.bake("banana bread", 180)',
    '',
    'flat = Kitchen(AirFryer())',
    'flat.bake("roast potatoes", 200)'
  ];

  /* ---- The catch: inheritance is right for is-a, and has-a does not hand you the buttons ---- */
  const blender = [
    'class Appliance:',
    '    def __init__(self, name, watts):',
    '        self.name = name',
    '        self.watts = watts',
    '',
    'class Blender(Appliance):       # a blender IS an appliance',
    '    def blend(self, fruit):',
    '        print(f"{self.name} ({self.watts} W): blending {fruit}")',
    '',
    'class Kitchen:',
    '    def __init__(self):',
    '        self.blender = Blender("blender", 800)   # a kitchen HAS a blender',
    '',
    'kitchen = Kitchen()',
    'kitchen.blender.blend("strawberries")',
    'kitchen.blend("banana")'
  ];

  COURSE.add({
    id: 'l71', minutes: 13,
    summary: 'Objects can hold other objects. A kitchen <b>has</b> an oven, a fridge and guests, so <code>__init__</code> puts them on it as attributes: <code>self.oven = Oven()</code>, <code>self.fridge = Fridge()</code>, <code>self.guests = [Guest("Ana"), ...]</code>. That is called <b>composition</b>. The kitchen does its jobs by <b>asking its parts</b>: <code>bake()</code> calls <code>self.oven.preheat(180)</code> (called <b>delegation</b>), and from outside you can reach in with a chain of dots, <code>kitchen.oven.temp</code>. Writing <code>class Kitchen(Oven)</code> instead says a kitchen <b>is</b> an oven: it gets one dial, <code>kitchen.temp</code>, oven buttons it should not have, and no place for a fridge or a second oven. The test: say it out loud. "A blender <b>is an</b> appliance": inherit (lesson 70). "A kitchen <b>has an</b> oven": hold it as an attribute. When unsure, prefer has-a. A part is easy to swap: any object with a <code>preheat</code> method, like an <code>AirFryer</code>, fits the oven slot.',
    video: {
      src: 'videos/l71-composition.mp4', poster: 'videos/l71-composition.jpg', length: '1 min 9 s',
      script: [
        'Dinner party tonight. Your kitchen has an oven, a fridge, and 3 guests. Ana, Ben and Chloe.',
        'In code, the kitchen holds them. Self dot oven is an Oven. Self dot fridge is a Fridge. Self dot guests is a list of Guest objects.',
        'An object made of other objects. That is called composition.',
        'Now bake Chloe\'s banana bread. Kitchen dot bake. The kitchen does not heat anything. It asks its oven. Self dot oven dot preheat, 180.',
        'Someone tried a shortcut. Class Kitchen, Oven in brackets. That says a kitchen is an oven. Is it? No. Now the kitchen has a temperature, and no place for the fridge or a second oven.',
        'Go back to has a. Swap the oven for an air fryer. It has a preheat button too, so bake still works. Any part with the right buttons fits.',
        'Say it out loud. A blender is an appliance. Inherit. A kitchen has an oven. Hold it as an attribute.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'A kitchen has an oven.',
        text: [
          'Dinner party tonight. Your kitchen <b>has</b> an oven, a fridge, and three guests: Ana, Ben and Chloe. The oven is a thing of its own, with its own dial and buttons (lesson 68). So is the fridge. So is each guest. The kitchen is the big thing that <b>holds</b> them.',
          'In Python, an attribute can hold <b>any</b> object, not only a number or text. So a Kitchen object can keep a whole Oven object in <code>self.oven</code>, and a list of Guest objects in <code>self.guests</code>. An object made of other objects is called <b>composition</b>.',
          'Press <b>Run</b> on <b>guests.py</b>. The kitchen makes its three guests in <code>__init__</code>, and <code>dinner_for()</code> loops over them, one Guest object at a time. The last line reads a chain of dots from left to right: the kitchen, its guests list, item 2, that guest\'s name. <code>Chloe</code>.'
        ],
        tip: 'You have used composition since lesson 41: a dict that holds lists is a box of boxes. Now the boxes are your own objects.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Hold the parts, then ask them.',
        text: [
          'Three classes. <code>Oven</code> knows its <code>temp</code> and can <code>preheat</code>. <code>Fridge</code> keeps a dict of grams (lesson 37) and can <code>take</code> some out. <code>Kitchen</code> makes one of each in its <code>__init__</code>: <code>self.oven = Oven()</code> and <code>self.fridge = Fridge()</code>. Every new kitchen gets its own oven and its own fridge.',
          'The kitchen has no dial of its own. So <code>bake</code> does not heat anything. It <b>asks its oven</b>: <code>self.oven.preheat(temp)</code>. Passing a job to a part you hold is called <b>delegation</b>. The kitchen decides what to cook. The oven knows how to heat.',
          'Press <b>Run</b>. Chloe\'s banana bread needs 100 g of butter, so <code>kitchen.fridge.take("butter", 100)</code> leaves 150 g. Then the oven heats to 180. Now take 200 g of Ben\'s tofu for his stir-fry: add <code>kitchen.fridge.take("tofu", 200)</code> before the last line and run it again. You should see <code>\'tofu\': 200</code>.'
        ],
        tip: 'Read <code>self.oven.preheat(temp)</code> from left to right: this kitchen, its oven, that oven\'s preheat button. Each dot steps one object deeper.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'class Kitchen(Oven): "a kitchen is an oven"?',
        text: [
          'Someone wanted <code>kitchen.preheat()</code> to just work, so they took the shortcut from lesson 70: <code>class Kitchen(Oven)</code>. That makes Kitchen a <b>kind of</b> Oven. It gets every oven method for free. Press <b>Run</b> on <b>is_an_oven.py</b>. No error. That is the trouble.',
          'A kitchen that <b>is</b> an oven has <b>one</b> dial. Chloe\'s bread goes in at 180. Then Ana\'s roast potatoes need 200, so the one dial turns to 200, and the bread is now baking at 200 too. The last line prints <code>200</code>: <code>kitchen.temp</code>, the temperature of a whole kitchen. It makes no sense, and nothing stops it.',
          'And where would the fridge go? A kitchen is not a fridge either. There is no place for a second oven, because the kitchen <b>is</b> the oven. Kitchen also got buttons it should never have: anyone can write <code>kitchen.preheat(250)</code> and heat "the kitchen".'
        ],
        warn: 'Inheriting just to borrow a few methods is the most common class mistake. It works on day one and fights you on every change after.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Hold the oven as an attribute. Hold two if you need two.',
        text: [
          '1. Write <code>class Kitchen:</code> with <b>no brackets</b>. A kitchen is not a kind of anything here.',
          '2. In <code>__init__</code>, make the parts and keep them: <code>self.oven = Oven()</code>, <code>self.top_oven = Oven()</code>. Two separate Oven objects, each with its own dial.',
          '3. In the methods, <b>ask the part</b>. <code>bake</code> now gets the oven to use and calls <code>oven.preheat(temp)</code>.',
          'Press <b>Run</b>: <code>180 200</code>. The bread stays at 180. Now add <code>print(kitchen.temp)</code> at the end. Python stops with <code>AttributeError: \'Kitchen\' object has no attribute \'temp\'</code>. Good: a kitchen has no temperature. Python 3.15 even points you to the right dots, as in the terminal picture: <code>Did you mean \'.oven.temp\'</code>. That hint is <b>new in 3.15</b>. This page runs 3.14, so here you see the error without it.'
        ],
        tip: 'With has-a, adding a part is one more line in <code>__init__</code>: <code>self.fridge = Fridge()</code>, <code>self.blender = Blender()</code>. Nothing else has to change.'
      },
      {
        label: 'Try it', pic: run(swap, { title: 'swap.py' }),
        h: 'Swap a part. Anything with the right buttons fits.',
        text: [
          'This Kitchen does not make its own oven. It <b>takes one in</b>: <code>Kitchen(Oven())</code> or <code>Kitchen(AirFryer())</code>. <code>bake</code> only ever calls <code>self.oven.preheat(temp)</code>. It never asks what kind of thing it holds. Press <b>Run</b>: the same kitchen code heats an oven in one home and an air fryer in a small flat.',
          'An AirFryer is not an Oven. It has no link to the Oven class at all. It fits because it has a <code>preheat</code> method. Python checks the button when it presses it, not the type. Programmers call this <b>duck typing</b>: if it walks like a duck and quacks like a duck, treat it as a duck.',
          'Your turn. Write a third class, <code>GasOven</code>, with a <code>preheat</code> that prints <code>Gas oven: heating to {temp} C, about 7 minutes</code>. Then make <code>Kitchen(GasOven())</code> and bake Ben\'s lentil lasagne at 190.'
        ],
        tip: 'If you give the kitchen something with no <code>preheat</code>, like <code>Kitchen("oven")</code>, the error comes from <code>bake</code>: <code>AttributeError: \'str\' object has no attribute \'preheat\'</code>. The part was missing a button.'
      },
      {
        label: 'The catch', pic: run(blender, { title: 'blender.py' }),
        h: 'Is a: inherit. Has a: hold it.',
        text: [
          'Inheritance is still right when the sentence is true. "A blender <b>is an</b> appliance" is true, so <code>class Blender(Appliance)</code> is right (lesson 70). "A kitchen <b>has a</b> blender" is true too, so the kitchen holds one: <code>self.blender = Blender("blender", 800)</code>. One program, both tools, each where it fits.',
          'The catch: has-a does <b>not</b> hand the kitchen its parts\' buttons. Press <b>Run</b>. <code>kitchen.blender.blend("strawberries")</code> works. <code>kitchen.blend("banana")</code> stops: <code>AttributeError: \'Kitchen\' object has no attribute \'blend\'</code>. Go through the part, or give Kitchen its own small method that asks the part, like <code>bake</code> did.',
          'The test, every time: say both sentences out loud. "X <b>is a</b> Y" true? Inherit. "X <b>has a</b> Y" true? Hold it as an attribute. When you are not sure, choose <b>has a</b>. It is easier to change later.'
        ],
        warn: 'Next lesson, Dunder methods: teach <code>print</code> how to show your dish, instead of <code>&lt;__main__.Dish object at 0x...&gt;</code>.'
      }
    ],
    exercises: [
      {
        file: 'l71_lunchbox.py', title: 'Ana\'s lunchbox',
        task: 'Ana runs 12 km tomorrow, so she packs a lunchbox: a <b>banana</b> (105 calories), a <b>rice cake</b> (35) and <b>peanut butter</b> (190). The class <code>Snack</code> is ready. Write the class <code>Lunchbox</code>: it <b>has</b> a list of Snack objects. <code>add(snack)</code> puts one in, and <code>total_calories()</code> <b>returns</b> the calories of all of them: <b>330</b>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Lunchbox has no methods yet, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, give Lunchbox an <code>__init__</code> with <code>self.snacks = []</code>, then <code>add</code> and <code>total_calories</code>. A lunchbox is not a snack, so no brackets after <code>class Lunchbox</code>.',
          'In <code>total_calories</code>, loop over <code>self.snacks</code> and add up each <code>snack.calories</code>. Run the file until it says <code>PASS</code>. The check also packs two lunchboxes at once.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Say each pair out loud. Should the first one <b>inherit</b> from the second, or <b>hold</b> it as an attribute?',
        buckets: ['Is a: inherit', 'Has a: hold it'],
        items: [
          ['Blender and Appliance', 0],
          ['GasOven and Oven', 0],
          ['Kitchen and Oven', 1],
          ['Lunchbox and Snack', 1],
          ['Kitchen and Guest', 1],
          ['AirFryer and Appliance', 0]
        ],
        why: 'A blender, an air fryer and a gas oven are each a kind of the second thing, so they inherit. A kitchen is not an oven or a guest, and a lunchbox is not a snack: they hold those as attributes.',
        hint: 'Try "a ... is a ..." first. If it sounds silly, it is has-a.'
      },
      {
        type: 'fix', q: 'Python stops with <code>AttributeError: \'Kitchen\' object has no attribute \'preheat\'</code>. Fix it so it prints <code>180</code>. Keep <code>class Kitchen:</code> without brackets.',
        code: ['class Oven:', '    def __init__(self):', '        self.temp = 0', '', '    def preheat(self, temp):', '        self.temp = temp', '', 'class Kitchen:', '    def __init__(self):', '        self.oven = Oven()', '', 'kitchen = Kitchen()', 'kitchen.preheat(180)', 'print(kitchen.oven.temp)'],
        title: 'preheat.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines != ["180"]:',
          '    msg = "It should print exactly one line: 180."',
          'elif Kitchen.__bases__ != (object,):',
          '    msg = "It prints 180, but Kitchen now inherits. A kitchen is not an oven. Keep class Kitchen: and go through the oven it holds."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The kitchen holds an oven, but it is not one, so it has no <code>preheat</code> button. Go through the part: <code>kitchen.oven.preheat(180)</code>. Or give Kitchen its own method that asks it: <code>def preheat(self, temp): self.oven.preheat(temp)</code>.',
        hint: 'Who has the preheat button: the kitchen, or the thing in kitchen.oven?'
      },
      {
        type: 'fix', q: 'Kitchen Coach should print <code>A plate for Ana</code>, then Ben, then Chloe. It prints <code>A plate for &lt;__main__.Guest object at 0x...&gt;</code> three times. Fix it.',
        code: ['class Guest:', '    def __init__(self, name):', '        self.name = name', '', 'class Kitchen:', '    def __init__(self):', '        self.guests = [Guest("Ana"), Guest("Ben"), Guest("Chloe")]', '', '    def dinner_for(self):', '        for guest in self.guests:', '            print(f"A plate for {guest}")', '', 'kitchen = Kitchen()', 'kitchen.dinner_for()'],
        title: 'plates.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines == ["A plate for Ana", "A plate for Ben", "A plate for Chloe"]:',
          '    ok = True',
          'else:',
          '    msg = "It should print three lines: A plate for Ana, A plate for Ben, A plate for Chloe."'
        ].join('\n'),
        why: 'The list holds whole Guest objects, not names. Printing the object shows its type and where it lives. Ask it for its name: <code>{guest.name}</code>. Lesson 72 shows how to teach print a nicer way to show an object.',
        hint: 'Each guest is an object. Which attribute holds the name?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Oven:', '    def __init__(self):', '        self.temp = 0', '', '    def preheat(self, temp):', '        self.temp = temp', '', 'class Kitchen(Oven):', '    def bake(self, temp):', '        self.preheat(temp)', '', 'kitchen = Kitchen()', 'kitchen.bake(180)      # Chloe\'s bread', 'kitchen.bake(200)      # Ana\'s potatoes', 'print(kitchen.temp)'], { title: 'one_dial.py', bad: [8] }),
        options: ['200', '180', '180 200', 'AttributeError'],
        answer: 0,
        why: 'Kitchen is an Oven here, so it has one <code>self.temp</code>. The second bake turns that one dial to 200. Chloe\'s bread is now at 200 too. With two Oven objects held as attributes, each keeps its own dial.',
        hint: 'How many dials does a kitchen that IS an oven have?'
      },
      {
        type: 'pick', q: 'Why is <code>class Kitchen(Oven)</code> the wrong design for a kitchen?',
        options: [
          'It says a kitchen is a kind of oven: the kitchen gets one dial and oven buttons, and has no place for a second oven',
          'Python does not allow a class to inherit from Oven',
          'The kitchen would not be able to call preheat',
          'Inheritance is slower than composition'
        ],
        answer: 0,
        why: 'Python allows it, and it even works for one dish. The design is wrong because the sentence is false: a kitchen is not an oven. A kitchen has an oven, so it should hold one: <code>self.oven = Oven()</code>.',
        hint: 'Say "a kitchen is an oven" out loud.'
      },
      {
        type: 'pick', q: 'Back to lesson 38. Ben looks for milk in the fridge. What does this print?',
        pic: code(['class Fridge:', '    def __init__(self):', '        self.items = {"tofu": 400, "eggs": 360}', '', 'class Kitchen:', '    def __init__(self):', '        self.fridge = Fridge()', '', 'kitchen = Kitchen()', 'print(kitchen.fridge.items.get("milk", 0))', 'print(kitchen.fridge.items["tofu"])'], { title: 'milk.py' }),
        options: ['0, then 400', 'None, then 400', 'KeyError', 'AttributeError'],
        answer: 0,
        why: 'Follow the dots: the kitchen, its fridge, the fridge\'s dict. Then it is a plain dict. <code>.get("milk", 0)</code> gives the 0 when there is no milk jar, and <code>["tofu"]</code> gives 400.',
        hint: 'Once you reach .items, you have an ordinary dict. What does .get give back for a missing key?'
      },
      {
        type: 'match', q: 'Match each sentence to the code that says it.',
        pairs: [
          ['A kitchen has an oven', 'self.oven = Oven()'],
          ['A blender is an appliance', 'class Blender(Appliance):'],
          ['A lunchbox has snacks', 'self.snacks = []'],
          ['The kitchen asks its oven to heat', 'self.oven.preheat(180)'],
          ['An air fryer can stand in for the oven', 'Kitchen(AirFryer())']
        ],
        why: 'Has-a lines live in <code>__init__</code> as attributes. Is-a lives in the brackets after the class name. Delegation is a method calling a part. And any part with the right method can be plugged in.'
      },
      {
        type: 'fill', q: 'Finish the Kitchen so <code>kitchen.bake(180)</code> heats the oven it holds.',
        text: 'class Kitchen:\n    def __init__(self):\n        self.oven = ___()\n\n    def bake(self, temp):\n        self.___.preheat(temp)\n\nkitchen = ___()\nkitchen.bake(180)',
        options: ['Oven', 'oven', 'Kitchen', 'self', 'temp', 'preheat'],
        answer: ['Oven', 'oven', 'Kitchen'],
        why: '<code>Oven()</code> makes a new oven, and <code>self.oven</code> keeps it on this kitchen. <code>bake</code> asks that oven: <code>self.oven.preheat(temp)</code>. And <code>Kitchen()</code> makes the kitchen.',
        hint: 'A class name starts with a capital letter. The attribute you made in __init__ does not.'
      }
    ]
  });
})();
