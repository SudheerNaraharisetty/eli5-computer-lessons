/* Lesson 108: Final project: Kitchen Coach (module 10). Quiz only, no video, no exercise.
   The last lesson of the course. It reviews lessons 103 to 107 and runs the whole project on the page.
   models.py is lesson 104's file, pantry.py is lesson 105's file, planner.py and cli.py are lesson 106's files,
   and the three JSON files are lesson 103's, all byte for byte. Test names and tool output follow lesson 107.
   Every Run box and fix check was checked with Python 3.14.4 (Homebrew) and in this page (Pyodide, Python 3.14)
   on 2026-11-25. The "which test goes red" and "which tool finds it" answers were checked by making each change
   in a copy of the real kitchen-coach project (Python 3.15.2, pytest 9.2.0, mypy 2.4.1, Ruff 0.17.6). */
(function () {
  const { P, code, run, svg, box, T } = PR;

  /* =====================================================================
     l108  Final project: Kitchen Coach
     ===================================================================== */

  /* ---- the data files, exactly as lesson 103 seeds them (data/*.json) ---- */
  const GUESTS = [
    '[',
    '  {"name": "Ana", "kcal_target": 2600, "protein_target": 100, "vegetarian": false, "gluten_free": false},',
    '  {"name": "Ben", "kcal_target": 2400, "protein_target": 140, "vegetarian": true, "gluten_free": false},',
    '  {"name": "Chloe", "kcal_target": 2000, "protein_target": 75, "vegetarian": false, "gluten_free": true}',
    ']', ''].join('\n');
  const RECIPES = [
    '[',
    '  {"name": "lentil soup", "kcal": 320, "protein": 18, "vegetarian": true, "gluten_free": true, "ingredients": {"lentils": 80, "carrots": 100}},',
    '  {"name": "tofu stir-fry", "kcal": 350, "protein": 24, "vegetarian": true, "gluten_free": false, "ingredients": {"tofu": 150, "rice": 75, "soy sauce": 15}},',
    '  {"name": "pasta bake", "kcal": 610, "protein": 22, "vegetarian": true, "gluten_free": false, "ingredients": {"pasta": 100, "cheese": 40}},',
    '  {"name": "bean chili", "kcal": 380, "protein": 15, "vegetarian": true, "gluten_free": true, "ingredients": {"beans": 150, "tomatoes": 200}},',
    '  {"name": "chicken rice bowl", "kcal": 650, "protein": 40, "vegetarian": false, "gluten_free": true, "ingredients": {"chicken": 150, "rice": 100}},',
    '  {"name": "rice pudding", "kcal": 300, "protein": 8, "vegetarian": true, "gluten_free": true, "ingredients": {"rice": 50, "milk": 200}},',
    '  {"name": "yogurt bowl", "kcal": 250, "protein": 20, "vegetarian": true, "gluten_free": true, "ingredients": {"yogurt": 200, "berries": 80}}',
    ']', ''].join('\n');
  const GRAMS = { rice: 1000, lentils: 400, carrots: 500, tofu: 200, 'soy sauce': 100, pasta: 500, cheese: 200, beans: 300, tomatoes: 400, chicken: 300, milk: 1000, yogurt: 400, berries: 150 };
  const PANTRY = JSON.stringify(GRAMS, null, 2) + '\n';

  /* ---- models.py, lesson 104's file ---- */
  const MODELS_PY = [
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
  ].join('\n') + '\n';

  /* ---- pantry.py, lesson 105's file ---- */
  const PANTRY_PY = [
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
  ].join('\n') + '\n';

  /* ---- planner.py, lesson 106's file ---- */
  const PLANNER = [
    'from models import Guest, Recipe',
    'from pantry import Pantry',
    '',
    '',
    'def plan_day(',
    '    guest: Guest, recipes: list[Recipe], pantry: Pantry, max_meals: int = 3',
    ') -> list[Recipe]:',
    '    """Pick up to max_meals recipes for one guest, and take them from the pantry."""',
    '    allowed = [r for r in recipes if guest.allows(r)]',
    '    candidates = [r for r in allowed if pantry.has_all(r.ingredients)]',
    '    line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))',
    '    meals: list[Recipe] = []',
    '    kcal = 0',
    '    for recipe in line_up:',
    '        if len(meals) == max_meals:',
    '            break  # the day is full',
    '        if not pantry.has_all(recipe.ingredients):',
    '            continue  # an earlier pick used it up',
    '        if kcal + recipe.kcal > guest.kcal_target:',
    '            continue  # too much food for today',
    '        pantry.take(recipe.ingredients)',
    '        meals.append(recipe)',
    '        kcal += recipe.kcal',
    '    return meals',
    '',
    '',
    'def plan_all(',
    '    guests: list[Guest], recipes: list[Recipe], pantry: Pantry',
    ') -> dict[str, list[Recipe]]:',
    '    """Plan every guest in turn. They share one pantry, so the order matters."""',
    '    plans = {}',
    '    for guest in guests:',
    '        plans[guest.name] = plan_day(guest, recipes, pantry)',
    '    return plans'
  ];
  const PLANNER_PY = PLANNER.join('\n') + '\n';

  /* ---- cli.py, lesson 106's file ---- */
  const CLI = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import Guest, Recipe, guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry, save_pantry',
    'from planner import plan_all',
    '',
    'DATA = Path("data")',
    '',
    '',
    'def read_json(name: str) -> list[dict]:',
    '    """Read one JSON file from the data folder."""',
    '    return json.loads((DATA / name).read_text())',
    '',
    '',
    'def show(guest: Guest, meals: list[Recipe]) -> None:',
    '    """Print one guest\'s plan: the meals, then kcal and protein against the goals."""',
    '    names = ", ".join([recipe.name for recipe in meals])',
    '    kcal = sum([recipe.kcal for recipe in meals])',
    '    protein = sum([recipe.protein for recipe in meals])',
    '    print(f"{guest.name}: {names or \'nothing fits today\'}")',
    '    line = f"    {kcal} / {guest.kcal_target} kcal"',
    '    line += f", {protein} / {guest.protein_target} g protein"',
    '    if protein < guest.protein_target:',
    '        line += f", short {guest.protein_target - protein} g protein"',
    '    print(line)',
    '',
    '',
    'def main() -> None:',
    '    guests = [guest_from_dict(d) for d in read_json("guests.json")]',
    '    recipes = [recipe_from_dict(d) for d in read_json("recipes.json")]',
    '    pantry = load_pantry(DATA / "pantry.json")',
    '    plans = plan_all(guests, recipes, pantry)',
    '    for guest in guests:',
    '        show(guest, plans[guest.name])',
    '    save_pantry(pantry, DATA / "pantry.json")',
    '',
    '',
    'if __name__ == "__main__":',
    '    main()'
  ];
  const CLI_PY = CLI.join('\n') + '\n';

  const DATA = { 'data/guests.json': GUESTS, 'data/recipes.json': RECIPES, 'data/pantry.json': PANTRY };
  const BASE = Object.assign({ 'models.py': MODELS_PY, 'pantry.py': PANTRY_PY }, DATA);
  const WITH_PLANNER = Object.assign({ 'planner.py': PLANNER_PY }, BASE);
  const ALL = Object.assign({ 'cli.py': CLI_PY }, WITH_PLANNER);

  // The three lines that read the data (lesson 104's way).
  const LOAD = [
    'guests = [guest_from_dict(d) for d in json.loads(Path("data/guests.json").read_text())]',
    'recipes = [recipe_from_dict(d) for d in json.loads(Path("data/recipes.json").read_text())]',
    'pantry = load_pantry(Path("data/pantry.json"))'
  ];

  /* ---- Recap: one card per lesson, the same small picture as lessons 95 and 102 ---- */
  const MONO = 'font-variant-ligatures:none';
  const card = (n, title, mono, plain, tint) =>
    `<div style="min-width:0">` + svg(172, 118, `Lesson ${n}, ${title}: ${mono}. ${plain}.`,
      `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
      T(82, 14.5, 'Lesson ' + n, { s: 12, f: P.white }) +
      box(2, 17, 164, 94, P.white, 10) +
      `<rect x="9" y="25" width="150" height="78" rx="6" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
      `<line x1="9" y1="52" x2="159" y2="52" stroke="${P.danger}" stroke-width="1.4"/>` +
      T(84, 44, title, { s: title.length > 17 ? 12 : title.length > 14 ? 13 : 14 }) +
      T(84, 73, mono, { s: mono.length > 17 ? 11.5 : 12.5, m: true, w: 700 }).replace('<text ', `<text style="${MONO}" `) +
      T(84, 94, plain, { s: 12, w: 700, f: P.ink2 })) + `</div>`;

  const cards = [
    [103, 'Plan Kitchen Coach', 'plan.txt, then stubs', 'one job per piece', P.tint],
    [104, 'Friends and goals', 'Guest(**row)', 'bad data fails early', P.warnT],
    [105, 'The pantry', 'pantry.take(...)', 'all or nothing', P.warnT],
    [106, 'The meal planner', 'plan_all(...)', 'one shared pantry', P.warnT],
    [107, 'Taste-test', 'pytest, mypy, ruff', '11 tests, all green', P.okT]
  ];
  const youAreHere = `<div style="min-width:0">` + svg(172, 118, 'Lesson 108, the final project: 16 questions. You are here.',
    `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
    T(82, 14.5, 'Lesson 108', { s: 12, f: P.white }) +
    box(2, 17, 164, 94, P.sand, 10) +
    T(84, 50, 'Final project', { s: 16 }) +
    T(84, 72, '16 questions', { s: 12.5, w: 700, f: P.ink2 }) +
    T(84, 94, 'you are here', { s: 12.5, w: 700, f: P.accent })) + `</div>`;
  const chip = (fill, label) => `<span style="display:inline-block;background:${fill};color:${P.ink};border:2px solid ${P.ink};border-radius:999px;padding:2px 10px;margin:3px 4px 3px 0;font-size:13px;font-weight:800">${label}</span>`;
  const recapPic = `<div style="width:100%;min-width:0">` +
    `<div style="font-weight:800;font-size:16px;margin:0 0 4px;color:${P.ink}">Module 10: Kitchen Coach, from a plan to a program</div>` +
    `<div style="margin:0 0 10px">${chip(P.tint, 'Plan it')}${chip(P.warnT, 'Build it')}${chip(P.okT, 'Check it')}</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,138px),1fr));gap:12px 10px">` +
    cards.map(c => card(...c)).join('') + youAreHere + `</div>` +
    `<div style="height:14px"></div>` +
    run(CLI, { title: 'cli.py', files: WITH_PLANNER }) +
    `</div>`;

  /* ---- How to play: what runs here, what runs on your computer, and two mornings in a row ---- */
  const half = (x, head, line1, line2, fill, items) =>
    box(x, 8, 166, 196, fill, 12) +
    T(x + 83, 36, head, { s: 15 }) +
    T(x + 83, 56, line1, { s: 12, w: 700, f: P.ink2 }) + T(x + 83, 72, line2, { s: 12, w: 700, f: P.ink2 }) +
    items.map((t, i) => `<rect x="${x + 14}" y="${86 + i * 22}" width="138" height="18" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="1.2"/>` +
      T(x + 83, 99 + i * 22, t, { s: 11.5, m: true, w: 700 }).replace('<text ', `<text style="${MONO}" `)).join('');
  const twoDays = [
    '# Warm up: two mornings in a row. Say what day 2 will look like, then press Run.',
    'from pathlib import Path',
    '',
    'from cli import main',
    '',
    'print("Day 1")',
    'main()  # read, plan, print, save',
    '',
    'print("Day 2. Nobody went shopping.")',
    'main()',
    '',
    'print("data/pantry.json after two days:")',
    'print(Path("data/pantry.json").read_text())'
  ];
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(360, 212, 'Two kinds of question. Left, Python runs here, and the whole project sits next to each box: models.py, pantry.py, planner.py, cli.py and the three JSON files in data. Press Run. Right, tools that run only on your computer: the kitchen-coach command, pytest, mypy, ruff and pip install. Remember their real output from lesson 107.',
      half(8, 'Python runs here', 'the whole project', 'sits next to each box', P.tint, ['models.py', 'pantry.py', 'planner.py', 'cli.py', 'data/*.json']) +
      half(186, 'Your computer', 'remember the real', 'terminal output', P.warnT, ['kitchen-coach', 'pytest', 'mypy', 'ruff', 'pip install -e .'])) +
    run(twoDays, { title: 'two_days.py', files: ALL }) +
    `</div>`;

  /* ---- quiz code ---- */
  const shelf = [
    'from pathlib import Path',
    '',
    'from pantry import load_pantry',
    '',
    'pantry = load_pantry(Path("data/pantry.json"))',
    'print(len(pantry), pantry["tofu"], pantry["saffron"])'
  ];
  const twins = [
    'from models import Guest',
    '',
    'a = Guest("Ana", 2600, 100)',
    'b = Guest("Ana", 2600, 100)',
    'print(a == b, a is b)'
  ];
  const savedLine = [
    'from pathlib import Path',
    '',
    'from cli import main',
    '',
    'main()  # read, plan, print, save',
    '',
    'saved = Path("data/pantry.json").read_text()',
    'print("line 2 of the saved file:", saved.splitlines()[1])'
  ];
  const head = [
    'import json',
    'from pathlib import Path',
    ''
  ];
  const reversed = [
    ...head,
    'from cli import show',
    'from models import guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    'from planner import plan_all',
    '',
    ...LOAD,
    '',
    'guests.reverse()  # Chloe plans first, then Ben, then Ana',
    'plans = plan_all(guests, recipes, pantry)',
    'for guest in guests:',
    '    show(guest, plans[guest.name])'
  ];
  const dev = [
    ...head,
    'from cli import show',
    'from models import Guest, guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    'from planner import plan_all',
    '',
    ...LOAD,
    '',
    'dev = Guest("Dev", 2200, 90)  # a fourth friend. He eats everything.',
    'guests.append(dev)            # and he plans last',
    'plans = plan_all(guests, recipes, pantry)',
    'show(dev, plans["Dev"])'
  ];
  const takeBug = [
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = dict(grams)',
    '',
    '    def __getitem__(self, name):',
    '        return self.grams.get(name, 0)',
    '',
    '    def take(self, ingredients):',
    '        """Take every ingredient out, or nothing at all."""',
    '        for name, need in ingredients.items():',
    '            self.grams[name] = self[name] - need',
    '',
    '',
    'pantry = Pantry({"rice": 1000, "chicken": 300})',
    'three_bowls = {"rice": 300, "chicken": 450}',
    'try:',
    '    pantry.take(three_bowls)',
    '    print("cooked three bowls")',
    'except ValueError as err:',
    '    print("refused:", err)',
    'print("rice:", pantry["rice"], "g")',
    'print("chicken:", pantry["chicken"], "g")'
  ];
  // plan_day from planner.py (lines 5 to 24), with one line swapped for a bug, plus a few lines that use it.
  const planBox = (good, bad, tail) => [
    ...head,
    'from models import Guest, Recipe, guest_from_dict, recipe_from_dict',
    'from pantry import Pantry, load_pantry',
    '',
    '',
    ...PLANNER.slice(4, 24).map(l => l === good ? bad : l),
    '',
    '',
    ...LOAD,
    ...tail
  ];
  const sortBug = planBox(
    '    line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))',
    '    line_up = sorted(candidates, key=lambda r: (r.protein, r.name))',
    ['ana = guests[0]', 'meals = plan_day(ana, recipes, pantry)', 'print("Ana:", ", ".join([r.name for r in meals]))', 'print(sum([r.protein for r in meals]), "g protein")']);
  const breakBug = planBox(
    '            continue  # too much food for today',
    '            break  # too much food for today',
    ['rest = Guest("Ana on a rest day", 900, 50)', 'meals = plan_day(rest, recipes, pantry)', 'print("rest day:", ", ".join([r.name for r in meals]))', 'print(sum([r.kcal for r in meals]), "/ 900 kcal")']);
  const saveBug = CLI.slice(0, 32).concat([
    '    save_pantry(pantry, DATA / "pantry.json")',
    '    plans = plan_all(guests, recipes, pantry)',
    '    for guest in guests:',
    '        show(guest, plans[guest.name])',
    '',
    '',
    'print("Day 1")',
    'main()',
    'print("Day 2. Nobody went shopping.")',
    'main()'
  ]);
  // Used by the planner fix checks: a fresh pantry and the menu, read again from the seeded files.
  const CHECK_SETUP = [
    'import json as _json',
    'from pathlib import Path as _Path',
    'from models import Guest as _Guest, Recipe as _Recipe, recipe_from_dict as _rfd',
    'from pantry import Pantry as _Pantry',
    '_menu = [_rfd(d) for d in _json.loads(_Path("data/recipes.json").read_text())]',
    'def _full():',
    '    return _Pantry(_json.loads(_Path("data/pantry.json").read_text()))',
    'def _names(guest, menu=None, **kw):',
    '    try:',
    '        return [r.name for r in plan_day(guest, menu or _menu, _full(), **kw)]',
    '    except Exception as e:',
    '        return "error: " + str(e)',
    'lines = [l.strip() for l in out.strip().splitlines()]'
  ];

  COURSE.add({
    id: 'l108', minutes: 30,
    summary: 'The last lesson of the course. Kitchen Coach is finished, and here every piece runs together: <code>models.py</code> (lesson 104), <code>pantry.py</code> (lesson 105), <code>planner.py</code> and <code>cli.py</code> (lesson 106), the three JSON files from lesson 103 and the taste tests from lesson 107. Press <b>Run</b> on <code>cli.py</code> and the whole day happens on this page: <b>read, plan, print, save</b>. Then <b>16 mixed questions</b>, easy to hard, with <b>4 real bugs</b> to fix. Every Run box has the whole project next to it, so you can change the order of the guests, add a fourth friend, or run two mornings in a row. pytest, mypy and Ruff run only on your computer, so those questions use what lesson 107 showed in the terminal. At the end there is a short list of things you can build next.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Five lessons, one program.',
        text: [
          'Each card is one lesson of this module, with the <b>one line</b> to remember and the <b>one idea</b> behind it.',
          '<b>Plan it</b> (lavender). Lesson 103 wrote down who Kitchen Coach is for, picked a shape for the data, and split the work into pieces with <b>one job each</b>. The steps came first in plain words, then as stubs, then as the smallest version that runs.',
          '<b>Build it</b> (orange). <code>models.py</code> says what a <code>Guest</code> and a <code>Recipe</code> are, and <code>Guest(**row)</code> stops a typo in the data at load time (lesson 104). <code>pantry.py</code> owns the shelf: <code>has_all</code> asks, <code>take</code> takes everything or nothing, <code>load_pantry</code> and <code>save_pantry</code> talk to the file (lesson 105). <code>planner.py</code> decides: keep, line up, pick, take, for Ana, then Ben, then Chloe, from <b>one shared pantry</b> (lesson 106).',
          '<b>Check it</b> (green). 11 taste tests with pytest, the type hints read by mypy, the layout swept by Ruff (lesson 107).',
          'Now put it all together. The box under the cards is <code>cli.py</code>, the real file from lesson 106. Next to it sit <code>models.py</code>, <code>pantry.py</code>, <code>planner.py</code> and the <code>data</code> folder with the three JSON files. Press <b>Run</b>. <code>main()</code> reads the files, plans the day, prints it and saves the pantry. Ana gets the chicken rice bowl, the tofu stir-fry and the pasta bake: 1610 kcal, 86 g of protein, short 14 g. Ben gets the pasta bake, the yogurt bowl and the lentil soup: 1180 kcal, 60 g, short 80 g. Chloe gets the chicken rice bowl, the lentil soup and the bean chili: 1350 kcal, 73 g, short 2 g.',
          'That is a whole program. It has 4 small modules, 3 data files and 11 tests, and you know what every line does.'
        ],
        tip: 'Look at <code>main()</code> once more. It is 7 lines, and it reads like the plan from lesson 103: read, plan, print, save. The hard parts live in the other files, behind names that say what they do.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Use the whole project. Then go and build.',
        text: [
          'As in every review, <b>say the output out loud first</b>, then pick, then press Run to check. Every Run box here has the project files next to it, so <code>from planner import plan_all</code> just works. Change the code and run it again as often as you like. Each run starts with the full pantry from lesson 103.',
          'Try the warm-up. It calls <code>main()</code> twice, two mornings in a row, in one run. Day 1 is the plan you know. On day 2 the chicken is gone and 50 g of tofu is left, so Ana gets the pasta bake, the lentil soup and the bean chili, and Chloe gets only two meals. Day 2 is different because day 1 <b>saved</b> the pantry. The last lines print the saved file.',
          'pytest, mypy and Ruff do not run in a browser. Questions about them use the real project from lesson 107: its 11 tests, <code>python3 -m mypy src</code> and <code>ruff check</code>. The <b>fix</b> questions are real Kitchen Coach code with a bug. Change it, then press <b>Run and check</b>. The page tries your code with other guests and other jars too.',
          '<b>After the last question, the course is done.</b> You started with one <code>print</code> line in lesson 1. You can now plan a program, split it into files, load and save data, write classes, test, type-check and tidy. The best next step is to keep building, and Kitchen Coach is a good place to start. You need no new syntax for any of these:',
          '<b>A smarter planner.</b> Let the friends take turns, one meal each. Or try every set of 3 dishes and keep the one closest to the protein goal. Only <code>planner.py</code> changes.',
          '<b>A shopping list.</b> When a dish is dropped because the pantry is short, write down what is missing and how many grams. Print the list under the plan.',
          '<b>A week plan.</b> Run 7 days in a row, like the warm-up runs 2, and go shopping when the shelves get empty.',
          '<b>Your own kitchen.</b> Put your own recipes and your own goals into the JSON files. A program you use yourself is the one you will keep making better.'
        ],
        tip: 'Whatever you build next, work the way this module did. Say who it is for. Make the smallest version that runs. Write a test before you fix a bug. You already know how.'
      }
    ],
    quiz: [
      {
        type: 'type', q: 'Warm up with lesson 105\'s pantry. The file has 13 items, and saffron is not one of them. What does this print? Type it exactly, then press Run to check.',
        pic: run(shelf, { title: 'shelf.py', files: BASE }),
        prompt: 'output >',
        answers: ['13 200 0'],
        why: '<code>len(pantry)</code> asks <code>__len__</code>: 13 items. <code>pantry["tofu"]</code> asks <code>__getitem__</code>: 200 g. And a jar that is not on the shelf gives <b>0</b>, not a <code>KeyError</code>, because <code>__getitem__</code> uses <code>.get(name, 0)</code> (lessons 101 and 105).',
        hint: 'Lesson 105: what does the pantry say about an item it does not have?'
      },
      {
        type: 'match', q: 'Lesson 103 gave every piece of Kitchen Coach one job. Match each piece to its job.',
        pairs: [
          ['models.py', 'what a Guest and a Recipe are, and what a guest allows'],
          ['pantry.py', 'the only code that knows how the shelf is stored'],
          ['planner.py', 'decides who gets which dish'],
          ['cli.py', 'runs the day in order and prints the plan'],
          ['data/pantry.json', 'what is on the shelf, kept for tomorrow'],
          ['tests/test_planner.py', 'checks that Ana\'s plan is still 1610 kcal'],
          ['pyproject.toml', 'the cover page: name, command and Ruff settings']
        ],
        why: 'Models say what things <b>are</b>. The pantry owns the shelf and its file. The planner <b>decides</b>, and never prints or opens a file. <code>cli.py</code> runs the steps and talks to the person. Data lives in JSON, tests live in <code>tests/</code>, and <code>pyproject.toml</code> is the cover page (lessons 94, 103 and 107).',
        hint: 'Start with the ones you are surest of. Which file prints? Which file decides?'
      },
      {
        type: 'order', q: 'You type <code>kitchen-coach</code> in the terminal. Put what happens in order.',
        items: [
          'pyproject.toml points the command at kitchen_coach.cli:main',
          'main() reads the guests, the recipes and the pantry from data/',
          'plan_all plans Ana, then Ben, then Chloe, and takes each dish from the pantry',
          'show prints each plan with kcal, protein and "short"',
          'save_pantry writes what is left to data/pantry.json'
        ],
        why: '<b>Read, plan, print, save</b>, the plan from lesson 103 and the body of <code>main()</code> from lesson 106. The command name comes from <code>[project.scripts]</code> in <code>pyproject.toml</code> (lesson 94). Saving comes last, so the file holds the pantry <b>after</b> the day.',
        hint: 'Nothing can be planned before it is read, and the pantry is saved after the food has left it.'
      },
      {
        type: 'pick', q: 'Where did we learn this? <code>guest_from_dict</code> turns one row of <code>guests.json</code> into a Guest. What do the two stars do?',
        pic: code(['def guest_from_dict(d: dict) -> Guest:', '    return Guest(**d)'], { title: 'models.py' }),
        options: [
          'They spread the dict into keyword arguments: Guest(name="Ana", kcal_target=2600, ...). Lesson 79, *args and **kwargs',
          'They copy the dict, so the Guest does not share it. Lesson 97, Mutability and references',
          'They raise d to a power. Lesson 7, Maths in Python',
          'They turn the dict into a dataclass. Lesson 73, Dataclasses'
        ],
        answer: 0,
        why: 'In a call, <code>**d</code> unpacks a dict into <code>key=value</code> arguments (lesson 79). That is why a typo like <code>"protien_target"</code> in the file stops at load time with a <code>TypeError</code> (lesson 104). <code>@dataclass</code> is what wrote the <code>__init__</code> that receives them (lesson 73).',
        hint: 'Lesson 104, The fix: what does Guest(**row) become?',
        hints: { 1: 'A copy is made with dict(...) or .copy(). Stars in a call do something else.', 2: 'Between two numbers ** is a power. Here it stands in front of one dict, inside a call.', 3: 'The class is already a dataclass, because of the line @dataclass above it.' }
      },
      {
        type: 'type', q: 'Where did we learn this? <code>Guest</code> is a dataclass (lesson 73), and nobody wrote an <code>__eq__</code> for it. What does this print? Type it exactly.',
        pic: run(twins, { title: 'twins.py', files: BASE }),
        prompt: 'output >',
        answers: ['True False'],
        why: '<code>@dataclass</code> writes <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> for you, and its <code>__eq__</code> compares the fields. Both cards say Ana, 2600, 100, so <code>==</code> is <code>True</code> (lesson 73). But they are two objects, made by two calls, so <code>is</code> says <code>False</code> (lesson 97).',
        hint: 'Lesson 73: which methods does @dataclass write? Lesson 97: == asks "equal?", is asks "the same object?".'
      },
      {
        type: 'pick', q: 'Ben asks for a use-by date on every pantry item. The file changes from <code>"tofu": 200</code> to <code>"tofu": {"grams": 200, "use_by": "2026-11-28"}</code>. The Pantry keeps answering <code>has_all</code> and <code>take</code> the same way. Which module has to change?',
        options: [
          'pantry.py only. It is the only code that knows how the pantry is stored',
          'planner.py, because it calls has_all and take',
          'cli.py, because it passes the path to load_pantry',
          'All four modules, because they all use the pantry'
        ],
        answer: 0,
        why: 'This is why lesson 103 split the work. <code>planner.py</code> only <b>asks</b> the pantry, with <code>has_all</code> and <code>take</code>. <code>cli.py</code> only hands over a path. How the grams are stored is a secret of <code>pantry.py</code>, so the change stays in one file. In one big <code>coach.py</code> the same change broke the printing.',
        hint: 'Lesson 103, The fix: which piece is the only one that looks inside the pantry file?',
        hints: { 1: 'The planner calls two methods. Do their names or their answers change?', 2: 'The path is the same. Only what is inside the file changes.', 3: 'If every module had to change, the split from lesson 103 would not have helped.' }
      },
      {
        type: 'pick', q: 'Where did we learn this? <code>save_pantry</code> writes <code>json.dumps(pantry.grams, indent=2, sort_keys=True)</code> (lesson 59). <code>pantry.json</code> starts with rice, 1000 g. After one full day, what is <b>line 2</b> of the saved file?',
        pic: run(savedLine, { title: 'saved.py', files: ALL }),
        options: ['"beans": 150,', '"rice": 725,', '"rice": 1000,', '"beans": 300,'],
        answer: 0,
        why: 'Line 1 is the <code>{</code>. <code>sort_keys=True</code> writes the items by name, so beans come first, not rice (lesson 59). And the file is saved <b>after</b> the plan: Chloe\'s bean chili took 150 g of the 300 g of beans. The rice went from 1000 g to 725 g, but it sits much further down.',
        hint: 'Two things changed since the morning: the order of the lines, and the grams.',
        hints: { 1: '725 g of rice is right. But is rice still the first item, with sort_keys=True?', 2: 'That is the morning file. The pantry is saved after the plan.', 3: 'The order is right. But who cooked with beans today?' }
      },
      {
        type: 'fill', q: 'Finish lesson 107\'s most important taste test. Three bowls need 450 g of chicken, and the full pantry has 300 g of chicken and 1000 g of rice.',
        text: 'THREE_BOWLS = {"rice": 300, "chicken": 450}\n\ndef test_failed_take_changes_nothing():\n    pantry = full_pantry()\n    with pytest.___(ValueError):\n        pantry.___(THREE_BOWLS)\n    assert pantry["rice"] == ___\n    assert pantry["chicken"] == ___',
        options: ['raises', 'take', '1000', '300', '700', 'has_all', 'catches'],
        answer: ['raises', 'take', '1000', '300'],
        why: '<code>pytest.raises(ValueError)</code> says "this block must raise" (lesson 89). <code>take</code> is the method under test. And after a refused take <b>nothing</b> has changed: 1000 g of rice, 300 g of chicken. With Ben\'s one-loop <code>take</code> the rice was 700, and this test went red: <code>assert 700 == 1000</code> (lesson 107).',
        hint: 'Lesson 105: take everything, or nothing at all. What is in the jars after a take that failed?'
      },
      {
        type: 'pick', q: 'The whole project, with one new line: <code>guests.reverse()</code>. Now Chloe plans first, then Ben, then Ana. Compared with the normal day, who loses which dish? Say it out loud, then press Run.',
        pic: run(reversed, { title: 'reversed.py', files: ALL }),
        options: [
          'Ana loses the tofu stir-fry to Ben, and Ben loses the yogurt bowl to Chloe',
          'Ana loses the chicken rice bowl, because Chloe took the chicken',
          'Nobody loses anything. plan_all sorts the guests by name first',
          'Ben loses the pasta bake, because Chloe took the pasta'
        ],
        answer: 0,
        why: 'One shared pantry, so the order matters (lesson 106). Chloe goes first and her yogurt bowl takes 80 g of the 150 g of berries. 70 g is left, so Ben\'s yogurt bowl is dropped. Ben is still before Ana, so he takes 150 g of the 200 g of tofu, and Ana\'s tofu stir-fry is dropped. The chicken is enough for two bowls, 300 g, so Ana and Chloe both keep theirs. Chloe now has 78 g of protein, so her line has no "short" at all.',
        hint: 'Two jars are too small for two servings: the tofu (200 g, a dish needs 150 g) and the berries (150 g, a dish needs 80 g). Who gets to each jar first now?',
        hints: { 1: 'A bowl needs 150 g of chicken and the jar has 300 g. How many bowls is that?', 2: 'Look at plan_all in lesson 106. It walks the list in the order it is given.', 3: 'Chloe is gluten-free. Is the pasta bake in her line-up at all?' }
      },
      {
        type: 'bucket', q: 'Lesson 107 used three tools. Each mistake below is found by exactly one of them. Which one?',
        buckets: ['pytest', 'mypy', 'ruff'],
        items: [
          ['the line-up is sorted least protein first, so Ana gets rice pudding', 0],
          ['take forgets to subtract, so the tofu stays at 200 g', 0],
          ['cli.py calls show(guest.name, meals), a str where a Guest is promised', 1],
          ['load_pantry says return {} but its def line promises -> Pantry', 1],
          ['planner.py has import json and never uses it', 2],
          ['a def line that is 124 characters long', 2]
        ],
        why: '<b>pytest</b> runs the code and compares answers, so it finds a wrong plan and a wrong number of grams. <b>mypy</b> reads the hints without running anything, so it finds a value of the wrong type. The 11 tests stay green for both of those: no test calls <code>show</code>, and <code>len({})</code> is 0, like an empty pantry. <b>Ruff</b> reads the layout and the leftovers: an unused import is F401, a long line is E501.',
        hint: 'Wrong answer, wrong type, or untidy?'
      },
      {
        type: 'match', q: 'Somebody breaks Kitchen Coach in six different ways. Each time, one of these taste tests from lesson 107 goes red. Match the bug to the test that catches it.',
        pairs: [
          ['Guest.allows forgets the vegetarian rule', 'test_ben_is_not_allowed_chicken_rice_bowl'],
          ['Guest.allows forgets the gluten rule', 'test_chloe_is_not_allowed_pasta_bake'],
          ['take checks and subtracts in one loop', 'test_failed_take_changes_nothing'],
          ['load_pantry has no try and except any more', 'test_missing_file_gives_an_empty_pantry'],
          ['plan_day never looks at kcal_target', 'test_plan_never_goes_over_the_kcal_target'],
          ['plan_all hands every guest a new full pantry', 'test_ben_gets_no_tofu_stir_fry_after_ana']
        ],
        why: 'A good test name is a rule of the program, so a red test tells you which rule broke (lesson 107). Ben and the chicken is the vegetarian rule. Chloe and the pasta is the gluten rule. A one-loop <code>take</code> leaves 700 g of rice. Without <code>try</code> a missing file is a <code>FileNotFoundError</code>. Without the kcal check a 900 kcal day gets 1610 kcal. And with a pantry of his own, Ben gets the tofu stir-fry after all.',
        hint: 'Read each test name as a sentence. Which rule does it guard?'
      },
      {
        type: 'fix', q: 'This <code>take</code> never checks. Three bowls need 450 g of chicken, there are 300 g, and it "cooks" them anyway: <code>chicken: -150 g</code>. Fix <code>take</code> the lesson 105 way, so the program prints these three lines.<br><code>refused: not enough chicken: need 450 g, have 300 g</code><br><code>rice: 1000 g</code><br><code>chicken: 300 g</code>',
        code: takeBug, title: 'pantry.py',
        check: [
          'K = globals().get("Pantry")',
          'lines = [l.strip() for l in out.strip().splitlines()]',
          'want = ["refused: not enough chicken: need 450 g, have 300 g", "rice: 1000 g", "chicken: 300 g"]',
          'def _try(start, order):',
          '    p = K(start)',
          '    try:',
          '        p.take(order)',
          '        return "took", p.grams',
          '    except ValueError:',
          '        return "refused", p.grams',
          '    except Exception as e:',
          '        return "error " + type(e).__name__, p.grams',
          'if not isinstance(K, type):',
          '    msg = "Keep the class Pantry."',
          'elif "-150" in out:',
          '    msg = "The chicken jar says minus 150 g. take must check first, and raise a ValueError when there is not enough."',
          'elif lines[:1] == ["cooked three bowls"]:',
          '    msg = "It still cooks three bowls. When have < need, raise ValueError(...)."',
          'elif len(lines) == 3 and lines[1] == "rice: 700 g":',
          '    msg = "Refused, but 300 g of rice is gone anyway. Use two loops: the first one only checks every item, the second one only subtracts."',
          'elif lines != want:',
          '    msg = "It should print: " + " / ".join(want) + ". The message is  not enough {name}: need {need} g, have {have} g"',
          'elif _try({"tofu": 200, "rice": 1000}, {"tofu": 150, "rice": 75}) != ("took", {"tofu": 50, "rice": 925}):',
          '    msg = "A take that fits should still subtract: 200 g of tofu minus 150 g leaves 50 g, and 1000 g of rice minus 75 g leaves 925 g."',
          'elif _try({"tofu": 150}, {"tofu": 150}) != ("took", {"tofu": 0}):',
          '    msg = "Exactly enough is enough: 150 g of tofu and an order for 150 g should work and leave 0 g."',
          'elif _try({"rice": 500, "chicken": 100}, {"rice": 200, "chicken": 150}) != ("refused", {"rice": 500, "chicken": 100}):',
          '    msg = "With 500 g of rice and 100 g of chicken, an order for 200 g of rice and 150 g of chicken must be refused, and the rice must stay at 500 g. Check every item before you take any."',
          'elif _try({"rice": 500}, {"rice": 200, "saffron": 5})[0] != "refused":',
          '    msg = "An item that is not on the shelf counts as 0 g, so that order must be refused with a ValueError."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Lesson 105\'s rule: <b>check everything first, then change</b>. A first loop looks at every item and raises <code>ValueError(f"not enough {name}: need {need} g, have {have} g")</code> when <code>have &lt; need</code>. Only then a second loop subtracts. With one loop the rice would already be gone when the chicken fails. That is the half-taken pantry from lesson 105, and the red test from lesson 107.',
        hint: 'Two loops over ingredients.items(). The first one only checks and raises. The second one only subtracts.'
      },
      {
        type: 'pick', q: 'A fourth friend joins. Dev eats everything, wants 2200 kcal, and plans <b>last</b>, after Ana, Ben and Chloe. What does Kitchen Coach give him? Work it out from the pantry they leave, then press Run.',
        pic: run(dev, { title: 'dev.py', files: ALL }),
        options: [
          'pasta bake, lentil soup, bean chili',
          'chicken rice bowl, tofu stir-fry, pasta bake',
          'pasta bake, yogurt bowl, lentil soup',
          'nothing fits today'
        ],
        answer: 0,
        why: 'Dev may eat everything, so his line-up could be Ana\'s. But the first three friends leave 0 g of chicken, 50 g of tofu and 70 g of berries. The chicken rice bowl, the tofu stir-fry and the yogurt bowl all fail <code>pantry.has_all</code> and never join his line-up. What is left, most protein first: pasta bake 22 g, lentil soup 18 g, bean chili 15 g. He ends at 55 g of his 90 g. The last one to plan gets what the others left (lesson 106).',
        hint: 'After the normal day: how much chicken, tofu and berries are left? Then line up what he can still make, most protein first.',
        hints: { 1: 'That is Ana\'s plan, from a full pantry. How much chicken is left after Ana and Chloe?', 2: 'That is Ben\'s plan. But Ben\'s yogurt bowl left 70 g of berries, and a bowl needs 80 g.', 3: 'There is still pasta, cheese, lentils, carrots, beans and tomatoes on the shelf.' }
      },
      {
        type: 'fix', q: 'Somebody "tidied" one line of <code>plan_day</code>, and now Ana, who runs half-marathons, gets <code>rice pudding, bean chili, lentil soup</code> and 41 g of protein. Fix it so she gets <code>Ana: chicken rice bowl, tofu stir-fry, pasta bake</code> and <code>86 g protein</code>.',
        code: sortBug, title: 'planner.py', files: BASE,
        check: CHECK_SETUP.concat([
          '_ana = _Guest("Ana", 2600, 100)',
          '_tie = [_Recipe("yogurt bowl", 250, 20, True, True, {"yogurt": 200}), _Recipe("omelette", 300, 20, True, True, {"milk": 50}), _Recipe("egg salad", 280, 20, True, True, {"milk": 50}), _Recipe("lentil soup", 320, 18, True, True, {"lentils": 80})]',
          'want = ["Ana: chicken rice bowl, tofu stir-fry, pasta bake", "86 g protein"]',
          'if not callable(globals().get("plan_day")):',
          '    msg = "Keep the function plan_day."',
          'elif lines[:1] == ["Ana: rice pudding, bean chili, lentil soup"]:',
          '    msg = "Still the three dishes with the least protein. Look at the key in the sorted line: which way does it sort the protein?"',
          'elif lines != want:',
          '    msg = "It should print: " + " / ".join(want)',
          'elif _names(_Guest("Ben", 2400, 140, vegetarian=True)) != ["tofu stir-fry", "pasta bake", "yogurt bowl"]:',
          '    msg = "Ana is right. But Ben alone, with a full pantry, should get tofu stir-fry, pasta bake, yogurt bowl."',
          'elif _names(_ana, _tie) != ["egg salad", "omelette", "yogurt bowl"]:',
          '    msg = "Almost. Three dishes with 20 g of protein each should come out by name: egg salad, omelette, yogurt bowl. reverse=True flips the names too. Put a minus in front of r.protein."',
          'else:',
          '    ok = True'
        ]).join('\n'),
        why: 'The key lost its minus sign. <code>(r.protein, r.name)</code> sorts the <b>least</b> protein first. Lesson 106\'s line is <code>key=lambda r: (-r.protein, r.name)</code>: the minus puts the most protein first, and the name still settles a tie by the alphabet (lesson 81). On your computer <code>test_ana_plan</code> turns red within a second, and that is how you would find this.',
        hint: 'Lesson 106, The code: the line-up is most protein first, then by name. Which small sign does that?'
      },
      {
        type: 'fix', q: 'Ana has a rest day: 900 kcal. The planner gives her only the chicken rice bowl, 650 kcal, but the yogurt bowl (250 kcal) would fit exactly. All 11 tests pass with this bug. Fix <code>plan_day</code> so it prints <code>rest day: chicken rice bowl, yogurt bowl</code> and <code>900 / 900 kcal</code>.',
        code: breakBug, title: 'planner.py', files: BASE,
        check: CHECK_SETUP.concat([
          'want = ["rest day: chicken rice bowl, yogurt bowl", "900 / 900 kcal"]',
          '_ana = _Guest("Ana", 2600, 100)',
          'if not callable(globals().get("plan_day")):',
          '    msg = "Keep the function plan_day."',
          'elif lines[:1] == ["rest day: chicken rice bowl"]:',
          '    msg = "Still one meal. The tofu stir-fry is too much, and then the loop stops looking. Which word skips one dish and goes on to the next?"',
          'elif len(lines) == 2 and lines[1].split(" ")[0].isdigit() and int(lines[1].split(" ")[0]) > 900:',
          '    msg = "Now the day is over 900 kcal. Keep the kcal check. Only what happens after it has to change."',
          'elif lines != want:',
          '    msg = "It should print: " + " / ".join(want)',
          'elif _names(_Guest("small day", 600, 30)) != ["tofu stir-fry", "yogurt bowl"]:',
          '    msg = "With 600 kcal the plan should be tofu stir-fry, yogurt bowl: skip the chicken rice bowl (650), take the tofu stir-fry (350), skip the pasta bake, take the yogurt bowl (250)."',
          'elif _names(_ana) != ["chicken rice bowl", "tofu stir-fry", "pasta bake"]:',
          '    msg = "The rest day works. But a normal day for Ana should still be chicken rice bowl, tofu stir-fry, pasta bake: stop at 3 meals."',
          'elif _names(_ana, max_meals=1) != ["chicken rice bowl"]:',
          '    msg = "With max_meals=1 the plan should be one meal. Keep the first check, the one that stops when the day is full."',
          'else:',
          '    ok = True'
        ]).join('\n'),
        why: 'The kcal check said <code>break</code>. <code>break</code> ends the whole loop at the first dish that is too big, so nothing after the tofu stir-fry was even looked at. <code>continue</code> skips that one dish and goes on (lesson 28). Then the pasta bake is skipped too, and the yogurt bowl makes exactly 900, which is not over. The tests missed it because the only test with a small target asks <code>&lt;= 900</code>, and 650 passes that. Green means tasted, not perfect (lesson 107). A new test that names the two dishes would guard this.',
        hint: 'Lesson 28: break leaves the loop, continue goes to the next item. Which one does "this dish is too big" need?'
      },
      {
        type: 'fix', q: 'Last one. Kitchen Coach runs two mornings in a row, and day 2 gets the same plan as day 1, chicken and all. But the chicken was eaten on day 1. One line of <code>main()</code> is in the wrong place. Fix it so day 2 prints <code>Ana: pasta bake, lentil soup, bean chili</code> and <code>Chloe: lentil soup, rice pudding</code>.',
        code: saveBug, title: 'cli.py', files: WITH_PLANNER,
        check: [
          'import json as _json',
          'from pathlib import Path as _Path',
          'lines = [l.strip() for l in out.strip().splitlines()]',
          'day1 = ["Ana: chicken rice bowl, tofu stir-fry, pasta bake", "1610 / 2600 kcal, 86 / 100 g protein, short 14 g protein", "Ben: pasta bake, yogurt bowl, lentil soup", "1180 / 2400 kcal, 60 / 140 g protein, short 80 g protein", "Chloe: chicken rice bowl, lentil soup, bean chili", "1350 / 2000 kcal, 73 / 75 g protein, short 2 g protein"]',
          'day2 = ["Ana: pasta bake, lentil soup, bean chili", "1310 / 2600 kcal, 55 / 100 g protein, short 45 g protein", "Ben: pasta bake, lentil soup, rice pudding", "1230 / 2400 kcal, 48 / 140 g protein, short 92 g protein", "Chloe: lentil soup, rice pudding", "620 / 2000 kcal, 26 / 75 g protein, short 49 g protein"]',
          'try:',
          '    _saved = _json.loads(_Path("data/pantry.json").read_text())',
          'except Exception:',
          '    _saved = None',
          'if lines == ["Day 1"] + day1 + ["Day 2. Nobody went shopping."] + day1:',
          '    msg = "Day 2 is still a copy of day 1, so the file did not change between the two mornings. The pantry must be saved after the food has left it. Where does save_pantry belong: before the plan, or after?"',
          'elif lines != ["Day 1"] + day1 + ["Day 2. Nobody went shopping."] + day2:',
          '    msg = "Keep the two calls of main() and the two print lines. Day 1 should be the normal plan, and day 2 should start with  Ana: pasta bake, lentil soup, bean chili"',
          'elif not isinstance(_saved, dict) or _saved.get("chicken") != 0 or _saved.get("pasta") != 100 or _saved.get("rice") != 625:',
          '    msg = "The plans are right, but data/pantry.json should hold the pantry after day 2: 0 g of chicken, 100 g of pasta, 625 g of rice. Save after the plan."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>save_pantry</code> ran <b>before</b> <code>plan_all</code>, so it wrote the full morning pantry back to the file, and tomorrow started with chicken that was already eaten. Move it under the plan: <b>read, plan, print, save</b>. No test, no mypy and no Ruff finds this one, because nothing is wrong with any single line. Only the order is wrong, and you found it by knowing what the program is for. That is the skill this course was about. <b>You have finished Learn Python.</b> Thank you for cooking all 108 lessons. Now go and build something of your own.',
        hint: 'Lesson 103: read, plan, print, save. Which of the four is too early in this main()?'
      }
    ]
  });
})();
