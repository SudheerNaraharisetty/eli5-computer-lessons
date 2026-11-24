# Lesson 80 exercise: Sticky notes
#
# Kitchen Coach sorts tonight's dishes three ways. Each dish is a dict with
# a name, its protein in grams, its kcal and whether it is gluten-free.
# Finish the three functions between START and END. Each one RETURNS its
# answer (lesson 45), and each one uses a lambda as its key.
#
# 1. lightest_first(dishes)
#      Return a NEW list of the dishes, smallest kcal first.
#      Use sorted(dishes, key=lambda d: ...).
#
# 2. bens_pick(dishes)
#      Return the ONE dish (the whole dict) with the most protein.
#      Use max(dishes, key=lambda d: ...).
#
# 3. gluten_free_first(dishes)
#      Return a NEW list with the gluten-free dishes first, for Chloe.
#      Hint: a lambda can hold a one-line choice:  0 if ... else 1
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l80_sticky_notes.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your functions run with tonight's dishes, and you see the
#   names they give back.
# - STEP 2, THE CHECK. They run again with another menu. It says PASS,
#   or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
def lightest_first(dishes):
    return dishes          # sort them by kcal with a lambda


def bens_pick(dishes):
    return dishes[0]       # use max with a lambda


def gluten_free_first(dishes):
    return dishes          # gluten-free first, with a lambda

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your functions from between
# START and END, shows what they return, then tries them with another menu.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  A lambda holds one expression: lambda d: d[\"kcal\"]")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    names = ["lightest_first", "bens_pick", "gluten_free_first"]
    for name in names:
        if not callable(ns.get(name)):
            return "HINT: Keep the line  def " + name + "(dishes):  The check calls that function."

    # Which calls use key=lambda inside each def?
    uses = {}
    for node in tree.body:
        if isinstance(node, ast.FunctionDef):
            found = set()
            for sub in ast.walk(node):
                if isinstance(sub, ast.Call):
                    fn = sub.func.id if isinstance(sub.func, ast.Name) else getattr(sub.func, "attr", "")
                    for k in sub.keywords:
                        if k.arg == "key" and isinstance(k.value, ast.Lambda):
                            found.add(fn)
            uses[node.name] = found

    def call(fn, dishes):
        copy = [dict(d) for d in dishes]
        try:
            return fn(copy), None
        except Exception as error:
            return None, type(error).__name__ + ": " + str(error)

    def show(value):
        if isinstance(value, list):
            return [d.get("name") if isinstance(d, dict) else d for d in value]
        if isinstance(value, dict):
            return value.get("name")
        return value

    tonight = [
        {"name": "lentil soup", "protein": 18, "kcal": 320, "gluten_free": True},
        {"name": "tofu stir-fry", "protein": 24, "kcal": 350, "gluten_free": False},
        {"name": "pasta bake", "protein": 22, "kcal": 610, "gluten_free": False},
        {"name": "bean chili", "protein": 15, "kcal": 380, "gluten_free": True},
    ]
    sunday = [
        {"name": "rye toast", "protein": 9, "kcal": 290, "gluten_free": False},
        {"name": "omelette", "protein": 20, "kcal": 300, "gluten_free": True},
        {"name": "rice bowl", "protein": 12, "kcal": 540, "gluten_free": True},
        {"name": "seitan wrap", "protein": 31, "kcal": 470, "gluten_free": False},
        {"name": "fruit salad", "protein": 2, "kcal": 150, "gluten_free": True},
    ]

    print("STEP 1: what your functions give back for tonight")
    print("-" * 50)
    for name in names:
        value, err = call(ns[name], tonight)
        print(name + "(dishes)")
        print("   ", show(value) if err is None else "stopped with " + err)
    print("-" * 50)
    print("STEP 2, THE CHECK")

    for menu in [tonight, sunday]:
        # 1. lightest first
        want = sorted(menu, key=lambda d: d["kcal"])
        got, err = call(ns["lightest_first"], menu)
        if err:
            return "HINT: lightest_first stopped with " + err
        if got is None:
            return "HINT: lightest_first gave back None. Use sorted(...), not .sort(), and return it."
        if got != want:
            if got == sorted(menu, key=lambda d: d["kcal"], reverse=True):
                return "HINT: lightest_first puts the biggest first. Smallest first means no reverse=True."
            return ("HINT: lightest_first should give " + repr(show(want)) + "\nIt gave "
                    + repr(show(got)) + "\nTry  return sorted(dishes, key=lambda d: d[\"kcal\"])")

        # 2. Ben's pick
        want = max(menu, key=lambda d: d["protein"])
        got, err = call(ns["bens_pick"], menu)
        if err:
            return "HINT: bens_pick stopped with " + err
        if got != want:
            if isinstance(got, (int, float)):
                return ("HINT: bens_pick gave back the number " + repr(got)
                        + ". Return the whole dish: max(dishes, key=lambda d: d[\"protein\"])")
            return ("HINT: bens_pick should give the " + repr(want["name"]) + " dish. It gave "
                    + repr(show(got)) + ".  Try  return max(dishes, key=lambda d: d[\"protein\"])")

        # 3. gluten-free first
        got, err = call(ns["gluten_free_first"], menu)
        if err:
            return "HINT: gluten_free_first stopped with " + err
        want = sorted(menu, key=lambda d: 0 if d["gluten_free"] else 1)
        if got != want:
            if got == sorted(menu, key=lambda d: 1 if d["gluten_free"] else 0):
                return ("HINT: gluten_free_first puts the gluten dishes first. Give gluten-free "
                        "dishes the 0: lambda d: 0 if d[\"gluten_free\"] else 1")
            return ("HINT: gluten_free_first should give " + repr(show(want)) + "\nIt gave "
                    + repr(show(got)) + "\nTry  key=lambda d: 0 if d[\"gluten_free\"] else 1")

    for name, tool in [("lightest_first", "sorted"), ("bens_pick", "max"), ("gluten_free_first", "sorted")]:
        if not uses.get(name):
            return ("HINT: " + name + " gives the right answer. Now write it with " + tool
                    + "(dishes, key=lambda d: ...), so the rule sits right where it is used.")

    return ("PASS: Lightest first, Ben's tofu stir-fry, and Chloe's gluten-free dishes up front. "
            "Three sticky notes, no extra recipe cards.")


verdict = _check()
print(verdict)
