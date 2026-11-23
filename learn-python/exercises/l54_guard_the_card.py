# Lesson 54 exercise: Guard the card
#
# Chloe is making porridge for a crowd. Kitchen Coach has a recipe card,
# scale_recipe(grams, people). It takes the grams for ONE person and the
# number of people, and returns the grams to cook in all.
#
# Right now the card cooks anything. scale_recipe(-80, 3) returns -240,
# and scale_recipe(80, 0) returns 0. Nobody gets told, and the wrong
# numbers go straight onto the shopping list.
#
# Your job, between START and END: put TWO guards at the top of the card.
# 1. If grams is below 0, raise a ValueError. Its message must say that
#    grams is wrong AND show the bad value, for example:
#        grams must be 0 or more, got -80
# 2. If people is below 1, raise a ValueError. Its message must say that
#    people is wrong AND show the bad value, for example:
#        people must be 1 or more, got 0
#    Use an f-string, so the message shows whatever value came in.
# Keep the last line, return grams * people, for good values.
# 0 grams is fine (no porridge for you today). It is not an error.
#
# With both guards right, the orders at the bottom print EXACTLY:
#
#   Cook 240 g
#   Refused: grams must be 0 or more, got -80
#   Refused: people must be 1 or more, got 0
#
# Your messages may use other words, as long as each one names what was
# wrong (grams or people) and shows the bad value. The check also tries
# the card with OTHER values, so typing -80 into the message will not pass.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l54_guard_the_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your card and the orders run, and you see what they print.
# - STEP 2, THE CHECK. It tries your card with good and bad values.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

def scale_recipe(grams, people):
    """Return the grams to cook. grams is for one person."""
    # Put your two guards here.
    return grams * people

# <<< END: write your lines above this line

# ===== THE ORDERS (do not change) =====
orders = [(80, 3), (-80, 3), (80, 0)]
for grams, people in orders:
    try:
        print(f"Cook {scale_recipe(grams, people)} g")
    except ValueError as err:
        print(f"Refused: {err}")
# ===== END OF THE ORDERS =====


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END and the orders, runs them in a separate Python with a
# 5 second limit, then tries your card with other values.
def _check():
    import ast
    import json
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    orders_start, orders_end = "# ===== THE ORDERS", "# ===== END OF THE ORDERS"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    if orders_start not in source or orders_end not in source:
        return "HINT: Keep the orders as they were. Get a fresh copy of the file if you changed them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    orders = source.split(orders_start, 1)[1].split("\n", 1)[1].split(orders_end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon after each if, and that the guards are indented inside the card.")

    # Runs your lines and the orders, then tries the card with other values.
    runner = (
        "import json, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'the orders', 'exec'), ns)\n"
        "f = ns.get('scale_recipe')\n"
        "tries = []\n"
        "for args in [(80, 3), (0, 4), (125, 1), (-80, 3), (-5, 2), (80, 0), (60, -2)]:\n"
        "    if not callable(f):\n"
        "        break\n"
        "    try:\n"
        "        back = f(*args)\n"
        "        tries.append({'args': args, 'back': repr(back), 'num': back if isinstance(back, (int, float)) else None, 'err': '', 'msg': ''})\n"
        "    except Exception as e:\n"
        "        tries.append({'args': args, 'back': '', 'num': None, 'err': type(e).__name__, 'msg': str(e)})\n"
        "sys.stderr.write('@@CARD ' + json.dumps({'missing': not callable(f), 'tries': tries}) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code, orders],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? The card needs no loop at all."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what the orders print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARD ")]
    last = (errors or ["an error"])[-1]
    if done.returncode != 0:
        print(last)
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if done.returncode != 0:
        if last.startswith(("TypeError", "Exception", "RuntimeError")):
            return ("HINT: Python stopped with: " + last + "\n  The orders only catch ValueError. "
                    "Raise a ValueError, like this:  raise ValueError(f\"grams must be 0 or more, got {grams}\")")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling. The card's jars are "
                    "called grams and people, and the error type is ValueError.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    if not found:
        return "HINT: The check could not read your card. Keep it as  def scale_recipe(grams, people):"
    report = json.loads(found[0][len("@@CARD "):])
    if report["missing"]:
        return "HINT: There is no card called scale_recipe. Keep  def scale_recipe(grams, people):"

    for t in report["tries"]:
        grams, people = t["args"]
        call = "scale_recipe(" + str(grams) + ", " + str(people) + ")"
        bad_jar = "grams" if grams < 0 else "people" if people < 1 else ""
        if not bad_jar:
            if t["err"]:
                return ("HINT: " + call + " raised " + t["err"] + ": " + t["msg"] + "\n  But those values are fine. "
                        "Only refuse grams below 0, or people below 1. 0 grams is allowed.")
            if t["num"] != grams * people:
                return ("HINT: " + call + " returned " + t["back"] + ", but it should be "
                        + str(grams * people) + ". Keep  return grams * people  as the last line.")
            continue
        value = str(grams if bad_jar == "grams" else people)
        if not t["err"]:
            return ("HINT: " + call + " returned " + t["back"] + " instead of refusing.\n  A special value "
                    "slips into the sums. Add a guard at the top:  if " + bad_jar + " < "
                    + ("0" if bad_jar == "grams" else "1") + ":  then raise ValueError(...)")
        if t["err"] != "ValueError":
            return ("HINT: " + call + " raised " + t["err"] + ". A bad value of the right kind is a "
                    "ValueError:  raise ValueError(...)")
        if value not in t["msg"]:
            return ("HINT: " + call + " raised ValueError: " + t["msg"] + "\n  The message should show the "
                    "bad value, " + value + ". Use an f-string:  f\"... got {" + bad_jar + "}\"")
        if bad_jar not in t["msg"]:
            return ("HINT: " + call + " raised ValueError: " + t["msg"] + "\n  Say WHAT was wrong too: "
                    "put the word " + bad_jar + " in the message.")

    if (printed[:1] == ["Cook 240 g"] and len(printed) == 3
            and all(line.startswith("Refused: ") for line in printed[1:])):
        return ("PASS: The card refuses bad grams and bad people, loudly, with a message that says what "
                "was wrong and shows the value. Good orders still cook: 240 g.")
    return "HINT: Keep the orders as they were. They should print 3 lines: one Cook and two Refused."


verdict = _check()
print(verdict)
