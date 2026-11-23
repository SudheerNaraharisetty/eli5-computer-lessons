# Lesson 62 exercise: Leave the big cookbook on the shelf (file 1 of 2)
#
# This is Kitchen Coach. It imports the slow cookbook l62_big_cookbook.py
# at the top, so EVERY run waits 1 second and prints
# "loading big cookbook...", even when you only want the shopping list.
#
# Your job, between START and END: make Coach load the big cookbook ONLY
# when it is used, in plan mode.
#
# - Python 3.15 or newer: put the word  lazy  in front of the import:
#
#       lazy import l62_big_cookbook
#
# - Python 3.14 or older: lazy is new in 3.15, and older Pythons say
#   "SyntaxError: invalid syntax" for it. Use the old trick instead: move
#   the import line INSIDE show_plan, pushed in by 4 spaces, as the first
#   line of the function. (Lesson 2 shows how to install Python 3.15.)
#
# Not sure which Python you have? Run this file first. The check tells you.
#
# How to run it: press the Run button at the top right of VS Code. In a
# terminal, from this folder:  python3 l62_coach.py
#
# What happens when you run it, in two steps:
# - STEP 1. The check runs Kitchen Coach twice, once in shopping mode and
#   once in plan mode, and shows what each run printed.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs Kitchen Coach with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN COACH =====
import time
start = time.perf_counter()

import json
import random

# >>> START: change the lines below this line

import l62_big_cookbook


def show_plan(guest):
    print(l62_big_cookbook.plan(guest))

# <<< END: change the lines above this line


print(f"Ready in {time.perf_counter() - start:.2f} s")
mode = input("Mode (shopping or plan)? ")
if mode == "plan":
    show_plan("Ana")
else:
    print("Shopping list: oats, rice, tofu")
# ===== END OF KITCHEN COACH =====


# ===== THE CHECK =====
# You do not need to read this part yet. It runs Kitchen Coach in a separate
# Python, with a 10 second limit, and types the mode for you. -B stops Python
# from saving a __pycache__ folder here.
def _check():
    import os
    import subprocess
    import sys

    here = pathlib.Path(__file__).resolve().parent
    new_python = sys.version_info >= (3, 15)
    version = f"{sys.version_info[0]}.{sys.version_info[1]}"
    print(f"Your Python is {version}.")
    if not new_python:
        print("NOTE: lazy import is new in Python 3.15, so this Python does not know it.")
        print("  Lesson 2 shows how to install 3.15. For now, use the trick that works")
        print("  everywhere: move the import line inside show_plan, 4 spaces in.")

    if not (here / "l62_big_cookbook.py").exists():
        return "HINT: l62_big_cookbook.py is missing. Keep it in the same folder as this file."
    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    a, b = "# ===== KITCHEN COACH =====", "# ===== END OF KITCHEN COACH ====="
    if a not in source or b not in source:
        return "HINT: Keep the KITCHEN COACH lines as they were. Get a fresh copy of l62_coach.py if you changed them."
    coach = source.split(a, 1)[1].split("\n", 1)[1].split(b, 1)[0]
    code_lines = [x.split("#")[0] for x in coach.splitlines()]
    uses_lazy = any(x.strip().startswith("lazy ") for x in code_lines)

    def py(args, typed=""):
        env = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")
        return subprocess.run([sys.executable, "-B"] + args, cwd=str(here), input=typed,
                              capture_output=True, text=True, timeout=10, env=env)

    def last_error(done):
        lines = [x for x in done.stderr.splitlines() if x.strip()]
        return lines[-1] if lines else "an error"

    try:
        book = py(["-c", "import l62_big_cookbook as b; print(b.plan('Ben'))"])
        shop = py(["-c", coach], "shopping\n")
        plan = py(["-c", coach], "plan\n")
    except subprocess.TimeoutExpired:
        return "HINT: Kitchen Coach did not finish within 10 seconds. Is there a loop that never ends?"

    for name, done in (("SHOPPING", shop), ("PLAN", plan)):
        print(f"STEP 1: Kitchen Coach in {name} mode prints")
        print("-" * 44)
        print(done.stdout.rstrip() or "(nothing)")
        if done.returncode != 0:
            print(last_error(done))
        print("-" * 44)
    print("STEP 2, THE CHECK")

    if "loading big cookbook..." not in book.stdout or "Meal plan for Ben" not in book.stdout:
        return "HINT: l62_big_cookbook.py changed. Get a fresh copy: it should print its loading line and have plan()."
    if shop.returncode != 0:
        err = last_error(shop)
        if err.startswith(("SyntaxError", "IndentationError")):
            return "HINT: Python could not read Kitchen Coach: " + err + "\n  Check that the lines inside show_plan are each pushed in by 4 spaces."
        return "HINT: In shopping mode Kitchen Coach stopped with: " + err + "  Read it from the bottom up (lesson 4)."
    if "Shopping list: oats, rice, tofu" not in shop.stdout:
        return "HINT: In shopping mode Kitchen Coach should print the shopping list. Keep the lines below END as they were."
    if "loading big cookbook..." in shop.stdout:
        if new_python:
            return ("HINT: In shopping mode the big cookbook still loads at the start. Put the word lazy in front\n"
                    "  of the import:  lazy import l62_big_cookbook")
        return ("HINT: In shopping mode the big cookbook still loads at the start. Move  import l62_big_cookbook\n"
                "  inside show_plan, as its first line, pushed in by 4 spaces.")
    if plan.returncode != 0:
        return ("HINT: In plan mode Kitchen Coach stopped with: " + last_error(plan) + "\n  Does show_plan still "
                "use l62_big_cookbook.plan(guest), and is the module name spelled l62_big_cookbook?")
    if "loading big cookbook..." not in plan.stdout or "Meal plan for Ana: 7 days, 21 meals" not in plan.stdout:
        return "HINT: In plan mode Kitchen Coach should load the big cookbook and print Ana's meal plan."
    if new_python and not uses_lazy:
        return ("HINT: That works: it is the old trick, with the import inside show_plan. You have Python " + version + ",\n"
                "  so try the new way: put  lazy import l62_big_cookbook  back at the top, outside show_plan.")
    if uses_lazy:
        return ("PASS: Shopping mode starts fast and never opens the big cookbook. Plan mode opens it the first "
                "time show_plan uses it. That is lazy import.")
    return ("PASS: Shopping mode starts fast and never opens the big cookbook. Plan mode imports it inside "
            "show_plan, only when it is needed. On Python 3.15, lazy import does the same from the top of the file.")


verdict = _check()
print(verdict)
