# Lesson 88 exercise: Find the bug
#
# Ben lifts weights, so Kitchen Coach adds up his protein for the week:
# every meal, of every day. day_protein(meals) adds up one day.
# week_protein(week) adds up all the days.
#
# By hand, Ben ate 984 g of protein this week (about 140 g a day).
# Kitchen Coach says 228 g. There is no error and no traceback.
# The program runs fine, and it lies. There is ONE bug.
#
# Your job: do not guess. Find the FIRST step where a value goes wrong,
# then fix that one thing. Pick a tool:
# - A print with an equals sign, like  print(f"{day=} {total=}")
#   Put it inside a loop and read the values after every step.
# - breakpoint() on a line of its own. Run the file: it pauses there.
#   Type  p total  to see a value,  n  for the next line,
#   s  to step into a function call,  c  to carry on,  q  to quit.
# - The VS Code debugger: click left of a line number for a red dot,
#   then press F5 (Run and Debug) and F10 to go one line at a time.
#
# Fix only the bug. Do not change the numbers in ben_week.
# When it says PASS, delete your debug prints and any breakpoint() line.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l88_find_the_bug.py
#
# What happens when you run it, in two steps:
# - STEP 1. Kitchen Coach prints Ben's week, using your code as it is.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.

# >>> START: find the bug below this line, and fix it

def day_protein(meals):
    total = 0
    for grams in meals:
        total = total + grams
        return total


def week_protein(week):
    total = 0
    for day, meals in week.items():
        total = total + day_protein(meals)
    return total


ben_week = {
    "Mon": [35, 42, 28, 40],
    "Tue": [30, 45, 25, 38],
    "Wed": [40, 36, 30, 35],
    "Thu": [32, 48, 22, 41],
    "Fri": [38, 40, 27, 36],
    "Sat": [25, 50, 30, 34],
    "Sun": [28, 44, 26, 39],
}

# <<< END: find the bug above this line

print("STEP 1: Ben's week, as Kitchen Coach sees it")
print("-" * 50)
print(f"Ben ate {week_protein(ben_week)} g of protein this week")
print("-" * 50)


# ===== THE CHECK =====
# You do not need to read this part yet. It works out the right answers in
# its own way and compares them with what your functions give.
def _check():
    import sys

    # The check runs your functions many times. Skip any breakpoint() you
    # left in, so the check does not stop at it.
    sys.breakpointhook = lambda *args, **kwargs: None

    print("STEP 2, THE CHECK")
    week = globals().get("ben_week")
    if not isinstance(week, dict) or "Mon" not in week:
        return "HINT: Keep ben_week as it was. The check reads it."
    expected = sum(sum(meals) for meals in week.values())
    if expected != 984:
        return "HINT: The numbers in ben_week changed. Put them back: the week should be 984 g."

    try:
        got = week_protein(week)
        first_meals = sum(meals[0] for meals in week.values())
        monday = day_protein([35, 42, 28, 40])
        one_meal = day_protein([50])
        rest_day = day_protein([])
        small = week_protein({"Mon": [20, 30], "Tue": [40]})
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + "  Read the traceback from the bottom, as in lesson 52.")

    if got == expected and monday == 145 and one_meal == 50 and rest_day == 0 and small == 90:
        return ("PASS: Ben ate 984 g of protein this week. You found the first step "
                "that went wrong, and fixed only that. Now delete your debug lines.")
    if got == first_meals:
        return ("HINT: Kitchen Coach says " + str(got) + " g. Each day counts only part of its meals. "
                "Look inside day_protein: print f\"{grams=} {total=}\" in its loop, or put "
                "breakpoint() there and press n. How many meals does the loop see before "
                "the function hands back its answer?")
    if rest_day != 0:
        return ("HINT: A rest day with no meals, day_protein([]), should give 0. It gave "
                + repr(rest_day) + ". Where does the function hand back total when the loop never runs?")
    return ("HINT: Kitchen Coach says " + str(got) + " g, but it should be 984 g. "
            "Print the values step by step and find the first one that goes wrong.")


print(_check())
