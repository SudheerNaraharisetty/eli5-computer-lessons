# Lesson 41 exercise: The guest book
#
# Kitchen Coach keeps one record per friend in a dictionary of dictionaries,
# called guests. It is filled in for you just above the START line.
# Each friend has a "kcal" number and a "likes" list.
#
# Print these lines, word for word. With the guests below that is EXACTLY:
#
#   Ana: pasta
#   Ben: tofu
#   Chloe: pudding
#   Total: 7400 kcal
#   Chloe's list: ['pudding', 'berries', 'rice']
#
# Rules:
# - Loop over guests.items(). For each friend print the name, a colon and
#   the FIRST food in their "likes" list. One step per bracket:
#   info["likes"] is the list, and [0] is the first thing in it.
# - Add up every friend's "kcal" into total, inside the same loop.
# - Add "rice" to the END of Chloe's "likes" list, in guests itself,
#   BEFORE the last print.
# - Do not type the foods or the numbers yourself. The check runs your lines
#   again with other guests, so typed-in answers fail.
# - Do not store a new value in guests.
#
# The code below has the wrong-step bug from the lesson: info[0] asks a
# dictionary for position 0, and a dictionary has no positions. So Python
# stops with KeyError: 0. The total and the rice are still missing too.
# Run it first and read the hint. Then fix it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l41_guest_book.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the guests below, and you see what
#   they print.
# - STEP 2, THE CHECK. Your lines run again with other guests. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# Leave guests as it is. (The check gives your lines its own copy.)
guests = {
    "Ana": {"goal": "carbs", "kcal": 2600, "likes": ["pasta", "oats"]},
    "Ben": {"goal": "protein", "kcal": 2800, "likes": ["tofu", "lentils"]},
    "Chloe": {"goal": "dessert", "kcal": 2000, "likes": ["pudding", "berries"]},
}

# >>> START: write your lines below this line

total = 0
for name, info in guests.items():
    first = info[0]
    print(f"{name}: {first}")
    # add this friend's kcal to total here

print(f"Total: {total} kcal")

# add "rice" to Chloe's likes here

chloe_likes = guests["Chloe"]["likes"]
print("Chloe's list:", chloe_likes)

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# other guests, and compares what they print with what they should print.
def _check():
    import ast
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    body = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(body)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon at the end of the for line, the spaces at the "
                "start of the lines inside it, and that every bracket is closed.")
    for node in ast.walk(tree):
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, (ast.AugAssign, ast.AnnAssign)):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id == "guests":
                return ("HINT: Do not store a new value in guests. Change Chloe's list "
                        "inside it with .append() instead.")

    # Stop a program that prints forever, too, not only one that runs forever.
    # After your lines, one hidden line prints guests, so the check can see Chloe's list.
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
        "import ast\n"
        "ns = {'__name__': '__main__', 'guests': ast.literal_eval(sys.argv[2])}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "print('@@GUESTS@@' + repr(ns.get('guests')))\n"
    )

    def run(guests):
        try:
            done = subprocess.run([sys.executable, "-c", cap, body, repr(guests)],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            if last.startswith("KeyError: 0"):
                return None, None, ("HINT: Python stopped with " + last + ". info is one "
                                    "friend's dictionary, and a dictionary has no position 0. "
                                    "Take one more step: info[\"likes\"] is the list, and "
                                    "info[\"likes\"][0] is the first food in it.")
            if last.startswith("KeyError"):
                return None, None, ("HINT: Python stopped with " + last + ". Keys must "
                                    "match exactly: \"likes\", \"kcal\" and \"Chloe\", in "
                                    "double quotes, with the same capitals.")
            if last.startswith("TypeError"):
                return None, None, ("HINT: Python stopped with " + last + ". One step went "
                                    "to the wrong kind of container. A dict takes a key in "
                                    "brackets, a list takes a number. Print each step to see "
                                    "what you have.")
            return None, None, ("HINT: Python stopped with an error: " + last
                                + "  Read it from the bottom up (lesson 4).")
        lines = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        after = None
        if lines and lines[-1].startswith("@@GUESTS@@"):
            after = lines.pop()[len("@@GUESTS@@"):]
        return lines, after, None

    def want(guests):
        out, total = [], 0
        for name, info in guests.items():
            out.append(f"{name}: {info['likes'][0]}")
            total += info["kcal"]
        out.append(f"Total: {total} kcal")
        out.append("Chloe's list: " + repr(guests["Chloe"]["likes"] + ["rice"]))
        return out

    first = {
        "Ana": {"goal": "carbs", "kcal": 2600, "likes": ["pasta", "oats"]},
        "Ben": {"goal": "protein", "kcal": 2800, "likes": ["tofu", "lentils"]},
        "Chloe": {"goal": "dessert", "kcal": 2000, "likes": ["pudding", "berries"]},
    }
    printed, after, problem = run(first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two guest books")
    if problem:
        return problem

    second = {
        "Dan": {"goal": "energy", "kcal": 2300, "likes": ["noodles", "eggs", "rice"]},
        "Chloe": {"goal": "dessert", "kcal": 1900, "likes": ["sorbet"]},
        "Eve": {"goal": "carbs", "kcal": 2450, "likes": ["bagels"]},
        "Ben": {"goal": "protein", "kcal": 3000, "likes": ["beans", "tofu"]},
    }
    for book in [first, second]:
        if book is not first:
            printed, after, problem = run(book)
            if problem:
                return problem
        other = "" if book is first else (
            "  (This was with other guests: " + ", ".join(book) + ". Did you type "
            "something in instead of reading it from guests?)")
        should = want(book)
        for k, line in enumerate(should):
            got = printed[k] if k < len(printed) else "(nothing)"
            if got != line:
                if line.startswith("Chloe's list") and got.startswith("Chloe's list"):
                    return ("HINT: The last line should be:\n  " + line + "\nYou printed:\n  "
                            + got + "\nAdd \"rice\" to the end of Chloe's list with  "
                            "guests[\"Chloe\"][\"likes\"].append(\"rice\")  before that print."
                            + other)
                return ("HINT: Line " + str(k + 1) + " should be, word for word:\n  " + line
                        + "\nYou printed:\n  " + got + other)
        if len(printed) > len(should):
            return ("HINT: Print only these lines. Extra lines:\n  "
                    + "\n  ".join(printed[len(should):]))
        expect = {n: dict(i) for n, i in book.items()}
        expect["Chloe"]["likes"] = book["Chloe"]["likes"] + ["rice"]
        if after != repr(expect):
            return ("HINT: Every line is right, but guests itself did not end up with rice "
                    "on Chloe's list, and nothing else changed. Change the list inside guests "
                    "with .append(\"rice\"), not a new list.")

    if ".append(" not in body:
        return "HINT: Every line is right. Now add the rice with .append(\"rice\")."

    return ("PASS: One step per bracket, every first favourite found, the calories "
            "added up, and rice is on Chloe's list inside guests. Kitchen Coach knows "
            "its guests.")


verdict = _check()
print(verdict)
