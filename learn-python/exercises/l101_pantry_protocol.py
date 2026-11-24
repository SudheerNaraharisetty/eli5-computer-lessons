# Lesson 101 exercise: The pantry protocol
#
# Kitchen Coach keeps the pantry in a class. Right now it only has
# __init__, so every built-in tool fails on it:
#     len(pantry)        TypeError: object of type 'Pantry' has no len()
#     "oats" in pantry   TypeError: argument of type 'Pantry' is not a container or iterable
#     pantry["oats"]     TypeError: 'Pantry' object is not subscriptable
#
# Give the class Pantry five dunder methods, so Python's own syntax works on it.
# Each one only has to ask the dict self.grams (item name -> grams):
#   1. __len__(self)            for len(pantry): how many items there are
#   2. __contains__(self, item) for "oats" in pantry: True or False
#   3. __getitem__(self, item)  for pantry["oats"]: the grams of that item
#   4. __iter__(self)           for "for item in pantry": hand back iter(...) of the dict
#   5. __bool__(self)           for "if pantry:": True when there is at least one item
#
# Every dunder RETURNS its answer (lesson 72). Write them one at a time and run
# the file after each one. The check says which one is next.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l101_pantry_protocol.py
#
# The check at the bottom tries each built-in on a full pantry and on an empty
# one. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

class Pantry:
    def __init__(self, grams):
        self.grams = grams        # a dict: item name -> grams

    # write __len__, __contains__, __getitem__, __iter__ and __bool__ here

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, then uses len, in, [], for and if on two pantries.
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
                + "  Check the colons and the indentation: each def sits 4 spaces in.")

    ns = {"__name__": "l101"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return ("HINT: Your lines stopped with " + type(error).__name__ + ": " + str(error)
                + "  Read it from the bottom up (lesson 4).")
    Pantry = ns.get("Pantry")
    if not isinstance(Pantry, type):
        return "HINT: Keep the class Pantry. The check uses it."

    def make(grams):
        try:
            return True, Pantry(grams)
        except Exception as error:
            return False, f"Pantry(...) stopped with {type(error).__name__}: {error}. Keep __init__ as it is."

    def ask(label, func):
        try:
            return True, func()
        except Exception as error:
            return False, f"{label} stopped with {type(error).__name__}: {error}"

    ok, pantry = make({"oats": 400, "rice": 900, "lentils": 250})
    if not ok:
        return "HINT: " + pantry
    ok, empty = make({})
    if not ok:
        return "HINT: " + empty
    print("Kitchen Coach asks the pantry {'oats': 400, 'rice': 900, 'lentils': 250}:")

    # 1. len()
    if "__len__" not in vars(Pantry):
        return ("HINT 1: len(pantry) needs a __len__ method. Inside the class:  def __len__(self):  "
                "and on the next line  return len(self.grams)")
    ok, n = ask("len(pantry)", lambda: len(pantry))
    if not ok:
        return "HINT 1: " + n + ". __len__ must return a whole number: len(self.grams)."
    print(f"  len(pantry)          -> {n}")
    if n != 3:
        return f"HINT 1: len(pantry) gave {n}, but the pantry holds 3 items. Return len(self.grams)."
    ok, n0 = ask("len(empty)", lambda: len(empty))
    if not ok or n0 != 0:
        return "HINT 1: An empty pantry should have len 0. Return len(self.grams), not a fixed number."

    # 2. in
    if "__contains__" not in vars(Pantry):
        return ("HINT 2: \"oats\" in pantry needs a __contains__ method. It gets the item as a second "
                "parameter:  def __contains__(self, item):  then  return item in self.grams")
    ok, yes = ask('"oats" in pantry', lambda: "oats" in pantry)
    if not ok:
        return "HINT 2: " + yes
    ok, no = ask('"flour" in pantry', lambda: "flour" in pantry)
    if not ok:
        return "HINT 2: " + no
    print(f'  "oats" in pantry     -> {yes}')
    print(f'  "flour" in pantry    -> {no}')
    if yes is not True or no is not False:
        return ('HINT 2: "oats" in pantry should be True and "flour" in pantry False. '
                "Return  item in self.grams  (it asks the dict).")

    # 3. []
    if "__getitem__" not in vars(Pantry):
        return ('HINT 3: pantry["rice"] needs a __getitem__ method. It gets the key:  '
                "def __getitem__(self, item):  then  return self.grams[item]")
    ok, g = ask('pantry["rice"]', lambda: pantry["rice"])
    if not ok:
        return "HINT 3: " + g
    print(f'  pantry["rice"]       -> {g}')
    if g != 900:
        return f'HINT 3: pantry["rice"] gave {g!r}, but the pantry holds 900 g rice. Return self.grams[item].'
    ok, g2 = ask('pantry["lentils"]', lambda: pantry["lentils"])
    if not ok or g2 != 250:
        return 'HINT 3: pantry["lentils"] should give 250. Use the item you were given: self.grams[item].'

    # 4. for
    if "__iter__" not in vars(Pantry):
        return ("HINT 4: for item in pantry needs an __iter__ method. Hand back a waiter (lesson 82):  "
                "def __iter__(self):  then  return iter(self.grams)")
    ok, items = ask("for item in pantry", lambda: [item for item in pantry])
    if not ok:
        if "non-iterator" in items:
            return ("HINT 4: " + items + ". __iter__ must hand back an iterator, not the dict itself. "
                    "Wrap it:  return iter(self.grams)")
        return "HINT 4: " + items
    print(f"  for item in pantry   -> {', '.join(map(str, items))}")
    if items != ["oats", "rice", "lentils"]:
        return ("HINT 4: The loop should give the item names oats, rice, lentils. It gave "
                + repr(items) + ". Return iter(self.grams).")
    ok, again = ask("a second loop", lambda: list(pantry))
    if not ok or again != items:
        return ("HINT 4: A second loop over the pantry came back empty. Make a NEW waiter every time: "
                "return iter(self.grams), not one waiter saved in __init__.")

    # 5. if / bool()
    if "__bool__" not in vars(Pantry):
        return ("HINT 5: Almost there. Write __bool__ too, so if pantry: asks a clear question:  "
                "def __bool__(self):  then  return len(self.grams) > 0")
    ok, full = ask("bool(pantry)", lambda: bool(pantry))
    if not ok:
        if "should return bool" in full:
            return "HINT 5: " + full + ". __bool__ must return True or False. Compare:  len(self.grams) > 0"
        return "HINT 5: " + full
    ok, none = ask("bool(empty)", lambda: bool(empty))
    if not ok:
        return "HINT 5: " + none
    print(f"  if pantry:           -> {'something to cook' if full else 'shopping time'}")
    print(f"  if Pantry({{}}):       -> {'something to cook' if none else 'shopping time'}")
    if full is not True or none is not False:
        return ("HINT 5: A pantry with items should be True, and an empty pantry False. "
                "Return  len(self.grams) > 0")

    return ("PASS: len, in, [], for and if all work on your Pantry. Python's syntax is a set of "
            "plugs, and you wrote the five sockets.")


verdict = _check()
print(verdict)
