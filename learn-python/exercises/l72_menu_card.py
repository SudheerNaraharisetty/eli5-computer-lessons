# Lesson 72 exercise: The menu card
#
# Kitchen Coach prints today's menu for Ana, Ben and Chloe, and every dish
# comes out like this:
#   <__main__.Dish object at 0x10a3f2c50>
# (the number after 0x is where the dish sits in memory, and it changes on
# every run). Teach the class Dish how to show itself.
#
# Give the class Dish three dunder methods. Each one RETURNS its answer:
#
#   __str__(self)          for people: what print() and f-strings show
#                            lentil soup (18 g protein)
#   __repr__(self)         for programmers: what a list shows, and the REPL.
#                          It looks like the code that makes the dish:
#                            Dish('lentil soup', 18)
#   __eq__(self, other)    two dishes are == when they have the same name
#                          AND the same protein. Return True or False.
#
# Write them inside the class, between START and END, under __init__.
# Every method starts with self.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l72_menu_card.py
#
# What happens when you run it, in two steps:
# - STEP 1. Today's menu is printed with your class, one dish at a time
#   and then the whole list.
# - STEP 2, THE CHECK. It tries your class with other dishes too.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your methods below this line
class Dish:
    def __init__(self, name, protein):
        self.name = name
        self.protein = protein

    # 1. def __str__(self): return the text  lentil soup (18 g protein)

    # 2. def __repr__(self): return the text  Dish('lentil soup', 18)

    # 3. def __eq__(self, other): return True when the names AND the
    #    proteins are the same.

# <<< END: write your methods above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the class from between
# START and END, prints today's menu, then tries the class with other dishes.
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
                + "  Check the colons, the brackets and the indentation.")

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    Dish = ns.get("Dish")
    if not isinstance(Dish, type):
        return "HINT: Keep the line  class Dish:  The check looks for that class."
    try:
        soup = Dish("lentil soup", 18)
        salad = Dish("green salad", 12)
    except Exception as error:
        return ("HINT: Making a dish stopped with " + type(error).__name__ + ": " + str(error)
                + "  Leave __init__ as it is.")

    def show(fn, value):
        # Run str() or repr() and turn an error into a message.
        try:
            return fn(value), None
        except Exception as error:
            return None, type(error).__name__ + ": " + str(error)

    print("STEP 1: today's menu")
    print("-" * 50)
    for label, fn, value in [("print(soup)", str, soup), ("print(salad)", str, salad), ("print(menu)", str, [soup, salad])]:
        text, err = show(fn, value)
        print(f"  {label:<13} {text if err is None else 'stopped with ' + err}")
    print("-" * 50)
    print("STEP 2, THE CHECK")

    # Part 1: __str__
    if "__str__" not in vars(Dish):
        return ("HINT: print(soup) still shows <__main__.Dish object at 0x...>. Inside the class, under "
                "__init__, write  def __str__(self):  and return the text for people.")
    text, err = show(str, soup)
    if err:
        if "None" in err:
            return ("HINT: __str__ gave back None. Did you print the text instead of returning it? "
                    "Write  return f\"...\"  (The catch in lesson 72.)")
        return "HINT: print(soup) stopped with " + err
    if text != "lentil soup (18 g protein)":
        return (f"HINT: print(soup) shows {text!r}. It should show exactly  lentil soup (18 g protein)  "
                "Try  return f\"{self.name} ({self.protein} g protein)\"")
    pudding = Dish("rice pudding", 6)
    if str(pudding) != "rice pudding (6 g protein)":
        return (f"HINT: Chloe's rice pudding shows {str(pudding)!r}. Use self.name and self.protein "
                "in __str__, so it works for every dish, not just the soup.")

    # Part 2: __repr__
    if "__repr__" not in vars(Dish):
        return ("HINT: print(soup) works. But print(menu) still shows <__main__.Dish object at 0x...>, because "
                "a list shows each dish with __repr__. Write  def __repr__(self):  too.")
    text, err = show(repr, soup)
    if err:
        if "None" in err:
            return "HINT: __repr__ gave back None. It must return the text, not print it."
        return "HINT: repr(soup) stopped with " + err
    if text != "Dish('lentil soup', 18)":
        return (f"HINT: repr(soup) gives {text} but it should look like the code that makes the dish:  "
                "Dish('lentil soup', 18)  Mind the quotes around the name, and the comma.")
    if repr([salad, pudding]) != "[Dish('green salad', 12), Dish('rice pudding', 6)]":
        return (f"HINT: The menu shows {[salad, pudding]!r}. Use self.name and self.protein in __repr__, "
                "so it works for every dish.")
    if str(soup) != "lentil soup (18 g protein)":
        return "HINT: Keep __str__ as well. print(soup) is for people and should still say  lentil soup (18 g protein)"

    # Part 3: __eq__
    if "__eq__" not in vars(Dish):
        return ("HINT: Both menus look good. Last part: Dish(\"lentil soup\", 18) == Dish(\"lentil soup\", 18) "
                "still says False. Write  def __eq__(self, other):  and return True when both match.")
    pairs = [
        (Dish("lentil soup", 18), Dish("lentil soup", 18), True, "two lentil soups with 18 g"),
        (Dish("lentil soup", 18), Dish("lentil soup", 22), False, "lentil soup with 18 g and with 22 g"),
        (Dish("lentil soup", 18), Dish("bean chili", 18), False, "lentil soup and bean chili, both 18 g"),
        (Dish("bean chili", 15), Dish("bean chili", 15), True, "two bean chilis with 15 g"),
    ]
    for a, b, want, words in pairs:
        try:
            got = a == b
        except Exception as error:
            return "HINT: Comparing two dishes stopped with " + type(error).__name__ + ": " + str(error)
        if got is None:
            return "HINT: __eq__ gave back None. Return the answer:  return ... and ..."
        if bool(got) != want:
            return (f"HINT: For {words}, == says {got}, but it should say {want}. Compare the names AND the "
                    "proteins:  self.name == other.name and self.protein == other.protein")
    if Dish("bean chili", 15) not in [soup, Dish("bean chili", 15)]:
        return "HINT: in uses == to look through a list. Check your __eq__ again."

    return ("PASS: Your dishes print for people, show up readable in a list for programmers, and two "
            "dishes with the same name and protein are ==. Python calls each dunder for you. "
            "Next: dataclasses, which write these for you.")


verdict = _check()
print(verdict)
