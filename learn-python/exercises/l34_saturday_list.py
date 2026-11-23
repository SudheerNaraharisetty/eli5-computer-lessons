# Lesson 34 exercise: The Saturday list
#
# It is Saturday. The shopping list hangs on the fridge, and your phone keeps
# buzzing. Apply the friends' texts to the list, IN THIS ORDER, with list
# methods:
#
#   1. Ben:   "add tofu"                        put "tofu" at the end
#   2. Chloe: "take the flour off, I'm gluten-free"   take "flour" off
#   3. Chloe: "and bread too, if it's on there"  take "bread" off, but ONLY if
#                                                it is on the list (ask with in)
#   4. Ana:   "bananas first!"                  put "bananas" at the very top
#   5. Ben:   "I'll pick up the tofu myself"    take the LAST item off with
#                                                pop(), keep what it hands back,
#                                                and print:  Ben buys: tofu
#   6. You:   sort the list A to Z, so you can walk the shop aisle by aisle
#   7. You:   print:  Saturday list: [...]  with the list inside the brackets
#
# With the list below, your program prints EXACTLY:
#
#   Ben buys: tofu
#   Saturday list: ['bananas', 'eggs', 'milk', 'rice', 'spinach']
#
# Rules:
# - Use list methods: append, remove, insert, pop and sort. They change the
#   list itself, so call each one on its own line.
# - Never write  shopping = ...  again. A method hands back None, so
#   shopping = shopping.sort() would put None in the jar.
# - Do not type the items yourself. The check runs your lines again with
#   another list (one that DOES have bread on it), so typed-in answers fail.
#
# The first text is done for you, and it has the classic mistake in it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l34_saturday_list.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the list below, and you see what they
#   print.
# - STEP 2, THE CHECK. Your lines run again with another list. The check says
#   PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

shopping = ["milk", "flour", "eggs", "rice", "spinach"]

shopping = shopping.append("tofu")    # 1. Ben: add tofu

# Now texts 2 to 7, one line (or an if) for each.

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# another list, and compares what they print with what they should print.
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
                + "  Check the brackets and the quote marks, like shopping.append(\"tofu\").")

    # Remove the given list line, so the check can put in its own list.
    kept = []
    for line in your_code.splitlines():
        if line.replace(" ", "").startswith("shopping=["):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        tree = ast.parse(body)
    except SyntaxError:
        return ("HINT: Keep the given list exactly as it was, on one line:  "
                "shopping = [\"milk\", \"flour\", ...]")

    used = set()
    for node in ast.walk(tree):
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, (ast.AugAssign, ast.AnnAssign)):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id == "shopping":
                return ("HINT: There is a  shopping = ...  line. A list method changes the "
                        "list itself and hands back None, so  shopping = shopping.append(\"tofu\")  "
                        "puts None in the jar. Write just  shopping.append(\"tofu\")  on its own line.")
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute):
            used.add(node.func.attr)

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

    def run(items):
        code = "shopping = " + repr(items) + "\n" + body
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            extra = ""
            if "x not in list" in last:
                extra = ("  remove() stops when the item is not on the list. Ask first: "
                         "if \"bread\" in shopping:  then remove it on the line under that.")
            elif "NoneType" in last:
                extra = "  Something is None: a method's answer went into a jar. Call methods on their own line."
            return None, ("HINT: Python stopped with an error: " + last + extra
                          + "  Read it from the bottom up (lesson 4).")
        return [line.rstrip() for line in done.stdout.splitlines() if line.strip()], None

    def _is_sorted(text):
        try:
            items = ast.literal_eval(text)
            return list(items) == sorted(items)
        except (ValueError, SyntaxError, TypeError):
            return True

    def want(items):
        items = list(items)
        items.append("tofu")
        items.remove("flour")
        if "bread" in items:
            items.remove("bread")
        items.insert(0, "bananas")
        last = items.pop()
        items.sort()
        return ["Ben buys: " + last, "Saturday list: " + str(items)]

    first = ["milk", "flour", "eggs", "rice", "spinach"]
    printed, problem = run(first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two Saturdays")
    if problem:
        return problem

    second = ["oats", "bread", "lemons", "flour", "chickpeas"]
    for items in [first, second]:
        if items is first:
            got = printed
        else:
            got, problem = run(items)
            if problem:
                return problem
        should = want(items)
        if got == should:
            continue
        other = "" if items is first else ("  (This was with another list: " + repr(items)
                                          + ". Did you type the answer in?)")
        buys = [g for g in got if g.startswith("Ben buys:")]
        final = [g for g in got if g.startswith("Saturday list:")]
        if not buys:
            return ("HINT: No line starts with  Ben buys:  yet. Keep what pop() hands back: "
                    "ben_buys = shopping.pop()  then print it with an f-string.")
        if buys[0] != should[0]:
            return ("HINT: You printed  " + buys[0] + "  but it should be  " + should[0]
                    + ". pop() with nothing in the brackets takes the LAST item. Did you pop "
                    "before Ben's tofu went on, or after sorting?" + other)
        if not final:
            return "HINT: No line starts with  Saturday list:  yet. Print the list at the very end."
        if final[0] != should[1]:
            mine, right = final[0], should[1]
            hint = "Go through the texts in order, one method each."
            if "'flour'" in mine:
                hint = "Flour is still on the list. Chloe asked for it to come off: shopping.remove(\"flour\")."
            elif "'bread'" in mine:
                hint = ("Bread is still on the list. Ask  if \"bread\" in shopping:  and remove it "
                        "on the line under that, pushed in by 4 spaces.")
            elif "'bananas'" not in mine:
                hint = "Bananas are missing. Ana wants them at the top: shopping.insert(0, \"bananas\")."
            elif "'tofu'" in mine:
                hint = "Tofu is still on the list. Ben buys it himself, so pop() it off."
            elif not _is_sorted(mine.split(": ", 1)[1]):
                hint = "The list is not A to Z yet. Call shopping.sort() on its own line, before the print."
            return "HINT: You printed  " + mine + "\n  It should be  " + right + "\n" + hint + other
        return "HINT: Print exactly the 2 lines, Ben buys first, then the Saturday list. Nothing else."

    missing = [m for m in ("append", "remove", "insert", "pop", "sort") if m not in used]
    if missing:
        return ("HINT: The result is right, but use the list methods: " + ", ".join(missing)
                + " is not used yet.")

    return ("PASS: Every text handled, in order. Tofu on, flour off, bread only if it was there, "
            "bananas on top, Ben's tofu popped off, and the list sorted A to Z. Happy shopping.")


verdict = _check()
print(verdict)
