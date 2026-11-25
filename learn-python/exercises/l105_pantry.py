# Lesson 105 exercise: Kitchen Coach's pantry
#
# This is pantry.py for Kitchen Coach. The class Pantry already keeps a COPY
# of a dict of grams, and already has __contains__, __getitem__ and __len__.
# Four pieces are not finished:
#
# 1. pantry.has_all(ingredients) answers True or False: is there enough of
#    EVERY ingredient? ingredients is a dict like {"tofu": 150, "rice": 75}.
#    Use self[name]: it gives 0 g for something that is not on the shelf.
#
# 2. pantry.take(ingredients) takes the grams out. ALL OR NOTHING:
#    - first check every item. If one is short, raise
#        ValueError(f"not enough {name}: need {need} g, have {have} g")
#      and change NOTHING.
#    - only then, in a second loop, subtract every item.
#
# 3. load_pantry(path) reads the JSON file at path and returns a Pantry.
#    No file yet (FileNotFoundError): print a short note and return Pantry().
#
# 4. save_pantry(pantry, path) writes pantry.grams as JSON with indent=2 and
#    sort_keys=True.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l105_pantry.py
#
# The check at the bottom works in a temporary folder, so it never touches
# your own files. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: finish the four pieces below this line
import json
from pathlib import Path


class Pantry:
    """What is in the kitchen: ingredient name -> grams."""

    def __init__(self, grams=None):
        self.grams = dict(grams or {})  # a copy, not the caller's dict

    def __contains__(self, name):
        return name in self.grams

    def __getitem__(self, name):
        return self.grams.get(name, 0)  # nothing on the shelf: 0 g

    def __len__(self):
        return len(self.grams)

    def has_all(self, ingredients):
        """True if there is enough of every ingredient."""
        raise NotImplementedError("has_all")

    def take(self, ingredients):
        """Take every ingredient out, or nothing at all."""
        raise NotImplementedError("take")


def load_pantry(path):
    """Read the pantry file. No file yet: an empty pantry."""
    raise NotImplementedError("load_pantry")


def save_pantry(pantry, path):
    """Write the pantry as JSON, indent=2, sorted by name."""
    raise NotImplementedError("save_pantry")

# <<< END: finish the four pieces above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END and tries every piece in a temporary folder.
def _check():
    import ast
    import json
    import tempfile
    from pathlib import Path

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colons and the indentation.")
    ns = {"__name__": "l105"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return f"HINT: Your lines stopped with {type(error).__name__}: {error}"
    Pantry, load, save = ns.get("Pantry"), ns.get("load_pantry"), ns.get("save_pantry")
    if not isinstance(Pantry, type) or not callable(load) or not callable(save):
        return "HINT: Keep the names Pantry, load_pantry and save_pantry. The check uses them."

    def call(label, func):
        try:
            return True, func()
        except NotImplementedError as error:
            return False, f"{label} is still a stub (NotImplementedError: {error}). Write its body."
        except Exception as error:
            return False, f"{label} stopped with {type(error).__name__}: {error}"

    start_grams = {"rice": 1000, "tofu": 200, "soy sauce": 100, "chicken": 300}
    stir_fry = {"tofu": 150, "rice": 75, "soy sauce": 15}
    three_bowls = {"rice": 300, "chicken": 450}

    # 1. has_all
    pantry = Pantry(start_grams)
    for ingredients, want in [(stir_fry, True), (three_bowls, False),
                              ({"flour": 50}, False), ({"rice": 1000}, True), ({}, True)]:
        ok, got = call(f"has_all({ingredients})", lambda: pantry.has_all(ingredients))
        if not ok:
            return "HINT 1: " + got
        if got is not want:
            return (f"HINT 1: has_all({ingredients}) gave {got!r}, it should be {want}. "
                    "Go through ingredients.items() and return False as soon as self[name] < need. "
                    "After the loop, return True.")
    print("1. has_all: right for 5 recipes")

    # 2. take: the good case
    ok, got = call("take(tofu stir-fry)", lambda: pantry.take(stir_fry))
    if not ok:
        return "HINT 2: " + got
    want = {"rice": 925, "tofu": 50, "soy sauce": 85, "chicken": 300}
    if pantry.grams != want:
        return f"HINT 2: After taking the tofu stir-fry the pantry should be {want}, not {pantry.grams}."
    if start_grams["tofu"] != 200:
        return "HINT 2: take() changed the dict you gave Pantry(...). Keep the copy in __init__."
    print("2. take(tofu stir-fry):", pantry.grams)

    # 2. take: all or nothing
    before = dict(pantry.grams)
    try:
        pantry.take(three_bowls)
    except ValueError as error:
        message = str(error)
    except NotImplementedError:
        return "HINT 2: take is still a stub. Write its body."
    except Exception as error:
        return f"HINT 2: take() should raise ValueError when food is short, not {type(error).__name__}."
    else:
        return ("HINT 2: take(3 chicken rice bowls) needs 450 g chicken but there is 300 g. "
                "It should raise ValueError, and it did not.")
    if pantry.grams != before:
        return (f"HINT 2: take() failed, but it changed the pantry: {before} became {pantry.grams}. "
                "That is the half-taken pantry. Check EVERY item in a first loop, "
                "and subtract only in a second loop.")
    if message != "not enough chicken: need 450 g, have 300 g":
        return ("HINT 2: The error message should be exactly "
                "'not enough chicken: need 450 g, have 300 g', not " + repr(message))
    print("2. take(3 bowls) refused, nothing changed:", message)

    with tempfile.TemporaryDirectory() as folder:
        folder = Path(folder)
        # 3. load: missing file
        ok, empty = call("load_pantry(no file)", lambda: load(folder / "nothing.json"))
        if not ok:
            return "HINT 3: " + empty + ". Catch FileNotFoundError and return Pantry()."
        if not isinstance(empty, Pantry) or len(empty) != 0:
            return "HINT 3: With no file, load_pantry should return an empty Pantry(), not " + repr(empty)
        print("3. load_pantry(no file): an empty Pantry")

        # 4. save, then read the file back
        path = folder / "pantry.json"
        ok, got = call("save_pantry", lambda: save(pantry, path))
        if not ok:
            return "HINT 4: " + got
        if not path.exists():
            return "HINT 4: save_pantry did not write the file. Use path.write_text(json.dumps(...))."
        text = path.read_text()
        if text.strip() != json.dumps(pantry.grams, indent=2, sort_keys=True):
            return ("HINT 4: The saved file should be json.dumps(pantry.grams, indent=2, sort_keys=True). "
                    "It was:\n" + text)
        print("4. save_pantry wrote", len(text.splitlines()), "lines, sorted by name")

        # 3. load the saved file
        ok, back = call("load_pantry(saved file)", lambda: load(path))
        if not ok:
            return "HINT 4: load_pantry could not read the saved file. " + back
        if not isinstance(back, Pantry) or back.grams != pantry.grams:
            return "HINT 4: Loading the saved file should give the same grams. load_pantry should return Pantry(json.loads(path.read_text()))."
        print("4. load_pantry(saved file): tofu", back["tofu"], "g, rice", back["rice"], "g")

    return ("PASS: has_all, an all-or-nothing take, load and save all work. "
            "Check everything first, then change.")


print(_check())
