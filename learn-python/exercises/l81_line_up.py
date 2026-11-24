# Lesson 81 exercise: Line up
#
# Kitchen Coach gets tonight's dishes in SERVING order. That order must stay
# as it is: it is the plan for the evening. Each dish is a dict with a name,
# its protein in grams, its kcal and whether it is gluten-free.
# Finish the three functions between START and END. Each one RETURNS its
# answer (lesson 45).
#
# 1. ben_ranking(dishes)
#      Return a NEW list of the dishes, most protein first, for Ben.
#      The serving order in `dishes` must not change. sorted() or .sort()?
#
# 2. chloe_safe(dishes)
#      Return a LIST of only the gluten-free dishes, for Chloe.
#      Use filter(...). Remember what filter hands back.
#
# 3. loud_names(dishes)
#      Return a LIST of the dish names in capitals, for the menu board:
#      "BEAN CHILI", "TOFU STIR-FRY", ...
#      Use map(...) with str.upper, the recipe card behind "pasta".upper().
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l81_line_up.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your functions run with tonight's dishes, and you see what
#   they give back, and the serving order after them.
# - STEP 2, THE CHECK. They run again with another menu. It says PASS,
#   or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
def ben_ranking(dishes):
    dishes.sort(key=lambda d: d["protein"], reverse=True)
    return dishes          # right order... but look at the serving order


def chloe_safe(dishes):
    return filter(lambda d: d["gluten_free"], dishes)


def loud_names(dishes):
    names = [d["name"] for d in dishes]
    return names           # use map with str.upper

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
        return "HINT: Python could not read your lines: " + str(error)

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    names = ["ben_ranking", "chloe_safe", "loud_names"]
    for name in names:
        if not callable(ns.get(name)):
            return "HINT: Keep the line  def " + name + "(dishes):  The check calls that function."

    # Which built-in tools does each def call?
    calls = {}
    for node in tree.body:
        if isinstance(node, ast.FunctionDef):
            found = set()
            for sub in ast.walk(node):
                if isinstance(sub, ast.Call):
                    if isinstance(sub.func, ast.Name):
                        found.add(sub.func.id)
                    elif isinstance(sub.func, ast.Attribute):
                        found.add("." + sub.func.attr)
            calls[node.name] = found

    def call(fn, dishes):
        try:
            return fn(dishes), None
        except Exception as error:
            return None, type(error).__name__ + ": " + str(error)

    def show(value):
        if isinstance(value, list):
            return [d.get("name") if isinstance(d, dict) else d for d in value]
        return value

    def order(dishes):
        return [d["name"] for d in dishes]

    def tonight():
        return [
            {"name": "bean chili", "protein": 15, "kcal": 380, "gluten_free": True},
            {"name": "tofu stir-fry", "protein": 24, "kcal": 350, "gluten_free": False},
            {"name": "lentil soup", "protein": 18, "kcal": 320, "gluten_free": True},
            {"name": "pasta bake", "protein": 22, "kcal": 610, "gluten_free": False},
        ]

    def sunday():
        return [
            {"name": "rye toast", "protein": 9, "kcal": 290, "gluten_free": False},
            {"name": "omelette", "protein": 20, "kcal": 300, "gluten_free": True},
            {"name": "rice bowl", "protein": 12, "kcal": 540, "gluten_free": True},
            {"name": "seitan wrap", "protein": 31, "kcal": 470, "gluten_free": False},
            {"name": "fruit salad", "protein": 2, "kcal": 150, "gluten_free": True},
        ]

    print("STEP 1: what your functions give back for tonight")
    print("-" * 56)
    for name in names:
        menu = tonight()
        value, err = call(ns[name], menu)
        print(name + "(dishes)")
        print("    gives:", show(value) if err is None else "stopped with " + err)
        print("    serving order after it:", order(menu))
    print("-" * 56)
    print("STEP 2, THE CHECK")

    for make in [tonight, sunday]:
        # 1. Ben's ranking: a new list, the serving order untouched
        menu = make()
        before = order(menu)
        want = order(sorted(menu, key=lambda d: d["protein"], reverse=True))
        got, err = call(ns["ben_ranking"], menu)
        if err:
            return "HINT: ben_ranking stopped with " + err
        if got is None:
            return ("HINT: ben_ranking gave back None. .sort() hands back None (lesson 34).\n"
                    "Use sorted(dishes, key=..., reverse=True) and return what it gives.")
        if not isinstance(got, list):
            return "HINT: ben_ranking should give back a list. It gave " + type(got).__name__ + "."
        if order(menu) != before:
            return ("HINT: ben_ranking changed the serving order! After it, dishes is "
                    + repr(order(menu)) + "\n.sort() changes the list itself. "
                    "sorted(dishes, ...) makes a NEW list and leaves dishes alone.")
        if show(got) != want:
            if show(got) == want[::-1]:
                return "HINT: ben_ranking puts the least protein first. Ben wants the most first: reverse=True."
            return ("HINT: ben_ranking should give " + repr(want) + "\nIt gave " + repr(show(got))
                    + "\nTry  return sorted(dishes, key=lambda d: d[\"protein\"], reverse=True)")
        if got is menu:
            return "HINT: ben_ranking handed back the same list it got. Return a NEW list with sorted()."

        # 2. Chloe's gluten-free dishes, as a list
        menu = make()
        want = [d["name"] for d in menu if d["gluten_free"]]
        got, err = call(ns["chloe_safe"], menu)
        if err:
            return "HINT: chloe_safe stopped with " + err
        if type(got).__name__ == "filter":
            return ("HINT: chloe_safe gave back a filter object, not a list. filter is lazy:\n"
                    "wrap it in list(...):  return list(filter(lambda d: d[\"gluten_free\"], dishes))")
        if not isinstance(got, list):
            return "HINT: chloe_safe should give back a list. It gave " + type(got).__name__ + "."
        if show(got) != want:
            return ("HINT: chloe_safe should give " + repr(want) + "\nIt gave " + repr(show(got))
                    + "\nfilter keeps a dish when the function says True: lambda d: d[\"gluten_free\"]")

        # 3. Loud names, as a list
        menu = make()
        want = [d["name"].upper() for d in menu]
        got, err = call(ns["loud_names"], menu)
        if err:
            return "HINT: loud_names stopped with " + err
        if type(got).__name__ == "map":
            return "HINT: loud_names gave back a map object, not a list. Wrap it in list(...)."
        if not isinstance(got, list):
            return "HINT: loud_names should give back a list. It gave " + type(got).__name__ + "."
        if got != want:
            return ("HINT: loud_names should give " + repr(want) + "\nIt gave " + repr(got)
                    + "\nTry  return list(map(str.upper, names))")

    if "filter" not in calls.get("chloe_safe", set()):
        return "HINT: chloe_safe gives the right list. Now write it with filter(...), the tool from this lesson."
    if "map" not in calls.get("loud_names", set()):
        return "HINT: loud_names gives the right list. Now write it with map(str.upper, names)."

    return ("PASS: Ben's ranking is a new list, Chloe's dishes made it through the sieve, "
            "the menu board is in capitals, and the serving order never moved.")


verdict = _check()
print(verdict)
