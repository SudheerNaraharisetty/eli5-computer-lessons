# Lesson 63 exercise: Ben's protein table
#
# Kitchen Coach prints Ben's protein per meal as a neat table. It uses
# tabulate, a package from PyPI, the shop of cookbooks other people wrote.
# tabulate does NOT come with Python, so on a fresh computer the import
# line stops the whole program with ModuleNotFoundError.
#
# Your job, between START and END: make Kitchen Coach polite.
#
# - If tabulate is NOT installed: print HOW_TO_INSTALL (it is written for
#   you below) and stop calmly. No red traceback.
# - If tabulate IS installed: print the table, like now.
#
# Tools you know: try and except (lesson 53), ModuleNotFoundError
# (lesson 60), None and "is None" (lesson 16), if and else (lesson 20).
#
# How to run it: press the Run button at the top right of VS Code. In a
# terminal, from this folder: python3 l63_ben_table.py
#
# What happens when you run it, in two steps:
# - STEP 1. Kitchen Coach runs with YOUR Python, and you see what it prints.
# - STEP 2, THE CHECK. It runs Kitchen Coach twice more: once on a pretend
#   computer WITHOUT tabulate, once on a pretend computer WITH it. It says
#   PASS, or gives you one hint.
#
# After PASS, do it for real: follow the steps in HOW_TO_INSTALL, run this
# file again, and STEP 1 shows the real table.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs Kitchen Coach in a separate Python.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN COACH =====
MEALS = [
    ["Breakfast", "Greek yogurt", 20],
    ["Lunch", "Lentil soup", 18],
    ["Dinner", "Tofu stir-fry", 32],
]
HEADERS = ["Meal", "Dish", "Protein (g)"]

HOW_TO_INSTALL = """tabulate is not installed for this Python yet. Here is how:
  1. Open a terminal and cd into this exercises folder (lesson 3).
  2. Make a venv:     python3 -m venv .venv       (Windows: py -m venv .venv)
  3. Switch it on:    source .venv/bin/activate   (Windows: .venv\\Scripts\\activate)
  4. Install it:      python3 -m pip install -r l63_requirements.txt
                      (Windows: python -m pip install -r l63_requirements.txt)
  5. Python: Select Interpreter, pick the .venv one, and run this file again."""

# >>> START: change the lines below this line

from tabulate import tabulate

print(tabulate(MEALS, headers=HEADERS))

# <<< END: change the lines above this line
# ===== END OF KITCHEN COACH =====


# ===== THE CHECK =====
# You do not need to read this part yet. It runs Kitchen Coach in a separate
# Python with a 10 second limit, three times: with your Python, then on a
# pretend computer without tabulate, then on one with a pretend tabulate.
def _check():
    import os
    import subprocess
    import sys
    import tempfile

    here = pathlib.Path(__file__).resolve().parent
    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    a, b = "# ===== KITCHEN COACH", "# ===== END OF KITCHEN COACH"
    if a not in source or b not in source:
        return "HINT: Keep the KITCHEN COACH lines that mark where it starts and ends. Get a fresh copy if they are gone."
    coach = source.split(a, 1)[1].split("\n", 1)[1].split(b, 1)[0]
    if "tabulate" not in coach.split("# >>> START", 1)[-1]:
        return "HINT: Keep the import of tabulate between START and END. Put it under try: instead of deleting it."

    env = {**os.environ, "PYTHONDONTWRITEBYTECODE": "1"}
    env.pop("PYTHONPATH", None)

    def py(folder):
        return subprocess.run([sys.executable, "-B", "-c", coach], cwd=folder, capture_output=True,
                              text=True, timeout=10, env=env)

    def last_error(done):
        lines = [x for x in done.stderr.splitlines() if x.strip()]
        return lines[-1] if lines else "an error"

    missing = ('raise ModuleNotFoundError("No module named \'tabulate\'", name="tabulate")\n')
    pretend = ('def tabulate(rows, headers=(), **options):\n'
               '    return "@@TABLE " + repr([list(r) for r in rows]) + " " + repr(list(headers))\n')
    want_table = "@@TABLE " + repr([["Breakfast", "Greek yogurt", 20], ["Lunch", "Lentil soup", 18],
                                    ["Dinner", "Tofu stir-fry", 32]]) + " " + repr(["Meal", "Dish", "Protein (g)"])
    real_table = ("Meal       Dish             Protein (g)\n"
                  "---------  -------------  -------------\n"
                  "Breakfast  Greek yogurt              20\n"
                  "Lunch      Lentil soup               18\n"
                  "Dinner     Tofu stir-fry             32")

    try:
        mine = py(here)
        with tempfile.TemporaryDirectory() as without, tempfile.TemporaryDirectory() as with_it:
            pathlib.Path(without, "tabulate.py").write_text(missing, encoding="utf-8")
            pathlib.Path(with_it, "tabulate.py").write_text(pretend, encoding="utf-8")
            run_without = py(without)
            run_with = py(with_it)
    except subprocess.TimeoutExpired:
        print("STEP 1: Kitchen Coach never finished, so it was stopped after 10 seconds.")
        return "HINT: Is there a loop that never ends between START and END? This job needs no loop."

    print("STEP 1: what Kitchen Coach prints with your Python")
    print("-" * 46)
    print(mine.stdout.rstrip() or "(nothing)")
    if mine.returncode != 0:
        print(last_error(mine))
    print("-" * 46)
    print("STEP 2, THE CHECK")

    for done in (mine, run_without, run_with):
        err = last_error(done) if done.returncode != 0 else ""
        if err.startswith(("SyntaxError", "IndentationError")):
            return ("HINT: Python could not read your code: " + err + "\n  Check the colon after try: and "
                    "except ...:, and that the lines under each are pushed in by 4 spaces.")

    # Pretend computer 1: no tabulate.
    if run_without.returncode != 0:
        err = last_error(run_without)
        if "ModuleNotFoundError" in err:
            return ("HINT: Without tabulate, Kitchen Coach still crashes with ModuleNotFoundError.\n  Put the import "
                    "line under  try:  and catch it with  except ModuleNotFoundError:  (lessons 53 and 60).")
        if "NoneType" in err or "NameError" in err:
            return ("HINT: Without tabulate, the import was caught, but then the table line still ran and stopped "
                    "with:\n  " + err + "\n  Only print the table when tabulate is there. For example, set "
                    "tabulate = None in the except, then use  if tabulate is None:  and  else:")
        return "HINT: Without tabulate, Kitchen Coach stopped with: " + err + "  Read it from the bottom up (lesson 4)."
    if "python3 -m venv .venv" not in run_without.stdout:
        return ("HINT: Without tabulate, Kitchen Coach printed nothing to help. Print HOW_TO_INSTALL there:  "
                "print(HOW_TO_INSTALL)")
    if "@@TABLE" in run_without.stdout or "Traceback" in run_without.stderr:
        return "HINT: Without tabulate, print only HOW_TO_INSTALL."

    # Pretend computer 2: tabulate is there.
    if run_with.returncode != 0:
        return "HINT: With tabulate installed, Kitchen Coach stopped with: " + last_error(run_with)
    if want_table not in run_with.stdout:
        return ("HINT: With tabulate installed, Kitchen Coach should print the table, exactly as before:  "
                "print(tabulate(MEALS, headers=HEADERS))")
    if "python3 -m venv .venv" in run_with.stdout:
        return "HINT: With tabulate installed, print only the table, not HOW_TO_INSTALL. The except part is for when it is missing."

    # Your own computer.
    if real_table in mine.stdout:
        return ("PASS: Kitchen Coach prints the table when tabulate is there, and the install steps when it is not. "
                "And your Python has tabulate: the table above matches. Ben is happy.")
    if mine.returncode == 0 and "python3 -m venv .venv" not in mine.stdout:
        return ("PASS: Kitchen Coach prints the table when tabulate is there, and the install steps when it is not. "
                "Your Python has tabulate, so STEP 1 shows a real table.")
    return ("PASS: Kitchen Coach prints the table when tabulate is there, and the install steps when it is not.\n"
            "  Now do it for real: follow the 5 steps in STEP 1, then run this file again to see the real table.")


verdict = _check()
print(verdict)
