# Lesson 45 exercise: Ben's protein card
#
# Ben lifts weights. Kitchen Coach adds up his protein and his calories
# for the whole day. The numbers per 100 g live in two dicts (lesson 37),
# and his day is a list of (food, grams) pairs. They are under KITCHEN DATA
# below. Do not change them.
#
# Your job, between START and END:
# 1. Fix protein_in(grams, per_100g). It PRINTS its answer, so it hands
#    back None. Make it RETURN  grams * per_100g / 100  and print nothing.
# 2. Write a second card, kcal_in(grams, per_100g), that works the same way
#    and RETURNS the calories.
# 3. In the loop, add each food's calories to calories_total, the same
#    way protein_total is done. Look the number up in kcal_per_100g.
#
# With both cards right, it prints EXACTLY these 2 lines:
#
#   Protein: 69.5 g
#   Calories: 930.8 kcal
#
# The check also calls your two cards with OTHER numbers, so typing the
# answers in will not pass. Each card must work for any food and any amount.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l45_protein_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. The kitchen data and your lines run, and you see what they print.
# - STEP 2, THE CHECK. It tries your cards with other numbers too.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN DATA (do not change) =====
protein_per_100g = {"oats": 13, "tofu": 17, "lentils": 9, "eggs": 13}
kcal_per_100g = {"oats": 389, "tofu": 144, "lentils": 116, "eggs": 143}
day = [("oats", 80), ("tofu", 150), ("lentils", 200), ("eggs", 120)]
# ===== END OF KITCHEN DATA =====

# >>> START: write your lines below this line

def protein_in(grams, per_100g):
    print(grams * per_100g / 100)

# Write kcal_in(grams, per_100g) here.


protein_total = 0
calories_total = 0
for food, grams in day:
    protein_total += protein_in(grams, protein_per_100g[food])
    # Add this food's calories to calories_total here.

print(f"Protein: {round(protein_total, 1)} g")
print(f"Calories: {round(calories_total, 1)} kcal")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the kitchen data and your
# lines from between START and END, runs them in a separate Python with a
# 5 second limit, then calls your two cards with other numbers.
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
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon after def (...), and that the card's lines are indented.")

    # Runs the data and your lines, then tries each card with other numbers.
    # What a card prints during those tries is caught, so we can tell print from return.
    runner = (
        "import io, json, contextlib, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'the kitchen data', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'your lines', 'exec'), ns)\n"
        "report = {}\n"
        "for name, args in [('protein_in', (50, 20)), ('protein_in', (250, 8)),\n"
        "                   ('kcal_in', (250, 116)), ('kcal_in', (40, 900))]:\n"
        "    f = ns.get(name)\n"
        "    if not callable(f):\n"
        "        report[name] = {'missing': True}\n"
        "        continue\n"
        "    shown = io.StringIO()\n"
        "    try:\n"
        "        with contextlib.redirect_stdout(shown):\n"
        "            back = f(*args)\n"
        "        got = back if isinstance(back, (int, float)) and not isinstance(back, bool) else repr(back)\n"
        "        err = ''\n"
        "    except Exception as e:\n"
        "        got, err = None, type(e).__name__ + ': ' + str(e)\n"
        "    report.setdefault(name + ' tries', []).append({'args': args, 'back': got, 'shown': shown.getvalue(), 'err': err})\n"
        "sys.stderr.write('@@CARDS ' + json.dumps(report) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, data, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? The for loop over day is all you need."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what your lines print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARDS ")]
    last = (errors or ["an error"])[-1]
    if done.returncode != 0:
        print(last)
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if done.returncode != 0:
        if "NoneType" in last:
            return ("HINT: Python stopped with: " + last + "\n  A card hands back None, because it "
                    "prints instead of returning. Use  return grams * per_100g / 100  on the card.")
        if "missing" in last and "required positional argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  Each card has 2 jars, so each call "
                    "needs 2 arguments: the grams, then the number per 100 g.")
        if "positional argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  Check the jars in the def line: "
                    "def kcal_in(grams, per_100g):  has exactly 2.")
        if last.startswith("NameError") and "kcal_in" in last:
            return ("HINT: Python stopped with: " + last + "\n  Write the kcal_in card before the "
                    "loop that uses it:  def kcal_in(grams, per_100g):")
        if last.startswith("KeyError"):
            return ("HINT: Python stopped with: " + last + "\n  Look the food up with  "
                    "kcal_per_100g[food]  and keep the kitchen data as it was.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARDS ")]
    if not found:
        return "HINT: The check could not read your cards. Keep both cards as  def ...(grams, per_100g):"
    report = json.loads(found[0][len("@@CARDS "):])

    for name in ("protein_in", "kcal_in"):
        if report.get(name, {}).get("missing"):
            return ("HINT: There is no card called " + name + ". Write it with  def "
                    + name + "(grams, per_100g):")
        for t in report[name + " tries"]:
            a, b = t["args"]
            call = name + "(" + str(a) + ", " + str(b) + ")"
            want = a * b / 100
            if t["err"]:
                return "HINT: " + call + " stopped with: " + t["err"]
            if t["back"] == "None":
                if t["shown"].strip():
                    return ("HINT: " + call + " printed " + t["shown"].strip() + " but handed back None. "
                            "Use return, not print, on the card.")
                return "HINT: " + call + " handed back None. Did you forget the word return?"
            if not isinstance(t["back"], (int, float)):
                return "HINT: " + call + " handed back " + str(t["back"]) + ". It should hand back a number."
            if abs(t["back"] - want) > 1e-9:
                return ("HINT: " + call + " handed back " + str(t["back"]) + ", but it should be "
                        + str(want) + ".\n  Use the jars, not fixed numbers:  return grams * per_100g / 100")
            if t["shown"].strip():
                return ("HINT: " + call + " returns the right number, but it also prints "
                        + t["shown"].strip() + ". Let the card only return. Print outside the card.")

    should = ["Protein: 69.5 g", "Calories: 930.8 kcal"]
    if printed == should:
        return ("PASS: Both cards take ingredients in and hand the dish back. Ben's day: "
                "69.5 g protein and 930.8 kcal. Change any food or amount, and the cards still work.")
    if printed[:1] == should[:1] and printed[1:2] == ["Calories: 0 kcal"]:
        return ("HINT: Calories: 0 kcal. Inside the loop, add each food's calories:  "
                "calories_total += kcal_in(grams, kcal_per_100g[food])")
    for i, line in enumerate(should):
        if i >= len(printed):
            return "HINT: Print 2 lines. You printed " + str(len(printed)) + ". The next one should be:  " + line
        if printed[i] != line:
            return "HINT: Line " + str(i + 1) + " is  " + printed[i] + "\n  It should be  " + line
    return "HINT: Print exactly the 2 lines, and nothing else."


verdict = _check()
print(verdict)
