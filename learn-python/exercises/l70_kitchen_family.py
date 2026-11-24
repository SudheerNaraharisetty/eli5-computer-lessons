# Lesson 70 exercise: Chloe's toaster
#
# Chloe is gluten-free. She toasts her own bread in a 2-slot toaster.
# A toaster IS AN appliance, so it should inherit from Appliance.
#
# The class Appliance below is the parent. Leave it as it is.
# Between START and END, write a child class:
#
#   class Toaster(Appliance):
#
#   1. __init__(self, name, watts, slots)
#        FIRST call the parent's setup:  super().__init__(name, watts)
#        THEN keep the new thing:        self.slots = slots
#   2. start(self)   its own start (an override):
#        set self.on = True and print  toaster glows red
#        (use self.name, so a toaster called "toaster" says exactly that)
#
# Do NOT copy stop or power_cost. The toaster gets them from Appliance.
#
#   Toaster("toaster", 1200, 2)
#   5 minutes of toast: 1200 W for 5 minutes is 0.1 kWh, so it costs 0.03.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l70_kitchen_family.py
#
# What happens when you run it, in two steps:
# - STEP 1. Chloe makes toast with your toaster, and you see it.
# - STEP 2, THE CHECK. It tries your toaster in other ways. It says PASS,
#   or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ----- THE PARENT: leave this class as it is -----
class Appliance:
    def __init__(self, name, watts):
        self.name = name
        self.watts = watts
        self.on = False

    def start(self):
        self.on = True
        print(f"{self.name} is on")

    def stop(self):
        self.on = False
        print(f"{self.name} is off")

    def power_cost(self, minutes):
        kwh = self.watts / 1000 * minutes / 60
        return round(kwh * 0.30, 2)     # 0.30 per kWh


# >>> START: write class Toaster below this line


# <<< END: write class Toaster above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes Appliance and your lines,
# makes toast like Chloe would, then tries the toaster in other ways.
def _check():
    import ast
    import contextlib
    import io

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    parent, start, end = "# ----- THE PARENT", "# >>> START", "# <<< END"
    if parent not in source or start not in source or end not in source:
        return "HINT: Keep the PARENT, START and END lines. Write your class between START and END."
    given = source.split(parent, 1)[1].split("\n", 1)[1].split(start, 1)[0]
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colons at the end of the class and def lines, and the 4-space steps.")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(given, "the parent", "exec"), ns)
    except Exception as error:
        return "HINT: The Appliance class was changed and now stops: " + type(error).__name__ + ": " + str(error)
    Appliance = ns.get("Appliance")
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
    if ns.get("Appliance") is not Appliance:
        return "HINT: Do not write class Appliance again between START and END. It is already above."

    Toaster = ns.get("Toaster")
    if not isinstance(Toaster, type):
        return "HINT: Write  class Toaster(Appliance):  between START and END."
    if not issubclass(Toaster, Appliance):
        return ("HINT: Toaster does not inherit from Appliance yet. Put the parent in the brackets:  "
                "class Toaster(Appliance):")
    copied = [name for name in ("stop", "power_cost") if name in vars(Toaster)]
    if copied:
        return ("HINT: Toaster has its own " + " and ".join(copied) + ". Delete it: the toaster already "
                "gets it from Appliance. Change only what is different.")
    if "__init__" not in vars(Toaster):
        return ("HINT: Toaster needs its own  def __init__(self, name, watts, slots):  so it can keep "
                "its slots.")
    if "start" not in vars(Toaster):
        return "HINT: Toaster needs its own  def start(self):  that prints  toaster glows red."

    def quiet(fn, *args):
        buffer = io.StringIO()
        with contextlib.redirect_stdout(buffer):
            result = fn(*args)
        return result, buffer.getvalue().strip()

    # STEP 1: Chloe's toast
    print("STEP 1: Chloe makes gluten-free toast")
    print("-" * 44)
    try:
        toaster = Toaster("toaster", 1200, 2)
        print("  made Toaster(\"toaster\", 1200, 2)")
        _, said = quiet(toaster.start)
        print("  toaster.start() printed:", repr(said))
        cost = toaster.power_cost(5)
        print("  toaster.power_cost(5) gives", repr(cost))
    except TypeError as error:
        print("-" * 44)
        print("STEP 2, THE CHECK")
        text = str(error)
        if "positional argument" in text and "__init__" in text:
            return ("HINT: Python stopped with: TypeError: " + text + "\n  The toaster's __init__ takes "
                    "name, watts and slots after self:  def __init__(self, name, watts, slots):  and "
                    "super().__init__ gets name and watts:  super().__init__(name, watts)")
        return "HINT: Python stopped with: TypeError: " + text
    except AttributeError as error:
        print("-" * 44)
        print("STEP 2, THE CHECK")
        text = str(error)
        if any(f"'{a}'" in text for a in ("watts", "name", "on")):
            return ("HINT: Python stopped with: AttributeError: " + text + "\n  The parent's setup never ran. "
                    "Make the first line of Toaster's __init__:  super().__init__(name, watts)")
        return "HINT: Python stopped with: AttributeError: " + text
    except Exception as error:
        print("-" * 44)
        print("STEP 2, THE CHECK")
        return "HINT: Python stopped with: " + type(error).__name__ + ": " + str(error)
    print("-" * 44)
    print("STEP 2, THE CHECK")

    if getattr(toaster, "slots", None) != 2:
        return ("HINT: The toaster should keep its slots. In __init__, after super, write  "
                "self.slots = slots")
    if getattr(toaster, "watts", None) != 1200 or getattr(toaster, "name", None) != "toaster":
        return "HINT: Pass name and watts on to the parent:  super().__init__(name, watts)"
    if said == "toaster is on":
        return "HINT: start() still prints the parent's words. Toaster's own start should print  toaster glows red"
    if said != "toaster glows red":
        return f"HINT: start() printed {said!r}. It should print exactly  toaster glows red  (use f\"{{self.name}} glows red\")."
    if toaster.on is not True:
        return ("HINT: start() prints, but the toaster is not on. Your start replaces the parent's, so it "
                "must also set  self.on = True")
    if cost != 0.03:
        return f"HINT: 5 minutes of toast should cost 0.03, but power_cost(5) gave {cost!r}."

    try:
        _, said2 = quiet(toaster.stop)
        big = Toaster("big toaster", 1800, 4)
        _, said3 = quiet(big.start)
    except Exception as error:
        return "HINT: Python stopped with: " + type(error).__name__ + ": " + str(error)
    if said2 != "toaster is off" or toaster.on is not False:
        return "HINT: stop() should come from Appliance and print  toaster is off."
    if said3 != "big toaster glows red":
        return ("HINT: A toaster called \"big toaster\" printed " + repr(said3) + ". Use the name in start:  "
                "print(f\"{self.name} glows red\")")
    if big.slots != 4 or big.watts != 1800:
        return "HINT: Each toaster should keep its own slots and watts on self."
    if not isinstance(toaster, Appliance):
        return "HINT: A toaster should be an Appliance. Check the brackets after class Toaster."

    return ("PASS: Toaster(Appliance) gets stop and power_cost from its parent, sets up name and watts "
            "with super().__init__, keeps its own slots, and glows red. Chloe's toast cost 0.03.")


verdict = _check()
print(verdict)
