# Lesson 92 exercise: A tidy kitchen
#
# Kitchen Coach picks a dessert for each guest. dessert_for() below
# works on most nights, so Python never complains. But it has
# 3 problems that Ruff can find without running it:
#
#   1. an import that is never used
#   2. a comparison with == None (lesson 16: ask with "is None")
#   3. a typo in a name, in a branch that runs only now and then.
#      Python would crash there one evening, in front of Chloe.
#
# Your job: let Ruff find them, then fix all 3. Change only the lines
# between START and END.
#
# How to do it:
# 1. Open a terminal in the folder with this file. Make and switch on a
#    venv, and install Ruff into it (lessons 63 and 91):
#        python3 -m venv .venv
#        source .venv/bin/activate          (Windows: .venv\Scripts\activate)
#        python3 -m pip install ruff
# 2. Ask Ruff. "--extend-select E" also turns on the E rules, like
#    == None (part 5 of the lesson shows how to save that in pyproject.toml):
#        ruff check --extend-select E l92_tidy_kitchen.py
#    It prints 3 problems, each with a code, a line and a column.
# 3. Fix them. "ruff check --fix" can do the safe one for you.
#    The other two are yours. Run ruff check again until it says
#        All checks passed!
# 4. Optional: "ruff format l92_tidy_kitchen.py" tidies the layout too.
#
# Then run this file with the Run button at the top right of VS Code,
# or type:  python3 l92_tidy_kitchen.py
# It does not need Ruff. It serves a dessert to every guest, checks your
# lines, and prints PASS or one hint.

# >>> START: change the lines below this line
import random

GLUTEN_FREE = {'rice pudding','fruit salad','flourless brownie'}


def dessert_for(guest,dessert):
    """What to serve this guest. dessert is None when nobody picked one."""
    if dessert == None:
        return 'fruit salad'
    if guest=='Chloe' and dessert not in GLUTEN_FREE:
        # Chloe is gluten-free. This branch runs only now and then.
        return f'flourless brownie (not {desert})'
    return dessert
# <<< END: change the lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It reads your lines between
# START and END, looks for the 3 problems, and tries every branch.
def _check():
    import ast
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Change only the lines between them."
    yours = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    tree = ast.parse(yours)

    # Problem 1: a name that is imported and then never used.
    imported = {}
    for node in ast.walk(tree):
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            for alias in node.names:
                name = (alias.asname or alias.name).split(".")[0]
                imported[name] = node.lineno
    used = {n.id for n in ast.walk(tree) if isinstance(n, ast.Name)}
    unused = [name for name in imported if name not in used]

    # Problem 2: == None or != None.
    none_checks = [
        node.lineno
        for node in ast.walk(tree)
        if isinstance(node, ast.Compare)
        and any(isinstance(op, (ast.Eq, ast.NotEq)) for op in node.ops)
        and any(
            isinstance(c, ast.Constant) and c.value is None
            for c in [node.left, *node.comparators]
        )
    ]

    # Every guest, every branch. The last one is the rare branch.
    tonight = [
        ("Ana", None, "fruit salad"),
        ("Ben", "apple pie", "apple pie"),
        ("Chloe", "rice pudding", "rice pudding"),
        ("Chloe", "apple pie", "flourless brownie (not apple pie)"),
    ]
    dessert = globals().get("dessert_for")
    print("STEP 1: dessert for every guest")
    print("-" * 60)
    if not callable(dessert):
        return "HINT: Keep the function  def dessert_for(guest, dessert):"
    crash = None
    wrong = None
    for guest, picked, want in tonight:
        try:
            got = dessert(guest, picked)
        except NameError as error:
            print(f"{guest:<6} {picked!s:<13} -> NameError: {error}")
            crash = crash or error
            continue
        except Exception as error:  # noqa: BLE001  any error becomes a hint
            return f"HINT: dessert_for stopped with {type(error).__name__}: {error}"
        print(f"{guest:<6} {picked!s:<13} -> {got}")
        if got != want and wrong is None:
            wrong = (guest, picked, got, want)
    print("-" * 60)
    print("STEP 2, THE CHECK")

    if unused:
        return (
            f"HINT: '{unused[0]}' is imported but never used (Ruff calls it F401). "
            "Delete that import line. ruff check --fix does it for you."
        )
    if none_checks:
        return (
            "HINT: Your lines still compare with == None (Ruff calls it E711). "
            "Ask the way lesson 16 taught:  if dessert is None:"
        )
    if crash is not None:
        return (
            f"HINT: Chloe's rare branch crashed: NameError: {crash}. "
            "Ruff calls it F821. Read the name on that line letter by letter."
        )
    if wrong is not None:
        guest, picked, got, want = wrong
        return f"HINT: dessert_for({guest!r}, {picked!r}) gave {got!r}, not {want!r}."
    return (
        "PASS: No unused import, no == None, and Chloe's rare branch works. "
        "Ruff found all 3 before any guest did."
    )


if __name__ == "__main__":
    print(_check())
