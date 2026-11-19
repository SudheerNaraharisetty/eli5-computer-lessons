# Lesson 26 exercise: Serve the table
#
# Dinner is ready. Two lists are filled for you, above the START line:
#   guests         the names of everyone at the table
#   meal_calories  the calories of Ana's meals before her race
# A list is a shopping list of values in square brackets. Lesson 31 explains
# lists fully. For now you only need to loop over one:  for guest in guests:
#
# Use for loops to print, word for word:
#
#   1. One greeting per guest, in the order of the list:
#        Welcome, Ana!
#        Welcome, Ben!
#        Welcome, Chloe!
#   2. Then ONE line with the total of Ana's meals:
#        Ana's total: 1750 calories
#
# Do not type the names or the numbers yourself. Let the loops read them from
# the lists. The check gives your code other lists, so typed-in answers fail.
# Do not store new values in guests or meal_calories between START and END.
#
# The accumulator pattern from the lesson:
#   total = 0                  before the loop
#   total += calories          inside the loop (pushed in)
#   print(...)                 after the loop (back at the left edge)
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l26_serve_the_table.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, with the lists below.
# - STEP 2, THE CHECK. Your lines run again with other tables: one guest, four
#   guests, and an empty table. The check says PASS, or gives you one hint.

guests = ["Ana", "Ben", "Chloe"]
meal_calories = [450, 700, 600]

# >>> START: write your lines below this line

# 1. Greet each guest. Start with:  for guest in guests:


# 2. Add up Ana's meals, then print the total once.
total = 0


# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# STEP 2, THE CHECK. You do not need to read this part yet. It runs your lines
# again with other lists and reads what was printed each time.
# ---------------------------------------------------------------------------
def _check():
    import ast
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)

    for node in ast.walk(tree):
        if isinstance(node, (ast.Assign, ast.AugAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            for target in targets:
                if isinstance(target, ast.Name) and target.id in ("guests", "meal_calories"):
                    return ("HINT: Do not store a value in " + target.id + " between START "
                            "and END. The check fills that list itself, with other values.")

    loops = [n for n in ast.walk(tree) if isinstance(n, ast.For)]
    if not loops:
        return ("HINT: Nothing loops yet. Start with  for guest in guests:  and, pushed in "
                "by 4 spaces under it, a print with an f-string: f\"Welcome, {guest}!\"")

    tables = [
        (["Ana", "Ben", "Chloe"], [450, 700, 600]),
        (["Ben"], [300]),
        (["Chloe", "Ana", "Ben", "Dev"], [520, 0, 880, 410]),
        ([], []),
    ]
    for names, meals in tables:
        printed = io.StringIO()
        try:
            with contextlib.redirect_stdout(printed):
                exec(your_code, {"guests": list(names), "meal_calories": list(meals)})
        except Exception as error:
            return ("HINT: With guests = " + repr(names) + ", Python stopped with "
                    + type(error).__name__ + ": " + str(error))
        lines = [line.strip() for line in printed.getvalue().splitlines() if line.strip()]
        want_total = "Ana's total: " + str(sum(meals)) + " calories"
        greetings = [line for line in lines if line.startswith("Welcome")]
        totals = [line for line in lines if line.startswith("Ana's total")]
        want_greetings = ["Welcome, " + name + "!" for name in names]
        shown = "guests = " + repr(names) + " and meal_calories = " + repr(meals)

        if greetings != want_greetings:
            if not greetings and names:
                return ("HINT: No greeting was printed. Inside  for guest in guests:  print "
                        "f\"Welcome, {guest}!\"")
            return ("HINT: With " + shown + " the greetings were:\n  "
                    + "\n  ".join(greetings or ["(none)"]) + "\nThey should be:\n  "
                    + "\n  ".join(want_greetings or ["(none, the table is empty)"])
                    + "\nLet the loop read the names. Do not type them yourself.")
        if len(totals) > 1:
            return ("HINT: The total was printed " + str(len(totals)) + " times:\n  "
                    + "\n  ".join(totals) + "\nThat is a running total, printed inside the "
                    "loop. Move the print back to the left edge, AFTER the loop, so it runs once.")
        if not totals:
            return ("HINT: No total line yet. After the loop, at the left edge, print "
                    "f\"Ana's total: {total} calories\"")
        if totals[0] != want_total:
            if meals and totals[0] == "Ana's total: " + str(meals[-1]) + " calories" and meals[-1] != sum(meals):
                return ("HINT: The total is " + str(meals[-1]) + ", the LAST meal only. "
                        "Is total = 0 inside the loop? Then it starts again every round. "
                        "Put total = 0 once, BEFORE the loop.")
            return ("HINT: With " + shown + " you printed:\n  " + totals[0]
                    + "\nIt should be, word for word:\n  " + want_total)
        if lines.index(totals[0]) != len(lines) - 1:
            return "HINT: Print the greetings first, then the total as the very last line."
        if len(lines) != len(want_greetings) + 1:
            return ("HINT: Print only the greetings and the total line. Extra lines:\n  "
                    + "\n  ".join(line for line in lines if line not in greetings + totals))

    if len(loops) < 2:
        return ("HINT: Every answer is right. Now add the calories with a second for loop "
                "too: total = 0, then  for calories in meal_calories:  with total += calories "
                "pushed in under it.")

    return ("PASS: 4 tables, from Ana, Ben and Chloe to an empty table, and every guest "
            "was greeted and every total added up once. Dinner is served.")


print()
print("-" * 40)
print("STEP 2, THE CHECK: 4 tables to serve")
print(_check())
