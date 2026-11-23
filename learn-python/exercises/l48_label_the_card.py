# Lesson 48 exercise: Label the cards
#
# Kitchen Coach has three small recipe cards. They work, but none of them
# has a note at the top. In three weeks nobody will remember what goes in,
# or what comes out, or in which unit.
#
# Your job, between START and END:
# Give each card a docstring: a note in triple quotes, as the FIRST line
# inside the card, right under the def line.
#
# - The first line of each note says what the card does and what it hands
#   back, in a short sentence that ends with a full stop.
# - Each note names the UNIT of what the card hands back:
#     protein_in    hands back grams of protein   (say "grams" or "g")
#     water_for     hands back millilitres of water   (say "ml")
#     bake_minutes  hands back minutes in the oven    (say "minutes")
# - You may add more lines to a note, for example one line per jar.
# - Do not change what the cards do. The check calls them too.
#
# Example of a finished card (a different one, so you still write your own):
#
#   def per_slice(total_kcal, slices):
#       """Return the kcal in one slice of a cake."""
#       return total_kcal / slices
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l48_label_the_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your cards are loaded, and the first line of each note is shown.
# - STEP 2, THE CHECK. It reads each note. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

def protein_in(grams, per_100g):
    return grams * per_100g / 100


def water_for(rice_grams):
    return rice_grams * 1.5


def bake_minutes(cake_grams):
    return 20 + cake_grams / 50

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, then
# reads the note on each card and calls each card with a few numbers.
def _check():
    import ast
    import json
    import re
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
                + "\n  Each note needs three quote marks at the start AND three at the end,"
                + " and it is indented like the other lines of the card.")

    runner = (
        "import json, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "report = {}\n"
        "tries = {'protein_in': [(150, 17), (200, 9)], 'water_for': [(200,), (90,)],\n"
        "         'bake_minutes': [(1000,), (500,)]}\n"
        "for name, calls in tries.items():\n"
        "    f = ns.get(name)\n"
        "    if not callable(f):\n"
        "        report[name] = {'missing': True}\n"
        "        continue\n"
        "    backs = []\n"
        "    for args in calls:\n"
        "        try:\n"
        "            backs.append(f(*args))\n"
        "        except Exception as e:\n"
        "            backs.append(type(e).__name__ + ': ' + str(e))\n"
        "    report[name] = {'doc': f.__doc__, 'backs': backs}\n"
        "sys.stderr.write('@@CARDS ' + json.dumps(report) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        return "HINT: Your lines never ended, so they were stopped after 5 seconds. Only the three cards are needed."

    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARDS ")]
    if done.returncode != 0:
        last = (errors or ["an error"])[-1]
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."
    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARDS ")]
    if not found:
        return "HINT: The check could not read your cards. Keep the three def lines as they were."
    report = json.loads(found[0][len("@@CARDS "):])

    print("STEP 1: the first line of each note")
    print("-" * 40)
    for name in ("protein_in", "water_for", "bake_minutes"):
        doc = report.get(name, {}).get("doc")
        first = doc.strip().splitlines()[0] if doc and doc.strip() else None
        print(name + ": " + (first if first else "None (no note)"))
    print("-" * 40)
    print("STEP 2, THE CHECK")

    # Where is each card in your lines, and is there a string that is NOT first?
    cards = {node.name: node for node in tree.body if isinstance(node, ast.FunctionDef)}
    units = {
        "protein_in": (r"\bg\b|gram", '"grams" or "g"', "grams of protein"),
        "water_for": (r"\bml\b|millilit", '"ml"', "millilitres of water"),
        "bake_minutes": (r"minute|\bmin\b", '"minutes"', "minutes in the oven"),
    }
    wants = {
        "protein_in": [25.5, 18.0],
        "water_for": [300.0, 135.0],
        "bake_minutes": [40.0, 30.0],
    }
    for name in ("protein_in", "water_for", "bake_minutes"):
        info = report.get(name, {})
        if info.get("missing"):
            return "HINT: There is no card called " + name + " any more. Keep its def line as it was."
        backs = info["backs"]
        if backs != wants[name]:
            return ("HINT: " + name + " hands back different numbers now. Only add a note. "
                    "Keep its return line exactly as it was.")
        doc = info["doc"]
        if doc is None:
            node = cards.get(name)
            lost = None
            if node:
                for i, stmt in enumerate(node.body):
                    if (i > 0 and isinstance(stmt, ast.Expr) and isinstance(stmt.value, ast.Constant)
                            and isinstance(stmt.value.value, str)):
                        lost = stmt.lineno
            if lost:
                return ("HINT: " + name + " has a string in it, but it is not the FIRST line of the card,"
                        " so Python does not keep it as a note.\n  Move it up, right under  def "
                        + name + "(...):  above every other line.")
            return ("HINT: " + name + " has no note yet. Right under  def " + name + "(...):  add a line like\n"
                    '      """Return the ... ."""\n  indented like the return line.')
        if not doc.strip():
            return "HINT: The note on " + name + " is empty. Write what the card does and hands back."
        if doc[:1] in "\r\n":
            return ("HINT: The note on " + name + " starts on a new line. Start writing right after the "
                    'three opening quote marks:  """Return ...')
        first = doc.strip().splitlines()[0].strip()
        if len(first.split()) < 3:
            return ("HINT: The first line of the note on " + name + " is very short: " + first
                    + "\n  Say what the card does and what it hands back, in a short sentence.")
        if not first.endswith("."):
            return ("HINT: The first line of the note on " + name + " is:  " + first
                    + "\n  End that first line with a full stop.")
        pattern, word, what = units[name]
        if not re.search(pattern, doc, re.IGNORECASE):
            return ("HINT: " + name + " hands back " + what + ", but its note never says the unit."
                    "\n  Add the word " + word + " to the note.")

    return ("PASS: All three cards have a note at the top: what they do, what comes out, and the unit. "
            "In VS Code, point at a card's name to see its note.")


verdict = _check()
print(verdict)
