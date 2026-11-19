# Lesson 3 exercise: the evening plan
#
# Ana, Ben and Chloe are coming for dinner. Your plan for the evening
# got shuffled, and the goodbye fell off the end.
#
# Make the program print exactly 5 lines, in this order:
#   1. your friends arrive       (the line must contain the word "arrive")
#   2. the starter               (must contain "Starter")
#   3. the main                  (must contain "Main")
#   4. the dessert               (must contain "Dessert")
#   5. goodbye                   (must contain "Goodbye")
#
# 1. Change the code between the START and END lines below.
#    Move whole lines up or down, and add the goodbye line.
# 2. Save the file. Look at the tab at the top: no dot means it is saved.
# 3. Run it. In VS Code, press the Run button (the triangle) at the top right.
#    In a terminal, from the exercises folder, type:  python3 l03_dinner_file.py
#    (on Windows:  py l03_dinner_file.py)
# 4. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: write your plan below this line

print("Dessert: rice pudding")
print("Ana, Ben and Chloe arrive at 7")
print("Main: bean chili with rice")
print("Starter: tomato soup")

# <<< END: write your plan above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your plan again,
# quietly, and looks at what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your plan between them."
    plan_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    with contextlib.redirect_stdout(printed):
        exec(plan_code, {})
    lines = printed.getvalue().splitlines()

    steps = [("arrive", "your friends arrive"), ("starter", "the starter"),
             ("main", "the main"), ("dessert", "the dessert"), ("goodbye", "the goodbye")]
    low = [line.lower() for line in lines]

    if len(lines) == 0:
        return "HINT: Nothing was printed. Each line of the plan needs its own print(...)."
    if len(lines) == 4 and not any("goodbye" in line for line in low):
        return ("HINT: 4 lines so far. The goodbye is still missing. "
                'Add a 5th line, for example: print("Goodbye, see you next Friday!")')
    if any(line.strip() == "" for line in lines):
        return "HINT: One of your lines is empty. Remove the empty print() so every line is a step."
    if len(lines) != 5:
        return ("HINT: You printed " + str(len(lines)) + " line" + ("" if len(lines) == 1 else "s")
                + ". The plan needs exactly 5 lines, one print(...) for each step.")
    for word, name in steps:
        if not any(word in line for line in low):
            return 'HINT: No line mentions "' + word + '". One line should be ' + name + "."
    for i, (word, name) in enumerate(steps):
        if word not in low[i]:
            found = next(n for n, line in enumerate(low) if word in line)
            return ("HINT: Line " + str(i + 1) + " should be " + name + ", but that is on line "
                    + str(found + 1) + ". Move it " + ("up" if found > i else "down")
                    + ". Python prints the lines from top to bottom.")
    return "PASS: Arrive, starter, main, dessert, goodbye. A perfect evening, in the right order!"


print()
print("-" * 40)
print(_check())
