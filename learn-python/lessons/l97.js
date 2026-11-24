/* Lesson 97: Mutability and references (module 9). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l97  Mutability and references
     ===================================================================== */

  // A name tag (a variable): a white tag with a hole and the name in mono.
  const tag = (x, y, name, w) => {
    w = w || 96;
    return box(x, y, w, 40, P.white, 10) +
      `<circle cx="${x + 15}" cy="${y + 20}" r="5" fill="${P.paper}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(x + 28, y + 26, name, { s: 14, m: true, a: 'start', f: P.accent });
  };
  // A jar (an object): a lid and a body, with lines of text inside.
  const jar = (x, y, w, lines, o) => {
    o = o || {};
    const h = 22 + lines.length * 22;
    return `<rect x="${x + 14}" y="${y - 9}" width="${w - 28}" height="11" rx="3" fill="${o.lid || P.ink}"/>` +
      box(x, y, w, h, o.fill || P.white, 12) +
      lines.map((s, i) => T(x + 14, y + 26 + i * 22, s, { s: 13, m: true, a: 'start', f: (o.hot || []).includes(i) ? P.danger : P.ink })).join('') +
      (o.type ? T(x + w - 10, y + h - 8, o.type, { s: 11, a: 'end', f: P.mute }) : '');
  };
  // A curved arrow from (x0,y0) to (x3,y3) with two control points, and a head at the end.
  const curve = (x0, y0, x1, y1, x2, y2, x3, y3, col) => {
    const an = Math.atan2(y3 - y2, x3 - x2), L = 11, sp = 0.45;
    const hx = (k) => (x3 - L * Math.cos(an + k * sp)).toFixed(1), hy = (k) => (y3 - L * Math.sin(an + k * sp)).toFixed(1);
    return `<path d="M${x0} ${y0} C${x1} ${y1} ${x2} ${y2} ${x3} ${y3}" fill="none" stroke="${col}" stroke-width="2.5"/>` +
      `<path d="M${x3} ${y3} L${hx(1)} ${hy(1)} L${hx(-1)} ${hy(-1)} Z" fill="${col}"/>`;
  };
  const line = (x1, y1, x2, y2, col, dash) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col || P.ink}" stroke-width="2.5"${dash ? ' stroke-dasharray="6 6"' : ''}/>`;

  /* ---- The idea: names on the left, objects on the right ---- */
  const ideaPic = svg(600, 330, 'Names on the left, objects on the right, like Python Tutor draws it. Two name tags, ana and ben, both have arrows to ONE list jar holding oats, rice and pasta. Below, the name kcal points to the int 2600, a sealed jar that cannot change. After kcal += 200 the tag points at a NEW jar, 2800, and the old 2600 jar is left alone.',
    T(70, 24, 'NAMES', { s: 12, f: P.ink2 }) + T(430, 24, 'OBJECTS', { s: 12, f: P.ink2 }) +
    `<line x1="200" y1="14" x2="200" y2="318" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    tag(22, 46, 'ana') + tag(22, 112, 'ben') +
    arrow(120, 66, 318, 82, P.ink, 2.5) + arrow(120, 132, 318, 104, P.danger, 2.5) +
    jar(322, 56, 170, ['"oats"', '"rice"', '"pasta"'], { type: 'list' }) +
    T(506, 84, 'ONE list,', { s: 12.5, a: 'start', f: P.danger }) + T(506, 102, 'two labels', { s: 12.5, a: 'start', f: P.danger }) +
    tag(22, 206, 'kcal') +
    arrow(120, 226, 248, 206, P.mute, 2.5) + arrow(120, 226, 248, 262, P.ok, 2.5) +
    jar(252, 192, 110, ['2600'], { type: 'int', fill: P.sand }) +
    T(380, 222, 'old number, never changed', { s: 12, w: 700, a: 'start', f: P.mute }) +
    jar(252, 248, 110, ['2800'], { type: 'int', fill: P.okT }) +
    T(380, 278, 'kcal += 200 makes a NEW int', { s: 12, w: 700, a: 'start', f: P.ok }) +
    T(300, 324, 'A name is a label tied to an object. It is not a box that holds it.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The code: two labels, one list ---- */
  const twoLabels = [
    'ana = ["oats", "rice", "pasta"]',
    'ben = ana                    # Ben starts from Ana\'s list?',
    '',
    'print(ben is ana)            # the same object?',
    'print(id(ana) == id(ben))    # the same id number?',
    '',
    'ben.append("protein powder")',
    'print("Ana:", ana)           # Ana never asked for that',
    '',
    'ben = ["tofu", "lentils"]    # Ben\'s label moves',
    'print("Ana:", ana)',
    'print("Ben:", ben)',
    'print(ben is ana)'
  ];

  /* ---- The pain: Chloe's week, copied with .copy() ---- */
  const shallow = [
    'this_week = [',
    '    ["rice porridge", "bean salad"],   # Monday',
    '    ["omelette", "lentil soup"],       # Tuesday',
    ']',
    'next_week = this_week.copy()   # a copy for next week',
    '',
    '# change next Monday only?',
    'next_week[0][0] = "buckwheat pancakes"',
    'print("this Monday:", this_week[0])',
    'print("next Monday:", next_week[0])',
    '',
    '# add a third day',
    'next_week.append(["corn tacos", "rice pudding"])',
    'print(len(this_week), len(next_week))',
    '',
    'print(next_week is this_week)',
    'print(next_week[0] is this_week[0])'
  ];
  const outerJar = (x, y, col) => box(x, y, 64, 74, col || P.tint, 10) +
    `<rect x="${x + 8}" y="${y + 9}" width="48" height="24" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(x + 24, y + 26, '[0]', { s: 11, m: true }) +
    `<rect x="${x + 8}" y="${y + 41}" width="48" height="24" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(x + 24, y + 58, '[1]', { s: 11, m: true }) +
    `<circle cx="${x + 46}" cy="${y + 21}" r="4" fill="${P.ink}"/><circle cx="${x + 46}" cy="${y + 53}" r="4" fill="${P.ink}"/>`;
  const shallowSvg = svg(600, 250, 'A shallow copy. this_week and next_week are two different outer lists, so is says False for them. But slot 0 of both points at the SAME Monday list, and slot 1 of both at the SAME Tuesday list. Change next Monday and this Monday shows it too.',
    T(300, 22, 'next_week = this_week.copy()', { s: 14, m: true, f: P.accent }) +
    tag(12, 50, 'this_week', 128) + tag(12, 160, 'next_week', 128) +
    arrow(144, 70, 176, 70, P.ink, 2.5) + arrow(144, 180, 176, 180, P.ink, 2.5) +
    outerJar(180, 36) + outerJar(180, 146) +
    T(212, 136, 'two outer lists', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(234, 57, 376, 66, P.ink, 2.5) + arrow(234, 89, 376, 156, P.ink, 2.5) +
    arrow(234, 167, 376, 74, P.danger, 2.5) + arrow(234, 199, 376, 166, P.danger, 2.5) +
    jar(380, 44, 200, ['Mon', '"buckwheat pancakes"'], { hot: [1] }) +
    jar(380, 134, 200, ['Tue', '"lentil soup"']) +
    `<ellipse cx="480" cy="114" rx="118" ry="96" fill="none" stroke="${P.warn}" stroke-width="3" stroke-dasharray="8 7"/>` +
    box(392, 214, 176, 30, P.warnT, 10) + T(480, 234, 'SHARED day lists', { s: 12.5, f: P.warn }) +
    T(12, 244, 'shallow copy: new outside, same inside', { s: 12.5, w: 700, a: 'start', f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(shallow, { title: 'meal_plan.py' })}${shallowSvg}</div>`;

  /* ---- The fix: copy.deepcopy ---- */
  const deep = [
    'import copy',
    '',
    'this_week = [',
    '    ["rice porridge", "bean salad"],   # Monday',
    '    ["omelette", "lentil soup"],       # Tuesday',
    ']',
    '# a new outer list AND new day lists',
    'next_week = copy.deepcopy(this_week)',
    '',
    'next_week[0][0] = "buckwheat pancakes"',
    'print("this Monday:", this_week[0])',
    'print("next Monday:", next_week[0])',
    'print(next_week[0] is this_week[0])',
    '',
    '# one level deep? Copy each day (lesson 76)',
    'also = [day.copy() for day in this_week]',
    'print(also[0] is this_week[0])'
  ];
  const deepSvg = svg(600, 262, 'A deep copy. this_week points at the original Monday and Tuesday lists. next_week points at its own new copies, so pancakes go on the copied Monday only.',
    T(300, 22, 'next_week = copy.deepcopy(this_week)', { s: 14, m: true, f: P.accent }) +
    tag(12, 50, 'this_week', 128) + tag(12, 150, 'next_week', 128) +
    arrow(144, 70, 176, 70, P.ink, 2.5) + arrow(144, 170, 176, 170, P.ink, 2.5) +
    outerJar(180, 36) + outerJar(180, 136) +
    arrow(234, 57, 330, 58, P.ink, 2.5) + curve(234, 89, 300, 6, 430, 6, 500, 34, P.ink) +
    arrow(234, 157, 330, 152, P.ok, 2.5) + curve(234, 189, 300, 238, 450, 238, 500, 228, P.ok) +
    jar(334, 44, 108, ['Mon', '"rice', ' porridge"']) + jar(450, 44, 138, ['Tue', '"lentil', ' soup"']) +
    jar(334, 138, 108, ['Mon', '"buckwheat', ' pancakes"'], { hot: [1, 2], fill: P.okT }) + jar(450, 138, 138, ['Tue', '"lentil', ' soup"'], { fill: P.okT }) +
    T(590, 256, 'deep copy: new outside, new inside. Each week has its own days.', { s: 12.5, w: 700, a: 'end', f: P.ok }));
  const fixPic = `<div style="width:100%;min-width:0">${run(deep, { title: 'meal_plan.py, fixed' })}${deepSvg}</div>`;

  /* ---- Try it: a function gets a label, not a copy ---- */
  const snack = [
    'def add_snack(plan, snack):',
    '    plan.append(snack)   # changes the caller\'s list',
    '    return plan',
    '',
    'chloe = ["rice porridge", "bean salad"]',
    'treat_day = add_snack(chloe, "rice pudding")',
    '',
    'print("chloe:    ", chloe)',
    'print("treat_day:", treat_day)',
    'print(treat_day is chloe)'
  ];

  /* ---- The catch: sealed jars, +=, a tuple holding a list, == or is ---- */
  const sealed = [
    'ana_kcal = 2600',
    'plan_kcal = ana_kcal',
    'plan_kcal += 200     # int: a NEW number',
    'print(ana_kcal, plan_kcal)',
    '',
    'ana = ["oats"]',
    'ben = ana',
    'ben += ["tofu"]      # list: the SAME list',
    'print(ana)',
    '',
    '# a tuple holding a list',
    'lunch = ("Chloe", ["rice", "beans"])',
    'lunch[1].append("salsa")',
    'print(lunch)',
    '',
    'a = ["oats"]',
    'b = ["oats"]',
    'print(a == b, a is b)'
  ];
  const catchTerm = term([
    '$ python3 lunch.py',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen/lunch.py", line 2, in <module>',
    '    lunch[1] = ["rice", "beans", "salsa"]',
    '    ~~~~~^^^',
    "TypeError: 'tuple' object does not support item assignment",
    ' ',
    '$ python3 kcal_check.py',
    '/Users/you/kitchen/kcal_check.py:2: SyntaxWarning: "is" with \'int\' literal. Did you mean "=="?',
    '  print(kcal is 2600)',
    'True'
  ], 'terminal, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${run(sealed, { title: 'sealed_jars.py' })}` +
    code(['lunch = ("Chloe", ["rice", "beans"])', 'lunch[1] = ["rice", "beans", "salsa"]'], { title: 'lunch.py', bad: [2] }) +
    code(['kcal = 2600', 'print(kcal is 2600)'], { title: 'kcal_check.py', bad: [2] }) + catchTerm + `</div>`;

  COURSE.add({
    id: 'l97', minutes: 13,
    summary: 'A variable is a <b>label</b> tied to an object, not a box that holds it. <code>ben = ana</code> ties a <b>second label to the same list</b>: <code>ben is ana</code> is <code>True</code> and <code>id(ana) == id(ben)</code>. Change the list through one label and the other label sees it. <code>ben = [...]</code> only <b>moves</b> Ben\'s label. Lists, dicts, sets and most objects are <b>mutable</b>: they change in place. Ints, strings, tuples and frozensets are <b>immutable</b>: <code>x += 1</code> on an int makes a new object, but <code>+=</code> on a list changes the same list. <code>list(a)</code>, <code>a.copy()</code> and <code>a[:]</code> are <b>shallow</b> copies: a new outer list, but the same lists inside. <code>copy.deepcopy()</code> copies every level. A function gets a label on <b>your</b> list, not a copy, so <code>.append()</code> inside it changes your list. <code>==</code> asks "same contents?", <code>is</code> asks "same object?". Use <code>is</code> only for <code>None</code>.',
    video: {
      src: 'videos/l97-mutability-and-references.mp4', poster: 'videos/l97-mutability-and-references.jpg', length: '1 min 4 s',
      script: [
        'Ana keeps her shopping list in Kitchen Coach. Oats, rice, pasta.',
        'Ben wants a list too, so you write, ben equals ana.',
        'But a name is not a box. It is a label on a jar. Ben equals ana ties a second label to the same jar.',
        'Ben adds protein powder, and it lands on Ana\'s list. Ben is ana? True. One jar, two labels.',
        'To give Ben his own jar, copy it. Ben equals ana dot copy. A new jar, with its own label.',
        'Now Chloe\'s meal plan. A list of days, and each day is a list too. You copy this week for next week, and change next Monday to pancakes.',
        'This Monday changes too. Copy made a new outer jar, but the day jars inside are still shared. A shallow copy.',
        'Copy dot deep copy copies the inner jars as well. Now next Monday changes alone.',
        'A name is a label, not a box. Two labels can point at one jar.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A name is a label on a jar, not the jar.',
        text: [
          'Lesson 11 said a variable is "a label on a jar". Here is the exact picture. The <b>jar</b> is the object: the list, the number, the dish. The <b>name</b> is only a label tied to it. <code>ana = ["oats", "rice", "pasta"]</code> makes a list, then ties the label <code>ana</code> to it.',
          'So one jar can have <b>two labels</b>. <code>ben = ana</code> does not copy anything. It ties a second label to the <b>same</b> list. Lesson 31 warned you: "two names, one list". Lesson 41\'s <code>[[]] * 3</code>, lesson 46\'s <code>basket=[]</code>, lesson 69\'s <code>allergies = []</code> on the class: all the same story. One list, several labels.',
          'Some jars can change inside: you can add to a list, a dict or a set, and most objects you make with <code>class</code>. Those are <b>mutable</b>. Others are sealed: an int, a str, a tuple, a frozenset (lesson 40). Those are <b>immutable</b>. To "change" <code>kcal</code>, Python makes a <b>new</b> number and moves the label. That is why lesson 11\'s jars never surprised you: numbers and text are sealed.'
        ],
        tip: 'Programmers say a name <b>refers to</b> an object, or holds a <b>reference</b> to it. The site pythontutor.com draws your program exactly like this picture: names on the left, arrows to objects on the right.'
      },
      {
        label: 'The code', pic: run(twoLabels, { title: 'shopping.py' }),
        h: 'is and id(): the same object?',
        text: [
          '<code>is</code> asks "are these two labels on the <b>same</b> object?" You used it for <code>x is None</code> in lesson 16. <code>id(x)</code> gives the object\'s id number. Every object has its own, and it never changes while the object lives. Same id, same jar.',
          'Press <b>Run</b>. <code>ben is ana</code> is <code>True</code>, and the ids match. Then Ben adds protein powder, and <b>Ana\'s</b> list shows it. Python did exactly what you wrote. There was only ever one list.',
          'Line 10 is different. <code>ben = [...]</code> does not touch the list. It unties Ben\'s label and ties it to a <b>new</b> list. Ana keeps the old one, protein powder and all. Assigning <b>moves a label</b>. A method like <code>.append()</code> <b>changes the jar</b>.',
          'Now give Ben a list of his own from the start. Change line 2 to <code>ben = ana.copy()</code> and run it again. Both checks say <code>False</code>, and Ana\'s list stays oats, rice and pasta.'
        ],
        tip: '<code>id()</code> numbers are different on every run and every computer. Only compare them, never write one down.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A copy that still shares the inside.',
        text: [
          'Chloe\'s meal plan is a list of days, and each day is a list of meals (lesson 41). Next week starts the same, so Kitchen Coach copies it with <code>.copy()</code> and changes next Monday\'s breakfast to buckwheat pancakes. Press <b>Run</b>.',
          '<b>This</b> Monday changed too. Look at the last two lines. <code>next_week is this_week</code> is <code>False</code>: the outer list really is new. Adding a third day only changes next week, 2 days and 3. But <code>next_week[0] is this_week[0]</code> is <code>True</code>: both weeks hold the <b>same</b> Monday list.',
          '<code>.copy()</code> makes a <b>shallow copy</b>: a new outer jar, filled with labels to the <b>same</b> inner jars. <code>list(this_week)</code> and <code>this_week[:]</code> (lesson 33) do exactly the same. For a flat list of strings that is all you need. For a list of lists, it is a trap.'
        ],
        warn: 'A shallow copy hides well. The outer list looks new, <code>is</code> says <code>False</code>, and adding or removing whole days works fine. Only a change <b>inside</b> a day leaks back.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'copy.deepcopy() copies every level.',
        text: [
          'Lesson 61 showed you the <code>copy</code> module. <code>copy.deepcopy(this_week)</code> makes a new outer list <b>and</b> a new list for every day inside, all the way down. Press <b>Run</b>: this Monday stays rice porridge, next Monday gets the pancakes, and <code>is</code> says <code>False</code> for the days too.',
          'When the nesting is only one level deep, you can copy each day yourself with a comprehension (lesson 76): <code>[day.copy() for day in this_week]</code>. It is a little faster, and it shows exactly what gets copied.',
          'Do you even need a copy? Often the cleaner fix is to <b>build a new list</b> instead of changing an old one. That is the next part.'
        ],
        tip: 'Copy only what you mean to change. Copying big data "just in case" costs time and memory. Lesson 98, Performance and profiling, shows how to measure that.'
      },
      {
        label: 'Try it', pic: run(snack, { title: 'snack.py' }),
        h: 'A function gets a label, not a copy.',
        text: [
          'When you call <code>add_snack(chloe, "rice pudding")</code>, Python does not copy Chloe\'s list. It ties the parameter label <code>plan</code> to the <b>same</b> list. So <code>plan.append()</code> inside the function changes <code>chloe</code> outside it. Press <b>Run</b>: Chloe\'s everyday plan now has rice pudding, and <code>treat_day is chloe</code> is <code>True</code>.',
          'Lesson 47 said what happens in the pan stays in the pan. That is true for <b>names</b>. But the list is not in the pan. Only the label is. This is also lesson 46\'s <code>basket=[]</code> trap: the default list is one jar, and every call gets a label on it.',
          'Fix it. Delete line 2 and change line 3 to <code>return plan + [snack]</code>. <code>+</code> builds a <b>new</b> list. Run it: <code>chloe</code> keeps two meals, <code>treat_day</code> has three, and <code>is</code> says <code>False</code>.'
        ],
        tip: 'A good habit: a function either <b>changes</b> what it is given and returns <code>None</code>, like <code>list.sort()</code> (lesson 34), or <b>builds something new</b> and returns it, like <code>sorted()</code>. Doing both surprises the caller.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Sealed jars, +=, and when to use is.',
        text: [
          '<b><code>+=</code> depends on the jar.</b> On an int, <code>plan_kcal += 200</code> makes a new number and moves only that label, so <code>ana_kcal</code> stays 2600. On a list, <code>ben += ["tofu"]</code> changes the list <b>in place</b>, so Ana gets tofu. Same sign, different jar. Press <b>Run</b>.',
          '<b>A sealed jar can hold an open one.</b> A tuple cannot change (lesson 36): <code>lunch[1] = [...]</code> stops with <code>TypeError</code>. But the tuple only holds labels. The list it points to is still a list, so <code>lunch[1].append("salsa")</code> works. A tuple is only fully frozen when everything inside it is frozen too.',
          '<b><code>==</code> or <code>is</code>?</b> <code>==</code> asks "same contents?". <code>is</code> asks "same object?". Two separate lists of oats are <code>==</code> but not <code>is</code>. For numbers and text, <code>is</code> sometimes says <code>True</code> only because Python reused one object to save memory. Python even warns you when you write <code>is</code> next to a number. So use <code>==</code> to compare values, and <code>is</code> only for <code>None</code>, like lesson 16 said.'
        ],
        warn: 'When data changes and you do not know why, ask <code>a is b</code> on the suspects. A <code>True</code> you did not expect means two labels on one jar.'
      }
    ],
    exercises: [
      {
        file: 'l97_two_labels.py', title: 'Two labels on one jar',
        task: 'Kitchen Coach has three functions that give the right answer but <b>change the caller\'s data</b>. Fix all three: <code>add_snack</code> should return a <b>new</b> list, <code>plan_next_week</code> should <b>deep copy</b> Chloe\'s nested plan, and <code>start_basket</code> should stop sharing its <b>default list</b>. The check calls them with its own lists and checks they are unchanged, with <code>is</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The check prints what each function did and gives the first hint.',
          'Fix the functions between <code>START</code> and <code>END</code>, one at a time. The comment at the top says what each one should do.',
          'Run the file after each fix until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['ana = ["oats"]', 'ben = ana', 'ben.append("protein powder")', 'print(ana)'], { title: 'shopping.py' }),
        options: ["['oats', 'protein powder']", "['oats']", "['protein powder']", 'An error: ana has no protein powder'],
        answer: 0,
        why: '<code>ben = ana</code> ties a second label to the same list. <code>.append()</code> changes that one list, so it shows up through both labels.',
        hint: 'How many lists are there in this program?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['ana = ["oats"]', 'ben = ana', 'ben = ["tofu"]', 'print(ana, ben)'], { title: 'shopping.py' }),
        options: ["['oats'] ['tofu']", "['tofu'] ['tofu']", "['oats', 'tofu'] ['tofu']", "['oats'] ['oats']"],
        answer: 0,
        why: 'Line 3 is an assignment. It moves Ben\'s label to a new list and does not touch the old one. Only a method like <code>.append()</code>, or <code>[0] = ...</code>, changes the jar.',
        hint: 'Does = change the object, or move the label?'
      },
      {
        type: 'bucket', q: 'Can this kind of object change in place?',
        buckets: ['Mutable: it can change', 'Immutable: sealed'],
        items: [
          ['list', 0],
          ['dict', 0],
          ['set', 0],
          ['a Dish made with @dataclass', 0],
          ['int', 1],
          ['str', 1],
          ['tuple', 1],
          ['frozenset', 1]
        ],
        why: 'Lists, dicts, sets and your own objects have methods or attributes that change them. Ints, strings, tuples and frozensets never change: every "change" makes a new object.',
        hint: 'Does it have something like .append(), .add() or an attribute you can set?'
      },
      {
        type: 'pick', q: '<code>week</code> is a list of day lists. Which of these make a new outer list but still <b>share</b> the day lists inside?',
        pic: code(['import copy', 'week = [["oats"], ["soup"]]'], { title: 'week.py' }),
        options: ['list(week)', 'week.copy()', 'week[:]', 'copy.deepcopy(week)'],
        answer: [0, 1, 2],
        why: '<code>list()</code>, <code>.copy()</code> and a full slice <code>[:]</code> are all shallow copies: new outside, same inside. Only <code>copy.deepcopy()</code> copies the day lists too.',
        hint: 'Three of them are the same kind of copy.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['n = 2600', 'm = n', 'm += 200', '', 's = ["oats"]', 't = s', 't += ["tofu"]', '', 'print(n, s)'], { title: 'plus.py' }),
        options: ["2600 ['oats', 'tofu']", "2800 ['oats', 'tofu']", "2600 ['oats']", "2800 ['oats']"],
        answer: 0,
        why: 'An int is sealed, so <code>m += 200</code> makes a new number and only <code>m</code> moves to it. A list can change, so <code>t += ["tofu"]</code> changes the list that <code>s</code> also points at.',
        hint: 'Which of the two jars can change in place?'
      },
      {
        type: 'fix', q: '<code>add_snack</code> changes Chloe\'s everyday plan. Fix the function so <code>chloe</code> stays <b>two meals</b> and <code>treat_day</code> is a <b>new</b> list with three.',
        code: snack, title: 'snack.py',
        check: [
          'g = globals()',
          'c, t = g.get("chloe"), g.get("treat_day")',
          'if c != ["rice porridge", "bean salad"]:',
          '    msg = "chloe still changes: " + repr(c) + ". Do not call .append() on plan. Build a new list: return plan + [snack]"',
          'elif t != ["rice porridge", "bean salad", "rice pudding"]:',
          '    msg = "treat_day should be the plan with rice pudding at the end. It is " + repr(t) + "."',
          'elif t is c:',
          '    msg = "treat_day is still the same list as chloe. Return a new list."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>plan</code> is a label on the caller\'s list, so <code>.append()</code> changes it. <code>plan + [snack]</code> builds a new list and leaves the caller\'s alone.',
        hint: 'Delete the .append() line and return plan + [snack].'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['a = ["oats"]', 'b = ["oats"]', 'print(a == b, a is b)'], { title: 'same.py' }),
        options: ['True False', 'True True', 'False False', 'False True'],
        answer: 0,
        why: 'Two separate lists with the same contents: <code>==</code> says <code>True</code> (same contents), <code>is</code> says <code>False</code> (two different jars). Compare values with <code>==</code>. Keep <code>is</code> for <code>None</code>.',
        hint: 'How many lists did this program make?'
      },
      {
        type: 'pick', q: 'Back to lesson 69. Chloe adds "gluten", and Ben and Ana get it too. Why?',
        pic: code(['class Guest:', '    allergies = []', '', '    def __init__(self, name):', '        self.name = name', '', 'chloe = Guest("Chloe")', 'ben = Guest("Ben")', 'chloe.allergies.append("gluten")', 'print(ben.allergies)'], { title: 'guests.py' }),
        options: [
          'The list is made once, on the class. Every guest\'s .allergies is a label on that one list',
          'append() copies the item into every list in the program',
          'Python copies the class list into each guest, then syncs the copies',
          'Ben and Chloe are the same object'
        ],
        answer: 0,
        why: '<code>allergies = []</code> runs once, when the class is made. Every guest finds that one list. It is the same story as <code>basket=[]</code> in lesson 46: one jar, many labels. <code>self.allergies = []</code> in <code>__init__</code> makes a new jar per guest.',
        hint: 'How many times does the line allergies = [] run?'
      }
    ]
  });
})();
