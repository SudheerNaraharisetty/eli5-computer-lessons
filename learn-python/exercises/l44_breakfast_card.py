# Lesson 44 exercise: The breakfast card
#
# Kitchen Coach prints Ben's breakfast checklist for 3 mornings.
# Right now the checklist is COPIED 3 times, and Ben's new item,
# 15 g peanut butter, only made it into Monday and Tuesday.
# Wednesday's copy is out of date.
#
# Your job: write the checklist ONCE, as a function.
#   1. Write a card:  def print_breakfast():
#      Under it, pushed in by 4 spaces, the 5 print lines of the checklist:
#      oats, banana, peanut butter, coffee, water.
#   2. Under each day, CALL it:  print_breakfast()
#   3. Delete the old copies. Each checklist line should appear only once
#      in your code, on the card.
#
# Tips:
# - Write the def card first, above the calls. Python reads from the top.
# - A call needs its brackets. print_breakfast without () does nothing.
#
# When it is right, the program prints EXACTLY these 18 lines:
#
#   Monday
#   - 50 g oats
#   - 1 banana
#   - 15 g peanut butter
#   - 1 coffee
#   - 500 ml water
#   Tuesday
#   (the same 5 lines)
#   Wednesday
#   (the same 5 lines)
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l44_breakfast_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run, and you see what they print.
# - STEP 2, THE CHECK. It looks for your print_breakfast card, calls it on
#   its own, and compares what was printed. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: rewrite the lines below this line

print("Monday")
print("- 50 g oats")
print("- 1 banana")
print("- 15 g peanut butter")
print("- 1 coffee")
print("- 500 ml water")
print("Tuesday")
print("- 50 g oats")
print("- 1 banana")
print("- 15 g peanut butter")
print("- 1 coffee")
print("- 500 ml water")
print("Wednesday")
print("- 50 g oats")
print("- 1 banana")
print("- 1 coffee")
print("- 500 ml water")

# <<< END: rewrite the lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit,
# then calls your print_breakfast() on its own and checks what it printed.
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
        return ("HINT: Python could not read your lines: " + str(error)
                + "\n  Check the def line: def, the name, (), and a colon. "
                "And push the card's lines in by 4 spaces.")

    card = "\n".join(["- 50 g oats", "- 1 banana", "- 15 g peanut butter", "- 1 coffee", "- 500 ml water"])
    should = []
    for day in ["Monday", "Tuesday", "Wednesday"]:
        should.append(day)
        should.extend(card.split("\n"))

    # Run the learner's lines, then call the card on its own, each with its own captured output.
    runner = (
        "import contextlib, io, json, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "sys.stdout.flush()\n"
        "f = ns.get('print_breakfast')\n"
        "info = {'exists': 'print_breakfast' in ns, 'callable': callable(f), 'alone': None}\n"
        "if callable(f):\n"
        "    buf = io.StringIO()\n"
        "    try:\n"
        "        with contextlib.redirect_stdout(buf):\n"
        "            f()\n"
        "        info['alone'] = buf.getvalue()\n"
        "    except Exception as e:\n"
        "        info['alone_error'] = type(e).__name__ + ': ' + str(e)\n"
        "sys.stderr.write('@@INFO ' + json.dumps(info) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        return "HINT: Your lines never ended, so they were stopped after 5 seconds."

    printed = [line.rstrip() for line in done.stdout.splitlines()]
    print("STEP 1: what your lines print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing at all)")
    print()
    print("-" * 40)
    print("STEP 2, THE CHECK")

    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@INFO ")]
    found = [line for line in done.stderr.splitlines() if line.startswith("@@INFO ")]
    last = (errors or ["an error"])[-1]
    if not found:
        if "NameError" in last and "print_breakfast" in last:
            return ("HINT: Python stopped with: " + last + "\n  You call print_breakfast() before "
                    "its def. Python reads from the top: move the def card above the first call.")
        return "HINT: Your lines stopped with an error: " + last + "\n  Read it from the bottom up (lesson 4)."
    info = json.loads(found[0][len("@@INFO "):])

    defs = [node for node in tree.body if isinstance(node, ast.FunctionDef)]
    if not info["exists"] or not any(d.name == "print_breakfast" for d in defs):
        if defs:
            return ("HINT: Your card is called " + defs[0].name + ". Kitchen Coach looks for "
                    "print_breakfast. Rename it, and the calls too.")
        return ("HINT: There is no card yet. Start with the line  def print_breakfast():  and put "
                "the 5 checklist lines under it, pushed in by 4 spaces.")
    if "alone_error" in info:
        return "HINT: Your card stopped with an error when it was called: " + info["alone_error"]

    alone = info["alone"].rstrip("\n").split("\n") if info["alone"] else []
    if alone != card.split("\n"):
        return ("HINT: Called on its own, print_breakfast() printed:\n  "
                + ("\n  ".join(alone) if alone else "(nothing)")
                + "\n  It should print the 5 checklist lines, peanut butter in the middle:\n  "
                + card.replace("\n", "\n  "))

    # A name with no brackets is a line that does nothing.
    for node in ast.walk(tree):
        if isinstance(node, ast.Expr) and isinstance(node.value, ast.Name) and node.value.id == "print_breakfast":
            line_no = source.split(start, 1)[0].count("\n") + 1 + node.lineno
            return ("HINT: Line " + str(line_no) + " says print_breakfast with no brackets. "
                    "That only names the card. Write print_breakfast() to call it.")

    calls = [node for node in ast.walk(tree) if isinstance(node, ast.Call)
             and isinstance(node.func, ast.Name) and node.func.id == "print_breakfast"]
    if your_code.count("peanut butter") > 1 or your_code.count("oats") > 1:
        return ("HINT: The checklist lines are still in your code more than once. Keep them only "
                "on the card, and delete the old copies. Then a change goes in one place.")
    if not calls:
        return "HINT: The card is written, but nobody calls it. Under each day, write  print_breakfast()"

    if printed != should:
        for k, line in enumerate(should):
            mine = printed[k] if k < len(printed) else "(nothing)"
            if mine != line:
                return ("HINT: Line " + str(k + 1) + " of the output is  " + mine + "\n  It should be  " + line
                        + "\n  Print the day, then call print_breakfast(), for each of the 3 days.")
        return "HINT: The program prints " + str(len(printed)) + " lines. It should print exactly 18."

    return ("PASS: One card, 3 calls, and peanut butter every morning. "
            "Next time Ben changes his breakfast, you change one line.")


verdict = _check()
print(verdict)
