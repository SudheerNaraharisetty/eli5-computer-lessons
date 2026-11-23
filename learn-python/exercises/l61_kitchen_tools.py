# Lesson 61 exercise: Kitchen tools from the free shelf
#
# Kitchen Coach has four hand-made recipe cards below. Each one gives a
# wrong answer for some inputs. Python already has a tool for each job, in
# the standard library. Rewrite each card with that tool:
#
# 1. most_eaten(meals)
#    Hand back the food that comes up most often in the list meals.
#    Tool:  from collections import Counter
#           Counter(meals).most_common(1) hands back [("oats", 3)]:
#           a list with one (food, count) tuple. [0] is the tuple,
#           and [0] again is the food.
#
# 2. days_until(today, race)
#    Hand back the whole days from the date today to the date race.
#    Both are already date objects, like date(2027, 2, 28).
#    Tool:  (race - today).days
#    The hand-made card treats every month as 30 days. Wrong!
#
# 3. packs_needed(grams, pack_g)
#    How many whole packs of pack_g grams to buy, to have at least grams.
#    Tool:  import math   then   math.ceil(...)   rounds UP.
#    The hand-made card uses round(), which rounds 2.3 down to 2.
#
# 4. average(times)
#    The mean of a list of run times.
#    Tool:  import statistics   then   statistics.mean(times)
#    The hand-made card always divides by 4, however many runs there were.
#
# Put the imports at the top, between START and END.
# When all four are right, the orders print:
#   Most eaten: oats
#   Days to Ana's race: 97
#   Packs of pasta: 3
#   Ana's average 5 km: 29.75 minutes
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l61_kitchen_tools.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your cards and the orders run, and you see what they print.
# - STEP 2, THE CHECK. It calls your cards again with other weeks, other
#   dates and other numbers. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

# Your imports go here.


def most_eaten(meals):
    """Hand back the food that comes up most often in meals."""
    return meals[0]   # just the first meal: fix me


def days_until(today, race):
    """Hand back the whole days from the date today to the date race."""
    start = today.year * 360 + today.month * 30 + today.day   # every month is 30 days: fix me
    end = race.year * 360 + race.month * 30 + race.day
    return end - start


def packs_needed(grams, pack_g):
    """Hand back how many whole packs of pack_g grams to buy, to have at least grams."""
    return round(grams / pack_g)   # can round down: fix me


def average(times):
    """Hand back the mean of the run times."""
    return sum(times) / 4   # always divides by 4: fix me

# <<< END: write your lines above this line

# ===== THE ORDERS (do not change) =====
from datetime import date

week = ["oats", "rice", "oats", "tofu", "oats", "rice", "pasta"]
print("Most eaten:", most_eaten(week))
print("Days to Ana's race:", days_until(date(2026, 11, 23), date(2027, 2, 28)))
print("Packs of pasta:", packs_needed(1150, 500))
print("Ana's average 5 km:", average([31, 29.5, 30, 28.5]), "minutes")
# ===== END OF THE ORDERS =====


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END and the orders, runs them in a separate Python with a
# 5 second limit, then calls your cards with other values.
def _check():
    import ast
    import json
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    orders_start, orders_end = "# ===== THE ORDERS", "# ===== END OF THE ORDERS"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    if orders_start not in source or orders_end not in source:
        return "HINT: Keep the orders as they were. Get a fresh copy of the file if you changed them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    orders = source.split(orders_start, 1)[1].split("\n", 1)[1].split(orders_end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon after each def line, and the 4 spaces in front of each return.")

    # The test calls: (card name, arguments as Python text, the right answer).
    calls = [
        ("most_eaten", '["rice", "tofu", "tofu", "lentils", "tofu"]', "tofu"),
        ("most_eaten", '["pasta"]', "pasta"),
        ("days_until", "date(2026, 11, 23), date(2027, 2, 28)", 97),
        ("days_until", "date(2027, 1, 10), date(2027, 3, 1)", 50),
        ("days_until", "date(2026, 12, 1), date(2026, 12, 6)", 5),
        ("packs_needed", "1150, 500", 3),
        ("packs_needed", "1000, 500", 2),
        ("packs_needed", "90, 250", 1),
        ("average", "[31, 29.5, 30, 28.5]", 29.75),
        ("average", "[30, 28, 29, 27, 31]", 29),
        ("average", "[25]", 25),
    ]
    runner = (
        "import json, sys\n"
        "from datetime import date\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'the orders', 'exec'), ns)\n"
        "rep = []\n"
        "for name, args in json.loads(sys.argv[3]):\n"
        "    card = ns.get(name)\n"
        "    if not callable(card):\n"
        "        rep.append({'err': 'missing'})\n"
        "        continue\n"
        "    try:\n"
        "        v = eval(name + '(' + args + ')', {**ns, 'date': date})\n"
        "        rep.append({'err': '', 'v': v if isinstance(v, (int, float, str)) else None, 'repr': repr(v)})\n"
        "    except Exception as e:\n"
        "        rep.append({'err': type(e).__name__ + ': ' + str(e)})\n"
        "sys.stderr.write('@@CARD ' + json.dumps(rep) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code, orders,
                               json.dumps([[c[0], c[1]] for c in calls])],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? These cards need no loop at all."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what the orders print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARD ")]
    last = (errors or ["an error"])[-1]
    if done.returncode != 0:
        print(last)
    print("-" * 40)
    print("STEP 2, THE CHECK: your cards with other values")

    if done.returncode != 0:
        if last.startswith("NameError"):
            for tool, line in [("Counter", "from collections import Counter"), ("math", "import math"),
                               ("statistics", "import statistics")]:
                if "'" + tool + "'" in last:
                    return ("HINT: Python stopped with: " + last + "\n  Add the import at the top, "
                            "between START and END:  " + line)
            return "HINT: Python stopped with: " + last + "\n  Check the spelling of every name."
        if last.startswith("ModuleNotFoundError"):
            return ("HINT: Python stopped with: " + last + "\n  The books are called collections, math "
                    "and statistics, all in small letters.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    if not found:
        return "HINT: The check could not read your cards. Keep the four def lines as they were."
    rep = json.loads(found[0][len("@@CARD "):])

    tools = {
        "most_eaten": "Counter(meals).most_common(1)[0][0]  (from collections import Counter)",
        "days_until": "(race - today).days",
        "packs_needed": "math.ceil(grams / pack_g)  (import math)",
        "average": "statistics.mean(times)  (import statistics)",
    }
    for (name, args, want), got in zip(calls, rep):
        if got["err"] == "missing":
            return "HINT: Keep the card  def " + name + "(...):  The check calls it by that name."
        if got["err"]:
            return ("HINT: " + name + "(" + args + ") stopped with:\n  " + got["err"]
                    + "\n  Try  " + tools[name])
        ok = got["v"] == want and not isinstance(got["v"], bool)
        if isinstance(want, str):
            ok = got["v"] == want
        if not ok:
            return ("HINT: " + name + "(" + args + ") handed back " + got["repr"] + ", but the right answer is "
                    + repr(want) + ".\n  Use the tool from the free shelf:  " + tools[name])

    body = your_code
    if "Counter" not in body:
        return "HINT: Every answer is right. Now let Counter do the counting in most_eaten:  " + tools["most_eaten"]
    if "math.ceil" not in body and "ceil(" not in body:
        return "HINT: Every answer is right. Now use math.ceil in packs_needed:  " + tools["packs_needed"]
    if "mean(" not in body:
        return "HINT: Every answer is right. Now use statistics.mean in average:  " + tools["average"]

    return ("PASS: Four tools from the free shelf, and no hand-made maths. Counter counts, date knows every "
            "month, math.ceil rounds up and statistics.mean divides by the right number. Batteries included.")


verdict = _check()
print(verdict)
