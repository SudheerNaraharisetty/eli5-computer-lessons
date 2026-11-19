# Lesson 20 exercise: Ana's portion coach
#
# Ana is training for a half-marathon. After each run, Kitchen Coach tells
# you how much pasta to cook for her. The length of her run is in the jar
# run_minutes (it is filled for you, above the START line).
#
# Print EXACTLY ONE of these three lines, word for word:
#
#   more than 90 minutes          ->  Large portion: 3 cups of pasta
#   more than 45 minutes          ->  Medium portion: 2 cups of pasta
#   45 minutes or less (a short   ->  Small portion: 1 cup of pasta
#   run, or 0 on a rest day)
#
# "More than 90" means 91 counts, but 90 itself does not.
# So 90 minutes is Medium, and 45 minutes is Small.
#
# Use ONE chain: if, then elif, then else. The first line is done for you.
# Do not set run_minutes yourself between START and END.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l20_portion_coach.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, for Ana's run of 60 minutes.
# - STEP 2, THE CHECK. Your lines run again for 8 different runs, from a rest
#   day (0 minutes) to a long run (120 minutes), including the edges 45 and 90.
#   Each time there must be exactly one line, and the right one. The check
#   says PASS, or gives you one hint.

run_minutes = 60

# >>> START: write your lines below this line

if run_minutes > 90:
    print("Large portion: 3 cups of pasta")
# add an elif for more than 45 minutes here
# add an else for everything else here

# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# STEP 2, THE CHECK. You do not need to read this part yet. It runs your lines
# again for many run lengths and reads what was printed each time.
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
        text = (error.text or "").strip()
        if text.startswith("else") and text != "else:":
            return ("HINT: Python cannot read this line: " + text + "  else never has a "
                    "question. Write just  else:  and Python runs it when every check above was False.")
        if text.startswith("elif") and text.rstrip(":").strip() == "elif":
            return "HINT: elif needs a question, like  elif run_minutes > 45:"
        return ("HINT: Python cannot read line " + str(error.lineno) + " between START and END: "
                + str(error.msg) + ". Does every if, elif and else line end with a colon?")

    for node in ast.walk(tree):
        if isinstance(node, (ast.Assign, ast.AugAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            if any(isinstance(t, ast.Name) and t.id == "run_minutes" for t in targets):
                return ("HINT: Do not store a value in run_minutes between START and END. "
                        "The check fills that jar itself, with a different run each time.")

    cases = [
        (0, "Small portion: 1 cup of pasta"),
        (30, "Small portion: 1 cup of pasta"),
        (45, "Small portion: 1 cup of pasta"),
        (46, "Medium portion: 2 cups of pasta"),
        (60, "Medium portion: 2 cups of pasta"),
        (90, "Medium portion: 2 cups of pasta"),
        (91, "Large portion: 3 cups of pasta"),
        (120, "Large portion: 3 cups of pasta"),
    ]
    for minutes, want in cases:
        printed = io.StringIO()
        try:
            with contextlib.redirect_stdout(printed):
                exec(your_code, {"run_minutes": minutes})
        except Exception as error:
            return ("HINT: For a run of " + str(minutes) + " minutes, Python stopped with "
                    + type(error).__name__ + ": " + str(error))
        lines = [line for line in printed.getvalue().splitlines() if line.strip()]
        if len(lines) == 0:
            return ("HINT: For a run of " + str(minutes) + " minutes, nothing was printed. "
                    "Every run needs a line. An else at the end catches everything the "
                    "checks above did not.")
        if len(lines) > 1:
            return ("HINT: For a run of " + str(minutes) + " minutes, your program printed "
                    + str(len(lines)) + " lines:\n  " + "\n  ".join(lines) + "\n"
                    "Separate ifs can all say yes. Join them into one chain: if, elif, else, "
                    "so exactly one block runs.")
        got = lines[0]
        if got != want:
            if minutes in (45, 90):
                return ("HINT: For exactly " + str(minutes) + " minutes you printed: " + got
                        + "\nIt should be: " + want + "\n\"More than\" does not include the "
                        "number itself. Use > (more than), not >= (at least).")
            if minutes > 90 and got.startswith("Medium"):
                return ("HINT: For " + str(minutes) + " minutes you printed: " + got + "\nThe first True wins. "
                        "Check the order: the narrow check (more than 90) must come first.")
            return ("HINT: For a run of " + str(minutes) + " minutes you printed: " + got
                    + "\nIt should be, word for word: " + want)

    has_elif = any(isinstance(n, ast.If) and len(n.orelse) == 1 and isinstance(n.orelse[0], ast.If)
                   for n in ast.walk(tree))
    if not has_elif:
        return ("HINT: Every answer is right. Now write it as ONE chain: if, then elif, "
                "then else. That is the habit this lesson is about.")

    return ("PASS: 8 runs, from a rest day to a 2 hour long run, and exactly one right "
            "portion every time. Ana will not go hungry, and she will not be stuffed either.")


print()
print("-" * 40)
print("STEP 2, THE CHECK: 8 runs, from 0 to 120 minutes")
print(_check())
