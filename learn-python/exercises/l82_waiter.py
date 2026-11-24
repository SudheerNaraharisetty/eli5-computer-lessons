# Lesson 82 exercise: The waiter
#
# Dinner has three courses on the pass. A waiter serves them one at a time.
#
#   1. Make a waiter for the courses:   waiter = iter(courses)
#
#   2. Serve the courses one at a time with next():
#          starter = next(waiter)
#      and the same for main and dessert.
#
#   3. Ask the waiter once more. The pass is empty now, so a plain
#      next(waiter) would stop with StopIteration. Give next() a default
#      instead, so after holds the text "no more":
#          after = next(waiter, "no more")
#
#   4. Kitchen Coach makes menu cards with map(), prints them, then checks
#      them again. But a map object is used up after one pass: checked
#      comes out as []. Make a list ONCE, so both are the full list:
#          cards = list(map(...))
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l82_waiter.py
#
# What happens when you run it, in two steps:
# - STEP 1. It prints what your names hold.
# - STEP 2, THE CHECK. It also tries your lines on a second dinner.
#   It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

courses = ["lentil soup", "pasta bake", "brownie"]

# >>> START: change the lines below this line
waiter = courses          # 1. make a waiter with iter()
starter = None            # 2. three plates, with next(waiter)
main = None
dessert = None
after = None              # 3. one more next(), with "no more" as the default

cards = map(lambda course: course.title(), courses)
printed = list(cards)     # 4. print the cards...
checked = list(cards)     #    ...then check them again
# <<< END: change the lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them on the courses above, then on a second dinner.
def _check():
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    data_code = "courses = [" + source.split("\ncourses = [", 1)[1].split(start, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets and the quotes.")

    def run(courses):
        ns = {"courses": list(courses)}
        try:
            exec(compile(your_code, "your lines", "exec"), ns)
        except StopIteration:
            return None, ("HINT: Python stopped with StopIteration. The waiter has no plates left. "
                          "Give the last next() a default:  after = next(waiter, \"no more\")")
        except Exception as error:
            return None, "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
        return ns, None

    data = {}
    exec(data_code, data)
    courses = data["courses"]
    ns, err = run(courses)
    print("STEP 1: what your names hold")
    print("-" * 60)
    if ns is not None:
        for name in ["starter", "main", "dessert", "after", "printed", "checked"]:
            print(f"  {name:<8} {ns.get(name)!r}")
    print("-" * 60)
    print("STEP 2, THE CHECK")
    if err:
        return err

    calls = {n.func.id for n in ast.walk(tree) if isinstance(n, ast.Call) and isinstance(n.func, ast.Name)}
    names = {t.id for n in ast.walk(tree) if isinstance(n, ast.Assign) for t in n.targets if isinstance(t, ast.Name)}

    # 1. the waiter
    if "iter" not in calls:
        return "HINT: Part 1. Make the waiter with iter():  waiter = iter(courses)"
    if "waiter" in ns and ns["waiter"] is courses:
        return "HINT: Part 1. waiter is still the list itself. Write  waiter = iter(courses)"

    # 2. three plates with next()
    want = courses[:3]
    got = [ns.get("starter"), ns.get("main"), ns.get("dessert")]
    if "next" not in calls:
        return "HINT: Part 2. Take each plate with next():  starter = next(waiter)"
    if got != want:
        if got[0] == got[1] == got[2] and got[0] is not None:
            return ("HINT: Part 2. All three are " + repr(got[0]) + ". Ask the SAME waiter each time: "
                    "next(waiter), not next(iter(courses)), because a new waiter starts again at plate 1.")
        return f"HINT: Part 2. starter, main and dessert are {got!r}. They should be {want!r}."
    if any(isinstance(n, ast.Constant) and n.value in courses for n in ast.walk(tree)):
        return "HINT: Do not type the course names yourself. Take them from the waiter with next(waiter)."

    # 3. the default
    if ns.get("after") != "no more":
        return ("HINT: Part 3. after is " + repr(ns.get("after")) + ". Ask once more with a default: "
                "after = next(waiter, \"no more\")")

    # 4. the cards
    want_cards = [c.title() for c in courses]
    if ns.get("printed") != want_cards:
        return f"HINT: Part 4. printed is {ns.get('printed')!r}. It should be {want_cards!r}."
    if ns.get("checked") == []:
        return ("HINT: Part 4. checked is []: the map object was used up by the first list(). "
                "Make a list once:  cards = list(map(lambda course: course.title(), courses))  "
                "Then printed = list(cards) and checked = list(cards) both copy the full list.")
    if ns.get("checked") != want_cards:
        return f"HINT: Part 4. checked is {ns.get('checked')!r}. It should be {want_cards!r}."
    if "cards" not in names or not isinstance(ns.get("cards"), list):
        return "HINT: Part 4. Keep the name cards, and make it a list:  cards = list(map(...))"

    # The same lines on a second dinner
    second = ["green salad", "bean chili", "fruit"]
    ns2, err = run(second)
    if err:
        return err
    if [ns2.get("starter"), ns2.get("main"), ns2.get("dessert"), ns2.get("after")] != second + ["no more"]:
        return "HINT: On a second dinner the plates are wrong. Use iter(courses) and next(waiter), not fixed values."
    if ns2.get("checked") != [c.title() for c in second]:
        return "HINT: On a second dinner the cards are wrong. Build them from courses with list(map(...))."

    return ("PASS: One plate at a time, a polite \"no more\" at the end, and cards you can "
            "read twice. Next: generators, the easy way to make your own waiter.")


verdict = _check()
print(verdict)
