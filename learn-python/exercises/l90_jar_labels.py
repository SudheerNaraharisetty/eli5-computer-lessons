# Lesson 90 exercise: Label Kitchen Coach's cards
#
# Three of Kitchen Coach's functions have no labels yet. Add type hints to
# their def lines: a hint after EVERY parameter, and a return hint after
# the brackets.
#
#   def daily_kcal(meals: list[int]) -> int:      <- this is the shape
#
# What goes in and what comes out is written above each function.
# You only need these: list[int]   dict[str, int]   str   int   int | None
#
# Change only the three def lines. Do not change what the functions do.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l90_jar_labels.py
# - Installed mypy in this lesson? Also try:  python3 -m mypy l90_jar_labels.py
#
# What happens when you run it, in two steps:
# - STEP 1. The check reads your labels with typing.get_type_hints.
# - STEP 2. It runs the three functions for Ana, Ben and Chloe.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: add the labels below this line

# meals is a list of whole numbers (kcal). It hands back one whole number.
def daily_kcal(meals):
    return sum(meals)


# goal and eaten are whole numbers (grams). It hands back a whole number.
def protein_left(goal, eaten):
    return max(goal - eaten, 0)


# pantry maps text to whole numbers (grams), item is text.
# It hands back a whole number, or None when the item is not in the pantry.
def stock_of(pantry, item):
    return pantry.get(item)

# <<< END: add the labels above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, reads the labels, then runs the functions.
def _check():
    import ast
    import typing

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Change the def lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "\n  A def line with labels looks like  def daily_kcal(meals: list[int]) -> int:"
                + "\n  The arrow goes after the closing bracket, and the line still ends with a colon.")

    ns = {"__name__": "l90_lines"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    def same(got, want):
        # list[int] and typing.List[int] count as the same; so do int | None and Optional[int].
        if got is want or got == want:
            return True
        g_origin, w_origin = typing.get_origin(got), typing.get_origin(want)
        if g_origin is None or w_origin is None:
            return False
        if {g_origin, w_origin} <= {typing.Union, __import__("types").UnionType}:
            return set(typing.get_args(got)) == set(typing.get_args(want))
        g_args, w_args = typing.get_args(got), typing.get_args(want)
        return g_origin is w_origin and len(g_args) == len(w_args) and all(same(a, b) for a, b in zip(g_args, w_args))

    def name(t):
        return t.__name__ if isinstance(t, type) and not typing.get_args(t) else str(t).replace("typing.", "")

    wanted = {
        "daily_kcal": {"meals": list[int], "return": int},
        "protein_left": {"goal": int, "eaten": int, "return": int},
        "stock_of": {"pantry": dict[str, int], "item": str, "return": int | None},
    }
    print("STEP 1: reading your labels")
    print("-" * 44)
    for fname, want in wanted.items():
        func = ns.get(fname)
        if not callable(func):
            return "HINT: Keep the function " + fname + ". The check looks for it by that name."
        try:
            hints = typing.get_type_hints(func)
        except Exception as error:
            return ("HINT: Python could not read the labels on " + fname + ": " + type(error).__name__ + ": "
                    + str(error) + "\n  Use the built-in names: list, dict, str, int, None.")
        shown = ", ".join(k + ": " + name(v) for k, v in hints.items() if k != "return")
        ret = " -> " + name(hints["return"]) if "return" in hints else ""
        print(f"  {fname}({shown}){ret}")
        for key, typ in want.items():
            got = hints.get(key)
            where = "the return" if key == "return" else "the parameter " + key
            if got is None:
                if key == "return":
                    return ("HINT: " + fname + " has no return label. Add  -> " + name(typ)
                            + "  after the closing bracket, before the colon.")
                return "HINT: In " + fname + ", " + where + " has no label. Write  " + key + ": " + name(typ)
            if got in (list, dict) and typ is not got:
                return ("HINT: In " + fname + ", " + where + " says " + name(got) + ", but not what is inside it. "
                        "Use square brackets: " + name(typ))
            if not same(got, typ):
                extra = ""
                if typ == (int | None):
                    extra = "\n  It can be missing: .get() gives None for an item that is not in the pantry."
                return ("HINT: In " + fname + ", " + where + " is labelled " + name(got) + ". Read the comment "
                        "above it again: it should be " + name(typ) + "." + extra)

    print("-" * 44)
    print("STEP 2: running the cards")
    pantry = {"rice": 900, "oats": 400}
    checks = [
        ("daily_kcal([650, 850, 300, 800])", lambda: ns["daily_kcal"]([650, 850, 300, 800]), 2600),
        ("protein_left(140, 95)", lambda: ns["protein_left"](140, 95), 45),
        ("protein_left(70, 80)", lambda: ns["protein_left"](70, 80), 0),
        ('stock_of(pantry, "rice")', lambda: ns["stock_of"](pantry, "rice"), 900),
        ('stock_of(pantry, "tofu")', lambda: ns["stock_of"](pantry, "tofu"), None),
    ]
    for text, call, want in checks:
        try:
            got = call()
        except Exception as error:
            return "HINT: " + text + " stopped with " + type(error).__name__ + ": " + str(error) + ". Change only the def lines."
        print(f"  {text} = {got!r}")
        if got != want:
            return "HINT: " + text + " should give " + repr(want) + " but gave " + repr(got) + ". Change only the def lines."

    return ("PASS: All three cards have labels on every jar: what goes in, and what comes out. "
            "Python runs them the same as before, and mypy and your editor can now check every call.")


verdict = _check()
print(verdict)
