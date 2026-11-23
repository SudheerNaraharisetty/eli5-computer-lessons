/* Lesson 65: Objects (module 6). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l65  Objects
     ===================================================================== */

  // One kitchen thing as a card: a name, its type, and two pockets, KNOWS and DOES.
  const thing = (x, y, name, type, knows, does, col) =>
    box(x, y, 280, 150, P.white, 14) +
    `<rect x="${x}" y="${y}" width="12" height="150" rx="5" fill="${col}"/>` +
    T(x + 26, y + 30, name, { s: 15, a: 'start' }) +
    `<rect x="${x + 280 - 16 - type.length * 8.2 - 16}" y="${y + 12}" width="${type.length * 8.2 + 16}" height="26" rx="13" fill="${P.sand}"/>` +
    T(x + 280 - 24, y + 30, type, { s: 13, m: true, a: 'end', f: P.ink2 }) +
    `<rect x="${x + 22}" y="${y + 48}" width="244" height="40" rx="9" fill="${P.okT}"/>` +
    T(x + 34, y + 73, 'KNOWS', { s: 11.5, a: 'start', f: P.ok }) + T(x + 92, y + 73, knows, { s: 13, m: true, a: 'start' }) +
    `<rect x="${x + 22}" y="${y + 98}" width="244" height="40" rx="9" fill="${P.warnT}"/>` +
    T(x + 34, y + 123, 'DOES', { s: 11.5, a: 'start', f: P.warn }) + T(x + 92, y + 123, does, { s: 13, m: true, a: 'start' });

  /* ---- The idea: every thing in the kitchen knows and does ---- */
  const ideaPic = svg(600, 372, 'Four things in Kitchen Coach, each drawn as a card with two pockets. The shopping pad is a list: it knows its items and does .append() and .sort(). The label maker is a str: it knows its letters and does .upper() and .split(). The notebook is a Path: it knows .name and .suffix and does .read_text(). The calendar is a date: it knows .year and .month and does .weekday().',
    thing(12, 14, 'Shopping pad', 'list', 'its items', '.append() .sort()', P.warn) +
    thing(308, 14, 'Label maker', 'str', 'its letters', '.upper() .split()', P.accent) +
    thing(12, 186, 'Notebook', 'Path', '.name .suffix', '.read_text()', P.ok) +
    thing(308, 186, 'Calendar', 'date', '.year .month', '.weekday()', P.danger) +
    T(300, 364, 'every value is an object: a type, what it knows, what it does', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The code: type(), and the dot ---- */
  const things = [
    'from pathlib import Path',
    'from datetime import date',
    '',
    'shopping = ["oats", "rice"]',
    'label = "bean chili"',
    'notebook = Path("recipes/soup.txt")',
    'race = date(2027, 2, 28)',
    '',
    'print(type(shopping))',
    'print(type(label))',
    'print(type(race))',
    '',
    '# what it KNOWS: a dot and a name, no brackets',
    'print(notebook.name)',
    'print(race.year)',
    '',
    '# what it DOES: a dot, a name and brackets',
    'print(label.upper())',
    'shopping.append("tofu")',
    'print(shopping)'
  ];
  const dotSvg = svg(600, 150, 'How to read the dot. notebook.name: the object, a dot, then a name with no brackets. That is something it knows, an attribute. label.upper(): the object, a dot, a name and brackets. That is something it does, a method. The brackets press the button.',
    T(150, 44, 'notebook.name', { s: 22, m: true }) +
    `<path d="M66 56 h106" stroke="${P.ink2}" stroke-width="2.5"/>` + T(119, 76, 'the object', { s: 12, w: 700, f: P.ink2 }) +
    `<path d="M186 56 h46" stroke="${P.ok}" stroke-width="2.5"/>` + T(209, 76, 'a name', { s: 12, w: 700, f: P.ok }) +
    box(40, 92, 220, 44, P.okT, 10) + T(150, 120, 'KNOWS: an attribute', { s: 14, f: P.ok }) +
    T(450, 44, 'label.upper()', { s: 22, m: true }) +
    `<path d="M366 56 h66" stroke="${P.ink2}" stroke-width="2.5"/>` + T(399, 76, 'the object', { s: 12, w: 700, f: P.ink2 }) +
    `<path d="M446 56 h86" stroke="${P.warn}" stroke-width="2.5"/>` + T(489, 76, 'press the button', { s: 12, w: 700, f: P.warn }) +
    box(340, 92, 220, 44, P.warnT, 10) + T(450, 120, 'DOES: a method', { s: 14, f: P.warn }));
  const codePic = `<div style="width:100%;min-width:0">${run(things, { title: 'kitchen_things.py' })}${dotSvg}</div>`;

  /* ---- The pain: asking the wrong object ---- */
  const shout = [
    'line = "oats, rice, tofu"      # one line from the notebook',
    'shopping = line.split(", ")',
    'print(shopping.upper())'
  ];
  const shrugSvg = svg(600, 150, 'The label maker, a str, can do upper: "oats, rice, tofu" becomes "OATS, RICE, TOFU". After split, you hold the shopping pad, a list. Ask it to do upper and it shrugs: a list has no upper.',
    box(16, 20, 268, 110, P.white, 14) + T(150, 46, 'Label maker  (str)', { s: 14 }) +
    T(150, 76, '"oats, rice, tofu"', { s: 13, m: true }) + T(150, 108, '.upper()  works', { s: 13.5, m: true, f: P.ok }) +
    arrow(290, 75, 324, 75, P.ink2, 2.5) + T(307, 62, 'split', { s: 11.5, w: 700, f: P.ink2 }) +
    box(330, 20, 254, 110, P.dangerT, 14) + T(457, 46, 'Shopping pad  (list)', { s: 14 }) +
    T(457, 76, "['oats', 'rice', 'tofu']", { s: 12.5, m: true }) + T(457, 108, '.upper()?  no such button', { s: 13, m: true, f: P.danger }));
  const bracketTerm = term([
    '$ python3 brackets.py',
    '<built-in method upper of str object at 0x102b4a5b0>',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/brackets.py", line 6, in <module>',
    '    print(notebook.name())',
    '          ~~~~~~~~~~~~~^^',
    "TypeError: 'str' object is not callable"
  ], 'terminal, Python 3.15');
  const brackets = code([
    'from pathlib import Path',
    '',
    'label = "bean chili"',
    'notebook = Path("recipes/soup.txt")',
    'print(label.upper)        # DOES, but no brackets',
    'print(notebook.name())    # KNOWS, but with brackets'
  ], { title: 'brackets.py', bad: [5, 6] });
  const painPic = `<div style="width:100%;min-width:0">${run(shout, { title: 'shout.py' })}${shrugSvg}${brackets}${bracketTerm}</div>`;

  /* ---- The fix: type(), the error's type name, dir() ---- */
  const fixed = [
    'line = "oats, rice, tofu"',
    'shopping = line.split(", ")',
    'print(type(shopping))          # 1. what do I really hold?',
    '',
    'for name in dir(shopping):     # 2. what can it do?',
    '    if not name.startswith("_"):',
    '        print(name, end=" ")',
    'print()',
    '',
    'for item in shopping:          # 3. ask each str instead',
    '    print(item.upper())'
  ];
  const helpTerm = term([
    '$ python3',
    '>>> help(list.append)',
    'Help on method descriptor append:',
    ' ',
    'append(self, object, /) unbound builtins.list method',
    '    Append object to the end of the list.',
    ' ',
    '# press q to leave the help page'
  ], 'terminal, Python 3.15');
  const fixPic = `<div style="width:100%;min-width:0">${run(fixed, { title: 'shout.py' })}${helpTerm}</div>`;

  /* ---- Try it: look in any object's pockets ---- */
  const explore = [
    'from datetime import date',
    '',
    'pantry = {"rice": 900, "oats": 400}',
    'race = date(2027, 2, 28)',
    '',
    'thing = pantry       # change pantry to race, "tofu" or 42',
    '',
    'print("type:", type(thing))',
    'for name in dir(thing):',
    '    if not name.startswith("_"):',
    '        print(name, end=" ")',
    'print()'
  ];

  /* ---- The catch: same name, same sign, different job ---- */
  const same = [
    'note = "oatmeal, oats"',
    'shopping = ["oatmeal", "oats"]',
    'print(note.count("oat"))       # str: pieces of text',
    'print(shopping.count("oat"))   # list: whole items',
    '',
    'print(2 + 3)',
    'print("2" + "3")',
    'print([2] + [3])',
    'print("2" + 3)'
  ];
  const countSvg = svg(600, 120, 'Two kinds of count. The str "oatmeal, oats" counts the piece of text oat inside both words: 2. The list ["oatmeal", "oats"] counts items that are exactly "oat": none, so 0.',
    box(16, 16, 268, 92, P.white, 14) + T(150, 42, 'str .count("oat")', { s: 13.5, m: true, f: P.accent }) +
    T(150, 72, '"OATmeal, OATs"', { s: 14, m: true }) + T(150, 98, 'pieces of text: 2', { s: 13, w: 700, f: P.ok }) +
    box(316, 16, 268, 92, P.white, 14) + T(450, 42, 'list .count("oat")', { s: 13.5, m: true, f: P.warn }) +
    T(450, 72, '["oatmeal", "oats"]', { s: 14, m: true }) + T(450, 98, 'items exactly "oat": 0', { s: 13, w: 700, f: P.danger }));
  const catchPic = `<div style="width:100%;min-width:0">${run(same, { title: 'same_name.py' })}${countSvg}</div>`;

  COURSE.add({
    id: 'l65', minutes: 12,
    summary: 'Every value in Python is an <b>object</b>. It has a <b>type</b>, the kind of thing it is: <code>type(shopping)</code> says <code>&lt;class \'list\'&gt;</code>. It <b>knows</b> things, called <b>attributes</b>, and it can <b>do</b> things, called <b>methods</b>. The <b>dot</b> asks the object: <code>notebook.name</code> and <code>race.year</code> are things it knows, with no brackets. <code>label.upper()</code> and <code>shopping.append("tofu")</code> are things it does, and the brackets press the button. Ask an object for something its type does not have and Python stops with <code>AttributeError: \'list\' object has no attribute \'upper\'</code>. Read the type name in the error, check with <code>type()</code>, and list an object\'s names with <code>dir()</code>. The same name can mean a different job on another type: <code>.count</code> on text counts pieces, on a list whole items.',
    video: {
      src: 'videos/l65-objects.mp4', poster: 'videos/l65-objects.jpg', length: '1 min 11 s',
      script: [
        'Kitchen Coach is full of things. A shopping pad. A label maker. A notebook. A calendar.',
        'In Python, every value is an object. It has a type, the kind of thing it is. Ask with type. A list. A string. A path. A date.',
        'And every object has two pockets. What it knows, and what it can do.',
        'The dot asks it. Notebook dot name. No brackets: the notebook just knows it. Race dot year. 2027.',
        'Brackets press a button. Label dot upper. Bean chili, in capitals. Shopping dot append, tofu. The pad adds it.',
        'Now ask the shopping pad to do upper. It shrugs. Attribute error. A list object has no attribute upper. Read the type name. Only text can shout.',
        'Not sure what it can do? Ask dir. Skip the names with underscores.',
        'Next lesson, you make your own kind of object, with class.',
        'Every value is an object. It knows things, and it can do things. The dot asks it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every thing in the kitchen knows and does.',
        text: [
          'Look around your kitchen. The <b>shopping pad</b> knows what is on it, and you can add to it and sort it. The <b>label maker</b> knows its letters, and it can print them in capitals. A <b>notebook</b> on the shelf knows its name, and you can read it. The <b>calendar</b> knows the year, and it can tell you the day of the week.',
          'Python works the same way. Every value is an <b>object</b>: a thing that has a <b>type</b> (what kind of thing it is), <b>knows</b> things and can <b>do</b> things. A list, a str, a dict, a Path, a date, even a number. All objects.',
          'You have been using objects since lesson 9. <code>"pasta".upper()</code> asked a str to shout. <code>shopping.append("tofu")</code> (lesson 34) asked a list to add. <code>pantry.get("rice", 0)</code> (lesson 38) asked a dict. <code>recipe.name</code> (lesson 58) asked a Path. And <code>f.closed</code> asks an open file: am I closed yet? This lesson gives that habit its real name.'
        ],
        tip: 'Kitchen Coach\'s values are kitchen things: the list is the shopping pad, the str the label maker, the Path a notebook on a shelf, the date a calendar on the wall.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'type() says what it is. The dot asks it.',
        text: [
          '<code>type(x)</code> tells you what kind of object <code>x</code> is. You met it in lesson 13 with numbers and text. It works on <b>every</b> object: <code>&lt;class \'list\'&gt;</code>, <code>&lt;class \'str\'&gt;</code>, <code>&lt;class \'datetime.date\'&gt;</code>. "Class" is Python\'s word for a kind of object. Lesson 66 is all about it.',
          'The <b>dot</b> means "ask this object". After the dot comes a name. Two kinds of name live there. Something the object <b>knows</b> is an <b>attribute</b>: no brackets. <code>notebook.name</code> is <code>soup.txt</code>, <code>race.year</code> is <code>2027</code>. Something the object <b>does</b> is a <b>method</b>: it has brackets, like a button you press. <code>label.upper()</code> hands back <code>BEAN CHILI</code>, and <code>shopping.append("tofu")</code> adds to the pad.',
          'Press <b>Run</b>. Then change <code>race.year</code> on line 15 to <code>race.month</code>, and add a line <code>print(race.weekday())</code>. Run it again: <code>2</code> for February, and <code>6</code>. The calendar counts Monday as 0, so 6 is <b>Sunday</b>: Ana races on a Sunday.'
        ],
        tip: 'Some tools stand <b>in front</b>, like <code>type(shopping)</code> and <code>len(shopping)</code>. Those are functions that work with many kinds of object. A method comes <b>after the dot</b> and belongs to that kind of object. On your computer <code>print(type(notebook))</code> shows <code>&lt;class \'pathlib.PosixPath\'&gt;</code> on a Mac and <code>WindowsPath</code> on Windows: both are kinds of Path.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Ask the wrong object, and it shrugs.',
        text: [
          'Kitchen Coach reads one line from the notebook, <code>"oats, rice, tofu"</code>, and splits it into a shopping list. Then you want it in capitals for the shop. Press <b>Run</b> on <b>shout.py</b>.',
          'Python stops: <code>AttributeError: \'list\' object has no attribute \'upper\'</code>. <code>.upper()</code> is a str button. <code>.split()</code> handed you a <b>list</b>, so now you hold the shopping pad, not the label maker. A list has no upper. You asked the wrong object.',
          'The brackets trip people up too. <code>label.upper</code> with no brackets does not press the button. It only <b>points at it</b>, so Python prints the button itself: <code>&lt;built-in method upper of str object at 0x...&gt;</code>. Lesson 9 showed you this. Now you can read it: a method called upper, of a str object. The number after <code>0x</code> is where it sits in memory and is different on every run. The other way round, <code>notebook.name()</code> puts brackets on something the notebook <b>knows</b>. <code>.name</code> is the text <code>"soup.txt"</code>, and text is not a button: <code>TypeError: \'str\' object is not callable</code>.'
        ],
        warn: 'An <code>AttributeError</code> usually means the object is not the type you think. The code that made it, like <code>.split()</code> or a function you called, handed back a different kind of thing.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Read the type name. Then ask the right object.',
        text: [
          '1. <b>Read the type name in the error.</b> <code>\'list\' object has no attribute \'upper\'</code> already tells you what you really hold: a list. Python names the type for you.',
          '2. <b>Check with <code>type()</code></b> when you are not sure. Print <code>type(shopping)</code> right before the line that fails.',
          '3. <b>Ask the object what it can do</b> with <code>dir(shopping)</code>. It lists every name the object has. The names with underscores, like <code>__add__</code>, are Python\'s own machinery. Skip them. The small loop on lines 5 to 7 prints only the others, with <code>.startswith()</code> from lesson 9: <code>append clear copy count ...</code>. No upper. To read what one of them does, type <code>help(list.append)</code> at the <code>&gt;&gt;&gt;</code> prompt.',
          'Then ask the right object. Each item in the list is a str, and a str can shout. Lines 10 and 11 ask each one. Press <b>Run</b>. Another way: shout the whole line <b>before</b> you split it, <code>line.upper().split(", ")</code>. Change line 2 to that and run it again.'
        ],
        tip: 'In VS Code, type a dot after a name and wait. A list of everything that object knows and does pops up. That list comes from the type, so it is only right when VS Code knows what the object is.'
      },
      {
        label: 'Try it', pic: run(explore, { title: 'pockets.py' }),
        h: 'Look in any object\'s pockets.',
        text: [
          'This box prints the type of <code>thing</code> and every name it has without an underscore. Press <b>Run</b>: a dict knows and does <code>get items keys pop values</code> and more. You used most of them in lesson 38.',
          'Now change line 6 to <code>thing = race</code> and run it. Find the calendar\'s pockets: <code>year</code>, <code>month</code> and <code>day</code> are things it knows. <code>weekday</code> and <code>isoformat</code> are things it does.',
          'Then try <code>thing = "tofu"</code>: the label maker has dozens of buttons. And <code>thing = 42</code>. Even a plain number is an object, with a type and its own short list. Add one line that uses a name you have never tried, like <code>print("tofu".center(12, "*"))</code>, and see what it does.'
        ],
        tip: 'dir() lists names, but it does not say which ones are things the object knows and which are buttons. Try one without brackets first. If Python prints <code>&lt;built-in method ...&gt;</code>, it is a button: add <code>()</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Same name, same sign, a different job.',
        text: [
          'Two types can have a method with the <b>same name</b> that does a <b>different job</b>. <code>.count("oat")</code> on a str counts pieces of text, so <code>"oatmeal, oats"</code> gives <b>2</b>: "oat" sits inside both words. On a list it counts items that are <b>exactly</b> <code>"oat"</code>, and there are none: <b>0</b>. Press <b>Run</b>.',
          'The signs work the same way. The object decides what <code>+</code> means. Numbers add: <code>5</code>. Strings join: <code>23</code>. Lists join into a longer list: <code>[2, 3]</code>. Mix a str with an int and neither knows what to do: <code>TypeError: can only concatenate str (not "int") to str</code>.',
          'So before you trust a method, know the type of the object in front of the dot.'
        ],
        warn: 'Next lesson, Classes, you make your <b>own</b> kind of object with <code>class</code>: a Dish that knows its name and its protein, and can scale itself for more guests.'
      }
    ],
    exercises: [
      {
        file: 'l65_know_and_do.py', title: 'Ask the right object',
        task: 'Kitchen Coach has six objects: a label, a shopping list, a notebook path, a race date, a pantry dict and a menu note. Fill in eight lines. Each one asks <b>one object</b> with a dot: something it <b>knows</b> (no brackets) or something it <b>does</b> (brackets). Two more lines name a <b>type</b>. The check then swaps in <b>other objects</b> and runs your lines again, so typing the answers in by hand does not pass.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Every answer is still <code>None</code>, and the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, replace each <code>None</code>. The comment above each line shows what it should give for these objects, and whether it is a KNOW or a DO.',
          'Stuck? Print <code>type(...)</code> of the object, or run the <code>dir()</code> loop from this lesson on it. Run the file until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Is each one something the object <b>knows</b> (an attribute) or something it <b>does</b> (a method)?',
        buckets: ['Knows: attribute', 'Does: method'],
        items: [
          ['notebook.name', 0],
          ['race.year', 0],
          ['f.closed', 0],
          ['notebook.suffix', 0],
          ['label.upper()', 1],
          ['shopping.append("tofu")', 1],
          ['pantry.get("rice", 0)', 1],
          ['race.weekday()', 1]
        ],
        why: 'No brackets: the object already knows it, so you just read it. Brackets: you press a button and the object does something, sometimes with what you put inside the brackets.',
        hint: 'Look at the end of each one. Does it end with brackets?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['line = "oats, rice"', 'parts = line.split(", ")', 'print(type(line), type(parts))'], { title: 'types.py' }),
        options: ["<class 'str'> <class 'list'>", "<class 'str'> <class 'str'>", "<class 'list'> <class 'list'>", "str list"],
        answer: 0,
        why: '<code>line</code> is text, a str. <code>.split()</code> is a str method that hands back a <b>new object of another type</b>: a list of the pieces. <code>type()</code> prints a type as <code>&lt;class \'...\'&gt;</code>.',
        hint: 'What kind of thing does .split() hand you?'
      },
      {
        type: 'fix', q: 'Python stops with <code>AttributeError: \'list\' object has no attribute \'upper\'</code>. Fix it so it prints <b>OATS</b>, <b>RICE</b> and <b>TOFU</b> in capitals.',
        code: shout, title: 'shout.py',
        check: [
          'words = ["OATS", "RICE", "TOFU"]',
          'if not all(w in out for w in words):',
          '    msg = "Print all three in capitals: OATS, RICE and TOFU."',
          'elif any(w in out for w in ["oats", "rice", "tofu"]):',
          '    msg = "Close. Some words are still in small letters. Make them all capitals."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'A list has no <code>.upper()</code>, but each item is a str, and a str does. Loop and ask each one: <code>for item in shopping:</code> then <code>print(item.upper())</code>. Or shout before you split: <code>line.upper().split(", ")</code>.',
        hint: 'Ask the str objects, not the list. Either loop over the list, or call <code>.upper()</code> on <code>line</code> before <code>.split()</code>.'
      },
      {
        type: 'pick', q: 'Kitchen Coach stops with this error. What is the best next step?',
        pic: term(['Traceback (most recent call last):', '  File "coach.py", line 4, in <module>', '    pantry.append("tofu")', '    ^^^^^^^^^^^^^', "AttributeError: 'dict' object has no attribute 'append'"], 'terminal'),
        options: ['pantry is a dict, and a dict has no append. Add a key instead: pantry["tofu"] = 300', 'Python is broken. Reinstall it', 'Rename pantry to shopping, then append works', 'Add brackets: pantry().append("tofu")'],
        answer: 0,
        why: 'The error names the type: <code>\'dict\' object</code>. A dict is the spice rack from lesson 37. It has labels and values, not a list of items in order, so it has no <code>.append()</code>. A new name changes nothing: the object is still a dict.',
        hint: 'Read the type name in the last line. What does that kind of object have?'
      },
      {
        type: 'fix', q: 'Back to lesson 58. This stops with <code>TypeError: \'str\' object is not callable</code>. Fix it so it prints <code>soup.txt</code> and then <code>2027</code>.',
        code: ['from pathlib import Path', 'from datetime import date', '', 'notebook = Path("recipes/soup.txt")', 'race = date(2027, 2, 28)', 'print(notebook.name())', 'print(race.year())'],
        title: 'brackets.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["soup.txt", "2027"]:',
          '    ok = True',
          'else:',
          '    msg = "It should print exactly two lines: soup.txt and then 2027."'
        ].join('\n'),
        why: '<code>.name</code> and <code>.year</code> are things the objects <b>know</b>: attributes, read with no brackets. The brackets tried to press <code>"soup.txt"</code> and <code>2027</code> like buttons. Text and numbers are not buttons, so Python said they are not callable.',
        hint: 'Which of these are things the object knows? Those take no brackets. After the first fix, read the new error: it names another type.'
      },
      {
        type: 'pick', q: 'Back to lesson 34. What does this print?',
        pic: code(['shopping = ["oats", "rice"]', 'print(shopping.append("tofu"))'], { title: 'pad.py' }),
        options: ['None', "['oats', 'rice', 'tofu']", 'tofu', "AttributeError: 'list' object has no attribute 'append'"],
        answer: 0,
        why: '<code>.append()</code> changes the list <b>itself</b> and hands back nothing, <code>None</code>. The tofu is on the pad, but you printed what the button handed back. Call it on its own line, then <code>print(shopping)</code>.',
        hint: 'Lesson 34: what does a list method that changes the list hand back?'
      },
      {
        type: 'match', q: 'The object decides what <code>+</code> means. Match each line to what it gives.',
        pairs: [
          ['2 + 3', '5'],
          ['"2" + "3"', '23'],
          ['[2] + [3]', '[2, 3]'],
          ['"2" + 3', 'TypeError']
        ],
        why: 'Numbers add, strings join, lists join into one longer list. A str and an int do not mix: <code>can only concatenate str (not "int") to str</code>.',
        hint: 'Look at the type on each side of the +.'
      },
      {
        type: 'fill', q: 'Finish the lines that say what kind of object <code>pantry</code> is, and list every name it has.',
        text: 'pantry = {"rice": 900, "oats": 400}\nprint(___(pantry))     # <class \'dict\'>\nprint(___(pantry))     # [... \'get\', \'items\', \'keys\' ...]',
        options: ['type', 'dir', 'len', 'help', 'print', 'str'],
        answer: ['type', 'dir'],
        why: '<code>type()</code> names the kind of object. <code>dir()</code> lists every name it has, the ones with underscores first. <code>len()</code> would give 2, the number of keys.',
        hint: 'One tells you what it is. The other lists what it knows and does.'
      }
    ]
  });
})();
