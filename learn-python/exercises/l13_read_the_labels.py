# Lesson 13 exercise: read the labels
#
# You copied some numbers from labels and from a training log. Everything you
# copied is TEXT, in quotes, just like what a form or a file gives you.
#
# Ben's protein today, from four nutrition labels (grams):
#     breakfast "24", lunch "38.5", dinner " 31 " (typed with spaces), snack "12.5"
# Ana's runs this week, from her training log (whole minutes):
#     Monday "42", Wednesday "35", Saturday "95"
#
# Your job:
#   ben_total  = Ben's total grams of protein, as a number
#   ana_total  = Ana's total minutes of running, as a whole number
#
# 1. Replace the three dots ... on each line with a sum of the labels.
#    Convert each label first: int() for whole numbers, float() for numbers
#    with a point. Use the names, for example  int(ana_monday)
#    Do not type the answers yourself, and do not change the labels.
# 2. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l13_read_the_labels.py
# 3. Read what the check at the bottom says. Keep going until it says PASS.
#    If Python stops with a ValueError, read its last line: it shows the label
#    that would not convert.

# The labels. Do not change these lines.
ben_breakfast = "24"
ben_lunch = "38.5"
ben_dinner = " 31 "
ben_snack = "12.5"
ana_monday = "42"
ana_wednesday = "35"
ana_saturday = "95"

# >>> START: change the dots below this line

ben_total = ...
ana_total = ...

# <<< END: change the dots above this line

print("Ben's protein today:", ben_total, "grams")
print("Ana's running this week:", ana_total, "minutes")


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It reads your two lines
# and looks at the totals you worked out.
# ---------------------------------------------------------------------------
def _check():
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    labels = [
        'ben_breakfast = "24"',
        'ben_lunch = "38.5"',
        'ben_dinner = " 31 "',
        'ben_snack = "12.5"',
        'ana_monday = "42"',
        'ana_wednesday = "35"',
        'ana_saturday = "95"',
    ]
    for label in labels:
        if label not in source:
            return "HINT: Keep the labels exactly as they were: " + label

    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your two lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    rows = [line.strip() for line in your_code.splitlines() if line.strip() and not line.strip().startswith("#")]
    ben_row = next((row for row in rows if row.replace(" ", "").startswith("ben_total=")), "")
    ana_row = next((row for row in rows if row.replace(" ", "").startswith("ana_total=")), "")
    if not ben_row or not ana_row:
        return "HINT: Keep the two lines  ben_total = ...  and  ana_total = ...  and change only the dots."

    # Ben first.
    if ben_total is ...:
        return "HINT: ben_total still has the three dots. Add Ben's four labels, converted: float(ben_breakfast) + ..."
    for answer in ("106", "106.0"):
        if answer in ben_row:
            return "HINT: Do not type the answer yourself. Let Python add the four labels after converting them."
    if isinstance(ben_total, str):
        return ("HINT: ben_total is text: " + repr(ben_total) + ". The labels were glued together. "
                "Convert each one with float() before you add them.")
    if "float(" not in ben_row:
        return "HINT: Two of Ben's labels have a point in them. Read every one of his labels with float()."
    if abs(ben_total - 106) > 0.001:
        return ("HINT: Ben's total came out as " + str(ben_total) + ", but it should be 106.0 grams. "
                "Did you add all four labels: breakfast, lunch, dinner and snack?")

    # Then Ana.
    if ana_total is ...:
        return "HINT: ana_total still has the three dots. Add Ana's three runs, converted: int(ana_monday) + ..."
    if "172" in ana_row:
        return "HINT: Do not type the answer yourself. Let Python add Ana's three runs after converting them."
    if isinstance(ana_total, str):
        return ("HINT: ana_total is text: " + repr(ana_total) + ". The minutes were glued together. "
                "Convert each run with int() before you add them.")
    if "int(" not in ana_row:
        return "HINT: Ana's minutes are whole numbers. Read each run with int()."
    if isinstance(ana_total, float):
        return "HINT: Ana's total is " + str(ana_total) + ". Minutes are whole numbers here: use int(), not float(), so it shows 172."
    if ana_total != 172:
        return ("HINT: Ana's total came out as " + str(ana_total) + ", but it should be 172 minutes. "
                "Did you add Monday, Wednesday and Saturday?")

    return ("PASS: Ben ate 106.0 grams of protein and Ana ran for 172 minutes. "
            "You read every label before you weighed it!")


print()
print("-" * 40)
print(_check())
