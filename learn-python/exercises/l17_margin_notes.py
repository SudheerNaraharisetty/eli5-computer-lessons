# Lesson 17 exercise: margin notes
#
# This Kitchen Coach program works, but its notes need care. Three jobs:
#
# (a) WRITE A WHY-NOTE. Ana eats 80 g more carbs the day before her long run,
#     because her muscles store carbs as fuel for the run. Replace the line
#     that says "TODO (a)" with a comment that says WHY the carbs go up.
#     Not WHAT: "# add 80" only repeats the code. Keep it directly above
#     the line  ana_carbs_g = ana_carbs_g + 80
#
# (b) SWITCH A LINE OFF. The line that prints "DEBUG" was only there to test
#     the program. Put a # at the very start of that line, so Python skips it.
#     In VS Code: click on the line and press Cmd+/ (Mac) or Ctrl+/ (Windows, Linux).
#
# (c) FIX A NOTE THAT LIES. The city sales tax went up from 8% to 9%.
#     Someone changed the number to 0.09, but not the note next to it.
#     The number is right. Fix the note so it tells the truth.
#
# Save the file and run it. In VS Code, press the Run button at the top right.
# In a terminal, type:  python3 l17_margin_notes.py
# The output must be exactly three lines, with no DEBUG line.
# Keep going until the check says PASS.

# >>> START: edit the notes below this line

ana_carbs_g = 300
ben_protein_g = 140  # per day, not per meal: Ben spreads it over 4 meals
TAX_RATE = 0.09  # 8% city sales tax
groceries_dollars = 60

print("DEBUG ana_carbs_g is", ana_carbs_g)

# TODO (a): replace this line with a comment that says WHY
ana_carbs_g = ana_carbs_g + 80

total_dollars = groceries_dollars * (1 + TAX_RATE)
print("Ana's carbs today:", ana_carbs_g, "g")
print("Ben's protein today:", ben_protein_g, "g")
print("Groceries with tax:", round(total_dollars, 2), "dollars")

# <<< END: edit the notes above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It reads your code,
# looks at your comments, runs the code again quietly and checks the output.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib
    import re
    import tokenize

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your code goes between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    lines = your_code.split("\n")

    # Find every comment, and the line it is on.
    comments = {}
    try:
        for token in tokenize.generate_tokens(io.StringIO(your_code).readline):
            if token.type == tokenize.COMMENT:
                comments[token.start[0]] = token.string
    except (tokenize.TokenError, SyntaxError, IndentationError):
        pass

    printed = io.StringIO()
    jars = {}
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, jars)
    except SyntaxError as error:
        return ("HINT: Python cannot read line " + str(error.lineno) + " between START and END: "
                + str(error.msg) + ". Does every note start with a # ?")
    except Exception as error:
        return "HINT: Python stopped with " + type(error).__name__ + ": " + str(error) + ". Read that line again."

    # (b) the debug print is switched off
    for line in lines:
        if line.strip().startswith("print(") and "DEBUG" in line:
            return ("HINT (b): The DEBUG line still runs. Put a # at the very start of it, "
                    "before the word print, so Python skips the whole line.")

    # (a) a why-comment directly above the + 80 line
    target = None
    for number, line in enumerate(lines, start=1):
        if re.match(r"\s*ana_carbs_g\s*=\s*ana_carbs_g\s*\+\s*80\s*(#.*)?$", line):
            target = number
    if target is None:
        return ("HINT (a): Keep the line  ana_carbs_g = ana_carbs_g + 80  as it is. "
                "Only add a comment above it.")
    above = lines[target - 2].strip() if target >= 2 else ""
    if not above.startswith("#"):
        return ("HINT (a): The line directly above  ana_carbs_g = ana_carbs_g + 80  should be "
                "your comment, starting with #. Right now it is: " + (above or "(an empty line)"))
    note = above.lstrip("#").strip()
    if "TODO (a)" in note:
        return "HINT (a): Replace the TODO (a) line with your own comment that says why Ana's carbs go up."
    words = note.split()
    if len(words) < 4:
        return ("HINT (a): Your note is only " + str(len(words)) + " word(s): " + above + ". "
                "Say WHY in a short sentence, for example what is coming up for Ana.")
    reasons = ("because", "so ", "run", "race", "fuel", "energy", "train", "marathon", "before", "store")
    if not any(word in note.lower() + " " for word in reasons):
        return ("HINT (a): Your note says: " + above + ". That sounds like WHAT the line does. "
                "Say WHY Ana needs the extra 80 g. What is she doing the next day?")

    # (c) the lying note on TAX_RATE
    if jars.get("TAX_RATE") != 0.09:
        return ("HINT (c): TAX_RATE should stay 0.09. The number was right. "
                "The tax really is 9% now. Change the note, not the number.")
    tax_line = None
    for number, line in enumerate(lines, start=1):
        if line.strip().startswith("TAX_RATE"):
            tax_line = number
    tax_note = comments.get(tax_line, "") if tax_line else ""
    if not tax_note:
        return ("HINT (c): The TAX_RATE line lost its note. Keep a comment at the end of it "
                "that says how much the tax is, for example  # 9% city sales tax")
    if "8" in tax_note:
        return ("HINT (c): The note on the TAX_RATE line still says: " + tax_note + ". "
                "The tax is 9% now. Make the note match the number.")
    if not re.search(r"9\s*(%|percent)", tax_note):
        return ("HINT (c): The note on the TAX_RATE line says: " + tax_note + ". "
                "Make it say the tax is 9%, so the note and the number agree.")

    want_output = [
        "Ana's carbs today: 380 g",
        "Ben's protein today: 140 g",
        "Groceries with tax: 65.4 dollars",
    ]
    got = printed.getvalue().splitlines()
    for number, want in enumerate(want_output, start=1):
        line = got[number - 1] if number <= len(got) else "(nothing)"
        if line != want:
            return ("HINT: Output line " + str(number) + " is now " + line + ", but it should be "
                    + want + ". Only the notes should change, not the code.")
    if len(got) != len(want_output):
        return "HINT: The program should print exactly three lines."

    return ("PASS: A note that says why, a test line switched off, and a tax note that tells "
            "the truth. Python ran exactly the same code, and the next reader will thank you.")


print()
print("-" * 40)
print(_check())
