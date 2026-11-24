/* Lesson 90: Type hints (module 8). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS), pip 26.2.2 and mypy 2.4.1, and with Python 3.14.4, on 2026-11-23.
   The lazy-annotation example was also run on Python 3.9.6 to get the old NameError.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). mypy is not in Pyodide, so its output is shown as terminal pictures. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l90  Type hints
     ===================================================================== */

  // A jar on a shelf: lid, body, what is inside, and a label on the front.
  const jar = (x, inside, label, col, colT) =>
    `<rect x="${x + 22}" y="22" width="96" height="20" rx="5" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x}" y="44" width="140" height="132" rx="16" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 70, 82, inside, { s: 13, m: true, f: P.ink2 }) +
    `<rect x="${x + 12}" y="112" width="116" height="38" rx="8" fill="${colT}" stroke="${col}" stroke-width="2.5"/>` +
    T(x + 70, 137, label, { s: 15, m: true, f: col });

  /* ---- The idea: labels on the jars, labels on the recipe card ---- */
  const ideaSvg = svg(600, 330, 'Top: three jars on a shelf. The first holds [650, 850] and is labelled list[int]. The second holds 2600 and is labelled int. The third holds "pasta" and is labelled str. Bottom: the recipe card daily_kcal. Its input slot is labelled meals: list[int], and its output chute is labelled -> int. Out comes 2600.',
    jar(70, '[650, 850]', 'list[int]', P.accent, P.tint) + jar(230, '2600', 'int', P.accent, P.tint) + jar(390, '"pasta"', 'str', P.accent, P.tint) +
    `<rect x="52" y="176" width="496" height="8" rx="3" fill="${P.ink}"/>` +
    `<rect x="190" y="198" width="220" height="34" rx="8" fill="${P.tint}" stroke="${P.accent}" stroke-width="2.5"/>` +
    T(300, 221, 'meals: list[int]', { s: 14, m: true, f: P.accent }) +
    arrow(300, 232, 300, 246, P.ink2, 2.5) +
    box(150, 248, 300, 50, P.white, 12) + T(300, 280, 'daily_kcal', { s: 17, m: true }) +
    `<rect x="460" y="256" width="96" height="34" rx="8" fill="${P.okT}" stroke="${P.ok}" stroke-width="2.5"/>` +
    T(508, 279, '-> int', { s: 14, m: true, f: P.ok }) +
    T(84, 279, 'in', { s: 13, w: 800, f: P.ink2 }) + arrow(100, 274, 140, 274, P.ink2, 2.5) +
    T(300, 324, 'labels say what goes in and what comes out', { s: 12.5, w: 700, f: P.ink2 }));
  const ideaCode = [
    'def daily_kcal(meals: list[int]) -> int:',
    '    """Add up a day of meals."""',
    '    return sum(meals)',
    '',
    '',
    'goal: int = 2600',
    'ana = daily_kcal([650, 850, 300, 800])',
    'print("Ana ate", ana, "of", goal, "kcal")',
    'print(daily_kcal.__annotations__)'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(ideaCode, { title: 'coach.py' })}</div>`;

  /* ---- The code: how to read a hint, and the common shapes ---- */
  const readSvg = svg(600, 130, 'How to read a hinted def line. def daily_kcal, then meals colon list of int: the parameter meals should be a list of whole numbers. Then an arrow and int, before the colon at the end: the function hands back a whole number.',
    T(300, 30, 'def daily_kcal(meals: list[int]) -> int:', { s: 17, m: true }) +
    arrow(250, 42, 190, 78, P.accent, 2.5) + arrow(436, 42, 450, 78, P.ok, 2.5) +
    T(190, 98, 'parameter: hint', { s: 13, w: 800, f: P.accent }) + T(190, 118, 'meals should be a list of ints', { s: 11.5, w: 700, f: P.ink2 }) +
    T(450, 98, '-> return hint', { s: 13, w: 800, f: P.ok }) + T(450, 118, 'it hands back an int', { s: 11.5, w: 700, f: P.ink2 }));
  const shapes = [
    'def shopping_line(items: list[str]) -> str:',
    '    return ", ".join(items)',
    '',
    '',
    'def stock_of(pantry: dict[str, int], item: str) -> int | None:',
    '    """Grams in the pantry, or None if there is none."""',
    '    return pantry.get(item)',
    '',
    '',
    'def share(grams: int, people: int) -> tuple[int, int]:',
    '    """Grams for each person, and the grams left over."""',
    '    return grams // people, grams % people',
    '',
    '',
    'pantry = {"rice": 900, "oats": 400}',
    'print(shopping_line(["oats", "tofu", "rice"]))',
    'print(stock_of(pantry, "rice"))',
    'print(stock_of(pantry, "tofu"))',
    'print(share(250, 3))'
  ];
  const oldOptional = code([
    'from typing import Optional',
    '',
    'def stock_of(pantry: dict[str, int], item: str) -> Optional[int]:',
    '    ...   # the same as -> int | None'
  ], { title: 'the old spelling, still in older code' });
  const codePic = `<div style="width:100%;min-width:0">${readSvg}${run(shapes, { title: 'pantry.py' })}${oldOptional}</div>`;

  /* ---- The pain: Python never reads the label ---- */
  const benBug = [
    'def two_portions(grams: int) -> int:',
    '    """Ben eats two portions. Double the protein."""',
    '    return grams * 2',
    '',
    '',
    'grams = input("Protein in one portion (g)? ")',
    'print(f"Ben gets {two_portions(grams)} g of protein")'
  ];
  const abc = [
    'def daily_kcal(meals: list[int]) -> int:',
    '    return sum(meals)',
    '',
    '',
    'print(daily_kcal([650, 850, 300, 800]))',
    'print(daily_kcal("abc"))'
  ];
  const pourSvg = svg(600, 120, 'The text "30", in quotes, is poured into a jar labelled int. Python does not look at the label. "30" times 2 repeats the text, and out comes "3030". Wrong.',
    box(20, 34, 110, 50, P.warnT, 10) + T(75, 66, '"30"', { s: 18, m: true, f: P.warn }) +
    T(75, 108, 'text from input()', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(138, 59, 186, 59, P.ink2, 2.5) +
    `<rect x="196" y="22" width="150" height="76" rx="14" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="224" y="46" width="94" height="32" rx="7" fill="${P.tint}" stroke="${P.accent}" stroke-width="2.5"/>` +
    T(271, 68, 'int', { s: 15, m: true, f: P.accent }) +
    T(271, 116, 'nobody reads the label', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(354, 59, 400, 59, P.ink2, 2.5) + T(377, 48, '* 2', { s: 12, m: true, f: P.ink2 }) +
    box(408, 34, 110, 50, P.dangerT, 10) + T(463, 66, '"3030"', { s: 18, m: true, f: P.danger }) +
    T(560, 66, 'WRONG', { s: 13, w: 800, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(benBug, { title: 'protein.py', inputs: ['30'] })}${pourSvg}${run(abc, { title: 'coach.py' })}</div>`;

  /* ---- The fix: a type checker reads the labels before you run ---- */
  const mypyInstall = [
    '$ source .venv/bin/activate',
    '$ python3 -m pip install mypy',
    'Collecting mypy',
    '# ... downloading mypy and 5 small helpers ...',
    'Successfully installed ast-serialize-0.13.1 librt-0.17.0 mypy-2.4.1 mypy_extensions-1.2.0 pathspec-1.1.1 typing_extensions-4.16.0',
    '$ python3 -m mypy protein.py',
    'protein.py:7: error: Argument 1 to "two_portions" has incompatible type "str"; expected "int"  [arg-type]',
    'Found 1 error in 1 file (checked 1 source file)'
  ];
  const benFixed = [
    'def two_portions(grams: int) -> int:',
    '    """Ben eats two portions. Double the protein."""',
    '    return grams * 2',
    '',
    '',
    'grams = int(input("Protein in one portion (g)? "))',
    'print(f"Ben gets {two_portions(grams)} g of protein")'
  ];
  const mypyOk = [
    '$ python3 -m mypy protein.py',
    'Success: no issues found in 1 source file',
    '$ python3 protein.py',
    'Protein in one portion (g)? 30',
    'Ben gets 60 g of protein'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${term(mypyInstall, 'terminal, in the venv of lesson 63, Python 3.15, mypy 2.4.1')}${run(benFixed, { title: 'protein.py', inputs: ['30'] })}${term(mypyOk, 'terminal, after the fix')}</div>`;

  /* ---- Try it: label a card yourself; a type alias; 3.14's lazy hints ---- */
  const tryCode = [
    'type Grams = int        # a short name for a type',
    '',
    '',
    'def protein_left(goal: Grams, eaten: Grams) -> Grams:',
    '    return goal - eaten',
    '',
    '',
    'def per_plate(kcal, servings):   # add labels here',
    '    return kcal // servings',
    '',
    '',
    'print(protein_left(140, 95))',
    'print(per_plate(2400, 4))',
    'print(protein_left.__annotations__)',
    'print(per_plate.__annotations__)'
  ];
  const lazyCode = [
    'class Pantry:',
    '    def __init__(self, stock: dict[str, int]) -> None:',
    '        self.stock = stock',
    '',
    '    def without(self, item: str) -> Pantry:',
    '        """A new Pantry, with one item taken out."""',
    '        left = dict(self.stock)',
    '        left.pop(item, None)',
    '        return Pantry(left)',
    '',
    '',
    'full = Pantry({"rice": 900, "oats": 400, "tofu": 300})',
    'print(full.without("oats").stock)',
    'print(Pantry.without.__annotations__)'
  ];
  const oldLazy = term([
    '$ python3.9 pantry.py',
    'Traceback (most recent call last):',
    '  ...',
    '    def without(self, item: str) -> Pantry:',
    "NameError: name 'Pantry' is not defined"
  ], 'the same file on an old Python, before 3.14');
  const tryPic = `<div style="width:100%;min-width:0">${run(tryCode, { title: 'labels.py' })}${run(lazyCode, { title: 'pantry.py' })}${oldLazy}</div>`;

  /* ---- The catch: labels, not locks; and not on everything ---- */
  const catchCode = [
    'goal: int = "lots"            # the label says int',
    'print(goal, type(goal))',
    '',
    '',
    'def protein_left(goal: int, eaten: int) -> int:',
    '    left: int = goal - eaten  # a label that adds nothing',
    '    return left',
    '',
    '',
    'print(protein_left(140, 95))',
    'print(protein_left(140.5, 95))  # a float: no complaint'
  ];
  const catchMypy = term([
    '$ python3 -m mypy labels.py',
    'labels.py:1: error: Incompatible types in assignment (expression has type "str", variable has type "int")  [assignment]',
    'labels.py:11: error: Argument 1 to "protein_left" has incompatible type "float"; expected "int"  [arg-type]',
    'Found 2 errors in 1 file (checked 1 source file)',
    '# and a function with NO hints at all is not checked:',
    '$ python3 -m mypy old_protein.py',
    'Success: no issues found in 1 source file'
  ], 'terminal, Python 3.15, mypy 2.4.1');
  const catchPic = `<div style="width:100%;min-width:0">${run(catchCode, { title: 'labels.py' })}${catchMypy}</div>`;

  COURSE.add({
    id: 'l90', minutes: 14,
    summary: 'A <b>type hint</b> is a label that says what should go in the jar. On a def line it goes after each parameter, <code>meals: list[int]</code>, and after an arrow for what comes out, <code>-&gt; int</code>. A variable can have one too: <code>goal: int = 2600</code>. Say what is inside a collection with square brackets: <code>list[str]</code>, <code>dict[str, int]</code>, <code>tuple[int, int]</code>. <code>int | None</code> means "an int, or None if it is missing" (old code writes <code>Optional[int]</code>). <b>Python does not check hints when it runs.</b> Ben\'s <code>two_portions(grams: int)</code> got the text <code>"30"</code> from <code>input()</code> and quietly gave <code>3030</code>. A <b>type checker</b> reads the labels <b>before</b> you run: <code>python3 -m pip install mypy</code>, then <code>python3 -m mypy protein.py</code> says <code>Argument 1 to "two_portions" has incompatible type "str"; expected "int"</code>. VS Code\'s Pylance can underline the same line as you type. Since Python 3.14 hints are read lazily, so a method can say <code>-&gt; Pantry</code> inside class Pantry without quotes. Hint the def lines that other code calls. Do not label every local variable, and do not use hints to check a guest\'s input: that needs <code>int()</code> and an error (lesson 54).',
    video: {
      src: 'videos/l90-type-hints.mp4', poster: 'videos/l90-type-hints.jpg', length: '1 min 11 s',
      script: [
        'Kitchen Coach keeps food in jars, and every jar has a label. A list of whole numbers. One whole number. Text.',
        'Functions can wear labels too. These are type hints. Daily kcal takes meals, a list of ints. The arrow says what comes out: an int.',
        'Now Ben\'s card. Two portions doubles his protein. Its label says grams is an int. But the grams come from input, and input always gives text. 30, in quotes.',
        'Text pours into the jar labelled int. Python never reads labels, so it runs anyway. Text times two repeats it. Ben gets 3030 grams of protein. Wrong.',
        'A type checker reads the labels. Run mypy. It walks the code before anything runs, finds the call, and stamps it. Incompatible type. It got a string, and expected an int.',
        'Wrap input in int. Now mypy finds no issues, and Ben gets 60 grams.',
        'Type hints are labels. Python doesn\'t read them, but your editor and mypy do.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Labels that say what goes in the jar.',
        text: [
          'Your kitchen jars have labels. Nobody has to open the jar to know it holds rice. Since lesson 11 your variables have been labelled jars too, but the label only says the <b>name</b>, never <b>what kind of thing</b> goes inside.',
          'A <b>type hint</b> adds that. In lesson 73 you already wrote some in a dataclass: <code>name: str</code>, <code>protein: int</code>. Lesson 73 promised this lesson, so here is the full story. Hints work on any <code>def</code> line: <code>meals: list[int]</code> says "meals should be a list of whole numbers", and <code>-&gt; int</code> says "this card hands back a whole number". A variable can wear one too: <code>goal: int = 2600</code>.',
          'Press <b>Run</b> on <b>coach.py</b>. The function works exactly as it did without hints. Python keeps the labels in <code>__annotations__</code>, a dict on the function, and does nothing else with them. They are for <b>you</b>, for the next reader, and for tools.'
        ],
        tip: 'Hints are also called <b>annotations</b>, which is why the dict is named <code>__annotations__</code>. You will meet both words.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Read a hint, and the shapes you need most.',
        text: [
          'After each parameter: a colon, then the type. After the brackets: <code>-&gt;</code>, then the type that comes out, then the colon that ends the def line. A default still goes last: <code>shake: int = 0</code>.',
          'For a collection, say what is <b>inside</b> it with square brackets. <code>list[str]</code> is a shopping list of text. <code>dict[str, int]</code> is the pantry: text keys, whole-number values. <code>tuple[int, int]</code> is exactly two ints, like <code>(83, 1)</code>.',
          '<code>int | None</code> means "an int, <b>or</b> None". Use it when a value may be missing. <code>pantry.get(item)</code> gives <code>None</code> for tofu, which is not in the pantry (lesson 38), so <code>stock_of</code> says <code>-&gt; int | None</code>. Older code spells it <code>Optional[int]</code>, imported from the <code>typing</code> module. It means the same thing. Write the <code>|</code> form.',
          'Press <b>Run</b> on <b>pantry.py</b>: <code>oats, tofu, rice</code>, <code>900</code>, <code>None</code> and <code>(83, 1)</code>: 83 g of rice each for 3 people, 1 g left over. Then change <code>share(250, 3)</code> to <code>share(900, 4)</code>.'
        ],
        tip: 'You may see <code>List[str]</code> and <code>Dict[str, int]</code> with capital letters, imported from <code>typing</code>. That is the old spelling from before Python 3.9. Use the small built-in names.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Python never reads the label.',
        text: [
          'Ben eats two portions, so <code>two_portions</code> doubles his protein. Its label says <code>grams: int</code>. But <code>input()</code> always hands back <b>text</b> (lesson 14). Press <b>Run</b> on <b>protein.py</b> and answer 30.',
          '<code>Ben gets 3030 g of protein</code>. The text <code>"30"</code> went into the jar labelled int, and Python did not look at the label. <code>"30" * 2</code> repeats the text, as <code>"=" * 20</code> did in lesson 8. No error. Kitchen Coach tells Ben he has eaten 3 kilos of protein.',
          'The second box sends <code>"abc"</code> to <code>daily_kcal</code>, whose label says <code>list[int]</code>. Python runs it anyway, right into <code>sum</code>, and only then stops: <code>TypeError: unsupported operand type(s) for +: \'int\' and \'str\'</code>. A hint is not a lock. A wrong value runs until it crashes, or worse, until it gives a wrong answer.'
        ],
        warn: 'Python does <b>not</b> check type hints when it runs your code. Not on parameters, not on returns, not on variables.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Let a type checker read the labels before you run.',
        text: [
          'A <b>type checker</b> is a tool that reads your code <b>without running it</b>, and checks every value against the labels. The best known is <b>mypy</b>. Install it into your project\'s venv, the way you installed tabulate in lesson 63: <code>python3 -m pip install mypy</code>. Then run <code>python3 -m mypy protein.py</code>.',
          'Read the error like any other. <code>protein.py:7</code> is the file and line. <code>Argument 1 to "two_portions"</code> is the first value you passed. <code>has incompatible type "str"; expected "int"</code>: you gave text, the label wants an int. The last part, <code>[arg-type]</code>, is the name of the rule. mypy found Ben\'s bug before he typed a single number.',
          'The fix is lesson 13: turn the text into a number with <code>int()</code>. Press <b>Run</b> on the fixed <b>protein.py</b>: <code>Ben gets 60 g of protein</code>. mypy now says <code>Success: no issues found in 1 source file</code>.'
        ],
        tip: 'Your editor can do this as you type. In VS Code, the Python extension\'s <b>Pylance</b> reads the same hints. Open Settings, search for <code>type checking mode</code>, and set it to <b>standard</b>. Then the bad line gets a red wavy underline before you even save.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Label a card yourself.',
        text: [
          'In <b>labels.py</b>, <code>protein_left</code> already has its labels. <code>type Grams = int</code> on line 1 is a <b>type alias</b>: a short, clear name for a type (Python 3.12 and newer). <code>Grams</code> is still just an int, but the def line now says what the number means.',
          'Your turn. <code>per_plate</code> has no labels. Add them on line 8: <code>kcal</code> and <code>servings</code> are whole numbers, and <code>//</code> hands back a whole number. Run it. The last line changes from <code>{}</code> to a dict with three labels in it.',
          'The second box shows something new in <b>Python 3.14</b>: hints are read <b>lazily</b>, only when something asks for them. So a method inside <code>class Pantry</code> can say <code>-&gt; Pantry</code>, even though the class is not finished yet. Press <b>Run</b>: it works. Before 3.14 this stopped with <code>NameError</code>, and people wrote the name in quotes, <code>-&gt; "Pantry"</code>. You will still see the quotes in older code.'
        ],
        tip: 'Hints for a method work like any def line. <code>self</code> never needs one, and <code>__init__</code> hands back nothing, so it gets <code>-&gt; None</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Labels, not locks. And not on every jar.',
        text: [
          'Press <b>Run</b>. <code>goal: int = "lots"</code> runs, and <code>protein_left(140.5, 95)</code> gives <code>45.5</code>. Hints never stop a program. mypy flags both lines, but only if you <b>run mypy</b>. And a function with <b>no</b> hints at all is skipped: mypy says <code>Success</code> about Ben\'s old card, bug and all. The checker can only check labels that are there.',
          '<b>Where hints pay off</b>: the def lines of functions that other code calls, what they return, and dataclass fields. That is where a wrong value comes in from far away. <b>Where they do not</b>: <code>left: int = goal - eaten</code> inside a three-line function, or <code>total = 0</code>. The checker already knows these are ints. Labels on them are noise.',
          '<b>Never use hints to check a guest\'s input.</b> If Ben types <code>thirty</code>, no hint will catch it, because the program is already running. That needs <code>int()</code> and an error message, with <code>try</code> and <code>except</code> (lesson 53) or <code>raise</code> (lesson 54).'
        ],
        warn: 'Next lesson, Virtual environments: a separate kitchen for each project, so mypy, pytest and every other tool you install stay with the project that needs them.'
      }
    ],
    exercises: [
      {
        file: 'l90_jar_labels.py', title: 'Label Kitchen Coach\'s cards',
        task: 'Three of Kitchen Coach\'s functions have no labels: <code>daily_kcal</code>, <code>protein_left</code> and <code>stock_of</code>. Add type hints to all three def lines: every parameter and every return. The comment above each one says what goes in and what comes out. The check reads your hints with <code>typing.get_type_hints</code> and then runs the functions.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Nothing has a label yet, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, change only the three def lines. Use <code>list[int]</code>, <code>dict[str, int]</code>, <code>str</code>, <code>int</code> and <code>int | None</code>.',
          'Run until it says <code>PASS</code>. Got mypy from this lesson? Run <code>python3 -m mypy l90_jar_labels.py</code> too.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def two_portions(grams: int) -> int:', '    return grams * 2', '', 'print(two_portions("5"))'], { title: 'portions.py' }),
        options: ['55', '10', 'TypeError: expected int', 'Nothing. Python refuses to start the file.'],
        answer: 0,
        why: 'Python does not check hints when it runs. <code>"5" * 2</code> repeats the text, so it prints <code>55</code>. Only a type checker like mypy would have warned you.',
        hint: 'Does Python read the label <code>: int</code> when the program runs?'
      },
      {
        type: 'match', q: 'Match each value to the hint that fits it.',
        pairs: [
          ['["oats", "rice"]', 'list[str]'],
          ['{"rice": 900, "oats": 400}', 'dict[str, int]'],
          ['(83, 1)', 'tuple[int, int]'],
          ['pantry.get("tofu"), which may be None', 'int | None'],
          ['"lentil soup"', 'str']
        ],
        why: 'Square brackets say what is inside: a list of text, a dict from text to whole numbers, a tuple of exactly two ints. <code>int | None</code> is for a value that may be missing.'
      },
      {
        type: 'pick', q: 'mypy prints this. What is it telling you?',
        pic: term(['$ python3 -m mypy coach.py', 'coach.py:6: error: Argument 1 to "daily_kcal" has incompatible type "str"; expected "list[int]"  [arg-type]', 'Found 1 error in 1 file (checked 1 source file)'], 'terminal'),
        options: [
          'On line 6, the first value passed to daily_kcal is text, but its label asks for a list of ints',
          'daily_kcal returns a str instead of a list',
          'Python crashed on line 6 while running coach.py',
          'mypy is not installed correctly'
        ],
        answer: 0,
        why: 'mypy did not run your program. It read it. <code>Argument 1</code> is the first value you passed, <code>"str"</code> is what you gave, and <code>expected "list[int]"</code> is the label on the parameter.',
        hint: 'Read it left to right: the file and line, which argument, what it got, what it expected.'
      },
      {
        type: 'fix', q: 'Add type hints to <code>protein_left</code>: <code>goal</code> and <code>eaten</code> are ints, and it returns an int. It should still print <code>45</code>.',
        code: ['def protein_left(goal, eaten):', '    return goal - eaten', '', '', 'print(protein_left(140, 95))'],
        title: 'left.py',
        check: [
          'hints = protein_left.__annotations__',
          'if out.strip() != "45":',
          '    msg = "It should still print 45."',
          'elif hints.get("goal") is not int or hints.get("eaten") is not int:',
          '    msg = "Label both parameters: goal: int and eaten: int"',
          'elif hints.get("return") is not int:',
          '    msg = "Add the return label: -> int after the brackets, before the colon."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>def protein_left(goal: int, eaten: int) -&gt; int:</code>. A colon and a type after each parameter, an arrow and a type after the brackets, then the colon that ends the def line.',
        hint: 'The arrow goes between <code>)</code> and <code>:</code>.'
      },
      {
        type: 'fix', q: 'Ben types 30 and gets <code>3030 g</code>. Fix it so he gets <code>60 g</code>. Keep the hints.',
        code: benBug, title: 'protein.py', inputs: ['30'],
        check: [
          'if "Ben gets 60 g of protein" not in out:',
          '    msg = "With 30 typed in, it should print: Ben gets 60 g of protein"',
          'elif two_portions.__annotations__.get("grams") is not int:',
          '    msg = "It works, but keep the label grams: int on the def line."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>input()</code> always gives text. Turn it into a number before it goes into the jar: <code>grams = int(input("Protein in one portion (g)? "))</code>. Now the value matches the label, and mypy agrees.',
        hint: 'Lesson 13: which function turns "30" into 30?'
      },
      {
        type: 'pick', q: 'Back to lesson 38. <code>stock_of</code> returns <code>pantry.get(item)</code>. Which return hint is right?',
        pic: code(['def stock_of(pantry: dict[str, int], item: str) -> ???:', '    return pantry.get(item)', '', 'pantry = {"rice": 900, "oats": 400}', 'print(stock_of(pantry, "rice"))', 'print(stock_of(pantry, "tofu"))'], { title: 'pantry.py' }),
        options: ['int | None', 'int', 'str', 'dict[str, int]'],
        answer: 0,
        why: '<code>.get()</code> with no default hands back <code>None</code> when the key is missing. So the card gives 900 for rice and <code>None</code> for tofu: an int, or None. Old code writes <code>Optional[int]</code>.',
        hint: 'What does <code>.get()</code> give for a key that is not there?'
      },
      {
        type: 'bucket', q: 'Is a type hint worth it here, or does it add nothing?',
        buckets: ['Hint it', 'Skip it'],
        items: [
          ['the parameters of a function other files call', 0],
          ['what a function returns', 0],
          ['a field in a dataclass', 0],
          ['the loop name in for meal in meals', 1],
          ['total = 0 inside a short function', 1],
          ['checking that a guest typed a number', 1]
        ],
        why: 'Hint the edges: what goes into and out of a function, and dataclass fields (they need one). The checker already knows simple local values. And hints never check anything while the program runs, so a guest\'s input needs <code>int()</code> and an error message instead.',
        hint: 'Hints help where a value comes in from somewhere else. And they do nothing while the program runs.'
      },
      {
        type: 'fill', q: 'Finish the labels on Kitchen Coach\'s pantry card.',
        text: 'def stock_of(pantry: ___[str, int], item: str) ___ int ___ None:\n    return pantry.get(item)',
        options: ['dict', '->', '|', 'list', 'or', ':'],
        answer: ['dict', '->', '|'],
        why: 'The pantry is a dict from text to ints, <code>dict[str, int]</code>. The arrow <code>-&gt;</code> introduces the return hint. <code>int | None</code> means an int or None. The word <code>or</code> does not work in a hint.',
        hint: 'The pantry is the spice rack from lesson 37.'
      }
    ]
  });
})();
