# Lesson 65 exercise: Ask the right object
#
# Kitchen Coach has six objects, listed under THE OBJECTS below:
#   label     a str     (the label maker)
#   shopping  a list    (the shopping pad)
#   notebook  a Path    (a notebook on the shelf)
#   race      a date    (the calendar: Ana's race day)
#   pantry    a dict    (the spice rack)
#   note      a str     (a note about this week's meals)
#
# Between START and END, replace each None. Every answer asks ONE object
# with a dot:
#   KNOWS  something the object knows, an attribute:   no brackets
#   DOES   something the object does, a method:        brackets
# The comment above each line says KNOWS or DOES, and what the line should
# give for these objects.
#
# Do not type the answers in by hand, like  clean = "bean chili".
# The check swaps in OTHER objects (another label, another notebook, another
# date...) and runs your lines again. Only a line that asks the object gives
# the right answer both times.
#
# Stuck? These help:
#   print(type(race))                 what kind of object is it?
#   for name in dir(race):            what does it know and do?
#       if not name.startswith("_"):
#           print(name, end=" ")
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l65_know_and_do.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run with the objects below, and you see each answer.
# - STEP 2, THE CHECK. Your lines run again with other objects. It says PASS,
#   or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== THE OBJECTS (do not change) =====
from datetime import date
from pathlib import Path

label = "  bean chili  "
shopping = ["oats", "rice"]
notebook = Path("recipes/lentil_soup.txt")
race = date(2027, 2, 28)
pantry = {"rice": 900, "oats": 400}
note = "oats, rice, oats, tofu"
# ===== END OF THE OBJECTS =====

# >>> START: write your lines below this line

# 1. DOES: the label without the spaces at both ends.     gives "bean chili"
clean = None

# 2. KNOWS: the notebook's whole file name.                gives "lentil_soup.txt"
file_name = None

# 3. KNOWS: the notebook's ending.                         gives ".txt"
ending = None

# 4. KNOWS: the year of Ana's race.                        gives 2027
race_year = None

# 5. DOES: the grams of tofu in the pantry, or 0 when there is none,
#    without a KeyError.                                   gives 0
tofu_grams = None

# 6. DOES: how many times "oats" is in the note.           gives 2
oats_count = None

# 7. DOES: the note cut into a list at each ", ".
#    gives ['oats', 'rice', 'oats', 'tofu']
items = None

# 8. DOES: add "tofu" to the end of the shopping list.
#    This one is a whole line of its own, with no "=". Write it under this comment.


# 9. What type is race? Its type name, as text.            like "list" or "str"
race_type = None

# 10. What type is pantry? Its type name, as text.
pantry_type = None

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them with the objects above, then again with other
# objects, and compares every answer.
def _check():
    import ast
    from datetime import date
    from pathlib import Path

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets and quote marks on that line.")

    # Two sets of objects. The first is the one at the top of the file.
    sets = [
        dict(label="  bean chili  ", shopping=["oats", "rice"], notebook=Path("recipes/lentil_soup.txt"),
             race=date(2027, 2, 28), pantry={"rice": 900, "oats": 400}, note="oats, rice, oats, tofu"),
        dict(label=" rice pudding   ", shopping=["pasta"], notebook=Path("notes/curry.md"),
             race=date(2028, 4, 23), pantry={"tofu": 300, "rice": 500}, note="oats, oats, oats, rice"),
    ]
    # (name, what it is, KNOWS or DOES, the right answer for each set, how to ask)
    answers = [
        ("clean", "the label without the spaces", "DOES",
         lambda o: o["label"].strip(), "label.strip()"),
        ("file_name", "the notebook's file name", "KNOWS",
         lambda o: o["notebook"].name, "notebook.name"),
        ("ending", "the notebook's ending", "KNOWS",
         lambda o: o["notebook"].suffix, "notebook.suffix"),
        ("race_year", "the year of the race", "KNOWS",
         lambda o: o["race"].year, "race.year"),
        ("tofu_grams", "the grams of tofu, or 0", "DOES",
         lambda o: o["pantry"].get("tofu", 0), 'pantry.get("tofu", 0)'),
        ("oats_count", 'how many times "oats" is in the note', "DOES",
         lambda o: o["note"].count("oats"), 'note.count("oats")'),
        ("items", "the note cut into a list", "DOES",
         lambda o: o["note"].split(", "), 'note.split(", ")'),
    ]

    results = []
    for n, objects in enumerate(sets):
        ns = {"__name__": "__main__", "date": date, "Path": Path}
        for key, value in objects.items():
            ns[key] = list(value) if isinstance(value, list) else dict(value) if isinstance(value, dict) else value
        try:
            exec(compile(your_code, "your lines", "exec"), ns)
        except Exception as error:
            last = type(error).__name__ + ": " + str(error)
            if n == 0:
                print("STEP 1: your lines stopped with an error:")
                print("  " + last)
            print("STEP 2, THE CHECK")
            if "not callable" in str(error):
                return ("HINT: Python stopped with: " + last + "\n  You put brackets on something the object "
                        "KNOWS. Things it knows take no brackets, like  notebook.name  and  race.year .")
            if isinstance(error, AttributeError):
                return ("HINT: Python stopped with: " + last + "\n  Read the type name: that object has no "
                        "such name. Check the spelling, and that you asked the right object.")
            if isinstance(error, KeyError):
                return ("HINT: Python stopped with: " + last + "\n  pantry has no tofu. Ask the dict with "
                        "a method that hands back 0 when the key is missing.")
            if isinstance(error, NameError):
                return ("HINT: Python stopped with: " + last + "\n  Use the names of the objects exactly: "
                        "label, shopping, notebook, race, pantry, note.")
            return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."
        results.append(ns)
        if n == 0:
            print("STEP 1: your answers with the objects in this file")
            print("-" * 50)
            for name, *_ in answers:
                print(f"  {name:<12}{ns.get(name)!r}")
            print(f"  {'shopping':<12}{ns.get('shopping')!r}")
            print(f"  {'race_type':<12}{ns.get('race_type')!r}")
            print(f"  {'pantry_type':<12}{ns.get('pantry_type')!r}")
            print("-" * 50)
    print("STEP 2, THE CHECK: your lines with other objects too")

    for name, what, kind, right, how in answers:
        for n, (objects, ns) in enumerate(zip(sets, results)):
            got, want = ns.get(name), right(objects)
            if got == want and type(got) is type(want):
                continue
            if got is None and name in ns:
                return f"HINT: {name} is still None. It should be {what}. That is something the object {kind}."
            if name not in ns:
                return f"HINT: Keep the line  {name} = ...  The check looks for that name."
            if callable(got):
                return (f"HINT: {name} is {got!r}. That is the button itself, not what it gives. "
                        "This one DOES something: add the brackets ().")
            if n == 1:
                return (f"HINT: {name} is right for the objects in this file, but with other objects it gave "
                        f"{got!r} instead of {want!r}. Did you type the answer in by hand? Ask the object: {how}")
            return f"HINT: {name} is {got!r}, but it should be {want!r}: {what}. It is something the object {kind}."

    for n, (objects, ns) in enumerate(zip(sets, results)):
        want = objects["shopping"] + ["tofu"]
        got = ns.get("shopping")
        if got != want:
            if got == objects["shopping"]:
                return ('HINT: The shopping list has no "tofu" yet. Under comment 8, write one line that asks the '
                        'list to add it at the end. Lesson 34 has the method.')
            if got is None:
                return ("HINT: shopping is None now. A list method that changes the list hands back None, so do "
                        "not write  shopping = ...  Call the method on its own line.")
            return f'HINT: shopping should be {want!r}, with "tofu" once, at the end. It is {got!r}.'

    for name, obj, want in [("race_type", "race", "date"), ("pantry_type", "pantry", "dict")]:
        got = results[0].get(name)
        if got == want:
            continue
        if got is None:
            return f'HINT: {name} is still None. Run  print(type({obj}))  and write the name after the dot, as text.'
        if isinstance(got, type):
            return f'HINT: {name} holds the type itself. Write its name as text, in quote marks, like "list".'
        return (f'HINT: {name} is {got!r}. Run  print(type({obj})). It prints <class \'...\'>. The type name '
                f"is the last word inside the quote marks.")

    return ("PASS: Ten answers, each one asked of the right object. No brackets for what an object knows, "
            "brackets for what it does, and type() to see what you hold. Next: make your own kind of object.")


verdict = _check()
print(verdict)
