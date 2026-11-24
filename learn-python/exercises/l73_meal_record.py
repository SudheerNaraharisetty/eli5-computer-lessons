# Lesson 73 exercise: Kitchen Coach's guest records
#
# Kitchen Coach keeps a record for each of your three guests:
#   Ana     2600 calories   110 g protein   (runner)
#   Ben     2000 calories   140 g protein   (lifts weights)
#   Chloe   1800 calories    70 g protein   gluten-free
#
# Someone wrote the class Guest by hand, below. It is long, and it has bugs:
# - print(chloe) does not show gluten_free or allergies.
# - == only compares the name and calories, so two different guests can be "equal".
#
# Your job: turn it into a dataclass. Keep the same fields, in this order:
#   name: str
#   calories: int
#   protein: int
#   gluten_free: bool        default False
#   allergies: list          every guest gets their OWN new empty list
#
# Then delete the hand-written __init__, __repr__ and __eq__. @dataclass
# writes them for you. Keep the daily_summary method: methods still work.
#
# Careful with allergies. "allergies: list = []" makes Python stop with
# ValueError: mutable default ... use default_factory. That is the catch from
# the lesson. Use field(default_factory=list) instead.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l73_meal_record.py
#
# What happens when you run it, in two steps:
# - STEP 1. Kitchen Coach makes the three records with your class, and prints them.
# - STEP 2, THE CHECK. It tests printing, ==, and the allergies lists.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: change the class below this line
from dataclasses import dataclass, field


class Guest:
    def __init__(self, name, calories, protein, gluten_free=False):
        self.name = name
        self.calories = calories
        self.protein = protein
        self.gluten_free = gluten_free
        self.allergies = []

    def __repr__(self):
        return f"Guest({self.name}, {self.calories}, {self.protein})"

    def __eq__(self, other):
        return self.name == other.name and self.calories == other.calories

    def daily_summary(self):
        return f"{self.name}: {self.calories} kcal, {self.protein} g protein"

# <<< END: change the class above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your class from between
# START and END, makes the three guest records, then tests them.
def _check():
    import ast
    import dataclasses

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Change the class between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Each field is one line, like  calories: int  pushed in by 4 spaces.")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except ValueError as error:
        if "mutable default" in str(error):
            return ("HINT: Python stopped with: ValueError: " + str(error) + "\n  That is the catch. "
                    "allergies: list = [] would be ONE list for every guest. Write\n"
                    "    allergies: list = field(default_factory=list)\n  so each guest gets a new empty list.")
        return "HINT: Python stopped with an error: ValueError: " + str(error)
    except TypeError as error:
        if "follows default argument" in str(error):
            return ("HINT: Python stopped with: TypeError: " + str(error) + "\n  Fields with a default "
                    "(= something) must come after the fields without one. Keep the order: name, calories, "
                    "protein, gluten_free, allergies.")
        return "HINT: Python stopped with an error: TypeError: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    Guest = ns.get("Guest")
    if not isinstance(Guest, type):
        return "HINT: Keep the line  class Guest:  The check looks for that class."
    if not dataclasses.is_dataclass(Guest):
        return ("HINT: Guest is still written by hand. Put  @dataclass  on the line right above  class Guest:  "
                "and list the fields, one per line:  name: str,  calories: int,  and so on.")
    names = [f.name for f in dataclasses.fields(Guest)]
    want = ["name", "calories", "protein", "gluten_free", "allergies"]
    if names != want:
        return ("HINT: The fields should be " + ", ".join(want) + ", in that order. Yours are: "
                + (", ".join(names) or "none yet") + ".  A field is a line like  protein: int  inside the class.")

    # STEP 1: make the three records
    print("STEP 1: Kitchen Coach makes the guest records")
    print("-" * 44)
    try:
        ana = Guest("Ana", 2600, 110)
        ben = Guest("Ben", 2000, 140)
        chloe = Guest("Chloe", 1800, 70, True)
    except TypeError as error:
        return ("HINT: Guest(\"Ana\", 2600, 110) stopped with: TypeError: " + str(error) + "\n  Did you keep "
                "your own __init__? Delete it, @dataclass writes it. And give gluten_free a default:  "
                "gluten_free: bool = False")
    chloe.allergies.append("gluten")
    for guest in (ana, ben, chloe):
        print(" ", guest)
    print("-" * 44)
    print("STEP 2, THE CHECK")

    want_repr = "Guest(name='Chloe', calories=1800, protein=70, gluten_free=True, allergies=['gluten'])"
    if repr(chloe) != want_repr:
        return ("HINT: print(chloe) should show\n    " + want_repr + "\n  but it shows\n    " + repr(chloe)
                + "\n  Delete your own __repr__. @dataclass writes one that shows every field.")
    if ana.allergies != [] or ana.allergies is chloe.allergies:
        return ("HINT: Chloe's gluten shows up on Ana too: " + repr(ana.allergies) + ". All guests share one list "
                "(lesson 69). Write  allergies: list = field(default_factory=list)")
    if ben.gluten_free is not False:
        return "HINT: Ben did not say gluten_free, so it should be False. Write  gluten_free: bool = False"
    if not (Guest("Ben", 2000, 140) == Guest("Ben", 2000, 140)):
        return "HINT: Two records with the same values should be ==. Delete your own __eq__, @dataclass writes one."
    if Guest("Ben", 2000, 140) == Guest("Ben", 2000, 120):
        return ("HINT: Ben with 140 g protein and Ben with 120 g protein come out ==. Your own __eq__ only looks at "
                "some fields. Delete it: the one @dataclass writes compares every field.")
    summary = getattr(chloe, "daily_summary", None)
    if not callable(summary):
        return "HINT: Keep the daily_summary method inside the class. Methods still work in a dataclass."
    try:
        got = summary()
    except Exception as error:
        return "HINT: chloe.daily_summary() stopped with: " + type(error).__name__ + ": " + str(error)
    if got != "Chloe: 1800 kcal, 70 g protein":
        return "HINT: chloe.daily_summary() should give 'Chloe: 1800 kcal, 70 g protein' but gave " + repr(got)

    return ("PASS: Guest is a dataclass. You listed 5 fields and got __init__, a clear print and a fair == for free. "
            "Chloe's gluten stays on Chloe, and Ana's list is still empty.")


verdict = _check()
print(verdict)
