# Lesson 60 exercise: Share the cookbook (file 2 of 2)
#
# This is Kitchen Coach. It does not copy the recipe cards. It imports them
# from the cookbook next to it, l60_kitchen.py. You do not change this file.
# Your work is in l60_kitchen.py.
#
# When your cookbook is right, running this file prints EXACTLY:
#
#   Ben's lunch: 43.5 g protein
#   Ana's breakfast: 464 kcal
#
# and nothing else: no test lines from the cookbook.
#
# How to run it:
# - Save l60_kitchen.py, then open this file and press the Run button at
#   the top right of VS Code. In a terminal, from this folder:
#   python3 l60_coach.py
#
# What happens when you run it, in two steps:
# - STEP 1. Kitchen Coach runs, and you see what it prints.
# - STEP 2, THE CHECK. It imports your cookbook on its own, runs it on its
#   own, and tries kcal_in with other numbers. It says PASS, or gives you
#   one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs Kitchen Coach with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN COACH (do not change) =====
import l60_kitchen

ben = l60_kitchen.protein_in(150, 17) + l60_kitchen.protein_in(200, 9)
print(f"Ben's lunch: {ben} g protein")

breakfast = l60_kitchen.kcal_in(80, 380) + l60_kitchen.kcal_in(250, 64)
print(f"Ana's breakfast: {breakfast} kcal")
# ===== END OF KITCHEN COACH =====


# ===== THE CHECK =====
# You do not need to read this part yet. It runs Kitchen Coach and your
# cookbook in a separate Python with a 5 second limit, so a mistake can never
# hang this file. -B stops Python from saving a __pycache__ folder here.
def _check():
    import json
    import subprocess
    import sys

    here = pathlib.Path(__file__).resolve().parent
    book = here / "l60_kitchen.py"
    if not book.exists():
        return "HINT: l60_kitchen.py is missing. Keep it in the same folder as this file."
    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    a, b = "# ===== KITCHEN COACH", "# ===== END OF KITCHEN COACH"
    if a not in source or b not in source:
        return "HINT: Keep Kitchen Coach as it was. Get a fresh copy of l60_coach.py if you changed it."
    coach = source.split(a, 1)[1].split("\n", 1)[1].split(b, 1)[0]

    def py(*args):
        return subprocess.run([sys.executable, "-B", *args], cwd=here, capture_output=True,
                              text=True, timeout=5, env={**__import__("os").environ, "PYTHONDONTWRITEBYTECODE": "1"})

    def last_error(done):
        lines = [x for x in done.stderr.splitlines() if x.strip()]
        return lines[-1] if lines else "an error"

    try:
        run_coach = py("-c", coach)
        run_import = py("-c", "import l60_kitchen")
        run_alone = py("l60_kitchen.py")
        probe = py("-c", (
            "import json, l60_kitchen as k\n"
            "res = {}\n"
            "for g, p in [(150, 130), (100, 52), (80, 380), (0, 130), (75, 33), (33, 91), (250, 64)]:\n"
            "    try:\n"
            "        res[f'{g},{p}'] = repr(k.kcal_in(g, p))\n"
            "    except Exception as e:\n"
            "        res[f'{g},{p}'] = 'ERR ' + type(e).__name__ + ': ' + str(e)\n"
            "res['protein'] = repr(k.protein_in(200, 9)) if hasattr(k, 'protein_in') else 'missing'\n"
            "print('@@' + json.dumps(res))\n"))
    except subprocess.TimeoutExpired:
        print("STEP 1: the cookbook never finished, so it was stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends in l60_kitchen.py? The cards need no loop."

    print("STEP 1: what Kitchen Coach prints")
    print("-" * 40)
    print(run_coach.stdout.rstrip() or "(nothing)")
    if run_coach.returncode != 0:
        print(last_error(run_coach))
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if run_import.returncode != 0:
        err = last_error(run_import)
        if err.startswith(("SyntaxError", "IndentationError")):
            return ("HINT: Python could not read l60_kitchen.py: " + err + "\n  Check the colon at the end of the "
                    "if line, and that each test line is pushed in by 4 spaces.")
        return "HINT: Importing l60_kitchen stopped with: " + err + "  Read it from the bottom up (lesson 4)."

    found = [x for x in probe.stdout.splitlines() if x.startswith("@@")]
    if probe.returncode != 0 or not found:
        return "HINT: Keep both cards in l60_kitchen.py:  def protein_in(grams, per_100g):  and  def kcal_in(grams, per_100g):"
    res = json.loads(found[0][2:])
    if res.pop("protein") != "18.0":
        return "HINT: protein_in changed. Leave it as it was: return grams * per_100g / 100"
    for key, got in res.items():
        g, p = (int(x) for x in key.split(","))
        want = round(g * p / 100)
        if got.startswith("ERR"):
            return f"HINT: kcal_in({g}, {p}) stopped with {got[4:]}"
        if got == "None":
            return f"HINT: kcal_in({g}, {p}) gave back None. Use return, not print (lesson 45)."
        if got != repr(want):
            if got == repr(g * p / 100):
                return (f"HINT: kcal_in({g}, {p}) gave {got}. Round it to a whole number:  "
                        "return round(grams * per_100g / 100)")
            return (f"HINT: kcal_in({g}, {p}) gave {got}, but it should be {want}.\n  The kcal in 100 g is per_100g, "
                    "so it is grams * per_100g / 100, rounded.")

    if run_import.stdout.strip():
        shown = run_import.stdout.strip().splitlines()[0]
        return ("HINT: Importing the cookbook still prints, starting with:  " + shown + "\n  Put the test lines under  "
                "if __name__ == \"__main__\":  and push each one in by 4 spaces.")
    if "__name__" not in book.read_text(encoding="utf-8"):
        return "HINT: Use  if __name__ == \"__main__\":  so the test lines still run when you run the cookbook on its own."
    if "Testing the cookbook" not in run_alone.stdout:
        return ("HINT: Run on its own, the cookbook should still print its test lines. Keep them, under  "
                "if __name__ == \"__main__\":  (two underscores on each side).")
    want_print = "Ben's lunch: 43.5 g protein\nAna's breakfast: 464 kcal"
    if run_coach.stdout.strip() != want_print:
        return "HINT: Kitchen Coach should print exactly the 2 lines shown at the top of this file."
    return ("PASS: Kitchen Coach imports your cookbook, and nothing leaks out of it. kcal_in works for any food, "
            "and the cookbook still tests itself when you run it on its own.")


verdict = _check()
print(verdict)
