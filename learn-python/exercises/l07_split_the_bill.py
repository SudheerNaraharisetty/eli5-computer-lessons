# Lesson 7 exercise: split the bill, share the cookies
#
# Dinner with Ana, Ben and Chloe cost $75.60. The three of you split it evenly.
# Then there are 20 cookies for dessert, shared by the same 3 friends.
#
# Below there are three print lines. Each one has three dots ... in it.
# Replace each ... with a maths expression, so Python works out the answer.
# Do not type the answer yourself: let Python do the sum.
#
# 1. Line 1: each person's share of $75.60, split 3 ways, rounded to 2 places.
#    (Lesson 6 showed round(..., 2). Divide inside it.)
# 2. Line 2: how many WHOLE cookies each friend gets, when 3 friends share 20 cookies.
# 3. Line 3: how many cookies are left over on the tray.
# 4. Save the file and run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l07_split_the_bill.py
# 5. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: change the dots below this line

print(...)
print(...)
print(...)

# <<< END: change the dots above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your three lines
# again, quietly, and looks at what was printed and how you wrote it.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Your three lines go between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    code_lines = [line.strip() for line in your_code.splitlines() if line.strip()]

    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, {})
    except ZeroDivisionError:
        return "HINT: Python says division by zero. You are sharing between 3 friends, so divide by 3."
    except Exception as error:
        return ("HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
                + ". Read that line, then check the brackets and the signs.")
    lines = printed.getvalue().splitlines()

    if len(lines) != 3 or len(code_lines) != 3:
        return "HINT: Keep exactly three print(...) lines: the share, the whole cookies, the leftovers."
    share, each, left = lines
    share_code, each_code, left_code = code_lines

    # Line 1: 75.60 / 3, rounded to 2 places
    if "Ellipsis" in share:
        return "HINT: Line 1 still has the three dots. Divide the bill, 75.60, by 3."
    if share in ("25.0", "25"):
        return "HINT: Line 1 printed " + share + ". Two slashes drop the cents. Use one slash, /, for money."
    if share != "25.2":
        return "HINT: Line 1 printed " + share + ". Each share of $75.60 split 3 ways is 25.2."
    if "75.6" not in share_code or "/" not in share_code:
        return "HINT: Line 1 shows the right answer, but let Python work it out: divide 75.60 by 3."
    if "round(" not in share_code:
        return "HINT: Line 1 is right, but the task says rounded to 2 places. Wrap it: round(75.60 / 3, 2)"

    # Line 2: whole cookies each, 20 // 3
    if "Ellipsis" in each:
        return "HINT: Line 2 still has the three dots. Share 20 cookies between 3 friends, whole cookies only."
    if each.startswith("6.6"):
        return "HINT: Line 2 printed " + each + ". Nobody gets two thirds of a cookie. Use two slashes, //, for whole ones."
    if each == "6.0":
        return "HINT: Line 2 printed 6.0, a float. Count cookies with an int: 20 // 3, both numbers without a point."
    if each != "6":
        return "HINT: Line 2 printed " + each + ". 3 friends share 20 cookies: how many whole cookies each?"
    if "20" not in each_code or "//" not in each_code:
        return "HINT: Line 2 shows the right answer, but let Python work it out with 20 and 3 and two slashes."

    # Line 3: leftovers, 20 % 3
    if "Ellipsis" in left:
        return "HINT: Line 3 still has the three dots. Which sign gives the leftovers?"
    if left == "2.0":
        return "HINT: Line 3 printed 2.0, a float. Cookies are counted: write 20 % 3 with no points."
    if left != "2":
        return "HINT: Line 3 printed " + left + ". After 3 friends take 6 each, how many of the 20 are left?"
    if "20" not in left_code or "%" not in left_code:
        return "HINT: Line 3 shows the right answer, but let Python work it out with 20, 3 and the percent sign."

    return "PASS: $25.20 each, 6 cookies each and 2 left on the tray. Fair and square!"


print()
print("-" * 40)
print(_check())
