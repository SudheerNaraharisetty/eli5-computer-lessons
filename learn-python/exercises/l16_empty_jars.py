# Lesson 16 exercise: empty jars
#
# Three jars on your shelf. Each one should look empty, but each one means
# something different:
#
#   chloe_dessert   Chloe has not chosen her dessert yet. No answer so far.
#   ben_shakes      Ben drank zero protein shakes today. That is a real count.
#   ana_note        The note for Ana is blank: a piece of text with no words.
#
# Your job:
# 1. Replace the three dots ... on each jar line with the right empty value.
#    Choose from:  None   0   ""   (each one is used exactly once)
# 2. Below the jars, write ONE print line that shows exactly:
#      Chloe still deciding: True
#    Do not type True yourself. Let Python work it out with  is None
#    Hint: print("Chloe still deciding:", ...)
# 3. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l16_empty_jars.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.
#    If Python stops with "NameError: name 'none' is not defined", read its
#    last line: None needs a capital N.

# >>> START: change the dots and add your print line below this line

chloe_dessert = ...
ben_shakes = ...
ana_note = ...

# <<< END: change the dots and add your print line above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your lines again,
# looks inside each jar and reads what your print line shows.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    jars = {"__name__": "__check__"}
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, jars)
    except NameError as error:
        if "'none'" in str(error) or "'NONE'" in str(error):
            return ("HINT: Python stopped with a NameError: " + str(error) + ". "
                    "None is written with a capital N and small letters after it: None")
        return ("HINT: Python stopped with a NameError: " + str(error) + ". "
                "Check the spelling of that name. Keep the three jar names exactly as they were.")
    except TypeError as error:
        return ("HINT: Python stopped with a TypeError: " + str(error) + ". "
                "Are you doing maths or joining text with a jar that holds None?")
    except SyntaxError as error:
        return ("HINT: Python could not read line " + str(error.lineno) + " between START and END. "
                "Check that every bracket and quote mark you open is closed again.")
    except Exception as error:
        return "HINT: Python stopped with " + type(error).__name__ + ": " + str(error)

    for name in ("chloe_dessert", "ben_shakes", "ana_note"):
        if name not in jars:
            return "HINT: The jar " + name + " is missing. Keep the line  " + name + " = ...  and change only the dots."
        if jars[name] is ...:
            return "HINT: " + name + " still has the three dots. Replace them with None, 0 or \"\"."

    dessert, shakes, note = jars["chloe_dessert"], jars["ben_shakes"], jars["ana_note"]

    # Chloe: no answer yet.
    if isinstance(dessert, str) and dessert.lower() == "none":
        return ("HINT: chloe_dessert holds the TEXT " + repr(dessert) + ", a dessert called none. "
                "Take away the quote marks, so it is the value None.")
    if dessert is not None:
        return ("HINT: chloe_dessert holds " + repr(dessert) + ". Chloe has not answered yet. "
                "Which empty value means \"no answer yet\"?")

    # Ben: a real count of zero.
    if shakes is None:
        return ("HINT: ben_shakes holds None. But Ben did answer: he drank zero shakes. "
                "Zero is a real count you can add to later. Use 0.")
    if shakes is False:
        return "HINT: ben_shakes holds False. That is a yes-or-no answer. Ben's shakes are a count: use 0."
    if isinstance(shakes, str):
        return "HINT: ben_shakes holds the text " + repr(shakes) + ". A count is a number, with no quote marks: 0"
    if type(shakes) is not int or shakes != 0:
        return "HINT: ben_shakes holds " + repr(shakes) + ". Ben drank zero shakes, a whole number: 0"

    # Ana: text with no letters.
    if note is None:
        return ("HINT: ana_note holds None. But the note is there, it just has no words on it. "
                "That is text with no letters: two quote marks with nothing between them, \"\"")
    if not isinstance(note, str):
        return "HINT: ana_note holds " + repr(note) + ". A note is text. A blank one is \"\" (two quote marks, nothing between)."
    if note != "":
        return ("HINT: ana_note holds " + repr(note) + ". The note is blank: nothing at all between the quote marks, "
                "not even a space.")

    # The print line.
    out = printed.getvalue()
    lines = [line for line in out.splitlines()]
    if not out.strip():
        return ("HINT: The jars are right! Now add one print line below them that shows:  "
                "Chloe still deciding: True")
    print_rows = [row for row in your_code.splitlines() if "print(" in row and not row.strip().startswith("#")]
    if any("True" in row for row in print_rows):
        return ("HINT: Do not type True yourself. Ask Python:  chloe_dessert is None  "
                "and print what it answers.")
    if not any(" is None" in row for row in print_rows):
        return "HINT: Work the answer out with  is None , for example:  chloe_dessert is None"
    if "Chloe still deciding: True" not in lines:
        return ("HINT: Your print line showed:\n" + out.rstrip() + "\n"
                "It should show exactly:  Chloe still deciding: True")
    return ("PASS: Chloe's jar waits for her answer, Ben's says zero, and Ana's note is blank. "
            "Three empties, three meanings!")


print()
print("-" * 40)
print(_check())
