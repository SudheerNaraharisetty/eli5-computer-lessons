# Lesson 68 exercise: Ben's kitchen scale
#
# Ben lifts weights and counts his protein, so he weighs his breakfast:
#   80 g of oats, then 150 g of yogurt. That is 230 g on the scale.
#
# The class Scale below already has __init__: every new scale starts at
# 0 grams, kept in self.grams. Give it three METHODS (buttons):
#
#   add(grams)   put more food on the scale: add grams to self.grams
#   total()      hand back (return) the grams on the scale now
#   reset()      empty the scale: back to 0 grams
#
# Write them INSIDE the class, between START and END, pushed in by 4
# spaces like __init__. Every method starts with self:
#   def add(self, grams):
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l68_kitchen_scale.py
#
# What happens when you run it, in two steps:
# - STEP 1. Ben weighs his breakfast with your scale, and you see it.
# - STEP 2, THE CHECK. It tries your scale in other ways, with two scales
#   at once. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your methods below this line
class Scale:
    def __init__(self):
        self.grams = 0

    # 1. add(grams): put more food on the scale.

    # 2. total(): return the grams on the scale now.

    # 3. reset(): back to 0 grams.

# <<< END: write your methods above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the class from between
# START and END, uses it like Ben would, then tries it in other ways.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your methods between them."
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
    Scale = ns.get("Scale")
    if not isinstance(Scale, type):
        return "HINT: Keep the line  class Scale:  The check looks for that class."

    def explain(error, name):
        text = type(error).__name__ + ": " + str(error)
        if isinstance(error, AttributeError) and f"'{name}'" in str(error):
            outside = name in ns
            return ("HINT: Python stopped with: " + text + "\n  The scale has no " + name + " button yet. "
                    + ("You wrote def " + name + " outside the class. Push it in by 4 spaces, "
                       "under __init__, so it belongs to Scale." if outside else
                       "Write  def " + name + "(self" + (", grams" if name == "add" else "") + "):  inside the class."))
        if isinstance(error, TypeError) and "positional argument" in str(error) and "were given" in str(error):
            return ("HINT: Python stopped with: " + text + "\n  The scale itself is handed over too, as the first "
                    "value. Put self first in the def:  def " + name + "(self" + (", grams" if name == "add" else "") + "):")
        if isinstance(error, TypeError) and "missing" in str(error):
            return ("HINT: Python stopped with: " + text + "\n  add needs a jar for the grams after self:  "
                    "def add(self, grams):")
        if isinstance(error, (NameError, UnboundLocalError)):
            return ("HINT: Python stopped with: " + text + "\n  Inside a method, the scale's own grams are "
                    "self.grams, with self. in front.")
        return "HINT: Python stopped with an error in " + name + ": " + text

    # STEP 1: Ben's breakfast
    print("STEP 1: Ben weighs his breakfast")
    print("-" * 44)
    step = "add"
    try:
        scale = Scale()
        scale.add(80)
        print("  added 80 g of oats")
        scale.add(150)
        print("  added 150 g of yogurt")
        step = "total"
        got = scale.total()
        print("  scale.total() gives", repr(got))
    except Exception as error:
        print("-" * 44)
        print("STEP 2, THE CHECK")
        return explain(error, step)
    print("-" * 44)
    print("STEP 2, THE CHECK")

    if got is None:
        if scale.grams == 230:
            return ("HINT: total() gave None. Does it print instead of return? A method hands a value back with  "
                    "return self.grams  (lesson 45).")
        return "HINT: total() gave None. Write  return self.grams  in it."
    if got == 80 or got == 150:
        return (f"HINT: total() gave {got}, so the scale forgot the first food. In add, add to what is "
                "already there:  self.grams = self.grams + grams")
    if got == 0:
        return ("HINT: total() gave 0, so add did not keep the grams on the scale. Write  "
                "self.grams = self.grams + grams  with self. in front.")
    if got != 230:
        return f"HINT: 80 g + 150 g should be 230, but total() gave {got!r}."

    try:
        result = scale.reset()
        after = scale.total()
    except Exception as error:
        return explain(error, "reset")
    if after != 0:
        return f"HINT: After reset(), total() should give 0, but it gave {after!r}. Set  self.grams = 0  in reset."

    try:
        mine, bens = Scale(), Scale()
        mine.add(40)
        bens.add(200)
        bens.add(30)
        a, b = mine.total(), bens.total()
    except Exception as error:
        return explain(error, "add")
    if (a, b) != (40, 230):
        return (f"HINT: Two scales at once gave {a!r} and {b!r} instead of 40 and 230. Keep the grams on "
                "self.grams, so each scale has its own.")

    return ("PASS: 80 g of oats + 150 g of yogurt = 230 g. Three buttons on one scale, each with self first, "
            "and every scale keeps its own grams. Ben's breakfast is weighed.")


verdict = _check()
print(verdict)
