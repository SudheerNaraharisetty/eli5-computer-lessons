# Lesson 78 exercise: The grocery bag
#
# You are back from the shop. Three jobs, all with unpacking.
#
#   1. Add up the receipt. Each line is (item, grams, price).
#      Loop over receipt and UNPACK each line into three names:
#          for item, grams, price in receipt:
#      Add the grams to total_grams and the prices to total_price.
#      For the receipt below:  2650 grams, 8.20 euros.
#      (The starter does it by position, line[1] and line[2], and gets
#      the price wrong. Unpack instead, so every value has a name.)
#
#   2. Swap the jars. The salt is in the sugar jar and the sugar is in
#      the salt jar. Swap them back in ONE line:  a, b = b, a
#
#   3. Split the recipe steps with a star:
#          first, *middle, last = steps
#      first is the first step, last is the last step, and middle is a
#      list of everything in between.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l78_grocery_bag.py
#
# What happens when you run it, in two steps:
# - STEP 1. It prints what your names hold.
# - STEP 2, THE CHECK. It also tries your lines on a second receipt and a
#   second recipe. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

receipt = [
    ("oats", 500, 2.40),
    ("rice", 1000, 1.90),
    ("tofu", 400, 2.80),
    ("milk", 750, 1.10),
]
sugar_jar = "salt"     # mixed up!
salt_jar = "sugar"
steps = ["rinse the lentils", "chop the onion", "fry the onion", "simmer 20 min", "serve"]

# >>> START: change the lines below this line
total_grams = 0
total_price = 0
for line in receipt:
    total_grams += line[1]
    total_price += line[1]

first = None
middle = None
last = None
# <<< END: change the lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them on the data above, then on a second set of data.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    data_code = "receipt = [" + source.split("\nreceipt = [", 1)[1].split(start, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        hint = ("HINT: Python could not read your lines: " + str(error)
                + "  Check the commas, the colon after the for line and the indents.")
        if "starred" in str(error):
            hint += "  Only one name on the left can have a star."
        return hint

    def run(data):
        ns = dict(data)
        try:
            exec(compile(your_code, "your lines", "exec"), ns)
        except ValueError as error:
            return None, ("HINT: Python stopped with ValueError: " + str(error)
                          + "  Count the names on the left and the values on the right.")
        except Exception as error:
            return None, "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
        return ns, None

    first_data = {}
    exec(data_code, first_data)
    first_data = {k: first_data[k] for k in ["receipt", "sugar_jar", "salt_jar", "steps"]}
    ns, err = run(first_data)
    print("STEP 1: what your names hold")
    print("-" * 60)
    if ns is not None:
        for name in ["total_grams", "total_price", "sugar_jar", "salt_jar", "first", "middle", "last"]:
            print(f"  {name:<12} {ns.get(name)!r}")
    print("-" * 60)
    print("STEP 2, THE CHECK")
    if err:
        return err

    # 1. the receipt, with an unpacking for loop
    loops = [n for n in ast.walk(tree) if isinstance(n, ast.For)]
    unpacked = [n for n in loops if isinstance(n.target, ast.Tuple) and len(n.target.elts) == 3]
    want_g = sum(g for _, g, _ in first_data["receipt"])
    want_p = sum(p for _, _, p in first_data["receipt"])
    if not unpacked:
        if loops and isinstance(loops[0].target, ast.Tuple):
            return ("HINT: Your for loop has the wrong number of names. Each receipt line has 3 values: "
                    "for item, grams, price in receipt:")
        return ("HINT: Part 1. Unpack each receipt line in the for line itself:  "
                "for item, grams, price in receipt:  Then add grams and price.")
    if ns.get("total_grams") != want_g:
        return f"HINT: total_grams is {ns.get('total_grams')!r}. It should be {want_g}. Add grams for every line."
    if not isinstance(ns.get("total_price"), (int, float)) or round(ns["total_price"], 2) != round(want_p, 2):
        if ns.get("total_price") == want_g:
            return "HINT: total_price adds up the grams. Add price instead."
        return f"HINT: total_price is {ns.get('total_price')!r}. It should be {want_p:.2f}. Add price for every line."

    # 2. the swap, in one line
    if ns.get("sugar_jar") != "sugar" or ns.get("salt_jar") != "salt":
        if ns.get("sugar_jar") == ns.get("salt_jar"):
            return ("HINT: Part 1 is right. Both jars now hold " + repr(ns.get("sugar_jar"))
                    + ". A swap in two lines loses a value. Do it in one line: sugar_jar, salt_jar = salt_jar, sugar_jar")
        return "HINT: Part 1 is right. Swap the jars in one line: sugar_jar, salt_jar = salt_jar, sugar_jar"
    swap = [n for n in tree.body if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Tuple)
            and {getattr(e, "id", None) for e in n.targets[0].elts} == {"sugar_jar", "salt_jar"}]
    if not swap:
        return "HINT: The jars are right, but swap them with ONE line that unpacks: sugar_jar, salt_jar = salt_jar, sugar_jar"
    if any(isinstance(n, ast.Constant) and n.value in ("salt", "sugar") for n in ast.walk(tree)):
        return "HINT: Do not type \"salt\" or \"sugar\" yourself. Swap the two names, so it works for any jars."

    # 3. first, *middle, last
    stars = [n for n in ast.walk(tree) if isinstance(n, ast.Starred)]
    want = (first_data["steps"][0], first_data["steps"][1:-1], first_data["steps"][-1])
    got = (ns.get("first"), ns.get("middle"), ns.get("last"))
    if got[0] is None and got[1] is None:
        return "HINT: Parts 1 and 2 are right. Now replace the three None lines with one line: first, *middle, last = steps"
    if not stars:
        return "HINT: Part 3. Use a star, so it works for a recipe of any length: first, *middle, last = steps"
    if got != want:
        return f"HINT: first, middle, last are {got!r}. They should be {want!r}."

    # The same lines on a second receipt and recipe
    second = {
        "receipt": [("lentils", 500, 1.60), ("spinach", 200, 2.10)],
        "sugar_jar": "cinnamon", "salt_jar": "pepper",
        "steps": ["boil water", "add pasta", "drain", "add sauce"],
    }
    ns2, err = run(second)
    if err:
        return err
    if ns2.get("total_grams") != 700 or round(ns2.get("total_price", 0), 2) != 3.70:
        return "HINT: On a second receipt the totals are wrong. Loop over receipt, and add the unpacked grams and price."
    if (ns2.get("sugar_jar"), ns2.get("salt_jar")) != ("pepper", "cinnamon"):
        return "HINT: On other jars your swap does not work. Swap the names: sugar_jar, salt_jar = salt_jar, sugar_jar"
    if (ns2.get("first"), ns2.get("middle"), ns2.get("last")) != ("boil water", ["add pasta", "drain"], "add sauce"):
        return "HINT: On a 4-step recipe, first, middle, last are wrong. Use first, *middle, last = steps"

    return ("PASS: Every value in its own name. The receipt adds up, the jars are back, "
            "and the star took the middle steps. Next: *args and **kwargs.")


verdict = _check()
print(verdict)
