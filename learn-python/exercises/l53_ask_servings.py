# Lesson 53 exercise: ask until the answer makes sense
#
# Kitchen Coach asks "How many servings? " before it plans the evening.
# People type anything: words, 0, minus numbers. Write the recipe card
# ask_servings() so it keeps asking until it gets a WHOLE NUMBER ABOVE 0,
# and then RETURNS that number.
#
# The starter card below crashes on the first word, with:
#
#   ValueError: invalid literal for int() with base 10: 'two'
#
# Your job, between START and END:
# 1. Ask inside a  while True:  loop (lesson 28), so it can ask again.
# 2. Put only the risky line inside try:   servings = int(answer)
#    and catch the error you expect:       except ValueError:
#    Print a friendly message there, like  Please type a whole number, like 4.
#    Then  continue  to ask again.
# 3. A number below 1 is not an error for Python: int("-1") works fine.
#    Check it yourself with if, and print another friendly message,
#    like  At least 1 serving, please.
# 4. When the number is 1 or more:  return servings
#    (return leaves the card, and the loop with it.)
# Do NOT write a bare  except:  or  except Exception:  The check reads your
# lines to make sure. A giant net would hide your bugs too.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l53_ask_servings.py
#
# What happens when you run it, in two steps:
# - STEP 1, THE CHECK. You do not type anything here. For a moment the check
#   swaps Python's input() for a pretend guest, Ana, who types
#   two, 0, -1 and then 3. Your card should refuse the first three, with a
#   friendly message each time, and return 3. Then it tries a second guest
#   with other answers. It says PASS or gives you one hint.
# - STEP 2, YOUR TURN (only after a PASS). Your card asks YOU, for real, in
#   the terminal at the bottom of VS Code. Click there, type, press Enter.

# >>> START: write your lines below this line

def ask_servings():
    servings = int(input("How many servings? "))
    return servings

# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# THE CHECK. You do not need to read this part yet.
# It replaces input() with a pretend guest for a moment, calls your card,
# and looks at what it hands back and what it prints.
# ---------------------------------------------------------------------------
def _check():
    import ast
    import builtins
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read line " + str(error.lineno) + " of your lines: "
                + str(error.msg) + ". Check the colons after while True, try and except, "
                "and that the lines under them are pushed in.")

    # Read your lines first: no giant nets.
    for node in ast.walk(tree):
        if isinstance(node, ast.ExceptHandler):
            if node.type is None:
                return ("HINT: Your lines have a bare  except:  It catches every error, even "
                        "your own typos.\n  Name the one you expect:  except ValueError:")
            if isinstance(node.type, ast.Name) and node.type.id in ("Exception", "BaseException"):
                return ("HINT: Your lines use  except " + node.type.id + ":  That is a giant net. "
                        "It hides real bugs.\n  Name the one you expect:  except ValueError:")
    if not any(isinstance(node, ast.Try) for node in ast.walk(tree)):
        hint_try = True
    else:
        hint_try = False

    # A pretend guest: each call to input() hands back the next answer.
    class OutOfAnswers(Exception):
        pass

    def guest(answers):
        left = list(answers)
        asked = []  # each question and answer, as it looks on the screen

        def fake_input(prompt=""):
            if not left:
                raise OutOfAnswers()
            answer = left.pop(0)
            asked.append(str(prompt) + answer)
            print(str(prompt) + answer)  # looks like a terminal: question, then answer
            return answer
        return fake_input, asked

    # Printing is counted too, so a loop that prints forever is stopped.
    class Printed(io.StringIO):
        def write(self, text):
            if self.tell() > 20000:
                raise OutOfAnswers()
            return super().write(text)

    def try_guest(answers, want):
        fake_input, asked = guest(answers)
        printed = Printed()
        real_input = builtins.input
        builtins.input = fake_input
        try:
            names = {"__name__": "__check__"}
            with contextlib.redirect_stdout(printed):
                exec(your_code, names)
                card = names.get("ask_servings")
                if not callable(card):
                    return "HINT: There is no card called ask_servings. Keep  def ask_servings():"
                back = card()
        except OutOfAnswers:
            if printed.tell() > 20000:
                return ("HINT: Your card printed and printed and never stopped. Does every round "
                        "of the loop call input() again?")
            return ("HINT: The guest typed " + ", ".join(answers) + " and your card asked again "
                    "after " + want + ". When the number is 1 or more:  return servings")
        except ValueError as error:
            if hint_try:
                return ("HINT: Python stopped with  ValueError: " + str(error) + "\n  Put the int() "
                        "line inside  try:  and add  except ValueError:  under it, with a friendly message.")
            return ("HINT: Python still stopped with  ValueError: " + str(error) + "\n  Is the int() "
                    "line inside the try block, and does the except say ValueError?")
        except NameError as error:
            return ("HINT: Python stopped with  NameError: " + str(error) + "\n  Good: the small net "
                    "let your typo show. Check the spelling of that name.")
        except Exception as error:
            return "HINT: Python stopped with  " + type(error).__name__ + ": " + str(error)
        finally:
            builtins.input = real_input

        lines = printed.getvalue().splitlines()
        messages = [line for line in lines if line.strip() and line not in asked]
        if back is None:
            return "HINT: Your card handed back None. End it with  return servings"
        if isinstance(back, str):
            return ("HINT: Your card handed back the text " + repr(back) + ". Hand back the number: "
                    "servings = int(answer)  and  return servings")
        if back != int(want):
            if isinstance(back, int) and back < 1:
                return ("HINT: Your card accepted " + str(back) + ". No error happens for that, "
                        "because int() reads it fine.\n  Check it with if:  if servings < 1:  "
                        "then print a message and ask again.")
            return ("HINT: The guest typed " + ", ".join(answers) + ". Your card handed back "
                    + repr(back) + ", but it should hand back " + want + ".")
        bad = len(answers) - 1
        if len(messages) < bad:
            return ("HINT: It handed back " + want + ". Well done! But the guest got only "
                    + str(len(messages)) + " message(s) for " + str(bad) + " bad answers.\n"
                    "  Print one friendly line for every answer you refuse.")
        return None

    first = try_guest(["two", "0", "-1", "3"], "3")
    if first:
        return first
    second = try_guest(["", "2.5", "lots", "-4", "5"], "5")
    if second:
        return "With a second guest (nothing, 2.5, lots, -4, then 5): " + second
    return ("PASS: Words, 0 and minus numbers are all refused politely, and 3 comes back. "
            "A small net for the error you expect, and an if for the rest.")


print("STEP 1, THE CHECK: a pretend guest types two, 0, -1, then 3")
print("-" * 40)
verdict = _check()
print(verdict)
if verdict.startswith("PASS"):
    print()
    print("STEP 2, YOUR TURN: answer for real. Try a word, 0 and -2 before a good number.")
    print(f"Kitchen Coach plans for {ask_servings()} servings.")
