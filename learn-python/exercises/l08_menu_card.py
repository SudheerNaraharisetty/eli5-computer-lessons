# Lesson 8 exercise: a menu card with a perfect divider
#
# Print a small menu card for tonight. It needs, in this order:
#   line 1: a title, for example   Tonight's menu
#   line 2: a divider made of = signs, EXACTLY as long as the title
#   lines 3, 4 and 5: one dish for each friend: Ana, Ben and Chloe
#
# Do not count the letters by hand. Let Python do it:
#   len("Tonight's menu") counts the characters in the title,
#   and "=" * 14 repeats the = sign 14 times.
#   Put the two together inside print(...).
#
# 1. Change the code between the START and END lines below.
# 2. Save the file.
# 3. Run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l08_menu_card.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: write your menu card below this line

print("Tonight's menu")
print("=" * 10)
print("Ana: pasta")

# <<< END: write your menu card above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your menu card
# again, quietly, and looks at what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your menu card between them."
    card_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(card_code, {})
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + ". Read the error above the line, fix that line, and run again.")
    lines = printed.getvalue().splitlines()

    if len(lines) < 2:
        return "HINT: Print the title first, then the divider on the next line."
    title, divider = lines[0], lines[1]
    if title.strip() == "":
        return "HINT: The first line is empty. Start with a title, like Tonight's menu."
    if divider == "" or set(divider) != {"="}:
        return "HINT: Line 2 should be only = signs, like the output of print(\"=\" * 14)."
    if len(divider) != len(title):
        return ("HINT: Your title has " + str(len(title)) + " characters, but your divider has "
                + str(len(divider)) + ". Use len(\"...your title...\") instead of a number after the *.")
    if "len(" not in card_code:
        return ("HINT: The lengths match. Now let Python count: put len(\"...your title...\") "
                "after the * instead of typing the number yourself.")
    dishes = lines[2:]
    if len(dishes) != 3:
        return ("HINT: Under the divider you printed " + str(len(dishes)) + " line"
                + ("" if len(dishes) == 1 else "s") + ". The card needs exactly 3: one dish for each friend.")
    text = "\n".join(dishes)
    for name in ["Ana", "Ben", "Chloe"]:
        if name not in text:
            if name.lower() in text.lower():
                return "HINT: Check the spelling of " + name + ". Python is exact: a capital letter counts."
            return "HINT: " + name + " is not on the card yet. Every friend needs a dish."
    return ("PASS: a " + str(len(title)) + "-character title, a divider of exactly "
            + str(len(divider)) + " = signs, and a dish for Ana, Ben and Chloe. Print it and pin it up!")


print()
print("-" * 40)
print(_check())
