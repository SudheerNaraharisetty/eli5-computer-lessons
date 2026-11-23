# Lesson 66 exercise: A template for drinks
#
# Ana drinks a sports drink on her long runs (130 kcal a bottle).
# Chloe loves a hot chocolate (190 kcal a mug).
# Kitchen Coach needs a template for drinks, like the Dish class in the lesson.
#
# Between START and END, write:
#   1. A class called Drink. Nothing on the card yet: use pass.
#   2. Two separate drinks made from it:  sports_drink  and  hot_chocolate.
#      Call the class with brackets, once for each drink.
#   3. A name and a calories label on each drink, with the dot:
#        sports_drink   name "sports drink",   calories 130
#        hot_chocolate  name "hot chocolate",  calories 190
#   4. Print each drink on its own line, reading the labels back:
#        sports drink: 130 kcal
#        hot chocolate: 190 kcal
#      (An f-string from lesson 15 does it.)
#
# Not a dict, please. The check makes sure both drinks are real Drink objects.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l66_dish_template.py
# - The check at the bottom says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

# 1. The class


# 2. Two drinks


# 3. Their labels


# 4. Print them


# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them, and looks at what they made.
def _check():
    import ast
    import contextlib
    import io

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  A class line looks like  class Drink:  with a colon, and the line under it is indented.")

    ns = {"__name__": "__main__"}
    printed = io.StringIO()
    try:
        with contextlib.redirect_stdout(printed):
            exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        last = type(error).__name__ + ": " + str(error)
        print(printed.getvalue(), end="")
        if isinstance(error, AttributeError) and "'dict' object" in str(error):
            return ("HINT: Python stopped with: " + last + "\n  That drink is a dict, a loose slip, and a dict "
                    "takes no labels with the dot. Make each drink from the template:  Drink()")
        if isinstance(error, AttributeError):
            return ("HINT: Python stopped with: " + last + "\n  A label is read before it was written, "
                    "or it is spelled differently. Write both labels on each drink before you print.")
        if isinstance(error, NameError):
            return ("HINT: Python stopped with: " + last + "\n  Check the spelling of the names: "
                    "Drink, sports_drink, hot_chocolate. Make each one before you use it.")
        return "HINT: Python stopped with an error: " + last + "  Read it from the bottom up (lesson 4)."
    text = printed.getvalue()
    print(text, end="")
    print("-" * 50)

    Drink = ns.get("Drink")
    if Drink is None:
        return "HINT: There is no class called Drink yet. Step 1: write  class Drink:  and  pass  under it, indented."
    if not isinstance(Drink, type):
        return "HINT: Drink should be a class. Write it with  class Drink:  not with  =  or  def ."

    for var in ["sports_drink", "hot_chocolate"]:
        if var not in ns:
            return f"HINT: There is no {var} yet. Step 2: make it by calling the class:  {var} = Drink()"
        obj = ns[var]
        if obj is Drink:
            return (f"HINT: {var} is the Drink class itself, the template card. Add the brackets: "
                    f"{var} = Drink()  makes a new drink.")
        if isinstance(obj, dict):
            return f"HINT: {var} is a dict, a loose slip. Make it from the template:  {var} = Drink()"
        if not isinstance(obj, Drink):
            return f"HINT: {var} is a {type(obj).__name__}, not a Drink. Make it with  {var} = Drink()"

    if ns["sports_drink"] is ns["hot_chocolate"]:
        return ("HINT: sports_drink and hot_chocolate are the same drink. Call Drink() once for EACH, so you "
                "get two separate drinks.")
    if "name" in vars(Drink) or "calories" in vars(Drink):
        return ("HINT: A name or calories label went on the class itself, the card on the wall. Write the labels "
                "on each drink, like  sports_drink.name = ...")

    want = {"sports_drink": ("sports drink", 130), "hot_chocolate": ("hot chocolate", 190)}
    for var, (name, kcal) in want.items():
        obj = ns[var]
        for label, value in [("name", name), ("calories", kcal)]:
            if label not in vars(obj):
                return f"HINT: {var} has no {label} label yet. Step 3: write  {var}.{label} = {value!r}"
            got = getattr(obj, label)
            if got != value or type(got) is not type(value):
                return f"HINT: {var}.{label} is {got!r}. It should be {value!r}."

    lines = [line.strip() for line in text.splitlines() if line.strip()]
    for name, kcal in want.values():
        if f"{name}: {kcal} kcal" not in lines:
            return (f"HINT: Print a line that says exactly  {name}: {kcal} kcal  Read the labels back with the "
                    f"dot inside an f-string.")
    if "sports drink: 130 kcal" in your_code or "hot chocolate: 190 kcal" in your_code:
        return ("HINT: The prints are typed in by hand. Read the labels back from the drinks instead, like  "
                'print(f"{sports_drink.name}: {sports_drink.calories} kcal")')

    return ("PASS: One template, two separate drinks, each with its own labels. Two lines per drink by hand, "
            "though. Lesson 67 lets the class set them up for you.")


verdict = _check()
print(verdict)
