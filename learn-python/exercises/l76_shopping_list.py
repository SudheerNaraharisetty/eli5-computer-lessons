# Lesson 76 exercise: Chloe's shopping list
#
# Kitchen Coach keeps the pantry as a list of dicts (below). Each item has
# a name, the grams in the jar, True or False for gluten-free, and the kcal
# in 100 g.
#
# Write THREE comprehensions, one line each. Replace each None:
#
#   1. gluten_free_names   the names of the gluten-free items
#                            ['rice', 'lentils', 'tofu', 'spinach']
#   2. kilograms           the kilograms of EVERY item (grams / 1000)
#                            [0.75, 0.5, 0.4, 0.3, 0.2, 0.15]
#   3. high_kcal           a DICT of name: kcal, only for the items with
#                          more than 100 kcal
#                            {'rice': 360, 'pasta': 371, 'lentils': 352, 'rye bread': 259}
#
# Remember the order: what, for each, which.
#   [what for item in pantry if which]
#   {key: value for item in pantry if which}
# Each item is a dict, so write item["name"], item["grams"] and so on.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l76_shopping_list.py
#
# What happens when you run it, in two steps:
# - STEP 1. It prints what each of your three names holds.
# - STEP 2, THE CHECK. It also tries your lines on a second pantry.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

pantry = [
    {"name": "rice", "grams": 750, "gluten_free": True, "kcal": 360},
    {"name": "pasta", "grams": 500, "gluten_free": False, "kcal": 371},
    {"name": "lentils", "grams": 400, "gluten_free": True, "kcal": 352},
    {"name": "rye bread", "grams": 300, "gluten_free": False, "kcal": 259},
    {"name": "tofu", "grams": 200, "gluten_free": True, "kcal": 76},
    {"name": "spinach", "grams": 150, "gluten_free": True, "kcal": 23},
]

# >>> START: write your three comprehensions below this line
gluten_free_names = None

kilograms = None

high_kcal = None
# <<< END: write your three comprehensions above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them on the pantry above, then on a second pantry.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your comprehensions between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    pantry_code = "pantry = [" + source.split("\npantry = [", 1)[1].split(start, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        hint = ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets, the colons and the quotes.")
        if "else" in str(error.text or ""):
            hint += "  An if after the for is a filter and has no else."
        return hint

    def run(pantry):
        ns = {"pantry": pantry}
        try:
            exec(compile(your_code, "your lines", "exec"), ns)
        except KeyError as error:
            return None, ("HINT: Python stopped with KeyError: " + str(error)
                          + "  Use the keys exactly as in the pantry: \"name\", \"grams\", \"gluten_free\", \"kcal\".")
        except Exception as error:
            return None, "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
        return ns, None

    first = {}
    exec(pantry_code, first)
    ns, err = run(first["pantry"])
    print("STEP 1: what your names hold")
    print("-" * 60)
    if ns is not None:
        for name in ["gluten_free_names", "kilograms", "high_kcal"]:
            print(f"  {name:<18} {ns.get(name)!r}")
    print("-" * 60)
    print("STEP 2, THE CHECK")
    if err:
        return err

    # Which kind of comprehension is assigned to each name?
    kinds = {}
    for node in tree.body:
        if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            kinds[node.targets[0].id] = type(node.value).__name__

    second = [
        {"name": "quinoa", "grams": 600, "gluten_free": True, "kcal": 368},
        {"name": "couscous", "grams": 250, "gluten_free": False, "kcal": 376},
        {"name": "apples", "grams": 1200, "gluten_free": True, "kcal": 52},
        {"name": "barley", "grams": 350, "gluten_free": False, "kcal": 100},
    ]

    # 1. gluten-free names
    want1 = [i["name"] for i in first["pantry"] if i["gluten_free"]]
    got1 = ns.get("gluten_free_names")
    if got1 is None:
        return ("HINT: gluten_free_names is still None. Write  [what for item in pantry if which]  "
                "The what is item[\"name\"]. The which is item[\"gluten_free\"].")
    if kinds.get("gluten_free_names") != "ListComp":
        return "HINT: Build gluten_free_names with a list comprehension, in square brackets, all on one line."
    if got1 != want1:
        if got1 == [i["name"] for i in first["pantry"]]:
            return "HINT: gluten_free_names has every item, pasta and rye bread too. Add the filter at the end: if item[\"gluten_free\"]"
        if isinstance(got1, list) and got1 and isinstance(got1[0], dict):
            return "HINT: gluten_free_names holds whole dicts. Put item[\"name\"] at the front, so only the names go on the list."
        return f"HINT: gluten_free_names is {got1!r}. It should be {want1!r}."

    # 2. kilograms
    want2 = [i["grams"] / 1000 for i in first["pantry"]]
    got2 = ns.get("kilograms")
    if got2 is None:
        return ("HINT: Part 1 is right. kilograms is still None. Write  [item[\"grams\"] / 1000 for item in pantry]  "
                "No if this time: every item.")
    if kinds.get("kilograms") != "ListComp":
        return "HINT: Build kilograms with a list comprehension, in square brackets."
    if got2 != want2:
        if isinstance(got2, list) and len(got2) < len(want2):
            return "HINT: kilograms is missing some items. It needs EVERY item, so leave out the if."
        if got2 == [i["grams"] * 1000 for i in first["pantry"]] or got2 == [i["grams"] for i in first["pantry"]]:
            return "HINT: kilograms holds the wrong numbers. 750 grams is 0.75 kg: divide by 1000."
        return f"HINT: kilograms is {got2!r}. It should be {want2!r}."

    # 3. high_kcal
    want3 = {i["name"]: i["kcal"] for i in first["pantry"] if i["kcal"] > 100}
    got3 = ns.get("high_kcal")
    if got3 is None:
        return ("HINT: Parts 1 and 2 are right. high_kcal is still None. A dict comprehension uses curly brackets and "
                "key: value at the front:  {item[\"name\"]: item[\"kcal\"] for item in pantry if ...}")
    if kinds.get("high_kcal") != "DictComp":
        if kinds.get("high_kcal") == "SetComp":
            return "HINT: high_kcal is a set. Put key: value at the front, with a colon, to make a dict."
        return "HINT: Build high_kcal with a dict comprehension: {key: value for item in pantry if ...}"
    if got3 != want3:
        if isinstance(got3, dict) and len(got3) == len(first["pantry"]):
            return "HINT: high_kcal has every item, tofu and spinach too. Add the filter: if item[\"kcal\"] > 100"
        return f"HINT: high_kcal is {got3!r}. It should be {want3!r}."

    # The same lines on a second pantry
    ns2, err = run(second)
    if err:
        return err
    if ns2.get("gluten_free_names") != ["quinoa", "apples"]:
        return "HINT: On a second pantry, gluten_free_names is wrong. Loop over pantry, not over a list you typed in."
    if ns2.get("kilograms") != [0.6, 0.25, 1.2, 0.35]:
        return "HINT: On a second pantry, kilograms is wrong. Use item[\"grams\"] / 1000 for every item in pantry."
    if ns2.get("high_kcal") != {"quinoa": 368, "couscous": 376}:
        return ("HINT: On a second pantry, high_kcal is wrong. Barley has exactly 100 kcal, and 100 is not MORE than 100: "
                "use > 100, not >= 100.")
    if first["pantry"] != [dict(i) for i in first["pantry"]] or len(first["pantry"]) != 6:
        return "HINT: Leave the pantry as it is. A comprehension builds a new list and never changes the old one."

    return ("PASS: Three comprehensions, three lines: what, for each, which. Chloe's list, the kilograms "
            "to carry, and the high-kcal rack. Next: enumerate and zip.")


verdict = _check()
print(verdict)
