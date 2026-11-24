# Lesson 69 exercise: Allergy jars
#
# Kitchen Coach has a bug. Chloe is gluten-free, so the program adds
# "gluten" to Chloe's allergies. But now Ana and Ben are "gluten-free"
# too, and Kitchen Coach takes the pasta off Ana's race-week menu.
#
# The reason: allergies = [] is written on the template (the class), so
# it is ONE list, shared by every guest.
#
# Your job, in two parts:
#   1. Give every guest a list of their OWN. Set it up in __init__ with
#      self.allergies = []  and delete the shared line on the template.
#   2. Kitchen Coach wants to know how many guests it has set up. Add a
#      class attribute  guests_made = 0  on the template (that one SHOULD
#      be shared), and add 1 to it in __init__ every time a guest is made.
#      Write it as  Guest.guests_made += 1  (not self.guests_made, see
#      "The catch" in lesson 69).
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l69_allergy_jars.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your guests and their allergies are printed.
# - STEP 2, THE CHECK. It also makes some new guests with your class.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

class Guest:
    allergies = []          # the bug: one list on the template, for everyone

    def __init__(self, name):
        self.name = name


# Leave these lines as they are.
ana = Guest("Ana")
ben = Guest("Ben")
chloe = Guest("Chloe")
chloe.allergies.append("gluten")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, prints your guests, then tries your class with new guests.
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
        if isinstance(error, AttributeError) and "guests_made" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  Guest.guests_made += 1 reads the counter "
                    "first, so it must exist: write  guests_made = 0  inside the class, above __init__.")
        if isinstance(error, AttributeError) and "allergies" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  Every guest needs its own list: inside "
                    "__init__, write  self.allergies = []")
        if isinstance(error, (NameError, UnboundLocalError)) and "guests_made" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  Inside __init__ the counter is not a plain "
                    "name. Write it with the class in front:  Guest.guests_made += 1")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."

    Guest = ns.get("Guest")
    print("STEP 1: your guests")
    print("-" * 50)
    for var in ["ana", "ben", "chloe"]:
        g = ns.get(var)
        print(f"  {var:<6} allergies = {getattr(g, 'allergies', '?')!r}")
    if isinstance(Guest, type):
        print(f"  Guest.guests_made = {getattr(Guest, 'guests_made', '(not there yet)')!r}")
    print("-" * 50)
    print("STEP 2, THE CHECK")

    if not isinstance(Guest, type):
        return "HINT: Keep the line  class Guest:  The check looks for that class."
    for var in ["ana", "ben", "chloe"]:
        if not isinstance(ns.get(var), Guest):
            return f"HINT: Keep the line that makes {var} with Guest(...). The check needs all three guests."
    ana, ben, chloe = ns["ana"], ns["ben"], ns["chloe"]

    # Part 1: each guest has a list of their own.
    if "allergies" not in vars(chloe):
        return ("HINT: Chloe has no allergies list of her own yet. Python still finds the shared one on "
                "the template. Inside __init__, add  self.allergies = []")
    if ana.allergies is chloe.allergies or ben.allergies is chloe.allergies:
        return ("HINT: Two guests still share one list. self.allergies = [] must be inside __init__, so "
                "every new guest gets a NEW empty list.")
    if ana.allergies != [] or ben.allergies != []:
        return (f"HINT: Ana has {ana.allergies!r} and Ben has {ben.allergies!r}. They should both have []. "
                "Leave the guest lines as they are and only change the class.")
    if chloe.allergies != ["gluten"]:
        return f"HINT: Chloe should have ['gluten'], not {chloe.allergies!r}. Leave the guest lines as they are."
    try:
        dan = Guest("Dan")
        eve = Guest("Eve")
    except Exception as error:
        return "HINT: Making a new guest stopped with " + type(error).__name__ + ": " + str(error)
    dan.allergies.append("nuts")
    if eve.allergies != []:
        return "HINT: When Dan adds nuts, Eve gets them too. Each guest needs its own list, made in __init__."

    # Part 2: the shared counter.
    if "guests_made" not in vars(Guest):
        return ("HINT: Part 1 works: Ana and Ben are safe. Now part 2. Add the counter on the template: "
                "write  guests_made = 0  inside the class, above __init__.")
    if "guests_made" in vars(dan):
        return ("HINT: Each guest now has its own guests_made, so the count never grows past 1. "
                "self.guests_made += 1 writes a NEW attribute on the guest. Write  Guest.guests_made += 1")
    before = Guest.guests_made
    Guest("Fay")
    Guest("Gus")
    if Guest.guests_made != before + 2:
        return (f"HINT: After 2 more guests, guests_made went from {before} to {Guest.guests_made}. "
                "Inside __init__, add 1 to it every time:  Guest.guests_made += 1")
    if before != 5:
        return (f"HINT: The file and the check have made 5 guests, but guests_made says {before}. "
                "Start the counter at 0 on the template, and add 1 once in __init__.")

    if "allergies" in vars(Guest):
        return ("HINT: It works! One last tidy-up: delete the old line  allergies = []  on the template. "
                "Nobody needs it now, and it is a trap for the next person.")

    return ("PASS: Every guest has their own allergies jar, made fresh in __init__, so Chloe's gluten "
            "stays with Chloe. And one shared counter on the template counts them all. Next: inheritance.")


verdict = _check()
print(verdict)
