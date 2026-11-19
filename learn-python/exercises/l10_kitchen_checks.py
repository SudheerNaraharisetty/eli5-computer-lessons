# Lesson 10 exercise: kitchen checks
#
# Dinner is nearly ready. Answer four yes or no questions with Python.
# Python must work out each answer: write a comparison inside each print(...),
# for example  print(140 >= 120)  Do not type True or False yourself.
#
# Question 1. The oven is at 180 degrees. Chloe's cake needs at least 175 degrees.
#             Is the oven hot enough?
# Question 2. Ben has eaten 95 grams of protein today. His target is 120 grams.
#             Has he reached his target?
# Question 3. Ana's pasta has 110 grams of carbs. Her plan for this meal is 100 grams.
#             Is the pasta more than her plan?
# Question 4. Chloe's dessert is made of "rice, milk, sugar".
#             Is "flour" in it?
#
# The comparisons you can use:  ==  !=  <  >  <=  >=  and  in
#
# 1. Replace the three dots ... on each line with a comparison. Use the numbers above.
# 2. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l10_kitchen_checks.py
# 3. Read what the check at the bottom says. Keep going until it says PASS.
#    If Python stops with a SyntaxError before the check runs, read its last line.
#    One = puts a value in a jar. Two == ask "are these the same?".

# >>> START: change the dots below this line

print(...)
print(...)
print(...)
print(...)

# <<< END: change the dots above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It reads your four lines,
# runs them again quietly, and looks at what was printed.
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
    rows = [line.strip() for line in your_code.splitlines() if line.strip() and not line.strip().startswith("#")]

    if len(rows) != 4 or not all(row.startswith("print(") for row in rows):
        return "HINT: Keep exactly four print(...) lines, one for each question."

    # What each question needs: the numbers or words it must use, and the answer.
    questions = [
        (["180", "175"], "True", "Question 1: is 180 at least 175? Try  print(180 >= 175)"),
        (["95", "120"], "False", "Question 2: is 95 at least 120?"),
        (["110", "100"], "True", "Question 3: is 110 more than 100?"),
        (['"flour"', '"rice, milk, sugar"'], "False", 'Question 4: use in, with the words in quotes:  "flour" in "rice, milk, sugar"'),
    ]
    operators = ["==", "!=", "<", ">", " in "]
    for number, (row, (needs, _, tip)) in enumerate(zip(rows, questions), start=1):
        if "..." in row:
            return "HINT: Line " + str(number) + " still has the three dots. " + tip
        inside = row[len("print("):]
        if "True" in inside or "False" in inside:
            return ("HINT: Line " + str(number) + " types True or False itself. Let Python work it out: "
                    "write a comparison instead. " + tip)
        if not any(op in inside for op in operators):
            return "HINT: Line " + str(number) + " has no comparison. Use one of  ==  !=  <  >  <=  >=  in.  " + tip
        if number == 4:
            if " in " not in inside:
                return "HINT: Line 4 asks if a word is inside some text. That is a job for in. " + tip
            if '"flour"' not in inside.replace("'", '"') or '"rice, milk, sugar"' not in inside.replace("'", '"'):
                return "HINT: Line 4 should use the word \"flour\" and the text \"rice, milk, sugar\", each in quotes."
        else:
            for need in needs:
                if need not in inside:
                    return "HINT: Line " + str(number) + " should use the numbers from the question. " + tip

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, {})
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + ". Read that line, then check the brackets and the quote marks.")
    lines = printed.getvalue().splitlines()
    if len(lines) != 4:
        return "HINT: The program should print exactly four lines, one answer per question."

    for number, (got, (_, want, tip)) in enumerate(zip(lines, questions), start=1):
        if got not in ("True", "False"):
            return "HINT: Line " + str(number) + " printed " + got + ". A comparison prints True or False. " + tip
        if got != want:
            return ("HINT: Line " + str(number) + " printed " + got + ", but the answer is " + want
                    + ". Check which way round your sign points. " + tip)

    return "PASS: True, False, True, False. The oven is hot, Ben needs more protein, Ana's pasta is over her plan, and Chloe's dessert is safe!"


print()
print("-" * 40)
print(_check())
