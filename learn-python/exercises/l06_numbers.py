# Lesson 6 exercise: counting and measuring
#
# Ben wants 140 grams of protein a day. You plan it in whole grams,
# so it is a count: an int.
# Ana is buying 2.5 kilograms of pasta for her training week.
# The part after the point matters, so it is a measure: a float.
#
# Below there are four lines. Each one has three dots ... in it.
# The three dots are a placeholder: Python accepts them, but they mean "nothing yet".
#
# 1. Replace the dots on lines 1 and 2 with Ben's protein target, as a whole number.
# 2. Replace the dots on lines 3 and 4 with Ana's pasta in kilograms, as a number with a point.
#    No quote marks, no "g" or "kg": just the number.
# 3. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l06_numbers.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: change the dots below this line

print(...)
print(type(...))
print(...)
print(type(...))

# <<< END: change the dots above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your four lines
# again, quietly, and looks at what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your four lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, {})
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + ". Read that line, then check the brackets and the numbers.")
    lines = printed.getvalue().splitlines()

    if len(lines) != 4:
        return "HINT: Keep exactly four print(...) lines: Ben's number, its type, Ana's number, its type."
    ben, ben_type, ana, ana_type = lines

    # Ben: 140, an int
    if "Ellipsis" in ben or "ellipsis" in ben_type:
        return "HINT: Line 1 or 2 still has the three dots. Put Ben's protein target there: 140."
    if ben_type == "<class 'str'>":
        return "HINT: Line 2 says str, which means text. Take the quote marks away from Ben's number."
    if ben == "140.0" or ben_type == "<class 'float'>":
        return "HINT: Ben's target came out as a float. You plan in whole grams, so write 140 with no point."
    if ben != "140":
        return "HINT: Line 1 printed " + ben + ". Ben's protein target is 140 grams a day."
    if ben_type != "<class 'int'>":
        return "HINT: Line 2 should ask type() about the same number as line 1: 140."

    # Ana: 2.5, a float
    if "Ellipsis" in ana or "ellipsis" in ana_type:
        return "HINT: Line 3 or 4 still has the three dots. Put Ana's pasta there, in kilograms."
    if ana == "2 5":
        return "HINT: Python printed 2 5. In Python a number uses a point, not a comma: 2.5"
    if ana_type == "<class 'str'>":
        return "HINT: Line 4 says str, which means text. Take the quote marks away from Ana's number."
    if ana_type == "<class 'int'>":
        return "HINT: Ana's pasta came out as an int. She buys 2.5 kilograms, and the .5 matters."
    if ana != "2.5":
        return "HINT: Line 3 printed " + ana + ". Ana is buying 2.5 kilograms of pasta."
    if ana_type != "<class 'float'>":
        return "HINT: Line 4 should ask type() about the same number as line 3: 2.5"

    return "PASS: 140 is an int and 2.5 is a float. Ben's protein is counted, Ana's pasta is weighed!"


print()
print("-" * 40)
print(_check())
