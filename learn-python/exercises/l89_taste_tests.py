# Lesson 89 exercise: Taste-test Ana's week
#
# Kitchen Coach has a new recipe card, average_kcal(days). It gives the
# average kcal over the days someone logged. Ana logged 5 days this week:
#
#     2600, 2400, 2800, 2600 and 2600 kcal     ->  her average is 2600
#
# But average_kcal has a bug. Work the way a pro does:
#
#   1. FIRST write a taste test, test_ana_average(), that SHOWS the bug.
#      It calls average_kcal with Ana's 5 days and uses assert to check
#      the answer is 2600. Run the file: your test must FAIL.
#      A test you never saw fail might not test anything.
#   2. THEN fix average_kcal, and run again until every test passes.
#
# Everything you change is between START and END.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l89_taste_tests.py
#   The file then runs every test_ function itself, like a small pytest,
#   and checks your work.
# - If pytest is installed in your venv (lesson 89, part 2), you can ALSO run
#       python3 -m pytest l89_taste_tests.py
#   pytest finds the same test_ functions and shows the failing numbers.
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
def daily_kcal(meals, shake=0):
    """Add up a day of meals, plus a protein shake if there was one."""
    return sum(meals) + shake


def average_kcal(days):
    """The average kcal per day, over the days that were logged."""
    return sum(days) / 7


def test_ana_day():
    assert daily_kcal([650, 850, 300, 800]) == 2600


def test_ben_day():
    assert daily_kcal([500, 700, 650], shake=250) == 2100


def test_whole_week():
    assert average_kcal([2000, 2000, 2000, 2000, 2000, 2000, 2000]) == 2000


# Write your taste test here: def test_ana_average():

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs every test_ function, then checks your test against a
# broken and a correct average_kcal.
def _check():
    import traceback

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    your_lines = your_code.splitlines()

    ns = {"__name__": "coach_tests"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    average = ns.get("average_kcal")
    if not callable(average):
        return "HINT: Keep the function  def average_kcal(days):  The tests call it."
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
        print(f"{name:<22} {result}" + (f"   {why}" if why else ""))
    print("-" * 60)
    print("STEP 2, THE CHECK")

    for name in ["test_ana_day", "test_ben_day", "test_whole_week"]:
        if name not in results:
            return "HINT: Keep the test " + name + "(). It was there at the start."
        if results[name] != "ok":
            return ("HINT: " + name + " fails now. It was right at the start. "
                    "Change average_kcal, not daily_kcal.")
    for name, result in results.items():
        if result == "ERROR":
            return ("HINT: " + name + " stopped with an error, not a failed assert. "
                    "Read the line above and fix it.")

    mine = [(name, f) for name, f in tests if name not in ("test_ana_day", "test_ben_day", "test_whole_week")]
    if not mine:
        return ("HINT: First write a taste test:  def test_ana_average():  and inside it "
                "assert average_kcal([2600, 2400, 2800, 2600, 2600]) == 2600")
    if not any("average_kcal" in f.__code__.co_names for _, f in mine):
        return "HINT: Your new test should call average_kcal with Ana's 5 days."

    # Does your test catch the bug? Swap in the broken card, then the right one.
    def broken(days):
        return sum(days) / 7

    def right(days):
        return sum(days) / len(days)

    def run_mine_with(card):
        ns["average_kcal"] = card
        try:
            return [taste(f)[0] for _, f in mine]
        finally:
            ns["average_kcal"] = average

    with_broken = run_mine_with(broken)
    with_right = run_mine_with(right)
    if "FAILED" not in with_broken:
        return ("HINT: Your test passes even with the bug, so it does not catch it. "
                "Use assert, and check Ana's 5 days give 2600.")
    if any(r != "ok" for r in with_right):
        return ("HINT: Your test fails even with a correct average_kcal. Ana's 5 days add up to "
                "13000 kcal, and 13000 / 5 = 2600. Check the numbers in your assert.")

    # Your test catches the bug. Is the bug fixed?
    if any(results[name] != "ok" for name, _ in mine):
        return ("GOOD: Your taste test fails, so it caught the bug. Now fix average_kcal: "
                "Ana logged 5 days, not 7. Divide by how many days are in the list (lesson 31).")
    try:
        if average([2000, 2200]) != 2100 or average([1800]) != 1800:
            return "HINT: average_kcal([2000, 2200]) should be 2100. Divide by how many days were logged."
    except Exception as error:
        return "HINT: average_kcal([2000, 2200]) stopped with " + type(error).__name__ + ": " + str(error)

    return ("PASS: Your taste test caught the bug first, then the fix turned it green. "
            "From now on, nobody can break Ana's average without a red FAILED.")


if __name__ == "__main__":
    print(_check())
