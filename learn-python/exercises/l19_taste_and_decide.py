# Lesson 19 exercise: taste and decide
#
# Kitchen Coach checks two meals before they go out:
#
#   ben_protein     grams of protein in Ben's meal. His meal should have at
#                   least 30 g, because he lifts weights.
#   chloe_dessert   what goes into Chloe's dessert. She eats no gluten, and
#                   flour has gluten.
#
# Your job, below the two jars:
# 1. Write an if that prints exactly
#      Ben: add a protein shake
#    ONLY when ben_protein is under 30.
# 2. Write a second if that prints exactly
#      Chloe: careful, this has gluten!
#    ONLY when "flour" is in chloe_dessert.
# 3. At the very end, print
#      Meal check done
#    This line must ALWAYS run, whatever the meals are.
#
# Remember the shape:  if, a question, a colon. The next line is pushed in
# by 4 spaces. VS Code adds the 4 spaces for you when you press Enter after
# the colon. To come back to the left edge, press Backspace once.
#
# How to run it: save the file, then press the Run button at the top right
# of VS Code. In a terminal you can also type:  python3 l19_taste_and_decide.py
#
# The check at the bottom runs your lines again with OTHER meals (Ben with
# 35 g, Chloe with rice pudding, and so on) and checks that each line appears
# only when it should. So use the jar names in your questions, not the
# numbers 22 or the words inside the quotes.
#
# If Python stops before the check with "SyntaxError: expected ':'", an if
# line is missing its colon. "IndentationError: expected an indented block"
# means the line under an if is not pushed in.

# >>> START: write your lines below this line

ben_protein = 22
chloe_dessert = "flour, butter, sugar"


# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your lines again
# with four different meals, and reads what your program prints each time.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib
    import re

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    for name in ("ben_protein", "chloe_dessert"):
        if not re.search(r"^" + name + r"\s*=", your_code, re.M):
            return ("HINT: Keep the jar line  " + name + " = ...  at the top, against the left edge. "
                    "The check swaps its value to test other meals.")

    # (Ben's protein, Chloe's dessert, shake tip expected?, gluten warning expected?)
    meals = [
        (22, "flour, butter, sugar", True, True),
        (35, "rice, milk, sugar", False, False),
        (30, "oats, honey, flour", False, True),
        (12, "rice, milk, sugar", True, False),
    ]

    for protein, dessert, want_shake, want_gluten in meals:
        code = re.sub(r"^ben_protein\s*=.*$", "ben_protein = " + repr(protein), your_code, count=1, flags=re.M)
        code = re.sub(r"^chloe_dessert\s*=.*$", "chloe_dessert = " + repr(dessert), code, count=1, flags=re.M)
        meal = "ben_protein = " + str(protein) + " and chloe_dessert = " + repr(dessert)
        printed = io.StringIO()
        try:
            with contextlib.redirect_stdout(printed):
                exec(code, {"__name__": "__check__"})
        except NameError as error:
            return ("HINT: Python stopped with a NameError: " + str(error) + ". "
                    "Check the spelling. The jars are called ben_protein and chloe_dessert.")
        except TypeError as error:
            return ("HINT: Python stopped with a TypeError: " + str(error) + ". "
                    "Compare the jar itself: ben_protein < 30, with no quote marks around the number.")
        except Exception as error:
            return "HINT: Python stopped with " + type(error).__name__ + ": " + str(error)

        lines = [line.strip() for line in printed.getvalue().splitlines() if line.strip()]
        low = [line.lower() for line in lines]
        shake = any("shake" in line for line in low)
        gluten = any("gluten" in line for line in low)
        done = any("meal check done" in line for line in low)
        shown = "\n".join(lines) if lines else "(nothing)"

        if not lines and protein == 22:
            if " if " not in " " + your_code:
                return ("HINT: Nothing is printed yet. Start with Ben. Write  if ben_protein < 30:  "
                        "and on the next line, pushed in by 4 spaces,  print(\"Ben: add a protein shake\")")
        if want_shake and not shake:
            return ("HINT: With " + meal + ", Ben's meal is under 30 g, but no shake tip was printed. "
                    "Ask  if ben_protein < 30:  and push the print line in by 4 spaces. It printed:\n" + shown)
        if not want_shake and shake:
            if protein == 30:
                return ("HINT: With ben_protein = 30, your program printed the shake tip. 30 is not UNDER 30. "
                        "Use  <  (under), not  <=  (at most).")
            return ("HINT: With " + meal + ", Ben has enough protein, but the shake tip was still printed. "
                    "Is the print line pushed in under the if? Does the question use the jar ben_protein? It printed:\n" + shown)
        if want_gluten and not gluten:
            return ("HINT: With " + meal + ", the dessert has flour, but no gluten warning was printed. "
                    "Ask  if \"flour\" in chloe_dessert:  and push the print line in. It printed:\n" + shown)
        if not want_gluten and gluten:
            return ("HINT: With " + meal + ", there is no flour, but the gluten warning was still printed. "
                    "Is the print line pushed in under its if? Does the question use the jar chloe_dessert? It printed:\n" + shown)
        if not done:
            if want_shake or want_gluten:
                return ("HINT: Both ifs work! Now add a last line, against the left edge:  "
                        "print(\"Meal check done\")")
            return ("HINT: With " + meal + ", the line Meal check done went missing. That is the silent bug "
                    "from the lesson: it is pushed in under an if. Move it all the way to the left, so it always runs.")
        if not low[-1].startswith("meal check done"):
            return ("HINT: Meal check done should be the LAST line printed. Move it to the end of your code. "
                    "It printed:\n" + shown)

    return ("PASS: Four different meals, and every tip appeared only when it should. "
            "Kitchen Coach can taste and decide!")


print()
print("-" * 40)
print(_check())
