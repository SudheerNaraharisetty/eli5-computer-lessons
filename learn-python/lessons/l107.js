/* Lesson 107: Taste-test Kitchen Coach (module 10). One file per lesson.
   Everything here was run in a real kitchen-coach project (the layout from lessons 94 and 103, models.py from
   lesson 104, pantry.py from lesson 105, planner.py and cli.py from lesson 106) on 2026-11-25:
   Python 3.15.2 (Homebrew, macOS), pip 26.2.2, pytest 9.2.0, mypy 2.4.1, Ruff 0.17.6, in a venv with pip install -e .
   Terminal pictures are that real output. Only the rootdir path was shortened to /Users/you/kitchen-coach, the long
   ==== and ____ rules and the padding before [ 27%] were shortened, and pip's download lines were left out.
   Ruff 0.17's default rules include SIM103 and F401. E501 comes with extend-select = ["E"].
   The Run boxes were checked with Python 3.14.4 and in this page (Pyodide, Python 3.14). pytest, mypy and Ruff are
   not in Pyodide: the Run boxes call the test functions by hand (as lesson 89 did) and bring a small stand-in for
   pytest.raises, so the test files are word for word the real ones. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l107  Taste-test Kitchen Coach
     ===================================================================== */

  /* ---- the project's three modules, exactly as lessons 104, 105 and 106 wrote them ---- */
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
  const TAKE_GOOD = [
    '        for name, need in ingredients.items():  # 1. check them all',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
    '        for name, need in ingredients.items():  # 2. then take',
    '            self.grams[name] = self[name] - need'
  ];
  const TAKE_BEN = [
    '        for name, need in ingredients.items():',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
    '            self.grams[name] = have - need'
  ];
  const PANTRY = [
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
    '        """Take every ingredient out, or nothing at all."""'
  ].concat(TAKE_GOOD, [
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
  ]);
  const PLANNER = [
    'from kitchen_coach.models import Guest, Recipe',
    'from kitchen_coach.pantry import Pantry',
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

  /* ---- the tests folder, exactly as in the project (after ruff format) ---- */
  const MENU = [
    '"""The test kitchen: the three friends, the menu, and a fresh full pantry."""',
    '',
    'from kitchen_coach.models import Guest, Recipe',
    'from kitchen_coach.pantry import Pantry',
    '',
    'ANA = Guest("Ana", 2600, 100)',
    'BEN = Guest("Ben", 2400, 140, vegetarian=True)',
    'CHLOE = Guest("Chloe", 2000, 75, gluten_free=True)',
    '',
    'RECIPES = [',
    '    Recipe("lentil soup", 320, 18, True, True, {"lentils": 80, "carrots": 100}),',
    '    Recipe(',
    '        "tofu stir-fry",',
    '        350,',
    '        24,',
    '        True,',
    '        False,',
    '        {"tofu": 150, "rice": 75, "soy sauce": 15},',
    '    ),',
    '    Recipe("pasta bake", 610, 22, True, False, {"pasta": 100, "cheese": 40}),',
    '    Recipe("bean chili", 380, 15, True, True, {"beans": 150, "tomatoes": 200}),',
    '    Recipe("chicken rice bowl", 650, 40, False, True, {"chicken": 150, "rice": 100}),',
    '    Recipe("rice pudding", 300, 8, True, True, {"rice": 50, "milk": 200}),',
    '    Recipe("yogurt bowl", 250, 20, True, True, {"yogurt": 200, "berries": 80}),',
    ']',
    'BY_NAME = {recipe.name: recipe for recipe in RECIPES}',
    '',
    '',
    'def full_pantry() -> Pantry:',
    '    """A NEW full pantry every time it is called."""',
    '    return Pantry(',
    '        {',
    '            "rice": 1000,',
    '            "lentils": 400,',
    '            "carrots": 500,',
    '            "tofu": 200,',
    '            "soy sauce": 100,',
    '            "pasta": 500,',
    '            "cheese": 200,',
    '            "beans": 300,',
    '            "tomatoes": 400,',
    '            "chicken": 300,',
    '            "milk": 1000,',
    '            "yogurt": 400,',
    '            "berries": 150,',
    '        }',
    '    )'
  ];
  const T_MODELS = [
    'from menu import ANA, BEN, BY_NAME, CHLOE, RECIPES',
    '',
    '',
    'def test_ben_is_not_allowed_chicken_rice_bowl():',
    '    assert not BEN.allows(BY_NAME["chicken rice bowl"])',
    '',
    '',
    'def test_chloe_is_not_allowed_pasta_bake():',
    '    assert not CHLOE.allows(BY_NAME["pasta bake"])',
    '',
    '',
    'def test_ana_is_allowed_every_recipe():',
    '    for recipe in RECIPES:',
    '        assert ANA.allows(recipe)'
  ];
  const T_PANTRY = [
    'import pytest',
    'from menu import full_pantry',
    '',
    'from kitchen_coach.pantry import load_pantry, save_pantry',
    '',
    'STIR_FRY = {"tofu": 150, "rice": 75, "soy sauce": 15}',
    'THREE_BOWLS = {"rice": 300, "chicken": 450}',
    '',
    '',
    'def test_take_subtracts_the_grams():',
    '    pantry = full_pantry()',
    '    pantry.take(STIR_FRY)',
    '    assert pantry["tofu"] == 50',
    '    assert pantry["rice"] == 925',
    '    assert pantry["soy sauce"] == 85',
    '',
    '',
    'def test_failed_take_changes_nothing():',
    '    pantry = full_pantry()',
    '    with pytest.raises(ValueError):',
    '        pantry.take(THREE_BOWLS)',
    '    assert pantry["rice"] == 1000',
    '    assert pantry["chicken"] == 300',
    '',
    '',
    'def test_missing_file_gives_an_empty_pantry(tmp_path):',
    '    pantry = load_pantry(tmp_path / "pantry.json")',
    '    assert len(pantry) == 0',
    '',
    '',
    'def test_save_then_load_gives_the_same_pantry(tmp_path):',
    '    pantry = full_pantry()',
    '    pantry.take(STIR_FRY)',
    '    save_pantry(pantry, tmp_path / "pantry.json")',
    '    again = load_pantry(tmp_path / "pantry.json")',
    '    assert len(again) == 13',
    '    assert again["tofu"] == 50',
    '    assert again["rice"] == 925'
  ];
  const T_PLANNER = [
    'from menu import ANA, BEN, CHLOE, RECIPES, full_pantry',
    '',
    'from kitchen_coach.models import Guest',
    'from kitchen_coach.planner import plan_all, plan_day',
    '',
    '',
    'def names(meals):',
    '    return [recipe.name for recipe in meals]',
    '',
    '',
    'def test_ana_plan():',
    '    meals = plan_day(ANA, RECIPES, full_pantry())',
    '    assert names(meals) == ["chicken rice bowl", "tofu stir-fry", "pasta bake"]',
    '    assert sum([recipe.kcal for recipe in meals]) == 1610',
    '',
    '',
    'def test_plan_never_goes_over_the_kcal_target():',
    '    rest_day = Guest("Ana on a rest day", 900, 50)',
    '    meals = plan_day(rest_day, RECIPES, full_pantry())',
    '    assert sum([recipe.kcal for recipe in meals]) <= 900',
    '',
    '',
    'def test_ben_gets_no_tofu_stir_fry_after_ana():',
    '    plans = plan_all([ANA, BEN, CHLOE], RECIPES, full_pantry())',
    '    assert "tofu stir-fry" not in names(plans["Ben"])',
    '',
    '',
    'def test_everyone_shares_one_pantry():',
    '    pantry = full_pantry()',
    '    plan_all([ANA, BEN, CHLOE], RECIPES, pantry)',
    '    assert pantry["chicken"] == 0',
    '    assert pantry["tofu"] == 50'
  ];
  // This page has no pytest. Run boxes that say "import pytest" get this small stand-in for pytest.raises.
  const STANDIN = [
    '"""A small stand-in for pytest.raises. This page has no pytest."""',
    '',
    '',
    'class raises:',
    '    def __init__(self, kind):',
    '        self.kind = kind',
    '',
    '    def __enter__(self):',
    '        return self',
    '',
    '    def __exit__(self, error_type, error, traceback):',
    '        if error_type is None:',
    '            raise AssertionError(f"DID NOT RAISE {self.kind.__name__}")',
    '        return issubclass(error_type, self.kind)'
  ];
  const text = lines => lines.join('\n') + '\n';
  const PANTRY_PY = text(PANTRY);
  const PANTRY_BEN = PANTRY_PY.replace(text(TAKE_GOOD), text(TAKE_BEN));
  const PLANNER_PY = text(PLANNER);
  const PLANNER_NONE = PLANNER_PY.replace('    meals: list[Recipe] = []\n', '    if not line_up:\n        return None  # nothing to cook today\n    meals: list[Recipe] = []\n');
  const project = (pantryPy, plannerPy) => ({
    'kitchen_coach/__init__.py': '"""Kitchen Coach: today\'s meal plan for Ana, Ben and Chloe."""\n',
    'kitchen_coach/models.py': text(MODELS),
    'kitchen_coach/pantry.py': pantryPy || PANTRY_PY,
    'kitchen_coach/planner.py': plannerPy || PLANNER_PY,
    'menu.py': text(MENU),
    'pytest.py': text(STANDIN)
  });
  const stack = (...pics) => `<div style="width:100%;min-width:0">${pics.join('')}</div>`;
  const gap = '<div style="height:14px"></div>';

  /* ---- The idea: three pots, three tools ---- */
  const tick = (cx, cy, col) => `<path d="M${cx - 11} ${cy} l8 9 l15 -18" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pot = (x, name, count) =>
    `<circle cx="${x + 70}" cy="42" r="21" fill="${P.okT}" stroke="${P.ok}" stroke-width="2.5"/>` + tick(x + 70, 42, P.ok) +
    `<rect x="${x - 16}" y="104" width="20" height="18" rx="6" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 136}" y="104" width="20" height="18" rx="6" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 4}" y="88" width="140" height="80" rx="16" fill="${P.ink}"/>` +
    `<rect x="${x}" y="84" width="140" height="80" rx="16" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x - 8}" y="76" width="156" height="16" rx="8" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 70, 124, name, { s: 13.5, m: true }) + T(x + 70, 148, count, { s: 12.5, w: 700, f: P.ok });
  const tool = (x, name, job, q1, q2, col, colT) =>
    box(x, 208, 184, 104, colT, 12) +
    T(x + 92, 236, name, { s: 16, m: true, f: col }) + T(x + 92, 258, job, { s: 12.5, f: P.ink }) +
    T(x + 92, 280, q1, { s: 11.5, w: 700, f: P.ink2 }) + T(x + 92, 296, q2, { s: 11.5, w: 700, f: P.ink2 });
  const ideaSvg = svg(600, 326, 'Three pots on the stove, one for each module of Kitchen Coach: models.py with 3 tests, pantry.py with 4 tests and planner.py with 4 tests. Each pot has a green tick above it: 11 taste tests passed. Below, the three tools from module 8. pytest tastes: does the code give the right answer? mypy reads the labels: does every value match its type hint? Ruff tidies: is the layout clean, and is anything left lying around?',
    T(300, 16, 'python3 -m pytest  →  11 passed', { s: 14, m: true, f: P.ok }) +
    pot(42, 'models.py', '3 tests') + pot(230, 'pantry.py', '4 tests') + pot(418, 'planner.py', '4 tests') +
    `<rect x="14" y="170" width="572" height="8" rx="3" fill="${P.ink}"/>` +
    tool(12, 'pytest', 'tastes', 'does it give the', 'right answer?', P.ok, P.okT) +
    tool(208, 'mypy', 'reads the labels', 'does every value', 'match its hint?', P.accent, P.tint) +
    tool(404, 'ruff', 'tidies the counter', 'clean layout,', 'nothing left over?', P.warn, P.warnT));
  const modelsByHand = T_MODELS.concat([
    '',
    '',
    '# pytest does the next 4 lines for you. This page has no pytest,',
    '# so here we call the taste tests by hand, as in lesson 89.',
    'test_ben_is_not_allowed_chicken_rice_bowl()',
    'test_chloe_is_not_allowed_pasta_bake()',
    'test_ana_is_allowed_every_recipe()',
    'print("3 model tests passed")'
  ]);
  const ideaPic = stack(ideaSvg, run(modelsByHand, { title: 'tests/test_models.py', files: project() }));

  /* ---- The code: the tests folder ---- */
  const tree = term([
    'kitchen-coach/',
    '  pyproject.toml',
    '  data/guests.json, data/recipes.json, data/pantry.json',
    '  src/kitchen_coach/     # models.py, pantry.py, planner.py, cli.py',
    '  tests/',
    '    menu.py              # the test kitchen: friends, menu, a full pantry',
    '    test_models.py       # 3 taste tests',
    '    test_pantry.py       # 4 taste tests',
    '    test_planner.py      # 4 taste tests'
  ], 'the project, now with a tests folder');
  const pantryByHand = T_PANTRY.concat([
    '',
    '',
    '# pytest does this part for you, and hands each test a new tmp_path.',
    '# Here we call the tests by hand, with this box\'s own empty folder.',
    'from pathlib import Path',
    '',
    'folder = Path(".")',
    'test_take_subtracts_the_grams()',
    'test_failed_take_changes_nothing()',
    'test_missing_file_gives_an_empty_pantry(folder)',
    'test_save_then_load_gives_the_same_pantry(folder)',
    'print("4 pantry tests passed")'
  ]);
  const plannerByHand = T_PLANNER.concat([
    '',
    '',
    '# by hand again, for this page only',
    'test_ana_plan()',
    'test_plan_never_goes_over_the_kcal_target()',
    'test_ben_gets_no_tofu_stir_fry_after_ana()',
    'test_everyone_shares_one_pantry()',
    'print("4 planner tests passed")'
  ]);
  const passRun = term([
    '# in kitchen-coach, with the project\'s .venv switched on (lesson 91)',
    '$ python3 -m pip install pytest mypy ruff',
    '# ... pip downloads them. This lesson used pytest 9.2.0, mypy 2.4.1 and Ruff 0.17.6',
    '$ python3 -m pytest',
    '=== test session starts ===',
    'platform darwin -- Python 3.15.2, pytest-9.2.0, pluggy-1.7.0',
    'rootdir: /Users/you/kitchen-coach',
    'configfile: pyproject.toml',
    'collected 11 items',
    ' ',
    'tests/test_models.py ...  [ 27%]',
    'tests/test_pantry.py ....  [ 63%]',
    'tests/test_planner.py ....  [100%]',
    ' ',
    '=== 11 passed in 0.01s ==='
  ], 'terminal, Python 3.15: every taste test in the project');
  const verbose = term([
    '$ python3 -m pytest -v',
    '# ... the same header lines ...',
    'tests/test_models.py::test_ben_is_not_allowed_chicken_rice_bowl PASSED  [  9%]',
    'tests/test_models.py::test_chloe_is_not_allowed_pasta_bake PASSED  [ 18%]',
    'tests/test_models.py::test_ana_is_allowed_every_recipe PASSED  [ 27%]',
    'tests/test_pantry.py::test_take_subtracts_the_grams PASSED  [ 36%]',
    'tests/test_pantry.py::test_failed_take_changes_nothing PASSED  [ 45%]',
    'tests/test_pantry.py::test_missing_file_gives_an_empty_pantry PASSED  [ 54%]',
    'tests/test_pantry.py::test_save_then_load_gives_the_same_pantry PASSED  [ 63%]',
    'tests/test_planner.py::test_ana_plan PASSED  [ 72%]',
    'tests/test_planner.py::test_plan_never_goes_over_the_kcal_target PASSED  [ 81%]',
    'tests/test_planner.py::test_ben_gets_no_tofu_stir_fry_after_ana PASSED  [ 90%]',
    'tests/test_planner.py::test_everyone_shares_one_pantry PASSED  [100%]',
    ' ',
    '=== 11 passed in 0.01s ==='
  ], 'terminal: -v reads like the rule book of Kitchen Coach');
  const codePic = stack(tree, code(MENU, { title: 'tests/menu.py', hi: [26, 29, 31] }),
    run(pantryByHand, { title: 'tests/test_pantry.py', files: project() }),
    run(plannerByHand, { title: 'tests/test_planner.py', files: project() }),
    passRun, verbose);

  /* ---- The pain: Ben tidies take() into one loop ---- */
  const takeBefore = code(['    def take(self, ingredients: dict[str, int]) -> None:', '        """Take every ingredient out, or nothing at all."""'].concat(TAKE_GOOD), { title: 'pantry.py, lesson 105: check them all, then take', good: [3, 7] });
  const takeAfter = code(['    def take(self, ingredients: dict[str, int]) -> None:', '        """Take every ingredient out, or nothing at all."""'].concat(TAKE_BEN), { title: 'pantry.py, after Ben\'s tidy-up: one loop', bad: [7] });
  const today = [
    'from menu import ANA, BEN, CHLOE, RECIPES, full_pantry',
    '',
    'from kitchen_coach.planner import plan_all',
    '',
    '# pantry.py has Ben\'s one-loop take() today',
    'pantry = full_pantry()',
    'plans = plan_all([ANA, BEN, CHLOE], RECIPES, pantry)',
    'for name, meals in plans.items():',
    '    print(f"{name}: " + ", ".join([recipe.name for recipe in meals]))',
    'print("rice left:", pantry["rice"], "g")'
  ];
  const failRun = term([
    '$ python3 -m pytest',
    '# ... the same header lines ...',
    'tests/test_models.py ...  [ 27%]',
    'tests/test_pantry.py .F..  [ 63%]',
    'tests/test_planner.py ....  [100%]',
    ' ',
    '=== FAILURES ===',
    '___ test_failed_take_changes_nothing ___',
    ' ',
    '    def test_failed_take_changes_nothing():',
    '        pantry = full_pantry()',
    '        with pytest.raises(ValueError):',
    '            pantry.take(THREE_BOWLS)',
    '>       assert pantry["rice"] == 1000',
    'E       assert 700 == 1000',
    ' ',
    'tests/test_pantry.py:22: AssertionError',
    '=== short test summary info ===',
    'FAILED tests/test_pantry.py::test_failed_take_changes_nothing - assert 700 == 1000',
    '=== 1 failed, 10 passed in 0.07s ==='
  ], 'terminal: the taste tests, after Ben\'s tidy-up');
  const jar = (x, label, grams, col, colT, note) =>
    `<rect x="${x + 26}" y="26" width="68" height="14" rx="4" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x}" y="42" width="120" height="78" rx="14" fill="${colT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 60, 72, label, { s: 13, m: true, f: P.ink2 }) + T(x + 60, 100, grams, { s: 18, f: col }) +
    T(x + 60, 142, note, { s: 12, w: 700, f: col });
  const halfSvg = svg(600, 156, 'Three bowls are refused: they need 450 g of chicken and there are 300 g. With the one-loop take, the rice jar has already dropped from 1000 g to 700 g. The chicken jar still says 300 g. No bowls were cooked, and 300 g of rice is gone. The test expects 1000.',
    T(20, 16, 'take({"rice": 300, "chicken": 450})  →  ValueError', { s: 12.5, m: true, a: 'start', f: P.danger }) +
    jar(30, 'rice', '700 g', P.danger, P.dangerT, 'the test expects 1000') +
    jar(230, 'chicken', '300 g', P.ok, P.okT, 'unchanged') +
    T(480, 66, 'No bowls cooked.', { s: 13.5, f: P.ink }) + T(480, 88, '300 g of rice', { s: 13.5, f: P.danger }) + T(480, 108, 'is gone anyway.', { s: 13.5, f: P.danger }));
  const painPic = stack(takeBefore, gap, takeAfter, run(today, { title: 'today.py', files: project(PANTRY_BEN) }), failRun, halfSvg);

  /* ---- The fix: put the two loops back ---- */
  const fixBox = [
    'import pytest',
    '',
    '',
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = dict(grams)',
    '',
    '    def __getitem__(self, name):',
    '        return self.grams.get(name, 0)',
    '',
    '    def take(self, ingredients):',
    '        for name, need in ingredients.items():',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}: need {need} g, have {have} g")',
    '            self.grams[name] = have - need',
    '',
    '',
    'def test_failed_take_changes_nothing():',
    '    pantry = Pantry({"rice": 1000, "chicken": 300})',
    '    with pytest.raises(ValueError):',
    '        pantry.take({"rice": 300, "chicken": 450})',
    '    assert pantry["rice"] == 1000',
    '    assert pantry["chicken"] == 300',
    '',
    '',
    'test_failed_take_changes_nothing()',
    'print("taste test passed: a failed take changes nothing")'
  ];
  const greenRun = term([
    '# pantry.py: two loops again, with the two comments',
    '$ python3 -m pytest',
    '# ... the same header lines ...',
    'tests/test_models.py ...  [ 27%]',
    'tests/test_pantry.py ....  [ 63%]',
    'tests/test_planner.py ....  [100%]',
    ' ',
    '=== 11 passed in 0.01s ==='
  ], 'terminal: all green again');
  const fixPic = stack(run(fixBox, { title: 'take_fix.py', files: { 'pytest.py': text(STANDIN) } }), greenRun);

  /* ---- Try it: mypy, then Ruff ---- */
  const mypyOk = term([
    '$ python3 -m mypy src',
    'Success: no issues found in 5 source files'
  ], 'terminal, mypy 2.4.1: the labels from lessons 104 to 106 all match');
  const shortcut = code([
    '    line_up = sorted(candidates, key=lambda r: (-r.protein, r.name))',
    '    if not line_up:',
    '        return None  # nothing to cook today',
    '    meals: list[Recipe] = []'
  ], { title: 'planner.py: somebody adds a "shortcut" to plan_day (lines 11 to 14)', bad: [2, 3] });
  const mypyCatch = term([
    '$ python3 -m pytest',
    '# ... three rows of dots ...',
    '=== 11 passed in 0.03s ===',
    '$ python3 -m mypy src',
    'src/kitchen_coach/planner.py:13: error: Incompatible return value type (got "None", expected "list[Recipe]")  [return-value]',
    'Found 1 error in 1 file (checked 5 source files)'
  ], 'terminal: the tests are green, and mypy is not');
  const firstDay = [
    'from menu import BEN, RECIPES, full_pantry',
    '',
    'from kitchen_coach.pantry import Pantry',
    'from kitchen_coach.planner import plan_day',
    '',
    '# planner.py has the shortcut today:  if not line_up: return None',
    'for shelves in [full_pantry(), Pantry()]:  # a normal day, then the first day',
    '    meals = plan_day(BEN, RECIPES, shelves)',
    '    print(len(shelves), "jars on the shelves. Ben gets", len(meals), "meals")'
  ];
  const firstDayCrash = term([
    '# the first day: there is no data/pantry.json yet',
    '$ kitchen-coach',
    'note: no data/pantry.json yet, starting with an empty pantry',
    'Traceback (most recent call last):',
    '  ...',
    '  File "/Users/you/kitchen-coach/src/kitchen_coach/cli.py", line 18, in show',
    '    names = ", ".join([recipe.name for recipe in meals])',
    '                                                 ^^^^^',
    'TypeError: \'NoneType\' object is not iterable'
  ], 'terminal: without mypy, it crashes in cli.py, far from the mistake');
  const TOML = [
    '[build-system]',
    'requires = ["hatchling"]',
    'build-backend = "hatchling.build"',
    '',
    '[project]',
    'name = "kitchen-coach"',
    'version = "0.1.0"',
    'description = "Today\'s meal plan for Ana, Ben and Chloe"',
    'readme = "README.md"',
    'requires-python = ">=3.14"',
    'dependencies = []',
    '',
    '[project.scripts]',
    'kitchen-coach = "kitchen_coach.cli:main"',
    '',
    '[tool.ruff]',
    'line-length = 88',
    '',
    '[tool.ruff.lint]',
    'extend-select = ["E"]',
    'ignore = ["SIM103"]  # allows() reads better with one if per rule'
  ];
  const ruffRun = term([
    '$ ruff check --output-format concise',
    'src/kitchen_coach/models.py:25:9: SIM103 Return the condition `not (self.gluten_free and not recipe.gluten_free)` directly',
    'tests/menu.py:12:89: E501 Line too long (94 > 88)',
    'tests/test_pantry.py:1:8: F401 [*] `json` imported but unused',
    'Found 3 errors.',
    '[*] 1 fixable with `--fix` (1 unsafe fix available with `--fix --unsafe-fixes`).',
    '$ ruff check --fix --output-format concise',
    'src/kitchen_coach/models.py:25:9: SIM103 Return the condition `not (self.gluten_free and not recipe.gluten_free)` directly',
    'tests/menu.py:12:89: E501 Line too long (94 > 88)',
    'Found 3 errors (1 fixed, 2 remaining).',
    '1 unsafe fix available with `--fix --unsafe-fixes`.',
    '$ ruff format',
    '2 files reformatted, 8 files left unchanged',
    '$ ruff check --output-format concise',
    'src/kitchen_coach/models.py:25:9: SIM103 Return the condition `not (self.gluten_free and not recipe.gluten_free)` directly',
    'Found 1 error.',
    '1 unsafe fix available with `--fix --unsafe-fixes`.'
  ], 'terminal, Ruff 0.17.6: three findings, then one');
  const sim = code([
    '        if self.vegetarian and not recipe.vegetarian:',
    '            return False',
    '        if self.gluten_free and not recipe.gluten_free:',
    '            return False',
    '        return True',
    '',
    '# Ruff\'s idea for the last three lines:',
    '        return not (self.gluten_free and not recipe.gluten_free)'
  ], { title: 'models.py, Guest.allows: one if per rule, or Ruff\'s shorter line?', good: [3, 4, 5] });
  const allGreen = term([
    '$ python3 -m pytest',
    '# ... three rows of dots ...',
    '=== 11 passed in 0.01s ===',
    '$ python3 -m mypy src',
    'Success: no issues found in 5 source files',
    '$ ruff check',
    'All checks passed!',
    '$ ruff format',
    '10 files left unchanged'
  ], 'terminal: the whole routine, all green');
  const tryPic = stack(mypyOk, shortcut, mypyCatch, run(firstDay, { title: 'first_day.py', files: project(null, PLANNER_NONE) }), firstDayCrash,
    ruffRun, sim, code(TOML, { title: 'pyproject.toml', hi: [16, 17, 19, 20, 21] }), allGreen);

  /* ---- The catch: one pantry for every test ---- */
  const shared = [
    'from menu import ANA, BEN, RECIPES, full_pantry',
    '',
    'from kitchen_coach.planner import plan_day',
    '',
    'PANTRY = full_pantry()  # ONE pantry for every test',
    '',
    '',
    'def names(meals):',
    '    return [recipe.name for recipe in meals]',
    '',
    '',
    'def test_ana_plan():',
    '    meals = plan_day(ANA, RECIPES, PANTRY)',
    '    assert names(meals) == ["chicken rice bowl", "tofu stir-fry", "pasta bake"]',
    '',
    '',
    'def test_ben_alone_gets_tofu_stir_fry():',
    '    meals = plan_day(BEN, RECIPES, PANTRY)',
    '    assert "tofu stir-fry" in names(meals)',
    '',
    '',
    'test_ana_plan()',
    'print("test_ana_plan passed")',
    'test_ben_alone_gets_tofu_stir_fry()',
    'print("test_ben_alone_gets_tofu_stir_fry passed")'
  ];
  const catchSvg = svg(600, 150, 'What a green run means. Tasted: the 11 rules you wrote tests for, like Ben and the chicken bowl, a failed take, and Ana\'s 1610 kcal. Not tasted yet: everything else, like an empty pantry, a broken JSON file, or a guest with no rules. Green means everything you thought to check is fine.',
    box(12, 16, 276, 118, P.okT, 14) + T(150, 44, 'tasted: 11 rules', { s: 15, f: P.ok }) +
    T(150, 70, 'Ben and the chicken bowl', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 90, 'a failed take changes nothing', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 110, 'Ana\'s plan is 1610 kcal', { s: 12.5, w: 700, f: P.ink2 }) +
    `<rect x="312" y="16" width="276" height="118" rx="14" fill="${P.white}" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    T(450, 44, 'not tasted yet', { s: 15, f: P.ink2 }) +
    T(450, 70, 'an empty pantry', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 90, 'a broken pantry.json', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 110, 'a day with max_meals=0', { s: 12.5, w: 700, f: P.ink2 }));
  const catchPic = stack(run(shared, { title: 'test_shared.py', files: project() }), catchSvg);

  /* ---- quiz code ---- */
  const weakTest = [
    'class Pantry:',
    '    def __init__(self, grams):',
    '        self.grams = dict(grams)',
    '',
    '    def __getitem__(self, name):',
    '        return self.grams.get(name, 0)',
    '',
    '    def take(self, ingredients):',
    '        for name, need in ingredients.items():',
    '            have = self[name]',
    '            if have < need:',
    '                raise ValueError(f"not enough {name}")',
    '            self.grams[name] = have - need',
    '',
    '',
    'def test_failed_take_changes_nothing():',
    '    pantry = Pantry({"rice": 1000, "chicken": 300})',
    '    try:',
    '        pantry.take({"rice": 300, "chicken": 450})',
    '    except ValueError:',
    '        print("refused, as it should be")',
    '',
    '',
    'try:',
    '    test_failed_take_changes_nothing()',
    '    print("test passed")',
    'except AssertionError:',
    '    print("test FAILED: it caught the bug")'
  ];
  const noneQuiz = [
    'def vegetarian_names(recipes: list[dict]) -> list[str]:',
    '    names = [r["name"] for r in recipes if r["vegetarian"]]',
    '    if not names:',
    '        return None',
    '    return names',
    '',
    '',
    'menu = [{"name": "chicken rice bowl", "vegetarian": False}]',
    'found = vegetarian_names(menu)',
    'print(len(found), "vegetarian dishes")'
  ];

  COURSE.add({
    id: 'l107', minutes: 18,
    summary: 'Before a dish goes out, the cook tastes it. Kitchen Coach gets the three tools from module 8, on a real project. <b>pytest</b> (lesson 89): a <code>tests/</code> folder with one test file per module and <b>11 taste tests</b>. <code>test_models.py</code>: Ben is not allowed the chicken rice bowl, Chloe is not allowed the pasta bake. <code>test_pantry.py</code>: <code>take</code> subtracts, a <b>failed take changes nothing</b>, a missing file gives an empty pantry, and save then load gives the same pantry. A test that names a parameter <code>tmp_path</code> gets a new empty folder from pytest. <code>test_planner.py</code>: Ana\'s plan is chicken rice bowl, tofu stir-fry, pasta bake, <b>1610 kcal</b>, a plan never goes over the kcal target, and Ben gets no tofu stir-fry after Ana. Every test builds its own <code>full_pantry()</code>, so no test depends on another one or on <code>data/pantry.json</code>. When Ben merged <code>take</code>\'s two loops into one, the app still printed the right plan, and one test went red: <code>assert 700 == 1000</code>. <b>mypy</b> (lesson 90): <code>python3 -m mypy src</code> caught <code>return None</code> where <code>list[Recipe]</code> was promised, while all 11 tests stayed green. <b>Ruff</b> (lesson 92): settings live in <code>pyproject.toml</code> under <code>[tool.ruff]</code>. <code>ruff check --fix</code> removed an unused import, <code>ruff format</code> wrapped a long line, and one rule was switched off on purpose with <code>ignore = ["SIM103"]</code> and a reason. Each tool finds a different kind of mistake. Green means everything you thought to check is fine.',
    video: {
      src: 'videos/l107-taste-test-kitchen-coach.mp4', poster: 'videos/l107-taste-test-kitchen-coach.jpg', length: '1 min 5 s',
      script: [
        'Before a dish goes out, the cook tastes it. Kitchen Coach gets taste tests too.',
        'Three pots: models, pantry, planner. The spoon goes down the row. Ben is not allowed the chicken bowl. Tick. A failed take changes nothing. Tick. Ana\'s plan is 1610 calories. Tick. 11 passed.',
        'Then Ben tidies take into one loop. Run the tests again. The pantry pot turns red. Three bowls need 450 grams of chicken. There is only 300. The take fails, but the rice jar has already dropped from 1000 to 700. Put the two loops back. Check first, then take. Green again.',
        'Next, mypy reads the labels. Plan day promises a list, but one line returns None. Caught, before it ever runs.',
        'Last, ruff sweeps the counter. An unused import, gone. A long line, wrapped. All checks passed.',
        'Taste it. Check the labels. Tidy up. Then serve.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Taste every pot before it goes out.',
        text: [
          'A cook tastes each pot before it leaves the kitchen. Kitchen Coach now has three pots: <code>models.py</code> (lesson 104), <code>pantry.py</code> (lesson 105) and <code>planner.py</code> (lesson 106). It works today. This lesson makes sure it <b>still works after the next change</b>.',
          'You know the tools from module 8, so there is nothing new to learn here. You use them on a real project. <b>pytest</b> (lesson 89) tastes: does the code give the right answer? <b>mypy</b> (lesson 90) reads the labels: does every value match its type hint? <b>Ruff</b> (lesson 92) tidies the counter and points at things left lying around.',
          'Start with the smallest pot. <code>test_models.py</code> checks the rules from lesson 104: Ben is not allowed the chicken rice bowl, Chloe is not allowed the pasta bake, and Ana is allowed every recipe. <b>One rule per test</b>, and the name says which rule. The friends and the menu come from <code>menu.py</code>, the test kitchen. You meet it in the next part.',
          'Press <b>Run</b>. This page has no pytest, so the last lines call the three tests by hand, as lesson 89 did. Then delete the word <code>not</code> on line 5 and run again. The test stops with an <code>AssertionError</code> on that line. Put the <code>not</code> back.'
        ],
        tip: 'Write a test name as a sentence: <code>test_ben_is_not_allowed_chicken_rice_bowl</code>. When it fails next year, the name alone says what broke.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A tests folder: one test file for each module.',
        text: [
          'Tests get their own folder, <code>tests/</code>, next to <code>src/</code>. pytest collects every file named <code>test_*.py</code>. <code>menu.py</code> does not start with <code>test_</code>, so pytest does not collect it. It is a helper: the three friends, the seven recipes, and <code>full_pantry()</code>. pytest puts the tests folder on the import path, so <code>from menu import ...</code> works. <code>from kitchen_coach.pantry import ...</code> works because the project is installed with <code>pip install -e .</code> (lessons 94 and 103).',
          '<code>full_pantry()</code> (line 29) builds a <b>new</b> Pantry on every call. Each test starts with full shelves, whatever the other tests did. And no test reads <code>data/pantry.json</code>: that file changes every time Kitchen Coach runs, so a test that used it would pass on Monday and fail on Tuesday.',
          '<b><code>test_pantry.py</code></b> has 4 tests. The important one is <code>test_failed_take_changes_nothing</code>: three bowls need 450 g of chicken, there are 300 g, so <code>take</code> must raise a <code>ValueError</code> (<code>pytest.raises</code>, lesson 89) <b>and</b> leave the rice at 1000 g. Two tests have a parameter called <code>tmp_path</code>. A test that names a parameter <code>tmp_path</code> gets a new, empty folder from pytest, as a <code>Path</code> (lesson 58), so saving and loading never touch your real files. Press <b>Run</b>: the box hands over its own empty folder instead, and brings a small stand-in for <code>pytest.raises</code>. The note about the missing file is <code>load_pantry</code> talking, from lesson 105.',
          '<b><code>test_planner.py</code></b> has 4 tests. Ana\'s plan is exactly chicken rice bowl, tofu stir-fry, pasta bake, and 650 + 350 + 610 = <b>1610</b> kcal. On a rest day with a target of 900 kcal, the plan stays at or under 900. Ben gets no tofu stir-fry after Ana, because she took 150 g of the 200 g. And after everyone has planned, the one shared pantry has 0 g of chicken and 50 g of tofu. Press <b>Run</b>. Then change <code>1610</code> to <code>1600</code> and run again to see a test fail.',
          'On your computer, install the three tools into the project\'s venv and type <code>python3 -m pytest</code>. One row of dots for each file, and <code>11 passed in 0.01s</code>. The line <code>configfile: pyproject.toml</code> means pytest found your project\'s cover page.'
        ],
        tip: 'Why do the tests pass exact names, like <code>["chicken rice bowl", "tofu stir-fry", "pasta bake"]</code>? Because lesson 106 sorted the line-up by protein and then by name, so the planner gives the same answer every time. Code that always gives the same answer is easy to test.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A tidy-up that quietly breaks the pantry.',
        text: [
          'A week later Ben reads <code>pantry.py</code>. <code>take</code> walks through the same items twice. "Wasteful," he says, and merges the two loops into one: check an item, subtract it, go to the next. Five lines, not six. It is the first idea that lesson 105 threw away, but Ben was not there that day, and he also deleted the two comments.',
          'Press <b>Run</b> on <b>today.py</b>. It uses Ben\'s version. The plan is the same as yesterday, and 725 g of rice is left, as it should be. <b>Nothing looks wrong.</b> The planner asks <code>has_all</code> before every <code>take</code>, so on a normal day <code>take</code> never fails, and the bug never shows.',
          'Now the taste tests. The pantry row says <code>.F..</code>: its second test failed. Read the report the way lesson 89 taught: the <code>&gt;</code> marks the line, and the <code>E</code> line fills in the real values. <code>assert 700 == 1000</code>. The left number is what the pantry really holds, the right one is what the test expects. Three bowls were refused, <b>and 300 g of rice is gone anyway</b>.',
          'The day some new code calls <code>take</code> without asking first, <code>save_pantry</code> would write that wrong number into the file, and nobody would know. mypy and Ruff both stay silent about Ben\'s version: the types are right and the layout is tidy. Only something that <b>runs</b> the code can see a wrong number.'
        ],
        warn: 'A program that prints the right plan today can still be broken. Tests check the cases a normal day never reaches.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Read the red line. Put the two loops back.',
        text: [
          'Here is Ben\'s <code>take</code> and the failing test in one box. Press <b>Run</b>. Plain Python only says <code>AssertionError</code> and points at <code>assert pantry["rice"] == 1000</code>. pytest showed the numbers too, 700 and 1000.',
          'The test is right: a refused order must not cost any rice. So the <b>code</b> changes. Give <code>take</code> its two loops back. The first loop keeps lines 12 to 15 and only checks. Then add a second loop that only subtracts: <code>for name, need in ingredients.items():</code> and under it <code>self.grams[name] = self[name] - need</code>. Delete the old line 16. Run again until it prints <code>taste test passed</code>.',
          'On your computer: <code>11 passed</code>. And the test <b>stays</b>. If somebody merges the loops again next year, the pantry pot turns red again within a second. That is what the tests are for: you can change code without fear.'
        ],
        tip: 'Put the comments back as well: <code># 1. check them all</code> and <code># 2. then take</code>. A comment that says <b>why</b> the code looks odd is the cheapest guard against the next tidy-up (lesson 17).'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Read the labels with mypy. Sweep with Ruff.',
        text: [
          '<b>mypy.</b> Lessons 104 to 106 put type hints on every def line. Now let a checker read them: <code>python3 -m mypy src</code>. <code>Success: no issues found in 5 source files</code> (the four modules and <code>__init__.py</code>).',
          'Then somebody adds a "shortcut" to <code>plan_day</code>: no dishes in the line-up, so <code>return None</code>. Run the tests: <b>11 passed</b>. No test plans a day with an empty pantry, so no test notices. Run mypy: <code>planner.py:13: error: Incompatible return value type (got "None", expected "list[Recipe]")</code>. The def line promises a list, and line 13 hands back <code>None</code>. Press <b>Run</b> on <b>first_day.py</b> to see what mypy saved you from. A normal day works. The first day, with empty shelves, stops with a <code>TypeError</code>. In the real app the crash is in <code>cli.py</code>, far from the mistake. The fix is to delete the shortcut: with an empty line-up the loop does nothing, and <code>plan_day</code> returns <code>[]</code>.',
          '<b>Ruff.</b> Put the settings from lesson 92 into <code>pyproject.toml</code> and run <code>ruff check</code>. Three findings. <b>F401</b>: an <code>import json</code> left over in <code>test_pantry.py</code>. <code>--fix</code> deletes it. <b>E501</b>: a line of 94 characters in <code>tests/menu.py</code>. <code>ruff format</code> wraps it for you. That is why the tofu stir-fry takes eight lines in <code>menu.py</code>.',
          '<b>SIM103</b> is different. Ruff suggests squeezing the second rule of <code>Guest.allows</code> into one line. It is advice, not a law. One <code>if</code> per rule reads better here, and the next rule (no nuts?) slots in the same way. So switch that one rule off for this project, <b>with the reason next to it</b>: <code>ignore = ["SIM103"]</code>. <code>ignore</code> is a list of rule codes Ruff should skip. Now everything is green.'
        ],
        tip: 'The routine before every commit (lesson 93): <code>python3 -m pytest</code>, <code>python3 -m mypy src</code>, <code>ruff check</code>, <code>ruff format</code>. Four commands, a few seconds.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Green means tasted, not perfect.',
        text: [
          '<b>Every test needs its own ingredients.</b> Press <b>Run</b> on <b>test_shared.py</b>. It makes one <code>PANTRY</code> for all its tests. <code>test_ana_plan</code> passes. Then <code>test_ben_alone_gets_tofu_stir_fry</code> fails, although the planner is fine: Ana\'s test already took the tofu out of the same object (two labels on one jar, lesson 97). Change <code>PANTRY</code> to <code>full_pantry()</code> on lines 13 and 18 and run again. Both pass, in any order. A test must never depend on which test ran before it.',
          '<b>Tests only cover what you tasted.</b> All 11 tests stayed green with the <code>return None</code> shortcut. 11 passed does not mean "no bugs". It means the 11 rules you wrote down still hold. When a bug gets past them, first write the test that shows it, then fix it (lesson 89).',
          '<b>The other two tools have limits too.</b> mypy only checks code that has hints, and it cannot look inside a JSON file (lesson 104). Ruff makes code tidy, and tidy code can still be wrong: Ben\'s one-loop <code>take</code> passed <code>ruff check</code>. And do not chase numbers. Ten tests on your own rules beat fifty that test Python.',
          'Next: <b>Final project: Kitchen Coach</b>. You put every file together and run the whole thing from start to finish.'
        ],
        warn: 'All green means: everything you thought to check is fine. Keep adding to the list.'
      }
    ],
    exercises: [
      {
        file: 'l107_taste_test.py', title: 'Taste-test the pantry',
        task: 'Chloe did not get her chicken rice bowl. Exactly 150 g of chicken was left and her bowl needs exactly 150 g, but <code>has_all</code> said "not enough". The two tests in the file both pass, so they never noticed. Work the way a pro does: first write a taste test, <code>test_exactly_enough</code>, that <b>shows</b> the bug (it must fail), then fix <code>has_all</code> so every test passes.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. It runs every <code>test_</code> function itself, like a small pytest, and prints <code>ok</code> or <code>FAILED</code> for each.',
          'Between <code>START</code> and <code>END</code>, write <code>def test_exactly_enough():</code>. Make a <code>Pantry</code> with exactly 150 g of chicken and 100 g of rice, and <code>assert</code> that it <code>has_all(BOWL)</code>. Run it: your test should fail, and the check tells you it caught the bug.',
          'Now fix the comparison in <code>has_all</code> and run again until it says <code>PASS</code>.',
          'With pytest in your venv, also try <code>python3 -m pytest l107_taste_test.py</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'pytest prints this after Ben\'s tidy-up. What is <code>700</code>?',
        pic: term(['    with pytest.raises(ValueError):', '        pantry.take(THREE_BOWLS)', '>       assert pantry["rice"] == 1000', 'E       assert 700 == 1000'], 'pytest'),
        options: ['The grams of rice really in the pantry after the failed take', 'The grams of rice the test expects', 'The grams of chicken the three bowls need', 'The line number of the failing assert'],
        answer: 0,
        why: 'pytest fills in the real values on both sides of <code>==</code>. The left side, <code>pantry["rice"]</code>, is what the code gave: 700. The right side is what you wrote in the test: 1000. The take was refused, and 300 g of rice was taken anyway.',
        hint: 'Which side of the == is pantry["rice"]?'
      },
      {
        type: 'fix', q: 'This <code>take</code> has Ben\'s one-loop bug, but the taste test still <b>passes</b>. Add what is missing to <code>test_failed_take_changes_nothing</code>, so the output ends with <code>test FAILED: it caught the bug</code>. Leave <code>take</code> as it is.',
        code: weakTest, title: 'weak_test.py',
        check: [
          'import contextlib, io',
          't = globals().get("test_failed_take_changes_nothing")',
          'K = globals().get("Pantry")',
          'def _good(self, ingredients):',
          '    for name, need in ingredients.items():',
          '        if self[name] < need:',
          '            raise ValueError("not enough " + name)',
          '    for name, need in ingredients.items():',
          '        self.grams[name] = self[name] - need',
          'def _bad(self, ingredients):',
          '    for name, need in ingredients.items():',
          '        if self[name] < need:',
          '            raise ValueError("not enough " + name)',
          '        self.grams[name] = self[name] - need',
          'def _taste(method):',
          '    old = K.take',
          '    K.take = method',
          '    try:',
          '        with contextlib.redirect_stdout(io.StringIO()):',
          '            t()',
          '        return "pass"',
          '    except AssertionError:',
          '        return "fail"',
          '    except Exception:',
          '        return "error"',
          '    finally:',
          '        K.take = old',
          'if not callable(t) or not isinstance(K, type):',
          '    msg = "Keep the class Pantry and the function test_failed_take_changes_nothing. The check uses both."',
          'elif _taste(_bad) != "fail":',
          '    msg = "The test still passes with the bug. After the failed take, what should pantry[\\"rice\\"] be? Say so with assert."',
          'elif _taste(_good) != "pass":',
          '    msg = "Now the test fails even with a correct take. After a refused take the pantry is unchanged: 1000 g of rice, 300 g of chicken."',
          'elif "test FAILED: it caught the bug" not in out:',
          '    msg = "Your test catches the bug now. But the output should end with: test FAILED: it caught the bug. Leave take with its one loop, and keep the try and except lines at the bottom."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The test only checked that the order was <b>refused</b>. It never looked at the pantry afterwards. Add <code>assert pantry["rice"] == 1000</code> (and <code>assert pantry["chicken"] == 300</code>) after the <code>try</code> block. Now the half-taken pantry turns the test red.',
        hint: 'After the try block, check what is left in the pantry.'
      },
      {
        type: 'bucket', q: 'Three tools, three kinds of mistake. Which tool finds each one?',
        buckets: ['pytest', 'mypy', 'ruff'],
        items: [
          ['a refused take leaves 700 g of rice, not 1000 g', 0],
          ['Ana\'s plan adds up to 1960 kcal, not 1610', 0],
          ['plan_day returns None, but promises list[Recipe]', 1],
          ['cli.py calls pantry.take({"rice": "150"}), with text for the grams', 1],
          ['an import json that nobody uses', 2],
          ['a line that is 94 characters long', 2]
        ],
        why: '<b>pytest</b> runs the code and compares answers, so it finds wrong numbers. <b>mypy</b> reads the hints without running anything, so it finds a value of the wrong type: <code>None</code> for a list, or text where <code>dict[str, int]</code> wants whole numbers. <b>Ruff</b> reads the layout and the leftovers: unused imports, long lines.',
        hint: 'Wrong answer, wrong type, or untidy?'
      },
      {
        type: 'pick', q: 'What does pytest hand to this test as <code>tmp_path</code>?',
        pic: code(['def test_missing_file_gives_an_empty_pantry(tmp_path):', '    pantry = load_pantry(tmp_path / "pantry.json")', '    assert len(pantry) == 0'], { title: 'tests/test_pantry.py' }),
        options: ['A new, empty folder, as a Path, made just for this test', 'The project\'s real data folder', 'The folder that test_pantry.py is in', 'None, until you set it yourself'],
        answer: 0,
        why: 'A test that names a parameter <code>tmp_path</code> gets a fresh, empty folder from pytest. So <code>tmp_path / "pantry.json"</code> is a file that does not exist yet, and <code>load_pantry</code> must answer with an empty pantry. Your real <code>data/pantry.json</code> is never touched.',
        hint: 'tmp is short for temporary.'
      },
      {
        type: 'pick', q: 'Back to lesson 97. Both tests use the <b>same</b> <code>PANTRY</code> object, and <code>test_ana_plan</code> runs first. What happens in <code>test_ben_alone</code>?',
        pic: code(['PANTRY = full_pantry()', '', 'def test_ana_plan():', '    meals = plan_day(ANA, RECIPES, PANTRY)', '    assert names(meals) == ["chicken rice bowl", "tofu stir-fry", "pasta bake"]', '', 'def test_ben_alone():', '    meals = plan_day(BEN, RECIPES, PANTRY)', '    assert "tofu stir-fry" in names(meals)'], { title: 'tests/test_shared.py' }),
        options: ['It fails: Ana\'s test already took 150 g of tofu out of that same pantry', 'It passes: every test gets its own copy of PANTRY', 'It passes: pytest refills PANTRY between tests', 'NameError: PANTRY is not defined inside a function'],
        answer: 0,
        why: '<code>PANTRY</code> is one object, and <code>plan_day</code> changes it with <code>take</code>. Nothing copies or refills it between tests. After Ana\'s test only 50 g of tofu is left, so Ben cannot have the stir-fry. Build a new one in each test: <code>plan_day(BEN, RECIPES, full_pantry())</code>.',
        hint: 'Two labels on one jar. Who changes the jar?'
      },
      {
        type: 'fix', q: 'mypy says: <code>veg.py:4: error: Incompatible return value type (got "None", expected "list[str]")  [return-value]</code>. Python only notices on the last line, with a TypeError. Fix the function so it keeps its promise and the program prints <code>0 vegetarian dishes</code>.',
        code: noneQuiz, title: 'veg.py',
        check: [
          'f = globals().get("vegetarian_names")',
          'if not callable(f):',
          '    msg = "Keep the function  def vegetarian_names(recipes):"',
          'elif out.strip() != "0 vegetarian dishes":',
          '    msg = "It should print: 0 vegetarian dishes"',
          'elif f([]) != [] or f([{"name": "a", "vegetarian": False}]) != []:',
          '    msg = "With no vegetarian dish the function should hand back an empty list, []."',
          'elif f([{"name": "lentil soup", "vegetarian": True}, {"name": "chicken rice bowl", "vegetarian": False}]) != ["lentil soup"]:',
          '    msg = "It should still return the names of the vegetarian dishes when there are some."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The def line promises <code>-&gt; list[str]</code>, so every <code>return</code> must hand back a list. An empty result is an <b>empty list</b>: <code>return []</code>, or simply delete lines 3 and 4, because <code>names</code> is already <code>[]</code>. <code>len([])</code> is 0.',
        hint: 'What is a list with nothing in it?'
      },
      {
        type: 'pick', q: 'A guest has a rest day: <code>kcal_target</code> is 900. The pantry is full. <code>plan_day</code> goes down the line-up in this order. Which meals does it pick?',
        pic: code(['# name               kcal', '# chicken rice bowl   650', '# tofu stir-fry       350', '# pasta bake          610', '# yogurt bowl         250', '# lentil soup         320', '', 'if kcal + recipe.kcal > guest.kcal_target:', '    continue  # too much food for today'], { title: 'the line-up, by protein, and the rule from planner.py' }),
        options: ['chicken rice bowl and yogurt bowl: 900 kcal', 'chicken rice bowl and tofu stir-fry: 1000 kcal', 'chicken rice bowl only: 650 kcal', 'tofu stir-fry, yogurt bowl and lentil soup: 920 kcal'],
        answer: 0,
        why: 'The chicken rice bowl fits: 650. The tofu stir-fry would make 1000, more than 900, so <code>continue</code> skips it. So would the pasta bake. The yogurt bowl makes exactly 900, and <code>900 &gt; 900</code> is False, so it is picked. Nothing else fits after that. This is what <code>test_plan_never_goes_over_the_kcal_target</code> guards.',
        hint: 'continue skips one dish and looks at the next. Is 900 > 900?'
      },
      {
        type: 'fill', q: 'The routine before every commit. Fill in the four commands.',
        text: '$ python3 -m ___\n11 passed in 0.01s\n$ python3 -m ___ src\nSuccess: no issues found in 5 source files\n$ ruff ___\nAll checks passed!\n$ ruff ___\n10 files left unchanged',
        options: ['pytest', 'mypy', 'check', 'format', 'test', 'tidy'],
        answer: ['pytest', 'mypy', 'check', 'format'],
        why: '<code>pytest</code> runs the taste tests. <code>mypy</code> reads the type hints in <code>src</code>. <code>ruff check</code> looks for likely mistakes and leftovers, and <code>ruff format</code> tidies the layout. Here it had nothing left to do.',
        hint: 'Taste, read the labels, inspect, tidy.'
      }
    ]
  });
})();
