# Lesson 11 exercise: Kitchen Coach v0, with jars
#
# Kitchen Coach gets a memory. Fill six jars (variables), then let Python
# work out how much protein Ben still needs after dinner.
#
# 1. Make these jars, with exactly these names and values:
#
#      ana_carbs       350             Ana's carbs target, in grams a day
#      ben_protein     140             Ben's protein target, in grams a day
#      chloe_desserts  2               Chloe's desserts this week
#      meal_name       "bean chili"    Ben's dinner tonight (text, so use quotes)
#      meal_protein    32              grams of protein in that dinner
#
#    The first one is done for you, as an example.
#
# 2. Make one more jar, protein_gap: how many grams Ben still needs after
#    dinner. Do NOT type the answer yourself. Work it out from the jar names:
#    his target, minus the protein in the meal.
#
# 3. Print a line that shows the answer, for example:
#      Ben still needs 108 g of protein
#    Use the jar name protein_gap inside print(...), not the number.
#
# Then:
# - Save the file.
# - Run it. In VS Code, press the Run button at the top right.
#   In a terminal, type:  python3 l11_kitchen_coach_v0.py
# - Read what the check at the bottom says. Keep going until it says PASS.
#   If Python stops with a NameError before the check runs, read its last
#   line: a jar name is misspelled, or used before the line that fills it.

# >>> START: write your lines below this line

ana_carbs = 350

# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your lines again,
# quietly, then looks inside every jar and at what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    jars = {}
    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, jars)
    except NameError as error:
        return ("HINT: Python stopped with a NameError: " + str(error) + ". "
                "Check the spelling of that name, and make sure its jar is filled "
                "on a line ABOVE the line that uses it.")
    except SyntaxError as error:
        return ("HINT: Python could not read line " + str(error.lineno) + " between START and END. "
                "A name uses only letters, digits and _, and a line looks like:  name = value")
    except Exception as error:
        return "HINT: Python stopped with " + type(error).__name__ + ": " + str(error)

    wanted = [
        ("ana_carbs", 350),
        ("ben_protein", 140),
        ("chloe_desserts", 2),
        ("meal_name", "bean chili"),
        ("meal_protein", 32),
    ]
    for name, value in wanted:
        if name not in jars:
            return ("HINT: There is no jar called " + name + " yet. Add a line like:  "
                    + name + " = " + repr(value).replace("'", '"'))
        got = jars[name]
        if isinstance(value, int) and isinstance(got, str):
            return ("HINT: " + name + " holds the text " + repr(got) + ". It should be the number "
                    + str(value) + ", without quote marks.")
        if got != value:
            return ("HINT: " + name + " holds " + repr(got) + ", but it should hold "
                    + repr(value).replace("'", '"') + ".")

    if "protein_gap" not in jars:
        return "HINT: Now make the jar protein_gap: Ben's target minus the protein in his meal."
    lines = [line for line in your_code.splitlines() if line.strip().startswith("protein_gap")]
    rule = " ".join(lines)
    if "108" in your_code:
        return ("HINT: You typed 108 yourself. Let Python work it out from the jars:  "
                "protein_gap = ben_protein - meal_protein")
    if "ben_protein" not in rule or "meal_protein" not in rule:
        return ("HINT: Work out protein_gap from the jar names, not from numbers:  "
                "protein_gap = ben_protein - meal_protein")
    if jars["protein_gap"] != 108:
        return ("HINT: protein_gap holds " + repr(jars["protein_gap"]) + ". Target minus meal "
                "should give 108. Check which jar comes first in the minus.")

    out = printed.getvalue()
    if out.strip() == "":
        return "HINT: All the jars are right. Now print the answer, for example:  print(\"Ben still needs\", protein_gap, \"g of protein\")"
    if "108" not in out:
        return "HINT: Your print does not show 108. Put the jar name protein_gap inside print(...), with no quote marks around it."
    return "PASS: Six jars filled, and Python worked out that Ben still needs 108 g. Kitchen Coach remembers!"


print()
print("-" * 40)
print(_check())
