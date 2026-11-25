# Lesson 107 exercise: Taste-test the pantry
#
# Chloe is upset. Kitchen Coach did not plan her chicken rice bowl today.
# Ana's bowl took 150 g of chicken, so EXACTLY 150 g is left, and Chloe's
# bowl needs EXACTLY 150 g. That is enough. But has_all said "not enough".
#
# Below is a small copy of the Pantry class with that bug in has_all, and
# two taste tests that both pass. They never try "exactly enough", so they
# never noticed. Work the way a pro does:
#
#   1. FIRST write a taste test, test_exactly_enough(), that SHOWS the bug.
#      Make a Pantry with exactly 150 g of chicken and 100 g of rice, and
#      assert that it has_all of {"chicken": 150, "rice": 100}.
#      Run the file: your test must FAIL.
#   2. THEN fix has_all, and run again until every test passes.
#
# Everything you change is between START and END.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l107_taste_test.py
#   The file then runs every test_ function itself, like a small pytest,
#   and checks your work.
# - If pytest is installed in your venv (lesson 89), you can ALSO run
#       python3 -m pytest l107_taste_test.py
#   pytest finds the same test_ functions.
#
# What happens when you run it with python3, in two steps:
# - STEP 1. Every test_ function runs. You see "ok" or "FAILED" for each.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.

# Leave these lines as they are. With python3, they start the check at the
# bottom of this file first, so an error in your lines shows up as a hint,
# not a crash. (pytest skips them: it is not "__main__" there.)
import pathlib
if __name__ == "__main__":
    exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
    raise SystemExit

# >>> START: write your lines below this line
class Pantry:
    """What is in the kitchen: ingredient name -> grams."""

    def __init__(self, grams=None):
        self.grams = dict(grams or {})

    def __getitem__(self, name):
        return self.grams.get(name, 0)  # nothing on the shelf: 0 g

    def has_all(self, ingredients):
        """True if there is enough of every ingredient."""
        for name, need in ingredients.items():
            if self[name] <= need:
                return False
        return True


BOWL = {"chicken": 150, "rice": 100}  # one chicken rice bowl


def test_plenty_is_enough():
    pantry = Pantry({"chicken": 300, "rice": 1000})
    assert pantry.has_all(BOWL)


def test_too_little_is_not_enough():
    pantry = Pantry({"chicken": 100, "rice": 1000})
    assert not pantry.has_all(BOWL)


# Write your taste test here: def test_exactly_enough():

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs every test_ function, then checks your test against a
# broken and a correct has_all.
def _check():
    import traceback

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    your_lines = your_code.splitlines()

    ns = {"__name__": "pantry_tests"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    Pantry = ns.get("Pantry")
    if not isinstance(Pantry, type) or not callable(getattr(Pantry, "has_all", None)):
        return "HINT: Keep the class Pantry and its method has_all. The tests call it."
    yours = Pantry.has_all
    given = ["test_plenty_is_enough", "test_too_little_is_not_enough"]
    tests = [(name, f) for name, f in ns.items() if name.startswith("test_") and callable(f)]

    def taste(test):
        """Run one test. Gives ("ok", ""), ("FAILED", the assert line) or ("ERROR", the error)."""
        try:
            test()
            return "ok", ""
        except AssertionError as error:
            frames = [f for f in traceback.extract_tb(error.__traceback__) if f.filename == "your lines"]
            line = your_lines[frames[-1].lineno - 1].strip() if frames else ""
            return "FAILED", line
        except Exception as error:
            return "ERROR", type(error).__name__ + ": " + str(error)

    print("STEP 1: every taste test")
    print("-" * 60)
    results = {}
    for name, test in tests:
        result, why = taste(test)
        results[name] = result
        print(f"{name:<32} {result}" + (f"   {why}" if why else ""))
    print("-" * 60)
    print("STEP 2, THE CHECK")

    for name in given:
        if name not in results:
            return "HINT: Keep the test " + name + "(). It was there at the start."
        if results[name] != "ok":
            return ("HINT: " + name + " fails now. It was right at the start. "
                    "Change only the comparison in has_all.")
    for name, result in results.items():
        if result == "ERROR":
            return ("HINT: " + name + " stopped with an error, not a failed assert. "
                    "Read the line above and fix it.")

    mine = [(name, f) for name, f in tests if name not in given]
    if not mine:
        return ("HINT: First write a taste test:  def test_exactly_enough():  Inside it, make "
                'pantry = Pantry({"chicken": 150, "rice": 100})  and  assert pantry.has_all(BOWL)')
    if not any("has_all" in f.__code__.co_names for _, f in mine):
        return "HINT: Your new test should call has_all on a Pantry that holds exactly what the bowl needs."

    # Does your test catch the bug? Swap in the broken has_all, then the right one.
    def broken(self, ingredients):
        for name, need in ingredients.items():
            if self[name] <= need:
                return False
        return True

    def right(self, ingredients):
        for name, need in ingredients.items():
            if self[name] < need:
                return False
        return True

    def run_mine_with(method):
        Pantry.has_all = method
        try:
            return [taste(f)[0] for _, f in mine]
        finally:
            Pantry.has_all = yours

    with_broken = run_mine_with(broken)
    with_right = run_mine_with(right)
    if "ERROR" in with_right:
        return "HINT: Your test stops with an error. Make the pantry with Pantry({...}) and call pantry.has_all(BOWL)."
    if "FAILED" not in with_broken:
        return ("HINT: Your test passes even with the bug, so it does not catch it. The bug only shows "
                "when the pantry holds EXACTLY what is needed: 150 g of chicken for a bowl that needs 150 g. "
                "And remember the word assert.")
    if any(r != "ok" for r in with_right):
        return ("HINT: Your test fails even with a correct has_all. Exactly enough IS enough: "
                'assert Pantry({"chicken": 150, "rice": 100}).has_all(BOWL)')

    # Your test catches the bug. Is the bug fixed?
    if any(results[name] != "ok" for name, _ in mine):
        return ("GOOD: Your taste test fails, so it caught the bug. Now fix has_all: "
                "150 g is enough for a bowl that needs 150 g. Not enough means LESS than needed. "
                "Which comparison says that (lesson 21)?")
    try:
        shelf = Pantry({"chicken": 150, "rice": 100})
        if shelf.has_all({"chicken": 150, "rice": 100}) is not True:
            return "HINT: has_all should be True when the pantry holds exactly what is needed."
        if shelf.has_all({"chicken": 151}) is not False or shelf.has_all({"flour": 50}) is not False:
            return ("HINT: has_all must still say False when there is too little, or none at all. "
                    "Change <= to <, nothing else.")
        if shelf.has_all({}) is not True:
            return "HINT: A recipe with no ingredients needs nothing, so has_all({}) should be True."
    except Exception as error:
        return "HINT: has_all stopped with " + type(error).__name__ + ": " + str(error)

    return ("PASS: Your taste test caught the bug first, then the fix turned it green. "
            "Chloe gets her chicken rice bowl, and nobody can break 'exactly enough' again without a red FAILED.")


if __name__ == "__main__":
    print(_check())
