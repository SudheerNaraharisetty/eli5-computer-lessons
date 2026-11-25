/* Lesson 106: The meal planner (module 10). One file per lesson.
   Builds Kitchen Coach's planner.py (plan_day, plan_all) and a first cli.py (read_json, show, main).
   Every Run box was checked with Python 3.14 (Homebrew) and in this page (Pyodide, Python 3.14).
   Terminal pictures are real: Python 3.15.2 (Homebrew), macOS, the kitchen-coach project installed
   with pip install -e . in a venv, run on 2026-11-25. Names, numbers and layout follow the shared
   module 10 spec. models.py is lesson 104's file, pantry.py is lesson 105's file. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l106  The meal planner
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

  /* ---- planner.py, this lesson's file (src/kitchen_coach/planner.py in the project) ---- */
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

  /* ---- cli.py, the first version (src/kitchen_coach/cli.py in the project) ---- */
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

  // The three lines every box uses to read the data (lesson 104's way).
  const LOAD = [
    'guests = [guest_from_dict(d) for d in json.loads(Path("data/guests.json").read_text())]',
    'recipes = [recipe_from_dict(d) for d in json.loads(Path("data/recipes.json").read_text())]',
    'pantry = load_pantry(Path("data/pantry.json"))'
  ];

  /* ---- The idea: keep, line up, pick, take ---- */
  const LINE = [['chicken rice bowl', 40, 650], ['tofu stir-fry', 24, 350], ['pasta bake', 22, 610], ['yogurt bowl', 20, 250], ['lentil soup', 18, 320], ['bean chili', 15, 380], ['rice pudding', 8, 300]];
  const stepBox = (i, head, sub, col) => {
    const x = 8 + i * 148;
    return box(x, 14, 140, 76, P.white, 12) +
      `<circle cx="${x + 22}" cy="36" r="12" fill="${col}"/>` + T(x + 22, 40.5, String(i + 1), { s: 12.5, f: P.white }) +
      T(x + 42, 41, head, { s: 15, a: 'start' }) +
      T(x + 70, 64, sub[0], { s: 11, w: 700, f: P.ink2 }) + T(x + 70, 79, sub[1], { s: 11, w: 700, f: P.ink2 }) +
      (i < 3 ? arrow(x + 140, 52, x + 148, 52, P.ink2, 2) : '');
  };
  const ideaPic = svg(600, 372, 'The planner in four steps. 1, keep: the recipes the guest may eat and the pantry can make. 2, line up: most protein first. 3, pick: walk down the line while the kcal fit, up to 3 meals. 4, take: the ingredients leave the pantry. Below, Ana\'s line-up of seven recipes by protein: chicken rice bowl 40 g, tofu stir-fry 24 g, pasta bake 22 g, yogurt bowl 20 g, lentil soup 18 g, bean chili 15 g, rice pudding 8 g. The top three are picked. On the right, Ana\'s day: 1610 of 2600 kcal and 86 of 100 g protein, short 14 g. And the tofu jar in the shared pantry drops from 200 g to 50 g.',
    stepBox(0, 'Keep', ['her rules, and what', 'the pantry can make'], P.accent) +
    stepBox(1, 'Line up', ['most protein', 'first'], P.warn) +
    stepBox(2, 'Pick', ['while the kcal fit,', 'up to 3 meals'], P.ok) +
    stepBox(3, 'Take', ['the ingredients', 'leave the pantry'], P.danger) +
    box(8, 108, 330, 250, P.white, 14) +
    T(24, 134, 'Ana\'s line-up', { s: 14.5, a: 'start' }) + T(322, 134, 'protein', { s: 11.5, a: 'end', f: P.ink2 }) +
    LINE.map((r, i) => {
      const y = 146 + i * 29, on = i < 3;
      return `<rect x="20" y="${y}" width="306" height="24" rx="7" fill="${on ? P.okT : P.sand}"/>` +
        T(32, y + 17, r[0], { s: 12.5, w: on ? 800 : 700, a: 'start', f: on ? P.ink : P.ink2 }) +
        (on ? T(232, y + 17, '✓ take', { s: 11.5, f: P.ok }) : '') +
        T(316, y + 17, r[1] + ' g', { s: 12.5, m: true, a: 'end', f: on ? P.ok : P.ink2 });
    }).join('') +
    arrow(342, 190, 366, 190, P.ok, 3) +
    box(372, 108, 220, 132, P.okT, 14) +
    T(482, 134, 'Ana\'s day', { s: 14.5 }) +
    T(482, 160, '3 meals', { s: 12.5, w: 700, f: P.ink2 }) +
    T(482, 184, '1610 / 2600 kcal', { s: 13, m: true }) +
    T(482, 206, '86 / 100 g protein', { s: 13, m: true }) +
    T(482, 228, 'short 14 g protein', { s: 12.5, f: P.danger }) +
    box(372, 256, 220, 102, P.white, 14) +
    T(482, 280, 'the shared pantry', { s: 12.5, f: P.ink2 }) +
    T(392, 312, 'tofu', { s: 14, a: 'start' }) +
    T(470, 312, '200 g', { s: 13, m: true, f: P.mute }) + `<line x1="446" y1="308" x2="494" y2="308" stroke="${P.mute}" stroke-width="2"/>` +
    arrow(500, 308, 520, 308, P.danger, 2.5) +
    T(552, 312, '50 g', { s: 14, m: true, f: P.danger }) +
    T(482, 342, 'Ben and Chloe get what is left', { s: 11, w: 700, f: P.ink2 }));

  /* ---- The code: steps 1 and 2, and a first try at step 3 ---- */
  const lineUp = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    '',
    ...LOAD,
    '',
    'guest = guests[0]  # 0 is Ana, 1 is Ben, 2 is Chloe',
    'print(guest)',
    '',
    '# 1. keep: what this guest may eat, and what the pantry can make',
    'allowed = [r for r in recipes if guest.allows(r)]',
    'candidates = [r for r in allowed if pantry.has_all(r.ingredients)]',
    '',
    '# 2. line up: most protein first, then by name',
    'line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))',
    'for r in line_up:',
    '    print(f"{r.protein:>3} g  {r.kcal} kcal  {r.name}")',
    '',
    '# 3. pick: a first try, just the top 3',
    'meals = line_up[:3]',
    'print("plan:", ", ".join([r.name for r in meals]))'
  ];

  /* ---- The pain: the plan promises the same tofu twice ---- */
  const firstTry = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    '',
    '',
    'def plan_day(guest, recipes, pantry, max_meals=3):',
    '    """First try: the top of the line-up. Nothing leaves the pantry."""',
    '    allowed = [r for r in recipes if guest.allows(r)]',
    '    candidates = [r for r in allowed if pantry.has_all(r.ingredients)]',
    '    line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))',
    '    return line_up[:max_meals]',
    '',
    '',
    ...LOAD,
    '',
    'plans = {}',
    'for guest in guests:',
    '    plans[guest.name] = plan_day(guest, recipes, pantry)',
    '    print(f"{guest.name}: {\', \'.join([r.name for r in plans[guest.name]])}")',
    '',
    'print()',
    'print("Now cook it:")',
    'for name, meals in plans.items():',
    '    for recipe in meals:',
    '        pantry.take(recipe.ingredients)',
    '        print(f"  cooked {recipe.name} for {name}")'
  ];
  const jar = (x, y, name, grams, col) =>
    `<rect x="${x}" y="${y}" width="92" height="56" rx="10" fill="${P.white}" stroke="${col || P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 22}" y="${y - 7}" width="48" height="10" rx="3" fill="${col || P.ink}"/>` +
    T(x + 46, y + 23, name, { s: 12.5, f: col || P.ink }) + T(x + 46, y + 44, grams, { s: 13, m: true, f: col || P.ink });
  const promisedSvg = svg(600, 150, 'The first-try plan promises more than the pantry has. Tofu: Ana\'s tofu stir-fry needs 150 g and Ben\'s tofu stir-fry needs 150 g, that is 300 g, but the jar holds 200 g. Berries: Ben\'s yogurt bowl needs 80 g and Chloe\'s yogurt bowl needs 80 g, that is 160 g, but the jar holds 150 g.',
    jar(14, 24, 'tofu', '200 g') +
    T(124, 44, 'Ana: tofu stir-fry 150 g', { s: 12.5, w: 700, a: 'start' }) +
    T(124, 66, 'Ben: tofu stir-fry 150 g', { s: 12.5, w: 700, a: 'start' }) +
    T(124, 100, 'promised 300 g', { s: 13.5, a: 'start', f: P.danger }) +
    jar(314, 24, 'berries', '150 g') +
    T(424, 44, 'Ben: yogurt bowl 80 g', { s: 12.5, w: 700, a: 'start' }) +
    T(424, 66, 'Chloe: yogurt bowl 80 g', { s: 12.5, w: 700, a: 'start' }) +
    T(424, 100, 'promised 160 g', { s: 13.5, a: 'start', f: P.danger }) +
    T(300, 136, 'Each plan looked fine alone. Together they do not fit in one pantry.', { s: 12.5, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(firstTry, { title: 'first_try.py', files: BASE })}${promisedSvg}</div>`;

  /* ---- The fix: take as you pick, and one shared pantry ---- */
  const planAll = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    'from planner import plan_all',
    '',
    ...LOAD,
    '',
    'plans = plan_all(guests, recipes, pantry)',
    'for name, meals in plans.items():',
    '    print(f"{name}: {\', \'.join([r.name for r in meals])}")',
    '',
    'print()',
    'for item in ["tofu", "berries", "chicken"]:',
    '    print(f"{item} left: {pantry[item]} g")'
  ];
  const sharedRow = (y, item, start, who1, took, left, who2, need) =>
    jar(14, y, item, start + ' g') +
    arrow(112, y + 28, 236, y + 28, P.ink2, 2.5) +
    T(174, y + 16, who1, { s: 11.5, w: 800, f: P.ink2 }) + T(174, y + 48, 'takes ' + took + ' g', { s: 11.5, w: 700, f: P.ink2 }) +
    jar(244, y, item, left + ' g', P.danger) +
    arrow(342, y + 28, 396, y + 28, P.ink2, 2.5) +
    `<rect x="402" y="${y}" width="186" height="56" rx="10" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2"/>` +
    T(495, y + 23, who2, { s: 12, f: P.danger }) + T(495, y + 44, 'needs ' + need + ' g: dropped', { s: 12, w: 700, f: P.danger });
  const sharedSvg = svg(600, 216, 'One shared pantry, so the order matters. Tofu: the jar starts at 200 g. Ana\'s tofu stir-fry takes 150 g, so 50 g is left. Ben\'s tofu stir-fry needs 150 g, so it is dropped from his line-up. Berries: the jar starts at 150 g. Ben\'s yogurt bowl takes 80 g, so 70 g is left. Chloe\'s yogurt bowl needs 80 g, so it is dropped from her line-up.',
    T(300, 20, 'Ana plans first, then Ben, then Chloe', { s: 13, f: P.ink2 }) +
    sharedRow(48, 'tofu', 200, 'Ana\'s stir-fry', 150, 50, 'Ben\'s tofu stir-fry', 150) +
    sharedRow(136, 'berries', 150, 'Ben\'s yogurt bowl', 80, 70, 'Chloe\'s yogurt bowl', 80) +
    T(300, 210, 'An earlier guest\'s pick changes what a later guest is offered.', { s: 12.5, f: P.ink2 }));
  const fixPic = `<div style="width:100%;min-width:0">${code(PLANNER, { title: 'planner.py', hi: [14, 15, 17, 19, 21, 33] })}${run(planAll, { title: 'plan.py', files: WITH_PLANNER })}${sharedSvg}</div>`;

  /* ---- Try it: the first cli.py ---- */
  const realRun = term([
    '$ kitchen-coach',
    'Ana: chicken rice bowl, tofu stir-fry, pasta bake',
    '    1610 / 2600 kcal, 86 / 100 g protein, short 14 g protein',
    'Ben: pasta bake, yogurt bowl, lentil soup',
    '    1180 / 2400 kcal, 60 / 140 g protein, short 80 g protein',
    'Chloe: chicken rice bowl, lentil soup, bean chili',
    '    1350 / 2000 kcal, 73 / 75 g protein, short 2 g protein',
    '$ cat data/pantry.json',
    '{',
    '  "beans": 150,',
    '  "berries": 70,',
    '  "carrots": 300,',
    '  "cheese": 120,',
    '  "chicken": 0,',
    '  ...',
    '  "tofu": 50,',
    '  "tomatoes": 200,',
    '  "yogurt": 200',
    '}'
  ], 'the real project, terminal, Python 3.15');
  const tryPic = `<div style="width:100%;min-width:0">${run(CLI, { title: 'cli.py', files: WITH_PLANNER })}${realRun}</div>`;

  /* ---- The catch: greedy is simple, and everyone ends short ---- */
  const bars = [['Ana', 86, 100, 14], ['Ben', 60, 140, 80], ['Chloe', 73, 75, 2]];
  const barsSvg = svg(600, 196, 'Protein planned against each goal. Ana: 86 of 100 g, short 14 g. Ben: 60 of 140 g, short 80 g. Chloe: 73 of 75 g, short 2 g. Every bar stops before its goal line.',
    T(14, 22, 'protein planned, against the goal', { s: 13, a: 'start', f: P.ink2 }) +
    bars.map((b, i) => {
      const y = 40 + i * 50, k = 2.9;
      return T(14, y + 21, b[0], { s: 14.5, a: 'start' }) +
        `<rect x="76" y="${y}" width="${b[2] * k}" height="30" rx="7" fill="${P.sand}" stroke="${P.ink2}" stroke-width="2" stroke-dasharray="5 4"/>` +
        `<rect x="76" y="${y}" width="${b[1] * k}" height="30" rx="7" fill="${P.accent}"/>` +
        T(84, y + 20, b[1] + ' g', { s: 12.5, m: true, a: 'start', f: P.white }) +
        `<line x1="${76 + b[2] * k}" y1="${y - 5}" x2="${76 + b[2] * k}" y2="${y + 35}" stroke="${P.ink}" stroke-width="3"/>` +
        T(84 + b[2] * k, y + 13, 'goal ' + b[2] + ' g', { s: 11.5, w: 800, a: 'start' }) +
        T(84 + b[2] * k, y + 29, 'short ' + b[3] + ' g', { s: 11.5, w: 800, a: 'start', f: P.danger });
    }).join('') +
    T(300, 188, 'Change the order and the gaps move around, but they add up to 96 g or more.', { s: 12.5, f: P.ink2 }));
  const allSix = [
    'import json',
    'from pathlib import Path',
    '',
    'from cli import show',
    'from models import guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    'from planner import plan_day',
    '',
    ...LOAD,
    '',
    'guest = guests[1]  # Ben, alone, with the whole pantry',
    'meals = plan_day(guest, recipes, pantry, max_meals=7)',
    'show(guest, meals)'
  ];
  const dayTwo = term([
    '$ kitchen-coach',
    '# the next morning. Nobody went shopping.',
    'Ana: pasta bake, lentil soup, bean chili',
    '    1310 / 2600 kcal, 55 / 100 g protein, short 45 g protein',
    'Ben: pasta bake, lentil soup, rice pudding',
    '    1230 / 2400 kcal, 48 / 140 g protein, short 92 g protein',
    'Chloe: lentil soup, rice pudding',
    '    620 / 2000 kcal, 26 / 75 g protein, short 49 g protein'
  ], 'day 2, the same command, terminal, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${barsSvg}${run(allSix, { title: 'all_for_ben.py', files: ALL })}${dayTwo}</div>`;

  /* ---- quiz code ---- */
  const noTake = [
    'import json',
    'from pathlib import Path',
    '',
    'from models import guest_from_dict, recipe_from_dict',
    'from pantry import load_pantry',
    '',
    '',
    'def plan_day(guest, recipes, pantry, max_meals=3):',
    '    allowed = [r for r in recipes if guest.allows(r)]',
    '    candidates = [r for r in allowed if pantry.has_all(r.ingredients)]',
    '    line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))',
    '    meals = []',
    '    kcal = 0',
    '    for recipe in line_up:',
    '        if len(meals) == max_meals:',
    '            break',
    '        if not pantry.has_all(recipe.ingredients):',
    '            continue',
    '        if kcal + recipe.kcal > guest.kcal_target:',
    '            continue',
    '        meals.append(recipe)',
    '        kcal += recipe.kcal',
    '    return meals',
    '',
    '',
    ...LOAD,
    'for guest in guests[:2]:  # Ana, then Ben',
    '    meals = plan_day(guest, recipes, pantry)',
    '    print(f"{guest.name}: {\', \'.join([r.name for r in meals])}")',
    'print("tofu left:", pantry["tofu"], "g")'
  ];
  const shortBug = [
    'def show(name, protein, target):',
    '    line = f"{name}: {protein} / {target} g protein"',
    '    line += f", short {target - protein} g protein"',
    '    print(line)',
    '',
    '',
    'show("Ana", 86, 100)',
    'show("Chloe", 78, 75)'
  ];

  COURSE.add({
    id: 'l106', minutes: 15,
    summary: 'Kitchen Coach\'s real job lives in <code>planner.py</code>. <code>plan_day(guest, recipes, pantry, max_meals=3)</code> works in four steps. <b>Keep</b>: the recipes <code>guest.allows</code> (lesson 104) and <code>pantry.has_all</code> (lesson 105). <b>Line up</b>: <code>sorted(candidates, key=lambda r: (-r.protein, r.name))</code>, most protein first, then by name (lesson 81). <b>Pick</b>: walk down the line, <code>break</code> at 3 meals, <code>continue</code> past a dish the pantry no longer has or that would push the day over <code>kcal_target</code>. <b>Take</b>: <code>pantry.take(recipe.ingredients)</code> the moment a dish is picked. A plan that does not take promises the same 200 g of tofu to Ana and to Ben, and the cooking stops with <code>ValueError: not enough tofu: need 150 g, have 50 g</code>. <code>plan_all(guests, recipes, pantry)</code> plans Ana, then Ben, then Chloe from <b>one shared pantry</b>, so <b>the order matters</b>: Ana takes 150 g of tofu, and Ben\'s tofu stir-fry is gone. A first <code>cli.py</code> has <code>main()</code>: read, plan, print, save. It prints <code>Ben: pasta bake, yogurt bowl, lentil soup</code> and <code>1180 / 2400 kcal, 60 / 140 g protein, short 80 g protein</code>. The catch: this planner is <b>greedy</b>. It takes the best dish it sees and never looks back. Everyone ends short of protein (Ana 14 g, Ben 80 g, Chloe 2 g), it never goes shopping, and it only uses kcal as a ceiling. That is an honest first version.',
    video: {
      src: 'videos/l106-meal-planner.mp4', poster: 'videos/l106-meal-planner.jpg', length: '1 min 8 s',
      script: [
        'The pantry is stocked. The guest cards are written. Now Kitchen Coach picks the meals.',
        'Ana goes first. The planner keeps the recipes she may eat and the pantry can make. Then it lines them up. Most protein first.',
        'Now it walks down the line. Chicken rice bowl. Still in the pantry? Yes. Calories fit? Yes. Take it.',
        'Tofu stir-fry. Take it. The tofu jar drops from 200 grams to 50. Pasta bake makes 3 meals. Ana is done.',
        'Now Ben. Same pantry. Chicken rice bowl? He eats no meat. Out. Tofu stir-fry? It needs 150 grams. The jar has 50. Out.',
        'So Ben gets pasta bake, yogurt bowl and lentil soup.',
        'Chloe gets her 3. And here is the plan.',
        'Everyone ends up short on protein. Ben by 80 grams. This planner is greedy. It takes the best dish it sees and never looks back.',
        'Filter, sort, pick, take. One shared pantry, so the order matters.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Keep, line up, pick, take.',
        text: [
          'The guest cards are written (lesson 104) and the pantry is stocked (lesson 105). Now Kitchen Coach does its real job. Each morning it chooses <b>up to 3 meals</b> for Ana, Ben and Chloe.',
          'Think how you would do it by hand for Ana. First you <b>keep</b> only the recipe cards she may eat and that the pantry can make. Then you <b>line them up</b> on the counter, the one with the most protein on the left. Then you walk down the line and <b>pick</b>: if the dish still fits in her calories for the day, it goes on her plan. And the moment you pick a dish, you <b>take</b> its ingredients off the shelf, so nobody else is promised the same tofu.',
          'That is the whole planner: <b>keep, line up, pick, take</b>. It is called a <b>greedy</b> plan, because at every step it grabs the best dish it can see right now and never changes its mind later. Greedy is simple and fast. It is not always the best. The catch at the end is honest about that.'
        ],
        tip: 'You know every tool already: comprehensions with <code>if</code> (lesson 76), <code>sorted</code> with a <code>key</code> (lessons 80 and 81), <code>break</code> and <code>continue</code> (lesson 28), and the two classes from lessons 104 and 105. This lesson only puts them in the right order.'
      },
      {
        label: 'The code', pic: run(lineUp, { title: 'line_up.py', files: BASE }),
        h: 'Keep and line up: two comprehensions and one sorted.',
        text: [
          'This box has lesson 104\'s <code>models.py</code>, lesson 105\'s <code>pantry.py</code> and the three data files next to it. It does the first two steps for one guest.',
          '<b>Keep.</b> <code>allowed</code> asks the guest about every recipe: <code>guest.allows(r)</code>. <code>candidates</code> then asks the pantry: <code>pantry.has_all(r.ingredients)</code>. Two short lines, one question each. The planner never looks inside the guest or the pantry. It only <b>asks</b> them, which was the plan in lesson 103.',
          '<b>Line up.</b> <code>sorted(candidates, key=lambda r: (-r.protein, r.name))</code> uses a tuple key (lesson 81). <code>-r.protein</code> puts the most protein first. <code>r.name</code> settles a tie by the alphabet, so two dishes with the same protein always come out in the same order. Press <b>Run</b>: Ana\'s seven dishes, from the chicken rice bowl with 40 g down to the rice pudding with 8 g.',
          'The last two lines are a first try at the picking: just the top 3, with a slice (lesson 33). Now change <code>guests[0]</code> to <code>guests[1]</code> and run it. Ben\'s line has 6 dishes, no chicken, and his top 3 are the tofu stir-fry, the pasta bake and the yogurt bowl. Try <code>guests[2]</code>: Chloe\'s line has 5 dishes, with no tofu stir-fry and no pasta bake.'
        ],
        tip: 'Why sort by name as well? A program that gives the same answer every time is much easier to test. Lesson 107 writes tests that say exactly which dishes Ana gets.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The top 3 for everyone promises the same tofu twice.',
        text: [
          'Wrap those lines in a function and you have a first <code>plan_day</code>: keep, line up, hand back the top 3. Press <b>Run</b>. Three good-looking plans print. Ana gets the tofu stir-fry. Ben gets the tofu stir-fry too.',
          'Then the box <b>cooks</b> the plan, with <code>pantry.take</code> for every dish. Ana\'s three dishes work. Ben\'s first one stops: <code>ValueError: not enough tofu: need 150 g, have 50 g</code>. The traceback names two files: line 29 of this box, which called <code>take</code>, and line 32 of <code>pantry.py</code>, where <code>take</code> raised the error. The jar held 200 g. Each plan was checked against the <b>full</b> pantry, as if each friend had a kitchen of their own. Together they need 300 g of tofu, and 160 g of berries from a 150 g jar.',
          'Lesson 105\'s <code>take</code> did its job: it refused, and it changed nothing. But the plan was already printed. Ben was told "tofu stir-fry" at breakfast, and at lunch there is no tofu. A plan that <b>checks</b> the pantry but does not <b>take</b> from it is only a wish list.',
          'There is a second, quieter problem. The top 3 never looks at <code>kcal_target</code>. Today every top 3 fits. Give a guest a smaller target and the slice would happily plan too much.'
        ],
        warn: 'Checking is not taking. If two guests are each checked against the same full jar, the jar is promised twice.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Take as you pick. One pantry for everyone.',
        text: [
          'Here is the real <code>planner.py</code>. The first three lines of <code>plan_day</code> are the keep and the line-up you ran. The slice is gone. In its place is a loop that walks down the line and asks three questions about each dish.',
          '<b>Is the day full?</b> <code>if len(meals) == max_meals: break</code> (line 15). Three meals, stop. <b>Is it still in the pantry?</b> (line 17). A dish this same guest picked a moment ago may have used the rice. Then <code>continue</code>: skip this one, look at the next. <b>Do the calories fit?</b> (line 19). If this dish would push the day over <code>kcal_target</code>, skip it too. Only a dish that passes all three is picked: <code>pantry.take(recipe.ingredients)</code> (line 21), then it joins <code>meals</code> and its kcal are added.',
          '<code>plan_all</code> is four lines. It calls <code>plan_day</code> for each guest in turn and hands the <b>same</b> <code>pantry</code> object to each call (line 33). Ana\'s picks change it before Ben\'s turn starts. Press <b>Run</b> on <b>plan.py</b>. Ben now gets the pasta bake, the yogurt bowl and the lentil soup. The tofu stir-fry never reached his line-up: 50 g is left and it needs 150 g. Chloe loses her yogurt bowl the same way, because Ben took 80 g of the 150 g of berries.',
          'So <b>the order matters</b>. Add <code>guests.reverse()</code> on the line before <code>plan_all</code> and run it again. Now Chloe plans first and keeps her yogurt bowl, Ben gets his tofu stir-fry, and Ana is the one who misses it.'
        ],
        tip: '<code>meals: list[Recipe] = []</code> on line 12 is a hint on a variable (lesson 90). An empty list gives mypy no clue what will go in it, so this one local variable gets a label. The def lines are split over three lines because that is how Ruff formats a long one (lesson 92).'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'A first cli.py: read, plan, print, save.',
        text: [
          'The planner decides. It does not print, and it does not open files. That is the job of <code>cli.py</code>, the piece that runs the day in order. This box is that file. <code>main()</code> is the plan from lesson 103, line for line: <b>read</b> the three files, <b>plan</b> with <code>plan_all</code>, <b>print</b> each plan with <code>show</code>, <b>save</b> the pantry for tomorrow.',
          '<code>show</code> adds up the kcal and the protein of the meals and prints them against the guest\'s goals. If the protein is under the target, it adds <code>short X g protein</code>. Press <b>Run</b>. Ana: 1610 / 2600 kcal, 86 / 100 g protein, <b>short 14 g</b>. Ben: 60 / 140 g, <b>short 80 g</b>. Chloe: 73 / 75 g, <b>short 2 g</b>.',
          'Your turn. Ben is the furthest from his goal, so let him go first. In <code>main</code>, right under the <code>guests = ...</code> line, add <code>guests = sorted(guests, key=lambda g: -g.protein_target)</code>. Run it. Ben gets his tofu stir-fry and is short 74 g, not 80. But Ana loses it and is now short 20 g, not 14. Ben gained 6 g and Ana lost 6 g. The order moved the gap. It did not close it.',
          'One more. Add <code>print((DATA / "pantry.json").read_text())</code> as the last line of <code>main</code>. The saved pantry prints, sorted by name: <code>"chicken": 0</code>, <code>"tofu": 50</code>. On a real computer that file is still there tomorrow morning, like in the terminal picture.'
        ],
        tip: 'In the real project these files are <code>src/kitchen_coach/planner.py</code> and <code>cli.py</code>, and the imports say <code>from kitchen_coach.models import ...</code> (lesson 94). <code>pyproject.toml</code> points the <code>kitchen-coach</code> command at <code>kitchen_coach.cli:main</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Greedy is simple. Everyone ends up short.',
        text: [
          '<b>Nobody reaches their protein goal.</b> Ana is 14 g short, Chloe 2 g, Ben 80 g. The printed plan says so, which is the honest thing to do. A plan that hid the gap would be worse.',
          '<b>Part of it is not the planner\'s fault.</b> Press <b>Run</b> on <b>all_for_ben.py</b>. It gives Ben the whole pantry, alone, and up to 7 meals. He gets all six vegetarian dishes and still stops at 107 g of 140. With these recipes, one serving each, no planner can get Ben there. He needs more high-protein recipes or second servings. Change <code>guests[1]</code> to <code>guests[0]</code>: Ana alone gets six dishes and 139 g, and the rice pudding is skipped by the kcal check, because 2560 + 300 is more than 2600.',
          '<b>Part of it is greedy.</b> It takes the best dish it sees and never looks back. It plans one guest completely before the next one starts, so the first guest gets the best of the pantry. It never asks "would Ana be fine with the yogurt bowl, so Ben can have the tofu?".',
          '<b>And it is simple in other ways.</b> <code>kcal_target</code> is only a ceiling: Ana runs half-marathons and gets 1610 of her 2600 kcal. Each recipe is used once per guest, in one serving. Nobody goes shopping, so on day 2 the chicken is gone and Chloe gets two meals.',
          'A better planner could let the friends <b>take turns</b>, one meal each. It could try <b>every set of 3 dishes</b> and keep the best. It could count kcal as a goal too, or print a shopping list. All of that can come later, <b>inside <code>plan_day</code> and <code>plan_all</code></b>, and <code>cli.py</code>, <code>models.py</code> and <code>pantry.py</code> would not change. First make it work and say what it does not do. Next lesson, <b>Taste-test Kitchen Coach</b>, pins this behaviour down with tests.'
        ],
        warn: 'Do not hide a weak result. <code>short 80 g protein</code> on Ben\'s line is the most useful thing this program prints.'
      }
    ],
    exercises: [
      {
        file: 'l106_planner.py', title: 'Write the planner',
        task: 'The file has <code>Recipe</code>, <code>Guest</code> and <code>Pantry</code> ready, with the real data. Two functions are still stubs. First <code>shortfall(guest, meals)</code>: how many grams of protein the guest is still missing, and <b>never below 0</b>. Then the real <code>plan_day(guest, recipes, pantry, max_meals=3)</code>: keep, line up, pick, take.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The hint says <code>shortfall</code> is still a stub.',
          'Between <code>START</code> and <code>END</code>, write <code>shortfall</code>: add up the protein of the meals and return the gap to <code>guest.protein_target</code>. If the guest is over the target, return 0.',
          'Write <code>plan_day</code>: the allowed recipes the pantry can make, sorted by most protein and then by name. Then a loop with <code>break</code> at <code>max_meals</code>, <code>continue</code> when the pantry no longer has the dish or the kcal would go over, and <code>pantry.take</code> for each dish you pick.',
          'Run it until it says <code>PASS</code>. The check plans Ana, Ben and Chloe from one pantry, and also tries small pantries and small kcal targets, so typed-in answers do not pass.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: 'Put the steps of <code>plan_day</code> for one guest in order.',
        items: [
          'Keep the recipes the guest allows and the pantry has every ingredient for',
          'Sort them: most protein first, then by name',
          'Walk down the line. Stop when there are 3 meals',
          'Skip a dish the pantry no longer has, or that would go over the kcal target',
          'Take the ingredients out of the pantry and add the dish to the plan'
        ],
        why: 'Keep, line up, pick, take. The keep step makes the line-up short. The sort decides who is asked first. Inside the loop every dish is checked again, and only a dish that passes is taken and added.',
        hint: 'You cannot sort the candidates before you know who they are, and you only take a dish after it passes every check.'
      },
      {
        type: 'pick', q: 'Kitchen Coach plans Ana, then Ben. Why is there no tofu stir-fry on Ben\'s plan?',
        pic: term(['$ kitchen-coach', 'Ana: chicken rice bowl, tofu stir-fry, pasta bake', '    1610 / 2600 kcal, 86 / 100 g protein, short 14 g protein', 'Ben: pasta bake, yogurt bowl, lentil soup', '    1180 / 2400 kcal, 60 / 140 g protein, short 80 g protein'], 'terminal'),
        options: [
          'Ana\'s plan took 150 g of the 200 g of tofu. 50 g is left, and the dish needs 150 g',
          'Ben is vegetarian, and tofu is not vegetarian',
          'The tofu stir-fry has too many kcal for Ben',
          'Each recipe can only be planned once in the whole day'
        ],
        answer: 0,
        why: 'The friends share <b>one</b> pantry, and <code>plan_day</code> takes the ingredients as it picks. When Ben\'s turn starts, <code>pantry.has_all</code> says no to the tofu stir-fry, so it never joins his line-up. The pasta bake is on both plans, so a recipe can be used by two guests when there is enough food.',
        hint: 'How much tofu is in the jar when Ben\'s turn starts?'
      },
      {
        type: 'fix', q: 'Ana and Ben are both promised the tofu stir-fry, and the jar still says 200 g. One line is missing from the loop. Fix <code>plan_day</code> so Ben gets <code>pasta bake, yogurt bowl, lentil soup</code> and <code>tofu left: 50 g</code>.',
        code: noTake, title: 'planner.py', files: BASE,
        check: [
          'lines = [l.strip() for l in out.splitlines()]',
          'want = ["Ana: chicken rice bowl, tofu stir-fry, pasta bake", "Ben: pasta bake, yogurt bowl, lentil soup", "tofu left: 50 g"]',
          'if lines == want:',
          '    ok = True',
          'elif len(lines) == 3 and lines[2] == "tofu left: 200 g":',
          '    msg = "The jar still says 200 g, so nothing left the pantry. Which Pantry method takes the ingredients out?"',
          'elif len(lines) > 1 and "tofu" in lines[1]:',
          '    msg = "Ben is still promised the tofu stir-fry. Take each dish inside the loop, when it is picked."',
          'else:',
          '    msg = "It should print: " + " / ".join(want) + ". Add one line before meals.append(recipe)."'
        ].join('\n'),
        why: 'Add <code>pantry.take(recipe.ingredients)</code> right before <code>meals.append(recipe)</code>. Now Ana\'s tofu stir-fry takes 150 g, and when Ben\'s turn comes the pantry says no. Without it, the plan only checks the pantry and never changes it.',
        hint: 'After the two continue checks the dish is picked. What must happen to its ingredients?'
      },
      {
        type: 'pick', q: 'A new guest, Dev, eats everything and has a <code>kcal_target</code> of <b>900</b>. The line-up starts: chicken rice bowl (650 kcal), tofu stir-fry (350), pasta bake (610), yogurt bowl (250), lentil soup (320). The pantry is full. What does <code>plan_day</code> give Dev?',
        pic: code(['        if kcal + recipe.kcal > guest.kcal_target:', '            continue  # too much food for today'], { title: 'planner.py, in the loop' }),
        options: [
          'chicken rice bowl, yogurt bowl',
          'chicken rice bowl',
          'chicken rice bowl, tofu stir-fry',
          'chicken rice bowl, tofu stir-fry, pasta bake'
        ],
        answer: 0,
        why: 'The chicken rice bowl fits: 650. The tofu stir-fry would make 1000, over 900, so <code>continue</code> skips it and the loop <b>goes on</b>. The pasta bake would make 1260: skipped. The yogurt bowl makes exactly 900, and <code>&gt;</code> is not true for 900, so it fits. Nothing else does. With <code>break</code> in place of <code>continue</code>, Dev would get only the chicken rice bowl.',
        hint: 'continue skips one dish and looks at the next. Add up the kcal dish by dish.'
      },
      {
        type: 'fix', q: 'Chloe plans first today and gets 78 g of protein, more than her 75 g goal. But her line says <code>short -3 g protein</code>. Fix <code>show</code> so "short" only appears when the protein is under the target.',
        code: shortBug, title: 'show.py',
        check: [
          'import io, contextlib',
          'def _said(*args):',
          '    buf = io.StringIO()',
          '    with contextlib.redirect_stdout(buf):',
          '        show(*args)',
          '    return buf.getvalue().strip()',
          'lines = [l.strip() for l in out.splitlines()]',
          'if lines[:2] != ["Ana: 86 / 100 g protein, short 14 g protein", "Chloe: 78 / 75 g protein"]:',
          '    msg = "It should print: Ana: 86 / 100 g protein, short 14 g protein, then Chloe: 78 / 75 g protein."',
          'elif _said("Ben", 140, 140) != "Ben: 140 / 140 g protein":',
          '    msg = "Close. A guest who is exactly on the target is not short: show(\\"Ben\\", 140, 140) should print Ben: 140 / 140 g protein."',
          'elif _said("Ben", 60, 140) != "Ben: 60 / 140 g protein, short 80 g protein":',
          '    msg = "Ana and Chloe are right, but show(\\"Ben\\", 60, 140) should print Ben: 60 / 140 g protein, short 80 g protein."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Put the "short" line under <code>if protein &lt; target:</code>. A guest who is over the goal, or exactly on it, is not short. The real <code>show</code> in <code>cli.py</code> does the same with <code>guest.protein_target</code>.',
        hint: 'Line 3 should only run when protein is less than target. Put an if above it and indent it.'
      },
      {
        type: 'pick', q: 'Back to lesson 81. Two new recipes both have 20 g of protein: <b>yogurt bowl</b> and <b>egg salad</b>. Which comes first in the line-up?',
        pic: code(['line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))'], { title: 'planner.py' }),
        options: [
          'egg salad: the first parts tie at -20, so the names decide, and "e" comes before "y"',
          'yogurt bowl: it was in the recipe file first',
          'yogurt bowl: sorted puts the longer name first',
          'It changes from run to run'
        ],
        answer: 0,
        why: 'Python compares tuples item by item. <code>(-20, "egg salad")</code> and <code>(-20, "yogurt bowl")</code> tie on the first item, so the second item decides: the alphabet. That is why the key has a name in it. The line-up is the same on every run.',
        hint: 'What is the second item in each key?'
      },
      {
        type: 'pick', q: 'Ben is short 80 g. Alone with the whole pantry and up to 7 meals, he gets all six vegetarian dishes and 107 g of his 140 g. What does that tell you?',
        options: [
          'A smarter planner alone cannot fix it. With these recipes, one serving each, 140 g is out of reach',
          'plan_day has a bug in the kcal check',
          'Ben should plan first, then he reaches 140 g',
          'The sort should be by kcal, not by protein'
        ],
        answer: 0,
        why: 'The six vegetarian dishes add up to 18 + 24 + 22 + 15 + 8 + 20 = 107 g. No order and no cleverer picking can go past that. Ben needs more high-protein recipes, or second servings. Knowing <b>which</b> part of a weak result comes from the code and which from the data saves you from "fixing" the wrong thing.',
        hint: 'Add up the protein of every dish Ben may eat.'
      },
      {
        type: 'fill', q: 'Finish the picking loop.',
        text: 'for recipe in line_up:\n    if len(meals) == max_meals:\n        ___\n    if not pantry.has_all(recipe.ingredients):\n        ___\n    if kcal + recipe.kcal > guest.kcal_target:\n        continue\n    pantry.___(recipe.ingredients)\n    meals.append(recipe)\n    kcal += recipe.kcal',
        options: ['break', 'continue', 'take', 'has_all', 'return', 'pass'],
        answer: ['break', 'continue', 'take'],
        why: 'A full day ends the loop: <code>break</code>. A dish the pantry no longer has is skipped, and the loop looks at the next one: <code>continue</code>. A dish that passes is taken out of the pantry with <code>take</code> before it joins the plan.',
        hint: 'One word stops the whole loop. One skips to the next dish. One removes the food.'
      }
    ]
  });
})();
