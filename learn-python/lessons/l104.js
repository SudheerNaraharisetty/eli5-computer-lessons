/* Lesson 104: The friends and their goals (module 10). One file per lesson.
   Builds Kitchen Coach's models.py: the Guest and Recipe dataclasses, Guest.allows and Guest.__str__.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l104  The friends and their goals
     ===================================================================== */

  /* ---- the data files, exactly as in the project spec (data/guests.json, data/recipes.json) ---- */
  const GUESTS = [
    '[',
    '  {"name": "Ana", "kcal_target": 2600, "protein_target": 100, "vegetarian": false, "gluten_free": false},',
    '  {"name": "Ben", "kcal_target": 2400, "protein_target": 140, "vegetarian": true, "gluten_free": false},',
    '  {"name": "Chloe", "kcal_target": 2000, "protein_target": 75, "vegetarian": false, "gluten_free": true}',
    ']', ''
  ].join('\n');
  const GUESTS_TYPO = GUESTS.replace('"protein_target": 140', '"protien_target": 140');
  const RECIPES = [
    '[',
    '  {"name": "lentil soup", "kcal": 320, "protein": 18, "vegetarian": true, "gluten_free": true, "ingredients": {"lentils": 80, "carrots": 100}},',
    '  {"name": "tofu stir-fry", "kcal": 350, "protein": 24, "vegetarian": true, "gluten_free": false, "ingredients": {"tofu": 150, "rice": 75, "soy sauce": 15}},',
    '  {"name": "pasta bake", "kcal": 610, "protein": 22, "vegetarian": true, "gluten_free": false, "ingredients": {"pasta": 100, "cheese": 40}},',
    '  {"name": "bean chili", "kcal": 380, "protein": 15, "vegetarian": true, "gluten_free": true, "ingredients": {"beans": 150, "tomatoes": 200}},',
    '  {"name": "chicken rice bowl", "kcal": 650, "protein": 40, "vegetarian": false, "gluten_free": true, "ingredients": {"chicken": 150, "rice": 100}},',
    '  {"name": "rice pudding", "kcal": 300, "protein": 8, "vegetarian": true, "gluten_free": true, "ingredients": {"rice": 50, "milk": 200}},',
    '  {"name": "yogurt bowl", "kcal": 250, "protein": 20, "vegetarian": true, "gluten_free": true, "ingredients": {"yogurt": 200, "berries": 80}}',
    ']', ''
  ].join('\n');

  /* ---- models.py, the real file (src/kitchen_coach/models.py in the project) ---- */
  const MODELS = [
    'from dataclasses import dataclass, field',
    '',
    '',
    '@dataclass',
    'class Recipe:',
    '    name: str',
    '    kcal: int',
    '    protein: int',
    '    vegetarian: bool',
    '    gluten_free: bool',
    '    ingredients: dict[str, int] = field(default_factory=dict)',
    '',
    '',
    '@dataclass',
    'class Guest:',
    '    name: str',
    '    kcal_target: int',
    '    protein_target: int',
    '    vegetarian: bool = False',
    '    gluten_free: bool = False',
    '',
    '    def allows(self, recipe: Recipe) -> bool:',
    '        if self.vegetarian and not recipe.vegetarian:',
    '            return False',
    '        if self.gluten_free and not recipe.gluten_free:',
    '            return False',
    '        return True',
    '',
    '    def __str__(self) -> str:',
    '        text = f"{self.name}: {self.kcal_target} kcal, {self.protein_target} g protein"',
    '        if self.vegetarian:',
    '            text += ", vegetarian"',
    '        if self.gluten_free:',
    '            text += ", gluten-free"',
    '        return text',
    '',
    '',
    'def guest_from_dict(d: dict) -> Guest:',
    '    return Guest(**d)',
    '',
    '',
    'def recipe_from_dict(d: dict) -> Recipe:',
    '    return Recipe(**d)'
  ];
  const MODELS_PY = MODELS.join('\n') + '\n';
  const FILES = { 'models.py': MODELS_PY, 'data/guests.json': GUESTS, 'data/recipes.json': RECIPES };

  /* ---- The idea: a dict with loose keys becomes a form with labelled fields ---- */
  const mono = (x, y, txt, f, s) => T(x, y, txt, { s: s || 11, m: true, a: 'start', f: f || P.ink });
  const row = (y, k, v, f) =>
    `<line x1="354" y1="${y + 8}" x2="574" y2="${y + 8}" stroke="${P.sand}" stroke-width="2"/>` +
    mono(358, y, k, P.ink2, 11.5) + mono(490, y, v, f || P.accent, 11.5);
  const ideaPic = svg(600, 300, 'Left, lesson 103: Ben is a dict. Any key goes in, even the typo protien_target, and the rule allows(guest, recipe) is a loose function somewhere in planner.py. Middle: an arrow labelled Guest(**row). Right: Ben as a Guest object, a form with five labelled fields: name Ben, kcal_target 2400, protein_target 140, vegetarian True, gluten_free False. Below the fields, the method allows(recipe) lives on the form, and str(ben) gives the card: Ben: 2400 kcal, 140 g protein, vegetarian.',
    T(130, 22, 'lesson 103: a dict', { s: 12.5, f: P.danger }) +
    box(12, 34, 236, 128, P.white, 12) +
    mono(24, 58, '{"name": "Ben",') +
    mono(24, 78, ' "kcal_target": 2400,') +
    mono(24, 98, ' "protien_target": 140,', P.danger) +
    mono(24, 118, ' "vegetarian": true,') +
    mono(24, 138, ' "gluten_free": false}') +
    T(130, 184, 'any key goes in, even a typo', { s: 11.5, w: 700, f: P.danger }) +
    `<rect x="24" y="206" width="212" height="36" rx="8" fill="${P.sand}" stroke="${P.ink2}" stroke-width="2" stroke-dasharray="5 5"/>` +
    mono(36, 229, 'allows(guest, recipe)', P.ink2) +
    T(130, 262, 'the rule lives far away,', { s: 11.5, w: 700, f: P.ink2 }) +
    T(130, 278, 'in planner.py', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(256, 120, 334, 120, P.accent, 3) +
    T(295, 106, 'Guest(**row)', { s: 10.5, m: true, f: P.accent }) +
    T(470, 22, 'lesson 104: a Guest', { s: 12.5, f: P.ok }) +
    box(342, 34, 246, 252, P.white, 12) +
    `<rect x="342" y="34" width="246" height="30" rx="12" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(465, 54, 'Guest', { s: 13.5, m: true, f: P.accent }) +
    row(86, 'name', 'Ben') + row(108, 'kcal_target', '2400') + row(130, 'protein_target', '140') +
    row(152, 'vegetarian', 'True') + row(174, 'gluten_free', 'False') +
    `<rect x="354" y="192" width="222" height="30" rx="8" fill="${P.okT}" stroke="${P.ok}" stroke-width="2"/>` +
    mono(364, 212, 'allows(recipe)', P.ok, 11.5) + T(570, 212, 'the rule', { s: 10.5, a: 'end', f: P.ok }) +
    `<rect x="354" y="230" width="222" height="44" rx="8" fill="${P.paper2}" stroke="${P.ink2}" stroke-width="2"/>` +
    mono(364, 248, '__str__', P.ink2, 11) +
    T(364, 266, 'Ben: 2400 kcal, 140 g protein, veg...', { s: 9.5, w: 700, a: 'start', f: P.ink2 }));

  /* ---- The code: models.py, and loading the three friends ---- */
  const coach = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import guest_from_dict',
    '',
    'rows = json.loads(Path("data/guests.json").read_text())',
    'guests = [guest_from_dict(row) for row in rows]',
    '',
    'for guest in guests:',
    '    print(guest)',
    '',
    'ben = guests[1]',
    'print(ben.name, "needs", ben.protein_target, "g protein")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${code(MODELS, { title: 'models.py', hi: [22, 29, 39] })}${run(coach, { title: 'coach.py', files: FILES })}</div>`;

  /* ---- The pain: string keys everywhere, and one typo in the JSON ---- */
  const planner = [
    'import json',
    'from pathlib import Path',
    '',
    'guests = json.loads(Path("data/guests.json").read_text())',
    'print("Loaded", len(guests), "guests")',
    '',
    '# ... 60 lines later, the planner ...',
    'for guest in guests:',
    '    goal = guest.get("protein_target", 0)',
    '    print(guest["name"], "needs", goal, "g protein")',
    '',
    '# ... 40 lines later, the report (60 g eaten so far) ...',
    'for guest in guests:',
    '    short = guest["protein_target"] - 60',
    '    print(guest["name"], "is short", short, "g")'
  ];
  const typoJson = code(GUESTS_TYPO.trim().split('\n').map(l => l.replace(', "vegetarian"', ',\n    "vegetarian"')).join('\n').split('\n'), { title: 'data/guests.json (Ben\'s line was typed by hand)', bad: [4] });
  const painPic = `<div style="width:100%;min-width:0">${typoJson}${run(planner, { title: 'planner.py', files: { 'data/guests.json': GUESTS_TYPO } })}</div>`;

  /* ---- The fix: Guest(**row) refuses the typo at load time ---- */
  const strict = [
    'import json',
    'from dataclasses import dataclass',
    '',
    '',
    '@dataclass',
    'class Guest:',
    '    name: str',
    '    kcal_target: int',
    '    protein_target: int',
    '    vegetarian: bool = False',
    '    gluten_free: bool = False',
    '',
    '',
    'text = """[',
    '  {"name": "Ana", "kcal_target": 2600, "protein_target": 100},',
    '  {"name": "Ben", "kcal_target": 2400, "protien_target": 140, "vegetarian": true},',
    '  {"name": "Chloe", "kcal_target": 2000, "protein_target": 75, "gluten_free": true}',
    ']"""',
    '',
    'guests = [Guest(**row) for row in json.loads(text)]',
    'print("Loaded", len(guests), "guests")',
    'for guest in guests:',
    '    print(guest)'
  ];
  const starSvg = svg(600, 112, 'Two stars in a call spread a dict into named arguments. Guest(**row), with row equal to name Ben, kcal_target 2400, protein_target 140, does the same as Guest(name="Ben", kcal_target=2400, protein_target=140). Every key must be the name of a field.',
    T(14, 26, 'row = {"name": "Ben", "kcal_target": 2400, "protein_target": 140}', { s: 12, m: true, a: 'start' }) +
    T(14, 60, 'Guest(**row)', { s: 14, m: true, a: 'start', f: P.accent }) +
    arrow(132, 55, 176, 55, P.ink2, 2.5) +
    T(184, 60, 'Guest(name="Ben", kcal_target=2400, protein_target=140)', { s: 12, m: true, a: 'start' }) +
    T(300, 96, 'each key becomes a keyword argument, so each key must be a field name', { s: 12, w: 800, f: P.ok }));
  const fixPic = `<div style="width:100%;min-width:0">${starSvg}${run(strict, { title: 'load.py' })}</div>`;

  /* ---- Try it: the allows table ---- */
  const table = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import Guest, guest_from_dict, recipe_from_dict',
    '',
    'guests = [guest_from_dict(d) for d in json.loads(Path("data/guests.json").read_text())]',
    'recipes = [recipe_from_dict(d) for d in json.loads(Path("data/recipes.json").read_text())]',
    '',
    'print(" " * 18 + "".join(f"{guest.name:<7}" for guest in guests))',
    'for recipe in recipes:',
    '    marks = ["✓" if guest.allows(recipe) else "✗" for guest in guests]',
    '    print(f"{recipe.name:<18}" + "".join(f"{mark:<7}" for mark in marks))'
  ];

  /* ---- The catch: a dict default, and ** checks names but not types ---- */
  const shared = [
    'from dataclasses import dataclass, field',
    '',
    '',
    '@dataclass',
    'class Recipe:',
    '    name: str',
    '    kcal: int',
    '    ingredients: dict[str, int] = {}',
    '',
    '',
    'soup = Recipe("lentil soup", 320)',
    'chili = Recipe("bean chili", 380)',
    'soup.ingredients["lentils"] = 80',
    'print(soup.ingredients)',
    'print(chili.ingredients)'
  ];
  const typesTerm = term([
    '$ python3 coach.py',
    '# guests.json says  "kcal_target": "2600"  (text, in quotes)',
    'Traceback (most recent call last):',
    '  File "/Users/you/kitchen-coach/coach.py", line 9, in <module>',
    '    left = ana.kcal_target - 650',
    '           ~~~~~~~~~~~~~~~~^~~~~',
    "TypeError: unsupported operand type(s) for -: 'str' and 'int'"
  ], 'Guest(**row) let "2600" in. Terminal, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${run(shared, { title: 'recipe.py' })}${typesTerm}</div>`;

  /* ---- quiz code ---- */
  const noGluten = [
    'from dataclasses import dataclass',
    '',
    '',
    '@dataclass',
    'class Recipe:',
    '    name: str',
    '    vegetarian: bool',
    '    gluten_free: bool',
    '',
    '',
    '@dataclass',
    'class Guest:',
    '    name: str',
    '    vegetarian: bool = False',
    '    gluten_free: bool = False',
    '',
    '    def allows(self, recipe):',
    '        if self.vegetarian and not recipe.vegetarian:',
    '            return False',
    '        return True',
    '',
    '',
    'menu = [',
    '    Recipe("lentil soup", True, True),',
    '    Recipe("pasta bake", True, False),',
    '    Recipe("chicken rice bowl", False, True),',
    ']',
    'chloe = Guest("Chloe", gluten_free=True)',
    'for recipe in menu:',
    '    if chloe.allows(recipe):',
    '        print(recipe.name)'
  ];

  COURSE.add({
    id: 'l104', minutes: 14,
    summary: 'Kitchen Coach\'s first real file is <code>models.py</code>: <b>one class for each kind of thing</b>. <code>Guest</code> and <code>Recipe</code> are dataclasses (lesson 73) with type hints (lesson 90): <code>name: str</code>, <code>kcal_target: int</code>, <code>protein_target: int</code>, <code>vegetarian: bool = False</code>. <code>Recipe.ingredients</code> is <code>dict[str, int] = field(default_factory=dict)</code>, so each recipe gets its own new dict. Load a JSON row with <code>Guest(**row)</code>: two stars <b>spread the dict into keyword arguments</b> (lesson 79), so <code>{"name": "Ben", ...}</code> becomes <code>Guest(name="Ben", ...)</code>. A typo like <code>"protien_target"</code> now stops <b>at load time</b> with <code>TypeError: Guest.__init__() got an unexpected keyword argument \'protien_target\'. Did you mean \'protein_target\'?</code>. With plain dicts it hid: <code>.get()</code> gave a silent 0, and <code>guest["protein_target"]</code> crashed with a <code>KeyError</code> 100 lines later. The rule from lesson 103 moves onto the class that owns it: <code>ben.allows(recipe)</code> is <code>False</code> for the chicken rice bowl, and Chloe says no to the tofu stir-fry and the pasta bake. <code>__str__</code> (lesson 72) prints a friendly card: <code>Ben: 2400 kcal, 140 g protein, vegetarian</code>. The catch: <code>**</code> checks the <b>names</b>, not the <b>types</b>. <code>"2600"</code> in quotes still gets in.',
    video: {
      src: 'videos/l104-friends-and-goals.mp4', poster: 'videos/l104-friends-and-goals.jpg', length: '1 min 10 s',
      script: [
        'Kitchen Coach reads Ana, Ben and Chloe from a JSON file. Each friend is a dict with string keys.',
        'One typo, protein spelled wrong, and nothing complains. Later, the planner stops with a key error, far from the cause.',
        'Give each kind of thing a class. A Guest dataclass is a form with labelled fields. K-cal target. Protein target. Vegetarian. Gluten free.',
        'Two stars unpack each JSON line into those fields. Ana, Ben and Chloe fill in.',
        'Recipes get a class too, with badges. Veg. Gluten free.',
        'The rule moves onto the guest. Guest dot allows puts a gate in front of each friend.',
        'The chicken bowl slides toward Ben. It has meat. It bounces off.',
        'Pasta and tofu slide toward Chloe. Both have gluten. Off they go.',
        'The typo? Ben\'s form has no field with that spelling. Type error, at load time. It fails early. Good.',
        'Give each kind of thing a class. Put the rules on the class that owns them.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One class for each kind of thing.',
        text: [
          'In lesson 103 Kitchen Coach ran on plain dicts. Ben was <code>{"name": "Ben", "kcal_target": 2400, ...}</code>, and the rule "may this guest eat this?" was a loose function, <code>allows(guest, recipe)</code>. It worked. But a dict takes <b>any</b> key, even a typo, and nothing says what a guest should look like.',
          'Now each kind of thing gets a <b>class</b>. A <code>Guest</code> is a form with labelled fields: <code>name</code>, <code>kcal_target</code>, <code>protein_target</code>, <code>vegetarian</code>, <code>gluten_free</code>. A <code>Recipe</code> has its <code>kcal</code>, <code>protein</code>, two badges and its <code>ingredients</code>. Both live in one file, <code>models.py</code>. ("Model" is the usual name for a class that describes your data.)',
          'And the rule moves <b>onto the class that owns it</b>. Whether Ben may eat the chicken rice bowl is a question about Ben, so it becomes a method: <code>ben.allows(recipe)</code>. The data and the rules about that data now sit together.'
        ],
        tip: 'You know every piece already: dataclasses (lesson 73), type hints (lesson 90), methods (lesson 68) and <code>__str__</code> (lesson 72). This lesson puts them to work in a real project.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'models.py, and the three friends loaded.',
        text: [
          '<b>Recipe</b> comes first, because <code>Guest.allows</code> mentions it in its hint. <code>ingredients: dict[str, int]</code> says "a dict from text to whole numbers", like <code>{"lentils": 80, "carrots": 100}</code>. Its default is <code>field(default_factory=dict)</code>, so every recipe gets its <b>own</b> new dict (more in The catch).',
          '<b>Guest</b> has the five fields from the plan. <code>allows</code> (line 22) is lesson 103\'s rule as a method: <code>self</code> is the guest. <code>__str__</code> (line 29) builds the one-line card that <code>print(guest)</code> shows. The dataclass still writes <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code>.',
          '<code>guest_from_dict(d)</code> (line 39) returns <code>Guest(**d)</code>. In a call, <code>**</code> spreads a dict into keyword arguments (lesson 79): each key becomes a parameter name and each value its value. Press <b>Run</b> on <b>coach.py</b>: three friendly cards and <code>Ben needs 140 g protein</code>. Then add <code>print(guests)</code> at the end. A list shows each guest with <code>__repr__</code>, every field named.'
        ],
        tip: 'In the real project this file is <code>src/kitchen_coach/models.py</code> and you write <code>from kitchen_coach.models import Guest</code> (lesson 94). In this box <code>models.py</code> and the <code>data</code> folder sit next to <code>coach.py</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'String keys everywhere, and one typo.',
        text: [
          'Somebody typed Ben\'s line in <code>guests.json</code> by hand: <code>"protien_target"</code>. <code>json.loads</code> does not care. A dict takes any key.',
          'Press <b>Run</b>. It loads 3 guests with no complaint. Sixty lines later the planner uses <code>.get("protein_target", 0)</code> and gets the default: <code>Ben needs 0 g protein</code>. Wrong, and <b>silent</b>. The coach would plan Ben, who lifts weights, a day with no protein goal at all.',
          'Forty lines after that, the report uses <code>guest["protein_target"]</code> and stops: <code>KeyError: \'protein_target\'</code> on line 14. The error points at the report. The real mistake is in a <b>different file</b>, and nothing on screen says so. Every <code>guest["..."]</code> in the project is a place where a typo can hide, in your code or in the data.'
        ],
        warn: 'A dict with string keys has no idea what a guest should contain. A missing key is found only when some line happens to read it, often far from the cause.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Guest(**row): bad data fails at load time.',
        text: [
          'Turn each row into a <code>Guest</code> <b>the moment you load it</b>: <code>[Guest(**row) for row in json.loads(text)]</code>. The dataclass\'s <code>__init__</code> knows exactly five names. Every key must be one of them.',
          'Press <b>Run</b>. Python stops on the load line, line 20: <code>TypeError: Guest.__init__() got an unexpected keyword argument \'protien_target\'. Did you mean \'protein_target\'?</code> That is a <b>feature</b>. Bad data fails early, loudly, at the line that reads it, and the message names the bad key and the right one. A <b>missing</b> key fails the same way: <code>missing 1 required positional argument: \'protein_target\'</code>.',
          'Fix the typo in Ben\'s line and run again. All three load. Ana has no <code>"vegetarian"</code> key in this text, and that is fine: the field has a default, <code>False</code>. In your own code a typo like <code>ben.protien_target</code> now stops too: <code>AttributeError: \'Guest\' object has no attribute \'protien_target\'. Did you mean: \'protein_target\'?</code> And VS Code and mypy (lesson 90) underline it before you even run.'
        ],
        tip: 'Python 3.15 words that last hint more clearly: <code>Did you mean \'.protein_target\' instead of \'.protien_target\'?</code> This page runs 3.14, so the box shows the older wording.'
      },
      {
        label: 'Try it', pic: run(table, { title: 'table.py', files: FILES }),
        h: 'Ask every guest about every recipe.',
        text: [
          'This box loads the real <code>models.py</code> and both data files, then asks <code>guest.allows(recipe)</code> for every pair. Press <b>Run</b>. Ana may eat everything. Ben, vegetarian, gets a cross only for the <b>chicken rice bowl</b>. Chloe, gluten-free, gets crosses for the <b>tofu stir-fry</b> (soy sauce has wheat) and the <b>pasta bake</b>.',
          'Your turn. A fourth friend, Dev, is coming. Dev is vegetarian <b>and</b> gluten-free. Add one line after the <code>recipes = ...</code> line: <code>guests.append(Guest("Dev", 2200, 90, vegetarian=True, gluten_free=True))</code>. Run it. Dev\'s column has 4 ticks: lentil soup, bean chili, rice pudding and yogurt bowl.',
          'You did not touch the rules. The same <code>allows</code> method answered for a new guest, because the rule lives on <code>Guest</code>. Add <code>print(guests[-1])</code> too, and <code>__str__</code> shows <code>Dev: 2200 kcal, 90 g protein, vegetarian, gluten-free</code>.'
        ],
        tip: 'Lesson 106, The meal planner, will call <code>guest.allows(recipe)</code> to choose each friend\'s meals. Lesson 105, The pantry, gives the ingredients a class of their own.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A dict default, and ** checks names, not types.',
        text: [
          '<b>One.</b> Press <b>Run</b> on <b>recipe.py</b>: <code>ValueError: mutable default &lt;class \'dict\'&gt; for field ingredients is not allowed: use default_factory</code>. Same as the list in lesson 73: one <code>{}</code> would be shared by every recipe, so the soup\'s lentils would show up in the chili (two labels on one jar, lesson 97). Change line 8 to <code>ingredients: dict[str, int] = field(default_factory=dict)</code> and run: <code>{\'lentils\': 80}</code>, then <code>{}</code>.',
          '<b>Two.</b> <code>Guest(**row)</code> checks the <b>names</b> of the keys, never the <b>types</b> of the values. If the file says <code>"kcal_target": "2600"</code>, in quotes, Ana gets the text <code>"2600"</code>, and the crash comes later, like in the terminal picture. Type hints are labels. Python does not check them when it runs (lesson 90), and mypy cannot see inside a JSON file.',
          'That is why <code>models.py</code> loads through <code>guest_from_dict</code>: <b>one place</b> to make stricter later, for example with <code>int(d["kcal_target"])</code>, or to skip keys you do not need. Also: an <b>extra</b> key, like <code>"notes"</code>, fails exactly like a typo. Usually that is what you want.'
        ],
        warn: 'Do not "fix" a TypeError from <code>Guest(**row)</code> by going back to dicts or by catching and ignoring it. The error found bad data. Fix the data, or change <code>guest_from_dict</code> on purpose.'
      }
    ],
    exercises: [
      {
        file: 'l104_models.py', title: 'Kitchen Coach\'s models',
        task: 'The <code>Recipe</code> and <code>Guest</code> dataclasses and their fields are written. Finish the two methods on <code>Guest</code>: <code>allows(recipe)</code> returns <code>False</code> when a vegetarian guest meets a recipe that is not vegetarian, or a gluten-free guest meets a recipe that is not gluten-free, and <code>True</code> otherwise. <code>__str__</code> returns the card, like <code>Ben: 2400 kcal, 140 g protein, vegetarian</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Every guest still allows everything, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, write the two rules in <code>allows</code>, then build the text in <code>__str__</code> and <b>return</b> it.',
          'Run after each change until it says <code>PASS</code>. The check loads the three friends and seven recipes from JSON with <code>Guest(**row)</code>, prints the table, and also tries a guest who is both vegetarian and gluten-free.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: '<code>row = {"name": "Ben", "kcal_target": 2400, "protein_target": 140, "vegetarian": True}</code>. What does <code>Guest(**row)</code> do?',
        options: [
          'The same as Guest(name="Ben", kcal_target=2400, protein_target=140, vegetarian=True)',
          'The same as Guest(row), with the whole dict as the name',
          'It makes a Guest with every field set to None',
          'It copies the dict into one field called row'
        ],
        answer: 0,
        why: 'In a call, <code>**</code> spreads a dict into keyword arguments (lesson 79). Each key becomes a parameter name and each value its value. <code>gluten_free</code> is not in the row, so it keeps its default, <code>False</code>.',
        hint: 'Two stars in a call spread. One key, one keyword argument.'
      },
      {
        type: 'pick', q: 'Ben\'s row in <code>guests.json</code> says <code>"protien_target": 140</code>. Kitchen Coach loads it with <code>[Guest(**row) for row in rows]</code>. What happens?',
        options: [
          'It stops at the load line: TypeError ... unexpected keyword argument \'protien_target\'',
          'Ben is loaded, and ben.protein_target is 0',
          'Ben is loaded with an extra field called protien_target',
          'It stops much later with KeyError: \'protein_target\''
        ],
        answer: 0,
        why: 'The dataclass\'s <code>__init__</code> only accepts its five field names, so the bad key is refused <b>at load time</b>, and Python even says <code>Did you mean \'protein_target\'?</code>. The silent 0 and the late <code>KeyError</code> were the plain-dict problems.',
        hint: 'Which names does Guest.__init__ accept?'
      },
      {
        type: 'fix', q: 'Chloe is gluten-free, but she is offered the pasta bake. Fix <code>allows</code> so this prints only <code>lentil soup</code> and <code>chicken rice bowl</code>. Keep the vegetarian rule.',
        code: noGluten, title: 'chloe.py',
        check: [
          'lines = out.strip().splitlines()',
          'dev = Guest("Dev", vegetarian=True, gluten_free=True)',
          'okay = [r.name for r in [Recipe("a", True, True), Recipe("b", True, False), Recipe("c", False, True), Recipe("d", False, False)] if dev.allows(r)]',
          'if lines != ["lentil soup", "chicken rice bowl"]:',
          '    msg = "It should print two lines: lentil soup, then chicken rice bowl."',
          'elif okay != ["a"]:',
          '    msg = "Chloe is right now, but the vegetarian rule must still work. Keep both ifs."',
          'elif Guest("Ana").allows(Recipe("x", False, False)) is not True:',
          '    msg = "A guest with no rules should be allowed everything. Keep return True at the end."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Add a second rule before <code>return True</code>: <code>if self.gluten_free and not recipe.gluten_free: return False</code>. Each rule needs both parts: the guest\'s need and the recipe breaking it.',
        hint: 'Copy the vegetarian if, and change both words to gluten_free.'
      },
      {
        type: 'bucket', q: 'Which class owns it? Put each thing where it belongs.',
        buckets: ['Guest', 'Recipe'],
        items: [
          ['protein_target', 0],
          ['allows(recipe): may I eat this?', 0],
          ['the one-line card "Ben: 2400 kcal, ..."', 0],
          ['ingredients, grams per serving', 1],
          ['kcal per serving', 1],
          ['the badge "this has meat"', 1]
        ],
        why: 'A guest has goals and rules about what they eat, so <code>allows</code> lives on <code>Guest</code>. A recipe knows its own kcal, its ingredients and whether it is vegetarian. Put each rule on the class whose data it is about.',
        hint: 'Is it about a person, or about a dish?'
      },
      {
        type: 'pick', q: 'Plain dicts again. Ben\'s row says <code>"protien_target": 140</code>. What does this print for Ben?',
        pic: code(['for guest in guests:', '    goal = guest.get("protein_target", 0)', '    print(guest["name"], "needs", goal, "g protein")'], { title: 'planner.py' }),
        options: ['Ben needs 0 g protein', 'Ben needs 140 g protein', 'KeyError: \'protein_target\'', 'Ben needs None g protein'],
        answer: 0,
        why: '<code>.get(key, 0)</code> gives the default when the key is missing (lesson 38). The typo means the right key is missing, so Ben\'s goal quietly becomes 0. No error, just a wrong plan.',
        hint: 'What does .get do when the key is not there?'
      },
      {
        type: 'fix', q: 'Python stops with <code>ValueError: mutable default &lt;class \'dict\'&gt; for field ingredients is not allowed: use default_factory</code>. Fix it so it prints <code>{\'lentils\': 80}</code>, then <code>{}</code>.',
        code: shared, title: 'recipe.py',
        check: [
          'lines = out.strip().splitlines()',
          'if lines != ["{\'lentils\': 80}", "{}"]:',
          '    msg = "It should print two lines: {\'lentils\': 80} and then {}."',
          'elif "__dataclass_fields__" not in vars(Recipe):',
          '    msg = "It prints the right thing, but keep @dataclass above class Recipe."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>ingredients: dict[str, int] = field(default_factory=dict)</code>. The dataclass calls <code>dict()</code> for every new recipe, so the soup and the chili each get their own dict. <code>field</code> is already imported.',
        hint: 'The error message ends with the word you need.'
      },
      {
        type: 'pick', q: 'Back to lesson 72. <code>Guest</code> has the <code>__str__</code> from this lesson. What does <code>print([ben])</code> show?',
        pic: code(['ben = Guest("Ben", 2400, 140, vegetarian=True)', 'print(ben)', 'print([ben])'], { title: 'cards.py' }),
        options: [
          '[Guest(name=\'Ben\', kcal_target=2400, protein_target=140, vegetarian=True, gluten_free=False)]',
          '[Ben: 2400 kcal, 140 g protein, vegetarian]',
          '[<__main__.Guest object at 0x...>]',
          'TypeError: list has no __str__'
        ],
        answer: 0,
        why: '<code>print(ben)</code> uses <code>__str__</code>, the card for people. A list shows each item with <code>__repr__</code>, the one for programmers, and the dataclass wrote that one: every field named.',
        hint: 'Which dunder does a list use for the things inside it?'
      },
      {
        type: 'fill', q: 'Finish the Recipe model.',
        text: 'from dataclasses import dataclass, field\n\n@___\nclass Recipe:\n    name: str\n    kcal: ___\n    ingredients: dict[str, int] = field(default_factory=___)',
        options: ['dataclass', 'int', 'dict', 'list', 'str', '{}'],
        answer: ['dataclass', 'int', 'dict'],
        why: '<code>@dataclass</code> writes <code>__init__</code> from the fields. kcal is a whole number. <code>default_factory=dict</code> passes the <b>name</b> <code>dict</code>, so each recipe gets a new empty dict. <code>{}</code> would be one shared dict, and the dataclass refuses it.',
        hint: 'ingredients is a dict, so the factory makes dicts.'
      }
    ]
  });
})();
