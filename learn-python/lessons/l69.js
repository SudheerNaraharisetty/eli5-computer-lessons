/* Lesson 69: Attributes (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l69  Attributes
     ===================================================================== */

  // A guest card with its own jars.
  const guestCard = (x, y, v, name, cal) =>
    box(x, y, 180, 118, P.white, 14) +
    T(x + 90, y + 24, v, { s: 13, m: true, f: P.accent }) +
    `<rect x="${x + 12}" y="${y + 38}" width="156" height="30" rx="8" fill="${P.okT}"/>` +
    T(x + 20, y + 58, '.name', { s: 11.5, m: true, a: 'start', f: P.ok }) + T(x + 160, y + 58, `"${name}"`, { s: 11.5, m: true, a: 'end' }) +
    `<rect x="${x + 12}" y="${y + 76}" width="156" height="30" rx="8" fill="${P.okT}"/>` +
    T(x + 20, y + 96, '.calories', { s: 11.5, m: true, a: 'start', f: P.ok }) + T(x + 160, y + 96, String(cal), { s: 11.5, m: true, a: 'end' });

  /* ---- The idea: own jars on each guest, one jar on the template ---- */
  const ideaPic = svg(600, 340, 'The template, class Guest, hangs on the wall with one jar: kitchen = "home". Every guest reads that one jar. Below, three guest cards, ana, ben and chloe, each with jars of their own: .name and .calories. Ana has 2600 calories, Ben 2000, Chloe 1800. Those were set in __init__ with self.',
    box(150, 10, 300, 100, P.warnT, 14) +
    T(300, 36, 'class Guest: the template', { s: 13.5 }) +
    T(300, 66, 'kitchen = "home"', { s: 15, m: true, f: P.warn }) +
    T(300, 94, 'class attribute: one jar, shared', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(240, 114, 110, 168, P.warn, 2.5) + arrow(300, 114, 300, 168, P.warn, 2.5) + arrow(360, 114, 490, 168, P.warn, 2.5) +
    guestCard(20, 176, 'ana', 'Ana', 2600) +
    guestCard(210, 176, 'ben', 'Ben', 2000) +
    guestCard(400, 176, 'chloe', 'Chloe', 1800) +
    T(300, 326, 'instance attributes: each guest\'s own jars, set in __init__ with self.', { s: 12, w: 700, f: P.ok }));
  const guests = [
    'class Guest:',
    '    kitchen = "home"               # on the template: one jar for all',
    '',
    '    def __init__(self, name, calories):',
    '        self.name = name           # on this guest only',
    '        self.calories = calories',
    '',
    'ana = Guest("Ana", 2600)',
    'ben = Guest("Ben", 2000)',
    'print(ana.name, ana.calories, ana.kitchen)',
    'print(ben.name, ben.calories, ben.kitchen)',
    'print(Guest.kitchen)'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(guests, { title: 'guests.py' })}</div>`;

  /* ---- The code: change an attribute, add one, look inside with vars() ---- */
  const tofu = [
    'class Dish:',
    '    kitchen = "home"',
    '',
    '    def __init__(self, name, protein):',
    '        self.name = name',
    '        self.protein = protein',
    '',
    'soup = Dish("lentil soup", 18)',
    'print(soup.protein)',
    'soup.protein += 4          # Ben adds a handful of tofu',
    'print(soup.protein)',
    'soup.spicy = True          # a brand new label, just on soup',
    'print(vars(soup))',
    'print(soup.kitchen)        # not in vars(soup): found on the class'
  ];
  const lookSvg = svg(600, 150, 'How Python reads soup.kitchen. Step 1: look in soup\'s own labels, vars(soup): name, protein, spicy. No kitchen there. Step 2: look on the class Dish: kitchen is "home". So soup.kitchen gives "home".',
    T(80, 24, 'soup.kitchen', { s: 15, m: true, f: P.accent }) +
    arrow(150, 20, 196, 20, P.ink2, 2.5) +
    box(200, 6, 190, 110, P.white, 12) + T(295, 30, '1. soup\'s own labels', { s: 12 }) +
    T(295, 56, 'name, protein, spicy', { s: 11.5, m: true }) + T(295, 84, 'no kitchen here', { s: 12, w: 700, f: P.danger }) +
    T(295, 106, 'vars(soup)', { s: 11, m: true, f: P.ink2 }) +
    arrow(392, 60, 412, 60, P.ink2, 2.5) +
    box(416, 6, 176, 110, P.warnT, 12) + T(504, 30, '2. the class Dish', { s: 12 }) +
    T(504, 62, 'kitchen = "home"', { s: 12, m: true, f: P.warn }) + T(504, 92, 'found!', { s: 13, f: P.ok }) +
    T(300, 142, 'The object first, then the template.', { s: 12.5, w: 700, f: P.ink2 }));
  const nameTerm = term([
    '$ python3 guests.py',
    'Ana 2600 home',
    'Ben 2000 home',
    'home',
    'Traceback (most recent call last):',
    '  File "/Users/ana/kitchen/guests.py", line 13, in <module>',
    '    print(Guest.name)',
    '          ^^^^^^^^^^',
    "AttributeError: type object 'Guest' has no attribute 'name'"
  ], 'print(Guest.name) at the end of guests.py, terminal, Python 3.15');
  const codePic = `<div style="width:100%;min-width:0">${run(tofu, { title: 'tofu.py' })}${lookSvg}${nameTerm}</div>`;

  /* ---- The pain: one allergies list on the template ---- */
  const shared = [
    'class Guest:',
    '    allergies = []                 # one list, on the template',
    '',
    '    def __init__(self, name):',
    '        self.name = name',
    '',
    'ana = Guest("Ana")',
    'ben = Guest("Ben")',
    'chloe = Guest("Chloe")',
    '',
    'chloe.allergies.append("gluten")   # only Chloe!',
    '',
    'print("Ana:  ", ana.allergies)',
    'print("Ben:  ", ben.allergies)',
    'print("Chloe:", chloe.allergies)'
  ];
  const row = (y, who, bad) =>
    box(262, y, 326, 40, bad ? P.dangerT : P.white, 10) +
    T(278, y + 26, who + '.allergies', { s: 13, m: true, a: 'start' }) +
    T(574, y + 26, "['gluten']", { s: 13, m: true, a: 'end', f: P.danger }) +
    arrow(212, 86, 258, y + 20, P.danger, 2.5);
  const painSvg = svg(600, 196, 'One list on the template, Guest.allergies, holds gluten. ana.allergies, ben.allergies and chloe.allergies are three ways to reach that one list, so all three show gluten. Ana and Ben are wrong.',
    box(10, 16, 200, 140, P.dangerT, 14) +
    T(110, 42, 'Guest.allergies', { s: 13, m: true }) +
    T(110, 82, "['gluten']", { s: 17, m: true, f: P.danger }) +
    T(110, 114, 'ONE list on the template', { s: 11.5, w: 800, f: P.ink2 }) +
    T(110, 138, 'made once, when class runs', { s: 11, w: 700, f: P.ink2 }) +
    row(16, 'ana', true) + row(66, 'ben', true) + row(116, 'chloe', false) +
    T(300, 186, 'Three names, one list. Ana and Ben are "gluten-free" by mistake.', { s: 12.5, w: 700, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(shared, { title: 'allergies.py' })}${painSvg}</div>`;

  /* ---- The fix: a new list for each guest, in __init__ ---- */
  const fixed = [
    'class Guest:',
    '    def __init__(self, name):',
    '        self.name = name',
    '        self.allergies = []        # a new list for each guest',
    '',
    'ana = Guest("Ana")',
    'ben = Guest("Ben")',
    'chloe = Guest("Chloe")',
    '',
    'chloe.allergies.append("gluten")',
    '',
    'print("Ana:  ", ana.allergies)',
    'print("Ben:  ", ben.allergies)',
    'print("Chloe:", chloe.allergies)',
    'print(vars(chloe))'
  ];
  const ownJar = (x, who, val, good) =>
    box(x, 14, 176, 96, good ? P.okT : P.white, 14) +
    T(x + 88, 40, who, { s: 13.5 }) +
    T(x + 88, 64, 'self.allergies', { s: 11.5, m: true, f: P.ok }) +
    T(x + 88, 92, val, { s: 14, m: true, f: good ? P.ok : P.ink });
  const fixSvg = svg(600, 140, 'After the fix, each guest has a jar of its own. Ana: an empty list. Ben: an empty list. Chloe: gluten. __init__ runs once per guest, so the line self.allergies = [] makes a new list each time.',
    ownJar(12, 'Ana', '[]', false) + ownJar(212, 'Ben', '[]', false) + ownJar(412, 'Chloe', "['gluten']", true) +
    T(300, 132, '__init__ runs for every new guest, so [] makes a NEW list each time.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${run(fixed, { title: 'allergies.py' })}${fixSvg}</div>`;

  /* ---- Try it: a class attribute that should be shared ---- */
  const ovens = [
    'class Oven:',
    '    max_temp = 250                 # true for every oven here',
    '',
    '    def __init__(self, name):',
    '        self.name = name',
    '        self.temp = 0',
    '',
    '    def preheat(self, temp):',
    '        if temp > self.max_temp:',
    '            print(f"{self.name}: {temp} is too hot, max is {self.max_temp}")',
    '            temp = self.max_temp',
    '        self.temp = temp',
    '',
    'big = Oven("big oven")',
    'small = Oven("small oven")',
    'big.preheat(180)                   # Chloe\'s banana bread',
    'small.preheat(260)                 # Ana\'s pizza',
    'print(big.temp, small.temp)'
  ];

  /* ---- The catch: writing through the object makes a new label ---- */
  const hide = [
    'class Dish:',
    '    kitchen = "home"',
    '',
    '    def __init__(self, name):',
    '        self.name = name',
    '',
    'soup = Dish("lentil soup")',
    'salad = Dish("green salad")',
    '',
    'soup.kitchen = "cafe"              # writes a NEW label on soup',
    'print(soup.kitchen, salad.kitchen)',
    'print(vars(soup))',
    '',
    'Dish.kitchen = "Ben\'s flat"        # changes the template',
    'print(soup.kitchen, salad.kitchen)'
  ];
  const hideSvg = svg(600, 150, 'soup.kitchen = "cafe" sticks a new label on soup. It covers the one on the template for soup only. salad has no label of its own, so it still reads the template. Reading, like soup.allergies.append, changes the shared list. Writing with =, like soup.kitchen = "cafe", makes a new label on that one object.',
    box(12, 12, 280, 104, P.white, 14) + T(152, 38, 'read, then change', { s: 13, f: P.danger }) +
    T(152, 66, 'chloe.allergies.append(...)', { s: 12, m: true }) + T(152, 94, 'changes the SHARED list', { s: 12, w: 700, f: P.danger }) +
    box(308, 12, 280, 104, P.white, 14) + T(448, 38, 'write with =', { s: 13, f: P.warn }) +
    T(448, 66, 'soup.kitchen = "cafe"', { s: 12, m: true }) + T(448, 94, 'a NEW label on soup only', { s: 12, w: 700, f: P.warn }) +
    T(300, 140, 'Neither one is what you want for a guest\'s own things. Use self. in __init__.', { s: 12, w: 700, f: P.ink2 }));
  const catchPic = `<div style="width:100%;min-width:0">${run(hide, { title: 'kitchen.py' })}${hideSvg}</div>`;

  COURSE.add({
    id: 'l69', minutes: 13,
    summary: 'An <b>attribute</b> is something an object knows, read with the dot. There are two kinds. An <b>instance attribute</b> lives on one object. You set it in <code>__init__</code> with <code>self.name = name</code>, so every guest has <b>jars of their own</b>. A <b>class attribute</b> is written in the class itself, like <code>kitchen = "home"</code> or <code>Oven.max_temp = 250</code>. It is <b>one jar on the template, shared by every object</b>. Python reads <code>soup.kitchen</code> by looking at the object first, then at its class. You can change an attribute any time: <code>soup.protein += 4</code>. <code>vars(soup)</code> shows the object\'s own labels. The big trap: <code>allergies = []</code> in the class is <b>one list for everyone</b>, so Chloe\'s <code>"gluten"</code> shows up on Ben. The fix: <code>self.allergies = []</code> in <code>__init__</code>, a new list for each guest. And writing <code>soup.kitchen = "cafe"</code> does not change the template: it puts a <b>new label on soup only</b>.',
    video: {
      src: 'videos/l69-attributes.mp4', poster: 'videos/l69-attributes.jpg', length: '1 min 12 s',
      script: [
        'Kitchen Coach keeps a card for each guest. Ana, Ben and Chloe. Each card is a Guest object, made from one template.',
        'Each guest has jars of their own. Self dot name lives on Ana\'s card, and nowhere else.',
        'A jar written on the template itself is different. It is a class attribute. One jar, shared by every guest.',
        'And someone put the allergies list there. Allergies equals an empty list, right on the template.',
        'Chloe is gluten-free. So, Chloe dot allergies dot append, gluten.',
        'Watch where it lands. Not on Chloe\'s card. In the shared jar. Now Ben is gluten-free too. And Ana. Wrong, and wrong.',
        'The fix. Move the list into init. Self dot allergies equals an empty list. Every new guest gets a jar of their own.',
        'Append gluten again. It goes into Chloe\'s jar, and only Chloe\'s. Ben\'s list stays empty.',
        'Set each object\'s own things in init. Class attributes are shared by all.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'Jars on each guest, and one jar on the template.',
        text: [
          'Kitchen Coach keeps a card for each of your guests. Each card is a <code>Guest</code> object. What a guest <b>knows about itself</b>, its name and its calories, are its <b>attributes</b>. You have read them with the dot since lesson 65: <code>ana.name</code>.',
          'Most attributes belong to <b>one</b> guest. <code>__init__</code> sets them on the new guest with <code>self.</code> (lesson 67), so Ana\'s 2600 calories sit on Ana\'s card and nowhere else. These are <b>instance attributes</b>. "Instance" just means one object made from a class.',
          'In lesson 66 you also wrote a name <b>inside the class</b>: <code>kitchen = "home"</code>. That is a <b>class attribute</b>. It is not on any guest. It is one jar on the template, and every guest reads it. Press <b>Run</b>: Ana and Ben both say <code>home</code>, and so does <code>Guest.kitchen</code>, asked straight from the template.'
        ],
        tip: 'Ask yourself: is this the same for every guest? The kitchen is, so it can live on the class. A name or calories is different for each guest, so it goes on <code>self</code> in <code>__init__</code>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Read it, change it, look inside.',
        text: [
          'An attribute is a jar, so you can change it after the object is made. Ben adds a handful of tofu (about 30 g) to his soup, which is about <b>4 g</b> more protein: <code>soup.protein += 4</code>, the same <code>+=</code> as lesson 11. You can even stick on a brand new label: <code>soup.spicy = True</code>. Press <b>Run</b>.',
          '<code>vars(soup)</code> shows the object\'s <b>own</b> labels as a dict (lesson 37): <code>{\'name\': \'lentil soup\', \'protein\': 22, \'spicy\': True}</code>. There is no <code>kitchen</code> in it, yet <code>soup.kitchen</code> still says <code>home</code>. When you read with the dot, Python looks on <b>the object first</b>, then on <b>its class</b>.',
          'It does not work the other way round. The template has no name, so <code>print(Guest.name)</code> stops with <code>AttributeError: type object \'Guest\' has no attribute \'name\'</code>. Try it: add that line at the end of <b>guests.py</b> above and run it.'
        ],
        tip: '<code>vars(soup)</code> reads a hidden dict that every object of your own class carries, <code>soup.__dict__</code>. Same thing, so use the friendlier <code>vars()</code>. It is a quick way to see what an object really holds when something looks wrong.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One allergies list for everyone.',
        text: [
          'Someone set up the guests\' allergies on the template: <code>allergies = []</code> in the class. Chloe is gluten-free, so line 11 adds <code>"gluten"</code> to <b>Chloe\'s</b> list. Press <b>Run</b>.',
          'All three guests now say <code>[\'gluten\']</code>. Kitchen Coach takes the pasta off Ana\'s race-week menu, and Ben loses his bread. Nobody wrote <code>ana.allergies</code> anywhere.',
          'Here is why. The class body runs <b>once</b>, when Python reaches <code>class Guest:</code>. So <code>[]</code> makes <b>one</b> list, on the template. <code>chloe.allergies</code> finds no list on Chloe, so it reads the one on the class, and <code>.append()</code> changes <b>that</b> list. <code>ana.allergies</code> and <code>ben.allergies</code> reach the very same list.'
        ],
        warn: 'A class attribute that is a list, a dict or a set is one shared container. Change it through any object, and every object sees the change. No error warns you.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Make each guest\'s list in __init__.',
        text: [
          'Move the list into <code>__init__</code>: <code>self.allergies = []</code>. <code>__init__</code> runs <b>for every new guest</b>, so <code>[]</code> runs three times and makes <b>three</b> separate lists, one on each guest.',
          'Press <b>Run</b>. Ana: <code>[]</code>. Ben: <code>[]</code>. Chloe: <code>[\'gluten\']</code>. And <code>vars(chloe)</code> shows that the list is now Chloe\'s own: <code>{\'name\': \'Chloe\', \'allergies\': [\'gluten\']}</code>.',
          'Now add a line under the gluten one: <code>ben.allergies.append("peanuts")</code>. Run it. Only Ben changes.'
        ],
        tip: 'The rule of thumb: anything that belongs to <b>one</b> object, and especially any list or dict, gets made in <code>__init__</code> with <code>self.</code>. You met the same trap in lesson 46: a list as a default, <code>basket=[]</code>, is also made once and shared.'
      },
      {
        label: 'Try it', pic: run(ovens, { title: 'ovens.py' }),
        h: 'A class attribute that should be shared.',
        text: [
          'Class attributes are great for a setting that is truly the same for every object. In your kitchen no oven goes above <b>250 °C</b>, so <code>max_temp = 250</code> lives on the <code>Oven</code> class. Inside a method, <code>self.max_temp</code> reads it: the oven has no <code>max_temp</code> of its own, so Python finds the one on the class.',
          'Press <b>Run</b>. The banana bread heats to 180. The pizza asks for 260, which is too hot, so the oven stops at 250: <code>180 250</code>.',
          'Now change the setting for <b>all</b> ovens at once. Before the <code>preheat</code> lines, add <code>Oven.max_temp = 230</code> and run it. Both ovens follow the new limit, and the pizza message says <code>max is 230</code>.'
        ],
        tip: 'Write class attributes that never change in the class body, at the top, before <code>__init__</code>. Then anyone opening the file sees the kitchen\'s settings first.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Writing through an object makes a new label.',
        text: [
          '<code>soup.kitchen = "cafe"</code> looks like it changes the template. It does not. Writing with <code>=</code> through an object always puts a <b>new label on that object</b>. Press <b>Run</b>: <code>cafe home</code>. <code>vars(soup)</code> now holds <code>\'kitchen\': \'cafe\'</code>.',
          'From now on, soup\'s own label <b>covers</b> the template\'s one. When line 14 changes the template, salad follows, but soup keeps saying <code>cafe</code>: <code>cafe Ben\'s flat</code>. To change a class attribute for everyone, write the class name: <code>Dish.kitchen = ...</code>.',
          'This bites counters too. <code>self.count += 1</code> reads the class\'s 0, adds 1, and then <b>writes</b> a new <code>count</code> on this one object. The class stays at 0. Write <code>Guest.count += 1</code> instead. So: <code>.append()</code> through an object changes the shared list, and <code>=</code> through an object makes a new label. Neither is right for a guest\'s own things. Those belong in <code>__init__</code>.'
        ],
        warn: 'Next lesson, Inheritance: a blender is a kind of appliance. One class can start from another and get all its attributes and methods for free.'
      }
    ],
    exercises: [
      {
        file: 'l69_allergy_jars.py', title: 'Allergy jars',
        task: 'Kitchen Coach thinks <b>everyone</b> is gluten-free, because the <code>Guest</code> class keeps <code>allergies = []</code> on the template. Give each guest a list of their own, so only Chloe has <code>[\'gluten\']</code>. Then add a class attribute <code>guests_made = 0</code> that counts every guest: add 1 to it in <code>__init__</code> with <code>Guest.guests_made += 1</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. All three guests show gluten, and the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, move the list into <code>__init__</code> with <code>self.</code>, and delete the shared line. Run it again.',
          'Add the counter on the template and add 1 to it in <code>__init__</code>. Run the file until it says <code>PASS</code>. The check makes new guests too, so the count must grow by itself.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Dish:', '    toppings = []', '', '    def __init__(self, name):', '        self.name = name', '', 'soup = Dish("lentil soup")', 'salad = Dish("green salad")', 'soup.toppings.append("chili flakes")', 'print(salad.toppings)'], { title: 'toppings.py' }),
        options: ["['chili flakes']", '[]', "AttributeError: 'Dish' object has no attribute 'toppings'", 'None'],
        answer: 0,
        why: '<code>toppings = []</code> sits on the class, so there is one list for every dish. <code>soup.toppings.append(...)</code> changes that shared list, and <code>salad.toppings</code> reads the same one.',
        hint: 'How many lists did the class body make?'
      },
      {
        type: 'fix', q: 'Chloe\'s gluten shows up on Ana and Ben. Fix the class so it prints <code>Ana:   []</code>, <code>Ben:   []</code>, <code>Chloe: [\'gluten\']</code>. Leave the guest lines as they are.',
        code: shared, title: 'allergies.py',
        check: [
          'lines = out.strip().splitlines()',
          'want = ["Ana:   []", "Ben:   []", "Chloe: [\'gluten\']"]',
          'if lines == want and "allergies" in vars(Guest("x")):',
          '    ok = True',
          'elif lines == want:',
          '    msg = "Close. Make every new guest get its own list in __init__."',
          'else:',
          '    msg = "Only Chloe should have gluten. Where is the one list made?"'
        ].join('\n'),
        why: 'In the class body, <code>[]</code> runs once and makes one shared list. In <code>__init__</code>, <code>self.allergies = []</code> runs for each guest and makes a new list every time.',
        hint: 'Move the list from the class into __init__, with self. in front.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Dish:', '    kitchen = "home"', '', '    def __init__(self, name):', '        self.name = name', '', 'soup = Dish("lentil soup")', 'salad = Dish("green salad")', 'soup.kitchen = "cafe"', 'print(salad.kitchen, Dish.kitchen)'], { title: 'cafe.py' }),
        options: ['home home', 'cafe cafe', 'home cafe', 'cafe home'],
        answer: 0,
        why: '<code>soup.kitchen = "cafe"</code> writes a new label on soup only. The template still says <code>home</code>, and salad has no label of its own, so it reads the template.',
        hint: 'Writing with = through an object: where does the new label go?'
      },
      {
        type: 'bucket', q: 'Where should each one live?',
        buckets: ['On each object: self.x in __init__', 'On the class: shared by all'],
        items: [
          ['a guest\'s name', 0],
          ['Chloe\'s allergies', 0],
          ['how much protein this dish has', 0],
          ['the top temperature of every oven in the kitchen', 1],
          ['how many guests have been made', 1],
          ['the name of your kitchen, the same for every dish', 1]
        ],
        why: 'If it can be different for each object, it goes on <code>self</code> in <code>__init__</code>. Only things that are truly the same for all, like a shared setting or a counter, belong on the class.',
        hint: 'Ask: is this the same for every object?'
      },
      {
        type: 'fix', q: 'Kitchen Coach wants to count its timers, but this prints <code>0</code>. Fix line 6 so it prints <code>2</code>.',
        code: ['class Timer:', '    made = 0', '', '    def __init__(self, dish):', '        self.dish = dish', '        self.made += 1', '', 'pasta = Timer("pasta")', 'bread = Timer("banana bread")', 'print(Timer.made)'],
        title: 'timers.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines != ["2"]:',
          '    msg = "It should print exactly one line: 2."',
          'elif "made" in vars(Timer("x")):',
          '    msg = "Close. Each timer still gets its own made. Add 1 on the class itself."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>self.made += 1</code> reads the class\'s 0 and then writes a new <code>made</code> on this one timer. The class never changes. <code>Timer.made += 1</code> writes on the class, so the one shared counter grows.',
        hint: 'Which name in front of the dot points at the template?'
      },
      {
        type: 'pick', q: 'Back to lesson 46. This prints <code>[\'oats\', \'milk\']</code>. Why is it the same trap as <code>allergies = []</code> in a class?',
        pic: code(['def add_item(item, basket=[]):', '    basket.append(item)', '    return basket', '', 'add_item("oats")', 'print(add_item("milk"))'], { title: 'basket.py' }),
        options: ['The [] runs only once, so every call shares one list', 'append() always adds two items', 'basket is a class attribute', 'Python remembers the last value of every function'],
        answer: 0,
        why: 'The default is made once, when <code>def</code> runs. A class attribute is made once, when <code>class</code> runs. Both times one list gets shared. The fix is the same idea too: make a new list inside, every time.',
        hint: 'How many times does the line with [] run?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['class Dish:', '    kitchen = "home"', '', '    def __init__(self, name, protein):', '        self.name = name', '        self.protein = protein', '', 'soup = Dish("lentil soup", 18)', 'soup.protein += 4', 'print(vars(soup))'], { title: 'vars.py' }),
        options: ["{'name': 'lentil soup', 'protein': 22}", "{'name': 'lentil soup', 'protein': 18}", "{'kitchen': 'home', 'name': 'lentil soup', 'protein': 22}", '22'],
        answer: 0,
        why: '<code>vars()</code> shows only the object\'s own labels. <code>kitchen</code> lives on the class, so it is not there. And <code>+= 4</code> changed protein from 18 to 22.',
        hint: 'Does vars() show what lives on the template?'
      },
      {
        type: 'fill', q: 'Finish the class: a shared counter that starts at 0, a new allergies list for each guest, and a line that counts every new guest.',
        text: 'class Guest:\n    guests_made = ___\n\n    def __init__(self, name):\n        self.name = name\n        self.allergies = ___\n        ___.guests_made += 1',
        options: ['0', '[]', 'Guest', 'self', 'None', 'allergies'],
        answer: ['0', '[]', 'Guest'],
        why: 'The counter starts at 0 on the class. <code>self.allergies = []</code> in <code>__init__</code> makes a new list per guest. And <code>Guest.guests_made += 1</code> changes the one shared counter. With <code>self.</code> it would make a new count on each guest.',
        hint: 'The counter belongs to the template. Which name is the template?'
      }
    ]
  });
})();
