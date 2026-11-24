# Lesson 74 exercise: A smart jar
#
# Kitchen Coach keeps Chloe's rice flour in a jar. The jar holds 1000 g
# and has 650 g in it. Kitchen Coach wants the jar's label to be ALWAYS
# right, and it never wants a silly number in the jar.
#
# Your job, in three parts:
#   1. Guard the grams. Keep the number in  self._grams  (with an
#      underscore). Add a property  grams  that hands back self._grams,
#      and a setter  @grams.setter  that raises a ValueError when the new
#      value is below 0 or more than self.capacity. Otherwise it keeps it
#      in self._grams.
#   2. Add a property  grams_left : the capacity minus the grams in the jar.
#      For the flour jar that is 350.
#   3. Add a property  percent_full : the grams divided by the capacity,
#      times 100. For the flour jar that is 65.0.
#
# Keep  self.grams = grams  in __init__ (no underscore there), so a new
# jar goes through your guard too.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l74_smart_jar.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your flour jar is printed.
# - STEP 2, THE CHECK. It also fills and empties some jars of its own.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

class Jar:
    def __init__(self, item, capacity, grams):
        self.item = item
        self.capacity = capacity
        self.grams = grams          # keep this line: it will use your setter

    # 1. the grams property and its setter go here

    # 2. grams_left goes here

    # 3. percent_full goes here


# Leave this line as it is.
flour = Jar("rice flour", 1000, 650)

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, prints your jar, then tries your class with new jars.
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

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        last = type(error).__name__ + ": " + str(error)
        print("STEP 1: your lines stopped with an error:")
        print("  " + last)
        print("STEP 2, THE CHECK")
        if isinstance(error, RecursionError):
            return ("HINT: Python stopped with: " + last + "\n  Inside the setter, keep the number in "
                    "self._grams (with the underscore). self.grams = value there calls the setter again and again.")
        if isinstance(error, ValueError):
            return ("HINT: Python stopped with: " + last + "\n  The flour jar has 650 g in a 1000 g jar. "
                    "That is fine. Raise only when value < 0 or value > self.capacity.")
        if isinstance(error, AttributeError) and "_grams" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  The setter must keep the number: "
                    "self._grams = value  as its last line.")
        if isinstance(error, AttributeError) and "capacity" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  Keep the order in __init__: "
                    "self.capacity = capacity  comes before  self.grams = grams.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    Jar = ns.get("Jar")
    flour = ns.get("flour")
    print("STEP 1: your flour jar")
    print("-" * 50)
    for name in ["grams", "grams_left", "percent_full"]:
        try:
            value = repr(getattr(flour, name))
        except Exception as error:
            value = "(" + type(error).__name__ + ": " + str(error) + ")"
        print(f"  flour.{name:<13} = {value}")
    print("-" * 50)
    print("STEP 2, THE CHECK")

    if not isinstance(Jar, type):
        return "HINT: Keep the line  class Jar:  The check looks for that class."
    if not isinstance(flour, Jar):
        return "HINT: Keep the line  flour = Jar(\"rice flour\", 1000, 650)."
    parts = vars(Jar)

    # Part 1: grams is a guarded property.
    if not isinstance(parts.get("grams"), property):
        return ("HINT: Part 1. grams is still a plain attribute. Add a getter:  @property  then  "
                "def grams(self):  that returns self._grams.")
    if parts["grams"].fset is None:
        return ("HINT: grams has a getter but no setter yet, so __init__ cannot set it. Add  "
                "@grams.setter  and  def grams(self, value):  that keeps the value in self._grams.")
    if "_grams" not in vars(flour):
        return "HINT: Keep the number in  self._grams  (with an underscore) inside the setter."
    if flour.grams != 650:
        return f"HINT: flour.grams should be 650, not {flour.grams!r}. Does the getter return self._grams?"
    jar = Jar("oats", 1000, 400)
    for bad in [-5, 1200]:
        try:
            jar.grams = bad
        except ValueError:
            continue
        except Exception as error:
            return (f"HINT: jar.grams = {bad} stopped with {type(error).__name__}. "
                    "Raise a ValueError, like lesson 54:  raise ValueError(f\"...\")")
        return (f"HINT: jar.grams = {bad} was let in. In the setter: if value < 0 or value > self.capacity, "
                "raise a ValueError.")
    if jar.grams != 400:
        return "HINT: After a ValueError the jar should still hold 400 g. Raise BEFORE you keep the value."
    for good in [0, 1000]:
        try:
            jar.grams = good
        except Exception:
            return (f"HINT: jar.grams = {good} should be fine: an empty jar and a full jar are both OK. "
                    "Only stop values below 0 or above the capacity.")
    try:
        Jar("sugar", 500, 600)
        return ("HINT: Jar(\"sugar\", 500, 600) was let in. Keep  self.grams = grams  in __init__ "
                "(no underscore) so a new jar goes through the setter too.")
    except ValueError:
        pass

    # Part 2: grams_left.
    if not isinstance(parts.get("grams_left"), property):
        return ("HINT: Part 1 works! Now part 2. Add  @property  and  def grams_left(self):  that "
                "returns self.capacity - self.grams.")
    if flour.grams_left != 350:
        return f"HINT: flour.grams_left should be 350, not {flour.grams_left!r}. Capacity minus grams."
    jar.grams = 250
    if jar.grams_left != 750:
        return "HINT: After jar.grams = 250 in a 1000 g jar, grams_left should be 750. Work it out in the property."

    # Part 3: percent_full.
    if not isinstance(parts.get("percent_full"), property):
        return ("HINT: Part 2 works! Now part 3. Add  @property  and  def percent_full(self):  that "
                "returns self.grams / self.capacity * 100.")
    if flour.percent_full != 65:
        return f"HINT: flour.percent_full should be 65.0, not {flour.percent_full!r}. Grams divided by capacity, times 100."
    if jar.percent_full != 25:
        return "HINT: 250 g in a 1000 g jar is 25 percent full. Work it out in the property, every time."

    try:
        flour.grams_left = 100
        return "HINT: grams_left should be read-only. Give it no setter."
    except AttributeError:
        pass

    return ("PASS: Your jar is always right. grams_left and percent_full are worked out on every read, "
            "and the setter stops -5 g and 1200 g at the door. Next: review of classes and objects.")


verdict = _check()
print(verdict)
