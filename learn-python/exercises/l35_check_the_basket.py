# Lesson 35 exercise: Check the basket
#
# You are back from the shop. Chloe eats no gluten. Two lists are filled
# for you below the START line:
#   basket   everything you bought
#   gluten   the foods that have gluten in them
#
# Check EVERY item in the basket and print these lines, word for word.
# With the lists below that is EXACTLY:
#
#   Gluten: pasta
#   Gluten: rye bread
#   Gluten: couscous
#   Safe for Chloe: ['oats', 'rice', 'tofu', 'lentils']
#   4 of 7 items are safe
#
# Rules:
# - One "Gluten: ..." line for each gluten item, in basket order.
# - Build a NEW list of the safe items with .append(). Leave basket exactly
#   as it is: never remove items from it.
# - Do not type the items or the numbers yourself. The check runs your lines
#   again with another basket, so typed-in answers fail. len() counts for you.
# - Do not store new values in basket or gluten.
#
# The code below already runs, but it has the bug from the lesson: it
# removes items from the basket while it loops over it. Run it first and
# look at what it prints. Then fix it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l35_check_the_basket.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the lists below, and you see what
#   they print.
# - STEP 2, THE CHECK. Your lines run again with another basket. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

basket = ["oats", "pasta", "rye bread", "rice", "tofu", "couscous", "lentils"]
gluten = ["pasta", "rye bread", "couscous", "flour", "barley"]

for item in basket:
    if item in gluten:
        print(f"Gluten: {item}")
        basket.remove(item)

print(f"Safe for Chloe: {basket}")
print(f"{len(basket)} of 7 items are safe")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# another basket, and compares what they print with what they should print.
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

    # Remove the two list lines, so the check can put in its own lists.
    kept = []
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        if bare.startswith("basket=[") or bare.startswith("gluten=["):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        tree = ast.parse(body)
    except SyntaxError:
        return ("HINT: Keep the two given lists exactly as they were, each on one line:  "
                "basket = [...]  and  gluten = [...]")
    for node in ast.walk(tree):
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, ast.AugAssign):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id in ("basket", "gluten"):
                return ("HINT: Do not store a value in " + target.id + ". The check fills it "
                        "itself with another list. Loop over it instead.")

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

    def run(basket, gluten):
        code = ("basket = " + repr(basket) + "\ngluten = " + repr(gluten) + "\n" + body
                + "\nprint('@@BASKET', repr(basket))\n")
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            return None, None, ("HINT: Python stopped with an error: " + last
                                + "  Read it from the bottom up (lesson 4).")
        lines = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        after = [line for line in lines if line.startswith("@@BASKET ")]
        printed = [line for line in lines if not line.startswith("@@BASKET ")]
        return printed, (after[-1][9:] if after else None), None

    def want(basket, gluten):
        safe = [item for item in basket if item not in gluten]
        return (["Gluten: " + item for item in basket if item in gluten]
                + ["Safe for Chloe: " + str(safe),
                   str(len(safe)) + " of " + str(len(basket)) + " items are safe"])

    first = (["oats", "pasta", "rye bread", "rice", "tofu", "couscous", "lentils"],
             ["pasta", "rye bread", "couscous", "flour", "barley"])
    printed, after, problem = run(*first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two baskets to unpack")
    if problem:
        return problem

    second = (["flour", "barley", "eggs", "pasta", "milk", "beans"],
              ["pasta", "flour", "barley", "bread"])
    for basket, gluten in [first, second]:
        if (basket, gluten) != first:
            printed, after, problem = run(basket, gluten)
            if problem:
                return problem
        other = "" if (basket, gluten) == first else (
            "  (This was with another basket: " + repr(basket) + ". Did you type something "
            "in instead of letting the loop and len() work it out?)")
        if after != repr(basket):
            return ("HINT: The basket changed while your lines ran. At the end it was\n  "
                    + str(after) + "\nRemoving items from a list while you loop over it "
                    "makes the loop skip the next item. Leave basket alone: start  "
                    "safe = []  before the loop and  .append()  each safe item to it.")
        should = want(basket, gluten)
        if printed == should:
            continue
        for k, line in enumerate(should):
            got = printed[k] if k < len(printed) else "(nothing)"
            if got != line:
                return ("HINT: Line " + str(k + 1) + " should be, word for word:\n  " + line
                        + "\nYou printed:\n  " + got + other)
        return ("HINT: Print only these lines. Extra lines:\n  "
                + "\n  ".join(printed[len(should):]))

    if ".append(" not in body:
        return ("HINT: Every line is right. Now build the safe list with .append(): "
                "safe = [] before the loop, safe.append(item) inside it.")

    return ("PASS: Every item checked, nothing skipped. Rye bread stayed out of Chloe's "
            "dinner, the basket is untouched, and the count comes from len().")


verdict = _check()
print(verdict)
