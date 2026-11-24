# Lesson 100 exercise: Dinner rush
#
# Dinner for Ana, Ben and Chloe. Three dishes, one cook:
#   rice for Ana takes 15 minutes, eggs for Ben take 10, salad for Chloe takes 5.
# In this file 1 kitchen minute is 0.05 real seconds, so the check is quick.
#
# Right now dinner() cooks them ONE BY ONE, so dinner takes 30 minutes.
# And boil_eggs() has a worse problem: time.sleep() puts the whole cook
# to sleep, so nothing else can cook while the eggs boil.
#
# Make dinner take about 15 minutes (the longest dish), not 30:
#   1. In boil_eggs(), replace  time.sleep(...)  with  await asyncio.sleep(...)
#   2. In dinner(), run all three at once with asyncio.gather(...)
#      (or an asyncio.TaskGroup, if you like).
#   3. dinner() must still return the three dishes in this order:
#      ["rice for Ana", "eggs for Ben", "salad for Chloe"]
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l100_dinner_rush.py
#
# The check at the bottom runs dinner() with asyncio.run(), times it, and
# checks the dishes. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

import asyncio
import time

MINUTE = 0.05  # 1 kitchen minute = 0.05 real seconds


async def cook_rice():
    print("  rice on")
    await asyncio.sleep(15 * MINUTE)
    print("  rice ready")
    return "rice for Ana"


async def boil_eggs():
    print("  eggs on")
    time.sleep(10 * MINUTE)  # the cook falls asleep at the stove
    print("  eggs ready")
    return "eggs for Ben"


async def make_salad():
    print("  salad on")
    await asyncio.sleep(5 * MINUTE)
    print("  salad ready")
    return "salad for Chloe"


async def dinner():
    """Cook all three dishes at once. Return them as a list: rice, eggs, salad."""
    rice = await cook_rice()
    eggs = await boil_eggs()
    salad = await make_salad()
    return [rice, eggs, salad]

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It runs your lines from between
# START and END, then runs dinner() and times it.
def _check():
    import ast
    import asyncio
    import inspect
    import time

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets, the colons and the indentation.")

    ns = {"__name__": "l100"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return ("HINT: Your lines stopped with " + type(error).__name__ + ": " + str(error)
                + "  Read it from the bottom up (lesson 4).")
    for name in ["cook_rice", "boil_eggs", "make_salad", "dinner"]:
        if not inspect.iscoroutinefunction(ns.get(name)):
            return f"HINT: Keep {name} as an  async def  function. The check needs it."

    # time.sleep() inside an async def blocks every other task.
    for node in ast.walk(tree):
        if isinstance(node, ast.AsyncFunctionDef):
            for inner in ast.walk(node):
                if (isinstance(inner, ast.Call) and isinstance(inner.func, ast.Attribute)
                        and inner.func.attr == "sleep" and isinstance(inner.func.value, ast.Name)
                        and inner.func.value.id == "time"):
                    return (f"HINT 1: {node.name}() still calls time.sleep(). Inside async code that "
                            "puts the whole cook to sleep, and no other dish can cook. "
                            "Write  await asyncio.sleep(10 * MINUTE)  instead.")

    minute = ns.get("MINUTE", 0.05)
    print("Running dinner():")
    began = time.perf_counter()
    try:
        dishes = asyncio.run(ns["dinner"]())
    except Exception as error:
        return ("HINT: dinner() stopped with " + type(error).__name__ + ": " + str(error)
                + "  Did you write  await  in front of asyncio.gather(...)?")
    minutes = (time.perf_counter() - began) / minute
    print(f"dinner() returned {dishes!r}")
    print(f"dinner took about {minutes:.0f} kitchen minutes")

    wanted = ["rice for Ana", "eggs for Ben", "salad for Chloe"]
    if inspect.isawaitable(dishes):
        return ("HINT: dinner() handed back something to await, not the dishes. "
                "Write  await  in front of it:  return await asyncio.gather(...)")
    if minutes > 22:
        return ("HINT 2: Dinner still takes about 30 minutes, so the dishes cook one by one. "
                "Each  await cook_rice()  waits for that dish before the next one starts. "
                "Write  return await asyncio.gather(cook_rice(), boil_eggs(), make_salad())")
    if minutes < 13:
        return ("HINT: Dinner was ready too fast, in " + f"{minutes:.0f}" + " minutes. Keep the "
                "cooking times: 15, 10 and 5 minutes. Did a dish get skipped?")
    if isinstance(dishes, tuple):
        dishes = list(dishes)
    if dishes != wanted:
        return ("HINT 3: dinner() should return " + repr(wanted) + ", in that order. It returned "
                + repr(dishes) + ". asyncio.gather() gives the results in the order you passed the "
                "dishes in, not the order they finished.")

    return ("PASS: Dinner in 15 minutes, not 30. Every wait is an await, so the cook moves "
            "on to the next pot instead of staring at this one. One cook, many pots.")


verdict = _check()
print(verdict)
