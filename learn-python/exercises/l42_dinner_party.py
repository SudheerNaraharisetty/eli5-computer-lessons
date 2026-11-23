# Lesson 42 exercise: The dinner party
#
# Kitchen Coach is planning a dinner party for Ana, Ben and Chloe.
# Someone stored ALL the party data in lists. Each job wants a different
# container: a list, a tuple, a dict or a set. Change the 4 lines between
# START and END so each jar uses the right container:
#
#   courses    The order of the courses. The order matters, and Chloe
#              will add a course in the middle.
#   oven       The oven setting: 180 degrees, fan. A fixed record.
#   goals      Each guest's protein goal in grams, looked up by name.
#   allergens  Every allergen anyone has. One of each, and a fast "in".
#
# Tips:
# - One of the four is already right. Which one?
# - tuple(...), dict(...) and set(...) turn a list into that container.
#   dict(...) needs a list of pairs, like the one in goals: key, then value.
#   You can also write the new container out by hand.
# - Keep the names and the values the same. Only the containers change.
#
# Under END is the party plan. Do not change it. It uses your 4 jars.
# With the right containers it prints EXACTLY these 5 lines:
#
#   Courses: ['tomato soup', 'green salad', 'bean chili', 'rice pudding']
#   Oven: 180 C, fan
#   Ben needs 140 g protein
#   Keep off the table: ['gluten', 'nuts', 'sesame']
#   Anyone allergic to nuts? True
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l42_dinner_party.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your 4 lines run, then the party plan, and you see what it prints.
# - STEP 2, THE CHECK. It looks at the type of each jar and at the printed
#   lines. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: change the 4 lines below this line

courses = ["tomato soup", "bean chili", "rice pudding"]
oven = [180, "fan"]
goals = [["Ana", 90], ["Ben", 140], ["Chloe", 70]]
allergens = ["nuts", "gluten", "nuts", "sesame", "gluten"]

# <<< END: change the 4 lines above this line


# ===== THE PARTY PLAN (do not change) =====
courses.insert(1, "green salad")      # Chloe adds a course
print("Courses:", courses)
temp, mode = oven
print(f"Oven: {temp} C, {mode}")
print("Ben needs", goals["Ben"], "g protein")
print("Keep off the table:", sorted(allergens))
print("Anyone allergic to nuts?", "nuts" in allergens)
# ===== END OF THE PARTY PLAN =====


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit,
# looks at the type of each jar, then runs the party plan.
def _check():
    import ast
    import json
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    plan_start, plan_end = "# ===== THE PARTY PLAN", "# ===== END OF THE PARTY PLAN"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    if plan_start not in source or plan_end not in source:
        return "HINT: Keep the party plan as it was. Get a fresh copy of the file if you changed it."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    plan = source.split(plan_start, 1)[1].split("\n", 1)[1].split(plan_end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets, the quotes and the commas.")

    names = ["courses", "oven", "goals", "allergens"]
    runner = (
        "import json, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        f"kinds = {{n: type(ns[n]).__name__ if n in ns else None for n in {names!r}}}\n"
        "sys.stderr.write('@@TYPES ' + json.dumps(kinds) + '\\n')\n"
        "sys.stderr.flush()\n"
        "exec(compile(sys.argv[2], 'the party plan', 'exec'), ns)\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code, plan],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        return "HINT: Your lines never ended, so they were stopped after 5 seconds."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what the party plan prints")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK")

    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@TYPES ")]
    found = [line for line in done.stderr.splitlines() if line.startswith("@@TYPES ")]
    last = (errors or ["an error"])[-1]
    if not found:
        return ("HINT: Your 4 lines stopped with an error: " + last
                + "\n  Read it from the bottom up (lesson 4).")
    kinds = json.loads(found[0][len("@@TYPES "):])

    for name in names:
        if kinds[name] is None:
            return "HINT: There is no jar called " + name + " any more. Keep all 4 names exactly as they were."
    if kinds["courses"] != "list":
        return ("HINT: courses is now a " + kinds["courses"] + ". The order of the courses matters, "
                "and Chloe adds one in the middle with .insert(). That is a job for a list. "
                "It was already right.")
    if kinds["oven"] != "tuple":
        return ("HINT: oven is a " + kinds["oven"] + ". 180 degrees, fan is a fixed record that "
                "should never change by accident. Make it a tuple: tuple(...) or round brackets.")
    if kinds["goals"] != "dict":
        if "list indices must be integers" in last:
            return ("HINT: Python stopped with: " + last + "\n  goals is a list, and a list only "
                    "knows positions. The plan asks for goals[\"Ben\"], by name. Make goals a dict: "
                    "dict(goals), or write {\"Ana\": 90, ...} by hand.")
        return ("HINT: goals is a " + kinds["goals"] + ". Kitchen Coach looks goals up by a name, "
                "goals[\"Ben\"]. Make it a dict: dict(goals), or write {\"Ana\": 90, ...} by hand.")
    if kinds["allergens"] not in ("set", "frozenset"):
        return ("HINT: allergens is a " + kinds["allergens"] + ", so nuts and gluten are in it twice. "
                "You only ask \"is it in?\" and want one of each. Make it a set: set(...).")
    if done.returncode != 0:
        return ("HINT: The party plan stopped with: " + last
                + "\n  The containers are right. Check that the names and values are the same as before.")

    should = [
        "Courses: ['tomato soup', 'green salad', 'bean chili', 'rice pudding']",
        "Oven: 180 C, fan",
        "Ben needs 140 g protein",
        "Keep off the table: ['gluten', 'nuts', 'sesame']",
        "Anyone allergic to nuts? True",
    ]
    for mine, line in zip(printed + [""] * 5, should):
        if mine != line:
            return ("HINT: The plan printed  " + (mine or "(nothing)") + "\n  It should be  " + line
                    + "\n  The containers are right. Keep the names and values the same as before.")
    if len(printed) != len(should):
        return "HINT: The plan should print exactly 5 lines. Do not add print lines of your own."

    return ("PASS: Courses in a list, the oven in a tuple, goals in a dict and allergens in a set. "
            "Each job has the right container. Enjoy the party!")


verdict = _check()
print(verdict)
