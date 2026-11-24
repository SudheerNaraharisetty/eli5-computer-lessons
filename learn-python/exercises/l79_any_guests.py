# Lesson 79 exercise: Cook for any number of guests
#
# Kitchen Coach needs two functions that work for ANY number of values.
#
#   1. total_protein  adds up the grams of protein of any number of foods.
#        total_protein(18, 12, 10)   gives  40     (Ben's lunch)
#        total_protein(25)           gives  25
#        total_protein()             gives  0
#      Hint: put a star in front of the parameter:  def total_protein(*grams):
#
#   2. place_order  takes a dish, then any number of NAMED notes, and
#      gives back ONE line of text:
#        place_order("pancakes", gluten_free=True, extra="cream")
#          gives  "pancakes (gluten_free=True, extra=cream)"
#        place_order("soup")
#          gives  "soup (no notes)"
#      Hint: two stars collect the named notes in a dict:
#        def place_order(dish, **notes):
#      Loop over notes.items() to build "key=value" pieces, then join them
#      with ", " (lesson 31).
#
# Both functions RETURN their answer. They do not print it.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l79_any_guests.py
#
# What happens when you run it, in two steps:
# - STEP 1. It calls your functions for Ben and Chloe and prints the answers.
# - STEP 2, THE CHECK. It also calls them with other values.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: change the two functions below this line

def total_protein(first, second):
    return first + second


def place_order(dish):
    return dish

# <<< END: change the two functions above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, then calls your two functions in many ways.
def _check():
    import inspect

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your functions between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    ns = {}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Remember: plain parameters first, then *grams, then **notes.")
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
    tp, po = ns.get("total_protein"), ns.get("place_order")
    if not callable(tp) or not callable(po):
        return "HINT: Keep both functions, named total_protein and place_order."

    def call(f, *args, **kwargs):
        try:
            return f(*args, **kwargs), None
        except TypeError as error:
            return None, str(error)
        except Exception as error:
            return None, type(error).__name__ + ": " + str(error)

    print("STEP 1: your answers")
    print("-" * 60)
    shown = [
        ("total_protein(18, 12, 10)", lambda: tp(18, 12, 10)),
        ('place_order("pancakes", gluten_free=True, extra="cream")', lambda: po("pancakes", gluten_free=True, extra="cream")),
        ('place_order("soup")', lambda: po("soup")),
    ]
    for text, fn in shown:
        try:
            print(f"  {text}\n      -> {fn()!r}")
        except Exception as error:
            print(f"  {text}\n      -> {type(error).__name__}: {error}")
    print("-" * 60)
    print("STEP 2, THE CHECK")

    # 1. total_protein
    kinds = [p.kind for p in inspect.signature(tp).parameters.values()]
    if inspect.Parameter.VAR_POSITIONAL not in kinds:
        return ("HINT: total_protein only takes a fixed number of values. Give it ONE parameter with a star: "
                "def total_protein(*grams):  Then grams is a tuple of every value.")
    for args, want in [((18, 12, 10), 40), ((25,), 25), ((), 0), ((20, 18, 13, 9, 30), 90)]:
        got, err = call(tp, *args)
        if err:
            return f"HINT: total_protein{args} stopped with: {err}"
        if got is None:
            return "HINT: total_protein gives back None. Use return, not print: return sum(grams)"
        if got != want:
            return f"HINT: total_protein{args} gave {got!r}. It should give {want}. Add up every value in grams: sum(grams)"

    # 2. place_order
    got, err = call(po, "pancakes", gluten_free=True, extra="cream")
    if err:
        if "unexpected keyword" in err:
            return ("HINT: total_protein is right. place_order does not accept named notes yet: " + err
                    + "  Add a parameter with two stars: def place_order(dish, **notes):")
        return "HINT: total_protein is right. place_order stopped with: " + err
    if got is None:
        return "HINT: place_order gives back None. Build the text, then return it."
    want = "pancakes (gluten_free=True, extra=cream)"
    if got != want:
        if isinstance(got, str) and "'" in got:
            return (f"HINT: place_order gave {got!r}. Build each piece from the key and the value, "
                    f"like f\"{{key}}={{value}}\", instead of printing the whole dict.")
        return f"HINT: place_order gave {got!r}. It should give {want!r}."
    got, err = call(po, "soup")
    if err:
        return "HINT: place_order(\"soup\") stopped with: " + err
    if got != "soup (no notes)":
        return (f"HINT: place_order(\"soup\") gave {got!r}. With no notes, notes is an empty dict {{}}. "
                "Then give back \"soup (no notes)\". An empty dict counts as False (lesson 23).")
    got, err = call(po, dish="tea", milk="oat", sugar_g=0)
    if err or got != "tea (milk=oat, sugar_g=0)":
        return f"HINT: place_order(dish=\"tea\", milk=\"oat\", sugar_g=0) gave {got if not err else err!r}. It should give 'tea (milk=oat, sugar_g=0)'."
    got, err = call(po, "salad", vegan=True)
    if err or got != "salad (vegan=True)":
        return f"HINT: place_order(\"salad\", vegan=True) gave {got if not err else err!r}. It should give 'salad (vegan=True)'."

    return ("PASS: Any number of foods, any number of notes. *grams collects the values in a tuple, "
            "**notes collects the named ones in a dict. Next: lambda.")


verdict = _check()
print(verdict)
