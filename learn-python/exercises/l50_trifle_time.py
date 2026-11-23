# Lesson 50 exercise: Trifle time
#
# Chloe's trifle is made of other recipes, and some of those are made of
# recipes too. Kitchen Coach keeps them in a dict, under KITCHEN DATA below.
# Each recipe has its own minutes, and a list of the recipes it "uses".
# Do not change the data.
#
#   trifle     15 min, uses custard, sponge and berry jam
#   custard    20 min, uses nothing
#   sponge     25 min, uses flour mix
#   flour mix   5 min, uses nothing
#   berry jam  25 min, uses nothing
#
# The starter card total_minutes(name) only counts the recipe's OWN minutes.
# So the sponge shows 25 minutes, and the flour mix it needs is forgotten.
#
# Your job, between START and END. Make the card call itself:
# 1. Base case first: if the recipe uses nothing, return its own minutes.
# 2. Otherwise start with its own minutes, then for each name in its
#    "uses" list, add total_minutes(that name). Return the total.
# Keep the name and the one parameter:  def total_minutes(name):
#
# With the card right, it prints EXACTLY these 3 lines:
#
#   custard: 20 minutes
#   sponge: 30 minutes
#   trifle: 90 minutes
#
# The check also tries your card on OTHER recipe trees, some of them deeper,
# so typing the numbers in will not pass.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l50_trifle_time.py
#
# What happens when you run it, in two steps:
# - STEP 1. The kitchen data and your lines run, and you see what they print.
# - STEP 2, THE CHECK. It tries your card on other recipe trees too.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN DATA (do not change) =====
recipes = {
    "trifle": {"minutes": 15, "uses": ["custard", "sponge", "berry jam"]},
    "custard": {"minutes": 20, "uses": []},
    "sponge": {"minutes": 25, "uses": ["flour mix"]},
    "flour mix": {"minutes": 5, "uses": []},
    "berry jam": {"minutes": 25, "uses": []},
}
# ===== END OF KITCHEN DATA =====

# >>> START: write your lines below this line

def total_minutes(name):
    recipe = recipes[name]
    return recipe["minutes"]

for name in ["custard", "sponge", "trifle"]:
    print(f"{name}: {total_minutes(name)} minutes")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the kitchen data and your
# lines from between START and END, runs them in a separate Python with a
# 5 second limit, then tries your card on other recipe trees.
def _check():
    import ast
    import json
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    data_start, data_end = "# ===== KITCHEN DATA", "# ===== END OF KITCHEN DATA"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    if data_start not in source or data_end not in source:
        return "HINT: Keep the kitchen data as it was. Get a fresh copy of the file if you changed it."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    data = source.split(data_start, 1)[1].split("\n", 1)[1].split(data_end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colons after def, if and for, and that the card's lines are indented.")

    # Other recipe trees. The check works out the right answers itself.
    trees = [
        {   # Ben's lentil lasagne: 3 recipes inside, two of them use one more
            "lasagne": {"minutes": 20, "uses": ["lentil ragu", "white sauce", "pasta sheets"]},
            "lentil ragu": {"minutes": 40, "uses": ["soffritto"]},
            "soffritto": {"minutes": 10, "uses": []},
            "white sauce": {"minutes": 15, "uses": ["roux"]},
            "roux": {"minutes": 5, "uses": []},
            "pasta sheets": {"minutes": 25, "uses": []},
        },
        {   # a deep chain: each recipe uses the next one
            "cake": {"minutes": 1, "uses": ["icing"]},
            "icing": {"minutes": 2, "uses": ["syrup"]},
            "syrup": {"minutes": 3, "uses": ["zest"]},
            "zest": {"minutes": 4, "uses": ["lemon"]},
            "lemon": {"minutes": 5, "uses": []},
        },
        {   # a recipe that uses nothing at all
            "toast": {"minutes": 4, "uses": []},
        },
    ]

    def right(book, name):
        return book[name]["minutes"] + sum(right(book, sub) for sub in book[name]["uses"])

    asks = [(i, name) for i, book in enumerate(trees) for name in book]
    runner = (
        "import io, json, contextlib, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'the kitchen data', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'your lines', 'exec'), ns)\n"
        "f = ns.get('total_minutes')\n"
        "trees = json.loads(sys.argv[3])\n"
        "report = {'missing': not callable(f), 'tries': []}\n"
        "for i, name in json.loads(sys.argv[4]):\n"
        "    if not callable(f):\n"
        "        break\n"
        "    ns['recipes'] = trees[i]\n"
        "    shown = io.StringIO()\n"
        "    try:\n"
        "        with contextlib.redirect_stdout(shown):\n"
        "            back = f(name)\n"
        "        got = back if isinstance(back, int) and not isinstance(back, bool) else repr(back)\n"
        "        err = ''\n"
        "    except BaseException as e:\n"
        "        got, err = None, type(e).__name__ + ': ' + str(e)\n"
        "    report['tries'].append({'tree': i, 'name': name, 'back': got, 'err': err})\n"
        "sys.stderr.write('@@CARD ' + json.dumps(report) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, data, your_code,
                               json.dumps(trees), json.dumps(asks)],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? One for loop over recipe[\"uses\"] is all you need."

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
        if last.startswith("RecursionError"):
            return ("HINT: Python stopped with: " + last + "\n  The card calls itself forever. "
                    "Does it call total_minutes(sub) with each name from the uses list, not with name itself?\n"
                    "  And is the base case first:  if recipe[\"uses\"] == []:  return recipe[\"minutes\"]")
        if last.startswith("KeyError"):
            return ("HINT: Python stopped with: " + last + "\n  Look up recipes with the names from the "
                    "data, like recipes[name] and recipe[\"uses\"]. Spelling counts.")
        if "NoneType" in last:
            return ("HINT: Python stopped with: " + last + "\n  The card hands back None somewhere. "
                    "Every way through the card must end with return.")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling of every name. "
                    "The card is total_minutes, and the data is recipes.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    if not found:
        return "HINT: The check could not read your card. Keep it as  def total_minutes(name):"
    report = json.loads(found[0][len("@@CARD "):])
    if report["missing"]:
        return "HINT: There is no card called total_minutes. Write it with  def total_minutes(name):"

    should = ["custard: 20 minutes", "sponge: 30 minutes", "trifle: 90 minutes"]
    if printed[:3] == ["custard: 20 minutes", "sponge: 25 minutes", "trifle: 15 minutes"]:
        return ("HINT: sponge: 25 minutes. The card only counts the recipe's own minutes, so the "
                "5 minutes of flour mix are missing.\n  For each name in recipe[\"uses\"], add "
                "total_minutes(that name) to the total. The card calls itself.")

    for t in report["tries"]:
        call = "total_minutes(\"" + t["name"] + "\")"
        want = right(trees[t["tree"]], t["name"])
        if t["err"]:
            if t["err"].startswith("RecursionError"):
                return ("HINT: On another recipe tree, " + call + " never stopped: " + t["err"]
                        + "\n  Each call must move toward the base case: call total_minutes(sub), never total_minutes(name).")
            if t["err"].startswith("KeyError"):
                return ("HINT: On another recipe tree, " + call + " stopped with " + t["err"]
                        + ".\n  Do not type recipe names into the card. Use the names in recipe[\"uses\"].")
            return "HINT: On another recipe tree, " + call + " stopped with: " + t["err"]
        if t["back"] == "None":
            return ("HINT: On another recipe tree, " + call + " handed back None. "
                    "Did you forget  return total  at the end of the card?")
        if not isinstance(t["back"], int):
            return "HINT: " + call + " handed back " + str(t["back"]) + ". It should hand back a whole number of minutes."
        if t["back"] != want:
            return ("HINT: On another recipe tree, " + call + " handed back " + str(t["back"])
                    + ", but it should be " + str(want) + ".\n  Some recipes there are nested deeper. "
                    "Let the card call itself for every name in recipe[\"uses\"], so it works at any depth.")

    calls_itself = any(
        isinstance(node, ast.FunctionDef) and node.name == "total_minutes" and any(
            isinstance(inner, ast.Call) and isinstance(inner.func, ast.Name) and inner.func.id == "total_minutes"
            for inner in ast.walk(node))
        for node in ast.walk(tree))
    if not calls_itself:
        return ("HINT: The numbers are right, but the card never calls itself. This lesson is about "
                "recursion:\n  inside total_minutes, add total_minutes(sub) for each sub in recipe[\"uses\"].")

    if printed == should:
        return ("PASS: The card calls itself for every recipe inside, stops at recipes that use "
                "nothing, and works on any tree. A recipe can use itself, if it knows when to stop.")
    for i, line in enumerate(should):
        if i >= len(printed):
            return "HINT: Print 3 lines. You printed " + str(len(printed)) + ". The next one should be:  " + line
        if printed[i] != line:
            return "HINT: Line " + str(i + 1) + " is  " + printed[i] + "\n  It should be  " + line
    return "HINT: Print exactly the 3 lines, and nothing else."


verdict = _check()
print(verdict)
