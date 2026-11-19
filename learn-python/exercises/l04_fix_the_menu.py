# Lesson 4 exercise: fix the menu
#
# Kitchen Coach has a menu for Ana, Ben and Chloe, but the recipe has
# 3 different mistakes in it. Each one makes Python stop with a different error.
#
# When it works, the menu prints these 4 lines:
#
#     Kitchen Coach: tonight's menu
#     Ana: pasta, 120 grams
#     Ben: bean chili, 25 grams of protein
#     Chloe: rice pudding, gluten-free
#
# 1. Run this file. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l04_fix_the_menu.py
# 2. Read the error it shows, from the bottom up. Go to the line it names.
# 3. Change ONE thing, save, and run again. A new error means progress:
#    the one before it is fixed.
# 4. Keep going until it says PASS.
#
# The menu sits inside the big triple quote marks (""") so this file can
# still run and check it, even while the menu is broken. Edit the lines
# between the START and END lines as if they were normal code.

MENU = """
# >>> START: fix the menu below this line
print("Kitchen Coach: tonight's menu")
print("Ana: pasta, 120 grams"
print("Ben: bean chili, " + 25 + " grams of protein")
    print("Chloe: rice pudding, gluten-free")
# <<< END: fix the menu above this line
"""


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your menu safely,
# shows the real error Python gives, and explains it in plain words.
# ---------------------------------------------------------------------------
WANT = [
    "Kitchen Coach: tonight's menu",
    "Ana: pasta, 120 grams",
    "Ben: bean chili, 25 grams of protein",
    "Chloe: rice pudding, gluten-free",
]

PLAIN = {
    "IndentationError": "a line starts with spaces where it should not. "
                        "Every line of this menu starts at the left edge.",
    "SyntaxError": "Python cannot read the recipe at all. A bracket or a quote mark "
                   "is missing or extra. Check the line it names, and the line above it.",
    "TypeError": "two different kinds of things were mixed. Here, text and a number "
                 "were joined with +. Put the number in quote marks, or use commas between the parts.",
    "NameError": "Python does not know a word. Check its spelling: print is all lower case.",
}


def _check():
    import contextlib
    import io
    import pathlib
    import traceback

    path = pathlib.Path(__file__)
    source = path.read_text(encoding="utf-8")
    if "# >>> START" not in MENU or "# <<< END" not in MENU:
        return "HINT: Keep the START and END lines inside the menu. Fix the lines between them."
    # Pad the menu so Python's line numbers match the lines you see in VS Code.
    first = source.split('MENU = """', 1)[0].count("\n")
    code = "\n" * first + MENU

    try:
        compiled = compile(code, path.name, "exec")
    except SyntaxError as err:
        kind = type(err).__name__
        print("Python stopped before it cooked anything:")
        print("".join(traceback.format_exception_only(type(err), err)), end="")
        return ("HINT: " + kind + " on line " + str(err.lineno) + ". In plain words: "
                + PLAIN.get(kind, PLAIN["SyntaxError"]))

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(compiled, {})
    except Exception as err:
        kind = type(err).__name__
        lineno = None
        tb = err.__traceback__
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == path.name:
                lineno = tb.tb_lineno
            tb = tb.tb_next
        print(printed.getvalue(), end="")
        print("Python stopped while cooking:")
        if lineno:
            print('  File "' + path.name + '", line ' + str(lineno))
            print("    " + code.split("\n")[lineno - 1].strip())
        print(traceback.format_exception_only(type(err), err)[-1], end="")
        where = " on line " + str(lineno) if lineno else ""
        return ("HINT: " + kind + where + ". In plain words: "
                + PLAIN.get(kind, "read the last line of the error above, then fix that line."))

    print(printed.getvalue(), end="")
    got = printed.getvalue().splitlines()
    if len(got) != len(WANT):
        return ("HINT: No errors now. But the menu printed " + str(len(got)) + " lines, and it should print "
                + str(len(WANT)) + ". Compare with the 4 lines at the top of this file.")
    for want, line in zip(WANT, got):
        if line != want:
            return ('HINT: No errors now. One line is not quite right.\n  You printed:  ' + line
                    + '\n  It should be:  ' + want)
    return "PASS: 3 errors found and fixed. The menu runs, and Ana, Ben and Chloe can eat!"


print("-" * 40)
print(_check())
