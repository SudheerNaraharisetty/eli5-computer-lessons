# Lesson 14 exercise: the waiter takes an order
#
# You are the waiter at the cookie counter. Each cookie costs 1.50.
# Write a program that has a short conversation with a guest:
#
# 1. Ask the guest's name, and store the answer in a jar.
#    (This line is done for you, as an example.)
# 2. Ask how many cookies they want. input() gives back TEXT, so turn
#    the answer into a whole number with int(...).
# 3. Work out the total price: the number of cookies times 1.50.
# 4. Print a confirmation that shows the name, the number of cookies and
#    the total, for example:
#      Thanks, Ana! 4 cookies. Total: 6.0
#    (Print with commas between the parts, as in the lesson.)
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l14_waiter.py
#
# What happens when you run it, in two steps:
# - STEP 1, YOUR TURN. Your program runs for real. The questions appear in
#   the terminal at the bottom of VS Code. Click in the terminal, type your
#   answer and press Enter. You are the guest now.
# - STEP 2, THE CHECK. After your program ends, the check below runs your
#   lines again by itself. It pretends to be a guest called Ana who wants 4
#   cookies, so you do not type anything in this step. It looks for "Ana"
#   and the total 6.0 in what your program prints, and says PASS or gives
#   you one hint.
#
# If you type a word like "four" in step 1, Python stops with a ValueError
# before the check can run. That is the catch from the lesson: int() only
# reads digits. Run the file again and type a number.
#
# If Python stops with "TypeError: can't multiply sequence by non-int of
# type 'float'", the number of cookies is still text. That is the pain from
# the lesson: wrap the question in int(...).

# >>> START: write your lines below this line

name = input("What is your name? ")

# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# STEP 2, THE CHECK. You do not need to read this part yet. It runs your lines
# again, answers the questions as Ana who wants 4 cookies, and reads what was
# printed.
# ---------------------------------------------------------------------------
def _check():
    import builtins
    import contextlib
    import io
    import pathlib
    import re

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    answers = ["Ana", "4"]
    asked = []
    printed = io.StringIO()

    def fake_input(prompt=""):
        # Answer like a guest at a terminal: show the question, then the answer.
        if len(asked) == len(answers):
            raise RuntimeError("asked a third question")
        answer = answers[len(asked)]
        asked.append(str(prompt))
        print(str(prompt) + answer)
        return answer

    real_input = builtins.input
    builtins.input = fake_input
    try:
        with contextlib.redirect_stdout(printed):
            exec(your_code, {"__name__": "__check__"})
    except RuntimeError as error:
        if "third question" not in str(error):
            return "HINT: Python stopped with RuntimeError: " + str(error)
        return ("HINT: Your program asks more than two questions. Ask only two: "
                "the name, then how many cookies.")
    except TypeError as error:
        if "str" in str(error):
            return ("HINT: Python stopped with TypeError: " + str(error) + ". "
                    "The number of cookies is still text. Wrap the question in int(...), like:  "
                    "cookies = int(input(\"How many cookies? \"))")
        return "HINT: Python stopped with TypeError: " + str(error)
    except NameError as error:
        return ("HINT: Python stopped with a NameError: " + str(error) + ". "
                "Check the spelling of that name, and make sure its jar is filled "
                "on a line ABOVE the line that uses it.")
    except SyntaxError as error:
        return ("HINT: Python could not read line " + str(error.lineno) + " between START and END. "
                "Check that every bracket and quote mark you open is closed again.")
    except Exception as error:
        return "HINT: Python stopped with " + type(error).__name__ + ": " + str(error)
    finally:
        builtins.input = real_input

    out = printed.getvalue()
    if len(asked) == 1:
        return ("HINT: The name question works. Now ask how many cookies, and turn the answer "
                "into a number:  cookies = int(input(\"How many cookies? \"))")
    if "4444" in out:
        return ("HINT: Your program printed 4444..., the text \"4\" repeated. input() gives back "
                "text. Wrap it in int(...) so the answer becomes a number you can count with.")
    lines = [line for line in out.splitlines() if not any(line.startswith(p) for p in asked)]
    shown = "\n".join(lines)
    if shown.strip() == "":
        return ("HINT: Both questions are asked. Now print a confirmation with the name and the "
                "total, for example:  print(\"Thanks,\", name, \"Total:\", total)")
    if "Ana" not in shown:
        return ("HINT: The confirmation should show the guest's name. Put the jar name (no quotes) "
                "inside print(...). It printed:\n" + shown)
    if not re.search(r"(?<![\d.])6\.00?(?!\d)", shown):
        if re.search(r"(?<![\d.])6(?![\d.])", shown):
            return ("HINT: Close. The total shows as 6. Multiply by the price 1.50 (a float), "
                    "so Python shows 6.0. It printed:\n" + shown)
        return ("HINT: The total should be 4 cookies times 1.50, which is 6.0. "
                "Work it out with *, from the cookie jar and 1.50. It printed:\n" + shown)
    return "PASS: Ana ordered 4 cookies and your program worked out 6.0. Table served!"


print()
print("-" * 40)
print("STEP 2, THE CHECK: answering as Ana, who wants 4 cookies")
print(_check())
