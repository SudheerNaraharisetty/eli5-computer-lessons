# Lesson 77 exercise: Dinner cards
#
# Kitchen Coach prints two things before dinner: the numbered steps of
# Chloe's gluten-free pancakes, and a place card for each guest.
# Finish the three functions between START and END. Each one RETURNS
# its answer (lesson 45). The check calls them with other lists too.
#
# 1. numbered_steps(steps)
#      Return a list of lines, numbered from 1, like:
#        ["Step 1: Whisk rice flour and milk", "Step 2: Beat in 2 eggs", ...]
#      Use enumerate(steps, start=1). No range(len(...)).
#
# 2. place_cards(guests, meals)
#      Return one card per guest, paired by position, like:
#        ["Ana: pasta", "Ben: bean chili", "Chloe: pancakes"]
#      Use zip(guests, meals, strict=True), so a guest with no meal
#      stops the program with a ValueError instead of being dropped.
#
# 3. calorie_targets(guests, kcal)
#      Return a dict from each name to its number, like:
#        {"Ana": 2600, "Ben": 2400, "Chloe": 2000}
#      Use dict(zip(...)).
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l77_dinner_cards.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your functions run with tonight's lists, and you see what
#   they return.
# - STEP 2, THE CHECK. They run again with other lists, and with a guest
#   who has no meal. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
def numbered_steps(steps):
    lines = []
    for i in range(len(steps)):
        lines.append(f"Step {i}: {steps[i]}")
    return lines


def place_cards(guests, meals):
    cards = []
    for i in range(len(guests)):
        cards.append(f"{guests[i]}: {meals[i]}")
    return cards


def calorie_targets(guests, kcal):
    targets = {}
    # build the dict with dict(zip(...)) and return it
    return targets

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your functions from between
# START and END, shows what they return, then tries them with other lists.
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
                + "  Check the colons, the brackets and the spaces at the start of the lines.")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    for name in ["numbered_steps", "place_cards", "calorie_targets"]:
        if not callable(ns.get(name)):
            return "HINT: Keep the line  def " + name + "(...):  The check calls that function."

    # Which tools does each function use? Look inside each def.
    uses = {}
    for node in tree.body:
        if isinstance(node, ast.FunctionDef):
            names = set()
            for sub in ast.walk(node):
                if isinstance(sub, ast.Call) and isinstance(sub.func, ast.Name):
                    names.add(sub.func.id)
                    if sub.func.id == "zip" and any(k.arg == "strict" for k in sub.keywords):
                        names.add("zip-strict")
            uses[node.name] = names

    def call(fn, *args):
        try:
            return fn(*args), None
        except Exception as error:
            return None, type(error).__name__ + ": " + str(error)

    steps = ["Whisk rice flour and milk", "Beat in 2 eggs", "Rest the batter 10 minutes", "Fry 2 minutes a side"]
    guests = ["Ana", "Ben", "Chloe"]
    meals = ["pasta", "bean chili", "pancakes"]
    kcal = [2600, 2400, 2000]

    print("STEP 1: what your functions return for tonight")
    print("-" * 50)
    for label, fn, args in [("numbered_steps(steps)", ns["numbered_steps"], (steps,)),
                            ("place_cards(guests, meals)", ns["place_cards"], (guests, meals)),
                            ("calorie_targets(guests, kcal)", ns["calorie_targets"], (guests, kcal))]:
        value, err = call(fn, *args)
        print(label)
        print("   ", value if err is None else "stopped with " + err)
    print("-" * 50)
    print("STEP 2, THE CHECK")

    # Part 1: numbered steps
    for lst in [steps, ["Boil water", "Add pasta"], []]:
        want = [f"Step {n}: {s}" for n, s in enumerate(lst, start=1)]
        got, err = call(ns["numbered_steps"], lst)
        if err:
            return "HINT: numbered_steps stopped with " + err
        if got != want:
            if got and isinstance(got, list) and str(got[0]).startswith("Step 0"):
                return ("HINT: numbered_steps starts at Step 0. Nobody cooks step 0. Use  "
                        "for number, step in enumerate(steps, start=1):")
            return ("HINT: numbered_steps(" + repr(lst) + ") should return\n  " + repr(want)
                    + "\nIt returned\n  " + repr(got))
    if "enumerate" not in uses.get("numbered_steps", set()):
        return ("HINT: numbered_steps gives the right lines. Now write it with enumerate(steps, start=1), "
                "so there is no index to get wrong.")

    # Part 2: place cards
    for g, m in [(guests, meals), (["Dev", "Ana"], ["soup", "rice"])]:
        want = [f"{a}: {b}" for a, b in zip(g, m)]
        got, err = call(ns["place_cards"], g, m)
        if err and "keyword" in err:
            return ("HINT: This Python is too old for strict=True (it came in Python 3.10). "
                    "Run the file with the Python 3.15 from lesson 2.")
        if err:
            return "HINT: place_cards(" + repr(g) + ", " + repr(m) + ") stopped with " + err
        if got != want:
            return ("HINT: place_cards(" + repr(g) + ", " + repr(m) + ") should return\n  "
                    + repr(want) + "\nIt returned\n  " + repr(got))
    got, err = call(ns["place_cards"], guests + ["Dev"], meals)
    if err is None:
        return ("HINT: With 4 guests and 3 meals, place_cards returned " + repr(got)
                + ". Dev has no meal, and nobody noticed. Use zip(guests, meals, strict=True).")
    if not err.startswith("ValueError"):
        return ("HINT: With 4 guests and 3 meals, place_cards stopped with " + err
                + ". Use zip(guests, meals, strict=True): it pairs by position, and a missing meal "
                "gives a clear ValueError.")
    if "zip" not in uses.get("place_cards", set()):
        return "HINT: place_cards works. Now write it with zip(guests, meals, strict=True)."

    # Part 3: calorie targets
    for g, k in [(guests, kcal), (["Dev"], [2200])]:
        want = dict(zip(g, k))
        got, err = call(ns["calorie_targets"], g, k)
        if err:
            return "HINT: calorie_targets stopped with " + err
        if got != want:
            return ("HINT: calorie_targets(" + repr(g) + ", " + repr(k) + ") should return\n  "
                    + repr(want) + "\nIt returned\n  " + repr(got)
                    + "\nTry  return dict(zip(guests, kcal))")

    return ("PASS: The steps are numbered from 1, every guest gets a card, a missing meal is loud, "
            "and Kitchen Coach knows everyone's calories. enumerate numbers things. zip pairs things.")


verdict = _check()
print(verdict)
