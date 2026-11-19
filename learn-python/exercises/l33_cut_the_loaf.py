# Lesson 33 exercise: Cut the loaf
#
# Ana logged her runs for two weeks, one number per day, in km. A 0 is a
# rest day. Two values are filled for you below the START line:
#   runs_km     14 numbers: days 1 to 7 are week 1, days 8 to 14 are week 2
#   race_date   the date of her race, as text: "year-month-day"
#
# Use SLICES to print these 6 lines, word for word. With the values below
# that is EXACTLY:
#
#   First week: [5, 6, 0, 8, 5, 0, 12]
#   Second week: [6, 7, 0, 9, 6, 0, 14]
#   Every second day of week 1: [5, 0, 5, 12]
#   Last three days: [6, 0, 14]
#   Reversed: [14, 0, 6, 9, 0, 7, 6, 12, 0, 5, 8, 0, 6, 5]
#   Race year: 2027
#
# Rules:
# - Use slices, like runs_km[0:7]. Remember: the stop is never included.
# - No loops in this one. A slice does the cutting for you.
# - Do not type the numbers or the year yourself. The check runs your lines
#   again with another two weeks and another date, so typed-in answers fail.
# - Do not store new values in runs_km or race_date.
#
# The first line is written for you, and it has an off-by-one in it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l33_cut_the_loaf.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the values below, and you see what
#   they print.
# - STEP 2, THE CHECK. Your lines run again with other values. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

runs_km = [5, 6, 0, 8, 5, 0, 12, 6, 7, 0, 9, 6, 0, 14]
race_date = "2027-04-11"

print(f"First week: {runs_km[0:6]}")

# Now print the second week, every second day of week 1, the last three days,
# the whole list reversed, and the race year. One print with a slice for each.

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# other values, and compares what they print with what they should print.
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
                + "  Check the brackets: a slice sits inside square brackets, like runs_km[0:7].")

    # Remove the two value lines, so the check can put in its own values.
    kept = []
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        if bare.startswith("runs_km=[") or bare.startswith("race_date="):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        tree = ast.parse(body)
    except SyntaxError:
        return ("HINT: Keep the two given lines exactly as they were, each on one line:  "
                "runs_km = [...]  and  race_date = \"...\"")
    for node in ast.walk(tree):
        if isinstance(node, (ast.For, ast.While, ast.ListComp, ast.GeneratorExp,
                             ast.comprehension)):
            return ("HINT: No loops in this one. A slice cuts the whole piece in one go: "
                    "runs_km[7:14] is the second week.")
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, ast.AugAssign):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id in ("runs_km", "race_date"):
                return ("HINT: Do not store a value in " + target.id + ". The check fills it "
                        "itself with other values. Slice it and print the slice.")

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

    def run(runs, date):
        code = "runs_km = " + repr(runs) + "\nrace_date = " + repr(date) + "\n" + body
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            return None, ("HINT: Python stopped with an error: " + last
                          + "  Read it from the bottom up (lesson 4).")
        return [line.rstrip() for line in done.stdout.splitlines() if line.strip()], None

    def want(runs, date):
        return [
            "First week: " + str(runs[:7]),
            "Second week: " + str(runs[7:]),
            "Every second day of week 1: " + str(runs[:7:2]),
            "Last three days: " + str(runs[-3:]),
            "Reversed: " + str(runs[::-1]),
            "Race year: " + date[:4],
        ]

    first = ([5, 6, 0, 8, 5, 0, 12, 6, 7, 0, 9, 6, 0, 14], "2027-04-11")
    printed, problem = run(*first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two loaves to cut")
    if problem:
        return problem

    labels = ["First week", "Second week", "Every second day of week 1",
              "Last three days", "Reversed", "Race year"]
    hints = {
        "First week": "Week 1 is days 1 to 7, which sit at positions 0 to 6. The stop is "
                      "never included, so the stop is 7: runs_km[0:7], or runs_km[:7].",
        "Second week": "Week 2 starts at position 7 and runs to the end: runs_km[7:14], "
                       "or runs_km[7:] with no stop at all.",
        "Every second day of week 1": "Take week 1 and add a step of 2 as the third number: "
                                      "runs_km[0:7:2]. That gives positions 0, 2, 4 and 6.",
        "Last three days": "Count from the end with a minus: runs_km[-3:]. A plain [3:] "
                           "starts at position 3 and gives far more than three.",
        "Reversed": "A step of -1 walks the list back to front: runs_km[::-1].",
        "Race year": "Slicing works on text too. The year is the first 4 characters of "
                     "race_date: race_date[:4].",
    }
    second = ([3, 0, 4, 4, 0, 6, 10, 5, 0, 8, 6, 0, 3, 21], "2028-10-01")
    for runs, date in [first, second]:
        got = printed if (runs, date) == first else run(runs, date)
        if (runs, date) != first:
            got, problem = got
            if problem:
                return problem
        should = want(runs, date)
        if got == should:
            continue
        shown = "runs_km = " + repr(runs) + " and race_date = " + repr(date)
        for label, line in zip(labels, should):
            mine = [g for g in got if g.split(":")[0] == label]
            if not mine:
                return ("HINT: No line starts with  " + label + ":  yet. Add it, word for word, "
                        "in this order:  " + ", ".join(labels) + ".")
            if mine[0] != line:
                extra = ("" if (runs, date) == first else
                         "  (This was with other values: " + shown + ". Did you type it in "
                         "instead of slicing?)")
                return ("HINT: You printed  " + mine[0] + "\n  It should be  " + line
                        + "\n" + hints[label] + extra)
        return ("HINT: Print exactly the 6 lines, in this order:  " + ", ".join(labels)
                + ". Nothing else.")

    if not any(isinstance(node, ast.Slice) for node in ast.walk(tree)):
        return "HINT: Every line is right. Now make them with slices: a colon inside square brackets."

    return ("PASS: Two loaves cut cleanly: both weeks, every second day, the last three, "
            "back to front, and the year from a date. No crumbs, no loops, no off-by-one.")


verdict = _check()
print(verdict)
