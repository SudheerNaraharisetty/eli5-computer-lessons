# Lesson 97 exercise: Two labels on one jar
#
# Kitchen Coach has three small functions. Each one gives back the right
# answer. But each one also CHANGES data that belongs to the caller, so
# Ana, Ben and Chloe keep finding things on their lists they never asked for.
#
# Fix all three, so no call changes a list by accident:
#   1. add_snack(plan, snack) should hand back a NEW list: the plan with the
#      snack at the end. The plan you were handed must stay as it was.
#      (Hint: plan + [snack] makes a new list.)
#   2. plan_next_week(this_week) copies Chloe's week (a list of day lists)
#      and puts "buckwheat pancakes" first on next Monday. This week must
#      stay as it was. .copy() only copies the outer list (a shallow copy).
#      Use copy.deepcopy() instead. The line  import copy  is already there.
#   3. start_basket(item, basket=[]) hands back a basket with the item in it.
#      The default list is made ONCE and shared by every call (lesson 46).
#      Use basket=None, and make a fresh list inside when basket is None.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l97_two_labels.py
#
# The check at the bottom calls your functions with its own lists, then
# checks two things: the answers are right, and the lists it handed in
# are unchanged. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

import copy


def add_snack(plan, snack):
    """Hand back a new list: plan with snack at the end."""
    plan.append(snack)
    return plan


def plan_next_week(this_week):
    """Hand back next week's plan, with buckwheat pancakes first on Monday."""
    next_week = this_week.copy()
    next_week[0][0] = "buckwheat pancakes"
    return next_week


def start_basket(item, basket=[]):
    """Hand back a basket with item added."""
    basket.append(item)
    return basket

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, then calls your three functions with lists of its own.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets, the colons and the indentation.")

    ns = {"__name__": "l97"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return ("HINT: Your lines stopped with " + type(error).__name__ + ": " + str(error)
                + "  Read it from the bottom up (lesson 4).")
    for name in ["add_snack", "plan_next_week", "start_basket"]:
        if not callable(ns.get(name)):
            return f"HINT: Keep the function {name}. The check calls it."

    def call(name, *args):
        try:
            return True, ns[name](*args)
        except Exception as error:
            return False, f"{name} stopped with {type(error).__name__}: {error}"

    # 1. add_snack
    chloe = ["rice porridge", "bean salad"]
    ok, treat = call("add_snack", chloe, "rice pudding")
    if not ok:
        return "HINT: " + treat
    print(f"1. add_snack:      chloe = {chloe}")
    print(f"                   treat = {treat}")
    if chloe != ["rice porridge", "bean salad"]:
        return ("HINT 1: add_snack changed the caller's list: chloe is now " + repr(chloe) + ". "
                ".append() changes the list it was handed. Build a new one instead:  return plan + [snack]")
    if treat != ["rice porridge", "bean salad", "rice pudding"]:
        return ("HINT 1: add_snack should hand back the plan with the snack at the end: "
                "['rice porridge', 'bean salad', 'rice pudding']. It gave " + repr(treat) + ".")
    if treat is chloe:
        return "HINT 1: add_snack handed back the SAME list it was given. Hand back a new list."

    # 2. plan_next_week
    this_week = [["rice porridge", "bean salad"], ["omelette", "lentil soup"]]
    ok, next_week = call("plan_next_week", this_week)
    if not ok:
        return "HINT: " + next_week
    print(f"2. plan_next_week: this Monday = {this_week[0]}")
    print(f"                   next Monday = {next_week[0] if isinstance(next_week, list) and next_week else next_week}")
    if this_week[0][0] != "rice porridge":
        return ("HINT 2: This Monday changed too: " + repr(this_week[0]) + ". .copy() makes a new outer "
                "list, but the day lists inside are still shared (a shallow copy). "
                "Use  next_week = copy.deepcopy(this_week)")
    if this_week != [["rice porridge", "bean salad"], ["omelette", "lentil soup"]]:
        return "HINT 2: plan_next_week changed this week's plan. Change only the copy."
    if next_week != [["buckwheat pancakes", "bean salad"], ["omelette", "lentil soup"]]:
        return ("HINT 2: Next week should be this week with 'buckwheat pancakes' first on Monday. It is "
                + repr(next_week) + ".")
    if next_week is this_week or any(a is b for a, b in zip(next_week, this_week)):
        return "HINT 2: Next week still shares a list with this week. Copy every level with copy.deepcopy()."

    # 3. start_basket
    ok, ana = call("start_basket", "bananas")
    if not ok:
        return "HINT: " + ana
    ok, ben = call("start_basket", "tofu")
    if not ok:
        return "HINT: " + ben
    print(f"3. start_basket:   ana = {ana}")
    print(f"                   ben = {ben}")
    if ben is ana or ben != ["tofu"]:
        return ("HINT 3: Ben's basket is " + repr(ben) + ". Both calls got the same default list, made once "
                "when def ran. Write  basket=None  and inside:  if basket is None:  then  basket = []")
    if ana != ["bananas"]:
        return "HINT 3: Ana's basket should be ['bananas']. It is " + repr(ana) + "."
    mine = ["oats"]
    ok, given = call("start_basket", "salt", mine)
    if not ok:
        return "HINT: " + given
    if given != ["oats", "salt"]:
        return ("HINT 3: When the caller passes a basket, put the item in it. start_basket('salt', ['oats']) "
                "should give ['oats', 'salt']. It gave " + repr(given) + ".")

    return ("PASS: Nothing changes by accident now. add_snack builds a new list, deepcopy gives next week "
            "its own day lists, and every basket starts fresh. One jar, one label, unless you mean it.")


verdict = _check()
print(verdict)
