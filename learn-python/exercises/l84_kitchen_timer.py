# Lesson 84 exercise: Kitchen timer
#
# Ana is meal prepping for her half-marathon. Kitchen Coach should say when
# each recipe starts and when it finishes. Write that ONCE, as a decorator.
#
# Finish the decorator logged between START and END. Its wrapper must:
#   1. print  Starting <name>      (the name of the recipe, func.__name__)
#   2. call the real recipe with all its values: func(*args, **kwargs)
#      and keep the answer in result
#   3. print  Finished <name>
#   4. return result
# Then logged must return the wrapper.
# Put @functools.wraps(func) on the line above def wrapper, so each recipe
# keeps its own name.
#
# The three recipes below END already have @logged on them. Do not change them.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l84_kitchen_timer.py
#
# What happens when you run it, in two steps:
# - STEP 1. Ana's three recipes run, and you see what they print and return.
# - STEP 2, THE CHECK. It runs them again, and one recipe of its own. It
#   says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
import functools


def logged(func):
    # Write def wrapper(*args, **kwargs): here, with @functools.wraps(func)
    # above it. Then return the wrapper instead of func.
    return func

# <<< END: write your lines above this line


@logged
def soak_oats(grams):
    """One jar of overnight oats holds 80 g of dry oats."""
    return grams // 80


@logged
def cook_rice(grams):
    """Cooked rice weighs about 3 times the dry rice."""
    return grams * 3


@logged
def pack_boxes(days, kcal=650):
    """One lunch box for each day."""
    return f"{days} boxes of {kcal} kcal"


# ===== THE CHECK =====
# You do not need to read this part. It runs your decorator, and it has to
# SEE what your wrapper prints. So it borrows a tool, contextlib.redirect_stdout,
# that sends print() into a string for a moment instead of the screen.
# That is the checker's business, not yours: your decorator just uses print.
def _check():
    import contextlib
    import io

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    after_end = source.split(end, 1)[1].split("\n", 1)[1]
    after_end = after_end.split("# ===== THE CHECK =====")[0]
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        compile(your_code, "your lines", "exec")
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
    logged = ns.get("logged")
    if not callable(logged):
        return "HINT: Keep the line  def logged(func):  The check uses that decorator."

    try:
        exec(compile(after_end, "the recipes", "exec"), ns)
    except Exception as error:
        return ("HINT: Putting @logged on the recipes stopped with " + type(error).__name__
                + ": " + str(error))

    def call(fn, *args, **kwargs):
        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            try:
                value, err = fn(*args, **kwargs), None
            except Exception as error:
                value, err = None, type(error).__name__ + ": " + str(error)
        return value, buf.getvalue().splitlines(), err

    print("STEP 1: Ana's meal prep")
    print("-" * 50)
    for label, name, args, kwargs in [
        ("soak_oats(400)", "soak_oats", (400,), {}),
        ("cook_rice(250)", "cook_rice", (250,), {}),
        ("pack_boxes(5, kcal=700)", "pack_boxes", (5,), {"kcal": 700}),
    ]:
        fn = ns.get(name)
        if name not in ns:
            print(label, "-> the name", name, "is gone")
            continue
        if not callable(fn):
            print(label, "-> the name", name, "holds", repr(fn), "(not a function)")
            continue
        value, lines, err = call(fn, *args, **kwargs)
        for line in lines:
            print("   ", line)
        print(label, "->", "stopped with " + err if err else repr(value))
    print("-" * 50)
    print("STEP 2, THE CHECK")

    rice = ns.get("cook_rice")
    if "cook_rice" not in ns:
        return "HINT: The decorated cook_rice is gone. Leave the recipes below END as they are."
    if not callable(rice):
        return ("HINT: After @logged, cook_rice is " + repr(rice) + ", not a function. "
                "logged must end with  return wrapper  (4 spaces in, under def wrapper).")

    value, lines, err = call(rice, 250)
    if err:
        return "HINT: cook_rice(250) stopped with " + err
    if not lines:
        return ("HINT: Nothing was printed. logged still hands back the plain recipe. "
                "Write a wrapper that prints, calls func(*args, **kwargs), prints, "
                "and return the wrapper.")
    if lines[0] != "Starting cook_rice":
        return ("HINT: The first line should be  Starting cook_rice  but it was  "
                + repr(lines[0]) + "  Use print(f\"Starting {func.__name__}\")")
    if len(lines) < 2 or lines[-1] != "Finished cook_rice":
        return ("HINT: The last line should be  Finished cook_rice  Print it after "
                "the real recipe is called, and before return result.")
    if len(lines) != 2:
        return "HINT: Print just two lines: Starting ... and Finished ... It printed: " + repr(lines)
    if value is None:
        return ("HINT: cook_rice(250) gave back None. Keep the answer, "
                "result = func(*args, **kwargs), and end the wrapper with  return result")
    if value != 750:
        return "HINT: cook_rice(250) should give 750, but it gave " + repr(value)

    # The check's own recipe: named values, a default, and a count of calls.
    calls = []

    def portion(kcal, servings=2, note=""):
        """Split the kcal over the servings."""
        calls.append(1)
        print("cooking", kcal)
        return kcal // servings

    try:
        wrapped = logged(portion)
    except Exception as error:
        return "HINT: logged(...) stopped with " + type(error).__name__ + ": " + str(error)
    value, lines, err = call(wrapped, 1200, servings=3, note="for Ana")
    if err:
        return ("HINT: A recipe called with a named value stopped with " + err
                + "  Does the wrapper take *args, **kwargs and pass them on with func(*args, **kwargs)?")
    if len(calls) != 1:
        return ("HINT: The real recipe ran " + str(len(calls)) + " times for one call. "
                "Call func(*args, **kwargs) once, and keep its answer in result.")
    if lines != ["Starting portion", "cooking 1200", "Finished portion"] or value != 400:
        return ("HINT: For the check's recipe portion(1200, servings=3) it printed "
                + repr(lines) + " and gave back " + repr(value)
                + ". Expected Starting portion, cooking 1200, Finished portion, and 400.")

    if rice.__name__ != "cook_rice" or wrapped.__name__ != "portion":
        return ("HINT: Almost. The decorated recipe is now called " + repr(rice.__name__)
                + ". Put  @functools.wraps(func)  on the line right above  def wrapper")
    if rice.__doc__ != "Cooked rice weighs about 3 times the dry rice.":
        return "HINT: The docstring got lost. @functools.wraps(func) keeps it."

    return ("PASS: Every recipe now says when it starts and finishes, with its own name, "
            "and still hands back its dish. One decorator, three @ lines.")


verdict = _check()
print(verdict)
