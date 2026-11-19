# Lesson 22 exercise: the menu filter
#
# Three friends come to dinner, and you want dishes that suit ALL THREE:
#   - Ben is vegetarian:  the dish must be vegetarian
#   - Chloe eats no gluten:  the dish must be gluten-free
#   - Ana is training for a half-marathon:  the dish needs AT LEAST 60 g of carbs
#
# Each dish has three jars below: is it vegetarian, is it gluten-free, and how
# many grams of carbs one portion has.
#
# Write three print lines, one per dish. Each line answers "does this dish suit
# all three friends?" with ONE combined condition that joins three questions
# with  and .
#
# Rules:
# - Use the jar names (like risotto_carbs_g), not the values in them. The check
#   runs your lines again with other dishes, including exactly 60 g of carbs.
# - Each line uses the jars of its own dish. Watch out when you copy a line!
# - A label is welcome:  print("Risotto suits everyone?", ...)  The answer must come last.
# - Do not type True or False yourself. Let Python work it out.
#
# 1. Replace the three dots ... on each line between START and END.
# 2. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l22_menu_filter.py
# 3. Read what the check at the bottom says. Keep going until it says PASS.

risotto_is_vegetarian = True
risotto_is_gluten_free = True
risotto_carbs_g = 72

lasagne_is_vegetarian = True
lasagne_is_gluten_free = False
lasagne_carbs_g = 65

salad_is_vegetarian = True
salad_is_gluten_free = True
salad_carbs_g = 8

# >>> START: change the dots below this line

print("Risotto suits everyone?", ...)
print("Lasagne suits everyone?", ...)
print("Salad suits everyone?", ...)

# <<< END: change the dots above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It reads your three lines,
# runs them again quietly with many different dishes, and looks at the answers.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import itertools
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your three lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    rows = [line.strip() for line in your_code.splitlines() if line.strip() and not line.strip().startswith("#")]
    if len(rows) != 3 or not all(row.startswith("print(") for row in rows):
        return "HINT: Keep exactly three print(...) lines, one for each dish."

    dishes = ["risotto", "lasagne", "salad"]
    model = "{0}_is_vegetarian and {0}_is_gluten_free and {0}_carbs_g >= 60"
    for number, (row, dish) in enumerate(zip(rows, dishes), start=1):
        tip = " The " + dish + " line can be:  " + model.format(dish)
        if "..." in row:
            return "HINT: Line " + str(number) + " still has the three dots." + tip
        if "True" in row or "False" in row:
            return "HINT: Line " + str(number) + " types True or False itself. Let Python work it out." + tip
        if row.count(" and ") < 2:
            return ("HINT: Line " + str(number) + " should join three questions with  and  "
                    "(vegetarian, gluten-free, enough carbs). and needs every part to be True." + tip)
        for other in dishes:
            if other != dish and other + "_" in row:
                return ("HINT: Line " + str(number) + " is about the " + dish + ", but it uses a "
                        + other + " jar. Did you copy a line and forget to change a name?" + tip)
        for jar in ("_is_vegetarian", "_is_gluten_free", "_carbs_g"):
            if dish + jar not in row:
                return "HINT: Line " + str(number) + " never looks at " + dish + jar + "." + tip

    def run(jars):
        printed = io.StringIO()
        with contextlib.redirect_stdout(printed):
            exec(your_code, dict(jars))
        return [line.split()[-1] if line.split() else "" for line in printed.getvalue().splitlines()]

    base = {
        "risotto_is_vegetarian": True, "risotto_is_gluten_free": True, "risotto_carbs_g": 72,
        "lasagne_is_vegetarian": True, "lasagne_is_gluten_free": False, "lasagne_carbs_g": 65,
        "salad_is_vegetarian": True, "salad_is_gluten_free": True, "salad_carbs_g": 8,
    }
    for line, dish in enumerate(dishes):
        for veg, gf, carbs in itertools.product((True, False), (True, False), (8, 59, 60, 61, 90)):
            jars = dict(base)
            jars[dish + "_is_vegetarian"] = veg
            jars[dish + "_is_gluten_free"] = gf
            jars[dish + "_carbs_g"] = carbs
            want = str(veg and gf and carbs >= 60)
            try:
                answers = run(jars)
            except Exception as error:
                return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                        + ". Read that line, then check the brackets, the quote marks and the jar names.")
            if len(answers) != 3:
                return "HINT: The program should print exactly three lines, one answer per dish."
            for number, got in enumerate(answers, start=1):
                if got not in ("True", "False"):
                    return ("HINT: Line " + str(number) + " ends with " + got
                            + ". The answer must come last, and the combined question gives True or False.")
            if answers[line] != want:
                story = ("vegetarian" if veg else "NOT vegetarian") + ", " + \
                        ("gluten-free" if gf else "NOT gluten-free") + ", " + str(carbs) + " g of carbs"
                extra = ""
                if carbs == 60:
                    extra = " Exactly 60 g is enough: Ana needs AT LEAST 60. Is your sign > where it should be >= ?"
                elif " or " in rows[line]:
                    extra = " Your line uses or. or is happy when just ONE part is True. Here every part must be True."
                return ("HINT: A " + dish + " that is " + story + " should give " + want
                        + ", but line " + str(line + 1) + " said " + answers[line] + "." + extra
                        + " The line can be:  " + model.format(dish))

    return ("PASS: Your menu filter works. Only a dish that is vegetarian AND gluten-free AND "
            "has at least 60 g of carbs suits Ana, Ben and Chloe. Tonight that is the risotto!")


print()
print("-" * 40)
print(_check())
