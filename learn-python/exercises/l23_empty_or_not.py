# Lesson 23 exercise: empty or not?
#
# Kitchen Coach reads three answers from a guest's form:
#   note        what the guest wrote for the cook (text, maybe empty)
#   typed_name  the nickname the guest typed (text, maybe empty)
#   shakes      how many protein shakes they drank today (a number),
#               or None if they skipped that question
#
# Write three checks between START and END. Replace every ... with your code.
#
# Check 1. If the note has anything in it, print   Note: <the note>
#          If the note is empty, print             No note
#          Let truthiness decide: write  if note:  (no == "" needed).
#
# Check 2. Pick a nickname with or: the typed name, or "Guest" when it is empty.
#          The print line is written for you.
#
# Check 3. Zero shakes is a REAL answer. Only None means "not filled in".
#          If shakes is None, print   Shakes: not filled in
#          Otherwise print            Shakes: <the number>      (so 0 prints Shakes: 0)
#
# 1. Replace the dots ... between START and END.
# 2. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l23_empty_or_not.py
# 3. Read what the check at the bottom says. Keep going until it says PASS.

note = ""
typed_name = ""
shakes = 0

# >>> START: change the dots below this line

# Check 1
if ...:
    print(f"Note: {note}")
else:
    print("No note")

# Check 2
nickname = ...
print(f"Welcome, {nickname}!")

# Check 3
if ...:
    print("Shakes: not filled in")
else:
    print(f"Shakes: {shakes}")

# <<< END: change the dots above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your code again,
# quietly, with many different answers, and looks at the three printed lines.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your three checks go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    code_lines = [line.split("#", 1)[0] for line in your_code.splitlines()]
    plain = "\n".join(code_lines)

    tips = [
        "Check 1: an empty note counts as no, so write  if note:",
        'Check 2: or gives the first value that counts as yes:  nickname = typed_name or "Guest"',
        "Check 3: ask about None itself, so 0 still counts:  if shakes is None:",
    ]
    if "..." in plain:
        part = 1
        for number, chunk in enumerate(your_code.split("# Check ")[1:], start=1):
            body = "\n".join(line.split("#", 1)[0] for line in chunk.splitlines()[1:])
            if "..." in body:
                part = number
                break
        return "HINT: Check " + str(part) + " still has the three dots. " + tips[max(part, 1) - 1]

    def run(n, t, s):
        printed = io.StringIO()
        with contextlib.redirect_stdout(printed):
            exec(your_code, {"note": n, "typed_name": t, "shakes": s})
        return printed.getvalue().splitlines()

    def want(n, t, s):
        return [
            f"Note: {n}" if n else "No note",
            f"Welcome, {t or 'Guest'}!",
            "Shakes: not filled in" if s is None else f"Shakes: {s}",
        ]

    for n in ("", " ", "no nuts please"):
        for t in ("", "Speedy", " "):
            for s in (None, 0, 3):
                try:
                    got = run(n, t, s)
                except Exception as error:
                    return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                            + ". Read that line, then check the jar names, the colons and the quote marks.")
                good = want(n, t, s)
                if len(got) != 3:
                    return ("HINT: Your code should print exactly 3 lines, one per check. It printed "
                            + str(len(got)) + ". Keep one print in each branch.")
                for number in range(3):
                    if got[number] != good[number]:
                        jar = ["note = " + repr(n), "typed_name = " + repr(t), "shakes = " + repr(s)][number]
                        extra = ""
                        if number == 0 and n == " ":
                            extra = "A single space is text with something in it, so it counts as yes. "
                        if number == 0 and n == "":
                            extra = "Empty text counts as no. "
                        if number == 1 and t == "":
                            extra = "Empty text counts as no, so or should move on to the backup. "
                        if number == 2 and s == 0:
                            extra = "Ben drank zero shakes: that is a real answer, not a missing one. "
                        if number == 2 and s is None:
                            extra = "None means the question was skipped. "
                        return ("HINT: With " + jar + ", check " + str(number + 1) + " printed "
                                + repr(got[number]) + " but should print " + repr(good[number]) + ". "
                                + extra + tips[number])

    if "is None" not in plain and "== None" not in plain:
        return "HINT: Check 3 works, but ask the question with  is None  so it says what you mean. " + tips[2]
    return ("PASS: An empty note says No note, an empty name becomes Guest, and Ben's 0 shakes "
            "counts as a real answer while None means skipped. Kitchen Coach reads the form right!")


print()
print("-" * 40)
print(_check())
