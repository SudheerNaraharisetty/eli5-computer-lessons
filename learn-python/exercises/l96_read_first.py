# Lesson 96 exercise: Read first, then cook
#
# Python never cooks straight from your text. It reads the WHOLE file,
# turns each line into a little tree, rewrites the tree as bytecode (tiny
# numbered kitchen steps), and only then runs those steps, one at a time.
# The ast module shows you the tree. The dis module shows you the steps.
#
# Ben's protein for the day is his meals plus his shake, in grams.
# add_protein() below forgets the shake: it only returns sum(meals).
# On Monday Ben ate 30 + 45 + 40 = 115 g and drank a 30 g shake,
# so the answer should be 145 g.
#
# Your job, predict first, then check:
#
#   1. PREDICT. Run this file as it is. STEP 1 prints the tree of your
#      return line and the bytecode of add_protein. Is there a BINARY_OP
#      with (+) in it? Who does the adding now? (Hint: sum() does, inside
#      the CALL step.)
#
#   2. FIX. Between START and END, change the return line so it also adds
#      the shake. Before you run it, guess which new instruction appears.
#
#   3. CHECK. Run it again. STEP 1 now shows BINARY_OP ... (+), the step
#      the line cook uses for +. STEP 2 says PASS or gives one hint.
#
#   Bonus. Smudge your lines on purpose: delete the colon at the end of
#   the def line and run. You get a SyntaxError and NOTHING else, not
#   even the STEP 1 heading: Python reads the whole file before it runs
#   any of it. Put the colon back.
#
# How to run it: save, then press the Run button at the top right of
# VS Code, or type  python3 l96_read_first.py  in a terminal.
# The exact names in the bytecode can differ between Python versions.
# This file was checked with Python 3.14 and 3.15.

# >>> START: change the lines below this line
def add_protein(meals, shake):
    """Ben's protein for the day: his meals plus his shake, in grams."""
    return sum(meals)
# <<< END: change the lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It shows the tree and the
# bytecode of your function, then tries it on three days of Ben's week.
def _check():
    import ast
    import dis
    import pathlib
    import sys

    add = globals().get("add_protein")
    if not callable(add):
        return "HINT: Keep the function  def add_protein(meals, shake):"

    print(f"STEP 1: what Python {sys.version.split()[0]} made of your lines")
    print("-" * 60)
    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start in source and end in source:
        yours = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
        returns = [n for n in ast.walk(ast.parse(yours)) if isinstance(n, ast.Return)]
        if returns:
            print("The tree of your return line:")
            print(ast.dump(returns[0], indent=2))
            print()
    print("The bytecode of add_protein:")
    dis.dis(add)
    print("-" * 60)
    print("STEP 2, THE CHECK")

    # BINARY_OP with + since Python 3.11. Older Pythons called it BINARY_ADD.
    plus = [
        step
        for step in dis.get_instructions(add)
        if ("BINARY_OP" in step.opname and step.argrepr == "+")
        or step.opname == "BINARY_ADD"
    ]
    days = [
        ([30, 45, 40], 30, 145),  # Monday: 115 g of meals and a 30 g shake
        ([40, 55, 50], 0, 145),  # Wednesday: no shake
        ([20, 25], 35, 80),  # a light day
    ]
    results = []
    for meals, shake, want in days:
        try:
            got = add(meals, shake)
        except Exception as error:  # noqa: BLE001  any error becomes a hint
            return (
                f"HINT: add_protein({meals}, {shake}) stopped with "
                f"{type(error).__name__}: {error}"
            )
        results.append((meals, shake, want, got))

    meals, shake, want, got = results[0]
    if not plus:
        if got == sum(meals):
            return (
                f"HINT: add_protein({meals}, {shake}) gives {got}: the {shake} g shake "
                "is lost, and STEP 1 has no BINARY_OP (+). Add the shake on the "
                "return line:  return sum(meals) + shake"
            )
        return (
            "HINT: STEP 1 has no BINARY_OP (+) yet. Use the + sign on the return "
            "line to add the shake to sum(meals)."
        )
    for meals, shake, want, got in results:
        if got != want:
            return (
                f"HINT: add_protein({meals}, {shake}) gives {got!r}, but it should be "
                f"{want}: the meals added up, plus the shake. Use the parameters, "
                "not fixed numbers."
            )
    return (
        "PASS: add_protein([30, 45, 40], 30) is 145 g, and STEP 1 shows the step "
        "that does it: BINARY_OP (+). Python rewrote your + as one small "
        "instruction, and the line cook ran it."
    )


if __name__ == "__main__":
    print(_check())
