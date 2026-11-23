# Lesson 67 exercise: Set up each guest
#
# Kitchen Coach needs to know your three guests. Make a class Guest whose
# __init__ sets up every new guest the same way, with three attributes:
#   name       the guest's name, like "Ana"
#   goal       what they care about, like "half-marathon"
#   calories   calories a day. Most guests need 2000, so make that the
#              default: calories=2000 (lesson 46).
#
# Then set up the three guests, ONE line each:
#   ana     Ana, goal "half-marathon", 2600 calories (she runs a lot)
#   ben     Ben, goal "protein", the usual calories (leave it out!)
#   chloe   Chloe, goal "gluten-free", 1800 calories. Name the jar:
#           calories=1800
#
# Remember: self is the new guest being set up. Store each value on it
# with  self.something = something . A line without "self." only makes a
# name inside __init__, and it is gone when __init__ ends (lesson 47).
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l67_guest_setup.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your guests are printed.
# - STEP 2, THE CHECK. It also sets up some other guests with your class.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

class Guest:
    def __init__(self):     # 1. add the parameters: name, goal, calories=2000
        pass                # 2. store each one on self, one line each


# 3. Set up the three guests, one line each.
ana = None
ben = None
chloe = None

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, prints your guests, then tries your class with other guests.
def _check():
    import ast
    import inspect

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
        if isinstance(error, TypeError) and "positional argument" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  Count the jars. __init__ needs self, name, goal "
                    "and calories=2000. Each guest line passes the values after self: Python passes self for you.")
        if isinstance(error, TypeError) and "unexpected keyword" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  The parameter names in __init__ must be exactly "
                    "name, goal and calories.")
        if isinstance(error, TypeError) and "should return None" in str(error):
            return "HINT: Python stopped with: " + last + "\n  __init__ only sets up self. Remove the return line."
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    Guest = ns.get("Guest")
    print("STEP 1: your guests")
    print("-" * 50)
    for var in ["ana", "ben", "chloe"]:
        g = ns.get(var)
        if g is None:
            print(f"  {var:<6} None")
        else:
            print(f"  {var:<6} name={getattr(g, 'name', '?')!r}  goal={getattr(g, 'goal', '?')!r}  "
                  f"calories={getattr(g, 'calories', '?')!r}")
    print("-" * 50)
    print("STEP 2, THE CHECK")

    if not isinstance(Guest, type):
        return "HINT: Keep the line  class Guest:  The check looks for that class."
    params = list(inspect.signature(Guest.__init__).parameters.values())
    names = [p.name for p in params]
    if names[:1] != ["self"]:
        return ("HINT: The first parameter of __init__ must be self. It is the new guest being set up, "
                "and Python passes it for you.")
    if names == ["self"]:
        return ("HINT: __init__ only has self so far. Add the other jars after it: "
                "def __init__(self, name, goal, calories=2000):")
    if names[1:] != ["name", "goal", "calories"]:
        return ("HINT: __init__ has the parameters " + ", ".join(names) + ". It should have "
                "self, name, goal, calories, in that order.")
    if params[3].default != 2000:
        return ("HINT: calories needs a default: write  calories=2000  in the brackets of __init__, "
                "so a guest who leaves it out gets 2000.")

    # Try the class with guests that are not in the file.
    try:
        dan = Guest("Dan", "speed", 2200)
        eve = Guest("Eve", "vegan")
    except Exception as error:
        return "HINT: Setting up a new guest stopped with " + type(error).__name__ + ": " + str(error)
    for attr, want in [("name", "Dan"), ("goal", "speed"), ("calories", 2200)]:
        if not hasattr(dan, attr):
            return (f"HINT: A new guest has no attribute {attr!r}. Inside __init__, store it on the new "
                    f"guest: self.{attr} = {attr} . Without self. the value is gone when __init__ ends.")
        got = getattr(dan, attr)
        if got != want:
            return (f"HINT: Guest(\"Dan\", \"speed\", 2200) gave {attr} = {got!r}, not {want!r}. "
                    f"Store the parameter itself: self.{attr} = {attr}")
    if eve.calories != 2000:
        return f"HINT: Guest(\"Eve\", \"vegan\") should get the default 2000 calories, not {eve.calories!r}."

    want = {
        "ana": ("Ana", "half-marathon", 2600),
        "ben": ("Ben", "protein", 2000),
        "chloe": ("Chloe", "gluten-free", 1800),
    }
    for var, (name, goal, cal) in want.items():
        g = ns.get(var)
        if g is None:
            return f"HINT: {var} is still None. Set it up with one line: {var} = Guest(...)"
        if not isinstance(g, Guest):
            return f"HINT: {var} should be a Guest, made with Guest(...). It is a {type(g).__name__}."
        got = (g.name, g.goal, g.calories)
        if got != (name, goal, cal):
            return (f"HINT: {var} has name={got[0]!r}, goal={got[1]!r}, calories={got[2]!r}. "
                    f"It should be {name!r}, {goal!r}, {cal}. Check the spelling and the order.")

    src = your_code
    if "Guest(\"Ben\", \"protein\", 2000)" in src.replace("'", '"'):
        return ("HINT: Ben is right, but leave his calories out: Guest(\"Ben\", \"protein\"). "
                "That is what the default is for.")
    if "calories=1800" not in src.replace(" ", ""):
        return "HINT: Chloe is right. Now name the jar on her line: calories=1800 (lesson 46)."

    return ("PASS: Three guests, each set up in one line by the same __init__. Ben got the default, "
            "and self.name = name put every value on the right guest. Next: methods, what a guest can do.")


verdict = _check()
print(verdict)
