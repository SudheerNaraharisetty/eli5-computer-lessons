/* Lesson 75: Review: classes and objects (module 6). Quiz only, no video, no exercise. */
(function () {
  const { P, code, run, svg, box, T, arrow } = PR;

  /* =====================================================================
     l75  Review: classes and objects
     ===================================================================== */

  // One template card on the kitchen wall: a tab with the lesson number, then a ruled card with the title, the key code and one plain line.
  const page = (x, y, n, title, mono, plain, tint) =>
    `<rect x="${x + 18}" y="${y}" width="96" height="18" rx="5" fill="${P.ink}"/>` +
    T(x + 66, y + 13, 'Lesson ' + n, { s: 10.5, f: P.white }) +
    box(x, y + 16, 132, 88, P.white, 10) +
    `<rect x="${x + 7}" y="${y + 24}" width="118" height="72" rx="6" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
    `<line x1="${x + 7}" y1="${y + 50}" x2="${x + 125}" y2="${y + 50}" stroke="${P.danger}" stroke-width="1.4"/>` +
    T(x + 66, y + 42, title, { s: title.length > 14 ? 11.5 : 12.5 }) +
    T(x + 66, y + 68, mono, { s: mono.length > 14 ? 10.5 : 11.5, m: true, w: 700 }).replace('<text ', '<text style="font-variant-ligatures:none" ') +
    T(x + 66, y + 88, plain, { s: 11, w: 700, f: P.ink2 });

  const pages = [
    [65, 'Objects', 'label.upper()', 'it knows and does', P.tint],
    [66, 'Classes', 'soup = Dish()', 'brackets make a dish', P.tint],
    [67, '__init__ and self', 'self.name = name', 'self: the new dish', P.tint],
    [68, 'Methods', 'oven.preheat(180)', 'self: before the dot', P.tint],
    [69, 'Attributes', 'self.x vs Dish.x', 'own jar, or shared', P.tint],
    [70, 'Inheritance', 'super().__init__', 'is a: inherit', P.warnT],
    [71, 'Composition', 'self.oven = Oven()', 'has a: hold it', P.warnT],
    [72, 'Dunder methods', '__str__, __repr__', 'hooks Python calls', P.okT],
    [73, 'Dataclasses', '@dataclass', 'just list the fields', P.okT],
    [74, 'Properties', '@property', 'fresh on every read', P.okT]
  ];
  // The rail under each row of cards.
  const rail = y => `<rect x="10" y="${y}" width="580" height="9" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const recapPic = svg(600, 384, 'Ten template cards on three rails, one per lesson of module 6, each with its key code and one plain idea. Your own kind of thing: objects, classes, __init__ and self, methods, attributes. Families and parts: inheritance, composition. Less typing, smarter labels: dunder methods, dataclasses, properties. In the last row, next to the cards, this review.',
    T(300, 20, 'Module 6: ten template cards on the kitchen wall', { s: 15 }) +
    pages.map((s, i) => page(21 + (i % 4) * 142, 30 + Math.floor(i / 4) * 114, ...s)).join('') +
    [138, 252, 366].map(y => rail(y - 4)).join('') +
    box(305, 292, 274, 44, P.white, 10) +
    `<rect x="315" y="303" width="88" height="22" rx="6" fill="${P.ink}"/>` + T(359, 318.5, 'Lesson 75', { s: 11, f: P.white }) +
    T(415, 319, 'Review: you are here', { s: 12.5, a: 'start' }));

  // How to play: predict, run, compare. And: an AttributeError names the object and the missing label.
  const step = (x, n, head, line1, line2, fill) =>
    box(x, 20, 170, 104, fill, 14) +
    `<circle cx="${x + 26}" cy="${42}" r="12" fill="${P.ink}"/>` + T(x + 26, 46.5, String(n), { s: 12.5, f: P.white }) +
    T(x + 46, 47, head, { s: 15, a: 'start' }) +
    T(x + 85, 82, line1, { s: 12, w: 700, f: P.ink2 }) +
    T(x + 85, 102, line2, { s: 12, w: 700, f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(600, 196, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare. Below: an AttributeError? Ask which object it names, and whether that label was ever put on it with self.',
      step(14, 1, 'Predict', 'say every line', 'out loud first', P.tint) +
      arrow(190, 72, 212, 72, P.accent, 3) +
      step(216, 2, 'Run', 'press Run and', 'read every line', P.warnT) +
      arrow(392, 72, 414, 72, P.accent, 3) +
      step(418, 3, 'Compare', 'surprised? that is', 'the lesson to reread', P.okT) +
      box(14, 142, 572, 40, P.dangerT, 12) +
      `<rect x="28" y="150" width="124" height="24" rx="7" fill="${P.danger}"/>` + T(90, 166.5, 'AttributeError', { s: 12.5, f: P.white, m: true }) +
      T(166, 167, 'Which object? Was that label ever put on it?', { s: 12.5, w: 700, a: 'start', f: P.ink })) +
    run(['# Warm up: say the output out loud, then press Run', 'class Jar:', '    def __init__(self, item, grams):', '        self.item = item', '        self.grams = grams', '', '    def use(self, grams):', '        self.grams -= grams', '        return self.grams', '', 'oats = Jar("oats", 400)', 'print(oats.use(80), oats.use(80))    # porridge for Ben, then Ana', 'print(oats.item, oats.grams)'], { title: 'warm_up.py' }) +
    run(['# This one stops. Read the last line of the error first.', 'class Guest:', '    def __init__(self, name, calories):', '        self.name = name', '        self.calories = calories', '', 'chloe = Guest("Chloe", 1800)', 'print(chloe.name)', 'print(chloe.allergies)'], { title: 'read_the_error.py' }) +
    `</div>`;

  // The Appliance family for the super() question and the order question.
  const OVEN_LINES = [
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
    '',
    'class Oven(Appliance):',
    '    def __init__(self, name, watts, max_temp):',
    '        self.max_temp = max_temp',
    '',
    '',
    'oven = Oven("oven", 2400, 250)    # Chloe\'s banana bread',
    'oven.start()',
    'print(oven.watts, oven.max_temp)'
  ];

  COURSE.add({
    id: 'l75', minutes: 25,
    summary: 'Ten lessons on one wall: objects, classes, <code>__init__</code> and <code>self</code>, methods, attributes, inheritance, composition, dunder methods, dataclasses and properties. Then <b>16 mixed questions</b>, easy to hard, with <b>5 real bugs</b> to fix. Most of them you can <b>run</b>, and every one is about Kitchen Coach\'s own classes: dishes, appliances, guests and pantry jars.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One wall, ten template cards.',
        text: [
          'Module 6 taught Kitchen Coach to make <b>its own kinds of things</b>: a Dish, a Guest, an Oven, a Jar for the pantry. Each card in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>Your own kind of thing</b> (lavender). Every value is an <b>object</b>: it has a type, it <b>knows</b> things (attributes, no brackets) and it <b>does</b> things (methods, with brackets). <code>class Dish:</code> writes a template card, and <code>Dish()</code> with brackets makes a new dish. Without brackets, <code>Dish</code> is the card itself. <code>__init__</code> is the prep station that Python runs for every new object, and <code>self</code> is the new object being set up. <code>self.name = name</code> keeps the value on it. Forget the <code>self.</code> and the value is gone when the method ends. A method is a <code>def</code> inside the class with <code>self</code> first: <code>oven.preheat(180)</code> really runs <code>Oven.preheat(oven, 180)</code>. A label on <code>self</code> belongs to one object. A name in the class body is <b>one jar on the template</b>, shared by every object, so a list there is one list for everyone.',
          '<b>Families and parts</b> (orange). <code>class Blender(Appliance):</code> says a blender <b>is an</b> appliance. It gets every method of the parent, and Python climbs up to the parent for anything the child does not have. A child with its own <code>__init__</code> calls <code>super().__init__(...)</code> first, or the parent\'s setup never runs. A kitchen <b>has an</b> oven: <code>self.oven = Oven()</code>, and the kitchen asks its part, <code>self.oven.preheat(temp)</code>. Say the sentence out loud. "Is a": inherit. "Has a": hold it. Not sure: has a.',
          '<b>Less typing, smarter labels</b> (green). Dunder methods are hooks that Python calls for you. <code>__str__</code> is what <b>people</b> see, in <code>print</code> and f-strings. <code>__repr__</code> is what <b>programmers</b> see, in a list, a dict and the REPL. A dunder <b>returns</b> its answer and never prints it. <code>@dataclass</code> writes <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> from a list of fields. Fields with a default go last, and a list default is <code>field(default_factory=list)</code>. <code>@property</code> runs a method every time you read it, with no brackets, so a total is never stale. A setter can guard the door with <code>raise ValueError</code>.'
        ],
        tip: 'Module 4 still applies: a method is a recipe card, so names without <code>self.</code> live only in its own pan (lesson 47), and a list as a default is made once and shared (lesson 46). And module 5 too: a setter that raises stops at once, and <code>try</code> and <code>except ValueError:</code> can catch it.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>. For every dot, ask two things: <b>which object</b> is in front of it, and does that object (or its class) <b>really have</b> this name? Then pick your answer, and press <b>Run</b> to check it.',
          'Try it on <code>warm_up.py</code> above. <code>use</code> changes the jar <b>and</b> hands back what is left, so the two calls on one line give two different numbers.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code, checks what it prints, and often tries your class with other values too, like a new jar or a second kitchen. There is often more than one good fix, but the question says when it wants one tool, like <code>super()</code> or a property.',
          'Most bugs in this module are an <code>AttributeError</code> or a <code>TypeError</code>. Read the <b>last line</b> first. <code>\'Guest\' object has no attribute \'allergies\'</code> names the object and the missing label: was it ever put on with <code>self.</code>? <code>takes 1 positional argument but 2 were given</code> almost always means a <b>missing self</b> in a <code>def</code>. Try it now on <code>read_the_error.py</code> above.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Warm up. Kitchen Coach has a Dish class and an Oven class, and has done <code>from pathlib import Path</code>. <code>soup</code>, <code>oven</code>, <code>race</code> (a date) and <code>shopping</code> (a list) already exist. What does each piece of code do?',
        buckets: ['makes a new object', 'reads what it knows', 'presses a button (a method)'],
        items: [
          ['Dish("lentil soup", 18)', 0],
          ['Oven()', 0],
          ['Path("recipes")', 0],
          ['soup.protein', 1],
          ['oven.temp', 1],
          ['race.year', 1],
          ['oven.preheat(180)', 2],
          ['shopping.append("tofu")', 2],
          ['"pasta".upper()', 2]
        ],
        why: 'A class name with brackets <b>makes</b> a new object, and that works for Path as well as for your own Dish (lessons 65 and 66). A dot and a name with <b>no brackets</b> reads an attribute, something the object knows. A dot, a name <b>and brackets</b> presses a method, something the object does (lesson 68).',
        hint: 'Lesson 65: brackets press a button. No brackets after the dot means it only reads. A class name in front of the brackets makes something new.'
      },
      {
        type: 'pick', q: 'Ana and Ben each want a jar for the pantry. What does this print?',
        pic: run(['class Jar:', '    pass', '', 'oats = Jar             # Ana\'s oats jar', 'oats.item = "oats"', 'rice = Jar()           # Ben\'s rice jar', 'print(rice.item)'], { title: 'two_jars.py' }),
        options: ['oats', "AttributeError: 'Jar' object has no attribute 'item'", 'rice', 'None'],
        answer: 0,
        why: 'Line 4 has <b>no brackets</b>, so <code>oats</code> is not a jar. It is a second name for the <b>template card</b> itself. Line 5 then writes <code>item</code> on the card. Ben\'s brand new jar finds no <code>item</code> of its own, reads the card, and says <code>oats</code>. With <code>Jar()</code> on line 4 you would get the AttributeError.',
        hint: 'Lesson 66: what is Jar without brackets? Where does line 5 write the label?',
        hints: { 1: 'That is what you get with Jar() on line 4. Look again: line 4 has no brackets. What is oats then?', 2: 'Nothing in the program writes the text "rice" anywhere. Where does line 5 put "oats"?' }
      },
      {
        type: 'fix', q: 'Ben makes porridge, and Kitchen Coach stops with <code>TypeError: Jar.use() takes 1 positional argument but 2 were given</code>. Fix the class so it prints <code>oats left: 280</code>.',
        code: ['class Jar:', '    def __init__(self, item, grams):', '        self.item = item', '        self.grams = grams', '', '    def use(grams):', '        self.grams = self.grams - grams', '', 'oats = Jar("oats", 400)', 'oats.use(120)          # Ben\'s porridge', 'print("oats left:", oats.grams)'],
        title: 'porridge.py',
        check: [
          'J = globals().get("Jar")',
          'if out != "oats left: 280":',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: oats left: 280"',
          'else:',
          '    try:',
          '        r = J("rice", 900)',
          '        r.use(100)',
          '        ok = r.grams == 800',
          '    except Exception as e:',
          '        msg = "A new jar should work too: Jar(\\"rice\\", 900).use(100) gave " + type(e).__name__ + "."',
          '    if not ok and not msg:',
          '        msg = "Jar(\\"rice\\", 900).use(100) should leave 800 g. Keep the subtraction in use."'
        ].join('\n'),
        why: 'Line 6 becomes <code>def use(self, grams):</code>. <code>oats.use(120)</code> hands over <b>two</b> things: the jar in front of the dot and 120. The <code>def</code> had only one jar for them. With <code>self</code> first, the oats jar lands in <code>self</code> and 120 in <code>grams</code>, so <code>self.grams</code> is this jar\'s own number.',
        hint: 'Lesson 68: "takes 1 but 2 were given" almost always means a missing self. Look at the def line of use.'
      },
      {
        type: 'match', q: 'Match each line to what it means in Kitchen Coach.',
        pairs: [
          ['class Blender(Appliance):', 'a blender is an appliance'],
          ['self.oven = Oven()', 'a kitchen has an oven'],
          ['self.grams = grams', 'keep the value on this one jar'],
          ['oats.use(120)', 'run Jar.use(oats, 120)'],
          ['super().__init__(name, watts)', 'run the parent\'s setup first'],
          ['@dataclass', 'write __init__, __repr__ and __eq__ for me'],
          ['@property', 'read this method like an attribute']
        ],
        why: 'Brackets after a class name in the <code>class</code> line give it a parent: <b>is a</b> (lesson 70). A part made in <code>__init__</code> and kept on <code>self</code> is <b>has a</b> (lesson 71). <code>self.</code> keeps a value on the object (lesson 67). The object in front of the dot goes into <code>self</code> (lesson 68). <code>super()</code> is the parent (lesson 70). And the two <code>@</code> lines are decorators: one writes the boring methods (lesson 73), the other turns a method into a label you read (lesson 74).',
        hint: 'Lessons 67 to 74. Start with the two you are surest of. Which two lines start with @?'
      },
      {
        type: 'pick', q: 'Kitchen Coach keeps pantry jars on shelves. What does this print?',
        pic: run(['class Jar:', '    shelf = "top"', '', '    def __init__(self, item, grams):', '        self.item = item', '        self.grams = grams', '', 'oats = Jar("oats", 400)', 'rice = Jar("rice", 900)', 'rice.shelf = "bottom"', 'Jar.shelf = "middle"', 'print(oats.shelf, rice.shelf)', 'print(vars(oats))'], { title: 'shelves.py' }),
        options: [
          "middle bottom, then {'item': 'oats', 'grams': 400}",
          "top bottom, then {'item': 'oats', 'grams': 400}",
          "middle middle, then {'item': 'oats', 'grams': 400, 'shelf': 'middle'}",
          "middle bottom, then {'item': 'oats', 'grams': 400, 'shelf': 'middle'}"
        ],
        answer: 0,
        why: '<code>shelf</code> is a <b>class attribute</b>: one jar on the template. <code>rice.shelf = "bottom"</code> does not change the template. It writes a <b>new label on rice only</b>, which covers the template\'s one. <code>Jar.shelf = "middle"</code> changes the template, so oats, which has no shelf of its own, reads <code>middle</code>. <code>vars(oats)</code> shows only the oats jar\'s own labels: item and grams.',
        hint: 'Lesson 69: writing with = through an object puts a new label on that object. Reading looks at the object first, then at the class.',
        hints: { 1: 'Line 11 changes the template after the jars were made. oats has no shelf of its own. Where does it read shelf from, and when?', 2: 'rice.shelf = "bottom" put a label on rice itself. A label on the object covers the one on the class.', 3: 'vars() shows only the object\'s own labels. Was a shelf ever written on oats itself?' }
      },
      {
        type: 'bucket', q: 'Say each pair out loud. Should the first class <b>inherit</b> from the second, or <b>hold</b> it as an attribute?',
        buckets: ['inherit: "is a"', 'hold it: "has a"'],
        items: [
          ['Kettle and Appliance', 0],
          ['Blender and Appliance', 0],
          ['AirFryer and Appliance', 0],
          ['RunnerGuest and Guest', 0],
          ['Kitchen and Oven', 1],
          ['Pantry and Jar', 1],
          ['Blender and Jug', 1],
          ['Guest and Lunchbox', 1]
        ],
        why: '"A kettle is an appliance" and "a runner guest is a guest" are true, so those inherit (lesson 70). "A kitchen is an oven" or "a pantry is a jar" are nonsense: a kitchen <b>has</b> an oven, a pantry <b>has</b> jars, a blender <b>has</b> a jug and a guest <b>has</b> a lunchbox. Those hold the part on <code>self</code> (lesson 71).',
        hint: 'Lesson 71: try "a ... is a ..." first. If it sounds silly, try "a ... has a ...".'
      },
      {
        type: 'fix', q: 'Chloe\'s oven stops with <code>AttributeError: \'Oven\' object has no attribute \'name\'</code>, even though it was made with the name <code>"oven"</code>. Fix it with <b>one new line</b> that uses <code>super()</code>, so it prints <code>oven is on</code> and then <code>2400 250</code>.',
        code: OVEN_LINES,
        title: 'oven.py',
        check: [
          'O, A = globals().get("Oven"), globals().get("Appliance")',
          'if not (isinstance(O, type) and isinstance(A, type) and issubclass(O, A)):',
          '    msg = "Keep class Oven(Appliance): an oven is an appliance."',
          'elif "super" not in O.__init__.__code__.co_names:',
          '    msg = "Call the parent\'s setup with super().__init__(name, watts) as the first line of Oven\'s __init__, instead of copying its lines."',
          'elif out != "oven is on\\n2400 250":',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: oven is on / 2400 250"',
          'else:',
          '    b = O("big oven", 3000, 280)',
          '    if (b.name, b.watts, b.on, b.max_temp) == ("big oven", 3000, False, 280):',
          '        ok = True',
          '    else:',
          '        msg = "Oven(\\"big oven\\", 3000, 280) should get name, watts, on = False and max_temp 280. Pass name and watts to super().__init__."'
        ].join('\n'),
        why: 'Add <code>super().__init__(name, watts)</code> as the first line of Oven\'s <code>__init__</code>. Oven has its own <code>__init__</code>, so Python never climbs up to <code>Appliance.__init__</code> by itself, and nothing wrote <code>self.name</code>, <code>self.watts</code> or <code>self.on</code>. <code>super()</code> runs the parent\'s setup on this oven. Then Oven adds its own <code>max_temp</code>.',
        hint: 'Lesson 70: a child with its own __init__ must call the parent\'s setup first. What does Appliance\'s __init__ need?'
      },
      {
        type: 'order', q: 'With the fix in place, Oven\'s <code>__init__</code> starts with <code>super().__init__(name, watts)</code>. Put in order what happens when Python runs <code>oven = Oven("oven", 2400, 250)</code>.',
        items: [
          'Python makes a new, empty Oven',
          'Python calls Oven.__init__ with self = the new oven',
          'super().__init__(name, watts) runs Appliance.__init__ on the same oven',
          'Appliance.__init__ puts name, watts and on on the oven',
          'Back in Oven.__init__, self.max_temp = max_temp puts 250 on it',
          'The finished oven is handed back and labelled oven'
        ],
        why: 'The object exists first, empty, so <code>__init__</code> has something to set up (lesson 67). Python finds <code>__init__</code> in Oven, the child. Its first line hands the <b>same</b> oven to the parent\'s setup, which puts the shared labels on it. Then the child adds its own. Only at the very end does the <code>=</code> put the name <code>oven</code> on it.',
        hint: 'Lessons 67 and 70: something has to exist before it can be set up. Whose __init__ does Python find first?'
      },
      {
        type: 'fix', q: 'Someone wrote <code>class Kitchen(Fridge)</code>, "a kitchen is a fridge", and now <code>kitchen.fridge</code> stops with <code>AttributeError: \'Kitchen\' object has no attribute \'fridge\'</code>. Make the kitchen <b>hold</b> a fridge instead, so it prints <code>200</code>. Leave the last three lines as they are.',
        code: ['class Fridge:', '    def __init__(self):', '        self.items = {"tofu": 400, "milk": 1000}', '', '    def take(self, item, grams):', '        self.items[item] = self.items[item] - grams', '', '', 'class Kitchen(Fridge):          # "a kitchen is a fridge"?', '    pass', '', '', 'kitchen = Kitchen()', 'kitchen.fridge.take("tofu", 200)          # Ben\'s stir-fry', 'print(kitchen.fridge.items["tofu"])'],
        title: 'kitchen.py',
        check: [
          'K, F = globals().get("Kitchen"), globals().get("Fridge")',
          'if not (isinstance(K, type) and isinstance(F, type)):',
          '    msg = "Keep both classes, Fridge and Kitchen."',
          'elif issubclass(K, F):',
          '    msg = "Kitchen still inherits from Fridge. A kitchen is not a fridge: write class Kitchen: with no brackets."',
          'elif out != "200":',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print 200."',
          'else:',
          '    a, b = K(), K()',
          '    if not isinstance(getattr(a, "fridge", None), F):',
          '        msg = "Every new Kitchen should make its own Fridge in __init__: self.fridge = Fridge()"',
          '    elif a.fridge is b.fridge:',
          '        msg = "Two kitchens share one fridge. Make the Fridge inside __init__, with self.fridge = Fridge()."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Write <code>class Kitchen:</code> with no brackets, and give it an <code>__init__</code> with <code>self.fridge = Fridge()</code>. Now every kitchen <b>has</b> its own fridge, and <code>kitchen.fridge.take(...)</code> reads left to right: this kitchen, its fridge, that fridge\'s take button. 400 minus 200 leaves <code>200</code>.',
        hint: 'Lesson 71: "has a" means make the part in __init__ and keep it on self.'
      },
      {
        type: 'pick', q: 'Kitchen Coach plans Ana\'s dinner. What does this print?',
        pic: run(['class Dish:', '    def __init__(self, name, protein):', '        self.name = name', '        self.protein = protein', '', '    def __str__(self):', '        return f"{self.name} ({self.protein} g)"', '', '    def __repr__(self):', '        return f"Dish(\'{self.name}\', {self.protein})"', '', '', 'plan = {"Ana": Dish("pasta bake", 22)}', 'print(plan["Ana"])', 'print(plan)'], { title: 'plan.py' }),
        options: [
          "pasta bake (22 g), then {'Ana': Dish('pasta bake', 22)}",
          "pasta bake (22 g), then {'Ana': pasta bake (22 g)}",
          "Dish('pasta bake', 22), then {'Ana': Dish('pasta bake', 22)}",
          "pasta bake (22 g), then {'Ana': <__main__.Dish object at 0x...>}"
        ],
        answer: 0,
        why: '<code>plan["Ana"]</code> is one dish, and <code>print</code> of one dish asks for <code>__str__</code>, the people view: <code>pasta bake (22 g)</code>. <code>print(plan)</code> prints a <b>dict</b>, and a dict shows each thing inside it with <code>__repr__</code>, the programmer view: <code>Dish(\'pasta bake\', 22)</code>.',
        hint: 'Lesson 72: print of one dish uses __str__. What does a list or a dict use for the things inside it?',
        hints: { 1: 'A dict shows what is inside it the programmer way. Which dunder is that?', 3: 'That is what you would see with no __repr__. This Dish has one.' }
      },
      {
        type: 'pick', q: 'Ben copies your lentil soup with a dataclass. What does this print?',
        pic: run(['from dataclasses import dataclass', '', '@dataclass', 'class Dish:', '    name: str', '    protein: int', '    servings: int = 2', '', 'mine = Dish("lentil soup", 18)', 'bens = Dish("lentil soup", 18, 2)', 'bens.servings = 4                  # Ben cooks a bigger pot', 'print(mine == bens)', 'print(mine)'], { title: 'soup.py' }),
        options: [
          "True, then Dish(name='lentil soup', protein=18, servings=2)",
          "False, then Dish(name='lentil soup', protein=18, servings=2)",
          "False, then <__main__.Dish object at 0x...>",
          "True, then Dish(name='lentil soup', protein=18, servings=4)"
        ],
        answer: 1,
        why: 'The dataclass writes an <code>__eq__</code> that compares <b>every</b> field. The two soups start equal, but Ben\'s servings change to 4, so <code>==</code> says <code>False</code>. Ben changed <b>his</b> dish only: <code>mine</code> still has 2 servings. And the dataclass\'s <code>__repr__</code> shows every field by name.',
        hint: 'Lesson 73: which fields does a dataclass __eq__ look at? And did line 11 touch mine?',
        hints: { 0: 'A dataclass __eq__ looks at every field, servings too. Are the servings still the same?', 2: '@dataclass writes a __repr__ for you. print uses it when there is no __str__.', 3: 'Line 11 changes bens. Is mine the same object as bens?' }
      },
      {
        type: 'fill', q: 'Finish Kitchen Coach\'s guest record, so that <code>print(Guest("Ben"))</code> shows <code>Guest(name=\'Ben\', calories=2000, allergies=[])</code> and every guest gets <b>their own</b> allergies list.',
        text: 'from dataclasses import dataclass, field\n\n___\nclass Guest:\n    name: str\n    calories: int = 2000\n    allergies: list = ___(default_factory=___)',
        options: ['@dataclass', '@property', 'field', 'list', 'list()', '[]', 'def'],
        answer: ['@dataclass', 'field', 'list'],
        why: '<code>@dataclass</code> on the line above the class writes <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code>. A list default must be <code>field(default_factory=list)</code>. You hand over the <b>name</b> <code>list</code>, with no brackets, and the dataclass calls it for every new guest. <code>allergies: list = []</code> stops with <code>ValueError: mutable default</code>, and <code>list()</code> would hand over one list, not the maker of new ones.',
        hint: 'Lesson 73: which decorator writes the methods? And default_factory wants the maker itself, not a list it made.'
      },
      {
        type: 'type', q: 'Ben goes shopping for rice. Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['class Jar:', '    def __init__(self, item, capacity, grams):', '        self.item = item', '        self.capacity = capacity', '        self.grams = grams', '', '    @property', '    def room(self):', '        return self.capacity - self.grams', '', 'rice = Jar("rice", 2000, 900)', 'before = rice.room', 'rice.grams = rice.grams + 500      # Ben shops', 'print(before, rice.room)'], { title: 'room.py' }),
        prompt: 'output >',
        answers: ['1100 600'],
        accept: '^1100 600$',
        why: '<code>before</code> took the number the property gave at that moment: 2000 minus 900 is <code>1100</code>. A plain number does not change later. <code>rice.room</code> on the last line runs the property <b>again</b>, with the new 1400 g: 2000 minus 1400 is <code>600</code>.',
        hint: 'Lesson 74: a property is worked out every time you read it. Was before read before or after Ben shopped?'
      },
      {
        type: 'pick', q: 'Ben\'s giant porridge wants 500 g of oats from a 400 g jar. What does this print?',
        pic: run(['class Jar:', '    def __init__(self, item, grams):', '        self.item = item', '        self.grams = grams             # goes through the setter', '', '    @property', '    def grams(self):', '        return self._grams', '', '    @grams.setter', '    def grams(self, value):', '        if value < 0:', '            raise ValueError(f"grams cannot go below 0, got {value}")', '        self._grams = value', '', 'oats = Jar("oats", 400)', 'try:', '    oats.grams = oats.grams - 500      # Ben\'s giant porridge', 'except ValueError as err:', '    print("Refused:", err)', 'print(oats.grams)'], { title: 'giant_porridge.py' }),
        options: [
          'Refused: grams cannot go below 0, got -100, then 400',
          'Refused: grams cannot go below 0, got -100, then -100',
          '-100, with no error: the setter only runs in __init__',
          'Only a ValueError traceback'
        ],
        answer: 0,
        why: 'The setter runs on <b>every</b> <code>oats.grams = ...</code>, not only in <code>__init__</code>. 400 minus 500 is -100, so the guard raises <b>before</b> <code>self._grams</code> is changed. <code>except ValueError</code> from lesson 53 catches it and prints the message. The jar still holds <code>400</code>.',
        hint: 'Lessons 74 and 53: when does the setter run? Does the line that changes _grams run after a raise?',
        hints: { 1: 'raise stops the setter at once. Does the line self._grams = value still run?', 3: 'The try and except around the change catch the ValueError. What does the except block print?' }
      },
      {
        type: 'fix', q: 'Chloe\'s gluten-free rice flour and the wheat flour from the shop count as "the same jar", and print hides the difference. Rewrite <code>Jar</code> as a <b>dataclass</b>, and add a fourth field, <code>tags</code>, a list that is empty unless told, a new one for every jar. It should print <code>Jar(item=\'flour\', grams=500, gluten_free=False, tags=[])</code> and then <code>Same as Chloe\'s? False</code>.',
        code: ['class Jar:', '    def __init__(self, item, grams, gluten_free):', '        self.item = item', '        self.grams = grams', '        self.gluten_free = gluten_free', '', '    def __repr__(self):', '        return f"Jar(\'{self.item}\', {self.grams})"', '', '    def __eq__(self, other):', '        return self.item == other.item and self.grams == other.grams', '', '', 'chloes = Jar("flour", 500, True)      # rice flour, gluten-free', 'bought = Jar("flour", 500, False)     # wheat flour from the shop', 'print(bought)', 'print("Same as Chloe\'s?", bought == chloes)'],
        title: 'flour.py',
        check: [
          'import dataclasses as _dc',
          'J = globals().get("Jar")',
          'want = "Jar(item=\'flour\', grams=500, gluten_free=False, tags=[])\\nSame as Chloe\'s? False"',
          'if not (isinstance(J, type) and _dc.is_dataclass(J)):',
          '    msg = "Jar is not a dataclass yet. Import dataclass, put @dataclass on the line above the class, and list one field per line."',
          'elif [f.name for f in _dc.fields(J)] != ["item", "grams", "gluten_free", "tags"]:',
          '    msg = "The fields should be item, grams, gluten_free and tags, in that order. Now they are: " + ", ".join(f.name for f in _dc.fields(J))',
          'else:',
          '    try:',
          '        a, b = J("oats", 400, True), J("rice", 900, False)',
          '    except TypeError:',
          '        a = b = None',
          '    if a is None:',
          '        msg = "Jar(\\"oats\\", 400, True) should work with no tags given. Give tags a default."',
          '    elif a.tags != [] or a.tags is b.tags:',
          '        msg = "Every jar needs its own new, empty list: tags: list = field(default_factory=list)"',
          '    elif out != want:',
          '        msg = "It printed: " + out.replace("\\n", " / ") + ". Delete the hand-written __repr__ and __eq__: the dataclass writes better ones."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Start with <code>from dataclasses import dataclass, field</code>, put <code>@dataclass</code> above <code>class Jar:</code>, and replace all three methods with four lines: <code>item: str</code>, <code>grams: int</code>, <code>gluten_free: bool</code>, <code>tags: list = field(default_factory=list)</code>. The new <code>__eq__</code> compares <b>every</b> field, so the two flours are not equal, and the new <code>__repr__</code> shows <code>gluten_free=False</code>. <code>tags</code> has a default, so it goes last.',
        hint: 'Lesson 73: the hand-written __eq__ forgot gluten_free. A dataclass cannot forget a field. A list default needs field(default_factory=list).'
      },
      {
        type: 'fix', q: 'Hardest one, two bugs. Kitchen Coach\'s pantry <b>has</b> jars. First it stops with <code>TypeError: object of type \'Pantry\' has no len()</code>. And once that is fixed, the total is wrong: Ben took 80 g of oats <b>after</b> the total was added up. Make <code>len(pantry)</code> work, and make <code>total_grams</code> a property that is never stale, so it prints <code>2 jars, 1220 g</code>. Leave the last five lines as they are.',
        code: ['class Jar:', '    def __init__(self, item, grams):', '        self.item = item', '        self.grams = grams', '', '', 'class Pantry:', '    def __init__(self):', '        self.jars = []', '        self.total_grams = 0', '', '    def add(self, jar):', '        self.jars.append(jar)', '        self.total_grams = self.total_grams + jar.grams', '', '', 'pantry = Pantry()', 'pantry.add(Jar("oats", 400))', 'pantry.add(Jar("rice", 900))', 'pantry.jars[0].grams -= 80            # Ben\'s porridge', 'print(len(pantry), "jars,", pantry.total_grams, "g")'],
        title: 'pantry.py',
        check: [
          'P, J = globals().get("Pantry"), globals().get("Jar")',
          'if not (isinstance(P, type) and isinstance(J, type)):',
          '    msg = "Keep both classes, Jar and Pantry."',
          'elif out == "2 jars, 1300 g" or not isinstance(P.__dict__.get("total_grams"), property):',
          '    msg = "len works. But total_grams must be a property: @property above def total_grams(self):, which adds up self.jars every time it is read. Then delete the two self.total_grams lines."',
          'elif out != "2 jars, 1220 g":',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: 2 jars, 1220 g"',
          'else:',
          '    p = P()',
          '    p.add(J("tofu", 400))',
          '    p.jars[0].grams = 100',
          '    p.add(J("lentils", 50))',
          '    if len(p) == 2 and p.total_grams == 150 and len(P()) == 0:',
          '        ok = True',
          '    else:',
          '        msg = "A new pantry with tofu 100 g and lentils 50 g should give len 2 and total_grams 150. Work both out from self.jars."'
        ].join('\n'),
        why: 'Give Pantry <code>def __len__(self):</code> that returns <code>len(self.jars)</code> (lesson 72). Then delete <code>self.total_grams = 0</code> and the line in <code>add</code> that adds to it, and write <code>@property</code> above <code>def total_grams(self):</code>, which starts at <code>total = 0</code>, adds <code>jar.grams</code> for every jar in <code>self.jars</code>, and returns it. A property is worked out <b>every time</b> you read it, so Ben\'s porridge counts: 320 plus 900 is <code>1220</code>. Keep the old <code>self.total_grams = 0</code> and Python stops with <code>AttributeError: property \'total_grams\' of \'Pantry\' object has no setter</code>.',
        hint: 'Lessons 72 and 74: len() asks for __len__. A total that must follow changes is a property, and it needs no stored number at all.'
      }
    ]
  });
})();
