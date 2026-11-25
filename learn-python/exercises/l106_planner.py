# Lesson 106 exercise: Kitchen Coach's planner
#
# This is planner.py for Kitchen Coach, in one file. Recipe and Guest (lesson
# 104) and Pantry (lesson 105) are already written below. Two functions are
# not finished:
#
# 1. shortfall(guest, meals) answers: how many grams of protein is this guest
#    still missing today?
#    - Add up recipe.protein for every recipe in meals.
#    - Return guest.protein_target minus that total.
#    - NEVER below 0. A guest who is over the target is missing 0 g.
#    So Ana (target 100 g) with 86 g planned is missing 14 g, and Chloe
#    (target 75 g) with 78 g planned is missing 0 g, not -3.
#
# 2. plan_day(guest, recipes, pantry, max_meals=3) picks the guest's meals
#    and returns them as a list of recipes. Keep, line up, pick, take:
#    - KEEP the recipes the guest allows:        guest.allows(recipe)
#      and that the pantry can make right now:   pantry.has_all(recipe.ingredients)
#    - LINE them UP with sorted(): most protein first, then by name.
#        key=lambda r: (-r.protein, r.name)
#    - PICK: go down the line.
#        * the plan already has max_meals dishes: stop (break)
#        * the pantry no longer has this dish:   skip it (continue)
#        * the day's kcal plus this dish would be MORE than guest.kcal_target:
#          skip it (continue)
#    - TAKE: pantry.take(recipe.ingredients), then add the dish to the plan.
#
# Use sorted(), not recipes.sort(): the caller's list must keep its order.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l106_planner.py
#
# The check at the bottom plans Ana, Ben and Chloe from one shared pantry,
# then tries small pantries and small kcal targets. It says PASS, or gives
# you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: finish the two functions at the end of this part
from dataclasses import dataclass, field


@dataclass
class Recipe:
    name: str
    kcal: int
    protein: int
    vegetarian: bool
    gluten_free: bool
    ingredients: dict[str, int] = field(default_factory=dict)


@dataclass
class Guest:
    name: str
    kcal_target: int
    protein_target: int
    vegetarian: bool = False
    gluten_free: bool = False

    def allows(self, recipe):
        if self.vegetarian and not recipe.vegetarian:
            return False
        if self.gluten_free and not recipe.gluten_free:
            return False
        return True


class Pantry:
    """What is in the kitchen: ingredient name -> grams."""

    def __init__(self, grams=None):
        self.grams = dict(grams or {})  # a copy, not the caller's dict

    def __getitem__(self, name):
        return self.grams.get(name, 0)  # nothing on the shelf: 0 g

    def has_all(self, ingredients):
        """True if there is enough of every ingredient."""
        for name, need in ingredients.items():
            if self[name] < need:
                return False
        return True

    def take(self, ingredients):
        """Take every ingredient out, or nothing at all."""
        for name, need in ingredients.items():
            have = self[name]
            if have < need:
                raise ValueError(f"not enough {name}: need {need} g, have {have} g")
        for name, need in ingredients.items():
            self.grams[name] = self[name] - need


def shortfall(guest, meals):
    """Grams of protein the guest is still missing. Never below 0."""
    raise NotImplementedError("shortfall")


def plan_day(guest, recipes, pantry, max_meals=3):
    """Pick up to max_meals recipes for one guest, and take them from the pantry."""
    raise NotImplementedError("plan_day")

# <<< END: finish the two functions above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END and tries both functions with the real Kitchen Coach data.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colons and the indentation.")
    ns = {"__name__": "l106"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return f"HINT: Your lines stopped with {type(error).__name__}: {error}"
    Recipe, Guest, Pantry = ns.get("Recipe"), ns.get("Guest"), ns.get("Pantry")
    shortfall, plan_day = ns.get("shortfall"), ns.get("plan_day")
    if not all(isinstance(c, type) for c in (Recipe, Guest, Pantry)):
        return "HINT: Keep the classes Recipe, Guest and Pantry as they are. The check uses them."
    if not callable(shortfall) or not callable(plan_day):
        return "HINT: Keep the names shortfall and plan_day. The check uses them."

    def call(label, func):
        try:
            return True, func()
        except NotImplementedError as error:
            return False, f"{label} is still a stub (NotImplementedError: {error}). Write its body."
        except Exception as error:
            return False, f"{label} stopped with {type(error).__name__}: {error}"

    def menu():
        return [
            Recipe("lentil soup", 320, 18, True, True, {"lentils": 80, "carrots": 100}),
            Recipe("tofu stir-fry", 350, 24, True, False, {"tofu": 150, "rice": 75, "soy sauce": 15}),
            Recipe("pasta bake", 610, 22, True, False, {"pasta": 100, "cheese": 40}),
            Recipe("bean chili", 380, 15, True, True, {"beans": 150, "tomatoes": 200}),
            Recipe("chicken rice bowl", 650, 40, False, True, {"chicken": 150, "rice": 100}),
            Recipe("rice pudding", 300, 8, True, True, {"rice": 50, "milk": 200}),
            Recipe("yogurt bowl", 250, 20, True, True, {"yogurt": 200, "berries": 80}),
        ]

    def full_pantry():
        return Pantry({"rice": 1000, "lentils": 400, "carrots": 500, "tofu": 200,
                       "soy sauce": 100, "pasta": 500, "cheese": 200, "beans": 300,
                       "tomatoes": 400, "chicken": 300, "milk": 1000, "yogurt": 400,
                       "berries": 150})

    ana = Guest("Ana", 2600, 100)
    ben = Guest("Ben", 2400, 140, vegetarian=True)
    chloe = Guest("Chloe", 2000, 75, gluten_free=True)
    recipes = menu()
    by_name = {r.name: r for r in recipes}

    def names(meals):
        return [getattr(r, "name", r) for r in meals]

    def dishes(*wanted):
        return [by_name[n] for n in wanted]

    # 1. shortfall
    cases = [
        (ana, dishes("chicken rice bowl", "tofu stir-fry", "pasta bake"), 14),
        (ben, dishes("pasta bake", "yogurt bowl", "lentil soup"), 80),
        (chloe, dishes("chicken rice bowl", "yogurt bowl", "lentil soup"), 0),
        (chloe, dishes("chicken rice bowl", "yogurt bowl", "bean chili"), 0),
        (ben, [], 140),
    ]
    for guest, meals, want in cases:
        ok, got = call("shortfall", lambda: shortfall(guest, meals))
        if not ok:
            return "HINT 1: " + got
        protein = sum(r.protein for r in meals)
        if got != want:
            tip = ("Never go below 0: a guest who is over the target is missing 0 g."
                   if isinstance(got, int) and got < 0 else
                   "Return guest.protein_target minus the protein of all the meals. Did you return it?")
            return (f"HINT 1: {guest.name} has {protein} g planned and a target of "
                    f"{guest.protein_target} g, so shortfall should be {want}, not {got!r}. {tip}")
    print("1. shortfall: Ana 14 g, Ben 80 g, Chloe 0 g")

    # 2. plan_day: the real day, one shared pantry, Ana then Ben then Chloe
    pantry = full_pantry()
    order_before = [r.name for r in recipes]
    wanted = [
        (ana, ["chicken rice bowl", "tofu stir-fry", "pasta bake"]),
        (ben, ["pasta bake", "yogurt bowl", "lentil soup"]),
        (chloe, ["chicken rice bowl", "lentil soup", "bean chili"]),
    ]
    for guest, want in wanted:
        tofu_before = pantry["tofu"]
        ok, meals = call(f"plan_day({guest.name})", lambda: plan_day(guest, recipes, pantry))
        if not ok:
            return "HINT 2: " + meals
        if not isinstance(meals, list):
            return f"HINT 2: plan_day should return a list of recipes, not {meals!r}. Did you return meals?"
        got = names(meals)
        if [r.name for r in recipes] != order_before:
            return ("HINT 2: plan_day changed the order of the caller's recipes list. "
                    "Use sorted(...), which makes a new list, not recipes.sort().")
        if got != want:
            if len(got) > 3:
                return f"HINT 2: {guest.name} got {len(got)} meals. Stop the loop when len(meals) == max_meals."
            if any(not guest.allows(by_name[n]) for n in got if n in by_name):
                return f"HINT 2: {guest.name} got {got}. Keep only the recipes guest.allows(recipe) says yes to."
            if guest is ana and sorted(got) == sorted(want):
                return (f"HINT 2: Ana got the right dishes in the wrong order: {got}. "
                        "Sort with key=lambda r: (-r.protein, r.name).")
            if guest is ana and got == ["lentil soup", "tofu stir-fry", "pasta bake"]:
                return ("HINT 2: Ana got the first three recipes in the file. "
                        "Line them up first: sorted(..., key=lambda r: (-r.protein, r.name)).")
            if guest is ana and got[:1] == ["rice pudding"]:
                return ("HINT 2: Ana's plan starts with the rice pudding, the dish with the LEAST "
                        "protein. Put the most protein first: key=lambda r: (-r.protein, r.name).")
            if guest is ben and "tofu stir-fry" in got:
                if tofu_before == 200:
                    return ("HINT 2: Ben got the tofu stir-fry, and the tofu jar still held 200 g after "
                            "Ana's plan. Call pantry.take(recipe.ingredients) for every dish you pick.")
                return ("HINT 2: Ben got the tofu stir-fry, but only 50 g of tofu is left. "
                        "Keep only recipes where pantry.has_all(recipe.ingredients) is True.")
            return f"HINT 2: {guest.name} should get {want}, not {got}."
        print(f"2. {guest.name}: {', '.join(got)}  (missing {shortfall(guest, meals)} g protein)")
    after = {"rice": 725, "lentils": 240, "carrots": 300, "tofu": 50, "soy sauce": 85,
             "pasta": 300, "cheese": 120, "beans": 150, "tomatoes": 200, "chicken": 0,
             "milk": 1000, "yogurt": 200, "berries": 70}
    if pantry.grams != after:
        wrong = [k for k in after if pantry.grams.get(k) != after[k]]
        return (f"HINT 2: The plans are right, but the pantry is not. {wrong[0]} should be "
                f"{after[wrong[0]]} g, not {pantry.grams.get(wrong[0])} g. Take each dish exactly once.")
    print("2. pantry after: tofu", pantry["tofu"], "g, chicken", pantry["chicken"], "g, berries",
          pantry["berries"], "g")

    # 3. the kcal check: skip a dish that is too much, and go on to the next
    dev = Guest("Dev", 900, 60)
    ok, meals = call("plan_day(Dev, 900 kcal)", lambda: plan_day(dev, menu(), full_pantry()))
    if not ok:
        return "HINT 3: " + meals
    got = names(meals)
    if got != ["chicken rice bowl", "yogurt bowl"]:
        if got == ["chicken rice bowl"]:
            tip = ("When a dish has too many kcal, use continue, not break: a smaller dish later "
                   "in the line may still fit. And a day of exactly 900 kcal is fine: compare with >.")
        elif sum(by_name[n].kcal for n in got if n in by_name) > 900:
            tip = "That is more than 900 kcal. Skip a dish when kcal + recipe.kcal > guest.kcal_target."
        else:
            tip = "Add each picked dish's kcal to a running total, and skip a dish that would go over."
        return (f"HINT 3: Dev eats everything and has a 900 kcal target. He should get "
                f"['chicken rice bowl', 'yogurt bowl'] (650 + 250), not {got}. {tip}")
    print("3. Dev, 900 kcal:", ", ".join(got))

    # 4. the re-check inside the loop: an earlier pick used up the rice
    small = Pantry({"chicken": 300, "rice": 150, "tofu": 200, "soy sauce": 100, "lentils": 400,
                    "carrots": 500})
    ok, meals = call("plan_day(Ana, small pantry)", lambda: plan_day(ana, menu(), small))
    if not ok:
        if "ValueError" in meals:
            return ("HINT 4: With only 150 g of rice, the chicken rice bowl takes 100 g and the tofu "
                    "stir-fry then needs 75 g. Check pantry.has_all(recipe.ingredients) again inside "
                    "the loop, and continue if it is False. " + meals)
        return "HINT 4: " + meals
    got = names(meals)
    if got != ["chicken rice bowl", "lentil soup"]:
        return (f"HINT 4: With 150 g of rice Ana should get ['chicken rice bowl', 'lentil soup'], "
                f"not {got}. The chicken rice bowl uses 100 g of rice, so the tofu stir-fry "
                "(75 g) no longer fits. Check has_all again inside the loop.")
    print("4. small pantry:", ", ".join(got), " (the tofu stir-fry lost its rice)")

    # 5. max_meals
    ok, meals = call("plan_day(max_meals=1)", lambda: plan_day(ben, menu(), full_pantry(), max_meals=1))
    if not ok:
        return "HINT 5: " + meals
    if names(meals) != ["tofu stir-fry"]:
        return (f"HINT 5: plan_day(ben, ..., max_meals=1) should give ['tofu stir-fry'], not "
                f"{names(meals)}. Use max_meals in the loop, not the number 3.")
    print("5. max_meals=1: Ben gets", names(meals)[0])

    return ("PASS: keep, line up, pick, take. Your planner fits meals to each guest "
            "and says honestly what is still missing.")


print(_check())
