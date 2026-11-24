# Lesson 71 exercise: Ana's lunchbox
#
# Ana runs 12 km tomorrow morning, so she packs a lunchbox tonight:
#   a banana         105 calories
#   a rice cake       35 calories
#   peanut butter    190 calories
# That is 330 calories in the box.
#
# The class Snack is ready for you below. A snack knows its name and calories.
#
# Write the class Lunchbox. A lunchbox is NOT a snack. A lunchbox HAS snacks.
# So it holds a list of Snack objects as an attribute:
#
#   __init__()          every new lunchbox starts empty: self.snacks = []
#   add(snack)          put one Snack object in the box
#   total_calories()    hand back (return) the calories of all snacks in the box
#
# Write it between START and END. Every method starts with self.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l71_lunchbox.py
#
# What happens when you run it, in two steps:
# - STEP 1. Ana packs her lunchbox with your class, and you see it.
# - STEP 2, THE CHECK. It tries your lunchbox in other ways, with two
#   lunchboxes at once. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your class below this line
class Snack:
    def __init__(self, name, calories):
        self.name = name
        self.calories = calories


class Lunchbox:
    # 1. __init__(self): start with an empty list of snacks.

    # 2. add(self, snack): put the snack in the list.

    # 3. total_calories(self): add up snack.calories for every snack, and return it.
    pass

# <<< END: write your class above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the classes from between
# START and END, packs Ana's lunchbox, then tries it in other ways.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your class between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colons at the end of each def line, and that each method is pushed in by 4 spaces.")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
    Snack, Lunchbox = ns.get("Snack"), ns.get("Lunchbox")
    if not isinstance(Snack, type):
        return "HINT: Keep the class Snack as it is. The check uses it."
    if not isinstance(Lunchbox, type):
        return "HINT: Keep the line  class Lunchbox:  The check looks for that class."
    if issubclass(Lunchbox, Snack):
        return ("HINT: You wrote class Lunchbox(Snack). Say it out loud: is a lunchbox a snack? No. "
                "A lunchbox HAS snacks. Write  class Lunchbox:  and keep the snacks in a list, self.snacks = [].")

    def explain(error, name):
        text = type(error).__name__ + ": " + str(error)
        if isinstance(error, AttributeError) and f"'{name}'" in str(error) and "Lunchbox" in str(error):
            outside = name in ns
            return ("HINT: Python stopped with: " + text + "\n  The lunchbox has no " + name + " method yet. "
                    + ("You wrote def " + name + " outside the class. Push it in by 4 spaces so it belongs to Lunchbox."
                       if outside else "Write  def " + name + "(self" + (", snack" if name == "add" else "") + "):  inside the class."))
        if isinstance(error, AttributeError) and "snacks" in str(error):
            return ("HINT: Python stopped with: " + text + "\n  The box needs its list before anything goes in. "
                    "Write  def __init__(self):  with  self.snacks = []  inside it.")
        if isinstance(error, TypeError) and "positional argument" in str(error) and "were given" in str(error):
            return ("HINT: Python stopped with: " + text + "\n  The lunchbox itself is handed over too, as the first "
                    "value. Put self first in every def, and give add a jar for the snack:  def add(self, snack):")
        if isinstance(error, TypeError) and "unsupported operand" in str(error):
            return ("HINT: Python stopped with: " + text + "\n  The list holds whole Snack objects. Add up "
                    "snack.calories, the number each snack knows, not the snack itself.")
        if isinstance(error, (NameError, UnboundLocalError)):
            return ("HINT: Python stopped with: " + text + "\n  Inside a method, the box's own list is "
                    "self.snacks, with self. in front. Start a running total at 0 before the loop.")
        return "HINT: Python stopped with an error in " + name + ": " + text

    # STEP 1: Ana packs her lunchbox
    print("STEP 1: Ana packs her lunchbox")
    print("-" * 44)
    step = "__init__"
    try:
        box = Lunchbox()
        step = "add"
        for name, cal in [("banana", 105), ("rice cake", 35), ("peanut butter", 190)]:
            box.add(Snack(name, cal))
            print(f"  packed {name}, {cal} calories")
        step = "total_calories"
        got = box.total_calories()
        print("  box.total_calories() gives", repr(got))
    except Exception as error:
        print("-" * 44)
        print("STEP 2, THE CHECK")
        return explain(error, step)
    print("-" * 44)
    print("STEP 2, THE CHECK")

    if got is None:
        return ("HINT: total_calories() gave None. Does it print instead of return? "
                "Hand the number back with  return total  (lesson 45).")
    if got in (105, 35, 190):
        return (f"HINT: total_calories() gave {got}, only one snack. Start  total = 0  before the loop, "
                "add  snack.calories  inside it, and return total after the loop, not inside it.")
    if got == 0:
        return ("HINT: total_calories() gave 0. Did add put the snack in the list?  "
                "self.snacks.append(snack)")
    if got != 330:
        return f"HINT: 105 + 35 + 190 should be 330, but total_calories() gave {got!r}."

    try:
        anas, bens = Lunchbox(), Lunchbox()
        bens.add(Snack("hummus", 160))
        bens.add(Snack("carrots", 25))
        a, b = anas.total_calories(), bens.total_calories()
    except Exception as error:
        return explain(error, "add")
    if (a, b) != (0, 185):
        return (f"HINT: Two lunchboxes at once gave {a!r} and {b!r} instead of 0 and 185. Each box needs its own "
                "list: write  self.snacks = []  inside __init__, not on the class (lesson 69).")

    held = [v for v in vars(box).values() if isinstance(v, list)]
    if not any(len(v) == 3 and all(isinstance(s, Snack) for s in v) for v in held):
        return ("HINT: The total is right, but the box should HOLD the snacks. Keep the whole Snack objects "
                "in a list attribute, self.snacks, and add up their calories in total_calories().")

    return ("PASS: banana 105 + rice cake 35 + peanut butter 190 = 330 calories. A lunchbox is not a snack, "
            "it HAS snacks, and each box keeps its own list. Ana's lunch is packed.")


verdict = _check()
print(verdict)
