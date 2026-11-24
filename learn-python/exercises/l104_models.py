# Lesson 104 exercise: Kitchen Coach's models
#
# This is models.py for Kitchen Coach. The Recipe and Guest dataclasses and
# their fields are already written. Two methods on Guest are not finished:
#
# 1. guest.allows(recipe) must answer True or False: may this guest eat it?
#    - A vegetarian guest may not eat a recipe that is not vegetarian.
#    - A gluten-free guest may not eat a recipe that is not gluten-free.
#    - Everything else is allowed.
#    So Ben (vegetarian) says no to the chicken rice bowl, and Chloe
#    (gluten-free) says no to the tofu stir-fry and the pasta bake.
#
# 2. str(guest) (and so print(guest)) must give a one-line card, like:
#      Ana: 2600 kcal, 100 g protein
#      Ben: 2400 kcal, 140 g protein, vegetarian
#      Chloe: 2000 kcal, 75 g protein, gluten-free
#    A guest who is both ends with  , vegetarian, gluten-free
#
# Remember: __str__ must RETURN the text, not print it (lesson 72).
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l104_models.py
#
# What happens when you run it:
# - STEP 1. The check loads the three guests and seven recipes from JSON
#   (the same data as data/guests.json and data/recipes.json) with
#   Guest(**row) and Recipe(**row), and prints each guest.
# - STEP 2, THE CHECK. It prints the allows table, a check mark or a cross
#   for every guest and recipe, and compares it with the right answer.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: finish the two methods below this line
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

    def allows(self, recipe: Recipe) -> bool:
        # Write the two rules here. Use self (the guest) and recipe.
        return True

    def __str__(self) -> str:
        # Build the one-line card here, and return it.
        return self.name

# <<< END: finish the two methods above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, loads the guests and recipes, then tests your two methods.
GUESTS_JSON = """[
  {"name": "Ana", "kcal_target": 2600, "protein_target": 100, "vegetarian": false, "gluten_free": false},
  {"name": "Ben", "kcal_target": 2400, "protein_target": 140, "vegetarian": true, "gluten_free": false},
  {"name": "Chloe", "kcal_target": 2000, "protein_target": 75, "vegetarian": false, "gluten_free": true}
]"""

RECIPES_JSON = """[
  {"name": "lentil soup", "kcal": 320, "protein": 18, "vegetarian": true, "gluten_free": true, "ingredients": {"lentils": 80, "carrots": 100}},
  {"name": "tofu stir-fry", "kcal": 350, "protein": 24, "vegetarian": true, "gluten_free": false, "ingredients": {"tofu": 150, "rice": 75, "soy sauce": 15}},
  {"name": "pasta bake", "kcal": 610, "protein": 22, "vegetarian": true, "gluten_free": false, "ingredients": {"pasta": 100, "cheese": 40}},
  {"name": "bean chili", "kcal": 380, "protein": 15, "vegetarian": true, "gluten_free": true, "ingredients": {"beans": 150, "tomatoes": 200}},
  {"name": "chicken rice bowl", "kcal": 650, "protein": 40, "vegetarian": false, "gluten_free": true, "ingredients": {"chicken": 150, "rice": 100}},
  {"name": "rice pudding", "kcal": 300, "protein": 8, "vegetarian": true, "gluten_free": true, "ingredients": {"rice": 50, "milk": 200}},
  {"name": "yogurt bowl", "kcal": 250, "protein": 20, "vegetarian": true, "gluten_free": true, "ingredients": {"yogurt": 200, "berries": 80}}
]"""

# The right answer: which recipes each guest may NOT eat.
NOT_ALLOWED = {
    "Ana": [],
    "Ben": ["chicken rice bowl"],
    "Chloe": ["tofu stir-fry", "pasta bake"],
}

CARDS = {
    "Ana": "Ana: 2600 kcal, 100 g protein",
    "Ben": "Ben: 2400 kcal, 140 g protein, vegetarian",
    "Chloe": "Chloe: 2000 kcal, 75 g protein, gluten-free",
}


def _check():
    import ast
    import dataclasses
    import json

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Change the methods between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "\n  Check the colons and that the method lines are pushed in by 8 spaces.")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    Guest, Recipe = ns.get("Guest"), ns.get("Recipe")
    if not (isinstance(Guest, type) and isinstance(Recipe, type)):
        return "HINT: Keep both classes, Recipe and Guest. The check looks for them."
    if not (dataclasses.is_dataclass(Guest) and dataclasses.is_dataclass(Recipe)):
        return "HINT: Keep @dataclass above both classes."
    names = [f.name for f in dataclasses.fields(Guest)]
    want = ["name", "kcal_target", "protein_target", "vegetarian", "gluten_free"]
    if names != want:
        return ("HINT: The Guest fields were given to you: " + ", ".join(want)
                + ". Yours are now: " + ", ".join(names) + ". Put them back.")

    # STEP 1: load the data the way Kitchen Coach does
    try:
        guests = [Guest(**row) for row in json.loads(GUESTS_JSON)]
        recipes = [Recipe(**row) for row in json.loads(RECIPES_JSON)]
    except TypeError as error:
        return "HINT: Guest(**row) stopped with: TypeError: " + str(error) + "\n  Keep the fields as they were given."
    by_name = {guest.name: guest for guest in guests}

    print("STEP 1: Kitchen Coach loads the guests with Guest(**row)")
    print("-" * 52)
    for guest in guests:
        try:
            print(" ", guest)
        except Exception as error:
            return ("HINT: print(" + guest.name.lower() + ") stopped with: " + type(error).__name__
                    + ": " + str(error) + "\n  __str__ must return a str, made from self.name, "
                    "self.kcal_target and so on.")
    print("-" * 52)

    # STEP 2: the allows table
    print("STEP 2, THE CHECK: may each guest eat each recipe?")
    print(f"{'':<20}" + "".join(f"{guest.name:<7}" for guest in guests))
    wrong = []
    for recipe in recipes:
        row = f"  {recipe.name:<18}"
        for guest in guests:
            try:
                answer = guest.allows(recipe)
            except Exception as error:
                return ("HINT: " + guest.name.lower() + ".allows(...) stopped with: " + type(error).__name__
                        + ": " + str(error) + "\n  Use self.vegetarian for the guest and recipe.vegetarian "
                        "for the recipe.")
            if answer is not True and answer is not False:
                return ("HINT: allows() gave back " + repr(answer) + ". It must return True or False. "
                        "Check that every path ends with  return True  or  return False.")
            row += f"{'✓' if answer else '✗':<7}"
            should = recipe.name not in NOT_ALLOWED[guest.name]
            if answer != should:
                wrong.append((guest, recipe, answer))
        print(row)
    print("-" * 52)

    if wrong:
        guest, recipe, answer = wrong[0]
        if answer:
            why = ("vegetarian, and the " + recipe.name + " has meat") if guest.vegetarian and not recipe.vegetarian \
                else ("gluten-free, and the " + recipe.name + " has gluten")
            return ("HINT: " + guest.name + " is " + why + ", but allows() said True.\n  Add the rule:  if self."
                    + ("vegetarian and not recipe.vegetarian" if "meat" in why else "gluten_free and not recipe.gluten_free")
                    + ":  return False")
        return ("HINT: allows() said False for " + guest.name + " and the " + recipe.name + ", but "
                + guest.name + " may eat it.\n  Each rule needs BOTH parts, joined with and: the guest's "
                "rule, and the recipe breaking it. For example  self.vegetarian and not recipe.vegetarian")

    # a guest who is both vegetarian and gluten-free
    dev = Guest("Dev", 2200, 90, vegetarian=True, gluten_free=True)
    dev_ok = [recipe.name for recipe in recipes if dev.allows(recipe)]
    if dev_ok != ["lentil soup", "bean chili", "rice pudding", "yogurt bowl"]:
        return ("HINT: Dev is vegetarian AND gluten-free, so Dev may only eat lentil soup, bean chili, "
                "rice pudding and yogurt bowl. Your allows() gives: " + ", ".join(dev_ok) + ".\n  Check both "
                "rules one after the other, and only return True at the very end.")

    # the one-line cards
    for name, want_card in CARDS.items():
        got = str(by_name[name])
        if got != want_card:
            return ("HINT: print(" + name.lower() + ") should show\n    " + want_card + "\n  but it shows\n    "
                    + got + "\n  Start with  text = f\"{self.name}: {self.kcal_target} kcal, "
                    "{self.protein_target} g protein\"  then add the rules.")
    want_dev = "Dev: 2200 kcal, 90 g protein, vegetarian, gluten-free"
    if str(dev) != want_dev:
        return ("HINT: A guest who is both should show\n    " + want_dev + "\n  but shows\n    " + str(dev)
                + "\n  Use two separate ifs, one for each rule, so both can be added.")

    return ("PASS: The rules live on Guest now. Ben skips the chicken rice bowl, Chloe skips the tofu "
            "stir-fry and the pasta bake, and every guest prints a friendly one-line card.")


verdict = _check()
print(verdict)
