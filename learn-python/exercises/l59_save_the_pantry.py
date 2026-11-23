# Lesson 59 exercise: Save the pantry
#
# Kitchen Coach forgets the pantry every time the program ends. Today you
# give it a memory that lasts until tomorrow: a JSON file called
# pantry.json, next to this file.
#
# Write two recipe cards between START and END:
#
# 1. load_pantry(path)
#    - If the file at path exists, read it with json and hand back the dict.
#    - On the very first day there is no file yet. open() raises
#      FileNotFoundError. Catch it (lesson 53) and hand back a fresh pantry:
#          {"rice": 900, "oats": 400, "lentils": 250}
#
# 2. save_pantry(path, pantry)
#    - Write the pantry dict to the file at path as JSON, indented by 2:
#          json.dump(pantry, f, indent=2)   inside   with open(path, "w") as f:
#      (or path.write_text(json.dumps(pantry, indent=2)) from lesson 58).
#
# The orders at the bottom then load the pantry, use 150 g of rice for
# Ana's risotto, add 500 g of quinoa for Ben, and save it again.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l59_save_the_pantry.py
# - Run it TWICE. The first run starts fresh (rice 900, then 750). The
#   second run loads what the first one saved (rice 750, then 600), and
#   quinoa grows to 1000. Open pantry.json in VS Code to see the file.
#
# What happens when you run it, in two steps:
# - STEP 1. Your cards and the orders run, and you see what they print.
# - STEP 2, THE CHECK. It tries your cards in a separate, temporary
#   folder: the first day with no file, saving, loading it back, and two
#   days in a row. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

import json   # Python's JSON tools. Lesson 60 explains import.


def load_pantry(path):
    """Hand back the pantry saved at path, or a fresh one on the first day."""
    return {"rice": 900, "oats": 400, "lentils": 250}   # always starts over: fix me


def save_pantry(path, pantry):
    """Save the pantry dict at path as JSON, indented by 2."""
    pass   # saves nothing yet: replace this line

# <<< END: write your lines above this line

# ===== THE ORDERS (do not change) =====
from pathlib import Path
PANTRY_FILE = Path(__file__).parent / "pantry.json"

pantry = load_pantry(PANTRY_FILE)
print("Loaded:", pantry)
if pantry["rice"] >= 150:
    pantry["rice"] -= 150                            # risotto for Ana
pantry["quinoa"] = pantry.get("quinoa", 0) + 500     # quinoa for Ben
save_pantry(PANTRY_FILE, pantry)
print("Saved: ", pantry)
# ===== END OF THE ORDERS =====


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END and the orders, runs them in a separate Python with a
# 5 second limit, then tries your cards in a temporary folder (the
# tempfile module makes one that nobody else uses).
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
                + "  Check the colons after def, try, except and with, and the indents under them.")

    runner = (
        "import json, sys, tempfile\n"
        "from pathlib import Path\n"
        "ns = {'__name__': '__main__', '__file__': sys.argv[3]}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'the orders', 'exec'), ns)\n"
        "load, save = ns.get('load_pantry'), ns.get('save_pantry')\n"
        "rep = {'missing': not (callable(load) and callable(save))}\n"
        "def attempt(f, *a):\n"
        "    try:\n"
        "        return f(*a), ''\n"
        "    except Exception as e:\n"
        "        return None, type(e).__name__ + ': ' + str(e)\n"
        "def show(v):\n"
        "    return {'type': type(v).__name__, 'repr': repr(v), 'json': v if isinstance(v, dict) else None}\n"
        "if not rep['missing']:\n"
        "    folder = Path(tempfile.mkdtemp())\n"
        "    p = folder / 'pantry.json'\n"
        "    v, e = attempt(load, p)\n"
        "    rep['first'] = {'err': e, **show(v)}\n"
        "    data = {'rice': 750, 'oats': 400, 'lentils': 250, 'quinoa': 500}\n"
        "    v, e = attempt(save, p, dict(data))\n"
        "    rep['save'] = {'err': e, 'exists': p.exists(), 'text': p.read_text() if p.exists() else None}\n"
        "    v, e = attempt(load, p)\n"
        "    rep['again'] = {'err': e, **show(v)}\n"
        "    p2 = folder / 'days.json'\n"
        "    days = []\n"
        "    for day in range(2):\n"
        "        pan, e = attempt(load, p2)\n"
        "        if e or not isinstance(pan, dict):\n"
        "            days.append({'err': e or 'not a dict'})\n"
        "            break\n"
        "        pan['rice'] -= 150\n"
        "        pan['quinoa'] = pan.get('quinoa', 0) + 500\n"
        "        _, e = attempt(save, p2, pan)\n"
        "        days.append({'err': e, 'text': p2.read_text() if p2.exists() else None})\n"
        "    rep['days'] = days\n"
        "    p3 = folder / 'nested.json'\n"
        "    nested = {'rice': 900, 'notes': {'Ben': ['tofu', 'lentils'], 'Chloe': None}, 'fresh': True}\n"
        "    _, e1 = attempt(save, p3, nested)\n"
        "    v, e2 = attempt(load, p3)\n"
        "    rep['nested'] = {'err': e1 or e2, 'same': v == nested}\n"
        "sys.stderr.write('@@CARD ' + json.dumps(rep) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, your_code, orders, str(pathlib.Path(__file__).resolve())],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? These cards need no loop at all."

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
        if last.startswith("json.decoder.JSONDecodeError") or last.startswith("JSONDecodeError"):
            return ("HINT: pantry.json next to this file is not JSON. An earlier try wrote something else into it.\n"
                    "  Delete pantry.json and run the file again.")
        if last.startswith("FileNotFoundError"):
            return ("HINT: On the first day there is no pantry.json yet, so open() raises FileNotFoundError.\n"
                    "  In load_pantry, put the reading inside try:, and under except FileNotFoundError:\n"
                    "  return {\"rice\": 900, \"oats\": 400, \"lentils\": 250}.")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling. Keep  import json  at the top,"
                    " and the cards' jars are called path and pantry.")
        if last.startswith("TypeError") and ("not subscriptable" in last or "indices must be" in last):
            return ("HINT: Python stopped with: " + last + "\n  load_pantry handed back text, not a dict. "
                    "Use json.load(f), or json.loads(path.read_text()), to turn the text back into a dict.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARD ")]
    if not found:
        return "HINT: The check could not read your cards. Keep  def load_pantry(path):  and  def save_pantry(path, pantry):"
    rep = json.loads(found[0][len("@@CARD "):])
    if rep["missing"]:
        return "HINT: Keep both cards:  def load_pantry(path):  and  def save_pantry(path, pantry):"

    fresh = {"rice": 900, "oats": 400, "lentils": 250}
    data = {"rice": 750, "oats": 400, "lentils": 250, "quinoa": 500}

    first = rep["first"]
    if first["err"].startswith("FileNotFoundError"):
        return ("HINT: load_pantry(path) on the first day, with no file yet, stopped with:\n  " + first["err"]
                + "\n  Catch it: try: ... except FileNotFoundError: return {\"rice\": 900, \"oats\": 400, \"lentils\": 250}")
    if first["err"]:
        return "HINT: load_pantry(path) with no file yet stopped with:\n  " + first["err"]
    if first["json"] != fresh:
        return ("HINT: On the first day, load_pantry(path) handed back " + first["repr"]
                + ".\n  With no file yet it should hand back {\"rice\": 900, \"oats\": 400, \"lentils\": 250}.")

    save = rep["save"]
    if save["err"]:
        return "HINT: save_pantry(path, pantry) stopped with:\n  " + save["err"]
    if not save["exists"]:
        return ("HINT: save_pantry(path, pantry) did not write a file. Open it for writing and dump the dict:\n"
                "  with open(path, \"w\") as f:\n      json.dump(pantry, f, indent=2)")
    text = save["text"]
    try:
        back = json.loads(text)
    except ValueError:
        if "'" in text:
            return ("HINT: save_pantry wrote this, which is not JSON:\n  " + text.strip()[:80]
                    + "\n  Those single quotes come from str(pantry). Use json.dump(pantry, f, indent=2) instead.")
        return "HINT: save_pantry wrote this, which is not JSON:\n  " + text.strip()[:80] + "\n  Use json.dump(pantry, f, indent=2)."
    if back != data:
        return ("HINT: save_pantry was given " + json.dumps(data) + "\n  but the file holds " + json.dumps(back)
                + ". Save the dict you were given, the pantry parameter.")
    if '\n  "rice": 750' not in text:
        return "HINT: The file is JSON, but all on one line. Add indent=2, so a person can read it:  json.dump(pantry, f, indent=2)"

    again = rep["again"]
    if again["err"]:
        return "HINT: load_pantry(path) on a saved file stopped with:\n  " + again["err"]
    if again["type"] == "str":
        return ("HINT: load_pantry handed back the text of the file, not a dict:\n  " + again["repr"][:80]
                + "\n  Use json.load(f), or json.loads(path.read_text()).")
    if again["json"] == fresh:
        return ("HINT: After save_pantry wrote rice 750 and quinoa 500, load_pantry still handed back the fresh pantry.\n"
                "  It should read the file when it exists: with open(path) as f: return json.load(f)")
    if again["json"] != data:
        return ("HINT: The file holds " + json.dumps(data) + "\n  but load_pantry handed back " + again["repr"]
                + ". Hand back exactly what json.load gives you.")

    days = rep["days"]
    if len(days) < 2 or any(d["err"] for d in days):
        bad = next((d["err"] for d in days if d["err"]), "a problem")
        return "HINT: Two days in a row (load, change, save, then again) stopped with:\n  " + bad
    want = {"rice": 600, "oats": 400, "lentils": 250, "quinoa": 1000}
    if json.loads(days[1]["text"]) != want:
        return ("HINT: After two days the file should hold " + json.dumps(want) + "\n  but it holds "
                + days[1]["text"].strip()[:120] + ". Does the second day load what the first day saved?")

    nested = rep["nested"]
    if nested["err"] or not nested["same"]:
        return ("HINT: A pantry with a dict and a list inside it did not come back the same.\n  "
                + (nested["err"] or "Use json.dump and json.load, with no changes of your own."))

    return ("PASS: Kitchen Coach remembers the pantry. The first day starts fresh, json.dump saves it with indent=2, "
            "and json.load brings it back with real numbers, day after day.")


verdict = _check()
print(verdict)
