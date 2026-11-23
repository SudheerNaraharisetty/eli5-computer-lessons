# Lesson 56 exercise: Save the shopping list
#
# After dinner, Kitchen Coach has next week's shopping list as
# (item, grams) pairs. It must be written down in the notebook, a file
# called l56_shopping.txt, so it is still there next week.
#
# This script CREATES that file itself, right next to this script, in the
# exercises folder. It is fine to leave it there, or delete it any time.
#
# Right now the script writes every item with no grams and no new line,
# so the file holds one long line: oatsricetofuspinachlentils
#
# Your job, between START and END:
# 1. Open the file with "w" (a clean page) and write ONE line per item,
#    the item, a colon, a space, the grams, a space and g, like this:
#        oats: 500 g
#    write() adds no new line by itself, so end each line with \n.
#    Use an f-string, so the number goes in as text.
#    Then close the file.
# 2. Chloe asks for one more thing after dinner: the pair in late_extra.
#    Open the SAME file again, this time with "a" (add to the end),
#    write that one line the same way, and close it.
#
# When it is right, l56_shopping.txt holds EXACTLY these 6 lines:
#
#   oats: 500 g
#   rice: 1000 g
#   tofu: 900 g
#   spinach: 300 g
#   lentils: 500 g
#   dark chocolate: 100 g
#
# The check runs your lines TWICE in a row. Because the first open uses
# "w", the second run starts on a clean page, so the file still has
# 6 lines, not 12.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l56_shopping_list.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run, and you see what ended up in the file.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

shopping = [("oats", 500), ("rice", 1000), ("tofu", 900), ("spinach", 300), ("lentils", 500)]
late_extra = ("dark chocolate", 100)

# The file goes next to this script. Lesson 58 explains this line.
path = pathlib.Path(__file__).with_name("l56_shopping.txt")

f = open(path, "w")
for item, grams in shopping:
    f.write(item)
f.close()

# Now open the same file again with "a" and add late_extra.

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them twice in a separate Python with a 5 second
# limit, then reads l56_shopping.txt and compares it, line by line.
def _check():
    import ast
    import subprocess
    import sys

    me = pathlib.Path(__file__).resolve()
    target = me.with_name("l56_shopping.txt")
    source = me.read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon after for, the brackets, and the quotes.")

    want = ["oats: 500 g", "rice: 1000 g", "tofu: 900 g", "spinach: 300 g",
            "lentils: 500 g", "dark chocolate: 100 g"]
    want_text = "".join(line + "\n" for line in want)

    # Runs your lines as if they were this file, so __file__ points here.
    runner = (
        "import sys, pathlib\n"
        "ns = {'__name__': '__main__', '__file__': sys.argv[2], 'pathlib': pathlib}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
    )

    def run_once():
        return subprocess.run([sys.executable, "-c", runner, your_code, str(me)],
                              capture_output=True, text=True, timeout=5)

    def read_file():
        try:
            return target.read_text(encoding="utf-8")
        except FileNotFoundError:
            return None

    if target.exists():
        target.unlink()   # start from no file, so an old result cannot pass
    try:
        first = run_once()
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? One for loop over shopping is enough."
    text1 = read_file()

    print("STEP 1: what is in l56_shopping.txt")
    print("-" * 40)
    if text1 is None:
        print("(there is no file yet)")
    elif text1 == "":
        print("(the file is empty)")
    else:
        print(text1, end="" if text1.endswith("\n") else "\n")
    if first.stdout.strip():
        print("(your lines also printed: " + " / ".join(first.stdout.strip().splitlines()) + ")")
    if first.returncode != 0:
        print((first.stderr.strip().splitlines() or ["an error"])[-1])
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if first.returncode != 0:
        last = (first.stderr.strip().splitlines() or ["an error"])[-1]
        if "write() argument must be str" in last:
            return ("HINT: Python stopped with: " + last + "\n  write() only takes text. Put the number "
                    "inside an f-string:  f.write(f\"{item}: {grams} g\\n\")")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling. The jars are called "
                    "shopping, late_extra, path, item and grams.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    if text1 is None:
        return "HINT: There is no l56_shopping.txt. Keep  path = ...  and open(path, \"w\")."
    lines = text1.splitlines()
    if len(lines) == 1 and len(want) > 1 and "\n" not in text1.rstrip("\n"):
        return ("HINT: Everything is on one line. write() adds no new line by itself.\n"
                "  End each line with \\n:  f.write(f\"{item}: {grams} g\\n\")")
    if lines[:5] != want[:5]:
        for i, (got, need) in enumerate(zip(lines, want)):
            if got != need:
                return ("HINT: Line " + str(i + 1) + " is  " + repr(got) + "  but it should be  "
                        + repr(need) + ".\n  Write the item, a colon and a space, the grams, a space and g.")
        return ("HINT: The file has " + str(len(lines)) + " lines. It should start with the 5 items "
                "from shopping, one per line.")
    if len(lines) == 5:
        return ("HINT: The 5 items are right. Now add late_extra: open the same path again with \"a\", "
                "write  dark chocolate: 100 g  and a \\n, and close it.")
    if lines != want or text1 != want_text:
        if lines == want:
            return "HINT: Almost. End the last line with \\n too, so the next line added starts on its own line."
        return ("HINT: The file holds " + str(len(lines)) + " lines. It should be exactly the 6 lines "
                "shown at the top of this file.")

    # Run it again: "w" must start a clean page, so the file stays the same.
    adds = [node for node in ast.walk(tree) if isinstance(node, ast.Constant) and node.value == "a"]
    try:
        run_once()
    except subprocess.TimeoutExpired:
        return "HINT: The second run never ended. Is there a loop that never ends?"
    text2 = read_file()
    if text2 != want_text:
        count = len((text2 or "").splitlines())
        return ("HINT: The first run was right, but after a second run the file has " + str(count)
                + " lines.\n  Open it with \"w\" first, so every run starts on a clean page. "
                "Use \"a\" only for late_extra.")
    if not adds:
        return ("HINT: The file is right. Now practise \"a\": write the 5 items with \"w\" and close, "
                "then open the file again with \"a\" and write late_extra.")
    return ("PASS: Six lines, one item each, with the grams. \"w\" started a clean page, "
            "\"a\" added Chloe's chocolate at the bottom, and a second run gives the same list.")


verdict = _check()
print(verdict)
