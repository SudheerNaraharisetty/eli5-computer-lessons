# Lesson 47 exercise: Ana's calorie log
#
# Ana is training for a half-marathon. Kitchen Coach adds up her calories
# for the day. Her meals are a list of (food, kcal) pairs, under KITCHEN DATA
# below. Do not change them.
#
# The starter card log_meal(kcal) tries to change the jar kcal_today, which
# sits on the counter (the top of the file). Inside the card, kcal_today = ...
# makes a NEW jar in the card's pan, and reading it first stops Python with:
#
#   UnboundLocalError: cannot access local variable 'kcal_today'
#   where it is not associated with a value
#
# Your job, between START and END. Pass it in, hand it back:
# 1. Give the card two jars:  def log_meal(total, kcal):
# 2. Make it RETURN the new total:  total + kcal
# 3. In the loop, store what the card hands back in the counter jar:
#        kcal_today = log_meal(kcal_today, kcal)
# Do NOT use the word global. The check reads your lines to make sure.
#
# With the card right, it prints EXACTLY these 2 lines:
#
#   Ana today: 1665 kcal
#   Left to eat: 935 kcal
#
# The check also calls your card with OTHER numbers, so typing the
# answers in will not pass.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l47_calorie_log.py
#
# What happens when you run it, in two steps:
# - STEP 1. The kitchen data and your lines run, and you see what they print.
# - STEP 2, THE CHECK. It tries your card with other numbers too.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN DATA (do not change) =====
daily_goal = 2600
meals = [("oats", 420), ("pasta", 760), ("banana", 105), ("rice pudding", 380)]
# ===== END OF KITCHEN DATA =====

# >>> START: write your lines below this line

kcal_today = 0

def log_meal(kcal):
    kcal_today = kcal_today + kcal

for food, kcal in meals:
    log_meal(kcal)

print(f"Ana today: {kcal_today} kcal")
print(f"Left to eat: {daily_goal - kcal_today} kcal")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the kitchen data and your
# lines from between START and END, runs them in a separate Python with a
# 5 second limit, then calls your card with other numbers.
def _check():
    import ast
    import json
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    data_start, data_end = "# ===== KITCHEN DATA", "# ===== END OF KITCHEN DATA"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    if data_start not in source or data_end not in source:
        return "HINT: Keep the kitchen data as it was. Get a fresh copy of the file if you changed it."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    data = source.split(data_start, 1)[1].split("\n", 1)[1].split(data_end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon after def (...), and that the card's lines are indented.")

    # Runs the data and your lines, then tries the card with other numbers.
    runner = (
        "import io, json, contextlib, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'the kitchen data', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'your lines', 'exec'), ns)\n"
        "f = ns.get('log_meal')\n"
        "report = {'missing': not callable(f), 'tries': []}\n"
        "for args in [(1000, 250), (0, 99), (1665, 335)]:\n"
        "    if not callable(f):\n"
        "        break\n"
        "    shown = io.StringIO()\n"
        "    try:\n"
        "        with contextlib.redirect_stdout(shown):\n"
        "            back = f(*args)\n"
        "        got = back if isinstance(back, (int, float)) and not isinstance(back, bool) else repr(back)\n"
        "        err = ''\n"
        "    except Exception as e:\n"
        "        got, err = None, type(e).__name__ + ': ' + str(e)\n"
        "    report['tries'].append({'args': args, 'back': got, 'shown': shown.getvalue(), 'err': err})\n"
        "sys.stderr.write('@@CARD ' + json.dumps(report) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, data, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? The for loop over meals is all you need."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what your lines print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARD ")]
    last = (errors or ["an error"])[-1]
    if done.returncode != 0:
        print(last)
    print("-" * 40)
    print("STEP 2, THE CHECK")

    # Read your lines: no global (or nonlocal) allowed.
    if any(isinstance(node, (ast.Global, ast.Nonlocal)) for node in ast.walk(tree)):
        return ("HINT: Your lines use global. It can work, but any card could then change the "
                "counter jar behind your back.\n  Take it out. Pass the total in, and return the new total.")

    if done.returncode != 0:
        if last.startswith("UnboundLocalError"):
            return ("HINT: Python stopped with: " + last + "\n  The card still puts a value in "
                    "kcal_today, so that is a new jar in its pan. Give the card a jar called total:  "
                    "def log_meal(total, kcal):  and  return total + kcal")
        if "NoneType" in last:
            return ("HINT: Python stopped with: " + last + "\n  The card hands back None. "
                    "Did you forget  return total + kcal ?")
        if "missing" in last and "required positional argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  The card has 2 jars now, so pass 2 "
                    "values:  log_meal(kcal_today, kcal)")
        if "positional argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  The card needs exactly 2 jars:  "
                    "def log_meal(total, kcal):")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  A name made inside the card is gone "
                    "after the call. Keep kcal_today = 0 at the top, outside the card.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    if not found:
        return "HINT: The check could not read your card. Keep it as  def log_meal(total, kcal):"
    report = json.loads(found[0][len("@@CARD "):])
    if report["missing"]:
        return "HINT: There is no card called log_meal. Write it with  def log_meal(total, kcal):"

    for t in report["tries"]:
        a, b = t["args"]
        call = "log_meal(" + str(a) + ", " + str(b) + ")"
        if t["err"]:
            if "positional argument" in t["err"]:
                return ("HINT: " + call + " stopped with: " + t["err"] + "\n  Give the card two "
                        "jars:  def log_meal(total, kcal):")
            return "HINT: " + call + " stopped with: " + t["err"]
        if t["back"] == "None":
            return ("HINT: " + call + " handed back None. The card must hand the new total back:  "
                    "return total + kcal")
        if not isinstance(t["back"], (int, float)):
            return "HINT: " + call + " handed back " + str(t["back"]) + ". It should hand back a number."
        if t["back"] != a + b:
            return ("HINT: " + call + " handed back " + str(t["back"]) + ", but it should be "
                    + str(a + b) + ".\n  Use the card's own jars, not the counter jar:  return total + kcal")
        if t["shown"].strip():
            return ("HINT: " + call + " returns the right number, but it also prints "
                    + t["shown"].strip() + ". Let the card only return. Print outside the card.")

    should = ["Ana today: 1665 kcal", "Left to eat: 935 kcal"]
    if printed == should:
        return ("PASS: The total goes in, the new total comes back, and the counter jar only "
                "changes on a line you can see. What is made in the pan stays in the pan.")
    if printed[:1] == ["Ana today: 0 kcal"]:
        return ("HINT: Ana today: 0 kcal. The card hands the new total back, but nothing stores it. "
                "In the loop write:  kcal_today = log_meal(kcal_today, kcal)")
    for i, line in enumerate(should):
        if i >= len(printed):
            return "HINT: Print 2 lines. You printed " + str(len(printed)) + ". The next one should be:  " + line
        if printed[i] != line:
            return "HINT: Line " + str(i + 1) + " is  " + printed[i] + "\n  It should be  " + line
    return "HINT: Print exactly the 2 lines, and nothing else."


verdict = _check()
print(verdict)
