# Lesson 31 exercise: The dinner shopping list
#
# Tonight's dinner is a bean and rice bowl. Write the shopping list in Python.
#
#   1. Make a list called shopping with these 4 items, in this order:
#        "rice", "black beans", "tomatoes", "eggs"
#   2. You remember two more things. Add them to the end with .append(),
#      one line each, in this order:
#        "butter", then "lemons"
#   3. Print these 4 lines, word for word:
#
#        Items: 6
#        Eggs on the list: True
#        Buy: rice, black beans, tomatoes, eggs, butter, lemons
#        Ben's protein: 140 g
#
#      - Items: use len(shopping). Do not type the 6 yourself.
#      - Eggs on the list: use  "eggs" in shopping  (it gives True or False).
#      - Buy: use  ", ".join(shopping)  so the list prints without brackets.
#      - Ben's protein: add up the list ben_protein_g with sum().
#        The list is already written for you below. Do not change it.
#
# Tip: print can show several values with commas between them:
#   print("Eggs on the list:", "eggs" in shopping)
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l31_shopping_list.py
# - Your lines run inside a safety net. If they never end, they are stopped
#   after 5 seconds and you get a hint.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once and you see what they print.
# - STEP 2, THE CHECK. Your lines run again with another protein list, so a
#   typed-in 140 fails. The check says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

ben_protein_g = [30, 45, 40, 25]

# 1. Make the list. Start with:  shopping = [


# 2. Append "butter" and "lemons".


# 3. Print the 4 lines.


# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, and
# compares what they print with what they should print.
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
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the quotes, the commas and the square brackets.")

    # Take out the protein line, so the check can put in its own list.
    kept = [line for line in your_code.splitlines()
            if not line.replace(" ", "").startswith("ben_protein_g=[")]
    body = "\n".join(kept)

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
        "_ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), _ns)\n"
        "print('@@LIST@@', repr(_ns.get('shopping', '@@NONE@@')))\n"
    )

    def run(protein):
        code = "ben_protein_g = " + repr(protein) + "\n" + body
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, None, ("HINT: Your lines never ended, so they were stopped after 5 "
                                "seconds. This task needs no while loop.")
        if done.returncode == 3:
            return None, None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            hint = "  Read it from the bottom up (lesson 4)."
            if "expected str instance" in last:
                hint = ("  join only glues text. Join the shopping list, which holds text, "
                        "and add up the protein numbers with sum().")
            elif "name 'shopping' is not defined" in last:
                hint = "  Make the list first, at the top:  shopping = [\"rice\", ...]"
            return None, None, "HINT: Python stopped with an error: " + last + hint
        lines = done.stdout.splitlines()
        tail = [line for line in lines if line.startswith("@@LIST@@ ")]
        printed = [line.rstrip() for line in lines if not line.startswith("@@LIST@@") and line.strip()]
        return printed, (tail[-1][9:] if tail else None), None

    printed, final, problem = run([30, 45, 40, 25])
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: the shopping list")
    if problem:
        return problem

    items = ["rice", "black beans", "tomatoes", "eggs", "butter", "lemons"]
    if final == "'@@NONE@@'":
        return ("HINT: There is no list called shopping yet. Start with:\n"
                "  shopping = [\"rice\", \"black beans\", \"tomatoes\", \"eggs\"]")
    if final != repr(items):
        glued = ["'riceblack beans'", "'black beanstomatoes'", "'tomatoeseggs'"]
        if any(g in str(final) for g in glued):
            return ("HINT: Your list is " + final + ". Two items were glued into one. "
                    "A comma is missing between two of the items.")
        if final == repr(items[:4]):
            return ("HINT: The 4 items are right. Now add the other two:  "
                    "shopping.append(\"butter\")  and  shopping.append(\"lemons\")")
        return ("HINT: At the end, shopping should be:\n  " + repr(items)
                + "\nYours is:\n  " + str(final))

    appends = [n for n in ast.walk(tree) if isinstance(n, ast.Call)
               and isinstance(n.func, ast.Attribute) and n.func.attr == "append"]
    if len(appends) < 2:
        return ("HINT: The list is right, but write the first 4 items in the list and add "
                "butter and lemons with two  shopping.append(...)  lines.")

    want = ["Items: 6", "Eggs on the list: True",
            "Buy: " + ", ".join(items), "Ben's protein: 140 g"]
    if printed != want:
        for k, line in enumerate(want):
            got = printed[k] if k < len(printed) else "(nothing)"
            if got != line:
                return ("HINT: Line " + str(k + 1) + " should be, word for word:\n  " + line
                        + "\nYou printed:\n  " + got)
        return ("HINT: Print only the 4 lines. Extra lines:\n  "
                + "\n  ".join(printed[len(want):]))

    if "len(" not in your_code:
        return "HINT: Count the items with len(shopping), not a number you typed."
    if " in shopping" not in your_code:
        return "HINT: Ask the list with  \"eggs\" in shopping  instead of typing True."
    if ".join(" not in your_code:
        return "HINT: Make the Buy line with  \", \".join(shopping)  instead of typing the items."

    other, _, problem = run([20, 35])
    if problem:
        return problem
    if not other or other[-1] != "Ben's protein: 55 g":
        return ("HINT: With ben_protein_g = [20, 35] the last line should be  Ben's protein: 55 g"
                "  but it was  " + (other[-1] if other else "(nothing)")
                + ".  Use sum(ben_protein_g) instead of typing 140.")

    return ("PASS: 6 items on the list, eggs included, printed without brackets, and Ben's "
            "protein added up by sum(). Off to the shop.")


verdict = _check()
print(verdict)
