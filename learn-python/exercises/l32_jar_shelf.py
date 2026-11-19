# Lesson 32 exercise: The spice shelf
#
# Your spice jars stand on a shelf, in a list called spices. It is filled
# for you below the START line. Remember: the first jar has index 0.
#
# Write lines that print, word for word:
#
#   1. The FIRST spice:            First: salt
#   2. The THIRD spice:            Third: paprika
#   3. The LAST spice, using a NEGATIVE index (lesson 32):
#                                  Last: cinnamon
#   4. Swap the SECOND spice for "sumac" by its index, then print the
#      second spice again:         Second: sumac
#   5. Where "cumin" sits, using .index():
#                                  Cumin is at index 4
#
# With the list below, the program prints EXACTLY these 5 lines:
#
#   First: salt
#   Third: paprika
#   Last: cinnamon
#   Second: sumac
#   Cumin is at index 4
#
# Do not type the spice names yourself (except "sumac" and "cumin").
# Let the indexes find them. The check gives your lines other shelves,
# longer and shorter ones, with cumin in other places, so typed-in
# answers fail. Do not store a new list in spices.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l32_jar_shelf.py
# - Your lines run inside a safety net. If something never ends, it is
#   stopped after 5 seconds and you get a hint.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the list below, and you see what they
#   print.
# - STEP 2, THE CHECK. Your lines run again with 4 other shelves. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

spices = ["salt", "pepper", "paprika", "turmeric", "cumin", "cinnamon"]

print(f"First: {spices[0]}")

# 2. The third spice:

# 3. The last spice, with a negative index:

# 4. Swap the second spice for "sumac", then print it:

# 5. Where cumin sits, with .index():


# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# other shelves, and compares what they print with what they should print.
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
                + "  Check the brackets and quote marks on that line.")

    # Remove the list line, so the check can put in its own shelf.
    kept = []
    for line in your_code.splitlines():
        if line.replace(" ", "").startswith("spices=["):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        tree = ast.parse(body)
    except SyntaxError:
        return "HINT: Keep the list on one line, exactly as it was given:  spices = [...]"
    for node in ast.walk(tree):
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, (ast.AugAssign, ast.For)):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id == "spices":
                return ("HINT: Do not store a new value in spices. The check fills that "
                        "list itself, with other spices. To swap one jar, store into its "
                        "index:  spices[1] = \"sumac\"")

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

    def run(shelf):
        code = "spices = " + repr(shelf) + "\n" + body
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, ("HINT: Your lines never ended, so they were stopped after 5 "
                          "seconds. This exercise needs no loop at all.")
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped. No loop is needed here."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            tip = "  Read it from the bottom up (lesson 4)."
            if "IndexError" in last:
                tip = ("  An index went past the end of the shelf. The last jar is "
                       "spices[-1], never spices[len(spices)].")
            elif "ValueError" in last:
                tip = ("  .index() was asked for something that is not on the shelf. "
                       "Ask for exactly \"cumin\", and do it on spices.")
            return None, ("HINT: With spices = " + repr(shelf)
                          + ", Python stopped with an error: " + last + tip)
        return [line.rstrip() for line in done.stdout.splitlines() if line.strip()], None

    def want(shelf):
        return ["First: " + shelf[0], "Third: " + shelf[2], "Last: " + shelf[-1],
                "Second: sumac", "Cumin is at index " + str(shelf.index("cumin"))]

    # STEP 1: your lines with the list from the file.
    first = ["salt", "pepper", "paprika", "turmeric", "cumin", "cinnamon"]
    printed, problem = run(first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: 5 shelves")
    if problem:
        return problem

    labels = ["First", "Third", "Last", "Second", "Cumin"]
    shelves = [
        first,
        ["cumin", "chili", "ginger", "nutmeg", "clove", "fennel", "mint"],
        ["sage", "thyme", "cumin", "dill", "basil"],
        ["oregano", "basil", "saffron", "cardamom", "vanilla", "anise", "mace", "cumin"],
        ["fennel", "nigella", "cumin"],
    ]
    for shelf in shelves:
        if shelf == first:
            got = printed
        else:
            got, problem = run(shelf)
            if problem:
                return problem
        should = want(shelf)
        if got == should:
            continue
        shown = "HINT: With spices = " + repr(shelf)
        for i, line in enumerate(should):
            if i >= len(got):
                return (shown + ", your lines printed only " + str(len(got)) + " line(s). "
                        "Line " + str(i + 1) + " should be:  " + line)
            if got[i] != line:
                tips = [
                    "The first jar is spices[0].",
                    "The third jar is two steps from the start: spices[2], not spices[3].",
                    "Count from the end with a negative index: spices[-1]. A fixed number "
                    "like spices[5] only works for a shelf of exactly 6 jars.",
                    "Store the new spice at the second spot first:  spices[1] = \"sumac\"  "
                    "then print  spices[1].",
                    "Let .index() find it:  spices.index(\"cumin\")  hands back the "
                    "position. Do not type the number yourself.",
                ]
                return (shown + ", line " + str(i + 1) + " printed  " + got[i]
                        + "  but it should be  " + line + "\n" + tips[i])
        return (shown + ", your lines printed " + str(len(got)) + " lines. Print exactly 5: "
                + ", ".join(labels) + ".")

    negative = dotindex = swap = False
    for node in ast.walk(tree):
        if isinstance(node, ast.Subscript):
            index = node.slice
            if isinstance(index, ast.UnaryOp) and isinstance(index.op, ast.USub):
                negative = True
            if isinstance(index, ast.Constant) and isinstance(index.value, int) and index.value < 0:
                negative = True
        if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                and node.func.attr == "index"):
            dotindex = True
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if (isinstance(target, ast.Subscript) and isinstance(target.value, ast.Name)
                        and target.value.id == "spices"):
                    swap = True
    if not negative:
        return ("HINT: Every line is right. Now print the last spice with a negative "
                "index, as the task asks:  spices[-1]")
    if not dotindex:
        return ("HINT: Every line is right. Now find cumin with .index(), as the task "
                "asks:  spices.index(\"cumin\")")
    if not swap:
        return ("HINT: Every line is right. Now really swap the jar on the shelf:  "
                "spices[1] = \"sumac\"  and then print spices[1].")

    return ("PASS: 5 shelves, from 3 jars to 8, and you found the first, the third "
            "and the last jar on every one. Sumac is on the shelf and cumin was found "
            "wherever it stood. Counting from 0 is yours now.")


verdict = _check()
print(verdict)
