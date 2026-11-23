# Lesson 57 exercise: Close the notebook
#
# Kitchen Coach writes tonight's dinner log with a recipe card,
# log_dinner(path, orders). Each order is a guest and their servings,
# as text, the way input() hands it over. Each order becomes one line:
#
#     Ana: 2 servings
#
# The card opens the notebook, writes, and closes it with f.close().
# But Chloe typed the word "two". int("two") raises a ValueError halfway,
# so the card stops before f.close(). The notebook is left OPEN, and the
# lines for Ana and Ben are still waiting in Python's memory, not saved.
# Run it once: "In the log:" shows nothing at all.
#
# Your job, between START and END: rewrite the card with
#
#     with open(path, "w") as f:
#
# so the notebook closes itself when the block ends, even after an error.
# - Put the loop INSIDE the with block (indented under it).
# - Remove f.close(). The with block does that for you.
# - Do NOT catch the ValueError inside the card. Let it out: the orders
#   at the bottom catch it, like a caller should (lesson 53).
#
# When it works, running the file prints EXACTLY:
#
#   Stopped: invalid literal for int() with base 10: 'two'
#   In the log:
#   Ana: 2 servings
#   Ben: 3 servings
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l57_close_the_notebook.py
# - The log is saved as dinner_log.txt, next to this file. Open it in
#   VS Code to see what the card wrote.
#
# What happens when you run it, in two steps:
# - STEP 1. Your card and the orders run, and you see what they print.
# - STEP 2, THE CHECK. It tries your card with good and bad orders, and
#   checks that every notebook it opened was closed. It says PASS, or
#   gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

def log_dinner(path, orders):
    """Write one line per order to the dinner log at path."""
    f = open(path, "w")
    for guest, servings in orders:
        f.write(f"{guest}: {int(servings)} servings\n")
    f.close()

# <<< END: write your lines above this line

# ===== THE ORDERS (do not change) =====
import os
# The log goes next to this file. Lesson 58 explains this line.
LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dinner_log.txt")

tonight = [("Ana", "2"), ("Ben", "3"), ("Chloe", "two")]
try:
    log_dinner(LOG, tonight)
except ValueError as err:
    print(f"Stopped: {err}")

with open(LOG) as notes:
    print("In the log:")
    print(notes.read(), end="")
# ===== END OF THE ORDERS =====


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END and the orders, runs them in a separate Python with a
# 5 second limit, then tries your card with other orders. It swaps open()
# for one that remembers every notebook your card opens, so it can see
# whether each one was closed.
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
                + "  Check the colon at the end of the with line, and that the loop is indented under it.")

    runner = (
        "import builtins, json, os, sys, tempfile\n"
        "_real_open = builtins.open\n"
        "_notebooks = []\n"
        "def _open(*args, **kwargs):\n"
        "    f = _real_open(*args, **kwargs)\n"
        "    _notebooks.append(f)\n"
        "    return f\n"
        "ns = {'__name__': '__main__', '__file__': sys.argv[3], 'open': _open, '_notebooks': _notebooks}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'the orders', 'exec'), ns)\n"
        "f = ns.get('log_dinner')\n"
        "tries = []\n"
        "folder = tempfile.mkdtemp()\n"
        "cases = [[('Ana', '2'), ('Ben', '3')], [('Ben', '1'), ('Chloe', 'lots'), ('Ana', '2')], [('Chloe', '4')]]\n"
        "for n, orders in enumerate(cases):\n"
        "    if not callable(f):\n"
        "        break\n"
        "    path = os.path.join(folder, 'log' + str(n) + '.txt')\n"
        "    before = len(_notebooks)\n"
        "    err, msg = '', ''\n"
        "    try:\n"
        "        f(path, orders)\n"
        "    except Exception as e:\n"
        "        err, msg = type(e).__name__, str(e)\n"
        "    mine = _notebooks[before:]\n"
        "    still_open = [x for x in mine if not x.closed]\n"
        "    with _real_open(path) as r:\n"
        "        text = r.read()\n"
        "    tries.append({'orders': orders, 'err': err, 'msg': msg, 'opened': len(mine), 'open': len(still_open), 'text': text})\n"
        "    for x in still_open:\n"
        "        x.close()\n"
        "sys.stderr.write('@@CARD ' + json.dumps({'missing': not callable(f), 'tries': tries}) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code, orders, str(pathlib.Path(__file__).resolve())],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? The card needs only one for loop."

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
        if last.startswith("IndexError"):
            return ("HINT: Your card never opened the notebook with open(). Keep  with open(path, \"w\") as f:"
                    "  at the top of the card.")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling. The card's jars are "
                    "called path and orders, and the file is f after  as f.")
        if last.startswith("ValueError: I/O operation on closed file"):
            return ("HINT: Python stopped with: " + last + "\n  The notebook was already closed when the card "
                    "wrote to it. Indent the for loop and the write line under the with line.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    if not found:
        return "HINT: The check could not read your card. Keep it as  def log_dinner(path, orders):"
    report = json.loads(found[0][len("@@CARD "):])
    if report["missing"]:
        return "HINT: There is no card called log_dinner. Keep  def log_dinner(path, orders):"

    for t in report["tries"]:
        call = "log_dinner(path, " + str([tuple(o) for o in t["orders"]]) + ")"
        good = []
        bad = False
        for guest, servings in t["orders"]:
            if not servings.isdigit():
                bad = True
                break
            good.append(guest + ": " + servings + " servings\n")
        want = "".join(good)
        if "closed file" in t["msg"]:
            return ("HINT: " + call + " stopped with  ValueError: " + t["msg"] + "\n  The card wrote to the "
                    "notebook after the with block had closed it. Indent the for loop under the with line.")
        if t["opened"] == 0:
            return "HINT: " + call + " never opened the notebook. Use  with open(path, \"w\") as f:"
        if t["open"]:
            if bad:
                return ("HINT: After the ValueError in " + call + ", the notebook was left OPEN.\n  f.close() never "
                        "ran. Use  with open(path, \"w\") as f:  and put the loop inside the block.")
            return ("HINT: " + call + " left the notebook open. Use  with open(path, \"w\") as f:"
                    "  so it closes when the block ends.")
        if bad and t["err"] != "ValueError":
            return ("HINT: " + call + " has a bad servings value, but no ValueError came out of the card.\n  "
                    "Do not catch it inside the card. Let it out: the caller catches it.")
        if not bad and t["err"]:
            return "HINT: " + call + " raised " + t["err"] + ", but every order there is fine."
        if t["text"] != want:
            return ("HINT: After " + call + " the log holds:\n" + (t["text"] or "(nothing)\n")
                    + "  It should hold:\n" + (want or "(nothing)\n")
                    + "  Write one line per order, like  Ana: 2 servings  and keep the \\n at the end.")

    if "with open(" not in your_code:
        return "HINT: The card works, but use  with open(path, \"w\") as f:  as this lesson shows."
    if ".close()" in your_code:
        return "HINT: Remove f.close(). The with block closes the notebook for you."

    want_print = ["Stopped: invalid literal for int() with base 10: 'two'", "In the log:", "Ana: 2 servings", "Ben: 3 servings"]
    if printed != want_print:
        return "HINT: Keep the orders as they were. They should print the 4 lines shown at the top of this file."
    return ("PASS: The notebook closes itself, even when Chloe's \"two\" stops the card halfway. "
            "Ana and Ben's lines are saved, and the ValueError still reaches the caller.")


verdict = _check()
print(verdict)
