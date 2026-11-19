# Lesson 12 exercise: rename the jars
#
# This Kitchen Coach program works. Run it and see. But every jar has a
# one-letter name, so nobody can tell what is inside without reading every line.
#
# What is in the six jars:
#   - the number of minutes in one hour (it never changes)
#   - how many guests are coming tonight
#   - Ben's protein target, in grams
#   - how long Ana's Sunday run is, in hours
#   - whether Chloe eats gluten-free (True or False)
#   - how long the pasta cooks, in minutes
#
# The six names to use. They are in a different order. Match each one to its jar:
#   ana_long_run_hours     guest_count          pasta_cook_minutes
#   MINUTES_PER_HOUR       chloe_is_gluten_free ben_protein_target_g
#
# 1. Between START and END, rename every jar. Change each name in BOTH places:
#    where the jar is filled (name = value) and where it is used inside print(...).
#    Do not change the numbers, True, or the words in quotes.
# 2. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l12_rename_the_jars.py
# 3. The output must stay exactly the same. Good names change how code reads,
#    never what it does. Keep going until the check says PASS.
#    If Python stops with a NameError before the check runs, read its last line:
#    a print(...) line still uses an old one-letter name. Rename it there too.

# >>> START: rename the jars below this line

k = 60
a = 3
b = 140
c = 2.5
d = True
e = 12

print("Guests tonight:", a)
print("Ben's protein target:", b, "g")
print("Ana's long run:", c * k, "minutes")
print("Chloe eats gluten-free:", d)
print("Pasta cooks for:", e, "minutes")

# <<< END: rename the jars above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It reads your code,
# runs it again quietly, and compares the names and the output.
# ---------------------------------------------------------------------------
def _check():
    import ast
    import builtins
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your code goes between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python cannot read line " + str(error.lineno) + " between START and END: "
                + str(error.msg) + ". A name cannot have spaces or dashes. Join the words with _.")

    # Every name you fill with =, in the order they appear.
    filled = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store) and node.id not in filled:
            filled.append(node.id)

    for name in filled:
        if name in dir(builtins):
            return ("HINT: " + name + " is the name of one of Python's own tools. "
                    "Using it as a jar hides the tool. Pick a name from the list at the top.")

    printed = io.StringIO()
    jars = {}
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, jars)
    except NameError as error:
        return ("HINT: Python stopped with NameError: " + str(error) + ". "
                "That name is still used in a print(...) line, but no jar has that label any more. "
                "Rename it there too.")
    except Exception as error:
        return "HINT: Python stopped with " + type(error).__name__ + ": " + str(error) + ". Read that line again."

    short = [name for name in filled if len(name) == 1]
    if short:
        return ("HINT: The jar " + short[0] + " still has a one-letter name. "
                "Which description at the top fits its value? Give it the matching name.")

    wanted = {
        "MINUTES_PER_HOUR": (60, "the minutes in an hour"),
        "guest_count": (3, "how many guests are coming"),
        "ben_protein_target_g": (140, "Ben's protein target in grams"),
        "ana_long_run_hours": (2.5, "Ana's run in hours"),
        "chloe_is_gluten_free": (True, "whether Chloe eats gluten-free"),
        "pasta_cook_minutes": (12, "the pasta's cooking time in minutes"),
    }
    for name, (value, what) in wanted.items():
        if name not in filled:
            if name.lower() in [f.lower() for f in filled]:
                return ("HINT: Look at the capitals in " + name + ". Names are case-sensitive, "
                        "so copy it exactly as it is written in the list.")
            return "HINT: There is no jar called " + name + " yet. It should hold " + what + "."
        if jars[name] != value or type(jars[name]) is not type(value):
            return ("HINT: " + name + " holds " + repr(jars[name]) + ", but it should hold "
                    + what + ", which is " + repr(value) + ". Check which value goes with which name.")

    extra = [name for name in filled if name not in wanted]
    if extra:
        return "HINT: " + extra[0] + " is not one of the six names in the list. Use only those six."

    want_output = [
        "Guests tonight: 3",
        "Ben's protein target: 140 g",
        "Ana's long run: 150.0 minutes",
        "Chloe eats gluten-free: True",
        "Pasta cooks for: 12 minutes",
    ]
    got = printed.getvalue().splitlines()
    for number, want in enumerate(want_output, start=1):
        line = got[number - 1] if number <= len(got) else "(nothing)"
        if line != want:
            return ("HINT: Output line " + str(number) + " is now " + line + ", but it should still be "
                    + want + ". Only the names should change, not the words or the numbers.")
    if len(got) != len(want_output):
        return "HINT: The program should print exactly five lines, the same five as before."

    return ("PASS: Six clear labels, and the output did not change by a single letter. "
            "Anyone can now read this recipe without opening a jar.")


print()
print("-" * 40)
print(_check())
