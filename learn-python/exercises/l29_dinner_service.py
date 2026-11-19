# Lesson 29 exercise: Dinner service
#
# Tonight every guest gets every course. Two lists are filled for you below
# the START line:
#   guests    the names of everyone at the table, in seating order
#   courses   the courses of the menu, in serving order
# (A list is a shopping list of values in square brackets. Lesson 31
# explains lists fully. For now you only need to loop over one.)
#
# Use a loop inside a loop to print, word for word:
#
#   1. One line per guest and course, guest by guest, like this:
#        Ana: tomato soup
#        Ana: beef stew
#        Ana: rice pudding
#        Ben: tomato soup
#        ...
#   2. Ben's rule: Ben eats no meat. Skip every course that has the word
#      "beef" in its name, but ONLY for Ben. Use continue (lesson 28).
#      A skipped course prints nothing and is not a serving.
#   3. Then ONE last line with the number of plates served:
#        Total servings: 8
#
# With the lists below, the program prints EXACTLY these 9 lines:
#
#   Ana: tomato soup
#   Ana: beef stew
#   Ana: rice pudding
#   Ben: tomato soup
#   Ben: rice pudding
#   Chloe: tomato soup
#   Chloe: beef stew
#   Chloe: rice pudding
#   Total servings: 8
#
# Do not type the names or the courses yourself. Let the loops read them.
# The check gives your lines other tables and other menus, so typed-in
# answers fail. Do not store new values in guests or courses.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l29_dinner_service.py
# - Your lines run inside a safety net. If a loop never ends, it is stopped
#   after 5 seconds and you get a hint.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the lists below, and you see what they
#   print.
# - STEP 2, THE CHECK. Your lines run again with 5 other tables. The check
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

guests = ["Ana", "Ben", "Chloe"]
courses = ["tomato soup", "beef stew", "rice pudding"]

servings = 0

# Write your loops here. Start with:  for guest in guests:


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
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon at the end of each for line, and the spaces in front.")

    # Remove the two list lines, so the check can put in its own lists.
    kept = []
    for line in your_code.splitlines():
        bare = line.replace(" ", "")
        if bare.startswith("guests=[") or bare.startswith("courses=["):
            continue
        kept.append(line)
    body = "\n".join(kept)
    try:
        body_tree = ast.parse(body)
    except SyntaxError:
        return ("HINT: Keep each list on one line, exactly as it was given:  "
                "guests = [...]  and  courses = [...]")
    for node in ast.walk(body_tree):
        targets = []
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, (ast.AugAssign, ast.For)):
            targets = [node.target]
        for target in targets:
            if isinstance(target, ast.Name) and target.id in ("guests", "courses"):
                return ("HINT: Do not store a value in " + target.id + ". The check fills "
                        "that list itself, with other values. Loop over it with a new "
                        "name: for guest in guests:  and  for course in courses:")

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

    def run(names, menu):
        code = "guests = " + repr(names) + "\ncourses = " + repr(menu) + "\n" + body
        try:
            done = subprocess.run([sys.executable, "-c", cap, code],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return None, ("HINT: Your loops never ended, so they were stopped after 5 "
                          "seconds. Use for loops over the lists, not while.")
        if done.returncode == 3:
            return None, "HINT: Your lines printed forever, so they were stopped. Use for loops over the two lists."
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            return None, ("HINT: With guests = " + repr(names) + " and courses = " + repr(menu)
                          + ", Python stopped with an error: " + last
                          + "  Read it from the bottom up (lesson 4).")
        return [line.rstrip() for line in done.stdout.splitlines() if line.strip()], None

    def want(names, menu):
        lines = []
        for guest in names:
            for course in menu:
                if guest == "Ben" and "beef" in course:
                    continue
                lines.append(guest + ": " + course)
        return lines + ["Total servings: " + str(len(lines))]

    # STEP 1: your lines with the lists from the file.
    first = (["Ana", "Ben", "Chloe"], ["tomato soup", "beef stew", "rice pudding"])
    printed, problem = run(*first)
    print("STEP 1: what your lines print")
    print("-" * 40)
    if printed is not None:
        print("\n".join(printed) if printed else "(nothing yet)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK: 6 tables to serve")
    if problem:
        return problem

    loops = [n for n in ast.walk(body_tree) if isinstance(n, ast.For)]
    nested = any(isinstance(inner, ast.For) and inner is not outer
                 for outer in loops for inner in ast.walk(outer))
    if not loops:
        return ("HINT: Nothing loops yet. Start with  for guest in guests:  and, pushed in "
                "under it, a second loop:  for course in courses:")
    if not nested:
        return ("HINT: Put the course loop INSIDE the guest loop: push  for course in courses:  "
                "in by 4 spaces under  for guest in guests:  and its print by 8.")
    for outer in loops:
        for inner in ast.walk(outer):
            if (isinstance(inner, ast.For) and inner is not outer
                    and isinstance(inner.target, ast.Name) and isinstance(outer.target, ast.Name)
                    and inner.target.id == outer.target.id):
                return ("HINT: Both loops use the name " + inner.target.id + ". The inner loop "
                        "overwrites the outer one's jar. Give each loop its own name: "
                        "guest and course.")

    tables = [
        first,
        (["Chloe", "Ben"], ["beef burger", "green salad"]),
        (["Ana"], ["pasta", "beef ragu", "fruit"]),
        (["Ben", "Dev", "Ana", "Chloe"], ["soup", "bread", "roast beef"]),
        ([], ["soup"]),
        (["Ana", "Ben"], []),
    ]
    for names, menu in tables:
        if (names, menu) == first:
            got = printed
        else:
            got, problem = run(names, menu)
            if problem:
                return problem
        should = want(names, menu)
        if got == should:
            continue
        shown = "guests = " + repr(names) + " and courses = " + repr(menu)
        totals = [line for line in got if line.startswith("Total servings")]
        plates = [line for line in got if not line.startswith("Total servings")]
        if len(totals) > 1:
            return ("HINT: 'Total servings' was printed " + str(len(totals)) + " times. "
                    "That print is inside a loop. Move it back to the left edge, AFTER "
                    "both loops, so it runs once.")
        if plates != should[:-1]:
            full = [g + ": " + c for g in names for c in menu]
            if plates == full and full != should[:-1]:
                return ("HINT: With " + shown + ", Ben was served a beef dish. Inside the "
                        "course loop, before the print, add:  if guest == \"Ben\" and "
                        "\"beef\" in course:  and, pushed in under it,  continue")
            return ("HINT: With " + shown + " the plates were:\n  "
                    + "\n  ".join(plates or ["(none)"]) + "\nThey should be:\n  "
                    + "\n  ".join(should[:-1] or ["(none)"])
                    + "\nOne line per guest and course, guest by guest:  "
                    "print(f\"{guest}: {course}\")  in the inner loop.")
        if not totals:
            return ("HINT: The plates are right. Now count them: servings += 1 inside the "
                    "inner loop, after the print, and at the very end, at the left edge:  "
                    "print(f\"Total servings: {servings}\")")
        if totals[0] != should[-1]:
            return ("HINT: With " + shown + " you printed  " + totals[0] + "  but it should be  "
                    + should[-1] + ".  Add 1 only when a plate is really served: put "
                    "servings += 1 in the inner loop, after continue and next to the print.")
        return "HINT: Print the plates first, then the total as the very last line."

    if not any(isinstance(n, ast.Continue) for n in ast.walk(body_tree)):
        return ("HINT: Every line is right. Now write Ben's rule with continue, as lesson 28 "
                "showed:  if guest == \"Ben\" and \"beef\" in course:  then  continue")

    return ("PASS: 6 tables, from a full house to an empty menu, and every plate came out "
            "in the right order. Ben never saw any beef. Dinner is served.")


verdict = _check()
print(verdict)
