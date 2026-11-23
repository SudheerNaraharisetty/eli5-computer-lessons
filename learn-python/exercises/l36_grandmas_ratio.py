# Lesson 36 exercise: Grandma's ratio
#
# Grandma's pancakes, one batch: 200 g flour, 300 ml milk, 2 eggs.
# Ana, Ben and Chloe each want a batch, so you shop for 3 batches.
#
# The code below keeps the recipe in a LIST and scribbles on it, so the last
# line no longer shows grandma's card. Fix it so it prints these 3 lines,
# word for word. With the values below that is EXACTLY:
#
#   Grandma's card: (200, 300, 2)
#   For 3 batches: 600 g flour, 900 ml milk, 6 eggs
#   Card unchanged: (200, 300, 2)
#
# Rules:
# - Make pancake a TUPLE: round brackets, not square ones.
# - Unpack it in one line:  flour, milk, eggs = pancake
# - Make NEW values for the amounts. Never change pancake itself.
# - Do not type the amounts yourself. The check runs your lines again with
#   another recipe and another number of batches, so typed-in answers fail.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l36_grandmas_ratio.py
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

pancake = [200, 300, 2]   # grandma's card, one batch: flour g, milk ml, eggs
batches = 3

print(f"Grandma's card: {pancake}")

# Scale it for the batches. This scribbles on grandma's card!
pancake[0] = pancake[0] * batches
pancake[1] = pancake[1] * batches
pancake[2] = pancake[2] * batches
print(f"For {batches} batches: {pancake[0]} g flour, {pancake[1]} ml milk, {pancake[2]} eggs")

print(f"Card unchanged: {pancake}")

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
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets and the commas: a tuple looks like (200, 300, 2).")

    # Find the line that makes the card, and check that it is a tuple.
    card = None
    for node in tree.body:
        if (isinstance(node, ast.Assign) and len(node.targets) == 1
                and isinstance(node.targets[0], ast.Name) and node.targets[0].id == "pancake"):
            card = node
            break
    if card is None:
        return "HINT: Keep the line that makes grandma's card:  pancake = (200, 300, 2)"
    if isinstance(card.value, ast.List):
        return ("HINT: Grandma's card is still a list: square brackets, so anyone can "
                "scribble on it. Make it a tuple with round brackets:  pancake = (200, 300, 2)")
    if not isinstance(card.value, ast.Tuple):
        return "HINT: Make grandma's card a tuple of 3 numbers:  pancake = (200, 300, 2)"

    # Remove the two value lines, so the check can put in its own values.
    kept = []
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        if bare.startswith("pancake=") or bare.startswith("batches="):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        body_tree = ast.parse(body)
    except SyntaxError:
        return ("HINT: Keep the two given lines exactly as they were, each on one line:  "
                "pancake = (...)  and  batches = 3")
    unpacks = False
    for node in ast.walk(body_tree):
        if isinstance(node, (ast.Assign, ast.AugAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            for target in targets:
                if isinstance(target, ast.Name) and target.id in ("pancake", "batches"):
                    return ("HINT: Do not store a new value in " + target.id + ". Leave grandma's "
                            "card alone and make new values, like  flour * batches.")
                if (isinstance(target, ast.Tuple) and isinstance(node, ast.Assign)
                        and isinstance(node.value, ast.Name) and node.value.id == "pancake"):
                    unpacks = True

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
        "if _ns.get('pancake') != _ns.get('_original'):\n"
        "    print('@@CHANGED@@')\n"
    )

    def run(card, batches):
        code = ("pancake = " + repr(card) + "\n_original = " + repr(card)
                + "\nbatches = " + repr(batches) + "\n" + body)
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            if "does not support item assignment" in last:
                return None, ("HINT: Python stopped with: " + last + "\n  Good: the tuple "
                              "protects grandma's card. Now stop writing on it. Unpack it "
                              "with  flour, milk, eggs = pancake  and print  flour * batches  "
                              "and so on.")
            return None, ("HINT: Python stopped with an error: " + last
                          + "  Read it from the bottom up (lesson 4).")
        lines = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        if "@@CHANGED@@" in lines:
            return None, "HINT: Your lines changed pancake. Leave grandma's card exactly as it was."
        return lines, None

    def want(card, batches):
        flour, milk, eggs = card
        return [
            "Grandma's card: " + str(card),
            f"For {batches} batches: {flour * batches} g flour, {milk * batches} ml milk, "
            f"{eggs * batches} eggs",
            "Card unchanged: " + str(card),
        ]

    first = ((200, 300, 2), 3)
    printed, problem = run(*first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two shopping trips")
    if problem:
        return problem

    labels = ["Grandma's card", "For ", "Card unchanged"]
    second = ((250, 400, 3), 5)
    for card_, batches in [first, second]:
        if (card_, batches) == first:
            got = printed
        else:
            got, problem = run(card_, batches)
            if problem:
                return problem
        should = want(card_, batches)
        if got == should:
            continue
        shown = "pancake = " + repr(card_) + " and batches = " + repr(batches)
        extra = ("" if (card_, batches) == first else
                 "\n  (This was with other values: " + shown + ". Did you type a number "
                 "in instead of using flour, milk, eggs and batches?)")
        for label, line in zip(labels, should):
            mine = [g for g in got if g.startswith(label)]
            if not mine:
                return ("HINT: No line starts with  " + label.strip() + "  yet. Print the 3 lines "
                        "in this order:  Grandma's card, For ... batches, Card unchanged.")
            if mine[0] != line:
                return "HINT: You printed  " + mine[0] + "\n  It should be  " + line + extra
        return "HINT: Print exactly the 3 lines, in order, and nothing else." + extra

    if not unpacks:
        return ("HINT: Every line is right. Now do it the tuple way: unpack the card in one "
                "line,  flour, milk, eggs = pancake,  and use those jars.")

    return ("PASS: Grandma's card is laminated. Three batches for Ana, Ben and Chloe, "
            "and the ratio is exactly as she wrote it.")


verdict = _check()
print(verdict)
