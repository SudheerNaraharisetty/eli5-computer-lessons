# Lesson 1 exercise: tonight's menu
#
# Ana, Ben and Chloe are coming for dinner.
# Write a program that prints a menu of exactly 3 lines.
# Each friend's name must appear in the menu.
#
# For example, one line could be:   Pasta with tomato sauce for Ana
#
# 1. Change the code between the two START and END lines below.
# 2. Save the file.
# 3. Run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l01_first_menu.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: write your menu below this line

print("Tonight's menu")

# <<< END: write your menu above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your menu again,
# quietly, and looks at what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your menu between them."
    menu_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    with contextlib.redirect_stdout(printed):
        exec(menu_code, {})
    lines = printed.getvalue().splitlines()

    if len(lines) == 0:
        return "HINT: Nothing was printed. Each line of the menu needs its own print(...)."
    if len(lines) != 3:
        return ("HINT: You printed " + str(len(lines)) + " line" + ("" if len(lines) == 1 else "s")
                + ". The menu needs exactly 3 lines, one print(...) for each line.")
    if any(line.strip() == "" for line in lines):
        return "HINT: One of your 3 lines is empty. Put a dish on every line."
    text = "\n".join(lines)
    for name in ["Ana", "Ben", "Chloe"]:
        if name not in text:
            if name.lower() in text.lower():
                return "HINT: Check the spelling of " + name + ". Python is exact: a capital letter counts."
            return "HINT: " + name + " is not on the menu yet. Every friend needs a dish."
    return "PASS: 3 lines, and Ana, Ben and Chloe each have a dish. Dinner is served!"


print()
print("-" * 40)
print(_check())
