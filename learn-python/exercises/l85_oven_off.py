# Lesson 85 exercise: Oven off, every time
#
# Kitchen Coach bakes with   with oven_on(180):   and the oven must be
# switched off afterwards, EVERY time, even when Chloe's cake burns
# (an error raised inside the with block).
#
# oven_on(temp) is a context manager made with @contextmanager.
# Instead of printing, it writes what happens into the list log, so the
# check can read it:
#
#     log.append(f"Oven on: {temp}")     when the block starts
#     log.append("Oven off")             when the block ends, ALWAYS
#
# It also hands temp to the with line, so  with oven_on(180) as t:  gives t = 180.
#
# The starter below works when nothing goes wrong. But when the block raises
# an error, "Oven off" never reaches the log: the oven stays on.
# Fix it between START and END: put the yield inside try:, and the cleanup
# under finally:
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l85_oven_off.py
#
# What happens when you run it, in two steps:
# - STEP 1. Two bakes: banana bread (fine) and Chloe's cake (it burns).
#   You see the log after each one.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
from contextlib import contextmanager

log = []


@contextmanager
def oven_on(temp):
    log.append(f"Oven on: {temp}")
    yield temp                      # if the block fails, the next line is skipped
    log.append("Oven off")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, bakes twice with them, and reads the log.
def _check():
    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    log = ns.get("log")
    oven_on = ns.get("oven_on")
    if not isinstance(log, list):
        return "HINT: Keep the line  log = []  The check reads that list."
    if not callable(oven_on):
        return "HINT: Keep the line  def oven_on(temp):  The check calls it."
    if not hasattr(oven_on, "__wrapped__"):
        return ("HINT: Keep  @contextmanager  on the line right above  def oven_on(temp):  "
                "Without it, with cannot use oven_on.")

    print("STEP 1: two bakes")
    print("-" * 50)

    # Bake 1: nothing goes wrong.
    log.clear()
    try:
        with oven_on(180) as t:
            log.append("Baking banana bread")
    except Exception as error:
        return "HINT: The banana bread stopped with " + type(error).__name__ + ": " + str(error)
    print("Banana bread:", log)
    good = list(log)

    # Bake 2: Chloe's cake burns inside the block.
    log.clear()
    let_out = False
    try:
        with oven_on(200):
            log.append("Baking chocolate cake")
            raise ValueError("the cake burnt")
    except ValueError:
        let_out = True
    except Exception as error:
        return "HINT: The cake stopped with " + type(error).__name__ + ": " + str(error)
    print("Chloe's cake:", log)
    bad = list(log)
    print("-" * 50)
    print("STEP 2, THE CHECK")

    if t != 180:
        return ("HINT: with oven_on(180) as t:  should give t = 180. It gave " + repr(t)
                + ". Write  yield temp")
    if good != ["Oven on: 180", "Baking banana bread", "Oven off"]:
        return ("HINT: For the banana bread the log should be "
                "['Oven on: 180', 'Baking banana bread', 'Oven off']. It was " + repr(good))
    if not let_out:
        return ("HINT: The ValueError from the burnt cake disappeared. Clean up in finally:, "
                "but do not catch the error inside oven_on. The caller must hear about it.")
    if bad[:2] != ["Oven on: 200", "Baking chocolate cake"]:
        return ("HINT: The log for the cake should start with "
                "['Oven on: 200', 'Baking chocolate cake']. It was " + repr(bad))
    if bad.count("Oven off") == 0:
        return ("HINT: The cake burnt and the oven is still on: no 'Oven off' in the log. "
                "Put  yield temp  inside  try:  and  log.append(\"Oven off\")  under  finally:")
    if bad != ["Oven on: 200", "Baking chocolate cake", "Oven off"]:
        return ("HINT: The log for the cake should be "
                "['Oven on: 200', 'Baking chocolate cake', 'Oven off'], with 'Oven off' once. It was "
                + repr(bad))

    return ("PASS: The oven goes on when the block starts and off when it ends, every time, "
            "even when Chloe's cake burns. And the error still reaches the caller.")


verdict = _check()
print(verdict)
