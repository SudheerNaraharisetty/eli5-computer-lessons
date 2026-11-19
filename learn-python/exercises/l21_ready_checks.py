# Lesson 21 exercise: ready checks
#
# Your kitchen has four readings. Write four print lines that answer four
# yes or no questions. Python must work out each answer with a comparison.
#
# Question 1. Is the oven ready? The recipe says AT LEAST 180 degrees.
# Question 2. Is the dough ready to rise? It must be FROM 24 TO 27 degrees,
#             both included. Write it as a chained comparison:  24 <= dough_c <= 27
# Question 3. Is Ana's heart rate in zone 2? Zone 2 is FROM 114 TO 133 beats
#             a minute, both included. Use a chained comparison here too.
# Question 4. Ana typed her name for the guest list. Does it match "ana"
#             once you tidy it? Use the text tools from lesson 9.
#
# Rules:
# - Use the jar names (oven_c, dough_c, ana_bpm, typed_name), not the readings
#   themselves. The check runs your lines again with other readings, including
#   readings that sit exactly on the edge, like 180 and 24.
# - A label is welcome:  print("Oven ready?", ...)  The answer must come last.
# - Do not type True or False yourself.
#
# 1. Replace the three dots ... on each line between START and END.
# 2. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l21_ready_checks.py
# 3. Read what the check at the bottom says. Keep going until it says PASS.

oven_c = 180
dough_c = 27
ana_bpm = 114
typed_name = "  ANA "

# >>> START: change the dots below this line

print("Oven ready?", ...)
print("Dough in range?", ...)
print("Ana in zone 2?", ...)
print("Name matches?", ...)

# <<< END: change the dots above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It reads your four lines,
# runs them again quietly with many different readings, and looks at the answers.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib
    import re

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your four lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    rows = [line.strip() for line in your_code.splitlines() if line.strip() and not line.strip().startswith("#")]
    if len(rows) != 4 or not all(row.startswith("print(") for row in rows):
        return "HINT: Keep exactly four print(...) lines, one for each question."

    names = ["oven_c", "dough_c", "ana_bpm", "typed_name"]
    tips = [
        "Question 1: at least 180 is  oven_c >= 180",
        "Question 2: write the range as a chain, with the jar in the middle:  24 <= dough_c <= 27",
        "Question 3: write zone 2 as a chain, with the jar in the middle:  114 <= ana_bpm <= 133",
        'Question 4: tidy first, then compare:  typed_name.strip().lower() == "ana"',
    ]
    for number, row in enumerate(rows, start=1):
        if "..." in row:
            return "HINT: Line " + str(number) + " still has the three dots. " + tips[number - 1]
        if "True" in row or "False" in row:
            return ("HINT: Line " + str(number) + " types True or False itself. "
                    "Let Python work it out with a comparison. " + tips[number - 1])
        if names[number - 1] not in row:
            return ("HINT: Line " + str(number) + " should use the jar " + names[number - 1]
                    + ", so the answer follows the reading. " + tips[number - 1])

    chain = r"\d+\s*<=?\s*{0}\s*<=?\s*\d+|\d+\s*>=?\s*{0}\s*>=?\s*\d+"
    for number, name in ((2, "dough_c"), (3, "ana_bpm")):
        if not re.search(chain.format(name), rows[number - 1]):
            if " and " in rows[number - 1]:
                return ("HINT: Line " + str(number) + " uses and. That works, and lesson 22 is all about it. "
                        "Here, practise the chain instead. " + tips[number - 1])
            return "HINT: Line " + str(number) + " needs a chained comparison. " + tips[number - 1]

    def run(oven, dough, bpm, name):
        printed = io.StringIO()
        with contextlib.redirect_stdout(printed):
            exec(your_code, {"oven_c": oven, "dough_c": dough, "ana_bpm": bpm, "typed_name": name})
        return [line.split()[-1] if line.split() else "" for line in printed.getvalue().splitlines()]

    # (readings, what each answer must be, a hint if it is wrong)
    cases = []
    for oven in (179, 180, 181, 250):
        cases.append(((oven, 25, 120, "ana"), 0, str(oven >= 180),
                      "With the oven at " + str(oven) + ", question 1 should be " + str(oven >= 180) + ". "
                      + ("Right on the edge, 180 counts as ready. Is your sign > where it should be >= ? " if oven == 180 else "")
                      + tips[0]))
    for dough in (23, 24, 25, 27, 28):
        cases.append(((200, dough, 120, "ana"), 1, str(24 <= dough <= 27),
                      "With the dough at " + str(dough) + ", question 2 should be " + str(24 <= dough <= 27) + ". "
                      + ("Both ends are included, so use <= on both sides. " if dough in (24, 27) else "") + tips[1]))
    for bpm in (113, 114, 120, 133, 134):
        cases.append(((200, 25, bpm, "ana"), 2, str(114 <= bpm <= 133),
                      "With Ana at " + str(bpm) + " beats, question 3 should be " + str(114 <= bpm <= 133) + ". "
                      + ("Both ends are included, so use <= on both sides. " if bpm in (114, 133) else "") + tips[2]))
    for name in ("  ANA ", "ana", "Ana", "  aNa", "Anna", " Ben "):
        want = str(name.strip().lower() == "ana")
        cases.append(((200, 25, 120, name), 3, want,
                      "With the name typed as " + repr(name) + ", question 4 should be " + want + ". "
                      + ("Tidy away the spaces and the capitals before you compare. " if want == "True" else "") + tips[3]))

    for readings, line, want, tip in cases:
        try:
            answers = run(*readings)
        except Exception as error:
            return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                    + ". Read that line, then check the brackets, the quote marks and the jar names.")
        if len(answers) != 4:
            return "HINT: The program should print exactly four lines, one answer per question."
        for number, got in enumerate(answers, start=1):
            if got not in ("True", "False"):
                return ("HINT: Line " + str(number) + " ends with " + got
                        + ". The answer must come last, and a comparison gives True or False. " + tips[number - 1])
        if answers[line] != want:
            return "HINT: " + tip

    return ("PASS: Every edge is right. 180 counts as hot enough, 24 and 27 count for the dough, "
            "114 and 133 count for Ana, and '  ANA ' matches once it is tidy. Dinner is on time!")


print()
print("-" * 40)
print(_check())
