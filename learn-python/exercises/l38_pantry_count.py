# Lesson 38 exercise: Count the week, check the pantry
#
# Three things are filled in for you below the START line:
#   meals    every meal you ate this week, in order
#   pantry   a dictionary: item -> grams left in the jar
#   low_g    the limit: a jar with LESS than this many grams goes on the list
#
# Print these lines, word for word. With the values below that is EXACTLY:
#
#   Eaten this week:
#   oats: 3
#   rice: 2
#   tofu: 1
#   Buy soon:
#   lentils (0 g left)
#   pasta (150 g left)
#
# Rules:
# - Count with a dictionary called counts and .get():
#       counts[food] = counts.get(food, 0) + 1
#   The foods come out in the order they were first eaten.
# - For "Buy soon", loop over pantry.items() and print each jar that is
#   under low_g, in pantry order.
# - Do not type the foods or the numbers yourself. The check runs your lines
#   again with another week, another pantry and another limit, so typed-in
#   answers fail.
# - Do not store new values in meals, pantry or low_g.
#
# The code below has the bug from the lesson: counts[food] += 1 stops with
# KeyError on the very first meal. And the "Buy soon" part is still missing.
# Run it first and read the hint. Then fix it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l38_pantry_count.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the values below, and you see what
#   they print.
# - STEP 2, THE CHECK. Your lines run again with another week. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

meals = ["oats", "rice", "oats", "tofu", "oats", "rice"]
pantry = {"rice": 750, "oats": 400, "lentils": 0, "pasta": 150, "tofu": 300}
low_g = 200

counts = {}
for food in meals:
    counts[food] += 1

print("Eaten this week:")
for food, times in counts.items():
    print(f"{food}: {times}")

print("Buy soon:")
# Loop over pantry.items() here.

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# another week, and compares what they print with what they should print.
def _check():
    import ast
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon at the end of each for and if line, and the spaces "
                "at the start of the lines inside them.")

    # Remove the three given lines, so the check can put in its own values.
    kept = []
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        if bare.startswith(("meals=[", "pantry={", "low_g=")):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        tree = ast.parse(body)
    except SyntaxError:
        return ("HINT: Keep the three given lines exactly as they were, each on one line:  "
                "meals = [...]  pantry = {...}  and  low_g = ...")
    for node in ast.walk(tree):
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, ast.AugAssign):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id in ("meals", "pantry", "low_g"):
                return ("HINT: Do not store a value in " + target.id + ". The check fills it "
                        "itself with other values.")

    # Stop a program that prints forever, too, not only one that runs forever.
    cap = (
        "import os, sys\n"
        "class _Cap:\n"
        "    def __init__(self, real):\n"
        "        self.real, self.n = real, 0\n"
        "    def write(self, text):\n"
        "        self.n += len(text)\n"
        "        if self.n > 20000:\n"
        "            self.real.flush()\n"
        "            os._exit(3)\n"
        "        return self.real.write(text)\n"
        "    def flush(self):\n"
        "        self.real.flush()\n"
        "sys.stdout = _Cap(sys.stdout)\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), {'__name__': '__main__'})\n"
    )

    def run(meals, pantry, low_g):
        code = ("meals = " + repr(meals) + "\npantry = " + repr(pantry)
                + "\nlow_g = " + repr(low_g) + "\n" + body + "\n")
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            if last.startswith("KeyError"):
                return None, ("HINT: Python stopped with " + last + ". The first time a food "
                              "comes up, it has no count yet, so  counts[food] += 1  has "
                              "nothing to add 1 to. Write  counts[food] = counts.get(food, 0) + 1  "
                              "instead.")
            if last.startswith("RuntimeError"):
                return None, ("HINT: Python stopped with " + last + ". Do not add or remove "
                              "keys in the dictionary you are looping over.")
            return None, ("HINT: Python stopped with an error: " + last
                          + "  Read it from the bottom up (lesson 4).")
        lines = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        return lines, None

    def want(meals, pantry, low_g):
        counts = {}
        for food in meals:
            counts[food] = counts.get(food, 0) + 1
        return (["Eaten this week:"] + [f"{food}: {times}" for food, times in counts.items()]
                + ["Buy soon:"]
                + [f"{item} ({grams} g left)" for item, grams in pantry.items() if grams < low_g])

    first = (["oats", "rice", "oats", "tofu", "oats", "rice"],
             {"rice": 750, "oats": 400, "lentils": 0, "pasta": 150, "tofu": 300}, 200)
    printed, problem = run(*first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two weeks in the kitchen")
    if problem:
        return problem

    second = (["lentils", "pasta", "lentils", "eggs", "lentils"],
              {"flour": 1000, "butter": 120, "milk": 50, "rice": 900, "eggs": 480}, 500)
    for week in [first, second]:
        if week != first:
            printed, problem = run(*week)
            if problem:
                return problem
        other = "" if week == first else (
            "  (This was with another week: meals " + repr(week[0]) + ", pantry "
            + repr(week[1]) + ", low_g " + repr(week[2]) + ". Did you type something in "
            "instead of letting .get() and .items() work it out?)")
        should = want(*week)
        if printed == should:
            continue
        for k, line in enumerate(should):
            got = printed[k] if k < len(printed) else "(nothing)"
            if got != line:
                return ("HINT: Line " + str(k + 1) + " should be, word for word:\n  " + line
                        + "\nYou printed:\n  " + got + other)
        return ("HINT: Print only these lines. Extra lines:\n  "
                + "\n  ".join(printed[len(should):]))

    if ".get(" not in body:
        return ("HINT: Every line is right. Now count with .get():  "
                "counts[food] = counts.get(food, 0) + 1")
    if ".items()" not in body:
        return ("HINT: Every line is right. Now walk the pantry with  "
                "for item, grams in pantry.items():")

    return ("PASS: Every meal counted from 0, no KeyError, and the shopping list came "
            "straight from pantry.items(). Kitchen Coach knows what to buy.")


verdict = _check()
print(verdict)
