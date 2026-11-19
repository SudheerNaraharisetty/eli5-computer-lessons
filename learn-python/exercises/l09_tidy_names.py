# Lesson 9 exercise: tidy the sign-up names
#
# Three friends signed up for dinner, and each one typed their name badly:
#   Chloe typed "  cHLOE "  (spaces round it, odd capitals)
#   Ben typed   "BEN  "     (all capitals, spaces at the end)
#   Ana typed   " ana"      (a space in front, no capital)
#
# Chloe also sent her dessert: "Gluten-free brownies with walnuts".
# She does not mind nuts, but you want to check before you bake.
#
# Right now the four lines below print the messy text exactly as it was typed.
#
# 1. Add text tools to lines 1 to 3 so they print the tidy names:
#        Chloe
#        Ben
#        Ana
#    Keep the messy text in the quote marks as it is. Tidy it with tools,
#    like .strip() and .title(). Do not just type the tidy name yourself.
# 2. Change line 4 so it prints True or False: is "nuts" inside
#    Chloe's dessert? Use the word  in  from the lesson.
# 3. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l09_tidy_names.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: change the lines below this line

print("  cHLOE ")
print("BEN  ")
print(" ana")
print("Gluten-free brownies with walnuts")

# <<< END: change the lines above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your four lines
# again, quietly, and looks at what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your four lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, {})
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + ". Read that line, then check the dots, the tool names and the brackets.")
    lines = printed.getvalue().splitlines()

    if len(lines) != 4:
        return ("HINT: Keep exactly four print(...) lines: Chloe, Ben, Ana, and the nuts check. "
                "Yours printed " + str(len(lines)) + ".")

    if "<built-in method" in printed.getvalue():
        return ("HINT: One line printed <built-in method ...>. That is the tool itself. "
                "Put empty brackets after the tool's name, like .title(), to use it.")

    want = ["Chloe", "Ben", "Ana"]
    messy = ['"  cHLOE "', '"BEN  "', '" ana"']
    for number, (got, name, raw) in enumerate(zip(lines, want, messy), start=1):
        if raw not in your_code:
            return ("HINT: Keep the messy text " + raw + " in your code, exactly as it was typed. "
                    "The point is to tidy it with tools, not to type " + name + " yourself.")
        if got == name:
            continue
        if got.strip() == name:
            return ("HINT: Line " + str(number) + " printed '" + got + "'. The letters are right, "
                    "but there are still spaces at the ends. Add .strip() to peel them off.")
        if got != got.strip() and got.strip().lower() == name.lower():
            return ("HINT: Line " + str(number) + " printed '" + got + "'. Two things to tidy: "
                    "the spaces at the ends and the capitals. Try .strip().title() after the text.")
        if got.strip().lower() == name.lower():
            return ("HINT: Line " + str(number) + " printed '" + got.strip() + "'. The capitals are wrong. "
                    "Use .title() for a capital at the start and small letters after.")
        return "HINT: Line " + str(number) + " printed '" + got + "'. It should print " + name + "."

    nuts = lines[3]
    if nuts == "Gluten-free brownies with walnuts":
        return ('HINT: Line 4 still prints the dessert. Ask Python a question instead: '
                'put "nuts" in  in front of the dessert text, inside the print brackets.')
    if nuts == "False":
        return ('HINT: Line 4 printed False, but "walnuts" does contain "nuts". '
                'Check the spelling and the small letters on both sides of in.')
    if nuts != "True":
        return ('HINT: Line 4 printed ' + nuts + '. It should print True or False: '
                'print("nuts" in "Gluten-free brownies with walnuts")')
    if '"nuts" in' not in your_code and "'nuts' in" not in your_code:
        return 'HINT: Line 4 should ask Python with the word in: "nuts" in "...the dessert..."'

    return "PASS: Chloe, Ben and Ana, all tidy. And yes, walnuts count as nuts. Nice work!"


print()
print("-" * 40)
print(_check())
