# Lesson 27 exercise: Ana's training week
#
# Ana is training for a half-marathon. Kitchen Coach prints her plan for the
# week, then a countdown to the start of her race.
#
# Use for and range to print EXACTLY these 13 lines, word for word:
#
#   Day 1: run 5 km
#   Day 2: run 6 km
#   Day 3: run 7 km
#   Day 4: run 8 km
#   Day 5: run 9 km
#   Day 6: run 10 km
#   Day 7: run 11 km
#   5
#   4
#   3
#   2
#   1
#   Go!
#
# Part 1, the week: days 1 to 7. Each day's run is 4 + day km.
#   The loop is half written for you below, and it has an off-by-one in it.
#   Remember: the stop is never included.
# Part 2, the countdown: 5 down to 1, then Go!
#   Write this loop yourself. A countdown needs a third number, the step.
#
# Rules: use range for both loops. No while loops in this one.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l27_training_week.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, and you see what they print.
# - STEP 2, THE CHECK. Your lines run again. The check compares every line
#   with the 13 lines above and looks at your range calls. It says PASS, or
#   gives you one hint.

# >>> START: write your lines below this line

# Part 1: Ana's week, days 1 to 7
for day in range(1, 7):
    km = 4 + day
    print(f"Day {day}: run {km} km")

# Part 2: the countdown, 5 down to 1, then Go!
# write a for loop with range here, then print("Go!")

# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# STEP 2, THE CHECK. You do not need to read this part yet. It runs your lines
# again, reads what they printed, and looks at the range calls you wrote.
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
        return ("HINT: Python could not read line " + str(error.lineno) + " of your part: "
                + str(error.msg) + ". Check the colon at the end of each for line.")

    if any(isinstance(node, ast.While) for node in ast.walk(tree)):
        return ("HINT: This one is about range, so no while loops. You know how many times "
                "each loop runs, so use  for ... in range(...):  for both.")

    # Work out which numbers each range(...) call would hand out.
    ranges = []
    for node in ast.walk(tree):
        if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name)
                and node.func.id == "range"):
            try:
                args = [ast.literal_eval(arg) for arg in node.args]
                ranges.append(list(range(*args)))
            except Exception:
                ranges.append(None)

    want = [f"Day {day}: run {4 + day} km" for day in range(1, 8)]
    want += ["5", "4", "3", "2", "1", "Go!"]

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, {})
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + "\nRead the error at the top of the output from the bottom up (lesson 4).")
    lines = [line.rstrip() for line in printed.getvalue().splitlines() if line.strip()]

    days = [line for line in lines if line.startswith("Day")]
    if len(days) == 6 and days == want[:6]:
        return ("HINT: Ana's week stops at Day 6. Sunday is missing. The stop is never "
                "included, so for days 1 to 7 the stop must be 8.")
    if days and days[0].startswith("Day 0"):
        return ("HINT: Ana's week starts at Day 0. Give range a start of 1 as well as a stop.")
    if days != want[:7]:
        for got, ok in zip(days, want):
            if got != ok:
                return ("HINT: One day line is not right yet.\n  You printed: " + got
                        + "\n  It should be: " + ok + "\nEach day's run is 4 + day km.")
        return ("HINT: You printed " + str(len(days)) + " day lines. Ana's week has 7: "
                "Day 1 to Day 7.")

    rest = lines[len(days):]
    if not rest:
        return ("HINT: The week is right. Now add the countdown under Part 2: a for loop "
                "with range that prints 5, 4, 3, 2, 1, and then print(\"Go!\").")
    if rest == ["Go!"]:
        return ("HINT: Only Go! was printed after the week. Is your countdown range empty? "
                "Counting UP from 5 never reaches 0. Add a step of -1 as the third number.")
    if rest[-2:] == ["0", "Go!"]:
        return ("HINT: The countdown reaches 0. The stop is never included, so stop at 0 "
                "to end at 1.")
    if rest != want[7:]:
        return ("HINT: After the week you printed:\n  " + "\n  ".join(rest)
                + "\nIt should be 5, 4, 3, 2, 1 on their own lines, then Go!")

    if [day for day in range(1, 8)] not in ranges:
        return ("HINT: Every line is right. Now let range hand out the day numbers "
                "themselves: range(1, 8), so no + 1 is needed.")
    if [5, 4, 3, 2, 1] not in ranges:
        return ("HINT: Every line is right. Now let range count down for you: a start, a "
                "stop and a step of -1, with one print inside the loop.")

    return ("PASS: 7 days for Ana, from 5 km up to 11 km, and a countdown that ends at 1, "
            "not 0. No day missing, no day 0. Off to the race!")


print()
print("-" * 40)
print("STEP 2, THE CHECK: Ana's week and the countdown")
print(_check())
