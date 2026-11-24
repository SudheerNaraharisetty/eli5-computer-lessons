/* Lesson 103: Plan Kitchen Coach (module 10, the first project lesson). One file per lesson.
   Every Run box was checked with Python 3.14.4 (Homebrew) and in this page (Pyodide, Python 3.14).
   Terminal pictures are real: Python 3.15.2 (Homebrew), macOS, a kitchen-coach project with
   pip install -e . in a venv, run on 2026-11-23. Paths are shortened to /Users/ana/kitchen-coach.
   Names, numbers and layout follow the shared module 10 spec (guests, recipes, pantry, modules). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l103  Plan Kitchen Coach
     ===================================================================== */

  // The three data files, exactly as the project keeps them in data/.
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
  // The pantry after Ben's change request: every item also gets a use-by date.
  const USE_BY = { rice: '2027-06-01', lentils: '2027-03-01', carrots: '2026-12-02', tofu: '2026-11-28', 'soy sauce': '2027-09-01', pasta: '2027-05-01', cheese: '2026-12-10', beans: '2027-04-01', tomatoes: '2026-11-30', chicken: '2026-11-26', milk: '2026-11-29', yogurt: '2026-12-01', berries: '2026-11-27' };
  const DATED = {};
  Object.keys(GRAMS).forEach(k => { DATED[k] = { grams: GRAMS[k], use_by: USE_BY[k] }; });
  const PANTRY_DATED = JSON.stringify(DATED, null, 2) + '\n';
  const DATA = { 'data/guests.json': GUESTS, 'data/recipes.json': RECIPES, 'data/pantry.json': PANTRY };
  const DATA_DATED = { 'data/guests.json': GUESTS, 'data/recipes.json': RECIPES, 'data/pantry.json': PANTRY_DATED };

  /* ---- The idea: who it is for, and what it must do ---- */
  const friend = (x, name, col, lines) =>
    box(x, 14, 184, 150, P.white, 14) +
    `<rect x="${x}" y="14" width="184" height="36" rx="14" fill="${col}"/><rect x="${x}" y="36" width="184" height="14" fill="${col}"/>` +
    `<rect x="${x}" y="14" width="184" height="150" rx="14" fill="none" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 92, 39, name, { s: 16, f: P.white }) +
    lines.map((l, i) => T(x + 16, 76 + i * 23, l, { s: 13, w: i === 3 ? 800 : 700, a: 'start', f: i === 3 ? col : P.ink2 })).join('');
  const must = ['read the guests, the recipes and the pantry', 'plan up to 3 meals for each friend', 'keep each friend\'s rules, aim for their goals', 'take the food out of the pantry', 'print the plan, and save the pantry'];
  const ideaSvg = svg(600, 400, 'Three friend cards. Ana runs half-marathons: 2600 kcal and 100 g protein a day, she eats everything. Ben lifts weights: 2400 kcal and 140 g protein a day, no meat. Chloe loves dessert: 2000 kcal and 75 g protein a day, no gluten. Below, what Kitchen Coach must do each morning: read the guests, the recipes and the pantry. Plan up to 3 meals for each friend. Keep each friend\'s rules and aim for their goals. Take the food out of the pantry. Print the plan, and save the pantry.',
    friend(12, 'Ana', P.accent, ['runs half-marathons', '2600 kcal a day', '100 g protein', 'eats everything']) +
    friend(208, 'Ben', P.ok, ['lifts weights', '2400 kcal a day', '140 g protein', 'no meat']) +
    friend(404, 'Chloe', P.danger, ['loves dessert', '2000 kcal a day', '75 g protein', 'no gluten']) +
    arrow(300, 176, 300, 206, P.ink2, 2.5) +
    box(12, 214, 576, 172, P.paper2, 14) +
    T(32, 242, 'So each morning, Kitchen Coach must:', { s: 15, a: 'start' }) +
    must.map((m, i) => `<circle cx="44" cy="${266 + i * 26}" r="10" fill="${P.ink}"/>` + T(44, 270 + i * 26, String(i + 1), { s: 11, f: P.white }) + T(64, 271 + i * 26, m, { s: 13.5, w: 700, a: 'start' })).join(''));
  const steps = [['Who is it for?', 'user stories'], ['What data?', 'pick a shape'], ['Which pieces?', 'one job each'], ['Steps in words', 'then stubs'], ['Smallest run', 'then grow it']];
  const stepsSvg = svg(600, 116, 'The five planning steps, in order. 1, who is it for: user stories. 2, what data: pick a shape for each. 3, which pieces: one job each. 4, the steps in words, then stubs. 5, the smallest version that runs, then grow it.',
    steps.map((s, i) => {
      const x = 8 + i * 118;
      return box(x, 14, 106, 86, i === 4 ? P.okT : P.white, 12) +
        `<circle cx="${x + 20}" cy="34" r="11" fill="${P.ink}"/>` + T(x + 20, 38, String(i + 1), { s: 11.5, f: P.white }) +
        T(x + 53, 66, s[0], { s: 12 }) + T(x + 53, 86, s[1], { s: 11.5, w: 700, f: P.ink2 }) +
        (i < 4 ? arrow(x + 106, 57, x + 118, 57, P.ink2, 2) : '');
    }).join(''));
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${stepsSvg}</div>`;

  /* ---- The code: the data, and a shape for each ---- */
  const shapeCol = (x, title, file, today, later, why, col) =>
    box(x, 14, 184, 232, P.white, 14) +
    `<rect x="${x}" y="14" width="12" height="232" rx="5" fill="${col}"/>` +
    T(x + 98, 44, title, { s: 17 }) +
    T(x + 98, 66, file, { s: 12, m: true, f: P.ink2 }) +
    `<rect x="${x + 22}" y="80" width="150" height="54" rx="9" fill="${P.sand}"/>` +
    T(x + 97, 100, 'today', { s: 11, f: P.ink2 }) + T(x + 97, 122, today, { s: 13, m: true }) +
    `<rect x="${x + 22}" y="142" width="150" height="54" rx="9" fill="${P.okT}"/>` +
    T(x + 97, 162, later[0], { s: 11, f: P.ok }) + T(x + 97, 184, later[1], { s: 13, m: true, f: P.ok }) +
    T(x + 97, 220, why[0], { s: 11.5, w: 700, f: P.ink2 }) + T(x + 97, 236, why[1], { s: 11.5, w: 700, f: P.ink2 });
  const shapesSvg = svg(600, 262, 'Three boxes of data. Guests, in data/guests.json: today a list of dicts, from lesson 104 a list of Guest dataclasses, because every guest has the same fields. Recipes, in data/recipes.json: today a list of dicts, from lesson 104 a list of Recipe dataclasses, because every recipe has the same fields plus its ingredients. The pantry, in data/pantry.json: a dict of name to grams, wrapped in a Pantry class in lesson 105, because you look things up by name and it changes every day.',
    shapeCol(12, 'Guests', 'data/guests.json', 'list of dicts', ['lesson 104', 'list[Guest]'], ['same fields for', 'every guest'], P.accent) +
    shapeCol(208, 'Recipes', 'data/recipes.json', 'list of dicts', ['lesson 104', 'list[Recipe]'], ['same fields, plus', 'its ingredients'], P.warn) +
    shapeCol(404, 'Pantry', 'data/pantry.json', 'dict: name → g', ['lesson 105', 'Pantry'], ['look up by name,', 'changes every day'], P.ok));
  const shapes = [
    'import json',
    'from pathlib import Path',
    '',
    'guests = json.loads(Path("data/guests.json").read_text())',
    'recipes = json.loads(Path("data/recipes.json").read_text())',
    'pantry = json.loads(Path("data/pantry.json").read_text())',
    '',
    'print(len(guests), "guests, a list of dicts")',
    'print(guests[1])',
    'print()',
    'print(len(recipes), "recipes, a list of dicts")',
    'print(recipes[0])',
    'print()',
    'print(len(pantry), "things in the pantry, a dict of name -> grams")',
    'print("rice:", pantry["rice"], "g")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${shapesSvg}${run(shapes, { title: 'shapes.py', files: DATA })}</div>`;

  /* ---- The pain: one big coach.py ---- */
  const sections = [['read the files', false], ['plan the meals', true], ['check the pantry', true], ['print the plan', true], ['save the pantry', true]];
  const painSvg = svg(600, 300, 'One file, coach.py, 300 lines, in five sections: read the files, plan the meals, check the pantry, print the plan, save the pantry. Four of the sections read the pantry themselves, with pantry[item]. On the right, the change: pantry.json used to say "rice": 1000, and now says "rice": {"grams": 1000, "use_by": ...}. Arrows from the change go to all four places. The printing part crashes with TypeError.',
    box(12, 14, 300, 272, P.white, 14) +
    T(32, 42, 'coach.py', { s: 15, m: true, a: 'start' }) + T(292, 42, '300 lines', { s: 12, a: 'end', f: P.ink2 }) +
    sections.map((s, i) => {
      const y = 56 + i * 44;
      return `<rect x="28" y="${y}" width="268" height="36" rx="8" fill="${i === 3 ? P.dangerT : P.sand}"/>` +
        T(40, y + 23, s[0], { s: 13, a: 'start' }) +
        (s[1] ? `<rect x="190" y="${y + 7}" width="96" height="22" rx="11" fill="${P.white}" stroke="${P.danger}" stroke-width="2"/>` + T(238, y + 22, 'pantry[item]', { s: 10.5, m: true, f: P.danger }) : '');
    }).join('') +
    box(370, 26, 218, 126, P.warnT, 14) +
    T(479, 52, 'Ben\'s change', { s: 14, f: P.warn }) +
    T(386, 82, '"rice": 1000', { s: 12.5, m: true, a: 'start', f: P.mute }) +
    `<line x1="386" y1="78" x2="482" y2="78" stroke="${P.mute}" stroke-width="2"/>` +
    T(386, 108, '"rice": {"grams": 1000,', { s: 12, m: true, a: 'start' }) +
    T(386, 128, '  "use_by": "2027-06-01"}', { s: 12, m: true, a: 'start' }) +
    [1, 2, 3, 4].map(i => `<path d="M370 ${100 + i * 4} C 330 ${100 + i * 4}, 330 ${74 + i * 44}, 290 ${74 + i * 44}" fill="none" stroke="${P.warn}" stroke-width="2" stroke-dasharray="5 4"/>`).join('') +
    box(352, 196, 236, 74, P.white, 14) +
    T(470, 222, 'TypeError, in the printing', { s: 13, f: P.danger }) +
    T(470, 244, 'Every part that reads the', { s: 12, w: 700, f: P.ink2 }) + T(470, 260, 'pantry must change.', { s: 12, w: 700, f: P.ink2 }));
  const tangled = [
    'import json',
    'from pathlib import Path',
    '',
    'guests = json.loads(Path("data/guests.json").read_text())',
    'recipes = json.loads(Path("data/recipes.json").read_text())',
    'pantry = json.loads(Path("data/pantry.json").read_text())',
    'print("Kitchen Coach: today\'s plan")',
    '',
    '# ... 140 lines of planning, saving and checking ...',
    '',
    'for guest in guests:  # the printing part',
    '    meals = []',
    '    for recipe in recipes:',
    '        if guest["vegetarian"] and not recipe["vegetarian"]:',
    '            continue',
    '        if guest["gluten_free"] and not recipe["gluten_free"]:',
    '            continue',
    '        enough = True',
    '        for item, grams in recipe["ingredients"].items():',
    '            if pantry.get(item, 0) < grams:  # reads the pantry itself',
    '                enough = False',
    '        if enough and len(meals) < 3:',
    '            meals.append(recipe["name"])',
    '    print(f"{guest[\'name\']}: {\', \'.join(meals)}")'
  ];
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(tangled, { title: 'coach.py', files: DATA_DATED })}</div>`;

  /* ---- The fix: pieces with one job, steps in words, then stubs ---- */
  const mod = (x, y, file, job, tag, col) =>
    box(x, y, 190, 82, P.white, 14) +
    `<rect x="${x}" y="${y}" width="12" height="82" rx="5" fill="${col}"/>` +
    T(x + 101, y + 30, file, { s: 15, m: true }) +
    T(x + 101, y + 52, job, { s: 12.5, w: 700, f: P.ink2 }) +
    T(x + 101, y + 71, tag, { s: 11, f: col });
  const modulesSvg = svg(600, 398, 'Four modules, each with one job. cli.py runs the day in order. planner.py picks the meals. models.py says what a guest and a recipe are. pantry.py looks after the pantry. Arrows mean uses: cli uses planner, models and pantry. planner uses models and pantry. Nothing uses cli. Only pantry.py looks inside the pantry.',
    mod(205, 14, 'cli.py', 'runs the day, in order', 'lessons 106 and 107', P.ink) +
    mod(205, 150, 'planner.py', 'picks the meals', 'lesson 106', P.warn) +
    mod(22, 290, 'models.py', 'what guests, recipes are', 'lesson 104', P.accent) +
    mod(388, 290, 'pantry.py', 'looks after the pantry', 'lesson 105', P.ok) +
    arrow(300, 100, 300, 146, P.ink, 2.5) +
    arrow(222, 100, 128, 286, P.ink2, 2) +
    arrow(378, 100, 472, 286, P.ink2, 2) +
    arrow(250, 236, 186, 286, P.ink, 2.5) +
    arrow(350, 236, 414, 286, P.ink, 2.5) +
    T(300, 270, 'arrow = uses', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 392, 'One sentence per file, no "and". Only pantry.py looks inside the pantry.', { s: 12.5, f: P.ink2 }));
  const layout = term([
    '$ tree kitchen-coach',
    'kitchen-coach/',
    '  pyproject.toml',
    '  data/guests.json, data/recipes.json, data/pantry.json',
    '  src/kitchen_coach/__init__.py',
    '  src/kitchen_coach/models.py     # Guest and Recipe',
    '  src/kitchen_coach/pantry.py     # load, check, take, save',
    '  src/kitchen_coach/planner.py    # plan_day, plan_all',
    '  src/kitchen_coach/cli.py        # main()',
    '  tests/'
  ], 'the project, the layout from lesson 94');
  const words = code([
    '# Each morning, Kitchen Coach:',
    '#   1. reads the guests, the recipes and the pantry',
    '#   2. for each guest, Ana, then Ben, then Chloe:',
    '#        picks up to 3 recipes the guest allows and the pantry has',
    '#        takes their ingredients out of the pantry',
    '#   3. prints each plan: meals, kcal and protein against the goal',
    '#   4. saves the pantry for tomorrow'
  ], { title: 'plan.txt: the steps in plain words (pseudocode)' });
  const stubs = code([
    '"""The planner: picks the meals."""',
    '',
    '',
    'def allows(guest, recipe):',
    '    """True if the guest may eat the recipe (vegetarian, gluten-free)."""',
    '    raise NotImplementedError("allows")',
    '',
    '',
    'def plan_day(guest, recipes, pantry, max_meals=3):',
    '    """Pick up to max_meals recipes for one guest, take them from the pantry."""',
    '    raise NotImplementedError("plan_day")'
  ], { title: 'src/kitchen_coach/planner.py: stubs', hi: [6, 11] });
  const stubRun = term([
    '$ kitchen-coach',
    'Traceback (most recent call last):',
    '  ...',
    '  File "/Users/ana/kitchen-coach/src/kitchen_coach/cli.py", line 12, in main',
    '    meals = plan_day(guest, recipes, pantry)',
    '  File "/Users/ana/kitchen-coach/src/kitchen_coach/planner.py", line 11, in plan_day',
    '    raise NotImplementedError("plan_day")',
    'NotImplementedError: plan_day'
  ], 'terminal, Python 3.15');
  const oneDoor = [
    'import json',
    'from pathlib import Path',
    '',
    '',
    '# ---- pantry.py: the ONLY code that knows how the pantry is stored',
    'def load_pantry(path):',
    '    """Read the pantry file."""',
    '    return json.loads(Path(path).read_text())',
    '',
    '',
    'def grams_of(pantry, item):',
    '    """How many grams of item we have. 0 if we have none."""',
    '    entry = pantry.get(item, {"grams": 0})',
    '    return entry["grams"]  # before the change: return pantry.get(item, 0)',
    '',
    '',
    'def has_all(pantry, ingredients):',
    '    """True if there is enough of every ingredient."""',
    '    for item, grams in ingredients.items():',
    '        if grams_of(pantry, item) < grams:',
    '            return False',
    '    return True',
    '',
    '',
    '# ---- planner.py and cli.py: they ask the pantry, never look inside',
    'pantry = load_pantry("data/pantry.json")',
    'print("lentil soup?", has_all(pantry, {"lentils": 80, "carrots": 100}))',
    'print("chicken rice bowl?", has_all(pantry, {"chicken": 150, "rice": 100}))',
    'print("a big chili?", has_all(pantry, {"beans": 450, "tomatoes": 200}))',
    'print("tofu left:", grams_of(pantry, "tofu"), "g")'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${modulesSvg}${layout}${words}${stubs}${stubRun}${run(oneDoor, { title: 'one_door.py', files: DATA_DATED })}</div>`;

  /* ---- Try it: the walking skeleton ---- */
  const skeleton = [
    'import json',
    'from pathlib import Path',
    '',
    '',
    '# ---- models.py: the shapes (dicts today, dataclasses in lesson 104)',
    'def load_list(path):',
    '    """Read a JSON file that holds a list of dicts."""',
    '    return json.loads(Path(path).read_text())',
    '',
    '',
    '# ---- pantry.py: what we have',
    'def load_pantry(path):',
    '    """Read the pantry: a dict of name -> grams."""',
    '    return json.loads(Path(path).read_text())',
    '',
    '',
    '# ---- planner.py: pick the meals',
    'def allows(guest, recipe):',
    '    """True if the guest may eat the recipe."""',
    '    if guest["vegetarian"] and not recipe["vegetarian"]:',
    '        return False',
    '    if guest["gluten_free"] and not recipe["gluten_free"]:',
    '        return False',
    '    return True',
    '',
    '',
    'def plan_day(guest, recipes, pantry):',
    '    """Skeleton: just the first recipe the guest allows."""',
    '    for recipe in recipes:',
    '        if allows(guest, recipe):',
    '            return [recipe]',
    '    return []',
    '',
    '',
    '# ---- cli.py: read, plan, print',
    'def show(guest, meals):',
    '    """Print one guest\'s plan."""',
    '    names = ", ".join([recipe["name"] for recipe in meals])',
    '    kcal = sum([recipe["kcal"] for recipe in meals])',
    '    print(f"{guest[\'name\']}: {names}  ({kcal} / {guest[\'kcal_target\']} kcal)")',
    '',
    '',
    'def main():',
    '    guests = load_list("data/guests.json")',
    '    recipes = load_list("data/recipes.json")',
    '    pantry = load_pantry("data/pantry.json")',
    '    for guest in guests:',
    '        show(guest, plan_day(guest, recipes, pantry))',
    '',
    '',
    'if __name__ == "__main__":',
    '    main()'
  ];
  const skelSvg = svg(600, 150, 'The walking skeleton as one thin line through all four pieces: read the three files, plan_day picks the first allowed recipe, show prints it. Every piece is tiny, but the line goes all the way from the data files to the printed plan: Ana, Ben and Chloe each get lentil soup.',
    [['data/*.json', P.sand], ['load_list', P.white], ['plan_day', P.white], ['show', P.white]].map((b, i) => {
      const x = 12 + i * 120;
      return box(x, 30, 104, 50, b[1], 12) + T(x + 52, 60, b[0], { s: 12.5, m: true });
    }).join('') +
    `<line x1="28" y1="96" x2="560" y2="96" stroke="${P.ok}" stroke-width="5" stroke-linecap="round"/>` +
    arrow(540, 96, 580, 96, P.ok, 5) +
    box(492, 18, 96, 66, P.okT, 12) + T(540, 42, 'Ana: soup', { s: 11, m: true }) + T(540, 58, 'Ben: soup', { s: 11, m: true }) + T(540, 74, 'Chloe: soup', { s: 11, m: true }) +
    T(300, 130, 'thin, silly, but it runs from the files all the way to the printed plan', { s: 12.5, f: P.ok }));
  const realRun = term([
    '$ python3 -m pip install -e .',
    '# ... Successfully installed kitchen-coach-0.1.0',
    '$ kitchen-coach',
    'Ana: lentil soup',
    'Ben: lentil soup',
    'Chloe: lentil soup'
  ], 'the same skeleton as four real files, terminal, Python 3.15');
  const tryPic = `<div style="width:100%;min-width:0">${skelSvg}${run(skeleton, { title: 'skeleton.py', files: DATA })}${realRun}</div>`;

  /* ---- The catch: grow a skeleton, and do not over-plan ---- */
  const lane = (y, title, col, cells) =>
    T(14, y + 4, title, { s: 13.5, a: 'start', f: col }) +
    cells.map((c, i) => {
      const x = 14 + i * 146;
      return `<rect x="${x}" y="${y + 16}" width="134" height="54" rx="9" fill="${c[2]}" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + 67, y + 37, c[0], { s: 11.5, w: 800, f: P.ink2 }) + T(x + 67, y + 57, c[1], { s: 12.5 });
    }).join('');
  const catchSvg = svg(600, 220, 'Two ways to build the same four days. Perfect pieces first: day 1 a polished models.py, day 2 a polished pantry.py, day 3 a polished planner.py, day 4 the first run, and the pieces do not fit. Walking skeleton first: day 1 it runs and prints a silly plan, day 2 the real allows, day 3 the real planner, day 4 tests. It runs every single day.',
    lane(18, 'Perfect pieces first', P.danger, [['day 1', 'perfect models', P.white], ['day 2', 'perfect pantry', P.white], ['day 3', 'perfect planner', P.white], ['day 4: first run', 'nothing fits', P.dangerT]]) +
    lane(118, 'Walking skeleton first', P.ok, [['day 1', 'runs: silly plan', P.okT], ['day 2', 'real allows()', P.okT], ['day 3', 'real planner', P.okT], ['day 4', 'taste tests', P.okT]]) +
    T(300, 214, 'Green: you can run it and see a plan.', { s: 12.5, f: P.ok }));

  COURSE.add({
    id: 'l103', minutes: 14,
    video: {
      src: 'videos/l103-plan-kitchen-coach.mp4', poster: 'videos/l103-plan-kitchen-coach.jpg', length: '1 min 10 s',
      script: [
        'Before you write Kitchen Coach, plan it. On a whiteboard.',
        'First, who is it for? Ana runs. She needs 2600 calories a day. Ben wants 140 grams of protein, and no meat. Chloe needs food with no gluten.',
        'So what must it do? Read the data. Plan 3 meals for each friend. Take the food from the pantry. Print the plan.',
        'Next, the data. Three boxes. Guests. Recipes. And the pantry.',
        'Then the pieces, each with one job. Models holds the shapes. Pantry looks after the food. Planner picks the meals. And the command line runs the day.',
        'Now build the smallest version that runs. A walking skeleton. Every piece does almost nothing, but one thin line goes all the way through. Read, plan, print.',
        'The first plan is silly. Lentil soup for everyone. That is fine. It runs. Now grow it, one piece at a time.',
        'Plan the shape first. Then make the smallest version that runs.'
      ]
    },
    summary: 'Before you write a real program, <b>plan its shape</b>. 1. <b>Who is it for</b>, in plain sentences: "Ben wants 140 g of protein a day and no meat." These are <b>user stories</b>, and they say what the program must do. 2. <b>What data</b>, and a shape for each: guests and recipes are lists of records (dicts today, dataclasses in lesson 104), the pantry is a dict of name to grams, and all three live in <b>JSON files</b> in <code>data/</code>. 3. <b>Which pieces</b>: small modules with <b>one job each</b>, <code>models.py</code>, <code>pantry.py</code>, <code>planner.py</code> and <code>cli.py</code>, so only <code>pantry.py</code> knows how the pantry is stored. One big 300-line <code>coach.py</code> breaks in the printing when the pantry changes. 4. The <b>steps in plain words</b> first (<b>pseudocode</b>), then as <b>stubs</b>: functions with a docstring that only <code>raise NotImplementedError</code> or hand back a placeholder. 5. The <b>walking skeleton</b>: the smallest version that runs from the files to the printed plan, even if the plan is silly. Then grow it one piece at a time. Do not plan a 20-line script like this.',
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Before a big dinner, you plan it.',
        text: [
          'Module 10 builds one real program from start to end: <b>Kitchen Coach</b>. Each morning it plans the day\'s meals for Ana, Ben and Chloe from what is in the pantry. It is bigger than anything so far, so you do what a cook does before a big dinner: <b>plan first</b>. Who is coming, what do they eat, what is in the cupboard, who cooks what.',
          'Start with <b>who it is for</b>, in plain sentences. "Ana runs half-marathons and needs about 2600 kcal a day." "Ben wants <b>140 g of protein</b> a day and <b>no meat</b>." "Chloe needs 2000 kcal and <b>no gluten</b>." Programmers call these <b>user stories</b>. Each one is about a real person, and you can check it: a plan for Ben with chicken in it is wrong.',
          'From the stories comes the list of what Kitchen Coach <b>must do</b>. Read the data, plan up to 3 meals each, keep the rules, take the food out of the pantry, print the plan, save the pantry. Anything not on the list, like a shopping list or a calorie chart, waits.',
          'Then four more steps, and this lesson does each one: <b>what data</b> and its shape, <b>which pieces</b> with one job each, the <b>steps in words</b> and then as stubs, and the <b>smallest version that runs</b>.'
        ],
        tip: 'A good user story names <b>a person</b>, <b>what they want</b>, and a number or rule you can check. "The app should be healthy" is not one: nobody can say if it is done.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'List the data, and pick a shape for each.',
        text: [
          'Kitchen Coach needs three kinds of data. <b>Guests</b>: name, kcal target, protein target, vegetarian, gluten-free. <b>Recipes</b>: name, kcal and protein per serving, the two rules, and the ingredients in grams. The <b>pantry</b>: how many grams of each thing you have.',
          'Pick a shape from what you know. Every guest has the <b>same fields</b>, and so does every recipe: that is a record, so a list of dicts today, and a <b>dataclass</b> (lesson 73) in lesson 104. The pantry is looked up <b>by name</b> and changes every day: a <b>dict</b> of name to grams (lesson 37), which lesson 105 wraps in a Pantry class. All three must still be there tomorrow, so they live in <b>JSON files</b> (lesson 59) in a <code>data/</code> folder.',
          'Press <b>Run</b>. The box reads the three files and shows one of each: 3 guests, 7 recipes, 13 things in the pantry. Change <code>guests[1]</code> to <code>guests[2]</code> to see Chloe, and <code>recipes[0]</code> to <code>recipes[4]</code> to find the one recipe that is not vegetarian.'
        ],
        tip: 'Look at the data <b>before</b> you write the planner. Seeing <code>"ingredients": {"lentils": 80, "carrots": 100}</code> tells you the pantry check must go through a dict of grams.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One 300-line coach.py: a pantry change breaks the printing.',
        text: [
          'The quick way is one big file. <code>coach.py</code> reads the files at the top, then plans, checks, prints and saves, all mixed together. At 30 lines that is fine. At 300 lines every part reaches into every other part. The printing loop picks the meals itself, and checks the pantry itself with <code>pantry.get(item, 0)</code>.',
          'Then a change arrives. Ben wants to know what goes off first, so the pantry file gets a <b>use-by date</b>: <code>"rice": 1000</code> becomes <code>"rice": {"grams": 1000, "use_by": "2027-06-01"}</code>. Press <b>Run</b>. The box already has the new pantry file.',
          'Python stops in <b>the printing part</b>: <code>TypeError: \'&lt;\' not supported between instances of \'dict\' and \'int\'</code>. You changed the pantry, and the printing broke. In the full file, four places read the pantry their own way. You fix this one, run it, and find the next one in the saving part. One crash at a time.'
        ],
        warn: 'When every part knows how the data is stored, one change to the data means a hunt through the whole file.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Small pieces with one job. Steps in words, then stubs.',
        text: [
          '<b>Split it into modules with one job each</b> (lesson 60\'s cookbooks, and lesson 49\'s test: one sentence, no "and"). <code>models.py</code> says what a guest and a recipe are. <code>pantry.py</code> looks after the pantry. <code>planner.py</code> picks the meals. <code>cli.py</code> runs the day in order. They sit in the <code>src/kitchen_coach/</code> layout from lesson 94, and the arrows only go one way: nothing imports <code>cli.py</code>.',
          'Now only <code>pantry.py</code> looks inside the pantry. Everyone else <b>asks</b> it: <code>has_all(pantry, ingredients)</code>. Press <b>Run</b> on <code>one_door.py</code>. It reads the same pantry file <b>with use-by dates</b> and works: for that change, <b>one line</b> in <code>grams_of</code> changed, and the planner and the printing never noticed.',
          '<b>Write the steps in plain words first.</b> That is <b>pseudocode</b>: no Python, just the order of things, in <code>plan.txt</code> or as comments. If a step is hard to say in words, it will be hard to code.',
          '<b>Then turn each step into a stub</b>: a function with its real name, its parameters and a docstring (lesson 48) that says its one job, but no body yet. The body is <code>raise NotImplementedError("plan_day")</code>. That is a built-in error that means "this card is not written yet", raised like any error from lesson 54. Run the program and it tells you exactly which card to write next.'
        ],
        tip: 'Placeholders are fine too: a stub can hand back something simple, like <code>return []</code>, so the program runs before the real body exists. That is the next step.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'The walking skeleton: the smallest version that runs.',
        text: [
          'Do not finish one piece perfectly before the next. First make the <b>whole line</b> run, from the data files to the printed plan, with every piece as simple as it can be. That is a <b>walking skeleton</b>: all the bones, no muscle yet, but it walks.',
          'This box is the skeleton in one file. Each <code># ----</code> part is one future module. <code>allows</code> is already real, and <code>plan_day</code> is a placeholder: it hands back only the <b>first</b> recipe the guest allows. Press <b>Run</b>. Ana, Ben and Chloe all get <b>lentil soup</b>, 320 kcal. A silly plan, but every piece talks to the next. On a real computer the same four files run with the <code>kitchen-coach</code> command.',
          'Now grow it, one piece at a time. Add protein to the printed line: in <code>show</code>, add <code>protein = sum([recipe["protein"] for recipe in meals])</code> and put <code>{protein} / {guest[\'protein_target\']} g protein</code> in the f-string. Run it: <code>18 / 140 g protein</code> for Ben. Only <code>show</code> changed. The exercise grows <code>plan_day</code> next.'
        ],
        tip: 'A silly first result is a good sign, not a bad one. "Lentil soup for everyone" proves the files load, the rules run, and the printing works. From now on every change is small, and you can run it after each one.'
      },
      {
        label: 'The catch', pic: catchSvg,
        h: 'Plan the shape, not every detail. And not for 20 lines.',
        text: [
          '<b>Do not over-plan a small script.</b> A 20-line file that renames this week\'s recipe photos does not need user stories, four modules and stubs. Write it, run it, done. Plan like this when a program will <b>grow</b>, will be used again tomorrow, or will be read by someone else.',
          '<b>The plan is a draft.</b> The skeleton will teach you things. Maybe <code>plan_day</code> needs the pantry, or Chloe\'s dessert needs a fourth meal. Change the plan when the code shows you something. Plan the shape: who, what data, which pieces. Not every line.',
          '<b>Do not polish one piece first.</b> A perfect <code>pantry.py</code> after three days, while nothing prints, is the big file\'s problem the other way round. You find out on day 4 that the pieces do not fit. A skeleton runs on day 1 and every day after.',
          'Next lesson, <b>The friends and their goals</b>, gives the guests and the recipes their real shape: <code>Guest</code> and <code>Recipe</code> dataclasses in <code>models.py</code>.'
        ],
        warn: 'Plan the shape first: who it is for, what data, which pieces. Then make the smallest version that runs, and grow it.'
      }
    ],
    exercises: [
      {
        file: 'l103_skeleton.py', title: 'Grow the walking skeleton',
        task: 'The file is a walking skeleton of Kitchen Coach, already wired from the data to the printed plan. Every function has a docstring with its one job. Two are still stubs. Write <code>allows(guest, recipe)</code>: no meat for a vegetarian guest, no gluten for a gluten-free guest. Then write a first simple <code>plan_day</code>: go through the recipes in order and keep the ones the guest allows, until there are 3.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. Everyone gets <code>(nothing yet)</code>, and the hint says <code>allows()</code> raised <code>NotImplementedError</code>: the stub is telling you what to write first.',
          'Between <code>START</code> and <code>END</code>, replace the <code>raise</code> line in <code>allows()</code> with two <code>if</code> checks, then <code>return True</code>.',
          'Replace the placeholder in <code>plan_day()</code>: an empty list, a <code>for</code> loop over <code>recipes</code>, <code>append</code> each recipe the guest allows, and stop at <code>max_meals</code>.',
          'Run it until it says <code>PASS</code>. Ben gets no chicken and Chloe gets no pasta or tofu. The check also tries other recipe lists, so typed-in answers do not pass.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: 'Put the planning steps for Kitchen Coach in order.',
        items: ['Write who it is for: "Ben wants 140 g of protein a day and no meat"', 'List the data and pick a shape: guests, recipes, pantry', 'Split it into pieces with one job: models, pantry, planner, cli', 'Write the steps in plain words, then as stubs', 'Make a walking skeleton that runs end to end', 'Grow it one piece at a time'],
        why: 'People first, because they decide what the program must do. The data comes from the stories, and the pieces come from the data. Then the steps, first in words and then as stubs. Then the smallest version that runs, and only then the real bodies.',
        hint: 'You cannot pick the pieces before you know the data, and you cannot know the data before you know who it is for.'
      },
      {
        type: 'bucket', q: 'Which module does each thing belong in?',
        buckets: ['models.py', 'pantry.py', 'planner.py', 'cli.py'],
        items: [
          ['the Guest dataclass', 0],
          ['the Recipe dataclass', 0],
          ['load_pantry(path)', 1],
          ['has_all(pantry, ingredients)', 1],
          ['allows(guest, recipe)', 2],
          ['plan_day(guest, recipes, pantry)', 2],
          ['main(): read, plan, print, save', 3]
        ],
        why: 'models says what things are. pantry is the only code that knows how the pantry is stored. planner makes the decisions. cli runs the steps in order and talks to the person at the keyboard.',
        hint: 'Ask of each one: is it a shape, the pantry, a decision, or the order of the day?'
      },
      {
        type: 'pick', q: 'Which one is a useful user story for Kitchen Coach?',
        options: ['Ben wants about 140 g of protein a day, with no meat in any meal', 'The app should be healthy and easy', 'Use a dict for the pantry', 'Kitchen Coach has 4 modules'],
        answer: 0,
        why: 'It names a person, what he wants, and a number and a rule you can check against a plan. "Healthy and easy" cannot be checked. The other two are decisions about code, not about what a person needs.',
        hint: 'Which one could you check against a printed plan?'
      },
      {
        type: 'match', q: 'Match each kind of data to the shape this lesson picked for it.',
        pairs: [
          ['the three friends', 'a list of records: dicts now, Guest dataclasses in lesson 104'],
          ['the pantry', 'a dict: name to grams'],
          ['one recipe\'s ingredients', 'a dict inside the recipe: {"lentils": 80, "carrots": 100}'],
          ['everything that must be there tomorrow', 'JSON files in data/']
        ],
        why: 'Same fields for every item: a record. Looked up by name: a dict. Must survive until tomorrow: a file, and JSON keeps the numbers as numbers (lesson 59).',
        hint: 'Is it many things with the same fields, or amounts looked up by name?'
      },
      {
        type: 'fix', q: 'This skeleton stops with <code>NotImplementedError: plan_day</code>. Turn the stub into a placeholder so it runs end to end: give each guest the <b>first</b> recipe they allow, as a list.',
        code: [
          'RECIPES = [',
          '    {"name": "chicken rice bowl", "vegetarian": False, "gluten_free": True},',
          '    {"name": "pasta bake", "vegetarian": True, "gluten_free": False},',
          '    {"name": "lentil soup", "vegetarian": True, "gluten_free": True},',
          ']',
          'GUESTS = [',
          '    {"name": "Ana", "vegetarian": False, "gluten_free": False},',
          '    {"name": "Ben", "vegetarian": True, "gluten_free": False},',
          '    {"name": "Chloe", "vegetarian": False, "gluten_free": True},',
          ']',
          '',
          '',
          'def allows(guest, recipe):',
          '    """True if the guest may eat the recipe."""',
          '    if guest["vegetarian"] and not recipe["vegetarian"]:',
          '        return False',
          '    if guest["gluten_free"] and not recipe["gluten_free"]:',
          '        return False',
          '    return True',
          '',
          '',
          'def plan_day(guest, recipes):',
          '    """Skeleton: the first recipe the guest allows, in a list."""',
          '    raise NotImplementedError("plan_day")',
          '',
          '',
          'for guest in GUESTS:',
          '    meals = plan_day(guest, RECIPES)',
          '    print(guest["name"] + ":", ", ".join([r["name"] for r in meals]))'
        ],
        title: 'skeleton.py',
        check: [
          'want = ["Ana: chicken rice bowl", "Ben: pasta bake", "Chloe: chicken rice bowl"]',
          'lines = [l.strip() for l in out.splitlines()]',
          'if lines == want:',
          '    ok = True',
          'elif any(l.endswith(":") for l in lines):',
          '    msg = "It runs, but someone gets an empty plan. Return a list with the first recipe allows() says yes to."',
          'else:',
          '    msg = "Each guest should get the first recipe they allow: " + " / ".join(want) + "."'
        ].join('\n'),
        why: 'Loop over the recipes and <code>return [recipe]</code> for the first one <code>allows()</code> says yes to, and <code>return []</code> after the loop. Now the whole line runs: Ana and Chloe get the chicken rice bowl, and vegetarian Ben skips it and gets pasta bake. Silly, but it runs.',
        hint: 'Inside plan_day: for recipe in recipes:, then if allows(guest, recipe): return [recipe]. Put return [] after the loop.'
      },
      {
        type: 'fix', q: 'Chloe is gluten-free, but she is offered <b>tofu stir-fry</b> and <b>pasta bake</b>, and not the chicken. The second check was copied from the first. Fix <code>allows</code>.',
        code: [
          'RECIPES = [',
          '    {"name": "lentil soup", "vegetarian": True, "gluten_free": True},',
          '    {"name": "tofu stir-fry", "vegetarian": True, "gluten_free": False},',
          '    {"name": "pasta bake", "vegetarian": True, "gluten_free": False},',
          '    {"name": "chicken rice bowl", "vegetarian": False, "gluten_free": True},',
          ']',
          'chloe = {"name": "Chloe", "vegetarian": False, "gluten_free": True}',
          'ben = {"name": "Ben", "vegetarian": True, "gluten_free": False}',
          '',
          '',
          'def allows(guest, recipe):',
          '    """True if the guest may eat the recipe."""',
          '    if guest["vegetarian"] and not recipe["vegetarian"]:',
          '        return False',
          '    if guest["gluten_free"] and not recipe["vegetarian"]:',
          '        return False',
          '    return True',
          '',
          '',
          'for guest in [chloe, ben]:',
          '    allowed = [r["name"] for r in RECIPES if allows(guest, r)]',
          '    print(guest["name"] + ":", ", ".join(allowed))'
        ],
        title: 'rules.py',
        check: [
          'lines = [l.strip() for l in out.splitlines()]',
          'want = ["Chloe: lentil soup, chicken rice bowl", "Ben: lentil soup, tofu stir-fry, pasta bake"]',
          'if lines == want:',
          '    ok = True',
          'elif lines and ("tofu" in lines[0] or "pasta" in lines[0]):',
          '    msg = "Chloe still gets gluten. The second check must look at the recipe\'s gluten_free, not vegetarian."',
          'else:',
          '    msg = "It should print: " + " / ".join(want) + ". Change only the second if line."'
        ].join('\n'),
        why: 'The second <code>if</code> must ask about gluten: <code>if guest["gluten_free"] and not recipe["gluten_free"]:</code>. A copied line that still says <code>vegetarian</code> runs without an error and quietly gives the wrong plan. That is why lesson 107 adds taste tests for rules like this.',
        hint: 'Read line 15 out loud. Which word should be there instead of vegetarian?'
      },
      {
        type: 'pick', q: 'Back to lesson 49. Which function should be split into smaller ones?',
        pic: code(['def read_plan_and_print(path):', '    """Read the files and plan the meals and print them and save the pantry."""', '    ...', '', 'def has_all(pantry, ingredients):', '    """True if there is enough of every ingredient."""', '    ...'], { title: 'coach.py' }),
        options: ['read_plan_and_print: its one sentence needs "and" three times', 'has_all: it uses a loop', 'Both: every function should have one line', 'Neither: docstrings make any size fine'],
        answer: 0,
        why: 'Lesson 49\'s test: describe the function in one sentence. If you need "and", split it. read_plan_and_print does four jobs, which is the start of a 300-line coach.py. has_all does one: it answers one yes-or-no question.',
        hint: 'Count the jobs in each docstring.'
      },
      {
        type: 'pick', q: 'Which of these does <b>not</b> need user stories, four modules and stubs?',
        options: ['A 20-line script you run once to rename this week\'s recipe photos', 'Kitchen Coach, which Ana, Ben and Chloe use every morning', 'A meal planner a friend will add a shopping list to next month', 'A program three people will change and read'],
        answer: 0,
        why: 'Planning pays off when a program grows, lives on, or is shared. A small one-off script is quicker to write and run. If it later grows, plan it then.',
        hint: 'Which one will never grow and nobody else will read?'
      }
    ]
  });
})();
