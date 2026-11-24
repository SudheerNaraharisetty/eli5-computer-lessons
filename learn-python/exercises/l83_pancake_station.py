# Lesson 83 exercise: Pancake station
#
# Saturday brunch. The pancake station should cook one pancake each time a
# guest asks, not a whole stack up front. Finish the two functions between
# START and END.
#
# 1. pancakes(n)
#      A GENERATOR: use yield, not a list.
#      It hands out "pancake 1", "pancake 2", ... up to "pancake n",
#      one each time someone asks with next() or a for loop.
#
# 2. total_kcal(stacks)
#      stacks is a dict: guest name -> how many pancakes, for example
#      {"Ana": 3, "Ben": 4, "Chloe": 2}. Each pancake is 90 kcal.
#      Return the total kcal in ONE line:  return sum(... for ... in ...)
#      That is a generator expression inside sum(), so no list is built.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l83_pancake_station.py
#
# What happens when you run it, in two steps:
# - STEP 1. Three guests take a pancake each, and you see the total kcal.
# - STEP 2, THE CHECK. It tests your functions in more ways. It says PASS,
#   or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
def pancakes(n):
    plates = []                       # make this a generator with yield
    for i in range(1, n + 1):
        plates.append(f"pancake {i}")
    return plates


def total_kcal(stacks):
    return 0                          # sum(... for ... in ...), 90 kcal each

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your functions from between
# START and END, runs them, then tests them with other orders.
def _check():
    import ast
    import inspect
    import types

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

    for name in ["pancakes", "total_kcal"]:
        if not callable(ns.get(name)):
            return "HINT: Keep the line  def " + name + "(...):  The check calls that function."
    pancakes, total_kcal = ns["pancakes"], ns["total_kcal"]

    # 1. pancakes must be a generator function. Checked before calling it with a big number.
    if not inspect.isgeneratorfunction(pancakes):
        return ("HINT: pancakes builds a list. Make it a generator: remove plates = [] and "
                "return plates, and replace plates.append(...) with  yield f\"pancake {i}\"")

    # Laziness: a generator for a million million pancakes must start at once.
    cooked = []
    station = pancakes(10**12)
    if not isinstance(station, types.GeneratorType):
        return "HINT: pancakes(n) should give back a generator."

    print("STEP 1: three guests ask the station")
    print("-" * 50)
    try:
        for guest, plate in zip(["Ana", "Ben", "Chloe"], station):
            print(guest, "gets", repr(plate))
            cooked.append(plate)
    except Exception as error:
        return "HINT: pancakes stopped with " + type(error).__name__ + ": " + str(error)
    stacks = {"Ana": 3, "Ben": 4, "Chloe": 2}
    try:
        kcal = total_kcal(dict(stacks))
    except Exception as error:
        return "HINT: total_kcal stopped with " + type(error).__name__ + ": " + str(error)
    print("total_kcal(" + repr(stacks) + ") =", kcal)
    print("-" * 50)
    print("STEP 2, THE CHECK")

    want = ["pancake 1", "pancake 2", "pancake 3"]
    if cooked != want:
        return ("HINT: The first three should be " + repr(want) + ". They were " + repr(cooked)
                + ". Count from 1: range(1, n + 1), and yield f\"pancake {i}\"")
    for n in [0, 1, 5]:
        got = list(pancakes(n))
        expect = [f"pancake {i}" for i in range(1, n + 1)]
        if got != expect:
            return ("HINT: list(pancakes(" + str(n) + ")) should be " + repr(expect)
                    + ". It was " + repr(got))

    # 2. total_kcal
    for order in [stacks, {"Ana": 5}, {}, {"Ana": 2, "Ben": 6, "Chloe": 1, "Dev": 3}]:
        expect = sum(order.values()) * 90
        try:
            got = total_kcal(dict(order))
        except Exception as error:
            return "HINT: total_kcal stopped with " + type(error).__name__ + ": " + str(error)
        if got != expect:
            return ("HINT: total_kcal(" + repr(order) + ") should be " + str(expect)
                    + ", it gave " + repr(got)
                    + ". Try  return sum(count * 90 for count in stacks.values())")

    uses_genexp = False
    for node in tree.body:
        if isinstance(node, ast.FunctionDef) and node.name == "total_kcal":
            for sub in ast.walk(node):
                if isinstance(sub, ast.GeneratorExp):
                    uses_genexp = True
    if not uses_genexp:
        return ("HINT: total_kcal gives the right answer. Now write it as one line with a "
                "generator expression:  return sum(count * 90 for count in stacks.values())")

    return ("PASS: The station cooks one pancake per guest, a trillion-pancake order costs "
            "nothing until someone asks, and the kcal add up with no list in between.")


verdict = _check()
print(verdict)
