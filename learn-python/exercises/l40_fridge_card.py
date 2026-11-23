# Lesson 40 exercise: Chloe's fridge card
#
# Chloe cannot eat gluten. Her card on the fridge lists what she must never
# eat, and grandma's portion card says how many grams each guest gets.
# In the code below both cards are plain, changeable collections, and two
# lines scribble on them. Fix it so it prints these 3 lines, word for word.
# With the values below that is EXACTLY:
#
#   Never: ['barley', 'flour', 'rye']
#   Clash: ['flour']
#   Rice for 3 guests: 225 g
#
# Rules:
# - Laminate Chloe's card: make never a frozenset.   frozenset({...})
# - Laminate the portion card: make portions a frozendict.   frozendict({...})
#   frozendict is new in Python 3.15. On an older Python, leave portions a
#   plain dict for now: the check tells you, and skips that part.
#   (Lesson 2 installs Python 3.15.)
# - Delete the two lines that scribble on the cards. A frozen card refuses
#   them, so Python stops on them once the cards are frozen.
# - "Clash" is what is on the menu AND on Chloe's card. menu is a list, so
#   make a set from it first:  set(menu) & never
# - Print sets with sorted(), so the order is A to Z on every run.
# - "Rice for ..." is the rice portion times the number of guests. Make a
#   new value. Never change the card itself.
# - Do not type the answers yourself. The check runs your lines again with
#   another card, menu and number of guests, so typed-in answers fail.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l40_fridge_card.py
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

never = {"flour", "rye", "barley"}                     # Chloe: never these
portions = {"rice": 75, "pasta": 90, "salmon": 140}    # grams per guest
menu = ["rice", "salmon", "flour", "lemon"]            # tonight's menu
guests = 3

never.discard("flour")                           # a helper "tidies" the card. Oops!
portions["rice"] = portions["rice"] * guests     # writes on the card. Oops!

print(f"Never: {sorted(never)}")
print("Clash: ?")
print(f"Rice for {guests} guests: {portions['rice']} g")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, with
# other values, and compares what they print with what they should print.
def _check():
    import ast
    import subprocess
    import sys

    has_frozendict = sys.version_info >= (3, 15)
    version = f"{sys.version_info.major}.{sys.version_info.minor}"

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets: frozenset({...}) has round brackets around curly ones.")

    if not has_frozendict:
        print(f"NOTE: You are running Python {version}. frozendict is new in Python 3.15,")
        print("  so this check skips the frozendict part. Keep portions a plain dict")
        print("  for now, and install Python 3.15 (lesson 2) to do the whole exercise.")
        print()

    # Find how each card is made: a call like frozenset(...), or a plain {...}.
    made = {}
    for node in tree.body:
        if (isinstance(node, ast.Assign) and len(node.targets) == 1
                and isinstance(node.targets[0], ast.Name)):
            value = node.value
            if isinstance(value, ast.Call) and isinstance(value.func, ast.Name):
                made.setdefault(node.targets[0].id, value.func.id)
            else:
                made.setdefault(node.targets[0].id, type(value).__name__)
    if "never" not in made:
        return "HINT: Keep the line that makes Chloe's card:  never = frozenset({...})"
    if made["never"] != "frozenset":
        return ("HINT: never is still a plain set: a sticky note anyone can change. "
                "Laminate it:  never = frozenset({\"flour\", \"rye\", \"barley\"})")
    if "portions" not in made:
        return "HINT: Keep the line that makes the portion card:  portions = ..."
    if has_frozendict and made["portions"] != "frozendict":
        return ("HINT: portions is still a plain dict, and anyone can change it. "
                "Laminate it:  portions = frozendict({\"rice\": 75, ...})")
    if not has_frozendict and made["portions"] == "frozendict":
        return (f"HINT: frozendict needs Python 3.15, and this is Python {version}. "
                "For now write portions as a plain dict:  portions = {\"rice\": 75, ...}  "
                "Install Python 3.15 (lesson 2) to use frozendict.")

    # Remove the four value lines, so the check can put in its own values.
    kept, found = [], set()
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        name = bare.split("=", 1)[0] if "=" in bare else ""
        if name in ("never", "portions", "menu", "guests") and not bare.startswith(name + "=="):
            found.add(name)
            continue
        kept.append(line)
    if found != {"never", "portions", "menu", "guests"}:
        return ("HINT: Keep the four given lines, each on one line:  never = ..., "
                "portions = ..., menu = [...] and guests = 3. Make new names for new values.")
    body = "\n".join(kept)
    try:
        ast.parse(body)
    except SyntaxError:
        return "HINT: Keep the four given lines exactly as they were, each on one line."

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
        "if set(_ns['never']) != _ns['_never'] or dict(_ns['portions']) != _ns['_portions']:\n"
        "    print('@@CHANGED@@')\n"
    )

    def run(values):
        never, portions, menu, guests = values
        maker = "frozendict" if has_frozendict else "dict"
        code = (f"never = frozenset({sorted(never)!r})\n_never = {set(never)!r}\n"
                f"portions = {maker}({portions!r})\n_portions = {portions!r}\n"
                f"menu = {menu!r}\nguests = {guests!r}\n" + body)
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, "HINT: Your lines never ended, so they were stopped after 5 seconds."
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            if "'frozenset' object has no attribute" in last:
                return None, ("HINT: Python stopped with: " + last + "\n  Good: the laminated "
                              "card refused. Now delete the line that tries to change never.")
            if "'frozendict' object does not support item" in last:
                return None, ("HINT: Python stopped with: " + last + "\n  Good: the laminated "
                              "card refused. Delete the line that writes on portions, and print  "
                              "portions['rice'] * guests  instead.")
            if "unsupported operand" in last and "list" in last:
                return None, ("HINT: Python stopped with: " + last + "\n  menu is a list, and "
                              "& works on sets. Make a set from it first:  set(menu) & never")
            if "frozendict" in last and "not defined" in last:
                return None, (f"HINT: Python stopped with: {last}\n  frozendict needs Python 3.15. "
                              f"This is Python {version}. Install 3.15 (lesson 2).")
            return None, ("HINT: Python stopped with an error: " + last
                          + "  Read it from the bottom up (lesson 4).")
        lines = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        if "@@CHANGED@@" in lines:
            return None, ("HINT: Your lines changed a card. Delete the lines that write on never "
                          "or portions, and make new values instead.")
        return lines, None

    def want(values):
        never, portions, menu, guests = values
        return [
            "Never: " + str(sorted(never)),
            "Clash: " + str(sorted(set(menu) & set(never))),
            f"Rice for {guests} guests: {portions['rice'] * guests} g",
        ]

    first = ({"flour", "rye", "barley"}, {"rice": 75, "pasta": 90, "salmon": 140},
             ["rice", "salmon", "flour", "lemon"], 3)
    second = ({"pasta", "couscous", "barley", "rye"}, {"rice": 80, "pasta": 100, "couscous": 70},
              ["rice", "couscous", "pasta", "peas"], 4)
    printed, problem = run(first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: two dinners")
    if problem:
        return problem

    labels = ["Never:", "Clash:", "Rice for"]
    for values in [first, second]:
        got = printed if values is first else None
        if got is None:
            got, problem = run(values)
            if problem:
                return problem
        should = want(values)
        if got == should:
            continue
        extra = ("" if values is first else
                 "\n  (This was with another card and menu. Did you type an answer in instead "
                 "of working it out from never, portions, menu and guests?)")
        for label, line in zip(labels, should):
            mine = [g for g in got if g.startswith(label)]
            if not mine:
                return ("HINT: No line starts with  " + label + "  yet. Print the 3 lines in "
                        "this order:  Never, Clash, Rice for ...")
            mine = mine[0]
            if mine == line:
                continue
            if "{" in mine or "frozenset(" in mine:
                return ("HINT: You printed  " + mine + "\n  That is a set printed on its own, "
                        "and its order can change on every run. Wrap it in sorted(...).")
            return "HINT: You printed  " + mine + "\n  It should be  " + line + extra
        return "HINT: Print exactly the 3 lines, in order, and nothing else." + extra

    if not has_frozendict:
        return (f"PASS (on Python {version}): Chloe's card is laminated and the menu is "
                "checked. When you have Python 3.15, make portions a frozendict too.")
    return ("PASS: Both cards are laminated, the flour is caught before it reaches "
            "Chloe's plate, and grandma's portions are exactly as she wrote them.")


verdict = _check()
print(verdict)
