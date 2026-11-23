# Lesson 39 exercise: No duplicate ingredients
#
# Ana, Ben and Chloe each sent a list of what they want for the weekend.
# The code below joins the lists, so eggs and bananas end up on the
# shopping list more than once. Fix it so it prints these 3 lines,
# word for word. With the lists below that is EXACTLY:
#
#   To buy: ['bananas', 'berries', 'eggs', 'lentils', 'oats', 'pasta', 'rice', 'tofu', 'yogurt']
#   All three want: ['bananas', 'eggs']
#   Only Ben wants: ['lentils', 'tofu']
#
# Rules:
# - Make a set from each friend's list:  set(ana)  and so on.
# - "To buy" has one of each thing that anyone wants.
# - "All three want" is what is in all three sets:  &
# - "Only Ben wants" is in Ben's set, and not in Ana's, and not in Chloe's.
#   Take both away:  ben_set - ana_set - chloe_set
# - Print every set with sorted(), so the order is A to Z on every run.
#   (A set printed on its own can come out in a different order each time.)
# - Do not type the answers yourself. The check runs your lines again with
#   three other lists, so typed-in answers fail.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l39_no_duplicates.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the lists below, and you see what
#   they print.
# - STEP 2, THE CHECK. Your lines run again with other lists. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

ana = ["pasta", "eggs", "bananas", "eggs", "oats"]
ben = ["eggs", "tofu", "lentils", "rice", "bananas"]
chloe = ["eggs", "berries", "rice", "bananas", "yogurt"]

merged = ana + ben + chloe
print(f"To buy: {merged}")
print("All three want: ?")
print("Only Ben wants: ?")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# other lists, and compares what they print with what they should print.
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
                + "  Check the brackets, the quotes and the commas.")

    # Remove the three list lines, so the check can put in its own lists.
    kept, found = [], set()
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        name = bare.split("=", 1)[0] if bare.count("=") >= 1 else ""
        if name in ("ana", "ben", "chloe") and bare.startswith(name + "=["):
            found.add(name)
            continue
        kept.append(line)
    if found != {"ana", "ben", "chloe"}:
        return ("HINT: Keep the three given list lines exactly as they were, each on one line:  "
                "ana = [...], ben = [...] and chloe = [...]")
    body = "\n".join(kept)
    try:
        ast.parse(body)
    except SyntaxError:
        return "HINT: Keep the three given list lines exactly as they were, each on one line."

    # Stop a program that prints forever, too, not only one that runs forever.
    # The hash seed changes for each run, as it does normally.
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

    def run(lists):
        code = "".join(f"{n} = {lists[n]!r}\n" for n in ("ana", "ben", "chloe")) + body
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            if "not subscriptable" in last:
                return None, ("HINT: Python stopped with: " + last + "\n  A set has no index. "
                              "Use sorted(...) to get a list, A to Z.")
            if "unsupported operand" in last and "list" in last:
                return None, ("HINT: Python stopped with: " + last + "\n  & and - work on sets, "
                              "not lists. Make a set from each list first:  set(ana)")
            return None, ("HINT: Python stopped with an error: " + last
                          + "  Read it from the bottom up (lesson 4).")
        lines = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        return lines, None

    def want(lists):
        a, b, c = (set(lists[n]) for n in ("ana", "ben", "chloe"))
        return [
            "To buy: " + str(sorted(a | b | c)),
            "All three want: " + str(sorted(a & b & c)),
            "Only Ben wants: " + str(sorted(b - a - c)),
        ]

    first = {
        "ana": ["pasta", "eggs", "bananas", "eggs", "oats"],
        "ben": ["eggs", "tofu", "lentils", "rice", "bananas"],
        "chloe": ["eggs", "berries", "rice", "bananas", "yogurt"],
    }
    second = {
        "ana": ["rice", "oats", "milk", "rice"],
        "ben": ["beans", "milk", "rice", "seitan", "beans"],
        "chloe": ["milk", "cocoa", "rice", "oats"],
    }
    printed, problem = run(first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two weekends")
    if problem:
        return problem

    labels = ["To buy:", "All three want:", "Only Ben wants:"]
    for lists in [first, second]:
        got = printed if lists is first else None
        if got is None:
            got, problem = run(lists)
            if problem:
                return problem
        should = want(lists)
        if got == should:
            continue
        extra = ("" if lists is first else
                 "\n  (This was with other lists. Did you type an answer in instead of "
                 "working it out from ana, ben and chloe?)")
        for label, line in zip(labels, should):
            mine = [g for g in got if g.startswith(label)]
            if not mine:
                return ("HINT: No line starts with  " + label + "  yet. Print the 3 lines in "
                        "this order:  To buy, All three want, Only Ben wants.")
            mine = mine[0]
            if mine == line:
                continue
            if "{" in mine:
                return ("HINT: You printed  " + mine + "\n  That is a set printed on its own, "
                        "and its order can change on every run. Wrap it in sorted(...).")
            if label == "To buy:" and mine.count("'eggs'") > 1:
                return ("HINT: You printed  " + mine + "\n  Eggs is on it more than once. "
                        "A set keeps one of each: make a set from the lists.")
            return "HINT: You printed  " + mine + "\n  It should be  " + line + extra
        return "HINT: Print exactly the 3 lines, in order, and nothing else." + extra

    return ("PASS: One of each on the shopping list, eggs and bananas for everyone, "
            "and only Ben's extras for Ben. No duplicate ingredients!")


verdict = _check()
print(verdict)
