# Lesson 103 exercise: The walking skeleton
#
# This is the first walking skeleton of Kitchen Coach, all in one file.
# Every piece is here: the data, the rules, the planner and the printing.
# Each function has a docstring that says its ONE job. Two of them are
# still stubs:
#
#   1. allows(guest, recipe) only raises NotImplementedError, the error
#      that means "this card is not written yet". Write it:
#        - a vegetarian guest may only eat vegetarian recipes
#        - a gluten-free guest may only eat gluten-free recipes
#        - otherwise the answer is True
#      Return True or False.
#
#   2. plan_day(guest, recipes, max_meals=3) is a placeholder: it gives
#      back an empty plan. Make a first simple version: go through the
#      recipes in the order of the list, keep each one the guest allows,
#      and stop when you have max_meals of them. Return the list of
#      recipes (the dicts, not just their names).
#
# Leave the rest as it is. It is already wired end to end: main() plans
# a day for Ana, Ben and Chloe and prints it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l103_skeleton.py
#
# The check at the bottom runs the skeleton from start to end, then tests
# your two functions with its own guests and recipes too. It says PASS,
# or gives you one hint. This file was checked with Python 3.14 and 3.15.

# In the real project this data lives in data/guests.json and
# data/recipes.json. Here it sits in the file, so it runs anywhere.
GUESTS = [
    {"name": "Ana", "kcal_target": 2600, "protein_target": 100, "vegetarian": False, "gluten_free": False},
    {"name": "Ben", "kcal_target": 2400, "protein_target": 140, "vegetarian": True, "gluten_free": False},
    {"name": "Chloe", "kcal_target": 2000, "protein_target": 75, "vegetarian": False, "gluten_free": True},
]

RECIPES = [
    {"name": "lentil soup", "kcal": 320, "protein": 18, "vegetarian": True, "gluten_free": True},
    {"name": "tofu stir-fry", "kcal": 350, "protein": 24, "vegetarian": True, "gluten_free": False},
    {"name": "pasta bake", "kcal": 610, "protein": 22, "vegetarian": True, "gluten_free": False},
    {"name": "bean chili", "kcal": 380, "protein": 15, "vegetarian": True, "gluten_free": True},
    {"name": "chicken rice bowl", "kcal": 650, "protein": 40, "vegetarian": False, "gluten_free": True},
    {"name": "rice pudding", "kcal": 300, "protein": 8, "vegetarian": True, "gluten_free": True},
    {"name": "yogurt bowl", "kcal": 250, "protein": 20, "vegetarian": True, "gluten_free": True},
]


# >>> START: change the lines below this line
def allows(guest, recipe):
    """True if this guest may eat this recipe (vegetarian, gluten-free)."""
    raise NotImplementedError("allows() is not written yet")


def plan_day(guest, recipes, max_meals=3):
    """Pick up to max_meals recipes the guest allows, in list order."""
    return []  # placeholder: an empty plan
# <<< END: change the lines above this line


def show(guest, meals):
    """Print one guest's plan, with kcal and protein against the goal."""
    names = ", ".join([recipe["name"] for recipe in meals]) or "(nothing yet)"
    kcal = sum([recipe["kcal"] for recipe in meals])
    protein = sum([recipe["protein"] for recipe in meals])
    print(f"{guest['name']}: {names}")
    print(f"    {kcal} / {guest['kcal_target']} kcal, {protein} / {guest['protein_target']} g protein")


def main():
    """Read, plan, print: the whole program, end to end."""
    for guest in GUESTS:
        show(guest, plan_day(guest, RECIPES))


# ===== THE CHECK =====
# You do not need to read this part yet.
def _names(meals):
    return [recipe["name"] for recipe in meals]


def _rule(guest, recipe):
    if guest["vegetarian"] and not recipe["vegetarian"]:
        return False
    return not (guest["gluten_free"] and not recipe["gluten_free"])


def _check():
    print("Running the skeleton end to end:")
    try:
        main()
    except NotImplementedError:
        raise  # a stub: the hint at the very bottom explains it
    except TypeError as error:
        if "string indices" in str(error):
            return (
                "HINT: show() got a name where it wanted a recipe dict. "
                "Append the whole recipe to the plan, not recipe['name']."
            )
        return f"HINT: the skeleton stopped with TypeError: {error}"
    except Exception as error:  # noqa: BLE001  any error becomes a hint
        return f"HINT: the skeleton stopped with {type(error).__name__}: {error}"
    print()

    # allows(): every guest with every recipe, plus a guest who is both.
    both = {"name": "Dev", "kcal_target": 2200, "protein_target": 90, "vegetarian": True, "gluten_free": True}
    for guest in [*GUESTS, both]:
        for recipe in RECIPES:
            answer = allows(guest, recipe)
            if answer is None:
                return "HINT: allows() gave back None. Every path needs a return: True or False."
            if answer != _rule(guest, recipe):
                why = []
                if guest["vegetarian"]:
                    why.append("vegetarian")
                if guest["gluten_free"]:
                    why.append("gluten-free")
                rules = " and ".join(why) if why else "no rules at all"
                return (
                    f"HINT: allows() says {answer} for {guest['name']} and {recipe['name']}. "
                    f"{guest['name']} is {rules}, and {recipe['name']} is "
                    f"vegetarian={recipe['vegetarian']}, gluten_free={recipe['gluten_free']}. "
                    f"It should be {_rule(guest, recipe)}."
                )

    # plan_day(): the real guests, then other lists, so typed-in answers do not pass.
    for guest in GUESTS:
        meals = plan_day(guest, RECIPES)
        if not isinstance(meals, list):
            return f"HINT: plan_day() should give back a list of recipes, but gave {meals!r}."
        if not meals:
            return (
                f"HINT: {guest['name']} still gets an empty plan. Loop over the recipes, "
                "append each one allows() says yes to, and return the list."
            )
        if not all(isinstance(m, dict) for m in meals):
            return "HINT: put the recipe dicts in the list, not their names. show() reads recipe['name'] itself."
        names = _names(meals)
        if guest["name"] == "Ben" and "chicken rice bowl" in names:
            return "HINT: Ben got the chicken rice bowl, but he is vegetarian. Does plan_day() ask allows()?"
        if guest["name"] == "Chloe" and ({"pasta bake", "tofu stir-fry"} & set(names)):
            return "HINT: Chloe got pasta or tofu stir-fry, and both have gluten. Does plan_day() ask allows()?"
        if len(meals) > 3:
            return f"HINT: {guest['name']} got {len(meals)} meals. Stop at max_meals (3)."
        wanted = [r["name"] for r in RECIPES if _rule(guest, r)][:3]
        if names != wanted:
            return (
                f"HINT: {guest['name']} got {names}, but the first 3 recipes "
                f"{guest['name']} allows, in list order, are {wanted}."
            )
    two = plan_day(GUESTS[2], RECIPES, max_meals=2)
    if _names(two) != ["lentil soup", "bean chili"]:
        return f"HINT: plan_day(chloe, recipes, max_meals=2) gave {_names(two)}. Use max_meals, not the number 3."
    backwards = list(reversed(RECIPES))
    ben_back = _names(plan_day(GUESTS[1], backwards))
    if ben_back != ["yogurt bowl", "rice pudding", "bean chili"]:
        return f"HINT: with the recipe list backwards, Ben got {ben_back}. Go through the list you are given, in its order."

    return (
        "PASS: the skeleton runs end to end. Ben gets no chicken, Chloe gets no "
        "pasta or tofu, and nobody gets more than 3 meals. Lesson 106 makes plan_day() "
        "smart: kcal goals, protein first, and the pantry."
    )


if __name__ == "__main__":
    try:
        print(_check())
    except NotImplementedError as error:
        print(
            f"HINT: allows() stopped with NotImplementedError: {error}. "
            "That is the stub doing its job: it says what is not written yet. "
            "Replace the raise line in allows() with two if checks and return True or False."
        )
