# Lesson 46 exercise: the porridge card
#
# Every morning Kitchen Coach makes porridge for Ana, Ben and Chloe.
# Most mornings the milk and the salt are the same: 250 ml of milk and
# 1 g of salt. Only the oats change. But today:
# - Ana wants 80 g of oats, with the usual milk and salt.
# - Ben wants 100 g of oats and more milk for protein: 350 ml.
# - Chloe wants 60 g of oats and NO salt.
#
# The card below has no defaults, so every call must list all 3 numbers,
# in order. Chloe's call mixed up the order: run it and look at her salt!
#
# Your job, between START and END:
# 1. Give the card two DEFAULT values (lesson 46):  milk_ml=250  and  salt_g=1.
#    Keep oats_g first, with no default. Keep the return line as it is.
# 2. Rewrite the 3 calls. Pass the oats as the first value, then ONLY the
#    amounts that differ from the usual, BY NAME, like  salt_g=0.
#    Ana's call needs no names at all.
#
# With the card and the calls right, it prints EXACTLY these 3 lines:
#
#   Ana: 80 g oats, 250 ml milk, 1 g salt
#   Ben: 100 g oats, 350 ml milk, 1 g salt
#   Chloe: 60 g oats, 250 ml milk, 0 g salt
#
# The check also calls your card with OTHER numbers, and leaves some out,
# to make sure the defaults work.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l46_porridge_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run, and you see what they print.
# - STEP 2, THE CHECK. It tries your card with other numbers too.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

def porridge(oats_g, milk_ml, salt_g):
    return f"{oats_g} g oats, {milk_ml} ml milk, {salt_g} g salt"

print(f"Ana: {porridge(80, 250, 1)}")
print(f"Ben: {porridge(100, 350, 1)}")
print(f"Chloe: {porridge(60, 0, 250)}")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, then
# calls your card with other numbers and looks at its jars and defaults.
def _check():
    import ast
    import json
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        msg = str(error)
        if "parameter without a default follows parameter with a default" in msg:
            return ("HINT: Python could not read your lines: " + msg
                    + "\n  Jars with a default go LAST:  def porridge(oats_g, milk_ml=250, salt_g=1):")
        if "positional argument follows keyword argument" in msg:
            return ("HINT: Python could not read your lines: " + msg
                    + "\n  In a call, plain values come first, names after:  porridge(60, salt_g=0)")
        return ("HINT: Python could not read your lines: " + msg
                + "  Check the colon after def (...), the brackets and the quote marks.")

    # Runs your lines, then looks at the card: its jars, its defaults, and what it hands back.
    runner = (
        "import io, json, inspect, contextlib, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "report = {}\n"
        "f = ns.get('porridge')\n"
        "if callable(f):\n"
        "    try:\n"
        "        ps = inspect.signature(f).parameters.values()\n"
        "        report['jars'] = [[p.name, None if p.default is p.empty else repr(p.default)] for p in ps]\n"
        "    except (TypeError, ValueError):\n"
        "        report['jars'] = []\n"
        "    tries = []\n"
        "    for args, kw in [((40,), {}), ((50,), {'salt_g': 2}), ((70,), {'milk_ml': 100}),\n"
        "                     ((), {'salt_g': 0, 'milk_ml': 200, 'oats_g': 30})]:\n"
        "        shown = io.StringIO()\n"
        "        try:\n"
        "            with contextlib.redirect_stdout(shown):\n"
        "                back = f(*args, **kw)\n"
        "            got, err = repr(back), ''\n"
        "        except Exception as e:\n"
        "            got, err = None, type(e).__name__ + ': ' + str(e)\n"
        "        tries.append({'args': list(args), 'kw': kw, 'back': got, 'shown': shown.getvalue(), 'err': err})\n"
        "    report['tries'] = tries\n"
        "sys.stderr.write('@@CARD ' + json.dumps(report) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? This exercise needs no loop at all."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what your lines print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARD ")]
    last = (errors or ["an error"])[-1]
    if done.returncode != 0:
        print(last)
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if done.returncode != 0:
        if "missing" in last and "required positional argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  A jar with no default must get a value. "
                    "Did you give milk_ml and salt_g their defaults:  milk_ml=250, salt_g=1 ?")
        if "unexpected keyword argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  The name in the call must match a jar on "
                    "the card exactly: oats_g, milk_ml or salt_g.")
        if "multiple values for argument" in last:
            return ("HINT: Python stopped with: " + last + "\n  The first plain value already fills oats_g. "
                    "Do not name oats_g again in the same call.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    report = json.loads(found[0][len("@@CARD "):]) if found else {}
    if "jars" not in report:
        return "HINT: There is no card called porridge. Keep  def porridge(oats_g, milk_ml=250, salt_g=1):"

    jars = report["jars"]
    names = [name for name, _ in jars]
    if names != ["oats_g", "milk_ml", "salt_g"]:
        return ("HINT: The card's jars are " + ", ".join(names) + ". Keep exactly these 3, in this order:  "
                "oats_g, milk_ml, salt_g")
    defaults = dict(jars)
    if defaults["oats_g"] is not None:
        return ("HINT: oats_g has a default (" + defaults["oats_g"] + "). The oats change every time, so "
                "leave oats_g without one. Only milk_ml and salt_g get defaults.")
    if defaults["milk_ml"] is None or defaults["salt_g"] is None:
        return "HINT: Give both jars a usual amount on the def line:  milk_ml=250, salt_g=1"
    if defaults["milk_ml"] != "250" or defaults["salt_g"] != "1":
        return ("HINT: The defaults are milk_ml=" + defaults["milk_ml"] + " and salt_g=" + defaults["salt_g"]
                + ". The usual amounts are milk_ml=250 and salt_g=1.")

    for t in report["tries"]:
        parts = [str(a) for a in t["args"]] + [k + "=" + str(v) for k, v in t["kw"].items()]
        call = "porridge(" + ", ".join(parts) + ")"
        oats = t["args"][0] if t["args"] else t["kw"]["oats_g"]
        want = repr(f"{oats} g oats, {t['kw'].get('milk_ml', 250)} ml milk, {t['kw'].get('salt_g', 1)} g salt")
        if t["err"]:
            return "HINT: " + call + " stopped with: " + t["err"]
        if t["back"] == "None":
            return ("HINT: " + call + " handed back None. Keep the line  return f\"...\"  on the card "
                    "(lesson 45). Do not print inside the card.")
        if t["back"] != want:
            return ("HINT: " + call + " handed back " + t["back"] + "\n  It should be " + want
                    + "\n  Keep the return line exactly as it was. It uses the jars, not fixed numbers.")
        if t["shown"].strip():
            return "HINT: The card prints something too. Let it only return. Print outside the card."

    # Every call to porridge: only the oats go in by position. The rest go in by name.
    for node in ast.walk(tree):
        if isinstance(node, ast.Call) and getattr(node.func, "id", "") == "porridge":
            line = ast.get_source_segment(your_code, node) or "porridge(...)"
            if len(node.args) > 1:
                return ("HINT: " + line + " passes " + str(len(node.args)) + " plain values in order. "
                        "Pass only the oats plainly, and any other amount by name, like  porridge(60, salt_g=0)")
            for kw in node.keywords:
                value = kw.value.value if isinstance(kw.value, ast.Constant) else None
                if (kw.arg, value) in (("milk_ml", 250), ("salt_g", 1)):
                    return ("HINT: " + line + " passes " + kw.arg + "=" + str(value) + ", but that is the usual "
                            "amount already. Leave it out: the default fills that jar.")

    should = ["Ana: 80 g oats, 250 ml milk, 1 g salt",
              "Ben: 100 g oats, 350 ml milk, 1 g salt",
              "Chloe: 60 g oats, 250 ml milk, 0 g salt"]
    if printed == should:
        return ("PASS: The card knows the usual amounts, and each call names only what is different. "
                "Ana: porridge(80). Ben: milk_ml=350. Chloe: salt_g=0. Nobody gets 250 g of salt.")
    for i, line in enumerate(should):
        if i >= len(printed):
            return "HINT: Print 3 lines. You printed " + str(len(printed)) + ". The next one should be:  " + line
        if printed[i] != line:
            return "HINT: Line " + str(i + 1) + " is  " + printed[i] + "\n  It should be  " + line
    return "HINT: Print exactly the 3 lines, and nothing else."


verdict = _check()
print(verdict)
