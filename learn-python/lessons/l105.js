/* Lesson 105: The pantry (module 10). One file per lesson.
   Builds Kitchen Coach's pantry.py: class Pantry (__contains__, __getitem__, __len__, has_all,
   an all-or-nothing take), load_pantry and save_pantry. Names and numbers follow the shared
   module 10 spec. Every Run box was checked with Python 3.14.4 (Homebrew) and in this page
   (Pyodide, Python 3.14). The terminal picture is real: Python 3.15.2, macOS, 2026-11-25,
   with the long paths shortened to /Users/ana/kitchen-coach and .../json. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l105  The pantry
     ===================================================================== */

  // data/pantry.json exactly as lesson 103 seeds it.
  const GRAMS = { rice: 1000, lentils: 400, carrots: 500, tofu: 200, 'soy sauce': 100, pasta: 500, cheese: 200, beans: 300, tomatoes: 400, chicken: 300, milk: 1000, yogurt: 400, berries: 150 };
  const PANTRY = JSON.stringify(GRAMS, null, 2) + '\n';
  const BROKEN = '{\n  "rice": 1000,\n  "tofu": 200,\n}\n';

  /* ---- pantry.py, the real file (src/kitchen_coach/pantry.py in the project) ---- */
  const PANTRY_LINES = [
    'import json',
    'from pathlib import Path',
    '',
    '',
    'class Pantry:',
    '    """What is in the kitchen: ingredient name -> grams."""',
    '',
    '    def __init__(self, grams: dict[str, int] | None = None) -> None:',
    '        self.grams = dict(grams or {})  # a copy, not the caller\'s dict',
    '',
    '    def __contains__(self, name: str) -> bool:',
    '        return name in self.grams',
    '',
    '    def __getitem__(self, name: str) -> int:',
    '        return self.grams.get(name, 0)  # nothing on the shelf: 0 g',
    '',
    '    def __len__(self) -> int:',
    '        return len(self.grams)',
    '',
    '    def has_all(self, ingredients: dict[str, int]) -> bool:',
    '        """True if there is enough of every ingredient."""',
    '        for name, need in ingredients.items():',
    '            if self[name] < need:',
    '                return False',
    '        return True',
    '',
    '    def take(self, ingredients: dict[str, int]) -> None:',
    '        """Take every ingredient out, or nothing at all."""',
    '        for name, need in ingredients.items():  # 1. check them all',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
    '        for name, need in ingredients.items():  # 2. then take',
    '            self.grams[name] = self[name] - need',
    '',
    '',
    'def load_pantry(path: Path) -> Pantry:',
    '    """Read the pantry file. No file yet: an empty pantry."""',
    '    try:',
    '        text = path.read_text()',
    '    except FileNotFoundError:',
    '        print(f"note: no {path} yet, starting with an empty pantry")',
    '        return Pantry()',
    '    try:',
    '        return Pantry(json.loads(text))',
    '    except json.JSONDecodeError as err:',
    '        raise ValueError(f"{path} is not valid JSON: {err}") from err',
    '',
    '',
    'def save_pantry(pantry: Pantry, path: Path) -> None:',
    '    """Write the pantry as JSON, one item per line, sorted by name."""',
    '    path.write_text(json.dumps(pantry.grams, indent=2, sort_keys=True) + "\\n")'
  ];
  const PANTRY_PY = PANTRY_LINES.join('\n') + '\n';
  const FILES = { 'pantry.py': PANTRY_PY, 'data/pantry.json': PANTRY };

  /* ---- The idea: a shelf of jars, and the questions Kitchen Coach asks it ---- */
  const jar = (x, name, g, col) =>
    `<rect x="${x + 6}" y="44" width="72" height="12" rx="4" fill="${P.ink}"/>` +
    `<rect x="${x}" y="54" width="84" height="104" rx="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 4}" y="${158 - Math.min(96, g / 11)}" width="76" height="${Math.min(96, g / 11) - 4}" rx="10" fill="${col}" opacity="0.35"/>` +
    `<rect x="${x + 8}" y="78" width="68" height="30" rx="6" fill="${P.white}" stroke="${P.ink2}" stroke-width="1.5"/>` +
    T(x + 42, 98, name, { s: 12, w: 800 }) + T(x + 42, 140, g + ' g', { s: 14, m: true });
  const shelfSvg = svg(600, 196, 'A pantry shelf of labelled jars, from data/pantry.json: rice 1000 g, tofu 200 g, soy sauce 100 g, chicken 300 g, pasta 500 g, milk 1000 g, and 7 more jars. 13 jars in all.',
    [['rice', 1000, P.warn], ['tofu', 200, P.ok], ['soy sauce', 100, P.ink2], ['chicken', 300, P.danger], ['pasta', 500, P.warn], ['milk', 1000, P.accent]]
      .map((j, i) => jar(10 + i * 96, j[0], j[1], j[2])).join('') +
    `<rect x="4" y="160" width="592" height="12" rx="4" fill="${P.ink}"/>` +
    T(300, 26, 'data/pantry.json: 13 jars on the shelf (6 shown)', { s: 13, f: P.ink2 }) +
    T(300, 192, '... lentils, carrots, cheese, beans, tomatoes, yogurt, berries', { s: 11.5, w: 700, f: P.ink2 }));
  const asks = [
    ['"rice" in pantry', 'True', '__contains__'],
    ['pantry["tofu"]', '200', '__getitem__'],
    ['pantry["flour"]', '0', 'missing: 0 g'],
    ['len(pantry)', '13', '__len__'],
    ['pantry.has_all(stir_fry)', 'True', 'enough of every item?'],
    ['pantry.take(stir_fry)', 'tofu 50, rice 925', 'all or nothing']
  ];
  const askSvg = svg(600, 300, 'What Kitchen Coach asks the pantry, and the answers. "rice" in pantry gives True, through __contains__. pantry["tofu"] gives 200, through __getitem__. pantry["flour"] gives 0: missing means 0 g. len(pantry) gives 13, through __len__. pantry.has_all(stir_fry) gives True: enough of every item. pantry.take(stir_fry) leaves tofu 50 and rice 925, all or nothing.',
    asks.map((a, i) => {
      const y = 10 + i * 48;
      return box(10, y, 580, 40, i >= 4 ? P.okT : P.white, 10) +
        T(26, y + 26, a[0], { s: 13.5, m: true, a: 'start' }) +
        arrow(290, y + 20, 318, y + 20, P.ink2, 2) +
        T(330, y + 26, a[1], { s: 13.5, m: true, a: 'start', f: P.accent }) +
        T(578, y + 26, a[2], { s: 11.5, w: 800, a: 'end', f: P.ink2 });
    }).join(''));
  const daySvg = svg(600, 110, 'One day of the pantry. Morning: load_pantry reads pantry.json. During the day: has_all and take. Night: save_pantry writes pantry.json. Tomorrow starts from that file.',
    [['morning', 'load_pantry', P.accent], ['all day', 'has_all, take', P.ok], ['night', 'save_pantry', P.warn]].map((c, i) => {
      const x = 14 + i * 200;
      return box(x, 18, 172, 70, P.white, 12) + T(x + 86, 44, c[0], { s: 12, w: 800, f: c[2] }) + T(x + 86, 70, c[1], { s: 13.5, m: true }) +
        (i < 2 ? arrow(x + 174, 53, x + 198, 53, P.ink2, 2.5) : '');
    }).join('') +
    T(300, 106, 'pantry.json in the evening is tomorrow\'s pantry.json in the morning', { s: 12, w: 700, f: P.ink2 }));
  const ideaPic = `<div style="width:100%;min-width:0">${shelfSvg}${askSvg}${daySvg}</div>`;

  /* ---- The code: pantry.py, and a day in coach.py ---- */
  const coach = [
    'from pathlib import Path',
    'from pantry import Pantry, load_pantry, save_pantry',
    '',
    'path = Path("data/pantry.json")',
    'pantry = load_pantry(path)',
    'print(len(pantry), "things in the pantry")',
    'print("tofu" in pantry, "flour" in pantry)',
    'print("tofu:", pantry["tofu"], "g   flour:", pantry["flour"], "g")',
    '',
    'meal = {"tofu": 150, "rice": 75, "soy sauce": 15}  # tofu stir-fry',
    'if pantry.has_all(meal):',
    '    pantry.take(meal)',
    '    print("took the meal:", meal)',
    'print("tofu:", pantry["tofu"], "g   rice:", pantry["rice"], "g")',
    '',
    'save_pantry(pantry, path)',
    'print()',
    'print(path.read_text())'
  ];
  const codePic = `<div style="width:100%;min-width:0">${code(PANTRY_LINES, { title: 'pantry.py', hi: [9, 15, 29, 33] })}${run(coach, { title: 'coach.py', files: FILES })}</div>`;

  /* ---- The pain: take one item at a time ---- */
  const naive = [
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = dict(grams)',
    '',
    '    def __getitem__(self, name):',
    '        return self.grams.get(name, 0)',
    '',
    '    def take(self, ingredients):',
    '        """Naive: take each item, one at a time."""',
    '        for name, need in ingredients.items():',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
    '            self.grams[name] = have - need',
    '',
    '',
    'pantry = Pantry({"rice": 1000, "chicken": 300})',
    'three_bowls = {"rice": 300, "chicken": 450}  # 3 chicken rice bowls',
    '',
    'print("before:", pantry.grams)',
    'try:',
    '    pantry.take(three_bowls)',
    'except ValueError as err:',
    '    print("no bowls:", err)',
    'print("after: ", pantry.grams)'
  ];
  const halfJar = (x, name, before, after, col, note, dashed) =>
    `<rect x="${x}" y="44" width="150" height="150" rx="18" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 75, 72, name, { s: 15 }) +
    T(x + 75, 116, before + ' g', { s: 16, m: true, f: after == null ? P.ink : P.mute }) +
    (after == null ? '' : `<line x1="${x + 40}" y1="110" x2="${x + 110}" y2="110" stroke="${P.mute}" stroke-width="2"/>` + T(x + 75, 152, after + ' g', { s: 18, m: true, f: col })) +
    (dashed ? `<rect x="${x - 10}" y="34" width="170" height="170" rx="24" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="8 6"/>` : '') +
    T(x + 75, 226, note, { s: 12.5, w: 800, f: col });
  const painSvg = svg(600, 250, 'The naive take for 3 chicken rice bowls: rice 300 g, then chicken 450 g. The loop takes the rice first: 1000 g becomes 700 g. Then it reaches the chicken: only 300 g, 450 g needed, so it raises ValueError. No bowls are cooked, but the rice is gone anyway. The pantry is half-taken.',
    T(300, 22, 'take({"rice": 300, "chicken": 450}), one item at a time', { s: 13, m: true }) +
    halfJar(60, 'rice', 1000, 700, P.danger, '1. taken anyway', true) +
    halfJar(390, 'chicken', 300, null, P.danger, '2. need 450 g: ValueError') +
    arrow(226, 120, 372, 120, P.ink2, 2.5) +
    `<circle cx="465" cy="168" r="14" fill="${P.danger}"/>` + T(465, 173, '✗', { s: 15, f: P.white }));
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(naive, { title: 'naive_take.py' })}</div>`;

  /* ---- The fix: check everything first, then change ---- */
  const allOrNothing = [
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = dict(grams)',
    '',
    '    def __getitem__(self, name):',
    '        return self.grams.get(name, 0)',
    '',
    '    def take(self, ingredients):',
    '        """All or nothing: check every item first, then take."""',
    '        for name, need in ingredients.items():',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
    '        for name, need in ingredients.items():',
    '            self.grams[name] = self[name] - need',
    '',
    '',
    'pantry = Pantry({"rice": 1000, "chicken": 300})',
    'three_bowls = {"rice": 300, "chicken": 450}  # 3 chicken rice bowls',
    'two_bowls = {"rice": 200, "chicken": 300}    # 2 chicken rice bowls',
    '',
    'print("before:", pantry.grams)',
    'try:',
    '    pantry.take(three_bowls)',
    'except ValueError as err:',
    '    print("no bowls:", err)',
    'print("after: ", pantry.grams)',
    '',
    'pantry.take(two_bowls)',
    'print("2 bowls:", pantry.grams)'
  ];
  const lane = (y, title, rows, col) =>
    T(14, y, title, { s: 13.5, a: 'start', f: col }) +
    rows.map((r, i) => {
      const x = 14 + i * 196;
      return `<rect x="${x}" y="${y + 14}" width="180" height="50" rx="10" fill="${r[1]}" stroke="${P.ink}" stroke-width="2"/>` + T(x + 90, y + 45, r[0], { s: 13, w: 800 });
    }).join('');
  const fixSvg = svg(600, 196, 'All or nothing, in two loops. Loop 1 only checks: rice 300 of 1000, yes. Chicken 450 of 300, no: raise ValueError, and the second loop never runs, so nothing changed. When every check passes, loop 2 takes every item.',
    lane(20, 'Loop 1: only check', [['rice: 300 ≤ 1000 ✓', P.okT], ['chicken: 450 > 300 ✗', P.dangerT], ['raise ValueError', P.white]], P.ink) +
    lane(112, 'Loop 2: only take (runs only if loop 1 found nothing short)', [['rice 1000 (kept)', P.white], ['chicken 300 (kept)', P.white], ['all or nothing', P.okT]], P.ok));
  const fixPic = `<div style="width:100%;min-width:0">${fixSvg}${run(allOrNothing, { title: 'take.py' })}</div>`;

  /* ---- Try it: the first day, and a broken file ---- */
  const firstDay = [
    'from pathlib import Path',
    'from pantry import load_pantry',
    '',
    'empty = load_pantry(Path("data/pantry2.json"))',
    'print(len(empty), "things, tofu:", empty["tofu"], "g")',
    '',
    'try:',
    '    pantry = load_pantry(Path("data/broken.json"))',
    '    print(len(pantry), "things, tofu:", pantry["tofu"], "g")',
    'except ValueError as err:',
    '    print("stopped:", err)'
  ];
  const brokenFile = code(BROKEN.trimEnd().split('\n'), { title: 'data/broken.json', bad: [3] });
  const traceback = term([
    '$ python3 tb.py',
    'Traceback (most recent call last):',
    '  File "/Users/ana/kitchen-coach/pantry.py", line 45, in load_pantry',
    '    return Pantry(json.loads(text))',
    '  ...',
    'json.decoder.JSONDecodeError: Illegal trailing comma before end of object: line 3 column 14 (char 31)',
    '',
    'The above exception was the direct cause of the following exception:',
    '',
    'Traceback (most recent call last):',
    '  File "/Users/ana/kitchen-coach/tb.py", line 3, in <module>',
    '    load_pantry(Path("data/broken.json"))',
    '  File "/Users/ana/kitchen-coach/pantry.py", line 47, in load_pantry',
    '    raise ValueError(f"{path} is not valid JSON: {err}") from err',
    'ValueError: data/broken.json is not valid JSON: Illegal trailing comma before end of object: line 3 column 14 (char 31)'
  ], 'the same broken file with no try around it, terminal, Python 3.15');
  const tryPic = `<div style="width:100%;min-width:0">${brokenFile}${run(firstDay, { title: 'first_day.py', files: { 'pantry.py': PANTRY_PY, 'data/pantry.json': PANTRY, 'data/broken.json': BROKEN } })}${traceback}</div>`;

  /* ---- The catch: copy what you are given, and save safely ---- */
  const shared = [
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = grams  # no copy: the same dict as the caller\'s',
    '',
    '    def take(self, ingredients):',
    '        for name, need in ingredients.items():',
    '            if self.grams.get(name, 0) < need:',
    '                raise ValueError(f"not enough {name}")',
    '        for name, need in ingredients.items():',
    '            self.grams[name] -= need',
    '',
    '',
    'yesterday = {"tofu": 200, "rice": 1000}',
    'pantry = Pantry(yesterday)',
    'pantry.take({"tofu": 150, "rice": 75})',
    'print("pantry:   ", pantry.grams)',
    'print("yesterday:", yesterday)',
    'print("same dict?", pantry.grams is yesterday)'
  ];
  const atomic = code([
    'def save_pantry(pantry: Pantry, path: Path) -> None:',
    '    """Write to a .tmp file first, then swap it in."""',
    '    tmp = path.with_suffix(".tmp")      # data/pantry.tmp',
    '    tmp.write_text(json.dumps(pantry.grams, indent=2, sort_keys=True) + "\\n")',
    '    tmp.replace(path)                   # one step: old file out, new file in'
  ], { title: 'pantry.py: a safer save (optional)', good: [3, 4, 5] });
  const catchPic = `<div style="width:100%;min-width:0">${run(shared, { title: 'shared.py' })}${atomic}</div>`;

  COURSE.add({
    id: 'l105', minutes: 15,
    video: {
      src: 'videos/l105-the-pantry.mp4', poster: 'videos/l105-the-pantry.jpg', length: '1 min 9 s',
      script: [
        'This is Kitchen Coach\'s pantry. A shelf of jars, loaded from a file. Rice, 1000 grams. Tofu, 200. Chicken, 300.',
        'Ben asks for a tofu stir-fry. First, a checker walks the recipe. Tofu, enough. Rice, enough. Soy sauce, enough. Only then do we scoop. Tofu drops to 50. Rice to 925. Soy sauce to 85.',
        'Now Ana wants 3 chicken rice bowls. Rice, fine. Chicken? She needs 450 grams. There are only 300. The checker stops. Nothing is scooped. All or nothing.',
        'The naive way scoops as it goes. The rice is gone before the chicken fails. 300 grams, taken for bowls nobody cooks. Wrong.',
        'At night, save the shelf to a page in the notebook. pantry.json. Next morning, load it back. Same jars, same grams.',
        'Check everything first, then change. Save what you have, load it tomorrow.'
      ]
    },
    summary: 'Kitchen Coach\'s second real file is <code>pantry.py</code>. <code>class Pantry</code> wraps a dict of name to grams, and <b>copies</b> it in <code>__init__</code> (<code>dict(grams or {})</code>), so the caller\'s dict is not shared (lesson 97). The dunders from lesson 101 make it feel built in: <code>"rice" in pantry</code> (<code>__contains__</code>), <code>pantry["tofu"]</code> gives <code>200</code> and a missing item gives <code>0</code> (<code>__getitem__</code> with <code>.get(name, 0)</code>), <code>len(pantry)</code> is <code>13</code>. <code>has_all(ingredients)</code> says if there is enough of <b>every</b> item. <code>take(ingredients)</code> is <b>all or nothing</b>: a first loop only <b>checks</b> and raises <code>ValueError: not enough chicken: need 450 g, have 300 g</code>, a second loop only <b>subtracts</b>. Taking one item at a time leaves a <b>half-taken pantry</b>: the rice is gone, and no bowls were cooked. <code>load_pantry(path)</code> reads the JSON file, starts with an <b>empty Pantry</b> when there is no file yet, and turns a broken file into a <code>ValueError</code> that <b>names the file</b>. <code>save_pantry(pantry, path)</code> writes <code>json.dumps(..., indent=2, sort_keys=True)</code>. A safer save writes a <code>.tmp</code> file first, then swaps it in.',
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A shelf of jars that answers questions.',
        text: [
          'The pantry is a <b>shelf of labelled jars</b>, each with a number of grams. Lesson 103 kept it as a plain dict in <code>data/pantry.json</code>, and promised that only <code>pantry.py</code> would look inside it. This lesson writes that file.',
          'Kitchen Coach asks the pantry questions. Is there rice? How much tofu? Is there enough for a tofu stir-fry? Then it <b>takes</b> the food out. With the dunders from lesson 101, the questions use Python\'s own syntax: <code>"rice" in pantry</code>, <code>pantry["tofu"]</code>, <code>len(pantry)</code>.',
          'The pantry also has to <b>survive the night</b>. In the morning, <code>load_pantry</code> reads the file. At night, <code>save_pantry</code> writes it back. Tomorrow starts from what is left today.'
        ],
        tip: 'A jar that is not on the shelf has <b>0 g</b>. So <code>pantry["flour"]</code> gives <code>0</code>, not a <code>KeyError</code>. That makes "is there enough?" one simple comparison for every item.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'pantry.py: one class and two functions.',
        text: [
          '<code>__init__</code> keeps <code>dict(grams or {})</code>: a <b>new dict</b> with the same items (lesson 97). <code>grams or {}</code> uses an empty dict when you give nothing, so <code>Pantry()</code> is an empty pantry. <code>__getitem__</code> uses <code>.get(name, 0)</code>, so a missing jar is 0 g. <code>has_all</code> goes through the recipe and says <code>False</code> as soon as one item is short.',
          '<code>save_pantry</code> uses <code>json.dumps</code> and <code>write_text</code> from lesson 59. The new part, <code>sort_keys=True</code>, writes the names in <b>A to Z order</b>. The file then looks the same every day, so a change is easy to spot (and easy to read in Git, lesson 93).',
          'Press <b>Run</b> on <code>coach.py</code>. It imports the real <code>pantry.py</code>, loads the 13 jars, takes a <b>tofu stir-fry</b> (tofu 200 to <b>50</b>, rice 1000 to <b>925</b>, soy sauce 100 to <b>85</b>), saves, and reads the file back: now in A to Z order. Then change <code>meal</code> to a pasta bake, <code>{"pasta": 100, "cheese": 40}</code>, and print <code>pantry["pasta"]</code>.'
        ],
        tip: '<code>load_pantry</code> and <code>save_pantry</code> take a <code>Path</code> (lesson 58), not a string. <code>cli.py</code> builds it once, <code>Path("data/pantry.json")</code>, and hands it to both.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Take one item at a time, and fail halfway.',
        text: [
          'The first idea for <code>take</code> is one loop: for each item, check it, then subtract it. It looks fine, and it works for every recipe that fits.',
          'Now Ana wants <b>3 chicken rice bowls</b>: <code>{"rice": 300, "chicken": 450}</code>. Press <b>Run</b>. The loop takes the rice first: <b>1000 becomes 700</b>. Then it reaches the chicken: 300 g, and it needs 450 g. <code>ValueError: not enough chicken: need 450 g, have 300 g</code>. The <code>try</code> from lesson 53 catches it, and the program carries on.',
          'But look at <code>after</code>: <code>{\'rice\': 700, \'chicken\': 300}</code>. No bowls were cooked, and <b>300 g of rice is gone</b> anyway. The planner in lesson 106 now thinks there is less rice than there is, and tonight <code>save_pantry</code> writes the wrong number into the file. Tomorrow it is still wrong.'
        ],
        warn: 'An error halfway through a change leaves the data <b>half-changed</b>. Nothing crashes, so nobody notices.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Check everything first. Then change.',
        text: [
          'Split <code>take</code> into <b>two loops</b>. The first loop <b>only checks</b>. If any item is short, it raises the <code>ValueError</code> at once, before anything has changed (lesson 54: refuse loudly). The second loop <b>only subtracts</b>, and it runs only when every check passed.',
          'Press <b>Run</b> on <code>take.py</code>. The same 3 bowls are refused with the same message, and <code>after</code> is <code>{\'rice\': 1000, \'chicken\': 300}</code>: <b>nothing changed</b>. Then 2 bowls fit: rice <b>800</b>, chicken <b>0</b>.',
          'This is called <b>all or nothing</b>. A bank moves money the same way: it never takes it from one account unless it can put it in the other. In <b>both</b> boxes, change <code>three_bowls</code> to <code>{"chicken": 450, "rice": 300}</code> and run them again. The naive one now keeps the rice by luck, because the chicken comes first. The two-loop one works in any order.'
        ],
        tip: 'You could also write <code>if not self.has_all(ingredients):</code> as the first step. The loop is used here because it can say <b>which</b> item is short and by how much.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'The first day, and a broken file.',
        text: [
          'On the <b>first day</b> there is no pantry file yet. <code>load_pantry</code> catches <code>FileNotFoundError</code> (lesson 59), prints a short note, and returns <code>Pantry()</code>: an empty shelf. Kitchen Coach still runs, and plans nothing.',
          'A <b>broken file</b> is different. Someone typed a comma after the last item in <code>data/broken.json</code>. That is not a first day, it is a mistake, so <code>load_pantry</code> must not hide it behind an empty pantry, or tonight\'s save would wipe the real numbers. json raises <code>json.JSONDecodeError</code>, its own error for "this text is not JSON". Its message says <code>line 3 column 14</code>, but not <b>which file</b>. So <code>load_pantry</code> catches it and raises a <code>ValueError</code> that names the file. <code>from err</code> keeps the first error attached, so the terminal shows both (picture below).',
          'Press <b>Run</b>. Then change <code>"data/broken.json"</code> to <code>"data/pantry.json"</code> and run it again: 13 things, tofu 200 g.'
        ],
        tip: 'Catch only what you can <b>handle</b>. A missing file has a good answer (start empty). A broken file does not, so it still stops the program, just with a clearer message.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Copy what you are given. And a safer save.',
        text: [
          'Why does <code>__init__</code> copy the dict? Press <b>Run</b> on <code>shared.py</code>, where it does not. <code>pantry.take(...)</code> also changed <code>yesterday</code>: both labels are tied to <b>one dict</b> (lesson 97), and <code>pantry.grams is yesterday</code> is <code>True</code>. Change line 3 to <code>self.grams = dict(grams)</code> and run it again: <code>yesterday</code> keeps 200 g of tofu.',
          '<code>in</code> asks if the jar is <b>on the shelf</b>, not if it has food in it. After 2 chicken bowls, <code>"chicken" in pantry</code> is still <code>True</code> with 0 g. Ask <code>pantry["chicken"] &gt; 0</code>, or better, <code>has_all</code>.',
          'Optional: <b>a safer save</b>. If the computer stops in the middle of <code>write_text</code>, <code>pantry.json</code> can be left half-written. The safer way writes a <code>.tmp</code> file first, then swaps it in. <code>.with_suffix(".tmp")</code> changes the file ending, and <code>.replace(path)</code> renames the new file over the old one in one step. Either the old file is there, or the new one. All or nothing, again.',
          'Next lesson, <b>The meal planner</b>, uses <code>pantry.has_all</code> and <code>pantry.take</code> to fit meals to each friend\'s goals.'
        ],
        warn: 'Check everything first, then change. Save what you have, load it tomorrow.'
      }
    ],
    exercises: [
      {
        file: 'l105_pantry.py', title: 'Write the pantry',
        task: 'The file is Kitchen Coach\'s <code>pantry.py</code>. <code>Pantry</code> already copies its dict and has <code>__contains__</code>, <code>__getitem__</code> and <code>__len__</code>. Write <code>has_all</code>, an <b>all-or-nothing</b> <code>take</code>, <code>load_pantry</code> (an empty Pantry when there is no file) and <code>save_pantry</code> (JSON, <code>indent=2</code>, <code>sort_keys=True</code>).',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The hint says <code>has_all</code> is still a stub.',
          'Between <code>START</code> and <code>END</code>, write <code>has_all</code>: a loop over <code>ingredients.items()</code> that returns <code>False</code> when <code>self[name] &lt; need</code>, and <code>True</code> after the loop.',
          'Write <code>take</code> with <b>two</b> loops: the first only checks and raises <code>ValueError(f"not enough {name}: need {need} g, have {have} g")</code>, the second only subtracts.',
          'Write <code>load_pantry</code> with <code>try</code>, <code>path.read_text()</code> and <code>except FileNotFoundError:</code>, and <code>save_pantry</code> with <code>path.write_text(json.dumps(...))</code>.',
          'Run it until it says <code>PASS</code>. The check works in a temporary folder (Python\'s <code>tempfile</code> module), so your own files are safe. It also checks that a failed <code>take</code> changes nothing.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The pantry has rice 1000 g and chicken 300 g. The <b>naive</b> one-loop <code>take</code> gets <code>{"rice": 300, "chicken": 450}</code> and raises <code>ValueError</code>. How much rice is left?',
        options: ['700 g', '1000 g', '0 g', '550 g'],
        answer: 0,
        why: 'The loop subtracts the rice first (1000 - 300 = 700), then finds the chicken short and raises. Nothing puts the rice back: the pantry is half-taken.',
        hint: 'Which item does the loop reach first, and what does it do to it before moving on?'
      },
      {
        type: 'fix', q: 'This <code>take</code> leaves the pantry half-taken. Make it <b>all or nothing</b>: after the failed 3 bowls, rice must still be 1000.',
        code: [
          'class Pantry:',
          '    def __init__(self, grams):',
          '        self.grams = dict(grams)',
          '',
          '    def take(self, ingredients):',
          '        for name, need in ingredients.items():',
          '            have = self.grams.get(name, 0)',
          '            if have < need:',
          '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
          '            self.grams[name] = have - need',
          '',
          '',
          'pantry = Pantry({"rice": 1000, "chicken": 300})',
          'try:',
          '    pantry.take({"rice": 300, "chicken": 450})',
          'except ValueError as err:',
          '    print("no bowls:", err)',
          'print(pantry.grams)',
          'pantry.take({"rice": 100, "chicken": 150})',
          'print(pantry.grams)'
        ],
        title: 'take.py',
        check: [
          'lines = [l.strip() for l in out.splitlines()]',
          'want = ["no bowls: not enough chicken: need 450 g, have 300 g", "{\'rice\': 1000, \'chicken\': 300}", "{\'rice\': 900, \'chicken\': 150}"]',
          'if lines == want:',
          '    ok = True',
          'elif "{\'rice\': 700, \'chicken\': 300}" in lines:',
          '    msg = "Rice is still 700 after the failed take. Check every item in a first loop, and subtract only in a second loop."',
          'else:',
          '    msg = "It should print: " + " / ".join(want)'
        ].join('\n'),
        why: 'Move the subtraction into a second loop: <code>for name, need in ingredients.items(): self.grams[name] = self.grams.get(name, 0) - need</code>. The first loop now only checks, so the error comes before any change. Then one chicken rice bowl fits: rice 900, chicken 150.',
        hint: 'Delete the last line of the loop. Below the loop, add a second for loop that does only the subtraction.'
      },
      {
        type: 'fix', q: 'On the first day there is no <code>pantry.json</code>, and this stops with <code>FileNotFoundError</code>. Make <code>load_pantry</code> return an <b>empty</b> Pantry instead.',
        code: [
          'import json',
          'from pathlib import Path',
          '',
          '',
          'class Pantry:',
          '    def __init__(self, grams=None):',
          '        self.grams = dict(grams or {})',
          '',
          '    def __len__(self):',
          '        return len(self.grams)',
          '',
          '',
          'def load_pantry(path):',
          '    text = path.read_text()',
          '    return Pantry(json.loads(text))',
          '',
          '',
          'pantry = load_pantry(Path("pantry.json"))',
          'print(len(pantry), "things")'
        ],
        title: 'first_day.py',
        check: [
          'lines = [l.strip() for l in out.splitlines()]',
          'if lines and lines[-1] == "0 things":',
          '    ok = True',
          'else:',
          '    msg = "The last line should be: 0 things. Put the read_text() line in try, and return Pantry() in except FileNotFoundError."'
        ].join('\n'),
        why: '<code>try: text = path.read_text()</code> then <code>except FileNotFoundError: return Pantry()</code>. A missing file on the first day has a good answer: an empty shelf. Catch only that error, so a broken file still speaks up.',
        hint: 'try: on the read_text() line, then except FileNotFoundError: return Pantry()'
      },
      {
        type: 'match', q: 'Back to lesson 101. Match each line to the method Python calls.',
        pairs: [
          ['"rice" in pantry', '__contains__'],
          ['pantry["tofu"]', '__getitem__'],
          ['len(pantry)', '__len__'],
          ['Pantry({"rice": 1000})', '__init__']
        ],
        why: 'Python\'s syntax plugs into dunder methods: <code>in</code> calls <code>__contains__</code>, square brackets call <code>__getitem__</code>, <code>len()</code> calls <code>__len__</code>, and making a new object calls <code>__init__</code>.',
        hint: 'The name of each dunder says what it is for: contains, get item, length.'
      },
      {
        type: 'pick', q: 'Back to lesson 97. <code>__init__</code> says <code>self.grams = grams</code>, with no copy. You run <code>pantry = Pantry(yesterday)</code>, then <code>pantry.take({"tofu": 150})</code>. What happens to <code>yesterday["tofu"]</code>?',
        options: ['It drops from 200 to 50 too: both labels are on one dict', 'It stays 200: Pantry got its own dict', 'It raises an error', 'It becomes 0'],
        answer: 0,
        why: 'Assignment ties a second label to the same dict. Changing it through <code>self.grams</code> changes <code>yesterday</code> too. <code>dict(grams)</code> makes a new dict, so the caller\'s stays as it was.',
        hint: 'Does <code>self.grams = grams</code> make a new dict?'
      },
      {
        type: 'pick', q: 'The pantry has chicken 300 g and no flour. Which answers are right? Pick all.',
        options: ['pantry["flour"] gives 0', '"flour" in pantry gives False', 'pantry.has_all({"chicken": 300}) gives True', 'pantry["flour"] raises KeyError'],
        answer: [0, 1, 2],
        why: '<code>__getitem__</code> uses <code>.get(name, 0)</code>, so a missing item is 0 g, not a KeyError. <code>in</code> asks if the jar is on the shelf. 300 g of chicken is enough for 300 g: the check is <code>have &lt; need</code>, and 300 is not less than 300.',
        hint: 'Look at __getitem__: .get(name, 0).'
      },
      {
        type: 'bucket', q: 'What does Kitchen Coach\'s pantry.py do in each case?',
        buckets: ['carry on quietly', 'stop with an error'],
        items: [
          ['data/pantry.json does not exist yet', 0],
          ['data/pantry.json has a comma after the last item', 1],
          ['take() needs 450 g chicken and there is 300 g', 1],
          ['pantry["flour"] and there is no flour jar', 0],
          ['has_all() for a recipe that does not fit', 0]
        ],
        why: 'A first day (empty pantry), a missing jar (0 g) and a recipe that does not fit (<code>False</code>) all have a good answer. A broken file and food you do not have do not, so they raise: <code>ValueError</code> with the file name, and <code>ValueError: not enough chicken</code>.',
        hint: 'Is there a sensible answer, or would carrying on hide a mistake?'
      },
      {
        type: 'order', q: 'Put one day of Kitchen Coach\'s pantry in order.',
        items: ['load_pantry(Path("data/pantry.json"))', 'pantry.has_all(recipe.ingredients)', 'pantry.take(recipe.ingredients)', 'save_pantry(pantry, Path("data/pantry.json"))'],
        why: 'Load in the morning, ask if it fits, take it, and save at night. Tomorrow\'s load reads what tonight\'s save wrote.',
        hint: 'You can only ask a pantry you have loaded, and you save last.'
      }
    ]
  });
})();
