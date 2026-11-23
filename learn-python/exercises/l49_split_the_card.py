# Lesson 49 exercise: Split the card
#
# Sunday dinner at your place. Kitchen Coach has ONE long card, plan_dinner,
# that does four jobs at once: it picks the safe foods for each guest, adds
# up the protein, adds up the calories, and prints the menu. It works, but
# nothing inside it can be used or checked on its own.
#
# Your job, between START and END:
# 1. Fill in the three small cards. Each one has its name and its docstring
#    already. Replace the line marked  # TODO  with the real steps:
#      pick_safe(foods, avoid)  hands back a NEW list of the foods whose
#                               HAS entry is not in the avoid set
#      count_protein(foods)     hands back the grams of protein in the foods
#      count_kcal(foods)        hands back the kcal in the foods
#    Each card works on the foods it is GIVEN (not on MENU), RETURNS its
#    answer and prints nothing.
# 2. format_menu is already done. Leave it as it is.
# 3. Rewrite plan_dinner so its loop body is just calls to the small cards:
#    pick_safe, count_protein, count_kcal and format_menu. Keep the one
#    print in plan_dinner.
#
# Run it before you start: it prints the menu (the long card works), and
# the check tells you the first small card to fill in.
#
# When everything is right, it prints EXACTLY these 3 lines:
#
#   Ana: soup, bread, tofu, rice, fish, cake (68 g protein, 1350 kcal)
#   Ben: soup, bread, tofu, rice, cake (43 g protein, 1140 kcal)
#   Chloe: soup, tofu, rice, fish (55 g protein, 740 kcal)
#
# The check also calls each small card with OTHER foods, so each card must
# work for any list you give it. Check your own cards too, with a tiny
# example you can add up in your head, for example:
#   print(count_protein(["tofu", "fish"]))    # want 45
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l49_split_the_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. The kitchen data and your lines run, and you see what they print.
# - STEP 2, THE CHECK. It calls each small card with other foods, then looks
#   at plan_dinner. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== KITCHEN DATA (do not change) =====
MENU = ["soup", "bread", "tofu", "rice", "fish", "cake"]
PROTEIN = {"soup": 5, "bread": 9, "tofu": 20, "rice": 5, "fish": 25, "cake": 4}
KCAL = {"soup": 120, "bread": 260, "tofu": 180, "rice": 230, "fish": 210, "cake": 350}
HAS = {"bread": "gluten", "fish": "fish", "cake": "gluten"}
GUESTS = {"Ana": set(), "Ben": {"fish"}, "Chloe": {"gluten"}}
# ===== END OF KITCHEN DATA =====

# >>> START: write your lines below this line

def pick_safe(foods, avoid):
    """Return the foods with nothing from the avoid set."""
    return []  # TODO: replace this line with the real steps


def count_protein(foods):
    """Return the grams of protein in these foods."""
    return 0  # TODO: replace this line with the real steps


def count_kcal(foods):
    """Return the kcal in these foods."""
    return 0  # TODO: replace this line with the real steps


def format_menu(name, foods, protein, kcal):
    """Return one guest's menu as one line of text. Already done."""
    dishes = ", ".join(foods)
    return f"{name}: {dishes} ({protein} g protein, {kcal} kcal)"


def plan_dinner(guests):
    """Print Sunday dinner for every guest."""
    for name, avoid in guests.items():
        safe = []
        for food in MENU:
            if HAS.get(food) not in avoid:
                safe.append(food)
        protein = 0
        kcal = 0
        for food in safe:
            protein += PROTEIN[food]
            kcal += KCAL[food]
        foods = ", ".join(safe)
        print(f"{name}: {foods} ({protein} g protein, {kcal} kcal)")


plan_dinner(GUESTS)

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the kitchen data and your
# lines from between START and END, runs them in a separate Python with a
# 5 second limit, calls each small card with other foods, and then reads
# plan_dinner to see which cards it calls.
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
                + "\n  Check the colons after def, for and if, and that each card's lines are indented.")

    # Runs the data and your lines, then tries each small card with other foods.
    # What a card prints during those tries is caught, so we can tell print from return.
    runner = (
        "import io, json, contextlib, sys\n"
        "ns = {'__name__': '__main__'}\n"
        "exec(compile(sys.argv[1], 'the kitchen data', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'your lines', 'exec'), ns)\n"
        "tries = [\n"
        "    ('pick_safe', (['cake', 'soup', 'fish'], {'gluten'})),\n"
        "    ('pick_safe', (['bread', 'tofu'], set())),\n"
        "    ('pick_safe', (['soup', 'bread', 'tofu', 'rice', 'fish', 'cake'], {'gluten', 'fish'})),\n"
        "    ('count_protein', (['tofu', 'fish'],)),\n"
        "    ('count_protein', (['rice'],)),\n"
        "    ('count_protein', ([],)),\n"
        "    ('count_kcal', (['soup', 'cake'],)),\n"
        "    ('count_kcal', (['tofu'],)),\n"
        "    ('count_kcal', ([],)),\n"
        "    ('plan_dinner', ({'Ben': {'fish', 'gluten'}},)),\n"
        "]\n"
        "report = []\n"
        "for name, args in tries:\n"
        "    f = ns.get(name)\n"
        "    if not callable(f):\n"
        "        report.append({'name': name, 'missing': True})\n"
        "        continue\n"
        "    given = json.dumps(args, default=sorted)\n"
        "    shown = io.StringIO()\n"
        "    try:\n"
        "        with contextlib.redirect_stdout(shown):\n"
        "            back = f(*args)\n"
        "        err = ''\n"
        "    except Exception as e:\n"
        "        back, err = None, type(e).__name__ + ': ' + str(e)\n"
        "    if isinstance(back, (list, int)) and not isinstance(back, bool):\n"
        "        got = back\n"
        "    else:\n"
        "        got = 'REPR ' + repr(back)\n"
        "    report.append({'name': name, 'args': given, 'back': got, 'shown': shown.getvalue(),\n"
        "                   'err': err, 'changed': json.dumps(args, default=sorted) != given})\n"
        "sys.stderr.write('@@CARDS ' + json.dumps(report) + '\\n')\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", runner, data, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        print("STEP 1: your lines never ended, so they were stopped after 5 seconds.")
        return "HINT: Is there a loop that never ends? Each card needs only one for loop over foods."

    printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
    print("STEP 1: what your lines print")
    print("-" * 40)
    print("\n".join(printed) if printed else "(nothing yet)")
    errors = [line for line in done.stderr.splitlines() if not line.startswith("@@CARDS ")]
    last = (errors or ["an error"])[-1]
    if done.returncode != 0:
        print(last)
    print("-" * 40)
    print("STEP 2, THE CHECK")

    if done.returncode != 0:
        if "NoneType" in last:
            return ("HINT: Python stopped with: " + last + "\n  One of your cards hands back None. "
                    "Does each small card end with a return line?")
        if last.startswith("KeyError"):
            return ("HINT: Python stopped with: " + last + "\n  Look foods up with  PROTEIN[food]  or  "
                    "KCAL[food], and keep the kitchen data as it was.")
        if last.startswith("NameError"):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling of the name. "
                    "The small cards must be written above the plan_dinner(GUESTS) line.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    found = [line for line in done.stderr.splitlines() if line.startswith("@@CARDS ")]
    if not found:
        return "HINT: The check could not read your cards. Keep the def lines as they were."
    report = json.loads(found[0][len("@@CARDS "):])

    wants = {
        ("pick_safe", 0): ["soup", "fish"],
        ("pick_safe", 1): ["bread", "tofu"],
        ("pick_safe", 2): ["soup", "tofu", "rice"],
        ("count_protein", 0): 45,
        ("count_protein", 1): 5,
        ("count_protein", 2): 0,
        ("count_kcal", 0): 470,
        ("count_kcal", 1): 180,
        ("count_kcal", 2): 0,
    }
    calls = {
        ("pick_safe", 0): "pick_safe([\"cake\", \"soup\", \"fish\"], {\"gluten\"})",
        ("pick_safe", 1): "pick_safe([\"bread\", \"tofu\"], set())",
        ("pick_safe", 2): "pick_safe(MENU, {\"gluten\", \"fish\"})",
        ("count_protein", 0): "count_protein([\"tofu\", \"fish\"])",
        ("count_protein", 1): "count_protein([\"rice\"])",
        ("count_protein", 2): "count_protein([])",
        ("count_kcal", 0): "count_kcal([\"soup\", \"cake\"])",
        ("count_kcal", 1): "count_kcal([\"tofu\"])",
        ("count_kcal", 2): "count_kcal([])",
    }
    seen = {}
    for t in report:
        name = t["name"]
        if t.get("missing"):
            return "HINT: There is no card called " + name + " any more. Keep its def line as it was."
        if name == "plan_dinner":
            continue
        i = seen.get(name, 0)
        seen[name] = i + 1
        call, want = calls[(name, i)], wants[(name, i)]
        if t["err"]:
            return "HINT: " + call + " stopped with: " + t["err"]
        back = t["back"]
        if back == "REPR None":
            if t["shown"].strip():
                return ("HINT: " + call + " printed " + t["shown"].strip().replace("\n", " ")
                        + " but handed back None. Use return, not print, on a small card.")
            return "HINT: " + call + " handed back None. Did you forget the return line at the end of the card?"
        if isinstance(back, str):
            back = back[5:]
        if back != want:
            hint = "HINT: " + call + " handed back " + str(back) + ", but it should be " + str(want) + "."
            if name == "pick_safe" and want and back == []:
                hint += ("\n  pick_safe still has its TODO line. Start with  safe = [], loop over foods, "
                         "append each food whose  HAS.get(food)  is not in avoid, then  return safe")
            elif name == "pick_safe":
                hint += ("\n  Loop over the foods the card is GIVEN (the foods jar, not MENU), and keep each "
                         "food whose  HAS.get(food) not in avoid.")
            elif back == 0:
                hint += ("\n  " + name + " still has its TODO line. Start a total at 0, add each food's "
                         "number in a loop over foods, then return the total.")
            elif isinstance(back, int) and i == 0:
                hint += ("\n  Is it only the LAST food's number? Then  total = ...  should be  total += ...")
            else:
                hint += "\n  Loop over the foods the card is GIVEN, and look each one up in the right dict."
            return hint
        if t["changed"]:
            return ("HINT: " + call + " gives the right answer, but it changed the list it was given. "
                    "Build a new list instead.")
        if t["shown"].strip():
            return ("HINT: " + call + " returns the right answer, but it also prints "
                    + t["shown"].strip().replace("\n", " ") + ". A small card only returns.")

    # Now plan_dinner: does it call the small cards, and is it short?
    cards = {node.name: node for node in tree.body if isinstance(node, ast.FunctionDef)}
    plan = cards.get("plan_dinner")
    if plan is None:
        return "HINT: There is no card called plan_dinner any more. Keep its def line as it was."
    used = {n.func.id for n in ast.walk(plan) if isinstance(n, ast.Call) and isinstance(n.func, ast.Name)}
    for helper in ("pick_safe", "count_protein", "count_kcal", "format_menu"):
        if helper not in used:
            return ("HINT: The small cards work. Now rewrite plan_dinner: it does not call " + helper
                    + " yet.\n  Inside the guest loop, call the four small cards one after another,"
                    " then print what format_menu hands back.")
    loops = [n for n in ast.walk(plan) if isinstance(n, (ast.For, ast.While))]
    if len(loops) > 1:
        return ("HINT: plan_dinner calls the small cards, but it still has a loop inside its loop.\n"
                "  Delete the old steps: the small cards do that work now. Keep only the guest loop.")

    should = [
        "Ana: soup, bread, tofu, rice, fish, cake (68 g protein, 1350 kcal)",
        "Ben: soup, bread, tofu, rice, cake (43 g protein, 1140 kcal)",
        "Chloe: soup, tofu, rice, fish (55 g protein, 740 kcal)",
    ]
    plan_try = [t for t in report if t["name"] == "plan_dinner"][0]
    if plan_try["err"]:
        return "HINT: plan_dinner({\"Ben\": {\"fish\", \"gluten\"}}) stopped with: " + plan_try["err"]
    if plan_try["shown"].strip() != "Ben: soup, tofu, rice (30 g protein, 530 kcal)":
        return ("HINT: The check called plan_dinner({\"Ben\": {\"fish\", \"gluten\"}}). It printed:\n  "
                + (plan_try["shown"].strip() or "(nothing)")
                + "\n  It should print:  Ben: soup, tofu, rice (30 g protein, 530 kcal)"
                + "\n  Pass each guest's own avoid set to pick_safe, and print what format_menu hands back.")
    for i, line in enumerate(should):
        if i >= len(printed):
            return "HINT: Print 3 lines. You printed " + str(len(printed)) + ". The next one should be:  " + line
        if printed[i] != line:
            return "HINT: Line " + str(i + 1) + " is  " + printed[i] + "\n  It should be  " + line
    if len(printed) > len(should):
        return ("HINT: Your lines print " + str(len(printed)) + " lines. Keep only the 3 menu lines. "
                "Remove your own check prints when you are done.")
    return ("PASS: One card, one job. plan_dinner now reads like the recipe: pick the safe foods, "
            "count the protein, count the kcal, format the menu. And each small card can be "
            "checked on its own.")


verdict = _check()
print(verdict)
