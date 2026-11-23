# Lesson 37 exercise: Ben's spice rack
#
# Ben counts protein: grams of protein in 100 g of each food.
#   tofu 17, lentils 9, eggs 13, oats 13
#
# The code below keeps those numbers in a LIST. Every line has to remember
# which position is which food. Turn it into a DICT, so each number has a label.
#
# Rules:
# - Make protein a dict with these 4 keys, in this order:
#   "tofu", "lentils", "eggs", "oats"  (all small letters)
# - Then ADD tempeh (20 g) in its own line:   protein["tempeh"] = 20
# - Then CHANGE tofu to 15 in its own line (Ben bought a new pack).
# - Print with lookups like protein["tofu"] and len(protein).
#   Do not type the numbers 5, 15 or 20 into your print lines.
#
# It must print these 4 lines, EXACTLY:
#
#   Foods on the rack: 5
#   Tofu: 15 g per 100 g
#   Tempeh: 20 g per 100 g
#   {'tofu': 15, 'lentils': 9, 'eggs': 13, 'oats': 13, 'tempeh': 20}
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l37_spice_rack.py
# - Your lines run inside a safety net with a 5 second limit.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run, and you see what they print.
# - STEP 2, THE CHECK. The check says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

# Ben's protein, g per 100 g. Positions: 0 tofu, 1 lentils, 2 eggs, 3 oats
protein = [17, 9, 13, 13]

protein.append(20)   # tempeh, so that is position 4. Remember that!
protein[0] = 15      # a new pack of tofu. Tofu was position 0, right?

print("Foods on the rack:", len(protein))
print("Tofu:", protein[0], "g per 100 g")
print("Tempeh:", protein[4], "g per 100 g")
print(protein)

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit,
# and compares what they print with what they should print.
def _check():
    import ast
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    # STEP 1: run the lines and show what they print.
    runner = (
        "import sys\n"
        "_ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), _ns)\n"
        "print('@@RACK@@', repr(_ns.get('protein')))\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? This exercise needs no loop."
    printed = [line.rstrip() for line in done.stdout.splitlines() if not line.startswith("@@RACK@@")]
    printed = [line for line in printed if line.strip()]
    print("STEP 1: what your lines print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    if done.returncode != 0:
        print((done.stderr.strip().splitlines() or ["an error"])[-1])
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if done.returncode != 0:
        last = (done.stderr.strip().splitlines() or ["an error"])[-1]
        if last.startswith("KeyError"):
            return ("HINT: Python stopped with: " + last + "\n  There is no key with that "
                    "name. Check the spelling and the capitals: keys are \"tofu\", \"lentils\", "
                    "\"eggs\", \"oats\" and \"tempeh\".")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)

    # Find the line that makes the rack.
    made = None
    for node in tree.body:
        if (isinstance(node, ast.Assign) and len(node.targets) == 1
                and isinstance(node.targets[0], ast.Name) and node.targets[0].id == "protein"):
            made = node
            break
    if made is None:
        return 'HINT: Make the rack in one line that starts with  protein = {'
    if isinstance(made.value, ast.List):
        return ("HINT: protein is still a list, so every line has to remember positions. "
                "Make it a dict with curly brackets:  protein = {\"tofu\": 17, \"lentils\": 9, ...}")
    if not isinstance(made.value, ast.Dict):
        return 'HINT: Make protein a dict with curly brackets:  protein = {"tofu": 17, ...}'
    try:
        first = ast.literal_eval(made.value)
    except ValueError:
        return "HINT: Write the numbers straight into the dict, like  \"tofu\": 17"
    if "tempeh" in first:
        return ("HINT: The dict starts with 4 foods. Add tempeh in its own line after it:  "
                "protein[\"tempeh\"] = 20")
    want_first = {"tofu": 17, "lentils": 9, "eggs": 13, "oats": 13}
    if list(first) != list(want_first):
        return ("HINT: The dict should have exactly these 4 keys, in this order, all small "
                "letters:  \"tofu\", \"lentils\", \"eggs\", \"oats\". Yours has " + str(list(first)) + ".")
    if first != want_first:
        if first.get("tofu") == 15:
            return ("HINT: Start with tofu at 17, then CHANGE it in its own line:  "
                    "protein[\"tofu\"] = 15")
        return "HINT: Check the numbers: tofu 17, lentils 9, eggs 13, oats 13."

    # Look for the line that adds tempeh and the line that changes tofu.
    sets = set()
    for node in tree.body:
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if (isinstance(target, ast.Subscript) and isinstance(target.value, ast.Name)
                        and target.value.id == "protein" and isinstance(target.slice, ast.Constant)):
                    sets.add(target.slice.value)
    if "tempeh" not in sets:
        return 'HINT: Add tempeh in its own line:  protein["tempeh"] = 20'
    if "tofu" not in sets:
        return 'HINT: Change tofu in its own line, with the same key:  protein["tofu"] = 15'

    # No typed-in answers in the prints.
    uses_len = False
    for node in ast.walk(tree):
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == "print":
            for arg in ast.walk(node):
                if isinstance(arg, ast.Constant) and type(arg.value) is int:
                    return ("HINT: Do not type the number " + str(arg.value) + " into a print line. "
                            "Look it up:  protein[\"tofu\"]  or count the jars with  len(protein).")
        if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == "len"
                and node.args and isinstance(node.args[0], ast.Name) and node.args[0].id == "protein"):
            uses_len = True
    if not uses_len:
        return "HINT: Count the jars with  len(protein)."

    should = [
        "Foods on the rack: 5",
        "Tofu: 15 g per 100 g",
        "Tempeh: 20 g per 100 g",
        "{'tofu': 15, 'lentils': 9, 'eggs': 13, 'oats': 13, 'tempeh': 20}",
    ]
    if printed == should:
        return ("PASS: Every jar has a label. Ben can find his tempeh by name, "
                "and nobody has to remember position 4 again.")
    for i, line in enumerate(should):
        if i >= len(printed):
            return "HINT: Print 4 lines. You printed " + str(len(printed)) + ". Next one should be:  " + line
        if printed[i] != line:
            return "HINT: Line " + str(i + 1) + " is  " + printed[i] + "\n  It should be  " + line
    return "HINT: Print exactly the 4 lines, and nothing else."


verdict = _check()
print(verdict)
