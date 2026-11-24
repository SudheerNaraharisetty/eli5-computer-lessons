# Lesson 98 exercise: Find the slow step
#
# Every morning Kitchen Coach checks the day's orders against the pantry
# and lists every item that is missing. It works. It is just slow.
# Do not guess why. Measure.
#
# Your job:
#
#   1. MEASURE. Run this file as it is. STEP 1 times the morning check
#      with a stopwatch. Then run it under the profiler, in a terminal:
#
#          python3 -m cProfile -s cumulative l98_slow_step.py
#
#      Look at the cumtime column. Which function eats almost all the
#      time? How many times was it called (the ncalls column)? The check
#      at the bottom runs find_missing 4 times on 5,000 orders, so expect
#      4 x 5,000. Skip the names that start with _: they are the check.
#
#   2. FIX. Between START and END, make that step fast. The pantry is a
#      long shelf (a list): to answer "is it there?", Python walks the
#      shelf item by item. A set goes straight to the right drawer.
#      Make a set from pantry_list ONCE, before the loop, and check the
#      set instead. Keep the missing items in the same order as before.
#
#   3. CHECK. Run it again. STEP 2 times the old way and your way, checks
#      that both give the same missing items, and says PASS when yours is
#      at least 5 times faster. Run the profiler once more and compare.
#
# How to run it: save, then press the Run button at the top right of
# VS Code, or type  python3 l98_slow_step.py  in a terminal.
# Your times will differ from computer to computer. That is normal.
# This file was checked with Python 3.14 and 3.15.

import time


def read_orders():
    """Today's orders: 5,000 item codes. Some are not in the pantry."""
    return [f"item-{n * 7 % 18_000}" for n in range(5_000)]


def load_pantry():
    """The pantry list: 15,000 item codes, item-0 to item-14999."""
    return [f"item-{n}" for n in range(15_000)]


def in_pantry(item, pantry):
    return item in pantry


# >>> START: change the lines below this line
def find_missing(orders, pantry_list):
    """Every order that is not in the pantry, in the order it came in."""
    missing = []
    for item in orders:
        if not in_pantry(item, pantry_list):
            missing.append(item)
    return missing
# <<< END: change the lines above this line


# ===== THE CHECK =====
# You do not need to read this part. It keeps a copy of the slow way,
# times it next to yours, and checks that both give the same answer.
def _slow_way(orders, pantry_list):
    missing = []
    for item in orders:
        if item not in pantry_list:
            missing.append(item)
    return missing


def _best_of_3(func, orders, pantry_list):
    best = None
    for attempt in range(3):
        start = time.perf_counter()
        result = func(orders, pantry_list)
        took = time.perf_counter() - start
        if best is None or took < best:
            best = took
    return best, result


def _check():
    orders = read_orders()
    pantry_list = load_pantry()

    print("STEP 1: the morning check, with a stopwatch")
    print("-" * 60)
    start = time.perf_counter()
    try:
        yours = find_missing(orders, pantry_list)
    except Exception as error:  # noqa: BLE001  any error becomes a hint
        return f"HINT: find_missing stopped with {type(error).__name__}: {error}"
    took = time.perf_counter() - start
    print(f"{len(orders)} orders checked in {took * 1000:.0f} ms")
    print("-" * 60)
    print("STEP 2, THE CHECK")

    slow_time, want = _best_of_3(_slow_way, orders, pantry_list)
    your_time, yours = _best_of_3(find_missing, orders, pantry_list)
    print(f"the old way: {slow_time * 1000:.1f} ms")
    print(f"your way:    {your_time * 1000:.1f} ms")

    if not isinstance(yours, list):
        return (
            f"HINT: find_missing should give a list, like before. It gave a "
            f"{type(yours).__name__}. Keep  missing = []  and  missing.append(item)."
        )
    if sorted(yours) == sorted(want) and yours != want:
        return (
            "HINT: You found the right missing items, but in a different order. "
            "Loop over the orders list as before. Only the pantry becomes a set."
        )
    if yours != want:
        return (
            f"HINT: The old way finds {len(want)} missing items. Yours finds "
            f"{len(yours)}. Check the same thing as before: is the item NOT in "
            "the pantry?"
        )
    times = slow_time / your_time if your_time > 0 else float("inf")
    if times < 0.8:
        return (
            "HINT: Same answer, but SLOWER than the old way. Is set(...) inside "
            "the loop? Then Python builds a whole new set for every order. Make "
            "the set once, before the loop:  pantry = set(pantry_list)"
        )
    if times < 5:
        return (
            f"HINT: Same answer, but only {times:.1f} times faster. The slow step "
            "is  item in pantry_list  on a list. Before the loop, add  "
            "pantry = set(pantry_list)  and check the set inside the loop."
        )
    return (
        f"PASS: The same {len(yours)} missing items, about {times:,.0f} times faster. "
        "You measured, found the slow step, and fixed that one step."
    )


if __name__ == "__main__":
    print(_check())
